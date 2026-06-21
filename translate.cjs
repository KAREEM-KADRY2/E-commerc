const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const srcDir = path.join(__dirname, 'src');
const extractedKeys = new Set();

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getFiles(srcDir);
const attributesToTranslate = ['placeholder', 'alt', 'title', 'label'];

function processFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8');
  let hasTranslationImports = code.includes('useTranslation');
  let hasJSX = false;
  let needsImport = false;
  let modified = false;

  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });

  traverse(ast, {
    JSXElement(path) {
      hasJSX = true;
    },
    JSXText(pathNode) {
      const text = pathNode.node.value;
      const trimmed = text.trim();
      // Skip empty text or text that is just symbols/numbers
      if (trimmed.length > 0 && /[a-zA-Z]/.test(trimmed)) {
        extractedKeys.add(trimmed);
        pathNode.replaceWith(
          t.jsxExpressionContainer(
            t.callExpression(t.identifier('t'), [t.stringLiteral(trimmed)])
          )
        );
        modified = true;
        needsImport = true;
      }
    },
    JSXAttribute(pathNode) {
      const name = pathNode.node.name.name;
      if (attributesToTranslate.includes(name)) {
        const value = pathNode.node.value;
        if (t.isStringLiteral(value)) {
          const text = value.value.trim();
          if (text.length > 0 && /[a-zA-Z]/.test(text)) {
            extractedKeys.add(text);
            pathNode.node.value = t.jsxExpressionContainer(
              t.callExpression(t.identifier('t'), [t.stringLiteral(text)])
            );
            modified = true;
            needsImport = true;
          }
        }
      }
    }
  });

  if (modified) {
    // Add t() hook to component bodies
    traverse(ast, {
      FunctionDeclaration(pathNode) {
        if (hasJSXReturn(pathNode)) {
          insertHook(pathNode.node.body);
        }
      },
      ArrowFunctionExpression(pathNode) {
        if (hasJSXReturn(pathNode)) {
          if (t.isBlockStatement(pathNode.node.body)) {
            insertHook(pathNode.node.body);
          } else {
            // Convert x => <div/> to x => { const {t} = useTranslation(); return <div/> }
            const originalBody = pathNode.node.body;
            pathNode.node.body = t.blockStatement([
              createHook(),
              t.returnStatement(originalBody)
            ]);
          }
        }
      }
    });

    if (!hasTranslationImports) {
      const importDecl = t.importDeclaration(
        [t.importSpecifier(t.identifier('useTranslation'), t.identifier('useTranslation'))],
        t.stringLiteral('react-i18next')
      );
      ast.program.body.unshift(importDecl);
    }

    const output = generate(ast, {}, code);
    fs.writeFileSync(filePath, output.code);
  }
}

function hasJSXReturn(pathNode) {
  let hasJSX = false;
  pathNode.traverse({
    JSXElement() {
      hasJSX = true;
    },
    JSXFragment() {
      hasJSX = true;
    }
  });
  return hasJSX;
}

function createHook() {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.objectPattern([
        t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)
      ]),
      t.callExpression(t.identifier('useTranslation'), [])
    )
  ]);
}

function insertHook(blockStatement) {
  // Check if hook already exists
  let hasHook = false;
  for (const stmt of blockStatement.body) {
    if (t.isVariableDeclaration(stmt)) {
      for (const dec of stmt.declarations) {
        if (t.isCallExpression(dec.init) && dec.init.callee.name === 'useTranslation') {
          hasHook = true;
        }
      }
    }
  }
  if (!hasHook) {
    blockStatement.body.unshift(createHook());
  }
}

allFiles.forEach(processFile);

// Skip already translated files from our manual edits or modify them nicely
// Let's create the translation JSON template
const dict = {};
extractedKeys.forEach(key => {
  dict[key] = key;
});

const localesDir = path.join(__dirname, 'public', 'locales');
if (!fs.existsSync(localesDir)) fs.mkdirSync(localesDir, { recursive: true });

['en', 'ar', 'hi', 'ur', 'fr'].forEach(lang => {
  const dir = path.join(localesDir, lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'translation.json'), JSON.stringify(dict, null, 2));
});

console.log(`Processed ${allFiles.length} files. Extracted ${extractedKeys.size} keys.`);

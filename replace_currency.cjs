const fs = require('fs');
const path = require('path');

const projectRoot = 'c:/Users/pc/Desktop/E-commerc';

const filesToUpdate = [
  path.join(projectRoot, 'write_translations.cjs'),
  path.join(projectRoot, 'public/locales/en/translation.json'),
  path.join(projectRoot, 'public/locales/ar/translation.json'),
  path.join(projectRoot, 'public/locales/hi/translation.json'),
  path.join(projectRoot, 'public/locales/ur/translation.json')
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // English changes
    content = content.replace(/\bEGP\b/g, 'AED');
    content = content.replace(/Egyptian Pound/gi, 'UAE Dirham');
    
    // Arabic changes
    content = content.replace(/ج\.م/g, 'درهم إماراتي');
    content = content.replace(/جنيه/g, 'درهم إماراتي');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

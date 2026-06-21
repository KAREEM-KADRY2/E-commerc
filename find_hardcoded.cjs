const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Users/pc/Desktop/E-commerc/src');
let hardcodedCount = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        // Look for text between > and < that contains letters but not {t(
        const matches = line.match(/>([^<{]*[a-zA-Z][^<{]*)</g);
        if (matches) {
            matches.forEach(m => {
                const text = m.substring(1, m.length - 1).trim();
                // ignore empty or single character or numbers
                if (text.length > 1 && !text.match(/^[0-9\s\W]+$/)) {
                    console.log(`[${path.basename(file)}:${i+1}] ${text}`);
                    hardcodedCount++;
                }
            });
        }
        
        // Also look for placeholders
        const placeholders = line.match(/placeholder=["']([^"']+[a-zA-Z][^"']*)["']/g);
        if (placeholders) {
            placeholders.forEach(p => {
                if (!p.includes('{t(') && !p.includes('{')) {
                    console.log(`[${path.basename(file)}:${i+1}] ${p}`);
                    hardcodedCount++;
                }
            });
        }
    });
});
console.log(`Found ${hardcodedCount} potential hardcoded strings.`);

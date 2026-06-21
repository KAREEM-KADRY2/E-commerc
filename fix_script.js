
const fs = require('fs');
let content = fs.readFileSync('c:/Users/pc/Desktop/E-commerc/src/pages/ActiveGroupBuys.jsx', 'utf8');
content = content.replace(/^\uFFFD+/, '').replace(/^\uFEFF+/, '');
content = content.replace(/S Group [^\"]+/g, 'S Group Elite');
fs.writeFileSync('c:/Users/pc/Desktop/E-commerc/src/pages/ActiveGroupBuys.jsx', content, 'utf8');
console.log('Fixed ActiveGroupBuys.jsx');


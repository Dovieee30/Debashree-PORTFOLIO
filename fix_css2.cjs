const fs = require('fs');
const lines = fs.readFileSync('src/index.css', 'utf-8').split(/\r?\n/);
const fixedLines = lines.slice(0, 758);
fixedLines.push('*, *::before, *::after { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease; }');
fs.writeFileSync('src/index.css', fixedLines.join('\n'));
console.log('Fixed CSS by line slice');

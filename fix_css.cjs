const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');
css = css.replace(/\*\s*,\s*\*\s*:\s*:\s*b\s*e\s*f\s*o\s*r\s*e\s*,\s*\*\s*:\s*:\s*a\s*f\s*t\s*e\s*r\s*\{\s*t\s*r\s*a\s*n\s*s\s*i\s*t\s*i\s*o\s*n.*?\}/g, '*, *::before, *::after { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease; }');
fs.writeFileSync('src/index.css', css);
console.log('Fixed CSS');

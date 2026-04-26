const fs = require('fs');
const files = [
  'src/components/panels/TerminalPanel.tsx',
  'src/components/panels/SkillsPanel.tsx',
  'src/components/panels/ResumePanel.tsx',
  'src/components/panels/ContactPanel.tsx',
  'src/components/panels/AboutPanel.tsx',
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace Syne with Inter and reduce font weight for headings
  content = content.replace(/fontFamily: "'Syne', sans-serif"/g, "fontFamily: \"'Inter', sans-serif\"");
  content = content.replace(/fontWeight: 800/g, "fontWeight: 700");
  
  fs.writeFileSync(file, content);
}
console.log('Fixed Syne headings');

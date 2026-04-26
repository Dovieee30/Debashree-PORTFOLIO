const fs = require('fs');
const files = [
  'src/components/panels/ProjectsPanel.tsx',
  'src/components/panels/TerminalPanel.tsx',
  'src/components/panels/SkillsPanel.tsx',
  'src/components/panels/ResumePanel.tsx',
  'src/components/panels/ContactPanel.tsx',
  'src/components/panels/AboutPanel.tsx',
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove stretched letterSpacing
  content = content.replace(/letterSpacing: '0.08em'/g, "letterSpacing: 'normal'");
  
  // Remove Terminal heading
  if (file.includes('TerminalPanel.tsx')) {
    content = content.replace(/<h2[^>]*>TERMINAL<\/h2>/g, "");
  }

  fs.writeFileSync(file, content);
}
console.log('Fixed headings');

const fs = require('fs');
const files = [
  'src/index.css',
  'src/components/Robot.tsx',
  'src/components/panels/TerminalPanel.tsx',
  'src/components/panels/SkillsPanel.tsx',
  'src/components/panels/ResumePanel.tsx',
  'src/components/panels/ChromaGrid.css',
  'src/components/panels/AboutPanel.tsx',
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  // Replace JetBrains Mono with Inter
  content = content.replace(/'JetBrains Mono', monospace/g, "'Inter', sans-serif");
  
  // In index.css, remove the blanket !important rule that overrides Syne
  if (file === 'src/index.css') {
    content = content.replace(/\/\* ───────── INTER FONT[\s\S]*?\* {[\s\S]*?}[\s\S]*?@supports[\s\S]*?}/g, "");
  }
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}

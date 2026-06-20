const fs = require('fs');
const path = require('path');
const dir = '/Users/farhod/Desktop/github/js-uz/src/data/lessons/system-design';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
let fixedFiles = 0;

for (let f of files) {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  
  // The raw file has literal characters: \ \ \ ` \ \ \ ` \ \ \ `
  // We want to replace it with: \ ` \ ` \ `
  // We will use regex: /\\\\\\`\\\\\\`\\\\\\`/g
  // Actually, let's just match any triple backticks that are preceded by more than one backslash.
  content = content.replace(/\\\\\\\`\\\\\\\`\\\\\\\`/g, '\\\`\\\`\\\`');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedFiles++;
    console.log('Fixed:', f);
  }
}
console.log('Total fixed:', fixedFiles);

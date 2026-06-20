const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'lessons', 'react');
const files = fs.readdirSync(dir).filter(f => f.startsWith('step') && f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix literal newlines in startingCode, instruction, hint, test, title
  const keys = ['startingCode', 'instruction', 'hint', 'test', 'title'];
  
  keys.forEach(key => {
    // Regex to match key: "..." where ... can contain newlines
    // We must be careful not to overshoot the closing quote.
    // [^"]* will match until the very next double quote.
    const regex = new RegExp(`${key}:\\s*"([^"]*)"`, 'g');
    content = content.replace(regex, (match, p1) => {
      // Replace literal newlines with \n
      const fixedStr = p1.replace(/\r?\n/g, '\\n');
      return `${key}: "${fixedStr}"`;
    });
  });

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log("Fixed literal newlines in strings.");

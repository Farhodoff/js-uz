const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'lessons', 'react');
const files = fs.readdirSync(dir).filter(f => f.startsWith('step') && f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const lines = content.split('\n');
  for (let i=0; i<lines.length; i++) {
     const match = lines[i].match(/^(\s*(?:test|hint|instruction|title|startingCode|question|explanation):\s*)"(.*)"(,?)\s*$/);
     if (match) {
         // match[2] is the string content
         // carefully replace unescaped " with \"
         const inner = match[2].replace(/(?<!\\)"/g, '\\"');
         lines[i] = `${match[1]}"${inner}"${match[3]}`;
     }
  }
  
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
});
console.log("Fixed inner quotes.");

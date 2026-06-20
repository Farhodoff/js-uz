const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'lessons', 'react');
const files = fs.readdirSync(dir).filter(f => f.startsWith('step') && f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the content block
  const startIndex = content.indexOf('content: `');
  if (startIndex === -1) return;
  
  // The start of the template string content
  const startStr = startIndex + 'content: `'.length;
  
  // Find the closing backtick of the content block.
  // We can look for `,\n  code: ` since it's the next property
  const nextPropIndex = content.indexOf('`,', startStr);
  if (nextPropIndex === -1) return;
  
  const contentBlock = content.substring(startStr, nextPropIndex);
  
  // Escape unescaped backticks
  // We want to replace all ` that are not preceded by \
  // But be careful, if they are already escaped, don't double escape.
  let newContentBlock = contentBlock.replace(/(?<!\\)`/g, '\\`');
  
  content = content.substring(0, startStr) + newContentBlock + content.substring(nextPropIndex);
  
  // Also we need to check if we missed `instruction: "..."` backticks? 
  // No, `instruction` is a normal double-quoted string. Backticks inside it don't break JS template strings. 
  // But wait, the user's error was in the browser. What about `instruction: "..."` ?
  // In `instruction: "O'ng tomondagi muharrirda \`input\` tegi bor..."`
  // Backticks inside double quotes are just string characters, they don't need escaping.
  // However, my code has `content: \`...\`` which is a template literal.
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed', file);
});

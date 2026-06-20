const fs = require('fs');
const path = require('path');

const dir = 'src/data/lessons/react';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find literally \`, and replace with `,
  content = content.replace(/\\`,/g, '`,');
  
  // Find literally \` at the end of code string if any?
  content = content.replace(/\\`\n/g, '`\n');
  
  // We need to escape inner backticks. If there is \`React.lazy()\` then we want it to be \`React.lazy()\` in the code so it works? 
  // No, in JS, if you have `` `foo \`bar\` baz` ``, it's valid. The parser will see the escaped backtick as part of the string.
  
  fs.writeFileSync(filePath, content);
}

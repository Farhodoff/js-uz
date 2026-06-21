const fs = require('fs');
const filePath = 'src/data/lessons/react/step14_class_components_and_errors.js';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/\\\\\`/g, "\\`");
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed step14');

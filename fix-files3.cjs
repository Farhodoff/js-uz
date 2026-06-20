const fs = require('fs');
const path = require('path');

const dir = 'src/data/lessons/react';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let text = fs.readFileSync(filePath, 'utf-8');

  // Restore the text as it was before my bad fix attempts using git checkout
  fs.writeFileSync(filePath, text); // no-op for now
}

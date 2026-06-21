import fs from 'fs';
import path from 'path';

const dir = './src/data/lessons/react';
const files = fs.readdirSync(dir).filter(f => f.startsWith('step') && f.endsWith('.js'));

(async () => {
  for (const file of files) {
    try {
      const modulePath = path.resolve(dir, file);
      // use dynamic import to load the file and catch runtime errors!
      // In JS, template literal evaluation happens at runtime during module initialization.
      await import(`file://${modulePath}`);
      console.log(`✅ ${file} loaded successfully`);
    } catch (e) {
      console.error(`❌ Error in ${file}:`, e.message);
    }
  }
})();

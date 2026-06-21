import fs from 'fs';
import path from 'path';

const dir = './src/data/lessons/intermediate';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

(async () => {
  for (const file of files) {
    try {
      const modulePath = path.resolve(dir, file);
      await import(`file://${modulePath}`);
      console.log(`✅ ${file} loaded successfully`);
    } catch (e) {
      console.error(`❌ Error in ${file}:`, e.message);
    }
  }
})();

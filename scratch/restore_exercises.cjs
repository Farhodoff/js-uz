const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirs = [
  'src/data/lessons/beginner',
  'src/data/lessons/intermediate',
  'src/data/lessons/advanced'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    let bestHash = null;
    let bestCount = -1;
    let bestBlock = null;
    
    try {
      const commits = execSync('git log --format=%H -- ' + filePath).toString().trim().split('\n');
      for (const hash of commits) {
        const fileContent = execSync('git show ' + hash + ':' + filePath, { stdio: [] }).toString();
        const match = fileContent.match(/exercises:\s*\[([\s\S]*?)\]\s*(,\s*quizzes:|,\s*}\s*$|}$)/);
        if (match) {
          const count = (match[1].match(/id\s*:/g) || []).length;
          if (count > bestCount) {
            bestCount = count;
            bestHash = hash;
            bestBlock = match[0];
          }
        }
      }
    } catch(e){}
    
    if (bestBlock && bestCount > 3) {
      console.log(`Restoring ${filePath} from ${bestHash.slice(0,8)} with ${bestCount} exercises.`);
      let currentContent = fs.readFileSync(filePath, 'utf8');
      const currentMatch = currentContent.match(/exercises:\s*\[([\s\S]*?)\]\s*(,\s*quizzes:|,\s*}\s*$|}$)/);
      if (currentMatch) {
        currentContent = currentContent.replace(/exercises:\s*\[([\s\S]*?)\]\s*(,\s*quizzes:|,\s*}\s*$|}$)/, bestBlock);
        fs.writeFileSync(filePath, currentContent, 'utf8');
      } else {
        console.log(`Failed to replace exercises in ${filePath}`);
      }
    }
  });
});

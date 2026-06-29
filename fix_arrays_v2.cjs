const fs = require('fs');
const p = '/Users/farhod/Desktop/github/js-uz/src/data/lessons/beginner/arrays.js';
let txt = fs.readFileSync(p, 'utf8');

const regex = /exercises:\s*\[([\s\S]*?)\]\s*,\s*quizzes:/;
const match = txt.match(regex);
if (match) {
  let old = match[1].trim();
  let parts = old.split(/},\s*\{/);
  console.log("Parts found:", parts.length);
  
  let parsed = parts.map((part, i) => {
    let p = part;
    if(i !== 0) p = "{" + p;
    if(i !== parts.length - 1) p = p + "}";
    return p;
  });
  
  parsed = parsed.slice(0, 10);
  
  let newOld = parsed.join("},\n  {");
  let rep = `exercises: [\n  ${newOld}\n],\n  quizzes:`;
  txt = txt.replace(regex, rep);
  fs.writeFileSync(p, txt, 'utf8');
  console.log("Fixed arrays.js");
}

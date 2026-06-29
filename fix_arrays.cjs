const fs = require('fs');
const path = require('path');
const p = '/Users/farhod/Desktop/github/js-uz/src/data/lessons/beginner/arrays.js';

let txt = fs.readFileSync(p, 'utf8');

// ROAST the YOMON section
txt = txt.replace(/❌ Ko'p Uchraydigan Xatolar \\(Junior Mistakes\\)/g, "🔥 ROAST (Juniorlarning Sharmandali Xatolari)");
txt = txt.replace(/❌ YOMON:/g, "🤬 YOMON (Sharmanda):");
txt = txt.replace(/✅ YAXSHI:/g, "😎 YAXSHI (Senior Level):");

// Replace exercises
const regex = /exercises:\s*\[([\s\S]*?)\]\s*,\s*quizzes:/;
const match = txt.match(regex);
if (match) {
  let old = match[1].trim();
  // old contains all exercises separated by },\n  {
  // Let's split by this. Note this is a bit hacky but works for the current format.
  let parts = old.split(/},\\s*\\{/);
  // Re-add the braces and fix array
  let parsed = parts.map((part, i) => {
    let p = part;
    if(i !== 0) p = "{" + p;
    if(i !== parts.length - 1) p = p + "}";
    return p;
  });
  
  // Keep only 10
  parsed = parsed.slice(0, 10);
  
  // Re-join
  let newOld = parsed.join("},\n  {");
  
  let rep = `exercises: [\n  ${newOld}\n],\n  quizzes:`;
  txt = txt.replace(regex, rep);
  fs.writeFileSync(p, txt, 'utf8');
  console.log("arrays.js OK!");
} else {
  console.log("arrays.js MISSING!");
}

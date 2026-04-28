export const promises = {
  id: "a1", title: "Promises",
  theory: `## Promise nima?

Asinxron operatsiyalar natijasini ifodalaydi.

**Holatlari:**
- \`pending\` — kutilmoqda
- \`fulfilled\` — muvaffaqiyatli
- \`rejected\` — xatolik

\`\`\`js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Tayyor!"), 1000);
});

p.then(natija => console.log(natija))
 .catch(err => console.error(err));
\`\`\``,
  task: "// Topshiriq: 2 soniyadan keyin 'Salom dunyo!' qaytaradigan\n// Promise yarating va .then() bilan chiqaring\n\nconst mening_promise = new Promise((resolve, reject) => {\n  // setTimeout yozing\n});\n\nmening_promise.then(natija => console.log(natija));",
  hint: "const mening_promise = new Promise((resolve) => { setTimeout(() => resolve('Salom dunyo!'), 2000); }); mening_promise.then(n => console.log(n));"
};

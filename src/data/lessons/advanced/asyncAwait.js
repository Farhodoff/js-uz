export const asyncAwait = {
  id: "a2", title: "Async/Await",
  theory: `## Async/Await

Promise'larni yanada qulay yozish usuli.

\`\`\`js
async function malumotOl() {
  try {
    const javob = await fetch('https://api.example.com');
    const data = await javob.json();
    return data;
  } catch (xato) {
    console.error(xato);
  }
}
\`\`\`

**Qoidalar:**
- \`async\` funksiya doim Promise qaytaradi
- \`await\` faqat \`async\` ichida ishlatiladi`,
  task: "// Topshiriq: async funksiya yozing\n// 1 soniya kutib, 'Bajarildi!' qaytarsin\n\nasync function kutish() {\n  // shu yerga yozing\n}\n\nkutish().then(console.log);",
  hint: "async function kutish() { await new Promise(r => setTimeout(r, 1000)); return 'Bajarildi!'; } kutish().then(console.log);"
};

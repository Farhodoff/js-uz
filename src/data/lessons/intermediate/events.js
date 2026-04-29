export const events = {
  id: "m5",
  title: "Event Listeners",
  theory: `## Hodisalar (Events)
Foydalanuvchi harakatlariga javob berish.

\`\`\`javascript
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  console.log("Bosildi!");
});
\`\`\`

**Ko'p ishlatiladigan hodisalar:**
- \`click\`: Sichqoncha bosilganda.
- \`input\`: Inputga yozilganda.
- \`submit\`: Forma yuborilganda.
- \`mouseover\`: Sichqoncha ustiga kelganda.`,
  task: `// 1. Tugmani (button) tanlab oling.
// 2. Unga click event qo'shing.
// 3. Har safar bosilganda konsolga "Sana: " va joriy vaqtni chiqaring.

// ...`,
  hint: `const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  console.log("Sana: " + new Date());
});`
};

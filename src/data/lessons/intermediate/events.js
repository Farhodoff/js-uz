export const events = {
  id: "m5",
  title: "Event Listeners",
  theory: `## Hodisalar (Events)
Hodisa - foydalanuvchi yoki brauzer tomonidan yuzaga keladigan signal. Click, input, submit, keydown kabi hodisalar orqali sahifani interaktiv qilamiz.

\`\`\`javascript
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  console.log("Bosildi!");
});
\`\`\`

## Ko'p ishlatiladigan hodisalar
- \`click\` - tugma bosilganda
- \`input\` - yozishda
- \`submit\` - forma yuborilganda
- \`mouseover\` - ustiga borganda

## Amaliy fikr
Eventlar yordamida hisoblagich, input preview, modal, dropdown va form validatsiya quriladi. Demak, bu dars loyihadagi interaktivlikning asosi hisoblanadi.

## Quiz
1. Event nima?
2. \`click\` va \`input\` hodisalari nimasi bilan farq qiladi?
3. \`submit\` eventda nima uchun \`preventDefault()\` ishlatiladi?`,
  task: `// 1. Tugmani (button) tanlab oling.
// 2. Unga click event qo'shing.
// 3. Har safar bosilganda konsolga "Sana: " va joriy vaqtni chiqaring.

// ...`,
  hint: `const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  console.log("Sana: " + new Date());
});`
};

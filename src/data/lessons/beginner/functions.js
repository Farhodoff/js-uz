export const functions = {
  id: "b4",
  title: "Funksiya asoslari",
  theory: `## Funksiya nima?
Bir martta yozilib, ko'p martta ishlatiladigan kod blogi.

**E'lon qilish:**
\`\`\`javascript
function salomBer(ism) {
  return "Salom " + ism;
}
\`\`\`

**Parametr va Argument:**
- \`ism\` — parametr (o'zgaruvchi).
- \`"Ali"\` — argument (haqiqiy qiymat).`,
  task: `// 1. Ikkita sonni qo'shib beruvchi 'sum' funksiyasini yozing.
// 2. Berilgan sonning kvadratini qaytaruvchi funksiya yozing.
// 3. Ism va familiyani bitta string qilib qaytaruvchi funksiya yozing.

// ...`,
  hint: `function sum(a, b) {
  return a + b;
}

function kvadrat(son) {
  return son * son;
}

function toliqIsm(ism, familiya) {
  return ism + " " + familiya;
}`
};

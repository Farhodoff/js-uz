export const functions = {
  id: "b4",
  title: "Funksiya asoslari",
  theory: `## Funksiya nima?
Funksiya - bir marta yozilib, ko'p marta ishlatiladigan kod bo'lagi. U kodni tartibli qiladi va bir xil ishni qayta yozishdan saqlaydi.

## E'lon qilish
\`\`\`javascript
function salomBer(ism) {
  return "Salom " + ism;
}
\`\`\`

## Parametr va argument
- \`ism\` - parametr
- \`"Ali"\` - argument

## Quiz
1. Funksiya nima uchun kerak?
2. \`return\` va \`console.log\` farqi nima?
3. Qachon arrow function qulay?`,
  task: `// 1. Ikkita sonni qo'shib beruvchi sum funksiyasini yozing.
// 2. Berilgan sonning kvadratini qaytaruvchi funksiya yozing.
// 3. Ism va familiyani birlashtiruvchi funksiya yozing.

// Kodingizni shu yerga yozing`,
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
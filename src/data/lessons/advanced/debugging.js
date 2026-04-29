export const debugging = {
  id: "a7",
  title: "Debugging (Xatolarni topish)",
  theory: `## Debugging nima?
Dasturdagi xatolarni (bug) topish va tuzatish jarayoni.

**Usullari:**
- \`console.log()\`: Qiymatlarni tekshirish.
- \`debugger\` kalit so'zi: Kodni to'xtatib tahlil qilish.
- **Brauzer DevTools**: Sources bo'limida breakpointlar qo'yish.

**Breakpoint** — kodning ma'lum bir satrida to'xtash nuqtasi.`,
  task: `// 1. Quyidagi funksiyada mantiqiy xato bor, uni 'console.log' yordamida toping.
// Funksiya sonning kvadratini hisoblashi kerak edi.

function kvadrat(n) {
  let result = n + n; // Xato shu yerda
  return result;
}

console.log(kvadrat(5)); // 25 chiqishi kerak, lekin 10 chiqyapti`,
  hint: `function kvadrat(n) {
  let result = n * n; // To'g'ri: n * n
  return result;
}`
};

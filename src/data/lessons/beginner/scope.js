export const scopeLesson = {
  id: "scope",
  title: "Scope (Ko'rinish sohasi)",
  level: "Beginner",
  description: "O'zgaruvchilar kodingizning qaysi qismida 'yashashi' va qayerda 'ko'rinishi' haqida.",
  theory: `
# Scope – Bu nima va nima uchun kerak?

**Scope** (Ko'rinish sohasi) — bu o'zgaruvchilar va funksiyalarning kodingizda qayerda ishlatilishi mumkinligini belgilaydigan hududdir.

## 1. NEGA kerak?
Tasavvur qiling, hamma o'zgaruvchilar "global" (hamma joyda ko'rinadigan) bo'lsa, kodingiz juda tartibsiz bo'lib ketadi. Biror funksiya ichidagi o'zgaruvchi boshqa funksiyadagi o'zgaruvchi bilan to'qnashib ketishi mumkin. Scope bizga kodni tartibga solish va "xavfsiz hududlar" yaratishga yordam beradi.

## 2. SODDALIK (Analogiya)
Buni uyingizdagi xonalar deb tasavvur qiling:
- **Global Scope:** Bu uyning hovlisi. Hovlidagi narsani hamma xonadan ko'rish mumkin.
- **Local Scope (Xona):** Bu sizning yotoqxonangiz. U yerdagi narsalarni faqat o'sha xonada o'tirganlar ko'radi. Tashqaridagilar (globaldagilar) ichkarida nima borligini bilmaydi.

## 3. STRUKTURA

### A. Global Scope
Hamma joyda ishlaydigan o'zgaruvchilar:
\`\`\`javascript
let hovli = "Daraxt";
function xona() {
  console.log(hovli); // Daraxtni ko'rsa bo'ladi
}
\`\`\`

### B. Function Scope
Faqat funksiya ichida ko'rinadigan o'zgaruvchilar:
\`\`\`javascript
function xona() {
  let kravat = "Yumshoq";
}
console.log(kravat); // Xato! (ReferenceError)
\`\`\`

### C. Block Scope (let va const)
\`if\`, \`for\` yoki \`{ }\` ichidagi o'zgaruvchilar:
\`\`\`javascript
if (true) {
  let sir = "Maxfiy";
}
console.log(sir); // Xato!
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let ism = "Farhod"; // Global
function salom() {
  let xabar = "Assalomu alaykum"; // Local
  console.log(xabar + ", " + ism);
}
salom();
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Global o'zgaruvchilarni ko'p ishlatish:** Bu "Global Namespace Pollution" deyiladi va xatolarga sabab bo'ladi.
2.  **var va Block Scope:** \`var\` block scope'ni tushunmaydi! \`if\` ichidagi \`var\` tashqarida ham ko'rinadi. Doim \`let\` va \`const\` ishlating.

## 6. SAVOLLAR (12 ta)
1. Scope nima?
2. Global scope nima?
3. Local (Function) scope nima?
4. Block scope nima?
5. \`let\`, \`const\` va \`var\`ning scope bo'yicha farqi nima?
6. Scope Chain (zanjiri) nima?
7. Nima uchun global o'zgaruvchilardan qochish kerak?
8. Funksiya ichidagi o'zgaruvchi global o'zgaruvchi bilan bir xil nomda bo'lsa nima bo'ladi?
9. "Lexical scope" nima degani?
10. O'zgaruvchi e'lon qilinmagan bo'lsa, JS uni qayerdan qidiradi?
11. Block scope \`if\` va \`for\`dan tashqari qayerda bo'lishi mumkin?
12. Nesting (ichma-ich) scopelar qanday ishlaydi?`,
  exercises: [
    {
      id: 1,
      title: "Local scope mashqi",
      instruction: "Funksiya ichida o'zgaruvchi yarating va uni tashqarida chiqarishga urinib xato (ReferenceError) oling.",
      startingCode: "function test() {\n  // Bu yerda let x = 5 yarating\n}\ntest();\n// Bu yerda console.log(x) qiling",
      hint: "console.log(x) ni test() dan tashqarida yozing.",
      test: "if (output.includes('ReferenceError')) return null; return 'Xato chiqishi kerak edi';"
    }
  ]
};

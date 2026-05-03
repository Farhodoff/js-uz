export const equalityAlgorithms = {
  id: "equality-algorithms",
  title: "Tenglik Operatorlari (Equality)",
  theory: `## 1. LOOSE EQUALITY (==) — YUMSHOQ TENGLIK
\`==\` operatori solishtirishdan oldin operandlarning **tiplarini avtomatik o‘zgartiradi** (type coercion). Qiymatlar bir xil bo‘lsa \`true\` qaytaradi.

### Coercion qoidalari:
- **String vs Number:** string numberga aylanadi: \`"5" == 5\` → \`true\`
- **Boolean vs Number:** boolean numberga (\`true\` → 1, \`false\` → 0): \`true == 1\` → \`true\`
- **Null vs Undefined:** Ular faqat bir-biriga teng: \`null == undefined\` → \`true\`
- **NaN:** Hech narsaga teng emas (hatto o‘ziga ham): \`NaN == NaN\` → \`false\`

\`\`\`javascript
console.log(5 == "5");  // true
console.log(0 == false); // true
console.log([] == "");   // true
\`\`\`

---

## 2. STRICT EQUALITY (===) — QATTIQ TENGLIK
\`===\` hech qanday tip o'zgarishini (coercion) amalga oshirmaydi. **Ham turi, ham qiymati** bir xil bo‘lishi kerak.

\`\`\`javascript
console.log(5 === "5");  // false (number vs string)
console.log(0 === false); // false (number vs boolean)
\`\`\`

**Best Practice:** Har doim \`===\` ishlatish tavsiya etiladi.

---

## 3. Object.is() — ENG ANIQ TENGLIK
\`Object.is()\` ES6 da qo‘shilgan bo'lib, u \`===\` ga juda o'xshash, lekin ikkita muhim farqi bor:

- **NaN bilan:** \`Object.is(NaN, NaN)\` → \`true\`
- **-0 va +0 bilan:** \`Object.is(-0, +0)\` → \`false\`

\`\`\`mermaid
graph TD
    A[Solishtirish Usullari] --> B[==: Coercion qiladi]
    A --> C[===: Tipni ham tekshiradi]
    A --> D["Object.is: Eng aniq (NaN, -0/+0)"]
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **== va === farqi nima?**
   *Javob:* \`==\` tiplarni bir xil qilib solishtiradi (coercion), \`===\` esa tiplar har xil bo'lsa darhol \`false\` qaytaradi.

2. **Nima uchun NaN === NaN false qaytaradi?**
   *Javob:* JavaScript spetsifikatsiyasiga ko'ra, NaN (son emas) unikal qiymat va u o'z-o'ziga ham teng emas. Uni tekshirish uchun \`isNaN()\` yoki \`Object.is()\` kerak.

3. **null == undefined nega true?**
   *Javob:* Bu JavaScriptdagi maxsus qoida. Ular qiymat yo'qligini anglatgani uchun loose equalityda teng deb hisoblanadi.`,
  exercises: [
    {
      id: 1,
      title: "Coercion sinovi",
      instruction: "0 ni 'false' bilan '==' yordamida solishtiring va natijani ko'ring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(0 == false);",
      test: "if (logs.includes('true')) return null; return 'true chiqishi kerak';"
    },
    {
      id: 2,
      title: "Strict Equality",
      instruction: "10 ni '10' stringi bilan '===' yordamida solishtiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(10 === '10');",
      test: "if (logs.includes('false')) return null; return 'false chiqishi kerak (turlari har xil)';"
    },
    {
      id: 3,
      title: "NaN va Object.is",
      instruction: "Object.is yordamida NaN ni o'zi bilan solishtiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(Object.is(NaN, NaN));",
      test: "if (logs.includes('true')) return null; return 'Object.is(NaN, NaN) true bo\\'lishi kerak';"
    }
  ]
};

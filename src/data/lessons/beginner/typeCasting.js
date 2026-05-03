export const typeCasting = {
  id: "type-casting",
  title: "Explicit Type Casting (Aniq tiplarni o'zgartirish)",
  theory: `## 1. KIRISH
**Explicit Type Casting** – dasturchi tomonidan ma’lumot turini **aniq**, o‘zi yozgan kod orqali bir turdan boshqasiga o‘tkazish. JavaScriptda buning uchun maxsus funksiyalar va operatorlar mavjud.

Farqli o‘laroq, **Implicit Coercion** (avtomatik) JavaScriptning o‘zi tomonidan amalga oshiriladi.

---

## 2. STRING GA O'TKAZISH
- \`String(value)\` — eng xavfsiz usul.
- \`value.toString()\` — \`null\` va \`undefined\` da xato beradi.

\`\`\`javascript
console.log(String(123));       // "123"
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"

let num = 456;
console.log(num.toString());    // "456"
\`\`\`

---

## 3. NUMBER GA O'TKAZISH
- \`Number(value)\` — to'liq songa o'tkazadi.
- \`parseInt(string)\` — matn boshidagi butun sonni ajratib oladi.
- \`parseFloat(string)\` — kasr sonlar uchun.
- \`+value\` — qisqa "unary plus" operatori.

\`\`\`javascript
console.log(Number("123.45"));  // 123.45
console.log(parseInt("123px"));   // 123
console.log(+"500");              // 500
\`\`\`

---

## 4. BOOLEAN GA O'TKAZISH
- \`Boolean(value)\`
- \`!!value\` — qisqa "double NOT" usuli.

**Falsy qiymatlar (6 ta):** \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Qolgan hamma narsa — \`true\`.

---

## 5. TYPE CASTING JADVALI
| Qiymat | String | Number | Boolean |
|--------|--------|--------|---------|
| \`0\` | \`"0"\` | \`0\` | \`false\` |
| \`""\` | \`""\` | \`0\` | \`false\` |
| \`null\` | \`"null"\` | \`0\` | \`false\` |
| \`[]\` | \`""\` | \`0\` | \`true\` |
| \`{}\` | \`"[object Object]"\` | \`NaN\` | \`true\` |

---

## 6. INTERVYU SAVOLLARI (Junior & Middle)

### Nazariy (Junior)
1. **String() va .toString() farqi?** - \`String()\` null/undefined bilan ishlaydi, \`.toString()\` esa xato (TypeError) beradi.
2. **parseInt() va parseFloat() farqi?** - \`parseInt\` butun sonni oladi, \`parseFloat\` esa nuqtadan keyingi qismini ham saqlaydi.

### Amaliy (Middle) ⭐
**Savol:** \`parseInt(0.0000005)\` nima beradi?
**Javob:** \`5\`. Chunki \`0.0000005\` stringga o'tganda \`"5e-7"\` bo'ladi va \`parseInt\` birinchi raqamni (\`5\`) oladi. Bu mashhur intervyu savoli!
`,
  exercises: [
    {
      id: 1,
      title: "String dan Number ga",
      instruction: "parseInt yordamida '123px' matnidan sonni ajratib oling va consolega chiqaring.",
      startingCode: "const val = '123px';\n// Bu yerga yozing\n",
      hint: "console.log(parseInt(val));",
      test: "if (logs.includes('123')) return null; return 'Natija 123 chiqishi kerak';"
    },
    {
      id: 2,
      title: "Safe Integer Funksiyasi",
      instruction: "toSafeInteger(value) funksiyasini yozing. U Number(value) qaytarsin, agar natija NaN bo'lsa 0 qaytarsin.",
      startingCode: "function toSafeInteger(value) {\n  const n = Number(value);\n  // Bu yerda tekshiring\n}\n\nconsole.log(toSafeInteger('abc'));",
      hint: "isNaN(n) dan foydalaning.",
      test: "if (typeof toSafeInteger === 'function' && logs.includes('0')) return null; return 'NaN o\\'rniga 0 qaytishi kerak';"
    },
    {
      id: 3,
      title: "Safe ToString",
      instruction: "null va undefined da ham ishlaydigan safeToString(value) funksiyasini yozing.",
      startingCode: "function safeToString(value) {\n  // Bu yerga yozing\n}\n\nconsole.log(safeToString(null));",
      hint: "String(value) dan foydalaning.",
      test: "if (logs.includes('null')) return null; return 'null stringga o\\'tishi kerak';"
    }
  ]
};

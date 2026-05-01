export const typeCasting = {
  id: "b18",
  title: "Type Casting vs Coercion: JSning 'ayyorliklari'",
  theory: `## 1. KIRISH
JavaScript — xameleon til. U ba'zida sonni matnga, matnni esa booleanga (true/false) sizdan so'ramasdan o'zgartirib yuboradi. Buni tushunmaslik dasturda kutilmagan buglarga va intervyuda yiqilishga sabab bo'ladi.

## 2. CHUQUR TUSHUNCHALAR

### Explicit Casting (Siz xohlagan o'zgarish)
Dasturchi o'zi atayin bir turdan boshqasiga o'tkazishi.
\`\`\`javascript
let son = String(100); // Sonni matnga o'tkazdik
let matn = Number("12.5"); // Matnni songa o'tkazdik
\`\`\`

### Implicit Coercion (JSning o'zi qiladigan o'zgarish) ⭐
JavaScript amalni bajarish uchun turlarni o'zi avtomatik moslashtirishi.
- **Qo'shish (+)**: Agar bitta taraf matn bo'lsa, hamma narsani **matnga** aylantiradi.
- **Boshqa amallar (-, *, /)**: Hamma narsani **songa** aylantirishga harakat qiladi.

---

## 3. KOD MISOLLARI

### Misol 1 — Qo'shish vs Ayirish (Tuzoq!)
**Maqsad:** \`+\` va \`-\` operatorlari turlarga qanday ta'sir qilishini ko'rsatish.
\`\`\`javascript
console.log("5" + 2); // → "52" (Matnga qo'shib yubordi)
console.log("5" - 2); // → 3 (Ayirishda songa aylantirdi)
console.log("5" * "2"); // → 10 (Ko'paytirishda ham son bo'ladi)
\`\`\`

### Misol 2 — Mantiqiy Coercion (Truthy & Falsy)
JavaScriptda ba'zi qiymatlar har doim \`false\` deb hisoblanadi:
\`0\`, \`""\` (bo'sh matn), \`null\`, \`undefined\`, \`NaN\`, \`false\`.
Qolgan hamma narsa — \`true\`!

\`\`\`javascript
if ("") {
  console.log("Bu ishlamaydi"); // Bo'sh matn - falsy
}
if (" ") {
  console.log("Bu ishlaydi!"); // Bo'shliq bor matn - truthy
}
\`\`\`

---

## 4. VIZUAL JADVAL
### "G'alati" Coercionlar (Intervyu savollari)
| Amal | Natija | Tushuntirish |
|---|---|---|
| \`true + 1\` | \`2\` | true = 1 |
| \`false + 1\` | \`1\` | false = 0 |
| \`!! "Salom"\` | \`true\` | Matnni booleanga o'girish |
| \`+ "50"\` | \`5\` | Matn boshidagi \`+\` uni songa o'giradi |

---

## 5. INTERVYU SAVOLLARI
1. **Implicit va Explicit casting farqi?** - Explicit - dasturchi tomonidan, Implicit - JS tomonidan avtomatik bajariladi.
2. **"5" - "2" nima beradi?** - 3 qaytaradi (son sifatida).
3. **Truthy va Falsy qiymatlar nima?** - Boolean kontekstida (if ichida) true yoki false deb olinadigan qiymatlar.

---

## 6. MINI LOYIHA: "Input Calculator"
**Vazifa:** Foydalanuvchi kiritgan ikkita matnli sonni to'g'ri qo'shing.

\`\`\`javascript
let a = "10";
let b = "20";

// Xato: console.log(a + b); // "1020"

// To'g'ri (Explicit casting):
let natija = Number(a) + Number(b);
console.log("Natija:", natija); // → 30
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Coercion sinovi",
      instruction: "Matnli '10' va '5' sonlarini ayiring va natijani ko'ring.",
      startingCode: "// '10' dan '5' ni ayiring\n",
      hint: "console.log('10' - '5')",
      test: "if (logs.includes('5')) return null; return 'Natija 5 chiqishi kerak';"
    },
    {
      id: 2,
      title: "Truthy tekshiruvi",
      instruction: "Bo'sh massiv [] 'truthy'mi yoki 'falsy'? if yordamida tekshiring.",
      startingCode: "if ([]) {\n  console.log('Massiv truthy');\n}",
      hint: "Bo'sh massiv har doim true beradi.",
      test: "if (logs.includes('Massiv truthy')) return null; return 'Massiv truthy chiqishi kerak';"
    }
  ]
};

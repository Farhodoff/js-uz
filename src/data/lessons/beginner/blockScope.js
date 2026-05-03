export const blockScopeLesson = {
  id: "block-scope",
  title: "Block Scope: {} belgilarining kuchi",
  theory: `## 1. KIRISH
O'rta asrlarda uylarning atrofida **devorlar** bo'lgan. JavaScriptda \`{ }\` jingalak qavslar xuddi o'sha devorlardir. Ular \`let\` va \`const\` o'zgaruvchilarini tashqi olamdan himoya qiladi.

## 2. TUSHUNCHA

### Sodda ta'rif
Block Scope - bu jingalak qavslar \`{ }\` ichida e'lon qilingan o'zgaruvchilarning faqat shu qavslar ichida yashashidir. Bu \`if\`, \`for\` yoki shunchaki bo'sh qavslar bo'lishi mumkin.

### Muhim Farq: var vs let ⭐
- **let / const**: Blokni (devorni) tan oladi. Ichkarida qoladi.
- **var**: Blokni (devorni) tan olmaydi! U devordan oshib o'tib ketadi.

### Sintaksis
\`\`\`javascript
if (true) {
  let x = 1; // Block Scope
  var y = 2; // Block Scope-da emas!
}

// console.log(x); // ❌ XATO
console.log(y); // ✅ 2 (var devordan oshib o'tdi)
\`\`\`

---

## 3. KOD MISOLLARI

### Misol 1 — if bloki
\`\`\`javascript
if (true) {
  const meva = "Olma";
}
// console.log(meva); // ❌ ReferenceError
\`\`\`

### Misol 2 — for loop (Eng mashhur muammo)
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  // i faqat shu yerda yashaydi
}
// console.log(i); // ❌ i o'lib bo'lgan
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### var va let devorga qarshi
\`\`\`mermaid
graph TD
    A["Tashqari"] --- B["Devor { }"]
    B --- C("let: Ichkarida qoldi")
    B -.-> D("var: Devordan o'tib ketdi")
    style B fill:#f9f,stroke:#333,stroke-width:4px
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Block Scope nima?** - Jingalak qavslar ichidagi hudud.
2. **Qaysi kalit so'zlar block scope-ni tan oladi?** - \`let\` va \`const\`.
3. **var nega yomon?** - Chunki u bloklardan chiqib ketib, global o'zgaruvchilar bilan to'qnashib ketishi mumkin.

---

## 6. MINI LOYIHA: "Vaqtinchalik O'zgaruvchi"
**Vazifa:** Hisob-kitob uchun vaqtinchalik o'zgaruvchi ishlating va u tashqariga chiqib ketmasligini ta'minlang.

\`\`\`javascript
let natija = 0;

{
  let temp = 10 * 5;
  natija = temp + 5;
}

console.log(natija); // 55
// console.log(temp); // temp bu yerda yo'q, xavfsiz ✅
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Blok ichida saqlash",
      instruction: "if bloki ichida const bilan 'data' yarating. Uni blokdan tashqarida ishlatib bo'lmasligiga ishonch hosil qiling.",
      startingCode: "if (true) {\n  // data yarating\n}\n",
      hint: "const data = 'test';",
      test: "if (code.includes('const data')) return null; return 'data o\\'zgaruvchisini yarating';"
    }
  ]
};

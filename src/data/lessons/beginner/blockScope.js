export const blockScopeLesson = {
  id: "b10",
  title: "Block Scope vs Function Scope",
  theory: `## Scope turlari: Function vs Block

Scope – o‘zgaruvchining qayerda ko‘rinishi va qayerda ishlatilishi mumkinligini belgilaydi.

### 1. Function Scope (Funksiya doirasi)
**Qoida:** Funksiya ichida e’lon qilingan o‘zgaruvchi **faqat shu funksiya ichida** mavjud. Tashqaridan uni ko‘rib bo‘lmaydi.
- Funksiya ichidagi barcha o‘zgaruvchilar (\`var\`, \`let\`, \`const\`) – funksiyadan tashqariga chiqmaydi.

### 2. Block Scope (Blok doirasi)
**Blok** – bu \`{ ... }\` jingalak qavslar orasidagi qism (masalan, \`if\`, \`for\`, \`while\`).
- **Qoida:** \`let\` va \`const\` bilan e’lon qilingan o‘zgaruvchi **faqat o‘sha blok ichida** mavjud.
- **var** esa blokga bo‘ysunmaydi – u faqat funksiyaga bo‘ysunadi.

### Qiyosiy jadval

| Turi | Qayerda e’lon qilingan | Qayerdan kirish mumkin |
|------|------------------------|------------------------|
| **Function scope** (\`var, let, const\`) | Funksiya ichida | Faqat shu funksiya ichida |
| **Block scope** (\`let, const\`) | Blok \`{}\` ichida | Faqat shu blok ichida |
| **var** blok ichida | Blok \`{}\` ichida | Butun funksiya bo‘ylab |

### Misol – farqni ko‘rish uchun:
\`\`\`javascript
function misol() {
  if (true) {
    var a = 1;   // function scope (var)
    let b = 2;   // block scope
    const c = 3; // block scope
  }
  console.log(a); // 1 (var blokdan tashqarida ham bor)
  // console.log(b); // XATO! b faqat if blokida
}
\`\`\`

---

## Nega bu muhim? (Real misol)
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Natija: 3, 3, 3 (var blokni tanimaydi)

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Natija: 0, 1, 2 (let har iteratsiyada yangi scope yaratadi)
\`\`\``,
  task: `// 1-savol: Quyidagi kodda nima chiqadi? Nega?
function testVar() {
  var x = 5;
  if (true) {
    var x = 10;
    console.log("ichida var: " + x);
  }
  console.log("tashqarida var: " + x);
}
// testVar();

// 2-savol: Agar var o‘rniga let ishlatsangiz, nima o‘zgaradi?
function testLet() {
  let x = 5;
  if (true) {
    let x = 10;
    console.log("ichida let: " + x);
  }
  console.log("tashqarida let: " + x);
}
// testLet();

// Amaliy: if bloki ichida const bilan obyekt yarating va unga blokdan tashqarida murojaat qilib ko'ring.`,
  hint: `// 1. var ishlatilganda x = 10 bo'lib o'zgaradi, chunki var blokni tanimaydi. 
// Natija: 10, 10

// 2. let ishlatilganda ichkaridagi x faqat blok ichida, tashqaridagisi o'z holicha qoladi.
// Natija: 10, 5`
};

export const functionalProgramming = {
  id: "a14",
  title: "Functional Programming (Funksional dasturlash)",
  theory: `## 1. KIRISH
Funksional dasturlash - bu kodni matematik funksiyalar to'plami sifatida yozish uslubidir. Bu uslub kodni osonroq test qilish, o'qish va xatolarni kamaytirish imkonini beradi. **React** kabi zamonaviy kutubxonalar aynan shu tamoyil asosida qurilgan.

## 2. TUSHUNCHA

### Pure Functions (Sof funksiyalar)
Bir xil kirish qiymati uchun doim bir xil natija beradigan va tashqi dunyoga (side effects) ta'sir qilmaydigan funksiyalar.

### Immutability (O'zgarmaslik)
Ma'lumotlarni o'zgartirmasdan, ularning nusxasini yaratib ishlatish. 
**Metafora:** Hujjatning asliga o'zgartirish kiritmasdan, nusxasini olib, o'sha nusxada ishlash.

### Higher-Order Functions
Boshqa funksiyalarni argument sifatida qabul qiladigan yoki funksiya qaytaradigan funksiyalar.

---

## 3. KOD MISOLLARI

### Misol 1 — Pure vs Impure
\`\`\`javascript
// Impure (Yomon): Tashqi o'zgaruvchiga bog'liq
let tax = 0.1;
function calculateTax(price) {
  return price * tax; 
}

// Pure (Yaxshi): Faqat kirishga bog'liq
function calculateTaxPure(price, taxRate) {
  return price * taxRate;
}
\`\`\`

### Misol 2 — Immutability (O'zgarmaslik)
\`\`\`javascript
const original = [1, 2, 3];

// Yomon: push() originalni o'zgartiradi
// original.push(4); 

// Yaxshi: Spread operator bilan nusxa olish
const updated = [...original, 4];

console.log(original); // → [1, 2, 3]
console.log(updated);  // → [1, 2, 3, 4]
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Funksiya "Oqimi"
\`\`\`
Ma'lumot (A) ──▶ [Pure Function 1] ──▶ Ma'lumot (B) ──▶ [Pure Function 2] ──▶ Natija (C)
\`\`\`
Hech qachon **A** ning o'zi o'zgarmaydi!

---

## 5. INTERVYU SAVOLLARI
1. **Pure function nima?** - Faqat o'z argumentlariga bog'liq bo'lgan va tashqi holatni o'zgartirmaydigan funksiya.
2. **Nima uchun immutability muhim?** - Kodni bashorat qilib bo'ladigan (predictable) qiladi va "yashirin" buglarni kamaytiradi.
3. **Higher-order funksiyalarga misol keltiring?** - \`map\`, \`filter\`, \`reduce\`.

---

## 6. MINI LOYIHA: "Data Pipe"
**Vazifa:** Ma'lumotlarni birma-bir o'zgartiruvchi funksiyalar zanjirini yarating.

\`\`\`javascript
const double = x => x * 2;
const addFive = x => x + 5;

const pipe = (val, ...fns) => fns.reduce((acc, fn) => fn(acc), val);

const result = pipe(10, double, addFive);
console.log(result); // → 25 (10 * 2 + 5)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Sof funksiya yozish",
      instruction: "Berilgan sonning kvadratini qaytaruvchi 'pure' funksiya yozing.",
      startingCode: "function square(n) {\n  // Bu yerga yozing\n}\n",
      hint: "Faqat return n * n; ishlating.",
      test: "if (square(5) === 25) return null; return 'Natija noto\\'g\\'ri';"
    }
  ]
};

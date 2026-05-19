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

## 4. XATOLAR (Common mistakes)

1. **Mutatsiya qilish:** \`push/splice\` bilan original massivni o'zgartirish.
2. **Impure funksiya yozish:** tashqi state'ga tayanish.
3. **Composition o'rniga ketma-ket if/else:** kod ko'payadi va test qiyinlashadi.
4. **Katta funksiya:** kichik, qayta ishlatiladigan funksiyalar yo'qligi.

---

## 5. MINI LOYIHA: "Data Pipe"
**Vazifa:** Ma'lumotlarni birma-bir o'zgartiruvchi funksiyalar zanjirini yarating.

\`\`\`javascript
const double = x => x * 2;
const addFive = x => x + 5;

const pipe = (val, ...fns) => fns.reduce((acc, fn) => fn(acc), val);

const result = pipe(10, double, addFive);
console.log(result); // → 25 (10 * 2 + 5)
\`\`\`

## 6. AMALIYOT (Mushqlar pastda)

## 7. SAVOLLAR VA JAVOBLAR

<details><summary>1. Pure function nima?</summary>Faqat kirishga bog'liq, tashqi holatni o'zgartirmaydi.</details>
<details><summary>2. Immutability nima uchun kerak?</summary>Predictable kod va yashirin bug'larni kamaytiradi.</details>
<details><summary>3. Side effect nima?</summary>Funksiya tashqi state'ni o'zgartirishi yoki I/O qilishidir.</details>
<details><summary>4. Higher-order function nima?</summary>Funksiyani parametr sifatida oladi yoki funksiya qaytaradi.</details>
<details><summary>5. map/filter/reduce qachon ishlatiladi?</summary>Transform, saralash va agregatsiya uchun.</details>
<details><summary>6. Currying nima?</summary>Funksiyani bosqichma-bosqich chaqirish.</details>
<details><summary>7. Partial application nima?</summary>Argumentlarning bir qismini oldindan berib qo'yish.</details>
<details><summary>8. Compose va Pipe farqi?</summary>Compose o'ngdan chapga, Pipe chapdan o'ngga.</details>
<details><summary>9. Referential transparency nima?</summary>Bir xil kirishga bir xil natija (side effect yo'q).</details>
<details><summary>10. Immutable update qanday qilinadi?</summary>Spread/concat bilan nusxa yaratiladi.</details>
<details><summary>11. Pure funksiya testga nega qulay?</summary>Setup kam, natija deterministic.</details>
<details><summary>12. FP qayerda foydali?</summary>UI, data transform, pipeline va testlar.</details>
`,
  exercises: [
    {
      id: 1,
      title: "Sof funksiya yozish",
      instruction: "Berilgan sonning kvadratini qaytaruvchi 'pure' funksiya yozing.",
      startingCode: "function square(n) {\n  // Bu yerga yozing\n}\n",
      hint: "Faqat return n * n; ishlating.",
      test: "if (square(5) === 25) return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Immutability",
      instruction: "Original massivni o'zgartirmasdan yangi element qo'shing.",
      startingCode: "const original = [1, 2, 3];\n// Bu yerga yangi massiv yarating\n",
      hint: "const updated = [...original, 4];",
      test: "if (code.includes('...') || code.includes('concat')) return null; return 'Immutability xato';"
    },
    {
      id: 3,
      title: "map() bilan transform",
      instruction: "Massivdagi sonlarni kvadratga aylantiring.",
      startingCode: "const nums = [1, 2, 3];\n// map orqali square qiling\n",
      hint: "const squared = nums.map(n => n * n);",
      test: "if (code.includes('.map')) return null; return 'map yoq';"
    },
    {
      id: 4,
      title: "filter() bilan saralash",
      instruction: "Faqat juft sonlarni qoldiring.",
      startingCode: "const nums = [1, 2, 3, 4];\n// Bu yerga filter\n",
      hint: "const evens = nums.filter(n => n % 2 === 0);",
      test: "if (code.includes('.filter')) return null; return 'filter yoq';"
    },
    {
      id: 5,
      title: "reduce() bilan yig'indi",
      instruction: "Massiv yig'indisini reduce bilan toping.",
      startingCode: "const nums = [1, 2, 3];\n// Bu yerga reduce\n",
      hint: "const sum = nums.reduce((acc, n) => acc + n, 0);",
      test: "if (code.includes('.reduce')) return null; return 'reduce yoq';"
    },
    {
      id: 6,
      title: "Higher-order function",
      instruction: "Funksiyani 2 marta qo'llaydigan applyTwice yozing.",
      startingCode: "function applyTwice(fn, value) {\n  // Bu yerga yozing\n}\n",
      hint: "return fn(fn(value));",
      test: "if (code.includes('fn(')) return null; return 'HOF xato';"
    },
    {
      id: 7,
      title: "Compose",
      instruction: "Compose funksiyasini yozing (o'ngdan chapga).",
      startingCode: "const compose = (...fns) => {\n  // Bu yerga yozing\n};\n",
      hint: "return x => fns.reduceRight((acc, fn) => fn(acc), x);",
      test: "if (code.includes('reduceRight')) return null; return 'Compose xato';"
    },
    {
      id: 8,
      title: "Pipe",
      instruction: "Pipe funksiyasini yozing (chapdan o'ngga).",
      startingCode: "const pipe = (...fns) => {\n  // Bu yerga yozing\n};\n",
      hint: "return x => fns.reduce((acc, fn) => fn(acc), x);",
      test: "if (code.includes('reduce(')) return null; return 'Pipe xato';"
    },
    {
      id: 9,
      title: "Currying",
      instruction: "add funksiyasini currying ko'rinishida yozing.",
      startingCode: "const add = (a) => {\n  // Bu yerga yozing\n};\n",
      hint: "return (b) => a + b;",
      test: "if (code.includes('=>')) return null; return 'Currying xato';"
    },
    {
      id: 10,
      title: "Partial application",
      instruction: "greet funksiyasidan sayHello'ni partial qiling.",
      startingCode: "function greet(greeting, name) { return greeting + ', ' + name; }\n// Bu yerga sayHello\n",
      hint: "const sayHello = greet.bind(null, 'Salom');",
      test: "if (code.includes('.bind')) return null; return 'Partial xato';"
    },
    {
      id: 11,
      title: "Memoization",
      instruction: "Natijani kesh qiluvchi memoize yozing.",
      startingCode: "function memoize(fn) {\n  const cache = {};\n  // Bu yerga yozing\n}\n",
      hint: "return (...args) => { const key = JSON.stringify(args); if (key in cache) return cache[key]; return cache[key] = fn(...args); };",
      test: "if (code.includes('cache')) return null; return 'Memoize xato';"
    },
    {
      id: 12,
      title: "Kompleks: Pipeline",
      instruction: "map + filter + reduce bilan pipeline yarating.",
      startingCode: "const nums = [1, 2, 3, 4, 5];\n// 1) juftlarni qoldiring\n// 2) 2 ga ko'paytiring\n// 3) yig'indini toping\n",
      hint: "nums.filter(...).map(...).reduce(...);",
      test: "if (code.includes('.filter') && code.includes('.map') && code.includes('.reduce')) return null; return 'Pipeline xato';"
    }
  ]
};

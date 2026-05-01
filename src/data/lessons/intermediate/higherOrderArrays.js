export const higherOrderArrays = {
  id: "i6",
  title: "Massiv metodlari (map, filter, reduce)",
  theory: `## Massivlar bilan ishlash (map, filter, reduce)

JavaScriptda massivlar bilan ishlashda eng kuchli metodlar – \`map()\`, \`filter()\` va \`reduce()\`. Ular original massivni o‘zgartirmaydi, balki yangi massiv yoki qiymat qaytaradi.

### Vizual Farqlar
\`\`\`mermaid
graph TD
    A[Original Massiv] --> B(map)
    A --> C(filter)
    A --> D(reduce)
    B --> B1[Yangi Massiv: Har bir element o'zgargan]
    C --> C1[Yangi Massiv: Faqat shartga moslar]
    D --> D1[Bitta Qiymat: Jamlangan natija]
\`\`\`

---

### 1. map() – O‘zgartirish (Transform)
\`map()\` – massivning har bir elementini funksiya orqali o‘tkazib, **yangi massiv** yaratadi.
\`\`\`javascript
let doubled = [1, 2, 3].map(num => num * 2); // [2, 4, 6]
\`\`\`

### 2. filter() – Saralash (Filtr)
\`filter()\` – berilgan shartga mos keladigan elementlardan iborat **yangi massiv** yaratadi.
\`\`\`javascript
let evens = [1, 2, 3, 4].filter(num => num % 2 === 0); // [2, 4]
\`\`\`

### 3. reduce() – Jamlash (Accumulate)
\`reduce()\` – massiv elementlarini **bir qiymatga** jamlaydi.
\`\`\`javascript
let sum = [1, 2, 3].reduce((acc, curr) => acc + curr, 0); // 6
\`\`\``,
  exercises: [
    {
      id: 1,
      title: "map() mashqi",
      instruction: "Berilgan 'prices' massividagi har bir narxni 1.2 barobarga oshiring (20% qo'shing) va natijani consolega chiqaring.",
      startingCode: "const prices = [100, 200, 300];\n// Kodni shu yerga yozing\n",
      hint: "const newPrices = prices.map(p => p * 1.2);",
      test: "if (!code.includes('.map')) return '.map() ishlatilmagan'; if (!logs.join(' ').includes('120') || !logs.join(' ').includes('360')) return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "filter() mashqi",
      instruction: "Berilgan 'numbers' massivdan faqat 10 dan katta bo'lgan sonlarni ajratib oling va consolega chiqaring.",
      startingCode: "const numbers = [5, 12, 8, 130, 44];\n// Kodni shu yerga yozing\n",
      hint: "numbers.filter(n => n > 10)",
      test: "if (!code.includes('.filter')) return '.filter() ishlatilmagan'; if (!logs.join(',').includes('130')) return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "reduce() mashqi",
      instruction: "Berilgan 'scores' massividagi barcha sonlar yig'indisini hisoblang.",
      startingCode: "const scores = [10, 20, 30, 40];\n// Kodni shu yerga yozing\n",
      hint: "scores.reduce((sum, n) => sum + n, 0)",
      test: "if (!code.includes('.reduce')) return '.reduce() ishlatilmagan'; if (!logs.join('').includes('100')) return 'Yig\\'indi noto\\'g\\'ri';"
    }
  ]
};

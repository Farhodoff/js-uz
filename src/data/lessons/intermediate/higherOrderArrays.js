export const higherOrderArrays = {
  id: "higher-order-arrays",
  title: "🚀 Massiv Metodlari (Deep Dive)",
  level: "Intermediate",
  description: "Massivlar bilan professional darajada ishlash: map, filter, reduce va boshqa zamonaviy metodlar.",
  theory: `## Massiv Metodlari (Advanced)

**NEGA:** Tasavvur qiling, sizda minglab foydalanuvchilar ro'yxati bor. Sizga faqat 18 yoshdan kattalarning ismlari kerak. Eskicha \`for\` sikli bilan bu juda ko'p kod va xatolar ehtimolini tug'diradi. Zamonaviy metodlar (Higher Order Functions) esa bu vazifani bir necha qatorda, "toza" (clean code) uslubda bajarishga imkon beradi.

---

### 1. map() — O'zgartirish Zavodi 🏭
\`map()\` massivdagi har bir elementni oladi, uni o'zgartiradi va **yangi massiv** qaytaradi.

**Analogiya:** Xomashyo kiradi -> Ishlov beriladi -> Tayyor mahsulot chiqadi.

\`\`\`javascript
const narxlar = [10, 20, 30];
const dollarNarxlar = narxlar.map(narx => narx * 12600); 
// [126000, 252000, 378000]
\`\`\`

---

### 2. filter() — Aqlli Elak 筛选
\`filter()\` berilgan shartga mos keladigan elementlarni saralab, **yangi massiv** yasaydi.

**Analogiya:** Choynakdagi elak — faqat choy suvi o'tadi, shingil (shartga mos kelmaganlar) qolib ketadi.

\`\`\`javascript
const ballar = [45, 80, 55, 90, 30];
const imtihondanOtdi = ballar.filter(ball => ball >= 60);
// [80, 90]
\`\`\`

---

### 3. reduce() — Jamlovchi Akkumulyator 🧮
Bu eng kuchli metodlardan biri. U butun massivni bitta qiymatga (son, satr, obyekt, hatto boshqa massiv) aylantiradi.

**Tuzilishi:** \`reduce((yig'indi, joriy), boshlang'ich_qiymat)\`

\`\`\`javascript
const savat = [500, 1200, 300];
const jamiSumma = savat.reduce((sum, narx) => sum + narx, 0);
// 2000
\`\`\`

---

### 4. find() va findIndex() — Izquvarlar 🔍
- \`find()\` — shartga mos **birinchi** elementning o'zini qaytaradi.
- \`findIndex()\` — o'sha elementning **indeksini** qaytaradi.

\`\`\`javascript
const users = [{id: 1, name: "Ali"}, {id: 2, name: "Vali"}];
const user = users.find(u => u.id === 2); // {id: 2, name: "Vali"}
\`\`\`

---

### 5. some() va every() — Tekshiruvchilar ✅
- \`some()\` — massivda **kamida bitta** element shartga mos kelsa \`true\` qaytaradi.
- \`every()\` — **barcha** elementlar shartga mos kelishi shart.

\`\`\`javascript
const yoshlar = [15, 20, 18];
console.log(yoshlar.some(y => y < 18)); // true
console.log(yoshlar.every(y => y >= 18)); // false
\`\`\`

---

### 6. "Buzib Ko'rish" va Muhim Eslatmalar (Edge Cases) ⚠️
- **Asl massiv:** Bu metodlarning deyarli hammasi asl massivni o'zgartirmaydi (immutability).
- **Bo'sh massiv:** Bo'sh massivda \`reduce\` ishlatganda boshlang'ich qiymat bermasangiz, xato (\`TypeError\`) beradi!
- **Return:** Arrow funksiyada \`{ }\` ishlatsangiz, \`return\` yozishni unutmang. Aks holda \`undefined\` qaytadi.

---

### 7. SAVOLLAR (12 ta) — Junior/Middle darajasida
1. \`map()\` qaytargan massiv uzunligi asl massiv bilan bir xil bo'ladimi?
2. \`filter()\` shartga mos hech narsa topmasa nima qaytaradi?
3. \`reduce()\` dagi akkumulyatorning vazifasi nima?
4. \`find()\` va \`filter()\` o'rtasidagi asosiy farq nima?
5. Massivda xatolik bormi-yo'qligini tekshirish uchun (\`every\` yoki \`some\`) qaysi biri ma'qul?
6. \`map()\` metodini \`forEach()\` bilan almashtirsa bo'ladimi? Nega?
7. \`reduce()\` yordamida massivni obyektga aylantirish mumkinmi?
8. \`find()\` metodi bir nechta element topsa nima bo'ladi?
9. Chaining (zanjir) nima va u qanday ishlaydi?
10. \`sort()\` metodi asl massivni o'zgartiradimi?
11. \`numbers.map(parseInt)\` natijasi nima bo'ladi va nega? (Mashhur intervyu savoli)
12. Massiv elementlarini qidirishda \`includes()\` va \`some()\` farqi nima?`,
  exercises: [
    {
      id: 1,
      title: "Map: Narxlarni yangilash",
      instruction: "Sizda mahsulotlar narxlari berilgan. Ularga 15% QQS qo'shib, yangi massiv yarating va konsolga chiqaring.",
      startingCode: "const prices = [100, 200, 300];\n// Kodni shu yerda yozing\n",
      hint: "prices.map(p => p * 1.15)",
      test: "if (logs.some(l => Array.isArray(l) && l[0] === 115)) return null; return 'Narxlar noto\\'g\\'ri hisoblangan!';"
    },
    {
      id: 2,
      title: "Filter: Faqat juft sonlar",
      instruction: "Berilgan massivdan faqat juft sonlarni saralab oling va natijani chiqaring.",
      startingCode: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8];\n",
      hint: "numbers.filter(n => n % 2 === 0)",
      test: "if (logs.some(l => Array.isArray(l) && l.length === 4 && l[0] === 2)) return null; return 'Faqat juft sonlar qolishi kerak!';"
    },
    {
      id: 3,
      title: "Reduce: Umumiy ball",
      instruction: "O'quvchilarning ballari berilgan. Ularning umumiy yig'indisini \`reduce\` orqali hisoblang.",
      startingCode: "const scores = [85, 90, 70, 100];\n",
      hint: "scores.reduce((total, s) => total + s, 0)",
      test: "if (logs.includes(345)) return null; return 'Umumiy ball 345 chiqishi kerak!';"
    }
  ]
};

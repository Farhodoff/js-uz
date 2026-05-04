export const higherOrderArrays = {
  id: "higher-order-arrays",
  title: "🚀 Massiv Metodlari (Deep Dive)",
  level: "O'rta daraja",
  description: "Massivlar bilan professional darajada ishlash: map, filter, reduce va boshqa zamonaviy metodlar.",
  theory: `## Massiv Metodlari

### 1. NEGA kerak?
Tasavvur qiling, sizda minglab foydalanuvchilar ro'yxati bor. Sizga faqat 18 yoshdan kattalarning ismlari kerak. Eskicha \`for\` sikli bilan bu juda ko'p kod va xatolar ehtimolini tug'diradi. Zamonaviy metodlar (Higher Order Functions) esa bu vazifani bir necha qatorda, "toza" (clean code) uslubda bajarishga imkon beradi.

### 2. SODDALIK (Analogiya)
- **map() — Zavod:** Xomashyo kiradi, ishlov beriladi, tayyor mahsulot chiqadi.
- **filter() — Elak:** Faqat shartga mos narsalar o'tadi, qolgani qoladi.
- **reduce() — Blender:** Hamma mevalarni solasiz va bitta sharbat (qiymat) olasiz.

### 3. STRUKTURA

#### A. map() — O'zgartirish
\`\`\`javascript
const narxlar = [10, 20, 30];
const dollarNarxlar = narxlar.map(narx => narx * 12600); 
\`\`\`

#### B. filter() — Saralash
\`\`\`javascript
const ballar = [45, 80, 55, 90, 30];
const otdi = ballar.filter(ball => ball >= 60);
\`\`\`

#### C. reduce() — Yig'ish
\`\`\`javascript
const savat = [500, 1200, 300];
const jami = savat.reduce((sum, narx) => sum + narx, 0);
\`\`\`

### 4. AMALIYOT (Mashqlar pastda)

### 5. XATOLAR (Common mistakes & Edge cases)
1. **Returnni unutish:** Arrow funksiyada \`{ }\` ishlatilsa, \`return\` shart! Bo'lmasa \`undefined\` qaytadi.
2. **Asl massiv:** Bu metodlar asl massivni o'zgartirmaydi, yangisini qaytaradi.
3. **Bo'sh massiv va reduce:** Bo'sh massivda boshlang'ich qiymat (0, [], {}) bermaslik xatoga olib kelishi mumkin.

### 6. SAVOLLAR (12 ta)
1. \`map()\` qaytargan massiv uzunligi asl massiv bilan bir xil bo'ladimi?
2. \`filter()\` shartga mos hech narsa topmasa nima qaytaradi?
3. \`reduce()\` dagi akkumulyatorning vazifasi nima?
4. \`find()\` va \`filter()\` o'rtasidagi asosiy farq nima?
5. \`every()\` va \`some()\` farqi nimada?
6. \`map()\` metodini \`forEach()\` bilan almashtirsa bo'ladimi? Nega?
7. \`reduce()\` yordamida massivni obyektga aylantirish mumkinmi?
8. \`find()\` metodi bir nechta element topsa nima bo'ladi?
9. Chaining (zanjir) nima?
10. \`sort()\` metodi asl massivni o'zgartiradimi?
11. \`numbers.map(parseInt)\` natijasi nima va nega?
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
      instruction: "O'quvchilarning ballari berilgan. Ularning umumiy yig'indisini `reduce` orqali hisoblang.",
      startingCode: "const scores = [85, 90, 70, 100];\n",
      hint: "scores.reduce((total, s) => total + s, 0)",
      test: "if (logs.includes(345)) return null; return 'Umumiy ball 345 chiqishi kerak!';"
    }
  ]
};

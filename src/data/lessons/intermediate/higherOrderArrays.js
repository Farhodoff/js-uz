export const higherOrderArrays = {
  id: "higher-order-arrays",
  title: "Massiv metodlari (Map, Filter, Reduce)",
  level: "Intermediate",
  description: "Massivlar bilan professional darajada ishlash: saralash, o'zgartirish va jamlash.",
  theory: `
# Massiv metodlari – Bu nima va nima uchun kerak?

**Higher Order Array Methods** — bu massivlar bilan ishlashni 10 barobar osonlashtiradigan "sehrli" asboblardir.

## 1. NEGA kerak?
Tasavvur qiling, sizda 100 ta son bor va ularning hammasini 2 barobarga oshirish kerak. Oddiy \`for\` sikli bilan bu 4-5 qator kod bo'ladi. \`map()\` bilan esa bu 1 qator! Bu kodni toza va tushunarli qiladi.

## 2. SODDALIK (Analogiya)
- **Map (O'zgartirish):** Bu xuddi zavod konveyeriga o'xshaydi. Har bir mahsulot (element) kiradi, unga biror narsa qo'shiladi va u yangi holda chiqadi.
- **Filter (Saralash):** Bu xuddi elakka o'xshaydi. Faqat siz aytgan shartga mos keladigan elementlar o'tadi, qolganlari qolib ketadi.
- **Reduce (Jamlash):** Bu xuddi kassa apparatiga o'xshaydi. Hamma narxlarni qo'shib, oxirida bitta umumiy summani chiqaradi.

## 3. STRUKTURA

### A. map() – Yangi massiv yaratadi
\`\`\`javascript
const sonlar = [1, 2, 3];
const kvadratlar = sonlar.map(n => n * n); // [1, 4, 9]
\`\`\`

### B. filter() – Saralab oladi
\`\`\`javascript
const yoshlar = [15, 22, 18, 30];
const kattalar = yoshlar.filter(y => y >= 18); // [22, 18, 30]
\`\`\`

### C. reduce() – Bitta qiymatga aylantiradi
\`\`\`javascript
const narxlar = [100, 200, 300];
const jami = narxlar.reduce((sum, n) => sum + n, 0); // 600
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const ismlar = ["ali", "vali"];
const kattaIsmlar = ismlar.map(ism => ism.toUpperCase());
console.log(kattaIsmlar); // ["ALI", "VALI"]
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Returnni unutish:** Agar arrow funksiyada \`{ }\` ishlatilsa, \`return\` yozish shart!
2. **Asl massiv:** Bu metodlar asl massivni o'zgartirmaydi, doim yangi massiv qaytaradi.

## 6. SAVOLLAR (12 ta)
1. \`map()\` va \`forEach()\` farqi nima?
2. \`filter()\` shartga mos narsa topmasa nima qaytaradi?
3. \`reduce()\` dagi \`0\` (oxiridagi raqam) nima?
4. \`find()\` va \`filter()\` farqi nima?
5. \`some()\` metodi nima qaytaradi?
6. \`every()\` metodi nima qaytaradi?
7. \`map()\` asl massivni o'zgartiradimi?
8. Bir nechta metodni zanjir (chain) qilib ishlatsa bo'ladimi?
9. \`sort()\` metodi qanday ishlaydi?
10. Massiv ichidan bitta elementni qidirish uchun qaysi metod qulay?
11. \`reduce\` yordamida obyekt yasasa bo'ladimi?
12. Bo'sh massivda \`reduce\` ishlatilsa nima bo'ladi?`,
  exercises: [
    {
      id: 1,
      title: "Map mashqi",
      instruction: "Massivdagi har bir sonni 10 ga ko'paytiring.",
      startingCode: "const nums = [1, 2, 3];\nconst res = // Bu yerga yozing",
      hint: "nums.map(n => n * 10);",
      test: "if (res[0] === 10) return null; return 'Noto\\'g\\'ri';"
    }
  ]
};

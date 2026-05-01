export const higherOrderArrays = {
  id: "i6",
  title: "Massiv metodlari (Map, Filter, Reduce)",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, sizda 1000 ta mahsulot bor va har birining narxini 10% ga oshirishingiz kerak. \`for\` sikli bilan bu uzoq va zerikarli kod bo'ladi.

**Higher Order Array Methods** — bu massivlar bilan ishlashni 10 barobar osonlashtiradigan, kodni qisqa va tushunarli qiladigan "sehrli" asboblardir.

---

## 2. MAP — O'ZGARTIRISH (Tushuntir → Ko'rsat → Bajartir)
\`map()\` massivdagi har bir elementni birma-bir olib, uni o'zgartiradi va **yangi massiv** qaytaradi.

**Ko'rsat:**
\`\`\`javascript
const sonlar = [1, 2, 3];
const kvadratlar = sonlar.map(n => n * n);
console.log(kvadratlar); // [1, 4, 9]
\`\`\`

**Mashq:** \`ismlar\` massividagi har bir ismni bosh harfga o'tkazing (\`.toUpperCase()\`).

---

## 3. FILTER — SARALASH
\`filter()\` massivdan faqat sizga kerakli (shartga mos) elementlarni ajratib oladi va **yangi massiv** yaratadi.

**Ko'rsat:**
\`\`\`javascript
const yoshlar = [15, 22, 18, 30];
const kattalar = yoshlar.filter(y => y >= 18);
console.log(kattalar); // [22, 18, 30]
\`\`\`

**Mashq:** Massivdan faqat juft sonlarni ajratib oling.

---

## 4. REDUCE — JAMLASH (Bitta natija)
\`reduce()\` butun massivni bitta qiymatga (masalan, yig'indiga) aylantiradi.

**Ko'rsat:**
\`\`\`javascript
const narxlar = [100, 200, 300];
const jami = narxlar.reduce((sum, n) => sum + n, 0);
console.log(jami); // 600
\`\`\`

---

## 5. KO'P UCHRAYDIGAN XATOLAR ⚠️
1.  **Returnni unutish:** Agar \`{ }\` qavs ishlatilsa, \`return\` yozish shart!
    \`\`\`javascript
    const x = arr.map(n => { n * 2 }); // undefined! ❌
    const y = arr.map(n => { return n * 2 }); // ✅
    \`\`\`
2.  **Yangi massivni saqlamaslik:** Bu metodlar asl massivni o'zgartirmaydi, natijani yangi o'zgaruvchiga olish kerak.

---

## 6. BUZIB KO'RISH 🧐
**Nima bo'ladi agar bo'sh massivda \`reduce\` ishlatsak va boshlang'ich qiymat bermasak?**
\`\`\`javascript
[].reduce((a, b) => a + b); // ❌ Xato beradi!
\`\`\`
**Yechim:** Har doim oxirida \`0\` yoki \`[]\` kabi boshlang'ich qiymat bering.

---

## 7. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **map() va forEach() farqi nima? (Junior)**
   *Javob:* map() yangi massiv qaytaradi, forEach() esa hech narsa qaytarmaydi (faqat ish bajaradi).

2. **filter() metodi bo'sh massiv qaytarishi mumkinmi? (Junior)**
   *Javob:* Ha, agar hech bir element shartga mos kelmasa.

3. **reduce() dagi 'accumulator' nima? (Middle)**
   *Javob:* U har bir qadamdagi natijani o'zida yig'ib boruvchi "xotira".

4. **Massivdan obyekt yasash. (Middle - Amaliy)**
   *Vazifa:* \`reduce\` orqali massivni obyektga aylantiring.

5. **Chain (Zanjir) usuli. (Junior - Amaliy)**
   *Vazifa:* Avval \`filter\` qiling, keyin \`map\` qilib natijani oling.

6. **Find() va Filter() farqi? (Junior)**
   *Javob:* Find faqat birinchi topilgan elementni, filter esa barcha moslarini massiv qilib beradi.

7. **Some() va Every() nima? (Middle)**
   *Javob:* Some — kamida bittasi, Every — hammasi shartga mosligini tekshiradi (boolean).

8. **Massiv ichidagi massivlarni yoyish. (Middle - Amaliy)**
   *Vazifa:* \`flatMap\` yoki \`reduce\` bilan \`[[1,2], [3]]\` ni \`[1,2,3]\` qiling.

9. **Eng qimmat mahsulotni topish. (Middle - Amaliy)**
   *Vazifa:* Obyektlar massividan \`reduce\` orqali narxi eng balandini toping.

10. **Metodlar asl massivni o'zgartiradimi? (Junior)**
    *Javob:* Yo'q (immutability).

11. **Sort() metodi haqida. (Middle)**
    *Javob:* U asl massivni o'zgartiradi va default bo'yicha string sifatida saralaydi.

12. **Nollarni o'chirish. (Junior - Amaliy)**
    *Vazifa:* Massivdan barcha \`0\` va \`false\` qiymatlarni \`filter\` orqali olib tashlang.

---

## 8. CHALLENGE 🏆
Foydalanuvchilar massivi berilgan. Faqat 18 yoshdan kattalarning ismini oling va ularni bitta matnga birlashtiring (Masalan: "Ali, Vali").

---

## 9. XULOSA
Endi siz massivlarni professional darajada transformatsiya qilishni va saralashni bilasiz!
`,
  exercises: [
    {
      id: 1,
      title: "map() mashqi",
      instruction: "Berilgan 'prices' massividagi har bir narxni 1.2 barobarga oshiring va natijani consolega chiqaring.",
      startingCode: "const prices = [100, 200, 300];\n// Kodni shu yerga yozing\n",
      hint: "const newPrices = prices.map(p => p * 1.2);",
      test: "if (logs.includes('120') && logs.includes('360')) return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "filter() mashqi",
      instruction: "Massivdan faqat 10 dan katta sonlarni ajrating.",
      startingCode: "const numbers = [5, 12, 130, 8];\n// Bu yerga yozing\n",
      hint: "numbers.filter(n => n > 10)",
      test: "if (logs[0].includes('130')) return null; return 'Faqat 10 dan kattalar qolsin';"
    }
  ]
};

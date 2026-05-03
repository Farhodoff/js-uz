export const mathObject = {
  id: "math-object",
  title: "Math (Matematika) obyekti",
  theory: `## 1. KIRISH
O'yinlar yaratishda (tasodifiy dushmanlar paydo bo'lishi), narxlarni yaxlitlashda yoki murakkab hisob-kitoblarda bizga \`Math\` obyekti yordamga keladi.

JavaScriptda oddiy hisob-kitoblar (\`+\`, \`-\`) dan tashqari, murakkabroq matematik amallar uchun maxsus **Math** obyekti bor.

## 1. NEGA kerak?
Tasavvur qiling, sizga o'yinda dushman tasodifiy (random) joydan chiqishi kerak. Yoki mahsulot narxi 12.99 bo'lsa, uni 13 ga yaxlitlash kerak. Mana shunday amallar uchun \`Math\` obyekti tayyor asboblarni taqdim etadi.

## 2. SODDALIK (Analogiya)
\`Math\` — bu sizning **muhandislik kalkulyatoringiz**. Unda oddiy arifmetikadan tashqari, kvadrat ildiz, tasodifiy son chiqarish va yaxlitlash kabi tugmalar bor. Eng muhimi, uni sotib olish (yaratish) shart emas, u JSda doim bor!

## 3. STRUKTURA (Asosiy metodlar)

### A. Yaxlitlash (Rounding)
- **Math.round(4.5):** Eng yaqin butun songa (→ 5).
- **Math.floor(4.9):** Har doim pastga (yerga) qarab (→ 4).
- **Math.ceil(4.1):** Har doim tepaga (shiftga) qarab (→ 5).

### B. Tasodifiy sonlar (Random)
\`Math.random()\` — 0 va 1 oralig'ida tasodifiy son beradi. 1 dan 10 gacha son olish uchun:
\`\`\`javascript
let r = Math.floor(Math.random() * 10) + 1;
\`\`\`

### C. Max va Min
\`\`\`javascript
Math.max(1, 10, 5); // 10 (eng kattasi)
Math.min(1, 10, 5); // 1 (eng kichigi)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
console.log(Math.sqrt(16)); // 4 (kvadrat ildiz)
console.log(Math.pow(2, 3)); // 8 (2 ning 3-darajasi)
console.log(Math.abs(-5)); // 5 (modul - har doim musbat)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Math.random() diapazoni:** U hech qachon aniq 1 qaytarmaydi (faqat 0 dan 0.999... gacha).
2. **Katta harf:** \`math\` deb kichik harfda yozmang, doim **\`Math\`** (katta harf bilan) bo'lishi shart.

## 6. SAVOLLAR (12 ta)
1. \`Math\` obyekti nima vazifani bajaradi?
2. \`Math.floor()\` va \`Math.ceil()\` farqi nimada?
3. Eng yaqin songa yaxlitlash metodi qaysi?
4. \`Math.random()\` qanday son qaytaradi?
5. Tasodifiy sonni butun songa aylantirish uchun nima qilish kerak?
6. Bir nechta son ichidan eng kattasini qaysi metod topadi?
7. \`Math.sqrt(25)\` natijasi nima?
8. \`Math.abs(-10)\` natijasi nima?
9. Darajaga ko'tarish metodini ayting (\`pow\`).
10. \`Math.PI\` nima qaytaradi?
11. Nima uchun \`math.floor()\` deb yozish xato?
12. Kasr qismini shunchaki olib tashlaydigan metod qaysi (\`trunc\`)?`,
  exercises: [
    {
      id: 1,
      title: "Random mashqi",
      instruction: "1 dan 6 gacha tasodifiy butun son chiqaring (kubik tashlagandek).",
      startingCode: "// Bu yerga yozing\nlet dice = ",
      hint: "let dice = Math.floor(Math.random() * 6) + 1;",
      test: "if (dice >= 1 && dice <= 6) return null; return '1 va 6 oralig\\'ida bo\\'lishi kerak!';"
    }
  ]
};

export const mathObject = {
  id: "b16",
  title: "Math (Matematika) obyekti",
  theory: `## 1. KIRISH
O'yinlar yaratishda (tasodifiy dushmanlar paydo bo'lishi), narxlarni yaxlitlashda yoki murakkab hisob-kitoblarda bizga \`Math\` obyekti yordamga keladi.

## 2. TUSHUNCHA

### Sodda ta'rif
\`Math\` - bu JavaScriptning ichki obyekti bo'lib, u barcha matematik o'zgarmaslar (masalan, PI) va funksiyalarni o'z ichiga oladi. Uni \`new\` kalit so'zi bilan yaratish shart emas.

### Real hayot o'xshashlik
\`Math\` obyektini **muhandislik kalkulyatoriga** o'xshatish mumkin. Unda oddiy arifmetikadan tashqari murakkab amallar (kvadrat ildiz, sinus, yaxlitlash) tayyor holda turadi.

---

## 3. ASOSIY METODLAR

### Yaxlitlash (Rounding)
- \`Math.round(4.5)\`: Eng yaqin butun songa (→ 5).
- \`Math.floor(4.9)\`: Har doim **pastga** qarab (→ 4).
- \`Math.ceil(4.1)\`: Har doim **tepaga** qarab (→ 5).
- \`Math.trunc(4.9)\`: Kasr qismini shunchaki olib tashlaydi (→ 4).

### Boshqa muhimlar
- \`Math.random()\`: 0 va 1 oralig'ida tasodifiy son beradi.
- \`Math.max(1, 10, 5)\`: Eng katta sonni topadi (→ 10).
- \`Math.min(...)\`: Eng kichik sonni topadi.
- \`Math.pow(2, 3)\`: Darajaga ko'tarish (2 ning 3-darajasi = 8).
- \`Math.sqrt(16)\`: Kvadrat ildiz (→ 4).

---

## 4. KOD MISOLLARI

### Misol 1 — Tasodifiy son generatori
**Maqsad:** 1 dan 10 gacha tasodifiy butun son olish.
\`\`\`javascript
const randomNum = Math.floor(Math.random() * 10) + 1;
console.log(randomNum); 
\`\`\`

### Misol 2 — Narxni yaxlitlash
\`\`\`javascript
const narx = 12.99;
console.log("Xarid uchun:", Math.ceil(narx)); // → 13
\`\`\`

---

## 5. VIZUAL TUSHUNTIRISH
### Yaxlitlash farqlari
\`\`\`
  3.2   3.5   3.8
   │     │     │
   ▼     ▼     ▼
  [3]   [4]   [4]  <-- Math.round()
  [3]   [3]   [3]  <-- Math.floor()
  [4]   [4]   [4]  <-- Math.ceil()
\`\`\`

---

## 6. INTERVYU SAVOLLARI
1. **Math.floor() va Math.trunc() farqi?** - Musbat sonlarda bir xil, lekin manfiy sonlarda farq qiladi. \`floor(-4.1)\` pastga qarab -5 beradi, \`trunc(-4.1)\` esa shunchaki kasrni olib -4 beradi.
2. **0 va 100 oralig'ida random son qanday olinadi?** - \`Math.floor(Math.random() * 101)\`.

---

## 7. MINI LOYIHA: "Omadli Chipta"
**Vazifa:** 1000 dan 9999 gacha bo'lgan tasodifiy 4 xonali chipta raqamini chiqaring.

\`\`\`javascript
function generateTicket() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("Sizning chiptangiz:", generateTicket());
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Random butun son",
      instruction: "1 dan 6 gacha (kubik tashlash kabi) tasodifiy butun son chiqaring.",
      startingCode: "// Kodni shu yerga yozing\n",
      hint: "Math.floor(Math.random() * 6) + 1",
      test: "if (logs[0] >= 1 && logs[0] <= 6) return null; return '1 va 6 oralig\\'ida bo\\'lishi kerak';"
    }
  ]
};

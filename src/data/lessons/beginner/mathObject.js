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

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Math obyekti nima vazifani bajaradi?**
\`Math\` — bu JavaScript-dagi o'rnatilgan global obyekt bo'lib, matematik hisob-kitoblar, konstantalar va murakkab funksiyalar (yaxlitlash, tasodifiy sonlar, trigonometriya va h.k.) bilan ishlash uchun xizmat qiladi.


**2. Math.floor() va Math.ceil() farqi nimada?**
\`Math.floor()\` kasr sonni har doim pastga (kichik butun songa) yaxlitlaydi. \`Math.ceil()\` esa har doim tepaga (katta butun songa) yaxlitlaydi.


**3. Eng yaqin songa yaxlitlash metodi qaysi?**
\`Math.round()\` — kasr sonni eng yaqin butun songa yaxlitlaydi. Agar kasr qismi \`0.5\` va undan katta bo'lsa tepaga, bo'lmasa pastga yaxlitlanadi.


**4. Math.random() qanday son qaytaradi?**
\`Math.random()\` 0 (shu jumladan) va 1 (istisno) oralig'idagi tasodifiy kasr son qaytaradi.


**5. Tasodifiy sonni butun songa aylantirish uchun nima qilish kerak?**
\`Math.random()\` natijasini kerakli diapazon soniga ko'paytirib, keyin \`Math.floor()\` yoki \`Math.trunc()\` kabi yaxlitlash metodlaridan foydalanish kerak.


**6. Bir nechta son ichidan eng kattasini qaysi metod topadi?**
\`Math.max()\` metodi berilgan parametrlar orasidan eng katta qiymatga ega bo'lgan sonni topib beradi.


**7. Math.sqrt(25) natijasi nima?**
Natija \`5\` bo'ladi, chunki \`Math.sqrt()\` sonning kvadrat ildizini hisoblab beradi.


**8. Math.abs(-10) natijasi nima?**
Natija \`10\` bo'ladi. \`Math.abs()\` sonning mutloq qiymatini (modulini), ya'ni ishorasiz musbat ko'rinishini qaytaradi.


**9. Darajaga ko'tarish metodini ayting (pow).**
\`Math.pow(asos, daraja)\` metodi birinchi parametrni ikkinchi parametr darajasiga ko'taradi (masalan, \`Math.pow(2, 3)\` natijasi \`8\` ga teng).


**10. Math.PI nima qaytaradi?**
Matematikadagi PI (\`π\`) konstantasini — taxminan \`3.141592653589793\` qiymatini qaytaradi. Bu metod emas, oddiy xususiyat bo'lgani uchun qavssiz chaqiriladi.


**11. Nima uchun math.floor() deb yozish xato?**
Chunki JavaScript harflar farqiga boradi. Global obyekt nomi doimo bosh harf bilan **\`Math\`** deb yozilishi shart.


**12. Kasr qismini shunchaki olib tashlaydigan metod qaysi (trunc)?**
\`Math.trunc()\` — sonning kasr qismini shunchaki kesib olib tashlab, faqat butun qismini qaytaradigan metod hisoblanadi.
`,
  exercises: [
    {
      id: 1,
      title: "Random mashqi",
      instruction: "1 dan 6 gacha tasodifiy butun son chiqaring (kubik tashlagandek).",
      startingCode: "// Bu yerga yozing\nlet dice = ",
      hint: "let dice = Math.floor(Math.random() * 6) + 1;",
      test: "if (dice >= 1 && dice <= 6) return null; return '1 va 6 oralig\\'ida bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`Math.floor(4.9)` va `Math.ceil(4.1)` amallaridan qanday natijalar qaytadi?",
      options: [
        "`4` va `4`",
        "`5` va `5`",
        "`4` va `5` (chunki floor doim pastga (kichik butun songa), ceil esa har doim yuqoriga yaxlitlaydi)",
        "`5` va `4`"
      ],
      correctAnswer: 2,
      explanation: "`Math.floor()` kasr sonni o'zidan kichik yoki teng bo'lgan eng yaqin butun songa yaxlitlaydi. `Math.ceil()` (shift) esa o'zidan katta yoki teng eng yaqin butun songa yaxlitlaydi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri sonning kasr (nuqtadan keyingi) qismini shunchaki kesib tashlab, butun qismini qaytaradi?",
      options: [
        "`Math.trunc()`",
        "`Math.floor()`",
        "`Math.round()`",
        "`Math.cut()`"
      ],
      correctAnswer: 0,
      explanation: "`Math.trunc()` (truncate - kesish) metodi musbat va manfiy sonlarda shunchaki kasr qismini olib tashlab, butun sonni qaytaradi."
    },
    {
      id: 3,
      question: "JavaScript-da 1 dan 10 gacha bo'lgan (1 va 10 ham kiradigan) tasodifiy butun son yaratish uchun qaysi ifoda to'g'ri hisoblanadi?",
      options: [
        "`Math.random() * 10`",
        "`Math.floor(Math.random() * 10)`",
        "`Math.floor(Math.random() * 10) + 1` (chunki Math.random() * 10 0.00 dan 9.99 gacha qiymat beradi, floor unga 0..9 qiladi va +1 qo'shish 1..10 oraliqni beradi)",
        "`Math.ceil(Math.random() * 10) + 1`"
      ],
      correctAnswer: 2,
      explanation: "`Math.random()` 0 (shu jumladan) va 1 (istisno) oralig'idagi sonni beradi. Uni `10` ga ko'paytirib, `Math.floor()` bilan yaxlitlasak `0` dan `9` gacha son olamiz. Unga `1` qo'shish orqali 1 dan 10 gacha bo'lgan to'liq diapazonni hosil qilamiz."
    },
    {
      id: 4,
      question: "`Math.max(1, -5, 10, \"15\")` ifodasi bajarilganda qanday natija chiqadi va nima uchun?",
      options: [
        "`10` (chunki string turidagi \"15\" hisobga olinmaydi)",
        "`15` (chunki JS solishtirish jarayonida \"15\" stringini avtomatik ravishda 15 soniga aylantiradi (coercion) va u eng katta bo'ladi)",
        "`NaN` (chunki matn qatnashdi)",
        "`TypeError` xatosi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "`Math.max()` va `Math.min()` metodlari o'z argumentlarini taqqoslashdan oldin avtomatik ravishda songa o'zgartiradi (coercion). Shuning uchun `\"15\"` matni `15` soniga o'girilib, eng katta son sifatida qaytariladi."
    },
    {
      id: 5,
      question: "JavaScript-da `Math` obyekti bilan ishlashda qaysi xatoliklar ko'p uchraydi?",
      options: [
        "Uni `new Math()` deb yaratib ishlatish xatosi",
        "`Math` so'zini kichik harflar bilan `math.floor()` deb yozish (chunki Math global obyekti har doim bosh harfi katta bilan yozilishi shart)",
        "Math.PI ni funksiya kabi `Math.PI()` deb chaqirish",
        "Barcha ko'rsatilgan javoblar to'g'ri"
      ],
      correctAnswer: 3,
      explanation: "`Math` konstruktor funksiya emas, shuning uchun `new` kalit so'zi bilan obyekti yaratilmaydi. Shuningdek u JavaScript-ning statik obyektidir — nomi katta harf bilan boshlanadi va undagi o'zgarmas `PI` xususiyatini (`Math.PI`) chaqiriq qavslari `()` bilan chaqirib bo'lmaydi."
    }
  ]
};

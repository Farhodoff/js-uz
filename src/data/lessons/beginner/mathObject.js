export const mathObject = {
  id: "math-object",
  title: "Math (Matematika) obyekti",
  level: "Beginner",
  description: "JavaScriptda matematik doimiylar, yaxlitlash metodlari va tasodifiy sonlar bilan ishlash.",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizga o'yinda dushman tasodifiy (random) joydan chiqishi kerak. Yoki mahsulot narxi 12.99 bo'lsa, uni 13 ga yaxlitlash kerak. Mana shunday amallar uchun \`Math\` obyekti tayyor asboblarni taqdim etadi.

## 2. SODDALIK (Analogiya)
\`Math\` — bu sizning **muhandislik kalkulyatoringiz**. Unda oddiy arifmetikadan tashqari, kvadrat ildiz, tasodifiy son chiqarish va yaxlitlash kabi tugmalar bor. Eng muhimi, uni yaratish (yangi obyekt yasash) shart emas, u JSda har doim tayyor turadi!

## 3. STRUKTURA (Asosiy metodlar)

### A. Yaxlitlash (Rounding)
- **Math.round(x):** Eng yaqin butun songa yaxlitlaydi (masalan, 4.5 -> 5, 4.4 -> 4).
- **Math.floor(x):** Har doim pastga (yerga) qarab yaxlitlaydi (4.9 -> 4).
- **Math.ceil(x):** Har doim tepaga (shiftga) qarab yaxlitlaydi (4.1 -> 5).
- **Math.trunc(x):** Kasr qismini shunchaki kesib tashlaydi (4.9 -> 4).

### B. Tasodifiy sonlar (Random)
\`Math.random()\` — 0 (shu jumladan) va 1 (istisno) oralig'ida tasodifiy kasr son beradi.
1 dan 10 gacha butun son olish formulasi:
\`\`\`javascript
let randomNum = Math.floor(Math.random() * 10) + 1;
\`\`\`

### C. Max, Min va Abs
\`\`\`javascript
Math.max(1, 10, 5); // 10 (eng kattasi)
Math.min(1, 10, 5); // 1 (eng kichigi)
Math.abs(-5); // 5 (modul, har doim musbat)
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)
Boshqa foydali metodlar:
\`\`\`javascript
Math.sqrt(16); // 4 (kvadrat ildiz)
Math.pow(2, 3); // 8 (2 ning 3-darajasi)
Math.PI; // 3.141592653589793 (aylana radiusi bilan ishlash uchun)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **math deb kichik harfda yozish:** \`math.random()\` xato ❌. Doim bosh harf bilan **\`Math\`** yoziladi ✅.
2. **PI ni funksiya kabi chaqirish:** \`Math.PI()\` xato ❌. U metod emas, oddiy qiymat: \`Math.PI\` ✅.
3. **Math.random() diapazoni:** U hech qachon aniq 1.0 qiymatini qaytarmaydi. Uning eng katta qiymati taxminan 0.9999... ga teng.

## 6. SAVOLLAR VA JAVOBLAR
**1. Math obyekti nima vazifani bajaradi?**
Matematik hisob-kitoblar, konstantalar va murakkab funksiyalar (yaxlitlash, tasodifiy sonlar, trigonometriya) bilan ishlash uchun xizmat qiladi.

**2. Math.floor() va Math.ceil() farqi nimada?**
\`Math.floor()\` har doim pastga (kichik songa), \`Math.ceil()\` esa tepaga (katta songa) yaxlitlaydi.

**3. Eng yaqin songa yaxlitlash metodi qaysi?**
\`Math.round()\` — eng yaqin butun songa yaxlitlaydi.

**4. Math.random() qanday son qaytaradi?**
0 va 1 oralig'idagi tasodifiy kasr son qaytaradi.

**5. Tasodifiy butun son olish uchun nima qilish kerak?**
\`Math.random()\` natijasini kerakli diapazon soniga ko'paytirib, keyin \`Math.floor()\` yordamida yaxlitlash lozim.

**6. Bir nechta son ichidan eng kattasini qaysi metod topadi?**
\`Math.max()\` metodi berilgan parametrlar orasidan eng kattasini topib beradi.

**7. Math.sqrt(25) natijasi nima?**
Natija \`5\` bo'ladi, chunki u kvadrat ildizni hisoblaydi.

**8. Math.abs(-10) natijasi nima?**
Natija \`10\` bo'ladi. U sonning mutloq qiymatini (modulini) qaytaradi.

**9. Darajaga ko'tarish metodini ayting.**
\`Math.pow(asos, daraja)\` yoki yangi JS da \`asos ** daraja\` ishlatiladi.

**10. Math.PI nima qaytaradi?**
Matematikadagi PI (\`π\`) doimiysini (taxminan 3.14159) qaytaradi.

**11. Nima uchun new Math() deb yozish xato?**
Chunki \`Math\` konstruktor emas, u shunchaki statik global obyektdir.

**12. Kasr qismini shunchaki olib tashlaydigan metod qaysi?**
\`Math.trunc()\` metodi kasr qismni yaxlitlamasdan shunchaki kesib olib tashlaydi.
`,
  exercises: [
    {
      id: 1,
      title: "Random mashqi",
      instruction: "1 dan 6 gacha bo'lgan tasodifiy butun son hosil qiling va uni dice o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nlet dice = ",
      hint: "let dice = Math.floor(Math.random() * 6) + 1;",
      test: "if (dice >= 1 && dice <= 6 && Math.floor(dice) === dice) return null; return '1 va 6 oralig\\'idagi butun son bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Pastga yaxlitlash",
      instruction: "4.7 sonini pastga qarab yaxlitlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 4.7;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.floor(num);",
      test: "if (result === 4) return null; return 'Natija 4 bo\\'lishi kerak!';"
    },
    {
      id: 3,
      title: "Tepaga yaxlitlash",
      instruction: "4.1 sonini har doim yuqoriga yaxlitlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 4.1;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.ceil(num);",
      test: "if (result === 5) return null; return 'Natija 5 bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Kvadrat ildiz",
      instruction: "64 sonining kvadrat ildizini hisoblang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 64;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.sqrt(num);",
      test: "if (result === 8) return null; return 'Natija 8 bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Darajaga ko'tarish",
      instruction: "3 ning 4-darajasini Math.pow() yordamida hisoblang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.pow(3, 4);",
      test: "if (result === 81) return null; return 'Natija 81 bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Eng katta son",
      instruction: "12, 45, 78 va 34 sonlari ichidan eng kattasini aniqlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.max(12, 45, 78, 34);",
      test: "if (result === 78) return null; return 'Eng katta son 78 bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "Eng kichik son",
      instruction: "12, 45, 7 va 34 sonlari ichidan eng kichigini aniqlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.min(12, 45, 7, 34);",
      test: "if (result === 7) return null; return 'Eng kichik son 7 bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Absolyut qiymat",
      instruction: "-99 sonining modulini (absolyut qiymatini) toping va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = -99;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.abs(num);",
      test: "if (result === 99) return null; return 'Natija 99 bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Kasr qismini kesish",
      instruction: "Math.trunc() yordamida 15.99 sonining faqat butun qismini olib, result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 15.99;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.trunc(num);",
      test: "if (result === 15) return null; return 'Natija 15 bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Aylana yuzi",
      instruction: "Aylana radiusi r = 5. Math.PI va Math.pow() yordamida aylana yuzini (S = π * r²) hisoblang va uni area o'zgaruvchisiga saqlang.",
      startingCode: "let r = 5;\n// Bu yerga yozing\nlet area = ",
      hint: "let area = Math.PI * Math.pow(r, 2);",
      test: "if (area > 78.5 && area < 78.6) return null; return 'Aylana yuzi noto\\'g\\'ri hisoblandi!';"
    },
    {
      id: 11,
      title: "Yaqin songa yaxlitlash",
      instruction: "Math.round() yordamida 5.5 sonini eng yaqin butun songa yaxlitlang va result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 5.5;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.round(num);",
      test: "if (result === 6) return null; return 'Natija 6 bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Tasodifiy oraliq",
      instruction: "10 va 50 oralig'ida (10 va 50 ham kirishi mumkin) tasodifiy butun son hosil qilib, uni result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.floor(Math.random() * 41) + 10;",
      test: "if (result >= 10 && result <= 50 && Math.floor(result) === result) return null; return '10 va 50 oralig\\'idagi butun son bo\\'lishi kerak!';"
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
        "Balla ko'rsatilgan javoblar to'g'ri (ya'ni barcha aytilgan xatolar ko'p uchraydi)"
      ],
      correctAnswer: 3,
      explanation: "`Math` konstruktor funksiya emas, shuning uchun `new` kalit so'zi bilan obyekti yaratilmaydi. Shuningdek u JavaScript-ning statik obyektidir — nomi katta harf bilan boshlanadi va undagi o'zgarmas `PI` xususiyatini (`Math.PI`) chaqiriq qavslari `()` bilan chaqirib bo'lmaydi."
    },
    {
      id: 6,
      question: "`Math.sqrt(-9)` amali bajarilganda nima natija qaytadi?",
      options: [
        "`-3`",
        "`3`",
        "`NaN` (chunki manfiy sonlardan haqiqiy kvadrat ildiz olib bo'lmaydi)",
        "`Error` xatosi"
      ],
      correctAnswer: 2,
      explanation: "JavaScriptda manfiy sonning kvadrat ildizini topishga harakat qilinganda `NaN` (Not-a-Number) qaytadi."
    },
    {
      id: 7,
      question: "`Math.round(2.5)` va `Math.round(-2.5)` natijasi nima?",
      options: [
        "`3` va `-2`",
        "`3` va `-3`",
        "`2` va `-2`",
        "`2` va `-3`"
      ],
      correctAnswer: 0,
      explanation: "`Math.round()` metodi kasr qismi .5 bo'lgan musbat sonlarni kattaroq butun songa yaxlitlaydi (2.5 -> 3), lekin manfiy sonlarda u kattaroq qiymatga qarab boradi (-2.5 -> -2, chunki -2 soni -3 dan kattadir)."
    },
    {
      id: 8,
      question: "Quyidagilardan qaysi biri sonning modulini (mutloq qiymatini) topib beradi?",
      options: [
        "Math.mod()",
        "Math.abs()",
        "Math.absolute()",
        "Math.positive()"
      ],
      correctAnswer: 1,
      explanation: "`Math.abs()` (absolute) metodi sonning ishorasini olib tashlab, uning mutloq qiymatini qaytaradi."
    },
    {
      id: 9,
      question: "`Math.pow(2, 3)` amali nimaga teng?",
      options: [
        "6",
        "9",
        "8 (chunki 2 ning 3-darajasi 2 * 2 * 2 = 8)",
        "5"
      ],
      correctAnswer: 2,
      explanation: "Math.pow(x, y) metodi x ning y-darajasini hisoblab beradi. 2 ning uchinchi darajasi 8 bo'ladi."
    },
    {
      id: 10,
      question: "`Math.PI` qiymati qaysi ma'lumot turiga (type) kiradi?",
      options: [
        "string",
        "object",
        "number (chunki u o'zgarmas o'nlik kasr son qiymatidir)",
        "undefined"
      ],
      correctAnswer: 2,
      explanation: "`Math.PI` o'zgarmas son qiymatini ifodalaydi va uning turi `number` (son) hisoblanadi."
    },
    {
      id: 11,
      question: "Math.min() metodi hech qanday parametrsiz chaqirilsa nima qaytaradi?",
      options: [
        "0",
        "NaN",
        "Infinity (chunki solishtirish uchun boshlang'ich qiymat cheksiz katta qilib olinadi)",
        "-Infinity"
      ],
      correctAnswer: 2,
      explanation: "Qiziqarli tomoni shundaki, `Math.min()` argumentlarsiz chaqirilganda `Infinity` qaytadi, `Math.max()` esa `-Infinity` qaytaradi."
    },
    {
      id: 12,
      question: "`Math.floor(-3.1)` natijasi nima bo'ladi?",
      options: [
        "`-3`",
        "`-4` (chunki -4 soni -3.1 dan kichikdir va floor doim pastga yaxlitlaydi)",
        "`NaN`",
        "`-3.1`"
      ],
      correctAnswer: 1,
      explanation: "`Math.floor()` har doim pastga yaxlitlaydi. Manfiy sonlarda pastga yaxlitlash sonning modulini kattalashtiradi (chap tomonga yuriladi), shuning uchun -3.1 dan kichik eng yaqin butun son -4 hisoblanadi."
    }
  ]
};

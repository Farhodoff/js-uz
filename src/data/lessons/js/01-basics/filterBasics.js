export const filterBasics = {
  id: "filterBasics",
  title: "filter Metodi",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz qum va tosh aralashmasini elakdan o'tkazyapsiz. Elak faqat mayda qumlarni o'tkazadi (\`true\`), katta toshlarni esa to'xtatib qoladi (\`false\`). Natijada sizda faqat kerakli toza qumlar to'planadi.
JavaScript dagi \`filter()\` metodi ham xuddi shunday elak vazifasini bajaradi: u massivdagi har bir elementni tekshiruvdan o'tkazadi va faqat shartga mos kelganlarini ajratib oladi.

**filter() metodi** — massivning har bir elementini berilgan shart (callback funksiya) orqali tekshirib, faqat \`true\` qaytargan elementlardan iborat **yangi saralangan massiv** qaytaruvchi metoddir.

*Yangi terminlar:*
- **filter() metodi** — shartga mos elementlarni elakdan o'tkazib yangi massiv hosil qiluvchi buyruq.
- **Predikat (shartli tekshiruv)** — \`true\` yoki \`false\` qaytaruvchi callback funksiya.

---

## 2. Nega kerak?

Massivdan faqat ma'lum bir shartga to'g'ri keladigan elementlarni (masalan, narxi 50 dan arzon tovarlarni yoki 18 dan katta yoshdagilarni) ajratib olish uchun oldin bo'sh massiv ochib, sikl va \`if\` yozish kerak bo'lardi:

\`\`\`javascript
// Eski usul:
const scores = [45, 80, 92, 30];
const passing = [];

for (const s of scores) {
  if (s >= 60) {
    passing.push(s);
  }
}
\`\`\`

\`filter()\` metodi buni bitta qatorda, qisqa va qulay tarzda amalga oshirish imkonini beradi:

\`\`\`javascript
const passing = scores.filter((s) => s >= 60);
\`\`\`

Boshlang'ich massiv o'zgarmaydi, yangi massivda esa faqat kerakli ma'lumotlar saqlanadi.

---

## 3. Birinchi misol

Bu kod massivdan faqat 10 dan katta bo'lgan sonlarni ajratib oladi.

\`\`\`javascript
const numbers = [5, 12, 8, 20, 3];

const bigNumbers = numbers.filter((num) => {
  return num > 10; // faqat 10 dan kattalari o'tadi
});

console.log(bigNumbers); // [12, 20]
console.log(numbers); // [5, 12, 8, 20, 3] (asl massiv o'zgarmagan)
\`\`\`

\`\`\`text
// Natija:
[ 12, 20 ]
[ 5, 12, 8, 20, 3 ]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const numbers = [5, 12, 8, 20, 3];\` — 5 ta elementdan iborat massiv.
- \`const bigNumbers = numbers.filter(...);\` — \`filter\` metodi chaqirildi. U har bir sonni navbat bilan callback funksiyaga uzatadi.
- \`return num > 10;\` — **Eng muhim qoida:** callback funksiya doimo mantiqiy \`true\` yoki \`false\` qiymat qaytarishi shart! Agar shart \`true\` bo'lsa, o'sha element yangi massivga kiritiladi; agar \`false\` bo'lsa, tashlab ketiladi.
- 5 > 10 (\`false\`), 12 > 10 (\`true\`), 8 > 10 (\`false\`), 20 > 10 (\`true\`), 3 > 10 (\`false\`). Shu sababli yangi massivda faqat \`[12, 20]\` qoladi.
- Asl \`numbers\` massivi butun holda saqlanadi.

---

## 5. Qadamma-qadam (trace)

Elakdan o'tkazish jarayoni:

| Qadam | Element (\`num\`) | Shart (\`num > 10\`) | Natija | Yangi massivga tushadimi? |
|---|---|---|---|---|
| 1 | 5 | 5 > 10 | false | Yo'q |
| 2 | 12 | 12 > 10 | true | **Ha (12)** |
| 3 | 8 | 8 > 10 | false | Yo'q |
| 4 | 20 | 20 > 10 | true | **Ha (20)** |
| 5 | 3 | 3 > 10 | false | Yo'q |
| Natija | [5, 12, 8, 20, 3] | — | — | **[12, 20]** |

---

## 6. Yana bitta misol

1-misoldan farqi: Matnlarni harflar soni (uzunligi) bo'yicha saralash.

\`\`\`javascript
const fruits = ["Olma", "Nok", "Gilos", "Behi"];

const longNames = fruits.filter((fruit) => {
  return fruit.length > 4; // faqat 4 tadan ko'p harfli mevalar
});

console.log(longNames);
\`\`\`

\`\`\`text
// Natija:
[ 'Gilos' ]
\`\`\`

Tahlil:
- "Olma" (4 ta harf), "Nok" (3 ta harf), "Behi" (4 ta harf) so'zlari 4 dan katta emas (\`false\`).
- Faqat "Gilos" (5 ta harf) shartdan muvaffaqiyatli o'tadi (\`true\`) va yangi massivga tushadi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: filter ni map bilan adashtirib, qiymatni o'zgartirishga urinish

\`\`\`javascript
const nums = [1, 2, 3];

const result = nums.filter((n) => {
  return n * 2; // XATO: bu shart emas, arifmetik amal!
});

console.log(result); // [1, 2, 3] (2 ga ko'paymadi!)
\`\`\`

**Nima bo'ladi:** \`n * 2\` son bo'lib, noldan farqli har qanday son \`true\` deb qabul qilinadi. Natijada barcha elementlar o'zgarmasdan o'tib ketadi. Elementni o'zgartirish uchun \`map\`, saralash uchun \`filter\` ishlatiladi.
**To'g'ri varianti:** Callback ichida faqat taqqoslash shartini yozing: \`return n > 1;\`.

### 2-xato: Hech qanday element shartga to'g'ri kelmaganda nima bo'lishini bilmaslik

\`\`\`javascript
const list = [1, 2, 3];
const big = list.filter((n) => n > 100);

console.log(big); // [] (bo'sh massiv)
\`\`\`

**Nima bo'ladi:** Agar barcha elementlar uchun shart \`false\` bo'lsa, \`filter\` xato bermaydi, balki shunchaki bo'sh massiv \`[]\` qaytaradi.
**To'g'ri varianti:** Bo'sh massiv qaytishini tabiiy holat sifatida tekshirish (\`big.length === 0\`).

### 3-xato: Callback ichida return yozishni unutish

\`\`\`javascript
const items = [10, 20];

const res = items.filter((n) => {
  n > 15; // XATO: return unutilgan!
});

console.log(res); // [] (bo'sh massiv)
\`\`\`

**Nima bo'ladi:** \`return\` bo'lmagani sababli funksiya \`undefined\` (\`false\`) qaytaradi va barcha elementlar elakda qolib ketadi.
**To'g'ri varianti:** Har doim \`return n > 15;\` deb yozing.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`ages = [12, 18, 25, 15, 30]\` massivi berilgan. \`filter\` yordamida faqat 18 va undan katta yoshdagilarni (\`age >= 18\`) ajratib, \`adults\` massiviga saqlang va uni konsolga chiqaring (\`[18, 25, 30]\`).

### 2-mashq (o'rtacha)
\`numbers = [1, 2, 3, 4, 5, 6]\` massividan \`filter\` orqali faqat juft sonlarni (\`n % 2 === 0\`) ajratib oluvchi \`evens\` massivini hosil qiling va konsolga chiqaring (\`[2, 4, 6]\`).

### 3-mashq (chegara holat)
\`words = ["JS", "HTML", "CSS"]\` massivi berilgan. Hech qaysi so'z shartga mos kelmaydigan holatni tekshiring: uzunligi 10 dan katta bo'lgan so'zlarni filtrlang (\`word.length > 10\`). Natijada bo'sh massiv \`[]\` chiqishini konsolga chiqaring.

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const ages = [12, 18, 25, 15, 30];

const adults = ages.filter((age) => {
  return age >= 18;
});

console.log(adults); // [ 18, 25, 30 ]
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter((n) => {
  return n % 2 === 0;
});

console.log(evens); // [ 2, 4, 6 ]
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const words = ["JS", "HTML", "CSS"];

const longWords = words.filter((word) => {
  return word.length > 10;
});

console.log(longWords); // []
\`\`\`

---

## 9. Xulosa

1. \`filter()\` massiv elementlarini shart orqali saralab, shartga mos kelgan elementlardan yangi massiv tuzadi.
2. Callback funksiya har bir element uchun mantiqiy \`true\` yoki \`false\` qiymat qaytarishi lozim.
3. \`filter()\` boshlang'ich massivni o'zgartirmaydi; hech bir element shartga to'g'ri kelmasa, bo'sh massiv \`[]\` qaytaradi.

Keyingi darsda: Massivdagi barcha elementlarni bitta yakuniy qiymatga yig'ish — reduce metodi bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "18 va undan katta yoshdagilarni filtrlash",
      instruction: "`ages = [12, 18, 25, 15, 30]` massividan `filter` yordamida faqat `age >= 18` bo'lgan yoshlarni ajratib, `adults` nomli yangi massivga saqlang va uni konsolga chiqaring.",
      startingCode: "const ages = [12, 18, 25, 15, 30];\n// filter orqali 18 va undan kattalarni ajrating va chiqaring\n",
      hint: "const adults = ages.filter(age => age >= 18);\nconsole.log(adults);",
      test: "if (!code.includes('filter')) return 'filter metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('18') && m.includes('25') && m.includes('30') && !m.includes('12'))) return null;\nreturn '[18, 25, 30] konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Juft sonlarni filtrlash",
      instruction: "`numbers = [1, 2, 3, 4, 5, 6]` massividan faqat juft sonlarni (`n % 2 === 0`) `filter` yordamida ajratib, `evens` massivini konsolga chiqaring.",
      startingCode: "const numbers = [1, 2, 3, 4, 5, 6];\n// filter yordamida juft sonlarni ajratib chiqaring\n",
      hint: "const evens = numbers.filter(n => n % 2 === 0);\nconsole.log(evens);",
      test: "if (!code.includes('filter')) return 'filter metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('2') && m.includes('4') && m.includes('6') && !m.includes('1'))) return null;\nreturn 'Juft sonlar [2, 4, 6] konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Hech bir element mos kelmagan holat",
      instruction: "`words = [\"JS\", \"HTML\", \"CSS\"]` massividan `word.length > 10` sharti orqali so'zlarni filtrlang va natijadagi bo'sh massivni konsolga chiqaring.",
      startingCode: "const words = [\"JS\", \"HTML\", \"CSS\"];\n// filter orqali uzunligi 10 dan katta so'zlarni filtrlang va chiqaring\n",
      hint: "const longWords = words.filter(w => w.length > 10);\nconsole.log(longWords);",
      test: "if (!code.includes('filter')) return 'filter metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('[]'))) return null;\nreturn 'Bo\\'sh massiv [] konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "filter() metodining callback funksiyasi qanday turdagi qiymat qaytarishi kerak?",
      options: [
        "Boolean (true yoki false)",
        "Son (raqam)",
        "Matn (string)",
        "Massiv"
      ],
      correctAnswer: 0,
      explanation: "filter() callback funksiyasi har bir element uchun faqat true (element o'tadi) yoki false (element tashlanadi) qiymat qaytarishi kerak."
    },
    {
      id: 2,
      question: "Agar massivdagi birorta ham element shartga mos kelmasa, filter() nima qaytaradi?",
      options: [
        "Bo'sh massiv: []",
        "null",
        "undefined",
        "Error xatolik beradi"
      ],
      correctAnswer: 0,
      explanation: "Shartga mos element topilmasa, filter hech qanday xato bermasdan bo'sh massiv [] qaytaradi."
    },
    {
      id: 3,
      question: "filter() metodi va map() metodining asosiy farqi nimada?",
      options: [
        "map har bir elementni o'zgartiradi, filter esa elementlarni shart bo'yicha elakdan o'tkazadi",
        "filter faqat sonlar bilan ishlaydi",
        "map asl massivni o'chirib yuboradi",
        "Ular mutlaqo bir xil ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "map har bir elementni o'zgartirib yangi massiv tuzadi, filter esa shartga to'g'ri kelgan elementlarni tanlab oladi."
    }
  ]
};

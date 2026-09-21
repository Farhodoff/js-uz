export const constLesson = {
  id: "constLesson",
  title: "const: O'zgarmas Qiymatlar",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda shaffof, lekin mahkam muhrlangan quti bor:
- Siz qutiga biror narsa solasiz va qopqog'ini muhrlaysiz.
- Uning ichidagi narsani hamma ko'rishi va ishlatishi mumkin, lekin uni ochib, ichidagi narsani boshqasiga almashtirib bo'lmaydi.

\`const\` (constant — o'zgarmas) — qiymati dastur davomida hech qachon o'zgarmaydigan maxsus o'zgaruvchi yaratish kalit so'zidir.

### \`let\` bilan farqi:
- \`let\` — ochiladigan quti (ichidagi qiymatni keyin o'zgartirish mumkin).
- \`const\` — muhrlangan quti (ichidagi qiymatni keyin umuman o'zgartirib bo'lmaydi).

---

## 2. Nega kerak?

Dasturlarda ba'zi ma'lumotlar hech qachon o'zgarmasligi kerak (masalan, haftadagi kunlar soni, tug'ilgan yil yoki matematik qoidalar).

Agar \`let\` ishlatsak, adashib ularni o'zgartirib yuborishimiz mumkin. \`const\` ishlatilsa, JavaScript qiymatni qulflaydi va uni tasodifiy xatolardan himoya qiladi.

---

## 3. Birinchi misol

Bu kod \`birthYear\` nomli o'zgarmas yaratadi va uni konsolga chiqaradi.

\`\`\`javascript
const birthYear = 2005; // birthYear nomli muhrlangan quti yaratish
console.log(birthYear); // Qiymatni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: 2005
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const\` — o'zgarmas (constant) yaratish buyrug'i.
- \`birthYear\` — o'zgarmasning nomi (ingliz tilida).
- \`=\` — tayinlash belgisi (qiymat solish).
- \`2005\` — saqlanadigan qiymat (son).
- \`;\` — qator tugaganini bildiruvchi belgi.
- \`console.log(birthYear);\` — \`birthYear\` qiymatini ekranga chiqarish.

---

## 5. Yana bitta misol

Bu kod \`country\` nomli o'zgarmas matn yaratadi va uni konsolga chiqaradi.

\`\`\`javascript
const country = "O'zbekiston"; // O'zgarmas matn yaratish
console.log(country); // Ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: O'zbekiston
\`\`\`

---

## 6. Ko'p uchraydigan xatolar

### 1. const qiymatini o'zgartirishga urinish
❌ Xato kod:
\`\`\`javascript
const birthYear = 2005;
birthYear = 2006;
\`\`\`
Nima bo'ladi: \`TypeError: Assignment to constant variable.\` xatoligi yuz beradi. \`const\` bilan yaratilgan qutiga qayta qiymat berish taqiqlanadi.
✅ To'g'ri variant (agar qiymat o'zgarishi kerak bo'lsa, \`let\` ishlatiladi):
\`\`\`javascript
let birthYear = 2005;
birthYear = 2006;
\`\`\`

### 2. const ni qiymatsiz (bo'sh) e'lon qilish
❌ Xato kod:
\`\`\`javascript
const city;
city = "Toshkent";
\`\`\`
Nima bo'ladi: \`SyntaxError: Missing initializer in const declaration\` xatoligi yuz beradi. \`const\` yaratilgan paytning o'zidayoq unga qiymat berilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
const city = "Toshkent";
\`\`\`

### 3. const ni qayta e'lon qilish
❌ Xato kod:
\`\`\`javascript
const count = 10;
const count = 20;
\`\`\`
Nima bo'ladi: \`SyntaxError: Identifier 'count' has already been declared\` xatoligi beradi.
✅ To'g'ri variant:
\`\`\`javascript
const count = 10;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`daysInWeek\` nomli \`const\` yarating, unga \`7\` qiymatini bering va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`planet\` nomli \`const\` yarating, unga \`"Yer"\` matnini bering va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`TypeError\` xatosini tuzating (qiymat keyin o'zgarishi kerak):
\`\`\`javascript
const score = 50;
score = 100;
console.log(score);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
const daysInWeek = 7;
console.log(daysInWeek);
\`\`\`
2.
\`\`\`javascript
const planet = "Yer";
console.log(planet);
\`\`\`
3.
\`\`\`javascript
let score = 50; // const o'rniga let ishlatiladi
score = 100;
console.log(score);
\`\`\`

---

## 8. Xulosa

1. \`const\` — qiymati dastur davomida o'zgarmaydigan o'zgarmaslar yaratish uchun ishlatiladi.
2. \`const\` ga qayta qiymat berilsa, \`TypeError: Assignment to constant variable.\` xatosi yuz beradi.
3. Agar qiymat keyin o'zgarishi kerak bo'lsa \`let\`, hech qachon o'zgarmasligi kerak bo'lsa \`const\` ishlatiladi.

Keyingi darsda: JavaScript'da asosiy ma'lumot turlari (string va number) bilan batafsil tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Sonli const yaratish",
      instruction: "`daysInWeek` nomli `const` yarating, unga `7` qiymatini bering va `console.log(daysInWeek);` orqali chiqaring.",
      startingCode: "// daysInWeek nomli const yarating va chiqaring\n",
      hint: "const daysInWeek = 7;\nconsole.log(daysInWeek);",
      test: "if (!code.includes('const')) return 'const kalit so\\'zi ishlatilmadi';\nif (!code.includes('daysInWeek')) return 'daysInWeek nomli o\\'zgarmas topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('7'))) return null;\nreturn '7 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Matnli const yaratish",
      instruction: "`planet` nomli `const` yarating, unga `\"Yer\"` matnini bering va konsolga chiqaring.",
      startingCode: "// planet nomli const yarating va chiqaring\n",
      hint: "const planet = \"Yer\";\nconsole.log(planet);",
      test: "if (!code.includes('const')) return 'const kalit so\\'zi ishlatilmadi';\nif (!code.includes('planet')) return 'planet nomli o\\'zgarmas topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Yer'))) return null;\nreturn '\"Yer\" matni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "TypeError xatosini tuzatish",
      instruction: "`const score = 50;` kodida `score` keyinroq `100` ga o'zgarishi kerak. `TypeError` bermasligi uchun uni to'g'ri kalit so'z bilan e'lon qiling.",
      startingCode: "const score = 50;\nscore = 100;\nconsole.log(score);\n",
      hint: "let score = 50;\nscore = 100;\nconsole.log(score);",
      test: "if (code.includes('const score')) return 'Qiymati o\\'zgaradigan o\\'zgaruvchiga const emas, let ishlatiladi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('100'))) return null;\nreturn '100 soni konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`const` ning `let` dan asosiy farqi nimada?",
      options: [
        "const faqat matn saqlaydi, let faqat son",
        "const bilan yaratilgan qiymatni keyinchalik o'zgartirib bo'lmaydi",
        "const konsolga chop etilmaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "const (constant) — muhrlangan quti. Uning qiymatini dastur davomida keyin o'zgartirib bo'lmaydi."
    },
    {
      id: 2,
      question: "Quyidagi kod bajarilsa nima sodir bo'ladi?\n```javascript\nconst pi = 3.14;\npi = 3.15;\nconsole.log(pi);\n```",
      options: [
        "Ekranga 3.15 chiqadi",
        "Ekranga 3.14 chiqadi",
        "TypeError xatoligi yuz beradi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 2,
      explanation: "const o'zgaruvchisining qiymatini o'zgartirishga urinish TypeError: Assignment to constant variable xatosiga olib keladi."
    },
    {
      id: 3,
      question: "Nima uchun `const year;` deb yozish xato hisoblanadi?",
      options: [
        "year so'zi taqiqlangan",
        "const e'lon qilinayotganda darhol unga qiymat berilishi shart",
        "Nuqta-vergul xato qo'yilgan",
        "Faqat katta harflar bilan yozilishi kerak"
      ],
      correctAnswer: 1,
      explanation: "const muhrlangan quti bo'lgani uchun uni bo'sh qoldirib bo'lmaydi, yaratish vaqtida darhol qiymat berish shart (Missing initializer in const declaration)."
    }
  ]
};

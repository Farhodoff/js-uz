export const variables = {
  id: "variables",
  title: "O'zgaruvchi nima (let)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda ustiga yorliq yopishtirilgan bo'sh quti bor:
- Siz qutiga nom berasiz (masalan, \`age\` deb yozasiz).
- Quti ichiga biror narsa solib qo'yasiz (masalan, \`25\` sonini).
- Keyinchalik qutidagi nomni aytib, uning ichidagi narsani olasiz.

O'zgaruvchi (variable) — kompyuter xotirasida ma'lumot saqlash uchun nomlangan maxsus "quti"dir.

JavaScript'da yangi quti yaratish uchun \`let\` kalit so'zidan (keyword) foydalanamiz.

---

## 2. Nega kerak?

Agar o'zgaruvchi bo'lmasa, ma'lumotlarni kompyuter xotirasida eslab qololmaymiz. Har safar bir xil son yoki matnni qaytadan yozishga to'g'ri kelardi.

O'zgaruvchi yaratib, unga bir marta qiymat solib qo'yamiz va dasturning istalgan joyida uning nomini chaqirib ishlatamiz.

---

## 3. Birinchi misol

Bu kod \`age\` nomli o'zgaruvchi yaratadi va uning ichidagi sonni konsolga chiqaradi.

\`\`\`javascript
let age = 25; // age nomli qutiga 25 sonini solish
console.log(age); // Qutidagi qiymatni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: 25
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let\` — yangi o'zgaruvchi (quti) yaratish buyrug'i.
- \`age\` — o'zgaruvchining nomi (yorliq). Qoida bo'yicha nomlar ingliz tilida yoziladi.
- \`=\` — tayinlash (o'zlashtirish) belgisi. O'ng tomondagi qiymatni chap tomondagi qutiga soladi.
- \`25\` — quti ichiga solingan qiymat (son).
- \`;\` — qator tugaganini bildiruvchi belgi (nuqta-vergul).
- \`console.log(age);\` — \`age\` qutisi ichidagi qiymatni konsolga chiqarish. O'zgaruvchi nomi qo'shtirnoqsiz yoziladi.

---

## 5. Yana bitta misol

Bu kod o'zgaruvchiga matn soladi va uni konsolga chiqaradi.

\`\`\`javascript
let name = "Ali"; // name nomli qutiga matn solish
console.log(name); // Qutidagi matnni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: Ali
\`\`\`

Matnli qiymatlar har doim qo'shtirnoq ichida solinadi.

---

## 6. Ko'p uchraydigan xatolar

### 1. O'zgaruvchi nomini qo'shtirnoqqa olish
❌ Xato kod:
\`\`\`javascript
let score = 100;
console.log("score");
\`\`\`
Nima bo'ladi: Ekranga \`100\` emas, \`"score"\` so'zining o'zi chiqadi. Qo'shtirnoq ichidagi narsa o'zgaruvchi emas, oddiy matn deb qabul qilinadi.
✅ To'g'ri variant:
\`\`\`javascript
let score = 100;
console.log(score);
\`\`\`

### 2. Yaratilmagan o'zgaruvchini ishlatish
❌ Xato kod:
\`\`\`javascript
console.log(price);
\`\`\`
Nima bo'ladi: \`ReferenceError: price is not defined\` xatoligi yuz beradi. Kompyuterda hali \`price\` nomli quti yo'q. Uni avval \`let\` bilan yaratish shart.
✅ To'g'ri variant:
\`\`\`javascript
let price = 50;
console.log(price);
\`\`\`

### 3. O'zgaruvchi nomini raqam bilan boshlash
❌ Xato kod:
\`\`\`javascript
let 1score = 100;
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid or unexpected token\` xatoligi beradi. O'zgaruvchi nomi raqam bilan boshlanishi taqiqlanadi.
✅ To'g'ri variant:
\`\`\`javascript
let score1 = 100;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`score\` nomli o'zgaruvchi yarating, unga \`50\` sonini soling va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`city\` nomli o'zgaruvchi yarating, unga \`"Toshkent"\` matnini soling va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi xatoni tuzating (ekranga \`42\` soni chiqishi kerak):
\`\`\`javascript
let count = 42;
console.log("count");
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let score = 50;
console.log(score);
\`\`\`
2.
\`\`\`javascript
let city = "Toshkent";
console.log(city);
\`\`\`
3.
\`\`\`javascript
let count = 42;
console.log(count);
\`\`\`

---

## 8. Xulosa

1. O'zgaruvchi — ma'lumotni xotirada saqlash uchun nomlangan "quti".
2. \`let\` kalit so'zi yangi o'zgaruvchi yaratadi, \`=\` belgisi esa unga qiymat soladi.
3. O'zgaruvchi ichidagi qiymatni konsolga chiqarishda uning nomi qo'shtirnoqsiz yoziladi: \`console.log(age);\`.

Keyingi darsda: O'zgaruvchidagi qiymatni yangilash (qayta qiymat berish) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Sonli o'zgaruvchi yaratish",
      instruction: "`score` nomli o'zgaruvchi yarating (`let` bilan), unga `50` qiymatini bering va `console.log(score);` orqali chiqaring.",
      startingCode: "// score o'zgaruvchisini yarating va chiqaring\n",
      hint: "let score = 50;\nconsole.log(score);",
      test: "if (!code.includes('let')) return 'let kalit so\\'zi ishlatilmadi';\nif (!code.includes('score')) return 'score nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('50'))) return null;\nreturn '50 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Matnli o'zgaruvchi yaratish",
      instruction: "`city` nomli o'zgaruvchi yarating (`let` bilan), unga `\"Toshkent\"` matnini soling va konsolga chiqaring.",
      startingCode: "// city o'zgaruvchisini yarating va chiqaring\n",
      hint: "let city = \"Toshkent\";\nconsole.log(city);",
      test: "if (!code.includes('let')) return 'let kalit so\\'zi ishlatilmadi';\nif (!code.includes('city')) return 'city nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Toshkent'))) return null;\nreturn '\"Toshkent\" matni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Qo'shtirnoq xatosini to'g'rilash",
      instruction: "`console.log(\"count\");` qatoridagi qo'shtirnoqni olib tashlang, toki o'zgaruvchi nomi emas, uning ichidagi `42` qiymati chiqsin.",
      startingCode: "let count = 42;\nconsole.log(\"count\");\n",
      hint: "let count = 42;\nconsole.log(count);",
      test: "if (code.includes('\"count\"') || code.includes(\"'count'\")) return 'count so\\'zidan qo\\'shtirnoqni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('42'))) return null;\nreturn '42 soni konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "O'zgaruvchi (variable) nima?",
      options: [
        "Kompyuterni o'chiradigan tugma",
        "Ma'lumotni xotirada saqlash uchun nomlangan maxsus quti",
        "Faqat matn yozish uchun shrift",
        "Internet tezligini o'lchovchi vosita"
      ],
      correctAnswer: 1,
      explanation: "O'zgaruvchi — kompyuter xotirasidagi nomlangan joy (quti) bo'lib, o'z ichida ma'lumot saqlaydi."
    },
    {
      id: 2,
      question: "JavaScript'da yangi o'zgaruvchi yaratish uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "make",
        "let",
        "create",
        "box"
      ],
      correctAnswer: 1,
      explanation: "Yangi o'zgaruvchi e'lon qilish uchun let kalit so'zidan foydalaniladi: let age = 25;"
    },
    {
      id: 3,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nlet score = 100;\nconsole.log(\"score\");\n```",
      options: [
        "100",
        "score",
        "Xatolik beradi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq ichiga yozilgan \"score\" oddiy matn deb qabul qilinadi. O'zgaruvchi ichidagi 100 chiqishi uchun console.log(score) deb qo'shtirnoqsiz yozish kerak."
    }
  ]
};

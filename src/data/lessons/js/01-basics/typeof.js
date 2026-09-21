export const typeofLesson = {
  id: "typeofLesson",
  title: "typeof: Qiymat Turini Aniqlash",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz supermarket kassasidasiz. Kassir mahsulotga skanerni to'g'irlaydi va ekran mahsulotning turini aytadi: "ichimlik", "meva" yoki "non". 
Qutining tashqi ko'rinishidan nima ekanini bilolmasangiz ham, skaner uning ichida nima borligini aniq ko'rsatib beradi.

JavaScript'da \`typeof\` — o'zgaruvchi yoki qiymatning qaysi ma'lumot turiga tegishli ekanligini aniqlab beruvchi maxsus operatordir.

---

## 2. Nega kerak?

Dasturlashda ba'zan o'zgaruvchida qanday turdagi ma'lumot turganini aniqlash zarur bo'ladi:
- Masalan, \`"100"\` (matn) bilan \`100\` (son) ko'rinishidan bir xil raqamga o'xshaydi, lekin dastur uchun ular mutlaqo boshqa-boshqa narsalardir.
- Agar biz matn ustida matematik amallar bajarmoqchi bo'lsak, xatolik yuz berishi mumkin.

\`typeof\` o'zgaruvchining turini aniq ko'rsatib, bizni bunday chalkashliklardan qutqaradi.

---

## 3. Birinchi misol

Bu kod sonli o'zgaruvchining turini aniqlaydi va konsolga chiqaradi.

\`\`\`javascript
let age = 25; // Sonli o'zgaruvchi
console.log(typeof age); // Turini konsolga chiqarish
\`\`\`

\`\`\`text
// Natija: number
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let age = 25;\` — \`age\` nomli o'zgaruvchiga \`25\` soni yuklandi.
- \`typeof age\` — \`typeof\` operatori \`age\` o'zgaruvchisining ichidagi qiymatni tekshiradi va uning turi son (\`"number"\`) ekanligini qaytaradi.
- \`console.log(typeof age);\` — topilgan tur nomi (\`number\`) konsolga chiqadi.
- Eslatma: \`typeof\` natijasi har doim kichik harflar bilan yozilgan matn (string) bo'ladi.

---

## 5. Yana bitta misol

Bu kod matnli o'zgaruvchining turini aniqlaydi va konsolga chiqaradi.

\`\`\`javascript
let userName = "Ali"; // Matnli o'zgaruvchi
console.log(typeof userName); // Turini konsolga chiqarish
\`\`\`

\`\`\`text
// Natija: string
\`\`\`

Qator-baqator tahlil:
- \`let userName = "Ali";\` — \`userName\` nomli o'zgaruvchiga \`"Ali"\` matni yuklandi.
- \`console.log(typeof userName);\` — \`typeof\` matnli qiymatni tekshirib, konsolga \`string\` deb chiqaradi.

Biz o'rgangan turlarning \`typeof\` natijalari:
- \`typeof 42\` → \`"number"\`
- \`typeof "Salom"\` → \`"string"\`
- \`typeof true\` → \`"boolean"\`
- \`typeof undefined\` → \`"undefined"\`

---

## 6. Ko'p uchraydigan xatolar

### 1. typeof ni katta harflar bilan yozish
❌ Xato kod:
\`\`\`javascript
let score = 50;
console.log(typeOf(score));
\`\`\`
Nima bo'ladi: \`ReferenceError: typeOf is not defined\` xatoligi yuz beradi. JavaScript harflar registriga sezgir, shuning uchun faqat kichik harflarda \`typeof\` deb yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let score = 50;
console.log(typeof score);
\`\`\`

### 2. typeof ni qo'shtirnoq ichiga olib yozish
❌ Xato kod:
\`\`\`javascript
let score = 50;
console.log("typeof score");
\`\`\`
Nima bo'ladi: Konsolga tur nomi emas, balki shunchaki \`typeof score\` degan oddiy matn chiqadi. \`typeof\` operator bo'lgani uchun qo'shtirnoqsiz yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
console.log(typeof score);
\`\`\`

### 3. Qo'shtirnoqdagi sonni number deb o'ylash
❌ Xato tushuncha:
\`\`\`javascript
let zipCode = "100000";
console.log(typeof zipCode); // "string" chiqadi, "number" emas!
\`\`\`
Nima bo'ladi: Qo'shtirnoqqa olingan har qanday qiymat (ichida qanday raqamlar bo'lishidan qat'i nazar) har doim \`string\` hisoblanadi.
✅ To'g'ri tushuncha:
\`\`\`javascript
let zipCode = 100000;
console.log(typeof zipCode); // "number"
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`price\` nomli o'zgaruvchi yarating (\`let price = 99;\`) va uning turini \`typeof\` yordamida konsolga chiqaring.

### 2-mashq (O'rtacha)
\`isStudent\` nomli o'zgaruvchi yarating (\`let isStudent = true;\`) va uning turini \`typeof\` yordamida konsolga chiqaring.

### 3-mashq (Chegara holat)
\`pin\` nomli o'zgaruvchiga matn ko'rinishidagi son bering (\`let pin = "1234";\`). Uning turini \`typeof\` bilan konsolga chiqaring va natija \`string\` ekanligini ko'ring.

### Javoblar:
1.
\`\`\`javascript
let price = 99;
console.log(typeof price);
\`\`\`
2.
\`\`\`javascript
let isStudent = true;
console.log(typeof isStudent);
\`\`\`
3.
\`\`\`javascript
let pin = "1234";
console.log(typeof pin);
\`\`\`

---

## 8. Xulosa

1. \`typeof\` — qiymat yoki o'zgaruvchining ma'lumot turini aniqlab beruvchi operatordir.
2. \`typeof\` natijasi har doim kichik harfli matn bo'ladi (\`"number"\`, \`"string"\`, \`"boolean"\`, \`"undefined"\`).
3. Qo'shtirnoq ichiga yozilgan har qanday qiymat \`string\` turiga kiradi.

Keyingi darsda: Ma'lumot turlarini bir-biriga aylantirish (Type Conversion) mavzusi bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Son turini aniqlash",
      instruction: "`price` nomli o'zgaruvchi yarating (`let price = 99;`) va uning turini `typeof` yordamida `console.log(typeof price);` orqali chiqaring.",
      startingCode: "let price = 99;\n// price ning turini konsolga chiqaring\n",
      hint: "console.log(typeof price);",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('number'))) return null;\nreturn 'Konsolga number chiqmadi';"
    },
    {
      id: 2,
      title: "Boolean turini aniqlash",
      instruction: "`isStudent` nomli o'zgaruvchi yarating (`let isStudent = true;`) va uning turini `typeof` yordamida konsolga chiqaring.",
      startingCode: "let isStudent = true;\n// isStudent ning turini konsolga chiqaring\n",
      hint: "console.log(typeof isStudent);",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('boolean'))) return null;\nreturn 'Konsolga boolean chiqmadi';"
    },
    {
      id: 3,
      title: "Qo'shtirnoqdagi son turini aniqlash",
      instruction: "`pin` nomli o'zgaruvchiga `\"1234\"` qiymatini bering va uning turini `typeof` bilan konsolga chiqaring.",
      startingCode: "let pin = \"1234\";\n// pin ning turini konsolga chiqaring\n",
      hint: "console.log(typeof pin);",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('string'))) return null;\nreturn 'Konsolga string chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`typeof` operatori nima uchun ishlatiladi?",
      options: [
        "O'zgaruvchining qiymatini o'chirish uchun",
        "Qiymat yoki o'zgaruvchining ma'lumot turini aniqlash uchun",
        "Matn uzunligini hisoblash uchun",
        "Yangi o'zgaruvchi e'lon qilish uchun"
      ],
      correctAnswer: 1,
      explanation: "typeof operatori har qanday qiymat yoki o'zgaruvchining qaysi ma'lumot turiga tegishli ekanligini qaytaradi."
    },
    {
      id: 2,
      question: "`console.log(typeof \"42\");` kodi konsolga nima chiqaradi?",
      options: [
        "\"number\"",
        "\"string\"",
        "42",
        "\"undefined\""
      ],
      correctAnswer: 1,
      explanation: "\"42\" qo'shtirnoq ichida yozilgani uchun uning turi son emas, balki string (matn) bo'ladi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri `typeof true` natijasi bo'ladi?",
      options: [
        "\"boolean\"",
        "\"true\"",
        "\"Number\"",
        "true"
      ],
      correctAnswer: 0,
      explanation: "true va false qiymatlarining turi har doim \"boolean\" bo'ladi."
    }
  ]
};

export const typeConversionLesson = {
  id: "typeConversionLesson",
  title: "Turlarni O'zgartirish (Type Conversion)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz chet eldasiz. Qo'lingizda dollar bor. Mahalliy do'konda faqat so'm qabul qilinadi. Siz ayirboshlash shoxobchasiga borasiz. Dollarni berasiz, so'mni olasiz. Qiymat o'sha — faqat ko'rinishi o'zgardi.

Dasturlashda ham shunday ayirboshlash bor. Matnni songa, sonni matnga aylantirish kerak bo'ladi. Bu ishni maxsus funksiyalar bajaradi.

Turlarni o'zgartirish (type conversion) — bir turdagi qiymatni boshqa turga o'tkazishdir. Bunda \`Number()\`, \`String()\` va \`Boolean()\` funksiyalari ishlatiladi.

---

## 2. Nega kerak?

Foydalanuvchi saytda yoshini kiritadi. Dastur uni matn sifatida qabul qiladi:

\`\`\`javascript
let textAge = "25"; // Matn
\`\`\`

Bu \`25\` ga o'xshaydi. Lekin bu son emas, matn. Matn bilan hisob-kitob qilib bo'lmaydi.

Muammo shunda: turini o'zgartirmasdan ishlatsangiz, natija kutilmagan bo'ladi. Yechim — hisoblashdan oldin \`Number()\` bilan songa aylantirish:

\`\`\`javascript
let realAge = Number(textAge); // Endi bu son
console.log(realAge);
\`\`\`

---

## 3. Birinchi misol

Bu kod matn ko'rinishidagi sonni \`Number()\` orqali haqiqiy songa aylantiradi.

\`\`\`javascript
let textAge = "25"; // Matn ko'rinishidagi son
let realAge = Number(textAge); // Songa aylantirish
console.log(realAge); // 25 chiqadi
console.log(typeof realAge); // number chiqadi
\`\`\`

\`\`\`text
// Natija:
25
number
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let textAge = "25";\` — qo'shtirnoq ichida \`"25"\` matni saqlandi.
- \`let realAge = Number(textAge);\` — \`Number()\` funksiyasi matnni haqiqiy songa aylantirdi.
- \`console.log(realAge);\` — konsolga \`25\` soni chiqadi.
- \`console.log(typeof realAge);\` — turi tekshirildi. \`number\` chiqdi. Demak, aylantirish ishlagan.

---

## 5. Yana bitta misol

Bu kod sonni matnga va birni mantiqiy qiymatga aylantiradi.

\`\`\`javascript
let score = 10; // Son saqlandi
let text = String(score); // Matnga aylantirish
let yes = Boolean(1); // Mantiqiy turga aylantirish
console.log(typeof text); // string chiqadi
console.log(typeof yes); // boolean chiqadi
\`\`\`

\`\`\`text
// Natija:
string
boolean
\`\`\`

Qator-baqator tahlil:
- \`String(score)\` — \`10\` sonini \`"10"\` matniga aylantirdi. Konsolda bir xil ko'rinsa ham, turi endi matn.
- \`Boolean(1)\` — \`1\` sonini \`true\` mantiqiy qiymatga aylantirdi.
- \`typeof\` ikkalasining ham yangi turini tasdiqladi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Kichik harf bilan yozish
❌ Xato kod:
\`\`\`javascript
let age = number("25");
\`\`\`
Nima bo'ladi: \`ReferenceError: number is not defined\` xatoligi yuz beradi. Bu uchala funksiya har doim KATTA harf bilan boshlanadi: \`Number()\`, \`String()\`, \`Boolean()\`.
✅ To'g'ri variant:
\`\`\`javascript
let age = Number("25");
console.log(age); // 25 chiqadi
\`\`\`

### 2. NaN ni dastur xatosi deb o'ylash
❌ Xato tushuncha:
\`\`\`javascript
let result = Number("kitob");
\`\`\`
Nima bo'ladi: dastur to'xtamaydi va qizil xatolik bermaydi. Matnda son bo'lmagani uchun JavaScript maxsus \`NaN\` (Not a Number — "son emas") qiymatini qaytaradi. Bu xato emas, "son yasab bo'lmadi" degan belgi.
✅ To'g'ri tushuncha:
\`\`\`javascript
let result = Number("kitob");
console.log(result); // NaN chiqadi
\`\`\`

### 3. Number() ni bo'sh chaqirish
❌ Xato kod:
\`\`\`javascript
let n = Number();
console.log(n);
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin konsolga kutilmagan \`0\` chiqadi. \`Number()\` ichiga hech narsa berilmasa, natija \`0\` bo'ladi.
✅ To'g'ri variant:
\`\`\`javascript
let n = Number("50"); // Aylantiriladigan qiymat yoziladi
console.log(n); // 50 chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`priceText\` da \`"150"\` matni berilgan. Uni \`Number()\` bilan songa aylantiring. \`realPrice\` ga saqlang va chiqaring.

### 2-mashq (O'rtacha)
\`score\` da \`10\` soni berilgan. Uni \`String()\` bilan matnga aylantiring. \`scoreText\` ga saqlang va turini \`typeof\` bilan chiqaring (\`string\` chiqishi kerak).

### 3-mashq (Chegara holat)
\`word\` da \`"kitob"\` matni berilgan. Uni \`Number(word)\` bilan songa aylantiring. \`notANumber\` ga saqlang va chiqaring (\`NaN\` chiqadi — bu xato emas).

### Javoblar:
1.
\`\`\`javascript
let priceText = "150";
let realPrice = Number(priceText);
console.log(realPrice);
\`\`\`
2.
\`\`\`javascript
let score = 10;
let scoreText = String(score);
console.log(typeof scoreText);
\`\`\`
3.
\`\`\`javascript
let word = "kitob";
let notANumber = Number(word);
console.log(notANumber);
\`\`\`

---

## 8. Xulosa

1. \`Number()\`, \`String()\` va \`Boolean()\` — qiymatni songa, matnga yoki mantiqiy turga aylantiradi. Har doim katta harf bilan yoziladi.
2. Matnda son bo'lmasa, \`Number()\` xato bermaydi — \`NaN\` ("son emas") qiymatini qaytaradi.
3. Aylantirishdan keyin turni \`typeof\` bilan tekshirish mumkin.

Keyingi darsda: Arifmetik operatorlar orqali sonlar ustida amallar bajarishni o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Matnni songa aylantirish",
      instruction: "`priceText` berilgan (`let priceText = \"150\";`). Uni `Number()` orqali songa aylantirib, `realPrice` ga saqlang va `console.log(realPrice);` orqali chiqaring.",
      startingCode: "let priceText = \"150\";\n// realPrice ga Number(priceText) ni saqlang va chiqaring\n",
      hint: "let realPrice = Number(priceText);\nconsole.log(realPrice);",
      test: "if (!code.includes('Number(')) return 'Number() funksiyasi ishlatilmadi';\nif (!code.includes('realPrice')) return 'realPrice o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '150')) return null;\nreturn '150 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Sonni matnga aylantirish",
      instruction: "`score` berilgan (`let score = 10;`). Uni `String()` bilan matnga aylantirib, `scoreText` ga saqlang va `console.log(typeof scoreText);` orqali turini chiqaring.",
      startingCode: "let score = 10;\n// scoreText ga String(score) ni saqlang va typeof bilan chiqaring\n",
      hint: "let scoreText = String(score);\nconsole.log(typeof scoreText);",
      test: "if (!code.includes('String(')) return 'String() funksiyasi ishlatilmadi';\nif (!code.includes('scoreText')) return 'scoreText o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'string')) return null;\nreturn 'string turi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "NaN natijasini olish",
      instruction: "`word` da `\"kitob\"` matni berilgan. Uni `Number(word)` bilan songa aylantirib, `notANumber` ga saqlang va chiqaring (`NaN` chiqadi — bu xato emas).",
      startingCode: "let word = \"kitob\";\n// notANumber ga Number(word) ni saqlang va chiqaring\n",
      hint: "let notANumber = Number(word);\nconsole.log(notANumber);",
      test: "if (!code.includes('Number(')) return 'Number() funksiyasi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'NaN')) return null;\nreturn 'NaN konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Birni true ga aylantirish",
      instruction: "`one` da `1` soni berilgan. Uni `Boolean()` bilan mantiqiy turga aylantirib, `yes` ga saqlang va chiqaring (`true` chiqadi).",
      startingCode: "let one = 1;\n// yes ga Boolean(one) ni saqlang va chiqaring\n",
      hint: "let yes = Boolean(one);\nconsole.log(yes);",
      test: "if (!code.includes('Boolean(')) return 'Boolean() funksiyasi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Nolni false ga aylantirish",
      instruction: "`zero` da `0` soni berilgan. Uni `Boolean()` bilan aylantirib, `no` ga saqlang va chiqaring (`false` chiqadi).",
      startingCode: "let zero = 0;\n// no ga Boolean(zero) ni saqlang va chiqaring\n",
      hint: "let no = Boolean(zero);\nconsole.log(no);",
      test: "if (!code.includes('Boolean(')) return 'Boolean() funksiyasi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Kichik harf xatosini tuzatish",
      instruction: "`let age = number(\"25\");` xato bermoqda. Katta harfga tuzating: `25` chiqsin.",
      startingCode: "let age = number(\"25\");\nconsole.log(age);\n",
      hint: "number o'rniga Number yozing.",
      test: "if (code.includes('number(')) return 'number ni katta harfda Number deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '25')) return null;\nreturn '25 konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Ikkita aylantirish bitta qatorda",
      instruction: "`String(20)` va `Boolean(1)` natijalarini AYNAN BIRTA `console.log` bilan chiqaring: `20 true` ko'rinsin.",
      startingCode: "// String(20) va Boolean(1) ni bitta console.log bilan chiqaring\n",
      hint: "console.log(String(20), Boolean(1));",
      test: "if (!code.includes('String(') || !code.includes('Boolean(')) return 'String() va Boolean() ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'BIRTA console.log bilan chiqaring';\nif (out[0].trim() === '20 true') return null;\nreturn \"Natija '20 true' bolishi kerak\";"
    },
    {
      id: 8,
      title: "Turni tekshirib isbotlash",
      instruction: "`t = String(50)` berilgan. `typeof` bilan turini chiqaring: `string` chiqsin.",
      startingCode: "let t = String(50);\n// typeof bilan turini chiqaring\n",
      hint: "console.log(typeof t);",
      test: "if (!code.includes('typeof t')) return 'typeof t deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'string')) return null;\nreturn 'string konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Bo'sh Number (chegara)",
      instruction: "`Number()` ni hech narsasiz chaqiring va chiqaring. Kutilmagan `0` chiqadi — sababi: bo'sh chaqiruv natijasi `0`.",
      startingCode: "// Number() ni bo'sh chaqirib chiqaring\n",
      hint: "console.log(Number());",
      test: "if (!code.includes('Number()')) return 'Number() ni bo\\'sh chaqiring';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === 0)) return null;\nreturn '0 konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Ikki xato bitta kodda (chegara)",
      instruction: "Ikki xato bor: `n` e'lon qilinmagan, `number` kichik harfda. Tuzating: `n = 40` chiqsin (`let n = Number(\"40\");`).",
      startingCode: "n = number(\"40\");\nconsole.log(n);\n",
      hint: "let n = Number(\"40\"); — let qo'shing, N ni kattalashtiring.",
      test: "if (code.includes('number(')) return 'number ni katta harfda Number deb yozing';\nif (!code.includes('let n')) return 'let n deb e\\'lon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === 40)) return null;\nreturn '40 konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`Number(\"50\")` qanday natija beradi?",
      options: [
        "\"50\" (matn)",
        "50 (son)",
        "NaN",
        "true"
      ],
      correctAnswer: 1,
      explanation: "Number() matn ichidagi raqamlarni haqiqiy songa aylantiradi."
    },
    {
      id: 2,
      question: "`Number(\"olma\")` nima qaytaradi?",
      options: [
        "Xatolik berib to'xtaydi",
        "0",
        "NaN (son emas belgisi)",
        "\"olma\" matni"
      ],
      correctAnswer: 2,
      explanation: "Matnda son bo'lmasa, Number() xato bermaydi — NaN qaytaradi."
    },
    {
      id: 3,
      question: "`String(100)` natijasi nima?",
      options: [
        "100 (son)",
        "\"100\" (matn)",
        "true",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "String() sonni matnga aylantiradi. Konsolda bir xil ko'rinsa ham, turi matn."
    },
    {
      id: 4,
      question: "`Boolean(1)` nima qaytaradi?",
      options: [
        "1",
        "true",
        "\"1\"",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Boolean(1) mantiqiy true qiymatni beradi."
    },
    {
      id: 5,
      question: "`Boolean(0)` nima qaytaradi?",
      options: [
        "0",
        "false",
        "\"0\"",
        "null"
      ],
      correctAnswer: 1,
      explanation: "Boolean(0) mantiqiy false qiymatni beradi."
    },
    {
      id: 6,
      question: "`let age = number(\"25\");` qatorida nima bo'ladi?",
      options: [
        "age 25 bo'ladi",
        "ReferenceError: number is not defined",
        "age matn bo'ladi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Bu funksiyalar katta harf bilan boshlanadi: Number, String, Boolean."
    },
    {
      id: 7,
      question: "NaN nimani bildiradi?",
      options: [
        "Dastur xatosini",
        "Son yasab bo'lmaganda chiqadigan maxsus belgi",
        "Bo'sh matnni",
        "Nolni"
      ],
      correctAnswer: 1,
      explanation: "NaN (Not a Number) — 'son emas' belgisi. Xato emas, natija."
    },
    {
      id: 8,
      question: "`console.log(Number());` nima chiqaradi?",
      options: [
        "Xatolik",
        "0",
        "undefined",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "Number() bo'sh chaqirilsa, natija 0 bo'ladi."
    },
    {
      id: 9,
      question: "Matnni songa aylantiradigan funksiya qaysi?",
      options: [
        "String()",
        "Number()",
        "Boolean()",
        "typeof"
      ],
      correctAnswer: 1,
      explanation: "Number() — songa, String() — matnga, Boolean() — mantiqiy turga aylantiradi."
    },
    {
      id: 10,
      question: "`let t = String(50); console.log(typeof t);` nima chiqaradi?",
      options: [
        "number",
        "string",
        "50",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "String(50) matn yasaydi, shuning uchun turi string."
    },
    {
      id: 11,
      question: "`console.log(String(20), Boolean(1));` natijasi nima?",
      options: [
        "20 true",
        "20 1",
        "\"20\" \"true\"",
        "Xatolik"
      ],
      correctAnswer: 0,
      explanation: "String(20) matn, Boolean(1) true beradi. Konsolda: 20 true."
    },
    {
      id: 12,
      question: "Qaysi yozuv to'g'ri aylantiradi?",
      options: [
        "let n = number(\"40\");",
        "let n = Number(\"40\");",
        "let n = NUMBER(\"40\");",
        "let n = Num(\"40\");"
      ],
      correctAnswer: 1,
      explanation: "Faqat birinchi harfi katta Number to'g'ri. Qolganlari xato beradi."
    }
  ]
};

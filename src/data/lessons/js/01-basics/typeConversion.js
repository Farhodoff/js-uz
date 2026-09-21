export const typeConversionLesson = {
  id: "typeConversionLesson",
  title: "Turlarni O'zgartirish (Type Conversion)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz chet eldasiz va qo'lingizda dollar bor. Mahalliy do'konda faqat so'm qabul qilinadi. Siz valyuta almashtirish shoxobchasiga borib, dollarni so'mga almashtirasiz.
Dasturlashda ham ma'lumotlar bir turdan ikkinchi turga o'tkaziladi: matn songa, son matnga yoki qiymatlar true/false ga aylantiriladi.

Turlarni o'zgartirish (type conversion) — bir ma'lumot turidagi qiymatni boshqa ma'lumot turiga (masalan, matnni songa) o'tkazishdir.

---

## 2. Nega kerak?

Foydalanuvchi saytda yoshini yoki pul miqdorini kiritganda, dastur uni odatda matn (String) sifatida qabul qiladi (masalan, \`"25"\`).
Agar biz matn ustida matematik amallar bajarmoqchi bo'lsak yoki uni solishtirmoqchi bo'lsak, xatolar yuz beradi (masalan, \`"25" + 5\` amali \`30\` emas, \`"255"\` bo'lib qoladi).

Bunday xatolarning oldini olish uchun hisob-kitobdan oldin matnni \`Number()\` yordamida haqiqiy songa aylantirib olishimiz kerak.

---

## 3. Birinchi misol

Bu kod matn ko'rinishidagi sonni \`Number()\` orqali haqiqiy songa aylantiradi va konsolga chiqaradi.

\`\`\`javascript
let textAge = "25"; // Matn ko'rinishidagi son
let realAge = Number(textAge); // Songa aylantirish
console.log(realAge); // Natijani chiqarish
console.log(typeof realAge); // Turini tekshirish
\`\`\`

\`\`\`text
// Natija: 25
// Natija: number
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let textAge = "25";\` — qo'shtirnoq ichida \`"25"\` matni saqlandi.
- \`let realAge = Number(textAge);\` — \`Number()\` buyrug'i matnni haqiqiy son turiga aylantirib beradi.
- \`console.log(realAge);\` — konsolga \`25\` soni chiqadi.
- \`console.log(typeof realAge);\` — konsolga \`number\` chiqadi, ya'ni uning turi haqiqatan ham songa aylangan.

---

## 5. Yana bitta misol

Bu kod harfiy matnni songa aylantirishga urinadi va natijada \`NaN\` hosil bo'ladi.

\`\`\`javascript
let text = "salom"; // Raqam bo'lmagan matn
let result = Number(text); // Songa aylantirish
console.log(result); // Natijani chiqarish
\`\`\`

\`\`\`text
// Natija: NaN
\`\`\`

Qator-baqator tahlil:
- \`Number("salom")\` — matn ichida raqam bo'lmagani uchun JavaScript uni songa aylantira olmaydi.
- Natijada maxsus \`NaN\` (Not a Number — "Son emas") qiymati hosil bo'ladi.
- \`console.log(result);\` — konsolga \`NaN\` chiqadi.

Boshqa turlarga aylantirish:
- \`String(100)\` → \`"100"\` (sonni matnga aylantirish)
- \`Boolean(1)\` → \`true\`, \`Boolean(0)\` → \`false\` (mantiqiy turga aylantirish)

---

## 6. Ko'p uchraydigan xatolar

### 1. Number, String, Boolean ni kichik harf bilan yozish
❌ Xato kod:
\`\`\`javascript
let age = number("25");
\`\`\`
Nima bo'ladi: \`ReferenceError: number is not defined\` xatoligi yuz beradi. Turlarni o'zgartiruvchi bu buyruqlar har doim KATTA harf bilan boshlanadi: \`Number()\`, \`String()\`, \`Boolean()\`.
✅ To'g'ri variant:
\`\`\`javascript
let age = Number("25");
\`\`\`

### 2. NaN ni dastur xatosi (error) deb o'ylash
❌ Xato tushuncha: \`Number("kitob")\` kod yozilganda dastur to'xtab qoladi deb o'ylash.
Nima bo'ladi: Dastur to'xtamaydi yoki qizil xatolik bermaydi. JavaScript shunchaki \`NaN\` degan maxsus qiymat qaytaradi.
✅ To'g'ri tushuncha: Agar matndan son yasab bo'lmasa, natija \`NaN\` bo'ladi.

### 3. Boolean("false") ni false deb o'ylash
❌ Xato tushuncha:
\`\`\`javascript
let isAccess = Boolean("false"); // true bo'ladi!
\`\`\`
Nima bo'ladi: Qo'shtirnoq ichida biron belgi bo'lsa (hatto u \`"false"\` yoki \`"0"\` bo'lsa ham), \`Boolean()\` uni \`true\` deb hisoblaydi! Faqat mutlaqo bo'sh matn (\`""\`) \`false\` bo'ladi.
✅ To'g'ri variant:
\`\`\`javascript
let isAccess = Boolean(""); // false
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`priceText\` nomli o'zgaruvchida \`"150"\` matni berilgan (\`let priceText = "150";\`). Uni \`Number()\` orqali songa aylantiring, \`realPrice\` nomli o'zgaruvchiga saqlang va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`score\` nomli o'zgaruvchida \`10\` soni berilgan (\`let score = 10;\`). Uni \`String()\` yordamida matnga aylantirib, \`scoreText\` o'zgaruvchisiga saqlang va uning turini \`typeof\` orqali konsolga chiqaring (\`string\` chiqishi kerak).

### 3-mashq (Chegara holat)
\`word\` o'zgaruvchisida \`"kitob"\` matni berilgan (\`let word = "kitob";\`). Uni \`Number(word)\` orqali songa aylantirib, \`notANumber\` o'zgaruvchisiga saqlang va konsolga chiqaring (\`NaN\` chiqadi).

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

1. \`Number()\`, \`String()\` va \`Boolean()\` — qiymatni mos ravishda son, matn yoki mantiqiy turga aylantiradi. Ular katta harf bilan boshlanadi.
2. Agar matnda son bo'lmasa, \`Number("salom")\` amali \`NaN\` (Not a Number — "son emas") qiymatini qaytaradi.
3. \`Boolean()\` da \`0\`, \`""\` (bo'sh matn), \`null\`, \`undefined\` va \`NaN\` qiymatlari \`false\` bo'ladi, qolgan hamma qiymatlar \`true\` bo'ladi.

Keyingi darsda: Arifmetik operatorlar orqali sonlar ustida amallar bajarishni o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Matnni songa aylantirish",
      instruction: "`priceText` nomli o'zgaruvchi berilgan (`let priceText = \"150\";`). Uni `Number()` orqali songa aylantirib, `realPrice` o'zgaruvchisiga saqlang va `console.log(realPrice);` orqali chiqaring.",
      startingCode: "let priceText = \"150\";\n// realPrice o'zgaruvchisiga Number(priceText) ni saqlang va chiqaring\n",
      hint: "let realPrice = Number(priceText);\nconsole.log(realPrice);",
      test: "if (!code.includes('Number(')) return 'Number() funksiyasi ishlatilmadi';\nif (!code.includes('realPrice')) return 'realPrice o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('150'))) return null;\nreturn '150 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Sonni matnga aylantirish",
      instruction: "`score` nomli o'zgaruvchi berilgan (`let score = 10;`). Uni `String()` yordamida matnga aylantirib, `scoreText` ga saqlang va `console.log(typeof scoreText);` orqali turini chiqaring.",
      startingCode: "let score = 10;\n// scoreText ga String(score) ni saqlang va typeof bilan chiqaring\n",
      hint: "let scoreText = String(score);\nconsole.log(typeof scoreText);",
      test: "if (!code.includes('String(')) return 'String() funksiyasi ishlatilmadi';\nif (!code.includes('scoreText')) return 'scoreText o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('string'))) return null;\nreturn 'string turi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "NaN natijasini olish",
      instruction: "`word` o'zgaruvchisida `\"kitob\"` matni berilgan (`let word = \"kitob\";`). Uni `Number(word)` orqali songa aylantirib, `notANumber` o'zgaruvchisiga saqlang va konsolga chiqaring.",
      startingCode: "let word = \"kitob\";\n// notANumber ga Number(word) ni saqlang va chiqaring\n",
      hint: "let notANumber = Number(word);\nconsole.log(notANumber);",
      test: "if (!code.includes('Number(')) return 'Number() funksiyasi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('NaN'))) return null;\nreturn 'NaN konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`Number(\"50\")` ifodasi qanday natija beradi?",
      options: [
        "\"50\" (matn)",
        "50 (son)",
        "NaN",
        "true"
      ],
      correctAnswer: 1,
      explanation: "Number() matn ko'rinishidagi raqamlarni haqiqiy son (number) turiga o'tkazadi."
    },
    {
      id: 2,
      question: "`Number(\"olma\")` amali bajarilganda nima natija chiqadi?",
      options: [
        "Xatolik yuz berib dastur to'xtaydi",
        "0 chiqadi",
        "NaN (Not a Number)",
        "\"olma\" matni"
      ],
      correctAnswer: 2,
      explanation: "Raqam bo'lmagan matnni songa aylantirib bo'lmaydi, shuning uchun JavaScript NaN (Not a Number) qaytaradi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri `Boolean()` ga berilganda `false` qaytaradi?",
      options: [
        "\"salom\"",
        "100",
        "0",
        "\"0\""
      ],
      correctAnswer: 2,
      explanation: "0 soni yolg'on (false) hisoblanadi. \"0\" esa bo'sh bo'lmagan matn bo'lgani uchun true bo'ladi."
    }
  ]
};

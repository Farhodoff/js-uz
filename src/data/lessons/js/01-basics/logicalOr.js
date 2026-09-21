export const logicalOr = {
  id: "logicalOr",
  title: "Mantiqiy YOKI (||)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz supermarket kassasida to'lov qilyapsiz. Kassir aytadi: "Naqd pul **YOKI** plastik karta orqali to'lashingiz mumkin".
- Agar sizda naqd pul bo'lsa — to'lay olasiz (\`true\`).
- Agar naqd pul bo'lmay, faqat karta bo'lsa — baribir to'lay olasiz (\`true\`).
- Ikkalasi ham bo'lsa — yanada yaxshi, baribir to'lay olasiz (\`true\`).
- Faqat va faqat naqd pulingiz HAM, kartangiz HAM bo'lmagandagina to'lov qila olmaysiz (\`false\`).

Mantiqiy YOKI (\`||\`) operatori — ikkita shartni birlashtiradi va kamida bitta shart rost (\`true\`) bo'lsa ham \`true\` qaytaradi. Faqat ikkala tomon ham yolg'on (\`false\`) bo'lgandagina \`false\` bo'ladi.

---

## 2. Nega kerak?

Dasturlarda ko'pincha bir nechta imkoniyatlardan aqalli bittasi to'g'ri kelishi kifoya qiladi:
- Foydalanuvchi tizimga elektron pochta YOKI telefon raqami orqali kirishi mumkin.
- Saytda chegirma talabalar YOKI pensionerlar uchun beriladi.

\`||\` operatori bunday muqobil variantlardan birontasi to'g'ri kelganini tekshirish uchun xizmat qiladi.

---

## 3. Birinchi misol

Bu kod bitta shart \`true\`, ikkinchisi \`false\` bo'lganda \`||\` operatorining natijasini ko'rsatadi.

\`\`\`javascript
let hasCash = false; // Naqd pul yo'q
let hasCard = true; // Karta bor

let canPay = hasCash || hasCard; // Kamida bittasi bo'lsa yetarli: true
console.log(canPay);
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`hasCash || hasCard\` — \`||\` (ikkita vertikal chiziq) mantiqiy YOKI operatoridir.
- \`hasCash\` yolg'on (\`false\`) bo'lsa ham, \`hasCard\` rost (\`true\`) bo'lgani uchun umumiy natija \`true\` bo'ladi.
- \`console.log(canPay);\` — konsolga \`true\` chiqadi.

---

## 5. Yana bitta misol

Bu kod ikkala shart ham \`false\` bo'lganda \`||\` natijasi qanday bo'lishini ko'rsatadi.

\`\`\`javascript
let isWeekend = false; // Dam olish kuni emas
let isHoliday = false; // Bayram ham emas

let isFreeDay = isWeekend || isHoliday; // Ikkalasi ham false: false
console.log(isFreeDay);
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

Qator-baqator tahlil:
- \`isWeekend || isHoliday\` — ikkala tomon ham \`false\` bo'lgan yagona holat.
- Hech qaysi shart bajarilmagani uchun natija \`false\` bo'ladi.
- \`console.log(isFreeDay);\` — konsolga \`false\` chiqadi.

Mantiqiy YOKI (\`||\`) natijalari jadvali:
- \`true || true\` → \`true\`
- \`true || false\` → \`true\`
- \`false || true\` → \`true\`
- \`false || false\` → \`false\`

---

## 6. Ko'p uchraydigan xatolar

### 1. Bitta | yozib qo'yish
❌ Xato kod:
\`\`\`javascript
let canEnter = isWeekend | isHoliday;
\`\`\`
Nima bo'ladi: Bitta \`|\` mantiqiy YOKI emas, balki "bit operatori" (bitwise) hisoblanadi. Mantiqiy YOKI uchun har doim ikkita vertikal chiziq \`||\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let canEnter = isWeekend || isHoliday;
\`\`\`

### 2. Belgini harflar yoki slash bilan adashtirish
❌ Xato kod:
\`\`\`javascript
let canPay = hasCash ll hasCard; // SyntaxError
let canPay = hasCash // hasCard; // Izoh bo'lib qoladi
\`\`\`
Nima bo'ladi: \`||\` belgisi klaviaturadagi Shift + \`\\\` (Enter tugmasi tepasidagi backslash) tugmasi orqali yoziladi. U harf yoki slash emas.
✅ To'g'ri variant:
\`\`\`javascript
let canPay = hasCash || hasCard;
\`\`\`

### 3. && bilan || ni adashtirish
❌ Xato tushuncha: \`||\` operatori ham ikkala shart bajarilishini talab qiladi deb o'ylash.
Nima bo'ladi: \`&&\` barcha shartlar bajarilishini talab qiladi (talabchan). \`||\` esa aqalli bittasi to'g'ri bo'lsa ham \`true\` beradi (yumshoq).
✅ To'g'ri tushuncha: Agar "kamida bittasi to'g'ri bo'lsa yetarli" deyilgan bo'lsa — \`||\` ishlatiladi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`hasEmail\` (\`false\`) va \`hasPhone\` (\`true\`) o'zgaruvchilarini yarating. Ro'yxatdan o'tish uchun kamida bittasi yetarli ekanini (\`hasEmail || hasPhone\`) tekshiring, natijani \`canRegister\` ga saqlang va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`isStudent\` (\`false\`) va \`isPensioner\` (\`false\`) o'zgaruvchilarini yarating. Chegirma olish uchun kamida biri bo'lishini (\`isStudent || isPensioner\`) tekshiring, natijani \`hasDiscount\` ga saqlang va konsolga chiqaring (\`false\` chiqadi).

### 3-mashq (Chegara holat)
\`userScore\` ga \`85\` sonini bering. U 90 dan kattami yoki 80 ga teng yoki kattaligini (\`(userScore > 90) || (userScore >= 80)\`) tekshirib, natijani \`isGoodScore\` ga saqlang va konsolga chiqaring (\`true\` chiqadi).

### Javoblar:
1.
\`\`\`javascript
let hasEmail = false;
let hasPhone = true;
let canRegister = hasEmail || hasPhone;
console.log(canRegister);
\`\`\`
2.
\`\`\`javascript
let isStudent = false;
let isPensioner = false;
let hasDiscount = isStudent || isPensioner;
console.log(hasDiscount);
\`\`\`
3.
\`\`\`javascript
let userScore = 85;
let isGoodScore = (userScore > 90) || (userScore >= 80);
console.log(isGoodScore);
\`\`\`

---

## 8. Xulosa

1. \`||\` (mantiqiy YOKI) operatori muqobil shartlarni tekshirish uchun ishlatiladi.
2. Agar shartlardan aqalli bittasi \`true\` bo'lsa ham, umumiy natija \`true\` bo'ladi.
3. Natija faqat ikkala tomon ham \`false\` bo'lgandagina \`false\` bo'ladi.

Keyingi darsda: Mantiqiy EMAS (!) operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "|| operatori bilan tekshirish",
      instruction: "`hasEmail` (`false`) va `hasPhone` (`true`) o'zgaruvchilarini yarating. `hasEmail || hasPhone` natijasini `canRegister` ga saqlab `console.log(canRegister);` orqali chiqaring.",
      startingCode: "let hasEmail = false;\nlet hasPhone = true;\n// canRegister ga hasEmail || hasPhone ni saqlang va chiqaring\n",
      hint: "let canRegister = hasEmail || hasPhone;\nconsole.log(canRegister);",
      test: "if (!code.includes('||')) return '|| operatori ishlatilmadi';\nif (!code.includes('canRegister')) return 'canRegister o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Ikkala tomon ham false bo'lgan holat",
      instruction: "`isStudent` (`false`) va `isPensioner` (`false`) o'zgaruvchilarini yarating. Ularning `||` natijasini `hasDiscount` ga saqlab konsolga chiqaring.",
      startingCode: "let isStudent = false;\nlet isPensioner = false;\n// hasDiscount ga shartni saqlang va chiqaring\n",
      hint: "let hasDiscount = isStudent || isPensioner;\nconsole.log(hasDiscount);",
      test: "if (!code.includes('||')) return '|| operatori ishlatilmadi';\nif (!code.includes('hasDiscount')) return 'hasDiscount o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('false'))) return null;\nreturn 'false natijasi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Taqqoslash bilan || operatori",
      instruction: "`userScore = 85;` o'zgaruvchisi berilgan. `(userScore > 90) || (userScore >= 80)` ifodasini `isGoodScore` ga saqlang va konsolga chiqaring.",
      startingCode: "let userScore = 85;\n// isGoodScore ga shartni saqlang va chiqaring\n",
      hint: "let isGoodScore = (userScore > 90) || (userScore >= 80);\nconsole.log(isGoodScore);",
      test: "if (!code.includes('||')) return '|| operatori ishlatilmadi';\nif (!code.includes('isGoodScore')) return 'isGoodScore o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`false || true` amali qanday natija beradi?",
      options: [
        "false",
        "true",
        "undefined",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "|| operatori bitta tomoni true bo'lsa ham true qaytaradi."
    },
    {
      id: 2,
      question: "|| operatori qachon false natija qaytaradi?",
      options: [
        "Tomonlardan biri false bo'lganda",
        "Faqat ikkala tomoni ham false bo'lgandagina",
        "Ikkala tomoni ham true bo'lganda",
        "Har doim true qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Mantiqiy YOKI (||) faqat barcha shartlar yolg'on (false) bo'lgandagina false qaytaradi."
    },
    {
      id: 3,
      question: "JavaScript'da mantiqiy YOKI operatori qaysi belgi bilan yoziladi?",
      options: [
        "OR",
        "||",
        "//",
        "&&"
      ],
      correctAnswer: 1,
      explanation: "Mantiqiy YOKI operatori ikkita vertikal chiziq (||) bilan yoziladi."
    }
  ]
};

export const nullUndefined = {
  id: "nullUndefined",
  title: "null va undefined: Bo'sh qiymatlar",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz yangi daftar sotib oldingiz va hali hech narsa yozmadingiz. Varaqlari bo'm-bo'sh. Bu — \`undefined\` (hali hech narsa yozilmagan, belgilanmagan).
Endi tasavvur qiling, o'qituvchi bir varaqqa ataylab "Bu sahifa bo'sh qoldirildi" deb muhr bosib qo'ydi. Bu — \`null\` (u ataylab bo'sh deb belgilangan).

- \`undefined\` — o'zgaruvchi yaratilgan, lekin unga hali hech qanday qiymat berilmaganligini bildiradi (JavaScript buni avtomatik beradi).
- \`null\` — qiymat ataylab "bo'sh" yoki "mavjud emas" qilib belgilanganligini bildiradi (buni dasturchi ataylab yozadi).

---

## 2. Nega kerak?

Dasturda ba'zan ma'lumotning yo'qligini yoki hali mavjud emasligini ifodalash kerak bo'ladi:
- Yangi ro'yxatdan o'tgan foydalanuvchining hali profil rasmi yo'q.
- Anketada "ikkinchi telefon raqami" to'ldirilmagan.

Agar bunday holatda ma'lumot yo'qligini ifodalab bo'lmasa, dastur chalkashib ketadi. \`null\` va \`undefined\` dasturga "bu yerda qiymat yo'q" deb aniq aytish imkonini beradi.

---

## 3. Birinchi misol

Bu kod o'zgaruvchini qiymatsiz e'lon qiladi va konsolga chiqaradi.

\`\`\`javascript
let userAge; // O'zgaruvchi yaratildi, lekin qiymat berilmadi
console.log(userAge);
\`\`\`

\`\`\`text
// Natija: undefined
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let userAge;\` — \`userAge\` nomli o'zgaruvchi yaratildi. Unga \`=\` belgisi orqali hech narsa berilmadi.
- \`console.log(userAge);\` — JavaScript qiymat berilmagan o'zgaruvchini ko'rib, avtomatik ravishda \`undefined\` chiqaradi.

---

## 5. Yana bitta misol

Bu kod o'zgaruvchiga ataylab bo'sh ekanini bildiruvchi \`null\` qiymatini beradi va konsolga chiqaradi.

\`\`\`javascript
let userCar = null; // Mashinasi yo'qligi ataylab belgilandi
console.log(userCar);
\`\`\`

\`\`\`text
// Natija: null
\`\`\`

Qator-baqator tahlil:
- \`let userCar = null;\` — biz o'zgaruvchiga ataylab \`null\` qiymatini yozdik. Bu "hozircha mashina yo'q" degan ma'noni beradi.
- \`console.log(userCar);\` — konsolga \`null\` chiqadi.

---

## 6. Ko'p uchraydigan xatolar

### 1. null yoki undefined ni qo'shtirnoqqa olish
❌ Xato kod:
\`\`\`javascript
let emptyBox = "null";
\`\`\`
Nima bo'ladi: \`emptyBox\` bo'sh qiymat emas, oddiy 4 ta harfli matn (String) bo'lib qoladi.
✅ To'g'ri variant:
\`\`\`javascript
let emptyBox = null;
\`\`\`

### 2. Katta harflar bilan yozish
❌ Xato kod:
\`\`\`javascript
let score = Null;
\`\`\`
Nima bo'ladi: \`ReferenceError: Null is not defined\` xatoligi yuz beradi. JavaScript harflar registriga sezgir, \`null\` va \`undefined\` faqat kichik harflarda yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let score = null;
\`\`\`

### 3. const bilan qiymatsiz o'zgaruvchi yaratish
❌ Xato kod:
\`\`\`javascript
const userCity;
\`\`\`
Nima bo'ladi: \`SyntaxError: Missing initializer in const declaration\` xatoligi yuz beradi. \`const\` o'zgarmas bo'lgani sababli unga yaratilish paytidayoq qiymat berilishi shart. Qiymatni keyinroq berish yoki \`undefined\` holatida qoldirish uchun faqat \`let\` ishlatiladi.
✅ To'g'ri variant:
\`\`\`javascript
let userCity;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`userEmail\` nomli o'zgaruvchi e'lon qiling (\`let\` bilan), lekin unga hech qanday qiymat bermang. Uni konsolga chiqaring.

### 2-mashq (O'rtacha)
\`discountCoupon\` nomli o'zgaruvchi yarating (\`let\` bilan) va unga ataylab bo'sh qiymat — \`null\` bering. Uni konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi xatoni to'g'rilang, toki u \`SyntaxError\` bermasdan konsolga \`undefined\` chiqarsin:
\`\`\`javascript
const userScore;
console.log(userScore);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let userEmail;
console.log(userEmail);
\`\`\`
2.
\`\`\`javascript
let discountCoupon = null;
console.log(discountCoupon);
\`\`\`
3.
\`\`\`javascript
let userScore; // const o'rniga let ishlatiladi
console.log(userScore);
\`\`\`

---

## 8. Xulosa

1. \`undefined\` — o'zgaruvchi bor, lekin qiymat berilmagan (JavaScript tomonidan avtomatik beriladi).
2. \`null\` — o'zgaruvchi ataylab bo'sh qilib belgilangan (dasturchi tomonidan yoziladi).
3. Ikkalasi ham kichik harflar bilan va qo'shtirnoqsiz yoziladi.

Keyingi darsda: O'zgaruvchining qaysi ma'lumot turiga tegishli ekanligini aniqlash uchun \`typeof\` operatorini o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "undefined qiymatini olish",
      instruction: "`userEmail` nomli o'zgaruvchi e'lon qiling (`let` bilan), unga hech qanday qiymat bermang va `console.log(userEmail);` orqali chiqaring.",
      startingCode: "// userEmail o'zgaruvchisini yarating va chiqaring\n",
      hint: "let userEmail;\nconsole.log(userEmail);",
      test: "if (!code.includes('userEmail')) return 'userEmail nomli o\\'zgaruvchi topilmadi';\nif (code.includes('=')) return 'O\\'zgaruvchiga qiymat bermang (= belgisini ishlatmang)';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('undefined'))) return null;\nreturn 'undefined qiymati konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "null qiymatini berish",
      instruction: "`discountCoupon` nomli o'zgaruvchi yarating (`let` bilan), unga `null` qiymatini bering va `console.log(discountCoupon);` orqali chiqaring.",
      startingCode: "// discountCoupon o'zgaruvchisini yarating va chiqaring\n",
      hint: "let discountCoupon = null;\nconsole.log(discountCoupon);",
      test: "if (code.includes('\"null\"') || code.includes(\"'null'\")) return 'null so\\'zini qo\\'shtirnoqsiz yozing';\nif (!code.includes('discountCoupon')) return 'discountCoupon nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('null'))) return null;\nreturn 'null qiymati konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "SyntaxError ni to'g'rilash",
      instruction: "`const userScore;` dagi xatoni tuzating (`const` o'rniga `let` ishlating), toki konsolga `undefined` chiqsin.",
      startingCode: "const userScore;\nconsole.log(userScore);\n",
      hint: "let userScore;\nconsole.log(userScore);",
      test: "if (code.includes('const')) return 'const o\\'rniga let ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('undefined'))) return null;\nreturn 'undefined qiymati konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "O'zgaruvchi e'lon qilinib, unga hech qanday qiymat berilmasa, uning qiymati nima bo'ladi?",
      options: [
        "null",
        "undefined",
        "0",
        "\"\" (bo'sh matn)"
      ],
      correctAnswer: 1,
      explanation: "JavaScript qiymat berilmagan o'zgaruvchilarga avtomatik tarzda undefined qiymatini biriktiradi."
    },
    {
      id: 2,
      question: "null bilan undefined o'rtasidagi asosiy farq nima?",
      options: [
        "null dasturchi tomonidan ataylab bo'sh qilib beriladi, undefined esa qiymat hali belgilanmaganligini bildiradi",
        "null — matn, undefined — son",
        "undefined faqat xatolik bo'lganda chiqadi, null esa hech qachon ishlatilmaydi",
        "Ikkalasi mutlaqo bir xil va hech qanday farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "undefined — o'zgaruvchiga hali qiymat berilmaganligini (avtomatik), null esa ataylab bo'sh ekanligini (dasturchi tomonidan) bildiradi."
    },
    {
      id: 3,
      question: "`let item = \"null\";` kodi haqida qaysi fikr to'g'ri?",
      options: [
        "Bu bo'sh qiymatli null o'zgaruvchisi",
        "Qo'shtirnoq ichida bo'lgani uchun bu oddiy matn (String)",
        "Bu kod SyntaxError xatoligini beradi",
        "O'zgaruvchi qiymati undefined bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoqqa olingan har qanday so'z matn (String) hisoblanadi, haqiqiy null esa qo'shtirnoqsiz yoziladi."
    }
  ]
};

export const optionalChaining = {
  id: "optional-chaining",
  title: "Optional Chaining & Nullish Coalescing",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

- **Optional Chaining (\`?.\`)**: Obyekt ichidagi chuqur joylashgan xususiyatlarga yoki metodlarga xavfsiz tarzda murojaat qilish imkonini beruvchi operator. Agar zanjirning biror qismi \`null\` yoki \`undefined\` bo'lsa, xatolik bermasdan murojaatni to'xtatadi va \`undefined\` qaytaradi.
- **Nullish Coalescing (\`??\`)**: Faqatgina qiymat \`null\` yoki \`undefined\` bo'lgan holda zaxira (default) qiymatni o'rnatish imkonini beruvchi mantiqiy operator.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**YOMON:** Obyektning ichkarisidagi ma'lumotni olish uchun uzun \`&&\` (AND) zanjirlarini yozish.
\`\`\`javascript
const user = { name: "Ali", address: { city: "Toshkent" } };
const city = user && user.address && user.address.city;
\`\`\`

**YAXSHI:** Optional Chaining yordamida buni qisqartirish.
\`\`\`javascript
const user = { name: "Ali", address: { city: "Toshkent" } };
const city = user?.address?.city;
\`\`\`

**YOMON:** Default qiymat o'rnatish uchun \`||\` (OR) operatoridan foydalanish (bu 0, "", false kabi qonuniy falsy qiymatlarni ham e'tiborsiz qoldiradi).
\`\`\`javascript
const options = { timeout: 0 };
// XATO: 0 o'rniga 1000 olib qo'yadi
const timeout = options.timeout || 1000; 
\`\`\`

**YAXSHI:** Nullish Coalescing (\`??\`) dan foydalanish.
\`\`\`javascript
const options = { timeout: 0 };
// TO'G'RI: Faqat null/undefined bo'lsagina 1000 ni oladi, aks holda 0
const timeout = options.timeout ?? 1000;
\`\`\`

## 🎤 Intervyu Savollari

1. **\`??\` va \`||\` ning farqi nimada?**
   - \`||\` barcha "falsy" qiymatlarni (\`0\`, \`""\`, \`false\`, \`NaN\`, \`null\`, \`undefined\`) inobatga oladi va o'ng tarafdagi qiymatni oladi.
   - \`??\` faqat "nullish" (\`null\` yoki \`undefined\`) qiymatlarnigina inobatga oladi.
2. **Optional chainingni qayerlarda ishlatish mumkin?**
   - Obyekt xususiyatlarini o'qishda: \`obj?.prop\`
   - Massiv elementlariga murojaat qilishda: \`arr?.[index]\`
   - Funksiya yoki metodlarni chaqirishda: \`func?.()\`
3. **\`user?.name = "Ali"\` yozsak nima bo'ladi?**
   - \`SyntaxError\` yuz beradi. Optional chaining faqat o'qish (read) uchun mo'ljallangan, qiymat tayinlash (assignment) uchun ishlatilmaydi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD
    A[Nullish Coalescing ??] --> B{Value is null or undefined?}
    B -- Yes --> C[Return Right Side]
    B -- No --> D[Return Left Side]
    
    E[Optional Chaining ?.] --> F{Value is null or undefined?}
    F -- Yes --> G[Stop and return undefined]
    F -- No --> H[Continue chain]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Xavfsiz mulkni o'qish",
      instruction: "Berilgan obyekt ichidagi `user.address.city` qiymatini Optional Chaining yordamida oling va qaytaring.",
      startingCode: "function getCity(user) {\n  // kodni bu yerda yozing\n}",
      hint: "user?.address?.city ishlating.",
      solution: "function getCity(user) {\n  return user?.address?.city;\n}",
      test: "const fn = new Function(code + '; return getCity;')(); if (fn({address: {city: 'Tashkent'}}) !== 'Tashkent' || fn({}) !== undefined) throw new Error('Test failed');"
    },
    {
      id: 2,
      title: "Massiv elementini o'qish",
      instruction: "Obyekt ichidagi `data.users` massivining 0-chi elementini optional chaining yordamida xavfsiz qaytaring.",
      startingCode: "function getFirstUser(data) {\n  // kodni bu yerda yozing\n}",
      hint: "data?.users?.[0] ishlating.",
      solution: "function getFirstUser(data) {\n  return data?.users?.[0];\n}",
      test: "const fn = new Function(code + '; return getFirstUser;')(); if (fn({users: ['Ali']}) !== 'Ali' || fn({}) !== undefined) throw new Error('Test failed');"
    },
    {
      id: 3,
      title: "Metodni xavfsiz chaqirish",
      instruction: "Agar `obj` da `sayHello` metodi mavjud bo'lsa, uni chaqiring va natijasini qaytaring. Yo'q bo'lsa undefined qaytaring.",
      startingCode: "function callMethod(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "obj?.sayHello?.()",
      solution: "function callMethod(obj) {\n  return obj?.sayHello?.();\n}",
      test: "const fn = new Function(code + '; return callMethod;')(); if (fn({sayHello: () => 'Hi'}) !== 'Hi' || fn({}) !== undefined) throw new Error('Test failed');"
    },
    {
      id: 4,
      title: "Nullish Coalescing (default qiymat)",
      instruction: "Foydalanuvchi yoshi (age) berilmagan bo'lsa (null/undefined), 18 ni qaytaring. 0 berilsa 0 qaytishi kerak.",
      startingCode: "function getAge(age) {\n  // kodni bu yerda yozing\n}",
      hint: "age ?? 18 ishlating.",
      solution: "function getAge(age) {\n  return age ?? 18;\n}",
      test: "const fn = new Function(code + '; return getAge;')(); if (fn(0) !== 0 || fn(null) !== 18) throw new Error('Test failed');"
    },
    {
      id: 5,
      title: "Ikki operator birgalikda",
      instruction: "`user.profile.bio` qiymatini oling. Agar zanjirda qaysidir qism yo'q bo'lsa (yoki bio null bo'lsa), 'No bio' qaytaring.",
      startingCode: "function getBio(user) {\n  // kodni bu yerda yozing\n}",
      hint: "user?.profile?.bio ?? 'No bio'",
      solution: "function getBio(user) {\n  return user?.profile?.bio ?? 'No bio';\n}",
      test: "const fn = new Function(code + '; return getBio;')(); if (fn({profile: {bio: 'Dev'}}) !== 'Dev' || fn({}) !== 'No bio') throw new Error('Test failed');"
    },
    {
      id: 6,
      title: "Bo'sh string bilan Nullish",
      instruction: "Foydalanuvchi ismi string ko'rinishida beriladi. Agar u `null` yoki `undefined` bo'lsa, 'Guest' qaytaring. Agar qasddan bo'sh string `\"\"` kiritilgan bo'lsa, uni aslicha qaytaring.",
      startingCode: "function getName(name) {\n  // kodni bu yerda yozing\n}",
      hint: "name ?? 'Guest'",
      solution: "function getName(name) {\n  return name ?? 'Guest';\n}",
      test: "const fn = new Function(code + '; return getName;')(); if (fn('') !== '' || fn(undefined) !== 'Guest') throw new Error('Test failed');"
    },
    {
      id: 7,
      title: "Optional argument",
      instruction: "`callback` argument sifatida beriladi. Agar u bor bo'lsa uni `callback('Done')` ko'rinishida chaqirib natijani qaytaring. Yo'q bo'lsa undefined.",
      startingCode: "function executeCallback(callback) {\n  // kodni bu yerda yozing\n}",
      hint: "callback?.('Done')",
      solution: "function executeCallback(callback) {\n  return callback?.('Done');\n}",
      test: "const fn = new Function(code + '; return executeCallback;')(); if (fn(x => x) !== 'Done' || fn() !== undefined) throw new Error('Test failed');"
    },
    {
      id: 8,
      title: "Dinamik kalit bilan optional chaining",
      instruction: "`obj` obyekti va dinamik `key` berilgan. Obyekt ichidan shu kalitdagi xususiyatning `value`sini oling. `obj?.[key]?.value`",
      startingCode: "function getDynamicValue(obj, key) {\n  // kodni bu yerda yozing\n}",
      hint: "obj?.[key]?.value",
      solution: "function getDynamicValue(obj, key) {\n  return obj?.[key]?.value;\n}",
      test: "const fn = new Function(code + '; return getDynamicValue;')(); if (fn({item: {value: 42}}, 'item') !== 42 || fn({}, 'item') !== undefined) throw new Error('Test failed');"
    },
    {
      id: 9,
      title: "Massivning oxirgi elementi null/undefined bo'lsa",
      instruction: "Berilgan massivning oxirgi elementini (massiv[massiv.length - 1]) oling. Agar massiv umuman berilmagan (null) bo'lsa yoki bo'sh bo'lsa, zaxira sifatida -1 qaytaring.",
      startingCode: "function getLastItem(arr) {\n  // kodni bu yerda yozing\n}",
      hint: "arr?.[arr.length - 1] ?? -1",
      solution: "function getLastItem(arr) {\n  return arr?.[arr.length - 1] ?? -1;\n}",
      test: "const fn = new Function(code + '; return getLastItem;')(); if (fn([10, 20]) !== 20 || fn(null) !== -1 || fn([]) !== -1) throw new Error('Test failed');"
    },
    {
      id: 10,
      title: "Dom elementi xususiyati",
      instruction: "`element` nomli obyekt beriladi (DOM element farazida). Uning `element.dataset.id` qiymatini oling. Agar zanjirda uzilish bo'lsa, 'default-id' qaytaring.",
      startingCode: "function getElementId(element) {\n  // kodni bu yerda yozing\n}",
      hint: "element?.dataset?.id ?? 'default-id'",
      solution: "function getElementId(element) {\n  return element?.dataset?.id ?? 'default-id';\n}",
      test: "const fn = new Function(code + '; return getElementId;')(); if (fn({dataset: {id: '123'}}) !== '123' || fn(null) !== 'default-id') throw new Error('Test failed');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Optional Chaining (`?.`) operatorining asosiy vazifasi nima?",
      options: ["TypeError bermasdan xavfsiz o'qish (undefined qaytaradi)", "Avtomatik qiymat tayinlash", "Massivni tartiblash", "Sintaktik xatolarni topish"],
      correctAnswer: 0,
      explanation: "U null yoki undefined ga yetib borganda zanjirni to'xtatadi va TypeError o'rniga undefined qaytaradi."
    },
    {
      id: 2,
      question: "`??` va `||` farqi?",
      options: ["Ular bir xil ishlaydi", "`??` faqat null va undefined da ishlaydi, `||` esa barcha falsy qiymatlarda", "`||` asinxron ishlaydi", "`??` faqat stringlar bilan ishlaydi"],
      correctAnswer: 1,
      explanation: "Nullish coalescing (??) faqat aniq null yoki undefined holatlariga (nullish) mos tushadi, || esa qolgan falsy (0, false, '') ga ham ishlaydi."
    },
    {
      id: 3,
      question: "Quyidagining natijasi nima: `null ?? 10` ?",
      options: ["null", "undefined", "10", "TypeError"],
      correctAnswer: 2,
      explanation: "Chap tomon null bo'lgani uchun o'ng tomondagi 10 olinadi."
    },
    {
      id: 4,
      question: "Quyidagining natijasi nima: `0 || 10` ?",
      options: ["0", "10", "null", "undefined"],
      correctAnswer: 1,
      explanation: "0 qiymati `||` uchun falsy (yolg'on) sanaladi va zaxira 10 olinadi."
    },
    {
      id: 5,
      question: "Quyidagining natijasi nima: `0 ?? 10` ?",
      options: ["0", "10", "null", "undefined"],
      correctAnswer: 0,
      explanation: "0 falsy bo'lsa ham null yoki undefined emas. Shuning uchun o'zi qoladi (0)."
    },
    {
      id: 6,
      question: "Funksiyani optional zanjir bilan qanday chaqirish mumkin?",
      options: ["obj.method?()", "obj.method?.()", "obj.?method()", "obj.method()?"],
      correctAnswer: 1,
      explanation: "Funksiyani xavfsiz chaqirish sintaksisi: method?.()"
    },
    {
      id: 7,
      question: "Massiv elementiga xavfsiz qanday murojaat qilinadi?",
      options: ["arr?[0]", "arr[0]?", "arr?.[0]", "?arr[0]"],
      correctAnswer: 2,
      explanation: "Massiv elementlari yoki dinamik kalitlar (bracket notation) uchun `?.[...]` ishlatiladi."
    },
    {
      id: 8,
      question: "Qiymat yozishda (assigning) `?.` ishlatsak bo'ladimi? (Masalan `user?.name = 'Ali'`)",
      options: ["Ha, xavfsiz yozadi", "Yo'q, SyntaxError beradi", "Faqat arraylarda ishlatsa bo'ladi", "Ha, ishlaydi"],
      correctAnswer: 1,
      explanation: "Optional chaining faqat o'qish/chaqirish uchun mavjud. Unga qandaydir qiymat ta'minlash sintaktik jihatdan taqiqlangan."
    },
    {
      id: 9,
      question: "Qaysi xatolikdan optional chaining himoya qila olmaydi?",
      options: ["Cannot read property of undefined", "Cannot read property of null", "ReferenceError (o'zgaruvchi umuman e'lon qilinmagan)", "Barchasidan himoya qiladi"],
      correctAnswer: 2,
      explanation: "Agar o'zgaruvchi umuman mavjud bo'lmasa (masalan let a; deb e'lon qilinmagan bo'lsa), unga nisbatan qilingan a?.b ReferenceError beradi."
    },
    {
      id: 10,
      question: "`undefined ?? undefined ?? 5` qanday natija qaytaradi?",
      options: ["5", "undefined", "TypeError", "null"],
      correctAnswer: 0,
      explanation: "Nullish zanjiri bo'ylab yurganda ikkita undefined ni o'tkazib yuborib oxiridagi qiymatni, 5 ni oladi."
    },
    {
      id: 11,
      question: "`false ?? true` natijasi nima?",
      options: ["false", "true", "null", "undefined"],
      correctAnswer: 0,
      explanation: "Chap qism `false`. U nullish emas. Shuning uchun chap qism, ya'ni `false` ning o'zi qaytadi."
    },
    {
      id: 12,
      question: "Qaysi paytda `null ?? 0 || 5` dan 5 qaytadi?",
      options: ["Xato beradi", "null ?? 0 o'zidan 0 chiqaradi, keyin 0 || 5 ifodasi 5 ni chiqaradi", "Har doim 0 qaytadi", "SyntaxError yuz beradi"],
      correctAnswer: 3,
      explanation: "`??` va `||` ni qavssiz aralashtirib yozish JavaScriptda taqiqlangan (SyntaxError). Oldin qaysi biri bajarilishini guruhlash uchun qavs kerak: (null ?? 0) || 5"
    }
  ]
};

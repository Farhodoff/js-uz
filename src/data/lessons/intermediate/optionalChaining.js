export const optionalChaining = {
  id: "optional-chaining",
  title: "Optional Chaining & Nullish Coalescing",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, siz ko'p qavatli ofis binosidasiz. Sizga "HR bo'limining boshlig'ini xonasi" kerak. Lekin siz HR bo'limi umuman bor yoki yo'qligini, yoki boshliq ishga kelgan-kelmaganini bilmaysiz. 

Oddiy holatda siz har bir eshikni ochib tekshirishingiz kerak bo'lardi. Agar HR bo'limi yo'q bo'lsa va siz to'g'ridan-to'g'ri uning ichidagi boshliq xonasini qidirsangiz, siz "devorga urilasiz" (dasturlashda bu qizil ekran, ya'ni \\\`TypeError\\\` xatosi). 

**Optional Chaining (\\\`?.\\\`)** - bu xudbin bo'lmagan xavfsizlik xizmati. Siz undan: "Iltimos, agar bino ichida HR bo'limi bo'lsa va u yerda boshliq bo'lsa, xonasini ko'rsat" deysiz. Agar zanjirning biron bir qismi yo'q bo'lsa (\\\`null\\\` yoki \\\`undefined\\\`), u sizga xato bermaydi, shunchaki xotirjamlik bilan: "Afsuski, u yo'q ekan (\\\`undefined\\\`)" deb javob qaytaradi.

**Nullish Coalescing (\\\`??\\\`)** esa - zaxira rejangiz. "Agar HR boshlig'i yo'q bo'lsa, oddiy menejer bilan gaplashaman". Bu faqat qiymat \\\`null\\\` yoki \\\`undefined\\\` bo'lgan holatdagina ishlaydigan xavfsizlik yostig'idir.

## 2. 🔬 Chuqur O'rganish (Under the hood, memory, V8 engine, performance)

### ⚙️ V8 Dvigateli (Under the hood)
JavaScript dvigateli (masalan, Google Chrome'dagi V8) Optional Chaining ni qanday tushunadi? 
Kodni oddiy \\\`&&\\\` zanjirlari orqali yozganimizda, dvigatel har bir qadamda qiymatni to'liq "truthy" yoki "falsy" ekanligiga tekshiradi. Bu ko'p operatsiyalarni talab qiladi.
Optional chaining (\\\`?.\\\`) ishlatilganda esa, kod AST (Abstract Syntax Tree) da qisqaroq ko'rinishda kompilyatsiya qilinadi. V8 uning to'g'ridan-to'g'ri "Nullish" (\\\`null\\\` yoki \\\`undefined\\\`) bo'lish-bo'lmasligini tekshiradigan yagona operatsiyani amalga oshiradi (Strict Equality: \\\`val === null || val === undefined\\\`).

### ⚡ Performans va Xotira (Performance & Memory)
Ko'pgina dasturchilar Optional Chaining sekinroq deb o'ylashadi, lekin aslida zamonaviy JIT (Just-In-Time) kompilyatorlar uni shu qadar optimallashtirganki, tezlik borasida farq deyarli nolga teng. Xotira nuqtai nazaridan, bu zanjir bitta vaqtinchalik xotira pointeri bilan ishlaydi. Qachonki qiymat \\\`undefined\\\` bo'lsa, zanjir "qisqa tutashuv" (short-circuiting) yuzaga keltirib, qolgan kodni umuman bajarmaydi, bu esa CPU sikllarini tejaydi.

### 🧩 Lexical Environment va Short-Circuiting
Optional Chaining orqali metodlarni chaqirishda ham qiziq holat bor: \\\`user.getDetails?.()\\\`. Agar \\\`user.getDetails\\\` mavjud bo'lmasa, dvigatel argumentlarni baholashni ham to'xtatadi. Masalan: \\\`obj.func?.(hechQachonIshlamaydiganFunksiya())\\\`. Bu yerda \\\`func\\\` yo'q bo'lsa, qavs ichidagi og'ir funksiya umuman ishga tushmaydi!

## 3. ⚠️ Chekka Holatlar va Senior Intervyu Savollari (Edge Cases)

**1. Dinamik xususiyatlarga murojaat qilish**
Siz array yoki dinamik obyekt kalitlari bilan ham optional chaining ishlatishingiz mumkin:
\\\`\\\`\\\`javascript
const key = "name";
const val = user?.[key]; // Bracket notation bilan to'g'ri
const firstUser = users?.[0]; // Massivlarda
\\\`\\\`\\\`

**2. \\\`document.all\\\` anomal holati**
Qadimgi meros qolgan xususiyatlardan biri bo'lgan \\\`document.all\\\` aslida obyekt, ammo \\\`typeof document.all === 'undefined'\\\` qaytaradi. Optional chaining uni \\\`nullish\\\` deb hisoblaydimi? Yo'q, sababi garchi qoida bo'yicha \\\`undefined\\\` ga o'xshasa ham, V8 uni maxsus holat sifatida "truthy" emas, lekin qiymati bor deb taniydi, shuning uchun \\\`document.all?.length\\\` qiymat qaytaradi!

**3. Qiymat biriktirish mumkin emas! (Syntax Error)**
Optional Chaining faqat ma'lumotni o'qish (read-only) uchun ishlatiladi. Unga qandaydir qiymat biriktirish ilojsiz:
\\\`\\\`\\\`javascript
user?.name = "Ali"; // ❌ SYNTAX ERROR! Invalid left-hand side in assignment
\\\`\\\`\\\`

**4. O'zgaruvchining o'zi yo'q bo'lsa nima bo'ladi?**
Optional Chaining obyekt ichidagi xususiyatlar uchun xavfsiz. Ammo o'zgaruvchi umuman e'lon qilinmagan bo'lsa xato beradi:
\\\`\\\`\\\`javascript
// "user" e'lon qilinmagan (let, const yoki var orqali)
user?.name; // ❌ ReferenceError: user is not defined
\\\`\\\`\\\`

## 📊 Arxitektura va Mantiq Diagrammasi
\\\`\\\`\\\`mermaid
graph TD
    Start[Object Property Access] --> Check{Is left part nullish?}
    Check -- Yes --> ReturnUndefined[Return undefined immediately]
    Check -- No --> CheckMethod{Is it a function call?}
    CheckMethod -- Yes --> Exec[Execute Function & Return]
    CheckMethod -- No --> NextProperty[Go deeper into object]
    NextProperty --> Start
    
    ReturnUndefined --> Coalescing{Use ?? Operator?}
    Coalescing -- Yes --> Fallback[Return Right Side Fallback Value]
    Coalescing -- No --> FinalUndefined[Final result: undefined]
\\\`\\\`\\\`
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

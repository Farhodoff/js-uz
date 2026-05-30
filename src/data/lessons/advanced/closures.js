export const closuresLesson = {
  id: "closures",
  title: "Closures: Funksiyalarning 'Eslab Qolish' Qobiliyati",
  level: "Murakkab",
  description: "Closure kontseptsiyasi: Lexical Environment, Private o'zgaruvchilar, va Real hayot misollar.",
  theory: `
# Closures — Nima uchun kerak?

JavaScriptda o'zgaruvchilarni himoya qilish va ularni tashqaridan o'zgartirib bo'lmaydigan holatga keltirish (inkapsulyatsiya) juda muhim. **Closure (Yopiq muhit)** funksiyalarga o'zlari yaratilgan joydagi tashqi o'zgaruvchilarni eslab qolish imkonini beradi.

## 1. NEGA kerak?
Tasavvur qiling, sizga o'yin uchun ochko hisoblagich (counter) kerak. Agar siz \\\`points\\\` o'zgaruvchisini global qilib e'lon qilsangiz, istalgan boshqa kod uni buzishi yoki o'zgartirib yuborishi mumkin. Closure yordamida esa \\\`points\\\` o'zgaruvchisini funksiya ichiga yashirib (private qilib), faqat maxsus funksiyalar orqali unga kirish huquqini bera olamiz.

## 2. SODDALIK (Analogiya)
Buni xuddi "xazinachining seyfi" kabi tasavvur qiling:
Seyf ichidagi pullar (private o'zgaruvchilar) tashqi odamlarga ko'rinmaydi va ularga to'g'ridan-to'g'ri tegib bo'lmaydi. Seyfga faqat xazinachi (ichki funksiya) tegishi mumkin. Siz xazinachiga "Pul qo'sh" yoki "Pulni ol" deb topshiriq berasiz, u esa seyfni ochib amalni bajaradi. Siz seyfni o'zini ko'ra olmaysiz, faqat xazinachi orqali ish bitirasiz.

## 3. STRUKTURA

### A. Lexical Environment (Leksik muhit)
Har bir funksiya yaratilayotganda o'z atrofidagi o'zgaruvchilarga ishorani saqlab qoladi.

\\\`\\\`\\\`mermaid
graph TD
    subgraph Global_Scope [Global Scope]
        myFunc["myFunc = outer()"]
    end
    subgraph Outer_Function_Scope [Outer Function Scope]
        outerVar["let outerVar = 'Men tashqaridanman'"]
        subgraph Inner_Function_Scope [Inner Function Scope]
            inner["inner() funksiyasi"]
            innerVar["console.log(outerVar)"]
        end
    end
    innerVar -.-> |eslab qoladi| outerVar
    myFunc -.-> |ishora qiladi| inner
\\\`\\\`\\\`

\\\`\\\`\\\`javascript
function outer() {
  let outerVar = "Men tashqaridanman";
  
  function inner() {
    console.log(outerVar); // outerVar-ni eslab qoladi!
  }
  return inner;
}
const myFunc = outer();
myFunc(); // → "Men tashqaridanman"
\\\`\\\`\\\`

### B. Private o'zgaruvchilar yaratish
Tashqaridan o'zgaruvchini to'g'ridan-to'g'ri o'zgartirib bo'lmaydi:
\\\`\\\`\\\`javascript
function createCounter() {
  let count = 0; // Private o'zgaruvchi
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; }
  };
}
const counter = createCounter();
console.log(counter.increment()); // → 1
// console.log(count); // → ReferenceError (count topilmadi)
\\\`\\\`\\\`

### C. Function Factory (Funksiyalar zavodi)
Bir xil qolip yordamida turli xil qiymatlarni eslab qoluvchi funksiyalar yaratish.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1.  **Loop ichida \\\`var\\\` ishlatish:** \\\`var\\\` function-scoped bo'lgani uchun loop ichida asinxron timerlar bilan closure yaratganda kutilmagan natijalar beradi. Buning yechimi \\\`let\\\` ishlatishdir.
2.  **Memory Leak (Xotira to'lib ketishi):** Agar keraksiz closure-larni xotirada saqlab turaversak va ularni hech qachon \\\`null\\\` qilmasak, ular Garbage Collector (axlat yig'uvchi) tomonidan o'chirilmaydi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Closure nima?**
Funksiyaning o'zi yaratilgan atrof-muhitni (Lexical Environment) eslab qolish qobiliyati.

**2. Lexical Environment nima?**
Kod yozilgan vaqtda o'zgaruvchilar va funksiyalarning joylashuvi va ularning bir-biriga bog'liqlik chegarasi.

**3. Tashqi funksiya bajarilib bo'lingach, uning ichidagi o'zgaruvchilar o'chadimi?**
Yo'q, agar ularga ichki funksiya tomonidan murojaat saqlanib qolgan bo'lsa, ular xotirada yashashda davom etadi.

**4. Closure tezlikka qanday ta'sir qiladi?**
Closure xotirada qo'shimcha joy egallaydi. Keraksiz joylarda ko'p foydalanish xotirani to'ldirib yuborishi mumkin.

**5. IIFE nima uchun ishlatilgan?**
Eski JS-da o'zgaruvchilar global doiraga chiqib ketmasligi uchun vaqtincha closure scope yaratishda foydalanilgan.

**6. Function Factory nima?**
Boshqa bir funksiyani ma'lum bir parametr bilan sozlangan holda qaytaradigan funksiya.

**7. Private variable nima?**
Faqatgina ma'lum bir funksiya yoki obyekt ichida o'qilishi/yozilishi mumkin bo'lgan, tashqaridan yopiq o'zgaruvchi.

**8. Scope chain nima?**
O'zgaruvchilarni topish uchun interpretatorning eng ichki scopedan boshlab to eng global scopegacha qidirish zanjiri.

**9. Closure faqat funksiya qaytarilgandagina sodir bo'ladimi?**
Yo'q, har qanday ichki funksiya tashqi o'zgaruvchidan foydalansa closure yuz beradi (masalan, event listener yoki callbacklarda).

**10. Garbage Collector closureni qachon o'chiradi?**
Qaytarilgan ichki funksiyaga bo'lgan barcha references (ishoralar) yo'qolganidan keyin.

**11. Closure yordamida qanday qilib singleton pattern yaratish mumkin?**
IIFE va closure yordamida faqat bir marta ishga tushib bitta obyekt qaytaradigan funksiya yozish orqali.

**12. Nega loopda let ishlatilganda closure to'g'ri ishlaydi?**
Chunki \\\`let\\\` block-scoped bo'lib, har bir iteratsiya (sikl aylanishi) uchun alohida o'zgaruvchi yaratadi.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Private Counter (Boshlang'ich)",
      instruction: "createCounter funksiyasi 'count'ni saqlab qolsin va oshirsin.",
      startingCode: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c = createCounter();",
      hint: "Ichki funksiya 'count'ni eslab qoladi.",
      test: "if (c() === 1 && c() === 2) return null; return 'Xato!';"
    },
    {
      id: 2,
      title: "2️⃣ Salomlashish generatori (Boshlang'ich)",
      instruction: "makeGreeting funksiyasini yozing, u greeting parametrini (masalan, 'Salom') eslab qoladi va name parametrini oladigan hamda 'greeting, name' stringini qaytaradigan yangi funksiya qaytaradi.",
      startingCode: "function makeGreeting(greeting) {\n  // Kodni shu yerda yozing\n}",
      hint: "return function(name) { return greeting + ', ' + name; };",
      test: "const welcome = makeGreeting('Salom'); if (welcome && typeof welcome === 'function' && welcome('Ali') === 'Salom, Ali') return null; return 'makeGreeting to\\'g\\'ri string qaytarmadi';"
    },
    {
      id: 3,
      title: "3️⃣ Secret Holder (Boshlang'ich)",
      instruction: "createSecretHolder funksiyasini yozing, u secret qiymatini yashiradi va ikkita metodli obyekt qaytaradi: getSecret() va setSecret(val).",
      startingCode: "function createSecretHolder(secret) {\n  // Kodni shu yerda yozing\n}",
      hint: "return { getSecret: () => secret, setSecret: (val) => { secret = val; } };",
      test: "const holder = createSecretHolder('top-secret'); if (holder && typeof holder.getSecret === 'function' && holder.getSecret() === 'top-secret') { holder.setSecret('new'); if (holder.getSecret() === 'new') return null; } return 'Metodlar secretni to\\'g\\'ri saqlay olmadi';"
    },
    {
      id: 4,
      title: "4️⃣ Multiplier Factory (Boshlang'ich)",
      instruction: "createMultiplier funksiyasi factor sonini oladi va boshqa sonni factorga ko'paytiradigan funksiya qaytaradi.",
      startingCode: "function createMultiplier(factor) {\n  // Kodni shu yerda yozing\n}",
      hint: "return (num) => num * factor;",
      test: "const double = createMultiplier(2); if (double && double(5) === 10) return null; return 'Multiplier factorga to\\'g\\'ri ko\\'paytirmadi';"
    },
    {
      id: 5,
      title: "5️⃣ Sodda Memoize (O'rta)",
      instruction: "memoizeDouble funksiyasi closure yordamida natijalarni cache obyektida saqlasin. Agar bir xil raqam uzatilsa, natijani keshdan qaytarsin.",
      startingCode: "function memoizeDouble() {\n  const cache = {};\n  return (num) => {\n    // Kodni yozing\n  };\n}",
      hint: "if (num in cache) return cache[num]; cache[num] = num * 2; return cache[num];",
      test: "const memo = memoizeDouble(); if (memo(5) === 10 && memo(5) === 10) return null; return 'Memoize xato ishlamoqda';"
    },
    {
      id: 6,
      title: "6️⃣ Cheklangan chaqiruvchi (Once) (O'rta)",
      instruction: "once funksiyasini yozing. U berilgan fn funksiyasini faqat bir marta chaqirishga ruxsat beradi. Keyingi safar chaqirilganda birinchi safargi natijani qaytarsin.",
      startingCode: "function once(fn) {\n  let called = false;\n  let result;\n  return function(...args) {\n    // Kodni yozing\n  };\n}",
      hint: "if (!called) { called = true; result = fn(...args); } return result;",
      test: "let cnt = 0; const run = once(() => ++cnt); run(); run(); if (cnt === 1) return null; return 'Funksiya faqat bir marta ishga tushishi kerak edi';"
    },
    {
      id: 7,
      title: "7️⃣ Parol validator (O'rta)",
      instruction: "makePasswordValidator funksiyasini yozing. U correctPassword qiymatini yashirin saqlaydi va kiritilgan parolni tekshirib true/false qaytaradigan validator funksiya beradi.",
      startingCode: "function makePasswordValidator(correctPassword) {\n  // Kodni yozing\n}",
      hint: "return (pass) => pass === correctPassword;",
      test: "const val = makePasswordValidator('secret'); if (val('wrong') === false && val('secret') === true) return null; return 'Validator xato ishladi';"
    },
    {
      id: 8,
      title: "8️⃣ Yig'uvchi (Accumulator) (O'rta)",
      instruction: "createAccumulator funksiyasini yozing. U boshlang'ich sum qiymatini oladi va har safar chaqirilganda sum-ga berilgan argumentni qo'shib joriy sum-ni qaytaradi.",
      startingCode: "function createAccumulator(initialValue = 0) {\n  // Kodni yozing\n}",
      hint: "let sum = initialValue; return (val) => { sum += val; return sum; };",
      test: "const acc = createAccumulator(10); if (acc(5) === 15 && acc(5) === 20) return null; return 'Accumulator summani noto\\'g\\'ri hisobladi';"
    },
    {
      id: 9,
      title: "9️⃣ Prefixli Logger (Qiyin)",
      instruction: "createLogger funksiyasini yozing. U prefix qabul qilib, 'log(message)' chaqirilganda '[prefix]: message' formatidagi stringni qaytaruvchi funksiya bersin.",
      startingCode: "function createLogger(prefix) {\n  // Kodni yozing\n}",
      hint: "return (msg) => `[${prefix}]: ${msg}`;",
      test: "const info = createLogger('INFO'); if (info('Ok') === '[INFO]: Ok') return null; return 'Logger formati noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "🔟 Bank hisobi simulyatori (Qiyin)",
      instruction: "createBankAccount funksiyasi balance qiymatini saqlab qoladi va deposit(amount) hamda withdraw(amount) funksiyalariga ega bo'lgan obyekt qaytaradi. withdraw funksiyasi balansdan ko'p yechmoqchi bo'lsa 'Mablag\\' yetarli emas' deb qaytarsin.",
      startingCode: "function createBankAccount(initialBalance) {\n  let balance = initialBalance;\n  // Kodni yozing\n}",
      hint: "return { deposit(amt) { balance += amt; return balance; }, withdraw(amt) { if (amt > balance) return 'Mablag\\' yetarli emas'; balance -= amt; return balance; } };",
      test: "const acct = createBankAccount(100); acct.deposit(50); if (acct.withdraw(200) === 'Mablag\\' yetarli emas' && acct.withdraw(50) === 100) return null; return 'Bank hisobi simulyatsiyasi xato';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Stepper funksiyasi (Qiyin)",
      instruction: "createStepper funksiyasini yozing, u step parametrini oladi va ichki count qiymatini step ga oshirib qaytaruvchi funksiya qaytaradi.",
      startingCode: "function createStepper(step) {\n  // Kodni yozing\n}",
      hint: "let count = 0; return () => { count += step; return count; };",
      test: "const st = createStepper(5); if (st() === 5 && st() === 10) return null; return 'Stepper hisobi noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Savat tizimi (Eng Qiyin)",
      instruction: "createCart funksiyasini yozing. U ichki items massivini saqlaydi va addItem(item), getItems(), va getTotalPrice() metodlari bo'lgan obyekt qaytaradi.",
      startingCode: "function createCart() {\n  const items = [];\n  // Kodni yozing\n}",
      hint: "return { addItem(i) { items.push(i); }, getItems() { return items; }, getTotalPrice() { return items.reduce((s, i) => s + i.price, 0); } };",
      test: "const cart = createCart(); cart.addItem({ price: 10 }); cart.addItem({ price: 5 }); if (cart.getItems().length === 2 && cart.getTotalPrice() === 15) return null; return 'Savat to\\'g\\'ri ishlamadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nfunction make() {\n  let x = 0;\n  return () => x++;\n}\nconst f1 = make();\nconst f2 = make();\nconsole.log(f1(), f1(), f2());\n```",
      options: ["0 1 2", "0 1 0", "1 2 1", "0 0 0"],
      correctAnswer: 1,
      explanation: "Har bir `make()` chaqirilganda yangi mustaqil scope yaratiladi. f1 o'z x-ni 0 dan 1 ga oshiradi, f2 esa yangi 0 dan boshlaydi."
    },
    {
      id: 2,
      question: "Closure funksiya tashqi o'zgaruvchini qanday saqlaydi?",
      options: [
        "O'zgaruvchining nusxasini (value) oladi",
        "O'zgaruvchining o'ziga ishorani (reference) saqlaydi",
        "Faqat o'zgarmas o'zgaruvchilarni saqlaydi",
        "Xotiraga saqlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Closure o'zgaruvchining qiymatini nusxalamaydi, balki o'sha o'zgaruvchi joylashgan Lexical Environment-ga ishorani saqlaydi. Shuning uchun tashqi o'zgaruvchi o'zgarsa, closure-da ham yangi qiymat ko'rinadi."
    },
    {
      id: 3,
      question: "Closure nima?",
      options: [
        "Funksiyaning o'zi e'lon qilingan muhitdagi o'zgaruvchilarni eslab qolish qobiliyati",
        "Funksiyaning sinxron ishlashini kafolatlaydigan mexanizm",
        "Global o'zgaruvchilarni butunlay o'chirib tashlash",
        "Funksiyaning o'zini o'zi qayta chaqirishi (rekursiya)"
      ],
      correctAnswer: 0,
      explanation: "Closure — bu funksiya o'zining leksik muhitini (Lexical Environment) eslab qolishi va tashqaridan chaqirilganda ham o'sha muhitdagi o'zgaruvchilarga kirish imkoniga ega bo'lishidir."
    },
    {
      id: 4,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```",
      options: [
        "`3, 3, 3`",
        "`0, 1, 2`",
        "`undefined, undefined, undefined`",
        "`TypeError`"
      ],
      correctAnswer: 0,
      explanation: "`var` kalit so'zi function-scoped bo'lganligi sababli, loop ichida bitta umumiy `i` o'zgaruvchisi ishlatiladi. `setTimeout` callback funksiyalari bajarilgunga qadar, loop allaqachon tugab bo'lgan va `i` ning qiymati 3 ga teng bo'ladi."
    },
    {
      id: 5,
      question: "Sikl ichidagi taymerlarda har bir qadamdagi qiymatni to'g'ri chiqarish uchun nima qilish kerak?",
      options: [
        "`var` o'rniga block-scoped `let` dan foydalanish yoki har bir iteratsiyada yangi closure yaratish",
        "Taymer kechikishini 0 ms qilish",
        "Taymer o'rniga `setInterval` ishlatish",
        "Loopni teskari aylantirish"
      ],
      correctAnswer: 0,
      explanation: "`let` block-scoped bo'lgani sababli, har bir iteratsiyada yangi `i` o'zgaruvchisi yaratiladi va asinxron funksiyalar tegishli qadamdagi `i` qiymatlarini to'g'ri eslab qoladi."
    },
    {
      id: 6,
      question: "Closure bilan bog'liq Memory Leak (Xotira muammosi) qachon yuzaga kelishi mumkin?",
      options: [
        "Closure funksiyalarga keraksiz ishoralar (references) xotirada uzoq vaqt saqlanib qolib, Garbage Collector tomonidan o'chirilmaganda",
        "Faqat kichik sonlar bilan ishlaganda",
        "Har safar arrow function ishlatilganda",
        "Hech qachon yuzaga kelmaydi"
      ],
      correctAnswer: 0,
      explanation: "Agar closure funksiyaga bo'lgan ishorani (reference) o'z vaqtida `null` qilib tozalamasak, u foydalanayotgan tashqi o'zgaruvchilar ham xotirada qoladi va xotira to'lib borishiga sabab bo'ladi."
    },
    {
      id: 7,
      question: "Lexical Environment (Leksik muhit) atamasi nimani anglatadi?",
      options: [
        "Kod yozilish jarayonida funksiyalar va o'zgaruvchilarning jismoniy joylashuvi hamda ularga kirish qoidalari",
        "JavaScript kodlarini bajaruvchi mashina (Engine) nomi",
        "Sinxron vazifalar navbati",
        "Dinamik xotira turi"
      ],
      correctAnswer: 0,
      explanation: "Leksik muhit — bu kod yozilayotgan paytda aniqlangan o'zgaruvchilar xaritasi bo'lib, funksiyalarning qayerda e'lon qilinganiga qarab ularning scope zanjirini belgilaydi."
    },
    {
      id: 8,
      question: "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nfunction multiplier(factor) {\n  return number => number * factor;\n}\nconst twice = multiplier(2);\nconsole.log(twice(5));\n```",
      options: [
        "`10`",
        "`5`",
        "`2`",
        "`NaN`"
      ],
      correctAnswer: 0,
      explanation: "`multiplier(2)` funksiyasi `factor = 2` qiymatini closure orqali eslab qolgan yangi funksiya qaytaradi. `twice(5)` esa 5 ni o'sha 2 ga ko'paytirib 10 qaytaradi."
    },
    {
      id: 9,
      question: "Closures mexanizmining eng asosiy amaliy foydasi nima?",
      options: [
        "Ma'lumotlarni inkapsulyatsiya qilish, ya'ni tashqi o'zgaruvchilarni private qilish va himoyalash",
        "Kodning ishlash tezligini keskin oshirish",
        "Sinxron kodlarni asinxron kodga aylantirish",
        "Global o'zgaruvchilar sonini ko'paytirish"
      ],
      correctAnswer: 0,
      explanation: "Closure yordamida o'zgaruvchilarni funksiya ichida yashirib, faqat maxsus ruxsat etilgan metodlar (getters/setters) orqali boshqarish mumkin."
    },
    {
      id: 10,
      question: "Quyidagi kodda `count` o'zgaruvchisiga to'g'ridan-to'g'ri tashqaridan kirish mumkinmi?\n```javascript\nfunction counter() {\n  let count = 0;\n  return () => count;\n}\n```",
      options: [
        "Yo'q, chunki u counter funksiyasi scopesida yashirilgan",
        "Ha, counter.count deb chaqirish orqali",
        "Ha, console.log(count) orqali",
        "Ha, agar count o'rniga global obyektdan foydalanilsa"
      ],
      correctAnswer: 0,
      explanation: "`count` o'zgaruvchisi funksiya ichida local ravishda e'lon qilingani sababli, unga tashqaridan to'g'ridan-to'g'ri murojaat qilish imkonsiz."
    },
    {
      id: 11,
      question: "Agar closure funksiyaga ishora qiluvchi o'zgaruvchiga `null` qiymati berilsa, uning ichidagi yashirilgan o'zgaruvchilar nima bo'ladi?",
      options: [
        "Ular Garbage Collector (axlat yig'uvchi) tomonidan xotiradan tozalab tashlanadi",
        "Ular avtomatik ravishda global o'zgaruvchilarga aylanadi",
        "Ular xotirada abadiy qoladi",
        "Dastur xatolik berib to'xtaydi"
      ],
      correctAnswer: 0,
      explanation: "Agar closure funksiyaga boshqa hech qanday reference qolmasa, u foydalanayotgan xotira sohasi kerakmas deb topiladi va Garbage Collector tomonidan bo'shatiladi."
    },
    {
      id: 12,
      question: "IIFE (Immediately Invoked Function Expression) nima maqsadda ishlatiladi?",
      options: [
        "O'zgaruvchilarni global scope-ga tarqalib ketishidan himoya qilish va darhol Microsoft scope yaratish uchun",
        "Sikl bajarilishini tezlashtirish uchun",
        "Sinxron operatsiyalarni boshqarish uchun",
        "Faqat matematik hisob-kitoblar uchun"
      ],
      correctAnswer: 0,
      explanation: "IIFE yordamida funksiya e'lon qilinishi bilanoq darhol ishga tushadi va uning ichidagi o'zgaruvchilar global muhitni ifloslantirmasdan, private holatda qoladi."
    }
  ]
};
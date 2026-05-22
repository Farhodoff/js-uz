export const symbolsGenerators = {
  id: "symbols-generators",
  title: "Symbols, Iterators va Generators",
  theory: `## 1. NEGA kerak?
JavaScriptda obyektlar kalitlari har doim matn (string) bo'lgan. Ammo yirik loyihalarda kutubxonalar va tashqi kodlar obyektlarimizga xatolik bilan bir xil nomli kalitlar yozib yuborishi va mavjud ma'lumotlarni o'chirib yuborishi mumkin edi. Buning oldini olish uchun mutlaqo takrorlanmas kalit turi — **Symbol** joriy qilindi. 

Obyektlar ichidagi ma'lumotlarni tartibli varaqlash (aylanib chiqish) uchun esa **Iterators** va ularni juda oson yozish va asinxron oqimlarni to'xtatib-davom ettirish uchun **Generators** yaratildi.

## 2. SODDALIK (Analogiya)
* **Symbol:** Bu xuddi davlat tomonidan berilgan **Passport ID** raqamiga o'xshaydi. Dunyoda ismingiz (kalit nomingiz) bir xil bo'lgan odamlar ko'p bo'lishi mumkin, lekin Passport ID raqamingiz mutlaqo takrorlanmas va faqat sizga tegishlidir.
* **Iterator:** Bu xuddi **kitob sahifasini bitta-bitta varaqlashga** o'xshaydi. Siz kitobni ochasiz va har safar varoqlaganingizda (\`next()\`) keyingi sahifani olasiz, kitob tugagach (\`done: true\`) to'xtaysiz.
* **Generator:** Bu xuddi **buyurtma berilganda pishadigan taomlar**ga o'xshaydi. Oshpaz taomni birdaniga hammasini stolga qo'ymaydi. Siz so'ragan paytda (\`yield\`) navbatdagi taomni pishirib beradi va buyurtmangiz tugaguncha kutib turadi.

## 3. STRUKTURA
1. **Symbols:** Primitiv o'zgarmas ma'lumot turi.
   \`\`\`javascript
   const sym1 = Symbol("desc");
   const sym2 = Symbol("desc");
   console.log(sym1 === sym2); // false
   \`\`\`
2. **Iterators:** \`next()\` metodi yordamida navbatdagi qiymatni \`{ value, done }\` ko'rinishida qaytaruvchi obyekt.
3. **Generators:** Maxsus \`function*\` yulduzcha bilan e'lon qilinadigan, ishlashini \`yield\` bilan to'xtata oladigan funksiya.

## 4. AMALIYOT (Mashqlar pastda)
Generator orqali sonlarni ketma-ketlikda olish namunasi:
\`\`\`javascript
function* numberGenerator() {
  yield 10;
  yield 20;
  yield 30;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 10, done: false }
console.log(gen.next().value); // 20
console.log(gen.next()); // { value: 30, done: false }
console.log(gen.next()); // { value: undefined, done: true }
\`\`\`

## 5. XATOLAR (Common mistakes)
- **Symbol'larni new kalit so'zi bilan yaratish:** Symbol konstruktor emas, shuning uchun \`new Symbol()\` yozish \`TypeError\` xatosini beradi. To'g'ri shakli: \`Symbol()\`.
- **Symbol'larni oddiy looplarda qidirish:** Obyekt ichidagi Symbol kalitlari \`for...in\` yoki \`Object.keys()\` orqali chiqmaydi. Ularni olish uchun maxsus \`Object.getOwnPropertySymbols(obj)\` ishlatiladi.
- **Generatorni qayta ishlata olmaslik:** Generator barcha \`yield\`larni bajarib bo'lgach (\`done: true\`), uni qayta o'qib bo'lmaydi. Yangidan aylanib chiqish uchun yangi generator instansiyasini yaratish kerak.

## 6. SAVOLLAR VA JAVOBLAR
**1. Global Symbol nima va uning farqi nimada?**
\`Symbol.for("key")\` yordamida global registrda ramz yaratiladi. Agar shu kalitli ramz oldin yaratilgan bo'lsa, mavjud bo'lganini qaytaradi.

**2. yield kalit so'zi nima qiladi?**
Generator funksiya ishini vaqtinchalik to'xtatib, tashqi tomonga qiymat yuboradi va keyingi \`next()\` chaqirilishini kutadi.

**3. return generator ichida ishlatilsa nima bo'ladi?**
Generator ishini darhol yakunlaydi, \`done\` ni \`true\` qiladi va \`value\` sifatida berilgan qiymatni qaytaradi.
`,
  exercises: [
    {
      id: 1,
      title: "Primitiv Symbol Yaratish",
      instruction: "Tavsifi 'id' bo'lgan yangi Symbol yarating va uni 'mySym' o'zgaruvchisiga saqlang.",
      startingCode: "// Kodni yozing\n",
      hint: "const mySym = Symbol('id');",
      test: "if (typeof mySym === 'symbol') return null; return 'mySym o\\'zgaruvchisi symbol emas';"
    },
    {
      id: 2,
      title: "Symbol Kalitli Obyekt Xossasi",
      instruction: "Berilgan 'user' obyektiga 'secretKey' nomli Symbol orqali '12345' qiymatini xossa sifatida qo'shing.",
      startingCode: "const secretKey = Symbol('secret');\nconst user = {};\n// Bu yerga kod yozing\n",
      hint: "user[secretKey] = '12345';",
      test: "if (user[secretKey] === '12345') return null; return 'Symbol kalitli xossa topilmadi';"
    },
    {
      id: 3,
      title: "Global Symbol.for()",
      instruction: "Global registrdan 'app.config' kaliti bilan symbol yarating va uni 'globalSym' o'zgaruvchisiga saqlang.",
      startingCode: "// Kodni yozing\n",
      hint: "const globalSym = Symbol.for('app.config');",
      test: "if (globalSym === Symbol.for('app.config')) return null; return 'Global symbol noto\\'g\\'ri yaratildi';"
    },
    {
      id: 4,
      title: "Symbol Xossalarini Yashirish",
      instruction: "Obyektdagi Symbol xossalar 'Object.keys()' orqali ko'rinmasligini tekshirish uchun user obyektining kalitlari sonini qaytaring.",
      startingCode: "const key = Symbol('id');\nconst user = { name: 'Ali', [key]: 99 };\n// user obyektining oddiy kalitlari sonini 'keysCount'ga saqlang\nconst keysCount = 0;\n",
      hint: "const keysCount = Object.keys(user).length;",
      test: "if (keysCount === 1) return null; return 'Keys count 1 bo\\'lishi kerak (Symbol yashirin qolishi shart)';"
    },
    {
      id: 5,
      title: "Sodda Maxsus Iterator",
      instruction: "1 dan 3 gacha sonlarni qaytaradigan custom iterator obyektini '[Symbol.iterator]' yordamida to'ldiring.",
      startingCode: "const counter = {\n  [Symbol.iterator]() {\n    let current = 1;\n    return {\n      next() {\n        // Kodni yozing\n      }\n    };\n  }\n};\n",
      hint: "return current <= 3 ? { value: current++, done: false } : { value: undefined, done: true };",
      test: "const vals = [...counter]; if (vals.join(',') === '1,2,3') return null; return 'Iterator 1 dan 3 gacha qaytarmadi';"
    },
    {
      id: 6,
      title: "Iteratorni Qo'lda Chaqirish",
      instruction: "Berilgan massiv iteratorini qo'lda chaqirib, birinchi element qiymatini 'firstValue'ga saqlang.",
      startingCode: "const arr = [100, 200];\nconst iterator = arr[Symbol.iterator]();\n// 'firstValue'ga iterator.next() orqali birinchi qiymatni oling\nconst firstValue = 0;\n",
      hint: "const firstValue = iterator.next().value;",
      test: "if (firstValue === 100) return null; return 'Birinchi qiymat 100 bo\\'lishi kerak';"
    },
    {
      id: 7,
      title: "Sodda Generator Funksiya",
      instruction: "Ketma-ketlikda 'Salom' va 'Dunyolar' so'zlarini yield qiladigan 'greetGenerator' funksiyasini yozing.",
      startingCode: "function* greetGenerator() {\n  // yield qo'shing\n}\n",
      hint: "yield 'Salom'; yield 'Dunyolar';",
      test: "const gen = greetGenerator(); if (gen.next().value === 'Salom' && gen.next().value === 'Dunyolar') return null; return 'Generator so\\'zlarni to\\'g\\'ri qaytarmadi';"
    },
    {
      id: 8,
      title: "Generator yordamida Range",
      instruction: "Berilgan 'start'dan 'end'gacha bo'lgan sonlarni yield qiluvchi 'rangeGenerator(start, end)' yozing.",
      startingCode: "function* rangeGenerator(start, end) {\n  // Kodni yozing\n}\n",
      hint: "for(let i=start; i<=end; i++) yield i;",
      test: "const vals = [...rangeGenerator(5, 8)]; if (vals.join(',') === '5,6,7,8') return null; return 'Range generator xato ishladi';"
    },
    {
      id: 9,
      title: "Cheksiz ID Generator",
      instruction: "1 dan boshlab har safar chaqirilganda ortib boruvchi ID qaytaradigan cheksiz 'idGenerator' funksiyasini yozing.",
      startingCode: "function* idGenerator() {\n  // Kodni yozing\n}\n",
      hint: "let id = 1; while(true) { yield id++; }",
      test: "const gen = idGenerator(); if (gen.next().value === 1 && gen.next().value === 2 && gen.next().value === 3) return null; return 'Cheksiz ID generator xato ishladi';"
    },
    {
      id: 10,
      title: "Generator yield* delegatsiyasi",
      instruction: "Boshqa generator yoki massiv ustidan delegatsiya qilish uchun 'yield*' operatorini ishlatib, 'mainGen' yarating.",
      startingCode: "function* innerGen() {\n  yield 'A';\n  yield 'B';\n}\nfunction* mainGen() {\n  // innerGen ustidan delegatsiya qiling\n}\n",
      hint: "yield* innerGen();",
      test: "const vals = [...mainGen()]; if (vals.join(',') === 'A,B') return null; return 'Delegatsiya amalga oshirilmadi';"
    },
    {
      id: 11,
      title: "Fibonachchi Generator",
      instruction: "Fibonachchi sonlar ketma-ketligini yield qiluvchi 'fibonacciGenerator()' yozing.",
      startingCode: "function* fibonacciGenerator() {\n  let [prev, curr] = [0, 1];\n  // Kodni yozing\n}\n",
      hint: "while(true) { yield curr; [prev, curr] = [curr, prev + curr]; }",
      test: "const gen = fibonacciGenerator(); if (gen.next().value === 1 && gen.next().value === 1 && gen.next().value === 2 && gen.next().value === 3) return null; return 'Fibonachchi generator xato ishladi';"
    },
    {
      id: 12,
      title: "Ikki tomonlama muloqot (next argument)",
      instruction: "Tashqi tomondan yuborilgan qiymatni qabul qilib, unga 2 ni ko'paytirib qaytaradigan generator yozing.",
      startingCode: "function* doubleInputGenerator() {\n  // yield orqali qiymat olib, 2 ko'paytiring\n  const input = 0;\n  yield input * 2;\n}\n",
      hint: "const input = yield; yield input * 2;",
      test: "const gen = doubleInputGenerator(); gen.next(); if (gen.next(10).value === 20) return null; return 'Ikki tomonlama muloqot xato ishladi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nconst sym1 = Symbol('app');\nconst sym2 = Symbol('app');\nconsole.log(sym1 === sym2);\n```",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "Symbol primitiv turi har doim mutlaqo takrorlanmas qiymat yaratadi. Tavsifi bir xil ('app') bo'lsa ham, ular xotirada har xil va bir-biriga teng bo'lmaydi."
    },
    {
      id: 2,
      question: "Obyektdagi Symbol xossalarini aylanib chiqish haqida qaysi fikr to'g'ri?",
      options: [
        "`for...in` loopi yordamida ularni ko'rish mumkin",
        "`Object.keys()` massivida Symbol kalitlari qaytariladi",
        "Ular oddiy qidiruvlardan yashirin qoladi va ularni faqat `Object.getOwnPropertySymbols()` orqali olish mumkin",
        "Symbol xossalarini umuman qayta o'qib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Obyektdagi Symbol kalitlari yashirin xususiyatlar hisoblanadi. Ular an'anaviy `for...in` va `Object.keys()` kabi metodlarda chiqmaydi. Buning uchun maxsus `Object.getOwnPropertySymbols(obj)` ishlatiladi."
    },
    {
      id: 3,
      question: "Generator funksiyasini bir marta to'liq ishlatib bo'lgach nima sodir bo'ladi?",
      options: [
        "U avtomatik ravishda yana 0-qadamdan boshlaydi",
        "Keyingi `next()` chaqiruvlari `{ value: undefined, done: true }` qaytaradi",
        "Xotira to'lib qolib xatolik beradi",
        "Funksiya kodi butunlay xotiradan o'chib ketadi"
      ],
      correctAnswer: 1,
      explanation: "Generator oxirgi yield yoki returnga yetib kelgach, uning holati tugallangan (`done: true`) hisoblanadi. Shundan so'ng generator instansiyasi qayta ishlamaydi va har safar `next()` chaqirilganda `{ value: undefined, done: true }` qaytadi."
    },
    {
      id: 4,
      question: "Ushbu generator chaqirilganda nima qaytaradi?\n```javascript\nfunction* gen() {\n  yield 5;\n}\nconsole.log(typeof gen());\n```",
      options: ["\"function\"", "\"number\"", "\"object\"", "\"generator\""],
      correctAnswer: 2,
      explanation: "Generator funksiya chaqirilganda uning ichki kodi darhol ishga tushmaydi, balki Iterator protokoli talabiga mos bo'lgan maxsus Generator Obyekti qaytadi. Shuning uchun uning turi `\"object\"` hisoblanadi."
    },
    {
      id: 5,
      question: "Quyidagi generator kodi konsolga nimalarni chiqaradi?\n```javascript\nfunction* numberGen() {\n  yield 1;\n  return 2;\n  yield 3;\n}\nconst g = numberGen();\nconsole.log(g.next().value, g.next().value, g.next().value);\n```",
      options: ["1 2 3", "1 2 undefined", "1 undefined undefined", "1 3 undefined"],
      correctAnswer: 1,
      explanation: "Generator ichida `return` operatori bajarilganda, u generator ishini darhol yakunlaydi va `{ value: returnedValue, done: true }` qaytaradi. `return`dan keyingi `yield 3` kodiga aslo yetib bormaydi, shuning uchun uchinchi next() chaqiruvi `undefined` beradi."
    },
    {
      id: 6,
      question: "Symbol.keyFor(sym) metodi nima qiladi?",
      options: [
        "Berilgan ramz uchun yangi kalit yaratadi",
        "Global registrdagi Symbol.for() bilan yaratilgan ramzning kalit nomini (string) qaytaradi",
        "Symbol tavsifini o'chirib tashlaydi",
        "Symbolni stringga o'zgartiradi"
      ],
      correctAnswer: 1,
      explanation: "`Symbol.keyFor(sym)` global Symbol registridan berilgan global ramzga tegishli kalit nomini topib qaytaradi. Oddiy local Symbollar uchun esa `undefined` beradi."
    },
    {
      id: 7,
      question: "Generator funksiyalarda yield* operatori nima vazifani bajaradi?",
      options: [
        "Generatorni zudlik bilan to'xtatadi va xatolik beradi",
        "Boshqa iteratsiya qilinadigan obyektga (yoki boshqa generatorga) iteratsiyani delegatsiya qiladi (o'tkazadi)",
        "Qiymatni kvadratga oshirib qaytaradi",
        "Faqat massivlarni qo'shish uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "`yield*` boshqa generator yoki har qanday iterable obyekt (massiv, string va h.k.) ustidan delegatsiya qilish uchun qo'llaniladi va ularning qiymatlarini ketma-ket yield qiladi."
    },
    {
      id: 8,
      question: "Obyektni for...of tsikli orqali aylanish uchun unda qaysi maxsus Symbol kaliti aniqlangan bo'lishi shart?",
      options: [
        "`Symbol.iterable`",
        "`Symbol.iterator`",
        "`Symbol.for('iterator')`",
        "`Symbol.toPrimitive`"
      ],
      correctAnswer: 1,
      explanation: "Obyekt iterable bo'lishi uchun unda `[Symbol.iterator]` nomli metod bo'lishi shart. Bu metod keyingi qiymatlarni qaytaruvchi iterator obyektini return qiladi."
    },
    {
      id: 9,
      question: "Generator funksiyasini qanday belgi bilan oddiy funksiyadan farqlash mumkin?",
      options: [
        "`function$`",
        "`function*`",
        "`function#`",
        "`function@`"
      ],
      correctAnswer: 1,
      explanation: "Generator funksiya `function* name() {}` yoki `function *name() {}` ko'rinishida yulduzcha (`*`) belgisi bilan e'lon qilinadi."
    },
    {
      id: 10,
      question: "Iteratorning next() metodi qanday formatdagi obyektni qaytaradi?",
      options: [
        "`[value, done]` ko'rinishidagi massiv",
        "`{ value: qiymat, done: boolean }` ko'rinishidagi obyekt",
        "Faqatgina o'sha qadamdagi qiymatni",
        "Hech qanday qiymat qaytarmaydi"
      ],
      correctAnswer: 1,
      explanation: "Iterator protokoli talabiga binoan, `next()` chaqirilganda doimo `{ value, done }` xossalariga ega obyekt qaytishi lozim. `done` qiymati oxirgi elementdan so'ng `true` bo'ladi."
    },
    {
      id: 11,
      question: "Generatorni oxirigacha ishlatib bo'lgandan so'ng, uni yangidan boshlash uchun nima qilish kerak?",
      options: [
        "`generator.reset()` metodini chaqirish kerak",
        "Yangi generator instansiyasini (chaqiruvini) yaratish kerak",
        "`generator.next(0)` yuborish kerak",
        "Buning umuman iloji yo'q, sahifani yangilash shart"
      ],
      correctAnswer: 1,
      explanation: "Tugallangan generatorni qayta ishlatib bo'lmaydi. Yangidan iteratsiya qilish uchun generator funksiyasini qaytadan chaqirib, yangi iterator obyekti olish kerak."
    },
    {
      id: 12,
      question: "Global ramz yaratish va unga qayta murojaat qilish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`Symbol.create()`",
        "`Symbol.for()`",
        "`Symbol.global()`",
        "`Symbol.registry()`"
      ],
      correctAnswer: 1,
      explanation: "`Symbol.for(key)` global registrdan berilgan kalitli ramzni qidiradi. Agar u yo'q bo'lsa, yangi yaratadi, agar bor bo'lsa, mavjudini qaytaradi."
    }
  ]
};

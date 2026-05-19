export const symbolsGenerators = {
  id: "symbols-generators",
  title: "Symbols, Iterators va Generators",
  theory: `## 1. KIRISH: Nega bu mavzu kerak?
JavaScriptda obyektlar kalitlari har doim matn (string) bo'lgan. Ammo yirik loyihalarda kutubxonalar va tashqi kodlar obyektlarimizga xatolik bilan bir xil nomli kalitlar yozib yuborishi va mavjud ma'lumotlarni o'chirib yuborishi mumkin edi. Buning oldini olish uchun mutlaqo takrorlanmas kalit turi — **Symbol** joriy qilindi.

Obyektlar ichidagi ma'lumotlarni tartibli varaqlash (aylanib chiqish) uchun esa **Iterators** va ularni juda oson yozish va asinxron oqimlarni to'xtatib-davom ettirish uchun **Generators** yaratildi.

---

## 2. SODDALIK (Analogiya)
* **Symbol:** Bu xuddi davlat tomonidan berilgan **Passport ID** raqamiga o'xshaydi. Dunyoda ismingiz (kalit nomingiz) bir xil bo'lgan odamlar ko'p bo'lishi mumkin, lekin Passport ID raqamingiz mutlaqo takrorlanmas va faqat sizga tegishlidir.
* **Iterator:** Bu xuddi **kitob sahifasini bitta-bitta varaqlashga** o'xshaydi. Siz kitobni ochasiz va har safar varoqlaganingizda (\`next()\`) keyingi sahifani olasiz, kitob tugagach (\`done: true\`) to'xtaysiz.
* **Generator:** Bu xuddi **buyurtma berilganda pishadigan taomlar**ga o'xshaydi. Oshpaz taomni birdaniga hammasini stolga qo'ymaydi. Siz so'ragan paytda (\`yield\`) navbatdagi taomni pishirib beradi va buyurtmangiz tugaguncha kutib turadi.

---

## 3. STRUKTURA (Asosiy Tushunchalar)

### A. Symbols
Symbols — JavaScriptning primitiv ma'lumot turi bo'lib, mutlaqo takrorlanmas qiymat yaratadi.
\`\`\`javascript
const sym1 = Symbol("tavsif");
const sym2 = Symbol("tavsif");
console.log(sym1 === sym2); // false (tavsifi bir xil bo'lsa ham)
\`\`\`

### B. Iterators (Iteratsiya protokoli)
Obyektni \`for...of\` yordamida aylanib chiqish uchun unda \`[Symbol.iterator]\` metodi bo'lishi kerak. Bu metod \`next()\` funksiyasini qaytaradi:
\`\`\`javascript
const myIterator = {
  data: [10, 20],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};
for (let val of myIterator) {
  console.log(val); // 10, keyin 20
}
\`\`\`

### C. Generators
Generator funksiyalar \`function*\` ko'rinishida e'lon qilinadi va bajarilishini \`yield\` orqali to'xtatib turishi mumkin. Ular chaqirilganda Iterator obyektini qaytaradi.
\`\`\`javascript
function* myGenerator() {
  yield 1;
  yield 2;
  return 3;
}
const gen = myGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: true }
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR (Edge Cases)
1. **Symbol'larni new kalit so'zi bilan yaratish:** Symbol konstruktor emas, shuning uchun \`new Symbol()\` yozish \`TypeError\` xatosini beradi. To'g'ri shakli: \`Symbol()\`.
2. **Symbol'larni oddiy looplarda qidirish:** Obyekt ichidagi Symbol kalitlari \`for...in\` yoki \`Object.keys()\` orqali chiqmaydi. Ularni olish uchun maxsus \`Object.getOwnPropertySymbols(obj)\` ishlatiladi.
3. **Generatorni qayta ishlata olmaslik:** Generator barcha \`yield\`larni bajarib bo'lgach (\`done: true\`), uni qayta o'qib bo'lmaydi. Yangidan aylanib chiqish uchun yangi generator instansiyasini yaratish kerak.

---

## 5. 12 TA SAVOL VA JAVOBLAR
<details>
<summary><b>1. Symbol nima va u qanday yaratiladi?</b></summary> Symbol — mutlaqo takrorlanmas va o'zgarmas primitiv qiymat turi. U Symbol() funksiyasi orqali yaratiladi.</details>

<details>
<summary><b>2. Symbol'ga berilgan tavsif nima vazifani bajaradi?</b></summary> Faqatgina debug jarayonida konsolda osonroq tushunish uchun kerak. Ikki bir xil tavsifli Symbol baribir bir-biriga teng bo'lmaydi.</details>

<details>
<summary><b>3. Global Symbol nima va uning farqi nimada?</b></summary> Symbol.for("key") yordamida global registrda ramz yaratiladi. Agar shu kalitli ramz oldin yaratilgan bo'lsa, mavjud bo'lganini qaytaradi.</details>

<details>
<summary><b>4. Nima uchun Symbol obyekt kaliti sifatida qulay?</b></summary> Chunki u obyekt ichidagi xususiyatlarni tashqi tomondan tasodifan o'zgartirib yoki o'chirib yuborish xavfini butunlay yo'q qiladi.</details>

<details>
<summary><b>5. Well-known Symbol deganda nima tushuniladi?</b></summary> Bular JS tizimining ichki xatti-harakatlarini boshqarish uchun ishlatiladigan maxsus standart ramzlar (masalan: Symbol.iterator, Symbol.toStringTag).</details>

<details>
<summary><b>6. Iterator nima va u qaysi metodga ega bo'lishi shart?</b></summary> Iterator — keyingi elementni taqdim qiluvchi obyekt. U next() metodiga ega bo'lishi shart, bu metod {value, done} shaklidagi obyekt qaytaradi.</details>

<details>
<summary><b>7. [Symbol.iterator] nima vazifani bajaradi?</b></summary> U obyektni iteratsiya qilinadigan (iterable) qiladi. Masalan, for...of tsikli ishlashi uchun obyektda shu metod bo'lishi shart.</details>

<details>
<summary><b>8. Generator funksiya oddiy funksiyadan qanday farq qiladi?</b></summary> Oddiy funksiya oxirigacha ishlaydi va bitta qiymat qaytaradi. Generator esa yield yordamida ishlashini xohlagancha to'xtatib-davom ettira oladi.</details>

<details>
<summary><b>9. yield kalit so'zi nima qiladi?</b></summary> Generator ishini vaqtinchalik to'xtatib, tashqi tomonga qiymat yuboradi va keyingi next() chaqirilishini kutadi.</details>

<details>
<summary><b>10. next() metodiga argument berish nima uchun kerak?</b></summary> Generatordagi oxirgi to'xtagan yield ifodasi o'rniga tashqi tomondan yangi qiymat yuborish (ikki tomonlama aloqa) uchun kerak.</details>

<details>
<summary><b>11. return generator ichida ishlatilsa nima bo'ladi?</b></summary> Generator ishini darhol yakunlaydi, done ni true qiladi va value sifatida berilgan qiymatni qaytaradi.</details>

<details>
<summary><b>12. Generator yordamida cheksiz sikllar yaratish xavflimi?</b></summary> Yo'q, chunki har bir qadam faqat next() chaqirilgandagina bajariladi, bu xotirani to'ldirib yubormaydi.</details>
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
      explanation: "Generator funksiya chaqirilganda uning ichki kodi darhol ishga tushmaydi, balki Iterator protokoli talablariga mos bo'lgan maxsus Generator Obyekti qaytadi. Shuning uchun uning turi `\"object\"` hisoblanadi."
    },
    {
      id: 5,
      question: "Quyidagi generator kodi konsolga nimalarni chiqaradi?\n```javascript\nfunction* numberGen() {\n  yield 1;\n  return 2;\n  yield 3;\n}\nconst g = numberGen();\nconsole.log(g.next().value, g.next().value, g.next().value);\n```",
      options: ["1 2 3", "1 2 undefined", "1 undefined undefined", "1 3 undefined"],
      correctAnswer: 1,
      explanation: "Generator ichida `return` operatori bajarilganda, u generator ishini darhol yakunlaydi va `{ value: returnedValue, done: true }` qaytaradi. `return`dan keyingi `yield 3` kodiga aslo yetib bormaydi, shuning uchun uchinchi next() chaqiruvi `undefined` beradi."
    }
  ]
};

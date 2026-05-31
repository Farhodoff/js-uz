export const symbolsGenerators = {
  id: "symbols-generators",
  title: "Symbols, Iterators va Generators",
  theory: `## 1. NEGA kerak?
JavaScriptda obyektlar kalitlari har doim matn (string) bo'lgan. Ammo yirik loyihalarda kutubxonalar va tashqi kodlar obyektlarimizga xatolik bilan bir xil nomli kalitlar yozib yuborishi va mavjud ma'lumotlarni o'chirib yuborishi (name collision) mumkin edi. Buning oldini olish uchun mutlaqo takrorlanmas kalit turi — **Symbol** joriy qilindi. 

Obyektlar ichidagi ma'lumotlarni tartibli varaqlash (aylanib chiqish) uchun **Iterators** protokoli va ularni juda oson yozish va asinxron oqimlarni to'xtatib-davom ettirish uchun esa **Generators** yaratildi.

## 2. SODDALIK (Analogiya)
* **Symbol:** Bu xuddi davlat tomonidan berilgan **Passport ID** raqamiga o'xshaydi. Dunyoda ismingiz (kalit nomingiz) bir xil bo'lgan odamlar ko'p bo'lishi mumkin, lekin Passport ID raqamingiz mutlaqo takrorlanmas va faqat sizga tegishlidir.
* **Iterator:** Bu xuddi **kitob sahifasini bitta-bitta varaqlashga** o'xshaydi. Siz kitobni ochasiz va har safar varoqlaganingizda (\`next()\`) keyingi sahifani olasiz, kitob tugagach (\`done: true\`) to'xtaysiz.
* **Generator:** Bu xuddi **navbat bilan xizmat ko'rsatadigan konveyerga** o'xshaydi. Har safar tugmani bosganingizda (\`next()\`), u bitta mahsulot ishlab chiqaradi (\`yield\`) va keyingi buyruqni kutib to'xtaydi.

## 3. CHUQUR MAVZULAR VA METODLAR

### A. Global Symbol Registry (\`Symbol.for\` va \`Symbol.keyFor\`)
Odatda \`Symbol()\` har chaqirilganda mutlaqo yangi ramz yaratadi. Agar biz butun dastur bo'yicha (hatto turli modullar, iFrame yoki scriptlar orasida) bir xil nomli yagona ramzdan foydalanmoqchi bo'lsak, **Global Symbol Registry**-dan foydalanamiz.

* \`Symbol.for(key)\`: Agar global registrdagi shu nomli ramz mavjud bo'lsa, uni qaytaradi. Aks holda, yangi yaratadi.
* \`Symbol.keyFor(sym)\`: Global registrdagi ramzning kalit nomini (string) qaytaradi. Agar ramz global bo'lmasa, \`undefined\` beradi.

\`\`\`javascript
const localSym = Symbol("auth");
const globalSym = Symbol.for("auth");

console.log(Symbol.keyFor(localSym)); // undefined (chunki u global registrdan emas)
console.log(Symbol.keyFor(globalSym)); // "auth"
\`\`\`

\`\`\`mermaid
graph TD
    A[Symbol yaratish] --> B(Local Symbol: Symbol'auth')
    A --> C(Global Symbol: Symbol.for'auth')
    B --> D[Har chaqirilganda yangi unikal qiymat]
    C --> E[Global registrdan qidiradi]
    E --> F{Kalit bormi?}
    F -- Ha --> G[Mavjud symbolni qaytaradi]
    F -- Yo'q --> H[Yangi symbol yaratib qaytaradi]
\`\`\`

### B. Well-known Symbols (Taniqli ramzlar)
JavaScript tizimining ichki operatsiyalari va xatti-harakatlarini o'zgartirish uchun foydalaniladigan maxsus tizimli ramzlar:
1. \`Symbol.iterator\`: Obyektni iterable (aylanuvchan) qilish uchun ishdatiladi. \`for...of\` sikli aynan shu ramz ostidagi metodni chaqiradi.
2. \`Symbol.toPrimitive\`: Obyektni primitiv turga (matn yoki son) aylantirish (coercion) qoidasini belgilaydi.
3. \`Symbol.toStringTag\`: \`Object.prototype.toString.call(obj)\` chaqirilganda qaytariladigan matn formatini o'zgartiradi (masalan, custom klasslar nomini chiroyli ko'rsatish uchun).

\`\`\`javascript
const user = {
  name: "Ali",
  money: 1000,
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return \`User: \${this.name}\`;
    if (hint === "number") return this.money;
    return this.money; // default holat
  }
};
console.log(+user); // 1000 (hint: number)
console.log(\`\${user}\`); // "User: Ali" (hint: string)
\`\`\`

### C. Generator Lifecycle va Boshqaruv Metodlari
Generatorlar oddiy funksiyalardan farqli ravishda o'z holatini saqlab qoladi va ishini to'xtatib tura oladi. Bunga \`yield\` operatori yordam beradi.
Tashqaridan generatordagi kod oqimini to'liq boshqarish uchun quyidagi metodlar mavjud:
1. \`next(value)\`: Generatorni davom ettiradi. Agar qiymat uzatilsa, generator ichidagi joriy \`yield\` ifodasi shu qiymatga teng bo'ladi (ikki tomonlama aloqa).
2. \`return(value)\`: Generator ishini zudlik bilan yakunlaydi va \`{ value, done: true }\` qaytaradi.
3. \`throw(error)\`: Generator ichiga xatolik otadi. Agar generator ichida \`try...catch\` bo'lsa, xatolik ushlanadi, aks holda dastur to'xtaydi.

\`\`\`javascript
function* taskGenerator() {
  try {
    yield "Birinchi bosqich";
    yield "Ikkinchi bosqich";
  } catch (err) {
    console.log("Xato ushlandi:", err.message);
    yield "Xatolikdan keyingi holat";
  }
}
const gen = taskGenerator();
console.log(gen.next().value); // "Birinchi bosqich"
console.log(gen.throw(new Error("Kutilmagan xato")).value); // "Xatolikdan keyingi holat"
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant Caller as Tashqi Kod (Caller)
    participant Gen as Generator Funksiya
    Caller->>Gen: generator = genFunc() (Yaratiladi, hali ishlamaydi)
    Caller->>Gen: generator.next()
    Note over Gen: yield ga qadar ishlaydi
    Gen-->>Caller: { value: X, done: false } (Ish to'xtaydi/suspend)
    Caller->>Gen: generator.next(Y) (Qiymat uzatish mumkin)
    Note over Gen: yield dan keyin davom etadi
    Gen-->>Caller: { value: Z, done: false }
    Caller->>Gen: generator.next()
    Note over Gen: Funksiya yakunlanadi (return yoki oxiri)
    Gen-->>Caller: { value: undefined, done: true } (Tugallanadi)
\`\`\`

### D. Asinxron Generatorlar va \`for await...of\`
Asinxron generatorlar (\`async function*\`) \`yield\` bilan bir qatorda \`await\` operatorini ham ishlata oladi. Har bir \`.next()\` chaqiruvi endi Promise qaytaradi. Bu, asosan, oqimli (stream) ma'lumotlarni yoki API'dan sahifalangan (paginated) ma'lumotlarni asinxron yuklab olishda juda qulaydir.

\`\`\`javascript
async function* fetchUsers(pages) {
  for (let page = 1; page <= pages; page++) {
    // API-dan ma'lumot olishni simulyatsiya qilish
    const response = await fetch(\`https://api.example.com/users?page=\${page}\`);
    const users = await response.json();
    yield users;
  }
}

// Asinxron generatorni aylanish:
// for await (const chunk of fetchUsers(3)) {
//   console.log(chunk);
// }
\`\`\`

## 4. MDN OBYEKT METODLARI
* \`Object.getOwnPropertySymbols(obj)\`: Obyektning barcha Symbol kalitlarini massiv ko'rinishida qaytaradi (MDN bo'yicha bu metod Symbol kalitlarini topishning eng ishonchli usulidir).
* \`Reflect.ownKeys(obj)\`: Obyektning barcha oddiy string kalitlarini ham, symbol kalitlarini ham birgalikda qaytaradi.

## 5. XATOLAR (Common mistakes)
- **Symbol'larni new kalit so'zi bilan yaratish:** Symbol konstruktor emas, shuning uchun \`new Symbol()\` yozish \`TypeError\` xatosini beradi. To'g'ri shakli: \`Symbol()\`.
- **Symbol'larni oddiy looplarda qidirish:** Obyekt ichidagi Symbol kalitlari \`for...in\` yoki \`Object.keys()\` orqali chiqmaydi. Ularni olish uchun \`Object.getOwnPropertySymbols(obj)\` yoki \`Reflect.ownKeys(obj)\` ishlatiladi.
- **Generatorni qayta ishlata olmaslik:** Generator barcha \`yield\`larni bajarib bo'lgach (\`done: true\`), uni qayta o'qib bo'lmaydi. Yangidan aylanib chiqish uchun yangi generator instansiyasini yaratish kerak.

## 6. SAVOLLAR VA JAVOBLAR
**1. yield* delegatsiyasi nima?**
\`yield*\` yordamida boshqa generator yoki har qanday iterable obyekt (massiv, string) ustidan iteratsiyani delegatsiya qilish (o'tkazish) mumkin.

**2. Asinxron generatorlar oddiy generatorlardan nimasi bilan farq qiladi?**
Asinxron generator har bir qadamda oddiy obyekt o'rniga Promise qaytaradi. Shuning uchun ularni o'qishda \`for await...of\` ishlatiladi.

**3. Symbol.toPrimitive metodi nechta hint (ko'rsatma) qabul qiladi?**
U 3 ta hint qabul qiladi: \`"number"\` (matematik amallarda), \`"string"\` (matnli kontekstlarda) va \`"default"\` (ba'zi qo'shuv amallarida).
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
    },
    {
      id: 13,
      title: "Symbol.toPrimitive orqali Obyekt Konvertatsiyasi",
      instruction: "Berilgan 'product' obyektida '[Symbol.toPrimitive]' metodini shunday yozingki: agar hint 'number' bo'lsa obyektning 'price' qiymatini, 'string' bo'lsa 'name' qiymatini, 'default' bo'lsa esa 'price' qiymatini qaytarsin.",
      startingCode: "const product = {\n  name: 'Telefon',\n  price: 500,\n  // Kodni shu yerdan yozing\n};\n",
      hint: "[Symbol.toPrimitive](hint) {\n  if (hint === 'string') return this.name;\n  return this.price;\n}",
      test: "if (typeof product[Symbol.toPrimitive] !== 'function') return '[Symbol.toPrimitive] metodi aniqlanmagan';\nif (+product !== 500) return 'Sonli kontekstda narxni qaytarmadi';\nif (String(product) !== 'Telefon') return 'Matnli kontekstda nomini qaytarmadi';\nif (product + 100 !== 600) return 'Default kontekstda narxni qaytarmadi';\nreturn null;"
    },
    {
      id: 14,
      title: "Asinxron Generator va Paginated Fetching",
      instruction: "Sahifalarni asinxron yuklashni simulyatsiya qiluvchi 'asyncIdGenerator(pagesCount)' asinxron generatorini yozing. U 1 dan 'pagesCount'gacha bo'lgan har bir sahifa uchun 10 millisekund kutishi (`await new Promise(r => setTimeout(r, 10))`) va o'sha sahifa raqamini yield qilishi lozim.",
      startingCode: "async function* asyncIdGenerator(pagesCount) {\n  // Kodni shu yerdan yozing\n}\n",
      hint: "for (let i = 1; i <= pagesCount; i++) {\n  await new Promise(r => setTimeout(r, 10));\n  yield i;\n}",
      test: "const results = [];\nconst gen = asyncIdGenerator(3);\nif (typeof gen[Symbol.asyncIterator] !== 'function') return 'Asinxron generator emas';\nreturn (async () => {\n  for await (const val of gen) {\n    results.push(val);\n  }\n  if (results.join(',') === '1,2,3') return null;\n  return 'Asinxron generator sahifalarni to\\'g\\'ri qaytarmadi';\n})();"
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
    },
    {
      id: 13,
      question: "Obyektni sonli yoki matnli kontekstga o'girishda uning xatti-harakatini to'liq boshqarish uchun foydalaniladigan well-known Symbol qaysi?",
      options: [
        "`Symbol.iterator`",
        "`Symbol.toStringTag`",
        "`Symbol.toPrimitive`",
        "`Symbol.valueOf`"
      ],
      correctAnswer: 2,
      explanation: "`Symbol.toPrimitive` metodi obyektni primitiv qiymatga (son, matn yoki default) o'girish talab qilinganda avtomatik ravishda hint (ko'rsatma) bilan ishga tushadi."
    },
    {
      id: 14,
      question: "Asinxron generatorning (`async function*`) `.next()` metodi nima qaytaradi?",
      options: [
        "`{ value, done }` ko'rinishidagi oddiy obyekt",
        "`{ value, done }` obyektini qaytaradigan Promise",
        "Generator ichidagi yield qilingan qiymatni to'g'ridan-to'g'ri",
        "Asinxron iterator obyekti"
      ],
      correctAnswer: 1,
      explanation: "Asinxron generatorning `.next()` metodi oddiy generatorlardan farqli ravishda doimo Promise qaytaradi. Bu Promise kelajakda `{ value, done }` formatidagi obyektni o'z ichiga oladi."
    }
  ]
};

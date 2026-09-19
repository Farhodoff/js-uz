export const symbolType = {
  id: "symbolType",
  title: "Symbol Turi",
  language: "javascript",
  theory: `
## 1. 💡 Sodda Tushuntirish (Beginner Analogy)
Tasavvur qiling, siz katta bir ofisda ishlaysiz. U yerda xodimlar shkafchalari bor. Agar siz o'z shkafchangizga oddiy "kalit" (String) bilan qulf solsangiz, kimdir xuddi shunday kalit yasab olsa, uni ochib qo'yishi mumkin. Ammo **Symbol** — bu sizning barmoq izingiz bilan ishlaydigan qulf! Uni hatto sizning o'zingiz ham ikki marta aynan bir xil qilib yarata olmaysiz. 

JavaScript-da **Symbol** butunlay noyob (unique) va o'zgarmas (immutable) bo'lgan maxsus ibtidoiy (primitive) ma'lumot turidir. U odatda obyektlarga nomlari takrorlanib qolmaydigan (name collision bo'lmaydigan) yashirin xususiyatlar (properties) qo'shish uchun ishlatiladi.

\\\`\\\`\\\`javascript
const fingerPrint1 = Symbol('myFingerPrint');
const fingerPrint2 = Symbol('myFingerPrint');

console.log(fingerPrint1 === fingerPrint2); // false - har biri unikal!
\\\`\\\`\\\`

## 2. 🔬 Deep Dive (V8 Dvigateli, Xotira va Ishlash)
### Under the Hood (Qanday ishlaydi?)
Symbol oddiy obyekt emas, u primitive data type. V8 dvigateli Symbol'ni yaratganida xotirada unikal manzilli qiymat hosil qiladi va uni o'zgartirib bo'lmaydi (immutable). String'lardan farqli o'laroq, Symbol'lar **Garbage Collection** (axlat yig'uvchi) uchun ham maxsus ishlaydi. Oddiy \`Symbol()\` orqali yaratilgan Symbol'larga reference qolmaganda ular xotiradan tozalanadi. Ammo \`Symbol.for()\` (Global Symbol Registry) orqali yaratilsa, ular dastur ishlashi tugaguncha xotirada qoladi (memory leak xavfi bor, ehtiyot bo'lish kerak!).

### Yashirinlik (Hidden in plain sight)
Symbol'ni obyekt ichida kalit sifatida ishlatsangiz, u ko'p holatlarda yashirin bo'ladi. U \`for...in\` siklida, \`Object.keys()\` yoki \`JSON.stringify()\` qilinganda umuman chiqmaydi!

\\\`\\\`\\\`javascript
const hiddenID = Symbol('id');
const user = {
  name: 'Ali',
  [hiddenID]: 12345
};

console.log(Object.keys(user)); // ['name'] - hiddenID yashirin!
console.log(JSON.stringify(user)); // {"name":"Ali"}
\\\`\\\`\\\`
Ammo u "haqiqiy private" emas, agar bilgan odam \`Object.getOwnPropertySymbols(user)\` ishlatsa, baribir unga yetib boradi.

### Well-Known Symbols
V8 da tilning ichki ishlash mexanizmlarini o'zgartiradigan yashirin tayyor Symbol'lar bor.
Masalan:
- \`Symbol.iterator\` - obyektlarni iteratsiya qilinadigan (masalan \`for...of\` da ishlaydigan) qilish uchun.
- \`Symbol.toPrimitive\` - obyekt qanday qilib primitive qiymatga (string/number) aylanishini boshqarish uchun.

## 3. ⚠️ Edge Cases va Senior Intervyu Savollari

**1. Symbol ni implicit (avtomatik) string'ga o'zgartirib bo'lmaydi:**
Oddiy Number yoki Boolean string'ga osongina qo'shilib ketaveradi. Lekin Symbol bilan string'ni biriktirmoqchi bo'lsangiz \`TypeError\` beradi.
\\\`\\\`\\\`javascript
const sym = Symbol('foo');
console.log(sym + " is testing"); // TypeError: Cannot convert a Symbol value to a string
console.log(sym.toString() + " is testing"); // Yaxshi! "Symbol(foo) is testing"
\\\`\\\`\\\`

**2. Global va Local Symbol o'rtasidagi farq nimada?**
- \`Symbol('key')\` doim yangi yaratadi.
- \`Symbol.for('key')\` esa avval global registry'dan shu 'key' bilan symbol qidiradi, bo'lsa o'shani qaytaradi, yo'q bo'lsa yangi yaratadi.

**3. typeof nima qaytaradi?**
\\\`\\\`\\\`javascript
console.log(typeof Symbol('x')); // "symbol" (qisman obyekt deyilishi xato)
\\\`\\\`\\\`

**4. Obyektda nega Symbol ishlatamiz?**
Third-party kutubxonalar bilan ishlaganda obyektning boshqa metodlarini bilmasdan turib ustma-ust tushib ketishining (override) oldini oladi.

## 4. 📊 Mermaid Diagramma
\\\`\\\`\\\`mermaid
graph TD
    A[JavaScript Data Types] --> B[Primitive]
    A --> C[Reference Object]
    B --> D[String]
    B --> E[Number]
    B --> F[Boolean]
    B --> G[Symbol]
    B --> H[BigInt]
    B --> I[null]
    B --> J[undefined]
    
    G --> K(Symbol.for - Global)
    G --> L(Symbol - Local)
    G --> M(Well-known Symbols)
    
    M --> N[Symbol.iterator]
    M --> O[Symbol.toPrimitive]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: "symbol_ex_1",
      title: "Local Symbol Yaratish",
      instruction: "`secretToken` nomli unikal Symbol yarating (description 'auth' bo'lsin).",
      startingCode: `// bu yerda secretToken yarating\nconst secretToken = null;`,
      hint: "Symbol('auth') orqali yarating.",
      test: `
        expect(typeof secretToken).toBe('symbol');
        expect(secretToken.description).toBe('auth');
      `
    },
    {
      id: "symbol_ex_2",
      title: "Symbol'larning Unikalligi",
      instruction: "Ikkita 'session' description'iga ega Symbol yarating va ular teng emasligini `isSameSession` o'zgaruvchisida saqlang.",
      startingCode: `const sessionA = Symbol('session');\nconst sessionB = Symbol('session');\n\nconst isSameSession = true; // o'zgartiring`,
      hint: "isSameSession qiymati sessionA === sessionB bo'lishi kerak, ya'ni false.",
      test: `
        expect(isSameSession).toBe(false);
      `
    },
    {
      id: "symbol_ex_3",
      title: "Symbol Kalit sifatida",
      instruction: "`apiKey` Symbol'ini `config` obyekti ichida kalit qilib ishlating, qiymati `9876` bo'lsin.",
      startingCode: `const apiKey = Symbol('api');\nconst config = {\n  // shu yerga symbol kalitini yozing\n};`,
      hint: "[apiKey]: 9876 ko'rinishida yozing.",
      test: `
        expect(config[apiKey]).toBe(9876);
      `
    },
    {
      id: "symbol_ex_4",
      title: "Yashirin Xususiyatlar (Object.keys)",
      instruction: "`user` obyektida ham oddiy kalit, ham Symbol kalit bor. `Object.keys(user)` chaqirilganda qaysi kalitlar chiqishini array ko'rinishida `keys` ga yozing.",
      startingCode: `const idSym = Symbol('id');\nconst user = { username: "admin", [idSym]: 1 };\n\nconst keys = null; // ['...']`,
      hint: "Faqat ['username'] bo'ladi, chunki Symbol kalitlar yashirin.",
      test: `
        expect(Array.isArray(keys)).toBe(true);
        expect(keys.length).toBe(1);
        expect(keys[0]).toBe('username');
      `
    },
    {
      id: "symbol_ex_5",
      title: "Global Symbol (Symbol.for)",
      instruction: "Global Registry dan 'db_id' nomli symbolni `sym1` va `sym2` ga oling. Ular bir-biriga teng ekanligini isbotlovchi boolean qiymatni `isGlobalEqual` ga yozing.",
      startingCode: `const sym1 = undefined; // Symbol.for('db_id')\nconst sym2 = undefined;\n\nconst isGlobalEqual = false; // ularni tenglang`,
      hint: "sym1 = Symbol.for('db_id'); sym2 = Symbol.for('db_id'); isGlobalEqual = (sym1 === sym2);",
      test: `
        expect(typeof sym1).toBe('symbol');
        expect(sym1).toBe(sym2);
        expect(isGlobalEqual).toBe(true);
      `
    },
    {
      id: "symbol_ex_6",
      title: "Symbol'ni String'ga o'girish",
      instruction: "`sym` ni to'g'ri string formatiga o'tkazib `strSym` ga yuklang. Eslatma: `sym + ''` xato beradi!",
      startingCode: `const sym = Symbol('hello');\nconst strSym = null; // o'zgartiring`,
      hint: "sym.toString() yoki String(sym) ishlating.",
      test: `
        expect(strSym).toBe('Symbol(hello)');
      `
    },
    {
      id: "symbol_ex_7",
      title: "Object.getOwnPropertySymbols() methodi",
      instruction: "`obj` ichidagi Symbol kalitlarini massiv ko'rinishida olish uchun maxsus obyekt metodidan foydalanib `symKeys` o'zgaruvchisiga saqlang.",
      startingCode: `const a = Symbol('a');\nconst obj = { [a]: 10, b: 20 };\n\nconst symKeys = null; // o'zgartiring`,
      hint: "Object.getOwnPropertySymbols(obj) ishlating.",
      test: `
        expect(Array.isArray(symKeys)).toBe(true);
        expect(symKeys[0]).toBe(a);
        expect(symKeys.length).toBe(1);
      `
    },
    {
      id: "symbol_ex_8",
      title: "JSON.stringify da Symbol e'tiborsiz qoldirilishi",
      instruction: "Obyektni JSON ga o'tkazganda nima chiqishini tahlil qilib, kutilayotgan aniq string'ni `expectedJson` ga yozing.",
      startingCode: `const xSym = Symbol('x');\nconst data = { age: 25, [xSym]: 'hidden' };\nconst json = JSON.stringify(data);\n\nconst expectedJson = ""; // o'zgartiring`,
      hint: "Symbol'lar JSON'dan tushib qoladi. Natija: '{\"age\":25}'",
      test: `
        expect(expectedJson).toBe('{"age":25}');
      `
    },
    {
      id: "symbol_ex_9",
      title: "Symbol description (ta'rif) xususiyati",
      instruction: "Quyidagi Symbol ning ta'rifini maxsus `.description` property'si yordamida olib `desc` ga saqlang.",
      startingCode: `const mySym = Symbol('my_description');\nconst desc = null; // o'zgartiring`,
      hint: "mySym.description deb yozing.",
      test: `
        expect(desc).toBe('my_description');
      `
    },
    {
      id: "symbol_ex_10",
      title: "Well-known Symbol: Symbol.keyFor",
      instruction: "Sizda `Symbol.for` orqali yaratilgan global symbol bor. `Symbol.keyFor` orqali uning qaysi string key bilan yaratilganligini toping.",
      startingCode: `const globalSym = Symbol.for('shared_state');\nconst theKey = null; // Symbol.keyFor() ishlating`,
      hint: "Symbol.keyFor(globalSym) ishlating.",
      test: `
        expect(theKey).toBe('shared_state');
      `
    }
  ],
  quizzes: [
    {
      id: "symbol_q_1",
      question: "Symbol ma'lumot turi JavaScript-ga qachon qo'shilgan?",
      options: [
        "ES5 (2009)",
        "ES6 (2015)",
        "ES8 (2017)",
        "Dastlabki versiyasidan beri bor"
      ],
      correctAnswer: "ES6 (2015)",
      explanation: "Symbollar ES6 da (ECMAScript 2015) yangi primitive data type sifatida taqdim etilgan."
    },
    {
      id: "symbol_q_2",
      question: "Quyidagi ifoda nimani qaytaradi? Symbol('a') === Symbol('a')",
      options: [
        "true",
        "false",
        "TypeError",
        "undefined"
      ],
      correctAnswer: "false",
      explanation: "Symbol() har doim unikal qiymat yaratadi, description bir xil bo'lsa ham xotirada manzillar mutlaqo farq qiladi."
    },
    {
      id: "symbol_q_3",
      question: "Symbol yaratishning to'g'ri usuli qaysi?",
      options: [
        "new Symbol('id')",
        "Symbol.create('id')",
        "Symbol('id')",
        "Object.symbol('id')"
      ],
      correctAnswer: "Symbol('id')",
      explanation: "Symbol primitive type bo'lgani uchun 'new' kalit so'zi bilan obyekt sifatida yasalmaydi."
    },
    {
      id: "symbol_q_4",
      question: "Symbol kalitlari `Object.keys()` funksiyasida qanday tutadi o'zini?",
      options: [
        "Massivning oxirida chiqadi",
        "Ular mutlaqo yashirin bo'lib chiqmaydi",
        "Massivning boshida chiqadi",
        "Error beradi"
      ],
      correctAnswer: "Ular mutlaqo yashirin bo'lib chiqmaydi",
      explanation: "Symbol kalitlari avtomatik Object.keys(), Object.values() va for...in looplarda chiqmaydi. Bu inkapsulyatsiya uchun yaxshi."
    },
    {
      id: "symbol_q_5",
      question: "Obyektdagi Symbol xususiyatlarini aniq qaysi metod yordamida olsa bo'ladi?",
      options: [
        "Object.getSymbols(obj)",
        "Object.keys(obj)",
        "Object.getOwnPropertySymbols(obj)",
        "Reflect.symbols(obj)"
      ],
      correctAnswer: "Object.getOwnPropertySymbols(obj)",
      explanation: "Shu metod yordamida faqatgina Symbol bo'lgan kalitlar massiv qilib olinadi."
    },
    {
      id: "symbol_q_6",
      question: "Global Symbol ro'yxatida xuddi o'sha key dagi Symbol bor bo'lsa qaytaradigan, bo'lmasa yaratadigan metod?",
      options: [
        "Symbol.global('key')",
        "Symbol.for('key')",
        "Symbol.get('key')",
        "Symbol('key')"
      ],
      correctAnswer: "Symbol.for('key')",
      explanation: "Symbol.for() qidirish ishlarini registry orqali olib boradi. Bu bitta Symbol ni fayllar orasida sheriklash uchun (share) qulay."
    },
    {
      id: "symbol_q_7",
      question: "Symbol ni string ga to'g'ridan-to'g'ri (implicit) qo'shib bo'ladimi? Masalan: sym + ''",
      options: [
        "Ha, String(sym) qilganday ishlaydi",
        "Yo'q, TypeError beradi",
        "Ha, faqat 'undefined' degan string chiqadi",
        "Yo'q, ReferenceError beradi"
      ],
      correctAnswer: "Yo'q, TypeError beradi",
      explanation: "JavaScript dvigateli Symbol ni avtomatik ravishda string ga o'zgartira olmaydi, TypeError ko'taradi."
    },
    {
      id: "symbol_q_8",
      question: "JSON.stringify() obyektdagi Symbol kalitlarni nima qiladi?",
      options: [
        "SyntaxError beradi",
        "String qilib yuboradi",
        "Null qilib yuboradi",
        "Butunlay e'tiborsiz qoldiradi"
      ],
      correctAnswer: "Butunlay e'tiborsiz qoldiradi",
      explanation: "JSON standarti faqat String, Number, Boolean, Array, Object va null larni taniydi. Symbol va Function larni esa tushirib qoldiradi."
    },
    {
      id: "symbol_q_9",
      question: "Well-known symbol (masalan, Symbol.toPrimitive) nima vazifa bajaradi?",
      options: [
        "Matematik qoidalarni buzadi",
        "Tilning ichki default xatti-harakatlarini (iteratsiya, tiplar o'zgarishi) override qilish uchun",
        "Kod xavfsizligini 100% himoya qiladi",
        "Class yaratishda faqat private qilib qo'yadi"
      ],
      correctAnswer: "Tilning ichki default xatti-harakatlarini (iteratsiya, tiplar o'zgarishi) override qilish uchun",
      explanation: "Well-known Symbols orqali obyektlar tilning asosi bo'lgan operatorlar va qoidalar bilan integratsiya qiladi."
    },
    {
      id: "symbol_q_10",
      question: "typeof Symbol.iterator nimaga teng?",
      options: [
        "'function'",
        "'object'",
        "'symbol'",
        "'undefined'"
      ],
      correctAnswer: "'symbol'",
      explanation: "Well-known symbollar ham aslida primitiv symbol ma'lumot turlaridir, demak typeof 'symbol' qaytaradi."
    },
    {
      id: "symbol_q_11",
      question: "Symbol.keyFor(sym) nima uchun ishlatiladi?",
      options: [
        "Local symbol'larni description'ini olish uchun",
        "Global registry'dagi (Symbol.for bilan olingan) Symbol'ning qaysi string 'key' ekanligini qaytarish uchun",
        "Obyekt ichidan kalitni o'chirish uchun",
        "Global symbol ni yo'q qilish uchun"
      ],
      correctAnswer: "Global registry'dagi (Symbol.for bilan olingan) Symbol'ning qaysi string 'key' ekanligini qaytarish uchun",
      explanation: "Faqat Global Symbol Registry dan olingan symbol larning asil key (nomini) bilish uchun Symbol.keyFor dan foydalanamiz."
    },
    {
      id: "symbol_q_12",
      question: "Symbol dan foydalanish qachon Memory Leak'ga (xotira to'lib qolishi) sabab bo'lishi mumkin?",
      options: [
        "Agar doimiy ravishda Symbol() yaratsangiz",
        "Obyektlarda ishlatilganda",
        "Takror-takror Symbol.for() bilan turli yangi key'lar yaratsangiz va ularni yopmasangiz",
        "Symbol'ni massiv ichiga solganda"
      ],
      correctAnswer: "Takror-takror Symbol.for() bilan turli yangi key'lar yaratsangiz va ularni yopmasangiz",
      explanation: "Symbol.for() qilinganda, u avtomatik tarzda xotiradan global registry'ga tushadi va dastur oxirigacha garbage collection bo'lmaydi."
    }
  ]
};

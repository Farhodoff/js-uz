export const symbolType = {
  id: "symbolType",
  title: "Symbol Turi",
  language: "javascript",
  theory: `
## 1. 💡 Sodda Tushuntirish
**Symbol** — ES6 da qo'shilgan, to'liq yagona (unique) va o'zgarmas (immutable) bo'lgan ibtidoiy (primitive) ma'lumot turidir. 

U asosan obyektlarga takrorlanmas xususiyatlar (properties) qo'shish uchun ishlatiladi. Ikki marta \`Symbol()\` orqali bir xil nom bilan yaratsangiz ham, ular baribir bir-biriga teng bo'lmaydi.

## 2. 💻 Real Kod Misollari
**Symbol yaratish:**
\`\`\`javascript
const sym1 = Symbol("id");
const sym2 = Symbol("id");

console.log(sym1 === sym2); // false (har biri mutlaqo yagona)
\`\`\`

**Obyektda kalit sifatida ishlatish:**
\`\`\`javascript
const mySymbol = Symbol("maxfiy_kalit");
const user = {
  name: "Ali",
  [mySymbol]: 12345
};

console.log(user[mySymbol]); // 12345
console.log(Object.keys(user)); // ["name"] (Symbol yashirin qoladi)
\`\`\`

## 3. ⚙️ Qanday Ishlaydi
1. **Yagonalik:** Har bir chaqirilgan \`Symbol()\` unikal qiymat qaytaradi.
2. **Yashirinlik (Hidden properties):** Obyekt kaliti sifatida ishlatilgan Symbol-lar \`for...in\`, \`Object.keys()\`, \`Object.getOwnPropertyNames()\` larda ko'rinmaydi. Ular ma'lum darajada "inkapsulyatsiya" vazifasini bajaradi.
3. **Global Symbol Registry:** Agar dasturning turli joylarida haqiqatdan bir xil Symbol kerak bo'lsa, \`Symbol.for("key")\` ishlatiladi.
4. **Well-known Symbols:** JavaScriptning o'zida ichki maxsus Symbol'lar bor (masalan, \`Symbol.iterator\`, \`Symbol.toPrimitive\`), ular tilning qanday ishlashini o'zgartirish uchun ishlatiladi.

## 4. 🔥 ROAST (Juniorlarning Sharmandali Xatolari)
### YOMON:
\`\`\`javascript
const sym = new Symbol("id"); // TypeError: Symbol is not a constructor
\`\`\`
Juniorlar hamma narsani \`new\` bilan yaratishga o'rganib qolishgan. Lekin Symbol bu primitive type, obyekt emas!

### YAXSHI:
\`\`\`javascript
const sym = Symbol("id"); // To'g'ri, new so'zisiz
\`\`\`

## 5. 🎯 Intervyu Savollari
### Junior (1-4)
1. **Symbol nima?**
   Javob: JS dagi primitive data type bo'lib, unikal va o'zgarmas identifikatorlar yaratish uchun xizmat qiladi.
2. **Ikkita bir xil ta'rif (description) ga ega Symbol bir-biriga tengmi?**
   Javob: Yo'q. \`Symbol('a') === Symbol('a')\` doim \`false\` qaytaradi.
3. **Symbol ni \`new\` kalit so'zi bilan yaratsa bo'ladimi?**
   Javob: Yo'q, u primitive, constructor emas. TypeError qaytaradi.
4. **Symbol obyekt kaliti sifatida nima foyda beradi?**
   Javob: Kalitlar tasodifan takrorlanib qolishidan va ustma-ust tushishidan (name collision) himoya qiladi.

### Middle (5-8)
5. **Symbol xususiyatlari (properties) \`Object.keys()\` da ko'rinadimi?**
   Javob: Yo'q, Symbol xususiyatlar yashirin bo'ladi. Ularni topish uchun \`Object.getOwnPropertySymbols(obj)\` dan foydalanish kerak.
6. **Global Symbol yaratish uchun nima ishlatiladi?**
   Javob: \`Symbol.for("key")\` methodidan foydalaniladi. Agar shu key bilan Symbol oldin yaratilgan bo'lsa, o'shani qaytaradi.
7. **Symbol-ni qanday qilib string-ga o'tkazish mumkin?**
   Javob: Implicit (avtomatik) o'zgartirib bo'lmaydi, \`TypeError\` beradi. Qo'lda \`sym.toString()\` yoki \`String(sym)\` deb ishlatish kerak.
8. **\`Symbol.keyFor()\` qanday ishlaydi?**
   Javob: U global ro'yxatdan olingan Symbol (\`Symbol.for\` orqali) ning matnli nomini (description) qaytaradi.

### Senior (9-12)
9. **Well-known Symbols (Masalan: \`Symbol.iterator\`) nima?**
   Javob: JS motorida standart operatsiyalar qanday ishlashini o'zgartiruvchi ichki (built-in) symbol'lardir. Ular obyektlarning iteratsiya qilinishini (\`Symbol.iterator\`) yoki string-ga aylanishini (\`Symbol.toPrimitive\`) belgilaydi.
10. **Symbol xususiyatlari JSON.stringify qilinganda nima bo'ladi?**
    Javob: Avtomatik ravishda e'tiborsiz qoldiriladi (ignore). Obyektning Symbol kalitlari JSON-ga kirmaydi.
11. **Symbol qanday xotira tozalash (garbage collection) ga ega?**
    Javob: \`Symbol()\` oddiy reference kabi ishlaydi, u ishlatilmay qolsa tozalanadi. Lekin \`Symbol.for()\` global ro'yxatda ro'yxatga olinadi va butun dastur ishlashi davomida xotirada qoladi.
12. **Nega asosan WeakMap yoki Symbol-lardan private obyekt ma'lumotlarini saqlashda foydalanilgan?**
    Javob: Chunki ular yashirinlikni ta'minlaydi (garchi ES2020 dan keyin \`#private\` fieldlar chiqqan bo'lsa-da).

## 6. Mermaid Diagramma
\`\`\`mermaid
graph LR
    A[JavaScript Types] --> B[Primitive]
    A --> C[Reference]
    B --> D[String]
    B --> E[Number]
    B --> F[Boolean]
    B --> G[Symbol -- Unikal ID]
    
    G --> H[Obyekt kalitlari uchun: Name Collisiondan asraydi]
    G --> I[Yashirin xususiyatlar: for...in da chiqmaydi]
\`\`\`
`,
  exercises: [
    {
      id: "symbol_ex_1",
      title: "Symbol Yaratish",
      instruction: "`mySym` nomli unikal Symbol yarating (ta'rifi 'first' bo'lsin).",
      startingCode: `// bu yerda mySym yarating\\nconst mySym = null;`,
      hint: "Symbol('first') orqali yarating.",
      test: `
        expect(typeof mySym).toBe('symbol');
        expect(mySym.description).toBe('first');
      `
    },
    {
      id: "symbol_ex_2",
      title: "Unikallikni Tekshirish",
      instruction: "Ikkita 'test' ta'rifiga ega Symbol yarating va ular teng emasligini `isEqual` ga yozing.",
      startingCode: `const symA = Symbol('test');\\nconst symB = Symbol('test');\\n\\nconst isEqual = true; // o'zgartiring`,
      hint: "isEqual qiymati symA === symB bo'lishi kerak, ya'ni false.",
      test: `
        expect(isEqual).toBe(false);
      `
    },
    {
      id: "symbol_ex_3",
      title: "Obyektda kalit sifatida",
      instruction: "`secretKey` Symbol'ini obyekt ichida kalit qilib ishlating, uning qiymati `42` bo'lsin.",
      startingCode: `const secretKey = Symbol('secret');\\nconst data = {\\n  // shu yerga symbol kalitini yozing\\n};`,
      hint: "[secretKey]: 42 ko'rinishida yozing.",
      test: `
        expect(data[secretKey]).toBe(42);
      `
    },
    {
      id: "symbol_ex_4",
      title: "Yashirin Xususiyatlar (Object.keys)",
      instruction: "`user` obyektida ham String kalit, ham Symbol kalit bor. `keys` o'zgaruvchisiga `Object.keys(user)` nimani qaytarishini massiv sifatida yozing.",
      startingCode: `const idSym = Symbol('id');\\nconst user = { name: "Bob", [idSym]: 123 };\\n\\nconst keys = null; // ['...']`,
      hint: "Faqat ['name'] bo'ladi, chunki Symbol kalitlar yashirin.",
      test: `
        expect(keys.length).toBe(1);
        expect(keys[0]).toBe('name');
      `
    },
    {
      id: "symbol_ex_5",
      title: "Global Symbol (Symbol.for)",
      instruction: "Global Registry dan 'app_id' nomli symbolni `globalSym1` va `globalSym2` ga oling. Ular birbiriga teng ekanligini isbotlang.",
      startingCode: `const globalSym1 = undefined; // Symbol.for('app_id')\\nconst globalSym2 = undefined;\\n\\nconst isGlobalEqual = false; // ularni tenglang`,
      hint: "globalSym1 = Symbol.for('app_id'); globalSym2 = Symbol.for('app_id'); isGlobalEqual = (globalSym1 === globalSym2);",
      test: `
        expect(typeof globalSym1).toBe('symbol');
        expect(globalSym1).toBe(globalSym2);
        expect(isGlobalEqual).toBe(true);
      `
    },
    {
      id: "symbol_ex_6",
      title: "Symbolni Stringga o'girish",
      instruction: "`sym` ni string formatiga o'tkazib `strSym` ga yuklang. `sym + \\\"\\\"` qilsangiz xato beradi!",
      startingCode: `const sym = Symbol('hello');\\nconst strSym = null; // o'zgartiring`,
      hint: "sym.toString() yoki String(sym) ishlating.",
      test: `
        expect(strSym).toBe('Symbol(hello)');
      `
    },
    {
      id: "symbol_ex_7",
      title: "Object.getOwnPropertySymbols()",
      instruction: "`obj` ichidagi Symbol kalitlarini topib (ularni qatorga yoki massivga aylantirib emas, shunchaki method orqali topib) `symKeys` ga yuklang.",
      startingCode: `const a = Symbol('a');\\nconst obj = { [a]: 10 };\\n\\nconst symKeys = null; // o'zgartiring`,
      hint: "Object.getOwnPropertySymbols(obj) ishlatiladi.",
      test: `
        expect(Array.isArray(symKeys)).toBe(true);
        expect(symKeys[0]).toBe(a);
      `
    },
    {
      id: "symbol_ex_8",
      title: "JSON.stringify da Symbol",
      instruction: "Obyektni JSON ga o'tkazganda nima bo'lishini tahlil qilib, kutilgan `jsonString` qanday bo'lishini yozing.",
      startingCode: `const xSym = Symbol('x');\\nconst data = { val: 100, [xSym]: 999 };\\nconst json = JSON.stringify(data);\\n\\nconst expectedJson = ""; // o'zgartiring`,
      hint: "Symbol'lar e'tiborsiz qoldiriladi. Natija: '{\"val\":100}'",
      test: `
        expect(expectedJson).toBe('{"val":100}');
      `
    },
    {
      id: "symbol_ex_9",
      title: "Symbol description (ta'rifi)",
      instruction: "`mySym` ning ta'rifi nima ekanligini `.description` property'si yordamida oling.",
      startingCode: `const mySym = Symbol('test_desc');\\nconst desc = null; // o'zgartiring`,
      hint: "mySym.description deb yozing.",
      test: `
        expect(desc).toBe('test_desc');
      `
    },
    {
      id: "symbol_ex_10",
      title: "Well-known Symbol: Symbol.toPrimitive",
      instruction: "Ushbu obyekt matematik amallarda ishlatilganda son qaytarishi uchun `Symbol.toPrimitive` dan foydalaning.",
      startingCode: `const box = {\\n  width: 10,\\n  height: 20,\\n  // shu yerda toPrimitive methodini qo'shing, u width * height qaytarsin\\n};`,
      hint: "[Symbol.toPrimitive]() { return this.width * this.height; }",
      test: `
        expect(box + 10).toBe(210);
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
      explanation: "Symbollar ES6 (ECMAScript 2015) da yangi primitive data type sifatida taqdim etildi."
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
      explanation: "Symbol() har doim mutlaqo unikal (yagona) qiymat yaratadi, hatto ularning description'i bir xil bo'lsa ham."
    },
    {
      id: "symbol_q_3",
      question: "Qanday qilib yangi Symbol yaratiladi?",
      options: [
        "new Symbol('id')",
        "Symbol.create('id')",
        "Symbol('id')",
        "Object.symbol('id')"
      ],
      correctAnswer: "Symbol('id')",
      explanation: "Symbol primitive bo'lgani uchun 'new' kalit so'zi ishlatilmaydi. Shunchaki funksiya sifatida chaqiriladi."
    },
    {
      id: "symbol_q_4",
      question: "Symbol xususiyatlari Object.keys() da chiqadimi?",
      options: [
        "Ha, doim",
        "Yo'q, ular yashirin",
        "Faqat enumerable true qilingan bo'lsa",
        "Ha, lekin oxirida chiqadi"
      ],
      correctAnswer: "Yo'q, ular yashirin",
      explanation: "Symbol kalitlari Object.keys(), Object.values(), va for...in loop'larda ataylab yashiriladi."
    },
    {
      id: "symbol_q_5",
      question: "Obyektdagi Symbol xususiyatlarni qanday topish mumkin?",
      options: [
        "Object.getSymbols()",
        "Object.keys()",
        "Object.getOwnPropertySymbols()",
        "Reflect.symbols()"
      ],
      correctAnswer: "Object.getOwnPropertySymbols()",
      explanation: "Obyekt ichidagi barcha symbol xususiyatlarni massiv shaklida olish uchun Object.getOwnPropertySymbols(obj) ishlatiladi."
    },
    {
      id: "symbol_q_6",
      question: "Global Symbol ro'yxatidan (registry) bir xil Symbol olish uchun nima ishlatiladi?",
      options: [
        "Symbol.global('key')",
        "Symbol.for('key')",
        "Symbol.get('key')",
        "Symbol.create('key')"
      ],
      correctAnswer: "Symbol.for('key')",
      explanation: "Symbol.for('key') global ro'yxatni tekshiradi. Agar 'key' bilan symbol bo'lsa uni qaytaradi, aks holda yangisini yaratadi."
    },
    {
      id: "symbol_q_7",
      question: "Symbol ni string ga to'g'ridan-to'g'ri (implicit) o'zgartirish (masalan: sym + '') mumkinmi?",
      options: [
        "Ha, bo'ladi",
        "Yo'q, TypeError beradi",
        "Ha, lekin faqat undefined qaytadi",
        "Yo'q, ReferenceError beradi"
      ],
      correctAnswer: "Yo'q, TypeError beradi",
      explanation: "Symbol turini to'g'ridan-to'g'ri string ga o'girish taqiqlangan, Type error chiqadi. Buning uchun .toString() ishlatish kerak."
    },
    {
      id: "symbol_q_8",
      question: "JSON.stringify() obyektdagi Symbol kalitlarini qanday ishlagaydi?",
      options: [
        "Xato beradi",
        "String qilib yuboradi",
        "Null qilib yuboradi",
        "E'tiborsiz qoldiradi (ignore)"
      ],
      correctAnswer: "E'tiborsiz qoldiradi (ignore)",
      explanation: "JSON standarti Symbollarni qabul qilmaydi, shuning uchun JSON.stringify ularni to'liq ignor qilib yuboradi."
    },
    {
      id: "symbol_q_9",
      question: "Well-known symbol'lar nima uchun kerak?",
      options: [
        "Obyektlarni bezash uchun",
        "Tilning standart harakatlarini (masalan iteratsiya, tip o'zgarishi) moslashtirish uchun",
        "Serverga maxfiy ma'lumot yuborish uchun",
        "Faqat class larni nomlash uchun"
      ],
      correctAnswer: "Tilning standart harakatlarini (masalan iteratsiya, tip o'zgarishi) moslashtirish uchun",
      explanation: "Symbol.iterator, Symbol.toPrimitive kabi ichki symbollar obyektlarning fundamental harakatlarini o'zgartirish imkonini beradi."
    },
    {
      id: "symbol_q_10",
      question: "Quyidagi qaysi biri to'g'ri? const obj = { [Symbol('a')]: 1, [Symbol('a')]: 2 };",
      options: [
        "Obyektda faqat bitta 'a' bo'ladi, qiymati 2",
        "Obyektda ikkita unikal xususiyat yaratiladi",
        "Sintaksis xatosi beradi",
        "Ikkala kalit ham string ga aylanib ketadi"
      ],
      correctAnswer: "Obyektda ikkita unikal xususiyat yaratiladi",
      explanation: "Har bir Symbol('a') o'ziga xos va unikal bo'lgani uchun, obyektda ikkita bir xil ko'rinishdagi (ammo ichki id lari turli) kalit hosil bo'ladi."
    },
    {
      id: "symbol_q_11",
      question: "Symbol.keyFor(sym) qanday vazifa bajaradi?",
      options: [
        "Oddiy Symbol ning ta'rifini qaytaradi",
        "Symbol ning turini qaytaradi",
        "Global registry dagi (Symbol.for bilan olingan) Symbol ning string 'key' ini qaytaradi",
        "Symbolni o'chiradi"
      ],
      correctAnswer: "Global registry dagi (Symbol.for bilan olingan) Symbol ning string 'key' ini qaytaradi",
      explanation: "Faqat Symbol.for orqali ro'yxatdan o'tgan global symbollarning nomi Symbol.keyFor orqali topilishi mumkin."
    },
    {
      id: "symbol_q_12",
      question: "Obyektni for...in sikli bilan aylanib chiqsangiz Symbol xususiyatlari chiqadimi?",
      options: [
        "Ha",
        "Yo'q",
        "Faqat global Symbollar chiqadi",
        "Faqat bitta birinchisi chiqadi"
      ],
      correctAnswer: "Yo'q",
      explanation: "for...in, xuddi Object.keys() kabi, symbol kalitlarini inobatga olmaydi."
    }
  ]
};

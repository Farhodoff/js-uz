export const typeNarrowing = {
  id: "type-narrowing",
  title: "TypeScript Type Narrowing (Toifani Toraytirish)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, tungi klub oldida qorovul (bouncer) turibdi. Klubga faqat 18 yoshdan kattalar (masalan, \`number\` tipi) yoki maxsus VIP kartasi borlar (\`string\` tipi) kirishi mumkin. Odamlar kelganda qorovul ularning pasporti yoki kartasini tekshiradi (bu JS-dagi \`typeof\` yoki mantiqiy tekshiruv). Agar tekshiruvdan o'tsa, qorovul bu odam aynan kim ekanligini aniq biladi va unga to'g'ri xizmat ko'rsatadi.

TypeScript-dagi **Type Narrowing** (Toifani toraytirish) ham xuddi shu qorovul kabi ishlaydi. U kodingizdagi \`if-else\`, \`switch\` va \`typeof\` kabi oddiy JavaScript tekshiruvlarini qadamma-qadam kuzatadi (buni "Control Flow Analysis" deyiladi). Natijada, keng toifani (masalan, \`string | number\`) aniq bir toifaga (masalan, faqat \`string\`) toraytirib, xato qilish ehtimolini oldini oladi.

## 2. 🧠 Deep Dive (Chuqur tahlil)

**Under the hood (Qanday ishlaydi):**
TypeScript "Control Flow Analysis" (Boshqaruv oqimi tahlili) mexanizmidan foydalanadi. Kompilyator kodingizni o'qiyotganda, har bir \`if\`, \`else\`, \`return\` va \`switch\` orqali ehtimoliy tarmoqlarni tahlil qiladi va shu ma'lumot asosida o'zgaruvchining toifasini moslashtirib (toraytirib) boradi. 

**TS Compiler (tsc) va Type Erasure:**
Narrowing amallari faqatgina TypeScript kompilyatsiya jarayonida (compile-time) mavjud. Kod JavaScript-ga o'girilganda (bu jarayon "Type Erasure" deb ataladi), TypeScript-ga tegishli barcha tiplar va interfeyslar o'chib ketadi. Shuning uchun, narrowing qilish uchun faqatgina sof JavaScript-da ishlaydigan operatorlardan (\`typeof\`, \`instanceof\`, \`in\`) foydalanish majburiydir.

**Memory va Performance:**
TypeScript tiplari va narrowing tahlillari dasturning ishlab turgan paytidagi (runtime) xotirasi va tezligiga (performance) umuman ta'sir qilmaydi, chunki tiplar JavaScript-ga o'tmaydi. Biroq, \`typeof\` kabi JS tekshiruvlari runtime-da bajarilgani sababli mikroskopik darajada resurs talab qiladi, ammo bu amalda dastur tezligiga salbiy ta'sir ko'rsatmaydi.

## 3. ⚠️ Edge Cases va Senior Interview Questions

**🎤 1. Type Predicate (\`arg is Type\`) qachon xavfli bo'lishi mumkin?**
*Javob:* Type predicate-lar (masalan, \`function isString(val: any): val is string\`) TypeScript-ga o'zgaruvchining aniq turini kafolatlaydi. Ammo u xavfli bo'lishi mumkin! Agar siz funksiya ichida mantiqiy xato qilib noto'g'ri natija qaytarsangiz ham, TypeScript sizga ishonadi. Bu compile-time xatolar yashirinib qolib, runtime bug-larga olib kelishi mumkin.

**🎤 2. Nega \`typeof null\` Narrowing-da muammo tug'diradi?**
*Javob:* JavaScript-dagi qadimiy xato tufayli, \`typeof null\` natijasi \`"object"\` qaytaradi. Agar siz ob'ektni ajratib olish uchun \`if (typeof val === "object")\` deb yozsangiz, u \`null\` qiymatni ham ob'ekt deb hisoblab yuboradi. Buni oldini olish uchun \`if (val !== null && typeof val === "object")\` kabi tekshiruvlardan foydalanish kerak.

**🎤 3. "Exhaustiveness checking" nima va \`never\` tipi unda qanday ishlaydi?**
*Javob:* Union tiplar bilan \`switch/case\` ishlatganingizda, barcha ehtimoliy qiymatlarni qamrab olish juda muhim. Buni majburlash uchun \`default\` blokida o'zgaruvchini \`never\` tipidagi o'zgaruvchiga tenglashtirasiz. Agar kelajakda kimgadir Union-ga yangi tip qo'shish kerak bo'lsa va \`case\` yozishni unuta, TypeScript darhol \`never\` qoidasi orqali kompilatsiya xatosini beradi.

## 📊 Type Narrowing Flow Diagram

\`\`\`mermaid
graph TD
    A[Value: string | number] --> B{typeof value === 'string'}
    B -->|Yes| C[TypeScript: Value is string]
    B -->|No| D[TypeScript: Value is number]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1. typeof yordamida toraytirish",
      instruction: "`multiply(value: string | number, factor: number)` funksiyasini yozing. Agar value number bo'lsa ko'paytirib qaytaring, agar string bo'lsa uni factor marta takrorlab qaytaring.",
      startingCode: "function multiply(value: string | number, factor: number): string | number {\n  // kodingizni yozing\n}",
      hint: "if (typeof value === 'number')",
      solution: "function multiply(value: string | number, factor: number): string | number {\n  if (typeof value === 'number') {\n    return value * factor;\n  }\n  return value.repeat(factor);\n}",
      test: "const fn = new Function('return function(value, factor) { if (typeof value === \"number\") return value * factor; return value.repeat(factor); }')();\nconst multiply = fn;\nreturn multiply(5, 2) === 10 && multiply('a', 3) === 'aaa';"
    },
    {
      id: 2,
      title: "2. Truthiness Narrowing",
      instruction: "Parametr sifatida `string | null` qabul qilib, agar string bo'lsa length, aks holda 0 qaytaring. Oddiy truthiness `if (str)` dan foydalaning.",
      startingCode: "function getLength(str: string | null): number {\n  // kodingizni yozing\n}",
      hint: "if (str) { return str.length; } return 0;",
      solution: "function getLength(str: string | null): number {\n  if (str) {\n    return str.length;\n  }\n  return 0;\n}",
      test: "const fn = new Function('return function(str) { if (str) return str.length; return 0; }')();\nconst getLength = fn;\nreturn getLength('test') === 4 && getLength(null) === 0;"
    },
    {
      id: 3,
      title: "3. Equality Narrowing",
      instruction: "`x` va `y` string yoki number bo'lishi mumkin. Agar ikkisi aynan teng (===) bo'lsa true, bo'lmasa false qaytaring.",
      startingCode: "function isEqual(x: string | number, y: string | number): boolean {\n  // kodingizni yozing\n}",
      hint: "return x === y;",
      solution: "function isEqual(x: string | number, y: string | number): boolean {\n  return x === y;\n}",
      test: "const fn = new Function('return function(x, y) { return x === y; }')();\nconst isEqual = fn;\nreturn isEqual(1, 1) === true && isEqual(1, '1') === false;"
    },
    {
      id: 4,
      title: "4. in operatori orqali",
      instruction: "User ob'ekti (ismi bilan) yoki Guest ob'ekti (nomisiz). Agar ismi bo'lsa ismini, aks holda 'Guest' qaytaring.",
      startingCode: "interface User { name: string; }\ninterface Guest { isGuest: boolean; }\n\nfunction getGreeting(person: User | Guest): string {\n  // kodingizni yozing ('name' in person ishlating)\n}",
      hint: "if ('name' in person) { return person.name; }",
      solution: "interface User { name: string; }\ninterface Guest { isGuest: boolean; }\n\nfunction getGreeting(person: User | Guest): string {\n  if ('name' in person) {\n    return person.name;\n  }\n  return 'Guest';\n}",
      test: "const fn = new Function('return function(person) { if (\"name\" in person) return person.name; return \"Guest\"; }')();\nconst getGreeting = fn;\nreturn getGreeting({name: 'Ali'}) === 'Ali' && getGreeting({isGuest: true}) === 'Guest';"
    },
    {
      id: 5,
      title: "5. instanceof operatori orqali",
      instruction: "Parametr o'rnida `Date` yoki `string`. Agar Date bo'lsa `.getFullYear()`, string bo'lsa undan birinchi 4 ta belgini olib son qilib qaytaring.",
      startingCode: "function getYear(val: Date | string): number {\n  // kodingizni yozing\n}",
      hint: "if (val instanceof Date)",
      solution: "function getYear(val: Date | string): number {\n  if (val instanceof Date) {\n    return val.getFullYear();\n  }\n  return parseInt(val.substring(0, 4));\n}",
      test: "const fn = new Function('return function(val) { if (val instanceof Date) return val.getFullYear(); return parseInt(val.substring(0, 4)); }')();\nconst getYear = fn;\nreturn getYear(new Date('2023-01-01')) === 2023 && getYear('2024-05') === 2024;"
    },
    {
      id: 6,
      title: "6. Type Predicates (is)",
      instruction: "O'zgaruvchi `string` ekanligini boolean qiymat va Type Predicate (`val is string`) bilan qaytaruvchi `isString` funksiyasini yozing.",
      startingCode: "function isString(val: any): val is string {\n  // kodingizni yozing\n}",
      hint: "typeof val === 'string' qaytaring",
      solution: "function isString(val: any): val is string {\n  return typeof val === 'string';\n}",
      test: "const fn = new Function('return function(val) { return typeof val === \"string\"; }')();\nconst isString = fn;\nreturn isString('salom') === true && isString(5) === false;"
    },
    {
      id: 7,
      title: "7. Discriminated Unions 1",
      instruction: "Shape interfeysi `kind: 'circle'` yoki `kind: 'square'` qabul qiladi. `getArea(shape)` yozing.",
      startingCode: "interface Circle { kind: 'circle'; radius: number; }\ninterface Square { kind: 'square'; sideLength: number; }\ntype Shape = Circle | Square;\n\nfunction getArea(shape: Shape): number {\n  // kodingizni yozing\n}",
      hint: "if (shape.kind === 'circle') return Math.PI * shape.radius ** 2;",
      solution: "interface Circle { kind: 'circle'; radius: number; }\ninterface Square { kind: 'square'; sideLength: number; }\ntype Shape = Circle | Square;\n\nfunction getArea(shape: Shape): number {\n  if (shape.kind === 'circle') {\n    return Math.PI * shape.radius ** 2;\n  }\n  return shape.sideLength ** 2;\n}",
      test: "const fn = new Function('return function(shape) { if (shape.kind === \"circle\") return Math.PI * Math.pow(shape.radius, 2); return Math.pow(shape.sideLength, 2); }')();\nconst getArea = fn;\nreturn getArea({ kind: 'square', sideLength: 4 }) === 16;"
    },
    {
      id: 8,
      title: "8. Exhaustiveness Checking (never)",
      instruction: "Avvalgi masalada xato bermasligi uchun \`default\` blokida `never` ga tenglashtirish (check) yozing.",
      startingCode: "type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; sideLength: number };\n\nfunction getAreaSafe(shape: Shape) {\n  switch(shape.kind) {\n    case 'circle': return Math.PI * shape.radius ** 2;\n    case 'square': return shape.sideLength ** 2;\n    default:\n      // kodingizni yozing: _exhaustiveCheck qilib never qiling\n  }\n}",
      hint: "const _exhaustiveCheck: never = shape; return _exhaustiveCheck;",
      solution: "type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; sideLength: number };\n\nfunction getAreaSafe(shape: Shape) {\n  switch(shape.kind) {\n    case 'circle': return Math.PI * shape.radius ** 2;\n    case 'square': return shape.sideLength ** 2;\n    default:\n      const _exhaustiveCheck: never = shape;\n      return _exhaustiveCheck;\n  }\n}",
      test: "const fn = new Function('return function(shape) { switch(shape.kind) { case \"circle\": return Math.PI * Math.pow(shape.radius, 2); case \"square\": return Math.pow(shape.sideLength, 2); default: return shape; } }')();\nconst getAreaSafe = fn;\nreturn getAreaSafe({kind:'square', sideLength:2}) === 4;"
    },
    {
      id: 9,
      title: "9. Array isArray",
      instruction: "`value` string yoki stringlar massivi bo'lishi mumkin. Qabul qilib stringlarni vergul bilan birlashtiring. `Array.isArray` dan foydalaning.",
      startingCode: "function joinStrings(value: string | string[]): string {\n  // kodingizni yozing\n}",
      hint: "if (Array.isArray(value)) return value.join(', '); return value;",
      solution: "function joinStrings(value: string | string[]): string {\n  if (Array.isArray(value)) {\n    return value.join(', ');\n  }\n  return value;\n}",
      test: "const fn = new Function('return function(value) { if (Array.isArray(value)) return value.join(\", \"); return value; }')();\nconst joinStrings = fn;\nreturn joinStrings(['A', 'B']) === 'A, B' && joinStrings('C') === 'C';"
    },
    {
      id: 10,
      title: "10. Narrowing by assignment",
      instruction: "O'zgaruvchi e'lonida bir necha xil tip bo'lsa-da, aniq qiymat berilgandan keyin TS uni tushunadi. `result` ni oldin number qilib keyin stringga tenglang va qaytaring.",
      startingCode: "function getAssigned(): string {\n  let result: string | number = 10;\n  // result ni string qilib qaytaring\n}",
      hint: "result = '10'; return result;",
      solution: "function getAssigned(): string {\n  let result: string | number = 10;\n  result = '10';\n  return result;\n}",
      test: "const fn = new Function('return function() { let result = 10; result = \"10\"; return result; }')();\nconst getAssigned = fn;\nreturn getAssigned() === '10';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Type Narrowing qanday maqsadga xizmat qiladi?",
      options: [
        "Kodning bajarilish oqimi (control flow) ga qarab keng tiplarni kichik, aniq tipga qadar toraytiradi",
        "Tiplarni bittaga ko'paytiradi",
        "Kodni xavfli qiladi",
        "Dastur xotirasini tejaydi"
      ],
      correctAnswer: 0,
      explanation: "TS kodning ichidagi mantiqiy shartlarni (masalan, if) tahlil qilib, o'sha blok ichida o'zgaruvchi aniq qanday tipda ekanligini anglab yetadi."
    },
    {
      id: 2,
      question: "`typeof` qanday ishlaydi?",
      options: [
        "Faqat TS da bor, JS da yo'q",
        "JS ning o'zida ham ishlaydi, u qiymatning turini (masalan 'string', 'number') bildiradi, TS esa shundan kelib chiqib tipni toraytiradi",
        "Obyekt ichidagi tiplarni chuqur tekshiradi",
        "Hech biri to'g'ri emas"
      ],
      correctAnswer: 1,
      explanation: "`typeof` standart JS operatori. TS shunchaki uning natijasini o'zining tiplar tizimi uchun aqlli tarzda ishlatadi."
    },
    {
      id: 3,
      question: "Truthiness Narrowing (`if(x)`) qaysi hollarda yordam bermaydi?",
      options: [
        "`x` null yoki undefined bo'lganda yordam beradi, lekin u 0 (nol) yoki bo'sh string '' bo'lsa va bu bizga kerakli qiymatlar bo'lsa ularni ham false deb o'tkazib yuboradi",
        "Hech qachon yordam bermaydi",
        "Har doim yordam beradi",
        "Faqat classlar uchun ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "if (x) tekshiruvi JS da truthy bo'lmagan har qanday narsani falsy qiladi (null, undefined dan tashqari 0, '', false larni ham). Bu ba'zida kutilmagan buglarga olib kelishi mumkin."
    },
    {
      id: 4,
      question: "`in` operatori yordamida qanday qilib narrowing qilinadi?",
      options: [
        "`if ('kalit' in obyektnomi)` orqali obyektdagi property borligiga tekshirib tipini aniqlash",
        "`in` orqali string ichida harf izlab",
        "Bu narrowing emas",
        "`in` bu TS dagi yangi tsikl turi"
      ],
      correctAnswer: 0,
      explanation: "Aynan obyektning ichida ma'lum bir `key` mavjudligini bilish, TS ga o'sha obyekt qaysi interface ekanligini ko'rsatib beradi."
    },
    {
      id: 5,
      question: "Type Predicate funksiyasining qaytish toifasi (return type) qanday yoziladi?",
      options: [
        "boolean",
        "arg is Type",
        "Type",
        "any"
      ],
      correctAnswer: 1,
      explanation: "Bunday funksiyalar yordamida `arg is SomeType` deb yozamiz. U aslida boolen qaytaradi, lekin TS uni tipni aniqlovchi vosita deb biladi."
    },
    {
      id: 6,
      question: "Obyektlarda `instanceof` bilan narrowing qilish imkoni bormi?",
      options: [
        "Ha, agar ular klassdan (yoki Date, Array kabi obyektlardan) olingan bo'lsa",
        "Yo'q, instanceof faqat primitiv tiplar uchun",
        "Ha, har qanday oddiy { } obyekt ham instanceof bilan tekshiriladi",
        "Yo'q"
      ],
      correctAnswer: 0,
      explanation: "`instanceof` obyektning prototype chain ida ko'rsatilgan klassning constructori bor-yo'qligini tekshiradi, shuning uchun u klass obyektlari uchun mukammal."
    },
    {
      id: 7,
      question: "Nima uchun `typeof null` ishlatilganda xatolar kelib chiqishi mumkin?",
      options: [
        "Chunki `typeof null` ning natijasi 'object' bo'ladi, natijada TS uni obyekt deb o'ylaydi",
        "`null` umuman typeof orqali tekshirilmaydi",
        "TS null-ni doim qabul qilmaydi",
        "null bu number dir"
      ],
      correctAnswer: 0,
      explanation: "JS ning mashhur g'alati xususiyati - typeof null === 'object'. Shu sababli null ni typeof yordamida narrowing qilish xato berishi mumkin."
    },
    {
      id: 8,
      question: "Discriminated Unions nima vazifani bajaradi?",
      options: [
        "Bir nechta interfeyslar o'xshash tuzilishga ega bo'lib, ularni faqat bitta umumiy 'literal' xususiyati (masalan 'type' yoki 'kind') orqali osongina ajratishni ta'minlaydi",
        "Massiv elementlarini sortirovka qiladi",
        "Hech qanday",
        "Type Casting ni yashirish"
      ],
      correctAnswer: 0,
      explanation: "Discriminated Unions juda mashhur shablon bo'lib, hamma obyektlarda masalan `status: 'loading' | 'success' | 'error'` bo'ladi. Shunga ko'ra narrowing oson kechadi."
    },
    {
      id: 9,
      question: "Exhaustiveness Checking qanday amaliy ahamiyatga ega?",
      options: [
        "Kompilyatsiya vaqtini tezlashtiradi",
        "Kelajakda Union ga yangi tur qo'shilganda switch/case da u holat yozilmagan bo'lsa avtomatik ravishda kompilyatsiya xatosini beradi",
        "JS xotira sızishining oldini oladi",
        "Barcha javoblar to'g'ri"
      ],
      correctAnswer: 1,
      explanation: "`never` toifasiga assign qilish faqatgina hamma mumkin bo'lgan holatlar e'tiborga olingandagina mumkin. Aks holda TS qolib ketgan holat bor deb xato beradi."
    },
    {
      id: 10,
      question: "TypeScript narrowing-ni qachon bajaradi?",
      options: [
        "Runtime da (Dastur ishlagan paytda)",
        "Compile-time da (Kod yozish va transpilyatsiya qilish paytida) control flow-ni o'qib",
        "Browser da",
        "Hech qachon avtomatik bajarmaydi, o'zimiz majburlashimiz kerak"
      ],
      correctAnswer: 1,
      explanation: "TypeScript barcha tiplarni tahlil qilishni kompilyatsiya vaqtida (Compile-time) bajaradi. JS-ga o'girilgach bu narsalar qolmaydi."
    },
    {
      id: 11,
      question: "Massivmi yoki yo'qmi tekshirish uchun qaysi narrowing ishlatiladi?",
      options: [
        "`typeof value === 'array'`",
        "`Array.isArray(value)`",
        "`value instanceof 'array'`",
        "`is array` keyword"
      ],
      correctAnswer: 1,
      explanation: "`typeof []` natijasi 'object' bo'lgani uchun, aynan massiv ekanligini isbotlash uchun `Array.isArray()` standart usul hisoblanadi."
    },
    {
      id: 12,
      question: "Faqat Narrowing qilish bilan biz kodimizning xavfsizligini ta'minlaymizmi?",
      options: [
        "Ha, lekin typeof, in va hokazolar orqali tiplar zanjiri doim mantiqan to'g'ri bo'lishi kerak. Noto'g'ri tekshiruv qilsangiz, TS ham aldanib qolishi mumkin (masalan any yoki noto'g'ri Type Predicate ishlatsangiz)",
        "Yo'q, Narrowing butunlay foydasiz",
        "Ha, kompyuter hamma narsani 100% o'zi taxmin qilib to'g'irlaydi",
        "Narrowing faqat React-da muhim"
      ],
      correctAnswer: 0,
      explanation: "TS ning Type Predicates yoki as assertion kabi narsalari inson xatosiga bog'liq. Agar Type Predicate ichida xato mantiq yozsangiz TS baribir unga ishonadi."
    }
  ]
};

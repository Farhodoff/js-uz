export const advancedTypes = {
  id: "advanced-types",
  title: "TypeScript Advanced Types (Murakkab Toifalar)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish
TypeScript-da oddiy toifalardan (string, number) tashqari, bir necha toifalarni birlashtirish yoki aniqlashtirish uchun Murakkab Toifalar (Advanced Types) mavjud. 

- **Intersection Types (\`&\`)**: Ikkita yoki undan ko'p toifani birlashtiradi (AND mantiqi).
- **Union Types (\`|\`)**: Bir necha toifadan biri bo'lishi mumkinligini bildiradi (OR mantiqi).
- **Type Guards**: Kod ichida toifani aniqlashtirish usullari (\`typeof\`, \`instanceof\`, \`in\`).
- **Type Casting (Toifani o'zgartirish)**: Kompyuterga "men bu nima ekanligini yaxshiroq bilaman" deyish (\`as\` operatori).

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON: Union tiplarida tekshirmasdan ishlatish**
\`\`\`typescript
function printId(id: number | string) {
  console.log(id.toUpperCase()); // XATO! Agar id number bo'lsa, toUpperCase() ishlamaydi.
}
\`\`\`

**✅ YAXSHI: Type Guard yordamida tekshirish**
\`\`\`typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // Bu yerda TS id albatta string ekanini biladi.
  } else {
    console.log(id); // Bu yerda esa TS id number ekanini biladi.
  }
}
\`\`\`

## 🎤 Intervyu Savollari
1. **Union va Intersection tiplarning farqi nima?**
   *Javob:* Union (\`|\`) ikki yoki undan ortiq tiplardan biriga ruxsat beradi (masalan, \`string | number\`). Intersection (\`&\`) esa bir nechta tiplarni bitta qilib birlashtiradi, ob'ektlar uchun ko'p ishlatiladi (har ikkala tip xususiyatlariga ega bo'ladi).
2. **Type Guard nima?**
   *Javob:* Biror o'zgaruvchining aniq qaysi tipga tegishli ekanligini if / else bloklari yoki maxsus funksiyalar yordamida aniqlashtirish. \`typeof\`, \`instanceof\`, yoki \`in\` operatorlari yordamida amalga oshiriladi.
3. **Type Assertion (Casting) qachon ishlatiladi?**
   *Javob:* TypeScript avtomatik ravishda to'g'ri tipni aniqlay olmaganda, lekin dasturchi aniq bilsa (\`as HTMLElement\` yoki \`<HTMLElement>...\` yordamida) ko'rsatib yuborish uchun ishlatiladi.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[Union Type: A | B] --> B(A yoki B dan birini qabul qiladi)
    C[Intersection Type: A & B] --> D(Ham A, ham B ning barcha xususiyatlarini qabul qiladi)
    E[Type Guard] --> F(typeof x === 'string')
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1. Union Type bilan ishlash",
      instruction: "`format(input: string | number)` funksiyasini yozing. Agar input string bo'lsa uning uzunligini qaytaring, agar number bo'lsa uni stringga aylantirib qaytaring.",
      startingCode: "function format(input: string | number): number | string {\n  // kodingizni yozing\n}",
      hint: "typeof input === 'string' tekshiruvidan foydalaning.",
      solution: "function format(input: string | number): number | string {\n  if (typeof input === 'string') {\n    return input.length;\n  }\n  return input.toString();\n}",
      test: "const fn = new Function('return function(input) { if (typeof input === \"string\") return input.length; return input.toString(); }')();\nconst format = fn;\nreturn format('test') === 4 && format(123) === '123';"
    },
    {
      id: 2,
      title: "2. Intersection Type (Birlashtirish)",
      instruction: "Ikkita interfeys berilgan: `Admin` va `User`. Ularning birlashmasidan iborat `AdminUser` toifasini qaytaradigan ob'ekt yarating.",
      startingCode: "interface Admin { role: string; }\ninterface User { name: string; }\ntype AdminUser = Admin & User;\n\nfunction createAdminUser(): AdminUser {\n  // kodingizni yozing\n}",
      hint: "{ role: 'admin', name: 'Ali' } qaytaring",
      solution: "interface Admin { role: string; }\ninterface User { name: string; }\ntype AdminUser = Admin & User;\n\nfunction createAdminUser(): AdminUser {\n  return { role: 'admin', name: 'Ali' };\n}",
      test: "const fn = new Function('return function() { return { role: \"admin\", name: \"Ali\" }; }')();\nconst createAdminUser = fn;\nconst res = createAdminUser();\nreturn res.role === 'admin' && res.name === 'Ali';"
    },
    {
      id: 3,
      title: "3. Type Assertion (as operatori)",
      instruction: "Uzatilgan `value` `any` toifasida, uni `string` sifatida qabul qilib `.toUpperCase()` ni chaqiring.",
      startingCode: "function forceUpper(value: any): string {\n  // kodingizni yozing\n}",
      hint: "(value as string).toUpperCase()",
      solution: "function forceUpper(value: any): string {\n  return (value as string).toUpperCase();\n}",
      test: "const fn = new Function('return function(value) { return value.toUpperCase(); }')();\nconst forceUpper = fn;\nreturn forceUpper('test') === 'TEST';"
    },
    {
      id: 4,
      title: "4. in Operator bilan Type Guard",
      instruction: "`Fish` va `Bird` interfeyslari bor. Agar ob'ektda `swim` xususiyati bo'lsa uni chaqiradigan, aks holda `fly` ni chaqiradigan funksiya yozing. Funksiya true qaytarsin.",
      startingCode: "interface Fish { swim: () => boolean; }\ninterface Bird { fly: () => boolean; }\n\nfunction move(animal: Fish | Bird): boolean {\n  // kodingizni yozing (in operatoridan foydalaning)\n}",
      hint: "if ('swim' in animal) { return animal.swim(); } return animal.fly();",
      solution: "interface Fish { swim: () => boolean; }\ninterface Bird { fly: () => boolean; }\n\nfunction move(animal: Fish | Bird): boolean {\n  if ('swim' in animal) {\n    return animal.swim();\n  }\n  return animal.fly();\n}",
      test: "const fn = new Function('return function(animal) { if (\"swim\" in animal) return animal.swim(); return animal.fly(); }')();\nconst move = fn;\nreturn move({ swim: () => true }) === true && move({ fly: () => true }) === true;"
    },
    {
      id: 5,
      title: "5. instanceof bilan Type Guard",
      instruction: "`Date` yoki `string` qabul qiladigan funksiyada, agar u Date bo'lsa `getTime()` ni, string bo'lsa uni son qilib (`Number()`) qaytaring.",
      startingCode: "function getMilliseconds(value: Date | string): number {\n  // kodingizni yozing\n}",
      hint: "if (value instanceof Date)",
      solution: "function getMilliseconds(value: Date | string): number {\n  if (value instanceof Date) {\n    return value.getTime();\n  }\n  return Number(value);\n}",
      test: "const fn = new Function('return function(value) { if (value instanceof Date) return value.getTime(); return Number(value); }')();\nconst getMilliseconds = fn;\nconst d = new Date(1000);\nreturn getMilliseconds(d) === 1000 && getMilliseconds('2000') === 2000;"
    },
    {
      id: 6,
      title: "6. Literal Types",
      instruction: "`direction` parametri faqat 'left', 'right', 'up', 'down' qiymatlarini qabul qilsin. Qabul qilib, o'sha stringni qaytarsin.",
      startingCode: "type Direction = 'left' | 'right' | 'up' | 'down';\n\nfunction moveDir(dir: Direction): string {\n  // kodingizni yozing\n}",
      hint: "Shunchaki return dir;",
      solution: "type Direction = 'left' | 'right' | 'up' | 'down';\n\nfunction moveDir(dir: Direction): string {\n  return dir;\n}",
      test: "const fn = new Function('return function(dir) { return dir; }')();\nconst moveDir = fn;\nreturn moveDir('left') === 'left';"
    },
    {
      id: 7,
      title: "7. Optional Chaining (?)",
      instruction: "User ob'ekti va uning ixtiyoriy address xususiyati bo'lishi mumkin. Agar address va city mavjud bo'lsa city-ni qaytaring, aks holda 'N/A' qaytaring.",
      startingCode: "interface UserProfile {\n  address?: { city?: string };\n}\nfunction getCity(user: UserProfile): string {\n  // kodingizni yozing\n}",
      hint: "return user.address?.city ?? 'N/A';",
      solution: "interface UserProfile {\n  address?: { city?: string };\n}\nfunction getCity(user: UserProfile): string {\n  return user.address?.city ?? 'N/A';\n}",
      test: "const fn = new Function('return function(user) { var _a; return (_a = user.address) === null || _a === void 0 ? void 0 : _a.city ? user.address.city : \"N/A\"; }')();\nconst getCity = fn;\nreturn getCity({ address: { city: 'Tashkent' } }) === 'Tashkent' && getCity({}) === 'N/A';"
    },
    {
      id: 8,
      title: "8. Nullish Coalescing (??)",
      instruction: "`value` parametri raqam, `null` yoki `undefined` bo'lishi mumkin. Agar u null/undefined bo'lsa 100 qaytaring. Agar 0 bo'lsa ham 0 ning o'zini qaytarishi muhim (ya'ni `||` emas, `??` ishlating).",
      startingCode: "function checkValue(value: number | null | undefined): number {\n  // kodingizni yozing\n}",
      hint: "return value ?? 100;",
      solution: "function checkValue(value: number | null | undefined): number {\n  return value ?? 100;\n}",
      test: "const fn = new Function('return function(value) { return value !== null && value !== void 0 ? value : 100; }')();\nconst checkValue = fn;\nreturn checkValue(0) === 0 && checkValue(null) === 100;"
    },
    {
      id: 9,
      title: "9. Index Properties",
      instruction: "Xohlagancha string kalitlar va raqamli qiymatlar qabul qiladigan `Dictionary` ob'ektini yarating.",
      startingCode: "interface Dictionary {\n  [key: string]: number;\n}\n\nfunction createDict(): Dictionary {\n  // kodingizni yozing\n}",
      hint: "{ a: 1, b: 2 } qaytaring",
      solution: "interface Dictionary {\n  [key: string]: number;\n}\n\nfunction createDict(): Dictionary {\n  return { age: 25, height: 180 };\n}",
      test: "const fn = new Function('return function() { return { age: 25 }; }')();\nconst createDict = fn;\nconst res = createDict();\nreturn typeof res.age === 'number';"
    },
    {
      id: 10,
      title: "10. Type Aliases (Toifa Taxalluslari)",
      instruction: "`ID` nomli type yarating, u `string | number` bo'lsin va uni qabul qiladigan funksiya yozing.",
      startingCode: "type ID = string | number;\nfunction checkId(id: ID): ID {\n  // kodingizni yozing\n}",
      hint: "return id;",
      solution: "type ID = string | number;\nfunction checkId(id: ID): ID {\n  return id;\n}",
      test: "const fn = new Function('return function(id) { return id; }')();\nconst checkId = fn;\nreturn checkId(5) === 5 && checkId('abc') === 'abc';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Intersection Type (A & B) qanday ishlaydi?",
      options: [
        "Faqat A tipini oladi",
        "A yoki B tipidan birini olishni talab qiladi",
        "A va B xususiyatlarini o'zida to'liq mujassamlashtiradi (birlashtiradi)",
        "Xato qaytaradi"
      ],
      correctAnswer: 2,
      explanation: "Intersection (&) ikkala tipning barcha xususiyatlarini bitta tipda birlashtiradi."
    },
    {
      id: 2,
      question: "Union Type (A | B) qanday ishlaydi?",
      options: [
        "A va B tiplarning barcha xususiyatlarini birlashtiradi",
        "A yoki B tipidagi qiymatni qabul qila oladi",
        "Kodni xavfsizroq qilmaydi, `any` bilan bir xil",
        "Faqat massivlarda ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "Union (|) yordamida o'zgaruvchi berilgan tiplardan xohlagan bittasi bo'lishi mumkinligi ko'rsatiladi."
    },
    {
      id: 3,
      question: "Type Guard nima?",
      options: [
        "Toifani kompilatorga majburan ko'rsatish (Type Casting)",
        "Dastur ishlashi davomida aniq qaysi toifa ishlatilayotganini tekshirish usuli (masalan typeof)",
        "TypeScript o'rnatuvchi dastur",
        "Faqat klasslarda ishlatiladigan himoya metodi"
      ],
      correctAnswer: 1,
      explanation: "Type Guard - bu `typeof`, `instanceof` yoki maxsus funksiyalar orqali Union tiplarning aniq qaysi biri ekanligini if/else bloki ichida aniqlashdir."
    },
    {
      id: 4,
      question: "`as` operatori nima ish qiladi (Type Casting)?",
      options: [
        "JavaScript-ga kompilatsiya bo'lganda o'zgaruvchini tipini o'zgartiradi",
        "TypeScript kompilatoriga \"bu o'zgaruvchining toifasini o'zim bilaman\" deb ko'rsatish",
        "Yangi toifa yaratadi",
        "Faqat raqamlarni string-ga o'tkazadi"
      ],
      correctAnswer: 1,
      explanation: "`as` (Type Assertion) kompilatorga tayanmasdan, o'zgaruvchining tipini o'zingiz aniq belgilab yuborish uchun ishlatiladi."
    },
    {
      id: 5,
      question: "`in` operatori TypeScript-da nima maqsadda ko'p ishlatiladi?",
      options: [
        "For loop aylantirish uchun",
        "Type Guard sifatida ob'ekt ichida xususiyat bor-yo'qligini tekshirish uchun",
        "String qidirish uchun",
        "Massiv uzunligini bilish uchun"
      ],
      correctAnswer: 1,
      explanation: "Agar ob'ektda aniq bir propertining mavjudligi uning qaysi interfeysga tegishli ekanligini bildirsa, `in` yordamida Type Guard qilinadi."
    },
    {
      id: 6,
      question: "Literal types deganda nima tushuniladi?",
      options: [
        "Faqat `string` bo'lgan tiplar",
        "Qat'iy aniq qiymatni toifa sifatida belgilash (masalan `type Dir = 'left' | 'right'` )",
        "Mantiqiy ifodalar",
        "Regex"
      ],
      correctAnswer: 1,
      explanation: "Literal tipda o'zgaruvchi qabul qilishi mumkin bo'lgan aniq bir string, raqam yoki boolean qiymatlar ko'rsatiladi."
    },
    {
      id: 7,
      question: "Index Properties nima?",
      options: [
        "Faqat array indekslari",
        "`[key: string]: any;` ko'rinishida yozilib, ob'ekt xohlagancha qo'shimcha dinamik xususiyatlar qabul qila olishi",
        "Index.html faylini ko'rsatuvchi propertilar",
        "Bunday tushuncha yo'q"
      ],
      correctAnswer: 1,
      explanation: "Ob'ektning barcha kalitlari oldindan ma'lum bo'lmaganda `[key: string]: type` sintaksisi orqali dinamik xususiyatlarga ruxsat beriladi."
    },
    {
      id: 8,
      question: "`nullish coalescing` operatori (`??`) `||` (OR) dan nimasi bilan farq qiladi?",
      options: [
        "Hech qanday farqi yo'q",
        "`??` faqat `null` yoki `undefined` ni e'tiborga oladi, `||` esa 0, '', false kabi barcha falsy qiymatlarni ham e'tiborga oladi",
        "`??` faqat raqamlar bilan ishlaydi",
        "`||` faqat TypeScript-da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`??` ishlatilganda, agar chap tomon 0 yoki bo'sh string bo'lsa ham shu o'zi olinadi. Faqat null yoki undefined bo'lsagina o'ng tomonga o'tiladi."
    },
    {
      id: 9,
      question: "Optional chaining (`?.`) nega foydali?",
      options: [
        "JS ishlashini tezlashtiradi",
        "Agar ob'ekt yoki xususiyat mavjud bo'lmasa, dastur qotib qolishini (TypeError) oldini oladi va undefined qaytaradi",
        "Kodni qisqartirmaydi, lekin chiroyli qiladi",
        "Faqat class larda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`obj?.prop?.subProp` yozilganda, agar `obj` yoki `prop` null bo'lsa xato berish o'rniga xavfsizgina undefined qaytaradi."
    },
    {
      id: 10,
      question: "`type` va `interface` asosiy farqlaridan biri nima?",
      options: [
        "Type Union va Intersection qila oladi, Interface ko'proq obyekt shaklini tasvirlashga (extends) moslangan",
        "Type umuman ishlatilmaydi",
        "Interface faqat React-da ishlaydi",
        "Ikkalasi mutlaqo bir xil"
      ],
      correctAnswer: 0,
      explanation: "`type` orqali Union (|) yoki Tuple yozish qulay, `interface` esa obyekt va class strukturalari uchun kengaytirishga (extends) moslashtirilgan."
    },
    {
      id: 11,
      question: "`Discriminated Unions` nima uchun kerak?",
      options: [
        "Union tiplarda umumiy biror xususiyatni (masalan `type: 'success' | 'error'`) belgilab, o'sha orqali tiplarni oson ajratib (Type Guard) olish uchun",
        "Tiplarni bloklash uchun",
        "Tizim xavfsizligi uchun",
        "Faqat Redux uchun kerak"
      ],
      correctAnswer: 0,
      explanation: "Bir xil nomli lekin qiymati har xil literal xususiyat (masalan `kind` yoki `type`) orqali ob'ektlarni if/switch orqali xavfsiz va tez ajratib olish (Discriminated Unions) JS va TS da juda ommabop shablondir."
    },
    {
      id: 12,
      question: "Type Assertion ning qanday ikkita yozilishi mavjud?",
      options: [
        "`as Type` va `<Type>value`",
        "`value: Type` va `value = Type`",
        "`typeof value` va `instanceof value`",
        "`value => Type` va `Type => value`"
      ],
      correctAnswer: 0,
      explanation: "TypeScript da toifani tasdiqlash uchun `value as SomeType` yoki `<SomeType>value` ishlatiladi. JSX (React) muhitida faqat `as` ishlatiladi chunki `< >` taglar bilan adashib ketadi."
    }
  ]
};

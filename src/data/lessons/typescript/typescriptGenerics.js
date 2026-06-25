export const typescriptGenerics = {
  id: "typescript-generics",
  title: "TypeScript Generics (Umumlashgan Toifalar)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish
Generics (Umumlashgan Toifalar) - bu TypeScript-da xuddi funksiyalar uchun argumentlar kabi ishlaydigan tushuncha. Ammo ular qiymatlarni emas, balki **toifalarni (types)** qabul qiladi. Ular yordamida har xil turdagi ma'lumotlar bilan ishlashi mumkin bo'lgan, qayta ishlatiladigan va turlari xavfsiz (type-safe) kod yozishimiz mumkin.

Tasavvur qiling, sizda bir quti bor. Qutiga faqat "olma" solsa bo'ladi desangiz, ertaga "nok" sololmaysiz. Lekin qutining o'zini qandaydir bir T narsa solinadigan quti deb e'lon qilsangiz, qachon "olma" uchun quti ochsangiz, faqat "olma" solasiz, "nok" uchun ochsangiz faqat "nok".

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON: \`any\` ishlatish (Toifa xavfsizligini yo'qotish)**
\`\`\`typescript
function getFirstElement(arr: any[]) {
  return arr[0]; // Qaytayotgan ma'lumot tipi ham 'any' bo'ladi
}

const num = getFirstElement([1, 2, 3]);
num.toUpperCase(); // XATO yo'q! Lekin ishga tushirganda xatolik beradi, chunki raqamda toUpperCase yo'q.
\`\`\`

**✅ YAXSHI: Generics ishlatish**
\`\`\`typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirstElement<number>([1, 2, 3]);
// num.toUpperCase(); // ❌ TypeScript bu yerda xatoni darhol ushlaydi, chunki num tipi 'number'.
\`\`\`

## 🎤 Intervyu Savollari
1. **Generic'lar o'zi nima va nega \`any\` o'rniga ularni ishlatish kerak?**
   *Javob:* Generics kodning qayta ishlatiluvchanligini oshirib, toifa xavfsizligini (type safety) saqlaydi. \`any\` ishlatilganda, kompyuter toifalarni tekshirishni to'xtatadi. Generics esa aynan qaysi toifa ekanligini ushlab turadi.
2. **Generics-dagi \`T\`, \`K\`, \`V\` nima degani?**
   *Javob:* Bular shunchaki o'zgaruvchi nomlari. \`T\` (Type), \`K\` (Key), \`V\` (Value) deb nomlash qabul qilingan kelishuvdir. Hohlasak \`MyType\` deb ham nomlash mumkin.
3. **Generic Constraint (Cheklov) nima?**
   *Javob:* Generic toifaga ma'lum bir shart qo'yish (masalan, \`T extends { length: number }\`). Shunda faqat \`length\` xususiyati bor toifalar (masalan, string, array) uzatilishi mumkin.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[Generic Funksiya: identity<T>(arg: T)] --> B(Chaqirish: identity<string>('salom'))
    A --> C(Chaqirish: identity<number>(42))
    B --> D[Qaytaradi: string]
    C --> E[Qaytaradi: number]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1. Eng oddiy Generic funksiya",
      instruction: "Generic `identity<T>` funksiyasini yozing. U o'ziga berilgan `arg` ni xuddi shunday qaytarsin.",
      startingCode: "function identity<T>(arg: T): T {\n  // kodingizni yozing\n}",
      hint: "Shunchaki return arg qiling",
      solution: "function identity<T>(arg: T): T {\n  return arg;\n}",
      test: "const fn = new Function('return function(arg) { return arg; }')();\nconst identity = fn; \nreturn identity(5) === 5 && identity('salom') === 'salom';"
    },
    {
      id: 2,
      title: "2. Generic Array",
      instruction: "Array-ning faqat birinchi elementini qaytaruvchi `getFirst<T>` funksiyasini yozing.",
      startingCode: "function getFirst<T>(arr: T[]): T | undefined {\n  // kodingizni yozing\n}",
      hint: "arr[0] ni qaytaring",
      solution: "function getFirst<T>(arr: T[]): T | undefined {\n  return arr[0];\n}",
      test: "const fn = new Function('return function(arr) { return arr[0]; }')();\nconst getFirst = fn;\nreturn getFirst([10, 20]) === 10 && getFirst(['a', 'b']) === 'a';"
    },
    {
      id: 3,
      title: "3. Ikkita Generic Parametr",
      instruction: "Ikkita turli toifadagi parametrlarni (a va b) qabul qilib, ularni massivda qaytaruvchi `pair<T, U>` funksiyasini yarating.",
      startingCode: "function pair<T, U>(a: T, b: U): [T, U] {\n  // kodingizni yozing\n}",
      hint: "return [a, b] qiling",
      solution: "function pair<T, U>(a: T, b: U): [T, U] {\n  return [a, b];\n}",
      test: "const fn = new Function('return function(a, b) { return [a, b]; }')();\nconst pair = fn;\nconst res = pair(1, 'one');\nreturn res[0] === 1 && res[1] === 'one';"
    },
    {
      id: 4,
      title: "4. Generic Class (Quti)",
      instruction: "`Box<T>` class-ini yozing. Unda `content: T` property bo'lsin. Konstruktor uni qabul qilsin va `getContent(): T` metodi uni qaytarsin.",
      startingCode: "class Box<T> {\n  content: T;\n  constructor(c: T) {\n    this.content = c;\n  }\n  getContent(): T {\n    // kodingizni yozing\n  }\n}",
      hint: "return this.content",
      solution: "class Box<T> {\n  content: T;\n  constructor(c: T) {\n    this.content = c;\n  }\n  getContent(): T {\n    return this.content;\n  }\n}",
      test: "const fn = new Function('return class Box { constructor(c) { this.content = c; } getContent() { return this.content; } }')();\nconst Box = fn;\nconst b = new Box(42);\nreturn b.getContent() === 42;"
    },
    {
      id: 5,
      title: "5. Generic Constraints (Cheklovlar)",
      instruction: "`length` propertysi mavjud bo'lgan argumentni qabul qilib, uning uzunligini qaytaruvchi `getLength<T extends { length: number }>(item: T)` funksiyasini yozing.",
      startingCode: "function getLength<T extends { length: number }>(item: T): number {\n  // kodingizni yozing\n}",
      hint: "item.length ni qaytaring",
      solution: "function getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}",
      test: "const fn = new Function('return function(item) { return item.length; }')();\nconst getLength = fn;\nreturn getLength('salom') === 5 && getLength([1, 2, 3]) === 3;"
    },
    {
      id: 6,
      title: "6. Generic Interface",
      instruction: "`KeyValue<K, V>` interface asosida obyekt yarating va u orqali qiymat saqlang.",
      startingCode: "interface KeyValue<K, V> {\n  key: K;\n  value: V;\n}\n\nfunction makeKeyValue<K, V>(k: K, v: V): KeyValue<K, V> {\n  // kodingizni yozing\n}",
      hint: "Ob'ekt qaytaring: { key: k, value: v }",
      solution: "interface KeyValue<K, V> {\n  key: K;\n  value: V;\n}\n\nfunction makeKeyValue<K, V>(k: K, v: V): KeyValue<K, V> {\n  return { key: k, value: v };\n}",
      test: "const fn = new Function('return function(k, v) { return { key: k, value: v }; }')();\nconst makeKeyValue = fn;\nconst obj = makeKeyValue('id', 123);\nreturn obj.key === 'id' && obj.value === 123;"
    },
    {
      id: 7,
      title: "7. Obyektni Generic bilan nusxalash",
      instruction: "Ikkita ob'ektni qabul qilib ularni birlashtiruvchi `merge<U, V>(obj1: U, obj2: V)` funksiyasini yozing.",
      startingCode: "function merge<U, V>(obj1: U, obj2: V): U & V {\n  // kodingizni yozing\n}",
      hint: "return { ...obj1, ...obj2 };",
      solution: "function merge<U, V>(obj1: U, obj2: V): U & V {\n  return { ...obj1, ...obj2 };\n}",
      test: "const fn = new Function('return function(obj1, obj2) { return Object.assign({}, obj1, obj2); }')();\nconst merge = fn;\nconst res = merge({ a: 1 }, { b: 2 });\nreturn res.a === 1 && res.b === 2;"
    },
    {
      id: 8,
      title: "8. Default Generic Types",
      instruction: "Generic uchun default (standart) tip bering: `function createArray<T = string>(length: number, value: T): T[]`",
      startingCode: "function createArray<T = string>(length: number, value: T): T[] {\n  // kodingizni yozing\n}",
      hint: "Array(length).fill(value)",
      solution: "function createArray<T = string>(length: number, value: T): T[] {\n  return Array(length).fill(value);\n}",
      test: "const fn = new Function('return function(length, value) { return Array(length).fill(value); }')();\nconst createArray = fn;\nconst res = createArray(3, 'x');\nreturn res.length === 3 && res[0] === 'x';"
    },
    {
      id: 9,
      title: "9. Generic yordamida obyekt kalitlarini o'qish (keyof T)",
      instruction: "Obyekt va uning kalitini qabul qilib qiymatini qaytaruvchi funksiya yozing: `getProperty<T, K extends keyof T>(obj: T, key: K)`",
      startingCode: "function getProperty<T, K extends keyof T>(obj: T, key: K) {\n  // kodingizni yozing\n}",
      hint: "return obj[key]",
      solution: "function getProperty<T, K extends keyof T>(obj: T, key: K) {\n  return obj[key];\n}",
      test: "const fn = new Function('return function(obj, key) { return obj[key]; }')();\nconst getProperty = fn;\nreturn getProperty({x: 10, y: 20}, 'x') === 10;"
    },
    {
      id: 10,
      title: "10. Generic Qidiruv (Search)",
      instruction: "Generic massivdan shartga javob beruvchi elementni topadigan `findItem<T>(arr: T[], predicate: (item: T) => boolean)` funksiyasini yozing.",
      startingCode: "function findItem<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {\n  // kodingizni yozing\n}",
      hint: "return arr.find(predicate)",
      solution: "function findItem<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {\n  return arr.find(predicate);\n}",
      test: "const fn = new Function('return function(arr, predicate) { return arr.find(predicate); }')();\nconst findItem = fn;\nreturn findItem([1,2,3], x => x === 2) === 2;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Generics nima?",
      options: [
        "Faqat massivlar bilan ishlaydigan ma'lumot turi",
        "Turlarni (types) parametr sifatida uzatish mexanizmi",
        "React-ning maxsus kutubxonasi",
        "Xatolarni tekshirmaydigan `any` ning bir ko'rinishi"
      ],
      correctAnswer: 1,
      explanation: "Generics yordamida tiplarni o'zgaruvchi (parametr) kabi boshqa funksiya, class yoki interfeyslarga uzatish mumkin."
    },
    {
      id: 2,
      question: "Generic constraint (cheklov) qanday yoziladi?",
      options: [
        "<T implements Array>",
        "<T super Object>",
        "<T extends SomeType>",
        "<T restricts SomeType>"
      ],
      correctAnswer: 2,
      explanation: "`extends` kalit so'zi orqali Generic tipga ma'lum bir cheklov (constraint) qo'yiladi."
    },
    {
      id: 3,
      question: "Nima uchun Generics o'rniga har doim `any` ishlatmaymiz?",
      options: [
        "`any` tezroq ishlaydi, lekin hajmi katta",
        "`any` toifa tekshiruvini umuman o'chirib qo'yadi va xavfsizlikni buzadi",
        "`any` faqat obyektlar uchun",
        "TypeScript-da `any` endi umuman ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "`any` TypeScript-ning eng asosiy afzalligi bo'lgan Type Safety'ni yo'q qiladi, Generics esa uni saqlab qoladi."
    },
    {
      id: 4,
      question: "Klasslarda Generics qanday e'lon qilinadi?",
      options: [
        "class Box<T> { }",
        "class <T>Box { }",
        "GenericClass Box<T> { }",
        "class Box(T) { }"
      ],
      correctAnswer: 0,
      explanation: "Klass nomidan so'ng <T> orqali Generic e'lon qilinadi."
    },
    {
      id: 5,
      question: "Interfeyslarda Generics-ni qanday ishlatish mumkin?",
      options: [
        "interface Box(T) {}",
        "interface Box { T: generic; }",
        "interface Box<T> { value: T; }",
        "Interfeyslarda Generics ishlatib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Interfeys nomidan keyin <T> yoziladi va u ichidagi xususiyatlar uchun tip sifatida ishlatilishi mumkin."
    },
    {
      id: 6,
      question: "Funksiyada ko'p Generic parametr qabul qilish qanday yoziladi?",
      options: [
        "function fn<T, U>(a: T, b: U)",
        "function fn(T, U)(a: T, b: U)",
        "function fn<T & U>(a: T, b: U)",
        "function <T><U>fn(a: T, b: U)"
      ],
      correctAnswer: 0,
      explanation: "Vergul bilan ajratilgan holda bir nechta Generic parametr uzatish mumkin."
    },
    {
      id: 7,
      question: "`keyof` operatori Generics bilan qanday maqsadlarda ishlatiladi?",
      options: [
        "Obyekt qiymatlarini olish uchun",
        "Obyektning xususiyat kalitlariga qat'iy toifa belgilash uchun (masalan K extends keyof T)",
        "Yangi obyekt yaratish uchun",
        "Generics-ni bloklash uchun"
      ],
      correctAnswer: 1,
      explanation: "`keyof T` orqali obyekt kalitlari ro'yxatini olish va bu orqali toifalar yozish mumkin."
    },
    {
      id: 8,
      question: "Default Generic Tip qanday yoziladi?",
      options: [
        "<T: string>",
        "<T == string>",
        "<T = string>",
        "<T is string>"
      ],
      correctAnswer: 2,
      explanation: "<T = string> orqali tip ko'rsatilmaganda avtomatik `string` tipi qo'llaniladi."
    },
    {
      id: 9,
      question: "Generics faqat TypeScript'ga xosmi yoki toza JavaScript'da ham mavjudmi?",
      options: [
        "Toza JavaScript-da ham xuddi shunday bor",
        "Faqat TypeScript-ga (va ba'zi boshqa strongly-typed tillarga) xos, kompilatsiya paytida JS-dan o'chib ketadi",
        "Brauzerlarda JS ichida <T> kabi ishlatsa bo'ladi",
        "Node.js'da ishlatsa bo'ladi, brauzerda yo'q"
      ],
      correctAnswer: 1,
      explanation: "Generics – kompilatsiya bosqichida turlarni tekshirish uchun kerak, brauzer yoki Node.js dagi toza JavaScript'da bunday narsa yo'q."
    },
    {
      id: 10,
      question: "Array<number> va number[] farqi nimada?",
      options: [
        "Ikkalasi mutlaqo bir xil ma'noni anglatadi",
        "Array<number> faqat o'qish uchun",
        "number[] faqat TypeScript 3.0 gacha ishlagan",
        "Array<number> bu obyektdir, number[] esa massivdir"
      ],
      correctAnswer: 0,
      explanation: "Sintaksisi boshqacha xolos, ikkalasi ham butun sonlardan iborat massivni anglatadi."
    },
    {
      id: 11,
      question: "Keling `function merge<U, V>(obj1: U, obj2: V)` dedik, bu funksiya nima qaytarishi mumkin?",
      options: [
        "Faqat `any`",
        "`U & V` tipini, ya'ni ikkala turdagi xususiyatlar birlashmasi (Intersection type)",
        "Faqat `U` tipini",
        "Xato beradi, ikkita generic bo'lishi mumkin emas"
      ],
      correctAnswer: 1,
      explanation: "Intersection type (`&`) orqali ikkala ob'ekt xususiyatlari birlashtirib qaytarilishi TypeScript-da juda keng tarqalgan amaliyotdir."
    },
    {
      id: 12,
      question: "`const x = <T>(arg: T) => arg;` Bu nima?",
      options: [
        "Bu JSX (React) dagi tag",
        "Arrow funksiyalarida Generics yozilish usuli",
        "Obyekt e'lon qilish turi",
        "Syntax error"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarda Generics `(arg: T) => arg` ko'rinishida yoziladi (React TSX'da <T,> deb yozishga to'g'ri kelishi mumkin, ammo sof TS da shunday)."
    }
  ]
};

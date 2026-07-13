export const typescriptGenerics = {
  id: "typescript-generics",
  title: "TypeScript Generics (Umumlashgan Toifalar)",
  language: "typescript",
  theory: `## Part 1: Beginner Analogy

Tasavvur qiling, sizda sehrli quti (box) bor. Bu qutiga nima solsangiz, quti xuddi shu narsaning shaklini oladi. Agar olma solsangiz, quti "Olma qutisi"ga aylanadi va unga boshqa hech narsa (masalan, nok yoki banan) solib bo'lmaydi. Agar ichiga kitob solsangiz, u "Kitob qutisi" bo'lib qoladi. 

TypeScript-dagi **Generics (Umumlashgan Toifalar)** xuddi shu sehrli qutiga o'xshaydi. Biz funksiya, sinf (class) yoki interfeys yaratayotganimizda, ular qanday toifadagi (type) ma'lumot bilan ishlashini oldindan aytmaymiz. O'rniga bitta "placeholder" (odatda \`T\`) qoldiramiz. Dastur ishlagan paytda unga qanday toifa bersak, u aynan shu toifa bilan ishlaydigan qat'iy va xavfsiz (type-safe) kodga aylanadi. Bu bizga bitta kodni qayta-qayta har xil toifalar uchun yozish o'rniga, bitta "sehrli" va moslashuvchan kod yozish imkonini beradi.

## Part 2: Deep Dive (Under the hood, memory, TS Compiler (tsc), type erasure, performance)

**Type Erasure (Toifalarning o'chirilishi):**
Generics — bu faqat TypeScript kompilatori (tsc) uchun kerak bo'lgan konsept. Kod JavaScript-ga o'girilganda (compile bo'lganda), barcha generic parametrlar (masalan, \`<T>\`) to'liq o'chirib tashlanadi (Type Erasure). Bu shuni anglatadiki, runtime (ishlash vaqti) da hech qanday generic yoki type tekshiruvi bo'lmaydi. JS dvigateli faqat oddiy JavaScript kodini ko'radi.

**Memory va Performance:**
Kompilatsiya jarayonida TypeScript kompilatori barcha tip tekshiruvlarini xotirada (memory) amalga oshiradi. Generics qanchalik murakkab bo'lsa (masalan, chuqur nested generics yoki conditional types), \`tsc\` uchun shuncha ko'p xotira va vaqt talab etiladi. Biroq runtime-da (JavaScript ishlagan paytda) Generics hech qanday qo'shimcha xotira yoki resurs talab qilmaydi, chunki ular to'liq olib tashlangan bo'ladi (zero-cost abstraction).

**\`any\` bilan farqi:**
Ko'pincha yangi o'rganuvchilar \`any\` ishlatib toifa xatolaridan qochishga urinishadi. \`any\` kompilatorga "Bu o'zgaruvchini tekshirma, u har qanday narsa bo'lishi mumkin" deb aytadi. Natijada siz avtokomplit (intellisense) va toifa xavfsizligidan mahrum bo'lasiz. Generics esa kompilatorga "Men bu yerga qandaydir toifa beraman va shu toifa butun funksiya bo'ylab bir xil bo'lib qoladi" deb aytadi.

## Part 3: Edge Cases va Senior Interview Questions

**Edge Cases:**
Ba'zan Generics shunchalik moslashuvchan bo'lib ketadiki, ular har qanday narsani qabul qila oladigan darajaga kelib qoladi. Buning oldini olish uchun **Generic Constraints (Cheklovlar)** ishlatiladi: \`T extends SomeInterface\`. Yoki bo'lmasa, Conditional Types (Shartli toifalar) orqali toifalarni dinamik ravishda o'zgartirish mumkin.

**Senior Interview Questions:**
1. **Savol:** \`any\` va \`unknown\` o'rtasida farq nima va ularni Generics bilan qanday taqqoslaysiz?
   **Javob:** \`any\` har qanday amalni bajarishga ruxsat beradi (type checking o'chadi). \`unknown\` esa \`any\` ga o'xshaydi, lekin biror amal bajarishdan oldin uning turini aniqlashni (type narrowing) talab qiladi. Generics esa biz aniq turini biladigan va turini dinamik ravishda belgilaydigan holatlarda ishlatiladi, u toifa xavfsizligini 100% ta'minlaydi.
2. **Savol:** Generic constraint (\`extends\`) qachon va nega kerak bo'ladi?
   **Javob:** Agar Generic parametrimiz faqat ma'lum bir xususiyatlarga (masalan, \`length\` property'siga) ega bo'lishi shart bo'lsa, \`<T extends { length: number }>\` deb cheklov qo'yamiz. Busiz kompilator T toifasi \`length\` ga ega ekanligini kafolatlay olmaydi va xato beradi.
3. **Savol:** Qachon Generics ishlatish OVERKILL (ortiqcha) hisoblanadi?
   **Javob:** Agar generic tip faqat bitta joyda ishlatilayotgan bo'lsa va uning natijasi qandaydir boshqa tip bilan bog'lanmagan bo'lsa. Bunday holda to'g'ridan-to'g'ri interfeys yoki \`unknown\` ishlatish kodni soddaroq qiladi.

## Mermaid Diagram

\`\`\`mermaid
graph TD
    A[Generics identity T] -->|T = string| B(identity string)
    A -->|T = number| C(identity number)
    B --> D[Qaytaradi: Salom]
    C --> E[Qaytaradi: 42]
    D -.-> F[Type Erasure JS da shunchaki funksiya qoladi]
    E -.-> F
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1. Oddiy Generic Funksiya",
      instruction: "O'ziga berilgan argumentni aynan o'zini qaytaradigan `identity<T>` funksiyasini yozing.",
      startingCode: "function identity<T>(arg: T): T {\n  // kodingizni yozing\n}",
      hint: "arg ni qaytaring",
      solution: "function identity<T>(arg: T): T {\n  return arg;\n}",
      test: "const fn = new Function('return function(arg) { return arg; }')();\nconst identity = fn; \nreturn identity(5) === 5 && identity('salom') === 'salom';"
    },
    {
      id: 2,
      title: "2. Generic Array Elementi",
      instruction: "Massivning birinchi elementini qaytaruvchi `getFirst<T>` funksiyasini yozing.",
      startingCode: "function getFirst<T>(arr: T[]): T | undefined {\n  // kodingizni yozing\n}",
      hint: "arr[0] qiling",
      solution: "function getFirst<T>(arr: T[]): T | undefined {\n  return arr[0];\n}",
      test: "const fn = new Function('return function(arr) { return arr[0]; }')();\nconst getFirst = fn;\nreturn getFirst([10, 20]) === 10 && getFirst(['a', 'b']) === 'a';"
    },
    {
      id: 3,
      title: "3. Ikkita Generic Parametr",
      instruction: "Ikkita turli toifadagi parametrlarni qabul qilib, ularni massivda qaytaruvchi `pair<T, U>` funksiyasini yarating.",
      startingCode: "function pair<T, U>(a: T, b: U): [T, U] {\n  // kodingizni yozing\n}",
      hint: "return [a, b] qiling",
      solution: "function pair<T, U>(a: T, b: U): [T, U] {\n  return [a, b];\n}",
      test: "const fn = new Function('return function(a, b) { return [a, b]; }')();\nconst pair = fn;\nconst res = pair(1, 'one');\nreturn res[0] === 1 && res[1] === 'one';"
    },
    {
      id: 4,
      title: "4. Generic Class",
      instruction: "`Box<T>` class-ini yozing. Unda `content: T` xususiyati bo'lsin. `getContent()` metodi shu xususiyatni qaytarsin.",
      startingCode: "class Box<T> {\n  content: T;\n  constructor(c: T) {\n    this.content = c;\n  }\n  getContent(): T {\n    // kodingizni yozing\n  }\n}",
      hint: "this.content ni qaytaring",
      solution: "class Box<T> {\n  content: T;\n  constructor(c: T) {\n    this.content = c;\n  }\n  getContent(): T {\n    return this.content;\n  }\n}",
      test: "const fn = new Function('return class Box { constructor(c) { this.content = c; } getContent() { return this.content; } }')();\nconst Box = fn;\nconst b = new Box(42);\nreturn b.getContent() === 42;"
    },
    {
      id: 5,
      title: "5. Generic Constraints",
      instruction: "`length` xususiyati mavjud bo'lgan argumentni qabul qilib, uning uzunligini qaytaruvchi `getLength<T extends { length: number }>(item: T)` funksiyasini yozing.",
      startingCode: "function getLength<T extends { length: number }>(item: T): number {\n  // kodingizni yozing\n}",
      hint: "item.length ni qaytaring",
      solution: "function getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}",
      test: "const fn = new Function('return function(item) { return item.length; }')();\nconst getLength = fn;\nreturn getLength('salom') === 5 && getLength([1, 2, 3]) === 3;"
    },
    {
      id: 6,
      title: "6. Generic Interface",
      instruction: "`KeyValue<K, V>` interface asosida ob'ekt yarating va u orqali qiymat saqlang.",
      startingCode: "interface KeyValue<K, V> {\n  key: K;\n  value: V;\n}\n\nfunction makeKeyValue<K, V>(k: K, v: V): KeyValue<K, V> {\n  // kodingizni yozing\n}",
      hint: "{ key: k, value: v } qaytaring",
      solution: "interface KeyValue<K, V> {\n  key: K;\n  value: V;\n}\n\nfunction makeKeyValue<K, V>(k: K, v: V): KeyValue<K, V> {\n  return { key: k, value: v };\n}",
      test: "const fn = new Function('return function(k, v) { return { key: k, value: v }; }')();\nconst makeKeyValue = fn;\nconst obj = makeKeyValue('id', 123);\nreturn obj.key === 'id' && obj.value === 123;"
    },
    {
      id: 7,
      title: "7. Ob'ektni Generic bilan nusxalash (Merge)",
      instruction: "Ikkita ob'ektni qabul qilib ularni birlashtiruvchi `merge<U, V>(obj1: U, obj2: V)` funksiyasini yozing.",
      startingCode: "function merge<U, V>(obj1: U, obj2: V): U & V {\n  // kodingizni yozing\n}",
      hint: "return { ...obj1, ...obj2 };",
      solution: "function merge<U, V>(obj1: U, obj2: V): U & V {\n  return { ...obj1, ...obj2 };\n}",
      test: "const fn = new Function('return function(obj1, obj2) { return Object.assign({}, obj1, obj2); }')();\nconst merge = fn;\nconst res = merge({ a: 1 }, { b: 2 });\nreturn res.a === 1 && res.b === 2;"
    },
    {
      id: 8,
      title: "8. Default Generic Types",
      instruction: "Generic uchun standart (default) tip bering: `createArray<T = string>(length: number, value: T): T[]`",
      startingCode: "function createArray<T = string>(length: number, value: T): T[] {\n  // kodingizni yozing\n}",
      hint: "Array(length).fill(value)",
      solution: "function createArray<T = string>(length: number, value: T): T[] {\n  return Array(length).fill(value);\n}",
      test: "const fn = new Function('return function(length, value) { return Array(length).fill(value); }')();\nconst createArray = fn;\nconst res = createArray(3, 'x');\nreturn res.length === 3 && res[0] === 'x';"
    },
    {
      id: 9,
      title: "9. keyof T bilan ishlash",
      instruction: "Ob'ekt va uning kalitini qabul qilib qiymatini qaytaruvchi funksiya yozing: `getProperty<T, K extends keyof T>(obj: T, key: K)`",
      startingCode: "function getProperty<T, K extends keyof T>(obj: T, key: K) {\n  // kodingizni yozing\n}",
      hint: "obj[key] qaytaring",
      solution: "function getProperty<T, K extends keyof T>(obj: T, key: K) {\n  return obj[key];\n}",
      test: "const fn = new Function('return function(obj, key) { return obj[key]; }')();\nconst getProperty = fn;\nreturn getProperty({x: 10, y: 20}, 'x') === 10;"
    },
    {
      id: 10,
      title: "10. Generic Qidiruv (find)",
      instruction: "Generic massivdan shartga mos elementni topadigan `findItem<T>(arr: T[], predicate: (item: T) => boolean)` funksiyasini yozing.",
      startingCode: "function findItem<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {\n  // kodingizni yozing\n}",
      hint: "arr.find(predicate)",
      solution: "function findItem<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {\n  return arr.find(predicate);\n}",
      test: "const fn = new Function('return function(arr, predicate) { return arr.find(predicate); }')();\nconst findItem = fn;\nreturn findItem([1,2,3], x => x === 2) === 2;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Generics o'zi nima?",
      options: [
        "Faqat massivlar bilan ishlaydigan ma'lumot turi",
        "Turlarni (types) o'zgaruvchi sifatida uzatish mexanizmi",
        "React-ning maxsus funksiyasi",
        "`any` ning xavfsiz versiyasi"
      ],
      correctAnswer: 1,
      explanation: "Generics yordamida tiplarni parametr kabi boshqa funksiya, class yoki interfeyslarga uzatish mumkin."
    },
    {
      id: 2,
      question: "Generic constraint (cheklov) uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "implements",
        "super",
        "extends",
        "restricts"
      ],
      correctAnswer: 2,
      explanation: "`extends` kalit so'zi orqali Generic tipga ma'lum bir cheklov (constraint) qo'yiladi (masalan, T extends object)."
    },
    {
      id: 3,
      question: "Generics va `any` ning asosiy farqi nimada?",
      options: [
        "`any` tezroq ishlaydi",
        "`any` toifa tekshiruvini o'chiradi, Generics esa xavfsizlikni (Type Safety) ta'minlaydi",
        "`any` faqat obyektlar uchun",
        "Farqi yo'q, ikkalasi bir xil"
      ],
      correctAnswer: 1,
      explanation: "`any` TypeScript-ning afzalliklarini yo'q qiladi, Generics esa dinamik tur bilan xavfsizlikni saqlab qoladi."
    },
    {
      id: 4,
      question: "TypeScript kodi JavaScript-ga kompilatsiya qilinganda Generics bilan nima yuz beradi?",
      options: [
        "Ular JavaScript classlariga aylanadi",
        "Ular maxsus TypeScript Runtime orqali ishlaydi",
        "Ular butunlay o'chirib tashlanadi (Type Erasure)",
        "Ular `any` toifasiga o'zgartiriladi"
      ],
      correctAnswer: 2,
      explanation: "JavaScript-da tushuncha sifatida Generics yo'q, shuning uchun TypeScript ularni runtime'da butunlay o'chirib tashlaydi (Type Erasure)."
    },
    {
      id: 5,
      question: "Interfeyslarda Generics to'g'ri ishlatilgan qatorni toping:",
      options: [
        "interface Box(T) {}",
        "interface Box { T: generic; }",
        "interface Box<T> { value: T; }",
        "Interfeyslarda Generics yozib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Interfeys nomidan keyin <T> yoziladi va u ichidagi xususiyatlar uchun tip sifatida ishlatilishi mumkin."
    },
    {
      id: 6,
      question: "Funksiyada ko'p Generic parametrlarni qanday uzatamiz?",
      options: [
        "function fn<T, U>(a: T, b: U)",
        "function fn(T, U)(a: T, b: U)",
        "function fn<T & U>(a: T, b: U)",
        "function <T><U>fn(a: T, b: U)"
      ],
      correctAnswer: 0,
      explanation: "Vergul bilan ajratilgan holda bir nechta Generic parametrlar uzatish mumkin (masalan, <T, U, V>)."
    },
    {
      id: 7,
      question: "`keyof` operatori nima vazifa bajaradi?",
      options: [
        "Obyekt qiymatlarini array qilib qaytaradi",
        "Obyektning xususiyat kalitlaridan iborat union type yaratadi",
        "Yangi obyekt yaratish uchun ishlatiladi",
        "Turlarni tekshirishni o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "`keyof T` orqali obyektning barcha kalitlarini birlashtiruvchi type (Union) hosil qilinadi."
    },
    {
      id: 8,
      question: "Default Generic Tip qanday belgilanadi?",
      options: [
        "<T: string>",
        "<T == string>",
        "<T is string>",
        "<T = string>"
      ],
      correctAnswer: 3,
      explanation: "<T = string> ko'rinishida yozilganda, tip berilmasa u avtomatik ravishda `string` bo'lib qabul qilinadi."
    },
    {
      id: 9,
      question: "Arrow funksiyalarda Generic qanday yoziladi?",
      options: [
        "const fn = <T>(arg: T) => arg;",
        "const fn = function<T>(arg: T) => arg;",
        "const <T>fn = (arg) => arg;",
        "Arrow funksiyalarda Generic ishlatib bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiyalarda parametrlardan oldin <T> qo'yiladi."
    },
    {
      id: 10,
      question: "`Array<number>` va `number[]` o'rtasida qanday farq bor?",
      options: [
        "`Array<number>` tezroq ishlaydi",
        "Faqat yozilish sintaksisi farq qiladi, mohiyatan bir xil",
        "`number[]` faqat eski TypeScript versiyalarida ishlaydi",
        "`Array<number>` o'zgartirib bo'lmaydigan (immutable) tur"
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi ham raqamlardan iborat massivni bildiradi, ularning farqi faqatgina yozilish usulida."
    },
    {
      id: 11,
      question: "Generic constraint'da `T extends object` deb yozish nimani anglatadi?",
      options: [
        "T faqat string bo'lishi mumkinligini",
        "T hech qanday tur emasligini",
        "T primitiv bo'lmagan tip (ya'ni ob'ekt, massiv yoki funksiya) bo'lishi shartligini",
        "T ob'ektni nusxalaydigan funksiya ekanligini"
      ],
      correctAnswer: 2,
      explanation: "`extends object` yozilganda barcha non-primitive (primitiv bo'lmagan) turlar ruxsat etiladi."
    },
    {
      id: 12,
      question: "Generics runtime (ishlash vaqti) ga qanday ta'sir qiladi?",
      options: [
        "Ilovani sekinlashtiradi",
        "Ko'p xotira band qiladi",
        "Hech qanday ta'sir qilmaydi, u to'liq o'chirib tashlanadi (zero-cost abstraction)",
        "Barcha xatolarni try/catch blocklariga aylantiradi"
      ],
      correctAnswer: 2,
      explanation: "Generics faqat TypeScript kompilatori uchun mavjud bo'lib, JavaScript'ga o'tganda yo'qoladi va ishlash tezligiga ta'sir qilmaydi."
    }
  ]
};

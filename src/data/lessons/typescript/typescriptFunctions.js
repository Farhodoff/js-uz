export const typescriptFunctions = {
  id: "typescript-functions",
  title: "TypeScript Functions",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish
TypeScript-da funksiyalar JavaScript-dagiga o'xshaydi, lekin ularga parametr (argumentlar) va qaytaradigan qiymati uchun tiplar qo'shiladi. Bu shuni kafolatlaydiki, funksiyaga faqat biz kutgan turdagi ma'lumotlar uzatiladi va funksiya doimo biz kutgan turdagi natijani qaytaradi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON: Tiplarni ko'rsatmaslik**
\`\`\`typescript
function add(a, b) {
  return a + b;
}
add(5, "10"); // xato bo'lsa ham ishlayveradi (510 chiqadi)
\`\`\`

**✅ YAXSHI: Parametr va natija tiplarini aniqlash**
\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}
// add(5, "10"); // TypeScript bunga yo'l qo'ymaydi (Error)
\`\`\`

## 🎤 Intervyu Savollari
**Savol: Funksiyada \`void\` qaytarish nima degani?**
Javob: Agar funksiya hech qanday qiymat qaytarmasa (masalan, faqat ekranga narsalarni chiqarsa, yoki o'zgaruvchilarni yangilasa), uning natija tipi \`void\` deb ko'rsatiladi. 

**Savol: TypeScript-da optional (majburiy bo'lmagan) parametrlar qanday yoziladi?**
Javob: Parametr nomidan so'ng \`?\` belgisi qo'yiladi. Optional parametrlar har doim majburiy parametrlardan keyin kelishi kerak.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
flowchart TD
    A[Funksiya] -->|Parametr Tiplari| B{Tekshiruv}
    B -->|Xato| C[Kompilyatsiya to'xtaydi]
    B -->|To'g'ri| D[Natija Tipi Tekshiriladi]
    D -->|void| E[Hech narsa qaytarmaydi]
    D -->|number, string...| F[Qiymat qaytaradi]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Funksiya parametrlari va qaytaruvchi qiymati",
      instruction: "Ikkita son (number) qabul qilib, ularni ko'paytmasini qaytaruvchi (number) `multiply` nomli funksiya yozing.",
      startingCode: "// multiply funksiyasini yozing\n",
      hint: "function multiply(a: number, b: number): number { return a * b; }",
      solution: "function multiply(a: number, b: number): number {\n  return a * b;\n}",
      test: "const fn = new Function(code + '; return multiply(2, 3);')(); return fn === 6;"
    },
    {
      id: 2,
      title: "Void qaytaruvchi funksiya",
      instruction: "Faqat ismni (string) qabul qilib, console-ga xabar chiqaradigan (ammo hech narsa qaytarmaydigan) `greet` nomli funksiya yarating.",
      startingCode: "// greet funksiyasini yozing\n",
      hint: "function greet(name: string): void { ... }",
      solution: "function greet(name: string): void {\n  console.log('Salom ' + name);\n}",
      test: "return code.includes('void') && code.includes('greet');"
    },
    {
      id: 3,
      title: "Optional parametrlar",
      instruction: "`buildName` funksiyasini yozing, u majburiy `firstName` (string) va ixtiyoriy `lastName` (string) qabul qilsin. Qaytaruvchi turi ham `string` bo'lsin.",
      startingCode: "// buildName funksiyasini yozing\n",
      hint: "function buildName(firstName: string, lastName?: string): string { ... }",
      solution: "function buildName(firstName: string, lastName?: string): string {\n  if (lastName) return firstName + ' ' + lastName;\n  return firstName;\n}",
      test: "const fn = new Function(code + '; return buildName(\\'Ali\\');')(); return fn === 'Ali';"
    },
    {
      id: 4,
      title: "Standart (Default) parametrlar",
      instruction: "`discount` funksiyasini yozing, u `price` (number) va default qiymati 10 bo'lgan `rate` (number) qabul qilsin. Ikkalasini ko'paytirib qaytarsin.",
      startingCode: "// discount funksiyasini yozing\n",
      hint: "function discount(price: number, rate: number = 10): number",
      solution: "function discount(price: number, rate: number = 10): number {\n  return price * rate;\n}",
      test: "const fn = new Function(code + '; return discount(5);')(); return fn === 50;"
    },
    {
      id: 5,
      title: "Rest parametrlar",
      instruction: "`sumAll` funksiyasini yozing, u istalgancha sonlar (number) qabul qilib, ularning yig'indisini hisoblab qaytarsin. (Rest parametrdan foydalaning).",
      startingCode: "// sumAll funksiyasini yozing\n",
      hint: "function sumAll(...numbers: number[]): number { ... }",
      solution: "function sumAll(...numbers: number[]): number {\n  return numbers.reduce((a, b) => a + b, 0);\n}",
      test: "const fn = new Function(code + '; return sumAll(1, 2, 3);')(); return fn === 6;"
    },
    {
      id: 6,
      title: "Arrow function tipi",
      instruction: "`divide` nomli o'zgaruvchiga ikki sonni bo'lib qaytaradigan Arrow funksiya yozing, tiplarini ko'rsating. (x: number, y: number) => number",
      startingCode: "// divide o'zgaruvchisini yozing\n",
      hint: "const divide = (x: number, y: number): number => { return x / y; };",
      solution: "const divide = (x: number, y: number): number => {\n  return x / y;\n};",
      test: "const fn = new Function(code + '; return divide(10, 2);')(); return fn === 5;"
    },
    {
      id: 7,
      title: "Never qaytaruvchi funksiya",
      instruction: "`throwError` funksiyasini yozing, u xato xabarini (string) qabul qilib xatolik otsin (throw new Error). Uning qaytish turini `never` deb belgilang.",
      startingCode: "// throwError funksiyasini yozing\n",
      hint: "function throwError(msg: string): never { throw new Error(msg); }",
      solution: "function throwError(msg: string): never {\n  throw new Error(msg);\n}",
      test: "return code.includes('never') && code.includes('throwError');"
    },
    {
      id: 8,
      title: "Callback funksiyaga tip berish",
      instruction: "`execute` funksiyasini yozing, u bitta parametr sifatida boshqa funksiya oladi. U callback (callback: () => void) deb atalsin va ichida uni chaqirsin.",
      startingCode: "// execute funksiyasini yozing\n",
      hint: "function execute(callback: () => void) { callback(); }",
      solution: "function execute(callback: () => void): void {\n  callback();\n}",
      test: "return code.includes('callback: () => void') || code.includes('callback: ()=>void');"
    },
    {
      id: 9,
      title: "Obyekt destructuring orqali",
      instruction: "`printId` funksiyasini yozing. U parametrdan `id` (number) ni destructuring qilib olsin va tiplarni ham birgalikda yozing. M-n: function({id}: {id: number})",
      startingCode: "// printId funksiyasini yozing\n",
      hint: "function printId({ id }: { id: number }) { ... }",
      solution: "function printId({ id }: { id: number }): void {\n  console.log(id);\n}",
      test: "return code.includes('{ id }: { id: number }') || code.includes('{id}: {id: number}');"
    },
    {
      id: 10,
      title: "Generics funksiya (asoslari)",
      instruction: "`identity` nomli Generic funksiya yozing (T tipi bilan). U qanday ma'lumot tursa, shuni qaytarsin. `function identity<T>(arg: T): T`",
      startingCode: "// identity funksiyasini yozing\n",
      hint: "function identity<T>(arg: T): T { return arg; }",
      solution: "function identity<T>(arg: T): T {\n  return arg;\n}",
      test: "return code.includes('identity<T>') && code.includes('arg: T');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Funksiya nimani qaytarishini qayerda belgilaymiz?",
      options: [
        "Parametrlar ichida",
        "Funksiya nomidan so'ng, qavslardan keyin ikki nuqta orqali (: tip)",
        "return kalit so'zidan keyin qavslarda",
        "Buni belgilash shart emas."
      ],
      correctAnswer: 1,
      explanation: "Qaytaruvchi tip odatda parametrlar ruyxati tugagach yoziladi. Masalan: () : string"
    },
    {
      id: 2,
      question: "\`void\` qanday hollarda ishlatiladi?",
      options: [
        "Funksiya ixtiyoriy narsa qaytarishi mumkin bo'lganda.",
        "Funksiya faqat raqam qaytarishini ko'rsatish uchun.",
        "Funksiya hech qanday natija qaytarmaganda (return bo'lmaganda).",
        "Faqat obyekt qaytarilganda."
      ],
      correctAnswer: 2,
      explanation: "void tipi odatda xabar chiqaruvchi, hujjatni saqlovchi va o'zi qiymat javob bermaydigan funksiyalar uchun yoziladi."
    },
    {
      id: 3,
      question: "Optional parametrlarning qoidasi nima?",
      options: [
        "Istalgan joyga qo'yilishi mumkin.",
        "Har doim majburiy parametrlardan oldin kelishi kerak.",
        "Har doim majburiy parametrlardan keyin (oxirida) kelishi kerak.",
        "Optional parametr faqat string turlariga nisbatan yoziladi."
      ],
      correctAnswer: 2,
      explanation: "Funksiyada qat'iy talab qilingan argumentlar avval, ixtiyoriy (optional) lar keyin turadi."
    },
    {
      id: 4,
      question: "\`never\` bilan \`void\` ning farqi nima?",
      options: [
        "Farqi yo'q, ikkisi bir xil ishlaydi.",
        "\`void\` hech narsa qaytarmaydigan funksiya uchundir (aslida undefined qaytishi mumkin). \`never\` esa funksiya umuman oxiriga yetib bormasligini anglatadi (masalan, cheksiz tsikl yoki error).",
        "\`never\` faqat massivlarga xos.",
        "\`void\` tipi xatoliklarda ishlatiladi."
      ],
      correctAnswer: 1,
      explanation: "\`void\` dastur tugashi mumkinligini bildiradi. \`never\` da funksiya oxirigacha ishlamaydi, asosan Error otadi yoki to'xtovsiz sikl yaratadi."
    },
    {
      id: 5,
      question: "Funksiyada noma'lum miqdordagi argumentlarni qabul qilish uchun nima ishlatamiz?",
      options: [
        "Union tip ( | )",
        "Rest parametrlar (...args: type[])",
        "any[] array parametr",
        "Optional parametrlar (?)"
      ],
      correctAnswer: 1,
      explanation: "Rest operator yordamida funksiyaga bir nechta son yoki matn uzatishni qisqa ko'rinishda olish mumkin."
    },
    {
      id: 6,
      question: "Standart parametr (default parameter) qanday yoziladi?",
      options: [
        "x: number == 10",
        "x: number := 10",
        "x: number = 10",
        "x? number = 10"
      ],
      correctAnswer: 2,
      explanation: "Tenglik belgisi yordamida parametr uchun avvaldan berilgan qiymat saqlanadi: rate: number = 5."
    },
    {
      id: 7,
      question: "Funksiyaning 'signature' (chizmasi) deb nimaga aytiladi?",
      options: [
        "Funksiyaning tanasi (body).",
        "Funksiyaning nomi, argumentlar ro'yxati va ularning tiplari, hamda qaytarish tipi.",
        "Funksiya oldidagi izoh (comment).",
        "Qaysi faylda saqlanganligi."
      ],
      correctAnswer: 1,
      explanation: "Funksiya signaturasi deganda funksiyaning nimalarni qabul qilishi va nima qaytarishining shakli tushuniladi."
    },
    {
      id: 8,
      question: "Generics \`<T>\` funksiyalarda nima uchun kerak?",
      options: [
        "HTML-ning tagini belgilash uchun.",
        "Funksiyaga har xil tiplarni bir vaqtning o'zida qayta ishlatish, uning qanday tur berilganligini 'eslab qolishi' uchun.",
        "Qavslarni chiroyli qilish uchun.",
        "Kodning ishlash tezligini oshirish uchun."
      ],
      correctAnswer: 1,
      explanation: "Generics (\`<T>\`) orqali biz har doim bir xil tipli o'zgaruvchi bilan amallar bajarishimiz mumkin, masalan \`identity<string>('salom')\`."
    },
    {
      id: 9,
      question: "Quyidagilardan qaysi biri to'g'ri (Arrow function uchun)?",
      options: [
        "const add = (a, b): number => a + b;",
        "const add = (a: number, b: number) => number { a + b };",
        "const add = (a: number, b: number): number => a + b;",
        "const add = (a: number, b: number) : void => return a + b;"
      ],
      correctAnswer: 2,
      explanation: "Arrow function-da tiplar har doim parametrlar yonida va parametrlardan so'ng qaytarish tipi sifatida yoziladi."
    },
    {
      id: 10,
      question: "Overloading (funksiya yuklanishi) TypeScript-da nimani beradi?",
      options: [
        "Bitta funksiyani turli xil argumentlar kombinatsiyasi bilan ko'p marotaba ta'riflash imkonini.",
        "Fayl hajmini qisqartirishni.",
        "Kod xatoga uchraganda avtomatik qayta urinishni.",
        "Looplar uchun qulaylikni."
      ],
      correctAnswer: 0,
      explanation: "Bitta funksiya xuddi o'sha nom ostida bir necha xil strukturadagi argumentlarni ola bilishi uchun Overloading ishlatiladi."
    },
    {
      id: 11,
      question: "Funksiyada \`arguments\` obyekti o'rniga zamonaviy TS/JS da nima tavsiya etiladi?",
      options: [
        "array obyekti",
        "Rest parametrlar (...args)",
        "Faqat \`any\` ishlatish",
        "Tashqi o'zgaruvchilar"
      ],
      correctAnswer: 1,
      explanation: "Zamonaviy yondashuvda \`arguments\` obyekti o'rniga kuchli tiplashgan (strongly-typed) rest parametrlaridan foydalaniladi."
    },
    {
      id: 12,
      question: "Quyidagi tipni qanday tushunasiz: type Cb = (err: Error | null, res?: any) => void",
      options: [
        "Bu funksiya asenkron ekanligini ko'rsatadi.",
        "Bu callback tipi bo'lib, xatolik obyekti va ixtiyoriy natija olib, hech narsa qaytarmasligini bildiradi.",
        "Bu oddiy obyektning strukturasini bildiradi.",
        "Hech biri to'g'ri emas."
      ],
      correctAnswer: 1,
      explanation: "Bu callback funksiyasi uchun tip (alias) yaratish bo'lib, unda birinchi argument error obyekti va keyingisi esa optional qiymat."
    }
  ]
};

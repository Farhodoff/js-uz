export const typescriptFunctions = {
  id: "typescript-functions",
  title: "TypeScript Functions",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, siz restoranga kirdingiz va ofitsiantga buyurtma beryapsiz. Ofitsiant (funksiya) sizdan ma'lumotlarni qabul qiladi. Agar siz "Bitta burger va kola" desangiz, ofitsiant nima kutyotganini biladi. Lekin siz "Bitta moshina va g'isht" desangiz, ofitsiant (TypeScript) xatoni sezadi va buyurtmani qabul qilmaydi.
JavaScript-da ofitsiant hamma narsani olaveradi va oxirida tushunarsiz ovqat olib keladi. TypeScript-da esa funksiya nima qabul qilishini (parametr tiplari) va nima qaytarishini (return type) oldindan qat'iy belgilab olamiz. Bu esa kutilmagan xatolar va "portlashlar" oldini oladi.

## 2. 🧠 Chuqur Sho'ng'ish (Deep Dive)

**TypeScript Kompilyatori (tsc) va Type Erasure (Tiplarning O'chirilishi)**

TypeScript-da yozilgan tiplar faqat **kompilyatsiya (build)** vaqtida (compile-time) mavjud bo'ladi. Siz yozgan barcha \\\`:\\\` dan keyingi tiplar (masalan: \\\`: string\\\`, \\\`: number\\\`, \\\`: void\\\`) JavaScript-ga o'girilayotganda butunlay o'chirib tashlanadi. Bunga **Type Erasure** (tiplarning o'chirilishi) deyiladi. 

Xotira (Memory) va Ishlash Tezligi (Performance) nuqtai nazaridan TypeScript funksiyalari JavaScript funksiyalaridan hech qanday farq qilmaydi. Chunki brauzer yoki Node.js faqat toza JavaScript-ni ishga tushiradi. TypeScript sizga kod yozish vaqtida (IDE-da) xatolarni ko'rsatish orqali yordam beradi xolos.

**Qaytaruvchi tiplarni o'qish (\\\`void\\\` vs \\\`never\\\`)**
- \\\`void\\\`: Funksiya oxiriga yetib boradi, lekin hech qanday aniq qiymat qaytarmaydi (ichki holda \\\`undefined\\\` qaytaradi). Masalan, console.log chiqaruvchi funksiya.
- \\\`never\\\`: Funksiya hech qachon oxiriga yetib bormaydi (masalan, Error tashlaydi yoki cheksiz tsiklga kiradi).

## 3. ⚠️ Chekka Holatlar (Edge Cases) va Senior Intervyu Savollari

**Savol: Optional (\\\`?\\\`) va Default (\\\`=\\\`) parametrlarning qanday farqi bor va ularni qanday tartibda yozish kerak?**
**Javob:** Optional parametr (\\\`?\\\`) qiymat berilmasa \\\`undefined\\\` bo'ladi. Default parametr (\\\`=\\\`) berilmasa o'rniga yozilgan qiymat tushadi. Optional parametrlar har doim barcha majburiy parametrlardan keyin (oxirida) kelishi shart, yo'qsa xato bo'ladi.

**Savol: Funksiya uchun 'Overloading' nima va u qanday ishlaydi?**
**Javob:** Overloading - bitta funksiya nomi bilan bir nechta turli parametr konfiguratsiyalarini e'lon qilish. Type e'lonlari ustma-ust yoziladi, lekin oxirida bitta asosiy (implementation) funksiya yoziladi va u barcha holatlarni o'zida birlashtiradi.

**Savol: Nima uchun Arrow funksiyalarda ba'zan tiplar \\\`(\\\` \\\`)\\\` qavslarisiz ishlamaydi?**
**Javob:** JSX/TSX fayllarda \\\`<T>\\\` (generic) yozganda React uni HTML tegi deb o'ylashi mumkin. Shuning uchun ko'pincha \\\`<T extends unknown>\\\` ko'rinishida qo'shimcha yozib ketiladi.

## 📊 TypeScript Funksiya Arxitekturasi
\\\`\\\`\\\`mermaid
flowchart TD
    A[Funksiya Chaqiruvi] --> B{Parametrlar mosmi?}
    B -->|Yo'q| C[TSError: Argument of type...]
    B -->|Ha| D{Return Tipi Mosmi?}
    D -->|Yo'q| E[TSError: Type X is not assignable to type Y]
    D -->|Ha| F[Kompilyatsiya Muvaffaqiyatli]
    F --> G[Type Erasure -> JS ga o'girish]
    G --> H[Run: Faqat JS kod ishlaydi]
\\\`\\\`\\\`
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
      explanation: "Qaytaruvchi tip odatda parametrlar ro'yxati tugagach yoziladi. Masalan: () : string"
    },
    {
      id: 2,
      question: "`void` qanday hollarda ishlatiladi?",
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
      question: "`never` bilan `void` ning farqi nima?",
      options: [
        "Farqi yo'q, ikkisi bir xil ishlaydi.",
        "`void` hech narsa qaytarmaydigan funksiya uchundir (aslida undefined qaytishi mumkin). `never` esa funksiya umuman oxiriga yetib bormasligini anglatadi (masalan, cheksiz tsikl yoki error).",
        "`never` faqat massivlarga xos.",
        "`void` tipi xatoliklarda ishlatiladi."
      ],
      correctAnswer: 1,
      explanation: "`void` dastur tugashi mumkinligini bildiradi. `never` da funksiya oxirigacha ishlamaydi, asosan Error otadi yoki to'xtovsiz sikl yaratadi."
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
      question: "Generics `<T>` funksiyalarda nima uchun kerak?",
      options: [
        "HTML-ning tagini belgilash uchun.",
        "Funksiyaga har xil tiplarni bir vaqtning o'zida qayta ishlatish, uning qanday tur berilganligini 'eslab qolishi' uchun.",
        "Qavslarni chiroyli qilish uchun.",
        "Kodning ishlash tezligini oshirish uchun."
      ],
      correctAnswer: 1,
      explanation: "Generics (`<T>`) orqali biz har doim bir xil tipli o'zgaruvchi bilan amallar bajarishimiz mumkin, masalan `identity<string>('salom')`."
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
      question: "Funksiyada `arguments` obyekti o'rniga zamonaviy TS/JS da nima tavsiya etiladi?",
      options: [
        "array obyekti",
        "Rest parametrlar (...args)",
        "Faqat `any` ishlatish",
        "Tashqi o'zgaruvchilar"
      ],
      correctAnswer: 1,
      explanation: "Zamonaviy yondashuvda `arguments` obyekti o'rniga kuchli tiplashgan (strongly-typed) rest parametrlaridan foydalaniladi."
    },
    {
      id: 12,
      question: "Type Erasure (Tiplarning o'chirilishi) qachon sodir bo'ladi?",
      options: [
        "Dastur brauzerda ishlayotganda (Runtime)",
        "Kompilyatsiya vaqtida (Compile-time) TS dan JS ga o'girilganda",
        "Dastur xatoga uchraganda",
        "Node.js server ishga tushganda"
      ],
      correctAnswer: 1,
      explanation: "TypeScript kompilyatori (tsc) kodni ishga tushirishdan oldin barcha tiplarni o'chirib, toza JavaScript hosil qiladi."
    }
  ]
};

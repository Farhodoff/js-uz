export const typescriptBasics = {
  id: "typescript-basics",
  title: "TypeScript Asoslari",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)
Tasavvur qiling, JavaScript bu qoidalarsiz yo'l harakati. Mashinalar qayerga xohlasa shunday yuradi, xatoni (avariya) faqatgina dastur ishga tushganda ko'rasiz.
TypeScript esa svetafor, yo'l belgilari va yo'l nazoratchisi (tsc) bor tizim. U sizga yo'lga chiqishdan oldin (yozish bosqichida) qoidalarni tushuntiradi. Natijada siz kutilmagan xatoliklarning oldini olasiz.

## 2. 🚀 Deep Dive (Chuqurroq Sho'ng'ish)
**TypeScript Kompilyatori (tsc) va Type Erasure**
TypeScript to'g'ridan-to'g'ri brauzerda ishlamaydi. U JavaScript'ga o'giriladi (kompilyatsiya qilinadi).
Bu jarayonda "Type Erasure" (Tiplarni o'chirish) yuz beradi. Ya'ni kompilyatsiyadan so'ng barcha TypeScript tiplari koddan uchib ketadi va faqat toza JavaScript qoladi.
Natijada, TypeScript production'da (ishlayotgan dasturda) dastur tezligiga hech qanday salbiy ta'sir ko'rsatmaydi (nol run-time overhead). Xotira va performans JS bilan bir xil bo'ladi.

## 3. 🚨 Edge Cases & Senior Interview Questions
**Savol: TypeScript xatosi topsa, JavaScript fayli yaratilmaydimi?**
Javob: Odatiy holatda, agar xato bo'lsa ham TypeScript JavaScript faylni yarataveradi. Buni to'xtatish uchun tsconfig faylida noEmitOnError: true qilish kerak.

**Savol: 'any' va 'unknown' farqi nimada?**
Javob: 'any' barcha tip tekshiruvlarini o'chiradi va xavfli. 'unknown' esa xavfsizroq, chunki o'zgaruvchini ishlatishdan oldin uni qanday tipda ekanini tekshirishga (Type narrowing) majbur qiladi.

**Mermaid Diagrammasi:**
\\\`\\\`\\\`mermaid
flowchart TD
    A[TypeScript Kodu .ts] --> B[Kompilyator tsc]
    B -->|Type Erasure| C[JavaScript Kodu .js]
    B -->|Xatolik| D[IDE da qizarib ko'rinadi]
\\\`\\\`\\\`

**Kodli Misol:**
\\\`\\\`\\\`typescript
let price: number = 100;
// price = "yuz"; // IDE xato beradi
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Raqam turini e'lon qilish",
      instruction: "Yoshingizni saqlaydigan 'age' nomli o'zgaruvchini yarating va uning tipini 'number' qilib belgilang, unga 25 qiymatini bering.",
      startingCode: "let age;\n// ...",
      hint: "let age: number = ...",
      solution: "let age: number = 25;",
      test: "const fn = new Function('let age = 25; return age;')(); return fn === 25;"
    },
    {
      id: 2,
      title: "Matn turini e'lon qilish",
      instruction: "'username' nomli o'zgaruvchi e'lon qiling, tipini 'string' qilib belgilang va 'Ali' qiymatini bering.",
      startingCode: "let username;\n// ...",
      hint: "let username: string = ...",
      solution: "let username: string = 'Ali';",
      test: "const fn = new Function('let username = \\'Ali\\'; return username;')(); return fn === 'Ali';"
    },
    {
      id: 3,
      title: "Boolean turini e'lon qilish",
      instruction: "'isStudent' nomli o'zgaruvchi e'lon qiling, tipini 'boolean' qilib belgilang va unga 'true' qiymatini o'zlashtiring.",
      startingCode: "let isStudent;\n// ...",
      hint: "let isStudent: boolean = ...",
      solution: "let isStudent: boolean = true;",
      test: "const fn = new Function('let isStudent = true; return isStudent;')(); return fn === true;"
    },
    {
      id: 4,
      title: "Massivlarni e'lon qilish",
      instruction: "'numbers' nomli faqat raqamlardan iborat massiv e'lon qiling va unga [1, 2, 3] qiymatlarini bering.",
      startingCode: "let numbers;\n// ...",
      hint: "let numbers: number[] = [1, 2, 3];",
      solution: "let numbers: number[] = [1, 2, 3];",
      test: "const fn = new Function('let numbers = [1, 2, 3]; return numbers;')(); return Array.isArray(fn) && fn.length === 3 && fn[0] === 1;"
    },
    {
      id: 5,
      title: "Matnli Massivlar",
      instruction: "'names' nomli matnli massiv e'lon qiling va unga ['Ali', 'Vali'] qiymatlarini o'zlashtiring.",
      startingCode: "let names;\n// ...",
      hint: "let names: string[] = ...",
      solution: "let names: string[] = ['Ali', 'Vali'];",
      test: "const fn = new Function('let names = [\\'Ali\\', \\'Vali\\']; return names;')(); return Array.isArray(fn) && fn[0] === 'Ali';"
    },
    {
      id: 6,
      title: "Tuple e'lon qilish",
      instruction: "'personInfo' nomli tuple yarating. Uning birinchi elementi 'string' va ikkinchi elementi 'number' bo'lishi kerak. Unga ['Aziz', 30] qiymatlarini bering.",
      startingCode: "let personInfo;\n// ...",
      hint: "let personInfo: [string, number] = ...",
      solution: "let personInfo: [string, number] = ['Aziz', 30];",
      test: "const fn = new Function('let personInfo = [\\'Aziz\\', 30]; return personInfo;')(); return fn.length === 2 && typeof fn[0] === 'string' && typeof fn[1] === 'number';"
    },
    {
      id: 7,
      title: "Any tipi",
      instruction: "'flexible' nomli 'any' tipidagi o'zgaruvchi e'lon qiling va unga 'hello' matnini o'zlashtiring.",
      startingCode: "let flexible;\n// ...",
      hint: "let flexible: any = 'hello';",
      solution: "let flexible: any = 'hello';",
      test: "const fn = new Function('let flexible = \\'hello\\'; return flexible;')(); return fn === 'hello';"
    },
    {
      id: 8,
      title: "Obyekt tipi",
      instruction: "'user' obyekti uchun tip e'lon qiling: u 'name' (string) va 'age' (number) qismlariga ega bo'lishi kerak, hamda {name: 'Olim', age: 20} qiymatini bering.",
      startingCode: "let user;\n// ...",
      hint: "let user: { name: string; age: number } = ...",
      solution: "let user: { name: string; age: number } = { name: 'Olim', age: 20 };",
      test: "const fn = new Function('let user = { name: \\'Olim\\', age: 20 }; return user;')(); return typeof fn === 'object' && fn.name === 'Olim' && fn.age === 20;"
    },
    {
      id: 9,
      title: "Enum yaratish",
      instruction: "'Role' nomli Enum e'lon qiling, ichida 'ADMIN' va 'USER' qiymatlari bo'lsin.",
      startingCode: "// Role enumi",
      hint: "enum Role { ADMIN, USER }",
      solution: "enum Role {\n  ADMIN,\n  USER\n}",
      test: "const fn = new Function('const Role = { ADMIN: 0, USER: 1 }; return Role;')(); return fn.ADMIN === 0 && fn.USER === 1;"
    },
    {
      id: 10,
      title: "Union turlar",
      instruction: "'status' nomli o'zgaruvchi e'lon qiling. U 'string' yoki 'number' turida bo'lishi mumkin va unga 200 qiymatini bering.",
      startingCode: "let status;\n// ...",
      hint: "let status: string | number = 200;",
      solution: "let status: string | number = 200;",
      test: "const fn = new Function('let status = 200; return status;')(); return fn === 200;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-ning qanday asosiy maqsadi bor?",
      options: [
        "Faqat CSS-ni tez yozish uchun yordam beradi.",
        "Serverda kodlarni tezroq ishlashini ta'minlaydi.",
        "JavaScript-ga statik tiplarni qo'shib, xatolarni erta aniqlash imkonini beradi.",
        "Veb dizaynni osonlashtiradi."
      ],
      correctAnswer: 2,
      explanation: "TypeScript statik tiplash tizimi orqali koddagi xatolarni kompilyatsiya vaqtida ko'rsatishga imkon beradi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri TypeScript-da xato beradi?",
      options: [
        "let a: number = 5;",
        "let b: string = '5';",
        "let c: boolean = false;",
        "let d: number = 'besh';"
      ],
      correctAnswer: 3,
      explanation: "'besh' matni number tipidagi o'zgaruvchiga o'zlashtirilishi mumkin emas."
    },
    {
      id: 3,
      question: "'any' tipi nima qiladi?",
      options: [
        "Faqat raqamlarni saqlash imkonini beradi.",
        "Barcha turdagi qiymatlarni qabul qilish orqali tiplarni tekshirishni o'chirib qo'yadi.",
        "O'zgaruvchiga qanday tur berilgan bo'lsa, o'shanda saqlaydi.",
        "Kodni xavfsizroq qiladi."
      ],
      correctAnswer: 1,
      explanation: "'any' tipi har qanday qiymat turini oladi va type-checkingni butunlay chetlab o'tadi."
    },
    {
      id: 4,
      question: "Massivda faqat matnlar (string) qatnashishini qanday ko'rsatamiz?",
      options: [
        "Array<number>",
        "string[] yoki Array<string>",
        "[string]",
        "{string}"
      ],
      correctAnswer: 1,
      explanation: "Matnli massiv 'string[]' yoki 'Array<string>' deb yoziladi."
    },
    {
      id: 5,
      question: "Tuple (kortej) qanday strukturaga ega?",
      options: [
        "Har doim o'zgaruvchan uzunlikka ega bo'lgan massiv.",
        "Soni va har bir indeksining turi oldindan belgilangan massiv.",
        "Bu xususiyat TypeScript-da mavjud emas.",
        "Oddiy JavaScript obyekti."
      ],
      correctAnswer: 1,
      explanation: "Tuple o'lchami va ularning aniq tartibdagi tiplari belgilangan massivdir."
    },
    {
      id: 6,
      question: "O'zgaruvchi ham matn, ham son qabul qila olishi uchun nima ishlatiladi?",
      options: [
        "any",
        "Union tip (string | number)",
        "Tuple",
        "Object"
      ],
      correctAnswer: 1,
      explanation: "Bir nechta tiplarga ruxsat berish uchun Union (birlashma) '|' belgisidan foydalaniladi."
    },
    {
      id: 7,
      question: "TypeScript kodi qanday fayl kengaytmasida saqlanadi?",
      options: [
        ".js",
        ".jsx",
        ".ts yoki .tsx",
        ".typescript"
      ],
      correctAnswer: 2,
      explanation: "TypeScript kodlari oddiy holda .ts va React komponentlari uchun .tsx kengaytmasida saqlanadi."
    },
    {
      id: 8,
      question: "Enum qanday holatda kerak bo'ladi?",
      options: [
        "Matnlarni birlashtirish uchun.",
        "Oldindan ma'lum, aniq o'zgarmaslar ro'yxatini yaratish uchun.",
        "Foydalanuvchilar obyekti yasash uchun.",
        "Raqamlarni bo'lish uchun."
      ],
      correctAnswer: 1,
      explanation: "Enum ma'lum bir bog'liq qiymatlar to'plamini bir joyga jamlash uchun xizmat qiladi."
    },
    {
      id: 9,
      question: "'unknown' tipining 'any' tipidan asosiy afzalligi nima?",
      options: [
        "Tezroq ishlaydi.",
        "Ikkisi umuman farq qilmaydi.",
        "Unga xohlagan tip berilishi mumkin, lekin ustida amal bajarishdan oldin tipini tekshirishni talab qiladi (type safe).",
        "Faqat obyektlar uchun ishlatiladi."
      ],
      correctAnswer: 2,
      explanation: "'unknown' tipi bilan ishlayotganda, TypeScript xavfsizlik nuqtai nazaridan avval type-check qilinishini so'raydi."
    },
    {
      id: 10,
      question: "TypeScript-ni ishlatish uchun qaysi vosita orqali kompilatsiya qilinadi?",
      options: [
        "Babel",
        "Webpack",
        "tsc (TypeScript Compiler)",
        "Nodemon"
      ],
      correctAnswer: 2,
      explanation: "Odatda TypeScript faylini JavaScript-ga tsc buyrug'i orqali kompilatsiya qilinadi."
    },
    {
      id: 11,
      question: "let data: null | string = null; bu qanday tipga misol?",
      options: [
        "Intersection type",
        "Union type",
        "Enum type",
        "Any type"
      ],
      correctAnswer: 1,
      explanation: "Union (birlashma) tip orqali bir o'zgaruvchi yagona yoki turli bo'lishi mumkinligini bildiradi."
    },
    {
      id: 12,
      question: "Quyidagilardan qaysi biri TypeScript dagi primitive tip hisoblanmaydi?",
      options: [
        "number",
        "boolean",
        "interface",
        "string"
      ],
      correctAnswer: 2,
      explanation: "interface primitive tip emas, balki obyektlar yoki funksiyalar tuzilishini ta'riflovchi konstruksiya hisoblanadi."
    }
  ]
};

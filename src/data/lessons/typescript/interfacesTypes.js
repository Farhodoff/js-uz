export const interfacesTypes = {
  id: "typescript-interfaces",
  title: "Interfaces va Types",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

TypeScript-da \\\`interface\\\` va \\\`type\\\` xuddi uy qurishdagi chizmalar (blueprint) ga o'xshaydi. Obyekt qanday xususiyatlarga ega bo'lishi kerakligini belgilab beradi. Agar siz "Uy" nomli chizma yaratsangiz, unda albatta "eshik" va "oyna" bo'lishi kerakligini ko'rsatasiz. Agar quruvchi faqat "eshik" qilib "oyna"ni unutib qo'ysa, chizma (TypeScript) xato beradi!

\\\`interface\\\` – bu odatda obyektlar uchun maxsus shartnoma.
\\\`type\\\` (Type Alias) – bu nafaqat obyektlar, balki oddiy tiplar (masalan, string, number) va aralash (union) tiplar uchun "laqab" yoki "taxallus"dir.

## 2. 🚀 Chuqur O'rganish (Deep Dive: Under the Hood)

**Type Erasure (Tiplarning o'chirilishi) va Memory (Xotira)**
TypeScript faqatgina yozish vaqtida (compile time) ishlaydi. \\\`tsc\\\` (TypeScript Compiler) kodingizni JavaScript-ga o'girganida, hamma \\\`interface\\\` va \\\`type\\\` lar butunlay o'chib ketadi (Type Erasure). Ular JavaScript-ning ish vaqtiga (runtime) hech qanday ta'sir o'tkazmaydi va brauzer xotirasidan (memory) qo'shimcha joy egallamaydi. Ular faqatgina "kompilyatsiya qorovullari" (compile-time guards) hisoblanadi.

**Kompilyator (tsc) va Ishlash Tezligi (Performance)**
TypeScript kompilyatori uchun \\\`interface\\\` larni o'qish va tekshirish ko'pincha biroz tezroq (caching sababli). Shuningdek, \\\`interface\\\` larda "Declaration Merging" xususiyati mavjud – ya'ni bir xil nom bilan bir necha marta e'lon qilsangiz, ular avtomatik ravishda birlashib ketadi. \\\`type\\\` esa birlashmaydi, u xato beradi.

## 3. ⚠️ Edge Caselar va Senior Intervyu Savollari

**Edge Case 1: Declaration Merging**
\\\`\\\`\\\`typescript
interface User { name: string; }
interface User { age: number; }
// Natija: User qolipi endi ham name, ham age talab qiladi.
\\\`\\\`\\\`
Agar buni \\\`type\\\` bilan qilsangiz, "Duplicate identifier" xatosi kelib chiqadi.

**Edge Case 2: Mapped Types**
Agar siz dinamik tiplar (Mapped types, masalan \\\`Pick\\\`, \\\`Omit\\\`, \\\`Record\\\`) ishlatmoqchi bo'lsangiz, \\\`type\\\` ancha kuchliroq va qulayroq hisoblanadi.

**Senior Interview Question:**
*Savol:* Qachon \\\`interface\\\`, qachon \\\`type\\\` ishlatgan ma'qul?
*Javob:* Odatda loyihaning asosiy ma'lumot tuzilmalari va ochiq kutubxonalar (public API, SDK) uchun \\\`interface\\\` ishlatiladi, chunki uni kengaytirish oson. Lekin, union tiplar (\\\`string | number\\\`), tupleni ifodalash, va murakkab utility tiplar bilan ishlashda \\\`type\\\` dan foydalangan ma'qul.

## 📊 TypeScript Interface va Type jarayoni

\\\`\\\`\\\`mermaid
flowchart TD
    A[Obyekt Yaratilishi] --> B{Shartnomani Tekshirish}
    B -->|interface| C[Kengaytirish imkoni bor - Merging]
    B -->|type| D[Union yoki Intersection imkoni bor]
    C --> E{TSC Kompilyatsiyasi}
    D --> E
    E -->|Muvaffaqiyatli| F[JavaScript fayl]
    E -->|Xato| G[Kompilyatsiya Xatosi]
    F --> H[Type Erasure: Tiplar ochiriladi]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Interface yaratish",
      instruction: "\`Car\` nomli interface yarating. Uning \`brand\` (string) va \`year\` (number) xususiyatlari bo'lsin.",
      startingCode: "// Car interfeysini yarating\n",
      hint: "interface Car { brand: string; year: number; }",
      solution: "interface Car {\n  brand: string;\n  year: number;\n}",
      test: "return code.includes('interface Car') && code.includes('brand') && code.includes('year');"
    },
    {
      id: 2,
      title: "Optional xususiyatlar",
      instruction: "\`Person\` interfeysini yarating. U \`name\` (string) va majburiy bo'lmagan \`age\` (number) ga ega bo'lsin.",
      startingCode: "// Person interfeysini yarating\n",
      hint: "age xususiyati yoniga ? qo'ying",
      solution: "interface Person {\n  name: string;\n  age?: number;\n}",
      test: "return code.includes('interface Person') && code.includes('age?:');"
    },
    {
      id: 3,
      title: "Readonly xususiyatlar",
      instruction: "\`Book\` interfeysini yarating. Unda faqat o'qish uchun mo'ljallangan (\`readonly\`) \`isbn\` (string) bo'lsin.",
      startingCode: "// Book interfeysini yarating\n",
      hint: "readonly isbn: string;",
      solution: "interface Book {\n  readonly isbn: string;\n}",
      test: "return code.includes('interface Book') && code.includes('readonly isbn');"
    },
    {
      id: 4,
      title: "Interface orqali obyekt yaratish",
      instruction: "\`User\` interfeysi oldindan berilgan. \`user1\` o'zgaruvchisini ushbu interfeys yordamida yarating va \`{id: 1, name: 'Ali'}\` qiymatini bering.",
      startingCode: "interface User {\n  id: number;\n  name: string;\n}\n\n// user1 ni yarating\n",
      hint: "const user1: User = { id: 1, name: 'Ali' };",
      solution: "interface User {\n  id: number;\n  name: string;\n}\n\nconst user1: User = { id: 1, name: 'Ali' };",
      test: "const fn = new Function(code + '; return user1;')(); return fn.id === 1 && fn.name === 'Ali';"
    },
    {
      id: 5,
      title: "Interface funksiya uchun",
      instruction: "\`MathFunc\` nomli interface yarating. U ikkita son qabul qilib, bitta son qaytaradigan funksiyani ifodalasin. (masalan: \`(x: number, y: number) => number\`)",
      startingCode: "// MathFunc interfeysini yarating\n",
      hint: "interface MathFunc {\n  (x: number, y: number): number;\n}",
      solution: "interface MathFunc {\n  (x: number, y: number): number;\n}",
      test: "return code.includes('interface MathFunc') && code.includes('number');"
    },
    {
      id: 6,
      title: "Type alias yaratish",
      instruction: "\`ID\` nomli type yarating va u \`string\` yoki \`number\` bo'lishi mumkinligini (Union) bildiring.",
      startingCode: "// ID type ni yarating\n",
      hint: "type ID = string | number;",
      solution: "type ID = string | number;",
      test: "return code.includes('type ID') && code.includes('string') && code.includes('number');"
    },
    {
      id: 7,
      title: "Intersection types (Kesishtirish)",
      instruction: "\`Admin\` va \`Employee\` type-larini birlashtirib, \`AdminEmployee\` nomli yangi type yarating.",
      startingCode: "type Admin = { role: string };\ntype Employee = { salary: number };\n\n// AdminEmployee type-ni yarating\n",
      hint: "type AdminEmployee = Admin & Employee;",
      solution: "type Admin = { role: string };\ntype Employee = { salary: number };\n\ntype AdminEmployee = Admin & Employee;",
      test: "return code.includes('type AdminEmployee') && code.includes('Admin') && code.includes('&') && code.includes('Employee');"
    },
    {
      id: 8,
      title: "Interface kengaytirish (extends)",
      instruction: "\`Animal\` interfeysidan meros oluvchi \`Dog\` interfeysini yarating. \`Dog\` ga \`breed\` (string) qo'shing.",
      startingCode: "interface Animal {\n  name: string;\n}\n\n// Dog interfeysini yarating\n",
      hint: "interface Dog extends Animal { breed: string; }",
      solution: "interface Animal {\n  name: string;\n}\n\ninterface Dog extends Animal {\n  breed: string;\n}",
      test: "return code.includes('interface Dog extends Animal') && code.includes('breed');"
    },
    {
      id: 9,
      title: "Index Signature",
      instruction: "\`StringDictionary\` interfeysini yarating. Unda kalitlar (keys) \`string\` va qiymatlar (values) ham \`string\` ekanligini index signature orqali bildiring.",
      startingCode: "// StringDictionary yarating\n",
      hint: "interface StringDictionary { [key: string]: string; }",
      solution: "interface StringDictionary {\n  [key: string]: string;\n}",
      test: "return code.includes('interface StringDictionary') && code.includes('[key: string]: string');"
    },
    {
      id: 10,
      title: "Obyekt ichida funksiya qoidasi",
      instruction: "\`Logger\` interfeysini yarating, uning ichida \`log\` nomli funksiya bo'lsin. Funksiya matn (string) qabul qilsin va hech narsa qaytarmasin (void).",
      startingCode: "// Logger interfeysini yarating\n",
      hint: "interface Logger { log(msg: string): void; }",
      solution: "interface Logger {\n  log(message: string): void;\n}",
      test: "return code.includes('interface Logger') && code.includes('void');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Interface nima maqsadda ishlatiladi?",
      options: [
        "Faqat CSS yozish uchun.",
        "Dastur ishlayotganda ma'lumotlarni o'zgartirish uchun.",
        "Obyektlar va boshqa strukturalar qanday shaklda bo'lishini tasvirlash (shartnoma tuzish) uchun.",
        "Matnlarni tekshirish uchun."
      ],
      correctAnswer: 2,
      explanation: "Interface asosan ma'lumotlarning (obyektlarning) qanday xususiyat va metodlarga ega ekanligini bildirish uchun qolip sifatida ishlatiladi."
    },
    {
      id: 2,
      question: "Interface-dagi xususiyatni majburiy emas qilish uchun qaysi belgi ishlatiladi?",
      options: [
        "!",
        "?",
        "*",
        "#"
      ],
      correctAnswer: 1,
      explanation: "So'roq belgisi (\`?\`) xususiyatning bo'lishi yoki bo'lmasligi ixtiyoriy ekanligini anglatadi."
    },
    {
      id: 3,
      question: "\`readonly\` kalit so'zi nima qiladi?",
      options: [
        "Obyekt xususiyatini faqat o'qish mumkin qilib qo'yadi, keyinroq uni o'zgartirib bo'lmaydi.",
        "Obyektni butunlay o'chirib tashlaydi.",
        "Xususiyatni majburiy qilib qo'yadi.",
        "Faqat raqamlar saqlash uchun ruxsat beradi."
      ],
      correctAnswer: 0,
      explanation: "\`readonly\` belgilangan xususiyat obyekt yaratilgandan keyin qayta yozilmaydi (qiymati o'zgarmaydi)."
    },
    {
      id: 4,
      question: "Bitta interface boshqasidan qanday meros oladi?",
      options: [
        "implements",
        "inherits",
        "extends",
        "includes"
      ],
      correctAnswer: 2,
      explanation: "Interfeyslarni birlashtirish yoki kengaytirish uchun \`extends\` kalit so'zidan foydalaniladi."
    },
    {
      id: 5,
      question: "\`type\` va \`interface\` ning qaysi jihatdan o'xshashligi bor?",
      options: [
        "Ikkalasi ham faqat classlar uchun ishlaydi.",
        "Ikkalasi bilan ham obyekt shakllarini ta'riflash mumkin.",
        "Ikkalasi ham JavaScript-ga kompilyatsiya bo'ladi va xotirada joy egallaydi.",
        "Hech qanday o'xshashlik yo'q."
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi yordamida ham obyekt tuzilishlarini aniqlash va tekshirish uchun foydalanish mumkin."
    },
    {
      id: 6,
      question: "Intersection Type qaysi belgi yordamida yasaladi?",
      options: [
        "|",
        "&",
        "&&",
        "+"
      ],
      correctAnswer: 1,
      explanation: "Intersection (\`&\`) bir necha tiplarni birlashtirib, bitta yangi (hammasining xususiyatlarini mujassamlagan) tip yaratish uchun ishlatiladi."
    },
    {
      id: 7,
      question: "Union Type qaysi belgi yordamida yasaladi?",
      options: [
        "|",
        "&",
        "||",
        "-"
      ],
      correctAnswer: 0,
      explanation: "Union (\`|\`) belgilangan tiplarning xohlagan bittasi (masalan, matn YOKI son) qabul qilinishiga imkon beradi."
    },
    {
      id: 8,
      question: "Declaration merging (Qayta e'lon qilib kengaytirish) xususiyati qaysi birida mavjud?",
      options: [
        "Faqat type-da",
        "Faqat interface-da",
        "Ikkalasida ham",
        "Primitive tiplarda"
      ],
      correctAnswer: 1,
      explanation: "Bitta nomli \`interface\` ni bir necha joyda yozsangiz, TypeScript ularni bittaga yig'adi. \`type\` da esa xato beradi."
    },
    {
      id: 9,
      question: "Dinamik kalitlar (Index Signature) qanday yoziladi?",
      options: [
        "[key: string]: number",
        "key(string): number",
        "index: any",
        "{string}: number"
      ],
      correctAnswer: 0,
      explanation: "Index signature yordamida obyektda qanday nomdagi va tipli kalitlar saqlanishini oldindan belgilash mumkin."
    },
    {
      id: 10,
      question: "Interface-ni sinfda qo'llash (class-ni tekshirish) uchun qaysi kalit so'zidan foydalaniladi?",
      options: [
        "extends",
        "implements",
        "requires",
        "enforces"
      ],
      correctAnswer: 1,
      explanation: "Sinf (class) belgilangan qoidalarga bo'ysunishini ta'minlash uchun uni interface-dan \`implements\` qilish orqali bog'lanadi."
    },
    {
      id: 11,
      question: "Kompilyatsiyadan so'ng interface qanday ko'rinishga keladi?",
      options: [
        "Oddiy JavaScript obyektiga aylanadi.",
        "JavaScript klassiga aylanadi.",
        "U koddan butunlay olib tashlanadi (compile-time-only).",
        "O'z o'rnida qoladi."
      ],
      correctAnswer: 2,
      explanation: "Interface-lar faqat rivojlantirish va kompilyatsiya bosqichida xatolarni tekshirish uchun kerak bo'lib, ular toza JS-ga aylanmaydi va olib tashlanadi."
    },
    {
      id: 12,
      question: "type UserID = string; nimani ifodalaydi?",
      options: [
        "string tipini obyektga aylantiradi.",
        "string tipi uchun yangi 'UserID' nomli alias (taxallus) yaratadi.",
        "Xato kod hisoblanadi.",
        "Faqat maxsus harflar qabul qiladigan tip yaratadi."
      ],
      correctAnswer: 1,
      explanation: "Type Alias mavjud bo'lgan tiplarga yangi nom (o'qishga qulay qilish uchun) berish imkonini taqdim etadi."
    }
  ]
};

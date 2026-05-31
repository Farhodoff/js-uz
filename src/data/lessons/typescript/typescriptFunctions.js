export const typescriptFunctions = {
  id: "typescriptFunctions",
  title: "Funksiyalar va Overloads",
  language: "typescript",
  theory: `## 1. NEGA kerak?
JavaScript-da funksiyalar har qanday tipdagi argumentlarni qabul qilaveradi va ixtiyoriy qiymat qaytara oladi. Bu katta dasturlarda funksiyaga noto'g'ri argument uzatilishi yoki funksiya qaytargan kutilmagan qiymat tufayli xatolar keltirib chiqaradi.
**TypeScript-da funksiyalar** argumentlar tipi va qaytish qiymati tipi qat'iy tekshirilishini ta'minlaydi. Shuningdek, u ixtiyoriy va standart parametrlarni, hamda har xil turdagi kiruvchi qiymatlar uchun har xil qaytish turlarini belgilaydigan **Function Overloads (funksiya yuklamasi)** texnikasini taqdim etadi.

## 2. SODDALIK (Analogiya)
Funksiyalarni **mahsulot tayyorlaydigan mashinaga (konveyerga)** o'xshatish mumkin:
- JavaScript-dagi funksiya — bu konveyerga **istalgan xomashyoni** (son, string, obyekt) tashlashingiz mumkin bo'lgan mashinadir. U sizga nima tayyorlab berishi noma'lum.
- TypeScript-dagi funksiya — bu kirish qismida faqat **kartoshka** (\`number\`) qabul qiladigan va chiqishda faqat **kartoshka fri** (\`string\`) qaytaradigan qat'iy dasturlangan apparatdir. Agar unga g'isht tashlamoqchi bo'lsangiz, apparat ishga tushishdan oldinoq to'xtaydi.

## 3. STRUKTURA
Funksiya tiplarini belgilash sinraksi:
\`\`\`typescript
// Oddiy funksiya
function add(x: number, y: number): number {
  return x + y;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;

// Ixtiyoriy va standart parametrlar
function greet(name: string, title?: string, greeting: string = "Salom"): string {
  return title ? \`\${greeting}, \${title} \${name}\` : \`\${greeting}, \${name}\`;
}
\`\`\`

### Function Overloads (Funksiya yuklamasi):
Ayrim holatlarda funksiya kiruvchi argumentlarga qarab har xil tipdagi qiymat qaytarishi kerak bo'ladi. Buning uchun overload e'lon qilinadi:
\`\`\`typescript
// Overload signaturalari
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
// Real implementatsiya (faqat bitta)
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
\`\`\`

### A. 'this' Kalit So'zini Tiplash
JavaScript-da \`this\` qiymati funksiya qanday chaqirilganiga qarab dinamik o'zgaradi. TypeScript-da funksiya ichidagi \`this\` tipini qat'iy nazorat qilish uchun uni funksiyaning birinchi argumenti sifatida e'lon qilish mumkin (bu argument JS-ga transpayl bo'lganda o'chib ketadi):
\`\`\`typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

interface User {
  name: string;
  isAdmin: boolean;
}

const db: DB = {
  filterUsers(filter) {
    // filter funksiyasi ichida 'this' User tipida bo'ladi
    return [];
  }
};
\`\`\`

### B. Rest Parametrlar va Tuple Tiplari
Rest parametrlar faqat oddiy massiv emas (\`number[]\`), balki aniq tartib va tiplarga ega bo'lgan Tuple (kortej) tiplari yordamida ham yozilishi mumkin:
\`\`\`typescript
function logEvent(name: string, ...details: [statusCode: number, isFatal: boolean]) {
  const [code, fatal] = details;
  console.log(\`Event: \${name}, Code: \${code}, Fatal: \${fatal}\`);
}

logEvent("Login", 200, false); // TO'G'RI
// logEvent("Logout", "400", true); // XATO! Birinchi element string emas, number bo'lishi kerak
\`\`\`

### C. Call Signatures (Murojaat signaturalari)
JavaScript-da funksiyalar chaqiriluvchi obyektlar hisoblanadi. Agar funksiyaning o'zi chaqirilishi bilan birga qo'shimcha xossalarga ham ega bo'lishi kerak bo'lsa, obyekt tipi ichida Call Signature e'lon qilinadi:
\`\`\`typescript
interface DescribedFunction {
  description: string;
  (someArg: number): boolean; // Chaqirilish signaturasi (Call Signature)
}

const myFunc: DescribedFunction = (num: number) => {
  return num > 10;
};
myFunc.description = "Bu sonni 10 dan katta ekanligini tekshiradi";
\`\`\`

### D. Construct Signatures (Konstruktor signaturalari)
\`new\` kalit so'zi yordamida yangi obyekt yaratuvchi (konstruktor) funksiyalarni tiplash uchun Construct Signature ishlatiladi:
\`\`\`typescript
interface PointConstructor {
  new (x: number, y: number): Point;
}

class Point {
  constructor(public x: number, public y: number) {}
}

function createPoint(ctor: PointConstructor, x: number, y: number) {
  return new ctor(x, y);
}
const p = createPoint(Point, 10, 20); // Point klassi PointConstructor signaturasiga mos keladi
\`\`\`

### E. Overloads matching oqimi (Mermaid)

Quyida function overloading chaqirilganda signaturalarning mos kelish jarayoni va qat'iy tekshiruvi ko'rsatilgan:

\`\`\`mermaid
graph TD
    A["Funksiya chaqiruvi: makeDate(...)"] --> B{"Argumentlar soni va tiplari?"}
    B -->|1 ta son| C["1-signaturaga mos keldi: makeDate(timestamp: number)"]
    B -->|3 ta son| D["2-signaturaga mos keldi: makeDate(m, d, y)"]
    B -->|Boshqa holat| E["Compile-time Error: No overload matches this call"]
    
    C --> F["Yagona implementatsiyaga yo'naltirish (Run-time logic)"]
    D --> F
    F --> G["Date obyekti qaytariladi"]
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Rest parametrni noto'g'ri tiplash:** Rest parametrlar doimo massiv bo'lgani uchun, ularning tipi massiv ko'rinishida yozilishi kerak. Masalan: \`...args: number[]\` (oddiy \`number\` yozish xato).
2. **Callback funksiyani \`Function\` deb tiplash:** \`callback: Function\` deb yozish xavfsiz emas. Har doim callback-ning argumentlari va qaytish tipini aniq ko'rsatish lozim. Masalan: \`callback: (x: number) => void\`.
3. **Overload signaturasini to'g'ri moslashtirmaslik:** Implementatsiya qiluvchi funksiya barcha overload signaturalarini qamrab oladigan darajada keng bo'lishi kerak.

## 6. SAVOLLAR VA JAVOBLAR
**1. Funksiya parametrlarini tiplash nima uchun kerak?**
Funksiya chaqirilayotganda faqat to'g'ri tipdagi va to'g'ri sondagi argumentlar uzatilishini ta'minlash uchun.

**2. Funksiyaning qaytish tipi (Return Type) qanday yoziladi?**
Parametrlardan keyin ikki nuqta (\`:\`) qo'yilib, tip yoziladi. Masalan: \`function f(): string\`.

**3. "Type Inference" funksiyalarda qanday ishlaydi?**
Agar funksiyaning qaytish tipi yozilasa, TypeScript return qilingan qiymatga qarab qaytish tipini o'zi avtomatik aniqlaydi.

**4. Ixtiyoriy parametr (Optional Parameter) qanday e'lon qilinadi va u qayerda turishi kerak?**
Maydon nomidan keyin so'roq belgisi (\`?\`) qo'yiladi va u doim parametrlarning oxirida turishi shart.

**5. Default parameter (standart qiymatli parametr) nima?**
Argument uzatilmaganda avtomatik ravishda ishlatiladigan boshlang'ich qiymatga ega parametr (\`arg: type = default\`).

**6. Rest parameters (qolgan parametrlar) qanday tiplanadi?**
Ular har doim massiv bo'lganligi sababli massiv tipi yoziladi. Masalan: \`...numbers: number[]\`.

**7. Function Overloading nima?**
Bir xil nomli, lekin kiruvchi parametrlar soni yoki tiplari turlicha bo'lgan, hamda har xil tipda qiymat qaytaradigan funksiyalar to'plamini yaratish.

**8. Overload-da nechta implementatsiya (haqiqiy kod) bo'ladi?**
Faqat bitta asosiy implementatsiya funksiyasi bo'ladi va u barcha tepada e'lon qilingan overload signaturalarini qo'llab-quvvatlashi kerak.

**9. Callback funksiyalarning tipi qanday tavsiflanadi?**
Arrow funksiya sinraksiga o'xshash tarzda. Masalan: \`(val: string) => boolean\`.

**10. "this" kalit so'zi funksiya ichida qanday tiplanadi?**
Funksiyaning birinchi argumenti sifatida maxsus \`this\` parametri yoziladi. Masalan: \`function f(this: User, x: number)\`.

**11. Nega funksiyaga parametrlardan ko'p argument uzatish TSda xatolik beradi?**
Chunki TypeScript qat'iy signaturaga amal qiladi. Keraksiz argumentlarni uzatish mantiqiy xatolar oldini olish uchun taqiqlangan.

**12. Never qaytaradigan funksiyaga misol keltiring.**
\`throw new Error('something')\` qiladigan yoki \`while(true) {}\` cheksiz sikli bo'lgan funksiyalar.
`,
  exercises: [
    {
      id: 1,
      title: "Parametr va Return tiplash",
      instruction: "Ikkita son qabul qilib, ularning ko'paytmasini (number) qaytaradigan `multiplyNumbers(a, b)` funksiyasini yozing.",
      startingCode: "function multiplyNumbers(a: number, b: number): number {\n  // Kodni yozing\n}",
      hint: "return a * b;",
      test: "if (typeof multiplyNumbers !== 'function') return 'multiplyNumbers topilmadi'; if(multiplyNumbers(2, 5) !== 10) return 'Ko\\'paytma xato'; return null;"
    },
    {
      id: 2,
      title: "String qaytish tipi",
      instruction: "Ism (string) qabul qilib, 'Salom, [name]!' qaytaruvchi `sayHello(name)` funksiyasini yozing.",
      startingCode: "function sayHello(name: string): string {\n  // Salom qaytaring\n}",
      hint: "return `Salom, ${name}!`;",
      test: "if (typeof sayHello !== 'function') return 'sayHello topilmadi'; if (sayHello('Jasur') !== 'Salom, Jasur!') return 'Greeting xato'; return null;"
    },
    {
      id: 3,
      title: "Optional Parameter (Ixtiyoriy parametr)",
      instruction: "Birinchi ism (`firstName` - string) va ixtiyoriy familiya (`lastName` - string) qabul qilib, agar familiya berilgan bo'lsa birlashtirib, berilmagan bo'lsa faqat ismni qaytaradigan `getFullName(firstName, lastName)` funksiyasini yozing.",
      startingCode: "function getFullName(firstName: string, lastName?: string): string {\n  // Kodni yozing\n}",
      hint: "return lastName ? `${firstName} ${lastName}` : firstName;",
      test: "if (typeof getFullName !== 'function') return 'getFullName topilmadi'; if (getFullName('Ali') !== 'Ali') return 'lastName berilmagandagi xato'; if(getFullName('Ali', 'Valiyev') !== 'Ali Valiyev') return 'To\\'liq ism xato'; return null;"
    },
    {
      id: 4,
      title: "Default Parameter (Standart parametr)",
      instruction: "Son `x` va standart qiymati 2 bo'lgan daraja `power` qabul qilib, `x` ning `power`-darajasini hisoblovchi `getPower(x, power)` yozing.",
      startingCode: "function getPower(x: number, power: number = 2): number {\n  // Math.pow ishlating\n}",
      hint: "return Math.pow(x, power);",
      test: "if (typeof getPower !== 'function') return 'getPower topilmadi'; if(getPower(3) !== 9 || getPower(2, 3) !== 8) return 'Darajani hisoblash xato'; return null;"
    },
    {
      id: 5,
      title: "Rest Parameters (Cheksiz parametrlar)",
      instruction: "Ixtiyoriy miqdordagi sonlarni qabul qilib, ularning yig'indisini hisoblaydigan `sumNumbers(...nums)` funksiyasini yozing.",
      startingCode: "function sumNumbers(...nums: number[]): number {\n  // nums massivini hisoblang\n}",
      hint: "return nums.reduce((s, n) => s + n, 0);",
      test: "if (typeof sumNumbers !== 'function') return 'sumNumbers topilmadi'; if(sumNumbers(1, 2, 3, 4) !== 10 || sumNumbers() !== 0) return 'Rest parametr yig\\'indisi xato'; return null;"
    },
    {
      id: 6,
      title: "Callback Parametri",
      instruction: "Qiymat `val` va callback funksiya `cb` qabul qilib, `cb(val)` chaqiruv natijasini qaytaradigan `executeCallback(val, cb)` yozing.",
      startingCode: "function executeCallback(val: number, cb: (x: number) => number): number {\n  // cb ni val bilan chaqiring\n}",
      hint: "return cb(val);",
      test: "if (typeof executeCallback !== 'function') return 'executeCallback topilmadi'; if(executeCallback(5, x => x * 2) !== 10) return 'Callback chaqiruvi noto\\'g\\'ri'; return null;"
    },
    {
      id: 7,
      title: "Overload simulyatsiyasi (String va Number)",
      instruction: "Bitta argument qabul qiluvchi `parseInput(arg)` funksiyasini yozing. Agar arg son bo'lsa uni kvadratini qaytaring, agar string bo'lsa uning uzunligini qaytaring.",
      startingCode: "function parseInput(arg: number): number;\nfunction parseInput(arg: string): number;\nfunction parseInput(arg: any): number {\n  // typeof tekshirib qaytaring\n}",
      hint: "return typeof arg === 'number' ? arg * arg : arg.length;",
      test: "if (typeof parseInput !== 'function') return 'parseInput topilmadi'; if(parseInput(5) !== 25 || parseInput('hello') !== 5) return 'Overload natijasi xato'; return null;"
    },
    {
      id: 8,
      title: "Sikllarni to'xtatuvchi funksiya (Never)",
      instruction: "Chaqirilganda dasturni to'xtatuvchi va zudlik bilan 'Error Occurred' xabari bilan xato otuvchi `stopProcess()` funksiyasini yozing.",
      startingCode: "function stopProcess(): never {\n  // Throw error\n}",
      hint: "throw new Error('Error Occurred');",
      test: "if (typeof stopProcess !== 'function') return 'stopProcess topilmadi'; try { stopProcess(); return 'Xato otilmadi'; } catch(e) { if(e.message !== 'Error Occurred') return 'Xato xabari noto\\'g\\'ri'; } return null;"
    },
    {
      id: 9,
      title: "Rest Strings Concat",
      instruction: "Rest parametrlar orqali bir nechta so'zlarni qabul qilib, ularni o'rtasiga chiziq '-' qo'shib birlashtirib qaytaruvchi `joinWithHyphen(...words)` funksiyasini yozing.",
      startingCode: "function joinWithHyphen(...words: string[]): string {\n  // Kodni yozing\n}",
      hint: "return words.join('-');",
      test: "if (typeof joinWithHyphen !== 'function') return 'joinWithHyphen topilmadi'; if(joinWithHyphen('a', 'b', 'c') !== 'a-b-c') return 'Birlashtirish xato'; return null;"
    },
    {
      id: 10,
      title: "Max Finder (Rest)",
      instruction: "Rest parametrlar yordamida uzatilgan sonlardan eng kattasini topuvchi `findMaxNumber(...nums)` funksiyasini yozing. Bo'sh bo'lsa `-Infinity` qaytaring.",
      startingCode: "function findMaxNumber(...nums: number[]): number {\n  // Math.max ishlating\n}",
      hint: "return Math.max(...nums);",
      test: "if (typeof findMaxNumber !== 'function') return 'findMaxNumber topilmadi'; if(findMaxNumber(10, 5, 20, 3) !== 20) return 'Eng katta son topilmadi'; return null;"
    },
    {
      id: 11,
      title: "Callback status",
      instruction: "Qiymat `success` (boolean) va ikkita callback funksiyalar `onYes` va `onNo` qabul qilib, agar `success` true bo'lsa `onYes()` ni, aks holda `onNo()` ni chaqiruvchi `callOnStatus(success, onYes, onNo)` funksiyasini yozing.",
      startingCode: "function callOnStatus(success: boolean, onYes: () => void, onNo: () => void): void {\n  // Shart bo'yicha chaqiring\n}",
      hint: "success ? onYes() : onNo();",
      test: "if (typeof callOnStatus !== 'function') return 'callOnStatus topilmadi'; let y = false, n = false; callOnStatus(true, () => y = true, () => n = true); if(!y || n) return 'To\\'g\\'ri callback chaqirilmadi'; return null;"
    },
    {
      id: 12,
      title: "Discriminated Union Callback",
      instruction: "Object formatidagi `{ status: 'success' | 'error', data?: string, error?: string }` natijani qabul qilib, agar status success bo'lsa `data`ni, error bo'lsa `error`ni qaytaradigan `handleResult(res)` funksiyasini yozing.",
      startingCode: "type Result = { status: 'success'; data: string } | { status: 'error'; error: string };\n\nfunction handleResult(res: Result): string {\n  // status bo'yicha qiymat qaytaring\n}",
      hint: "return res.status === 'success' ? res.data : res.error;",
      test: "if (typeof handleResult !== 'function') return 'handleResult topilmadi'; if(handleResult({ status: 'success', data: 'Done' }) !== 'Done') return 'Success xato ishlov berildi'; if(handleResult({ status: 'error', error: 'Fail' }) !== 'Fail') return 'Error xato ishlov berildi'; return null;"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Call Signature yordamida funksiyani tiplash",
      instruction: "O'zining `.description` (string) xossasiga ega bo'lgan va chaqirilganda kiritilgan sonning kvadratini (number) qaytaruvchi `DescribedFunction` interfeysini e'lon qiling va unga mos keladigan `mySquare` funksiyasini yozing.",
      startingCode: "interface DescribedFunction {\n  description: string;\n  // Call signature e'lon qiling\n}\n\n// mySquare funksiyasini DescribedFunction tipida yarating\n// uning .description xossasiga 'Hisoblovchi' deb yozing",
      hint: "interface DescribedFunction {\n  description: string;\n  (x: number): number;\n}\nconst mySquare: DescribedFunction = Object.assign(\n  (x: number) => x * x,\n  { description: 'Hisoblovchi' }\n);",
      test: "if (typeof mySquare !== 'function') return 'mySquare topilmadi'; if (mySquare.description !== 'Hisoblovchi') return 'description xossasi noto\'g\'ri'; if (mySquare(4) !== 16) return 'Kvadratni hisoblash xato'; return null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Tuple Rest Parametrlari",
      instruction: "Birinchi parametri `format` (string), qolgan parametrlari ise rest parameter orqali tuple `[number, boolean]` tipida bo'lgan `formatLog(format, ...args)` funksiyasini yozing va uning qiymatini birlashtirib string ko'rinishida qaytaring.",
      startingCode: "type LogArgs = [code: number, isFatal: boolean];\n\nfunction formatLog(format: string, ...args: LogArgs): string {\n  // format va args dagi elementlarni birlashtirib qaytaring\n}",
      hint: "function formatLog(format: string, ...args: LogArgs): string {\n  const [code, isFatal] = args;\n  return `${format}: Code=${code}, Fatal=${isFatal}`;\n}",
      test: "if (typeof formatLog !== 'function') return 'formatLog topilmadi'; const res = formatLog('Error', 500, true); if (res !== 'Error: Code=500, Fatal=true') return 'Formatlash natijasi noto\'g\'ri'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagilardan qaysi biri TypeScript-da to'g'ri yozilgan funksiya hisoblanadi?",
      options: [
        "function add(a: number, b: number) { return a + b; }",
        "function add(a, b) as number { return a + b; }",
        "let add = (a, b) => a + b;",
        "function add(a number, b number) {}"
      ],
      correctAnswer: 0,
      explanation: "Birinchi variantda parametrlar tiplari ko'rsatilgan va return tipi avtomatik ravishda Type Inference yordamida son deb topiladi."
    },
    {
      id: 2,
      question: "Funksiyaning ixtiyoriy parametri (Optional Parameter) qayerda e'lon qilinishi shart?",
      options: [
        "Parametrlar ro'yxatining eng boshida",
        "Parametrlar ro'yxatining ixtiyoriy joyida",
        "Parametrlar ro'yxatining eng oxirida",
        "Funksiya tanasining ichida"
      ],
      correctAnswer: 2,
      explanation: "Optional parametrlar doimo majburiy parametrlardan keyin, ya'ni parametrlar ro'yxatining eng oxirida bo'lishi shart."
    },
    {
      id: 3,
      question: "TypeScript-da rest parametrlarni qanday tiplash to'g'ri hisoblanadi?",
      options: [
        "function sum(...args: number)",
        "function sum(...args: number[])",
        "function sum(...args: [number])",
        "function sum(...args: any)"
      ],
      correctAnswer: 1,
      explanation: "Rest parametrlar doimo massiv ko'rinishida yig'ilganligi uchun ularning tipi massiv (masalan: `number[]`) bo'lishi shart."
    },
    {
      id: 4,
      question: "Function Overloading (Funksiya yuklamasi) nima?",
      options: [
        "Bitta funksiyani qayta-qayta chaqirish",
        "Bir xil nomli, lekin har xil parametrlar va har xil qaytish tiplariga ega funksiyalar to'plamini yaratish",
        "Funksiya xotirasini optimallashtirish",
        "Funksiyani oqimga (thread) yuklash"
      ],
      correctAnswer: 1,
      explanation: "Overloads — har xil turdagi argumentlar uzatilganda funksiya har xil tipli natija qaytarishini kompilyatorga tushuntirish uchun bir xil nomli signaturalarni yozishdir."
    },
    {
      id: 5,
      question: "Function Overload ishlatilganda, funksiyaning haqiqiy implementatsiya (kod) qismi nechta bo'ladi?",
      options: ["Overload signaturalari soni bilan bir xil", "Faqat bitta", "Ikkita", "Hech qancha (faqat deklaratsiya bo'ladi)"],
      correctAnswer: 1,
      explanation: "Kompilyatsiya qilingan JavaScript-da faqat bitta funksiya qolishi kerakligi sababli, overload-da haqiqiy implementatsiya faqat bitta bo'ladi va u barcha signaturalarga mos bo'lishi shart."
    },
    {
      id: 6,
      question: "Callback funksiyani parametrlarda `cb: Function` deb tiplash nega tavsiya etilmaydi?",
      options: [
        "Chunki u xotirani ko'p oladi",
        "Chunki u xavfsiz emas - callback qanday argumentlar olishi va nima qaytarishini tekshirmaydi",
        "Chunki `Function` tipi TypeScript-da mavjud emas",
        "Chunki u sinxron ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`Function` tipi har qanday funksiyani qabul qilib yuboradi. Tiplar xavfsizligi uchun callback signaturasini to'liq yozish lozim: `(x: number) => void`."
    },
    {
      id: 7,
      question: "Default parameters (standart qiymatli parametrlar) qachon ishlatiladi?",
      options: [
        "Faqat massiv bo'lganda",
        "Argument uzatilmagan yoki uning qiymati `undefined` bo'lganda",
        "Faqat funksiya xato berganda",
        "Har doim dastur ishlashi boshida"
      ],
      correctAnswer: 1,
      explanation: "Agar argument uzatilmasa yoki uning qiymati `undefined` bo'lsa, standart qiymat avtomatik ravishda parametrga yuklanadi."
    },
    {
      id: 8,
      question: "Hech qachon tugamaydigan (masalan, cheksiz loop yoki throw qiluvchi) funksiyalarning qaytish tipi nima deb e'lon qilinadi?",
      options: ["void", "never", "null", "unknown"],
      correctAnswer: 1,
      explanation: "Hech qachon yakunlanib qiymat qaytarmaydigan holatlar uchun maxsus `never` qaytish tipi ishlatiladi."
    },
    {
      id: 9,
      question: "TypeScript-da arrow funksiyalarni qanday tiplash mumkin?",
      options: [
        "const double = (x: number): number => x * 2;",
        "const double: number = (x) => x * 2;",
        "const double = function(x): number {}",
        "const double = (x): number => x * 2;"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiyalarda parametrlar va qaytish tipi bevosita qavslar ichida va keyin yoziladi: `(x: number): number => x * 2`."
    },
    {
      id: 10,
      question: "TypeScript-da funksiya ichidagi `this` kontekstini qanday tiplash mumkin?",
      options: [
        "Klass ichida readonly qilish orqali",
        "Funksiyaning birinchi argumenti sifatida maxsus `this: Type` yozish orqali",
        "Global o'zgaruvchi yaratib",
        "Funksiyaga bind() metodini chaqirib"
      ],
      correctAnswer: 1,
      explanation: "TypeScript funksiya parametrlarida birinchi bo'lib yozilgan `this: Type` parametrini maxsus tushunadi va u haqiqiy JS argumentiga aylanmaydi."
    },
    {
      id: 11,
      question: "Quyidagi funksiyaning qaytish tipi nima deb hisoblanadi (Type Inference orqali)?\n`function check(x: number) { return x > 10; }`",
      options: ["number", "boolean", "void", "any"],
      correctAnswer: 1,
      explanation: "Funksiya taqqoslash amali `x > 10` natijasini qaytaradi, bu esa true yoki false, ya'ni boolean tipidir."
    },
    {
      id: 12,
      question: "Agar funksiya parametrlari tiplari belgilanmasa va Type Inference ham aniqlay olmasa, unga qaysi tip avtomatik beriladi (agar noImplicitAny yoqilmagan bo'lsa)?",
      options: ["unknown", "void", "any", "never"],
      correctAnswer: 2,
      explanation: "Standart holatda aniqlanmagan parametrlarga `any` tipi beriladi, bu esa loyihada xatoliklarga olib kelishi mumkin."
    },
    {
      id: 13,
      question: "Quyidagi tip e'lonining nomi nima va u qanday vazifani bajaradi?\n`interface CustomFn { (x: string): void; name: string; }`",
      options: [
        "Construct Signature - klass yaratish uchun ishlatiladi",
        "Call Signature - chaqiriluvchi obyekt funksiya va uning qo'shimcha xossalarini tiplash uchun ishlatiladi",
        "Index Signature - obyektning dinamik kalitlarini tiplash uchun ishlatiladi",
        "Method Signature - faqat obyekt metodlarini tiplash uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "Agar obyekt bir vaqtning o'zida funksiya sifatida chaqirilishi va qo'shimcha xossalarga ega bo'lishi kerak bo'lsang, Call Signature-dan foydalaniladi."
    },
    {
      id: 14,
      question: "Construct Signature-ni e'lon qilishda qaysi kalit so'zidan foydalaniladi?",
      options: [
        "constructor",
        "class",
        "new",
        "create"
      ],
      correctAnswer: 2,
      explanation: "Konstruktor funksiyalar signaturasini belgilash uchun tip ichida `new` kalit so'zi bilan boshlanadigan `new (...args): Type` yozuvi ishlatiladi."
    }
  ]
};

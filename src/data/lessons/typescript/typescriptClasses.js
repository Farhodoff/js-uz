export const typescriptClasses = {
  id: "typescript-classes",
  title: "TypeScript Classes",
  language: "typescript",
  theory: `## Part 1: Beginner Analogy (Sodda Tushuntirish)

Tasavvur qiling, **Class (Sinf)** - bu avtomobil ishlab chiqaradigan **zavod chizmasi** (blueprint). Bu chizmada mashinaning rangi qanday bo'lishi, motor quvvati, eshiklar soni oldindan belgilab qo'yiladi. Biz shu chizma asosida yuzlab, minglab haqiqiy mashinalarni (ya'ni **obyektlarni**) ishlab chiqarishimiz mumkin. 

Lekin TypeScript-da JavaScript-dan farqli ravishda qo'shimcha xavfsizlik kamarlari bor. Masalan, zavod chizmasida dvigatelga to'g'ridan-to'g'ri tashqaridan aralashish mumkin emas deb belgilab qo'ysak (\`private\` kalit so'zi bilan), hech kim mashinaning ichiga kirib motor sozlamalarini buzolmaydi. JavaScript-da esa hamma narsa ochiq (\`public\`) va xavfli edi.

## Part 2: Deep Dive (Under the hood, TS Compiler, Type Erasure, Performance)

TypeScript class-lari aslida nima va u qanday ishlaydi? Keling, chuqurroq tahlil qilamiz:

1. **TypeScript Compiler (tsc) va Type Erasure (Tiplarni o'chib ketishi):**
   TypeScript-dagi class tiplari va access modifier-lar (\`private\`, \`public\`, \`protected\`, \`readonly\`) faqatgina **Compile-time** (dastur yozish) jarayonida xatolarni ushlash uchun ishlaydi. 
   \`tsc\` kodni kompile qilganida (JavaScript-ga o'girganida), barcha TypeScript-ga xos tiplar va modifier-lar o'chib ketadi (**Type Erasure**). Ya'ni \`private\` bo'lgan xususiyatlar JS da yana oddiy xususiyatga aylanib qoladi (agar ES2022 dagi \`#\` - hard private ishlatilmasa).

2. **Xotira va Performance (Prototypal Inheritance):**
   TypeScript dagi class-lar JavaScript-ning **Prototypal Inheritance** mexanizmi ustida qurilgan "Syntactic Sugar" (chiroyli yozilishi) xolos. 
   Class ichidagi metodlar (masalan, \`startEngine()\`) har bir yangi obyekt uchun alohida nusxalanmaydi. Ular xotiradan joy tejash uchun Class-ning **Prototype** iga biriktiriladi. Barcha yaratilgan obyektlar esa shu yagona prototype ga ko'rsatkich (reference) orqali murojaat qiladi.

3. **ES2022 Hard Private ( \`#\` ) vs TypeScript \`private\`:**
   TypeScript-ning an'anaviy \`private\` kalit so'zi faqat xato tekshirishda ishlaydi (JS da ochiq qoladi). Agar siz xotirada (Run-time da) rostdan ham yashirin bo'lishini xohlasangiz ES2022 dagi \`#\` belgisini ishlating: \`#salary: number = 5000;\`.

## Part 3: Edge Cases and Senior Interview Questions

Senior darajasidagi suhbatlarda class-lar haqida ko'plab qiziqarli savollar tushadi.

**1. Savol:** Constructor parametrlari (Shorthand initialization) qanday ishlaydi va uning qanday kamchiligi bo'lishi mumkin?
**Javob:** TypeScript-da \`constructor(private name: string)\` deb yozsak, alohida maydon e'lon qilib, unga qiymat berishdan qutulamiz. Biroq, bu kodni o'qiyotgan boshqa dasturchilarga barcha field-larni birdaniga ko'rish imkoniyatini cheklaydi (class tepasida ro'yxat yo'q bo'ladi).

**2. Savol:** \`abstract\` class larning interface-lardan asosiy farqi nima?
**Javob:** Interface faqat shaklni belgilaydi va compile vaqtida butunlay yo'q qilinadi. Abstract class esa oddiy class kabi JS-da qoladi. Eng asosiysi, abstract class ichida metodlarning **tayyor implementatsiyasini** (logic-ni) ham yozish mumkin. Interfaceda esa faqat nomlari bo'ladi.

**3. Savol:** \`protected\` modifier-i qachon eng ko'p asqotadi?
**Javob:** Boshqa fayldan turib to'g'ridan-to'g'ri o'zgartira olmaslik uchun, lekin o'zimiz yaratgan voris (child) class-lar ota class xususiyatlariga bemalol kira olishi kerak bo'lgan Pattern'larda (masalan Factory yoki Template Method) juda muhim.

## 📊 Class arxitekturasi va Vorislik

\`\`\`mermaid
classDiagram
    class Vehicle {
      <<abstract>>
      +string brand
      -string vinNumber
      #number speed
      +start()
      +stop()
    }
    class Car {
      +int doors
      +honk()
    }
    class ElectricCar {
      -int batteryLevel
      +charge()
    }
    Vehicle <|-- Car : Voris oladi (extends)
    Car <|-- ElectricCar : Voris oladi (extends)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Class e'lon qilish",
      instruction: "`Book` nomli class yarating. Unda `title` (string) maydoni bo'lsin. Konstruktorda shu maydonga qiymat bering.",
      startingCode: "// Book class ini yarating\n",
      hint: "class Book { title: string; constructor(title: string) { this.title = title; } }",
      solution: "class Book {\n  title: string;\n  constructor(title: string) {\n    this.title = title;\n  }\n}",
      test: "return code.includes('class Book') && code.includes('constructor');"
    },
    {
      id: 2,
      title: "Private maydonlar",
      instruction: "`Account` nomli class yarating. Uning ichida `private balance: number;` bo'lsin va uni constructor orqali bering.",
      startingCode: "// Account class ini yarating\n",
      hint: "private balance: number;",
      solution: "class Account {\n  private balance: number;\n  constructor(balance: number) {\n    this.balance = balance;\n  }\n}",
      test: "return code.includes('private balance: number');"
    },
    {
      id: 3,
      title: "Public va Shorthand",
      instruction: "Shorthand orqali `User` class ini yarating. Konstruktorda birdaniga `public username: string` qilib e'lon qiling va qiymat oling.",
      startingCode: "// User class ini yarating\n",
      hint: "constructor(public username: string) {}",
      solution: "class User {\n  constructor(public username: string) {}\n}",
      test: "return code.includes('constructor(public username: string)');"
    },
    {
      id: 4,
      title: "Protected va Extends",
      instruction: "`Device` class yarating (ichida `protected power: number`). Undan voris bo'lgan `Phone` class yarating va `getPower` metodida `this.power` ni qaytaring.",
      startingCode: "// Device va Phone yarating\n",
      hint: "class Device { ... } class Phone extends Device { ... }",
      solution: "class Device {\n  protected power: number;\n  constructor(p: number) {\n    this.power = p;\n  }\n}\n\nclass Phone extends Device {\n  getPower(): number {\n    return this.power;\n  }\n}",
      test: "return code.includes('protected power: number') && code.includes('Phone extends Device');"
    },
    {
      id: 5,
      title: "Readonly xususiyati",
      instruction: "`Server` class yarating, unda `readonly ip: string` bo'lsin. Unga faqat constructorda qiymat biriktiring.",
      startingCode: "// Server class ini yarating\n",
      hint: "readonly ip: string;",
      solution: "class Server {\n  readonly ip: string;\n  constructor(ip: string) {\n    this.ip = ip;\n  }\n}",
      test: "return code.includes('readonly ip: string');"
    },
    {
      id: 6,
      title: "Getter yozish",
      instruction: "`Circle` class yarating (private _radius: number = 5). `get radius(): number` getterini yozing, u shu maydonni qaytarsin.",
      startingCode: "// Circle class ini yarating\n",
      hint: "get radius(): number { return this._radius; }",
      solution: "class Circle {\n  private _radius: number = 5;\n  get radius(): number {\n    return this._radius;\n  }\n}",
      test: "return code.includes('get radius(): number') && code.includes('this._radius');"
    },
    {
      id: 7,
      title: "Setter yozish va himoya",
      instruction: "`Circle` da `set radius(r: number)` setter yozing. Agar `r > 0` bo'lsa, uni `_radius` ga o'zlashtiring.",
      startingCode: "class Circle {\n  private _radius: number = 5;\n  // shu yerga setter yozing\n}\n",
      hint: "set radius(r: number) { if(r > 0) this._radius = r; }",
      solution: "class Circle {\n  private _radius: number = 5;\n  set radius(r: number) {\n    if (r > 0) {\n      this._radius = r;\n    }\n  }\n}",
      test: "return code.includes('set radius(r: number)') && code.includes('r > 0');"
    },
    {
      id: 8,
      title: "Static maydon",
      instruction: "`MathHelper` class da `static version: string = '1.0';` e'lon qiling.",
      startingCode: "// MathHelper yarating\n",
      hint: "static version: string = '1.0';",
      solution: "class MathHelper {\n  static version: string = '1.0';\n}",
      test: "return code.includes('static version: string');"
    },
    {
      id: 9,
      title: "Static metod",
      instruction: "`MathHelper` class da `static add(a: number, b: number): number` metoddini yozing. U yig'indini qaytarsin.",
      startingCode: "class MathHelper {\n  // static metod yozing\n}\n",
      hint: "static add(a: number, b: number): number { return a + b; }",
      solution: "class MathHelper {\n  static add(a: number, b: number): number {\n    return a + b;\n  }\n}",
      test: "return code.includes('static add(a: number, b: number)');"
    },
    {
      id: 10,
      title: "Abstract Class va Metod",
      instruction: "`Animal` abstract class yarating. Unda `abstract makeSound(): void;` bo'lsin. Va `Dog` class ini extends qilib `makeSound` ni implement qiling.",
      startingCode: "// Animal va Dog yarating\n",
      hint: "abstract class Animal { abstract makeSound(): void; }",
      solution: "abstract class Animal {\n  abstract makeSound(): void;\n}\n\nclass Dog extends Animal {\n  makeSound(): void {\n    console.log('Woof');\n  }\n}",
      test: "return code.includes('abstract class Animal') && code.includes('abstract makeSound(): void');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Access modifiers (public, private, protected) ning asosiy maqsadi nima?",
      options: [
        "Sinf a'zolariga kirish huquqini boshqarish va xavfsizlikni oshirish.",
        "JavaScript kodini tezroq ishlatish.",
        "Faqat CSS ulanishlarini tekshirish.",
        "Obyektlarni nusxalash."
      ],
      correctAnswer: 0,
      explanation: "Ushbu modifierlar yordamida qaysi maydonni kim ishlata olishini nazorat qilish mumkin."
    },
    {
      id: 2,
      question: "Sinf (class) xususiyati (property) oldiga hech qanday modifier qo'yilmasa, TypeScript uni standart holatda qanday qabul qiladi?",
      options: [
        "private",
        "protected",
        "public",
        "readonly"
      ],
      correctAnswer: 2,
      explanation: "Agar hech narsa yozilmagan bo'lsa, barcha a'zolar sukut bo'yicha `public` hisoblanadi."
    },
    {
      id: 3,
      question: "`private` xususiyatga qayerdan murojaat qilish mumkin?",
      options: [
        "Istalgan class yoki funksiyadan.",
        "Faqat ushbu xususiyat joylashgan class ning o'zida.",
        "Meros olgan class larda (child classes).",
        "Barcha HTML fayllardan."
      ],
      correctAnswer: 1,
      explanation: "`private` yopiq degani bo'lib, o'sha class ichidan boshqa joyda o'qish mumkin emas."
    },
    {
      id: 4,
      question: "`protected` xususiyatining `private` dan asosiy farqi nimada?",
      options: [
        "Hech qanday farqi yo'q.",
        "`protected` a'zolarga meros oluvchi (child) class-larda ruxsat bor, `private` da ruxsat yo'q.",
        "`protected` faqat sonlar uchun ishlaydi.",
        "`protected` public bilan bir xil ishlaydi."
      ],
      correctAnswer: 1,
      explanation: "`protected` ko'rinuvchanligi uning o'zini va farzand (voris) class larni o'z ichiga oladi."
    },
    {
      id: 5,
      question: "Abstract class nima?",
      options: [
        "To'g'ridan-to'g'ri instansiya (new) olinmaydigan, faqat boshqalar vorislik olishi uchun shablon vazifasini bajaruvchi class.",
        "Ichida umuman funksiya bo'lmagan class.",
        "Private bo'lgan maxfiy class.",
        "Faqat interfeyslardan voris oladigan class."
      ],
      correctAnswer: 0,
      explanation: "Abstract class yordamida obyekt yaratib bo'lmaydi, faqat `extends` qilib keyin obyekt olish mumkin."
    },
    {
      id: 6,
      question: "TypeScript-da class xususiyatlari va modifier-lari Run-time da (dastur ishlagan paytida) nima bo'ladi?",
      options: [
        "Type Erasure orqali olib tashlanadi va toza JS bo'lib qoladi.",
        "Xuddi yozilgandek qoladi, Node.js uni tushunadi.",
        "Ular CSS faylga aylanadi.",
        "Runtime da xato beradi."
      ],
      correctAnswer: 0,
      explanation: "TypeScript faqat compile vaqtida ishlaydi, JS-ga o'tkazilganda TS dagi modifier va tiplar o'chib ketadi."
    },
    {
      id: 7,
      question: "ES2022 Hard Private (masalan `#balance`) bilan TypeScript ning `private` modifieri farqi nimada?",
      options: [
        "Farqi yo'q, ikkalasi bir narsa.",
        "Hard private runtime da ham, class dan tashqarida umuman ko'rinmaydi. `private` esa TS da error beradi, lekin JS da ochiq qoladi.",
        "Hard private faqat numberlar uchun ishlaydi.",
        "`private` TypeScript da ishlamaydi, faqat ES da ishlaydi."
      ],
      correctAnswer: 1,
      explanation: "Hard private (`#`) rostdan ham JavaScript virtual mashinasida himoyalangan, `private` kalit so'zi esa shunchaki Type Check jarayonidagi yordamchidir."
    },
    {
      id: 8,
      question: "Class dagi `readonly` xususiyatni qachon o'zgartirish mumkin?",
      options: [
        "Faqat e'lon qilinayotganda (declare) va constructor ichida.",
        "Istalgan class metodida.",
        "Static metod orqali.",
        "Voris class ichida har doim."
      ],
      correctAnswer: 0,
      explanation: "`readonly` xususiyatga faqat boshlang'ich qiymat sifatida va constructor da qiymat berish ruxsat etiladi."
    },
    {
      id: 9,
      question: "Constructor shorthand initialization nima?",
      options: [
        "Constructor nomini yozmaslik.",
        "Constructor parametri oldidan `public`, `private` yoki `protected` yozib, class maydonini e'lon qilish va unga ro'yxatdan o'tmasdan qiymat berish.",
        "Alohida class yasamasdan obyekt yasash.",
        "Barcha o'zgaruvchilarni readonly qilish."
      ],
      correctAnswer: 1,
      explanation: "Bu usul yozishni qisqartiradi, alohida field e'lon qilish va construtor ichida `this.x = x` deyish o'rnini bosadi."
    },
    {
      id: 10,
      question: "Getter va Setter nima maqsadda ishlatiladi?",
      options: [
        "To'g'ridan to'g'ri o'zgaruvchini o'qish uchun.",
        "Faqat interfeyslarda ishlatish uchun.",
        "Encapsulation (Maxfiylikni) saqlagan holda, xususiyatni o'qish yoki unga qiymat berish jarayoniga qo'shimcha mantiq qo'shish uchun.",
        "Class ichidagi static metodlarni chaqirish uchun."
      ],
      correctAnswer: 2,
      explanation: "Setter orqali kelayotgan qiymat to'g'riligini tekshirishimiz (masalan faqat manfiy bo'lmasin) va Getter orqali o'qishga ruxsat berishimiz mumkin."
    },
    {
      id: 11,
      question: "TypeScript (va JavaScript) class lari Multiple Inheritance (ko'p martalik vorislik) ni qo'llab-quvvatlaydimi?",
      options: [
        "Ha, bitta class istalgancha class-dan meros ola biladi.",
        "Yo'q, bitta class faqat bitta class-dan extends ola oladi.",
        "Ha, lekin faqat private class-lardan.",
        "Ha, faqat static class-lardan."
      ],
      correctAnswer: 1,
      explanation: "Ko'p martalik to'g'ridan-to'g'ri extends qilib bo'lmaydi. Uni o'rniga bir nechta interface-larni `implements` qilish mumkin xolos."
    },
    {
      id: 12,
      question: "Class `static` metodi va obyekt metodining farqi nimada?",
      options: [
        "Static metod obyekt yasamay (new orqali emas), to'g'ridan to'g'ri Class nomi orqali chaqiriladi.",
        "Static metod faqat private o'zgaruvchilar ustida ishlaydi.",
        "Obyekt metodi tezroq ishlaydi.",
        "Farqi yo'q."
      ],
      correctAnswer: 0,
      explanation: "Static metodlar u yoki bu class ning instansiyasiga (obyektiga) emas, class ning o'ziga bog'langan bo'ladi."
    }
  ]
};

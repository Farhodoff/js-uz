export const typescriptClasses = {
  id: "typescript-classes",
  title: "TypeScript Classes",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish
JavaScript ES6 bilan sinflar (classes) tushunchasi keldi. TypeScript esa bunga Qo'shimcha Ruxsat (Access Modifiers) larni qo'shdi: **public**, **private** va **protected**. 
Bu xususiyatlar obyekt ichidagi qaysi ma'lumotlarni tashqaridan o'qish mumkinligi va qaysilarini o'zgartirish yoki yashirishni aniq belgilab beradi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON: Maxfiy ma'lumotlarni ochiq qoldirish**
\`\`\`typescript
class BankAccount {
  balance: number; // hamma o'zgartirishi mumkin
  constructor(b: number) {
    this.balance = b;
  }
}
const acc = new BankAccount(100);
acc.balance = 50000; // Ixtiyoriy raqamga o'zgartirib yuborish mumkin
\`\`\`

**✅ YAXSHI: \`private\` yoki \`protected\` ishlatish**
\`\`\`typescript
class BankAccount {
  private balance: number;
  constructor(b: number) {
    this.balance = b;
  }
  public getBalance(): number {
    return this.balance;
  }
}
const acc = new BankAccount(100);
// acc.balance = 50000; // TypeScript XATO beradi, xavfsizlik ta'minlanadi
\`\`\`

## 🎤 Intervyu Savollari
**Savol: \`public\`, \`private\` va \`protected\` farqi nima?**
Javob: 
- \`public\` (standart): Barcha joydan, class ichi, meros olganlar va tashqaridan bemalol ochiq.
- \`private\`: Faqatgina aynan ushbu class-ning ichidagina ruxsat bor. Undan meros olgan child class-lar ham kirishga ruxsat etilmaydi.
- \`protected\`: Class ichida va undan meros olgan (extends qilingan) class-larda ruxsat bor, lekin butunlay tashqaridan o'zgartirib bo'lmaydi.

**Savol: TypeScript-da Abstract class nima qilib beradi?**
Javob: Abstract class - bu faqat boshqa class-lar undan meros olishi uchun yaratiladigan 'shablon' (template) class. Undan to'g'ridan-to'g'ri obyekt (\`new AbstClass()\`) yaratib bo'lmaydi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
classDiagram
    class Animal {
      +string name
      #int age
      +makeSound()
    }
    class Dog {
      -string breed
      +bark()
    }
    Animal <|-- Dog : Extends (Meros olish)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Class yaratish va tiplarni belgilash",
      instruction: "`Person` nomli class yarating. Unda `name` (string) fieldi bo'lsin, va uni constructor orqali o'zlashtiring.",
      startingCode: "// Person class ini yarating\n",
      hint: "class Person { name: string; constructor(n: string) { this.name = n; } }",
      solution: "class Person {\n  name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n}",
      test: "return code.includes('class Person') && code.includes('constructor');"
    },
    {
      id: 2,
      title: "Private modifier",
      instruction: "`Wallet` nomli class yarating, unda `amount` (number) xususiyati bo'lsin. Lekin u `private` bo'lishi shart. Constructor orqali bering.",
      startingCode: "// Wallet class ini yarating\n",
      hint: "private amount: number;",
      solution: "class Wallet {\n  private amount: number;\n  constructor(amount: number) {\n    this.amount = amount;\n  }\n}",
      test: "return code.includes('private amount: number') && code.includes('class Wallet');"
    },
    {
      id: 3,
      title: "Public modifier",
      instruction: "Xususiyat oldiga `public` so'zini aniq qo'yib `Car` nomli class va uni ichida `speed` (number) nomli xususiyat yarating.",
      startingCode: "// Car class ini yarating\n",
      hint: "public speed: number;",
      solution: "class Car {\n  public speed: number;\n  constructor(speed: number) {\n    this.speed = speed;\n  }\n}",
      test: "return code.includes('public speed: number') && code.includes('class Car');"
    },
    {
      id: 4,
      title: "Protected modifier va merosxo'rlik",
      instruction: "`Employee` class-ini yarating, unda `protected salary: number` fieldi bo'lsin. `Manager` class u yerdan `extends` qilib, `getSalary()` metodida `this.salary` ni qaytarsin.",
      startingCode: "// Employee va Manager class larini yarating\n",
      hint: "class Employee { protected salary: number; ... } class Manager extends Employee { ... }",
      solution: "class Employee {\n  protected salary: number;\n  constructor(s: number) {\n    this.salary = s;\n  }\n}\n\nclass Manager extends Employee {\n  getSalary(): number {\n    return this.salary;\n  }\n}",
      test: "return code.includes('protected salary: number') && code.includes('Manager extends Employee');"
    },
    {
      id: 5,
      title: "Readonly xususiyatlar",
      instruction: "`Config` class-i yarating, uning ichida `readonly db: string` bo'lsin. Unga faqat constructor-da qiymat bering.",
      startingCode: "// Config class ini yarating\n",
      hint: "readonly db: string;",
      solution: "class Config {\n  readonly db: string;\n  constructor(db: string) {\n    this.db = db;\n  }\n}",
      test: "return code.includes('readonly db: string');"
    },
    {
      id: 6,
      title: "Shorthand Initialization",
      instruction: "`User` class-ida constructor parametrlarining o'zida `public name: string` va `private id: number` orqali tezkor (shorthand) xususiyat e'lon qiling.",
      startingCode: "// User class ini yozing\n",
      hint: "class User { constructor(public name: string, private id: number) {} }",
      solution: "class User {\n  constructor(public name: string, private id: number) {}\n}",
      test: "return code.includes('constructor(public name: string') || code.includes('constructor(public name');"
    },
    {
      id: 7,
      title: "Getter yaratish",
      instruction: "`Rectangle` class-i yarating. `private _width: number = 10;`. Endi tashqaridan faqat shu valyutaga kirishni ta'minlovchi `get width(): number` getter metodini yozing.",
      startingCode: "// Rectangle class ini yarating\n",
      hint: "get width(): number { return this._width; }",
      solution: "class Rectangle {\n  private _width: number = 10;\n  get width(): number {\n    return this._width;\n  }\n}",
      test: "return code.includes('get width(): number') && code.includes('return this._width');"
    },
    {
      id: 8,
      title: "Setter yaratish",
      instruction: "`Rectangle` dagi width uchun setter yarating: `set width(val: number)`. Agar `val <= 0` bo'lsa, o'zgartirmang, aks holda `_width` ni yangilang.",
      startingCode: "class Rectangle {\n  private _width: number = 10;\n  // shu yerga setter yozing\n}\n",
      hint: "set width(val: number) { if (val > 0) this._width = val; }",
      solution: "class Rectangle {\n  private _width: number = 10;\n  set width(val: number) {\n    if (val > 0) {\n      this._width = val;\n    }\n  }\n}",
      test: "return code.includes('set width') && code.includes('val > 0');"
    },
    {
      id: 9,
      title: "Static metodlar",
      instruction: "`MathUtil` class-ini yarating, ichida `static PI: number = 3.14;` va `static calculateCircleArea(r: number): number` (bu `this.PI * r * r` qaytaradi) statik metod yozing.",
      startingCode: "// MathUtil class ini yarating\n",
      hint: "static PI: number = 3.14; ...",
      solution: "class MathUtil {\n  static PI: number = 3.14;\n  static calculateCircleArea(r: number): number {\n    return this.PI * r * r;\n  }\n}",
      test: "return code.includes('static PI') && code.includes('static calculateCircleArea');"
    },
    {
      id: 10,
      title: "Abstract Class",
      instruction: "`Shape` nomli abstract class yarating, unda `abstract getArea(): number;` bo'lsin. Va `Circle` class-ini shundan voris olib yozing.",
      startingCode: "// Shape va Circle larni yozing\n",
      hint: "abstract class Shape { abstract getArea(): number; } ...",
      solution: "abstract class Shape {\n  abstract getArea(): number;\n}\n\nclass Circle extends Shape {\n  getArea(): number {\n    return 0;\n  }\n}",
      test: "return code.includes('abstract class Shape') && code.includes('abstract getArea()');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Access modifiers (public, private, protected) ning asosiy maqsadi nima?",
      options: [
        "JavaScript kodini tezroq ishlatish.",
        "Sinf a'zolariga kirish huquqini boshqarish va xavfsizlikni oshirish.",
        "Faqat CSS ulanishlarini tekshirish.",
        "Obyektlarni nusxalash."
      ],
      correctAnswer: 1,
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
      explanation: "Agar hech narsa yozilmagan bo'lsa, barcha a'zolar sukut bo'yicha \`public\` hisoblanadi."
    },
    {
      id: 3,
      question: "\`private\` xususiyatga qayerdan murojaat qilish mumkin?",
      options: [
        "Istalgan class yoki funksiyadan.",
        "Faqat ushbu xususiyat joylashgan class ning o'zida.",
        "Meros olgan class larda (child classes).",
        "Barcha HTML fayllardan."
      ],
      correctAnswer: 1,
      explanation: "\`private\` yopiq degani bo'lib, o'sha class ichidan boshqa joyda o'qish mumkin emas."
    },
    {
      id: 4,
      question: "\`protected\` xususiyatining \`private\` dan asosiy farqi nimada?",
      options: [
        "Hech qanday farqi yo'q.",
        "\`protected\` faqat sonlar uchun ishlaydi.",
        "\`protected\` a'zolarga meros oluvchi (child) class-larda ruxsat bor, \`private\` da ruxsat yo'q.",
        "\`protected\` public bilan bir xil ishlaydi."
      ],
      correctAnswer: 2,
      explanation: "\`protected\` ko'rinuvchanligi uning o'zini va farzand (voris) class larni o'z ichiga oladi."
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
      explanation: "Abstract class yordamida obyekt yaratib bo'lmaydi, faqat \`extends\` qilib keyin obyekt olish mumkin."
    },
    {
      id: 6,
      question: "Constructor shorthand nima?",
      options: [
        "Avtomatik constructor yaratadigan kutubxona.",
        "Constructor parametrlari oldida public/private kabi modifierlarni qo'yish orqali qo'lda \`this.prop = prop\` deb yozishdan qutulish.",
        "Kodni xato deb belgilash vositasi.",
        "JS-da paydo bo'lgan o'zgaruvchi yaratish usuli."
      ],
      correctAnswer: 1,
      explanation: "Agar parametr ichida modifier bo'lsa, TypeScript avtomatik ravishda maydonni klassga biriktirib beradi."
    },
    {
      id: 7,
      question: "Class ichidagi \`readonly\` xususiyat qachon o'zgartirilishi mumkin?",
      options: [
        "Istalgan joyda, istalgan vaqtda.",
        "Faqat o'sha xususiyatni yaratish (declare) yoki constructor ichidagina.",
        "Child class ichida har doim.",
        "Uni umuman yozish mumkin emas."
      ],
      correctAnswer: 1,
      explanation: "\`readonly\` belgilangan maydonga tashqarida ham, hattoki class metodlarida ham qayta qiymat berib bo'lmaydi."
    },
    {
      id: 8,
      question: "Class dagi getter/setter nima maqsadda yoziladi?",
      options: [
        "Tashqi kodlardan \`private\` o'zgaruvchilarni nazorat qilib (masalan tekshirib) olish va o'zgartirish (Encapsulation) uchun.",
        "Serverga ma'lumot jo'natish uchun.",
        "HTML formalari ulanishini oson qilish uchun.",
        "Faqatgina obyekt nomlarini chiroyli qilish uchun."
      ],
      correctAnswer: 0,
      explanation: "Getter/Setter yordamida o'zgaruvchini himoyalaymiz va o'qish/yozish operatsiyasi oldidan mantiq (shart) ishga tushirish imkonini topamiz."
    },
    {
      id: 9,
      question: "\`static\` metod yoki xususiyatni ishlatish qoidasi qanday?",
      options: [
        "Unga erishish uchun class-dan avval \`new\` yordamida obyekt olish kerak.",
        "Unga class nomining o'zi orqali, obyekt yasamay turib murojaat qilinadi (masalan, Math.PI).",
        "Uni faqat HTML-da chiqarish mumkin.",
        "Static funksiyalar yozib bo'lmaydi."
      ],
      correctAnswer: 1,
      explanation: "Static a'zolar obyektlarga emas, balki bevosita class ning o'ziga tegishli bo'ladi."
    },
    {
      id: 10,
      question: "Agar class ichida \`implements SomeInterface\` yozilsa u nimaga majbur bo'ladi?",
      options: [
        "Hech nimaga majbur bo'lmaydi.",
        "O'sha Interface da berilgan barcha xususiyat va metodlarni o'z ichiga olishiga.",
        "O'zgaruvchilarini yo'qotib qo'yadi.",
        "Boshqa classlardan ajratib qo'yiladi."
      ],
      correctAnswer: 1,
      explanation: "\`implements\` orqali class ma'lum bir Interface strukturasiga to'liq bo'ysunishini kafolatlaydi."
    },
    {
      id: 11,
      question: "TypeScript da classlarni nechtasidan bir vaqtda (multiple inheritance) \`extends\` qilish mumkin?",
      options: [
        "Faqat 1 ta.",
        "2 ta.",
        "Cheksiz.",
        "Bitta ham mumkin emas."
      ],
      correctAnswer: 0,
      explanation: "JavaScript va TypeScript da ko'p marotaba to'g'ridan-to'g'ri vorislik (extends) qilish mumkin emas. Bitta class faqat bitta class-dan extends ola biladi. Lekin u bir nechta interfeyslarni \`implements\` qilishi mumkin."
    },
    {
      id: 12,
      question: "Overriding (ustidan yozish) nimani anglatadi?",
      options: [
        "Xatolarni o'chirish.",
        "Voris class (child) o'z ota class-idagi metodni xuddi shu nom bilan o'zgartirib yozishi va yangi mantiq kiritishi.",
        "Static klasslarga xos bir narsa.",
        "Ixtiyoriy o'zgaruvchilarni qisqartirish."
      ],
      correctAnswer: 1,
      explanation: "Agar ota klassda mavjud metod bola klassda xuddi o'sha nom bilan yana qaytadan yozilsa va boshqacha amal bajarsa, bu Method Overriding bo'ladi."
    }
  ]
};

export const typescriptClasses = {
  id: "typescriptClasses",
  title: "Klasslar va OOP",
  language: "typescript",
  theory: `## 1. NEGA kerak?
JavaScript ES6-dan boshlab klasslarni qo'llab-quvvatlaydi. Biroq, JavaScript klasslarida barcha maydonlar va metodlar sukut bo'yicha ochiq (public) bo'ladi (yangi versiyalarda yashirin maydonlar uchun # belgisi qo'shilgan bo'lsa-da, u juda cheklangan). Shuningdek, JS-da o'zgaruvchilarni faqat o'qish uchun (\`readonly\`) qilish yoki interfeyslarni klasslarga majburiy qo'llash imkoni yo'q.
**TypeScript klasslari** to'laqonli OOP (Obyektga Yo'naltirilgan Dasturlash) arxitekturasini taqdim etadi. Unda o'zgaruvchilarga kirish darajalari (**Access Modifiers**), klasslarning shablonlarini yaratuvchi **Abstract Classes** va klass interfeyslari mavjud.

## 2. SODDALIK (Analogiya)
Klasslarni **kompaniya boshqaruvi tizimiga** o'xshatish mumkin:
- **Public (Ochiq):** Kompaniyaning **saytidagi ma'lumotlar**. Uni istalgan odam (tashqaridan ham) ko'ra oladi va o'qiy oladi.
- **Private (Yopiq):** Kompaniyaning **moliyaviy hisobotlari**. Uni faqat direktor (klassning o'zi) ko'ra oladi, xodimlar yoki oddiy odamlar ko'ra olmaydi.
- **Protected (Himoyalangan):** Kompaniyaning **ichki qoidalari**. Uni kompaniya xodimlari va uning filiallari (voris klasslar - subclasses) ishlata oladi, lekin tashqi odamlar ishlata olmaydi.
- **Abstract Class (Abstrakt klass):** Kompaniyaning **litsenziya talabi**. Siz uning asosida yangi filial ocholmaysiz, lekin unga moslab o'z filiallaringizni (subclasses) qurishingiz shart.

## 3. STRUKTURA
TS-da klass yaratish va modifikatorlar:
\`\`\`typescript
class Account {
  public name: string; // Hamma joydan ko'rinadi
  private balance: number; // Faqat klass ichida
  protected id: number; // Klass va vorislarida

  constructor(name: string, balance: number, id: number) {
    this.name = name;
    this.balance = balance;
    this.id = id;
  }

  public getBalance(): number {
    return this.balance;
  }
}
\`\`\`

### Parameter Properties (Constructor qisqartmasi):
Konstruktor argumentlari orqali klass maydonlarini tezkor yaratish usuli:
\`\`\`typescript
class User {
  // Avtomatik ravishda name xossasini yaratib, qiymat yozadi
  constructor(public name: string, private age: number) {}
}
\`\`\`

### Abstract Classes (Abstrakt klasslar):
Boshqa klasslar uchun andoza (shablon) vazifasini bajaradi:
\`\`\`typescript
abstract class Vehicle {
  abstract startEngine(): void; // Vorislar implement qilishi shart
  stopEngine(): void {
    console.log("Dvigatel o'chdi"); // Tayyor metod
  }
}
\`\`\`

### A. 'override' Modifikatori (Metodni Xavfsiz Qayta Yozish)
TypeScript 4.3 versiyasidan boshlab, voris klassda ota klassning metodini qayta yozish (override qilish) paytida xatoliklarni oldini olish uchun \`override\` modifikatori qo'shilgan. Agar ota klassdagi metod nomi o'zgarsa, voris klassda xato ko'rsatiladi:
\`\`\`typescript
class Parent {
  show() {
    console.log("Parent");
  }
}

class Child extends Parent {
  override show() {
    console.log("Child");
  }
  // override showMessage() {} // XATO! Ota klassda bunday metod yo'q
}
\`\`\`

### B. Abstrakt Maydonlar (Abstract Fields)
Abstrakt klasslarda faqat metodlarni emas, balki maydonlarni ham abstrakt qilib belgilash mumkin. Voris klasslar ushbu maydonlarni o'zlarida realizatsiya qilishlari (qiymat berishlari) shart:
\`\`\`typescript
abstract class BaseUser {
  abstract role: string; // Voris klassda albatta bo'lishi kerak
  abstract getPermissions(): string[];
}

class AdminUser extends BaseUser {
  role = "admin"; // Realizatsiya qilindi
  getPermissions() {
    return ["read", "write", "delete"];
  }
}
\`\`\`

### C. Klass Ifodalari (Class Expressions)
Klasslarni alohida nom bermasdan, anonim ravishda o'zgaruvchilarga yuklash mumkin. Bu ko'pincha klasslarni dinamik yaratishda qo'l keladi:
\`\`\`typescript
const UserClass = class {
  constructor(public name: string) {}
  sayHi() {
    console.log(\`Hi, \${this.name}\`);
  }
};
const instance = new UserClass("Ali");
\`\`\`

### D. Klass Ierarxiyasi Diagrammasi (Mermaid)

Quyida Interfeys, Abstrakt klass va oddiy klasslar o'rtasidagi merosxo'rlik zanjirining ierarxik diagrammasi ko'rsatilgan:

\`\`\`mermaid
classDiagram
    class Loggable {
        <<interface>>
        +log(msg: string) void
    }
    
    class Entity {
        <<abstract>>
        +id: string
        +createdAt: Date
        +save()* void
    }
    
    class User {
        +name: string
        +role: string
        +log(msg: string) void
        +save() void
    }
    
    Entity <|-- User : extends
    Loggable <|.. User : implements
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Private xossalarga tashqaridan murojaat qilish:** Private maydonlarni tashqaridan o'zgartirishga yoki o'qishga harakat qilish kompilyatsiya vaqtida qat'iy taqiqlanadi (JSda ishlasa-da, TS build qilmaydi).
2. **Abstrakt klassdan obyekt olishga urinish:** \`new Vehicle()\` qilish xato, chunki abstrakt klass to'liq bo'lmagan shablondir. Undan faqat meros olish mumkin (\`extends\`).
3. **Interfeys metodlarini implement qilishni unutish:** Agar klass interfeysni \`implements\` qilsa, undagi barcha metod va maydonlar yozilishi shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. Access Modifiers (Kirish modifikatorlari) nima?**
Klass maydonlari va metodlariga klass tashqarisidan, ichidan yoki vorislaridan kirish darajasini belgilaydigan kalit so'zlar (\`public\`, \`private\`, \`protected\`).

**2. public modifikatori vazifasi nima?**
Klass maydonining hamma joydan (klass ichi, vorislar, tashqi obyektlar) ochiq va ko'rinadigan bo'lishini ta'minlaydi (default holat).

**3. private modifikatori nima uchun kerak?**
Ma'lumotlarni inkapsulyatsiya qilish, ya'ni maydonni faqat ushbu klass ichida ishlatish va tashqaridan kutilmagan o'zgarishlardan himoya qilish uchun.

**4. protected modifikatorining private-dan farqi nima?**
\`private\` maydondan faqat o'z klassida foydalaniladi, \`protected\` maydondan esa o'z klassi bilan birga undan meros olgan voris klasslarda (subclasses) ham foydalanish mumkin.

**5. Parameter Properties nima?**
Konstruktor parametrlarida kirish modifikatorlarini yozish orqali klass maydonlarini e'lon qilish va qiymat berishni bitta qatorda bajarish usuli.

**6. Readonly o'zgaruvchilarni klassda qachon o'zgartirish mumkin?**
Faqat klass maydonlari e'lon qilinganda yoki klass konstruktori (constructor) ichida. Keyinchalik ularni o'zgartirib bo'lmaydi.

**7. Abstract Class (Abstrakt klass) nima?**
Tarkibida abstrakt (tanasi yo'q) metodlar bo'lishi mumkin bo'lgan, bevosita obyekt yaratib bo'lmaydigan, faqat andoza vazifasini bajaruvchi klass.

**8. Abstract metod nima?**
Abstrakt klass ichida e'lon qilinadigan, tanasi (bajaradigan ishi) yozilmaydigan metod. Uni barcha voris klasslar o'zicha yozishi shart.

**9. "implements" va "extends" farqi nima?**
\`extends\` klassdan yangi klass yaratish (meros olish) uchun, \`implements\` esa klass interfeys shartlariga mos kelishini ta'minlash uchun ishlatiladi.

**10. Static maydon yoki metod nima?**
Klass obyekti (instance) yaratilmasdan to'g'ridan-to'g'ri klassning o'ziga tegishli bo'lgan xususiyatlar. Masalan: \`Math.PI\`.

**11. Klasslarda getter va setter nimalar uchun xizmat qiladi?**
Klassning private maydonlariga qiymat yozish yoki o'qishda qo'shimcha mantiqiy tekshiruvlar yoki hisob-kitoblarni bajarish uchun.

**12. TypeScript klasslaridan o'girilgan JS kodi qanday ko'rinadi?**
Barcha kirish modifikatorlari, interfeyslar va abstrakt shartlar olib tashlanib, oddiy ES6 klasslariga (yoki eski ES5 prototip funksiyalariga) o'giriladi.
`,
  exercises: [
    {
      id: 1,
      title: "Klass yaratish va Public xossa",
      instruction: "Konstruktorida `brand` (string) qabul qilib, o'zlashtiradigan `Car` klassini yozing.",
      startingCode: "class Car {\n  brand: string;\n  // Konstruktorni yozing\n}",
      hint: "constructor(brand: string) {\n    this.brand = brand;\n  }",
      test: "if (typeof Car !== 'function') return 'Car klassi topilmadi'; const c = new Car('Toyota'); if(c.brand !== 'Toyota') return 'Xossa xato yozildi'; return null;"
    },
    {
      id: 2,
      title: "Private maydon simulyatsiyasi",
      instruction: "Klass ichida private `_balance` (boshlang'ich 0) maydoni bo'lgan, pul qo'shadigan `deposit(amount)` va balansni qaytaradigan `getBalance()` metodlari bor `BankAccount` klassini yozing.",
      startingCode: "class BankAccount {\n  // Metodlarni yozing\n}",
      hint: "private _balance: number = 0;\n  deposit(amount: number): void {\n    this._balance += amount;\n  }\n  getBalance(): number {\n    return this._balance;\n  }",
      test: "if (typeof BankAccount !== 'function') return 'BankAccount topilmadi'; const acc = new BankAccount(); acc.deposit(100); if(acc.getBalance() !== 100) return 'Balans xato hisoblandi'; return null;"
    },
    {
      id: 3,
      title: "Protected maydoni",
      instruction: "Proteced `role` maydonini o'rnatuvchi `User` klassini yozing. Undan meros olgan `Admin` klassida rolni tekshirib true/false qaytaradigan `isAdmin()` metodini yozing (role = 'admin' bo'lsin).",
      startingCode: "class User {\n  protected role: string;\n  constructor(role: string) {\n    this.role = role;\n  }\n}\nclass Admin extends User {\n  // Admin klassini yozing\n}",
      hint: "constructor() {\n    super('admin');\n  }\n  isAdmin(): boolean {\n    return this.role === 'admin';\n  }",
      test: "if (typeof Admin !== 'function') return 'Admin topilmadi'; const adm = new Admin(); if(adm.isAdmin() !== true) return 'Protected maydon vorisda ishlamadi'; return null;"
    },
    {
      id: 4,
      title: "Readonly maydon klassda",
      instruction: "Konstruktorda faqat bir marta o'rnatiladigan va keyinchalik o'zgarishi kerak bo'lmagan `version` (string) maydoni bor `AppConfig` klassini yozing.",
      startingCode: "class AppConfig {\n  readonly version: string;\n  // Version o'rnating\n}",
      hint: "constructor(version: string) {\n    this.version = version;\n  }",
      test: "if (typeof AppConfig !== 'function') return 'AppConfig topilmadi'; const cfg = new AppConfig('1.0.0'); if (cfg.version !== '1.0.0') return 'Version xato'; return null;"
    },
    {
      id: 5,
      title: "Interface implements simulyatsiyasi",
      instruction: "Metodi `log(message)` bo'lgan Logger interfeysini realizatsiya qiluvchi `ConsoleLogger` klassini yozing. U log chaqirilganda berilgan xabarni qaytarishi kerak.",
      startingCode: "interface Logger {\n  log(message: string): string;\n}\nclass ConsoleLogger implements Logger {\n  // log metodini yozing\n}",
      hint: "log(message: string): string {\n    return message;\n  }",
      test: "if (typeof ConsoleLogger !== 'function') return 'ConsoleLogger topilmadi'; const logger = new ConsoleLogger(); if(logger.log('Hello') !== 'Hello') return 'Log metodi xato'; return null;"
    },
    {
      id: 6,
      title: "Abstrakt klass simulyatsiyasi",
      instruction: "Abstrakt `Shape` klassidan meros olgan va yuzini hisoblaydigan `getArea()` metodini yozgan `Square` klassini yozing (konstruktorda tomon uzunligi `side` qabul qilinadi).",
      startingCode: "abstract class Shape {\n  abstract getArea(): number;\n}\nclass Square extends Shape {\n  // Square klassini yozing\n}",
      hint: "side: number;\n  constructor(side: number) {\n    super();\n    this.side = side;\n  }\n  getArea(): number {\n    return this.side * this.side;\n  }",
      test: "if (typeof Square !== 'function') return 'Square topilmadi'; const sq = new Square(5); if(sq.getArea() !== 25) return 'Yuzani hisoblash xato'; return null;"
    },
    {
      id: 7,
      title: "Klass vorisligi va metodni qayta yozish (Override)",
      instruction: "Asosiy `Animal` klassida `makeSound()` metodi bor (u 'Some sound' qaytarsin). Undan meros olgan `Cat` klassida `makeSound()` metodini 'Meow' qaytaradigan qilib yozing.",
      startingCode: "class Animal {\n  makeSound(): string { return 'Some sound'; }\n}\nclass Cat extends Animal {\n  // makeSound qayta yozing\n}",
      hint: "makeSound(): string {\n    return 'Meow';\n  }",
      test: "if (typeof Cat !== 'function') return 'Cat topilmadi'; const cat = new Cat(); if (cat.makeSound() !== 'Meow') return 'Metod to\\'g\\'ri override qilinmadi'; return null;"
    },
    {
      id: 8,
      title: "Static maydon va metod",
      instruction: "Statik maydon `PI = 3.14` ga va statik metod `circleArea(radius)` (yuzani `PI * r * r` hisoblaydigan) ega `MathHelper` klassini yozing.",
      startingCode: "class MathHelper {\n  // Static maydon va metodlarni yozing\n}",
      hint: "static PI: number = 3.14;\n  static circleArea(radius: number): number {\n    return this.PI * radius * radius;\n  }",
      test: "if (typeof MathHelper !== 'function') return 'MathHelper topilmadi'; if(MathHelper.PI !== 3.14 || MathHelper.circleArea(2) !== 12.56) return 'Static a\\'zolar xato yozildi'; return null;"
    },
    {
      id: 9,
      title: "Getters va Setters",
      instruction: "Private `_age` maydoniga ega bo'lgan va `age` setter-ida faqat musbat sonlarni qabul qilib, bo'lmasa xato (throw Error) otadigan `Person` klassini yozing.",
      startingCode: "class Person {\n  // Metodlarni yozing\n}",
      hint: "private _age: number = 0;\n  get age(): number {\n    return this._age;\n  }\n  set age(val: number) {\n    if (val <= 0) throw new Error();\n    this._age = val;\n  }",
      test: "if (typeof Person !== 'function') return 'Person topilmadi'; const p = new Person(); p.age = 15; if (p.age !== 15) return 'Getter/Setter xato'; try { p.age = -5; return 'Setter manfiy sonni tekshirmadi'; } catch(e){} return null;"
    },
    {
      id: 10,
      title: "Parameter Properties",
      instruction: "Konstruktorda bitta qatorda `public name` va `public price` maydonlarini yaratib qiymat beradigan `Product` klassini yozing.",
      startingCode: "class Product {\n  // Parameter properties ko'rinishida yozing\n}",
      hint: "constructor(public name: string, public price: number) {}",
      test: "if (typeof Product !== 'function') return 'Product topilmadi'; const p = new Product('Phone', 500); if(p.name !== 'Phone' || p.price !== 500) return 'Obyekt maydonlari xato shakllandi'; return null;"
    },
    {
      id: 11,
      title: "Klass metodida zanjir (Chaining)",
      instruction: "Qiymati `value` (boshlang'ich 0) maydoniga ega, `add(x)` va `sub(x)` metodlari har doim `this` (klass obyektini) qaytarib, zanjirli chaqiruvlarni qo'llaydigan `Calculator` klassini yozing.",
      startingCode: "class Calculator {\n  value: number = 0;\n  // Metodlarni yozing\n}",
      hint: "add(x: number): this {\n    this.value += x;\n    return this;\n  }\n  sub(x: number): this {\n    this.value -= x;\n    return this;\n  }",
      test: "if (typeof Calculator !== 'function') return 'Calculator topilmadi'; const calc = new Calculator(); calc.add(10).sub(3); if (calc.value !== 7) return 'Zanjirli hisob-kitob ishlamadi'; return null;"
    },
    {
      id: 12,
      title: "Klass orqali obyekt nusxasini tekshirish (instanceof)",
      instruction: "Berilgan obyekt `Cat` klassining nusxasi ekanligini tekshirib true/false qaytaradigan `isCatInstance(obj)` funksiyasini yozing.",
      startingCode: "class Cat {}\nfunction isCatInstance(obj: any): boolean {\n  // instanceof dan foydalaning\n}",
      hint: "return obj instanceof Cat;",
      test: "if (typeof Cat === 'undefined') return 'Cat klassi topilmadi'; if(isCatInstance(new Cat()) !== true || isCatInstance({}) !== false) return 'instanceof tekshiruvi xato'; return null;"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Abstrakt Xossa va Metodni realizatsiya qilish",
      instruction: "Abstrakt `title` (string) maydoniga va abstrakt `summary()` (string qaytaruvchi) metodiga ega `Publication` abstrakt klassidan meros olgan `Book` klassini yozing. Konstruktorda `title` xossasini o'rnating, `summary()` metodi esa `Book: [title]` ko'rinishida qaytarsin.",
      startingCode: "abstract class Publication {\n  abstract title: string;\n  abstract summary(): string;\n}\n\nclass Book extends Publication {\n  // Book klassini yozing\n}",
      hint: "class Book extends Publication {\n  title: string;\n  constructor(title: string) {\n    super();\n    this.title = title;\n  }\n  summary(): string {\n    return `Book: ${this.title}`;\n  }\n}",
      test: "if (typeof Book !== 'function') return 'Book klassi topilmadi'; const b = new Book('JS Guide'); if (b.title !== 'JS Guide' || b.summary() !== 'Book: JS Guide') return 'Abstrakt a\'zolar xato realizatsiya qilindi'; return null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ 'override' yordamida metodni qayta yozish",
      instruction: "Metodi `greet()` (u 'Hello' qaytarsin) bo'lgan `BasePerson` klassidan meros olgan `SpecialPerson` klassini yarating va unda `greet()` metodini `override` kalit so'zi yordamida 'Hello Special' qaytaradigan qilib qayta yozing.",
      startingCode: "class BasePerson {\n  greet(): string {\n    return 'Hello';\n  }\n}\n\nclass SpecialPerson extends BasePerson {\n  // greet metodini override yordamida qayta yozing\n}",
      hint: "class SpecialPerson extends BasePerson {\n  override greet(): string {\n    return 'Hello Special';\n  }\n}",
      test: "if (typeof SpecialPerson !== 'function') return 'SpecialPerson topilmadi'; const sp = new SpecialPerson(); if (sp.greet() !== 'Hello Special') return 'Metodni override qilish noto\'g\'ri '); return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-da klass a'zolari (maydonlar va metodlar) uchun sukut bo'yicha (default) qaysi kirish modifikatori beriladi?",
      options: ["public", "private", "protected", "readonly"],
      correctAnswer: 0,
      explanation: "Agar klass a'zosiga hech qanday modifikator qo'yilmasa, u avtomatik ravishda `public` (ochiq) hisoblanadi."
    },
    {
      id: 2,
      question: "Qaysi modifikator maydonni faqat shu klass ichida ishlatish imkonini beradi va tashqaridan murojaatni taqiqlaydi?",
      options: ["protected", "public", "private", "static"],
      correctAnswer: 2,
      explanation: "private modifikatori maydon yoki metodni faqat o'sha klass tanasi ichida yopiq holda saqlash uchun ishlatiladi."
    },
    {
      id: 3,
      question: "protected va private modifikatorlarining asosiy farqi nimada?",
      options: [
        "protected faqat sonlarni tiplaydi",
        "private maydondan voris klasslar foydalana olmaydi, protected maydondan esa vorislar foydalana oladi",
        "protected o'zgaruvchini readonly qiladi",
        "private maydonlar tezroq ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Har ikkisi ham tashqaridan yopiq, lekin protected maydonlar ushbu klassdan meros olgan voris klasslar (subclasses) ichida ko'rinadi, private esa faqat o'zida ko'rinadi."
    },
    {
      id: 4,
      question: "Konstruktor argumentlarida `public` yoki `private` yozib, bir vaqtning o'zida klass xossasini yaratish va unga qiymat berish nima deyiladi?",
      options: ["Parameter Properties (Parametr xossalari)", "Abstract Properties", "Static Properties", "Index Signatures"],
      correctAnswer: 0,
      explanation: "Konstruktorda `constructor(private age: number)` ko'rinishida yozish klassda avtomatik age maydonini yaratib unga qiymat beradi. Bu kod hajmini qisqartiradi."
    },
    {
      id: 5,
      question: "Klass a'zosini faqat obyekt yaratishda yoki konstruktorda o'zgartira oladigan, keyinchalik esa faqat o'qish mumkin qiladigan kalit so'z qaysi?",
      options: ["const", "readonly", "static", "private"],
      correctAnswer: 1,
      explanation: "Readonly kalit so'zi klass maydoniga faqat o'zlashtirilgan yoki konstruktorda yozilgan qiymatni saqlab, keyin o'zgartirishni cheklaydi."
    },
    {
      id: 6,
      question: "Abstrakt klass (Abstract Class) nima?",
      options: [
        "Faqat static metodlardan iborat klass",
        "O'zidan bevosita obyekt olib bo'lmaydigan, faqat boshqa klasslar uchun andoza bo'lib xizmat qiladigan klass",
        "Xotirada joy egallamaydigan klass",
        "Hech qanday metodga ega bo'lmagan klass"
      ],
      correctAnswer: 1,
      explanation: "Abstrakt klasslardan `new` operatori bilan to'g'ridan-to'g'ri obyekt yaratib bo'lmaydi. Ular faqat meros olinishi (`extends`) uchun yaratiladi."
    },
    {
      id: 7,
      question: "Abstrakt metod (Abstract Method) nima?",
      options: [
        "Faqat son qaytaradigan metod",
        "Tanasi yozilmagan, faqat signaturasi e'lon qilingan va voris klasslar tomonidan implement qilinishi majburiy bo'lgan metod",
        "Klass yuklanishida birinchi ishlaydigan metod",
        "O'chirilishi kerak bo'lgan metod"
      ],
      correctAnswer: 1,
      explanation: "Abstrakt metodlar faqat abstrakt klasslarda e'lon qilinadi va undan meros oluvchi barcha klasslar bu metodni o'zlarida realizatsiya qilishlari shart."
    },
    {
      id: 8,
      question: "Static a'zolar (Static properties/methods) nima?",
      options: [
        "Faqat browser yopilganda ishlaydigan xossalar",
        "Klassning o'ziga tegishli bo'lgan, klass obyektini yaratmasdan murojaat qilinadigan xossalar",
        "Voris klasslarda ishlamaydigan xossalar",
        "O'zgarmas doimiy konstantalar"
      ],
      correctAnswer: 1,
      explanation: "Static a'zolar ob'ekt nusxasiga bog'liq emas, ular bevosita klass nomidan chaqiriladi (masalan: `MathHelper.circleArea()`)."
    },
    {
      id: 9,
      question: "Getter (get) va Setter (set) qanday ishlaydi?",
      options: [
        "Ular oddiy funksiyadek chaqiriladi: obj.getAge()",
        "Ular obyekt xossasidek ishlatiladi, lekin orqada mantiqiy kod bajaradi: obj.age = 20",
        "Ular faqat asinxron ishlaydi",
        "Ular klasslarni o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "Getter va setter metodlar yordamida private o'zgaruvchilarga xossalar kabi murojaat qilinadi, bu esa qiymat yozishda tekshiruvlar qo'shishga yordam beradi."
    },
    {
      id: 10,
      question: "Voros klassda (Subclass) ota klass konstruktorini chaqirish uchun qaysi kalit so'z ishlatiladi?",
      options: ["parent()", "super()", "this()", "constructor()"],
      correctAnswer: 1,
      explanation: "Subclass konstruktori ichida ota klass konstruktori va xossalarini to'g'ri ishlashi uchun birinchi bo'lib `super()` funksiyasi chaqirilishi shart."
    },
    {
      id: 11,
      question: "Klass ma'lum bir interfeys shartlarini bajarishini ta'minlash uchun qaysi kalit so'z yoziladi?",
      options: ["extends", "implements", "interface", "uses"],
      correctAnswer: 1,
      explanation: "Klass interfeysdagi barcha xossa va metodlarni realizatsiya qilishini ta'minlashda `implements` kalit so'zi qo'llaniladi."
    },
    {
      id: 12,
      question: "Obyekt ma'lum bir klass orqali yaratilganligini tekshirish uchun qaysi operator ishlatiladi?",
      options: ["typeof", "instanceof", "is", "as"],
      correctAnswer: 1,
      explanation: "`instanceof` operatori obyekt ma'lum klass prototip zanjiriga tegishli yoki yo'qligini tekshirib true/false qaytaradi."
    },
    {
      id: 13,
      question: "Voris klassda ota klassning metodini xavfsiz qayta yozish (override qilish) uchun qaysi kalit so'zidan (modifikatordan) foydalaniladi?",
      options: [
        "extends",
        "override",
        "super",
        "static"
      ],
      correctAnswer: 1,
      explanation: "`override` modifikatori voris klassdagi metod haqiqatdan ham ota klassda mavjud bo'lgan metodni qayta yozayotganini tekshirish uchun ishlatiladi."
    },
    {
      id: 14,
      question: "Abstrakt klasslarda abstrakt maydonlar (abstract properties/fields) e'lon qilinishi mumkinmi?",
      options: [
        "Yo'q, faqat abstrakt metodlar bo'lishi mumkin",
        "Ha, va voris klasslar ularni albatta o'zlarida realizatsiya qilishlari shart",
        "Ha, lekin ularga boshlang'ich qiymat berish majburiy",
        "Yo'q, interfeyslar maydonlarni taqiqlaydi"
      ],
      correctAnswer: 1,
      explanation: "Abstrakt klasslarda abstrakt maydonlar e'lon qilinishi mumkin va undan meros olgan voris klasslar bu maydonlarni realizatsiya qilishi (ya'ni qiymat berishi) majburiydir."
    }
  ]
};

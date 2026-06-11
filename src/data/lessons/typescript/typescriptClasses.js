export const typescriptClasses = {
  id: "typescriptClasses",
  title: "Klasslar va OOP",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Nega TypeScript klasslari kerak?
JavaScript ES6 versiyasidan boshlab klasslarni qo'llab-quvvatlaydi, biroq JavaScript-da klass maydonlari va metodlari sukut bo'yicha har doim ochiq (**public**) bo'ladi. Ularni tashqi muhitdan ishonchli himoya qilish, faqat o'qiladigan qilish (**readonly**) yoki ma'lum qoliplarga majburlash (interfeyslar va abstrakt klasslar orqali) imkoni yo'q.

**TypeScript klasslari** dasturlashda to'laqonli OOP (Obyektga Yo'naltirilgan Dasturlash) imkoniyatlarini taqdim etadi. Unda o'zgaruvchilarning ko'rinish doirasi (**Access Modifiers**), faqat o'qish rejimi (**readonly**), klass shablonlari (**Abstract Classes**) va interfeyslar mavjud.

### Real hayotiy analogiya
Klasslarni **kompaniya boshqaruvi tizimiga** o'xshatish mumkin:
* **Public (Ochiq):** Kompaniyaning **veb-saytidagi ma'lumotlar**. Uni istalgan odam (tashqaridan ham) ko'ra oladi va o'qiy oladi.
* **Private (Yopiq):** Kompaniyaning **moliyaviy hisobotlari**. Uni faqat direktor (klassning o'zi) ko'ra oladi, xodimlar yoki tashqi odamlar ko'ra olmaydi.
* **Protected (Himoyalangan):** Kompaniyaning **ichki qoidalari va texnologiyalari**. Uni kompaniya xodimlari va uning filiallari (voris klasslar - subclasses) ishlata oladi, lekin tashqi mijozlar ishlata olmaydi.
* **Abstract Class (Abstrakt klass):** Kompaniyaning **umumiy litsenziya talablari**. Siz bu talabning o'zidan filial ocholmaysiz, lekin unga moslab o'z filiallaringizni (subclasses) qurishingiz shart.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Access Modifiers va Readonly)
Klass maydonlariga kirish modifikatorlarini o'rnatish:
\`\`\`typescript
class UserAccount {
  public readonly username: string; // Faqat o'qiladi, hamma joydan ko'rinadi
  private balance: number;          // Faqat shu klass ichida ko'rinadi
  protected pinCode: number;        // Klass va uning vorislarida ko'rinadi

  constructor(username: string, balance: number, pinCode: number) {
    this.username = username;
    this.balance = balance;
    this.pinCode = pinCode;
  }

  public getBalance(): number {
    return this.balance; // private xossani faqat klass ichida o'qish
  }
}
\`\`\`

### 2. Intermediate Example (Parameter Properties va Getter/Setter)
Konstruktor yozishni qisqartirish va qiymatlarni nazorat qilish:
\`\`\`typescript
class Employee {
  // Parameter Properties: maydonlarni e'lon qilish va qiymat berish bitta qatorda
  constructor(public name: string, private _salary: number) {}

  // Getter - xossani o'qish uchun
  get salary(): number {
    return this._salary;
  }

  // Setter - qiymat yozishda tekshiruv o'rnatish
  set salary(newSalary: number) {
    if (newSalary < 0) {
      throw new Error("Maosh manfiy bo'lishi mumkin emas!");
    }
    this._salary = newSalary;
  }
}
\`\`\`

### 3. Advanced Example (Abstract Class va override)
Abstrakt klass shablonidan meros olish va metodni qayta yozish:
\`\`\`typescript
abstract class DatabaseConnector {
  abstract dbUri: string; // Voris klass realizatsiya qilishi shart
  
  abstract connect(): void; // Tanasi yo'q abstrakt metod

  disconnect(): void {
    console.log("Ulanish uzildi."); // Tayyor metod
  }
}

class PostgresConnector extends DatabaseConnector {
  dbUri = "postgresql://localhost:5432"; // Abstrakt maydon realizatsiyasi

  // Ota klass metodini xavfsiz override qilish
  override connect(): void {
    console.log(\`PostgreSQL-ga ulanmoqda: \${this.dbUri}\`);
  }
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Inkapsulyatsiyaning buzilishi:** JavaScript-da klass xossalarini istalgan tashqi kod o'zgartirib yuborishi mumkin edi. Bu dasturdagi kutilmagan xatolarga olib kelardi. TS-dagi \`private\` va \`protected\` bu xavfni butunlay yo'q qiladi.
* **Qoliplarning yo'qligi:** Katta jamoalarda barcha ma'lumotlar bazasi ulagichlari yoki to'lov tizimlari bir xil standartga bo'ysunishi kerak. Abstrakt klasslar yordamida biz barcha voris klasslarni majburiy metodlarni yozishga majburlay olamiz.
* **Kodni o'qish qiyinligi:** Konstruktorda maydonlarni alohida e'lon qilib, keyin qiymat berish juda ko'p qatorli kod talab qiladi. \`Parameter properties\` yordamida kod hajmi 3-4 barobargacha qisqaradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`private\` maydonlarni tashqaridan o'zgartirishga urinish
#### Xato:
\`\`\`typescript
class Player {
  private score = 0;
}
const p = new Player();
p.score = 100; // XATO! TS kompilyator bunga yo'l qo'ymaydi
\`\`\`

### 2. Abstrakt klassdan ob'ekt yaratishga urinish
#### Xato:
\`\`\`typescript
abstract class Animal {}
const pet = new Animal(); // XATO! Abstrakt klassdan to'g'ridan-to'g'ri nusxa olib bo'lmaydi
\`\`\`

### 3. Voris klassda ota klass konstruktorini chaqirishni unutish (\`super()\`)
#### Xato:
\`\`\`typescript
class Animal {
  constructor(public name: string) {}
}
class Dog extends Animal {
  constructor(name: string, public breed: string) {
    // XATO! super(name) chaqirilishi shart
    this.breed = breed;
  }
}
\`\`\`

### 4. \`readonly\` maydonni konstruktordan tashqarida o'zgartirish
#### Xato:
\`\`\`typescript
class ServerConfig {
  readonly port = 8080;
}
const cfg = new ServerConfig();
cfg.port = 3000; // XATO! readonly maydonni faqat e'lon qilinganda yoki konstruktorda o'zgartirish mumkin
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** TypeScript-da klass a'zolari uchun default modifikator qaysi?
   * **Javob:** Sukut bo'yicha barcha maydon va metodlar \`public\` bo'ladi.
2. **Savol:** \`private\` va \`protected\` farqi nimada?
   * **Javob:** \`private\` xossaga faqat klass ichida kiriladi. \`protected\` xossaga esa klass ichida va undan meros olgan voris klasslar ichida ham kirish mumkin.
3. **Savol:** \`readonly\` modifikatorining vazifasi nima?
   * **Javob:** Klass xossasini faqat o'qiladigan qiladi. Uni faqat e'lon qilish paytida yoki konstruktor ichida o'rnatish mumkin.
4. **Savol:** Parameter Properties nima va u qanday yoziladi?
   * **Javob:** Konstruktor parametrida kirish modifikatorini yozib, klass xossasini avtomatik yaratish usuli (masalan: \`constructor(public name: string) {}\`).

### Middle
5. **Savol:** Abstrakt klass (Abstract Class) nima uchun kerak?
   * **Javob:** O'zidan obyekt yaratib bo'lmaydigan, faqat andoza (shablon) bo'lib xizmat qiladigan va voris klasslar uchun majburiy metodlarni belgilaydigan klass.
6. **Savol:** \`implements\` va \`extends\` farqi nimada?
   * **Javob:** \`extends\` klassdan yangi klass yaratish (meros olish) uchun, \`implements\` esa klass interfeys shartlariga mos kelishini ta'minlash uchun ishlatiladi.
7. **Savol:** Getter va Setter nima va u qanday foyda beradi?
   * **Javob:** Private maydonlarga murojaatni boshqarish va qiymat yozish/o'qishda qo'shimcha mantiqiy tekshiruvlar yoki hisob-kitoblarni amalga oshirish vositasi.
8. **Savol:** \`override\` kalit so'zi nima uchun ishlatiladi?
   * **Javob:** Voris klassda ota klass metodini qayta yozishda xatolikni oldini olish uchun (agar ota klassdagi metod nomi o'zgarsa, TS xato beradi).

### Senior
9. **Savol:** TypeScript klasslaridan o'girilgan JS kodi qanday ko'rinadi?
   * **Javob:** Barcha kirish modifikatorlari, interfeyslar va abstrakt shartlar olib tashlanib, oddiy ES6 klasslariga (yoki ES5 prototip funksiyalariga) o'giriladi.
10. **Savol:** Abstrakt maydon (abstract field) nima va uning interfeys xossasidan farqi bormi?
    * **Javob:** Abstrakt maydon abstrakt klassda e'lon qilinadi va vorislar uni realizatsiya qilishi shart. Interfeysdan farqli ravishda, abstrakt klass runtime-da ham mavjud bo'ladi.
11. **Savol:** Static maydon va metodlar nima va ularga qanday murojaat qilinadi?
    * **Javob:** Klass obyekti yaratilmasdan to'g'ridan-to'g'ri klassning o'ziga tegishli bo'lgan a'zolar. Ularga \`KlassNomi.metod()\` shaklida murojaat qilinadi.
12. **Savol:** \`instanceof\` operatori qanday ishlaydi va klasslar bilan qanday bog'liq?
    * **Javob:** Obyekt ma'lum bir klass prototip zanjiriga tegishli ekanligini runtime-da tekshirib, \`true\` yoki \`false\` qaytaradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida kirish modifikatorlari (Visibility Modifiers) va klass merosxo'rligi (Inheritance) zanjirini ko'rsatuvchi diagrammalar taqdim etilgan:

### A. Kirish Modifikatorlari Diagrammasi
\`\`\`mermaid
graph TD
    A[Klass A'zolari] --> B[public: Istalgan joydan kirish mumkin]
    A --> C[protected: Klass va uning vorislari ichidan]
    A --> D[private: Faqat klassning o'zi ichidan]
\`\`\`

### B. Klass Merosxo'rligi va Override Diagrammasi
\`\`\`mermaid
classDiagram
    class Vehicle {
        <<abstract>>
        #brand: string
        +getCapacity()* number
    }
    class Truck {
        -capacity: number
        +override getCapacity() number
    }
    Vehicle <|-- Truck : extends
\`\`\`

Mashqlar interaktiv kod tekshiruvchi orqali pastda bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi test topshiriqlari quyida berilgan bo'lib, ular yordamida o'z bilimlaringizni tekshirishingiz mumkin.

---

## 8. 🎯 Real Project Case Study

### Xavfsiz To'lov Gateway Tizimi (Payment Gateway Integration)
Katta loyihalarda har xil to'lov tizimlarini (Stripe, PayPal, Click) bir xil qolip asosida integratsiya qilish talab etiladi. Buning uchun abstrakt klassdan foydalanamiz.

\`\`\`typescript
abstract class PaymentGateway {
  // Barcha to'lovlar uchun umumiy bo'lgan readonly kalit
  constructor(protected readonly apiKey: string) {}

  // Har bir gateway o'ziga xos tarzda to'lovni amalga oshiradi
  abstract processPayment(amount: number): boolean;

  // Umumiy yordamchi metod
  protected logTransaction(amount: number, status: string): void {
    console.log(\`[Transaction]: Amount \${amount} USD, Status: \${status}\`);
  }
}

class StripeGateway extends PaymentGateway {
  // Ota klass konstruktorini chaqirish
  constructor(apiKey: string) {
    super(apiKey);
  }

  // Abstrakt metodni realizatsiya qilish
  override processPayment(amount: number): boolean {
    console.log(\`Stripe Gateway API orqali \${amount} USD to'lanmoqda...\`);
    // API so'rov yuborish simulyatsiyasi
    const success = true; 
    this.logTransaction(amount, success ? "SUCCESS" : "FAILED");
    return success;
  }
}

// Ishlatilishi:
const stripe = new StripeGateway("sk_live_12345");
stripe.processPayment(150);
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Zero-Cost Abstraction:** TypeScript-dagi kirish modifikatorlari (\`private\`, \`protected\`, \`public\`) faqat kompilyatsiya vaqtidagi tekshiruvlardir. Ular JavaScript-ga o'girilganda mutlaqo o'chib ketadi, shu sababli runtime ishlash tezligiga salbiy ta'sir ko'rsatmaydi.
* **Classes vs Interfaces:** Agar sizga faqat obyektning turi (tiplar) kerak bo'lsa, har doim interfeys (\`interface\`) ishlating. Klasslardan faqat mantiqiy kod, metodlar yoki obyekt yaratish konstruktori zarur bo'lgandagina foydalaning. Bu JS faylining yakuniy hajmini kichikroq saqlashga yordam beradi.

---

## 10. 📌 Cheat Sheet

| Modifikator | Klass ichida | Voris klassda | Tashqarida | JS-da mavjudmi |
| :--- | :--- | :--- | :--- | :--- |
| **public** | Ha | Ha | Ha | Ha (sukut bo'yicha) |
| **protected** | Ha | Ha | Yo'q | Yo'q (JS-da o'chadi) |
| **private** | Ha | Yo'q | Yo'q | Yo'q (JS-da o'chadi) |
| **readonly** | Faqat o'qiladi / o'rnatiladi | Faqat o'qiladi | Faqat o'qiladi | Yo'q (JS-da o'chadi) |
`,
  exercises: [
    {
      id: 1,
      title: "Klass yaratish va Parameter Properties",
      instruction: "Konstruktorda parameter properties yordamida `brand` (string) va `price` (number) xossalarini qabul qilib, ularni o'rnatadigan `Car` klassini yozing. Har ikkala xossa ham tashqaridan o'qilishi (`public`) bo'lishi kerak.",
      startingCode: "class Car {\n  // Parameter properties yordamida konstruktorni yozing\n}",
      hint: "constructor(public brand: string, public price: number) {}",
      test: "if (typeof Car !== 'function') return 'Car klassi topilmadi'; const c = new Car('Tesla', 50000); if (c.brand !== 'Tesla' || c.price !== 50000) return 'Maydonlar xato o\\'rnatildi'; return null;"
    },
    {
      id: 2,
      title: "Private balans va Getter/Setter",
      instruction: "Klass ichida private `_balance` (boshlang'ich qiymati 0 bo'lgan number) xossasini e'lon qiling. Balansni o'qish uchun `balance` getter-ini va faqat musbat sonlarni qo'shadigan `deposit(amount: number)` metodini yarating (agar `amount <= 0` bo'lsa, xato `Error` tashlasin).",
      startingCode: "class BankAccount {\n  // Private maydon, getter va deposit metodini yozing\n}",
      hint: "private _balance: number = 0;\nget balance(): number { return this._balance; }\ndeposit(amount: number) {\n  if (amount <= 0) throw new Error();\n  this._balance += amount;\n}",
      test: "if (typeof BankAccount !== 'function') return 'BankAccount topilmadi'; const acc = new BankAccount(); if (acc.balance !== 0) return 'Boshlang\\'ich balans 0 bo\\'lishi kerak'; acc.deposit(150); if (acc.balance !== 150) return 'deposit() balansi to\\'g\\'ri oshirmadi'; try { acc.deposit(-50); return 'deposit() manfiy qiymatni qabul qilmasligi kerak'; } catch(e) {} return null;"
    },
    {
      id: 3,
      title: "Abstrakt klass va override",
      instruction: "Abstrakt `Vehicle` klassidan meros olgan `Truck` klassini yarating. `Vehicle` klassida abstrakt `getCapacity(): number` metodi bor. `Truck` klassi konstruktorda `capacity` (number) qabul qilsin va `getCapacity()` metodini `override` modifikatori yordamida realizatsiya qilib, o'sha sig'imni qaytarsin.",
      startingCode: "abstract class Vehicle {\n  abstract getCapacity(): number;\n}\n\nclass Truck extends Vehicle {\n  // Truck klassini yozing\n}",
      hint: "class Truck extends Vehicle {\n  constructor(private capacity: number) {\n    super();\n  }\n  override getCapacity(): number {\n    return this.capacity;\n  }\n}",
      test: "if (typeof Truck !== 'function') return 'Truck klassi topilmadi'; const t = new Truck(5000); if (t.getCapacity() !== 5000) return 'getCapacity() xato qiymat qaytardi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-da klass maydonlari va metodlari uchun sukut bo'yicha (default) qaysi kirish modifikatori beriladi?",
      options: ["public", "private", "protected", "readonly"],
      correctAnswer: 0,
      explanation: "Agar klass a'zosiga hech qanday modifikator qo'yilmasa, u avtomatik ravishda `public` (ochiq) deb hisoblanadi."
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
      question: "Konstruktor argumentlarida kirish modifikatorlarini yozib, bir vaqtning o'zida klass xossasini yaratish va unga qiymat berish nima deyiladi?",
      options: ["Parameter Properties", "Abstract Properties", "Static Properties", "Index Signatures"],
      correctAnswer: 0,
      explanation: "Konstruktorda `constructor(private age: number)` ko'rinishida yozish klassda avtomatik age maydonini yaratib unga qiymat beradi. Bu Parameter Properties deyiladi."
    },
    {
      id: 5,
      question: "Klass a'zosini faqat obyekt yaratishda yoki konstruktorda o'zgartira oladigan, keyinchalik esa faqat o'qish mumkin qiladigan kalit so'z qaysi?",
      options: ["const", "readonly", "static", "private"],
      correctAnswer: 1,
      explanation: "readonly kalit so'zi klass maydoniga faqat o'zlashtirilgan yoki konstruktorda yozilgan qiymatni saqlab, keyin o'zgartirishni cheklaydi."
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
      explanation: "Abstrakt klasslardan new operatori bilan to'g'ridan-to'g'ri obyekt yaratib bo'lmaydi. Ular faqat meros olinishi (extends) uchun yaratiladi."
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
      explanation: "Static a'zolar ob'ekt nusxasiga bog'liq emas, ular bevosita klass nomidan chaqiriladi."
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
      explanation: "Getter va setter metodlar yordamida private o'zgaruvchilarga xossalar kabi murojaat qilinadi."
    },
    {
      id: 10,
      question: "Voris klassda (Subclass) ota klass konstruktorini chaqirish uchun qaysi kalit so'z ishlatiladi?",
      options: ["parent()", "super()", "this()", "constructor()"],
      correctAnswer: 1,
      explanation: "Subclass konstruktori ichida ota klass konstruktori va xossalarini to'g'ri ishlashi uchun birinchi bo'lib super() funksiyasi chaqirilishi shart."
    },
    {
      id: 11,
      question: "Voris klassda ota klassning metodini xavfsiz qayta yozish (override qilish) uchun qaysi kalit so'zidan (modifikatordan) foydalaniladi?",
      options: ["extends", "override", "super", "static"],
      correctAnswer: 1,
      explanation: "override modifikatori voris klassdagi metod haqiqatdan ham ota klassda mavjud bo'lgan metodni qayta yozayotganini tekshirish uchun ishlatiladi."
    },
    {
      id: 12,
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


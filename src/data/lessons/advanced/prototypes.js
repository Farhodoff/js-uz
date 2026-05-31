export const prototypesLesson = {
  id: "a18",
  title: "Prototypes va OOP: JavaScript'ning Ob'ekt-Yo'naltirilgan Dasturlash mexanizmi",
  level: "Murakkab",
  description: "Prototype chain, Inheritance, ES6 Classes, va JavaScript OOP mexanizmi.",
  theory: `## 1. NEGA kerak?
JavaScript-da kodni qayta ishlatish va obyektlar o'rtasida "vorislik" (inheritance) o'rnatish uchun **Prototype (Prototip)** kerak. Masalan, har bir yaratilgan massivda \`.map()\` yoki \`.filter()\` metodlarining mavjud bo'lish sababi — ular massiv prototipiga bir marta yozib qo'yilgan. Bu har bir yangi obyekt uchun alohida nusxa yaratmasdan, xotirani tejash imkonini beradi.

## 2. SODDALIK (Analogiya)
Buni **oila vorisligi (merosxo'rlik)** deb tasavvur qiling:
- **Bobo (Base Prototype):** Eng asosiy oilaviy xususiyatlar.
- **Ota (Parent Prototype):** Bobodan meros olgan va yangi xususiyatlar qo'shgan.
- **Siz (Object Instance):** Otangizdan meros olgansiz.

Agar sizda biror narsa (masalan, mashina kaliti) bo'lmasa, siz uni otangizdan so'raysiz. Agar unda ham bo'lmasa, bobongizdan izlaysiz. Bu qidiruv zanjiri **Prototype Chain (Prototip zanjiri)** deyiladi.

## 3. STRUKTURA
JavaScript-da deyarli barcha obyektlar yashirin \`__proto__\` xususiyatiga ega. U o'zining "ota" prototipiga ishora qiladi.
1. **Prototype Chain (Prototip zanjiri):** Obyekt -> Prototip -> Prototip -> ... -> Object.prototype -> null.
2. **Constructor funksiyalar:** Yangi obyektlar yaratish uchun \`new\` kalit so'zi bilan chaqiriladigan funksiyalar.
3. **Klasslar (ES6 Classes):** Prototipga asoslangan merosxo'rlikni yozishning osonroq sintaktik qobig'i (syntactic sugar).

### A. Prototip Metodlarida 'this' ning Bog'lanishi
Prototipdagi metodlar meros qilib olingan bo'lishidan qat'iy nazar, chaqirilganda \`this\` doimo nuqtadan chapdagi obyektga, ya'ni metodni chaqirayotgan instansning o'ziga bog'lanadi. Bu prototip obyekti barcha nusxalar uchun umumiy bo'lsa-da, ularning holatlari (states) mustaqil qolishini ta'minlaydi:
\`\`\`javascript
const user = {
  name: "Ali",
  sayHi() {
    return \`Salom, \${this.name}\`;
  }
};
const admin = Object.create(user);
admin.name = "Vali"; // admin obyektida name xossasi yaratiladi
console.log(admin.sayHi()); // "Salom, Vali" (this -> admin, user.name esa o'zgarmaydi)
\`\`\`

### B. for..in Loop vs Object.keys()
- **\`for..in\` tsikli:** Obyektning o'z xossalari bilan birga prototip zanjiridagi barcha enumerable (aylanish ruxsat etilgan) xossalarni ham aylanib chiqadi.
- **\`Object.keys()\` metodi:** Faqat obyektning o'ziga tegishli bo'lgan (own property) enumerable xossalar massivini qaytaradi.

Meros bo'lib kelgan xossalarni filtrlash uchun \`hasOwnProperty()\` metodidan foydalaniladi:
\`\`\`javascript
const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.jumps = true;

// for..in ikkalasini ham chiqaradi
for(let key in rabbit) {
  if (rabbit.hasOwnProperty(key)) {
    console.log(\`Shaxsiy: \${key}\`); // "jumps"
  } else {
    console.log(\`Meros: \${key}\`); // "eats"
  }
}
console.log(Object.keys(rabbit)); // ["jumps"]
\`\`\`

### C. Object.create va Property Descriptors
\`Object.create()\` metodining ikkinchi argumenti yordamida yangi yaratilayotgan obyekt xossalari uchun qat'iy cheklovlar (deskriptorlar) o'rnatish mumkin:
\`\`\`javascript
const parent = { greet() { return "Salom"; } };
const child = Object.create(parent, {
  id: {
    value: 101,
    writable: false,      // O'zgartirib bo'lmaydi
    configurable: false,  // O'chirib bo'lmaydi
    enumerable: true      // Tsikllarda ko'rinadi
  }
});
\`\`\`

### D. __proto__ Obyektning O'zida Joylashmagan
Siz bilgan \`__proto__\` aslida obyektning ichki xossasi emas, balki \`Object.prototype\` dagi maxsus getter va setter (accessor) hisoblanadi. Agar siz \`Object.create(null)\` orqali prototipsiz obyekt yaratsangiz, unda \`__proto__\` getter/setter bo'lmaydi va u oddiy kalit-qiymat kabi ishlaydi:
\`\`\`javascript
const cleanObj = Object.create(null);
cleanObj.__proto__ = "test"; // oddiy xossa bo'lib qo'shiladi, prototip o'zgarmaydi!
console.log(Object.getPrototypeOf(cleanObj)); // null
\`\`\`

### E. Prototip Zanjiri va 'this' Dinamik Bog'lanishi (Mermaid)

Quyidagi diagrammada prototip zanjiri va \`this\` kalit so'zining instansga bog'lanishi vizual ko'rsatilgan:

\`\`\`mermaid
graph TD
    subgraph Prototypes [Prototiplar Zanjiri]
        ObjProto["Object.prototype<br/>- toString()"] -->|__proto__| NullProto["null"]
        UserProto["user (Prototype)<br/>- name: 'Ali'<br/>- sayHi()"] -->|__proto__| ObjProto
    end
    
    subgraph Instances [Instanslar]
        AdminInst["admin (Instance)<br/>- name: 'Vali'"] -->|__proto__| UserProto
    end
    
    AdminInst -->|Chaqiriq: admin.sayHi()| UserProto
    UserProto -.->|this metod ichida| AdminInst
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)
Merosxo'rlik zanjirini o'rnatish va prototipga metod qo'shish misoli:
\`\`\`javascript
// 1. Konstruktor funksiya
function Animal(name) {
  this.name = name;
}

// 2. Prototipga metod qo'shish (Xotira tejaladi)
Animal.prototype.eat = function() {
  return this.name + " ovqatlanmoqda.";
};

// 3. Merosxo'rlik o'rnatish
function Dog(name) {
  Animal.call(this, name); // Ota konstruktorni chaqirish
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Konstruktorni qayta bog'lash

const rex = new Dog("Rex");
console.log(rex.eat()); // "Rex ovqatlanmoqda."
\`\`\`

## 5. XATOLAR (Common mistakes)
- **__proto__ xususiyatini qo'lda o'zgartirish:** \`obj.__proto__ = parent\` yozish juda sekin ishlaydi va brauzer optimallashtirishini buzadi. Buning o'rniga \`Object.create()\` yoki \`Object.setPrototypeOf()\` ishlatish kerak.
- **Konstruktor prototype-ni butunlay almashtirganda constructor-ni yo'qotib qo'yish:**
  \`\`\`javascript
  User.prototype = { sayHi() {} }; // constructor xossasi yo'qoladi!
  // To'g'risi: User.prototype.sayHi = function() {} yoki constructor-ni yozish:
  User.prototype = { constructor: User, sayHi() {} };
  \`\`\`
- **Mavjud built-in prototiplarni o'zgartirish (Monkey Patching):** \`Array.prototype.myMethod = ...\` yozish boshqa kutubxonalar va JS kelajak versiyalari bilan ziddiyat keltirib chiqaradi.

## 6. SAVOLLAR VA JAVOBLAR
**1. prototype va __proto__ farqi nimada?**
\`prototype\` — faqat funksiyalarga tegishli xususiyat bo'lib, \`new\` bilan obyekt yaratilganda o'sha obyektga beriladigan prototipni belgilaydi. \`__proto__\` esa har bir obyektning o'z ota prototipiga bo'lgan yashirin havolasidir.

**2. Object.create(null) nima qiladi?**
U mutlaqo prototipsiz obyekt yaratadi. Unda standart \`toString\` yoki \`hasOwnProperty\` metodlari ham bo'lmaydi.

**3. instanceof operatori qanday ishlaydi?**
U obyektning prototiplar zanjirini tekshiradi va u yerda berilgan klassning \`prototype\` obyekti bor-yo'qligini aniqlaydi.
`,
  exercises: [
    {
      id: 1,
      title: "Simple Prototype",
      instruction: "Person.prototype-ga 'sayHi' metodini qo'shing (metod 'Hi' matnini qaytarsin).",
      startingCode: "function Person(n) { this.name = n; }\n// Bu yerga yozing\nconst p = new Person('Ali');",
      hint: "Person.prototype.sayHi = function() { return 'Hi'; };",
      test: "if (p.sayHi && p.sayHi() === 'Hi') return null; return 'sayHi metodini Person.prototype ga qo\\'shing';"
    },
    {
      id: 2,
      title: "Getter in Prototype",
      instruction: "Car konstruktori prototipiga mashina yoshi (hozirgi yildan ishlab chiqarilgan yilini ayirish) qaytaradigan getAge(currentYear) metodini qo'shing.",
      startingCode: "function Car(make, year) { this.make = make; this.year = year; }\n// getAge metodini prototipga qo'shing\n",
      hint: "Car.prototype.getAge = function(currentYear) { return currentYear - this.year; };",
      test: "if (code.includes('Car.prototype.getAge') && code.includes('this.year')) return null; return 'Car.prototype.getAge metodini to\\'g\\'ri yozing';"
    },
    {
      id: 3,
      title: "Object.create()",
      instruction: "Object.create() yordamida animal obyektini prototip qilib olgan yangi dog obyektini yarating.",
      startingCode: "const animal = { eats: true };\n// dog obyektini animaldan yarating\nconst dog = null;",
      hint: "const dog = Object.create(animal);",
      test: "if (code.includes('Object.create(animal)')) return null; return 'Object.create(animal) orqali dog yarating';"
    },
    {
      id: 4,
      title: "hasOwnProperty()",
      instruction: "Obyektning o'z xususiyatini tekshiradigan checkOwn(obj, prop) funksiyasini yozing.",
      startingCode: "function checkOwn(obj, prop) {\n  // hasOwnProperty orqali tekshiring\n}",
      hint: "return obj.hasOwnProperty(prop);",
      test: "if (code.includes('hasOwnProperty')) return null; return 'hasOwnProperty metodidan foydalaning';"
    },
    {
      id: 5,
      title: "Set Prototype",
      instruction: "Object.setPrototypeOf() yordamida admin obyektining prototipini user obyektiga o'rnating.",
      startingCode: "const user = { login: true };\nconst admin = { delete: true };\n// Prototipni bog'lang\n",
      hint: "Object.setPrototypeOf(admin, user);",
      test: "if (code.includes('Object.setPrototypeOf(admin, user)')) return null; return 'Object.setPrototypeOf dan foydalanib bog\\'lang';"
    },
    {
      id: 6,
      title: "Object.getPrototypeOf()",
      instruction: "Berilgan obyektning prototipini qaytaradigan getProto(obj) funksiyasini yozing.",
      startingCode: "function getProto(obj) {\n  // Prototipni qaytaring\n}",
      hint: "return Object.getPrototypeOf(obj);",
      test: "if (code.includes('Object.getPrototypeOf')) return null; return 'Object.getPrototypeOf metodidan foydalaning';"
    },
    {
      id: 7,
      title: "Prototype Constructor Property",
      instruction: "Konstruktor funksiya prototipini qayta yozgandan so'ng, constructor xossasini yana o'ziga qaytarib bog'lang.",
      startingCode: "function User(name) { this.name = name; }\nUser.prototype = {\n  // constructor xossasini User-ga qayta ulang\n  sayHello() { return 'Hello'; }\n};",
      hint: "constructor: User,",
      test: "if (code.includes('constructor:') && code.includes('User')) return null; return 'constructor: User xossasini qo\\'shing';"
    },
    {
      id: 8,
      title: "Inheriting Prototype Methods",
      instruction: "Rabbit klassi Animal klassidan meros olishi uchun Rabbit.prototype-ni Object.create(Animal.prototype) yordamida to'g'rilang.",
      startingCode: "function Animal() {}\nAnimal.prototype.run = function() {};\nfunction Rabbit() {}\n// Rabbit prototipini Animal prototipidan yarating\n",
      hint: "Rabbit.prototype = Object.create(Animal.prototype); Rabbit.prototype.constructor = Rabbit;",
      test: "if (code.includes('Object.create(Animal.prototype)')) return null; return 'Rabbit.prototype-ni Animal.prototype-dan Object.create orqali yarating';"
    },
    {
      id: 9,
      title: "Polymorphism (Method Overriding)",
      instruction: "Prototipdagi default toString metodini o'zgartirib (override), shaxs ismini qaytaradigan Person.prototype.toString yozing.",
      startingCode: "function Person(name) { this.name = name; }\n// toString metodini override qiling\n",
      hint: "Person.prototype.toString = function() { return this.name; };",
      test: "if (code.includes('Person.prototype.toString') && code.includes('this.name')) return null; return 'toString metodini person ismini qaytaradigan qilib yozing';"
    },
    {
      id: 10,
      title: "Checking Instance (instanceof)",
      instruction: "Berilgan obyekt Array instansi ekanligini instanceof orqali tekshirib qaytaruvchi funksiya islandsArray(obj) yozing.",
      startingCode: "function islandsArray(obj) {\n  // instanceof dan foydalaning\n}",
      hint: "return obj instanceof Array;",
      test: "if (code.includes('instanceof') && code.includes('Array')) return null; return 'instanceof Array dan foydalaning';"
    },
    {
      id: 11,
      title: "Custom String method",
      instruction: "Barcha stringlarda ishlaydigan reverse() metodini String.prototype ga qo'shing.",
      startingCode: "// String prototipiga reverse metodini ulang\n",
      hint: "String.prototype.reverse = function() { return this.split('').reverse().join(''); };",
      test: "if (code.includes('String.prototype.reverse') && (code.includes('split') || code.includes('reverse') || code.includes('join'))) return null; return 'String.prototype.reverse metodini yozing';"
    },
    {
      id: 12,
      title: "Pure Object",
      instruction: "Prototipsiz (hech qanday __proto__ yoki Object.prototype metodlarisiz) mutlaqo toza obyekt yarating va pureObj o'zgaruvchisiga saqlang.",
      startingCode: "// Prototipsiz obyekt yarating\nconst pureObj = null;",
      hint: "const pureObj = Object.create(null);",
      test: "if (code.includes('Object.create(null)')) return null; return 'Object.create(null) orqali prototipsiz obyekt yarating';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Object.create va Property Descriptors",
      instruction: "`Object.create(proto, descriptors)` yordamida `machine` obyektidan meros oladigan va qo'shimcha ravishda faqat o'qish uchun mo'ljallangan (`writable: false`, `configurable: false`) `serialNumber` (qiymati 'SN-999') xossasiga ega bo'lgan yangi `robot` obyektini yarating.",
      startingCode: "const machine = { status: 'active' };\n// Object.create yordamida robot yarating\nconst robot = null;",
      hint: "const robot = Object.create(machine, {\n  serialNumber: {\n    value: 'SN-999',\n    writable: false,\n    configurable: false,\n    enumerable: true\n  }\n});",
      test: "if (robot.status !== 'active') return 'status meros olinmadi'; if (robot.serialNumber !== 'SN-999') return 'serialNumber xato'; robot.serialNumber = '123'; if (robot.serialNumber === 'SN-999') return null; return 'Xossa writable bo\'lmasligi kerak edi';"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ for..in va hasOwnProperty yordamida Own Properties filtrlash",
      instruction: "Berilgan obyektning faqat o'ziga tegishli (own property) bo'lgan barcha kalitlari (keys) ro'yxatini massiv ko'rinishida qaytaruvchi `getOwnProperties(obj)` funksiyasini yozing. Buning uchun `for..in` tsikli va `hasOwnProperty` metodidan foydalanim (built-in Object.keys() ishlatmang).",
      startingCode: "function getOwnProperties(obj) {\n  const keys = [];\n  // for..in va hasOwnProperty ishlating\n  return keys;\n}",
      hint: "for(let key in obj) {\n  if (obj.hasOwnProperty(key)) keys.push(key);\n}",
      test: "if (typeof getOwnProperties !== 'function') return 'getOwnProperties topilmadi'; const parent = { a: 1 }; const child = Object.create(parent); child.b = 2; const keys = getOwnProperties(child); if (keys.length === 1 && keys[0] === 'b') return null; return 'Faqat shaxsiy xossalar qaytarilishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da obyektlar o'rtasida metodlar va xususiyatlar qanday uzatiladi?",
      options: [
        "Klasslar nusxalanishi orqali",
        "Prototip zanjiri orqali (Prototype chain)",
        "Global o'zgaruvchilar orqali",
        "Funksiyalar chaqirilishi orqali"
      ],
      correctAnswer: 1,
      explanation: "JS prototiplarga asoslangan, har bir obyekt o'z prototipidan meros oladi."
    },
    {
      id: 2,
      question: "`Object.create(parent)` metodi nima qiladi?",
      options: [
        "Yangi obyekt yaratadi va prototipini parent-ga tenglashtiradi",
        "Parent-ni nusxalaydi",
        "Parent-ni o'chiradi",
        "Static metod yaratadi"
      ],
      correctAnswer: 0,
      explanation: "`Object.create` yangi obyekt yaratishda uning prototipini belgilash imkonini beradi."
    },
    {
      id: 3,
      question: "Obyektning prototipini olish uchun eng zamonaviy va tavsiya etilgan metod qaysi?",
      options: [
        "`obj.__proto__`",
        "`Object.getPrototypeOf(obj)`",
        "`obj.getPrototype()`",
        "`typeof obj`"
      ],
      correctAnswer: 1,
      explanation: "`__proto__` eski va norasmiy bo'lib, uning o'rniga ES6 standartidagi xavfsiz `Object.getPrototypeOf(obj)` metodidan foydalanish tavsiya etiladi."
    },
    {
      id: 4,
      question: "Agar obyektdan biror xususiyat izlansa va u obyekting o'zida topilmasa, JavaScript nima qiladi?",
      options: [
        "Darhol `undefined` qaytaradi",
        "`ReferenceError` xatoligini beradi",
        "Obyektning prototip zanjiri (`__proto__`) bo'ylab yuqoriga qarab qidiradi",
        "Global window obyektidan qidiradi"
      ],
      correctAnswer: 2,
      explanation: "Agar xossa obyektning o'zida bo'lmasa, JS uni ota prototipidan, u yerda ham topilmasa prototipning prototipidan qidirib boradi (zanjir oxiri `null` bo'lguncha)."
    },
    {
      id: 5,
      question: "Prototip zanjirining (Prototype chain) eng yuqori qismida nima turadi va uning prototipi nimaga teng?",
      options: [
        "`Object.prototype` bo'lib, uning prototipi `null` ga teng",
        "`Function.prototype` bo'lib, uning prototipi `undefined` ga teng",
        "`window` bo'lib, uning prototipi `Object` ga teng",
        "`null` bo'lib, uning prototipi `Object.prototype` ga teng"
      ],
      correctAnswer: 0,
      explanation: "Barcha oddiy obyektlar `Object.prototype`dan meros oladi va uning prototipi `Object.getPrototypeOf(Object.prototype)` natijasi `null` ga teng, ya'ni zanjir shu yerda tugaydi."
    },
    {
      id: 6,
      question: "`Object.prototype.hasOwnProperty()` metodi nima uchun ishlatiladi?",
      options: [
        "Obyektda biror metod borligini tekshirish uchun",
        "Xususiyat prototipdan meros bo'lib kelganini tekshirish uchun",
        "Xususiyat prototipdan emas, aynan obyektning o'ziga tegishli (own property) ekanligini tekshirish uchun",
        "Obyekt bo'sh emasligini aniqlash uchun"
      ],
      correctAnswer: 2,
      explanation: "`hasOwnProperty` xossaning prototipdan kelganmi yoki obyektning shaxsiy xossasimi ekanini tekshiradi va faqat shaxsiy bo'lsagina `true` qaytaradi."
    },
    {
      id: 7,
      question: "Konstruktor funksiyadagi `prototype` xossasi (masalan `Person.prototype`) qachon ishlatiladi?",
      options: [
        "Faqat funksiya chaqirilganda",
        "`new Person()` operatori orqali yangi obyekt yaratilganda, o'sha obyektning prototipi qibly belgilanadi",
        "Faqat sinxron kodlarda",
        "Uni umuman ishlatib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Konstruktor funksiyaning `prototype` xossasi funksiya chaqirilganda emas, balki `new` yordamida obyekt yaratilayotganda uning `__proto__`siga o'rnatiladi."
    },
    {
      id: 8,
      question: "JavaScript-da built-in obyektlar (masalan, `Array.prototype`) prototipiga yangi metod qo'shish (Monkey Patching) haqida qaysi fikr to'g'ri?",
      options: [
        "Bu eng to'g'ri va xavfsiz dasturlash usuli hisoblanadi",
        "Tavsiya etilmaydi, chunki u boshqa kutubxonalar va kelajakdagi JS standartlari bilan ziddiyat (conflict) keltirib chiqarishi mumkin",
        "Bu mutlaqo sintaktik xato va dastur darhol o'chadi",
        "Faqat strict mode-da ruxsat etiladi"
      ],
      correctAnswer: 1,
      explanation: "Tizim prototiplarini o'zgartirish kelajakda boshqa kodlar bilan to'qnashuvga olib kelishi mumkinligi sababli yomon praktika (anti-pattern) sanaladi."
    },
    {
      id: 9,
      question: "`Object.create(null)` yordamida yaratilgan obyektning o'ziga xosligi nimada?",
      options: [
        "U hech qanday xususiyat va metodlarni saqlay olmaydi",
        "U mutlaqo prototipsiz obyekt bo'lib, unda hatto `toString` yoki `hasOwnProperty` kabi standart metodlar ham mavjud bo'lmaydi",
        "U faqat `null` qiymatini o'zida saqlaydi",
        "U massiv sifatida ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`Object.create(null)` prototipi `null` bo'lgan, ya'ni mutlaqo toza obyekt yaratadi. Unda standart obyektdan keladigan hech qanday meros metodlar bo'lmaydi."
    },
    {
      id: 10,
      question: "Nima uchun metodlarni konstruktor funksiya ichida emas, balki prototipda (prototype) yaratish tavsiya etiladi?",
      options: [
        "Chunki prototipdagilar tezroq ishlaydi",
        "Xotirani tejash uchun, chunki metodning faqat bitta nusxasi barcha instanslar (instances) uchun umumiy bo'ladi",
        "Chunki konstruktor ichida funksiya yozish taqiqlangan",
        "Kod chiroyliroq ko'rinishi uchun"
      ],
      correctAnswer: 1,
      explanation: "Konstruktor ichida yozilgan metod har safar `new` chaqirilganda xotiradan yangi joy oladi. Prototipga yozilganda esa bitta funksiya xotirada turadi va hamma unga murojaat qiladi."
    },
    {
      id: 11,
      question: "Konstruktor funksiyaning `prototype` obyektini butunlay yangi obyekt bilan almashtirganda (masalan, `User.prototype = { ... }`) qaysi xususiyat yo'qoladi?",
      options: [
        "`__proto__` xossasi",
        "`constructor` xossasi (User.prototype.constructor endi User-ni ko'rsatmay qoladi)",
        "Klassning barcha metodlari",
        "Hech qanday o'zgarish bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Prototip butunlay yangilanganda undagi o'rnatilgan `constructor` xossasi yo'qoladi. Uni qo'lda qayta bog'lab qo'yish (`constructor: User`) tavsiya etiladi."
    },
    {
      id: 12,
      question: "Obyekt prototip zanjirida ma'lum bir konstruktor borligini tekshirish uchun qaysi operator ishlatiladi?",
      options: [
        "`typeof`",
        "`instanceof`",
        "`in`",
        "`isPrototypeOf`"
      ],
      correctAnswer: 1,
      explanation: "`obj instanceof Constructor` operatori `obj` obyektining prototiplari orasida `Constructor.prototype` bor yoki yo'qligini tekshiradi."
    },
    {
      id: 13,
      question: "Meros qilib olingan metod prototipda joylashgan bo'lsa, uni chaqirganda metod ichidagi `this` kalit so'zi qaysi obyektga bog'lanadi?",
      options: [
        "Doimo ota prototip obyektiga",
        "Metod qayerda chaqirilgan bo'lsa, o'sha instans obyektining o'ziga (nuqtadan chapdagi obyektga)",
        "Global window obyektiga",
        "Umutlaqo bog'lanmaydi (undefined bo'ladi)"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da prototip metodlarida `this` dinamik ravishda metod chaqirilayotgan obyektning o'zini ifodalaydi. Bu orqali prototip umumiy bo'lsa ham har bir obyekt o'z qiymatlari bilan ishlaydi."
    },
    {
      id: 14,
      question: "`for..in` tsikli va `Object.keys()` metodining meros bo'lib kelgan xossalarni aylanib chiqishdagi farqi nimada?",
      options: [
        "`Object.keys()` meros xossalarni ham chiqaradi, `for..in` esa faqat shaxsiy",
        "`for..in` meros bo'lib kelgan enumerable xossalarni ham aylanib chiqadi, `Object.keys()` esa faqat obyektning o'ziga tegishli xossalarni qaytaradi",
        "Ikkalasi ham mutlaqo bir xil ishlaydi va farqi yo'q",
        "`for..in` faqat funksiyalarni tekshiradi, `Object.keys()` esa faqat satrlarni"
      ],
      correctAnswer: 1,
      explanation: "`for..in` loop zanjir bo'ylab yuqoriga qarab meros bo'lgan enumerable kalitlarni ham tekshiradi, `Object.keys()` esa zanjirga qaramaydi, faqat o'zida bor kalitlarni massiv ko'rinishida beradi."
    }
  ]
};
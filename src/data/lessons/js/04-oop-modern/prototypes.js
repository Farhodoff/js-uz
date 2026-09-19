export const prototypes = {
  id: "prototypes",
  title: "Prototypes va Vorislik (Inheritance)",
  language: "javascript",
  theory: `## Part 1: Beginner Analogy

Prototiplar tushunchasi ko'pchilik dasturchilar uchun murakkab tuyulishi mumkin. Keling, buni real hayotdagi oddiy analogiya yordamida tushunib olamiz.

Tasavvur qiling, siz bir xil turdagi minglab robotlar ishlab chiqarayapsiz. Har bir robot yurishi, gapirishi va ishlashi kerak.

1. **Yomon yondashuv (Prototipsiz):** Har bir robot ichiga qanday yurish va qanday gapirish ko'rsatmalarini alohida-alohida o'rnatib chiqasiz. Har bir robot o'zining shaxsiy ko'rsatmalariga ega bo'ladi. Agar 1000 ta robot bo'lsa, xotirada 1000 ta yurish va 1000 ta gapirish ko'rsatmasi saqlanadi. Bu juda ko'p joy (xotira) egallaydi.
2. **Yaxshi yondashuv (Prototip bilan):** Siz bitta "Bosh Boshqaruv Markazi" (Prototype) yaratasiz va yurish, gapirish ko'rsatmalarini faqat o'sha yerga joylaysiz. Har bir robotga esa "Agar nima qilishni bilmasang, Boshqaruv Markazidan so'ra!" degan bittagina kichik radio-aloqa tizimi (ya'ni \\\`__proto__\\\` havolasini) o'rnatasiz. 

Shunday qilib, robot yurmoqchi bo'lganda avval o'zidan qidiradi, topolmagach aloqa orqali Boshqaruv Markazidan foydalanadi. Bu orqali xotira keskin tejaladi va markazdagi ko'rsatmani o'zgartirsangiz, barcha robotlar bir vaqtda yangilanadi.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

JavaScript dvigatellari (masalan, V8) prototiplarni xotira tejamkorligi va ijro tezligi nuqtai nazaridan juda chuqur optimizatsiya qilgan. 

### Hidden Classes (Yashirin Klasslar) va Inline Caching
V8 dvigateli obyektlarni xotirada tezkor boshqarish uchun "Hidden Classes" (C++ darajasidagi yashirin tuzilmalar) dan foydalanadi. 
Siz obyekt yaratganingizda, uning ma'lum bir strukturasi shakllanadi. Agar zanjir (prototype chain) orqali xossaga murojaat qilsangiz, V8 uni bir marta qidirib topgach, uning joylashuvini xotiraga "kesh" qilib qo'yadi (Inline Caching).

Agar siz dastur ishlashi davomida obyektning prototipini keskin o'zgartirsangiz (masalan, \\\`Object.setPrototypeOf()\\\` yoki \\\`__proto__\\\` orqali), V8 dvigateli avvalgi barcha optimizatsiya qilingan Hidden Class va keshlarini bekor qilishga majbur bo'ladi. Bu jarayon "deoptimization" deb ataladi va ilovangizni keskin sekinlashtiradi.

Shuning uchun, **Obyekt yaratilgandan keyin uning prototipini umuman o'zgartirmaslik kerak!** 

### Memory Management (Xotirani Boshqarish)
Prototip orqali meros olish RAM ni tejashning eng asosiy usulidir. Obyektlar yaratilganda faqatgina o'zining shaxsiy xossalarini saqlaydi (masalan: ism, yosh). Funksiyalar (metodlar) esa faqat bitta marta prototip xotirasida turadi. Barcha nusxalar unga shunchaki "ko'rsatkich" (pointer) orqali yuzlanadi.

## Part 3: Edge Cases and Senior Interview Questions

Senior darajadagi intervyularda prototiplar bo'yicha ko'plab makkor savollar so'ralishi mumkin. Keling, ba'zilarini ko'rib chiqamiz:

1. **Prototype Pollution (Prototipni ifloslantirish):** Katta loyihalarda tashqi ma'lumotlar (JSON) ni obyektlarga birlashtirganda, yovuz niyatli xakerlar maxsus \\\`__proto__\\\` kaliti orqali global \\\`Object.prototype\\\` ni ifloslantirishi mumkin. Natijada ilovadagi barcha obyektlar bu zararli metodlarga ega bo'lib qoladi. Himoyalanish uchun obyektlarni toza yaratish (\\\`Object.create(null)\\\`) yoki xavfsiz deep-merge kutubxonalaridan foydalanish zarur.

2. **Shadowing (To'sib qo'yish):** Agar obyektning o'zida va uning prototipida bir xil nomli xossa bo'lsa, JS har doim birinchi bo'lib obyektning o'zidagini o'qiydi. Prototipdagisi inobatga olinmaydi. Bunga "Shadowing" deyiladi.

3. **Arrow Functions (O'q funksiyalar):** Arrow funksiyalar o'zining \\\`prototype\\\` xossasiga va \\\`this\\\` kontekstiga ega emas. Shuning uchun ulardan konstruktor sifatida (\\\`new\\\` so'zi bilan) foydalanib bo'lmaydi.

4. **typeof vs instanceof:** \\\`typeof\\\` oddiy turini qaytarsa, \\\`instanceof\\\` prototip zanjirini tekshiradi.

### Mermaid Diagram: Prototip Zanjiri

\\\`\\\`\\\`mermaid
graph TD
    A[myDog obj] -->|__proto__| B[Dog.prototype]
    B -->|__proto__| C[Animal.prototype]
    C -->|__proto__| D[Object.prototype]
    D -->|__proto__| E[null]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Prototipli Vorislik Zanjiri (ES5)",
      instruction: "Berilgan `Animal` konstruktor funksiyasidan vorislik oluvchi `Dog` konstruktor funksiyasini yozing. `Dog` ota konstruktordagi `name` xossasini qabul qilishi va qo'shimcha `breed` xossasiga ega bo'lishi kerak. Prototip zanjirini to'g'ri o'rnating va `constructor` xossasini tuzating.",
      startingCode: "function Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.speak = function() {\n  return this.name + ' shovqin solmoqda';\n};\n\nfunction Dog(name, breed) {\n  // Kodni shu yerda yozing\n}\n// Vorislikni sozlang\n",
      hint: "`Dog` ichida `Animal.call(this, name)` dan foydalanib ota xossani chaqiring. Keyin `Dog.prototype = Object.create(Animal.prototype)` qiling va uning `constructor`ini `Dog` ga tenglang.",
      test: "const sandbox = new Function(code + '; return { Animal, Dog };');\nconst scope = sandbox();\nconst husky = new scope.Dog('Maks', 'Husky');\nif (!(husky instanceof scope.Animal)) return 'Dog Animal-dan vorislik olmagan';\nif (husky.speak() !== 'Maks shovqin solmoqda') return 'Ota metod (speak) xato ishlayapti';\nif (husky.breed !== 'Husky') return 'breed xossasi to\\'g\\'ri o\\'rnatilmagan';\nif (husky.constructor !== scope.Dog) return 'Dog prototipining constructor xossasi tuzatilmadi';\nreturn null;"
    },
    {
      id: 2,
      title: "Massiv Prototipini Kengaytirish",
      instruction: "Barcha JavaScript massivlarida ishlaydigan shaxsiy `Array.prototype.last()` metodini yarating. U massivning eng oxirgi elementini qaytarsin. Agar massiv bo'sh bo'lsa, `undefined` qaytarsin.",
      startingCode: "// Prototipni shu yerda kengaytiring\n",
      hint: "`Array.prototype.last = function() { ... }` ko'rinishida yozib, massiv elementiga `this` kalit so'zi va uning uzunligi `this.length` orqali murojaat qiling.",
      test: "const sandbox = new Function(code + '; return [\"olma\", \"anor\", \"limon\"].last();');\nif (sandbox() !== 'limon') return 'last() metodi oxirgi elementni qaytarmadi';\nconst emptySandbox = new Function(code + '; return [].last();');\nif (emptySandbox() !== undefined) return 'Bo\\'sh massiv uchun undefined qaytarishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "Object.create yordamida Prototip Bog'lash",
      instruction: "Berilgan `person` obyektini prototip sifatida qabul qiluvchi yangi `student` obyektini `Object.create` yordamcha metodi orqali yarating. `student` obyektida shaxsiy `study()` metodi bo'lsin va u `'O\\'qimoqda'` degan matnni qaytarsin.",
      startingCode: "const person = {\n  greet() {\n    return 'Salom';\n  }\n};\n\n// student obyektini yarating\n",
      hint: "`const student = Object.create(person);` yordamida voris obyekt oching va unga `student.study = function() { ... }` shaklida metod biriktiring.",
      test: "const sandbox = new Function(code + '; return student;');\nconst st = sandbox();\nif (!st) return 'student obyekti yaratilmagan';\nif (Object.getPrototypeOf(st) !== person) return 'student obyekti prototipi person ga bog\\'lanmagan';\nif (st.greet() !== 'Salom') return 'student otasining greet() metodini chaqira olmayapti';\nif (typeof st.study !== 'function' || st.study() !== 'O\\'qimoqda') return 'study() metodi to\\'g\\'ri yozilmagan';\nreturn null;"
    },
    {
      id: 4,
      title: "Constructor xossasini tekshirish",
      instruction: "Bo'sh `Car` konstruktorini yarating va uning `prototype` obyektiga `drive` metodini qo'shing. Keyin uning `constructor` xossasi o'chib ketmasligi uchun uni to'g'rilab qo'ying (agar obyekt bilan almashtirilsa).",
      startingCode: "function Car() {}\nCar.prototype = {\n  drive() { return 'Vroom'; }\n};\n// constructor ni to'g'rilang\n",
      hint: "`Car.prototype.constructor = Car;` orqali asl konstruktorni tiklang.",
      test: "const sandbox = new Function(code + '; return new Car();');\nconst c = sandbox();\nif (!c.drive || c.drive() !== 'Vroom') return 'drive() metodi xato';\nif (c.constructor !== Car) return 'constructor xossasi noto\\'g\\'ri';\nreturn null;"
    },
    {
      id: 5,
      title: "__proto__ zanjiri",
      instruction: "`a`, `b`, va `c` obyektlarini shunday yaratingki, `c` obyekti `b` dan, `b` obyekti esa `a` dan meros olsin. `a` da `value: 1` xossasi bo'lsin. Buni `Object.create` orqali bajaring.",
      startingCode: "const a = { value: 1 };\nconst b = Object.create(a);\n// c ni yarating va b ga bog'lang\n",
      hint: "`const c = Object.create(b);` qiling.",
      test: "const sandbox = new Function(code + '; return {a,b,c};');\nconst scope = sandbox();\nif (Object.getPrototypeOf(scope.c) !== scope.b) return 'c ning prototipi b emas';\nif (scope.c.value !== 1) return 'Vorislik zanjiri uzilgan';\nreturn null;"
    },
    {
      id: 6,
      title: "hasOwnProperty bilan ishlash",
      instruction: "`obj` obyekti berilgan, uning o'z shaxsiy `name` xossasi va prototipidan keladigan `age` xossasi bor. Siz funksiya yaratingki, faqat `obj` ning shaxsiy xossalarini (kalitlarini) massiv qilib qaytarsin.",
      startingCode: "const proto = { age: 30 };\nconst obj = Object.create(proto);\nobj.name = 'Ali';\nfunction getOwnKeys(o) {\n  // faqat shaxsiy kalitlarni massiv shaklida qaytaring\n}\n",
      hint: "`Object.keys(o)` ni consists qiling, chunki u avtomatik ravishda faqat hasOwnProperty bo'lgan kalitlarni oladi yoki `for...in` tsiklida `hasOwnProperty` bilan tekshiring.",
      test: "const sandbox = new Function(code + '; return getOwnKeys(obj);');\nconst keys = sandbox();\nif (!Array.isArray(keys) || keys.length !== 1 || keys[0] !== 'name') return 'Faqat shaxsiy xossalar qaytarilishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "Object.getPrototypeOf()",
      instruction: "`isInherited(child, parent)` funksiyasini yozing, u `child` prototipi aynan `parent` ekanligini `Object.getPrototypeOf` orqali tekshirib `true/false` qaytarsin.",
      startingCode: "function isInherited(child, parent) {\n  // shu yerda yozing\n}\n",
      hint: "`return Object.getPrototypeOf(child) === parent;` qaytaring.",
      test: "const sandbox2 = new Function(code + '; const p = {}; const c = Object.create(p); return {fn: isInherited, p, c};');\nconst res = sandbox2();\nif(res.fn(res.c, res.p) !== true) return 'Vorislikni to\\'g\\'ri topolmadi';\nif(res.fn({}, res.p) !== false) return 'Xato natija qaytardi';\nreturn null;"
    },
    {
      id: 8,
      title: "Prototipga metod qo'shish (Dynamic)",
      instruction: "`String.prototype` ni kengaytirib, barcha satrlarda ishlaydigan `capitalize()` metodini qo'shing. U satrning birinchi harfini kattalashtirib qaytarsin.",
      startingCode: "// String.prototype.capitalize ni yarating\n",
      hint: "`String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); }` qiling.",
      test: "const sandbox = new Function(code + '; return \"hello\".capitalize();');\nif (sandbox() !== 'Hello') return 'capitalize() to\\'g\\'ri ishlamayapti';\nreturn null;"
    },
    {
      id: 9,
      title: "Shadowing (To'sib qo'yish)",
      instruction: "`base` obyektida `color = 'blue'` xossasi bor. Undan voris olingan `child` obyektini yarating (Object.create orqali) va unga o'z shaxsiy `color = 'red'` xossasini bering, shunda ota xossani to'sib qo'ysin (shadowing).",
      startingCode: "const base = { color: 'blue' };\n// child obyektini yarating va color = 'red' bering\n",
      hint: "`const child = Object.create(base); child.color = 'red';` yozing.",
      test: "const sandbox = new Function(code + '; return {base, child};');\nconst scope = sandbox();\nif (Object.getPrototypeOf(scope.child) !== scope.base) return 'child base dan meros olmagan';\nif (scope.child.color !== 'red') return 'child da shaxsiy color yo\\'q yoki xato';\nif (scope.base.color !== 'blue') return 'base ning rangi o\\'zgarib ketdi';\nreturn null;"
    },
    {
      id: 10,
      title: "ES6 Class vs ES5 Prototype",
      instruction: "Quyidagi ES6 Class kodini ES5 konstruktor funksiya va prototype yordamida qayta yozing. (Class o'rniga konstruktor funksiya yarating va hello metodini prototype ga qo'shing).",
      startingCode: "// Buni o'zgartiring:\n/* \nclass User {\n  constructor(name) { this.name = name; }\n  hello() { return 'Hi ' + this.name; }\n}\n*/\n\n// ES5 da yozing:\n",
      hint: "`function User(name) { this.name = name; }` va `User.prototype.hello = function() { return 'Hi ' + this.name; }` shaklida yoza olasiz.",
      test: "const sandbox = new Function(code + '; const u = new User(\"Ali\"); return u;');\nconst user = sandbox();\nif (typeof User !== 'function' || user.constructor !== User) return 'User konstruktor bo\\'lishi kerak';\nif (user.hello() !== 'Hi Ali') return 'hello() metodi prototipdan olinmadi';\nif (!User.prototype.hello) return 'hello metodi prototipga yozilmagan';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript prototipiga oid qaysi ta'rif to'g'ri?",
      options: [
        "Faqat server xotirasini tejaydigan maxsus API kalit",
        "JavaScript obyektlari o'zaro xossalar va metodlarni baham ko'rish uchun foydalanadigan andoza (boshqa obyektga havola)",
        "Faqat massivlarni saralashda ishlatiladigan ichki algoritm",
        "Faqat HTML sahifasini o'zgartiradigan JavaScript kodi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da har bir obyekt boshqa bir obyektga yashirin havolaga ega bo'ladi, u prototip (prototype) deb ataladi. Obyekt undagi metod va xossalarni meros qilib oladi."
    },
    {
      id: 2,
      question: "Obyektning `__proto__` xossasi va Konstruktor funksiyasining `prototype` xossasi farqi nimada?",
      options: [
        "Hech qanday farqi yo'q, ikkalasi bir xil narsa",
        "`__proto__` obyektning aniq prototip havolasidir; `prototype` esa konstruktor funksiyadan yaratiladigan yangi obyektlarga prototip qilib beriladigan obyektdir",
        "`prototype` faqat satrlarda, `__proto__` esa faqat raqamlarda ishlaydi",
        "`__proto__` yangi metodlar yaratadi, `prototype` esa ularni o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "`__proto__` har bir obyekt nusxasining real prototipiga ishora qiluvchi getter/setter. `prototype` esa faqat konstruktor funksiyalarda (yoki klasslarda) bo'lib, yangi yaratilgan obyekt unga `__proto__` orqali ulanadi."
    },
    {
      id: 3,
      question: "Prototip zanjiri (Prototype Chain) qanday ishlaydi?",
      options: [
        "Obyektdan xossa qidirilganda, JS avval obyektning o'zini, topilmasa uning prototipini, undan keyin esa zanjir bo'ylab yuqori prototiplarni tekshirib boradi",
        "Xossalarni faqat global o'zgaruvchilardan qidiradi",
        "Faqat xatolar yuz berganda ularni qayta ishlaydi",
        "Barcha metodlarni bir vaqtda parallel ishga tushiradi"
      ],
      correctAnswer: 0,
      explanation: "Agar obyektning o'zida so'ralgan xossa topilmasa, JavaScript uning prototipiga (`__proto__`) o'tadi va to `null` qiymatga yetguncha zanjir bo'ylab qidirishni davom ettiradi."
    },
    {
      id: 4,
      question: "JavaScript prototip zanjirining eng yuqori (oxirgi) nuqtasida qaysi obyekt turadi va uning prototipi nimaga teng?",
      options: [
        "`Function.prototype` va uning prototipi `undefined` ga",
        "`Object.prototype` va uning prototipi `null` ga",
        "`Array.prototype` va uning prototipi `Object` ga",
        "`window` va uning prototipi `document` ga"
      ],
      correctAnswer: 1,
      explanation: "Deyarli barcha obyektlar oxir-oqibat `Object.prototype`dan meros oladi. `Object.prototype.__proto__` esa `null` ga teng bo'lib, zanjir shu yerda tugaydi."
    },
    {
      id: 5,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst animal = { eats: true };\nconst rabbit = Object.create(animal);\nrabbit.eats = false;\nconsole.log(rabbit.eats);\nconsole.log(animal.eats);\n```",
      options: [
        "`true`, `true`",
        "`false`, `false`",
        "`false`, `true`",
        "`undefined`, `true`"
      ],
      correctAnswer: 2,
      explanation: "`rabbit.eats = false` deb yozilganda, bu xossa `rabbit` obyektining o'zida (yuzada) yaratiladi (shadowing). Prototipdagi `animal.eats` esa o'zgarmasdan `true` bo'lib qolaveradi."
    },
    {
      id: 6,
      question: "Konstruktor funksiya ichida `this.method = ...` deb yozish va `Constructor.prototype.method = ...` deb yozishning xotira (performance) jihatidan farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "Konstruktor ichida yozilsa, har bir yangi obyekt nusxasi uchun xotirada alohida yangi funksiya yaratiladi. Prototipga qo'shilsa, barcha nusxalar bitta umumiy funksiya nusxasidan foydalanadi (xotirani tejaydi)",
        "Prototipda yozilgan metodlar tezroq ishlaydi, lekin xotirani ko'proq band qiladi",
        "Konstruktor ichida yozilgan metodlar faqat asinxron ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Prototipda e'lon qilingan metodlar xotirada faqat bitta nusxada saqlanadi, har bir yangi obyekt (`new` orqali) yaratilganda qayta-qayta nusxalanmaydi, bu esa xotirani sezilarli darajada tejaydi."
    },
    {
      id: 7,
      question: "Obyektdagi xossa uning o'zinikimi yoki prototipdan kelayotganini aniqlash uchun qaysi metoddan foydalaniladi?",
      options: [
        "`obj.isPrototypeOf()`",
        "`obj.hasOwnProperty()`",
        "`obj.instanceof()`",
        "`Object.getPrototypeOf()`"
      ],
      correctAnswer: 1,
      explanation: "`hasOwnProperty(propName)` metodi agar xossa to'g'ridan-to'g'ri obyektning o'ziga tegishli bo'lsa `true`, agar u prototip zanjiridan olinayotgan bo'lsa `false` qaytaradi."
    },
    {
      id: 8,
      question: "ES6-dagi `class` kalit so'zi JavaScript-ga qanday yangilik olib kirdi?",
      options: [
        "U prototiplarni butunlay yo'q qildi va klassik OOP mexanizmini yaratdi",
        "U prototipli vorislik ustiga qurilgan qulay sintaktik shakar (syntactic sugar) bo'lib, kod yozishni osonlashtirdi xolos",
        "U faqat ma'lumotlar bazasi bilan ishlash funksiyalarini qo'shdi",
        "U JavaScript dasturlarini avtomatik kompilyatsiya qiladi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-dagi klasslar aslida prototipli vorislikning boshqacha (chiroyli) ko'rinishidir. Orqa fonda baribir o'sha prototiplar va konstruktor funksiyalar ishlayveradi."
    },
    {
      id: 9,
      question: "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nfunction Person() {}\nconst p1 = new Person();\nPerson.prototype.sayHi = () => \"Salom\";\nconsole.log(p1.sayHi());\n```",
      options: [
        "`TypeError: p1.sayHi is not a function`",
        "`Salom`",
        "`undefined`",
        "`ReferenceError`"
      ],
      correctAnswer: 1,
      explanation: "Obyekt prototip bilan bog'lanishi dynamic hisoblanadi. Obyekt yaratilib bo'linganidan so'ng uning prototipiga yangi metod qo'shilsa ham, u zudlik bilan barcha obyekt nusxalarida (jumladan `p1`da ham) ishlay boshlaydi."
    },
    {
      id: 10,
      question: "Nima uchun `Object.setPrototypeOf(obj, newProto)` metodidan dynamic foydalanish tavsiya etilmaydi?",
      options: [
        "Chunki u JS xavfsizlik tizimini butunlay o'chirib qo'yadi",
        "Chunki u JS dvigatellarining ichki optimallashtirish tizimlarini buzadi va kod ishlash tezligini sezilarli darajada pasaytiradi (performance penalty)",
        "Chunki bu metod ES6 tarkibiga kiritilmagan",
        "Chunki u massivlarni o'chirib yuborishi mumkin"
      ],
      correctAnswer: 1,
      explanation: "Obyekt yaratilgandan so'ng uning prototipini dynamic o'zgartirish (re-prototyping) JS dvigatellarining tezkor xossalarga kirish optimallashtirishlarini (Inline Caches) yo'qqa chiqaradi."
    },
    {
      id: 11,
      question: "`Object.create(null)` orqali obyekt yaratilganda nima sodir bo'ladi?",
      options: [
        "Bo'sh obyekt yaratiladi, lekin unda `toString`, `hasOwnProperty` kabi standart Object metodlari va umuman prototip bo'lmaydi",
        "`null` qiymat qaytadi, obyekt yaratilmaydi",
        "Faqat `null` nomli xossa yaratiladi",
        "Obyekt avtomatik tarzda muzlatiladi (`Object.freeze` qilinadi)"
      ],
      correctAnswer: 0,
      explanation: "`Object.create(null)` prototipi `null` bo'lgan, ya'ni mutlaqo hech qanday prototipga (xatto `Object.prototype`ga ham) ega bo'lmagan toza obyekt yaratadi. Unda standart metodlar ishlamaydi."
    },
    {
      id: 12,
      question: "Prototipni ifloslantirish (Prototype Pollution) nima?",
      options: [
        "Faqat kodda ko'plab sharhlar yozish",
        "Tashqi (ko'pincha zararli) kiruvchi ma'lumotlar orqali `__proto__` yoki `constructor.prototype` ga yangi xossalar yozib, global obyekt prototiplarini buzish yoki xavfsizlikni zaiflashtirish",
        "Xotiraning to'lib qolishi muammosi",
        "Prototip metodlarini bir nechta faylda takroran yozish"
      ],
      correctAnswer: 1,
      explanation: "Prototype Pollution xavfsizlik zaifligi bo'lib, unda tajovuzkor dynamic obyeklar orqali `Object.prototype`ga zararli metod yoki xossalar qo'shib yuboradi va bu butun ilovadagi barcha obyektlarda aks etadi."
    }
  ]
};

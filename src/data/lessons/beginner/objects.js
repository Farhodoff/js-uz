export const objects = {
  id: "objects",
  title: "Obyektlar (Objects): Ma'lumotlar xazinasi",
  level: "Boshlang'ich",
  description: "Ma'lumotlarni tartibli saqlash: kalit va qiymat juftligi haqida. Kompleks ma'lumot turlarini tushuning.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, sizda foydalanuvchi ma'lumotlari bor: \`ism\`, \`yosh\`, \`shahar\`, \`email\`, \`telefon\`. Ularni alohida o'zgaruvchilarda saqlasangiz:
\`\`\`javascript
const ism = "Ali";
const yosh = 25;
const shahar = "Toshkent";
\`\`\`
Bu juda nozik. Kimning yoshi kimga tegishli? Massivda qanday tartib bo'ladi? **Obyekt** esa ularni bitta butun narsa (shaxs) sifatida birlashtiradi.

## 2. SODDALIK (Analogiya)

Obyektni **shkaf** deb tasavvur qiling. Shkafning har bir tortmasida (kalitida) o'z narsasi (qiymati) bor. Masalan: "paypoqlar" tortmasida — paypoqlar, "ko'ylaklar" tortmasida — ko'ylaklar, "kitoblar" tortmasida — kitoblar. Siz shkafdan narsalarni olishingiz, qo'shishingiz yoki o'chirishingiz mumkin.

## 3. STRUKTURA

### A. Obyekt yaratish (Object Literals)

\`\`\`javascript
const shaxs = {
  ism: "Ali",         // ism - kalit (key), "Ali" - qiymat (value)
  yosh: 25,           // qiymat raqam bo'lishi mumkin
  shahar: "Toshkent",
  tugilgan: true      // qiymat boolean bo'lishi mumkin
};
\`\`\`

**Muhim:** Har bir kalit-qiymat juftligidan keyin vergul qo'yiladi (oxirgisidan keyin opsional).

### B. Ichma-ich Obyektlar (Nested Objects)

Qo'ng'iroq raqamlar, manzil kabi juda to'liq ma'lumotlarni alohida obiektda saqlash:

\`\`\`javascript
const shaxs = {
  ism: "Ali",
  manzil: {
    shahar: "Toshkent",
    ko_cha: "Amir Temur 25",
    pochtali_kod: "100000"
  },
  telefon: "+998901234567"
};
\`\`\`

### C. Ma'lumotni o'qish (Ikki xil usul)

**1. Dot notation (Nuqta):**
\`\`\`javascript
console.log(shaxs.ism);              // "Ali"
console.log(shaxs.manzil.shahar);    // "Toshkent"
\`\`\`

**2. Bracket notation (Qavs):**
\`\`\`javascript
console.log(shaxs["ism"]);           // "Ali"
console.log(shaxs["manzil"]["shahar"]); // "Toshkent"

// O'zgaruvchini kalit sifatida ishlatish:
const kalit = "yosh";
console.log(shaxs[kalit]);           // 25
\`\`\`

**Bracket notation qachon ishlatiladi?**
- Kalit nomida bo'sh joy bo'lsa: \`shaxs["to'liq ism"]\`
- Kalit o'zgaruvchida bo'lsa: \`shaxs[kalit]\`
- Kalit raqamdan boshlansa: \`shaxs["2024year"]\`

### D. O'zgartirish va Qo'shish

\`\`\`javascript
shaxs.yosh = 26;              // Qiymatni yangilash
shaxs.kasb = "Dasturchi";     // Yangi kalit qo'shish
shaxs.manzil.shahar = "Bukhoro"; // Ichki qiymatni o'zgartirish
delete shaxs.shahar;          // Kalitni o'chirish
\`\`\`

### E. Metodlar (Funksiyalar Obiektda)

\`\`\`javascript
const kalkulator = {
  a: 10,
  b: 5,
  qosh: function() {
    return this.a + this.b;  // this - bu objektning o'ziga murojaat
  },
  kopaytir: function() {
    return this.a * this.b;
  }
};

console.log(kalkulator.qosh());    // 15
console.log(kalkulator.kopaytir()); // 50
\`\`\`

### F. Object Statik Metodlari

**Object.keys() — Barcha kalitlarni massiv sifatida qaytaradi:**
\`\`\`javascript
const avtomobil = { marka: "BYD", yil: 2024, rang: "oq" };
console.log(Object.keys(avtomobil)); // ["marka", "yil", "rang"]
\`\`\`

**Object.values() — Barcha qiymatlarni massiv sifatida qaytaradi:**
\`\`\`javascript
console.log(Object.values(avtomobil)); // ["BYD", 2024, "oq"]
\`\`\`

**Object.entries() — Kalit-qiymat juftlarini massiv sifatida qaytaradi:**
\`\`\`javascript
console.log(Object.entries(avtomobil));
// [["marka", "BYD"], ["yil", 2024], ["rang", "oq"]]
\`\`\`

**Object.assign() — Bir bir nechta objektni biggitda birlashtirish:**
\`\`\`javascript
const original = { a: 1, b: 2 };
const qo_shilma = { c: 3 };
const birlashgan = Object.assign({}, original, qo_shilma);
console.log(birlashgan); // { a: 1, b: 2, c: 3 }
\`\`\`

### G. Spread Operatori (...)

Objektni "yuvilish" va nusxalash:
\`\`\`javascript
const orinali = { x: 1, y: 2 };
const yangi = { ...orinali, z: 3 };
console.log(yangi); // { x: 1, y: 2, z: 3 }
\`\`\`

### H. Getters va Setters

\`\`\`javascript
const shaxs = {
  _yosh: 25,  // Ichki xususiyat (convention bo'yicha _ bilan)

  get yosh() {
    return this._yosh;
  },

  set yosh(qiymat) {
    if (qiymat > 0) {
      this._yosh = qiymat;
    } else {
      console.log("Yosh musbat bo'lishi kerak!");
    }
  }
};

console.log(shaxs.yosh);  // 25
shaxs.yosh = 30;          // Setter chaqiriladi
console.log(shaxs.yosh);  // 30
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Vergulni unutish:** Har bir xususiyatdan (property) keyin vergul qo'yishni unutmang (oxirgisidan keyin opsional).

2. **this so'zini adashtirish:** Metod ichida objektga murojaat qilish uchun \`this\` ishlatiladi.
   \`\`\`javascript
   // XATO:
   const user = {
     ism: "Ali",
     salom: function() {
       console.log(ism);  // ReferenceError!
     }
   };

   // TO'G'RI:
   const user = {
     ism: "Ali",
     salom: function() {
       console.log(this.ism);  // "Ali"
     }
   };
   \`\`\`

3. **Arrow funksiyalarda this:** Arrow funksiyalar o'z \`this\` ga ega emas:
   \`\`\`javascript
   const user = {
     ism: "Ali",
     salom: () => {
       console.log(this.ism);  // undefined (global this)
     }
   };
   \`\`\`

4. **Dot notation va bracket notation chaqqani bilmay ishlatish:**
   - Dot notation: kalit nomi oddiy so'z bo'lsa
   - Bracket notation: kalit nomida maxsus belgilar yoki o'zgaruvchi bo'lsa

5. **Yo'q kalit oxirida undefined qaytaradi:**
   \`\`\`javascript
   const obj = { a: 1 };
   console.log(obj.b);  // undefined (xato bera olmaydi)
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

**1. Obyekt nima?**
Kalit va qiymat juftliklaridan tashkil topgan murakkab ma'lumot turi. Qaytargan qiymat istalgan turda bo'lishi mumkin (raqam, matn, boolean, massiv, boshqa obekt, funksiya).


**2. Kalit (key) va qiymat (value) nima?**
Kalit — om ichidagi ma'lumotning nomi (identifikatori), Qiymat — o'sha ma'lumotning haqiqiy ma'lum (ma'lumot).


**3. Oberkt yaratishda qaysi qavslar ishlatiladi?**
Figurali qavslar \`{ }\`.


**4. Dot notation (.) va Bracket notation ([]) farqi nima?**
Dot notation oddiy kalitlar uchun ishlatiladi. Bracket notation kalit nomida bo'sh joy, maxsus belgilar bo'lsa yoki o'zgaruvchi bo'lsa ishlatiladi.


**5. Bracket notation qachon ishlatiladi?**
1. Kalit nomi o'zgaruvchida bo'lsa: \`obj[kalit]\`
2. Kalit nomida bo'sh joy bo'lsa: \`obj["to'liq ism"]\`
3. Kalit nomida minus, qo'sh nuqta kabi maxsus belgilar bo'lsa: \`obj["first-name"]\`


**6. Obiektga yangi xususiyat (property) qanday qo'shiladi?**
\`obj.yangiKalit = qiymat\` shaklida yoki \`obj["yangi-kalit"] = qiymat\` shaklida.


**7. Obiektdagi xususiyatni qanday o'chirish mumkin?**
\`delete\` operatori orqali: \`delete obj.kalit\` yoki \`delete obj["kalit"]\`.


**8. Object.keys(), Object.values(), Object.entries() farqi nima?**
Object.keys() — kalitlarni, Object.values() — qiymatlarni, Object.entries() — kalit-qiymat juftlarini massiv sifatida qaytaradi.


**9. Spread operatori (...) nima qayla ishlatiladi?**
Objektni "yuvilish" va boshqa objektga birlashtirlish. Masalan: \`const yangi = {...eski, extra: 'qiymat'}\`.


**10. Getter va Setter nima uchun kerak?**
Getter — xususiyatni o'qishda maxsus logic jarayoni. Setter — xususiyatni o'zartirishda validatsiya yoki transformatsiya. Masalan: yosh musbat son bo'lishi kerak.


**11. Ichma-ich obekt (nested object) bu nima va misolini keltiring?**
Bitta objektning qiymatlaridan yana boshqa obekt bo'lganida. Masalan: \`{ manzil: { shahar: "Toshkent", ko_cha: "..." } }\`.


**12. Arrow funksiyada this nima beradi?**
Arrow funksiyada this uringan joyning context'ini oladi, fo'nktsiyadagi this'i emas. Shuning uchun obekt metodlarida arrow funksiya ishlatilmaydi.
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Obekt yaratish",
      instruction: "Foydalanuvchi uchun 'user' objekti yarating. Ichida 'ism', 'yosh' va 'email' bo'lsin. Keyin ularni console.log() qilib chiqaring.",
      startingCode: "// Foydalanuvchi objekti\nconst user = {\n  // Bu yerga yozing\n};\n\n// Qiymatlarni chiqaring\n",
      hint: "const user = { ism: 'Ali', yosh: 25, email: 'ali@example.com' }; console.log(user.ism);",
      test: "if (code.includes('ism') && code.includes('yosh') && code.includes('email') && code.includes('console.log')) return null; return 'Obekt to\\'g\\'ri yarating va qiymatlarni chiqaring';"
    },
    {
      id: 2,
      title: "Bracket Notation ishlatish",
      instruction: "'avtomobil' objektidan 'model' qiymatini bracket notation orqali o'qing va console.log() qiling.",
      startingCode: "const avtomobil = { marka: 'BYD', model: 'Yuan Plus', yil: 2024 };\n\n// Bracket notation orqali o'qing\n",
      hint: "console.log(avtomobil['model']);",
      test: "if (logs.includes('Yuan Plus')) return null; return 'avtomobil[\"model\"] ni chiqaring';"
    },
    {
      id: 3,
      title: "Obekt xususiyatini o'zgartirish",
      instruction: "'kitob' objektining 'narxi' xususiyatini 50000 ga o'zgartiring.",
      startingCode: "const kitob = { nomi: 'JavaScript', muallif: 'Farhod', narxi: 35000 };\n\n// Narxni o'zgartiring\n",
      hint: "kitob.narxi = 50000;",
      test: "if (code.includes('narxi') && code.includes('50000')) return null; return 'Narxni to\\'g\\'ri o\\'zgartiring';"
    },
    {
      id: 4,
      title: "Yangi xususiyat qo'shish",
      instruction: "'product' objektiga 'soni' xususiyatini (value: 100) qo'shing.",
      startingCode: "const product = { nomi: 'Qalam', narxi: 5000 };\n\n// Yangi xususiyat qo'shing\n",
      hint: "product.soni = 100;",
      test: "if (code.includes('soni') && code.includes('100')) return null; return 'Yangi xususiyatni to\\'g\\'ri qo\\'shing';"
    },
    {
      id: 5,
      title: "Ichma-ich Obekt",
      instruction: "'shaxs' objektiga 'manzil' ichma-ich objekti bo'lsin. Ichida 'shahar' va 'ko_cha' bo'lsin. Manzilni console.log() qiling.",
      startingCode: "const shaxs = {\n  ism: 'Ali',\n  // Ichma-ich manzil objekti bu yerga\n};\n\n// Manzilni chiqaring\n",
      hint: "const shaxs = { ism: 'Ali', manzil: { shahar: 'Toshkent', ko_cha: 'Amir Temur' } }; console.log(shaxs.manzil);",
      test: "if (code.includes('manzil') && code.includes('shahar') && code.includes('ko_cha')) return null; return 'Ichma-ich obekt to\\'g\\'ri yarating';"
    },
    {
      id: 6,
      title: "Object.keys() ishlatish",
      instruction: "'talaba' objektining barcha kalitlarini Object.keys() orqali o'qib, console.log() qiling.",
      startingCode: "const talaba = { ism: 'Bobur', guruh: 'A101', baho: 4.5 };\n\n// Barcha kalitlarni chiqaring\n",
      hint: "console.log(Object.keys(talaba));",
      test: "if (logs.includes('ism') && logs.includes('guruh') && logs.includes('baho')) return null; return 'Object.keys() orqali kalitlarni chiqaring';"
    },
    {
      id: 7,
      title: "Metod yaratish",
      instruction: "'kalkulator' objektiga 'qosh' metodi qo'shing. U 'a' va 'b' qiymatlarini qo'shib natijani qaytarsin.",
      startingCode: "const kalkulator = { a: 10, b: 5 };\n\n// qosh metodi qo'shing\n\n// Tekshirish:\n",
      hint: "kalkulator.qosh = function() { return this.a + this.b; };",
      test: "if (typeof kalkulator.qosh === 'function' && kalkulator.qosh() === 15) return null; return 'Metod to\\'g\\'ri yarating';"
    },
    {
      id: 8,
      title: "Delete operatori",
      instruction: "'kompaniya' objektidan 'fax' xususiyatini o'chirib tashlang.",
      startingCode: "const kompaniya = { nomi: 'TechStart', telefon: '+998901234567', fax: '(79) 1234' };\n\n// fax ni o'chirib tashlaing\n",
      hint: "delete kompaniya.fax;",
      test: "if (code.includes('delete') && code.includes('fax')) return null; return 'delete orqali fax ni o\\'chirib tashlaing';"
    },
    {
      id: 9,
      title: "Spread Operator bilan birlashtirish",
      instruction: "Ikkita objektni spread operatori (...) orqali birlashtirib, yangi objektga saqlang.",
      startingCode: "const rasm1 = { nomi: 'Portret', artist: 'Usmon' };\nconst rasm2 = { yil: 2024 };\n\n// Ikkalasini birlashtirib yangi obekt yarating\n",
      hint: "const birlashgan = { ...rasm1, ...rasm2 };",
      test: "if (code.includes('...') && code.includes('rasm1') && code.includes('rasm2')) return null; return 'Spread operator orqali birlashtiring';"
    },
    {
      id: 10,
      title: "Getter orqali o'qish",
      instruction: "'do_kon' objektiga 'jami_narx' getter'i qo'shing. U 'narx * soni' ni qaytarsin.",
      startingCode: "const do_kon = {\n  nomi: 'Kitob Do\\'koni',\n  narx: 50000,\n  soni: 3,\n  // getter bu yerga\n};\n\nconsole.log(do_kon.jami_narx);\n",
      hint: "get jami_narx() { return this.narx * this.soni; }",
      test: "if (logs.includes('150000')) return null; return 'Getter to\\'g\\'ri yarating';"
    },
    {
      id: 11,
      title: "Object.assign() orqali nusxalash",
      instruction: "'original' objektining to'liq nusxasini yarating va uni 'yangi' o'zgaruvchiga saqlang.",
      startingCode: "const original = { a: 1, b: 2, c: 3 };\n\n// To'liq nusxani yarating\n",
      hint: "const yangi = Object.assign({}, original);",
      test: "if (code.includes('Object.assign') && code.includes('{}')) return null; return 'Object.assign() orqali nusxalang';"
    },
    {
      id: 12,
      title: "Ichma-ich qiymatni o'zgartirish va o'qish",
      instruction: "'shaxs' objektisining 'manzil.shahar' qiymatini 'Samarqand' ga o'zgartiring. Keyin yangi qiymatni console.log() qiling.",
      startingCode: "const shaxs = {\n  ism: 'Farhod',\n  manzil: { shahar: 'Toshkent', ko_cha: 'Amir Temur' }\n};\n\n// Shaharni Samarqandga o'zgartiring va chiqaring\n",
      hint: "shaxs.manzil.shahar = 'Samarqand'; console.log(shaxs.manzil.shahar);",
      test: "if (logs.includes('Samarqand')) return null; return 'Shaharni to\\'g\\'ri o\\'zgartiring va chiqaring';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da obyekt xususiyatiga murojaat qilishning Dot notation (`obj.prop`) va Bracket notation (`obj['prop']`) usullari o'rtasidagi farq haqida qaysi fikr noto'g'ri?",
      options: [
        "Bracket notation yordamida kalit nomi o'zgaruvchida saqlangan bo'lsa ham murojaat qilsa bo'ladi",
        "Dot notation orqali kalit nomida bo'sh joy bo'lgan xususiyatlarni o'qib bo'lmaydi",
        "Bracket notation faqat obyekt ichida funksiyalar (metodlar) bo'lmaganda ishlatilishi shart",
        "Dot notation orqali raqam bilan boshlanadigan kalit nomlariga murojaat qibly bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Bracket notation har qanday holatda (metodlar bo'lsa ham) ishlaydi. Uning asosiy ustunligi - dinamik kalitlar va maxsus belgilarga ega bo'lgan kalitlar bilan ishlay olishidir."
    },
    {
      id: 2,
      question: "Obyekt metodi (method) ichida o'sha obyektning o'ziga va uning xususiyatlariga murojaat qilish uchun qaysi kalit so'zdan foydalaniladi?",
      options: [
        "`object`",
        "`this` (masalan: `this.name` orqali obyektning `name` xususiyati qiymati olinadi)",
        "`self`",
        "`parent`"
      ],
      correctAnswer: 1,
      explanation: "`this` kalit so'zi metod chaqirilgan vaqtdagi joriy obyektga ishora qiladi va uning yordamida obyektning istalgan boshqa xususiyatiga murojaat qilish mumkin."
    },
    {
      id: 3,
      question: "Obyekt metodini arrow (o'qsimon) funksiya ko'rinishida yozish nima uchun tavsiya etilmaydi?",
      options: [
        "Chunki arrow funksiyalar obyekt ichida umuman ishlamaydi",
        "Chunki arrow funksiyalar o'zining shaxsiy `this` bog'lanishiga ega bo'lmaydi (tashqi global yoki lexical `this` ni oladi) va `this.property` orqali obyekt xususiyatini o'qib bo'lmaydi",
        "Chunki arrow funksiyalarda parametr uzatish imkoni yo'q",
        "Chunki arrow funksiyalar doimo faqat `undefined` qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarda shaxsiy `this` bo'lmaydi. Ular `this` ni o'zining tashqi o'rab turgan scopesidan meros qilib oladi. Natijada metod ichida `this` kutilgan obyektni emas, balki global obyektni (masalan, `window` ni) ko'rsatib qoladi."
    },
    {
      id: 4,
      question: "Obyektning faqat kalitlarini (keys) yoki faqat qiymatlarini (values) massiv ko'rinishida olish uchun qaysi standart metodlar ishlatiladi?",
      options: [
        "`Object.keys(obj)` va `Object.values(obj)`",
        "`obj.getKeys()` va `obj.getValues()`",
        "`Object.toKeys(obj)` va `Object.toValues(obj)`",
        "`keysOf(obj)` va `valuesOf(obj)`"
      ],
      correctAnswer: 0,
      explanation: "`Object.keys()` obyekt kalitlari nomlaridan iborat massiv, `Object.values()` esa ularning qiymatlaridan iborat massiv qaytaradi."
    },
    {
      id: 5,
      question: "Bir nechta mustaqil obyektlarni bitta yangi obyektga birlashtirish yoki obyektning nusxasini spread operatori yordamida yaratish qanday yoziladi?",
      options: [
        "`const newObj = obj1 + obj2;`",
        "`const newObj = { ...obj1, ...obj2 };` (spread operatori yordamida barcha xususiyatlarni yangi obyektga yoyish orqali)",
        "`const newObj = [obj1, obj2];`",
        "`const newObj = merge(obj1, obj2);`"
      ],
      correctAnswer: 1,
      explanation: "Spread operatori (`...`) ES6 da kiritilgan qulay vosita bo'lib, u obyektlarning barcha xususiyatlarini yangi obyekt blokining ichiga yoyib (nusxalab) beradi."
    }
  ]
};
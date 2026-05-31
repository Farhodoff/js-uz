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

### I. Property value shorthand va Property existence (in operatori)

Agar o'zgaruvchi nomi obyekt kaliti bilan bir xil bo'lsa, qisqartma (shorthand) usulda yozish mumkin:
\`\`\`javascript
function makeUser(ism, yosh) {
  return {
    ism, // ism: ism bilan bir xil
    yosh  // yosh: yosh bilan bir xil
  };
}
const user = makeUser("Ali", 25);
\`\`\`

Obyektda xususiyat mavjudligini tekshirish uchun \`in\` operatori ishlatiladi:
\`\`\`javascript
const avto = { marka: "BYD" };
console.log("marka" in avto); // true
console.log("yil" in avto);   // false
\`\`\`

### J. for...in sikli

Obyektning barcha kalitlarini aylanib chiqish uchun \`for...in\` siklidan foydalaniladi:
\`\`\`javascript
const user = { name: "Ali", age: 25, isAdmin: true };
for (let key in user) {
  console.log(key);       // name, age, isAdmin
  console.log(user[key]); // "Ali", 25, true
}
\`\`\`
**Saralash tartibi:** Kalitlar butun son bo'lsa, o'sish tartibida saralanadi. Boshqa barcha kalitlar esa qo'shilgan tartibi bo'yicha chiqadi.

### K. Obyekt nusxalash: Shallow Copy vs Deep Copy (structuredClone)

Obyektlar xotirada havolalar (references) orqali saqlanadi. Oddiy nusxalash (\`const admin = user\`) faqat havolani nusxalaydi.

**Shallow Copy (Sayoz nusxa):** Obyektning birinchi darajali xossalarini nusxalaydi (\`Object.assign\` yoki \`{...obj}\`). Ichki obyektlar hamon bitta joyga ishora qiladi.

**Deep Copy (Chuqur nusxa):** Ichma-ich joylashgan barcha obyektlarni ham to'liq nusxalaydi. Buning uchun \`structuredClone(obj)\` metodidan foydalaniladi:
\`\`\`javascript
const user = { name: "Ali", sizes: { height: 180 } };
const clone = structuredClone(user); // chuqur nusxa
clone.sizes.height = 190;
console.log(user.sizes.height); // 180 (original o'zgarmadi!)
\`\`\`

### L. Konstruktor funksiyalar va "new" operatori

Ko'plab bir xil turdagi obyektlarni yaratish uchun konstruktor funksiyalar yoziladi (nomi bosh harf bilan boshlanadi va \`new\` bilan chaqiriladi):
\`\`\`javascript
function User(name) {
  // this = {}; (yashirincha)
  this.name = name;
  this.isAdmin = false;
  // return this; (yashirincha)
}
const user1 = new User("Ali");
const user2 = new User("Vali");
\`\`\`

### M. Property Flags va Descriptors (defineProperty)

Obyekt xususiyatlari qiymatdan tashqari 3 ta yashirin bayroqqa (flags) ega:
* **writable** — true bo'lsa, o'zgartirish mumkin, aks holda o'qish uchun faqat (read-only).
* **enumerable** — true bo'lsa, \`for...in\` va \`Object.keys()\` da chiqadi.
* **configurable** — true bo'lsa, o'chirish yoki flaglarini o'zgartirish mumkin.

Bayroqlarni o'qish va o'zgartirish metodlari:
\`\`\`javascript
const user = { name: "Ali" };
// Flaglarni o'qish
let descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor.writable); // true

// Flaglarni o'zgartirish
Object.defineProperty(user, "name", {
  writable: false,     // qiymatni o'zgartirib bo'lmaydi
  configurable: false  // xususiyatni o'chirib bo'lmaydi
});
\`\`\`

### N. Obyektlarni himoya qilish (Sealing & Freezing)

Obyekt butunligini saqlash uchun JavaScript-da 3 xil darajadagi himoya metodlari bor:
1. **Object.preventExtensions(obj):** Yangi xususiyat qo'shishni taqiqlaydi. Tekshirish: \`Object.isExtensible(obj)\`.
2. **Object.seal(obj):** Yangi xususiyat qo'shish va o'chirishni taqiqlaydi. Mavjudlarini o'zgartirish mumkin (\`configurable: false\` qiladi). Tekshirish: \`Object.isSealed(obj)\`.
3. **Object.freeze(obj):** Obyektni to'liq muzlatadi. Yangi qo'shish, o'chirish va qiymat o'zgartirishni taqiqlaydi (\`writable: false, configurable: false\` qiladi). Tekshirish: \`Object.isFrozen(obj)\`.

### O. Object.fromEntries(iterable)

Kalit-qiymat massividan qaytadan obyekt yasab beradi (\`Object.entries()\` metodining teskarisi):
\`\`\`javascript
const entries = [["name", "Ali"], ["age", 25]];
const user = Object.fromEntries(entries);
console.log(user); // { name: "Ali", age: 25 }
\`\`\`

### P. Obyektni primitiv turga aylantirish (Object to Primitive Conversion)

Obyektlar matematik amallar yoki String konversiyada avtomatik ravishda primitivlarga aylanadi. Buning uchun tizim maxsus metodlarni izlaydi:
1. \`obj[Symbol.toPrimitive](hint)\`
2. \`toString()\` va \`valueOf()\`

\`\`\`javascript
const user = {
  name: "Ali",
  money: 1000,
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? \`{name: "\${this.name}"}\` : this.money;
  }
};
console.log(user + 500);   // 1500 (hint is "number")
console.log(String(user)); // {name: "Ali"} (hint is "string")
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

## 5. AMALIYOT (Mashqlar pastda)

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
    },
    {
      id: 13,
      title: "structuredClone orqali chuqur nusxa olish",
      instruction: "Berilgan 'user' obyektining to'liq chuqur nusxasini (deep copy) structuredClone yordamida 'clone' o'zgaruvchisiga nusxalang.",
      startingCode: "const user = { name: 'Ali', details: { age: 25 } };\n\n// structuredClone yordamida nusxalang\nconst clone = null;\n",
      hint: "const clone = structuredClone(user);",
      test: "if (code.includes('structuredClone') && clone !== user && clone.details !== user.details && clone.details.age === 25) return null; return 'structuredClone orqali to\\'g\\'ri deep copy qiling';"
    },
    {
      id: 14,
      title: "Object.defineProperty() orqali read-only property yaratish",
      instruction: "Object.defineProperty yordamida 'book' obyektining 'title' xususiyatini o'zgartirib bo'lmaydigan (writable: false) qilib sozlang.",
      startingCode: "const book = { title: 'JS Manual' };\n\n// defineProperty yordamida writable: false qiling\n",
      hint: "Object.defineProperty(book, 'title', { writable: false });",
      test: "const d = Object.getOwnPropertyDescriptor(book, 'title'); if (d && d.writable === false && code.includes('defineProperty')) return null; return 'defineProperty yordamida writable: false o\\'rnating';"
    },
    {
      id: 15,
      title: "Object.freeze() orqali obyektni muzlatish",
      instruction: "'config' obyektini Object.freeze yordamida o'zgartirib bo'lmaydigan qilib muzlating.",
      startingCode: "const config = { theme: 'dark', version: 1.0 };\n\n// Obyektni muzlating\n",
      hint: "Object.freeze(config);",
      test: "if (Object.isFrozen(config) && code.includes('freeze')) return null; return 'Object.freeze orqali config obektini muzlating';"
    },
    {
      id: 16,
      title: "Object.seal() orqali obyektni muhrlash",
      instruction: "'state' obyektini Object.seal yordamida yangi xususiyat qo'shib va o'chirib bo'lmaydigan qilib muhrlang.",
      startingCode: "const state = { count: 0 };\n\n// Obyektni muhrlang\n",
      hint: "Object.seal(state);",
      test: "if (Object.isSealed(state) && code.includes('seal')) return null; return 'Object.seal orqali state obektini muhrlang';"
    },
    {
      id: 17,
      title: "Object.fromEntries() orqali massivdan obyekt yaratish",
      instruction: "'pairs' massividagi kalit-qiymat juftliklarini Object.fromEntries yordamida 'user' obyektiga o'tkazing.",
      startingCode: "const pairs = [['name', 'Ali'], ['role', 'admin']];\n\n// Obyektga aylantiring\nconst user = null;\n",
      hint: "const user = Object.fromEntries(pairs);",
      test: "if (user && user.name === 'Ali' && user.role === 'admin' && code.includes('fromEntries')) return null; return 'Object.fromEntries yordamida pairs ni obektga aylantiring';"
    },
    {
      id: 18,
      title: "Object.create() descriptors bilan ishlash",
      instruction: "Object.create yordamida 'proto' obyektidan meros olgan va o'zining o'zgartirib bo'lmaydigan 'id' (value: 123, writable: false) xususiyatiga ega 'child' obyektini yarating.",
      startingCode: "const proto = { greet() { return 'Hi'; } };\n\n// Object.create yordamida child obyektini yarating\nconst child = null;\n",
      hint: "const child = Object.create(proto, { id: { value: 123, writable: false } });",
      test: "if (child && Object.getPrototypeOf(child) === proto && child.id === 123 && Object.getOwnPropertyDescriptor(child, 'id').writable === false) return null; return 'Object.create orqali descriptors bilan child obyektini yarating';"
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
      explanation: "Spread operatori (`...`) ES6 da kiritilgan qulay vosita bo'lib, u obyektbining barcha xususiyatlarini yangi obyekt blokining ichiga yoyib (nusxalab) beradi."
    },
    {
      id: 6,
      question: "Obyektdan uning muayyan kaliti va qiymatini butunlay o'chirib tashlash uchun qaysi maxsus operator ishlatiladi?",
      options: [
        "`remove`",
        "`delete` (masalan: `delete user.age`)",
        "`clear`",
        "`exclude`"
      ],
      correctAnswer: 1,
      explanation: "`delete` operatori obyektning ma'lum bir xususiyatini (property) kaliti va qiymati bilan birga o'chirib tashlaydi."
    },
    {
      id: 7,
      question: "Obyekt tarkibidagi property (xususiyat)larni o'qish va yozish jarayonlarida maxsus tekshiruvlar yoki amallarni bajarish uchun nima ishlatiladi?",
      options: [
        "Constructor funksiyalar",
        "Getters va Setters (get va set kalit so'zlari)",
        "Prototypes",
        "Static methods"
      ],
      correctAnswer: 1,
      explanation: "`get` va `set` kalit so'zlari yordamida obyekt xususiyatlariga murojaat qilganda yoki yangi qiymat yozganda ishga tushadigan maxsus metodlar yozish mumkin."
    },
    {
      id: 8,
      question: "`Object.entries(obj)` metodi obyekt qabul qilgandan so'ng qanday natija qaytaradi?",
      options: [
        "Faqat kalitlar ro'yxatini",
        "Faqat qiymatlar ro'yxatini",
        "Obyektning har bir kalit-qiymat juftligini `[kalit, qiymat]` ko'rinishidagi massivlar sifatida qaytaradigan ikki o'lchamli massiv",
        "Obyektning string ko'rinishini"
      ],
      correctAnswer: 2,
      explanation: "`Object.entries()` metodi obyektning har bir xususiyatini `[key, value]` ko'rinishidagi massivga joylab, umumiy bitta katta massiv sifatida qaytaradi."
    },
    {
      id: 9,
      question: "Quyidagi obyektda shahar qiymatini o'qish uchun qaysi dot notation yozuvi to'g'ri?\n```javascript\nconst user = { name: 'Ali', address: { city: 'Samarqand' } };\n```",
      options: [
        "`user.address`",
        "`user.city`",
        "`user.address.city`",
        "`user.address[city]`"
      ],
      correctAnswer: 2,
      explanation: "Ichma-ich joylashgan obyektlarning qiymatlarini o'qish uchun nuqta yordamida ketma-ket murojaat qilinadi: `user.address.city`."
    },
    {
      id: 10,
      question: "Obyektda mavjud bo'lmagan xususiyatni (property) nuqta orqali o'qishga urinilganda qanday qiymat qaytadi?",
      options: [
        "NullPointerException xatosi yuz beradi",
        "`undefined` (xatolik yuz bermaydi, shunchaki aniqlanmagan qiymat qaytadi)",
        "`null`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da obyekt ichida yo'q kalit chaqirilganda dastur xato bermaydi, shunchaki `undefined` qaytariladi."
    },
    {
      id: 11,
      question: "Quyidagi kodda `Object.assign` nima vazifani bajarmoqda?\n```javascript\nconst copy = Object.assign({}, original);\n```",
      options: [
        "original obyektni o'chirib tashlamoqda",
        "original obyektning to'liq nusxasini (shallow copy) yangi bo'sh obyekt ichiga yaratmoqda",
        "original obyektni massivga aylantirmoqda",
        "original obyekt tarkibini muzlatib qo'ymoqda"
      ],
      correctAnswer: 1,
      explanation: "`Object.assign` bir yoki bir nechta manba obyektlarning barcha xususiyatlarini maqsad obyektga (bizda bo'sh `{}` obyektga) nusxalab beradi."
    },
    {
      id: 12,
      question: "Bracket notation yordamida kalitlarni o'qishda `obj[key]` sintaksisidagi `key` nima bo'lishi mumkin?",
      options: [
        "Faqat raqam",
        "Faqat string matn",
        "O'zgaruvchi, matn, bo'sh joyli yoki maxsus belgili string yoki har qanday ifoda",
        "Faqat maxsus Symbol"
      ],
      correctAnswer: 2,
      explanation: "Bracket notation ichiga o'zgaruvchini qo'yish yoki istalgan satrni (bo'sh joylari bor bo'lsa ham) yozish mumkin, bu dot notation'dan ko'ra ancha moslashuvchan."
    },
    {
      id: 13,
      question: "Quyidagi kodda `structuredClone` va spread operatori (`{...user}`) orqali olingan nusxalar o'rtasidagi farq nima?",
      options: [
        "`structuredClone` obyektni funksiyalari bilan birga to'liq nusxalaydi, spread esa nusxalamaydi",
        "`structuredClone` chuqur (deep) nusxa oladi, ya'ni sizes ichidagi obyektni ham nusxalaydi; spread esa faqat sayoz (shallow) nusxa oladi, ya'ni ichki obyekt havolasini nusxalaydi",
        "Ular o'rtasida hech qanday farq yo'q",
        "`structuredClone` faqat massivlarni nusxalaydi"
      ],
      correctAnswer: 1,
      explanation: "`structuredClone` original obyektni rekursiv ravishda chuqur nusxalaydi, spread esa faqat birinchi darajali propertylarni nusxalaydi, ichki obyektlar esa bitta havolani ko'rsatib qoladi."
    },
    {
      id: 14,
      question: "`Object.defineProperty(obj, 'prop', { writable: false })` qilingan xususiyatga yangi qiymat yozishga urinilganda strict mode da nima sodir bo'ladi?",
      options: [
        "Hech narsa sodir bo'lmaydi, qiymat jimgina o'zgarmaydi",
        "Obyekt butunlay o'chib ketadi",
        "`TypeError` xatoligi yuzaga keladi",
        "Qiymat muvaffaqiyatli o'zgaradi"
      ],
      correctAnswer: 2,
      explanation: "Strict rejimda o'zgartirib bo'lmaydigan (read-only) xususiyatga qiymat yozish taqiqlangan va bu TypeError xatoligini beradi."
    },
    {
      id: 15,
      question: "`Object.seal(obj)` va `Object.freeze(obj)` o'rtasidagi asosiy farq nima?",
      options: [
        "Sealda yangi xususiyat qo'shish mumkin, freezeda mumkin emas",
        "Sealda mavjud xususiyatlar qiymatini o'zgartirish (writable bo'lsa) mumkin, freezeda esa mutlaqo hech qanday xususiyatni o'zgartirib bo'lmaydi",
        "Freezeda obyektni o'chirish mumkin, sealda mumkin emas",
        "Ular bir xil vazifani bajaradi"
      ],
      correctAnswer: 1,
      explanation: "Seal qilingan obyektda xususiyatlar qiymatini o'zgartirish imkoni qoladi, freeze qilinganda esa barcha xususiyatlar writable: false bo'ladi va butunlay muzlaydi."
    },
    {
      id: 16,
      question: "Konstruktor funksiyani `new User('Ali')` ko'rinishida chaqirganda dvigatel ichida birinchi bo'lib qaysi yashirin amal bajariladi?",
      options: [
        "Bo'sh yangi obyekt yaratiladi va u `this` ga tenglashtiriladi",
        "Obyekt string turiga aylantiriladi",
        "Funksiyadagi barcha o'zgaruvchilar o'chiriladi",
        "Foydalanuvchidan ma'lumot kiritish so'raladi"
      ],
      correctAnswer: 0,
      explanation: "`new` operatori chaqirilganda birinchi bo'lib yashirincha yangi bo'sh obyekt `{}` yaratiladi va u funksiya ichidagi `this` ga bog'lanadi."
    },
    {
      id: 17,
      question: "`Object.fromEntries(iterable)` metodining vazifasi nima?",
      options: [
        "Obyektni key-value massivlariga aylantirish",
        "Kalit-qiymat juftliklaridan iborat massiv yoki iterable-ni qaytadan obyektga aylantirish",
        "Obyektni JSON formatiga o'tkazish",
        "Obyektning barcha kalitlarini o'chirish"
      ],
      correctAnswer: 1,
      explanation: "`Object.fromEntries()` kalit-qiymat juftliklaridan iborat ro'yxatni (masalan, `Map` yoki massiv) qabul qiladi va undan obyekt yasaydi."
    },
    {
      id: 18,
      question: "Obyektni primitiv turga (matn yoki son) aylantirishda qaysi maxsus Symbol kalitli metod eng birinchi qidiriladi?",
      options: [
        "`Symbol.iterator`",
        "`Symbol.toStringTag`",
        "`Symbol.toPrimitive`",
        "`Symbol.valueOf`"
      ],
      correctAnswer: 2,
      explanation: "Dvigatel obyektni primitivga aylantirishda birinchi bo'lib `Symbol.toPrimitive` metodi borligini tekshiradi va bor bo'lsa uni hint bilan ishga tushiradi."
    }
  ]
};
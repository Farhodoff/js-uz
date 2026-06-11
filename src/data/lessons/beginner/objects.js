export const objects = {
  id: "objects",
  title: "Obyektlar (Objects)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Obyektlar (Objects) nima?
JavaScript-da **Obyektlar** — bu kalit (key) va qiymat (value) juftliklarini o'zida saqlovchi murakkab ma'lumot tuzilmasidir. Agar oddiy o'zgaruvchilar (masalan, string, number) faqat bitta qiymatni saqlay olsa, obyektlar bitta nom ostida butun bir mavjudotga tegishli bo'lgan bir nechta xarakteristika va harakatlarni birlashtirish imkonini beradi.

* **Xossalar (Properties):** Obyektning xususiyatlari (masalan: ismi, yoshi, rangi).
* **Metodlar (Methods):** Obyekt bajarishi mumkin bo'lgan harakatlar (aslida funksiyalar).

### Real hayotiy analogiya
Tasavvur qiling, sizda **Shaxsiy Passport** bor:
* Passport — bu bitta yaxlit **obyekt**.
* Undagi ma'lumotlar esa **xossalar**dir:
  * \`ism\`: "Farhod" (kalit: \`ism\`, qiymat: \`"Farhod"\`)
  * \`yosh\`: 28 (kalit: \`yosh\`, qiymat: \`28\`)
  * \`millat\`: "O'zbek" (kalit: \`millat\`, qiymat: \`"O'zbek"\`)
* Passport egasi qilishi mumkin bo'lgan harakatlar esa **metodlar** hisoblanadi, masalan: \`chegaradanOtish()\`.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Obyekt yaratish, o'qish va o'zgartirish)
Obyekt yaratish va dot notation (nuqta) orqali uning ustida amallar bajarish:
\`\`\`javascript
// Obyekt literal yordamida yaratish
const user = {
  name: "Farhod",
  age: 28,
  job: "Dasturchi"
};

// 1. Qiymatlarni o'qish (Dot notation)
console.log(user.name); // "Farhod"
console.log(user.age);  // 28

// 2. Qiymatni o'zgartirish
user.age = 29;
console.log(user.age);  // 29

// 3. Yangi xossa qo'shish
user.country = "O'zbekiston";
console.log(user.country); // "O'zbekiston"

// 4. Xossani o'chirib tashlash
delete user.job;
console.log(user.job); // undefined
\`\`\`

### 2. Intermediate Example (Bracket notation va dinamik kalitlar)
Agar kalit nomi o'zgaruvchida saqlangan bo'lsa yoki bo'shliqqa (space) ega bo'lsa, qavsli yozuvdan foydalanamiz:
\`\`\`javascript
const keyName = "role";

const employee = {
  fullName: "Sardor Rahimov",
  "current-salary": 1200, // kalitda maxsus belgilar bor
  [keyName]: "Lead Developer" // Dinamik ravishda 'role' kaliti yaratiladi
};

// 1. Nuqta orqali murojaat qilib bo'lmaydi (xatolik beradi):
// employee.current-salary 

// 2. Qavsli yozuv orqali o'qish (To'g'ri):
console.log(employee["current-salary"]); // 1200
console.log(employee[keyName]); // "Lead Developer"

// 3. Obyekt kalitlarini aylanib chiqish (for...in)
for (let key in employee) {
  console.log(\`\${key}: \${employee[key]}\`);
}
\`\`\`

### 3. Advanced Example (Metodlar va 'this' kalit so'zi)
Obyekt ichida funksiyalarni yozish va obyektdagi boshqa xossalarga \`this\` yordamida murojaat qilish:
\`\`\`javascript
const calculator = {
  num1: 10,
  num2: 5,
  
  // Obyekt metodi
  add() {
    // this ushbu calculator obyektiga ishora qiladi
    return this.num1 + this.num2;
  },
  
  multiply: function() {
    return this.num1 * this.num2;
  }
};

console.log(calculator.add());      // 15
console.log(calculator.multiply()); // 50
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Dasturlashda ma'lumotlar ko'pincha guruhlangan holda keladi. Agar obyektlar bo'lmaganda, biz bitta foydalanuvchining ma'lumotlarini tarqoq o'zgaruvchilar shaklida yozishga majbur bo'lardik:
\`\`\`javascript
let userName = "Ali";
let userAge = 25;
let userJob = "Dizayner";
\`\`\`
Bu usulda bir nechta foydalanuvchilar bilan ishlash yoki ma'lumotlarni funksiyalarga uzatish juda qiyin bo'ladi. Obyektlar esa ushbu muammoni hal qilib, bog'liq ma'lumotlarni yagona struktura ichiga jamlaydi (\`const user = { name: "Ali", age: 25, job: "Dizayner" }\`).

### Xotira bilan ishlash: Primitivlar vs Havolalar (References)
JavaScript-da obyektlar oddiy o'zgaruvchilardan farqli o'laroq, xotiraning **Heap** (uyum) qismida saqlanadi. O'zgaruvchining o'zida esa obyektning faqat xotiradagi manzili (havola/reference) yotadi.
\`\`\`javascript
const car1 = { brand: "BMW" };
const car2 = car1; // car2 ga xuddi shu havola nusxalandi

car2.brand = "Audi";
console.log(car1.brand); // "Audi" chiqadi! Chunki ikkisi ham bitta xotiraga qaragan.
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Dinamik kalitlarga nuqta (dot notation) orqali murojaat qilish
#### Xato:
\`\`\`javascript
const property = "name";
const person = { name: "Jasur" };
console.log(person.property); // undefined
\`\`\`
*Tushuntirish:* JavaScript obyekt ichidan aynan \`"property"\` deb nomlangan kalitni qidiradi va topolmaydi.
#### Tuzatish:
\`\`\`javascript
console.log(person[property]); // "Jasur"
\`\`\`

### 2. Obyektlarni \`===\` orqali taqqoslash
#### Xato:
\`\`\`javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false
\`\`\`
*Tushuntirish:* Obyektlar taqqoslanayotganda ularning qiymatlari emas, balki xotiradagi manzillari (references) taqqoslanadi. \`obj1\` va \`obj2\` alohida obyektlar bo'lgani uchun manzillari har xildir.

### 3. Yuzaki nusxalash (Shallow Copy) muammosi
#### Xato:
\`\`\`javascript
const original = { name: "Diyor", details: { city: "Toshkent" } };
const copy = { ...original }; // Spread yordamida nusxa oldik

copy.details.city = "Samarqand";
console.log(original.details.city); // "Samarqand" (original ham o'zgardi!)
\`\`\`
*Tushuntirish:* Spread operatori faqat birinchi darajadagi xossalarni nusxalaydi. Ichki obyektlar (\`details\`) baribir havola bo'yicha qolaveradi.

### 4. Mavjud bo'lmagan xossalarning ichki qiymatini o'qish (TypeError)
#### Xato:
\`\`\`javascript
const client = {};
console.log(client.profile.avatar); // TypeError: Cannot read properties of undefined (reading 'avatar')
\`\`\`
#### Tuzatish (Optional Chaining \`?.\` yordamida):
\`\`\`javascript
console.log(client.profile?.avatar); // undefined (xatolik bermaydi)
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Obyekt literal (object literal) nima?
   * **Javob:** Jingalak qavslar \`{}\` yordamida kalit va qiymatlar juftligini to'g'ridan-to'g'ri yozib obyekt yaratish usulidir.
2. **Savol:** Dot Notation va Bracket Notation farqi nimada?
   * **Javob:** Dot Notation (\`obj.key\`) oddiy va o'zgarmas kalitlar uchun ishlatiladi. Bracket Notation (\`obj["key"]\`) esa kalitda maxsus belgilar bo'lsa yoki dinamik o'zgaruvchidan foydalanilayotganda ishlatiladi.
3. **Savol:** Obyekt xossasini qanday o'chirib tashlash mumkin?
   * **Javob:** \`delete\` operatori yordamida, masalan: \`delete obj.propertyName\`.
4. **Savol:** Obyekt ichidagi metod nima?
   * **Javob:** Obyektning qiymati funksiya bo'lgan xossasiga metod deyiladi.

### Middle (5–8)
5. **Savol:** JavaScript-da obyektlar qanday nusxalanadi (Cloning)?
   * **Javob:** Yuzaki nusxalash (shallow copy) uchun \`{ ...obj }\` yoki \`Object.assign({}, obj)\` ishlatiladi. Chuqur nusxalash (deep copy) uchun esa \`structuredClone(obj)\` yoki \`JSON.parse(JSON.stringify(obj))\` metodlaridan foydalaniladi.
6. **Savol:** Obyektda biror kalit mavjudligini qanday aniqlash mumkin?
   * **Javob:** \`"key" in obj\` operatoridan yoki \`obj.hasOwnProperty("key")\` metodidan foydalanish orqali.
7. **Savol:** \`Object.keys()\`, \`Object.values()\` va \`Object.entries()\` nima qaytaradi?
   * **Javob:** \`Object.keys(obj)\` kalitlar massivini, \`Object.values(obj)\` qiymatlar massivini, \`Object.entries(obj)\` esa \`[kalit, qiymat]\` juftliklaridan iborat ikki o'lchamli massivni qaytaradi.
8. **Savol:** Arrow funksiyani obyekt metodi sifatida ishlatishning qanday salbiy oqibati bor?
   * **Javob:** Arrow funksiyalar o'zining shaxsiy \`this\` kontekstiga ega bo'lmaydi. Ular tashqi muhit \`this\` qiymatini olgani sababli, metod ichida obyekt xossalariga \`this.propertyName\` orqali murojaat qilib bo'lmaydi.

### Senior (9–12)
9. **Savol:** \`Object.freeze()\` va \`Object.seal()\` metodlarining farqi nimada?
   * **Javob:** \`freeze\` obyektni butunlay muzlatadi: yangi xossa qo'shish, o'chirish va qiymatlarni o'zgartirish taqiqlanadi. \`seal\` esa yangi xossa qo'shish va o'chirishni taqiqlaydi, lekin mavjud xossalar qiymatini o'zgartirishga ruxsat beradi.
10. **Savol:** Nima uchun \`{}\` === \`{}\` har doim \`false\` qaytaradi?
    * **Javob:** Chunki har bir jingalak qavs xotirada mutlaqo yangi manzilga ega obyekt yaratadi. Havola turi (reference type) bo'lgani sababli ularning xotiradagi manzillari har xil va taqqoslashda \`false\` beradi.
11. **Savol:** JavaScript dvigateli (V8) obyektlarni optimallashtirishda qanday texnologiyadan foydalanadi va bu dastur tezligiga qanday ta'sir qiladi?
    * **Javob:** V8 dvigateli orqa fonda **Hidden Classes** (Yashirin sinflar) yoki **Shapes**-dan foydalanadi. Agar obyektlar bir xil tartibda yaratilsa va keyinchalik ularga dinamik ravishda yangi kalitlar tartibsiz qo'shilmasa, dvigatel ularni tezroq ishlatadi (Inline Caching tufayli).
12. **Savol:** Qaysi holatlarda oddiy obyekt o'rniga ES6 \`Map\` tuzilmasini ishlatgan afzalroq?
    * **Javob:** Kalitlar turi faqat string yoki symbol bo'lmasdan, istalgan ma'lumot turi (masalan, boshqa obyekt yoki funksiya) bo'lishi kerak bo'lganda, shuningdek, elementlar juda tez-tez qo'shilib o'chirilganda (performance jihatdan \`Map\` optimallashtirilgan).

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz obyektlar bilan ishlash, ularga turli usullar bilan murojaat qilish bo'yicha amaliy topshiriqlarni bajarasiz.

### Murojaat qilish usullari sxemasi
Quyidagi diagrammada obyekt xossalariga dot va bracket notation yordamida qanday murojaat qilinishi tasvirlangan:

\`\`\`mermaid
graph TD
    subgraph Obyekt tuzilishi (Key-Value)
        Obj["const user = { name: 'Farhod', 'current-job': 'Dasturchi' };"]
        Obj --> K1["Kalit: name"]
        K1 --> V1["Qiymat: 'Farhod'"]
        Obj --> K2["Kalit: 'current-job'"]
        K2 --> V2["Qiymat: 'Dasturchi'"]
    end

    subgraph Murojaat qilish usullari (Access Methods)
        Obj --> Dot["Dot Notation (Nuqta)"]
        Obj --> Bracket["Bracket Notation (Qavs)"]

        Dot --> Ex1["user.name (Standart kalitlar)"]
        Dot -.-> Ex1Error["user.current-job (Xatolik)"]

        Bracket --> Ex2["user['name'] (Oddiy string)"]
        Bracket --> Ex3["user['current-job'] (Maxsus belgilar)"]
        Bracket --> Ex4["user[keyVariable] (Dinamik o'zgaruvchi)"]
    end
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars yakunida o'zlashtirgan bilimlaringizni mustahkamlash uchun 12 ta savoldan iborat testni yeching.

---

## 8. 🎯 Real Project Case Study

### Elektron do'kon savatchasi (Shopping Cart) simulyatsiyasi
Keling, real loyihada savatchadagi mahsulotlarni saqlash va hisob-kitob qilish jarayonini obyekt yordamida qanday amalga oshirishni ko'rib chiqamiz:

\`\`\`javascript
const shoppingCart = {
  owner: "Asila",
  items: [
    { id: 101, name: "Noutbuk", price: 1200, quantity: 1 },
    { id: 102, name: "Sichqoncha", price: 25, quantity: 2 }
  ],
  
  // Savatchaga yangi mahsulot qo'shish metodi
  addItem(newItem) {
    // Avval ushbu mahsulot savatchada bor-yo'qligini tekshiramiz
    const existingItem = this.items.find(item => item.id === newItem.id);
    
    if (existingItem) {
      existingItem.quantity += newItem.quantity || 1;
    } else {
      this.items.push(newItem);
    }
    console.log(\`\${newItem.name} savatchaga qo'shildi.\`);
  },
  
  // Umumiy summani hisoblash
  calculateTotal() {
    let total = 0;
    this.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }
};

// Metodlarni sinab ko'ramiz
shoppingCart.addItem({ id: 103, name: "Klaviatura", price: 45, quantity: 1 });
shoppingCart.addItem({ id: 102, name: "Sichqoncha", price: 25, quantity: 1 }); // soni ko'payadi

console.log("Savatchadagi mahsulotlar:");
console.log(shoppingCart.items);

console.log(\`Umumiy hisob: $\${shoppingCart.calculateTotal()}\`); // 1200*1 + 25*3 + 45*1 = 1320
\`\`\`

---

## 9. 🚀 Performance va Optimization

### 1. Yashirin sinflar (Hidden Classes) qoidasiga amal qiling
JavaScript dvigateli (masalan, V8) obyektlarni tezkor bajarish uchun ularga orqa fonda "yashirin sinf" beradi. Agar ikkita obyekt bir xil xossalarga ega bo'lsa-yu, lekin ular boshqa tartibda yaratilgan bo'lsa, dvigatel ular uchun alohida yashirin sinf yaratadi, bu esa tezlikni pasaytiradi:
* **Yomon usul (tartibsiz):**
  \`\`\`javascript
  const objA = {};
  objA.x = 5;
  objA.y = 10;
  
  const objB = {};
  objB.y = 10; // tartib buzildi
  objB.x = 5;
  \`\`\`
* **Yaxshi usul (tartibli):**
  Obyektlarni yaratishda xossalar tartibini bir xil saqlang yoki ularni obyekt yaratilayotgan paytning o'zida yozib keting.

### 2. Obyekt xossalarini tez-tez o'chirmang (\`delete\`)
\`delete obj.prop\` operatsiyasi obyektning yashirin sinfini o'zgartirib yuboradi va uni sekinlashtiradi. Buning o'rniga xossa qiymatini \`null\` yoki \`undefined\` qilib belgilash tezroq ishlaydi:
\`\`\`javascript
// delete user.age; (tavsiya etilmaydi)
user.age = null; // (tezroq ishlaydi, xotira optimallashtiriladi)
\`\`\`

### 3. Map va Object solishtiruvi
Tez-tez kalitlarni qo'shish va o'chirish talab qilinsa, xotira samaradorligi va tezlik jihatidan \`Map\` obyektga qaraganda yaxshi natija beradi.

---

## 10. 📌 Cheat Sheet

| Sintaksis / Metod | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`const obj = {}\` | Obyekt literal yaratish | \`const user = { name: "Ali" }\` |
| \`obj.key\` | Dot notation orqali o'qish/yozish | \`user.name = "Vali"\` |
| \`obj[key]\` | Bracket notation orqali dinamik o'qish/yozish | \`user["age"] = 30\` |
| \`delete obj.key\` | Xossani o'chirish | \`delete user.name\` |
| \`"key" in obj\` | Xossa borligini tekshirish | \`"age" in user // true\` |
| \`Object.keys(obj)\` | Barcha kalitlar massivini olish | \`Object.keys(user) // ["name", "age"]\` |
| \`Object.values(obj)\` | Barcha qiymatlar massivini olish | \`Object.values(user) // ["Vali", 30]\` |
| \`Object.entries(obj)\` | Kalit-qiymat juftliklari massivini olish | \`Object.entries(user) // [["name", "Vali"], ["age", 30]]\` |
| \`Object.assign(target, src)\` | Obyekt xossalarini boshqasiga nusxalash | \`Object.assign({}, user)\` |
| \`{ ...obj }\` | Spread operatori yordamida nusxa olish | \`const copy = { ...user }\` |
| \`Object.freeze(obj)\` | Obyektni o'zgarishlardan butunlay muzlatish | \`Object.freeze(user)\` |
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
    "id": 1,
    "question": "Obyekt literalini (object literal) yaratishning eng keng tarqalgan va tavsiya etilgan usuli qaysi?",
    "options": [
      "let obj = [];",
      "let obj = {};",
      "let obj = Object.create();",
      "let obj = new Map();"
    ],
    "correctAnswer": 1,
    "explanation": "Jingalak qavslar `{}` yordamida obyekt yaratish 'object literal' deb ataladi va bu JavaScript-da obyekt yaratishning eng sodda va keng tarqalgan usulidir."
  },
  {
    "id": 2,
    "question": "Obyekt xossasiga (property) qavsli yozuv (bracket notation) orqali murojaat qilishning nuqta (dot notation) yozuvidan asosiy afzalligi nimada?",
    "options": [
      "Bu usul dot notationga qaraganda tezroq ishlaydi",
      "U faqat raqamli kalitlar bilan ishlashga ruxsat beradi",
      "Dinamik o'zgaruvchi qiymatini yoki bo'sh joyi (space) bor kalitlarni xossa nomi sifatida ishlatish imkonini beradi",
      "Xossalarni avtomatik ravishda muzlatib qo'yadi (freeze)"
    ],
    "correctAnswer": 2,
    "explanation": "Qavsli yozuvda (`obj[variable]`) kalit sifatida o'zgaruvchidan yoki maxsus belgilar va bo'shliqlar bo'lgan satrlardan (masalan, `obj['first name']`) foydalanish mumkin, dot notation esa buni cheklaydi."
  },
  {
    "id": 3,
    "question": "Obyektdan ma'lum bir xossani (property) butunlay o'chirib tashlash uchun qaysi kalit so'z ishlatiladi?",
    "options": [
      "remove",
      "clear",
      "delete",
      "exclude"
    ],
    "correctAnswer": 2,
    "explanation": "JavaScript-da obyektdagi xossani va uning qiymatini o'chirish uchun `delete` operatori ishlatiladi, masalan: `delete user.age;`."
  },
  {
    "id": 4,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst user = { name: \"Aziza\" };\nconst admin = user;\nadmin.name = \"Madina\";\nconsole.log(user.name);\n```",
    "options": [
      "\"Aziza\"",
      "\"Madina\"",
      "undefined",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektlar JavaScript-da havola (reference) orqali uzatiladi. `admin = user` qilinganda, ikkala o'zgaruvchi ham bitta obyektga ishora qiladi. Shuning uchun `admin.name` o'zgartirilganda `user.name` ham o'zgaradi."
  },
  {
    "id": 5,
    "question": "Obyektda ma'lum bir kalit bor yoki yo'qligini tekshirish uchun qaysi operator to'g'ri keladi?",
    "options": [
      "key in obj",
      "obj.includes(key)",
      "obj.has(key)",
      "key of obj"
    ],
    "correctAnswer": 0,
    "explanation": "`\"key\" in obj` operatori obyektda yoki uning prototip zanjirida berilgan xossa nomi borligini tekshirib, true yoki false qaytaradi."
  },
  {
    "id": 6,
    "question": "Obyektdagi barcha kalitlarni (keys) massiv ko'rinishida olish uchun qaysi o'rnatilgan metoddan foydalaniladi?",
    "options": [
      "Object.values(obj)",
      "Object.keys(obj)",
      "Object.entries(obj)",
      "obj.getKeys()"
    ],
    "correctAnswer": 1,
    "explanation": "`Object.keys(obj)` metodi berilgan obyektning barcha xususiy va sanaladigan (enumerable) kalitlarini satrli massiv shaklida qaytaradi."
  },
  {
    "id": 7,
    "question": "Obyekt tarkibidagi metod ichida ishlatilgan `this` kalit so'zi odatda nimaga ishora qiladi?",
    "options": [
      "Global window obyektiga",
      "Metod chaqirilgan obyektning o'ziga",
      "Metodning parametrlariga",
      "undefined qiymatga"
    ],
    "correctAnswer": 1,
    "explanation": "Oddiy funksiya ko'rinishidagi metodlarda `this` kalit so'zi o'sha metod chaqirilgan obyektga (ya'ni context-ga) havola qiladi."
  },
  {
    "id": 8,
    "question": "Arrow funksiyalar (o'q funksiyalar) metod sifatida ishlatilganda, ulardagi `this` konteksti qanday aniqlanadi?",
    "options": [
      "this har doim o'sha obyektga bog'lanadi",
      "Arrow funksiyaning o'z this konteksti bo'lmaydi va u tashqi (leksik) muhitdagi this ni oladi",
      "U TypeError xatoligini beradi",
      "U har doim null ga teng bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalarda `this` konteksti mavjud bo'lmaydi. Ular o'zlari yozilgan joyning tashqi (leksik) kontekstidagi `this` ni meros qilib oladilar. Shuning uchun ularni obyekt metodi sifatida ishlatishda ehtiyot bo'lish zarur."
  },
  {
    "id": 9,
    "question": "ES6-ga ko'ra, obyekt kaliti va unga beriladigan o'zgaruvchi nomi bir xil bo'lsa, qanday qisqartma yozish mumkin (Property Shorthand)?",
    "options": [
      "const user = { name: name }; o'rniga const user = { name };",
      "const user = { name: :name };",
      "const user = { name = name };",
      "const user = { @name };"
    ],
    "correctAnswer": 0,
    "explanation": "Property Shorthand qoidasiga ko'ra, agar obyekt kaliti nomi va unga qiymat sifatida berilayotgan o'zgaruvchi nomi mos kelsa, ularni shunchaki bitta so'z qilib yozish kifoya: `{ name }`."
  },
  {
    "id": 10,
    "question": "Obyektni yuzaki nusxalash (shallow copy) uchun qaysi usullardan foydalanish mumkin?",
    "options": [
      "JSON.parse(JSON.stringify(obj))",
      "Object.assign({}, obj) yoki Spread operatori ({ ...obj })",
      "Object.create(obj)",
      "obj.clone()"
    ],
    "correctAnswer": 1,
    "explanation": "Spread operatori `{ ...obj }` va `Object.assign({}, obj)` yangi obyekt yaratib, unga birinchi darajali xossalarni nusxalaydi. Ichki obyektlar esa havola (reference) bo'yicha qoladi (yuzaki nusxa)."
  },
  {
    "id": 11,
    "question": "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nconst target = { a: 1 };\nconst source = { b: 2, c: 3 };\nconst result = Object.assign(target, source);\nconsole.log(target);\n```",
    "options": [
      "{ a: 1 }",
      "{ b: 2, c: 3 }",
      "{ a: 1, b: 2, c: 3 }",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "`Object.assign` metodi manba (source) obyektlarining xossalarini nishon (target) obyektga nusxalaydi va maqsad bo'lgan `target` obyektini o'zgartiradi. Shuning uchun `target` tarkibida a, b va c bo'ladi."
  },
  {
    "id": 12,
    "question": "`Object.freeze(obj)` metodi obyekt ustidan qanday cheklov o'rnatadi?",
    "options": [
      "Obyekt xossalarini faqat o'chirishga ruxsat beradi",
      "Yangi xossa qo'shish, borlarini o'chirish va ularning qiymatlarini o'zgartirishni butunlay taqiqlaydi",
      "Obyektni faqat for...in siklida aylanishni cheklaydi",
      "Obyektni avtomatik ravishda massivga aylantiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`Object.freeze()` metodi obyektni muzlatadi, ya'ni unga o'zgartirish kiritish butunlay taqiqlanadi (xossalar o'chirilmaydi, qiymatlar o'zgarmaydi va yangi xossalar qo'shilmaydi)."
  }
]

};

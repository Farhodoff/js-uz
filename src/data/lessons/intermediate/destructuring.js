export const destructuring = {
  id: "destructuring",
  title: "Destructuring (Ma'lumotlarni ochish) - Modern JavaScript",
  level: "Intermediate",
  description: "Obyekt va massiv ichidagi ma'lumotlarni bitta qatorda o'zgaruvchilarga ajratib olish.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, sizda foydalanuvchi obyekti bor va sizga uning ismi, yoshi va shahri kerak.

**Eski usul (Ko'p kod):**
\`\`\`javascript
const user = { name: 'Ali', age: 25, city: 'Tashkent' };
const name = user.name;
const age = user.age;
const city = user.city;
\`\`\`

Bu juda uzun va zerikarli. **Destructuring** bilan bu 1 qatorlik kod:
\`\`\`javascript
const user = { name: 'Ali', age: 25, city: 'Tashkent' };
const { name, age, city } = user;
\`\`\`

Farq: 4 qator -> 1 qator! Kod toza va o'qish oson.

## 2. SODDALIK (Analogiya)

Buni **sovg'a qutisi** deb tasavvur qiling. Ichida ayiqcha, koptok va shokolad bor.
- **Eski usulda:** Qutini ochib, ayiqchani olasiz. Keyin yana qutiga qarab, koptokni olasiz. Har narsani bitta bitta chiqarasiz.
- **Destructuring usulida:** Qutini bir marta ochib, hamma narsani bir vaqtda qo'lingizga (o'zgaruvchilarga) olasiz.

## 3. STRUKTURA

### A. Obyekt Destructuring (Object Destructuring)

Obyektda **kalitning nomi** muhim, chunki u kalitga qarab moslashtiriladi:
\`\`\`javascript
const car = { model: "BYD", year: 2024, color: "oq" };

// Kalitlarni o'zgaruvchilarga chiqarish:
const { model, year, color } = car;
console.log(model);  // "BYD"
console.log(year);   // 2024
\`\`\`

**Muhim:** Chiqarilgan o'zgaruvchilar nomi kalit nomi bilan bir xil bo'lishi kerak. Agar kalit obyektda bo'lmasa, u \`undefined\` bo'ladi.

### B. Aliasing (Nomni o'zgartirish)

Agar kalitning nomi siz xohlaydigan o'zgaruvchi nomiga mos kelmasa, undan keyin \`:\` qo'yib yangi nom berish mumkin:
\`\`\`javascript
const car = { model: "BYD", year: 2024 };

// model -> marka, year -> yil
const { model: marka, year: yil } = car;
console.log(marka);  // "BYD"
console.log(yil);    // 2024
\`\`\`

### C. Default Qiymatlar

Agar kaliti yo'q bo'lsa yoki qiymati \`undefined\` bo'lsa, default qiymat ishlatiladi:
\`\`\`javascript
const user = { name: "Ali", age: undefined };

const { name, age = 25, city = "Toshkent" } = user;
console.log(name);   // "Ali"
console.log(age);    // 25 (default - chunki undefined edi)
console.log(city);   // "Toshkent" (default - chunki kalit yo'q edi)
\`\`\`

### D. Ichma-ich Obyektlarni Destructure Qilish (Nested)

Ichma-ich joylashgan ma'lumotlarni qat'iy tuzilma bilan ajratib olish mumkin:
\`\`\`javascript
const shaxs = {
  ism: "Farhod",
  manzil: {
    shahar: "Toshkent",
    ko_cha: "Amir Temur"
  }
};

// Ichma-ich destructuring:
const { ism, manzil: { shahar, ko_cha } } = shaxs;
console.log(ism);      // "Farhod"
console.log(shahar);   // "Toshkent"
\`\`\`

### E. Massiv Destructuring (Array Destructuring)

Massivda **tartib (index)** muhim, kalit nomi emas:
\`\`\`javascript
const ranglar = ["qizil", "yashil", "ko'k"];

// Tartibga ko'ra o'zgaruvchilarga chiqarish:
const [r1, r2, r3] = ranglar;
console.log(r1); // "qizil"
console.log(r2); // "yashil"
console.log(r3); // "ko'k"
\`\`\`

### F. Massivda Elementlarni Tashlab Ketish

Keraksiz elementlarni vergullar yordamida tashlab ketish mumkin:
\`\`\`javascript
const fruits = ["olma", "apelsin", "banan"];

// Ikkinchisini tashlab ketib, birinchi va uchinchisini olish:
const [first, , third] = fruits;
console.log(first);  // "olma"
console.log(third);  // "banan"
\`\`\`

### G. Rest Operatori (...) - Qolganlarini yig'ish

Massiv yoki obyektdan kerakli qismini olib, qolgan elementlarni bitta o'zgaruvchiga yig'ish:
\`\`\`javascript
const raqamlar = [1, 2, 3, 4, 5];
const [first, second, ...rest] = raqamlar;

console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5] (Qolganlari yangi massivda)
\`\`\`

### H. Funksiya Parametrlarida Destructuring

Parametrdagi obyektlarni to'g'ridan-to'g'ri destructuring qilish kodni juda toza ko'rsatadi:
\`\`\`javascript
// Obyekt parametrini destructure qilish
function greet({ name, city, country = "O'zbekiston" }) {
  console.log(\`Salom \${name}, \${city} (\${country})dan\`);
}

greet({ name: "Ali", city: "Toshkent" }); // "Salom Ali, Tashkent (O'zbekiston)dan"
\`\`\`

**Muhim:** Agar funksiyaga hech qanday argument berilmasa va parametrlarda default obyekt (\`= {}\`) berilmagan bo'lsa, xatolik yuz beradi. Shuning uchun har doim default obyektni belgilash yaxshi amaliyotdir:
\`\`\`javascript
function printUser({ name } = {}) { // '= {}' xavfsizlik uchun
  console.log(name);
}
printUser(); // undefined (xato bermaydi!)
\`\`\`

### I. Qiymatlarni Almashtirish (Swap)

Uchinchi yordamchi o'zgaruvchisiz ikki qiymatni tezkor almashtirish:
\`\`\`javascript
let a = 5;
let b = 10;

[a, b] = [b, a];
console.log(a); // 10
console.log(b); // 5
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Noto'g'ri qavslar ishlatish:** Obyekt uchun \`{ }\`, massiv uchun \`[ ]\` ishlatish shart.
   \`\`\`javascript
   // XATO:
   const [name, age] = user; // Obyekt uchun array qavsi xato

   // TO'G'RI:
   const { name, age } = user;
   \`\`\`

2. **Null yoki Undefined ustida bajarish:**
   \`\`\`javascript
   const { name } = null; // TypeError: Cannot destructure property 'name' of 'null'
   \`\`\`
   Buning oldini olish uchun fallback ishlatiladi:
   \`\`\`javascript
   const { name } = null || {}; // Xato bermaydi, name = undefined bo'ladi
   \`\`\`

3. **Rest operatorini o'rtada yoki boshida ishlatish:**
   Rest har doim oxirida bo'lishi shart:
   \`\`\`javascript
   // XATO:
   const [first, ...rest, last] = [1, 2, 3]; // SyntaxError!
   \`\`\`

## 5. AMALIYOT (Mashqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

**1. Destructuring nima?**
Obyekt yoki massiv ichidagi qiymatlarni bittalab olish o'rniga, ularni "bir urinishda" alohida o'zgaruvchilarga chiqarib olish usulidir.

**2. Obyekt destructuringda kalitlar nomi bir xil bo'lishi shartmi?**
Ha, kalit nomi destructuring da o'zgaruvchi nomi bilan mos bo'lishi kerak. Agar boshqacha nom xoxlansa, aliasing ishlatiladi.

**3. O'zgaruvchi nomini aliasing orqali qanday o'zgartirsa bo'ladi?**
Qavslarda kalit nomidan keyin \`:\` qo'yib, yangi nom yoziladi. Masalan: \`{ model: marka }\`.

**4. Massiv destructuringda elementlarni qanday tashlab ketsa bo'ladi?**
O'sha element o'rniga bo'sh joy (vergul) qoldirish orqali. Masalan: \`[first, , third]\` da ikkinchi element tashlanadi.

**5. Default qiymat berish nima uchun kerak?**
Agar kaliti yo'q bo'lsa yoki uning qiymati undefined bo'lsa, xatolik chiqmasdan standart qiymatni o'zlashtirish uchun.

**6. Funksiya parametrlarida destructuring ishlatish mumkinmi?**
Ha, mutlaqo. Masalan: \`function greet({ name, age }) { ... }\`.

**7. Ikki o'zgaruvchi qiymatini uchinchi o'zgaruvchisiz qanday almashtirish mumkin?**
Array destructuring yordamida: \`[a, b] = [b, a]\`.

**8. Nested (ichma-ich) obyektlarni destructure qilish misolini keltiring.**
\`const { manzil: { shahar } } = user;\` - bu \`manzil\` ichidagi \`shahar\` qiymatini chiqaradi.

**9. \`const { a, b } = null\` natijasi nima bo'ladi?**
TypeError beradi. Null va undefined qiymatlarini destructure qilib bo'lmaydi.

**10. Massivdan qolgan hamma elementlarni rest (...) orqali qanday olish mumkin?**
\`const [first, ...rest] = [1, 2, 3, 4]\`. Bu yerda rest \`[2, 3, 4]\` massivi bo'ladi.

**11. Obyekt destructuringda elementlar tartibi muhimmi?**
Yo'q, obyektda tartib muhim emas, faqat kalit nomlari mos kelishi muhim.

**12. Massiv destructuringda elementlar tartibi muhimmi?**
Ha, massivda index (tartib) juda muhim, chunki o'zgaruvchilar tartibga qarab qiymatlarni oladi.
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Obyekt Destructuring",
      instruction: "'user' objektidan 'name' va 'age' ni destructuring orqali chiqaring va console.log() qiling.",
      startingCode: "const user = { name: 'Ali', age: 25, city: 'Tashkent' };\n\n// Destructuring bu yerga\n",
      hint: "const { name, age } = user; console.log(name, age);",
      test: "if (logs.includes('Ali') && logs.includes('25')) return null; return 'Destructuring noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Massiv Destructuring",
      instruction: "'colors' massividan birinchi va uchinchi elementlarni destructuring orqali olip, console.log() qiling.",
      startingCode: "const colors = ['red', 'green', 'blue', 'yellow'];\n\n// Destructuring bu yerga\n",
      hint: "const [first, , third] = colors; console.log(first, third);",
      test: "if (logs.includes('red') && logs.includes('blue')) return null; return 'Massiv destructuring noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Aliasing - Nom o'zgartirish",
      instruction: "'car' objektidagi 'model' ni 'marka' deb o'zgaruvchiga olip, console.log() qiling.",
      startingCode: "const car = { model: 'BYD', year: 2024 };\n\n// Aliasing orqali model -> marka\n",
      hint: "const { model: marka } = car; console.log(marka);",
      test: "if (logs.includes('BYD')) return null; return 'Aliasing noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Default Qiymatlar",
      instruction: "'person' objektida 'age' kaliti yo'q. Default 30 qiymatini berip destructuring qiling.",
      startingCode: "const person = { name: 'Farhod', city: 'Tashkent' };\n\n// Default qiymat bilan destructuring\n",
      hint: "const { name, age = 30 } = person; console.log(age);",
      test: "if (logs.includes('30')) return null; return 'Default qiymat noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Nested Objektlarni Destructuring",
      instruction: "'user' objektidagi ichma-ich 'address.city' ni destructuring orqali olip, console.log() qiling.",
      startingCode: "const user = {\n  name: 'Ali',\n  address: { city: 'Tashkent', street: 'Amir Temur' }\n};\n\n// Nested destructuring\n",
      hint: "const { address: { city } } = user; console.log(city);",
      test: "if (logs.includes('Tashkent')) return null; return 'Nested destructuring noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "Rest Operatori Massivda",
      instruction: "'numbers' massividan birinchi va ikkinchi elementlarni olip, qolganlarini 'rest' o'zgaruvchiga saqlang.",
      startingCode: "const numbers = [1, 2, 3, 4, 5];\n\n// Rest operatori bilan destructuring\n",
      hint: "const [first, second, ...rest] = numbers; console.log(rest);",
      test: "if (logs.includes('3') && logs.includes('4') && logs.includes('5')) return null; return 'Rest operatori noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "Qiymatlarni Almashtirish",
      instruction: "Ikkita o'zgaruvchi 'a = 5' va 'b = 10'. Destructuring orqali ularni almashtiring (swap).",
      startingCode: "let a = 5;\nlet b = 10;\n\n// Destructuring orqali almashtiring\n\nconsole.log(a, b);\n",
      hint: "[a, b] = [b, a]; console.log(a, b);",
      test: "if (logs.includes('10') && logs.includes('5')) return null; return 'Swap noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Funksiya Parametrlarida Destructuring",
      instruction: "'displayUser' funksiyasiga destructuring bilan 'name' va 'city' parametrlarni qo'ying. Funksiya ishga tushganda chiqarsin.",
      startingCode: "// Destructuring bilan funksiya yarating\n\nconst user = { name: 'Bobur', city: 'Samarqand' };\ndisplayUser(user);\n",
      hint: "function displayUser({ name, city }) { console.log(name, city); }",
      test: "if (logs.includes('Bobur') && logs.includes('Samarqand')) return null; return 'Funksiya parametrlarida destructuring noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Massiv Destructuringda Default",
      instruction: "'coords' massivida faqat bitta element bor. Destructuring orqali birinchi va ikkinchi (default: 0) olip console.log() qiling.",
      startingCode: "const coords = [10];\n\n// Default qiymat bilan destructuring\n",
      hint: "const [x = 0, y = 0] = coords; console.log(x, y);",
      test: "if (logs.includes('10') && logs.includes('0')) return null; return 'Massiv default noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Objekt ichidagi Massiv",
      instruction: "'team' objektidagi 'members' massividan birinchi va ikkinchi nomlarni destructuring orqali olip console.log() qiling.",
      startingCode: "const team = {\n  name: 'Developers',\n  members: ['Ali', 'Bobur', 'Farhod']\n};\n\n// Nested destructuring - obekt + massiv\n",
      hint: "const { members: [first, second] } = team; console.log(first, second);",
      test: "if (logs.includes('Ali') && logs.includes('Bobur')) return null; return 'Nested massiv destructuring noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Murakkab Pattern - API Response",
      instruction: "API javobidan 'status' va 'data.message' ni destructuring orqali olip console.log() qiling.",
      startingCode: "const response = {\n  status: 'success',\n  data: { message: 'Muvaffaqiyatli', count: 10 }\n};\n\n// Murakkab destructuring\n",
      hint: "const { status, data: { message } } = response; console.log(status, message);",
      test: "if (logs.includes('success') && logs.includes('Muvaffaqiyatli')) return null; return 'Murakkab destructuring noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Barcha Patterns Birgalikda",
      instruction: "'data' objektidagi 'users' massivini destructuring qiling. Birinchi userdan 'name', ikkinchi userdan 'email', qolgan userslarni 'rest' ga saqlang.",
      startingCode: "const data = {\n  users: [\n    { name: 'Ali', email: 'ali@example.com' },\n    { name: 'Bobur', email: 'bobur@example.com' },\n    { name: 'Farhod', email: 'farhod@example.com' }\n  ]\n};\n\n// Kompleks destructuring\n",
      hint: "const { users: [{ name }, { email }, ...rest] } = data; console.log(name, email, rest.length);",
      test: "if (logs.includes('Ali') && logs.includes('bobur@example.com') && logs.includes('1')) return null; return 'Kompleks destructuring noto\\'g\\'ri';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod chop etilganda konsolga nima chiqadi?\n```javascript\nconst user = { name: 'Ali', age: 25 };\nconst { ism, age } = user;\nconsole.log(ism, age);\n```",
      options: [
        "Ali 25",
        "undefined 25",
        "ism age",
        "TypeError xatoligi"
      ],
      correctAnswer: 1,
      explanation: "Obyekt destructuring qilishda o'zgaruvchi nomlari obyekt kalitlari bilan mos kelishi kerak. `user` ichida `ism` degan kalit yo'qligi uchun `ism` o'zgaruvchisi `undefined` bo'lib qoladi."
    },
    {
      id: 2,
      question: "Obyekt destructuring qilish jarayonida kalit nomini yangi nomga (aliasing) o'zgartirish qanday amalga oshiriladi?",
      options: [
        "`const { name as ism } = user;`",
        "`const { name: ism } = user;`",
        "`const { name -> ism } = user;`",
        "`const { name = ism } = user;`"
      ],
      correctAnswer: 1,
      explanation: "Kalit nomini boshqa nomga aliasing qilish uchun `kalitNomi: yangiNom` sintaksisi ishlatiladi. Masalan: `{ name: ism }`."
    },
    {
      id: 3,
      question: "Quyidagi massiv destructuring kodining natijasi nima bo'ladi?\n```javascript\nconst colors = ['qizil', 'yashil', 'ko\\'k'];\nconst [first, , third] = colors;\nconsole.log(first, third);\n```",
      options: [
        "qizil yashil",
        "qizil ko'k",
        "qizil undefined",
        "yashil ko'k"
      ],
      correctAnswer: 1,
      explanation: "Massiv destructuringda vergullar yordamida elementlarni tashlab ketish mumkin. O'rtadagi element (yashil) tashlab ketilgani uchun `first` = 'qizil' va `third` = 'ko'k' bo'ladi."
    },
    {
      id: 4,
      question: "Obyekt destructuringda `const { name } = null;` kodi bajarilganda nima sodir bo'ladi?",
      options: [
        "`name` o'zgaruvchisi `undefined` bo'ladi",
        "`TypeError: Cannot destructure property 'name' of 'null'` xatoligi yuz beradi",
        "`name` o'zgaruvchisi `null` bo'ladi",
        "Kod hech qanday xatosiz shunchaki o'tib ketadi"
      ],
      correctAnswer: 1,
      explanation: "`null` yoki `undefined` qiymatlarini destructure qilishga urinish har doim run-time `TypeError` xatoligiga sabab bo'ladi. Xavfsiz bo'lishi uchun `null || {}` kabi default qiymat berish kerak."
    },
    {
      id: 5,
      question: "Massiv destructuring'da `const [first, ...rest] = [1, 2, 3];` kodidan keyin `rest` o'zgaruvchisi qanday qiymatga ega bo'ladi?",
      options: [
        "`2`",
        "`[2, 3]`",
        "`[1, 2, 3]`",
        "`undefined`"
      ],
      correctAnswer: 1,
      explanation: "`...rest` operatori birinchi elementdan tashqari barcha qolgan elementlarni o'z ichiga olgan yangi massiv (`[2, 3]`) yaratadi."
    },
    {
      id: 6,
      question: "Quyidagi kodda `renamed` o'zgaruvchisi qanday qiymatga ega bo'ladi?\n```javascript\nconst obj = { a: { b: 42 } };\nconst { a: { b: renamed } } = obj;\n```",
      options: [
        "`{ b: 42 }`",
        "`42`",
        "`undefined`",
        "`ReferenceError` xatosi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Bu nested (ichma-ich) destructuring hisoblanadi. `a` obyektining ichidagi `b` kalitining qiymati (42) `renamed` o'zgaruvchisiga o'zlashtiriladi."
    },
    {
      id: 7,
      question: "Massiv destructuringda `const [x = 5, y = 10] = [1];` kodidan so'ng `x` va `y` qiymatlari nima bo'ladi?",
      options: [
        "`x = 5, y = 10`",
        "`x = 1, y = 10`",
        "`x = 1, y = undefined`",
        "`x = 1, y = 5`"
      ],
      correctAnswer: 1,
      explanation: "Massivda birinchi element uchun 1 qiymati berilganligi sababli `x` ga 1 yoziladi. Ikkinchi element yo'qligi uchun `y` o'zining default qiymatini (10) saqlab qoladi."
    },
    {
      id: 8,
      question: "String turidagi ma'lumotni massiv kabi destructure qilsak (`const [a, b] = 'JS';`), `a` va `b` o'zgaruvchilari qiymati nima bo'ladi?",
      options: [
        "`a = 'JS', b = undefined`",
        "`a = 'J', b = 'S'`",
        "TypeError xatoligi",
        "`a = undefined, b = undefined`"
      ],
      correctAnswer: 1,
      explanation: "String iterativ ma'lumot turi hisoblanadi va massiv destructuring yordamida uning alohida harflarini massiv elementlaridek olish mumkin: `a` ga birinchi harf ('J'), `b` ga ikkinchisi ('S') o'tadi."
    },
    {
      id: 9,
      question: "Nima uchun funksiya parametrida `function greet({ name = 'Guest' } = {})` ko'rinishida oxirida `= {}` (default obyekt) beriladi?",
      options: [
        "Faqat CSS-ga moslashish uchun",
        "Funksiya argumentlarsiz chaqirilganda (`greet()`), `null` yoki `undefined`ni destructure qilishga urinib xato bermasligi uchun",
        "Bu JavaScript-ning majburiy sintaksisi, yozmaslik xato",
        "Parametrlar sonini cheklash uchun"
      ],
      correctAnswer: 1,
      explanation: "Agar `= {}` default qiymati berilmasa va biz funksiyani `greet()` shaklida chaqirsak, JS implicit tarzda `undefined`ni destructure qilishga urinadi va `TypeError` tashlaydi. Bo'sh obyekt berish bu xatolikning oldini oladi."
    },
    {
      id: 10,
      question: "Quyidagi kodda `rest` o'zgaruvchisining qiymati nima bo'ladi?\n```javascript\nconst { x, ...rest } = { x: 1, y: 2, z: 3 };\n```",
      options: [
        "`[2, 3]` (massiv)",
        "`{ y: 2, z: 3 }` (obyekt)",
        "`undefined`",
        "`3` (oxirgi element)"
      ],
      correctAnswer: 1,
      explanation: "Obyekt destructuringda ishlatilgan rest `...` operatori ko'rsatilmagan barcha qolgan kalitlarni o'z ichiga olgan yangi obyekt yaratadi."
    },
    {
      id: 11,
      question: "Massiv destructuring jarayonida quyidagi kod nima uchun xato (SyntaxError) beradi?\n```javascript\nconst [ ...rest, last ] = [1, 2, 3];\n```",
      options: [
        "Massivda 3 ta element bo'lmaganligi uchun",
        "Rest `...` operatori har doim eng oxirida turishi shartligi uchun",
        "O'zgaruvchi nomlari noto'g'riligi uchun",
        "Vergullar noto'g'ri qo'yilgani uchun"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da rest (`...`) operatorining maqsadi - qolgan barcha ma'lumotlarni o'zida yig'ishdir, shuning uchun undan keyin boshqa o'zgaruvchi kelishi mantiqan va sintaktik jihatdan taqiqlanadi ( SyntaxError)."
    },
    {
      id: 12,
      question: "Massiv ichidagi obyektlar ustida tsikl aylanayotganda destructuring-dan qanday foydalaniladi?",
      options: [
        "Uni faqat ifoda sifatida tsikldan oldin ishlatish mumkin",
        "Tsikl boshida to'g'ridan-to'g'ri elementlarni ochish orqali, masalan: `for (const { id, name } of users)`",
        "Buning imkoni yo'q, faqat oddiy o'zgaruvchi ishlatiladi",
        "Faqat switch bloki ichida ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da tsikl shartida (misol: `for...of` yoki callbacklarda) to'g'ridan-to'g'ri obyektdan kerakli xususiyatlarni destructure qilib olish o'ta qulay va keng tarqalgan uslubdir."
    }
  ]
};
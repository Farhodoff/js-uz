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

Obyektda **kalitning nomi** muhim:
\`\`\`javascript
const car = { model: "BYD", year: 2024, color: "oq" };

// Kalitlarni o'zgaruvchilarga chiqarish:
const { model, year, color } = car;
console.log(model);  // "BYD"
console.log(year);   // 2024
\`\`\`

**Muhim:** Chiqarilgan o'zgaruvchilar nomi kalit nomi bilan bir xil bo'lishi kerak.

### B. Aliasing (Nomni o'zgartirish)

Agar kalitning nomi siz xohlaydigan o'zgaruvchi nomiga mos kelmasa:
\`\`\`javascript
const car = { model: "BYD", year: 2024 };

// model -> marka, year -> yil
const { model: marka, year: yil } = car;
console.log(marka);  // "BYD"
console.log(yil);    // 2024
\`\`\`

### C. Default Qiymatlar

Agar kaliti yo'q bo'lsa, default qiymat ishlatiladi:
\`\`\`javascript
const user = { name: "Ali" };

const { name, age = 25, city = "Toshkent" } = user;
console.log(name);   // "Ali"
console.log(age);    // 25 (default)
console.log(city);   // "Toshkent" (default)
\`\`\`

### D. Ichma-ich Objektlarni Destructure Qilish (Nested)

Agar barcha ma'lumot ichma-ich bo'lsa:
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

Biror elementni tashlab, boshqasini olish:
\`\`\`javascript
const fruits = ["olma", "apelsin", "banan"];

// Ikkinchisini tashlab:
const [first, , third] = fruits;
console.log(first);  // "olma"
console.log(third);  // "banan"
\`\`\`

### G. Rest Operatori (...) - Qolganlarini olish

Qolgan hamma elementlarni bir o'zgaruvchiga saqlash:
\`\`\`javascript
const raqamlar = [1, 2, 3, 4, 5];
const [first, second, ...rest] = raqamlar;

console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5]
\`\`\`

### H. Funksiya Parametrlarida Destructuring

Funksiyaga yuborish vaqtida destructuring:
\`\`\`javascript
// Eski usul:
function greet(user) {
  console.log(user.name + " " + user.city);
}

// Destructuring orqali:
function greet({ name, city }) {
  console.log(name + " " + city);
}

greet({ name: "Ali", city: "Toshkent" }); // "Ali Toshkent"
\`\`\`

### I. Qiymatlarni Almashtirish (Swap)

Uchinchi o'zgaruvchisiz ikki qiymatni almashtirish:
\`\`\`javascript
let a = 5;
let b = 10;

[a, b] = [b, a];
console.log(a); // 10
console.log(b); // 5
\`\`\`

### J. Default Qiymatlar Massivda

\`\`\`javascript
const [x = 1, y = 2] = [7];
console.log(x); // 7 (berilgan)
console.log(y); // 2 (default)
\`\`\`

### K. Renaming Aliasing bilan (Massivda)

Massivda index nomlari shunaqa - shunday masala bo'lmaydi, lekin destructuring orqali elementlarga nom berish:
\`\`\`javascript
const coordinates = [10, 20];
const [x, y] = coordinates;
// Yoki more specifically with conversion:
const [width = 0, height = 0] = coordinates;
\`\`\`

### L. Murakkab Pattern'lar

Masalan, API dan kelgan javobni destructuring:
\`\`\`javascript
const apiResponse = {
  status: "success",
  data: {
    users: [
      { id: 1, name: "Ali" },
      { id: 2, name: "Bobur" }
    ]
  }
};

// Murakkab destructuring:
const { status, data: { users: [{ name: firstName }, { name: secondName }] } } = apiResponse;
console.log(firstName);  // "Ali"
console.log(secondName); // "Bobur"
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Noto'g'ri qavslar:** Obyekt uchun \`{ }\`, massiv uchun \`[ ]\` ishlatishni unutmang.
   \`\`\`javascript
   // XATO:
   const [name, age] = user; // user obekt, massiv emas

   // TO'G'RI:
   const { name, age } = user;
   \`\`\`

2. **Null/Undefined:** Agar o'zgaruvchi \`null\` bo'lsa, uni destructure qilib bo'lmaydi:
   \`\`\`javascript
   // XATO:
   const { name } = null; // TypeError!

   // TO'G'RI:
   const { name = "Noma'lum" } = null || {}; // Tekshirib olish kerak
   \`\`\`

3. **Kalit nomi bilan taqqoslash:** Massiv destructuringda kalit nomi natijaviy ahamiyatsiz:
   \`\`\`javascript
   const [name] = { name: "Ali" }; // undefined
   \`\`\`

4. **Rest operatori qo'l-qo'lag'ida:** Rest faqat oxirida bo'lishi mumkin:
   \`\`\`javascript
   // XATO:
   const [...rest, last] = [1, 2, 3]; // SyntaxError!

   // TO'G'RI:
   const [first, ...rest] = [1, 2, 3];
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Destructuring nima?</summary>
Obyekt yoki massiv ichidagi qiymatlarni bittalab olish o'rniga, ularni "bir urinishda" alohida o'zgaruvchilarga chiqarib olish usulidir.
</details>

<details>
<summary>2. Obyekt destructuringda kalitlar nomi bir xil bo'lishi shartmi?</summary>
Ha, kalit nomi destructuring da o'zgaruvchi nomi bilan bir xil bo'lishi kerak. Agar boshqacha nom xoxlansa, aliasing ishlatiladi.
</details>

<details>
<summary>3. O'zgaruvchi nomini aliasing orqali qanday o'zgartirsa bo'ladi?</summary>
Qavslarda kalit nomidan keyin \`:\` qo'yib, yangi nom yoziladi. Masalan: \`{ model: marka }\`.
</details>

<details>
<summary>4. Massiv destructuringda elementlarni qanday tashlab ketsa bo'ladi?</summary>
O'sha element o'rniga bo'sh joy qoldirish. Masalan: \`[first, , third]\` da ikkinchi element tashlanadi.
</details>

<details>
<summary>5. Default qiymat berish nima uchun kerak?</summary>
Agar kaliti yo'q bo'lsa yoki undefined bo'lsa, standart qiymat ishlatiladi.
</details>

<details>
<summary>6. Funksiya parametrlarida destructuring ishlatish mumkinmi?</summary>
Ha, mutlaqo. Masalan: \`function greet({ name, age }) { ... }\`.
</details>

<details>
<summary>7. Ikki o'zgaruvchi qiymatini uchinchi o'zgaruvchisiz qanday almashtirish mumkin?</summary>
Array destructuring orqali: \`[a, b] = [b, a]\`.
</details>

<details>
<summary>8. Nested (ichma-ich) obyektlarni destructure qilish misolini keltiring.</summary>
\`const { manzil: { shahar } } = user;\` - bu \`manzil\` ichidagi \`shahar\` qiymatini chiqaradi.
</details>

<details>
<summary>9. \`const { a, b } = null\` natijasi nima bo'ladi?</summary>
TypeError beradi. Null destructure qilib bo'lmaydi. Xato oldini olish uchun: \`const { a, b } = null || {}\`.
</details>

<details>
<summary>10. Massivdan qolgan hamma elementlarni rest (...) orqali qanday olish mumkin?</summary>
\`const [first, ...rest] = [1, 2, 3, 4]\`. Rest faqat oxirida bo'lishi mumkin.
</details>

<details>
<summary>11. Obyekt destructuringda tartib muhimmi?</summary>
Yo'q, obyektda tartib muhim emas, faqat kalit nomi muhim.
</details>

<details>
<summary>12. Massiv destructuringda tartib muhimmi?</summary>
Ha, massivda tartib (index) muhim. Tartibga ko'ra o'zgaruvchilarga chiqariladi.
</details>`,
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
  ]
};

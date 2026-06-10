export const destructuring = {
  id: "destructuring",
  title: "Destructuring (Ma'lumotlarni ochish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Destructuring nima?
**Destructuring (Ma'lumotlarni ochish)** — bu massivlar yoki obyektlar ichidagi qiymatlarni tez va oson tarzda alohida o'zgaruvchilarga ajratib olish imkonini beruvchi sintaktik shakldir. Eski usulda obyekt qiymatini olish uchun nuqta (\`user.name\`) orqali har safar murojaat qilish kerak edi. Destructuring esa bu jarayonni bir qatorda bajarishga yordam beradi.

### Real hayotiy analogiya
Tasavvur qiling, sizga **sovg'a qutisi** berildi:
* **Eski usul (Bittalab olish):** Qutini ochasiz, ayiqchani olib stolga qo'yasiz. Qutini yana kavlab, koptokni olasiz va stolga qo'yasiz. Har safar qutiga qo'l solishingiz kerak.
* **Destructuring (Bir martada olish):** Qutini bir ochishda barcha kerakli narsalarni (ayiqcha, koptok, shokolad) birdaniga stol ustidagi mos joylariga joylashtirib chiqasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Obyekt va Massiv Destructuring)
\`\`\`javascript
// Obyekt
const user = { name: "Ali", age: 25 };
const { name, age } = user;
console.log(name); // "Ali"

// Massiv
const coordinates = [10, 20];
const [x, y] = coordinates;
console.log(x); // 10
\`\`\`

### 2. Intermediate Example (Aliasing va Default Qiymatlar)
\`\`\`javascript
const car = { model: "BYD", year: 2024 };

// model kalitini 'marka' deb qayta nomlaymiz va yo'q rang kalitiga default qiymat beramiz
const { model: marka, color: rang = "oq" } = car;
console.log(marka); // "BYD"
console.log(rang);  // "oq"
\`\`\`

### 3. Advanced Example (Nested va Rest/Spread bilan ishlash)
\`\`\`javascript
const company = {
  title: "TechCo",
  details: {
    employees: 150,
    city: "Tashkent"
  }
};

const { title, details: { city, employees }, ...rest } = company;
console.log(city); // "Tashkent"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Pattern Matching (Andoza mosligi)
JavaScript destructuring sintaksisini ko'rganda, o'ng tomondagi qiymatni chap tomondagi andoza (pattern) bilan solishtiradi.
* **Obyektlarda:** Kalit nomlariga qarab moslashtiradi. Tartib ahamiyatsiz.
* **Massivlarda:** Elementlarning tartibiga (indeksiga) qarab moslashtiradi. Tartib o'ta muhim.

Agar o'ng tomondagi qiymat \`null\` yoki \`undefined\` bo'lsa, JS xatolik (\`TypeError\`) tashlaydi, chunki ularni obyekt yoki massiv sifatida ochib bo'lmaydi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Foydalanuvchi profilini qayta ishlash
Keling, API-dan kelgan foydalanuvchi ma'lumotlarini qulay tarzda ajratib olamiz.

#### Kodu:
\`\`\`javascript
const apiUser = {
  username: "farhod12",
  personalInfo: {
    fullName: "Farhod",
    age: 28
  },
  roles: ["admin", "editor"]
};

// Destructuring yordamida ajratish
const {
  username,
  personalInfo: { fullName, age },
  roles: [primaryRole, secondaryRole = "user"]
} = apiUser;

console.log(fullName);      // "Farhod"
console.log(primaryRole);  // "admin"
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Null/Undefined qiymatlarni ochish
* **Noto'g'ri:**
  \`\`\`javascript
  const user = null;
  const { name } = user; // TypeError!
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const user = null;
  const { name } = user || {}; // Xatoliksiz undefined qaytaradi
  \`\`\`

### 2. Noto'g'ri qavslar ishlatish
Obyekt uchun jingalak qavs \`{ }\`, massiv uchun kvadrat qavs \`[ ]\` ishlatish kerak.
* **Noto'g'ri:**
  \`\`\`javascript
  const user = { name: "Ali" };
  const [name] = user; // TypeError!
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Sintaksis | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`const { a, b } = obj\` | Obyekt kalitlarini o'zgaruvchiga olish | \`const { name } = user\` |
| \`const { a: newName } = obj\` | Kalitni boshqa nom bilan olish | \`const { title: sarlavha } = book\` |
| \`const [first, , third] = arr\` | Elementlarni tashlab ketib olish | \`const [x, , z] = coords\` |
| \`const { x, ...rest } = obj\` | Qolgan barcha qiymatlarni obyektga yig'ish | \`const { a, ...others } = data\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Destructuring orqali ikki o'zgaruvchi qiymatini qanday almashtirish (swap) mumkin?
Massiv destructuring yordamida: \`[a, b] = [b, a]\`. Bu qo'shimcha vaqtinchalik o'zgaruvchisiz qiymatlarni almashtiradi.

### 2. Funksiya parametrlarida destructuring nima uchun ishlatiladi?
Uzatilgan obyekt argumentlarini funksiya tanasiga kirmasdan, parametr darajasida toza ochib olish uchun juda qulay.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Obyekt va massiv destructuring o'rtasidagi farq nima?
2. Qaysi hollarda destructuring run-time xatolikka sabab bo'ladi?
3. Aliasing nima va u qachon kerak bo'ladi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi mashqlarni bajarib, destructuring mavzusini amalda sinab ko'ring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Oddiy Obyekt Destructuring",
    "instruction": "'user' obyektidan 'name' va 'age' ni destructuring orqali chiqarib, ularni 'name' va 'age' nomli o'zgaruvchilarga o'zlashtiring.",
    "startingCode": "const user = { name: 'Ali', age: 25, city: 'Tashkent' };\n\n// Kodni shu yerda yozing\n",
    "hint": "const { name, age } = user;",
    "test": "if (!code.includes('const {') || !code.includes('name') || !code.includes('age')) return 'Destructuring sintaksisi to\\'g\\'ri ishlatilmadi';\nconst sandbox = new Function('user', code + '; return {name, age};');\nconst res = sandbox({ name: 'Ali', age: 25 });\nif (res.name === 'Ali' && res.age === 25) return null;\nreturn 'O\\'zgaruvchilar qiymati noto\\'g\\'ri';"
  },
  {
    "id": 2,
    "title": "Massiv Destructuring va Elementni Tashlab Ketish",
    "instruction": "'colors' massividan birinchi va uchinchi elementlarni destructuring yordamida 'first' va 'third' o'zgaruvchilariga o'zlashtiring.",
    "startingCode": "const colors = ['red', 'green', 'blue', 'yellow'];\n\n// Kodni shu yerda yozing\n",
    "hint": "const [first, , third] = colors;",
    "test": "if (!code.includes('[') || !code.includes('first') || !code.includes('third')) return 'Massiv destructuring ishlatilmadi';\nconst sandbox = new Function('colors', code + '; return {first, third};');\nconst res = sandbox(['red', 'green', 'blue', 'yellow']);\nif (res.first === 'red' && res.third === 'blue') return null;\nreturn 'Qiymatlar mos kelmadi';"
  },
  {
    "id": 3,
    "title": "Aliasing (Qayta Nomlash)",
    "instruction": "'car' obyektidagi 'model' kalitini destructuring yordamida 'marka' nomli o'zgaruvchiga o'zlashtiring.",
    "startingCode": "const car = { model: 'BYD', year: 2024 };\n\n// Kodni shu yerda yozing\n",
    "hint": "const { model: marka } = car;",
    "test": "if (!code.includes('model: marka')) return 'model kalitini marka o\\'zgaruvchisiga bog\\'lash (aliasing) bajarilmadi';\nconst sandbox = new Function('car', code + '; return marka;');\nconst res = sandbox({ model: 'BYD' });\nif (res === 'BYD') return null;\nreturn 'marka o\\'zgaruvchisi qiymati noto\\'g\\'ri';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Quyidagi kod chop etilganda konsolga nima chiqadi?\n```javascript\nconst user = { name: 'Ali', age: 25 };\nconst { ism, age } = user;\nconsole.log(ism, age);\n```",
    "options": [
      "Ali 25",
      "undefined 25",
      "ism age",
      "TypeError xatoligi"
    ],
    "correctAnswer": 1,
    "explanation": "Obyekt destructuring qilishda o'zgaruvchi nomlari obyekt kalitlari bilan mos kelishi kerak. `user` ichida `ism` degan kalit yo'qligi uchun `ism` o'zgaruvchisi `undefined` bo'lib qoladi."
  },
  {
    "id": 2,
    "question": "Obyekt destructuring qilish jarayonida kalit nomini yangi nomga (aliasing) o'zgartirish qanday amalga oshiriladi?",
    "options": [
      "`const { name as ism } = user;`",
      "`const { name: ism } = user;`",
      "`const { name -> ism } = user;`",
      "`const { name = ism } = user;`"
    ],
    "correctAnswer": 1,
    "explanation": "Kalit nomini boshqa nomga aliasing qilish uchun `kalitNomi: yangiNom` sintaksisi ishlatiladi. Masalan: `{ name: ism }`."
  },
  {
    "id": 3,
    "question": "Quyidagi massiv destructuring kodining natijasi nima bo'ladi?\n```javascript\nconst colors = ['qizil', 'yashil', 'ko\\'k'];\nconst [first, , third] = colors;\nconsole.log(first, third);\n```",
    "options": [
      "qizil yashil",
      "qizil ko'k",
      "qizil undefined",
      "yashil ko'k"
    ],
    "correctAnswer": 1,
    "explanation": "Massiv destructuringda vergullar yordamida elementlarni tashlab ketish mumkin. O'rtadagi element (yashil) tashlab ketilgani uchun `first` = 'qizil' va `third` = 'ko'k' bo'ladi."
  },
  {
    "id": 4,
    "question": "Obyekt destructuringda `const { name } = null;` kodi bajarilganda nima sodir bo'ladi?",
    "options": [
      "`name` o'zgaruvchisi `undefined` bo'ladi",
      "`TypeError: Cannot destructure property 'name' of 'null'` xatoligi yuz beradi",
      "`name` o'zgaruvchisi `null` bo'ladi",
      "Kod hech qanday xatosiz shunchaki o'tib ketadi"
    ],
    "correctAnswer": 1,
    "explanation": "`null` yoki `undefined` qiymatlarini destructure qilishga urinish har doim run-time `TypeError` xatoligiga sabab bo'ladi. Xavfsiz bo'lishi uchun `null || {}` kabi default qiymat berish kerak."
  },
  {
    "id": 5,
    "question": "Massiv destructuring'da `const [first, ...rest] = [1, 2, 3];` kodidan keyin `rest` o'zgaruvchisi qanday qiymatga ega bo'ladi?",
    "options": [
      "`2`",
      "`[2, 3]`",
      "`[1, 2, 3]`",
      "`undefined`"
    ],
    "correctAnswer": 1,
    "explanation": "`...rest` operatori birinchi elementdan tashqari barcha qolgan elementlarni o'z ichiga olgan yangi massiv (`[2, 3]`) yaratadi."
  },
  {
    "id": 6,
    "question": "Quyidagi kodda `renamed` o'zgaruvchisi qanday qiymatga ega bo'ladi?\n```javascript\nconst obj = { a: { b: 42 } };\nconst { a: { b: renamed } } = obj;\n```",
    "options": [
      "`{ b: 42 }`",
      "`42`",
      "`undefined`",
      "`ReferenceError` xatosi yuz beradi"
    ],
    "correctAnswer": 1,
    "explanation": "Bu nested (ichma-ich) destructuring hisoblanadi. `a` obyektining ichidagi `b` kalitining qiymati (42) `renamed` o'zgaruvchisiga o'zlashtiriladi."
  },
  {
    "id": 7,
    "question": "Massiv destructuringda `const [x = 5, y = 10] = [1];` kodidan so'ng `x` va `y` qiymatlari nima bo'ladi?",
    "options": [
      "`x = 5, y = 10`",
      "`x = 1, y = 10`",
      "`x = 1, y = undefined`",
      "`x = 1, y = 5`"
    ],
    "correctAnswer": 1,
    "explanation": "Massivda birinchi element uchun 1 qiymati berilganligi sababli `x` ga 1 yoziladi. Ikkinchi element yo'qligi uchun `y` o'zining default qiymatini (10) saqlab qoladi."
  },
  {
    "id": 8,
    "question": "String turidagi ma'lumotni massiv kabi destructure qilsak (`const [a, b] = 'JS';`), `a` va `b` o'zgaruvchilari qiymati nima bo'ladi?",
    "options": [
      "`a = 'JS', b = undefined`",
      "`a = 'J', b = 'S'`",
      "TypeError xatoligi",
      "`a = undefined, b = undefined`"
    ],
    "correctAnswer": 1,
    "explanation": "String iterativ ma'lumot turi hisoblanadi va massiv destructuring yordamida uning alohida harflarini massiv elementlaridek olish mumkin: `a` ga birinchi harf ('J'), `b` ga ikkinchisi ('S') o'tadi."
  },
  {
    "id": 9,
    "question": "Nima uchun funksiya parametrida `function greet({ name = 'Guest' } = {})` ko'rinishida oxirida `= {}` (default obyekt) beriladi?",
    "options": [
      "Faqat CSS-ga moslashish uchun",
      "Funksiya argumentlarsiz chaqirilganda (`greet()`), `null` yoki `undefined`ni destructure qilishga urinib xato bermasligi uchun",
      "Bu JavaScript-ning majburiy sintaksisi, yozmaslik xato",
      "Parametrlar sonini cheklash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Agar `= {}` default qiymati berilmasa va biz funksiyani `greet()` shaklida chaqirsak, JS implicit tarzda `undefined`ni destructure qilishga urinadi va `TypeError` tashlaydi. Bo'sh obyekt berish bu xatolikning oldini oladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kodda `rest` o'zgaruvchisining qiymati nima bo'ladi?\n```javascript\nconst { x, ...rest } = { x: 1, y: 2, z: 3 };\n```",
    "options": [
      "`[2, 3]` (massiv)",
      "`{ y: 2, z: 3 }` (obyekt)",
      "`undefined`",
      "`3` (oxirgi element)"
    ],
    "correctAnswer": 1,
    "explanation": "Obyekt destructuringda ishlatilgan rest `...` operatori ko'rsatilmagan barcha qolgan kalitlarni o'z ichiga olgan yangi obyekt yaratadi."
  },
  {
    "id": 11,
    "question": "Massiv destructuring jarayonida quyidagi kod nima uchun xato (SyntaxError) beradi?\n```javascript\nconst [ ...rest, last ] = [1, 2, 3];\n```",
    "options": [
      "Massivda 3 ta element bo'lmaganligi uchun",
      "Rest `...` operatori har doim eng oxirida turishi shartligi uchun",
      "O'zgaruvchi nomlari noto'g'riligi uchun",
      "Vergullar noto'g'ri qo'yilgani uchun"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da rest (`...`) operatorining maqsadi - qolgan barcha ma'lumotlarni o'zida yig'ishdir, shuning uchun undan keyin boshqa o'zgaruvchi kelishi mantiqan va sintaktik jihatdan taqiqlanadi (SyntaxError)."
  },
  {
    "id": 12,
    "question": "Massiv ichidagi obyektlar ustida tsikl aylanayotganda destructuring-dan qanday foydalaniladi?",
    "options": [
      "Uni faqat ifoda sifatida tsikldan oldin ishlatish mumkin",
      "Tsikl boshida to'g'ridan-to'g'ri elementlarni ochish orqali, masalan: `for (const { id, name } of users)`",
      "Buning imkoni yo'q, faqat oddiy o'zgaruvchi ishlatiladi",
      "Faqat switch bloki ichida ishlatiladi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da tsikl shartida (misol: `for...of` yoki callbacklarda) to'g'ridan-to'g'ri obyektdan kerakli xususiyatlarni destructure qilib olish o'ta qulay va keng tarqalgan uslubdir."
  }
]

};

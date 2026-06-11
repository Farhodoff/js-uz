export const spreadRest = {
  id: "spreadRest",
  title: "Spread va Rest (...) - Yoyish va Yig'ish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Spread va Rest (...) nima?
JavaScriptda uchta nuqta (\`...\`) sintaksisi ishlatiladigan joyiga qarab ikki xil vazifani bajaradi:
* **Spread (Yoyish):** Massiv yoki obyekt ichidagi elementlarni "yoyib", alohida-alohida qiymatlar ko'rinishida ochib beradi.
* **Rest (Yig'ish):** Alohida qiymatlar yoki funksiya argumentlarini bitta butun massivga "yig'ib" beradi.

### Real hayotiy analogiya
* **Spread (Yoyish):** Bu xuddi sumkaning ichidagi barcha buyumlarni stol ustiga to'kib yuborishga o'xshaydi. Hamma narsa yoyilib, alohida bo'lib qoladi.
* **Rest (Yig'ish):** Bu esa stol ustida sochilib yotgan narsalarni bitta qutiga solib, og'zini yopib qo'yishga o'xshaydi. Hamma narsa bir joyga jamlanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Massiv va Obyektlarni Birlashtirish - Spread)
\`\`\`javascript
// Massivlarni birlashtirish
const fruits = ["olma", "anor"];
const allFruits = ["behi", ...fruits, "uzum"];
console.log(allFruits); // ["behi", "olma", "anor", "uzum"]

// Obyektlarni birlashtirish
const user = { name: "Ali" };
const userWithCity = { ...user, city: "Tashkent" };
console.log(userWithCity); // { name: "Ali", city: "Tashkent" }
\`\`\`

### 2. Intermediate Example (Math metodlari va Shallow Copy)
\`\`\`javascript
const numbers = [10, 45, 2, 89];
// Math.max massiv qabul qilmaydi, uni spread yordamida yoyamiz:
console.log(Math.max(...numbers)); // 89

// Obyekt nusxasini olish (Shallow Copy)
const original = { x: 1, y: 2 };
const copy = { ...original };
copy.x = 99;
console.log(original.x); // 1 (asli o'zgarmadi)
\`\`\`

### 3. Advanced Example (Funksiya argumentlarini yig'ish - Rest)
\`\`\`javascript
// Cheksiz ko'p argumentlarni massivga yig'uvchi funksiya
function sumAll(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Shallow Copy va Iterable protokoli
* **Massivlarda:** Spread operatori \`Symbol.iterator\` protokolidan foydalanadi. U massivni aylanib chiqib elementlarni ketma-ket yoyadi. Shu sababli, \`[...null]\` yozish xatolikka olib keladi, chunki \`null\` iterable emas.
* **Obyektlarda:** Spread operatori obyektning o'ziga tegishli va o'qilishi mumkin bo'lgan (\`enumerable properties\`) kalitlarini nusxalaydi. \`{ ...null }\` yozilganda xatolik yuz bermaydi, shunchaki e'tiborsiz qoldiriladi va bo'sh obyekt qaytadi.

> [!IMPORTANT]
> Spread operatori har doim **shallow copy** (sayoz nusxa) yaratadi. Agar obyektingiz ichida boshqa obyekt yoki massiv bo'lsa, ularning faqat xotiradagi manzili (reference) ko'chiriladi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Obyektlarni Override qilish (Ustidan yozish)
Foydalanuvchi ma'lumotlarini yangilash jarayonini xavfsiz (immutable) bajarish:

\`\`\`javascript
const defaultSettings = {
  theme: "light",
  notifications: true,
  volume: 80
};

const userSettings = {
  theme: "dark",
  volume: 50
};

// Spread yordamida default sozlamalarni yangilari bilan birlashtiramiz
const finalSettings = {
  ...defaultSettings,
  ...userSettings // Bu default settings ustidan yozadi
};

console.log(finalSettings.theme);  // "dark"
console.log(finalSettings.notifications); // true
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Rest parametrini noto'g'ri joylashtirish
Rest parametri har doim parametrlar ro'yxatining oxirida kelishi shart.
* **Noto'g'ri:**
  \`\`\`javascript
  function process(...args, last) {} // SyntaxError
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  function process(first, ...args) {}
  \`\`\`

### 2. Shallow copy tufayli ma'lumotlarni buzib qo'yish
* **Noto'g'ri:**
  \`\`\`javascript
  const user = { name: "Ali", address: { city: "Tashkent" } };
  const copy = { ...user };
  copy.address.city = "Samarkand"; // Original ham o'zgarib ketadi!
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Sintaksis | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`[...arr]\` | Massivni yoyish / nusxalash | \`const copy = [...items]\` |
| \`{ ...obj }\` | Obyektni yoyish / nusxalash | \`const copy = { ...user }\` |
| \`function f(...args)\` | Barcha argumentlarni massivga yig'ish | \`function run(...params) {}\` |
| \`const [first, ...rest]\` | Qolgan elementlarni yig'ib olish | \`const [head, ...tail] = list\` |

---

## 7. ❓ Savollar va Javoblar

### 1. \`arguments\` obyekti va Rest parametri o'rtasidagi farq nima?
\`arguments\` bu massivga o'xshash obyekt (undada massiv metodlari yo'q). Rest parametri esa haqiqiy \`Array\` hisoblanadi va unda barcha massiv metodlari ishlaydi.

### 2. Obyekt spread-da kalitlar nomi takrorlansa nima bo'ladi?
Oxirgi (o'ngda) kelgan kalit qiymati undan oldin kelgan bir xil nomli kalit qiymatining ustidan yozadi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qachon \`...\` spread, qachon rest hisoblanadi?
2. \`[...null]\` nima uchun TypeError tashlaydi?
3. Obyektni spread yordamida nusxalash to'liq xavfsizmi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar yordamida spread va rest operatorlarini qo'llashni mustahkamlang.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Massivlarni birlashtirish (Spread)",
      instruction: "Spread yordamida 'arr1' va 'arr2'ni 'combined' massiviga birlashtiring.",
      startingCode: "const arr1 = [1, 2];\nconst arr2 = [3, 4];\n// Bu yerga yozing\nconst combined = [];\nconsole.log(combined);",
      hint: "const combined = [...arr1, ...arr2];",
      test: "if (combined.length === 4 && combined[3] === 4) return null; return 'Massivlar birlashmadi';"
    },
    {
      id: 2,
      title: "2️⃣ Obyektdan nusxa olish (Spread)",
      instruction: "'user' obyektidan spread orqali 'copyUser' nomli nusxa oling va unga 'yosh: 25' xususiyatini qo'shing.",
      startingCode: "const user = { ism: 'Ali' };\n// Bu yerga yozing\nconst copyUser = {};\nconsole.log(copyUser);",
      hint: "const copyUser = { ...user, yosh: 25 };",
      test: "if (copyUser.ism === 'Ali' && copyUser.yosh === 25) return null; return 'Obyekt to\\'g\\'ri nusxalanmadi';"
    },
    {
      id: 3,
      title: "3️⃣ Stringni yoyish (Spread)",
      instruction: "'HELLO' so'zini harflar massiviga aylantiring.",
      startingCode: "const word = 'HELLO';\n// Bu yerga yozing\nconst letters = [];\nconsole.log(letters);",
      hint: "const letters = [...word];",
      test: "if (letters.length === 5 && letters[0] === 'H') return null; return 'String to\\'g\\'ri yoyilmadi';"
    },
    {
      id: 4,
      title: "4️⃣ Parametrlarni yig'ish (Rest)",
      instruction: "x, y va qolgan barcha argumentlarni yig'ib massiv qilib qaytaradigan 'getRest' funksiyasini yozing.",
      startingCode: "function getRest(x, y, /* rest parametr */) {\n  // Bu yerga yozing\n  return [];\n}\nconsole.log(getRest(1, 2, 3, 4, 5));",
      hint: "function getRest(x, y, ...args) { return args; }",
      test: "if (typeof getRest === 'function' && getRest(1,2,3,4).length === 2) return null; return 'Rest parametr to\\'g\\'ri ishlatilmadi';"
    },
    {
      id: 5,
      title: "5️⃣ Math metodlarida Spread",
      instruction: "'numbers' massivi ichidagi eng kichik sonni topish uchun Math.min() da spread ishlating.",
      startingCode: "const numbers = [45, 12, 89, 5];\n// Bu yerga yozing\nconst min = 0;\nconsole.log(min);",
      hint: "const min = Math.min(...numbers);",
      test: "if (min === 5) return null; return 'Eng kichik son topilmadi';"
    },
    {
      id: 6,
      title: "6️⃣ Obyektlarni birlashtirish (Merge)",
      instruction: "'obj1' va 'obj2' ni spread orqali birlashtirib 'merged' obyektini yarating.",
      startingCode: "const obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\n// Bu yerga yozing\nconst merged = {};\nconsole.log(merged);",
      hint: "const merged = { ...obj1, ...obj2 };",
      test: "if (merged.a === 1 && merged.d === 4) return null; return 'Obyektlar birlashmadi';"
    },
    {
      id: 7,
      title: "7️⃣ Massivdan Mustaqil Nusxa olish",
      instruction: "originalArray dan butunlay mustaqil bo'lgan yangi nusxa (newArray) yarating, shunda original o'zgarmasin.",
      startingCode: "const originalArray = [10, 20, 30];\n// Bu yerga yozing\nconst newArray = [];\nnewArray[0] = 99;\nconsole.log(originalArray[0], newArray[0]);",
      hint: "const newArray = [...originalArray];",
      test: "if (newArray[0] === 99 && originalArray[0] === 10) return null; return 'Mustaqil nusxa olinmadi';"
    },
    {
      id: 8,
      title: "8️⃣ Obyekt qiymatini ustidan yozish (Override)",
      instruction: "user obyektidan nusxa oling, lekin 'ism' ni 'Bobur' ga o'zgartiring.",
      startingCode: "const user = { ism: 'Ali', email: 'ali@bk.ru' };\n// Bu yerga yozing\nconst newUser = {};\nconsole.log(newUser);",
      hint: "const newUser = { ...user, ism: 'Bobur' };",
      test: "if (newUser.ism === 'Bobur' && newUser.email === 'ali@bk.ru') return null; return 'Override noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "9️⃣ Massiv destructuring bilan Rest",
      instruction: "Destructuring qilib 'birinchi' ga massiv boshini, 'qolganlar' o'zgaruvchisiga qolgan hammasini massiv qilib saqlang.",
      startingCode: "const nums = [10, 20, 30, 40];\n// Bu yerga yozing\n\nconsole.log(birinchi, qolganlar);",
      hint: "const [birinchi, ...qolganlar] = nums;",
      test: "if (birinchi === 10 && qolganlar.length === 3) return null; return 'Rest bilan destructuring qilinmadi';"
    },
    {
      id: 10,
      title: "🔟 Obyekt destructuring bilan Rest",
      instruction: "user obyektidan 'age' ni olib, qolgan kalitlarni 'restProps' nomli obyektga saqlang.",
      startingCode: "const user = { ism: 'Lola', age: 22, shahar: 'Navoiy' };\n// Bu yerga yozing\n\nconsole.log(age, restProps);",
      hint: "const { age, ...restProps } = user;",
      test: "if (age === 22 && restProps.shahar === 'Navoiy') return null; return 'Obyekt destructuring noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Funksiyaga argumentlarni yoyish (Spread)",
      instruction: "'info' massividagi ma'lumotlarni 'greet' funksiyasiga argument sifatida spread qilib uzating.",
      startingCode: "function greet(ism, shahar) {\n  return `${ism} ${shahar}dan`;\n}\nconst info = ['Hasan', 'Samarqand'];\n// Bu yerga yozing\nconst result = '';\nconsole.log(result);",
      hint: "const result = greet(...info);",
      test: "if (result === 'Hasan Samarqanddan') return null; return 'Spread ishlatilmadi';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Kompleks Array ichiga qo'shish",
      instruction: "Eski massivdagi ob'ektlar ro'yxati boshiga va oxiriga yangi obyekt qo'shing.",
      startingCode: "const data = [{id: 2}, {id: 3}];\n// Bu yerga yozing: result = [ {id: 1}, ...data, {id: 4} ]\nconst result = [];\nconsole.log(result);",
      hint: "const result = [{id: 1}, ...data, {id: 4}];",
      test: "if (result.length === 4 && result[0].id === 1 && result[3].id === 4) return null; return 'Kompleks spread qilinmadi';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "`Spread` va `Rest` operatorlari sintaktik jihatdan bir xil yozilsa-da, ularni qanday farqlash mumkin?",
    "options": [
      "Spread massiv/obyekt elementlarini yoyib chiqadi, Rest esa alohida qiymatlarni bitta massivga yig'adi",
      "Rest faqat sonlarni, Spread esa faqat stringlarni qabul qiladi",
      "Spread faqat Node.js da, Rest esa faqat brauzerda ishlaydi",
      "Hech qanday farqi yo'q, sinonim so'zlar"
    ],
    "correctAnswer": 0,
    "explanation": "Sintaksis bir xil bo'lsa-da, Spread ma'lumotni 'yoyadi' (tarqatadi), Rest esa kelayotgan bir nechta parametrlarni 'yig'ib' bitta massivga aylantiradi."
  },
  {
    "id": 2,
    "question": "Quyidagi funksiya parametrlaridagi rest operatoridan foydalanishda qaysi biri xato (SyntaxError) hisoblanadi?",
    "options": [
      "`function show(a, b, ...c) {}`",
      "`function show(...c) {}`",
      "`function show(a, ...b, c) {}`",
      "`function show(first, second, ...rest) {}`"
    ],
    "correctAnswer": 2,
    "explanation": "Rest operatori har doim parametrlar ro'yxatining oxirida kelishi shart. O'rtada yoki boshida (oxirida yana parametr bo'lsa) yozilishi taqiqlanadi."
  },
  {
    "id": 3,
    "question": "Quyidagi kod chop etilganda konsolga nima chiqadi?\n```javascript\nconst str = 'JS';\nconst arr = [...str];\nconsole.log(arr);\n```",
    "options": [
      "`['JS']`",
      "`['J', 'S']`",
      "`['J S']`",
      "TypeError: str is not iterable"
    ],
    "correctAnswer": 1,
    "explanation": "String turi iterable (aylanib chiqiladigan) hisoblanadi. Uni spread qilganda har bir harfi alohida element sifatida massivga yoyiladi."
  },
  {
    "id": 4,
    "question": "Spread operatori orqali obyekt yoki massivdan nusxa olinganda (shallow copy), undagi ichki (nested) obyektlar qanday nusxalanadi?",
    "options": [
      "Ulardan ham to'liq yangi nusxa olinadi (deep copy)",
      "Ular nusxalanmaydi va tashlab ketiladi",
      "Ularning faqat xotiradagi manzili (reference) nusxalanadi, natijada asl va nusxa obyektlar bitta ichki obyektga tayanadi",
      "Har doim xatolik beradi"
    ],
    "correctAnswer": 2,
    "explanation": "Spread operatori faqat birinchi darajali (shallow) nusxa oladi. Ichma-ich joylashgan obyektlar reference (xotira manzili) bo'yicha bog'lanib qoladi."
  },
  {
    "id": 5,
    "question": "`Math.max([1, 5, 2])` xato beradi (chunki massiv qabul qilmaydi). Uni to'g'ri ishlashini ta'minlash uchun qaysi variant mos keladi?",
    "options": [
      "`Math.max(...[1, 5, 2]);`",
      "`Math.max(rest[1, 5, 2]);`",
      "`Math.max([1, 5, 2].toString());`",
      "`Math.max.apply([1, 5, 2]);`"
    ],
    "correctAnswer": 0,
    "explanation": "Spread `...` operatori massivni argumentlar ro'yxatiga yoyib yuboradi: `Math.max(1, 5, 2)` ko'rinishida chaqirilishini ta'minlaydi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilganda `copy.b.c` qiymati qanday bo'ladi?\n```javascript\nconst obj = { a: 1, b: { c: 2 } };\nconst copy = { ...obj };\ncopy.b.c = 99;\n```",
    "options": [
      "`2` (chunki copy mustaqil nusxa)",
      "`99` (chunki spread sayoz nusxa (shallow copy) oladi va ichki obyekt reference bo'yicha ulashiladi)",
      "`undefined`",
      "TypeError xatoligi"
    ],
    "correctAnswer": 1,
    "explanation": "Spread operatori faqat yuza (birinchi darajali) xususiyatlarni nusxalaydi. Ichki obyektlar reference bo'yicha ko'chirilgani uchun, `copy.b` va `obj.b` bitta xotira manziliga ishora qiladi va biri o'zgartirilsa, ikkinchisi ham o'zgaradi."
  },
  {
    "id": 7,
    "question": "Obyektlarni spread operatori bilan birlashtirganda kalit nomlari takrorlansa nima sodir bo'ladi?\n```javascript\nconst combined = { name: 'Ali', ...{ name: 'Vali', age: 20 } };\n```",
    "options": [
      "Xatolik yuz beradi (Duplicate key error)",
      "`name` qiymati 'Ali' bo'lib qoladi",
      "`name` qiymati 'Vali' bo'ladi (chunki keyingi kelgan obyekt qiymati avvalgisini ustidan yozib yuboradi)",
      "Obyektdagi `name` kaliti massivga aylanadi: `['Ali', 'Vali']`"
    ],
    "correctAnswer": 2,
    "explanation": "Obyektlarni birlashtirganda, o'ngda (keyinroq) yozilgan xususiyatlar chapdagi (avvalroq) xususiyatlarning ustidan yozib yuboriladi (override)."
  },
  {
    "id": 8,
    "question": "Quyidagi koddan keyin `arr` o'zgaruvchisining qiymati nima bo'ladi?\n```javascript\nconst arr = [...'abc'];\n```",
    "options": [
      "`['abc']`",
      "`['a', 'b', 'c']`",
      "`'abc'`",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "String iterable bo'lgani sababli, massiv spread operatori uni har bir belgilarini alohida massiv elementlari sifatida yoyib yuboradi."
  },
  {
    "id": 9,
    "question": "Quyidagi funksiya parametrlaridan qaysi biri to'g'ri e'lon qilingan va sintaktik jihatdan xato emas?",
    "options": [
      "`function myFunc(...a, b) {}`",
      "`function myFunc(a, ...b, c) {}`",
      "`function myFunc(a, b, ...c) {}` (rest parametr eng oxirida kelgan)",
      "`function myFunc(...a, ...b) {}`"
    ],
    "correctAnswer": 2,
    "explanation": "Rest parametri har doim funksiya parametrlari ro'yxatida faqat eng oxirida bitta bo'lib kelishi shart. O'rtada yoki bir nechta rest bo'lishi taqiqlanadi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod bajarilganda qanday natija hosil bo'ladi?\n```javascript\nconst arr = [...[1, 2], ...[3, 4]];\nconsole.log(arr.length);\n```",
    "options": [
      "`2`",
      "`4` (chunki ikkita massiv yoyilib birlashtirilmoqda)",
      "`8`",
      "TypeError xatosi"
    ],
    "correctAnswer": 1,
    "explanation": "`...[1, 2]` yoyilib `1, 2` bo'ladi, `...[3, 4]` esa `3, 4` bo'ladi. Birlashganda `[1, 2, 3, 4]` hosil bo'ladi va uning uzunligi 4 ga teng."
  },
  {
    "id": 11,
    "question": "Funksiya ichidagi `arguments` obyekti va Rest parametri `...args` o'rtasidagi asosiy farq nima?",
    "options": [
      "`arguments` har doim tezroq ishlaydi",
      "`args` haqiqiy Array (massiv) turi hisoblanadi va unda massiv metodlari bor, `arguments` esa massivga o'xshash obyekt bo'lib, metodlar yo'q",
      "Hech qanday farqi yo'q",
      "`arguments` faqat arrow funksiyalarda ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "arguments obyekti massivga o'xshaydi (array-like), lekin unda map, reduce kabi massiv metodlari mavjud emas. Rest parametri bilan yig'ilgan o'zgaruvchi esa to'liq Array obyekti hisoblanadi."
  },
  {
    "id": 12,
    "question": "JavaScript-da massiv ichida `[...null]` va obyekt ichida `{ ...null }` yozilganda nima sodir bo'ladi?",
    "options": [
      "Ikkalasida ham TypeError xatosi yuz beradi",
      "Ikkalasida ham bo'sh massiv/obyekt qaytari, xato bermaydi",
      "Massiv spreadda TypeError beradi, obyekt spreadda esa xatosiz bo'sh obyekt `{}` qaytaradi",
      "Massivda bo'sh massiv, obyektda xato beradi"
    ],
    "correctAnswer": 2,
    "explanation": "Massiv spread operatori (`[...]`) faqat iterable (aylanib chiqiladigan) obyektlar ustida ishlaydi (null iterable emas, shuning uchun TypeError). Obyekt spread operatori (`{...}`) esa obyektning xususiyatlarini yoyadi va u null/undefined qiymatlarni shunchaki e'tiborsiz qoldiradi (xato chiqmaydi, bo'sh obyekt qaytadi)."
  }
]

};

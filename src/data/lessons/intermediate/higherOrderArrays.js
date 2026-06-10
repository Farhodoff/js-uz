export const higherOrderArrays = {
  id: "higherOrderArrays",
  title: "Massiv Metodlari (Chuqur O'rganish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Massiv Helper Metodlari nima?
**Massiv Helper Metodlari (Higher-Order Array Methods)** — bu massivlar ustida turli xil operatsiyalarni (saralash, qidirish, o'zgartirish va yig'ish) sikllarsiz (\`for\` yoki \`while\`) va osonroq bajarish uchun xizmat qiladigan o'rnatilgan JavaScript funksiyalaridir. Ular callback funksiyalarni qabul qiladi.

### Real hayotiy analogiya
Tasavvur qiling, sizda **maktab o'quvchilari ro'yxati** bor:
* **\`map\` (Sertifikat berish):** Har bir o'quvchining ismini olib, unga moslab chiroyli tabriknoma (yangi massiv) yaratib chiqasiz.
* **\`filter\` (Saralash):** Ro'yxatdan faqat a'lochi o'quvchilarni ajratib olasiz.
* **\`reduce\` (Yig'indi):** Hamma o'quvchilarning imtihon ballarini qo'shib, bitta umumiy o'rtacha ballni hisoblaysiz.
* **\`find\` (Qidiruv):** Ro'yxatdan birinchi bo'lib ismi "Ali" bo'lgan o'quvchini topasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (map va filter)
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Har bir sonni 2 ga ko'paytirish (map)
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// Faqat juft sonlarni ajratish (filter)
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
\`\`\`

### 2. Intermediate Example (reduce yordamida yig'indini hisoblash)
\`\`\`javascript
const cart = [
  { name: "Telefon", price: 300 },
  { name: "G'ilof", price: 20 },
  { name: "Shisha", price: 10 }
];

// Savatchadagi umumiy summani hisoblash
const total = cart.reduce((sum, item) => sum + item.price, 0);
console.log(total); // 330
\`\`\`

### 3. Advanced Example (find, some, every va sort)
\`\`\`javascript
const users = [
  { name: "Ali", age: 25 },
  { name: "Zara", age: 17 },
  { name: "Bobur", age: 30 }
];

// Birinchi 18 yoshdan oshgan foydalanuvchini topish (find)
const adult = users.find(u => u.age > 18); // { name: "Ali", age: 25 }

// Ro'yxatda voyaga yetmaganlar bormi? (some)
const hasMinors = users.some(u => u.age < 18); // true

// Yosh bo'yicha o'sish tartibida saralash (sort)
const sorted = [...users].sort((a, b) => a.age - b.age);
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Callback Context va Declarative Programming
Ushbu metodlar **declarative (tavsiflovchi)** dasturlash uslubiga kiradi. Biz JSga massiv elementlarini qanday aylanib chiqishni (\`for\` kabi) buyurmaymiz, balki natija qanday bo'lishi kerakligini yozamiz.
* **\`map\` va \`filter\`** har doim **yangi massiv** qaytaradi (original massiv o'zgarmaydi - immutability).
* **\`reduce\`** bitta yakuniy qiymat (son, string, obyekt yoki boshqa massiv) qaytaradi. U akkumulyatordan (yig'uvchi) foydalanadi.

> [!IMPORTANT]
> \`sort()\` metodi original massivni o'zgartiradi (mutable). Original massiv saqlanib qolishi uchun spread operatoridan nusxa olish tavsiya etiladi: \`[...arr].sort()\`.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Savatchadagi tovarlar uchun Chegirma va Filtrlash
Keling, narxi 100 dan katta tovarlarga 10% chegirma beramiz va umumiy summani hisoblaymiz.

\`\`\`javascript
const products = [
  { id: 1, name: "Noutbuk", price: 1000 },
  { id: 2, name: "Klaviatura", price: 80 },
  { id: 3, name: "Monitor", price: 200 }
];

// 1. Narxi 100 dan yuqori tovarlarni olish
const expensive = products.filter(p => p.price > 100);

// 2. Ularga 10% chegirma berish
const discounted = expensive.map(p => ({
  ...p,
  price: p.price * 0.9
}));

// 3. Chegirmali tovarlar umumiy narxini hisoblash
const grandTotal = discounted.reduce((sum, p) => sum + p.price, 0);

console.log(grandTotal); // 1080 (900 + 180)
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. \`map\` ichida \`return\` yozishni unutish (jingalak qavslar bilan)
* **Noto'g'ri:**
  \`\`\`javascript
  const squares = [1, 2].map(n => { n * n }); // [undefined, undefined]
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const squares = [1, 2].map(n => n * n);
  // Yoki:
  const squares = [1, 2].map(n => { return n * n; });
  \`\`\`

### 2. \`reduce\` metodiga boshlang'ich qiymat bermaslik
Agar boshlang'ich qiymat berilmasa, massivning birinchi elementi akkumulyator bo'lib qoladi.
* **Noto'g'ri:**
  \`\`\`javascript
  const total = [{price: 10}].reduce((sum, item) => sum + item.price); // "[object Object]"
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const total = [{price: 10}].reduce((sum, item) => sum + item.price, 0); // 10
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod | Vazifasi | Qaytaradigan Natijasi | Originalni o'zgartiradimi? |
| :--- | :--- | :--- | :--- |
| \`map\` | Har bir elementni o'zgartirish | Yangi massiv | Yo'q |
| \`filter\` | Shartga moslarini ajratish | Yangi massiv | Yo'q |
| \`reduce\` | Elementlarni bitta qiymatga yig'ish | Yagona qiymat | Yo'q |
| \`find\` | Shartga mos birinchi elementni topish | Element yoki \`undefined\` | Yo'q |
| \`some\` | Kamida bitta mos element bormi? | \`true\` / \`false\` | Yo'q |
| \`every\` | Barcha elementlar mosmi? | \`true\` / \`false\` | Yo'q |
| \`sort\` | Elementlarni tartiblash | Tartiblangan massiv | **Ha** |

---

## 7. ❓ Savollar va Javoblar

### 1. \`forEach\` va \`map\` farqi nima?
\`map\` har doim o'zgartirilgan elementlardan iborat yangi massiv qaytaradi. \`forEach\` esa shunchaki elementlarni aylanib chiqadi va hech narsa qaytarmaydi (\`undefined\`).

### 2. \`sort()\` nima uchun sonlarni noto'g'ri saralaydi? (masalan, [10, 2] ni [10, 2] ko'rinishida qoldiradi)
Chunki \`sort()\` default holatda elementlarni string (matn) deb o'ylaydi va alifbo bo'yicha saralaydi. Sonlarni to'g'ri saralash uchun taqqoslovchi funksiya uzatish kerak: \`.sort((a, b) => a - b)\`.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qaysi metodlar original massivni o'zgartiradi?
2. \`filter\` metodi shartga mos element topa olmasa nima qaytaradi? (Bo'sh massiv \`[]\`).
3. \`reduce\` qanday ishlaydi va uning callback funksiyasi qanday parametrlarni oladi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi topshiriqlarni bajarib, massiv metodlaridan foydalanish bo'yicha bilimlaringizni amalda tekshiring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Map yordamida Transformatsiya",
    "instruction": "Taqdim etilgan 'nums' massividagi har bir sonni kvadratini hisoblab, ulardan iborat yangi massiv yarating va uni 'squares' o'zgaruvchisiga saqlang. 'map' metodidan foydalaning.",
    "startingCode": "const nums = [1, 2, 3, 4];\n\n// Kodni shu yerda yozing\n",
    "hint": "const squares = nums.map(n => n * n);",
    "test": "if (!code.includes('map')) return 'map metodi ishlatilmadi';\nconst sandbox = new Function('nums', code + '; return squares;');\nconst res = sandbox([1, 2, 3, 4]);\nif (Array.isArray(res) && res[1] === 4 && res[3] === 16) return null;\nreturn 'Natija xato';"
  },
  {
    "id": 2,
    "title": "Filter yordamida Saralash",
    "instruction": "Taqdim etilgan 'users' massividan faqat yoshi 18 dan katta yoki teng bo'lgan foydalanuvchilarni ajratib oling va natijani 'adults' o'zgaruvchisiga saqlang. 'filter' metodidan foydalaning.",
    "startingCode": "const users = [\n  { name: 'Ali', age: 25 },\n  { name: 'Zara', age: 17 },\n  { name: 'Bobur', age: 18 }\n];\n\n// Kodni shu yerda yozing\n",
    "hint": "const adults = users.filter(u => u.age >= 18);",
    "test": "if (!code.includes('filter')) return 'filter metodi ishlatilmadi';\nconst sandbox = new Function('users', code + '; return adults;');\nconst res = sandbox([\n  { name: 'Ali', age: 25 },\n  { name: 'Zara', age: 17 },\n  { name: 'Bobur', age: 18 }\n]);\nif (Array.isArray(res) && res.length === 2 && res[1].name === 'Bobur') return null;\nreturn 'adults massivi noto\\'g\\'ri filtrlandi';"
  },
  {
    "id": 3,
    "title": "Reduce yordamida Yig'indi",
    "instruction": "Taqdim etilgan 'items' massividagi barcha obyektlarning 'price' qiymatlarini qo'shib, umumiy summani hisoblang va natijani 'totalPrice' o'zgaruvchisiga saqlang. 'reduce' metodidan foydalaning (boshlang'ich qiymatga 0 bering).",
    "startingCode": "const items = [\n  { name: 'Noutbuk', price: 800 },\n  { name: 'Sichqoncha', price: 20 },\n  { name: 'Klaviatura', price: 50 }\n];\n\n// Kodni shu yerda yozing\n",
    "hint": "const totalPrice = items.reduce((sum, item) => sum + item.price, 0);",
    "test": "if (!code.includes('reduce')) return 'reduce metodi ishlatilmadi';\nconst sandbox = new Function('items', code + '; return totalPrice;');\nconst res = sandbox([\n  { name: 'a', price: 10 },\n  { name: 'b', price: 20 }\n]);\nif (res === 30) return null;\nreturn 'totalPrice qiymati noto\\'g\\'ri hisoblandi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Qaysi massiv metodi callback funksiya qaytargan natijaga qarab asl massiv elementlarini o'zgartirmasdan, butunlay yangi massiv qaytaradi?",
    "options": [
      "`map`",
      "`forEach`",
      "`push`",
      "`splice`"
    ],
    "correctAnswer": 0,
    "explanation": "`map` metodi massivdagi har bir element ustida amallar bajarib, ularning natijalaridan iborat yangi massiv qaytaradi va original massivni o'zgartirmaydi."
  },
  {
    "id": 2,
    "question": "`filter` metodi callback funksiya qanday qiymat qaytarganda elementni yangi massivga qo'shadi?",
    "options": [
      "Faqat `true` (yoki truthy qiymat) qaytarganda",
      "Faqat `false` (yoki falsy qiymat) qaytarganda",
      "Faqat `1` yoki `0` qaytarganda",
      "Har qanday qiymat qaytarganda"
    ],
    "correctAnswer": 0,
    "explanation": "`filter` metodi har bir element uchun callback funksiyani chaqiradi. Agar u `true` yoki truthy qiymat qaytarsa, element natijaviy massivga kiritiladi."
  },
  {
    "id": 3,
    "question": "Quyidagi `reduce` chaqiruvining yakuniy natijasi nima bo'ladi?\n```javascript\nconst nums = [1, 2, 3];\nconst res = nums.reduce((acc, val) => acc + val, 10);\n```",
    "options": [
      "`6`",
      "`16`",
      "`10`",
      "`undefined`"
    ],
    "correctAnswer": 1,
    "explanation": "Reduce boshlang'ich qiymat sifatida 10 ni oladi. Keyin ketma-ket massiv elementlarini qo'shib boradi: 10 + 1 + 2 + 3 = 16."
  },
  {
    "id": 4,
    "question": "`find` metodi massiv ichidan shartga mos element topa olmasa nima qaytaradi?",
    "options": [
      "`null`",
      "`undefined`",
      "`-1`",
      "Bo'sh massiv `[]`"
    ],
    "correctAnswer": 1,
    "explanation": "`find` metodi shartga mos keluvchi birinchi elementni qaytaradi. Agar bunday element topilmasa, u `undefined` qaytaradi."
  },
  {
    "id": 5,
    "question": "`some` va `every` metodlari qanday turdagi (data type) natija qaytaradi?",
    "options": [
      "Yangi massiv (Array)",
      "Mantiqiy qiymat (Boolean: true yoki false)",
      "Son (Number)",
      "Obyekt (Object)"
    ],
    "correctAnswer": 1,
    "explanation": "Ikkala metod ham faqat shartning bajarilishi yoki bajarilmasligini tekshiradi va har doim `true` yoki `false` qiymat qaytaradi."
  },
  {
    "id": 6,
    "question": "Quyidagi saralash kodidan keyin original `nums` massivi qanday o'zgaradi?\n```javascript\nconst nums = [10, 2, 30];\nnums.sort();\n```",
    "options": [
      "`[2, 10, 30]` ko'rinishida to'g'ri saralanadi",
      "`[10, 2, 30]` bo'lib o'zgarishsiz qoladi",
      "`[10, 2, 30]` alifbo tartibida saralanadi, chunki default holatda elementlar string deb qaraladi",
      "TypeError xatosi chiqadi"
    ],
    "correctAnswer": 2,
    "explanation": "Default `sort()` metodida taqqoslovchi funksiya bo'lmasa, u elementlarni matnga o'tkazadi va alifbo bo'yicha solishtiradi (bu yerda '10' '2' dan oldin keladi, chunki '1' '2' dan kichik)."
  },
  {
    "id": 7,
    "question": "Faqat birinchi voyaga yetgan foydalanuvchining ismini topish uchun qaysi metodlar zanjiri to'g'ri hisoblanadi?",
    "options": [
      "`users.filter(u => u.age >= 18).map(u => u.name)[0]`",
      "`users.find(u => u.age >= 18)?.name`",
      "Ikkala variant ham to'g'ri va bir xil natija beradi, lekin keyingisi optimalroq",
      "Buning uchun faqat reduce ishlatish mumkin"
    ],
    "correctAnswer": 2,
    "explanation": "Ikkala usul ham to'g'ri ishlaydi. Biroq `find` metodi birinchi elementni topishi bilanoq ishlashni to'xtatadi va yangi massiv yaratmagani uchun optimalroqdir."
  },
  {
    "id": 8,
    "question": "Quyidagi kodda `squares` qiymati nima bo'ladi?\n```javascript\nconst squares = [1, 2].map(n => { n * n });\n```",
    "options": [
      "`[1, 4]`",
      "`[undefined, undefined]` (chunki arrow functionda jingalak qavs ochilsa, return yozilishi shart)",
      "TypeError",
      "`[]`"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalarda `{}` jingalak qavslar ochilsa, return avtomatik bo'lmaydi. Return yozilmagani uchun map natijasi undefined lardan iborat bo'ladi."
  },
  {
    "id": 9,
    "question": "`forEach` metodi haqida qaysi fikr noto'g'ri?",
    "options": [
      "U massiv elementlarini shunchaki aylanib chiqish uchun ishlatiladi",
      "U har doim yangi o'zgartirilgan massiv qaytaradi",
      "Uning ichida break yoki continue ishlatib bo'lmaydi",
      "U undefined qaytaradi"
    ],
    "correctAnswer": 1,
    "explanation": "`forEach` metodi yangi massiv qaytarmaydi (u har doim `undefined` qaytaradi). Yangi massiv olish uchun `map` ishlatilishi kerak."
  },
  {
    "id": 10,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst arr = [1, 2, 3];\nconsole.log(arr.every(n => n > 0));\n```",
    "options": [
      "`true` (chunki barcha sonlar 0 dan katta)",
      "`false`",
      "`undefined`",
      "`[1, 2, 3]`"
    ],
    "correctAnswer": 0,
    "explanation": "`every` metodi barcha elementlar shartga mos kelsa `true` qaytaradi. Massivdagi barcha elementlar (1, 2, 3) 0 dan katta bo'lgani uchun natija `true` bo'ladi."
  },
  {
    "id": 11,
    "question": "Quyidagi kodda `total` qiymati qanday hisoblanadi?\n```javascript\nconst items = [{ price: 5 }, { price: 15 }];\nconst total = items.reduce((acc, curr) => acc + curr.price, 0);\n```",
    "options": [
      "`20`",
      "`[object Object]15`",
      "`NaN`",
      "`undefined`"
    ],
    "correctAnswer": 0,
    "explanation": "Boshlang'ich qiymat 0 qilib ko'rsatilgan. Shunda 0 + 5 + 15 = 20 to'g'ri hisoblanadi."
  },
  {
    "id": 12,
    "question": "Original massivni o'zgartirmasdan saralash (sort qilish) uchun qaysi yondashuv to'g'ri?",
    "options": [
      "`arr.sort()`",
      "`const sorted = [...arr].sort((a, b) => a - b);`",
      "`const sorted = arr.map().sort();`",
      "`arr.filter().sort();`"
    ],
    "correctAnswer": 1,
    "explanation": "Spread `[...arr]` orqali massivdan yangi nusxa olinadi, so'ngra uning ustida `.sort` chaqiriladi. Bu original massiv o'zgarmasligini ta'minlaydi."
  }
]

};

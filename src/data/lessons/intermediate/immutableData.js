export const immutableData = {
  id: "immutableData",
  title: "Immutability va Deep vs Shallow Copy",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Immutability nima?
**Immutability (O'zgarmaslik)** — bu ma'lumotlar strukturasini (obyektlar va massivlarni) xotirada to'g'ridan-to'g'ri o'zgartirmaslik (mutatsiya qilmaslik) tamoyilidir. Agar ma'lumotga o'zgartirish kiritish kerak bo'lsa, asl ma'lumot saqlanib qolib, undan nusxa olinadi va o'zgartirilgan yangi nusxa yaratiladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **shartnoma yozyapsiz**:
* **Mutatsiya (Mutable - O'zgaruvchan):** Siz yozilgan qog'ozdagi shartnoma matnini ruchka bilan chizib, ustidan yangi so'zlarni yozasiz. Eskisi buziladi va aslini qayta tiklab bo'lmaydi.
* **O'zgarmaslik (Immutable - O'zgarmas):** Siz eski shartnomadan printer orqali nusxa (copy) olasiz. Yangi qog'oz nusxasiga o'zgartirish kiritasiz. Natijada sizda eski shartnoma ham asl holida, yangi shartnoma ham o'zgartirilgan holida saqlanib qoladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Shallow Copy va Mutatsiya muammosi)
\`\`\`javascript
const user = { name: "Ali", age: 25 };

// Mutatsiya (Yomon amaliyot - asl obyektni buzadi):
// user.age = 26;

// Immutable yangilash (Yaxshi amaliyot - yangi nusxa oladi):
const updatedUser = { ...user, age: 26 };

console.log(user.age);        // 25 (Asli o'zgarmadi!)
console.log(updatedUser.age); // 26 (Yangisi o'zgardi)
\`\`\`

### 2. Intermediate Example (Deep Copy - structuredClone)
Spread operatori faqat birinchi darajali nusxa oladi (Shallow Copy). Ichki obyektlarni to'liq nusxalash uchun \`structuredClone\` ishlatiladi:
\`\`\`javascript
const original = {
  name: "Ali",
  address: { city: "Tashkent" }
};

// Chuqur nusxa olish
const deepCopy = structuredClone(original);
deepCopy.address.city = "Samarkand";

console.log(original.address.city); // "Tashkent" (Asli xavfsiz!)
console.log(deepCopy.address.city); // "Samarkand"
\`\`\`

### 3. Advanced Example (Massivlarni xavfsiz o'zgarmas yangilash)
Asl massivni o'zgartiruvchi metodlar (\`push\`, \`splice\`, \`sort\`) o'rniga, yangi massiv qaytaruvchilarni ishlatish:
\`\`\`javascript
const list = [1, 2, 3];

// 1. Element qo'shish (Add)
const added = [...list, 4]; // [1, 2, 3, 4]

// 2. Element o'chirish (Remove)
const removed = list.filter(item => item !== 2); // [1, 3]

// 3. Element o'zgartirish (Update)
const updated = list.map(item => item === 3 ? 30 : item); // [1, 2, 30]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Reference vs Value (Manzil va Qiymat)
JavaScript-da primitiv turlar (Number, String, Boolean, null, undefined) qiymat bo'yicha solishtiriladi va nusxalanadi. Obyektlar va massivlar esa xotiradagi manzili (**Reference**) bo'yicha ishlaydi.
Agar siz \`const copy = original\` deb yozsangiz, yangi obyekt yaratilmaydi, shunchaki xotiradagi bitta manzilga ikkinchi ishora yaratiladi.

> [!IMPORTANT]
> \`JSON.parse(JSON.stringify(obj))\` orqali deep copy qilish funksiyalar va Date obyektlari bilan ishlashda xatoliklar beradi. Zamonaviy JavaScript-da har doim \`structuredClone()\` tavsiya etiladi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Ichma-ich joylashgan state'ni xavfsiz yangilash
React-da holatni (state) boshqarishda nested obyektni o'zgarmas yangilash:

\`\`\`javascript
const state = {
  theme: "dark",
  user: {
    name: "Farhod",
    profile: {
      score: 10
    }
  }
};

// Profil score qiymatini 15 ga o'zgarmas usulda oshiramiz
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      score: 15
    }
  }
};

console.log(state.user.profile.score);    // 10 (asli saqlandi)
console.log(newState.user.profile.score); // 15
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. \`sort()\` original massivni o'zgartirishini bilmaslik
* **Noto'g'ri:**
  \`\`\`javascript
  const numbers = [3, 1, 2];
  const sorted = numbers.sort(); // numbers ham [1, 2, 3] bo'lib o'zgarib ketdi!
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const numbers = [3, 1, 2];
  const sorted = [...numbers].sort(); // nusxa olib keyin saralash
  \`\`\`

### 2. Shallow copy yordamida nested obyektni o'zgartirish
* **Noto'g'ri:**
  \`\`\`javascript
  const copy = { ...user };
  copy.address.city = "Bukhara"; // original user.address.city ham o'zgaradi!
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Operatsiya | Mutatsiya qiluvchi (Yomon) | Immutable (Yaxshi) |
| :--- | :--- | :--- |
| Element qo'shish | \`arr.push(x)\` | \`[...arr, x]\` |
| Element o'chirish | \`arr.splice(i, 1)\` | \`arr.filter((_, idx) => idx !== i)\` |
| Element o'zgartirish | \`arr[i] = new\` | \`arr.map((val, idx) => idx === i ? new : val)\` |
| Obyekt nusxalash (Deep) | - | \`structuredClone(obj)\` |
| Muzlatish | - | \`Object.freeze(obj)\` (Shallow) |

---

## 7. ❓ Savollar va Javoblar

### 1. React-da nega o'zgarmaslik (immutability) o'ta muhim?
React holat o'zgarganini tezkor tekshirish uchun xotiradagi manzillarni solishtiradi (\`oldState === newState\`). Agar mutatsiya qilsak, manzil o'zgarmaydi va React sahifani qayta render qilmaydi.

### 2. \`Object.freeze()\` chuqur (deep) muzlatadimi?
Yo'q, u faqat sayoz (shallow) muzlatadi. Obyekt ichidagi boshqa ichki obyektlarni o'zgartirish imkoniyati saqlanib qoladi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`[1, 2] === [1, 2]\` nima uchun false qaytaradi?
2. \`structuredClone\` qaysi ma'lumot turlarini nusxalay olmaydi? (Funksiyalar va DOM elementlari).
3. Massivdan sayoz nusxa olishning 3 xil usulini ayting.

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy topshiriqlarni bajarib, immutability va nusxalash bo'yicha ko'nikmalaringizni sinab ko'ring.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Massivdan sayoz nusxa olish",
      instruction: "'original' massivining spread operatori yordamida sayoz nusxasini ('copy') yarating.",
      startingCode: "const original = [1, 2, 3];\n// Bu yerga yozing\nconst copy = [];",
      hint: "const copy = [...original];",
      test: "if (Array.isArray(copy) && copy !== original && copy.length === 3 && copy[2] === 3) return null; return 'Massiv to\\'g\\'ri nusxalanmadi yoki asli bilan bir xil reference!';"
    },
    {
      id: 2,
      title: "2️⃣ Massiv oxiriga element qo'shish",
      instruction: "'nums' massivini o'zgartirmasdan, uning oxiriga 4 sonini qo'shgan holda 'newNums' yangi massivini yarating.",
      startingCode: "const nums = [1, 2, 3];\n// Bu yerga yozing\nconst newNums = [];",
      hint: "const newNums = [...nums, 4];",
      test: "if (nums.length === 3 && newNums.length === 4 && newNums[3] === 4) return null; return 'newNums to\\'g\\'ri yaratilmadi yoki asl massiv o\\'zgartirildi!';"
    },
    {
      id: 3,
      title: "3️⃣ Massivdan elementni o'chirish (Filter)",
      instruction: "'users' massividan id si 2 bo'lgan foydalanuvchini o'chirish uchun filter metodidan foydalanib 'activeUsers' yangi massivini hosil qiling.",
      startingCode: "const users = [{ id: 1, name: 'Ali' }, { id: 2, name: 'Vali' }, { id: 3, name: 'Zara' }];\n// Bu yerga yozing\nconst activeUsers = [];",
      hint: "const activeUsers = users.filter(u => u.id !== 2);",
      test: "if (users.length === 3 && activeUsers.length === 2 && !activeUsers.some(u => u.id === 2)) return null; return 'id si 2 bo\\'lgan foydalanuvchi o\\'chirilmadi yoki asl massiv o\\'zgartirildi!';"
    },
    {
      id: 4,
      title: "4️⃣ Massiv elementini yangilash (Map)",
      instruction: "'prices' massividagi 200 qiymatini 250 ga o'zgarmas (immutable) usulda map yordamida o'zgartirib 'updatedPrices' massivini hosil qiling.",
      startingCode: "const prices = [100, 200, 300];\n// Bu yerga yozing\nconst updatedPrices = [];",
      hint: "const updatedPrices = prices.map(p => p === 200 ? 250 : p);",
      test: "if (prices[1] === 200 && updatedPrices[1] === 250) return null; return 'Narx noto\\'g\\'ri yangilandi yoki asl massiv mutatsiya qilindi!';"
    },
    {
      id: 5,
      title: "5️⃣ Object.assign yordamida sayoz nusxa",
      instruction: "'info' ob'ektining sayoz nusxasini ('infoCopy') Object.assign yordamida yarating.",
      startingCode: "const info = { age: 30, status: 'pending' };\n// Bu yerga yozing\nconst infoCopy = {};",
      hint: "const infoCopy = Object.assign({}, info);",
      test: "if (infoCopy !== info && infoCopy.age === 30 && infoCopy.status === 'pending') return null; return 'Object.assign yordamida nusxa olinmadi!';"
    },
    {
      id: 6,
      title: "6️⃣ Ichki ob'ektni o'zgarmas yangilash",
      instruction: "'state' ob'ektini mutatsiya qilmasdan, 'profile.age' qiymatini 21 ga o'zgartirgan holda 'updatedState' yangi ob'ektini hosil qiling.",
      startingCode: "const state = { username: 'farhod', profile: { age: 20, city: 'Samarkand' } };\n// Bu yerga yozing\nconst updatedState = {};",
      hint: "const updatedState = { ...state, profile: { ...state.profile, age: 21 } };",
      test: "if (state.profile.age === 20 && updatedState.profile.age === 21 && updatedState.profile.city === 'Samarkand' && state.profile !== updatedState.profile) return null; return 'Profil yoshi to\\'g\\'ri yangilanmadi yoki asl ob\\'ekt mutatsiya qilindi!';"
    },
    {
      id: 7,
      title: "7️⃣ structuredClone bilan chuqur nusxa",
      instruction: "'nestedData' ob'ektidan structuredClone yordamida chuqur nusxa ('deepCopy') oling.",
      startingCode: "const nestedData = { id: 1, meta: { tags: ['js', 'react'] } };\n// Bu yerga yozing\nconst deepCopy = {};",
      hint: "const deepCopy = structuredClone(nestedData);",
      test: "if (deepCopy !== nestedData && deepCopy.meta !== nestedData.meta && Array.isArray(deepCopy.meta.tags)) return null; return 'structuredClone yordamida chuqur nusxa yaratilmadi!';"
    },
    {
      id: 8,
      title: "8️⃣ JSON yordamida chuqur nusxa",
      instruction: "'settings' ob'ektidan JSON serialization-deserialization usuli yordamida chuqur nusxa ('settingsCopy') oling.",
      startingCode: "const settings = { theme: 'dark', options: { notifications: true } };\n// Bu yerga yozing\nconst settingsCopy = {};",
      hint: "const settingsCopy = JSON.parse(JSON.stringify(settings));",
      test: "if (settingsCopy !== settings && settingsCopy.options !== settings.options && settingsCopy.options.notifications === true) return null; return 'JSON yordamida deep copy qilinmadi!';"
    },
    {
      id: 9,
      title: "9️⃣ Massiv o'rtasiga element qo'shish",
      instruction: "'items' massivining 1-indeksiga (ya'ni 10 va 30 orasiga) 20 sonini o'zgarmas (immutable) usulda joylashtirib 'newItems' massivini hosil qiling.",
      startingCode: "const items = [10, 30, 40];\n// Bu yerga yozing\nconst newItems = [];",
      hint: "const newItems = [...items.slice(0, 1), 20, ...items.slice(1)];",
      test: "if (items.length === 3 && newItems.length === 4 && newItems[1] === 20 && newItems[2] === 30) return null; return 'Element ko\\'rsatilgan indeksga o\\'zgarmas holda joylashtirilmadi!';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ O'zgaruvchini muzlatish (freeze)",
      instruction: "'config' ob'ektini sayoz darajada o'zgarmas qilish (muzlatish) uchun Object.freeze metodidan foydalaning.",
      startingCode: "const config = { api: 'https://api.com', timeout: 5000 };\n// Bu yerga yozing\n",
      hint: "Object.freeze(config);",
      test: "if (Object.isFrozen(config)) return null; return 'config ob\\'ekti muzlatilmadi!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Massiv elementlari o'rnini almashtirish",
      instruction: "'colors' massividagi birinchi ikki elementning o'rnini o'zgarmas (immutable) usulda almashtirib 'swappedColors' massivini hosil qiling.",
      startingCode: "const colors = ['red', 'blue', 'green'];\n// Bu yerga yozing\nconst swappedColors = [];",
      hint: "const swappedColors = [colors[1], colors[0], colors[2]];",
      test: "if (colors[0] === 'red' && swappedColors[0] === 'blue' && swappedColors[1] === 'red' && swappedColors[2] === 'green') return null; return 'Elementlar o\\'rni to\\'g\\'ri almashtirilmadi!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Murakkab holatni yangilash (Complex Update)",
      instruction: "'store' ob'ektidagi 'cart' massivining 1-indeksidagi tovarning 'quantity' qiymatini 3 ga o'zgarmas usulda yangilab 'newStore' ob'ektini hosil qiling.",
      startingCode: "const store = { name: 'My Store', cart: [{ id: 101, title: 'Book', quantity: 1 }, { id: 102, title: 'Pen', quantity: 1 }] };\n// Bu yerga yozing\nconst newStore = {};",
      hint: "const newStore = { ...store, cart: store.cart.map((item, i) => i === 1 ? { ...item, quantity: 3 } : item) };",
      test: "if (store.cart[1].quantity === 1 && newStore.cart[1].quantity === 3 && store.cart !== newStore.cart && store.cart[1] !== newStore.cart[1] && store.cart[0] === newStore.cart[0]) return null; return 'Savatdagi tovar quantitysi to\\'g\\'ri o\\'zgarmadi yoki boshqa elementlar noto\\'g\\'ri nusxalandi!';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Shallow copy va Deep copy o'rtasidagi asosiy farq nima?",
    "options": [
      "Shallow copy faqat birinchi darajali xususiyatlarni nusxalaydi, Deep copy esa barcha ichma-ich joylashgan xususiyatlarni to'liq nusxalaydi",
      "Shallow copy faqat sonlarni nusxalaydi, Deep copy esa obyektlarni",
      "Shallow copy asl ob'ektni o'chirib yuboradi, Deep copy esa saqlab qoladi",
      "Ikkalasi mutlaqo bir xil ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Shallow copy (sayoz nusxa) faqat ob'ektning eng yuqori darajasini nusxalaydi. Ichki ob'ektlar xotiradagi eski manzilga bog'langan holda qoladi. Deep copy (chuqur nusxa) esa barcha ichki ob'ektlarni ham yangidan nusxalaydi."
  },
  {
    "id": 2,
    "question": "`const copy = { ...original }` kodi qanday nusxa yaratadi?",
    "options": [
      "Shallow copy (Sayoz nusxa)",
      "Deep copy (Chuqur nusxa)",
      "Hech qanday nusxa yaratmaydi, shunchaki xatolik beradi",
      "Faqat massivlar uchun deep copy yaratadi"
    ],
    "correctAnswer": 0,
    "explanation": "Spread operatori faqat birinchi darajali kalit-qiymatlarni nusxalaydi, shuning uchun u sayoz nusxa (shallow copy) hisoblanadi."
  },
  {
    "id": 3,
    "question": "JavaScript-dagi `structuredClone()` nima uchun ishlatiladi?",
    "options": [
      "Ob'ektlardan xavfsiz va to'liq chuqur nusxa (Deep copy) olish uchun",
      "Ob'ektlarni HTML elementga aylantirish uchun",
      "Ob'ekt xotirasini butunlay tozalash uchun",
      "Faqat primitiv qiymatlarni solishtirish uchun"
    ],
    "correctAnswer": 0,
    "explanation": "structuredClone JavaScript-ning zamonaviy standarti bo'lib, ob'ektlar va massivlardan chuqur (deep) nusxa olish uchun eng to'g'ri va xavfsiz usul hisoblanadi."
  },
  {
    "id": 4,
    "question": "`JSON.parse(JSON.stringify(obj))` usulining qanday kamchiligi bor?",
    "options": [
      "U funksiyalar, undefined va Date ob'ektlari kabi ma'lumot turlarini noto'g'ri o'zgartiradi yoki yo'qotadi",
      "U faqat brauzerlarda ishlaydi, Node.js da ishlamaydi",
      "U juda tez ishlaydi va ko'p xotira talab qiladi",
      "U faqat bo'sh ob'ektlarni nusxalay oladi"
    ],
    "correctAnswer": 0,
    "explanation": "JSON serialization funksiyalar, undefined va Symbol qiymatlarni tashlab yuboradi, hamda Date ob'ektlarini string formatiga o'zgartirib yuboradi."
  },
  {
    "id": 5,
    "question": "Nima uchun React-da state (holat)ni to'g'ridan-to'g'ri mutatsiya qilish (o'zgartirish) tavsiya etilmaydi?",
    "options": [
      "Chunki React o'zgarishlarni ob'ekt manzillari (references) bo'yicha tekshiradi. To'g'ridan-to'g'ri o'zgartirilganda manzil o'zgarmaydi va re-render sodir bo'lmaydi",
      "Chunki to'g'ridan-to'g'ri o'zgartirish JavaScript-da taqiqlangan",
      "Chunki bu xotirani to'ldirib yuboradi",
      "Chunki state faqat funksiyalardan iborat bo'lishi kerak"
    ],
    "correctAnswer": 0,
    "explanation": "React state o'zgarganini bilish uchun shallow reference comparison (oldState === newState) bajaradi. Agar ob'ektning o'zini o'zgartirsak, uning reference manzili o'zgarmasdan qoladi, natijada React render qilmaydi."
  },
  {
    "id": 6,
    "question": "`const arr = [1, 2]` massiviga 3 elementini o'zgarmas (immutable) usulda qo'shish uchun qaysi variant to'g'ri?",
    "options": [
      "`const newArr = [...arr, 3];`",
      "`arr.push(3);`",
      "`arr[arr.length] = 3;`",
      "`arr.unshift(3);`"
    ],
    "correctAnswer": 0,
    "explanation": "push va unshift metodlari asl massivni o'zgartiradi (mutatsiya). Spread operator yordamida yangi massiv yaratish esa immutable yangilash hisoblanadi."
  },
  {
    "id": 7,
    "question": "`Object.freeze(obj)` metodining cheklovi nimada?",
    "options": [
      "U faqat sayoz (shallow) muzlatadi, ya'ni ichki obyektlarni o'zgartirish mumkin bo'lib qoladi",
      "U faqat massivlarni muzlata oladi",
      "U ob'ekt qiymatlarini o'chirib yuboradi",
      "U asinxron ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Object.freeze faqat ob'ektning birinchi darajali xususiyatlarini muzlatadi. Agar ob'ekt ichida boshqa ob'ekt bo'lsa, uning xususiyatlarini o'zgartirish mumkin."
  },
  {
    "id": 8,
    "question": "Massivni o'zgarmas (immutable) tarzda qanday saralash mumkin?",
    "options": [
      "`const sorted = [...arr].sort((a, b) => a - b);`",
      "`arr.sort((a, b) => a - b);`",
      "`const sorted = arr.reverse();`",
      "`arr.splice(0, arr.length).sort();`"
    ],
    "correctAnswer": 0,
    "explanation": "sort() metodi asl massivni to'g'ridan-to'g'ri o'zgartiradi. Shuning uchun, avval spread operator yordamida nusxa olib, keyin sort qilish kerak."
  },
  {
    "id": 9,
    "question": "Quyidagi kodda `user === updatedUser` va `user.profile === updatedUser.profile` ifodalarning qiymati nima bo'ladi?\n```javascript\nconst user = { name: 'Ali', profile: { age: 20 } };\nconst updatedUser = { ...user, name: 'Vali' };\n```",
    "options": [
      "`false` va `true`",
      "`true` va `false`",
      "`false` va `false`",
      "`true` va `true`"
    ],
    "correctAnswer": 0,
    "explanation": "updatedUser yangi ob'ekt bo'lgani uchun user === updatedUser false bo'ladi. Lekin profile ob'ekti nusxalanmagani uchun (shallow copy bo'lgani sababli) ikkalasi ham bitta profile ob'ektiga ishora qiladi, shuning uchun user.profile === updatedUser.profile true bo'ladi."
  },
  {
    "id": 10,
    "question": "Massivdan elementni o'zgarmas (immutable) tarzda o'chirish uchun qaysi metod eg mos keladi?",
    "options": [
      "`filter`",
      "`splice`",
      "`pop`",
      "`shift`"
    ],
    "correctAnswer": 0,
    "explanation": "splice, pop va shift metodlari asl massivni o'zgartiradi. filter esa shartga mos keladigan elementlardan iborat mutlaqo yangi massiv qaytaradi."
  },
  {
    "id": 11,
    "question": "`structuredClone` qaysi turdagi ma'lumotlarni nusxalashga harakat qilganda xatolik (DataCloneError) beradi?",
    "options": [
      "Funksiyalar va DOM elementlari",
      "Massivlar va Date obyektlari",
      "Map va Set to'plamlari",
      "Null va undefined"
    ],
    "correctAnswer": 0,
    "explanation": "structuredClone deyarli barcha JS turlarini qo'llab-quvvatlaydi, lekin funksiyalar va DOM elementlarini nusxalashda xatolik beradi, chunki ularni strukturaviy klonlab bo'lmaydi."
  },
  {
    "id": 12,
    "question": "Massivdagi ma'lum bir indeksdagi elementni o'zgarmas tarzda yangilash uchun qaysi metoddan foydalanish eng to'g'ri?",
    "options": [
      "`map`",
      "`forEach`",
      "`push`",
      "`reduceRight`"
    ],
    "correctAnswer": 0,
    "explanation": "map metodi massiv elementlarini tekshirib, kerakli indeksdagi elementni o'zgartirib, qolganlarini esa o'zgarishsiz qoldirib yangi massiv qaytarish uchun juda qulay."
  }
]

};

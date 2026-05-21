export const immutableData = {
  id: "immutable-data",
  title: "🔒 Immutability va Deep vs Shallow Copy",
  level: "O'rta daraja",
  description: "O'zgarmas yangilash qoidalari, sayoz va chuqur nusxa olish usullari.",
  theory: `## Immutability va Deep vs Shallow Copy

### 1. NEGA kerak? (Sabab)
JavaScript-da eng ko'p uchraydigan va topish qiyin bo'lgan xatolar (buglar) ob'ekt va massivlarni noto'g'ri nusxalash hamda ularning qiymatlarini to'g'ridan-to'g'ri o'zgartirish (mutation) oqibatida kelib chiqadi.

Ayniqsa, zamonaviy JavaScript frameworklarida (React, Vue, Redux kabi) holatni (state) boshqarishda **immutability** (o'zgarmaslik) qoidasi juda muhim. Agar siz holatni to'g'ridan-to'g'ri mutatsiya qilsangiz (masalan, \`state.user.age = 26\`), React sahifani qayta chizmaydi (re-render qilmaydi), chunki u ob'ekt manzili (reference) o'zgarmagan deb hisoblaydi.

---

### 2. SODDALIK (Analogiya)
- **Shallow Copy (Sayoz nusxa):** Bu xuddi bir papkani nusxalashga o'xshaydi. Papka ichida boshqa papkalar ham bor deylik. Siz yangi papka yaratdingiz va undagi hujjatlarni o'zgartirsangiz eski papka o'zgarmaydi. Lekin ichidagi ichki papkalar (nested folders) hali ham o'sha eski manzilga bog'langan bo'ladi. Ichki papkadagi faylni o'zgartirsangiz, u ikkala papkada ham o'zgaradi.
- **Deep Copy (Chuqur nusxa):** Bu esa papkani ichidagi barcha ichma-ich joylashgan papkalari va barcha fayllari bilan birga butunlay yangidan boshqa joyga nusxalashdir. Endi ular bir-biridan mutlaqo mustaqil.
- **Immutable Update (O'zgarmas yangilash):** Bu xuddi eski hujjatga to'g'ridan-to'g'ri o'zgartirish kiritmasdan, uning nusxasini olib, o'zgartirmoqchi bo'lgan joyimizni yangilab, yangi hujjat hosil qilishdir. Eskisi o'z holicha saqlanib qoladi.

---

### 3. STRUKTURA

#### A. Shallow Copy (Sayoz nusxa)
Faqat birinchi darajali kalit-qiymatlarni nusxalaydi. Ichki ob'ektlar reference (manzil) bo'yicha bog'langan holda qoladi.

**Usullari:**
1. Spread operator: \`const copy = { ...original };\`
2. Object.assign: \`const copy = Object.assign({}, original);\`
3. Array spread va metodlar (massivlar uchun): \`[...arr]\` yoki \`arr.slice()\`

\`\`\`javascript
const user = {
  name: "Ali",
  address: {
    city: "Tashkent"
  }
};

const shallowCopy = { ...user };
shallowCopy.name = "Vali";
shallowCopy.address.city = "Samarkand";

console.log(user.name); // "Ali" (o'zgarmadi - yaxshi!)
console.log(user.address.city); // "Samarkand" (o'zgarib ketdi - chunki address shallow copy bo'lgan!)
\`\`\`

#### B. Deep Copy (Chuqur nusxa)
Ob'ektning barcha darajadagi ichki ob'ektlarini ham to'liq nusxalaydi.

**Usullari:**
1. \`structuredClone(obj)\` (Zamonaviy va tavsiya etilgan o'rnatilgan usul).
2. \`JSON.parse(JSON.stringify(obj))\` (Eski va ba'zi cheklovlari bor usul).

*Cheklovlar:* \`JSON.parse(JSON.stringify(obj))\` funksiyalar, \`Date\`, \`Undefined\`, \`Map\`, \`Set\`, \`Infinity\` kabi ma'lumot turlarini yo'qotadi yoki noto'g'ri formatga o'tkazadi.

\`\`\`javascript
const user = {
  name: "Ali",
  address: {
    city: "Tashkent"
  },
  joined: new Date()
};

// structuredClone tavsiya etiladi:
const deepCopy = structuredClone(user);
deepCopy.address.city = "Bukhara";
console.log(user.address.city); // "Tashkent" (asl nusxa xavfsiz!)
\`\`\`

#### C. Immutable Array Updates (Massivlarni o'zgarmas yangilash)
Massivga element qo'shish, o'chirish yoki o'zgartirishda aslini o'zgartiruvchi metodlar (\`push\`, \`pop\`, \`splice\`, \`shift\`, \`unshift\`, \`sort\`, \`reverse\`) o'rniga, yangi massiv qaytaruvchi metodlarni (\`map\`, \`filter\`, \`concat\`, \`slice\`, spread \`...\`) ishlatish kerak.

1. **Element qo'shish (Add):**
   \`\`\`javascript
   // Mutatsiya (Yomon):
   // arr.push(4);
   
   // Immutability (Yaxshi):
   const newArr = [...arr, 4];
   \`\`\`
2. **Element o'chirish (Remove):**
   \`\`\`javascript
   // Mutatsiya (Yomon):
   // arr.splice(index, 1);
   
   // Immutability (Yaxshi):
   const newArr = arr.filter((item, i) => i !== index);
   \`\`\`
3. **Element yangilash (Update):**
   \`\`\`javascript
   // Mutatsiya (Yomon):
   // arr[index] = newValue;
   
   // Immutability (Yaxshi):
   const newArr = arr.map((item, i) => i === index ? newValue : item);
   \`\`\`

#### D. Immutable Object Updates (Ob'ektlarni o'zgarmas yangilash)
Nested (ichma-ich) ob'ektlarni o'zgartirganda har bir darajada spread operatorini ishlatish shart:
\`\`\`javascript
const state = {
  user: {
    name: "Ali",
    profile: {
      age: 25,
      avatar: "old.png"
    }
  },
  status: "active"
};

// Profil yoshini 26 ga o'zgartirish (Immutable):
const updatedState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      age: 26
    }
  }
};
\`\`\`

---

### 4. XATOLAR VA CHUQURLIKLAR (Common mistakes & Edge Cases)
1. **Faqat tashqi qobiqni nusxalash (Shallow mutation):**
   \`const copy = { ...user }; copy.address.city = 'new';\` deb ichki ob'ektni to'g'ridan-to'g'ri o'zgartirish.
2. **Asl massivni o'zgartiruvchi metodlarni ishlatish:**
   React stateni o'zgartirishda \`state.push(item)\` ishlatish. Har doim \`setState([...state, item])\` ishlatilishi kerak.
3. **structuredClone cheklovlari:**
   \`structuredClone\` deyarli hamma narsani nusxalaydi, lekin funksiyalar yoki DOM elementlarini nusxalay olmaydi (xatolik beradi).

---

### 5. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Mutatsiya (Mutation) nima?**
Mutatsiya — mavjud ob'ekt yoki massivning xotiradagi o'zini to'g'ridan-to'g'ri o'zgartirishdir (masalan, \`obj.name = "Yangi"\` yoki \`arr.push(4)\`). Bu yangi reference yaratmaydi.

**2. Immutability (O'zgarmaslik) nima va u nega kerak?**
Immutability — ma'lumotlar o'zgartirilganda asl ma'lumotni saqlab qolib, o'zgartirilgan yangi nusxa yaratish tamoyilidir. U dasturdagi xatolarni kamaytirish, holat tariqini saqlash (time-travel debugging) va React kabi kutubxonalarda renderlashni optimallashtirish uchun kerak.

**3. Shallow Copy va Deep Copy o'rtasidagi asosiy farq nimada?**
Shallow Copy faqat eng yuqori (birinchi) darajadagi qiymatlarni nusxalaydi, ichki ob'ektlar esa eski ob'ekt manzillariga bog'lanib qoladi. Deep Copy esa barcha ichma-ich joylashgan darajadagi ob'ektlar va massivlarni ham to'liq nusxalab, mutlaqo mustaqil yangi nusxa yaratadi.

**4. Spread operatori (... ) yordamida qilingan nusxa Shallow yoki Deep nusxa hisoblanadimi?**
Spread operatori faqat Shallow Copy (sayoz nusxa) yaratadi. Agar ob'ekt ichida boshqa ob'ektlar bo'lsa, ularning faqat havolasi (reference) ko'chiriladi.

**5. structuredClone() metodi nima va u qachon ishlatiladi?**
\`structuredClone()\` — zamonaviy brauzerlar va Node.js-da mavjud bo'lgan, ob'ektlardan xavfsiz va to'liq Deep Copy (chuqur nusxa) olish uchun mo'ljallangan maxsus API.

**6. JSON.parse(JSON.stringify(obj)) orqali nusxa olishning qanday kamchiliklari bor?**
Bu usul ob'ekt ichidagi funksiyalarni (\`function\`), \`undefined\` qiymatlarni, \`Symbol\`larni tashlab yuboradi. Shuningdek, \`Date\` ob'ektini stringga aylantirib yuboradi, \`Map\`, \`Set\` kabi turlar bilan to'g'ri ishlamaydi.

**7. Nima uchun React frameworkida state'ni to'g'ridan-to'g'ri o'zgartirib bo'lmaydi?**
React state o'zgarganini bilish uchun ob'ektning manzillarini (reference) solishtiradi (\`oldState === newState\`). Agar siz stateni to'g'ridan-to'g'ri o'zgartirsangiz, manzil o'zgarmaydi va React o'zgarishni sezmay, sahifani qayta render qilmaydi.

**8. Massivni o'zgarmas (immutable) usulda qanday qilib tozalash (barcha elementlarini o'chirish) mumkin?**
Mutatsiya bilan \`arr.length = 0\` yoki \`arr.splice(0)\` qilinadi. Immutable usulda esa shunchaki bo'sh massiv \`[]\` o'zlashtiriladi.

**9. Object.freeze(obj) nima vazifani bajaradi va u chuqur muzlatadimi?**
\`Object.freeze(obj)\` ob'ekt xususiyatlarini o'zgartirish, qo'shish yoki o'chirishni taqiqlaydi. Biroq, u faqat shallow (sayoz) muzlatadi. Ichki ob'ektlarni muzlatmaydi, ular hali ham o'zgartirilishi mumkin.

**10. Massiv elementlarini alfavit bo'yicha o'zgarmas (immutable) tartibda qanday saralash mumkin?**
\`sort()\` metodi asl massivni o'zgartirgani uchun, avval spread operator yordamida nusxa olib keyin saralash kerak: \`const sorted = [...originalArray].sort()\`. Zamonaviy JSda esa \`toSorted()\` metodidan ham foydalanish mumkin.

**11. Nima uchun [1, 2] === [1, 2] har doim false qaytaradi?**
Chunki JavaScriptda massivlar ob'ekt hisoblanadi va ular qiymatlari bo'yicha emas, xotiradagi manzillari bo'yicha solishtiriladi. Bu ikkita massiv xotirada ikki xil manzilda joylashgani sababli ular teng emas.

**12. Nested ob'ektlarni o'zgarmas yangilashda spread operatoridan qanday foydalaniladi?**
Har bir o'zgartirilayotgan darajani spread qilish kerak. Masalan: \`{ ...state, user: { ...state.user, age: 30 } }\`. Bu orqali faqat o'zgargan qismlarga yangi reference yaratiladi, o'zgarmagan ob'ektlar esa eski reference'larini saqlab qoladi (structural sharing).
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
      id: 1,
      question: "Shallow copy va Deep copy o'rtasidagi asosiy farq nima?",
      options: [
        "Shallow copy faqat birinchi darajali xususiyatlarni nusxalaydi, Deep copy esa barcha ichma-ich joylashgan xususiyatlarni to'liq nusxalaydi",
        "Shallow copy faqat sonlarni nusxalaydi, Deep copy esa obyektlarni",
        "Shallow copy asl ob'ektni o'chirib yuboradi, Deep copy esa saqlab qoladi",
        "Ikkalasi mutlaqo bir xil ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Shallow copy (sayoz nusxa) faqat ob'ektning eng yuqori darajasini nusxalaydi. Ichki ob'ektlar xotiradagi eski manzilga bog'langan holda qoladi. Deep copy (chuqur nusxa) esa barcha ichki ob'ektlarni ham yangidan nusxalaydi."
    },
    {
      id: 2,
      question: "`const copy = { ...original }` kodi qanday nusxa yaratadi?",
      options: [
        "Shallow copy (Sayoz nusxa)",
        "Deep copy (Chuqur nusxa)",
        "Hech qanday nusxa yaratmaydi, shunchaki xatolik beradi",
        "Faqat massivlar uchun deep copy yaratadi"
      ],
      correctAnswer: 0,
      explanation: "Spread operatori faqat birinchi darajali kalit-qiymatlarni nusxalaydi, shuning uchun u sayoz nusxa (shallow copy) hisoblanadi."
    },
    {
      id: 3,
      question: "JavaScript-dagi `structuredClone()` nima uchun ishlatiladi?",
      options: [
        "Ob'ektlardan xavfsiz va to'liq chuqur nusxa (Deep copy) olish uchun",
        "Ob'ektlarni HTML elementga aylantirish uchun",
        "Ob'ekt xotirasini butunlay tozalash uchun",
        "Faqat primitiv qiymatlarni solishtirish uchun"
      ],
      correctAnswer: 0,
      explanation: "structuredClone JavaScript-ning zamonaviy standarti bo'lib, ob'ektlar va massivlardan chuqur (deep) nusxa olish uchun eng to'g'ri va xavfsiz usul hisoblanadi."
    },
    {
      id: 4,
      question: "`JSON.parse(JSON.stringify(obj))` usulining qanday kamchiligi bor?",
      options: [
        "U funksiyalar, undefined va Date ob'ektlari kabi ma'lumot turlarini noto'g'ri o'zgartiradi yoki yo'qotadi",
        "U faqat brauzerlarda ishlaydi, Node.js da ishlamaydi",
        "U juda tez ishlaydi va ko'p xotira talab qiladi",
        "U faqat bo'sh ob'ektlarni nusxalay oladi"
      ],
      correctAnswer: 0,
      explanation: "JSON serialization funksiyalar, undefined va Symbol qiymatlarni tashlab yuboradi, hamda Date ob'ektlarini string formatiga o'zgartirib yuboradi."
    },
    {
      id: 5,
      question: "Nima uchun React-da state (holat)ni to'g'ridan-to'g'ri mutatsiya qilish (o'zgartirish) tavsiya etilmaydi?",
      options: [
        "Chunki React o'zgarishlarni ob'ekt manzillari (references) bo'yicha tekshiradi. To'g'ridan-to'g'ri o'zgartirilganda manzil o'zgarmaydi va re-render sodir bo'lmaydi",
        "Chunki to'g'ridan-to'g'ri o'zgartirish JavaScript-da taqiqlangan",
        "Chunki bu xotirani to'ldirib yuboradi",
        "Chunki state faqat funksiyalardan iborat bo'lishi kerak"
      ],
      correctAnswer: 0,
      explanation: "React state o'zgarganini bilish uchun shallow reference comparison (oldState === newState) bajaradi. Agar ob'ektning o'zini o'zgartirsak, uning reference manzili o'zgarmasdan qoladi, natijada React render qilmaydi."
    },
    {
      id: 6,
      question: "`const arr = [1, 2]` massiviga 3 elementini o'zgarmas (immutable) usulda qo'shish uchun qaysi variant to'g'ri?",
      options: [
        "`const newArr = [...arr, 3];`",
        "`arr.push(3);`",
        "`arr[arr.length] = 3;`",
        "`arr.unshift(3);`"
      ],
      correctAnswer: 0,
      explanation: "push va unshift metodlari asl massivni o'zgartiradi (mutatsiya). Spread operator yordamida yangi massiv yaratish esa immutable yangilash hisoblanadi."
    },
    {
      id: 7,
      question: "`Object.freeze(obj)` metodining cheklovi nimada?",
      options: [
        "U faqat sayoz (shallow) muzlatadi, ya'ni ichki ob'ektlarni o'zgartirish mumkin bo'lib qoladi",
        "U faqat massivlarni muzlata oladi",
        "U ob'ekt qiymatlarini o'chirib yuboradi",
        "U asinxron ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Object.freeze faqat ob'ektning birinchi darajali xususiyatlarini muzlatadi. Agar ob'ekt ichida boshqa ob'ekt bo'lsa, uning xususiyatlarini o'zgartirish mumkin."
    },
    {
      id: 8,
      question: "Massivni o'zgarmas (immutable) tarzda qanday saralash mumkin?",
      options: [
        "`const sorted = [...arr].sort((a, b) => a - b);`",
        "`arr.sort((a, b) => a - b);`",
        "`const sorted = arr.reverse();`",
        "`arr.splice(0, arr.length).sort();`"
      ],
      correctAnswer: 0,
      explanation: "sort() metodi asl massivni to'g'ridan-to'g'ri o'zgartiradi. Shuning uchun, avval spread operator yordamida nusxa olib, keyin sort qilish kerak."
    },
    {
      id: 9,
      question: "Quyidagi kodda `user === updatedUser` va `user.profile === updatedUser.profile` ifodalarning qiymati nima bo'ladi?\n```javascript\nconst user = { name: 'Ali', profile: { age: 20 } };\nconst updatedUser = { ...user, name: 'Vali' };\n```",
      options: [
        "`false` va `true`",
        "`true` va `false`",
        "`false` va `false`",
        "`true` va `true`"
      ],
      correctAnswer: 0,
      explanation: "updatedUser yangi ob'ekt bo'lgani uchun user === updatedUser false bo'ladi. Lekin profile ob'ekti nusxalanmagani uchun (shallow copy bo'lgani sababli) ikkalasi ham bitta profile ob'ektiga ishora qiladi, shuning uchun user.profile === updatedUser.profile true bo'ladi."
    },
    {
      id: 10,
      question: "Massivdan elementni o'zgarmas (immutable) tarzda o'chirish uchun qaysi metod eng mos keladi?",
      options: [
        "`filter`",
        "`splice`",
        "`pop`",
        "`shift`"
      ],
      correctAnswer: 0,
      explanation: "splice, pop va shift metodlari asl massivni o'zgartiradi. filter esa shartga mos keladigan elementlardan iborat mutlaqo yangi massiv qaytaradi."
    },
    {
      id: 11,
      question: "`structuredClone` qaysi turdagi ma'lumotlarni nusxalashga harakat qilganda xatolik (DataCloneError) beradi?",
      options: [
        "Funksiyalar va DOM elementlari",
        "Massivlar va Date obyektlari",
        "Map va Set to'plamlari",
        "Null va undefined"
      ],
      correctAnswer: 0,
      explanation: "structuredClone deyarli barcha JS turlarini qo'llab-quvvatlaydi, lekin funksiyalar va DOM elementlarini nusxalashda xatolik beradi, chunki ularni strukturaviy klonlab bo'lmaydi."
    },
    {
      id: 12,
      question: "Massivdagi ma'lum bir indeksdagi elementni o'zgarmas tarzda yangilash uchun qaysi metoddan foydalanish eng to'g'ri?",
      options: [
        "`map`",
        "`forEach`",
        "`push`",
        "`reduceRight`"
      ],
      correctAnswer: 0,
      explanation: "map metodi massiv elementlarini tekshirib, kerakli indeksdagi elementni o'zgartirib, qolganlarini esa o'zgarishsiz qoldirib yangi massiv qaytarish uchun juda qulay."
    }
  ]
};

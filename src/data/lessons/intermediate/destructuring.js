export const destructuring = {
  id: "destructuring",
  title: "Destructuring (Ma'lumotlarni ochish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Destructuring (Ma'lumotlarni ochish) nima?
**Destructuring** (Destruptizatsiya yoki Ma'lumotlarni ochish) — bu ES6 (ECMAScript 2015) standartida JavaScript-ga kiritilgan qulay va ixcham sintaksis bo'lib, u massivlar (arrays) ichidagi elementlarni yoki obyektlar (objects) ichidagi xossalarni osongina ajratib olib, alohida o'zgaruvchilarga yuklash imkonini beradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz sayohatdan qaytdingiz va uyingizda **chamodoningizni ochyapgansiz (unpacking)**:
* **Eski usul (Destructuring-siz):** Siz chamodonni ochib, kiyimlarni bittalab qidirasiz: *"Mana bu shim, uni shkafga ilaman. Mana bu ko'ylak, uni ham ilaman..."* Har bir kiyimni alohida qo'lga olib, alohida joylashtirasiz.
* **Yangi usul (Destructuring orqali):** Chamadon maxsus bo'limlarga ega. Siz chamodonni ochishingiz bilan, bitta harakatda o'ng bo'limdagi shimni va chap bo'limdagi ko'ylakni birdaniga kerakli o'zgaruvchilarga (shkaflarga) joylab qo'yasiz.

Massivlarni ochish **avtobus navbatiga** o'xshaydi: birinchi tushgan odam birinchi o'rindiqqa o'tiradi, ikkinchisi esa ikkinchisiga (indeks yoki tartib bo'yicha).
Obyektlarni ochish esa **pochta qutilariga** o'xshaydi: har bir qutining ustida ism yozilgan. Siz ismga qarab xatingizni olasiz, kim birinchi kelgani yoki qaysi tartibda turganining ahamiyati yo'q (kalit nomlari mosligi bo'yicha).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy massiv va obyektlarni ochish)
\`\`\`javascript
// Massivni destruptizatsiya qilish (Array Destructuring)
const fruits = ['olma', 'anor', 'behi'];
const [first, second] = fruits;

console.log(first);  // 'olma'
console.log(second); // 'anor'

// Obyektni destruptizatsiya qilish (Object Destructuring)
const user = { name: 'Ali', age: 25 };
const { name, age } = user;

console.log(name); // 'Ali'
console.log(age);  // 25
\`\`\`

### 2. Intermediate Example (Qayta nomlash, default qiymatlar va ichma-ich (nested) obyektlar)
\`\`\`javascript
const settings = { theme: 'dark', dimensions: { width: 1024, height: 768 } };

// 1. Qayta nomlash (theme -> appTheme)
// 2. Default qiymat (language bo'lmasa 'uz' qiymati olinadi)
// 3. Ichma-ich obyektni ochish (dimensions ichidagi width va height)
const { 
  theme: appTheme, 
  language = 'uz',
  dimensions: { width, height } 
} = settings;

console.log(appTheme); // 'dark'
console.log(language); // 'uz' (chunki settings ichida language yo'q edi)
console.log(width);    // 1024
console.log(height);   // 768
\`\`\`

### 3. Advanced Example (Funksiya parametrlari va Rest (\`...\`) operatori)
\`\`\`javascript
// Obyektni funksiya parametri sifatida qabul qilish va darhol destruptizatsiya qilish
function displayProfile({ name, role = 'user', ...otherInfo }) {
  console.log(\`Foydalanuvchi: \${name}, Roli: \${role}\`);
  console.log(\`Qolgan ma'lumotlar:\`, otherInfo);
}

const userObj = {
  name: 'Vali',
  age: 28,
  city: 'Toshkent',
  skills: ['JS', 'React']
};

displayProfile(userObj);
// Konsolga chiqadi:
// Foydalanuvchi: Vali, Roli: user
// Qolgan ma'lumotlar: { age: 28, city: 'Toshkent', skills: ['JS', 'React'] }

// Ikki o'zgaruvchi qiymatini uchinchi o'zgaruvchisiz almashtirish (swapping)
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Destructuring qanday muammoni hal qiladi?
ES6 ga qadar obyektlar yoki massivlar bilan ishlashda har bir qiymatni alohida o'zgaruvchiga olinganda kod juda cho'zilib ketardi.

#### Eski usul (Destructuring-siz):
\`\`\`javascript
const car = { brand: 'Tesla', model: 'Model 3', year: 2023 };
const brand = car.brand;
const model = car.model;
const year = car.year;
\`\`\`
Agar obyekt juda murakkab va ichma-ich bo'lsa, har bir xossaga \`car.details.engine.type\` shaklida murojaat qilish zerikarli va takrorlanuvchi kod ko'payishiga olib kelardi.

#### Yangi usul (Destructuring bilan):
\`\`\`javascript
const { brand, model, year } = car;
\`\`\`
Bu sintaksis kod satrlarini qisqartiradi, kodning o'qilishini yaxshilaydi va funksiyalarga parametr uzatishda positional argumentlar (tartibga bog'liq parametrlar) muammosini hal qiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`null\` yoki \`undefined\` qiymatlarni ochishga urinish
Agar obyekt yoki massiv o'rniga \`null\`/\`undefined\` qiymat kelsa, JS dvigateli xatolik (\`TypeError\`) tashlaydi.
* **Xato:**
  \`\`\`javascript
  const user = null;
  const { name } = user; // TypeError: Cannot destructure property 'name' of 'null'
  \`\`\`
* **Tuzatish:** Defensive programming (himoyaviy kodlash) yoki default obyekt ishlatish:
  \`\`\`javascript
  const user = null;
  const { name } = user || {}; // Xatolik bermaydi, name = undefined bo'ladi
  \`\`\`

### 2. O'zgaruvchini e'lon qilib bo'lingandan keyin obyekt destruptizatsiyasini xato bajarish
Agar o'zgaruvchi oldindan yaratilgan bo'lsa, qavssiz destruptizatsiya xatolik beradi.
* **Xato:**
  \`\`\`javascript
  let name;
  { name } = { name: 'Ali' }; // SyntaxError: Unexpected token '='
  \`\`\`
* **Tuzatish:** Butun ifodani qavs ichiga olish kerak:
  \`\`\`javascript
  let name;
  ({ name } = { name: 'Ali' }); // OK
  \`\`\`

### 3. Qayta nomlash (renaming) va standart qiymat (default value) sintaksisini chalkashtirish
* **Xato:**
  \`\`\`javascript
  // Default qiymat va yangi nom o'rni almashib ketgan
  const { name = 'Mehmon': userName } = user; // SyntaxError
  \`\`\`
* **Tuzatish:** Avval ikki nuqta bilan qayta nomlanadi, keyin tenglik bilan default qiymat beriladi:
  \`\`\`javascript
  const { name: userName = 'Mehmon' } = user; // To'g'ri
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Destructuring nima va u qachon kiritilgan?
   * **Javob:** Destructuring — bu massiv elementlari yoki obyekt xossalarini alohida o'zgaruvchilarga ajratib olish imkonini beruvchi sintaksis bo'lib, u ES6 (2015) da taqdim etilgan.
2. **Savol:** Destructuring-da default qiymat qanday beriladi?
   * **Javob:** Tenglik operatori (\`=\`) yordamida beriladi. Masalan: \`const [a = 1] = [];\` yoki \`const { b = 2 } = {};\`.
3. **Savol:** Obyekt xossasini ajratib olayotganda uni qanday qilib yangi nomli o'zgaruvchiga yuklash mumkin?
   * **Javob:** Ikki nuqta (\`:\`) yordamida. Masalan: \`const { originalName: newName } = obj;\`.
4. **Savol:** Massiv destruptizatsiyasida ba'zi elementlarni tashlab ketish (skip) qanday amalga oshiriladi?
   * **Javob:** Vergullar yordamida element o'rni bo'sh qoldiriladi. Masalan: \`const [first, , third] = [1, 2, 3];\` (bu yerda \`2\` tashlab ketildi).

### Middle (5–8)
5. **Savol:** Uchinchi o'zgaruvchisiz ikkita o'zgaruvchi qiymatini qanday almashtirish mumkin?
   * **Javob:** Massiv destruptizatsiyasidan foydalanib: \`[a, b] = [b, a];\`.
6. **Savol:** Ichma-ich joylashgan (nested) obyektlarni ochishda qanday xavf bor?
   * **Javob:** Agar tashqi obyekt mavjud bo'lmasa (ya'ni \`undefined\` bo'lsa), ichki obyektni ochishga urinish \`TypeError\` xatoligini beradi. Buni oldini olish uchun tashqi darajaga ham default obyekt biriktiriladi: \`const { address: { city } = {} } = user;\`.
7. **Savol:** Rest (\`...\`) operatori destruptizatsiyada nima ish qiladi?
   * **Javob:** Ajratib olingan xossalar yoki elementlardan ortib qolgan barcha qiymatlarni yangi obyekt yoki massivga yig'ib beradi.
8. **Savol:** Funksiya parametrlarida destructuring ishlatishning qanday afzalligi bor?
   * **Javob:** Argumentlar tartibi (positional arguments) chalkashib ketishining oldini oladi, kodni ancha qisqartiradi va default qiymatlar berishni osonlashtiradi.

### Senior (9–12)
9. **Savol:** \`null\` yoki \`undefined\` qiymatni destruptizatsiya qilganda nima uchun TypeError sodir bo'ladi?
   * **Javob:** Chunki JavaScript-da \`null\` va \`undefined\` qiymatlar ustida property lookup (xossani izlash) amalini bajarib bo'lmaydi va ular obyektga o'girila olmaydi.
10. **Savol:** Dinamik kalit nomlari (computed property names) orqali destruptizatsiya qilsa bo'ladimi? Misol keltiring.
    * **Javob:** Ha, to'rtburchak qavslar yordamida dinamik kalit nomlarini ochish mumkin:
      \`\`\`javascript
      const key = 'role';
      const { [key]: userRole } = { role: 'admin' };
      console.log(userRole); // 'admin'
      \`\`\`
11. **Savol:** \`const [first, ...rest] = "Hello";\` kodi nima qaytaradi va nega?
    * **Javob:** Natijada \`first = "H"\` va \`rest = ["e", "l", "l", "o"]\` bo'ladi. Chunki satrlar (strings) iteratsiya qilinuvchi (iterable) hisoblanadi va massiv destruptizatsiyasi ularning har bir harfini massiv elementi kabi ochadi.
12. **Savol:** Destructuring nusxalashda chuqur (deep copy) yoki yuza (shallow copy) nusxa yaratadimi?
    * **Javob:** Yuza nusxa (shallow copy) yaratadi. Agar destruptizatsiya qilinayotgan obyekt ichida boshqa obyektlar (reference tiplar) bo'lsa, ularning faqat xotiradagi manzillari (references) nusxalanadi va ular o'zaro bog'liq bo'lib qoladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid sxemasida obyekt va massiv destruptizatsiyasining ishlash prinsiplari va ular o'rtasidagi asosiy farqlar (tartibga bog'liqlik va kalit mosligi) ko'rsatilgan:

\`\`\`mermaid
graph TD
    Start["Destructuring (Ma'lumotlarni ochish)"] --> ArrayD["Array Destructuring (Massivni ochish)"]
    Start --> ObjectD["Object Destructuring (Obyektni ochish)"]

    ArrayD --> ArrayRule["Qoida: Tartib / Indeks bo'yicha (By Index Order)"]
    ArrayRule --> ArrayExample["Misol: const [a, b] = [10, 20];"]
    ArrayExample --> ArrayExplain["Natija:<br>a = 10 (0-indeksdagi element)<br>b = 20 (1-indeksdagi element)"]

    ObjectD --> ObjectRule["Qoida: Kalit nomi mosligi bo'yicha (By Matching Key Names)"]
    ObjectRule --> ObjectExample["Misol: const { age, name } = { name: 'Ali', age: 25 };"]
    ObjectExample --> ObjectExplain["Natija:<br>name = 'Ali' (kalit mos keldi)<br>age = 25 (kalit mos keldi)<br>(Tartib ahamiyatsiz)"]

    style Start fill:#f9f,stroke:#333,stroke-width:2px
    style ArrayExplain fill:#bbf,stroke:#333,stroke-width:1px
    style ObjectExplain fill:#bfb,stroke:#333,stroke-width:1px
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi testlar va savollar orqali destruptizatsiyaning nozik jihatlari va JavaScript-da ma'lumotlar bilan ishlash bo'yicha bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### API Javoblarini Qayta Ishlash va Default Sozlamalar
Real loyihalarda ko'pincha tashqi API dan murakkab JSON javoblari keladi. Quyidagi misolda biz destruptizatsiya yordamida foydalanuvchi ma'lumotlarini qulay tarzda ajratib olamiz va agar ba'zi muhim sozlamalar kelmasa, ularga xavfsiz boshlang'ich qiymatlarni beramiz:

\`\`\`javascript
function processApiResponse(response) {
  // Obyekt bo'lmasa xatolik bermasligi uchun default {} ishlatamiz
  const {
    status = 'error',
    data: {
      id,
      profile: { firstName, lastName, avatarUrl = 'default-avatar.png' } = {},
      settings: { theme = 'light', notifications: { email = true } = {} } = {}
    } = {}
  } = response || {};

  if (status !== 'success') {
    throw new Error('API muvaffaqiyatsiz yakunlandi');
  }

  return {
    userId: id,
    fullName: \`\${firstName} \${lastName}\`,
    avatar: avatarUrl,
    theme,
    sendEmail: email
  };
}

const mockResponse = {
  status: 'success',
  data: {
    id: 42,
    profile: { firstName: 'Diyor', lastName: 'Karimov' },
    settings: { theme: 'dark' }
  }
};

const processed = processApiResponse(mockResponse);
console.log(processed);
/*
Natija:
{
  userId: 42,
  fullName: 'Diyor Karimov',
  avatar: 'default-avatar.png', // API-da yo'q edi, default olindi
  theme: 'dark',
  sendEmail: true               // Ichki obyektda yo'q edi, default olindi
}
*/
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Kompilyatsiya (Transpilation):** Agar siz loyihada eski brauzerlarni qo'llab-quvvatlash uchun Babel ishlatayotgan bo'lsangiz, ES6 destructuring sintaksisi eski ES5 ko'rinishiga (oddiy variable assignment va property lookup-ga) o'giriladi. Bu kod hajmini biroz oshirishi mumkin, lekin zamonaviy JS dvigatellarida destructuring bevosita optimallashtirilgan.
* **Xotira (Memory Allocation):** Obyektni destruptizatsiya qilayotganda rest (\`...rest\`) operatoridan foydalanish yangi obyekt yaratilishiga va undagi barcha qolgan xossalarning nusxalanishiga (shallow copy) olib keladi. Agar loyihada juda katta obyektlar bilan yuqori chastotali sikllarda (millionlab marta) rest operatori ishlatilsa, bu xotiraga yuklama berishi mumkin. Bunday holatlarda oddiy xossalarga to'g'ridan-to'g'ri murojaat qilish afzalroq.

---

## 10. 📌 Cheat Sheet

| Vazifa / Sintaksis | Misol | Izoh |
| :--- | :--- | :--- |
| **Oddiy massivni ochish** | \`const [x, y] = [1, 2];\` | Tartib bo'yicha o'zlashtiriladi (\`x = 1\`, \`y = 2\`) |
| **Elementlarni tashlab ketish** | \`const [a, , b] = [1, 2, 3];\` | Ikkinchi element tashlab ketiladi (\`a = 1\`, \`b = 3\`) |
| **Default qiymat berish** | \`const [a = 5] = [];\` | Agar element bo'lmasa, \`5\` qiymati beriladi |
| **Oddiy obyektni ochish** | \`const { name } = user;\` | Kalit nomi bo'yicha moslashtiriladi |
| **Qayta nomlash (Rename)** | \`const { age: userAge } = user;\` | \`age\` xossasi \`userAge\` o'zgaruvchisiga olinadi |
| **Nested (Ichma-ich) ochish** | \`const { loc: { lat } } = user;\` | Ichki obyektning \`lat\` xossasini ochadi |
| **Rest operatori (Massiv)** | \`const [first, ...rest] = [1, 2, 3];\` | \`rest\` o'zgaruvchisi \`[2, 3]\` massivini oladi |
| **Rest operatori (Obyekt)** | \`const { id, ...details } = product;\` | \`details\` obyektida \`id\`dan tashqari hamma xossalar qoladi |
`,
  exercises: [
  {
    "id": 1,
    "title": "O'zgaruvchilar qiymatini almashtirish va massivni ochish",
    "instruction": "Berilgan `swapAndUnpack(arr)` funksiyasiga kamida 2 ta elementdan iborat massiv uzatiladi. Funksiya massivning birinchi va ikkinchi elementlarining o'rnini faqat massiv destruptizatsiyasidan (array destructuring) foydalanib almashtirishi (swapping) va ularni yangi massiv ko'rinishida qaytarishi kerak. Boshqa vaqtinchalik o'zgaruvchilardan foydalanmang.",
    "startingCode": "function swapAndUnpack(arr) {\n  // Faqat destructuring yordamida birinchi va ikkinchi elementlarni almashtiring\n  // Kodni shu yerda yozing\n}",
    "hint": "let [a, b] = arr; [a, b] = [b, a]; return [a, b];",
    "test": "const sandbox = new Function(code + '; return swapAndUnpack;');\nconst fn = sandbox();\nconst result = fn([10, 20]);\nif (!Array.isArray(result) || result[0] !== 20 || result[1] !== 10) return 'swapAndUnpack funksiyasi elementlar o\\'rnini to\\'g\\'ri almashtirmadi. Kutilgan: [20, 10], olingan: ' + JSON.stringify(result);\nconst result2 = fn(['olma', 'anor', 'behi']);\nif (result2[0] !== 'anor' || result2[1] !== 'olma') return 'Ko\\'p elementli massivlar uchun ham to\\'g\\'ri ishlashi kerak';\nreturn null;"
  },
  {
    "id": 2,
    "title": "API ma'lumotlarini qayta ishlash",
    "instruction": "Foydalanuvchi obyekti (`user`) berilgan. Undan destruptizatsiya yordamida `firstName`ni `name` o'zgaruvchisiga, `email`ni esa o'zgaruvchining o'ziga oling. Shuningdek, `role` xossasini ajrating, agar u mavjud bo'lmasa unga default (boshlang'ich) qiymat sifatida `'user'`ni bering. Funksiya yakunda yangi obyekt ko'rinishida `{ name, email, role }`ni qaytarsin.",
    "startingCode": "function processUser(user) {\n  // Destructuring yordamida firstName -> name, email, va role (default: 'user') o'zgaruvchilarini oching\n  // Kodni shu yerda yozing\n}",
    "hint": "const { firstName: name, email, role = 'user' } = user; return { name, email, role };",
    "test": "const sandbox = new Function(code + '; return processUser;');\nconst fn = sandbox();\nconst user1 = { firstName: 'Sardor', email: 's@gmail.com', role: 'admin' };\nconst res1 = fn(user1);\nif (!res1 || res1.name !== 'Sardor' || res1.email !== 's@gmail.com' || res1.role !== 'admin') return 'firstName qayta nomlanishi yoki role qiymati noto\\'g\\'ri olingan';\nconst user2 = { firstName: 'Madina', email: 'm@mail.ru' };\nconst res2 = fn(user2);\nif (!res2 || res2.role !== 'user') return 'role xossasi bo\\'lmaganda default \"user\" qiymati biriktirilishi kerak';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Murakkab obyektlarni destruptizatsiya qilish",
    "instruction": "Berilgan buyurtma (`order`) obyektidan `id`ni, uning ichidagi `customer` obyektidan `city`ni destruptizatsiya qilib oling. Shuningdek, buyurtmaning boshqa barcha xossalarini `details` nomli o'zgaruvchiga (rest operator orqali) yig'ing. Yakunda funksiya `{ id, city, details }` obyektini qaytarsin.",
    "startingCode": "function getOrderSummary(order) {\n  // Ichma-ich destructuring va rest operatoridan foydalaning\n  // Kodni shu yerda yozing\n}",
    "hint": "const { id, customer: { city }, ...details } = order; return { id, city, details };",
    "test": "const sandbox = new Function(code + '; return getOrderSummary;');\nconst fn = sandbox();\nconst orderData = { id: 501, date: '2026-06-11', customer: { name: 'Eldor', city: 'Samarqand' }, items: ['tel', 'keys'], total: 1500 };\nconst res = fn(orderData);\nif (!res || res.id !== 501 || res.city !== 'Samarqand') return 'id yoki ichki customer.city noto\\'g\\'ri ochildi';\nif (!res.details || res.details.total !== 1500 || res.details.customer !== undefined) return 'Rest operatori yordamida qolgan xossalar details obyektiga to\\'g\\'ri yig\\'ilmadi';\nreturn null;"
  },
  {
    "id": 4,
    "title": "Ikki o'zgaruvchining o'rnini almashtirish",
    "instruction": "`a` va `b` o'zgaruvchilarini massiv destruptizatsiyasi yordamida almashtirib, `[b, a]` ni qaytaradigan `swapVariables(a, b)` yozing.",
    "startingCode": "function swapVariables(a, b) {\n  // Kodni yozing\n}",
    "hint": "return [a, b] = [b, a];",
    "test": "const fn = new Function(code + '; return swapVariables;')(); const r = fn(1, 2); if(r[0]!==2 || r[1]!==1) return 'Xato'; return null;"
  },
  {
    "id": 5,
    "title": "Massivdan birinchi va uchinchi",
    "instruction": "Uchta elementli massiv keladi. Birinchi va uchinchi elementlarni olib (ikkinchisini tashlab), ularni yangi massiv qilib qaytaruvchi `getFirstAndThird(arr)` yozing.",
    "startingCode": "function getFirstAndThird(arr) {\n  // Kodni yozing\n}",
    "hint": "const [first, , third] = arr; return [first, third];",
    "test": "const fn = new Function(code + '; return getFirstAndThird;')(); const r = fn([10,20,30]); if(r[0]!==10||r[1]!==30) return 'Xato'; return null;"
  },
  {
    "id": 6,
    "title": "Rest operatori bilan massiv",
    "instruction": "Massiv qabul qilib, uning birinchi elementini olib, qolgan hamma elementlarini bitta alohida massiv qilib [first, restArr] ko'rinishida qaytaruvchi `headAndTail(arr)` tuzing.",
    "startingCode": "function headAndTail(arr) {\n  // Kodni yozing\n}",
    "hint": "const [head, ...tail] = arr; return [head, tail];",
    "test": "const fn = new Function(code + '; return headAndTail;')(); const r=fn([1,2,3]); if(r[0]!==1 || r[1][0]!==2) return 'Xato'; return null;"
  },
  {
    "id": 7,
    "title": "Funksiya parametridagi obyekt",
    "instruction": "Funksiya `{name, age}` qabul qiladi. Faqat age ni qaytarsin. `getAge({name, age})` degan funksiya argumentida destructuring ishlating.",
    "startingCode": "function getAge({ /* kodni yozing */ }) {\n  // Kodni yozing\n}",
    "hint": "getAge({ age }) { return age; }",
    "test": "const fn = new Function(code + '; return getAge;')(); if(fn({name:'Ali', age:25}) !== 25) return 'Xato'; return null;"
  },
  {
    "id": 8,
    "title": "Default Qiymatlar (Massiv)",
    "instruction": "Massiv keladi, unda 1 ta yo 2 ta element bo'lishi mumkin. Ularni olib a, b ga yozing, agar b yo'q bo'lsa `0` qilib bering. Va ularni yig'indisini qaytaring `sumTwo(arr)`.",
    "startingCode": "function sumTwo(arr) {\n  // Kodni yozing\n}",
    "hint": "const [a, b = 0] = arr; return a + b;",
    "test": "const fn = new Function(code + '; return sumTwo;')(); if(fn([5])!==5 || fn([5,3])!==8) return 'Xato'; return null;"
  },
  {
    "id": 9,
    "title": "Obyektni o'zgarmas qilib birlashtirish (Spread)",
    "instruction": "`obj1` va `obj2` keladi, ularni destructuring/spread orqali bitta qilib qaytaruvchi `mergeObj(obj1, obj2)` yozing.",
    "startingCode": "function mergeObj(obj1, obj2) {\n  // Kodni yozing\n}",
    "hint": "return { ...obj1, ...obj2 };",
    "test": "const fn = new Function(code + '; return mergeObj;')(); const r=fn({a:1},{b:2}); if(r.a!==1 || r.b!==2) return 'Xato'; return null;"
  },
  {
    "id": 10,
    "title": "Ko'p qavatli Destructuring",
    "instruction": "`{ user: { address: { city } } }` obyektidan faqat city ni olib qaytaradigan `getCity(data)` yozing.",
    "startingCode": "function getCity(data) {\n  // Kodni yozing\n}",
    "hint": "const { user: { address: { city } } } = data; return city;",
    "test": "const fn = new Function(code + '; return getCity;')(); if(fn({user:{address:{city:'Tashkent'}}}) !== 'Tashkent') return 'Xato'; return null;"
  },
  {
    "id": 11,
    "title": "Massiv va Obyekt aralash",
    "instruction": "`users` degan obyektlar massivi keladi: `[{name: 'A'}, {name: 'B'}]`. Ikkinchi elementning name'ini qaytaruvchi `getSecondName(users)` yozing. (Faqat destructuring ishlating).",
    "startingCode": "function getSecondName(users) {\n  // Kodni yozing\n}",
    "hint": "const [, { name }] = users; return name;",
    "test": "const fn = new Function(code + '; return getSecondName;')(); if(fn([{name:'1'},{name:'2'}]) !== '2') return 'Xato'; return null;"
  },
  {
    "id": 12,
    "title": "Computed Property Name Destructuring",
    "instruction": "Dinamik kalit orqali obyekt xossasini ajratib oling. `extractValue(obj, key)` yozing va obj ichidan shu key'dagi qiymatni destructuring bilan (ya'ni `const { [key]: value } = obj`) oling.",
    "startingCode": "function extractValue(obj, key) {\n  // Kodni yozing\n}",
    "hint": "const { [key]: val } = obj; return val;",
    "test": "const fn = new Function(code + '; return extractValue;')(); if(fn({x:99}, 'x') !== 99) return 'Xato'; return null;"
  },
  {
    "id": 13,
    "title": "Stringni massivga ajratish",
    "instruction": "Satrni spread operatori bilan harflarga massiv shaklida yoyib, dastlabki ikki harfni qaytaruvchi `getFirstTwoChars(str)` tuzing (masalan `['s', 't']`).",
    "startingCode": "function getFirstTwoChars(str) {\n  // Kodni yozing\n}",
    "hint": "const [first, second] = [...str]; return [first, second];",
    "test": "const fn = new Function(code + '; return getFirstTwoChars;')(); const r = fn('hi'); if(r[0]!=='h'||r[1]!=='i') return 'Xato'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da destruptizatsiya (destructuring) nima?",
    "options": [
      "Massivlarni o'chirish va obyektlarni xotiradan tozalash usuli",
      "Massiv elementlari va obyekt xossalarini alohida o'zgaruvchilarga oson ajratib olish (ochish) sintaksisi",
      "Obyektlarni yangi class-ga o'tkazish uchun mo'ljallangan metod",
      "Obyekt qiymatlarini faqat o'qish uchun bloklovchi operator"
    ],
    "correctAnswer": 1,
    "explanation": "Destructuring (ma'lumotlarni ochish) massiv yoki obyekt ichidagi qiymatlarni bitta qatorda alohida o'zgaruvchilarga o'zlashtirish imkonini beruvchi qulay ES6 sintaksisidir."
  },
  {
    "id": 2,
    "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst colors = ['red', 'green', 'blue'];\nconst [, color] = colors;\nconsole.log(color);\n```",
    "options": [
      "red",
      "green",
      "blue",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Massiv destruptizatsiyasida vergullar orqali elementlarni tashlab ketish mumkin. Birinchi element tashlab ketilgan (red), shuning uchun color o'zgaruvchisiga ikkinchi element ya'ni 'green' yuklanadi."
  },
  {
    "id": 3,
    "question": "Obyektni destruptizatsiya qilishda o'zgaruvchini boshqa nom bilan saqlash (qayta nomlash) qanday sintaksis orqali amalga oshiriladi?",
    "options": [
      "const { oldName as newName } = obj;",
      "const { oldName: newName } = obj;",
      "const { oldName -> newName } = obj;",
      "const { oldName = newName } = obj;"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da obyekt xossalarini qayta nomlash uchun ikki nuqta (:) operatori ishlatiladi, masalan: const { oldName: newName } = obj;."
  },
  {
    "id": 4,
    "question": "Obyektda mavjud bo'lmagan xossa destruptizatsiya qilinganda unga standart (default) qiymat qanday beriladi?",
    "options": [
      "const { role = 'guest' } = user;",
      "const { role: 'guest' } = user;",
      "const { role as 'guest' } = user;",
      "const { role == 'guest' } = user;"
    ],
    "correctAnswer": 0,
    "explanation": "Default qiymat berish uchun tenglik (=) belgisidan foydalaniladi. Agarda obyektda role xossasi bo'lmasa yoki undefined bo'lsa, unga 'guest' biriktiriladi."
  },
  {
    "id": 5,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst user = { name: 'Ali', age: 25 };\nconst { name: userName, age } = user;\nconsole.log(name);\n```",
    "options": [
      "Ali",
      "25",
      "ReferenceError yoki xatolik yuz beradi",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "Obyekt xossasini name: userName ko'rinishida qayta nomlaganimizda, faqat yangi yaratilgan userName o'zgaruvchisi mavjud bo'ladi. name nomli o'zgaruvchi umuman yaratilmaganligi sababli ReferenceError yuzaga keladi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilgandan keyin x va y ning qiymati nima bo'ladi?\n```javascript\nlet x = 5, y = 10;\n[x, y] = [y, x];\n```",
    "options": [
      "x = 5, y = 10",
      "x = 10, y = 5",
      "x = 10, y = 10",
      "x = 5, y = 5"
    ],
    "correctAnswer": 1,
    "explanation": "Massiv destruptizatsiyasi yordamida o'zgaruvchilar qiymatini uchinchi vaqtinchalik o'zgaruvchisiz osongina almashtirish mumkin. [x, y] = [y, x] yozilganda x 10 ga, y esa 5 ga teng bo'ladi."
  },
  {
    "id": 7,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nconst { email } = null;\n```",
    "options": [
      "email o'zgaruvchisi undefined bo'ladi",
      "email o'zgaruvchisi null bo'ladi",
      "TypeError (Cannot destructure property of null) yuz beradi",
      "Dastur xatoliksiz, jimgina ishini davom ettiradi"
    ],
    "correctAnswer": 2,
    "explanation": "null va undefined qiymatlarini destruptizatsiya qilib bo'lmaydi, chunki ulardan xossalarni o'qib bo'lmaydi. Bu TypeError xatoligiga olib keladi."
  },
  {
    "id": 8,
    "question": "Rest operatori (...rest) yordamida obyektning qolgan xossalarini ajratib olayotganda qaysi shart bajarilishi majburiy?",
    "options": [
      "Rest operatoridan faqat bitta xossani olishda foydalanish mumkin",
      "Rest operatori har doim destruptizatsiya ro'yxatining eng oxirida yozilishi shart",
      "Rest operatori faqat birinchi indeksda turishi kerak",
      "Rest operatori faqat sonli xossalar uchun ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Rest operatori (...rest) qolgan barcha xossalarni yig'ib olishi uchun u har doim destruptizatsiya sintaksisida eng oxirgi element bo'lib kelishi shart."
  },
  {
    "id": 9,
    "question": "Quyidagi kod bajarilgach rest ning qiymati nima bo'ladi?\n```javascript\nconst [first, ...rest] = [1, 2, 3, 4];\n```",
    "options": [
      "2",
      "[2, 3, 4]",
      "[3, 4]",
      "[1, 2, 3, 4]"
    ],
    "correctAnswer": 1,
    "explanation": "Massiv destruptizatsiyasida rest operatori qolgan barcha elementlarni yangi massivga yig'adi. Shuning uchun rest massiv ko'rinishida [2, 3, 4] bo'ladi."
  },
  {
    "id": 10,
    "question": "Ichma-ich (nested) joylashgan xossalarni destruptizatsiya qilishda qanday xavf bor?",
    "options": [
      "Ichki obyektlar har doim readonly bo'lib qoladi",
      "Agar tashqi obyekt mavjud bo'lmasa (undefined bo'lsa), TypeError yuzaga keladi",
      "Ichki destruptizatsiya kodni sekinlashtiradi va xotirani to'ldiradi",
      "Faqat bitta darajagacha ichkariga kirish mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Ichma-ich destruptizatsiyada (masalan, const { address: { city } } = user;), agar address xossasi mavjud bo'lmasa (undefined bo'lsa), undefineddan cityni o'qishga urinish tufayli TypeError yuz beradi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilgandan keyin city o'zgaruvchisining qiymati nima bo'ladi?\n```javascript\nconst user = { name: 'Vali' };\nconst { address: { city } = { city: 'Toshkent' } } = user;\n```",
    "options": [
      "undefined",
      "Toshkent",
      "TypeError",
      "ReferenceError"
    ],
    "correctAnswer": 1,
    "explanation": "user obyektida address xossasi mavjud bo'lmagani (undefined bo'lgani) untuk default qiymat sifatida berilgan { city: 'Toshkent' } obyekti ishlatiladi va undan city qiymati ochib olinib, 'Toshkent'ga teng bo'ladi."
  },
  {
    "id": 12,
    "question": "Satrni (string) destruptizatsiya qilish mumkinmi? Masalan: `const [char1, char2] = \"JS\";`",
    "options": [
      "Yo'q, faqat obyekt va massivlarni destruptizatsiya qilish mumkin",
      "Ha, chunki satrlar iteratsiya qilinuvchi (iterable) obyektlardir, char1 'J' va char2 'S' bo'ladi",
      "Faqat typeof 'object' bo'lgan satrlarda ishlaydi",
      "Ha, lekin ikkala o'zgaruvchi ham butun satrni oladi"
    ],
    "correctAnswer": 1,
    "explanation": "Satrlar (strings) iteratsiya qilinuvchi obyektlar bo'lgani sababli ularni xuddi massivlar kabi destruptizatsiya qilish mumkin. Natijada har bir belgi alohida o'zgaruvchiga o'zlashtiriladi."
  }
]

};

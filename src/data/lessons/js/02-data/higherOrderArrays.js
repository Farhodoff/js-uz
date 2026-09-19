export const higherOrderArrays = {
  id: "higherOrderArrays",
  title: "Massivlar uchun Higher Order Metodlar",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy (Sodda Tushuntirish)

### Higher-Order Array Methods (Yuqori Tartibli Metodlar) nima?
Higher-order array metodlari — bu massiv elementlarini aylanish jarayonini avtomatlashtiradigan va parametr sifatida boshqa funksiyani (callback) qabul qiladigan metodlardir. Oldin biz massiv elementlarini aylanish uchun \\\`for\\\` yoki \\\`while\\\` tsikllaridan foydalangan bo'lsak, endi maxsus tayyor metodlar orqali kodni qisqaroq, o'qilishi osonroq va xatolardan xoli qilamiz.

### Real hayotiy o'xshatish: Zavod Konveyeri
Tasavvur qiling, siz olma zavodining menejerisiz. Sizga bog'dan bir quti olmalar keldi (massiv).
* **\\\`forEach\\\` (Sanoq):** Siz faqat har bir olmani sanab, jami nechta olma borligini bilib olasiz. Siz konveyerga aralashmaysiz va yangi quti olmaysiz.
* **\\\`map\\\` (Qayta ishlash):** Siz konveyerdan o'tayotgan har bir olmani olib, tozalab, bo'laklarga bo'lib, **yangi qutiga** joylaysiz (yangi massiv). Eski qutidagi olmalar o'zgarishsiz qoladi.
* **\\\`filter\\\` (Saralash):** Konveyerdan faqat qip-qizil, chiroyli olmalarni tanlab olasiz va **yangi qutiga** solasiz. Chirigan yoki ko'k olmalar tashlab yuboriladi.
* **\\\`reduce\\\` (Siqish/Sharbat tayyorlash):** Siz barcha olmalarni bitta sharbat chiqargichga solasiz. Natijada sizda ko'plab olmalar o'rniga bitta yagona stakan olma sharbati bo'ladi (yagona qiymat).

---

## 2. ⚙️ Deep Dive (Under the hood, Memory, V8 Engine, Performance)

### V8 Engine qanday ishlaydi?
Yuqori tartibli metodlar JavaScript-ning asosiy dvigateli bo'lgan V8 da maxsus optimizatsiyalarga ega. C++ da yozilgan ichki makon (built-in) kod sifatida ular juda tez bajariladi. Biroq, har bir element uchun \\\`callback\\\` funksiyasi chaqirilganligi sababli, call stack'ga har bir iteratsiya uchun yangi frame qo'shiladi. Katta massivlarda bu *overhead* (qo'shimcha yuklanish) yaratishi mumkin.

\\\`\\\`\\\`javascript
// V8 dvigateli orqa fonda .map() ni shundayroq tushunadi (Polyfill):
Array.prototype.myMap = function(callback) {
  const result = new Array(this.length); // Xotiradan oldindan joy ajratish
  for (let i = 0; i < this.length; i++) {
    // Array teshiklari (sparse arrays) ni hisobga olish
    if (i in this) {
      result[i] = callback(this[i], i, this);
    }
  }
  return result;
};
\\\`\\\`\\\`

### Memory (Xotira) qoidalari
- **\\\`map\\\` va \\\`filter\\\`** har doim xotirada **yangi massiv** yaratadi.
- Agar siz \\\`[1, 2, 3].map(x => x).filter(x => x).reduce(...)\\\` kabi zanjirlar (chaining) dan foydalansangiz, oraliqda bir nechta vaqtinchalik massivlar yaratiladi va Garbage Collector (Axlat yig'uvchi) uchun qo'shimcha ish paydo bo'ladi.
- **Xotira oqishlari (Memory Leaks):** Agar siz \\\`callback\\\` ichida tashqi doiradagi (closure) katta obyektlarga havola (reference) saqlab qolsangiz va ular tozalanmasa, bu xotira oqishlariga olib kelishi mumkin.

### Performance (Samaradorlik)
Micro-benchmarklarda \\\`for\\\` tsikli \\\`map\\\` yoki \\\`forEach\\\` dan ancha tezroq. Chunki oddiy \\\`for\\\` da funksiya chaqirilishi (function context creation, arguments passing) yo'q. Agar siz 1 milliondan ortiq ma'lumot (Big Data) bilan client-side da ishlayotgan bo'lsangiz, \\\`for\\\` loop ishlatgan ma'qul.

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases (Noodatiy holatlar)
1. **Sparse Arrays (Teshik massivlar):**
   Agar massivda bo'sh joylar bo'lsa (\\\`[1, , 3]\\\`), metodlar bo'sh elementlarni tashlab o'tadi (skip qiladi).
   \\\`\\\`\\\`javascript
   const arr = [1, , 3];
   const mapped = arr.map(x => x * 2);
   console.log(mapped); // [2, empty, 6]
   \\\`\\\`\\\`
2. **Mutating the Array during Iteration (Aylanish davomida massivni o'zgartirish):**
   Agar siz \\\`forEach\\\` yoki \\\`map\\\` ishlayotgan vaqtda massivga element qo'shsangiz, tsikl yangi elementlarni aylanmaydi (u metod chaqirilgan paytdagi uzunlik bo'yicha ishlaydi).
3. **Async Callbacks (Asinxron Callbacks):**
   \\\`forEach\\\` asinxron kodni (async/await) kutmaydi! Agar promislar bilan ishlasangiz \\\`Promise.all(arr.map(async () => ...))\\\` ishlatishingiz yoki \\\`for...of\\\` dan foydalanishingiz kerak.

### Senior Interview Questions
**1. \\\`thisArg\\\` parametri nima va uni qachon ishlatish kerak?**
Ko'pgina metodlar ikkinchi parametr sifatida \\\`thisArg\\\` ni oladi (\\\`arr.map(callback, thisArg)\\\`). Lekin agar callback sifatida arrow function yozsangiz, u o'zining leksik \\\`this\\\` contextiga ega bo'lgani uchun \\\`thisArg\\\` butunlay e'tiborsiz qoldiriladi. Buni tushuntirib bera olishingiz senior darajadagi bilimlarni anglatadi.

**2. \\\`[1, 2, 3].map(parseInt)\\\` natijasi qanday bo'ladi va nima uchun?**
Natija: \\\`[1, NaN, NaN]\\\`. Sababi \\\`map\\\` callbackga 3 ta argument uzatadi: \\\`(value, index, array)\\\`. \\\`parseInt\\\` esa 2 ta argument oladi: \\\`(string, radix)\\\`. U \\\`parseInt(1, 0)\\\`, \\\`parseInt(2, 1)\\\` va \\\`parseInt(3, 2)\\\` tarzida ishlaydi, bu esa matematik xatoliklarni beradi.

**3. \\\`Array.prototype.reduce\\\` metodini polifillini qanday yozasiz, ayniqsa initialValue (boshlang'ich qiymat) yo'q holatini qanday handle qilasiz?**
Agar \\\`initialValue\\\` berilmasa, massivning birinchi elementi accumulator sifatida olinib, tsikl 1-indeksdan boshlanishi kerak. Agar massiv bo'sh bo'lsa va \\\`initialValue\\\` bo'lmasa, TypeError xatosi tashlanishi kerak.

---

## 4. 📊 Mermaid Diagram: Array Methods Pipeline

Quyidagi chizmada array ma'lumotlarini qanday oqim (pipeline) asosida transformatsiya qilinishi tasvirlangan:

\\\`\\\`\\\`mermaid
graph TD
    A[Original Array: 1, 2, 3, 4] --> B{"filter: x > 2"}
    B -->|True| C[Filtered Array: 3, 4]
    B -->|False| D[Discarded: 1, 2]
    C --> E{"map: x * 2"}
    E --> F[Mapped Array: 6, 8]
    F --> G{"reduce: sum"}
    G --> H((Final Value: 14))

    style A fill:#e1f5fe,stroke:#01579b
    style C fill:#fff3e0,stroke:#e65100
    style F fill:#e8f5e9,stroke:#1b5e20
    style H fill:#fce4ec,stroke:#880e4f,stroke-width:2px
\\\`\\\`\\\`
`,
  exercises: [
    {
      "id": 1,
      "title": "Foydalanuvchilarni Filtrlash va Ismlarini Olish",
      "instruction": "Sizga foydalanuvchilar obyekti massivi beriladi. Har bir foydalanuvchi `name` (ism), `age` (yosh) va `isActive` (faol) xususiyatlariga ega. Siz faol bo'lgan (`isActive: true`) va yoshi 18 dan katta yoki teng bo'lgan foydalanuvchilarning faqat ismlarini massiv ko'rinishida qaytaruvchi `getActiveAdultNames(users)` funksiyasini yozishingiz kerak. Buni `.filter()` va `.map()` metodlaridan foydalanib bajaring.",
      "startingCode": "function getActiveAdultNames(users) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "users.filter(user => user.isActive && user.age >= 18).map(user => user.name) orqali yechishingiz mumkin.",
      "test": "const sandbox = new Function(code + '; return getActiveAdultNames;');\nconst fn = sandbox();\nconst testUsers = [\n  { name: 'Ali', age: 20, isActive: true },\n  { name: 'Vali', age: 16, isActive: true },\n  { name: 'Sardor', age: 25, isActive: false },\n  { name: 'Olim', age: 18, isActive: true }\n];\nconst result = fn(testUsers);\nif (!Array.isArray(result)) return 'Natija massiv bo\\'lishi kerak';\nif (result.length !== 2) return 'Natijadagi elementlar soni noto\\'g\\'ri';\nif (result[0] !== 'Ali' || result[1] !== 'Olim') return 'Natijadagi ismlar noto\\'g\\'ri. Kutilgan: [\"Ali\", \"Olim\"], Olingan: ' + JSON.stringify(result);\nreturn null;"
    },
    {
      "id": 2,
      "title": "Kategoriyalar Bo'yicha Mahsulotlar Narxini Jamlash",
      "instruction": "Sizga mahsulotlar ro'yxati (massiv) beriladi. Har bir mahsulot `name`, `category` (kategoriya) va `price` (narx) xususiyatlariga ega. Berilgan kategoriya bo'yicha barcha mahsulotlar narxining umumiy yig'indisini hisoblaydigan `getTotalPriceByCategory(products, category)` funksiyasini yozing. Buning uchun `.filter()` va `.reduce()` yoki faqat `.reduce()` metodidan foydalaning. Agar mahsulotlar topilmasa, `0` qaytarsin.",
      "startingCode": "function getTotalPriceByCategory(products, category) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "Avval berilgan kategoriya bo'yicha filter qiling, so'ngra reduce yordamida price larni jamlang. reduce boshlang'ich qiymatini 0 qilib belgilashni unutmang.",
      "test": "const sandbox = new Function(code + '; return getTotalPriceByCategory;');\nconst fn = sandbox();\nconst products = [\n  { name: 'Telefon', category: 'electronics', price: 500 },\n  { name: 'Kitob', category: 'books', price: 15 },\n  { name: 'Noutbuk', category: 'electronics', price: 1200 },\n  { name: 'Ruchka', category: 'books', price: 2 }\n];\nconst sumElec = fn(products, 'electronics');\nconst sumBooks = fn(products, 'books');\nconst sumEmpty = fn(products, 'clothing');\nif (sumElec !== 1700) return 'Electronics kategoriyasi bo\\'yicha yig\\'indi xato. Kutilgan: 1700, Olingan: ' + sumElec;\nif (sumBooks !== 17) return 'Books kategoriyasi bo\\'yicha yig\\'indi xato. Kutilgan: 17, Olingan: ' + sumBooks;\nif (sumEmpty !== 0) return 'Mavjud bo\\'lmagan kategoriya uchun 0 qaytishi kerak';\nreturn null;"
    },
    {
      "id": 3,
      "title": "Talabalarni Guruhlash",
      "instruction": "Sizga talabalar massivi beriladi. Har bir talaba `name` (ism) va `grade` (baho: 'A', 'B', 'C' va h.k.) xususiyatlariga ega. Talabalarni baholari bo'yicha guruhlaydigan `groupStudentsByGrade(students)` funksiyasini yozing. Funksiya qaytaradigan obyekt kalitlari baholar bo'lishi va qiymatlari o'sha bahoni olgan talabalarning ismlari massividan iborat bo'lishi kerak. Buning uchun `.reduce()` metodidan foydalaning.",
      "startingCode": "function groupStudentsByGrade(students) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "reduce metodining boshlang'ich qiymatini bo'sh obyekt `{}` qilib oling. reduce ichida, agar `acc[student.grade]` mavjud bo'lmasa, uni bo'sh massiv `[]` sifatida e'lon qiling, keyin talabaning ismini unga push qiling.",
      "test": "const sandbox = new Function(code + '; return groupStudentsByGrade;');\nconst fn = sandbox();\nconst students = [\n  { name: 'Ali', grade: 'A' },\n  { name: 'Vali', grade: 'B' },\n  { name: 'Sardor', grade: 'A' },\n  { name: 'Olim', grade: 'C' },\n  { name: 'Eldor', grade: 'B' }\n];\nconst result = fn(students);\nif (typeof result !== 'object' || result === null) return 'Natija obyekt bo\\'lishi kerak';\nif (!result.A || !result.B || !result.C) return 'Natija obyektida barcha baholar kalit sifatida mavjud emas';\nif (result.A.length !== 2 || !result.A.includes('Ali') || !result.A.includes('Sardor')) return 'A baho guruhi xato';\nif (result.B.length !== 2 || !result.B.includes('Vali') || !result.B.includes('Eldor')) return 'B baho guruhi xato';\nif (result.C.length !== 1 || result.C[0] !== 'Olim') return 'C baho guruhi xato';\nreturn null;"
    },
    {
      "id": 4,
      "title": "forEach bilan Massiv Elementlarini O'zgartirish",
      "instruction": "Sizga sonlar massivi beriladi. `doubleInPlace(arr)` funksiyasini yozing. Bu funksiya `.forEach()` metodi yordamida massivning har bir elementini 2 ga ko'paytirsin va shu massivni qaytarsin (yangi massiv yaratmasdan, asl massivni o'zgartiring).",
      "startingCode": "function doubleInPlace(arr) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "arr.forEach((val, index) => { arr[index] = val * 2; }) yordamida har bir elementni indeks orqali 2 ga ko'paytiring va oxirida arr ni qaytaring.",
      "test": "const sandbox = new Function(code + '; return doubleInPlace;');\nconst fn = sandbox();\nconst testArr = [1, 2, 3, 4];\nconst result = fn(testArr);\nif (!Array.isArray(result)) return 'Natija massiv bo\\'lishi kerak';\nif (result !== testArr) return 'Asl massivni qaytarish kerak, yangi massiv emas';\nif (result[0] !== 2 || result[1] !== 4 || result[2] !== 6 || result[3] !== 8) return 'Elementlar 2 ga ko\\'paytirilmadi. Kutilgan: [2,4,6,8], Olingan: ' + JSON.stringify(result);\nreturn null;"
    },
    {
      "id": 5,
      "title": "find va findIndex bilan Qidirish",
      "instruction": "Sizga mahsulotlar massivi beriladi. Har bir mahsulot `id`, `name` va `price` xususiyatlariga ega. Berilgan `id` bo'yicha mahsulotni topib, uning massivdagi indeksini qaytaruvchi `getProductIndex(products, id)` funksiyasini yozing. `.findIndex()` metodidan foydalaning. Agar topilmasa `-1` qaytarsin.",
      "startingCode": "function getProductIndex(products, id) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return products.findIndex(product => product.id === id);",
      "test": "const sandbox = new Function(code + '; return getProductIndex;');\nconst fn = sandbox();\nconst products = [\n  { id: 10, name: 'Telefon', price: 500 },\n  { id: 20, name: 'Noutbuk', price: 1200 },\n  { id: 30, name: 'Planshet', price: 300 }\n];\nif (fn(products, 20) !== 1) return 'id=20 uchun indeks 1 bo\\'lishi kerak, olingan: ' + fn(products, 20);\nif (fn(products, 10) !== 0) return 'id=10 uchun indeks 0 bo\\'lishi kerak';\nif (fn(products, 99) !== -1) return 'Mavjud bo\\'lmagan id uchun -1 qaytishi kerak';\nreturn null;"
    },
    {
      "id": 6,
      "title": "some va every bilan Tekshirish",
      "instruction": "Sizga talabalar massivi beriladi. Har bir talaba `name` va `passed` (boolean) xususiyatlariga ega. Ikkita funksiya yozing:\n1) `didAllPass(students)` — barcha talabalar imtihondan o'tganligini tekshirsin (`.every()` ishlatilsin).\n2) `didAnyPass(students)` — kamida bitta talaba o'tganligini tekshirsin (`.some()` ishlatilsin).\nIkkala funksiya ham `true` yoki `false` qaytarsin.",
      "startingCode": "function didAllPass(students) {\n  // Kodni shu yerda yozing\n}\n\nfunction didAnyPass(students) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": ".every() barcha elementlar uchun shart to'g'ri bo'lsa true qaytaradi, .some() esa kamida bittasi uchun to'g'ri bo'lsa true qaytaradi.",
      "test": "const sandbox = new Function(code + '; return { didAllPass, didAnyPass };');\nconst fns = sandbox();\nconst allPassed = [{ name: 'Ali', passed: true }, { name: 'Vali', passed: true }];\nconst somePassed = [{ name: 'Ali', passed: true }, { name: 'Vali', passed: false }];\nconst nonePassed = [{ name: 'Ali', passed: false }, { name: 'Vali', passed: false }];\nif (fns.didAllPass(allPassed) !== true) return 'Barchasi o\\'tganda didAllPass true qaytarishi kerak';\nif (fns.didAllPass(somePassed) !== false) return 'Hammasi o\\'tmagan bo\\'lsa didAllPass false qaytarishi kerak';\nif (fns.didAnyPass(somePassed) !== true) return 'Kamida bittasi o\\'tganda didAnyPass true qaytarishi kerak';\nif (fns.didAnyPass(nonePassed) !== false) return 'Hech biri o\\'tmagan bo\\'lsa didAnyPass false qaytarishi kerak';\nreturn null;"
    },
    {
      "id": 7,
      "title": "map bilan Obyektlarni Transformatsiya qilish",
      "instruction": "Sizga foydalanuvchilar massivi beriladi. Har bir foydalanuvchi `firstName` va `lastName` xususiyatlariga ega. Har bir foydalanuvchini `{ fullName: 'Ism Familiya' }` ko'rinishidagi yangi obyektga aylantiruvchi `getFullNames(users)` funksiyasini yozing. `.map()` metodidan foydalaning.",
      "startingCode": "function getFullNames(users) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return users.map(user => ({ fullName: user.firstName + ' ' + user.lastName }));",
      "test": "const sandbox = new Function(code + '; return getFullNames;');\nconst fn = sandbox();\nconst users = [\n  { firstName: 'Ali', lastName: 'Valiyev' },\n  { firstName: 'Sardor', lastName: 'Karimov' }\n];\nconst result = fn(users);\nif (!Array.isArray(result)) return 'Natija massiv bo\\'lishi kerak';\nif (result.length !== 2) return 'Natijada 2 ta element bo\\'lishi kerak';\nif (!result[0].fullName || result[0].fullName !== 'Ali Valiyev') return 'Birinchi element fullName xato. Kutilgan: Ali Valiyev';\nif (!result[1].fullName || result[1].fullName !== 'Sardor Karimov') return 'Ikkinchi element fullName xato. Kutilgan: Sardor Karimov';\nreturn null;"
    },
    {
      "id": 8,
      "title": "reduce bilan Eng Katta Qiymatni Topish",
      "instruction": "Sizga sonlar massivi beriladi. `.reduce()` metodidan foydalanib, massivdagi eng katta sonni topadigan `findMax(numbers)` funksiyasini yozing. `Math.max` ishlatmang — faqat `reduce` ichidagi solishtirish orqali bajaring.",
      "startingCode": "function findMax(numbers) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return numbers.reduce((max, current) => current > max ? current : max, numbers[0]);",
      "test": "const sandbox = new Function(code + '; return findMax;');\nconst fn = sandbox();\nif (fn([3, 7, 2, 9, 4]) !== 9) return 'Kutilgan: 9, Olingan: ' + fn([3, 7, 2, 9, 4]);\nif (fn([-5, -1, -10]) !== -1) return 'Manfiy sonlarda kutilgan: -1, Olingan: ' + fn([-5, -1, -10]);\nif (fn([42]) !== 42) return 'Bitta elementli massivda kutilgan: 42';\nif (code.includes('Math.max')) return 'Math.max ishlatmasdan, faqat reduce orqali bajaring';\nreturn null;"
    },
    {
      "id": 9,
      "title": "Zanjirlash (Chaining) Pipeline",
      "instruction": "Sizga buyurtmalar massivi beriladi. Har bir buyurtma `status` ('completed' yoki 'pending'), `amount` (summa) va `discount` (chegirma foizi, 0 dan 100 gacha) xususiyatlariga ega. Faqat `completed` bo'lgan buyurtmalarning chegirmadan keyingi (`amount * (1 - discount / 100)`) summalarini hisoblaydigan `getTotalRevenue(orders)` funksiyasini yozing. `.filter()`, `.map()` va `.reduce()` metodlarini zanjir shaklida ulang.",
      "startingCode": "function getTotalRevenue(orders) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "orders.filter(o => o.status === 'completed').map(o => o.amount * (1 - o.discount / 100)).reduce((sum, val) => sum + val, 0)",
      "test": "const sandbox = new Function(code + '; return getTotalRevenue;');\nconst fn = sandbox();\nconst orders = [\n  { status: 'completed', amount: 1000, discount: 10 },\n  { status: 'pending', amount: 500, discount: 0 },\n  { status: 'completed', amount: 200, discount: 50 }\n];\nconst result = fn(orders);\nif (result !== 1000) return 'Kutilgan: 1000 (900 + 100), Olingan: ' + result;\nif (fn([]) !== 0) return 'Bo\\'sh massiv uchun 0 qaytishi kerak';\nreturn null;"
    },
    {
      "id": 10,
      "title": "flatMap bilan Ichki Massivlarni Yoyish",
      "instruction": "Sizga bo'limlar massivi beriladi. Har bir bo'lim `department` (nomi) va `employees` (xodimlar ismlari massivi) xususiyatlariga ega. Barcha bo'limlardagi barcha xodimlar ismlarini bitta tekis massivda qaytaruvchi `getAllEmployees(departments)` funksiyasini yozing. `.flatMap()` metodidan foydalaning.",
      "startingCode": "function getAllEmployees(departments) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return departments.flatMap(dept => dept.employees);",
      "test": "const sandbox = new Function(code + '; return getAllEmployees;');\nconst fn = sandbox();\nconst departments = [\n  { department: 'IT', employees: ['Ali', 'Vali'] },\n  { department: 'HR', employees: ['Sardor'] },\n  { department: 'Sales', employees: ['Olim', 'Eldor', 'Aziz'] }\n];\nconst result = fn(departments);\nif (!Array.isArray(result)) return 'Natija massiv bo\\'lishi kerak';\nif (result.length !== 6) return 'Jami 6 ta xodim bo\\'lishi kerak, olingan: ' + result.length;\nif (result[0] !== 'Ali' || result[2] !== 'Sardor' || result[5] !== 'Aziz') return 'Xodimlar tartibi xato. Olingan: ' + JSON.stringify(result);\nreturn null;"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "JavaScript-da massivlar uchun 'Higher Order' (yuqori tartibli) metodlar nima?",
      "options": [
        "Faqat massivning uzunligini qaytaradigan metodlar",
        "Boshqa bir funksiyani (callback) parametr sifatida qabul qiladigan yoki funksiya qaytaradigan metodlar",
        "Faqat asinxron ishlaydigan massiv metodlari",
        "Massiv elementlarini butunlay o'chirib tashlaydigan metodlar"
      ],
      "correctAnswer": 1,
      "explanation": "Higher-order funksiyalar yoki metodlar boshqa funksiyalarni parametr (argument) sifatida qabul qiladi yoki natija sifatida funksiya qaytaradi. `.map()`, `.filter()`, `.reduce()` kabilar bunga misoldir."
    },
    {
      "id": 2,
      "question": "Quyidagi metodlardan qaysi biri chaqirilganda asl massivni o'zgartirmaydi va yangi massiv qaytaradi?",
      "options": [
        "`.forEach()`",
        "`.push()`",
        "`.map()`",
        "`.splice()`"
      ],
      "correctAnswer": 2,
      "explanation": "`.map()` metodi asl massiv elementlarini o'zgartirmasdan, har bir element ustida callback funksiyani bajaradi va natijalardan iborat yangi massiv qaytaradi. `forEach` undefined qaytaradi, `push` va `splice` esa asl massivni mutatsiyaga uchratadi."
    },
    {
      "id": 3,
      "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst nums = [1, 2, 3];\nconst res = nums.map(x => { x * 2 });\nconsole.log(res);\n```",
      "options": [
        "`[2, 4, 6]`",
        "`[undefined, undefined, undefined]`",
        "`[1, 2, 3]`",
        "`TypeError`"
      ],
      "correctAnswer": 1,
      "explanation": "Callback funksiyada figurali qavslar `{}` ishlatilganda, qiymatni qaytarish uchun aniq `return` kalit so'zi yozilishi shart. Aks holda callback `undefined` qaytaradi va yangi massiv `[undefined, undefined, undefined]` bo'ladi."
    },
    {
      "id": 4,
      "question": "Massivdan shartga mos keladigan birinchi elementning o'zini topish uchun qaysi metod eng qulay?",
      "options": [
        "`.filter()`",
        "`.findIndex()`",
        "`.find()`",
        "`.some()`"
      ],
      "correctAnswer": 2,
      "explanation": "`.find()` metodi shartga mos keladigan birinchi elementning qiymatini qaytaradi. Agar mos element topilmasa, `undefined` qaytaradi. `.filter()` esa barcha mos elementlardan iborat massiv qaytaradi."
    },
    {
      "id": 5,
      "question": "Bo'sh massivda boshlang'ich qiymat (initial value) ko'rsatmasdan `.reduce()` metodini chaqirish nima bilan yakunlanadi?",
      "options": [
        "`0` qaytaradi",
        "`undefined` qaytaradi",
        "`TypeError` xatoligini beradi",
        "Bo'sh massiv `[]` qaytaradi"
      ],
      "correctAnswer": 2,
      "explanation": "Agar massiv bo'sh bo'lsa va `.reduce()` metodiga boshlang'ich qiymat berilmagan bo'lsa, JavaScript `TypeError: Reduce of empty array with no initial value` xatoligini tashlaydi."
    },
    {
      "id": 6,
      "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst arr = [1, 2, 3, 4];\nconst val = arr.reduce((acc, curr) => acc + curr, 10);\nconsole.log(val);\n```",
      "options": [
        "`10`",
        "`20`",
        "`14`",
        "`24`"
      ],
      "correctAnswer": 1,
      "explanation": "`.reduce()` metodiga boshlang'ich qiymat sifatida `10` berilgan. Shunda akumulyator (`acc`) 10 dan boshlanadi va unga massiv elementlari (1, 2, 3, 4) qo'shib chiqiladi. Jami: 10 + 10 = 20."
    },
    {
      "id": 7,
      "question": "`.some()` va `.every()` metodlarining asosiy farqi nimada?",
      "options": [
        "`.some()` yangi massiv qaytaradi, `.every()` esa bitta qiymat qaytaradi",
        "`.some()` shartga kamida bitta element mos kelganda `true` qaytaradi, `.every()` esa barcha elementlar shartga mos kelgandagina `true` qaytaradi",
        "`.every()` shartga kamida bitta element mos kelganda `true` qaytaradi, `.some()` esa barcha elementlar mos kelganda",
        "Ular o'rtasida farq yo'q, ikkalasi ham bir xil ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "`.some()` (ba'zi) kamida bitta element shartni bajarsa `true` qaytaradi. `.every()` (barcha) esa faqat va faqat massivdagi barcha elementlar shartni bajargandagina `true` qaytaradi."
    },
    {
      "id": 8,
      "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst items = [1, 2, 3];\nconst res = items.forEach(x => x * 2);\nconsole.log(res);\n```",
      "options": [
        "`[2, 4, 6]`",
        "`undefined`",
        "`[1, 2, 3]`",
        "`null`"
      ],
      "correctAnswer": 1,
      "explanation": "`.forEach()` metodi har doim `undefined` qaytaradi. U massiv elementlarini shunchaki aylanib chiqish (tsikl) uchun mo'ljallangan va `.map()` kabi yangi massiv hosil qilmaydi."
    },
    {
      "id": 9,
      "question": "`.filter()` metodining callback funksiyasi elementni natijaviy massivda saqlab qolish uchun qanday qiymat qaytarishi kerak?",
      "options": [
        "Faqat `1` sonini",
        "Truthy (rost) qiymat",
        "Falsy (yolg'on) qiymat",
        "Yangi massiv obyekti"
      ],
      "correctAnswer": 1,
      "explanation": "`.filter()` callback funksiyasi har bir element uchun 'truthy' (yoki `true`) qiymat qaytarsa, o'sha element yangi massivga kiritiladi, aks holda (falsy yoki `false` bo'lsa) tashlab yuboriladi."
    },
    {
      "id": 10,
      "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst numbers = [10, 5, 8];\nconst double = numbers.map(function(num) {\n  return num * this.factor;\n}, { factor: 2 });\nconsole.log(double);\n```",
      "options": [
        "`[20, 10, 16]`",
        "`[NaN, NaN, NaN]`",
        "`TypeError: Cannot read properties of undefined`",
        "`[10, 5, 8]`"
      ],
      "correctAnswer": 0,
      "explanation": "Ko'pgina higher-order massiv metodlari (`map`, `filter`, `forEach` va h.k.) ikkinchi argument sifatida `thisArg`ni qabul qiladi. Biz bu yerda `{ factor: 2 }` obyektini uzatdik, shuning uchun callback ichidagi `this.factor` to'g'ri ishlab `2` ga ko'paytirildi."
    },
    {
      "id": 11,
      "question": "Higher-order massiv metodlariga `thisArg` (ikkinchi argument) uzatishda arrow function (strelkali funksiya) ishlatishning qanday salbiy oqibati bor?",
      "options": [
        "Kodni sekinlashtiradi",
        "Arrow funksiyalar o'zining shaxsiy `this` kontekstiga ega emas, shuning uchun `thisArg` inobatga olinmaydi va tashqi kontekstdagi `this` ishlatiladi",
        "Sintaktik xato (`SyntaxError`) beradi",
        "Hech qanday salbiy oqibati yo'q, mukammal ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Arrow funksiyalarda `this` leksik ravishda bog'lanadi (lexical binding). Ya'ni ular o'z `this`iga ega emas va `thisArg` argumentini mutlaqo inobatga olmaydi. Shuning uchun bunday holatlarda oddiy `function` kalit so'zidan foydalanish shart."
    },
    {
      "id": 12,
      "question": "Qaysi massiv metodlari 'short-circuit evaluation' (natija aniq bo'lishi bilan zudlik bilan aylanishni to'xtatish) xususiyatiga ega?",
      "options": [
        "Faqat `.map()` va `.filter()`",
        "`.forEach()` va `.reduce()`",
        "`.some()`, `.every()`, `.find()` va `.findIndex()`",
        "Barcha yuqori tartibli metodlar oxirigacha aylanadi"
      ],
      "correctAnswer": 2,
      "explanation": "`.some()` bitta true topishi bilan, `.every()` bitta false topishi bilan, `.find()` va `.findIndex()` esa mos elementni topishi bilan tsiklni darhol to'xtatadi. Bu performance (samaradorlik) jihatidan juda foydalidir."
    }
  ]
};

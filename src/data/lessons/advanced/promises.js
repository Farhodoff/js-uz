export const promises = {
  id: "promises",
  title: "Promises (Va'dalar) va Zanjirli asinxronlik",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Promise nima?
**Promise (Va'da)** — asinxron operatsiyaning kelajakda olinadigan natijasini (muvaffaqiyatli yoki xato bilan tugashini) ifodalovchi maxsus JavaScript obyektidir. U callback funksiyalar yordamida yoziladigan murakkab asinxron kodlarni ancha soddaroq va o'qishli zanjir ko'rinishida yozish imkonini beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz do'kondan **onlayn buyurtma (masalan, telefon)** qildingiz:
* **Buyurtma berilgan lahza:** Do'kon sizga telefonni darhol bermaydi, lekin u telefonni yetkazib berish haqida **va'da (Promise)** beradi. Hozirda va'da **Kutilmoqda (Pending)** holatida.
* **Telefon muvaffaqiyatli yetib kelganda:** Va'da **Bajarildi (Fulfilled)** holatiga o'tadi. Siz telefonni olasiz (\`.then()\`).
* **Telefon omborda tugab qolsa yoki yo'lda yo'qolsa:** Va'da **Rad etildi (Rejected)** holatiga o'tadi. Sizga pulingiz qaytariladi yoki sababi tushuntiriladi (\`.catch()\`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Promise yaratish va uni tinglash)
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  
  if (success) {
    resolve("Muvaffaqiyatli yakunlandi!");
  } else {
    reject("Xatolik yuz berdi!");
  }
});

// Promiseni ishlatish
myPromise
  .then((data) => console.log("Natija:", data))  // resolve uchun
  .catch((error) => console.error("Xato:", error)) // reject uchun
  .finally(() => console.log("Amal tugadi."));     // Har doim ishlaydi
\`\`\`

### 2. Intermediate Example (Promise Chaining - Zanjir hosil qilish)
Bitta asinxron operatsiya natijasini keyingisiga uzatish:
\`\`\`javascript
function getUserId() {
  return Promise.resolve(101); // Tayyor resolved promise
}

getUserId()
  .then((id) => {
    console.log("Foydalanuvchi ID:", id);
    return id * 2; // Keyingi .then ga qiymat qaytariladi
  })
  .then((doubledId) => {
    console.log("Ikki barobar oshirilgan ID:", doubledId);
    return Promise.resolve("Yangi ma'lumot"); // Yoki yangi Promise qaytarish
  })
  .then((msg) => {
    console.log("Xabar:", msg);
  });
\`\`\`

### 3. Advanced Example (Promise Kombinatorlari - Promise.all)
Bir nechta asinxron amallarni parallel parallel boshqarish:
\`\`\`javascript
const fetchUsers = () => new Promise(res => setTimeout(() => res(["Ali", "Vali"]), 1000));
const fetchPosts = () => new Promise(res => setTimeout(() => res(["Post 1", "Post 2"]), 1500));

// Ikkala so'rov parallel boshlanadi va ikkalasi ham tugagach ishlaydi
Promise.all([fetchUsers(), fetchPosts()])
  .then(([users, posts]) => {
    console.log("Foydalanuvchilar:", users);
    console.log("Postlar:", posts);
  })
  .catch((err) => {
    console.error("Biror so'rovda xato bo'ldi:", err);
  });
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Microtask Queue (Mikrovazifalar navbati)
JavaScript asinxron kodlarni boshqarishda navbatlardan foydalanadi:
1. **Macrotasks (Task Queue):** \`setTimeout\`, \`setInterval\`, DOM hodisalari.
2. **Microtasks (Job Queue):** Promise \`.then()\`, \`.catch()\`, \`.finally()\` va \`MutationObserver\`.

> [!IMPORTANT]
> **Ustuvorlik qoidasi:** Call Stack bo'shashi bilan Event Loop birinchi navbatda **Microtask Queue** ichidagi barcha vazifalarni bajarib bo'ladi, shundan keyingina **Macrotask Queue**ga o'tadi.

\`\`\`javascript
console.log("Start");

setTimeout(() => console.log("Timeout (Macrotask)"), 0);

Promise.resolve().then(() => console.log("Promise (Microtask)"));

console.log("End");

// Natija tartibi:
// 1. Start
// 2. End
// 3. Promise (Microtask)
// 4. Timeout (Macrotask)
\`\`\`

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Promisification (Callbackni Promise-ga o'tkazish)
Eski callback ko'rinishidagi \`setTimeout\`ni zamonaviy Promise shakliga o'tkazamiz.

\`\`\`javascript
// 1. Kechikish hosil qiluvchi dynamic promise funksiyasi
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(\`Kutish tugadi: \${ms} ms\`);
    }, ms);
  });
}

// 2. Undan zanjir sifatida foydalanamiz
console.log("Kutish boshlandi...");

wait(1000)
  .then((res) => {
    console.log(res); // "Kutish tugadi: 1000 ms"
    return wait(2000); // Yana 2 soniya kutamiz
  })
  .then((res) => {
    console.log(res); // "Kutish tugadi: 2000 ms"
    console.log("Barcha jarayon muvaffaqiyatli tugadi!");
  });
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Promise zanjirida \`return\` qilishni unutish
Agar \`.then()\` ichida return yozilmasa, keyingi \`.then()\` ga qiymat o'tmaydi (\`undefined\` bo'ladi).
* **Noto'g'ri:**
  \`\`\`javascript
  Promise.resolve(5)
    .then(val => { val * 2 }) // return yo'q
    .then(res => console.log(res)); // undefined chiqadi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  Promise.resolve(5)
    .then(val => val * 2) // Qavssiz arrow funksiya avtomatik return qiladi
    .then(res => console.log(res)); // 10 chiqadi
  \`\`\`

### 2. Xatolarni ushlamaslik (Unhandled Promise Rejection)
Agarda Promise rad etilsa va uning \`.catch()\` handlerlari yozilmagan bo'lsa, dasturda jiddiy xato yuz beradi.
* **Tuzatish:** Har doim Promise zanjiri oxiriga \`.catch()\` qo'shishni unutmang.

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod / Xususiyat | Tavsifi | Misol |
| :--- | :--- | :--- |
| **\`new Promise((res, rej) => {})\`** | Yangi va'da (Promise) yaratish | \`new Promise(res => res(1))\` |
| **\`.then(successCb)\`** | Resolve bo'lganda natijani olish | \`.then(val => console.log(val))\` |
| **\`.catch(errorCb)\`** | Reject yoki xatoliklarni tutish | \`.catch(err => console.log(err))\` |
| **\`Promise.all([...])\`** | Parallel bajarish (bittasi xato bo'lsa hammasi rad etiladi) | \`Promise.all([p1, p2])\` |
| **\`Promise.allSettled([...])\`** | Barcha promislar holati tugashini kutadi (xato bo'lsa ham) | \`Promise.allSettled([p1, p2])\` |
| **\`Promise.race([...])\`** | Poyga: birinchi bo'lib tugagani qaytadi | \`Promise.race([p1, p2])\` |
| **\`Promise.any([...])\`** | Birinchi muvaffaqiyatli resolved promisni qaytaradi | \`Promise.any([p1, p2])\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Promise va oddiy Callback farqi nimada?
Callback funksiya boshqa kodga parametr sifatida beriladi va boshqaruv uchinchi tomonga topshiriladi. Promise esa asinxron operatsiya natijasini obyekt sifatida qaytaradi va biz uning ustidan to'liq nazoratga ega bo'lamiz (boshqaruv bizda qoladi).

### 2. resolved bo'lgan Promisega \`.then()\` ulansa nima bo'ladi?
Promise holati allaqachon bajarilgan bo'lsa ham, \`.then()\` ulanishi bilanoq uning ichidagi handler Microtask Queue-ga qo'shiladi va asinxron tarzda qiymatni oladi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`Promise.all\` va \`Promise.allSettled\` metodlarining asosiy farqi nimada?
2. Microtask Queue va Macrotask Queue navbatlarining qaysi biri birinchi bajariladi?
3. Nima uchun Promise holati bir marta o'zgargandan keyin qayta o'zgarmas (immutable) bo'ladi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida Promises (Va'dalar) va asinxron zanjirlar bo'yicha ko'nikmalaringizni tekshiring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Muvaffaqiyatli Promise yaratish",
    "instruction": "Qabul qilingan `value` qiymati bilan darhol hal bo'ladigan (resolve) `resolveWithValue(value)` funksiyasini yozing. U Promise qaytarishi shart.",
    "startingCode": "function resolveWithValue(value) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return new Promise((resolve) => resolve(value)); yoki Promise.resolve(value) dan foydalaning.",
    "test": "const sandbox = new Function(code + '; return resolveWithValue;');\nconst fn = sandbox();\nconst p = fn('Salom');\nif (p instanceof Promise) {\n  return p.then(val => val === 'Salom' ? null : 'Noto\\'g\\'ri qiymat bilan resolve qilingan');\n}\nreturn 'Promise qaytarilmadi';"
  },
  {
    "id": 2,
    "title": "Kechikuvchi Va'da (Promisification)",
    "instruction": "Berilgan millisekund (`ms`) o'tgandan so'ng muvaffaqiyatli hal bo'ladigan `delay(ms)` funksiyasini yozing. U Promise qaytarishi lozim.",
    "startingCode": "function delay(ms) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "new Promise((resolve) => setTimeout(resolve, ms)) shaklida yozing.",
    "test": "if (!code.includes('Promise')) return 'Promise ishlatilmadi';\nif (!code.includes('setTimeout')) return 'setTimeout ishlatilmadi';\nconst sandbox = new Function(code + '; return delay;');\nconst fn = sandbox();\nconst p = fn(100);\nif (p instanceof Promise) return null;\nreturn 'delay funksiyasi Promise qaytarmadi';"
  },
  {
    "id": 3,
    "title": "Promise Zanjiri (Chaining)",
    "instruction": "Berilgan sonni olib, uni 2 ga ko'paytiradigan, so'ngra hosil bo'lgan songa 10 ni qo'shadigan Promise zanjirini hosil qiluvchi `processNumber(num)` funksiyasini yozing. Boshlang'ich Promise `Promise.resolve(num)` bo'lishi kerak.",
    "startingCode": "function processNumber(num) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Promise.resolve(num).then(val => val * 2).then(val => val + 10) shaklida yozishingiz mumkin.",
    "test": "const sandbox = new Function(code + '; return processNumber;');\nconst fn = sandbox();\nconst p = fn(5);\nif (p instanceof Promise) {\n  return p.then(val => val === 20 ? null : 'Zanjir yakunidagi natija noto\\'g\\'ri');\n}\nreturn 'processNumber funksiyasi Promise qaytarmadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da Promise nima?",
    "options": [
      "Faqat brauzerni tozalaydigan ichki funksiya",
      "Asinxron operatsiyaning yakuniy natijasini (muvaffaqiyatli yoki muvaffaqiyatsiz) ifodalovchi maxsus obyekt",
      "O'zgaruvchilar turini o'zgartiruvchi operator",
      "Xatolarni avtomatik tuzatadigan kutubxona"
    ],
    "correctAnswer": 1,
    "explanation": "Promise (Va'da) asinxron amallarning kelajakda olinadigan natijasini ifodalovchi va uning holatini kuzatish imkonini beruvchi obyektdir."
  },
  {
    "id": 2,
    "question": "Promisening uchta holati qaysi variantda to'g'ri ko'rsatilgan?",
    "options": [
      "`pending` (kutilmoqda), `fulfilled` (bajarildi), `rejected` (rad etildi)",
      "`start`, `run`, `stop`",
      "`waiting`, `processing`, `done`",
      "`try`, `catch`, `finally`"
    ],
    "correctAnswer": 0,
    "explanation": "Promise uch xil holatda bo'ladi: pending (boshlang'ich kutilayotgan holat), fulfilled (muvaffaqiyatli yakunlangan holat), rejected (xatolik bilan tugagan holat)."
  },
  {
    "id": 3,
    "question": "Promise holati haqidagi qaysi qoida to'g'ri?",
    "options": [
      "Promise holatini cheksiz marta o'zgartirish mumkin",
      "Promise bir marta `fulfilled` yoki `rejected` holatiga o'tgandan keyin, uning holatini boshqa o'zgartirib bo'lmaydi (immutable)",
      "Promise faqat `pending` holatida javob qaytara oladi",
      "`rejected` bo'lgan promise avtomatik ravishda `fulfilled` ga aylanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Promise o'zgarmas (immutable) hisoblanadi. Agar u resolve yoki reject bo'lsa, uning holati qulflanadi va boshqa o'zgarmaydi."
  },
  {
    "id": 4,
    "question": "Promise ichida xatolik yuz berganda uni qaysi metod yordamida tutib olamiz?",
    "options": [
      "`.then()`",
      "`.catch()`",
      "`.finally()`",
      "`.error()`"
    ],
    "correctAnswer": 1,
    "explanation": "Promisening rad etilishini (rejected) yoki asinxron zanjirda yuz bergan xatoliklarni tutish uchun `.catch()` metodidan foydalaniladi."
  },
  {
    "id": 5,
    "question": "Promise `.finally()` metodi qachon ishga tushadi?",
    "options": [
      "Faqat Promise muvaffaqiyatli yakunlanganda (fulfilled)",
      "Faqat Promise rad etilganda (rejected)",
      "Promise qanday natija bilan tugashidan qat'i nazar (muvaffaqiyatli yoki muvaffaqiyatsiz bo'lsa ham)",
      "Faqat xato yuz berganda"
    ],
    "correctAnswer": 2,
    "explanation": "`.finally()` bloki Promise qanday holat bilan tugashidan qat'i nazar, eng oxirida tozalash ishlarini (masalan, loading indikatorini o'chirish) bajarish uchun doim ishlaydi."
  },
  {
    "id": 6,
    "question": "Promise zanjirini (Chaining) hosil qilish imkoniyati nimaga asoslangan?",
    "options": [
      "Har bir `.then()` metodi o'zidan avtomatik ravishda yangi Promise qaytarishiga",
      "Funksiyalarni cheksiz chaqira olishimizga",
      "Event loopning tezkarligiga",
      "Callback larning yo'qligiga"
    ],
    "correctAnswer": 0,
    "explanation": "Har safar `.then()` chaqirilganda, u yangi Promise qaytaradi. Bu esa bizga zanjir hosil qilib, ketma-ket asinxron amallarni o'qishli yozish imkonini beradi."
  },
  {
    "id": 7,
    "question": "Quyidagi kodda `Promise.all` ishlatilganda nima yuz beradi?\n```javascript\nconst p1 = Promise.resolve(10);\nconst p2 = Promise.reject('Xato!');\nPromise.all([p1, p2]).catch(err => console.log(err));\n```",
    "options": [
      "Konsolga `[10, 'Xato!']` massivi chiqadi",
      "Konsolga `'Xato!'` chiqadi va butun zanjir rad etiladi",
      "Xato e'tiborga olinmay, faqat 10 chiqadi",
      "`TypeError` xatoligi beradi"
    ],
    "correctAnswer": 1,
    "explanation": "`Promise.all` \"hammasi yoki hech narsa\" (all-or-nothing) prinsipi asosida ishlaydi. Agar massivdagi bitta Promise rad etilsa (rejected), butun zanjir darhol o'sha xato bilan rad etiladi."
  },
  {
    "id": 8,
    "question": "Promise.race() metodi qanday natija qaytaradi?",
    "options": [
      "Massivdagi barcha promislar bajarilishini kutib, natijalarni yig'ib qaytaradi",
      "Massivdagi promislar ichidan birinchi bo'lib yakunlangan (muvaffaqiyatli yoki xatolik bilan bo'lsa ham) promisning natijasini qaytaradi",
      "Faqat eng tez rad etilgan promisni qaytaradi",
      "Faqat oxirgi yakunlangan promisni qaytaradi"
    ],
    "correctAnswer": 1,
    "explanation": "`Promise.race()` (poyga) eng birinchi bo'lib hal bo'lgan (u xoh resolve bo'lsin, xoh reject) promisening natijasini qaytaradi."
  },
  {
    "id": 9,
    "question": "Promise.allSettled() metodining Promise.all() dan asosiy farqi nimada?",
    "options": [
      "U faqat tezroq ishlaydi",
      "U biron bir promise rad etilsa ham zanjirni to'xtatmaydi, barcha promislar tugashini kutadi va har birining holati hamda qiymatini o'z ichiga olgan massiv qaytaradi",
      "U xatolarni umuman tutmaydi",
      "U massiv o'rniga obyekt qaytaradi"
    ],
    "correctAnswer": 1,
    "explanation": "`Promise.allSettled()` barcha promislar tugashini (fulfilled yoki rejected bo'lishidan qat'i nazar) kutadi va har birining natijasi (status va value/reason) yozilgan massivni qaytaradi."
  },
  {
    "id": 10,
    "question": "Promise callbacks (then/catch) JavaScript Event Loop-ning qaysi navbatida bajariladi?",
    "options": [
      "Macrotask Queue (Task Queue)",
      "Microtask Queue (Job Queue)",
      "Call Stack ichida darhol",
      "Render Queue"
    ],
    "correctAnswer": 1,
    "explanation": "Promise `.then/catch/finally` handlerlari **Microtask Queue** ga joylashtiriladi. Microtask navbati Macrotask navbatiga (setTimeout, events) qaraganda yuqori ustuvorlikka ega bo'lib, stack bo'shashi bilan darhol bajariladi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nPromise.resolve('A').then(val => {\n  console.log(val);\n  return 'B';\n}).then(val => {\n  console.log(val);\n});\n```",
    "options": [
      "`A` keyingi qatorda `B`",
      "`A` keyingi qatorda `A`",
      "Faqat `A`",
      "`B` keyingi qatorda `A`"
    ],
    "correctAnswer": 0,
    "explanation": "Birinchi `.then` `'A'` ni chiqaradi va `'B'` ni qaytaradi. Ushbu qaytarilgan qiymat keyingi `.then` ga argument bo'lib o'tadi va u `'B'` ni chiqaradi."
  },
  {
    "id": 12,
    "question": "Promise.any() metodi qanday ishlaydi?",
    "options": [
      "Barcha promislar xato bo'lishini kutadi",
      "Massivdagi promislar ichidan birinchi bo'lib muvaffaqiyatli (fulfilled) yakunlangan promisning qiymatini qaytaradi. Agar hammasi rad etilsa, AggregateError qaytaradi",
      "Faqat rad etilgan promisni qaytaradi",
      "Hech qachon xato qaytarmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`Promise.any()` massiv ichidan eng birinchi bo'lib **muvaffaqiyatli** bajarilgan promisni qaytaradi. Agarda hamma promislar rad etilsa, u barcha xatolarni jamlagan `AggregateError` xatosini beradi."
  }
]

};

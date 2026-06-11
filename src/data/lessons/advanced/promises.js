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
      id: 1,
      title: "1️⃣ Oddiy Promise yaratish",
      instruction: "Konstruktor yordamida 'Hello' qiymati bilan darhol resolve bo'ladigan Promise qaytaring.",
      startingCode: "function getPromise() {\n  // Kodni shu yerda yozing\n}",
      hint: "return new Promise(resolve => resolve('Hello'));",
      test: "if (typeof getPromise !== 'function') return 'getPromise funksiya emas'; return getPromise().then(r => r === 'Hello' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 2,
      title: "2️⃣ Xatolik bilan reject qilish",
      instruction: "Konstruktor yordamida 'Xato yuz berdi' matni bilan reject bo'ladigan Promise qaytaring.",
      startingCode: "function getRejectedPromise() {\n  // Kodni shu yerda yozing\n}",
      hint: "return new Promise((resolve, reject) => reject('Xato yuz berdi'));",
      test: "if (typeof getRejectedPromise !== 'function') return 'getRejectedPromise funksiya emas'; return getRejectedPromise().then(() => 'Resolve bo\\'lib ketdi, xato!').catch(e => e === 'Xato yuz berdi' ? null : 'Xato matni noto\\'g\\'ri');"
    },
    {
      id: 3,
      title: "3️⃣ Zanjirli then() chaqiruvi",
      instruction: "Berilgan promise natijasiga 10 ni qo'shib, keyingi then() ga uzatuvchi kod yozing.",
      startingCode: "function addTen(promise) {\n  return promise.then(num => {\n    // Kodni shu yerda yozing\n  });\n}",
      hint: "return num + 10;",
      test: "if (typeof addTen !== 'function') return 'addTen funksiya emas'; return addTen(Promise.resolve(5)).then(r => r === 15 ? null : 'Natija xato');"
    },
    {
      id: 4,
      title: "4️⃣ Catch yordamida xatoni ushlash",
      instruction: "Xato tashlaydigan promiseni catch orqali ushlab, 'Qayta ishlandi' deb qaytaring.",
      startingCode: "function catchError(promise) {\n  return promise.catch(err => {\n    // Natijani qaytaring\n  });\n}",
      hint: "return 'Qayta ishlandi';",
      test: "if (typeof catchError !== 'function') return 'catchError funksiya emas'; return catchError(Promise.reject('error')).then(r => r === 'Qayta ishlandi' ? null : 'Xato ushlanmadi');"
    },
    {
      id: 5,
      title: "5️⃣ Finally ishlatilishi",
      instruction: "Promisning statusidan qat'i nazar, oxirida 'Tugadi' matnini konsolga chiqaradigan `.finally()` bloki qo'shing.",
      startingCode: "function logFinally(promise) {\n  return promise.finally(() => {\n    // Konsolga chiqaring\n  });\n}",
      hint: "console.log('Tugadi');",
      test: "if (typeof logFinally !== 'function') return 'logFinally funksiya emas'; logFinally(Promise.resolve()); if (logs.includes('Tugadi')) return null; return 'finally ishga tushmadi';"
    },
    {
      id: 6,
      title: "6️⃣ Promise.all parallel kutish",
      instruction: "Berilgan p1, p2, p3 promiselarini parallel kutib, ularning natijalari yig'indisini qaytaring.",
      startingCode: "function sumPromises(p1, p2, p3) {\n  // Promise.all ishlating\n}",
      hint: "return Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => r1 + r2 + r3);",
      test: "if (typeof sumPromises !== 'function') return 'sumPromises funksiya emas'; return sumPromises(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)).then(r => r === 6 ? null : 'Yig\\'indi xato');"
    },
    {
      id: 7,
      title: "7️⃣ Promise.race eng birinchisi",
      instruction: "Berilgan p1 va p2 promiselardan qaysi biri birinchi bajarilsa, o'shaning natijasini qaytaring.",
      startingCode: "function getFastest(p1, p2) {\n  // Promise.race\n}",
      hint: "return Promise.race([p1, p2]);",
      test: "if (typeof getFastest !== 'function') return 'getFastest funksiya emas'; const p1 = new Promise(r => setTimeout(() => r(1), 50)); const p2 = new Promise(r => setTimeout(() => r(2), 10)); return getFastest(p1, p2).then(r => r === 2 ? null : 'Eng tezi olinmadi');"
    },
    {
      id: 8,
      title: "8️⃣ Xavfsiz Promise.all (allSettled)",
      instruction: "p1 (resolve) va p2 (reject) berilgan. `Promise.allSettled` yordamida ikkalasini ham kutib, natijaviy massivni qaytaring.",
      startingCode: "function checkAll(p1, p2) {\n  // allSettled ishlating\n}",
      hint: "return Promise.allSettled([p1, p2]);",
      test: "if (typeof checkAll !== 'function') return 'checkAll funksiya emas'; return checkAll(Promise.resolve(1), Promise.reject('xato')).then(r => r.length === 2 && r[1].status === 'rejected' ? null : 'allSettled ishlamadi');"
    },
    {
      id: 9,
      title: "9️⃣ Promise qayta urinish (Retry delay)",
      instruction: "Berilgan asinxron `fn` funksiyani bajarib ko'ring, xato bo'lsa, 50ms kutib yana bir marta bajaring.",
      startingCode: "function retryOnce(fn) {\n  return fn().catch(() => {\n    // 50ms kutib fn() ni qayta chaqiring\n  });\n}",
      hint: "return new Promise(resolve => setTimeout(resolve, 50)).then(() => fn());",
      test: "if (typeof retryOnce !== 'function') return 'retryOnce funksiya emas'; let count = 0; const fn = () => { count++; return count < 2 ? Promise.reject('err') : Promise.resolve('ok'); }; return retryOnce(fn).then(r => r === 'ok' && count === 2 ? null : 'Qayta urinish xato');"
    },
    {
      id: 10,
      title: "🔟 Promislarni ketma-ket bajarish",
      instruction: "Massivdagi asinxron funksiyalarni (promiselarni) \`reduce\` yordamida navbatma-navbat (ketma-ket) ishga tushiring.",
      startingCode: "function runSequence(funcs) {\n  // Navbatma-navbat chain qiling\n}",
      hint: "return funcs.reduce((promise, fn) => promise.then(fn), Promise.resolve());",
      test: "if (typeof runSequence !== 'function') return 'runSequence funksiya emas'; let list = []; const f1 = () => new Promise(r => setTimeout(() => { list.push(1); r(); }, 20)); const f2 = () => new Promise(r => setTimeout(() => { list.push(2); r(); }, 10)); return runSequence([f1, f2]).then(() => list[0] === 1 && list[1] === 2 ? null : 'Ketma-ketlik buzildi');"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Promise statusini o'qish",
      instruction: "Promise resolved bo'lsa true, pending bo'lsa false qaytaruvchi sinov funksiyasini yozing (Promise.race orqali).",
      startingCode: "async function isResolved(promise) {\n  const temp = {};\n  const r = await Promise.race([promise, temp]);\n  return r !== temp;\n}",
      hint: "Berilgan tayyor kodni tahlil qiling va return null qaytishi uchun tasdiqlang",
      test: "if (typeof isResolved !== 'function') return 'isResolved funksiya emas'; return isResolved(Promise.resolve()).then(r => r === true ? null : 'Status noto\\'g\\'ri');"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Promise zanjiri xato otish",
      instruction: "then() ichida `throw new Error('muammo')` yozib, xato keyingi catch ga yetib borishini ta'minlang.",
      startingCode: "function throwInChain(promise) {\n  return promise.then(() => {\n    // Xato tashlang\n  });\n}",
      hint: "throw new Error('muammo');",
      test: "if (typeof throwInChain !== 'function') return 'throwInChain funksiya emas'; return throwInChain(Promise.resolve()).catch(e => e.message === 'muammo' ? null : 'Xato yetib bormadi');"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Node-Style Promisify (promisify)",
      instruction: "Node.js error-first callback stilidagi funksiyani Promise qaytaradigan funksiyaga o'tkazuvchi `promisify(fn)` helper funksiyasini yozing.",
      startingCode: "function promisify(fn) {\n  return function(...args) {\n    // Kodni shu yerdan yozing\n  };\n}",
      hint: "return new Promise((resolve, reject) => { fn(...args, (err, data) => { if (err) reject(err); else resolve(data); }); });",
      test: "if (typeof promisify !== 'function') return 'promisify funksiya emas';\nconst asyncFunc = (x, cb) => setTimeout(() => cb(null, x * 3), 10);\nconst promised = promisify(asyncFunc);\nreturn promised(4).then(res => {\n  if (res === 12) return null;\n  return 'Promisify natijasi noto\\'g\\'ri';\n}).catch(e => 'Xatolik: ' + e.message);"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Kechiktirilgan Va'da (delayPromise)",
      instruction: "Berilgan `ms` millisekunddan keyin belgilangan `value` qiymati bilan resolve bo'ladigan `delayPromise(ms, value)` funksiyasini yozing.",
      startingCode: "function delayPromise(ms, value) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return new Promise(resolve => setTimeout(() => resolve(value), ms));",
      test: "if (typeof delayPromise !== 'function') return 'delayPromise funksiya emas';\nconst start = Date.now();\nreturn delayPromise(50, 'success').then(res => {\n  const duration = Date.now() - start;\n  if (res !== 'success') return 'Qiymat noto\\'g\\'ri';\n  if (duration >= 40) return null;\n  return 'Kechikish vaqti xato';\n});"
    }
  ],
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

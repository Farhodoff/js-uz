export const promises = {
  id: "promises",
  title: "Promises (Va'dalar) va Zanjirli asinxronlik",
  language: "javascript",
  theory: `## 1. 💡 Part 1: Beginner Analogy

### Promise nima?
**Promise (Va'da)** — asinxron operatsiyaning kelajakda olinadigan natijasini (muvaffaqiyatli yoki xato bilan tugashini) ifodalovchi maxsus JavaScript obyektidir. U callback funksiyalar yordamida yoziladigan murakkab asinxron kodlarni ancha soddaroq va o'qishli zanjir ko'rinishida yozish imkonini beradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz do'kondan **onlayn buyurtma (masalan, telefon)** qildingiz:
* **Buyurtma berilgan lahza:** Do'kon sizga telefonni darhol bermaydi, lekin u telefonni yetkazib berish haqida **va'da (Promise)** beradi. Hozirda va'da **Kutilmoqda (Pending)** holatida.
* **Telefon muvaffaqiyatli yetib kelganda:** Va'da **Bajarildi (Fulfilled)** holatiga o'tadi. Siz telefonni olasiz (\\\`.then()\\\`).
* **Telefon omborda tugab qolsa yoki yo'lda yo'qolsa:** Va'da **Rad etildi (Rejected)** holatiga o'tadi. Sizga pulingiz qaytariladi yoki sababi tushuntiriladi (\\\`.catch()\\\`).

---

## 2. ⚙️ Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

### Microtask Queue (Mikrovazifalar navbati)
JavaScript V8 enginedagi Event Loop yordamida asinxronlikni boshqaradi.
Asinxron kodlar navbatlardan foydalanadi:
1. **Macrotasks (Task Queue):** \\\`setTimeout\\\`, \\\`setInterval\\\`, DOM hodisalari.
2. **Microtasks (Job Queue):** Promise \\\`.then()\\\`, \\\`.catch()\\\`, \\\`.finally()\\\` va \\\`MutationObserver\\\`.

> [!IMPORTANT]
> **Ustuvorlik qoidasi:** Call Stack bo'shashi bilan Event Loop birinchi navbatda **Microtask Queue** ichidagi barcha vazifalarni bajarib bo'ladi, shundan keyingina **Macrotask Queue**ga o'tadi.

### Xotira (Memory) va V8 Engine
Promiselar obyekt sifatida Heap xotirada saqlanadi. Har bir \\\`.then()\\\` chaqiruvi yashirincha yangi Promise obyektini yaratadi va uni zanjirga qo'shadi. Agar zanjirlar haddan tashqari uzun bo'lib ketsa va ular uzoq vaqt ushlab turilsa, xotira sarfi ortadi (Memory Leak ehtimoli bor). V8 Engine Promise zanjirlarini optimizatsiya qiladi, lekin baribir ortiqcha uzun zanjirlar o'rniga \\\`async/await\\\` dan foydalanish odatda samaraliroq (va readability uchun ham yaxshi).

\\\`\\\`\\\`javascript
console.log("Start");

setTimeout(() => console.log("Timeout (Macrotask)"), 0);

Promise.resolve().then(() => console.log("Promise (Microtask)"));

console.log("End");

// Natija tartibi:
// 1. Start
// 2. End
// 3. Promise (Microtask)
// 4. Timeout (Macrotask)
\\\`\\\`\\\`

---

## 3. ⚠️ Part 3: Edge Cases and Senior Interview Questions

### Edge Cases
1. **Zanjirda return qilishni unutish:**
Agar \\\`.then()\\\` ichida return yozilmasa, keyingi \\\`.then()\\\` ga qiymat o'tmaydi (\\\`undefined\\\` bo'ladi).
\\\`\\\`\\\`javascript
Promise.resolve(5)
  .then(val => { val * 2 }) // return yo'q
  .then(res => console.log(res)); // undefined chiqadi
\\\`\\\`\\\`
2. **Double Resolve/Reject e'tiborsizligi:**
Bir marta resolve yoki reject bo'lgan Promise o'z holatini qayta o'zgartirmaydi (immutable).
\\\`\\\`\\\`javascript
const p = new Promise((resolve, reject) => {
  resolve(1);
  resolve(2); // Inkor qilinadi
  reject(3);  // Inkor qilinadi
});
p.then(console.log); // Faqat 1 chiqadi
\\\`\\\`\\\`

### Senior Interview Questions
* **Savol:** \\\`Promise.all\\\` va \\\`Promise.allSettled\\\` o'rtasidagi asosiy farq nima va qachon qaysi birini ishlatish kerak?
* **Javob:** \\\`Promise.all\\\` barcha promislar muvaffaqiyatli tugashini kutadi. Bittasi xato bo'lsa, butun zanjir rad etiladi (fail-fast). \\\`Promise.allSettled\\\` esa xatolarga qaramay barchasi tugashini kutadi va har birining holatini qaytaradi.
* **Savol:** Nega Event Loop da setTimeout Promisdan keyin ishlaydi, garchi kodda setTimeout oldin yozilgan bo'lsa ham?
* **Javob:** Chunki setTimeout callbacki Macrotask navbatiga, Promise handlerlari esa Microtask navbatiga tushadi. Microtasks doimo Macrotasklardan oldin bajariladi.

---

## 4. 📊 Mermaid Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[Promise Yaratildi] --> B(Pending)
    B -->|Muvaffaqiyatli| C[Fulfilled]
    B -->|Xatolik| D[Rejected]
    C --> E[.then callback]
    D --> F[.catch callback]
    E --> G[.finally callback]
    F --> G
\\\`\\\`\\\`
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
    },
    {
      "id": 4,
      "title": "Kechikish (Delay) Promise",
      "instruction": "Kiritilgan ms millisoniyadan keyin `resolve` bo'ladigan Promise qaytaruvchi `delay(ms)` funksiyasini yozing. U hech qanday qiymat bilan resolve bo'lishi shart emas (faqat setTimeout ichida resolve()).",
      "startingCode": "function delay(ms) {\n  // Kodni yozing\n}",
      "hint": "return new Promise(resolve => setTimeout(resolve, ms)); ishlating.",
      "test": "const fn = new Function(code + '; return delay;')(); const p = fn(10); if(!(p instanceof Promise)) return 'Promise qaytarmadi'; return p.then(() => null);"
    },
    {
      "id": 5,
      "title": "To'g'ridan-to'g'ri Rad etish (Reject)",
      "instruction": "Faqatgina ma'lum bir matn bilan to'g'ridan-to'g'ri `reject` qilingan Promise qaytaruvchi `instantReject(msg)` yozing.",
      "startingCode": "function instantReject(msg) {\n  // Kodni yozing\n}",
      "hint": "Promise.reject(msg) eng to'g'ri va oson yo'l.",
      "test": "const fn = new Function(code + '; return instantReject;')(); const p = fn('Xato'); return p.then(() => 'Reject bo\\'lmadi').catch(err => err === 'Xato' ? null : 'Noma\\'lum xato qaytdi');"
    },
    {
      "id": 6,
      "title": "Ikkita Promise.all",
      "instruction": "Ikkita promise qabul qilib, ularni `Promise.all` orqali birlashtirib qaytaruvchi `combinePromises(p1, p2)` yozing.",
      "startingCode": "function combinePromises(p1, p2) {\n  // Kodni yozing\n}",
      "hint": "return Promise.all([p1, p2]);",
      "test": "const fn = new Function(code + '; return combinePromises;')(); const p = fn(Promise.resolve(1), Promise.resolve(2)); return p.then(res => res[0]===1 && res[1]===2 ? null : 'Noto\\'g\\'ri massiv');"
    },
    {
      "id": 7,
      "title": "Promise.race amaliyoti",
      "instruction": "Bir nechta promislardan iborat massiv qabul qilib, ulardan birinchi bo'lib tugaganining (resolve yoki reject) natijasini qaytaradigan `getFirstResult(promises)` yozing.",
      "startingCode": "function getFirstResult(promises) {\n  // Kodni yozing\n}",
      "hint": "Promise.race(promises) ni qaytaring.",
      "test": "const fn = new Function(code + '; return getFirstResult;')(); const p = fn([new Promise(r => setTimeout(()=>r(1), 50)), Promise.resolve(2)]); return p.then(res => res === 2 ? null : 'Xato');"
    },
    {
      "id": 8,
      "title": "Matnni Kattalashtirish (Zanjir)",
      "instruction": "Promise qabul qiladigan va uning natijasi satr bo'lsa, uni bosh harflarga o'tkazuvchi `toUpperCasePromise(promise)` yozing.",
      "startingCode": "function toUpperCasePromise(promise) {\n  // Kodni yozing\n}",
      "hint": "return promise.then(str => str.toUpperCase());",
      "test": "const fn = new Function(code + '; return toUpperCasePromise;')(); return fn(Promise.resolve('hi')).then(r => r === 'HI' ? null : 'Xato');"
    },
    {
      "id": 9,
      "title": "Soni Tekshirish (Resolve/Reject)",
      "instruction": "Son qabul qiluvchi `checkEvenPromise(num)` yozing. Agar juft bo'lsa `resolve('Juft')`, toq bo'lsa `reject('Toq')` qaytarsin.",
      "startingCode": "function checkEvenPromise(num) {\n  // Kodni yozing\n}",
      "hint": "return new Promise((resolve, reject) => { num%2===0 ? resolve('Juft') : reject('Toq'); });",
      "test": "const fn = new Function(code + '; return checkEvenPromise;')(); return fn(2).then(r => r==='Juft' ? fn(3).catch(e => e==='Toq' ? null : 'Xato') : 'Xato');"
    },
    {
      "id": 10,
      "title": "Muvaffaqiyatsizlikni Ushlash (Catch)",
      "instruction": "Promiseni qabul qilib, agar u xato (reject) bersa, xato xabarini emas, balki standart `'Xato yuz berdi'` degan satr bilan resolve qiladigan `safePromise(promise)` yozing.",
      "startingCode": "function safePromise(promise) {\n  // Kodni yozing\n}",
      "hint": "return promise.catch(() => 'Xato yuz berdi');",
      "test": "const fn = new Function(code + '; return safePromise;')(); return fn(Promise.reject('123')).then(r => r === 'Xato yuz berdi' ? null : 'Xato');"
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

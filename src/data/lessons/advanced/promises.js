export const promises = {
  id: "promises",
  title: "Promises: Asinxron Darslar Asosi",
  level: "Murakkab",
  description: "Promise obyekti, uning holatlari, zanjirli chaqiruvlar (.then, .catch, .finally), parallel va ketma-ket asinxron operatsiyalar, hamda Promise static metodlari.",
  theory: `## 1. NEGA kerak?

JavaScript yagona oqimli (single-threaded) til hisoblanadi. Bu degani, u bir vaqtning o'zida faqat bitta vazifani bajara oladi. Agar biz tarmoqdan ma'lumot yuklash yoki faylni o'qish kabi vaqt talab qiladigan ishlarni sinxron (kutish orqali) bajarsak, butun brauzer oynasi qotib qoladi (bloklanadi).

**Callback-lar muammosi (Callback Hell):**
Asinxron kodlarni callback funksiyalar yordamida yozish ichma-ich kodlarning ko'payib ketishiga (Callback Hell) olib keladi. Buni o'qish va xatolarini boshqarish juda murakkab. **Promises** (Va'dalar) asinxron operatsiyalarni tartibli, oson va zanjir shaklida yozish uchun yaratilgan.

---

## 2. SODDALIK (Analogiya)

Tasavvur qiling, siz do'kondan yangi telefon buyurtma qildingiz:
1. **Pending (Kutilmoqda):** Do'kon sizga chek berdi. Telefon hali qo'lingizda yo'q, lekin do'kon uni yetkazib berishga va'da berdi.
2. **Fulfilled (Bajarildi):** Telefon muvaffaqiyatli yetkazildi. Siz xursandsiz (resolve).
3. **Rejected (Rad etildi):** Omborda telefon qolmagani ma'lum bo'ldi. Sizga pulingiz qaytarildi va uzr so'rashdi (reject).

\`\`\`mermaid
stateDiagram-v2
    [*] --> Pending : new Promise()
    Pending --> Fulfilled : resolve(value)
    Pending --> Rejected : reject(error)
    Fulfilled --> [*] : .then()
    Rejected --> [*] : .catch()
\`\`\`

---

## 3. CHUQUR TUSHUNCHALAR VA ILG'OR MAVZULAR

### A. Promise Lifecycle va Immutability (O'zgarmaslik)
Promise yaratilganda u har doim \`pending\` (kutilmoqda) holatida bo'ladi. Keyinchalik u yoki \`fulfilled\` (muvaffaqiyatli bajarildi), yoki \`rejected\` (rad etildi) holatiga o'tadi.
- **Immutability qoidasi:** Promise holati faqat **bir marta** o'zgarishi mumkin. U resolved yoki rejected bo'lganidan keyin boshqa hech qachon o'z holatini o'zgartira olmaydi, uning qiymati muzlatiladi.

### B. Microtask Queue va Call Stack
JavaScript-da asinxron operatsiyalar navbati ikki turga bo'linadi:
1. **Macrotasks (Task Queue):** \`setTimeout\`, \`setInterval\`, UI rendering, I/O operatsiyalari.
2. **Microtasks (Job Queue):** Promise callbacklari (\`.then\`, \`.catch\`, \`.finally\`), \`queueMicrotask\`, \`MutationObserver\`.

**Qoida:** Event Loop har safar Call Stack bo'shaganidan keyin, navbatdagi har qanday macrotask-ga o'tishdan oldin, Microtask Queue'dagi **barcha** navbatda turgan vazifalarni bajarib tugatishi shart.

\`\`\`mermaid
graph LR
    Stack[Call Stack bo'shadi] --> Micro{Microtask Queue bo'shmi?}
    Micro -- Yo'q --> RunM[Microtaskni bajarish]
    RunM --> Stack
    Micro -- Ha --> Render[UI Render / Repaint]
    Render --> Macro[Macrotask Queue'dan 1 ta bajarish]
    Macro --> Stack
\`\`\`

### C. Promise Combinators (Static Metodlar)
Bir nechta Promiselarni parallel boshqarish uchun quyidagi statik metodlar qo'llaniladi:
* **\`Promise.all([p1, p2, p3])\`:** Barcha promiselar muvaffaqiyatli bajarilishini kutadi. Agarda bittasi reject bo'lsa, zudlik bilan butun \`Promise.all\` xatolik bilan yakunlanadi (all-or-nothing).
* **\`Promise.allSettled([p1, p2, p3])\`:** Barcha promiselar yakunlanishini (resolve yoki reject bo'lishidan qat'i nazar) kutadi. Natija har bir promisening holati va qiymatini ko'rsatuvchi obyektlar massivi bo'ladi.
* **\`Promise.any([p1, p2, p3])\`:** Birinchi muvaffaqiyatli (fulfilled) bo'lgan promiseni qaytaradi. Agar barchasi reject bo'lsa, \`AggregateError\` tashlaydi.
* **\`Promise.race([p1, p2, p3])\`:** Qaysi promise birinchi bo'lib yakunlansa (fulfilled yoki rejected), o'shaning natijasini qaytaradi.

### D. Promisification (Promislantirish)
Bu callback-ga asoslangan eski API-larni Promise-ga asoslangan zamonaviy ko'rinishga o'tkazish jarayonidir:
\`\`\`javascript
// Eski callback-li funksiya
function delayCallback(ms, callback) {
  setTimeout(callback, ms);
}

// Promislantirilgan versiyasi
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
delay(1000).then(() => console.log("1 soniyadan keyin!"));
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR
1. **Promise Chain-da \`return\`ni unutish:** Agar \`.then()\` ichidagi callback-da yangi promise yoki qiymatni \`return\` qilmasangiz, keyingi \`.then()\` \`undefined\` qiymatini qabul qiladi.
2. **Xatolarni catch qilmaslik (Unhandled Rejections):** Har bir Promise zanjirining oxirida \`.catch()\` bo'lishi yoki global \`unhandledrejection\` hodisasi tinglanishi lozim.

---

## 5. SAVOLLAR VA JAVOBLAR

**1. Promise nima?**
Asinxron operatsiyaning yakuniy natijasini (muvaffaqiyat yoki xatolik) o'zida ifodalovchi maxsus obyekt.

**2. Promise.all() qachon reject bo'ladi?**
Unga berilgan promiselardan birontasi birinchi bo'lib reject (xato) bo'lishi bilanoq zudlik bilan reject bo'ladi.

**3. Promise.allSettled() nima qaytaradi?**
Barcha berilgan promiselarning yakuniy holatini (status: 'fulfilled' / 'rejected') va qiymatini o'z ichiga olgan obyektlar massivini qaytaradi.

**4. Microtask Queue va Macrotask Queue farqi nimada?**
Microtasks (masalan, Promise .then) Macrotasks (masalan, setTimeout) ga qaraganda yuqori ustuvorlikka ega va har doim Call Stack bo'shashi bilanoq birinchi bo'lib bajariladi.

**5. AggregateError nima?**
\`Promise.any()\`ga berilgan barcha promiselar muvaffaqiyatsiz (rejected) bo'lganda yuzaga keladigan va barcha xatolarni o'z ichiga oluvchi maxsus xato obyekti.
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
      id: 1,
      question: "`fetch()` metodi serverga tarmoq so'rovini yuborib default holatda nima qaytaradi?",
      options: [
        "Serverdan kelgan JSON matnini",
        "Promise (u hal bo'lganda Response obyekti qaytadi)",
        "JavaScript obyekti",
        "Faqat status kodi"
      ],
      correctAnswer: 1,
      explanation: "`fetch()` har doim asinxron Promise qaytaradi. U muvaffaqiyatli yakunlanganda Response obyektini saqlaydi."
    },
    {
      id: 2,
      question: "Nima uchun `response.json()` metodidan oldin ham `await` kalit so'zini yozish kerak?",
      options: [
        "Bu JavaScript-ning majburiy qoidasi",
        "`response.json()` ham asinxron bo'lib, o'qib tugatilgandan keyin Promise qaytaradi",
        "Hech qanday sabab yo'q, xohlasak yozmasligimiz mumkin",
        "Sinxron ishlashini ta'minlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Body ma'lumotlarini to'liq o'qish va JSON sifatida parse qilish vaqt oladi, shuning uchun bu jarayon asinxron Promise qaytaradi."
    },
    {
      id: 3,
      question: "`response.ok` xususiyati qaysi HTTP status kodlari oralig'ida `true` bo'ladi?",
      options: [
        "Faqat 200 da",
        "200 dan 299 gacha",
        "100 dan 500 gacha",
        "Faqat 304 da"
      ],
      correctAnswer: 1,
      explanation: "`response.ok` HTTP status kodi muvaffaqiyatli (200-299) bo'lganda true qiymatini saqlaydi."
    },
    {
      id: 4,
      question: "Server 500 (Internal Server Error) qaytarganda `fetch()` so'rovi qanday yakunlanadi?",
      options: [
        "Muvaffaqiyatli yakunlanadi, ammo `response.ok` false bo'ladi",
        "Rad etiladi va catch blokiga o'tadi",
        "So'rov abadiy kutish rejimiga o'tadi",
        "Brauzer sahifani avtomatik yangilaydi"
      ],
      correctAnswer: 0,
      explanation: "Server javob berganligi sababli fetch muvaffaqiyatli tugaydi (catchga tushmaydi). Faqat xato kod bo'lgani uchun `ok` xususiyati false bo'ladi."
    },
    {
      id: 5,
      question: "`POST` so'rovida ma'lumot yuborishda `body` xususiyatiga qanday qiymat beriladi?",
      options: [
        "JavaScript obyekti",
        "JSON.stringify() orqali string-ga o'tkazilgan obyekt matni",
        "Faqat massiv",
        "Faqat fayl (file) formati"
      ],
      correctAnswer: 1,
      explanation: "Tarmoq orqali yuborilayotgan ma'lumotlar matn (string) shaklida bo'lishi lozim. Shuning uchun obyekt `JSON.stringify` qilinadi."
    },
    {
      id: 6,
      question: "Quyidagilardan qaysi biri fetch() catch blokiga tushadigan (reject bo'ladigan) holat hisoblanadi?",
      options: [
        "Server 404 (Not Found) statusini qaytarganda",
        "Server 500 (Server Error) statusini qaytarganda",
        "Tarmoq ulanishi yo'qolganda yoki DNS xatosi sababli so'rov serverga yetib bormaganda",
        "Foydalanuvchi ma'lumotlari noto'g'ri bo'lganda"
      ],
      correctAnswer: 2,
      explanation: "fetch() faqat tarmoq darajasida uzilish yuz bergandagina (so'rov yakuniga yetmasa) reject bo'ladi va catch blokiga o'tadi."
    },
    {
      id: 7,
      question: "`Content-Type: application/json` sarlavhasi (header) nima uchun jo'natiladi?",
      options: [
        "Foydalanuvchini autentifikatsiya qilish uchun",
        "Serverga yuborilayotgan ma'lumot formati JSON ekanligini bildirish uchun",
        "So'rovni bekor qilish uchun",
        "CORS xatosini oldini olish uchun"
      ],
      correctAnswer: 1,
      explanation: "Ushbu sarlavha serverga yuborilayotgan body tarkibi JSON formatida ekanini tushunishga va uni to'g'ri parse qilishga yordam beradi."
    },
    {
      id: 8,
      question: "`fetch` yordamida yuborilgan so'rovni qanday bekor qilish mumkin?",
      options: [
        "`fetch.stop()` chaqirish orqali",
        "`AbortController` va uning `signal` xususiyati yordamida",
        "Sahifani yangilash orqali",
        "So'rovni bekor qilib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "AbortController signalini fetch-ga ulab, keyinchalik `controller.abort()` chaqirish orqali faol so'rovni to'xtatish mumkin."
    },
    {
      id: 9,
      question: "Serverdan kelgan rasm yoki PDF faylni o'qish uchun response-ning qaysi metodidan foydalaniladi?",
      options: [
        "`.json()`",
        "`.text()`",
        "`.blob()`",
        "`.html()`"
      ],
      correctAnswer: 2,
      explanation: "Ikkilik (binary) ko'rinishdagi ma'lumotlarni o'qish uchun `.blob()` (Binary Large Object) metodi ishlatiladi."
    },
    {
      id: 10,
      question: "CORS (Cross-Origin Resource Sharing) nima?",
      options: [
        "Tarmoq ma'lumotlarini shifrlash vositasi",
        "Xavfsizlik nuqtai nazaridan bir domendan boshqa domenga so'rov yuborishni cheklovchi/tartibga soluvchi brauzer mexanizmi",
        "Yangi HTTP protokoli",
        "JSON-ga o'xshash ma'lumot formati"
      ],
      correctAnswer: 1,
      explanation: "CORS — brauzerlar xavfsizligini ta'minlash maqsadida boshqa manbalardan ma'lumot yuklashni cheklovchi xavfsizlik qoidasidir."
    },
    {
      id: 11,
      question: "Authorization sarlavhasida Token yuborish uchun qaysi format ko'p ishlatiladi?",
      options: [
        "`Token mytoken123`",
        "`Bearer mytoken123`",
        "`Auth mytoken123`",
        "`Key mytoken123`"
      ],
      correctAnswer: 1,
      explanation: "Veb standartlarida ko'pincha tokenlar Authorization headerida `Bearer <token>` ko'rinishida yuboriladi."
    },
    {
      id: 12,
      question: "So'rov parametrlarini (query parameters, masalan `?limit=10&page=2`) fetch-da qanday yuboramiz?",
      options: [
        "Body ichiga qo'shib",
        "URL oxiriga string ko'rinishida yoki URLSearchParams yordamida qo'shib",
        "Headers ichida",
        "Parametrlarni yuborib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Query parametrlari GET so'rovlarida to'g'ridan-to'g'ri URL manzilining oxiriga qo'shib yuboriladi."
    },
    {
      id: 13,
      question: "Promise.all() va Promise.allSettled() o'rtasidagi asosiy farq nima?",
      options: [
        "Promise.all() barcha promiselar yakunlanishini har doim kutadi; Promise.allSettled() esa bittasi reject bo'lishi bilan zudlik bilan tugaydi",
        "Promise.all() faqat bitta promiseni bajaradi; Promise.allSettled() barchasini parallel bajaradi",
        "Promise.all() bitta reject bo'lsa ham zudlik bilan reject bo'ladi (all-or-nothing); Promise.allSettled() esa barcha promiselar (xato yoki muvaffaqiyatli) tugashini to'liq kutadi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 2,
      explanation: "Promise.all 'all-or-nothing' tamoyilida ishlaydi, ya'ni bitta xato butun natijani bekor qiladi. Promise.allSettled esa har bir promisening yakuniy holatini (statusini) to'liq to'plab beradi."
    },
    {
      id: 14,
      question: "JavaScript Event Loop-da Promise callbacks (.then / .catch) qaysi navbatga (queue) joylashtiriladi?",
      options: [
        "Macrotask Queue (Task Queue)",
        "Microtask Queue (Job Queue)",
        "Callback Stack",
        "Web APIs"
      ],
      correctAnswer: 1,
      explanation: "Promises rezolyutsiyalari (then, catch, finally) Microtask Queue (Job Queue) ga joylashtiriladi va Macrotask Queue ga qaraganda yuqori ustuvorlikda bajariladi."
    }
  ]
};

export const asyncPolyfills = {
  id: "asyncPolyfills",
  title: "Asinxron Dasturlash va Promise Polyfill-lar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

JavaScript tili bir vaqtning o'zida faqat bitta vazifani bajara oladi (Single-threaded). Ammo asinxron operatsiyalar (tarmoq so'rovlari, taymerlar) tufayli u bir vaqtda ko'plab ishlarni parallel bajarayotgandek tuyuladi. Buning ortida **Event Loop (Sikl hodisasi)** va **Promise (Vada)** yotadi.

### Avtovokzal analogiyasi:
Siz vokzaldan chipta sotib olyapsiz.
- **Sinxron operatsiya (Call Stack):** Chiptani to'g'ridan-to'g'ri kassadan naqd pulga sotib olish. Kassa faqat siz bilan band.
- **Asinxron operatsiya (Promise & Polyfill):** Chiptani buyurtma berib qo'ydingiz. Vokzal xodimi sizga **Vada (Promise)** berdi: "Chiptangiz tayyor bo'lishi bilan SMS yuboramiz". Siz chetda kutib turasiz, kassa esa boshqa mijozlarga xizmat ko'rsatishda davom etadi. Natija kelishi bilan siz SMS (Callback) orqali chiptani olasiz.

---

## 2. 💻 Real Kod Misollari

Sodda Promise polyfill yordamida uning ishlash mexanizmini ko'rish:

\`\`\`javascript
// Sodda Custom Promise class
class CustomPromise {
  constructor(executor) {
    this.status = 'PENDING';
    this.value = undefined;
    this.onResolvedCallbacks = [];

    const resolve = (value) => {
      if (this.status === 'PENDING') {
        this.status = 'RESOLVED';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve);
    } catch (err) {
      // Xatolik handling soddalashtirilgan
    }
  }

  then(onResolved) {
    if (this.status === 'RESOLVED') {
      onResolved(this.value);
    } else {
      this.onResolvedCallbacks.push(() => onResolved(this.value));
    }
    return this;
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Microtasks vs Macrotasks:
Event Loop-da asinxron topshiriqlar navbati ikki turga bo'linadi:
1. **Microtasks (Ustuvor navbat):** \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`. Ular joriy sinxron kod tugashi bilan zudlik bilan, macrotask-lardan oldin ishlaydi.
2. **Macrotasks (Oddiy navbat):** \`setTimeout\`, \`setInterval\`, \`setImmediate\`, tarmoq hodisalari. Har bir macrotask bajarilishidan oldin barcha microtask-lar to'liq tugatiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Promise parallel ishlashini tushunmaslik:** \`Promise.all\` o'rniga \`await\` kalit so'zini loop ichida ketma-ket yozish, bu asinxron kodlarni sinxron kabi kutib kechikish yaratadi.
2. **Promise xatolarini ushlamaslik:** \`.catch()\` yoki \`try/catch\` yozmaslik, bu \`UnhandledPromiseRejection\` xatolariga sabab bo'ladi.

---

## 5. 💬 12 ta Intervyu Savollari

SAVOLLAR quyidagi quizzes bo'limida to'liq test ko'rinishida berilgan.

---

## 8. 🎯 Real Project Case Study

### API parallel yuklanishlarni tezlashtirish
Agarda sahifada 5 ta alohida blok uchun ma'lumotlar API orqali tortilishi kerak bo'lsa, ularni ketma-ket \`await\` orqali kutish sayt yuklanishini sekinlashtiradi. Loyihada \`Promise.all()\` yordamida barcha 5 ta so'rov parallel jo'natiladi, bu umumiy kutish vaqtini eng uzoq davom etadigan bitta so'rov vaqtigacha qisqartiradi.
`,
  exercises: [
    {
      id: 1,
      title: "Promise.all Polyfill yozish",
      instruction: "Berilgan promise-lar massividan barcha natijalar to'liq muvaffaqiyatli kelganidan so'ng natijalar massivini qaytaradigan `customPromiseAll(promises)` funksiyasini yozing. Agar birortasi xato (reject) bersa, darhol o'sha xatoni reject qilsin.",
      startingCode: "function customPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let completed = 0;\n    // Noldan yig'ing\n  });\n}",
      hint: "promises.forEach orqali har birini resolve qiling, index bo'yicha results-ga yozib, completed === promises.length bo'lganda resolve(results) chaqiring.",
      test: "if (typeof customPromiseAll !== 'function') return 'customPromiseAll topilmadi'; const p1 = Promise.resolve(1); const p2 = Promise.resolve(2); return customPromiseAll([p1, p2]).then(res => { if (res[0] === 1 && res[1] === 2) return null; return 'Natijalar xato'; }).catch(e => 'Xatolik: ' + e);"
    },
    {
      id: 2,
      title: "Promise.allSettled Polyfill",
      instruction: "Ushbu polyfill massivdagi barcha promise-lar tugaganidan so'ng (resolve yoki reject bo'lishidan qat'i nazar) har birining holati va natijasini qaytarishi kerak. Qaytish formati: `[{ status: 'fulfilled', value: val }` yoki `{ status: 'rejected', reason: err }]`.",
      startingCode: "function customPromiseAllSettled(promises) {\n  return new Promise((resolve) => {\n    // Yozing\n  });\n}",
      hint: "Har bir promise-ga .then(val => push({status:'fulfilled', value: val})).catch(err => push({status:'rejected', reason: err})) qo'shib tekshiring.",
      test: "if (typeof customPromiseAllSettled !== 'function') return 'customPromiseAllSettled topilmadi'; const p1 = Promise.resolve('ok'); const p2 = Promise.reject('error'); return customPromiseAllSettled([p1, p2]).then(res => { if (res.length === 2 && res[0].status === 'fulfilled' && res[1].status === 'rejected') return null; return 'Format noto\\'g\\'ri'; });"
    },
    {
      id: 3,
      title: "Microtask Scheduler Wrapper",
      instruction: "Berilgan callback funksiyasini odatiy event loop navbatidan oldin, ya'ni Microtask navbatida zudlik bilan bajaradigan `runAsMicrotask(callback)` helperini yozing.",
      startingCode: "function runAsMicrotask(callback) {\n  // Microtask navbatiga qo'shing\n}",
      hint: "queueMicrotask(callback) yoki Promise.resolve().then(callback) dan foydalaning.",
      test: "if (typeof runAsMicrotask !== 'function') return 'runAsMicrotask topilmadi'; let order = []; order.push('start'); runAsMicrotask(() => order.push('micro')); setTimeout(() => { order.push('macro'); }, 0); order.push('end'); return new Promise(resolve => { setTimeout(() => { if (order[0] === 'start' && order[1] === 'end' && order[2] === 'micro' && order[3] === 'macro') resolve(null); else resolve('Event loop tartibi buzildi: ' + order.join(', ')); }, 20); });"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Event Loop-da microtask va macrotask-larning bajarilish ustuvorligi qanday?",
      options: [
        "Macrotask-lar har doim birinchi ishlaydi",
        "Sinxron kod tugagach, barcha microtask-lar macrotask-lardan oldin to'liq bajariladi",
        "Ular parallel ishlaydi",
        "Ular mutlaqo tasodifiy navbat bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Sinxron kod bajarilib bo'lishi bilan, birinchi navbatda microtask navbatidagi barcha vazifalar to'liq ishlaydi, so'ngra navbat macrotask-larga beriladi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri microtask-ga misol bo'la oladi?",
      options: [
        "setTimeout",
        "Promise.then() callback",
        "setInterval",
        "requestAnimationFrame"
      ],
      correctAnswer: 1,
      explanation: "Promise rezolyutsiyasidan keyingi .then()/.catch()/.finally() callbacklari microtask hisoblanadi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri macrotask-ga kiradi?",
      options: [
        "queueMicrotask",
        "Promise.resolve()",
        "setTimeout",
        "process.nextTick"
      ],
      correctAnswer: 2,
      explanation: "setTimeout va setInterval klassik macrotask (yoki task) hisoblanadi."
    },
    {
      id: 4,
      question: "Promise.all() massivdagi promise-lardan biri xato (reject) bersa, qanday yo'l tutadi?",
      options: [
        "Xatoga e'tibor bermay qolganlarini qaytaradi",
        "Darhol butun so'rovni bekor qilib, o'sha xatoni reject qiladi",
        "Barcha promise-lar tugashini kutib keyin xato qaytaradi",
        "Massivni bo'sh qilib qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Promise.all() tezkor rad etish (fast-fail) xususiyatiga ega, ya'ni birorta xato bo'lsa qolganlarni kutmasdan darhol o'sha xatoni qaytaradi."
    },
    {
      id: 5,
      question: "Promise.allSettled() ning Promise.all() dan farqi nimada?",
      options: [
        "U tezroq ishlaydi",
        "U promise-lar muvaffaqiyatli bo'lganmi yoki xato bo'lganmi, hammasining yakuniy holatini (settled) to'liq qaytaradi",
        "U faqat xatolarni o'chirib yuboradi",
        "U faqat sinxron kodlarni ishga tushiradi"
      ],
      correctAnswer: 1,
      explanation: "allSettled har qanday holatda ham barcha promiselar yakunlanishini oxirigacha kutadi va har birining statusi va value/reason ma'lumotlarini massiv ko'rinishida beradi."
    },
    {
      id: 6,
      question: "JavaScript Single-threaded tili bo'lsa, asinxron operatsiyalar (masalan, API fetch) qayerda bajariladi?",
      options: [
        "Ular umuman bajarilmaydi",
        "Brauzer yoki Node.js runtime muhitining yordamchi quyi tizimlari (Web APIs/C++ Thread Pool) da orqa fonda",
        "Faqat CSS qatlamida",
        "Kompyuter xotirasidan tashqarida"
      ],
      correctAnswer: 1,
      explanation: "JavaScript asinxron ishlarni o'zi bajarmaydi, ularni brauzerning Web API (Fetch, setTimeout) yoki Node.js thread pool-lariga topshiradi."
    },
    {
      id: 7,
      question: "Promise obyektining dastlabki holati nima deb ataladi?",
      options: [
        "fulfilled",
        "rejected",
        "pending",
        "settled"
      ],
      correctAnswer: 2,
      explanation: "Promise yaratilganida u hali natija bermagan pending (kutilayotgan) holatda bo'ladi."
    },
    {
      id: 8,
      question: "Promise holatini (status) kod orqali majburan o'zgartirish mumkinmi?",
      options: [
        "Ha, property orqali o'zgartirsa bo'ladi",
        "Yo'q, u faqat ichki resolve/reject funksiyalari chaqirilganda bir martalik o'zgaradi va doimiy qulflanadi",
        "Faqat setTimeout orqali o'zgaradi",
        "Faqat foydalanuvchi tugmani bosganda o'zgaradi"
      ],
      correctAnswer: 1,
      explanation: "Promise holati faqat bir marta pending-dan resolved yoki rejected holatiga o'tishi mumkin va qayta o'zgarmasdir."
    },
    {
      id: 9,
      question: "Quyidagi kod natijasi qanday bo'ladi: console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4');",
      options: [
        "1, 2, 3, 4",
        "1, 4, 3, 2",
        "1, 4, 2, 3",
        "1, 3, 4, 2"
      ],
      correctAnswer: 1,
      explanation: "Sinxron kodlar (1 va 4) birinchi ishlaydi. Keyin microtask (Promise -> 3), eng oxirida macrotask (setTimeout -> 2) bajariladi."
    },
    {
      id: 10,
      question: "JavaScript-da queueMicrotask() funksiyasi nima uchun xizmat qiladi?",
      options: [
        "Katta rasmlarni yuklash uchun",
        "Callback funksiyasini qo'lda asinxron microtask navbatiga joylashtirish uchun",
        "Barcha taymerlarni o'chirish uchun",
        "Massivlarni saralash uchun"
      ],
      correctAnswer: 1,
      explanation: "queueMicrotask() yordamida har qanday callbackni Promise yaratmasdan to'g'ridan-to'g'ri microtask navbatiga qo'shish mumkin."
    },
    {
      id: 11,
      question: "Unhandled Promise Rejection nima uchun yuzaga keladi?",
      options: [
        "Internet o'chib qolganda",
        "Reject bo'lgan (xato bergan) Promise-ni catch() yoki try/catch orqali ushlab olinmaganda",
        "Sinxron kodda sintaktik xato bo'lganda",
        "Baza to'lib qolganda"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da har qanday rad etilgan (reject) promise xatosi dasturchi tomonidan .catch() yoki catch block-da ushlanishi shart, aks holda dastur qulashi mumkin."
    },
    {
      id: 12,
      question: "Promise.race() ning vazifasi nima?",
      options: [
        "Barcha promise-larni parallel kutish",
        "Massivdagi promise-lardan qaysi biri birinchi (resolve yoki reject) yakunlansa, o'sha natijani qaytarish",
        "Faqat eng sekin ishlaydigan promiseni topish",
        "Dasturni to'xtatish"
      ],
      correctAnswer: 1,
      explanation: "Promise.race() poyga usulida ishlaydi: eng birinchi yakunlangan (xato yoki muvaffaqiyatli) promisening natijasini o'zlashtiradi."
    }
  ]
};

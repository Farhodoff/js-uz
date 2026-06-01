export const errorHandling = {
  id: "error-handling",
  title: "Xatolar bilan ishlash: Mustahkam va xavfsiz kod yozish",
  level: "O'rta/Murakkab",
  description: "Dasturingiz 'portlab' ketmasligi uchun xatolarni ushlash, boshqarish va to'g'ri qayta joylashtirish.",
  theory: `## 1. NEGA kerak?

Dasturlashda xatolar va kutilmagan holatlar (masalan, tarmoq uzilishi, noto'g'ri foydalanuvchi kiritmasi yoki server xatosi) muqarrar. Agar ushbu xatolar to'g'ri boshqarilmasa, butun JavaScript dasturi ishlashdan to'xtaydi (crash bo'ladi).

Xatolar bilan ishlashning (Error Handling) oily maqsadi — xato sodir bo'lganda ham dasturning **butun sayt to'xtab qolmasligini** ta'minlash va foydalanuvchiga tushunarli ma'lumot berishdir.

---

## 2. SODDALIK (Analogiya)

Buni sirkdagi **xavfsizlik to'ri** (safety net) deb tasavvur qiling. 
- Dorboz (kod) balandlikda harakat qilmoqda.
- Agar u yiqilsa (xato yuz bersa) va xavfsizlik to'ri (try...catch) bo'lmasa, u yerga yiqilib jarohat oladi (dastur o'chadi).
- Agar xavfsizlik to'ri bo'lsa, dorboz unga yiqiladi, jarohat olmaydi va o'yinni xavfsiz davom ettirishi mumkin.

---

## 3. CHUQUR TUSHUNCHALAR VA ILG'OR MEXANIZMLAR

### A. Exception Bubbling (Xatolarning Stek Bo'ylab Qalqushi)
JavaScript-da xatolik yuz berganida, dvigatel joriy funksiya ichida \`try...catch\` bloki bor-yo'qligini qidiradi. Agar topilmasa, u joriy funksiyani Call Stack-dan chiqarib yuboradi va uni chaqirgan ota funksiyadagi \`try...catch\`ni qidiradi. Bu jarayon xato ushlangunga qadar yoki global doiraga yetib borguncha davom etadi. Agar hech qayerda ushlanmasa, u **Tutilmagan Xato (Uncaught Error)** sifatida dasturni to'xtatadi.

\`\`\`mermaid
graph TD
    A[Xatolik yuz berdi] --> B{Joriy funksiyada try...catch bormi?}
    B -- Ha --> C[catch blokini bajarish]
    B -- Yo'q --> D[Call Stack-dan chiqarish]
    D --> E{Ota funksiya bormi?}
    E -- Ha --> B
    E -- Yo'q --> F[Global Uncaught Error]
\`\`\`

### B. Error Cause (Xato Sababini Zanjirlash - ES2022)
Ko'p hollarda biz past darajadagi xatolarni (masalan, tarmoq xatolari yoki ma'lumotlar bazasi xatolarini) tutib, ularni yuqori darajadagi tushunarli xatolarga o'ramoqchi (wrap qilmoqchi) bo'lamiz. ES2022 dan boshlab \`new Error()\` konstruktoriga maxsus \`cause\` (sabab) xossasini uzatish mumkin. Bu orqali xatolik zanjirlari ziyon ko'rmasdan saqlanib qoladi:

\`\`\`javascript
try {
  database.saveUser(user);
} catch (err) {
  // pastki xatoni yuqori darajali xato ichiga ulab otamiz
  throw new Error("Foydalanuvchini saqlab bo'lmadi", { cause: err });
}
\`\`\`

\`\`\`mermaid
classDiagram
    class UserError {
        +String name: "UserSaveError"
        +String message: "Foydalanuvchini saqlab bo'lmadi"
    }
    class LowLevelError {
        +String name: "DatabaseTimeoutError"
        +String message: "Database connection timed out"
    }
    UserError --> LowLevelError : cause (original error)
\`\`\`

### C. Custom Error (Maxsus Xatolar) va prototype.name
Katta loyihalarda standart \`Error\` klassidan voris olib o'zimizning xato klasslarimizni yasashimiz lozim. Voris olinganda \`super(message)\` chaqirilishi va \`this.name\` o'rnatilishi shart:
\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
\`\`\`

### D. Safe JSON parsing pattern
Sinxron kodlarda \`JSON.parse()\` noto'g'ri format berilsa darhol xato otib, dasturni buzadi. Buning oldini olish uchun xavfsiz wrapper patternini qo'llash tavsiya etiladi:
\`\`\`javascript
function safeJSONParse(str, fallbackValue = {}) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallbackValue;
  }
}
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR
1. **Silent Failures (Jimjitlik xatosi):** Xatolikni catch ichida shunchaki yashirib ketish. Bu dasturdagi muammolarni qidirishni judayam murakkablashtiradi.
2. **Asinxron kodlarda oddiy try...catch ishlatish:** Agar asinxron chaqiriq oldiga \`await\` qo'yilmasa, try...catch uni tuta olmaydi.

---

## 5. SAVOLLAR VA JAVOBLAR

**1. finally bloki qachon ishlaydi?**
finally bloki har doim (try blokida xato bo'lsa ham, bo'lmasa ham, xatto try yoki catch ichida return bo'lsa ham) bajariladi.

**2. Error cause nima uchun ishlatiladi?**
Xato zanjirini saqlab qolish uchun. Biror past darajadagi xatoni (masalan, tarmoq xatosi) ushlab, yuqori darajadagi o'ralgan xatoga sabab qilib bog'lashda qo'l keladi.

**3. ReferenceError va TypeError farqi nimada?**
ReferenceError mavjud bo'lmagan o'zgaruvchiga murojaat qilinganda kelib chiqadi. TypeError esa mavjud obyekt ustida noto'g'ri turdagi operatsiya (masalan, \`undefined.toString()\`) bajarilganda yuz beradi.

**4. Global darajada tutilmagan xatolarni brauzerda qanday tinglash mumkin?**
\`window.addEventListener('unhandledrejection')\` asinxron promiselar uchun va \`window.onerror\` sinxron xatolar uchun.

**5. Custom error klasslarida super(message) nima qiladi?**
Ota sinf (\`Error\`) konstruktorini chaqiradi, bu esa xato xabarini va stack trace (chaqiriqlar tarixi)ni to'g'ri shakllantirish imkonini beradi.
`,
  exercises: [
    {
      id: 1,
      title: "JSON Parse Xatosini Tutish",
      instruction: "Berilgan noto'g'ri JSON matnini parse qilayotganda yuz beradigan xatoni `try...catch` yordamida tuting va konsolga 'Xato yuz berdi' deb chiqaring.",
      startingCode: "const jsonStr = '{ invalid json }';\ntry {\n  // JSON parse qiling\n} catch (e) {\n  // Konsolga yozing\n}",
      hint: "JSON.parse(jsonStr) va console.log('Xato yuz berdi')",
      test: "if (logs.includes('Xato yuz berdi')) return null; return 'Xato to\\'g\\'ri tutilmadi';"
    },
    {
      id: 2,
      title: "Yosh Cheklovi Xatosini Tashlash",
      instruction: "`checkAge` funksiyasida agar `age` 18 dan kichik bo'lsa, `throw new Error('Yosh yetarli emas')` yordamida xato tashlang.",
      startingCode: "function checkAge(age) {\n  // Kodni shu yerga yozing\n}",
      hint: "if (age < 18) { throw new Error('Yosh yetarli emas'); }",
      test: "try { checkAge(15); return 'Xato tashlanmadi'; } catch (e) { if (e.message === 'Yosh yetarli emas') return null; return 'Xato xabari noto\\'g\\'ri'; }"
    },
    {
      id: 3,
      title: "Finally Bloki Bilan Ishlash",
      instruction: "`processData` funksiyasida `try...catch...finally` ishlating. Har qanday holatda ham `finally` blokida konsolga 'Tugadi' deb chiqaring.",
      startingCode: "function processData() {\n  try {\n    throw new Error('Test xato');\n  } catch (e) {\n    console.log('Ushlandi');\n  }\n  // finally blokini yozing\n}",
      hint: "finally { console.log('Tugadi'); }",
      test: "if (logs.includes('Ushlandi') && logs.includes('Tugadi')) return null; return 'Finally ishlamadi';"
    },
    {
      id: 4,
      title: "Xato Turini Aniqlash",
      instruction: "`catch` blokida tutilgan xato `TypeError` ekanligini `instanceof` yordamida tekshiring va agar shunday bo'lsa konsolga 'Tip xatosi' deb chiqaring.",
      startingCode: "try {\n  const num = null;\n  num.toUpperCase();\n} catch (e) {\n  // e instanceof TypeError ni tekshiring\n}",
      hint: "if (e instanceof TypeError) { console.log('Tip xatosi'); }",
      test: "if (logs.includes('Tip xatosi')) return null; return 'TypeError aniqlanmadi';"
    },
    {
      id: 5,
      title: "Xavfsiz Bo'lish Funksiyasi",
      instruction: "Ikki sonni bo'luvchi funksiya yarating. Agar maxraj (`b`) 0 bo'lsa, `throw new Error('Nolga bo\\'lish mumkin emas')` tashlasin.",
      startingCode: "function divide(a, b) {\n  // Kodni yozing\n}",
      hint: "if (b === 0) throw new Error('Nolga bo\\'lish mumkin emas'); return a / b;",
      test: "try { if (divide(10, 2) !== 5) return 'Bo\\'lish xato'; divide(10, 0); return '0 ga bo\\'lganda xato tashlanmadi'; } catch(e) { if (e.message === 'Nolga bo\\'lish mumkin emas') return null; return 'Xato xabari mos kelmadi'; }"
    },
    {
      id: 6,
      title: "Maxsus Xato Klassi (Custom Error)",
      instruction: "`ValidationError` nomli maxsus xato klassini yarating (u `Error` klassidan voris olsin). `constructor` ichida xato xabarini `super()` orqali o'rnating va uning `name` xususiyatini `'ValidationError'` qiling.",
      startingCode: "// ValidationError klassini yarating\n",
      hint: "class ValidationError extends Error { constructor(message) { super(message); this.name = 'ValidationError'; } }",
      test: "const err = new ValidationError('Email xato'); if (err instanceof Error && err.name === 'ValidationError' && err.message === 'Email xato') return null; return 'ValidationError klassi to\\'g\\'ri yaratilmadi';"
    },
    {
      id: 7,
      title: "Promise Xatosini Catch Qilish",
      instruction: "Promise orqali yuborilgan xatoni `.catch()` yordamida tuting va konsolga 'Xato: [error message]' ko'rinishida yozing.",
      startingCode: "function handleFetchError() {\n  return Promise.reject(new Error('Ulanish xatosi'))\n    // catch blokini qo'shing\n}",
      hint: ".catch(err => console.log('Xato: ' + err.message))",
      test: "return handleFetchError().then(() => { if (logs.some(l => l.includes('Xato: Ulanish xatosi'))) return null; return 'Promise xatosi tutilmadi'; });"
    },
    {
      id: 8,
      title: "Async/Await va Try-Catch",
      instruction: "`fetchData` asinxron funksiyasida xato tashlaydigan Promise chaqirilgan. Uni `try...catch` yordamida o'rab, xato xabarini konsolga chiqaring.",
      startingCode: "async function fetchData() {\n  const getPromise = () => Promise.reject(new Error('Server band'));\n  // try...catch ichida getPromise() ni await qiling\n}",
      hint: "try { await getPromise(); } catch(e) { console.log(e.message); }",
      test: "return fetchData().then(() => { if (logs.includes('Server band')) return null; return 'Asinxron xato to\\'g\\'ri tutilmadi'; });"
    },
    {
      id: 9,
      title: "Xatoni Qayta Tashlash (Rethrow)",
      instruction: "`readConfig` funksiyasida xato sodir bo'lsa, agar u `SyntaxError` bo'lsa uni tutib konsolga 'Sintaksis xato' deb yozing. Boshqa har qanday kutilmagan xatoni esa qayta tashlang (`throw e`).",
      startingCode: "function readConfig(fn) {\n  try {\n    fn();\n  } catch (e) {\n    // SyntaxError bo'lsa konsolga yozing, aks holda qayta throw qiling\n  }\n}",
      hint: "if (e instanceof SyntaxError) { console.log('Sintaksis xato'); } else { throw e; }",
      test: "let rethrown = false; try { readConfig(() => { throw new TypeError('Tur xatosi'); }); } catch(e) { if (e instanceof TypeError) rethrown = true; } let handled = false; try { readConfig(() => { throw new SyntaxError('Sintaksis'); }); handled = logs.includes('Sintaksis xato'); } catch(e) {} if (rethrown && handled) return null; return 'Rethrowing mantiqi noto\\'g\\'ri bajarildi';"
    },
    {
      id: 10,
      title: "Ichma-ich Try-Catch",
      instruction: "Ichki `try...catch` blokida xato yuz beradi va u ushlanib, qayta boshqa xato ko'rinishida tashlanadi (`throw new Error('Yangi')`). Tashqi `try...catch` esa bu yangi xatoni tutib konsolga chiqarsin.",
      startingCode: "try {\n  try {\n    throw new Error('Eski');\n  } catch (innerError) {\n    // Yangi xato tashlang\n  }\n} catch (outerError) {\n  // Konsolga chiqaring\n}",
      hint: "throw new Error('Yangi') ichki catchda, console.log(outerError.message) tashqi catchda.",
      test: "if (logs.includes('Yangi')) return null; return 'Tashqi catch yangi xatoni tutmadi';"
    },
    {
      id: 11,
      title: "Massiv O'lchami Xatosini Oldini Olish",
      instruction: "Berilgan o'lcham bo'yicha massiv yaratadigan `createArray` funksiyasini yozing. Noto'g'ri o'lcham tufayli kelib chiqadigan `RangeError`ni `try...catch` bilan tutib konsolga 'Noto\\'g\\'ri o\\'lcham' deb yozing.",
      startingCode: "function createArray(size) {\n  try {\n    // new Array(size) qiling\n  } catch (e) {\n    // RangeError ekanligini tekshirib konsolga chiqaring\n  }\n}",
      hint: "try { new Array(size); } catch(e) { if (e instanceof RangeError) console.log('Noto\\'g\\'ri o\\'lcham'); }",
      test: "createArray(-5); if (logs.includes('Noto\\'g\\'ri o\\'lcham')) return null; return 'RangeError tutilmadi';"
    },
    {
      id: 12,
      title: "Obyekt Maydonlarini Validatsiya Qilish",
      instruction: "`validateUser(user)` funksiyasini yozing. Agar `user` obyektida `username` bo'lmasa, `throw new Error('Foydalanuvchi nomi majburiy')` qilsin.",
      startingCode: "function validateUser(user) {\n  // Kodni yozing\n}",
      hint: "if (!user.username) throw new Error('Foydalanuvchi nomi majburiy');",
      test: "try { validateUser({ age: 25 }); return 'Xato tashlanmadi'; } catch (e) { if (e.message === 'Foydalanuvchi nomi majburiy') return null; return 'Xato xabari noto\\'g\\'ri'; }"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Xavfsiz JSON Parse (safeJSONParse)",
      instruction: "Berilgan satrni xavfsiz JSON.parse qiladigan `safeJSONParse(str, fallback)` funksiyasini yozing. Noto'g'ri JSON bo'lsa, xato tashlamasdan `fallback` qiymatini qaytarsin.",
      startingCode: "function safeJSONParse(str, fallback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { return JSON.parse(str); } catch (e) { return fallback; }",
      test: "if (typeof safeJSONParse !== 'function') return 'safeJSONParse funksiya emas';\nif (safeJSONParse('{\"a\": 1}', {})?.a !== 1) return 'To\\'g\\'ri JSON xato parse qilindi';\nif (JSON.stringify(safeJSONParse('{invalid}', { b: 2 })) !== '{\"b\":2}') return 'Fallback noto\\'g\\'ri qaytdi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Error cause bog'lash (fetchWithErrorCause)",
      instruction: "Berilgan `url`ga fetch yuboring. Agar tarmoq xatosi yuz bersa (catch), uni ushlab, `new Error('Tarmoq yuklash xatosi', { cause: err })` deb original xatoni ulab qayta tashlang (throw).",
      startingCode: "async function fetchWithErrorCause(url) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { return await fetch(url); } catch (err) { throw new Error('Tarmoq yuklash xatosi', { cause: err }); }",
      test: "if (typeof fetchWithErrorCause !== 'function') return 'fetchWithErrorCause funksiya emas';\nreturn fetchWithErrorCause('https://invalid-domain-does-not-exist.xyz').then(() => 'Xato tashlanmadi').catch(err => {\n  if (err.message === 'Tarmoq yuklash xatosi' && err.cause instanceof Error) return null;\n  return 'Error cause zanjiri noto\\'g\\'ri shakllantirilgan';\n});"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da `try...catch` blokining asosiy maqsadi nima?",
      options: [
        "Kod tezligini va unumdorligini oshirish",
        "Kutilmagan xatolar tufayli butun dastur to'xtab qolishining oldini olish",
        "O'zgaruvchilarni avtomatik ravishda e'lon qilish",
        "Balla asinxron kodlarni sinxron kodga o'tkazish"
      ],
      correctAnswer: 1,
      explanation: "`try...catch` yuzaga keladigan xatolarni boshqarish imkonini beradi va kutilmagan xatolar tufayli bu dasturning ishdan chiqishini (crash bo'lishini) oldini oladi."
    },
    {
      id: 2,
      question: "JavaScript'da `finally` blokining asosiy xususiyati nima?",
      options: [
        "Faqat xato bo'lmaganda ishlaydi",
        "Faqat xato bo'lganda ishlaydi",
        "Xato bo'lishi yoki bo'lmasligidan qat'iy nazar har doim ishlaydi",
        "Hech qachon ishlamaydi"
      ],
      correctAnswer: 2,
      explanation: "`finally` har doim try va catch bajarilgandan so'ng, xato sodir bo'lishi yoki bo'lmasligidan qat'iy nazar, eng oxirida bajariladi. Resurslarni tozalash uchun juda qulay."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri JavaScript-dagi standart Error obyektining xususiyati (property) hisoblanmaydi?",
      options: [
        "message (xato matni)",
        "name (xato turi nomi)",
        "stack (chaqiriqlar stek izi)",
        "status (HTTP status kodi)"
      ],
      correctAnswer: 3,
      explanation: "Standart Error obyektida faqat `message`, `name` va `stack` xususiyatlari mavjud. `status` kodi standart Error obyektida avtomatik bo'lmaydi."
    },
    {
      id: 4,
      question: "Mavjud bo'lmagan o'zgaruvchiga murojaat qilinganda qanday xato chiqadi?",
      options: ["TypeError", "ReferenceError", "SyntaxError", "RangeError"],
      correctAnswer: 1,
      explanation: "E'lon qilinmagan yoki mavjud bo'lmagan o'zgaruvchi chaqirilganda `ReferenceError` tashlanadi."
    },
    {
      id: 5,
      question: "JavaScript-da `throw` operatorining vazifasi nima?",
      options: [
        "Xatolarni yashirish",
        "Dasturni butunlay o'chirish",
        "Dasturchi tomonidan ataylab yangi xatolik (exception) yaratish va tashlash",
        "Funksiyadan qiymat qaytarish"
      ],
      correctAnswer: 2,
      explanation: "`throw` operatori yordamida biz o'zimiz shartlar asosida yangi xato yaratib uni tashlashimiz mumkin (masalan, `throw new Error('xato')`)."
    },
    {
      id: 6,
      question: "`null` yoki `undefined` qiymatlari ustida metod chaqirilganda qanday turdagi xato yuz beradi?",
      options: ["ReferenceError", "TypeError", "SyntaxError", "RangeError"],
      correctAnswer: 1,
      explanation: "Noto'g'ri obyektdan xususiyat yoki metod olishga urinilganda `TypeError` yuz beradi (masalan, `Cannot read properties of null`)."
    },
    {
      id: 7,
      question: "Oddiy `try...catch` bloki `setTimeout` callback funksiyasi ichida tashlangan xatoni tuta oladimi?",
      options: [
        "Ha, chunki try...catch global xatolarni ham tutadi",
        "Yo'q, chunki callback asinxron ishlaydi va u chaqirilganda try...catch allaqachon bajarilib bo'lingan bo'ladi",
        "Faqat browser muhitida tutadi",
        "Faqat catch bloki bo'sh bo'lmasa tutadi"
      ],
      correctAnswer: 1,
      explanation: "`try...catch` faqat sinxron kodlar uchun ishlaydi. Asinxron ravishda boshqa navbatda ishlaydigan callback xatosini u tuta olmaydi."
    },
    {
      id: 8,
      question: "Async/Await funksiyalarida asinxron xatolarni qanday qulay tutish mumkin?",
      options: [
        "Har bir await qatorining oxiriga `.catch()` yozib",
        "`await` chaqiriqlarini oddiy `try...catch` blokining ichiga o'rash orqali",
        "Buni asinxron kodda qilishning iloji yo'q",
        "Maxsus `await.catch` kalit so'zini ishlatish orqali"
      ],
      correctAnswer: 1,
      explanation: "`async/await` asinxron kodni xuddi sinxron ko'rinishda yozish imkonini berganligi sababli, undagi xatolarni oddiy `try...catch` yordamida tutish mumkin."
    },
    {
      id: 9,
      question: "Xatolarni qayta tashlash (Rethrowing) nima?",
      options: [
        "Xatoni tutgach, console.log da ko'rsatib dasturni davom ettirish",
        "Xatoni catch ichida ushlab, agar u boshqa turdagi bo'lsa, uni qayta tashqi muhitga throw qilish",
        "Xatoni boshqa sahifaga yo'naltirish",
        "Dasturdagi barcha xatolarni o'chirish"
      ],
      correctAnswer: 1,
      explanation: "Rethrowing deb catch bloki ichida tutilgan xatoni tekshirib, agar u ushbu catchga tegishli bo'lmasa, uni qayta `throw e` qilishga aytiladi."
    },
    {
      id: 10,
      question: "Maxsus xato klassini (Custom Error) yaratish uchun standart qaysi klassdan voris (extends) olinadi?",
      options: ["Object", "Error", "Exception", "ValidationError"],
      correctAnswer: 1,
      explanation: "Maxsus xato klasslarini yaratish uchun JavaScript-dagi standart `Error` klassidan voris olinadi (masalan, `class MyError extends Error {}`)."
    },
    {
      id: 11,
      question: "Massiv yaratishda manfiy son kiritilsa (masalan, `new Array(-1)`), qanday xato tashlanadi?",
      options: ["TypeError", "ReferenceError", "RangeError", "SyntaxError"],
      correctAnswer: 2,
      explanation: "Qiymat ruxsat etilgan chegaradan chiqib ketganda `RangeError` yuzaga keladi."
    },
    {
      id: 12,
      question: "JavaScript-da `throw` operatori orqali qanday qiymatlarni tashlash (throw qilish) mumkin?",
      options: [
        "Faqat Error obyekti namunalarini",
        "Faqat String turidagi matnlarni",
        "Istalgan ma'lumot turini (obyekt, matn, son, boolean va h.k.)",
        "Faqat sonlarni"
      ],
      correctAnswer: 2,
      explanation: "JavaScript-da `throw` operatori juda moslashuvchan va har qanday qiymatni tashlay oladi, lekin standart bo'yicha har doim `Error` obyektini tashlash tavsiya etiladi."
    },
    {
      id: 13,
      question: "JavaScript-dagi Error.cause xossasining asosiy vazifasi nima (ES2022)?",
      options: [
        "Xatoliklarning yuzaga kelish tezligini kamaytirish",
        "Xatoliklarni bir-biriga bog'lab, pastki (original) xatoning yuqori darajadagi xato ichida saqlanishini ta'minlash (xato zanjirlari)",
        "Xatoliklarni serverga avtomatik yuborish",
        "Xato kodini o'zgartirish"
      ],
      correctAnswer: 1,
      explanation: "ES2022 da taqdim etilgan `cause` xossasi orqali yuqori darajadagi xatoga pastki darajadagi original xato obyekti bog'lanadi. Bu xatolar zanjirini o'rganishni osonlashtiradi."
    },
    {
      id: 14,
      question: "Tutilmagan xatolarning Call Stack bo'ylab qalqishi (Exception Bubbling) nima?",
      options: [
        "Xato yuz berganda sahifaning avtomatik yuqoriga scroll bo'lishi",
        "Xato sodir bo'lgan funksiyadan ota chaqiruvchi funksiyalarga, toki `try...catch` topilguncha yoki global doiraga yetguncha xatoning yuqoriga uzatilishi",
        "Memory leak yuzaga kelishi",
        "Xatolarni avtomatik o'chirib yuborish mexanizmi"
      ],
      correctAnswer: 1,
      explanation: "Exception Bubbling — agar joriy doirada try-catch bo'lmasa, xatoning stack bo'ylab yuqoriga qarab qalqishi va chaqiruvchi doiralarda izlanishidir."
    }
  ]
};

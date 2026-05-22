export const callbacksLesson = {
  id: "a0",
  title: "📞 Callbacks — Asinxronlikga Kirish",
  level: "Murakkab",
  description: "Callback funksiyalari, Event Loop, va asinxron ishlarning asosiy mexanizmi.",
  theory: `## 📌 CALLBACK FUNKSIYALARI — ASOSIY BOSQICH

### 1. NEGA KERAK? (Sabab)
Tasavvur qiling: Siz tomoshabinga bilet olishga kitkasiz. Bilet olish 2-3 minutini oladi. Lekin siz:
- ❌ 3 minut to'xtab turmaysiz (blokirovka — brauzer to'xtab qoladi)
- ✅ Navbat nomeri (Promise) olasiz va borish davom etasiz

**JavaScript'da:**
- Eski usul: Kut, kut, kut... (bloklanish)
- Zamonaviy usul: Asinxron (asosiy kod davom etadi, vazifa tugagandan so'ng xabar ol)

**Callback:** "Mening vazifasi tugagandan so'ng bu funksiyani chaqir!" — shu bu.

---

### 2. SODDALIK (Haqiqiy Analogiya)

#### Sinxron (Ketma-ketlik)
\`\`\`
Restoran ≈ Kod
Siz buytutasiz → Oshpaz tayyorlaydi → Siz olesiz
1. then 2. then 3.
\`\`\`

#### Asinxron (Callback)
\`\`\`
Kafé ≈ Kod
Siz buytutasiz → Navbat nomeri olasiz → Siz o'tirasan, kitob o'qiysiz
                   → "Ali! 123 raqam tayyor!" (Callback chaqiriladi)
                   → Siz borasiz, olasiz
\`\`\`

---

### 3. TUSHUNCHA (BATAFSIL)

#### A. SINXRON vs ASINXRON

**Sinxron (Bloklanadi):**
\`\`\`javascript
function maʻlumotOl() {
  // Bu 5 soniyani oladi
  return "Ma'lumot"; // TO'LDIRILGUNCHA KOD BO'SHASHADI
}

console.log("Boshlandi");
const natija = maʻlumotOl(); // 5 SONIYA KUTILADI
console.log("Tugadi");
\`\`\`

**Asinxron (Blokirovka yoʻq):**
\`\`\`javascript
function maʻlumotOlAsync(callback) {
  setTimeout(() => {
    callback("Ma'lumot"); // 5 soniyadan keyin chaqiriladi
  }, 5000);
}

console.log("Boshlandi");
maʻlumotOlAsync((natija) => {
  console.log(natija); // "Ma'lumot" (5 s keyin)
});
console.log("Tugadi"); // DARHOL chiqadi!
\`\`\`

#### B. ODDIY CALLBACK

\`\`\`javascript
// 1. Callback qabul qiluvchi funksiya
function salomBer(ism, callback) {
  console.log("Salom " + ism);
  callback(); // Callback chaqir
}

// 2. Callback funksiyani berish
salomBer("Ali", () => {
  console.log("Callback ishga tushdi!");
});

// OUTPUT:
// Salom Ali
// Callback ishga tushdi!
\`\`\`

#### C. CALLBACK PARAMETRLAR BILAN

\`\`\`javascript
function calculatorAsync(a, b, operation, callback) {
  setTimeout(() => {
    let natija;
    if (operation === "+") natija = a + b;
    else if (operation === "-") natija = a - b;
    else if (operation === "*") natija = a * b;

    callback(natija); // Natijani callback ga berish
  }, 1000);
}

calculatorAsync(5, 3, "+", (result) => {
  console.log("Natija: " + result); // "Natija: 8"
});
\`\`\`

---

### 4. ASINXRONLIKNING MEXANIZMI (Event Loop)

#### setTimeout qanday ishlaydi?
\`\`\`javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0); // 0 ms bo'lsa ham, navbat kutadi!

console.log("3");

// OUTPUT:
// 1
// 3
// 2 (eng oxirida)
\`\`\`

#### Vizual:
\`\`\`
┌─────────────────────────────────────┐
│  CALL STACK                         │
│  (Hozircha qaysi kod ishlayotgani)  │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  WEB API (Browser API)              │
│  - setTimeout                       │
│  - fetch                            │
│  - event listener                   │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  CALLBACK QUEUE (Navbat)            │
│  setTimeout callback navbatni kutadi│
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  EVENT LOOP                         │
│  "Call Stack bo'shmi? Navbattan     │
│   qabul qil!"                       │
└─────────────────────────────────────┘
\`\`\`

---

### 5. CALLBACK HELL (Piramida Muammosi)

#### Muamma:
\`\`\`javascript
// ❌ KOD JUDA MURAKKAB VA O'QISHGA QIYIN
getUserData(userId, (user) => {
  console.log("Foydalanuvchi:", user);

  getFollowers(user.id, (followers) => {
    console.log("Kuzatuvchilar:", followers);

    getFollowersPosts(followers[0].id, (posts) => {
      console.log("Postlar:", posts);

      getComments(posts[0].id, (comments) => {
        console.log("Izohlar:", comments);
        // ⬆️ PYRAMID SHAKLIDA BORIB KETADI!
      });
    });
  });
});
\`\`\`

#### Yechim (Callback best practice):
\`\`\`javascript
// ✅ HARSONINI NOMI BILAN AJRATISH
function ishlashBoshi() {
  getUserData(userId, foydalanuvchiTanimadi);
}

function foydalanuvchiTanimadi(user) {
  console.log("Foydalanuvchi:", user);
  getFollowers(user.id, kuzatuvchilarTanimadi);
}

function kuzatuvchilarTanimadi(followers) {
  console.log("Kuzatuvchilar:", followers);
  getFollowersPosts(followers[0].id, postlarTanimadi);
}

function postlarTanimadi(posts) {
  console.log("Postlar:", posts);
  // Va shu tarzda...
}

ishlashBoshi();
\`\`\`

---

### 6. CALLBACK XATOLAR VA EDGE CASES

#### ❌ Xato 1: Callback ikki marta chaqirilish
\`\`\`javascript
// XATO ❌ - Callback necha marta chaqirilishini nazorat qilolmaymiz
function fetch_data(callback) {
  callback("data1");
  callback("data2"); // Ikki marta! Xato!
}

// TO'G'RI ✅
function fetch_data(callback) {
  callback("data1");
  // Keyingi chaqirish yoʻq
}
\`\`\`

#### ❌ Xato 2: Callback chaqirilmasligi
\`\`\`javascript
// XATO ❌
function fetch_data(callback) {
  setTimeout(() => {
    // callback chaqirilmadi!
  }, 1000);
}

fetch_data(() => console.log("Done")); // Hech qachon chiqmaydi!

// TO'G'RI ✅
function fetch_data(callback) {
  setTimeout(() => {
    callback("success");
  }, 1000);
}
\`\`\`

#### ❌ Xato 3: Error handling yo'q
\`\`\`javascript
// XATO ❌ - Xatolik bo'lganda nima? Hech kim bilmaydi!
function fetch_data(callback) {
  try {
    const data = JSON.parse(invalidJson);
    callback(data);
  } catch (e) {
    // Xato yashiringan!
  }
}

// TO'G'RI ✅ - Error callback
function fetch_data(callback, errorCallback) {
  try {
    const data = JSON.parse(validJson);
    callback(data);
  } catch (e) {
    errorCallback(e); // Xatoni bildir
  }
}

fetch_data(
  (data) => console.log(data),
  (error) => console.error("Xato:", error)
);
\`\`\`

---

### 7. REAL HAYOTDAGI MISOLLAR

#### Misol 1: API dan ma'lumot olish
\`\`\`javascript
function getUserFromAPI(userId, callback) {
  setTimeout(() => {
    const user = {
      id: userId,
      ism: "Ali",
      email: "ali@example.com"
    };
    callback(user);
  }, 1000);
}

getUserFromAPI(1, (user) => {
  console.log("Foydalanuvchi:", user.ism);
});
\`\`\`

#### Misol 2: File tashkil etish
\`\`\`javascript
function readFileAsync(filename, callback) {
  setTimeout(() => {
    const content = "Fayl mazmuni...";
    callback(null, content); // Node.js uslubi: (error, data)
  }, 1000);
}

readFileAsync("file.txt", (error, content) => {
  if (error) {
    console.error("Xato:", error);
  } else {
    console.log("Mazmun:", content);
  }
});
\`\`\`

---

### 8. 12 TA SAVOL VA JAVOBLAR

**<b>1. Callback nima?</b>**
Funksiyaga argument sifatida uzatiladigan boshqa bir funksiya, odatda asinxron vazifalar tugagandan so'ng bajarilish uchun.


**<b>2. Sinxron vs asinxron farqi?</b>**
Sinxron: Natija kutilguncha kod to'xtadi. Asinxron: Kod davom etadi, natija kelib bo'lganda callback chaqiriladi.


**<b>3. setTimeout(fn, 0) nima qiladi?</b>**
Funksiyani darhol emas, balki joriy call stack bo'shagandan so'ng (navbatdagi) bajaradi.


**<b>4. Event Loop nima?</b>**
JavaScript mexanizmi: "Call stack bo'shmi? Callback queue'dan qabul qil!" deb navbatdagi callbacklarni ishga tushiradi.


**<b>5. Callback Hell (Pyramid) nima?</b>**
Bir-biriga bog'liq ko'p callback'lar bo'lganda, kod ichma-ich kirib, o'qishga og'ir bo'ladi.


**<b>6. Inversion of Control (IoC) nima?</b>**
Biz funksiya ijrosini boshqa kodga topshiramiz. Callback necha marta chaqirilishini yoki error bo'lishini boshqara olmayebdiiz.


**<b>7. Error handling callback'lar bilan qanday bo'ladi?</b>**
Ikki callback: success va error. Yoki Node.js uslubi: (error, data) bitta callback bilan.


**<b>8. Callback va scope o'rtasidagi bog'lanish?</b>**
Callback o'ziga lexical scope'ni saqlaydi (closure). Tashqaridagi o'zgaruvchilarni ko'ra oladi.


**<b>9. setInterval vs setTimeout farqi?</b>**
\`setTimeout\` — bitta marta. \`setInterval\` — har N ms da qayta-qayta.


**<b>10. fetch() dan keyin .then() ishlatish nima?</b>**
\`fetch\` Promise qaytaradi, callback emas. Shuning uchun callback Hell oldini olish uchun Promise ishlatiladi.


**<b>11. Callback'ni necha marta chaqirmaslik uchun qanday pattern?</b>**
Once pattern: callback faqat bir marta chaqiriladi:
\`\`\`javascript
function once(callback) {
  let called = false;
  return () => {
    if (!called) { called = true; callback(); }
  };
}
\`\`\`


**<b>12. Callback ASYNC/AWAIT bilan qanday o'zgaradi?</b>**
Async/await callback Hell ni to'liq yo'q qiladi: yuqoridan pastga ketma-ketlik ko'rinishida yoziladi.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy Callback (Boshlang'ich)",
      instruction: "greet() funksiyasi callback qabul qilsin va uni darhol chaqirsin.",
      startingCode: "function greet(name, callback) {\n  // Kodni shu yerda yozing\n}\n\ngreet('Ali', () => console.log('Callback!'));",
      hint: "callback();",
      test: "if (logs.includes('Callback!')) return null; return 'Callback chaqirilmadi!';"
    },
    {
      id: 2,
      title: "2️⃣ setTimeout (Boshlang'ich)",
      instruction: "1 soniyadan keyin 'Salom!' konsolga chiqaring.",
      startingCode: "// Kodni shu yerda yozing\nconsole.log('Boshlandi');\n// setTimeout...\nconsole.log('Tugadi');",
      hint: "setTimeout(() => console.log('Salom!'), 1000);",
      test: "if (logs.includes('Boshlandi') && logs.includes('Tugadi')) return null; return 'setTimeout xato!';"
    },
    {
      id: 3,
      title: "3️⃣ Callback Parametrlar (O'rta)",
      instruction: "calculator(a, b, operation, callback) yarating. Asinxron hisoblansin (setTimeout).",
      startingCode: "function calculator(a, b, operation, callback) {\n  // Kodni shu yerda yozing\n}\n\ncalculator(5, 3, '+', (result) => console.log('Natija:', result));",
      hint: "setTimeout(() => { let result = a + b; callback(result); }, 500);",
      test: "if (logs.some(l => l.includes('Natija: 8'))) return null; return 'Calculator xato!';"
    },
    {
      id: 4,
      title: "4️⃣ Error Callback (O'rta)",
      instruction: "getData(success_cb, error_cb) yarating. Xatolik bo'lganda error_cb chaqirsin.",
      startingCode: "function getData(successCb, errorCb) {\n  const error = false; // Xatolik bo'lsa true\n  // Kodni shu yerda yozing\n}\n\ngetData(\n  (data) => console.log('Success:', data),\n  (err) => console.log('Error:', err)\n);",
      hint: "if (error) errorCb('Xato!'); else successCb('Data');",
      test: "if (logs.some(l => l.includes('Success'))) return null; return 'Success callback xato!';"
    },
    {
      id: 5,
      title: "5️⃣ setInterval (O'rta)",
      instruction: "Har 500ms da raqam chiqaradigan contador yarating. 3 marta chiqargandan so'ng to'xtasing.",
      startingCode: "// Kodni shu yerda yozing\nlet counter = 0;\nconst interval = setInterval(() => {\n  counter++;\n  console.log(counter);\n  // To'xtash shartini yozing\n}, 500);",
      hint: "if (counter >= 3) clearInterval(interval);",
      test: "if (logs.includes(1) && logs.includes(2) && logs.includes(3)) return null; return 'Contador xato!';"
    },
    {
      id: 6,
      title: "6️⃣ Multiple Callbacks (O'rta)",
      instruction: "processUser(id, onSuccess, onError) yarating. ID 0 bo'lsa error, bo'lmasa success.",
      startingCode: "function processUser(id, onSuccess, onError) {\n  setTimeout(() => {\n    // Kodni shu yerda yozing\n  }, 500);\n}\n\nprocessUser(1, \n  (user) => console.log('OK:', user),\n  (err) => console.log('ERROR:', err)\n);",
      hint: "if (id === 0) onError('ID invalidi'); else onSuccess('User' + id);",
      test: "if (logs.some(l => l.includes('OK'))) return null; return 'Xato!';"
    },
    {
      id: 7,
      title: "7️⃣ Chain Callbacks (O'rta)",
      instruction: "Ikki callbackni ketma-ketlik qiling: avval login, keyin getData.",
      startingCode: "function login(username, callback) {\n  setTimeout(() => callback('Token: ABC'), 500);\n}\n\nfunction getData(token, callback) {\n  setTimeout(() => callback('Data...'), 500);\n}\n\n// Kodni shu yerda yozing\nlogin('ali', (token) => {\n  // getData chaqiring\n});",
      hint: "getData(token, (data) => console.log(data));",
      test: "if (logs.includes('Data...')) return null; return 'Chain callback xato!';"
    },
    {
      id: 8,
      title: "8️⃣ Callback Hell Example (O'rta)",
      instruction: "Callback Hell'ni ko'rish uchun 3-qavat callback yozing (emas, but see pattern).",
      startingCode: "function step1(cb) { setTimeout(() => { console.log('Step 1'); cb(); }, 300); }\nfunction step2(cb) { setTimeout(() => { console.log('Step 2'); cb(); }, 300); }\nfunction step3(cb) { setTimeout(() => { console.log('Step 3'); cb(); }, 300); }\n\n// Kodni shu yerda yozing\nstep1(() => { /* ... */ });",
      hint: "step1(() => step2(() => step3(() => console.log('Done!'))));",
      test: "if (logs.includes('Step 1') && logs.includes('Step 2') && logs.includes('Step 3')) return null; return 'Callback hell xato!';"
    },
    {
      id: 9,
      title: "9️⃣ setTimeout with Variables (Qiyin)",
      instruction: "Loop bilan 5 marta 'hello' konsolga chiqarish, har 200ms oraliq bilan.",
      startingCode: "// Kodni shu yerda yozing\nfor (let i = 0; i < 5; i++) {\n  // setTimeout yozing\n}",
      hint: "setTimeout(() => console.log('hello'), i * 200);",
      test: "if (logs.filter(l => l === 'hello').length >= 5) return null; return 'Loop timeout xato!';"
    },
    {
      id: 10,
      title: "🔟 Promise tayyorligiga o'tish (Qiyin)",
      instruction: "Promise qabul qiluvchi funksiya yarating va Promise qaytaring.",
      startingCode: "function getData() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      // Kodni shu yerda yozing\n    }, 500);\n  });\n}\n\ngetData().then(data => console.log(data));",
      hint: "resolve('Data alindi');",
      test: "if (logs.includes('Data alindi')) return null; return 'Promise xato!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Event Listener with Callback (Qiyin)",
      instruction: "Button'ga click listener qo'ying, click bo'lganda callback chaqiring.",
      startingCode: "const button = document.createElement('button');\nbutton.textContent = 'Click me';\n// Kodni shu yerda yozing\nbutton.addEventListener('click', () => {\n  console.log('Clicked!');\n});",
      hint: "// Ba'zi muhit'larda DOM qo'shimchasi yo'q bo'lishi mumkin, shuni yodda tuting",
      test: "if (code.includes('addEventListener')) return null; return 'Event listener xato!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Combine: Loop + setTimeout + Callback (Eng Qiyin)",
      instruction: "1-5 raqamlari har 300ms oraliq bilan konsolga chiqarting (callback yordamida).",
      startingCode: "// Kodni shu yerda yozing\nfunction printNumbers(callback) {\n  for (let i = 1; i <= 5; i++) {\n    // setTimeout + callback\n  }\n}\n\nprintNumbers(() => console.log('Done!'));",
      hint: "setTimeout(() => { console.log(i); callback(); }, i * 300);",
      test: "if (logs.includes(1) && logs.includes(5) && logs.includes('Done!')) return null; return 'Combine xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Asinxron dasturlashda Callback funksiya nima?",
      options: [
        "Faqat `setTimeout` ichida yozilishi shart bo'lgan maxsus o'zgaruvchi",
        "Boshqa bir funksiyaga argument sifatida uzatiladigan va ma'lum bir asinxron amal yakunlangandan so'ng bajarilishi kutiladigan funksiya",
        "Funksiyaning xotiradagi nomini o'zgartiradigan metod",
        "Brauzer oynasi yuklanganda avtomatik ishlaydigan skript"
      ],
      correctAnswer: 1,
      explanation: "Callback (qayta chaqiriladigan funksiya) boshqa funksiyaga parametr sifatida beriladi va asinxron operatsiya tugagach chaqiriladi."
    },
    {
      id: 2,
      question: "Quyidagi kod chop etilganda konsolda qanday ketma-ketlik hosil bo'ladi?\n```javascript\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');\n```",
      options: [
        "A, B, C",
        "A, C, B",
        "B, A, C",
        "C, A, B"
      ],
      correctAnswer: 1,
      explanation: "'A' va 'C' sinxron bo'lgani uchun ketma-ket bajariladi. `setTimeout` asinxron bo'lgani uchun kechikish vaqti 0 bo'lsa ham Call Stack bo'shashini kutadi va eng oxirida 'B' chiqadi."
    },
    {
      id: 3,
      question: "Nima uchun kechikish vaqti 0 ms qilib belgilangan bo'lsa ham `setTimeout` callback funksiyasi sinxron kodlardan keyin ishlaydi?",
      options: [
        "`setTimeout` har doim xatolik bilan ishlaydi",
        "Asinxron callback funksiyalar brauzer Web API orqali Callback Queue'ga o'tadi va faqat Call Stack bo'shagandan keyingina Event Loop orqali stackka o'tkaziladi",
        "JavaScript kodni teskari tartibda o'qiydi",
        "0 soniya aslida 1 soniyaga tenglashtirilgan"
      ],
      correctAnswer: 1,
      explanation: "Event Loop qoidalariga ko'ra, Callback Queue'dagi vazifalar faqat va faqat Call Stack butunlay bo'shagandan keyingina Stackka yuklanadi."
    },
    {
      id: 4,
      question: '"Callback Hell" (yoki Piramida muammosi) nima?',
      options: [
        "Ko'p sonli bir-biriga bog'liq asinxron operatsiyalar uchun callback funksiyalarni ichma-ich yozish natijasida kodning o'ta chalkash va o'qishga qiyin ko'rinishga kelib qolishi",
        "Funksiya ichida cheksiz recursiv chaqiruv qilish",
        "Node.js da serverning haddan tashqari yuklanishi (overload)",
        "Hech qanday callback chaqirilmasdan qolib ketishi"
      ],
      correctAnswer: 0,
      explanation: "Callback Hell (Callback jahannami) - ketma-ket bog'liq asinxron vazifalar ko'payib ketganda, kod o'ngga qarab o'sib, o'qib bo'lmas darajada chigallashib ketishidir."
    },
    {
      id: 5,
      question: "Node.js muhitida asinxron callback funksiyalar uchun qabul qilingan standart pattern (qoida) qaysi?",
      options: [
        "Birinchi parametr natija (data), ikkinchisi xatolik (error) bo'lishi kerak",
        "Birinchi parametr har doim xatolik (error) bo'lishi shart (error-first callback)",
        "Parametrlar faqat string ko'rinishida yuboriladi",
        "Callback funksiyalar umuman parametr qabul qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Node.js ekotizimida xatolarni oson boshqarish maqsadida callback funksiyalarning 1-argumenti sifatida xatolik (`err`), 2-argumentida esa muvaffaqiyatli natija (`data`) uzatiladi."
    },
    {
      id: 6,
      question: "Callback funksiyalar bilan ishlashda 'Inversion of Control' (Nazoratni yo'qotish) muammosi nimani anglatadi?",
      options: [
        "Amalni bajarish va callbackni chaqirish nazoratini uchinchi tomon kutubxonasiga yoki kodiga topshirib qo'yish",
        "Callback ichida let o'rniga var ishlatish",
        "Kodni brauzer o'rniga faqat Node.js da ishga tushirish",
        "Callback funksiyani recursiv chaqirish"
      ],
      correctAnswer: 0,
      explanation: "IoC (Inversion of Control) — biz callback funksiyamizni boshqa bir tashqi kod (API yoki uchinchi tomon kutubxonasi) ixtiyoriga topshirganimizda, u callbackni qachon, necha marta chaqirishi yoki umuman chaqirmasligini o'zimiz to'liq nazorat qila olmasligimizdir."
    },
    {
      id: 7,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst id = setInterval(() => {\n  console.log('hi');\n}, 1000);\nclearInterval(id);\n```",
      options: [
        "Hech narsa chop etilmaydi",
        "Bir marta 'hi' chop etiladi",
        "Cheksiz marta 'hi' chop etiladi",
        "1 soniyadan keyin faqat 1 marta 'hi' chop etiladi"
      ],
      correctAnswer: 0,
      explanation: "`setInterval` o'rnatilgandan so'ng darhol `clearInterval(id)` chaqirilib to'xtatilganligi sababli, taymer callback funksiyasi biror marta ham ishlashga ulgurmaydi."
    },
    {
      id: 8,
      question: "'Error-first callback' yondashuvida asinxron amal muvaffaqiyatli yakunlansa, callbackning birinchi argumentiga qanday qiymat uzatiladi?",
      options: [
        "`null` yoki `undefined`",
        "`true`",
        "`Error` obyekti",
        "`0`"
      ],
      correctAnswer: 0,
      explanation: "Muvaffaqiyatli yakunda birinchi argument (error) bo'sh bo'lishi kerak, shuning uchun unga `null` yoki `undefined` uzatiladi, ikkinchi argumentga esa haqiqiy natija (data) uzatiladi."
    },
    {
      id: 9,
      question: "JavaScript asinxron operatsiyalarini boshqarishda Event Loop qaysi uchta asosiy komponent bilan hamkorlik qiladi?",
      options: [
        "Call Stack, Web APIs (Browser APIs), Callback Queue",
        "Virtual Memory, RAM, hard drive",
        "CPU threads, cache memory, registers",
        "DOM tree, CSSOM, Render tree"
      ],
      correctAnswer: 0,
      explanation: "Asinxron operatsiyalar Web API-da bajariladi, so'ng ularning callbacklari Callback Queue-ga joylashadi. Event Loop esa Call Stack bo'shligini tekshirib, navbatdagi callbacklarni Stackka olib kiradi."
    },
    {
      id: 10,
      question: "Quyidagi kod sinxron callbackmi yoki asinxron?\n```javascript\nfunction process(cb) {\n  cb();\n}\nprocess(() => console.log('Hello'));\n```",
      options: [
        "Sinxron callback",
        "Asinxron callback",
        "Bu callback emas",
        "Xatolik yuz beradi"
      ],
      correctAnswer: 0,
      explanation: "Bu yerda hech qanday vaqt kechikishi (setTimeout) yoki tarmoq so'rovi yo'q. `cb()` chaqiruvi stackda darhol (sinxron) bajariladi."
    },
    {
      id: 11,
      question: "Callback Hell muammosini eng yaxshi va eng zamonaviy hal qiluvchi JavaScript mexanizmlari qaysilar?",
      options: [
        "Promises va Async/Await",
        "IIFE va block scopes",
        "`var` kalit so'zi va nested loops",
        "Recursive functions"
      ],
      correctAnswer: 0,
      explanation: "Promises va async/await asinxron kodlarni yuqoridan pastga qarab chiziqli ko'rinishda (sinxron kod kabi) yozishga imkon berib, callback hell chalkashligini butunlay bartaraf etadi."
    },
    {
      id: 12,
      question: "Quyidagi asinxron funksiyada qanday potensial xatolik mavjud?\n```javascript\nfunction fetchUser(id, cb) {\n  if (!id) cb(new Error('Invalid ID'));\n  cb(null, { id: id });\n}\n```",
      options: [
        "Agar id bo'lmasa, cb xato bilan chaqiriladi va keyin return bo'lmagani uchun pastdagi muvaffaqiyatli cb ham chaqirilib yuboriladi",
        "Koddagi cb faqat bitta argument olishi kerak",
        "Asinxron kod ichida Error obyekti yaratib bo'lmaydi",
        "Hech qanday xato yo'q"
      ],
      correctAnswer: 0,
      explanation: "`if` blokida `return` qo'yilmagani sababli, `if (!id)` bajarilgandan keyin ham kod to'xtamaydi va pastdagi `cb(null, { id: id })` ham chaqiriladi. Bu bitta operatsiyada callbackning ikki marta bajarilishiga olib keladi."
    }
  ]
};

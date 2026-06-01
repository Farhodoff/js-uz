export const callbacksLesson = {
  id: "a0",
  title: "📞 Callbacks — Asinxronlikga Kirish",
  level: "Murakkab",
  description: "Callback funksiyalari, Event Loop, va asinxron ishlarning asosiy mexanizmi.",
  theory: `## 📌 CALLBACK FUNKSIYALARI — ASOSIY BOSQICH

### 1. NEGA KERAK? (Sabab)
Tasavvur qiling: Siz tomoshabinga bilet olishga ketdingiz. Bilet olish 2-3 minut vaqt oladi. Lekin siz:
- ❌ 3 minut to'xtab turmaysiz (blokirovka — brauzer to'xtab qoladi)
- ✅ Navbat raqami olasiz va boshqa ishingizni davom ettirasiz

**JavaScript'da:**
- Eski usul: Kut, kut, kut... (bloklanish)
- Zamonaviy usul: Asinxron (tashqi kod davom etadi, vazifa tugagandan so'ng xabar olasiz)

**Callback:** "Mening vazifam tugagandan so'ng bu funksiyani chaqir!" — degani.

---

### 2. SODDALIK (Haqiqiy Analogiya)

#### Sinxron (Ketma-ketlik)
\`\`\`
Restoran ≈ Kod
Siz buyurtma berasiz → Oshpaz tayyorlaydi → Siz olasiz
1. buyurtma → 2. kutish → 3. olish
\`\`\`

#### Asinxron (Callback)
\`\`\`
Kafé ≈ Kod
Siz buyurtma berasiz → Navbat raqami olasiz → Siz o'tirib kitob o'qiysiz
                   → "Ali! 12 raqam tayyor!" (Callback chaqiriladi)
                   → Siz borib olasiz
\`\`\`

---

### 3. TUSHUNCHA (BATAFSIL)

### A. Sinxron vs Asinxron Callbacks
* **Sinxron Callbacks:** Chaqiruvchi funksiya bajarilayotgan paytning o'zidayoq zudlik bilan ishga tushadigan callback funksiyalari. Masalan, \`Array.prototype.map\`, \`filter\`, yoki \`forEach\` ichidagi callbacklar sinxron hisoblanadi:
  \`\`\`javascript
  [1, 2, 3].map(x => x * 2); // Bu yerda callback sinxron bajariladi
  \`\`\`
* **Asinxron Callbacks:** Keyinchalik, qandaydir asinxron operatsiya (tarmoq so'rovi, fayl o'qish, taymer) yakunlangandan so'nggina chaqiriladigan callbacklar:
  \`\`\`javascript
  setTimeout(() => console.log("Asinxron!"), 1000);
  \`\`\`

### B. Error-First Callback Pattern (Node.js standarti)
Node.js asinxron API-larida xatolarni boshqarish uchun maxsus qoida qabul qilingan:
1. Callback funksiyasining **birinchi argumenti** har doim xatolik obyekti (\`error\`) bo'ladi.
2. Agar operatsiya muvaffaqiyatli yakunlansa, birinchi argument \`null\` yoki \`undefined\` bo'ladi, ikkinchi argument esa natija ma'lumotlarini (\`data\`) saqlaydi.

\`\`\`javascript
function myReadFile(filename, callback) {
  setTimeout(() => {
    if (filename === 'xavfli.txt') {
      callback(new Error("Ruxsat berilmagan!"));
    } else {
      callback(null, "Fayl tarkibi...");
    }
  }, 1000);
}

myReadFile("xavfli.txt", (err, data) => {
  if (err) {
    console.error("Xato:", err.message); // "Xato: Ruxsat berilmagan!"
    return;
  }
  console.log("Ma'lumot:", data);
});
\`\`\`

### C. Inversion of Control (IoC - Nazoratni Yo'qotish)
Callback-larning eng katta muammolaridan biri bu **IoC** (Nazoratni yo'qotish) dir. Biz o'z callback funksiyamizni boshqa bir tashqi kodga (masalan, uchinchi tomon kutubxonasiga) parametr qilib topshirganimizda:
- U callback-ni umuman chaqirmasligi mumkin.
- Uni kutilganidan ko'p marta (masalan, 2 marta) chaqirib yuborishi mumkin.
- Uni kutilmagan paytda sinxron yoki asinxron chaqirishi mumkin.

---

### 4. ASINXRONLIKNING MEXANIZMI (Event Loop)

JavaScript sinxron va asinxron chaqiriqlarni qanday boshqaradi?

\`\`\`mermaid
graph TD
    Stack["Call Stack<br/>(Hozirgi bajarilayotgan kod)"]
    WebAPI["Web APIs (Browser API)<br/>- setTimeout<br/>- fetch<br/>- event listener"]
    Queue["Callback Queue (Navbat)<br/>- callbacklar kutish hududi"]
    EventLoop{"Event Loop<br/>'Call Stack bo'shsa,<br/>navbatdan qabul qil!'"}

    Stack -->|Asinxron vazifa| WebAPI
    WebAPI -->|Tugagach callback yuborish| Queue
    Queue --> EventLoop
    EventLoop -->|Stack bo'sh bo'lsa| Stack
\`\`\`

---

### 5. CALLBACK HELL (Piramida Muammosi)

Bir-biriga bog'liq ko'p asinxron operatsiyalar bajarilganda, kod haddan tashqari ichma-ich ketib, piramida shakliga kelib qoladi (Pyramid of Doom).

\`\`\`mermaid
graph TD
    A[getUserData] --> B[getFollowers]
    B --> C[getFollowersPosts]
    C --> D[getComments]
    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#fbf,stroke:#333
    style D fill:#fb9,stroke:#333
\`\`\`

#### Yechim (Callback decomposition):
Buning oldini olish uchun har bir ichki funksiyani alohida nomlangan funksiyalar sifatida e'lon qilish mumkin, ammo zamonaviy JS-da bu muammoni bartaraf etish uchun **Promises** va **Async/Await** mexanizmlari qo'llaniladi.

---

### 6. SAVOLLAR VA JAVOBLAR

**1. Callback nima?**
Funksiyaga argument sifatida uzatiladigan boshqa bir funksiya, odatda asinxron vazifalar tugagandan so'ng bajarilish uchun.

**2. Sinxron vs asinxron callback farqi nimada?**
Sinxron callback darhol chaqiruvchi funksiya ichida bajariladi (masalan, \`forEach\`). Asinxron callback esa kelajakda biror hodisa yoki taymer yakunlangach chaqiriladi (masalan, \`setTimeout\`).

**3. setTimeout(fn, 0) nima qiladi?**
Funksiyani darhol emas, balki joriy call stack bo'shagandan so'ng (navbatdagi loop aylanishida) bajaradi.

**4. Event Loop nima?**
JavaScript mexanizmi: "Call stack bo'shmi? Callback queue'dan qabul qil!" deb navbatdagi callbacklarni ishga tushiradi.

**5. Callback Hell (Pyramid) nima?**
Bir-biriga bog'liq ko'p callback'lar bo'lganda, kod ichma-ich kirib, o'qishga og'ir bo'lib qolishi.

**6. Inversion of Control (IoC) nima?**
Biz funksiya ijrosini boshqa kodga topshiramiz. Callback necha marta chaqirilishini yoki xato bo'lishini boshqara olmaymiz.

**7. Error-first callback nima?**
Node.js standarti bo'lib, unga ko'ra callback funksiyasining birinchi parametri har doim xatolik obyekti (\`err\`), ikkinchi parametri esa ma'lumot (\`data\`) bo'ladi.

**8. Callback va scope o'rtasidagi bog'lanish?**
Callback o'ziga lexical scope'ni saqlaydi (closure). Tashqaridagi o'zgaruvchilarni ko'ra oladi.

**9. Callback-da xatolik yuz bersa va biz uni catch qilmasak nima bo'ladi?**
Dastur runtime darajasida to'xtab qoladi (crash bo'ladi).

**10. Nima uchun callbacklar o'rniga Promise-lar yaratildi?**
Callback Hell va Inversion of Control muammolarini bartaraf qilish hamda asinxron kodni zanjirli shaklda chiroyli yozish uchun.
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
      instruction: "Callback Hell'ni ko'rish uchun 3-qavat callback yozing.",
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
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Asinxron Massiv Map (mapAsync)",
      instruction: "Massiv elementlarini asinxron qayta ishlovchi `mapAsync(arr, callback, finalCallback)` funksiyasini yozing. `callback(item, cb)` har bir elementni asinxron o'zgartiradi va natijani `cb(err, mappedItem)` orqali qaytaradi. Barcha elementlar muvaffaqiyatli qayta ishlangach, `finalCallback(null, results)` chaqirilsin. Agar biron elementda xato bo'lsa, jarayon to'xtab, darhol `finalCallback(err)` chaqirilsin.",
      startingCode: "function mapAsync(arr, callback, finalCallback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "let results = []; let completed = 0; let hasError = false; if (arr.length === 0) return finalCallback(null, []); arr.forEach((item, index) => { callback(item, (err, mappedItem) => { if (hasError) return; if (err) { hasError = true; return finalCallback(err); } results[index] = mappedItem; completed++; if (completed === arr.length) finalCallback(null, results); }); });",
      test: "if (typeof mapAsync !== 'function') return 'mapAsync funksiya emas';\nconst items = [1, 2, 3];\nconst cb = (item, done) => setTimeout(() => done(null, item * 2), 10);\nreturn new Promise(resolve => {\n  mapAsync(items, cb, (err, res) => {\n    if (err) resolve('Xatolik yuz berdi');\n    if (res && res[0] === 2 && res[1] === 4 && res[2] === 6) resolve(null);\n    else resolve('Natija noto\\'g\\'ri');\n  });\n});"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Error-First Callback Wrapper (nodeReadFileStyle)",
      instruction: "Node.js error-first callback uslubini simulyatsiya qiluvchi `nodeReadFileStyle(filename, callback)` funksiyasini yozing. `filename === 'data.txt'` bo'lsa, 10ms dan keyin `callback(null, 'Fayl mazmuni')` deb natija qaytarsin. Agar boshqa filename bo'lsa, `callback(new Error('Mavjud emas'))` chaqirilsin.",
      startingCode: "function nodeReadFileStyle(filename, callback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "setTimeout(() => { if (filename === 'data.txt') { callback(null, 'Fayl mazmuni'); } else { callback(new Error('Mavjud emas')); } }, 10);",
      test: "if (typeof nodeReadFileStyle !== 'function') return 'nodeReadFileStyle funksiya emas';\nreturn new Promise(resolve => {\n  nodeReadFileStyle('invalid.txt', (err, data) => {\n    if (!err) return resolve('Xatolik tashlanmadi');\n    nodeReadFileStyle('data.txt', (err2, data2) => {\n      if (err2) return resolve('To\\'g\\'ri faylda xato berildi');\n      if (data2 === 'Fayl mazmuni') return resolve(null);\n      resolve('Fayl mazmuni noto\\'g\\'ri');\n    });\n  });\n});"
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
      explanation: "Event Loop qoidalariga ko'ra, Callback Queue'dagi vazifalar faqat va vaqt Call Stack butunlay bo'shagandan keyingina Stackka yuklanadi."
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
      explanation: "Node.js ekotizimida xatolarni oson boshqarish maqsadida callback funksiyalarining 1-argumenti sifatida xatolik (`err`), 2-argumentida esa muvaffaqiyatli natija (`data`) uzatiladi."
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
      explanation: "Muvaffaqiyatli yakunda birinchi argument (error) bo'sh bo'lishi kerak, shuning uchun unga `null` yoki `undefined` uzatiladi, ikkinchi argumentga esa vaqtinchalik natija (data) uzatiladi."
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
      question: "Error-first callback yondashuvida xatolik yuz berganini tekshirish uchun qaysi ifoda to'g'ri hisoblanadi?",
      options: [
        "if (error) { ... }",
        "if (data) { ... }",
        "if (error === null) { ... }",
        "if (typeof error === 'undefined') { ... }"
      ],
      correctAnswer: 0,
      explanation: "Standart Node.js uslubida callbackning birinchi argumenti `error` bo'lib, xatolik yuz bersa u truthy (Error obyekti) bo'ladi, shuning uchun `if (error)` deb tekshirish to'g'ri."
    },
    {
      id: 12,
      question: "Callback-lar bilan bog'liq bo'lgan 'Inversion of Control' (IoC) muammosining asosiy xavfi nimada?",
      options: [
        "Kodning sinxron bo'lib qolishi",
        "Callback funksiyaning xotira egallashi (leak)",
        "Callbackning chaqirilishi uchinchi tomon kodi ixtiyorida bo'lib, uning necha marta yoki umuman chaqirilishini kafolatlay olmasligimiz",
        "Callback ichida global o'zgaruvchilarga kirish cheklanishi"
      ],
      correctAnswer: 2,
      explanation: "IoC xavfi shundaki, biz callbackni chaqirish nazoratini uchinchi tomon kutubxonasiga yoki kodi ixtiyoriga berib qo'yamiz va u bizning callbackimizni kutilgandek chaqirishiga kafolat bera olmaymiz."
    },
    {
      id: 13,
      question: "Callback funksiyalar yordamida yozilgan asinxron kodlarni zanjirlash (chaining) va xatolarni boshqarishdagi muammolar qaysi standart API yaratilishiga sabab bo'ldi?",
      options: [
        "Promises (Vada-lar)",
        "LocalStorage",
        "JSON parser",
        "XMLHTTPRequest"
      ],
      correctAnswer: 0,
      explanation: "Chalkash callback hell va IoC muammolarini hal qilish, shuningdek, xatolarni yagona catch bloki orqali boshqarish uchun ES6 da Promises interfeysi joriy qilindi."
    },
    {
      id: 14,
      question: "Asinxron operatsiyalarni sequential (ketma-ket) callbacklar orqali amalga oshirishda xatolik yuz bersa, uni butun zanjir bo'ylab to'g'ri tashish uchun nima qilish kerak?",
      options: [
        "Har bir qadamdagi callbackda error parametrini tekshirib, xato bo'lsa zanjirni to'xtatish va eng chetki error callbackni chaqirish",
        "Sinxron try-catch blokidan foydalanish",
        "Window.onerror hodisasiga ishonish",
        "Xatoliklarni e'tiborsiz qoldirish"
      ],
      correctAnswer: 0,
      explanation: "Asinxron bo'lgani uchun sinxron try-catch zanjir bo'ylab ishlamaydi. Shuning uchun har bir callbackda birinchi parametr (`err`) bor-yo'qligi tekshirilib, agar mavjud bo'lsa, zanjir toxtatiladi va xato callback chaqiriladi."
    }
  ]
};

export const callbacks = {
  id: "callbacks",
  title: "Callbacks va Asinxronlik asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Callback va Asinxronlik nima?
* **Callback funksiya:** Boshqa funksiyaga argument (parametr) sifatida uzatiladigan va ma'lum bir hodisa sodir bo'lgandan yoki biror amal bajarilgandan keyin chaqiriladigan funksiyadir.
* **Asinxronlik:** Dasturning biror vaqt talab qiladigan vazifa (masalan, internetdan ma'lumot yuklash) tugashini kutmasdan, keyingi kodlarni bajarishni davom ettirish xususiyatidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoranga borib taom buyurtma qildingiz**:
* **Sinxron usul:** Siz buyurtmani berasiz va taom tayyor bo'lmaguncha kassa oldida kutib turasiz. Orqangizdagi navbatdagilar ham siz tufayli kutaveradi (dastur bloklanadi).
* **Asinxron va Callback usuli:** Siz buyurtmani berasiz va kassir sizga **pager (qo'ng'iroqcha)** berib, stolga o'tirishingizni aytadi. Siz bemalol telefoningizni titib o'tiraverasiz (bloklanmagan asinxron harakat). Taom tayyor bo'lganda, pager chalinsa (callback chaqiriladi), borib taomni olasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sinxron Callback)
Hech qanday kutishlarsiz, massiv metodlarida darhol ishlaydigan callback:
\`\`\`javascript
const numbers = [1, 2, 3];

// map metodiga callback funksiya uzatilmoqda
const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6]
\`\`\`

### 2. Intermediate Example (Asinxron Callback - setTimeout)
Vaqt o'tgandan keyin ishga tushuvchi callback:
\`\`\`javascript
console.log("Buyurtma berildi...");

// 2 soniyadan keyin ishlovchi asinxron callback
setTimeout(() => {
  console.log("Taom tayyor bo'ldi! (Callback ishga tushdi)");
}, 2000);

console.log("Do'stlar bilan suhbat davom etmoqda...");
// Natija tartibi:
// 1. Buyurtma berildi...
// 2. Do'stlar bilan suhbat davom etmoqda...
// 3. (2 soniyadan keyin) Taom tayyor bo'ldi!
\`\`\`

### 3. Advanced Example (Callback Hell / Pyramid of Doom)
Bir asinxron operatsiya ikkinchisiga bog'liq bo'lsa, kod bir-birining ichiga kirib ketadi:
\`\`\`javascript
getUser(1, (user) => {
  console.log("Foydalanuvchi:", user.name);
  getPosts(user.id, (posts) => {
    console.log("Postlar olindi:", posts);
    getComments(posts[0].id, (comments) => {
      console.log("Izohlar:", comments);
      // Va hokazo... kod o'ng tomonga qarab surilib ketadi (Callback Hell)
    });
  });
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Event Loop va Web APIs
JavaScript **Single-Threaded** (bir oqimli) til bo'lib, bir vaqtning o'zida faqat bitta vazifani bajara oladi. Asinxron operatsiyalar quyidagicha boshqariladi:
1. **Call Stack:** Kod bajarilayotgan joy. Asinxron funksiya (masalan, \`setTimeout\`) stack-ga tushadi va darhol brauzerga (Web API) topshirilib, stack-dan chiqib ketadi.
2. **Web APIs:** Brauzer orqa fonda taymerni hisoblaydi yoki tarmoq so'rovini bajaradi.
3. **Callback Queue (Task Queue):** Taymer tugagach yoki so'rov javobi kelgach, callback funksiyasi navbatga (Queue) yuboriladi.
4. **Event Loop:** Stack butunlay bo'shaganligini tekshiradi. Agar stack bo'sh bo'lsa, Callback Queue-dagi birinchi callbackni olib, bajarish uchun Stack-ga yuklaydi.

> [!WARNING]
> Agar sinxron kodda cheksiz sikl yoki og'ir operatsiya bajarilsa, Call Stack bo'shamaydi va asinxron callbacklar xizmat navbatida abadiy qolib ketadi (sahifa qotib qoladi).

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Foydalanuvchi ma'lumotlarini bazadan olish simulyatsiyasi
Keling, bazadan asinxron tarzda ma'lumot oluvchi va natijani callback orqali qaytaruvchi dasturcha yozamiz.

\`\`\`javascript
// 1. Asinxron tarzda foydalanuvchini oluvchi funksiya
function fetchUserFromDB(userId, callback) {
  console.log("Ma'lumotlar bazasiga so'rov yuborildi...");
  
  setTimeout(() => {
    const mockUser = { id: userId, name: "Farhod", role: "Admin" };
    // Muvaffaqiyatli yakunlangach callback chaqiriladi va ma'lumot uzatiladi
    callback(mockUser);
  }, 1500);
}

// 2. Callback funksiya sifatida ishlatiladigan qism
const displayUser = (user) => {
  console.log(\`Foydalanuvchi olindi: \${user.name}, Roli: \${user.role}\`);
};

// 3. Funksiyani ishga tushiramiz
fetchUserFromDB(101, displayUser);
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Callback funksiyani uzatish o'rniga chaqirib yuborish
* **Noto'g'ri:**
  \`\`\`javascript
  // Funksiya zudlik bilan ishga tushib ketadi, setTimeout esa uning natijasini kutadi
  setTimeout(sayHello(), 1000); 
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  // Funksiya reference-i uzatiladi, u 1 soniyadan keyin chaqiriladi
  setTimeout(sayHello, 1000);
  
  // Yoki arrow funksiya ichida chaqirish:
  setTimeout(() => sayHello(), 1000);
  \`\`\`

### 2. Yo'qolgan \`this\` konteksti (Loss of 'this')
Obyekt metodini callback sifatida boshqa joyga berib yuborganda \`this\` yo'qoladi.
* **Noto'g'ri:**
  \`\`\`javascript
  const user = {
    name: "Sardor",
    greet() { console.log(\`Salom, \${this.name}\`); }
  };
  setTimeout(user.greet, 1000); // "Salom, undefined" chiqadi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  // bind yordamida context-ni yopishtirib uzatamiz
  setTimeout(user.greet.bind(user), 1000); 
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Tushuncha | Nima uchun kerak | Misol |
| :--- | :--- | :--- |
| **Sinxron Callback** | Massivlarni qayta ishlash, tartiblash | \`arr.forEach(item => console.log(item))\` |
| **Asinxron Callback** | Vaqtinchalik kechikishlar, tarmoq so'rovlari | \`setTimeout(cb, 1000)\` |
| **Callback Hell** | Ketma-ket asinxron operatsiyalarni bog'lash | \`step1(x, () => step2(y, () => step3(z)))\` |
| **Event Loop** | Asinxron vazifalarni Stack-ga olib kelish | Call Stack bo'shaganda Callbacklarni navbatdan oladi |

---

## 7. ❓ Savollar va Javoblar

### 1. Callback funksiyaning oddiy funksiyadan farqi nimada?
Aslida hech qanday farqi yo'q. Istalgan funksiya boshqasiga parametr sifatida berilsa, u callback nomini oladi.

### 2. Callback Hell muammosini qanday hal qilish mumkin?
Uni Promises (Va'dalar) yoki \`async/await\` sintaksisi orqali chiroyli va o'qishli ko'rinishga keltirish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`setTimeout(() => console.log("A"), 0)\` va \`console.log("B")\` kodlaridan qaysi biri birinchi bajariladi va nima uchun? (B, chunki stack bo'shamaguncha A navbatda kutadi).
2. Callback funksiya nima uchun "Inversion of Control" (Boshqaruvni yo'qotish) muammosiga sabab bo'lishi mumkin?
3. Sinxron va asinxron callbacklarning xotirada ishlash farqi nimada?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida Callbacks va asinxron JavaScript asoslari bo'yicha ko'nikmalaringizni tekshiring.
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
    "id": 1,
    "question": "Callback funksiya nima?",
    "options": [
      "Faqat matematik hisob-kitoblarni amalga oshiradigan maxsus ichki funksiya",
      "Boshqa bir funksiyaga argument (parametr) sifatida uzatiladigan va ma'lum bir hodisa sodir bo'lgandan keyin chaqiriladigan funksiya",
      "Brauzer oynasi yopilganda avtomatik ishlaydigan dastur qismi",
      "Faqat xatolarni aniqlaydigan catch bloki"
    ],
    "correctAnswer": 1,
    "explanation": "Callback funksiya boshqa funksiyaga parametr qilib yuboriladi va u funksiya o'z ishini tugatgach yoki biror hodisa bo'lgach (masalan, vaqt tugagach), ushbu callbackni chaqiradi."
  },
  {
    "id": 2,
    "question": "Quyidagi kodda sinxron va asinxron bajarilish sababli konsolga qaysi tartibda javob chiqadi?\n```javascript\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');\n```",
    "options": [
      "`A`, `B`, `C`",
      "`A`, `C`, `B`",
      "`B`, `A`, `C`",
      "`C`, `A`, `B`"
    ],
    "correctAnswer": 1,
    "explanation": "`A` va `C` sinxron kod bo'lib, darhol bajariladi. `setTimeout` esa asinxron vazifadir va u 0 millisekund berilgan bo'lsa ham, Call Stack bo'shagandan keyingina (Event Loop orqali) ishga tushadi. Shuning uchun natija A, C, B bo'ladi."
  },
  {
    "id": 3,
    "question": "Callback Hell (Callback jahannami) iborasi nimani anglatadi?",
    "options": [
      "Ko'p miqdordagi funksiyalar serverda xotira yetishmasligiga olib kelishini",
      "Asinxron operatsiyalarni bajarishda callbacklar bir-birining ichiga juda chuqur joylashib ketishi (nesting) va kodning o'qilishini qiyinlashtirishi",
      "Callback funksiyasi ichida `return` ishlatib bo'lmasligini",
      "Xatolar yuz berganda sahifaning qotib qolishini"
    ],
    "correctAnswer": 1,
    "explanation": "Bir nechta asinxron vazifalar zanjirini callbacks yordamida yozganda, ular bir-birining ichiga kirib ketib, kod o'ngga qarab siljiydi va piramida shaklini oladi (`Pyramid of Doom`), bu Callback Hell deyiladi."
  },
  {
    "id": 4,
    "question": "JavaScript massivlarining qaysi o'rnatilgan metodi callback funksiyani qabul qilmaydi?",
    "options": [
      "`.forEach()`",
      "`.map()`",
      "`.filter()`",
      "`.push()`"
    ],
    "correctAnswer": 3,
    "explanation": "`.push()` metodi massiv oxiriga yangi elementlarni qo'shadi va callback qabul qilmaydi. `.forEach()`, `.map()` va `.filter()` esa har bir element uchun callback funksiyasini ishga tushiradi."
  },
  {
    "id": 5,
    "question": "Sinxron callback nima?",
    "options": [
      "Faqat internet tez bo'lganda ishlaydigan callback",
      "Boshqa funksiya ichida darhol, hech qanday kutishlarsiz, ketma-ketlik bo'yicha bajariladigan callback",
      "Faqat `setTimeout` ichida yoziladigan callback",
      "Kelajakda ma'lum bir voqea sodir bo'lganda ishlaydigan callback"
    ],
    "correctAnswer": 1,
    "explanation": "Sinxron callback hech qanday asinxron kutishlarsiz, chaqirgan funksiya bajarilayotgan paytda darhol ishga tushadi (masalan, `Array.prototype.map` callbacki)."
  },
  {
    "id": 6,
    "question": "Node.js va eski JS kodlarida ko'p qo'llanilgan 'Error-First Callback' patterns nima?",
    "options": [
      "Xatolik yuz berganda dasturni to'xtatuvchi sintaktik qoida",
      "Callback funksiyasining birinchi argumenti har doim xatolik obyekti (`err`) bo'lishi, muvaffaqiyatli natija esa ikkinchi argument bo'lib kelishi",
      "Faqat xato ma'lumotlarni qaytaradigan callback",
      "Brauzer konsoliga birinchi bo'lib xatoni chiqarish usuli"
    ],
    "correctAnswer": 1,
    "explanation": "Error-First callback qoidasiga ko'ra, funksiya tugagach callback chaqirilganda, agar xato bo'lsa `callback(err)`, xato bo'lmasa `callback(null, data)` shaklida birinchi parametrda xatolik tekshiriladi."
  },
  {
    "id": 7,
    "question": "Quyidagi kodda `process` funksiyasining callbacki qanday chaqirilgan?\n```javascript\nfunction process(num, cb) {\n  cb(num * 2);\n}\n```",
    "options": [
      "Asinxron tarzda Event Loop yordamida",
      "Sinxron tarzda zudlik bilan",
      "Ma'lum bir vaqt o'tgandan keyin",
      "Faqat xato yuz berganda"
    ],
    "correctAnswer": 1,
    "explanation": "Ushbu funksiya ichida hech qanday asinxron API (`setTimeout`, `fetch` va h.k.) ishlatilmagan. Shuning uchun `cb` sinxron ravishda darhol bajariladi."
  },
  {
    "id": 8,
    "question": "Callback funksiyani argument qilib yuborishda qaysi xato eng ko'p uchraydi?",
    "options": [
      "Funksiya nomini yozish o'rniga uni qavslar bilan chaqirib yuborish (masalan: `setTimeout(myFunc(), 1000)`)",
      "Funksiyani o'zgaruvchiga tenglash",
      "Callback ichida `let` o'rniga `const` ishlatish",
      "Funksiyaga parametr bermaslik"
    ],
    "correctAnswer": 0,
    "explanation": "`myFunc()` deb yozilsa, funksiya zudlik bilan ishga tushadi va uning qaytargan qiymati (ko'pincha `undefined`) argument sifatida uzatiladi. Callback sifatida funksiyaning o'zini uzatish kerak: `setTimeout(myFunc, 1000)`."
  },
  {
    "id": 9,
    "question": "Asinxron callbacklar JavaScript dvigatelining qaysi qismida navbatda (queue) turadi?",
    "options": [
      "Call Stack",
      "Memory Heap",
      "Callback Queue (Task Queue)",
      "Global Context"
    ],
    "correctAnswer": 2,
    "explanation": "Asinxron operatsiya yakunlangach, uning callback funksiyasi Callback Queue-ga joylashtiriladi va Call Stack bo'shagach, u yerga o'tkaziladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nconst doSomething = (cb) => {\n  cb(10);\n};\ndoSomething(val => console.log(val + 5));\n```",
    "options": [
      "`10`",
      "`15`",
      "`undefined`",
      "`TypeError`"
    ],
    "correctAnswer": 1,
    "explanation": "`doSomething` funksiyasi `cb` ga 10 qiymatini uzatadi. Biz parametr sifatida `val => console.log(val + 5)` funksiyasini yubordik. Natijada `10 + 5 = 15` ekranga chiqadi."
  },
  {
    "id": 11,
    "question": "Callbacks bilan ishlashda 'Inversion of Control' (Boshqaruvning yo'qolishi) muammosi nima?",
    "options": [
      "Dastur yopilib qolishi",
      "Callback funksiyani uchinchi tomon kutubxonasiga topshirganimizda, u callbackni qachon, necha marta va qanday sharoitda chaqirishini o'zimiz to'liq nazorat qila olmasligimiz",
      "Brauzerning callbacklarni o'chirib yuborishi",
      "Dasturning faqat bitta CPU yadrosida ishlashi"
    ],
    "correctAnswer": 1,
    "explanation": "Boshqaruvning yo'qolishi (Inversion of Control) — biz o'z kodimizni (callbackni) boshqa tizim (kutubxona) chaqirishiga ishonib topshiramiz, bu esa xavfsizlik va nazoratni kamaytiradi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nfunction run(callback) {\n  if (callback) {\n    callback();\n  }\n}\nrun();\n```",
    "options": [
      "`TypeError: callback is not a function` xatoligi beradi",
      "Dastur hech qanday xatosiz tugaydi",
      "`undefined` deb yozib chiqadi",
      "Dastur cheksiz siklga tushib qoladi"
    ],
    "correctAnswer": 1,
    "explanation": "`if (callback)` sharti callback uzatilganligini tekshiradi. Biz `run()` ni argumentsiz chaqirganimiz uchun `callback` qiymati `undefined` bo'ladi va shart bajarilmay, xatosiz tugaydi."
  }
]

};

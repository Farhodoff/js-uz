export const timers = {
  id: "timers",
  title: "Vaqt funksiyalari (Timers)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

### Vaqt funksiyalari (Timers) nima?
JavaScript-da **Vaqt funksiyalari** kodni hozir emas, birozdan so'ng yoki ma'lum vaqt oralig'ida takroran bajarish uchun ishlatiladi.

### Real hayotiy o'xshatish: Oshxonadagi budilnik
Tasavvur qiling, siz pirog yopyapsiz:
* **\\\`setTimeout\\\` (Bir martalik taymer):** Siz pirogni pechga qo'yib, budilnikni 45 daqiqaga o'rnatasiz. Vaqt tugagach, u bir marta jiringlaydi va siz pirogni olasiz. Bu faqat bir marta sodir bo'ladi.
* **\\\`setInterval\\\` (Takroriy taymer):** Siz qozonda sho'rva qaynatyapsiz va uni har 10 daqiqada aralashtirib turishingiz kerak. Siz taymer o'rnatasiz va u har 10 daqiqada jiringlaydi. Bu jarayon siz olovni o'chirmaguningizcha (\\\`clearInterval\\\`) cheksiz davom etadi.

---

## 2. ⚙️ Chuqurlashtirilgan o'rganish (Deep Dive)

### Under the Hood: Event Loop va V8 Engine
JavaScript o'zining asosi bo'lgan V8 dvigatelida **Single-Threaded** (bir oqimli) til hisoblanadi. Ya'ni, u bir vaqtning o'zida faqat bitta ishni bajara oladi. Unda qanday qilib taymerlar asinxron ishlaydi?

Taymerlar JS dvigatelining o'ziga emas, balki **Web APIs** (brauzerda) yoki **C++ API** (Node.js da) ga tegishli. Siz \\\`setTimeout\\\` chaqirganingizda:
1. **Web API** vaqtni hisoblashni boshlaydi va JS asosiy oqimi o'z ishini davom ettiradi.
2. Vaqt tugagach, taymerning ichidagi \\\`callback\\\` funksiya **Macrotask Queue** (Vazifalar navbati) ga tushadi.
3. **Event Loop** doimiy ravishda Call Stack-ni tekshiradi. Agar Call Stack bo'sh bo'lsa, u navbatdagi birinchi vazifani Macrotask Queue-dan olib, Call Stack-ga tashlaydi va bajaradi.

### Xotira boshqaruvi (Memory Management)
Agar taymer ishlayotgan bo'lsa va siz sahifani almashtirsangiz yoki komponent (masalan, React'da) o'chirilsa, taymer o'z-o'zidan to'xtamaydi. U orqa fonda ishlayveradi va **Memory Leak** (Xotira sizib chiqishi) ga olib keladi. Shuning uchun, doim taymerlarga \\\`clearTimeout\\\` yoki \\\`clearInterval\\\` qo'llash muhim.

### Mermaid Diagram: Event Loop va Timers

\\\`\\\`\\\`mermaid
graph TD;
    A[JS Code] --> B[Call Stack];
    B -->|setTimeout chaqirildi| C[Web APIs];
    C -->|Vaqt tugadi| D[Macrotask Queue];
    E[Event Loop] -->|Stack boshligini tekshiradi| B;
    D -.->|Call Stack ga otish| E;
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Questions (Intervyu Savollari)

### 1-savol: \\\`setTimeout(fn, 0)\\\` qanday ishlaydi?
Yangi boshlovchilar \\\`setTimeout(fn, 0)\\\` kodni darhol bajaradi deb o'ylashadi. Ammo, asinxron bo'lgani uchun \\\`fn\\\` funksiyasi Web API orqali Macrotask Queue-ga tushadi va **Call Stack'dagi barcha sinxron kodlar bajarilib bo'lingandan keyin** ishga tushadi.

\\\`\\\`\\\`javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Natija: 1, 3, 2
\\\`\\\`\\\`

### 2-savol: Taymer vaqti kafolatlanganmi?
Yo'q. Agar \\\`setTimeout\\\` ni 1000ms ga o'rnatsangiz, u **kamida** 1000ms dan keyin ishlaydi degani. Agar Call Stack og'ir sinxron operatsiyalar (masalan, yirik sikllar) bilan band bo'lsa, taymer funksiyasi navbatda kutib qolib, 1.5 yoki 2 soniyadan keyin ham ishlashi mumkin.

### 3-savol: \\\`setInterval\\\` o'rniga nima uchun rekursiv \\\`setTimeout\\\` afzal?
Og'ir funksiyalar yoki API so'rovlar \\\`setInterval\\\` bilan ishlatilsa va ularni bajarish taymer vaqtidan ko'p vaqt olsa, funksiyalar bir-birini ustiga minib qolishi mumkin.
Rekursiv \\\`setTimeout\\\` esa oldingi funksiya to'liq tugaganidangina yangi taymer yaratadi, bu oqim barqarorligini ta'minlaydi.

\\\`\\\`\\\`javascript
function pollServer() {
  fetchData().then(() => {
    // So'rov tugagach, yangi taymer o'rnatamiz
    setTimeout(pollServer, 5000);
  });
}
setTimeout(pollServer, 5000);
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Kechiktirish (Boshlang'ich)",
      instruction: "2 soniyadan keyin 'Salom' degan yozuvni konsolga chiqaradigan kod yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setTimeout(() => console.log('Salom'), 2000);",
      test: "if (code.includes('setTimeout') && code.includes('2000')) return null; return 'setTimeout noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 2,
      title: "2️⃣ Takrorlash (Boshlang'ich)",
      instruction: "Har 500 millisekundda 'Takror' so'zini chiqaradigan taymer yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setInterval(() => console.log('Takror'), 500);",
      test: "if (code.includes('setInterval') && code.includes('500')) return null; return 'setInterval noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 3,
      title: "3️⃣ To'xtatish (Boshlang'ich)",
      instruction: "'timerId' o'zgaruvchisida saqlangan intervalni to'xtating.",
      startingCode: "const timerId = 123;\n// Bu yerga yozing\n",
      hint: "clearInterval(timerId);",
      test: "if (code.includes('clearInterval(timerId)')) return null; return 'clearInterval ishlatilmadi';"
    },
    {
      id: 4,
      title: "4️⃣ Sanoq (Boshlang'ich)",
      instruction: "3 soniyadan keyin 'Tugadi' so'zini chiqaruvchi taymer yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setTimeout(() => console.log('Tugadi'), 3000);",
      test: "if (code.includes('setTimeout') && code.includes('3000')) return null; return '3000ms kutish kerak';"
    },
    {
      id: 5,
      title: "5️⃣ Rekursiv setTimeout (O'rta)",
      instruction: "Rekursiv setTimeout yordamida har 1000ms da konsolga 'Sanoq' so'zini chiqaradigan run funksiyasi yozing va uni ishga tushiring.",
      startingCode: "function run() {\n  console.log('Sanoq');\n  // Kodni shu yerda yozing: run funksiyasini qayta chaqiring\n}\nrun();",
      hint: "setTimeout(run, 1000);",
      test: "if (code.includes('setTimeout(run') && code.includes('1000')) return null; return 'setTimeout ichida run qayta chaqirilishi kerak!';"
    },
    {
      id: 6,
      title: "6️⃣ clearTimeout ishlatish (O'rta)",
      instruction: "2 soniyadan keyin ishlaydigan timeoutId taymerini darhol bekor qiling (clear qiling).",
      startingCode: "const timeoutId = setTimeout(() => {\n  console.log('Bu ishlamasligi kerak');\n}, 2000);\n\n// Kodni shu yerda yozing: timeoutId taymerini to'xtating",
      hint: "clearTimeout(timeoutId);",
      test: "if (code.includes('clearTimeout(timeoutId)')) return null; return 'clearTimeout ishlatilmadi!';"
    },
    {
      id: 7,
      title: "7️⃣ Parametrli setTimeout (O'rta)",
      instruction: "setTimeout orqali sayHello funksiyasiga 'Ali' argumentini uzatib, uni 1.5 soniyadan keyin chaqiring.",
      startingCode: "function sayHello(name) {\n  console.log('Salom, ' + name);\n}\n\n// Kodni shu yerda yozing: sayHello ni 'Ali' parametri va 1500ms bilan chaqiring",
      hint: "setTimeout(sayHello, 1500, 'Ali');",
      test: "if (code.includes('setTimeout') && code.includes('sayHello') && code.includes('Ali') && code.includes('1500')) return null; return 'setTimeout parametri noto\\'g\\'ri!';"
    },
    {
      id: 8,
      title: "8️⃣ Dinamik Interval To'xtatish (Qiyin)",
      instruction: "Har 500ms da counter qiymatini 1 ga oshiruvchi interval yarating. counter qiymati 3 ga yetganda, interval to'xtashi (clear bo'lishi) kerak.",
      startingCode: "let counter = 0;\nconst intervalId = setInterval(() => {\n  counter++;\n  console.log(counter);\n  // Kodni shu yerda yozing: counter 3 bo'lganda intervalId ni to'xtating\n}, 500);",
      hint: "if (counter === 3) clearInterval(intervalId);",
      test: "if (code.includes('counter === 3') && code.includes('clearInterval(intervalId)')) return null; return 'Sanoq 3 bo\\'lganda clearInterval chaqirilishi kerak!';"
    },
    {
      id: 9,
      title: "9️⃣ Delayed Promise (Qiyin)",
      instruction: "1 soniyadan keyin 'Muvaffaqiyat' yozuvi bilan resolved bo'luvchi Promise qaytaradigan delay funksiyasini yozing.",
      startingCode: "function delay() {\n  return new Promise((resolve) => {\n    // Kodni shu yerda yozing: 1000ms keyin resolve ni chaqiring\n  });\n}",
      hint: "setTimeout(() => resolve('Muvaffaqiyat'), 1000);",
      test: "if (code.includes('setTimeout') && code.includes('resolve') && code.includes('1000')) return null; return 'Promise va setTimeout xato bog\\'landi!';"
    },
    {
      id: 10,
      title: "🔟 Nested setTimeout chain (Qiyin)",
      instruction: "1 soniyadan keyin 'Bir', undan keyin yana 2 soniyadan keyin 'Ikki' yozuvlarini chiqaruvchi ketma-ket setTimeout yozing.",
      startingCode: "// Kodni shu yerda yozing: ketma-ket setTimeout zanjiri\n",
      hint: "setTimeout(() => { console.log('Bir'); setTimeout(() => { console.log('Ikki'); }, 2000); }, 1000);",
      test: "if (code.includes('1000') && code.includes('2000') && code.includes('Bir') && code.includes('Ikki')) return null; return 'Kechikish zanjiri xato!';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "`setTimeout` va `setInterval` funksiyalari o'rtasidagi asosiy farq nimada?",
      "options": [
        "`setTimeout` ma'lum vaqtdan keyin kodni faqat bir marta ishga tushiradi, `setInterval` esa ko'rsatilgan vaqt oralig'ida uni takrorlab turadi",
        "`setInterval` faqat soniyalar bilan, `setTimeout` esa millisekundlar bilan ishlaydi",
        "`setTimeout` asinxron, `setInterval` esa sinxron ishlaydi",
        "Ular mutlaqo bir xil ishlaydi, faqat nomlanishi farq qiladi"
      ],
      "correctAnswer": 0,
      "explanation": "`setTimeout` berilgan callback funksiyasini faqat bir marta belgilangan vaqtdan keyin bajaradi. `setInterval` esa har safar belgilangan vaqt oralig'i o'tganda funksiyani takroran chaqiraveradi."
    },
    {
      "id": 2,
      "question": "Quyidagi kod ishga tushgandan so'ng, konsolga xabarlar qaysi tartibda chiqadi?\n```javascript\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');\n```",
      "options": [
        "1, 2, 3",
        "1, 3, 2",
        "2, 1, 3",
        "3, 1, 2"
      ],
      "correctAnswer": 1,
      "explanation": "`setTimeout` kechikishi `0` bo'lsa ham, u asinxron vazifa (macrotask) bo'lgani uchun Callback Queue-ga qo'shiladi va faqat joriy sinxron kodlar (Call Stack) to'liq bajarib bo'lingandan keyingina ishlaydi."
    },
    {
      "id": 3,
      "question": "`setInterval` taymerini butunlay to'xtatish uchun qaysi funksiyadan foydalaniladi?",
      "options": [
        "`stopInterval()`",
        "`clearInterval()`",
        "`clearTimeout()`",
        "`deleteInterval()`"
      ],
      "correctAnswer": 1,
      "explanation": "`setInterval` chaqirilganda qaytarilgan unikal ID raqamini `clearInterval(id)` funksiyasiga uzatish orqali takroriy taymer bekor qilinadi."
    },
    {
      "id": 4,
      "question": "JavaScript taymerlarida vaqtni belgilash uchun qaysi o'lchov birligidan foydalaniladi?",
      "options": [
        "Soniya (Seconds)",
        "Millisekund (Milliseconds) — ya'ni 1 soniya 1000 millisekundga teng",
        "Mikrosekund (Microseconds)",
        "Daqiqa (Minutes)"
      ],
      "correctAnswer": 1,
      "explanation": "JavaScript-da vaqt parametrlari har doim millisekundlarda beriladi (masalan, 2 soniya = 2000 ms)."
    },
    {
      "id": 5,
      "question": "Agar takroriy amallar bajarilishi uzoq cho'zilsa va navbatdagi qadam avvalgisi tugagandan so'ng aniq vaqt o'tib boshlanishi kafolatlanishi kerak bo'lsa, qaysi usul tavsiya etiladi?",
      "options": [
        "Katta kechikish vaqti bilan `setInterval` ishlatish",
        "Rekursiv `setTimeout` (ya'ni funksiya ichida o'zini yangi `setTimeout` orqali qayta chaqirish)",
        "`while` siklidan foydalanish",
        "`requestAnimationFrame`ni cheksiz tsiklda ishlatish"
      ],
      "correctAnswer": 1,
      "explanation": "Rekursiv `setTimeout` oldingi callback to'liq bajarilib bo'lingachgina navbatdagi taymerni o'rnatadi. Bu orqali intervallarning bir-birini bosib ketishi (overlapping) oldi olinadi."
    },
    {
      "id": 6,
      "question": "`setTimeout` chaqirilganda qaytariladigan qiymat nima?",
      "options": [
        "Taymer natijasini saqlovchi Promise obyekti",
        "Taymerni to'xtatish uchun ishlatiladigan unikal taymer ID si (raqam yoki obyekt)",
        "Callback funksiyasining nusxasi",
        "`undefined`"
      ],
      "correctAnswer": 1,
      "explanation": "Taymer funksiyalari (`setTimeout` / `setInterval`) chaqirilganda musbat butun son (brauzerlarda) yoki taymer obyekti (Node.js da) qaytaradi. Bu ID orqali taymerni keyinchalik bekor qilish mumkin."
    },
    {
      "id": 7,
      "question": "Quyidagi kodda `show` metodi chaqirilganda konsolga nima chiqadi?\n```javascript\nconst user = {\n  name: 'Asad',\n  show() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 1000);\n  }\n};\nuser.show();\n```",
      "options": [
        "'Asad'",
        "undefined (yoki strict rejimda xatolik)",
        "TypeError",
        "null"
      ],
      "correctAnswer": 1,
      "explanation": "Oddiy funksiyalar (regular function) setTimeout ichida global contextda ishlaydi, shuning uchun `this` global `window`ga yoki strict mode-da `undefined`ga ishora qiladi. `this.name` esa mavjud emas."
    },
    {
      "id": 8,
      "question": "`setTimeout(callback)` chaqirilsa-yu, kechikish vaqti ko'rsatilmasa, default holatda qancha vaqt olinadi?",
      "options": [
        "0 millisekund (yoki minimal 4ms brauzer cheklovlariga ko'ra)",
        "1000 millisekund",
        "Sinxron tarzda darhol ishlaydi",
        "Taymer ishlamaydi"
      ],
      "correctAnswer": 0,
      "explanation": "Kechikish vaqti ko'rsatilmaganda u default ravishda `0` millisekund deb olinadi va birinchi imkoniyatda bajarilishi uchun Callback Queue-ga qo'shiladi."
    },
    {
      "id": 9,
      "question": "`setTimeout` yordamida callback funksiyaga parametrlarni qanday uzatish mumkin?",
      "options": [
        "Faqat global o'zgaruvchilardan foydalanish orqali",
        "Uchinchi va undan keyingi argumentlar sifatida uzatish orqali: `setTimeout(callback, delay, arg1, arg2)`",
        "Faqat `bind` metodi orqali",
        "Buning iloji yo'q, callback har doim parametrsiz bo'lishi shart"
      ],
      "correctAnswer": 1,
      "explanation": "`setTimeout` va `setInterval` funksiyalari uchinchi argumentdan boshlab barcha qiymatlarni callback funksiyasiga argument qilib uzatadi."
    },
    {
      "id": 10,
      "question": "JavaScript Event Loop tizimida taymer callbacklari qaysi navbatda qayta ishlanadi?",
      "options": [
        "Microtask Queue",
        "Macrotask Queue (Task Queue)",
        "Call Stack",
        "Render Queue"
      ],
      "correctAnswer": 1,
      "explanation": "Taymer callbacklari (setTimeout, setInterval), DOM hodisalari va tarmoq so'rovlari macrotask hisoblanadi va Macrotask Queue-da navbatini kutadi."
    },
    {
      "id": 11,
      "question": "Quyidagi kod bajarilganda konsolda qanday natija ko'rinadi?\n```javascript\nlet x = 10;\nsetTimeout(() => {\n  x += 5;\n}, 1000);\nconsole.log(x);\n```",
      "options": [
        "15",
        "10",
        "NaN",
        "undefined"
      ],
      "correctAnswer": 1,
      "explanation": "`console.log(x)` sinxron kod bo'lib, darhol ishlaydi. `setTimeout` esa asinxron rejalashtirilganligi sababli uning ichidagi o'zgarish 1 soniyadan keyin yuz beradi. Shuning uchun konsolga dastlab `10` chiqadi."
    },
    {
      "id": 12,
      "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nconst timer = setTimeout(() => console.log('A'), 2000);\nclearTimeout(timer);\n```",
      "options": [
        "Konsolga 'A' yozuvi chiqadi",
        "Konsolga hech narsa chiqmaydi, chunki taymer ishlashidan oldin bekor qilindi",
        "Xatolik yuz beradi",
        "Taymer 2 soniya o'rniga 0 soniyada ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "`clearTimeout` funksiyasi taymer ishga tushishidan oldin uning ID sini bekor qiladi, natijada rejalashtirilgan callback funksiyasi hech qachon bajarilmaydi."
    }
  ]
};

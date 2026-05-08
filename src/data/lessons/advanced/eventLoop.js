export const eventLoopLesson = {
  id: "event-loop",
  title: "Event Loop: JavaScript Qanday Ishlaydi?",
  level: "Murakkab",
  description: "Call Stack, Web APIs, Callback Queue, Microtasks, Macrotasks, va Event Loop mexanizmi.",
  theory: `## 1. NEGA kerak?

JavaScript **single-threaded** til, ya'ni u bir vaqtning o'zida faqat bitta ishni bajara oladi. Lekin biz saytlarda bir vaqtning o'zida ham ma'lumot yuklanishini, ham animatsiyalar ishlashini, ham shuning bilan borada boshqa kodlarni o'qishini ko'ramiz.

**Sirotin:**
- Server'dan ma'lumot 5 soniya davom etadi
- Agar JS "kutib tursa", butun sayt 5 soniyaga **qotib qoladi** (bloklanadi)

**Event Loop yechimi:** JS og'ir ishlarni "fondagi ishchilar"ga (Web APIs) topshiradi va o'zi navbatdagi kodni o'qishda davom etadi.

## 2. SODDALIK (Analogiya)

**Restorandagi ofitsiant va oshxonani tasavvur qiling:**

1. **Ofitsiant (Call Stack):** Buyurtmalarni oladi va oshxonaga uzatadi
2. **Oshxona (Web APIs):** Ovqatni tayyorlaydi (5-10 daqiqa)
3. **Tayyor taomlar stoli (Callback Queue):** Tayyor ovqatlar ofitsiant bo'shashini kutadi
4. **Event Loop:** Har doim ofitsiantga qarab turadi. Agar u bo'sh bo'lsa, stoldagi ovqatni mijozga olib boradi

## 3. STRUKTURA

### A. JavaScript Runtime Components

\`\`\`
┌─────────────────────────────────────────────────────┐
│                 JavaScript Runtime                   │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────┐      ┌──────────────────┐  │
│  │   Call Stack        │      │   Web APIs       │  │
│  │ (Ishlayotgan kod)   │<────→│ (setTimeout,     │  │
│  │                     │      │  fetch, events)  │  │
│  └─────────────────────┘      └──────────────────┘  │
│           ▲                            │             │
│           │                            │             │
│           └─────── Event Loop ─────────┘             │
│                      ▲                               │
│                      │                               │
│           ┌──────────┴──────────┐                   │
│           │                     │                   │
│      Microtask Queue      Macrotask Queue            │
│      (Promises)           (setTimeout)               │
│                                                       │
└─────────────────────────────────────────────────────┘
\`\`\`

### B. Call Stack - Ishlayotgan Kod

\`\`\`javascript
function a() {
  console.log("a() boshlandi");
  b();
  console.log("a() tugadi");
}

function b() {
  console.log("b() ishlaydi");
}

a();

// Call Stack:
// 1. a() push
// 2. b() push
// 3. b() pop
// 4. a() pop
\`\`\`

**Stack:** LIFO (Last In, First Out) - oxirgi kelib, birinchi chiqadi.

### C. Web APIs - Asinxron Operatsiyalar

\`\`\`javascript
console.log("Start");

setTimeout(() => {
  console.log("Timer!");
}, 1000);

fetch("https://api.example.com/data")
  .then(r => r.json())
  .then(data => console.log(data));

console.log("End");

// Call Stack bu yerda:
// 1. "Start" chiqar
// 2. "End" chiqar
// 3. (Timer 1s keyin Web API'ga o'tdi)
// 4. (Fetch Web API'ga o'tdi)
\`\`\`

### D. Callback Queue (Macrotask Queue)

\`\`\`javascript
// setTimeout va setInterval callback'lari bu yerga tushadi

console.log("1");

setTimeout(() => {
  console.log("2");  // Callback Queue'ga
}, 0);

console.log("3");

// Natija: 1, 3, 2
// 0ms bo'lsa ham, Call Stack bo'shashini kutadi!
\`\`\`

### E. Microtask Queue

Promise'lar va async/await callback'lari bu yerga tushadi:

\`\`\`javascript
console.log("1");

Promise.resolve()
  .then(() => console.log("2"));  // Microtask Queue'ga

setTimeout(() => {
  console.log("3");  // Macrotask Queue'ga
}, 0);

console.log("4");

// Natija: 1, 4, 2, 3
// Microtask Queue har doim Macrotask Queue'dan oldin bajariladi!
\`\`\`

### F. Microtask vs Macrotask - Eng Muhim Farq!

**Microtasks (Yuqori ustuvor):**
- Promises (.then, .catch, .finally)
- async/await
- queueMicrotask()
- MutationObserver

**Macrotasks (Past ustuvor):**
- setTimeout
- setInterval
- setImmediate (Node.js)
- I/O operations
- UI rendering

**Eng Muhim:** Event Loop har macrotask'dan keyin barcha microtask'larni bajarib tugataguncha kutadi!

\`\`\`
Iteration:
1. Macrotask bitta bajaril
2. ❌ Macrotask queue'dan yana birini chuqur
3. ✅ Barcha Microtask'larni bajaril
4. Render (UI yangilandi)
5. Yana bitta Macrotask bajaril...
\`\`\`

### G. Event Loop Mexanizmi (Kuzaylikda)

\`\`\`javascript
console.log("Script start");

setTimeout(() => {
  console.log("setTimeout 1");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    setTimeout(() => {
      console.log("setTimeout 2");
    }, 0);
  })
  .then(() => {
    console.log("Promise 2");
  });

console.log("Script end");

// Event Loop jarayoni:
// 1. "Script start" chiqar (Call Stack)
// 2. "Script end" chiqar (Call Stack)
// 3. Microtask Queue bo'sh emasmi? -> "Promise 1"
// 4. Microtask Queue bo'sh emasmi? -> "Promise 2"
// 5. Macrotask Queue bo'sh emasmi? -> "setTimeout 1"
// 6. Microtask Queue bo'sh emasmi? -> yo'q
// 7. Macrotask Queue bo'sh emasmi? -> "setTimeout 2"

// Natija:
// "Script start"
// "Script end"
// "Promise 1"
// "Promise 2"
// "setTimeout 1"
// "setTimeout 2"
\`\`\`

### H. Blocking Code (Bloklangan Kod)

\`\`\`javascript
// ❌ XATO - Blokirovka
console.log("Start");

for (let i = 0; i < 1000000000; i++) {
  // Juda ko'p iteratsiya!
}

console.log("End");  // 10+ soniyadan keyin chiqadi

// Bu vaqtda:
// - Button'larga klik javob bermaydi
// - Animatsiyalar to'xtab qoladi
// - Sayt "donug'iga tushadi"

// ✅ TO'G'RI - Chunks
function processInChunks(data, chunkSize) {
  let index = 0;

  function processChunk() {
    const end = Math.min(index + chunkSize, data.length);

    for (let i = index; i < end; i++) {
      // Kichik chunk
    }

    index = end;

    if (index < data.length) {
      setTimeout(processChunk, 0);  // Boshqa kodlar ishlay oladi
    }
  }

  processChunk();
}
\`\`\`

### I. Rendering va Event Loop

\`\`\`javascript
// Browser rendering Event Loop'da:

// 1. Bitta Macrotask bajaril
// 2. Barcha Microtask'larni bajaril
// 3. Rendering (agar kerak bo'lsa)
// 4. Yana bitta Macrotask...

// Misol:
document.body.style.background = "red";
// Rendering hali bo'lmadi!

setTimeout(() => {
  document.body.style.background = "blue";
  // Bu setTimeout macrotask'i boshqa frame'da bo'ladi
  // Demak "blue" yangi render cycle'da ko'rinadi
}, 0);

// Natija:
// Qizil ko'rinadi, keyin ko'k o'zgaradi
\`\`\`

### J. requestAnimationFrame (rAF)

\`\`\`javascript
// requestAnimationFrame - Rendering'dan oldin bajariladi

console.log("Start");

requestAnimationFrame(() => {
  console.log("rAF 1");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

console.log("End");

// Natija:
// "Start"
// "End"
// "Promise"
// "rAF 1"
// (Rendering)
// "setTimeout"
\`\`\`

### K. Performance - Event Loop Monitoring

\`\`\`javascript
// Performance API yordamida Event Loop'ni tahlil qilish

performance.mark("start");

setTimeout(() => {
  performance.mark("end");
  performance.measure("interval", "start", "end");

  const measure = performance.getEntriesByName("interval")[0];
  console.log("Vaqt: " + measure.duration + "ms");
}, 1);
\`\`\`

### L. Node.js Event Loop - Brauzer Event Loop'dan Farq

Node.js'da Event Loop boshqacha ishlaydi:

\`\`\`
Phase 1: Timers (setTimeout, setInterval)
Phase 2: Pending Callbacks
Phase 3: Idle, Prepare
Phase 4: Poll (I/O events)
Phase 5: Check (setImmediate)
Phase 6: Close Callbacks
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **setTimeout(0) darhol ishlamaydi:**
   \`\`\`javascript
   console.log("1");
   setTimeout(() => console.log("2"), 0);
   console.log("3");
   // Natija: 1, 3, 2 (0ms bo'lsa ham!)
   \`\`\`

2. **Blokirovka Code:**
   \`\`\`javascript
   for (let i = 0; i < 1000000000; i++) {
     // Sayt to'xtaydi!
   }
   \`\`\`

3. **Microtask/Macrotask Adashtirish:**
   \`\`\`javascript
   // Promise (Microtask) vs setTimeout (Macrotask)
   // Promise har doim oldin bajariladi!
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. JavaScript necha oqimli (threaded) til?</summary>
Single-threaded. Faqat bitta kod bir vaqtda bajariladi. Event Loop asinxronlikni ta'minlaydi.
</details>

<details>
<summary>2. Call Stack nima?</summary>
Hozir bajarilayotgan funksiyalar navbati. LIFO tartibida ishlaydi.
</details>

<details>
<summary>3. Web APIs nima vazifani bajaradi?</summary>
setTimeout, fetch, DOM events kabi asinxron operatsiyalarni brauzer xotirasida bajaradi.
</details>

<details>
<summary>4. Event Loop'ning asosiy vazifasi nima?</summary>
Call Stack bo'sh bo'lsa, Callback Queue'dagi callback'larni Call Stack'ga o'tkazish.
</details>

<details>
<summary>5. Microtask va Macrotask farqi nimada?</summary>
Microtask (Promise) - yuqori ustuvor, har doim birinchi. Macrotask (setTimeout) - past ustuvor.
</details>

<details>
<summary>6. Promise qaysi navbatga tushadi?</summary>
Microtask Queue'ga. Har doim Macrotask'lardan oldin bajariladi.
</details>

<details>
<summary>7. setTimeout qaysi navbatga tushadi?</summary>
Macrotask Queue'ga (Callback Queue deb ham ataladi).
</details>

<details>
<summary>8. Nima uchun microtask'lar macrotask'lardan oldin bajariladi?</summary>
Promise'lar synchron ishlar bilan bog'liq (DOM manipulyatsiya, state updates), shunday qayta asosly UI va data konsistent bo'ladi.
</details>

<details>
<summary>9. "Blocking code" nima degani?</summary>
Event Loop'ni to'xtatadigan uzun ishlashga ega kod. Brauzer frozen bo'lib ketadi.
</details>

<details>
<summary>10. Event Loop brauzerni qotib qolishidan qanday saqlaydi?</summary>
Asinxron operatsiyalarni Web API'larga topshirish orqali. Main thread faqat kichik kodlarni bajarib, navbatdagi buyurtmaga o'tadi.
</details>

<details>
<summary>11. Call Stack bo'sh bo'lmasa Event Loop nima qiladi?</summary>
Kutib qoladi. Callback'lar Call Stack bo'shashini kutadi.
</details>

<details>
<summary>12. Node.js va Browser Event Loop'lari farq qiladimi?</summary>
Ha. Node.js 6 phase'ga ega (Timers, Pending, Idle, Poll, Check, Close). Browser esa Microtask/Macrotask'ga ega.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Call Stack Tartibi",
      instruction: "Funksiyalar Call Stack'ga qo'shilish va chiqish tartibi:",
      startingCode: "function a() { b(); console.log('a'); }\nfunction b() { console.log('b'); }\na();\n",
      hint: "a() push, b() push, 'b' chiqar, b() pop, 'a' chiqar, a() pop",
      test: "if (logs.includes('b') && logs.indexOf('b') < logs.indexOf('a')) return null; return 'Stack tartibi noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "setTimeout vs Promise - Microtask/Macrotask",
      instruction: "'1', '4', '3', '2' chiqadigan kod yozing (Promise va setTimeout).",
      startingCode: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n",
      hint: "Promise - Microtask (3), setTimeout - Macrotask (2)",
      test: "if (logs[0] === '1' && logs[1] === '4' && logs[2] === '3' && logs[3] === '2') return null; return 'Tartib noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Microtask Queue Boshlang'ichi",
      instruction: "Boshqa Promise'lar Microtask Queue'ga: natija '1', '5', '2', '3', '4' bo'lsin.",
      startingCode: "console.log('1');\nPromise.resolve().then(() => console.log('2'));\nPromise.resolve().then(() => console.log('3'));\nPromise.resolve().then(() => console.log('4'));\nconsole.log('5');\n",
      hint: "Barcha Promise'lar Microtask Queue'ga tushadi va call stack bo'shashini kutadi",
      test: "if (logs[0] === '1' && logs[1] === '5') return null; return 'Queue noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Nested setTimeout va Promise",
      instruction: "Nested: setTimeout ichidagi Promise'ni oyinlang.",
      startingCode: "setTimeout(() => {\n  console.log('setTimeout');\n  Promise.resolve().then(() => console.log('Promise in setTimeout'));\n}, 0);\nPromise.resolve().then(() => console.log('Promise 1'));\n",
      hint: "'Promise 1', 'setTimeout', 'Promise in setTimeout'",
      test: "if (logs.includes('Promise 1') && logs[0] === 'Promise 1') return null; return 'Nested noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Event Loop bilan DOM",
      instruction: "Style o'zgartirilsa ham, rendering qachon bo'ladi?",
      startingCode: "document.body.style.background = 'red';\nsetTimeout(() => {\n  document.body.style.background = 'blue';\n  console.log('Blue set');\n}, 0);\nconsole.log('Red set');\n",
      hint: "Rendering Event Loop phaseida sodir bo'ladi",
      test: "if (logs.includes('Red set')) return null; return 'DOM noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "Blocking Code Muammosi",
      instruction: "'Calc' va 'End' o'rtasida uzun for loop bo'lsa nima bo'ladi?",
      startingCode: "console.log('Start');\nfor (let i = 0; i < 1000000000; i++) {}\nconsole.log('End');\n",
      hint: "Blocking - 'End' derhol chiqmaydi, uzun davom etadi",
      test: "if (code.includes('for')) return null; return 'Blocking noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "queueMicrotask() Funksiyasi",
      instruction: "queueMicrotask() orqali Microtask Queue'ga qo'shing.",
      startingCode: "console.log('1');\nqueueMicrotask(() => console.log('Microtask'));\nconsole.log('2');\n",
      hint: "'1', '2', 'Microtask'",
      test: "if (logs.includes('1') && logs[2] === 'Microtask') return null; return 'queueMicrotask noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Multiple setTimeout'lar",
      instruction: "setTimeout'lar qaysi tartibda bajariladi?",
      startingCode: "setTimeout(() => console.log('1'), 100);\nsetTimeout(() => console.log('2'), 50);\nsetTimeout(() => console.log('3'), 0);\n",
      hint: "'3' (0ms), '2' (50ms), '1' (100ms) - mos ravishda",
      test: "if (logs[0] === '3' && logs[1] === '2' && logs[2] === '1') return null; return 'Timers noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Promise Chain'i",
      instruction: "Promise zanjirida Microtask'lar ketma-ketligi:",
      startingCode: "Promise.resolve()\n  .then(() => {\n    console.log('P1');\n    return Promise.resolve();\n  })\n  .then(() => console.log('P2'));\nconsole.log('Sync');\n",
      hint: "'Sync', 'P1', 'P2'",
      test: "if (logs[0] === 'Sync' && logs[1] === 'P1' && logs[2] === 'P2') return null; return 'Chain noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "setTimeout bilan Microtask",
      instruction: "setTimeout ichida Promise bo'lsa Microtask qachon bajariladi?",
      startingCode: "setTimeout(() => {\n  console.log('Macro');\n  Promise.resolve().then(() => console.log('Micro'));\n}, 0);\n",
      hint: "'Macro', 'Micro' - ayniyat Macrotask keyin Microtask",
      test: "if (logs[0] === 'Macro' && logs[1] === 'Micro') return null; return 'Mixed noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "requestAnimationFrame",
      instruction: "rAF rendering oldinmi keyin borimi?",
      startingCode: "console.log('Start');\nrequestAnimationFrame(() => console.log('rAF'));\nPromise.resolve().then(() => console.log('Promise'));\nconsole.log('End');\n",
      hint: "'Start', 'End', 'Promise', 'rAF' (rendering oldin)",
      test: "if (logs[0] === 'Start' && logs[1] === 'End' && logs[2] === 'Promise') return null; return 'rAF noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Event Loop Simulyatsiya",
      instruction: "Barcha Event Loop komponentlarini qo'llanib, natija '1', '5', '2', '4', '3', '6' bo'lsin.",
      startingCode: "console.log('1');\nsetTimeout(() => console.log('4'), 0);\nPromise.resolve()\n  .then(() => {\n    console.log('2');\n    setTimeout(() => console.log('5'), 0);\n  })\n  .then(() => console.log('3'));\nconsole.log('6');\n",
      hint: "Sync, Promise Microtask, keyin setTimeout Macrotask",
      test: "if (logs[0] === '1' && logs[1] === '6' && logs[2] === '2') return null; return 'Kompleks noto\\'g\\'ri';"
    }
  ]
};

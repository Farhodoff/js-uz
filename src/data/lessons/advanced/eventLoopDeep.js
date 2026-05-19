export const eventLoopDeep = {
  id: "a12",
  title: "Event Loop (Deep Dive)",
  theory: `## 1. KIRISH
Nima uchun JavaScript bir vaqtda faqat bitta ishni bajara olsa ham (Single Threaded), u qotib qolmasdan minglab foydalanuvchilarga xizmat ko'rsata oladi? Javob - **Event Loop**.

Ushbu darsda biz JavaScriptning "kapoti" ostiga kirib, u asinxron kodni qanday boshqarishini o'rganamiz.

## 2. TUSHUNCHA

### Call Stack
Hozirda ishlayotgan funksiyalar navbati. LIFO (Last In, First Out) tamoyili asosida ishlaydi.
**Metafora:** Likopchalar to'plami - oxirgi qo'yilgani birinchi olinadi.

### Task Queue (Macrotasks)
\`setTimeout\`, \`setInterval\` kabi amallar natijasi shu yerda navbat kutadi.

### Microtask Queue
\`Promises\`, \`queueMicrotask\` va \`MutationObserver\`. Bu navbat **hammasidan ustun** turadi!

---

## 3. KOD MISOLLARI

### Misol 1 — Tartibni aniqlash
**Maqsad:** Call Stack, Microtask va Macrotask navbatini ko'rsatish.
\`\`\`javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise");
});

console.log("4. End");

// NATIJA:
// 1. Start
// 4. End
// 3. Promise  (Microtask)
// 2. Timeout (Macrotask)
\`\`\`

**Nima bo'ldi:**
1. \`console.log\` (Synchronous) birinchi ishlaydi.
2. \`Promise\` (Microtask) navbatga qo'shiladi.
3. \`setTimeout\` (Macrotask) navbatga qo'shiladi.
4. Stack bo'shagach, avval hamma Microtasklar, keyin bitta Macrotask bajariladi.

---

## 4. VIZUAL TUSHUNTIRISH
### Event Loop Oqimi
\`\`\`
1. [Call Stack] dagi hamma sinxron kodni bajar.
2. [Microtask Queue] bo'shaguncha hammasini bajar (Promises).
3. [Render] kerak bo'lsa ekranni yangila.
4. [Task Queue] dan bitta Macrotaskni olib bajar (setTimeout).
5. 1-qadamga qayt. 🔄
\`\`\`

---

## 5. UMUMIY XATOLAR
### ❌ Stack Overflow
\`\`\`javascript
function recursive() {
  recursive(); // Cheksiz rekursiya
}
// Muammo: Call Stack to'lib ketadi va dastur to'xtaydi.
\`\`\`

---

## 6. INTERVYU SAVOLLARI (⭐ Top 3)
1. **Nima uchun Promise setTimeout'dan oldin ishlaydi?** - Chunki Promiselar Microtask queue ga tushadi va Event Loop ularni Macrotasklardan oldin bajaradi.
2. **Event Loop nima uchun kerak?** - JS single-threaded bo'lgani uchun asinxron amallarni (API so'rovlar, taymerlar) boshqarish uchun kerak.
3. **Microtask va Macrotask farqi?** - Microtasklar joriy stack bo'shashi bilan darhol bajariladi, Macrotasklar esa navbatdagi aylanishda.

---

## 7. MINI LOYIHA: "Execution Order Simulator"
**Vazifa:** Quyidagi kod natijasini bashorat qiling va sinab ko'ring.

\`\`\`javascript
console.log("A");

async function asyncFn() {
  console.log("B");
  await Promise.resolve();
  console.log("C");
}

asyncFn();

console.log("D");

// Kutilgan natija: A, B, D, C
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Microtask ustunligi",
      instruction: "Sinxron log, Promise va setTimeout'ni shunday yozingki, logda 1, 2, 3 chiqsin.",
      startingCode: "// Tartibni to'g'rilang\n",
      hint: "console.log(1); Promise.resolve().then(() => console.log(2)); setTimeout(() => console.log(3));",
      test: "if (logs[0] === '1' && logs[1] === '2' && logs[2] === '3') return null; return 'Tartib: 1 (Sync), 2 (Promise), 3 (Timeout)';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript tili \"Single-Threaded\" (bitta ipli) bo'lishiga qaramay, asinxron vazifalarni qanday qilib qotib qolmasdan bajaradi?",
      options: [
        "Brauzerning ko'p ipli (multi-threaded) muhiti (Web APIs) va Event Loop mexanizmi orqali",
        "JavaScript avtomatik ravishda kodni bir nechta kompyuterlarga tarqatib yuborishi orqali",
        "Barcha asinxron kodlarni sinxron kodga o'zgartirish orqali",
        "Hech qanday maxsus mexanizmsiz, JS aslida multi-threaded til"
      ],
      correctAnswer: 0,
      explanation: "JavaScript dvijogi bitta ipli bo'lsa ham, brauzer yoki Node.js asinxron vazifalarni (timer, tarmoq so'rovlari) Web API orqali parallel bajaradi va Event Loop yordamida natijalarni navbatma-navbat stackka qaytaradi."
    },
    {
      id: 2,
      question: "Qaysi navbat (queue) har doim eng ustun turadi va Call Stack bo'shashi bilan birinchi navbatda barcha elementlari bajarilib tugatiladi?",
      options: [
        "Task Queue (Macrotasks)",
        "Microtask Queue (Promises, queueMicrotask)",
        "Render Queue (ekranni yangilash)",
        "Sinxron Stack"
      ],
      correctAnswer: 1,
      explanation: "Event Loop har bir aylanishda Call Stack bo'shashi bilan birinchi bo'lib Microtask Queue'dagi barcha topshiriqlarni (shu jumladan bajarilish jarayonida qo'shilgan yangilarini ham) oxirigacha bajarib tugatadi."
    },
    {
      id: 3,
      question: "Quyidagi kod chop etilganda konsolga nima chiqadi?\n```javascript\nconsole.log('Start');\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nconsole.log('End');\n```",
      options: [
        "Start, Timeout, Promise, End",
        "Start, End, Promise, Timeout",
        "Start, End, Timeout, Promise",
        "Start, Promise, Timeout, End"
      ],
      correctAnswer: 1,
      explanation: "1) 'Start' va 'End' sinxron bo'lgani uchun call stack'da darhol ishlaydi. 2) Microtask'lar (Promise) birinchi navbatda ishlaydi, shuning uchun 'Promise' chiqadi. 3) Macrotask'lar (setTimeout) eng oxirida ishlaydi, shuning uchun 'Timeout' chiqadi."
    },
    {
      id: 4,
      question: "`setTimeout(fn, 1000)` chaqirilganda, 1000 millisoniyadan so'ng nima sodir bo'ladi?",
      options: [
        "Callback funksiya darhol Call Stack'ka yuklanib ishga tushadi",
        "Callback funksiya Task Queue'ga (Macrotask) joylashtiriladi va Call Stack hamda Microtask'lar bo'shashini kutadi",
        "Dastur 1 soniyaga butunlay to'xtab qoladi (muzlaydi)",
        "Brauzer oynasi avtomatik ravishda yangilanadi"
      ],
      correctAnswer: 1,
      explanation: "`setTimeout` vaqti tugashi bilangan callback darhol bajarilmaydi, u Macrotask navbatiga qo'shiladi va Event Loop uning navbati kelishini kutadi."
    },
    {
      id: 5,
      question: "\"Microtask Starvation\" (ochlik) muammosi nima?",
      options: [
        "Microtask Queue'da juda kam vazifalar bo'lishi",
        "Microtask navbatiga to'xtovsiz ravishda yangi microtask'lar qo'shilaverishi natijasida Task Queue (Macrotask) va foydalanuvchi interfeysi (render) mutlaqo bajarilmay qolib ketishi",
        "Kompyuter xotirasi (RAM) to'lib qolishi",
        "Garbage Collector ishlamay qolishi"
      ],
      correctAnswer: 1,
      explanation: "Agar microtask ichida recursively yana microtask chaqirilaversa (masalan, cheksiz Promise zanjiri), Event Loop hech qachon Macrotask navbatiga yoki Render bosqichiga o'tolmaydi, oqibatda interfeys qotib qoladi (starvation)."
    }
  ]
};

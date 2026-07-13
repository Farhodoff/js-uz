export const eventLoop = {
  id: "eventLoop",
  title: "Event Loop (Hodisalar sikli)",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy: Oshpaz va Restoran

JavaScript bir vaqtning o'zida faqat bitta ishni qila oladigan yagona "oshpaz" (single-threaded) ga o'xshaydi. Tasavvur qiling, restoran oshxonasida faqat siz ishlaysiz:

* **Sinxron vazifalar:** Mijoz "Salat" buyurtma qildi. Siz darhol sabzavotlarni to'g'raysiz va tayyorlaysiz. Bu sinxron, uzoq vaqt olmaydi.
* **Asinxron vazifalar:** Boshqa mijoz "Tovuq pishirish"ni so'radi. Siz tovuqni pechga (Web API) qo'yasiz va taymer (setTimeout) yoqasiz. Tovuq pishguncha qarab turmaysiz, balki boshqa mijozlarning buyurtmalarini (Call Stack-dagi boshqa sinxron ishlar) bajarishda davom etasiz.
* **Event Loop:** Pech taymeri chalinganda (Callback Queue), oshpaz qo'lidagi ishini tugatib bo'lishi bilan pechdan tovuqni oladi (Call Stack-ga qaytadi).

---

## 2. 🧠 Deep Dive: Under the Hood (V8, Memory, Performance)

Keling, kapot ostida nimalar bo'layotganini ko'ramiz. JavaScript dvigateli (masalan, Google V8) asosan ikki qismdan iborat:
1. **Memory Heap:** Obyektlar va o'zgaruvchilar saqlanadigan xotira.
2. **Call Stack:** Qaysi funksiya hozir ishlayotganini LIFO (Last In, First Out) qoidasi asosida kuzatuvchi tuzilma.

Lekin brauzer (yoki Node.js) faqat JS dvigateli emas. Ular qo'shimcha imkoniyatlarni ham taqdim etadi:
* **Web APIs:** \`setTimeout\`, \`DOM Events\`, \`fetch\` kabilar brauzer tomonidan (parallel tarzda) bajariladi.
* **Callback Queue (Macrotask Queue):** Web API ishi tugagach, ularning callback funksiyalari (masalan taymer tugaganda ishlaydigan kod) ushbu navbatga tushadi.
* **Microtask Queue:** \`Promise.then\` va \`MutationObserver\` kabi yuqori ustuvorlikka (priority) ega bo'lgan vazifalar navbati. Event Loop har doim Macrotask'lardan oldin Microtask Queue'ni bo'shatadi!

### Kod misoli
\`\`\`javascript
console.log("1. Sinxron");

setTimeout(() => {
  console.log("4. Macrotask");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask");
});

console.log("2. Sinxron");
\`\`\`
*(Natija: 1, 2, 3, 4)*

### Mermaid Diagram
\`\`\`mermaid
graph TD;
  A[Call Stack] -->|Sinxron tugagach| B(Web APIs);
  B -->|Asinxron tugagach| C[Macrotask Queue];
  A -->|Promise resolved| D[Microtask Queue];
  D -->|Yuqori ustuvorlik| A;
  C -->|Event Loop ko'chirmasi| A;
\`\`\`

---

## 3. ⚠️ Edge Cases & Senior Interview Questions

### Edge Case 1: Stack Starvation
Agar \`Promise\` ichida cheksiz o'zini o'zi chaqiruvchi zanjir hosil qilsangiz, Event Loop qotib qoladi. Chunki u Microtask Queue to'liq bo'shaguncha Macrotask'larni bajarmaydi.
\`\`\`javascript
function blockEventLoop() {
  Promise.resolve().then(blockEventLoop);
}
// blockEventLoop() chaqirilsa sahifa butunlay qotadi!
\`\`\`

### Senior Interview Savollari
1. **Savol:** \`setTimeout(fn, 0)\` nega aynan 0ms dan so'ng ishlamaydi?
   * **Javob:** Chunki \`0\` taymer muddati tugaganini anglatadi, lekin u Task Queue ga tushib qoladi. Agar hozir Call Stack'da og'ir tsikl (\`while\`) aylanayotgan bo'lsa, \`fn\` u tugamaguncha ishlay olmaydi.
2. **Savol:** Brauzer va Node.js dagi Event Loop farqi nimada?
   * **Javob:** Brauzer bitta asosiy oqim va Web API'ga suyanadi. Node.js esa libuv C++ kutubxonasini ishlatadi va uning Event Loop'i turli fazalarga bo'lingan (Timers, Poll, Check).
3. **Savol:** Sahifani render qilish Event Loop bilan qanday bog'langan?
   * **Javob:** Brauzer har doim yangi kadrni (frame) chizishdan oldin Microtask Queue bo'shligiga ishonch hosil qiladi. Sinxron blokirovka (masalan 2 soniyalik \`for\` tsikli) animatsiyalarni qotirib qo'yadi.
`,
  exercises: [
    {
      id: 1,
      title: "Sinxron va Asinxron Ketma-ketlik",
      instruction: "Quyidagi `scheduleLogs(logFn)` funksiyasini yozing. U berilgan `logFn` funksiyasini quyidagi tartibda chaqirsin:\n1. 'Start' (sinxron)\n2. 'Middle' (asinxron, setTimeout orqali)\n3. 'End' (sinxron)",
      startingCode: "function scheduleLogs(logFn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "logFn('Start') va logFn('End') ni sinxron yozing, o'rtada setTimeout(() => logFn('Middle'), 0) dan foydalaning.",
      test: "if (!code.includes('setTimeout')) return 'setTimeout ishlatilmadi';\nconst sandbox = new Function(code + '; return scheduleLogs;');\nconst fn = sandbox();\nconst logs = [];\nconst logFn = (msg) => logs.push(msg);\nfn(logFn);\nif (logs.length === 2 && logs[0] === 'Start' && logs[1] === 'End') {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      if (logs.length === 3 && logs[2] === 'Middle') resolve(null);\n      else resolve('Ketma-ketlik xato');\n    }, 20);\n  });\n}\nreturn 'Sinxron qism to\\'g\\'ri bajarilmadi';"
    },
    {
      id: 2,
      title: "Promise bilan Kechikish (Delay)",
      instruction: "Berilgan `ms` (millisekundlar) dan keyin resolve bo'ladigan Promise qaytaruvchi `delay(ms)` funksiyasini yozing.",
      startingCode: "function delay(ms) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Yangi Promise yarating va uning resolve qismini setTimeout ichida ishlating.",
      test: "if (!code.includes('Promise') || !code.includes('setTimeout')) return 'Promise va setTimeout ikkalasi ham ishlatilishi shart';\nconst sandbox = new Function(code + '; return delay;');\nconst fn = sandbox();\nconst start = Date.now();\nreturn fn(50).then(() => {\n  const diff = Date.now() - start;\n  if (diff >= 40 && diff <= 120) return null;\n  return 'Kechikish noto\\'g\\'ri';\n});"
    },
    {
      id: 3,
      title: "Funksiyani Asinxron Chaqirish",
      instruction: "Qabul qilingan `fn` funksiyasini asinxron ravishda (Event Loop orqali) chaqiradigan `callAsync(fn)` funksiyasini yozing.",
      startingCode: "function callAsync(fn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "setTimeout(fn, 0) yordamida uni navbatga qo'ying.",
      test: "if (!code.includes('setTimeout')) return 'setTimeout ishlatilmadi';\nconst sandbox = new Function(code + '; return callAsync;');\nconst fn = sandbox();\nlet called = false;\nfn(() => { called = true; });\nif (called) return 'Sinxron chaqirildi, asinxron kerak';\nreturn new Promise(resolve => {\n  setTimeout(() => resolve(called ? null : 'Chaqirilmadi'), 10);\n});"
    },
    {
      id: 4,
      title: "Microtask va Macrotask Navbati",
      instruction: "`logTasks(logFn)` funksiyasi `logFn` orqali 3 ta qiymatni konsolga chiqarsin: 1 (Sinxron), 2 (Microtask), 3 (Macrotask). Ular aytilgan tartibda ishlashi uchun to'g'ri API larni tanlang.",
      startingCode: "function logTasks(logFn) {\n  // 1, 2, 3 ni mos ravishda chaqiring\n}\n",
      hint: "logFn(1) ni sinxron, logFn(2) ni Promise.resolve().then() ichida, logFn(3) ni setTimeout ichida ishlating.",
      test: "const sandbox = new Function(code + '; return logTasks;');\nconst fn = sandbox();\nconst logs = [];\nfn(msg => logs.push(msg));\nif (logs[0] !== 1) return 'Birinchi sinxron ishlashi kerak';\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (logs[1] === 2 && logs[2] === 3) resolve(null);\n    else resolve('Microtask va Macrotask navbati buzildi');\n  }, 10);\n});"
    },
    {
      id: 5,
      title: "Taymerni Bekor Qilish",
      instruction: "`createCancelableTask(fn, ms)` funksiyasi vazifani `ms` dan so'ng bajarishni rejalashtirsin va taymerni bekor qila oladigan funksiya qaytarsin.",
      startingCode: "function createCancelableTask(fn, ms) {\n  // Taymerni saqlang va cancel qilish uchun funksiya qaytaring\n  return function cancel() {\n    \n  };\n}\n",
      hint: "setTimeout ID sini o'zgaruvchida saqlang va clearTimeout yordamida to'xtating.",
      test: "const sandbox = new Function(code + '; return createCancelableTask;');\nconst fn = sandbox();\nlet called = false;\nconst cancel = fn(() => { called = true; }, 50);\ncancel();\nreturn new Promise(resolve => setTimeout(() => resolve(called ? 'Bekor qilinmadi' : null), 60));"
    },
    {
      id: 6,
      title: "setInterval bilan Takrorlash",
      instruction: "`repeatTask(fn, ms, times)` funksiyasi `fn` ni har `ms` vaqtda jami `times` marta chaqirsin, so'ng to'xtatsin.",
      startingCode: "function repeatTask(fn, ms, times) {\n  // Interval yarating va kerakli marta ishlagach clearInterval qiling\n}\n",
      hint: "Sanoqchi (counter) ishlating va u times ga yetganda clearInterval ni chaqiring.",
      test: "const sandbox = new Function(code + '; return repeatTask;');\nconst fn = sandbox();\nlet count = 0;\nfn(() => { count++; }, 10, 3);\nreturn new Promise(resolve => setTimeout(() => resolve(count === 3 ? null : 'Takrorlash soni xato'), 60));"
    },
    {
      id: 7,
      title: "queueMicrotask orqali tezkor vazifa",
      instruction: "`runMicrotask(fn)` funksiyasini yozing, u `queueMicrotask` yordamida funksiyani Microtask sifatida ishga tushirsin.",
      startingCode: "function runMicrotask(fn) {\n  // queueMicrotask ishlating\n}\n",
      hint: "queueMicrotask global funksiya bo'lib unga to'g'ridan-to'g'ri fn ni berib yuborishingiz mumkin.",
      test: "if (!code.includes('queueMicrotask')) return 'queueMicrotask ishlatilmadi';\nconst sandbox = new Function(code + '; return runMicrotask;');\nconst fn = sandbox();\nlet called = false;\nfn(() => { called = true; });\nif (called) return 'Sinxron ishladi';\nreturn Promise.resolve().then(() => called ? null : 'Microtask ishlamadi');"
    },
    {
      id: 8,
      title: "Promise Zanjiri (Chaining)",
      instruction: "`chainPromises(val)` funksiyasi `val` ni olsin va quyidagi 3 ta operatsiyani Promise then orqali zanjir qilib bajarsin: 1) val + 1 2) val * 2 3) val - 1. Natijada so'nggi qiymat Promise ichida qaytsin.",
      startingCode: "function chainPromises(val) {\n  return Promise.resolve(val)\n    // .then() larni yozing\n}\n",
      hint: "Har bir then() ichida oldingi natijani olib arifmetik amalni bajarib qaytaring.",
      test: "const sandbox = new Function(code + '; return chainPromises;');\nconst fn = sandbox();\nreturn fn(2).then(res => res === 5 ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 9,
      title: "Parallel Asinxron Kutish (Promise.all)",
      instruction: "Uchta Promise (P1, P2, P3) beriladi. Ular hammasi tugagach, ularning natijalarini jamlab (massiv ko'rinishida) qaytaruvchi `waitAll(p1, p2, p3)` funksiyasini yozing.",
      startingCode: "function waitAll(p1, p2, p3) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Promise.all([p1, p2, p3]) dan foydalaning.",
      test: "const sandbox = new Function(code + '; return waitAll;');\nconst fn = sandbox();\nreturn fn(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)).then(res => (res[0]===1 && res[1]===2 && res[2]===3) ? null : 'Massiv noto\\'g\\'ri');"
    },
    {
      id: 10,
      title: "Sinxron blokirovkani qismlarga bo'lish (Chunking)",
      instruction: "Juda ko'p tsikl brauzerni qotirib qo'yishi mumkin. 1 dan N gacha sonlarni yig'uvchi, lekin buni asinxron ravishda (o'zini o'zi setTimeout orqali chaqirib) bo'lib-bo'lib (chunk) bajaruvchi funksiya namunasi berilgan, ushbu funksiya to'g'ri ishlashi va Promise ni resolve qilishi uchun uni to'ldiring.",
      startingCode: "function asyncSum(n) {\n  return new Promise(resolve => {\n    let sum = 0;\n    let i = 1;\n    function chunk() {\n      let count = 0;\n      // Har bir tsiklda faqat 10 martagacha yig'indi qo'shilsin\n      while(i <= n && count < 10) {\n        sum += i++;\n        count++;\n      }\n      if (i <= n) {\n        setTimeout(chunk, 0);\n      } else {\n        resolve(sum);\n      }\n    }\n    chunk();\n  });\n}\n",
      hint: "Faqat code to'g'ri ishlashini tekshirib setTimeout ga chunk callbackini bering.",
      test: "const sandbox = new Function(code + '; return asyncSum;');\nconst fn = sandbox();\nreturn fn(25).then(res => res === 325 ? null : 'Yig\\'indi xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript dasturlash tili tabiatan qanday ishlaydi?",
      options: [
        "Ko'p oqimli (Multi-threaded)",
        "Bir oqimli (Single-threaded)",
        "Parallel va faqat sinxron",
        "Faqat asinxron va oqimsiz"
      ],
      correctAnswer: 1,
      explanation: "JavaScript bir vaqtning o'zida faqat bitta vazifani bajarishga mo'ljallangan bir oqimli (single-threaded) tildir."
    },
    {
      id: 2,
      question: "Event Loop (Hodisalar sikli) ning asosiy vazifasi nima?",
      options: [
        "Kodni tezroq kompilyatsiya qilish",
        "Call Stack va Callback Queue-ni kuzatib, Stack bo'shagach navbatdagi kodni bajarish",
        "Massivlar bilan ishlashni tezlashtirish va keshga yozish",
        "Sahifadagi CSS stillarni yangilab turish"
      ],
      correctAnswer: 1,
      explanation: "Event Loop uzluksiz ravishda Call Stack-ni tekshiradi. Agar u bo'sh bo'lsa, navbatdagi asinxron vazifalarni Stack-ga o'tkazib beradi."
    },
    {
      id: 3,
      question: "Call Stack nima vazifani bajaradi?",
      options: [
        "Asinxron vaqtinchalik xotira sifatida ishlaydi",
        "Funksiyalar chaqiruvini (LIFO - Last In First Out tartibida) kuzatib boradi",
        "O'zgaruvchilarni global xotirada saqlaydi",
        "Sahifani qayta chizish tartibini belgilaydi"
      ],
      correctAnswer: 1,
      explanation: "Call Stack bajarilayotgan funksiyalar ketma-ketligini LIFO tamoyili asosida kuzatib boruvchi mexanizmdir."
    },
    {
      id: 4,
      question: "setTimeout(fn, 0) chaqirilganda nima sodir bo'ladi?",
      options: [
        "Funksiya zudlik bilan sinxron ravishda ishga tushadi",
        "Funksiya Web API-ga yuboriladi va Stack bo'shagandan so'ng bajariladi",
        "Funksiya mutlaqo ishlamaydi",
        "Butun Call Stack bloklanadi"
      ],
      correctAnswer: 1,
      explanation: "0 millisekund berilsa ham, setTimeout asinxron Web API hisoblanadi. U navbatga (Task Queue) qo'shiladi."
    },
    {
      id: 5,
      question: "Web API-lar (masalan, setTimeout, fetch) qayerda bajariladi?",
      options: [
        "Call Stack ichida",
        "Brauzer (yoki Node.js) muhitida parallel tarzda",
        "Callback Queue ichida",
        "Memory Heap xotirasida"
      ],
      correctAnswer: 1,
      explanation: "Web API lar brauzerning o'zi tomonidan fonda bajariladi, JS oqimini bloklamaydi."
    },
    {
      id: 6,
      question: "Call Stack va Callback Queue o'rtasidagi asosiy farq nima?",
      options: [
        "Stack sinxron kodlarni, Queue esa o'zgaruvchilarni saqlaydi",
        "Stack LIFO (oxirgi kirgan - birinchi chiqadi), Queue esa FIFO (birinchi kirgan - birinchi chiqadi) tamoyilida ishlaydi",
        "Queue sinxron, Stack asinxron ishlaydi",
        "Ular o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "Call Stack funksiyalar chaqiruvini ustma-ust yig'adi (LIFO), Queue esa asinxron vazifalarni navbat asosida (FIFO) saqlaydi."
    },
    {
      id: 7,
      question: "JavaScript dvigateli (Engine) tarkibida nimalar mavjud?",
      options: [
        "Faqat Event Loop",
        "Call Stack va Memory Heap",
        "Web API va Callback Queue",
        "DOM va CSSOM"
      ],
      correctAnswer: 1,
      explanation: "JS dvigatelining o'zi asosan Call Stack va Memory Heap dan iborat."
    },
    {
      id: 8,
      question: "Stack Starvation qanday holatda yuz berishi mumkin?",
      options: [
        "Juda ko'p setTimeout chaqirilsa",
        "Microtask Queue (masalan Promise) da cheksiz sikl hosil bo'lsa",
        "CSS render bo'lishi sekinlashsa",
        "Foydalanuvchi tez-tez chertganda"
      ],
      correctAnswer: 1,
      explanation: "Microtask Queue (Promise.then) har doim Macrotask lardan oldin bo'shatilishi kerak, shuning uchun cheksiz Microtask qotib qolishga (Starvation) olib keladi."
    },
    {
      id: 9,
      question: "Event Loop qachon Callback Queue-dagi vazifani Call Stack-ga o'tkazadi?",
      options: [
        "Vaqt tugashi bilan zudlik bilan",
        "Faqat Call Stack butunlay bo'sh bo'lgandagina",
        "Faqat foydalanuvchi harakat qilganida",
        "Istagan paytda parallel ravishda"
      ],
      correctAnswer: 1,
      explanation: "Call Stack butunlay bo'sh bo'lmaguncha, Callback Queue-dagi vazifa stack-ga o'tkazilmaydi."
    },
    {
      id: 10,
      question: "Microtask (Promise) va Macrotask (setTimeout) ishlash tartibi qanday?",
      options: [
        "Birinchi setTimeout, keyin Promise ishlaydi",
        "Sinxron koddan so'ng birinchi Microtask(Promise) va keyin Macrotask ishlaydi",
        "Ularning ishlash tartibi tasodifiy",
        "Ikkalasi ham bir vaqtda parallel ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Microtask Queue Macrotask Queue ga nisbatan yuqori ustuvorlikka (priority) ega."
    },
    {
      id: 11,
      question: "Node.js Event Loop'ining brauzerdan asosiy farqi nimada?",
      options: [
        "Node.js'da Event Loop yo'q",
        "U libuv kutubxonasiga asoslangan va bir necha bosqichlarga (phases) bo'lingan",
        "U faqat sinxron kod uchun ishlaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Node.js libuv orqali ishlaydi va uning Event Loop'i Timers, Poll, Check kabi alohida bosqichlarga bo'lingan."
    },
    {
      id: 12,
      question: "Renderlash (sahifani qayta chizish) uzluksiz bo'lishi uchun nima qilish kerak?",
      options: [
        "Barcha ishlarni Call Stack'da sinxron bajarish kerak",
        "Og'ir ishlarni Macrotask yoki Web Worker ga bo'lib berib, Call Stack'ni bo'sh saqlash kerak",
        "DOM ni mutlaqo o'zgartirmaslik kerak",
        "Faqat CSS dan foydalanish kerak"
      ],
      correctAnswer: 1,
      explanation: "Sahifa chizilishi (render) uchun Call Stack muntazam bo'shatilib turilishi kerak, shuning uchun og'ir ishlar asinxron (yoki Web Worker orqali) bo'linadi."
    }
  ]
};

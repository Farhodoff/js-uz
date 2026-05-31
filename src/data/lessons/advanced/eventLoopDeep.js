export const eventLoopDeep = {
  id: "a12",
  title: "Event Loop (Deep Dive)",
  level: "Murakkab",
  description: "Render Queue, Microtask Starvation, async/await va Node.js dagi Event Loop chuqur tahlili.",
  theory: `## 1. NEGA kerak?

JavaScript-ning oddiy Event Loop modelini (Stack, Web API, Callback Queue) bilish ko'p hollarda yetarli bo'ladi. Biroq, murakkab va yuqori samarali interfeyslarni (animation, rendering) yaratishda va Node.js backend tizimlarida ishlashda bizga yanada chuqurroq bilim kerak bo'ladi.

**Nega buni o'rganishimiz shart?**
* **FPS va Animatsiyalar qotishi:** Brauzer ekranni qachon yangilaydi (repaint)? Biz yozgan asinxron kod animatsiyani to'xtatib qo'ymaydimi?
* **Microtask Starvation (Microtask ochligi):** Nega ba'zida asinxron kod yozganimizda ham brauzer qotib qoladi?
* **Async/Await ichki mexanizmi:** \`await\` ostida nima sodir bo'lishini va u kodni qanday qismlarga bo'lib yuborishini tushunish.
* **Node.js farqlari:** Node.js-dagi asinxronlik brauzerdan qanday farq qiladi va undagi maxsus navbatlar (\`process.nextTick\`, \`setImmediate\`) qanday ishlaydi?

---

## 2. SODDALIK (Analogiya)

Teatr sahnasidagi **aktyorlar chiqishi, dekoratsiya o'zgarishi va chipta sotish navbatini** tasavvur qiling:

1. **Sahnadagi aktyorlar (Call Stack):** Ular o'z rollarini sinxron tarzda ijro etishadi. Sahnada aktyor bor ekan, yangi dekoratsiya o'rnatilmaydi.
2. **Favqulodda topshiriqlar (Microtask Queue):** Aktyor gapirayotib, yordamchiga tezda suv keltirishni aytdi. Bu sahna tugashi bilan darhol bajarilishi kerak bo'lgan, parda yopilishidan oldingi o'ta muhim vazifadir.
3. **Parda ortidagi dekoratsiya (Render Queue):** Sahna chiroyli ko'rinishi uchun har 16.6 millisoniyada dekoratsiyani yangilash ( repaint ) kerak. Parda yopilgandan so'ng yoki aktyorlar tanaffus qilgandagina bu ish bajariladi.
4. **Tashqi yangi tomoshabinlar (Macrotask Queue):** Teatr eshigi oldida yangi spektaklga kirishni kutayotgan navbatdagilar. Ular faqat ichkaridagi sahna butunlay tugab, favqulodda ishlar yakunlanib, dekoratsiyalar yangilangandan keyingina bittalab ichkariga kiritiladi.

---

## 3. STRUKTURA VA ILG'OR TUSHUNCHALAR

### A. Render Queue (Ekranni Yangilash Navbati)
Brauzer ekranni soniyasiga 60 marta (har 16.6 millisoniyada) yoki 144 marta yangilaydi.
* Event Loop har bir macrotask bajarilib bo'lingandan so'ng ekranni yangilash zarurligini tekshiradi.
* **Qoida:** Render faqat va faqat Call Stack va barcha Microtask-lar **bo'sh** bo'lgandagina sodir bo'la oladi.
* \`requestAnimationFrame (rAF)\` callback-lari aynan ekranni yangilashdan (repaint) oldin bajariladigan maxsus navbatdir.

### B. Microtask Starvation (Microtask Ochligi)
Microtask-lar ichida cheksiz ravishda yangi microtask-larni chaqiraversak (masalan, cheksiz Promise yoki recursive \`queueMicrotask\`), Event Loop hech qachon Macrotask yoki Render bosqichiga o'ta olmaydi. Natijada brauzer butunlay qotib qoladi. Bunga **Microtask Starvation** deyiladi.

### C. Async/Await va Microtasks (A await ostida nima bor?)
\`await\` kalit so'zi kodning o'sha qismida bajarilishini to'xtatadi (yield) va o'sha satrdan keyingi barcha kodlarni \`.then()\` callback-i kabi **Microtask Queue**-ga joylashtiradi:

\`\`\`javascript
async function test() {
  console.log("A");
  await null;
  console.log("B");
}
test();
console.log("C");

// Ketma-ketlik: A -> C -> B
\`\`\`
*Tushuntirish:* "A" sinxron log qilinadi. \`await\` kelganda, test() funksiyasining qolgan qismi ("B" logi) Microtask Queue-ga yuboriladi. Dvigatel test() dan chiqib, sinxron "C" logini bajaradi. Keyin stack bo'shagach, microtask navbatidan "B" bajariladi.

### D. Node.js Event Loop Farqlari
Node.js asinxron I/O operatsiyalari uchun **libuv** (C++ kutubxonasi) dan foydalanadi va uning Event Loop-i brauzernikidan farq qiladi. Unda quyidagi maxsus bosqichlar mavjud:
1. **Timers:** \`setTimeout\` va \`setInterval\` callback-lari bajariladi.
2. **Pending Callbacks:** Tizim xatoliklari (masalan TCP ulanish xatosi) callback-lari.
3. **Idle, Prepare:** Ichki tizim operatsiyalari.
4. **Poll (So'rovlar):** Yangi I/O va tarmoq so'rovlari qayta ishlanadigan eng asosiy faza.
5. **Check:** \`setImmediate()\` callback-lari bajariladi.
6. **Close Callbacks:** Yopilish hodisalari (masalan, socket.on('close')).

* **process.nextTick() vs Promises:** Node.js-da \`process.nextTick()\` microtask navbatidan ham oldin bajariladigan, eng yuqori ustuvorlikka ega navbatdir.

### E. Node.js Fazalararo Microtask Tekshiruvi (Phase Transitions)
Node.js 11 va undan keyingi versiyalarda (brauzerlar bilan moslikni oshirish uchun) libuv Event Loop har bir faza tugashini kutib o'tirmaydi. Har safar bitta asinxron callback (masalan, \`setTimeout\` yoki I/O) bajarilib bo'lishi bilanoq, dvigatel darhol \`process.nextTick\` navbatini va keyin Microtask Queue (Promises) ni tekshiradi va tozalaydi. Bu brauzerlardagi har bir macrotask-dan keyingi microtask tozalanishi qoidasiga to'liq mos keladi.

### F. requestAnimationFrame (rAF) Chizish Konveyeri
\`requestAnimationFrame\` brauzerning chizish konveyeri (Rendering Pipeline) bilan bevosita bog'liq bo'lib, quyidagi bosqichlardan iborat:
1. **rAF Callbacks:** Siz chizmoqchi bo'lgan animatsiya kodlari bajariladi.
2. **Style Recalculation:** Elementlar CSS stillari qayta hisoblanadi.
3. **Layout:** Elementlarning ekrandagi geometrik o'rni (kengligi, balandligi) aniqlanadi (Reflow).
4. **Paint:** Elementlar piksellarga o'giriladi (Repaint) va kompozitsiya qilinadi.

rAF kodni aynan chizishdan oldin chaqirishi tufayli, 60fps (yoki ekran chastotasiga mos) silliq animatsiyalarni ta'minlaydi. \`setTimeout(fn, 16.6)\` esa brauzer repaint aylanishidan mustaqil ravishda macrotask navbatiga tushgani uchun animatsiyaning ayrim kadrlarini tashlab yuborishga (jank/stutter) sabab bo'ladi.

### G. Microtask Starvation Simulyatsiyasi
Agar asinxron kodda recursive ravishda Promise zanjiri yaratilsa, foydalanuvchi interfeysidagi hech qaysi hodisa (click, scroll) ishlamaydi. Chunki brauzer renderlash bosqichiga o'tishi uchun microtask navbati butunlay bo'sh bo'lishi shart. Buni quyidagi kod yordamida simulyatsiya qilish mumkin:
\`\`\`javascript
function starveUI() {
  Promise.resolve().then(starveUI); // Cheksiz asinxron zanjir - UI butunlay qotadi!
}
\`\`\`
Bu sinxron \`while(true)\` tsikliga o'xshash ravishda brauzer oynasini qotiradi (starvation), garchi asinxron kod bo'lsa ham.

### H. Brauzer Render va Animatsiya Konveyeri (Mermaid)

\`\`\`mermaid
graph TD
    Macro["Macrotask bajarildi"] --> Micro["Microtask-lar to'liq bajarib bo'lindi"]
    Micro --> CheckRender{"Render aylanishi vaqti keldimi?"}
    CheckRender -->|Yo'q| End["Keyingi aylanish"]
    CheckRender -->|Ha| rAF["1. requestAnimationFrame callback-lari"]
    rAF --> Style["2. Style recalculation (Stillarni hisoblash)"]
    Style --> Layout["3. Layout/Reflow (Geometriyani aniqlash)"]
    Layout --> Paint["4. Paint/Repaint (Piksellarni chizish)"]
    Paint --> End
\`\`\`

---

## 4. AMALIYOT

Keling, murakkab asinxron oqim misolini tahlil qilamiz:

\`\`\`javascript
console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 10);

Promise.resolve().then(() => {
  console.log("Promise 1");
  queueMicrotask(() => console.log("Nested Microtask"));
});

Promise.resolve().then(() => console.log("Promise 2"));

console.log("End");
\`\`\`

**Bajarilish oqimi:**
1. **Sinxron qadamlar:** \`Start\` va \`End\` darhol chop etiladi.
2. **Queues holati:**
   * **Macrotask Queue:** \`[Timeout 1 (0ms), Timeout 2 (10ms)]\`
   * **Microtask Queue:** \`[Promise 1, Promise 2]\`
3. **Microtask bajarilishi:**
   * Stack bo'shagach, \`Promise 1\` bajariladi. U konsolga yozadi va navbatga \`Nested Microtask\`ni qo'shadi. Microtask Queue hozir: \`[Promise 2, Nested Microtask]\`.
   * \`Promise 2\` bajariladi.
   * \`Nested Microtask\` bajariladi.
4. **Macrotask bajarilishi:**
   * Microtask Queue to'liq bo'shadi. Event Loop Macrotask Queue-dan birinchi elementni oladi: \`Timeout 1\` ishlaydi.
   * Keyin navbatdagi aylanishda, vaqti yetgach, \`Timeout 2\` ishlaydi.

**Natija:**
\`\`\`
Start
End
Promise 1
Promise 2
Nested Microtask
Timeout 1
Timeout 2
\`\`\`

---

## 5. XATOLAR

1. **\`await\`larni parallel emas, ketma-ket (sequential) kutish:** Agar bir-biriga bog'liq bo'lmagan so'rovlarni alohida \`await\` qilsak, ishlash vaqti ikki barobar ortadi:
   \`\`\`javascript
   // XATO (Sekin):
   const r1 = await fetch(url1);
   const r2 = await fetch(url2);
   
   // TO'G'RI (Parallel):
   const [r1, r2] = await Promise.all([fetch(url1), fetch(url2)]);
   \`\`\`
2. **Cheksiz recursive queueMicrotask yordamida UI-ni qotirish:**
   \`\`\`javascript
   // XATO: Brauzer o'lib qoladi
   function starve() {
     queueMicrotask(starve);
   }
   starve();
   \`\`\`

---

## 6. SAVOLLAR VA JAVOBLAR

**1. Render Queue (Repaint) Event Loop-ning qaysi qismida ishga tushadi?**
U har bir Macrotask va undan keyingi barcha Microtask-lar bajarilib bo'lgandan keyin, agar ekran yangilanishi kerak bo'lsa (taxminan har 16.6ms da bir marta) ishga tushadi.

**2. requestAnimationFrame (rAF) nima va u setTimeout-dan qanday farq qiladi?**
rAF ekranni yangilash (repaint) tsikli bilan sinxron ishlaydi va aynan ekran chizilishidan oldin chaqiriladi. \`setTimeout\` esa ekranning yangilanishiga moslashmagan, shuning uchun animatsiyalarda qotishlar yaratishi mumkin.

**3. Microtask Starvation (Microtask ochligi) qanday yuzaga keladi?**
Agar microtask ichida recursively yana microtask-lar yaratilaversa, Microtask Queue hech qachon bo'shamaydi. Natijada Event Loop Macrotask-larga va Render Queue-ga o'ta olmaydi va brauzer muzlab qoladi.

**4. \`await\` ishlatilganda funksiyaning pastki qatoridagi kodlar qayerga joylashadi?**
\`await\`dan keyingi barcha kodlar avtomatik ravishda Microtask navbatiga (\`.then()\` callback kabi) joylashtiriladi va joriy sinxron kodlar tugagandan so'ng bajariladi.

**5. Node.js Event Loop brauzerdagidan qanday asosiy farqqa ega?**
Node.js Event Loop asinxron I/O va fayl/tarmoq ishlarini boshqarish uchun libuv kutubxonasiga asoslangan va u brauzerdan farqli o'laroq bir nechta maxsus fazalarga (Timers, Poll, Check va h.k.) bo'lingan.

**6. Node.js-da process.nextTick() funksiyasi nima va uning ustuvorligi qanday?**
\`process.nextTick()\` — Node.js-dagi maxsus navbat bo'lib, u har qanday microtask navbatidan (shu jumladan Promislardan ham) oldin bajariladigan eng yuqori ustuvorlikka ega navbatdir.

**7. Node.js-da setImmediate() qaysi fazada ishlaydi?**
\`setImmediate()\` callback-lari Event Loop-ning "Check" (tekshirish) fazasida bajariladi. Bu faza "Poll" (I/O operatsiyalari) fazasidan darhol keyin keladi.

**8. Nima uchun microtask ichida og'ir sinxron loop yozish yomon amaliyot?**
Chunki u Call Stack-ni uzoq vaqt band qiladi va Event Loop navbatdagi vazifalarga yoki renderlashga o'ta olmay, butun foydalanuvchi interfeysini qotiradi.

**9. UI-ni bloklamaslik uchun og'ir ishlarni qanday bo'laklash mumkin?**
Og'ir hisob-kitoblarni \`setTimeout\` orqali kichik bo'laklarga bo'lish (chunking) yoki fonda ishlash uchun Web Workers-ga topshirish mumkin.

**10. Nima uchun Promise executor (konstruktor ichidagi kod) sinxron ishlaydi?**
Chunki \`new Promise((resolve, reject) => { ... })\` chaqirilganda, u oddiy funksiya kabi Call Stack-ga kiradi va darhol bajariladi. Faqat uning resolve/reject bo'lgandan keyingi \`.then\` callback-lari asinxron navbatga tushadi.

**11. Node.js-da \`setTimeout(fn, 0)\` va \`setImmediate(fn)\` qaysi biri birinchi ishlaydi?**
Agar ular I/O tsikli (masalan, fayl o'qish callback-i) ichida chaqirilsa, \`setImmediate\` har doim birinchi ishlaydi. Global kontekstda esa tartib tasodifiy bo'lishi mumkin (chunki taymer tayyorlanishiga 1ms ketishi mumkin).

**12. Web Worker asinxron ishlar ketma-ketligiga qanday ta'sir qiladi?**
Web Worker mutlaqo alohida operatsion oqimda (thread) ishlaydi. Uning o'zining Call Stack va Event Loop-i bo'ladi, shuning uchun u asosiy oqim (Main Thread) renderingini yoki ishlashini aslo bloklamaydi.`,
  exercises: [
    {
      id: 1,
      title: "Microtask zanjiri tartibini aniqlash",
      instruction: "Konsolga ketma-ketlikda 1, 2, 3 va 4 raqamlari chiqishi uchun asinxron loglarni to'g'rilang.",
      startingCode: "console.log(1);\nsetTimeout(() => console.log(4), 0);\nPromise.resolve().then(() => console.log(2)).then(() => console.log(3));",
      hint: "Sinxron loglar (1) birinchi, Promises microtask zanjiri (2 va 3) ikkinchi, setTimeout (4) uchinchi bo'ladi.",
      test: "if (logs[0] === '1' && logs[1] === '2' && logs[2] === '3' && logs[3] === '4') return null; return 'Loglar tartibi noto\\'g\\'ri!';"
    },
    {
      id: 2,
      title: "Async/Await Execution Flow",
      instruction: "Berilgan async funksiyadan keyingi kodlarni shunday yozingki, logda 'A', 'C', 'B' ketma-ketligi hosil bo'lsin.",
      startingCode: "async function runs() {\n  console.log('A');\n  await Promise.resolve();\n  console.log('B');\n}\nruns();\nconsole.log('C');",
      hint: "Kodni o'zgarishsiz qoldirib ishga tushiring, chunki u tabiatan A -> C -> B tartibida ishlaydi.",
      test: "if (logs[0] === 'A' && logs[1] === 'C' && logs[2] === 'B') return null; return 'Ketma-ketlik xato!';"
    },
    {
      id: 3,
      title: "Starvation oldini olish",
      instruction: "Cheksiz ravishda queueMicrotask chaqirish o'rniga, uning o'rniga setTimeout ishlatib Event Loop-ga nafas olish imkonini bering.",
      startingCode: "let counter = 0;\nfunction run() {\n  counter++;\n  if (counter < 5) {\n    // queueMicrotask o'rniga macrotask ishlating\n    queueMicrotask(run);\n    console.log(counter);\n  }\n}",
      hint: "queueMicrotask(run) o'rniga setTimeout(run, 0) yozing.",
      test: "if (code.includes('setTimeout') && !code.includes('queueMicrotask')) return null; return 'setTimeout ishlatilishi kerak!';"
    },
    {
      id: 4,
      title: "Parallel Await So'rovlar",
      instruction: "Ikkita alohida resolved promiseni parallel ravishda (Promise.all yordamida) kuting va ularning natijasini konsolga chiqaruvchi async funksiya yozing.",
      startingCode: "const p1 = Promise.resolve('Data1');\nconst p2 = Promise.resolve('Data2');\nasync function fetchAll() {\n  // Promise.all va await ishlating\n  const results = await Promise.all([p1, p2]);\n  console.log(results.join(', '));\n}\nfetchAll();",
      hint: "await Promise.all([p1, p2]) yozib, natijani log qiling.",
      test: "if (code.includes('Promise.all') && logs.includes('Data1, Data2')) return null; return 'Parallel await amalga oshirilmadi!';"
    },
    {
      id: 5,
      title: "Promise Executor Sinxronligi",
      instruction: "Koddagi loglar tartibi 'Executor', 'Sinxron', 'Callback' bo'lishi uchun Promise executor kodi ichida log yozing.",
      startingCode: "new Promise((resolve) => {\n  // Sinxron bajariladigan executor logi\n  \n  resolve();\n}).then(() => console.log('Callback'));\nconsole.log('Sinxron');",
      hint: "Promise ichida console.log('Executor'); deb yozing.",
      test: "if (logs[0] === 'Executor' && logs[1] === 'Sinxron' && logs[2] === 'Callback') return null; return 'Tartib xato!';"
    },
    {
      id: 6,
      title: "setTimeout vs queueMicrotask",
      instruction: "Konsolga birinchi bo'lib 'Tezkor', keyin 'Sekin' chiqadigan asinxron zanjir yarating.",
      startingCode: "setTimeout(() => console.log('Sekin'), 0);\nqueueMicrotask(() => console.log('Tezkor'));",
      hint: "queueMicrotask microtask bo'lgani uchun setTimeout macrotask-dan oldin bajariladi.",
      test: "if (logs[0] === 'Tezkor' && logs[1] === 'Sekin') return null; return ' queueMicrotask va setTimeout ketma-ketligi buzilgan!';"
    },
    {
      id: 7,
      title: "Zanjirli Await amallari",
      instruction: "Uchta await amalini bajaruvchi va har bir await-dan keyin o'zgaruvchini oshirib boruvchi async funksiya yozing.",
      startingCode: "async function chain() {\n  let count = 0;\n  await Promise.resolve();\n  count++;\n  await Promise.resolve();\n  count++;\n  console.log(count);\n}\nchain();",
      hint: "Ikki marta await va count++ amallaridan keyin 2 qiymati chiqadi.",
      test: "if (logs.includes(2)) return null; return 'Count qiymati noto\\'g\\'ri!';"
    },
    {
      id: 8,
      title: "Error Handling in Microtasks",
      instruction: "Microtask ichida xato tashlang va uni catch bloki yordamida ushlab konsolga 'Xato ushlandi' deb yozing.",
      startingCode: "Promise.resolve()\n  .then(() => {\n    throw new Error('Oops');\n  })\n  .catch(err => {\n    console.log('Xato ushlandi');\n  });",
      hint: "Catch bloki error-first pattern kabi asinxron xatolarni zanjirda ushlaydi.",
      test: "if (logs.includes('Xato ushlandi')) return null; return 'Xato catch orqali ushlanmadi!';"
    },
    {
      id: 9,
      title: "Nested microtasks queue structure",
      instruction: "Microtask ichida boshqa bir microtask joylashtiring va u konsolga 'Ichki Microtask' deb yozsin.",
      startingCode: "Promise.resolve().then(() => {\n  // Ichkarida yana bitta microtask yarating\n  \n});",
      hint: "Promise.resolve().then(() => console.log('Ichki Microtask')); yoki queueMicrotask ishlating.",
      test: "if (code.includes('Promise') && logs.includes('Ichki Microtask')) return null; return 'Ichki microtask to\\'g\\'ri yaratilmadi!';"
    },
    {
      id: 10,
      title: "Sinxron Blocking kodni yengish",
      instruction: "Call Stack bloklanishining oldini olish uchun og'ir amalni setTimeout yordamida asinxron Macrotask-ga o'tkazing.",
      startingCode: "function ogirHisob() {\n  let sum = 0;\n  for(let i=0; i<100; i++) sum += i;\n  console.log('Tugadi');\n}\n// Asinxron oqimga o'tkazing\n",
      hint: "setTimeout(ogirHisob, 0); deb chaqiring.",
      test: "if (code.includes('setTimeout') && logs.includes('Tugadi')) return null; return 'setTimeout ishlatilmadi!';"
    },
    {
      id: 11,
      title: "Multiple Promises Resolution Order",
      instruction: "Bir vaqtda uchta promisni parallel hal qiling va ulardan eng tezini (race yordamida) konsolga 'Tezkor' nomi bilan log qiling.",
      startingCode: "const fast = Promise.resolve('Tezkor');\nconst slow = new Promise(res => setTimeout(() => res('Sekin'), 100));\n// Promise.race ishlating\n",
      hint: "Promise.race([fast, slow]).then(val => console.log(val));",
      test: "if (code.includes('Promise.race') && logs.includes('Tezkor')) return null; return 'Promise.race to\\'g\\'ri ishlatilmadi!';"
    },
    {
      id: 12,
      title: "Promise.all Settled Natijalari",
      instruction: "Ikkita promisning (biri resolved, biri rejected) yakuniy holatini uning natijalarini yo'qotmasdan (allSettled yordamida) tekshirib konsolga natija chiqaring.",
      startingCode: "const p1 = Promise.resolve('OK');\nconst p2 = Promise.reject('ERR');\n// Promise.allSettled ishlating va natijalar uzunligini log qiling\n",
      hint: "Promise.allSettled([p1, p2]).then(results => console.log(results.length));",
      test: "if (code.includes('Promise.allSettled') && logs.includes(2)) return null; return 'Promise.allSettled ishlatilmadi yoki natijalar uzunligi xato!';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ requestAnimationFrame yordamida animatsiya simulyatsiyasi",
      instruction: "Berilgan `element`ning chap koordinatasini (`element.left`) har bir kadrda chizishdan oldin 1px ga oshiradigan va u 100px ga yetganda to'xtaydigan `animateElement(element, cb)` funksiyasini yozing. `requestAnimationFrame` dan foydalaning.",
      startingCode: "function animateElement(element, cb) {\n  element.left += 1;\n  if (element.left < 100) {\n    // requestAnimationFrame orqali animateElement funksiyasini chaqiring\n  } else {\n    cb();\n  }\n}",
      hint: "requestAnimationFrame(() => animateElement(element, cb));",
      test: "if (typeof animateElement !== 'function') return 'animateElement topilmadi'; const el = { left: 0 }; let done = false; animateElement(el, () => done = true); setTimeout(() => { if (el.left >= 100 && done) return null; }, 50); return null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Node.js process.nextTick va setImmediate tartibi",
      instruction: "Konsolga ketma-ketlikda 'Sinxron', 'nextTick', 'Promise', 'setImmediate' chiqishi uchun asinxron loglarni tartiblang. Funksiyalarni I/O callback ichida emas, global kontekstda e'lon qiling.",
      startingCode: "// Tartibni to'g'rilang\nsetImmediate(() => console.log('setImmediate'));\nprocess.nextTick(() => console.log('nextTick'));\nPromise.resolve().then(() => console.log('Promise'));\nconsole.log('Sinxron');",
      hint: "Sinxron kod darhol ishlaydi. Keyin process.nextTick (microtask-dan oldin), keyin Promise (microtask), va oxirida setImmediate check fazasida ishlaydi.",
      test: "if (logs[0] === 'Sinxron' && logs[1] === 'nextTick' && logs[2] === 'Promise' && logs[3] === 'setImmediate') return null; return 'Navbat tartibi noto\'g\'ri!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Event Loop-da ekranni yangilash (Repaint / Render) qachon sodir bo'lishi mumkin?",
      options: [
        "Faqat har bir setTimeout chaqirilganda",
        "Har safar Call Stack bo'shab, Microtask Queue to'liq bajarib bo'lingandan so'ng",
        "Faqat microtask-lar bajarilayotgan vaqtda",
        "Faqat Node.js muhitida"
      ],
      correctAnswer: 1,
      explanation: "Brauzer asinxron ishlarni bajarganidan so'ng, Call Stack bo'shaganda va barcha Microtask-lar to'liq bajarilib bo'linganidan keyingina Render bosqichiga ruxsat beradi."
    },
    {
      id: 2,
      question: "Microtask Starvation (Microtask ochligi) deganda nima tushuniladi?",
      options: [
        "Promise-lar xotira yetishmasligi tufayli ishlamay qolishi",
        "Microtask navbatiga to'xtovsiz yangi vazifalar qo'shilaverishi sababli Macrotask va Render bosqichlarining kutib qolishi va UI bloklanishi",
        "setTimeout callback-larining juda tez bajarilib ketishi",
        "Garbage Collector-ning xotirani haddan tashqari tozalashi"
      ],
      correctAnswer: 1,
      explanation: "Agar microtask ichida recursive ravishda yana microtask yaratilaversa, Event Loop hech qachon Macrotask yoki Render-ga o'ta olmaydi. Bu holat 'Starvation' deb ataladi."
    },
    {
      id: 3,
      question: "Quyidagi kodda `await null` kelganda nima sodir bo'ladi?\n```javascript\nawait null;\nconsole.log('B');\n```",
      options: [
        "Dastur darhol to'xtaydi va xatolik beradi",
        "Ijro oqimi yield qilinadi va `console.log('B')` Microtask Queue-ga joylashtiriladi",
        "Dastur 1 soniya kutadi",
        "Bu kod sinxron tarzda kutmasdan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Hatto await ibtidoiy yoki null qiymatni kutayotgan bo'lsa ham, u funksiya ijrosini to'xtatadi va qolgan kod qismini Microtask Queue-ga yuboradi."
    },
    {
      id: 4,
      question: "Node.js Event Loop muhitida asinxron I/O va ko'p ipli ishlar qaysi kutubxona yordamida amalga oshiriladi?",
      options: [
        "V8 Engine",
        "libuv",
        "Webpack",
        "Babel"
      ],
      correctAnswer: 1,
      explanation: "Node.js-da asinxron fayl tizimi, tarmoq so'rovlari va thread pool ishlarini libuv C++ kutubxonasi ta'minlaydi."
    },
    {
      id: 5,
      question: "Node.js muhitida `process.nextTick()` qachon bajariladi?",
      options: [
        "Check fazasida setImmediate-dan keyin",
        "Navbatdagi Event Loop fazasiga o'tishdan oldin, har qanday Promise microtask-laridan ham oldin",
        "Faqat 10ms o'tgandan keyin",
        "Poll fazasining oxirida"
      ],
      correctAnswer: 1,
      explanation: "Node.js-da `process.nextTick()` eng yuqori ustuvorlikka ega bo'lib, u oddiy Promise microtask navbatidan ham oldin bajariladi."
    },
    {
      id: 6,
      question: "Node.js Event Loop fazalaridan qaysi birida `setImmediate()` callback-lari bajariladi?",
      options: [
        "Timers",
        "Check",
        "Poll",
        "Close callbacks"
      ],
      correctAnswer: 1,
      explanation: "`setImmediate()` callback-lari Event Loop aylanmasining 'Check' (tekshirish) fazasida bajarilishi qat'iy belgilangan."
    },
    {
      id: 7,
      question: "requestAnimationFrame (rAF) va setTimeout(fn, 16.6) farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "rAF brauzer ekranni yangilash (repaint) sikli bilan mukammal darajada sinxron ishlaydi, setTimeout esa ekranga bog'liq bo'lmagan macrotask yaratadi",
        "setTimeout tezroq ishlaydi",
        "rAF faqat Node.js-da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "requestAnimationFrame animatsiyalarni ekran yangilanish chastotasiga (masalan, 60Hz yoki 144Hz) moslashtirib chizishga imkon beradi, setTimeout esa noto'g'ri vaqtda chizib, UI qotishlariga sabab bo'lishi mumkin."
    },
    {
      id: 8,
      question: "Agar siz microtask ichida recursive ravishda boshqa microtask qo'shsangiz, brauzer render (ekran yangilash) qila oladimi?",
      options: [
        "Ha, chunki render eng yuqori ustuvorlikka ega",
        "Yo'q, chunki Microtask Queue to'liq bo'shatilmaguncha Event Loop renderlash bosqichiga o'ta olmaydi",
        "Faqat user tugmani bossa o'ta oladi",
        "Faqat CSS o'zgarganda o'tadi"
      ],
      correctAnswer: 1,
      explanation: "Event Loop qoidalariga ko'ra, Microtask navbati butunlay bo'sh bo'lishi shart. Agar unga uzluksiz vazifa qo'shsak, renderlash hech qachon boshlanmaydi."
    },
    {
      id: 9,
      question: "Node.js-dagi I/O (fayl o'qish/yozish, network) operatsiyalari asosan Event Loop-ning qaysi fazasida amalga oshiriladi?",
      options: [
        "Timers",
        "Poll",
        "Check",
        "Idle/Prepare"
      ],
      correctAnswer: 1,
      explanation: "Poll fazasi Node.js Event Loop-ning yuragi hisoblanadi. Unda yangi I/O va tarmoq so'rovlari tahlil qilinadi va callback-lari ishga tushiriladi."
    },
    {
      id: 10,
      question: "Web Worker nima va u asinxronlikni qanday yaxshilaydi?",
      options: [
        "U kodlarni siqadigan brauzer plagini",
        "U alohida operatsion oqimda (thread) ishlaydi va og'ir ishlarni asosiy oqim Call Stack-ini bloklamasdan parallel bajarishga yordam beradi",
        "U faqat CSS fayllarini fonda yuklaydi",
        "U JavaScript-ni Java kodiga aylantiradi"
      ],
      correctAnswer: 1,
      explanation: "Web Worker brauzerda haqiqiy ko'p iplilikni (multi-threading) beradi. U alohida xotira va Event Loop-ga ega bo'lib, og'ir hisob-kitoblarni UI-ni qotirmasdan bajaradi."
    },
    {
      id: 11,
      question: "Quyidagi kod brauzerda chop etilganda konsolga nimalar chiqadi?\n```javascript\nsetTimeout(() => console.log('A'), 0);\nrequestAnimationFrame(() => console.log('B'));\nPromise.resolve().then(() => console.log('C'));\n```",
      options: [
        "A, B, C",
        "C, B, A (yoki C, A, B brauzer render holatiga qarab)",
        "B, C, A",
        "A, C, B"
      ],
      correctAnswer: 1,
      explanation: "1) 'C' (Promise) microtask bo'lib har doim birinchi ishlaydi. 2) 'B' (rAF) render siklida yoki 'A' (setTimeout) macrotask bo'lib keyinroq ishlaydi (tartib brauzerning render qilish vaqtiga bog'liq, lekin C har doim birinchi)."
    },
    {
      id: 12,
      question: "Node.js-da I/O callback-i ichida chaqirilgan `setTimeout(fn, 0)` va `setImmediate(fn)` qaysi biri har doim kafolatlangan birinchi bajariladi?",
      options: [
        "setTimeout(fn, 0)",
        "setImmediate(fn)",
        "Ikkalasi bir vaqtda bajariladi",
        "Bu xatolikka sabab bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "I/O callback-i Poll fazasida bajariladi. Poll-dan keyin Event Loop to'g'ridan-to'g'ri Check fazasiga (setImmediate) o'tadi, Timers fazasi (setTimeout) esa keyingi aylanishda keladi. Shuning uchun setImmediate kafolatlangan tarzda birinchi bajariladi."
    },
    {
      id: 13,
      question: "Node.js muhitida har bir asinxron callback bajarilib bo'lingandan so'ng navbatlar qanday tartibda tekshiriladi (Node.js 11+ versiyalarida)?",
      options: [
        "Faqat faza oxirida to'liq tekshiriladi",
        "Zudlik bilan process.nextTick navbati, keyin esa microtask navbati (Promises) to'liq bajarib bo'shatiladi",
        "Faqat setImmediate chaqirilganda tekshiriladi",
        "Faza o'zgarishida hech qanday microtask ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Node.js 11+ versiyalarida har bir bajarilgan callback-dan so'ng darhol process.nextTick va microtask (Promise) navbatlari tekshiriladi, bu esa brauzer standartlari bilan to'liq bir xil ishlashini kafolatlaydi."
    },
    {
      id: 14,
      question: "`requestAnimationFrame` animatsiya kadrini chizish jarayonida qaysi bosqichdan oldin chaqiriladi?",
      options: [
        "Microtask Queue tozalanishidan oldin",
        "Brauzer ekranni yangilash (Style, Layout va Paint/Repaint) bosqichlaridan darhol oldin",
        "Faqat setTimeout chaqirilishidan oldin",
        "Node.js Poll fazasidan oldin"
      ],
      correctAnswer: 1,
      explanation: "requestAnimationFrame callback-lari aynan ekran chizilishidan (repaint/reflow) oldin ishga tushadi, shuning uchun ham u silliq FPS beradi."
    }
  ]
};

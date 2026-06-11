export const eventLoopDeep = {
  id: "eventLoopDeep",
  title: "Event Loop chuqur tahlili va Microtasks/Macrotasks",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Microtasks va Macrotasks nima?
Event Loop ishlashini sodda tushunganimizdan so'ng, asinxron vazifalar ham o'z ichida ikki xil turga bo'linishini bilishimiz lozim:
1. **Macrotask (yoki shunchaki Task):** Bu brauzer yoki Node.js tomonidan rejalashtiriladigan yirikroq asinxron vazifalar (masalan: \`setTimeout\`, \`setInterval\`, I/O operatsiyalari, foydalanuvchi kliklari).
2. **Microtask (yoki Job):** Bular to'g'ridan-to'g'ri JavaScript kodi ichidan kelib chiquvchi, o'ta yuqori ustuvorlikka ega bo'lgan kichik vazifalar (masalan: \`Promise.then/catch/finally\`, \`queueMicrotask\`, \`MutationObserver\`).

### Real hayotiy analogiya
Tasavvur qiling, siz **bank kassirisiz**:
* **Macrotasks (Tashqaridagi navbat):** Bank eshigi oldida turgan mijozlar. Ularning har biri bittadan kelib, o'z pul amallarini bajaradi (bitta macrotask).
* **Microtasks (Kassa oldidagi shoshilinch ishlar):** Birinchi mijoz kassaga keldi (macrotask boshlandi). U pulini o'tkazdi va kassirdan kvitansiyani muhrlab berishni so'radi. Kassir mijozga javob berayotganida, mijoz: "Voy, shoshilmang, yana bitta to'lovim bor edi, shuni ham qo'shib yubora olasizmi?" dedi (microtask yaratildi). Kassir navbatdagi tashqaridagi mijozni chaqirishdan oldin, kassa oldida turgan joriy mijozning barcha qo'shimcha mayda iltimoslarini (barcha microtask-larni) bajarib bo'lishi shart.
* **Rendering (Hujjatlarni tartiblash):** Kassa oldida hech kim qolmaganidan so'ng (stack va microtask-lar bo'shagach), kassir stolidagi qog'ozlarni tartiblab joyiga qo'yadi (UI chiziladi). Keyin navbatdagi tashqaridagi mijoz chaqiriladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Ustuvorlikni solishtirish)
\`\`\`javascript
console.log("1. Sinxron");

setTimeout(() => {
  console.log("2. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("4. Sinxron tugadi");

// Natija:
// 1. Sinxron
// 4. Sinxron tugadi
// 3. Microtask (Promise)
// 2. Macrotask (setTimeout)
\`\`\`

### 2. Intermediate Example (queueMicrotask ishlatilishi)
\`queueMicrotask\` yordamida Promise yaratmasdan kodni microtask-ga qo'shish:
\`\`\`javascript
console.log("Start");

queueMicrotask(() => {
  console.log("Microtask 1");
  queueMicrotask(() => {
    console.log("Ichki Microtask 1.1");
  });
});

setTimeout(() => {
  console.log("Macrotask (setTimeout)");
}, 0);

console.log("End");

// Natija:
// Start
// End
// Microtask 1
// Ichki Microtask 1.1 (Macrotask-dan oldin bajariladi, chunki u ham microtask zanjiri)
// Macrotask (setTimeout)
\`\`\`

### 3. Advanced Example (Promise konstruktori va Await ketma-ketligi)
\`\`\`javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

async function asyncFn() {
  console.log("3");
  await Promise.resolve(); // Await-dan keyingi barcha kodlar microtask-ga aylanadi
  console.log("4");
}

new Promise((resolve) => {
  console.log("5"); // Promise executor sinxron ishlaydi
  resolve();
}).then(() => {
  console.log("6");
});

asyncFn();

console.log("7");

// Bajarilish tartibi:
// 1. console.log("1") -> Ekranga: 1
// 2. setTimeout -> Web API orqali Macrotask queue-ga.
// 3. new Promise executor ishlaydi -> Ekranga: 5. \`.then()\` callback-i Microtask queue-ga [6].
// 4. asyncFn() chaqiriladi -> Ekranga: 3. Await-dan keyingi kod Microtask queue-ga [6, 4].
// 5. console.log("7") -> Ekranga: 7
// 6. Sinxron oqim tugadi. Stack bo'sh. Microtask-lar navbati bajariladi:
//    - Birinchi microtask [6] -> Ekranga: 6
//    - Ikkinchi microtask [4] -> Ekranga: 4
// 7. Microtask navbati bo'shadi. Keyingi macrotask [2] bajariladi -> Ekranga: 2
// Yakuniy Natija: 1, 5, 3, 7, 6, 4, 2
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Harakatlar tartibini kafolatlash:** Ba'zida bizga ma'lum bir kod sinxron koddan keyin, lekin sahifa qayta chizilishidan va yangi kliklar eshitilishidan oldin ishlashi shart bo'ladi. Microtask-lar bunga 100% kafolat beradi.
* **UI Barqarorligi:** Agar biz asinxron vazifani macrotask (masalan \`setTimeout\`) orqali bajarsak, brauzer oraliqda sahifani qayta chizib yuborishi mumkin. Bu ekranda elementlarning "miltillab" (flickering) ko'rinishiga olib keladi. Microtask-da bajarilgan o'zgarishlar esa vizual renderdan oldin yakunlanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`new Promise()\` ichidagi kod asinxron ishlaydi deb o'ylash
#### Xato:
\`\`\`javascript
new Promise((resolve) => {
  heavyComputation(); // Bu baribir sinxron va oqimni bloklaydi!
  resolve();
});
\`\`\`
#### To'g'ri tushuncha:
Promise faqat \`.then()\`/\`.catch()\` chaqirilgandagina asinxron microtask yaratadi, uning konstruktori esa sinxron bajariladi.

### 2. Microtask-larda cheksiz rekursiya yaratish (Starvation)
#### Muammo:
\`\`\`javascript
function run() {
  Promise.resolve().then(run); // Cheksiz microtask zanjiri
}
\`\`\`
Bu kod brauzer sahifasini butunlay muzlatib qo'yadi. Chunki microtask navbati hech qachon bo'shamaydi va Event Loop macrotask-larga yoki Render-ga o'ta olmaydi. \`setTimeout\` bilan qilingan cheksiz chaqiruvda esa bunday bo'lmaydi, chunki u har safar yangi macrotask bo'lib navbat oxiriga tushadi va oraliqda render ishlashiga yo'l qo'yadi.

### 3. Microtask va Macrotask navbatlarini chalkashtirib yuborish
#### Muammo:
Ularning ustuvorligini farqlay olmaslik oqibatida ma'lumotlar bazasiga so'rovlar yoki interfeys o'zgarishlari noto'g'ri ketma-ketlikda ishlab ketadi.

### 4. Await-dan keyingi kodning bajarilish joyini tushunmaslik
#### Xato:
\`\`\`javascript
async function foo() {
  console.log("A");
  await bar();
  console.log("B"); // Bu qism microtask ekanini bilmaslik
}
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Microtask va Macrotask o'rtasidagi asosiy farq nima?
   * **Javob:** Microtask-lar oliy ustuvorlikka ega bo'lib, har qanday macrotask-dan oldin bajariladi. Macrotask-lar esa har bir Event Loop aylanishida (tick) faqat bittadan bajariladi.
2. **Savol:** Qaysi asinxron operatsiyalar Microtask hisoblanadi?
   * **Javob:** Promise \`.then()/.catch()/.finally()\` callback-lari, \`queueMicrotask()\` va \`MutationObserver\`.
3. **Savol:** Qaysi operatsiyalar Macrotask hisoblanadi?
   * **Javob:** \`setTimeout\`, \`setInterval\`, \`setImmediate\` (Node.js da), I/O (fayl/tarmoq amallari) va foydalanuvchi interfeysi hodisalari (click, keydown).
4. **Savol:** Job Queue nima?
   * **Javob:** Bu ECMA standarti bo'yicha Microtask Queue-ga berilgan rasmiy nomdir.

### Middle (5–8)
5. **Savol:** Event Loop bitta aylanishida (tick) nechta macrotask va nechta microtask bajara oladi?
   * **Javob:** Event Loop har bir aylanishida faqat **bitta** macrotask-ni bajaradi (agar u navbatda bo'lsa), shundan so'ng navbatda turgan **barcha** microtask-larni oxirigacha bajarib bo'shatadi.
6. **Savol:** \`queueMicrotask\` nima va u qachon ishlatiladi?
   * **Javob:** Bu funksiyani microtask navbatiga to'g'ridan-to'g'ri qo'shish uchun ishlatiladi. Promise yozish shart bo'lmagan, lekin microtask ustuvorligi kerak bo'lgan holatlarda qulay.
7. **Savol:** Nima uchun cheksiz \`setTimeout\` zanjiri sahifani qotirmaydi, lekin cheksiz \`Promise.then\` zanjiri sahifani qotiradi?
   * **Javob:** \`setTimeout\` har safar yangi macrotask yaratib navbat oxiriga qo'yiladi. Event Loop har bir macrotask orasida renderlash imkoniga ega bo'ladi. \`Promise.then\` esa joriy microtask navbati ichida qayta-qayta yangi microtask yarataveradi va stack hech qachon renderlash bosqichiga o'ta olmaydi.
8. **Savol:** \`requestAnimationFrame\` (rAF) qayerda joylashadi va uning macrotask-dan farqi nima?
   * **Javob:** rAF rendering bosqichidan oldin ishlaydigan alohida navbat hisoblanadi. U brauzer ekran yangilanishi (odatda 60Hz da 16.6ms) bilan sinxron ishlaydi, oddiy macrotask-lar esa bunga bog'liq bo'lmagan tezlikda bajarilaveradi.

### Senior (9–12)
9. **Savol:** Event Loop tsiklida rendering (UI update) qaysi nuqtada sodir bo'ladi?
   * **Javob:** Call Stack bo'shagach va Microtask Queue butunlay bo'shatilganidan keyin, keyingi macrotask-ga o'tishdan oldin rendering (Render Queue) amalga oshadi.
10. **Savol:** Node.js da \`process.nextTick\` va \`setImmediate\` Event Loop-da qanday farq qiladi?
    * **Javob:** \`process.nextTick\` eng yuqori ustuvorlikka ega microtask bo'lib, oddiy Promiselardan ham oldin ishlaydi. \`setImmediate\` esa macrotask bo'lib, Event Loop-ning 'check' fazasida (poll fazasi tugagach) bajariladi.
11. **Savol:** Veb-sahifadagi klik hodisasi (click event) ham macrotask-mi? Uni JS orqali trigger qilish bilan foydalanuvchi bosishi farq qiladimi?
    * **Javob:** Ha, haqiqiy foydalanuvchi kliki — bu macrotask. Agar ikkita listener bo'lsa va ularda microtasklar bo'lsa, foydalanuvchi bosganda listenerlar orasida microtasklar bajariladi. Lekin \`.click()\` deb dasturiy chaqirilsa, u sinxron chaqiruvga aylanadi va stack bo'shamasdan ikkala listener ketma-ket ishlaydi.
12. **Savol:** \`MutationObserver\` nima va u nega microtask tarkibiga kiritilgan?
    * **Javob:** U DOM daraxtidagi o'zgarishlarni kuzatish uchun ishlatiladi. DOM o'zgarishi bilan unga javob qaytarish brauzer sahifani render qilishidan oldin yakunlanishi shart bo'lgani uchun u microtask sifatida ishlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv platforma orqali amalga oshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi bilimni sinovchi testlar.

---

## 8. 🎯 Real Project Case Study

### Keshlanadigan ma'lumotlarni asinxron tartibda qaytarish kafolati
Loyihada foydalanuvchi ma'lumotlarini serverdan tortuvchi yoki keshdan oluvchi funksiya bor. Agar ma'lumot keshda bo'lsa, u sinxron javob beradi. Agar keshda bo'lmasa, serverdan asinxron (fetch) oladi. Bu kod ishlash tartibini chalkashtirib yuboradi. Biz barcha holatda asinxron (microtask) tartibni saqlashimiz kerak.

#### Muammo (Sinxron va Asinxron aralashishi):
\`\`\`javascript
const cache = new Map();

function getUserData(id, callback) {
  if (cache.has(id)) {
    // Keshdan olinganda sinxron ishlaydi!
    callback(cache.get(id));
  } else {
    // Serverdan olinganda asinxron ishlaydi!
    fetch(\`/api/user/\${id}\`)
      .then(res => res.json())
      .then(data => {
        cache.set(id, data);
        callback(data);
      });
  }
}
\`\`\`

#### Yechim (queueMicrotask yordamida izchillikni saqlash):
\`\`\`javascript
function getUserDataSafe(id, callback) {
  if (cache.has(id)) {
    // Keshda bo'lsa ham kodni microtask-ga o'tkazib, asinxronlikni kafolatlaymiz
    queueMicrotask(() => {
      callback(cache.get(id));
    });
  } else {
    fetch(\`/api/user/\${id}\`)
      .then(res => res.json())
      .then(data => {
        cache.set(id, data);
        callback(data);
      });
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Rendering bloklanishining oldini olish:** Vizual o'zgarishlar bilan ishlaydigan asinxron amallarni microtask-da emas, balki \`requestAnimationFrame\` ichida yozish lozim. Bu animatsiyalar qotishini va ortiqcha CPU yuklamasini kamaytiradi.
* **Microtask hajmini nazorat qilish:** Microtask ichida og'ir tsikllardan foydalanmang, aks holda sahifa render bo'la olmay (UI block) qolib ketadi.

---

## 10. 📌 Cheat Sheet

| Navbat Turi | Bajarilish ustuvorligi | Tegishli API / Amallar | Cheksiz zanjir ta'siri |
| :--- | :--- | :--- | :--- |
| **Sinxron Kod** | 1-o'rin (Stack) | Asosiy kod oqimi | Sahifani bloklaydi |
| **Microtasks** | 2-o'rin (Job Queue) | \`Promise.then/catch/finally\`, \`queueMicrotask\`, \`MutationObserver\` | Sahifani butunlay muzlatadi (Starvation) |
| **UI Rendering**| 3-o'rin (Render phase) | Layout, Paint, \`requestAnimationFrame\` | Sahifada tasvir yangilanishi |
| **Macrotasks** | 4-o'rin (Task Queue) | \`setTimeout\`, \`setInterval\`, I/O, DOM Events | Sahifani qotirmaydi (har doim oraliqda renderga yo'l beradi) |
`,
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
    "id": 1,
    "question": "Microtask-lar (kichik vazifalar) navbatiga quyidagilardan qaysi biri kiradi?",
    "options": [
      "setTimeout va setInterval",
      "Promise.then() / catch() / finally() callback-lari",
      "I/O operatsiyalari (fayl o'qish)",
      "UI rendering (sahifani chizish)"
    ],
    "correctAnswer": 1,
    "explanation": "Promise-larning barcha javob callback-lari (then/catch/finally) standart bo'yicha microtask hisoblanadi."
  },
  {
    "id": 2,
    "question": "Macrotask-lar (katta vazifalar / shunchaki Tasks) navbatiga qaysi biri kiradi?",
    "options": [
      "queueMicrotask()",
      "MutationObserver",
      "setTimeout / setInterval / setImmediate",
      "Promise.resolve()"
    ],
    "correctAnswer": 2,
    "explanation": "Taymerlar (setTimeout, setInterval) brauzer va Node.js muhitida macrotask (yoki shunchaki task) hisoblanadi."
  },
  {
    "id": 3,
    "question": "JavaScript-da microtask-lar macrotask-larga nisbatan qanday ustuvorlikka (priority) ega?",
    "options": [
      "Pastroq ustuvorlikka ega",
      "Bir xil ustuvorlikka ega",
      "Yuqoriroq ustuvorlikka ega (sinxron kod tugagach, har qanday macrotask-dan oldin barcha microtask-lar bajariladi)",
      "Faqat Node.js muhitida yuqoriroq ustuvorlikka ega"
    ],
    "correctAnswer": 2,
    "explanation": "Microtask-lar har doim macrotask-lardan ustun turadi. Sinxron kod tugashi bilanoq, yoki har bir macrotask tugaganidan keyin, navbatdagi macrotask-ga o'tishdan oldin microtask navbati butunlay bo'shatiladi."
  },
  {
    "id": 4,
    "question": "Agar microtask bajarilayotgan paytda uning ichida cheksiz ravishda yangi microtask-lar qo'shilsa (masalan, rekursiv Promise), nima sodir bo'ladi?",
    "options": [
      "Ular keyingi macrotask-dan keyin ishlash uchun qoldiriladi",
      "Event Loop va macrotask-lar butunlay bloklanadi (sahifa qotib qoladi)",
      "Ortiqcha microtask-lar brauzer tomonidan o'chirib yuboriladi",
      "Hech qanday muammosiz parallel ishlayveradi"
    ],
    "correctAnswer": 1,
    "explanation": "Microtask navbati to'liq bo'shatilguncha Event Loop keyingi qadamga o'tmaydi. Agar cheksiz microtask yarataversangiz, u Task Queue va UI Rendering-ni bloklab qo'yadi va sahifa qotadi."
  },
  {
    "id": 5,
    "question": "Quyidagi API-lardan qaysi biri JavaScript-da to'g'ridan-to'g'ri maxsus microtask yaratish uchun xizmat qiladi?",
    "options": [
      "setTimeout()",
      "queueMicrotask()",
      "requestAnimationFrame()",
      "setImmediate()"
    ],
    "correctAnswer": 1,
    "explanation": "HTML5 standartiga kiritilgan `queueMicrotask(fn)` funksiyasi hechn qanday Promise yaratmasdan, to'g'ridan-to'g'ri funksiyani microtask navbatiga qo'shish imkonini beradi."
  },
  {
    "id": 6,
    "question": "Sahifani vizual yangilash (UI Rendering) Event Loop tsiklida qachon sodir bo'ladi?",
    "options": [
      "Har bir yakka microtask bajarilganidan keyin darhol",
      "Call Stack bo'shagach va joriy barcha microtask-lar to'liq bajarib bo'linganidan keyin",
      "Sinxron kod ishlayotgan paytda parallel ravishda",
      "Faqat barcha setTimeout-lar tugagandan keyin sahifa oxirida"
    ],
    "correctAnswer": 1,
    "explanation": "Rendering (sahifani qayta chizish va layout hisoblash) ishlari microtask-lar navbati butunlay bo'shaganidan so'nggina amalga oshirilishi mumkin."
  },
  {
    "id": 7,
    "question": "Node.js muhitida `process.nextTick()` funksiyasining ustuvorligi qanday?",
    "options": [
      "Oddiy Promise microtask-laridan ham oldin (eng yuqori microtask ustuvorligi) bajariladi",
      "setTimeout va boshqa macrotask-lardan keyin bajariladi",
      "Faqat File I/O operatsiyalaridan keyin chaqiriladi",
      "Ustuvorligi eng past hisoblanadi"
    ],
    "correctAnswer": 0,
    "explanation": "Node.js da `process.nextTick()` microtask navbatining eng boshida turadi. U oddiy Promise-larga qaraganda ham oldinroq (stack bo'shashi bilanoq) bajariladi."
  },
  {
    "id": 8,
    "question": "Promise konstruktori `new Promise((resolve) => { ... })` ichidagi kod qanday bajariladi?",
    "options": [
      "Asinxron ravishda microtask sifatida",
      "Asinxron ravishda macrotask sifatida",
      "Sinxron ravishda darhol (oddiy kod kabi)",
      "Faqat resolve() chaqirilgandan so'ng asinxron"
    ],
    "correctAnswer": 2,
    "explanation": "Promise konstruktori ichiga uzatilgan executor funksiyasi sinxron hisoblanadi va darhol ishlaydi. Faqat `.then()`, `.catch()` va `.finally()` callback-larigina asinxron (microtask) hisoblanadi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod konsolga nimalarni chiqaradi?\n```javascript\nPromise.resolve().then(() => console.log('A'));\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');\n```",
    "options": [
      "A, B, C",
      "C, A, B",
      "C, B, A",
      "A, C, B"
    ],
    "correctAnswer": 1,
    "explanation": "Birinchi sinxron kod ishlaydi ('C'). Keyin microtask navbati bo'shatiladi ('A'). Eng oxirida macrotask (setTimeout) bajariladi ('B'). Shuning uchun natija: C, A, B."
  },
  {
    "id": 10,
    "question": "Macrotask navbatini (Task Queue) V8 va brauzer arxitekturasida yana qanday nomlashadi?",
    "options": [
      "Microtask Queue",
      "Job Queue",
      "Event Queue yoki Message Queue",
      "Call Stack"
    ],
    "correctAnswer": 2,
    "explanation": "Macrotask navbati ko'pincha Task Queue, Event Queue yoki Message Queue deb ham ataladi. Microtask navbati esa Job Queue deb ataladi."
  },
  {
    "id": 11,
    "question": "Promise.then() zanjirlari va await-dan keyingi kodlar qaysi navbatda bajariladi?",
    "options": [
      "Task Queue (Macrotasks)",
      "Microtask Queue (Job Queue)",
      "Render Queue",
      "Call Stack"
    ],
    "correctAnswer": 1,
    "explanation": "Barcha Promise reaksiyalari va async/await-ning davomi (yield nuqtasidan keyingi kodlar) Microtask Queue-ga joylashtiriladi."
  },
  {
    "id": 12,
    "question": "Sinxron script fayli (main script) Event Loop nuqtai nazaridan nima deb hisoblanadi?",
    "options": [
      "Joriy script o'zi birinchi bajariladigan eng katta macrotask-dir",
      "U faqat microtask-lar to'plamidir",
      "U render navbati tarkibiga kiradi",
      "U Event Loop nazoratidan mutlaqo tashqarida"
    ],
    "correctAnswer": 0,
    "explanation": "Event Loop ishlashni boshlaganda, butun boshli JS faylini (sinxron kodni) bajarishning o'zi birinchi macrotask deb hisoblanadi. U tugagach, undan chiqqan microtask-lar bajariladi."
  }
]

};

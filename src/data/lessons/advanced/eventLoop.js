export const eventLoop = {
  id: "eventLoop",
  title: "Event Loop asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Event Loop nima?
**JavaScript** — bu **bir oqimli (single-threaded)** dasturlash tili. Bu degani, u bir vaqtning o'zida faqat bitta ishni bajara oladi. Unda nega biz bir vaqtda ham taymerlarni ishlatamiz, ham serverdan ma'lumot yuklaymiz va sahifadagi tugmalarni bosamiz? Sahifamiz qotib qolmaydi? 
Buning siri **Event Loop (Hodisalar sikli)** mexanizmidir. Event Loop — bu JavaScript-ning bir oqimli tabiatiga qaramay, asinxron (parallel) ishlarni bajarishiga imkon beruvchi brauzer (yoki Node.js) tarkibidagi ko'prikdir.

### Real hayotiy analogiya
Tasavvur qiling, siz **oshxonadagi yagona bosh oshpazsiz** (JavaScript Call Stack):
1. **Sinxron buyurtma:** Sizga "Salat tayyorlang" deyishdi. Siz sabzavotlarni to'g'rab, salatni darhol topshirdingiz.
2. **Asinxron buyurtma:** Sizga "Tovuq pishiring" deyishdi. Tovuq duxovkada 30 daqiqa pishishi kerak. Siz duxovka yonida 30 daqiqa hech narsa qilmay qarab turmaysiz (oqimni bloklamaysiz). Siz tovuqni duxovkaga solasiz va taymer qo'yasiz (Web API-ga topshiriq berasiz).
3. **Boshqa ishlar:** Tovuq duxovkada pishguncha, siz boshqa tezkor salatlar tayyorlashda davom etasiz.
4. **Taymer jiringlashi (Event Loop faoliyati):** Duxovka taymeri jiringlaganda (Task Queue-ga vazifa kelganda), siz qo'lingizdagi salatni tugatib bo'lingach (Call Stack bo'shagach), borib tovuqni olasiz va mijozga taqdim etasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sinxron va Asinxron navbat)
\`\`\`javascript
console.log("1. Boshlanishi"); // Sinxron

setTimeout(() => {
  console.log("2. Taymer bajarildi (asinxron)");
}, 0); // Vaqti 0ms bo'lsa ham asinxron

console.log("3. Tugashi"); // Sinxron

// Natija:
// 1. Boshlanishi
// 3. Tugashi
// 2. Taymer bajarildi (asinxron)
\`\`\`

### 2. Intermediate Example (Stack-ni bloklovchi og'ir kod)
Sinxron og'ir kod asinxron kodlarni qanday kechiktirishini ko'ramiz:
\`\`\`javascript
console.log("Start");

// 100ms dan keyin ishlashi kerak bo'lgan taymer
setTimeout(() => {
  console.log("Taymer ishladi!");
}, 100);

// Stack-ni bloklovchi 1 soniyalik sikl (og'ir ish)
const start = Date.now();
while (Date.now() - start < 1000) {
  // 1 soniya kutib turadi
}

console.log("End");

// Natija:
// Start
// (1 soniya o'tadi)
// End
// Taymer ishladi! (Garchi 100ms da tayyor bo'lsa ham, stack bo'shashini 1 soniya kutdi)
\`\`\`

### 3. Advanced Example (Event Loop simulyatsiyasi)
JavaScript-da asinxronlikni boshqarish:
\`\`\`javascript
function main() {
  console.log("A");
  
  setTimeout(function cb1() {
    console.log("B");
  }, 1000);
  
  setTimeout(function cb2() {
    console.log("C");
  }, 0);
  
  console.log("D");
}

main();

// Bajarilish bosqichlari:
// 1. main() stack-ga tushadi.
// 2. console.log("A") stack-ga kiradi, ekranga 'A' chiqadi va stack-dan chiqadi.
// 3. cb1 taymeri Web API-ga yuboriladi (1 soniya kutiladi).
// 4. cb2 taymeri Web API-ga yuboriladi (0 soniya kutiladi va darhol Task Queue-ga tushadi).
// 5. console.log("D") ekranga 'D' chiqaradi.
// 6. main() tugaydi va stack-dan chiqadi (Stack bo'shadi).
// 7. Event Loop stack bo'shligini ko'rib, Task Queue-dan cb2 ni olib stack-ga qo'yadi. Ekranga 'C' chiqadi.
// 8. 1 soniyadan keyin cb1 Task Queue-ga keladi, Event Loop uni stack-ga qo'yadi. Ekranga 'B' chiqadi.
// Yakuniy Natija: A, D, C, B
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Muzlab qolish (UI Blocking):** Agar Event Loop bo'lmaganda va JS faqat sinxron ishlaganda, har safar serverdan rasm yuklanganda sahifa butunlay muzlab qolar edi (tugmalar bosilmasdi, animatsiyalar to'xtardi). Web API va Event Loop yordamida brauzer og'ir ishlarni orqa fonda (background) bajaradi.
* **Resurslardan samarali foydalanish:** Ko'p oqimli tillarda (Java, C++) har bir so'rov uchun alohida oqim (thread) ochiladi. JS esa bitta oqimda Event Loop yordamida minglab asinxron so'rovlarni juda kam resurs sarflab bajara oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`setTimeout(..., 0)\` zudlik bilan ishlaydi deb o'ylash
#### Xato:
Juniorlar 0ms berilgani uchun bu kod keyingi satrdan oldin ishlaydi deb o'ylashadi.
#### To'g'ri tushuncha:
Har qanday setTimeout (hatto 0ms bo'lsa ham) Web API-ga o'tadi va Task Queue orqali faqat stack bo'shagachgina ishlaydi.

### 2. Stack-ni og'ir hisob-kitoblar bilan to'ldirib qo'yish (Blocking the Event Loop)
#### Muammo:
Katta massivlarni sinxron aylanib chiqish taymerlar va klik hodisalari ishlashini to'xtatib qo'yadi.
#### To'g'ri yechim:
Og'ir ishlarni mayda bo'laklarga bo'lish yoki Web Workers (alohida fon oqimi) ishlatish.

### 3. Rekursiyada chiqish shartini yozmaslik (Stack Overflow)
#### Muammo:
\`function foo() { foo(); }\` stack-ni cheksiz to'ldirib, brauzerni sindiradi.

### 4. Asinxron funksiyani sinxron o'zgaruvchiga tenglash
#### Xato:
\`\`\`javascript
let data = setTimeout(() => { return "ma'lumot"; }, 100);
console.log(data); // taymer ID-sini chiqaradi, ma'lumotni emas!
\`\`\`
#### To'g'ri usul:
Callback, Promise yoki Async/Await ishlatish.

### 5. Web API va JS Dvigateli farqini bilmaslik
#### Muammo:
\`setTimeout\` yoki \`fetch\` JavaScript tilining o'zida bor deb o'ylash. Aslida bular brauzer (yoki Node.js) taqdim etadigan tashqi muhit API-laridir.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript bir oqimli (single-threaded) deganda nimani tushunasiz?
   * **Javob:** Bir vaqtning o'zida faqat bitta operatsiya/kod satri bajarilishini va bitta Call Stack mavjudligini anglatadi.
2. **Savol:** Call Stack nima?
   * **Javob:** Dasturdagi funksiyalar chaqiruvini va ularning bajarilish navbatini (LIFO - Last In First Out qoidasi bilan) saqlovchi xotira tuzilmasi.
3. **Savol:** Callback Queue nima?
   * **Javob:** Asinxron amallar tugagandan keyin, ularga tegishli callback funksiyalar bajarilishini kutib turadigan navbat (FIFO - First In First Out qoidasi).
4. **Savol:** JS dvigateli (Engine) va brauzer muhiti (Runtime) farqi nima?
   * **Javob:** Dvigatel (masalan V8) kodni o'qiydi va bajaradi. Brauzer muhiti esa dvigatelni o'rab turadi va qo'shimcha asboblarni (DOM, setTimeout, fetch, Event Loop) taqdim etadi.

### Middle (5–8)
5. **Savol:** \`setTimeout(() => {}, 1000)\` aynan 1 soniyadan keyin ishlashini kafolatlaydimi?
   * **Javob:** Yo'q. U kamida 1 soniyadan keyin Task Queue-ga o'tishini kafolatlaydi xolos. Agar o'sha paytda Call Stack-da og'ir sinxron kod ishlayotgan bo'lsa, stack bo'shaguncha taymer kutib turadi.
6. **Savol:** Nega \`while(true) {}\` sikli turgan kodda asinxron taymerlar hech qachon ishlamaydi?
   * **Javob:** Chunki cheksiz sikl Call Stack-ni abadiy band qiladi. Call Stack bo'shamas ekan, Event Loop navbatdagi taymerlarni stack-ga o'tkaza olmaydi.
7. **Savol:** LIFO va FIFO prinsiplari Event Loop-da qanday qo'llaniladi?
   * **Javob:** Call Stack LIFO (Last In First Out) asosida ishlaydi, Callback Queue esa FIFO (First In First Out) navbat tizimida ishlaydi.
8. **Savol:** Event Loop har bir aylanishida (tick) nima ish qiladi?
   * **Javob:** U birinchi bo'lib Call Stack-ni tekshiradi. Stack bo'sh bo'lsa, Callback Queue-dagi birinchi vazifani olib Stack-ga tashlaydi.

### Senior (9–12)
9. **Savol:** Node.js va Brauzer Event Loop arxitekturasining asosiy farqi nimada?
   * **Javob:** Brauzerda bitta asosiy Event Loop bor (HTML5 standarti). Node.js esa libuv kutubxonasiga asoslangan va Event Loop bir necha maxsus fazalardan (poll, check, close callback va hk) iborat.
10. **Savol:** UI rendering (sahifani qayta chizish) Event Loop bilan qanday bog'langan?
    * **Javob:** Brauzer odatda har 16.6ms da (60 FPS uchun) sahifani qayta chizadi (render). Render faqat Call Stack bo'sh bo'lganda va microtask-lar bajarilib bo'linganida amalga oshadi.
11. **Savol:** Agar sizda Event Loop-ni bloklamasdan juda og'ir matematik hisob-kitob bajarish topshirig'i bo'lsa, uni qanday hal qilasiz?
    * **Javob:** Web Workers yordamida ishni alohida fon oqimiga o'tkazish yoki \`setTimeout\` yordamida hisob-kitobni mayda qismlarga (chunks) bo'lib asinxron bajarish.
12. **Savol:** Memory Heap-dagi ma'lumotlar bilan Call Stack-dagilarning bog'liqligi qanday?
    * **Javob:** Call Stack-da primitiv qiymatlar va Heap-dagi obyektlarga havolalar (references) saqlanadi. Stack-dagi funksiya tugagach, undagi reference-lar o'chadi va Heap-dagi yetib bo'lmas obyektlar keyinchalik Garbage Collector tomonidan tozalanadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod tekshiruvchi orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Sahifa muzlashini (UI Freezing) oldini olish
Foydalanuvchi katta hajmdagi ma'lumotlarni (masalan 1,000,000 ta qator) filtrlash tugmasini bosganda, sahifa qotib qolmasligi uchun Event Loop-dan unumli foydalanish.

#### Yechim (Hisob-kitobni bo'laklarga bo'lish - Chunking):
\`\`\`javascript
function processLargeArray(items, processItem) {
  let index = 0;

  function doChunk() {
    const chunkSize = 1000; // Har bir tick-da 1000 ta element
    const end = Math.min(index + chunkSize, items.length);

    for (let i = index; i < end; i++) {
      processItem(items[i]);
    }

    index = end;

    if (index < items.length) {
      // Keyingi bo'lakni keyingi Event Loop tick-ga rejalashtiramiz
      // Bu orqali brauzer kadr chizishga va tugma bosishlarini eshitishga ulguradi
      setTimeout(doChunk, 0);
    } else {
      console.log("Barcha ma'lumotlar qayta ishlandi!");
    }
  }

  doChunk();
}

// Ishlatilishi:
const giantList = new Array(50000).fill(0);
processLargeArray(giantList, (item) => {
  // Har bir element ustidagi og'ir amal
});
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Stack hajmini saqlash:** Rekursiv funksiyalarni asinxron zanjirga o'tkazish orqali \`RangeError: Maximum call stack size exceeded\` xatosidan qutulish mumkin.
* **Sinxron blokirovkani kamaytirish:** Katta JSON parse amallarini (\`JSON.parse\`) kichik qismlarda qilish yoki Web Worker-larga topshirish interaktivlikni (FID - First Input Delay) yaxshilaydi.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Vazifasi / Qoidasi | Misol |
| :--- | :--- | :--- |
| **Call Stack** | Funksiya chaqiriqlarini LIFO qoidasida saqlash | \`function a() { b() }\` |
| **Web API** | Brauzer taqdim etgan parallel fon ishlari | \`setTimeout\`, \`fetch\`, \`DOM Events\` |
| **Task Queue** | Asinxron callback-larni navbatda saqlash | \`() => console.log('Hi')\` |
| **Event Loop** | Stack bo'shashini kutib, Queue-dan kod o'tkazish | Har doim ishlovchi ichki mexanizm |
| **setTimeout(fn, 0)** | Kodni darhol emas, eng kamida joriy stack tugagach bajarish | \`setTimeout(cb, 0)\` |
`,
  exercises: [
  {
    "id": 1,
    "title": "Sinxron va Asinxron Ketma-ketlik",
    "instruction": "Quyidagi `scheduleLogs(logFn)` funksiyasini yozing. U berilgan `logFn` funksiyasini quyidagi tartibda chaqirsin:\n1. Birinchi bo'lib sinxron ravishda 'Start' qiymati bilan\n2. Keyin asinxron ravishda (setTimeout 0ms yordamida) 'Middle' qiymati bilan\n3. Oxirida sinxron ravishda 'End' qiymati bilan.",
    "startingCode": "function scheduleLogs(logFn) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "logFn('Start') va logFn('End') ni sinxron chaqiring. logFn('Middle') ni esa setTimeout ichiga joylashtiring.",
    "test": "if (!code.includes('setTimeout')) return 'setTimeout ishlatilmadi';\nconst sandbox = new Function(code + '; return scheduleLogs;');\nconst fn = sandbox();\nconst logs = [];\nconst logFn = (msg) => logs.push(msg);\nfn(logFn);\nif (logs.length === 2 && logs[0] === 'Start' && logs[1] === 'End') {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      if (logs.length === 3 && logs[2] === 'Middle') resolve(null);\n      else resolve('Ketma-ketlik xato yoki \"Middle\" asinxron chaqirilmadi');\n    }, 20);\n  });\n}\nreturn 'Sinxron qism to\\'g\\'ri bajarilmadi';"
  },
  {
    "id": 2,
    "title": "Promise va setTimeout yordamida Kechikish (Delay)",
    "instruction": "Berilgan `ms` (millisekundlar) vaqt o'tganidan keyin resolve bo'ladigan Promise qaytaruvchi `delay(ms)` funksiyasini yozing.",
    "startingCode": "function delay(ms) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Yangi Promise qaytaring va uning resolve funksiyasini setTimeout ichida ms vaqtdan keyin chaqiring.",
    "test": "if (!code.includes('Promise') || !code.includes('setTimeout')) return 'Promise va setTimeout ikkalasi ham ishlatilishi shart';\nconst sandbox = new Function(code + '; return delay;');\nconst fn = sandbox();\nconst start = Date.now();\nreturn fn(50).then(() => {\n  const diff = Date.now() - start;\n  if (diff >= 40 && diff <= 120) return null;\n  return 'Kutish vaqti noto\\'g\\'ri yoki kechikish sodir bo\\'lmadi: ' + diff + 'ms';\n});"
  },
  {
    "id": 3,
    "title": "Funksiyani Asinxron Chaqirish",
    "instruction": "Uzatilgan `fn` funksiyasini har doim asinxron ravishda (Event Loop navbatiga qo'yib) chaqiradigan `callAsync(fn)` funksiyasini yozing. Ya'ni `callAsync(fn)` chaqirilganda, u o'zidan keyingi sinxron kodlar ishlab bo'lganidan so'nggina `fn`ni bajarsin.",
    "startingCode": "function callAsync(fn) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "setTimeout(fn, 0) yordamida funksiyani asinxron navbatga qo'shishingiz mumkin.",
    "test": "if (!code.includes('setTimeout')) return 'setTimeout ishlatilmadi';\nconst sandbox = new Function(code + '; return callAsync;');\nconst fn = sandbox();\nlet called = false;\nfn(() => { called = true; });\nif (called === true) return 'Funksiya sinxron chaqirib yuborildi, asinxron bo\\'lishi kerak';\nreturn new Promise((resolve) => {\n  setTimeout(() => {\n    if (called === true) resolve(null);\n    else resolve('Funksiya umuman chaqirilmadi');\n  }, 10);\n});"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript dasturlash tili tabiatan qanday ishlaydi?",
    "options": [
      "Ko'p oqimli (Multi-threaded)",
      "Bir oqimli (Single-threaded)",
      "Parallel va faqat sinxron",
      "Faqat asinxron va oqimsiz"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript bir vaqtning o'zida faqat bitta vazifani bajarishga mo'ljallangan bir oqimli (single-threaded) tildir."
  },
  {
    "id": 2,
    "question": "Event Loop (Hodisalar sikli) ning asosiy vazifasi nima?",
    "options": [
      "Kodni tezroq kompilyatsiya qilish",
      "Call Stack va Callback Queue-ni kuzatib, Stack bo'shagach navbatdagi kodni bajarish",
      "Massivlar bilan ishlashni tezlashtirish va keshga yozish",
      "Sahifadagi CSS stillarni yangilab turish"
    ],
    "correctAnswer": 1,
    "explanation": "Event Loop uzluksiz ravishda Call Stack-ni tekshiradi. Agar u bo'sh bo'lsa, navbatdagi asinxron vazifalarni (Callback Queue-dan) Stack-ga o'tkazib beradi."
  },
  {
    "id": 3,
    "question": "Call Stack nima vazifani bajaradi?",
    "options": [
      "Asinxron vaqtinchalik xotira sifatida ishlaydi",
      "Funksiyalar chaqiruvini (LIFO - Last In First Out tartibida) kuzatib boradi",
      "O'zgaruvchilarni global xotirada saqlaydi",
      "Sahifani qayta chizish tartibini belgilaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Call Stack — bajarilayotgan funksiyalar ketma-ketligini LIFO (oxirgi kirgan birinchi chiqadi) tamoyili asosida kuzatib boruvchi mexanizmdir."
  },
  {
    "id": 4,
    "question": "`setTimeout(fn, 0)` chaqirilganda nima sodir bo'ladi?",
    "options": [
      "Funksiya zudlik bilan sinxron ravishda ishga tushadi",
      "Funksiya Web API-ga yuboriladi va Stack bo'shagandan so'ng (asinxron) bajariladi",
      "Funksiya mutlaqo ishlamaydi, chunki vaqti 0ms",
      "Butun Call Stack bloklanadi"
    ],
    "correctAnswer": 1,
    "explanation": "0 millisekund berilsa ham, setTimeout asinxron Web API hisoblanadi. U navbatga (Task Queue) qo'shiladi va faqat joriy sinxron kodlar tugab, Stack bo'shaganidan keyingina ishlaydi."
  },
  {
    "id": 5,
    "question": "Asinxron Web API-lar (masalan, setTimeout, fetch, DOM events) qayerda bajariladi?",
    "options": [
      "Call Stack ichida",
      "Brauzer (yoki Node.js) muhitida (C++ oqimlarida)",
      "Callback Queue ichida",
      "Memory Heap xotirasida"
    ],
    "correctAnswer": 1,
    "explanation": "Web API lar brauzerning o'zi tomonidan (C++ darajasida) parallel ravishda fonda (background) bajariladi, JS oqimini bloklamaydi."
  },
  {
    "id": 6,
    "question": "Call Stack va Callback Queue o'rtasidagi asosiy farq nima?",
    "options": [
      "Stack sinxron kodlarni, Queue esa o'zgaruvchilarni saqlaydi",
      "Stack LIFO (oxirgi kirgan - birinchi chiqadi) tamoyilida, Queue esa FIFO (birinchi kirgan - birinchi chiqadi) tamoyilida ishlaydi",
      "Queue sinxron, Stack asinxron ishlaydi",
      "Ular o'rtasida hech qanday farq yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "Call Stack funksiyalar chaqiruvini ustma-ust yig'adi (LIFO), navbat (Callback Queue) esa asinxron vazifalarni navbat asosida (FIFO) saqlaydi."
  },
  {
    "id": 7,
    "question": "JavaScript dvigateli (Engine, masalan V8) tarkibida nimalar mavjud?",
    "options": [
      "Faqat Event Loop va Node.js kutubxonalari",
      "Call Stack (bajarish oqimi) va Memory Heap (xotira ombori)",
      "Web API va Callback Queue",
      "DOM, CSSOM va Rendering Engine"
    ],
    "correctAnswer": 1,
    "explanation": "JS dvigatelining o'zi asosan ikkita narsadan iborat: Call Stack (kodni bajarish uchun) va Memory Heap (obyektlar va o'zgaruvchilarni saqlash uchun)."
  },
  {
    "id": 8,
    "question": "Agar Call Stack-da cheksiz rekursiv funksiya ishga tushsa, nima sodir bo'ladi?",
    "options": [
      "Event Loop uni avtomatik cheklab to'xtatadi",
      "Stack Overflow xatoligi yuz beradi va dastur ishdan to'xtaydi",
      "Callback Queue tezlashib, xotirani bo'shatadi",
      "Funksiya avtomatik ravishda asinxron rejimga o'tadi"
    ],
    "correctAnswer": 1,
    "explanation": "Stack o'lchami cheklangan. Agar cheksiz rekursiya yoki judayam ko'p chaqiruvlar Stack-ni to'ldirib yuborsa, brauzer 'Maximum call stack size exceeded' (Stack Overflow) xatosini beradi."
  },
  {
    "id": 9,
    "question": "Brauzer asinxron vazifani (masalan, taymerni) bajarib bo'lgach, uning callback funksiyasini qayerga joylaydi?",
    "options": [
      "To'g'ridan-to'g'ri joriy Call Stack-ga",
      "Callback Queue (Task Queue) ga",
      "Memory Heap-ning bo'sh joyiga",
      "Hech qayerga joylamaydi, uni o'chirib yuboradi"
    ],
    "correctAnswer": 1,
    "explanation": "Web API vazifani yakunlagandan keyin (masalan, 2 soniya o'tgach), unga tegishli bo'lgan callback funksiyasini keyingi bajarilishi uchun Callback Queue-ga joylaydi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod konsolga nimalarni chiqaradi?\n```javascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);\n```",
    "options": [
      "1, 2, 3",
      "1, 3, 2",
      "2, 1, 3",
      "3, 1, 2"
    ],
    "correctAnswer": 1,
    "explanation": "Avval sinxron kodlar ishlaydi (1 va 3). setTimeout(..., 0) asinxron bo'lgani uchun uning callback-i navbatga tushadi va sinxron kod tugagach ishlaydi (2)."
  },
  {
    "id": 11,
    "question": "Nima uchun JavaScript bir oqimli bo'lsa ham, fonda fayl yuklash yoki taymerni parallel bajara oladi?",
    "options": [
      "Chunki JS dvigateli ichida yashirin parallel oqimlar bor",
      "Chunki u brauzer yoki Node.js taqdim etgan ko'p oqimli Web API-lar va Event Loop mexanizmidan foydalanadi",
      "Chunki barcha asinxron kodlar avtomatik sinxron kodga aylanadi",
      "Chunki u kompyuterning GPU (grafik) quvvatidan foydalanadi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript oqimi bitta bo'lsa ham, uni o'rab turgan brauzer/Node.js ko'p oqimlidir. Ular Web API orqali parallel ishlarni bajarib berishadi."
  },
  {
    "id": 12,
    "question": "Event Loop qachon Callback Queue-dagi navbatdagi vazifani Call Stack-ga o'tkazadi?",
    "options": [
      "Vaqt tugashi bilan zudlik bilan",
      "Faqat Call Stack butunlay bo'sh bo'lgandagina",
      "Faqat foydalanuvchi sahifada harakat qilganida",
      "Istagan paytda parallel ravishda"
    ],
    "correctAnswer": 1,
    "explanation": "Event Loop-ning eng qat'iy qoidasi: Call Stack butunlay bo'sh bo'lmaguncha, Callback Queue-dagi birorta ham vazifa stack-ga o'tkazilmaydi."
  }
]

};

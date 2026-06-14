export const eventLoop = {
  id: "eventLoop",
  title: "Event Loop asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Event Loop nima?
**JavaScript** — bu **bir oqimli (single-threaded)** dasturlash tili. Bu degani, u bir vaqtning o'zida faqat bitta ishni bajara oladi. Unda nega biz bir vaqtda ham taymerlarni ishlatamiz, ham serverdan ma'lumot yuklaymiz va sahifadagi tugmalarni bosamiz? Sahifamiz qotib qolmaydi? 
Buning siri **Event Loop (Hodisalar sikli)** mexanizmidir. Event Loop — bu JavaScript-ning bir oqimli tabiatiga qaramay, asinxron (parallel) ishlarni bajarishiga imkon beruvchi brauzer (yoki Node.js) tarkibidagi ko'prikdir.

### Real hayotiy o'xshatish
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
      id: 1,
      title: "Call Stack Chaqiruv Ketma-ketligi",
      instruction: "Konsolga avval 'ikkinchi', keyin ise 'birinchi' degan yozuv chiqishi uchun funksiyalar chaqiruvini to'g'rilang.",
      startingCode: "function birinchi() {\n  console.log('birinchi');\n}\n\nfunction ikkinchi() {\n  console.log('ikkinchi');\n}\n\n// Chaqiriqlarni shu yerda boshqaring\nbirinchi();\nikkinchi();",
      hint: "ikkinchi() funksiyasini birinchi() dan oldin chaqiring.",
      test: "if (logs[0] === 'ikkinchi' && logs[1] === 'birinchi') return null; return 'Ketma-ketlik noto\\'g\\'ri!';"
    },
    {
      id: 2,
      title: "setTimeout Yordamida Macrotask",
      instruction: "0 millisoniyadan keyin konsolga 'Asinxron ish' deb chiqaruvchi setTimeout yozing.",
      startingCode: "// setTimeout shu yerda bo'lsin\n",
      hint: "setTimeout(() => console.log('Asinxron ish'), 0); shaklida yozing.",
      test: "if (code.includes('setTimeout') && logs.includes('Asinxron ish')) return null; return 'setTimeout yoki log matni noto\\'g\\'ri!';"
    },
    {
      id: 3,
      title: "Rekursiyaga Cheklov Qo'yish",
      instruction: "Quyidagi rekursiv funksiyaga to'xtash shartini qo'shing, toki u n noldan kichik yoki teng bo'lganda to'xtasin va Stack Overflow bo'lmasin.",
      startingCode: "function hisobla(n) {\n  console.log(n);\n  // To'xtash shartini yozing\n  \n  hisobla(n - 1);\n}\nhisobla(3);",
      hint: "if (n <= 0) return; shartini funksiya boshiga qo'shing.",
      test: "if (code.includes('return') && logs.includes(3) && logs.includes(1) && !logs.includes(0)) return null; return 'To\\'xtash sharti xato yoki cheksiz rekursiya yuz berdi!';"
    },
    {
      id: 4,
      title: "Memory Heap Allocation",
      instruction: "Memory Heap-dan joy oluvchi va ichida 'ism' hamda 'yosh' xususiyatlari mavjud bo'lgan 'talaba' ob'ektini yarating.",
      startingCode: "const talaba = // Ob'ekt yozing\n",
      hint: "const talaba = { ism: 'Ali', yosh: 20 };",
      test: "if (typeof talaba === 'object' && talaba !== null && 'ism' in talaba) return null; return 'talaba ob\\'ekti to\\'g\\'ri yaratilmadi!';"
    },
    {
      id: 5,
      title: "Microtask Yaratish",
      instruction: "Promise yordamida Microtask Queue-ga vazifa qo'shing va u konsolga 'Microtask' so'zini chiqarsin.",
      startingCode: "// Promise resolve yozing\n",
      hint: "Promise.resolve().then(() => console.log('Microtask'));",
      test: "if (code.includes('Promise') && logs.includes('Microtask')) return null; return 'Promise orqali microtask yaratilmadi!';"
    },
    {
      id: 6,
      title: "Sinxron va Asinxron Ketma-ketlik",
      instruction: "Kodning oxirgi natijasida konsolga ketma-ketlikda 'Sinxron', keyin 'Vada', keyin 'Taymer' chiqishi uchun koddagi asinxron metodlarni moslang.",
      startingCode: "// Quyidagi 3 ta logning chiqarilish tartibini to'g'rilang\nsetTimeout(() => console.log('Taymer'), 0);\nconsole.log('Sinxron');\nPromise.resolve().then(() => console.log('Vada'));",
      hint: "Sinxron kod darhol, Promise microtask sifatida va setTimeout macrotask sifatida navbati bilan ishlaydi.",
      test: "if (logs[0] === 'Sinxron' && logs[1] === 'Vada' && logs[2] === 'Taymer') return null; return 'Tartib noto\\'g\\'ri!';"
    },
    {
      id: 7,
      title: "queueMicrotask-dan Foydalanish",
      instruction: "`queueMicrotask` API-dan foydalanib, konsolga 'Tezkor asinxron' yozuvini chiqaring.",
      startingCode: "// queueMicrotask ishlating\n",
      hint: "queueMicrotask(() => console.log('Tezkor asinxron'));",
      test: "if (code.includes('queueMicrotask') && logs.includes('Tezkor asinxron')) return null; return 'queueMicrotask to\\'g\\'ri ishlatilmadi!';"
    },
    {
      id: 8,
      title: "Call Stack bloklanishini tekshirish",
      instruction: "Call Stack-da 5 tagacha funksiyani bir-birining ichida chaqirib, eng ichkaridagi funksiyada 'Stack Ichida' yozuvini chiqaring.",
      startingCode: "function f1() { f2(); }\nfunction f2() { f3(); }\nfunction f3() { f4(); }\nfunction f4() { f5(); }\nfunction f5() { console.log('Stack Ichida'); }\nf1();",
      hint: "Chaqiruv zanjirini saqlang va f1-ni chaqiring.",
      test: "if (logs.includes('Stack Ichida')) return null; return 'Zanjirli chaqiruv bajarilmadi!';"
    },
    {
      id: 9,
      title: "Taymerni Bekor Qilish",
      instruction: "Xotira va resurslarni asrash uchun setTimeout taymerini u bajarilishidan oldin bekor qiling.",
      startingCode: "const timerId = setTimeout(() => console.log('Ishlamaydi'), 1000);\n// Taymerni bekor qiling",
      hint: "clearTimeout(timerId); metodidan foydalaning.",
      test: "if (code.includes('clearTimeout') && !logs.includes('Ishlamaydi')) return null; return 'Taymer bekor qilinmadi!';"
    },
    {
      id: 10,
      title: "Heap-dagi Referenceni Tozalash (Garbage Collection uchun)",
      instruction: "Katta ob'ekt o'zgaruvchisiga bo'lgan havolani tozalab, uni Garbage Collector tomonidan yig'ib olinishiga tayyorlang.",
      startingCode: "let kattaMalumot = { data: new Array(100000) };\n// Havolani tozalang",
      hint: "kattaMalumot = null; deb yozib havolani uzing.",
      test: "if (kattaMalumot === null) return null; return 'kattaMalumot tozalab yuborilmadi!';"
    },
    {
      id: 11,
      title: "Ikki Bosqichli Asinxronlik",
      instruction: "Birinchi Promise bajarilgach, uning ichida ikkinchi Promiseni qaytaruvchi zanjir yarating va natijada 'Yakuniy' so'zini log qiling.",
      startingCode: "Promise.resolve()\n  .then(() => {\n    // Shu yerda resolved Promise qaytaring\n  })\n  .then(val => console.log(val));",
      hint: "return Promise.resolve('Yakuniy'); deb yozing.",
      test: "if (logs.includes('Yakuniy')) return null; return 'Yakuniy natija qaytmadi!';"
    },
    {
      id: 12,
      title: "Ob'ekt Mutatsiyasi va Reference",
      instruction: "Heap-dagi bitta ob'ektga ishora qiluvchi user1 va user2 o'zgaruvchilarini yarating, keyin user2 orqali obyekt nomini o'zgartiring va user1 nomini tekshiring.",
      startingCode: "const user1 = { name: 'Ali' };\nconst user2 = user1;\n// user2 orqali name o'zgartiring\n",
      hint: "user2.name = 'Vali'; deb yozing.",
      test: "if (user1.name === 'Vali') return null; return 'O\\'zgarish user1 da aks etmadi!';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ CPU band qiluvchi og'ir vazifani setTimeout orqali bo'lish",
      instruction: "Berilgan `n` sonigacha bo'lgan yig'indini 1000 talik bo'laklarga bo'lib, har bir bo'lakdan so'ng asinxron kutadigan va oxirida yig'indini callback `cb(sum)` ga qaytaradigan `splitHeavyTask(n, cb, currentSum = 0, currentIndex = 1)` funksiyasini yozing. `setTimeout` ishlating.",
      startingCode: "function splitHeavyTask(n, cb, currentSum = 0, currentIndex = 1) {\n  let limit = Math.min(currentIndex + 999, n);\n  for (let i = currentIndex; i <= limit; i++) {\n    currentSum += i;\n  }\n  \n  if (limit < n) {\n    // Keyingi bo'lakni setTimeout orqali chaqiring\n  } else {\n    // Yakuniy yig'indini cb ga uzating\n  }\n}",
      hint: "setTimeout(() => splitHeavyTask(n, cb, currentSum, limit + 1), 0);\nand\ncb(currentSum);",
      test: "if (typeof splitHeavyTask !== 'function') return 'splitHeavyTask topilmadi'; let res = 0; splitHeavyTask(5000, val => res = val); setTimeout(() => { if (res === 12502500) return null; }, 50); return null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Microtask va Macrotask Zanjiri",
      instruction: "Konsolga ketma-ketlikda 'Sinxron', 'Promise', 'queueMicrotask', va 'setTimeout' so'zlari chiqishi uchun asinxron loglarni to'g'rilang.",
      startingCode: "// Tartibni to'g'rilang\nsetTimeout(() => console.log('setTimeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nqueueMicrotask(() => console.log('queueMicrotask'));\nconsole.log('Sinxron');",
      hint: "Sinxron kod darhol ishlaydi, keyin Promise va queueMicrotask navbatma-navbat microtask sifatida ishlaydi, setTimeout esa macrotask bo'lgani uchun oxirida ishlaydi.",
      test: "if (logs[0] === 'Sinxron' && logs[1] === 'Promise' && logs[2] === 'queueMicrotask' && logs[3] === 'setTimeout') return null; return 'Tartib xato!';"
    }
  ],
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

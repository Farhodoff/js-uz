export const eventLoopLesson = {
  id: "event-loop",
  title: "Event Loop: JavaScript Qanday Ishlaydi?",
  level: "Murakkab",
  description: "Call Stack, Web APIs, Callback Queue, Microtasks, Macrotasks, va Event Loop mexanizmi.",
  theory: `## 1. NEGA kerak?

JavaScript **single-threaded** (yagona oqimli) til bo'lib, bir vaqtning o'zida faqat **bitta** vazifani bajara oladi. Bu degani, unda faqat bitta chaqiruvlar stegi (Call Stack) bor.

**Muammo:**
Agar biz tarmoqdan ma'lumot olish yoki katta hajmdagi faylni yuklash kabi og'ir vazifalarni sinxron (kutib turish) usulida bajarsak, butun sayt operatsiya tugaguncha **muzlab (qotib) qoladi**. Foydalanuvchi tugmalarni bosa olmaydi va interfeys reaksiyadan to'xtaydi.

**Yechim (Event Loop):**
Asinxron dasturlash va Event Loop mexanizmi JavaScript-ga og'ir vazifalarni fonda (background) bajarishga imkon beradi. JS og'ir ishlarni boshqa tizimga (Web API) topshiradi-da, o'zi navbatdagi kodni bajarishda davom etadi. Ish bitgach, natija navbat orqali Call Stack-ga qaytadi.

---

## 2. SODDALIK (Analogiya)

Buni **Restorandagi ofitsiant, oshxona va buyurtmalar navbati** orqali tushunish mumkin:

1. **Ofitsiant (Call Stack):** Mijozlardan buyurtmalarni ketma-ket qabul qiladi. Agar buyurtma oddiy (suv olib kelish) bo'lsa, uni darhol o'zi bajaradi. Agar buyurtma murakkab bo'lsa (kabob pishirish), uni oshxonaga topshiradi va keyingi mijozga o'tadi.
2. **Oshxona (Web APIs):** Taomni fonda tayyorlaydigan joy. Ofitsiant bu yerda ovqat pishishini kutib turmaydi.
3. **Tayyor taomlar peshtaxtasi (Callback/Macrotask Queue):** Ovqat pishib tayyor bo'lgach, oshxona uni peshtaxtaga qo'yadi. Taomlar bu yerda ofitsiant ularni olib mijozga tarqatishini kutadi.
4. **Nazoratchi (Event Loop):** Ofitsiantning bandligini tekshirib turadigan boshqaruvchi. Agar ofitsiant (Call Stack) bo'sh bo'lsa, u peshtaxtadan (Queue) eng birinchi tayyor taomni olib, mijozga eltishni (Stack-ga yuklashni) topshiradi.

---

## 3. STRUKTURA

JavaScript Runtime (bajarilish muhiti) bir nechta muhim qismlardan iborat:

\`\`\`mermaid
graph TD
    Code[JS kodi] --> Stack[Call Stack]
    Stack -->|Asinxron amallar| WebAPI[Web APIs / Node APIs]
    WebAPI -->|Timer/DOM callbacklar| MacroQueue[Macrotask Queue]
    WebAPI -->|Promise callbacklar| MicroQueue[Microtask Queue]
    
    EventLoop{Event Loop}
    EventLoop -->|Call Stack bo'sh bo'lsa| CheckMicro{Microtask bormi?}
    CheckMicro -->|Ha| RunMicro[Microtasklarni bajarish]
    RunMicro --> CheckMicro
    CheckMicro -->|Yo'q| RunMacro[Bitta Macrotaskni bajarish]
    RunMacro --> Stack
    MacroQueue --> EventLoop
    MicroQueue --> EventLoop
\`\`\`

### A. JavaScript Engine (Dvigatel)
Dvigatel (masalan, Google Chrome-dagi V8) asosan ikki qismdan iborat:
* **Memory Heap (Xotira uyumi):** Dinamik ma'lumotlar, obyektlar, massivlar va funksiyalar saqlanadigan tartibsiz xotira maydoni.
* **Call Stack (Chaqiruv steki):** Kod bajarilishini kuzatib boradigan ma'lumotlar tuzilmasi. U **LIFO** (Last In, First Out) printsipi bo'yicha ishlaydi.

### B. Web APIs (yoki Node.js APIs)
Dvigateldan tashqarida, lekin brauzer (yoki Node.js) taqdim etadigan qo'shimcha imkoniyatlar. Bunga \`setTimeout\`, \`fetch\`, DOM hodisalari, asinxron tarmoq so'rovlari kiradi. Ular parallel oqimda ishlay oladi.

### C. Macrotask Queue (yoki shunchaki Callback Queue)
Asinxron operatsiyalar tugagach, ularning callback funksiyalari shu navbatga kelib tushadi. Masalan, \`setTimeout\` va \`setInterval\` callback-lari.

### D. Microtask Queue (Yuqori ustuvorlikdagi navbat)
Promises \`.then()\`, \`.catch()\`, \`.finally()\` bloklari, \`queueMicrotask()\` va \`MutationObserver\` callback-lari joylashadigan navbat. Bu navbat Macrotask navbatidan ko'ra **ancha yuqori ustuvorlikka** ega.

### E. Event Loop (Hodisalar aylanmasi)
Uning yagona vazifasi — Call Stack va navbatlarni (Queues) doimiy kuzatish.
* Agar Call Stack **bo'sh** bo'lsa:
  1. Event Loop birinchi navbatda **Microtask Queue**-ga qaraydi va undagi barcha topshiriqlarni oxirigacha bajarib tozalaydi.
  2. Microtask-lar tugagach, u **Macrotask Queue**-dan bitta vazifani olib Call Stack-ga qo'yadi.
  3. Ushbu jarayon cheksiz takrorlanadi.

---

## 4. AMALIYOT

Keling, sinxron va asinxron kodlarning aralashmasini ko'rib chiqamiz:

\`\`\`javascript
console.log("1. Sinxron boshlanishi");

setTimeout(() => {
  console.log("2. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("4. Sinxron yakuni");
\`\`\`

**Ijro etilish tartibi va izohi:**
1. \`console.log("1...")\` stakka kiradi, bajariladi va stakdan chiqadi.
2. \`setTimeout\` stakka kiradi. Brauzer Web API-da taymerni boshlaydi (0ms) va callback-ni Macrotask Queue-ga joylashtiradi. \`setTimeout\` o'zi stakdan chiqib ketadi.
3. \`Promise.resolve().then(...)\` stakka kiradi. Uning callback funksiyasi Microtask Queue-ga joylashadi.
4. \`console.log("4...")\` stakka kiradi, bajariladi va chiqadi.
5. Hozirda Call Stack bo'sh. Event Loop birinchi bo'lib Microtask Queue-ga o'tadi va 3-logni bajaradi.
6. Microtask Queue bo'shagach, Macrotask Queue-dan 2-logni olib stakka qo'yadi va u bajariladi.

**Natija:**
\`\`\`
1. Sinxron boshlanishi
4. Sinxron yakuni
3. Microtask (Promise)
2. Macrotask (setTimeout)
\`\`\`

### A. Og'ir CPU Vazifalarini Bo'laklab Bajarish (CPU Splitting)
JavaScript yagona oqimli bo'lgani sababli, agar sinxron kod juda uzoq ishlasa (masalan, yirik hisob-kitoblar), u brauzerni qotirib qo'yadi. \`setTimeout(..., 0)\` yordamida ushbu og'ir vazifani bir nechta asinxron qismlarga (chunks) bo'lish va har bir qism bajarilgandan so'ng brauzerga foydalanuvchi harakatlarini qayta ishlash hamda ekranni chizish (render) imkonini berish mumkin:
\`\`\`javascript
let i = 0;
function heavyCalculation() {
  // Og'ir ishning bir qismini bajaramiz (masalan, 1000 iteratsiya)
  do {
    i++;
  } while (i % 1000 !== 0 && i < 1000000);

  if (i < 1000000) {
    // Ish hali tugamadi, keyingi qismni navbatga qo'yamiz
    setTimeout(heavyCalculation, 0);
  } else {
    console.log("Hisob-kitob tugadi!");
  }
}
heavyCalculation();
\`\`\`

### B. Progress Indicator va UI Renderlash
Agar siz sahifadagi biron-bir progress elementining qiymatini sinxron tsiklda (masalan, \`for\` tsikli orqali 0 dan 100 gacha) o'zgartirsangiz, brauzer progressning o'zgarishini ekranda ko'rsatmaydi (UI muzlaydi va tsikl tugagach darhol 100% bo'lib qoladi). Chunki render qilish bosqichi faqat Call Stack butunlay bo'shaganida ishga tushadi. Agar ishni yuqoridagi kabi \`setTimeout\` orqali bo'laklasangiz, progress silliq oshib borayotgani ekranda ko'rinadi.

### C. Event Loop Algoritmi (Batafsil)
Event Loop har bir aylanishda quyidagi qat'iy ketma-ketlikda ishlaydi:
1. **Macrotask:** Macrotask Queue-dan eng eski vazifani olib bajaradi.
2. **Microtasks:** Microtask Queue to'liq bo'shaguncha barcha microtask-larni bajaradi (agar microtask bajarilayotganda yangi microtask qo'shilsa, u ham shu navbatda bajariladi).
3. **Render/Repaint:** Agar ekran yangilanishi kerak bo'lsa va 16.6ms o'tgan bo'lsa, brauzer ekranni qayta chizadi (repaint).
4. **Wait:** Agar navbatlar bo'sh bo'lsa, yangi vazifalar tushguncha kutadi.

### D. Event Loop va Render Zanjiri Oqimi (Mermaid)

\`\`\`mermaid
graph TD
    Start["Event Loop Iteratsiyasi boshlanishi"] --> Macro["Macrotask navbatidan bitta vazifani bajarish"]
    Macro --> Micro{"Microtask navbatida ish bormi?"}
    Micro -->|Ha| RunMicro["Microtask-ni bajarish"] --> Micro
    Micro -->|Yo'q| CheckRender{"Ekranni yangilash (Render/Repaint) kerakmi?"}
    CheckRender -->|Ha| Repaint["Reflow, Repaint va Animatsiyalarni chizish"] --> EndIter
    CheckRender -->|Yo'q| EndIter["Iteratsiya yakunlandi, keyingi aylanish"] --> Start
\`\`\`

---

## 5. XATOLAR

1. **Call Stack-ni bloklash (Blocking code):** Call Stack bo'shatilmaguncha Event Loop hech qaysi navbatdan topshiriq ololmaydi. Shuning uchun og'ir matematik amallar yoki cheksiz sinxron tsikllar saytni butunlay qotirib qo'yadi:
   \`\`\`javascript
   // XATO: Butun brauzerni qotirib qo'yadigan kod
   while(true) {
     // Stack hech qachon bo'shamaydi, asinxron ishlar ishlamaydi!
   }
   \`\`\`
2. **Cheksiz rekursiya (Stack Overflow):** Funksiya o'zini to'xtovsiz chaqiraversa, Call Stack xotirasi to'lib ketadi:
   \`\`\`javascript
   function stackCrash() {
     stackCrash();
   }
   stackCrash(); // RangeError: Maximum call stack size exceeded
   \`\`\`

---

## 6. SAVOLLAR VA JAVOBLAR

**1. JavaScript necha oqimli til va nima uchun?**
JavaScript yagona oqimli (single-threaded) til, chunki unda faqat bitta Call Stack bor va u bir vaqtda faqat bitta amalni bajaradi.

**2. Memory Heap nima vazifani bajaradi?**
Memory Heap — ob'ektlar, massivlar, funksiyalar va dinamik ravishda ajratiladigan xotira manzillarini saqlaydigan tartibsiz katta xotira maydonidir.

**3. Call Stack nima va u qaysi tamoyilga asoslanadi?**
Call Stack — funksiyalarning bajarilish tartibini boshqaruvchi stak xotirasidir. U LIFO (Last In, First Out - Oxirgi kirgan, birinchi chiqadi) tamoyilida ishlaydi.

**4. Web APIs nima va ular asinxronlikka qanday yordam beradi?**
Web APIs — brauzer taqdim etadigan vositalar bo'lib, ular fonda parallel ishlarni (timer, tarmoq so'rovlari) bajarishga imkon beradi va JS oqimini band qilmaydi.

**5. Event Loop ning asosiy vazifasi nima?**
Event Loop ning vazifasi Call Stack bo'shligini tekshirish va agar u bo'sh bo'lsa, navbatlardagi callback-larni stakka o'tkazib berishdir.

**6. Microtask Queue va Macrotask Queue farqi nimada?**
Microtask Queue (Promises, queueMicrotask) yuqori ustuvorlikka ega va Call Stack bo'shashi bilan darhol to'liq bo'shatiladi. Macrotask Queue (setTimeout, setInterval) esa pastroq ustuvorlikka ega va har bir aylanishda undan faqat bitta vazifa bajariladi.

**7. Nima uchun setTimeout(() => {}, 0) darhol ishga tushmaydi?**
Chunki uning callback funksiyasi Macrotask Queue-ga tushadi. U ishga tushishi uchun Call Stack-dagi barcha sinxron kodlar va Microtask Queue-dagi barcha microtask-lar bajarilib bo'lishi shart.

**8. queueMicrotask() funksiyasi nima uchun ishlatiladi?**
U asinxron kodni to'g'ridan-to'g'ri Microtask navbatiga yuborish uchun ishlatiladi. Bu Promise ishlatmasdan microtask yaratishning eng qulay usulidir.

**9. "Stack Overflow" xatoligi nima va u qachon yuz beradi?**
Bu chaqiruvlar steki to'lib ketganda yuz beradigan RangeError xatosidir. Ko'pincha rekursiya funksiyalarida to'xtash sharti unutilganda sodir bo'ladi.

**10. "Blocking the Event Loop" (Event Loopni bloklash) deganda nima tushuniladi?**
Call Stack-da juda uzoq vaqt oladigan sinxron kod (masalan, ulkan loop) bajarilishi natijasida asinxron topshiriqlar va sahifadagi foydalanuvchi harakatlari kutib qolishidir.

**11. Garbage Collector (Chiqindi yig'uvchi) nima qiladi?**
U Memory Heap-dagi hech qanday o'zgaruvchi yoki reference ulanmagan (unreachable) bo'sh obyektlarni aniqlaydi va ularni o'chirib xotirani bo'shatadi.

**12. Agar Call Stack to'la bo'lsa, Event Loop asinxron imkoniyatlarni bajara oladimi?**
Yo'q, Call Stack butunlay bo'sh bo'lmaguncha Event Loop hech qanday asinxron navbatdagi vazifalarni stackka o'tkaza olmaydi va ular navbatda kutib turaveradi.`,
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
      id: 1,
      question: "Event Loop-da Microtask Queue va Macrotask Queue (Callback Queue) o'rtasidagi ustuvorlik qanday?",
      options: [
        "Microtask Queue har doim ustuvor va u to'liq bo'shatilmaguncha navbatdagi Macrotask bajarilmaydi",
        "Macrotask Queue har doim ustuvor",
        "Ular navbatma-navbat bajariladi",
        "Ikkalasi ham bir vaqtda bajariladi"
      ],
      correctAnswer: 0,
      explanation: "Event Loop qoidasiga ko'ra, har bir Macrotaskdan so'ng Microtask Queue to'liq tekshiriladi va undagi barcha vazifalar tugatilgandan keyingina keyingi Macrotaskka o'tiladi."
    },
    {
      id: 2,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\n```",
      options: [
        "Timeout, Promise",
        "Promise, Timeout",
        "Bir vaqtda chiqadi",
        "Faqat Promise"
      ],
      correctAnswer: 1,
      explanation: "Promise Microtask Queuega, setTimeout esa Macrotask Queuega tushadi. Microtasklar Macrotasklardan oldin bajariladi."
    },
    {
      id: 3,
      question: "JavaScript engine-da 'Blocking code' deganda nimani tushunasiz?",
      options: [
        "API dan ma'lumot kutish",
        "Main thread (Call Stack)ni uzoq vaqt band qiladigan va Event Loop-ni to'xtatib qo'yadigan og'ir sinxron kod",
        "Xato yozilgan kod",
        "Asinxron funksiyalar"
      ],
      correctAnswer: 1,
      explanation: "Og'ir sinxron operatsiyalar (masalan, milliardlik loop) Call Stackni band qiladi va Event Loop callbacklarni stackka o'tkaza olmay qoladi, natijada sahifa qotadi."
    },
    {
      id: 4,
      question: "JavaScript Memory Heap qanday maqsadda ishlatiladi?",
      options: [
        "Funksiya chaqiruvlari navbatini tartiblash uchun",
        "Obyektlar, massivlar va funksiyalar kabi dinamik hajmli ma'lumotlarni xotirada saqlash uchun",
        "Sinxron kodlarni asinxron kodga aylantirish uchun",
        "Brauzer oynasidagi tugmalarni kuzatib borish uchun"
      ],
      correctAnswer: 1,
      explanation: "Memory Heap — ob'ektlar, massivlar va funksiyalar kabi dinamik ravishda xotiradan joy oladigan strukturaviy ma'lumotlarni saqlashga xizmat qiladi."
    },
    {
      id: 5,
      question: "Call Stack uchun qaysi ma'lumotlar strukturasi printsipi qo'llaniladi?",
      options: [
        "FIFO (First In, First Out)",
        "LIFO (Last In, First Out)",
        "Daraxtsimon tuzilma (Tree)",
        "Tasodifiy navbat (Random)"
      ],
      correctAnswer: 1,
      explanation: "Call Stack LIFO (Last In, First Out) printsipi bo'yします. Eng oxirgi stakka kirgan funksiya birinchi bo'lib bajarilib chiqib ketadi."
    },
    {
      id: 6,
      question: "Stek xotirasi to'lib ketganda (masalan, cheksiz rekursiya tufayli) JavaScript qanday xatolik qaytaradi?",
      options: [
        "TypeError",
        "RangeError: Maximum call stack size exceeded",
        "ReferenceError",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "Stek hajmi cheklangan bo'lgani sababli, u to'lib ketganda dvigatel `RangeError` (Stack Overflow) xatosini qaytaradi."
    },
    {
      id: 7,
      question: "Brauzerning Web API qismi nima uchun xizmat qiladi?",
      options: [
        "JavaScript kodini mashina kodiga tarjima qilish uchun",
        "Taymerlar, tarmoq so'rovlari va DOM hodisalari kabi og'ir amallarni parallel ravishda fonda bajarish uchun",
        "Faol darchani butunlay muzlatib turish uchun",
        "Faqat CSS uslublarini tahlil qilish uchun"
      ],
      correctAnswer: 1,
      explanation: "Web API brauzer muhiti tomonidan taqdim etiladi va u JavaScript single-threaded tabiatini chetlab o'tib, fondagi ishlarni parallel bajarish imkonini beradi."
    },
    {
      id: 8,
      question: "Event Loop qachon navbatdagi callbacklarni Call Stack-ga o'tkazishi mumkin?",
      options: [
        "Har doim, o'z xohishiga ko'ra",
        "Faqat va faqat Call Stack butunlay bo'sh bo'lganda",
        "Faqat har 5 soniyada bir marta",
        "Sahifa yangilanganda"
      ],
      correctAnswer: 1,
      explanation: "Event Loop faqat Call Stack mutlaqo bo'sh bo'lgan taqdirdagina navbatlardagi callback funksiyalarni stakka yuklay oladi."
    },
    {
      id: 9,
      question: "`queueMicrotask()` yordamida qo'shilgan vazifa qaysi navbatga tushadi?",
      options: [
        "Macrotask Queue",
        "Microtask Queue",
        "Call Stack",
        "Memory Heap"
      ],
      correctAnswer: 1,
      explanation: "`queueMicrotask()` metodi o'z nomiga mos ravishda uzatilgan callbackni to'g'ridan-to'g'ri Microtask Queue-ga yuklaydi."
    },
    {
      id: 10,
      question: "Garbage Collector qaysi algoritmdan foydalanib o'chirilishi kerak bo'lgan obyektlarni aniqlaydi?",
      options: [
        "Bubble Sort",
        "Mark-and-Sweep",
        "Binary Search",
        "LIFO Stack"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da Garbage Collector asosan 'Mark-and-Sweep' (Belgilash va supurish) algoritmidan foydalanadi. Yetib bo'lmaydigan (unreachable) obyektlar tozalanadi."
    },
    {
      id: 11,
      question: "Nima uchun `setTimeout(fn, 1000)` ko'rsatilgan vaqtdan biroz kechikib bajarilishi mumkin?",
      options: [
        "Chunki brauzer o'z vaqtini noto'g'ri hisoblaydi",
        "Chunki belgilangan 1 soniya tugagandan so'ng, Call Stack yoki Microtask Queue hali ham band bo'lgan bo'lishi mumkin",
        "Chunki u faqat server ruxsat berganida ishlaydi",
        "Chunki internet sekin bo'lishi mumkin"
      ],
      correctAnswer: 1,
      explanation: "setTimeout vaqti tugagach, uning callback topshirig'i Macrotask navbatiga tushadi. Agar bu vaqtda Call Stack band bo'lsa yoki Microtask navbatida ishlar bo'lsa, u kutib qoladi."
    },
    {
      id: 12,
      question: "Quyidagi asinxron kod bajarilganda konsolga eng oxirida qaysi qiymat chiqadi?\n```javascript\nsetTimeout(() => console.log('A'), 10);\nPromise.resolve().then(() => console.log('B'));\nsetTimeout(() => console.log('C'), 0);\n```",
      options: [
        "B",
        "A",
        "C",
        "Hech biri"
      ],
      correctAnswer: 1,
      explanation: "Ketma-ketlik: 1) Promise microtask bo'lib birinchi ishlaydi ('B'). 2) 0ms li setTimeout navbatga kelib chiqadi ('C'). 3) 10ms kutgan setTimeout eng oxirida Macrotask bo'lib chiqadi ('A')."
    },
    {
      id: 13,
      question: "Event Loop iteratsiyasida rendering (repaint) bosqichi qachon va qaysi shart bajarilganda sodir bo'ladi?",
      options: [
        "Har safar setTimeout funksiyasi chaqirilganda",
        "Faqat Call Stack bo'shab, Microtask Queue to'liq bajarib bo'linganidan so'ng, agar ekran yangilanishi kerak bo'lsa",
        "Faqat microtask-lar bajarilayotgan vaqtda",
        "Hech qachon sodir bo'lmaydi, chunki brauzer sinxron render qiladi"
      ],
      correctAnswer: 1,
      explanation: "Brauzer ekranni chizish ishlarini asinxron topshiriqlarni bajarganidan so'ng, Call Stack bo'shaganda va barcha Microtask-lar to'liq bajarilib bo'linganidan keyingina Render bosqichiga ruxsat beradi."
    },
    {
      id: 14,
      question: "CPU-intensive (og'ir hisob-kitob) ishlarni `setTimeout` yordamida bo'laklashning maqsadi nima?",
      options: [
        "Kodni sinxron qilib tezroq bajarish",
        "Call Stack bo'shashini ta'minlash, UI bloklanishi (muzlashi) oldini olish va brauzerga foydalanuvchi harakatlarini qayta ishlashga imkon berish",
        "Xotirani tejash va Garbage Collection algoritmini ishga tushirish",
        "Kodni asinxron Promise-ga o'tkazib yuborish"
      ],
      correctAnswer: 1,
      explanation: "setTimeout(..., 0) og'ir kodni bir nechta macrotask-larga bo'lib yuboradi. Har bir macrotask orasida Call Stack bo'shaydi va Event Loop foydalanuvchi hodisalariga (click, input) javob berishga ulguradi."
    }
  ]
};
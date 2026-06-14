export const performanceOptimization = {
  id: "performanceOptimization",
  title: "JavaScript Unumdorligini Oshirish (Performance Optimization)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### JavaScript-da Performance (Unumdorlik) nima?
JavaScript-da unumdorlikni oshirish — bu ilovaning tezroq yuklanishi, foydalanuvchi harakatlariga (klik, skrol, yozish) lahzada javob qaytarishi va brauzer xotirasi (RAM) hamda protsessor (CPU) resurslaridan tejamkorlik bilan foydalanishini ta'minlashdir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **restoranda bosh oshpazsiz**:
* **Optimallashtirilmagan holat:** Har bir mijoz bitta salat buyurtma qilganda, siz omborxonaga borib bitta pomidor olib kelasiz, keyin yana borib bitta bodring olib kelasiz. Bu vaqt va kuchni behuda sarflashdir (bu DOM-ga har bir elementni alohida qo'shish yoki har skrolda og'ir funksiyani chaqirishga o'xshaydi).
* **Optimallashtirilgan holat (DocumentFragment o'xshatishi):** Siz laganga salat uchun kerakli barcha sabzavotlarni bir marta yig'ib olasiz (fragment yaratasiz), stol ustida salatni tayyorlaysiz va mijozga bir martada tayyor holda taqdim etasiz (DOM-ga bir marta qo'shasiz).
* **Debounce o'xshatishi:** Mijoz buyurtma berayotganda gapini tugatishini kutasiz. U "Menga pitsa, kola va... yana... shokoladli desert" deb to'xtagunicha buyurtmani yozmaysiz. U 2 soniya jim tursa, keyin buyurtmani oshxonaga yuborasiz.
* **Throttle o'xshatishi:** Juda ko'p gapiradigan mijoz sizga tinimsiz savol beryapti. Siz unga: "Har 5 daqiqada faqat bitta savolingizga javob beraman" deysiz. U o'sha 5 daqiqa ichida 100 ta savol bersa ham, siz faqat bittasini qabul qilasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Debounce (Qidiruv maydoni misolida)
Foydalanuvchi inputga matn kiritayotganda API-ga tinimsiz so'rov ketishini oldini olamiz:
\`\`\`javascript
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    // Har safar yangi chaqiruv bo'lganda oldingi taymerni o'chiramiz
    clearTimeout(timeoutId);
    // Yangi taymer o'rnatamiz
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Foydalanish:
const searchInput = document.querySelector("#search");
const fetchSuggestions = (event) => {
  console.log("API so'rov yuborildi:", event.target.value);
};

// Foydalanuvchi yozishdan to'xtaganidan keyin 500ms o'tibgina API chaqiriladi
searchInput.addEventListener("input", debounce(fetchSuggestions, 500));
\`\`\`

### 2. Throttle (Skrol qilish yoki tugmani spam-klik qilishdan himoya)
Foydalanuvchi sahifani skrol qilganda koordinatalarni hisoblash funksiyasini cheklaymiz:
\`\`\`javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      // Belgilangan limit vaqt o'tgandan keyingina cheklovni yechamiz
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Foydalanish:
const handleScroll = () => {
  console.log("Skrol koordinatasi hisoblandi:", window.scrollY);
};

// Scroll hodisasi har soniyada yuzlab marta chaqirilsa ham, funksiya har 200ms da 1 marta ishlaydi
window.addEventListener("scroll", throttle(handleScroll, 200));
\`\`\`

### 3. DOM optimallashtirish (DocumentFragment)
DOM-ga 1000 ta elementni samarali qo'shish:
\`\`\`javascript
const listContainer = document.querySelector("#my-list");
const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

// Yomon usul (Har bir iteratsiyada DOM o'zgaradi va Reflow bo'ladi):
// items.forEach(text => {
//   const li = document.createElement('li');
//   li.textContent = text;
//   listContainer.appendChild(li); 
// });

// Yaxshi usul (DocumentFragment yordamida):
const fragment = document.createDocumentFragment();

items.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  fragment.appendChild(li); // Fragment xotirada, DOM-ga ta'sir qilmaydi
});

// Asosiy DOM daraxtiga fragmentni bir marta qo'shamiz (Faqat 1 marta Reflow!)
listContainer.appendChild(fragment);
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Reflow va Repaint
Brauzer sahifani render qilganda ikki bosqichni bajaradi:
1. **Reflow (Layout):** Elementlarning o'lchamlari va sahifadagi o'rnini hisoblaydi. Bu geometriya bilan bog'liq (masalan, \`width\`, \`height\`, \`margin\`, \`padding\`, \`top\`, \`left\`). Bitta elementning reflow bo'lishi butun sahifa tartibini o'zgartirib yuborishi mumkin.
2. **Repaint (Paint):** Elementlarning ko'rinishini (rangi, foni, soyasi, matn bezagi) ekranga chizadi. Geometriya o'zgarmaydi, shuning uchun Repaint ancha tezroq ishlaydi.

### 2. Garbage Collection (Xotirani tozalash)
JavaScript-da Garbage Collector (GC) xotirani boshqaradi. U **Mark-and-Sweep** algoritmini ishlatadi:
* Dasturning boshlang'ich nuqtasi (Global obyekt)dan boshlab barcha havolalar bo'ylab yurib chiqiladi va kirish imkoni bo'lgan (reachable) o'zgaruvchilar "belgilanadi" (Mark).
* Kirib bo'lmaydigan, havolasi uzilgan barcha o'zgaruvchilar xotiradan "tozalab tashlanadi" (Sweep).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Tozalanmagan Taymerlar (Intervals)
\`setInterval\` ishlatilgandan keyin uni tozalash esdan chiqsa, callback ichidagi o'zgaruvchilar xotirada qolib ketadi va memory leak-ga sabab bo'ladi.
\`\`\`javascript
// XATO:
function startTracking() {
  const largeData = new Array(1000000).fill("leak");
  setInterval(() => {
    console.log(largeData.length);
  }, 1000);
}
// Foydalanuvchi bu sahifadan chiqsa ham taymer ishlayveradi va xotira to'lib boradi.

// TO'G'RI:
function startTrackingSafe() {
  const largeData = new Array(1000000).fill("clean");
  const intervalId = setInterval(() => {
    console.log(largeData.length);
  }, 1000);

  return () => clearInterval(intervalId); // Tozalash uchun funksiya qaytaramiz
}
\`\`\`

### 2. Ajralgan DOM elementlar (Detached DOM Nodes)
DOM-dan o'chirilgan elementga JavaScript o'zgaruvchisida havola saqlab qolish.
\`\`\`javascript
// XATO:
let btn = document.querySelector("#my-button");
document.body.removeChild(btn);
// Tugma DOM-dan o'chdi, lekin 'btn' o'zgaruvchisi hamon uni ushlab turibdi.

// TO'G'RI:
let btn = document.querySelector("#my-button");
document.body.removeChild(btn);
btn = null; // Havolani uzib yuboramiz, GC endi buni tozalay oladi
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Debounce nima va u qayerlarda qo'llaniladi?
   * **Javob:** Debounce — ketma-ket chaqirilayotgan hodisalarni bitta so'nggi chaqiruvga birlashtirish. Qidiruv inputlarida API-ga ortiqcha so'rov yubormaslik uchun ishlatiladi.
2. **Savol:** Repaint va Reflow o'rtasidagi farq nima?
   * **Javob:** Reflow elementlarning o'lchami yoki joylashuvi o'zgarganda geometriyani qayta hisoblaydi (qimmat operatsiya). Repaint esa faqat rang va ko'rinish o'zgarganda ekranga qayta chizadi.
3. **Savol:** Nima uchun global o'zgaruvchilardan kamroq foydalanish kerak?
   * **Javob:** Global o'zgaruvchilar dastur tugaguniga qadar xotirada (RAM) saqlanib turadi va Garbage Collector ularni o'chira olmaydi.
4. **Savol:** \`requestAnimationFrame\` nima?
   * **Javob:** Brauzerning ekran yangilanish chastotasi bilan sinxron ravishda ishlaydigan va animatsiyalarni silliq render qiluvchi maxsus API.

### Middle
5. **Savol:** Memory Leak (Xotira oqishi) nima va uning asosiy sabablari nimalardan iborat?
   * **Javob:** Dastur endi ishlatmaydigan, lekin qandaydir sabab bilan havolasi saqlanib qolgani uchun Garbage Collector o'chira olmaydigan xotira qismlari. Asosiy sabablar: tozalanmagan taymerlar, ajralgan DOM elementlari, o'chirilmagan event listenerlar.
6. **Savol:** Nima uchun \`DocumentFragment\` oddiy \`div\` yaratib element qo'shishdan ko'ra afzalroq?
   * **Javob:** Chunki fragment DOM daraxtidan tashqarida mavjud bo'lgan xotiradagi yengil obyektdir. Unga element qo'shganda DOM Reflow bo'lmaydi va xotira kamroq sarflanadi.
7. **Savol:** Loop (sikl) ichida DOM elementlariga to'g'ridan-to'g'ri murojaat qilish unumdorlikka qanday ta'sir qiladi?
   * **Javob:** Loop ichida DOM elementini o'qish yoki yozish Reflow/Repaint-ni keltirib chiqarib, brauzerni qotishiga (jank) olib keladi. Buni loop tashqarisiga chiqarish kerak.
8. **Savol:** Event Delegation (Hodisalarni vakillash) qanday qilib unumdorlikni oshiradi?
   * **Javob:** Har bir elementga alohida listener qo'shgandan ko'ra, ularning ota elementiga bitta listener qo'shish orqali xotira sarfini keskin kamaytiradi.

### Senior
9. **Savol:** Garbage Collector-dagi 'Mark-and-Sweep' algoritmi qanday ishlaydi?
   * **Javob:** U root (global) obyektdan boshlab barcha havolalarni tekshiradi. Root-dan boshlab yetib borib bo'ladigan (reachable) obyektlarni belgilaydi (mark). Yetib bo'lmaydigan qolgan barcha obektlarni xotiradan tozalaydi (sweep).
10. **Savol:** \`requestIdleCallback\` nima va u qanday maqsadlarda ishlatiladi?
    * **Javob:** Brauzer bo'sh (idle) bo'lgan vaqtda bajariladigan past ustuvorlikka ega vazifalarni rejalashtirish uchun ishlatiladi (masalan, analitika yuborish).
11. **Savol:** Virtual DOM va an'anaviy DOM-ni manipulyatsiya qilish o'rtasidagi farqni tushuntiring.
    * **Javob:** Virtual DOM JS xotirasida DOM tuzilishining nusxasini saqlaydi va o'zgarishlarni hisoblab (diffing), real DOM-ga faqat o'zgargan qismlarni minimal reflow bilan yangilaydi (batching).
12. **Savol:** JavaScript-da V8 engine qanday qilib kodni optimallashtiradi va "Deoptimization" nima?
    * **Javob:** V8 tez-tez chaqiriladigan funksiyalarni ("hot functions") aniqlab, ularni to'g'ridan-to'g'ri mashina kodiga kompilyatsiya qiladi (JIT). Agar funksiyadagi o'zgaruvchi turlari o'zgarib ketsa (polymorphism), V8 uni yana sekinroq interpretatsiya rejimiga qaytaradi (Deoptimization).

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar \`/Users/farhod/Desktop/github/js-uz/scratch/performanceOptimization_exercises.json\` faylida berilgan. Ularni bajarib, bilimingizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Test savollari \`/Users/farhod/Desktop/github/js-uz/scratch/performanceOptimization_quizzes.json\` faylida joylashgan. Unda 12 ta variantli test mavjud.

---

## 8. 🎯 Real Project Case Study

### Cheksiz Skrol (Infinite Scroll) va Rasm yuklash (Lazy Loading) tizimi

Tasavvur qiling, bizda juda ko'p rasmli yangiliklar tasmasi bor. Skrol qilinganda sahifa qotib qolmasligi uchun biz ikkita narsani optimallashtiramiz:
1. \`scroll\` hodisasini **throttle** qilamiz.
2. Rasmlarni faqat ekran sohasiga yaqinlashganda yuklaymiz (\`IntersectionObserver\`).

\`\`\`javascript
// 1. Throttle funksiyasini yozamiz
function throttle(func, wait) {
  let waiting = false;
  return function(...args) {
    if (!waiting) {
      func.apply(this, args);
      waiting = true;
      setTimeout(() => waiting = false, wait);
    }
  }
}

// 2. Skrol bo'lganda elementlarni tekshirish (Optimallashtirilgan)
const checkScrollPosition = throttle(() => {
  console.log("Scroll holati tekshirilmoqda...");
  // Bu yerda sahifa oxiriga yetganda yangi kontent yuklash kodi bo'ladi
}, 200);

window.addEventListener('scroll', checkScrollPosition);

// 3. Zamonaviy yondashuv: Lazy Loading Images (IntersectionObserver)
const lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = entry.target;
      image.src = image.dataset.src; // Haqiqiy rasmni yuklaymiz
      image.classList.remove('lazy');
      observer.unobserve(image); // Kuzatishni to'xtatamiz
    }
  });
});

lazyImages.forEach(image => imageObserver.observe(image));
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Hodisalarni cheklash:** Skrol, resize, keyup kabi tez-tez chiquvchi event-larni \`debounce\` yoki \`throttle\` qiling.
* **Layout Thrashing-dan qoching:** Bir vaqtning o'zida DOM-dan ham qiymat o'qib, ham yozmang. Avval o'qishlarni guruhlang, keyin yozishlarni bajaring.
* **Xotirani boshqaring:** Ishlatilmagan timerlar, event listenerlar va global o'zgaruvchilarni vaqtida tozalang.

---

## 10. 📌 Cheat Sheet

| Metod/Tushuncha | Qachon ishlatiladi? | Qisqa izoh |
| :--- | :--- | :--- |
| **Debounce** | Qidiruv (Autocomplete), oyna o'lchamini o'zgartirish | Kiritish tugaganidan keyin X ms o'tib 1 marta ishlaydi |
| **Throttle** | Skrol qilish, o'yinlardagi tugma bosish | Har X ms vaqt oralig'ida faqat 1 marta ishlaydi |
| **DocumentFragment** | DOM-ga bir vaqtda ko'p element qo'shish | Xotiradagi yengil konteyner, reflow-ni kamaytiradi |
| **removeEventListener** | Element o'chirilganda | Xotira oqishining (memory leak) oldini oladi |
| **requestAnimationFrame** | Animatsiya chizishda | Sahifa yangilanishiga moslashib, silliq animatsiya beradi |
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Debounce",
      instruction: "setTimeout bilan 500ms kechikuvchi funksiya yozing.",
      startingCode: "function delayedLog() {\n  // 500ms kutib keyin console.log('OK')\n}\n",
      hint: "setTimeout(() => console.log('OK'), 500);",
      test: "if (code.includes('setTimeout')) return null; return 'setTimeout xato';"
    },
    {
      id: 2,
      title: "Debounce Funksiyasi",
      instruction: "Debounce factory yarating - fn va delay'ni parametr qabul qilsin.",
      startingCode: "function debounce(fn, delay) {\n  // Bu yerga yozing\n}\n",
      hint: "let timeoutId; return function() { clearTimeout(timeoutId); timeoutId = setTimeout(() => fn(), delay); }",
      test: "if (code.includes('clearTimeout') && code.includes('setTimeout')) return null; return 'Debounce noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Throttle Funksiyasi",
      instruction: "Throttle factory yarating - vaqt oralig'ida bir marta chaqirsin.",
      startingCode: "function throttle(fn, limit) {\n  // Bu yerga yozing\n}\n",
      hint: "let inThrottle; return function() { if (!inThrottle) { fn(); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }",
      test: "if (code.includes('inThrottle')) return null; return 'Throttle noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Debounce vs Throttle Farqi",
      instruction: "Debounce oxirgi chaqiriqdan keyin, Throttle vaqt oralig'ida.",
      startingCode: "// Qidiruv inputi uchun qaysi kerak?\nconst search = /* Debounce yoki Throttle? */;\n",
      hint: "Debounce - foydalanuvchi yozib bo'lishini kutish",
      test: "if (code.includes('Debounce')) return null; return 'Qidiruv uchun Debounce kerak';"
    },
    {
      id: 5,
      title: "Memoization",
      instruction: "Natijani kesh qilib, second call'ni tezlangtirib ol.",
      startingCode: "function memoize(fn) {\n  const cache = {};\n  // Bu yerga yozing\n}\n",
      hint: "return function(...args) { const key = JSON.stringify(args); if (key in cache) return cache[key]; return cache[key] = fn(...args); }",
      test: "if (code.includes('cache')) return null; return 'Memoization noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "IntersectionObserver - Lazy Loading",
      instruction: "Rasm ko'rinavchi bo'lganda yuklash.",
      startingCode: "const observer = new IntersectionObserver((entries) => {\n  // Bu yerga yozing - rasm.src = rasm.dataset.src\n});\n",
      hint: "entries.forEach(entry => { if (entry.isIntersecting) { entry.target.src = entry.target.dataset.src; } });",
      test: "if (code.includes('isIntersecting')) return null; return 'Lazy loading noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "requestAnimationFrame",
      instruction: "RAF bilan smooth animatsiya qiling.",
      startingCode: "function animate() {\n  element.style.left = (parseInt(element.style.left) + 1) + 'px';\n  // Bu yerga RAF\n}\n",
      hint: "requestAnimationFrame(animate);",
      test: "if (code.includes('requestAnimationFrame')) return null; return 'RAF noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Performance.measure()",
      instruction: "Kodning ishlash vaqtini o'lchang.",
      startingCode: "performance.mark('start');\n// ... some code\nperformance.mark('end');\n// Bu yerga measure\n",
      hint: "performance.measure('operation', 'start', 'end');",
      test: "if (code.includes('performance.measure')) return null; return 'Measure noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Debounce + Search",
      instruction: "Search input uchun debounce API so'rovini qiling.",
      startingCode: "const search = debounce((text) => {\n  console.log('API so\\'rov: ' + text);\n}, 300);\n\n// Tez yozish simulyatsiyasi\n// Natija: oxirgi yozuv uchun faqat 1 marta so'rov\n",
      hint: "Debounce'dan foydalanib har harfda emas, oxirigina so'rov ketadi",
      test: "if (code.includes('debounce')) return null; return 'Search debounce noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Throttle + Scroll",
      instruction: "Scroll event'da har 1s'da bir marta event handler chaqir.",
      startingCode: "const onScroll = throttle(() => {\n  console.log('Scroll event');\n}, 1000);\n\nwindow.addEventListener('scroll', onScroll);\n",
      hint: "Throttle qo'llangan handler har 1s'da bir marta ishlaydi",
      test: "if (code.includes('throttle') && code.includes('addEventListener')) return null; return 'Scroll throttle noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Memory Leak Oldini Olish",
      instruction: "Event listener'ni component destroy'da olib tashlang.",
      startingCode: "class Component {\n  constructor() {\n    this.onResize = this.onResize.bind(this);\n    window.addEventListener('resize', this.onResize);\n  }\n  destroy() {\n    // Bu yerga olib tashlash\n  }\n}\n",
      hint: "window.removeEventListener('resize', this.onResize);",
      test: "if (code.includes('removeEventListener')) return null; return 'Cleanup noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Optimized Search Component",
      instruction: "Debounce + memoize bilan optimal search qiling.",
      startingCode: "const fetchUsers = async (query) => {\n  // API call\n};\n\nconst memoized = memoize(fetchUsers);\nconst optimized = debounce(memoized, 300);\n\n// Natija: \n// 1. 300ms kutadi\n// 2. Cached natija bo'lsa tez qaytaradi\n",
      hint: "Debounce + memoize kombinatsiyasi",
      test: "if (code.includes('debounce') && code.includes('memoize')) return null; return 'Kompleks optimization noto\\'g\\'ri';"
    },
    {
      id: 13,
      title: "Scroll Throttle Coordinates Logger",
      instruction: "Foydalanuvchi scroll qilganda sahifaning vertikal koordinatasini (window.scrollY) konsolga chiqaruvchi hodisa handlerini yozing. Sayt samaradorligini oshirish va scroll eventlarini kamaytirish uchun ushbu logScroll funksiyasini 'throttle' yordamida har 200msda bir marta ishlaydigan qiling va window-ga 'scroll' hodisasi bilan bog'lang.",
      startingCode: "const logScroll = throttle(() => {\n  console.log(window.scrollY);\n}, 200);\n// window-ga scroll hodisasini qo'shing\n",
      hint: "window.addEventListener('scroll', logScroll);",
      test: "if (code.includes('addEventListener') && code.includes('scroll') && code.includes('logScroll')) return null;\nreturn 'window-ga scroll listener biriktirilmadi yoki logScroll ishlatilmadi';"
    },
    {
      id: 14,
      title: "Performance Profiling Wrapper",
      instruction: "Kodni bajarilish vaqtini User Timing API yordamida o'lchash uchun 'profileFunction(name, fn)' wrapper funksiyasini yozing. U funksiyani chaqirishdan oldin 'performance.mark(name + \"-start\")' belgisini qo'ysin, funksiyani ishga tushirsin, bajarilgandan keyin 'performance.mark(name + \"-end\")' belgisini qo'ysin va 'performance.measure(name, name + \"-start\", name + \"-end\")' yordamida o'lchasin. Yakunda funksiya natijasini qaytarsin.",
      startingCode: "function profileFunction(name, fn) {\n  // performance.mark va performance.measure lardan foydalaning\n}",
      hint: "performance.mark(name + '-start');\nconst result = fn();\nperformance.mark(name + '-end');\nperformance.measure(name, name + '-start', name + '-end');\nreturn result;",
      test: "if (code.includes('performance.mark') && code.includes('performance.measure') && code.includes('return')) return null;\nreturn 'performance.mark yoki performance.measure orqali profiling to\\'g\\'ri amalga oshirilmadi';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Debounce va Throttle o'rtasidagi asosiy farq nimada?",
    "options": [
      "Debounce hodisalarni guruhlab, harakat to'xtagandan so'ng bir marta chaqiradi; Throttle esa ma'lum vaqt oralig'ida faqat bir marta chaqirilishini kafolatlaydi",
      "Debounce faqat rasmlar uchun ishlatiladi, Throttle esa faqat matnlar uchun",
      "Debounce funksiyani tezlashtiradi, Throttle esa uni sekinlashtiradi",
      "Hech qanday farqi yo'q, ikkalasi bir xil mexanizmning sinonimidir"
    ],
    "correctAnswer": 0,
    "explanation": "Debounce foydalanuvchi yozishdan to'xtaganidan keyin (masalan, qidiruv satri) ishlaydi. Throttle esa doimiy harakat paytida (masalan, scroll) har X millisekundda funksiyani bir marta ishga tushiradi."
  },
  {
    "id": 2,
    "question": "DOM Reflow (Layout) nima?",
    "options": [
      "Brauzer elementlarning rangini yoki fonini o'zgartirishi",
      "Brauzer sahifadagi elementlarning o'lchamlari va geometriyasini (joylashuvini) qaytadan hisoblab chiqishi",
      "Garbage Collector tomonidan keraksiz elementlarning xotiradan o'chirilishi",
      "CSS faylining serverdan yuklanishi"
    ],
    "correctAnswer": 1,
    "explanation": "Reflow — brauzer sahifaning geometrik tuzilishini qaytadan hisoblashi. Bu juda qimmat operatsiya hisoblanadi."
  },
  {
    "id": 3,
    "question": "Quyidagi CSS xususiyatlaridan qaysi biri o'zgarganda faqat Repaint (qayta chizish) sodir bo'ladi, Reflow emas?",
    "options": [
      "`width`",
      "`margin`",
      "`background-color`",
      "`font-size`"
    ],
    "correctAnswer": 2,
    "explanation": "`background-color` elementning sahifadagi geometrik o'lchamlariga ta'sir qilmaydi, shuning uchun u faqat Repaint (qayta bo'yash) ni keltirib chiqaradi. `width`, `margin` va `font-size` esa Reflow-ga sabab bo'ladi."
  },
  {
    "id": 4,
    "question": "DocumentFragment nima va u qanday foyda keltiradi?",
    "options": [
      "Faqat server tomonida HTML generatsiya qiladigan funksiya",
      "Yengil, ko'rinmas DOM daraxti bo'lib, unga elementlarni yig'ib, asosiy DOM-ga bir marta qo'shish orqali reflow/repaint sonini kamaytiradi",
      "CSS stillarini yashirish uchun ishlatiladigan maxsus Shadow DOM element",
      "JS fayllarni bo'laklarga bo'lib yuklaydigan kutubxona"
    ],
    "correctAnswer": 1,
    "explanation": "DocumentFragment xotiradagi virtual konteynerdir. Unga elementlarni qo'shganda DOM-ga ta'sir qilmaydi, fragmentni DOM-ga qo'shganda esa faqat bitta reflow sodir bo'ladi."
  },
  {
    "id": 5,
    "question": "Detached DOM node (ajralgan DOM tugunlari) tufayli kelib chiqadigan xotira oqishi (Memory Leak) nima?",
    "options": [
      "Brauzer yopilgandan keyin ham sahifaning ochiq qolishi",
      "DOM daraxtidan o'chirilgan, lekin JS-dagi o'zgaruvchilar orqali hamon havola (reference) saqlanib turgan va xotiradan o'chmagan elementlar",
      "CSS stillarining noto'g'ri yuklanishi",
      "HTML faylining bo'sh bo'lib qolishi"
    ],
    "correctAnswer": 1,
    "explanation": "Agar element DOM-dan `remove()` qilinsa-yu, lekin sizda global o'zgaruvchida unga havola bo'lsa, Garbage Collector uni xotiradan tozalay olmaydi."
  },
  {
    "id": 6,
    "question": "JavaScript Garbage Collector o'zgaruvchilarning keraksizligini qanday algoritm yordamida aniqlaydi?",
    "options": [
      "Binary Search",
      "Mark-and-Sweep (Belgilash va tozalash)",
      "First In, First Out (FIFO)",
      "Bubble Sort"
    ],
    "correctAnswer": 1,
    "explanation": "Zamonaviy brauzerlar Mark-and-Sweep algoritmidan foydalanadi: global obyektdan boshlab borib bo'lmaydigan (unreachable) obyektlar belgilab chiqiladi va o'chiriladi."
  },
  {
    "id": 7,
    "question": "Quyidagilardan qaysi biri xotira oqishiga (Memory Leak) sabab bo'lishi mumkin?",
    "options": [
      "Foydalanib bo'lingan `setInterval`ni `clearInterval` bilan to'xtatmaslik",
      "Funksiya ichida `let` yoki `const` yordamida o'zgaruvchi yaratish",
      "Massivni `null` qilib tozalash",
      "Funksiyani o'z vaqtida chaqirish"
    ],
    "correctAnswer": 0,
    "explanation": "Agar `setInterval` to'xtatilmasa, undagi callback va unda ishlatilgan tashqi o'zgaruvchilar (closures tufayli) abadiy xotirada qolib ketadi."
  },
  {
    "id": 8,
    "question": "Event listener-lar qanday qilib xotira oqishiga (memory leak) sabab bo'ladi?",
    "options": [
      "Bir elementga bir nechta listener qo'shilganda brauzer qulasa",
      "Element sahifadan o'chirilganda, unga bog'langan listener-lar hamon xotirada saqlanib qolsa",
      "Faqat `click` hodisasi ko'p marta ishlatilganda",
      "Agar listener faqat asinxron funksiyada yozilgan bo'lsa"
    ],
    "correctAnswer": 1,
    "explanation": "Garchi ba'zi zamonaviy brauzerlar buni avtomatlashtirgan bo'lsa-da, elementlar o'chirilganda ulardagi event listener-lar xotirada qolishi va o'zaro bog'liq o'zgaruvchilarni ushlab turishi mumkin. Shuning uchun `removeEventListener` ishlatish tavsiya etiladi."
  },
  {
    "id": 9,
    "question": "Animatsiyalarni silliq va optimallashtirilgan tarzda bajarish uchun qaysi API-dan foydalanish tavsiya etiladi?",
    "options": [
      "`setTimeout`",
      "`setInterval`",
      "`requestAnimationFrame`",
      "`async/await`"
    ],
    "correctAnswer": 2,
    "explanation": "`requestAnimationFrame` brauzer ekran yangilanishi (refresh rate) bilan sinxron ravishda ishlaydi (odatda soniyasiga 60-120 marta) va keraksiz chizishlarning oldini oladi."
  },
  {
    "id": 10,
    "question": "Katta massivlar ustida ishlaganda unumdorlikni oshirish uchun qaysi sikl operatori eng tez ishlaydi?",
    "options": [
      "Oddiy `for` (indeksli) yoki `while` sikli",
      "`Array.prototype.forEach`",
      "`Array.prototype.map`",
      "Barcha sikl va massiv metodlarining ishlash tezligi mutlaqo bir xil"
    ],
    "correctAnswer": 0,
    "explanation": "Oddiy `for` yoki `while` tsikllari qo'shimcha callback chaqiruvlari va funksional kontekstlar yaratmagani uchun eng yuqori tezlikka ega."
  },
  {
    "id": 11,
    "question": "Web Workers nima uchun kerak?",
    "options": [
      "Sahifani bezash uchun CSS stillarini avtomatik sozlashda",
      "Og'ir matematik hisob-kitoblarni asosiy UI oqimidan (main thread) alohida fondagi oqimga o'tkazib, sahifani qotib qolishdan himoya qilish uchun",
      "HTML elementlarni tezroq yaratish uchun",
      "Faqat ma'lumotlar ombori bilan bog'lanishda"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript bir oqimli (single-threaded) til. Web Workers yordamida og'ir hisob-kitoblarni boshqa oqimda bajarish va UI qotishini oldini olish mumkin."
  },
  {
    "id": 12,
    "question": "Nima uchun Code Splitting (kodni bo'laklash) sahifa yuklanish tezligini oshiradi?",
    "options": [
      "Chunki u fayl hajmini sun'iy ravishda kattalashtiradi",
      "Foydalanuvchiga faqat hozirgi sahifa uchun zarur bo'lgan JS kodlarini yuklab, qolgan qismlarini kerak bo'lganda (on-demand) yuklash imkonini beradi",
      "U barcha JS kodlarini CSS faylga o'zgartiradi",
      "Brauzerdagi cache xotirani o'chirib tashlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Kodni bo'laklash (Code Splitting) boshlang'ich yuklanadigan JS hajmini kamaytiradi, natijada sahifa tezroq interaktiv holatga keladi."
  }
]

};

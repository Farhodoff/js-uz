export const performanceOptimization = {
  id: "performanceOptimization",
  title: "JavaScript Unumdorligini Oshirish (Performance Optimization)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### JavaScript-da Performance (Unumdorlik) nima?
JavaScript-da unumdorlikni oshirish — bu ilovaning tezroq yuklanishi, foydalanuvchi harakatlariga (klik, skrol, yozish) lahzada javob qaytarishi va brauzer xotirasi (RAM) hamda protsessor (CPU) resurslaridan tejamkorlik bilan foydalanishini ta'minlashdir.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoranda bosh oshpazsiz**:
* **Optimallashtirilmagan holat:** Har bir mijoz bitta salat buyurtma qilganda, siz omborxonaga borib bitta pomidor olib kelasiz, keyin yana borib bitta bodring olib kelasiz. Bu vaqt va kuchni behuda sarflashdir (bu DOM-ga har bir elementni alohida qo'shish yoki har skrolda og'ir funksiyani chaqirishga o'xshaydi).
* **Optimallashtirilgan holat (DocumentFragment analogiyasi):** Siz laganga salat uchun kerakli barcha sabzavotlarni bir marta yig'ib olasiz (fragment yaratasiz), stol ustida salatni tayyorlaysiz va mijozga bir martada tayyor holda taqdim etasiz (DOM-ga bir marta qo'shasiz).
* **Debounce analogiyasi:** Mijoz buyurtma berayotganda gapini tugatishini kutasiz. U "Menga pitsa, kola va... yana... shokoladli desert" deb to'xtagunicha buyurtmani yozmaysiz. U 2 soniya jim tursa, keyin buyurtmani oshxonaga yuborasiz.
* **Throttle analogiyasi:** Juda ko'p gapiradigan mijoz sizga tinimsiz savol beryapti. Siz unga: "Har 5 daqiqada faqat bitta savolingizga javob beraman" deysiz. U o'sha 5 daqiqa ichida 100 ta savol bersa ham, siz faqat bittasini qabul qilasiz.

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
    "id": 1,
    "title": "Debounce Funksiyasini Yozish",
    "instruction": "Foydalanuvchi tez-tez tugmani bosganda yoki matn kiritganda, funksiya faqat kiritish to'xtaganidan so'ng ma'lum bir `delay` (ms) o'tgach ishga tushadigan `debounce(fn, delay)` funksiyasini yarating.",
    "startingCode": "function debounce(fn, delay) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Har safar funksiya chaqirilganda, avvalgi taymerni `clearTimeout` yordamida tozalang va yangi `setTimeout` o'rnating.",
    "test": "if (!code.includes('clearTimeout')) return 'debounce ichida clearTimeout ishlatilishi kerak';\nif (!code.includes('setTimeout')) return 'debounce ichida setTimeout ishlatilishi kerak';\nconst sandbox = new Function(code + '; return debounce;');\nconst db = sandbox();\nlet count = 0;\nconst debounced = db(() => count++, 50);\nif (typeof debounced !== 'function') return 'debounce funksiyasi wrapper funksiya qaytarishi kerak';\ndebounced(); debounced(); debounced();\nif (count !== 0) return 'Taymer tugashidan oldin funksiya bajarilmasligi kerak';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Throttle Funksiyasini Yozish",
    "instruction": "Hodisa juda ko'p chaqirilganda (masalan, `scroll` yoki `resize`), funksiya har `limit` (ms) vaqt oralig'ida faqat bir marta bajarilishini ta'minlovchi `throttle(fn, limit)` funksiyasini yozing.",
    "startingCode": "function throttle(fn, limit) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Chaqiruv ruxsat etilganligini ko'rsatuvchi bayroqcha (flag) o'zgaruvchisidan foydalaning va taymer orqali uni qayta tiklang.",
    "test": "if (!code.includes('setTimeout')) return 'throttle ichida setTimeout ishlatilishi kerak';\nconst sandbox = new Function(code + '; return throttle;');\nconst th = sandbox();\nlet count = 0;\nconst throttled = th(() => count++, 100);\nif (typeof throttled !== 'function') return 'throttle funksiyasi wrapper funksiya qaytarishi kerak';\nthrottled(); throttled();\nif (count !== 1) return 'Throttle vaqtida birinchi chaqiriq darhol ishlashi va keyingilari cheklanishi kerak';\nreturn null;"
  },
  {
    "id": 3,
    "title": "DocumentFragment yordamida DOM optimallashtirish",
    "instruction": "Berilgan `container` (DOM elementi) ichiga ko'p miqdordagi `items` (matnli massiv) elementlarini `li` ko'rinishida qo'shing. DOM-ga qayta-qayta murojaat qilib (reflow/repaint) unumdorlikni pasaytirmaslik uchun `document.createDocumentFragment()` dan foydalaning.",
    "startingCode": "function appendItemsOptimized(container, items) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Avval fragment yarating, so'ng tsikl ichida har bir elementni fragmentga `appendChild` qiling. Eng oxirida fragmentni `container`ga bir marta qo'shing.",
    "test": "if (!code.includes('createDocumentFragment')) return 'createDocumentFragment dan foydalanilishi shart';\ntry {\n  const mockContainer = { appendChild: function(el) { this.child = el; } };\n  const mockDoc = {\n    createDocumentFragment: () => {\n      const fragment = { children: [], appendChild: function(el) { this.children.push(el); } };\n      return fragment;\n    },\n    createElement: (tag) => ({ tag, textContent: '' })\n  };\n  const sandbox = new Function('document', code + '; return appendItemsOptimized;');\n  const fn = sandbox(mockDoc);\n  fn(mockContainer, ['Olma', 'Anor']);\n  if (!mockContainer.child) return 'Elementlar containerga qo\\'shilmadi';\n  if (mockContainer.child.children && mockContainer.child.children.length !== 2) return 'Barcha elementlar fragmentga qo\\'shilmagan';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  }
]
,
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

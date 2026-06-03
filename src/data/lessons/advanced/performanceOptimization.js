export const performanceOptimization = {
  id: "a17",
  title: "Performance Optimization: Debounce, Throttle, Lazy Loading, Memoization",
  theory: `## 1. NEGA kerak?

**Real muammolar:**
- Qidiruv inputiga har harfda server so'rovi → Serverga juda ko'p yuklama
- Scroll event har ms'da → 1000+ event chiqadi
- Rasm ko'rmaydigan joyda ham yuklansa → Keraksiz xotira ishlatiladi

## 2. SODDALIK

**Lift eshigi (Debounce):** Har yangi odam kelsa, lift kutishni boshidan boshlaydi. Hech kim kelmay qo'ygandan keyingina lift yuradi.

**Avtobus (Throttle):** Avtobus qancha odam kutsa ham, faqat jadval bo'yicha keladi (har 15 min).

**Asosiy dars:** Funksiyalarni "optimallashtirish" = Kamroq chaqirish = Tezroq sayt.

## 3. STRUKTURA VA AMALIY USULLAR

### A. Debounce - Oxirgi Chaqiriqdan Keyin Kutish
\`javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);  // Oldingi timeout'ni bekor qil
    timeoutId = setTimeout(() => {
      fn.apply(this, args);   // delay ms'dan keyin chaqir
    }, delay);
  };
}

// REAL MISOL: Qidiruv
const search = debounce((text) => {
  console.log("Server so'rov: " + text);
}, 500);

// Foydalanuvchi yozmoqda...
search("J");      // 0ms - timeout set
search("Ja");     // 50ms - timeout clear, yangi set
search("Jav");    // 100ms - timeout clear, yangi set
// 600ms'da faqat "Jav" uchun server so'rovi ketadi
\`

### B. Throttle - Vaqt Oralig'ida Bir Marta
\`javascript
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// REAL MISOL: Scroll event
const onScroll = throttle(() => {
  console.log("Scroll!");
}, 1000);

// Scroll event har ms'da chiqadi lekin funksiya har 1s'da bir marta ishlaydi
window.addEventListener('scroll', onScroll);
\`

### C. Debounce vs Throttle visual vaqt sxemasi
\`mermaid
sequenceDiagram
    participant User as Foydalanuvchi
    participant D as Debounce (500ms)
    participant T as Throttle (500ms)
    
    User->>D: 1-so'rov (0ms)
    Note over D: Kutishni boshlaydi...
    User->>T: 1-so'rov (0ms)
    Note over T: Darhol ishlaydi!
    
    User->>D: 2-so'rov (200ms)
    Note over D: Oldingisini bekor qilib, yangidan kutadi
    User->>T: 2-so'rov (200ms)
    Note over T: Bloklangan (500ms kutmoqda)
    
    User->>D: 3-so'rov (400ms)
    Note over D: Yana bekor qilib, 500ms kutadi
    
    Note over D: 900ms da ishlaydi (oxirgi chaqiriqdan keyin 500ms o'tdi)
    Note over T: 500ms o'tgach, yangi so'rovlarni qabul qila oladi
\`

### D. Lazy Loading - Keraksiz Resurs Yuklama
\`javascript
// HTML:
// <img src="placeholder.jpg" data-src="actual.jpg" class="lazy">

const images = document.querySelectorAll('img.lazy');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;  // Asl rasmni yuklash
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => observer.observe(img));
\`

### E. Memoization - Natijani Kesh Qilish
\`javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("Cache'dan olinmoqda");
      return cache[key];
    }
    console.log("Hisoblayapman...");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensive = (n) => {
  let sum = 0;
  for (let i = 0; i < n * 1000000; i++) sum += i;
  return sum;
};

const memoized = memoize(expensive);
console.log(memoized(5));  // "Hisoblayapman..."
console.log(memoized(5));  // "Cache'dan olinmoqda"
\`

### F. requestAnimationFrame (rAF) - Smooth Animation
\`javascript
// ❌ XATO - setInterval (jerkint animatsiya)
setInterval(() => {
  element.style.left = (parseInt(element.style.left) + 1) + 'px';
}, 16);

// ✅ TO'G'RI - RAF (monitor tezligiga mos)
function animate() {
  element.style.left = (parseInt(element.style.left) + 1) + 'px';
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
\`

### G. Virtual Scrolling - Katta ro'yxatlarni render qilish
Katta hajmdagi ma'lumotlar bilan ishlaganda DOM elementlarini minimal darajada saqlash uchun Virtual scrolling qo'llaniladi.

\`mermaid
graph TD
    %% Styling
    classDef visible fill:#2ecc71,stroke:#fff,stroke-width:2px,color:#fff;
    classDef buffer fill:#3498db,stroke:#fff,stroke-width:2px,color:#fff;
    classDef virtual fill:#95a5a6,stroke:#333,stroke-dasharray: 5 5,color:#fff;
    
    TopVirtual["Virtual Spacing Top (5000px balandlik)"]:::virtual
    
    BufferTop["Buffer Zone Top (Yuklanayotgan qatorlar)"]:::buffer
    
    ViewportStart["=== VIEWPORT (Ko'rinadigan qism) ==="]:::visible
    Item1["Element 10"]:::visible
    Item2["Element 11"]:::visible
    Item3["Element 12"]:::visible
    ViewportEnd["=== VIEWPORT END ==="]:::visible
    
    BufferBottom["Buffer Zone Bottom (Yuklanayotgan qatorlar)"]:::buffer
    
    BottomVirtual["Virtual Spacing Bottom (25000px balandlik)"]:::virtual
    
    TopVirtual --> BufferTop
    BufferTop --> ViewportStart
    ViewportStart --> Item1 --> Item2 --> Item3 --> ViewportEnd
    ViewportEnd --> BufferBottom
    BufferBottom --> BottomVirtual
\`

\`javascript
// 10,000+ elementi bo'lgan list'da faqat ko'rinavchi elementlarni render qilish
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
  }

  onScroll(scrollTop) {
    const visibleStart = Math.floor(scrollTop / this.itemHeight);
    const visibleEnd = visibleStart + Math.ceil(this.container.clientHeight / this.itemHeight);

    // Faqat visibleStart - visibleEnd elementlarini render qil
    const fragment = document.createDocumentFragment();
    for (let i = visibleStart; i < visibleEnd; i++) {
      const el = this.renderItem(this.items[i], i);
      fragment.appendChild(el);
    }
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  }
}
\`

### H. Code Splitting va Bundle hajmini boshqarish
\`javascript
// Dynamic import'lar yordamida bundle-ni qismlarga bo'lib yuklash
const routes = {
  home: () => import('./pages/home.js'),
  about: () => import('./pages/about.js'),
  contact: () => import('./pages/contact.js')
};

router.on('navigate', async (page) => {
  const module = await routes[page]();
  module.render();
});
\`

### I. Performance Monitoring - O'lchash va Profiling
Samaradorlikni o'lchash uchun brauzerning Performance API-sidan foydalanish eng to'g'ri va aniq yo'ldir:
\`javascript
performance.mark('start-operation');
// Optimallashtirilishi kerak bo'lgan og'ir operatsiya
performance.mark('end-operation');

performance.measure('operatsiya-olchovi', 'start-operation', 'end-operation');
const measures = performance.getEntriesByName('operatsiya-olchovi');
console.log(\`Bajarilish vaqti: \${measures[0].duration} ms\`);
\`

## 4. XATOLAR (Common Mistakes)

1. **Debounce/Throttle'ni shunaqa qilmagan:**
   - Search inputida har harfda API so'rov
   - Scroll'da har pixel'da render

2. **Lazy loading'da placeholder yo'q:**
   - Rasmlar kelguncha tik bo'sh qoladi

3. **Memory leaks:**
   - Event listener'larni olib tashlamagan

## 5. SAVOLLAR VA JAVOBLAR

**1. Debounce nima va qachon kerak?**
Funksiyani oxirgi chaqiriqdan keyin kutish. Qidiruv inputida kerak.

**2. Throttle nima va qachon kerak?**
Vaqt oralig'ida bir marta chaqirish. Scroll event'larda kerak.

**3. Lazy loading nima?**
Resurslarni faqat kerak bo'lganda yuklash (rasm ko'rinavchi bo'lganda).

**4. Memoization nima?**
Funksiya natijasini kesh qilish, keyin tez qaytarish.

**5. Virtual Scrolling nima?**
10,000+ elementda faqat ko'rinavchi elementlarni render qilish.

**6. Code splitting nima?**
Katta bundle'ni kichik fayllarga bo'lish, kerak bo'lganda yuklash.

**7. RAF (requestAnimationFrame) nima?**
Monitor tezligiga mos animatsiya (setInterval bilan o'rniga).

**8. Service Worker cache nima?**
Offline'da amaliyot ko'rsatish uchun foydali kesh moduli.

**9. Memory leak nima?**
Event listener'larni olib tashlamasa, xotira oshib turadi.

**10. performance.measure() nima?**
Kodning ishlash vaqtini yuqori aniqlikda o'lchash.
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
      id: 1,
      question: "\"Debounce\" va \"Throttle\" optimallashtirish usullari o'rtasidagi asosiy farq nima?",
      options: [
        "Debounce funksiyani ma'lum vaqt kutib, faqat oxirgi chaqiriqdan keyin ishga tushiradi; Throttle esa funksiya ketma-ket chaqirilganda ma'lum vaqt oralig'ida faqat bir marta ishlashini ta'minlaydi",
        "Debounce faqat rasmlarda, Throttle esa faqat videolarda ishlatiladi",
        "Throttle faqat Internet Explorer brauzerida ishlaydi",
        "Debounce funksiyani tezlashtiradi, Throttle esa sekinlashtiradi"
      ],
      correctAnswer: 0,
      explanation: "Debounce foydalanuvchi harakatdan to'xtaganidan keyingina funksiyani chaqiradi (masalan, qidiruv tugagach). Throttle esa harakat to'xtovsiz davom etsa ham, ma'lum oraliq bilan chaqirib turadi (masalan, scroll paytida)."
    },
    {
      id: 2,
      question: "Qidiruv maydoni (Search Input) uchun foydalanuvchi yozib bo'lgandan keyin API so'rov yuborish uchun qaysi usul eng mos keladi?",
      options: [
        "Throttle",
        "Debounce",
        "Lazy Loading",
        "Virtual Scrolling"
      ],
      correctAnswer: 1,
      explanation: "Foydalanuvchi har bir harfni kiritganda API ga so'rov yubormaslik uchun Debounce eng optimal yechimdir. U foydalanuvchi yozishdan 300-500ms to'xtaganidan keyingina so'rov yuboradi."
    },
    {
      id: 3,
      question: "\"Lazy Loading\" (Kechiktirib yuklash) usulining asosiy maqsadi nima?",
      options: [
        "Sahifadagi barcha rasmlarni darhol eng yuqori sifatda yuklash",
        "Foydalanuvchi ekranda ko'rmayotgan resurslarni (masalan, sahifa pastidagi rasmlarni) faqat ular ko'rinadigan sohaga (viewport) yaqinlashganda yuklash",
        "JavaScript kodlarini sekinroq bajarish",
        "Dastur xotirasini cheklash"
      ],
      correctAnswer: 1,
      explanation: "Lazy Loading yordamida dastlab faqat foydalanuvchi ko'rib turgan sohadagi (viewport) ma'lumot va rasmlar yuklanadi. U tarmoq trafigini tejaydi va saytning dastlabki yuklanish tezligini va visual feedbackni yaxshilaydi."
    },
    {
      id: 4,
      question: "Nima uchun animatsiyalarni yaratishda `setInterval` yoki `setTimeout` o'rniga `requestAnimationFrame` (rAF) ishlatish tavsiya etiladi?",
      options: [
        "Chunki `requestAnimationFrame` monitorning yangilanish tezligiga (refresh rate, odatda 60Hz/120Hz) avtomatik ravishda moslashib, silliq (smooth) animatsiyani ta'minlaydi va batareyani tejaydi",
        "Chunki u kodni qisqartiradi",
        "Chunki u CSS yozishni talab qilmaydi",
        "Chunki u faqat mobil telefonlarda ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "`requestAnimationFrame` brauzerning grafik chizish (paint) sikli bilan sinxron ishlaydi va sahifa faol bo'lmaganda (background tab) ishlashdan to'xtab, CPU resurslarini tejaydi."
    },
    {
      id: 5,
      question: "\"Memoization\" nima?",
      options: [
        "Kompyuter xotirasini tozalash algoritmi",
        "Qimmat (ko'p vaqt oluvchi) funksiya natijalarini kirish argumentlari bo'yicha keshlab qo'yib, keyingi safar bir xil argumentlar yuborilganda keshdan tezkor qaytarish texnikasi",
        "Kodlarni avtomatik qismlarga bo'lish (Code splitting)",
        "Sahifani offlayn rejimda ishlashga tayyorlash"
      ],
      correctAnswer: 1,
      explanation: "Memoization - bu pure funksiyalar natijalarini keshga saqlash orqali qayta hisob-kitoblarni oldini olib, performance'ni oshiruvchi samarali usuldir."
    },
    {
      id: 6,
      question: "Katta hajmdagi JavaScript kodlarini bitta bundle o'rniga kichik qismlarga bo'lib yuklash (Code Splitting) texnikasining asosiy afzalligi nima?",
      options: [
        "Loyihaning dastlabki sahifasi yuklanish tezligini sezilarli oshirish va faqat kerakli sahifa uchun kod yuklash",
        "JavaScript kodini serverda xavfsiz bajarish",
        "Massivlar bilan ishlashni tezlashtirish",
        "HTML va CSS kodini avtomat o'chirib tashlash"
      ],
      correctAnswer: 0,
      explanation: "Code splitting (kodni bo'lish) yordamida brauzer boshlang'ich yuklanishda butun sayt kodini emas, balki faqat ayni vaqtda kerakli bo'lgan qismlarini yuklaydi. Qolgan modullar keyinroq, kerak bo'lganda yuklanadi."
    },
    {
      id: 7,
      question: "Sahifada 100,000 ta elementdan iborat katta ro'yxatni (list) sekinlashuvlarsiz render qilish uchun qaysi texnika ishlatiladi?",
      options: [
        "Virtual Scrolling (Virtualizatsiya)",
        "Debounce",
        "Server-Side Rendering",
        "HTML Compression"
      ],
      correctAnswer: 0,
      explanation: "Virtual Scrolling faqat foydalanuvchining ko'rish sohasida (viewport) turgan bir nechta o'nlab elementlarni DOMga qo'shadi, qolgan elementlarni esa scroll qilganda dinamik almashtiradi. Bu DOM elementlari sonini juda kam saqlaydi."
    },
    {
      id: 8,
      question: "JavaScript-da xotira oqishi (Memory Leak) deganda nima tushuniladi?",
      options: [
        "Ishlatib bo'lingan va endi kerak bo'lmagan ma'lumotlar xotiradan (Garbage Collector tomonidan) o'chirilmasdan, xotirani band qilib turishi",
        "Operatsion tizimning to'liq o'chib qolishi",
        "Dasturdagi ma'lumotlarning Internetga tarqalib ketishi",
        "O'zgaruvchilarni const o'rniga let bilan e'lon qilish"
      ],
      correctAnswer: 0,
      explanation: "Xotira oqishi (Memory Leak) - foydalanilmayotgan obyektlar referenslari saqlanib qolgani sababli Garbage Collector ularni tozalay olmasligi natijasida yuzaga keladi. Bu vaqt o'tishi bilan dasturning xotira iste'molini oshiradi."
    },
    {
      id: 9,
      question: "Veb-saytda takroriy so'rovlarda rasmlar va stillarni tarmoqdan qayta-qayta yuklamaslik uchun server tomonidan yuboriladigan HTTP header qaysi?",
      options: [
        "`Cache-Control`",
        "`Content-Type`",
        "`Access-Control-Allow-Origin`",
        "`User-Agent`"
      ],
      correctAnswer: 0,
      explanation: "Serverdan yuboriladigan `Cache-Control` (masalan, `Cache-Control: max-age=31536000`) brauzerga resursni qancha vaqt davomida local keshda saqlash va serverga so'rov yubormaslik mumkinligini aytadi."
    },
    {
      id: 10,
      question: "Brauzerda repaints (qayta bo'yash) va reflows (sahifa tartibini qayta hisoblash) ni kamaytirish uchun DOM o'zgarishlarini qanday amalga oshirish kerak?",
      options: [
        "Har bir o'zgarishni alohida DOM elementiga darhol yozish",
        "DOM o'zgarishlarini DocumentFragment yordamida xotirada yig'ib, keyin bitta operatsiyada DOMga qo'shish",
        "CSS-ni butunlay o'chirib tashlash",
        "`setInterval` orqali tez-tez DOMni yangilab turish"
      ],
      correctAnswer: 1,
      explanation: "`DocumentFragment` — bu yengil, minimal DOM obyekti bo'lib, unga ko'plab yangi elementlarni xotirada qo'shib olgandan keyin, haqiqiy DOMga faqat bir marta append qilish mumkin. Bu esa sahifani qayta chizish (reflow/repaint) yukini keskin kamaytiradi."
    },
    {
      id: 11,
      question: "Service Worker yordamida ma'lumotlarni keshlash qaysi turdagi ilovalarni yaratishda muhim hisoblanadi?",
      options: [
        "PWA (Progressive Web Apps)",
        "Desktop Command Line Tools",
        "Node.js Scripting Tools",
        "WordPress saytlari"
      ],
      correctAnswer: 0,
      explanation: "Service Worker brauzer va tarmoq o'rtasida vositachi vazifasini bajaradi va PWA texnologiyasining asosi hisoblanadi. U tarmoq so'rovlarini tutib olib, offline rejimda ham ilova ishlashini ta'minlash uchun resurslarni local keshdan olib berishi mumkin."
    },
    {
      id: 12,
      question: "Veb-ilova ishlash tezligini o'lchash va muammoli kodlarni aniqlash uchun JavaScript brauzer muhitida taqdim etiladigan API qaysi?",
      options: [
        "Performance API (masalan, `performance.mark` va `performance.measure`)",
        "LocalStorage API",
        "Cryptography API",
        "History API"
      ],
      correctAnswer: 0,
      explanation: "Performance API yordamida kodning bajarilish vaqtini millisekundlarda aniq o'lchash, performance marklar o'rnatish va sekin ishlayotgan kod bloklarini profiler orqali aniqlash mumkin."
    },
    {
      id: 13,
      question: "Layout Thrashing (yoki Force Reflow) brauzerda qanday kelib chiqadi va nimasi bilan zararli?",
      options: [
        "JavaScript kodida bir vaqtning o'zida DOM elementlari o'lchamlarini o'qish (read) va yozish (write) operatsiyalari ketma-ket takrorlanganda brauzerni sahifa tartibini qayta-qayta hisoblashga majburlaydi va bu sahifa qotishiga (jank) olib keladi",
        "Faqat CSS-da animatsiyalar noto'g'ri yozilgan taqdirda",
        "Foydalanuvchi internet aloqasi sekinlashganda",
        "Rasm hajmi juda katta bo'lganda"
      ],
      correctAnswer: 0,
      explanation: "Layout Thrashing — o'qish va yozish amallarini ketma-ket aralashtirib bajarish natijasida brauzerni bir necha bor layout reflow qilishga majbur etish. Buni oldini olish uchun o'qish va yozish operatsiyalari guruhlarga (batching) ajratilishi lozim."
    },
    {
      id: 14,
      question: "Katta ma'lumotlar ro'yxatida (masalan, 50 000 ta qator) Virtual Scrolling (Virtualizatsiya) qanday yordam beradi?",
      options: [
        "U faqat foydalanuvchi ekranda ko'rib turgan (viewport) va uning atrofidagi bir nechta DOM elementlarini render qiladi, qolganlarini esa scroll qilinganda dinamik almashtiradi. Bu DOM elementlari sonini juda kichik ushlab qoladi",
        "U barcha 50 000 ta qatorni birdan yuklab sahifani tezlashtiradi",
        "U sahifadagi scroll harakatini butunlay o'chirib qo'yadi",
        "U barcha qatorlarni rasm formatiga o'tkazib yuboradi"
      ],
      correctAnswer: 0,
      explanation: "Virtual scrolling loyihada DOM elementlari sonini juda kam saqlash orqali brauzer xotirasi va grafik chizish yuklamasini (reflow/repaint) minimal darajada ushlab turadi."
    }
  ]
};

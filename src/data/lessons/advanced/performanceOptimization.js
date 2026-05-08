export const performanceOptimization = {
  id: "a17",
  title: "Performance Optimization: Debounce, Throttle, Lazy Loading, Memoization",
  theory: `## 1. NEGA kerak?

**Real muammolar:**
- Qidiruv inputiga har harfda server so'rovi → Serverga juda ko'p yuklama
- Scroll event har ms'da → 1000+ event chiqadi
- Rasm ko'rmaydigan joyda ham yuklansa → Keraksiz xotira ishlatiladi

## 2. SODDALIK

**Lift eshigi (Debounce):** Har yangi odam kelsa, lift kutishni boshidan boshlaydi. Hech kim kelmay qo'ygandan keyingin lift yuradi.

**Avtobus (Throttle):** Avtobus qancha odam kutsa ham, faqat jadval bo'yicha keladi (har 15 min).

**Asosiy dars:** Funksiyalarni "optimallashtirish" = Kamroq chaqirish = Tezroq sayt.

## 3. STRUKTURA

### A. Debounce - Oxirgi Chaqiriqdan Keyin Kutish

\`\`\`javascript
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
\`\`\`

### B. Throttle - Vaqt Oralig'ida Bir Marta

\`\`\`javascript
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
\`\`\`

### C. Debounce vs Throttle

\`\`\`javascript
let debounceCount = 0, throttleCount = 0;

const debounceFunc = debounce(() => { debounceCount++; }, 500);
const throttleFunc = throttle(() => { throttleCount++; }, 500);

// 10 marta vaqt-vaqt chaqir (100ms oralig'ida)
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    debounceFunc();
    throttleFunc();
  }, i * 100);
}

// 1s keyin:
// debounceCount = 1 (faqat oxirgi 500ms'ni kutib)
// throttleCount = 2-3 (har 500ms'da bir marta)
\`\`\`

### D. Lazy Loading - Keraksiz Resurs Yuklama

\`\`\`javascript
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
\`\`\`

### E. Memoization - Natijani Kesh Qilish

\`\`\`javascript
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
\`\`\`

### F. RequestAnimationFrame (rAF) - Smooth Animation

\`\`\`javascript
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
\`\`\`

### G. Virtual Scrolling - Juda Ko'p Elementlarda

\`\`\`javascript
// 10,000+ elementi bo'lgan list'da faqat ko'rinavchi elementlarni render qilish
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
  }

  onScroll(scrollTop) {
    const visibleStart = Math.floor(scrollTop / this.itemHeight);
    const visibleEnd = visibleStart + Math.ceil(container.clientHeight / this.itemHeight);

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
\`\`\`

### H. Code Splitting - Faylni Bo'lish

\`\`\`javascript
// webpack.config.js yoki bundler config'da:
// Dynamic import'larni ajratish
const routes = {
  home: () => import('./pages/home.js'),
  about: () => import('./pages/about.js'),
  contact: () => import('./pages/contact.js')
};

// Route'ga kelganda faqat o'sha fayl yuklani
router.on('navigate', async (page) => {
  const module = await routes[page]();
  module.render();
});
\`\`\`

### I. Bundle Size Monitoring

\`\`\`javascript
// package.json'da:
{
  "scripts": {
    "analyze": "webpack-bundle-analyzer dist/bundle.js"
  }
}

// Qaysi fayl eng katashi bilish uchun
// webpack-visualizer, source-map-explorer ishlatish
\`\`\`

### J. Caching Strategies

\`\`\`javascript
// 1. Browser cache (HTTP headers)
// Cache-Control: max-age=31536000

// 2. Service Worker cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 3. LocalStorage cache
const getCached = (key, ttl) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  const { data, timestamp } = JSON.parse(item);
  if (Date.now() - timestamp > ttl) return null;
  return data;
};
\`\`\`

### K. Memory Leak Oldini Olish

\`\`\`javascript
// ❌ XATO - Memory leak
class Component {
  constructor() {
    window.addEventListener('resize', () => this.onResize());
  }
  onResize() { console.log('resized'); }
}

// ✅ TO'G'RI - Event listener olib tashlash
class Component {
  constructor() {
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
  }
  onResize() { console.log('resized'); }
  destroy() {
    window.removeEventListener('resize', this.onResize);
  }
}
\`\`\`

### L. Performance Monitoring

\`\`\`javascript
// Performance API
performance.mark('start');
// ... code
performance.mark('end');
performance.measure('operation', 'start', 'end');

const measures = performance.getEntriesByType('measure');
console.log(measures[0].duration); // ms

// Yoki:
console.time('operation');
// ... code
console.timeEnd('operation');
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Debounce/Throttle'ni shunaqa qilmagan:**
   - Search inputida har harfda API so'rov
   - Scroll'da har pixel'da render

2. **Lazy loading'da placeholder yo'q:**
   - Rasmlar kelguncha tik bo'sh qoladi

3. **Memory leaks:**
   - Event listener'larni olib tashlamamgan

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Debounce nima va qachon kerak?</summary>
Funksiyani oxirgi chaqiriqdan keyin kutish. Qidiruv inputida kerak.
</details>

<details>
<summary>2. Throttle nima va qachon kerak?</summary>
Vaqt oralig'ida bir marta chaqirish. Scroll event'larda kerak.
</details>

<details>
<summary>3. Lazy loading nima?</summary>
Resurslarni faqat kerak bo'lganda yuklash (rasm ko'rinavchi bo'lganda).
</details>

<details>
<summary>4. Memoization nima?</summary>
Funksiya natijasini kesh qilish, keyin tez qaytarish.
</details>

<details>
<summary>5. Virtual Scrolling nima?</summary>
10,000+ elementda faqat ko'rinavchi elementlarni render qilish.
</details>

<details>
<summary>6. Code splitting nima?</summary>
Katta bundle'ni kichik fayllarga bo'lish, kerak bo'lganda yuklash.
</details>

<details>
<summary>7. RAF (requestAnimationFrame) nima?</summary>
Monitor tezligiga mos animatsiya (setInterval bilan o'rniga).
</details>

<details>
<summary>8. Service Worker cache nima?</summary>
Offline'da ham sayt ishlay olishi uchun cache.
</details>

<details>
<summary>9. Memory leak nima?</summary>
Event listener'larni olib tashlamamsa, xotira oshib turadi.
</details>

<details>
<summary>10. performance.measure() nima?</summary>
Kodning ishlash vaqtini o'lchash.
</details>

<details>
<summary>11. Bundle size monitoring nima?</summary>
Qaysi fayl eng katashini bilish va optimize qilish.
</details>

<details>
<summary>12. HTTP caching nima?</summary>
Browser fayl keshlasin deb serverdan so'rash (Cache-Control header).
</details>`,
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
    }
  ]
};

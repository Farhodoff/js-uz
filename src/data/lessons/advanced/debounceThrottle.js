export const debounceThrottle = {
  id: "debounceThrottle",
  title: "Debounce va Throttle: Hodisalarni Optimal Boshqarish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Debounce va Throttle nima?
* **Debounce (Kechiktirish/Guruhlash):** Tez-tez takrorlanadigan hodisalarni guruhlab, ular butunlay to'xtagandan keyin ma'lum bir vaqt (delay) o'tib, funksiyani faqat bir marta ishga tushirish mexanizmi.
* **Throttle (Bo'g'ish/Cheklash):** Hodisalar qanchalik tez-tez sodir bo'lishidan qat'i nazar, funksiyani ma'lum bir vaqt oralig'ida (interval) ko'pi bilan 1 marta bajarilishini ta'minlash mexanizmi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ko'p qavatli uydagi liftni** chaqiryapsiz:
* **Debounce usuli:** Lift eshigi ochiq turibdi. Kimdir kelib tugmani bossa, lift eshigi yopilishi yana 5 soniyaga kechikadi. Yana kimdir kelsa, eshik yana 5 soniya yopilmaydi. Lift faqat odamlar kelishi to'xtab, 5 soniya davomida hech kim tugmani bosmagandan keyingina harakatni boshlaydi.
* **Throttle usuli:** Lift har 10 soniyada bir marta pastga tushadi. Liftga odamlar qanchalik tez kelib tugmani bosishidan qat'i nazar, u faqat belgilangan vaqtda (har 10 soniyada) 1 marta harakatlanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy Debounce)
Foydalanuvchi qidiruv maydoniga yozishni tugatgandan so'ng 500ms o'tgach ishga tushuvchi debounce:
\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Har safar yangi chaqiruv bo'lganda eski taymerni o'chiramiz
    clearTimeout(timeoutId);
    
    // Yangi taymer o'rnatamiz
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Ishlatilishi:
const handleSearch = debounce((query) => {
  console.log("API so'rov yuborilmoqda:", query);
}, 500);

// Foydalanuvchi tez-tez yozmoqda:
handleSearch("j");
handleSearch("ja");
handleSearch("jav"); // Faqat shu chaqiruvdan keyin 500ms o'tib konsolga chiqadi
\`\`\`

### 2. Intermediate Example (Oddiy Throttle)
Scroll (aylantirish) hodisasi yuz berganda har 200ms da faqat 1 marta ishlovchi throttle:
\`\`\`javascript
function throttle(func, limit) {
  let inThrottle = false;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      // Belgilangan vaqt tugagach blokni ochamiz
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Ishlatilishi:
const handleScroll = throttle(() => {
  console.log("Sahifa scroll holati tekshirilmoqda:", window.scrollY);
}, 200);

window.addEventListener("scroll", handleScroll);
\`\`\`

### 3. Advanced Example (Leading Edge Debounce)
Tugma birinchi marta bosilganda funksiyani darhol bajaradigan va foydalanuvchi ketma-ket bosaverganda delay tugaguncha boshqa chaqiruvlarni bloklaydigan debounce (Double Submission oldini olish uchun):
\`\`\`javascript
function debounceAdvanced(func, delay, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func.apply(context, args);
    }, delay);
    
    if (callNow) {
      func.apply(context, args);
    }
  };
}

// Ishlatilishi (immediate = true):
const sendPayment = debounceAdvanced(() => {
  console.log("To'lov yuborildi!");
}, 2000, true);
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **UI Muzlab qolishi (Lagging UI):** \`scroll\`, \`resize\`, \`mousemove\` kabi hodisalar soniyasiga yuzlab marta sodir bo'ladi. Agar ularga og'ir DOM manipulyatsiyasi yoki hisob-kitoblar bog'langan bo'lsa, brauzer freym tezligi (FPS) tushib ketadi va sahifa qotib qoladi.
* **Serverga keraksiz yuklama (Overwhelming Server):** Foydalanuvchi klaviaturada yozganda (Autocomplete) har bir harf uchun API so'rov yuborilsa, serverga juda ko'p yuklama tushadi va 429 (Too Many Requests) xatoligi kelib chiqadi.
* **Double Submission:** Foydalanuvchi "To'lash" yoki "Yuborish" tugmasini tez-tez 2-3 marta bosib yuborganida serverda ma'lumotlar dublikat bo'lib qoladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Debounce funksiyasini Event Listener ichida yaratish
#### Xato:
\`\`\`javascript
// Noto'g'ri! Har safar scroll bo'lganda yangi debounce va yangi timeout yaratiladi
window.addEventListener('scroll', () => {
  debounce(() => console.log('Scroll!'), 300)();
});
\`\`\`
#### To'g'ri usul:
\`\`\`javascript
// Debounced funksiyani oldindan yaratib, keyin referensini uzatish kerak
const processScroll = debounce(() => console.log('Scroll!'), 300);
window.addEventListener('scroll', processScroll);
\`\`\`

### 2. \`this\` konteksti va argumentlarni yo'qotib qo'yish
#### Xato:
\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(); // Argumentlar va 'this' yo'qoldi!
    }, delay);
  };
}
\`\`\`
#### To'g'ri usul:
\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args); // Kontekst va argumentlar saqlanadi
    }, delay);
  };
}
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Debounce nima?
   * **Javob:** Ketma-ket kelayotgan tezkor chaqiriqlarni guruhlab, harakatlar tugagach ma'lum vaqt o'tgandan keyin faqat oxirgisini bajarish mexanizmi.
2. **Savol:** Throttle nima?
   * **Javob:** Hodisalar qanchalik ko'p bo'lmasin, ularning bajarilishini ma'lum vaqt oralig'ida faqat 1 marta bilan cheklash usuli.
3. **Savol:** Qidiruv inputiga (Search input) qaysi biri qo'llaniladi?
   * **Javob:** Debounce qo'llaniladi, chunki foydalanuvchi yozishdan to'xtagach so'rov yuborish mantiqiyroq.
4. **Savol:** Scroll hodisasida nega debounce emas, ko'pincha throttle tanlanadi?
   * **Javob:** Chunki scroll paytida foydalanuvchiga ekran kontenti silliq yangilanishi kerak. Debounce scroll tugamaguncha yangilamay turadi, bu esa noqulaylik tug'diradi.

### Middle (5–8)
5. **Savol:** Debounce va Throttle o'rtasidagi asosiy farq nima?
   * **Javob:** Debounce oxirgi chaqiriqdan keyin ma'lum muddat kutadi (taymer har safar yangilanadi). Throttle esa birinchi chaqiriqni bajarib, ma'lum muddatga yangilarini bloklab qo'yadi va taymer tugagach yana ochadi.
6. **Savol:** Debounce-da \`clearTimeout\` nima uchun kerak?
   * **Javob:** Eski rejalashtirilgan funksiya chaqirilishini bekor qilish va kechikish vaqtini yangidan hisoblash uchun kerak.
7. **Savol:** Leading edge debounce nima va u trailing edge-dan nimasi bilan farq qiladi?
   * **Javob:** Leading edge funksiyani hodisa boshlanishi bilan darhol bajaradi va keyingilarini bloklaydi. Trailing edge esa (default) hodisalar tugashini kutib, oxirida bajaradi.
8. **Savol:** Throttle-ni setTimeout o'rniga qanday usul bilan optimallashtirish mumkin?
   * **Javob:** Vaqt tamg'alari (\`Date.now()\`) farqini hisoblash yoki animatsiyalar uchun \`requestAnimationFrame\` ishlatish orqali.

### Senior (9–12)
9. **Savol:** Debounce/Throttle-da xotira sizib chiqishi (memory leak) qanday yuz berishi mumkin?
   * **Javob:** Agar komponent o'chib ketganda (unmount) taymerlar (\`clearTimeout\`) tozalanmasa, yopilishlar (closures) tufayli DOM elementlari xotirada qolib ketadi.
10. **Savol:** \`requestAnimationFrame\` yordamida qanday qilib throttle-ga o'xshash effekt yaratish mumkin va uning afzalligi nimada?
    * **Javob:** Brauzerning har safar ekranni yangilash sikliga (60fps) moslab funksiyani chaqiradi, bu layout thrashing-ni kamaytiradi va scroll/animationlarni o'ta silliq qiladi.
11. **Savol:** Underscore/Lodash kutubxonalaridagi debounce va throttle funksiyalarida qanday qo'shimcha imkoniyatlar bor?
    * **Javob:** Ularda \`leading\`, \`trailing\` opsiyalari hamda faol taymerni bekor qiluvchi \`.cancel()\` metodi mavjud.
12. **Savol:** Debounce funksiyasini custom React hook shaklida qanday yozish mumkin va qanday muammoga e'tibor berish kerak?
    * **Javob:** Har renderda funksiya qayta yaratilmasligi uchun \`useCallback\` yoki \`useRef\` ishlatish shart, aks holda debounce ishlamaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Infinite Scroll (Cheksiz Scroll) optimallashtirish
Foydalanuvchi sahifa oxiriga yaqinlashganda yangi postlarni yuklashimiz kerak. Agar oddiy scroll ishlatilsa, u har 1-2 pikselda serverga so'rov jo'natishi mumkin.

#### Yechim (Throttled Scroll Listener):
\`\`\`javascript
class InfiniteScroll {
  constructor(container, loadMoreCallback) {
    this.container = container;
    this.loadMore = loadMoreCallback;
    this.isLoading = false;
    
    // Throttled funksiyani bog'laymiz
    this.scrollHandler = this.throttle(this.checkScrollPosition.bind(this), 150);
    window.addEventListener('scroll', this.scrollHandler);
  }

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  checkScrollPosition() {
    if (this.isLoading) return;
    
    const threshold = 300; // Ekranning pastidan 300px qolganda yuklash
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;
    
    if (position >= height - threshold) {
      this.isLoading = true;
      console.log("Yangi postlar yuklanmoqda...");
      this.loadMore().finally(() => {
        this.isLoading = false;
      });
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **rAF (requestAnimationFrame) ishlatish:** Agar throttle faqat vizual o'zgarishlar (animatsiyalar, scroll elementlarini surish) uchun ishlatilayotgan bo'lsa, \`requestAnimationFrame\` eng yaxshi va optimal yechim hisoblanadi.
* **Kechikish vaqtini (delay/limit) to'g'ri sozlash:** Qidiruv inputlarida 300ms–500ms, scroll/resize uchun esa 100ms–200ms oralig'i foydalanuvchi tajribasi (UX) uchun eng optimal hisoblanadi.

---

## 10. 📌 Cheat Sheet

| Metod | Rejimi | Qachon ishlatiladi | Xususiyati |
| :--- | :--- | :--- | :--- |
| **Debounce** | \`trailing\` (default) | Qidiruv (Autocomplete), avtomatik saqlash (Auto-save) | Chaqirishlar tugagandan keyin 1 marta ishlaydi |
| **Debounce** | \`leading\` | Tugma bosish (Submit/Payment buttons) | Birinchi marta darhol ishlaydi, keyingilarini bloklaydi |
| **Throttle** | - | Scroll, Resize, Mousemove, O'yin boshqaruvlari | Tez-tez chaqiruvlarni ma'lum vaqt oralig'ida bo'lib beradi |
| **rAF** | - | Faqat ekran chizilishi bilan bog'liq vizual hodisalar | Brauzer yangilanish chastotasi (odatda 60Hz) bilan sinxron ishlaydi |
`,
  exercises: [
    {
      id: 1,
      title: "Taymerni kechiktirish",
      instruction: "setTimeout yordamida 'hello' funksiyasini 100ms keyin chaqiring.",
      startingCode: "function hello() {\n  console.log('hi');\n}\n// Kodni yozing\n",
      hint: "setTimeout(hello, 100);",
      test: "if (code.includes('setTimeout')) return null; return 'setTimeout ishlatilmadi';"
    },
    {
      id: 2,
      title: "Taymerni bekor qilish",
      instruction: "Yaratilgan taymerni bekor qiling, toki u ishga tushib ketmasin.",
      startingCode: "const timerId = setTimeout(() => console.log('not run'), 500);\n// Kodni yozing\n",
      hint: "clearTimeout(timerId);",
      test: "if (code.includes('clearTimeout')) return null; return 'clearTimeout ishlatilmadi';"
    },
    {
      id: 3,
      title: "Debounce qobig'i",
      instruction: "Boshqa funksiyani qaytaradigan oddiy debounce wrapper funksiyasi qobig'ini yozing.",
      startingCode: "function debounce(func) {\n  return function() {\n    // Wrapper\n  };\n}\n",
      hint: "return function() { ... }",
      test: "if (code.includes('return function')) return null; return 'Wrapper funksiya qaytarilmadi';"
    },
    {
      id: 4,
      title: "Sodda Debounce Yarating",
      instruction: "Berilgan delay bo'yicha ishlaydigan va har safar chaqirilganda eski taymerni bekor qiladigan debounce funksiyasini yozing.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  return function() {\n    // Kodni yozing\n  };\n}\n",
      hint: "clearTimeout(timeoutId); timeoutId = setTimeout(func, delay);",
      test: "if (code.includes('clearTimeout') && code.includes('setTimeout')) return null; return 'clearTimeout yoki setTimeout xato ishlatildi';"
    },
    {
      id: 5,
      title: "Argumentlar bilan Debounce",
      instruction: "Debounce qilingan funksiyaga barcha kelgan argumentlar yetib borishini ta'minlang.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    // dynamic args o'tkazing\n  };\n}\n",
      hint: "timeoutId = setTimeout(() => func(...args), delay);",
      test: "if (code.includes('...args')) return null; return 'Argumentlar uzatilmadi';"
    },
    {
      id: 6,
      title: "Context (this) bilan Debounce",
      instruction: "Original funksiya chaqirilganda funksiya konteksti (this) buzilmasligini apply yordamida ta'minlang.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      // Kodni yozing\n    }, delay);\n  };\n}\n",
      hint: "func.apply(this, args);",
      test: "if (code.includes('apply')) return null; return 'apply() ishlatilmadi';"
    },
    {
      id: 7,
      title: "Throttle qobig'i",
      instruction: "Harakatlarni cheklaydigan throttle funksiyasining boshlang'ich qobig'ini yozing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle = false;\n  return function() {\n    // Wrapper\n  };\n}\n",
      hint: "return function() { ... }",
      test: "if (code.includes('return function')) return null; return 'Wrapper funksiya qaytarilmadi';"
    },
    {
      id: 8,
      title: "Flag-based Throttle",
      instruction: "InThrottle flagi yordamida belgilangan vaqtda faqat bir marta ishlaydigan throttle funksiyasini yozing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle = false;\n  return function() {\n    if (!inThrottle) {\n      func();\n      // inThrottle ni yoqing va vaqt tugagach o'chiring\n    }\n  };\n}\n",
      hint: "inThrottle = true; setTimeout(() => inThrottle = false, limit);",
      test: "if (code.includes('inThrottle = true') && code.includes('false')) return null; return 'Throttle flag boshqaruvi xato';"
    },
    {
      id: 9,
      title: "Throttle parametr uzatish",
      instruction: "Throttled funksiyaga dynamic argumentlarni apply yordamida xavfsiz o'tkazing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      // apply orqali context va args o'tkazing\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n",
      hint: "func.apply(this, args);",
      test: "if (code.includes('apply')) return null; return 'apply yoki args xato';"
    },
    {
      id: 10,
      title: "Immediate Debounce",
      instruction: "Debounce qilingan funksiyani kutishdan oldin birinchi chaqiriqda darhol chaqiradigan 'immediate' parametrini qo'shing.",
      startingCode: "function debounce(func, delay, immediate = false) {\n  let timeoutId;\n  return function(...args) {\n    const callNow = immediate && !timeoutId;\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      timeoutId = null;\n      if (!immediate) func.apply(this, args);\n    }, delay);\n    if (callNow) func.apply(this, args);\n  };\n}\n",
      hint: "Konstruktsiya berilgan, uni o'rganing va return null qaytarish uchun kodni yuboring",
      test: "if (code.includes('immediate')) return null; return 'Immediate qo\\'llanilmagan';"
    },
    {
      id: 11,
      title: "Cancelable Debounce",
      instruction: "Debounce funksiyaga uni muddatidan oldin bekor qiluvchi '.cancel()' metodini qo'shing.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  const debounced = function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n  // debounced.cancel metodini yarating\n  return debounced;\n}\n",
      hint: "debounced.cancel = () => clearTimeout(timeoutId);",
      test: "if (code.includes('.cancel')) return null; return 'cancel metodi qo\\'shilmadi';"
    },
    {
      id: 12,
      title: "Custom Throttle trailing",
      instruction: "Throttled funksiyada limit oralig'idagi oxirgi chaqiruv ham saqlanib qolib bajarilishini ta'minlovchi trailing opsiyasini tekshiring.",
      startingCode: "function throttleTrailing(func, limit) {\n  let timeoutId = null;\n  let lastArgs = null;\n  return function(...args) {\n    lastArgs = args;\n    if (!timeoutId) {\n      timeoutId = setTimeout(() => {\n        func.apply(this, lastArgs);\n        timeoutId = null;\n      }, limit);\n    }\n  };\n}\n",
      hint: "Berilgan kodni tekshirish uchun topshiring.",
      test: "if (code.includes('timeoutId = null')) return null; return 'Trailing mantiqi xato';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Bekor qilinuvchi Debounce (debounceWithCancel)",
      instruction: "Debounce qilingan funksiyaga `.cancel()` metodini qo'shib, rejalashtirilgan so'nggi chaqiruvni bekor qilishni amalga oshiring.",
      startingCode: "function debounceWithCancel(func, delay) {\n  let timeoutId;\n  const debounced = function(...args) {\n    // Kodni shu yerdan yozing\n  };\n  // debounced.cancel metodini yozing\n  return debounced;\n}\n",
      hint: "const debounced = function(...args) { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(this, args), delay); }; debounced.cancel = () => clearTimeout(timeoutId); return debounced;",
      test: "if (typeof debounceWithCancel !== 'function') return 'debounceWithCancel funksiya emas';\nlet count = 0;\nconst f = () => count++;\nconst d = debounceWithCancel(f, 50);\nd(); d(); d.cancel();\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (count === 0) resolve(null);\n    else resolve('Debounce bekor qilinmadi, funksiya baribir ishladi');\n  }, 100);\n});"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ requestAnimationFrame orqali Throttle (rAFThrottle)",
      instruction: "Scroll va mousemove kabi visual hodisalar unumdorligini oshirish uchun funksiyani `requestAnimationFrame` yordamida throttle qiluvchi `rAFThrottle(func)` funksiyasini yozing.",
      startingCode: "function rAFThrottle(func) {\n  let ticked = false;\n  return function(...args) {\n    // Kodni shu yerdan yozing\n  };\n}\n",
      hint: "return function(...args) { if (!ticked) { ticked = true; requestAnimationFrame(() => { func.apply(this, args); ticked = false; }); } };",
      test: "if (typeof rAFThrottle !== 'function') return 'rAFThrottle funksiya emas';\nlet count = 0;\nconst f = () => count++;\nconst t = rAFThrottle(f);\nt(); t(); t();\nreturn new Promise(resolve => {\n  requestAnimationFrame(() => {\n    if (count === 1) resolve(null);\n    else resolve('rAFThrottle funksiyasi kadr ichida faqat 1 marta ishlashi kerak edi, lekin ish soni: ' + count);\n  });\n});"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Debounce nima?",
    "options": [
      "Ketma-ket chaqirilgan funksiyalarning faqat birinchisini darhol bajaradigan mexanizm",
      "Ketma-ket chaqirilayotgan funksiyalar to'xtagandan keyin, ma'lum bir kechikish vaqti (delay) o'tgachgina funksiyani 1 marta ishga tushiradigan usul",
      "Funksiyani har doim ma'lum bir vaqt oralig'ida (masalan, har 100ms da) majburiy ishga tushiradigan usul",
      "Xotiradagi o'zgaruvchilarni keshlovchi maxsus decorator"
    ],
    "correctAnswer": 1,
    "explanation": "Debounce ketma-ket takrorlanadigan tezkor hodisalarni guruhlaydi va hodisalar to'xtagandan keyin ma'lum bir vaqt o'tishini kutib, so'ngra faqat oxirgi chaqiruvni bajaradi."
  },
  {
    "id": 2,
    "question": "Throttle nima?",
    "options": [
      "Funksiyaning bajarilishini butunlay bekor qiluvchi operator",
      "Faqat oxirgi chaqiruvni bajaradigan va oldingilarini o'chiradigan taymer",
      "Tez-tez sodir bo'ladigan hodisalarga qaramasdan, funksiyani ma'lum bir vaqt oralig'ida (interval) ko'pi bilan 1 marta bajarilishini ta'minlaydigan mexanizm",
      "Faqat xatolar yuz berganda ishlaydigan qayta sinash (retry) algoritmi"
    ],
    "correctAnswer": 2,
    "explanation": "Throttle (bo'g'ish/cheklash) tez-tez chaqiriladigan hodisani ma'lum bir vaqt oralig'ida faqat bir marta ishlashini ta'minlash orqali yuklamani kamaytiradi."
  },
  {
    "id": 3,
    "question": "Qidiruv maydoniga (Search input) foydalanuvchi yozayotgan vaqtda API ga so'rov yuborishni optimallashtirish uchun qaysi biri ma'qulroq?",
    "options": [
      "Throttle, chunki u har bir harfda so'rov yuboradi",
      "Hech qaysisi, chunki fetch o'zi optimallashtirilgan",
      "Debounce, chunki foydalanuvchi yozishdan to'xtagandagina API so'rov yuborilishi kerak",
      "Sinxron callback"
    ],
    "correctAnswer": 2,
    "explanation": "Foydalanuvchi yozayotgan paytda har bir harf uchun serverga so'rov yubormaslik uchun debounce ishlatiladi. Foydalanuvchi yozishdan to'xtagach (masalan, 500ms yozmay turganda) so'rov ketadi."
  },
  {
    "id": 4,
    "question": "Scroll (aylantirish) va Resize (oyna o'lchamini o'zgartirish) kabi yuqori chastotali hodisalarda ekrandagi elementlarni silliq va bir xil vaqtda yangilash uchun qaysi biri mos keladi?",
    "options": [
      "Throttle, chunki u hodisa davom etayotganda ham ma'lum vaqt oralig'ida (masalan, har 150ms da) yangilab turadi",
      "Debounce, chunki scroll butunlay to'xtagandan keyin yangilansa yetarli",
      "setTimeout-ni oddiy recursive chaqirish",
      "try/catch bloki"
    ],
    "correctAnswer": 0,
    "explanation": "Scroll hodisasida debounce ishlatilsa, scroll davom etayotganda ekran yangilanmay qotib qoladi va faqat scroll to'xtaganda sakrab yangilanadi. Throttle esa scroll paytida ham ma'lum intervalda yangilab boradi."
  },
  {
    "id": 5,
    "question": "Debounce funksiyasida `clearTimeout(timeoutId)` chaqirilishining asosiy maqsadi nima?",
    "options": [
      "Brauzer keshini tozalash",
      "Oldingi rejalashtirilgan bajarilishni bekor qilish va taymerni yangidan boshlash",
      "Funksiya parametrlarini o'chirish",
      "Xotirani majburiy bo'shatish (garbage collection)"
    ],
    "correctAnswer": 1,
    "explanation": "Debounce-da har safar yangi hodisa sodir bo'lganda, `clearTimeout` yordamida eski rejalashtirilgan `setTimeout` bekor qilinadi va yangi taymer o'rnatiladi. Natijada kechikish davri boshidan boshlanadi."
  },
  {
    "id": 6,
    "question": "Agar debounce kechikish vaqti 300ms bo'lsa va foydalanuvchi har 200ms da tugmani bossa, funksiya necha marta bajariladi?",
    "options": [
      "Har bir bosishda bajariladi",
      "Har 200ms da 1 marta bajariladi",
      "Faqat foydalanuvchi tugma bosishni to'xtatgandan keyin 300ms o'tib, 1 marta bajariladi",
      "Hech qachon bajarilmaydi"
    ],
    "correctAnswer": 2,
    "explanation": "Chaqiruvlar oralig'i (200ms) debounce delayidan (300ms) kam bo'lgani uchun taymer har safar tozalanaveradi va faqat eng oxirgi bosishdan keyin 300ms o'tgach 1 marta ishlaydi."
  },
  {
    "id": 7,
    "question": "Quyidagi kodda nima xatolik bor?\n```javascript\nwindow.addEventListener('resize', () => {\n  debounce(() => console.log('Resized'), 300)();\n});\n```",
    "options": [
      "resize hodisasida debounce ishlatib bo'lmaydi",
      "Har resize hodisasi sodir bo'lganda yangi debounced funksiya yaratilmoqda va eski taymerlar saqlanib qolmayapti. Natijada debounce ishlamaydi",
      "Callback funksiyaga arrow funksiya berilgan",
      "Kechikish vaqti millisekundda berilmagan"
    ],
    "correctAnswer": 1,
    "explanation": "Debounce closure (yopiq muhit) hosil qilib, `timeoutId`ni o'zida saqlashi kerak. Har event sodir bo'lganda debounce-ni qayta yaratish xato. To'g'ri usul: `const process = debounce(...); window.addEventListener('resize', process);`"
  },
  {
    "id": 8,
    "question": "Throttle implementatsiyasida cheklovni tekshirish uchun odatda nima ishlatiladi?",
    "options": [
      "Promise.race",
      "Flag o'zgaruvchisi (masalan, `inThrottle` true/false yoki oxirgi chaqiruv vaqti logikasi)",
      "Window.location",
      "localStorage"
    ],
    "correctAnswer": 1,
    "explanation": "Throttle-da asosan `inThrottle` yoki `isWaiting` kabi boolean flag yoki oxirgi bajarilish vaqtining farqidan foydalanib, yangi chaqiruvni bloklash yoki o'tkazish hal qilinadi."
  },
  {
    "id": 9,
    "question": "Leading edge (yoki immediate) debounce nima?",
    "options": [
      "Faqat xatolar bilan ishlaydigan debounce turi",
      "Birinchi chaqiruvni darhol (kechikishsiz) bajaradigan va keyingi tezkor chaqiriqlarni delay tugaguncha bloklaydigan rejim",
      "Faqat oxirgi elementlarni o'chirish usuli",
      "Animatsiyalar uchun mo'ljallangan maxsus sinxron loop"
    ],
    "correctAnswer": 1,
    "explanation": "Leading-edge (immediate) rejimida foydalanuvchi tugmani birinchi marta bosganda funksiya darhol ishlaydi, so'ngra belgilangan muddat davomida takroriy bosishlar e'tiborsiz qoldiriladi. Bu tugmani ikki marta bosib yuborish (double submission) oldini oladi."
  },
  {
    "id": 10,
    "question": "Quyidagilardan qaysi biri debounce va throttle-ning asosiy afzalligi hisoblanadi?",
    "options": [
      "Sahifaning yuklanish tezligini (Initial Load) oshirish",
      "Hodisalarning ishlash chastotasini kamaytirish orqali CPU va tarmoq yuklamasini kamaytirish, UI unumdorligini oshirish",
      "CSS kodlarini avtomatik siqish (minify)",
      "Veb-sayt xavfsizligini ta'minlash"
    ],
    "correctAnswer": 1,
    "explanation": "Debounce va Throttle hodisalar (scroll, input, resize, mousemove) chastotasini boshqarib, keraksiz hisob-kitoblar va API so'rovlarini kamaytiradi, natijada sahifaning ishlashi yaxshilanadi."
  },
  {
    "id": 11,
    "question": "Agar bizga foydalanuvchi klaviaturani tez-tez bosib turgan paytda ham har 1 soniyada oraliq natijani serverga yuborib turish kerak bo'lsa, qaysi birini ishlatgan ma'qul?",
    "options": [
      "Debounce (1 soniya)",
      "Throttle (1 soniya)",
      "Oddiy sinxron setInterval",
      "Hech qanday cheklovsiz to'g'ridan-to'g'ri yuborish"
    ],
    "correctAnswer": 1,
    "explanation": "Throttle ma'lum bir intervalda (masalan, har 1 soniyada) kamida bir marta ishga tushishni kafolatlaydi, debounce esa yozish to'xtamaguncha kutib turaveradi."
  },
  {
    "id": 12,
    "question": "Debounce va Throttle yordamida qaysi brauzer xatoliklarini (errors) kamaytirish yoki oldini olish mumkin?",
    "options": [
      "SyntaxError (Sintaktik xatolar)",
      "Page freezing (Sahifa muzlab qolishi) va keraksiz API so'rovlari tufayli serverning 429 (Too Many Requests) xatoligi berishi",
      "CORS (Cross-Origin Resource Sharing)",
      "NullPointerException"
    ],
    "correctAnswer": 1,
    "explanation": "Tezkor API so'rovlarini cheklash orqali serverga tushayotgan yuk kamayadi (429 xatosining oldi olinadi) hamda og'ir DOM manipulyatsiyalarini cheklash orqali sahifa qotib qolishining oldi olinadi."
  }
]

};

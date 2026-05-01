export const performanceOptimization = {
  id: "a17",
  title: "Performance Optimization (Debounce & Throttle)",
  theory: `## 1. KIRISH
Tasavvur qiling, foydalanuvchi qidiruv inputiga har bir harfni yozganda serverga so'rov ketyapti. Agar u "JavaScript" deb yozsa, 10 marta so'rov ketadi. Bu serverni va brauzerni keraksiz yuklama bilan charchatadi.

## 2. TUSHUNCHA

### Debounce
Funksiyani chaqirishni "kechiktiradi". Agar foydalanuvchi yozishdan to'xtasa, ma'lum vaqt (masalan 500ms) o'tgach funksiya bir marta ishlaydi.
**Metafora:** Lift eshigi - har safar yangi odam kelsa, lift kutishni boshidan boshlaydi. Hech kim kelmay qo'ygandan keyingina lift yuradi.

### Throttle
Funksiyani ma'lum bir vaqt oralig'ida (masalan har 1000ms da) faqat bir marta ishlashga majbur qiladi.
**Metafora:** Avtobus bekati - odamlar qancha ko'p kelishidan qat'i nazar, avtobus faqat jadval bo'yicha (masalan 15 daqiqada bir marta) keladi.

---

## 3. KOD MISOLLARI

### Misol 1 — Debounce (Qidiruv uchun)
\`\`\`javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const search = debounce((text) => {
  console.log("Serverga so'rov:", text);
}, 500);

search("J");
search("Ja");
search("Jav"); // Faqat oxirgi "Jav" uchun so'rov ketadi
\`\`\`

### Misol 2 — Throttle (Scroll uchun)
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

const onScroll = throttle(() => {
  console.log("Sahifa siljidi!");
}, 1000);
\`\`\`

### Misol 3 — Lazy Loading (Kechikib yuklash) ⭐
**Maqsad:** Resurslarni (rasmlar, modullar) faqat kerak bo'lganda yuklash.
\`\`\`javascript
// Rasm ko'rinishga kelganda yuklash
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Asl rasmni yuklash
      observer.unobserve(img);
    }
  });
});
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Lazy Loading Oqimi
\`\`\`mermaid
sequenceDiagram
    Foydalanuvchi->>Sahifa: Pastga scroll qiladi
    Sahifa->>IntersectionObserver: Rasm ko'rindimi?
    IntersectionObserver-->>Sahifa: Ha, ko'rindi!
    Sahifa->>Server: Rasmni yuklab ber
    Server-->>Foydalanuvchi: Rasm ko'rinadi
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Debounce va Throttle farqi nima?** - Debounce oxirgi chaqiriqdan keyin kutadi, Throttle esa vaqt oralig'ida faqat bir marta ishlashni kafolatlaydi.
2. **Qidiruv inputiga qaysi biri mos?** - Debounce, chunki foydalanuvchi yozib bo'lishini kutishimiz kerak.
3. **O'yinlarda (masalan, o'q uzish) qaysi biri mos?** - Throttle, chunki ma'lum tezlikdan tez o'q otib bo'lmasligi kerak.

---

## 6. MINI LOYIHA: "Smart Search"
**Vazifa:** Debounce yordamida foydalanuvchi yozishini optimallashtiring.

\`\`\`javascript
let callCount = 0;
const expensiveFn = () => {
  callCount++;
  console.log("API chaqirildi: " + callCount);
};

const optimizedSearch = debounce(expensiveFn, 300);

// Foydalanuvchi tez yozmoqda...
optimizedSearch();
optimizedSearch();
optimizedSearch();
// Faqat 1 marta log chiqadi!
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Debounce yaratish",
      instruction: "setTimeout yordamida 500ms kechikuvchi oddiy funksiya yozing.",
      startingCode: "function simpleLog() {\n  // 500ms kutib keyin log chiqaring\n}\n",
      hint: "setTimeout(() => console.log('OK'), 500)",
      test: "if (code.includes('setTimeout')) return null; return 'setTimeout ishlating';"
    }
  ]
};

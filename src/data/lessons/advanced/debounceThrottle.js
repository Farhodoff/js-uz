export const debounceThrottle = {
  id: "debounceThrottle",
  title: "Debounce va Throttle: Hodisalarni Optimal Boshqarish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Debounce va Throttle nima?
* **Debounce (Kechiktirish/Guruhlash):** Tez-tez takrorlanadigan hodisalarni guruhlab, ular butunlay to'xtagandan keyin ma'lum bir vaqt (delay) o'tib, funksiyani faqat bir marta ishga tushirish mexanizmi.
* **Throttle (Bo'g'ish/Cheklash):** Hodisalar qanchalik tez-tez sodir bo'lishidan qat'i nazar, funksiyani ma'lum bir vaqt oralig'ida (interval) ko'pi bilan 1 marta bajarilishini ta'minlash mexanizmi.

### Real hayotiy analogiya
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
    "id": 1,
    "title": "Debounce implementatsiyasi",
    "instruction": "Berilgan `func` funksiyasini `delay` millisekund davomida qayta chaqirilmasa keyin ishga tushiradigan `debounce(func, delay)` funksiyasini yozing.",
    "startingCode": "function debounce(func, delay) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Qaytadigan funksiya ichida har safar chaqirilganda `clearTimeout` yordamida oldingi taymerni o'chiring va yangi `setTimeout` o'rnating.",
    "test": "const sandbox = new Function(code + '; return debounce;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'debounce funksiyasi aniqlanmadi';\nlet counter = 0;\nconst d = fn(() => counter++, 50);\nd();\nd();\nreturn new Promise((resolve) => {\n  setTimeout(() => {\n    if (counter === 0) {\n      setTimeout(() => {\n        if (counter === 1) resolve(null);\n        else resolve('Debounce kechikishdan keyin ham ishga tushmadi yoki noto\\'g\\'ri marta ishladi');\n      }, 80);\n    } else {\n      resolve('Debounce funksiyasi belgilangan vaqtdan oldin chaqirib yuborildi');\n    }\n  }, 20);\n});"
  },
  {
    "id": 2,
    "title": "Throttle implementatsiyasi",
    "instruction": "Berilgan `func` funksiyasini har `limit` millisekund ichida ko'pi bilan 1 marta bajarilishini ta'minlaydigan `throttle(func, limit)` funksiyasini yozing.",
    "startingCode": "function throttle(func, limit) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Bajarish mumkinligini bildiruvchi `inThrottle` yoki `flag` o'zgaruvchisidan foydalaning. Funksiya bajarilgach, ushbu flagni ma'lum bir muddatga bloklab qo'ying.",
    "test": "const sandbox = new Function(code + '; return throttle;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'throttle funksiyasi aniqlanmadi';\nlet counter = 0;\nconst t = fn(() => counter++, 50);\nt();\nt();\nt();\nif (counter !== 1) return 'Throttle birinchi chaqiruvni darhol bajarishi kerak edi va ketma-ket chaqiruvlarni bloklashi kerak edi';\nreturn new Promise((resolve) => {\n  setTimeout(() => {\n    t();\n    if (counter === 2) resolve(null);\n    else resolve('Limit muddati tugagandan so\\'ng chaqirilganda funksiya bajarilmadi');\n  }, 70);\n});"
  },
  {
    "id": 3,
    "title": "Leading Edge Debounce",
    "instruction": "Chaqirilganda funksiyani zudlik bilan (leading edge) bajaradigan va keyingi `delay` millisekund davomida boshqa chaqirilishlarni e'tiborsiz qoldiradigan `leadingDebounce(func, delay)` funksiyasini yozing.",
    "startingCode": "function leadingDebounce(func, delay) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Oddiy debouncega o'xshash, lekin taymer mavjud bo'lmaganda funksiyani darhol chaqiradi va taymer tugagandan so'ng taymer o'zgaruvchisini yana tozalaydi.",
    "test": "const sandbox = new Function(code + '; return leadingDebounce;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'leadingDebounce funksiyasi aniqlanmadi';\nlet counter = 0;\nconst d = fn(() => counter++, 50);\nd();\nd();\nif (counter !== 1) return 'Leading edge debounce birinchi chaqiruvni darhol bajarishi kerak edi';\nreturn new Promise((resolve) => {\n  setTimeout(() => {\n    d();\n    if (counter === 2) resolve(null);\n    else resolve('Kechikish vaqti tugagandan keyin yangi chaqiruv ishlamadi');\n  }, 70);\n});"
  }
]
,
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

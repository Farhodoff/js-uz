## 1. 💡 Sodda Tushuntirish va Analogiya

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
```javascript
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
```

### 2. Throttle (Skrol qilish yoki tugmani spam-klik qilishdan himoya)
Foydalanuvchi sahifani skrol qilganda koordinatalarni hisoblash funksiyasini cheklaymiz:
```javascript
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
```

### 3. DOM optimallashtirish (DocumentFragment)
DOM-ga 1000 ta elementni samarali qo'shish:
```javascript
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
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Reflow va Repaint
Brauzer sahifani render qilganda ikki bosqichni bajaradi:
1. **Reflow (Layout):** Elementlarning o'lchamlari va sahifadagi o'rnini hisoblaydi. Bu geometriya bilan bog'liq (masalan, `width`, `height`, `margin`, `padding`, `top`, `left`). Bitta elementning reflow bo'lishi butun sahifa tartibini o'zgartirib yuborishi mumkin.
2. **Repaint (Paint):** Elementlarning ko'rinishini (rangi, foni, soyasi, matn bezagi) ekranga chizadi. Geometriya o'zgarmaydi, shuning uchun Repaint ancha tezroq ishlaydi.

### 2. Garbage Collection (Xotirani tozalash)
JavaScript-da Garbage Collector (GC) xotirani boshqaradi. U **Mark-and-Sweep** algoritmini ishlatadi:
* Dasturning boshlang'ich nuqtasi (Global obyekt)dan boshlab barcha havolalar bo'ylab yurib chiqiladi va kirish imkoni bo'lgan (reachable) o'zgaruvchilar "belgilanadi" (Mark).
* Kirib bo'lmaydigan, havolasi uzilgan barcha o'zgaruvchilar xotiradan "tozalab tashlanadi" (Sweep).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Tozalanmagan Taymerlar (Intervals)
`setInterval` ishlatilgandan keyin uni tozalash esdan chiqsa, callback ichidagi o'zgaruvchilar xotirada qolib ketadi va memory leak-ga sabab bo'ladi.
```javascript
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
```

### 2. Ajralgan DOM elementlar (Detached DOM Nodes)
DOM-dan o'chirilgan elementga JavaScript o'zgaruvchisida havola saqlab qolish.
```javascript
// XATO:
let btn = document.querySelector("#my-button");
document.body.removeChild(btn);
// Tugma DOM-dan o'chdi, lekin 'btn' o'zgaruvchisi hamon uni ushlab turibdi.

// TO'G'RI:
let btn = document.querySelector("#my-button");
document.body.removeChild(btn);
btn = null; // Havolani uzib yuboramiz, GC endi buni tozalay oladi
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Debounce nima va u qayerlarda qo'llaniladi?
   * **Javob:** Debounce — ketma-ket chaqirilayotgan hodisalarni bitta so'nggi chaqiruvga birlashtirish. Qidiruv inputlarida API-ga ortiqcha so'rov yubormaslik uchun ishlatiladi.
2. **Savol:** Repaint va Reflow o'rtasidagi farq nima?
   * **Javob:** Reflow elementlarning o'lchami yoki joylashuvi o'zgarganda geometriyani qayta hisoblaydi (qimmat operatsiya). Repaint esa faqat rang va ko'rinish o'zgarganda ekranga qayta chizadi.
3. **Savol:** Nima uchun global o'zgaruvchilardan kamroq foydalanish kerak?
   * **Javob:** Global o'zgaruvchilar dastur tugaguniga qadar xotirada (RAM) saqlanib turadi va Garbage Collector ularni o'chira olmaydi.
4. **Savol:** `requestAnimationFrame` nima?
   * **Javob:** Brauzerning ekran yangilanish chastotasi bilan sinxron ravishda ishlaydigan va animatsiyalarni silliq render qiluvchi maxsus API.

### Middle
5. **Savol:** Memory Leak (Xotira oqishi) nima va uning asosiy sabablari nimalardan iborat?
   * **Javob:** Dastur endi ishlatmaydigan, lekin qandaydir sabab bilan havolasi saqlanib qolgani uchun Garbage Collector o'chira olmaydigan xotira qismlari. Asosiy sabablar: tozalanmagan taymerlar, ajralgan DOM elementlari, o'chirilmagan event listenerlar.
6. **Savol:** Nima uchun `DocumentFragment` oddiy `div` yaratib element qo'shishdan ko'ra afzalroq?
   * **Javob:** Chunki fragment DOM daraxtidan tashqarida mavjud bo'lgan xotiradagi yengil obyektdir. Unga element qo'shganda DOM Reflow bo'lmaydi va xotira kamroq sarflanadi.
7. **Savol:** Loop (sikl) ichida DOM elementlariga to'g'ridan-to'g'ri murojaat qilish unumdorlikka qanday ta'sir qiladi?
   * **Javob:** Loop ichida DOM elementini o'qish yoki yozish Reflow/Repaint-ni keltirib chiqarib, brauzerni qotishiga (jank) olib keladi. Buni loop tashqarisiga chiqarish kerak.
8. **Savol:** Event Delegation (Hodisalarni vakillash) qanday qilib unumdorlikni oshiradi?
   * **Javob:** Har bir elementga alohida listener qo'shgandan ko'ra, ularning ota elementiga bitta listener qo'shish orqali xotira sarfini keskin kamaytiradi.

### Senior
9. **Savol:** Garbage Collector-dagi 'Mark-and-Sweep' algoritmi qanday ishlaydi?
   * **Javob:** U root (global) obyektdan boshlab barcha havolalarni tekshiradi. Root-dan boshlab yetib borib bo'ladigan (reachable) obyektlarni belgilaydi (mark). Yetib bo'lmaydigan qolgan barcha obektlarni xotiradan tozalaydi (sweep).
10. **Savol:** `requestIdleCallback` nima va u qanday maqsadlarda ishlatiladi?
    * **Javob:** Brauzer bo'sh (idle) bo'lgan vaqtda bajariladigan past ustuvorlikka ega vazifalarni rejalashtirish uchun ishlatiladi (masalan, analitika yuborish).
11. **Savol:** Virtual DOM va an'anaviy DOM-ni manipulyatsiya qilish o'rtasidagi farqni tushuntiring.
    * **Javob:** Virtual DOM JS xotirasida DOM tuzilishining nusxasini saqlaydi va o'zgarishlarni hisoblab (diffing), real DOM-ga faqat o'zgargan qismlarni minimal reflow bilan yangilaydi (batching).
12. **Savol:** JavaScript-da V8 engine qanday qilib kodni optimallashtiradi va "Deoptimization" nima?
    * **Javob:** V8 tez-tez chaqiriladigan funksiyalarni ("hot functions") aniqlab, ularni to'g'ridan-to'g'ri mashina kodiga kompilyatsiya qiladi (JIT). Agar funksiyadagi o'zgaruvchi turlari o'zgarib ketsa (polymorphism), V8 uni yana sekinroq interpretatsiya rejimiga qaytaradi (Deoptimization).

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar `/Users/farhod/Desktop/github/js-uz/scratch/performanceOptimization_exercises.json` faylida berilgan. Ularni bajarib, bilimingizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Test savollari `/Users/farhod/Desktop/github/js-uz/scratch/performanceOptimization_quizzes.json` faylida joylashgan. Unda 12 ta variantli test mavjud.

---

## 8. 🎯 Real Project Case Study

### Cheksiz Skrol (Infinite Scroll) va Rasm yuklash (Lazy Loading) tizimi

Tasavvur qiling, bizda juda ko'p rasmli yangiliklar tasmasi bor. Skrol qilinganda sahifa qotib qolmasligi uchun biz ikkita narsani optimallashtiramiz:
1. `scroll` hodisasini **throttle** qilamiz.
2. Rasmlarni faqat ekran sohasiga yaqinlashganda yuklaymiz (`IntersectionObserver`).

```javascript
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
```

---

## 9. 🚀 Performance va Optimization

* **Hodisalarni cheklash:** Skrol, resize, keyup kabi tez-tez chiquvchi event-larni `debounce` yoki `throttle` qiling.
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

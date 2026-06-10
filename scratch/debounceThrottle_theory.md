## 1. 💡 Sodda Tushuntirish va Analogiya

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
```javascript
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
```

### 2. Intermediate Example (Oddiy Throttle)
Scroll (aylantirish) hodisasi yuz berganda har 200ms da faqat 1 marta ishlovchi throttle:
```javascript
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
```

### 3. Advanced Example (Leading Edge Debounce)
Tugma birinchi marta bosilganda funksiyani darhol bajaradigan va foydalanuvchi ketma-ket bosaverganda delay tugaguncha boshqa chaqiruvlarni bloklaydigan debounce (Double Submission oldini olish uchun):
```javascript
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
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **UI Muzlab qolishi (Lagging UI):** `scroll`, `resize`, `mousemove` kabi hodisalar soniyasiga yuzlab marta sodir bo'ladi. Agar ularga og'ir DOM manipulyatsiyasi yoki hisob-kitoblar bog'langan bo'lsa, brauzer freym tezligi (FPS) tushib ketadi va sahifa qotib qoladi.
* **Serverga keraksiz yuklama (Overwhelming Server):** Foydalanuvchi klaviaturada yozganda (Autocomplete) har bir harf uchun API so'rov yuborilsa, serverga juda ko'p yuklama tushadi va 429 (Too Many Requests) xatoligi kelib chiqadi.
* **Double Submission:** Foydalanuvchi "To'lash" yoki "Yuborish" tugmasini tez-tez 2-3 marta bosib yuborganida serverda ma'lumotlar dublikat bo'lib qoladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Debounce funksiyasini Event Listener ichida yaratish
#### Xato:
```javascript
// Noto'g'ri! Har safar scroll bo'lganda yangi debounce va yangi timeout yaratiladi
window.addEventListener('scroll', () => {
  debounce(() => console.log('Scroll!'), 300)();
});
```
#### To'g'ri usul:
```javascript
// Debounced funksiyani oldindan yaratib, keyin referensini uzatish kerak
const processScroll = debounce(() => console.log('Scroll!'), 300);
window.addEventListener('scroll', processScroll);
```

### 2. `this` konteksti va argumentlarni yo'qotib qo'yish
#### Xato:
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(); // Argumentlar va 'this' yo'qoldi!
    }, delay);
  };
}
```
#### To'g'ri usul:
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args); // Kontekst va argumentlar saqlanadi
    }, delay);
  };
}
```

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
6. **Savol:** Debounce-da `clearTimeout` nima uchun kerak?
   * **Javob:** Eski rejalashtirilgan funksiya chaqirilishini bekor qilish va kechikish vaqtini yangidan hisoblash uchun kerak.
7. **Savol:** Leading edge debounce nima va u trailing edge-dan nimasi bilan farq qiladi?
   * **Javob:** Leading edge funksiyani hodisa boshlanishi bilan darhol bajaradi va keyingilarini bloklaydi. Trailing edge esa (default) hodisalar tugashini kutib, oxirida bajaradi.
8. **Savol:** Throttle-ni setTimeout o'rniga qanday usul bilan optimallashtirish mumkin?
   * **Javob:** Vaqt tamg'alari (`Date.now()`) farqini hisoblash yoki animatsiyalar uchun `requestAnimationFrame` ishlatish orqali.

### Senior (9–12)
9. **Savol:** Debounce/Throttle-da xotira sizib chiqishi (memory leak) qanday yuz berishi mumkin?
   * **Javob:** Agar komponent o'chib ketganda (unmount) taymerlar (`clearTimeout`) tozalanmasa, yopilishlar (closures) tufayli DOM elementlari xotirada qolib ketadi.
10. **Savol:** `requestAnimationFrame` yordamida qanday qilib throttle-ga o'xshash effekt yaratish mumkin va uning afzalligi nimada?
    * **Javob:** Brauzerning har safar ekranni yangilash sikliga (60fps) moslab funksiyani chaqiradi, bu layout thrashing-ni kamaytiradi va scroll/animationlarni o'ta silliq qiladi.
11. **Savol:** Underscore/Lodash kutubxonalaridagi debounce va throttle funksiyalarida qanday qo'shimcha imkoniyatlar bor?
    * **Javob:** Ularda `leading`, `trailing` opsiyalari hamda faol taymerni bekor qiluvchi `.cancel()` metodi mavjud.
12. **Savol:** Debounce funksiyasini custom React hook shaklida qanday yozish mumkin va qanday muammoga e'tibor berish kerak?
    * **Javob:** Har renderda funksiya qayta yaratilmasligi uchun `useCallback` yoki `useRef` ishlatish shart, aks holda debounce ishlamaydi.

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
```javascript
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
```

---

## 9. 🚀 Performance va Optimization

* **rAF (requestAnimationFrame) ishlatish:** Agar throttle faqat vizual o'zgarishlar (animatsiyalar, scroll elementlarini surish) uchun ishlatilayotgan bo'lsa, `requestAnimationFrame` eng yaxshi va optimal yechim hisoblanadi.
* **Kechikish vaqtini (delay/limit) to'g'ri sozlash:** Qidiruv inputlarida 300ms–500ms, scroll/resize uchun esa 100ms–200ms oralig'i foydalanuvchi tajribasi (UX) uchun eng optimal hisoblanadi.

---

## 10. 📌 Cheat Sheet

| Metod | Rejimi | Qachon ishlatiladi | Xususiyati |
| :--- | :--- | :--- | :--- |
| **Debounce** | `trailing` (default) | Qidiruv (Autocomplete), avtomatik saqlash (Auto-save) | Chaqirishlar tugagandan keyin 1 marta ishlaydi |
| **Debounce** | `leading` | Tugma bosish (Submit/Payment buttons) | Birinchi marta darhol ishlaydi, keyingilarini bloklaydi |
| **Throttle** | - | Scroll, Resize, Mousemove, O'yin boshqaruvlari | Tez-tez chaqiruvlarni ma'lum vaqt oralig'ida bo'lib beradi |
| **rAF** | - | Faqat ekran chizilishi bilan bog'liq vizual hodisalar | Brauzer yangilanish chastotasi (odatda 60Hz) bilan sinxron ishlaydi |

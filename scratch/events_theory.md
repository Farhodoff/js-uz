## 1. 💡 Sodda Tushuntirish va Analogiya

### Hodisa (Event) nima?
**Hodisa (Event)** — bu foydalanuvchining brauzer ichida amalga oshiradigan harakatlari (klik qilish, klaviaturadan matn yozish, sahifani aylantirish, shakllarni yuborish) yoki tizim tomonidan yuz beradigan o'zgarishlardir. JavaScript bu hodisalarni "eshitib" tinglay oladi va ularga nisbatan dasturiy reaksiya (javob) qaytaradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **xizmat ko'rsatuvchi restorandasiz**:
* **Qo'ng'iroq (Event):** Stol ustidagi maxsus tugma bosilishi.
* **Tinglovchi (Event Listener):** Restoran xodimining shu qo'ng'iroqni tinglab, navbatchilik qilib turishi.
* **Javob (Callback funksiya):** Tugma bosilishi bilanoq ofitsiantning kelib, buyurtma olishi. Agar stol ustida tugma bo'lmasa, siz uni bosa olmaysiz va ofitsiant sizning bosish harakatingizni eshitmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Klik Hodisasini Tinglash)
Oddiy tugmani klik bo'lishini `addEventListener` yordamida eshitish:
```javascript
const orderButton = document.querySelector('.btn-order');

function handleOrder() {
  console.log('Buyurtma qabul qilindi!');
}

// addEventListener elementga hodisani bog'laydi
orderButton.addEventListener('click', handleOrder);
```

### 2. Intermediate Example (Default Harakatni To'xtatish - preventDefault)
Forma yuborilganda sahifaning avtomat yangilanib ketishini to'xtatish:
```javascript
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (event) => {
  // preventDefault() formaning standart sahifani yangilash xatti-harakatini to'xtatadi
  event.preventDefault();
  
  const email = loginForm.querySelector('[type="email"]').value;
  console.log('API-ga yuborilayotgan email:', email);
});
```

### 3. Advanced Example (Event Bubbling va stopPropagation)
Hodisalarning ota elementlarga tarqalishining oldini olish:
```javascript
const parentDiv = document.querySelector('.parent-box');
const childButton = document.querySelector('.child-btn');

parentDiv.addEventListener('click', () => {
  console.log('Ota div bosildi (parent click)');
});

childButton.addEventListener('click', (event) => {
  // stopPropagation() bosish hodisasi ota elementga ko'tarilib ketishini to'xtatadi
  event.stopPropagation();
  console.log('Bola tugma bosildi (child click)');
});
```

### 4. Production Example (Event Delegation - Hodisani ota orqali eshitish)
Dynamic qo'shiladigan elementlarning har biriga listener ulamay, ularning otasi orqali barcha kliklarni boshqarish:
```javascript
const list = document.querySelector('.task-list');

// Barcha li va button kliklarini ota element (ul) orqali boshqaramiz
list.addEventListener('click', (event) => {
  // event.target - bu aynan qaysi element bosilganini ko'rsatuvchi xossa
  if (event.target.classList.contains('delete-btn')) {
    const taskItem = event.target.closest('li');
    if (taskItem) {
      taskItem.remove();
      console.log('Vazifa muvaffaqiyatli o\'chirildi');
    }
  }
});
```

### 5. Enterprise Example (Event Options: once va passive)
Uchinch argument sifatida options obyektidan foydalanib hodisalarni optimallashtirish va xavfsiz boshqarish:
```javascript
const submitBtn = document.querySelector('#submit-payment');

// { once: true } - hodisa faqat 1 marta ishlaydi va avtomat o'chib ketadi (Double submit oldi olinadi)
submitBtn.addEventListener('click', () => {
  console.log('To\'lov amalga oshirilmoqda... (Faqat 1 marta bosish mumkin)');
}, { once: true });

// { passive: true } - brauzerga preventDefault chaqirilmasligini bildiradi. 
// Bu scroll va touch eventlarida sahifani qotmay, o'ta silliq ishlashini ta'minlaydi.
window.addEventListener('scroll', () => {
  console.log('Scroll koordinatasi:', window.scrollY);
}, { passive: true });
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Statik saytni interaktiv qilish:** Foydalanuvchi qidiruv maydoniga yozishi bilan qidiruv natijalarini dynamic chiqarish (input event) yoki modal oynalarni ochib yopish (click event).
* **Xotira boshqaruvi va Barqarorlik:** Har bir dynamic elementga listener ulayverish xotirani band qiladi. Event Delegation xotira sarfini (Heap size) 10 barobargacha tejaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. addEventListener ichida callback funksiyani darhol chaqirib yuborish
#### Xato:
`btn.addEventListener("click", showMessage());` // showMessage darhol (klik bo'lmasdan) ishlaydi
#### To'g'ri usul:
`btn.addEventListener("click", showMessage);` (funksiya havolasini uzatish).

### 2. Hodisa nomiga "on" qo'shib yuborish
#### Xato:
`btn.addEventListener("onclick", handler);`
#### To'g'ri usul:
`btn.addEventListener("click", handler);`

### 3. Anonim funksiyani `removeEventListener` yordamida o'chirmoqchi bo'lish
#### Xato:
`btn.addEventListener("click", () => log()); btn.removeEventListener("click", () => log());` // O'chmaydi!
#### Nima uchun:
Ikki anonim funksiya xotirada har xil manzillarda joylashgan.
#### To'g'ri usul:
Har doim nomli funksiya havolasini ishlatish.

### 4. `event.target` va `event.currentTarget` farqini tushunmaslik
#### Muammo:
`event.target` - klik bo'lgan aniq eng pastki element, `event.currentTarget` - event listener ulab qo'yilgan ota element.

### 5. `e.preventDefault()`ni dynamic bog'liq standart harakatlarni bekor qilish uchun ishlatmaslik
#### Muammo:
`<a>` bosilganda sahifa dynamic o'tishi kerak bo'lsa ham standart bo'yicha href-ga o'tib ketadi.

### 6. Event Capturing va Bubbling bosqichlarini boshqara olmaslik
#### Muammo:
Capturing capturing bosqichida eshitish kerak bo'lsa ham uning o'rniga bubbling ishlash.

### 7. Yirik ro'yxatdagi har bir element uchun alohida listener yaratish (Memory leak)
#### Muammo:
Jadvaldagi 1000 ta delete tugmasiga `1000 ta addEventListener` qo'shib xotirani to'ldirish.
#### To'g'ri yechim:
Ota jadvalga 1 ta listener ulab Event Delegation qilish.

### 8. `removeEventListener` ishlatishda `this` binding-ni yo'qotish
#### Xato:
`el.addEventListener('click', this.myHandler.bind(this))` va keyin `removeEventListener('click', this.myHandler.bind(this))` (bind har safar yangi funksiya qaytargani sababli o'chmaydi).

### 9. Klaviaturadagi inputlar uchun xavfsiz bo'lmagan hodisalarni tinglash
#### Muammo:
Klaviaturadagi maxsus belgilarni (Enter, Backspace) aniqlashda `keyCode` (eskirgan xossa) ishlatish.
#### To'g'ri usul:
Modern `event.key` (masalan, 'Enter', 'Escape') xossasidan foydalanish.

### 10. `scroll` yoki `mousemove` hodisalarida og'ir kodlarni yozish
#### Muammo:
Bu hodisalar soniyada 60+ marta chaqiriladi. Ularni optimallashtirmaslik brauzerni butunlay qotiradi.
#### To'g'ri yechim:
Debounce yoki Throttle yordamida so'rovlarni cheklash.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da hodisa tinglovchisi (Event Listener) qanday qo'shiladi?
   * **Javob:** `element.addEventListener('event_type', callback_function)` metodi yordamida.

2. **Savol:** `event.preventDefault()` nima uchun ishlatiladi?
   * **Javob:** Brauzerning standart harakatlarini (masalan, link bosilganda boshqa URL-ga o'tishni yoki form yuborilganda sahifa yangilanishini) to'xtatish uchun.

3. **Savol:** Hodisa turi (Event Type) va hodisa nishoni (Event Target) nima?
   * **Javob:** `event.type` - hodisa nomi ('click', 'submit'). `event.target` - hodisa yuz bergan eng birinchi boshlang'ich HTML element (masalan, bosilgan tugma).

4. **Savol:** Bitta elementga bir nechta bir xil event listener ulash mumkinmi?
   * **Javob:** Ha, addEventListener yordamida bitta elementning bitta hodisasiga (masalan click) bir nechta alohida funksiyalarni bog'lash mumkin, ular navbatma-navbat ishlaydi.

### Middle (5–8)
5. **Savol:** Event Bubbling (Ko'pirib chiqish) va Event Capturing (Tutib olish) nima?
   * **Javob:** Hodisa yuz berganda uning DOM daraxti bo'ylab tarqalish bosqichlari. Capturing - hodisa tepadan pastga (targetga qarab) tushadi. Bubbling - targetdan boshlab yana tepaga (windowga qarab) ko'tariladi. Barcha listenerlar sukut bo'yicha bubbling bosqichida eshitadi.

6. **Savol:** `event.stopPropagation()` va `event.stopImmediatePropagation()` o'rtasidagi farq nima?
   * **Javob:** `stopPropagation` hodisaning ota elementlarga ko'tarilib ketishini to'xtatadi. `stopImmediatePropagation` esa shu elementga ulangan boshqa listener-larning ham zudlik bilan ishlamay qolishini ta'minlaydi.

7. **Savol:** Event Delegation (Hodisalar delegatsiyasi) qanday ishlaydi?
   * **Javob:** Bolalarning har biriga listener ulamay, ota elementga listener ulash. Bola bosilganda hodisa bubbling orqali otaga ko'tariladi va `e.target` yordamida aynan qaysi bola bosilgani aniqlanadi.

8. **Savol:** `event.target` va `event.currentTarget` farqi nimada?
   * **Javob:** `target` - hodisani birinchi trigger qilgan boshlang'ich element. `currentTarget` - listener ulab qo'yilgan element (havola qilinayotgan ota element).

### Senior (9–12)
9. **Savol:** addEventListener-ning options obyektidagi `passive: true` sozlamasi qanday muammoni hal qiladi?
   * **Javob:** Scroll va Touch eventlarida preventDefault() chaqirilmasligini brauzerga oldindan bildiradi. Dvigatel preventDefault() bormikan deb kutib turmaydi va sahifa skrollini grafik protsessorda o'ta silliq (60+ FPS) bajarib beradi.

10. **Savol:** CustomEvent (Maxsus hodisa) qanday yaratiladi va Micro-Frontend arxitekturasida undan qanday foydalaniladi?
    * **Javob:** `new CustomEvent('my-event', { detail: { data } })` orqali yaratilib, `element.dispatchEvent(event)` yordamida trigger qilinadi. Micro-applar o'rtasida ma'lumot almashish uchun global window obyektida custom eventlar tinglanadi va trigger qilinadi.

11. **Savol:** `once: true` sozlamasi qanday ishlaydi va u xotira tozalashga (Garbage Collection) qanday yordam beradi?
    * **Javob:** `once: true` berilganda hodisa 1 marta bajarilgach, brauzer avtomatik ravishda `removeEventListener`ni chaqiradi va xotirani tozalaydi. Dasturchining uni o'zi qo'lda o'chirishi shart emas.

12. **Savol:** Ko'p marta trigger bo'luvchi eventlarni (resize, scroll, keyup) optimallashtirishda Debounce va Throttle farqini tushuntiring.
    * **Javob:** **Debounce** - foydalanuvchi yozishdan to'xtaganidan so'ng ma'lum vaqt o'tgach funksiyani 1 marta ishlatadi (qidiruv inputlari uchun). **Throttle** - tezkor chaqiruvlarni cheklab, ma'lum vaqt oralig'ida (masalan har 100ms da) funksiyani faqat 1 marta chaqirishni kafolatlaydi (scroll va resize uchun).

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Elektron do'kondagi dynamic mahsulotlar savatchasi
Savatchaga dynamic elementlar qo'shiladi va o'chiriladi. Har bir yangi mahsulot bosilganda uning miqdorini oshirish yoki o'chirish hodisasi ishlashi kerak.

#### Yechim (Event Delegation yordamida savatcha boshqaruvi):
```javascript
const cartContainer = document.querySelector('.cart-items');

cartContainer.addEventListener('click', (event) => {
  // 1. O'chirish tugmasi bosilganligini tekshirish
  const deleteBtn = event.target.closest('.btn-delete-item');
  if (deleteBtn) {
    const cartItem = deleteBtn.closest('.cart-item');
    cartItem.remove(); // elementni dynamic o'chirish
    updateCartTotal();
    return;
  }

  // 2. Miqdorni oshirish (Plus) bosilganini tekshirish
  const plusBtn = event.target.closest('.btn-plus');
  if (plusBtn) {
    const quantityEl = plusBtn.closest('.cart-item').querySelector('.quantity');
    let qty = parseInt(quantityEl.textContent);
    quantityEl.textContent = qty + 1;
    updateCartTotal();
  }
});
```

---

## 9. 🚀 Performance va Optimization

* **Passive Listeners:** Touch va scroll eventlarida har doim `{ passive: true }` yozish sahifa renderlash tezligini bir necha barobar oshiradi.

---

## 10. 📌 Cheat Sheet

| Event nomi | Trigger bo'lish holati | Asosiy parametrlar | Eslatma |
| :--- | :--- | :--- | :--- |
| **click** | Sifatida element bosilganda | `event.target` | Eng ko'p ishlatiladi |
| **submit** | Forma yuborilganda | `e.preventDefault()` | Sahifa yangilanishini to'xtatadi |
| **input** | Inputga har bir belgi kiritilganda| `event.target.value` | Real-time qidiruvlar uchun |
| **change** | Select yoki checkbox o'zgarganda | `event.target.checked/value` | Tanlovlarni tekshirish uchun |
| **keydown** | Klaviaturadan tugma bosilganda | `event.key` | Enter, Escape-ni eshitish uchun |
| **once: true** | Options obyekti ichida | true | Faqat 1 marta eshitadi |
| **passive: true**| Options obyekti ichida | true | Scroll tezligini oshiradi |

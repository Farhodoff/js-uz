export const events = {
  id: "events",
  title: "Brauzer Hodisalari va Event Handling (Events)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Hodisa (Event) nima?
**Hodisa (Event)** — bu foydalanuvchining brauzer ichida amalga oshiradigan harakatlari (klik qilish, klaviaturadan matn yozish, sahifani aylantirish, shakllarni yuborish) yoki tizim tomonidan yuz beradigan o'zgarishlardir. JavaScript bu hodisalarni "eshitib" tinglay oladi va ularga nisbatan dasturiy reaksiya (javob) qaytaradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **xizmat ko'rsatuvchi restorandasiz**:
* **Qo'ng'iroq (Event):** Stol ustidagi maxsus tugma bosilishi.
* **Tinglovchi (Event Listener):** Restoran xodimining shu qo'ng'iroqni tinglab, navbatchilik qilib turishi.
* **Javob (Callback funksiya):** Tugma bosilishi bilanoq ofitsiantning kelib, buyurtma olishi. Agar stol ustida tugma bo'lmasa, siz uni bosa olmaysiz va ofitsiant sizning bosish harakatingizni eshitmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Klik Hodisasini Tinglash)
Oddiy tugmani klik bo'lishini \`addEventListener\` yordamida eshitish:
\`\`\`javascript
const orderButton = document.querySelector('.btn-order');

function handleOrder() {
  console.log('Buyurtma qabul qilindi!');
}

// addEventListener elementga hodisani bog'laydi
orderButton.addEventListener('click', handleOrder);
\`\`\`

### 2. Intermediate Example (Default Harakatni To'xtatish - preventDefault)
Forma yuborilganda sahifaning avtomat yangilanib ketishini to'xtatish:
\`\`\`javascript
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (event) => {
  // preventDefault() formaning standart sahifani yangilash xatti-harakatini to'xtatadi
  event.preventDefault();
  
  const email = loginForm.querySelector('[type="email"]').value;
  console.log('API-ga yuborilayotgan email:', email);
});
\`\`\`

### 3. Advanced Example (Event Bubbling va stopPropagation)
Hodisalarning ota elementlarga tarqalishining oldini olish:
\`\`\`javascript
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
\`\`\`

### 4. Production Example (Event Delegation - Hodisani ota orqali eshitish)
Dynamic qo'shiladigan elementlarning har biriga listener ulamay, ularning otasi orqali barcha kliklarni boshqarish:
\`\`\`javascript
const list = document.querySelector('.task-list');

// Barcha li va button kliklarini ota element (ul) orqali boshqaramiz
list.addEventListener('click', (event) => {
  // event.target - bu aynan qaysi element bosilganini ko'rsatuvchi xossa
  if (event.target.classList.contains('delete-btn')) {
    const taskItem = event.target.closest('li');
    if (taskItem) {
      taskItem.remove();
      console.log('Vazifa muvaffaqiyatli o\\'chirildi');
    }
  }
});
\`\`\`

### 5. Enterprise Example (Event Options: once va passive)
Uchinch argument sifatida options obyektidan foydalanib hodisalarni optimallashtirish va xavfsiz boshqarish:
\`\`\`javascript
const submitBtn = document.querySelector('#submit-payment');

// { once: true } - hodisa faqat 1 marta ishlaydi va avtomat o'chib ketadi (Double submit oldi olinadi)
submitBtn.addEventListener('click', () => {
  console.log('To\\'lov amalga oshirilmoqda... (Faqat 1 marta bosish mumkin)');
}, { once: true });

// { passive: true } - brauzerga preventDefault chaqirilmasligini bildiradi. 
// Bu scroll va touch eventlarida sahifani qotmay, o'ta silliq ishlashini ta'minlaydi.
window.addEventListener('scroll', () => {
  console.log('Scroll koordinatasi:', window.scrollY);
}, { passive: true });
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Statik saytni interaktiv qilish:** Foydalanuvchi qidiruv maydoniga yozishi bilan qidiruv natijalarini dynamic chiqarish (input event) yoki modal oynalarni ochib yopish (click event).
* **Xotira boshqaruvi va Barqarorlik:** Har bir dynamic elementga listener ulayverish xotirani band qiladi. Event Delegation xotira sarfini (Heap size) 10 barobargacha tejaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. addEventListener ichida callback funksiyani darhol chaqirib yuborish
#### Xato:
\`btn.addEventListener("click", showMessage());\` // showMessage darhol (klik bo'lmasdan) ishlaydi
#### To'g'ri usul:
\`btn.addEventListener("click", showMessage);\` (funksiya havolasini uzatish).

### 2. Hodisa nomiga "on" qo'shib yuborish
#### Xato:
\`btn.addEventListener("onclick", handler);\`
#### To'g'ri usul:
\`btn.addEventListener("click", handler);\`

### 3. Anonim funksiyani \`removeEventListener\` yordamida o'chirmoqchi bo'lish
#### Xato:
\`btn.addEventListener("click", () => log()); btn.removeEventListener("click", () => log());\` // O'chmaydi!
#### Nima uchun:
Ikki anonim funksiya xotirada har xil manzillarda joylashgan.
#### To'g'ri usul:
Har doim nomli funksiya havolasini ishlatish.

### 4. \`event.target\` va \`event.currentTarget\` farqini tushunmaslik
#### Muammo:
\`event.target\` - klik bo'lgan aniq eng pastki element, \`event.currentTarget\` - event listener ulab qo'yilgan ota element.

### 5. \`e.preventDefault()\`ni dynamic bog'liq standart harakatlarni bekor qilish uchun ishlatmaslik
#### Muammo:
\`<a>\` bosilganda sahifa dynamic o'tishi kerak bo'lsa ham standart bo'yicha href-ga o'tib ketadi.

### 6. Event Capturing va Bubbling bosqichlarini boshqara olmaslik
#### Muammo:
Capturing capturing bosqichida eshitish kerak bo'lsa ham uning o'rniga bubbling ishlash.

### 7. Yirik ro'yxatdagi har bir element uchun alohida listener yaratish (Memory leak)
#### Muammo:
Jadvaldagi 1000 ta delete tugmasiga \`1000 ta addEventListener\` qo'shib xotirani to'ldirish.
#### To'g'ri yechim:
Ota jadvalga 1 ta listener ulab Event Delegation qilish.

### 8. \`removeEventListener\` ishlatishda \`this\` binding-ni yo'qotish
#### Xato:
\`el.addEventListener('click', this.myHandler.bind(this))\` va keyin \`removeEventListener('click', this.myHandler.bind(this))\` (bind har safar yangi funksiya qaytargani sababli o'chmaydi).

### 9. Klaviaturadagi inputlar uchun xavfsiz bo'lmagan hodisalarni tinglash
#### Muammo:
Klaviaturadagi maxsus belgilarni (Enter, Backspace) aniqlashda \`keyCode\` (eskirgan xossa) ishlatish.
#### To'g'ri usul:
Modern \`event.key\` (masalan, 'Enter', 'Escape') xossasidan foydalanish.

### 10. \`scroll\` yoki \`mousemove\` hodisalarida og'ir kodlarni yozish
#### Muammo:
Bu hodisalar soniyada 60+ marta chaqiriladi. Ularni optimallashtirmaslik brauzerni butunlay qotiradi.
#### To'g'ri yechim:
Debounce yoki Throttle yordamida so'rovlarni cheklash.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da hodisa tinglovchisi (Event Listener) qanday qo'shiladi?
   * **Javob:** \`element.addEventListener('event_type', callback_function)\` metodi yordamida.

2. **Savol:** \`event.preventDefault()\` nima uchun ishlatiladi?
   * **Javob:** Brauzerning standart harakatlarini (masalan, link bosilganda boshqa URL-ga o'tishni yoki form yuborilganda sahifa yangilanishini) to'xtatish uchun.

3. **Savol:** Hodisa turi (Event Type) va hodisa nishoni (Event Target) nima?
   * **Javob:** \`event.type\` - hodisa nomi ('click', 'submit'). \`event.target\` - hodisa yuz bergan eng birinchi boshlang'ich HTML element (masalan, bosilgan tugma).

4. **Savol:** Bitta elementga bir nechta bir xil event listener ulash mumkinmi?
   * **Javob:** Ha, addEventListener yordamida bitta elementning bitta hodisasiga (masalan click) bir nechta alohida funksiyalarni bog'lash mumkin, ular navbatma-navbat ishlaydi.

### Middle (5–8)
5. **Savol:** Event Bubbling (Ko'pirib chiqish) va Event Capturing (Tutib olish) nima?
   * **Javob:** Hodisa yuz berganda uning DOM daraxti bo'ylab tarqalish bosqichlari. Capturing - hodisa tepadan pastga (targetga qarab) tushadi. Bubbling - targetdan boshlab yana tepaga (windowga qarab) ko'tariladi. Barcha listenerlar sukut bo'yicha bubbling bosqichida eshitadi.

6. **Savol:** \`event.stopPropagation()\` va \`event.stopImmediatePropagation()\` o'rtasidagi farq nima?
   * **Javob:** \`stopPropagation\` hodisaning ota elementlarga ko'tarilib ketishini to'xtatadi. \`stopImmediatePropagation\` esa shu elementga ulangan boshqa listener-larning ham zudlik bilan ishlamay qolishini ta'minlaydi.

7. **Savol:** Event Delegation (Hodisalar delegatsiyasi) qanday ishlaydi?
   * **Javob:** Bolalarning har biriga listener ulamay, ota elementga listener ulash. Bola bosilganda hodisa bubbling orqali otaga ko'tariladi va \`e.target\` yordamida aynan qaysi bola bosilgani aniqlanadi.

8. **Savol:** \`event.target\` va \`event.currentTarget\` farqi nimada?
   * **Javob:** \`target\` - hodisani birinchi trigger qilgan boshlang'ich element. \`currentTarget\` - listener ulab qo'yilgan element (havola qilinayotgan ota element).

### Senior (9–12)
9. **Savol:** addEventListener-ning options obyektidagi \`passive: true\` sozlamasi qanday muammoni hal qiladi?
   * **Javob:** Scroll va Touch eventlarida preventDefault() chaqirilmasligini brauzerga oldindan bildiradi. Dvigatel preventDefault() bormikan deb kutib turmaydi va sahifa skrollini grafik protsessorda o'ta silliq (60+ FPS) bajarib beradi.

10. **Savol:** CustomEvent (Maxsus hodisa) qanday yaratiladi va Micro-Frontend arxitekturasida undan qanday foydalaniladi?
    * **Javob:** \`new CustomEvent('my-event', { detail: { data } })\` orqali yaratilib, \`element.dispatchEvent(event)\` yordamida trigger qilinadi. Micro-applar o'rtasida ma'lumot almashish uchun global window obyektida custom eventlar tinglanadi va trigger qilinadi.

11. **Savol:** \`once: true\` sozlamasi qanday ishlaydi va u xotira tozalashga (Garbage Collection) qanday yordam beradi?
    * **Javob:** \`once: true\` berilganda hodisa 1 marta bajarilgach, brauzer avtomatik ravishda \`removeEventListener\`ni chaqiradi va xotirani tozalaydi. Dasturchining uni o'zi qo'lda o'chirishi shart emas.

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
\`\`\`javascript
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
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Passive Listeners:** Touch va scroll eventlarida har doim \`{ passive: true }\` yozish sahifa renderlash tezligini bir necha barobar oshiradi.

---

## 10. 📌 Cheat Sheet

| Event nomi | Trigger bo'lish holati | Asosiy parametrlar | Eslatma |
| :--- | :--- | :--- | :--- |
| **click** | Sifatida element bosilganda | \`event.target\` | Eng ko'p ishlatiladi |
| **submit** | Forma yuborilganda | \`e.preventDefault()\` | Sahifa yangilanishini to'xtatadi |
| **input** | Inputga har bir belgi kiritilganda| \`event.target.value\` | Real-time qidiruvlar uchun |
| **change** | Select yoki checkbox o'zgarganda | \`event.target.checked/value\` | Tanlovlarni tekshirish uchun |
| **keydown** | Klaviaturadan tugma bosilganda | \`event.key\` | Enter, Escape-ni eshitish uchun |
| **once: true** | Options obyekti ichida | true | Faqat 1 marta eshitadi |
| **passive: true**| Options obyekti ichida | true | Scroll tezligini oshiradi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Klik Hodisasini Tinglash (addEventListener)",
    "instruction": "Berilgan `button` elementiga 'click' hodisasini eshituvchi va bosilganda `callback` funksiyasini ishga tushiruvchi `setupClick(button, callback)` funksiyasini yozing.",
    "startingCode": "function setupClick(button, callback) {\n  // Kodni yozing\n}",
    "hint": "button.addEventListener('click', callback);",
    "test": "try { let clicked = false; const mockBtn = { addEventListener: (t, cb) => { if(t === 'click') cb(); } }; setupClick(mockBtn, () => clicked = true); if (!clicked) return 'click hodisasi ulanmadi yoki callback chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Standart Harakatni Bekor Qilish (preventDefault)",
    "instruction": "Forma yuborilish (submit) hodisasini qabul qilib, uning standart sahifani yangilash harakatini bekor qiluvchi `handleSubmit(event)` funksiyasini yozing.",
    "startingCode": "function handleSubmit(event) {\n  // Kodni yozing\n}",
    "hint": "event.preventDefault();",
    "test": "try { let prevented = false; const mockEvent = { preventDefault: () => prevented = true }; handleSubmit(mockEvent); if (!prevented) return 'preventDefault() chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Hodisalarni Delegatsiya Qilish (Event Delegation)",
    "instruction": "Berilgan `parent` elementiga click listener ulang. Agar bosilgan element (`event.target`) `item` klassiga ega bo'lsa, `callback` funksiyasini ishga tushirib, unga o'sha bosilgan elementni argument qilib uzatuvchi `delegateClick(parent, callback)` funksiyasini yozing.",
    "startingCode": "function delegateClick(parent, callback) {\n  // Kodni yozing\n}",
    "hint": "parent.addEventListener('click', (e) => { if (e.target.classList.contains('item')) callback(e.target); });",
    "test": "try { let calledWith = null; let listener = null; const mockParent = { addEventListener: (t, cb) => { listener = cb; } }; delegateClick(mockParent, (el) => calledWith = el); const mockTarget = { classList: { contains: (c) => c === 'item' } }; listener({ target: mockTarget }); if (calledWith !== mockTarget) return 'Delegatsiya ishlamadi yoki callback to\\'g\\'ri element bilan chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 4,
    "title": "stopPropagation bilan Bubbling ni To'xtatish",
    "instruction": "`stopBubbling(event)` funksiyasini yozing. Bu funksiya hodisaning ota elementlarga ko'tarilib ketishini (bubbling) to'xtatishi kerak. Funksiya `event.stopPropagation()` metodini chaqirsin.",
    "startingCode": "function stopBubbling(event) {\n  // Kodni yozing\n}",
    "hint": "event.stopPropagation();",
    "test": "try { let stopped = false; const mockEvent = { stopPropagation: () => stopped = true }; stopBubbling(mockEvent); if (!stopped) return 'stopPropagation() chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 5,
    "title": "removeEventListener bilan Tinglashni O'chirish",
    "instruction": "`addAndRemove(button, callback)` funksiyasini yozing. Funksiya avval 'click' hodisasini ulaydi, keyin darhol `removeEventListener` yordamida o'chiradi. Natijada callback chaqirilmasligi kerak.",
    "startingCode": "function addAndRemove(button, callback) {\n  // Kodni yozing\n}",
    "hint": "button.addEventListener('click', callback); button.removeEventListener('click', callback);",
    "test": "try { let addCalled = false; let removeCalled = false; let addedRef = null; let removedRef = null; const mockBtn = { addEventListener: (t, cb) => { addCalled = true; addedRef = cb; }, removeEventListener: (t, cb) => { removeCalled = true; removedRef = cb; } }; const fn = () => {}; addAndRemove(mockBtn, fn); if (!addCalled) return 'addEventListener chaqirilmadi'; if (!removeCalled) return 'removeEventListener chaqirilmadi'; if (addedRef !== removedRef) return 'add va remove da bir xil funksiya havolasi ishlatilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 6,
    "title": "once: true bilan Bir Martalik Hodisa",
    "instruction": "`setupOnce(button, callback)` funksiyasini yozing. Funksiya 'click' hodisasini faqat bir marta ishlashi uchun `{ once: true }` option bilan ulashi kerak.",
    "startingCode": "function setupOnce(button, callback) {\n  // Kodni yozing\n}",
    "hint": "button.addEventListener('click', callback, { once: true });",
    "test": "try { let options = null; const mockBtn = { addEventListener: (t, cb, opts) => { options = opts; } }; setupOnce(mockBtn, () => {}); if (!options || options.once !== true) return '{ once: true } option berilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 7,
    "title": "Klaviatura Hodisasi (keydown) va event.key",
    "instruction": "`onEnterPress(input, callback)` funksiyasini yozing. Funksiya berilgan `input` elementiga 'keydown' hodisasini ulaydi va faqat 'Enter' tugmasi bosilgandagina `callback` ni chaqiradi. `event.key` xossasidan foydalaning.",
    "startingCode": "function onEnterPress(input, callback) {\n  // Kodni yozing\n}",
    "hint": "input.addEventListener('keydown', (e) => { if (e.key === 'Enter') callback(); });",
    "test": "try { let listener = null; let called = false; const mockInput = { addEventListener: (t, cb) => { if (t === 'keydown') listener = cb; } }; onEnterPress(mockInput, () => called = true); if (!listener) return 'keydown hodisasi ulanmadi'; listener({ key: 'Enter' }); if (!called) return 'Enter bosilganda callback chaqirilmadi'; called = false; listener({ key: 'Escape' }); if (called) return 'Faqat Enter uchun ishlashi kerak edi, boshqa tugma ham ishladi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 8,
    "title": "Input Hodisasi va Real-Time Qidirish",
    "instruction": "`setupSearch(inputEl, callback)` funksiyasini yozing. Funksiya inputga 'input' hodisasini ulaydi va har bir harf kiritilganda `callback` ni `event.target.value` qiymati bilan chaqiradi.",
    "startingCode": "function setupSearch(inputEl, callback) {\n  // Kodni yozing\n}",
    "hint": "inputEl.addEventListener('input', (e) => callback(e.target.value));",
    "test": "try { let listener = null; let receivedValue = null; const mockInput = { addEventListener: (t, cb) => { if (t === 'input') listener = cb; } }; setupSearch(mockInput, (val) => receivedValue = val); if (!listener) return 'input hodisasi ulanmadi'; listener({ target: { value: 'Salom' } }); if (receivedValue !== 'Salom') return 'callback ga event.target.value uzatilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 9,
    "title": "CustomEvent Yaratish va Trigger Qilish",
    "instruction": "`emitCustomEvent(element, eventName, data)` funksiyasini yozing. Funksiya yangi `CustomEvent` yaratib, `detail` maydonida `data` ni saqlagan holda `element.dispatchEvent()` orqali hodisani trigger qilsin.",
    "startingCode": "function emitCustomEvent(element, eventName, data) {\n  // Kodni yozing\n}",
    "hint": "const event = new CustomEvent(eventName, { detail: data }); element.dispatchEvent(event);",
    "test": "try { let dispatched = null; const mockEl = { dispatchEvent: (e) => { dispatched = e; } }; emitCustomEvent(mockEl, 'user-login', { userId: 42 }); if (!dispatched) return 'dispatchEvent chaqirilmadi'; if (dispatched.type !== 'user-login') return 'Event nomi noto\\'g\\'ri'; if (!dispatched.detail || dispatched.detail.userId !== 42) return 'detail maydoni noto\\'g\\'ri'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 10,
    "title": "Oddiy Debounce Funksiyasi",
    "instruction": "`debounce(fn, delay)` funksiyasini yozing. U yangi funksiya qaytarsin. Qaytarilgan funksiya chaqirilganda, agar oldingi timer mavjud bo'lsa uni tozalab (clearTimeout), yangi `setTimeout` bilan `fn` ni `delay` ms dan keyin chaqirsin.",
    "startingCode": "function debounce(fn, delay) {\n  // Kodni yozing\n}",
    "hint": "let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };",
    "test": "try { const debounced = debounce(() => {}, 100); if (typeof debounced !== 'function') return 'debounce funksiya qaytarishi kerak'; let callCount = 0; const debouncedFn = debounce(() => callCount++, 50); debouncedFn(); debouncedFn(); debouncedFn(); if (callCount !== 0) return 'debounce darhol chaqirmasligi kerak, delay dan keyin chaqirishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da elementga hodisa tinglovchisi (event listener) qo'shish uchun qaysi metod ishlatiladi?",
    "options": [
      "element.attachEvent('click')",
      "element.addEventListener('click', callback)",
      "element.onclick(callback)",
      "element.bindEvent('click')"
    ],
    "correctAnswer": 1,
    "explanation": "`addEventListener` modern JavaScript-da elementga bir yoki bir nechta hodisalarni bog'lash uchun standart metod hisoblanadi."
  },
  {
    "id": 2,
    "question": "`event.preventDefault()` metodining vazifasi nima?",
    "options": [
      "Hodisaning ota elementlarga tarqalishini to'xtatadi",
      "Elementning standart brauzer harakatlarini (masalan, form yuborilganda sahifa yangilanishini) bekor qiladi",
      "Hodisa tinglovchisini xotiradan o'chirib yuboradi",
      "Xatoliklarni avtomatik tuzatadi"
    ],
    "correctAnswer": 1,
    "explanation": "`preventDefault()` brauzerning default amallarini (havola href-ga o'tishi, forma submit bo'lib sahifa yangilanishi) to'xtatadi."
  },
  {
    "id": 3,
    "question": "Hodisa yuz berganda `event.target` xossasi nimani qaytaradi?",
    "options": [
      "Tinglovchi ulab qo'yilgan ota elementni",
      "Hodisani trigger qilgan (klik bo'lgan) eng birinchi boshlang'ich elementni",
      "Barcha elementlar ro'yxatini",
      "Hodisa sodir bo'lgan vaqtni"
    ],
    "correctAnswer": 1,
    "explanation": "`event.target` hodisani yuzaga keltirgan, foydalanuvchi bevosita bosgan eng pastki aniq elementni ifodalaydi."
  },
  {
    "id": 4,
    "question": "`event.stopPropagation()` nima qiladi?",
    "options": [
      "Tugmaning standart bosilishini bekor qiladi",
      "Hodisaning DOM daraxti bo'ylab tepaga (ota elementlarga) tarqalishini (bubbling) to'xtatadi",
      "Zaharli skriptlarni tozalaydi",
      "Intervalni to'xtatadi"
    ],
    "correctAnswer": 1,
    "explanation": "`stopPropagation()` hodisaning ota elementlarga ko'tarilib ketishini bubbling bosqichida bloklaydi."
  },
  {
    "id": 5,
    "question": "Event Delegation (hodisalarni delegatsiya qilish) qanday prinsipga tayanadi?",
    "options": [
      "Barcha elementlarga alohida-alohida listener qo'shishga",
      "Hodisalarning ko'pirib chiqish (Bubbling) xususiyatidan foydalanib, ota elementga bitta listener qo'shib dynamic kliklarni boshqarishga",
      "Dinamik import yordamida yuklashga",
      "Stillarni alohida faylda saqlashga"
    ],
    "correctAnswer": 1,
    "explanation": "Event Delegation hodisalarning bubbling bo'lishiga tayanadi. Biz ota elementga ulab, uning ichidagi dynamic yaratilgan bolalarning kliklarini ham osongina bitta joyda boshqaramiz."
  },
  {
    "id": 6,
    "question": "Hodisaning capturing (tutib olish) va bubbling (ko'pirib chiqish) bosqichlari qanday tartibda bajariladi?",
    "options": [
      "Birlamchi bubbling, keyin capturing bosqichi",
      "Birlamchi capturing (tepadan pastga), keyin target (maqsad), so'ngra bubbling (pastdan tepaga)",
      "Ikkalasi barobar bajariladi",
      "Faqat bubbling bosqichi mavjud, capturing yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "Hodisa dastlab Window-dan boshlab target-gacha tushadi (capturing), targetda ishlaydi, so'ngra targetdan boshlab yana yuqoriga ko'tariladi (bubbling)."
  },
  {
    "id": 7,
    "question": "Hodisa tinglovchisini faqat bir marta ishlatib, so'ngra xotiradan avtomat o'chirib yuborish uchun qaysi option parametri beriladi?",
    "options": [
      "{ single: true }",
      "{ once: true }",
      "{ passive: true }",
      "{ capture: false }"
    ],
    "correctAnswer": 1,
    "explanation": "`{ once: true }` addEventListener uchinchi parametri sifatida berilganda, hodisa 1 marta bajarilgach brauzer uni o'zi o'chirib yuboradi."
  },
  {
    "id": 8,
    "question": "Touch va scroll hodisalarini o'ta silliq (janksiz) qilish uchun qaysi option parametri berilishi shart?",
    "options": [
      "{ smooth: true }",
      "{ passive: true }",
      "{ once: true }",
      "{ capture: true }"
    ],
    "correctAnswer": 1,
    "explanation": "`{ passive: true }` brauzerga preventDefault chaqirilmasligini kafolatlaydi, bu esa sahifani chizishni bloklamasdan scroll-ni GPU-da silliq bajarishga imkon beradi."
  },
  {
    "id": 9,
    "question": "`event.currentTarget` xossasi nimani qaytaradi?",
    "options": [
      "Klik bo'lgan eng boshlang'ich elementni",
      "Ayni vaqtda event listener ulab qo'yilgan (hodisani eshitayotgan) ota elementni",
      "Keyingi qo'shni elementni",
      "Hujjatning ildiz elementini (html)"
    ],
    "correctAnswer": 1,
    "explanation": "`currentTarget` event handler ulab qo'yilgan va o'sha handler ayni vaqtda ishlayotgan elementni (odatda ota elementni) ko'rsatadi."
  },
  {
    "id": 10,
    "question": "Event listenerni capturing (tutib olish) bosqichida tinglash uchun nima qilinadi?",
    "options": [
      "Tinglovchi metodini o'zgartirish kerak",
      "addEventListener uchinchi argumentiga `true` yoki `{ capture: true }` parametrini yuborish shart",
      "Hech qanday iloji yo'q, capturing faqat CSS-da ishlaydi",
      "once parametridan foydalanish shart"
    ],
    "correctAnswer": 1,
    "explanation": "Uchinchi parametrga `true` yoki `{ capture: true }` berilsa, listener bubbling emas, capturing bosqichida (tepadan pastga tushishda) ishga tushadi."
  },
  {
    "id": 11,
    "question": "`removeEventListener` to'g'ri ishlashi uchun qaysi shartlar bajarilishi shart?",
    "options": [
      "Faqat hodisa turi mos kelsa yetarli",
      "Hodisa turi (event type) va ro'yxatga olingan funksiya havolasi (reference) aynan bir xil bo'lishi shart",
      "Uni faqat asinxron funksiyalar ichida ishlatish kerak",
      "Ota elementni o'chirish kerak"
    ],
    "correctAnswer": 1,
    "explanation": "O'chirish to'g'ri ishlashi uchun add va remove chaqiruvlaridagi hodisa nomi va funksiya havolasi (references) bir-biriga aynan teng (same memory address) bo'lishi lozim."
  },
  {
    "id": 12,
    "question": "Klaviaturadan bosilgan aniq tugmani (masalan, 'Enter') aniqlash uchun qaysi xususiyatdan foydalanish tavsiya etiladi?",
    "options": [
      "event.keyCode (eskirgan)",
      "event.key",
      "event.char",
      "event.button"
    ],
    "correctAnswer": 1,
    "explanation": "Modern JavaScript-da bosilgan tugmani topish uchun `event.key` xossasi (masalan, 'Enter', 'Escape') tavsiya qilinadi. `keyCode` esa eskirgan va foydalanishdan olingan (deprecated)."
  }
]

};

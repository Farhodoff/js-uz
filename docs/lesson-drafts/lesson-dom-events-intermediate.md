# 📚 DOM (Document Object Model) va Hodisalar — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**DOM** — brauzer ichida HTML hujjatining "daraxt" ko'rinishi (virtual tree). Har bir HTML element "daraxt node" — obyekt. JS yordamida DOM ni o'qish, o'zgartirish va yangi elementlar qo'shish mumkin.

- **Elementlarni tanlash:** `querySelector('.class')`, `querySelectorAll('div')`, `getElementById`, `getElementsByClassName`, `getElementsByTagName` — keling, zamonaviy usullar `querySelector`/`querySelectorAll`.
- **Elementlarni o'zgartirish:** `element.textContent`, `element.innerHTML`, `element.style`, `element.setAttribute`, `element.classList.add/remove/toggle` — DOM manipulyatsiya.
- **Yangi element qo'shish:** `document.createElement`, `parent.appendChild/insertBefore/append/prepend`, `parent.removeChild/remove`.
- **Hodisalar (Events):** `click`, `input`, `submit`, `keydown`, `mouseover`, `load` va boshqalar. `addEventListener(type, callback, options)`.
- **Event delegation (hofizachi):** Ota elementda `addEventListener` qo'llash va `e.target` orqali barcha ichki elementlarga hodisa uzatish — samarali, chunki barcha ichki elementlarga alohida hodisa qo'shmaslik kerak.
- **Event phases (3 bosqich):** Capturing (orinish), Target (maqsad), Bubbling (qaytarish). `addEventListener` dafault bubbling; `options: { capture: true }` yoki `element.addEventListener(type, handler, true)` — capturing.
- **`e.preventDefault()`:** Tingloq, form reload kabi hodisalarni to'xtatish.
- **`e.stopPropagation()`:** Hodisaning ota elementlarga qaytarilishini to'xtatish (bubblingni to'xtatish).

*Faqat dars:* `document.querySelector('#app')` — elementni tanlash; `el.addEventListener('click', handler)` — hodisa qo'shish; `e.target` — qaysi element uchraganligi.

## 💻 JavaScript kod namunalari

### To'g'ri misollar:

```javascript
// 1. Elementni tanlash va o'zgartirish
const app = document.querySelector('#app');
app.textContent = 'Salom, JavaScript!';
app.classList.add('active', 'fade-in');

// 2. Yangi element yaratish va joylashtirish
const btn = document.createElement('button');
btn.textContent = 'Click me';
btn.addEventListener('click', () => alert('Clicked!'));
app.appendChild(btn);

// 3. Hodisa delegetation (samara)
const list = document.querySelector('#item-list');
list.addEventListener('click', (e) => {
  // ichki element qaysi?
  const item = e.target.closest('.item');
  if (item) {
    console.log('Tanlandi:', item.dataset.id);
    item.remove(); // o'chirildi
  }
});

// 4. Form yuborishga hodisa
const form = document.querySelector('#my-form');
form.addEventListener('submit', (e) => {
  e.preventDefault(); // reloadni to'xtat
  const data = new FormData(form);
  console.log('Yuborildi:', Object.fromEntries(data));
});

// 5. Event phases (capturing vs bubbling)
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');
parent.addEventListener('click', () => console.log('Parent (bubble)'), false);
parent.addEventListener('click', () => console.log('Parent (capture)'), true);
child.addEventListener('click', () => console.log('Child'));
// Click qilinganda: Parent(capture) → Child → Parent(bubble)
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// Xato 1: Alohida hodisa har bir elementga qo'shish (inefficient)
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => { /* ... */ });
}); // 100 ta elementda 100 ta listener — xavfsiz!

// Xato 2: innerHTML bilan XSS xavfi
el.innerHTML = userInput; // userInput: "<img src=x onerror=alert(1)>" → xavf!

// Xato 3: Element yo'qligini tekshirmagan holda
const el = document.querySelector('.sometodo');
el.textContent = 'Yaxshi'; // el == null bo'lsa — crash!

// Xato 4: Prevent default ni unutish
link.addEventListener('click', (e) => {
  // e.preventDefault(); — yo'q, tovushi o'chirilmagan!
  navigateToNewPage();
});

// Xato 5: Elementlarni saqlash xavfi (memory leak)
function attachHandler() {
  const bigData = new Array(1000000).fill('x');
  element.addEventListener('click', () => {
    console.log(bigData.length); // bigData har doim saqlanadi!
  });
}
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Delegation:** Bir ota elementde `addEventListener` qo'shing va `e.target` / `e.currentTarget` bilan farqlang.
- **Xavfsiz joylashtirish:** `textContent` > `innerHTML` (xavfsizroq); `innerHTML` only trusted data.
- **Element mavjudligi tekshiruvi:** `if (el)` yoki `el?.textContent`.
- **State barkotar:** Hodisani boshqarish uchun Event delegation va ushlangan holat (state) ni oshirish.
- **Form bilan ishlash:** `FormData`, `preventDefault()`, to'g'ri validation.
- **Ba'zan capturing:** Agar barcha ichki hodisalarni oldindan ushlash kerak bo'lsa, `capture: true`.

### ❌ Noto'g'ri:

- **Barcha elementlarga alohida listener** — xavfsizlik xavfi, xotira berish, lekin bu samarali emas.
- **innerHTML bilan foydalanuvchi kiritilgan ma'lumot** — XSS xavfi.
- **Element yo'qligini tekshirishni unutish** — `null` error.
- **`preventDefault` yoki `stopPropagation` ni noto'g'ri qo'llash** — ishlaysa ham ishlamaydi.
- **Memory leak:** Listenerlarni yo'qotish, elementlarni silence qilishda listenerlarni chiqarmaslik — xotirada saqlanib qoladi.

## 🎩 Hayotiy o'xshatishlar

- **Hodisa delegatsiya:** "Maktab hujjatlar idora" — barcha talabalarga alohida qo'ng'iroq emas, balki "ota" (ustoz) bitta qo'ng'iroq qilib, barcha talaba shu orqali xabar almashinadi.
- **Tipik mumkin xatolar:** HTML elementlarni "kiritishda" innerHTML bilan "noaniq" ma'lumotlarni joylashish — xavfli. Zamonaviy usullarda `textContent` ishlatish xavfsiz.
- **Form yuborish:** Form yuborilganda brauzer avtomatik sahifani yangilaydi — `preventDefault()` yordamida uni to'xtatish kerak (AJAX/HTTP so'rov yuborish uchun).
- **Hodisa bosqichlari (3 bosqich):** Bir hayvon "ovizda" (capturing) → "maqsad" (target) → "qaytarilish" (bubbling). Bir hodisa 3 marta uchraydi.

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Hodisa yuz beradi: click, input, submit ] --> B{ Qayerdan boshlanadi? }
    B --> C1[ Capturing (orinish) ]
    B --> C2[ Target (maqsad element) ]
    B --> C3[ Bubbling (qaytarish) ]
    C1 --> D[ Ota → Ichki elementlarga ]
    C2 --> E[ Qaysi element? e.target ]
    C3 --> F[ Ichki → Ota → Boshqa ota ]
    D --> F
    E --> F
    F --> G{ Delegation orqali? }
    G -->|Ha| H[ Bitta ota elementda listener ]
    G -->|Yo'q| I[ Har bir elementda alohida listener ]
    H --> J[ e.target.closest('.class') ]
    I --> K[ Xavfsizlik xavfi, xotira berish ]
```

**Diagrama tushuntirishi:** DOM hodisasi 3 bosqichda: capturing, target, bubbling. `e.target` — hodisani yuz bergan element; `e.currentTarget` — listenerga qo'shilgan element. Delegation — ota elementda listener, ichki elementlarga qaratilgan hodisa bunda kuzatiladi.

## 🎙 Intervyu savollari va javoblari

### S1: Event delegation nima va qanday ishlaydi?

**Javob:** Event delegation — biri element (masalan, `<ul>`) da `addEventListener` qo'shish va hodisa yuz berganda `e.target` yordamida qaysi ichki element uchraganligini aniqlash. Barcha ichki elementlarga alohida listener qo'shish o'rniga, bitta listener yaxshiroq: xavfsizlik, xotira, dynamik elementlarga qo'shimcha listener kerak emas.

### S2: Capturing va bubbling farqi nima? Qaysi biri dafault?

**Javob:** Dafault `false` — bubbling (ichki → ota, "qaytish"). `true` yoki `{ capture: true }` — capturing (orta → ichki, "orinish"). 3 bosqich: capturing (orta → ichki), target, bubbling (ichki → ota). `addEventListener(type, handler, options)` yoki `addEventListener(type, handler, true/false)` — 3-argument options.

### S3: `e.target` va `e.currentTarget` farqi?

**Javob:** `e.target` — hodisani boshlab bergan asl element (masalan, `li` ichida `span` — target `span`). `e.currentTarget` — listener qo'shilgan element (delegationda `ul`). Delegationda `e.target` bilan ichki elementni topish, `e.currentTarget` bilan listener manzilini bilish.

### S4: Nima uchun `innerHTML` bilan foydalanuvchi kiritilgan ma'lumot xavfli?

**Javob:** `innerHTML` berilgan stringni HTML-parsing qiladi — shuning uchun `<script>`, `<img onerror=...>`, `<svg onload=...>` kabi XSS hujumlari yuz berishi mumkin. Xavfsiz variant: `textContent` (faqat matn) yoki `createElement` + `textContent`. `innerHTML` faqat trust ma'lumotlar uchun, yoki XSS filterlangan holda.

### S5: Form submit hodisasida `e.preventDefault()` qanday ishlaydi?

**Javob:** Form yuborilganda (`submit`), brauzer avtomatik POST so'rovi yuboradi va sahifani yangilaydi (reload). `e.preventDefault()` — bu funziyani to'xtatadi, shuning uchun JS yordamida FormData olish, validatsiya, AJAX/HTTP so'rov yuborish mumkin. `e.preventDefault()` ko'rsatilganda reload yo'q.

### S6: Elementlarni ko'plab listener qo'shishning muammosi nima (memory leak)?

**Javob:** Ko'p elementlarga alohida listener qo'shish — har biri xotirada saqlanadi. Agar element o'chirilsa, lekin listener `removeEventListener` qilinmagan holda qolsa — xotira "tsk" (memory leak). Shuning uchun delegation (bitta listener) yoki element o'chirilganda `removeEventListener` — yoki `element.remove()` yordamida listenerni yo'q qilish. Yana bir xavfsiz: JS da "xotiradan chiqma" — JS GC (garbage collection) listenerga o'tkazilish mumkin bo'lsa, listener ham o'chib ketadi.

### S7: `element.classList.add('a', 'b')` kunday ishlaydi? `toggle` yasash?

**Javob:** `classList` —.classList bo'limlari to'plami. `add('a', 'b')` — classlarga qo'shish. `remove('a')` — olib tashlash. `toggle('a')` — agar mavjud bo'lsa olib tashlaydi, yo'q bo'lsa qo'shadi. `contains('a')` — tekshirish. Zamonaviy klass boshqaruvi uchun `classList` (`className` string bilan classlarga salishtirish — `className` = "a b c").

### S8: `closest('.someclass')` nima qiladi va qachon foydali?

**Javob:** `closest('.someclass')` — o'zi va ota-elementlar orasidan eng yaqin class bilan js elementni qaytaradi. Masalan, `li` ichida `span` clicked — `e.target.closest('.item')` → `li` (agar class `item` bo'lsa). Delegationda: `e.target.closest('.item')` — ichki element bilan ishlash uchun qulay.

### S9: `options: { once: true }` yordamida nima qilish mumkin?

**Javob:** `addEventListener(type, handler, { once: true })` — handler bir marta ishga tushganda avtomatik unutilib tashlanadi. Masalan, "bir marta click" — "modal" yoki "animation end" — yagona ish. Shuningdek `{ passive: true }` — `scroll` kabi hodisalar uchun (brauzer ajralash mumkin); `{ signal: AbortSignal }` — listenerni yo'q qilish uchun.

### 📌 Xulosa:

DOM bilan ishlashda — **delegation**, **xavfsiz joylashtirish** (textContent), **element mavjudligini tekshirish**, **preventDefault**, **stopPropagation** bilan ishlash. InnerHTML bilan XSS xavfi. Memory leak — listenerni yo'q qilmagan holda elementlarni o'chirib qo'ymoqchimaysiz.

---

📌 **Keyingi darslar (o'rta darajada):**
- Xamarin Forms / Event Loop (asyncJS)
- Array Higher-order Metodlari (map, filter, reduce, find, some, every, flatMap)
- Obyektlar bilan chuqur ishlash (destructuring, spread/rest, optional chaining)
- Promise va Async/Await
- DOM bilan rendering (React/Frameworks ga o'tish uchun tayyorgarlik)

Qaysi mavzuni keyingi dars qilishimiz kerak?
## 1. 💡 Sodda Tushuntirish va Analogiya

### Web Components va Shadow DOM nima?
* **Web Components (Veb Komponentlar):** Bu hech qanday framework (React, Vue, Angular va h.k.) ishlatmasdan, brauzerning o'zida yangi, maxsus HTML teglarini (masalan, `<user-card>`, `<image-slider>`) yaratishga yordam beradigan texnologiyalar to'plamidir.
* **Shadow DOM (Soyali DOM):** Bu komponentingiz atrofida "himoya qalqoni" yaratadigan texnologiya. Shadow DOM ichidagi HTML va CSS kodlari butunlay yopiq bo'ladi: tashqi CSS stillari uning ichiga ta'sir qilmaydi, uning ichidagi CSS stillari esa tashqi sahifani buzib yubormaydi.

### Real hayotiy analogiya
Tasavvur qiling, siz **yangi aqlli choynak (Smart Kettle)** sotib oldingiz:
* **Custom Element:** Bu choynakning o'zi. Uning tashqi ko'rinishi va tugmalari bor. Siz uni sahifangizga `<smart-kettle></smart-kettle>` deb qo'shasiz.
* **Shadow DOM:** Bu choynakning ichki simlari, isitish elementi va sensorlari. Ular choynak korpusi bilan yopilgan (himoyalangan). Siz tashqaridan turib u simlarni o'zgartira olmaysiz. Agar uyingizdagi boshqa jihozning rangi qizil bo'lsa, bu choynakning ichki tizimiga ta'sir qilmaydi.
* **Templates va Slots:** Choynakka suv solish uchun maxsus teshik (Slot) mavjud. Siz uning ichiga xohlagan suvni (oddiy yoki filtrlangan) quya olasiz. Slot — tashqi ma'lumotlarni komponentning ichki qismiga xavfsiz joylashtirish joyidir.

---

## 2. 💻 Real Kod Misollari

### 1. Oddiy Custom Element
Ushbu element sahifada `Hello, [ism]!` degan matnni chiqaradi:
```javascript
class SayHello extends HTMLElement {
  constructor() {
    super(); // HTMLElement-ning konstruktorini chaqirish shart
  }

  // Element DOM-ga qo'shilganda ishga tushadi
  connectedCallback() {
    const name = this.getAttribute("name") || "Mehmon";
    this.innerHTML = `<p>Hello, <strong>${name}</strong>!</p>`;
  }
}

// Elementni ro'yxatdan o'tkazamiz
customElements.define("say-hello", SayHello);
```
**HTML-da foydalanilishi:**
```html
<say-hello name="Jasur"></say-hello>
<!-- Ekranda: Hello, Jasur! -->
```

### 2. Shadow DOM bilan Ishlash (Style Encapsulation)
Tashqi sahifadagi stillardan butunlay mustaqil komponent:
```javascript
class UserProfile extends HTMLElement {
  connectedCallback() {
    // 1. Shadow root biriktiramiz
    const shadow = this.attachShadow({ mode: "open" });

    // 2. Ichki HTML va stillarni belgilaymiz
    shadow.innerHTML = `
      <style>
        /* Bu stil faqat ushbu komponent ichida ishlaydi, tashqariga ta'sir qilmaydi */
        .card {
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f9f9f9;
        }
        h2 {
          color: darkblue;
        }
      </style>
      <div class="card">
        <h2>Foydalanuvchi Profili</h2>
        <p>Ism: Profil egasi</p>
      </div>
    `;
  }
}
customElements.define("user-profile", UserProfile);
```

### 3. `<template>` va `<slot>` dan Foydalanish
Shablon va dinamik joylashtirish (Content projection):
```html
<!-- HTML shablon e'lon qilamiz (Ekranda ko'rinmaydi) -->
<template id="custom-alert-tpl">
  <style>
    .alert {
      padding: 10px;
      margin: 10px 0;
      border-left: 5px solid red;
      background-color: #ffe6e6;
    }
  </style>
  <div class="alert">
    <strong>Diqqat!</strong>
    <!-- Slot orqali tashqi kontent shu yerga kiradi -->
    <slot name="message">Standart ogohlantirish matni</slot>
  </div>
</template>
```
**JavaScript:**
```javascript
class CustomAlert extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("custom-alert-tpl");
    // Shablonni nusxalaymiz (clone) va shadow root-ga qo'shamiz
    shadow.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("custom-alert", CustomAlert);
```
**HTML-da foydalanish:**
```html
<custom-alert>
  <span slot="message">Sessiya muddati tugadi, iltimos qayta kiring!</span>
</custom-alert>
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Custom Elements Registry
Brauzer `customElements.define('teg-nom', Class)` chaqirilganda, ko'rsatilgan klassni ichki jadvalga yozib qo'yadi. Sahifa yuklanayotganda yoki JS orqali element yaratilganda brauzer ushbu jadvaldan elementni izlaydi va uning hayotiy sikl metodlarini chaqiradi.

### 2. Shadow DOM Daraxti (Shadow Tree)
Dasturdagi odatiy DOM daraxti **Light DOM** deb ataladi. Elementga shadow DOM ulanganidan so'ng u yerda **Shadow Root** yaratiladi. Uning ichidagi elementlar alohida tarmoqda bo'ladi.
* **Flat Tree:** Brauzer ekranga chizayotgan vaqtda Light DOM va Shadow DOM-ni birlashtirib "Flat Tree" hosil qiladi, bunda `<slot>` ichiga Light DOM-dagi tegishli elementlar joylashtiriladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Element Nomi Qoidasini Buzish
Custom element nomida tire (`-`) bo'lishi shart.
```javascript
// XATO:
customElements.define("mycard", MyCard); // Brauzer xatolik beradi

// TO'G'RI:
customElements.define("my-card", MyCard);
```

### 2. Atributlarni Kuzatishda `observedAttributes` ni E'lon Qilmaslik
Agar siz faqat `attributeChangedCallback` yozsangiz-u, lekin qaysi atributlarni kuzatish kerakligini ko'rsatmasangiz, metod ishga tushmaydi.
```javascript
// XATO:
class UserCard extends HTMLElement {
  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`${name} o'zgardi: ${newVal}`);
  }
}

// TO'G'RI:
class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ["user-id", "theme"]; // Kuzatilishi kerak bo'lgan atributlar ro'yxati
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`${name} o'zgardi: ${newVal}`);
  }
}
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Web Components o'zi nima va u qaysi 3 ta texnologiyaga asoslanadi?
   * **Javob:** Custom Elements, Shadow DOM va HTML Templates (shablonlar).
2. **Savol:** Custom element yozganda qaysi klassdan voris olish shart?
   * **Javob:** `HTMLElement` klassidan yoki uning hosilalaridan (masalan, `HTMLButtonElement`).
3. **Savol:** HTML-da yozilgan `<template>` tegi ichidagi narsalar sahifada ko'rinadimi?
   * **Javob:** Yo'q, template tarkibi inert hisoblanadi, ya'ni u sahifada ko'rinmaydi va undagi media (rasm, video) yuklanmaydi, to u JS yordamida klonlanib DOM-ga qo'shilmaguncha.
4. **Savol:** `connectedCallback` nima vazifani bajaradi?
   * **Javob:** Element sahifadagi DOM daraxtiga muvaffaqiyatli ulanganida ishga tushadi (React-dagi `componentDidMount` kabi).

### Middle
5. **Savol:** `disconnectedCallback` metodida odatda nimalar qilinadi?
   * **Javob:** Element DOM-dan o'chirilganda ishlaydi. Unda xotira oqishining oldini olish uchun global event listenerlarni o'chirish, `setInterval`larni tozalash kabi tozalash ishlari bajariladi.
6. **Savol:** Shadow DOM tashqi CSS-dan qanday himoyalanadi?
   * **Javob:** Shadow boundary (soya chegarasi) tufayli global CSS qoidalari shadow DOM ichidagi elementlarga ta'sir qilmaydi (CSS Custom Properties - ya'ni o'zgaruvchilar bundan mustasno).
7. **Savol:** Slot nima va u qanday turlarga bo'linadi?
   * **Javob:** Slot — komponent ichida tashqi HTML-ni qabul qiluvchi joy. U ikki xil bo'ladi: Nomlanmagan (default slot) va Nomlangan (Named slot, masalan `<slot name="header">`).
8. **Savol:** Shadow DOM-dagi `:host` va `:host-context` o'rtasidagi farq nima?
   * **Javob:** `:host` komponentning o'zini tanlaydi va stillaydi. `:host-context(selector)` esa komponentning otasi yoki ajdodi ma'lum bir CSS klassga ega bo'lsagina komponentni stillashga imkon beradi (masalan, `.dark-theme :host` dark mode uchun).

### Senior
9. **Savol:** Shadow DOM ichidagi voqea (Event) tashqariga tarqalganda (bubble) nima sodir bo'ladi?
   * **Javob:** Inkapsulyatsiyani saqlash uchun voqea obyekti qayta maqsadlanadi (Event Retargeting). Ya'ni tashqi DOM voqea Shadow DOM ichidagi aniq elementdan emas, balki komponentning o'zidan (`host` elementidan) chiqqan deb hisoblaydi.
10. **Savol:** Shadow DOM ichidagi elementlarni tashqaridan qanday qilib stillash mumkin?
    * **Javob:** 1) CSS Custom Properties (Variables) orqali; 2) `::part()` psevdo-elementi yordamida, agar komponent ichidagi elementga `part="qism-nomi"` atributi berilgan bo'lsa.
11. **Savol:** Autonomous Custom Elements va Customized Built-in Elements o'rtasidagi farq nimada?
    * **Javob:** Autonomous elementlar `HTMLElement`dan voris oladi va butunlay yangi teg yaratadi (masalan `<my-button>`). Customized built-in elementlar esa mavjud HTML tegidan (masalan, `<button is="my-button">`) voris olib uning funksionalligini kengaytiradi.
12. **Savol:** Shadow DOM-ga ega komponentni sinovdan o'tkazishda (Unit testing) qanday qiyinchiliklar bor va ularni qanday hal qilinadi?
    * **Javob:** Standart `document.querySelector` shadow root ichini ko'ra olmaydi. Testlarda komponentning `shadowRoot.querySelector` xossasi orqali uning ichki elementlarini tanlab test qilish lozim.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar `/Users/farhod/Desktop/github/js-uz/scratch/webComponents_exercises.json` faylida berilgan. Ularni bajarib, Shadow DOM va Custom Elementlar yozishni mashq qiling.

---

## 7. 📝 12 ta Mini Test

Test savollari `/Users/farhod/Desktop/github/js-uz/scratch/webComponents_quizzes.json` faylida berilgan. Bilimingizni sinash uchun ularga javob bering.

---

## 8. 🎯 Real Project Case Study

### Custom Tooltip (Maslahat oynasi) Komponenti

Loyiha davomida ko'plab joylarda ishlatiladigan, matn ustiga borganda chiquvchi tooltip komponentini yaratamiz. U mutlaqo mustaqil stilga ega bo'ladi:

```javascript
class CustomTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Tooltip matnini atributdan olamiz
    this.tooltipText = this.getAttribute("text") || "Maslahat matni yozilmagan";
    
    // Shadow DOM ichki strukturasini yaratam icon va matn bilan
    this.shadowRoot.innerHTML = `
      <style>
        .tooltip-container {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        .tooltip-box {
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: #fff;
          text-align: center;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          z-index: 10;
        }
        .tooltip-container:hover .tooltip-box {
          opacity: 1;
        }
      </style>
      <span class="tooltip-container">
        <slot>ⓘ</slot> <!-- Tashqi element (masalan matn) kiradigan joy -->
        <div class="tooltip-box">${this.tooltipText}</div>
      </span>
    `;
  }
}

customElements.define("custom-tooltip", CustomTooltip);
```
**HTML loyihada ishlatilishi:**
```html
<p>
  JavaScript dasturlash tili juda 
  <custom-tooltip text="Dasturlash tili unumdorligini oshirish">o'zgaruvchan</custom-tooltip> 
  hisoblanadi.
</p>
```

---

## 9. 🚀 Performance va Optimization

* **Inert Shablonlar:** Har safar `innerHTML` yaratgandan ko'ra, `<template>` shablonini bir marta yaratib, undan nusxa olish (clone) xotira va tezlik jihatidan samaralidir.
* **Xotira tozalash:** `disconnectedCallback` metodida komponent yaratgan event listenerlarni tozalang, aks holda komponent o'chib ketsa ham xotirada qolaveradi.

---

## 10. 📌 Cheat Sheet

| Metod/Texnologiya | Vazifasi | Misol kod |
| :--- | :--- | :--- |
| **customElements.define** | Custom elementni ro'yxatdan o'tkazish | `customElements.define('my-el', MyEl)` |
| **attachShadow** | Elementga Shadow DOM ulash | `this.attachShadow({mode: 'open'})` |
| **connectedCallback** | Element DOM-ga qo'shilganda ishlaydi | `connectedCallback() { ... }` |
| **disconnectedCallback** | Element DOM-dan o'chirilganda ishlaydi | `disconnectedCallback() { ... }` |
| **observedAttributes** | Kuzatiladigan atributlar ro'yxati | `static get observedAttributes() { return ['id']; }` |
| **slot** | Tashqi HTML-ni qabul qilish joyi | `<slot name="header"></slot>` |
| **:host** | Shadow DOM ichidan turib elementning o'zini stillash | `:host { display: block; }` |

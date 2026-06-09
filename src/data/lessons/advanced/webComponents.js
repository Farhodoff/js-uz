export const webComponents = {
  id: "webComponents",
  title: "Web Components va Shadow DOM",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Web Components nima?
**Web Components** — bu HTML, CSS va JavaScript-ni birlashtirib, istalgan freymvorkdan (React, Vue, Angular) mustaqil bo'lgan, qayta ishlatiladigan shaxsiy HTML teglarini (masalan, \`<my-button>\`, \`<user-card>\`) yaratish imkonini beruvchi texnologiyalar to'plamidir.

U uchta asosiy ustundan iborat:
1. **Custom Elements (Shaxsiy elementlar):** Brauzerga yangi HTML teg va uning ishlash mantig'ini (JavaScript klassi orqali) tanitish.
2. **Shadow DOM (Ko'lka DOM):** Komponentning HTML va CSS-ni tashqi sahifadan butunlay izolyatsiya qilish (yashirish). Tashqi sahifadagi global CSS ushbu komponent ichiga ta'sir qilmaydi, uning CSS-i ham tashqarini buzmaydi.
3. **HTML Templates va Slots (\`<template>\`, \`<slot>\`):** Komponent shablonini sahifa yuklanganda bajarilmaydigan, faqat nusxalab ishlatiladigan formatda saqlash va uning ichiga dinamik ma'lumotlar joylash (Slots).

### Real hayotiy analogiya
Tasavvur qiling, siz **uy qurayapsiz**:
* **Oddiy HTML/CSS:** G'ishtlarni birma-bir terib, har bir xonani alohida bo'yaysiz. Agar bitta xonadagi bo'yoq to'kilsa, u ikkinchi xonaga o'tishi mumkin (CSS global ziddiyatlari).
* **Web Components:** Tayyor **import qilingan xona moduli (kapsula)**. Ushbu xona fabrikada tayyorlangan, uning devorlari izolyatsiya qilingan (Shadow DOM). Siz uni shunchaki uyingizga keltirib ulaysiz. Tashqi tomondan bu xonaning qanday tuzilgani ko'rinmaydi, uning devor rangi global bo'yoqlardan buzilmaydi.
* **Slot:** Ushbu xona modulidagi bo'sh joylar (masalan, mebel uchun joy). Siz xonani sotib olasiz va uning ichidagi bo'sh joyga (slot) o'zingiz xohlagan divan yoki stolni joylashtirasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda Custom Element)
Salomlashuvchi maxsus \`<hello-world>\` elementini yaratish:
\`\`\`javascript
// 1. Yangi element klassini yaratish
class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Salom, Dunyo! Bu mening birinchi komponentim.';
  }
}

// 2. Brauzerga ro'yxatdan o'tkazish (Teg nomida majburiy chiziq '-' bo'lishi shart)
customElements.define('hello-world', HelloWorld);
\`\`\`
* **HTML-da ishlatilishi:**
  \`\`\`html
  <hello-world></hello-world>
  \`\`\`
* **Natija:** Sahifada "Salom, Dunyo!..." matni paydo bo'ladi.
* **Qachon ishlatiladi:** Sodda va hech qanday murakkab CSS talab qilmaydigan shaxsiy widget-larda.

### 2. Intermediate Example (Shadow DOM va CSS Izolyatsiyasi)
Tashqi sahifadagi global CSS dan mutlaqo himoyalangan foydalanuvchi kartochkasi:
\`\`\`javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    // Shadow root yaratish (mode: 'open' tashqaridan JS orqali kirish imkonini beradi)
    const shadow = this.attachShadow({ mode: 'open' });
    
    // HTML va CSS shablonini yozish
    shadow.innerHTML = \`
      <style>
        .card {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-family: sans-serif;
          background: #f9f9f9;
        }
        h3 { color: #2c3e50; } /* Global h3 rangini buzmaydi, global CSS ham buni o'zgartira olmaydi */
      </style>
      <div class="card">
        <h3>Foydalanuvchi Profili</h3>
        <p>Ism: Alisher Navoiy</p>
      </div>
    \`;
  }
}
customElements.define('user-card', UserCard);
\`\`\`
* **Qachon ishlatiladi:** Micro-frontends loyihalarida yoki sahifaning global CSS-laridan qo'rqmasdan ishlatiladigan uchinchi tomon widget-larida.

### 3. Advanced Example (Templates va Slots)
HTML \`<template>\` va \`<slot>\` yordamida dinamik kontent qabul qiluvchi modal yoki kartochka yaratish:
\`\`\`javascript
// HTML-da shablon yoziladi (js faylda ham yaratish mumkin):
/*
<template id="card-template">
  <style>
    .wrapper { border: 2px solid royalblue; padding: 15px; }
  </style>
  <div class="wrapper">
    <h2><slot name="title">Standart Sarlavha</slot></h2>
    <p><slot name="content">Standart matn</slot></p>
  </div>
</template>
*/

class DynamicCard extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('card-template');
    // Shablonni nusxalash (cloneNode) va shadow DOM-ga qo'shish
    shadow.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dynamic-card', DynamicCard);
\`\`\`
* **HTML-da ishlatilishi:**
  \`\`\`html
  <dynamic-card>
    <span slot="title">Mening Maxsus Kitobim</span>
    <span slot="content">Ushbu kitob o'zbek adabiyoti durdonasidir.</span>
  </dynamic-card>
  \`\`\`

### 4. Production Example (Atributlarni kuzatish va hayotiy sikl - Reactive Attributes)
Atribut o'zgarishlarini kuzatib, UI-ni avtomatik yangilovchi dynamic \`<counter-element>\` komponenti:
\`\`\`javascript
class CounterElement extends HTMLElement {
  static get observedAttributes() {
    return ['count']; // Kuzatiladigan atributlar ro'yxati
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = \`
      <div>
        Soni: <span id="num">0</span>
        <button id="btn">+1</button>
      </div>
    \`;
  }

  connectedCallback() {
    // Tugmaga hodisa bog'lash
    this.shadowRoot.querySelector('#btn').addEventListener('click', () => {
      const current = parseInt(this.getAttribute('count') || 0);
      this.setAttribute('count', current + 1);
    });
  }

  // Atribut o'zgarganda ishga tushadigan funksiya (React useEffect kabi)
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count') {
      this.shadowRoot.querySelector('#num').textContent = newValue;
    }
  }
}
customElements.define('counter-element', CounterElement);
\`\`\`

### 5. Enterprise Example (Custom Events - Komponentlararo aloqa)
Komponent ichidan tashqi sahifaga xavfsiz Custom Event-lar yuborish:
\`\`\`javascript
class CustomButton extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = \`<button>Sotib olish</button>\`;
    
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      // Custom Event yaratish va tashqariga otish (bubbles: true tashqariga chiqishini ta'minlaydi)
      const event = new CustomEvent('purchase', {
        detail: { productId: 105, price: 150000 },
        bubbles: true,
        composed: true // Shadow DOM chegarasidan tashqariga chiqishiga ruxsat berish
      });
      this.dispatchEvent(event);
    });
  }
}
customElements.define('custom-button', CustomButton);

// Tashqaridan (global JS-da) hodisani eshitish:
document.body.addEventListener('purchase', (e) => {
  console.log('Xarid qilindi:', e.detail.productId, e.detail.price);
});
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Freymvorklar ziddiyati (Framework lock-in):** Bugungi kunda yozilgan React komponenti 5 yildan keyin eskiradi yoki boshqa freymvorkka (masalan, Svelte yoki Vue) o'tish qiyin bo'ladi. Web Components standart brauzer API-si bo'lgani uchun abadiy ishlaydi.
* **Global CSS ifloslanishi (CSS Leakage):** Katta loyihalarda \`.button\` sinfi tasodifan boshqa joydagi tugmalarni buzib qo'yishi mumkin. Shadow DOM buni to'liq izolyatsiya qiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Custom Element nomida defis (\`-\`) belgisini yozishni unutish
#### Xato:
\`\`\`javascript
customElements.define('mybutton', MyButton); // Xato!
\`\`\`
#### Nima uchun noto'g'ri:
Brauzer standart HTML teglar bilan shaxsiy teglarni aralashtirib yubormasligi uchun Custom Element nomida kamida bitta \`-\` (defis) bo'lishi qat'iyan talab qilinadi.
#### To'g'ri usul:
\`\`\`javascript
customElements.define('my-button', MyButton); // To'g'ri
\`\`\`

### 2. Shadow DOM rejimi (mode) haqida noto'g'ri qaror
#### Xato:
\`attachShadow({ mode: 'closed' })\` yozish va keyinchalik tashqaridan komponentni sinab ko'rish yoki boshqarishga qiynalish.
#### To'g'ri usul:
Ko'p hollarda \`mode: 'open'\` ishlating. Bu tashqi JS kodlariga komponent ichidagi elementlarni tahlil qilish imkonini beradi.

### 3. Custom Element klassida \`super()\` ni chaqirishni unutish
#### Xato:
\`\`\`javascript
class MyCard extends HTMLElement {
  constructor() {
    // super() chaqirilmagan
    this.attachShadow({ mode: 'open' });
  }
}
\`\`\`
#### Nima uchun noto'g'ri:
Sinf meros olgan \`HTMLElement\`ning konstruktorini ishga tushirish uchun \`super()\` birinchi qatorda chaqirilishi shart. Aks holda \`this\` ishlamaydi va xatolik beradi.
#### To'g'ri usul:
Konstruktor ichida birinchi bo'lib \`super()\`ni chaqiring.

### 4. Shadow DOM ichiga o'tilgan Event-larga \`composed: true\` bermaslik
#### Xato:
Shadow DOM ichidagi tugma bosilganda tashqi sahifadagi \`addEventListener\` ishlamasligi.
#### To'g'ri usul:
Custom Event yaratganda \`composed: true\` bering. Aks holda hodisa Shadow chegarasida to'xtab qoladi.

### 5. Komponent o'chirilganda hodisalarni (EventListeners) toza qilmaslik (Memory Leak)
#### Xato:
\`connectedCallback\`da global \`window.addEventListener('resize')\` bog'lab, komponent o'chirilganda uni olib tashlamaslik.
#### To'g'ri usul:
\`disconnectedCallback\` hayotiy siklida barcha global tinglovchilarni o'chirib yuboring.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Web Components nima va u qaysi 3 ta texnologiyaga tayanadi?
   * **Javob:** Custom Elements, Shadow DOM va HTML Templates/Slots.

2. **Savol:** Custom Element yaratish shartlari qanday?
   * **Javob:** Teg nomida defis (\`-\`) bo'lishi shart va u \`HTMLElement\` sinfidan voris olgan bo'lishi kerak.

3. **Savol:** Shadow DOM nima va u oddiy DOM dan qanday farq qiladi?
   * **Javob:** Shadow DOM komponentning HTML va CSS tuzilishini global sahifadan to'liq izolyatsiya qiladigan maxsus yordamchi daraxtdir.

4. **Savol:** HTML-dagi \`<template>\` tegi nima uchun ishlatiladi?
   * **Javob:** U sahifa yuklanganda render qilinmaydigan, faqat JS orqali nusxalanib komponent shablonlari uchun ishlatiladigan HTML konteyneridir.

### Middle (5–8)
5. **Savol:** Web Components hayotiy sikli (Lifecycle methods) qaysilar va ularning vazifalari nima?
   * **Javob:** 
     * \`constructor()\`: Obyekt yaratilganda.
     * \`connectedCallback()\`: Element DOM-ga qo'shilganda (React componentDidMount kabi).
     * \`disconnectedCallback()\`: Element DOM-dan o'chirilganda (componentWillUnmount).
     * \`attributeChangedCallback()\`: Atributlar o'zgarganda.

6. **Savol:** Shadow DOM dagi \`mode: 'open'\` va \`mode: 'closed'\` farqi nima?
   * **Javob:** Open rejimida tashqi JS \`element.shadowRoot\` orqali ichkarini o'qiy oladi. Closed rejimida esa shadowRoot null qaytaradi.

7. **Savol:** \`<slot>\` tegi nima va u qanday turlarga bo'linadi?
   * **Javob:** Slot komponent ichiga tashqaridan HTML kontent joylash uchun joy. Turlari: Default slot va Named (nomlangan) slot.

8. **Savol:** Shadow DOM ichidagi CSS qoidalari qanday ustuvorlikka ega va tashqi global CSS komponentni o'zgartira oladimi?
   * **Javob:** Tashqi CSS Shadow DOM ichidagi elementlarni o'zgartira olmaydi. Faqat CSS Custom Properties (Variables) orqali ichki o'zgaruvchilarga ta'sir qilish mumkin.

### Senior (9–12)
9. **Savol:** Shadow DOM chegarasidan Event Retargeting (hodisalarni qayta yo'naltirish) qanday amalga oshadi?
   * **Javob:** Shadow DOM ichida sodir bo'lgan hodisa tashqariga chiqqanda, uning \`target\` xossasi tashqi sahifa uchun shaxsiy ichki element emas, balki butun boshli Custom Element bo'lib ko'rinadi. Bu izolyatsiyani buzmaslik uchun kerak.

10. **Savol:** Web Components yordamida freymvorklardan mustaqil Micro-Frontend qanday loyihalashtiriladi?
    * **Javob:** Har bir micro-frontend alohida Custom Element sifatida build qilinadi va asosiy ilovada oddiy HTML teglari ko'rinishida birlashtiriladi.

11. **Savol:** Shadow DOM ichidagi elementlarni tashqaridan global CSS orqali bezash uchun qaysi psevdo-elementlar yoki selector-lar ishlatiladi (\`::part\`, \`:host\`)?
    * **Javob:** \`:host\` komponentning o'zini bezaydi. \`::part\` esa komponent ichidagi maxsus belgilangan elementlarni tashqaridan bezashga ruxsat beradi.

12. **Savol:** Custom Elements-da Memory Leak (xotira oqishi) qanday yuzaga keladi va uning oldini qanday olish mumkin?
    * **Javob:** Komponent o'chganda (destroy bo'lganda) global event listener-larni yoki pub-sub obunalarini tozalash esdan chiqsa xotirada qoladi. disconnectedCallback ichida barcha tozalashlarni yozish kerak.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Freymvorklardan mustaqil universal "Sotib olish" vidjeti
Biz yirik kompaniya uchun barcha saytlarda (WordPress, React, PHP saytlar) bir xil ishlaydigan va savatchaga tovar qo'shadigan Universal Tugma yaratishimiz kerak.

#### Yechim:
Biz Shadow DOM yordamida \`<buy-button>\` komponentini yaratamiz. U o'zining CSS dizayniga ega. Bosilganda tashqariga dynamic xarid event-ini otadi:
\`\`\`javascript
class BuyButton extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        button { background: #e74c3c; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
      </style>
      <button>Sotib olish</button>
    \`;
    shadow.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-to-cart', {
        detail: { id: this.getAttribute('product-id') },
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define('buy-button', BuyButton);
\`\`\`
Ushbu komponentni istalgan saytga faqat bitta js fayl ulab, \`<buy-button product-id="101"></buy-button>\` ko'rinishida darhol ishlatish mumkin.

---

## 9. 🚀 Performance va Optimization

* **CSS yuklamasini kamaytirish:** Shadow DOM ichida CSS yozilganda, u faqat o'sha komponent yaratilganda xotiraga yuklanadi va global CSS daraxtini (CSSOM) kattalashtirmaydi.
* **Declarative Shadow DOM:** Server-Side Rendering (SSR) yordamida JS yuklanmasdan oldin Shadow DOM tuzilishini tezkor yuklash texnologiyasi.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **Custom Element** | \`customElements.define('my-el', MyEl);\` | Brauzerga yangi teg qo'shish | Nomida defis bo'lishi shart |
| **Shadow DOM** | \`this.attachShadow({ mode: 'open' })\` | CSS va HTML izolyatsiya qilish | mode: open tavsiya etiladi |
| **Slot** | \`<slot name="title"></slot>\` | Dinamik kontent joylash | Komponent ichida ishlatiladi |
| **connectedCallback**| lifecycle method | DOM-ga qo'shilganda ishlaydi | Hodisalarni bog'lash uchun mos |
| **::part()** | CSS selector | Tashqaridan bezashga ruxsat berish | Komponent ichida part atributi kerak |
`,
  exercises: [
  {
    "id": 1,
    "title": "Salomlashuvchi Komponent",
    "instruction": "HTML-da `<hello-world>` maxsus tegi orqali ishlatiladigan Custom Element yarating. U yuklanganda (`connectedCallback`) uning `textContent` qiymatiga 'Salom, Dunyo!' yozuvi o'rnatilsin.",
    "startingCode": "class HelloWorld extends HTMLElement {\n  connectedCallback() {\n    // Kodni yozing\n  }\n}\n\ncustomElements.define('hello-world', HelloWorld);",
    "hint": "this.textContent = 'Salom, Dunyo!';",
    "test": "try { const el = document.createElement('hello-world'); document.body.appendChild(el); if(el.textContent !== 'Salom, Dunyo!') return 'connectedCallback ichida matn to\\'g\\'ri o\\'rnatilmadi'; } catch(e) { return 'Xatolik: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Shadow DOM Karta",
    "instruction": "Open rejimidagi Shadow DOM ulanadigan `<shadow-card>` maxsus elementini yarating. U yaratilganda (`connectedCallback`) Shadow DOM ichiga 'Karta' matni yozilgan `div` qo'shilsin.",
    "startingCode": "class ShadowCard extends HTMLElement {\n  connectedCallback() {\n    // 1. attachShadow\n    // 2. innerHTML ga div qo'shish\n  }\n}\n\ncustomElements.define('shadow-card', ShadowCard);",
    "hint": "const shadow = this.attachShadow({ mode: 'open' }); shadow.innerHTML = '<div>Karta</div>';",
    "test": "try { const el = document.createElement('shadow-card'); document.body.appendChild(el); if(!el.shadowRoot) return 'Shadow DOM biriktirilmadi'; if(el.shadowRoot.innerHTML.indexOf('Karta') === -1) return 'Shadow DOM ichiga Karta div-i yozilmadi'; } catch(e) { return 'Xatolik: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Dinamik Atribut",
    "instruction": "`username` atributini kuzatadigan `<dynamic-user>` elementini yarating. Atribut o'zgarganda Shadow DOM ichidagi `span` elementiga 'User: [qiymat]' yozuvi chiqsin. (Sinflar oldindan ro'yxatdan o'tkazilganda xato bo'lmasligi uchun dynamic-user3 nomidan foydalaning).",
    "startingCode": "class DynamicUser extends HTMLElement {\n  static get observedAttributes() {\n    return ['username'];\n  }\n  constructor() {\n    super();\n    this.attachShadow({ mode: 'open' });\n    this.shadowRoot.innerHTML = '<span>User: </span>';\n  }\n  attributeChangedCallback(name, oldValue, newValue) {\n    if (name === 'username') {\n      this.shadowRoot.querySelector('span').textContent = 'User: ' + newValue;\n    }\n  }\n}\ncustomElements.define('dynamic-user3', DynamicUser);",
    "hint": "Kodni diqqat bilan o'rganing, barcha hayotiy sikl metodlari to'g'ri bog'langan.",
    "test": "try { const el = document.createElement('dynamic-user3'); document.body.appendChild(el); el.setAttribute('username', 'Ali'); if(el.shadowRoot.querySelector('span').textContent !== 'User: Ali') return 'Atribut o\\'zgarganda span matni yangilanmadi'; } catch(e) { return 'Xatolik: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Web Components qaysi texnologiyaga tayanmaydi?",
    "options": ["Custom Elements", "Shadow DOM", "Virtual DOM", "HTML Templates"],
    "correctAnswer": 2,
    "explanation": "Virtual DOM React va Vue freymvorklari tomonidan ishlatiladi. Web Components esa Custom Elements, Shadow DOM va HTML Templates (brauzer standartlari)ga tayanadi."
  },
  {
    "id": 2,
    "question": "Custom Element nomlashda qaysi belgi bo'lishi qat'iy talab etiladi?",
    "options": ["Chiziqcha (-)", "Nuqta (.)", "Tag chiziq (_)", "Undov (!)"],
    "correctAnswer": 0,
    "explanation": "Brauzer o'zining standart HTML teglari bilan chalkashtirib yubormasligi uchun Custom Element nomida kamida bitta '-' (defis) belgisi bo'lishi shart (masalan, <my-card>)."
  },
  {
    "id": 3,
    "question": "Shadow DOM-ning asosiy vazifasi nima?",
    "options": [
      "Ma'lumotlarni shifrlash",
      "Komponent HTML va CSS kodini sahifadan to'liq izolyatsiya qilish (yashirish)",
      "Sahifani tezroq render qilish",
      "Animatsiyalarni boshqarish"
    ],
    "correctAnswer": 1,
    "explanation": "Shadow DOM komponentning ichki stil va tuzilishini tashqaridan yashiradi, bu CSS leak (global stillar ziddiyati) muammosini hal qiladi."
  },
  {
    "id": 4,
    "question": "Custom Element DOM-ga qo'shilganda (yuklanganda) qaysi hayotiy sikl metodi (lifecycle method) ishga tushadi?",
    "options": ["constructor()", "connectedCallback()", "disconnectedCallback()", "attributeChangedCallback()"],
    "correctAnswer": 1,
    "explanation": "Element jismonan DOM daraxtiga ulanishi bilan connectedCallback() metodi ishga tushadi (React componentDidMount kabi)."
  },
  {
    "id": 5,
    "question": "Custom Element klassida super() nima uchun chaqiriladi?",
    "options": [
      "Ota sinf (HTMLElement) konstruktorini chaqirish va 'this' kalit so'zini faollashtirish uchun",
      "Stil berish uchun",
      "Shadow DOM yaratish uchun",
      "O'chirish uchun"
    ],
    "correctAnswer": 0,
    "explanation": "ES6 sinflarida ota sinf HTMLElement ning funksional imkoniyatlarini ishga solish uchun super() birinchi navbatda chaqirilishi majburiydir."
  },
  {
    "id": 6,
    "question": "Shadow DOM-da mode: 'closed' nimani anglatadi?",
    "options": [
      "Komponent yopiq holatda saqlanishini",
      "Tashqi JavaScript kod element.shadowRoot orqali ichkariga kira olmasligini",
      "CSS stillari umuman ishlamasligini",
      "Komponent o'chirilganini"
    ],
    "correctAnswer": 1,
    "explanation": "mode: 'closed' holatida element.shadowRoot qiymati null qaytadi, ya'ni tashqi JS skriptlar komponent ichiga kira olmaydi."
  },
  {
    "id": 7,
    "question": "Atribut o'zgarishlarini kuzatish uchun Custom Element sinfida qaysi funksiya bo'lishi kerak?",
    "options": ["observedAttributes get-metodi", "constructor", "connectedCallback", "watchAttribute"],
    "correctAnswer": 0,
    "explanation": "observedAttributes static get-metodi qaysi atributlar kuzatilishini ro'yxat ko'rinishida qaytarishi shart."
  },
  {
    "id": 8,
    "question": "Slot (<slot>) nima uchun ishlatiladi?",
    "options": [
      "Tezkor xotirani boshqarish uchun",
      "Komponent ichiga tashqaridan dynamic HTML kontent joylash (bo'sh joy) uchun",
      "Indekslar uchun",
      "Vaqtinchalik o'zgaruvchilar uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Slot yordamida biz komponent shabloni ichiga tashqaridan ixtiyoriy HTML teg yoki matn joylaymiz (nomlangan va default turlari bor)."
  },
  {
    "id": 9,
    "question": "Atribut o'zgarganda Custom Element-da qaysi metod ishga tushadi?",
    "options": ["connectedCallback()", "disconnectedCallback()", "attributeChangedCallback()", "constructor()"],
    "correctAnswer": 2,
    "explanation": "observedAttributes ro'yxatidagi atribut o'zgarganida attributeChangedCallback(name, oldValue, newValue) chaqiriladi."
  },
  {
    "id": 10,
    "question": "Shadow DOM ichidagi maxsus elementlarni tashqaridan bezash uchun qaysi CSS selector ishlatiladi?",
    "options": ["::part()", "::shadow()", "::element()", ":host()"],
    "correctAnswer": 0,
    "explanation": "::part() selektori Shadow DOM ichida 'part' atributi berilgan elementlarni tashqaridan global CSS yordamida bezash imkonini beradi."
  },
  {
    "id": 11,
    "question": "Custom Element sahifadan o'chib ketganda xotirani tozalash qayerda bajariladi?",
    "options": ["constructor()", "connectedCallback()", "disconnectedCallback()", "attributeChangedCallback()"],
    "correctAnswer": 2,
    "explanation": "disconnectedCallback() element sahifadan o'chirilganda chaqiriladi, shu sababli memory leak oldini olish uchun eventListener-lar shu yerda tozalanadi."
  },
  {
    "id": 12,
    "question": "Tashqaridagi global CSS qoidalari Shadow DOM ichidagi elementlarga qanday ta'sir qiladi?",
    "options": [
      "To'liq ta'sir qiladi",
      "Ular butunlay to'siladi (ta'sir qilmaydi), faqat CSS Custom Properties (o'zgaruvchilar) o'tishi mumkin",
      "Faqat matn rangiga ta'sir qiladi",
      "Baza xatolik beradi"
    ],
    "correctAnswer": 1,
    "explanation": "Shadow DOM to'liq izolyatsiya qilingani uchun tashqi CSS uning ichki elementlarini o'zgartira olmaydi. Faqat CSS variables orqali stildan foydalanish mumkin."
  }
]

};

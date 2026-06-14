export const webComponents = {
  id: "webComponents",
  title: "Web Components va Shadow DOM",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Web Components va Shadow DOM nima?
* **Web Components (Veb Komponentlar):** Bu hech qanday framework (React, Vue, Angular va h.k.) ishlatmasdan, brauzerning o'zida yangi, maxsus HTML teglarini (masalan, \`<user-card>\`, \`<image-slider>\`) yaratishga yordam beradigan texnologiyalar to'plamidir.
* **Shadow DOM (Soyali DOM):** Bu komponentingiz atrofida "himoya qalqoni" yaratadigan texnologiya. Shadow DOM ichidagi HTML va CSS kodlari butunlay yopiq bo'ladi: tashqi CSS stillari uning ichiga ta'sir qilmaydi, uning ichidagi CSS stillari esa tashqi sahifani buzib yubormaydi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **yangi aqlli choynak (Smart Kettle)** sotib oldingiz:
* **Custom Element:** Bu choynakning o'zi. Uning tashqi ko'rinishi va tugmalari bor. Siz uni sahifangizga \`<smart-kettle></smart-kettle>\` deb qo'shasiz.
* **Shadow DOM:** Bu choynakning ichki simlari, isitish elementi va sensorlari. Ular choynak korpusi bilan yopilgan (himoyalangan). Siz tashqaridan turib u simlarni o'zgartira olmaysiz. Agar uyingizdagi boshqa jihozning rangi qizil bo'lsa, bu choynakning ichki tizimiga ta'sir qilmaydi.
* **Templates va Slots:** Choynakka suv solish uchun maxsus teshik (Slot) mavjud. Siz uning ichiga xohlagan suvni (oddiy yoki filtrlangan) quya olasiz. Slot — tashqi ma'lumotlarni komponentning ichki qismiga xavfsiz joylashtirish joyidir.

---

## 2. 💻 Real Kod Misollari

### 1. Oddiy Custom Element
Ushbu element sahifada \`Hello, [ism]!\` degan matnni chiqaradi:
\`\`\`javascript
class SayHello extends HTMLElement {
  constructor() {
    super(); // HTMLElement-ning konstruktorini chaqirish shart
  }

  // Element DOM-ga qo'shilganda ishga tushadi
  connectedCallback() {
    const name = this.getAttribute("name") || "Mehmon";
    this.innerHTML = \`<p>Hello, <strong>\${name}</strong>!</p>\`;
  }
}

// Elementni ro'yxatdan o'tkazamiz
customElements.define("say-hello", SayHello);
\`\`\`
**HTML-da foydalanilishi:**
\`\`\`html
<say-hello name="Jasur"></say-hello>
<!-- Ekranda: Hello, Jasur! -->
\`\`\`

### 2. Shadow DOM bilan Ishlash (Style Encapsulation)
Tashqi sahifadagi stillardan butunlay mustaqil komponent:
\`\`\`javascript
class UserProfile extends HTMLElement {
  connectedCallback() {
    // 1. Shadow root biriktiramiz
    const shadow = this.attachShadow({ mode: "open" });

    // 2. Ichki HTML va stillarni belgilaymiz
    shadow.innerHTML = \`
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
    \`;
  }
}
customElements.define("user-profile", UserProfile);
\`\`\`

### 3. \`<template>\` va \`<slot>\` dan Foydalanish
Shablon va dinamik joylashtirish (Content projection):
\`\`\`html
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
\`\`\`
**JavaScript:**
\`\`\`javascript
class CustomAlert extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("custom-alert-tpl");
    // Shablonni nusxalaymiz (clone) va shadow root-ga qo'shamiz
    shadow.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("custom-alert", CustomAlert);
\`\`\`
**HTML-da foydalanish:**
\`\`\`html
<custom-alert>
  <span slot="message">Sessiya muddati tugadi, iltimos qayta kiring!</span>
</custom-alert>
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Custom Elements Registry
Brauzer \`customElements.define('teg-nom', Class)\` chaqirilganda, ko'rsatilgan klassni ichki jadvalga yozib qo'yadi. Sahifa yuklanayotganda yoki JS orqali element yaratilganda brauzer ushbu jadvaldan elementni izlaydi va uning hayotiy sikl metodlarini chaqiradi.

### 2. Shadow DOM Daraxti (Shadow Tree)
Dasturdagi odatiy DOM daraxti **Light DOM** deb ataladi. Elementga shadow DOM ulanganidan so'ng u yerda **Shadow Root** yaratiladi. Uning ichidagi elementlar alohida tarmoqda bo'ladi.
* **Flat Tree:** Brauzer ekranga chizayotgan vaqtda Light DOM va Shadow DOM-ni birlashtirib "Flat Tree" hosil qiladi, bunda \`<slot>\` ichiga Light DOM-dagi tegishli elementlar joylashtiriladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Element Nomi Qoidasini Buzish
Custom element nomida tire (\`-\`) bo'lishi shart.
\`\`\`javascript
// XATO:
customElements.define("mycard", MyCard); // Brauzer xatolik beradi

// TO'G'RI:
customElements.define("my-card", MyCard);
\`\`\`

### 2. Atributlarni Kuzatishda \`observedAttributes\` ni E'lon Qilmaslik
Agar siz faqat \`attributeChangedCallback\` yozsangiz-u, lekin qaysi atributlarni kuzatish kerakligini ko'rsatmasangiz, metod ishga tushmaydi.
\`\`\`javascript
// XATO:
class UserCard extends HTMLElement {
  attributeChangedCallback(name, oldVal, newVal) {
    console.log(\`\${name} o'zgardi: \${newVal}\`);
  }
}

// TO'G'RI:
class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ["user-id", "theme"]; // Kuzatilishi kerak bo'lgan atributlar ro'yxati
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(\`\${name} o'zgardi: \${newVal}\`);
  }
}
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Web Components o'zi nima va u qaysi 3 ta texnologiyaga asoslanadi?
   * **Javob:** Custom Elements, Shadow DOM va HTML Templates (shablonlar).
2. **Savol:** Custom element yozganda qaysi klassdan voris olish shart?
   * **Javob:** \`HTMLElement\` klassidan yoki uning hosilalaridan (masalan, \`HTMLButtonElement\`).
3. **Savol:** HTML-da yozilgan \`<template>\` tegi ichidagi narsalar sahifada ko'rinadimi?
   * **Javob:** Yo'q, template tarkibi inert hisoblanadi, ya'ni u sahifada ko'rinmaydi va undagi media (rasm, video) yuklanmaydi, to u JS yordamida klonlanib DOM-ga qo'shilmaguncha.
4. **Savol:** \`connectedCallback\` nima vazifani bajaradi?
   * **Javob:** Element sahifadagi DOM daraxtiga muvaffaqiyatli ulanganida ishga tushadi (React-dagi \`componentDidMount\` kabi).

### Middle
5. **Savol:** \`disconnectedCallback\` metodida odatda nimalar qilinadi?
   * **Javob:** Element DOM-dan o'chirilganda ishlaydi. Unda xotira oqishining oldini olish uchun global event listenerlarni o'chirish, \`setInterval\`larni tozalash kabi tozalash ishlari bajariladi.
6. **Savol:** Shadow DOM tashqi CSS-dan qanday himoyalanadi?
   * **Javob:** Shadow boundary (soya chegarasi) tufayli global CSS qoidalari shadow DOM ichidagi elementlarga ta'sir qilmaydi (CSS Custom Properties - ya'ni o'zgaruvchilar bundan mustasno).
7. **Savol:** Slot nima va u qanday turlarga bo'linadi?
   * **Javob:** Slot — komponent ichida tashqi HTML-ni qabul qiluvchi joy. U ikki xil bo'ladi: Nomlanmagan (default slot) va Nomlangan (Named slot, masalan \`<slot name="header">\`).
8. **Savol:** Shadow DOM-dagi \`:host\` va \`:host-context\` o'rtasidagi farq nima?
   * **Javob:** \`:host\` komponentning o'zini tanlaydi va stillaydi. \`:host-context(selector)\` esa komponentning otasi yoki ajdodi ma'lum bir CSS klassga ega bo'lsagina komponentni stillashga imkon beradi (masalan, \`.dark-theme :host\` dark mode uchun).

### Senior
9. **Savol:** Shadow DOM ichidagi voqea (Event) tashqariga tarqalganda (bubble) nima sodir bo'ladi?
   * **Javob:** Inkapsulyatsiyani saqlash uchun voqea obyekti qayta maqsadlanadi (Event Retargeting). Ya'ni tashqi DOM voqea Shadow DOM ichidagi aniq elementdan emas, balki komponentning o'zidan (\`host\` elementidan) chiqqan deb hisoblaydi.
10. **Savol:** Shadow DOM ichidagi elementlarni tashqaridan qanday qilib stillash mumkin?
    * **Javob:** 1) CSS Custom Properties (Variables) orqali; 2) \`::part()\` psevdo-elementi yordamida, agar komponent ichidagi elementga \`part="qism-nomi"\` atributi berilgan bo'lsa.
11. **Savol:** Autonomous Custom Elements va Customized Built-in Elements o'rtasidagi farq nimada?
    * **Javob:** Autonomous elementlar \`HTMLElement\`dan voris oladi va butunlay yangi teg yaratadi (masalan \`<my-button>\`). Customized built-in elementlar esa mavjud HTML tegidan (masalan, \`<button is="my-button">\`) voris olib uning funksionalligini kengaytiradi.
12. **Savol:** Shadow DOM-ga ega komponentni sinovdan o'tkazishda (Unit testing) qanday qiyinchiliklar bor va ularni qanday hal qilinadi?
    * **Javob:** Standart \`document.querySelector\` shadow root ichini ko'ra olmaydi. Testlarda komponentning \`shadowRoot.querySelector\` xossasi orqali uning ichki elementlarini tanlab test qilish lozim.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar \`/Users/farhod/Desktop/github/js-uz/scratch/webComponents_exercises.json\` faylida berilgan. Ularni bajarib, Shadow DOM va Custom Elementlar yozishni mashq qiling.

---

## 7. 📝 12 ta Mini Test

Test savollari \`/Users/farhod/Desktop/github/js-uz/scratch/webComponents_quizzes.json\` faylida berilgan. Bilimingizni sinash uchun ularga javob bering.

---

## 8. 🎯 Real Project Case Study

### Custom Tooltip (Maslahat oynasi) Komponenti

Loyiha davomida ko'plab joylarda ishlatiladigan, matn ustiga borganda chiquvchi tooltip komponentini yaratamiz. U mutlaqo mustaqil stilga ega bo'ladi:

\`\`\`javascript
class CustomTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Tooltip matnini atributdan olamiz
    this.tooltipText = this.getAttribute("text") || "Maslahat matni yozilmagan";
    
    // Shadow DOM ichki strukturasini yaratam icon va matn bilan
    this.shadowRoot.innerHTML = \`
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
        <div class="tooltip-box">\${this.tooltipText}</div>
      </span>
    \`;
  }
}

customElements.define("custom-tooltip", CustomTooltip);
\`\`\`
**HTML loyihada ishlatilishi:**
\`\`\`html
<p>
  JavaScript dasturlash tili juda 
  <custom-tooltip text="Dasturlash tili unumdorligini oshirish">o'zgaruvchan</custom-tooltip> 
  hisoblanadi.
</p>
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Inert Shablonlar:** Har safar \`innerHTML\` yaratgandan ko'ra, \`<template>\` shablonini bir marta yaratib, undan nusxa olish (clone) xotira va tezlik jihatidan samaralidir.
* **Xotira tozalash:** \`disconnectedCallback\` metodida komponent yaratgan event listenerlarni tozalang, aks holda komponent o'chib ketsa ham xotirada qolaveradi.

---

## 10. 📌 Cheat Sheet

| Metod/Texnologiya | Vazifasi | Misol kod |
| :--- | :--- | :--- |
| **customElements.define** | Custom elementni ro'yxatdan o'tkazish | \`customElements.define('my-el', MyEl)\` |
| **attachShadow** | Elementga Shadow DOM ulash | \`this.attachShadow({mode: 'open'})\` |
| **connectedCallback** | Element DOM-ga qo'shilganda ishlaydi | \`connectedCallback() { ... }\` |
| **disconnectedCallback** | Element DOM-dan o'chirilganda ishlaydi | \`disconnectedCallback() { ... }\` |
| **observedAttributes** | Kuzatiladigan atributlar ro'yxati | \`static get observedAttributes() { return ['id']; }\` |
| **slot** | Tashqi HTML-ni qabul qilish joyi | \`<slot name="header"></slot>\` |
| **:host** | Shadow DOM ichidan turib elementning o'zini stillash | \`:host { display: block; }\` |
`,
  exercises: [
  {
    "id": 1,
    "title": "Sodda Custom Element yaratish",
    "instruction": "Ekranga 'Salom Dunyo' matnini chiqaruvchi `HelloWorld` nomli custom element yarating va uni `hello-world` tegi bilan ro'yxatdan o'tkazing.",
    "startingCode": "class HelloWorld extends HTMLElement {\n  // Kodni shu yerda yozing\n}\n\n// Elementni ro'yxatdan o'tkazing\n",
    "hint": "HTMLElement-dan voris oling, `connectedCallback()` metodida `this.innerHTML = 'Salom Dunyo';` yozing. Oxirida `customElements.define('hello-world', HelloWorld);` yordamida ro'yxatdan o'tkazing.",
    "test": "if (!code.includes('customElements.define')) return 'customElements.define yordamida element ro\\'yxatdan o\\'tkazilmadi';\nif (!code.includes('hello-world')) return 'Custom element nomi hello-world bo\\'lishi kerak';\ntry {\n  const sandbox = new Function('HTMLElement', code + '; return customElements.get(\"hello-world\");');\n  const MockHTMLElement = class {};\n  // Basic check to see if the definition exists in registry\n  // Since customElements might not exist in global context directly in node, we mock customElements or run in sandboxed way:\n  // Wait, let's mock customElements in the test environment to make sure it runs correctly without browser context\n  const mockRegistry = {};\n  const mockCustomElements = {\n    define: (name, cls) => mockRegistry[name] = cls,\n    get: (name) => mockRegistry[name]\n  };\n  const testFn = new Function('HTMLElement', 'customElements', code + '; return customElements.get(\"hello-world\");');\n  const El = testFn(class {}, mockCustomElements);\n  if (!El) return 'Element ro\\'yxatdan o\\'tmagan';\n  const inst = new El();\n  inst.connectedCallback();\n  if (inst.innerHTML !== 'Salom Dunyo') return 'Element ichidagi matn \"Salom Dunyo\" bo\\'lishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 2,
    "title": "Shadow DOM-ga ega Element",
    "instruction": "Ichki stillari tashqi muhitdan himoyalangan (Shadow DOM) bo'lgan `ShadowCard` elementini yarating. U `shadow-card` tegi bilan ro'yxatdan o'tishi va `connectedCallback` chaqirilganda o'ziga yopiq yoki ochiq shadow root (`this.attachShadow({mode: 'open'})`) biriktirib, uning ichiga `<h1>Card Title</h1>` matnini yozishi kerak.",
    "startingCode": "class ShadowCard extends HTMLElement {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "connectedCallback ichida `const shadow = this.attachShadow({mode: 'open'}); shadow.innerHTML = '<h1>Card Title</h1>';` deb yozing.",
    "test": "if (!code.includes('attachShadow')) return 'attachShadow yordamida Shadow DOM biriktirilishi shart';\ntry {\n  const mockRegistry = {};\n  const mockCustomElements = {\n    define: (name, cls) => mockRegistry[name] = cls,\n    get: (name) => mockRegistry[name]\n  };\n  const testFn = new Function('HTMLElement', 'customElements', code + '; customElements.define(\"shadow-card\", ShadowCard); return customElements.get(\"shadow-card\");');\n  const El = testFn(class {\n    attachShadow(opts) {\n      this.shadowRoot = { innerHTML: '' };\n      return this.shadowRoot;\n    }\n  }, mockCustomElements);\n  const inst = new El();\n  inst.connectedCallback();\n  if (!inst.shadowRoot || inst.shadowRoot.innerHTML !== '<h1>Card Title</h1>') return 'Shadow DOM ichiga to\\'g\\'ri HTML joylashtirilmadi';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 3,
    "title": "Attribut o'zgarishini kuzatish",
    "instruction": "`color` attributi o'zgarganda matn rangini o'zgartiruvchi `ColorText` elementini yarating. Buning uchun `observedAttributes` va `attributeChangedCallback` dan foydalaning. Teg nomi `color-text` bo'lsin.",
    "startingCode": "class ColorText extends HTMLElement {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`static get observedAttributes() { return ['color']; }` metodini qo'shing. `attributeChangedCallback(name, oldVal, newVal)` ichida `if (name === 'color') this.style.color = newVal;` deb yozing.",
    "test": "if (!code.includes('observedAttributes')) return 'observedAttributes metodi yozilishi shart';\nif (!code.includes('attributeChangedCallback')) return 'attributeChangedCallback metodi yozilishi shart';\ntry {\n  const mockRegistry = {};\n  const mockCustomElements = {\n    define: (name, cls) => mockRegistry[name] = cls,\n    get: (name) => mockRegistry[name]\n  };\n  const testFn = new Function('HTMLElement', 'customElements', code + '; customElements.define(\"color-text\", ColorText); return customElements.get(\"color-text\");');\n  const El = testFn(class {\n    constructor() {\n      this.style = {};\n    }\n  }, mockCustomElements);\n  if (El.observedAttributes && !El.observedAttributes.includes('color')) return 'color atributi kuzatiladiganlar ro\\'yxatiga kiritilmagan';\n  const inst = new El();\n  inst.attributeChangedCallback('color', null, 'red');\n  if (inst.style.color !== 'red') return 'Raqam yoki rang to\\'g\\'ri o\\'zgartirilmadi';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Web Components nima?",
    "options": [
      "Faqat React loyihalarida ishlatiladigan komponentlar to'plami",
      "Brauzer darajasida ishlaydigan, qayta ishlatiluvchi va inkapsulyatsiya qilingan HTML teglarini yaratishga imkon beruvchi texnologiyalar to'plami",
      "CSS frameworklarining yangi nomi",
      "Node.js server kutubxonasi"
    ],
    "correctAnswer": 1,
    "explanation": "Web Components — bu hech qanday frameworklarsiz (React, Vue) brauzerning o'zida yangi, maxsus HTML teglarini (Custom Elements) yaratish texnologiyasidir."
  },
  {
    "id": 2,
    "question": "Custom element yaratilganda uning nomi uchun qanday majburiy qoida mavjud?",
    "options": [
      "Nom faqat bosh harflardan iborat bo'lishi kerak",
      "Nomda kamida bitta tire (chiziqcha, '-') belgisi bo'lishi shart",
      "Nom majburiy ravishda 'custom_' so'zi bilan boshlanishi kerak",
      "Maxsus qoidalar yo'q, xohlagan nomdan foydalanish mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Custom element nomlarida standart HTML teglaridan (masalan, `div`, `span`) ajralib turishi uchun kamida bitta tire bo'lishi shart (masalan: `my-card`, `custom-button`)."
  },
  {
    "id": 3,
    "question": "Custom elementning qaysi hayotiy sikl (lifecycle) metodi u DOM-ga qo'shilganda avtomatik chaqiriladi?",
    "options": [
      "`constructor()`",
      "`connectedCallback()`",
      "`disconnectedCallback()`",
      "`attributeChangedCallback()`"
    ],
    "correctAnswer": 1,
    "explanation": "`connectedCallback()` custom element DOM daraxtiga muvaffaqiyatli qo'shilganda ishga tushadi va bu yerda odatda boshlang'ich renderlash ishlari amalga oshiriladi."
  },
  {
    "id": 4,
    "question": "Shadow DOM-ning asosiy vazifasi nima?",
    "options": [
      "Sahifadagi elementlarni to'liq qoraytirish (Dark mode)",
      "HTML, CSS va JS kodlarini inkapsulyatsiya qilish (tashqi CSS va JS kodi komponent ichiga ta'sir qilmasligi va aksincha)",
      "Ma'lumotlar bazasidan ma'lumotlarni yashirincha yuklash",
      "JS fayllarini siqib berish"
    ],
    "correctAnswer": 1,
    "explanation": "Shadow DOM komponentning ichki qismini alohida muhitda saqlaydi, bu esa stillarning tashqi dunyo bilan to'qnashmasligini (CSS encapsulation) ta'minlaydi."
  },
  {
    "id": 5,
    "question": "Custom element sahifadan (DOM-dan) o'chirilganda qaysi lifecycle metod chaqiriladi?",
    "options": [
      "`connectedCallback()`",
      "`disconnectedCallback()`",
      "`adoptedCallback()`",
      "`destroyCallback()`"
    ],
    "correctAnswer": 1,
    "explanation": "`disconnectedCallback()` element DOM-dan o'chirilganda ishlaydi. Bu yerda xotira oqishini (memory leaks) oldini olish uchun event listener va taymerlar tozalanadi."
  },
  {
    "id": 6,
    "question": "Shadow DOM-da `mode: 'open'` va `mode: 'closed'` o'rtasidagi farq nima?",
    "options": [
      "`open` rejimida shadow root-ga tashqi JS fayllardan `element.shadowRoot` orqali kirish mumkin, `closed` rejimida esa kirib bo'lmaydi (null qaytadi)",
      "`open` rejimida CSS stillari ishlaydi, `closed` rejimida faqat HTML ko'rinadi",
      "`open` rejimini o'zgartirib bo'lmaydi, `closed` rejimini o'zgartirsa bo'ladi",
      "Hech qanday farqi yo'q"
    ],
    "correctAnswer": 0,
    "explanation": "`open` rejimi tashqaridan shadow DOM-ga kirish imkonini beradi. `closed` rejimida esa `shadowRoot` xossasi tashqaridan yopiq bo'ladi va unga faqat komponent ichida murojaat qilish mumkin."
  },
  {
    "id": 7,
    "question": "Web Components-da `<template>` tegining xususiyati nimada?",
    "options": [
      "U sahifa yuklanishi bilan darhol ekranda render bo'ladi",
      "Uning ichidagi HTML brauzer tomonidan yuklanadi, lekin foydalanuvchiga ko'rsatilmaydi va faqat JS orqali nusxalab olingandan keyingina ishlaydi",
      "U faqat CSS kodlarini yozish uchun ishlatiladi",
      "U ma'lumotlarni serverga yuborish uchun ishlatiladigan formadir"
    ],
    "correctAnswer": 1,
    "explanation": "`<template>` tegi ichidagi tarkib sahifada ko'rinmaydi. U shablon sifatida xizmat qiladi va JS orqali klonlanib (`cloneNode(true)`) DOM-ga qo'shiladi."
  },
  {
    "id": 8,
    "question": "Web Components shablonlarida `<slot>` nima vazifani bajaradi?",
    "options": [
      "U faqat o'yin o'ynash uchun ishlatiladi",
      "Tashqaridan kelgan HTML kontentni komponent ichidagi ma'lum bir joyga joylashtirish (placeholder) uchun ishlatiladi",
      "U elementlarning joylashuvini avtomatik to'g'rilaydi",
      "U serverdan keladigan so'rovlarni qabul qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "Slot — bu komponent shablonidagi joy ochuvchi (placeholder) bo'lib, komponent ichiga tashqaridan berilgan HTML tarkibini mos ravishda joylashtiradi (Content projection)."
  },
  {
    "id": 9,
    "question": "Custom elementda attribut o'zgarishini kuzatish uchun qaysi metodlar juftligi ishlatiladi?",
    "options": [
      "`watchAttributes` va `updateCallback`",
      "`static get observedAttributes()` va `attributeChangedCallback()`",
      "`addEventListener` va `dispatchEvent`",
      "`onAttributeChange` va `render`"
    ],
    "correctAnswer": 1,
    "explanation": "Kuzatiladigan atributlar `static get observedAttributes()` massivida qaytariladi va ular o'zgarganda `attributeChangedCallback(name, oldVal, newVal)` avtomatik ravishda chaqiriladi."
  },
  {
    "id": 10,
    "question": "Shadow DOM ichidan turib, komponentning o'ziga (host elementiga) stil berish uchun qaysi CSS selektori ishlatiladi?",
    "options": [
      "`:root`",
      "`:host`",
      "`:self`",
      "`::shadow-parent`"
    ],
    "correctAnswer": 1,
    "explanation": "Shadow DOM-da `:host` CSS psevdo-klassi komponentning o'zini (ya'ni shadow root biriktirilgan tashqi elementni) tanlash uchun ishlatiladi."
  },
  {
    "id": 11,
    "question": "Custom Elementni ro'yxatdan o'tkazganda xatolik yuz bermasligi uchun qaysi klassdan voris olish shart?",
    "options": [
      "`Object`",
      "`HTMLElement`",
      "`HTMLDivElement` yoki uning hosilalari",
      "Faqat `HTMLElement` (yoki uning maxsus sub-klasslari, masalan `HTMLButtonElement` kabi)"
    ],
    "correctAnswer": 3,
    "explanation": "Barcha custom elementlar `HTMLElement` klassidan yoki uning aniqroq HTML element hosilalaridan (masalan, `HTMLParagraphElement`) voris olgan bo'lishi kerak."
  },
  {
    "id": 12,
    "question": "Tashqaridan komponent ichidagi ma'lum bir slotga yo'naltirilgan elementni Shadow DOM ichidan turib qanday stilize qilish mumkin?",
    "options": [
      "`::slot`",
      "`::slotted()`",
      "`:assigned-nodes`",
      "`::content`"
    ],
    "correctAnswer": 1,
    "explanation": "`::slotted(selector)` psevdo-elementi komponent slotiga joylashtirilgan (tashqi) elementlarga nisbatan Shadow DOM ichidan stil yozish imkonini beradi."
  }
]

};

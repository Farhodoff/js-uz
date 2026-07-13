export const domPerformance = {
  id: "dom-performance",
  title: "DOM Performance: Reflow va Repaint",
  theory: `
### 1. Beginner Analogy (Boshlang'ich tushuncha)
Tasavvur qiling, siz uy quryapsiz va uning rejasini (chizmasini) tuzgansiz. 
Agar siz xonadagi birorta mebelning rangini o'zgartirsangiz (bu Repaint - bo'yash), bu juda oson va kam vaqt oladi. 
Lekin, agar siz devorni buzib, xonaning hajmini o'zgartirsangiz (bu Reflow - qayta qurish), siz nafaqat shu xonani, balki unga tutash boshqa xonalarni va butun uyning rejasini qayta hisoblab chiqishingiz kerak bo'ladi.
DOM (Document Object Model) da ham xuddi shunday. Elementlarning rangini o'zgartirish (Repaint) nisbatan "arzon" operatsiya, lekin ularning o'lchami yoki joylashuvini o'zgartirish (Reflow) brauzer uchun "qimmat" va og'ir jarayondir.

### 2. Deep Dive (Chuqurlashtirilgan tahlil)
Brauzer ekranda nimadir ko'rsatishi uchun Critical Rendering Path (Kritik Renderlash Yo'li) orqali o'tadi:
1. **DOM Tree**: HTML kod parse qilinib, DOM daraxti yasaladi.
2. **CSSOM Tree**: CSS kod parse qilinib, CSSOM daraxti yasaladi.
3. **Render Tree**: DOM va CSSOM birlashtiriladi. Ekranda ko'rinmaydigan elementlar (masalan, \\\`display: none\\\`) bu yerga kirmaydi.
4. **Layout (Reflow)**: Brauzer Render daraxtidagi har bir elementning aniq ekrandagi joylashuvini (koordinatalarini) va o'lchamlarini (kenglik, balandlik) hisoblaydi.
5. **Paint (Repaint)**: Har bir element piksellarga aylantirilib (rasterization) chiziladi. Rasm, rang, tekstlar ekranga chiziladi.
6. **Composite**: Agar sahifada bir nechta qatlamlar (layers) bo'lsa (masalan, \\\`z-index\\\`, \\\`transform\\\` ishlatilganda), brauzer ularni to'g'ri tartibda ustma-ust qo'yib, yakuniy tasvirni hosil qiladi.

**Reflow (Layout) nimalarni chaqiradi?**
- Oyna o'lchamining o'zgarishi (Resize)
- Elementning \\\`width\\\`, \\\`height\\\`, \\\`padding\\\`, \\\`margin\\\` kabi geometrik xususiyatlarini o'zgartirish
- Elementni DOM ga qo'shish yoki olib tashlash
- Element xususiyatlarini o'qish: \\\`offsetWidth\\\`, \\\`clientHeight\\\`, \\\`getComputedStyle()\\\` kabi. Brauzer aniq javob qaytarish uchun sinxron ravishda butun Layout'ni qayta hisoblashga majbur bo'ladi!

**Repaint nimalarni chaqiradi?**
- \\\`color\\\`, \\\`background-color\\\`, \\\`box-shadow\\\`, \\\`visibility\\\` kabi faqat ko'rinishga ta'sir qiluvchi xususiyatlar.

### 3. Edge Cases and Senior Interview Questions
**Layout Thrashing (Layout Isrofgarchiligi)**
Dasturchilar ko'pincha DOM ni o'qish (read) va yozish (write) amallarini ketma-ket, sikl ichida bajarishadi. Bu Layout Thrashing deb ataladi. 
Siz biror elementning geometriyasini o'zgartirganingizda, brauzer navbatdagi o'qish jarayoni aniq bo'lishi uchun zudlik bilan Reflow ni amalga oshirishi kerak bo'ladi.

\\\`\\\`\\\`javascript
// Yomon amaliyot (Layout Thrashing)
const elements = document.querySelectorAll('.box');
for (let i = 0; i < elements.length; i++) {
  // O'qiymiz (Reflow ni majburlaydi)
  const width = elements[i].offsetWidth;
  // Yozamiz (Navbatdagi siklda yana Reflow ni kutadi)
  elements[i].style.width = width + 10 + 'px';
}
\\\`\\\`\\\`

**Yechim (O'qish va yozishni guruhlash):**
Layout Thrashing ning oldini olish uchun barcha o'qishlarni (read) birinchi bajaring, keyin esa yozishlarni (write) qiling. FastDOM kabi kutubxonalar yoki \\\`requestAnimationFrame\\\` bu jarayonni osonlashtiradi.

\\\`\\\`\\\`javascript
// Yaxshi amaliyot
const elements = document.querySelectorAll('.box');
const widths = [];

// 1. Faqat o'qiymiz
for (let i = 0; i < elements.length; i++) {
  widths.push(elements[i].offsetWidth);
}

// 2. Faqat yozamiz (Bir martagina Reflow bo'ladi)
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = widths[i] + 10 + 'px';
}
\\\`\\\`\\\`

**GPU Tezlatish va Composite:**
Animatsiyalar uchun iloji boricha \\\`transform\\\` (masalan, \\\`translate\\\`, \\\`scale\\\`) va \\\`opacity\\\` dan foydalanish kerak. Ular Layout va Paint bosqichlarini chetlab o'tib, to'g'ridan-to'g'ri **Composite** bosqichida GPU tomonidan qayta ishlanadi.

### 4. Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD
    A[HTML Parse] --> B[DOM Tree]
    C[CSS Parse] --> D[CSSOM Tree]
    B --> E[Render Tree]
    D --> E
    E --> F[Layout / Reflow]
    F --> G[Paint / Repaint]
    G --> H[Composite]
    H --> I[Screen]
    
    style F fill:#f9c,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: "dp-ex-1",
      title: "DocumentFragment yarating",
      description: "Berilgan so'zlar massivi asosida \\`li\\` elementlar yaratib, ularni \\`DocumentFragment\\` ga joylashtiradigan va uni qaytaradigan \\`createFragment\\` funksiyasini yozing.",
      initialCode: `function createFragment(words) {
  // your code here
}`,
      solution: `function createFragment(words) {
  const frag = document.createDocumentFragment();
  words.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    frag.appendChild(li);
  });
  return frag;
}`,
      tests: [
        {
          test: `const frag = createFragment(['a', 'b']);\nreturn frag.nodeType === 11 && frag.childNodes.length === 2 && frag.childNodes[0].textContent === 'a';`,
          description: "Funksiya to'g'ri DocumentFragment qaytarishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-2",
      title: "O'qish va Yozishni ajratish",
      description: "Massivda DOM elementlari berilgan. Ularning kengligini \\`offsetWidth\\` orqali o'qib, har biriga 20px qo'shish kerak. Layout thrashing bo'lmasligi uchun avval barchasini o'qing, so'ng yozing.",
      initialCode: `function optimizeLayout(elements) {
  // barcha o'qishlarni bajaring va keyin yozing
}`,
      solution: `function optimizeLayout(elements) {
  const widths = elements.map(el => el.offsetWidth);
  elements.forEach((el, index) => {
    el.style.width = (widths[index] + 20) + 'px';
  });
}`,
      tests: [
        {
          test: `const els = [{offsetWidth: 10, style: {}}, {offsetWidth: 20, style: {}}];\noptimizeLayout(els);\nreturn els[0].style.width === '30px' && els[1].style.width === '40px';`,
          description: "Barcha elementlarning kengligi 20px ga oshishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-3",
      title: "GPU ga o'tkazish",
      description: "Elementni o'ng tomonga 100px surish kerak. Buni Reflow chaqiradigan \\`marginLeft\\` bilan emas, GPU da ishlovchi \\`transform\\` bilan amalga oshiruvchi \\`moveRight\\` funksiyasini yozing.",
      initialCode: `function moveRight(element) {
  // transform qo'llang
}`,
      solution: `function moveRight(element) {
  element.style.transform = 'translateX(100px)';
}`,
      tests: [
        {
          test: `const el = { style: {} };\nmoveRight(el);\nreturn el.style.transform === 'translateX(100px)';`,
          description: "Element transform orqali surilishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-4",
      title: "Uslublarni guruhlash",
      description: "Elementga ketma-ket uslublar berish o'rniga barcha uslublarni o'z ichiga olgan 'active' klassini qo'shuvchi funksiyani yozing.",
      initialCode: `function applyStyles(element) {
  // 'active' klassini qo'shing
}`,
      solution: `function applyStyles(element) {
  element.classList.add('active');
}`,
      tests: [
        {
          test: `const el = document.createElement('div');\napplyStyles(el);\nreturn el.classList.contains('active');`,
          description: "Elementga active klassi qo'shilgan bo'lishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-5",
      title: "Bir vaqtda bir nechta uslubni berish",
      description: "Agar class qo'shish imkoni bo'lmasa, \\`style.cssText\\` orqali uslubni yozish mumkin. Elementga 'width: 100px; height: 100px;' beruvchi funksiyani yozing.",
      initialCode: `function setMultipleStyles(element) {
  // cssText dan foydalaning
}`,
      solution: `function setMultipleStyles(element) {
  element.style.cssText = 'width: 100px; height: 100px;';
}`,
      tests: [
        {
          test: `const el = { style: {} };\nsetMultipleStyles(el);\nreturn el.style.cssText.includes('width: 100px') && el.style.cssText.includes('height: 100px');`,
          description: "cssText to'g'ri o'rnatilgan bo'lishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-6",
      title: "DOM ni yashirib o'zgartirish",
      description: "Element ichida juda ko'p o'zgarish qilish uchun uni oldin yashiring ('display: none'), matnini 'Tugadi' qiling, so'ng yana ko'rsating ('block').",
      initialCode: `function modifyOffline(element) {
  // yashiring, o'zgartiring, ko'rsating
}`,
      solution: `function modifyOffline(element) {
  element.style.display = 'none';
  element.textContent = 'Tugadi';
  element.style.display = 'block';
}`,
      tests: [
        {
          test: `const el = { style: {}, textContent: '' };\nmodifyOffline(el);\nreturn el.textContent === 'Tugadi' && el.style.display === 'block';`,
          description: "Element o'zgarib qayta ko'rsatilishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-7",
      title: "CloneNode orqali ishlash",
      description: "Elementning klonini oling, unga matni 'Yangi' bo'lgan \\`li\\` qo'shing va parentNode orqali aslini klonga almashtiring.",
      initialCode: `function replaceWithClone(element) {
  // klon oling, o'zgartiring, almashtiring
}`,
      solution: `function replaceWithClone(element) {
  const clone = element.cloneNode(true);
  const li = document.createElement('li');
  li.textContent = 'Yangi';
  clone.appendChild(li);
  element.parentNode.replaceChild(clone, element);
}`,
      tests: [
        {
          test: `const parent = document.createElement('div');\nconst child = document.createElement('ul');\nparent.appendChild(child);\nreplaceWithClone(child);\nreturn parent.childNodes[0].childNodes[0].textContent === 'Yangi';`,
          description: "Klon muvaffaqiyatli almashtirilgan bo'lishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-8",
      title: "requestAnimationFrame (rAF)",
      description: "updateUI funksiyasini \\`requestAnimationFrame\\` ichida chaqiruvchi funksiyani yozing.",
      initialCode: `function scheduleUpdate(updateUI) {
  // updateUI ni rAF ichida chaqiring
}`,
      solution: `function scheduleUpdate(updateUI) {
  requestAnimationFrame(updateUI);
}`,
      tests: [
        {
          test: `let called = false;\nglobalThis.requestAnimationFrame = (cb) => { cb(); };\nscheduleUpdate(() => called = true);\nreturn called === true;`,
          description: "Funksiya requestAnimationFrame dan foydalanishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-9",
      title: "InnerHtml o'rniga TextContent",
      description: "Element ichini eng tez va xavfsiz tarzda bo'shatish uchun uni \\`textContent\\` xususiyatidan foydalanib tozalovchi funksiyani yozing.",
      initialCode: `function clearElement(element) {
  // elementni bo'shating
}`,
      solution: `function clearElement(element) {
  element.textContent = '';
}`,
      tests: [
        {
          test: `const el = document.createElement('div');\nel.innerHTML = '<p>Test</p>';\nclearElement(el);\nreturn el.textContent === '';`,
          description: "Element ichi bo'shatilgan bo'lishi kerak."
        }
      ]
    },
    {
      id: "dp-ex-10",
      title: "Voqealarni tozalash (Clean up listeners)",
      description: "Berilgan elementdan 'click' eventida ishlaydigan xandlerni (handler) \\`removeEventListener\\` yordamida o'chiruvchi funksiya yozing.",
      initialCode: `function cleanupEvent(element, handler) {
  // click handler ni olib tashlang
}`,
      solution: `function cleanupEvent(element, handler) {
  element.removeEventListener('click', handler);
}`,
      tests: [
        {
          test: `const el = document.createElement('button');\nlet count = 0;\nconst handler = () => count++;\nel.addEventListener('click', handler);\ncleanupEvent(el, handler);\nel.click();\nreturn count === 0;`,
          description: "Event to'g'ri olib tashlangan bo'lishi kerak."
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "dp-q-1",
      question: "Critical Rendering Path qadamlari orasida HTML va CSS birlashtirilib hosil bo'ladigan daraxt qanday ataladi?",
      options: [
        "DOM Tree",
        "CSSOM Tree",
        "Render Tree",
        "Composite Tree"
      ],
      answer: "Render Tree",
      explanation: "DOM va CSSOM birlashtirilib Render Tree yasaladi. Unda faqat ekranda ko'rinadigan elementlar qoladi."
    },
    {
      id: "dp-q-2",
      question: "Brauzer elementlarning ekrandagi aniq o'lchami va joylashuvini hisoblaydigan jarayon nima deb ataladi?",
      options: [
        "Paint",
        "Reflow (Layout)",
        "Composite",
        "Parsing"
      ],
      answer: "Reflow (Layout)",
      explanation: "Reflow yoki Layout - bu elementlarning o'lchami, pozitsiyasi kabi geometriyasini hisoblash jarayonidir."
    },
    {
      id: "dp-q-3",
      question: "Qaysi xususiyatning o'zgarishi albatta Reflow (Layout) chaqiradi?",
      options: [
        "color",
        "background-color",
        "box-shadow",
        "width va height"
      ],
      answer: "width va height",
      explanation: "O'lchamning o'zgarishi boshqa elementlar joylashuviga ham ta'sir qilgani uchun Reflow chaqiradi."
    },
    {
      id: "dp-q-4",
      question: "Qaysi xususiyatning o'zgarishi faqat Repaint chaqiradi (Layout'ni o'tkazib yuboradi)?",
      options: [
        "color",
        "margin",
        "position: absolute",
        "font-size"
      ],
      answer: "color",
      explanation: "Rangning o'zgarishi elementning o'lchami yoki joylashuvini o'zgartirmaydi, shuning uchun faqat Repaint bo'ladi."
    },
    {
      id: "dp-q-5",
      question: "Layout Thrashing nima?",
      options: [
        "Sahifaning sekin yuklanishi",
        "Ketma-ket DOM o'qish va yozish orqali keraksiz Reflow'larni ko'paytirish",
        "Tarmoq so'rovlarining kutib qolishi",
        "Xotiraning to'lib qolishi (Memory leak)"
      ],
      answer: "Ketma-ket DOM o'qish va yozish orqali keraksiz Reflow'larni ko'paytirish",
      explanation: "Sikl yoki ketma-ket amallarda DOM geometriyasini o'qish va darhol o'zgartirish brauzerni qayta-qayta hisoblashga majbur qiladi."
    },
    {
      id: "dp-q-6",
      question: "Animatsiyalar qaysi CSS xususiyati yordamida qilinsa Reflow va Repaint ni o'tkazib yuborib GPU da ishlashi mumkin?",
      options: [
        "margin-left",
        "padding-top",
        "transform va opacity",
        "width va height"
      ],
      answer: "transform va opacity",
      explanation: "transform va opacity xususiyatlari Composite bosqichida apparat (GPU) yordamida tez ishlashi mumkin."
    },
    {
      id: "dp-q-7",
      question: "DocumentFragment nima maqsadda ishlatiladi?",
      options: [
        "HTML ni parsing qilish uchun",
        "Xotirada soxta DOM yaratib, o'zgarishlarni guruhlab yakunda bitta Reflow bilan qo'shish uchun",
        "Tarmoqdan HTML yuklab olish uchun",
        "CSS uslublarni qo'shish uchun"
      ],
      answer: "Xotirada soxta DOM yaratib, o'zgarishlarni guruhlab yakunda bitta Reflow bilan qo'shish uchun",
      explanation: "Fragment orqali ko'p sonli DOM elementlari yig'ilib, bir vaqtda haqiqiy DOM ga qo'shiladi."
    },
    {
      id: "dp-q-8",
      question: "Elementning DOMdagi ko'rinishini 'display: none' qilib o'zgartirib, so'ng yana ko'rsatish necha marta Reflow chaqiradi?",
      options: [
        "Faqat 1 marta",
        "2 marta (yashirish va ko'rsatishda)",
        "Reflow chaqirmaydi",
        "O'zgartirishlar soniga qarab cheksiz"
      ],
      answer: "2 marta (yashirish va ko'rsatishda)",
      explanation: "Element display: none bo'lganda 1 marta va qayta block (yoki boshqa) bo'lganda yana 1 marta reflow bo'ladi. Oraliqdagi o'zgarishlar e'tiborga olinmaydi."
    },
    {
      id: "dp-q-9",
      question: "Quyidagi metodlardan qaysi biri sinxron tarzda Reflow chaqiradi (Layout forceni yuzaga keltiradi)?",
      options: [
        "document.getElementById",
        "element.getBoundingClientRect()",
        "console.log",
        "setTimeout"
      ],
      answer: "element.getBoundingClientRect()",
      explanation: "getBoundingClientRect, offsetWidth va shunga o'xshash xususiyatlar aniq ma'lumot berish uchun joriy Reflow ni yakunlashga majbur qiladi."
    },
    {
      id: "dp-q-10",
      question: "Qaysi brauzer API si orqali animatsiyalarni aynan brauzerning keyingi freymi (Paint qadami) dan oldin sinxronlash mumkin?",
      options: [
        "setInterval",
        "setTimeout",
        "requestAnimationFrame",
        "setImmediate"
      ],
      answer: "requestAnimationFrame",
      explanation: "requestAnimationFrame brauzerning render loopiga moslashgan eng optimal animatsiya usuli hisoblanadi."
    },
    {
      id: "dp-q-11",
      question: "Render Tree va DOM Tree ning farqi nimada?",
      options: [
        "Ular bir xil narsa",
        "Render Tree faqat CSS dan iborat",
        "Render Tree faqat ekranda ko'rinadigan DOM elementlarini o'z ichiga oladi (display:none qatnashmaydi)",
        "DOM Tree brauzerda ko'rinmaydi"
      ],
      answer: "Render Tree faqat ekranda ko'rinadigan DOM elementlarini o'z ichiga oladi (display:none qatnashmaydi)",
      explanation: "Element 'display: none' bo'lsa, u DOM daraxtida bo'ladi, lekin Render daraxtiga o'tmaydi."
    },
    {
      id: "dp-q-12",
      question: "Bir necha inline-styllarni ketma-ket yozish qanday optimizatsiya qilinishi tavsiya etiladi?",
      options: [
        "Hech qanday o'zgartirish kerak emas",
        "Barchasini bitta CSS sinfiga (class) jamlab qo'shish orqali",
        "Ikkita setTimeout orqali bajarish",
        "Har birini alohida funksiyalarda chaqirish"
      ],
      answer: "Barchasini bitta CSS sinfiga (class) jamlab qo'shish orqali",
      explanation: "CSS class yoki cssText orqali brauzer bir martalik uslub hisoblashini (style calculation) amalga oshiradi."
    }
  ]
};

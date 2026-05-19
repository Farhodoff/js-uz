export const domManipulation = {
  id: "dom-manipulation",
  title: "DOM Manipulyatsiya: Veb-sahifani o'zgartirir dasturlash",
  level: "O'rta daraja",
  description: "HTML elementlarini dinamik yaratish, o'zgartirish, o'chirish va ulariga event'larni ulagish.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, sizda "To-do list" (vazifalar ro'yxati) bor. Foydalanuvchi yangi vazifa yozib "Qo'shish"ni bossa, ro'yxatga yangi qator qo'shilishi kerak. Yoki "O'chirish" tugmasini bossa, o'sha qator yo'qolishi kerak. Yoki rang o'zgarishi kerak. Bularning hammasi **DOM manipulyatsiya** orqali qilinadi.

DOM (Document Object Model) — bu HTML sahifaning JavaScript tarafiy model'i. Unda barcha elementlar, xususiyatlari, va ular orasidagi munosabatlar saqlangan.

## 2. SODDALIK (Analogiya)

Buni **Lego konstruktoriga** o'xshatish mumkin:
- **Sahifani ko'rish (Select):** Sizda 1000 ta Lego bloki bor, siz faqat qizil blokni topmoqchisiz. \`document.querySelector()\`
- **Yaratish (Create):** Yangi Lego bo'lagi yaratish. \`createElement\`
- **Ulash (Add):** Uni asosiy blokga yopishtirlash. \`appendChild\`, \`append\`
- **O'zgartirish (Modify):** Blokni boshqa rangga bo'yash yoki kattaligini o'zgartirish. \`className\`, \`style\`
- **O'chirish (Remove):** Keraksiz blokni sug'urib olish. \`remove\`
- **Tinglovchi (Listen):** Blokka sensorni qo'yish, kimsadir tekkansa xabar beradi. \`addEventListener\`

## 3. STRUKTURA

### A. DOM Elementini Tanlash (Selecting Elements)

**1. ID orqali:**
\`\`\`javascript
const elem = document.getElementById("myId");
\`\`\`

**2. Klasslar/CSS selectors orqali:**
\`\`\`javascript
const elem = document.querySelector(".myClass");      // Birinchisini
const allElems = document.querySelectorAll(".myClass"); // Hammasini
\`\`\`

**3. Tag nomi orqali:**
\`\`\`javascript
const allDivs = document.getElementsByTagName("div");
\`\`\`

**Eng tez va endi modern usul — \`querySelector\` va \`querySelectorAll\`:**
\`\`\`javascript
document.querySelector(".box");           // Birinchi .box
document.querySelectorAll(".box");         // Hamma .box lar
document.querySelector("#header");         // ID orqali
document.querySelector("div > p");         // Selector kombinatsiya
\`\`\`

### B. Yangi Element Yaratish (Creating Elements)

\`\`\`javascript
// Yangi element yarating (hali ekranda yo'q):
const div = document.createElement("div");

// Matn qo'shing:
div.textContent = "Salom, Dunyo!";

// Yoki HTML qo'shing:
div.innerHTML = "<strong>Kalita xabar</strong>";

// Class qo'shing:
div.className = "box";
// Yoki modern usul:
div.classList.add("box", "active");

// ID qo'shing:
div.id = "myDiv";

// Atributlar qo'shing:
div.setAttribute("data-id", "123");
\`\`\`

**Muhim:** \`createElement\` faqat xotirada element yaratadi. Ekranda ko'rish uchun uni DOM-ga qo'shish kerak.

### C. Elementni DOM-ga Qo'shish (Adding to DOM)

**1. Ota elementning oxiriga qo'shish:**
\`\`\`javascript
const parent = document.querySelector(".container");
parent.appendChild(div);  // Oxiriga
\`\`\`

**2. Ota elementning boshiga qo'shish:**
\`\`\`javascript
parent.prepend(div);  // Boshiga
\`\`\`

**3. Biror elementdan keyin qo'shish:**
\`\`\`javascript
const sibling = document.querySelector("p");
sibling.after(div);   // Keyin qo'shish
sibling.before(div);  // Oldin qo'shish
\`\`\`

**4. Tayyorlangan HTML matnini qo'shish:**
\`\`\`javascript
const container = document.querySelector("#content");
container.insertAdjacentHTML("beforeend", "<p>Yangi paragraf</p>");
// Variantlar: "beforebegin", "afterbegin", "beforeend", "afterend"
\`\`\`

### D. Elementni O'zgartirish (Modifying Elements)

**Matn o'zgartirish:**
\`\`\`javascript
elem.textContent = "Yangi matn";        // Faqat matn
elem.innerText = "Yangi matn";          // Faqat matn (style'ga e'tibor beradi)
elem.innerHTML = "<b>Bold matn</b>";    // HTML bilan
\`\`\`

**Atributlar bilan ishlash:**
\`\`\`javascript
elem.setAttribute("alt", "Rasm tasviri");
elem.getAttribute("alt");               // Qiymatni o'qish
elem.removeAttribute("disabled");       // Atributni o'chirish
elem.hasAttribute("data-id");           // Bor-yo'qligini tekshirish
\`\`\`

**CSS sinflari bilan ishlash:**
\`\`\`javascript
elem.classList.add("active");           // Klass qo'shish
elem.classList.remove("active");        // Klassni o'chirish
elem.classList.toggle("active");        // Bor bo'lsa o'chir, yo'q bo'lsa qo'sh
elem.classList.contains("active");      // Bor-yo'qligini tekshirish
elem.classList.add("a", "b", "c");      // Ko'p klaslar
\`\`\`

**Inline style:**
\`\`\`javascript
elem.style.color = "red";
elem.style.backgroundColor = "yellow";  // camelCase bo'ladi CSS-da
elem.style.fontSize = "20px";
\`\`\`

### E. Elementni O'chirish (Removing Elements)

**1. Element o'zini o'zini o'chiradi:**
\`\`\`javascript
const elem = document.querySelector(".box");
elem.remove();  // Osongi usul (ES6)
\`\`\`

**2. Ota elementidan bolani o'chirish:**
\`\`\`javascript
const parent = document.querySelector(".container");
const child = document.querySelector(".box");
parent.removeChild(child);  // Eski usul
\`\`\`

**3. Hamma bolalarni o'chirish:**
\`\`\`javascript
const parent = document.querySelector(".container");
parent.innerHTML = "";  // Hamma element o'chirilib ketadi
\`\`\`

### F. Elementni Klonlash (Cloning)

\`\`\`javascript
const original = document.querySelector(".box");
const copy = original.cloneNode(true);   // true = bolalari bilan
document.body.appendChild(copy);

// Shallow copy (bola-chaqalarsiz):
const shallowCopy = original.cloneNode(false);
\`\`\`

### G. Event Tinglovchilari (Event Listeners)

HTML-da foydalanuvchi klikni bossa yoki matn kiritsasa, "hodisa" (event) sodir bo'ladi. Biz buni tinglab reaction berishi mumkin:

\`\`\`javascript
const button = document.querySelector("button");

// Event listener qo'shish:
button.addEventListener("click", function() {
  console.log("Tugmaga bosildi!");
});

// Yoki arrow funksiya:
button.addEventListener("click", () => {
  console.log("Tugmaga bosildi!");
});

// Ko'p uchraydigan event'lar:
// "click", "mouseover", "mouseout", "input", "change", "submit", "keydown", "keyup"
\`\`\`

### H. Event Listener Olib Tashlash

\`\`\`javascript
const handler = () => console.log("Klikni!");

button.addEventListener("click", handler);
// Keyin:
button.removeEventListener("click", handler);
\`\`\`

### I. Event Object (Hodisaning ma'lumotlari)

\`\`\`javascript
button.addEventListener("click", (event) => {
  console.log(event.target);        // Qaysi element bosildi
  console.log(event.type);          // Hodisaning turi ("click")
  console.log(event.preventDefault()); // Standart xatti-harakatni bekor qilish
  console.log(event.stopPropagation()); // Hodisaning tarqalishini to'xtatish
});
\`\`\`

### J. DOM Traversal (Elementlar orasidagi harakat)

\`\`\`javascript
const elem = document.querySelector(".box");

// Ota element:
elem.parentElement;

// Bolalar:
elem.children;          // HTMLCollection
elem.childNodes;        // NodeList (text nodes ham bilan)
elem.firstChild;        // Birinchi (matn node bo'lishi mumkin)
elem.firstElementChild; // Birinchi element

// Arizalar:
elem.nextElementSibling;  // Keyingi bir xil darajadagi element
elem.previousElementSibling;

// Hamma selectors:
elem.querySelectorAll("p");  // Ichidagi barcha p'lar
\`\`\`

### K. innerHTML vs append (Performance)

**NOTO'G'RI USUL (Xavfsiz emas, sekin):**
\`\`\`javascript
let html = "";
for (let i = 0; i < 1000; i++) {
  html += "<div>Item " + i + "</div>";  // Har safar joyiga qayta yozish
}
container.innerHTML = html;
\`\`\`

**TO'G'RI USUL (Tezroq, xavfsiz):**
\`\`\`javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = "Item " + i;
  fragment.appendChild(div);
}
container.appendChild(fragment);  // Bir marta qo'shadi
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **\`createElement\` dan keyin \`appendChild\` unutish:**
   \`\`\`javascript
   // XATO:
   const div = document.createElement("div");
   div.textContent = "Salom";
   // Ekranda ko'rinmaydi!

   // TO'G'RI:
   document.body.appendChild(div);
   \`\`\`

2. **\`innerHTML += "\`\` ishlatish (Performance xavfi):**
   \`\`\`javascript
   // XATO: Har safar butun HTML qayta yoziladi
   elem.innerHTML += "<p>Yangi</p>";

   // TO'G'RI:
   const p = document.createElement("p");
   p.textContent = "Yangi";
   elem.appendChild(p);
   \`\`\`

3. **\`appendChild\` ga matn berish:**
   \`\`\`javascript
   // XATO:
   elem.appendChild("Matn");  // TypeError!

   // TO'G'RI:
   elem.textContent = "Matn";
   // Yoki:
   elem.appendChild(document.createTextNode("Matn"));
   \`\`\`

4. **Yo'q elementga murojaat qilish:**
   \`\`\`javascript
   // XATO:
   const elem = document.querySelector(".missing");
   elem.textContent = "Salom";  // TypeError! (elem = null)

   // TO'G'RI:
   const elem = document.querySelector(".missing");
   if (elem) {
     elem.textContent = "Salom";
   }
   \`\`\`

5. **Event listener'da \`this\` adashtirish:**
   \`\`\`javascript
   // XATO:
   button.addEventListener("click", () => {
     console.log(this);  // window (arrow function'da)
   });

   // TO'G'RI:
   button.addEventListener("click", function() {
     console.log(this);  // button (regular function'da)
   });
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. DOM nima?</summary>
Document Object Model — HTML sahifasining JavaScript tarafiy model'i. Unda barcha elementlar va ularning xususiyatlari saqlangan.
</details>

<details>
<summary>2. document.querySelector() va document.getElementById() farqi nima?</summary>
querySelector() CSS selectors'ni qabul qiladi (klass, ID, tag kombinatsiya), getElementById() faqat ID'ni qabul qiladi.
</details>

<details>
<summary>3. createElement() qilingan element darhol ekranda ko'rinadimi?</summary>
Yo'q, faqat xotirada yaratiladi. appendChild() yoki append() bilan DOM-ga qo'shish kerak.
</details>

<details>
<summary>4. appendChild() va prepend() farqi nima?</summary>
appendChild() ota elementning oxiriga qo'shadi, prepend() boshiga qo'shadi.
</details>

<details>
<summary>5. textContent, innerText, va innerHTML farqi nima?</summary>
textContent — faqat matn (xavfsiz), innerText — matn (style'ga e'tibor beradi), innerHTML — HTML kodi bilan (XSS xavfi).
</details>

<details>
<summary>6. classList.add(), classList.remove(), classList.toggle() nima qiladi?</summary>
add() — klass qo'shadi, remove() — klassni o'chiradi, toggle() — bor bo'lsa o'chir, yo'q bo'lsa qo'sh.
</details>

<details>
<summary>7. setAttribute() va elem.attribute ayni bir narsami?</summary>
Farq yo'q. \`elem.id = "new"\` va \`elem.setAttribute("id", "new")\` bir xil.
</details>

<details>
<summary>8. addEventListener() da event object nima beradi?</summary>
Event object'da hodisaning barcha ma'lumotlari bor: turi, maqsadi (target), shu orada murojaat qilish metodlari (preventDefault, stopPropagation).
</details>

<details>
<summary>9. innerHTML += "\` ayni bir problem nima?</summary>
Performance xavfi. Har safar butun ichki HTML qayta yoziladi. Ko'p ma'lumot bo'lsa saytning tezligi sekinlashadi.
</details>

<details>
<summary>10. Element ichidagi hamma bolalarni qanday o'chirsa bo'ladi?</summary>
elem.innerHTML = ""; yoki elem.textContent = ""; Yoki loopda removeChild() qilish.
</details>

<details>
<summary>11. cloneNode(true) va cloneNode(false) farqi nima?</summary>
cloneNode(true) — bolalari bilan klonlaydi (deep copy), cloneNode(false) — faqat element o'zini (shallow copy).
</details>

<details>
<summary>12. DOM Traversal-da parentElement, children, nextElementSibling'ning farqi nima?</summary>
parentElement — ota element, children — bolalar, nextElementSibling — keyingi bir xil darajadagi element.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Element Yaratish",
      instruction: "'p' elementi yarating, unga 'Salom, Dunyo!' matnini bering va 'myPara' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\n\nconsole.log(typeof myPara); // element bo'lishi kerak\n",
      hint: "const myPara = document.createElement('p'); myPara.textContent = 'Salom, Dunyo!';",
      test: "if (code.includes('createElement') && code.includes('textContent')) return null; return 'Element yaratib matn bering';"
    },
    {
      id: 2,
      title: "Element DOM-ga Qo'shish",
      instruction: "Yaratilgan 'div' elementini 'document.body' ichiga appendChild() orqali qo'shing.",
      startingCode: "const div = document.createElement('div');\ndiv.textContent = 'Men ekranda!';\n\n// Bu yerga yozing - div'ni body-ga qo'shing\n",
      hint: "document.body.appendChild(div);",
      test: "if (code.includes('appendChild') && code.includes('body')) return null; return 'appendChild() orqali body-ga qo'shing';"
    },
    {
      id: 3,
      title: "Element Tanlovchisi (Selector)",
      instruction: "'container' ID'si bo'lgan element'ni tanlang va 'getContainer' o'zgaruvchisiga saqlang.",
      startingCode: "// container ID'si bo'lgan elementni tanlang\n\nconsole.log(getContainer !== null); // true bo'lishi kerak\n",
      hint: "const getContainer = document.querySelector('#container');",
      test: "if (code.includes('querySelector') && code.includes('#container')) return null; return 'querySelector orqali container ID'ni tanlang';"
    },
    {
      id: 4,
      title: "Klaslar bilan Ishlash",
      instruction: "'box' elementiga 'active' klassini classList.add() orqali qo'shing.",
      startingCode: "const box = document.createElement('div');\n\n// active klassini qo'shing\n\nconsole.log(box.classList.contains('active')); // true\n",
      hint: "box.classList.add('active');",
      test: "if (code.includes('classList.add') && code.includes('active')) return null; return 'classList.add() orqali active klassini qo\\'shing';"
    },
    {
      id: 5,
      title: "Element O'chirish",
      instruction: "'removed' elementini o'chirib tashlang. Avval elementni yarating, keyin remove() qiling.",
      startingCode: "// Elementni yarating\nconst removed = document.createElement('span');\ndocument.body.appendChild(removed);\n\n// Bu yerga yozing - o'chirib tashlang\n",
      hint: "removed.remove();",
      test: "if (code.includes('remove()')) return null; return 'remove() metodini chaqiring';"
    },
    {
      id: 6,
      title: "innerHTML orqali HTML Qo'shish",
      instruction: "'container' elementining ichiga '<p>Yangi paragraf</p>' HTML'ni innerHTML orqali qo'shing.",
      startingCode: "const container = document.createElement('div');\n\n// innerHTML orqali HTML qo'shing\n\nconsole.log(container.innerHTML); // '<p>Yangi paragraf</p>' o'z ichiga olishi kerak\n",
      hint: "container.innerHTML = '<p>Yangi paragraf</p>';",
      test: "if (code.includes('innerHTML') && code.includes('<p>')) return null; return 'innerHTML orqali HTML qo\\'shing';"
    },
    {
      id: 7,
      title: "Element Klonlash",
      instruction: "'original' elementini cloneNode(true) orqali klonlab, 'cloned' o'zgaruvchisiga saqlang.",
      startingCode: "const original = document.createElement('div');\noriginal.textContent = 'Original';\n\n// Klonlang\n\nconsole.log(cloned.textContent); // 'Original' bo'lishi kerak\n",
      hint: "const cloned = original.cloneNode(true);",
      test: "if (code.includes('cloneNode')) return null; return 'cloneNode(true) orqali klonlang';"
    },
    {
      id: 8,
      title: "Event Listener Qo'shish",
      instruction: "'button' elementiga 'click' event'i uchun listener qo'shing. Bosilganda 'Tugma bosildi!' consolga chiqarsin.",
      startingCode: "const button = document.createElement('button');\nbutton.textContent = 'Bosing';\n\n// Event listener qo'shing\n\n// Tekshirish (shuning uchun click simulyatsiyasi):\nbutton.click(); // console.log() ga 'Tugma bosildi!' chiqishi kerak\n",
      hint: "button.addEventListener('click', () => { console.log('Tugma bosildi!'); });",
      test: "if (code.includes('addEventListener') && code.includes('click')) return null; return 'addEventListener() orqali click event'i qo\\'shing';"
    },
    {
      id: 9,
      title: "Prepend - Boshiga Qo'shish",
      instruction: "'container' elementining boshiga 'div' elementi qo'shing. appendChild bilan emas, prepend() orqali.",
      startingCode: "const container = document.createElement('div');\nconst existingChild = document.createElement('p');\nexistingChild.textContent = 'Mavjud';\ncontainer.appendChild(existingChild);\n\nconst newDiv = document.createElement('div');\nnewDiv.textContent = 'Yangi';\n\n// prepend orqali boshiga qo'shing\n\nconsole.log(container.firstElementChild.textContent); // 'Yangi' bo'lishi kerak\n",
      hint: "container.prepend(newDiv);",
      test: "if (code.includes('prepend')) return null; return 'prepend() orqali boshiga qo\\'shing';"
    },
    {
      id: 10,
      title: "setAttribute va getAttribute",
      instruction: "'img' elementi yarating, 'src' atributini 'photo.jpg' ga o'rnatib, keyin getAttribute() orqali o'qing.",
      startingCode: "const img = document.createElement('img');\n\n// setAttribute orqali src'ni o'rnating\n// getAttribute orqali o'qing\n\n// Tekshirish:\nconsole.log(imgSrc); // 'photo.jpg' bo'lishi kerak\n",
      hint: "img.setAttribute('src', 'photo.jpg'); const imgSrc = img.getAttribute('src');",
      test: "if (code.includes('setAttribute') && code.includes('getAttribute')) return null; return 'setAttribute va getAttribute ishlatib ko\\'ring';"
    },
    {
      id: 11,
      title: "classList.toggle()",
      instruction: "'toggle-box' elementi yarating. classList.toggle('active')'ni ikki marta chaqiring. Birinchisida true, ikkinchisida false qaytarsin.",
      startingCode: "const toggleBox = document.createElement('div');\n\n// toggle() birinchi chaqiruv\nconst firstCall = toggleBox.classList.toggle('active');\n\n// toggle() ikkinchi chaqiruv\nconst secondCall = toggleBox.classList.toggle('active');\n\nconsole.log(firstCall, secondCall); // true, false bo'lishi kerak\n",
      hint: "toggle() 'boolean qaytaradi - true bo'lsa klass qo'shildi, false bo'lsa o'chirildi.",
      test: "if (code.includes('toggle') && code.includes('classList')) return null; return 'classList.toggle() to\\'g\\'ri ishlatib ko\\'ring';"
    },
    {
      id: 12,
      title: "Kompleks - To-do Qo'shish",
      instruction: "'ul' ro'yxati yarating. 'addTodo' funksiyasi yarating u argument sifatida 'todoText' qabul qilib, yangi 'li' elementini ul-ga qo'shashin. Funksiyani 3 ta vazifa bilan chaqiring.",
      startingCode: "const ul = document.createElement('ul');\n\n// addTodo funksiyasini yozing\n\n// Funksiyani chaqiring\naddTodo('Kitob o\\'qish');\naddTodo('Dastur yozish');\naddTodo('Harid qilish');\n\nconsole.log(ul.children.length); // 3 bo'lishi kerak\n",
      hint: "function addTodo(todoText) { const li = document.createElement('li'); li.textContent = todoText; ul.appendChild(li); }",
      test: "if (code.includes('createElement') && code.includes('appendChild') && code.includes('addTodo')) return null; return 'Kompleks to-do sistemani to\\'g\\'ri yarating';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`document.createElement('div')` metodi chaqirilganda brauzerda nima sodir bo'ladi?",
      options: [
        "Yangi `div` elementi yaratiladi va u avtomatik ravishda sahifaning oxiriga qo'shiladi",
        "Faqat tezkor xotirada (memory) yangi element obyekti yaratiladi, lekin u DOM daraxtiga qo'shilmaguncha sahifada ko'rinmaydi",
        "Mavjud barcha `div` elementlari o'chirib yuboriladi",
        "Brauzer konsolida faqat matnli xabar chiqadi"
      ],
      correctAnswer: 1,
      explanation: "`createElement` metodi elementni faqat xotirada yaratadi. U sahifada ko'rinishi uchun albatta `appendChild()`, `prepend()`, `before()`, yoki `after()` kabi metodlar yordamida DOM daraxtiga ulanishi kerak."
    },
    {
      id: 2,
      question: "Elementni ota elementning eng boshiga (birinchi farzand sifatida) qo'shish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`parent.appendChild(child)`",
        "`parent.prepend(child)`",
        "`parent.insertAtFirst(child)`",
        "`parent.before(child)`"
      ],
      correctAnswer: 1,
      explanation: "`parent.prepend(child)` metodi elementni ko'rsatilgan ota elementning eng boshiga qo'shadi. `appendChild` esa eng oxiriga qo'shadi."
    },
    {
      id: 3,
      question: "`textContent` va `innerHTML` xususiyatlari (properties) o'rtasidagi asosiy farq nima?",
      options: [
        "Hech qanday farqi yo'q, ikkalasi ham bir xil natija beradi",
        "`textContent` matn ichidagi har qanday HTML teglarni oddiy matn sifatida xavfsiz yozadi; `innerHTML` esa berilgan matnni HTML kodi sifatida parse qilib, element ko'rinishida render qiladi (bu XSS xavfini keltirib chiqarishi mumkin)",
        "`innerHTML` faqat sonlarni, `textContent` esa faqat harflarni qabul qiladi",
        "`textContent` uslub stillarini (styles) ham o'zgartiradi, `innerHTML` esa yo'q"
      ],
      correctAnswer: 1,
      explanation: "`textContent` matnni xavfsiz saqlaydi va HTML teglarni oddiy matn ko'rinishida ekranga chiqaradi. `innerHTML` esa berilgan stringni HTML sifatida o'qiydi (XSS hujumlariga qarshi zaiflik tug'dirishi mumkin)."
    },
    {
      id: 4,
      question: "DOM elementini sahifadan butunlay o'chirish uchun qaysi usul eng sodda va zamonaviy (ES6+) hisoblanadi?",
      options: [
        "`element.delete()`",
        "`element.remove()`",
        "`document.removeChild(element)`",
        "`element.clear()`"
      ],
      correctAnswer: 1,
      explanation: "Modern JavaScript-da elementning o'zida `.remove()` metodini chaqirish orqali uni sahifadan juda oson va to'g'ridan-to'g'ri o'chirib tashlash mumkin."
    },
    {
      id: 5,
      question: "Katta miqdordagi elementlarni (masalan, 1000 ta qator) DOM-ga qo'shishda brauzer reflow va repaint (ekranda qayta chizish) yuklamasini kamaytirish hamda ishlash unumdorligini (performance) oshirish uchun nima ishlatiladi?",
      options: [
        "`innerHTML += ...` loop ichida ishlatiladi",
        "`DocumentFragment` (hujjat parchasi) yaratib, barcha elementlarni unga yig'ib, so'ngra bir marta DOM-ga qo'shish",
        "Har bir elementni alohida `document.body.appendChild()` qilish",
        "`setTimeout` yordamida har bir elementni 1 millisekund kechiktirib qo'shish"
      ],
      correctAnswer: 1,
      explanation: "`DocumentFragment` - bu virtual DOM bo'lagi bo'lib, xotirada yaratiladi. Unga bir nechta elementlarni qo'shib, keyin bitta operatsiya orqali DOM-ga ulaganda sahifani qayta chizish (repaint) soni kamayadi va tezlik sezilarli darajada oshadi."
    }
  ]
};

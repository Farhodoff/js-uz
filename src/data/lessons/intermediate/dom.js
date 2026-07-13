export const dom = {
  id: "dom",
  title: "DOM Asoslari va Hujjat Daraxti (Document Object Model)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### DOM nima?
**DOM (Document Object Model - Hujjat Obyekt Modeli)** — bu veb-brauzer tomonidan HTML hujjatini o'qish paytida tuziladigan va uni JavaScript orqali boshqarish, o'zgartirish, o'chirish yoki yangilash imkonini beruvchi dynamic daraxtsimon obyektlar tuzilmasidir. HTML kodlarimiz statik matn xolos, DOM esa ularning brauzer xotirasidagi faol va tirik vakilidir.

### Real hayotiy o'xshatish: Aqlli Uy (Smart Home)
Tasavvur qiling, siz **Aqlli Uy (Smart Home)** tizimini boshqaryapsiz:
* **HTML chizmasi (Statik):** Bu uy qurilishidan oldingi qog'ozdagi reja. U erda qaysi xonada chiroq yoki oyna bo'lishi yozilgan, lekin uni qog'oz ustida yoqib-o'chirib bo'lmaydi.
* **DOM (Dinamik boshqaruv):** Uy tayyor bo'lgach, barcha qurilmalar umumiy boshqaruv planshetiga ulanadi. Planshetdan turib, istalgan xonaning haroratini sozlash, chirog'ini yoqish (\\\`style.color = "yellow"\\\`) yoki yangi televizor sotib olib xonaga qo'yish mumkin (\\\`createElement\\\`). Planshet — bu JavaScript, uydagi barcha jihozlar va xonalar esa — DOM elementlaridir.

---

## 2. 🧠 Deep Dive (Under the hood, memory, V8 engine, performance)

### Brauzer qanday qilib DOM ni yaratadi?
Brauzer HTML ni qabul qilganda, u oddiy matn (string) shaklida bo'ladi. Brauzer dvigateli (masalan, Blink yoki WebKit) bu matnni birma-bir o'qiydi (parsing) va tokenlarga ajratadi. Keyin bu tokenlardan DOM daraxti tugunlarini (nodes) yaratadi. 

DOM JavaScript ning (masalan V8) bevosita bir qismi emas! DOM bu - Web API, ya'ni brauzer tomonidan taqdim etiladigan C++ da yozilgan obyektlardir. JavaScript va DOM o'rtasida ko'prik (bindings) orqali aloqa o'rnatiladi.

### Memory va Unumdorlik (Performance)
JavaScript orqali DOM-ga murojaat qilish - bu ikki xil muhit (JS dvigateli va brauzerning render qilish dvigateli) orasidan o'tish degani. Bu "ko'prikdan o'tish" har doim "qimmatga" (sekin) tushadi.

\\\`\\\`\\\`javascript
// XATOLIK: Har bir tsiklda DOM ko'prigidan o'tish (Sekin)
const ul = document.getElementById('list');
for (let i = 0; i < 1000; i++) {
  ul.innerHTML += '<li>' + i + '</li>'; // Reflow! Repaint!
}

// TO'G'RI: Xotirada yig'ish va DOM ga bir marta qo'shish (Tez)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = i;
  fragment.appendChild(li); // JS xotirasida ishlaydi, DOM ga bormaydi
}
ul.appendChild(fragment); // Faqat 1 marta DOM ko'prigidan o'tiladi
\\\`\\\`\\\`

### Diagramma: DOM va JS munosabati
\\\`\\\`\\\`mermaid
graph TD
    A[HTML Code] --> B[HTML Parser]
    B --> C[DOM Tree in C++]
    D[CSS Code] --> E[CSS Parser]
    E --> F[CSSOM Tree]
    C --> G[Render Tree]
    F --> G
    H[JavaScript V8] -. Web API Bridge .-> C
    G --> I[Layout Reflow]
    I --> J[Paint Repaint]
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Savollari

### Edge Case: Live HTMLCollection vs Static NodeList
DOM dan obyektlarni olayotganda \\\`getElementsByClassName\\\` (HTMLCollection - live) va \\\`querySelectorAll\\\` (NodeList - static) farqini bilish juda muhim.

\\\`\\\`\\\`javascript
// HTMLCollection - Jonli (live)
const liveList = document.getElementsByClassName('menu-item');

// NodeList - Statik (non-live)
const staticList = document.querySelectorAll('.menu-item');

console.log(liveList.length, staticList.length); // 3, 3

// DOM-ga yangi element qo'shamiz
const newItem = document.createElement('li');
newItem.className = 'menu-item';
document.querySelector('ul').appendChild(newItem);

console.log(liveList.length, staticList.length); // 4, 3
\\\`\\\`\\\`

### Senior Interview Savollari

1. **Savol:** Layout Thrashing (Layout qotishi) nima va u qanday kod yozish natijasida yuzaga keladi?
   * **Javob:** Bir kadrda DOM element o'lchamlarini o'qish (\\\`offsetWidth\\\`, \\\`clientHeight\\\`) va unga yozish (\\\`style\\\` o'zgartirish) amallarini ketma-ket, takroriy bajarish. Bu brauzerni har safar layoutni hisoblashga majbur qiladi va FPSni keskin tushiradi. Yechim: o'qishlarni guruhlash, so'ngra yozishlarni guruhlash (FastDOM pattern).

2. **Savol:** Virtual DOM va Real DOM o'rtasidagi farq nima? Nega React yoki Vue Real DOM bilan bevosita ishlamaydi?
   * **Javob:** Real DOM obyektlari juda og'ir (minglab xususiyatlarga ega). Uni yangilash ko'p vaqt oladi. Virtual DOM - bu xotiradagi engil JavaScript obyektlar daraxti. O'zgarishlar oldin Virtual DOM da qilinadi, keyin eskisi bilan solishtiriladi (Diffing), va yakunda faqat o'zgargan minimal qismlargina Real DOM ga bitta operatsiya (Patch) bilan o'tkaziladi.

3. **Savol:** \\\`DocumentFragment\\\` nima va u qanday qilib unumdorlikni oshiradi?
   * **Javob:** \\\`DocumentFragment\\\` bu xotiradagi virtual konteyner. Agar biz 100 ta elementni to'g'ridan-to'g'ri DOM ga qo'shsak, brauzer 100 marta sahifani qayta hisoblaydi (reflow). Agar elementlarni avval fragmentga qo'shib, keyin fragmentni DOM ga qo'shsak, brauzer faqat 1 marta reflow bajaradi.

4. **Savol:** \\\`defer\\\` va \\\`async\\\` script teg atributlarining DOM yuklanishiga ta'siri qanday?
   * **Javob:** Ikkalasi ham scriptni fonda (paralell) yuklaydi. \\\`async\\\` script yuklanib bo'lishi bilan darhol ishga tushadi (HTML parsingni to'xtatib). Bu DOM to'liq tayyor bo'lmasligi xavfini tug'diradi. \\\`defer\\\` esa scriptni fonda yuklaydi, lekin HTML to'liq parse qilib bo'lingach, DOM daraxti qurib bitkazilgandan keyin, lekin \\\`DOMContentLoaded\\\` dan oldin ishga tushadi. Shuning uchun DOM bilan ishlovchi kodlar uchun har doim \\\`defer\\\` afzal.

5. **Savol:** \\\`Event Delegation\\\` (Hodisalarni topshirish) qanday ishlaydi va DOM unumdorligiga qanday ta'sir qiladi?
   * **Javob:** Agar 1000 ta tugma bo'lsa, har biriga alohida EventListener yozish xotirani band qiladi va sekinlashtiradi. Buning o'rniga ularning umumiy ota elementiga (masalan \\\`<ul>\\\`) bitta EventListener qo'yiladi. Hodisa "bubbling" orqali tepaga chiqqanda, \\\`event.target\\\` orqali qaysi tugma bosilgani aniqlanadi. Bu xotirani tejaydi va dinamik qo'shilgan elementlar uchun ham ishlaydi.
`,
  exercises: [
  {
    "id": 1,
    "title": "querySelector yordamida element tanlash",
    "instruction": "\`document.querySelector\` yordamida sahifadagi birinchi \`h1\` elementini tanlang va uni \`title\` o'zgaruvchisiga saqlang.",
    "startingCode": "// Kodni shu yerda yozing\n",
    "hint": "const title = document.querySelector('h1');",
    "test": "if (code.includes('document.querySelector') && (code.includes('h1') || code.includes(\"h1\"))) return null; return 'document.querySelector yordamida h1 elementini tanlang';"
  },
  {
    "id": 2,
    "title": "textContent yordamida matnni o'zgartirish",
    "instruction": "Berilgan \`header\` elementining \`textContent\` xususiyatini 'Salom JS' matniga o'zgartiruvchi \`changeText(header)\` funksiyasini yozing.",
    "startingCode": "function changeText(header) {\n  // Kodni shu yerga yozing\n}",
    "hint": "header.textContent = 'Salom JS';",
    "test": "try { const mockHeader = { textContent: '' }; changeText(mockHeader); if (mockHeader.textContent !== 'Salom JS') return 'header.textContent to\\'g\\'ri o\\'zgartirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "classList yordamida klassni o'zgartirish (Toggle)",
    "instruction": "Berilgan \`element\` obyekti klasslari ichida \`active\` klassi borligini \`classList.toggle\` yordamida almashtiruvchi \`toggleActive(element)\` funksiyasini yozing.",
    "startingCode": "function toggleActive(element) {\n  // Kodni shu yerga yozing\n}",
    "hint": "element.classList.toggle('active');",
    "test": "try { let toggled = null; const mockEl = { classList: { toggle: (c) => toggled = c } }; toggleActive(mockEl); if (toggled !== 'active') return 'classList.toggle yordamida active klassi almashtirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 4,
    "title": "getElementById yordamida element topish",
    "instruction": "\`document.getElementById\` yordamida sahifadan \`main-content\` ID-li elementni topib, uni \`content\` o'zgaruvchisiga saqlovchi \`findContent()\` funksiyasini yozing va uni qaytaring.",
    "startingCode": "function findContent() {\n  // Kodni shu yerga yozing\n}",
    "hint": "const content = document.getElementById('main-content'); return content;",
    "test": "if (code.includes('document.getElementById') && code.includes('main-content')) return null; return 'document.getElementById yordamida main-content elementini toping';"
  },
  {
    "id": 5,
    "title": "querySelectorAll va forEach bilan ishlash",
    "instruction": "Sahifadagi barcha \`.item\` klassli elementlarni \`document.querySelectorAll\` yordamida tanlang va ularning har biriga \`forEach\` yordamida \`highlighted\` klassini qo'shuvchi \`highlightAll()\` funksiyasini yozing.",
    "startingCode": "function highlightAll() {\n  // Kodni shu yerga yozing\n}",
    "hint": "document.querySelectorAll('.item').forEach(el => el.classList.add('highlighted'));",
    "test": "if (code.includes('querySelectorAll') && code.includes('forEach') && code.includes('highlighted')) return null; return 'querySelectorAll, forEach va highlighted klassidan foydalaning';"
  },
  {
    "id": 6,
    "title": "Element stilini o'zgartirish (style)",
    "instruction": "Berilgan \`element\` ning fon rangini (backgroundColor) \`#3498db\` ga va matn rangini (color) \`white\` ga o'zgartiruvchi \`applyStyle(element)\` funksiyasini yozing.",
    "startingCode": "function applyStyle(element) {\n  // Kodni shu yerga yozing\n}",
    "hint": "element.style.backgroundColor = '#3498db'; element.style.color = 'white';",
    "test": "try { const mockEl = { style: {} }; applyStyle(mockEl); if (mockEl.style.backgroundColor !== '#3498db') return 'backgroundColor #3498db bo\\'lishi kerak'; if (mockEl.style.color !== 'white') return 'color white bo\\'lishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 7,
    "title": "parentElement yordamida ota elementga murojaat",
    "instruction": "Berilgan \`child\` elementining ota elementini topib, ota elementga \`parent-active\` klassini qo'shuvchi \`markParent(child)\` funksiyasini yozing.",
    "startingCode": "function markParent(child) {\n  // Kodni shu yerga yozing\n}",
    "hint": "child.parentElement.classList.add('parent-active');",
    "test": "try { let addedClass = null; const mockChild = { parentElement: { classList: { add: (c) => addedClass = c } } }; markParent(mockChild); if (addedClass !== 'parent-active') return 'Ota elementga parent-active klassi qo\\'shilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 8,
    "title": "dataset yordamida custom atribut o'qish",
    "instruction": "Berilgan \`element\` ning \`data-user-id\` atributi qiymatini \`dataset\` orqali o'qib, uni qaytaruvchi \`getUserId(element)\` funksiyasini yozing.",
    "startingCode": "function getUserId(element) {\n  // Kodni shu yerga yozing\n}",
    "hint": "return element.dataset.userId;",
    "test": "try { const mockEl = { dataset: { userId: '42' } }; const result = getUserId(mockEl); if (result !== '42') return 'dataset.userId qiymati qaytarilishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 9,
    "title": "children xususiyati bilan bolalarni sanash",
    "instruction": "Berilgan \`container\` elementining nechta bola elementi borligini \`children.length\` orqali aniqlab qaytaruvchi \`countChildren(container)\` funksiyasini yozing.",
    "startingCode": "function countChildren(container) {\n  // Kodni shu yerga yozing\n}",
    "hint": "return container.children.length;",
    "test": "try { const mockContainer = { children: { length: 5 } }; const result = countChildren(mockContainer); if (result !== 5) return 'children.length qiymati qaytarilishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 10,
    "title": "getAttribute va setAttribute bilan ishlash",
    "instruction": "Berilgan \`element\` ning \`href\` atributini \`getAttribute\` orqali o'qib, agar u \`#\` ga teng bo'lsa, \`setAttribute\` yordamida uni \`https://example.com\` ga o'zgartiruvchi \`fixLink(element)\` funksiyasini yozing.",
    "startingCode": "function fixLink(element) {\n  // Kodni shu yerga yozing\n}",
    "hint": "if (element.getAttribute('href') === '#') { element.setAttribute('href', 'https://example.com'); }",
    "test": "try { let currentHref = '#'; const mockEl = { getAttribute: (a) => currentHref, setAttribute: (a, v) => { currentHref = v; } }; fixLink(mockEl); if (currentHref !== 'https://example.com') return 'href atributi https://example.com ga o\\'zgartirilishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "DOM (Document Object Model) nima maqsadda xizmat qiladi?",
    "options": [
      "HTML hujjatini serverda saqlash va boshqarish uchun",
      "HTML hujjatini brauzer xotirasida daraxtsimon obyekt ko'rinishida ifodalab, uni JavaScript yordamida dinamik boshqarish uchun",
      "Faqat CSS stillarini optimallashtirish uchun",
      "Veb-sayt xavfsizligini ta'minlash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "DOM brauzer tomonidan HTML sahifani tahlil qilish (parsing) paytida yaratiladi va u JavaScript-ga HTML elementlarini dynamic o'zgartirish, o'chirish yoki yangi elementlar qo'shish imkoniyatini taqdim etadi."
  },
  {
    "id": 2,
    "question": "document.querySelector va document.querySelectorAll metodlarining farqi nima?",
    "options": [
      "querySelector faqat id-lar bilan, querySelectorAll esa class-lar bilan ishlaydi",
      "querySelector faqat birinchi mos kelgan elementni, querySelectorAll esa mos kelgan barcha elementlarni NodeList ko'rinishida qaytaradi",
      "querySelectorAll sinxron, querySelector esa asinxron ishlaydi",
      "Ikkalasi bir xil ishlaydi, hech qanday farqi yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "querySelector berilgan CSS selektoriga mos kelgan birinchi element obyektini, querySelectorAll esa barcha mos kelgan elementlarni o'z ichiga olgan NodeList to'plamini qaytaradi."
  },
  {
    "id": 3,
    "question": "JavaScript yordamida element klassini boshqarishda (add, remove, toggle) nima uchun classList-dan foydalanish tavsiya etiladi?",
    "options": [
      "Chunki u HTML-ni to'liq yangilaydi",
      "Chunki u elementning boshqa klasslariga zarar yetkazmasdan, xavfsiz va qulay boshqarish imkonini beradi",
      "Chunki classList yordamida serverga so'rov yuborish mumkin",
      "classList metodlari eng sekin ishlovchi metodlar hisoblanadi"
    ],
    "correctAnswer": 1,
    "explanation": "classList.add() yoki classList.remove() elementdagi boshqa klasslarni o'chirib yubormasdan, faqat kerakli klass bilan ishlaydi. className esa butun klass stringini overwrite qilib yuboradi."
  },
  {
    "id": 4,
    "question": "HTMLCollection va NodeList o'rtasidagi asosiy farqlardan biri nima?",
    "options": [
      "NodeList faqat eski brauzerlarda ishlaydi",
      "HTMLCollection har doim jonli (live) to'plam bo'ladi (DOM o'zgarganda avtomat yangilanadi), NodeList esa odatda statik (non-live) bo'ladi",
      "HTMLCollection massiv metodlarini to'liq qo'llab-quvvatlaydi, NodeList esa yo'q",
      "Hech qanday farqi yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "HTMLCollection har doim dynamic yangilanadi (live). querySelectorAll qaytaradigan NodeList esa statik bo'lib, DOM o'zgargani bilan undagi elementlar ro'yxati o'zgarmaydi."
  },
  {
    "id": 5,
    "question": "ID bo'yicha element tanlashda qaysi metod eng yuqori unumdorlikka (tezlikka) ega?",
    "options": [
      "document.getElementById('title')",
      "document.querySelector('#title')",
      "Ikkalasi mutlaqo bir xil tezlikda ishlaydi",
      "document.getElementsByClassName('title')[0]"
    ],
    "correctAnswer": 0,
    "explanation": "getElementById faqat ID bo'yicha qidirish uchun optimallashtirilgan bo'lib, querySelector-ga qaraganda tezroq ishlaydi (chunki querySelector CSS parseridan o'tishi shart)."
  },
  {
    "id": 6,
    "question": "Foydalanuvchi kiritgan matnni yozishda nima uchun `innerHTML` o'rniga `textContent` ishlatish tavsiya etiladi?",
    "options": [
      "Chunki textContent stillarni buzmaydi",
      "XSS (Cross-Site Scripting) zararli kodlar hujumining oldini olish va xavfsizlikni ta'minlash uchun",
      "Chunki textContent tezlroq render qiladi",
      "innerHTML faqat rasmlar uchun ishlatiladi"
    ],
    "correctAnswer": 1,
    "explanation": "innerHTML foydalanuvchi yozgan zararli teglarni (masalan `<script>`) render qilib yuborishi mumkin. textContent esa barcha teglarni oddiy zararsiz matn sifatida yozadi."
  },
  {
    "id": 7,
    "question": "CSS faylda yozilgan elementning real (hisoblangan) rangini JavaScript-da qanday o'qiymiz?",
    "options": [
      "element.style.color orqali",
      "window.getComputedStyle(element).color orqali",
      "element.getAttribute('color') orqali",
      "element.className.color"
    ],
    "correctAnswer": 1,
    "explanation": "element.style faqat inline stillarni ko'radi. CSS faylda yozilgan real stillarni o'qish uchun window.getComputedStyle(element) metodidan foydalaniladi."
  },
  {
    "id": 8,
    "question": "Elementning `children` va `childNodes` xususiyatlari farqi nima?",
    "options": [
      "children faqat haqiqiy elementlarni (tags), childNodes esa har qanday tugunlarni (text, comment) ham qaytaradi",
      "childNodes faqat HTML elementlarni, children esa matnlarni qaytaradi",
      "Ikkalasi mutlaqo bir xil narsani qaytaradi",
      "children faqat o'g'il bolalarni qaytaradi"
    ],
    "correctAnswer": 0,
    "explanation": "children faqat HTML element tugunlarini (Element Nodes) massivsimon ro'yxatda qaytaradi. childNodes esa har qanday tugunlarni (jumladan bo'sh joylar/text node) qaytaradi."
  },
  {
    "id": 9,
    "question": "DOM daraxtida `firstElementChild` va `firstChild` o'rtasidagi farq nima?",
    "options": [
      "Hech qanday farqi yo'q",
      "firstElementChild birinchi HTML elementini, firstChild esa birinchi tugunni (bu probel yoki yangi qator kabi text node bo'lishi mumkin) qaytaradi",
      "firstChild faqat birinchi harfni qaytaradi",
      "firstElementChild sekinroq ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "firstChild ko'pincha elementlar orasidagi bo'shliqni (text node) qaytaradi. firstElementChild esa birinchi haqiqiy HTML elementini (tag) qaytaradi."
  },
  {
    "id": 10,
    "question": "DocumentFragment-dan foydalanishning asosiy maqsadi nima?",
    "options": [
      "DOM elementlarini animatsiya qilish uchun",
      "Ko'p miqdordagi elementlarni DOM-ga qo'shishda Reflow va Repaint sonini 1 taga tushirib, unumdorlikni oshirish uchun",
      "Faqat serverdagi ma'lumotlarni yuklash uchun",
      "HTML faylini siqish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "DocumentFragment virtual xotirada yaratilgani uchun, unga qilingan o'zgarishlar haqiqiy sahifani qayta chizmaydi. Uni to'ldirib, DOM-ga bitta operatsiyada ulasak, sahifa qotmaydi."
  },
  {
    "id": 11,
    "question": "Elementdagi custom `data-user-id=\"10\"` atributini JavaScript-da eng qulay usulda qanday o'qiymiz?",
    "options": [
      "element.getAttribute('data-user-id')",
      "element.dataset.userId (camelCase formatida)",
      "element.data.userId",
      "element.dataset['data-user-id']"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScriptdataset obyekti data-* atributlarini camelCase formatiga o'tkazib saqlaydi, shuning uchun dataset.userId ko'rinishida oson o'qiladi."
  },
  {
    "id": 12,
    "question": "parentElement va parentNode o'rtasidagi farq nima?",
    "options": [
      "Hech qanday farqi yo'q",
      "parentElement faqat ota elementni qaytaradi (yo'q bo'lsa null), parentNode esa ota tugunni (masalan document node-ni ham) qaytaraveradi",
      "parentNode faqat CSS-ni qaytaradi",
      "parentElement xotiradan joy ajratmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "parentElement har doim HTML elementi (nodeType === 1) bo'lishini talab qiladi, aks holda null qaytaradi. parentNode esa har qanday ota tugunni qaytaradi."
  }
]
};

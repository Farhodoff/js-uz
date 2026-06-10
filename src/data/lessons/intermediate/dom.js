export const dom = {
  id: "dom",
  title: "DOM Asoslari va Hujjat Daraxti (Document Object Model)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### DOM nima?
**DOM (Document Object Model - Hujjat Obyekt Modeli)** — bu veb-brauzer tomonidan HTML hujjatini o'qish paytida tuziladigan va uni JavaScript orqali boshqarish, o'zgartirish, o'chirish yoki yangilash imkonini beruvchi dynamic daraxtsimon obyektlar tuzilmasidir. HTML kodlarimiz statik matn xolos, DOM esa ularning brauzer xotirasidagi faol va tirik vakilidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **Aqlli Uy (Smart Home)** tizimini boshqaryapsiz:
* **HTML chizmasi (Statik):** Bu uy qurilishidan oldingi qog'ozdagi reja. U erda qaysi xonada chiroq yoki oyna bo'lishi yozilgan, lekin uni qog'oz ustida yoqib-o'chirib bo'lmaydi.
* **DOM (Dinamik boshqaruv):** Uy tayyor bo'lgach, barcha qurilmalar umumiy boshqaruv planshetiga ulanadi. Planshetdan turib, istalgan xonaning haroratini sozlash, chirog'ini yoqish (\`style.color = "yellow"\`) yoki yangi televizor sotib olib xonaga qo'yish mumkin (\`createElement\`). Planshet — bu JavaScript, uydagi barcha jihozlar va xonalar esa — DOM elementlaridir.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Element tanlash va O'zgartirish)
CSS selektori yordamida elementni topish va uning matnini hamda stillarini yangilash:
\`\`\`javascript
// querySelector eng universal va tavsiya etiladigan element tanlash metodidir
const title = document.querySelector('.main-title');

if (title) {
  // textContent matnni xavfsiz o'zgartiradi
  title.textContent = 'Salom, JavaScript Akademy!';
  title.style.color = '#3498db';
  title.style.fontWeight = 'bold';
}
\`\`\`

### 2. Intermediate Example (DOM Navigation - Daraxtda harakatlanish)
Elementning ota-onasi, bolalari va yonidagi qo'shnilariga ishora qilish:
\`\`\`javascript
const currentItem = document.querySelector('.active-item');

if (currentItem) {
  // 1. Ota elementga chiqish
  const parentMenu = currentItem.parentElement;
  
  // 2. Birinchi bolaga tushish
  const firstChild = currentItem.firstElementChild;
  
  // 3. Keyingi qo'shni elementga o'tish (nextElementSibling)
  const nextItem = currentItem.nextElementSibling;
  
  console.log('Ota element tag:', parentMenu.tagName);
  console.log('Keyingi element text:', nextItem ? nextItem.textContent : 'Yo\\'q');
}
\`\`\`

### 3. Advanced Example (NodeList va HTMLCollection solishtiruvi)
Jonli (live) HTMLCollection va statik (static) NodeList o'rtasidagi mantiqiy farq:
\`\`\`javascript
// HTMLCollection - Jonli (live): DOM o'zgarishi bilan avtomat yangilanadi
const liveList = document.getElementsByClassName('menu-item');

// NodeList - Statik (non-live): DOM o'zgarsa ham ro'yxat soni o'zgarmaydi
const staticList = document.querySelectorAll('.menu-item');

console.log('Boshlang\\'ich:', liveList.length, staticList.length); // 3 3 (masalan)

// DOM-ga yangi element qo'shamiz
const newItem = document.createElement('li');
newItem.className = 'menu-item';
document.querySelector('ul').appendChild(newItem);

console.log('Element qo\\'shilgach:', liveList.length, staticList.length); // 4 3
\`\`\`

### 4. Production Example (Unumdorlik va DocumentFragment)
Ko'p miqdordagi elementlarni DOM-ga qo'shishda brauzerni yuklamaslik (Reflow va Repaint optimallashtirish):
\`\`\`javascript
const list = document.querySelector('#user-list');
// DocumentFragment virtual DOM kabi ishlaydi, xotirada yaratiladi
const fragment = document.createDocumentFragment();

const users = ['Ali', 'Vali', 'Guli', 'Hasan', 'Husan'];

users.forEach(name => {
  const li = document.createElement('li');
  li.textContent = name;
  li.className = 'list-group-item';
  
  // To'g'ridan-to'g'ri haqiqiy DOM-ga emas, fragmentga qo'shamiz
  fragment.appendChild(li);
});

// Fragmentni bitta operatsiyada haqiqiy DOM-ga joylashtiramiz
// Bu orqali brauzer faqat 1 marta sahifani qayta chizadi (1 reflow)
list.appendChild(fragment);
\`\`\`

### 5. Enterprise Example (Dynamic Koordinata va Skroll boshqaruvi)
Elementning ekrandagi aniq joylashuvini hisoblash va dynamic navigatsiya:
\`\`\`javascript
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  
  if (element) {
    // getBoundingClientRect elementning o'lchamlari va ekrandagi o'rnini beradi
    const rect = element.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    
    // Sahifani silliq ravishda element joylashgan joyga skroll qilish
    window.scrollTo({
      top: absoluteTop - 80, // 80px yuqoridan joy qoldirish (masalan header uchun)
      behavior: 'smooth'
    });
  }
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Statik sahifani dynamic qilish:** DOM bo'lmaganda foydalanuvchi tugmani bossa sahifa serverga borib yangidan yuklanishi shart edi. DOM orqali faqat kerakli tugunlar (nodes) yangilanadi, bu esa SPA (Single Page Application) arxitekturasini yuzaga keltirdi.
* **Layout Thrashing va unumdorlik:** DOM-ni har safar o'zgartirish brauzerga juda qimmatga tushadi (CPU/GPU jihatidan). Kod orqali element tanlash va o'zgartirishlarni optimallashtirish veb-ilovalarning yuqori FPS (60+) da ishlashiga imkon beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`querySelector\` ichida sinf nuqtasi (\`.\`) yoki ID panjarasini (\`#\`) unutish
#### Xato:
\`const el = document.querySelector("active-btn");\`
#### Nima uchun:
Brauzer buni tag nomi (\`<active-btn>\`) deb o'ylaydi va topa olmaydi.
#### To'g'ri:
\`const el = document.querySelector(".active-btn");\`

### 2. Inline style nomlarini CSS formatida yozish
#### Xato:
\`element.style.background-color = 'red';\` // Error!
#### To'g'ri:
\`element.style.backgroundColor = 'red';\`

### 3. NodeList ustida \`map\` yoki \`filter\` metodlarini to'g'ridan-to'g'ri ishlatish
#### Xato:
\`document.querySelectorAll("li").map(el => el.textContent);\` // TypeError: map is not a function
#### To'g'ri:
\`Array.from(document.querySelectorAll("li")).map(el => el.textContent);\`

### 4. Xavfsiz bo'lmagan matnlar uchun \`innerHTML\` ishlatish
#### Xato:
\`element.innerHTML = userInput;\` // XSS vulnerability!
#### To'g'ri:
\`element.textContent = userInput;\`

### 5. DOM yuklanmasdan avval elementlarni qidirish (defer/async xatosi)
#### Muammo:
Script HTML-dan oldin yuklansa, elementlar topilmay \`null\` qaytadi va \`Cannot read properties of null\` xatosi chiqadi.
#### To'g'ri:
Scriptni \`<body>\` oxiriga qo'yish yoki \`<script type="module" src="...">\` yoki \`defer\` atributini qo'shish.

### 6. HTMLCollection yoki NodeList-ning 'jonli' tabiatini hisobga olmaslik
#### Muammo:
Loop ichida live HTMLCollection elementlarini o'chirganda indekslar siljib ketadi va ba'zi elementlar o'chmay qolib ketadi.

### 7. DOM-ga har bir elementni loop ichida birma-bir \`appendChild\` qilish
#### Muammo:
Loopda har safar DOM o'zgartirilganda brauzer sahifani qayta hisoblaydi, bu unumdorlikni juda pasaytiradi (Layout Reflow).
#### To'g'ri yechim:
\`DocumentFragment\` yoki \`insertAdjacentHTML\` dan foydalanish.

### 8. \`classList.toggle\` ning ikkinchi parametrini bilmaslik
#### Muammo:
Klassni shartga mos qo'shish yoki o'chirish uchun qo'lda if-else yozish.
#### To'g'ri:
\`element.classList.toggle('active', shouldShow);\`

### 9. Custom ma'lumotlarni attributes orqali o'qish (dataset o'rniga)
#### Xato:
\`element.getAttribute('data-user-id')\` deb yozib kodni uzaytirish.
#### To'g'ri:
\`element.dataset.userId\` orqali tezkor o'qish.

### 10. \`element.style\` orqali berilgan stillarni CSS faylidagi qiymatini o'qishga urinish
#### Muammo:
\`element.style.color\` faqat inline berilgan CSS-ni o'qiydi. CSS faylidagi stilni o'qiy olmaydi.
#### To'g'ri yechim:
\`window.getComputedStyle(element).color\` metodidan foydalanish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** DOM (Document Object Model) nima va u qanday tuzilgan?
   * **Javob:** DOM - HTML hujjatining brauzer xotirasidagi daraxtsimon obyekt ko'rinishi. U elementlar (tags), atributlar va matnlarni tugunlar (nodes) shaklida ifodalaydi va JS orqali boshqariladi.

2. **Savol:** \`querySelector\` va \`getElementById\` o'rtasidagi farq nima?
   * **Javob:** \`getElementById\` faqat ID bo'yicha tezkor qidiradi. \`querySelector\` esa istalgan murakkab CSS selektori (sinf, tag, atribut, ota-bola) bo'yicha birinchi mos kelgan elementni qidirib topadi.

3. **Savol:** Elementga klass qo'shish, o'chirish va tekshirish qanday amalga oshiriladi?
   * **Javob:** \`element.classList\` obyekti metodlari orqali: \`add('classname')\`, \`remove('classname')\` va \`contains('classname')\`.

4. **Savol:** \`textContent\` va \`innerHTML\` farqlari nimada?
   * **Javob:** \`textContent\` HTML teglarni oddiy matn deb hisoblab xavfsiz yozadi/o'qiydi. \`innerHTML\` esa matn ichidagi HTML teglarni brauzerda render qilib beradi.

### Middle (5–8)
5. **Savol:** HTMLCollection va NodeList o'rtasidagi farq nima?
   * **Javob:** HTMLCollection faqat elementlardan iborat va har doim jonli (live) to'plam bo'ladi. NodeList esa istalgan tugunlarni (matn, izohlar) o'z ichiga olishi mumkin, odatda statik bo'ladi va \`.forEach()\` metodiga ega.

6. **Savol:** DOM Reflow va Repaint tushunchalarini tushuntiring.
   * **Javob:** **Reflow** — elementlar o'lchami yoki joylashuvi o'zgarganda brauzer sahifa geometriyasini qayta hisoblashi. **Repaint** — ranglar, soyalar o'zgarganda sahifaning piksellarini qayta chizishi. Reflow juda og'ir hisob-kitob talab qiladi.

7. **Savol:** custom atributlar (data-* attributes) bilan ishlash qoidalari qanday?
   * **Javob:** HTML-da \`data-user-id="42"\` deb yozilgan elementni JavaScript-da \`element.dataset.userId\` (camelCase formatida) orqali o'qish va yozish mumkin.

8. **Savol:** \`DocumentFragment\` nima va u unumdorlikka qanday ta'sir qiladi?
   * **Javob:** Xotiradagi virtual va bo'sh DOM konteyneri. Unga bir nechta elementlarni qo'shib, so'ngra fragmentning o'zini real DOM-ga bir marta ulasak, brauzer faqat bitta reflow bajaradi va bu sahifa qotishini oldini oladi.

### Senior (9–12)
9. **Savol:** Layout Thrashing (Layout qotishi) nima va u qanday kod yozish natijasida yuzaga keladi?
   * **Javob:** Bir kadrda DOM element o'lchamlarini o'qish (offsetwidth, clientHeight) va unga yozish (style o'zgartirish) amallarini ketma-ket, takroriy bajarish. Bu brauzerni har safar layoutni hisoblashga majbur qiladi va FPSni keskin tushiradi. Yechim: o'qishlarni guruhlash, so'ngra yozishlarni guruhlash (FastDOM pattern).

10. **Savol:** Elementning real (hisoblangan) CSS xususiyatlarini JS orqali qanday to'g'ri aniqlaymiz va \`window.getComputedStyle\` qanday ishlaydi?
    * **Javob:** \`element.style\` faqat inline stillarni ko'rsatadi. CSS fayldagi yoki vorislik bo'yicha berilgan barcha stillarni o'qish uchun \`window.getComputedStyle(element)\` chaqiriladi. U barcha faol xususiyatlarni string qiymatda qaytaradi.

11. **Savol:** virtual DOM va real DOM o'rtasidagi farq nima va nega modern frameworklar to'g'ridan-to'g'ri real DOM bilan ishlamaydi?
    * **Javob:** Real DOM juda sekin ishlaydi va har bir o'zgarishda og'ir reflow/repaint chaqiradi. Virtual DOM - bu xotiradagi engil JSON nusxasi. Dastlab o'zgarishlar virtual DOM-da solishtiriladi (reconciliation/diffing), so'ngra faqat eng minimal zaruriy o'zgarishlargina real DOM-ga yuboriladi.

12. **Savol:** DOM daraxtini dynamic ravishda rekursiv aylanib chiqish (DOM Tree Traversal) algoritmi qanday tuziladi?
    * **Javob:** Rekursiv funksiya yoki DOM NodeIterator / TreeWalker API lari orqali. TreeWalker yordamida ma'lum turdagi elementlarni (masalan faqat matn tugunlarini) filtrlash va daraxt bo'ylab juda tez harakatlanish mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Dinamik Foydalanuvchilar Jadvali (Virtual DOM-siz Optimallashtirish)
Loyiha real vaqt rejimida API orqali ma'lumotlarni qabul qiladi va jadvalni yangilaydi. Har bir yuklanishda 1000 ta qator qo'shilishi kerak.

#### Yechim (DocumentFragment va dataset ishlatish):
\`\`\`javascript
function renderUsersTable(usersData) {
  const tbody = document.querySelector('#users-tbody');
  tbody.innerHTML = ''; // Eski ma'lumotlarni tozalash
  
  const fragment = document.createDocumentFragment();
  
  usersData.forEach(user => {
    const tr = document.createElement('tr');
    tr.dataset.userId = user.id; // Custom dataset yozish
    
    tr.innerHTML = \`
      <td>\${user.name}</td>
      <td>\${user.email}</td>
      <td><button class="delete-btn">O'chirish</button></td>
    \`;
    
    fragment.appendChild(tr);
  });
  
  tbody.appendChild(fragment); // Faqat 1 ta reflow
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Reflow Minimization:** Bir vaqtning o'zida bir nechta stillarni o'zgartirish kerak bo'lsa, elementning \`.style\` xususiyatini alohida chaqirgandan ko'ra bitta CSS klasini almashtirish (\`classList.add\`) ma'qulroq.

---

## 10. 📌 Cheat Sheet

| Metod / Xususiyat | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **querySelector()** | \`document.querySelector(selector)\` | Elementni selektor bo'yicha topadi | Faqat 1-element |
| **querySelectorAll()**| \`document.querySelectorAll(selector)\`| Barcha elementlarni topadi | NodeList qaytaradi |
| **createElement()** | \`document.createElement(tagName)\` | Yangi element yaratadi | Xotirada, DOM-ga ulanmagan |
| **appendChild()** | \`parent.appendChild(child)\` | Elementni bolasi qilib qo'shadi | Oxiriga qo'shadi |
| **remove()** | \`element.remove()\` | Elementni DOM-dan butunlay o'chiradi | Modern brauzerlarda |
| **classList** | \`el.classList.add/remove/toggle\` | Klasslarni boshqaradi | Xavfsiz va qulay |
| **dataset** | \`el.dataset.camelCase\` | Custom attributes o'qish/yozish | data-attribute uchun |
| **getBoundingClientRect()**| \`el.getBoundingClientRect()\` | Koordinatalar va o'lchamlarni beradi| Reflow chaqirishi mumkin |
`,
  exercises: [
  {
    "id": 1,
    "title": "querySelector yordamida element tanlash",
    "instruction": "`document.querySelector` yordamida sahifadagi birinchi `h1` elementini tanlang va uni `title` o'zgaruvchisiga saqlang.",
    "startingCode": "// Kodni shu yerda yozing\n",
    "hint": "const title = document.querySelector('h1');",
    "test": "if (code.includes('document.querySelector') && (code.includes('h1') || code.includes(\"h1\"))) return null; return 'document.querySelector yordamida h1 elementini tanlang';"
  },
  {
    "id": 2,
    "title": "textContent yordamida matnni o'zgartirish",
    "instruction": "Berilgan `header` elementining `textContent` xususiyatini 'Salom JS' matniga o'zgartiruvchi `changeText(header)` funksiyasini yozing.",
    "startingCode": "function changeText(header) {\n  // Kodni shu yerga yozing\n}",
    "hint": "header.textContent = 'Salom JS';",
    "test": "try { const mockHeader = { textContent: '' }; changeText(mockHeader); if (mockHeader.textContent !== 'Salom JS') return 'header.textContent to\\'g\\'ri o\\'zgartirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "classList yordamida klassni o'zgartirish (Toggle)",
    "instruction": "Berilgan `element` obyekti klasslari ichida `active` klassi borligini `classList.toggle` yordamida almashtiruvchi `toggleActive(element)` funksiyasini yozing.",
    "startingCode": "function toggleActive(element) {\n  // Kodni shu yerga yozing\n}",
    "hint": "element.classList.toggle('active');",
    "test": "try { let toggled = null; const mockEl = { classList: { toggle: (c) => toggled = c } }; toggleActive(mockEl); if (toggled !== 'active') return 'classList.toggle yordamida active klassi almashtirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
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

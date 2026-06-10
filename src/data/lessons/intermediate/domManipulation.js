export const domManipulation = {
  id: "domManipulation",
  title: "DOM Manipulyatsiyasi: Elementlar Yaratish va Boshqarish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### DOM Manipulyatsiyasi nima?
**DOM Manipulyatsiyasi (DOM Manipulation)** — bu JavaScript yordamida veb-sahifadagi HTML elementlarini dynamic (dasturiy) ravishda yaratish, ularni joylashtirish, o'zgartirish, klonlash yoki butunlay o'chirib tashlash jarayonidir. Bu orqali sahifa foydalanuvchining harakatlariga mos ravishda dynamic o'zgaradi.

### Real hayotiy analogiya
Buni **Lego konstruktori** deb tasavvur qiling:
* **Yaratish (Create):** Siz qutidan yangi g'ishtcha olasiz (\`document.createElement\`).
* **Joylashtirish (Insert):** G'ishtchani konstruktor poydevoriga yopishtirasiz (\`appendChild\` yoki \`prepend\`).
* **O'zgartirish (Modify):** G'ishtchaga sticker yopishtirasiz yoki rangini bo'yaysiz (\`classList.add\`, \`style.color\`).
* **O'chirish (Remove):** Keraksiz bo'lakni sug'urib olib tashlaysiz (\`remove()\`).
* **Klonlash (Clone):** Bir xil shakldagi g'ishtchadan yana bitta nusxa olasiz (\`cloneNode\`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Element Yaratish va Qo'shish)
Yang element yaratib, unga matn berish va DOM-ga ulash:
\`\`\`javascript
const newParagraph = document.createElement('p');
newParagraph.textContent = 'Bu dynamic ravishda yaratilgan paragraf.';
newParagraph.className = 'info-text';

// body oxiriga qo'shish
document.body.appendChild(newParagraph);
\`\`\`

### 2. Intermediate Example (Aniq joyga element qo'shish)
\`prepend\`, \`before\`, \`after\` va \`insertAdjacentHTML\` yordamida elementlarni joylashtirish:
\`\`\`javascript
const list = document.querySelector('.todo-list');
const firstLi = list.querySelector('li');

const urgentTask = document.createElement('li');
urgentTask.textContent = 'Shoshilinch vazifa';

// 1. Ro'yxatning eng boshiga qo'shish
list.prepend(urgentTask);

// 2. Birinchi elementdan oldin yoki keyin qo'shish
const semiUrgent = document.createElement('li');
semiUrgent.textContent = 'Yarim shoshilinch';
firstLi.before(semiUrgent); // oldidan qo'shish

// 3. Tayyor HTML matnini tezkor joylashtirish
list.insertAdjacentHTML('beforeend', '<li class="completed">Tugallangan vazifa</li>');
\`\`\`

### 3. Advanced Example (Elementni Klonlash)
\`cloneNode\` yordamida element va uning bolalarini to'liq nusxalash (deep clone):
\`\`\`javascript
const templateCard = document.querySelector('.product-card');

// cloneNode(true) bolalari va ichidagi matnlar bilan to'liq nusxalaydi
// cloneNode(false) esa faqat element g'ovini (matnsiz) nusxalaydi
const newCard = templateCard.cloneNode(true);

newCard.querySelector('.product-title').textContent = 'Yangi Telefon';
newCard.querySelector('.product-price').textContent = '3 000 000 UZS';

document.querySelector('.catalog-grid').appendChild(newCard);
\`\`\`

### 4. Production Example (Dynamic Row va Event handler ulash)
Dynamic tarzda o'chirish tugmasiga ega jadval qatorlarini yaratish:
\`\`\`javascript
function addUserRow(id, name, email) {
  const tbody = document.querySelector('#users-table tbody');
  
  const tr = document.createElement('tr');
  tr.id = \`user-\${id}\`;
  
  tr.innerHTML = \`
    <td>\${id}</td>
    <td>\${name}</td>
    <td>\${email}</td>
    <td><button class="btn-delete">O'chirish</button></td>
  \`;
  
  // O'chirish tugmasiga event listener ulaymiz
  tr.querySelector('.btn-delete').addEventListener('click', () => {
    // tr o'zini o'zi o'chirib yuboradi (memory safe)
    tr.remove();
  });
  
  tbody.appendChild(tr);
}
\`\`\`

### 5. Enterprise Example (Event Delegation va closest() metodi)
Katta hajmli ro'yxatlarda har bir tugmaga alohida listener ulamay, ota element orqali dynamic kliklarni boshqarish:
\`\`\`javascript
const listContainer = document.querySelector('.shopping-list');

// Ota elementga 1 marta listener ulanadi (Event Delegation)
listContainer.addEventListener('click', (event) => {
  // closest() elementi yuqoriga qarab eng yaqin mos keluvchi elementni topadi
  const deleteBtn = event.target.closest('.delete-item-btn');
  
  if (deleteBtn) {
    const itemRow = deleteBtn.closest('.list-item');
    if (itemRow) {
      itemRow.remove(); // elementni dynamic o'chirish
    }
  }
});
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Dynamic ma'lumotlar oqimi:** Foydalanuvchi tugmani bosganda, chat xabari kelganda yoki API'dan ma'lumot yuklanganda sahifani qayta yuklamasdan dynamic DOM-ni o'zgartirish imkonini beradi.
* **Xotira boshqaruvi va oqishlar (Memory Leaks):** Elementlar DOM-dan o'chirilganda ulardagi event handler-larni va references-larni to'g'ri o'chirmaslik xotira oqishiga olib keladi. To'g'ri manipulyatsiya qilish xavfsizlik va barqarorlik kafolatidir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`createElement\` qilingan elementni DOM-ga ulamaslik
#### Xato:
\`const el = document.createElement("div"); el.textContent = "Salom";\` // Ekranda ko'rinmaydi!
#### To'g'ri usul:
\`document.body.appendChild(el);\` kabi metodlar bilan DOM-ga ulash.

### 2. Loop ichida \`innerHTML += ...\` operatorini ishlatish
#### Xato:
\`for(let i=0; i<100; i++) list.innerHTML += '<li>Item</li>';\`
#### Nima uchun:
Bu har safar butun HTML-ni qayta chizib (Reflow), sahifani keskin sekinlashtiradi.
#### To'g'ri usul:
\`DocumentFragment\` yoki \`insertAdjacentHTML\` ishlatish.

### 3. \`appendChild\` metodiga to'g'ridan-to'g'ri matn (string) berish
#### Xato:
\`element.appendChild("Mening matnim");\` // TypeError
#### To'g'ri usul:
\`element.append("Mening matnim");\` yoki \`element.textContent = "Mening matnim";\`

### 4. Yo'q elementni DOM-dan o'chirishga urinish
#### Xato:
\`document.querySelector(".non-existent").remove();\` // Cannot read properties of null
#### To'g'ri usul:
Avval element borligini tekshirish:
\`const el = document.querySelector(".non-existent"); if(el) el.remove();\`

### 5. \`cloneNode()\` metodida parametr bermaslik (yoki false berish)
#### Muammo:
Faqat tag-ning o'zi nusxalanadi, ichidagi barcha bolalari va matnlari yo'qolib ketadi.
#### To'g'ri usul:
To'liq nusxa uchun \`cloneNode(true)\` deb yozish.

### 6. Dynamic qo'shilgan elementlarga event listener ulay olmaslik
#### Muammo:
Sahifa yuklanganda dynamic yaratilmagan elementlar ustida querySelector qilib, keyin yaratilgan elementga listener ulay olmaslik.
#### To'g'ri yechim:
Event Delegation (ota elementga listener ulash) ishlatish.

### 7. DOM-dan elementni o'chirgach, JS-dagi references-ni null qilmaslik (Detached DOM)
#### Muammo:
\`element.remove()\` qilingan bo'lsa ham, JS-dagi o'zgaruvchi xotirada uni ushlab qolaveradi.
#### To'g'ri yechim:
\`myVar = null;\` qilib havolani uzish.

### 8. \`removeEventListener\` ishlatishda arrow funksiyalar yozish
#### Xato:
\`el.removeEventListener('click', () => myHandler());\` (o'chmaydi, chunki har safar yangi funksiya yaratiladi).
#### To'g'ri:
Nomli funksiya havolasini (reference) uzatish.

### 9. \`after\` va \`before\` metodlarini eski brauzerlarda to'g'ridan-to'g'ri ishlatish (Polyfill-siz)
#### Muammo:
Eski brauzerlarda (masalan Internet Explorer) bu metodlar mavjud emas. Modern loyihalarda transpile qilinishi shart.

### 10. \`element.innerHTML = ""\` orqali tozalashda event handlerlarni xotirada qoldirish
#### Muammo:
Xotira oqishiga sabab bo'lishi mumkin. Katta loyihalarda elementlarni o'chirishdan oldin listenerlarni tozalash tavsiya etiladi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da yangi element qanday yaratiladi?
   * **Javob:** \`document.createElement(tagName)\` metodi orqali xotirada yangi element obyekti yaratiladi.

2. **Savol:** \`appendChild()\` va \`prepend()\` metodlarining farqi nimada?
   * **Javob:** \`appendChild\` elementni ota blokning eng oxiriga bolasi qilib qo'shadi, \`prepend\` esa eng boshiga ulaydi.

3. **Savol:** Elementni DOM-dan qanday o'chirib tashlaymiz?
   * **Javob:** Elementning o'zida \`element.remove()\` metodini chaqirish orqali (modern brauzerlarda) yoki ota element orqali \`parent.removeChild(child)\` yordamida.

4. **Savol:** \`element.cloneNode(true)\` dagi \`true\` parametri nimani anglatadi?
   * **Javob:** Deep Clone (chuqur nusxa olish) — ya'ni elementni uning ichidagi barcha farzandlari, matnlari va atributlari bilan birgalikda to'liq nusxalashni anglatadi.

### Middle (5–8)
5. **Savol:** Event Delegation (hodisalar delegatsiyasi) nima va u qanday muammoni hal qiladi?
   * **Javob:** Har bir elementga alohida listener ulamasdan, ularning umumiy ota elementiga bitta listener ulash va event.target orqali bosilgan elementni aniqlash. Bu xotirani tejaydi va dynamic qo'shilgan elementlarni ham avtomat tinglash imkonini beradi.

6. **Savol:** \`insertAdjacentHTML()\` metodi qanday ishlaydi va uning afzalligi nimada?
   * **Javob:** Tayyor HTML stringini berilgan aniq pozitsiyaga (\`beforebegin\`, \`afterbegin\`, \`beforeend\`, \`afterend\`) tezkor joylashtiradi. \`innerHTML +=\`ga qaraganda tezroq ishlaydi va mavjud elementlarni qayta render qilmaydi.

7. **Savol:** Elementning \`closest()\` metodi nima maqsadda ishlatiladi?
   * **Javob:** Elementdan boshlab DOM daraxti bo'ylab tepaga qarab, berilgan selektorga mos keladigan eng birinchi ota (bobo/ajdod) elementni topadi.

8. **Savol:** Detached DOM elements nima va u xotira boshqaruviga qanday ta'sir qiladi?
   * **Javob:** DOM daraxtidan o'chirilgan, lekin JavaScript kodi ichidagi o'zgaruvchilarda hali ham havolasi (reference) saqlanib qolgan elementlar. Ular xotiradan o'chmaydi va xotira oqishiga (Memory Leak) sabab bo'ladi.

### Senior (9–12)
9. **Savol:** Klonlangan elementda (\`cloneNode\`) uning event listener-lari ham nusxalanadimi?
   * **Javob:** Yo'q, \`cloneNode\` elementning inline handler-laridan tashqari, \`addEventListener\` orqali ulangan dinamik event listener-larni nusxalamaydi. Ularni klonlangan elementga qaytadan ulash talab etiladi.

10. **Savol:** \`element.innerHTML = ""\` qilinganda xotira tozalanishi (GC) qanday kechadi va dynamic event listener-lar xotirada qolishi mumkinmi?
    * **Javob:** Zamonaviy brauzer dvigatellari (V8) ichki elementlar o'chganda ularga bog'liq listener-larni ham axlat yig'uvchiga (GC) topshiradi. Biroq, agar o'sha ichki elementlarga tashqaridagi uzoq yashovchi closures yoki global obyektlarda references qolgan bo'lsa, ular xotiradan o'chmaydi.

11. **Savol:** Micro-Frontend arxitekturasida turli dynamic component-larning DOM-ga ta'siri (conflict) qanday hal qilinadi?
    * **Javob:** Shadow DOM orqali elementlarni va stillarni izolyatsiya qilish (Web Components), yoki har bir component uchun alohida root div-lar yaratib, global selektorlar to'qnashuvini oldini olish uchun nomlash standartlariga (CSS Modules) rioya qilish.

12. **Savol:** DOM manipulyatsiyasini tezlashtirishda Batching va FastDOM kutubxonasi qanday ishlaydi?
    * **Javob:** Ular o'qish (read: offsetHeight) va yozish (write: style o'zgartirish) amallarini alohida navbatlarga (queues) ajratib, bir vaqtning o'zida bir xil turdagi amallarni guruhlab bajaradi. Bu reflow-lar sonini minimal darajada saqlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Dynamic KanBan Board Card Manipulator
Loyiha KanBan taxtasi bo'lib, foydalanuvchilar dynamic kartalar qo'shadi, ularni tahrirlaydi yoki o'chiradi. Hamma amallar dynamic tarzda DOM-da aks etishi shart.

\`\`\`javascript
class KanbanBoard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  addCard(id, text) {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.dataset.cardId = id;
    
    card.innerHTML = \`
      <p class="card-text">\${text}</p>
      <button class="delete-card-btn">x</button>
    \`;
    
    // O'chirish tugmasiga klik eshitish
    card.querySelector('.delete-card-btn').addEventListener('click', () => {
      card.remove(); // kartani o'chirish
    });
    
    this.container.appendChild(card);
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Shallow Cloning vs Deep Cloning:** Agar elementning faqat o'zi kerak bo'lsa va bolalarini nusxalash shart bo'lmasa, \`cloneNode(false)\` ishlatish xotirani tejaydi.
* **Batch DOM updates:** Ko'plab elementlarni yaratishda fragment yordamida ishlash sahifani tezkor qiladi.

---

## 10. 📌 Cheat Sheet

| Metod / Xususiyat | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **createElement()** | \`document.createElement('div')\` | Element yaratadi | Xotirada yaratadi |
| **appendChild()** | \`parent.appendChild(el)\` | Oxiriga farzand qiladi | DOM-ga ulaydi |
| **prepend()** | \`parent.prepend(el)\` | Boshiga farzand qiladi | DOM-ga ulaydi |
| **before()** | \`el.before(newEl)\` | Elementdan oldin qo'shadi | Qo'shni element qiladi |
| **after()** | \`el.after(newEl)\` | Elementdan keyin qo'shadi | Qo'shni element qiladi |
| **remove()** | \`el.remove()\` | Elementni o'chiradi | Modern usul |
| **cloneNode()** | \`el.cloneNode(true)\` | Elementni nusxalaydi | true = deep, false = shallow |
| **closest()** | \`el.closest('.wrapper')\` | Eng yaqin ota selektorni topadi| Tepaga qarab qidiradi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Yanggi Element Yaratish va Joylashtirish",
    "instruction": "`document.createElement` yordamida 'div' elementi yarating, uning klassiga 'box' qo'shing va uni `document.body` oxiriga appendChild yordamida ulovchi `createBox()` funksiyasini yozing.",
    "startingCode": "function createBox() {\n  // Kodni yozing\n}",
    "hint": "const div = document.createElement('div'); div.classList.add('box'); document.body.appendChild(div);",
    "test": "try { createBox(); const boxes = document.body.querySelectorAll('.box'); if (boxes.length === 0) return 'Box klassli element qo\\'shilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Boshiga Qo'shish (Prepend)",
    "instruction": "Berilgan `newElement` obyektini `container` elementining eng boshiga birinchi bola element sifatida joylashtiruvchi `addToStart(container, newElement)` funksiyasini yozing.",
    "startingCode": "function addToStart(container, newElement) {\n  // Kodni yozing\n}",
    "hint": "container.prepend(newElement);",
    "test": "try { let added = null; const mockContainer = { prepend: (el) => added = el }; const testEl = { id: 'test' }; addToStart(mockContainer, testEl); if (added !== testEl) return 'newElement boshiga joylashtirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Element Klonlash va ID o'zgartirish",
    "instruction": "Berilgan `original` elementini uning bolalari bilan birga to'liq klonlovchi, klonlangan nusxaning ID sini 'cloned-item' ga o'zgartiruvchi va o'sha klonlangan elementni qaytaruvchi `cloneElement(original)` funksiyasini yozing.",
    "startingCode": "function cloneElement(original) {\n  // Kodni yozing\n}",
    "hint": "const cloned = original.cloneNode(true); cloned.id = 'cloned-item'; return cloned;",
    "test": "try { const orig = document.createElement('div'); orig.id = 'original-id'; const res = cloneElement(orig); if (!res || res.id !== 'cloned-item') return 'Klonlangan element IDsi cloned-item bo\\'lmadi'; if (res === orig) return 'Klonlanmagan, asl element qaytarilgan'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da `document.createElement('div')` metodi chaqirilganda brauzerda nima sodir bo'ladi?",
    "options": [
      "Yangi `div` elementi yaratiladi va u avtomatik ravishda sahifaning oxiriga qo'shiladi",
      "Faqat tezkor xotirada (memory) yangi element obyekti yaratiladi, lekin u DOM daraxtiga qo'shilmaguncha sahifada ko'rinmaydi",
      "Mavjud barcha `div` elementlari o'chirib yuboriladi",
      "Brauzer konsolida faqat matnli xabar chiqadi"
    ],
    "correctAnswer": 1,
    "explanation": "`createElement` metodi elementni faqat xotirada yaratadi. U sahifada ko'rinishi uchun albatta `appendChild()`, `prepend()`, `before()`, yoki `after()` kabi metodlar yordamida DOM daraxtiga ulanishi kerak."
  },
  {
    "id": 2,
    "question": "Elementni ota elementning eng boshiga (birinchi farzand sifatida) qo'shish uchun qaysi metoddan foydalaniladi?",
    "options": [
      "parent.appendChild(child)",
      "parent.prepend(child)",
      "parent.insertAtFirst(child)",
      "parent.before(child)"
    ],
    "correctAnswer": 1,
    "explanation": "`parent.prepend(child)` metodi elementni ko'rsatilgan ota elementning eng boshiga qo'shadi. `appendChild` esa eng oxiriga qo'shadi."
  },
  {
    "id": 3,
    "question": "`textContent` va `innerHTML` xususiyatlari (properties) o'rtasidagi asosiy farq nima?",
    "options": [
      "Hech qanday farqi yo'q, ikkalasi ham bir xil natija beradi",
      "`textContent` matn ichidagi har qanday HTML teglarni oddiy matn sifatida xavfsiz yozadi; `innerHTML` esa berilgan matnni HTML kodi sifatida parse qilib, element ko'rinishida render qiladi (bu XSS xavfini keltirib chiqarishi mumkin)",
      "`innerHTML` faqat sonlarni, `textContent` esa faqat harflarni qabul qiladi",
      "`textContent` uslub stillarini (styles) ham o'zgartiradi, `innerHTML` esa yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "`textContent` matnni xavfsiz saqlaydi va HTML teglarni oddiy matn ko'rinishida ekranga chiqaradi. `innerHTML` esa berilgan stringni HTML sifatida o'qiydi (XSS hujumlariga qarshi zaiflik tug'dirishi mumkin)."
  },
  {
    "id": 4,
    "question": "DOM elementini sahifadan butunlay o'chirish uchun qaysi usul eng sodda va zamonaviy (ES6+) hisoblanadi?",
    "options": [
      "element.delete()",
      "element.remove()",
      "document.removeChild(element)",
      "element.clear()"
    ],
    "correctAnswer": 1,
    "explanation": "Modern JavaScript-da elementning o'zida `.remove()` metodini chaqirish orqali uni sahifadan juda oson va to'g'ridan-to'g'ri o'chirib tashlash mumkin."
  },
  {
    "id": 5,
    "question": "Katta miqdordagi elementlarni (masalan, 1000 ta qator) DOM-ga qo'shishda brauzer reflow va repaint (ekranda qayta chizish) yuklamasini kamaytirish hamda ishlash unumdorligini (performance) oshirish uchun nima ishlatiladi?",
    "options": [
      "innerHTML += ... loop ichida ishlatiladi",
      "DocumentFragment (hujjat parchasi) yaratib, barcha elementlarni unga yig'ib, so'ngra bir marta DOM-ga qo'shish",
      "Har bir elementni alohida document.body.appendChild() qilish",
      "setTimeout yordamida har bir elementni 1 millisekund kechiktirib qo'shish"
    ],
    "correctAnswer": 1,
    "explanation": "`DocumentFragment` - bu virtual DOM bo'lagi bo'lib, xotirada yaratiladi. Unga bir nechta elementlarni qo'shib, keyin bitta operatsiya orqali DOM-ga ulaganda sahifani qayta chizish (repaint) soni kamayadi va tezlik sezilarli darajada oshadi."
  },
  {
    "id": 6,
    "question": "`element.cloneNode(true)` va `element.cloneNode(false)` o'rtasidagi farq nima?",
    "options": [
      "true faqat elementning o'zini, false esa ichidagi bolalari bilan nusxalaydi",
      "true elementni va uning barcha ichki bolalarini (deep copy) klonlaydi, false esa faqat elementning o'zini (shallow copy) nusxalaydi",
      "true elementni o'chiradi, false esa saqlab qoladi",
      "true inline stillarni nusxalaydi, false esa klasslarni nusxalaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`cloneNode(true)` chuqur nusxa olishni bildiradi, ya'ni element ichidagi barcha matn va boshqa elementlar bilan birga klonlanadi. `cloneNode(false)` esa elementning o'zini, lekin uning ichidagi tarkibni nusxalamaydi."
  },
  {
    "id": 7,
    "question": "Elementning atributini butunlay o'chirib tashlash uchun qaysi metoddan foydalaniladi?",
    "options": [
      "element.setAttribute('attr', null)",
      "element.removeAttribute('attr')",
      "element.deleteAttribute('attr')",
      "element.clearAttribute('attr')"
    ],
    "correctAnswer": 1,
    "explanation": "`removeAttribute('attr')` ko'rsatilgan atributni elementdan butunlay olib tashlaydi."
  },
  {
    "id": 8,
    "question": "`element.insertAdjacentHTML('beforeend', html)` metodi qayerga yangi element qo'shadi?",
    "options": [
      "Elementning bevosita oldidan (tashqarida)",
      "Elementning bevosita keyin (tashqarida)",
      "Element ichidagi barcha bolalarning boshiga (birinchi farzand sifatida)",
      "Element ichidagi barcha bolalarning oxiriga (oxirgi farzand sifatida)"
    ],
    "correctAnswer": 3,
    "explanation": "`beforeend` qiymati yangi tarkibni maqsad qilingan elementning eng oxirgi bolasi (farzandi) sifatida, yopilish tegi oldidan joylashtiradi."
  },
  {
    "id": 9,
    "question": "`element.classList.toggle('active')` metodi qanday ishlaydi?",
    "options": [
      "Elementga har doim 'active' klassini qo'shadi",
      "Elementdan 'active' klassini har doim o'chiradi",
      "Agar elementda 'active' klassi bo'lsa uni o'chiradi, agar yo'q bo'lsa uni qo'shadi",
      "Elementning barcha klasslarini 'active'ga almashtiradi"
    ],
    "correctAnswer": 2,
    "explanation": "`classList.toggle()` metodi berilgan klass elementda mavjud bo'lsa uni o'chiradi (va false qaytaradi), mavjud bo'lmasa qo'shadi (va true qaytaradi)."
  },
  {
    "id": 10,
    "question": "`removeChild()` va `remove()` metodlarining farqi nima?",
    "options": [
      "remove() ota elementdan bolani o'chirish uchun ota elementda chaqiriladi, removeChild() esa elementning o'zini o'chirish uchun unda to'g'ridan-to'g'ri chaqiriladi",
      "removeChild() ota elementda chaqirilib, o'chirib tashlangan element obyekti ma'lumotini qaytaradi; remove() esa elementning o'zida chaqiriladi va sahifadan o'chirilgach hech narsa qaytarmaydi",
      "Ikkalasi ham mutlaqo bir xil va faqat ota elementda ishlaydi",
      "remove() faqat rasmlarni o'chirishga mos keladi, removeChild() esa div'larni"
    ],
    "correctAnswer": 1,
    "explanation": "`parent.removeChild(child)` eski uslub bo'lib, ota elementda chaqiriladi va o'chirilgan bolani qaytaradi. Modern `child.remove()` esa elementning o'zida chaqiriladi va sahifadan o'chirib tashlaydi."
  },
  {
    "id": 11,
    "question": "Quyidagilardan qaysi biri elementning bevosita ota-elementini (parent node) olish uchun ishlatiladi?",
    "options": [
      "element.parentElement",
      "element.children",
      "element.nextElementSibling",
      "element.closest"
    ],
    "correctAnswer": 0,
    "explanation": "`parentElement` xususiyati elementning bevosita ota elementini (parent node, agar u HTML element bo'lsa) qaytaradi."
  },
  {
    "id": 12,
    "question": "`element.closest('.wrapper')` metodi nima qiladi?",
    "options": [
      "Maqsadli elementning eng birinchi farzandini wrapper klassi bo'yicha qidiradi",
      "Maqsadli elementdan boshlab ota-bobolari (ancestors) bo'ylab yuqoriga qarab birinchi mos keluvchi '.wrapper' selectorli elementni qidiradi va qaytaradi",
      "Elementga eng yaqin joylashgan qo'shni (sibling) wrapper elementini qaytaradi",
      "Sahifadagi barcha '.wrapper' klassiga ega elementlarni topadi"
    ],
    "correctAnswer": 1,
    "explanation": "`closest()` metodi elementning o'zidan boshlab, DOM daraxti bo'ylab yuqoriga (ota, bobo va h.k.) qarab, berilgan selectorga mos keladigan eng birinchi elementni qaytaradi. Agar topilmasa, `null` qaytaradi."
  }
]

};

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

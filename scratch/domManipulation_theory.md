## 1. 💡 Sodda Tushuntirish va Analogiya

### DOM Manipulyatsiyasi nima?
**DOM Manipulyatsiyasi (DOM Manipulation)** — bu JavaScript yordamida veb-sahifadagi HTML elementlarini dynamic (dasturiy) ravishda yaratish, ularni joylashtirish, o'zgartirish, klonlash yoki butunlay o'chirib tashlash jarayonidir. Bu orqali sahifa foydalanuvchining harakatlariga mos ravishda dynamic o'zgaradi.

### Real hayotiy analogiya
Buni **Lego konstruktori** deb tasavvur qiling:
* **Yaratish (Create):** Siz qutidan yangi g'ishtcha olasiz (`document.createElement`).
* **Joylashtirish (Insert):** G'ishtchani konstruktor poydevoriga yopishtirasiz (`appendChild` yoki `prepend`).
* **O'zgartirish (Modify):** G'ishtchaga sticker yopishtirasiz yoki rangini bo'yaysiz (`classList.add`, `style.color`).
* **O'chirish (Remove):** Keraksiz bo'lakni sug'urib olib tashlaysiz (`remove()`).
* **Klonlash (Clone):** Bir xil shakldagi g'ishtchadan yana bitta nusxa olasiz (`cloneNode`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Element Yaratish va Qo'shish)
Yang element yaratib, unga matn berish va DOM-ga ulash:
```javascript
const newParagraph = document.createElement('p');
newParagraph.textContent = 'Bu dynamic ravishda yaratilgan paragraf.';
newParagraph.className = 'info-text';

// body oxiriga qo'shish
document.body.appendChild(newParagraph);
```

### 2. Intermediate Example (Aniq joyga element qo'shish)
`prepend`, `before`, `after` va `insertAdjacentHTML` yordamida elementlarni joylashtirish:
```javascript
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
```

### 3. Advanced Example (Elementni Klonlash)
`cloneNode` yordamida element va uning bolalarini to'liq nusxalash (deep clone):
```javascript
const templateCard = document.querySelector('.product-card');

// cloneNode(true) bolalari va ichidagi matnlar bilan to'liq nusxalaydi
// cloneNode(false) esa faqat element g'ovini (matnsiz) nusxalaydi
const newCard = templateCard.cloneNode(true);

newCard.querySelector('.product-title').textContent = 'Yangi Telefon';
newCard.querySelector('.product-price').textContent = '3 000 000 UZS';

document.querySelector('.catalog-grid').appendChild(newCard);
```

### 4. Production Example (Dynamic Row va Event handler ulash)
Dynamic tarzda o'chirish tugmasiga ega jadval qatorlarini yaratish:
```javascript
function addUserRow(id, name, email) {
  const tbody = document.querySelector('#users-table tbody');
  
  const tr = document.createElement('tr');
  tr.id = `user-${id}`;
  
  tr.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td><button class="btn-delete">O'chirish</button></td>
  `;
  
  // O'chirish tugmasiga event listener ulaymiz
  tr.querySelector('.btn-delete').addEventListener('click', () => {
    // tr o'zini o'zi o'chirib yuboradi (memory safe)
    tr.remove();
  });
  
  tbody.appendChild(tr);
}
```

### 5. Enterprise Example (Event Delegation va closest() metodi)
Katta hajmli ro'yxatlarda har bir tugmaga alohida listener ulamay, ota element orqali dynamic kliklarni boshqarish:
```javascript
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
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Dynamic ma'lumotlar oqimi:** Foydalanuvchi tugmani bosganda, chat xabari kelganda yoki API'dan ma'lumot yuklanganda sahifani qayta yuklamasdan dynamic DOM-ni o'zgartirish imkonini beradi.
* **Xotira boshqaruvi va oqishlar (Memory Leaks):** Elementlar DOM-dan o'chirilganda ulardagi event handler-larni va references-larni to'g'ri o'chirmaslik xotira oqishiga olib keladi. To'g'ri manipulyatsiya qilish xavfsizlik va barqarorlik kafolatidir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `createElement` qilingan elementni DOM-ga ulamaslik
#### Xato:
`const el = document.createElement("div"); el.textContent = "Salom";` // Ekranda ko'rinmaydi!
#### To'g'ri usul:
`document.body.appendChild(el);` kabi metodlar bilan DOM-ga ulash.

### 2. Loop ichida `innerHTML += ...` operatorini ishlatish
#### Xato:
`for(let i=0; i<100; i++) list.innerHTML += '<li>Item</li>';`
#### Nima uchun:
Bu har safar butun HTML-ni qayta chizib (Reflow), sahifani keskin sekinlashtiradi.
#### To'g'ri usul:
`DocumentFragment` yoki `insertAdjacentHTML` ishlatish.

### 3. `appendChild` metodiga to'g'ridan-to'g'ri matn (string) berish
#### Xato:
`element.appendChild("Mening matnim");` // TypeError
#### To'g'ri usul:
`element.append("Mening matnim");` yoki `element.textContent = "Mening matnim";`

### 4. Yo'q elementni DOM-dan o'chirishga urinish
#### Xato:
`document.querySelector(".non-existent").remove();` // Cannot read properties of null
#### To'g'ri usul:
Avval element borligini tekshirish:
`const el = document.querySelector(".non-existent"); if(el) el.remove();`

### 5. `cloneNode()` metodida parametr bermaslik (yoki false berish)
#### Muammo:
Faqat tag-ning o'zi nusxalanadi, ichidagi barcha bolalari va matnlari yo'qolib ketadi.
#### To'g'ri usul:
To'liq nusxa uchun `cloneNode(true)` deb yozish.

### 6. Dynamic qo'shilgan elementlarga event listener ulay olmaslik
#### Muammo:
Sahifa yuklanganda dynamic yaratilmagan elementlar ustida querySelector qilib, keyin yaratilgan elementga listener ulay olmaslik.
#### To'g'ri yechim:
Event Delegation (ota elementga listener ulash) ishlatish.

### 7. DOM-dan elementni o'chirgach, JS-dagi references-ni null qilmaslik (Detached DOM)
#### Muammo:
`element.remove()` qilingan bo'lsa ham, JS-dagi o'zgaruvchi xotirada uni ushlab qolaveradi.
#### To'g'ri yechim:
`myVar = null;` qilib havolani uzish.

### 8. `removeEventListener` ishlatishda arrow funksiyalar yozish
#### Xato:
`el.removeEventListener('click', () => myHandler());` (o'chmaydi, chunki har safar yangi funksiya yaratiladi).
#### To'g'ri:
Nomli funksiya havolasini (reference) uzatish.

### 9. `after` va `before` metodlarini eski brauzerlarda to'g'ridan-to'g'ri ishlatish (Polyfill-siz)
#### Muammo:
Eski brauzerlarda (masalan Internet Explorer) bu metodlar mavjud emas. Modern loyihalarda transpile qilinishi shart.

### 10. `element.innerHTML = ""` orqali tozalashda event handlerlarni xotirada qoldirish
#### Muammo:
Xotira oqishiga sabab bo'lishi mumkin. Katta loyihalarda elementlarni o'chirishdan oldin listenerlarni tozalash tavsiya etiladi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da yangi element qanday yaratiladi?
   * **Javob:** `document.createElement(tagName)` metodi orqali xotirada yangi element obyekti yaratiladi.

2. **Savol:** `appendChild()` va `prepend()` metodlarining farqi nimada?
   * **Javob:** `appendChild` elementni ota blokning eng oxiriga bolasi qilib qo'shadi, `prepend` esa eng boshiga ulaydi.

3. **Savol:** Elementni DOM-dan qanday o'chirib tashlaymiz?
   * **Javob:** Elementning o'zida `element.remove()` metodini chaqirish orqali (modern brauzerlarda) yoki ota element orqali `parent.removeChild(child)` yordamida.

4. **Savol:** `element.cloneNode(true)` dagi `true` parametri nimani anglatadi?
   * **Javob:** Deep Clone (chuqur nusxa olish) — ya'ni elementni uning ichidagi barcha farzandlari, matnlari va atributlari bilan birgalikda to'liq nusxalashni anglatadi.

### Middle (5–8)
5. **Savol:** Event Delegation (hodisalar delegatsiyasi) nima va u qanday muammoni hal qiladi?
   * **Javob:** Har bir elementga alohida listener ulamasdan, ularning umumiy ota elementiga bitta listener ulash va event.target orqali bosilgan elementni aniqlash. Bu xotirani tejaydi va dynamic qo'shilgan elementlarni ham avtomat tinglash imkonini beradi.

6. **Savol:** `insertAdjacentHTML()` metodi qanday ishlaydi va uning afzalligi nimada?
   * **Javob:** Tayyor HTML stringini berilgan aniq pozitsiyaga (`beforebegin`, `afterbegin`, `beforeend`, `afterend`) tezkor joylashtiradi. `innerHTML +=`ga qaraganda tezroq ishlaydi va mavjud elementlarni qayta render qilmaydi.

7. **Savol:** Elementning `closest()` metodi nima maqsadda ishlatiladi?
   * **Javob:** Elementdan boshlab DOM daraxti bo'ylab tepaga qarab, berilgan selektorga mos keladigan eng birinchi ota (bobo/ajdod) elementni topadi.

8. **Savol:** Detached DOM elements nima va u xotira boshqaruviga qanday ta'sir qiladi?
   * **Javob:** DOM daraxtidan o'chirilgan, lekin JavaScript kodi ichidagi o'zgaruvchilarda hali ham havolasi (reference) saqlanib qolgan elementlar. Ular xotiradan o'chmaydi va xotira oqishiga (Memory Leak) sabab bo'ladi.

### Senior (9–12)
9. **Savol:** Klonlangan elementda (`cloneNode`) uning event listener-lari ham nusxalanadimi?
   * **Javob:** Yo'q, `cloneNode` elementning inline handler-laridan tashqari, `addEventListener` orqali ulangan dinamik event listener-larni nusxalamaydi. Ularni klonlangan elementga qaytadan ulash talab etiladi.

10. **Savol:** `element.innerHTML = ""` qilinganda xotira tozalanishi (GC) qanday kechadi va dynamic event listener-lar xotirada qolishi mumkinmi?
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

```javascript
class KanbanBoard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  addCard(id, text) {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.dataset.cardId = id;
    
    card.innerHTML = `
      <p class="card-text">${text}</p>
      <button class="delete-card-btn">x</button>
    `;
    
    // O'chirish tugmasiga klik eshitish
    card.querySelector('.delete-card-btn').addEventListener('click', () => {
      card.remove(); // kartani o'chirish
    });
    
    this.container.appendChild(card);
  }
}
```

---

## 9. 🚀 Performance va Optimization

* **Shallow Cloning vs Deep Cloning:** Agar elementning faqat o'zi kerak bo'lsa va bolalarini nusxalash shart bo'lmasa, `cloneNode(false)` ishlatish xotirani tejaydi.
* **Batch DOM updates:** Ko'plab elementlarni yaratishda fragment yordamida ishlash sahifani tezkor qiladi.

---

## 10. 📌 Cheat Sheet

| Metod / Xususiyat | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **createElement()** | `document.createElement('div')` | Element yaratadi | Xotirada yaratadi |
| **appendChild()** | `parent.appendChild(el)` | Oxiriga farzand qiladi | DOM-ga ulaydi |
| **prepend()** | `parent.prepend(el)` | Boshiga farzand qiladi | DOM-ga ulaydi |
| **before()** | `el.before(newEl)` | Elementdan oldin qo'shadi | Qo'shni element qiladi |
| **after()** | `el.after(newEl)` | Elementdan keyin qo'shadi | Qo'shni element qiladi |
| **remove()** | `el.remove()` | Elementni o'chiradi | Modern usul |
| **cloneNode()** | `el.cloneNode(true)` | Elementni nusxalaydi | true = deep, false = shallow |
| **closest()** | `el.closest('.wrapper')` | Eng yaqin ota selektorni topadi| Tepaga qarab qidiradi |

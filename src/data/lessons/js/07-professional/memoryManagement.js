export const memoryManagement = {
  id: "memoryManagement",
  title: "Memory Management (Xotira boshqaruvi) va Garbage Collection",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Xotira Boshqaruvi va Garbage Collection nima?
* **Memory Management (Xotira boshqaruvi)** — bu dasturimiz ishlashi jarayonida o'zgaruvchilar, obyektlar va ma'lumotlar uchun kompyuter tezkor xotirasidan (RAM) joy ajratilishi, ishlatilishi va ishlatib bo'lingach u joyning qayta bo'shatilishi jarayonidir.
* **Stack (Stek)** — oddiy, kichik va o'lchami oldindan ma'lum bo'lgan qiymatlar (sonlar, matnlar, boolean, null, undefined) va joriy funksiya chaqirilishi stacklari (Call Stack) saqlanadigan o'ta tezkor xotira.
* **Heap (Xip)** — dynamic o'lchamga ega bo'lgan katta hajmli murakkab ma'lumotlar (obyektlar, massivlar, funksiyalar) saqlanadigan katta xotira havzasi.
* **Garbage Collector (GC - Chiqindi yig'uvchi)** — JavaScript dvigateli tarkibidagi avtomatik xizmatchi. U xotirani doimiy tekshirib turadi va root (global \`window\`) obyektidan bog'lanish zanjiri butunlay uzilgan, ya'ni qayta murojaat qilib bo'lmaydigan (unreachable) ma'lumotlarni aniqlab, xotirani bo'shatib beradi.

### Real hayotiy o'xshatish
Buni **ijaraga olingan kvartira** misolida tasavvur qiling:
* **Allocation (Xotira ajratish):** Kvartiraga ko'chib kirasiz va yangi mebellar sotib olib joylashtirasiz.
* **Usage (Ishlatish):** Mebellardan va xonalardan foydalanasiz.
* **Release (Bo'shatish / GC):** Kvartira ijarasi tugagach ko'chib ketasiz. Agar siz barcha mebellarni uydan chiqarsangiz va kalitlarni topshirsangiz, uy butunlay bo'shaydi (GC tozaladi).
* **Memory Leak (Xotira oqishi):** Agar siz uydan ko'chib ketsangiz-u, lekin uyingizdagi ba'zi qutilarni (masalan, koddagi unutilgan \`setInterval\`) u yerda qoldirib, kalitni ham o'zingizda saqlasangiz (reference saqlanib qolsa), u kvartira band bo'lib turaveradi va boshqa ijarachilar foydalana olmaydi. Bu xotira oqishidir.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Stack vs Heap Variables)
Primitivlar Stack-da, obyektlar esa Heap-da qanday saqlanishi:
\`\`\`javascript
// Stack-da saqlanadi (oddiy son va uning nusxasi)
let score1 = 100;
let score2 = score1; // Qiymat to'liq nusxalanadi (xotirada 2 ta alohida 100 bor)
score2 = 90;
console.log(score1); // 100 (score2 score1 ga ta'sir qilmaydi)

// Heap-da saqlanadi (obyektning o'zi Heap-da, unga havola esa Stack-da)
let user1 = { name: 'Ali', age: 25 };
let user2 = user1; // Obyekt nusxalanmaydi, Stack-dagi havola (reference) nusxalanadi
user2.age = 26;
console.log(user1.age); // 26 (chunki user1 va user2 xotiradagi bitta obyektga ko'rsatib turibdi)
\`\`\`

### 2. Intermediate Example (Garbage Collection targeting)
Reference-ni uzish orqali ma'lumotlarni o'chirishga tayyorlash:
\`\`\`javascript
let largeData = {
  payload: new Array(1000000).fill('data')
};

// ... largeData bilan ish tugadi

// Garbage Collectorga uni xotiradan tozalashga ruxsat berish
largeData = null; // Havola uzildi, endi xotira tozalanishga tayyor
\`\`\`

### 3. Advanced Example (Accidental Globals va Forgotten Intervals)
Xotira oqishini keltirib chiqaruvchi kod va uni to'g'rilash:
\`\`\`javascript
// XATOLIK: Xotira oqishi (Memory Leak)
function startLeakyTimer() {
  const data = new Array(1000000).fill('secret');
  
  // setInterval to'xtatilmaydi, data doimo xotirada qoladi
  setInterval(() => {
    console.log('Timer ishlayapti:', data.length);
  }, 1000);
}

// TO'G'RI: Tozalash mexanizmiga ega timer
function startSafeTimer() {
  const data = new Array(1000000).fill('secret');
  
  const timerId = setInterval(() => {
    console.log('Timer ishlayapti:', data.length);
  }, 1000);
  
  // Vaqti kelganda intervalni tozalaymiz
  return () => {
    clearInterval(timerId);
    console.log('Interval tozalandi, data GC tomonidan o\\\\'chiriladi');
  };
}
\`\`\`

### 4. Production Example (WeakMap va WeakSet orqali Keshlash)
Obyektlardan foydalanilmay qo'yganda keshni xotiradan avtomat tozalanishini ta'minlash:
\`\`\`javascript
// OBYEKT ushlab qolinmaydi (Weak Reference)
const userCaches = new WeakMap();

function processUser(user) {
  if (userCaches.has(user)) {
    return userCaches.get(user);
  }
  
  const calculatedData = { hash: \`user-\${user.id}-\${Math.random()}\` };
  userCaches.set(user, calculatedData);
  return calculatedData;
}

let activeUser = { id: 42, name: 'Vali' };
processUser(activeUser); // Keshga yozildi

// Foydalanuvchi tizimdan chiqdi / obyekt o'chirildi
activeUser = null; 
// activeUser = null bo'lishi bilan WeakMap-dagi kesh ham Garbage Collector tomonidan avtomatik o'chiriladi!
\`\`\`

### 5. Enterprise Example (Detached DOM Management)
O'chirilgan, lekin xotirada qolib ketgan (detached) DOM elementlarini xavfsiz tozalash:
\`\`\`javascript
class ElementManager {
  constructor() {
    this.elements = {};
  }

  addElement(id) {
    const el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
    
    // XATOLIKKA MOYILLIK: elementga havola elements obyektida saqlanmoqda
    this.elements[id] = el;
  }

  removeElement(id) {
    const el = this.elements[id];
    if (el) {
      el.remove(); // DOM-dan o'chiriladi, lekin this.elements ichida havola qolaveradi!
      
      // TO'G'RI YECHIM: havolani ham butunlay tozalaymiz
      delete this.elements[id];
    }
  }
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Out of Memory (OOM) xatolari:** Single Page Application (SPA)-larda foydalanuvchi sahifani yangilamay soatlab o'tirishi mumkin (masalan, Trello, Gmail, Telegram Web). Agar navigatsiya vaqtida xotira tozalab borilmasa, RAM sarfi oshib boradi va brauzer yoki Node.js server butunlay qulab tushadi (Crash).
* **Mark-and-Sweep algoritmi:** Odatda "Reference Counting" (havola sanash) algoritmlari aylanma havolalarni (\`circular references\`) tozalay olmasdi. Hozirgi brauzerlar Mark-and-Sweep yordamida faqat global root-ga ulanmagan barcha dynamic ma'lumotlarni muvaffaqiyatli tozalab beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`var/let/const\`ni unutib, tasodifiy global o'zgaruvchi yaratish
#### Xato:
\`function f() { myData = new Array(1000); }\` (myData global window-ga bog'lanib qoladi).
#### To'g'ri usul:
Strict mode-dan foydalanish va har doim \`let\`, \`const\` yoki \`var\` yozish.

### 2. setInterval yoki setTimeout-ni tozalashni unutish
#### Muammo:
Interval ishlashda davom etadi va undagi callback scope-dagi o'zgaruvchilar tozalab tashlanmaydi.
#### To'g'ri usul:
Har doim \`clearInterval()\` va \`clearTimeout()\` dan foydalanish.

### 3. DOM-dan o'chirilgan elementning JS-dagi havolasini saqlab qolish (Detached DOM)
#### Xato:
Elementni \`removeChild\` qilish, lekin unga ishora qiluvchi o'zgaruvchini \`null\` qilmaslik.
#### To'g'ri usul:
\`el = null;\` deb yozib havolani ham o'chirish.

### 4. Global Map yoki Set ichiga doimiy obyektlar qo'shib borish (Kesh oqishi)
#### Xato:
Obyektlarni oddiy \`Map\`-da keshlab borish va ularni hech qachon o'chirmaslik.
#### To'g'ri usul:
Bunday keshlar uchun \`WeakMap\` yoki \`WeakSet\` ishlatish.

### 5. Event Listenerlarni o'chirishni unutish
#### Xato:
DOM element o'chirilishidan avval \`window\`ga qo'shilgan global event listenerni o'chirmaslik.
#### To'g'ri usul:
Element o'chishida \`window.removeEventListener()\` chaqirish.

### 6. Closures (yopiq muhitlar) ichida keraksiz katta obyektlarni ushlab qolish
#### Xato:
\`\`\`javascript
function makeClosure() {
  const hugeData = new Array(1000000);
  return () => console.log('hello'); // hugeData o'chmaydi!
}
\`\`\`
#### To'g'ri usul:
Faqat kerakli kichik ma'lumotni closure-ga uzatish.

### 7. Massivlarni tozalashda yangi massiv yaratish
#### Xato:
\`let arr = [1, 2]; arr = [];\` (Agar boshqa joyda \`arr\`ga havola bo'lsa, eski massiv xotirada qolib ketadi).
#### To'g'ri usul:
\`arr.length = 0;\` orqali massivning o'zini tozalash.

### 8. \`WeakMap\` kaliti sifatida primitiv turlar (string, number) ishlatishga urinish
#### Xato:
\`weakMap.set('id', data)\` (TypeError beradi, kalit faqat obyekt yoki symbol bo'lishi shart).

### 9. GC (Garbage Collector) ishini JavaScript kodi orqali majburiy chaqira olaman deb o'ylash
#### Xato:
JS kodida qo'lda \`window.gc()\` yoki \`gc()\` chaqirishga urinish (brauzerda buning iloji yo'q).

### 10. \`performance.memory\` dan foydalana olmaslik
#### Xato:
Loyiha xotirasini monitoring qilish uchun \`performance.memory\` API-ni tekshirib ko'rmaslik.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da Stack va Heap xotiralarining asosiy farqi nima?
   * **Javob:** Stack - oddiy qiymatlar va chaqiruv stacklari uchun kichik, tezkor xotira. Heap - dinamik, murakkab obyektlar va massivlar saqlanadigan katta xotira.

2. **Savol:** Garbage Collector (Chiqindi yig'uvchi) qanday vazifani bajaradi?
   * **Javob:** Xotirani doimiy tahlil qilib, endi foydalanib bo'lmaydigan (root-dan zanjiri uzilgan) obyektlarni avtomatik o'chirib, xotirani bo'shatadi.

3. **Savol:** Memory Leak (Xotira oqishi) nima?
   * **Javob:** Dasturga kerak bo'lmagan, lekin koddagi havolalar (references) tufayli Garbage Collector o'chira olmayotgan xotira bo'laklarining yig'ilib qolishi.

4. **Savol:** Tasodifiy global o'zgaruvchilar nima uchun xotira oqishiga sabab bo'ladi?
   * **Javob:** Chunki ular global \`window\` obyektiga birikib qoladi va sahifa yopilguncha (yoki qo'lda null qilinmaguncha) xotiradan o'chirilmaydi.

### Middle (5–8)
5. **Savol:** Mark-and-Sweep algoritmi qanday ishlaydi?
   * **Javob:** Dvigatel global Root-dan boshlab barcha yetib borish mumkin bo'lgan obyektlarni belgilaydi (Mark). So'ngra belgilanmagan (unreachable) barcha obyektlarni xotiradan o'chirib tozalaydi (Sweep).

6. **Savol:** WeakMap va WeakSet-larning oddiy Map va Set-dan farqi nimada va ularning xotiraga ta'siri qanday?
   * **Javob:** Kalit sifatida faqat obyekt qabul qiladi va havolalar kuchsiz (weak) bo'ladi. Agar o'sha kalit-obyektga tashqarida boshqa havola qolmasa, u avtomatik ravishda WeakMap-dan ham, xotiradan ham Garbage Collector tomonidan o'chirib yuboriladi.

7. **Savol:** Detached DOM elementlari nima va u qanday xavf tug'diradi?
   * **Javob:** DOM daraxtidan \`remove()\` orqali o'chirilgan, lekin JavaScript-dagi biror o'zgaruvchida hali ham saqlanib turgan elementlar. Ular DOM-da ko'rinmasa ham xotirani band qilib turaveradi.

8. **Savol:** Massiv elementlarini tozalashda \`arr = []\` va \`arr.length = 0\` o'rtasidagi xotira boshqaruvi bo'yicha farq nima?
   * **Javob:** \`arr = []\` yangi massiv yaratadi, lekin eski massivga boshqa joyda (masalan, boshqa o'zgaruvchida) reference bo'lsa u xotiradan o'chmaydi. \`arr.length = 0\` esa xotiradagi o'sha massivning o'zini ichidan tozalaydi, bu ancha xavfsiz va tezkor.

### Senior (9–12)
9. **Savol:** Chrome DevTools yordamida xotira oqishini (Memory Leak) qanday aniqlaysiz va Heap Snapshot tahlilini tushuntiring.
   * **Javob:** DevTools "Memory" bo'limida "Heap Snapshot" olinadi. Ma'lum bir operatsiyani bajarib (masalan, sahifani ochib yopib) ikkinchi snapshot olinadi. Ikkala snapshot solishtirilganda (Comparison mode) xotirada qolib ketgan "Detached HTMLDivElement" yoki ko'paygan obyektlar orqali xotira oqishi aniqlanadi.

10. **Savol:** Closures (yopiq muhitlar) qanday qilib kutilmagan xotira oqishlariga olib kelishi mumkin va uni qanday optimallashtirasiz?
    * **Javob:** Closure ichki funksiya orqali tashqi funksiya lexical scope-dagi o'zgaruvchilarni xotirada saqlab qoladi. Agar ichki funksiya global event listener yoki uzoq yashovchi timerga ulab qo'yilsa, butun lexical scope (hatto undagi ishlatilmagan katta o'zgaruvchilar ham) xotirada saqlanib qoladi. Yechim — faqat kerakli primitiv qiymatni closure-ga uzatish yoki havolalarni vaqtida uzish.

11. **Savol:** Garbage Collection jarayonidagi "Stop-the-world" effekti nima va zamonaviy V8 dvigateli buni qanday kamaytiradi (Scavenger, Incremental Marking)?
    * **Javob:** GC ishlaganda JS kod bajarilishi vaqtincha to'xtatiladi (Stop-the-world). V8 dvigateli buni kamaytirish uchun xotirani ikki qismga bo'ladi (Young Generation - oson tozaluvchi Scavenger, Old Generation). Shuningdek, xotirani bir kadrda emas, kichik bo'laklar bilan asinxron belgilab boruvchi "Incremental Marking" va parallel tozalash (Concurrent GC) texnologiyalaridan foydalanadi.

12. **Savol:** Node.js da backend xizmatlarida xotira oqishini monitoring qilish va uni heapdump moduli orqali tahlil qilish jarayoni qanday kechadi?
    * **Javob:** Node.js server ishga tushirilganda monitoring asboblari (masalan, PM2 monitor yoki Prometheus) yordamida RAM o'sishi kuzatiladi. Xotira doimiy o'sib borayotgani aniqlansa, \`heapdump\` moduli orqali \`.heapsnapshot\` fayli yaratiladi. Uni Chrome brauzeri DevTools-ga yuklab, xotirani band etgan obyektlar va funksiyalar tahlil qilinadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Single Page Application (SPA) sahifalar almashuvida Memory Leak-ni tuzatish
Loyiha React yoki Vue ishlatmasdan, toza JS-da yozilgan SPA. Foydalanuvchi \`/dashboard\` sahifasiga kirganda jadvallar va chartlar chiziladi hamda window resize hodisasi tinglanadi. Sahifadan chiqib ketganda xotira bo'shamayapti.

#### Yechim (EventListener-larni tozalash tizimi):
\`\`\`javascript
class DashboardPage {
  constructor() {
    this.boundResizeHandler = this.onResize.bind(this);
    this.largeDataset = new Array(100000).fill('data');
  }

  init() {
    window.addEventListener('resize', this.boundResizeHandler);
  }

  onResize() {
    console.log('Resize bo\\\\'ldi, ma\\\\'lumotlar soni:', this.largeDataset.length);
  }

  // Sahifa yopilayotganda chaqiriladigan metod
  destroy() {
    // 1. Event listenerni o'chiramiz (Aks holda window resize orqali butun DashboardPage xotirada qolaveradi)
    window.removeEventListener('resize', this.boundResizeHandler);
    
    // 2. Katta massiv havolasini uzamiz
    this.largeDataset = null;
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **EventListener Registry Pattern:** Barcha qo'shiladigan event listenerlarni bitta registry-ga yozib borib, sahifa yopilganda hammasini bitta metod chaqiruvida tozalab yuborish.
* **WeakCache orqali unumdorlik:** Obyektlarni keshlaganda xotirani iflos qilmaslik uchun dynamic \`WeakCache\` yozib borish:
  \`\`\`javascript
  const weakCache = new WeakMap();
  \`\`\`

---

## 10. 📌 Cheat Sheet

| Xususiyat / Muammo | Tavsifi | Yechimi / Profilaktika |
| :--- | :--- | :--- |
| **Stack** | Primitivlar va Call Stack | Avtomat va tezkor |
| **Heap** | Obyektlar, massivlar | GC tomonidan tozalanadi |
| **Mark-and-Sweep** | GC tozalash algoritmi | Root-ga ulanmaganlarni o'chiradi |
| **Accidental Globals** | \`window.leaky = ...\` | Strict mode yoki let/const ishlatish |
| **Detached DOM** | DOM-dan o'chgan, lekin JS-da qolgan el | O'zgaruvchini \`null\` qilish |
| **WeakMap / WeakSet** | Kuchsiz bog'langan keshlar | Obyekt o'chganda kesh ham avtomat o'chadi |
| **Unterminated Timer**| To'xtatilmagan \`setInterval\` | \`clearInterval()\` ishlatish |
`,
  exercises: [
    {
      id: 1,
      title: "Xotira mashqi",
      instruction: "Intervalni to'xtatish orqali xotira oqishining oldini oling.",
      startingCode: "const id = setInterval(() => {}, 1000);\n// Bu yerda to'xtating",
      hint: "clearInterval(id);",
      test: "if (code.includes('clearInterval')) return null; return 'clearInterval ishlatilmadi';"
    },
    {
      id: 2,
      title: "Timeout tozalash",
      instruction: "Xotirani tejash uchun setTimeout taymerini tozalang.",
      startingCode: "const timerId = setTimeout(() => {}, 5000);\n// Bu yerda tozalang",
      hint: "clearTimeout(timerId);",
      test: "if (code.includes('clearTimeout')) return null; return 'clearTimeout ishlatilmadi';"
    },
    {
      id: 3,
      title: "WeakMap yaratish",
      instruction: "'WeakMap' ob'ektini yarating va unga yangi ob'ekt kaliti bilan qiymat qo'shing.",
      startingCode: "const wm = new WeakMap();\nconst keyObj = {};\n// Qiymat qo'shing\n",
      hint: "wm.set(keyObj, 'data');",
      test: "if (code.includes('wm.set') && code.includes('keyObj')) return null; return 'WeakMap-ga keyObj bilan qiymat qo\\'shing';"
    },
    {
      id: 4,
      title: "WeakSet yaratish",
      instruction: "'WeakSet' ob'ektini yarating va unga 'item' ob'ektini qo'shing.",
      startingCode: "const ws = new WeakSet();\nconst item = {};\n// ws ga item ni qo'shing\n",
      hint: "ws.add(item);",
      test: "if (code.includes('ws.add') && code.includes('item')) return null; return 'WeakSet-ga item ni qo\\'shing';"
    },
    {
      id: 5,
      title: "Remove Event Listener",
      instruction: "Xotira oqmasligi uchun 'btn' elementidan 'click' hodisasi uchun 'onClick' listenerini o'chiring.",
      startingCode: "const btn = { removeEventListener: (type, fn) => {} };\nfunction onClick() {}\n// btn dan listenerni o'chiring\n",
      hint: "btn.removeEventListener('click', onClick);",
      test: "if (code.includes('removeEventListener') && code.includes('click')) return null; return 'removeEventListener ishlatilsin';"
    },
    {
      id: 6,
      title: "Nullify Reference",
      instruction: "'largeData' obyektiga bo'lgan bog'liqlikni yo'qotish orqali uni Garbage Collector uchun tayyorlang.",
      startingCode: "let largeData = { payload: new Array(10000) };\n// Bog'liqlikni uzing\n",
      hint: "largeData = null;",
      test: "if (code.includes('largeData = null') || code.includes('largeData=null')) return null; return 'largeData ni null ga tenglang';"
    },
    {
      id: 7,
      title: "Closures memory optimization",
      instruction: "Xotirani ortiqcha band qilmaslik uchun 'getData' funksiyasidan faqat kerakli qiymatni qaytaring (bigData o'zini emas).",
      startingCode: "function getData() {\n  const bigData = { name: 'Ali', details: new Array(1000) };\n  // Faqat name xossasini qaytaruvchi funksiya yozing\n}",
      hint: "const name = bigData.name; return () => name;",
      test: "if (code.includes('bigData.name') && code.includes('return')) return null; return 'Faqat kerakli qismni closure orqali qaytaring';"
    },
    {
      id: 8,
      title: "Array Truncation",
      instruction: "Katta massivni xotiradan bo'shatish uchun uning uzunligini (length) nolga tenglashtiring.",
      startingCode: "const bigArray = [1, 2, 3, 4, 5];\n// Massivni tozalang\n",
      hint: "bigArray.length = 0;",
      test: "if (code.includes('bigArray.length = 0') || code.includes('bigArray.length=0')) return null; return 'Massiv length xossasini 0 qiling';"
    },
    {
      id: 9,
      title: "Memory checking",
      instruction: "Brauzer memory API'sidan 'usedJSHeapSize' xossasini olish kodini yozing.",
      startingCode: "function checkHeap() {\n  // usedJSHeapSize ni qaytaring\n}",
      hint: "return performance.memory ? performance.memory.usedJSHeapSize : 0;",
      test: "if (code.includes('usedJSHeapSize')) return null; return 'usedJSHeapSize xossasidan foydalaning';"
    },
    {
      id: 10,
      title: "Map item deletion",
      instruction: "Oddiy Map ob'ektidan xotirani bo'shatish uchun 'tempKey' kalitini o'chiring.",
      startingCode: "const cache = new Map();\ncache.set('tempKey', 'value');\n// tempKey ni o'chiring\n",
      hint: "cache.delete('tempKey');",
      test: "if (code.includes('cache.delete')) return null; return 'Map-dan kalitni o\\'chiring';"
    },
    {
      id: 11,
      title: "Set element remove",
      instruction: "Set ob'ektidan 'oldUser' elementini o'chirib tashlang.",
      startingCode: "const activeUsers = new Set();\nconst oldUser = { id: 1 };\nactiveUsers.add(oldUser);\n// oldUser ni o'chiring\n",
      hint: "activeUsers.delete(oldUser);",
      test: "if (code.includes('activeUsers.delete')) return null; return 'Set-dan elementni o\\'chiring';"
    },
    {
      id: 12,
      title: "WeakMap delete",
      instruction: "WeakMap ob'ektidan 'session' kalitini o'chiring.",
      startingCode: "const wm = new WeakMap();\nconst session = {};\nwm.set(session, 'active');\n// session ni o'chiring\n",
      hint: "wm.delete(session);",
      test: "if (code.includes('wm.delete')) return null; return 'WeakMap-dan session kalitini o\\'chiring';"
    },
    {
      id: 13,
      title: "EventListener Registry",
      instruction: "Xotira oqishini (memory leak) oldini olish uchun 'EventListenerRegistry' klassini yozing. U 'addEventListener(type, listener)' metodi orqali 'window'ga hodisalarni qo'shishi va ularni ro'yxatga olishi, 'destroy()' metodi chaqirilganda esa barcha ro'yxatdan o'tgan listenerlarni 'window'dan o'chirishi hamda 'listeners' massivini tozalashi kerak.",
      startingCode: "class EventListenerRegistry {\n  constructor() {\n    this.listeners = [];\n  }\n  addEventListener(type, listener) {\n    // window-ga listener qo'shing va registry-ga saqlang\n  }\n  destroy() {\n    // Barcha listenerlarni window-dan o'chiring va massivni tozalang\n  }\n}",
      hint: "addEventListener(type, listener) {\n  window.addEventListener(type, listener);\n  this.listeners.push({ type, listener });\n}\ndestroy() {\n  this.listeners.forEach(({ type, listener }) => window.removeEventListener(type, listener));\n  this.listeners.length = 0;\n}",
      test: "if (code.includes('window.removeEventListener') && code.includes('forEach') && (code.includes('length = 0') || code.includes('length=0') || code.includes('listeners = []') || code.includes('listeners=[]'))) return null;\nreturn 'EventListenerRegistry to\\'g\\'ri amalga oshirilmadi. destroy metodida removeEventListener va registry-ni tozalash tekshirilsin.';"
    },
    {
      id: 14,
      title: "WeakCache tizimi",
      instruction: "Obyekt kalitlariga asoslangan va Garbage Collector ishlashiga xalaqit bermaydigan 'WeakCache' kesh tizimini 'WeakMap' yordamida yozing. U 'has(obj)' (keshda borligini tekshirish), 'get(obj)' (keshdan qiymatni olish), va 'set(obj, value)' (keshga qiymat qo'shish) metodlariga ega bo'lsin.",
      startingCode: "class WeakCache {\n  constructor() {\n    this.cache = new WeakMap();\n  }\n  // has, get, set metodlarini yozing\n}",
      hint: "has(obj) { return this.cache.has(obj); }\nget(obj) { return this.cache.get(obj); }\nset(obj, value) { this.cache.set(obj, value); }",
      test: "if (code.includes('this.cache.has') && code.includes('this.cache.get') && code.includes('this.cache.set')) return null;\nreturn 'WeakCache metodlari (has, get, set) to\\'liq yoki to\\'g\\'ri yozilmadi.';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da Stack va Heap xotira bo'limlarining farqi nima?",
    "options": [
      "Stack-da ibtidoiy (primitive) qiymatlar va Call Stack, Heap-da esa dinamik obyektlar va massivlar saqlanadi",
      "Stack-da faqat rasmlar, Heap-da esa stringlar saqlanadi",
      "Stack asinxron kodlarni, Heap esa sinxron kodlarni saqlaydi",
      "Stack faqat serverda, Heap esa faqat brauzerda mavjud"
    ],
    "correctAnswer": 0,
    "explanation": "Stack xotirasi tezkor va o'lchami oldindan ma'lum bo'lgan primitiv tiplar uchun mo'ljallangan, Heap esa murakkab, dynamic o'lchamli obyekt va massivlar uchun ishlatiladi."
  },
  {
    "id": 2,
    "question": "Garbage Collector (GC) qanday ma'lumotlarni chiqindi deb hisoblaydi va o'chiradi?",
    "options": [
      "Faqat `null` qiymati berilgan har qanday o'zgaruvchini",
      "Global root (window) obyektidan boshlab zanjir bo'yicha yetib borib bo'lmaydigan (unreachable) obyektlarni",
      "Faqat `let` bilan e'lon qilingan o'zgaruvchilarni",
      "Barcha asinxron funksiyalarni"
    ],
    "correctAnswer": 1,
    "explanation": "Hozirgi Garbage Collector (Mark-and-Sweep) global obyektdan ulanmagan va dastur davomida umuman qayta murojaat qilib bo'lmaydigan barcha obyektlarni tozalab beradi."
  },
  {
    "id": 3,
    "question": "Memory Leak (Xotira oqishi) deganda nima tushuniladi?",
    "options": [
      "Kompyuter xotirasining jismoniy shikastlanishi",
      "Dasturga umuman kerak bo'lmagan, lekin JS-dagi bog'lanishlar (references) sababli GC o'chira olmayotgan xotira bo'laklari",
      "Ma'lumotlarning fayl tizimiga avtomatik yozilishi",
      "Internet tezligining pasayishi"
    ],
    "correctAnswer": 1,
    "explanation": "Xotira oqishi - bu foydalanilmayotgan obyektlarga koddagi qandaydir havola (masalan, global o'zgaruvchi yoki interval) saqlanib qolgani sababli xotiraning bo'shamasligidir."
  },
  {
    "id": 4,
    "question": "To'xtatilmagan `setInterval` nima sababdan memory leak-ni keltirib chiqaradi?",
    "options": [
      "CPU haroratini oshirib yuborgani uchun",
      "Interval to'xtatilmaguncha uning callback funksiyasi ichida ishlatilgan barcha o'zgaruvchi va obyektlarni xotirada kuchli ushlab turishi tufayli",
      "Faqat brauzerni qotirgani uchun",
      "U global scope-ni butunlay tozalab tashlashi tufayli"
    ],
    "correctAnswer": 1,
    "explanation": "Interval faol ekan, uning lexical scope-dagi barcha o'zgaruvchilar GC uchun 'ishlatilayotgan' (active) hisoblanadi va xotiradan o'chmaydi."
  },
  {
    "id": 5,
    "question": "WeakMap va WeakSet-larning oddiy Map va Set-dan asosiy farqi nimada?",
    "options": [
      "Ular qiymatlarni siqib saqlaydi",
      "Ulardagi obyektlarga bo'lgan havolalar kuchsiz (weak reference) bo'lib, o'sha obyektga tashqi havola qolmaganda GC tomonidan avtomatik tozalanishiga to'sqinlik qilmaydi",
      "Ular faqat string ma'lumotlarni saqlaydi",
      "Ular sekinroq ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "WeakMap/WeakSet-dagi obyektlar kuchsiz bog'lanadi. Agar o'sha obyekt boshqa hech qaysi o'zgaruvchida qolmasa, kesh uni majburan ushlab qololmaydi va xotira avtomat tozalanadi."
  },
  {
    "id": 6,
    "question": "Heap xotiradagi obyektga bog'langan barcha o'zgaruvchilar null bo'lsa yoki scope-dan chiqsa nima sodir bo'ladi?",
    "options": [
      "U obyekt stack xotirasiga o'tadi",
      "U obyekt Garbage Collector tomonidan tozalashga tayyor holga keladi",
      "Brauzer crash bo'ladi",
      "TypeError xatosi chiqadi"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektga ko'rsatib turgan barcha havolalar yo'qolganda, u global root-dan uzilgan hisoblanadi va GC uning xotirasini bo'shatadi."
  },
  {
    "id": 7,
    "question": "Chrome DevTools-da xotira oqishlarini tekshirish va snapshot olish uchun qaysi bo'lim ishlatiladi?",
    "options": [
      "Elements",
      "Console",
      "Memory",
      "Application"
    ],
    "correctAnswer": 2,
    "explanation": "DevTools 'Memory' bo'limida foydalanuvchilar Heap Snapshot olishi, Allocation Timeline ko'rishi va xotira sarfini chuqur tahlil qilishi mumkin."
  },
  {
    "id": 8,
    "question": "Detached DOM Elements (Ajralgan DOM elementlari) nima?",
    "options": [
      "Hech qanday CSS-ga ega bo'lmagan elementlar",
      "DOM daraxtidan (sahifadan) o'chirilgan, lekin JavaScript-dagi biror o'zgaruvchida reference saqlanib qolgani sababli xotirada yashashda davom etayotgan elementlar",
      "Mobil brauzerlarda ko'rinmaydigan div-lar",
      "Dynamic iframe-lar"
    ],
    "correctAnswer": 1,
    "explanation": "Sahifadan o'chirilgan bo'lsa ham koddagi JS o'zgaruvchisi elementni xotirada kuchli ushlab qoladi. Buni tozalash uchun o'sha o'zgaruvchiga `null` qiymat berish kerak."
  },
  {
    "id": 9,
    "question": "Massiv elementlarini tozalashda xotira boshqaruvi jihatidan eng to'g'ri va xavfsiz usul qaysi?",
    "options": [
      "arr = [] (yangidan yaratish)",
      "arr.length = 0 (massivning o'zini ichidan tozalash)",
      "arr = null (butunlay yo'q qilish)",
      "delete arr"
    ],
    "correctAnswer": 1,
    "explanation": "`arr.length = 0` massivning xotiradagi joriy obyektini saqlab qolib, uning barcha elementlarini o'chiradi. Bu massivga boshqa joyda havola bo'lsa ham barcha elementlar tozalanishini kafolatlaydi."
  },
  {
    "id": 10,
    "question": "Brauzerda dastur joriy ishlatayotgan JS Heap hajmini dynamic o'qish imkonini beruvchi API xossasi qaysi?",
    "options": [
      "performance.memory.usedJSHeapSize",
      "window.getMemoryUsage()",
      "navigator.heapSize",
      "document.memory"
    ],
    "correctAnswer": 0,
    "explanation": "`performance.memory.usedJSHeapSize` xossasi dasturimiz xotirada egallab turgan faol baytlar miqdorini qaytaradi."
  },
  {
    "id": 11,
    "question": "Circular Reference (aylanma havola) deganda nima tushuniladi?",
    "options": [
      "Funksiyaning o'zini o'zi cheksiz chaqirishi",
      "Ikki yoki undan ortiq obyektlarning bir-biriga havola (reference) qilib, yopiq zanjir hosil qilishi",
      "Sinflarning vorislik zanjiri",
      "Kodning cheksiz loop-ga tushib qolishi"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektlarning bir-biriga bog'lanib qolishi. Zamonaviy 'Mark-and-Sweep' algoritmi root-dan uzilgan bo'lsa, circular reference-ga ega bo'lgan butun guruhni osongina tozalay oladi."
  },
  {
    "id": 12,
    "question": "Nima uchun global o'zgaruvchilarni iloji boricha kamroq ishlatish tavsiya etiladi?",
    "options": [
      "Chunki ular faqat HTTPS-da ishlaydi",
      "Chunki global o'zgaruvchilar global root (window) obyektiga bog'langan bo'lib, sahifa ochiq turguncha xotiradan umuman o'chmaydi va leak xavfini oshiradi",
      "Ular har doim string turida bo'ladi",
      "Chunki ularni o'qib bo'lmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Global o'zgaruvchilar doimo global root-ga ulanib turgani sababli Garbage Collector ularni chiqindi sifatida hech qachon o'chirmaydi, bu esa xotira oqishi xavfini sezilarli darajada oshiradi."
  }
]

};

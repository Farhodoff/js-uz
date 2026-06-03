export const memoryManagement = {
  id: "memory-management",
  title: "Memory Management (Xotira boshqaruvi)",
  level: "Murakkab",
  description: "JavaScript xotirani qanday boshqaradi va 'Memory Leak' (Xotira oqishi) nima?",
  theory: `## 1. NEGA kerak?
Dastur qancha ko'p xotira (RAM) ishlatsa, u shunchalik sekinlashadi va oxir-oqibat brauzer uni butunlay o'chirib qo'yishi ("Out of Memory" xatosi) mumkin. JavaScript-da xotira boshqaruvi avtomatlashtirilgan bo'lsa-da, katta yuklamali dasturlarda xotira qanday taqsimlanishini va tozalanishini bilmaslik xavfli "Memory Leak" (xotira oqishi) muammosini keltirib chiqaradi.

## 2. SODDALIK (Analogiya)
Buni **ijaraga olingan kvartira** deb tasavvur qiling:
1. **Allocation (Ajratish):** Kvartiraga ko'chib kirasiz va jihozlarni joylashtirasiz (Xotira ajratiladi).
2. **Usage (Ishlatish):** Jihozlardan foydalanasiz.
3. **Release (Bo'shatish):** Kvartiradan butunlay ko'chib ketasiz va kalitlarni topshirasiz.
Agar siz ko'chib ketsangiz-u, lekin kalitni topshirmasangiz yoki uyni bo'shatmasangiz, u xonadon band bo'lib qolaveradi. Bu — **Memory Leak**.

## 3. STRUKTURA VA XOTIRA TAYANCHI
JavaScript xotira boshqaruvi quyidagi qismlardan iborat:
- **Stack (Stek):** Ibtidoiy (primitive) qiymatlar va funksiya chaqirilish stacklari (Call Stack) tezkor saqlanadigan xotira. U qat'iy va o'zgarmas o'lchamga ega bo'ladi.
- **Heap (Xip):** Dinamik va o'lchami oldindan ma'lum bo'lmagan katta hajmdagi ma'lumotlar (obyektlar, massivlar, funksiyalar) saqlanadigan xotira havzasi.
- **Garbage Collector (GC):** Ishlatilmayotgan (Root obyektidan zanjir uzilgan) xotira bo'laklarini avtomatik tozalovchi motor. U **Mark-and-Sweep** algoritmidan foydalanadi.

### Mark-and-Sweep algoritmining bosqichlari:
1. **Marking (Belgilash):** Dvigatel barcha "root" (global obyekt, joriy funksiya scope-i) obyektlarni aniqlaydi va ulardan zanjir bo'yicha bog'langan barcha obyektlarni faol deb belgilaydi.
2. **Sweeping (Tozalash):** Belgilanmagan, ya'ni root-dan boshlab yetib borish imkoni bo'lmagan (unreachable) barcha obyektlar xotiradan o'chiriladi.

\`\`\`mermaid
graph TD
    %% Styling
    classDef rootStyle fill:#e74c3c,stroke:#fff,stroke-width:2px,color:#fff;
    classDef activeStyle fill:#2ecc71,stroke:#fff,stroke-width:2px,color:#fff;
    classDef deadStyle fill:#95a5a6,stroke:#333,stroke-width:1px,color:#fff,stroke-dasharray: 5 5;

    Root[Global Object / Root]:::rootStyle
    
    Root --> ObjA[Object A: Active]:::activeStyle
    Root --> ObjB[Object B: Active]:::activeStyle
    
    ObjA --> ObjC[Object C: Active]:::activeStyle
    ObjC --> ObjD[Object D: Active]:::activeStyle
    
    ObjE[Object E: Unreachable]:::deadStyle
    ObjF[Object F: Unreachable]:::deadStyle
    ObjE --> ObjF
\`\`\`

## 4. MEMORY LEAKS (XOTIRA OQISHLARI) VA AMALIYOT
Dasturda eng ko'p xotira oqishini keltirib chiqaradigan 4 ta asosiy sabab:

### A. Tasodifiy global o'zgaruvchilar
Agar o'zgaruvchi \`var\`, \`let\`, yoki \`const\` kalit so'zlarisiz e'lon qilinsa, u avtomatik global \`window\` obyektiga bog'lanib qoladi va sahifa ochiq turguncha xotiradan o'chmaydi.
\`\`\`javascript
function createGlobal() {
  leakyVar = new Array(1000000); // window.leakyVar bo'lib qoladi
}
\`\`\`

### B. Unutilgan taymerlar va intervallar
Agar \`setInterval\` yoki \`setTimeout\` to'xtatilmasa, ularning ichidagi callback funksiya va unda ishlangan o'zgaruvchilar xotirada qolaveradi.
\`\`\`javascript
const data = getData();
const id = setInterval(() => {
  // data ishlatilyapti
  console.log(data);
}, 1000);
// Agar clearInterval(id) qilinmasa, data hech qachon tozalanmaydi
\`\`\`

### C. Ajralgan DOM elementlari (Detached DOM Elements)
DOM daraxtidan o'chirilgan, lekin JavaScript kodi ichida o'zgaruvchi sifatida saqlanib qolgan elementlar xotirani band qilaveradi.
\`\`\`javascript
let button = document.getElementById('btn');
document.body.removeChild(button);
// button o'zgaruvchisi hali ham mavjud bo'lsa, tugma xotiradan o'chmaydi (Detached DOM)
button = null; // To'liq tozalash uchun
\`\`\`

### D. Kuchsiz havolalar (Weak References) keshlar uchun
Oddiy \`Map\` yoki \`Set\` kalitlarni o'zida kuchli (strong) ushlab qoladi. Kalit bo'lgan obyekt tashqaridan o'chirilsa ham, Map keshidan o'chmaydi. Bu muammoni \`WeakMap\` va \`WeakSet\` hal qiladi.

\`\`\`mermaid
graph LR
    subgraph Map_Behavior ["Map xotirada ushlab qolishi"]
        MapInstance["Map Instance"]
        MapObjKey["Key Object"]
        MapObjValue["Value Object"]
        
        MapInstance -.->|Strong Reference| MapObjKey
        MapInstance --> MapObjValue
    end
    
    subgraph WeakMap_Behavior ["WeakMap avtomatik tozalashi"]
        WMInstance["WeakMap Instance"]
        WMObjKey["Key Object"]
        WMObjValue["Value Object"]
        
        WMInstance -.->|Weak Reference| WMObjKey
        WMInstance --> WMObjValue
    end
\`\`\`

## 5. SAVOLLAR VA JAVOBLAR
**1. Mark-and-Sweep algoritmi nima?**
Garbage collector global obyekt (root) dan boshlab barcha obyektlarni ko'zdan kechiradi (mark), yetib bo'lmaydigan obyektlarni esa o'chirib tashlaydi (sweep).

**2. WeakMap oddiy Map dan xotira jihatidan nimasi bilan farq qiladi?**
WeakMap-dagi obyekt-kalitlar kuchsiz bog'langan (weak references) bo'ladi. Agar u obyektga tashqarida boshqa bog'liqlik qolmasa, u avtomat ravishda xotiradan tozalab yuboriladi.

**3. Memory leak-ni brauzerda qanday topsa bo'ladi?**
Chrome DevTools panelining "Memory" bo'limida "Heap Snapshot" (xotira nusxasi) olish orqali xotira o'sishini tahlil qilish mumkin.
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
      id: 1,
      question: "JavaScript'da \"Stack\" va \"Heap\" xotira qismlari o'rtasidagi farq nima?",
      options: [
        "Stack'da o'zgarmas oddiy qiymatlar (primitives) va funksiya chaqiruvlari, Heap'da esa dinamik hajmli obyektlar va massivlar saqlanadi",
        "Stack'da faqat rasmlar, Heap'da esa matnlar saqlanadi",
        "Stack sekin ishlaydi, Heap esa juda tez ishlaydi",
        "Ikkalasi ham bir xil xotira turi, hech qanday farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "Stack xotirasi kichik va tezkor bo'lib, ibtidoiy qiymatlar va joriy chaqiruv kontekstini saqlaydi. Heap esa katta va dinamik bo'lib, murakkab obyektlar va massivlarni saqlashga xizmat qiladi."
    },
    {
      id: 2,
      question: "Garbage Collector (Chiqindi yig'uvchi) qanday ishlaydi?",
      options: [
        "Faqat server yopilganda barcha ma'lumotlarni o'chiradi",
        "Dasturdagi boshlang'ich nuqtadan (Root) boshlab zanjir bo'ylab yetib bo'lmaydigan (unreachable) bo'lib qolgan obyektlarni aniqlaydi va xotiradan tozalaydi",
        "Faqat `null` qilingan o'zgaruvchilarni qidiradi",
        "Koddagi barcha izohlarni o'chirib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Zamonaviy Garbage Collector (asosan Mark-and-Sweep algoritmi) global obyektdan (Root) boshlab barcha obyektlarni tekshiradi. Root'ga ulanmagan va unga yetib borish imkoni bo'lmagan obyektlar chiqindi deb hisoblanadi."
    },
    {
      id: 3,
      question: "\"Memory Leak\" (Xotira oqishi) deganda nima tushuniladi?",
      options: [
        "Kompyuter xotirasining jismoniy shikastlanishi",
        "Dasturda ishlatilmayotgan, lekin koddagi reference (bog'liqlik) tufayli Garbage Collector tomonidan o'chirilmasdan xotirani band qilib turgan ma'lumotlar",
        "Xotiradagi ma'lumotlarni faylga yozib olish",
        "Sinxron kodlarning bajarilish tartibi buzilishi"
      ],
      correctAnswer: 1,
      explanation: "Xotira oqishi - bu dasturda kerak bo'lmagan ma'lumotlarga qandaydir reference saqlanib qolgani sababli xotiraning bo'shamasligi va natijada RAM keraksiz band bo'lishidir."
    },
    {
      id: 4,
      question: "Unutilgan va to'xtatilmagan `setInterval` qanday qibly memory leak'ka sabab bo'ladi?",
      options: [
        "Chunki uning CPU harorati oshadi",
        "Chunki interval to'xtatilmagunicha uning callback funksiyasi ichida ishlatilgan barcha o'zgaruvchilar va obyektlar xotirada ushlab turiladi",
        "Interval faqat 404 xatosi beradi",
        "Interval faqat global o'zgaruvchilarni o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "To'xtatilmagan interval doimiy ishlayveradi va u faol bo'lgani sababli uning lexical scope'idagi barcha o'zgaruvchilar Garbage Collector tomonidan tozalab tashlanmaydi."
    },
    {
      id: 5,
      question: "`WeakMap` va `WeakSet` obyektlarining an'anaviy `Map` va `Set` obyektlaridan xotira boshqaruvi bo'yicha asosiy afzalligi nima?",
      options: [
        "Ular ma'lumotlarni siqib saqlaydi",
        "Ulardagi obyektlar kuchsiz bog'langan bo'lib, boshqa hech qanday reference qolmasa avtomatik tarzda xotiradan tozalanishiga to'sqinlik qilmaydi",
        "Ular tezroq ishlaydi",
        "Ular faqat string qiymatlarni qabul qiladi"
      ],
      correctAnswer: 1,
      explanation: "`WeakMap`/`WeakSet` tarkibidagi kalit obyektlarga faqat kuchsiz bog'liqlik (weak reference) bo'ladi. Agar o'sha kalit obyekt boshqa joyda o'chirilsa, map/set uni ushlab qololmaydi va xotira tozalanadi."
    },
    {
      id: 6,
      question: "Heap xotirasidagi obyektga ko'rsatib turgan barcha reference (havolalar) o'chsa (null bo'lsa), u obyekt bilan nima sodir bo'ladi?",
      options: [
        "U stack xotirasiga o'tadi",
        "U Garbage Collector uchun tozalashga tayyor (eligible) holga keladi",
        "Obyekt avtomatik fayl tizimiga yoziladi",
        "TypeError xatoligi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Agar obyektga olib boruvchi barcha havolalar uzilsa, u global root-dan uzilgan hisoblanadi va Garbage Collectorning navbatdagi tozalash tsiklida xotiradan butunlay o'chiriladi."
    },
    {
      id: 7,
      question: "Chrome DevTools-da dasturning xotira nusxasini (Heap Snapshot) olish va uning xotira sarfini tahlil qilish uchun qaysi bo'lim ishlatiladi?",
      options: [
        "Elements",
        "Console",
        "Memory (Profiler)",
        "Application"
      ],
      correctAnswer: 2,
      explanation: "Chrome DevTools-dagi 'Memory' (yoki eski nomi 'Profiler') bo'limi heap xotirasi holatini suratga olish (snapshot), xotira oqishlarini aniqlash va xotira profilini yaratish uchun maxsus xizmat qiladi."
    },
    {
      id: 8,
      question: "Ikki yoki undan ortiq obyektlar bir-biriga havola qilib, yopiq tsikl hosil qilsa, bu holat nima deb ataladi?",
      options: [
        "Circular Reference (Siklik havola)",
        "Memory Pipeline",
        "Stack Overflow",
        "Infinite Loop"
      ],
      correctAnswer: 0,
      explanation: "Circular reference — obyektlarning bir-biriga bog'lanib qolishi. Zamonaviy 'Mark-and-Sweep' algoritmi buni oson bartaraf etadi, ammo eski reference counting algoritmi bo'lgan dvigatellarda bu katta xotira oqishiga sabab bo'lgan."
    },
    {
      id: 9,
      question: "WeakMap ob'ektida kalit (Key) sifatida qanday ma'lumot turidan foydalanish shart?",
      options: [
        "Faqat String",
        "Faqat Obyekt (Object)",
        "Faqat Number",
        "Istalgan primitiv tur"
      ],
      correctAnswer: 1,
      explanation: "WeakMap-da kalit faqat Obyekt (va ba'zi brauzerlarda Symbollar) bo'lishi mumkin. Chunki primitiv turlar ustida 'kuchsiz havola' (weak reference) tushunchasi mavjud emas."
    },
    {
      id: 10,
      question: "JavaScriptda asosan qaysi turdagi ma'lumotlar dinamik ravishda Heap xotirada joy ajratadi?",
      options: [
        "Faqat Number va Boolean",
        "Obyektlar, massivlar va funksiyalar",
        "Undefined va Null",
        "Faqat qisqa stringlar"
      ],
      correctAnswer: 1,
      explanation: "Dinamik hajmli ma'lumotlar, ya'ni obyektga asoslangan barcha ma'lumot turlari (massiv, funksiya, ob'ektlar) Heap xotirasida saqlanadi."
    },
    {
      id: 11,
      question: "Brauzer muhitida ishlaydigan JavaScript dasturida har doim eng asosiy ota obyekt ('Root') bo'lib qaysi obyekt hisoblanadi?",
      options: [
        "`document`",
        "`window`",
        "`global`",
        "`process`"
      ],
      correctAnswer: 1,
      explanation: "Brauzerda global scope `window` obyekti hisoblanadi. Garbage Collector barcha bog'liqliklarni `window`dan boshlab tekshiradi."
    },
    {
      id: 12,
      question: "Tasodifan yaratilgan global o'zgaruvchilar nima sababdan memory leak'ka olib kelishi mumkin?",
      options: [
        "Ular doimo stack xotirasida qoladi",
        "Chunki ular global `window` obyektiga birikib qoladi va sahifa yopilmaguncha Garbage Collector ularni o'chira olmaydi",
        "Chunki global o'zgaruvchilar CPU ish faoliyatini sekinlashtiradi",
        "Ular o'z-o'zidan null bo'lib qoladi"
      ],
      correctAnswer: 1,
      explanation: "Global o'zgaruvchilar doimo global root ob'ektiga bog'langan bo'ladi. Ular faqat sahifa qayta yuklanganda yoki dasturchi ularni qo'lda `null` qilganda / o'chirgandagina xotiradan bo'shaydi."
    },
    {
      id: 13,
      question: "JavaScript Garbage Collector ishlash vaqtida qaysi holatda circular reference (siklik havola) muammosidan qochadi?",
      options: [
        "Mark-and-Sweep algoritmidan foydalanganda, chunki root-dan bog'lanmagan sikllar to'liq o'chiriladi",
        "Hech qachon qocholmaydi, xotira oqishi yuzaga keladi",
        "Reference counting algoritmi faqat yangi brauzerlarda qo'llanilganda",
        "Faqat `const` ishlatilganda"
      ],
      correctAnswer: 0,
      explanation: "Eski Reference Counting algoritmi circular reference obyektlarini xotirada ushlab qolar edi. Ammo zamonaviy Mark-and-Sweep algoritmi root-dan boshlab yetib borib bo'lmasligiga tayanadi, shuning uchun siklik bog'lanib qolgan lekin root-dan uzilgan obyektlar guruhini osongina o'chirib yuboradi."
    },
    {
      id: 14,
      question: "DOM-dan remove() qilingan elementni JavaScript o'zgaruvchisida saqlab qolish xotira boshqaruvida nima deb ataladi?",
      options: [
        "Detached DOM Elements (Ajralgan DOM elementlari)",
        "Garbage Reference",
        "Active Node reference",
        "Circular DOM"
      ],
      correctAnswer: 0,
      explanation: "DOM daraxtidan o'chirilgan, lekin koddagi o'zgaruvchi orqali unga reference saqlanib qolgan obyekt 'Detached DOM' deyiladi. Xotirani bo'shatish uchun ushbu o'zgaruvchini ham null qilish yoki scope-dan chiqarish lozim."
    }
  ]
};

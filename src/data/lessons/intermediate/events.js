export const events = {
  id: "events",
  title: "Hodisalar (Events)",
  level: "O'rta daraja",
  description: "Foydalanuvchi harakatlarini (klik, yozish, yuborish) JS orqali boshqarish.",
  theory: `## 1. NEGA kerak?

Saytingiz "jonli" bo'lishi va foydalanuvchi bilan muloqot qilishi uchun hodisalar (events) zarurdir. Foydalanuvchi tugmani bosganda, matn kiritganda, sahifani aylantirganda (scroll) yoki formani yuborganda, JavaScript buni sezishi va mos javob qaytarishi kerak. Eventsiz veb-sahifa xuddi harakatsiz, o'lik qog'oz varag'iga o'xshaydi.

## 2. SODDALIK (Analogiya)

Uydagi chiroq tugmasini (vyklyuchatel) tasavvur qiling:
- **Tugma:** HTML elementi (button).
- **Siz uni bosishingiz:** Hodisa (Event - 'click').
- **Chiroqning yonishi:** Hodisa sodir bo'lganda ishga tushadigan harakat (Callback funksiya).

Yoki telefoningizga qo'ng'iroq bo'lishi (event) va siz unga javob berib gaplashishingiz (callback).

## 3. STRUKTURA

### A. addEventListener
Modern JavaScript-da elementga hodisa tinglovchisini biriktirish uchun \`addEventListener\` metodidan foydalaniladi:
\`\`\`javascript
const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  console.log("Tugma bosildi!");
});
\`\`\`

### B. Event Obyekti (event / e)
Har bir hodisa sodir bo'lganda, brauzer uning barcha tafsilotlarini o'z ichiga olgan maxsus obyektni yaratadi va uni callback funksiyaga birinchi argument sifatida uzatadi:
\`\`\`javascript
btn.addEventListener("click", (e) => {
  console.log(e.target);        // Hodisa yuz bergan aniq element
  console.log(e.type);          // Hodisa turi (masalan, "click")
  e.preventDefault();           // Brauzerning standart harakatini bekor qilish
});
\`\`\`

### C. Event Bubbling va Capturing (Hodisalarning tarqalishi)
Hodisa sodir bo'lganda, u DOM daraxti bo'ylab uchta bosqichda tarqaladi:
1. **Capturing (Tutib olish):** Hodisa yuqoridan pastga (window -> document -> body -> target) qarab yo'naladi.
2. **Target (Maqsad):** Hodisa maqsad qilingan (bosilgan) elementga yetib boradi va uning listener'lari ishlaydi.
3. **Bubbling (Ko'pirib chiqish):** Hodisa pastdan yuqoriga (target -> body -> document -> window) qarab ko'tariladi.

Sukut bo'yicha barcha event listener'lar **Bubbling** bosqichida ishlaydi. Uni to'xtatish uchun \`e.stopPropagation()\` ishlatiladi.

Capturing bosqichida eshitish uchun uchinchi argument \`true\` qilib belgilanadi:
\`\`\`javascript
element.addEventListener("click", handler, true); // capturing bosqichida ishlaydi
\`\`\`

### D. Event Delegation (Hodisalarni delegatsiya qilish)
Agar sizda juda ko'p o'xshash elementlar bo'lsa (masalan, ro'yxatdagi 100 ta \`li\`), har biriga alohida listener ulab chiqish o'rniga, ularning umumiy ota elementiga bitta listener ulab, \`e.target\` orqali qaysi bola bosilganini aniqlash mumkin:
\`\`\`javascript
const list = document.querySelector("ul");
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Bosilgan element matni:", e.target.textContent);
  }
});
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Funksiyani darhol chaqirib yuborish:**
   \`\`\`javascript
   // XATO:
   btn.addEventListener("click", showMessage()); // showMessage darhol ishlaydi
   // TO'G'RI:
   btn.addEventListener("click", showMessage);
   \`\`\`

2. **Event nomiga "on" qo'shib yuborish:**
   \`\`\`javascript
   // XATO:
   btn.addEventListener("onclick", handler);
   // TO'G'RI:
   btn.addEventListener("click", handler);
   \`\`\`

3. **Anonim funksiyani removeEventListener bilan o'chirmoqchi bo'lish:**
   \`\`\`javascript
   // XATO: (O'chmaydi, chunki ular xotirada boshqa-boshqa funksiyalar)
   btn.addEventListener("click", () => console.log(1));
   btn.removeEventListener("click", () => console.log(1));
   \`\`\`

## 5. AMALIYOT (Mashqlar)

## 6. SAVOLLAR VA JAVOBLAR

**1. Event nima?**
Event (hodisa) — bu foydalanuvchi yoki brauzer tomonidan amalga oshiriladigan va JavaScript tomonidan boshqarilishi mumkin bo'lgan harakatdir (klik, klaviaturadan yozish va h.k.).

**2. addEventListener ning afzalligi nima?**
U bitta elementga bir nechta har xil yoki bir xil hodisa tinglovchilarini ulash imkonini beradi va hodisalarni boshqarishni ancha moslashuvchan qiladi.

**3. preventDefault() nima uchun ishlatiladi?**
Brauzerning standart xatti-harakatlarini (masalan, formadagi submit sahifani yangilashi yoki ssilkaga bosilganda boshqa sahifaga o'tishni) bekor qilish uchun.

**4. event.target va event.currentTarget farqi nima?**
target — hodisa aynan qaysi element ustida sodir bo'lganini ko'rsatadi. currentTarget — joriy event listener qaysi elementga ulab eshitilayotgan bo'lsa, o'sha elementni qaytaradi.

**5. Event Bubbling nima?**
Hodisa maqsadli elementda yuz berib bo'lgach, asta-sekin DOM daraxti bo'ylab eng yuqori ota-element (window)gacha ko'tarilish jarayonidir.

**6. Event Capturing nima?**
Bubbling'ning teskarisi: hodisaning eng yuqori elementdan boshlanib pastga, ya'ni hodisa sodir bo'lgan maqsadli elementga (target) qarab harakatlanish bosqichidir.

**7. e.stopPropagation() nima qiladi?**
Hodisaning ota elementlarga qarab yuqoriga tarqalishini (bubbling) butunlay to'xtatadi.

**8. Event Delegation nima va nima uchun kerak?**
Yuzlab bolalar uchun alohida listener ulamasdan, ularning bitta umumiy ota elementiga listener ulab, xotirani tejash va dinamik yangi qo'shiladigan elementlarni ham nazorat qilish usulidir.

**9. Qanday qidelib event listener faqat bir marta ishlashini ta'minlash mumkin?**
addEventListener uchinchi argumentiga \`{ once: true }\` obyektini berish orqali.

**10. removeEventListener qanday to'g'ri qo'llaniladi?**
O'chirilayotgan event turi va qo'shilgan paytdagi funksiya havolasi (nomli funksiya) ko'rsatilishi kerak.

**11. DOMContentLoaded va load hodisalari farqi nima?**
DOMContentLoaded faqat HTML va DOM daraxti yuklanganda ishga tushadi, load esa stillar, rasmlar va boshqa barcha resurslar to'liq yuklangandan so'ng ishlaydi.

**12. Keydown va keyup farqi nima?**
Keydown klaviaturadagi tugma bosilgan zahoti ishlaydi, keyup esa tugma qo'yib yuborilganda ishga tushadi.`,
  exercises: [
    {
      id: 1,
      title: "Click Event",
      instruction: "Berilgan 'btn' obyektiga 'click' eventini qo'shing va u bosilganda consolega 'OK' chiqaring.",
      startingCode: "const btn = { addEventListener: (type, cb) => btn.click = cb }; // Mock\n// Bu yerga yozing\n",
      hint: "btn.addEventListener('click', () => console.log('OK'));",
      test: "if (typeof btn.click === 'function') { btn.click(); if (logs.includes('OK')) return null; } return 'Consolega OK chiqmadi';"
    },
    {
      id: 2,
      title: "Input Event",
      instruction: "Inputga biror narsa yozilganda uning qiymatini (value) konsolga chiqaring.",
      startingCode: "const input = { value: 'test', addEventListener: (type, cb) => input.oninput = cb };\n// Bu yerga yozing\n",
      hint: "input.addEventListener('input', (e) => console.log(e.target.value));",
      test: "if (typeof input.oninput === 'function') { input.oninput({target: input}); if (logs.includes('test')) return null; } return 'Input qiymati chiqmadi';"
    },
    {
      id: 3,
      title: "Prevent Default",
      instruction: "Eventning standart harakatini to'xtatuvchi metodni chaqiring.",
      startingCode: "const event = { preventDefault: () => event.stopped = true };\nfunction handler(e) {\n  // Bu yerga yozing\n}\nhandler(event);",
      hint: "e.preventDefault();",
      test: "if (event.stopped) return null; return 'preventDefault() chaqirilmadi';"
    },
    {
      id: 4,
      title: "Double Click",
      instruction: "'img' elementiga ikki marta bosilganda (dblclick) 'Rasm' so'zini chiqaring.",
      startingCode: "const img = { addEventListener: (type, cb) => img.ondblclick = cb };\n// Bu yerga yozing\n",
      hint: "img.addEventListener('dblclick', () => console.log('Rasm'));",
      test: "if (typeof img.ondblclick === 'function') { img.ondblclick(); if (logs.includes('Rasm')) return null; } return 'Double click ishlamadi';"
    },
    {
      id: 5,
      title: "Remove Event Listener",
      instruction: "'btn' elementiga ulangan 'handler' event listenerini o'chirib tashlang.",
      startingCode: "const btn = { addEventListener: (type, cb) => btn.click = cb, removeEventListener: (type, cb) => btn.click = null };\nconst handler = () => console.log('Click');\nbtn.addEventListener('click', handler);\n\n// Bu yerga yozing - handler'ni o'chiring\n",
      hint: "btn.removeEventListener('click', handler);",
      test: "if (btn.click === null) return null; return 'removeEventListener orqali handler\\'ni o\\'chiring';"
    },
    {
      id: 6,
      title: "Mouse Over Event",
      instruction: "'box' elementiga sichqoncha yaqinlashganda (mouseover) konsolga 'Hover' deb chiqaring.",
      startingCode: "const box = { addEventListener: (type, cb) => box.onmouseover = cb };\n// Bu yerga yozing\n",
      hint: "box.addEventListener('mouseover', () => console.log('Hover'));",
      test: "if (typeof box.onmouseover === 'function') { box.onmouseover(); if (logs.includes('Hover')) return null; } return 'mouseover hodisasini to\\'g\\'ri sozlang';"
    },
    {
      id: 7,
      title: "Stop Propagation",
      instruction: "Event handler ichida event bubbling tarqalishini to'xtatuvchi metodni chaqiring.",
      startingCode: "const event = { stopPropagation: () => event.stopped = true };\nfunction handler(e) {\n  // Bu yerga yozing\n}\nhandler(event);",
      hint: "e.stopPropagation();",
      test: "if (event.stopped) return null; return 'stopPropagation() chaqirilmadi';"
    },
    {
      id: 8,
      title: "Keydown Event",
      instruction: "'input' elementida tugma bosilganda (keydown), agar u 'Enter' tugmasi bo'lsa, konsolga 'Enter bosildi' deb yozing.",
      startingCode: "const input = { addEventListener: (type, cb) => input.onkeydown = cb };\n// Bu yerga yozing\n",
      hint: "input.addEventListener('keydown', (e) => { if (e.key === 'Enter') console.log('Enter bosildi'); });",
      test: "if (typeof input.onkeydown === 'function') { input.onkeydown({ key: 'Enter' }); if (logs.includes('Enter bosildi')) return null; } return 'Keydown hodisasida Enter\\'ni tekshiring';"
    },
    {
      id: 9,
      title: "Event Delegation",
      instruction: "Ota element 'parent'ga click listener qo'shing. Agar bosilgan elementning klassida 'item' bo'lsa, uning textContent qiymatini konsolga chiqaring.",
      startingCode: "const parent = { addEventListener: (type, cb) => parent.click = cb };\n// Bu yerga yozing\n",
      hint: "parent.addEventListener('click', (e) => { if (e.target.classList.contains('item')) console.log(e.target.textContent); });",
      test: "if (typeof parent.click === 'function') { parent.click({ target: { classList: { contains: (c) => c === 'item' }, textContent: 'salom' } }); if (logs.includes('salom')) return null; } return 'Event delegation to\\'g\\'ri sozlanmadi';"
    },
    {
      id: 10,
      title: "Change Event",
      instruction: "'select' elementining tanlangan qiymati o'zgarganda (change), uning qiymatini (value) konsolga chiqaring.",
      startingCode: "const select = { value: 'uz', addEventListener: (type, cb) => select.onchange = cb };\n// Bu yerga yozing\n",
      hint: "select.addEventListener('change', (e) => console.log(e.target.value));",
      test: "if (typeof select.onchange === 'function') { select.onchange({ target: select }); if (logs.includes('uz')) return null; } return 'change hodisasini to\\'g\\'ri sozlang';"
    },
    {
      id: 11,
      title: "Focus Event",
      instruction: "'input' elementiga fokus berilganda (focus), konsolga 'Focused' deb yozing.",
      startingCode: "const input = { addEventListener: (type, cb) => input.onfocus = cb };\n// Bu yerga yozing\n",
      hint: "input.addEventListener('focus', () => console.log('Focused'));",
      test: "if (typeof input.onfocus === 'function') { input.onfocus(); if (logs.includes('Focused')) return null; } return 'focus hodisasini to\\'g\\'ri sozlang';"
    },
    {
      id: 12,
      title: "DOMContentLoaded",
      instruction: "'doc' elementiga 'DOMContentLoaded' eventini qo'shing va u sodir bo'lganda 'DOM ready' so'zini konsolga chiqaring.",
      startingCode: "const doc = { addEventListener: (type, cb) => doc.onload = cb };\n// Bu yerga yozing\n",
      hint: "doc.addEventListener('DOMContentLoaded', () => console.log('DOM ready'));",
      test: "if (typeof doc.onload === 'function') { doc.onload(); if (logs.includes('DOM ready')) return null; } return 'DOMContentLoaded hodisasini to\\'g\\'ri sozlang';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`addEventListener('click', myFunc)` chaqirishda `myFunc` funksiyasi oxiriga nima uchun qavslar `()` qo'yilmaydi?",
      options: [
        "Chunki qavslar qo'yilsa, funksiya tugma bosilganda emas, balki kod o'qilgan vaqtda darhol ishga tushib ketadi",
        "Chunki JavaScript sintaksisida funksiyalar hech qachon qavslar bilan chaqirilmaydi",
        "Bu CSS selektori bilan to'qnashuvni oldini olish uchun kerak",
        "Qavslar qo'yilganda kod tezroq ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Agar funksiya oxiriga qavs `()` qo'ysangiz, JavaScript uni o'sha satr o'qilishi bilanoq darhol chaqiradi. Biz esa tugma bosilganda uning callback sifatida (keyinroq) chaqirilishini istaymiz. Shuning uchun faqat funksiyaning nomi (havolasi) uzatiladi."
    },
    {
      id: 2,
      question: "Hodisa (Event) sodir bo'lganda, foydalanuvchining ayni vaqtda aynan qaysi element ustida klik qilganini aniqlash uchun event obyektining qaysi xususiyatidan foydalaniladi?",
      options: [
        "`event.name`",
        "`event.target`",
        "`event.type`",
        "`event.element`"
      ],
      correctAnswer: 1,
      explanation: "`event.target` xususiyati ayni vaqtda foydalanuvchi ta'sir qilgan (masalan, bosgan) haqiqiy DOM elementiga ishora qiladi."
    },
    {
      id: 3,
      question: "Brauzerning standart harakatlarini (masalan, formadagi submit tugmasi bosilganda sahifani qayta yuklash yoki a-link bosilganda yangi URL-ga o'tish) bekor qilish uchun qaysi metod ishlatiladi?",
      options: [
        "`event.stopPropagation()`",
        "`event.preventDefault()`",
        "`event.stopImmediatePropagation()`",
        "`event.cancelBubbling()`"
      ],
      correctAnswer: 1,
      explanation: "`event.preventDefault()` metodi brauzerning har bir hodisa uchun sukut bo'yicha belgilangan standart harakatini to'xtatadi."
    },
    {
      id: 4,
      question: "JavaScript-da Event Bubbling (hodisaning ko'pirib ko'tarilishi) deganda nimani tushunasiz?",
      options: [
        "Hodisa faqat eng tepa ota elementda boshlanib, pastki ichki bolalarga qarab tarqalishi",
        "Hodisaning eng ichki (eng chuqur joylashgan) elementda ishga tushib, so'ngra uning barcha ota elementlari (ancestors) bo'ylab yuqoriga qarab bosqichma-bosqich tarqalishi",
        "Xotirada eventlarning haddan tashqari to'lib ketishi va xatolik berishi",
        "Hodisaning bir vaqtda barcha ochiq sahifalarda tarqalishi"
      ],
      correctAnswer: 1,
      explanation: "Event Bubbling - hodisalarning eng quyidagi elementdan boshlanib, asta-sekin DOM daraxti bo'ylab eng yuqorigacha (`window`gacha) ota elementlar orqali ko'tarilish jarayonidir."
    },
    {
      id: 5,
      question: "Hodisaning ota elementlarga qarab yuqoriga tarqalishini (bubbling) to'xtatish uchun qaysi metod ishlatiladi?",
      options: [
        "`event.preventDefault()`",
        "`event.stopPropagation()`",
        "`event.cancel()`",
        "`event.freeze()`"
      ],
      correctAnswer: 1,
      explanation: "`event.stopPropagation()` metodi joriy hodisaning ota elementlarga o'tib bubbling bo'lishini (yuqoriga qarab tarqalishini) butunlay to'xtatib qo'yadi."
    },
    {
      id: 6,
      question: "Event Capturing (hodisani tutib olish) bosqichi qanday ishlaydi?",
      options: [
        "Hodisaning eng ichki elementdan boshlanib yuqoriga harakatlanishi",
        "Hodisaning eng yuqori ota elementdan (window) boshlab pastga, maqsad qilingan elementga (target) qarab yo'nalishi",
        "Hodisaning faqat bitta elementda sodir bo'lib, boshqa elementlarga ta'sir qilmasligi",
        "Event listener'larni xotiradan to'liq tozalash jarayoni"
      ],
      correctAnswer: 1,
      explanation: "Event Capturing - hodisaning DOM daraxti bo'ylab eng yuqoridan (window/document) boshlanib, event sodir bo'lgan maqsadli elementga (target) qarab pastga yo'nalish bosqichidir."
    },
    {
      id: 7,
      question: "Event Delegation (hodisalarni ota element orqali delegatsiya qilish) usulining asosiy afzalligi nima?",
      options: [
        "Kodning xavfsizligini 100% ta'minlashi va XSS hujumlarini to'xtatishi",
        "Yuzlab bolalar uchun alohida listener qo'shish o'rniga bitta umumiy ota elementga bitta listener qo'shib, xotirani tejash va dinamik qo'shiladigan elementlarni ham qamrab olish",
        "Hodisani tezroq bajarishi (microtask queue orqali)",
        "JavaScript-ni o'rnatmasdan ham HTML elementlarini ishlatish imkoniyati"
      ],
      correctAnswer: 1,
      explanation: "Event delegation yordamida bitta ota elementga o'rnatilgan listener uning ichidagi barcha mavjud va kelajakda dinamik ravishda qo'shiladigan bolalardagi hodisalarni bubbling hisobiga tutib oladi va xotira sarfini kamaytiradi."
    },
    {
      id: 8,
      question: "`element.addEventListener('click', handler, true)` dagi uchinchi argument bo'lgan `true` nima bildiradi?",
      options: [
        "Hodisani har doim bajarishni ta'minlaydi (bekor qilib bo'lmaydi)",
        "Listener faqat bir marta ishlashini ta'minlaydi",
        "Hodisani Capturing (tutib olish) bosqichida eshitish/tinglashni bildiradi (bubbling o'rniga)",
        "Hodisa asinxron tarzda bajarilishini bildiradi"
      ],
      correctAnswer: 2,
      explanation: "`addEventListener` metodining uchinchi argumenti (useCapture) agar `true` bo'lsa, hodisa bubbling (ko'pirish) bosqichida emas, balki capturing (tutib olish) bosqichida ishga tushadi."
    },
    {
      id: 9,
      question: "`event.target` va `event.currentTarget` o'rtasidagi farq nima?",
      options: [
        "`target` - hodisani eshitayotgan (listener biriktirilgan) element; `currentTarget` - hodisani yuzaga keltirgan haqiqiy element",
        "`target` - hodisani yuzaga keltirgan (bosilgan) haqiqiy element; `currentTarget` - event listener ulanib, hodisani eshitayotgan joriy element",
        "Ikkalasi mutlaqo bir xil va har doim bir xil elementni qaytaradi",
        "`target` faqat matnlarda ishlaydi, `currentTarget` esa elementlarda"
      ],
      correctAnswer: 1,
      explanation: "`event.target` - hodisa aynan qaysi element ustida yuz berganini bildiradi (eng ichki element bo'lishi mumkin). `event.currentTarget` esa joriy event listener qaysi elementga ulanib eshitayotgan bo'lsa, o'sha elementni qaytaradi."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri to'g'ri ishlagan holda event listenerni muvaffaqiyatli o'chiradi?",
      options: [
        "`btn.addEventListener('click', () => console.log(1)); btn.removeEventListener('click', () => console.log(1));`",
        "`const cb = () => console.log(1); btn.addEventListener('click', cb); btn.removeEventListener('click', cb);`",
        "`btn.removeEventListener('click');`",
        "`btn.addEventListener('click', cb); btn.removeEventListener(cb);`"
      ],
      correctAnswer: 1,
      explanation: "Event listenerni o'chirish uchun `removeEventListener`ga aynan o'sha qo'shilgan nomli (reference) funksiya va event turi uzatilishi kerak. Anonim funksiyalarni olib tashlab bo'lmaydi."
    },
    {
      id: 11,
      question: "Event listener faqat bir marta ishlashi va shundan so'ng avtomatik o'chib ketishi uchun qanday sozlama beriladi?",
      options: [
        "`element.addEventListener('click', handler, { once: true })`",
        "`element.addEventListener('click', handler, { single: true })`",
        "`element.addEventListener('click', handler, { autoRemove: true })`",
        "`element.addEventListener('click', handler, 1)`"
      ],
      correctAnswer: 0,
      explanation: "`addEventListener`ning uchinchi argumenti sifatida `{ once: true }` obyekti berilsa, ushbu listener hodisa birinchi marta sodir bo'lishi bilanoq o'zini o'zi DOM-dan o'chirib yuboradi."
    },
    {
      id: 12,
      question: "`DOMContentLoaded` va `load` hodisalari (events) o'rtasidagi farq nima?",
      options: [
        "`load` tezroq ishlaydi, `DOMContentLoaded` esa rasmlar yuklangach ishlaydi",
        "`DOMContentLoaded` faqat HTML yuklanib, DOM daraxti qurilganda ishga tushadi (rasmlar va stillar hali yuklanayotgan bo'lishi mumkin); `load` esa butun sahifa (HTML, CSS, rasmlar, iframe) to'liq yuklangandan keyin ishlaydi",
        "Ikkalasi bir vaqtda ishga tushadi",
        "`DOMContentLoaded` faqat mobil qurilmalarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`DOMContentLoaded` brauzer HTML-ni to'liq parse qilib, DOM daraxtini tuzib bo'lgan zahoti (stillari, rasmlari yuklanishini kutmasdan) chaqiriladi. `load` esa sahifadagi barcha tashqi resurslar (rasmlar, stylesheet'lar va h.k.) to'liq yuklangandan so'ng ishlaydi."
    }
  ]
};

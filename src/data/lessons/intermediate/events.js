export const events = {
  id: "events",
  title: "Brauzer Hodisalari va Event Handling (Events)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish (Beginner Analogy)

### Hodisa (Event) nima?
**Hodisa (Event)** — bu foydalanuvchining brauzer ichida amalga oshiradigan harakatlari (klik qilish, klaviaturadan matn yozish, sahifani aylantirish, shakllarni yuborish) yoki tizim tomonidan yuz beradigan o'zgarishlardir. JavaScript bu hodisalarni "eshitib" tinglay oladi va ularga nisbatan dasturiy reaksiya (javob) qaytaradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **xizmat ko'rsatuvchi restorandasiz**:
* **Qo'ng'iroq (Event):** Stol ustidagi maxsus tugma bosilishi.
* **Tinglovchi (Event Listener):** Restoran xodimining shu qo'ng'iroqni tinglab, navbatchilik qilib turishi.
* **Javob (Callback funksiya):** Tugma bosilishi bilanoq ofitsiantning kelib, buyurtma olishi. Agar stol ustida tugma bo'lmasa, siz uni bosa olmaysiz va ofitsiant sizning bosish harakatingizni eshitmaydi.

---

## 2. 🧠 Chuqur O'rganish (Deep Dive: Under the Hood, Memory, V8, Performance)

### Brauzer va V8 Engine darajasida Eventlar qanday ishlaydi?
Event Listener qo'shganimizda, V8 (yoki boshqa JS dvigateli) DOM tugunini to'g'ridan-to'g'ri bog'lamaydi, balki Web API ga topshiradi. Web API C++ yordamida brauzer jarayonlari bilan integratsiya qilinadi. Hodisa yuz berganda, Web API uni Callback Queue (yoki Task Queue) ga yuboradi. Event Loop asinxron ishlarni kuzatib turadi, Call Stack bo'shaganida callbackni bajarish uchun yuboradi.

### Xotira Boshqaruvi va Memory Leaks
Xotira qochishi (Memory Leak) eng ko'p uchrashi mumkin bo'lgan joylardan biri event listener'lardir. Agar DOM dagi element o'chirilsa-yu, unga ulangan event listener olib tashlanmasa (xususan SPA freymvorklarida), bu element Garbarge Collector tomonidan tozalanmaydi. 
* Event Delegation (hodisani delegatsiya qilish) — har bir kichik elementga emas, ularning ota elementiga \\\`addEventListener\\\` biriktirish orqali xotira sarfini kamaytirish mumkin.

### Event Capturing va Bubbling
Hodisa sodir bo'lganda 3 bosqich bo'ladi:
1. **Capturing phase:** Hodisa \\\`Window\\\` ob'ektidan boshlab \\\`target\\\` (maqsadli) elementgacha tushadi.
2. **Target phase:** Hodisa maqsadli elementga yetib keladi.
3. **Bubbling phase:** Hodisa maqsadli elementdan boshlab ota elementlari orqali \\\`Window\\\` gacha qabariq kabi ko'tariladi.
Odatda barcha listener'lar bubbling bosqichida ishlaydi (default). Agar \\\`{ capture: true }\\\` optsiyasi yozilsa, capturing bosqichida ushlanadi.

---

## 3. ⚠️ Edge Cases va Senior Intervyu Savollari

### Edge Cases
* \\\`event.stopPropagation()\\\` va \\\`event.stopImmediatePropagation()\\\` farqi nimada? Birinchisi faqat bubbling'ni to'xtatadi. Ikkinchisi esa bitta elementga biriktirilgan bir xil hodisaga ulangan boshqa listener'larning ham ishlashini darhol to'xtatadi.
* **Passive Listeners:** \\\`scroll\\\`, \\\`wheel\\\`, \\\`touchstart\\\` kabi hodisalar brauzerning render qilish jarayoniga bevosita ta'sir ko'rsatib qotishlarga (jank) olib keladi. Bunga sabab, brauzer event ichida \\\`e.preventDefault()\\\` yozilgan bo'lishi mumkinligini kutadi. Buni bartaraf qilish uchun uchinchi parametrga \\\`{ passive: true }\\\` beriladi. Brauzerga \\\`preventDefault\\\` chaqirilmasligi kafolatlanadi.
* **Double Submit:** \\\`{ once: true }\\\` optsiyasi tugma aynan faqat bir marta bosilishiga ruxsat beradi va listener avtomat tarzda remove bo'ladi (GC xotiradan tozalaydi).

### Senior Intervyu Savollari
1. **Event Delegation nima va nega ishlatiladi?**
2. **Event Loop ichida Microtask va Macrotask navbatlarida hodisalarning o'rni qanday?**
3. **\\\`target\\\` va \\\`currentTarget\\\` o'rtasidagi farqni kodda tushuntiring.**
4. **Memory Leak qanday qilib event listener'lar orqali sodir bo'lishi mumkin va buni qanday qilib Chrome DevTools orqali aniqlaysiz?**

---

## 4. 📊 Hodisalarning Tarqalishi (Event Propagation)

\\\`\\\`\\\`mermaid
graph TD
    A[Window] -->|1. Capturing Phase| B[Document]
    B -->|1. Capturing Phase| C[html]
    C -->|1. Capturing Phase| D[body]
    D -->|1. Capturing Phase| E[div.parent]
    E -->|1. Capturing Phase| F((button.target))
    F -.->|2. Target Phase| F
    F -->|3. Bubbling Phase| E
    E -->|3. Bubbling Phase| D
    D -->|3. Bubbling Phase| C
    C -->|3. Bubbling Phase| B
    B -->|3. Bubbling Phase| A
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Klik Hodisasini Tinglash (addEventListener)",
      instruction: "Berilgan `button` elementiga 'click' hodisasini eshituvchi va bosilganda `callback` funksiyasini ishga tushiruvchi `setupClick(button, callback)` funksiyasini yozing.",
      startingCode: "function setupClick(button, callback) {\n  // Kodni yozing\n}",
      hint: "button.addEventListener('click', callback);",
      test: "try { let clicked = false; const mockBtn = { addEventListener: (t, cb) => { if(t === 'click') cb(); } }; setupClick(mockBtn, () => clicked = true); if (!clicked) return 'click hodisasi ulanmadi yoki callback chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 2,
      title: "Standart Harakatni Bekor Qilish (preventDefault)",
      instruction: "Forma yuborilish (submit) hodisasini qabul qilib, uning standart sahifani yangilash harakatini bekor qiluvchi `handleSubmit(event)` funksiyasini yozing.",
      startingCode: "function handleSubmit(event) {\n  // Kodni yozing\n}",
      hint: "event.preventDefault();",
      test: "try { let prevented = false; const mockEvent = { preventDefault: () => prevented = true }; handleSubmit(mockEvent); if (!prevented) return 'preventDefault() chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 3,
      title: "Hodisalarni Delegatsiya Qilish (Event Delegation)",
      instruction: "Berilgan `parent` elementiga click listener ulang. Agar bosilgan element (`event.target`) `item` klassiga ega bo'lsa, `callback` funksiyasini ishga tushirib, unga o'sha bosilgan elementni argument qilib uzatuvchi `delegateClick(parent, callback)` funksiyasini yozing.",
      startingCode: "function delegateClick(parent, callback) {\n  // Kodni yozing\n}",
      hint: "parent.addEventListener('click', (e) => { if (e.target.classList.contains('item')) callback(e.target); });",
      test: "try { let calledWith = null; let listener = null; const mockParent = { addEventListener: (t, cb) => { listener = cb; } }; delegateClick(mockParent, (el) => calledWith = el); const mockTarget = { classList: { contains: (c) => c === 'item' } }; listener({ target: mockTarget }); if (calledWith !== mockTarget) return 'Delegatsiya ishlamadi yoki callback to\\'g\\'ri element bilan chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 4,
      title: "stopPropagation bilan Bubbling ni To'xtatish",
      instruction: "`stopBubbling(event)` funksiyasini yozing. Bu funksiya hodisaning ota elementlarga ko'tarilib ketishini (bubbling) to'xtatishi kerak. Funksiya `event.stopPropagation()` metodini chaqirsin.",
      startingCode: "function stopBubbling(event) {\n  // Kodni yozing\n}",
      hint: "event.stopPropagation();",
      test: "try { let stopped = false; const mockEvent = { stopPropagation: () => stopped = true }; stopBubbling(mockEvent); if (!stopped) return 'stopPropagation() chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 5,
      title: "removeEventListener bilan Tinglashni O'chirish",
      instruction: "`addAndRemove(button, callback)` funksiyasini yozing. Funksiya avval 'click' hodisasini ulaydi, keyin darhol `removeEventListener` yordamida o'chiradi. Natijada callback chaqirilmasligi kerak.",
      startingCode: "function addAndRemove(button, callback) {\n  // Kodni yozing\n}",
      hint: "button.addEventListener('click', callback); button.removeEventListener('click', callback);",
      test: "try { let addCalled = false; let removeCalled = false; let addedRef = null; let removedRef = null; const mockBtn = { addEventListener: (t, cb) => { addCalled = true; addedRef = cb; }, removeEventListener: (t, cb) => { removeCalled = true; removedRef = cb; } }; const fn = () => {}; addAndRemove(mockBtn, fn); if (!addCalled) return 'addEventListener chaqirilmadi'; if (!removeCalled) return 'removeEventListener chaqirilmadi'; if (addedRef !== removedRef) return 'add va remove da bir xil funksiya havolasi ishlatilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 6,
      title: "once: true bilan Bir Martalik Hodisa",
      instruction: "`setupOnce(button, callback)` funksiyasini yozing. Funksiya 'click' hodisasini faqat bir marta ishlashi uchun `{ once: true }` option bilan ulashi kerak.",
      startingCode: "function setupOnce(button, callback) {\n  // Kodni yozing\n}",
      hint: "button.addEventListener('click', callback, { once: true });",
      test: "try { let options = null; const mockBtn = { addEventListener: (t, cb, opts) => { options = opts; } }; setupOnce(mockBtn, () => {}); if (!options || options.once !== true) return '{ once: true } option berilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 7,
      title: "Klaviatura Hodisasi (keydown) va event.key",
      instruction: "`onEnterPress(input, callback)` funksiyasini yozing. Funksiya berilgan `input` elementiga 'keydown' hodisasini ulaydi va faqat 'Enter' tugmasi bosilgandagina `callback` ni chaqiradi. `event.key` xossasidan foydalaning.",
      startingCode: "function onEnterPress(input, callback) {\n  // Kodni yozing\n}",
      hint: "input.addEventListener('keydown', (e) => { if (e.key === 'Enter') callback(); });",
      test: "try { let listener = null; let called = false; const mockInput = { addEventListener: (t, cb) => { if (t === 'keydown') listener = cb; } }; onEnterPress(mockInput, () => called = true); if (!listener) return 'keydown hodisasi ulanmadi'; listener({ key: 'Enter' }); if (!called) return 'Enter bosilganda callback chaqirilmadi'; called = false; listener({ key: 'Escape' }); if (called) return 'Faqat Enter uchun ishlashi kerak edi, boshqa tugma ham ishladi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 8,
      title: "Input Hodisasi va Real-Time Qidirish",
      instruction: "`setupSearch(inputEl, callback)` funksiyasini yozing. Funksiya inputga 'input' hodisasini ulaydi va har bir harf kiritilganda `callback` ni `event.target.value` qiymati bilan chaqiradi.",
      startingCode: "function setupSearch(inputEl, callback) {\n  // Kodni yozing\n}",
      hint: "inputEl.addEventListener('input', (e) => callback(e.target.value));",
      test: "try { let listener = null; let receivedValue = null; const mockInput = { addEventListener: (t, cb) => { if (t === 'input') listener = cb; } }; setupSearch(mockInput, (val) => receivedValue = val); if (!listener) return 'input hodisasi ulanmadi'; listener({ target: { value: 'Salom' } }); if (receivedValue !== 'Salom') return 'callback ga event.target.value uzatilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 9,
      title: "CustomEvent Yaratish va Trigger Qilish",
      instruction: "`emitCustomEvent(element, eventName, data)` funksiyasini yozing. Funksiya yangi `CustomEvent` yaratib, `detail` maydonida `data` ni saqlagan holda `element.dispatchEvent()` orqali hodisani trigger qilsin.",
      startingCode: "function emitCustomEvent(element, eventName, data) {\n  // Kodni yozing\n}",
      hint: "const event = new CustomEvent(eventName, { detail: data }); element.dispatchEvent(event);",
      test: "try { let dispatched = null; const mockEl = { dispatchEvent: (e) => { dispatched = e; } }; emitCustomEvent(mockEl, 'user-login', { userId: 42 }); if (!dispatched) return 'dispatchEvent chaqirilmadi'; if (dispatched.type !== 'user-login') return 'Event nomi noto\\'g\\'ri'; if (!dispatched.detail || dispatched.detail.userId !== 42) return 'detail maydoni noto\\'g\\'ri'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      id: 10,
      title: "Oddiy Debounce Funksiyasi",
      instruction: "`debounce(fn, delay)` funksiyasini yozing. U yangi funksiya qaytarsin. Qaytarilgan funksiya chaqirilganda, agar oldingi timer mavjud bo'lsa uni tozalab (clearTimeout), yangi `setTimeout` bilan `fn` ni `delay` ms dan keyin chaqirsin.",
      startingCode: "function debounce(fn, delay) {\n  // Kodni yozing\n}",
      hint: "let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };",
      test: "try { const debounced = debounce(() => {}, 100); if (typeof debounced !== 'function') return 'debounce funksiya qaytarishi kerak'; let callCount = 0; const debouncedFn = debounce(() => callCount++, 50); debouncedFn(); debouncedFn(); debouncedFn(); if (callCount !== 0) return 'debounce darhol chaqirmasligi kerak, delay dan keyin chaqirishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da elementga hodisa tinglovchisi (event listener) qo'shish uchun qaysi metod ishlatiladi?",
      options: [
        "element.attachEvent('click')",
        "element.addEventListener('click', callback)",
        "element.onclick(callback)",
        "element.bindEvent('click')"
      ],
      correctAnswer: 1,
      explanation: "`addEventListener` modern JavaScript-da elementga bir yoki bir nechta hodisalarni bog'lash uchun standart metod hisoblanadi."
    },
    {
      id: 2,
      question: "`event.preventDefault()` metodining vazifasi nima?",
      options: [
        "Hodisaning ota elementlarga tarqalishini to'xtatadi",
        "Elementning standart brauzer harakatlarini (masalan, form yuborilganda sahifa yangilanishini) bekor qiladi",
        "Hodisa tinglovchisini xotiradan o'chirib yuboradi",
        "Xatoliklarni avtomatik tuzatadi"
      ],
      correctAnswer: 1,
      explanation: "`preventDefault()` brauzerning default amallarini (havola href-ga o'tishi, forma submit bo'lib sahifa yangilanishi) to'xtatadi."
    },
    {
      id: 3,
      question: "Hodisa yuz berganda `event.target` xossasi nimani qaytaradi?",
      options: [
        "Tinglovchi ulab qo'yilgan ota elementni",
        "Hodisani trigger qilgan (klik bo'lgan) eng birinchi boshlang'ich elementni",
        "Barcha elementlar ro'yxatini",
        "Hodisa sodir bo'lgan vaqtni"
      ],
      correctAnswer: 1,
      explanation: "`event.target` hodisani yuzaga keltirgan, foydalanuvchi bevosita bosgan eng pastki aniq elementni ifodalaydi."
    },
    {
      id: 4,
      question: "`event.stopPropagation()` nima qiladi?",
      options: [
        "Tugmaning standart bosilishini bekor qiladi",
        "Hodisaning DOM daraxti bo'ylab tepaga (ota elementlarga) tarqalishini (bubbling) to'xtatadi",
        "Zaharli skriptlarni tozalaydi",
        "Intervalni to'xtatadi"
      ],
      correctAnswer: 1,
      explanation: "`stopPropagation()` hodisaning ota elementlarga ko'tarilib ketishini bubbling bosqichida bloklaydi."
    },
    {
      id: 5,
      question: "Event Delegation (hodisalarni delegatsiya qilish) qanday prinsipga tayanadi?",
      options: [
        "Barcha elementlarga alohida-alohida listener qo'shishga",
        "Hodisalarning ko'pirib chiqish (Bubbling) xususiyatidan foydalanib, ota elementga bitta listener qo'shib dynamic kliklarni boshqarishga",
        "Dinamik import yordamida yuklashga",
        "Stillarni alohida faylda saqlashga"
      ],
      correctAnswer: 1,
      explanation: "Event Delegation hodisalarning bubbling bo'lishiga tayanadi. Biz ota elementga ulab, uning ichidagi dynamic yaratilgan bolalarning kliklarini ham osongina bitta joyda boshqaramiz."
    },
    {
      id: 6,
      question: "Hodisaning capturing (tutib olish) va bubbling (ko'pirib chiqish) bosqichlari qanday tartibda bajariladi?",
      options: [
        "Birlamchi bubbling, keyin capturing bosqichi",
        "Birlamchi capturing (tepadan pastga), keyin target (maqsad), so'ngra bubbling (pastdan tepaga)",
        "Ikkalasi barobar bajariladi",
        "Faqat bubbling bosqichi mavjud, capturing yo'q"
      ],
      correctAnswer: 1,
      explanation: "Hodisa dastlab Window-dan boshlab target-gacha tushadi (capturing), targetda ishlaydi, so'ngra targetdan boshlab yana yuqoriga ko'tariladi (bubbling)."
    },
    {
      id: 7,
      question: "Hodisa tinglovchisini faqat bir marta ishlatib, so'ngra xotiradan avtomat o'chirib yuborish uchun qaysi option parametri beriladi?",
      options: [
        "{ single: true }",
        "{ once: true }",
        "{ passive: true }",
        "{ capture: false }"
      ],
      correctAnswer: 1,
      explanation: "`{ once: true }` addEventListener uchinchi parametri sifatida berilganda, hodisa 1 marta bajarilgach brauzer uni o'zi o'chirib yuboradi."
    },
    {
      id: 8,
      question: "Touch va scroll hodisalarini o'ta silliq (janksiz) qilish uchun qaysi option parametri berilishi shart?",
      options: [
        "{ smooth: true }",
        "{ passive: true }",
        "{ once: true }",
        "{ capture: true }"
      ],
      correctAnswer: 1,
      explanation: "`{ passive: true }` brauzerga preventDefault chaqirilmasligini kafolatlaydi, bu esa sahifani chizishni bloklamasdan scroll-ni GPU-da silliq bajarishga imkon beradi."
    },
    {
      id: 9,
      question: "`event.currentTarget` xossasi nimani qaytaradi?",
      options: [
        "Klik bo'lgan eng boshlang'ich elementni",
        "Ayni vaqtda event listener ulab qo'yilgan (hodisani eshitayotgan) ota elementni",
        "Keyingi qo'shni elementni",
        "Hujjatning ildiz elementini (html)"
      ],
      correctAnswer: 1,
      explanation: "`currentTarget` event handler ulab qo'yilgan va o'sha handler ayni vaqtda ishlayotgan elementni (odatda ota elementni) ko'rsatadi."
    },
    {
      id: 10,
      question: "Event listenerni capturing (tutib olish) bosqichida tinglash uchun nima qilinadi?",
      options: [
        "Tinglovchi metodini o'zgartirish kerak",
        "addEventListener uchinchi argumentiga `true` yoki `{ capture: true }` parametrini yuborish shart",
        "Hech qanday iloji yo'q, capturing faqat CSS-da ishlaydi",
        "once parametridan foydalanish shart"
      ],
      correctAnswer: 1,
      explanation: "Uchinchi parametrga `true` yoki `{ capture: true }` berilsa, listener bubbling emas, capturing bosqichida (tepadan pastga tushishda) ishga tushadi."
    },
    {
      id: 11,
      question: "`removeEventListener` to'g'ri ishlashi uchun qaysi shartlar bajarilishi shart?",
      options: [
        "Faqat hodisa turi mos kelsa yetarli",
        "Hodisa turi (event type) va ro'yxatga olingan funksiya havolasi (reference) aynan bir xil bo'lishi shart",
        "Uni faqat asinxron funksiyalar ichida ishlatish kerak",
        "Ota elementni o'chirish kerak"
      ],
      correctAnswer: 1,
      explanation: "O'chirish to'g'ri ishlashi uchun add va remove chaqiruvlaridagi hodisa nomi va funksiya havolasi (references) bir-biriga aynan teng (same memory address) bo'lishi lozim."
    },
    {
      id: 12,
      question: "Klaviaturadan bosilgan aniq tugmani (masalan, 'Enter') aniqlash uchun qaysi xususiyatdan foydalanish tavsiya etiladi?",
      options: [
        "event.keyCode (eskirgan)",
        "event.key",
        "event.char",
        "event.button"
      ],
      correctAnswer: 1,
      explanation: "Modern JavaScript-da bosilgan tugmani topish uchun `event.key` xossasi (masalan, 'Enter', 'Escape') tavsiya qilinadi. `keyCode` esa eskirgan va foydalanishdan olingan (deprecated)."
    }
  ]
};

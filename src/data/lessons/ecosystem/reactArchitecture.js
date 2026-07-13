export const reactArchitecture = {
  id: "reactArchitecture",
  title: "React Arxitekturasi (Fiber, Reconciler, Virtual DOM)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, siz katta bir restoranning boshqaruvchisisiz. Restoranda (bu sizning web sahifangiz) ko'plab mijozlar stollarda o'tiribdi (DOM elementlari). 

* **Real DOM:** Bu haqiqiy restoran. Agar bitta mijoz menyuni o'zgartirmoqchi bo'lsa, tajribasiz ofitsiant butun restorandagi hamma stollarni yangidan yasab, hamma mijozlarni qaytadan joylashtirib chiqadi. Bu juda ko'p vaqt va energiya talab qiladi.
* **Virtual DOM:** Bu restoranning aqlli kompyuter tizimidagi nusxasi. Kimdir nimanidir o'zgartirsa, tizim oldin o'zgarishlarni kompyuterda (Virtual DOM) amalga oshiradi, eski holat bilan solishtiradi va faqatgina o'sha bitta stoldagi mijozning menyusini o'zgartirish uchun ofitsiantga aniq ko'rsatma beradi.
* **Reconciler (Yarashtiruvchi) va Fiber:** Bu aqlli kompyuter tizimining arxitekturasi va jarayoni. Fiber - bu kompyuterning yangi versiyasi bo'lib, u shoshilinch bo'lmagan ishlarni to'xtatib turib (masalan, kimdir shirinlik buyurtma qildi), shoshilinch ishlarga e'tibor qaratishi mumkin (masalan, VIP mijoz keldi).

---

## 2. 🚀 Deep Dive (Under the hood)

React qanday qilib o'zining "sehrini" namoyish etishini chuqurroq tushunib olaylik.

### Virtual DOM vs Real DOM
Real DOM (Document Object Model) bilan ishlash sekin. Shuning uchun React xotirada DOM daraxtining nusxasi bo'lgan Virtual DOM-ni yaratadi. Qachonki komponent state (holat) yoki prop o'zgarsa, React butun Virtual DOM daraxtini yangitdan yaratadi.

### Reconciliation
Yangi Virtual DOM yaratilgandan so'ng, React oldingi Virtual DOM daraxti bilan yangisini solishtiradi. Bu jarayon **Reconciliation (Yarashtirish)** deb ataladi va uning markazida diffing (farqlarni topish) algoritmi yotadi. React O(n) vaqt talab qiladigan evristik algoritmdan foydalanadi. Buning uchun ikkita asosiy qoidaga tayanadi:
1. Har xil turdagi elementlar har xil daraxtlarni hosil qiladi.
2. Dasturchi ma'lum bir elementlarni 'key' prop-i orqali ajratib ko'rsatishi mumkin.

### Fiber Architecture
React 16 da joriy qilingan yangi reconciliation dvigateli. Eski stack-asosidagi reconciler sinxron ishlardi (ya'ni, render boshlangandan keyin to'xtatib bo'lmasdi). 
Fiber esa **asinxron renderlash** imkoniyatini beradi. U ishlarni mayda bo'laklarga ('fiber'larga) ajratadi. 
Fiber qanday afzalliklar beradi:
* **Pausability (To'xtatib turish):** Animatsiya kabi muhim ishlar uchun renderni to'xtatib turish.
* **Prioritization (Ustuvorlik):** Turlicha yangilanishlarga har xil prioritet berish (masalan, foydalanuvchi bosishiga yuqori, tarmoqdan kelgan ma'lumotga past).
* **Concurrency (Bir vaqtda bajarish):** Orqa fonda ishlarni bajarish (React 18 Concurrent xususiyatlari).

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases
* 'key' sifatida massiv indeksini ishlatish. Agar ro'yxat tartibi o'zgarsa, itemlar o'chirilsa yoki qo'shilsa, React xato joyga re-render qilishi mumkin yoki ba'zi komponentlarning state holatlari kutilmagan tarzda almashib qoladi. Har doim unikal 'id' ishlating.
* Og'ir hisob-kitoblarni to'g'ridan-to'g'ri renderda ishlatish. Bu Fiber qanchalik kuchli bo'lmasin, main threadni band qilib qo'yadi. 'useMemo' yoki Web Workerlardan foydalanish kerak.

### Senior Interview Questions
1. **Reactda diffing algoritmi qanday ishlaydi va nima uchun 'key' muhim?**
   *Javob:* O(n) komplekslikda ishlash qoidasi: turli xil elementlar turlari butun sub-tree'ni qayta chizadi. 'key' orqali React elementlarni bir xil yoki o'zgarganini tez va aniq aniqlaydi.
2. **Fiber qanday qilib Concurrency ga erishadi?**
   *Javob:* Fiber - bu virtual stack frameni ifodalovchi ma'lumotlar tuzilmasi. Stack frame xotirada saqlanadi, shuning uchun React ijro zanjirini to'xtatib turishi, o'zgartirishi yoki bekor qilishi mumkin.
3. **Commit Phase va Render Phase o'rtasidagi farq nima?**
   *Javob:* Render Phase o'zgarishlarni hisoblaydi (diffing) va to'xtatilishi yoki bekor qilinishi mumkin (Fiber tufayli). Commit Phase esa o'zgarishlarni to'g'ridan-to'g'ri DOM'ga qo'llaydi. U sinxron va to'xtatib bo'lmaydigan jarayondir.

---

## 4. 🧠 Architecture Diagram (Visual)

\\\`\\\`\\\`mermaid
graph TD
    Update[State or Props Update] --> RenderPhase(Render Phase - Asinxron, Toxtatilishi mumkin)
    RenderPhase --> VDOM1[Virtual DOM]
    VDOM1 --> Diffing[Reconciliation Diffing]
    Diffing --> FiberNode[Fiber Node Tree]
    FiberNode --> CommitPhase(Commit Phase - Sinxron, Toxtatilmaydi)
    CommitPhase --> Mutate[Real DOM Mutations]
    Mutate --> Lifecycle[useEffect / ComponentDidMount]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Fiber tugunini tekshirish",
      instruction: "Berilgan obyekt React Fiber tuguni (node) yoki oddiy obyekt ekanligini tekshiradigan `isFiberNode(node)` funksiyasini yozing. Fiber tuguni deb hisoblash uchun u o'zida `tag`, `type`, va `stateNode` xossalarini saqlashi kerak.",
      startingCode: "function isFiberNode(node) {\n  // tekshirish logikasi\n}",
      hint: "return node && 'tag' in node && 'type' in node && 'stateNode' in node;",
      test: "if (typeof isFiberNode !== 'function') return 'Funksiya topilmadi'; if(isFiberNode({tag: 1, type: 'div', stateNode: {}}) !== true) return 'Fiber topilmadi'; if(isFiberNode({type: 'div'}) === true) return 'Oddiy obyekt Fiber deb o\\'ylandi'; return null;"
    },
    {
      id: 2,
      title: "Key borligini tekshirish",
      instruction: "React elementi (obyekt) ichida `key` xossasi aniqlanganligini (undefined emasligini) tekshiruvchi `hasValidKey(element)` funksiyasini yozing.",
      startingCode: "function hasValidKey(element) {\n  // key mavjudligini tekshiring\n}",
      hint: "return element && element.key !== undefined;",
      test: "if (typeof hasValidKey !== 'function') return 'Funksiya topilmadi'; if(hasValidKey({key: '123'}) !== true) return 'Key topilmadi'; if(hasValidKey({type: 'div'}) !== false) return 'Yaroqsiz key to\\'g\\'ri deb topildi'; return null;"
    },
    {
      id: 3,
      title: "Fiber alternate tekshiruvi",
      instruction: "Fiber me'morchiligida current va work-in-progress (WIP) daraxtlari `alternate` xossasi orqali bir-biriga bog'langan bo'ladi. Ikki Fiber tuguni bir-biriga alternate ekanligini tekshiruvchi `areAlternates(fiber1, fiber2)` funksiyasini yozing.",
      startingCode: "function areAlternates(fiber1, fiber2) {\n  // alternate tekshiring\n}",
      hint: "return fiber1.alternate === fiber2 && fiber2.alternate === fiber1;",
      test: "if (typeof areAlternates !== 'function') return 'Funksiya topilmadi'; const f1 = {}; const f2 = {}; f1.alternate = f2; f2.alternate = f1; if(areAlternates(f1, f2) !== true) return 'Alternate tekshiruvi noto\\'g\\'ri'; return null;"
    },
    {
      id: 4,
      title: "Virtual DOM Diff",
      instruction: "Ikkita oddiy obyektning `type` va `key` xossalari bir xilligini tekshiruvchi `isSameElementType(oldEl, newEl)` funksiyasini yozing. Bu React reconciliation jarayonining kichik modelidir.",
      startingCode: "function isSameElementType(oldEl, newEl) {\n  // type va key solishtiriladi\n}",
      hint: "return oldEl.type === newEl.type && oldEl.key === newEl.key;",
      test: "if (typeof isSameElementType !== 'function') return 'Funksiya topilmadi'; if(isSameElementType({type: 'div', key: '1'}, {type: 'div', key: '1'}) !== true) return 'Xato ishladi'; if(isSameElementType({type: 'div', key: '1'}, {type: 'span', key: '1'}) !== false) return 'Xato ishladi'; return null;"
    },
    {
      id: 5,
      title: "React.memo simulyatsiyasi",
      instruction: "`props` obyekti o'zgargan-o'zgarmaganligini yuzaki solishtirish orqali tekshiradigan `shallowEqual(prevProps, nextProps)` funksiyasini yozing. Faqat birinchi darajadagi xossalarni solishtiring.",
      startingCode: "function shallowEqual(prevProps, nextProps) {\n  // kalitlarni solishtiring\n}",
      hint: "if(!prevProps || !nextProps) return prevProps === nextProps; const keys = Object.keys(prevProps); if(keys.length !== Object.keys(nextProps).length) return false; return keys.every(key => prevProps[key] === nextProps[key]);",
      test: "if (typeof shallowEqual !== 'function') return 'Funksiya topilmadi'; if(shallowEqual({a: 1}, {a: 1}) !== true) return 'Xato tekshiruv'; if(shallowEqual({a: 1}, {a: 2}) !== false) return 'Xato tekshiruv 2'; return null;"
    },
    {
      id: 6,
      title: "Pure Component tekshiruvi",
      instruction: "Berilgan class `React.PureComponent` dan meros olgan-olmaganligini aniqlovchi `isPureComponent(ComponentClass)` funksiyasini yozing. `ComponentClass.prototype.isPureReactComponent` ni tekshiring.",
      startingCode: "function isPureComponent(ComponentClass) {\n  // prototype orqali tekshiring\n}",
      hint: "return !!(ComponentClass && ComponentClass.prototype && ComponentClass.prototype.isPureReactComponent);",
      test: "if (typeof isPureComponent !== 'function') return 'Funksiya topilmadi'; class A { isPureReactComponent = true; } class B {} A.prototype = { isPureReactComponent: true }; if(isPureComponent(A) !== true) return 'Topilmadi'; if(isPureComponent(B) !== false) return 'Topildi'; return null;"
    },
    {
      id: 7,
      title: "Props dan funksiyalarni ajratib olish",
      instruction: "Props obyektidan faqat funksiya tipidagi xossalarni yangi obyektga yig'ib qaytaruvchi `getCallbackProps(props)` funksiyasini tuzing.",
      startingCode: "function getCallbackProps(props) {\n  // typeof tekshiring\n}",
      hint: "const res = {}; for(let k in props){ if(typeof props[k]==='function') res[k]=props[k]; } return res;",
      test: "if (typeof getCallbackProps !== 'function') return 'Funksiya topilmadi'; const p = { a: 1, b: () => {} }; if(!getCallbackProps(p).b || getCallbackProps(p).a) return 'Xato ajratildi'; return null;"
    },
    {
      id: 8,
      title: "Portal Node topish",
      instruction: "React elementining `$$typeof` xossasi `Symbol.for('react.portal')` ekanligini tekshiradigan `isPortal(element)` funksiyasini yarating.",
      startingCode: "function isPortal(element) {\n  // typeof element === 'object' va $$typeof ni tekshirish mumkin\n}",
      hint: "return element && element['$$typeof'] === Symbol.for('react.portal');",
      test: "if (typeof isPortal !== 'function') return 'Funksiya topilmadi'; if(isPortal({'$$typeof': Symbol.for('react.portal')}) !== true) return 'Portal topilmadi'; return null;"
    },
    {
      id: 9,
      title: "Concurrent Mode priotitetlari",
      instruction: "Fiber arxitekturasida ustuvorlik balandligini tekshiruvchi `isHighPriority(priorityLevel)` yozing. Level 1, 2 yoki 3 bo'lsa true, undan kattasi false hisoblansin.",
      startingCode: "function isHighPriority(priorityLevel) {\n  // boolean qaytaring\n}",
      hint: "return priorityLevel <= 3;",
      test: "if (typeof isHighPriority !== 'function') return 'Funksiya topilmadi'; if(isHighPriority(2) !== true) return 'Xato'; if(isHighPriority(5) !== false) return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "React.Fragment topish",
      instruction: "Element React.Fragment ekanligini tekshiruvchi `isFragment(element)` yozing. Buning uchun `element.type === Symbol.for('react.fragment')` ni tekshiring.",
      startingCode: "function isFragment(element) {\n  // tekshirish kodi\n}",
      hint: "return element && element.type === Symbol.for('react.fragment');",
      test: "if (typeof isFragment !== 'function') return 'Funksiya topilmadi'; if(isFragment({type: Symbol.for('react.fragment')}) !== true) return 'Xato'; if(isFragment({type: 'div'}) !== false) return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Virtual DOM nima uchun kerak?",
      options: [
        "Real DOM'ga har qanday o'zgartirishni kiritishdan oldin samaraliroq diffing qilib, bitta qadamda o'zgartirish uchun.",
        "Xavfsizlikni oshirish uchun.",
        "CSS animatsiyalarini tezlashtirish uchun.",
        "Database'ni to'g'ridan-to'g'ri yangilash uchun."
      ],
      correctAnswer: 0,
      explanation: "Virtual DOM - real DOM o'zgarishlarining sekinligini chetlab o'tish uchun ishlatiladigan xotiradagi tezkor nusxadir."
    },
    {
      id: 2,
      question: "Reconciliation algoritmining (diffing) murakkabligi (time complexity) qanday?",
      options: [
        "O(n^3)",
        "O(n^2)",
        "O(n)",
        "O(1)"
      ],
      correctAnswer: 2,
      explanation: "React an'anaviy daraxtni solishtirish algoritmini chetlab o'tib, O(n) vaqt talab etadigan maxsus evristik algoritm joriy qilgan."
    },
    {
      id: 3,
      question: "React'da Fiber nimani anglatadi?",
      options: [
        "Yangi komponentlar strukturasi.",
        "React 16 da kiritilgan, ishlarni to'xtatish, davom ettirish va bekor qilish imkonini beruvchi qayta ishlangan yarashtirish (reconciliation) dvigateli.",
        "HTML elementlarining atributlari uchun yangi format.",
        "Xatolarni boshqaruvchi (Error Boundary) komponent."
      ],
      correctAnswer: 1,
      explanation: "Fiber arxitekturasi renderni to'xtatib turish, ustuvorlik berish orqali UI tiqilishlarining (blocking) oldini oladi."
    },
    {
      id: 4,
      question: "Commit Phase davomida nima sodir bo'ladi?",
      options: [
        "Asinxron tarzda komponentlar qayta hisob-kitob qilinadi.",
        "Fiber daraxtida qilingan hisoblangan o'zgarishlar (mutations) to'g'ridan-to'g'ri sinxron ravishda Real DOM'ga qo'llaniladi.",
        "Sorovlar serverga yuboriladi.",
        "Virtual DOM tozalanadi."
      ],
      correctAnswer: 1,
      explanation: "Commit Phase to'xtatib bo'lmaydigan qism bo'lib, hamma o'zgarishlar shu fazada ekranga chiqariladi."
    },
    {
      id: 5,
      question: "React'da elementlar render qilinganda 'key' nima uchun beriladi?",
      options: [
        "CSS orqali elementni topish uchun.",
        "Bu xavfsizlikni ta'minlaydi (CSRF himoyasi).",
        "Bu diffing algoritmi qaysi bolalar (children) o'zgargani, qo'shilgani yoki o'chganligini tezroq aniqlashi uchun yordam beradi.",
        "Elementlarga click eventi ishlashi uchun."
      ],
      correctAnswer: 2,
      explanation: "Key - Virtual DOM solishtirish jarayonida bir xil elementlarni tezkor indentifikatsiya qilish uchun React'ga maslahat."
    },
    {
      id: 6,
      question: "Render Phase to'xtatilishi mumkinmi?",
      options: [
        "Ha, Fiber arxitekturasida Render fazasi asinxron va u yuqoriroq prioritetga ega ish paydo bo'lganda to'xtatilishi mumkin.",
        "Yo'q, Render Phase sinxron va u to'xtatilmaydi.",
        "Faqat Error Boundary ishlaganda to'xtatiladi.",
        "Faqatgina serverda renderlash vaqtida."
      ],
      correctAnswer: 0,
      explanation: "Aynan shu jihat Fiber'ning asosiy ustunligi - Render Phase concurrent tarzda ishlashi va to'xtatilishi mumkinligidir."
    },
    {
      id: 7,
      question: "Ikkita komponentning turi (type) o'zgarsa, React qanday yo'l tutadi?",
      options: [
        "U ularni solishtiradi va faqat farqlarini o'zgartiradi.",
        "U butun komponent daraxtini olib tashlab (unmount), o'rniga yangidan quradi.",
        "U hech narsa qilmaydi, uni foydalanuvchi qo'lda o'zgartirishi kerak.",
        "State'ni saqlab qolgan holda faqat render metodini chaqiradi."
      ],
      correctAnswer: 1,
      explanation: "Evristik qoidalarga ko'ra, agar element tipi o'zgarsa (masalan div dan span ga), React bu joydagi barcha eski tuzilmani buzadi va yangisini quradi."
    },
    {
      id: 8,
      question: "Massivning index'ini key sifatida ishlatish qachon muammo keltirib chiqarishi mumkin?",
      options: [
        "Faqat massiv bo'sh bo'lganda.",
        "Agar elementlar tartibi o'zgarishi, o'chirilishi yoki yangi elementlar qo'shilishi mumkin bo'lganda.",
        "Massiv faqat stringlardan tashkil topganda.",
        "Hech qachon muammo bo'lmaydi."
      ],
      correctAnswer: 1,
      explanation: "Ro'yxatdagi elementning o'rni o'zgarsa, index key xato tarzda eski elementni ko'rsatib, React'ni noto'g'ri state saqlab qolishga olib keladi."
    },
    {
      id: 9,
      question: "Bitta fiber node nima?",
      options: [
        "DOM'dagi html tag (masalan div).",
        "React komponenti haqidagi ma'lumotlarni, uning ishi va bog'liqliklarini o'zida saqlovchi JavaScript obyekti.",
        "Faqat CSS klasslarni tutib turuvchi array.",
        "React'ning global state menejeri."
      ],
      correctAnswer: 1,
      explanation: "Fiber bu xotiradagi bitta ish birligi bo'lib, o'zida virtual stack frame, uning qaysi DOM'ga bog'langanligi va qanday o'zgarish kutayotgani haqida ma'lumotlarni tutadi."
    },
    {
      id: 10,
      question: "Concurreny (Bir vaqtda bajarish) imkoniyati React'da qanday afzallik beradi?",
      options: [
        "Serverga yuboriladigan so'rovlar sonini kamaytiradi.",
        "Main thread block bo'lmasligi uchun UI yangilanishlarini asinxron qilib, bir vaqtda bir nechta ishlarga e'tibor qaratishga yordam beradi.",
        "React komponentlar kodini qisqartiradi.",
        "Faqat mobil qurilmalarda tezlikni oshiradi."
      ],
      correctAnswer: 1,
      explanation: "Bu orqali React eng zarur UI animatsiyalarini avvalroq bajarib, past prioritetli qidiruv natijalarini keyinroq chizishi mumkin."
    },
    {
      id: 11,
      question: "Fiber daraxtidagi 'alternate' xususiyati nimani anglatadi?",
      options: [
        "Foydalanuvchiga muqobil dizayn ko'rsatilishini.",
        "Joriy ishlayotgan Fiber tuguni va uning ustida ish ketayotgan (WIP) muqobil Fiber tuguni bir-biriga yo'naltirilganligini.",
        "Bir elementni bir necha joyda ishlatish mumkinligini.",
        "Faqat Class komponentlar uchun kerakli xususiyat."
      ],
      correctAnswer: 1,
      explanation: "Memory allocation'ni kamaytirish va eski state'ga qaytish uchun React doimo ikkita versiyadagi Fiber nodeni tutib turadi va alternate orqali ular bog'lanadi."
    },
    {
      id: 12,
      question: "Work-in-progress (WIP) daraxti nima?",
      options: [
        "Eski, o'chirib tashlangan komponentlar ro'yxati.",
        "Keyingi Commit fazasida Real DOM'ga aylanadigan va Fiber tomonidan orqa fonda yaratilayotgan yangi Virtual DOM daraxti.",
        "Test uchun mo'ljallangan komponentlar papkasi.",
        "Faqat xato bo'lganda ishlatiladigan fallback UI."
      ],
      correctAnswer: 1,
      explanation: "O'zgarish yuz berganda, React xotirada WIP daraxtini quradi va u tayyor bo'lgandan so'ng (Commit fazasida) ekranga chiziladi."
    }
  ]
};

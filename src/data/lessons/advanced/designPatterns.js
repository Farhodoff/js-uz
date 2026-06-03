export const designPatterns = {
  id: "a13",
  title: "Design Patterns: Singleton, Factory, Observer, Decorator, Strategy",
  theory: `## 1. NEGA kerak?
Katta va murakkab dasturlarda kod tarkibi, obyektlar o'rtasidagi bog'liqliklar tezda chalkashib ketishi mumkin. **Loyihalash andozalari (Design Patterns)** — bu dasturiy ta'minotni loyihalash jarayonida tez-tez uchraydigan muammolarga yozilgan va amaliyotda sinalgan tayyor arxitekturaviy yechimlardir. Ulardan to'g'ri foydalanish kodning qayta ishlatiluvchanligini (reusability), moslashuvchanligini va unga keyinchalik o'zgartirishlar kiritish osonligini ta'minlaydi.

## 2. LANDSHAFТ: ANDOZALAR TOIFALARI
Loyihalash andozalari uchta asosiy guruhga bo'linadi:
1. **Creational (Yaratuvchi):** Obyektlarni xavfsiz va tizimli yaratish mexanizmlari (Singleton, Factory, Builder).
2. **Structural (Tuzilmaviy):** Klasslar va obyektlarni birlashtirib, kattaroq va moslashuvchan tuzilmalar hosil qilish (Decorator, Facade, Adapter, Proxy).
3. **Behavioral (Xulq-atvor):** Obyektlar o'rtasidagi samarali aloqa, mas'uliyatlarni taqsimlash va harakatlar boshqaruvi (Observer, Strategy, State).

---

## 3. CREATIONAL PATTERNS (Ob'ekt Yaratish)

### A. Singleton - Yagona namuna
Butun dastur davomida klassdan faqat bitta namuna (instance) yaratilishini kafolatlaydi (masalan, ma'lumotlar bazasi ulanishi yoki umumiy sozlamalar).
\`\`\`javascript
class Database {
  static instance = null;
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
\`\`\`

### B. Factory - Ob'ekt Yaratish Fabrikasi
Obyekt yaratish jarayonini mijozdan yashirib, uzatilgan parametrga qarab kerakli klassdan obyekt yaratib beruvchi interfeys.

### C. Builder - Murakkab Ob'ekt Quruvchi
Ko'plab sozlamalarga ega obyektlarni bosqichma-bosqich, zanjir usulida (method chaining) yig'ishga yordam beradi.

---

## 4. STRUCTURAL PATTERNS (Obyektlarni Birlashtirish)

### D. Decorator - Dinamik Funksionallik
Mavjud klass kodini o'zgartirmasdan, uni maxsus wrapper (o'rovchi) obyektlar ichiga olib, unga yangi funksionalliklar qo'shish imkoni.

### E. Facade - Murakkab API'ni Soddalashtirish
Orqadagi bir nechta murakkab quyi tizimlarni (subsystems) bitta oddiy va yagona interfeys (klass yoki metod) orqali boshqarish.

---

## 5. BEHAVIORAL PATTERNS (Harakat va Aloqa)

### F. Observer va Publish-Subscribe (PubSub) farqi
- **Observer:** Obyekt (Subject) o'zgarish bo'lganda unga to'g'ridan-to'g'ri obuna bo'lgan kuzatuvchilarni (Observers) chaqiradi (tight coupling).
- **Publish-Subscribe (PubSub):** Nashriyotchi (Publisher) va obunachi (Subscriber) bir-birini mutqalo tanimaydi. Ularning o'rtasida maxsus xabarlar brokeri (Event Channel/Broker) turadi (loose coupling).

\`\`\`mermaid
graph TD
    subgraph Observer Pattern
        Subject[Subject / Obyekt] -->|Bevosita obuna / Chaqiruv| Obs1[Observer 1]
        Subject -->|Bevosita obuna / Chaqiruv| Obs2[Observer 2]
    end

    subgraph PubSub Pattern
        Publisher[Publisher / Nashriyotchi] -->|publish event| Broker[Event Channel / Broker]
        Broker -->|notify / trigger| Subscriber1[Subscriber 1]
        Broker -->|notify / trigger| Subscriber2[Subscriber 2]
    end

    style Subject fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff
    style Broker fill:#d35400,stroke:#e67e22,stroke-width:2px,color:#fff
    style Obs1 fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff
    style Obs2 fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff
    style Subscriber1 fill:#2980b9,stroke:#3498db,stroke-width:2px,color:#fff
    style Subscriber2 fill:#2980b9,stroke:#3498db,stroke-width:2px,color:#fff
\`\`\`

### G. Strategy - Dinamik Algoritm
Muayyan vazifa uchun bir nechta algoritmlarni alohida klasslarga ajratib, ularni runtime (ishlash) davomida almashtirib ishlatish imkoni.

\`\`\`mermaid
classDiagram
    class Order {
        -strategy: PaymentStrategy
        +setStrategy(strategy: PaymentStrategy)
        +processOrder(amount: number)
    }
    class PaymentStrategy {
        <<interface>>
        +pay(amount: number)*
    }
    class CreditCardPayment {
        +pay(amount: number)
    }
    class PayPalPayment {
        +pay(amount: number)
    }
    class CryptoPayment {
        +pay(amount: number)
    }

    Order --> PaymentStrategy : delegates
    PaymentStrategy <|.. CreditCardPayment : implements
    PaymentStrategy <|.. PayPalPayment : implements
    PaymentStrategy <|.. CryptoPayment : implements
\`\`\`

---

## 6. ANTI-PATTERNS (Qochish kerak bo'lgan zararli odatlar)
- **Callback Hell:** Chuqur asinxron zanjirlar. Yechim: Promises, Async/Await yoki RxJS.
- **God Object (Katta Obyekt):** Bitta klass yoki obyekt dasturdagi deyarli barcha mas'uliyatlarni o'z zimmasiga olishi. Yechim: Mas'uliyatlarni bo'lish (Single Responsibility).
- **Spaghetti Code:** Tartibsiz, ketma-ketlik va tizimi bo'lmagan chalkash kod.
- **Copy-Paste Programming:** DRY (Don't Repeat Yourself) qoidasini buzib kodni takrorlash.

## 7. SAVOLLAR VA JAVOBLAR
**1. Singleton andozasini JS-da klasslarsiz qanday yozish mumkin?**
JS modullari (ESM) o'z-o'zidan Singleton hisoblanadi. Moduldan eksport qilingan obyekt butun loyihada bir marta yaratiladi va barcha joyda bitta xotira manziliga ishora qiladi.

**2. Adapter andozasi qachon qo'llaniladi?**
Uchinchi tomon kutubxonasini loyihaga integratsiya qilganda, uning API nomi loyihamizdagi nomlar bilan mos kelmaganda adapter (tarjimon) sifatida o'rab ishlatiladi.

**3. Anti-pattern nima?**
Muammoni hal qilishda dastlab oson tuyulgan, lekin vaqt o'tishi bilan kodni chalkashtirib, qo'shimcha xatolar va qiyinchiliklar keltirib chiqaradigan yomon yondashuv.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Singleton Pattern",
      instruction: "Bitta instance qaytaruvchi Singleton class yarating.",
      startingCode: "class Singleton {\n  static getInstance() {\n    // Bu yerga yozing\n  }\n}\n",
      hint: "static instance = null; if (!instance) instance = new Singleton();",
      test: "if (code.includes('getInstance')) return null; return 'Singleton kerak';"
    },
    {
      id: 2,
      title: "2️⃣ Factory Pattern",
      instruction: "Factory method orqali ob'ekt yarating.",
      startingCode: "class Factory {\n  static create(type) {\n    // Bu yerga yozing\n  }\n}\n",
      hint: "if (type === 'A') return new A();",
      test: "if (code.includes('create')) return null; return 'Factory kerak';"
    },
    {
      id: 3,
      title: "3️⃣ Observer Pattern",
      instruction: "EventEmitter bilan observer yarating.",
      startingCode: "class EventEmitter {\n  on(event, listener) { /* ... */ }\n  emit(event, data) { /* ... */ }\n}\n",
      hint: "this.events[event]?.forEach(...)",
      test: "if (code.includes('on') && code.includes('emit')) return null; return 'Observer kerak';"
    },
    {
      id: 4,
      title: "4️⃣ Decorator Pattern",
      instruction: "Decorator orqali funksionallik qo'shing.",
      startingCode: "class Decorator {\n  constructor(obj) { this.obj = obj; }\n}\n",
      hint: "Wrapper pattern",
      test: "if (code.includes('constructor')) return null; return 'Decorator kerak';"
    },
    {
      id: 5,
      title: "5️⃣ Strategy Pattern",
      instruction: "Turli strategiyalarni o'tqazing.",
      startingCode: "class Context {\n  execute(strategy) {\n    // Bu yerga yozing\n  }\n}\n",
      hint: "strategy.execute();",
      test: "if (code.includes('strategy')) return null; return 'Strategy kerak';"
    },
    {
      id: 6,
      title: "6️⃣ Facade Pattern",
      instruction: "Murakkab API'ni soddalashtirib facade yarating.",
      startingCode: "class Facade {\n  complexOperation() {\n    // Nechta subsystem ul\n  }\n}\n",
      hint: "Bir method'da hammasini yig'ish",
      test: "if (code.includes('Facade')) return null; return 'Facade kerak';"
    },
    {
      id: 7,
      title: "7️⃣ Builder Pattern",
      instruction: "Builder orqali murakkab ob'ekt yarating.",
      startingCode: "class Builder {\n  with(prop, val) { this[prop] = val; return this; }\n  build() { /* ... */ }\n}\n",
      hint: "Method chaining",
      test: "if (code.includes('build')) return null; return 'Builder kerak';"
    },
    {
      id: 8,
      title: "8️⃣ State Pattern",
      instruction: "Holat o'zgarishini state pattern bilan qiling.",
      startingCode: "class Machine {\n  setState(state) { this.state = state; }\n}\n",
      hint: "State almashtirish",
      test: "if (code.includes('setState')) return null; return 'State kerak';"
    },
    {
      id: 9,
      title: "9️⃣ Repository Pattern",
      instruction: "Data access abstraction qiling.",
      startingCode: "class Repository {\n  async getById(id) { /* ... */ }\n  async save(data) { /* ... */ }\n}\n",
      hint: "Database abstraction",
      test: "if (code.includes('getById')) return null; return 'Repository kerak';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ Adapter Pattern",
      instruction: "Birorta API'ni boshqasiga moslang.",
      startingCode: "class Adapter {\n  constructor(oldAPI) { this.api = oldAPI; }\n  newMethod() { return this.api.oldMethod(); }\n}\n",
      hint: "API wrapping",
      test: "if (code.includes('Adapter')) return null; return 'Adapter kerak';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Module Pattern",
      instruction: "Module pattern bilan private/public qiling.",
      startingCode: "const Module = (function() {\n  const private = 'hidden';\n  return { public: () => private };\n})();\n",
      hint: "IIFE pattern",
      test: "if (code.includes('IIFE')) return null; return 'Module kerak';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Kompleks - Pattern Kombinatsiyasi",
      instruction: "Singleton + Factory + Observer birgalikda.",
      startingCode: "// EventEmitter (Observer) + Factory + Singleton\nclass App {\n  static get instance() { /* singleton */ }\n  static createService() { /* factory */ }\n  subscribe(event) { /* observer */ }\n}\n",
      hint: "Uchala pattern birgalikda",
      test: "if (code.includes('instance') && code.includes('create')) return null; return 'Kompleks kerak';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Publish-Subscribe Brokers (createPubSub)",
      instruction: "Publish-Subscribe (PubSub) andozasini (Observer andozasining bo'sh bog'langan ko'rinishi) amalga oshiruvchi `createPubSub()` funksiyasini yozing. U quyidagi uchta metodga ega broker obyektini qaytarsin:\n1) `subscribe(event, handler)` - voqeaga obuna bo'lish (obunachini massivga qo'shish) va obunani bekor qiluvchi `unsubscribe` anonim funksiyasini qaytarish.\n2) `publish(event, data)` - voqea bo'yicha barcha obunachilarni ma'lumotlar bilan ishga tushirish.\n3) `unsubscribe(event, handler)` - obunachini voqea ro'yxatidan o'chirish.",
      startingCode: "function createPubSub() {\n  const events = {};\n  return {\n    subscribe(event, handler) {\n      // Kodni shu yerdan yozing\n    },\n    publish(event, data) {\n      // Kodni shu yerdan yozing\n    },\n    unsubscribe(event, handler) {\n      // Kodni shu yerdan yozing\n    }\n  };\n}",
      hint: "subscribe(event, handler) {\n  if (!events[event]) events[event] = [];\n  events[event].push(handler);\n  return () => this.unsubscribe(event, handler);\n}\npublish(event, data) {\n  events[event]?.forEach(h => h(data));\n}\nunsubscribe(event, handler) {\n  if (!events[event]) return;\n  events[event] = events[event].filter(h => h !== handler);\n}",
      test: "if (typeof createPubSub !== 'function') return 'createPubSub funksiya emas';\nconst broker = createPubSub();\nlet resData = null;\nconst unsub = broker.subscribe('test', (data) => { resData = data; });\nbroker.publish('test', 'hello');\nif (resData !== 'hello') return 'Hodisa to\\'g\\'ri publish qilinmadi';\nif (typeof unsub !== 'function') return 'subscribe() unsubscribe funksiyasini qaytarmadi';\nunsub();\nbroker.publish('test', 'world');\nif (resData !== 'hello') return 'Obuna bekor qilingandan so\\'ng ham chaqirildi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ SQL Query Builder (createBuilder)",
      instruction: "SQL so'rovlarini bosqichma-bosqich, zanjir usulida (method chaining) yig'ib beruvchi `createBuilder()` funksiyasini (Query Builder andozasi) yozing. U quyidagi zanjir metodlariga ega bo'lishi shart:\n- `select(fields)` - tanlanadigan ustunlar nomi (string).\n- `from(table)` - jadval nomi.\n- `where(condition)` - filtrlash sharti.\n- `build()` - yig'ilgan so'rovni SQL matn ko'rinishida (string) qaytaradi. Metodlar zanjiri ishlashi uchun mos metodlarda `this` qaytaring. Sukut bo'yicha fields `*` bo'lsin.",
      startingCode: "function createBuilder() {\n  // Kodni shu yerdan yozing\n}",
      hint: "return {\n  _select: '*',\n  _from: '',\n  _where: '',\n  select(fields) { this._select = fields; return this; },\n  from(table) { this._from = table; return this; },\n  where(cond) { this._where = cond; return this; },\n  build() {\n    let sql = `SELECT ${this._select} FROM ${this._from}`;\n    if (this._where) sql += ` WHERE ${this._where}`;\n    return sql;\n  }\n};",
      test: "if (typeof createBuilder !== 'function') return 'createBuilder funksiya emas';\nconst builder = createBuilder();\nconst q = builder.select('id, title').from('posts').where('status = 1').build();\nif (q !== 'SELECT id, title FROM posts WHERE status = 1') return 'SQL query noto\\'g\\'ri yig\\'ildi';\nconst builder2 = createBuilder();\nif (typeof builder2.select('a') !== 'object' || typeof builder2.select('a').from !== 'function') return 'Metodlar zanjiri (method chaining) to\\'g\\'ri ishlamadi (return this; tekshiring)';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Dasturlashda Singleton naqshi (Design Pattern) qanday maqsadlarda ishlatiladi?",
      options: [
        "Obyekt yaratish tezligini 10 barobarga oshirish",
        "Butun dastur davomida ma'lum bir klassdan faqat va faqat bitta namuna (instance) yaratilishini va unga yagona global kirish nuqtasini ta'minlash (masalan, Database connection, Config settings)",
        "Har xil turdagi obyektlarni bitta joyda guruhlash",
        "Klasslarni funksiyaga o'zgartirish"
      ],
      correctAnswer: 1,
      explanation: "Singleton klassi o'zining yagona namunasini statik xususiyatda saqlaydi va ikkinchi marta yaratmoqchi bo'lganda yangisini yaratmasdan o'sha birinchisini qaytaradi. Bu resurslarni tejash va umumiy holatni bitta joyda saqlash uchun juda foydali."
    },
    {
      id: 2,
      question: "Obyekt yaratish jarayonini (new operatorini) to'g'ridan-to'g'ri chaqirish o'rniga, uning turiga qarab alohida maxsus metod (yoki klass) orqali obyektdan nusxa olib beradigan yaratuvchi (creational) naqsh qaysi?",
      options: [
        "Observer Pattern",
        "Factory Pattern",
        "Decorator Pattern",
        "Strategy Pattern"
      ],
      correctAnswer: 1,
      explanation: "Factory pattern obyekt yaratish logikasini o'ziga oladi. Dasturchi unga qaysi turdagi obyekt kerakligini string yoki parametr orqali aytadi va Factory kerakli klassdan obyekt yaratib beradi."
    },
    {
      id: 3,
      question: "JavaScript-da `addEventListener` metodi qaysi mashhur xulq-atvor (behavioral) naqshiga asoslangan holda ishlaydi?",
      options: [
        "Singleton Pattern",
        "Observer (yoki Publish-Subscribe) Pattern",
        "Facade Pattern",
        "Adapter Pattern"
      ],
      correctAnswer: 1,
      explanation: "Observer naqshi biror obyektda (subject) o'zgarish bo'lganda, unga obuna bo'lgan boshqa ko'plab obyektlarni (observers) avtomat xabardor qilish uchun ishlatiladi. `addEventListener` aynan klik yoki boshqa hodisalarga obuna bo'lish namunasidir."
    },
    {
      id: 4,
      question: "Mavjud klassning kodini o'zgartirmasdan yoki undan vorislik (inheritance) olmasdan turib, unga dinamik ravishda yangi funksionallik yoki xatti-harakatlarni qo'shish (o'rash) imkonini beruvchi tarkibiy (structural) naqsh qaysi?",
      options: [
        "Decorator Pattern",
        "Singleton Pattern",
        "Factory Pattern",
        "Strategy Pattern"
      ],
      correctAnswer: 0,
      explanation: "Decorator naqshi asl obyektni o'rab oladigan boshqa wrapper-klasslar orqali uning xatti-harakatlarini kengaytiradi (masalan, oddiy qahvaga sut yoki shakar qo'shimchalarini qo'shib uning cost() funksiyasi qiymatini oshirish)."
    },
    {
      id: 5,
      question: "Bir nechta murakkab va chalkash quyi tizimlar (subsystems) ustidan oddiy va yagona interfeys taqdim etuvchi (masalan, to'lov qilish, email jo'natish va log yozishni bitta methodga birlashtiruvchi) naqsh qaysi?",
      options: [
        "Proxy Pattern",
        "Facade Pattern",
        "Strategy Pattern",
        "State Pattern"
      ],
      correctAnswer: 1,
      explanation: "Facade (Tashqi ko'rinish) naqshi murakkab quyi tizimlarni bitta sodda klass yoki metod orqali boshqarish interfeysini yaratib beradi, natijada mijoz (client) ichki detallar bilan chalkashmaydi."
    },
    {
      id: 6,
      question: "Biror klassning interfeysini mijoz (client) kutayotgan boshqa interfeysga moslashtirish uchun qaysi strukturaviy (structural) naqsh ishlatiladi?",
      options: [
        "Adapter Pattern",
        "Singleton Pattern",
        "Strategy Pattern",
        "Observer Pattern"
      ],
      correctAnswer: 0,
      explanation: "Adapter naqshi mos kelmaydigan interfeysga ega bo'lgan ikki xil klassning birgalikda ishlashini ta'minlash uchun xizmat qiladi (xuddi rozetka adapteri kabi)."
    },
    {
      id: 7,
      question: "Murakkab obyektlarni bosqichma-bosqich, zanjir (method chaining) usulida yaratishga mo'ljallangan naqsh qaysi?",
      options: [
        "Builder Pattern",
        "Factory Pattern",
        "Facade Pattern",
        "Decorator Pattern"
      ],
      correctAnswer: 0,
      explanation: "Builder naqshi ko'plab parametrlarga ega murakkab obyektlarni bosqichma-bosqich va toza usulda (masalan, new UserBuilder().withName('Ali').withAge(25).build()) yaratish uchun qo'llaniladi."
    },
    {
      id: 8,
      question: "Obyektning ichki holati (state) o'zgarganda, uning xatti-harakati kavob berishini ta'minlovchi xulq-atvor naqshi qaysi?",
      options: [
        "State Pattern",
        "Strategy Pattern",
        "Facade Pattern",
        "Adapter Pattern"
      ],
      correctAnswer: 0,
      explanation: "State naqshida obyekt o'zining holatiga mos keladigan alohida 'State' klass obyektiga so'rovlarni delegatsiya qiladi, holat o'zgarganda esa boshqa 'State' klassiga o'tadi."
    },
    {
      id: 9,
      question: "Tizimdagi ma'lumotlar bazasiga kirish (data access) logikasini biznes logikadan ajratib olish va abstraktsiya qilish uchun qaysi me'moriy (architectural) naqsh ishlatiladi?",
      options: [
        "Repository Pattern",
        "Factory Pattern",
        "Strategy Pattern",
        "Singleton Pattern"
      ],
      correctAnswer: 0,
      explanation: "Repository naqshi ma'lumotlarni saqlash va o'qish logikasini (masalan, SQL so'rovlarini) ma'lumotlar bazasidan ajratib, umumiy interfeys orqali taqdim etadi."
    },
    {
      id: 10,
      question: "Muayyan vazifani bajarish uchun turli xil algoritmlar guruhini yaratish va ularni dinamik ravishda bir-biriga almashtirish imkonini beruvchi naqsh qaysi?",
      options: [
        "Strategy Pattern",
        "Observer Pattern",
        "Decorator Pattern",
        "Singleton Pattern"
      ],
      correctAnswer: 0,
      explanation: "Strategy naqshi turli algoritmlarni (masalan, turli to'lov usullarini: PayPal, CreditCard) alohida klasslarga ajratib, ularni bir-birining o'rnida oson ishlatish imkonini beradi."
    },
    {
      id: 11,
      question: "JavaScript-da o'zgaruvchilarni tashqi dunyodan yashirish (encapsulation) va faqat kerakli qismlarini public qilishda qaysi an'anaviy naqshdan foydalaniladi?",
      options: [
        "Module Pattern (IIFE yordamida)",
        "Facade Pattern",
        "Singleton Pattern",
        "Decorator Pattern"
      ],
      correctAnswer: 0,
      explanation: "Module naqshi JavaScript-da scope va IIFE (Immediately Invoked Function Expression) yordamida private o'zgaruvchilar yaratish va faqat ma'lum bir API'larni qaytarish uchun klassik usul hisoblanadi."
    },
    {
      id: 12,
      question: "Dasturlashda \"Anti-pattern\" (anti-andoza) iborasi nimani anglatadi?",
      options: [
        "Kod yozishda keng tarqalgan, ammo samarasiz, xavfli yoki muammolarga olib keladigan noto'g'ri yondashuvlar",
        "Faqat yangi boshlovchilar yozadigan kodlar",
        "Dasturdagi sintaktik xatolar ro'yxati",
        "Loyihani tezroq yakunlash uchun ishlatiladigan eng yaxshi usullar"
      ],
      correctAnswer: 0,
      explanation: "Anti-pattern — muammoni hal qilishda dastlab oson ko'ringan, biroq kelajakda kodni o'zgartirishni qiyinlashtiradigan, chalkash va samarasiz yechimlardir (masalan, Spaghetti code, Callback hell)."
    },
    {
      id: 13,
      question: "Observer naqshi (Pattern) va Publish-Subscribe (PubSub) naqshi o'rtasidagi asosiy arxitekturaviy farq nimada?",
      options: [
        "Observer sinxron, PubSub esa har doim faqat asinxron ishlaydi",
        "Observer-da Subject va Observer bir-biri haqida bevosita biladi (tight coupling); PubSub-da esa ular o'rtasida vositachi kanal/broker (Event Channel/Broker) turadi va ular bir-birini mutqalo tanimaydi (loose coupling)",
        "PubSub faqat serverlarda, Observer esa faqat brauzerda ishlatiladi",
        "Ular o'rtasida hech qanday farq yo'q, ikkalasi bitta narsa"
      ],
      correctAnswer: 1,
      explanation: "Observer naqshida Subject o'zining kuzatuvchilari (Observers) ro'yxatini bevosita saqlaydi va ularni chaqiradi. PubSub naqshida esa obunachilar ham, nashriyotchilar ham faqat umumiy Event Broker (xabarlar kanali) bilan muloqot qiladi, bu esa ularning o'zaro bog'liqligini (coupling) yo'qotadi."
    },
    {
      id: 14,
      question: "Decorator va Adapter andozalari o'rtasidagi farq nimada?",
      options: [
        "Decorator creational pattern, Adapter esa behavioral pattern",
        "Decorator obyektning interfeysini o'zgartirmasdan unga yangi funksionallik qo'shadi (o'raydi); Adapter esa mavjud mos kelmaydigan interfeysni boshqa kerakli interfeysga moslashtirib beradi",
        "Decorator faqat massivlar bilan ishlaydi, Adapter esa faqat obyektlar bilan",
        "Ular mutqalo boshqa tillarda ishlatiladi, JS da qo'llanilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Decorator obyekt interfeysini saqlab qolgan holda uning imkoniyatlarini kengaytiradi (wrapper). Adapter esa ikki xil interfeysni o'zaro bog'lash (translatsiya qilish) uchun xizmat qiladi."
    }
  ]
};

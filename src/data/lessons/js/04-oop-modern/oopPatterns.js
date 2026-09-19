export const oopPatterns = {
  id: "oopPatterns",
  title: "OOP Design Patterns: Singleton, Observer, Factory, Module",
  language: "javascript",
  theory: `## 1. 💡 Part 1: Sodda Tushuntirish (Beginner Analogy)

**Design pattern** — takrorlanadigan muammolarga yechim topilgan "ishonchli retseptlar". Ular kodni yozish emas, **arxitekturani** tashkil qiladi.

### Real hayotiy o'xshatish
- **Singleton** — mamlakatdagi bitta Prezident: "bir necha bor tanlansangiz ham, aynan shu odam".
- **Observer** — YouTube kanaliga obuna: yangi video chiqsa — **barcha obunachilar** avtomatik xabar oladi.
- **Factory** — restorandagi buyurtma tizimi: "Pitsa bering" — sizga **qanday turda** pishirilishini oshxona hal qiladi.
- **Module** — apartament: sizning buyumlaringiz ichda, faqat **esbqo'ng'iroq (public API)** tashqariga chiqadi.

\`\`\`javascript
// ============ 1. SINGLETON ============
class Config {
  static #instance = null;

  constructor() {
    if (Config.#instance) {
      return Config.#instance; // allaqachon bor — o'shanni qaytar
    }
    this.settings = {};
    Config.#instance = this;
  }
}

const a = new Config();
const b = new Config();
console.log(a === b); // true — bitta obyekt!

// ============ 2. OBSERVER (Pub/Sub) ============
class Channel {
  #subscribers = [];

  subscribe(fn) {
    this.#subscribers.push(fn);
    return () => this.unsubscribe(fn); // obunani bekor qilish
  }
  unsubscribe(fn) {
    this.#subscribers = this.#subscribers.filter(f => f !== fn);
  }
  publish(video) {
    this.#subscribers.forEach(fn => fn(video)); // hammasiga xabar
  }
}

// ============ 3. FACTORY ============
class PizzaFactory {
  static create(type) {
    switch (type) {
      case "pepperoni": return { type, price: 50000 };
      case "margarita": return { type, price: 40000 };
      default: throw new Error("Noma'lum pitsa turi");
    }
  }
}

// ============ 4. MODULE (Revealing Module) ============
const UserModule = (() => {
  const users = []; // private state

  return { // public API
    add(name) { users.push(name); },
    count() { return users.length; }
  };
})();
\`\`\`

---

## 2. ⚙️ Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

### Singleton — qachon va qanday xavfsizroq?
Klassik Singleton testlarni murakkablashtiradi (global holat) va ko'p oqimli muhitda (Worker'lar) har biri o'z nusxasini yaratadi. Zamonaviy JS'da **modul o'zi singleton** — ESM moduli bir marta baholanadi:

\`\`\`javascript
// config.js — modul darajasidagi singleton (afzal usul)
export const config = { env: "prod" };
// istalgan joyda import qilsangiz — bir xil obyekt
\`\`\`

Klassik Singleton hali ham intervyu standarti, lekin amalda \`export const\` ko'proq ishlatiladi.

### Observer — React'ning ruhi
Observer pattern — **event-driven arxitektura** asosi. React'dagi \`setState\` → re-render, Zustand'dagi \`subscribe\`, DOM'dagi \`addEventListener\` — barchasi Observer. Bir muhim tafsilot: **obunani bekor qilish** (unsubscribe) — aks holda **memory leak**:

\`\`\`javascript
const unsub = channel.publish; // xato — metodni uzib olmoq
// To'g'ri: channel.publish(...) yoki bind/arrow bilan
const stop = channel.subscribe(handler);
stop(); // komponent unmount bo'lganda albatta chaqiring
\`\`\`

### Factory — holatga qarab turlarni tanlash
\`\`\`javascript
class LoggerFactory {
  static create(env) {
    if (env === "prod") return new ProdLogger();  // kichik loglar
    return new DevLogger();                       // batafsil loglar
  }
}
// Chaqiruvchi kod Hech qachon ProdLogger nomini bilishi shart emas
\`\`\`

Bu **Dependency Injection** bilan birga ishlatilganda — test uchun mock obyektlarni qo'yish osonlashadi.

### Module pattern tarixi
ES6 modullaridan oldin IIFE + closure — yagona yechim edi. Hozir \`Revealing Module Pattern\` yaxshi uslub sifatida qoladi (kichik yopiq modullar uchun), katta fayllar esa ESM fayllariga ajratiladi.

---

## 3. ⚠️ Part 3: Murakkab Holatlar va Senior Intervyu Savollari (Edge Cases)

### 1. Singleton vs Static class farqi
\`\`\`javascript
// Static: instansiya umuman yaratilmaydi
class StaticConfig {
  static env = "prod";
  static get() { return StaticConfig.env; }
}

// Singleton: bitta instansiya (holat saqlaydi, inheritance mumkin)
class Config { static #instance = null; }
\`\`\`
Static — funksiyalar to'plami; Singleton — holatli obyekt. Singleton \`extends\` qilinadi, statik — yo'q.

### 2. Observer'da xato ishlovi
Bir obunachida xato — barchaning ishlashini to'xtatmasin:

\`\`\`javascript
publish(event) {
  for (const fn of [...this.#subscribers]) { // nusxa — iterate paytida o'zgarishdan himoya
    try {
      fn(event);
    } catch (e) {
      console.error("Subscriber xatosi:", e);
    }
  }
}
\`\`\`

### 3. Abstract Factory va Simple Factory farqi
- **Simple Factory** — bitta \`create(type)\` switch bilan (ko'pincha "factory" deyilganda shu nazarda tutiladi).
- **Factory Method** — voris klasslar metodni override qiladi.
- **Abstract Factory** — **oilalarini** yaratadi (\`createUI()\` → WindowsUI / MacUI, har biri bir necha elementni yaratadi).

### 4. Module pattern'ning katta modullarda muammosi
IIFE modullar testda "qattiqlashadi" (ichki qismini almashtirib bo'lmaydi) va tree-shaking ishlamaydi. ESM'da \`export\`/\`import\` statik tahlil qilinadi — bundle optimizatsiyasi mumkin.

### 5. Singleton va testing
\`Config.#instance\` ni testlar orasida tozalash uchun \`static reset()\` metodi yoki \`Reflect.construct\` himoyalari kerak bo'lishi mumkin — intervyuda "singleton testlanishi" haqida so'ralsa, shu muammoni aytib berish seniorlik belgisi.

---

## 4. 📊 Mermaid Diagrammasi

Observer pattern oqimi:

\`\`\`mermaid
graph TD
    A["Channel (Subject)"] -->|"subscribe(fn)"| B["Obunachi 1"]
    A -->|"subscribe(fn)"| C["Obunachi 2"]
    A -->|"subscribe(fn)"| D["Obunachi 3"]
    E["publish(video)"] --> A
    A -->|"fn1(video)"| B
    A -->|"fn2(video)"| C
    A -->|"fn3(video)"| D
    style A fill:#f9f,stroke:#333
    style E fill:#bbf,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Singleton klass",
      instruction: "`Counter` singleton klassi yozing: `static #instance` bilan har `new Counter()` bir xil obyekt qaytarsin. Natija: `new Counter() === new Counter()`.",
      startingCode: "class Counter {\n  static #instance = null;\n  constructor() {\n    // singleton logikani yozing\n  }\n  count = 0;\n}",
      hint: "if (Counter.#instance) return Counter.#instance; Counter.#instance = this;",
      test: "const fn = new Function(code + '; return new Counter() === new Counter();'); if (fn() === true) return null; return 'Ikkala new bir xil obyektni qaytarishi kerak';"
    },
    {
      id: 2,
      title: "Modul singleton",
      instruction: "`createStore()` funksiyasini yozing: birinchi chaqiruvda `{ state: {}, }` obyekt yaratib saqlaydi, keyingi chaqiruvlar **shu obyektni** qaytaradi.",
      startingCode: "function createStore() {\n  // kesh bilan yozing\n}",
      hint: "let inst = null; function createStore() { if (!inst) inst = { state: {} }; return inst; }",
      test: "const fn = new Function(code + '; const a = createStore(); const b = createStore(); a.state.x = 1; return b.state.x === 1;'); if (fn() === true) return null; return 'Ikkala chaqiruv bir xil obyektni qaytarishi kerak';"
    },
    {
      id: 3,
      title: "Observer subscribe",
      instruction: "`Channel` klassi yozing: `#subscribers` massiv, `subscribe(fn)` — qo'shsin, `publish(msg)` — barchani chaqirsin.",
      startingCode: "class Channel {\n  // subscribe va publish metodlarini yozing\n}",
      hint: "#subscribers = []; subscribe(fn) { this.#subscribers.push(fn); } publish(m) { this.#subscribers.forEach(f => f(m)); }",
      test: "const fn = new Function(code + '; const c = new Channel(); let got = null; c.subscribe(m => got = m); c.publish(\\'x\\'); return got;'); if (fn() === 'x') return null; return 'publish barcha obunachilarni chaqirishi kerak';"
    },
    {
      id: 4,
      title: "Unsubscribe",
      instruction: "`Channel` klassiga `subscribe` qaytaradigan `unsubscribe` imkonini qo'shing: `subscribe` funksiya qaytarsin, chaqirilsa obuna o'chirilsin.",
      startingCode: "class Channel {\n  #subscribers = [];\n  subscribe(fn) {\n    // qo'shing va o'chirish funksiyasini qaytaring\n  }\n  publish(msg) { this.#subscribers.forEach(f => f(msg)); }\n}",
      hint: "subscribe(fn) { this.#subscribers.push(fn); return () => { this.#subscribers = this.#subscribers.filter(f => f !== fn); }; }",
      test: "const fn = new Function(code + '; const c = new Channel(); let got = null; const stop = c.subscribe(m => got = m); stop(); c.publish(\\'x\\'); return got;'); if (fn() === null) return null; return 'stop() chaqirilgach publish xabar bermasligi kerak';"
    },
    {
      id: 5,
      title: "Xatoga chidamli publish",
      instruction: "`Channel.publish` ichida har bir obunachini `try/catch` bilan chaqiring — bittasi xato tashlasa ham qolganlari ishlasin.",
      startingCode: "class Channel {\n  #subscribers = [];\n  subscribe(fn) { this.#subscribers.push(fn); }\n  publish(msg) {\n    // try/catch bilan chaqiring\n  }\n}",
      hint: "for (const f of this.#subscribers) { try { f(msg); } catch(e) {} }",
      test: "const fn = new Function(code + '; const c = new Channel(); let got = null; c.subscribe(() => { throw new Error(\\'x\\'); }); c.subscribe(m => got = m); c.publish(\\'hi\\'); return got;'); if (fn() === 'hi') return null; return 'Bir obunachi xatosi boshqalarni to\\'xtatmasligi kerak';"
    },
    {
      id: 6,
      title: "Factory",
      instruction: "`ShapeFactory.create(type)` statik metodi yozing: `circle` → `{ type: 'circle', area: 0 }`, `square` → `{ type: 'square', area: 0 }`, boshqasi — Error tashlaydi.",
      startingCode: "class ShapeFactory {\n  // create statik metodini yozing\n}",
      hint: "static create(t) { if (t === 'circle' || t === 'square') return { type: t, area: 0 }; throw new Error('Unknown'); }",
      test: "const fn = new Function(code + '; const a = ShapeFactory.create(\\'circle\\'); try { ShapeFactory.create(\\'x\\'); return \\'no\\'; } catch(e) { return a.type; }'); if (fn() === 'circle') return null; return 'Noma\\'lum turda Error tashlanishi kerak';"
    },
    {
      id: 7,
      title: "Revealing Module",
      instruction: "`createCart()` funksiyasini yozing: closure ichida `items` massiv, qaytariladigan API: `add(name)` va `count()`.",
      startingCode: "function createCart() {\n  // closure modul yozing\n}",
      hint: "const items = []; return { add: (n) => items.push(n), count: () => items.length };",
      test: "const fn = new Function(code + '; const c = createCart(); c.add(\\'a\\'); c.add(\\'b\\'); return c.count();'); if (fn() === 2) return null; return 'count() 2 qaytarishi kerak';"
    },
    {
      id: 8,
      title: "Event emitter (Telegram uslubi)",
      instruction: "`Emitter` klassi: `on(event, fn)`, `emit(event, data)`. Faqat shu event'ga yozilgan obunachilar chaqirilsin (bir necha event turini qo'llash).",
      startingCode: "class Emitter {\n  // on va emit metodlarini yozing\n}",
      hint: "#map = new Map(); on(e, fn) { if (!this.#map.has(e)) this.#map.set(e, []); this.#map.get(e).push(fn); } emit(e, d) { (this.#map.get(e) || []).forEach(f => f(d)); }",
      test: "const fn = new Function(code + '; const e = new Emitter(); let a = null; e.on(\\'login\\', d => a = d); e.emit(\\'other\\', 1); e.emit(\\'login\\', 5); return a;'); if (fn() === 5) return null; return 'Event bo\\'yicha ajratilgan obuna ishlashi kerak';"
    },
    {
      id: 9,
      title: "Factory Method (voris orqali)",
      instruction: "`Logger` klassida `create()` — `new this()` qaytarsin. `FileLogger extends Logger` yozing. `Logger.create()` — Logger, `FileLogger.create()` — FileLogger nusxa qaytarsin.",
      startingCode: "class Logger {\n  // create metodini yozing\n}\nclass FileLogger extends Logger {}",
      hint: "static create() { return new this(); }",
      test: "const fn = new Function(code + '; return [Logger.create() instanceof Logger, FileLogger.create() instanceof FileLogger];'); const r = fn(); if (r && r[0] === true && r[1] === true) return null; return 'new this() vorislar bilan to\\'g\\'ri ishlashi kerak';"
    },
    {
      id: 10,
      title: "Singleton bilan Config",
      instruction: "`AppConfig` singleton yozing: birinchi yaratilishida `debug = false` bo'lsin. Ikkinchi nusxada `debug = true` o'zgartirilsa — birinchi nusxada ham ko'rinadi (aynan shu obyekt!).",
      startingCode: "class AppConfig {\n  static #instance = null;\n  debug = false;\n  constructor() {\n    // singleton logika\n  }\n}",
      hint: "if (AppConfig.#instance) return AppConfig.#instance; AppConfig.#instance = this;",
      test: "const fn = new Function(code + '; const a = new AppConfig(); const b = new AppConfig(); b.debug = true; return a.debug === true;'); if (fn() === true) return null; return 'Ikkala nusxa aynan bitta obyekt bo\\'lishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Singleton pattern nimani ta'minlaydi?",
      options: [
        "Cheksiz nusxalar",
        "Faqat bitta instansiya mavjudligini",
        "Klasslarni o'chirishni",
        "Tezroq kompilyatsiyani"
      ],
      correctAnswer: 1,
      explanation: "Singleton — klassning faqat bitta nusxasi yaratilishi va global kirish nuqtasi berilishi."
    },
    {
      id: 2,
      question: "Observer pattern qanday bog'lanishni yaratadi?",
      options: [
        "Chaqiruvchi → obunachilar (1 ko'p)",
        "Faqat 1 ga 1",
        "Massiv → obyekt",
        "Hech qanday bog'lanish"
      ],
      correctAnswer: 0,
      explanation: "Subject holati o'zgarganda barcha obunachilar (subscriber) xabar oladi — 1→ko'p bog'lanish."
    },
    {
      id: 3,
      question: "ESM modullar qanday tabiiy patternni ta'minlaydi?",
      options: ["Observer", "Singleton (bir marta baholanadi)", "Factory", "Decorator"],
      correctAnswer: 1,
      explanation: "ESM moduli birinchi importda bir marta baholanadi va keshlanadi — modul o'zi singleton."
    },
    {
      id: 4,
      question: "Factory patternning asosiy foydasi?",
      options: [
        "Kod qisqaradi",
        "Yaratish logikasini chaqiruvchidan yashirish",
        "Xotira tejash",
        "Async ishlash"
      ],
      correctAnswer: 1,
      explanation: "Factory — 'qanday' klass yaratilishini yashiradi; chaqiruvchi faqat shartnomaga tayanadi."
    },
    {
      id: 5,
      question: "Module pattern qanday mexanizmga tayanadi?",
      options: ["Prototipga", "Closure'ga", "Recursiyaga", "Hoisting'ga"],
      correctAnswer: 1,
      explanation: "IIFE + closure — private holatni yashirib, faqat public API qaytaradi."
    },
    {
      id: 6,
      question: "Obunachilardan biri xato tashlasa, ideal publish nima qiladi?",
      options: [
        "Butunlay to'xtaydi",
        "Xatoni yutib, qolganlarini davom ettiradi",
        "Obunani o'chiradi",
        "Processni o'ldiradi"
      ],
      correctAnswer: 1,
      explanation: "Har bir obunachi try/catch ichida chaqiriladi — bitta xato butun tizimni buzmasligi kerak."
    },
    {
      id: 7,
      question: "Obunani bekor qilmaslik nimaga olib keladi?",
      options: ["Tezlashish", "Memory leak", "Xatolik", "Hech narsa"],
      correctAnswer: 1,
      explanation: "Obunachi funksiyaga havola saqlanib qoladi — GC tozalamaydi, xotira sizib qoladi."
    },
    {
      id: 8,
      question: "`addEventListener` qanday pattern namoyishi?",
      options: ["Singleton", "Observer", "Module", "MVC"],
      correctAnswer: 1,
      explanation: "DOM hodisalari — eng ko'p tarqalgan Observer: hodisa kelganda barcha listenerlar ishlaydi."
    },
    {
      id: 9,
      question: "Singleton va statik klass farqi?",
      options: [
        "Farq yo'q",
        "Singleton — holatli instansiya; static — instansiyasiz funksiyalar",
        "Static tezroq",
        "Singleton faqat browser'da"
      ],
      correctAnswer: 1,
      explanation: "Singleton — bitta obyekt (extends mumkin); statik klass — oddiy nomlar to'plami."
    },
    {
      id: 10,
      question: "Revealing Module pattern nima ochib beradi?",
      options: [
        "Barcha o'zgaruvchilarni",
        "Faqat tanlab public API'ni",
        "Global window'ni",
        "Ichki funksiyalarni"
      ],
      correctAnswer: 1,
      explanation: "Faqat qaytarilgan obyekt tashqariga chiqadi — qolgani closure'da yashirin."
    },
    {
      id: 11,
      question: "`new this()` static factory ichida nima qiladi?",
      options: [
        "Xatolik beradi",
        "Chaqirilgan klass (voris bo'lsa voris) nusxasini yaratadi",
        "Ota klass nusxasini yaratadi",
        "undefined qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Statik metodda `this` = klass; vorisdan chaqirilsa — voris nusxasi yaratiladi (Factory Method)."
    },
    {
      id: 12,
      question: "Singleton klassni testlash qiyinligi nima?",
      options: [
        "Tez ishlamaydi",
        "Global holat testlar orasida qoladi (izolyatsiya buziladi)",
        "Sintaksis xato beradi",
        "Muammo yo'q"
      ],
      correctAnswer: 1,
      explanation: "Singleton holati testlar orasida saqlanib qoladi — reset mexanizmi kerak bo'ladi."
    }
  ]
};

export const eventSourcingCqrs = {
  id: "eventSourcingCqrs",
  title: "Event Sourcing va CQRS (Command Query Responsibility Segregation)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Tizim dizaynida an'anaviy ma'lumotlar bazasi bilan ishlashda biz faqat joriy holatni (Current State) saqlaymiz. Masalan, foydalanuvchi balansida $100 bor. Agar u yana $50 qo'shsa, bazadagi qiymat $150 ga yangilanadi (UPDATE). Lekin bu balans ushbu holatga kelgunicha qanday bosqichlarni bosib o'tgani haqidagi tarixiy ma'lumot yo'qoladi.

**Event Sourcing** va **CQRS** ushbu muammoni hal qiladi:

### Analogiya: Bank Daftarchasi (Ledger) vs Seif
* **An'anaviy CRUD:** Bu seifga o'xshaydi. Seifni ochasiz, ichida qancha pul borligini ko'rasiz va pul qo'shib/olib yopasiz. Siz faqat oxirgi pul miqdorini bilasiz.
* **Event Sourcing:** Bu bank daftarchasi yoki buxgalteriya kitobiga o'xshaydi. Unda hech narsa o'chirilmaydi va o'zgartirilmaydi (Immutable). Har bir tranzaksiya alohida yozib boriladi:
  1. *Foydalanuvchi hisob ochdi (+100 USD)*
  2. *Foydalanuvchi pul o'tkazdi (-30 USD)*
  3. *Foydalanuvchi pul kiritdi (+80 USD)*
  Joriy balansni bilish uchun siz boshidan boshlab barcha amallarni qayta hisoblab chiqasiz: \\\`100 - 30 + 80 = 150\\\`.
* **CQRS (Command Query Responsibility Segregation):** Bu yozish va o'qish vazifalarini alohida-alohida ajratishdir.
  Tasavvur qiling, bankda bitta buxgalter faqat yangi tranzaksiyalarni kitobga tez-tez yozib boradi (**Command / Write Model**). Ikkinchi buxgalter esa mijozlarga hisobot (balans, oylik statistika) ko'rsatish uchun bu yozilgan ma'lumotlarni chiroyli jadvallarga jamlab beradi (**Query / Read Model**).

---

## 2. 💻 Real Kod Misollari

Quyida Event Sourcing va CQRS oqimining Javascript-dagi soddalashtirilgan simulyatsiyasi keltirilgan:

\\\`\\\`\\\`javascript
// 1. Event Store (Faqat qo'shiladigan voqealar ombori)
class EventStore {
  constructor() {
    this.events = [];
    this.subscribers = [];
  }

  append(event) {
    this.events.push(event);
    this.notify(event);
  }

  notify(event) {
    this.subscribers.forEach(sub => sub(event));
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  getEvents(aggregateId) {
    return this.events.filter(e => e.aggregateId === aggregateId);
  }
}

// 2. Write Model (Command Handler va Aggregate)
class BankAccountAggregate {
  constructor(id, eventStore) {
    this.id = id;
    this.eventStore = eventStore;
  }

  // Biznes qoidalar (Command validations)
  deposit(amount) {
    if (amount <= 0) throw new Error("Miqdor musbat bo'lishi kerak");
    this.eventStore.append({
      id: Math.random().toString(36).substr(2, 9),
      aggregateId: this.id,
      type: 'MoneyDeposited',
      data: { amount },
      timestamp: Date.now()
    });
  }

  withdraw(amount, currentBalance) {
    if (amount <= 0) throw new Error("Nol yoki undan kam pul yechib bo'lmaydi");
    if (currentBalance < amount) throw new Error("Mablag' yetarli emas");
    this.eventStore.append({
      id: Math.random().toString(36).substr(2, 9),
      aggregateId: this.id,
      type: 'MoneyWithdrawn',
      data: { amount },
      timestamp: Date.now()
    });
  }
}

// 3. Read Model (Query / Projection)
class AccountReadModelProjector {
  constructor() {
    this.readDatabase = {}; // Masalan: { accountId: { balance: 150 } }
  }

  project(event) {
    const { aggregateId, type, data } = event;
    if (!this.readDatabase[aggregateId]) {
      this.readDatabase[aggregateId] = { balance: 0 };
    }

    switch (type) {
      case 'MoneyDeposited':
        this.readDatabase[aggregateId].balance += data.amount;
        break;
      case 'MoneyWithdrawn':
        this.readDatabase[aggregateId].balance -= data.amount;
        break;
    }
  }

  getBalance(accountId) {
    return this.readDatabase[accountId] ? this.readDatabase[accountId].balance : 0;
  }
}

// Ishlatilishi:
const store = new EventStore();
const projector = new AccountReadModelProjector();

// Read model voqealarga obuna bo'ladi (Projection)
store.subscribe(event => projector.project(event));

// Bank agregatini yaratamiz
const accountId = "ACC-999";
const account = new BankAccountAggregate(accountId, store);

// Komandalar yuboramiz (Write model orqali)
account.deposit(100);
account.deposit(50);
account.withdraw(30, projector.getBalance(accountId));

// O'qish so'rovi (Query read model-dan amalga oshiriladi)
console.log("Joriy balans:", projector.getBalance(accountId)); // Natija: 120
\\\`\\\`\\\r

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Write vs Read Models
* **Write (Command) Model:** Faqat ma'lumotlarni o'zgartiradigan buyruqlarni qabul qiladi. Biznes mantiq (validation, invariant) shu yerda tekshiriladi. U o'zining joriy holatini faqat yangi voqealarni yozish uchun tekshiradi.
* **Read (Query) Model:** O'qish so'rovlari uchun optimallashgan ma'lumotlar bazasi yoki keshi. Bu baza foydalanuvchi interfeysiga kerakli formatda oldindan tayyorlanib (denormalized) saqlanadi.

### Event Stores
Event Store — bu faqat ma'lumot qo'shiladigan (**append-only**) va o'zgarmas (**immutable**) log faylidir. Oddiy SQL bazalarda buni \\\`INSERT\\\` yordamida, yoki maxsus Event Store-lar (EventStoreDB, Apache Kafka) yordamida amalga oshirish mumkin. Unda hech qachon \\\`UPDATE\\\` yoki \\\`DELETE\\\` bajarilmaydi.

### Event Replay va Projections
Read Model buzilib qolsa yoki yangi ko'rinishdagi ma'lumotlar bazasi (masalan, ElasticSearch yoki Graph DB) kerak bo'lib qolsa, barcha tarixiy voqealarni boshidan boshlab o'qib chiqish (**Event Replay**) orqali yangi proyeksiyalarni noldan yaratish mumkin.

### Eventual Consistency (Yakuniy Moslik)
Yozish modeli voqeani Event Store-ga yozganidan so'ng, ushbu voqea asinxron ravishda Read Model-ga yuboriladi. Bunda yozish va o'qish modellari o'rtasida mikrosaniyalar darajasida kechikish bo'lishi mumkin. Bu holat **Eventual Consistency** (ma'lumotlarning vaqt o'tishi bilan moslashishi) deb ataladi.

### Snapshots (Tezkor Nusxa)
Agarda akkauntda millionlab tranzaksiyalar bo'lsa, har safar joriy balansni hisoblash uchun millionta voqeani qayta o'qish (replay) juda ko'p resurs talab qiladi. Buni optimallashtirish uchun har \\\${N}-chi voqeadan keyin joriy holatning nusxasi (**Snapshot**) olinadi va keyingi safar faqat oxirgi snapshot + undan keyin kelgan yangi voqealar o'qiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Event o'rniga Command-larni saqlash:**
   * *Xato:* \\\`{"type": "ChangeEmailCommand", "email": "a@b.com"}\\\` ko'rinishida saqlash. Command rad etilishi mumkin.
   * *To'g'ri:* Faqat muvaffaqiyatli sodir bo'lgan voqealarni saqlash kerak: \\\`{"type": "EmailChanged", "email": "a@b.com"}\\\`. Event - bu o'tmishda sodir bo'lgan inkor etib bo'lmas fakt.
2. **Idempotentlikni hisobga olmaslik:**
   * Voqealar tarmoq orqali uzatilganda, ba'zida bitta voqea Read Model-ga ikki marta yetib borishi mumkin (*at-least-once delivery*). Agar sizda idempotentlik tekshiruvi bo'lmasa, foydalanuvchining hisobidan ikki marta pul yechib yuborilishi yoki ikki marta xabar yuborilishi mumkin.
3. **Optimistik Konkurentlikni unitish (Race Conditions):**
   * Bir vaqtda kelgan ikkita buyruq balansni noto'g'ri o'zgartirishi mumkin. Har bir voqeaga \\\`version\\\` raqamini biriktirish va yozish paytida joriy versiya kutilgan versiya bilan mosligini tekshirish shart (**Optimistic Concurrency Control**).

---

## 5. 💬 12 ta Intervyu Savollari

**1. Event Sourcing nima?**
Ma'lumotlarning faqat oxirgi holatini emas, balki unda sodir bo'lgan barcha o'zgarishlar (voqealar) tarixini ketma-ketlikda saqlash arxitektura namunasidir.

**2. CQRS nima?**
Command Query Responsibility Segregation — ma'lumotlarni o'zgartiruvchi operatsiyalar (Commands) va ma'lumotlarni o'quvchi operatsiyalar (Queries) untuk alohida modellar va bazalarni ishlatishdir.

**3. Nima uchun Event-larni o'zgartirib yoki o'chirib bo'lmaydi?**
Chunki voqealar (Events) o'tmishda sodir bo'lgan haqiqiy faktlardir. Tarixni o'zgartirib bo'lmaydi. Xatolar faqat kompensatsiyalovchi yangi voqealar orqali tuzatiladi.

**4. Snapshot nima va u nima uchun kerak?**
Katta hajmdagi voqealar zanjirini qayta o'qishni (replay) tezlashtirish uchun tizim holatining ma'lum bir vaqtdagi nusxasini saqlash usulidir.

**5. Read Model qanday yangilanadi?**
Event Store-ga yozilgan yangi voqealar proyektorlar (Projectors) orqali tinglanadi va o'qish ma'lumotlar bazasidagi mos jadvallar/hujjatlar yangilanadi.

**6. Eventual Consistency nima?**
Yozilgan ma'lumotlarning asinxron qayta ishlanishi sababli o'qish modelida bir necha millisoniyadan so'ng aks etishi va yakunda baribir sinxronlashishi.

**7. Event Sourcing-da optimistik konkurentlik qanday ta'minlanadi?**
Har bir agregat yoki voqealar oqimiga versiya raqami beriladi. Yangi voqeani yozayotganda kutilayotgan oxirgi versiya bazadagi versiya bilan solishtiriladi, mos kelmasa tranzaksiya bekor qilinadi.

**8. Saga patterni Event Sourcing bilan qanday bog'lanadi?**
Saga bir nechta mikroxizmatlar bo'ylab tarqalgan tranzaksiyalarni boshqaradi va voqealar zanjiri (Event-driven) orqali kompensatsiyalovchi tranzaksiyalarni ishga tushiradi.

**9. Upcasting nima?**
Eski voqea sxemalarini (masalan, v1) dastur ishlayotgan vaqtda (on-the-fly) yangi sxemaga (v2) o'zgartirib, kodga moslashtirish jarayonidir.

**10. CQRS-ning asosiy kamchiliklari nimada?**
Tizimning murakkabligi oshishi, kodlar ko'payishi, eventual consistency muammolari va turli bazalarni boshqarish qiyinchiliklari.

**11. Qachon Event Sourcing-dan foydalanmaslik kerak?**
Oddiy CRUD (yaratish, o'qish, yangilash, o'chirish) tizimlarida, tarixiy ma'lumotlar va audit talab qilinmaydigan oddiy loyihalarda.

**12. Idempotent Event Handler nima?**
Bitta voqeani necha marta qayta ishlamasin, read modelda faqat bir marta ta'sir ko'rsatadigan va bir xil natija beradigan handler.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida siz Event Sourcing va CQRS tizimining fundamental mantiqlarini JS tilida yozib sinab ko'rasiz.

---

## 7. 📝 12 ta Mini Test

Darsni qanchalik yaxshi tushunganingizni tekshirish uchun testlarni yeching.

---

## 8. 🎯 Real Project Case Study

### E-Commerce buyurtma berish va inventarizatsiya tizimi
Yirik internet do'konda foydalanuvchi buyurtma berganida:
1. \\\`OrderAggregate\\\` biznes qoidalarni tekshiradi (masalan, maxsulot zaxirada bormi).
2. Tizim \\\`OrderCreated\\\` voqeasini Event Store-ga yozadi.
3. Inventory Service ushbu voqeani tinglab, ombordan mahsulotni band qiladi va \\\`InventoryReserved\\\` voqeasini chiqaradi.
4. Read Model esa foydalanuvchiga buyurtma holatini "Kutilmoqda" yoki "Muvaffaqiyatli" ko'rinishida tezkor ko'rsatib turish uchun asinxron yangilanib boradi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\\\`\\\`\\\`mermaid
sequenceDiagram
    autonumber
    actor Client
    participant API as API/Command Handler
    participant Agg as Write Model (Aggregate)
    participant ES as Event Store
    participant Proj as Projector
    participant RDB as Read DB (Query Model)

    Client->>API: 1. Send Command (e.g. Deposit Money)
    API->>Agg: 2. Validate Command
    Agg->>ES: 3. Append Event (MoneyDeposited)
    ES-->>API: 4. Acknowledge Write
    API-->>Client: 5. Success Response
    Note over ES, Proj: Asynchronous Event Propagation
    ES->>Proj: 6. Publish Event
    Proj->>RDB: 7. Update Read Model (Denormalize)
    Client->>RDB: 8. Query Account Balance (Fast Read)
    RDB-->>Client: 9. Current Balance State
\\\`\\\`\\\`

---

## 10. 📌 Cheat Sheet

| Atama | Vazifasi | O'zgaruvchanligi |
| :--- | :--- | :--- |
| **Command** | Biror ishni bajarish niyati (Validate qilinadi, rad etilishi mumkin) | Yo'q (Faqat parametrlar) |
| **Event** | O'tmishda sodir bo'lgan fakt (Rad etib bo'lmaydi) | Immutable (O'zgarmas) |
| **Aggregate** | Biznes qoidalari va o'zgarishlar yig'indisi | Joriy holat xotirada saqlanadi |
| **Event Store** | Faqat voqealarni yozuvchi ombor | Append-Only |
| **Projector** | Voqealarni o'qib, o'qish bazasini yangilovchi komponent | Stateless / Dynamic |
| **Read DB** | O'qish so'rovlari uchun optimallashgan baza | O'zgaruvchan (Denormalized) |
`,
  exercises: [
    {
      id: 1,
      title: "Event Reducer Simulyatsiyasi",
      instruction: "Foydalanuvchi hisobining joriy holatini hisoblovchi `reduceState(initialState, events)` funksiyasini yozing. Voqealar ro'yxatida `USER_REGISTERED` (statega username va status qo'shadi) va `EMAIL_UPDATED` (state dagi emailni o'zgartiradi) voqealari bo'lishi mumkin. Har bir voqea `{ type, data }` formatida bo'ladi.",
      startingCode: "function reduceState(initialState, events) {\n  // Kodni shu yerda yozing\n}",
      hint: "events.reduce() yoki oddiy for...of tsiklidan foydalanib state nusxasini yangilang.",
      test: "if (typeof reduceState !== 'function') return 'reduceState funksiya emas';\nconst init = { status: 'pending' };\nconst events = [\n  { type: 'USER_REGISTERED', data: { username: 'ali', status: 'active' } },\n  { type: 'EMAIL_UPDATED', data: { email: 'ali@mail.com' } }\n];\nconst state = reduceState(init, events);\nif (state.username !== 'ali' || state.email !== 'ali@mail.com' || state.status !== 'active') {\n  return 'State noto\\'g\\'ri shakllantirildi!';\n}\nreturn null;"
    },
    {
      id: 2,
      title: "Event Store-ga yangi voqea qo'shish",
      instruction: "`EventStore` klassini yarating. Unda voqealarni saqlaydigan `events` massivi bo'lsin. Yangi voqea qo'shish uchun `appendEvent(aggregateId, type, data)` metodini yozing. Har bir yangi voqea saqlanganda avtomatik ravishda `sequence` (1 dan boshlanuvchi tartib raqami) va `timestamp` olsin.",
      startingCode: "class EventStore {\n  constructor() {\n    this.events = [];\n  }\n\n  appendEvent(aggregateId, type, data) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "this.events.length + 1 orqali sequence raqamini hisoblang. Yangi obyektni push qiling va uni qaytaring.",
      test: "if (typeof EventStore !== 'function') return 'EventStore klass emas';\nconst store = new EventStore();\nconst ev = store.appendEvent('user-1', 'Created', { name: 'Vali' });\nif (store.events.length !== 1) return 'Voqea omborga qo\\'shilmadi';\nif (ev.sequence !== 1 || !ev.timestamp) return 'Voqea sequence yoki timestamp-ga ega emas';\nreturn null;"
    },
    {
      id: 3,
      title: "Sodda Read Model Proyektori",
      instruction: "Voqealarni o'qib, o'quvchilar uchun sodda kalit-qiymat ko'rinishidagi Read Model yaratadigan `Projector` klassini yozing. Unda `readModel` obyekti bo'lsin. `project(event)` metodi kelgan voqeadagi `aggregateId` bo'yicha ma'lumotlarni yangilasin. Agar voqea turi `ITEM_ADDED` bo'lsa, elementni massivga qo'shsin, agar `ITEM_REMOVED` bo'lsa, massivdan o'chirsin.",
      startingCode: "class Projector {\n  constructor() {\n    this.readModel = {}; // format: { userId: [] }\n  }\n\n  project(event) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "event.aggregateId bo'yicha array mavjudligini tekshiring, agar yo'q bo'lsa bo'sh massiv yarating. Keyin type ga qarab item qo'shing yoki filter orqali o'chiring.",
      test: "if (typeof Projector !== 'function') return 'Projector klass emas';\nconst p = new Projector();\np.project({ aggregateId: 'u1', type: 'ITEM_ADDED', data: { item: 'apple' } });\np.project({ aggregateId: 'u1', type: 'ITEM_ADDED', data: { item: 'banana' } });\np.project({ aggregateId: 'u1', type: 'ITEM_REMOVED', data: { item: 'apple' } });\nconst list = p.readModel['u1'];\nif (!list || list.length !== 1 || list[0] !== 'banana') return 'Proyeksiya noto\\'g\\'ri ishladi';\nreturn null;"
    },
    {
      id: 4,
      title: "Snapshot optimizatsiyasini joriy qilish",
      instruction: "Voqealar ro'yxatidan holatni tiklash va har 3-chi voqeadan keyin snapshot olish tizimini yozing. `buildStateWithSnapshots(events)` funksiyasi joriy balansni hisoblashi kerak. Agar voqea tartib raqami (1-indexed) 3 ga bo'linsa, o'sha paytdagi joriy balans qiymatini `snapshots` massiviga saqlab qo'ysin. Funksiya `{ finalBalance, snapshots }` obyektini qaytarsin. Barcha voqealar turi faqat `ADD` yoki `SUBTRACT` bo'ladi va ularda `amount` qiymati mavjud.",
      startingCode: "function buildStateWithSnapshots(events) {\n  let balance = 0;\n  const snapshots = [];\n  // Kodni shu yerda yozing\n}",
      hint: "for loop yordamida har bir eventni qayta ishlang va (index + 1) % 3 === 0 bo'lganda joriy balansni snapshots-ga push qiling.",
      test: "if (typeof buildStateWithSnapshots !== 'function') return 'buildStateWithSnapshots funksiya emas';\nconst events = [\n  { type: 'ADD', amount: 10 },\n  { type: 'ADD', amount: 20 },\n  { type: 'SUBTRACT', amount: 5 },\n  { type: 'ADD', amount: 15 },\n  { type: 'ADD', amount: 5 }\n];\nconst res = buildStateWithSnapshots(events);\nif (res.finalBalance !== 45) return 'Yakuniy balans xato';\nif (res.snapshots.length !== 1 || res.snapshots[0] !== 25) return 'Snapshots noto\\'g\\'ri saqlandi';\nreturn null;"
    },
    {
      id: 5,
      title: "Optimistic Concurrency Control (Optimistik Konkurentlik)",
      instruction: "Event store-ga voqea qo'shishda race condition-larning oldini olish uchun kutilayotgan versiyani tekshiradigan `appendWithConcurrency(store, event, expectedVersion)` funksiyasini yozing. `store` obyektida `events` massivi bor. Agarda oxirgi voqeaning versiyasi (yoki store bo'sh bo'lsa 0) kutilayotgan versiyaga mos kelmasa, 'ConcurrencyException' xatosini tashlang. Aks holda, event-ni store-ga qo'shib, uning versiyasini yangilang va voqeani qaytaring.",
      startingCode: "function appendWithConcurrency(store, event, expectedVersion) {\n  // Kodni shu yerda yozing\n}",
      hint: "store.events massividagi eng oxirgi elementning version xususiyatini tekshiring. Agar u expectedVersion-ga teng bo'lmasa xato tashlang.",
      test: "if (typeof appendWithConcurrency !== 'function') return 'appendWithConcurrency funksiya emas';\nconst store = { events: [{ id: 'e1', version: 1 }] };\nconst newEvent = { id: 'e2', version: 2 };\ntry {\n  appendWithConcurrency(store, newEvent, 2); // kutilgan versiya 2, lekin oxirgisi 1 (mos kelmaydi)\n  return 'Mos kelmagan versiyada xato tashlanmadi';\n} catch (e) {}\nconst correctEvent = { id: 'e3', version: 2 };\nconst res = appendWithConcurrency(store, correctEvent, 1);\nif (store.events.length !== 2) return 'Voqea storega qo\\'shilmadi';\nreturn null;"
    },
    {
      id: 6,
      title: "Idempotent Event Handler",
      instruction: "Tarmoqdagi dublikat voqealarni filtrlash uchun idempotent handler yozing. `processEventIdempotent(processedIds, event, readModel)` funksiyasini yozing. Agar `event.id` allaqachon `processedIds` (Set to'plami) ichida mavjud bo'lsa, hech narsa qilmasdan shunchaki `readModel`ni qaytarsin. Aks holda, `event.id`ni processedIds ga qo'shsin, voqeadagi summana `readModel.total`ga qo'shsin va yangilangan modelni qaytarsin.",
      startingCode: "function processEventIdempotent(processedIds, event, readModel) {\n  // Kodni shu yerda yozing\n}",
      hint: "Set to'plamida element borligini processedIds.has(event.id) orqali tekshiring. Yo'q bo'lsa, processedIds.add(event.id) qiling.",
      test: "if (typeof processEventIdempotent !== 'function') return 'processEventIdempotent funksiya emas';\nconst processed = new Set(['123']);\nconst model = { total: 100 };\nconst ev1 = { id: '123', amount: 50 };\nconst res1 = processEventIdempotent(processed, ev1, model);\nif (res1.total !== 100) return 'Dublikat voqea qayta ishlanmasligi kerak edi!';\nconst ev2 = { id: '456', amount: 50 };\nconst res2 = processEventIdempotent(processed, ev2, model);\nif (res2.total !== 150) return 'Yangi voqea hisobga olinmadi!';\nreturn null;"
    },
    {
      id: 7,
      title: "Event Replay orqali Read Modelni qayta qurish",
      instruction: "`rebuildReadModel(eventStore, initialReadModel)` funksiyasini yozing. `eventStore` obyekti `getAllEvents()` metodiga ega va u voqealar massivini qaytaradi. Har bir voqea `{ type, amount }` formatida bo'ladi. Funksiya barcha voqealarni boshidan boshlab replay qilib, `initialReadModel.balance` qiymatini qayta hisoblasin va natijaviy modelni qaytarsin.",
      startingCode: "function rebuildReadModel(eventStore, initialReadModel) {\n  // Kodni shu yerda yozing\n}",
      hint: "eventStore.getAllEvents() orqali voqealarni oling, boshlang'ich modelni nusxalab (deep copy yoki shunchaki reference bilan) hisob-kitob qiling.",
      test: "if (typeof rebuildReadModel !== 'function') return 'rebuildReadModel funksiya emas';\nconst mockStore = {\n  getAllEvents: () => [\n    { type: 'DEPOSIT', amount: 200 },\n    { type: 'WITHDRAW', amount: 50 },\n    { type: 'DEPOSIT', amount: 10 }\n  ]\n};\nconst model = rebuildReadModel(mockStore, { balance: 0 });\nif (model.balance !== 160) return 'Event replay natijasi xato!';\nreturn null;"
    },
    {
      id: 8,
      title: "Event Upcaster (Sxema Evolutsiyasi)",
      instruction: "Eski voqealarni yeni sxemaga o'zgartiruvchi `upcastEvent(event)` funksiyasini yozing. Agar kelgan event `version === 1` bo'lsa va uning `data` qismida `fullName` bo'lsa, uni `version = 2` qilib, `data` qismidagi `fullName` ni `firstName` va `lastName` ga ajrating (ism va familiya bo'shliq bilan ajratilgan). Agar `version` allaqachon 2 bo'lsa, voqeani o'zgarishsiz qaytarsin.",
      startingCode: "function upcastEvent(event) {\n  // Kodni shu yerda yozing\n}",
      hint: "event.version === 1 bo'lganda yangi formatdagi obyekt qaytaring. fullName.split(' ') orqali ajrating.",
      test: "if (typeof upcastEvent !== 'function') return 'upcastEvent funksiya emas';\nconst oldEvent = { version: 1, data: { fullName: 'Eshmat Toshmatov' } };\nconst upgraded = upcastEvent(oldEvent);\nif (upgraded.version !== 2 || upgraded.data.firstName !== 'Eshmat' || upgraded.data.lastName !== 'Toshmatov') {\n  return 'Upcast to\\'g\\'ri amalga oshirilmadi!';\n}\nreturn null;"
    },
    {
      id: 9,
      title: "CQRS: Command & Query Dispatcher",
      instruction: "`CqrsDispatcher` klassini yozing. U `commands` va `queries` deb nomlangan alohida handler xaritalariga (Map yoki obyekt) ega bo'lsin. Unda `registerCommandHandler(name, handler)`, `registerQueryHandler(name, handler)`, `executeCommand(name, payload)` va `executeQuery(name, payload)` metodlari bo'lsin.",
      startingCode: "class CqrsDispatcher {\n  constructor() {\n    // Handlerlarni saqlash joyi\n  }\n  // Metodlarni yozing\n}",
      hint: "Konstruktorda ikkita Map yarating. executeCommand va executeQuery metodlari tegishli Map'dan handler-ni topib, payload bilan chaqirsin va natijani qaytarsin.",
      test: "if (typeof CqrsDispatcher !== 'function') return 'CqrsDispatcher klass emas';\nconst dispatcher = new CqrsDispatcher();\ndispatcher.registerCommandHandler('createTodo', (p) => 'Todo created: ' + p.title);\ndispatcher.registerQueryHandler('getTodo', (id) => ({ id, title: 'Learn CQRS' }));\nif (dispatcher.executeCommand('createTodo', { title: 'JS' }) !== 'Todo created: JS') return 'Command xato ishlamoqda';\nif (dispatcher.executeQuery('getTodo', 1).title !== 'Learn CQRS') return 'Query xato ishlamoqda';\nreturn null;"
    },
    {
      id: 10,
      title: "Kompensatsiyalovchi Tranzaksiya (Saga Simulyatsiyasi)",
      instruction: "Buyurtma berish jarayonini simulyatsiya qiluvchi `processOrderSaga(steps, rollbackSteps)` funksiyasini yozing. `steps` — bu funksiyalar massividir, har bir qadam ketma-ket bajariladi. Agar qadamlardan biri xato (`throw new Error`) bersa, o'sha qadamgacha muvaffaqiyatli bajarilgan barcha qadamlarga mos rollback qadamlarini teskari tartibda (LIFO) chaqirib chiqish kerak. `rollbackSteps` — bu har bir qadamga mos keluvchi kompensatsiya funksiyalari massividir. Funksiya xato yuz berganda `'FAILED'`, muvaffaqiyatli yakunlansa `'SUCCESS'` qaytarsin.",
      startingCode: "function processOrderSaga(steps, rollbackSteps) {\n  // Kodni shu yerda yozing\n}",
      hint: "Siklda try/catch block ishlashib steps massivini aylaning. Muvaffaqiyatli bajarilgan qadamlar indekslarini saqlang. Xato bo'lsa, o'sha indekslarni teskari tartibda aylanib rollbackSteps[i]() ni chaqiring.",
      test: "if (typeof processOrderSaga !== 'function') return 'processOrderSaga funksiya emas';\nlet rolledBack = [];\nconst steps = [\n  () => true,\n  () => { throw new Error('Payment failed'); }\n];\nconst rollbacks = [\n  () => rolledBack.push('cancelReservation'),\n  () => rolledBack.push('refundPayment')\n];\nconst res = processOrderSaga(steps, rollbacks);\nif (res !== 'FAILED' || rolledBack.length !== 1 || rolledBack[0] !== 'cancelReservation') {\n  return 'Kompensatsiyalovchi tranzaksiyalar noto\\'g\\'ri yoki noto\\'g\\'ri tartibda chaqirildi!';\n}\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Event Sourcing va an'anaviy CRUD-ning asosiy farqi nimada?",
      options: [
        "CRUD faqat no-SQL bazalarda ishlaydi",
        "Event Sourcing ma'lumotlarning faqat joriy holatini saqlaydi, CRUD esa barcha o'zgarishlar tarixini",
        "CRUD ma'lumotlarning faqat joriy holatini saqlaydi (UPDATE/DELETE), Event Sourcing esa holatga olib kelgan barcha voqealar tarixini saqlaydi (Append-only)",
        "Ular o'rtasida hech qanday arxitekturaviy farq yo'q"
      ],
      correctAnswer: 2,
      explanation: "Event Sourcing-da ma'lumotlar o'chirilmaydi va o'zgartirilmaydi, barcha o'zgarishlar ketma-ket voqealar logi sifatida yoziladi."
    },
    {
      id: 2,
      question: "CQRS na'munasida yozish (Write) va o'qish (Read) modellarini ajratishdan asosiy maqsad nima?",
      options: [
        "Faqat xavfsizlikni oshirish",
        "Yozish va o'qish operatsiyalarini alohida masshtablash hamda har biriga mos optimal ma'lumotlar strukturalarini qo'llash",
        "Dasturchilar sonini ko'paytirish",
        "Kod yozishni osonlashtirish"
      ],
      correctAnswer: 1,
      explanation: "CQRS yozish (murakkab biznes qoidalar) va o'qish (UI uchun tezkor denormalizatsiyalangan ma'lumotlar) modellarini mustaqil optimallashtirish imkonini beradi."
    },
    {
      id: 3,
      question: "Nima uchun Event-lar (Voqealar) o'zgarmas (Immutable) deb hisoblanadi?",
      options: [
        "Chunki JavaScript-da const kalit so'zi ishlatiladi",
        "Chunki ular o'tmishda sodir bo'lgan inkor etib bo'lmas faktlardir va tarixni o'zgartirib bo'lmaydi",
        "Chunki ularni o'zgartirsa, dastur xotirasi to'lib qoladi",
        "Bunga texnik cheklovlar sababchi, xolos"
      ],
      correctAnswer: 1,
      explanation: "Voqealar tarixiy faktlardir. Sodir bo'lgan voqeani o'zgartirish o'rniga, agar xatolik bo'lsa, yangi tuzatuvchi/kompensatsiyalovchi voqea yoziladi."
    },
    {
      id: 4,
      question: "Event Replay (Voqealarni qayta tinglash) nima?",
      options: [
        "Dasturdagi xatolarni aniqlash uchun loglarni qayta yuklash",
        "Musiqa pleyerida eventlarni takrorlash",
        "Tarixiy voqealar ketma-ketligini boshidan boshlab qayta ishlash orqali joriy holatni yoki yangi Read Modelni noldan yaratish jarayoni",
        "Bazani tozalash algoritmi"
      ],
      correctAnswer: 2,
      explanation: "Event Replay yordamida barcha tarixiy voqealarni qayta o'qib, ma'lumotlar bazasining joriy holatini tiklash yoki butunlay yangi bazani (masalan Elasticsearch) yaratish mumkin."
    },
    {
      id: 5,
      question: "Snapshot olish (Snapshotting) nima uchun kerak?",
      options: [
        "Ma'lumotlar bazasini arxivlash uchun",
        "Akkaunt rasmini saqlash uchun",
        "Ko'p miqdordagi voqealarni boshidan boshlab qayta o'qish (replay) vaqtini tejash va joriy holatni tezroq tiklash uchun ma'lum nuqtadagi holat nusxasini saqlash",
        "Xavfsizlik maqsadida shifrlash usuli"
      ],
      correctAnswer: 2,
      explanation: "Agar voqealar soni juda ko'p bo'lsa (masalan 1,000,000 ta), holatni tezroq tiklash uchun vaqti-vaqti bilan snapshot olinadi (oxirgi snapshot + qolgan voqealar tiklanadi)."
    },
    {
      id: 6,
      question: "Event Sourcing-da eventual consistency (yakuniy moslik) qanday yuzaga keladi?",
      options: [
        "Yozish modeli voqeani saqlagandan so'ng, read model asinxron ravishda biroz kechikib yangilanishi sababli",
        "Baza xotirasi yetishmaganida",
        "Sinxron so'rovlar bloklanganda",
        "Faqat server o'chib qolganida"
      ],
      correctAnswer: 0,
      explanation: "Yozish va o'qish modellari asinxron bog'langanligi sababli, yozilgan ma'lumotning o'qish modelida aks etishi uchun juda qisqa vaqt (kechikish) talab etiladi."
    },
    {
      id: 7,
      question: "Optimistic Concurrency Control (Optimistik konkurentlik nazorati) nima uchun kerak?",
      options: [
        "Foydalanuvchilarga faqat ijobiy xabarlar ko'rsatish uchun",
        "Parallel ravishda kelgan ikkita bir xil buyruq bir vaqtda bazaga yozilib, ma'lumotlarni buzib yubormasligi (race condition) va versiya mosligini ta'minlash uchun",
        "Ma'lumotlarni tezroq shifrlash uchun",
        "Tarmoq tezligini oshirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Har bir o'zgarishda kutilgan versiya raqami tekshiriladi. Agar parallel tranzaksiyalardan biri versiyani oshirib yuborgan bo'lsa, keyingisi xato berib rad etiladi."
    },
    {
      id: 8,
      question: "Idempotent Event Handler nima?",
      options: [
        "Faqat bir marta ishga tushadigan handler",
        "Bitta voqeani necha marta qabul qilishidan qat'i nazar, faqat bir marta qayta ishlaydigan va read modelda bir xil natija qoldiradigan handler",
        "Hech qachon xato bermaydigan funksiya",
        "Ma'lumotlar bazasini o'chirib yuboradigan kod"
      ],
      correctAnswer: 1,
      explanation: "Tarmoq orqali voqea bir necha marta qayta uzatilganda (retry), idempotent handler dublikatlarni aniqlab, noto'g'ri hisob-kitoblarni oldini oladi."
    },
    {
      id: 9,
      question: "Upcasting atamasi Event Sourcing-da nimani anglatadi?",
      options: [
        "Voqealarni yuqori xotiraga yuklash",
        "Eski sxemadagi voqealarni (masalan, v1 formatdagi) dastur xotirasida yangi sxemaga (v2 formatga) o'zgartirish va moslashtirish",
        "Bazani o'chirish jarayoni",
        "Ma'lumotlarni zip formatga o'tkazish"
      ],
      correctAnswer: 1,
      explanation: "Tizim o'zgarishi bilan voqea tuzilmalari o'zgarishi mumkin. Upcaster-lar eski voqealarni bazadan o'qib, o'sha vaqtning o'zida yangi ko'rinishga keltirib beradi."
    },
    {
      id: 10,
      question: "CQRS va Event Sourcing arxitekturasining asosiy kamchiligi nima?",
      options: [
        "Faqat bitta tilda yozish mumkinligi",
        "Tizimning murakkabligi, qo'shimcha kodlar (boilerplate), ma'lumotlarning yakuniy mosligi (consistency) va infratuzilmani boshqarish qiyinchiliklari",
        "Tezlikning CRUD-ga qaraganda doimo past bo'lishi",
        "Xavfsizlikning yo'qligi"
      ],
      correctAnswer: 1,
      explanation: "Tizim dizayni juda murakkablashadi, shuning uchun oddiy CRUD tizimlar uchun ushbu patternlar tavsiya etilmaydi."
    },
    {
      id: 11,
      question: "Event Sourcing-da xatolik yuz berganda ma'lumot qanday tuzatiladi?",
      options: [
        "Event store-dagi yozuvni to'g'ridan-to'g'ri UPDATE qilib",
        "Barcha bazani o'chirib qayta tiklab",
        "Xatoni tuzatuvchi kompensatsiyalovchi yangi voqea (Compensating Event) qo'shish orqali",
        "Xatoliklarni tuzatishning iloji yo'q"
      ],
      correctAnswer: 2,
      explanation: "Tarixni o'zgartirib bo'lmagani sababli, xato faqat teskari operatsiya yoki tuzatuvchi yangi voqea qo'shish orqali to'g'rilanadi."
    },
    {
      id: 12,
      question: "Saga na'munasi (Saga Pattern) qachon ishlatiladi?",
      options: [
        "Faqat rasmlarni siqish kerak bo'lganda",
        "Bir nechta mikroxizmatlar bo'ylab tarqalgan tranzaksiyalarni (distributed transactions) boshqarish va xatolik bo'lganda rollback/kompensatsiya voqealarini chaqirish uchun",
        "Bitta bazadan boshqasiga backup olishda",
        "UI animatsiyalarini boshqarishda"
      ],
      correctAnswer: 1,
      explanation: "Mikroxizmatlarda yagona ACID tranzaksiyasi bo'lmagani sababli, Saga har bir qadam voqealarini boshqaradi va xato yuz berganda teskari rollback amallarini bajaradi."
    }
  ]
};

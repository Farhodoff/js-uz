export const distributedTransactions = {
  id: "distributedTransactions",
  title: "Taqsimlangan Tranzaksiyalar (Distributed Transactions)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Taqsimlangan Tranzaksiya nima?
Monolit dasturda ma'lumotlar bitta ma'lumotlar bazasida saqlanadi. Agar foydalanuvchi buyurtma bersa, uning hisobidan pul yechish va ombordan mahsulotni kamaytirish bitta tranzaksiya (ACID) ichida osongina bajariladi: yoki ikkalasi ham muvaffaqiyatli bo'ladi, yoki ikkalasi ham bekor qilinadi.

Mikroservislar arxitekturasida esa vaziyat boshqacha. Pul yechish servisi (Payment Service) boshqa bazada, ombor servisi (Inventory Service) esa butunlay boshqa bazada va boshqa serverda joylashgan. Ularning har biri o'zining mahalliy tranzaksiyasiga ega. Agar pul yechilsa-yu, lekin ombordan mahsulotni kamaytirishda xatolik yuz bersa, tizim muvozanatdan chiqib ketadi (pul ketdi, mahsulot yo'q). 

**Taqsimlangan tranzaksiya** — bu bir nechta mustaqil tarmoq tugunlari va bazalarida bajariladigan operatsiyalarning yaxlitligini ta'minlash usulidir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **to'y tashkil qilyapsiz**:
1. **Restoran buyurtma qilish** kerak.
2. **San'atkorlarni chaqirish** kerak.

* **Sinxron (2PC) usul:** Siz restoran menejeri va san'atkor bilan bir vaqtda qo'ng'iroq qilib, uch tomonlama aloqaga chiqasiz. \\"Ikkalangiz ham 15-iyun kuni bo'shmisiz?\\" deb so'raysiz. Ikkalasi ham \\"Ha, tayyorman\\" deb javob bergandan keyingina (Prepare phase), siz \\"Kelishdik, shartnomani imzolaymiz\\" deysiz (Commit phase). Agar bittasi band bo'lsa, hammasi bekor bo'ladi.
* **Asinxron (Saga) usul:** Siz avval restoranga borib behuda bo'lmasligi uchun pul to'laysiz (1-qadam). Keyin san'atkorga qo'ng'iroq qilasiz (2-qadam). Agar san'atkor band bo'lib chiqsa, siz restoranga qaytib borib shartnomani bekor qilasiz va pulingizni qaytarib olasiz (Kompensatsiya tranzaksiyasi).

---

## 2. 💻 Real Kod Misollari

Quyida taqsimlangan tranzaksiyalarning asosiy prinsiplarini ko'rsatuvchi sodda JavaScript misollari keltirilgan.

### 1. Saga Orchestrator Simulyatsiyasi (Kompensatsiya bilan)
Orkestrator har bir qadamni ketma-ket bajaradi. Agar biron-bir qadam xato bilan tugasa, u avvalgi qadamlarni bekor qilish uchun kompensatsiya funksiyalarini chaqiradi:

\`\`\`javascript
class OrderSagaOrchestrator {
  constructor(paymentService, inventoryService) {
    this.payment = paymentService;
    this.inventory = inventoryService;
  }

  async executeOrder(orderId, userId, amount, items) {
    const steps = [];

    try {
      // 1-Qadam: To'lovni amalga oshirish
      console.log("1. To'lov qilinmoqda...");
      const paymentId = await this.payment.charge(userId, amount);
      steps.push({
        name: 'PAYMENT',
        rollback: () => this.payment.refund(paymentId, amount)
      });

      // 2-Qadam: Ombordan zaxira qilish
      console.log("2. Ombordan mahsulot zaxiralanmoqda...");
      const reservationId = await this.inventory.reserve(items);
      steps.push({
        name: 'INVENTORY',
        rollback: () => this.inventory.release(reservationId)
      });

      console.log("Saga muvaffaqiyatli yakunlandi!");
      return { success: true, paymentId, reservationId };

    } catch (error) {
      console.error("Saga-da xatolik yuz berdi:", error.message);
      await this.rollback(steps);
      return { success: false, error: error.message };
    }
  }

  async rollback(steps) {
    console.log("Kompensatsiya tranzaksiyalari (Rollback) boshlanmoqda...");
    // Qadamlarni teskari tartibda bekor qilamiz
    for (let i = steps.length - 1; i >= 0; i--) {
      try {
        await steps[i].rollback();
        console.log(\`\${steps[i].name} bekor qilindi.\`);
      } catch (rollbackError) {
        // Haqiqiy tizimda bu yerda xabar navbatiga qayta urinish uchun yuboriladi yoki ogohlantirish beriladi
        console.error(\`Kritik xato: \${steps[i].name} rollback qibly bo'lmadi!\`, rollbackError.message);
      }
    }
  }
}
\`\`\`

### 2. Idempotentlik Middleware-i (Idempotency Key)
Tarmoqdagi kechikishlar tufayli mijoz so'rovni qayta yuborganda, serverda bitta operatsiya ikki marta bajarilib ketmasligi uchun idempotency kalitidan foydalaniladi:

\`\`\`javascript
const processedRequests = new Set();

function processPaymentIdempotent(idempotencyKey, amount, accountId) {
  if (processedRequests.has(idempotencyKey)) {
    console.log(\`So'rov allaqachon bajarilgan (\${idempotencyKey}). Keshdan javob qaytariladi.\`);
    return { status: "ALREADY_PROCESSED", idempotencyKey };
  }

  // To'lovni amalga oshirish
  console.log(\`Hisobdan \${amount} yechildi. Account: \${accountId}\`);
  processedRequests.add(idempotencyKey);

  return { status: "SUCCESS", idempotencyKey };
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. ACID vs BASE
An'anaviy monolit bazalar **ACID** modeliga amal qiladi. Taqsimlangan tizimlar esa ko'pincha **BASE** modelini tanlashadi:
* **ACID (Atomicity, Consistency, Isolation, Durability):** Ma'lumotlarning har lahzada 100% to'g'ri va mos (consistent) bo'lishini kafolatlaydi.
* **BASE (Basically Available, Soft state, Eventual consistency):**
  * **Basically Available:** Tizim doimo ishchi holatda bo'ladi, ba'zi qismlar uzilgan bo'lsa ham javob beradi.
  * **Soft state:** Ma'lumotlar vaqtinchalik mos bo'lmagan holatda turishi mumkin (masalan, to'lov bo'ldi, lekin omborda hali yangilanmadi).
  * **Eventual consistency:** Bir oz vaqt o'tgach, barcha tizimlar bir-biriga mos holatga keladi (Oxir-oqibat moslik).

### 2. Two-Phase Commit (2PC) va Three-Phase Commit (3PC)
* **2PC (Ikki fazali tasdiqlash):**
  * **Prepare:** Koordinator barcha tugunlarga \\"Yozishga tayyormisiz?\\" deb so'raydi. Tugunlar resurslarni qulflab (lock) \\"Tayyorman\\" yoki \\"Yo'q\\" deb javob beradi.
  * **Commit/Abort:** Agar hamma \\"Tayyorman\\" desa, koordinator \\"Commit\\" yuboradi. Agar bitta tugun rad etsa, hammasiga \\"Abort\\" yuboradi.
  * **Kamchiligi:** Bloklanish muammosi. Agar Prepare-dan keyin koordinator o'chib qolsa, barcha tugunlar resurslarni qulflangan holatda abadiy kutib qoladi.
* **3PC (Uch fazali tasdiqlash):** Bloklanishni kamaytirish uchun oraliq \`Pre-Commit\` bosqichini va taym-autlarni qo'shadi, lekin tarmoq bo'linishi (network partition) bo'lganda baribir xatoliklarga olib kelishi mumkin.

### 3. Saga Pattern
Saga - bu bir nechta mahalliy tranzaksiyalar zanjiridir. Agar bitta qadam muvaffaqiyatsiz bo'lsa, oldingi qadamlarning ta'sirini yo'qotish uchun kompensatsiya tranzaksiyalari chaqiriladi.
* **Choreography (Xoreografiya):** Markaziy boshqaruvchi yo'q. Har bir servis o'z ishini tugatib, xabar navbatiga (masalan, RabbitMQ, Kafka) voqea chiqaradi. Keyingi servis bu voqeani eshitib ishni davom ettiradi. Sodda, lekin kuzatish (monitoring) juda qiyin.
* **Orchestration (Orkestratsiya):** Markaziy boshqaruvchi (Orchestrator) mavjud. U qaysi servis qachon chaqirilishini va xato bo'lsa qanday bekor qilinishini boshqaradi. Tizim murakkab, lekin tranzaksiya holatini kuzatish oson.

### 4. Transactional Outbox Pattern
Mikroservis o'z bazasiga ma'lumot yozganda va ayni vaqtda xabar navbatiga event yuborganda muammo bo'lishi mumkin: baza tranzaksiyasi muvaffaqiyatli bo'ladi, lekin tarmoq xatosi tufayli event yuborilmay qoladi.
**Outbox Pattern** yordamida:
1. Biznes ma'lumot va yuborilishi kerak bo'lgan event bitta mahalliy tranzaksiyada xuddi shu bazaning maxsus \`outbox\` jadvaliga yoziladi.
2. Alohida orqa fondagi jarayon (Message Relayer) ushbu \`outbox\` jadvalini o'qiydi va xabarlarni brokerga yuboradi. Yuborilgach, jadvaldan o'chiradi yoki statusini o'zgartiradi. Bu **kamida bir marta yetkazib berish (at-least-once delivery)** kafolatini beradi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

Keling, tranzaksion Outbox patterns ishlashini simulyatsiya qiluvchi tizim yozamiz.

\`\`\`javascript
// Simulyatsiya qilingan Ma'lumotlar Bazasi
const db = {
  users: {},
  outbox: [], // Xabarlar jadvali
  
  // Mahalliy tranzaksiya simulyatsiyasi
  runTransaction(callback) {
    try {
      callback();
      console.log("Mahalliy tranzaksiya tasdiqlandi (Commit)!");
    } catch (e) {
      console.error("Mahalliy tranzaksiya bekor qilindi (Rollback)!", e.message);
      this.outbox = []; // oddiy rollback simulyatsiyasi
    }
  }
};

// 1. Foydalanuvchini ro'yxatdan o'tkazish va voqeani outbox-ga yozish
function registerUser(userId, email) {
  db.runTransaction(() => {
    // A'zolar jadvaliga yozish
    db.users[userId] = { email, active: true };
    
    // Outbox jadvaliga event yozish
    db.outbox.push({
      id: Math.random().toString(36).substr(2, 9),
      aggregateType: "USER",
      eventType: "USER_REGISTERED",
      payload: JSON.stringify({ userId, email }),
      processed: false
    });
  });
}

// 2. Outbox Processor (Message Relayer)
function processOutbox(messageBroker) {
  const pending = db.outbox.filter(msg => !msg.processed);
  
  pending.forEach(msg => {
    try {
      messageBroker.publish(msg.eventType, JSON.parse(msg.payload));
      msg.processed = true; // Yuborilgan deb belgilash
      console.log(\`Event \${msg.eventType} brokerga yuborildi.\`);
    } catch (err) {
      console.error(\`Brokerga xabar yuborishda xato:\`, err.message);
    }
  });
}

// Ishga tushirish testi
const mockBroker = {
  publish: (event, payload) => console.log(\`[BROKER] Qabul qilindi: \${event}\`, payload)
};

registerUser("u-001", "dev@example.com");
processOutbox(mockBroker);
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Kompensatsiya tranzaksiyasining muvaffaqiyatsiz bo'lishi (Rollback failure)
Saga rollback jarayonida bitta servis o'chib qolsa, nima qilish kerak?
* **Junior yondashuv:** Faqatgina \`try/catch\` yozib, xatolikni konsolga chiqaradi va rollback-ni to'xtatadi. Natijada tizim yarim-bekor qilingan holatda qoladi.
* **Senior yondashuv:** Rollback funksiyalarini idempotent qilib yozadi va xato bo'lsa, ularni qayta ishlovchi navbatga (dead-letter queue) solib qo'yadi yoki avtomatik qayta urinish (retry policy) mexanizmini qo'shadi.

### 2. Idempotentlikning yo'qligi
Agar tarmoq uzilishi sababli foydalanuvchiga javob bormay qolsa, foydalanuvchi tugmani yana bosadi. Agar to'lov so'rovi idempotent bo'lmasa, foydalanuvchidan ikki marta pul yechiladi.
* **Xato kod:**
  \`\`\`javascript
  app.post('/pay', (req, res) => {
    chargeUser(req.body.userId, req.body.amount); // Har safar chaqirilganda pul yechaveradi
    res.send({ success: true });
  });
  \`\`\`
* **Tuzatilgan kod:**
  \`\`\`javascript
  app.post('/pay', async (req, res) => {
    const { idempotencyKey, userId, amount } = req.body;
    const existing = await db.payments.findOne({ idempotencyKey });
    if (existing) {
      return res.send(existing.response);
    }
    const result = await chargeUser(userId, amount);
    await db.payments.create({ idempotencyKey, response: result });
    res.send(result);
  });
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Yondashuv | Afzalligi | Kamchiligi | Qachon ishlatiladi |
| :--- | :--- | :--- | :--- |
| **Two-Phase Commit (2PC)** | Kuchli moslik (Strong Consistency), oson dasturlash | Bloklanish, sekin ishlash, tarmoq xatolariga sezgirlik | Yuqori moslik talab etadigan moliya operatsiyalarida |
| **Saga Orchestration** | Markaziy nazorat, jarayonlarni kuzatish oson, BASE modeliga mos | Orkestrator yagona nosozlik nuqtasi bo'lishi mumkin | Murakkab biznes jarayonlari va ko'p bosqichli buyurtmalarda |
| **Saga Choreography** | Servislar orasida bog'liqlik yo'q (loose coupling), yuqori unumdorlik | Tizim zanjirini tushunish va kuzatish juda qiyin | Oddiy, bir necha bosqichli asinxron event-driven tizimlarda |
| **Outbox Pattern** | \\"Kamida bir marta\\" yetkazish kafolati, bazaviy tranzaksiyalar xavfsizligi | Outbox jadvalini muntazam tekshirish resurs talab qiladi | Mikroservislardan event-driven xabar yuborishda |

---

## 7. ❓ Savollar va Javoblar

### 1. Saga patterns orqali ACID tranzaksiyasini to'liq almashtirsa bo'ladimi?
Yo'q. Saga-da \\"Isolation\\" (Izolyatsiya) yo'q. Ya'ni, tranzaksiya hali to'liq yakunlanmasdan turib, boshqa foydalanuvchilar qisman bajarilgan ma'lumotlarni ko'rib turishi mumkin (Soft state). Shuning uchun u BASE modeliga tegishli.

### 2. Idempotency kaliti nima va uni qayerda generatsiya qilish kerak?
Idempotency kaliti (odatda UUID) mijoz (frontend yoki API chaqiruvchi servis) tomonidan generatsiya qilinadi. U so'rov sarlavhasida (header) \`Idempotency-Key\` sifatida yuboriladi va server tomonidan bazada tekshiriladi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Mikorvislar arxitekturasida nega an'anaviy \`BEGIN TRANSACTION\` va \`COMMIT\` ishlamaydi?
2. 2PC ning Prepare va Commit fazalarida koordinator o'chib qolsa, qanday muammo yuzaga keladi?
3. Saga patterns doirasida kompensatsiya tranzaksiyasi nima va u oddiy rollback-dan qanday farq qiladi?
4. Transactional Outbox patterns nima uchun \\"at-least-once\\" (kamida bir marta) yetkazib berishni kafolatlaydi, \\"exactly-once\\" ni emas?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi mashqlar va testlar yordamida taqsimlangan tizimlarda tranzaksiyalarni boshqarish bo'yicha amaliy bilimlaringizni tekshiring va mustahkamlang.

---

## 10. 📊 Tizim Arxitekturasi (Mermaid Diagram)

Quyida Saga patterns doirasidagi muvaffaqiyatli tranzaksiya va xatolik sababli kompensatsiya qilish (rollback) oqimi tasvirlangan:

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Orchestrator
    participant PaymentService
    participant InventoryService

    Note over Client, InventoryService: Muvaffaqiyatli Oqim (Saga Success Flow)
    Client->>Orchestrator: Buyurtma berish (Order Request)
    Orchestrator->>PaymentService: Pul yechish (Charge)
    PaymentService-->>Orchestrator: OK (Payment ID)
    Orchestrator->>InventoryService: Mahsulot zaxiralash (Reserve)
    InventoryService-->>Orchestrator: OK (Reservation ID)
    Orchestrator-->>Client: Buyurtma qabul qilindi (Success)

    Note over Client, InventoryService: Xatolik va Rollback (Compensating Flow)
    Client->>Orchestrator: Yangi Buyurtma
    Orchestrator->>PaymentService: Pul yechish (Charge)
    PaymentService-->>Orchestrator: OK (Payment ID)
    Orchestrator->>InventoryService: Mahsulot zaxiralash (Reserve)
    InventoryService-->>Orchestrator: Xato! (Omborda mahsulot qolmagan)
    
    Note over Orchestrator, PaymentService: Kompensatsiya boshlanadi (Rollback Phase)
    Orchestrator->>PaymentService: Pulni qaytarish (Refund Payment ID)
    PaymentService-->>Orchestrator: Refunded
    Orchestrator-->>Client: Buyurtma rad etildi (Failed & Refunded)
\`\`\``,
  exercises: [
    {
      id: 1,
      title: "1️⃣ 2PC Coordinator Vote Checker",
      instruction: "Ikki fazali tranzaksiya (Two-Phase Commit) koordinatorining birinchi fazasida barcha ishtirokchilarning ovozini tekshiruvchi `checkPrepareVotes(votes)` funksiyasini yozing. Ovozlar massivi faqat `'VOTE_COMMIT'` va `'VOTE_ABORT'` qiymatlarini qabul qiladi. Agar barcha ishtirokchilar `'VOTE_COMMIT'` ovozini bergan bo'lsa, `'GLOBAL_COMMIT'` qaytaring. Agar kamida bitta tugun `'VOTE_ABORT'` bergan bo'lsa yoki ishtirokchilar massivi bo'sh bo'lsa, `'GLOBAL_ABORT'` qaytaring.",
      startingCode: "function checkPrepareVotes(votes) {\n  // Kodni shu yerda yozing\n}",
      hint: "Array.prototype.every() yordamida massivdagi barcha element 'VOTE_COMMIT' ekanligini va massiv uzunligi 0 dan katta ekanligini tekshiring.",
      test: "if (typeof checkPrepareVotes !== 'function') return 'checkPrepareVotes topilmadi';\nif (checkPrepareVotes(['VOTE_COMMIT', 'VOTE_COMMIT']) !== 'GLOBAL_COMMIT') return 'Barcha commit ovoz berilganda xato';\nif (checkPrepareVotes(['VOTE_COMMIT', 'VOTE_ABORT']) !== 'GLOBAL_ABORT') return 'Bitta abort bo\\'lganda global abort bo\\'lishi kerak';\nif (checkPrepareVotes([]) !== 'GLOBAL_ABORT') return 'Bo\\'sh massiv holatida abort bo\\'lishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2️⃣ 2PC Coordinator Commit/Abort Decision Router",
      instruction: "Ikki fazali tranzaksiya koordinatorining qaror qabul qilish va tarqatish bosqichini simulyatsiya qiluvchi `coordinate2PC(nodes, prepareFn, commitFn, abortFn)` funksiyasini yozing. Funksiya barcha tugunlarni `prepareFn(node)` orqali so'roq qilishi kerak. Agar hamma tugunlar `true` qaytarsa, barcha tugunlar uchun `commitFn(node)` chaqiriladi va `'SUCCESS'` qaytariladi. Agar kamida bitta tugun `false` qaytarsa (yoki xato tashlasa), barcha tugunlar uchun `abortFn(node)` chaqiriladi va `'ROLLBACK'` qaytariladi.",
      startingCode: "function coordinate2PC(nodes, prepareFn, commitFn, abortFn) {\n  // Kodni shu yerda yozing\n}",
      hint: "Barcha node-larni aylanib chiqib prepareFn(node) chaqiring va natijalarni tekshiring. Agar hammasi to'g'ri bo'lsa commitFn, aks holda abortFn chaqiring.",
      test: "if (typeof coordinate2PC !== 'function') return 'coordinate2PC topilmadi';\nlet committed = [];\nlet aborted = [];\nconst prepareTrue = (n) => true;\nconst commit = (n) => committed.push(n);\nconst abort = (n) => aborted.push(n);\nconst res1 = coordinate2PC([1, 2], prepareTrue, commit, abort);\nif (res1 !== 'SUCCESS' || committed.length !== 2 || aborted.length !== 0) return 'Muvaffaqiyatli commit jarayoni xato';\ncommitted = [];\naborted = [];\nconst prepareMixed = (n) => n === 1;\nconst res2 = coordinate2PC([1, 2], prepareMixed, commit, abort);\nif (res2 !== 'ROLLBACK' || committed.length !== 0 || aborted.length !== 2) return 'Bekor qilish (Abort) jarayoni xato';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ Saga kompensatsiya mexanizmi (Saga Rollback)",
      instruction: "Saga orkestratorining kompensatsiya tranzaksiyalarini (Rollback) bajarish funksiyasini yozing. `runSaga(steps, data)` funksiyasi asinxron qadamlar massivi `steps` va umumiy ob'ekt `data` ni qabul qiladi. Har bir step `{ name: string, action: function, rollback: function }` ko'rinishida bo'ladi. Funksiya har bir stepning `action(data)` metodini ketma-ket asinxron ravishda chaqirishi kerak. Agar biron-bir bosqichda xatolik yuz bersa (action false qaytarsa yoki throw qilsa), shu bosqichgacha muvaffaqiyatli bajarilgan barcha oldingi qadamlarning `rollback(data)` funksiyalarini teskari tartibda (oxirgisidan birinchisigacha) chaqiring va `{ status: 'FAILED', error: err_message }` qaytaring. Hammasi muvaffaqiyatli bo'lsa, `{ status: 'SUCCESS' }` qaytaring.",
      startingCode: "async function runSaga(steps, data) {\n  // Kodni shu yerda yozing\n}",
      hint: "Try-catch blokidan foydalaning. Har bir muvaffaqiyatli stepni alohida massivga push qilib boring. Xato bo'lsa, o'sha massivni teskari aylanib rollback funksiyalarini await qiling.",
      test: "if (typeof runSaga !== 'function') return 'runSaga funksiya emas';\nconst steps = [\n  { name: 'step1', action: async (d) => { d.logs.push('A'); return true; }, rollback: async (d) => { d.logs.push('RA'); } },\n  { name: 'step2', action: async (d) => { d.logs.push('B'); throw new Error('Err'); }, rollback: async (d) => { d.logs.push('RB'); } }\n];\nconst data = { logs: [] };\nreturn runSaga(steps, data).then(res => {\n  if (res.status !== 'FAILED') return 'Xato bo\\'lganda status FAILED bo\\'lishi kerak';\n  if (data.logs.join(',') !== 'A,B,RA') return 'Rollback tartibi yoki bajarilishi noto\\'g\\'ri: ' + data.logs.join(',');\n  return null;\n}).catch(e => 'Xatolik yuz berdi: ' + e.message);"
    },
    {
      id: 4,
      title: "4️⃣ Idempotentlik Middleware simulyatsiyasi",
      instruction: "Tarqatilgan tizimlarda mijoz tomonidan yuborilgan idempotent so'rovlarni boshqaruvchi `processIdempotentRequest(store, key, handler)` funksiyasini yozing. `store` — kalit-qiymat ko'rinishidagi kesh ombori. Agar `key` (idempotency key) `store` ichida oldindan mavjud bo'lsa, `handler` funksiyasini chaqirmasdan, keshdagi saqlangan qiymatni qaytaring. Agar kalit mavjud bo'lmasa, `handler` funksiyasini chaqiring, qaytgan natijani `store[key]` ga saqlang va natijani qaytaring.",
      startingCode: "function processIdempotentRequest(store, key, handler) {\n  // Kodni shu yerda yozing\n}",
      hint: "store[key] qiymatini tekshiring. Agar u undefined bo'lmasa, uni qaytaring. Aks holda handler() natijasini keshga yozib qaytaring.",
      test: "if (typeof processIdempotentRequest !== 'function') return 'processIdempotentRequest topilmadi';\nconst store = {};\nlet counter = 0;\nconst handler = () => { counter++; return 'Result ' + counter; };\nconst res1 = processIdempotentRequest(store, 'key-1', handler);\nconst res2 = processIdempotentRequest(store, 'key-1', handler);\nconst res3 = processIdempotentRequest(store, 'key-2', handler);\nif (res1 !== 'Result 1') return 'Birinchi chaqiruv xato';\nif (res2 !== 'Result 1') return 'Ikkinchi chaqiruv idempotent emas (qiymat o\\'zgardi)';\nif (counter !== 2) return 'Handler noto\\'g\\'ri marta chaqirilgan: ' + counter;\nif (res3 !== 'Result 2') return 'Yangi kalit bilan chaqiruv xato';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ Transactional Outbox: Event Yozuvchisi",
      instruction: "Biznes ob'ektini va unga tegishli eventni bitta ma'lumotlar bazasining tranzaksiyasiga yozish simulyatsiyasini amalga oshiruvchi `writeToOutbox(db, aggregateType, eventType, payload)` funksiyasini yozing. `db` ob'ektida `users` ob'ekti va `outbox` massivi bor. Shuningdek `db.runInTransaction(cb)` metodi mavjud. Siz ushbu tranzaksiya ichida: (1) Agar `aggregateType === 'USER'` bo'lsa, payload'dagi foydalanuvchini `db.users[payload.id] = payload` qilib saqlashingiz kerak. (2) `db.outbox` massiviga `{ id: string, aggregateType, eventType, payload: JSON_string, processed: false }` ob'ektini push qilishingiz kerak. Outbox event ID tasodifiy satr bo'lishi mumkin.",
      startingCode: "function writeToOutbox(db, aggregateType, eventType, payload) {\n  // Kodni shu yerda yozing\n}",
      hint: "db.runInTransaction(() => { ... }) ichida biznes ob'ektni saqlang va outbox massiviga yangi event ob'ektini push qiling. Payloadni JSON.stringify() qiling.",
      test: "const db = {\n  users: {},\n  outbox: [],\n  runInTransaction(cb) { cb(); }\n};\nif (typeof writeToOutbox !== 'function') return 'writeToOutbox topilmadi';\nwriteToOutbox(db, 'USER', 'USER_REGISTERED', { id: 'u-1', name: 'Ali' });\nif (!db.users['u-1'] || db.users['u-1'].name !== 'Ali') return 'Foydalanuvchi ma\\'lumoti saqlanmadi';\nif (db.outbox.length !== 1) return 'Outbox-ga event yozilmadi';\nif (db.outbox[0].aggregateType !== 'USER' || db.outbox[0].processed !== false) return 'Outbox event maydonlari xato';\nreturn null;"
    },
    {
      id: 6,
      title: "6️⃣ Transactional Outbox: Message Relayer",
      instruction: "Ma'lumotlar bazasining outbox jadvalini o'qib, hali yuborilmagan xabarlarni brokerga nashr (publish) etuvchi `processOutbox(db, publisher)` funksiyasini yozing. `db.outbox` massividagi har bir `processed: false` bo'lgan event uchun `publisher.publish(event.eventType, JSON.parse(event.payload))` chaqirilsin. Agar yuborish muvaffaqiyatli bo'lsa, ushbu eventning `processed` qiymati `true` qilib qo'yilsin. Agar `publisher.publish` xato tashlasa (throw), eventning `processed` qiymati o'zgarmasdan qolsin (keyingi safar qayta urinish uchun).",
      startingCode: "function processOutbox(db, publisher) {\n  // Kodni shu yerda yozing\n}",
      hint: "db.outbox bo'ylab tsikl aylanib, processed === false bo'lganlarini tanlang va try-catch bloki ichida publisher.publish chaqiring.",
      test: "if (typeof processOutbox !== 'function') return 'processOutbox topilmadi';\nconst db = {\n  outbox: [\n    { id: '1', eventType: 'A', payload: '{\"x\":1}', processed: false },\n    { id: '2', eventType: 'B', payload: '{\"y\":2}', processed: false }\n  ]\n};\nlet published = [];\nconst publisher = {\n  publish(type, data) {\n    if (type === 'B') throw new Error('Network error');\n    published.push({ type, data });\n  }\n};\nprocessOutbox(db, publisher);\nif (published.length !== 1 || published[0].type !== 'A') return 'Faqat A yuborilishi kerak edi';\nif (db.outbox[0].processed !== true) return 'A event yuborilgan deb belgilanishi kerak edi';\nif (db.outbox[1].processed !== false) return 'B event xatolik tufayli false bo\\'lib qolishi kerak edi';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ Saga Choreography: Event-Driven buyurtma oqimi",
      instruction: "Saga Choreography modelini simulyatsiya qiling. `choreographOrder(orderId, event, services)` funksiyasini yozing. `event` ob'ekti `{ name: string, data: any }` shaklida bo'ladi. `services` esa `{ [serviceName]: { handleEvent: function } }` ob'ektidir. Har bir servis voqealarni qayta ishlab, yangi voqea qaytarishi mumkin. Agar kelgan event name `'ORDER_CREATED'` bo'lsa, u `PaymentService`ga uzatiladi va uning handleridan qaytgan event nomi `'PAYMENT_COMPLETED'` bo'lsa, u `InventoryService`ga uzatiladi. Har qadamda handlerlardan qaytgan yangi event nomi va data keyingi servisga zanjir ko'rinishida uzatilishi kerak. Zanjir yangi event qaytmay qolguniga qadar davom etsin va yakuniy eventni qaytarsin.",
      startingCode: "function choreographOrder(orderId, event, services) {\n  // Kodni shu yerda yozing\n}",
      hint: "Tsikl orqali joriy event nomiga qarab mos servisni chaqiring va olingan natijani joriy eventga tenglang.",
      test: "if (typeof choreographOrder !== 'function') return 'choreographOrder topilmadi';\nconst services = {\n  PaymentService: {\n    handleEvent: (ev) => { return { name: 'PAYMENT_COMPLETED', data: { paid: true } }; }\n  },\n  InventoryService: {\n    handleEvent: (ev) => { return { name: 'INVENTORY_RESERVED', data: { reserved: true } }; }\n  }\n};\nconst finalEvent = choreographOrder('ord-123', { name: 'ORDER_CREATED', data: {} }, services);\nif (!finalEvent || finalEvent.name !== 'INVENTORY_RESERVED') return 'Saga Choreography yakuniy natijasi xato: ' + (finalEvent ? finalEvent.name : 'null');\nreturn null;"
    },
    {
      id: 8,
      title: "8️⃣ Dinamik Saga Orkestratori va Bosqichlarni Kuzatish",
      instruction: "Dinamik Saga orkestratorini yarating. `executeDynamicSaga(context, initSteps)` funksiyasi `context` va step'lar massivini oladi. Har bir step `{ name: string, execute: function(ctx), compensate: function(ctx) }` bo'ladi. Agar `execute` bajarilayotganda u yangi step ob'ektini qaytarsa, u orkestratorning bajarilishi lozim bo'lgan navbatdagi step'lari oxiriga qo'shilishi kerak. Agar biron step xato bersa, faqatgina muvaffaqiyatli bajarilgan step'larning `compensate` funksiyalari teskari tartibda chaqiriladi.",
      startingCode: "async function executeDynamicSaga(context, initSteps) {\n  // Kodni shu yerda yozing\n}",
      hint: "initSteps massivini nusxalab navbat (queue) sifatida ishlating. Elementlarni navbatdan chiqarib bajaring, agar yangi step qaytsa navbatga push qiling. Xato bo'lsa rollback massividan chaqiring.",
      test: "if (typeof executeDynamicSaga !== 'function') return 'executeDynamicSaga topilmadi';\nconst context = { path: [] };\nconst steps = [\n  {\n    name: 'A',\n    execute: async (ctx) => {\n      ctx.path.push('A');\n      return {\n        name: 'B',\n        execute: async (c) => { c.path.push('B'); throw new Error('Fail B'); },\n        compensate: async (c) => { c.path.push('CB'); }\n      };\n    },\n    compensate: async (ctx) => { ctx.path.push('CA'); }\n  }\n];\nreturn executeDynamicSaga(context, steps).then(res => {\n  if (res.status !== 'FAILED') return 'Saga muvaffaqiyatsiz bo\\'lishi kerak edi';\n  if (context.path.join(',') !== 'A,B,CA') return 'Dinamik compensating tartibi noto\\'g\\'ri: ' + context.path.join(',');\n  return null;\n}).catch(e => 'Xatolik: ' + e.message);"
    },
    {
      id: 9,
      title: "9️⃣ Taqsimlangan Qulf (Distributed Lock Lease) Simulyatsiyasi",
      instruction: "Taqsimlangan tizimlarda parallel operatsiyalarni cheklash uchun qulf (Lock Lease) mexanizmini yozing. `acquireLock(store, lockId, clientId, ttlMs)` funksiyasi `store` obyektini qabul qiladi. Agar `store[lockId]` mavjud bo'lmasa yoki undagi qulf muddati (`expiresAt`) joriy vaqtdan kichik yoki teng bo'lsa (ya'ni eskirgan bo'lsa), yangi qulf o'rnatib (`expiresAt = Date.now() + ttlMs`, `owner = clientId`) `true` qaytarsin. Agar qulf hali faol bo'lsa va egasi boshqa mijoz bo'lsa, `false` qaytarsin.",
      startingCode: "function acquireLock(store, lockId, clientId, ttlMs) {\n  // Kodni shu yerda yozing\n}",
      hint: "Date.now() dan foydalanib expiresAt qiymatini solishtiring va egasini tekshiring.",
      test: "if (typeof acquireLock !== 'function') return 'acquireLock topilmadi';\nconst store = {};\nconst acquired1 = acquireLock(store, 'lock-1', 'client-A', 1000);\nif (acquired1 !== true) return 'Qulf birinchi marta olinishi kerak edi';\nconst acquired2 = acquireLock(store, 'lock-1', 'client-B', 1000);\nif (acquired2 !== false) return 'Boshqa mijoz faol qulfni ololmasligi kerak';\nstore['lock-1'].expiresAt = Date.now() - 100; // Vaqtini o'tkazib yuboramiz\nconst acquired3 = acquireLock(store, 'lock-1', 'client-B', 1000);\nif (acquired3 !== true) return 'Eskirgan qulfni yangi mijoz ololishi kerak edi';\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 Ma'lumotlar Mosligi Reconciliation (Sinxronlikni tekshirish)",
      instruction: "Taqsimlangan ma'lumotlar replikalari orasidagi farqni aniqlaydigan reconciliation (solishtirish) jobini yozing. `reconcileData(primary, replica)` funksiyasi ikkita foydalanuvchilar ob'ektini qabul qiladi (masalan, `{ 'u-1': { id: 'u-1', version: 2 }, ... }`). Funksiya replica manbasida mavjud bo'lmagan foydalanuvchilar ID-larini, yoki replica-dagi `version` qiymati primary-dan farqli bo'lgan foydalanuvchilar ID-larini massiv ko'rinishida qaytarishi kerak.",
      startingCode: "function reconcileData(primary, replica) {\n  // Kodni shu yerda yozing\n}",
      hint: "primary ob'ekt kalitlari bo'ylab aylanib chiqib, replikada borligini va versiyasi tengligini tekshiring.",
      test: "if (typeof reconcileData !== 'function') return 'reconcileData topilmadi';\nconst primary = {\n  'u-1': { id: 'u-1', version: 1 },\n  'u-2': { id: 'u-2', version: 3 },\n  'u-3': { id: 'u-3', version: 2 }\n};\nconst replica = {\n  'u-1': { id: 'u-1', version: 1 },\n  'u-2': { id: 'u-2', version: 2 } // Versiya eskirgan\n  // u-3 yetishmayapti\n};\nconst diff = reconcileData(primary, replica);\nif (diff.length !== 2 || !diff.includes('u-2') || !diff.includes('u-3')) return 'Solishtirish natijasi noto\\'g\\'ri';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "ACID va BASE modellarining asosiy farqi nimada?",
      options: [
        "ACID har doim kuchli moslikni (Strong Consistency) kafolatlaydi, BASE esa ma'lum vaqt o'tgach keladigan moslikka (Eventual Consistency) ruxsat beradi",
        "ACID faqat NoSQL bazalarda, BASE esa faqat relyatsion (SQL) bazalarda ishlaydi",
        "BASE modeli tranzaksiyalarni tezlashtiradi, lekin hech qanday xatolikni tiklay olmaydi",
        "ACID tranzaksiyalari tarmoq bo'linishiga chidamli emas, BASE esa mutlaq izolyatsiyani ta'minlaydi"
      ],
      correctAnswer: 0,
      explanation: "ACID ma'lumotlarning har lahzada 100% to'g'ri bo'lishini talab qiladi. BASE esa tizim tezroq ishlashi uchun vaqtinchalik mos emaslik (Soft State) va oxir-oqibat moslik (Eventual Consistency) qoidalariga asoslanadi."
    },
    {
      id: 2,
      question: "Two-Phase Commit (2PC) protokolining Prepare (Tayyorgarlik) bosqichida nima sodir bo'ladi?",
      options: [
        "Koordinator barcha ishtirokchi tugunlardan mahalliy tranzaksiyani bajarishga tayyorligini so'raydi va ularning ovozlarini yig'adi",
        "Koordinator barcha tugunlarga ma'lumotlarni darhol commit qilishni buyuradi",
        "Mijoz so'rov sarlavhasida idempotency kalitini generatsiya qiladi",
        "Faqat bitta asosiy server tranzaksiyani tekshirib, qolganlarini bloklaydi"
      ],
      correctAnswer: 0,
      explanation: "Prepare bosqichida koordinator ishtirokchi bazalardan tranzaksiyani yozishga tayyorligini so'raydi. Ishtirokchilar resurslarni qulflaydi va tayyor bo'lsa 'VOTE_COMMIT', bo'lmasa 'VOTE_ABORT' javobini berishadi."
    },
    {
      id: 3,
      question: "2PC (Ikki fazali tasdiqlash) protokolining eng katta kamchiligi nima?",
      options: [
        "Bloklanish muammosi: agar Prepare bosqichidan keyin koordinator ishdan chiqsa, ishtirokchilar resurslarni qulflagancha kutib qolishadi",
        "Uning faqat NoSQL ma'lumotlar bazalarida ishlashi",
        "Unga ko'ra ma'lumotlar faqat bitta replikada saqlanishi kerakligi",
        "Har bir so'rov uchun idempotency kalitini majburiy talab qilishi"
      ],
      correctAnswer: 0,
      explanation: "2PC bloklanuvchi protokol hisoblanadi. Agar koordinator ovozlar yig'ilgandan keyin va qaror qabul qilishdan oldin o'chib qolsa, ishtirokchilar tranzaksiyani commit ham, abort ham qila olmay resurslarni band qilib turaveradi."
    },
    {
      id: 4,
      question: "3PC (Uch fazali tasdiqlash) protokoli 2PC dagi bloklanish muammosini qanday hal qilishga urinadi?",
      options: [
        "Oraliq Pre-Commit bosqichini va taym-autlarga asoslangan bekor qilish mexanizmlarini qo'shish orqali",
        "Tranzaksiyani butunlay asinxron va navbatsiz bajarish orqali",
        "Koordinator rolini tizimdan butunlay olib tashlash orqali",
        "Ma'lumotlar bazasini faqat o'qish rejimiga o'tkazish orqali"
      ],
      correctAnswer: 0,
      explanation: "3PC protokoli tayyorlanish va tasdiqlash bosqichlari orasiga Pre-Commit bosqichini qo'shadi va tugunlar uchun taym-aut belgilaydi. Agar koordinator belgilangan vaqtda javob bermasa, tugunlar o'zlari tranzaksiyani bekor qilishlari yoki davom ettirishlari mumkin."
    },
    {
      id: 5,
      question: "Saga pattern (Saga andozasi) nima?",
      options: [
        "Ketma-ket keluvchi mahalliy tranzaksiyalar zanjiri bo'lib, har bir qadam muvaffaqiyatsiz bo'lganda oldingilarini bekor qiluvchi kompensatsiya tranzaksiyalariga ega tizim",
        "Barcha SQL so'rovlarini keshlovchi maxsus Redis kutubxonasi",
        "Taqsimlangan ma'lumotlar bazalarida replikatsiyani boshqaruvchi drayver",
        "Faqat foydalanuvchi parolini shifrlaydigan xavfsizlik protokoli"
      ],
      correctAnswer: 0,
      explanation: "Saga mikroservislarda tranzaksiyalarni boshqarish uchun ishlatiladi. Unda bitta katta global tranzaksiya o'rniga kichik mahalliy tranzaksiyalar ishlatiladi va xatolik bo'lsa, kompensatsiya (refund/release) yordamida orqaga qaytariladi."
    },
    {
      id: 6,
      question: "Saga-da Orchestration va Choreography yondashuvlarining asosiy farqi nimada?",
      options: [
        "Orchestration-da markaziy boshqaruvchi (Orchestrator) bo'ladi, Choreography-da esa servislar voqealar (events) orqali o'zaro asinxron bog'lanadi",
        "Choreography faqat sinxron HTTP so'rovlari uchun mo'ljallangan, Orchestration esa faqat NoSQL bazalarda ishlaydi",
        "Orchestration-da kompensatsiya tranzaksiyalari bo'lmaydi, Choreography-da esa bor",
        "Choreography har doim bitta ma'lumotlar bazasiga yozishni talab qiladi"
      ],
      correctAnswer: 0,
      explanation: "Orchestrator markaziy o'yinchi bo'lib, har bir qadamni boshqaradi. Choreography-da esa har bir servis o'z ishini tugatgach voqea (event) chiqaradi va boshqa servislar bu voqealarga mustaqil reaksiya bildirishadi."
    },
    {
      id: 7,
      question: "Saga andozasida kompensatsiya tranzaksiyasi (Compensating Transaction) nima?",
      options: [
        "Avval bajarilgan va tasdiqlangan mahalliy tranzaksiyaning biznes natijasini teskari amal bilan bekor qiluvchi tranzaksiya",
        "Dasturchining xizmat haqini avtomatik hisoblab beruvchi funksiya",
        "Barcha serverlarni o'chirib, ma'lumotlarni qayta tiklovchi skript",
        "Foydalanuvchining hisobidagi pulni tekshiruvchi read-only so'rov"
      ],
      correctAnswer: 0,
      explanation: "Kompensatsiya tranzaksiyasi — oldingi muvaffaqiyatli qadamni bekor qiluvchi mantiqdir. Masalan, agar pul yechilgan bo'lsa (charge), uning kompensatsiyasi pulni qaytarish (refund) hisoblanadi."
    },
    {
      id: 8,
      question: "Nima uchun Saga patterns an'anaviy ACID kabi to'liq 'Isolation' (Izolyatsiya)ga ega emas?",
      options: [
        "Chunki har bir mahalliy tranzaksiya darhol commit qilinadi va uning natijalari butun Saga tugashidan oldin boshqalarga ko'rinadi",
        "Chunki Saga faqat bitta serverda va bitta oqimda ishlaydi",
        "Chunki u ma'lumotlar bazasini qulflashga mutlaqo yo'l qo'ymaydi",
        "Chunki u tranzaksiyani faqat o'qish (read-only) rejimida bajara oladi"
      ],
      correctAnswer: 0,
      explanation: "Saga-da har bir servis o'z bazasiga yozib, darhol commit qiladi. Butun jarayon hali oxiriga yetmagan bo'lsa ham, boshqa mijozlar o'sha bazadagi yangi ma'lumotni ko'ra olishadi (soft state), bu esa izolyatsiyaning yo'qligini bildiradi."
    },
    {
      id: 9,
      question: "Transactional Outbox Pattern-ning asosiy maqsadi nima?",
      options: [
        "Mahalliy baza o'zgarishi va xabar navbatiga event yuborishni bitta tranzaksiya ichida kafolatlab, xabarlar yo'qolishining oldini olish",
        "Foydalanuvchiga asinxron elektron xat yuborish tezligini oshirish",
        "Ma'lumotlar bazasidagi JOIN so'rovlarini avtomatik optimallashtirish",
        "Balla HTTP xatoliklarini Outbox deb nomlangan maxsus faylga yozish"
      ],
      correctAnswer: 0,
      explanation: "Outbox andozasi ma'lumot yozish va unga mos eventni brokerga yuborish orasidagi nomuvofiqlikni hal qiladi. Har ikkisi bitta bazaga bitta tranzaksiya ichida yozilgani sababli, ma'lumot ham, event ham kafolatli saqlanadi."
    },
    {
      id: 10,
      question: "Outbox andozasidagi Message Relayer (Xabarni yetkazuvchi) vazifasi nima?",
      options: [
        "Outbox jadvalini doimiy o'qib, hali yuborilmagan xabarlarni brokerga yuborish va ularni yuborilgan deb belgilash",
        "Foydalanuvchi parollarini shifrlab xavfsizlikni tekshirish",
        "API shlyuz (API Gateway) orqali kelayotgan so'rovlarni load balance qilish",
        "Tarmoqdagi sekin ulanishlarni avtomatik uzib qo'yish"
      ],
      correctAnswer: 0,
      explanation: "Message Relayer orqa fonda ishlab, outbox jadvalidagi yuborilmagan xabarlarni brokerga (masalan, Kafka/RabbitMQ) yuboradi va statusini o'zgartiradi. Agar tarmoq uzilsa, keyinroq yana urinib ko'radi (at-least-once)."
    },
    {
      id: 11,
      question: "Taqsimlangan tizimlarda Idempotentlik (Idempotency) nima degani?",
      options: [
        "Bir xil so'rovni bir necha marta yuborganda ham tizim holati faqat birinchi so'rovdagidek o'zgarishi va bir xil natija qaytarishi",
        "Serverning bir vaqtning o'zida juda ko'p parallel so'rovlarni qabul qila olish xususiyati",
        "Ma'lumotlar bazasini bir nechta serverga nusxalash tezligi",
        "Tizimning xakerlik hujumlariga qarshi himoyalanganlik darajasi"
      ],
      correctAnswer: 0,
      explanation: "Idempotentlik — operatsiya necha marta chaqirilishidan qat'i nazar, tizim holatiga faqat bir marta ta'sir qilishidir. Masalan, bir xil buyurtma uchun to'lovni 3 marta bossak ham, pul faqat 1 marta yechilishi kerak."
    },
    {
      id: 12,
      question: "Real loyihalarda Idempotency Key (Idempotentlik kaliti) odatda qayerda generatsiya qilinadi?",
      options: [
        "Mijoz tomonida (masalan, frontend dasturda) so'rov yuborishdan oldin",
        "Ma'lumotlar bazasida tranzaksiya to'liq commit qilingandan keyin",
        "Message broker ichida xabarlarni marshrutlash paytida",
        "Operatsion tizimning yadro (kernel) darajasida"
      ],
      correctAnswer: 0,
      explanation: "Idempotentlik kaliti (masalan, UUID) mijoz tomonidan yaratiladi va so'rov sarlavhasida serverga yuboriladi. Agar so'rov uzilib qolsa, mijoz aynan shu kalit bilan so'rovni qayta yuboradi, server esa uni tanib oladi."
    }
  ]
};

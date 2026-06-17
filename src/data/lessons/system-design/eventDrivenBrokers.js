export const eventDrivenBrokers = {
  id: "eventDrivenBrokers",
  title: "Event-Driven Architecture va Xabarlar Brokerlari (RabbitMQ & Kafka)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

Tizimlar kattalashgani sari, xizmatlarning o'zaro to'g'ridan-to'g'ri bog'lanishi (HTTP orqali) ko'plab muammolarni keltirib chiqaradi. Masalan, foydalanuvchi buyurtma berganda, to'lov xizmati, omborxona xizmati va SMS yuborish xizmatlari HTTP orqali bir-birini zanjirsimon kutib tursa, bitta xizmatdagi nosozlik butun tizimni to'xtatib qo'yishi mumkin.

**Event-Driven Architecture (Hodisalarga asoslangan arxitektura - EDA)** — bu tizimlar o'rtasida to'g'ridan-to'g'ri so'rov yuborish o'rniga, tizimda sodir bo'lgan voqealar (hodisalar - events) haqida xabar tarqatish orqali aloqa o'rnatish usuli.

### O'xshatish: 
Tasavvur qiling, siz yangi uy sotib olmoqchisiz va hujjatlarni rasmiylashtirishingiz kerak.
- **Sinxron (HTTP):** Siz barcha davlat idoralarini birma-bir aylanib, navbatda turib, har bir xodimning imzosini to'g'ridan-to'g'ri kutasiz. Agar bitta idora yopiq bo'lsa, butun ish to'xtaydi.
- **Message Broker (RabbitMQ):** Siz arizani topshirib ketasiz. Ariza "navbatga" tushadi va har bir idora xodimi o'z vaqtida arizani olib ishlaydi. Ish tugagach, ariza navbatdan o'chadi.
- **Event Stream (Kafka):** Bu xuddi e'lonlar taxtasiga o'xshaydi. Siz "Men uy sotib oldim!" deb e'lon osib qo'yasiz. Ushbu xabarni soliqchilar, uy-joy boshqarmasi va sug'urta kompaniyalari e'lonlar taxtasidan o'zlari o'qib, kerakli ishlarni bajarishadi. Siz hech kimni kutmaysiz, e'lon esa taxtada doimiy qoladi.

---

## 2. 💻 Real Kod Misollari

Quyida Event-Driven arxitekturasining asosiy elementlarini (Pub/Sub va Event Sourcing) simulyatsiya qiluvchi sodda JavaScript kodlari keltirilgan:

### Misol 1: Sodda Pub/Sub Broker
Ushbu kod hodisalarni ro'yxatdan o'tkazish va ularni tarqatish mexanizmini ko'rsatadi:

\`\`\`javascript
class SimplePubSub {
  constructor() {
    this.topics = {};
  }

  // Obuna bo'lish (Subscribe)
  subscribe(topic, consumer) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(consumer);
    console.log(\`Consumer obuna bo'ldi: \${topic}\`);
  }

  // Xabarni nashr etish (Publish)
  publish(topic, message) {
    if (!this.topics[topic]) return;
    this.topics[topic].forEach(consumer => {
      consumer(message);
    });
  }
}

const broker = new SimplePubSub();

// Iste'molchilar obuna bo'ladi
broker.subscribe("user_signed_up", (data) => console.log(\`[SMS Xizmati] SMS yuborildi: \${data.phone}\`));
broker.subscribe("user_signed_up", (data) => console.log(\`[Kesh Xizmati] Foydalanuvchi ma'lumotlari keshlandi: \${data.name}\`));

// Hodisa nashr etiladi
broker.publish("user_signed_up", { name: "Farhod", phone: "+998901234567" });
\`\`\`

### Misol 2: Event Sourcing Simulyatsiyasi
Event Sourcing-da joriy holat saqlanmaydi, balki o'zgarishlar tarixi (event log) orqali hisoblanadi:

\`\`\`javascript
class AccountEventStore {
  constructor() {
    this.events = [];
  }

  // Yangi hodisani qo'shish
  appendEvent(event) {
    this.events.push({
      ...event,
      timestamp: new Date()
    });
  }

  // Barcha hodisalarni qayta ijro etib (Replay), joriy holatni aniqlash
  getCurrentBalance() {
    let balance = 0;
    for (const event of this.events) {
      if (event.type === 'DEPOSIT') {
        balance += event.amount;
      } else if (event.type === 'WITHDRAW') {
        balance -= event.amount;
      }
    }
    return balance;
  }
}

const myAccount = new AccountEventStore();
myAccount.appendEvent({ type: 'DEPOSIT', amount: 1000 });
myAccount.appendEvent({ type: 'WITHDRAW', amount: 300 });
myAccount.appendEvent({ type: 'DEPOSIT', amount: 150 });

console.log(\`Joriy balans: \${myAccount.getCurrentBalance()} USD\`); // Joriy balans: 850 USD
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Message Queue (RabbitMQ) vs Event Streaming (Kafka)
- **RabbitMQ (Smart Broker, Dumb Consumer):**
  - Xabarlar navbatlarda (queues) vaqtinchalik saqlanadi.
  - Consumer xabarni muvaffaqiyatli qayta ishlab, brokerga \`ACK\` (Acknowledgment) yuborgach, xabar navbatdan o'chiriladi.
  - Bir marta o'qilgan xabarni qayta o'qib bo'lmaydi.
- **Apache Kafka (Dumb Broker, Smart Consumer):**
  - Ma'lumotlar mavzularda (topics) doimiy ravishda diskda saqlanadi (Retention Policy).
  - Consumer-lar o'zlarining o'qish joyini (\`offset\`) o'zlari boshqarishadi.
  - Xabarlar o'qilgandan keyin ham o'chirilmaydi. Istalgan vaqtda eski offset-ga qaytib, ma'lumotlarni qayta o'qish (replay) mumkin.

### 2. Message Delivery Guarantees (Yetkazib berish kafolatlari)
Tizimlarda xabarlarni yo'qotmaslik yoki takrorlamaslik uchun quyidagi kafolatlar ishlatiladi:
- **At-most-once (Ko'pi bilan bir marta):** Xabar yo'qolishi mumkin, lekin hech qachon takrorlanmaydi. Consumer xabarni olishi bilan \`ACK\` yuboradi, agar hisoblash jarayonida o'chib qolsa, xabar yo'qoladi.
- **At-least-once (Kamida bir marta):** Xabar hech qachon yo'qolmaydi, lekin takroran kelishi (dublikat) mumkin. Tarmoq uzilishi sababli \`ACK\` brokerga yetib bormasa, broker xabarni qayta yuboradi.
- **Exactly-once (Roppa-rosa bir marta):** Eng ideal va qiyin kafolat. Bunga tarmoqda *At-least-once* yetkazish va consumer-da *idempotentlik* (yoki tranzaksiyalar) orqali erishiladi.

### 3. Event Sourcing va CQRS
- **Event Sourcing:** Tizim holatini o'zgartiruvchi har bir harakat hodisa sifatida yozib boriladi. Masalan, bank hisob raqamining yakuniy balansi emas, barcha pul o'tkazmalari tarixi saqlanadi.
- **CQRS (Command Query Responsibility Segregation):** O'qish (Query) va yozish (Command) modellarini alohida ajratish. Yozish ma'lumotlar bazasi faqat event yozadi, o'qish bazasi (masalan, Elasticsearch) esa ushbu eventlar asosida tezkor qidiruv modellarini shakllantiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Consumer-larda Idempotentlikni hisobga olmaslik:** Brokerlar xabarni takroran yuborishi mumkin (At-least-once). Agar sizning to'lov consumer-ingiz idempotent bo'lmasa va bitta to'lov xabarini ikki marta qabul qilsa, foydalanuvchidan pul ikki marta yechib olinadi. Har doim xabarning unikal ID-sini tekshirib ishlang.
2. **Kafkada partitsiyalar tartibini unutish:** Kafka xabarlarning qat'iy ketma-ketligini faqat **bitta partitsiya doirasida** kafolatlaydi. Agar buyurtma holatini yangilash eventlari (yaratildi -> to'landi -> yetkazildi) har xil partitsiyalarga tarqalib ketsa, tartib buziladi. Bir xil obyektga tegishli eventlarni har doim bir xil \`Routing Key\` (masalan, \`order_id\`) bilan yuborish kerak.
3. **Dead Letter Queue (DLQ) qo'shmaslik:** Agar xabar xato tufayli qayta ishlanmasa va siz uni shunchaki tashlab yuborsangiz yoki navbatda qoldirsangiz, u navbatni to'sib qo'yadi (poison pill). Nosoz xabarlarni avtomatik tarzda DLQ-ga yo'naltirish shart.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Event-Driven Architecture (EDA) an'anaviy HTTP-dan nimasi bilan farq qiladi?**
EDA asinxron va bog'lanishsiz (decoupled) ishlaydi. HTTP sinxron va to'g'ridan-to'g'ri bog'liqlikni talab qiladi.

**2. RabbitMQ va Kafka-ning eng katta farqini ayting.**
RabbitMQ xabarni o'qigach o'chirib yuboradigan transient broker, Kafka esa diskda ma'lumotlarni saqlaydigan event log oqimidir.

**3. Kafkadagi Offset nima?**
Consumer partitsiyadan xabarlarni nechanchi indeksdan boshlab o'qiyotganini ko'rsatuvchi ko'rsatkich.

**4. Idempotency nima va unga qanday erishiladi?**
Bitta operatsiyani bir necha marta bajarish natijasi bir marta bajarish natijasi bilan bir xil bo'lishi. Bunga xabar ID-si orqali bazadagi dublikatlarni tekshirish bilan erishiladi.

**5. Dead Letter Queue (DLQ) nima?**
Xato tufayli consumer qayta ishlay olmagan nosoz xabarlar tashlanadigan alohida zaxira navbati.

**6. Outbox Pattern nima?**
Ma'lumotlar bazasiga yozish va brokerga event nashr etishni bitta SQL tranzaksiyasi ichida kafolatli bajarish usuli.

**7. Event Sourcing-ning afzalligi nimada?**
Butun audit tarixi (tarixiy ma'lumotlar) saqlanadi, istalgan vaqtdagi holatni qayta tiklash mumkin va debug qilish oson.

**8. CQRS nega Event Sourcing bilan ko'p ishlatiladi?**
Chunki faqat eventlardan tashkil topgan bazadan ma'lumot qidirish va o'qish juda qiyin. O'qish modeli eventlarni qayta ishlab, tayyor Read-optimallashtirilgan bazani to'ldirib boradi.

**9. Kafka-dagi Partition nima va u parallelizmni qanday oshiradi?**
Topic-ning gorizontal bo'lingan qismi. Consumer guruhidagi har bir consumer bitta partitsiyaga ulanib, parallel ishlay oladi.

**10. "Exactly-once" yetkazish kafolati amalda qanday ishlaydi?**
Producer tranzaksiyalari, broker idempotentligi va consumer idempotentligi integratsiyasi orqali.

**11. Backpressure nima?**
Consumer o'z kuchi yetmayotganini brokerga bildirib, xabarlar oqimini sekinlashtirishni talab qilishi.

**12. Saga Pattern nima va u qachon ishlatiladi?**
Mikroxizmatlararo distributed tranzaksiyalarni boshqarishda asinxron eventlar va kompensatsiya qiluvchi harakatlar zanjiri yordamida izchillikni ta'minlash usuli.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlar quyida exercises bo'limida berilgan.

---

## 7. 📝 12 ta Mini Test

Mavzuni o'zlashtirish darajangizni mini testlar orqali tekshiring.

---

## 8. 🎯 Real Project Case Study

### Uber Real-time Sayohatlar Oqimi
Uber yo'lovchi va haydovchining harakatlanish nuqtalarini real vaqtda kuzatish va marshrutni hisoblash uchun Apache Kafka-dan foydalanadi.
- **Muammo:** Har soniyada millionlab koordinatalar keladi. HTTP so'rovlar bu hajmdagi yuklamani va yozish tezligini ko'tara olmaydi.
- **Yechim:** Har bir haydovchining GPS koordinatasi Kafka Topic-ga yuboriladi. Haydovchi ID-si partitsiya kaliti bo'lgani sababli, bitta haydovchining koordinatalari bitta partitsiyaga tartib bilan yoziladi.
- **Natija:** Koordinatalarni parallel ravishda xarita servislari, firibgarlikka qarshi tizimlar va narx hisoblash servislari hech qanday kechikishsiz bir vaqtda o'qib ishlaydi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

Quyidagi diagrammada RabbitMQ-ning dinamik routing modeli va Kafka-ning partitsiyalarga asoslangan oqim modeli solishtirilgan:

\`\`\`mermaid
graph TD
    subgraph RabbitMQ Routing (Exchange vs Queue)
        P1[Producer] -->|Publish with routing key| Ex[Direct/Topic Exchange]
        Ex -->|Route: key matches binding| Q1[Queue A]
        Ex -->|Route: key matches binding| Q2[Queue B]
        Q1 -->|Consume & Delete| C1[Consumer 1]
        Q2 -->|Consume & Delete| C2[Consumer 2]
    end

    subgraph Kafka Stream (Topic & Partitions)
        P2[Producer] -->|Publish with hash key| T[Kafka Topic]
        T -->|Partition 0| Pn0[Append-only Log 0]
        T -->|Partition 1| Pn1[Append-only Log 1]
        Pn0 -->|Read by Offset| CG1[Consumer Group A - Instance 1]
        Pn1 -->|Read by Offset| CG2[Consumer Group A - Instance 2]
    end
\`\`\`

---

## 10. 📌 Cheat Sheet

| Xususiyat | RabbitMQ (Message Queue) | Apache Kafka (Event Stream) |
| :--- | :--- | :--- |
| **Saqlash turi** | Transient (vaqtinchalik xotira, ACK dan so'ng o'chadi) | Log Compaction / Diskda doimiy saqlash |
| **Xabar o'qish** | Smart broker (o'qish tartibini o'zi boshqaradi) | Smart consumer (offset ko'rsatkichi yordamida o'qiydi) |
| **Qayta o'qish (Replay)** | Mumkin emas | Istalgan vaqtda offsetni orqaga qaytarib bo'ladi |
| **Asosiy ishlatilishi** | Murakkab marshrutlash (routing) va asinxron vazifalar | Loglar oqimi, real-time analytics, event sourcing |
| **Masshtablanish** | Gorizontal kengayadi, lekin disk I/O cheklaydi | Partitsiyalar orqali juda yuqori parallelizm |
`,
  exercises: [
  {
    "id": 1,
    "title": "Sodda Event Broker (Pub/Sub)",
    "instruction": "Klass `EventBroker` yarating. U quyidagi metodlarga ega bo'lsin:\n1. `subscribe(event, callback)`: Hodisaga obuna bo'lish. Ushbu metod obunani bekor qiluvchi (unsubscribe) funksiyasini qaytarsin.\n2. `publish(event, data)`: Hodisani barcha obunachilarga e'lon qilish.",
    "startingCode": "class EventBroker {\n  constructor() {\n    this.listeners = {};\n  }\n\n  subscribe(event, callback) {\n    // Kodni shu yerga yozing\n  }\n\n  publish(event, data) {\n    // Kodni shu yerga yozing\n  }\n}",
    "hint": "listeners obyektida massiv saqlang. Obunani o'chirish funksiyasi callbackni listeners massividan filtrlab tashlashi kerak.",
    "test": "if (typeof EventBroker !== 'function') return 'EventBroker klassi topilmadi'; const broker = new EventBroker(); let count = 0; const unsub = broker.subscribe('test', (val) => { count += val; }); broker.publish('test', 5); if (count !== 5) return 'Publish xato'; unsub(); broker.publish('test', 10); if (count !== 5) return 'Unsubscribe ishlamadi'; return null;"
  },
  {
    "id": 2,
    "title": "Kafkadagi Partition Router",
    "instruction": "Xabarlarni ma'lum bir partitionga yo'naltirish uchun hashing-dan foydalanuvchi `getPartition(key, totalPartitions)` funksiyasini yozing. U kalitning (string ko'rinishidagi `key`) har bir belgisining ASCII kodlari yig'indisini hisoblab, `totalPartitions` ga bo'lgandagi qoldiqni (modulo) qaytarsin. Agar kalit berilmagan (null yoki undefined) bo'lsa, tasodifiy partition indeksini (0 dan totalPartitions - 1 gacha butun son) qaytarsin.",
    "startingCode": "function getPartition(key, totalPartitions) {\n  // Kodni shu yerga yozing\n}",
    "hint": "Kalit yo'q bo'lsa, Math.random() yoki shunga o'xshash mantiq yordamida partitionni aniqlang. Kalit bor bo'lsa, satr bo'ylab charCodeAt(i) yig'indisini topib, totalPartitions ga bo'ling.",
    "test": "if (typeof getPartition !== 'function') return 'getPartition topilmadi'; const p1 = getPartition('user123', 4); const p2 = getPartition('user123', 4); if (p1 !== p2) return 'Bir xil kalit har doim bir xil partitionga borishi kerak'; if (p1 < 0 || p1 >= 4) return 'Partition indeksi oraliqdan tashqarida'; const pRandom = getPartition(null, 5); if (pRandom < 0 || pRandom >= 5) return 'Kalitsiz xabar uchun partition noto\\'g\\'ri'; return null;"
  },
  {
    "id": 3,
    "title": "Event Sourcing: Balansni Replay orqali tiklash",
    "instruction": "Event Sourcing tizimida holat eventlar ketma-ketligidan yig'iladi. `calculateBalance(events)` funksiyasini yozing. U boshlang'ich balansni 0 deb oladi va eventlar massividagi har bir hodisani qayta ishlaydi. Eventlar quyidagi ko'rinishda bo'ladi:\n- `{ type: 'DEPOSIT', amount: 100 }` (balansga amount qo'shiladi)\n- `{ type: 'WITHDRAW', amount: 50 }` (balansdan amount ayiriladi)\n- `{ type: 'INTEREST', rate: 0.1 }` (balans rate foizga oshadi, ya'ni `balans = balans * (1 + rate)`)\nBarcha eventlar bajarilgandan keyin yakuniy balansni qaytaring.",
    "startingCode": "function calculateBalance(events) {\n  // Kodni shu yerga yozing\n}",
    "hint": "Boshlang'ich balansni 0 deb belgilab, events massivini loop yoki reduce orqali aylanib chiqing. Har bir event.type ga qarab mantiqni bajaring.",
    "test": "if (typeof calculateBalance !== 'function') return 'calculateBalance topilmadi'; const evs = [{ type: 'DEPOSIT', amount: 100 }, { type: 'WITHDRAW', amount: 30 }, { type: 'INTEREST', rate: 0.1 }]; const bal = calculateBalance(evs); if (bal !== 77) return 'Yakuniy balans noto\\'g\\'ri: ' + bal; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Event-Driven Architecture (EDA) ning eng asosiy g'oyasi nima?",
    "options": [
      "Barcha ma'lumotlarni faqat bitta markaziy ma'lumotlar bazasida saqlash",
      "Tizimlar o'rtasida hodisalar (events) orqali asinxron va bog'lanishsiz (decoupled) aloqa o'rnatish",
      "Sinxron HTTP so'rovlar yordamida servislar zanjirini bog'lash",
      "Brauzer sahifasini har soniyada yangilab turish"
    ],
    "correctAnswer": 1,
    "explanation": "EDA tizimlar o'rtasidagi bog'liqlikni kamaytirish (decoupling) uchun yuz bergan hodisalarni asinxron yuborish va qayta ishlashga asoslanadi."
  },
  {
    "id": 2,
    "question": "RabbitMQ kabi an'anaviy message queue va Kafka kabi event stream tizimlarining eng asosiy farqi nimada?",
    "options": [
      "RabbitMQ faqat SQL ma'lumotlarini o'qiydi, Kafka esa faqat NoSQL",
      "RabbitMQ xabarni consumer o'qib tasdiqlagach (ACK) o'chiradi; Kafka esa xabarlarni diskda (immutable log) saqlab turadi",
      "Kafka faqat bitta servis ichida ishlaydi, RabbitMQ esa tarqatilgan tizim",
      "RabbitMQ asinxron ishlay olmaydi, Kafka esa faqat sinxron ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "RabbitMQ - bu transient (vaqtinchalik) broker bo'lib, xabarlarni muvaffaqiyatli o'qilgandan keyin o'chiradi. Kafka esa append-only disk logidan iborat bo'lib, xabarlarni retention period bo'yicha saqlaydi."
  },
  {
    "id": 3,
    "question": "Kafka tizimida 'Partition' (Bo'lim) nima vazifani bajaradi?",
    "options": [
      "Foydalanuvchilarni mamlakatlar bo'yicha guruhlash",
      "Topic-ni gorizontal bo'laklarga bo'lish orqali parallel o'qish/yozish va masshtablanishni ta'minlash",
      "Xabarlarni shifrlash kaliti",
      "O'chirilgan xabarlarni vaqtincha saqlash xotirasi"
    ],
    "correctAnswer": 1,
    "explanation": "Kafka partitsiyalari yordamida bitta topic ma'lumotlari turli brokerlarga taqsimlanadi va parallel ravishda qayta ishlanadi."
  },
  {
    "id": 4,
    "question": "'At-least-once' (Kamida bir marta) yetkazib berish kafolatida qanday holat kuzatilishi mumkin?",
    "options": [
      "Xabarlar mutlaqo yetib bormaydi",
      "Xabarlar yo'qolishi mumkin emas, lekin tarmoq uzilishlari sababli dublikat (takroriy) xabarlar kelishi mumkin",
      "Har bir xabar faqat va faqat bir marta keladi",
      "Xabarlar tartibi mutlaqo buzilib ketadi"
    ],
    "correctAnswer": 1,
    "explanation": "At-least-once kafolatida broker xabarni consumer tasdiqlamaguncha qayta yuboradi, bu esa tarmoq kechikishlarida dublikatlarga olib kelishi mumkin."
  },
  {
    "id": 5,
    "question": "Tizimda 'Exactly-once' (Rppa-rosa bir marta) yetkazib berishga qanday erishiladi?",
    "options": [
      "Faqat tarmoq tezligini oshirish orqali",
      "At-least-once kafolati va consumer tomonida idempotentlikni (yoki tranzaksiyalarni) qo'llash orqali",
      "Xabarlarni navbatga yubormaslik orqali",
      "Barcha consumer-larni o'chirib qo'yish orqali"
    ],
    "correctAnswer": 1,
    "explanation": "Exactly-once mantiqan At-least-once yetkazib berish va consumer-dagi idempotent qayta ishlash (dublikatlarni rad etish) kombinatsiyasi yordamida amalga oshiriladi."
  },
  {
    "id": 6,
    "question": "Event Sourcing arxitekturasining asosiy g'oyasi nima?",
    "options": [
      "Tizimning joriy holatini (state) emas, balki uning holatini o'zgartirgan barcha hodisalar tarixini (immutable events) saqlash",
      "Ma'lumotlarni faqat vaqtincha xotirada saqlash va server o'chganda o'chirish",
      "Barcha SQL jadvallarini bitta jadvalga birlashtirish",
      "Hodisalarni faqat front-endda boshqarish"
    ],
    "correctAnswer": 0,
    "explanation": "Event Sourcing tizim holatidagi o'zgarishlarni hodisalar oqimi (journal/event log) ko'rinishida saqlaydi va holatni shu hodisalarni qayta tiklash (replay) orqali aniqlaydi."
  },
  {
    "id": 7,
    "question": "CQRS (Command Query Responsibility Segregation) namunasi nima?",
    "options": [
      "Barcha so'rovlarni bitta funksiyada yozish tartibi",
      "Ma'lumotlarni o'zgartiruvchi amallar (Write/Command) va ma'lumotlarni o'quvchi amallar (Read/Query) modellarini alohida ajratish",
      "Faqat xatolar bilan ishlash tizimi",
      "Ma'lumotlar bazasini har soatda klonlash"
    ],
    "correctAnswer": 1,
    "explanation": "CQRS yozish (Command) va o'qish (Query) operatsiyalarini va ularning ma'lumotlar modellarini ajratish orqali yuqori unumdorlikka erishadi."
  },
  {
    "id": 8,
    "question": "RabbitMQ-dagi 'Exchange' nima vazifani bajaradi?",
    "options": [
      "Xabarlarni diskda uzoq muddat saqlash",
      "Producer-dan kelgan xabarlarni binding qoidalari (routing key) asosida tegishli navbatlarga (queues) yo'naltirish",
      "Foydalanuvchi parolini tekshirish",
      "Ma'lumotlarni siqish (zip qilish)"
    ],
    "correctAnswer": 1,
    "explanation": "RabbitMQ-da producer to'g'ridan-to'g'ri navbatga yozmaydi; u xabarni Exchange-ga yuboradi, Exchange esa routing qoidalariga ko'ra xabarni navbatlarga tarqatadi."
  },
  {
    "id": 9,
    "question": "Dead Letter Queue (DLQ) nima uchun xizmat qiladi?",
    "options": [
      "Tizimdan o'chirilgan foydalanuvchilarning ro'yxatini saqlash uchun",
      "Bir necha bor urinishlarga qaramasdan qayta ishlanishida xatolik yuz bergan nosoz xabarlarni keyinchalik tahlil qilish uchun ajratib qo'yish",
      "Broker tezligini oshirish uchun vaqtincha kesh",
      "Faqat muvaffaqiyatli tugagan xabarlarni arxivlash"
    ],
    "correctAnswer": 1,
    "explanation": "DLQ qayta-qayta error berayotgan xabarlarni asosiy navbatni to'sib qo'ymasligi uchun chetlatib, monitoring uchun saqlashga xizmat qiladi."
  },
  {
    "id": 10,
    "question": "Kafka-da 'Log Compaction' (Loglarni siqish) nima?",
    "options": [
      "Eski xabarlarni zip formatiga o'tkazish",
      "Mavzu (Topic) ichidagi har bir xabar kaliti uchun faqat eng so'nggi holatni saqlab qolib, eski qiymatli xabarlarni tozalash",
      "Barcha xabarlarni o'chirib tashlash",
      "Xabarlar hajmini kamaytirish uchun matnlarni qisqartirish"
    ],
    "correctAnswer": 1,
    "explanation": "Log compaction har bir kalit uchun eng oxirgi (eng yangi) xabarni saqlab qolishni kafolatlaydi, bu esa ma'lumotlar hajmini tejaydi."
  },
  {
    "id": 11,
    "question": "Kafka-dagi 'Consumer Group' (Iste'molchilar guruhi) nima maqsadni ko'zlaydi?",
    "options": [
      "Barcha consumer-larni bitta serverda ishga tushirish",
      "Bir nechta consumer-larga bitta topic partitsiyalarini bo'lib berish orqali parallel va muvozanatlashgan holda xabarlarni qayta ishlash",
      "Ilova foydalanuvchilarini guruhlash",
      "Barcha xabarlarni bir vaqtda faqat bitta consumer-ga nusxalash"
    ],
    "correctAnswer": 1,
    "explanation": "Consumer Group yordamida topic partitsiyalari guruh a'zolariga bo'linadi, bu esa parallel o'qishni va yuklamani taqsimlashni ta'minlaydi."
  },
  {
    "id": 12,
    "question": "Transactional Outbox Pattern nima uchun kerak?",
    "options": [
      "Faqat elektron xatlarni yuborishni kechiktirish uchun",
      "Ma'lumotlar bazasini yangilash va brokerga event nashr etishni yagona tranzaksiya ichida kafolatli bajarish uchun",
      "Bazani shifrlab zaxiralash uchun",
      "Tarmoqdagi HTTP paketlarni filtrlash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Outbox pattern yordamida biznes ma'lumotlar va yuborilishi kerak bo'lgan eventlar bitta tranzaksiya doirasida bazaga yoziladi (outbox jadvaliga), so'ngra alohida processor ularni brokerga yuboradi. Bu atomiklikni ta'minlaydi."
  }
]

};

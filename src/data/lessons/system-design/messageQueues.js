export const messageQueues = {
  id: "messageQueues",
  title: "Xabarlar Navbati va Asinxron Aloqa (Message Queues & Event-Driven)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Tizimlar kattalashgani sari, xizmatlarning o'zaro to'g'ridan-to'g'ri (sinxron - HTTP) bog'lanishi tizimni sekinlashtiradi. Masalan, foydalanuvchi buyurtma berganda, to'lov qilish, SMS yuborish, omborni tekshirish va kvitansiya tayyorlash operatsiyalari HTTP orqali birma-bir bajarilsa, foydalanuvchi sahifada 10 soniya kutib qoladi.

**Message Queue (Xabarlar Navbati)** — bu tizimlar o'rtasida asinxron tarzda xabar almashish imkonini beruvchi "pochta qutisi" yoki "navbat boshqaruvchi". U yordamida bitta servis xabarni navbatga tashlab, o'z ishini davom ettiraveradi. Qolgan ishlar orqa fonda asinxron bajariladi.

### Kafe Navbati o'xshatishi:
Siz qahvaxonaga kirdingiz.
- **Sinxron ulanish (HTTP):** Kassa oldida buyurtma berdingiz. Kofeni tayyorlovchi barista kofeni to'liq pishirib, sizga berguncha kassa yopilib turadi, navbatdagilar kutaveradi.
- **Asinxron ulanish (Message Queue):** Kassa (Publisher) buyurtmani qabul qilib, sizga chek beradi va keyingi mijozga o'tadi. Buyurtma qog'ozini esa simga (Navbat - Queue) ilib qo'yadi. Barista (Consumer) simdan qog'ozlarni navbat bilan olib, kofeni tayyorlaydi. Kassa navbati kutib qolmaydi, kofe orqa fonda tayyorlanadi.

---

## 2. 💻 Real Kod Misollari

JavaScript (Node.js) muhitida sodda **Publisher-Subscriber** (Pub/Sub) va navbat (Queue) mexanizmini yaratish:

\`\`\`javascript
class SimpleMessageBroker {
  constructor() {
    this.queues = {}; // { 'order_created': [callback1, callback2] }
  }

  // Obuna bo'lish (Subscribe - Consumer)
  subscribe(topic, callback) {
    if (!this.queues[topic]) {
      this.queues[topic] = [];
    }
    this.queues[topic].push(callback);
  }

  // Xabar jo'natish (Publish - Publisher)
  publish(topic, message) {
    if (!this.queues[topic]) return;
    this.queues[topic].forEach(callback => callback(message));
  }
}

const broker = new SimpleMessageBroker();

// Consumer ro'yxatdan o'tadi
broker.subscribe("email_service", (msg) => {
  console.log(\`SMS/Email yuborildi: Salom \${msg.name}!\`);
});

// Publisher xabar chiqaradi
broker.publish("email_service", { name: "Anvar" });
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Asosiy Komponentlar:
- **Producer (Publisher):** Xabar yaratuvchi va navbatga yuboruvchi dastur.
- **Queue (Navbat):** Xabarlar o'qilmaguncha vaqtinchalik saqlanadigan xotira ombori (FIFO - First In, First Out).
- **Consumer (Subscriber):** Navbatdan xabarni olib, uni qayta ishlovchi dastur.
- **Message Broker:** Navbatlarni boshqaruvchi dasturiy ta'minot (masalan, RabbitMQ, Apache Kafka).

### 2. Ishlash modellari:
- **Point-to-Point (Queue):** Xabar faqat bitta consumer tomonidan o'qiladi. O'qilgach navbatdan o'chadi.
- **Publish-Subscribe (Topic):** Xabar unga obuna bo'lgan barcha consumer-larga nusxalanib tarqatiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Navbatda xabarlar to'planib qolishi (Message Backlog):** Consumer serverlar sekin ishlagani yoki ishdan chiqqani sababli navbat to'lib, xotira tugab qolishi. Tizimda monitoring va consumer-larni gorizontal kengaytirish (Autoscaling) kerak.
2. **Idempotentlikni hisobga olmaslik:** Tarmoqdagi xatoliklar tufayli bitta xabar consumer-ga ikki marta yetib borishi mumkin (At-least-once delivery). Agar to'lov xabari ikki marta kelsa va consumer idempotent bo'lmasa, pul ikki marta yechiladi. Consumer-da so'rov identifikatorini (UUID) tekshirish shart.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Message Queue nima va u qanday asosiy muammoni hal qiladi?**
Tizimlar o'rtasida asinxron bog'lanishni ta'minlaydi, xizmatlarni decoupling (mustaqil qilish) qiladi va yuklamani vaqtinchalik navbat yordamida buferlaydi.

**2. RabbitMQ va Apache Kafka o'rtasidagi asosiy farq nima?**
RabbitMQ an'anaviy smart-broker bo'lib, xabar consumer-ga yetib borgach navbatdan o'chadi. Kafka esa yuqori o'tkazuvchanlikka ega distributed log tizimi bo'lib, xabarlarni o'qilgandan keyin ham diskda saqlab turadi.

**3. Idempotency (Idempotentlik) nima?**
Bitta operatsiyani bir necha bor bajarish natijasi faqat bir marta bajarilgan natija bilan bir xil bo'lishi xususiyati (masalan, to'lovni ikki marta bosganda pul bir marta yechilishi).

**4. Message Broker-da 'Dead Letter Queue' (DLQ) nima?**
Qayta-qayta urinishlarga qaramay, xato tufayli consumer qayta ishlay olmagan "zararli/nosoz" xabarlar tashlab qo'yiladigan maxsus zaxira navbati.

**5. Pub/Sub modeli nima?**
Nashriyotchi (Publisher) xabarni aniq manzilga emas, mavzuga (Topic) yuboradi. Ushbu mavzuga obuna bo'lgan barcha xizmatlar xabarni parallel qabul qiladi.

**6. Asinxron arxitekturaning kamchiliklari nima?**
Debugging qilish juda qiyinlashadi, tizimning yakuniy holatini tekshirish murakkablashadi (eventual consistency) va tranzaksiyalar mantiqi og'irlashadi.

**7. Message Broker-da 'Message Acknowledgment' (ACK) nima?**
Consumer xabarni muvaffaqiyatli qayta ishlaganidan so'ng, brokerga "men ishni tugatdim, xabarni o'chirsang bo'ladi" deb yuboradigan tasdig'i.

**8. FIFO navbat nima?**
First-In, First-Out (Birinchi kelgan, birinchi ketadi) qoidasi asosida xabarlarni kelish tartibiga qarab qat'iy navbat bilan tarqatish.

**9. Kafka-da 'Consumer Group' nima?**
Bitta topic-dan parallel ma'lumot o'qiydigan consumer-lar guruhi. Ular yuklamani o'zaro bo'lishib oladi.

**10. At-least-once delivery kafolati nima?**
Xabar yo'qolmasligi uchun broker uni consumer tasdiqlamaguncha (ACK) navbatdan o'chirmaydi. Bu xabarning takroran yuborilishiga (duplicate) olib kelishi mumkin.

**11. Backpressure (Teskari bosim) nima?**
Consumer server yuklamani ko'tara olmay qolganda, brokerga xabarlar oqimini kamaytirishni yoki vaqtincha to'xtatib turishni so'rash mexanizmi.

**12. Event-Driven Architecture nima?**
Tizimlar o'zgarishlarni to'g'ridan-to'g'ri buyruq berish orqali emas, yuz bergan hodisalar (events) haqida xabar tarqatish orqali boshqaradigan loyihalash uslubi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlar quyida exercises bo'limida berilgan.

---

## 7. 📝 12 ta Mini Test

Bilimingizni testlar orqali sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### E-Commerce buyurtma yaratish zanjiri
Mijoz buyurtma qilganda, \`Order Service\` buyurtmani bazaga yozadi va \`order_created\` eventini brokerga (masalan, RabbitMQ) nashr qiladi.
Orqa fonda parallel ishlab turgan \`Payment Service\` (to'lov qilish uchun), \`Inventory Service\` (mahsulot sonini kamaytirish uchun) va \`Notification Service\` (tasdiq xatini yuborish uchun) ushbu xabarni qabul qilib, o'z ishlarini parallel boshlashadi. Bu buyurtma berish tezligini 10 barobarga oshiradi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph LR
    P[Order Service - Publisher] -->|Publish order_created| B[Message Broker / Topic]
    B -->|Copy message| Q1[Payment Queue]
    B -->|Copy message| Q2[SMS/Email Queue]
    
    Q1 --> C1[Payment Service - Consumer]
    Q2 --> C2[Notification Service - Consumer]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Sodda FIFO Navbat (Queue)",
      instruction: "Ichki massiv yordamida ishlaydigan `Queue` klassini yarating. U quyidagi metodlarga ega bo'lsin:\\n1. `enqueue(item)`: Elementni navbat oxiriga qo'shish.\\n2. `dequeue()`: Navbat boshidagi birinchi elementni olib tashlash va qaytarish. Bo'sh bo'lsa `null` qaytarsin.\\n3. `size()`: Navbatdagi elementlar sonini qaytarish.",
      startingCode: "class Queue {\n  constructor() {\n    this.items = [];\n  }\n  // Metodlarni yozing\n}",
      hint: "enqueue uchun push, dequeue uchun shift metodlaridan foydalaning.",
      test: "if (typeof Queue !== 'function') return 'Queue klassi topilmadi'; const q = new Queue(); q.enqueue(1); q.enqueue(2); if (q.size() !== 2) return 'Size xato'; if (q.dequeue() !== 1) return 'FIFO qoidasi buzildi'; if (q.dequeue() !== 2) return 'Qolgan element o\\'chmadi'; if (q.dequeue() !== null) return 'Bo\\'sh navbat null qaytarmadi'; return null;"
    },
    {
      id: 2,
      title: "Event Emitter (PubSub Broker) yaratish",
      instruction: "Oddiy PubSub broker mantiqini yozing. `on(event, cb)` orqali hodisaga obuna bo'lish, va `emit(event, data)` orqali barcha obunachilarni ishga tushiruvchi `SimpleEmitter` klassini yozing.",
      startingCode: "class SimpleEmitter {\n  constructor() {\n    this.events = {};\n  }\n  // Metodlarni yozing\n}",
      hint: "this.events[event] = this.events[event] || []; obunachilarni push qiling va emit-da forEach bilan chaqiring.",
      test: "if (typeof SimpleEmitter !== 'function') return 'SimpleEmitter topilmadi'; const em = new SimpleEmitter(); let count = 0; em.on('test', (val) => { count += val; }); em.emit('test', 5); em.emit('test', 10); if (count !== 15) return 'Callback to\\'g\\'ri ishga tushmadi'; return null;"
    },
    {
      id: 3,
      title: "Idempotent Xabarlarni Tekshirish",
      instruction: "Kelayotgan xabarlar takrorlanib qolishini oldini olish uchun, ilgari qayta ishlangan xabarlar identifikatorini (`processedIds` to'plami - `Set` obyekti) tekshiruvchi `processUniqueMessage(processedIds, messageId, callback)` funksiyasini yozing. Agar `messageId` yangi bo'lsa, uni `processedIds` ga qo'shing, `callback()` funksiyasini chaqiring va `true` qaytaring. Agar avval qayta ishlangan bo'lsa, `false` qaytaring va callbackni chaqirmang.",
      startingCode: "function processUniqueMessage(processedIds, messageId, callback) {\n  // Unikallikni tekshirib callbackni ishga tushiring\n}",
      hint: "processedIds.has(messageId) shartini tekshiring, aks holda add qilib callback() ni bajaring.",
      test: "if (typeof processUniqueMessage !== 'function') return 'processUniqueMessage topilmadi'; const set = new Set(['123']); let executed = false; const cb = () => { executed = true; }; if (processUniqueMessage(set, '123', cb) !== false || executed) return 'Takroriy xabar rad etilmadi'; if (processUniqueMessage(set, '456', cb) !== true || !executed) return 'Yangi xabar o\\'tkazilmadi'; if (!set.has('456')) return 'Yangi id qo\\'shilmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Message Queue (Xabarlar Navbati) ning tizimli dizayndagi asosiy roli nima?",
      options: [
        "Foydalanuvchi interfeysini chiroyli qilish",
        "Tizimlar o'rtasida asinxron, decoupling (bog'lanishsiz) aloqa o'rnatish va yuklamalarni buferlash",
        "Faqat parollarni shifrlash",
        "Sayt tezligini pasaytirish"
      ],
      correctAnswer: 1,
      explanation: "Message Queue yordamida servislar bir-biriga bog'liq bo'lmagan holda asinxron ishlaydi, bu tizim barqarorligini ta'minlaydi."
    },
    {
      id: 2,
      question: "FIFO (First-In, First-Out) navbatida xabarlar qaysi tartibda qayta ishlanadi?",
      options: [
        "Mutlaqo tasodifiy",
        "Kelgan tartib bo'yicha birinchi yuborilgan xabar birinchi bo'lib qayta ishlanadi",
        "Eng oxirgi kelgan xabar birinchi bo'lib",
        "Faqat eng kichik xabarlar birinchi"
      ],
      correctAnswer: 1,
      explanation: "FIFO navbatida xabarlar qat'iy navbat asosida, ya'ni birinchi bo'lib kelgan element birinchi bo'lib chiqarib yuboriladi."
    },
    {
      id: 3,
      question: "Consumer-da 'Idempotency' (Idempotentlik) printsipi nega muhim?",
      options: [
        "Tizim xotirasini tejash uchun",
        "Tarmoqdagi xatolar sababli bitta xabar ikki marta kelib qolganda (duplicate), noto'g'ri operatsiyalar (masalan, ikki marta pul yechish) bajarilishini oldini olish uchun",
        "Faqat video fayllarni ko'rsatish uchun",
        "Barcha xabarlarni o'chirib yuborish uchun"
      ],
      correctAnswer: 1,
      explanation: "Idempotentlik bitta xabar bir necha bor qayta yuborilgan taqdirda ham faqat bir martalik natija berishini ta'minlaydi."
    },
    {
      id: 4,
      question: "RabbitMQ va Kafka o'rtasidagi asosiy farqlardan biri nima?",
      options: [
        "Kafka faqat mobil telefonlarda ishlaydi",
        "RabbitMQ xabarni o'qilgach navbatdan o'chiradi, Kafka esa diskda saqlashda davom etadi",
        "RabbitMQ asinxron ishlay olmaydi",
        "Kafka faqat HTML o'qiydi"
      ],
      correctAnswer: 1,
      explanation: "RabbitMQ odatiy navbat bo'lib, o'qilgan xabarni o'chiradi. Kafka esa xabarlarni diskda saqlagani uchun ularni qayta o'qish (replay) mumkin."
    },
    {
      id: 5,
      question: "Dead Letter Queue (DLQ) nima vazifani bajaradi?",
      options: [
        "Faqat o'chirilgan foydalanuvchilar ro'yxati",
        "Qayta ishlash jarayonida doimiy xato berib, muvaffaqiyatsiz bo'lgan zararli xabarlarni tahlil qilish uchun alohida navbatga o'tkazish",
        "Tizim xotirasini tozalash dasturi",
        "DDoS hujumini boshqaruvchi server"
      ],
      correctAnswer: 1,
      explanation: "DLQ tizimni buzayotgan yoki xato berayotgan nosoz xabarlarni navbatdan chetlashtirib, keyinroq tahlil qilish uchun saqlashga xizmat qiladi."
    },
    {
      id: 6,
      question: "Message Broker-dagi 'Message Acknowledgment' (ACK) nima?",
      options: [
        "Xabarni shifrlash kaliti",
        "Consumer tomonidan xabar muvaffaqiyatli bajarilganini va uni navbatdan o'chirish mumkinligini tasdiqlovchi signal",
        "Tizimni o'chirish buyrug'i",
        "Faqat xatolar kodi"
      ],
      correctAnswer: 1,
      explanation: "ACK signali orqali broker xabar to'liq va xatosiz bajarilganini biladi va uni navbatdan o'chirib yuboradi."
    },
    {
      id: 7,
      question: "Point-to-Point (Queue) modelida bitta xabarni nechta consumer qabul qilishi mumkin?",
      options: [
        "Barcha faol consumer-lar parallel",
        "Faqat va faqat bitta consumer",
        "Kamida 10 ta consumer",
        "Hech biri qabul qila olmaydi"
      ],
      correctAnswer: 1,
      explanation: "Point-to-point navbat modelida xabarni faqat bitta consumer qabul qilib oladi va u boshqa consumer-lar uchun ko'rinmaydi."
    },
    {
      id: 8,
      question: "Publish-Subscribe (Pub/Sub) modelining asosiy mohiyati nimada?",
      options: [
        "Xabarlarni umuman jo'natmaslik",
        "Bitta xabarni (event) unga obuna bo'lgan barcha consumer-larga (subscribers) parallel nusxalab yetkazib berish",
        "Faqat bitta foydalanuvchini bloklash",
        "IP manzillarni shifrlash"
      ],
      correctAnswer: 1,
      explanation: "Pub/Sub modelida bitta event (masalan, order_created) ko'plab xizmatlarga (payment, email) parallel ravishda yetkaziladi."
    },
    {
      id: 9,
      question: "Backpressure (Teskari bosim) asinxron tizimlarda nima uchun kerak?",
      options: [
        "Internet tezligini oshirish uchun",
        "Consumer yuklamani ko'tara olmay qolganda, brokerdan xabarlar kelish oqimini kamaytirishni so'rash orqali uning qulashini oldini olish",
        "Barcha xatolarni yopib qo'yish uchun",
        "Serverni o'chirib-yoqish uchun"
      ],
      correctAnswer: 1,
      explanation: "Backpressure consumer o'ziga kelayotgan katta ma'lumotlar oqimiga dosh bera olmay qolganida uni himoya qilish uchun oqim tezligini tartibga solishdir."
    },
    {
      id: 10,
      question: "Event-Driven Architecture (Hodisalarga asoslangan arxitektura) ning asosiy ustunligi nimada?",
      options: [
        "SQL bazalaridan mutlaqo voz kechish",
        "Tizimlarning o'zaro bog'liqligini (tight coupling) kamaytirib, ularni mustaqil va moslashuvchan qilish",
        "Faqat bitta serverda ishlash",
        "Debugging jarayonini osonlashtirish"
      ],
      correctAnswer: 1,
      explanation: "Hodisalarga asoslangan tizimda xizmatlar bir-birlarining ichki tuzilishini bilishi shart emas, faqat hodisalarni kuzatib o'z ishlarini bajarishadi."
    },
    {
      id: 11,
      question: "Asinxron aloqada 'Eventual Consistency' nimani anglatadi?",
      options: [
        "Barcha serverlar har doim o'chib qolishini",
        "Tizim qismlari ma'lumotlari darhol emas, ma'lum hodisalar navbat orqali yetib borgandan so'ng vaqt o'tishi bilan tenglashishini",
        "Ma'lumotlar faqat bitta kompyuterda saqlanishini",
        "SQL tranzaksiyalarining butunlay buzilishini"
      ],
      correctAnswer: 1,
      explanation: "Taqsimlangan asinxron tizimlarda ma'lumotlar darhol hamma joyda bir xil bo'lmaydi, biroz vaqt o'tib (eventlar yetib borgach) muvozanatga keladi."
    },
    {
      id: 12,
      question: "Kafka-da 'Topic Partitioning' nima uchun xizmat qiladi?",
      options: [
        "Faqat darslar ro'yxatini bo'lish uchun",
        "Xabarlarni bir nechta serverlarga bo'lib yozish orqali yuqori o'tkazuvchanlik va gorizontal masshtablanishga erishish uchun",
        "Xabarlarni butunlay o'chirish uchun",
        "Sayt rasmlarini keshlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Partitions (bo'limlar) yordamida bitta topic ma'lumotlari parallel ravishda turli serverlarga yoziladi va o'qiladi, bu esa tezlikni juda oshiradi."
    }
  ]
};

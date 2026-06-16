## 1. 💡 Sodda Tushuntirish va Analogiya

Tizimlar kattalashgani sari, xizmatlarning o'zaro to'g'ridan-to'g'ri bog'lanishi (HTTP orqali) ko'plab muammolarni keltirib chiqaradi. Masalan, foydalanuvchi buyurtma berganda, to'lov xizmati, omborxona xizmati va SMS yuborish xizmatlari HTTP orqali bir-birini zanjirsimon kutib tursa, bitta xizmatdagi nosozlik butun tizimni to'xtatib qo'yishi mumkin.

**Event-Driven Architecture (Hodisalarga asoslangan arxitektura - EDA)** — bu tizimlar o'rtasida to'g'ridan-to'g'ri so'rov yuborish o'rniga, tizimda sodir bo'lgan voqealar (hodisalar - events) haqida xabar tarqatish orqali aloqa o'rnatish usuli.

### Analogiya: 
Tasavvur qiling, siz yangi uy sotib olmoqchisiz va hujjatlarni rasmiylashtirishingiz kerak.
- **Sinxron (HTTP):** Siz barcha davlat idoralarini birma-bir aylanib, navbatda turib, har bir xodimning imzosini to'g'ridan-to'g'ri kutasiz. Agar bitta idora yopiq bo'lsa, butun ish to'xtaydi.
- **Message Broker (RabbitMQ):** Siz arizani topshirib ketasiz. Ariza "navbatga" tushadi va har bir idora xodimi o'z vaqtida arizani olib ishlaydi. Ish tugagach, ariza navbatdan o'chadi.
- **Event Stream (Kafka):** Bu xuddi e'lonlar taxtasiga o'xshaydi. Siz "Men uy sotib oldim!" deb e'lon osib qo'yasiz. Ushbu xabarni soliqchilar, uy-joy boshqarmasi va sug'urta kompaniyalari e'lonlar taxtasidan o'zlari o'qib, kerakli ishlarni bajarishadi. Siz hech kimni kutmaysiz, e'lon esa taxtada doimiy qoladi.

---

## 2. 💻 Real Kod Misollari

Quyida Event-Driven arxitekturasining asosiy elementlarini (Pub/Sub va Event Sourcing) simulyatsiya qiluvchi sodda JavaScript kodlari keltirilgan:

### Misol 1: Sodda Pub/Sub Broker
Ushbu kod hodisalarni ro'yxatdan o'tkazish va ularni tarqatish mexanizmini ko'rsatadi:

```javascript
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
    console.log(`Consumer obuna bo'ldi: ${topic}`);
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
broker.subscribe("user_signed_up", (data) => console.log(`[SMS Xizmati] SMS yuborildi: ${data.phone}`));
broker.subscribe("user_signed_up", (data) => console.log(`[Kesh Xizmati] Foydalanuvchi ma'lumotlari keshlandi: ${data.name}`));

// Hodisa nashr etiladi
broker.publish("user_signed_up", { name: "Farhod", phone: "+998901234567" });
```

### Misol 2: Event Sourcing Simulyatsiyasi
Event Sourcing-da joriy holat saqlanmaydi, balki o'zgarishlar tarixi (event log) orqali hisoblanadi:

```javascript
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

console.log(`Joriy balans: ${myAccount.getCurrentBalance()} USD`); // Joriy balans: 850 USD
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Message Queue (RabbitMQ) vs Event Streaming (Kafka)
- **RabbitMQ (Smart Broker, Dumb Consumer):**
  - Xabarlar navbatlarda (queues) vaqtinchalik saqlanadi.
  - Consumer xabarni muvaffaqiyatli qayta ishlab, brokerga `ACK` (Acknowledgment) yuborgach, xabar navbatdan o'chiriladi.
  - Bir marta o'qilgan xabarni qayta o'qib bo'lmaydi.
- **Apache Kafka (Dumb Broker, Smart Consumer):**
  - Ma'lumotlar mavzularda (topics) doimiy ravishda diskda saqlanadi (Retention Policy).
  - Consumer-lar o'zlarining o'qish joyini (`offset`) o'zlari boshqarishadi.
  - Xabarlar o'qilgandan keyin ham o'chirilmaydi. Istalgan vaqtda eski offset-ga qaytib, ma'lumotlarni qayta o'qish (replay) mumkin.

### 2. Message Delivery Guarantees (Yetkazib berish kafolatlari)
Tizimlarda xabarlarni yo'qotmaslik yoki takrorlamaslik uchun quyidagi kafolatlar ishlatiladi:
- **At-most-once (Ko'pi bilan bir marta):** Xabar yo'qolishi mumkin, lekin hech qachon takrorlanmaydi. Consumer xabarni olishi bilan `ACK` yuboradi, agar hisoblash jarayonida o'chib qolsa, xabar yo'qoladi.
- **At-least-once (Kamida bir marta):** Xabar hech qachon yo'qolmaydi, lekin takroran kelishi (dublikat) mumkin. Tarmoq uzilishi sababli `ACK` brokerga yetib bormasa, broker xabarni qayta yuboradi.
- **Exactly-once (Roppa-rosa bir marta):** Eng ideal va qiyin kafolat. Bunga tarmoqda *At-least-once* yetkazish va consumer-da *idempotentlik* (yoki tranzaksiyalar) orqali erishiladi.

### 3. Event Sourcing va CQRS
- **Event Sourcing:** Tizim holatini o'zgartiruvchi har bir harakat hodisa sifatida yozib boriladi. Masalan, bank hisob raqamining yakuniy balansi emas, barcha pul o'tkazmalari tarixi saqlanadi.
- **CQRS (Command Query Responsibility Segregation):** O'qish (Query) va yozish (Command) modellarini alohida ajratish. Yozish ma'lumotlar bazasi faqat event yozadi, o'qish bazasi (masalan, Elasticsearch) esa ushbu eventlar asosida tezkor qidiruv modellarini shakllantiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Consumer-larda Idempotentlikni hisobga olmaslik:** Brokerlar xabarni takroran yuborishi mumkin (At-least-once). Agar sizning to'lov consumer-ingiz idempotent bo'lmasa va bitta to'lov xabarini ikki marta qabul qilsa, foydalanuvchidan pul ikki marta yechib olinadi. Har doim xabarning unikal ID-sini tekshirib ishlang.
2. **Kafkada partitsiyalar tartibini unutish:** Kafka xabarlarning qat'iy ketma-ketligini faqat **bitta partitsiya doirasida** kafolatlaydi. Agar buyurtma holatini yangilash eventlari (yaratildi -> to'landi -> yetkazildi) har xil partitsiyalarga tarqalib ketsa, tartib buziladi. Bir xil obyektga tegishli eventlarni har doim bir xil `Routing Key` (masalan, `order_id`) bilan yuborish kerak.
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

```mermaid
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
```

---

## 10. 📌 Cheat Sheet

| Xususiyat | RabbitMQ (Message Queue) | Apache Kafka (Event Stream) |
| :--- | :--- | :--- |
| **Saqlash turi** | Transient (vaqtinchalik xotira, ACK dan so'ng o'chadi) | Log Compaction / Diskda doimiy saqlash |
| **Xabar o'qish** | Smart broker (o'qish tartibini o'zi boshqaradi) | Smart consumer (offset ko'rsatkichi yordamida o'qiydi) |
| **Qayta o'qish (Replay)** | Mumkin emas | Istalgan vaqtda offsetni orqaga qaytarib bo'ladi |
| **Asosiy ishlatilishi** | Murakkab marshrutlash (routing) va asinxron vazifalar | Loglar oqimi, real-time analytics, event sourcing |
| **Masshtablanish** | Gorizontal kengayadi, lekin disk I/O cheklaydi | Partitsiyalar orqali juda yuqori parallelizm |

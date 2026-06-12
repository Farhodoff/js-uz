export const microservices = {
  id: "microservices",
  title: "Mikroservislar Arxitekturasi (Microservices)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Tasavvur qiling, sizda katta restoran bor.
- **Monolit arxitektura:** Bitta universal xodim ham mijozlarni kutib oladi, ham buyurtma oladi, ham ovqat pishiradi, ham idishlarni yuvadi va hisob-kitob qiladi. Agar bu xodim kasal bo'lib qolsa yoki charchasa, butun restoran ishi to'xtaydi. Shuningdek, bu universal xodimni o'qitish va kengaytirish juda qiyin.
- **Mikroservislar arxitekturasi:** Restoranda har bir vazifa uchun alohida mutaxassislar ishlaydi. Eshikda kutib oluvchi (API Gateway), stollarda ofitsiantlar (Order Service), oshxonada oshpazlar (Kitchen Service), hisobchilar (Payment Service) bor. Agar bitta oshpaz ishga kela olmasa, boshqa oshpazlar uning o'rnini to'ldiradi va restoran ishi to'xtab qolmaydi. Har bir xodim o'z ishiga ixtisoslashgan va ularni mustaqil ravishda boshqarish oson.

Dasturiy ta'minotda ham **Monolit** — bu barcha funksiyalar (foydalanuvchilar, buyurtmalar, to'lovlar) bitta umumiy kod bazasi va bitta bazada joylashishidir. **Mikroservislar** esa har bir funktsional qism alohida dastur (servis) sifatida ishlab, o'zaro tarmoq orqali gaplashishidir.

---

## 2. 💻 Real Kod Misollari

Quyida sodda ko'rinishdagi API Gateway va mikroservis yo'naltirish (routing) mantiqining Node.js Express'dagi namunasi keltirilgan:

\`\`\`javascript
// API Gateway - So'rovlarni tegishli mikroservislarga yo'naltiruvchi markaz
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8000;

// Servislar ro'yxati (Registry)
const SERVICES = {
  userService: 'http://localhost:8001',
  orderService: 'http://localhost:8002'
};

// Gateway orqali foydalanuvchilar servisiga yo'naltirish
app.get('/api/users/:id', async (req, res) => {
  try {
    const response = await axios.get(\`\${SERVICES.userService}/users/\${req.params.id}\`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'UserService ulanishida xatolik' });
  }
});

// Gateway orqali buyurtmalar servisiga yo'naltirish
app.get('/api/orders/:id', async (req, res) => {
  try {
    const response = await axios.get(\`\${SERVICES.orderService}/orders/\${req.params.id}\`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'OrderService ulanishida xatolik' });
  }
});

app.listen(PORT, () => {
  console.log(\`API Gateway ishga tushdi: port \${PORT}\`);
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### A. API Gateway
Mijozlar (mobil ilovalar, brauzerlar) har bir mikroservisning alohida manzillarini bilishi shart emas. Ular yagona nuqta — **API Gateway**ga murojaat qilishadi. Gateway quyidagi vazifalarni bajaradi:
1. **Routing:** So'rovlarni tegishli servisga yo'naltiradi.
2. **Authentication/Authorization:** Foydalanuvchini tekshiradi.
3. **Rate Limiting:** Haddan tashqari ko'p so'rovlarni cheklaydi.

### B. gRPC vs REST
Mikroservislar bir-biri bilan aloqa qilishda ikki xil yondashuvdan foydalanadi:
- **REST (HTTP/1.1 + JSON):** Oson tushuniladi, brauzerlar yaxshi qo'llab-quvvatlaydi, lekin ma'lumot formati matnli (JSON) bo'lgani uchun hajmi kattaroq va sekinroq.
- **gRPC (HTTP/2 + Protocol Buffers):** Google tomonidan ishlab chiqilgan bo'lib, ma'lumotlarni ikkilik (binary) formatda uzatadi. HTTP/2 multiplexing yordamida tezkor, asosan ichki servislararo aloqa (East-West traffic) uchun tavsiya etiladi.

### C. Database per Service
Mikroservislarning eng muhim qoidasi: **Har bir servis faqat o'z ma'lumotlar bazasiga ega bo'lishi kerak.** 
Agarda servislar umumiy bazadan foydalansa (Shared Database), ular bir-biriga qattiq bog'lanib qoladi (Tight Coupling) va mikroservis afzalliklari yo'qoladi. Aloqa faqat API yoki Message Broker (masalan, Kafka, RabbitMQ) orqali amalga oshishi shart.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Taqsimlangan Monolit (Distributed Monolith) yaratish:** Servislarni shunday qattiq bog'lab qo'yishadiki, bittasini deploy qilish uchun hammasini bir vaqtda deploy qilish kerak bo'ladi.
2. **Umumiy ma'lumotlar bazasidan foydalanish (Shared Database):** "A" servis to'g'ridan-to'g'ri "B" servisning jadvaliga so'rov (JOIN) yozadi. Bu ma'lumotlar arxitekturasini buzadi.
3. **Tarmoq kechikishlarini hisobga olmaslik:** Har bir tarmoq so'rovi vaqt oladi. Agar bitta so'rovni bajarish uchun zanjirsimon 10 ta servisga murojaat qilinsa, kechikish (latency) juda yuqori bo'ladi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Monolit va Mikroservisning asosiy farqi nimada?**
Monolitda hamma narsa yagona ilovada ishlaydi. Mikroservisda esa tizim mustaqil xizmatlarga bo'linadi va har biri o'z vazifasini bajarami.

**2. Database per Service nima va u nima uchun kerak?**
Har bir servisning ma'lumotlari faqat unga tegishli bo'lishi qoidasi. Bu servislar mustaqilligini ta'minlaydi va ma'lumotlar bazasi darajasidagi bog'liqlikni oldini oladi.

**3. API Gateway nima?**
Mijoz so'rovlarini qabul qilib, kerakli mikroservislarga tarqatuvchi, xavfsizlik va yuklamani boshqaruvchi yagona kirish nuqtasi.

**4. gRPC ning REST dan afzalligi nimada?**
gRPC HTTP/2 va binary formatdan (Protobuf) foydalangani uchun ancha tezroq, kamroq tarmoq trafigini sarflaydi va kuchli tipleştirishga (strongly typed) ega.

**5. Servislararo aloqada Sinxron va Asinxron farqi nimada?**
Sinxron (REST/gRPC) aloqada javob kelguncha kutiladi. Asinxron (Kafka/RabbitMQ) aloqada xabar yuboriladi va javob kutilmasdan ish davom ettiriladi.

**6. Circuit Breaker patterni nima uchun kerak?**
Agar biror servis ishdan chiqsa, unga tinimsiz so'rov yuborib tizimni quritmaslik uchun so'rovlarni vaqtincha to'xtatib turuvchi xavfsizlik o'chirgichi.

**7. Saga pattern nima?**
Mikroservislarda taqsimlangan tranzaksiyalarni boshqarish usuli. Agar bitta qadam muvaffaqiyatsiz tugasa, avvalgi bajarilgan amallarni bekor qiluvchi kompensatsion amallar zanjiri ishga tushadi.

**8. Service Discovery nima?**
Mikroservislar dinamik ravishda o'zgarib turadigan IP-manzillarini avtomatik ro'yxatdan o'tkazadigan va bir-birlarini topishiga yordam beradigan tizim (masalan, Consul, Eureka).

**9. Eventual Consistency nima?**
Ma'lumotlarning darhol emas, balki ma'lum vaqt o'tgach barcha xizmatlarda bir xil holatga kemishi (asinxron tizimlarda qo'llaniladi).

**10. Distributed Tracing nima?**
Mijozdan kelgan so'rovning barcha mikroservislar bo'ylab qanday o'tganini va qaysi servisda qancha vaqt yo'qotilganini kuzatish tizimi (masalan, Jaeger, Zipkin).

**11. API Gateway va Load Balancer farqi nimada?**
Load Balancer trafigini serverlar bo'ylab teng taqsimlaydi. API Gateway esa marshrutlash (routing), avtorizatsiya va API darajasidagi ishlarni bajaradi.

**12. Nima uchun mikroservislar monolitga qaraganda qimmatroq va murakkabroq?**
Chunki tarmoq muammolari, monitoring, deploy va CI/CD jarayonlari, tranzaksiyalar boshqaruvi va infrastruktura xarajatlari sezilarli darajada ko'payadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida mikroservis arxitekturasida keng qo'llaniladigan asosiy mexanizmlarni JavaScript misolida amalda yozib ko'rasiz.

---

## 7. 📝 12 ta Mini Test

Bilimingizni sinash uchun pastdagi testlarni yeching.

---

## 8. 🎯 Real Project Case Study

### E-Commerce API Gateway va Saga Pattern
Katta internet do'konida (masalan, Amazon):
1. Mijoz buyurtma berganda so'rov **API Gateway**ga keladi.
2. Gateway so'rovni **Order Service**ga yuboradi.
3. Tranzaksiya trigerlanadi (Saga):
   - **Order Service** buyurtmani \"Kutilmoqda\" holatida ochadi.
   - **Stock Service** omborda mahsulotni band qiladi.
   - **Payment Service** pul yechadi.
4. Agar pul yetarli bo'lmasa, Saga tranzaksiyasi kompensatsiya yoqadi: ombor qayta tiklanadi va buyurtma bekor qilinadi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    Client[Mijoz / Client] -->|So'rov yuborish| Gateway[API Gateway]
    Gateway -->|/users | UserService[User Service]
    Gateway -->|/orders | OrderService[Order Service]
    Gateway -->|/payments | PaymentService[Payment Service]
    
    UserService -->|Mustaqil Baza| DB1[(User DB)]
    OrderService -->|Mustaqil Baza| DB2[(Order DB)]
    PaymentService -->|Mustaqil Baza| DB3[(Payment DB)]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Xususiyat | Monolit | Mikroservislar |
| :--- | :--- | :--- |
| **Kodni joylashtirish** | Yagona repo va server | Bir nechta mustaqil servislar |
| **Baza dizayni** | Yagona umumiy DB (Shared) | Har bir servis uchun alohida (DB per Service) |
| **Aloqa turi** | Funksiya chaqiruvi (Tezkor) | Tarmoq so'rovlari (REST, gRPC, Message Broker) |
| **Deploy tezligi** | Sekin, butun tizim qayta yuklanadi | Tez, faqat o'zgartirilgan servis yangilanadi |
| **Texnologiyalar** | Yagona stack (masalan, faqat Node.js) | Har xil stacklar bo'lishi mumkin (Node, Go, Python) |
`,
  exercises: [
    {
      id: 1,
      title: "API Gateway Path Router",
      instruction: "Berilgan URL yo'liga qarab so'rovni mos keladigan mikroservisga yo'naltiruvchi `routeRequest(path)` funksiyasini yozing. Yo'naltirish qoidalari:\n- `/users` bilan boshlansa -> `'UserService'`\n- `/orders` bilan boshlansa -> `'OrderService'`\n- `/payments` bilan boshlansa -> `'PaymentService'`\n- Boshqa holatlarda -> `'404'` qaytarsin.",
      startingCode: "function routeRequest(path) {\n  // Yo'naltirish mantiqini kiriting\n}",
      hint: "path.startsWith yoki regular expression yordamida tekshiring.",
      test: "if (typeof routeRequest !== 'function') return 'routeRequest topilmadi'; if (routeRequest('/users/profile') !== 'UserService') return 'UserService xatosi'; if (routeRequest('/orders/123') !== 'OrderService') return 'OrderService xatosi'; if (routeRequest('/payments/pay') !== 'PaymentService') return 'PaymentService xatosi'; if (routeRequest('/products') !== '404') return '404 xatosi'; return null;"
    },
    {
      id: 2,
      title: "Saga Compensating Actions",
      instruction: "Saga patternida taqsimlangan tranzaksiya amalga oshirilganda, agar biror qadamda xatolik yuz bersa, avvalgi muvaffaqiyatli qadamlarning bekor qilish (compensate) funksiyalari teskari tartibda chaqirilishi kerak. `processSaga(steps)` funksiyasini yozing. Agar qadamlar orasida xato bo'lsa, avvalgi muvaffaqiyatli qadamlarning `compensate()` funksiyasini chaqiring va `'FAILED'` qaytaring. Agar hammasi muvaffaqiyatli o'tsa, `'SUCCESS'` qaytarsin.",
      startingCode: "function processSaga(steps) {\n  // steps - bu { name, action, compensate } obyektlar massivi\n}",
      hint: "Sikl orqali har bir step.action() ni bajaring. Xatolik tutilganda (try-catch) orqaga qaytib compensate() ni chaqiring.",
      test: "if (typeof processSaga !== 'function') return 'processSaga topilmadi'; let comp = []; const steps = [{ name: 'A', action: () => {}, compensate: () => comp.push('A') }, { name: 'B', action: () => { throw new Error('B failed') }, compensate: () => comp.push('B') }]; try { const res = processSaga(steps); if (res !== 'FAILED') return 'Xato bo\\'lganda FAILED qaytishi kerak'; if (comp.length !== 1 || comp[0] !== 'A') return 'Kompensatsiya to\\'g\\'ri ishlamadi'; } catch(e) { return 'Xato funksiya ichida tutilishi kerak'; } return null;"
    },
    {
      id: 3,
      title: "Circuit Breaker State Machine",
      instruction: "Mikroservislarda zanjirli nosozliklarni oldini olish uchun Circuit Breaker ishlatiladi. Nosozliklar soni berilgan limitga yetganda va belgilangan vaqt (timeout) o'tmagan bo'lsa holat `'OPEN'`, vaqt o'tgan bo'lsa `'HALF-OPEN'`, aks holda `'CLOSED'` bo'ladi. `getCircuitState(failures, threshold, lastFailureTime, timeout)` funksiyasini yarating. Hozirgi vaqtni olish uchun `Date.now()` dan foydalaning.",
      startingCode: "function getCircuitState(failures, threshold, lastFailureTime, timeout) {\n  // Holatni aniqlang\n}",
      hint: "Hozirgi vaqtdan lastFailureTime ayirmasi timeout dan kichikligini tekshiring.",
      test: "if (typeof getCircuitState !== 'function') return 'getCircuitState topilmadi'; if (getCircuitState(2, 3, Date.now() - 1000, 5000) !== 'CLOSED') return 'CLOSED xatosi'; if (getCircuitState(4, 3, Date.now() - 2000, 5000) !== 'OPEN') return 'OPEN xatosi'; if (getCircuitState(4, 3, Date.now() - 6000, 5000) !== 'HALF-OPEN') return 'HALF-OPEN xatosi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Monolit va Mikroservis arxitekturasi farqi nimada?",
      options: [
        "Monolitda barcha kod bitta ilovada bo'ladi, mikroservisda esa tizim mustaqil xizmatlarga bo'linadi",
        "Monolit har doim tezroq ishlaydi va arzonroq",
        "Mikroservisda faqat bitta ma'lumotlar bazasi ishlatiladi",
        "Monolit faqat frontend uchun ishlatiladi"
      ],
      correctAnswer: 0,
      explanation: "Monolit barcha komponentlarni bitta blokda birlashtiradi, mikroservis esa ularni mustaqil modullarga ajratadi."
    },
    {
      id: 2,
      question: "\"Database per service\" patterni nimani anglatadi?",
      options: [
        "Har bir mikroservis o'zining shaxsiy ma'lumotlar bazasiga ega bo'lishi va boshqalar unga to'g'ridan-to'g'ri kirmasligi",
        "Barcha mikroservislar bitta umumiy bazadan foydalanishi",
        "Ma'lumotlar bazasi faqat bitta servisda bo'lishi",
        "Har bir foydalanuvchiga bitta ma'lumotlar bazasi ochilishi"
      ],
      correctAnswer: 0,
      explanation: "Ushbu pattern har bir xizmatning ma'lumotlar doirasi mustaqilligini ta'minlaydi."
    },
    {
      id: 3,
      question: "API Gateway-ning asosiy vazifasi nima?",
      options: [
        "Mijoz so'rovlarini qabul qilib, ularni tegishli mikroservislarga yo'naltirish (routing)",
        "Servislar orasidagi ma'lumotlarni shifrlash",
        "Ma'lumotlar bazasini boshqarish",
        "Kodlarni kompilatsiya qilish"
      ],
      correctAnswer: 0,
      explanation: "API Gateway mijoz so'rovlari uchun yagona eshik vazifasini o'taydi va ularni kerakli joyga yo'naltiradi."
    },
    {
      id: 4,
      question: "gRPC va REST o'rtasidagi asosiy farq nima?",
      options: [
        "gRPC asosan HTTP/2 va Protocol Buffers (ikkilik format) dan foydalanadi, REST esa HTTP/1.1 va JSON dan",
        "gRPC faqat JavaScript-da ishlaydi",
        "REST tezroq ishlaydi",
        "gRPC faqat sinxron aloqani qo'llaydi"
      ],
      correctAnswer: 0,
      explanation: "gRPC HTTP/2 va binary Protobuf orqali juda tezkor va samarali aloqa o'rnatadi."
    },
    {
      id: 5,
      question: "Mikroservislarda asinxron aloqa uchun qaysi texnologiyalar ko'p ishlatiladi?",
      options: [
        "Message Brokerlar (masalan, RabbitMQ, Apache Kafka)",
        "HTTP REST API",
        "gRPC va WebSocket",
        "PostgreSQL triggerlari"
      ],
      correctAnswer: 0,
      explanation: "Message brokerlar servislar o'rtasida bog'lanmagan (decoupled) asinxron aloqani tashkil qilishda qo'llaniladi."
    },
    {
      id: 6,
      question: "Distributed Monolith (Taqsimlangan monolit) deganda nima tushuniladi?",
      options: [
        "Servislar bir-biri bilan juda qattiq bog'langan (tightly coupled) va mustaqil deploy qilib bo'lmaydigan yomon dizayn anti-patterni",
        "Dunyo bo'ylab tarqatilgan mukammal monolit tizim",
        "Faqat ma'lumotlar bazasini taqsimlaydigan monolit",
        "Cloud provayderlardagi monolit serverlar guruhi"
      ],
      correctAnswer: 0,
      explanation: "Distributed Monolith mikroservislarning kamchiliklarini (tarmoq muammolari, deploy murakkabligi) olib, afzalliklaridan foydalana olmaydigan yomon dizayndir."
    },
    {
      id: 7,
      question: "Circuit Breaker patternining vazifasi nima?",
      options: [
        "Nosoz mikroservisga so'rov yuborishni vaqtincha to'xtatib, butun tizim qulashining oldini olish",
        "Tizimga xakerlik hujumlarini to'xtatish",
        "Ma'lumotlarni siqish va arxivlash",
        "Serverlardagi elektr ta'minotini nazorat qilish"
      ],
      correctAnswer: 0,
      explanation: "Circuit Breaker nosoz servisni ajratib qo'yish orqali kaskadli nosozliklarni (cascading failures) oldini oladi."
    },
    {
      id: 8,
      question: "Mikroservislar o'rtasida sinxron aloqaning kamchiligi nimada?",
      options: [
        "Zanjirli kechikishlar (Cascading Latency) va bitta servis qulasa boshqalari ham to'xtab qolishi xavfi",
        "Aloqa faqat shifrlangan bo'lishi",
        "Protokollar mos kelmasligi",
        "Hech qanday kamchiligi yo'q"
      ],
      correctAnswer: 0,
      explanation: "Sinxron zanjirda bitta servis sekinlashsa, butun zanjirdagi so'rovlar kechikadi."
    },
    {
      id: 9,
      question: "Saga Pattern nima uchun ishlatiladi?",
      options: [
        "Bir nechta mikroservislar bo'ylab tarqalgan tranzaksiyalarni (Distributed Transactions) va kompensatsiyalarni boshqarish",
        "Serverlar yuklamasini muvozanatlash",
        "Ma'lumotlarni keshga saqlash",
        "Foydalanuvchilarni autentifikatsiya qilish"
      ],
      correctAnswer: 0,
      explanation: "Saga tranzaksiya bosqichlarini kuzatadi va xatolik bo'lsa kompensatsiya qadamlarini bajarib ma'lumotlar izchilligini saqlaydi."
    },
    {
      id: 10,
      question: "Service Discovery (Servislarni aniqlash) nima uchun kerak?",
      options: [
        "Dinamik ravishda o'zgarib turadigan mikroservis IP manzillarini avtomatik ro'yxatga olish va topish",
        "Yangilangan versiyalarni tekshirish",
        "Serverdagi disk hajmini o'lchash",
        "IP manzillarni har safar qo'lda sozlash"
      ],
      correctAnswer: 0,
      explanation: "Mikroservislar ko'payganda va o'chib-yonib turganida, ularning IP manzillarini aniqlab berish vazifasini bajaradi."
    },
    {
      id: 11,
      question: "Nima uchun mikroservislarda umumiy ma'lumotlar bazasidan (Shared Database) qochish tavsiya etiladi?",
      options: [
        "Servislar o'rtasida qattiq bog'liqlik (tight coupling) yuzaga keladi va mustaqil rivojlanish cheklanadi",
        "Umumiy baza har doim juda qimmat turadi",
        "Bazalar faqat bitta servis uchun mo'ljallangan bo'ladi",
        "Buning hech qanday zarari yo'q"
      ],
      correctAnswer: 0,
      explanation: "Shared DB ishlatilsa, bitta xizmatdagi sxema o'zgarishi ikkinchi xizmat ishini buzishi mumkin."
    },
    {
      id: 12,
      question: "API Gateway-da \"Rate Limiting\" funksiyasi nima vazifani bajaradi?",
      options: [
        "Foydalanuvchi yoki IP manzil yuborishi mumkin bo'lgan so'rovlar sonini cheklash orqali tizimni haddan taxation yuklanishdan himoya qilish",
        "Internet provayder tezligini cheklash",
        "Ma'lumotlar bazasi hajmini kamaytirish",
        "Server xarajatlarini hisoblab borish"
      ],
      correctAnswer: 0,
      explanation: "Rate Limiting xizmatlarni haddan tashqari ko'p so'rovlar (masalan, DDoS yoki noto'g'ri yozilgan loop) oqibatida qulashdan saqlaydi."
    }
  ]
};

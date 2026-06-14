export const apiGateway = {
  id: "apiGateway",
  title: "API Gateway, Mikroxizmatlar va Ma'lumotlar Bazasi Asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Zamonaviy dasturlar bir nechta kichik bo'limlardan yoki xizmatlardan tashkil topishi mumkin. Tizim dizaynida eng muhim komponentlardan biri bu kirish eshigini nazorat qiluvchi **API Gateway** hisoblanadi. Shuningdek, dasturning umumiy arxitekturasi (**Monolith vs Microservices**) va ma'lumotlarni saqlash usuli (**SQL vs NoSQL**) butun loyihaning muvaffaqiyatini belgilaydi.

### API Gateway o'xshatishi:
Siz yirik savdo markaziga (Shopping Mall) kirdingiz.
- Agar savdo markazida axborot bo'limi (Information Desk / API Gateway) bo'lmasa, siz kiyim do'koni, oziq-ovqat va kinoteatrni qidirib sarson bo'lasiz.
- API Gateway — bu markazdagi **kirish eshigi va resepshn**. Siz undan "Kino qayerda?" deb so'raysiz va u sizni to'g'ri qavatga yo'naltiradi. Shuningdek, u kirishda xavfsizlikni tekshiradi (Authentication) va juda ko'p odam kelganda oqimni tartibga soladi (Rate Limiting).

---

## 2. 💻 Real Kod Misollari

Node.js-da sodda API Gateway routing (yo'naltirish) misoli:

\`\`\`javascript
const express = require('express');
const axios = require('axios');
const app = express();

const SERVICES = {
  users: 'http://localhost:4001',
  orders: 'http://localhost:4002'
};

// API Gateway orqali so'rovni tegishli servisga yo'naltirish (Reverse Proxying)
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(\`\${SERVICES.users}/users\`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('User Service ishlamayapti');
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const response = await axios.get(\`\${SERVICES.orders}/orders\`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Order Service ishlamayapti');
  }
});

app.listen(8000, () => console.log('API Gateway 8000-portda ishga tushdi'));
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### API Gateway Vazifalari:
1. **Routing:** Kelgan so'rovni yo'liga mos ravishda backend mikroxizmatiga (microservice) jo'natish.
2. **Authentication & Authorization:** So'rov egasini (masalan, JWT token orqali) tekshirish. Kichik xizmatlar bunga chalg'imaydi.
3. **Rate Limiting:** Bitta foydalanuvchi soniyasiga me'yordan ortiq so'rov yuborishini cheklash.
4. **Load Balancing:** Bir nechta bir xil mikroxizmat serverlari o'rtasida yukni teng taqsimlash.

### Monolith vs. Microservices:
- **Monolith (Monolit):** Barcha kodlar (foydalanuvchi, to'lov, mahsulotlar) bitta umumiy loyihada joylashadi. Ishga tushirish oson, lekin loyiha kattalashgani sari boshqarish va kengaytirish qiyinlashadi.
- **Microservices (Mikroxizmatlar):** Har bir bo'lim alohida, mustaqil dasturlar sifatida ishlaydi va bir-biri bilan tarmoq (HTTP/gRPC/Message Queue) orqali bog'lanadi. Bitta bo'lim buzilsa, qolganlari ishlayveradi.

### SQL vs. NoSQL:
- **SQL (Relational):** Ma'lumotlar qat'iy jadval formatida va bir-biri bilan aloqador (Relationships - Foreign Keys) saqlanadi. Tranzaksiyalar ishonchliligi (ACID) juda yuqori (masalan, PostgreSQL, MySQL).
- **NoSQL (Non-relational):** Hujjatli (Document), kalit-qiymat (Key-Value) yoki graf ko'rinishida saqlanadi. Qat'iy sxema talab qilmaydi, gorizontal kengayishi juda oson (masalan, MongoDB, Redis).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **API Gateway-ni yagona qulash nuqtasi (Single Point of Failure) qilib qo'yish:** Agar faqat bitta API Gateway ishlatilsa va u buzilsa, butun tizim to'xtaydi. API Gateway-ni ham bir nechta nusxada (redundancy) ishga tushirish shart.
2. **Kichik loyihalar uchun mikroxizmatlar qurish:** Mikroxizmatlar boshqaruv va infratuzilma jihatidan juda qimmat. Boshlanishiga monolit loyiha yaratish tavsiya etiladi.
3. **SQL o'rniga asossiz NoSQL tanlash:** Agar ma'lumotlar tuzilishi murakkab bog'liqliklardan iborat bo'lsa (masalan, bank, ijtimoiy tarmoq do'stlik aloqalari), NoSQL tanlash kod darajasida juda ko'p muammolar yaratadi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. API Gateway nima va u qanday vazifalarni bajaradi?**
Tizimga kiruvchi yagona eshik vazifasini o'taydi. Marshrutlash (Routing), autentifikatsiya, rate limiting, so'rovlarni o'zgartirish va monitoring kabi ishlarni bajaradi.

**2. Mikroxizmatlar (Microservices) nima?**
Katta tizimni mustaqil, o'zaro tarmoq orqali gaplashadigan va har biri o'z ma'lumotlar bazasiga ega bo'lgan kichik dasturlarga ajratish arxitekturasi.

**3. API Gateway orqali 'Rate Limiting' qanday qo'llaniladi?**
Foydalanuvchining IP yoki API kaliti orqali uning ma'lum vaqt (masalan, 1 daqiqa) ichida yuborishi mumkin bo'lgan maksimal so'rovlar soni cheklanadi (masalan, 100 ta so'rov).

**4. ACID xususiyatlari SQL bazalarda nimani anglatadi?**
Atomicity (Barcha operatsiyalar bajariladi yoki hech biri bajarilmaydi), Consistency (Baza qoidalarga mos holatda qoladi), Isolation (Parallel tranzaksiyalar bir-biriga xalaqit bermaydi), Durability (Muvaffaqiyatli o'zgarishlar o'chib ketmaydi).

**5. Monolit arxitekturaning afzalliklari nimada?**
Ishlab chiqish oson, deploy qilish oddiy, tarmoq orqali bog'lanish yo'qligi sabab kechikishlar (network latency) bo'lmaydi va boshida arzonroq tushadi.

**6. SQL va NoSQL ma'lumotlar bazalari farqi nimada?**
SQL relyatsion, qat'iy jadvalli va ACID-ga asoslangan. NoSQL esa moslashuvchan, sxemasiz va gorizontal masshtablanishga moslashgan.

**7. API Gateway-ning salbiy tomonlari (Disadvantages) nima?**
Tizimga qo'shimcha kechikish (latency) qo'shadi, murakkablikni oshiradi va u buzilsa, butun tizim qulashi mumkin (Single Point of Failure).

**8. Mikroxizmatlar bir-biri bilan qanday bog'lanadi?**
Sinxron usulda (HTTP/REST, gRPC) yoki asinxron usulda (RabbitMQ, Kafka kabi Message Broker-lar orqali).

**9. NoSQL-ning gorizontal masshtablanishi (Horizontal Scaling) qanday amalga oshadi?**
Sharding (ma'lumotlarni turli serverlarga bo'laklab bo'lib tashlash) orqali osongina amalga oshiriladi.

**10. API Gateway-da 'Request Rate Limiting' uchun qaysi algoritmlar ishlatiladi?**
Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log.

**11. API Gateway va yuk taqsimlovchi (Load Balancer) farqi nimada?**
Load Balancer trafigini tarmoq darajasida (L4/L7) taqsimlaydi. API Gateway esa dasturiy darajada biznes mantiqni (avtorizatsiya, marshrutlash, o'zgartirish) tushunadi.

**12. Mikroxizmatlarda 'Database per Service' patterni nima?**
Har bir mikroxizmat faqat o'zining shaxsiy ma'lumotlar bazasiga ega bo'lishi va boshqa xizmatlar bazasiga to'g'ridan-to'g'ri so'rov yubora olmasligi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy kod topshiriqlari bilan bilimingizni mustahkamlang.

---

## 7. 📝 12 ta Mini Test

Testlarni yechib, darsni o'zlashtirganingizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### E-Commerce saytida API Gateway va Mikroxizmatlar
Foydalanuvchi buyurtma bermoqchi bo'lganida, so'rov API Gateway-ga keladi. Gateway birinchi navbatda foydalanuvchining loginini tekshiradi (Auth Service-ga bormasdan keshdan). Keyin so'rovni \`Order Service\`ga yuboradi. Shu bilan birga, tavsiyalar ro'yxatini olish uchun so'rov parallel ravishda \`Recommendation Service\`ga yuborilib, natijalar birlashtiriladi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    Client[Client App] -->|HTTPS request| GW[API Gateway]
    GW -->|Route to Auth| Auth[Auth Service]
    GW -->|Route to Catalog| Cat[Product Catalog Service]
    GW -->|Route to Orders| Ord[Order Service]
    
    Auth --> DB1[(Auth DB)]
    Cat --> DB2[(NoSQL Catalog DB)]
    Ord --> DB3[(SQL Orders DB)]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Xususiyati | Monolit | Mikroxizmatlar |
| :--- | :--- | :--- |
| **Kengayuvchanlik** | Qiyin, faqat butun tizim kengayadi | Oson, faqat og'ir yuklamali servis kengayadi |
| **Deploy** | Bitta fayl, oson | Har bir xizmat alohida, murakkab CI/CD |
| **Xatoga chidamlilik** | Bitta xato butun dasturni to'xtatadi | Bitta servis to'xtasa ham boshqalari ishlaydi |

| Xususiyati | SQL | NoSQL |
| :--- | :--- | :--- |
| **Sxema** | Qat'iy, jadvallar | Moslashuvchan, JSON/Key-value |
| **Masshtablash** | Vertikal | Gorizontal (Sharding) |
| **Tranzaksiyalar** | Kuchli ACID | Eventual Consistency (BASE) |
`,
  exercises: [
    {
      id: 1,
      title: "Marshrutni API Gateway orqali aniqlash",
      instruction: "Kelgan yo'l (path) bo'yicha so'rovni qaysi xizmatga yo'naltirish kerakligini aniqlovchi `resolveRoute(path)` funksiyasini yozing. `/users` bilan boshlansa `USER_SERVICE`, `/orders` bo'lsa `ORDER_SERVICE`, aks holda `NOT_FOUND` qaytarsin.",
      startingCode: "function resolveRoute(path) {\n  // Yo'nalishni aniqlang\n}",
      hint: "path.startsWith dan foydalanib tekshiring.",
      test: "if (typeof resolveRoute !== 'function') return 'resolveRoute topilmadi'; if (resolveRoute('/users/profile') !== 'USER_SERVICE') return 'Users yo\\'nalishi noto\\'g\\'ri'; if (resolveRoute('/orders/new') !== 'ORDER_SERVICE') return 'Orders yo\\'nalishi noto\\'g\\'ri'; if (resolveRoute('/payment') !== 'NOT_FOUND') return 'Noma\\'lum yo\\'nalish xato'; return null;"
    },
    {
      id: 2,
      title: "API Gateway Rate Limiter",
      instruction: "Belgilangan daqiqadagi so'rovlar soni 100 tadan oshganda so'rovni bloklaydigan `shouldLimit(requestCount)` funksiyasini yozing (100 dan oshsa true, aks holda false).",
      startingCode: "function shouldLimit(requestCount) {\n  // Limitni tekshiring\n}",
      hint: "requestCount > 100 shartini tekshiring.",
      test: "if (typeof shouldLimit !== 'function') return 'shouldLimit topilmadi'; if (shouldLimit(50) !== false) return '50 ta so\\'rov cheklanmasligi kerak'; if (shouldLimit(101) !== true) return '100 dan oshganda cheklanishi kerak'; return null;"
    },
    {
      id: 3,
      title: "SQL/NoSQL formatini tekshirish",
      instruction: "Berilgan ma'lumotlar bazasi nomi bo'yicha uning SQL yoki NoSQL turiga kirishini qaytaradigan `getDBType(dbName)` funksiyasini yozing. PostgreSQL va MySQL uchun `SQL`, MongoDB va Redis uchun `NoSQL` qaytarsin, qolganlar uchun `UNKNOWN` bo'lsin.",
      startingCode: "function getDBType(dbName) {\n  // Turni aniqlang\n}",
      hint: "switch yoki if/else yordamida nomlarni solishtiring.",
      test: "if (typeof getDBType !== 'function') return 'getDBType topilmadi'; if (getDBType('PostgreSQL') !== 'SQL') return 'PostgreSQL xato'; if (getDBType('MongoDB') !== 'NoSQL') return 'MongoDB xato'; if (getDBType('Oracle') !== 'UNKNOWN') return 'Oracle holati tekshirilmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "API Gateway nima?",
      options: [
        "Faqat ma'lumotlar bazasini saqlaydigan server",
        "Mijoz va mikroxizmatlar o'rtasida turadigan, so'rovlarni boshqaruvchi va yo'naltiruvchi yagona kirish eshigi",
        "Dizayn yaratadigan grafik muharrir",
        "Brauzer keshini tozalaydigan dastur"
      ],
      correctAnswer: 1,
      explanation: "API Gateway mikroxizmatlar arxitekturasida barcha mijoz so'rovlarini qabul qilib, kerakli servislarga yo'naltiruvchi vositachidir."
    },
    {
      id: 2,
      question: "Rate Limiting funksiyasining maqsadi nima?",
      options: [
        "Serverdagi disk hajmini cheklash",
        "Tizimni haddan tashqari ko'p (zararli/avtomatlashtirilgan) so'rovlardan himoya qilish uchun so'rovlar oqimini cheklash",
        "Foydalanuvchilarning ismini tekshirish",
        "Faqat rasmlar yuklanishini taqiqlash"
      ],
      correctAnswer: 1,
      explanation: "Rate Limiting xavfsizlik va barqarorlik uchun bitta mijoz yubora oladigan so'rovlar sonini vaqt birligi ichida cheklaydi."
    },
    {
      id: 3,
      question: "Monolit (Monolith) arxitekturaning mikroxizmatlardan farqi nimada?",
      options: [
        "Unda ma'lumotlar bazasi umuman ishlatilmaydi",
        "Tizimning barcha biznes mantiqlari bitta yaxlit kod bazasida va bitta loyihada saqlanadi",
        "U faqat frontend qismdan iborat",
        "Uni faqat telefonlarda ishlatish mumkin"
      ],
      correctAnswer: 1,
      explanation: "Monolit arxitekturada hamma funksional (auth, payment, catalog) bitta umumiy ilova sifatida ishlaydi va birgalikda deploy qilinadi."
    },
    {
      id: 4,
      question: "Mikroxizmatlar (Microservices) tizimining asosiy kamchiligi nima?",
      options: [
        "Kichik yuklamalarni ko'tara olmasligi",
        "Tizimning murakkabligi va tarmoq orqali bog'lanish tufayli yuzaga keladigan tarmoq kechikishlari hamda boshqaruv qiyinligi",
        "Faqat JavaScript tili bilan cheklangani",
        "Baza turlari sonining kamligi"
      ],
      correctAnswer: 1,
      explanation: "Mikroxizmatlar mustaqillik bersa-da, tizim murakkabligini, tarmoq monitoringi, kesh va deploy jarayonlarini qiyinlashtiradi."
    },
    {
      id: 5,
      question: "SQL ma'lumotlar bazalarining eng kuchli xususiyati qaysi?",
      options: [
        "Ma'lumotlar sxemasining mutlaqo moslashuvchanligi",
        "Kuchli ACID tranzaksiyalari kafolati va relyatsion bog'liqliklar",
        "Gorizontal masshtablanishning juda osonligi",
        "Dasturlash tillarisiz ishlashi"
      ],
      correctAnswer: 1,
      explanation: "SQL bazalari tranzaksiyalar xavfsizligi (ACID) va jadvallar orasidagi munosabatlarni qat'iy saqlashi bilan mashhur."
    },
    {
      id: 6,
      question: "NoSQL ma'lumotlar bazalari qanday ma'lumot turlari uchun mosroq?",
      options: [
        "Murakkab buxgalteriya tranzaksiyalari",
        "Tez o'zgaruvchan, sxemasiz va katta hajmdagi hujjatli (JSON) yoki Key-Value ma'lumotlar uchun",
        "Faqat jadval ko'rinishidagi ma'lumotlar uchun",
        "Hech qanday ma'lumot uchun mos emas"
      ],
      correctAnswer: 1,
      explanation: "NoSQL bazalar moslashuvchan sxema taqdim etadi, bu esa tez o'zgaruvchan yoki tuzilmagan katta ma'lumotlarni yuritishni osonlashtiradi."
    },
    {
      id: 7,
      question: "Quyidagilardan qaysi biri NoSQL ma'lumotlar bazasi hisoblanadi?",
      options: [
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "SQLite"
      ],
      correctAnswer: 1,
      explanation: "MongoDB hujjatli (Document) NoSQL ma'lumotlar bazasi hisoblanadi. Qolganlari reliedan olingan SQL bazalardir."
    },
    {
      id: 8,
      question: "Mikroxizmatlarda 'Single Point of Failure' (Yagona qulash nuqtasi) nima?",
      options: [
        "Tizimning biron bir qismi buzilganda butun tizim ishdan chiqishiga sabab bo'luvchi zaif nuqta",
        "Xatolarni qayd etuvchi log fayli",
        "Faqat bitta foydalanuvchining login bo'lishi",
        "Tarmoq simining uzilishi"
      ],
      correctAnswer: 0,
      explanation: "Single Point of Failure (SPOF) - bu tizimdagi shunday komponentki, agar u ishdan chiqsa, uning o'rnini bosuvchi zaxira bo'lmagani uchun butun tizim qulaydi (masalan, yagona API Gateway)."
    },
    {
      id: 9,
      question: "Ma'lumotlar bazasini gorizontal kengaytirish (Horizontal Scaling) deganda nima tushuniladi?",
      options: [
        "Server protsessorini almashtirish",
        "Ma'lumotlarni bo'laklab, bir nechta serverlarga taqsimlash (Sharding) va yangi serverlar qo'shish",
        "Jadvallar sonini kamaytirish",
        "Bazani o'chirib qayta yuklash"
      ],
      correctAnswer: 1,
      explanation: "Gorizontal kengaytirishda yuklamani ko'tarish uchun ko'plab arzonroq mashinalar (nodes) qo'shiladi va ma'lumotlar ularga taqsimlanadi."
    },
    {
      id: 10,
      question: "gRPC protokoli mikroxizmatlarda nima uchun ishlatiladi?",
      options: [
        "Dizayn elementlarini yuklash uchun",
        "Mikroxizmatlar o'rtasida juda tezkor, binary formatdagi HTTP/2 asosidagi aloqani o'rnatish uchun",
        "Faqat HTML sahifalarni render qilish uchun",
        "Elektron xatlarni yuborish uchun"
      ],
      correctAnswer: 1,
      explanation: "gRPC protobuf formatida ma'lumot uzatgani uchun standart JSON/REST-ga qaraganda ancha tez va mikroxizmatlararo aloqa uchun juda mos."
    },
    {
      id: 11,
      question: "NoSQL bazalarda 'Eventual Consistency' nimani anglatadi?",
      options: [
        "Baza ma'lumotlari har doim o'chib ketishini",
        "Tizimning barcha nuqtalarida ma'lumotlar darhol emas, ma'lum vaqt o'tgach sinxronlashib bir xil holatga kelishini",
        "Ma'lumotlar faqat jadvalda saqlanishini",
        "Tranzaksiyalarning mutlaq taqiqlanishini"
      ],
      correctAnswer: 1,
      explanation: "Eventual consistency yordamida yozish operatsiyasi bajarilganda barcha serverlar darhol yangilanmaydi, lekin biroz vaqt o'tgach hamma nusxalar tenglashadi."
    },
    {
      id: 12,
      question: "API Gateway-dagi 'Request Aggregation' (So'rovlarni birlashtirish) nima?",
      options: [
        "Foydalanuvchini bloklash",
        "Client bitta so'rov yuboradi, Gateway orqa fonda bir nechta mikroxizmatlardan ma'lumotlarni yig'ib, bitta javob qilib qaytaradi",
        "Ma'lumotlar bazasini backup qilish",
        "Qo'shma so'rovlarni o'chirish"
      ],
      correctAnswer: 1,
      explanation: "Bu mijozning telefonidan 5-6 ta alohida tarmoq so'rovi yuborishini oldini olib, uning o'rniga tarmoq yukini kamaytirish maqsadida so'rovlarni Gateway darajasida birlashtirish usulidir."
    }
  ]
};

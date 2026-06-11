export const distributedCharacteristics = {
  id: "distributedCharacteristics",
  title: "Taqsimlangan Tizimlar Xususiyatlari (Scalability, Availability, Fault Tolerance)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Taqsimlangan tizimlar (Distributed Systems) — bu bir nechta mustaqil kompyuterlarning foydalanuvchiga bitta yaxlit tizim bo'lib ko'rinishidir. Bunday tizimlarni loyihalashda dasturchi va arxitektorlar tizimning eng muhim xarakteristikalarini hisobga olishlari shart. Bular: **Scalability** (kengayuvchanlik), **Availability** (ishchi holatda bo'lish foizi), **Latency** (kechikish vaqti) va **Fault Tolerance** (xatoga chidamlilik).

### Restoran tarmog'i analogiyasi:
Sizning bitta kichik pitsaxonangiz bor.
- **Scalability (Masshtablash):** Mijozlar ko'payib ketganda, siz yangi filiallar (filiallar tarmog'i - gorizontal scaling) ochasiz va buyurtmalarni taqsimlaysiz.
- **Availability (Mavjudlik/Ish vaqti):** Restoraningiz yiliga 365 kun, kuniga 24 soat ochiq bo'lishini ta'minlash. Agarda chiroq o'chsa, zaxira generator (backup) darhol ishga tushishi.
- **Latency (Kechikish):** Mijoz buyurtma berganidan boshqa uning stoliga pitsa yetib kelguncha ketgan vaqt. Bu vaqt qanchalik kam bo'lsa, mijoz shunchalik xursand bo'ladi.
- **Fault Tolerance (Xatoga chidamlilik):** Oshxonadagi 5 ta oshpazdan biri kasal bo'lib qolsa ham, pitsaxona to'xtab qolmaydi. Qolgan oshpazlar uning ishini bo'lishib olib, restoranni ochiq saqlaydi.

---

## 2. 💻 Real Kod Misollari

JavaScript-da tarmoqdagi kechikishni (Latency) hisoblash va xatolik yuz berganda qayta urinish (Retry Mechanism) logikasini yozish:

\`\`\`javascript
// 1. Kechikishni o'lchash (Latency Measurement)
async function measureLatency(url) {
  const start = performance.now();
  try {
    await fetch(url);
    const latency = performance.now() - start;
    console.log(\`Kechikish vaqti (Latency): \${latency.toFixed(2)} ms\`);
  } catch (err) {
    console.log('So\\'rov yuborib bo\\'lmadi');
  }
}

// 2. Xatoga chidamlilik uchun Retry (Qayta urinish) mexanizmi
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch (err) {
      console.log(\`Urinish \${i + 1} muvaffaqiyatsiz tugadi. Qayta urinish...\`);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
  throw new Error('Barcha urinishlar xato bilan tugadi (Service Unavailable)');
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Availability (Mavjudlik) va SLA:
Availability foizlar bilan o'lchanadi (odatda to'qqizlar bilan):
- **99.9% ("Three Nines"):** Yiliga maksimal 8.76 soat tizim ishlamay qolishi (downtime) mumkin.
- **99.999% ("Five Nines"):** Yiliga atigi 5.26 daqiqa downtime. Bunga erishish uchun barcha tizimlar to'liq zaxiralangan (redundant) bo'lishi kerak.

### 2. Fault Tolerance vs. High Availability:
- **Fault Tolerance (Xatoga mutlaq chidamlilik):** Uskuna buzilganda tizimda zarracha ham uzilish (zero downtime) yoki ma'lumot yo'qolishi sodir bo'lmaydi. Zaxira tizim parallel ishlab turadi. Juda qimmat.
- **High Availability (Yuqori mavjudlik):** Tizim buzilganda minimal darajada to'xtash sodir bo'lishi mumkin, lekin u tezda avtomatik tiklanadi (masalan, yuk zaxira serverga yo'naltiriladi).

### 3. Concurrency and Coordination:
Taqsimlangan serverlar orasida ma'lumotlar ziddiyatini (data race) va tranzaksiyalarni boshqarish uchun **Consensus Algorithms** (masalan, Raft, Paxos) yoki **Distributed Locks** (Redis Redlock) ishlatiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Monitoring va Observability-ni unutish:** Tizim ishga tushgach, server xotirasi (RAM) yoki disk to'lib qolganini faqat foydalanuvchilar shikoyat qilgandagina bilish. Prometheus, Grafana yoki ELK stack yordamida log va metrikalarni doimiy kuzatib borish shart.
2. **Kaskadli buzilishlar (Cascading Failures):** Zanjirdagi bitta servis qulaganda, barcha so'rovlar boshqa xizmatlarga borib, ularni ham navbatma-navbat yuklama ostida qotirib qo'yishi. Himoyalanish uchun **Circuit Breaker** patterni qo'llanilishi kerak.
3. **Sinxronizatsiyani hisobga olmaslik:** Taqsimlangan bazalarda CAP teoremasini unutish. Consistency (Ma'lumotlar bir xilligi) va Availability (Mavjudlik) o'rtasida to'g'ri balansni tanlay olmaslik.

---

## 5. 💬 12 ta Intervyu Savollari

**1. High Availability (HA) nima?**
Tizimning uzoq vaqt davomida (99.99% va undan yuqori) minimal to'xtashlar bilan foydalanuvchilarga xizmat ko'rsatish qobiliyati.

**2. Fault Tolerance (Xatoga chidamlilik) nima va u HA dan nimasi bilan farq qiladi?**
Fault Tolerance tizimda biron qism ishdan chiqqanda xizmatda zarracha uzilish va ma'lumot yo'qolishiga yo'l qo'ymaydi (zero downtime). HA esa tezda avtomatik tiklanishni ta'minlaydi, biroz kechikish bo'lishi mumkin.

**3. Latency va Throughput farqi nimada?**
Latency (kechikish) — bitta so'rovning boshlanishidan tugashigacha ketgan vaqt (ms). Throughput (o'tkazish qobiliyati) — vaqt birligi ichida tizim bajara olgan umumiy so'rovlar soni (masalan, RPS - Requests Per Second).

**4. Circuit Breaker patterni nima?**
Kaskadli buzilishlarning oldini olish mexanizmi. Agarda biron mikroxizmat ko'p xato berayotgan bo'lsa, tizim unga so'rov yuborishni vaqtincha to'xtatadi va foydalanuvchiga darhol xatolik yoki default javob qaytaradi.

**5. CAP teoremasi nima?**
Taqsimlangan tizimda bir vaqtning o'zida quyidagi uchtadan faqat ikkitasini ta'minlash mumkinligi haqidagi qoida: Consistency (Bir xillik), Availability (Mavjudlik), Partition Tolerance (Tarmoq uzilishlariga bardoshlilik).

**6. Observability (Kuzatuvchanlik) 3 ta asosiy ustuni qaysilar?**
Metrics (Metrikalar - CPU, RAM, RPS), Logs (Tizim voqealari yozuvlari), Traces (So'rovning zanjir bo'ylab o'tish yo'li).

**7. Rate Limiting va Load Shedding farqi nimada?**
Rate Limiting bitta foydalanuvchini jazolaydi (limitdan oshsa bloklaydi). Load Shedding esa server haddan tashqari qizib ketganda, tizim o'zini qutqarish uchun past ustuvorlikdagi barcha so'rovlarni rad etadi.

**8. Graceful Degradation nima?**
Tizimning biron qismi buzilganda butunlay qulamasdan, muhim bo'lmagan funksiyalarni o'chirib, asosiy xizmatlarni saqlab qolishi (masalan, tavsiyalar tizimi ishlamasa ham to'lov sahifasi ishlashi).

**9. Prometheus va Grafana nima vazifani bajaradi?**
Prometheus tizim metrikalarini yig'adi va saqlaydi (Time-series DB). Grafana esa bu metrikalarni chiroyli grafiklar shaklida ko'rsatib beradi (Dashboard).

**10. Redundancy (Zaxiralash) nima uchun kerak?**
Yagona qulash nuqtalarini (SPOF) yo'qotish uchun serverlar, ma'lumotlar va tarmoq kanallarining nusxalarini (zaxiralarini) yaratish.

**11. Distributed Consensus nima?**
Bir nechta mustaqil serverlarning ma'lum bir qiymat yoki tranzaksiya holati bo'yicha yagona qarorga kelishi (Raft/Paxos algoritmlari yordamida).

**12. SLA (Service Level Agreement) nima?**
Xizmat ko'rsatuvchi va mijoz o'rtasidagi rasmiy kelishuv bo'lib, unda tizimning ishlash sifati va mavjudlik kafolatlari (masalan, 99.9% uptime) belgilab qo'yiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni exercises qismida bajarib, Retry va Latency ustida ishlang.

---

## 7. 📝 12 ta Mini Test

Testlarni yechib bilimingizni mustahkamlang.

---

## 8. 🎯 Real Project Case Study

### Chaos Engineering (Netflix Chaos Monkey)
Netflix o'z tizimlarining xatoga chidamliligini sinash uchun real ishchi (production) muhitda serverlarni tasodifiy o'chirib qo'yadigan maxsus "Chaos Monkey" dasturini yaratgan. Bu dasturchilarni har doim har qanday server qulashiga tayyor holda kod yozishga majbur qiladi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    User[Foydalanuvchi] -->|So'rov| LB[Load Balancer]
    LB -->|Normal| App1[App Server 1 - Active]
    LB -->|Normal| App2[App Server 2 - Active]
    LB -.->|Zaxira| App3[App Server 3 - Standby/Backup]
    
    App1 --> DB1[(Primary DB)]
    App2 --> DB1
    DB1 -->|Replication| DB2[(Secondary DB - Replica)]
    
    style App3 stroke-dasharray: 5 5
    style DB2 stroke-dasharray: 5 5
\`\`\`

---

## 10. 📌 Cheat Sheet

| Xususiyat | Maqsadi | O'lchov birligi |
| :--- | :--- | :--- |
| **Availability** | Tizimning ishchi holatda bo'lishi | Foiz (%) masalan, 99.99% |
| **Latency** | Javob qaytish tezligi | Millisekundlar (ms) |
| **Throughput** | Tizim quvvati | RPS (Requests Per Second) |
| **Fault Tolerance** | Xatolarga bardoshlilik | Downtime darajasi (Mutlaq chidamlilikda 0 downtime) |
`,
  exercises: [
    {
      id: 1,
      title: "Uptime Foizini hisoblash",
      instruction: "Berilgan yillik downtime (ishlamay qolgan vaqt soniyalarda) qiymati bo'yicha tizimning yillik Availability foizini hisoblab qaytaradigan `calculateAvailability(downtimeSeconds)` funksiyasini yozing. (Bir yil = 365 kun, 1 kun = 86400 soniya). Natija foiz ko'rinishida 3 ta xonali kasr aniqligida qaytsin (masalan, `99.900`).",
      startingCode: "function calculateAvailability(downtimeSeconds) {\n  const secondsInYear = 365 * 86400;\n  // Availability foizini hisoblang\n}",
      hint: "((secondsInYear - downtimeSeconds) / secondsInYear * 100).toFixed(3) orqali hisoblang.",
      test: "if (typeof calculateAvailability !== 'function') return 'calculateAvailability topilmadi'; if (calculateAvailability(31536) !== '99.900') return 'Downtime foizi xato hisoblandi'; if (calculateAvailability(0) !== '100.000') return '100% holati noto\\'g\\'ri'; return null;"
    },
    {
      id: 2,
      title: "Throughput (RPS) hisoblagich",
      instruction: "Ma'lum bir vaqt oralig'ida (millisekundlarda) kelgan umumiy so'rovlar soni bo'yicha soniyadagi o'rtacha so'rovlar sonini (RPS) butun son shaklida (pastga qarab yaxlitlangan) qaytaruvchi `calculateRPS(totalRequests, durationMs)` funksiyasini yozing.",
      startingCode: "function calculateRPS(totalRequests, durationMs) {\n  // RPSni hisoblang\n}",
      hint: "Math.floor((totalRequests / durationMs) * 1000) dan foydalaning.",
      test: "if (typeof calculateRPS !== 'function') return 'calculateRPS topilmadi'; if (calculateRPS(5000, 2000) !== 2500) return 'RPS noto\\'g\\'ri'; if (calculateRPS(10, 500) !== 20) return 'Kichik vaqt xato'; return null;"
    },
    {
      id: 3,
      title: "SLA darajasini aniqlash",
      instruction: "Uptime foiziga qarab xizmat darajasini (SLA) qaytaruvchi `getSLALevel(uptimePercent)` funksiyasini yozing. Agar 99.999% va undan yuqori bo'lsa `EXCELLENT`, 99.9% dan yuqori bo'lsa `GOOD`, aks holda `POOR` qaytarsin.",
      startingCode: "function getSLALevel(uptimePercent) {\n  // SLA darajasini qaytaring\n}",
      hint: "if shartlari orqali qiymatlarni solishtiring.",
      test: "if (typeof getSLALevel !== 'function') return 'getSLALevel topilmadi'; if (getSLALevel(99.999) !== 'EXCELLENT') return '99.999 xato'; if (getSLALevel(99.95) !== 'GOOD') return '99.95 xato'; if (getSLALevel(99.8) !== 'POOR') return '99.8 xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Tizimli dizaynda 'Scalability' (Kengayuvchanlik) nima?",
      options: [
        "Tizimning dizaynini o'zgartirish qobiliyati",
        "Tizim yuklamasi oshganda uning resurslarni qo'shish orqali yuklamani ko'tara olish qobiliyati",
        "Serverlarni butunlay o'chirish tezligi",
        "Ma'lumotlar bazasini shifrlash usuli"
      ],
      correctAnswer: 1,
      explanation: "Scalability — tizimning so'rovlar yoki ma'lumotlar hajmi oshganda ishlash qobiliyatini saqlab qolgan holda kengaya olishidir."
    },
    {
      id: 2,
      question: "Tizimning yillik Availability darajasida 'Five Nines' (99.999%) nimani anglatadi?",
      options: [
        "Yiliga maksimal 5 ta xato bo'lishini",
        "Tizimning yil davomida deyarli uzilishsiz ishlab, jami downtime (ishlamay qolgan vaqt) yiliga 5 daqiqadan oshmasligini",
        "Saytning atigi 5 daqiqa ochiq bo'lishini",
        "Baza hajmi 99.999 GB bo'lishini"
      ],
      correctAnswer: 1,
      explanation: "99.999% uptime juda yuqori mavjudlik hisoblanadi va yiliga jami downtime 5.26 daqiqadan oshmasligini anglatadi."
    },
    {
      id: 3,
      question: "Latency (kechikish) nima?",
      options: [
        "Serverning jismoniy og'irligi",
        "So'rov yuborilgan vaqtdan boshlab unga javob olingan vaqtgacha o'tgan davr (ms)",
        "Soniyadagi so'rovlar soni",
        "Sessiyaning yopilish vaqti"
      ],
      correctAnswer: 1,
      explanation: "Latency — bu tarmoqda ma'lumot uzatish va unga javob olish orasidagi ketgan kechikish vaqtidir."
    },
    {
      id: 4,
      question: "Fault Tolerance (Xatoga chidamlilik) tizim loyihalashda nima uchun kerak?",
      options: [
        "Sayt dizaynini chiroyli qilish uchun",
        "Uskunalar yoki tarmoq tizimlari ishdan chiqqanda ham tizimning to'liq ishlashda davom etishini ta'minlash uchun",
        "Foydalanuvchilarni bloklash uchun",
        "SQL bazalarini o'chirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Fault Tolerance tizimdagi biron komponent (masalan, server yoki disk) buzilganda uzilishlarsiz ishlashni davom ettirishdir."
    },
    {
      id: 5,
      question: "Kaskadli buzilishlar (Cascading Failures) qanday sodir bo'ladi?",
      options: [
        "Barcha foydalanuvchilar bir vaqtda logout qilganda",
        "Bitta serverning ishdan chiqishi qolgan serverlarga haddan tashqari yuklama tushishiga va ularning ham navbatma-navbat buzilishiga olib kelganda",
        "HTML kodi noto'g'ri yozilganda",
        "DNS kesh tozalanganda"
      ],
      correctAnswer: 1,
      explanation: "Cascading failure - zanjirsimon qulash bo'lib, unda bitta servisning to'xtashi zanjirdagi boshqa hamma tizimlarni ketma-ket qulatadi."
    },
    {
      id: 6,
      question: "Circuit Breaker patterni qanday muammoni hal qiladi?",
      options: [
        "Parollarni shifrlashni",
        "Buzilgan yoki sekin ishlayotgan mikroxizmatga so'rov yuborishni vaqtincha to'xtatib, kaskadli buzilishlarning oldini oladi",
        "Saytning rangini o'zgartiradi",
        "Internet tezligini oshiradi"
      ],
      correctAnswer: 1,
      explanation: "Circuit Breaker zaif servisni zanjirdan vaqtincha ajratib turib, unga yuklama tushishini to'xtatadi va qolgan tizimlarni himoyalaydi."
    },
    {
      id: 7,
      question: "Throughput deganda nima tushuniladi?",
      options: [
        "Ma'lumotlarning shifrlanish darajasi",
        "Tizimning vaqt birligi ichida bajara oladigan operatsiyalar yoki so'rovlar (RPS) hajmi",
        "Serverning jismoniy xotira sig'imi",
        "Kodni yuklash tezligi"
      ],
      correctAnswer: 1,
      explanation: "Throughput (o'tkazish quvvati) tizim ma'lum vaqt oralig'ida qancha so'rovni qayta ishlay olishidir."
    },
    {
      id: 8,
      question: "Observability tizimida 'Trace' nima vazifani bajaradi?",
      options: [
        "Saytdagi xatolarni o'chirish",
        "Bitta foydalanuvchi so'rovining ko'plab mikroxizmatlar bo'ylab o'tish yo'li va vaqtini kuzatish",
        "Baza hajmini o'lchash",
        "IP-manzilni shifrlash"
      ],
      correctAnswer: 1,
      explanation: "Distributed Tracing (masalan, Jaeger) so'rovning boshidan oxirigacha qaysi mikroxizmatlarda qancha vaqt qolganini kuzatish imkonini beradi."
    },
    {
      id: 9,
      question: "Redundancy (Zaxiralash) printsipi nima uchun ishlatiladi?",
      options: [
        "Kodni qisqartirish uchun",
        "Yagona qulash nuqtalarini (SPOF) yo'qotish uchun har bir tizimning zaxira nusxalarini yaratish",
        "Barcha xatolarni yashirish uchun",
        "Faqat rasmlarni saqlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Zaxiralash (redundancy) bitta server yoki baza qulaganda uning o'rniga zaxiradagisi darhol ishga tushishini ta'minlash uchun zarur."
    },
    {
      id: 10,
      question: "Taqsimlangan tizimda 'Graceful Degradation' deganda nima tushuniladi?",
      options: [
        "Tizimning butunlay o'chib qolishi",
        "Tizimning og'ir holatda yoki ba'zi qismlari buzilganda asosiy/muhim funksiyalarini saqlab qolgan holda ishlashni davom ettirishi",
        "Suhbat chog'ida xatoliklarni aytmaslik",
        "Ma'lumotlar bazasini formatlash"
      ],
      correctAnswer: 1,
      explanation: "Graceful degradation - tizim qismlari buzilganda butunlay o'chmasdan, ikkinchi darajali funksiyalarni cheklab bo'lsa ham foydalanuvchiga xizmat ko'rsatishda davom etishidir."
    },
    {
      id: 11,
      question: "Prometheus nima?",
      options: [
        "Frontend dizayn frameworki",
        "Tizim metrikalarini yig'ish va ogohlantirishlar (alerts) jo'natish uchun ishlatiladigan monitoring vositasi",
        "Avtomatik test yozadigan dastur",
        "Ma'lumotlar bazasini boshqarish tizimi"
      ],
      correctAnswer: 1,
      explanation: "Prometheus vaqtinchalik (Time-series) ma'lumotlar yig'ib, tizim holatini doimiy nazorat qiladigan mashhur monitoring tizimidir."
    },
    {
      id: 12,
      question: "Chaos Engineering nima?",
      options: [
        "Xatolarni yashirish usuli",
        "Production muhitida kutilmagan buzilishlarni (chaos) ataylab sodir etish orqali tizimning chidamliligini sinash amaliyoti",
        "Kodni tartibsiz yozish",
        "Serverlarni buzib o'g'irlik qilish"
      ],
      correctAnswer: 1,
      explanation: "Chaos Engineering kutilmagan qulashlarga tizim qanchalik tayyorligini bilish uchun ataylab nosozliklar keltirib chiqarish orqali sinov o'tkazishdir."
    }
  ]
};

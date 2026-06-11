export const loadBalancingAlgorithms = {
  id: "loadBalancingAlgorithms",
  title: "Yuk Taqsimlash Algoritmlari (Load Balancing Algorithms)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

**Yuk taqsimlovchi (Load Balancer)** — bu tarmoq trafigini backend serverlar o'rtasida taqsimlovchi "yo'l politsiyachisi" yoki "supermarket navbat boshqaruvchisi". Agar supermarketda 5 ta kassa bo'lsa va xaridorlarning hammasi faqat 1-kassaga borsa, u yerda tirbandlik yuzaga keladi, qolgan 4 ta kassa esa bo'sh turadi. Load Balancer kelayotgan xaridorlarni kassalarga teng yo'naltiradi.

**Yuk taqsimlash algoritmi** esa — ushbu yo'naltirish qoidasidir:
- **Round Robin (Navbatma-navbat):** Xaridorlarni ketma-ket 1, 2, 3, 4, 5-kassalarga navbatma-navbat yuborish.
- **Least Connections (Eng bo'sh kassa):** Ayni paytda eng kam odam turgan (eng kam faol ulanishga ega) kassaga yo'naltirish.
- **IP Hash (Doimiy kassa):** Sizning yuzingizga (IP manzilingizga) qarab har doim bir xil kassaga yuborish (sessiya saqlash uchun).

---

## 2. 💻 Real Kod Misollari

Quyida **Round Robin** va **IP Hash** yuk taqsimlash algoritmlarining soddalashtirilgan JavaScript realizatsiyasi keltirilgan:

\`\`\`javascript
const servers = ["Server_A", "Server_B", "Server_C"];

// 1. Round Robin: So'rov indeksiga qarab aylanma tartibda tanlash
function getRoundRobin(requestIndex) {
  const index = requestIndex % servers.length;
  return servers[index];
}

// 2. IP Hash: IP manzildan hash olib, har doim bir xil serverga yo'naltirish
function getIPHash(ipAddress) {
  let hash = 0;
  for (let i = 0; i < ipAddress.length; i++) {
    hash += ipAddress.charCodeAt(i);
  }
  const index = hash % servers.length;
  return servers[index];
}

console.log(getRoundRobin(0)); // Server_A
console.log(getRoundRobin(1)); // Server_B
console.log(getIPHash("192.168.1.15")); // Doim bir xil server qaytadi
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Eng mashhur yuk taqsimlash algoritmlari quyidagilardir:

### 1. Round Robin (Siklik taqsimot)
So'rovlarni serverlar ro'yxati bo'yicha ketma-ket aylanma yo'naltiradi.
- **Pros:** Oddiy, serverlar kuchi teng bo'lsa yaxshi ishlaydi.
- **Cons:** Server yuklamasini (CPU/RAM) hisobga olmaydi.

![Round Robin](/roundrobin.gif)

### 2. Least Connections (Eng kam ulanishlar)
Yangi so'rovni ayni damda eng kam faol ulanishlar (active connections) soniga ega serverga yuboradi.
- **Pros:** Dinamik, yuklama notekis tarqalgan har xil quvvatli tizimlarda juda unumli.
- **Cons:** Ulanishlar holatini doimiy kuzatib turish sababli qo'shimcha resurs (overhead) talab qiladi.

![Least Connections](/last connections.gif)

### 3. Weighted Round Robin
Serverlarga ularning quvvatiga qarab vazn (weight) beriladi. Masalan, 16 GB RAM-li server vazni 4, 4 GB RAM-li server vazni 1. Kuchli server 4 barobar ko'p so'rov qabul qiladi.

![Weighted Round Robin](/weighted round robin.gif)

### 4. Weighted Least Connections
Dinamik Least Connections algoritmini vazn (weight) bilan birlashtiradi. Serverlar quvvati hamda ayni damdagi yuklamasini parallel tekshiradi.

![Weighted Least Connections](/weighted least connections.gif)

### 5. IP Hash (IP bo'yicha bog'lash)
Foydalanuvchining IP manzilini hashlab, muayyan serverga bog'lab qo'yadi (Session Persistence).
- **Pros:** Stateful ilovalarda foydalanuvchi sessiyasini saqlashni osonlashtiradi.
- **Cons:** Agar ko'p foydalanuvchilar bitta proxy orqali (masalan, bitta ofisdan) kelsa, bitta server haddan tashqari yuklanib ketishi mumkin.

![IP Hash](/iphash.gif)

### 6. Least Response Time (Eng tezkor javob vaqti)
So'rovni oxirgi davrdagi eng tez javob bergan (eng past latency-ga ega) va faol ulanishlari kam serverga yo'naltiradi.

![Least Response Time](/response time.gif)

### 7. Least Bandwidth (Eng kam tarmoq trafigi)
Ayni vaqtda eng kam tarmoq trafigini (bandwidth) sarflayotgan serverga so'rov yo'naltiradi. Katta hajmli yuklanishlar (streaming/downloads) uchun ajoyib.

![Least Bandwidth](/least bandwith.gif)

### 8. Random (Tasodifiy)
So'rovlarni serverlarga mutlaqo tasodifiy ravishda yo'naltiradi.
- **Pros:** Oddiy, hech qanday holat monitoringini talab qilmaydi.
- **Cons:** Qisqa muddatda yuklama notekis taqsimlanishi xavfi bor.

![Random](/random.gif)

### 9. Custom Load (Maxsus yuklama algoritmi)
Serverlardagi CPU, xotira yoki disk I/O ko'rsatkichlarini real vaqtda monitoring qilib, yukni eng bo'sh serverga yo'naltirish qoidasi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Stateful ilovalar uchun Round Robin tanlash:** Agar foydalanuvchi sessiya ma'lumotlari server xotirasida (RAM) saqlansa va Round Robin uni keyingi safar boshqa serverga yuborsa, sessiya yo'qoladi. Bunday holda IP Hash yoki stateless JWT ishlatish kerak.
2. **Har xil quvvatli serverlarga oddiy Round Robin qo'llash:** Kuchli va zaif serverlarga bir xil yuk yuborish zaif serverlarning tezda qulashiga olib keladi. Bunga **Weighted Round Robin** to'g'ri keladi.
3. **Kesh tozalanishi (Cache stampede) xavfini inobatga olmaslik:** Serverlar soni o'zgarganda IP Hash mapping buzilishi natijasida kesh keskin tozalanishi (cache miss) yuzaga keladi. Buni tuzatish uchun **Consistent Hashing** algoritmidan foydalaniladi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Load Balancer algoritmlarining asosiy vazifasi nima?**
Mavjud server resurslaridan samarali foydalanish, serverlarning ortiqcha yuklanishini oldini olish va yuqori uptime-ni ta'minlash.

**2. Round Robin qachon eng yaxshi tanlov bo'ladi?**
Barcha serverlar quvvati teng (homogeneous) va dastur stateless (sessiyasiz) bo'lgan sharoitda.

**3. Least Connections algoritmi nima uchun real hayotda ko'p ishlatiladi?**
Chunki so'rovlar bajarilish muddati har xil bo'lib, ulanishlar soniga qarab yukni dinamik va adolatli taqsimlash imkonini beradi.

**4. Weighted Round Robin qanday ishlaydi?**
Serverning protsessor va xotira kuchi darajasiga qarab belgilangan ko'paytiruvchi (vazn) orqali so'rovlar yukini taqsimlaydi.

**5. IP Hash algoritmining eng muhim afzalligi nima?**
Session persistence (sessiyani muayyan serverga bog'lab qo'yish) imkoniyatini taqdim etishi.

**6. IP Hash-ning qanday jiddiy kamchiligi bor?**
Serverlar soni o'zgarsa (kengaysa yoki kamaysa) hash natijalari butunlay o'zgaradi va foydalanuvchilar boshqa serverlarga qayta yo'naltiriladi.

**7. Consistent Hashing nima va u IP Hash kamchiligini qanday tuzatadi?**
Consistent Hashing serverlar soni o'zgarganda faqat minimal miqdordagi kalitlar/foydalanuvchilar yo'nalishini o'zgartiradi va kesh qulashining oldini oladi.

**8. Least Response Time qanday ishlaydi?**
Real vaqt rejimida serverlarning latency (ping/javob berish vaqti) monitoring qilinadi va so'rov eng tez javob qaytargan serverga uzatiladi.

**9. Random yuk taqsimlash qachon qo'llaniladi?**
Tizim sodda bo'lib, serverlar kuchi bir xil va yuklama monitoringiga ehtiyoj bo'lmaganda.

**10. Least Bandwidth algoritmi qanday xizmatlarda afzal ko'riladi?**
Video translatsiyalar (streaming), fayl ko'chirish kabi tarmoq yuklamasi juda baland bo'lgan tizimlarda.

**11. API Gateway va Load Balancer farqi nima?**
Load Balancer faqat trafikni taqsimlaydi (L4/L7 darajada). API Gateway esa qo'shimcha ravishda avtorizatsiya, rate limiting, routing va so'rovlarni o'zgartirish kabi vazifalarni bajaradi.

**12. Health Check yuk taqsimlashda nega muhim?**
Serverlardan biri ishdan chiqqanida yuk taqsimlovchi buni aniqlab, nosoz serverga trafik yuborishni to'xtatishi (failover) uchun.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlarni quyidagi exercises bo'limida bajarib ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali algoritmlarni qanchalik tushunganingizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### Case Study: Live Chat Session Persistence
- **Muammo:** Chat ilovasida mijozlar WebSocket ulanishi orqali server bilan doimiy bog'langan bo'ladi. Oddiy Round Robin ishlatilsa, foydalanuvchi har safar sahifani yangilaganida boshqa serverga ulanadi va chat tarixi qayta yuklanishi kerak bo'ladi.
- **Yechim:** Load Balancer darajasida **IP Hash** yoki cookie-ga asoslangan **Session Affinity (Sticky Sessions)** sozlanadi. Natijada brauzer har doim aynan o'sha WebSocket serveriga ulanadi va tarmoq trafigi tejaladi.

---

## 9. 🧠 Vizual ko'rinish (Load Balancing Selection Flow)

\`\`\`mermaid
graph TD
    Client[Yangi So'rov] --> LB[Load Balancer]
    LB --> Stateful{Stateful ilovami?}
    Stateful -->|Ha: Sessiya kerak| IPHash[IP Hash / Sticky Sessions]
    Stateful -->|Yo'q: Stateless| ServerPower{Serverlar kuchi bir xilmi?}
    ServerPower -->|Ha| RoundRobin[Round Robin / Least Connections]
    ServerPower -->|Yo'q| Weighted[Weighted Round Robin / Weighted Least Conn]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Algoritm | Asosiy mezon | Eng yaxshi foydalanish holati | Kamchiligi |
| :--- | :--- | :--- | :--- |
| **Round Robin** | Ketma-ketlik | Bir xil quvvatli stateless serverlar | Yuklamani bilmaydi |
| **Least Connections** | Ulanishlar soni | Uzun va har xil so'rovlar | monitoring yuklamasi |
| **Weighted WRR** | Quvvat (Vazn) | Har xil quvvatli serverlar clusters | Qo'lda sozlash talab etadi |
| **IP Hash** | IP manzil hashi | Sticky sessions / Stateful ilovalar | Yuklama notekis taqsimlanishi |
`,
  exercises: [
    {
      id: 1,
      title: "Round Robin taqsimotini hisoblash",
      instruction: "Navbatdagi so'rov tartib raqami (`requestIndex`) va serverlar massivi (`servers`) berilgan. Round Robin qoidasiga ko'ra so'rov yo'naltiriladigan server nomini qaytaruvchi `getRoundRobinServer(requestIndex, servers)` funksiyasini yozing.",
      startingCode: "function getRoundRobinServer(requestIndex, servers) {\n  // Kodni yozing\n}",
      hint: "requestIndex % servers.length formulasidan foydalanib, serverni oling.",
      test: "if (typeof getRoundRobinServer !== 'function') return 'getRoundRobinServer topilmadi'; const srvs = ['S1', 'S2', 'S3']; if(getRoundRobinServer(0, srvs) !== 'S1') return '0-indeks xato'; if(getRoundRobinServer(4, srvs) !== 'S2') return '4-indeks xato'; return null;"
    },
    {
      id: 2,
      title: "Eng kam faol ulanishli serverni topish",
      instruction: "Serverlar ro'yxati ob'ektlar massivi ko'rinishida berilgan (masalan: `[{ name: 'A', activeConnections: 12 }, { name: 'B', activeConnections: 4 }]`). Eng kam ulanishga ega bo'lgan server nomini (name) qaytaruvchi `getLeastConnectionsServer(servers)` funksiyasini yozing.",
      startingCode: "function getLeastConnectionsServer(servers) {\n  // Kodni yozing\n}",
      hint: "Massiv elementlarini activeConnections bo'yicha eng kichigini qidirib toping.",
      test: "if (typeof getLeastConnectionsServer !== 'function') return 'getLeastConnectionsServer topilmadi'; const list = [{name: 'S1', activeConnections: 15}, {name: 'S2', activeConnections: 3}, {name: 'S3', activeConnections: 8}]; if(getLeastConnectionsServer(list) !== 'S2') return 'Hisoblash xato'; return null;"
    },
    {
      id: 3,
      title: "IP Hash tanlovini simulyatsiya qilish",
      instruction: "Foydalanuvchi IP manzili (`ipAddress` string) va serverlar ro'yxati (`servers` massiv) berilgan. IP manzilining har bir belgisining ASCII kodlari yig'indisini hisoblang, so'ngra ushbu yig'indining `servers.length` ga bo'lingandagi qoldig'i bo'yicha serverni aniqlang va uni qaytaring.",
      startingCode: "function getIPHashServer(ipAddress, servers) {\n  // Kodni yozing\n}",
      hint: "for siklidan foydalanib ipAddress.charCodeAt(i) yordamida yig'indini oling va qoldiq bo'yicha servers massividan serverni qaytaring.",
      test: "if (typeof getIPHashServer !== 'function') return 'getIPHashServer topilmadi'; const s = ['Server1', 'Server2']; if(getIPHashServer('127.0.0.1', s) !== 'Server2') return '127.0.0.1 uchun xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 0,
      question: "Load Balancing (Yuk taqsimlash) algoritmlarining eng asosiy maqsadi nima?",
      options: [
        "Foydalanuvchi parollarini bazada shifrlash",
        "Kelayotgan tarmoq trafigini barcha serverlar o'rtasida teng taqsimlab, ortiqcha yuklanish va qulashlarning oldini olish",
        "CSS fayllarini siqib brauzerga jo'natish",
        "Faqat serverlar sonini ko'paytirish"
      ],
      correctAnswer: 1,
      explanation: "Yuk taqsimlash algoritmlari bitta server yuklama ostida qolib ketmasligini ta'minlash uchun xizmat qiladi."
    },
    {
      id: 1,
      question: "Round Robin algoritmining ishlash tamoyili qanday?",
      options: [
        "So'rovlarni tasodifiy ravishda serverlarga yuboradi",
        "So'rovlarni belgilangan aylanma tartibda navbatma-navbat serverlarga tarqatadi",
        "Faqat eng kuchli serverga yuklama jo'natadi",
        "IP manzilga qarab server tanlaydi"
      ],
      correctAnswer: 1,
      explanation: "Round Robin so'rovlarni aylanma (cyclic) tartibda ketma-ketlikda (1, 2, 3, keyin yana 1) taqsimlaydi."
    },
    {
      id: 2,
      question: "Round Robin algoritmining eng katta kamchiligi nimada?",
      options: [
        "Implementatsiya qilish juda murakkab",
        "Server yuklamasini va ayni damdagi holatini (CPU, connections) umuman hisobga olmaydi (No Load Awareness)",
        "Sessiyalarni juda yaxshi eslab qoladi",
        "Faqat bitta serverda ishlay oladi"
      ],
      correctAnswer: 1,
      explanation: "Round Robin serverlarning bandligidan qat'i nazar, barcha serverlarga bir xil so'rov yuboraveradi."
    },
    {
      id: 3,
      question: "Least Connections algoritmining afzalligi nimada?",
      options: [
        "U hech qanday holatni (state) saqlamaydi",
        "Yangi so'rovni ayni paytda eng kam faol ulanishlar soniga ega serverga yo'naltiradi, bu esa yukni adolatli taqsimlaydi",
        "Faqat bir xil IP-lardan kelgan so'rovlarni qabul qiladi",
        "Round Robin-dan soddaroq"
      ],
      correctAnswer: 1,
      explanation: "Least Connections dinamik bo'lib, ayni daqiqada eng bo'sh turgan serverni tanlaydi."
    },
    {
      id: 4,
      question: "Weighted Round Robin algoritmi qachon tavsiya etiladi?",
      options: [
        "Faqat bitta server borligida",
        "Klassdagi backend serverlar quvvati turlicha bo'lganda (Heterogeneous environment)",
        "Tarmoq tezligi sekinlashganda",
        "DDoS hujumi boshlanganda"
      ],
      correctAnswer: 1,
      explanation: "Weighted Round Robin kuchli serverlarga kattaroq vazn berib, ularga ko'proq yuk yuborish imkonini beradi."
    },
    {
      id: 5,
      question: "Stateful ilovalarda foydalanuvchi sessiyasini saqlash uchun qaysi algoritm mos keladi?",
      options: [
        "Round Robin",
        "IP Hash",
        "Random",
        "Least Connections"
      ],
      correctAnswer: 1,
      explanation: "IP Hash foydalanuvchi IP manzilini hashlab, uni har doim bitta serverga yo'naltiradi, natijada sessiya uzilib qolmaydi (Session Persistence)."
    },
    {
      id: 6,
      question: "IP Hash algoritmining qanday kamchiligi bor?",
      options: [
        "U juda sekin ishlaydi",
        "Tizimga yangi server qo'shilsa yoki o'chirilsa, butun hash xaritasi o'zgarib ketishi mumkin",
        "Faqat mobil qurilmalarda ishlaydi",
        "Sessiyalarni saqlay olmaydi"
      ],
      correctAnswer: 1,
      explanation: "Serverlar soni o'zgarishi bilan hash natijasi o'zgaradi va foydalanuvchilar boshqa serverlarga o'tib ketadi."
    },
    {
      id: 7,
      question: "Consistent Hashing qaysi muammoni hal qiladi?",
      options: [
        "Parollarni shifrlashni",
        "Serverlar soni o'zgarganda kalitlar va sessiyalarning keskin buzilib, qayta taqsimlanish xavfini kamaytiradi",
        "Faqat SQL bazalarni tezlashtiradi",
        "Round Robin tezligini oshiradi"
      ],
      correctAnswer: 1,
      explanation: "Consistent Hashing orqali server qo'shilsa/o'chirilsa ham minimal miqdordagi foydalanuvchigina kesh/sessiyadan mahrum bo'ladi."
    },
    {
      id: 8,
      question: "Least Response Time algoritmining mezoni nima?",
      options: [
        "Serverdagi fayllar soni",
        "Serverning javob qaytarish tezligi (Latency) va faol ulanishlarining minimal darajasi",
        "Serverning jismoniy joylashuvi",
        "Tasodifiy sonlar generatsiyasi"
      ],
      correctAnswer: 1,
      explanation: "Least Response Time eng tezkor javob berayotgan serverni topib, unga yuklama yuboradi."
    },
    {
      id: 9,
      question: "Least Bandwidth algoritmi qanday ishlaydi?",
      options: [
        "CPU yuklamasi eng past serverni tanlaydi",
        "Ayni vaqtda eng kam tarmoq trafigini (bandwidth) sarflayotgan serverga so'rov yo'naltiradi",
        "Faqat Wi-Fi orqali ulanadi",
        "Faqat matnli xabarlarni cheklaydi"
      ],
      correctAnswer: 1,
      explanation: "Least Bandwidth algoritmi tarmoq kanali eng kam yuklangan serverni tanlash orqali katta hajmli fayllarni taqsimlaydi."
    },
    {
      id: 10,
      question: "Serverlar butunlay sog'lom ekanligini yuk taqsimlovchi qanday aniqlaydi?",
      options: [
        "Faqat foydalanuvchilar shikoyatiga ko'ra",
        "Doimiy ravishda serverlarga ping yoki HTTP so'rovlar yuborish (Health Checks) orqali",
        "Bazani tekshirish orqali",
        "Bu imkonsiz"
      ],
      correctAnswer: 1,
      explanation: "Health checks yordamida Load Balancer nosoz serverlarni ro'yxatdan o'chirib, yukni sog'lom serverlarga yo'naltiradi."
    },
    {
      id: 11,
      question: "Custom Load algoritmining boshqa algoritmlardan asosiy farqi nimada?",
      options: [
        "Faqat tasodifiy yo'naltirish bilan ishlashi",
        "Muayyan dastur ehtiyojiga qarab CPU, xotira va maxsus ko'rsatkichlar kombinatsiyasidan iborat o'z qoidalarini aniqlash imkoni",
        "Faqat Nginx tizimlarida ishlashi",
        "U hech qanday monitoring talab qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Custom Load nomzodga yoki tashkilotga o'z monitoring ko'rsatkichlari (CPU/RAM/IO) asosida yuk taqsimlash qoidasini yaratish erkinligini beradi."
    }
  ]
};

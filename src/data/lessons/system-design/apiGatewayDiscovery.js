export const apiGatewayDiscovery = {
  id: "apiGatewayDiscovery",
  title: "API Gateway va Service Discovery",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### API Gateway va Service Discovery nima?
* **API Gateway:** Tizimingizning kirish eshigi. U barcha tashqi mijozlar so'rovlarini qabul qilib, ularni ichki mikroxizmatlarga (microservices) to'g'ri yo'naltiruvchi, xavfsizlik va nazoratni boshqaruvchi markaziy tugundir.
* **Service Registry:** Barcha ishlayotgan xizmat nusxalarining (service instances) joriy IP manzillari va portlari saqlanadigan ma'lumotlar bazasi (telefon kitobchasi).
* **Service Discovery:** Mikroxizmatlar dinamik ravishda kengayganda (scale up/down) yoki IP manzili o'zgarganda, ularning joriy joylashuvini avtomatik ravishda aniqlash mexanizmi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **yirik mehmonxonaga** keldingiz:
* **API Gateway (Resepshn):** Mehmonxonaga kirganingizda, resepshn sizni kutib oladi. Siz xonangizning raqamini bilishingiz yoki oshxona, basseyn qayerdaligini qidirishingiz shart emas. Siz resepshndan "Taom yemoqchiman" deb so'raysiz, u esa sizni restoran tomon yo'naltiradi. Shuningdek, resepshn sizning shaxsingizni tekshiradi (Authentication) va juda ko'p yuk bilan kelganingizda yordam beradi.
* **Service Registry (Xonalar xaritasi / Telefon daftarchasi):** Restoran xonasi o'zgarishi, basseyn vaqtinchalik yopilishi yoki yangi xizmatlar qo'shilishi mumkin. Resepshn stolida qaysi xizmat qaysi xonada joylashganligi va ularning telefon raqamlari yozilgan dinamik ro'yxat (Service Registry) bo'ladi.
* **Service Discovery (Dinamik qidiruv):** Agar 3-xonadagi restoran band bo'lsa yoki buzilgan bo'lsa, resepnshn ro'yxatdan boshqa ochiq bo'lgan 5-xonadagi restoranning manzilini tezda bilib oladi (Service Discovery) va sizni o'sha yerga jo'natadi.

---

## 2. 💻 Real Kod Misollari

### 1. API Gateway marshrutlash (Routing) va Dynamic Proxy (Express + Axios)
Mijoz so'rovlarini dinamik ravishda mos keluvchi ichki xizmatlarga yo'naltirish:

\`\`\`javascript
import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Dinamik yo'nalishlar xaritasi (Routing Table)
const routingTable = {
  '/users': 'http://10.0.1.5:4001',
  '/orders': 'http://10.0.1.8:4002',
  '/payments': 'http://10.0.1.12:4003'
};

// Har qanday so'rovni qabul qilib, yo'naltirish
app.all('/api/*', async (req, res) => {
  const path = req.params[0]; // masalan: 'users/profile'
  const serviceKey = '/' + path.split('/')[0]; // '/users'
  const targetService = routingTable[serviceKey];

  if (!targetService) {
    return res.status(404).json({ error: 'Xizmat topilmadi' });
  }

  const targetUrl = \`\${targetService}/\${path}\`;
  console.log(\`Yo'naltirilmoqda: \${req.method} \${targetUrl}\`);

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: { ...req.headers, host: new URL(targetService).host }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(\`Marshrutlash xatosi: \${error.message}\`);
    res.status(502).json({ error: 'Xizmat javob bermadi (Bad Gateway)' });
  }
});

app.listen(8000, () => console.log('API Gateway 8000-portda ishlamoqda'));
\`\`\`

### 2. Service Self-Registration (Consul simulyatsiyasi)
Servis ishga tushganda o'zini registry'ga ro'yxatga qo'shishi va har 5 soniyada Heartbeat (yurak urishi) yuborishi:

\`\`\`javascript
import axios from 'axios';

const SERVICE_NAME = 'order-service';
const INSTANCE_ID = \`order-service-1\`;
const SERVICE_URL = 'http://10.0.1.8:4002';
const REGISTRY_URL = 'http://localhost:8500/v1/agent/service/register';
const HEARTBEAT_URL = 'http://localhost:8500/v1/agent/check/pass';

// Registry'ga ro'yxatdan o'tish
async function registerService() {
  const payload = {
    ID: INSTANCE_ID,
    Name: SERVICE_NAME,
    Address: '10.0.1.8',
    Port: 4002,
    Check: {
      HTTP: \`\${SERVICE_URL}/health\`,
      Interval: '10s',
      Timeout: '2s'
    }
  };

  try {
    await axios.put(REGISTRY_URL, payload);
    console.log('Servis muvaffaqiyatli ro\\'yxatdan o\\'tdi!');
    
    // Heartbeat yuborishni boshlaymiz
    startHeartbeat();
  } catch (error) {
    console.error('Ro\\'yxatdan o\\'tishda xatolik:', error.message);
  }
}

function startHeartbeat() {
  setInterval(async () => {
    try {
      await axios.put(\`\${HEARTBEAT_URL}/service:\${INSTANCE_ID}\`);
      console.log('Heartbeat yuborildi.');
    } catch (error) {
      console.error('Heartbeat yuborishda xatolik:', error.message);
    }
  }, 5000);
}

registerService();
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### API Gateway Vazifalari (Duties):
1. **Reverse Proxying & Routing:** So'rovlarni ularga tegishli backend servislariga yo'naltirish.
2. **Authentication & Authorization (Autentifikatsiya):** JWT yoki API kalitlarini tekshirib, ichki mikroxizmatlarga faqat ishonchli so'rovlarni o'tkazish.
3. **SSL/TLS Termination:** HTTPS shifrlashini Gateway darajasida yakunlab, ichki klaster ichida oddiy HTTP orqali tezroq gaplashish.
4. **Rate Limiting & Throttling:** DDoS hujumlaridan yoki ortiqcha yuklamadan himoyalash uchun mijoz so'rovlari sonini cheklash.
5. **Request Aggregation:** Mijoz bitta so'rov yuborganida, API Gateway orqa fonda 3-4 ta xizmatdan ma'lumot yig'ib, yagona JSON qilib qaytarishi.

### Service Discovery turlari:
* **Client-side Discovery:** Mijoz (yoki API Gateway) Service Registry (Consul, Eureka) bazasidan barcha nusxalar ro'yxatini so'raydi. Client o'z tomonida yuk taqsimlash (load balancing) algoritmini (masalan, Round-Robin) ishga tushirib, bevosita tanlangan servis IP-manziliga murojaat qiladi.
* **Server-side Discovery:** Mijoz Load Balancer'ga (Nginx, AWS ALB) murojaat qiladi. Load Balancer Service Registry bilan bog'lanib, so'rovni sog'lom servis nusxalaridan biriga yo'naltiradi. Mijoz ichki tarmoq va registry haqida umuman bilmaydi.

### Service Registry Modellari:
* **Consul:** HashiCorp tomonidan yaratilgan, Raft konsensus protokoliga asoslangan, o'rnatilgan Health Check va DNS qo'llab-quvvatlashga ega Service Registry va kalit-qiymat ombori.
* **ZooKeeper:** Apache tomonidan ishlab chiqilgan, kuchli konsensusga ega, ma'lumotlarni daraxtsimon ierarxiyada saqlaydigan tizim. Mikroxizmatlarda konfiguratsiya boshqaruvi va yetakchini tanlash (leader election) uchun keng qo'llaniladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Hardcoded IP manzillar:** Servislar manzillarini konfiguratsiya fayllarida statik (\`http://192.168.1.15:3000\`) yozib qo'yish. Agar ushbu server o'chsa yoki IP manzili o'zgarsa, butun tizim buziladi. Service Discovery ishlatish shart!
2. **Gateway'ni yagona qulash nuqtasi (SPOF) qilish:** Gateway serveri faqat bitta nusxada bo'lishi. Agar u ishlamay qolsa, barcha backend servislar tirik bo'lsa ham mijozlar tizimga kira olmaydi. API Gateway kamida 2-3 nusxada yuk taqsimlovchi (Load Balancer) orqasida ishlashi lozim.
3. **Heartbeat bo'roni (Heartbeat Storm):** Juda qisqa intervalda (masalan, har 100ms da) heartbeat signalini yuborish. Yuzlab servis nusxalari mavjud bo'lganda, bu Service Registry serveriga juda katta yuklama (DDoS kabi) beradi va uni yiqitadi. Odatda optimal vaqt 5-15 soniya orasida bo'lishi kerak.

---

## 5. 💬 12 ta Intervyu Savollari

**1. API Gateway nima va nima uchun mikroxizmatlar arxitekturasida muhim?**
Mijozlar bilan ichki servislar o'rtasida turuvchi markaziy vositachi. U marshrutlash, xavfsizlik (auth), va yuk taqsimlashni bitta nuqtada hal qiladi.

**2. Service Discovery nima va u qanday muammoni hal qiladi?**
Dinamik bulutli muhitda mikroxizmat serverlari soni va IP-lari doim o'zgaradi. Service Discovery har bir xizmat nusxasini dinamik tarzda topishni hal qiladi.

**3. Client-side Discovery va Server-side Discovery farqi nimada?**
Client-side modelda mijoz (yoki API Gateway) registry'dan manzillarni o'zi oladi va yukni taqsimlaydi. Server-side modelda esa bu ish yuk taqsimlovchi (Load Balancer) tomonidan amalga oshiriladi.

**4. Service Registry vazifasi nima?**
Barcha faol mikroxizmat nusxalarining manzillari va portlari ro'yxatini real vaqtda saqlab turuvchi markaziy ma'lumotlar bazasi.

**5. Consul va ZooKeeper tizimlarining farqi nimada?**
Consul o'rnatilgan service discovery va health check'larga ega, ishlatish ancha oson. ZooKeeper esa past darajadagi koordinatsiya tizimi bo'lib, Java ekotizimida ko'proq tarqalgan va qo'shimcha kodlashni talab qiladi.

**6. Health Check nima va u Service Registry uchun nega kerak?**
Servis nusxasi ishlayotganligini tekshirish jarayoni. Agar servis nosoz bo'lsa, u registry ro'yxatidan o'chirilib, mijozlarga xato ma'lumot uzatilishining oldi olinadi.

**7. API Gateway-da SSL Termination qanday ishlaydi va foydasi nima?**
HTTPS shifrlangan trafigi Gateway darajasida yechiladi va ichki servislar orasida shifrsiz (HTTP) yuboriladi. Bu backend serverlardagi protsessor yuklamasini kamaytiradi.

**8. Request Aggregation (So'rovlar birlashuvi) qachon ishlatiladi?**
Mobil ilova bitta sahifani yuklash uchun alohida 5 ta mikroxizmatga so'rov yuborishi o'rniga, API Gateway'ga bitta so'rov yuboradi. Gateway barchasini birlashtirib, bitta javob qaytaradi.

**9. Raft protokoli Service Registry-larda nima uchun kerak?**
Klasterdagi bir nechta registry serverlari o'rtasida ma'lumotlar bir xilligini va mosligini (consensus) kafolatlash uchun.

**10. API Gateway va Load Balancer farqlari nimada?**
Load Balancer asosan tarmoq darajasida yukni teng taqsimlaydi. API Gateway esa dasturiy darajada (L7) autentifikatsiya, rate limiting, so'rovlarni o'zgartirish kabi biznes mantiqni tushunadi.

**11. Mikroxizmatlarda 'Self-Registration' modelining kamchiligi bormi?**
Har bir mikroxizmat ichida registry kutubxonasi bo'lishi va ro'yxatdan o'tish mantiqi dasturchi tomonidan sozlanishi kerak. Agar servis kodi xato yozilgan bo'lsa, u noto'g'ri manzillar yuborishi mumkin.

**12. API Gateway-dan barcha ichki servislar bir-biri bilan gaplashishi uchun foydalanish to'g'rimi?**
Yo'q, bu noto'g'ri. API Gateway faqat tashqi trafigi (North-South) uchun kirish nuqtasi bo'lishi kerak. Ichki servislar (East-West) o'zaro to'g'ridan-to'g'ri Service Discovery yordamida gaplashishi lozim.

---

## 6. 🛠️ Amaliy Topshiriqlar

Dars topshiriqlarida quyidagilarni mashq qilasiz:
1. Yo'nalishlar jadvalini dinamik ravishda tahlil qilib yo'naltiruvchi \`GatewayRouter\` yaratish.
2. Xizmat nusxalarini ro'yxatdan o'tkazuvchi va ularning holatini boshqaruvchi registry modelini yozish.
3. Heartbeat signali uzilgan servis nusxalarini aniqlab o'chiruvchi tizim yozish.

---

## 7. 📝 12 ta Mini Test

Bilimingizni sinash uchun 12 ta interaktiv testga javob bering.

---

## 8. 🎯 Real Project Case Study

### Katta yuklamali logistika tizimida API Gateway va Consul
Logistika tizimida (masalan, kurerlik xizmati) kurerlarning mobil ilovalari soniyasiga minglab GPS koordinatalarini yuboradi. Agar har bir mobil ilova bevosita kurer xizmatiga murojaat qilsa, IP manzillarini boshqarish qiyin bo'ladi.
* **Yechim:** API Gateway kirish nuqtasi qilib qo'yildi. GPS trafigi uchun alohida shriflash yakunlanib (SSL Termination), yuk dynamic tarzda Consul registry'dan olingan eng kam yuklamali kurerlik xizmatlari nusxalariga (Load Balancing) yo'naltiriladi. Yangi server qo'shilganda u Consul'da o'zini ro'yxatdan o'tkazadi va API Gateway darhol yangi serverga ham yuk yuborishni boshlaydi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

Quyidagi diagrammada mijoz so'rovining API Gateway va Service Registry orqali qanday yo'naltirilishi tasvirlangan:

\`\`\`mermaid
sequenceDiagram
    autonumber
    Client App->>API Gateway: GET /api/v1/orders (Request)
    API Gateway->>Service Registry (Consul): Get healthy instances of 'order-service'
    Service Registry (Consul)-->>API Gateway: [10.0.1.8:4002, 10.0.1.9:4002]
    Note over API Gateway: Selects 10.0.1.8:4002 using Round Robin
    API Gateway->>Order Service (10.0.1.8:4002): GET /orders
    Order Service (10.0.1.8:4002)-->>API Gateway: Response Data
    API Gateway-->>Client App: Response Data (JSON)
\`\`\`

---

## 10. 📌 Cheat Sheet

| Xususiyat | Client-Side Discovery | Server-Side Discovery |
| :--- | :--- | :--- |
| **Yukni taqsimlovchi** | API Gateway yoki Client ilova | Tashqi Load Balancer (Nginx/ALB) |
| **Registry bilan aloqa** | Mijoz bevosita bog'lanadi | Faqat Load Balancer bog'lanadi |
| **Kechikish (Latency)** | Kamroq (qo'shimcha tarmoq sakrashi yo'q) | Ko'proq (Load Balancer orqali o'tadi) |

| Registry | Konsensus Protokoli | Health Check xususiyati |
| :--- | :--- | :--- |
| **Consul** | Raft | Ichki (HTTP, TCP, Script) |
| **ZooKeeper** | Zab | TTL session va ephemerals |
`,
  exercises: [
  {
    "id": 1,
    "title": "API Gateway: Dynamic Routing",
    "instruction": "Foydalanuvchi so'rovlarini yo'naltiruvchi `GatewayRouter` klassini yozing. U `register(path, targetUrl)` va `route(path)` metodlariga ega bo'lsin. `route` metodi kelgan path'ga mos keluvchi eng uzun mos kelgan targetUrl ni topib qaytarishi kerak. Agar mos kelmasa, `null` qaytarsin.",
    "startingCode": "class GatewayRouter {\n  constructor() {\n    this.routes = new Map();\n  }\n\n  register(path, targetUrl) {\n    // Kodni shu yerda yozing\n  }\n\n  route(path) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "register orqali path va targetUrl-ni saqlang. route-da, path berilgan kalitlardan biriga to'liq mos kelishini yoki u bilan boshlanishini tekshiring.",
    "test": "const sandbox = new Function(code + '; return GatewayRouter;');\nconst Router = sandbox();\nconst r = new Router();\nr.register('/api/v1/users', 'http://user-service');\nr.register('/api/v1', 'http://main-service');\nif (r.route('/api/v1/users/profile') !== 'http://user-service') return 'Eng uzun mos kelgan yo\\'nalish topilmadi!';\nif (r.route('/api/v2') !== null) return 'Noma\\'lum yo\\'nalish uchun null qaytarishi kerak!';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Service Discovery: Health Filtering",
    "instruction": "`ServiceRegistry` klassini yozing. Unda xizmat nusxalarini ro'yxatga olish uchun `register(serviceName, instanceId, url)` metodi, hamda har bir nusxaning holatini yangilash uchun `updateStatus(instanceId, status)` metodi bo'lsin (`status` 'UP' yoki 'DOWN' bo'ladi). Shuningdek, `getHealthyInstances(serviceName)` metodi faqat 'UP' holatidagi nusxalarning URL ro'yxatini qaytarsin.",
    "startingCode": "class ServiceRegistry {\n  constructor() {\n    this.instances = []; // har biri: { serviceName, instanceId, url, status: 'UP' }\n  }\n\n  register(serviceName, instanceId, url) {\n    // Kodni shu yerda yozing\n  }\n\n  updateStatus(instanceId, status) {\n    // Kodni shu yerda yozing\n  }\n\n  getHealthyInstances(serviceName) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "register orqali obyekti massivga qo'shing (standart status: 'UP'). updateStatus orqali instanceId mos kelgan elementni topib statusini o'zgartiring. getHealthyInstances faqat serviceName mos va status === 'UP' bo'lgan nusxalarning url qiymatlarini filtrlab qaytarsin.",
    "test": "const sandbox = new Function(code + '; return ServiceRegistry;');\nconst Registry = sandbox();\nconst reg = new Registry();\nreg.register('auth', 'auth-1', 'http://auth-1:8080');\nreg.register('auth', 'auth-2', 'http://auth-2:8080');\nreg.updateStatus('auth-2', 'DOWN');\nconst healthy = reg.getHealthyInstances('auth');\nif (!Array.isArray(healthy) || healthy.length !== 1 || healthy[0] !== 'http://auth-1:8080') {\n  return 'Sog\\'lom nusxalar to\\'g\\'ri filtrlanmadi!';\n}\nreturn null;"
  },
  {
    "id": 3,
    "title": "Service Discovery: Heartbeat Monitor",
    "instruction": "`monitorHeartbeats(instances, timeoutMs, now)` funksiyasini yozing. `instances` massivi har bir elementida `{ instanceId, lastHeartbeat }` bo'lgan obyektdir. Berilgan joriy vaqt (`now`) va o'chish vaqti cheki (`timeoutMs`) asosida, oxirgi heartbeat vaqti eskirgan (ya'ni `now - lastHeartbeat > timeoutMs`) bo'lgan barcha xizmat nusxalarini aniqlab, ularning `instanceId` ro'yxatini qaytaring.",
    "startingCode": "function monitorHeartbeats(instances, timeoutMs, now) {\n  // Kodni shu yerda yozing\n}",
    "hint": "instances massividan now - item.lastHeartbeat > timeoutMs shartini qanoatlantiruvchi elementlarni filtrlang va faqat ularning instanceId-larini massiv sifatida qaytaring.",
    "test": "const sandbox = new Function(code + '; return monitorHeartbeats;');\nconst fn = sandbox();\nconst list = [\n  { instanceId: 'inst-1', lastHeartbeat: 1000 },\n  { instanceId: 'inst-2', lastHeartbeat: 2500 },\n  { instanceId: 'inst-3', lastHeartbeat: 2800 }\n];\nconst expired = fn(list, 1000, 3600);\nif (!Array.isArray(expired) || expired.length !== 2 || !expired.includes('inst-1') || !expired.includes('inst-2')) {\n  return 'Muddati o\\'tgan heartbeats noto\\'g\\'ri aniqlandi!';\n}\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "API Gateway'ning asosiy vazifasi nima?",
    "options": [
      "Ma'lumotlar bazasini gorizontal kengaytirish (sharding)",
      "Mijozlardan kelgan barcha so'rovlarni qabul qilib, ularni tegishli mikroxizmatlarga yo'naltirish (routing)",
      "Faqat foydalanuvchilar parolini shifrlash",
      "Kesh ma'lumotlarini qattiq diskda saqlash"
    ],
    "correctAnswer": 1,
    "explanation": "API Gateway kirish eshigi vazifasini bajaradi va barcha tashqi so'rovlarni qabul qilib, ularni ichki mikroxizmatlarga yo'naltiradi."
  },
  {
    "id": 2,
    "question": "Service Discovery nima uchun kerak?",
    "options": [
      "Mikroxizmatlarning o'zgaruvchan IP va portlarini dinamik tarzda aniqlash va kuzatish uchun",
      "JavaScript kodini tezroq kompilyatsiya qilish uchun",
      "SQL so'rovlarini tahlil qilish uchun",
      "CSS animatsiyalarini avtomatik sozlash uchun"
    ],
    "correctAnswer": 0,
    "explanation": "Mikroxizmatlar dinamik ravishda kengayganda (scale up/down) ularning IP manzillari va portlari o'zgarib turadi. Service Discovery ushbu manzillarni avtomatik topish imkonini beradi."
  },
  {
    "id": 3,
    "question": "Client-side Discovery modelida servis manzillarini kim aniqlaydi va yukni qanday taqsimlaydi?",
    "options": [
      "DNS server barcha yukni markazlashtirilgan holda boshqaradi",
      "Nginx yoki boshqa yuk taqsimlovchi barcha operatsiyalarni o'ziga oladi",
      "Client (mijoz ilovasi yoki API Gateway) Service Registry'dan manzillar ro'yxatini oladi va o'zi yuk taqsimlash algoritmini ishga tushiradi",
      "Ma'lumotlar bazasi avtomatik ravishda so'rovlarni bo'lib beradi"
    ],
    "correctAnswer": 2,
    "explanation": "Client-side discovery modelida mijoz (yoki API Gateway) registry'dan ro'yxatni o'zi so'rab oladi va load balancing (masalan, Round Robin) algoritmi yordamida so'rovni bevosita tanlangan servis nusxasiga yuboradi."
  },
  {
    "id": 4,
    "question": "Server-side Discovery modelining asosiy afzalligi nimada?",
    "options": [
      "Mijoz Service Registry haqida bilishi va unga murojaat qilishi shart emas, barcha marshrutlash va yuk taqsimlash yuk taqsimlovchi (Load Balancer) tomonidan hal qilinadi",
      "Tarmoq kechikishini (network latency) butunlay nolga tushiradi",
      "Hech qanday Load Balancer talab qilmaydi",
      "Ma'lumotlar bazasi so'rovlarini keshlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Server-side modelda mijoz faqat Load Balancer (masalan, NGINX yoki AWS ALB) manzilini biladi. Load Balancer o'zi Service Registry bilan bog'lanib, so'rovni tegishli servisga yo'naltiradi."
  },
  {
    "id": 5,
    "question": "Service Registry sifatida Consul yoki ZooKeeper'dan foydalanilganda 'Health Check' nima uchun kerak?",
    "options": [
      "Dasturchining sog'lig'ini tekshirish uchun",
      "Ishlamayotgan yoki nosoz servis nusxalarini aniqlab, ularga so'rov yuborilishini to'xtatish uchun",
      "Faqat foydalanuvchining sessiyasini tekshirish uchun",
      "Servisning xotirasini bo'shatish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Health Check yordamida registry har bir servis nusxasining holatini kuzatib boradi. Agar nusxa nosoz bo'lsa (pingga javob bermasa yoki heartbeat yubormasa), u ro'yxatdan vaqtincha o'chiriladi."
  },
  {
    "id": 6,
    "question": "Service Discovery'da 'Heartbeat' (yurak urishi) tushunchasi nimani anglatadi?",
    "options": [
      "CPU haroratining oshib ketishi",
      "Servis nusxasi hali ham tirik va ishlayotganligini ko'rsatish uchun Service Registry'ga muntazam ravishda yuboradigan signali",
      "Ma'lumotlar bazasining zaxira nusxasini yaratish jarayoni",
      "Brauzerning har soniyada sahifani yangilashi"
    ],
    "correctAnswer": 1,
    "explanation": "Heartbeat — servis nusxasi o'zining ishchi holatini tasdiqlash uchun Service Registry serveriga har X soniyada yuboradigan HTTP yoki TCP signalidir."
  },
  {
    "id": 7,
    "question": "Consul va ZooKeeper registry modellarida consensus (konsensus) protokollarining roli nima?",
    "options": [
      "Barcha servis nusxalarida ma'lumotlar bazasini sinxronlashtirish",
      "Tarmoqdagi barcha tugunlar (nodes) ro'yxat ma'lumotlari bo'yicha yagona kelishuvga (haqiqatga) ega bo'lishini ta'minlash",
      "CSS stillarini sinxronizatsiya qilish",
      "Foydalanuvchilar sonini cheklash"
    ],
    "correctAnswer": 1,
    "explanation": "Service Registry klaster ko'rinishida ishlaydi. Consul (Raft protokoli) va ZooKeeper (Zab protokoli) kabi tizimlar tugunlar o'rtasida ma'lumotlar mutlaqo bir xil va dolzarb bo'lishini ta'minlash uchun konsensus protokollaridan foydalanadi."
  },
  {
    "id": 8,
    "question": "API Gateway'da 'SSL Termination' nima?",
    "options": [
      "Shifrlangan HTTPS trafigini API Gateway darajasida dekodlab, ichki servislar bilan oddiy HTTP orqali gaplashish",
      "SSL sertifikatining muddati tugaganda tizimni o'chirish",
      "Faqat foydalanuvchining login parolini shifrlash",
      "Ma'lumotlarni shifrlab faqat diskda saqlash"
    ],
    "correctAnswer": 0,
    "explanation": "SSL termination (yoki SSL offloading) Gateway HTTPS trafigini shifrdan yechib, ichki mikroxizmatlarga shifrsiz yo'naltirishidir. Bu ichki xizmatlar yukini kamaytiradi."
  },
  {
    "id": 9,
    "question": "Mikroxizmatlarda API Gateway orqali 'Request Aggregation' (so'rovlarni birlashtirish) qanday muammoni hal qiladi?",
    "options": [
      "Foydalanuvchining internet tezligini oshiradi",
      "Mijoz ilovasi bitta sahifani yuklash uchun o'nlab mikroxizmatlarga alohida HTTP so'rov yuborishining oldini oladi (bitta so'rov orqali Gateway barchasini yig'ib beradi)",
      "Kodning hajmini qisqartiradi",
      "Balla xatoliklarni avtomatik tuzatadi"
    ],
    "correctAnswer": 1,
    "explanation": "Request Aggregation yordamida mobil yoki veb ilova bitta so'rov yuboradi, API Gateway esa orqa fonda bir nechta mikroxizmatlardan ma'lumotlarni yig'ib, mijozga yagona JSON javob qaytaradi."
  },
  {
    "id": 10,
    "question": "Service Discovery tizimida 'Self-Registration' nima?",
    "options": [
      "Dasturchining tizimdan ro'yxatdan o'tishi",
      "Servis nusxasi ishga tushganda o'zining IP va portini Service Registry'ga avtomatik ravishda ro'yxatdan o'tkazishi",
      "Administrator tomonidan har bir serverni qo'lda ro'yxatga olish",
      "Brauzerda cookie yozish"
    ],
    "correctAnswer": 1,
    "explanation": "Self-registration modelida har bir servis nusxasi ishga tushganda o'zining manzili va holatini registry'ga yuboradi va to'xtayotganda o'chirish so'rovini yuboradi."
  },
  {
    "id": 11,
    "question": "API Gateway-ni lozim darajada sozlamasdan, uni 'Single Point of Failure' (yagona qulash nuqtasi) qilib qo'yish qanday oqibatga olib keladi?",
    "options": [
      "Dasturdagi xotira sarfi ortadi",
      "Agar API Gateway serveri ishlamay qolsa, barcha orqa fondagi xizmatlar sog'lom bo'lsa ham butun tizim tashqi dunyo uchun butunlay yopiq qoladi",
      "Ma'lumotlar bazasidagi jadvallar o'chib ketadi",
      "Faqat backend dasturchining kompyuteri qotadi"
    ],
    "correctAnswer": 1,
    "explanation": "API Gateway butun tizim uchun yagona kirish eshigi bo'lganligi sababli, u buzilsa, klaster ichidagi hech bir xizmatga tashqaridan kirib bo'lmaydi. Shuning uchun Gateway klasteri ham yuqori chidamlilik (High Availability) rejimida ishlashi kerak."
  },
  {
    "id": 12,
    "question": "API Gateway va oddiy Reverse Proxy (masalan, Nginx) o'rtasidagi farq nimada?",
    "options": [
      "Reverse Proxy faqat past darajadagi marshrutlashni bajaradi; API Gateway esa autentifikatsiya, rate limiting, so'rovlarni o'zgartirish va monitoring kabi yuqori darajadagi biznes mantiqni boshqara oladi",
      "API Gateway faqat ma'lumotlar bazasi so'rovlarini qabul qiladi",
      "Reverse proxy faqat yuk taqsimlaydi, API Gateway esa yuk taqsimlay olmaydi",
      "Hech qanday farqi yo'q"
    ],
    "correctAnswer": 0,
    "explanation": "Reverse Proxy asosan marshrutlash va yuk taqsimlash (L4/L7) bilan shug'ullansa, API Gateway dastur darajasida murakkab autentifikatsiya, API kalitlarni boshqarish, kesh va dynamic routing kabi amallarni bajaradi."
  }
]

};

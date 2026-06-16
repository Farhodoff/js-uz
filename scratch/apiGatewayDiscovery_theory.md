## 1. 💡 Sodda Tushuntirish va Analogiya

### API Gateway va Service Discovery nima?
* **API Gateway:** Tizimingizning kirish eshigi. U barcha tashqi mijozlar so'rovlarini qabul qilib, ularni ichki mikroxizmatlarga (microservices) to'g'ri yo'naltiruvchi, xavfsizlik va nazoratni boshqaruvchi markaziy tugundir.
* **Service Registry:** Barcha ishlayotgan xizmat nusxalarining (service instances) joriy IP manzillari va portlari saqlanadigan ma'lumotlar bazasi (telefon kitobchasi).
* **Service Discovery:** Mikroxizmatlar dinamik ravishda kengayganda (scale up/down) yoki IP manzili o'zgarganda, ularning joriy joylashuvini avtomatik ravishda aniqlash mexanizmi.

### Real hayotiy analogiya
Tasavvur qiling, siz **yirik mehmonxonaga** keldingiz:
* **API Gateway (Resepshn):** Mehmonxonaga kirganingizda, resepshn sizni kutib oladi. Siz xonangizning raqamini bilishingiz yoki oshxona, basseyn qayerdaligini qidirishingiz shart emas. Siz resepshndan "Taom yemoqchiman" deb so'raysiz, u esa sizni restoran tomon yo'naltiradi. Shuningdek, resepshn sizning shaxsingizni tekshiradi (Authentication) va juda ko'p yuk bilan kelganingizda yordam beradi.
* **Service Registry (Xonalar xaritasi / Telefon daftarchasi):** Restoran xonasi o'zgarishi, basseyn vaqtinchalik yopilishi yoki yangi xizmatlar qo'shilishi mumkin. Resepshn stolida qaysi xizmat qaysi xonada joylashganligi va ularning telefon raqamlari yozilgan dinamik ro'yxat (Service Registry) bo'ladi.
* **Service Discovery (Dinamik qidiruv):** Agar 3-xonadagi restoran band bo'lsa yoki buzilgan bo'lsa, resepnshn ro'yxatdan boshqa ochiq bo'lgan 5-xonadagi restoranning manzilini tezda bilib oladi (Service Discovery) va sizni o'sha yerga jo'natadi.

---

## 2. 💻 Real Kod Misollari

### 1. API Gateway marshrutlash (Routing) va Dynamic Proxy (Express + Axios)
Mijoz so'rovlarini dinamik ravishda mos keluvchi ichki xizmatlarga yo'naltirish:

```javascript
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

  const targetUrl = `${targetService}/${path}`;
  console.log(`Yo'naltirilmoqda: ${req.method} ${targetUrl}`);

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: { ...req.headers, host: new URL(targetService).host }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Marshrutlash xatosi: ${error.message}`);
    res.status(502).json({ error: 'Xizmat javob bermadi (Bad Gateway)' });
  }
});

app.listen(8000, () => console.log('API Gateway 8000-portda ishlamoqda'));
```

### 2. Service Self-Registration (Consul simulyatsiyasi)
Servis ishga tushganda o'zini registry'ga ro'yxatga qo'shishi va har 5 soniyada Heartbeat (yurak urishi) yuborishi:

```javascript
import axios from 'axios';

const SERVICE_NAME = 'order-service';
const INSTANCE_ID = `order-service-1`;
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
      HTTP: `${SERVICE_URL}/health`,
      Interval: '10s',
      Timeout: '2s'
    }
  };

  try {
    await axios.put(REGISTRY_URL, payload);
    console.log('Servis muvaffaqiyatli ro\'yxatdan o\'tdi!');
    
    // Heartbeat yuborishni boshlaymiz
    startHeartbeat();
  } catch (error) {
    console.error('Ro\'yxatdan o\'tishda xatolik:', error.message);
  }
}

function startHeartbeat() {
  setInterval(async () => {
    try {
      await axios.put(`${HEARTBEAT_URL}/service:${INSTANCE_ID}`);
      console.log('Heartbeat yuborildi.');
    } catch (error) {
      console.error('Heartbeat yuborishda xatolik:', error.message);
    }
  }, 5000);
}

registerService();
```

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

1. **Hardcoded IP manzillar:** Servislar manzillarini konfiguratsiya fayllarida statik (`http://192.168.1.15:3000`) yozib qo'yish. Agar ushbu server o'chsa yoki IP manzili o'zgarsa, butun tizim buziladi. Service Discovery ishlatish shart!
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
1. Yo'nalishlar jadvalini dinamik ravishda tahlil qilib yo'naltiruvchi `GatewayRouter` yaratish.
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

```mermaid
sequenceDiagram
    autonumber
    Client App->>API Gateway: GET /api/v1/orders (Request)
    API Gateway->>Service Registry (Consul): Get healthy instances of 'order-service'
    Service Registry (Consul)-->>API Gateway: [10.0.1.8:4002, 10.0.1.9:4002]
    Note over API Gateway: Selects 10.0.1.8:4002 using Round Robin
    API Gateway->>Order Service (10.0.1.8:4002): GET /orders
    Order Service (10.0.1.8:4002)-->>API Gateway: Response Data
    API Gateway-->>Client App: Response Data (JSON)
```

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

export const microservicesServerless = {
  id: "microservicesServerless",
  title: "Mikroxizmatlar va Serverless Arxitekturasi (Microservices & Serverless)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

Tasavvur qiling, siz **katta restoran** ochmoqchisiz:

1. **Monolit (Monolithic) arxitektura:** Siz bitta katta bino qurasiz. U yerda oshpaz, kassir, farrosh, hisobchi — hamma bitta zalda ishlaydi. Agar oshpaz kasal bo'lsa yoki oshxonada gaz o'chib qolsa, butun restoran faoliyati to'xtaydi. Barcha xodimlar bir-biriga juda bog'langan.
2. **Mikroxizmatlar (Microservices) arxitekturasi:** Siz restoranni mustaqil bo'limlarga bo'lasiz. Taom tayyorlash alohida bino/xonada, yetkazib berish alohida filialda, buxgalteriya esa masofadan ishlaydi. Ular bir-biri bilan faqat telefon (API) orqali gaplashadi. Agar yetkazib berish bo'limi to'xtab qolsa ham, zalda taom berish davom etaveradi.
3. **Serverless (FaaS - Function as a Service):** Sizda umuman doimiy ishlovchi oshxona yoki xodimlar yo'q. Faqat buyurtma kelganda, tashqaridan "frilanser" oshpaz kelib taomni tayyorlaydi va ketadi. Restoran faqat tayyorlangan taom soniga qarab haq to'laydi. Oshxona bo'sh turganda hech qanday xarajat bo'lmaydi.

---

## 2. 💻 Real Kod Misollari

Quyida serverless funksiyalar va mikroxizmatlar kontekstini tushunish uchun sodda JavaScript kodlari keltirilgan:

### Misol 1: AWS Lambda uslubidagi Serverless Handler
Serverless funksiyalar hodisalarga (Events) asoslanib ishlaydi:

\`\`\`javascript
// Serverless funksiya faqat so'rov kelganda ishga tushadi
exports.handler = async (event) => {
  console.log("So'rov kelib tushdi:", event.path);

  const body = event.body ? JSON.parse(event.body) : {};
  const name = body.name || "Mehmon";

  // Standart API Gateway formatidagi javob
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: \`Salom, \${name}!\` }),
  };
};
\`\`\`

### Misol 2: Stateless vs Stateful (State boshqaruvi)
Serverless funksiyalar xotirada ma'lumot saqlamaydi (Stateless). Quyidagi kod noto'g'ri va to'g'ri yo'llarni ko'rsatadi:

\`\`\`javascript
// ❌ NOTO'G'RI: FaaS konteyneri istalgan vaqtda o'chishi mumkin
let requestCount = 0; 
exports.handler = async (event) => {
  requestCount++; // Bu o'zgaruvchi keyingi so'rovlarda kafolatlanmagan!
  return { statusCode: 200, body: \`Jami so'rovlar: \${requestCount}\` };
};

//  TO'G'RI: Tashqi ma'lumotlar omboridan (Redis/Database) foydalanish
const redis = require("redis-client"); // Shartli kutubxona
exports.handler = async (event) => {
  const count = await redis.incr("global_request_count");
  return { statusCode: 200, body: \`Jami so'rovlar: \${count}\` };
};
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Monolit, Mikroxizmatlar va Serverless
* **Monolit:** Yagona ma'lumotlar bazasi va yagona kod bazasi. Katta tizimlarda kod murakkablashib ketadi. Masshtablash faqat butun tizimni ko'paytirish orqali amalga oshadi.
* **Mikroxizmatlar:** Har bir mikroxizmat o'zining shaxsiy ma'lumotlar bazasiga ega bo'ladi (Database-per-service). Aloqa HTTP (REST), gRPC yoki Message Broker (Kafka, RabbitMQ) orqali amalga oshadi.
* **Serverless (FaaS):** Biz serverlarni boshqarmaymiz. Biz faqat kod yozamiz, provayder esa uni triggerlar (HTTP, Event, DB changes) yordamida vaqtinchalik konteynerlarda (masalan, Firecracker microVM) ishga tushiradi.

### 2. Narxlar (Pricing Model)
* **Traditsion serverlar (Monolit/Microservices):** Server 24/7 ishlaydi. Foydalanuvchi bo'lsa-bo'lmasa, har oy belgilangan summa to'lanadi.
* **Serverless (FaaS):** Faqat kod ishlayotgan vaqtdagi millisoniyalar (GB-soniya) va chaqiruvlar soni uchun to'lanadi. Agar so'rov kelmasa, narxi $0.

### 3. Cold Start (Sovuq ishga tushish)
Funksiya uzoq vaqt chaqirilmaganda, uning konteyneri o'chiriladi. Yangi so'rov kelganda:
1. Virtual mashina va runtime (Node.js) yuklanadi.
2. Funksiya kodi yuklanadi va ishga tushadi.
Bu jarayon bir necha yuz millisoniyadan bir necha soniyagacha vaqt olishi mumkin. Bunga **Cold Start** deyiladi. Keyingi ketma-ket so'rovlar esa "issiq" (Warm) konteynerda darhol bajariladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **FaaS funksiyalarida holatni (State) saqlash:** Global massivlar yoki fayllarni mahalliy diskda saqlab, kelasi so'rovda ham ishlatishga urinish. Esda tuting, konteynerlar ephemeral (vaqtinchalik).
2. **Cold Start-ni hisobga olmaslik:** Tezkor API-larda sovuq ishga tushish foydalanuvchini kutib qolishiga sabab bo'ladi. Provisioned Concurrency ishlatmaslik yoki og'ir kutubxonalarni funksiyaga yuklash orqali Cold Start-ni og'irlashtirish.
3. **Serverless funksiyalarga juda uzoq vazifalarni berish:** FaaS funksiyalarida ishlash vaqti chegaralangan (masalan, 15 daqiqa). Bir necha soat davom etadigan video render yoki katta ma'lumotlarni import qilish ishlarini FaaS orqali bajarib bo'lmaydi.
4. **Tarmoq orqali ko'p so'rovlar yuborish (N+1 muammosi):** Mikroxizmatlarda bitta sahifani yuklash uchun 10 xil servisga HTTP so'rovlar yuborish kechikishni (latency) keskin oshiradi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Monolit arxitekturaning afzalligi nimada?**
Loyiha boshida kodni tez yozish, deploy qilish va testlash osonligi. Aloqalar xotirada sodir bo'ladi, tarmoq kechikishlari bo'lmaydi.

**2. Mikroxizmatlarda ma'lumotlar yaxlitligini (Data Consistency) ta'minlash qanday amalga oshiriladi?**
Tranzaksiyalar bitta baza ichida bo'lmagani uchun Saga pattern yoki Eventual Consistency (oxir-oqibat muvofiqlik) prinsiplaridan foydalaniladi.

**3. Serverless tizimda mutlaqo server yo'qmi?**
Serverlar bor, lekin infratuzilmani sozlash, operatsion tizimni yangilash va masshtablash (scaling) bulut provayderi tomonidan avtomatik bajariladi.

**4. FaaS nima?**
Function as a Service — dasturchiga faqat bitta funksiyani yozish va uni voqealar triggeri orqali ishga tushirish imkonini beruvchi serverless hisoblash turi.

**5. Cold Start qanday yuz beradi?**
FaaS konteyneri faol bo'lmaganda o'chiriladi. Yangi so'rov kelganda, muhit noldan yaratiladi. Bu jarayon kechikishga sabab bo'ladi.

**6. Warm Start nima?**
Funksiya yaqinda chaqirilgan bo'lsa, konteyner hali faol bo'ladi va yangi so'rov kelganda u noldan yuklanmasdan darhol javob qaytaradi.

**7. FaaS funksiyalari uchun optimal dasturlash tillari qaysilar va nima uchun?**
Node.js, Python va Go tillarining start-up vaqti tez bo'lgani uchun ular Cold Start vaqtini kamaytiradi. Java va .NET cold start-da sekinroq ishlaydi.

**8. Stateless nima uchun serverless uchun majburiy shart?**
Chunki provayder so'rovlar oqimiga qarab funksiyani bir vaqtning o'zida yuzlab nusxalarda ishga tushirishi yoki o'chirishi mumkin. Har bir nusxa mustaqil ishlashi kerak.

**9. API Gateway nima uchun ishlatiladi?**
Mijoz so'rovlarini qabul qilib, ularni tegishli mikroxizmat yoki serverless funksiyaga xavfsiz va to'g'ri yo'naltirish (routing) uchun.

**10. Serverless arxitekturaning narxlash modeli an'anaviy virtual serverlardan (VPS/VM) qanday farq qiladi?**
Virtual serverlarda ishlatilishidan qat'i nazar vaqt uchun pul to'lanadi. Serverless-da faqat funksiya ishlayotgan millisoniyalar va chaqiruvlar soni uchun to'lanadi.

**11. Ephemeral Storage nima?**
Funksiya bajarilayotgan vaqtda fayllarni vaqtincha yozish uchun beriladigan \`/tmp\` papkasi. U faqat bitta chaqiruv davomida mavjud bo'ladi.

**12. Provisioned Concurrency nima va u qachon kerak?**
AWS Lambda-da funksiyaning belgilangan nusxalarini doim "issiq" holatda saqlab turuvchi xususiyat. U cold start kechikishlarini butunlay yo'q qilish uchun kerak.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni bajarish orqali serverless funksiyalar va API gateway routerlarini tuzish ko'nikmalaringizni mustahkamlang.

---

## 7. 📝 12 ta Mini Test

Testlar bo'limida serverless, mikroxizmatlar va monolit tizimlar bo'yicha bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Netflix-ning Mikroxizmatlarga O'tishi
2008-yilda Netflix o'zining monolitik ma'lumotlar bazasida jiddiy muammoga duch keldi va bir necha kun davomida foydalanuvchilarga xizmat ko'rsata olmadi. Shundan so'ng ular tizimni yuzlab alohida mikroxizmatlarga bo'lishga qaror qilishdi:
* **Natija:** Hozirgi kunda Netflix yuzlab mikroxizmatlardan foydalanadi (masalan, tavsiya xizmati, video oqimi xizmati, hisob-kitob xizmati). Agar tavsiya tizimi ishlamay qolsa ham, foydalanuvchilar o'zlarining shaxsiy ro'yxatidagi filmlarni ko'rishda davom etishlari mumkin.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

Quyida an'anaviy mikroxizmatlar tizimidagi doimiy aloqalar oqimi bilan Serverless FaaS funksiyalarining triggerlar orqali ishga tushishi taqqoslangan:

\`\`\`mermaid
flowchart TD
    subgraph Microservices [Mikroxizmatlar Arxitekturasi (Doimiy serverlar)]
        Client1[Mijoz] --> Gateway1[API Gateway]
        Gateway1 --> ServiceA[Order Service - Running 24/7]
        Gateway1 --> ServiceB[User Service - Running 24/7]
        ServiceA --> DB1[(PostgreSQL)]
    end

    subgraph ServerlessFaaS [Serverless Arxitekturasi (Event-Driven)]
        Client2[Mijoz] --> Gateway2[API Gateway]
        Gateway2 -->|HTTP POST Event| LambdaA[CreateOrder Function - Spun up on demand]
        Gateway2 -->|HTTP GET Event| LambdaB[GetUser Function - Spun up on demand]
        LambdaA --> DB2[(DynamoDB - Serverless)]
    end
\`\`\`

---

## 10. 📌 Cheat Sheet

| Mezbonlik modeli | Infratuzilma nazorati | Masshtablash tezligi | Narx modeli | Eng yaxshi foydalanish |
| :--- | :--- | :--- | :--- | :--- |
| **Monolit (Bare Metal / VM)** | To'liq nazorat sizda | Sekin (daqiqalar/soatlar) | Ruxsat etilgan oylik ijara | MVP bosqichi, sodda loyihalar |
| **Mikroxizmatlar (Docker / K8s)** | Konteynerlar darajasida | O'rtacha (soniyalar/daqiqalar) | Konteynerlar soniga qarab | Katta loyihalar, yuqori yuklama |
| **Serverless (FaaS)** | Provayder tomonidan boshqariladi | Zudlik bilan (millisoniyalar) | Faqat real ishlagan vaqtga | Voqealarga asoslangan API, fon ishlari |
`,
  exercises: [
  {
    "id": 1,
    "title": "Serverless Handler loyihalash",
    "instruction": "API Gateway-dan keladigan `event` obyektini qayta ishlaydigan `handler(event)` funksiyasini yozing. `event.body` JSON formatidagi satr (string) ko'rinishida keladi. Uni obyektga parslash (JSON.parse) orqali `name` maydoni bor-yo'qligini tekshiring. Agar `name` mavjud bo'lsa, status kodi `200` va body qismida `{\"message\": \"Salom, <ism>!\"}` bo'lgan javob obyektini qaytaring. Agar `name` bo'lmasa yoki body bo'sh bo'lsa, status kodi `400` va body qismida `{\"error\": \"Ism kiritilmadi\"}` qaytaring. Qaytarilayotgan response obyekti har doim `statusCode` (number) va `body` (string) maydonlariga ega bo'lishi shart.",
    "startingCode": "function handler(event) {\n  // Kodni shu yerga yozing\n}",
    "hint": "Try-catch yordamida JSON.parse(event.body) qiling. Qaytayotgan obyektda body satr bo'lishi uchun JSON.stringify ishlatilishi kerak.",
    "test": "if (typeof handler !== 'function') return 'handler funksiyasi topilmadi'; const res1 = handler({ body: '{\"name\": \"Ali\"}' }); if (!res1 || res1.statusCode !== 200) return 'Muvaffaqiyatli so\\'rovda status kodi 200 bo\\'lishi kerak'; if (typeof res1.body !== 'string' || !res1.body.includes('Salom, Ali!')) return 'Muvaffaqiyatli so\\'rov body qismi noto\\'g\\'ri'; const res2 = handler({ body: '{}' }); if (!res2 || res2.statusCode !== 400 || !res2.body.includes('Ism kiritilmadi')) return 'Ism kiritilmaganda xatolik xabari qaytishi kerak'; return null;"
  },
  {
    "id": 2,
    "title": "Asosiy API Gateway Routeri",
    "instruction": "Kichik serverless router funksiyasini yozing. `routeRequest(event)` funksiyasi `event` obyektini qabul qiladi, unda `httpMethod` (masalan, 'GET' yoki 'POST') va `path` (masalan, '/users' yoki '/orders') bo'ladi. Agar so'rov `GET /users` bo'lsa, `\"users_list\"` qaytaring. Agar so'rov `POST /orders` bo'lsa, `\"order_created\"` qaytaring. Qolgan barcha holatlarda `\"not_found\"` qiymatini qaytaring.",
    "startingCode": "function routeRequest(event) {\n  // Kodni shu yerga yozing\n}",
    "hint": "event.httpMethod va event.path qiymatlarini tekshirib, if-else yoki switch block yozing.",
    "test": "if (typeof routeRequest !== 'function') return 'routeRequest funksiyasi topilmadi'; if (routeRequest({ httpMethod: 'GET', path: '/users' }) !== 'users_list') return 'GET /users uchun users_list qaytishi kerak'; if (routeRequest({ httpMethod: 'POST', path: '/orders' }) !== 'order_created') return 'POST /orders uchun order_created qaytishi kerak'; if (routeRequest({ httpMethod: 'GET', path: '/unknown' }) !== 'not_found') return 'Noma\\'lum so\\'rovlar not_found qaytarishi kerak'; return null;"
  },
  {
    "id": 3,
    "title": "Cold Start uchun Keshni Simulyatsiya qilish",
    "instruction": "FaaS muhitida global kontekstning qayta ishlatilishini simulyatsiya qiling. Global o'zgaruvchi sifatida `let cache = {};` e'lon qilingan deb hisoblang. `fetchDataWithCache(key, fallbackFetcher)` funksiyasini yozing. Agar berilgan `key` keshda mavjud bo'lsa, u keshdagi qiymatni qaytarsin. Agar keshda bo'lmasa, `fallbackFetcher()` funksiyasini chaqirib, olingan qiymatni keshga yozsin va qaytarsin.",
    "startingCode": "let cache = {};\n\nfunction fetchDataWithCache(key, fallbackFetcher) {\n  // Kodni shu yerga yozing\n}",
    "hint": "cache[key] !== undefined ekanligini tekshiring. Bo'lmasa, fallbackFetcher() ni chaqiring va natijani cache[key] ga saqlang.",
    "test": "if (typeof fetchDataWithCache !== 'function') return 'fetchDataWithCache funksiyasi topilmadi'; cache = {}; let callCount = 0; const fetcher = () => { callCount++; return 'data1'; }; const res1 = fetchDataWithCache('user1', fetcher); if (res1 !== 'data1') return 'Natija noto\\'g\\'ri'; const res2 = fetchDataWithCache('user1', fetcher); if (res2 !== 'data1') return 'Keshdan olingan natija noto\\'g\\'ri'; if (callCount !== 1) return 'Fallback fetcher keshda bor ma\\'lumot uchun chaqirilmasligi kerak edi'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Monolit va Mikroxizmatlar (Microservices) arxitekturasi orasidagi asosiy farq nimada?",
    "options": [
      "Monolitda butun tizim yagona kod bazasi va bitta dastur sifatida ishlaydi, mikroxizmatlarda esa tizim alohida mustaqil xizmatlarga bo'linadi",
      "Monolit faqat SQL bazalar bilan ishlaydi, mikroxizmatlar esa faqat NoSQL bazalar bilan",
      "Mikroxizmatlar faqat bulutli tizimlarda ishlay oladi, monolit esa ishlay olmaydi",
      "Monolit arxitekturada xatoliklarni aniqlash mikroxizmatlarga qaraganda ancha oson"
    ],
    "correctAnswer": 0,
    "explanation": "Monolit arxitekturada barcha funksiyalar va modullar yagona dastur ichida birlashtirilgan bo'ladi. Mikroxizmatlarda esa har bir xizmat mustaqil va alohida joylashtiriladi."
  },
  {
    "id": 2,
    "question": "Mikroxizmatlar arxitekturasining qaysi jihati eng katta qiyinchiliklardan biri hisoblanadi?",
    "options": [
      "Dasturchilar sonini cheklashi",
      "Tizimning murakkabligi, tarmoq orqali aloqa qilish kechikishlari va ma'lumotlar yaxlitligini saqlash qiyinligi",
      "Faqat bitta dasturlash tilidan foydalanish zarurati",
      "Xizmatlarni alohida masshtablash imkoniyati yo'qligi"
    ],
    "correctAnswer": 1,
    "explanation": "Mikroxizmatlarda servislar o'rtasidagi tarmoq aloqalari, taqsimlangan tranzaksiyalar (distributed transactions) va deployment jarayonlari tizim murakkabligini oshiradi."
  },
  {
    "id": 3,
    "question": "Serverless (FaaS - Function as a Service) hisoblash modelining asosiy g'oyasi nima?",
    "options": [
      "Tizimda umuman serverlar mavjud bo'lmaydi",
      "Serverlarni foydalanuvchilar o'zlari boshqaradi",
      "Dasturchi server infratuzilmasini sozlamaydi va boshqarmaydi, faqat voqealar (events) orqali ishga tushuvchi kod (funksiya) yozadi",
      "Kodni faqat frontend qismda ishga tushirish imkonini beradi"
    ],
    "correctAnswer": 2,
    "explanation": "Serverless nomiga qaramay orqa fonda serverlar bor, biroq ularni sozlash, masshtablash va yangilash (patching) ishlari bulut provayderi (masalan, AWS, Google Cloud) zimmasida bo'ladi."
  },
  {
    "id": 4,
    "question": "Serverless arxitekturasidagi \"Cold Start\" (Sovuq ishga tushish) nima?",
    "options": [
      "Funksiya ma'lum muddat chaqirilmagandan so'ng birinchi marta so'rov kelganda, konteynerning noldan yuklanishi sababli yuzaga keladigan vaqtinchalik kechikish",
      "Server xonasidagi harorat pasayishi natijasida serverlarning sekin ishlashi",
      "Funksiyaning xato (error) bilan tugashi va qayta ishga tushishi",
      "Faqat qish faslida server yuklamasining oshishi"
    ],
    "correctAnswer": 0,
    "explanation": "Agar funksiya tez-tez chaqirilmasa, provayder resurslarni tejash uchun uni o'chirib qo'yadi. Keyingi so'rov kelganda yangi konteyner ishga tushiriladi va bu cold start deb ataladi."
  },
  {
    "id": 5,
    "question": "Cold Start muammosini qanday qilib yumshatish (kamaytirish) mumkin?",
    "options": [
      "Faqat SQL ma'lumotlar bazasidan foydalanish orqali",
      "Funksiya kodining hajmini maksimal darajada oshirish orqali",
      "Provisioned Concurrency-ni sozlash (konteynerlarni doim tayyor saqlash) yoki vaqti-vaqti bilan funksiyani avtomatik ping qilib turish",
      "Faqat JavaScript dasturlash tilidan voz kechish orqali"
    ],
    "correctAnswer": 2,
    "explanation": "Provisioned Concurrency bulut provayderiga ma'lum miqdordagi funksiya nusxalarini doim issiq (warm) holatda saqlashni buyuradi yoki ping-triggerlar orqali funksiya o'chib qolishining oldi olinadi."
  },
  {
    "id": 6,
    "question": "Serverless (FaaS) to'lov tizimi (pricing model) qanday ishlaydi?",
    "options": [
      "Serverning oylik ijarasi uchun qat'iy belgilangan narx to'lanadi",
      "Faqat funksiya ishga tushgan (bajarilgan) millisoniyalar va foydalanilgan xotira hajmi uchun to'lanadi (Pay-as-you-go)",
      "So'rovlar sonidan qat'i nazar faqat yuklangan kod hajmi (Megabayt) uchun to'lanadi",
      "Tizimdan foydalanish mutlaqo bepul"
    ],
    "correctAnswer": 1,
    "explanation": "Serverless-da siz server bo'sh turgan vaqti uchun pul to'lamaysiz. To'lov faqat funksiya real ish bajargan vaqti va resurslariga qarab hisoblanadi."
  },
  {
    "id": 7,
    "question": "Serverless funksiyalarda nima uchun holatni (State) global o'zgaruvchilarda doimiy saqlash tavsiya etilmaydi?",
    "options": [
      "Chunki global o'zgaruvchilar xotirani buzadi",
      "Chunki serverless funksiyalar faqat satrli ma'lumotlarni qabul qiladi",
      "Chunki xavfsizlik nuqtai nazaridan global o'zgaruvchilar taqiqlangan",
      "Chunki FaaS funksiyalari stateless (holatsiz) bo'lib, har bir so'rovda yangi konteyner yaratilishi yoki mavjudlari ixtiyoriy ravishda yo'q qilinishi mumkin"
    ],
    "correctAnswer": 3,
    "explanation": "FaaS funksiyalari stateless ishlashi kerak. Holatni (masalan, seanslarni) saqlash uchun tashqi xizmatlar (Redis, DynamoDB, PostgreSQL) ishlatilishi lozim."
  },
  {
    "id": 8,
    "question": "API Gateway-ning serverless arxitekturadagi o'rni qanday?",
    "options": [
      "Mijozdan kelgan HTTP so'rovlarni qabul qilib, ularni mos FaaS funksiyalari uchun event-ga aylantiradi va yo'naltiradi",
      "Faqat ma'lumotlar bazasini himoya qiladi",
      "JavaScript kodini avtomatik ravishda C++ kodiga o'zgartiradi",
      "Konteynerlarni doimiy ravishda isitib turuvchi asosiy server hisoblanadi"
    ],
    "correctAnswer": 0,
    "explanation": "API Gateway kiruvchi HTTP/REST so'rovlarni qabul qilib, ularni tegishli serverless funksiyalarga marshrutlaydi va javoblarni mijozga qaytaradi."
  },
  {
    "id": 9,
    "question": "Qaysi holatda an'anaviy Monolit arxitektura Mikroxizmatlarga qaraganda afzalroq tanlov hisoblanadi?",
    "options": [
      "Loyiha juda katta va yuzlab dasturchilar ishlayotgan bo'lsa",
      "Loyiha hali boshlang'ich (MVP) bosqichida, jamoa kichik va tezkor o'zgarishlar talab qilinganda",
      "Tizim har bir modulining alohida texnologiyada yozilishi shart bo'lsa",
      "Faqat asinxron ma'lumotlar uzatish kerak bo'lganda"
    ],
    "correctAnswer": 1,
    "explanation": "Monolit arxitektura kichik jamoalarga loyihani tez boshlash va murakkab taqsimlangan tizim arxitekturasini yaratish xarajatlaridan qochish imkonini beradi."
  },
  {
    "id": 10,
    "question": "Mikroxizmatlar orasidagi asinxron aloqalarni yo'lga qo'yishda qaysi texnologiyalar eng ko'p qo'llaniladi?",
    "options": [
      "HTML5 va LocalStorage",
      "Faqat sinxron REST API so'rovlari",
      "Message Broker-lar (masalan, RabbitMQ, Apache Kafka, AWS SQS)",
      "Virtual DOM texnologiyasi"
    ],
    "correctAnswer": 2,
    "explanation": "Xizmatlarning bir-biriga bog'lanib qolmasligi (loose coupling) uchun xabarlar brokeri yordamida voqealarga asoslangan (event-driven) asinxron aloqa o'rnatiladi."
  },
  {
    "id": 11,
    "question": "FaaS funksiyalaridagi Ephemeral Storage (vaqtinchalik xotira) nima?",
    "options": [
      "Funksiya bajarilayotgan vaqtda mavjud bo'lgan, ammo funksiya to'xtagach o'chib ketadigan mahalliy vaqtinchalik xotira (/tmp papkasi)",
      "Hech qachon o'chib ketmaydigan bulutli saqlash ombori",
      "Brauzerning localStorage qismi",
      "Faqat rasmlarni saqlash uchun mo'ljallangan operativ xotira"
    ],
    "correctAnswer": 0,
    "explanation": "FaaS muhitlari odatda cheklangan hajmdagi vaqtinchalik mahalliy saqlash fayl tizimini (/tmp) taqdim etadi. Konteyner yopilishi bilan bu ma'lumotlar yo'qoladi."
  },
  {
    "id": 12,
    "question": "Serverless FaaS funksiyalarining eng asosiy texnik cheklovlaridan biri nima?",
    "options": [
      "Hech qanday dasturlash tilini qo'llab-quvvatlamasligi",
      "Maksimal ishlash vaqtining cheklanganligi (masalan, ko'plab platformalarda 15 daqiqa atrofida)",
      "Faqat bitta foydalanuvchi so'roviga xizmat ko'rsata olishi",
      "Faqat 1 KB gacha bo'lgan hajmdagi fayllarni qabul qilishi"
    ],
    "correctAnswer": 1,
    "explanation": "FaaS funksiyalari qisqa muddatli vazifalar uchun mo'ljallangan bo'lib, odatda maksimal ishlash vaqti (execution timeout) cheklangan (AWS Lambda-da 15 daqiqa)."
  }
]

};

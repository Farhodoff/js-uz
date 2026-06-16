## 1. 💡 Sodda Tushuntirish va Analogiya

Tasavvur qiling, siz **katta restoran** ochmoqchisiz:

1. **Monolit (Monolithic) arxitektura:** Siz bitta katta bino qurasiz. U yerda oshpaz, kassir, farrosh, hisobchi — hamma bitta zalda ishlaydi. Agar oshpaz kasal bo'lsa yoki oshxonada gaz o'chib qolsa, butun restoran faoliyati to'xtaydi. Barcha xodimlar bir-biriga juda bog'langan.
2. **Mikroxizmatlar (Microservices) arxitekturasi:** Siz restoranni mustaqil bo'limlarga bo'lasiz. Taom tayyorlash alohida bino/xonada, yetkazib berish alohida filialda, buxgalteriya esa masofadan ishlaydi. Ular bir-biri bilan faqat telefon (API) orqali gaplashadi. Agar yetkazib berish bo'limi to'xtab qolsa ham, zalda taom berish davom etaveradi.
3. **Serverless (FaaS - Function as a Service):** Sizda umuman doimiy ishlovchi oshxona yoki xodimlar yo'q. Faqat buyurtma kelganda, tashqaridan "frilanser" oshpaz kelib taomni tayyorlaydi va ketadi. Restoran faqat tayyorlangan taom soniga qarab haq to'laydi. Oshxona bo'sh turganda hech qanday xarajat bo'lmaydi.

---

## 2. 💻 Real Kod Misollari

Quyida serverless funksiyalar va mikroxizmatlar kontekstini tushunish uchun sodda JavaScript kodlari keltirilgan:

### Misol 1: AWS Lambda uslubidagi Serverless Handler
Serverless funksiyalar hodisalarga (Events) asoslanib ishlaydi:

```javascript
// Serverless funksiya faqat so'rov kelganda ishga tushadi
exports.handler = async (event) => {
  console.log("So'rov kelib tushdi:", event.path);

  const body = event.body ? JSON.parse(event.body) : {};
  const name = body.name || "Mehmon";

  // Standart API Gateway formatidagi javob
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: `Salom, ${name}!` }),
  };
};
```

### Misol 2: Stateless vs Stateful (State boshqaruvi)
Serverless funksiyalar xotirada ma'lumot saqlamaydi (Stateless). Quyidagi kod noto'g'ri va to'g'ri yo'llarni ko'rsatadi:

```javascript
// ❌ NOTO'G'RI: FaaS konteyneri istalgan vaqtda o'chishi mumkin
let requestCount = 0; 
exports.handler = async (event) => {
  requestCount++; // Bu o'zgaruvchi keyingi so'rovlarda kafolatlanmagan!
  return { statusCode: 200, body: `Jami so'rovlar: ${requestCount}` };
};

//  TO'G'RI: Tashqi ma'lumotlar omboridan (Redis/Database) foydalanish
const redis = require("redis-client"); // Shartli kutubxona
exports.handler = async (event) => {
  const count = await redis.incr("global_request_count");
  return { statusCode: 200, body: `Jami so'rovlar: ${count}` };
};
```

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
Funksiya bajarilayotgan vaqtda fayllarni vaqtincha yozish uchun beriladigan `/tmp` papkasi. U faqat bitta chaqiruv davomida mavjud bo'ladi.

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

```mermaid
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
```

---

## 10. 📌 Cheat Sheet

| Mezbonlik modeli | Infratuzilma nazorati | Masshtablash tezligi | Narx modeli | Eng yaxshi foydalanish |
| :--- | :--- | :--- | :--- | :--- |
| **Monolit (Bare Metal / VM)** | To'liq nazorat sizda | Sekin (daqiqalar/soatlar) | Ruxsat etilgan oylik ijara | MVP bosqichi, sodda loyihalar |
| **Mikroxizmatlar (Docker / K8s)** | Konteynerlar darajasida | O'rtacha (soniyalar/daqiqalar) | Konteynerlar soniga qarab | Katta loyihalar, yuqori yuklama |
| **Serverless (FaaS)** | Provayder tomonidan boshqariladi | Zudlik bilan (millisoniyalar) | Faqat real ishlagan vaqtga | Voqealarga asoslangan API, fon ishlari |

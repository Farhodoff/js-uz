export const apiGatewayRouting = {
  id: "apiGatewayRouting",
  title: "API Gateway va Routing",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

Tizim dizaynida (System Design) **API Gateway** butun tizimning "darvozaboni" yoki "kirish eshigi" hisoblanadi. Mikroxizmatlar (microservices) dunyosida har bir xizmat (masalan, foydalanuvchilar xizmati, to'lovlar xizmati) o'z domeniga va portiga ega. Agar API Gateway bo'lmasa, mijoz (klient) dasturi har bir servisning manzilini bilishi va ularga to'g'ridan-to'g'ri ulanishi kerak bo'ladi. Bu esa xavfsizlik va boshqaruv jihatidan juda katta muammolarni keltirib chiqaradi.

### Real hayotiy o'xshatish:
Tasavvur qiling, siz **yirik aeroportga** keldingiz:
* **API Gateway bo'lmaganda (Monolit yoki To'g'ridan-to'g'ri ulanish):** Siz samolyotga chiqish uchun pasport nazoratidan alohida eshikda, yuk topshirish uchun boshqa ko'chadagi binoda va xavfsizlik tekshiruvidan butunlay boshqa binoda o'tishingiz kerak bo'lardi. Har bir joyda pasportingizni qayta-qayta tekshirishardi.
* **API Gateway bo'lganda:** Aeroportda bitta **katta markaziy terminal (Gateway)** bor. Siz terminal eshigidan kirasiz. Xavfsizlik va hujjat tekshiruvi (SSL Termination va JWT Validation) shu yerda bir marta amalga oshiriladi. Shundan so'ng terminal ichidagi yo'laklar orqali tegishli samolyotga (Routing) yo'naltirilasiz.

---

## 2. 💻 Real Kod Misollari

Node.js va Express yordamida sodda API Gateway routing va SSL Termination simulyatsiyasi:

\`\`\`javascript
const express = require('express');
const app = express();

// 1. CORS Dynamic Policy
const ALLOWED_ORIGINS = ['https://my-app.com', 'https://admin.my-app.com'];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 2. Correlation ID & Tracing Middleware
app.use((req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || \`corr-\${Math.random().toString(36).substr(2, 9)}\`;
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);
  console.log(\`[LOG] [\${correlationId}] Incoming: \${req.method} \${req.url}\`);
  next();
});

// 3. Simple JWT Validation & Token Exchange (Edge Security)
const mockValidateJWTAndExchange = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Avtorizatsiyadan o\\'tilmagan' });
  }
  
  const token = authHeader.split(' ')[1];
  if (token === 'valid-user-token') {
    // Token Exchange: Tashqi JWT tokenni ichki mikroxizmatlar uchun xavfsiz headerga o'tkazish
    req.headers['x-user-id'] = 'user-123';
    req.headers['x-user-role'] = 'customer';
    delete req.headers.authorization; // Tashqi tokenni o'chirib tashlaymiz
    return next();
  }
  return res.status(403).json({ error: 'Yaroqsiz token' });
};

// 4. Path-based Routing
const UPSTREAM_SERVICES = {
  users: 'http://internal-user-service:3001',
  orders: 'http://internal-order-service:3002'
};

app.use('/api/v1/users', mockValidateJWTAndExchange, (req, res) => {
  console.log(\`[LOG] [\${req.correlationId}] Routing to Users Upstream: \${UPSTREAM_SERVICES.users}\${req.url}\`);
  res.json({ message: 'User Service-dan javob', user: req.headers['x-user-id'] });
});

app.listen(8080, () => {
  console.log('API Gateway 8080 portida ishga tushdi');
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### API Gateway mas'uliyatlari:
1. **SSL Termination (SSL shifrlashni tugatish):** Mijoz va API Gateway o'rtasidagi trafik shifrlangan (HTTPS/TLS) bo'ladi. API Gateway bu shifrlangan ulanishni yechadi (tugatadi) va ichki tarmoqdagi mikroxizmatlarga shifrlanmagan (HTTP) oddiy va tezkor so'rov yuboradi. Bu backend serverlardagi protsessor (CPU) yuklamasini kamaytiradi.
2. **CORS Policies:** Brauzerlar xavfsizligi uchun CORS (Cross-Origin Resource Sharing) sarlavhalari Gateway darajasida boshqariladi. Har bir mikroxizmat alohida CORS sozlashiga hojat qolmaydi.
3. **Logging & Tracing:** Gateway har bir so'rovga noyob **Correlation ID** (so'rov identifikatori) yopashtiradi. Ushbu ID so'rov barcha backend mikroxizmatlar bo'ylab yurganda loglarda birga uzatiladi, bu esa xatolarni kuzatishni osonlashtiradi.
4. **Edge Security:** Tashqi foydalanuvchining JWT tokeni kirishda tekshiriladi va xavfsiz ichki token yoki headerga almashtiriladi (**Token Exchange**). Ichki mikroxizmatlar og'ir kriptografik tekshiruvlarni bajarmaydi.

### Marshrutlash strategiyalari (Routing Strategies):
* **Path-based (Yo'lga asoslangan):** So'rov yo'li (URL path) bo'yicha yo'naltirish. Masalan, \`/api/users\` -> \`User Service\`, \`/api/orders\` -> \`Order Service\`.
* **Host-based (Xostga asoslangan):** So'rov kelgan domen (Host header) bo'yicha yo'naltirish. Masalan, \`api.dastur.uz\` -> \`Main API Service\`, \`admin.dastur.uz\` -> \`Admin Console Service\`.
* **Header-based (Sarlavhaga asoslangan):** Maxsus HTTP sarlavhalari (masalan, \`X-Version: v2\` yoki \`X-User-Group: canary\`) bo'yicha yo'naltirish. Canary/AB testlar uchun keng qo'llaniladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Gateway-da Biznes Mantiq yozish:** Eng keng tarqalgan xato. API Gateway ichida ma'lumotlar bazasiga ulanish yoki murakkab hisob-kitoblar (biznes mantiq) yozilmasligi kerak. Gateway faqat tranzit va marshrutlovchi komponent bo'lib qolishi shart.
2. **Correlation ID ni uzatishni unutish:** Mikroxizmatlarda xato yuz berganda qaysi so'rov sabab bo'lganini bilish qiyin bo'ladi. Har doim ichki so'rovlarga \`X-Correlation-ID\` sarlavhasini qo'shib yuborish lozim.
3. **CORS qoidalarini * (hamma uchun) qilib qo'yish:** Ishlab chiqish (Development) vaqtida oson bo'lishi uchun \`Access-Control-Allow-Origin: *\` qo'yiladi. Production muhitida bu juda katta xavfsizlik xatosi hisoblanadi.

---

## 5. 💬 12 ta Intervyu Savollari

1. **SSL Termination nima va u qanday foyda keltiradi?**
   HTTPS ulanishini API Gateway-da tugatib, ichki tarmoqda HTTP-dan foydalanish. Bu ichki serverlar CPU resursini tejaydi va sertifikatlar boshqaruvini osonlashtiradi.

2. **Canary Deployment-da API Gateway qanday rol o'ynaydi?**
   Gateway foydalanuvchilarning ma'lum foizini (masalan, 5%) \`X-User-Group\` sarlavhasi yoki cookie asosida yangi versiyaga yo'naltiradi.

3. **Token Exchange patterni nima?**
   Tashqi shifrlangan JWT tokenni API Gateway-da tekshirib, ichki mikroxizmatlar tushunadigan soddaroq (va xavfsiz ichki tarmoqdagi) ma'lumotlar formatiga (masalan, \`X-User-Id\` headeri) aylantirish.

4. **Edge Security deganda nima tushuniladi?**
   Xavfsizlik choralarini (DDoS himoya, IP qora ro'yxat, Auth, Rate limit) ichki tarmoqqa kirmasdan, eng chekka nuqtada (Gateway-da) hal qilish.

5. **Path-based va Host-based routing farqi nimada?**
   Path-based yo'lga ko'ra (\`/users\`), Host-based esa domenga ko'ra (\`users.api.com\`) yo'naltiradi.

6. **Correlation ID loglarni tahlil qilishda nega kerak?**
   Tizim tarqoq bo'lgani sababli, bitta foydalanuvchi so'rovi 5 ta servisga borishi mumkin. Correlation ID yordamida barcha 5 ta servis loglarini bitta zanjirga birlashtirish mumkin.

7. **API Gateway va Reverse Proxy (masalan, Nginx) farqi nimada?**
   Nginx ko'proq L4/L7 routing va keshlash uchun ishlatiladi. API Gateway esa ko'proq dasturiy mantiq (Auth, Token Exchange, Custom Plugins) bilan integratsiya qilinadi.

8. **CORS nima va nega uni Gateway-da sozlash qulay?**
   Brauzerdan boshqa domendagi resurslarni so'rashni cheklovchi xavfsizlik qoidasi. Gateway-da bir marta sozlash orqali barcha backend xizmatlarini CORS muammolaridan qutqarish mumkin.

9. **API Gateway-da qanday qilib Single Point of Failure (SPOF) ning oldi olinadi?**
   Gateway serverlarini bir nechta nusxada (Active-Active) ishlatish va ularning oldiga tarmoq yuk taqsimlovchisini (Load Balancer) qo'yish orqali.

10. **Tashqi va Ichki API Gateway farqi nimada?**
    Tashqi Gateway internetdan keladigan trafigi qabul qiladi. Ichki Gateway (yoki Service Mesh) mikroxizmatlar orasidagi ichki aloqalarni tartibga soladi.

11. **API Gateway-da retry policies (qayta urinishlar) qanday xavf tug'dirishi mumkin?**
    Agar upstream xizmat haddan tashqari yuklangan bo'lsa va Gateway har bir muvaffaqiyatsiz so'rovni 3 martadan qayta urinsa, bu "DDoS" effektini keltirib chiqarib, tizimni butunlay qulatishi mumkin.

12. **Ingress Controller nima?**
    Kubernetes muhitida tashqi trafigi klaster ichidagi xizmatlarga yo'naltiruvchi maxsus API Gateway turi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Ushbu mashqlarda siz quyidagi real API Gateway vazifalarini yaratasiz:
1. HTTPS/SSL so'rovini yechuvchi va shifrsiz so'rov formatiga o'tkazuvchi simulyator.
2. Kelgan URL yo'liga qarab upstream servis manzilini aniqlovchi marshrutizator.
3. CORS sarlavhalarini dinamik ravishda to'g'ri shakllantiruvchi tizim.

---

## 7. 📝 12 ta Mini Test

Bilimingizni tekshirish uchun testlarni yeching.

---

## 8. 🎯 Real Project Case Study

### Netflix API Gateway (Zuul / Spring Cloud Gateway)
Netflix-ga soniyasiga millionlab so'rovlar kelib tushadi. Ularning arxitekturasida API Gateway markaziy rol o'ynaydi. Tizim foydalanuvchi qurilmasiga qarab (Smart TV, Telefon, Brauzer) so'rovlarni optimallashtiradi. Agar foydalanuvchi mobil ilovadan kirsa, Gateway dynamic payload compression va image resizing-ni amalga oshirishi yoki so'rovlarni bitta paketga yig'ishi (Request Aggregation) mumkin. Bu esa mobil tarmoqdagi kechikishlarni kamaytiradi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as Client App (Browser)
    participant GW as API Gateway (HTTPS Termination)
    participant Auth as Auth Service (JWT check)
    participant UserSvc as User Service (HTTP Private)

    Client->>GW: HTTPS Request (JWT token, encrypted)
    Note over GW: SSL Termination:<br/>Decrypt TLS/SSL traffic
    GW->>Auth: Validate JWT
    Auth-->>GW: OK (User Info: ID 99)
    Note over GW: Token Exchange:<br/>Strip JWT, add X-User-Id: 99
    GW->>UserSvc: HTTP Request (X-User-Id: 99)
    UserSvc-->>GW: User Profile Data
    GW-->>Client: HTTPS Response (encrypted)
\`\`\`

---

## 10. 📌 Cheat Sheet

| Vazifa | Nima qiladi? | Nega muhim? |
| :--- | :--- | :--- |
| **SSL Termination** | HTTPS ni yechadi, ichkariga HTTP yuboradi | Backend CPU yuklamasini kamaytiradi |
| **Correlation ID** | Har bir so'rovga noyob ID beradi | Loglarni bir-biriga bog'lab kuzatish (Tracing) |
| **Token Exchange** | JWT -> X-User-Id va X-Role | Ichki servislar xavfsiz va sodda ishlaydi |
| **Canary Routing** | Maxsus header orqali 5% foydalanuvchini v2 ga yo'naltiradi | Xavfsiz yangi versiyani sinab ko'rish |
`,
  exercises: [
  {
    "id": 1,
    "title": "SSL Termination Simulator",
    "instruction": "API Gateway darajasida SSL termination jarayonini simulyatsiya qiluvchi `terminateSSL(request)` funksiyasini yozing. Kelgan `request` obyektida `secure: true` bo'lsa, uni `false` ga o'zgartiring, `protocol` ni `'http'` qiling, hamda `headers` ichiga `x-forwarded-proto: 'https'` va `x-forwarded-port: '443'` qiymatlarini qo'shing. Agar `secure` false bo'lsa, so'rovni o'zgartirmasdan qaytaring.",
    "startingCode": "function terminateSSL(request) {\n  // Kodni shu yerda yozing\n}",
    "hint": "request.secure true bo'lsa, request.secure = false, request.protocol = 'http' deb o'zgartiring va headers obyektini tekshirib yangi sarlavhalarni qo'shing.",
    "test": "const sandbox = new Function(code + '; return terminateSSL;');\nconst fn = sandbox();\nconst req1 = { secure: true, protocol: 'https', headers: {} };\nconst res1 = fn(req1);\nif (res1.secure !== false || res1.protocol !== 'http' || res1.headers['x-forwarded-proto'] !== 'https') {\n  return 'SSL Termination to\\'g\\'ri bajarilmadi!';\n}\nconst req2 = { secure: false, protocol: 'http', headers: {} };\nconst res2 = fn(req2);\nif (res2.secure !== false || res2.headers['x-forwarded-proto'] !== undefined) {\n  return 'Secure bo\\'lmagan so\\'rov o\\'zgartirilmasligi kerak!';\n}\nreturn null;"
  },
  {
    "id": 2,
    "title": "Path-based Request Router",
    "instruction": "Kelgan URL yo'liga qarab eng uzun mos keluvchi upstream xizmatini aniqlaydigan `routeRequest(path, routes)` funksiyasini yozing. `routes` obyekti `{ prefix: upstreamUrl }` formatida bo'ladi. Eng uzun mos keluvchi prefix topilib, uning upstreamUrl manzili qaytarilishi kerak. Agar birorta ham prefix mos kelmasa, `null` qaytaring.",
    "startingCode": "function routeRequest(path, routes) {\n  // Kodni shu yerda yozing\n}",
    "hint": "routes obyektining kalitlarini (prefix) aylanib chiqing. path berilgan prefix bilan boshlanishini (startsWith) tekshiring va eng uzun mos kelgan kalitning qiymatini aniqlang.",
    "test": "const sandbox = new Function(code + '; return routeRequest;');\nconst fn = sandbox();\nconst routes = {\n  '/api': 'http://main-service',\n  '/api/v1/users': 'http://user-service',\n  '/api/v1/orders': 'http://order-service'\n};\nif (fn('/api/v1/users/profile', routes) !== 'http://user-service') return 'Eng uzun mos kelgan yo\\'nalish topilmadi!';\nif (fn('/api/v2/products', routes) !== 'http://main-service') return 'Boshlang\\'ich qisqa yo\\'nalish mos kelmadi!';\nif (fn('/other', routes) !== null) return 'Mos kelmagan yo\\'nalish uchun null qaytarishi kerak!';\nreturn null;"
  },
  {
    "id": 3,
    "title": "CORS Dynamic Parser",
    "instruction": "API Gateway-ga so'rov yuborgan mijozning `origin` sarlavhasiga qarab CORS javob sarlavhasini shakllantiruvchi `parseCORS(origin, allowedOrigins)` funksiyasini yozing. Agar `allowedOrigins` massivida `*` belgisi bo'lsa, origin qanday bo'lishidan qat'iy nazar `'*'` qaytarsin. Agar `origin` ruxsat etilgan ro'yxatda bo'lsa, o'sha `origin` qiymatini, aks holda `null` qaytarsin.",
    "startingCode": "function parseCORS(origin, allowedOrigins) {\n  // Kodni shu yerda yozing\n}",
    "hint": "allowedOrigins.includes('*') bo'lsa darhol '*' qaytaring. Aks holda allowedOrigins.includes(origin) shartini tekshiring.",
    "test": "const sandbox = new Function(code + '; return parseCORS;');\nconst fn = sandbox();\nif (fn('https://my-app.com', ['*']) !== '*') return 'Wildcard (*) tekshiruvi xato';\nif (fn('https://my-app.com', ['https://my-app.com', 'https://api.com']) !== 'https://my-app.com') return 'Mavjud origin tekshiruvi xato';\nif (fn('https://malicious.com', ['https://my-app.com']) !== null) return 'Taqiqlangan origin uchun null qaytishi kerak';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "API Gateway-ning mikroxizmatlar tizimidagi eng asosiy roli nima?",
    "options": [
      "Ma'lumotlar bazasini boshqarish va SQL so'rovlarni optimallashtirish",
      "Mijoz so'rovlarini qabul qiluvchi va ularni mos servisga yo'naltiruvchi yagona kirish nuqtasi bo'lish",
      "Faqat CSS va rasm fayllarini keshlab saqlash",
      "Klient brauzerini avtomatik yangilash"
    ],
    "correctAnswer": 1,
    "explanation": "API Gateway barcha tashqi mijozlar uchun yagona kirish eshigi bo'lib, xavfsizlik, marshrutlash (routing) va yuk taqsimlashni bitta joyda boshqaradi."
  },
  {
    "id": 2,
    "question": "SSL Termination qanday ishlaydi?",
    "options": [
      "Trafik butun yo'l davomida (mijozdan tortib mikroxizmatgacha) HTTPS orqali shifrlanadi",
      "HTTPS shifrlangan trafigi Gateway darajasida yechilib, ichki tarmoqqa HTTP (shifrsiz) ko'rinishida uzatiladi",
      "SSL sertifikatlarini butunlay o'chirib tashlash va faqat shifrsiz ulanishni majburlash",
      "Mijoz brauzerida xavfsizlik sertifikatini avtomatik o'rnatish"
    ],
    "correctAnswer": 1,
    "explanation": "SSL Termination HTTPS so'rovini API Gateway-da yechib, ichki tarmoqdagi servislarga oddiy HTTP so'rovi sifatida yuborish orqali backend CPU yuklamasini kamaytiradi."
  },
  {
    "id": 3,
    "question": "Logging va Tracing-da Correlation ID nima uchun kerak?",
    "options": [
      "Tizimda foydalanuvchining login va parolini tekshirish uchun",
      "Bitta so'rov zanjiriga aloqador barcha mikroxizmatlar loglarini yagona ID orqali osongina kuzatish uchun",
      "Baza jadvallari orasidagi bog'liqlikni saqlash uchun",
      "Ma'lumotlarni siqish (compression) darajasini aniqlash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Correlation ID har bir so'rovga Gateway darajasida beriladigan noyob identifikatordir. U so'rovning barcha ichki xizmatlar bo'ylab o'tishini kuzatish imkonini beradi."
  },
  {
    "id": 4,
    "question": "Token Exchange patterni qanday vazifani bajaradi?",
    "options": [
      "JWT tokenni kriptovalyutaga almashtirish",
      "Tashqi og'ir JWT tokenni Gateway-da tekshirib, ichki tarmoq uchun sodda va xavfsiz identifikatorga (masalan, X-User-Id headeriga) o'tkazish",
      "Foydalanuvchi parolini qayta tiklash havolasini yuborish",
      "Faqat cookie fayllarini tozalash"
    ],
    "correctAnswer": 1,
    "explanation": "Token Exchange tashqi murakkab/shifrlangan tokenni Gateway-da tasdiqlab, ichki mikroxizmatlar tushunadigan soddaroq shaklga almashtirish orqali tizim unumdorligini oshiradi."
  },
  {
    "id": 5,
    "question": "Path-based routing qanday yo'nalishni amalga oshiradi?",
    "options": [
      "So'rov yuborilgan domenga qarab yo'naltiradi (masalan, api.dastur.uz)",
      "So'rov yuborilgan URL yo'liga qarab yo'naltiradi (masalan, /users -> User Service)",
      "Foydalanuvchining jismoniy joylashuviga (IP manziliga) qarab yo'naltiradi",
      "So'rov hajmi (payload size) bo'yicha yo'naltiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Path-based routing URL yo'lidagi prefiksga qarab so'rovni tegishli ichki xizmatga yo'naltiradi."
  },
  {
    "id": 6,
    "question": "Gateway-da CORS qoidalarini sozlashning asosiy afzalligi nimada?",
    "options": [
      "Tizimning ishlash tezligini 2 barobarga oshirishi",
      "Har bir mikroxizmat uchun alohida CORS sarlavhalarini sozlab chiqish majburiyatini yo'qotishi",
      "Ma'lumotlar bazasini SQL ineksiyalaridan avtomatik himoya qilishi",
      "Faqat POST so'rovlarini qabul qilishi"
    ],
    "correctAnswer": 1,
    "explanation": "CORS qoidalari Gateway-da markazlashgan holda bir marta sozlansa, backend mikroxizmatlar bu sozlamadan xavotir olmasdan faqat o'z biznes mantig'iga e'tibor qaratadi."
  },
  {
    "id": 7,
    "question": "Edge Security deganda nima tushuniladi?",
    "options": [
      "Faqat Microsoft Edge brauzeri uchun xavfsizlikni ta'minlash",
      "Xavfsizlik choralarini (DDoS himoya, IP filter, Auth, Rate limiting) tizimning eng chekka kirish nuqtasida (Gateway) hal qilish",
      "Ma'lumotlar bazasida parollarni shifrlab saqlash",
      "Faqat ichki serverlar orasidagi xavfsiz VPN aloqasi"
    ],
    "correctAnswer": 1,
    "explanation": "Edge Security xavfli va yaroqsiz so'rovlarni ichki tarmoqqa va servislarimizga kirmasdanoq eng chekkada (Edge/Gateway) aniqlab bloklaydi."
  },
  {
    "id": 8,
    "question": "Host-based routing qaysi HTTP sarlavhasi asosida ishlaydi?",
    "options": [
      "User-Agent sarlavhasi",
      "Host sarlavhasi (domen nomi)",
      "Authorization sarlavhasi",
      "Content-Type sarlavhasi"
    ],
    "correctAnswer": 1,
    "explanation": "Host-based routing mijoz yuborgan so'rovdagi `Host` sarlavhasini (masalan, `admin.dastur.com` yoki `api.dastur.com`) tahlil qilib yo'naltiradi."
  },
  {
    "id": 9,
    "question": "API Gateway-da retry policies (qayta urinishlar) bilan bog'liq eng katta xavf nima?",
    "options": [
      "So'rovning butunlay yo'qolib qolishi",
      "Yuklama ostidagi backend servisni yanada ko'proq so'rovlar bilan 'cho'ktirish' (Self-inflicted DDoS)",
      "Foydalanuvchi ma'lumotlarining xato o'zgarishi",
      "Faqat xotira yetishmasligi (Out of Memory)"
    ],
    "correctAnswer": 1,
    "explanation": "Agar upstream servis yuklama tufayli sekin ishlayotgan bo'lsa, Gateway-ning qayta-qayta urinishi (retry) u servisga tushadigan yuklamani yanada oshiradi va uni batamom to'xtatib qo'yishi mumkin."
  },
  {
    "id": 10,
    "question": "API Gateway va standart Load Balancer o'rtasidagi asosiy farq nimada?",
    "options": [
      "Load Balancer faqat mobil telefonlar uchun ishlaydi",
      "Load Balancer tarmoq darajasida yukni taqsimlaydi; API Gateway esa dastur darajasida (auth, routing, logging) biznes mantiqni tushunadi",
      "API Gateway hech qachon yukni taqsimlay olmaydi",
      "Ular mutlaqo bir xil vazifani bajaradigan sinonimlar hisoblanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Load Balancer L4/L7 darajasida yukni oddiy taqsimlasa, API Gateway foydalanuvchi identifikatori, CORS, tokenlar va marshrutlash kabi amaliy biznes jarayonlarni boshqaradi."
  },
  {
    "id": 11,
    "question": "Header-based routing asosan qachon qo'llaniladi?",
    "options": [
      "Faqat rasmlarni siqib yuklashda",
      "Canary deploy yoki A/B testlarda foydalanuvchilar guruhini aniqlab yo'naltirishda",
      "Baza jadvallarini bir-biriga ulashda",
      "Faqat GET so'rovlarini POST-ga o'zgartirishda"
    ],
    "correctAnswer": 1,
    "explanation": "Header-based routing so'rovning sarlavhalaridagi (masalan, `X-Version` yoki `X-User-Group`) ma'lumotlarga qarab, foydalanuvchini canary/beta yoki eski versiyaga yo'naltirish uchun juda qulay."
  },
  {
    "id": 12,
    "question": "Kubernetes muhitidagi Ingress Controller nima?",
    "options": [
      "Faqat loglarni yig'ib beruvchi vizual panel",
      "Tashqi HTTPS/HTTP trafigini Kubernetes klasteri ichidagi xizmatlarga yo'naltiruvchi va boshqaruvchi API Gateway turi",
      "Ma'lumotlar bazasining zaxira nusxalarini oluvchi vosita",
      "Konteynerlar ichidagi xotirani tozalovchi dasturcha"
    ],
    "correctAnswer": 1,
    "explanation": "Ingress Controller Kubernetes olamidagi API Gateway vazifasini bajarib, klaster ichidagi Pod'larga tashqaridan kelgan yo'nalishlarni marshrutlaydi."
  }
]

};

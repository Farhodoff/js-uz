export const security = {
  id: "security",
  title: "Veb Xavfsizlik Asoslari (XSS, CSRF, CORS, HTTPS)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Veb Xavfsizlik Asoslari nima?
Veb-ilovalarni yaratishda xavfsizlik eng muhim qismlardan biridir. Agar xavfsizlik choralari ko'rilmasa, buzg'unchilar foydalanuvchilarning shaxsiy ma'lumotlarini o'g'irlashi, hisoblarini egallashi yoki server ishini buzishi mumkin. Veb xavfsizlikning eng asosiy to'rtta ustuni:
* **XSS (Cross-Site Scripting):** Saytga begona zararli JavaScript kodlarini kiritish va ishga tushirish hujumi.
* **CSRF (Cross-Site Request Forgery):** Foydalanuvchining ruxsatisiz va bilmasdan uchinchi tomon saytidan uning nomidan so'rovlar yuborish hujumi.
* **CORS (Cross-Origin Resource Sharing):** Bir saytdan boshqa saytdagi resurslarni so'rash huquqini tartibga soluvchi brauzer qoidasi.
* **HTTPS:** Mijoz (brauzer) va server o'rtasidagi ma'lumotlar almashinuvini shifrlangan tarza himoya qiluvchi protokol.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **bank binosida xizmat ko'rsatyapsiz**:
* **XSS:** Buzg'unchi mijozning e'lonlar doskasiga zararli ko'rsatma yozib ketadi. Boshqa kelgan mijozlar uni o'qib, o'z pullarini buzg'unchiga topshirib yuboradi.
* **CSRF:** Siz bankda o'tirganingizda, kimdir sizning qo'lingiz va imzoingizdan foydalanib yashirincha pul o'tkazish qog'ozini imzolab yuboradi. Siz bu haqida bilmay ham qolasiz.
* **CORS:** Bank xodimi faqat maxsus ruxsatnomasi bor mijozlargagina ichki arxiv xonalariga kirishga ruxsat beradi. Boshqa bank xodimlari kira olmaydi.
* **HTTPS:** Mijoz va kassir o'rtasidagi suhbat ochiq havoda emas, balki tovush o'tkazmaydigan shisha orqasida, maxsus shifrlangan aloqa qurilmasi yordamida amalga oshiriladi. Tashqaridan hech kim bu suhbatni eshita olmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (XSS ning oldini olish - Input sanitizatsiyasi)
Foydalanuvchi kiritgan har qanday HTML teglarni matn ko'rinishiga o'tkazib yuborish (Escaping):
\`\`\`javascript
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#x27;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Ishlatilishi:
const userInput = "<script>alert('xss')</script>";
const safeOutput = escapeHTML(userInput);

console.log(safeOutput); 
// Natija: &lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;
// Brauzer buni skript sifatida ishga tushirmaydi, shunchaki matn qilib ko'rsatadi.
\`\`\`

### 2. Intermediate Example (Express.js da CORS sarlavhalarini qo'lda sozlash)
Serverda ma'lum bir domenlargagina API so'rov yuborishga ruxsat berish:
\`\`\`javascript
const express = require('express');
const app = express();

const ALLOWED_ORIGINS = ['https://mytrustedapp.com', 'https://admin.mytrustedapp.com'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (ALLOWED_ORIGINS.includes(origin)) {
    // Ruxsat berilgan origin-ni sarlavhaga yozamiz
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
\`\`\`

### 3. Advanced Example (CSRF token tekshiruvi va Cookie xavfsizligi)
Server tomonida xavfsiz cookie yaratish va CSRF tokenni solishtirish:
\`\`\`javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// 1. Sessiyada xavfsiz cookie o'rnatish
app.get('/login', (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString('hex');
  
  // Cookie xavfsizlik sozlamalari
  res.cookie('csrfToken', csrfToken, {
    httpOnly: true,  // JS orqali o'qib bo'lmaydi (XSS dan himoya)
    secure: true,    // Faqat HTTPS da ishlaydi
    sameSite: 'strict' // Uchinchi tomon so'rovlarida yuborilmaydi (CSRF dan himoya)
  });
  
  res.send(\`
    <form action="/transfer" method="POST">
      <input type="hidden" name="_csrf" value="\${csrfToken}">
      <input type="text" name="amount" placeholder="Summa">
      <button type="submit">O'tkazish</button>
    </form>
  \`);
});

// 2. CSRF Tokenni solishtirish (Verification)
app.post('/transfer', (req, res) => {
  const cookieToken = req.cookies.csrfToken;
  const formToken = req.body._csrf;
  
  if (!cookieToken || !formToken || cookieToken !== formToken) {
    return res.status(403).send("XAVFSIZLIK XATOSI: CSRF token mos kelmadi!");
  }
  
  res.send("Pul muvaffaqiyatli o'tkazildi!");
});
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammolarni hal qiladi?
* **Sessiyani o'g'irlash (Session Hijacking):** Agar cookie fayllari \`HttpOnly\` qilinmasa, buzg'unchi XSS yordamida foydalanuvchining session ID yoki JWT tokenini o'g'irlab, uning nomidan tizimga kira oladi.
* **Mablag' yoki Ma'lumotlarni yo'qotish (CSRF):** Foydalanuvchi zararli saytga kirganda, u yerdagi yashirin skript orqali foydalanuvchining bank yoki ijtimoiy tarmoqdagi akkauntiga pul o'tkazish yoki parolni o'zgartirish so'rovi yuborilishi mumkin.
* **Ma'lumotlar shifrlanmasligi (Man-in-the-Middle):** Agar HTTP ishlatilsa, provayder yoki ochiq Wi-Fi tarmog'idagi buzg'unchilar foydalanuvchining login va parollarini ochiq matn ko'rinishida ko'ra oladilar. HTTPS barcha ma'lumotlarni shifrlab uzatadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`Access-Control-Allow-Origin: *\` ni hamma joyda ishlatish
#### Xato:
Katta loyihalarda yoki shaxsiy ma'lumotlar saqlanadigan API larda hamma domenlarga ruxsat berib yuborish.
#### To'g'ri usul:
Faqat o'zingizga tegishli ishonchli domenlargagina ruxsat bering va kerak bo'lsa serverda oq ro'yxat (Allowlist) ishlating.

### 2. Cookie fayllarini default (odatiy) sozlamalarda qoldirish
#### Xato:
Sessiya cookie fayllarini \`httpOnly: true\` va \`secure: true\` qilmasdan saqlash.
#### To'g'ri usul:
Maxfiy ma'lumotlar (JWT, Session ID) saqlanadigan cookie fayllariga har doim \`httpOnly: true\`, \`secure: true\` va \`sameSite: 'lax'\` (yoki \`'strict'\`) xossalarini qo'shish.

### 3. Matn chiqarishda \`innerHTML\` dan nazoratsiz foydalanish
#### Xato:
\`\`\`javascript
// Agar userInput ichida <img src=x onerror=alert(1)> bo'lsa, XSS ishga tushadi
document.getElementById('output').innerHTML = userInput;
\`\`\`
#### To'g'ri usul:
\`\`\`javascript
// textContent faqat matn sifatida chiqaradi va hech qanday skriptni ijro etmaydi
document.getElementById('output').textContent = userInput;
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** XSS nima va u qanday sodir bo'ladi?
   * **Javob:** XSS (Cross-Site Scripting) — buzg'unchi tomonidan sayt sahifasiga zararli JavaScript kodini kiritilishi. Brauzer uni oddiy kod deb o'ylab ishga tushirib yuboradi.
2. **Savol:** CSRF nima?
   * **Javob:** CSRF (Cross-Site Request Forgery) — foydalanuvchi avtorizatsiyadan o'tgan saytda, uchinchi tomon sayti yordamida uning nomidan yashirincha so'rov yuborish hujumi.
3. **Savol:** HTTP va HTTPS ning asosiy farqi nimada?
   * **Javob:** HTTP ma'lumotlarni ochiq ko'rinishda uzatadi, HTTPS esa SSL/TLS shifrlash protokoli yordamida ma'lumotlarni shifrlab, xavfsiz yetkazadi.
4. **Savol:** \`HttpOnly\` cookie nima?
   * **Javob:** Brauzerda JavaScript (\`document.cookie\`) orqali o'qib bo'lmaydigan, faqat HTTP so'rovlariga qo'shib yuboriladigan xavfsiz cookie fayli.

### Middle (5–8)
5. **Savol:** CORS nima va nima uchun brauzerda CORS error chiqadi?
   * **Javob:** CORS — xavfsizlik standarti bo'lib, u boshqa domendan resurs so'rashni cheklaydi. Server o'z javobida \`Access-Control-Allow-Origin\` sarlavhasini qaytarmasa brauzer so'rovni bloklaydi.
6. **Savol:** \`SameSite\` cookie atributi qanday vazifani bajaradi?
   * **Javob:** U cookie-larni uchinchi tomon saytlaridan kelayotgan so'rovlar bilan birga yuborilishini boshqaradi. Uning \`Strict\`, \`Lax\` va \`None\` qiymatlari bor.
7. **Savol:** CSP (Content Security Policy) nima va u qanday ishlaydi?
   * **Javob:** CSP — brauzerga qaysi manbalardan (domenlardan) JS, CSS yoki rasmlarni yuklashga ruxsat borligini ko'rsatuvchi sarlavha. U ruxsat etilmagan uchinchi tomon skriptlarini butunlay bloklaydi.
8. **Savol:** CORS va CSRF o'rtasidagi bog'liqlik yoki farq nimada?
   * **Javob:** CORS — bu API ni ruxsat etilmagan domenlardan o'qishdan himoya qiladi (read protection). CSRF esa foydalanuvchi nomidan yozish/so'rov yuborish (write/action) hujumidir. CORS bu CSRF dan to'liq himoya qilmaydi.

### Senior (9–12)
9. **Savol:** Preflight so'rovi (CORS dagi OPTIONS so'rovi) nima va u qachon yuboriladi?
   * **Javob:** Murakkab HTTP so'rovlari (masalan, PUT, DELETE, yoki \`Content-Type: application/json\` bo'lgan POST so'rovlari) yuborilishidan oldin, brauzer serverga avtomatik tarzda \`OPTIONS\` so'rovini yuborib ruxsat tekshiradi. Bunga Preflight deyiladi.
10. **Savol:** SQL Injection (SQLi) nima va uni Node.js/JS loyihalarida qanday bartaraf etish mumkin?
    * **Javob:** SQL query tarkibiga zararli ma'lumot kiritish orqali bazani manipulyatsiya qilish. Buni oldini olish uchun Parameterized Queries (ORMs/ODMs yoki query bindings) ishlatiladi, stringlarni ulab so'rov yozilmaydi.
11. **Savol:** XSS ni to'liq bloklash uchun ko'p bosqichli mudofaa (Defense-in-depth) qanday quriladi?
    * **Javob:** Kiruvchi ma'lumotlarni sanitizatsiya qilish, chiquvchi ma'lumotlarni escape qilish, cookies uchun \`HttpOnly\` ishlatish va qat'iy Content Security Policy (CSP) sarlavhalarini sozlash orqali.
12. **Savol:** JWT (JSON Web Token) ni LocalStorage da saqlash xavfsizroqmi yoki Cookie-dami?
    * **Javob:** LocalStorage XSS hujumiga o'ta zaif (JS orqali osongina o'qiladi). \`HttpOnly\` va \`Secure\` cookie esa XSS dan himoyalangan. Shuning uchun maxfiy JWT tokenlarni cookie-da saqlash xavfsizroq hisoblanadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Xavfsiz JWT (JSON Web Token) Auth Tizimi
Ko'plab loyihalarda JWT tokenlari noto'g'ri saqlanishi tufayli foydalanuvchilar akkauntlari o'g'irlanadi. Quyida tokenlarni xavfsiz saqlash arxitekturasi ko'rsatilgan.

#### Arxitektura:
1. **Access Token:** Qisqa umrga ega (masalan, 15 daqiqa) va uni xotirada (React state yoki JS o'zgaruvchisida) saqlaymiz. Uni JS o'qiy oladi, lekin sahifa yangilanganda o'chib ketadi.
2. **Refresh Token:** Uzoq umrga ega (masalan, 7 kun) va uni faqat \`HttpOnly\`, \`Secure\` va \`SameSite=Lax\` bo'lgan keshlanmaydigan Cookie-da saqlaymiz.
3. **Silent Refresh:** Sahifa yangilanganda yoki Access Token muddati tugaganda, brauzer orqa fonda Refresh Token yordamida yangi Access Token so'raydi.

#### Silent Refresh Server kodi:
\`\`\`javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const ACCESS_SECRET = "access_key_123";
const REFRESH_SECRET = "refresh_key_987";

// Login qilganda tokenlarni berish
app.post('/api/login', (req, res) => {
  // Foydalanuvchi tekshirilgandan so'ng:
  const userId = 101;
  
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
  
  // Refresh tokenni xavfsiz cookie ichiga joylaymiz
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, // faqat HTTPS da yuboriladi
    sameSite: 'strict',
    path: '/api/refresh' // faqat refresh API ga yuboriladi
  });
  
  // Access tokenni JS xotirasi uchun body-da qaytaramiz
  res.json({ accessToken });
});

// Yangi Access Token olish (Silent Refresh)
app.post('/api/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) return res.sendStatus(401);
  
  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    
    // Yangi access token yaratib qaytaramiz
    const newAccessToken = jwt.sign({ userId: decoded.userId }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **CORS So'rovlarini keshlar (CORS Caching):** Har safar murakkab so'rov oldidan OPTIONS (preflight) so'rovi ketmasligi uchun serverda \`Access-Control-Max-Age\` sarlavhasiga soniyalar hisobida qiymat (masalan, \`86400\` yoki 24 soat) berib qo'yish kerak. Bu tarmoq so'rovlari sonini kamaytiradi.
* **HTTPS yuklamasini kamaytirish:** Zamonaviy serverlarda TLS sessiyalarini keshlash (TLS Session Resumption) yoki HTTP/2-dan foydalanish HTTPS ulanish tezligini sezilarli darajada oshiradi.

---

## 10. 📌 Cheat Sheet

| Himoya vositasi / Atribut | Vazifasi | Qachon ishlatiladi |
| :--- | :--- | :--- |
| **\`HttpOnly\` Cookie** | JavaScript-ning cookie fayllarini o'qishini taqiqlaydi | XSS orqali token o'g'irlanishini oldini olishda |
| **\`Secure\` Cookie** | Faqat shifrlangan HTTPS ulanishda yuborilishini kafolatlaydi | Ochiq Wi-Fi va tarmoq kuzatuvchilaridan (MitM) himoyalanishda |
| **\`SameSite\` (Lax/Strict)** | Uchinchi tomon havolalarida cookie yuborilishini bloklaydi | CSRF hujumlaridan himoyalanishda |
| **HTML Escaping** | \`<\`, \`>\`, \`"\` kabi belgilarni zararsizlantiradi | Matnlarni sahifaga xavfsiz chiqarishda (XSS prevention) |
| **CORS Headers** | API ni qaysi domenlar o'qiy olishini belgilaydi | Tashqi saytlar ma'lumotlaringizni ruxsatsiz o'qimasligida |
| **CSP (Content Security Policy)** | Sahifaga faqat ishonchli skriptlar yuklanishini ta'minlaydi | XSS va clickjacking hujumlarini jilovlashda |
`,
  exercises: [
    {
      id: 1,
      title: "Xavfsiz matn chiqarish",
      instruction: "Berilgan 'userText' o'zgaruvchisini xavfsiz tarzda (textContent yordamida) 'output' elementiga joylang.",
      startingCode: "const userText = '<img src=x onerror=alert(1)>';\nconst output = document.createElement('div');\n\n// Xavfsiz usulda joylang\n",
      hint: "output.textContent = userText;",
      test: "if (code.includes('textContent')) return null; return 'textContent xususiyatidan foydalaning';"
    },
    {
      id: 2,
      title: "Oddiy Sanitizatsiya",
      instruction: "Matndan < va > belgilarini xavfsizga almashtiring.",
      startingCode: "function sanitize(input) {\n  // Bu yerga yozing\n}\n",
      hint: "return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');",
      test: "if (code.includes('replace')) return null; return 'Sanitizatsiya yoq';"
    },
    {
      id: 3,
      title: "CSRF Token Header",
      instruction: "POST so'rovda CSRF token header qo'shing.",
      startingCode: "const token = 'csrf-token';\nfetch('/api', {\n  method: 'POST',\n  headers: {\n    // Bu yerga token qo'shing\n  }\n});\n",
      hint: "'X-CSRF-Token': token",
      test: "if (code.includes('X-CSRF-Token')) return null; return 'CSRF header yoq';"
    },
    {
      id: 4,
      title: "SQL Injection'dan himoya",
      instruction: "Parametrli query yozing (string concatenation emas).",
      startingCode: "const email = 'a@b.com';\n// Bu yerga parametrli query\n// db.query('SELECT * FROM users WHERE email = ?', [email])\n",
      hint: "Parametrli query va massiv",
      test: "if (code.includes('?') && code.includes('[')) return null; return 'Parametrli query yoq';"
    },
    {
      id: 5,
      title: "Password hashing",
      instruction: "Parolni hash qiling (bcrypt).",
      startingCode: "async function hashPassword(password) {\n  // Bu yerga yozing\n}\n",
      hint: "return await bcrypt.hash(password, 10);",
      test: "if (code.includes('bcrypt.hash')) return null; return 'Hashing yoq';"
    },
    {
      id: 6,
      title: "HttpOnly cookie",
      instruction: "Tokenni HttpOnly cookie orqali yuboring.",
      startingCode: "const token = 'jwt';\n// res.setHeader(...) yozing\n",
      hint: "res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict`);",
      test: "if (code.includes('HttpOnly')) return null; return 'HttpOnly yoq';"
    },
    {
      id: 7,
      title: "CORS cheklash",
      instruction: "Faqat bitta domen uchun CORS ruxsat bering.",
      startingCode: "// res.setHeader(...) yozing\n",
      hint: "res.setHeader('Access-Control-Allow-Origin', 'https://example.com');",
      test: "if (code.includes('Access-Control-Allow-Origin')) return null; return 'CORS yoq';"
    },
    {
      id: 8,
      title: "Input validation",
      instruction: "Email bo'sh yoki noto'g'ri bo'lsa xato qaytaring.",
      startingCode: "function validateEmail(email) {\n  // Bu yerga yozing\n}\n",
      hint: "if (!email || !email.includes('@')) return false; return true;",
      test: "if (code.includes('includes')) return null; return 'Validatsiya yoq';"
    },
    {
      id: 9,
      title: "Auth vs AuthZ",
      instruction: "Admin bo'lmasa xato qaytaring.",
      startingCode: "function checkAdmin(user) {\n  // Bu yerga yozing\n}\n",
      hint: "if (!user || !user.isAdmin) throw new Error('Ruxsat yoq');",
      test: "if (code.includes('isAdmin')) return null; return 'Authorization yoq';"
    },
    {
      id: 10,
      title: "Rate limiting",
      instruction: "Bir IP uchun 5 martadan ko'p urinish bo'lsa bloklang.",
      startingCode: "const attempts = {};\nfunction rateLimit(ip) {\n  // Bu yerga yozing\n}\n",
      hint: "attempts[ip] = (attempts[ip] || 0) + 1; if (attempts[ip] > 5) return false;",
      test: "if (code.includes('attempts')) return null; return 'Rate limit yoq';"
    },
    {
      id: 11,
      title: "SameSite cookie",
      instruction: "Cookie'da SameSite=Strict qo'ying.",
      startingCode: "const token = 'jwt';\n// Set-Cookie yozing\n",
      hint: "SameSite=Strict",
      test: "if (code.includes('SameSite')) return null; return 'SameSite yoq';"
    },
    {
      id: 12,
      title: "XSSdan himoya render",
      instruction: "Foydalanuvchi matnini faqat textContent bilan render qiling.",
      startingCode: "const el = document.createElement('p');\nconst userInput = '<script>alert(1)</script>';\n// Bu yerga yozing\n",
      hint: "el.textContent = userInput;",
      test: "if (code.includes('textContent')) return null; return 'XSS xavfsiz render yoq';"
    },
    {
      id: 13,
      title: "Script Strip Sanitizer",
      instruction: "Foydalanuvchi kiritgan HTML matndan barcha '<script>...</script>' teglari va ularning ichidagi kodlarni regex orqali butunlay tozalab tashlovchi 'stripScripts(html)' funksiyasini yozing.",
      startingCode: "function stripScripts(html) {\n  // <script> teglarini butunlay o'chiruvchi regex yozing\n}",
      hint: "return html.replace(/<script[^>]*>([\\s\\S]*?)<\\/script>/gi, '');",
      test: "if (code.includes('replace') && (code.includes('script') || code.includes('/script/'))) return null;\nreturn 'stripScripts funksiyasida <script> teglarini o\\'chirish regexi ishlatilmadi';"
    },
    {
      id: 14,
      title: "Double-Submit Cookie CSRF Validator",
      instruction: "Tizimga kelgan HTTP request xavfsizligini ta'minlash uchun Double-Submit Cookie CSRF himoya middleware funksiyasini yozing. 'validateCSRF(req)' funksiyasi cookie-dagi 'csrfToken' qiymati request headerdagi 'X-CSRF-Token' qiymati bilan mavjudligini va tengligini tekshirsin hamda mos kelsa 'true', aks holda 'false' qaytarsin. Request obyekti 'headers' va 'cookies' obyektlariga ega bo'ladi.",
      startingCode: "function validateCSRF(req) {\n  // req.headers['x-csrf-token'] va req.cookies['csrfToken'] ni tekshiring\n}",
      hint: "const headerToken = req.headers['x-csrf-token'];\nconst cookieToken = req.cookies['csrfToken'];\nreturn !!(headerToken && cookieToken && headerToken === cookieToken);",
      test: "if (code.includes('headers') && code.includes('cookies') && (code.includes('x-csrf-token') || code.includes('X-CSRF-Token')) && (code.includes('csrfToken') || code.includes('csrf-token'))) return null;\nreturn 'validateCSRF funksiyasida header va cookie-dagi CSRF tokenlarini tekshirish to\\'g\\'ri yozilmadi';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "XSS (Cross-Site Scripting) nima?",
    "options": [
      "Serverdagi ma'lumotlar bazasini o'chirib yuboradigan SQL so'rovi",
      "Zararli buzg'unchi tomonidan veb-saytga (HTML sahifaga) begona JavaScript kodining joylashtirilishi va boshqa foydalanuvchilar brauzerida ushbu kodning ijro etilishi",
      "Sayt dizaynini buzuvchi CSS xatoligi",
      "Server ulanishini cheklovchi tarmoq hujumi"
    ],
    "correctAnswer": 1,
    "explanation": "XSS — bu foydalanuvchi kiritgan ma'lumotlar to'g'ri tekshirilmasdan sahifaga chiqarilishi oqibatida zararli JS skriptlarining ishga tushib ketishidir. Bu orqali cookie yoki session tokenlarni o'g'irlash mumkin."
  },
  {
    "id": 2,
    "question": "XSS hujumlaridan saqlanishning eng samarali yo'li nima?",
    "options": [
      "Faqat CSS dan foydalanish",
      "Foydalanuvchidan kelayotgan barcha ma'lumotlarni HTML entity ko'rinishiga o'tkazish (Sanitizing/Escaping) va ishonchsiz kodlarni ijro etmaslik",
      "Faqat server xotirasini oshirish",
      "Saytga kirishda parolni juda uzun qilish"
    ],
    "correctAnswer": 1,
    "explanation": "Matnlardagi `<`, `>`, `&` kabi maxsus belgilarni zararsizlantirish (escaping) orqali brauzer ularni skript emas, oddiy matn sifatida ko'rsatishini ta'minlaymiz."
  },
  {
    "id": 3,
    "question": "CSRF (Cross-Site Request Forgery) hujumi nima?",
    "options": [
      "Serverga juda ko'p so'rov yuborib uni qotirish",
      "Foydalanuvchining ma'lum bir saytda avtorizatsiyadan o'tganligidan foydalanib, uning ruxsatisiz uchinchi tomon saytidan zararli so'rovlarni yuborish (masalan, foydalanuvchi nomidan pul o'tkazish)",
      "Buzilgan parollarni taxmin qilib topish",
      "Sayt sahifalarini nusxalab olish"
    ],
    "correctAnswer": 1,
    "explanation": "CSRF — bu foydalanuvchi bilmagan holda uning nomidan (brauzerdagi faol sessiya/cookie yordamida) boshqa saytdan turib so'rov yuborish hujumidir."
  },
  {
    "id": 4,
    "question": "CSRF hujumlaridan himoyalanish uchun qaysi mexanizm keng qo'llaniladi?",
    "options": [
      "Faqat HTTPS protokoli",
      "Anti-CSRF (yoki CSRF) tokenlaridan foydalanish (har bir form/so'rov bilan server tomonidan berilgan bir martalik maxfiy tokenni solishtirish) va cookies uchun `SameSite` flagini yoqish",
      "Sinflarni keshlab qo'yish",
      "Tizimga faqat telefon orqali kirish"
    ],
    "correctAnswer": 1,
    "explanation": "CSRF tokenlar faqat foydalanuvchining o'z sahifasida mavjud bo'lgani uchun, zararli uchinchi tomon sayti bu tokenni bila olmaydi va server noto'g'ri tokenli so'rovlarni rad etadi."
  },
  {
    "id": 5,
    "question": "CORS (Cross-Origin Resource Sharing) nima?",
    "options": [
      "Faqat Chrome brauzerida ishlaydigan tezkor ma'lumot uzatish tizimi",
      "Brauzerlarda xavfsizlik nuqtai nazaridan bir manbadan (Origin A) boshqa manbadagi (Origin B) resurslarga so'rov yuborishni nazorat qiluvchi va ruxsat beruvchi xavfsizlik mexanizmi",
      "Rasmlarni siqish algoritmi",
      "Faqat HTTP POST so'rovlarini bloklaydigan tizim"
    ],
    "correctAnswer": 1,
    "explanation": "CORS brauzer xavfsizligi standarti bo'lib, u serverga o'z resurslarini qaysi origin'lar (saytlar) o'qiy olishi mumkinligini belgilash imkonini beradi."
  },
  {
    "id": 6,
    "question": "Brauzerda CORS xatoligi (CORS error) kelib chiqqanda, muammoni qayerda sozlash lozim?",
    "options": [
      "Faqat mijoz (Frontend) kodida, chunki so'rov brauzerdan yuborilgan",
      "Server (Backend) sozlamalarida, javob sarlavhalariga (Headers) kerakli `Access-Control-Allow-Origin` qiymatlarini qo'shish orqali",
      "Foydalanuvchining operatsion tizimida",
      "DNS provayderda"
    ],
    "correctAnswer": 1,
    "explanation": "CORS xavfsizlik qoidasi brauzer tomonidan tekshiriladi, lekin ruxsat beruvchi sarlavhalar server tomonidan `Access-Control-Allow-Origin` ko'rinishida yuborilishi shart."
  },
  {
    "id": 7,
    "question": "Cookie ma'lumotlarini JavaScript (masalan, `document.cookie`) orqali o'qishni taqiqlash va XSS orqali o'g'irlanishining oldini olish uchun qaysi flag qo'yiladi?",
    "options": [
      "`Secure`",
      "`HttpOnly`",
      "`SameSite`",
      "`Path`"
    ],
    "correctAnswer": 1,
    "explanation": "`HttpOnly` flagi o'rnatilgan cookie-larga brauzerda JS orqali kirib bo'lmaydi. Ular faqat tarmoq so'rovlari (HTTP/HTTPS) bilan avtomatik yuboriladi."
  },
  {
    "id": 8,
    "question": "Cookie faqat shifrlangan HTTPS ulanishlar orqali uzatilishini ta'minlash uchun qaysi flag ishlatiladi?",
    "options": [
      "`HttpOnly`",
      "`Secure`",
      "`SameSite=Strict`",
      "`Max-Age`"
    ],
    "correctAnswer": 1,
    "explanation": "`Secure` flagi cookie faylining ochiq (shifrlanmagan) HTTP ulanishi orqali uzatilishini taqiqlaydi, bu esa tarmoq trafigini kuzatayotgan buzg'unchilardan himoya qiladi."
  },
  {
    "id": 9,
    "question": "Uchinchi tomon saytlaridan yuboriladigan so'rovlarda (Cross-Site) cookie yuborilishini boshqarish orqali CSRF dan himoyalovchi zamonaviy cookie xossasi nima?",
    "options": [
      "`Domain`",
      "`Path`",
      "`SameSite`",
      "`Expires`"
    ],
    "correctAnswer": 2,
    "explanation": "`SameSite` atributi (Strict, Lax yoki None qiymatlari bilan) uchinchi tomon havolalaridan kelgan so'rovlarda cookie yuborilishini cheklaydi."
  },
  {
    "id": 10,
    "question": "HTTPS protokoli HTTP dan qanday qilib ustun xavfsizlik ta'minlaydi?",
    "options": [
      "U faqat rasmlarni shifrlaydi",
      "U TLS/SSL protokoli yordamida mijoz va server o'rtasidagi barcha ma'lumotlarni shifrlaydi va transport qatlamida o'g'irlanish (Man-in-the-Middle) hamda o'zgartirilishdan himoya qiladi",
      "U faqat parollarni keshlaydi",
      "U sayt yuklanishini sekinlashtiradi"
    ],
    "correctAnswer": 1,
    "explanation": "HTTPS barcha so'rovlar va javoblar (sarlavhalar, body, cookies va h.k.) transport darajasida shifrlanishini kafolatlaydi."
  },
  {
    "id": 11,
    "question": "Content Security Policy (CSP) nima?",
    "options": [
      "Foydalanuvchi parolini tekshiradigan qoida",
      "Brauzerga qaysi manbalardan (domenlardan) JS, CSS, rasmlar va boshqa resurslarni yuklashga ruxsat berilganligini ko'rsatuvchi va XSS xavfini sezilarli kamaytiruvchi HTTP sarlavhasi (yoki meta teg)",
      "Veb-sayt tezligini oshiruvchi kesh siyosati",
      "Ma'lumotlar bazasi xavfsizlik devori"
    ],
    "correctAnswer": 1,
    "explanation": "CSP yordamida ishlab chiquvchilar sahifada faqat ruxsat etilgan xavfsiz manbalardan olingan skriptlar bajarilishini yoki `inline` skriptlar ishlamasligini belgilashi mumkin."
  },
  {
    "id": 12,
    "question": "SQL Injection (SQLi) nima?",
    "options": [
      "HTML sahifaga zararli JavaScript qo'shish",
      "Foydalanuvchi kiritgan ma'lumotlar orqali ma'lumotlar bazasiga yuboriladigan SQL so'rovini manipulyatsiya qilish (o'zgartirish) va ruxsat berilmagan ma'lumotlarni olish yoki o'chirish hujumi",
      "Server fayl tizimini buzish",
      "Tarmoqdagi IP manzillarini aniqlash"
    ],
    "correctAnswer": 1,
    "explanation": "SQL Injection serverga yozilgan SQL so'rovlarining kiritilgan ma'lumotlar bilan birlashib ketishi natijasida yuzaga keladi. Buni oldini olish uchun Parameterized Queries (tayyorlangan so'rovlar) ishlatiladi."
  }
]

};

## 1. 💡 Sodda Tushuntirish va Analogiya

### Veb Xavfsizlik Asoslari nima?
Veb-ilovalarni yaratishda xavfsizlik eng muhim qismlardan biridir. Agar xavfsizlik choralari ko'rilmasa, buzg'unchilar foydalanuvchilarning shaxsiy ma'lumotlarini o'g'irlashi, hisoblarini egallashi yoki server ishini buzishi mumkin. Veb xavfsizlikning eng asosiy to'rtta ustuni:
* **XSS (Cross-Site Scripting):** Saytga begona zararli JavaScript kodlarini kiritish va ishga tushirish hujumi.
* **CSRF (Cross-Site Request Forgery):** Foydalanuvchining ruxsatisiz va bilmasdan uchinchi tomon saytidan uning nomidan so'rovlar yuborish hujumi.
* **CORS (Cross-Origin Resource Sharing):** Bir saytdan boshqa saytdagi resurslarni so'rash huquqini tartibga soluvchi brauzer qoidasi.
* **HTTPS:** Mijoz (brauzer) va server o'rtasidagi ma'lumotlar almashinuvini shifrlangan tarza himoya qiluvchi protokol.

### Real hayotiy analogiya
Tasavvur qiling, siz **bank binosida xizmat ko'rsatyapsiz**:
* **XSS:** Buzg'unchi mijozning e'lonlar doskasiga zararli ko'rsatma yozib ketadi. Boshqa kelgan mijozlar uni o'qib, o'z pullarini buzg'unchiga topshirib yuboradi.
* **CSRF:** Siz bankda o'tirganingizda, kimdir sizning qo'lingiz va imzoingizdan foydalanib yashirincha pul o'tkazish qog'ozini imzolab yuboradi. Siz bu haqida bilmay ham qolasiz.
* **CORS:** Bank xodimi faqat maxsus ruxsatnomasi bor mijozlargagina ichki arxiv xonalariga kirishga ruxsat beradi. Boshqa bank xodimlari kira olmaydi.
* **HTTPS:** Mijoz va kassir o'rtasidagi suhbat ochiq havoda emas, balki tovush o'tkazmaydigan shisha orqasida, maxsus shifrlangan aloqa qurilmasi yordamida amalga oshiriladi. Tashqaridan hech kim bu suhbatni eshita olmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (XSS ning oldini olish - Input sanitizatsiyasi)
Foydalanuvchi kiritgan har qanday HTML teglarni matn ko'rinishiga o'tkazib yuborish (Escaping):
```javascript
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
```

### 2. Intermediate Example (Express.js da CORS sarlavhalarini qo'lda sozlash)
Serverda ma'lum bir domenlargagina API so'rov yuborishga ruxsat berish:
```javascript
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
```

### 3. Advanced Example (CSRF token tekshiruvi va Cookie xavfsizligi)
Server tomonida xavfsiz cookie yaratish va CSRF tokenni solishtirish:
```javascript
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
  
  res.send(`
    <form action="/transfer" method="POST">
      <input type="hidden" name="_csrf" value="${csrfToken}">
      <input type="text" name="amount" placeholder="Summa">
      <button type="submit">O'tkazish</button>
    </form>
  `);
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
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammolarni hal qiladi?
* **Sessiyani o'g'irlash (Session Hijacking):** Agar cookie fayllari `HttpOnly` qilinmasa, buzg'unchi XSS yordamida foydalanuvchining session ID yoki JWT tokenini o'g'irlab, uning nomidan tizimga kira oladi.
* **Mablag' yoki Ma'lumotlarni yo'qotish (CSRF):** Foydalanuvchi zararli saytga kirganda, u yerdagi yashirin skript orqali foydalanuvchining bank yoki ijtimoiy tarmoqdagi akkauntiga pul o'tkazish yoki parolni o'zgartirish so'rovi yuborilishi mumkin.
* **Ma'lumotlar shifrlanmasligi (Man-in-the-Middle):** Agar HTTP ishlatilsa, provayder yoki ochiq Wi-Fi tarmog'idagi buzg'unchilar foydalanuvchining login va parollarini ochiq matn ko'rinishida ko'ra oladilar. HTTPS barcha ma'lumotlarni shifrlab uzatadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `Access-Control-Allow-Origin: *` ni hamma joyda ishlatish
#### Xato:
Katta loyihalarda yoki shaxsiy ma'lumotlar saqlanadigan API larda hamma domenlarga ruxsat berib yuborish.
#### To'g'ri usul:
Faqat o'zingizga tegishli ishonchli domenlargagina ruxsat bering va kerak bo'lsa serverda oq ro'yxat (Allowlist) ishlating.

### 2. Cookie fayllarini default (odatiy) sozlamalarda qoldirish
#### Xato:
Sessiya cookie fayllarini `httpOnly: true` va `secure: true` qilmasdan saqlash.
#### To'g'ri usul:
Maxfiy ma'lumotlar (JWT, Session ID) saqlanadigan cookie fayllariga har doim `httpOnly: true`, `secure: true` va `sameSite: 'lax'` (yoki `'strict'`) xossalarini qo'shish.

### 3. Matn chiqarishda `innerHTML` dan nazoratsiz foydalanish
#### Xato:
```javascript
// Agar userInput ichida <img src=x onerror=alert(1)> bo'lsa, XSS ishga tushadi
document.getElementById('output').innerHTML = userInput;
```
#### To'g'ri usul:
```javascript
// textContent faqat matn sifatida chiqaradi va hech qanday skriptni ijro etmaydi
document.getElementById('output').textContent = userInput;
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** XSS nima va u qanday sodir bo'ladi?
   * **Javob:** XSS (Cross-Site Scripting) — buzg'unchi tomonidan sayt sahifasiga zararli JavaScript kodini kiritilishi. Brauzer uni oddiy kod deb o'ylab ishga tushirib yuboradi.
2. **Savol:** CSRF nima?
   * **Javob:** CSRF (Cross-Site Request Forgery) — foydalanuvchi avtorizatsiyadan o'tgan saytda, uchinchi tomon sayti yordamida uning nomidan yashirincha so'rov yuborish hujumi.
3. **Savol:** HTTP va HTTPS ning asosiy farqi nimada?
   * **Javob:** HTTP ma'lumotlarni ochiq ko'rinishda uzatadi, HTTPS esa SSL/TLS shifrlash protokoli yordamida ma'lumotlarni shifrlab, xavfsiz yetkazadi.
4. **Savol:** `HttpOnly` cookie nima?
   * **Javob:** Brauzerda JavaScript (`document.cookie`) orqali o'qib bo'lmaydigan, faqat HTTP so'rovlariga qo'shib yuboriladigan xavfsiz cookie fayli.

### Middle (5–8)
5. **Savol:** CORS nima va nima uchun brauzerda CORS error chiqadi?
   * **Javob:** CORS — xavfsizlik standarti bo'lib, u boshqa domendan resurs so'rashni cheklaydi. Server o'z javobida `Access-Control-Allow-Origin` sarlavhasini qaytarmasa brauzer so'rovni bloklaydi.
6. **Savol:** `SameSite` cookie atributi qanday vazifani bajaradi?
   * **Javob:** U cookie-larni uchinchi tomon saytlaridan kelayotgan so'rovlar bilan birga yuborilishini boshqaradi. Uning `Strict`, `Lax` va `None` qiymatlari bor.
7. **Savol:** CSP (Content Security Policy) nima va u qanday ishlaydi?
   * **Javob:** CSP — brauzerga qaysi manbalardan (domenlardan) JS, CSS yoki rasmlarni yuklashga ruxsat borligini ko'rsatuvchi sarlavha. U ruxsat etilmagan uchinchi tomon skriptlarini butunlay bloklaydi.
8. **Savol:** CORS va CSRF o'rtasidagi bog'liqlik yoki farq nimada?
   * **Javob:** CORS — bu API ni ruxsat etilmagan domenlardan o'qishdan himoya qiladi (read protection). CSRF esa foydalanuvchi nomidan yozish/so'rov yuborish (write/action) hujumidir. CORS bu CSRF dan to'liq himoya qilmaydi.

### Senior (9–12)
9. **Savol:** Preflight so'rovi (CORS dagi OPTIONS so'rovi) nima va u qachon yuboriladi?
   * **Javob:** Murakkab HTTP so'rovlari (masalan, PUT, DELETE, yoki `Content-Type: application/json` bo'lgan POST so'rovlari) yuborilishidan oldin, brauzer serverga avtomatik tarzda `OPTIONS` so'rovini yuborib ruxsat tekshiradi. Bunga Preflight deyiladi.
10. **Savol:** SQL Injection (SQLi) nima va uni Node.js/JS loyihalarida qanday bartaraf etish mumkin?
    * **Javob:** SQL query tarkibiga zararli ma'lumot kiritish orqali bazani manipulyatsiya qilish. Buni oldini olish uchun Parameterized Queries (ORMs/ODMs yoki query bindings) ishlatiladi, stringlarni ulab so'rov yozilmaydi.
11. **Savol:** XSS ni to'liq bloklash uchun ko'p bosqichli mudofaa (Defense-in-depth) qanday quriladi?
    * **Javob:** Kiruvchi ma'lumotlarni sanitizatsiya qilish, chiquvchi ma'lumotlarni escape qilish, cookies uchun `HttpOnly` ishlatish va qat'iy Content Security Policy (CSP) sarlavhalarini sozlash orqali.
12. **Savol:** JWT (JSON Web Token) ni LocalStorage da saqlash xavfsizroqmi yoki Cookie-dami?
    * **Javob:** LocalStorage XSS hujumiga o'ta zaif (JS orqali osongina o'qiladi). `HttpOnly` va `Secure` cookie esa XSS dan himoyalangan. Shuning uchun maxfiy JWT tokenlarni cookie-da saqlash xavfsizroq hisoblanadi.

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
2. **Refresh Token:** Uzoq umrga ega (masalan, 7 kun) va uni faqat `HttpOnly`, `Secure` va `SameSite=Lax` bo'lgan keshlanmaydigan Cookie-da saqlaymiz.
3. **Silent Refresh:** Sahifa yangilanganda yoki Access Token muddati tugaganda, brauzer orqa fonda Refresh Token yordamida yangi Access Token so'raydi.

#### Silent Refresh Server kodi:
```javascript
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
```

---

## 9. 🚀 Performance va Optimization

* **CORS So'rovlarini keshlar (CORS Caching):** Har safar murakkab so'rov oldidan OPTIONS (preflight) so'rovi ketmasligi uchun serverda `Access-Control-Max-Age` sarlavhasiga soniyalar hisobida qiymat (masalan, `86400` yoki 24 soat) berib qo'yish kerak. Bu tarmoq so'rovlari sonini kamaytiradi.
* **HTTPS yuklamasini kamaytirish:** Zamonaviy serverlarda TLS sessiyalarini keshlash (TLS Session Resumption) yoki HTTP/2-dan foydalanish HTTPS ulanish tezligini sezilarli darajada oshiradi.

---

## 10. 📌 Cheat Sheet

| Himoya vositasi / Atribut | Vazifasi | Qachon ishlatiladi |
| :--- | :--- | :--- |
| **`HttpOnly` Cookie** | JavaScript-ning cookie fayllarini o'qishini taqiqlaydi | XSS orqali token o'g'irlanishini oldini olishda |
| **`Secure` Cookie** | Faqat shifrlangan HTTPS ulanishda yuborilishini kafolatlaydi | Ochiq Wi-Fi va tarmoq kuzatuvchilaridan (MitM) himoyalanishda |
| **`SameSite` (Lax/Strict)** | Uchinchi tomon havolalarida cookie yuborilishini bloklaydi | CSRF hujumlaridan himoyalanishda |
| **HTML Escaping** | `<`, `>`, `"` kabi belgilarni zararsizlantiradi | Matnlarni sahifaga xavfsiz chiqarishda (XSS prevention) |
| **CORS Headers** | API ni qaysi domenlar o'qiy olishini belgilaydi | Tashqi saytlar ma'lumotlaringizni ruxsatsiz o'qimasligida |
| **CSP (Content Security Policy)** | Sahifaga faqat ishonchli skriptlar yuklanishini ta'minlaydi | XSS va clickjacking hujumlarini jilovlashda |

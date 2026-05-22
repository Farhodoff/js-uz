export const securityLesson = {
  id: "a21",
  title: "Security: XSS, CSRF, SQL Injection, Authentication",
  theory: `## 1. NEGA kerak?

**Real Muammolar:**
- Foydalanuvchi input'ini <script> qo'yib, haker kodi ishlaydi (XSS)
- Sayt orqali foydalanuvchining ma'lumotini olib ketish (CSRF)
- Database'ni buzish (SQL Injection)

## 2. SODDALIK

**Qal'a himoyasi:** Hech kim ichkariga kirmaslik uchun qal'aning barcha darvozasida guard bo'ladi.

## 3. XAVFSIZLIK TURLARI

### A. XSS (Cross-Site Scripting) - Inject qilingan Javascript

**innerHTML xavfi:**
Hech qachon foydalanuvchi kiritgan ma'lumotni \`innerHTML\` orqali chiqarmang!
\`\`\`javascript
// XAVFLI KOD ❌
const input = "<img src=x onerror='alert(1)'>";
document.body.innerHTML = input; // Script ishga tushib ketadi!
\`\`\`

### To'g'ri usul: textContent ✅
\`textContent\` har doim ma'lumotni shunchaki matn deb hisoblaydi va scriptlarni ishga tushirmaydi.

---

## 3. MA'LUMOTLARNI SAQLASH (JWT va Tokenlar)
Intervyuda eng ko'p so'raladigan savol: **"JWT tokenni qayerda saqlash xavfsiz?"**

| Joy | Xavfsizlik darajasi | Izoh |
|---|---|---|
| **LocalStorage** | Past ❌ | XSS hujumi orqali osongina o'g'irlash mumkin. |
| **SessionStorage**| Past ❌ | Tab yopilguncha saqlanadi, lekin baribir himoyasiz. |
| **HttpOnly Cookie** | Yuqori ✅ | JavaScript orqali o'qib bo'lmaydi, faqat serverga yuboriladi. |

---

## 4. VIZUAL TUSHUNTIRISH
### XSS Hujumi qanday sodir bo'ladi?
\`\`\`mermaid
sequenceDiagram
    Haker->>Server: "Yovuz" script yuboradi (Comment bo'lib)
    Server-->>Foydalanuvchi: Scriptni saqlaydi va hamma foydalanuvchilarga ko'rsatadi
    Foydalanuvchi->>Sahifa: Saytni ochadi
    Sahifa->>Brauzer: Scriptni ishga tushiradi (innerHTML tufayli)
    Brauzer->>Haker: Foydalanuvchi Cookie/Tokenlarini yuboradi
\`\`\`

---

## 5. XATOLAR (Common mistakes)

1. **innerHTML ishlatish:** foydalanuvchi input'i bilan XSS paydo bo'ladi.
2. **Tokenni LocalStorage'da saqlash:** XSS bo'lsa token o'g'irlanadi.
3. **SQL query'ni string bilan yig'ish:** injection uchun yo'l ochiladi.
4. **CSRF himoyasini unutish:** soxta so'rovlar ishlaydi.
5. **HTTPS ishlatmaslik:** ma'lumot yo'lda o'qib olinadi.

---

## 6. AMALIYOT (Mushqlar pastda)

## 7. SAVOLLAR VA JAVOBLAR

**1. XSS nima?**Foydalanuvchi input'iga zararli JS qo'shib yuborish.
**2. XSS'dan qanday himoyalanish kerak?**textContent/sanitization va CSP.
**3. innerHTML va textContent farqi?**innerHTML HTML'ni ishga tushiradi, textContent faqat matn.
**4. CSRF nima?**Foydalanuvchi nomidan soxta so'rov yuborish.
**5. CSRF'dan himoya?**CSRF token, SameSite cookie, double-submit.
**6. SQL Injection nima?**So'rovga zararli SQL qo'shib yuborish.
**7. SQL Injection'dan himoya?**Prepared statements va parametrlar.
**8. HttpOnly cookie nima uchun kerak?**JS orqali o'qilmaydi, XSS'dan himoya.
**9. Authentication va Authorization farqi?**Auth: kim ekanini tekshirish, AuthZ: ruxsat berish.
**10. CSP nima?**Qaysi scriptlar ishlashini cheklovchi siyosat.
**11. Rate limiting nima?**Ko'p so'rovlarni cheklash (brute-force).
**12. HTTPS nega shart?**Ma'lumotlar shifrlanadi.

---

## 8. MINI LOYIHA: "Input Sanitizer"
**Vazifa:** Foydalanuvchi kiritgan matndagi barcha HTML teglarni tozalab tashlovchi funksiya yozing.

\`\`\`javascript
function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML; // Faqat matnli HTML qaytadi
}

const input = "<script>steal()</script> Salom!";
console.log(sanitize(input)); // → "&lt;script&gt;steal()&lt;/script&gt; Salom!"
\`\`\`
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
      test: "if (code.includes('textContent')) return null; return 'XSS himoya yoq';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "XSS (Cross-Site Scripting) hujumining asosiy maqsadi va ishlash printsipi nima?",
      options: [
        "Ma'lumotlar bazasiga noto'g'ri SQL so'rovlarini yuborib, jadval ma'lumotlarini o'g'irlash",
        "Foydalanuvchi kiritadigan input maydonlari orqali sahifaga zararli JavaScript kodini kiritish (inject qilish) va uni boshqa foydalanuvchilar brauzerida ishga tushirish",
        "Serverni judayam ko'p so'rovlar yuborib to'xtatib qo'yish (DDoS)",
        "Veb-sayt xosting provayderini buzish"
      ],
      correctAnswer: 1,
      explanation: "XSS hujumida haker foydalanuvchi kiritadigan input maydoni, URL query parametrlari yoki boshqa yo'llar bilan sahifaga begona zararli JS kodini joylaydi. Agar sayt bu kodni filtrlarsiz render qilsa, ushbu kod boshqa foydalanuvchilar brauzerida ham ishlab ketib, ularning cookie-fayllari va maxfiy ma'lumotlarini o'g'irlashi mumkin."
    },
    {
      id: 2,
      question: "Foydalanuvchi tokenlarini (masalan, JWT token) brauzerda XSS hujumlaridan maksimal darajada himoya qilgan holda saqlash uchun qaysi usul eng xavfsiz hisoblanadi?",
      options: [
        "`LocalStorage`da saqlash",
        "`SessionStorage`da saqlash",
        "`HttpOnly` va `Secure` flaglariga ega bo'lgan kuki (Cookie) fayllarida saqlash",
        "Global JavaScript o'zgaruvchisida saqlash"
      ],
      correctAnswer: 2,
      explanation: "`HttpOnly` flagi bilan o'rnatilgan kuki fayllarini brauzerdagi JavaScript skriptlari orqali o'qish (masalan, `document.cookie` yordamida) mutqalo imkonsiz bo'liq bo'ladi. Bu esa XSS hujumi sodir bo'lgan taqdirda ham tokenlarni hakerlar o'g'irlay olmasligini kafolatlaydi."
    },
    {
      id: 3,
      question: "CSRF (Cross-Site Request Forgery) hujumi nima va undan qanday himoyalanish mumkin?",
      options: [
        "Bu foydalanuvchi kompyuterini virus bilan zararlash; undan faqat antivirus orqali himoyalaniladi",
        "Bu foydalanuvchi nomidan uning xabarisiz soxta so'rovlar yuborish hujumi; undan himoyalanish uchun maxsus CSRF tokenlar va cookie'larda `SameSite=Strict` (yoki `Lax`) sozlamasidan foydalaniladi",
        "Bu ma'lumotlarni shifrlash; undan himoya qilish uchun SSL sertifikat ishlatiladi",
        "Bu parollarni brute-force yordamida buzish; undan himoya qilish uchun murakkab parol tanlanadi"
      ],
      correctAnswer: 1,
      explanation: "CSRF hujumida foydalanuvchi bitta xavfsiz saytda auth bo'lib turganida, boshqa zararli saytga kirganda u yerda avtomatik yashirin so'rov yuborish kodi ishlaydi. Buni oldini olishda so'rov faqat o'sha domen ichida yuborilishini tekshiruvchi CSRF tokenlar va `SameSite` cookie siyosati yordam beradi."
    },
    {
      id: 4,
      question: "SQL Injection (SQL inyeksiyasi) xavfini mutlaqo bartaraf etish uchun ma'lumotlar bazasiga so'rov yuborishda qaysi usuldan foydalanish shart?",
      options: [
        "SQL so'rovlarini oddiy string concatenation (satrlarni qo'shish) orqali yig'ish",
        "Prepared Statements (parametrli so'rovlar) dan foydalanish",
        "SQL so'rovlarini faqat client-side'da yozish",
        "SQL o'rniga NoSQL bazalardan foydalanish"
      ],
      correctAnswer: 1,
      explanation: "Prepared Statements yoki Parameterized Queries usulida ma'lumotlar so'rov shablonidan alohida jo'natiladi. Bu orqali ma'lumotlar tarkibidagi SQL buyruqlari bazaga SQL kodi emas, shunchaki oddiy matn bo'lib boradi va bazani buzib yuborolmaydi."
    },
    {
      id: 5,
      question: "Veb-sahifada qaysi manbalardan (domenlardan) JavaScript skriptlari, CSS stillari yoki rasmlar yuklanishi mumkinligini qat'iy cheklovchi xavfsizlik chorasi (HTTP header) nima deb ataladi?",
      options: [
        "CORS (Cross-Origin Resource Sharing)",
        "CSP (Content Security Policy)",
        "HTTPS",
        "HSTS (HTTP Strict Transport Security)"
      ],
      correctAnswer: 1,
      explanation: "CSP (Content Security Policy) - bu brauzerga qaysi manbalardan kelayotgan resurslar xavfsiz ekanini va ularni ishga tushirish kerakligini aytuvchi HTTP headerdir. U XSS hujumlarini deyarli butunlay zararsizlantirishga yordam beradi."
    },
    {
      id: 6,
      question: "HTTPS protokoli HTTP protokolidan qanday asosiy xavfsizlik afzalligi bilan farq qiladi?",
      options: [
        "U brauzer va server o'rtasidagi barcha ma'lumotlarni shifrlaydi (encryption) va transport qatlamida o'g'irlanishining oldini oladi (SSL/TLS orqali)",
        "U rasmlarni tezroq yuklaydi",
        "U SQL Injection hujumlarini avtomatik ravishda to'xtatadi",
        "U JavaScript xatolarini tozalaydi"
      ],
      correctAnswer: 0,
      explanation: "HTTPS SSL/TLS protokoli yordamida brauzer va server o'rtasida uzatiladigan ma'lumotlarni shifrlaydi. Bu esa provayderlar yoki oraliq hakerlar maxfiy ma'lumotlarni o'qib olishining oldini oladi."
    },
    {
      id: 7,
      question: "CORS (Cross-Origin Resource Sharing) xavfsizlik mexanizmi brauzerda nima vazifani bajaradi?",
      options: [
        "Bitta domendagi veb-sahifa boshqa domendagi resurslarga so'rov yuborishi mumkinligini va unga qanday ruxsatlar berilganini boshqaradi",
        "Parollarni avtomatik tarzda shifrlaydi",
        "DDoS hujumlarini aniqlab bloklaydi",
        "Barcha cookie fayllarini o'chirib tashlaydi"
      ],
      correctAnswer: 0,
      explanation: "CORS — bu brauzer xavfsizlik chorasi bo'lib, uning yordamida server o'z resurslariga boshqa qaysi domenlar so'rov yuborishi mumkinligini hal qiladi (Access-Control-Allow-Origin headerlari orqali)."
    },
    {
      id: 8,
      question: "Veb-saytga foydalanuvchi kiritadigan input ma'lumotlarini tekshirish va tozalash (Validation & Sanitization) nima uchun zarur?",
      options: [
        "Zararli kodlar yoki noto'g'ri formatdagi ma'lumotlar tizim bazasiga yoki sahifaga kirib ketishining oldini olish uchun",
        "Faqat sahifa dizaynini chiroyli qilish uchun",
        "Kod hajmini optimallashtirish uchun",
        "Internet tezligini oshirish uchun"
      ],
      correctAnswer: 0,
      explanation: "Kiritilgan ma'lumotlarni tekshirish (validation) uning to'g'riligini tasdiqlaydi. Tozalash (sanitization) esa hakerlar kiritishi mumkin bo'lgan zararli HTML/JS teglarini tozalaydi, bu esa XSS va SQL Injection hujumlaridan himoya qiladi."
    },
    {
      id: 9,
      question: "Foydalanuvchi tizimga muvaffaqiyatli kirdi va kimligi aniqlandi (Authentication). Endi uning ma'lum bir sahifaga yoki funksiyaga kirish huquqi bor-yo'qligini tekshirish jarayoni nima deb ataladi?",
      options: [
        "Authorization (Avtorizatsiya)",
        "Authentication (Autentifikatsiya)",
        "Encryption (Shifrlash)",
        "Decryption (Shifrdan ochish)"
      ],
      correctAnswer: 0,
      explanation: "Authentication — bu foydalanuvchining kimligini tekshirish (masalan, login/parol orqali). Authorization (avtorizatsiya) esa o'sha aniqlangan foydalanuvchining tizimda qanday amallarni bajarishga huquqi borligini tekshirishdir."
    },
    {
      id: 10,
      question: "Serverga bir soniyada juda ko'p miqdorda so'rovlar yuborib uni ishdan chiqarishga urinadigan 'Brute-Force' yoki API spam-hujumlaridan himoyalanish uchun qaysi mexanizm ishlatiladi?",
      options: [
        "Rate Limiting (So'rovlar sonini cheklash)",
        "CORS",
        "Encryption",
        "Prepared Statements"
      ],
      correctAnswer: 0,
      explanation: "Rate Limiting ma'lum bir vaqt ichida bitta IP manzildan yuborilishi mumkin bo'lgan maksimal so'rovlar sonini belgilaydi. Bu spammerlar va brute-force hujumlaridan serverni himoya qiladi."
    },
    {
      id: 11,
      question: "Cookie (kuki) sozlamasidagi `SameSite=Strict` flagi qanday asosiy vazifani bajaradi?",
      options: [
        "Cookie faqat va faqat o'sha saytning o'zida yuborilishini kafolatlaydi, uchinchi tomon saytlaridan yuborilgan so'rovlarga cookie qo'shilmaydi (CSRF himoyasi)",
        "Cookie faylini localstorageda saqlaydi",
        "Faqat HTTPS protokoli orqali cookie yuborilishini ta'minlaydi",
        "Cookie faylini JavaScript orqali o'qish imkonini beradi"
      ],
      correctAnswer: 0,
      explanation: "`SameSite=Strict` sozlamasi CSRF (Cross-Site Request Forgery) hujumlaridan ajoyib himoyadir, chunki u brauzerga begona saytlardan kelayotgan linklar yoki so'rovlarga ushbu saytning cookie-fayllarini qo'shmaslikni buyuradi."
    },
    {
      id: 12,
      question: "JavaScript-da `eval()` funksiyasidan foydalanish nima uchun juda katta xavfsizlik xavfi (Security Risk) hisoblanadi?",
      options: [
        "Chunki `eval()` unga uzatilgan har qanday string formatidagi kodni to'liq huquq bilan ishga tushiradi, bu esa begona kodlarni bajarish imkonini yaratadi",
        "Chunki u faqat eski brauzerlarda ishlaydi",
        "Chunki u xotira hajmini cheklaydi",
        "Chunki u asinxron ishlashni bloklaydi"
      ],
      correctAnswer: 0,
      explanation: "`eval()` funksiyasi matn ko'rinishidagi kodni bajaradi. Agar foydalanuvchi kiritgan ma'lumot `eval()` ichiga tushib qolsa, haker istalgan zararli kodni tizimda ishga tushirishi mumkin."
    }
  ]
};

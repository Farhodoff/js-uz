export const webSecurity = {
  id: "webSecurity",
  title: "Veb Xavfsizlik Asoslari (Web Security)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Internet ochiq va xavfli hudud. Har soniyada minglab botlar va xakerlar veb-saytlar va serverlardagi zaifliklarni (vulnerabilities) qidirib, hujum uyushtirishadi. Agar dasturchi xavfsizlik qoidalarini bilmasa, foydalanuvchilarning parollari, shaxsiy ma'lumotlari yoki bank kartalari ma'lumotlari o'g'irlanishi mumkin.
Veb xavfsizlik (Web Security) — bu faqatgina tarmoq muhandislari ishi emas. Veb-dasturchi sifatida biz XSS (Cross-Site Scripting), CSRF (Cross-Site Request Forgery), CORS (Cross-Origin Resource Sharing) va SQL Injection kabi asosiy tahdidlarni tushunishimiz va ularga qarshi kod darajasida himoya yarata olishimiz shart.

Sizning veb-saytingiz — bu **bank binosi**.
- **HTTPS (SSL/TLS):** Bankka pul olib keladigan zirhli inkassator mashinasi. Yo'lda hech kim pulni o'g'irlay olmaydi (ma'lumotlar shifrlangan).
- **XSS (Skript kiritish):** Bank binosidagi devorga kimdir yolg'on e'lon yopishtirib ketishi va mijozlar shu e'longa ishonib pullarini firgarlarga berib yuborishi (zararli kod brauzerda ishga tushishi).
- **CSRF (So'rov soxtalashtirish):** Kimdir sizning nomingizdan bankka soxta imzo bilan hujjat yuborib, pulingizni o'zlashtirishi.
- **CORS:** Bankning faqat ruxsat berilgan hamkorlargagina xizmat ko'rsatishi (begona saytlardan API-ga so'rovlarni cheklash).

---

## 2. 💻 Real Kod Misollari



---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Eng asosiy veb-tahdidlar va ulardan himoyalanish:

#

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Parollarni ochiq (plain text) holatda saqlash:** Ma'lumotlar bazasida parollarni aslo ochiq yozish mumkin emas. Ular doimo kuchli hashing algoritmlari (Bcrypt, Argon2) orqali shifrlanishi shart. MD5 va SHA-1 eskirgan va yaroqsiz.
2. **CORS sarlavhasiga \`*\` qo'yish:** \`Access-Control-Allow-Origin: *\` sozlamasi dunyodagi istalgan sayt sizning API-ingizdan ma'lumotlarni o'g'irlay olishini anglatadi. Faqat ishonchli domenlarni ruxsat etilganlar ro'yxatiga (whitelist) kiritish kerak.
3. **Foydalanuvchi kiritgan ma'lumotga ishonish:** "Do not trust user input" (Foydalanuvchi kiritgan ma'lumotga aslo ishonma) qoidasi. Barcha inputlar ham client (front-end) tomonda, ham server (back-end) tomonda tekshirilishi va filtrlanishi shart.

---

## 5. 💬 12 ta Intervyu Savollari

**1. XSS (Cross-Site Scripting) nima?**
Foydalanuvchi kiritgan zararli JavaScript kodining boshqa foydalanuvchilar brauzerida ishga tushib, cookie va tokenlarni o'g'irlashi.

**2. XSS hujumining qanday turlari bor?**
3 ta turi: Stored (Bazada saqlanib qoladigan), Reflected (So'rov orqali darhol qaytadigan) va DOM-based XSS.

**3. CSRF nima?**
Foydalanuvchi nufuzli saytda login qilib turgan paytida, zararli uchinchi saytga kirishi va o'sha zararli saytdan avtorizatsiyadan o'tilgan saytga foydalanuvchi nomidan yashirin so'rov yuborilishi.

**4. CSRF-dan himoyalanishning eng yaxshi usuli qaysi?**
Har bir POST/PUT so'rovga faqat serverga ma'lum bo'lgan yashirin, bir martalik CSRF-token qo'shish yoki Cookie-larni \`SameSite=Lax\` yoki \`SameSite=Strict\` qilish.

**5. HTTPS va HTTP farqi nimada?**
HTTP ma'lumotlarni ochiq matn shaklida yuboradi. HTTPS esa TLS/SSL protokoli yordamida barcha so'rovlar va javoblarni shifrlab, yo'lda tinglanishidan (Man-in-the-Middle) himoya qiladi.

**6. CORS nima uchun kerak?**
Brauzer xavfsizligini ta'minlash va ruxsat berilmagan uchinchi tomon saytlariga sizning maxfiy API ma'lumotlaringizni o'qishni taqiqlash uchun.

**7. Same-Origin Policy (SOP) nima?**
Brauzerning asosiy xavfsizlik qoidasi bo'lib, unga ko'ra bir xil Protocol, Domain va Port (Origin) ga ega bo'lmagan saytlar bir-birining resurslarini to'g'ridan-to'g'ri o'qiy olmaydi.

**8. Parollarni saqlashda Hashing va Encryption farqi nima?**
Encryption (shifrlash) ikki tomonlama bo'lib, kalit yordamida qayta o'qish mumkin. Hashing (xitlash) esa bir tomonlama bo'lib, undan qaytarib asl parolni tiklab bo'lmaydi. Parollar faqat hashlanadi.

**9. SQL Injection nima?**
Mualliflik huquqi bo'lmagan foydalanuvchining ma'lumot kiritish maydoniga SQL buyruqlarini yozib, ma'lumotlar bazasidan yashirin ma'lumotlarni o'g'irlashi yoki o'chirib yuborishi.

**10. Tokenlar (masalan, JWT) brauzerda qayerda saqlangani xavfsizroq?**
\`HttpOnly\` va \`Secure\` bayroqchalari (flags) yoqilgan Cookie-larda saqlash eng xavfsiz hisoblanadi, chunki ularni JavaScript orqali (XSS yordamida) o'qib bo'lmaydi. \`localStorage\` esa XSS uchun oson o'ljadir.

**11. Bcrypt algoritmidagi "Salt" (tuz) nima?**
Parolni hashlashdan oldin unga qo'shiladigan tasodifiy belgilar ketma-ketligi. Bu bir xil parollar (masalan, "123456") bazada har xil hashga ega bo'lishini ta'minlaydi va Rainbow Table hujumlaridan himoya qiladi.

**12. Rate Limiting nima?**
Bitta IP-manzildan belgilangan vaqt oralig'ida (masalan, 1 daqiqada) yuboriladigan so'rovlar sonini cheklash. Bu DDoS hujumlari va parollarni taxmin qilishdan (Brute Force) himoya qiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Secure Token Storage Against XSS
JWT tokenlarni XSS hujumlaridan himoya qilish uchun \`HttpOnly\` cookielarda saqlash:
\`\`\`javascript
// Server-side response header:
res.cookie('token', token, {
  httpOnly: true, // JavaScript orqali o'qib bo'lmaydi
  secure: true,   // Faqat HTTPS orqali yuboriladi
  sameSite: 'Strict' // CSRF hujumlaridan himoya
});
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    Browser[Browser Request] -->|Same Origin?| SOP{Same Origin?}
    SOP -->|Yes| Allowed[Allow Request]
    SOP -->|No| Preflight[Send Preflight Request OPTIONS]
    Preflight --> ServerResponse{Access-Control-Allow-Origin header bor va mos keladimi?}
    ServerResponse -->|Yes| CORS_Allowed[CORS Ruxsat berildi]
    ServerResponse -->|No| CORS_Blocked[CORS Bloklandi - Browser Error]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Hujum | Mohiyati | Himoya |
| :--- | :--- | :--- |
| **XSS** | Brauzerda begona JS kod bajarilishi | HTML Escaping, Content Security Policy |
| **CSRF** | Foydalanuvchi nomidan soxta so'rov | CSRF token, SameSite cookie flag |
| **SQLi** | SQL buyruqlarini kiritib bazani buzish | Prepared Statements, ORM |
`,
  exercises: [
  {
    "id": 1,
    "title": "XSS-ga qarshi HTML Escaping",
    "instruction": "Zararli skriptlar ishga tushib ketmasligi uchun `<`, `>`, `&`, `\"` va `'` belgilarini xavfsiz HTML entity-larga almashtiruvchi `escapeHTML(str)` funksiyasini yozing.",
    "startingCode": "function escapeHTML(str) {\n  const map = {\n    '<': '&lt;',\n    '>': '&gt;',\n    '&': '&amp;',\n    '\"': '&quot;',\n    \"'\": '&#x27;'\n  };\n  // Belgilarni almashtiring\n}",
    "hint": "return str.replace(/[<>&\"']/g, m => map[m]);",
    "test": "if (typeof escapeHTML !== 'function') return 'escapeHTML topilmadi'; if(escapeHTML('<script>') !== '&lt;script&gt;') return 'Teglar eskeyp qilinmadi'; if(escapeHTML('\"hi\"') !== '&quot;hi&quot;') return 'Qo\\'shtirnoqlar xato'; return null;"
  },
  {
    "id": 2,
    "title": "JWT Token qismlarini ajratish",
    "instruction": "Berilgan JWT tokenni (Header, Payload, Signature) nuqta `.` bo'yicha uch qismga ajratib massiv ko'rinishida qaytaradigan `splitJWT(token)` funksiyasini yozing.",
    "startingCode": "function splitJWT(token) {\n  // Tokenni ajrating\n}",
    "hint": "return token.split('.');",
    "test": "if (typeof splitJWT !== 'function') return 'splitJWT topilmadi'; const parts = splitJWT('aaa.bbb.ccc'); if (parts.length !== 3 || parts[1] !== 'bbb') return 'Token to\\'g\\'ri bo\\'linmadi'; return null;"
  },
  {
    "id": 3,
    "title": "CORS Origin tekshiruvi",
    "instruction": "Kelgan so'rov origin manzili ruxsat etilgan `ALLOWED_ORIGIN` manziliga mos kelishini tekshiradigan `checkCORS(origin)` funksiyasini yozing (true/false).",
    "startingCode": "const ALLOWED_ORIGIN = 'https://js-uz.uz';\nfunction checkCORS(origin) {\n  // Moslikni tekshiring\n}",
    "hint": "return origin === ALLOWED_ORIGIN;",
    "test": "if (typeof checkCORS !== 'function') return 'checkCORS topilmadi'; if (checkCORS('https://js-uz.uz') !== true) return 'Ruxsat berilgan origin rad etildi'; if (checkCORS('https://bad-site.com') !== false) return 'Ruxsat berilmagan origin tasdiqlandi'; return null;"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "XSS (Cross-Site Scripting) hujumining asosiy mohiyati nimada?",
    "options": [
      "Serverdagi ma'lumotlar bazasini o'chirish",
      "Foydalanuvchi brauzerida zararli JavaScript kodini ishga tushirish",
      "Sayt serverini ko'plab so'rovlar bilan yuklash (DDoS)",
      "Foydalanuvchi parolini taxmin qilish"
    ],
    "correctAnswer": 1,
    "explanation": "XSS hujumi orqali xaker foydalanuvchi brauzerida ishlayotgan sahifaga zararli JavaScript kodini joylashtiradi va u orqali cookie/tokenlarni o'g'irlashi mumkin."
  },
  {
    "id": 2,
    "question": "CSRF (Cross-Site Request Forgery) hujumidan himoyalanishning eng samarali yo'li qaysi?",
    "options": [
      "Saytni faqat rasmlar bilan to'ldirish",
      "POST so'rovlariga yashirin, bir martalik CSRF tokenlarini qo'shish va cookielarni SameSite=Strict qilish",
      "Faqat HTTPS dan foydalanish",
      "JavaScript kodlarini yashirish (obfuscation)"
    ],
    "correctAnswer": 1,
    "explanation": "CSRF tokenlari so'rov haqiqatdan ham foydalanuvchi o'zining saytidan yuborilganini tasdiqlaydi, SameSite esa uchinchi tomon saytlaridan cookielar yuborilishini bloklaydi."
  },
  {
    "id": 3,
    "question": "CORS (Cross-Origin Resource Sharing) nima vazifani bajaradi?",
    "options": [
      "Foydalanuvchilar parollarini shifrlaydi",
      "Brauzer darajasida begona domenlardan keladigan API so'rovlarini cheklash yoki ruxsat berishni boshqaradi",
      "Server yuklamasini kamaytiradi",
      "SQL so'rovlarini xavfsiz qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "CORS brauzer xavfsizlik modeli bo'lib, serverga qaysi domenlar undan resurslarni o'qiy olishi mumkinligini belgilash imkonini beradi."
  },
  {
    "id": 4,
    "question": "Nima uchun production muhitda `Access-Control-Allow-Origin: *` sarlavhasini ishlatish xavfli?",
    "options": [
      "Sayt yuklanishini sekinlashtiradi",
      "Istalgan zararli domen sizning API ma'lumotlaringizni brauzer orqali o'qib olishiga yo'l ochadi",
      "Faqat telefonlarda ishlamaydi",
      "Baza parolini buzadi"
    ],
    "correctAnswer": 1,
    "explanation": "`*` belgisi barcha domenlarga ruxsat beradi, bu esa boshqa har qanday zararli sayt sizning API so'rovlaringizdan foydalana olishini anglatadi."
  },
  {
    "id": 5,
    "question": "HTTP va HTTPS protokollari orasidagi eng muhim xavfsizlik farqi nimada?",
    "options": [
      "HTTPS faqat rasmlarni ko'rsatadi",
      "HTTPS so'rov va javoblarni TLS/SSL orqali shifrlab, ma'lumotlar yashirinligini ta'minlaydi",
      "HTTP tezroq ishlaydi",
      "HTTPS faqat Google Chrome brauzerida ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "HTTPS (Hypertext Transfer Protocol Secure) shifrlash qatlami yordamida tarmoq orqali uzatilayotgan barcha maxfiy ma'lumotlarni o'g'irlanishdan saqlaydi."
  },
  {
    "id": 6,
    "question": "SQL Injection hujumidan qanday qilib kod darajasida himoyalanish mumkin?",
    "options": [
      "Faqat MongoDB ishlatish orqali",
      "Prepared Statements va Parameterized Queries (parametrli so'rovlar) dan foydalanish orqali",
      "Parollarni uzunroq qilish orqali",
      "Barcha SQL bazalarni o'chirish orqali"
    ],
    "correctAnswer": 1,
    "explanation": "Parametrli so'rovlar kiritilgan inputni SQL kodi sifatida emas, shunchaki oddiy matnli qiymat sifatida ko'radi, bu esa zararli kodlarning bazada bajarilishini oldini oladi."
  },
  {
    "id": 7,
    "question": "JWT (JSON Web Token) payload qismini shifrlangan deb hisoblash mumkinmi?",
    "options": [
      "Ha, uni o'qib bo'lmaydi",
      "Yo'q, u shunchaki Base64 formatida kodlangan (encode) va istalgan odam uni osonlikcha dekodlab o'qiy oladi",
      "Faqat kalit bo'lsa o'qiladi",
      "U faqat raqamlardan iborat"
    ],
    "correctAnswer": 1,
    "explanation": "JWT payload qismi shifrlanmagan, u faqat base64url formatida kodlangan. Shuning uchun JWT ichiga hech qachon maxfiy ma'lumotlarni (masalan, parol) yozish mumkin emas."
  },
  {
    "id": 8,
    "question": "Parollarni bazada saqlashda nega MD5 yoki SHA-1 tavsiya etilmaydi?",
    "options": [
      "Ular juda uzun hash hosil qiladi",
      "Ular juda tez ishlaydi va zamonaviy kompyuterlar soniyasiga milliardlab variantlarni solishtirib ularni oson buzadi (Brute Force/Rainbow Tables)",
      "Ular JavaScript-da qo'llab-quvvatlanmaydi",
      "Ularni faqat pullik dasturlar buzadi"
    ],
    "correctAnswer": 1,
    "explanation": "MD5 va SHA-1 shiddat bilan ishlaydigan kriptografik algoritmlardir. Parol xavfsizligi uchun esa sekin ishlaydigan (Bcrypt kabi) algoritmlar zarur."
  },
  {
    "id": 9,
    "question": "Bcrypt-da 'Salt' (tuz) ishlatishning maqsadi nima?",
    "options": [
      "Kodni chiroyli qilish",
      "Bir xil parollar (masalan, '123456') har xil foydalanuvchilar uchun bazada butunlay turlicha hashga ega bo'lishini ta'minlash",
      "Parolni tezroq tekshirish",
      "Server yuklamasini kamaytirish"
    ],
    "correctAnswer": 1,
    "explanation": "Tuz har bir parol uchun tasodifiy qo'shimcha belgilar qo'shadi, bu esa xakerlarning tayyor hash jadvallari (Rainbow Tables) yordamida parollarni buzishini imkonsiz qiladi."
  },
  {
    "id": 10,
    "question": "Cookie parametrlaridagi `HttpOnly` flagining vazifasi nima?",
    "options": [
      "Cookie-ni faqat HTTPS sahifalarda ishlashga majburlaydi",
      "Cookie-ni JavaScript kodlari (`document.cookie`) yordamida o'qilishini taqiqlaydi (XSS-dan himoya qiladi)",
      "Cookie hajmini cheklaydi",
      "Faqat Google Chrome uchun cookie-ni faollashtiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`HttpOnly` cookielarini brauzerda ishlayotgan JavaScript kodlari ko'ra olmaydi. Bu esa XSS hujumi orqali foydalanuvchi sessiya tokenini o'g'irlashni oldini oladi."
  },
  {
    "id": 11,
    "question": "HTTP Strict Transport Security (HSTS) nima?",
    "options": [
      "Parollarni shifrlash tizimi",
      "Brauzerga ushbu sayt bilan faqat va faqat xavfsiz HTTPS protokoli orqali bog'lanishni majburlovchi sarlavha",
      "Faqat adminlar kiradigan tarmoq",
      "DDoS hujumlarining bir turi"
    ],
    "correctAnswer": 1,
    "explanation": "HSTS sarlavhasi brauzerga foydalanuvchi hatto `http://` deb yozsa ham, avtomatik ravishda so'rovni `https://` ga o'zgartirib yuborishni buyuradi."
  },
  {
    "id": 12,
    "question": "DDoS (Distributed Denial of Service) hujumining asosiy maqsadi nima?",
    "options": [
      "Foydalanuvchi parollarini o'g'irlash",
      "Serverga juda katta hajmdagi sun'iy so'rovlar yuborib, uning resurslarini to'ldirish va saytni ishlamaydigan holatga keltirish",
      "SQL ma'lumotlarini o'zgartirish",
      "Sayt dizaynini buzish"
    ],
    "correctAnswer": 1,
    "explanation": "DDoS hujumi orqali xakerlar ko'plab qurilmalar (botnetlar) yordamida serverni so'rovlar bo'roni ostida qoldirib, xizmat ko'rsatishni to'xtatish (Denial of Service) ga erishadi."
  }
]
};

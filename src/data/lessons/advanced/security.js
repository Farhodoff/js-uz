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

<details><summary>1. XSS nima?</summary>Foydalanuvchi input'iga zararli JS qo'shib yuborish.</details>
<details><summary>2. XSS'dan qanday himoyalanish kerak?</summary>textContent/sanitization va CSP.</details>
<details><summary>3. innerHTML va textContent farqi?</summary>innerHTML HTML'ni ishga tushiradi, textContent faqat matn.</details>
<details><summary>4. CSRF nima?</summary>Foydalanuvchi nomidan soxta so'rov yuborish.</details>
<details><summary>5. CSRF'dan himoya?</summary>CSRF token, SameSite cookie, double-submit.</details>
<details><summary>6. SQL Injection nima?</summary>So'rovga zararli SQL qo'shib yuborish.</details>
<details><summary>7. SQL Injection'dan himoya?</summary>Prepared statements va parametrlar.</details>
<details><summary>8. HttpOnly cookie nima uchun kerak?</summary>JS orqali o'qilmaydi, XSS'dan himoya.</details>
<details><summary>9. Authentication va Authorization farqi?</summary>Auth: kim ekanini tekshirish, AuthZ: ruxsat berish.</details>
<details><summary>10. CSP nima?</summary>Qaysi scriptlar ishlashini cheklovchi siyosat.</details>
<details><summary>11. Rate limiting nima?</summary>Ko'p so'rovlarni cheklash (brute-force).</details>
<details><summary>12. HTTPS nega shart?</summary>Ma'lumotlar shifrlanadi.</details>

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
  ]
};

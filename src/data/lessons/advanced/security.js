export const securityLesson = {
  id: "a21",
  title: "Security 101: XSS va Xavfsiz Kodlash",
  theory: `## 1. KIRISH
Dasturchi sifatida bizning vazifamiz nafaqat ishlaydigan kod yozish, balki foydalanuvchi ma'lumotlarini himoya qilishdir. JavaScript moslashuvchan bo'lgani uchun unda xavfsizlik bo'yicha juda ko'p "teshiklar" mavjud.

## 2. XSS (Cross-Site Scripting)
Bu JavaScriptdagi eng ko'p uchraydigan hujum turi. Haker sizning saytingizga o'zining "yovuz" scriptini tiqib yuboradi.

### innerHTML xavfi ⭐
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

## 5. INTERVYU SAVOLLARI
1. **XSS nima va undan qanday himoyalanish kerak?** - Foydalanuvchi kiritgan ma'lumotni script sifatida ishlamasligini ta'minlash (textContent ishlatish yoki sanitization).
2. **innerHTML va innerText farqi?** - \`innerHTML\` HTML teglarni tushunadi va ishlatadi, \`innerText\` esa faqat matn sifatida ko'radi.
3. **Tokenlarni saqlashda nega HttpOnly cookie yaxshi?** - Chunki u XSS hujumidan himoyalangan: brauzer skriptlari uni o'qiy olmaydi.

---

## 6. MINI LOYIHA: "Input Sanitizer"
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
    }
  ]
};

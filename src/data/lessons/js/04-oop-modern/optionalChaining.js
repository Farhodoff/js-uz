export const optionalChaining = {
  id: "optionalChaining",
  title: "Optional Chaining va Nullish Coalescing",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Muammo: ichma-ich obyektlar
Foydalanuvchi obyektida manzil bo'lmasligi mumkin:

\`\`\`javascript
const user = { ism: "Ali" };  // manzil YO'Q

console.log(user.manzil.shahar);
// ❌ TypeError: Cannot read properties of undefined
\`\`\`

Dastur to'xtadi! Buning oldini olish uchun — **Optional Chaining** \`?.\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **pochta sandig'ini tekshiryapsiz**:
- **Oddiy murojaat** — sandiq YO'Q bo'lsa, eshikni sindirib kirishga urinasiz (xato!)
- **Optional chaining \`?.\`** — "sandiq bor-yo'qligini AVVAL tekshir, bo'lmasa shunchaki ket" (xatosiz)

\`?.\` — "agar mavjud bo'lsa davom et, bo'lmasa \`undefined\` qaytar" degan xavfsiz so'rov.

---

## 2. 💻 Optional Chaining \`?.\`

\`\`\`javascript
const user = { ism: "Ali" };

// ESKI usul (uzun):
const shahar1 = user.manzil && user.manzil.shahar;  // undefined

// YANGI usul (qisqa):
const shahar2 = user?.manzil?.shahar;  // undefined — XATOSIZ ✅
\`\`\`

### Funksiya va massivlar uchun
\`\`\`javascript
const user = { salomla: () => "Salom!" };

user.salomla?.();       // "Salom!" — mavjud, chaqirildi
user.videla?.();        // undefined — mavjud emas, xato YO'Q

const talabalar = user?.royxat?.[0];  // undefined
\`\`\`

\`\`\`mermaid
flowchart TD
    A["obj?.prop"] --> B{"obj mavjudmi?"}
    B -->|"Ha"| C["prop ni o'qish"]
    B -->|"Yo'q"| D["undefined (xatosiz!)"]
    A --> E["fn?.()"]
    E --> F{"fn funksiyami?"}
    F -->|"Ha"| G["chaqirish"]
    F -->|"Yo'q"| H["undefined"]
\`\`\`

---

## 3. ⚙️ Nullish Coalescing \`??\`

**Muammo:** \`||\` noto'g'ri ishlaydi — \`0\`, \`""\`, \`false\` ni ham "yo'q" deb hisoblaydi:

\`\`\`javascript
const ball = 0;
console.log(ball || 100);   // 100 ❌ — 0 aslida YAROQLI qiymat!
console.log(ball ?? 100);   // 0 ✅ — 0 null/undefined emas
\`\`\`

| Qiymat | \`x || 100\` | \`x ?? 100\` |
|---|---|---|
| \`0\` | 100 ❌ | 0 ✅ |
| \`""\` | 100 ❌ | "" ✅ |
| \`null\` | 100 ✅ | 100 ✅ |
| \`undefined\` | 100 ✅ | 100 ✅ |

> **Yodlash:** \`??\` — faqat \`null\` va \`undefined\` uchun default. \`||\` — barcha "yolg'onchilar" uchun.

### Birgalikda ishlatish
\`\`\`javascript
const shahar = user?.manzil?.shahar ?? "Shahar ko'rsatilmagan";
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`obj?.prop.sub\` (birinchi \`?.\` dan keyin oddiy \`.\`) | \`obj?.prop?.sub\` | Har darajada tekshirish kerak |
| \`x = 0\` uchun \`x ?? 100\` kutish | 0 qaytadi (to'g'ri!) | \`??\` faqat null/undefined ni sanaydi |
| \`?.\` dan keyin funksiyani \`()\` siz chaqirish | \`fn?.()\` | \`?.\` dan keyin \`()\` ham shart |
| Hamma joyda \`?.\` qo'yish | Faqat shubhali joyda | Ortiqcha \`?.\` xatoni yashiradi |

---

## 5. 🔑 Asosiy Atamalar

- **Optional chaining \`?.\`** — xavfsiz murojaat (mavjud bo'lmasa undefined)
- **Nullish coalescing \`??\`** — faqat null/undefined uchun default qiymat
- **Short-circuit** — \`?.\` zanjiri birinchi to'xtash joyida to'xtaydi

---

## 6. 🌍 Real Hayotda Qayerda?

- **API javobi:** \`data?.user?.profile?.avatar ?? "default.png"\`
- **Sozlamalar:** \`settings?.til ?? "uz"\`
- **Forma:** \`input?.value?.trim()\`

React loyihalarida har kuni ishlatiladi!

---

## 7. 🎙 Intervyu Savollari

**1. \`?.\` nima qiladi?**
**Javob:** Murojaat qilinayotgan obyekt/maydon mavjud bo'lmasa, xato o'rniga \`undefined\` qaytaradi.

**2. \`??\` va \`||\` farqi?**
**Javob:** \`||\` — 0, "", false ni ham "yo'q" sanaydi. \`??\` — faqat null va undefined.

**3. \`user?.manzil?.shahar\` qanday ishlaydi?**
**Javob:** Har daraja mavjudligi tekshiriladi; birortasi yo'q bo'lsa — undefined, xatosiz.

---

## 8. ✅ Xulosa

- **\`?.\`** — xavfsiz murojaat: \`user?.manzil?.shahar\`
- **\`?.()\`** — xavfsiz funksiya chaqiruv
- **\`??\`** — faqat null/undefined uchun default (0 va "" saqlanadi!)
- **Keyingi qadam:** 4.6-darsda barcha ES6+ imkoniyatlarining umumiy ko'rinishi`,
exercises: [
    {
      id: 1,
      title: "Manzilni xavfsiz olish",
      instruction: "Optional chaining (?.) bilan user.manzil.shahar ni xavfsiz qaytarsin (yoki undefined).",
      startingCode: "function getShahar(user) {\n  // ?. ishlating\n}\n",
      hint: "return user?.manzil?.shahar;",
      test: "const fn = new Function(code + '; return getShahar;')();\nif (fn({}) === undefined && fn({manzil:{shahar:'Toshkent'}}) === 'Toshkent') return null;\nreturn '?. ishlating';"
    },
    {
      id: 2,
      title: "Null ga ham xavfsiz",
      instruction: "getShahar(user) funksiyasi user null yoki undefined bo'lsa ham xato bermasdan undefined qaytarsin.",
      startingCode: "function getShahar(user) {\n  // null/undefined ga ham xavfsiz bo'lsin\n}\n",
      hint: "return user?.manzil?.shahar;",
      test: "const fn = new Function(code + '; return getShahar;')();\nif (fn(null) === undefined && fn({}) === undefined && fn({manzil:{shahar:'Samarqand'}}) === 'Samarqand') return null;\nreturn 'null/undefined uchun xato berdi';"
    },
    {
      id: 3,
      title: "?? bilan default",
      instruction: "getBall(ball) funksiyasi nullish coalescing (??) bilan: ball 0 bo'lsa 0 qaytarsin (100 emas!), null/undefined bo'lsa 100.",
      startingCode: "function getBall(ball) {\n  // ?? ishlating\n}\n",
      hint: "return ball ?? 100;",
      test: "const fn = new Function(code + '; return getBall;')();\nif (fn(0) === 0 && fn(null) === 100 && fn(50) === 50) return null;\nreturn '?? ishlamadi';"
    },
    {
      id: 4,
      title: "Tugma chaqiruvi",
      instruction: "runIfCombo(mashina) mashina?.boshlash?.() bilan boshlash funksiyasi mavjud bo'lsa chaqirsin, bo'lmasa xatosiz undefined qaytarsin.",
      startingCode: "function runIfCombo(mashina) {\n  // mashina?.boshlash?.() ishlatish\n}\n",
      hint: "return mashina?.boshlash?.();",
      test: "const fn = new Function(code + '; return runIfCombo;')();\nconst mashina = { boshlash: () => 'boshlandi' };\nif (fn(mashina) === 'boshlandi' && fn({}) === undefined) return null;\nreturn '?.() ishlamadi';"
    },
    {
      id: 5,
      title: "?? bo'sh satrni saqlaydi",
      instruction: "getYozuv(yozuv) funksiyasi: yozuv bo'sh satr bo'lsa ham bo'sh satrni qaytarsin (default emas!), faqat null/undefined bo'lsa 'Haqiqiy' qaytarsin.",
      startingCode: "function getYozuv(yozuv) {\n  // ?? ishlating\n}\n",
      hint: 'return yozuv ?? "Haqiqiy";',
      test: "const fn = new Function(code + '; return getYozuv;')();\nif (fn('') === '' && fn(null) === 'Haqiqiy' && fn(undefined) === 'Haqiqiy') return null;\nreturn 'bo\'sh satr default bilan almashtirildi';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "?. (optional chaining) nima qiladi?",
      options: [
        "Birinchi qiymat o'rniga boshqa qiymat qo'yadi",
        "Muayyan joy mavjud bo'lmasa xatosiz undefined qaytaradi",
        "Faqat funksiyani chaqiradi",
        "Obyektni nusxalaydi"
      ],
      correctAnswer: 1,
      explanation: "Mavjud bo'lmasa xato o'rniga undefined — xavfsiz murojaat."
    },
    {
      id: 2,
      question: "0 || 100 va 0 ?? 100 farqi nima?",
      options: [
        "Bir xil — ikkalasi ham 100",
        "|| = 100 (0 ni yo'q sanaydi), ?? = 0 (0 — yaroqli qiymat!)",
        "|| = 0, ?? = 100",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "?? faqat null/undefined uchun default beradi. 0 — qiymat, yo'q emas!"
    },
    {
      id: 3,
      question: "user?.manzil?.shahar — manzil yo'q bo'lsa nima qaytadi?",
      options: [
        "TypeError xatosi",
        "undefined (xatosiz)",
        "null",
        "Bo'sh satr"
      ],
      correctAnswer: 1,
      explanation: "Har bir daraja tekshiriladi, birortasi yo'q bo'lsa zanjir to'xtaydi va undefined qaytadi."
    },
    {
      id: 4,
      question: "const fn = obj?.getFn; fn?.(); nimani anglatadi?",
      options: [
        "fn mavjud bo'lsa chaqiradi, bo'lmasa xatosiz o'tkazib yuboradi",
        "Har doim xato beradi",
        "Doim undefined qaytaradi",
        "Faqat null uchun ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "fn?.() — funksiya mavjud bo'lsa chaqirish, bo'lmasa xatosiz o'tkazib yuborish."
    },
    {
      id: 5,
      question: "Massiv elementini xavfsiz olish qaysi variant?",
      options: [
        "arr?.[2]",
        "arr.[2]",
        "arr->2",
        "arr@2"
      ],
      correctAnswer: 0,
      explanation: "arr?.[index] — massiv undefined bo'lsa ham xatosiz undefined qaytaradi."
    }
  ]

};

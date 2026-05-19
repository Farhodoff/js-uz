export const optionalChaining = {
  id: "i10",
  title: "Optional Chaining & Nullish Coalescing",
  theory: `## 1. KIRISH
Tasavvur qiling, sizga serverdan murakkab obyekt keldi (masalan, foydalanuvchi ma'lumotlari). Agar foydalanuvchi o'z manzilini kiritmagan bo'lsa, \`user.address.city\` deb murojaat qilish dasturni butunlay "portlatadi" (crash qiladi). 

Ushbu darsda biz kodimizni xatolardan himoya qilishning eng zamonaviy va qisqa usullarini o'rganamiz.

## 2. TUSHUNCHA

### Optional Chaining (\`?.\`)
Agar obyekt ichidagi xususiyat mavjud bo'lmasa, xato bermasdan \`undefined\` qaytaradi.
**Metafora:** Bu xuddi zanjirning bir halqasi uzilgan bo'lsa, butun zanjirni tortmasdan, shunchaki "to'xtash" kabi.

### Nullish Coalescing (\`??\`)
Faqatgina qiymat \`null\` yoki \`undefined\` bo'lgandagina sukut bo'yicha (default) qiymatni oladi. 
**Farqi:** \`||\` operatoridan farqli o'laroq, \`0\` yoki \`""\` (bo'sh matn) ni "yomon" qiymat deb hisoblamaydi.

---

## 3. KOD MISOLLARI

### Misol 1 — Xavfsiz murojaat
\`\`\`javascript
const user = { name: "Ali" };

// Eski usul:
// const city = user.address && user.address.city;

// Yangi usul (?.):
const city = user.address?.city; 

console.log(city); // → undefined (xato bermaydi!)
\`\`\`

### Misol 2 — ?? va || farqi
\`\`\`javascript
let score = 0;

let result1 = score || 10; // → 10 (chunki 0 ni "falsy" deb hisoblaydi)
let result2 = score ?? 10; // → 0  (chunki faqat null/undefined bo'lsa 10 oladi)

console.log(result2); // → 0
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Qaror qabul qilish oqimi
\`\`\`
Qiymat bormi?
  │
  ├── null / undefined ──▶ ?? default qiymatni oladi
  │
  └── 0 / "" / false ────▶ ?? o'zini qoldiradi (|| esa o'zgartiradi)
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **?. (optional chaining) nima uchun kerak?** - Chuqur joylashgan xususiyatlarga murojaatda "Cannot read property of undefined" xatosini oldini olish uchun.
2. **?? va || farqi nima?** - \`||\` barcha falsy qiymatlarni (0, "", false) o'tkazib yuboradi, \`??\` esa faqat \`null\` va \`undefined\` ni.

---

## 6. MINI LOYIHA: "API Data Cleaner"
**Vazifa:** Kelayotgan ma'lumotni tozalab, xavfsiz holatga keltiring.

\`\`\`javascript
const apiResponse = {
  data: {
    settings: {
      theme: "dark",
      // fontSize kiritilmagan
    }
  }
};

const fontSize = apiResponse.data?.settings?.fontSize ?? 16;
console.log("Font Size:", fontSize); // → 16
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Xavfsiz funksiya chaqiruvi",
      instruction: "Obyekt ichidagi funksiya borligini tekshirib, keyin chaqiring.",
      startingCode: "const obj = { };\n// obj.sayHello funksiyasini ?. bilan chaqiring\n",
      hint: "obj.sayHello?.();",
      test: "if (code.includes('?.(')) return null; return '?.() sintaksisidan foydalaning';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Optional Chaining (`?.`) operatorining asosiy vazifasi nima?",
      options: [
        "Obyekt ichidagi xususiyat mavjud bo'lmasa, `Cannot read property of undefined` kabi xatolik berib dasturni to'xtatish",
        "Obyekt ichidagi chuqur joylashgan xususiyatlar yoki metodlarga murojaat qilganda, agar ular mavjud bo'lmasa xato bermasdan `undefined` qiymatini qaytarish",
        "Obyektni avtomatik ravishda JSON formatiga o'tkazish",
        "Massiv elementlarini saralash"
      ],
      correctAnswer: 1,
      explanation: "Optional chaining zanjirdagi null yoki undefined bo'lgan har qanday qismga duch kelganda murojaatni xavfsiz to'xtatib, TypeError xatosi o'rniga `undefined` qaytarish orqali dasturimiz crash bo'lishini oldini oladi."
    },
    {
      id: 2,
      question: "Nullish Coalescing (`??`) operatori `||` (OR) operatoridan qanday farq qiladi?",
      options: [
        "`??` operatori `0`, `false` va `\"\"` (bo'sh matn) kabi Falsy qiymatlarni inobatga olmaydi va faqat `null` yoki `undefined` bo'lgandagina o'ng tarafdagi default qiymatni qaytaradi",
        "`||` operatori faqat raqamlar bilan ishlaydi, `??` esa matnlar bilan",
        "`??` operatori asinxron tarzda ishlaydi",
        "Ular o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 0,
      explanation: "`||` operatori barcha \"falsy\" qiymatlarni (jumladan `0`, `false`, `\"\"`) yomon qiymat deb biladi va default qiymatga o'zgartiradi. `??` (Nullish) esa faqat `null` va `undefined` qiymatlari uchun default qiymatni faollashtiradi."
    },
    {
      id: 3,
      question: "Quyidagi kod e'lon qilingandan so'ng `age` o'zgaruvchisining qiymati nima bo'ladi?\n```javascript\nconst user = { name: 'Ali', age: 0 };\nconst age = user.age ?? 18;\n```",
      options: [
        "`18`",
        "`0`",
        "`undefined`",
        "`null`"
      ],
      correctAnswer: 1,
      explanation: "`user.age` qiymati `0` ga teng. `0` falsy qiymat bo'lsa ham, u null yoki undefined emas. Shuning uchun `??` operatori default qiymat `18` ni emas, o'sha `0` ni o'zini qoldiradi."
    },
    {
      id: 4,
      question: "Optional Chaining operatoridan foydalanib, massiv elementiga (`arr[5]`) yoki obyekt metodiga (`obj.sayHello()`) qanday xavfsiz murojaat qilish mumkin?",
      options: [
        "`arr?.[5]` va `obj.sayHello?.()`",
        "`arr?[5]` va `obj.sayHello?()`",
        "`arr.?[5]` va `obj.?sayHello()`",
        "Massiv va metodlar bilan `?.` operatorini ishlatib bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "Massiv elementlariga xavfsiz murojaat qilish uchun `?.[index]` sintaksisi, metodlarni chaqirish uchun esa `method?.()` sintaksisi qo'llaniladi."
    },
    {
      id: 5,
      question: "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nconst data = null;\nconsole.log(data?.user?.name ?? 'Guest');\n```",
      options: [
        "TypeError xatoligi beradi",
        "`\"Guest\"`",
        "`undefined`",
        "`null`"
      ],
      correctAnswer: 1,
      explanation: "`data` o'zgaruvchisi `null` bo'lganligi sababli, `data?.user?.name` zanjiri xavfsiz tarzda to'xtab `undefined` qaytaradi. So'ngra `undefined ?? 'Guest'` ifodasi ishga tushib, natijada `'Guest'` qaytadi."
    }
  ]
};", file_path:
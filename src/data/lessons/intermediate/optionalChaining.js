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
  ]
};

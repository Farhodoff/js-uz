export const operators = {
  id: "b13",
  title: "Operatorlar: Taqqoslash va Mantiqiy",
  theory: `## 1. KIRISH
Dasturlashda qaror qabul qilish uchun bizga operatorlar kerak. Masalan, foydalanuvchi kiritgan parol to'g'rimi? Yoki foydalanuvchining balansi xarid uchun yetarlimi? Bularning hammasi taqqoslash operatorlari orqali amalga oshiriladi.

## 2. TUSHUNCHA

### Sodda ta'rif
Operatorlar - bu qiymatlar ustida amal bajaruvchi maxsus belgilar. Taqqoslash operatorlari har doim \`true\` (ha) yoki \`false\` (yo'q) qaytaradi.

### Real hayot o'xshashlik
Taqqoslashni do'kondagi **taroziga** o'xshatish mumkin. Ikki narsani qo'yasiz va qaysi biri og'irligini yoki ular tengligini aniqlaysiz.

### Sintaksis
\`\`\`javascript
// Taqqoslash
a == b  // Qiymat tengligi
a === b // Qiymat va tur tengligi (Strict)
a > b   // Kattami?

// Mantiqiy
a && b  // VA (ikkisi ham true bo'lishi shart)
a || b  // YOKI (biri true bo'lsa yetarli)
!a      // EMAS (inkor qilish)
\`\`\`

---

## 3. KOD MISOLLARI

### Misol 1 — == va === farqi
**Maqsad:** Nima uchun har doim \`===\` ishlatish kerakligini ko'rsatish.
\`\`\`javascript
console.log(5 == "5");  // → true (chunki faqat qiymatni ko'radi)
console.log(5 === "5"); // → false (chunki biri son, biri matn)
\`\`\`

### Misol 2 — Mantiqiy operatorlar (Log-in tizimi)
**Maqsad:** \`&&\` operatorini real hayotda ishlatish.
\`\`\`javascript
const parolTogri = true;
const emailTasdiqlangan = true;

const kiraOladi = parolTogri && emailTasdiqlangan;
console.log("Kirish ruxsati:", kiraOladi); // → true
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Mantiqiy "VA" (&&) jadvali
| A | B | Natija (A && B) |
|---|---|---|
| true | true | **true** ✅ |
| true | false | **false** ❌ |
| false | true | **false** ❌ |
| false | false | **false** ❌ |

---

## 5. INTERVYU SAVOLLARI
1. **== va === farqi nima?** - \`==\` tipni avtomatik o'zgartiradi (coercion), \`===\` esa tipni ham tekshiradi.
2. **Short-circuit evaluation nima?** - \`&&\` birinchi qiymat false bo'lsa, ikkinchisiga qaramaydi. \`||\` esa birinchi true bo'lsa, to'xtaydi.

---

## 6. MINI LOYIHA: "Chegirma Tekshiruvchisi"
**Vazifa:** Agar mijozning yoshi 60 dan katta YOKI u talaba bo'lsa, unga chegirma bering.

\`\`\`javascript
let yosh = 65;
let talaba = false;

let chegirmaOladi = (yosh > 60) || talaba;
console.log("Chegirma bormi?", chegirmaOladi); // → true
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Strict Equality",
      instruction: "5 sonini '5' matni bilan '===' yordamida solishtiring va natijani consolega chiqaring.",
      startingCode: "// Kodni shu yerga yozing\n",
      hint: "console.log(5 === '5');",
      test: "if (logs.includes('false')) return null; return 'false chiqishi kerak';"
    }
  ]
};

export const objects = {
  id: "b6",
  title: "Obyektlar - Ma'lumotlar xazinasi",
  theory: `## 1. NIMA VA NEGA?
Tasavvur qiling, sizda bir nechta o'zgaruvchi bor:
\`\`\`javascript
let ism = "Ali";
let yosh = 25;
let shahar = "Toshkent";
\`\`\`
Bu ma'lumotlar bir-biri bilan bog'liq, lekin alohida turibdi. Agar sizda 100 ta foydalanuvchi bo'lsa, har biriga 3 tadan o'zgaruvchi ochish (300 ta o'zgaruvchi!) juda qiyin bo'ladi.

**Obyekt** — bu muammoni hal qiladi. U bir-biriga bog'liq ma'lumotlarni bitta "konteyner" (xazina) ichiga yig'adi.

---

## 2. OBYEKT YARATISH (Tushuntir → Ko'rsat → Bajartir)

Obyekt yaratish uchun jingalak qavslardan \`{ }\` foydalanamiz. Ichida esa **kalit: qiymat** juftligi bo'ladi.

**Misol:**
\`\`\`javascript
const shaxs = {
  ism: "Ali",
  yosh: 25,
  shahar: "Toshkent"
};
\`\`\`

**Kichik mashq:** O'zingiz haqingizda \`men\` nomli obyekt yarating. Unda \`ism\`, \`yosh\` va \`kasb\` bo'lsin.

---

## 3. MA'LUMOTNI O'QISH VA O'ZGARTIRISH

Obyekt ichidagi narsani olish uchun "nuqta" (\`.\`) dan foydalanamiz.

**Ko'rsat:**
\`\`\`javascript
console.log(shaxs.ism); // "Ali"

// O'zgartirish
shaxs.yosh = 26; 
shaxs.kasb = "Dasturchi"; // Yangi xususiyat qo'shish
\`\`\`

**Mashq:** \`men\` obyektidagi \`kasb\` ni "Junior Developer" ga o'zgartiring va konsolga chiqaring.

---

## 4. OBYEKT METODLARI (Harakatlar)

Obyekt nafaqat ma'lumot saqlashi, balki ish ham bajarishi mumkin. Obyekt ichidagi funksiya **metod** deyiladi.

**Ko'rsat:**
\`\`\`javascript
const robot = {
  nomi: "R2D2",
  salomBer: function() {
    console.log("Salom, men robotman!");
  }
};
robot.salomBer();
\`\`\`

---

## 5. KO'P UCHRAYDIGAN XATOLAR ⚠️

1.  **Nuqtani unutish:** \`shaxs ism\` (Xato) -> \`shaxs.ism\` (To'g'ri).
2.  **Mavjud bo'lmagan narsani chaqirish:**
    \`\`\`javascript
    console.log(shaxs.maosh); // undefined qaytaradi (xato bermaydi, shunchaki yo'q deydi)
    \`\`\`
3.  **Vergulni unutish:** Har bir kalit-qiymatdan keyin vergul (\`,\`) qo'yish shart (oxirgisidan tashqari).

---

## 6. BUZIB KO'RISH (Nima bo'ladi agar...?) 🧐

**Nima bo'ladi agar obyektning o'zini \`const\` bilan yaratsak-da, uning ichini o'zgartirsak?**
\`\`\`javascript
const mashina = { model: "BYD" };
mashina.model = "Tesla"; // Bu ishlaydi! ✅
\`\`\`
**Nega?** Chunki \`const\` o'zgaruvchining o'zini (manzilini) qulflaydi, obyektning ichidagi "qutilarni" emas. Obyektni butunlay yangisiga almashtirish taqiqlanadi: \`mashina = { ... }\` (Xato! ❌).

---

## 7. CHALLENGE 🏆
\`kalkulyator\` nomli obyekt yarating. Unda \`a\` va \`b\` sonlari bo'lsin. Shuningdek, \`hisobla\` degan metod bo'lsin. U \`a\` va \`b\` ning yig'indisini konsolga chiqarsin. (Maslahat: metod ichida \`this.a\` va \`this.b\` ishlating).

---

## 8. XULOSA
Endi siz:
1.  Bog'liq ma'lumotlarni obyektga guruhlashni.
2.  Obyekt ichidagi ma'lumotni o'qish va yangilashni.
3.  Obyektlarga metodlar (funksiyalar) qo'shishni qila olasiz.
`,
  exercises: [
    {
      id: 1,
      title: "Obyekt yaratish",
      instruction: "'shaxs' nomli obyekt yarating, ichida 'ism' va 'yosh' bo'lsin.",
      startingCode: "// Obyektni shu yerda yarating\n",
      hint: "const shaxs = { ism: 'Ali', yosh: 20 };",
      test: "if (typeof result === 'object' && result.ism) return null; return 'Obyektni to\\'g\\'ri yarating';"
    },
    {
      id: 2,
      title: "Qiymatni o'zgartirish",
      instruction: "Berilgan 'book' obyektining 'price' xususiyatini 15000 ga o'zgartiring.",
      startingCode: "const book = { title: 'JS', price: 10000 };\n// O'zgartiring\n\nconsole.log(book.price);",
      hint: "book.price = 15000;",
      test: "if (logs.includes('15000')) return null; return 'Narxni 15000 qiling';"
    }
  ]
};

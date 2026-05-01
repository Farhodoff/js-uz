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

## 7. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

### 1. Obyekt va massiv farqi nima? (Junior)
**Javob:** Massiv — tartiblangan ro'yxat (index orqali), Obyekt — tartiblanmagan kalit-qiymat to'plami.

### 2. Dot (\`.\`) va Bracket (\`[]\`) notation farqi? (Junior)
**Javob:** Dot — oddiy holatlar uchun. Bracket — agar kalit nomi o'zgaruvchida bo'lsa yoki maxsus belgilar (\`-\`, bo'sh joy) bo'lsa ishlatiladi.
\`\`\`javascript
const key = "yosh";
shaxs[key] = 25; // Bracket shart!
\`\`\`

### 3. Obyekt ichida metod yarating. (Junior - Amaliy)
**Vazifa:** \`user\` obyekti yarating, ichida \`name\` va \`sayHello\` metodi bo'lsin.

### 4. Ichma-ich (Nested) obyektlar bilan ishlash. (Junior - Amaliy)
**Vazifa:** \`shahar\` obyektini yarating, uning ichida \`kocha\` obyekti bo'lsin.

### 5. "this" kalit so'zi obyekt metodida nimaga teng? (Middle)
**Javob:** Metodni chaqirayotgan o'sha obyektning o'ziga teng.

### 6. Obyektni nusxalash (Cloning). (Middle - Amaliy)
**Vazifa:** \`obj1\` dan \`obj2\` ga nusxa oling (Spread \`...\` operatori yordamida).

### 7. "Object.keys()" metodi nima qaytaradi? (Junior)
**Javob:** Obyektning barcha kalitlarini massiv ko'rinishida qaytaradi.

### 8. Dinamik kalit qo'shish. (Middle - Amaliy)
**Vazifa:** O'zgaruvchi qiymatini obyektga kalit qilib bering.
\`\`\`javascript
const prop = "status";
const statusObj = { [prop]: "online" };
\`\`\`

### 9. Obyektni qanday qilib butunlay o'zgarmas (immutable) qilish mumkin? (Middle)
**Javob:** \`Object.freeze(obj)\` yordamida.

### 10. "Reference vs Value" tushunchasi. (Middle)
**Javob:** Obyektlar xotiradagi manzili orqali uzatiladi. Ya'ni \`objA = objB\` qilsangiz, bittasini o'zgartirsangiz ikkinchisi ham o'zgaradi.

### 11. Obyekt ichida property borligini qanday tekshirish mumkin? (Junior)
**Javob:** \`"key" in obj\` yoki \`obj.hasOwnProperty("key")\` orqali.

### 12. "Short-hand" property yozish. (Junior - Amaliy)
**Vazifa:** O'zgaruvchi nomi va kalit nomi bir xil bo'lsa, qisqa yozing: \`{ name, age }\`.

---

## 8. CHALLENGE 🏆
\`kalkulyator\` nomli obyekt yarating. Unda \`a\` va \`b\` sonlari bo'lsin. Shuningdek, \`hisobla\` degan metod bo'lsin. U \`a\` va \`b\` ning yig'indisini konsolga chiqarsin.

---

## 9. XULOSA
Endi siz:
1.  Bog'liq ma'lumotlarni obyektga guruhlashni.
2.  Obyekt ichidagi ma'lumotni o'qish va yangilashni.
3.  Obyektlarga metodlar (funksiyalar) qo'shishni qila olasiz.
4.  Intervyularda tushadigan 12 ta asosiy savol va topshiriqlarni bilasiz.
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

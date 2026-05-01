export const scopeLesson = {
  id: "b8",
  title: "Scope: O'zgaruvchilarning 'Yashash joyi'",
  theory: `## 1. KIRISH
Tasavvur qiling, sizning ismingiz "Ali". Uyda sizni hamma taniydi, lekin ko'chaga chiqsangiz, begona odamlar sizni tanimasligi mumkin. JavaScriptda ham o'zgaruvchilarning xuddi shunday "tanish doirasi" bor. Bu **Scope** (doira) deb ataladi.

## 2. TUSHUNCHA

### Sodda ta'rif
Scope - bu o'zgaruvchi "yashaydigan" va "taniladigan" hudud. Agar o'zgaruvchi biror doiradan tashqarida bo'lsa, uni ishlatib bo'lmaydi.

### Real hayot o'xshashlik (Viloyat va Uy)
- **Global Scope (Ko'cha)**: Hamma ko'rishi va ishlatishi mumkin bo'lgan narsalar (masalan, haykal).
- **Local Scope (Sizning uyingiz)**: Faqat uyingizdagilar ko'ra oladigan narsalar (masalan, sizning tish cho'tkangiz).

---

## 3. SCOPE TURLARI

### 1. Global Scope
Dasturning eng yuqorisida e'lon qilingan o'zgaruvchilar. Ularni istalgan joyda (funksiya ichida ham) ishlatish mumkin.

### 2. Function Scope
Faqat funksiya ichida yashaydigan o'zgaruvchilar. Ular funksiya tugashi bilan "o'ladi".

### 3. Block Scope (let va const uchun)
Faqat jingalak qavslar \`{ }\` ichida yashaydigan o'zgaruvchilar.

---

## 4. VIZUAL TUSHUNTIRISH
### Doiralar zanjiri
\`\`\`mermaid
graph TD
    A["DUNYO (Global Scope)"] --> B["UY (Function Scope)"]
    B --> C["XONA (Block Scope)"]
    C -.-> |"ko'ra oladi"| B
    B -.-> |"ko'ra oladi"| A
    A -.- x |"KO'RA OLMAYDI"| B
    B -.- x |"KO'RA OLMAYDI"| C
\`\`\`
*Muhim qoida: Ichkaridagilar tashqarini ko'radi, lekin tashkaridagilar ichkarini ko'ra olmaydi!*

---

## 5. INTERVYU SAVOLLARI
1. **Scope nima?** - O'zgaruvchilarning ko'rinish doirasi.
2. **Scope Chain (Zanjir) nima?** - Agar o'zgaruvchi ichki doirada topilmasa, JS uni tashqi doiralardan qidirishidir.

---

## 6. MINI LOYIHA: "Dahshatli Qidiruv"
**Vazifa:** Ichma-ich funksiyalar yozing va qaysi o'zgaruvchi qayerda ko'rinishini tekshiring.

\`\`\`javascript
const shahar = "Toshkent"; // Global

function uy() {
  const xona = "Mehmonxona"; // Function scope
  
  if (true) {
    const buyum = "Televizor"; // Block scope
    console.log(shahar, xona, buyum); // Hammasini ko'radi ✅
  }
  
  // console.log(buyum); // ❌ XATO! buyum blok ichida qolib ketgan
}

uy();
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Global vs Local",
      instruction: "Funksiya tashqarisida 'name' o'zgaruvchisini yarating va uni funksiya ichida consolega chiqaring.",
      startingCode: "// Bu yerda yarating\n\nfunction showName() {\n  // Bu yerda chiqaring\n}",
      hint: "const name = 'Ali'; console.log(name);",
      test: "if (logs.length > 0) return null; return 'Funksiyani chaqiring va log chiqaring';"
    }
  ]
};

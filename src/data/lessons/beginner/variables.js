export const variables = {
  id: "b1",
  title: "O'zgaruvchilar: var, let, const",
  theory: `## 1. KIRISH
JavaScriptda o'zgaruvchilar - bu ma'lumotlarni saqlash uchun "qutilar". Tasavvur qiling, **Payme** yoki **Click** ilovasida sizning balansiningiz, ismingiz yoki tanlangan kartangiz doimiy o'zgarib turadi. Bu ma'lumotlarning hammasi o'zgaruvchilarda saqlanadi.

Ushbu darsda biz JavaScriptning eng muhim fundamenti - ma'lumotlarni qanday qilib to'g'ri e'lon qilishni o'rganamiz. Dars oxirida siz nafaqat o'zgaruvchi yaratishni, balki intervyularda eng ko'p so'raladigan **Hoisting** va **TDZ** tushunchalarini ham vizual tushunib olasiz.

## 2. TUSHUNCHA (Nazariya)

### Sodda ta'rif
O'zgaruvchi - bu kompyuter xotirasidagi bir joyga berilgan nom bo'lib, u yerda biz biror qiymatni (masalan, son yoki so'z) saqlaymiz.

### Real hayot o'xshashlik (metafora)
O'zgaruvchini oshxonadagi **bankachalarga** o'xshatish mumkin. Bankacha ustidagi yozuv (**nom**) o'zgarmaydi, lekin uning ichidagi mahsulotni (**qiymat**) almashtirishingiz mumkin (agar u \`const\` bo'lmasa).

### Sintaksis
\`\`\`javascript
// Kalit so'z | Nom | Qiymat
let narx = 5000;
const doimiyQiymat = 3.14;
var eskiUsul = "Salom";
\`\`\`

---

## 3. CHUQUR TUSHUNTIRISH

### Hoisting (Ko'tarilish) Vizual ko'rinishi
Hoisting - bu JavaScript kodni ishlatishdan oldin e'lonlarni tepaga ko'tarishi.

\`\`\`javascript
// 1. var bilan: undefined qaytadi
console.log(ism); // → undefined
var ism = "Ali";

// 2. let/const bilan: XATO (TDZ)
console.log(shahar); // ❌ ReferenceError!
let shahar = "Toshkent";
\`\`\`

**Temporal Dead Zone (TDZ):** Bu \`let\` va \`const\` e'lon qilingan joyidan tepada joylashgan "o'lik hudud". Bu hududda o'zgaruvchiga murojaat qilsangiz, JavaScript xato beradi.

### Scope (Ko'rinish doirasi)
\`var\` funksiya darajasida ishlaydi, \`let\` va \`const\` esa faqat blok \`{}\` ichida.

\`\`\`mermaid
graph TD
    A[O'zgaruvchi Turlari] --> B("var")
    A --> C("let / const")
    B --> B1["Function Scope: Blokdan {} chiqib ketadi"]
    C --> C1["Block Scope: Faqat {} ichida yashaydi"]
\`\`\`

---

## 4. KOD MISOLLARI

### Misol 1 — const va Obyektlar (Mutatsiya)
**Maqsad:** \`const\` bilan e'lon qilingan obyekt ichini o'zgartirish mumkinligini ko'rsatish.
\`\`\`javascript
const savat = { mahsulot: "Olma", soni: 5 };

// [Xato emas!] Ichidagi qiymatni o'zgartirish mumkin
savat.soni = 6; 

console.log(savat.soni); // → 6

// [Xato!] Obyektni o'zini yangisiga almashtirib bo'lmaydi
// savat = { mahsulot: "Banan" }; // ❌ TypeError
\`\`\`

### Misol 2 — for tsiklida var vs let (Klassik Bug)
**Maqsad:** \`var\` ning global scope muammosini ko'rsatish.
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100); 
}
// → 3, 3, 3 (chunki var bitta umumiy xotira joyini ishlatadi)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// → 0, 1, 2 (let har bir tsikl uchun yangi 'quti' yaratadi)
\`\`\`

---

## 5. QACHON NIMA ISHLATAMIZ? (Decision Tree)

\`\`\`
Qaysi birini tanlash kerak?
        │
   Qayta tayinlanadimi?
   ├── Yo'q ───▶ [ const ] (Doim shundan boshlang)
   │
   └── Ha ─────▶ [ let ] (Faqat kerak bo'lsa)
                 
   [ var ] ───▶ HECH QACHON ISHLATMANG! ❌
\`\`\`

---

## 6. INTERVYU SAVOLLARI (⭐ Top 5)

### 1. var, let va const farqi nima?
**Javob:** \`var\` - function scope va hoistingda \`undefined\` bo'ladi. \`let/const\` - block scope va TDZ ga ega. \`const\` qayta tayinlanmaydi.

### 2. Temporal Dead Zone (TDZ) nima?
**Javob:** \`let\` va \`const\` o'zgaruvchilari kodingizda e'lon qilingan joygacha bo'lgan qism. Bu hududda o'zgaruvchini ishlatib bo'lmaydi.

### 3. const bilan e'lon qilingan massivga element qo'shsa bo'ladimi?
**Javob:** Ha, chunki referens (xotiradagi manzil) o'zgarmaydi, faqat massiv ichi o'zgaradi.

---

## 7. BUG TOPISH MASHQLARI

### 🐛 Bug #1
\`\`\`javascript
const pi = 3.14;
if (true) {
  pi = 3.1415;
}
// Nima xato?
\`\`\`
<details><summary>🔍 Javob</summary>const o'zgarmasdir, unga qayta qiymat berib bo'lmaydi.</details>

---

## 8. MINI LOYIHA: "Xarajatlar Hisoblagichi"

**Vazifa:** Foydalanuvchi ismini \`const\` bilan, umumiy summani \`let\` bilan yarating.

\`\`\`javascript
// 1-qadam: Ismni o'zgarmas qilib e'lon qiling
const ism = "Farhod";

// 2-qadam: Balansni o'zgaruvchan qilib yarating
let balans = 50000;

// 3-qadam: Balansdan 15000 ayirib, yangilang
balans -= 15000;

console.log(ism + "ning yangi balansi: " + balans);
// Kutilgan natija: Farhodning yangi balansi: 35000
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "TDZ xatosini topish",
      instruction: "Quyidagi kodda 'ReferenceError' berishi uchun log'ni o'zgaruvchidan oldin chaqiring.",
      startingCode: "let meva = 'Olma';\nconsole.log(meva);",
      hint: "console.log ni let dan tepaga chiqaring",
      test: "if (code.indexOf('console.log') < code.indexOf('let')) return null; return 'Log tepada bo\\'lishi shart';"
    },
    {
      id: 2,
      title: "const Obyekt Mutatsiyasi",
      instruction: "const bilan 'user' obyektini yarating va uning 'age' xususiyatini o'zgartiring.",
      startingCode: "const user = { name: 'Ali', age: 20 };\n// Bu yerda age ni 21 qiling\n",
      hint: "user.age = 21;",
      test: "if (user.age === 21) return null; return 'Yosh o\\'zgarishi kerak';"
    }
  ]
};

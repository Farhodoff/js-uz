export const functionScopeLesson = {
  id: "b9",
  title: "Function Scope: Xona sirlari",
  theory: `## 1. KIRISH
Tasavvur qiling, har bir funksiya — bu bitta alohida **xona**. Xona ichida nima sodir bo'layotganini tashqaridagilar ko'rmaydi. Bu o'zgaruvchilarni xavfsiz saqlashning eng oson usuli.

## 2. TUSHUNCHA

### Sodda ta'rif
Function Scope - bu o'zgaruvchining faqat funksiya ichida "yashashi". Funksiya tugashi bilan uning ichidagi hamma o'zgaruvchilar "o'chib ketadi".

### Real hayot o'xshashlik
Xona ichidagi **shaxsiy kundalik**. Siz uni xonangizda o'qishingiz mumkin, lekin ko'chaga chiqqanda u xonada qolib ketadi. Begona odamlar uni ko'ra olmaydi.

### Sintaksis
\`\`\`javascript
function meningXonam() {
  const sir = "Men JSni yaxshi ko'raman"; // Function Scope
  console.log(sir); // Ishlaydi ✅
}

// console.log(sir); // ❌ XATO! sir tashqarida tanilmaydi
\`\`\`

---

## 3. KOD MISOLLARI

### Misol 1 — Tashqaridan kirib bo'lmaydi
\`\`\`javascript
function pishiriq() {
  const mazasi = "Shirin";
}
pishiriq();
// console.log(mazasi); // ❌ ReferenceError
\`\`\`

### Misol 2 — Funksiya ichida var va let
Funksiya ichida bo'lsa, \`var\` ham, \`let\` ham funksiyadan tashqariga chiqolmaydi.
\`\`\`javascript
function test() {
  var x = 10;
  let y = 20;
}
// Na x, na y tashqarida ko'rinadi.
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Xona Metaforasi
\`\`\`mermaid
graph LR
    A["TASHQARI (Global)"] -- ko'ra olmaydi --> B["FUNKSIYA (Xona)"]
    B -- ko'ra oladi --> A
    B1["O'zgaruvchi"] --- B
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Function Scope nima?** - O'zgaruvchining faqat funksiya ichida ko'rinishi.
2. **Nega function scope kerak?** - Kodning boshqa qismlari bilan nomlar to'qnashib ketmasligi uchun (Global scope-ni "ifloslantirmaslik").

---

## 6. MINI LOYIHA: "Maxfiy Kod"
**Vazifa:** Funksiya ichida maxfiy son yarating va uni faqat o'sha funksiya ichida ishlating.

\`\`\`javascript
function bankAmali() {
  const pinCode = 7777;
  console.log("PIN tekshirilmoqda: " + pinCode);
}

bankAmali();
// pinCode bu yerda yo'q
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Xona ichida qolish",
      instruction: "Funksiya ichida 'secret' o'zgaruvchisini yarating. Uni funksiya tashqarisida consolega chiqarishga urunib ko'ring (commentda qoldiring).",
      startingCode: "function hideMe() {\n  // secret yarating\n}\n// console.log(secret);",
      hint: "const secret = 123;",
      test: "if (code.includes('secret')) return null; return 'O\\'zgaruvchi yarating';"
    }
  ]
};

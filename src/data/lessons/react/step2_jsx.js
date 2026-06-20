export const step2_jsx = {
  title: "2-DARS: JSX Sintaksisi",
  content: `
# 1. 🧩 JSX nima o'zi?

**JSX (JavaScript XML)** — bu JavaScript ichida xuddi HTML kabi kod yozish imkonini beruvchi React'ning maxsus sintaksis kengaytmasidir. 

Odatda, interfeys yaratish uchun HTML, mantiq uchun JS, dizayn uchun CSS alohida fayllarda yozilar edi. React esa HTML va JS ni birlashtirib, bir joyda yozishni qulay ko'radi, chunki ular chambarchas bog'liqdir.

> **Muhim:** Brauzer JSX ni to'g'ridan-to'g'ri tushunmaydi! Uni brauzer o'qishi uchun kod \`Babel\` nomli transpayler orqali oddiy JavaScript ob'ektlariga aylantiriladi.

---

## 2. 📝 JSX yozish qoidalari

JSX ni yozishda HTML ga juda o'xshash, biroq bilishingiz shart bo'lgan bir necha muhim farqlar va cheklovlar bor:

### Qoida 1: Faqat bitta "Root" (ota) element qaytarishi shart!
Komponent return qilganda ichida yuzlab teglar bo'lishi mumkin, lekin ularning barchasi bitta ota teg (\`div\`, \`section\`, yoki Fragment) ichiga o'ralgan bo'lishi kerak.
❌ **XATO:**
\`\`\`jsx
return (
  <h1>Salom</h1>
  <p>Xush kelibsiz</p>
)
\`\`\`
✅ **TO'G'RI:**
\`\`\`jsx
return (
  <div>
    <h1>Salom</h1>
    <p>Xush kelibsiz</p>
  </div>
)
\`\`\`

Agar ortiqcha \`div\` qo'shishni xohlamasangiz, **Fragment** dan foydalaning: \`<></>\` yoki \`<React.Fragment>\`

### Qoida 2: Barcha teglar yopilishi shart
HTML da \`<img>\` yoki \`<br>\` ni yopmasdan tashlab ketish mumkin. JSX da esa har bir element albatta yopilishi shart: \`<img src="..." />\`, \`<br />\`, \`<input />\`.

### Qoida 3: CamelCase atributlar
JSX aslida JavaScript bo'lgani uchun unda JS ga xos so'zlarni atribut qilib yozib bo'lmaydi.
* \`class\` o'rniga 👉 **\`className\`** yoziladi (chunki class JS dagi zaxiralangan so'z).
* \`for\` o'rniga 👉 **\`htmlFor\`** yoziladi.
* \`onclick\` o'rniga 👉 **\`onClick\`** (kattaroq harfda).
* Inline stillar oddiy string emas, balki Obyekt shaklida yoziladi: \`style={{ color: "red", fontSize: 20 }}\`.

---

## 3. 🛠 JSX ichida JavaScript yozish (\`{ }\`)

Agar JSX teglari ichida o'zgaruvchining qiymatini ko'rsatmoqchi bo'lsangiz yoki JS amallarini (hisoblash, funksiya) ishlatmoqchi bo'lsangiz, uni jingalak qavslar **\`{ }\`** ichiga olishingiz kerak.

\`\`\`jsx
const ismim = "Farhod";
const yosh = 25;

return (
  <h1>Mening ismim {ismim}, men {yosh + 5} yoshda bo'laman.</h1>
);
\`\`\`

---

## 4. 🎭 Shartli render (Conditional Rendering)

Agar qandaydir shartga ko'ra ba'zi elementlarni ko'rsatib, ba'zilarini yashirmoqchi bo'lsak, if/else ni to'g'ridan-to'g'ri JSX ichida ishlata olmaymiz. Uning o'rniga quyidagilarni ishlatamiz:

*   **Ternary (Uchlik) operator (\`shart ? rost_bo'lsa : yolg'on_bo'lsa\`):**
    \`\`\`jsx
    {isOnline ? <span>Siz onlaynsiz</span> : <span>Siz oflaynsiz</span>}
    \`\`\`
*   **Mantiqiy AND (\`&&\`):** (Agar shart to'g'ri bo'lsa buni ko'rsat, noto'g'ri bo'lsa umuman hech nima ko'rsatma)
    \`\`\`jsx
    {hasNotification && <div className="alert">Sizda yangi xabar bor!</div>}
    \`\`\`

---

## 5. 🔁 Ro'yxatlarni chizish (\`map\`)

Massiv ichidagi ma'lumotlarni HTML elementlariga aylantirib chizish uchun odatdagi \`for\` tsikli o'rniga Array ning **\`map()\`** metodi ishlatiladi. *Eslatma: Har bir takrorlanuvchi elementga yagona \`key\` (kalit) berish shart!*

\`\`\`jsx
const mevalar = ['Olma', 'Banan', 'Nok'];

return (
  <ul>
    {mevalar.map((meva, index) => (
      <li key={index}>{meva}</li>
    ))}
  </ul>
);
\`\`\`
`,
  code: `import React from "react";

export default function App() {
  // 1. JavaScript o'zgaruvchilari
  const name = "Sardor";
  const age = 22;
  const isStudent = true;
  
  // Massiv
  const skills = ["JavaScript", "React", "Node.js"];

  return (
    // Qoida 1: Faqat bitta ota div (yoki Fragment) bo'lishi shart
    <div className="container" style={{ padding: 20, fontFamily: 'sans-serif' }}>
      
      {/* Qoida 3: JSX ichida JS ishlatish uchun { } qavslar */}
      <h1 style={{ color: '#2c3e50' }}>Foydalanuvchi: {name}</h1>
      <p>Yoshi: {age} da</p>
      
      {/* Shartli render (Ternary operator) */}
      <div style={{ padding: 10, background: isStudent ? '#d4edda' : '#f8d7da', borderRadius: 5 }}>
        Status: {isStudent ? "Talaba 🎓" : "Xodim 💼"}
      </div>

      <h3 style={{ marginTop: 20 }}>Texnologiyalar:</h3>
      
      {/* Massivni ro'yxat qilib chiqarish (map) */}
      <ul>
        {skills.map((skill, index) => (
          // Har doim yagona key berishni unutmang
          <li key={index} style={{ marginBottom: 5 }}>
            {skill}
          </li>
        ))}
      </ul>

      {/* Logical AND && */}
      {skills.length > 0 && (
        <p style={{ color: 'gray', fontSize: 12 }}>Jami {skills.length} ta texnologiya biladi.</p>
      )}

    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "O'z ma'lumotlaringizni chiqaring",
      instruction: "Tepadagi kod muharririda `name`, `age` o'zgaruvchilarni toping va ularning qiymatini o'zingizning haqiqiy ismingiz va yoshingizga o'zgartiring. `isStudent` ni ham o'z holatingizga qarab `true` yoki `false` qiling.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const name = 'Jon Doe';\n  const age = 99;\n\n  return (\n    <div>\n      <h1>{name}</h1>\n      <p>{age} yoshda</p>\n    </div>\n  );\n}",
      hint: "const name = 'Sizning ismingiz';",
      test: "if (code.includes('Jon Doe') || code.includes('99')) return 'Iltimos Jon Doe va 99 ni emas, o\\'zingizning ismingiz va yoshingizni yozing!'; return null;"
    }
  ],
  quizzes: [
    {
      question: "JSX kodini brauzer to'g'ridan-to'g'ri o'qiy oladimi?",
      options: [
        "Ha, JSX bu oddiy HTML ning yangi versiyasi hisoblanadi",
        "Yo'q, brauzer faqat JS ni tushunadi. JSX avval Babel kabi vositalar orqali JS ga o'girilishi shart",
        "Ha, lekin faqat Google Chrome da o'qiy oladi",
        "Yo'q, u maxsus serverda ishlashi kerak"
      ],
      correctAnswer: 1,
      explanation: "Brauzer JSX (<div/>) ni o'qisa darhol SyntaxError beradi. Babel JSX ni React.createElement() kabi tushunarli JS ko'rinishiga o'girib beradi."
    },
    {
      question: "Nima uchun JSX da CSS class yozish uchun 'class' o'rniga 'className' ishlatiladi?",
      options: [
        "className chiroyliroq ko'ringani uchun",
        "class HTML da ishlamaydi",
        "'class' so'zi JavaScript da zaxiralangan so'z (Class komponentlar yoki OOP da ishlatiladi)",
        "React da class lardan voz kechilgan"
      ],
      correctAnswer: 2,
      explanation: "JSX aslida tag zamirida JavaScript bo'lganligi sababli, JS ning kalit so'zi bo'lgan 'class' ni atribut sifatida ishlatib bo'lmaydi. Shuning uchun DOM ning asl xossasi bo'lgan 'className' ishlatiladi."
    }
  ]
};

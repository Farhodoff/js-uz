export const step3_components = {
  title: "3-DARS: Komponentlar",
  content: `
# 1. 🧱 Komponent o'zi nima?

React ilovalarini xuddi **Lego o'yinchoqlaridan** yig'iladigan bino kabi tasavvur qiling. Bino bitta ulkan yaxlit devordan yasalmaydi, balki yuzlab kichik g'ishtchalardan yig'iladi. React'da bu g'ishtchalar **Komponentlar (Components)** deb ataladi.

Komponent — bu mustaqil, o'zining ko'rinishi (HTML) va mantiqiga (JS) ega bo'lgan kod bo'lagi. Masalan: Navbar, Sidebar, Button, VideoPlayer kabilarni alohida komponentlarga bo'lish mumkin.

### Komponent yaratish qoidalari:
1.  **Katta harf bilan yoziladi:** Komponent nomlari (masalan, \`Header\`, \`Button\`) har doim katta harf bilan boshlanishi kerak. Aks holda, React ularni oddiy HTML tegi deb o'ylaydi (\`<header>\` yoki \`<button>\`).
2.  **JSX qaytaradi:** U odatiy JavaScript funksiyasidir va u albatta biron bir UI ni (JSX ni) \`return\` qilishi shart.

---

## 2. ⚡ Funksional va Klass komponentlar

React yaratilgan ilk yillarda (2018 yilgacha) komponentlar asosan JavaScript **Class** lari yordamida yozilardi. Lekin hozirgi kunda hamma joyda zamonaviy va qisqaroq bo'lgan **Funksional Komponentlar** ishlatiladi.

### Zamonaviy usul (Functional Components)
Bu shunchaki JSX qaytaruvchi oddiy JS funksiyasidir:
\`\`\`jsx
function Greeting() {
  return <h1>Salom do'stlar!</h1>;
}
\`\`\`

### Eski usul (Class Components) - Faqat bilib qo'yish uchun
Bunda \`React.Component\` dan meros (extends) olinadi va majburiy \`render()\` metodi bo'ladi.
\`\`\`jsx
class Greeting extends React.Component {
  render() {
    return <h1>Salom do'stlar!</h1>;
  }
}
\`\`\`

---

## 3. 📦 Import va Export qoidalari

Loyihada yuzlab komponentlar bo'lishi mumkin. Ularni bitta faylda yozish daxshatli ish! Shuning uchun har bir komponent o'zining alohida `.js` (yoki `.jsx`) faylida yaratiladi. Boshqa joyda ishlata olish uchun uni **export** qilish kerak.

**Header.js faylida:**
\`\`\`jsx
// Standart (Default) eksport
export default function Header() {
  return <header>Men Headerman</header>;
}
\`\`\`

**App.js faylida ishlatish:**
\`\`\`jsx
import Header from "./Header"; // Komponentni chaqirib (import qilib) oldik

function App() {
  return (
    <div>
      <Header />  {/* Chaqirgan komponentimizni huddi HTML tegidek ishlatamiz */}
      <main>Asosiy kontent</main>
    </div>
  );
}
\`\`\`

---

## 4. ♻️ Komponentlarni Qayta Ishlatish (Reusability)

Nega komponentlar kerak degan savolga eng yaxshi javob — **Qayta ishlatuvchanlik (Reusability)**. 
Bitta tugma (Button) yoki Karta (Card) komponentini yaratib, uni loyiha bo'ylab 100 marta, kodni qayta-qayta yozmasdan ishlatish mumkin! Buni amaliyot (code) qismida ko'rishingiz mumkin.
`,
  code: `import React from "react";

// 1-Komponent: Header (Sayt tepasi)
function Header() {
  return (
    <header style={{ background: "#2c3e50", color: "white", padding: "15px", textAlign: "center" }}>
      <h1>Mening Veb-saytim</h1>
    </header>
  );
}

// 2-Komponent: Xodim Kartasi
function EmployeeCard() {
  return (
    <div style={{ 
      border: "1px solid #ccc", 
      padding: "15px", 
      margin: "10px", 
      borderRadius: "8px",
      width: "200px",
      display: "inline-block" // Yana yonma-yon turishi uchun
    }}>
      <h3>👨‍💻 Xodim</h3>
      <p>Kasbi: Dasturchi</p>
      <button style={{ padding: "5px 10px", cursor: "pointer" }}>Batafsil</button>
    </div>
  );
}

// 3-Komponent: Footer (Sayt tagi)
function Footer() {
  return (
    <footer style={{ background: "#bdc3c7", padding: "10px", textAlign: "center", marginTop: "20px" }}>
      <p>Barcha huquqlar himoyalangan &copy; 2026</p>
    </footer>
  );
}

// Asosiy App komponenti
export default function App() {
  return (
    <div>
      {/* Yuqorida yaratilgan komponentlarni yig'amiz (Nesting) */}
      <Header />
      
      <main style={{ padding: "20px", textAlign: "center" }}>
        <h2>Bizning Jamoa</h2>
        <p>Quyida komponent orqali 3 marta qayta ishlatilgan (Reuse) kartochkalarni ko'ryapsiz:</p>
        
        {/* Bitta kodni 3 marta ishlatdik! */}
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </main>

      <Footer />
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Header, Main va Footer",
      instruction: "O'ng tomondagi muharrirda `Main` nomli yangi komponent yarating. Uning ichida `<h2>Bu asosiy qism</h2>` bo'lsin. Va bu `Main` komponentini `App` komponenti ichida, Header va Footer o'rtasiga chaqiring.",
      startingCode: "import React from 'react';\n\nfunction Header() {\n  return <header>Header</header>;\n}\n\nfunction Footer() {\n  return <footer>Footer</footer>;\n}\n\n// Shu yerda Main komponentini yarating!\n\n\nexport default function App() {\n  return (\n    <div>\n      <Header />\n      {/* Main ni shu yerdan chaqiring */}\n      <Footer />\n    </div>\n  );\n}",
      hint: "function Main() { return <main><h2>Bu asosiy qism</h2></main>; } va App ichida <Main /> yozing.",
      test: "if (!code.includes('<Main />') || !code.includes('function Main')) return 'Main komponentini to\\'g\\'ri yaratib, App ichida chaqirganingizga ishonch hosil qiling.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega komponent nomi doim katta harf bilan boshlanishi kerak?",
      options: [
        "Bu JavaScript ning qat'iy qoidasi bo'lgani uchun",
        "React kichik harfda yozilganlarni oddiy HTML teglari (div, span) deb tushunadi. Katta harflini esa Custom (o'zimiz yaratgan) Komponent deb biladi.",
        "Katta harfda yozilmasa CSS ishlamay qoladi",
        "Bu xususiyat faqat React ning eski versiyalarida bor"
      ],
      correctAnswer: 1,
      explanation: "Babel kompilyatorida kichik harfli teglar to'g'ridan-to'g'ri string (<div/>) sifatida uzatilsa, katta harflilari funksiya (<Header/> -> React.createElement(Header)) sifatida chaqiriladi."
    },
    {
      question: "React ilovasida eski Class komponentlar o'rnini nima to'liq egalladi?",
      options: [
        "Object komponentlar",
        "Array komponentlar",
        "Funksional (Functional) komponentlar",
        "Server komponentlar"
      ],
      correctAnswer: 2,
      explanation: "React Hooks (2018 yil) paydo bo'lgandan so'ng, sodda va o'qilishi oson bo'lgan Funksional komponentlar Class komponentlarni butunlay siqib chiqardi."
    }
  ]
};

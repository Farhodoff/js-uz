export const step11_context = {
  title: "11-DARS: Holatni boshqarish (Context API)",
  content: `
# 1. 🕳️ Prop Drilling muammosi nima?

Tasavvur qiling, sizda shunday komponentlar zanjiri bor:
\`App -> Navbar -> UserProfile -> Avatar\`

Va siz eng yuqoridagi \`App\` komponentidagi foydalanuvchi ma'lumoti (\`user\`) ni eng pastdagi \`Avatar\` ga yetkazishingiz kerak. Buning uchun siz Props orqali ma'lumotni \`Navbar\` ga berib, u yerdan \`UserProfile\` ga uzatib, keyin \`Avatar\` ga berasiz. Vaholanki, o'rtadagi komponentlarga (\`Navbar\` va \`UserProfile\`) bu ma'lumotning umuman keragi yo'q!

Bunday "kerak bo'lmagan qavatlardan ma'lumotni teshib o'tish" — **Prop Drilling** deb ataladi va loyiha kattalashganda kodingizni daxshatli darajada chigallashtirib yuboradi.

---

## 2. 🌍 Context API — Global Holat (Global State)

Yuqoridagi muammoni hal qilish uchun React da ichki vosita bor. Uning nomi **Context API**.

U xuddi osmondagi Wi-Fi router ga o'xshaydi: ma'lumotlarni simlar (props) orqali bitta-bitta ulashning o'rniga, havoga (Context ga) tarqatib yuboradi. Kimga kerak bo'lsa (qaysi komponent bo'lishidan qat'i nazar), parolni kiritib to'g'ridan-to'g'ri ulanib olaveradi.

Buning uchun 3 ta qadam kerak:
1.  **\`createContext\`**: Yangi Wi-Fi nuqta yaratamiz.
2.  **\`Provider\`**: O'z ichidagi barcha bolalarga shu ma'lumotni tarqatadi (antennaga o'xshab).
3.  **\`useContext\`**: Bola komponent shu orqali ulanib olib, ma'lumotni o'qiydi.

---

## 3. 🛠️ Bosqichma-bosqich yozilishi

**1-Qadam: Context yaratish** (Alohida faylda yoki App.js tepasida)
\`\`\`jsx
import { createContext } from 'react';

// "Theme" uchun yangi Context yaratdik
export const ThemeContext = createContext(null);
\`\`\`

**2-Qadam: Ma'lumotni tarqatish (Provider)**
Endi eng yuqoridagi (Ota) komponent ichida barchasini \`Provider\` bilan o'rab, qanday ma'lumot uzatilayotganini \`value\` orqali aytamiz.
\`\`\`jsx
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    // Endi ThemeContext.Provider ichida bo'lgan har qanday element "theme" ni ko'ra oladi
    <ThemeContext.Provider value={theme}>
      <Navbar />
      <MainContent />
    </ThemeContext.Provider>
  );
}
\`\`\`

**3-Qadam: Qabul qilib olish (\`useContext\`)**
O'rtadagi barcha komponentlardan sakrab o'tib, to'g'ridan-to'g'ri maqsadga boramiz!
\`\`\`jsx
import { useContext } from 'react';
import { ThemeContext } from './App'; // Boyagi Wi-Fi nomini chaqiramiz

function MainContent() {
  // Wi-Fi ga ulanib, "value" ni oldik
  const theme = useContext(ThemeContext);

  return <p>Hozirgi tema: {theme}</p>;
}
\`\`\`

---

## 4. ⚖️ Context vs Redux (Yoki Zustand)

Context kichik va o'rta loyihalar (Mavzular, Tillarni o'zgartirish, Auth statusi) uchun ajoyib. Lekin tez-tez o'zgarib turadigan katta ma'lumotlar uchun mos emas, chunki Context dagi bitta ma'lumot o'zgarsa, shu Context ga ulangan barcha komponentlar bir vaqtda qayta chiziladi (Keraksiz Re-renderlar).
Bunday paytda Redux yoki Zustand kabi tashqi (External) State Manager'lar kerak bo'ladi.
`,
  code: `import React, { useState, createContext, useContext } from "react";

// 1. Wi-Fi (Context) yaratamiz
const ThemeContext = createContext();
const LanguageContext = createContext();

export default function ContextDemo() {
  const [theme, setTheme] = useState("light"); // light yoki dark
  const [lang, setLang] = useState("uz");      // uz yoki en

  // 2. Butun ilovani Providerlar bilan o'raymiz
  // Ularning ichiga value propini beramiz
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider value={{ lang, setLang }}>
        <div style={{ padding: 20, border: "2px dashed #3498db" }}>
          <h2>Asosiy App (Ota komponent)</h2>
          <p>Ota komponentda holat saqlanmoqda. Lekin biz uni quyidagi bolalarga props sifatida EMAS, balki Context orqali yuboramiz.</p>
          
          <hr />
          
          {/* O'rtadagi Hech Nima Qilmaydigan Komponent */}
          <MiddleComponent />

        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

// --------------------------------------------------------------------
// Bu komponent umuman hech qanday props (theme yoki lang) ni qabul qilmayapti
// Shunchaki ichida boshqa komponentni ko'rsatyapti. Prop Drilling yo'q!
function MiddleComponent() {
  return (
    <div style={{ padding: 20, border: "2px dashed #95a5a6", margin: "20px 0" }}>
      <h4>O'rtadagi Komponent</h4>
      <p>Men hech narsani bilmayman, ota nima berganini ham bilmayman.</p>
      
      {/* Target komponentini chaqiramiz */}
      <TargetComponent />
    </div>
  );
}

// --------------------------------------------------------------------
// Va nihoyat eng ichkaridagi (chuqur) komponent.
function TargetComponent() {
  // 3. To'g'ridan-to'g'ri Context ga ulanamiz! (useContext)
  const { theme, setTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LanguageContext);

  // Tema ranglari
  const background = theme === "dark" ? "#2c3e50" : "#ecf0f1";
  const color = theme === "dark" ? "#ecf0f1" : "#2c3e50";

  // Tilga qarab so'zlar
  const greeting = lang === "uz" ? "Salom! Men eng ichki komponentman." : "Hello! I am the innermost component.";

  return (
    <div style={{ padding: 20, background, color, borderRadius: 8, transition: "0.3s" }}>
      <h4>Target Komponent (Eng ichkarida)</h4>
      <h2>{greeting}</h2>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        {/* Tilni o'zgartirish tugmasi */}
        <button onClick={() => setLang(lang === "uz" ? "en" : "uz")}>
          {lang === "uz" ? "🇺🇸 English" : "🇺🇿 O'zbekcha"}
        </button>

        {/* Mavzuni o'zgartirish tugmasi */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️ Yorug' rejim" : "🌙 Tungi rejim"}
        </button>
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Context dan o'qib olish",
      instruction: "Ota komponent `MessageContext` orqali `\"React zor!\"` matnini yuboryapti. `Child` komponenti ichida `useContext` dan foydalanib o'sha xabarni ekranga chiqaring.",
      startingCode: "import React, { createContext, useContext } from 'react';\n\nconst MessageContext = createContext();\n\nfunction Child() {\n  // 1. Shu yerda useContext(MessageContext) yordamida o'zgaruvchiga oling\n\n  return (\n    <div>\n      {/* 2. O'zgaruvchini shu yerda chiqaring */}\n      <h1>Xabar: </h1>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <MessageContext.Provider value=\"React zo'r!\">\n      <Child />\n    </MessageContext.Provider>\n  );\n}",
      hint: "const msg = useContext(MessageContext); yozing va <h1>Xabar: {msg}</h1> qilib chiqaring.",
      test: "if (!code.includes('useContext(MessageContext)')) return 'Child ichida useContext ni ishlating.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Prop drilling nima o'zi?",
      options: [
        "React ilovasidagi xakerlik hujumi (vulnerability)",
        "Ma'lumotni ota komponentdan eng chuqurdagi (masalan 5-qavatdagi) bola komponentga yetkazish uchun, o'rtadagi barcha umuman aloqasi bo'lmagan komponentlarga ham props orqali zanjirdek berib o'tish holati.",
        "Komponent ichiga children yuborishning bir usuli",
        "Bu xususiyat faqat Context API da bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Prop drilling (burmalash) koddagi eng ko'p uchraydigan noqulayliklardan biri. Uni yo'qotish uchun Context API, Redux yoki Zustand ishlatiladi."
    },
    {
      question: "Quyidagilardan qaysi biri Context ishlatish uchun to'g'ri ketma-ketlik?",
      options: [
        "createContext -> useContext -> Provider",
        "Provider -> createContext -> useContext",
        "createContext -> Provider -> useContext",
        "useContext -> Provider -> createContext"
      ],
      correctAnswer: 2,
      explanation: "Avval context obyekti yaratiladi (createContext). Keyin butun app yoki bir qismi o'raladi va value uzatiladi (Provider). Keyin esa kimga kerak bo'lsa ichkaridan turib chaqirib oladi (useContext)."
    }
  ]
};

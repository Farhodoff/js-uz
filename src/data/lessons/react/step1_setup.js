export const step1_setup = {
  id: "step1_setup",
  title: "1-DARS: React ga Kirish va Loyihani Sozlash",
  content: `
# 1-DARS: React ga Kirish va Loyihani Sozlash

## 1. React Nima va Nima Uchun Kerak?

React — bu Facebook (Meta) tomonidan 2013-yilda ochiq manbaga (open-source) chiqarilgan **JavaScript kutubxonasi** bo'lib, foydalanuvchi interfeyslarini (UI) yaratish uchun mo'ljallangan.

### Muammo: Katta ilovalar "spagetti" ga aylanadi

2010-yillar boshida Facebook murakkablashib borardi. "Chat", "Yangiliklar tasmasi" kabi qismlar bir-biriga bog'liq edi. Bir joyda o'zgarish bo'lsa, boshqa joylar buzilardi. Oddiy jQuery bilan boshqarish imkonsiz bo'lib qoldi.

**Hayotiy o'xshatish:** 1000 ta chiroq bilan bezatilgan xonangiz bor. Har bir chiroq alohida simga ulangan. Bitta simni o'zgartirmoqchi bo'lsangiz, qaysi sim qaysi chiroqqa borishini bilmaysiz. React bu muammoni **komponentlarga asoslangan arxitektura** orqali hal qildi.

### React ning asosiy afzalliklari:

| Xususiyat | Tushuntirish |
|-----------|-------------|
| **Komponent asosli** | UI ni kichik, qayta ishlatiladigan qismlarga bo'lamiz |
| **Virtual DOM** | Faqat o'zgargan qismlarni yangilaydi |
| **Bir yo'nalishli ma'lumot oqimi** | Ma'lumotlar yuqoridan pastga oqadi |
| **Katta ekosistema** | React Router, Redux, Next.js va minglab kutubxonalar |

---

## 2. Virtual DOM — React ning Siri

### Real DOM sekin, Virtual DOM tez

React xotirada Real DOM ning **engil nusxasini** (Virtual DOM) saqlaydi. State o'zgarganda:
1. React yangi Virtual DOM yaratadi
2. Eski bilan solishtiradi (**Diffing** algoritmi)
3. Faqat farqli qismlarni Real DOM ga yozadi (**Reconciliation**)

**Hayotiy o'xshatish:** Katta restoran menyu kitobini to'liq qayta bosish o'rniga, faqat narx o'zgargan sahifalarni almashtirish kabi.

\`\`\`mermaid
graph TD
    A["State yoki Props o'zgarishi"] --> B["Yangi Virtual DOM yaratiladi"]
    B --> C["Diffing: eski vs yangi Virtual DOM"]
    C --> D{"Farq bormi?"}
    D -->|Ha| E["Faqat farqli qismlar Real DOM ga yoziladi"]
    D -->|Yo'q| F["Hech narsa o'zgarmaydi"]
    E --> G["Brauzer ekranni yangilaydi"]
    style A fill:#e74c3c,color:#fff
    style E fill:#2ecc71,color:#fff
\`\`\`

---

## 3. SPA vs MPA

### MPA (Multi-Page Application)
Har safar foydalanuvchi havolani bosganda, server yangi HTML sahifasini yuboradi va brauzer qaytadan yuklaydi.

### SPA (Single-Page Application) — React
Faqat bir marta HTML yuklanadi. Keyingi navigatsiyalarda JavaScript faqat JSON oladi va React DOM ni yangilaydi.

\`\`\`mermaid
graph LR
    subgraph MPA["MPA - Ko'p Sahifali"]
        M1["Havola bosiladi"] --> M2["Server yangi HTML"]
        M2 --> M3["Sahifa qayta yuklanadi"]
    end
    subgraph SPA["SPA - React"]
        S1["Havola bosiladi"] --> S2["fetch JSON"]
        S2 --> S3["React DOM yangilaydi"]
    end
    style M3 fill:#e74c3c,color:#fff
    style S3 fill:#2ecc71,color:#fff
\`\`\`

| Xususiyat | MPA | SPA (React) |
|-----------|-----|-------------|
| Navigatsiya | Sekin, oq ekran | Tez, silliq |
| SEO | Oson | Murakkabroq |
| UX | Oddiy | Ilova kabi |

---

## 4. Vite bilan Loyiha Yaratish

\`\`\`bash
# Yangi loyiha yaratish
npm create vite@latest mening-ilovam -- --template react

# Papkaga kirish
cd mening-ilovam

# Kutubxonalarni o'rnatish
npm install

# Ishga tushirish
npm run dev
\`\`\`

| Xususiyat | CRA (Eski) | Vite (Yangi) |
|-----------|-----------|-------------|
| Ishga tushirish | 30-60 soniya | < 1 soniya |
| HMR | Sekin | Bir zumda |
| Holati | Tashlab ketilgan | Faol |

---

## 5. Loyiha Tuzilmasi

\`\`\`
mening-ilovam/
├── node_modules/      ← O'rnatilgan kutubxonalar (gitga yuklamang!)
├── public/            ← Statik fayllar
├── src/               ← Bizning kodlarimiz shu yerda!
│   ├── App.jsx        ← Asosiy komponent
│   ├── App.css        ← App uchun CSS
│   └── main.jsx       ← Kirish nuqtasi (entry point)
├── index.html         ← Asosiy HTML (bitta!)
└── package.json       ← Loyiha "pasporti"
\`\`\`

**\`src/main.jsx\`** — React ni ishga tushiradi:
\`\`\`jsx
// React va ReactDOM kutubxonalarini import qilamiz
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 'root' ID li div ni topib, React ilovasini joylashtiramiz
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
\`\`\`

**\`src/App.jsx\`** — Asosiy komponent:
\`\`\`jsx
// CSS faylini import qilamiz
import './App.css'

// App — asosiy komponentimiz (katta harf bilan boshlanadi!)
function App() {
  return (
    <div className="App">
      <h1>Salom, React!</h1>
    </div>
  )
}

export default App
\`\`\`

---

## 6. ❌ YOMON va ✅ YAXSHI Yondashuvlar

### node_modules ni gitga yuklash

\`\`\`bash
# ❌ YOMON — hech qachon bu qilinmasin!
git add node_modules/

# ✅ YAXSHI — .gitignore ga qo'shing
# .gitignore:
node_modules/
dist/
.env
\`\`\`

### Import yo'llari

\`\`\`jsx
// ❌ YOMON — noto'g'ri yo'l
import App from 'App'

// ✅ YAXSHI — to'g'ri nisbiy yo'l
import App from './App'
\`\`\`

### CSS class qo'shish

\`\`\`jsx
// ❌ YOMON — HTML da class ishlatiladi, JSX da emas!
<div class="card">

// ✅ YAXSHI — JSX da className ishlatiladi
<div className="card">
\`\`\`

---

## 7. Intervyu Savollari

**1. Virtual DOM nima va u qanday ishlaydi?**
*Javob:* Virtual DOM — Real DOM ning xotiradagi engil JavaScript obyekt nusxasi. State o'zgarganda React yangi Virtual DOM yaratadi, diffing algoritmi orqali eski vs yangi ni solishtiradi, va faqat farqli qismlarni Real DOM ga yozadi (reconciliation). Bu Real DOM ni to'g'ridan-to'g'ri manipulatsiya qilishdan ancha tezroq.

**2. SPA va MPA ning asosiy farqlari qanday?**
*Javob:* MPA da har bir navigatsiyada server yangi HTML sahifasini yuboradi, brauzer qaytadan yuklaydi (sekin, oq ekran). SPA da faqat bir marta HTML yuklanadi, keyingi navigatsiyalarda JavaScript JSON ma'lumotni oladi, React DOM ni yangilaydi (tez, oq ekran yo'q).

**3. Vite va CRA farqi nimada?**
*Javob:* CRA eski, sekin (30-60 soniya ishga tushirish) va hozirda qo'llab-quvvatlanmayapti. Vite zamonaviy, ESM asosida ishlaydi, 1 soniyadan kam ishga tushadi, HMR tez. Yangi loyihalar uchun Vite tavsiya etiladi.

**4. package.json faylining vazifasi nima?**
*Javob:* Loyiha "pasporti" — unda loyiha nomi, versiyasi, skriptlari (dev, build) va barcha kutubxonalar ro'yxati saqlanadi. npm install bu faylni o'qib, kerakli kutubxonalarni o'rnatadi.
`,
  code: `// src/App.jsx — Birinchi React komponentingiz
import React from 'react'

// App — bu bizning asosiy komponentimiz
// Funksiya nomi katta harf bilan boshlanishi SHART!
function App() {
  // JSX qaytaramiz (HTML ga o'xshash JavaScript sintaksisi)
  return (
    <div>
      <h1>Salom, React! 👋</h1>
      <p>Bu mening birinchi React ilovam</p>
    </div>
  )
}

// Boshqa fayllar bu komponentni import qilishi uchun
export default App`,
  exercises: [
    {
      id: 1,
      title: "Birinchi Komponent",
      instruction: "App funksiyasini o'zgartiring: u h1 da ismingizni va p da sevimli tilni ko'rsatsin.",
      startingCode: "function App() {\n  return (\n    <div>\n      <h1>Salom Dunyo</h1>\n    </div>\n  )\n}\n\nexport default App",
      hint: "return ichida h1 va p teglarini yozing. Barcha teglar bitta ota elementga o'ralgan bo'lishi kerak.",
      solution: "function App() {\n  return (\n    <div>\n      <h1>Salom, men Abdulloh!</h1>\n      <p>Sevimli tilim: JavaScript</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<h1>') || !code.includes('<p>')) return 'h1 va p teglarini qo\'shing'; return null;"
    },
    {
      id: 2,
      title: "Ro'yxat ko'rsatish",
      instruction: "ul va li teglari yordamida 3 ta sevimli ovqat nomini ro'yxat qilib ko'rsating.",
      startingCode: "function App() {\n  return (\n    <div>\n      {/* Bu yerga kod yozing */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "<ul> ichiga uchta <li> qo'shing",
      solution: "function App() {\n  return (\n    <div>\n      <h2>Sevimli ovqatlarim:</h2>\n      <ul>\n        <li>Osh</li>\n        <li>Manti</li>\n        <li>Somsa</li>\n      </ul>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<ul>') || !code.includes('<li>')) return 'ul va li teglarini qo\'shing'; return null;"
    },
    {
      id: 3,
      title: "className ishlatish",
      instruction: "div ga className='card', h2 ga className='title' bering. React da class o'rniga className ishlatiladi!",
      startingCode: "function App() {\n  return (\n    <div>\n      <h2>Sarlavha</h2>\n      <p>Matn</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "HTML dagi class=\"...\" o'rniga JSX da className=\"...\" yoziladi.",
      solution: "function App() {\n  return (\n    <div className='card'>\n      <h2 className='title'>Sarlavha</h2>\n      <p>Matn</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('className')) return 'className ishlatishni unutmang!'; return null;"
    },
    {
      id: 4,
      title: "Fragment ishlatish",
      instruction: "Qo'shimcha div o'rniga React Fragment (<>...</>) ishlatib, h1 va p ni qaytaring.",
      startingCode: "function App() {\n  return (\n    <div>\n      <h1>Sarlavha</h1>\n      <p>Matn</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "<div> ni <> va </> bilan almashtiring.",
      solution: "function App() {\n  return (\n    <>\n      <h1>Sarlavha</h1>\n      <p>Matn</p>\n    </>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<>') || !code.includes('</>')) return 'Fragment <> </> ishlatishni unutmang!'; return null;"
    },
    {
      id: 5,
      title: "Self-closing tegler",
      instruction: "img va input teglarini to'g'ri self-closing formatda yozing: <img /> va <input />",
      startingCode: "function App() {\n  return (\n    <div>\n      {/* img va input bu yerga */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "JSX da <img src='...' alt='...' /> va <input type='text' /> shaklida yozing.",
      solution: "function App() {\n  return (\n    <div>\n      <img src='https://via.placeholder.com/150' alt='Rasm' />\n      <input type='text' placeholder='Matn kiriting' />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<img') || !code.includes('<input')) return 'img va input teglarini qo\'shing'; if (!code.includes('/>')) return 'Self-closing formatda yozing: <img /> <input />'; return null;"
    },
    {
      id: 6,
      title: "Inline stil",
      instruction: "p tegiga inline stil bering: matn rangi qizil, font hajmi 24px. style={{color: 'red', fontSize: '24px'}}",
      startingCode: "function App() {\n  return (\n    <div>\n      <p>Bu matn stillanishi kerak</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "style={} ichiga JS obyekt yozing: {{color: 'red', fontSize: '24px'}}",
      solution: "function App() {\n  return (\n    <div>\n      <p style={{color: 'red', fontSize: '24px'}}>Bu matn stillanishi kerak</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('style={{')) return 'style={{...}} formatida yozing'; return null;"
    },
    {
      id: 7,
      title: "O'zgaruvchi ko'rsatish",
      instruction: "const ism = 'Kamola' va const yosh = 25 yarating va ularni JSX da {ism} va {yosh} orqali ko'rsating.",
      startingCode: "function App() {\n  // O'zgaruvchilarni bu yerda yarating\n  \n  return (\n    <div>\n      {/* O'zgaruvchilarni bu yerda ko'rsating */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "return dan OLDIN: const ism = 'Kamola'. Keyin JSX da {ism} deb ko'rsating.",
      solution: "function App() {\n  const ism = 'Kamola'\n  const yosh = 25\n\n  return (\n    <div>\n      <p>Ism: {ism}</p>\n      <p>Yosh: {yosh}</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('{ism}') && !code.includes('{ ism }')) return 'ism o\'zgaruvchisini {} ichida ko\'rsating'; return null;"
    },
    {
      id: 8,
      title: "Shartli ko'rsatish",
      instruction: "const kirganmi = true yarating. Ternary operator: {kirganmi ? <p>Xush kelibsiz!</p> : <p>Iltimos kiring</p>}",
      startingCode: "function App() {\n  const kirganmi = true\n  \n  return (\n    <div>\n      {/* Shartli ko'rsatish bu yerda */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "{ kirganmi ? <p>Xush kelibsiz!</p> : <p>Iltimos kiring</p> }",
      solution: "function App() {\n  const kirganmi = true\n  \n  return (\n    <div>\n      {kirganmi ? <p>Xush kelibsiz!</p> : <p>Iltimos kiring</p>}\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('?') || !code.includes(':')) return 'Ternary operator ? : ishlatishni unutmang'; return null;"
    },
    {
      id: 9,
      title: "Komponentni chaqirish",
      instruction: "Salom nomli komponent yarating (p qaytarsin). App da <Salom /> ni chaqiring.",
      startingCode: "// Salom komponentini bu yerda yarating\n\n\nfunction App() {\n  return (\n    <div>\n      {/* Salom komponentini bu yerga qo'shing */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "function Salom() { return <p>Salom Dunyo!</p> }. Keyin App ichida: <Salom />",
      solution: "function Salom() {\n  return <p>Salom Dunyo!</p>\n}\n\nfunction App() {\n  return (\n    <div>\n      <Salom />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('function Salom') && !code.includes('const Salom')) return 'Salom komponentini yarating'; if (!code.includes('<Salom')) return 'App ichida <Salom /> ni chaqiring'; return null;"
    },
    {
      id: 10,
      title: "npm skriptlarini bilish",
      instruction: "const ishgaTushirish = 'npm run dev' o'zgaruvchisini yarating va uni p tegida ko'rsating.",
      startingCode: "// Vite loyihasini ishga tushirish uchun:\n// const ishgaTushirish = ???\n\nexport default function App() {\n  return <p>Buyruq shu yerda ko'rinsin</p>\n}",
      hint: "Vite da ishga tushirish buyrug'i: npm run dev",
      solution: "const ishgaTushirish = 'npm run dev'\n\nexport default function App() {\n  return <p>{ishgaTushirish}</p>\n}",
      test: "if (!code.includes('npm run dev')) return 'npm run dev ni yozing'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React qaysi yilda va qaysi kompaniya tomonidan ochiq manbaga chiqarildi?",
      options: ["2010, Google", "2013, Facebook (Meta)", "2015, Microsoft", "2011, Twitter"],
      correctAnswer: 1,
      explanation: "React 2013-yilda Facebook (hozirgi Meta) tomonidan ochiq manbaga chiqarildi. Uni Jordan Walke yaratgan."
    },
    {
      question: "Virtual DOM nima?",
      options: [
        "Brauzerning maxsus DOM turi",
        "Real DOM ning xotiradagi engil JavaScript obyekt nusxasi",
        "Serverda saqlanadigan HTML nusxasi",
        "CSS ni boshqarish tuzilmasi"
      ],
      correctAnswer: 1,
      explanation: "Virtual DOM — React tomonidan xotirada saqlanadigan Real DOM ning engil JavaScript obyekt nusxasi. U Real DOM ni to'g'ridan-to'g'ri manipulatsiya qilmasdan, avval o'zida o'zgartirish qiladi."
    },
    {
      question: "React Reconciliation jarayonida nima sodir bo'ladi?",
      options: [
        "Butun sahifa qayta yuklanadi",
        "Faqat o'zgargan qismlar Real DOM ga yoziladi",
        "Server yangi HTML yuboradi",
        "CSS fayllar qayta o'qiladi"
      ],
      correctAnswer: 1,
      explanation: "Reconciliation — React ning Virtual DOM dagi farqlarni aniqlash va faqat o'zgargan qismlarni Real DOM ga yozish jarayoni."
    },
    {
      question: "SPA ning asosiy afzalligi nima?",
      options: [
        "SEO uchun juda qulay",
        "Har sahifada yangi HTML yuklanadi",
        "Navigatsiya tez, oq ekran ko'rinmaydi",
        "Server har safar yangi HTML yuboradi"
      ],
      correctAnswer: 2,
      explanation: "SPA da faqat bir marta HTML yuklanadi. Keyingi navigatsiyalarda JavaScript faqat JSON oladi, React DOM ni yangilaydi — tez va silliq."
    },
    {
      question: "Yangi React loyiha yaratishda qaysi vosita hozir tavsiya etiladi?",
      options: ["Create React App (CRA)", "jQuery", "Vite", "Webpack CLI"],
      correctAnswer: 2,
      explanation: "Vite — zamonaviy, tez va faol rivojlanayotgan build vositasi. CRA endi qo'llab-quvvatlanmayapti va sekin."
    },
    {
      question: "node_modules/ papkasi nima uchun kerak?",
      options: [
        "Bizning asosiy kodlarimiz shu yerda",
        "O'rnatilgan kutubxonalar shu yerda saqlanadi",
        "Produksiya build fayllari shu yerda",
        "HTML va CSS fayllar shu yerda"
      ],
      correctAnswer: 1,
      explanation: "node_modules/ da npm orqali o'rnatilgan barcha kutubxonalar saqlanadi. Bu papkani gitga yuklamaslik kerak — .gitignore ga qo'shiladi."
    },
    {
      question: "React loyihasining 'kirish nuqtasi' (entry point) qaysi fayl?",
      options: ["App.jsx", "index.html", "src/main.jsx", "package.json"],
      correctAnswer: 2,
      explanation: "src/main.jsx — React ilovasining kirish nuqtasi. U ReactDOM.createRoot() bilan 'root' div ni topadi va App komponentini render qiladi."
    },
    {
      question: "package.json da 'dev' skriptini qanday ishga tushirish mumkin?",
      options: ["vite dev", "node vite", "npm run dev", "npx dev"],
      correctAnswer: 2,
      explanation: "npm run <skript_nomi> buyrug'i package.json dagi scripts bo'limidagi buyruqni ishga tushiradi."
    },
    {
      question: "React da CSS class qo'shish uchun qaysi atributdan foydalaniladi?",
      options: ["class", "cssClass", "className", "classList"],
      correctAnswer: 2,
      explanation: "JSX da class o'rniga className ishlatiladi, chunki class JavaScript da reserved keyword (zahiralangan so'z)."
    },
    {
      question: "Vite ishga tushirganda qaysi URL da ko'rish mumkin?",
      options: ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173", "http://localhost:4200"],
      correctAnswer: 2,
      explanation: "Vite default port sifatida 5173 ni ishlatadi. CRA esa 3000 portidan foydalanadi."
    },
    {
      question: "MPA da foydalanuvchi havolani bosganida nima sodir bo'ladi?",
      options: [
        "JavaScript DOM ni yangilaydi",
        "React Virtual DOM ni o'zgartiradi",
        "Brauzer serverdan yangi HTML sahifasini yuklab, qayta ko'rsatadi",
        "Faqat zarur JSON ma'lumot olinadi"
      ],
      correctAnswer: 2,
      explanation: "MPA da har bir navigatsiyada server yangi HTML sahifasini yuboradi va brauzer qaytadan yuklaydi — sekin va 'oq ekran' ko'rinadi."
    },
    {
      question: "React da export default App nima uchun yoziladi?",
      options: [
        "App ni serverga yuborish uchun",
        "App komponentini boshqa fayllar import qilishi uchun",
        "App ni HTML ga ulash uchun",
        "CSS stillarni qo'llash uchun"
      ],
      correctAnswer: 1,
      explanation: "export default App — boshqa fayllarda import App from './App' deb import qilib ishlatish imkonini beradi."
    },
    {
      question: "React.StrictMode nima uchun ishlatiladi?",
      options: [
        "Ilovani produksiyaga tayyorlash uchun",
        "CSS stillarni qo'llash uchun",
        "Rivojlanish vaqtida potensial muammolarni aniqlash uchun",
        "Virtual DOM ni o'chirish uchun"
      ],
      correctAnswer: 2,
      explanation: "React.StrictMode rivojlanish vaqtida qo'shimcha tekshiruvlar o'tkazadi: deprecated API lar, kutilmagan yon effektlar. Produksiyada hech qanday ta'siri yo'q."
    }
  ]
};

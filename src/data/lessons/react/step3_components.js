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

Loyihada yuzlab komponentlar bo'lishi mumkin. Ularni bitta faylda yozish daxshatli ish! Shuning uchun har bir komponent o'zining alohida \`.js\` (yoki \`.jsx\`) faylida yaratiladi. Boshqa joyda ishlata olish uchun uni **export** qilish kerak.

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

---

## 5. 🧩 UI Modulligi Falsafasi (UI Modularity Philosophy)

React ning eng katta kuchlaridan biri bu **UI modulligi** falsafasidir. Modullik — bu katta va murakkab tizimni kichik, mustaqil va oson boshqariladigan qismlarga (modullarga) bo'lish demakdir.

Oddiy veb-sahifani tasavvur qiling. Unda yuqori qism (Header), asosiy qism (Main) va pastki qism (Footer) mavjud. React'da biz butun sahifani bitta katta faylda yozmaymiz. Buning o'rniga, har bir qismni alohida komponent sifatida yaratamiz va ularni birlashtiramiz.

**Nima uchun modullik muhim?**
1. **Oson boshqaruv (Maintainability):** Agar sahifadagi tugma xato ishlayotgan bo'lsa, minglab qator kodlar orasidan qidirmaysiz. To'g'ridan-to'g'ri \`Button\` komponentiga kirib xatoni tuzatasiz.
2. **Jamoaviy ishlash (Collaboration):** Bir dasturchi \`Header\` ustida ishlasa, boshqasi \`Footer\` ustida ishlashi mumkin. Ular bir-biriga xalaqit bermaydi.
3. **Mustaqillik (Isolation):** Bir komponentning o'zgarishi boshqa komponentlarga ta'sir qilmaydi.

Quyidagi chizmada tipik React ilovasining komponentlar daraxti (Component Tree) tasvirlangan. \`App\` barchasini o'z ichiga oluvchi ota komponent hisoblanadi:

\`\`\`mermaid
graph TD
    App["App (Asosiy Komponent)"] --> Header["Header (Yuqori qism)"]
    App --> Main["Main (Asosiy kontent)"]
    App --> Footer["Footer (Pastki qism)"]
    
    style App fill:#61dafb,stroke:#333,stroke-width:2px,color:#000
    style Header fill:#f9f9f9,stroke:#333,stroke-width:1px,color:#000
    style Main fill:#f9f9f9,stroke:#333,stroke-width:1px,color:#000
    style Footer fill:#f9f9f9,stroke:#333,stroke-width:1px,color:#000
\`\`\`
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
      "id": 1,
      "title": "Main komponentini yaratish",
      "instruction": "`Main` nomli komponent yarating va undan `<h2>Asosiy qism</h2>` qaytaring. Uni `App` ichida `Header` va `Footer` orasida ishlating.",
      "startingCode": "import React from 'react';\n\nfunction Header() {\n  return <header>Header</header>;\n}\n\nfunction Footer() {\n  return <footer>Footer</footer>;\n}\n\n// Shu yerda Main komponentini yarating!\n\n\nexport default function App() {\n  return (\n    <div>\n      <Header />\n      {/* Main ni shu yerdan chaqiring */}\n      <Footer />\n    </div>\n  );\n}",
      "hint": "function Main() { return <main><h2>Asosiy qism</h2></main>; } va App ichida <Main /> yozing.",
      "test": "if(!code.match(/function Main/)) return 'Main komponentini yarating'; if(!code.match(/<Main\\s*\\/>/)) return 'Main komponentini App ichida chaqiring'; return null;"
    },
    {
      "id": 2,
      "title": "Kichik harfli nomni to'g'irlash",
      "instruction": "Dasturchi `navbar` deb kichik harf bilan komponent yaratgan va u ishlamayapti. Uni katta harf bilan `Navbar` ga o'zgartiring va `App` ichida to'g'ri chaqiring.",
      "startingCode": "import React from 'react';\n\nfunction navbar() {\n  return <nav>Menyular</nav>;\n}\n\nexport default function App() {\n  return (\n    <div>\n      <navbar />\n    </div>\n  );\n}",
      "hint": "Komponent nomini `function Navbar()` deb va uni ishlatish joyida `<Navbar />` deb yozing.",
      "test": "if(code.includes('function navbar') || code.includes('<navbar />')) return 'Kichik harfda emas, katta harfda bo\\'lishi kerak.'; if(!code.includes('function Navbar') || !code.includes('<Navbar />')) return 'Navbar komponentini va uni chaqirishni to\\'g\\'irlamadingiz.'; return null;"
    },
    {
      "id": 3,
      "title": "Komponentni qayta ishlatish (Reusability)",
      "instruction": "`Button` nomli komponent yarating va u `<button>Click me</button>` qaytarsin. `App` ichidagi `div` da bu komponentni ketma-ket **3 marta** chaqiring.",
      "startingCode": "import React from 'react';\n\n// Button komponentini yarating\n\n\nexport default function App() {\n  return (\n    <div>\n      {/* Shu yerda Button ni 3 marta chaqiring */}\n    </div>\n  );\n}",
      "hint": "Bitta kod yozib `<Button />` ni 3 marta takrorlang.",
      "test": "let count = (code.match(/<Button\\s*\\/>/g) || []).length; if(count < 3) return 'Button komponentini 3 marta chaqirmadingiz'; return null;"
    },
    {
      "id": 4,
      "title": "Komponentlarni ichma-ich joylash (Nesting)",
      "instruction": "`Logo` va `Menu` nomli ikkita kichik komponentlar mavjud. Vazifangiz: `Header` komponenti ichida avval `<Logo />`, keyin `<Menu />` ni chaqirish.",
      "startingCode": "import React from 'react';\n\nfunction Logo() { return <h1>LOGO</h1>; }\nfunction Menu() { return <ul><li>Asosiy</li></ul>; }\n\nfunction Header() {\n  return (\n    <header>\n      {/* Logo va Menu ni shu yerda chaqiring */}\n    </header>\n  );\n}\n\nexport default function App() {\n  return <Header />;\n}",
      "hint": "<header> ichida xuddi HTML tegdek ularni yozing: <Logo /> va tagidan <Menu />.",
      "test": "if(!code.includes('<Logo />') || !code.includes('<Menu />')) return 'Header ichida Logo va Menu komponentlarini chaqirish esdan chiqdi.'; return null;"
    },
    {
      "id": 5,
      "title": "Return dagi ota teg xatosi",
      "instruction": "`Profile` komponentidan 2 ta teg qaytarilmoqda, lekin ular bitta ota elementga (masalan `div`) o'ralmagan. Shuni to'g'irlang.",
      "startingCode": "import React from 'react';\n\nfunction Profile() {\n  return (\n    <h2>Eshmat Toshmatov</h2>\n    <p>Dasturchi</p>\n  );\n}\n\nexport default function App() {\n  return <Profile />;\n}",
      "hint": "Ikkala elementni bitta <div> ... </div> ichiga oling.",
      "test": "if(code.match(/return\\s*\\(\\s*<h2/)) return 'Elementlarni bitta ota teg (masalan div) ichiga olishni unutmang!'; return null;"
    },
    {
      "id": 6,
      "title": "Arrow function ko'rinishidagi komponent",
      "instruction": "`Banner` komponentini ES6 dagi **Arrow function** yordamida yarating. U `<div>Reklama</div>` qaytarsin.",
      "startingCode": "import React from 'react';\n\n// Banner komponentini shu yerda arrow function ko'rinishida yarating\n\n\nexport default function App() {\n  return <Banner />;\n}",
      "hint": "const Banner = () => { return <div>Reklama</div>; };",
      "test": "if(!code.includes('const Banner') && !code.includes('let Banner')) return 'Banner komponentini Arrow function (const Banner = () => ...) orqali yarating'; return null;"
    },
    {
      "id": 7,
      "title": "Fragmentdan foydalanish",
      "instruction": "`Section` nomli komponent yarating va undan JSX qaytarishda bo'sh teglardan (ya'ni `<> ... </>` Fragmentdan) foydalaning. Ichida sarlavha va matn bo'lsin. Va uni App da ishlating.",
      "startingCode": "import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"app\">\n      {/* Section komponentini yarating va shu yerda ishlating */}\n    </div>\n  );\n}",
      "hint": "function Section() { return (<> <h3>Sarlavha</h3> <p>Matn</p> </>); } va App ichida <Section /> yozing.",
      "test": "if(!code.includes('<>') || !code.includes('</>')) return 'Fragment (<> ... </>) ishlatganingizga ishonch hosil qiling.'; if(!code.match(/<Section\\s*\\/>/)) return 'Section ni App ichida chaqiring.'; return null;"
    },
    {
      "id": 8,
      "title": "Return dagi probel xatosi",
      "instruction": "`Card` komponentida `return` va ochilgan qavs `(` boshqa-boshqa qatorlarda. JavaScript buni xato deb o'ylaydi. Qavsni `return` bilan bir qatorga chiqaring.",
      "startingCode": "import React from 'react';\n\nfunction Card() {\n  return \n  (\n    <div className=\"card\">\n      <p>Karta kontenti</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return <Card />;\n}",
      "hint": "Qavs `return (` ko'rinishida bo'lishi kerak.",
      "test": "if(code.match(/return\\s*\\n\\s*\\(/)) return 'return va ( orasida yangi qator bo\\'lmasligi kerak, bir xatorda yozing!'; return null;"
    },
    {
      "id": 9,
      "title": "Export default qo'shish",
      "instruction": "`Sidebar` komponenti boshqa faylda ishlatilishi uchun uni eksport qilishni esdan chiqarishdi. Faylga to'g'ri eksport qoidasini qo'shing.",
      "startingCode": "import React from 'react';\n\nfunction Sidebar() {\n  return <aside>Yon menyu</aside>;\n}\n\n// Shu joyda Sidebar ni export default qiling",
      "hint": "Eng tagida `export default Sidebar;` deb yozing, yoki tepadagi function so'zi oldidan yozib qo'ying.",
      "test": "if(!code.includes('export default Sidebar') && !code.includes('export default function Sidebar')) return 'export default kalit so\\'zlari yozilmadi.'; return null;"
    },
    {
      "id": 10,
      "title": "Ko'p marta ishlatish",
      "instruction": "Sizda `User` nomli komponent bor. `App` ichidagi `ul` tegi orasida bu `User` komponentini **4 marta** ishlating.",
      "startingCode": "import React from 'react';\n\nfunction User() {\n  return <li>Foydalanuvchi</li>;\n}\n\nexport default function App() {\n  return (\n    <ul>\n      {/* Shu yerda User ni 4 marta chaqiring */}\n    </ul>\n  );\n}",
      "hint": "<ul> tegi ichida to'rt marta ketma-ket <User /> deb yozing.",
      "test": "let m = code.match(/<User\\s*\\/>/g); if(!m || m.length < 4) return 'User komponenti 4 marta ishlatilishi kerak.'; return null;"
    }
  ],
  quizzes: [
    {
      "question": "Nega komponent nomi doim katta harf bilan boshlanishi kerak?",
      "options": [
        "Bu JavaScript ning qat'iy qoidasi bo'lgani uchun",
        "React kichik harfda yozilganlarni oddiy HTML teglari (div, span) deb tushunadi, katta harflini esa Custom Komponent deb biladi",
        "Katta harfda yozilmasa CSS ishlamay qoladi",
        "Bu xususiyat faqat React ning eski versiyalarida bor"
      ],
      "correctAnswer": 1,
      "explanation": "Babel kompilyatorida kichik harfli teglar to'g'ridan-to'g'ri string (<div/>) sifatida uzatilsa, katta harflilari funksiya (<Header/> -> React.createElement(Header)) sifatida chaqiriladi."
    },
    {
      "question": "React ilovasida eski Class komponentlar o'rnini nima to'liq egalladi?",
      "options": [
        "Object komponentlar",
        "Array komponentlar",
        "Funksional (Functional) komponentlar",
        "Server komponentlar"
      ],
      "correctAnswer": 2,
      "explanation": "React Hooks (2018 yil) paydo bo'lgandan so'ng, sodda va o'qilishi oson bo'lgan Funksional komponentlar Class komponentlarni butunlay siqib chiqardi."
    },
    {
      "question": "React Komponenti o'zi nima?",
      "options": [
        "Brauzerning yangi funksiyasi",
        "Oddiy HTML fayl",
        "O'zining ko'rinishi va mantiqiga ega, mustaqil va qayta ishlatiladigan UI bo'lagi",
        "Bu shunchaki o'zgaruvchi"
      ],
      "correctAnswer": 2,
      "explanation": "React'da Komponentlar (Components) - bu dasturning interfeysini qismlarga bo'lish uchun ishlatiladigan mustaqil va mantiqqa ega bo'lgan qurilish g'ishtchalaridir."
    },
    {
      "question": "Komponentlarni alohida fayllarda yaratgandan so'ng, ularni boshqa joyda qanday ishlatamiz?",
      "options": [
        "require() yordamida",
        "import orqali faylga ulab, keyin HTML teg kabi chaqiramiz",
        "Ular avtomatik ishlaydi",
        "HTML dagi <link> orqali"
      ],
      "correctAnswer": 1,
      "explanation": "Zamonaviy React'da ES6 ning import/export mexanizmi ishlatiladi va ular maxsus teg sifatida (<ComponentName />) yoziladi."
    },
    {
      "question": "Komponentlarning eng afzal tomonlaridan biri nima?",
      "options": [
        "Ular dasturni sekinlashtiradi",
        "Ularni faqat bir marta ishlatish mumkin",
        "Ularni yozish juda qiyin",
        "Qayta ishlatuvchanlik (Reusability) - bitta kodni ko'p joyda takrorlamasdan ishlatish"
      ],
      "correctAnswer": 3,
      "explanation": "Dasturlashdagi DRY (Don't Repeat Yourself) qoidasini React komponentlar orqali amalga oshiradi."
    },
    {
      "question": "Reactda eng asosiy (ota) komponent odatda qanday nomlanadi?",
      "options": [
        "Index",
        "Root",
        "App",
        "Main"
      ],
      "correctAnswer": 2,
      "explanation": "Barcha yaratilgan komponentlar oxir-oqibat App komponentiga yig'iladi va App dasturning ildizi hisoblanadi."
    },
    {
      "question": "Komponent nima qaytarishi (return qilishi) shart?",
      "options": [
        "JSX kod (yoki null/bo'shliq)",
        "HTML fayl",
        "CSS kod",
        "Boshqa bir fayl nomi"
      ],
      "correctAnswer": 0,
      "explanation": "Har bir React komponenti React elementlarini ifodalovchi JSX qaytarishi kerak. Ba'zida ekranga hech narsa chizilmasa null qaytarishi ham mumkin."
    },
    {
      "question": "Bitta komponent ichida boshqa bir komponentni ishlatish nima deb ataladi?",
      "options": [
        "Styling",
        "Nesting (Ichma-ich joylashtirish)",
        "Fetching",
        "Routing"
      ],
      "correctAnswer": 1,
      "explanation": "Nesting bu huddi ruslarning 'Matryoshka' qo'g'irchog'idek komponentlarni bir-birining ichiga joylashtirish va yig'ishdir."
    },
    {
      "question": "Zamonaviy Funksional Komponent yaratish uchun JavaScript'ning qaysi kalit so'zi ishlatiladi?",
      "options": [
        "class",
        "function (yoki let/const bilan arrow function)",
        "new",
        "component"
      ],
      "correctAnswer": 1,
      "explanation": "Funksional komponentlar nomidan ham ma'lumki 'function' so'zi yoki ES6 Arrow function ko'rinishida yoziladi."
    },
    {
      "question": "Quyidagi nomlashlardan qaysi biri React komponenti uchun mos keladi?",
      "options": [
        "headerSection",
        "HeaderSection",
        "header-section",
        "HEADER_SECTION"
      ],
      "correctAnswer": 1,
      "explanation": "React komponentlari doim katta harf bilan (PascalCase) boshlanishi va yozilishi qabul qilingan."
    },
    {
      "question": "Agar komponent bir nechta element qaytarishi kerak bo'lsa va siz ortiqcha 'div' bo'lishini xohlamasangiz nima qilasiz?",
      "options": [
        "Elementlarni array [] ichida yozaman",
        "Bo'sh teglar (Fragment: <> ... </>) ishlataman",
        "Hech qanday ota element yozmayman",
        "style={display: none} yozib qo'yaman"
      ],
      "correctAnswer": 1,
      "explanation": "React Fragment (<React.Fragment> yoki uning qisqa shakli <>) ortiqcha DOM tugunlarini (node) yaratmasdan elementlarni guruhlash imkonini beradi."
    },
    {
      "question": "Komponentni boshqa faylda ishlata olish uchun fayl oxirida ko'pincha qaysi kod yoziladi?",
      "options": [
        "export default ComponentName;",
        "import ComponentName;",
        "module.export ComponentName;",
        "save ComponentName;"
      ],
      "correctAnswer": 0,
      "explanation": "ES6 modullarida 'export default' yordamida eksport qilingan elementni boshqa faylda istalgan nom bilan chaqirib olish mumkin."
    }
  ]
};

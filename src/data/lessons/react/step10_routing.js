export const step10_routing = {
  title: "10-DARS: Marshrutlash (Routing)",
  content: `
# 1. 🛣️ React'da Routing nima?

Eski uslubdagi veb-saytlarda (masalan, PHP yoki faqat HTML dagi), "Biz Haqimizda" sahifasiga o'tish uchun brauzer \`about.html\` faylini serverdan so'rar va butun sahifa boshqatdan yuklanar edi (Oq ekran miltillashi).

**React esa SPA (Single Page Application - Bir Sahifali Ilova)** hisoblanadi. U hech qachon sahifani yangilamaydi. Xo'sh, unda foydalanuvchini boshqa sahifaga qanday olib o'tamiz? 

Bunining yechimi — **Kutubxona orqali yolg'on sahifalar yaratish!** 
Odatda bu ish uchun **\`react-router-dom\`** degan eng mashhur kutubxona ishlatiladi. U URL manziliga qarab turadi va manzilda \`/about\` paydo bo'lganda \`About\` komponentini, \`/contact\` paydo bo'lganda \`Contact\` komponentini ekranda chizib beradi. Sahifa umuman miltillamaydi!

---

## 2. 🔌 O'rnatish va Asosiy Konfiguratsiya

Terminalda loyihangiz papkasiga kirib quyidagi buyruq orqali kutubxonani o'rnatasiz:
\`\`\`bash
npm install react-router-dom
\`\`\`

Undan foydalanishning 3 ta asosiy qadami bor:
1.  **\`BrowserRouter\`**: Butun loyihamizdagi \`App\` komponentini shu bilan o'rab chiqishimiz kerak (Odatda \`index.js\` faylida qilinadi).
2.  **\`Routes\`**: Barcha marshrutlarni jamlaydigan ota quti.
3.  **\`Route\`**: Aniq bir manzil (URL) va u uchun ishlashi kerak bo'lgan Komponent.

\`\`\`jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 404 xatolik sahifasi uchun yulduzcha (*) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

---

## 3. 🔗 Sahifadan-Sahifaga o'tish (Link)

Oddiy HTML da boshqa joyga o'tish uchun \`<a href="/about">\` yozardik. Lekin React'da bunday qilsak brauzer sahifani yangilab yuboradi (Refresh bo'ladi).

Buning o'rniga biz \`react-router-dom\` dan **\`Link\`** komponentini ishlatishimiz shart!

\`\`\`jsx
import { Link } from "react-router-dom";

// ...
<nav>
  <Link to="/">Bosh sahifa</Link>
  <Link to="/about">Biz haqimizda</Link>
</nav>
\`\`\`

> Eslatma: \`<NavLink>\` degan maxsus turi ham bor, uning farqi - agar foydalanuvchi hozir o'sha sahifada turgan bo'lsa unga avtomatik tarzda \`active\` degan CSS class qo'shib beradi (menyularni qizil qilib belgilab qo'yish uchun zo'r).

---

## 4. 动态 Dinamik Yo'nalishlar (Dynamic Routes)

Ko'pincha bizda bitta maxsus sahifa turli xil ma'lumotlarni ko'rsatishi kerak bo'ladi. Masalan, "Mahsulot Tafsilotlari" sahifasi.
Brauzer tepasida: \`/product/1\` yoki \`/product/123\` bo'lishi mumkin.

Buning uchun \`Route\` da ikki nuqta (\`:\`) bilan o'zgaruvchi e'lon qilinadi:
\`\`\`jsx
<Route path="/product/:id" element={<ProductDetail />} />
\`\`\`

O'sha komponent (ProductDetail) ichiga kirgandan keyin o'sha "123" raqamini (ID ni) olish uchun \`useParams\` hookidan foydalaniladi:
\`\`\`jsx
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  return <h2>Siz tanlagan mahsulot ID raqami: {id}</h2>;
}
\`\`\`

---

## 5. 🚜 Dasturiy o'tish (useNavigate)

Ba'zida foydalanuvchi linkni o'zi bosmaydi, balki bironta amalni bajarganidan so'ng (masalan tizimga kirdi - login qildi) uni majburan Bosh sahifaga uloqtirib yuborish kerak bo'ladi.
Buning uchun \`useNavigate\` hooki kerak:

\`\`\`jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // API tekshiruvi muvaffaqiyatli o'tdi...
    navigate('/dashboard'); // Dasturiy o'tkazish
  };

  return <button onClick={handleLogin}>Kirish</button>;
}
\`\`\`
`,
  code: `import React from "react";
// Bu yerda interaktiv oyna uchun Router imitatsiyasini o'rnatamiz
// Haqiqiy loyihada 'react-router-dom' dan olinadi
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

// 1. Sahifa komponentlari
function Home() {
  return <h2>Bosh Sahifaga Xush Kelibsiz! 🏠</h2>;
}

function About() {
  return (
    <div>
      <h2>Biz haqimizda ℹ️</h2>
      <p>Biz React'ni noldan o'rganayotgan yosh dasturchilarmiz.</p>
    </div>
  );
}

function ProductDetail() {
  // URL dagi :id parametrini ushlab olish
  const { id } = useParams();
  return (
    <div style={{ padding: 10, background: '#fcf3cf', border: '1px solid #f1c40f', borderRadius: 4 }}>
      <h2>Mahsulot Tafsiloti 🎁</h2>
      <p>Siz <strong>{id} - raqamli</strong> mahsulot sahifasidasiz!</p>
    </div>
  );
}

function NotFound() {
  return <h2 style={{ color: 'red' }}>404 - Bunday sahifa topilmadi! ❌</h2>;
}

// 2. Asosiy App komponenti
export default function App() {
  return (
    // Loyiha odatda BrowserRouter ichiga olinadi. (Muharrirda ishlashi uchun bitta o'ram kerak bo'ladi)
    <BrowserRouter>
      <div style={{ padding: 20, fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: 8 }}>
        
        {/* Navigatsiya menyusi */}
        <nav style={{ display: 'flex', gap: 15, marginBottom: 20, paddingBottom: 10, borderBottom: '2px solid #eee' }}>
          {/* Odatdagi <a> tegini o'rniga <Link> */}
          <Link to="/">Bosh Sahifa</Link>
          <Link to="/about">Biz Haqimizda</Link>
          <Link to="/product/85">Mahsulot: 85</Link>
          <Link to="/asdasd">Mavjud bo'lmagan link</Link>
        </nav>

        {/* Marshrutlarni (Routerlarni) belgilash qismi */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Dinamik route */}
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Boshqa hamma linklar uchun 404 (Yulduzcha hamma narsani bildiradi) */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Havolalarni (Link) to'g'rilash",
      instruction: "React Router da odatiy `<a href='...'>` ishlatilmaydi, chunki u sahifani yangilaydi. Quyidagi kodda `a` teglari bor. Ularni react-router-dom dagi `Link` elementiga o'zgartiring.",
      startingCode: "import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function Navigation() {\n  return (\n    <nav>\n      {/* a teglarini Link to= ga almashtiring */}\n      <a href=\"/\">Asosiy sahifa</a>\n      <a href=\"/profile\">Profil sahifasi</a>\n    </nav>\n  );\n}",
      hint: "<Link to=\"/\">Asosiy sahifa</Link> ko'rinishida yozing.",
      test: "if (code.includes('<a ') || code.includes('href=')) return 'Xato. a tegini va href atributini ishlatmang, ularning o\\'rniga Link va to ishlating.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega React da oddiy HTML ning <a href='/page'>...</a> o'rniga <Link to='/page'>...</Link> ishlatilishi shart?",
      options: [
        "Link tegi chiroyliroq animatsiya bilan o'tadi",
        "<a> tegi brauzerni va butun sahifani qaytadan yangilab (refresh qilib) yuboradi va dastur boshidan boshlanadi. <Link> esa faqat komponentlarni (URL ga mos ravishda) almashtiradi xolos.",
        "React dagi JSX ichiga <a> deb yozsa xatolik beradi",
        "Hech qanday farqi yo'q, xohlasak href ham ishlataveramiz"
      ],
      correctAnswer: 1,
      explanation: "Single Page Application larning butun mo'jizasi ham shunda. Brauzer bir marta yuklanadi, qolgan barcha ko'chishlar faqat JavaScript yordamida miltillashlarsiz amalga oshadi."
    },
    {
      question: "URL dagi dinamik ma'lumotni (masalan: '/user/145' dagi 145 ni) o'qib olish uchun qaysi hook dan foydalaniladi?",
      options: [
        "useNavigate",
        "useLocation",
        "useParams",
        "useURL"
      ],
      correctAnswer: 2,
      explanation: "Route da path='/user/:id' qilib parametr e'lon qilinadi, ichkarida esa const { id } = useParams() yordamida o'sha qism (masalan 145) sug'urib olinadi."
    }
  ]
};

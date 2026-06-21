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

## 🧠 Chuqurlashtirilgan Nazariya: Client-Side Routing vs Server-Side Routing

Veb-dasturlashda sahifalararo o'tishning asosan ikki xil yondashuvi mavjud: an'anaviy Server-Side Routing (Server tomonida marshrutlash) va Client-Side Routing (Mijoz tomonida marshrutlash). React asosan SPA (Single Page Application - Bir Sahifali Ilova) bo'lgani sababli, unda **Client-Side Routing** ishlatiladi.

**1. Server-Side Routing (An'anaviy usul):**
Foydalanuvchi biron linkni bosganda, brauzer yangi sahifa so'rovini internet orqali bevosita serverga yuboradi. Server so'ralgan manzilga mos keluvchi butunlay yangi HTML hujjatni noldan tuzib qaytaradi. Brauzer esa ekrandagi eski ma'lumotlarni tozalab, yangi sahifani chizadi (refresh - oq ekran miltillashi sodir bo'ladi).

**2. Client-Side Routing (React usuli):**
Foydalanuvchi ilova ichida linkni bosganda, kutubxona (masalan, \`react-router-dom\`) bu holatni tutib qoladi (intercept qiladi). Brauzerning serverga so'rov yuborishiga yo'l qo'ymaydi. Manzillar qatoridagi URL o'zgaradi, lekin faqat kerakli komponentlar o'zgaradi (masalan, \`Home\` ketib o'rniga \`About\` keladi).
- *Afzalligi:* Sahifani qayta yuklash bo'lmaydi. O'tishlar bir zumda yuz beradi, natijada dastur xuddi tezkor mobil ilova kabi silliq va qulay ishlaydi.

Quyidagi diagrammada bu ikki yondashuv farqi batafsil tasvirlangan:

\`\`\`mermaid
sequenceDiagram
    participant B as Brauzer (Mijoz)
    participant R as React Router (Mijozda)
    participant S as Server
    
    rect rgb(255, 230, 230)
    note over B, S: 🔴 SERVER-SIDE ROUTING (An'anaviy veb-sayt)
    B->>S: 1. Foydalanuvchi /about linkini bosdi
    S-->>B: 2. Yangi about.html sahifasi to'liq yuborildi
    note over B: 3. ♻️ Brauzer miltillab, butun sahifani qaytadan chizadi!
    end
    
    rect rgb(230, 255, 230)
    note over B, S: 🟢 CLIENT-SIDE ROUTING (React SPA)
    B->>R: 1. Foydalanuvchi <Link to="/about"> bosdi
    note right of R: 2. Router voqeani tutib qoladi (Intercept)
    R->>B: 3. URL o'zgarib, faqat <About /> komponenti chiziladi
    note over B: 4. ⚡ Miltillash yo'q! Sahifa o'sha zahoti o'zgaradi!
    end
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
      title: "Link komponentidan foydalanish",
      instruction: "React loyihada sahifalar orasida o'tish uchun `a` tegi ishlatilmaydi. Uning o'rniga `react-router-dom` dan `Link` ishlatiladi. `a` teglarini `Link` komponentiga o'zgartiring va `href` atributini `to` atributiga almashtiring.",
      startingCode: "import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function Menu() {\n  return (\n    <nav>\n      <a href=\"/\">Asosiy</a>\n      <a href=\"/about\">Biz haqimizda</a>\n    </nav>\n  );\n}",
      hint: "<Link to=\"/\">Asosiy</Link> ko'rinishida yozing.",
      test: "if (code.includes('<a ') || code.includes('href=')) return 'Xato! a tegi yoki href atributi qolib ketdi.'; if (!code.includes('<Link to=\"/\">') || !code.includes('<Link to=\"/about\">')) return 'Link komponenti to\\'g\\'ri yozilmadi.'; return null;"
    },
    {
      id: 2,
      title: "Route ni o'rnatish",
      instruction: "`/contact` yo'li uchun `Contact` komponentini ko'rsatadigan `Route` yozing. Buning uchun `Route` komponentining `path` va `element` atributlaridan foydalaning.",
      startingCode: "import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\n\nfunction Contact() {\n  return <h1>Aloqa</h1>;\n}\n\nexport default function App() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<h1>Asosiy</h1>} />\n      {/* /contact yo'li uchun Route ni shu yerga yozing */}\n      \n    </Routes>\n  );\n}",
      hint: "<Route path=\"/contact\" element={<Contact />} /> ko'rinishida yozing.",
      test: "if (!code.match(/<Route\\s+path=[\"']\\/contact[\"']\\s+element=\\{\\s*<Contact\\s*\\/?\\>\\s*\\}\\s*\\/?>/)) return 'Route komponenti to\\'g\\'ri yozilmadi. path=\"/contact\" va element={<Contact />} bo\\'lishi kerak.'; return null;"
    },
    {
      id: 3,
      title: "Dinamik marshrut (Dynamic Route)",
      instruction: "Foydalanuvchi profiliga o'tish uchun dinamik marshrut yarating. `Route` ning `path` atributiga `/user/:id` deb yozing va `element` qilib `<UserProfile />` komponentini bering.",
      startingCode: "import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\n\nfunction UserProfile() {\n  return <h1>Foydalanuvchi profili</h1>;\n}\n\nexport default function App() {\n  return (\n    <Routes>\n      {/* Dinamik Route ni shu yerga yozing */}\n      \n    </Routes>\n  );\n}",
      hint: "<Route path=\"/user/:id\" element={<UserProfile />} /> ko'rinishida bo'lishi kerak.",
      test: "if (!code.match(/<Route\\s+path=[\"']\\/user\\/:id[\"']\\s+element=\\{\\s*<UserProfile\\s*\\/?>\\s*\\}\\s*\\/?>/)) return 'Dinamik Route to\\'g\\'ri yozilmadi. path=\"/user/:id\" ekanligiga ishonch hosil qiling.'; return null;"
    },
    {
      id: 4,
      title: "URL dan parametrni o'qish (useParams)",
      instruction: "`useParams` hooki yordamida URL dagi `id` parametrini o'qib oling va ekranda \"Foydalanuvchi ID: [id]\" matnida ko'rsating.",
      startingCode: "import React from 'react';\nimport { useParams } from 'react-router-dom';\n\nexport default function UserProfile() {\n  // useParams orqali id ni oling\n  \n  return (\n    <h1>Foydalanuvchi ID: {/* id ni shu yerda ko'rsating */}</h1>\n  );\n}",
      hint: "const { id } = useParams(); deb yozing va {id} qilib ishlating.",
      test: "if (!code.includes('const { id } = useParams()') && !code.includes('const {id} = useParams()')) return 'useParams dan id ni to\\'g\\'ri ajratib oling.'; if (!code.match(/Foydalanuvchi ID:\\s*\\{\\s*id\\s*\\}/)) return 'id ni ekranda to\\'g\\'ri ko\\'rsating.'; return null;"
    },
    {
      id: 5,
      title: "Dasturiy ravishda sahifaga o'tish (useNavigate)",
      instruction: "`useNavigate` hooki yordamida foydalanuvchini tugma bosilganda `/dashboard` sahifasiga yo'naltiring.",
      startingCode: "import React from 'react';\nimport { useNavigate } from 'react-router-dom';\n\nexport default function Login() {\n  // useNavigate ni e'lon qiling\n  \n\n  const handleLogin = () => {\n    // shu yerda '/dashboard' ga o'tishni yozing\n    \n  };\n\n  return <button onClick={handleLogin}>Kirish</button>;\n}",
      hint: "const navigate = useNavigate(); va ichkarida navigate('/dashboard'); deb yozing.",
      test: "if (!code.includes('const navigate = useNavigate()') && !code.includes('const navigate=useNavigate()')) return 'useNavigate hookini chaqiring.'; if (!code.includes(\"navigate('/dashboard')\") && !code.includes('navigate(\"/dashboard\")')) return 'navigate funksiyasiga /dashboard yo\\'lini bering.'; return null;"
    },
    {
      id: 6,
      title: "404 - Sahifa topilmadi",
      instruction: "Mavjud bo'lmagan barcha manzillar uchun `NotFound` komponentini ko'rsatadigan qoida yozing. `path` atributiga `*` belgisini bering.",
      startingCode: "import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\n\nfunction NotFound() {\n  return <h1>Sahifa topilmadi!</h1>;\n}\n\nexport default function App() {\n  return (\n    <Routes>\n      <Route path=\"/\" element={<h1>Asosiy</h1>} />\n      {/* 404 Route ni shu yerga yozing */}\n      \n    </Routes>\n  );\n}",
      hint: "<Route path=\"*\" element={<NotFound />} /> ko'rinishida yozing.",
      test: "if (!code.match(/<Route\\s+path=[\"']\\*[\"']\\s+element=\\{\\s*<NotFound\\s*\\/?>\\s*\\}\\s*\\/?>/)) return '404 sahifa uchun yulduzcha (*) path bilan Route yozilmadi.'; return null;"
    },
    {
      id: 7,
      title: "NavLink komponentidan foydalanish",
      instruction: "`react-router-dom` dan `NavLink` komponentini chaqiring. U sahifa faol bo'lsa avtomatik \"active\" klassini qo'shadi. Kodda `Link` o'rniga `NavLink` dan foydalaning.",
      startingCode: "import React from 'react';\n// NavLink ni import qiling va pastda ishlating\nimport { Link } from 'react-router-dom';\n\nexport default function Menu() {\n  return (\n    <nav>\n      <Link to=\"/\">Asosiy</Link>\n      <Link to=\"/about\">Biz haqimizda</Link>\n    </nav>\n  );\n}",
      hint: "import { NavLink } ... va <NavLink to=\"/\">Asosiy</NavLink> shaklida ishlating.",
      test: "if (code.includes('<Link ') || code.includes('</Link>')) return 'Link o\\'rniga NavLink ishlating.'; if (!code.includes('<NavLink to=\"/\">') || !code.includes('<NavLink to=\"/about\">')) return 'NavLink komponentlarini to\\'g\\'ri yozing.'; return null;"
    },
    {
      id: 8,
      title: "useLocation orqali URL yo'lini o'qish",
      instruction: "`useLocation` hooki joriy URL ma'lumotlarini qaytaradi. Undan `pathname` ni o'qib olib ekranda \"Siz turgan manzil: [pathname]\" shaklida ko'rsating.",
      startingCode: "import React from 'react';\nimport { useLocation } from 'react-router-dom';\n\nexport default function CurrentPath() {\n  // useLocation dan foydalaning\n  \n  return (\n    <p>Siz turgan manzil: {/* pathname ni yozing */}</p>\n  );\n}",
      hint: "const location = useLocation(); va keyin ekranda {location.pathname} ishlating.",
      test: "if (!code.includes('useLocation()')) return 'useLocation hookidan foydalaning.'; if (!code.match(/\\{\\s*\\w+\\.pathname\\s*\\}|\\{\\s*pathname\\s*\\}/)) return 'Ekranda pathname xususiyatini ko\\'rsating (masalan, location.pathname).'; return null;"
    },
    {
      id: 9,
      title: "Ichma-ich yo'nalishlarsiz 2 ta sahifa",
      instruction: "Bitta App ichida 2 ta sahifa: Bosh sahifa (`/`) va Maqolalar (`/posts`) uchun `Route` yarating. Komponentlar Home va Posts allaqachon mavjud.",
      startingCode: "import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\n\nfunction Home() { return <h2>Home</h2>; }\nfunction Posts() { return <h2>Posts</h2>; }\n\nexport default function App() {\n  return (\n    <Routes>\n      {/* Home va Posts uchun Route larni yozing */}\n      \n    </Routes>\n  );\n}",
      hint: "Ikkita <Route /> komponentini yozing, path=\"/\" va path=\"/posts\" bo'lsin.",
      test: "if (!code.match(/<Route\\s+path=[\"']\\/[\"']\\s+element=\\{\\s*<Home\\s*\\/?>\\s*\\}\\s*\\/?>/)) return 'Home sahifasi uchun Route to\\'g\\'ri emas.'; if (!code.match(/<Route\\s+path=[\"']\\/posts[\"']\\s+element=\\{\\s*<Posts\\s*\\/?>\\s*\\}\\s*\\/?>/)) return 'Posts sahifasi uchun Route to\\'g\\'ri emas.'; return null;"
    },
    {
      id: 10,
      title: "Hamma narsani birlashtirish",
      instruction: "`BrowserRouter` butun dasturimizni o'rab turishi kerak. Qoida tariqasida `App` komponenti ichidagi `Routes` ni `BrowserRouter` ichiga oling. (Eslatma: BrowserRouter import qilingan).",
      startingCode: "import React from 'react';\nimport { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nfunction Home() { return <h2>Home</h2>; }\n\nexport default function App() {\n  return (\n    // BrowserRouter ga o'rab oling\n    <Routes>\n      <Route path=\"/\" element={<Home />} />\n    </Routes>\n  );\n}",
      hint: "<BrowserRouter> va uni yopuvchi </BrowserRouter> teglari bilan <Routes> qismini o'rang.",
      test: "if (!code.includes('<BrowserRouter>') || !code.includes('</BrowserRouter>')) return 'BrowserRouter teglarini ishlating.'; if (code.indexOf('<BrowserRouter>') > code.indexOf('<Routes>') || code.indexOf('</BrowserRouter>') < code.indexOf('</Routes>')) return 'Routes ni BrowserRouter ichiga o\\'rang.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React Router nima maqsadda ishlatiladi?",
      options: [
        "Dasturni serverga yuklash uchun",
        "React da ma'lumotlar bazasini boshqarish uchun",
        "Saytni qayta yuklamasdan (refresh qilmasdan) sahifalar o'rtasida o'tishni ta'minlash uchun",
        "Faqat CSS uslublarini o'zgartirish uchun"
      ],
      correctAnswer: 2,
      explanation: "React Router foydalanuvchi URL ni o'zgartirganda sahifani yangilamay turib, kerakli komponentni ekranga chiqarib beradi, bu Single Page Application (SPA) asosi hisoblanadi."
    },
    {
      question: "Oddiy <a> tegi o'rniga nima uchun <Link> dan foydalaniladi?",
      options: [
        "<a> tegi React'da xatolik beradi",
        "<a> tegi butun sahifani qaytadan serverdan yuklaydi, <Link> esa buni to'xtatib faqat JavaScript orqali sahifani yangilaydi",
        "<a> tegi faqat tashqi havolalar uchun ishlatiladi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "<Link> brauzerning default harakatini (sahifani yangilashni) to'xtatib, react-router-dom ga o'zgarishni bildiradi."
    },
    {
      question: "Dasturimizda React Router ishlashi uchun butun loyihani qaysi komponent bilan o'rashimiz kerak?",
      options: [
        "<RouterContainer>",
        "<AppRouter>",
        "<BrowserRouter>",
        "<Navigation>"
      ],
      correctAnswer: 2,
      explanation: "BrowserRouter barcha marshrutlar va Link'lar ishlashi uchun kerak bo'ladigan global holatni (kontekstni) yaratib beradi."
    },
    {
      question: "Barcha <Route> komponentlari qaysi ota komponent ichida yozilishi shart?",
      options: [
        "<Switch>",
        "<Routes>",
        "<RouterGroup>",
        "<RouteContainer>"
      ],
      correctAnswer: 1,
      explanation: "React Router v6 versiyasida barcha <Route> lar <Routes> komponenti ichida bo'lishi shart."
    },
    {
      question: "<Route path='/about' element={<About />} /> bu kod nima qiladi?",
      options: [
        "About komponentini hamma sahifada ko'rsatadi",
        "URL da /about bo'lganda ekranga About komponentini chiqaradi",
        "Foydalanuvchini avtomatik ravishda /about sahifasiga o'tkazadi",
        "About sahifasidan Bosh sahifaga yo'naltiradi"
      ],
      correctAnswer: 1,
      explanation: "Route ma'lum bir path (manzil) ga to'g'ri kelganda o'zining element (komponent) ini render qiladi."
    },
    {
      question: "URL dan o'zgaruvchi (parametr) larni o'qib olish uchun qaysi Hook ishlatiladi?",
      options: [
        "useLocation",
        "useHistory",
        "useParams",
        "useNavigate"
      ],
      correctAnswer: 2,
      explanation: "useParams() URL dagi dinamik qismlarni (masalan, :id) o'qib olish va ularni obyekt sifatida qaytarish uchun xizmat qiladi."
    },
    {
      question: "Dinamik marshrut qanday ko'rinishda e'lon qilinadi?",
      options: [
        "<Route path='/user-id' ... />",
        "<Route path='/user/{id}' ... />",
        "<Route path='/user/:id' ... />",
        "<Route path='/user/*id' ... />"
      ],
      correctAnswer: 2,
      explanation: "Ikki nuqta (:) yordamida dinamik parametrlar belgilanadi, shunda react-router bu qism istalgan qiymat qabul qilishini biladi."
    },
    {
      question: "Tugma bosilganda foydalanuvchini boshqa sahifaga dasturiy tarzda (JavaScript orqali) o'tkazish uchun qaysi Hook kerak?",
      options: [
        "useRedirect",
        "useHistory",
        "useNavigate",
        "useLink"
      ],
      correctAnswer: 2,
      explanation: "useNavigate() hooki navigate funksiyasini qaytaradi, uni chaqirib istalgan yo'lga o'tish mumkin, masalan: navigate('/home')."
    },
    {
      question: "404 - Sahifa topilmadi (Not Found) sahifasini tutib qolish uchun Route qanday yoziladi?",
      options: [
        "<Route path='404' element={<NotFound />} />",
        "<Route path='*' element={<NotFound />} />",
        "<Route path='not-found' element={<NotFound />} />",
        "<Route path='?' element={<NotFound />} />"
      ],
      correctAnswer: 1,
      explanation: "Yulduzcha (*) path barcha oldingi marshrutlarga mos kelmagan har qanday URL ni ushlab oladi va 404 sahifa ko'rsatishga yordam beradi."
    },
    {
      question: "<NavLink> va <Link> ning asosiy farqi nima?",
      options: [
        "NavLink tezroq ishlaydi",
        "NavLink joriy sahifaga mos kelsa, o'ziga avtomatik 'active' degan klassni yoki isActive qiymatini qo'shadi",
        "Link faqat tashqi linklar uchun ishlatiladi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "NavLink asosan menyularda (Navbar) qaysi sahifada turganimizni ajratib (masalan, rangini qizil qilib) ko'rsatish uchun ishlatiladi."
    },
    {
      question: "SPA (Single Page Application) ning afzalligi nimada?",
      options: [
        "Saytning xavfsizligi mutlaq mustahkam bo'ladi",
        "Sahifalar almashayotganda butun HTML serverdan qayta yuklanmaydi, o'tishlar juda tez va silliq bo'ladi",
        "Faqat bitta turdagi shrift ishlatishga majbur qiladi",
        "Ma'lumotlar bazasiga ehtiyoj qolmaydi"
      ],
      correctAnswer: 1,
      explanation: "SPA yondashuvida HTML sahifa faqat bir marta yuklanadi va qolgan hamma o'zgarishlar faqat JavaScript yordamida lokal ravishda chizib beriladi."
    },
    {
      question: "Joriy turgan URL manzil (masalan, path, search) haqida ma'lumotlarni qaysi Hook yordamida olish mumkin?",
      options: [
        "usePath",
        "useURL",
        "useLocation",
        "useRoute"
      ],
      correctAnswer: 2,
      explanation: "useLocation() hooki qayerda ekanligimiz haqida obyekt qaytaradi (pathname, search, hash kabi qiymatlarni o'z ichiga oladi)."
    }
  ]
};

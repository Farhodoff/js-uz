export const project3_router = {
  id: 'project3_router',
  title: "3. Ko'p sahifali ilova (React Router)",
  content: `
# Ko'p sahifali ilova (React Router)

React yordamida Single Page Application (SPA - Yagona Sahifali Ilova) yaratiladi. Ammo bu "faqat bitta sahifa bo'ladi" degani emas! Ilovamizda bir nechta ko'rinishlar (sahifalar) bo'lishi mumkin. Buning uchun biz **React Router** dan foydalanamiz.

## 1. React Router nima o'zi va nega kerak?

Tasavvur qiling, sizda katta bir savdo markazi (mall) bor. Savdo markazining ichida kiyim do'koni, oziq-ovqat va o'yin-kulgi maydonchalari bor. Xaridor bir do'kondan boshqasiga o'tishi uchun butun savdo markazidan chiqib, qayta kirishi shart emas, shunchaki ichkaridagi eshiklardan o'tadi. 

An'anaviy veb-saytlarda (MPA - Multi Page Application) har bir sahifaga o'tganda brauzer serverdan yangi sahifani yuklab oladi (butun savdo markazidan chiqib qayta kirgandek). React Router esa sahifani yangilamasdan, faqat ekrandagi kerakli qismni o'zgartiradi (savdo markazi ichida yurish). Bu ilovani juda tez va silliq qiladi!

### O'rnatish
React loyihasida routerni ishlatish uchun avval uni o'rnatish kerak:
\\\`\\\`\\\`bash
npm install react-router-dom
\\\`\\\`\\\`

## 2. Asosiy tushunchalar: BrowserRouter, Routes va Route

Ilovamiz marshrutlarni tushunishi uchun uni **BrowserRouter** bilan o'rashimiz kerak. Odatda bu \\\`index.js\\\` yoki \\\`App.js\\\` da qilinadi.

\\\`\\\`\\\`javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
\\\`\\\`\\\`

- **BrowserRouter**: Butun ilova marshrutlash qobiliyatiga ega bo'lishini ta'minlaydi.
- **Routes**: Marshrutlarning ro'yxati (avvalgi versiyalardagi Switch kabi). Ichidagi barcha yuzaga kelishi mumkin bo'lgan yo'llarni kuzatadi.
- **Route**: Aniq bitta yo'l (path) va o'sha yo'lga kirilganda qaysi komponent (element) chiqishini belgilaydi.

### Mermaid bilan vizual ko'rinishi:

\\\`\\\`\\\`mermaid
graph TD;
    App["App (BrowserRouter)"] --> Routes["Routes Component"];
    Routes --> R1["Route path=/"];
    Routes --> R2["Route path=/about"];
    R1 --> Home["Home Component"];
    R2 --> About["About Component"];
\\\`\\\`\\\`

## 3. Sahifalararo navigatsiya: Link va NavLink

Qanday qilib foydalanuvchi "Home" dan "About" ga o'tadi? Oddiy HTML dagi \\\`<a href="...">\\\` tegi ishlatilsa, sahifa yangilanib ketadi (bu SPA qoidasini buzadi). Shuning uchun React Router bizga **Link** komponentini beradi.

\\\`\\\`\\\`javascript
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Bosh sahifa</Link>
      <Link to="/about">Biz haqimizda</Link>
    </nav>
  );
}
\\\`\\\`\\\`

Agar faol bo'lgan (hozir qaysi sahifada ekanligingizni bildiruvchi) linkni ajratib ko'rsatmoqchi bo'lsangiz, **NavLink** dan foydalanasiz. U o'zida \\\`isActive\\\` xususiyatini saqlaydi.

\\\`\\\`\\\`javascript
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "active-link" : ""}
      >
        Bosh sahifa
      </NavLink>
    </nav>
  );
}
\\\`\\\`\\\`

## 4. Dinamik marshrutlar: useParams()

Ko'pincha bizga o'zgaruvchan URL lar kerak bo'ladi, masalan foydalanuvchi profili: \`/user/1\`, \`/user/2\`. Buni Route da \`:id\` yordamida belgilaymiz:

\\\`\\\`\\\`javascript
<Route path="/user/:id" element={<UserProfile />} />
\\\`\\\`\\\`

Komponent ichida esa bu qiymatni **useParams** hook'i yordamida olib ishlatamiz:

\\\`\\\`\\\`javascript
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams(); // URL dan 'id' ni ajratib oladi
  return <h1>Foydalanuvchi IDsi: {id}</h1>;
}
\\\`\\\`\\\`

## 5. Dasturiy navigatsiya (Programmatic Navigation): useNavigate()

Ba'zan foydalanuvchi linkka bosganda emas, balki qandaydir amal bajarilganda (masalan, forma yuborilganda yoki tizimga kirgandan so'ng) boshqa sahifaga o'tkazishimiz kerak bo'ladi. Bunda bizga **useNavigate** yordam beradi.

\\\`\\\`\\\`javascript
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... login logikasi ...
    navigate('/dashboard'); // Foydalanuvchini dashboard ga yo'naltirish
  };

  return <button onClick={handleLogin}>Tizimga kirish</button>;
}
\\\`\\\`\\\`

> **Eslatma:** \\\`navigate(-1)\\\` qilsangiz, orqaga qaytadi (Back tugmasi vazifasini bajaradi).

## Xulosa qoidalari: DOs and DON'Ts

- **QILING (DO):** SPA imkoniyatlaridan foydalanish uchun hamma navigatsiyalarda \\\`Link\\\` yoki \\\`NavLink\\\` dan foydalaning.
- **QILMANG (DON'T):** Ichki linklar uchun \\\`<a>\\\` tegini ishlatmang, bu butun sahifa qayta yuklanishiga olib keladi.
- **QILING (DO):** Topilmagan sahifalar uchun doim "404 Not Found" marshrutini (\\\`path="*"\\\`) ilova oxiriga qo'shib qo'ying.
- **QILMANG (DON'T):** \\\`BrowserRouter\\\` ni ichkaridagi kichik komponentlarda bir necha marta ishlatmang. U butun loyihada bitta bo'lishi kerak.
  `,
  code: `import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Bosh sahifa</h2>;
}

function About() {
  return <h2>Biz haqimizda</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Router o'rnatilishi",
      description: "Berilgan kodda marshrutlash ishlashi uchun `BrowserRouter` komponentini to'g'ri qo'shing.",
      startingCode: `import { Routes, Route } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <div>\n      {/* BrowserRouter ni shu yerdan boshlab o'rab chiqing */}\n      <Routes>\n        <Route path="/" element={<p>Bosh sahifa</p>} />\n      </Routes>\n    </div>\n  );\n}`,
      solution: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <div>\n      <BrowserRouter>\n        <Routes>\n          <Route path="/" element={<p>Bosh sahifa</p>} />\n        </Routes>\n      </BrowserRouter>\n    </div>\n  );\n}`,
      hint: "importga BrowserRouter ni qo'shing va `<Routes>` ni `<BrowserRouter>` ichiga oling."
    },
    {
      id: 2,
      title: "Yangi Route qo'shish",
      description: "`/contact` yo'li (path) uchun `Contact` komponentini ochadigan Route yozing.",
      startingCode: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst Contact = () => <h2>Aloqa</h2>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<h2>Home</h2>} />\n        {/* Shu yerga Contact marshrutini yozing */}\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      solution: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst Contact = () => <h2>Aloqa</h2>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<h2>Home</h2>} />\n        <Route path="/contact" element={<Contact />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      hint: "<Route path=\"/contact\" element={<Contact />} /> dan foydalaning."
    },
    {
      id: 3,
      title: "Link orqali navigatsiya",
      description: "Sahifa yangilanmasligi uchun `<a>` teglarini React Routerning `<Link>` komponentiga almashtiring.",
      startingCode: `import { Link } from 'react-router-dom';\n\nfunction Navigation() {\n  return (\n    <nav>\n      <a href="/">Home</a>\n      <a href="/about">About</a>\n    </nav>\n  );\n}`,
      solution: `import { Link } from 'react-router-dom';\n\nfunction Navigation() {\n  return (\n    <nav>\n      <Link to="/">Home</Link>\n      <Link to="/about">About</Link>\n    </nav>\n  );\n}`,
      hint: "`href` o'rniga `to` xususiyatini ishlating va `<a>` tegi o'rniga `<Link>` dan foydalaning."
    },
    {
      id: 4,
      title: "NavLink bilan faol linkni ajratish",
      description: "Foydalanuvchi qaysi sahifada ekanligini ko'rsatish uchun `Link` o'rniga `NavLink` ishlating va active holatida unga `style={{ color: 'red' }}` bering.",
      startingCode: `import { NavLink } from 'react-router-dom';\n\nfunction Menu() {\n  return (\n    <nav>\n      <NavLink to="/">Home</NavLink>\n    </nav>\n  );\n}`,
      solution: `import { NavLink } from 'react-router-dom';\n\nfunction Menu() {\n  return (\n    <nav>\n      <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}>Home</NavLink>\n    </nav>\n  );\n}`,
      hint: "style xususiyatiga arrow funksiya beriladi: `({ isActive }) => ({ ... })`."
    },
    {
      id: 5,
      title: "Dinamik marshrut yaratish",
      description: "Har qanday foydalanuvchi IDsi uchun ishlaydigan dinamik route yarating. (Masalan: `/user/1`, `/user/123`). Yo'lni (path) qanday yozasiz?",
      startingCode: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst User = () => <div>Foydalanuvchi</div>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        {/* Shu yerda dinamik route yarating: path=\"/user/...\" */}\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      solution: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst User = () => <div>Foydalanuvchi</div>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/user/:id\" element={<User />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      hint: "URL parametrini ifodalash uchun ikki nuqtadan so'ng parametr nomini yozing, masalan `:id`."
    },
    {
      id: 6,
      title: "useParams orqali ma'lumotni o'qish",
      description: "Dinamik marshrutdagi `id` parametrini tutib olib, ekranga chiqaring.",
      startingCode: `import { useParams } from 'react-router-dom';\n\nfunction Profile() {\n  // useParams orqali id ni oling\n  return <h1>Profil ID: {/* id ni shu yerga yozing */}</h1>;\n}`,
      solution: `import { useParams } from 'react-router-dom';\n\nfunction Profile() {\n  const { id } = useParams();\n  return <h1>Profil ID: {id}</h1>;\n}`,
      hint: "`const { id } = useParams();` qatorini qo'shing."
    },
    {
      id: 7,
      title: "Dasturiy navigatsiya (useNavigate)",
      description: "Tugma bosilganda foydalanuvchini Home (`/`) sahifasiga yo'naltiruvchi kod yozing.",
      startingCode: `import { useNavigate } from 'react-router-dom';\n\nfunction Dashboard() {\n  // useNavigate ni e'lon qiling\n  \n  const goHome = () => {\n    // shu yerda / ga yo'naltiring\n  };\n\n  return <button onClick={goHome}>Home ga qaytish</button>;\n}`,
      solution: `import { useNavigate } from 'react-router-dom';\n\nfunction Dashboard() {\n  const navigate = useNavigate();\n  \n  const goHome = () => {\n    navigate('/');\n  };\n\n  return <button onClick={goHome}>Home ga qaytish</button>;\n}`,
      hint: "`const navigate = useNavigate();` dan foydalanib `navigate('/')` ni chaqiring."
    },
    {
      id: 8,
      title: "Not Found (404) sahifasi",
      description: "Agar foydalanuvchi mavjud bo'lmagan marshrutga kirsa, 404 xatosini ko'rsatadigan 'catch-all' Route yarating.",
      startingCode: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst NotFound = () => <h1>404 Sahifa topilmadi</h1>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<p>Home</p>} />\n        {/* Not Found route ini yozing */}\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      solution: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst NotFound = () => <h1>404 Sahifa topilmadi</h1>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<p>Home</p>} />\n        <Route path=\"*\" element={<NotFound />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      hint: "Barcha mos kelmagan yo'llarni ushlash uchun `path=\"*\"` dan foydalaniladi."
    },
    {
      id: 9,
      title: "Tugma bilan orqaga qaytish",
      description: "Tugma bosilganda brauzer tarixida bitta orqaga (back) qaytish vazifasini bajaruvchi kodni to'ldiring.",
      startingCode: `import { useNavigate } from 'react-router-dom';\n\nfunction Article() {\n  const navigate = useNavigate();\n\n  const goBack = () => {\n    // orqaga qaytish\n  };\n\n  return <button onClick={goBack}>Orqaga</button>;\n}`,
      solution: `import { useNavigate } from 'react-router-dom';\n\nfunction Article() {\n  const navigate = useNavigate();\n\n  const goBack = () => {\n    navigate(-1);\n  };\n\n  return <button onClick={goBack}>Orqaga</button>;\n}`,
      hint: "`navigate(-1)` brauzerda orqaga qaytishni ta'minlaydi."
    },
    {
      id: 10,
      title: "Nested Routes (Ichma-ich marshrutlar)",
      description: "`/dashboard` yo'li ichida `/dashboard/stats` pastki marshrutini ko'rsatish uchun Route yarating. Asosiy URL ni yozmasdan faqat `path=\"stats\"` sifatida yozing.",
      startingCode: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst Dashboard = () => <h2>Dashboard</h2>;\nconst Stats = () => <h3>Statistikalar</h3>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/dashboard\" element={<Dashboard />}>\n          {/* stats pastki marshrutini shu yerga qo'shing */}\n        </Route>\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      solution: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nconst Dashboard = () => <h2>Dashboard</h2>;\nconst Stats = () => <h3>Statistikalar</h3>;\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/dashboard\" element={<Dashboard />}>\n          <Route path=\"stats\" element={<Stats />} />\n        </Route>\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
      hint: "Ota Route tagi ichida `<Route path=\"stats\" element={<Stats />} />` deb yozasiz."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React Router qanday maqsadda ishlatiladi?",
      options: [
        "Veb-sayt tezligini oshirish uchun",
        "React ilovasiga navigatsiya (bir nechta sahifalar orasida o'tish) qo'shish uchun",
        "API bilan ishlashni osonlashtirish uchun",
        "State'larni boshqarish uchun"
      ],
      correctAnswer: 1,
      explanation: "React Router SPA larda sahifani to'liq yuklamasdan boshqa komponentlarni ekranga chiqarish (marshrutlash) uchun xizmat qiladi."
    },
    {
      id: 2,
      question: "Qaysi komponent butun ilovani o'rab, routerni yoqadi?",
      options: [
        "<Routes>",
        "<Route>",
        "<BrowserRouter>",
        "<Link>"
      ],
      correctAnswer: 2,
      explanation: "BrowserRouter HTML5 history API yordamida ilova uchun asosiy marshrutlash tizimini yoqadi."
    },
    {
      id: 3,
      question: "Nima uchun React Routerda <a> o'rniga <Link> ishlatiladi?",
      options: [
        "<a> brauzerni to'liq yangilaydi (refresh qilib yuboradi), <Link> esa yangilamasdan sahifani o'zgartiradi",
        "<Link> chiroyliroq ko'rinadi",
        "<a> tegida to xususiyati yo'q",
        "<Link> faqat server tomonida ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "<Link> sahifani yangilanishiga yo'l qo'ymaydi, shuning uchun SPA juda tez ishlaydi."
    },
    {
      id: 4,
      question: "Marshrutni (Route) qanday qilib yozish to'g'ri (React Router v6)?",
      options: [
        "<Route path='/about' component={About} />",
        "<Route path='/about'>{About}</Route>",
        "<Route path='/about' element={<About />} />",
        "<Route href='/about' render={<About />} />"
      ],
      correctAnswer: 2,
      explanation: "React Router v6 da komponentni ulash uchun 'element' xususiyati qabul qilinadi va qiymatga JSX (masalan, <About />) beriladi."
    },
    {
      id: 5,
      question: "Dinamik marshrut URL parametrlari qanday ko'rinishda yoziladi?",
      options: [
        "path='/user/$id'",
        "path='/user/:id'",
        "path='/user/{id}'",
        "path='/user/[id]'"
      ],
      correctAnswer: 1,
      explanation: "Dinamik URL parametrlari ikki nuqta (:) va o'zgaruvchi nomi orqali yoziladi. Masalan: :id."
    },
    {
      id: 6,
      question: "Dinamik URL dagi parametrlarni qaysi Hook yordamida olamiz?",
      options: [
        "useNavigate",
        "useLocation",
        "useParams",
        "useRouteMatch"
      ],
      correctAnswer: 2,
      explanation: "useParams() Hook'i orqali URL da kelgan dinamik ko'rsatkichlarni (masalan :id) tutib olish mumkin."
    },
    {
      id: 7,
      question: "Dasturiy ravishda (masalan, tugma bosilganda funksiya ichida) boshqa sahifaga yo'naltirish uchun qaysi Hook kerak?",
      options: [
        "useHistory",
        "useNavigate",
        "useLocation",
        "useParams"
      ],
      correctAnswer: 1,
      explanation: "v6 da dasturiy yo'naltirishlar uchun useNavigate() hook'i ishlatiladi."
    },
    {
      id: 8,
      question: "Mavjud bo'lmagan barcha sahifalarga (404 Error) javob beruvchi catch-all marshruti qanday yoziladi?",
      options: [
        "<Route path='404' element={<NotFound />} />",
        "<Route path='any' element={<NotFound />} />",
        "<Route path='?' element={<NotFound />} />",
        "<Route path='*' element={<NotFound />} />"
      ],
      correctAnswer: 3,
      explanation: "Yulduzcha (*) path orqali berilgan hamma marshrutlarga mos keluvchi yagona marshrut hisoblanadi (catch-all)."
    },
    {
      id: 9,
      question: "Link va NavLink o'rtasidagi asosiy farq nima?",
      options: [
        "Farqi yo'q, ikkisi bir xil",
        "NavLink o'zida isActive xususiyatiga ega, faol sahifa linkiga oson style berish mumkin",
        "Link tezroq ishlaydi",
        "NavLink faqat tashqi havolalar uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "NavLink orqali foydalanuvchi o'sha sahifada turganida linkning ko'rinishini o'zgartirish (masalan active klass qo'shish) juda oson."
    },
    {
      id: 10,
      question: "Orqaga qaytish uchun useNavigate qanday chaqiriladi?",
      options: [
        "navigate('back')",
        "navigate.goBack()",
        "navigate(-1)",
        "navigate(0)"
      ],
      correctAnswer: 2,
      explanation: "navigate(-1) funksiyasi brauzer tarixida bir qadam orqaga qaytishni ta'minlaydi."
    },
    {
      id: 11,
      question: "Route komponentlari majburiy tarzda qaysi ota komponentning ichida kelishi shart (v6 da)?",
      options: [
        "<Router>",
        "<Routes>",
        "<Switch>",
        "<Link>"
      ],
      correctAnswer: 1,
      explanation: "Barcha <Route> komponentlari bitta <Routes> bilan o'ralgan bo'lishi majburiy."
    },
    {
      id: 12,
      question: "Ushbu paketni o'rnatish komandasi to'g'ri ko'rsatilgan qatorni toping.",
      options: [
        "npm install react-router",
        "npm install router-dom-react",
        "npm install react-router-dom",
        "npm i react-nav-router"
      ],
      correctAnswer: 2,
      explanation: "Veb ilovalar uchun asosiy paket `react-router-dom` hisoblanadi."
    }
  ]
};

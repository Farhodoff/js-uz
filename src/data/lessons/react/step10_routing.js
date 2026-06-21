export const step10_routing = {
  title: "10-DARS: Marshrutlash (Routing)",
  content: `
# React Routing (Marshrutizatsiya) asoslari va React Router DOM

## Routing nima o'zi? (What is Routing?)

Tasavvur qiling, siz katta savdo markazidasiz (Mall). Savdo markazi ko'plab do'konlardan iborat. Qaysi do'konga borishni xohlasangiz, yo'laklar orqali kerakli manzilga kelasiz. Savdo markazidagi yo'l ko'rsatkichlar va xaritalar sizga qaysi qavatda qaysi do'kon borligini ko'rsatadi. 

Veb-dasturlashda **Routing** (marshrutizatsiya) xuddi shu xarita va yo'naltirgich rolini o'ynaydi. Foydalanuvchi qaysi manzilni (URL ni) brauzerda qidirishiga yoki qaysi havolani (link) bosishiga qarab, unga tegishli sahifani yoki komponentni ko'rsatish jarayoni routing deb ataladi. Masalan, foydalanuvchi \`www.saytim.uz/about\` ga kirsa, unga "Biz haqimizda" ma'lumoti chiqishi kerak, \`www.saytim.uz/contact\` ga kirsa, "Aloqa" sahifasi ochilishi kerak.

### Client-Side Routing vs Server-Side Routing (Mijoz va Server tomonidagi marshrutizatsiya)

An'anaviy veb-saytlar (MPA - Multi-Page Applications) **Server-Side Routing** (SSR) dan foydalanadi. Bunda siz biror havolani bossangiz, brauzer serverga yangi sahifa so'rovini yuboradi. Server HTML sahifa shakllantiradi va qaytaradi. Brauzer esa oq ekran bo'lib, sahifani to'liq boshidan qayta yuklaydi.

React kabi zamonaviy kutubxonalar esa **Client-Side Routing** (CSR) dan foydalanib **SPA** (Single Page Application - Yagona sahifali ilova) qurish imkonini beradi. Bunda saytga birinchi marta kirganda barcha asosiy kodlar yuklanadi. Endi siz havolani bossangiz, brauzer serverga bormaydi! Shunchaki brauzerning URL manzili o'zgaradi va JavaScript darhol ekrandagi eski komponentni olib tashlab, o'rniga yangi komponentni chizib (render qilib) ko'rsatadi. Qayta yuklanish (refresh/blink) umuman bo'lmaydi!

#### Mermaid: SPA va MPA taqqoslovi

\`\`\`mermaid
sequenceDiagram
    participant B as Browser
    participant S as Server
    
    Note over B,S: An'anaviy MPA (Server-Side Routing)
    B->>S: GET /about (sahifani yuklash)
    S-->>B: Yuborildi: about.html (To'liq HTML fayl)
    B->>B: Ekranni tozalash va to'liq qayta chizish (Blink/Reload)
    
    Note over B,S: React SPA (Client-Side Routing)
    B->>S: GET / (ilk marta kirish)
    S-->>B: Yuborildi: index.html va React JS bundle
    B->>B: React ilovani ishga tushirish (DOM ni yaratish)
    B->>B: Foydalanuvchi 'About' linkini bosdi
    B->>B: URL '/about' ga o'zgardi. React faqat DOM ni o'zgartiradi (Serverga so'rov yo'q, sahifa miltillamaydi!)
\`\`\`

---

## React Router DOM asoslari

React kutubxonasi o'zida ichki routing tizimiga ega emas (u faqat UI yaratish uchun). Shuning uchun, bu ishni amalga oshirishda biz eng ommabop va kuchli kutubxona bo'lgan **React Router DOM** dan foydalanamiz. O'rnatish uchun: \`npm install react-router-dom\` buyrug'i ishlatiladi.

### Nega kerak?
Agar React Router bo'lmasa, har bir URL uchun o'zimiz shartlar yozishimizga to'g'ri kelardi: \`if (window.location.pathname === '/about') return <About />\`. Bu juda noqulay, boshqarish qiyin va xatoliklarga moyil yondashuv. React Router DOM bularning barchasini o'z zimmasiga oladi va juda oson sintaksis taqdim etadi.

### Asosiy komponentlar: \`BrowserRouter\`, \`Routes\`, \`Route\`, \`Link\`

1. **\`BrowserRouter\`**: Bu butun dasturingizni qamrab oluvchi bosh komponent. U brauzerning HTML5 History API-dan foydalanib URL-ni boshqaradi. Odatda dastur boshlanishida (masalan \`main.jsx\` yoki \`index.jsx\`) yoziladi. U butun savdo markazini boshqaradigan tizim kabi barcha yo'nalishlarni nazorat qiladi.
2. **\`Routes\`**: Barcha mumkin bo'lgan yo'llarni (routelarni) o'zida saqlovchi quti. URL o'zgarganda, bu quti o'z ichidagi eng mos keladigan bitta \`Route\` ni tanlab ekranga chiqaradi.
3. **\`Route\`**: Haqiqiy xarita va qoida. U ikkita asosiy props qabul qiladi: \`path\` (yo'l) va \`element\` (shu yo'lda nima ko'rinishi kerakligi). "Agar foydalanuvchi \`/contact\` yo'liga borsa, \`<ContactComponent />\` ni ko'rsat" deydigan qat'iy ko'rsatma.
4. **\`Link\`**: Boshqa sahifaga (komponentga) o'tish uchun maxsus havola (teg) komponenti. U tashqi ko'rinishidan oddiy \`<a>\` tegiga o'xshaydi, lekin ishlash mantig'i umuman boshqa.

---

## \`<a>\` tegi muammosi va nega \`<Link>\` ishlatamiz?

**Nega kerak?** Nima uchun shunchaki oddiy HTML \`<a>\` tegidan foydalana olmaymiz? Sababi oddiy \`<a>\` tegi o'zining tabiatiga ko'ra brauzerga sahifani **to'liq qayta yuklashni** (full page refresh) buyuradi. Bu bizning SPA (Single Page Application) g'oyamizga butunlay zid! Agar siz sahifani qayta yuklasangiz, barcha React state'lar o'chib ketadi, kiritilgan formalar o'chadi va dastur qayta boshidan ishlashga majbur bo'ladi.

\`<Link>\` komponenti esa xuddi qutqaruvchidek ishlaydi. U bosilganda ichki \`event.preventDefault()\` mexanizmini ishga tushiradi (refreshni to'xtatadi) va HTML History API orqali URL-ni sekingina o'zgartiradi. Natijada faqat ekrandagi kerakli komponentlar o'zgaradi. Dastur xotirasi (State) esa o'z o'rnida qolaveradi!

### Do's and Don'ts (Yaxshi va Yomon Amaliyotlar)

❌ **Yomon amaliyot (Don't do this):**
\`\`\`jsx
// HTML dagi oddiy 'a' tegi butun sahifani qayta yuklaydi va barcha State'larni xotiradan o'chiradi
export default function Navbar() {
  return (
    // <nav> - navigatsiya qismi uchun HTML tegi
    <nav>
      {/* <a> tegi bosilganda brauzer sahifani boshqatdan to'liq yuklaydi (reload). Bu xato yondashuv! */}
      <a href="/about">Biz haqimizda (Xato)</a>
      <a href="/contact">Aloqa (Xato)</a>
    </nav>
  );
}
\`\`\`

✅ **Yaxshi amaliyot (Do this):**
\`\`\`jsx
// react-router-dom kutubxonasidan Link komponentini chaqirib olamiz
import { Link } from 'react-router-dom';

// React Router 'Link' tegi faqatgina URL'ni o'zgartiradi, sahifa tezkor va miltillashsiz yangilanadi!
export default function Navbar() {
  return (
    <nav>
      {/* <Link> komponenti sahifani qayta yuklamasdan (refreshsiz) boshqa manzilga o'tish imkonini beradi */}
      <Link to="/about">Biz haqimizda (To'g'ri)</Link>
      <Link to="/contact">Aloqa (To'g'ri)</Link>
    </nav>
  );
}
\`\`\`

---

## Dynamic Parameters (Dinamik parametrlar) va Navigation Hooks

### Dinamik Parametrlar (URL Parameters)

Tasavvur qiling, sizda katta internet-do'kon bor va u yerda 10 000 ta mahsulot bor. Har bir mahsulot uchun alohida Route yozish (\`/product/1\`, \`/product/2\`, ... \`/product/10000\`) aqlga umuman sig'maydigan ish. Buning o'rniga biz dinamik parametrlardan foydalanamiz. Bu xuddi funksiya qabul qiladigan argumentga o'xshaydi. URL dagi ikki nuqta \`:\` belgisidan keyin kelgan nom o'zgaruvchi (parametr) deb o'qiladi.

\`\`\`jsx
// App.jsx faylida routelarni sozlash
// Routes va Route komponentlarini kutubxonadan chaqiramiz
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <Routes> barcha yo'nalishlarni (marshrutlarni) o'zida saqlaydigan asosiy quti
    <Routes>
      {/* Agar manzil /products bo'lsa, ekranda ProductList komponenti ko'rinadi */}
      <Route path="/products" element={<ProductList />} />
      
      {/* ':id' - bu yerda dinamik parametr hisoblanadi. Masalan: /products/1, /products/2 */}
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  );
}
\`\`\`

#### Nega kerak?
Dinamik parametrlar orqali qaysi aniq mahsulot bosilganini bilib olamiz va serverdan faqatgina o'sha kerakli mahsulot ma'lumotini so'raymiz.
Bu dinamik qiymatni komponent ichida tutib olish uchun esa \`useParams\` custom hook'idan foydalanamiz.

\`\`\`jsx
// ProductDetails.jsx
// URL dan parametrlarni o'qib olish uchun useParams hookini chaqiramiz
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  // URL dagi :id (masalan /products/42 bo'lsa, id = "42") ni ushlab olamiz
  const { id } = useParams();
  
  // Mahsulot ma'lumotlarini saqlash uchun state (boshlang'ich qiymati null)
  const [product, setProduct] = useState(null);

  // Komponent ekranga chiqqanda yoki 'id' o'zgarganda ishlaydigan effect hook
  useEffect(() => {
    // Endi shu 'id' yordamida haqiqiy API dan aynan bitta mahsulotni yuklab olamiz
    fetch(\`https://fakestoreapi.com/products/\${id}\`)
      .then(res => res.json()) // Javobni JSON formatiga o'giramiz
      .then(data => setProduct(data)); // Olingan ma'lumotni state-ga joylaymiz
  }, [id]);

  // Agar ma'lumot hali kelmagan bo'lsa, yuklanmoqda yozuvini ko'rsatamiz
  if (!product) return <h2>Yuklanmoqda...</h2>;

  // Ma'lumot kelgach, ekranga chiqaramiz
  return (
    <div>
      <h1>Mahsulot raqami: {id}</h1>
      <h2>Nomi: {product.title}</h2>
      <p>Narxi: \${product.price}</p>
    </div>
  );
}
\`\`\`

### Navigation Hooks (Dasturiy ravishda navigatsiya)

Odatda sahifalararo o'tishlar \`<Link>\` bosish orqali amalga oshadi. Lekin ba'zida biz foydalanuvchini **dastur mantig'iga asosan**, u linkni bosmagan holatda ham boshqa sahifaga yo'naltirishimiz kerak bo'lib qoladi.
Masalan:
- Login va parolni to'g'ri kiritgandan so'ng, tizim o'zi avtomat "Profil" sahifasiga o'tkazishi.
- Xarid muvaffaqiyatli amalga oshganda "Tabriklaymiz" deb, keyin Bosh sahifaga qaytarishi.
- Faylni yuklash tugagandan so'ng natija sahifasiga otishi.

Bunday holatlar uchun React Router bizga \`useNavigate\` hook'ini sovg'a qiladi. Bu bizga istalgan funksiya ichidan turib yo'nalishni o'zgartirish (navigate) kuchini beradi.

\`\`\`jsx
// Boshqa sahifaga yo'naltirish uchun useNavigate hooki kerak
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginForm() {
  const navigate = useNavigate(); // Navigate obyektini chaqirib olamiz
  
  // Foydalanuvchi ismini saqlash uchun state
  const [username, setUsername] = useState('');

  // Forma yuborilganda ishlaydigan funksiya
  const handleLogin = (e) => {
    e.preventDefault(); // Sahifa yangilanishini to'xtatamiz
    
    // Tasavvur qilamiz, bu yerda server tekshiruvi bor
    if (username === 'admin') {
      alert('Tizimga muvaffaqiyatli kirdingiz!');
      // Foydalanuvchini avtomatik tarzda '/dashboard' manziliga jo'natamiz
      navigate('/dashboard');
    } else {
      alert('Noto\\'g\\'ri foydalanuvchi!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Tizimga kirish</h2>
      {/* Ismni yozish uchun maydon, kiritilgan matn state'ga saqlanadi */}
      <input 
        placeholder="Ismingiz (admin deb yozing)" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button type="submit">Kirish</button>
    </form>
  );
}
\`\`\`

#### Brauzer tarixida orqaga qaytish (Go Back)
\`useNavigate\` shunchaki yangi sahifaga yo'naltiribgina qolmay, balki brauzer tarixida orqaga yoki oldinga qaytishni ham eplaydi. Agar funksiyaga manzil o'rniga manfiy raqam bersangiz, xuddi brauzerdagi ⬅️ orqaga (back) tugmasi bosilgandek ishlaydi.

\`\`\`jsx
{/* navigate funksiyasiga manfiy son (-1) bersak, brauzer tarixida 1 qadam orqaga qaytadi */}
// Bir qadam orqaga qaytish uchun (-1 ni beramiz)
<button onClick={() => navigate(-1)}>⬅️ Orqaga qaytish</button>
\`\`\`

---

## Xulosa qilib aytganda:

1. **Routing** veb-ilovangizni mantiqiy qismlarga va turli xil manzil (URL) larga ajratadi.
2. **React Router DOM** yordamida brauzerni umuman qayta yuklamasdan tezgina sahifalar o'rtasida poyezddek harakatlanish (SPA tajribasi) ta'minlanadi.
3. Katta va yagona qoida: React ichida boshqa sahifalarga o'tishda **hech qachon HTML \`<a href="...">\` tegidan foydalanmang**, barcha harakatlanishlar uchun faqat React Router DOM ning \`<Link to="...">\` komponentidan foydalaning.
4. **Dinamik parametrlar (\`useParams\`)** orqali yagona sahifa shablonini ko'plab mahsulotlar yoxud ma'lumotlar detallarini ko'rsatish uchun qayta ishlata olamiz.
5. **Dasturiy navigatsiya (\`useNavigate\`)** kod mantig'i tugagach (masalan muvaffaqiyatli avtorizatsiyadan keyin) foydalanuvchini avtomatik tarzda kerakli sahifaga olib borib qo'yadi.

Ushbu bilimlarni o'zlashtirganingizdan so'ng, sizning React ilovangiz oddiy bir varaqli saytdan haqiqiy, mukammal, ko'p sahifali web dasturiy platformaga aylanadi!


---

## 🎤 Intervyu Savollari

**1. React Router nima va nima uchun kerak?**
*Javob:* React Router — React SPA da client-side routing (brauzerda sahifalar o'rtasida o'tish) uchun kutubxona. URL o'zgarganda server ga so'rov yubormasdan, React komponentlarni almashtiradi. Foydalanuvchi uchun odatiy ko'p sahifali sayt kabi ko'rinadi.

**2. Link va a tegi farqi nimada?**
*Javob:* \`<a href='...'>\` brauzerda sahifani to'liq qayta yuklaydi. \`<Link to='...'>\` React Router ning komponenti bo'lib, sahifani qayta yuklamasdan URL ni o'zgartiradi va kerakli komponentni ko'rsatadi. React da doimo Link ishlatish kerak.

**3. useParams hook nima uchun kerak?**
*Javob:* URL dagi dinamik parametrlarni olish uchun. Masalan, \`/mahsulot/:id\` da useParams() \`{ id: '42' }\` qaytaradi. Bu API so'rov uchun, ma'lum elementni ko'rsatish uchun ishlatiladi.

**4. useNavigate hook qanday ishlatiladi?**
*Javob:* Dasturiy yo'naltirish uchun: \`const navigate = useNavigate()\`. Keyin \`navigate('/sahifa')\` yoki \`navigate(-1)\` (orqaga). Form submit, login muvaffaqiyati kabi hollarda foydalaniladi.

`,
  code: `import React from "react";
// Bu yerda interaktiv oyna uchun Router imitatsiyasini o'rnatamiz
// Haqiqiy loyihada 'react-router-dom' kutubxonasidan import qilinadi
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

// 1. Sahifa komponentlari
// Bosh sahifa komponenti
function Home() {
  return <h2>Bosh Sahifaga Xush Kelibsiz! 🏠</h2>;
}

// Biz haqimizda sahifasi komponenti
function About() {
  return (
    <div>
      <h2>Biz haqimizda ℹ️</h2>
      <p>Biz React'ni noldan o'rganayotgan yosh dasturchilarmiz.</p>
    </div>
  );
}

// Mahsulot detallari sahifasi
function ProductDetail() {
  // URL dagi :id parametrini ushlab olish (dinamik id ni olish)
  const { id } = useParams();
  
  return (
    <div style={{ padding: 10, background: '#fcf3cf', border: '1px solid #f1c40f', borderRadius: 4 }}>
      <h2>Mahsulot Tafsiloti 🎁</h2>
      {/* id qiymatini ekranda ko'rsatamiz */}
      <p>Siz <strong>{id} - raqamli</strong> mahsulot sahifasidasiz!</p>
    </div>
  );
}

// Noto'g'ri URL kiritilganda ko'rsatiladigan 404 sahifa komponenti
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
          {/* Odatdagi <a> tegini o'rniga sahifani qayta yuklamaydigan <Link> dan foydalanamiz */}
          <Link to="/">Bosh Sahifa</Link>
          <Link to="/about">Biz Haqimizda</Link>
          <Link to="/product/85">Mahsulot: 85</Link>
          <Link to="/asdasd">Mavjud bo'lmagan link</Link>
        </nav>

        {/* Marshrutlarni (Routerlarni) belgilash qismi */}
        {/* Barcha yo'nalishlar Routes ichiga yoziladi */}
        <Routes>
          {/* "/" manziliga kirganda Home komponenti ko'rinadi */}
          <Route path="/" element={<Home />} />
          
          {/* "/about" manziliga kirganda About komponenti ko'rinadi */}
          <Route path="/about" element={<About />} />
          
          {/* Dinamik route: :id o'rniga har qanday qiymat kelishi mumkin */}
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Boshqa hamma xato linklar uchun 404 (Yulduzcha hamma mos kelmagan yo'llarni bildiradi) */}
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

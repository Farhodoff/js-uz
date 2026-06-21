export const step3_components = {
  id: 'step3_components',
  title: '3-DARS: Komponentlar (Components)',
  content: `
# 🧱 React Komponentlari — Hamma Narsa Lego Dan Boshlanadi

## Komponent nima? — Lego Analogiyasi

Tasavvur qiling: siz katta Lego qo'rg'on quryapsiz. Har bir Lego bo'lagi alohida, mustaqil, va qayta ishlatiladi. Devorni bir marta yigsangiz, uni qayta-qayta ishlatasiz. Aynan shu mantiq React **komponentlari** (component) ga ham tegishli.

> 💡 **Komponent** — bu UI (foydalanuvchi interfeysi) ning mustaqil, qayta ishlatiladigan qismi. U o'z ko'rinishi (HTML), logikasi (JavaScript) va uslubini (CSS) o'z ichiga oladi.

### Real Hayot Misoli

Katta veb-saytni ko'z oldingizga keltiring — masalan, **YouTube**:

- Yuqoridagi navigatsiya paneli → \`<Navbar />\`
- Har bir video kartochkasi → \`<VideoCard />\`
- Yon panel → \`<Sidebar />\`
- Izohlar bo'limi → \`<Comments />\`
- Har bir izoh → \`<CommentItem />\`

Bular hammasi alohida komponentlar! Har birini mustaqil yaratib, keyin yig'asiz — xuddi Lego kabi.

---

## Komponent Daraxti (Component Tree)

React ilovasi komponentlardan iborat **daraxt** (tree) hosil qiladi. Eng yuqorida \`App\` komponent turadi, undan pastda qolganlar joylashadi:

\`\`\`mermaid
graph TD
  App["🏠 App (ildiz komponent)"]
  App --> Navbar["🔝 Navbar"]
  App --> Main["📄 Main"]
  App --> Footer["⬇️ Footer"]
  Navbar --> Logo["🖼️ Logo"]
  Navbar --> NavLinks["🔗 NavLinks"]
  Navbar --> SearchBar["🔍 SearchBar"]
  Main --> Sidebar["📌 Sidebar"]
  Main --> Content["📝 Content"]
  Content --> ArticleCard["🃏 ArticleCard"]
  Content --> ArticleCard2["🃏 ArticleCard"]
  Content --> ArticleCard3["🃏 ArticleCard"]
  Sidebar --> UserProfile["👤 UserProfile"]
  Sidebar --> TrendingList["📈 TrendingList"]
\`\`\`

Bu daraxtda ko'rib turganingizdek, \`ArticleCard\` komponent **3 marta** qayta ishlatilmoqda — Lego bo'lagini bir marta yasab, ko'p joyda ishlatish!

---

## Funksional Komponent Sintaksisi

React da komponent yozishning **2 xil usuli** bor:

### 1. Arrow Function (Zamonaviy, tavsiya etiladi)

\`\`\`jsx
// Arrow function yordamida komponent
const Salom = () => {
  return <h1>Salom, Dunyo!</h1>;
};

// Qisqaroq yozuv — qavslar bilan bir qatorda
const Tugma = () => <button>Bosing!</button>;
\`\`\`

### 2. Function Declaration (Klassik usul)

\`\`\`jsx
// Oddiy funksiya e'loni bilan komponent
function Salom() {
  return <h1>Salom, Dunyo!</h1>;
}
\`\`\`

### Qaysi Birini Tanlash Kerak?

| Xususiyat | Arrow Function | Function Declaration |
|-----------|---------------|---------------------|
| Zamonaviylik | ✅ Zamonaviy | ⚠️ Klassik |
| \`this\` binding | Yo'q (hooks bilan kerak emas) | Bor |
| Hoisting | ❌ Yo'q | ✅ Bor |
| Qisqalik | ✅ Qisqa | ⚠️ Uzunroq |
| Jamoaviy kod | Ko'p ishlatiladigan | Ham ishlatiladigan |

> 💡 **Tavsiya**: Darsda ikkalasini ham o'rganamiz, lekin amalda ko'pincha **arrow function** ishlatiladi.

---

## ⚠️ MUHIM: Komponent Nomi KATTA Harf bilan Boshlanishi SHART!

Bu React ning eng muhim qoidalaridan biri. Nima uchun?

React JSX ni render (ko'rsatish) qilganda quyidagicha farqlaydi:

- **Kichik harf** → HTML tegi deb o'ylaydi: \`<div>\`, \`<p>\`, \`<button>\`
- **Katta harf** → React komponent deb o'ylaydi: \`<MyButton>\`, \`<UserCard>\`

### ❌ YOMON — Kichik harf bilan komponent

\`\`\`jsx
// XATO! React buni HTML tegi deb o'ylaydi
function myButton() {
  return <button>Bosing</button>;
}

// Natija: React "myButton" nomli HTML tegini qidiradi
// va uni topa olmaydi — xatolik yoki kutilmagan natija!
const myarticle = () => {
  return <article>Maqola</article>;
};
\`\`\`

### ✅ YAXSHI — Katta harf bilan komponent

\`\`\`jsx
// TO'G'RI! Katta M harfi bilan boshlaymiz
function MyButton() {
  return <button>Bosing</button>;
}

// Katta A harfi bilan — React uni komponent deb biladi
const MyArticle = () => {
  return <article>Maqola</article>;
};

// Ishlatganda:
function App() {
  return (
    <div>
      <MyButton />   {/* ✅ Komponent sifatida ishlaydi */}
      <MyArticle />  {/* ✅ Komponent sifatida ishlaydi */}
    </div>
  );
}
\`\`\`

### Nomga Oid Qoidalar

\`\`\`jsx
// ✅ TO'G'RI nomlar:
const UserCard = () => { ... };      // PascalCase
const NavigationBar = () => { ... }; // Ko'p so'z — barini katta boshlanadi
const APIHandler = () => { ... };    // Qisqartma ham bo'lishi mumkin

// ❌ NOTO'G'RI nomlar:
const userCard = () => { ... };      // camelCase — HTML teg deb o'ylaydi
const user_card = () => { ... };     // snake_case — ishlamaydi
const USER-CARD = () => { ... };     // Tire — sintaksis xatosi
\`\`\`

---

## Export — Komponentni Tashqariga Chiqarish

### Default Export (Asosiy eksport)

\`\`\`jsx
// UserCard.jsx fayli

// Komponentni yaratamiz
const UserCard = () => {
  return (
    <div className="user-card">
      <h2>Foydalanuvchi</h2>
    </div>
  );
};

// Faylning ASOSIY eksporti — faqat bittasi bo'lishi mumkin
export default UserCard;
\`\`\`

\`\`\`jsx
// Boshqa faylda import qilish — ISTALGAN nom berishingiz mumkin
import UserCard from './UserCard';      // to'g'ri
import Card from './UserCard';          // ham to'g'ri — nom o'zgartirildi
import MyCard from './UserCard';        // ham to'g'ri
\`\`\`

### Named Export (Nomlangan eksport)

\`\`\`jsx
// utils.jsx fayli — bir necha narsa export qilinadi

// Named export — figurali qavslar bilan e'lon
export const Button = () => <button>Bosing</button>;
export const Input = () => <input type="text" />;
export const Label = ({ text }) => <label>{text}</label>;

// Yoki oxirida birdan export qilish:
const Title = () => <h1>Sarlavha</h1>;
const Subtitle = () => <h2>Kichik sarlavha</h2>;
export { Title, Subtitle };
\`\`\`

\`\`\`jsx
// Import qilish — ANIQ nomlarini yozish kerak, figurali qavslar bilan
import { Button, Input } from './utils';       // faqat keraklilarini
import { Button, Input, Label } from './utils'; // barchasini

// Nomni o'zgartirish ham mumkin (alias)
import { Button as MyBtn } from './utils';
\`\`\`

### Qachon Qaysinisini Ishlatish Kerak?

| Holat | Default Export | Named Export |
|-------|---------------|--------------|
| Bir faylda bitta komponent | ✅ Ideal | ⚠️ Ortiqcha |
| Bir faylda bir necha narsa | ❌ Faqat bittasi | ✅ Ideal |
| Utility funksiyalar | ⚠️ | ✅ Afzal |
| Yagona sahifa komponentlari | ✅ Afzal | ⚠️ |

\`\`\`jsx
// ✅ YAXSHI amaliyot — har bir komponent o'z faylida
// Button.jsx
const Button = ({ label }) => <button>{label}</button>;
export default Button;

// ✅ YAXSHI amaliyot — kichik utility komponentlar
// ui/index.js
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Modal } from './Modal';
// Boshqa joyda: import { Button, Input } from './ui';
\`\`\`

---

## Komponentlarni Nesting (Ichida Ishlatish)

Komponentlarni bir-birining ichida ishlatish — **compositing** (yig'ish) deyiladi:

\`\`\`jsx
// Kichik, oddiy komponent
const Avatar = () => {
  return (
    <img
      src="https://picsum.photos/50"
      alt="Foydalanuvchi rasmi"
      className="avatar"
    />
  );
};

// Kartochka komponent — Avatar ni ichida ishlatadi
const UserCard = () => {
  return (
    <div className="card">
      <Avatar />          {/* Avatar komponentni qo'shamiz */}
      <h3>Ali Valiyev</h3>
      <p>Frontend Dasturchi</p>
    </div>
  );
};

// Ro'yxat komponent — UserCard ni ko'p marta ishlatadi
const UserList = () => {
  return (
    <section>
      <h2>Foydalanuvchilar Ro'yxati</h2>
      <UserCard />   {/* 1-foydalanuvchi */}
      <UserCard />   {/* 2-foydalanuvchi */}
      <UserCard />   {/* 3-foydalanuvchi */}
    </section>
  );
};

// App — eng yuqori komponent
function App() {
  return (
    <main>
      <UserList />   {/* UserList -> UserCard -> Avatar */}
    </main>
  );
}

export default App;
\`\`\`

---

## Kichik Komponentlarga Bo'lib Chiqish

### Qachon Yangi Komponent Yaratish Kerak?

Bu savolga "**Single Responsibility Principle**" (Yagona Mas'uliyat Tamoyili) yordam beradi: **Har bir komponent faqat bitta ishni bajarsin.**

Quyidagi holatlarda yangi komponent yarating:

\`\`\`
✅ Komponent katta bo'lib ketganda (30-50 qatordan oshsa)
✅ Kod takrorlanayotganda (copy-paste qilayotgansiz)
✅ Mantiqiy ajratish mumkin bo'lsa (header, footer, card)
✅ Mustaqil holda test qilishingiz kerak bo'lsa
✅ Boshqa sahifalarda ham ishlatish mumkin bo'lsa
\`\`\`

### ❌ YOMON — Hamma narsa bitta komponentda

\`\`\`jsx
// Bu komponent JUDA KATTA — refaktor qilish kerak!
function App() {
  return (
    <div>
      {/* Navigatsiya — 20 qator HTML */}
      <nav>
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>MyApp</span>
        </div>
        <ul>
          <li><a href="/">Bosh sahifa</a></li>
          <li><a href="/about">Haqida</a></li>
          <li><a href="/contact">Aloqa</a></li>
        </ul>
        <button>Kirish</button>
      </nav>

      {/* Asosiy kontent — 30 qator HTML */}
      <main>
        <div className="hero">
          <h1>Xush Kelibsiz!</h1>
          <p>Bu ajoyib platforma...</p>
          <button>Boshlash</button>
        </div>
        <div className="features">
          <div className="feature-card">
            <span>⚡</span>
            <h3>Tez</h3>
            <p>Juda tez ishlaydi</p>
          </div>
          {/* Yana 10 ta shunday card... */}
        </div>
      </main>

      {/* Footer — 15 qator HTML */}
      <footer>
        <p>© 2024 MyApp. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
// Natija: 100+ qatorlik, o'qib bo'lmaydigan, qayta
// ishlatib bo'lmaydigan komponent 😱
\`\`\`

### ✅ YAXSHI — Mantiqiy bo'lingan komponentlar

\`\`\`jsx
// Navbar.jsx — faqat navigatsiya uchun mas'ul
const Navbar = () => (
  <nav>
    <Logo />
    <NavLinks />
    <LoginButton />
  </nav>
);

// HeroSection.jsx — faqat hero qism uchun mas'ul
const HeroSection = () => (
  <div className="hero">
    <h1>Xush Kelibsiz!</h1>
    <p>Bu ajoyib platforma...</p>
    <button>Boshlash</button>
  </div>
);

// FeatureCard.jsx — bitta kartochka
const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <span>{icon}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Footer.jsx — faqat footer uchun
const Footer = () => (
  <footer>
    <p>© 2024 MyApp. Barcha huquqlar himoyalangan.</p>
  </footer>
);

// App.jsx — faqat yig'ish/layout uchun mas'ul
function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
// Natija: Har bir fayl 10-30 qator, toza, qayta ishlatiladi ✅
\`\`\`

---

## Smart vs Dumb Komponentlar

Bu arxitektura (tuzilma) pattern'i (qolip) React da juda mashhur:

### 🧠 Smart (Aqlli) Komponentlar — Container Components

- Biznes mantiqini (logic) boshqaradi
- State (holat) saqlaydi
- API dan ma'lumot oladi
- Ko'rinish emas, **mantiq** bilan shug'ullanadi

\`\`\`jsx
// UserListContainer.jsx — SMART komponent
import { useState, useEffect } from 'react';
import UserList from './UserList'; // Dumb komponent

const UserListContainer = () => {
  // State saqlaydi
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API dan ma'lumot oladi
  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Dumb komponentga ma'lumot uzatadi
  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;
  return <UserList users={users} />;
};
\`\`\`

### 🎨 Dumb (Soddа) Komponentlar — Presentational Components

- Faqat ko'rsatish uchun
- Props (xususiyatlar) qabul qiladi va render qiladi
- State yo'q (yoki minimal)
- Qayta ishlatish oson

\`\`\`jsx
// UserList.jsx — DUMB komponent (Presentational)
const UserList = ({ users }) => {
  // Faqat ko'rsatish bilan shug'ullanadi
  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} className="user-item">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
          <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
\`\`\`

\`\`\`mermaid
graph LR
  SC["🧠 Smart Component\n(Container)"]
  DC1["🎨 Dumb Component\n(UserList)"]
  DC2["🎨 Dumb Component\n(UserCard)"]
  DC3["🎨 Dumb Component\n(Button)"]

  SC -->|"users props"| DC1
  SC -->|"user props"| DC2
  SC -->|"onClick props"| DC3

  API["🌐 API / State"]
  API -->|"ma'lumot"| SC
\`\`\`

> 💡 **Zamonaviy React** da bu chegarani React Hooks xiralashtirgani bilan, bu kontseptsiya hali ham kodni tartibli saqlashda foydali.

---

## Komponent Papka Tuzilmasi (Best Practices)

### Variant 1: Sodda Tuzilma (Kichik loyihalar)

\`\`\`
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   ├── UserCard.jsx
│   └── Modal.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
└── App.jsx
\`\`\`

### Variant 2: Feature-based Tuzilma (O'rta loyihalar)

\`\`\`
src/
├── components/
│   ├── common/           # Qayta ishlatiladigan umumiy
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   └── index.js  # Re-export
│   │   └── Modal/
│   │       ├── Modal.jsx
│   │       └── index.js
│   ├── layout/           # Layout komponentlari
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── features/         # Xususiyat bo'yicha
│       ├── auth/
│       │   ├── LoginForm.jsx
│       │   └── RegisterForm.jsx
│       └── products/
│           ├── ProductCard.jsx
│           └── ProductList.jsx
├── pages/
└── App.jsx
\`\`\`

### Komponent Papkasi Ichki Tuzilmasi (Recommended)

\`\`\`jsx
// Button/index.js — Foydalanish oson: import Button from './Button'
export { default } from './Button';

// Button/Button.jsx — Asosiy komponent kodi
const Button = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}  // dinamik class
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Button;

// Button/Button.module.css — Komponent uslublari
// Button/Button.test.js — Komponent testlari
\`\`\`

---

## 🎤 Intervyu Savol-Javoblari

### 1️⃣ "React da komponent nima va u oddiy JavaScript funksiyasidan nima bilan farq qiladi?"

**Javob:**
React komponent — bu UI ning qayta ishlatiladigan, mustaqil bo'lagi. U JavaScript funksiyasidan farqli ravishda:
1. **JSX** qaytaradi (HTML-ga o'xshash sintaksis)
2. **Lifecycle** (hayot aylanishi) bor — mount, update, unmount
3. **Props** orqali ma'lumot qabul qiladi
4. **State** saqlashi mumkin (useState bilan)
5. React tomonidan boshqariladi va optimallashtiriladi

Texnik jihatdan funksional komponent — bu JSX qaytaradigan oddiy JavaScript funksiyasi, lekin React uni maxsus tarzda qayta ishlaydi.

---

### 2️⃣ "Nima uchun React komponent nomini katta harf bilan yozish shart?"

**Javob:**
React **JSX transpiler** (Babel/SWC) kichik harfli nomlarni **native HTML elementlari** (\`div\`, \`span\`, \`p\`) deb, katta harfli nomlarni esa **React komponentlari** deb qabul qiladi.

\`<button>\` yozilsa — bu HTML button elementi yaratadi.
\`<Button>\` yozilsa — bu React \`Button\` komponentini chaqiradi.

Agar komponentni kichik harf bilan yozsangiz, React uni DOM elementiga o'tkazishga harakat qiladi, bu esa xatolikka yoki noto'g'ri renderga olib keladi.

---

### 3️⃣ "Default export va named export orasidagi farq nima? Qachon qaysinisini tanlaysiz?"

**Javob:**
- **Default export**: Bir fayldan faqat bittasi bo'lishi mumkin. Import qilganda xohlagan nom bersangiz bo'ladi. Asosiy komponent bo'lganda ishlatiladi.
- **Named export**: Bir fayldan ko'p bo'lishi mumkin. Import qilganda aniq nomini {} ichida yozish kerak.

**Qoidam:**
- Bir faylda — bitta asosiy komponent → \`export default\`
- Bir faylda bir necha utility/kichik komponent → \`export { ... }\` (named)
- UI kutubxona komponentlari (Button, Input, Modal) → named export afzal, chunki treeshaking yaxshi ishlaydi

---

## 🔑 Xulosa

\`\`\`
✅ Komponent = UI ning qayta ishlatiladigan qismi (Lego!)
✅ Nom DOIM PascalCase (katta harf) bilan boshlanadi
✅ Funksional komponent — arrow function yoki function declaration
✅ Export default — yagona asosiy komponent uchun
✅ Named export — bir faylda bir necha narsa uchun
✅ Katta komponentlarni kichiklarga bo'ling
✅ Smart = Mantiq, Dumb = Ko'rinish
✅ Har bir komponent faqat bitta ishni bajarsin
\`\`\`
  `,
  code: `// 3-DARS: Komponentlar (Components)
// Quyida oddiy komponentlar namunasi ko'rsatilgan

// 1. Sodda funksional komponent (arrow function)
const Salom = () => {
  return <h1>Salom, React!</h1>;
};

// 2. Ko'p qatorli JSX — qavslar ichida
const UserCard = () => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h2>Ali Valiyev</h2>
      <p>Frontend Dasturchi</p>
      <button>Profil ko'rish</button>
    </div>
  );
};

// 3. Komponentni ichida ishlatish (nesting)
function App() {
  return (
    <div>
      <Salom />
      <UserCard />
      <UserCard />
    </div>
  );
}

export default App;
`,
  exercises: [
    {
      id: 1,
      title: 'Birinchi Komponentingiz',
      description: `\`Xush Kelibsiz\` nomli komponent yarating. U \`<h1>\` ichida "Xush kelibsiz, React Dunyosiga!" matnini ko'rsatsin. Komponentni \`export default\` qilib chiqaring.`,
      startingCode: `// Bu yerda Xush Kelibsiz komponentini yozing
// va export default qiling

`,
      solution: `// Xush Kelibsiz komponentini yaratamiz
const XushKelibsiz = () => {
  return (
    <h1>Xush kelibsiz, React Dunyosiga!</h1>
  );
};

// Default export qilamiz
export default XushKelibsiz;
`,
      hint: `Komponent nomi katta harf bilan boshlanishi kerak. \`const NomKomponent = () => { return <JSX />; };\` shaklida yozing, keyin \`export default NomKomponent;\` qo'shing.`
    },
    {
      id: 2,
      title: 'Profil Kartochkasi',
      description: `\`ProfilKartochka\` komponentini yarating. U \`<div>\` ichida quyidagilarni ko'rsatsin: \`<img>\` (istalgan src), \`<h2>\` (ismingiz), \`<p>\` (kasbingiz), \`<p>\` (shahringiz). Komponent nomini PascalCase bilan yozing.`,
      startingCode: `// ProfilKartochka komponentini yarating
// Ichida: img, h2 (ism), p (kasb), p (shahar) bo'lsin

`,
      solution: `// ProfilKartochka — foydalanuvchi ma'lumotlarini ko'rsatadi
const ProfilKartochka = () => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '12px', maxWidth: '300px' }}>
      {/* Foydalanuvchi rasmi */}
      <img
        src="https://picsum.photos/100"
        alt="Profil rasmi"
        style={{ borderRadius: '50%', width: '100px', height: '100px' }}
      />
      {/* Ism va familiya */}
      <h2>Sardor Rahimov</h2>
      {/* Kasb */}
      <p>React Dasturchisi</p>
      {/* Shahar */}
      <p>📍 Toshkent, O'zbekiston</p>
    </div>
  );
};

export default ProfilKartochka;
`,
      hint: `JSX da bir necha element qaytarish uchun ularni bitta \`<div>\` ichiga joylashtiring. \`<img src="..." alt="..." />\` — img o'z-o'zini yopadi.`
    },
    {
      id: 3,
      title: 'Named Export — UI Komponentlar',
      description: `Bitta faylda 3 ta komponent yarating va \`named export\` qiling: \`Tugma\` (button), \`Kirish\` (input[type=text]), \`Yorliq\` (label matn bilan). Ularni \`export { Tugma, Kirish, Yorliq }\` shaklida chiqaring.`,
      startingCode: `// Uch komponent yarating va named export qiling
// Tugma, Kirish, Yorliq

`,
      solution: `// Tugma — bosish uchun
const Tugma = () => {
  return (
    <button
      style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      Bosing!
    </button>
  );
};

// Kirish — matn kiritish uchun
const Kirish = () => {
  return (
    <input
      type="text"
      placeholder="Matn kiriting..."
      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  );
};

// Yorliq — label uchun
const Yorliq = () => {
  return (
    <label style={{ fontWeight: 'bold', color: '#333' }}>
      Ism kiriting:
    </label>
  );
};

// Named export — uchala komponentni birdan chiqaramiz
export { Tugma, Kirish, Yorliq };
`,
      hint: `Faylning oxirida \`export { Tugma, Kirish, Yorliq };\` yozish yetarli. Yoki har birini yaratishda \`export const Tugma = ...\` shaklida ham yozsa bo'ladi.`
    },
    {
      id: 4,
      title: 'Komponent Nesting — Sahifa Tuzilmasi',
      description: `3 ta komponent yarating: \`Sarlavha\` (h1 bilan), \`Paragraf\` (p bilan), \`Sahifa\` (Sarlavha va Paragrafni ichida ishlatadi). Faqat \`Sahifa\` ni \`export default\` qiling.`,
      startingCode: `// Sarlavha, Paragraf, Sahifa komponentlarini yarating
// Sahifada ikkalasini ham ishlating

`,
      solution: `// Sarlavha — faqat h1 ko'rsatadi
const Sarlavha = () => {
  return <h1>React Komponentlari</h1>;
};

// Paragraf — asosiy matn ko'rsatadi
const Paragraf = () => {
  return (
    <p>
      React komponentlari UI ni kichik, qayta ishlatiladigan
      bo'laklarga bo'lish imkonini beradi. Xuddi Lego kabi!
    </p>
  );
};

// Sahifa — yuqoridagi komponentlarni o'z ichiga oladi
const Sahifa = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Sarlavha />   {/* Sarlavha komponentni qo'shamiz */}
      <Paragraf />   {/* Paragraf komponentni qo'shamiz */}
      <Paragraf />   {/* Bir xil komponentni ikki marta ishlatamiz */}
    </div>
  );
};

// Faqat Sahifa ni export qilamiz
export default Sahifa;
`,
      hint: `\`Sahifa\` komponentining return() ichida \`<Sarlavha />\` va \`<Paragraf />\` ni yozing. Ular bir-birining ichida emas, ketma-ket joylashsin.`
    },
    {
      id: 5,
      title: 'Navigatsiya Paneli',
      description: `\`Navbar\` komponent yarating. Ichida: \`<nav>\` elementi, uning ichida logo matn (\`<strong>\`) va 3 ta havola (\`<a href="#">\`): "Bosh sahifa", "Blog", "Aloqa". Uslub qo'shish shart emas.`,
      startingCode: `// Navbar komponentini yarating
// nav > (strong + 3 ta a havola)

`,
      solution: `// Navbar — sayt navigatsiyasi uchun
const Navbar = () => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px', background: '#1a1a2e', color: 'white' }}>
      {/* Logo */}
      <strong style={{ fontSize: '20px', color: '#e94560' }}>
        MyApp
      </strong>

      {/* Navigatsiya havolalari */}
      <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
        Bosh sahifa
      </a>
      <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
        Blog
      </a>
      <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
        Aloqa
      </a>
    </nav>
  );
};

export default Navbar;
`,
      hint: `\`<nav>\` ichiga \`<strong>\` va 3 ta \`<a href="#">\` joylashtiring. \`href="#"\` - hozircha bo'sh havola. Display flex qo'shsangiz chiroyli ko'rinadi.`
    },
    {
      id: 6,
      title: 'Mahsulot Kartochkasi — Qayta Ishlatish',
      description: `\`MahsulotKartochka\` komponentini yarating (rasm, nom, narx, "Savatchaga" tugmasi bilan). Keyin \`MahsulotRo'yxat\` komponent yarating va unda \`MahsulotKartochka\` ni 3 marta ishlating.`,
      startingCode: `// MahsulotKartochka va MahsulotRoyxat komponentlarini yarating
// MahsulotRoyxat ni export default qiling

`,
      solution: `// MahsulotKartochka — bitta mahsulot ko'rsatadi
const MahsulotKartochka = () => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      width: '200px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Mahsulot rasmi */}
      <img
        src="https://picsum.photos/200/150"
        alt="Mahsulot"
        style={{ width: '100%', borderRadius: '4px' }}
      />
      {/* Mahsulot nomi */}
      <h3 style={{ margin: '8px 0' }}>Noutbuk Pro</h3>
      {/* Narxi */}
      <p style={{ color: '#e91e63', fontWeight: 'bold' }}>5,999,000 so'm</p>
      {/* Savatchaga qo'shish tugmasi */}
      <button style={{
        background: '#4caf50',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%'
      }}>
        🛒 Savatchaga
      </button>
    </div>
  );
};

// MahsulotRoyxat — bir necha kartochkani ko'rsatadi
const MahsulotRoyxat = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '20px' }}>
      {/* Bir xil komponentni 3 marta ishlatamiz */}
      <MahsulotKartochka />
      <MahsulotKartochka />
      <MahsulotKartochka />
    </div>
  );
};

export default MahsulotRoyxat;
`,
      hint: `Avval \`MahsulotKartochka\` ni yarating, keyin \`MahsulotRoyxat\` da uni 3 marta \`<MahsulotKartochka />\` shaklida chaqiring. Flexbox bilan yonma-yon joylashtiring.`
    },
    {
      id: 7,
      title: 'Smart va Dumb Komponent Pattern',
      description: `\`StatistikaDumb\` (props kutadi: \`foydalanuvchilar\`, \`mahsulotlar\`, \`buyurtmalar\`) va \`StatistikaContainer\` (Smart — raqamlarni hardcode qilib Dumb ga uzatadi) komponentlar yarating. Faqat \`StatistikaContainer\` ni export default qiling.`,
      startingCode: `// StatistikaDumb — faqat ko'rsatish (props kutadi)
// StatistikaContainer — mantiq (ma'lumot uzatadi)

`,
      solution: `// StatistikaDumb — DUMB komponent, faqat ko'rsatadi
// Props orqali ma'lumot kutadi
const StatistikaDumb = ({ foydalanuvchilar, mahsulotlar, buyurtmalar }) => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* Foydalanuvchilar statistikasi */}
      <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ color: '#1565c0', margin: 0 }}>{foydalanuvchilar}</h2>
        <p style={{ margin: '4px 0', color: '#666' }}>Foydalanuvchilar</p>
      </div>
      {/* Mahsulotlar statistikasi */}
      <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ color: '#2e7d32', margin: 0 }}>{mahsulotlar}</h2>
        <p style={{ margin: '4px 0', color: '#666' }}>Mahsulotlar</p>
      </div>
      {/* Buyurtmalar statistikasi */}
      <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ color: '#e65100', margin: 0 }}>{buyurtmalar}</h2>
        <p style={{ margin: '4px 0', color: '#666' }}>Buyurtmalar</p>
      </div>
    </div>
  );
};

// StatistikaContainer — SMART komponent, mantiqni boshqaradi
// Haqiqiy loyihada bu yerda API chaqiruvi yoki state bo'lardi
const StatistikaContainer = () => {
  // Hardcode qilingan ma'lumotlar (amalda API dan keladi)
  const ma'lumotlar = {
    foydalanuvchilar: 1_240,
    mahsulotlar: 358,
    buyurtmalar: 89
  };

  // Dumb komponentga props orqali uzatamiz
  return (
    <StatistikaDumb
      foydalanuvchilar={ma'lumotlar.foydalanuvchilar}
      mahsulotlar={ma'lumotlar.mahsulotlar}
      buyurtmalar={ma'lumotlar.buyurtmalar}
    />
  );
};

export default StatistikaContainer;
`,
      hint: `\`StatistikaDumb\` funksiya parametrida \`{ foydalanuvchilar, mahsulotlar, buyurtmalar }\` destructuring qiling. \`StatistikaContainer\` da bu raqamlarni hardcode yozib, Dumb ga props sifatida uzating.`
    },
    {
      id: 8,
      title: 'Footer Komponent',
      description: `\`Footer\` komponent yarating. Ichida: copyright matni (© 2024 va loyiha nomi), 3 ta ijtimoiy tarmoq havolasi (GitHub, LinkedIn, Twitter) va "Yuqoriga" tugmasi (\`<button>\`). Hammasini \`<footer>\` tegida joylashtiring.`,
      startingCode: `// Footer komponentini yarating
// footer > (p, nav havolalar, button)

`,
      solution: `// Footer — sahifaning pastki qismi
const Footer = () => {
  return (
    <footer style={{
      background: '#212121',
      color: '#fff',
      padding: '32px',
      textAlign: 'center'
    }}>
      {/* Copyright matni */}
      <p style={{ margin: '0 0 16px', color: '#bbb' }}>
        © 2024 MyReactApp. Barcha huquqlar himoyalangan.
      </p>

      {/* Ijtimoiy tarmoqlar */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#90caf9', textDecoration: 'none' }}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#90caf9', textDecoration: 'none' }}
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#90caf9', textDecoration: 'none' }}
        >
          Twitter
        </a>
      </nav>

      {/* Yuqoriga qaytish tugmasi */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          background: 'transparent',
          border: '1px solid #90caf9',
          color: '#90caf9',
          padding: '8px 20px',
          borderRadius: '20px',
          cursor: 'pointer'
        }}
      >
        ↑ Yuqoriga
      </button>
    </footer>
  );
};

export default Footer;
`,
      hint: `\`<footer>\` tegini yarating. Ichiga \`<p>\`, \`<nav>\` (havolalar bilan) va \`<button>\` qo'shing. \`onClick={() => window.scrollTo(...)}\` scroll animatsiyasini qo'shadi.`
    },
    {
      id: 9,
      title: 'Karta Komponent — Barcha Variantlari',
      description: `\`KartaAsosiy\`, \`KartaOgoh\`, \`KartaXato\` nomli 3 ta komponent yarating. Har biri boshqa rang (ko'k, sariq, qizil) da matn va ikonka (\`ℹ️\`, \`⚠️\`, \`❌\`) ko'rsatsin. Hammasini \`named export\` qiling.`,
      startingCode: `// KartaAsosiy, KartaOgoh, KartaXato komponentlarini yarating
// Named export bilan chiqaring

`,
      solution: `// KartaAsosiy — ma'lumot beruvchi karta (ko'k)
export const KartaAsosiy = () => {
  return (
    <div style={{
      background: '#e3f2fd',
      border: '1px solid #90caf9',
      borderLeft: '4px solid #1565c0',
      borderRadius: '4px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      {/* Ma'lumot ikonkasi */}
      <span style={{ fontSize: '20px' }}>ℹ️</span>
      <p style={{ margin: 0, color: '#1565c0' }}>
        Bu ma'lumot xabari. Foydalanuvchiga qo'shimcha tushuntirish beradi.
      </p>
    </div>
  );
};

// KartaOgoh — ogohlantiruvchi karta (sariq)
export const KartaOgoh = () => {
  return (
    <div style={{
      background: '#fff8e1',
      border: '1px solid #ffe082',
      borderLeft: '4px solid #f9a825',
      borderRadius: '4px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      {/* Ogohlantirish ikonkasi */}
      <span style={{ fontSize: '20px' }}>⚠️</span>
      <p style={{ margin: 0, color: '#f57f17' }}>
        Diqqat! Bu harakatni bajarishdan oldin ikki marta o'ylang.
      </p>
    </div>
  );
};

// KartaXato — xato xabari kartasi (qizil)
export const KartaXato = () => {
  return (
    <div style={{
      background: '#ffebee',
      border: '1px solid #ef9a9a',
      borderLeft: '4px solid #c62828',
      borderRadius: '4px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      {/* Xato ikonkasi */}
      <span style={{ fontSize: '20px' }}>❌</span>
      <p style={{ margin: 0, color: '#c62828' }}>
        Xatolik yuz berdi! Sahifani yangilab, qayta urinib ko'ring.
      </p>
    </div>
  );
};
`,
      hint: `Har bir komponentni \`export const NomKomponent = () => {...}\` shaklida yozing — bu avtomatik named export bo'ladi. Yoki oxirida \`export { KartaAsosiy, KartaOgoh, KartaXato };\` yozing.`
    },
    {
      id: 10,
      title: 'To\'liq Sahifa Yig\'ish',
      description: `Avvalgi mashqlardagi: \`Navbar\`, \`MahsulotRoyxat\`, \`Footer\` komponentlaridan foydalanib (yoki yangi variant yozing), \`ToliqSahifa\` komponent yarating. Bu komponent ularni ketma-ket ko'rsatsin. Faqat \`ToliqSahifa\` ni export default qiling.`,
      startingCode: `// Avval kichik komponentlarni yozing
// Keyin ToliqSahifa da ularni birlashtiring

// Mini-Navbar:
const MiniNavbar = () => { /* yozing */ };

// MiniBanner:
const MiniBanner = () => { /* yozing */ };

// MiniFooter:
const MiniFooter = () => { /* yozing */ };

// ToliqSahifa — hammasini birlashtiradi
const ToliqSahifa = () => {
  // ...
};

export default ToliqSahifa;
`,
      solution: `// MiniNavbar — sodda navigatsiya
const MiniNavbar = () => {
  return (
    <nav style={{
      background: '#6200ea',
      color: 'white',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <strong style={{ fontSize: '18px' }}>⚡ ReactApp</strong>
      {/* Havolalar */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Bosh sahifa</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Haqida</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Aloqa</a>
      </div>
    </nav>
  );
};

// MiniBanner — qahramonlik banner
const MiniBanner = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '80px 32px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', margin: '0 0 16px' }}>
        React bilan quramiz! 🚀
      </h1>
      <p style={{ fontSize: '18px', opacity: 0.9, margin: '0 0 24px' }}>
        Komponentlar yordamida har qanday UI yaratish mumkin
      </p>
      <button style={{
        background: 'white',
        color: '#6200ea',
        border: 'none',
        padding: '14px 32px',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        Boshlash →
      </button>
    </div>
  );
};

// MiniFooter — pastki qism
const MiniFooter = () => {
  return (
    <footer style={{
      background: '#1a1a2e',
      color: '#9e9e9e',
      padding: '24px',
      textAlign: 'center'
    }}>
      <p style={{ margin: 0 }}>
        © 2024 ReactApp | O'zbekiston 🇺🇿
      </p>
    </footer>
  );
};

// ToliqSahifa — barcha komponentlarni birlashtiradi
const ToliqSahifa = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Yuqori navigatsiya */}
      <MiniNavbar />

      {/* Asosiy kontent */}
      <main style={{ flex: 1 }}>
        <MiniBanner />
        <div style={{ padding: '40px 32px', textAlign: 'center' }}>
          <h2>Xususiyatlarimiz</h2>
          <p>Bu yerda mahsulotlar va xizmatlar ro'yxati bo'ladi...</p>
        </div>
      </main>

      {/* Pastki qism */}
      <MiniFooter />
    </div>
  );
};

// Faqat asosiy komponentni export qilamiz
export default ToliqSahifa;
`,
      hint: `Avval 3 ta kichik komponent yarating (har biri 5-15 qator). Keyin \`ToliqSahifa\` da \`<MiniNavbar />\`, \`<MiniBanner />\`, \`<MiniFooter />\` ni ketma-ket joylashtiring.`
    }
  ],
  quizzes: [
    {
      id: 1,
      question: `React da quyidagilardan qaysi biri to'g'ri komponent nomi?`,
      options: [
        'userProfile',
        'UserProfile',
        'user-profile',
        'user_profile'
      ],
      correctAnswer: 1,
      explanation: `React komponent nomlari \`PascalCase\` (har so'z katta harf bilan) bo'lishi shart. \`UserProfile\` to'g'ri. Kichik harfli nomlar (\`userProfile\`) HTML elementi deb qabul qilinadi, tire (\`-\`) va pastki chiziq (\`_\`) esa JavaScript sintaksisida komponent nomida ishlatilmaydi.`
    },
    {
      id: 2,
      question: `\`export default\` va \`export { Name }\` (named export) orasidagi asosiy farq nima?`,
      options: [
        'Default export tezroq, named export sekinroq ishlaydi',
        'Default export faqat bitta bo\'lishi mumkin, named export esa ko\'p bo\'lishi mumkin',
        'Named export faqat funksiyalar uchun, default export sinflар uchun',
        'Ikkalasi mutlaqo bir xil, farqi yo\'q'
      ],
      correctAnswer: 1,
      explanation: `Bir faylda faqat **bitta** \`export default\` bo\'lishi mumkin. \`Named export\` esa bir fayldan istalgancha narsa chiqarishga imkon beradi. Import qilganda: default — \`import Istalgan from './fayl'\`, named — \`import { AniqNom } from './fayl'\`.`
    },
    {
      id: 3,
      question: `Quyidagi kod nima xato qiladi?\n\nfunction myComponent() {\n  return <div>Salom</div>;\n}`,
      options: [
        'return kalit so\'zi ishlatilgan — xato',
        'div tegi noto\'g\'ri ishlatilgan',
        'Komponent nomi kichik harf bilan boshlangan — React uni HTML elementi deb qabul qiladi',
        'Funksiya ichida JSX ishlatib bo\'lmaydi'
      ],
      correctAnswer: 2,
      explanation: `\`myComponent\` — kichik harf bilan boshlanganki, React JSX da \`<myComponent />\` yozilganda uni nostandart HTML elementi deb o\'ylaydi, React komponenti sifatida emas. To\'g\'ri yozuv: \`MyComponent\`.`
    },
    {
      id: 4,
      question: `Quyidagi kodda nechta komponent yaratilgan?\n\nconst A = () => <p>A</p>;\nconst B = () => <p>B</p>;\nfunction C() { return <div><A /><B /></div>; }`,
      options: [
        '1 ta — faqat C',
        '2 ta — A va B',
        '3 ta — A, B va C',
        '0 ta — bu JSX, komponent emas'
      ],
      correctAnswer: 2,
      explanation: `3 ta komponent yaratilgan: \`A\`, \`B\`, va \`C\`. \`C\` komponent ichida \`A\` va \`B\` larni ishlatadi (nesting), lekin ular alohida komponent bo\'lib qoladi. React da har qanday JSX qaytaradigan funksiya komponent hisoblanadi.`
    },
    {
      id: 5,
      question: `"Smart vs Dumb" komponent pattern'ida Dumb (Presentational) komponent qaysi xususiyatga ega?`,
      options: [
        'API chaqiruvlarni bajaradi va natijani saqlaydi',
        'Faqat props qabul qilib, UI ko\'rsatadi — biznes mantiqisiz',
        'useState va useEffect hooklarini faol ishlatadi',
        'Faqat backend bilan ishlaydi'
      ],
      correctAnswer: 1,
      explanation: `\`Dumb\` (Presentational) komponent faqat \`props\` orqali kelgan ma'lumotlarni ko'rsatadi. U biznes mantiqidan xoli bo'ladi — API, state management, yoki murakkab hisob-kitoblar yo'q. Bu uni qayta ishlatishni va test qilishni osonlashtiradi.`
    },
    {
      id: 6,
      question: `React da "Component Tree" (Komponent Daraxti) nima?`,
      options: [
        'Fayllar tizimidagi papkalar tuzilmasi',
        'CSS selektorlar zanjiri',
        'App dan boshlab barcha komponentlarning ierarxik ko\'rinishi',
        'JavaScript prototip zanjiri'
      ],
      correctAnswer: 2,
      explanation: `Component Tree — bu React ilovasidagi barcha komponentlarning ierarxik ko'rinishi. Eng tepada odatda \`App\` turadi, undan boshlab barcha child (bola) komponentlar daraxt shaklida joylashadi. React bu daraxtni render qilib, DOM ga aylantiradi.`
    },
    {
      id: 7,
      question: `Komponentni qachon alohida faylga chiqarish kerak?`,
      options: [
        'Hech qachon — barcha komponentlar App.jsx da bo\'lishi kerak',
        'Faqat 1000+ qator bo\'lganda',
        'Komponent qayta ishlatiladigan, mustaqil yoki mantiqiy jihatdan ajralib tursa',
        'Faqat classlar uchun'
      ],
      correctAnswer: 2,
      explanation: `Quyidagi holatlarda komponentni alohida faylga chiqaring: (1) boshqa joylarda ham ishlatsangiz, (2) mustaqil test qilish kerak bo'lsa, (3) mantiqiy ajratilgan bo'lsa (Navbar, Footer), (4) komponent 30-50+ qatordan oshsa. Bu kodni tartibli va qayta ishlatiladigan qiladi.`
    },
    {
      id: 8,
      question: `Quyidagi import qatorlaridan qaysi biri to'g'ri default import sintaksisi?`,
      options: [
        "import { App } from './App'",
        "import App from './App'",
        "import * App from './App'",
        "require('./App').default"
      ],
      correctAnswer: 1,
      explanation: `\`import App from './App'\` — to'g'ri default import sintaksisi. Figurali qavslar \`{}\` named import uchun ishlatiladi. \`import * as App\` — namespace import (barcha exportlarni birga olish). \`require\` esa CommonJS sintaksisi (Node.js).`
    },
    {
      id: 9,
      question: `"Single Responsibility Principle" (Yagona Mas'uliyat Tamoyili) React komponentlariga qanday tatbiq etiladi?`,
      options: [
        'Har bir komponent faqat bitta CSS class ishlatishi kerak',
        'Har bir komponent faqat bitta ishni (mas\'uliyatni) bajarishi kerak',
        'Har bir komponent faqat bitta props qabul qilishi kerak',
        'Bir faylda faqat bitta komponent bo\'lishi kerak'
      ],
      correctAnswer: 1,
      explanation: `SRP React da: \`Navbar\` — faqat navigatsiya, \`UserCard\` — faqat foydalanuvchi ma'lumotlarini ko'rsatish, \`LoginForm\` — faqat kirish formasi. Agar komponent bir vaqtda API chaqirsa, ro'yxat ko'rsatsa va modal ochsa — uni bo'lish vaqti kelgan.`
    },
    {
      id: 10,
      question: `Quyidagi kodda xato bormi?\n\nconst button = () => {\n  return <button>Click</button>;\n};\nexport default button;`,
      options: [
        'Xato yo\'q — kod to\'g\'ri ishlaydi',
        'Xato bor — komponent nomi kichik harf bilan boshlangan',
        'Xato bor — arrow function komponent bo\'la olmaydi',
        'Xato bor — export default oldin yozilishi kerak'
      ],
      correctAnswer: 1,
      explanation: `Asosiy xato: \`button\` — kichik harf bilan boshlangi. JSX da \`<button />\` ishlatilganda React uni HTML elementi deb qabul qiladi, React komponenti sifatida emas. To'g'ri yozuv: \`const Button = () => {...};\` (katta B).`
    },
    {
      id: 11,
      question: `React da funksional komponent nima qaytarishi shart?`,
      options: [
        'Faqat string',
        'JSX (React elementi), null yoki string/number/array',
        'Faqat HTML string',
        'Albatta object qaytarishi kerak'
      ],
      correctAnswer: 1,
      explanation: `Funksional komponent quyidagilarni qaytarishi mumkin: (1) \`JSX\` — \`<div>...</div>\`, (2) \`null\` — hech narsa ko'rsatmaslik uchun, (3) \`string\` yoki \`number\` — matn, (4) \`array\` — bir necha element. Eng ko'p ishlatiladigan — JSX.`
    },
    {
      id: 12,
      question: `Quyidagi "Feature-based" papka tuzilmasida \`components/common\` papkasi nima uchun mo'ljallangan?`,
      options: [
        'Faqat test fayllar uchun',
        'Backend API chaqiruvlari uchun',
        'Ko\'p joylarda qayta ishlatiladigan umumiy UI komponentlar uchun',
        'Faqat sahifa komponentlari uchun'
      ],
      correctAnswer: 2,
      explanation: `\`components/common/\` (yoki \`components/ui/\`) — bu \`Button\`, \`Input\`, \`Modal\`, \`Card\` kabi ilovaning istalgan joyida qayta ishlatilishi mumkin bo'lgan umumiy komponentlar uchun. \`features/\` papkasi esa bitta funksiyaga tegishli komponentlar uchun (masalan, \`auth/\`, \`products/\`).`
    },
    {
      id: 13,
      question: `\`const Logo = () => <img src="/logo.png" alt="Logo" />;\` — bu qanday komponent sintaksisi?`,
      options: [
        'Class component (Sinf komponent)',
        'Function declaration (Funksiya e\'loni)',
        'Arrow function — implicit return (qisqa qaytarish) bilan',
        'Higher Order Component (Yuqori tartibli komponent)'
      ],
      correctAnswer: 2,
      explanation: `Bu \`arrow function\` — \`implicit return\` (yashirin qaytarish) bilan. \`() => <JSX />\` shaklida yozilganda, figurali qavslar \`{}\` va \`return\` kalit so'zi shart emas — JSX to'g'ridan-to'g'ri qaytariladi. \`() => { return <JSX />; }\` bilan bir xil.`
    },
    {
      id: 14,
      question: `\`import { Button, Input } from './ui';\` — bu qanday import?`,
      options: [
        'Default import — ikki narsa birdan',
        'Named import — aniq nomlar bilan',
        'Namespace import — hamma narsa',
        'Dynamic import — kerak bo\'lganda yuklanadi'
      ],
      correctAnswer: 1,
      explanation: `Figurali qavslar \`{}\` bilan yozilgan import — bu \`Named import\`. Fayldan aniq nomli exportlarni chiqarish uchun ishlatiladi. \`Button\` va \`Input\` o'sha faylda \`export const Button\` yoki \`export { Button }\` shaklida export qilingan bo'lishi kerak.`
    }
  ]
};

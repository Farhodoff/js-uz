export const step3_components = {
  id: 'step3_components',
  title: '3-DARS: Komponentlar (Components)',
  content: `
# 3-Qadam: React Komponentlari (Components) - UI'ni bo'laklarga ajratish

React'ning eng asosiy ustunlaridan biri bu **Komponentlar (Components)** hisoblanadi. Agar siz komponentlarni tushunmasangiz, React'ni tushunmaysiz. Ushbu darsda biz komponentlar nima ekanligi, ularning turlari va qanday qilib to'g'ri arxitektura qurish kerakligini chuqur o'rganamiz.

## 1. UI Modulligi Falsafasi (Lego bloklari analogiyasi)

Tasavvur qiling, sizga juda katta va murakkab kosmik kema qurish vazifasi berildi. Agar siz uni butunlay bitta qolipdan quyib yasamog'chi bo'lsangiz, bitta xato butun kemani yaroqsiz holga keltirishi mumkin. Lekin, agar siz uni kichik, alohida qismlardan (dvigatel, qanotlar, kabina) yig'sangiz, xato chiqqan qismni osongina almashtirishingiz mumkin.

**React komponentlari - bu dasturlash olamidagi Lego bloklaridir.**
Biz butun bir veb-saytni bitta ulkan kod qismi sifatida yozmaymiz. Buning o'rniga, har bir tugma (button), har bir forma (form), har bir rasm (image) uchun alohida kichik "Lego bloklarini" yaratamiz.

### Nega bu kerak? (Why do we need this?)
1. **Qayta foydalanish (Reusability):** Siz bitta chiroyli tugma (button) yaratasiz va uni saytning 10 xil joyida hech qanday kodni nusxalamasdan ishlata olasiz.
2. **Qulay xato izlash (Easier Debugging):** Agar "Savatga qo'shish" tugmasi ishlamasa, siz butun sayt kodini emas, faqat \`AddToCartButton\` komponentini tekshirasiz.
3. **Jamoada ishlash (Teamwork):** Bitta dasturchi \`Header\` (yuqori qism) ustida ishlasa, boshqasi \`Footer\` (pastki qism) ustida bemalol, bir-biriga xalaqit bermasdan ishlashi mumkin.

---

## 2. Mermaid Komponentlar Daraxti Diagrammasi

React ilovasi doimo bitta asosiy (Root) komponentdan boshlanadi, odatda bu \`App\` deb ataladi. Uning ichida boshqa komponentlar shoxlanib ketadi.

\`\`\`mermaid
graph TD
    App((App Component)) --> Header(Header Component)
    App --> Main(Main Content Component)
    App --> Footer(Footer Component)

    Header --> Logo[Logo]
    Header --> Nav[Navigation]

    Main --> Sidebar[Sidebar]
    Main --> PostList[Post List]

    PostList --> PostItem1[Post Item]
    PostList --> PostItem2[Post Item]
    
    Footer --> Copyright[Copyright Info]
    Footer --> SocialLinks[Social Links]
\`\`\`

*Bu daraxt tuzilmasiga e'tibor bering: Ma'lumotlar doimo yuqoridan pastga (App'dan pastdagi komponentlarga) oqadi.*

---

## 3. Class va Functional Komponentlar (Tarix va Nega Functional'ga o'tdik?)

React tarixida komponentlarni yaratishning ikki xil usuli mavjud bo'lgan: **Class Components** va **Functional Components**.

### Class Components (Eski maktab)
Dastlabki yillarda (React 16.8 gacha) komponentda qandaydir holat (state) saqlash yoki "hayot tsikli" (lifecycle) usullaridan foydalanish uchun albatta JS Class'laridan foydalanish kerak edi.

👎 **Yomon (Eskirgan) amaliyot - Class Component:**
\`\`\`jsx
import React, { Component } from 'react';

class OltinSoat extends Component {
  constructor(props) {
    super(props);
    this.state = { vaqt: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ vaqt: new Date() });
  }

  render() {
    return <h1>Hozirgi vaqt: {this.state.vaqt.toLocaleTimeString()}</h1>;
  }
}
\`\`\`
*Muammo nima edi?* 
Class komponentlar juda ko'p "boilerplate" (keraksiz, qayta-qayta yoziladigan) kod talab qilardi. \`this\` kalit so'zi atrofida chalkashliklar ko'p edi. Kodni o'qish va tushunish murakkab edi.

### Functional Components + Hooks (Yangi standart)
React 16.8 da **Hooks** (Ilmoqlar) kiritilgach, biz oddiy JavaScript funktsiyalari yordamida ham Class komponentlar qila oladigan barcha ishlarni (state, lifecycle) qila oladigan bo'ldik.

👍 **Zo'r (Zamonaviy) amaliyot - Functional Component:**
\`\`\`jsx
import React, { useState, useEffect } from 'react';

const OltinSoat = () => {
  const [vaqt, setVaqt] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setVaqt(new Date()), 1000);
    return () => clearInterval(timerID); // Tozalash
  }, []);

  return <h1>Hozirgi vaqt: {vaqt.toLocaleTimeString()}</h1>;
};

export default OltinSoat;
\`\`\`
### Nega biz Functional Komponentlarga o'tdik?
1. **Soddalik:** Kod sezilarli darajada qisqardi va o'qish osonlashdi. \`this\` bilan bog'liq muammolar yo'qoldi.
2. **Kodni qayta ishlatish (Custom Hooks):** Mantiqni (logic) boshqa komponentlar bilan bo'lishish Hooks yordamida juda osonlashdi.
3. **Ishlash tezligi (Performance):** Funktsiyalar sinflarga (classes) qaraganda biroz yengilroq ishlaydi va React kelajakda ularni optimallashtirishi osonroq.

---

## 4. Dumb (Aqlsiz) vs Smart (Aqlli) Komponentlar Arxitekturasi

React'da katta ilovalar qurishda kodingizni toza saqlash uchun "Presentational vs Container" (yoki Dumb vs Smart) komponentlar arxitekturasidan foydalaniladi.

### Smart (Container / Aqlli) Komponentlar
Bu komponentlar ilovaning "miyasi" hisoblanadi. Ular qanday ishlashini bilishadi.
- Ma'lumotlarni serverdan olib keladi (API calls).
- Holatni (state) boshqaradi.
- Mantiqni va funksiyalarni o'zida saqlaydi.
- Tashqi ko'rinishga (CSS) unchalik ahamiyat bermaydi.

### Dumb (Presentational / Aqlsiz) Komponentlar
Bu komponentlar ilovaning "yuzi" hisoblanadi. Ular faqatgina o'ziga berilgan ma'lumotni ekranga chiroyli qilib chiqarishni biladi.
- Hech qanday murakkab mantiq (state, API fetch) bo'lmaydi.
- Ma'lumotlarni faqat **props** orqali oladi.
- Qayta foydalanish uchun juda mos keladi.

#### Do's and Don'ts (Yaxshi va yomon yondashuvlar)

👎 **Yomon: Hamma narsani bitta joyga tiqish (Spaghetti code)**
\`\`\`jsx
// Bitta komponent ham API chaqiradi, ham dizaynni chizadi
const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user/1').then(res => res.json()).then(setUser);
  }, []);

  if (!user) return <p>Yuklanmoqda...</p>;

  // Dizayn ham shu yerda! Qayta ishlata olmaymiz.
  return (
    <div className="card shadow-lg p-4 rounded-xl">
      <img src={user.avatar} className="w-24 h-24 rounded-full" />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <button className="bg-blue-500 text-white px-4 py-2">Follow</button>
    </div>
  );
};
\`\`\`

👍 **Yaxshi: Smart va Dumb ga ajratish**

**1. Dumb Component (Aqlsiz, faqat ko'rinish):**
\`\`\`jsx
// UserCard.jsx - Faqat Props oladi va chizadi. Boshqa joyda ham ishlatsak bo'ladi!
export const UserCard = ({ name, avatar, onFollow }) => {
  return (
    <div className="card shadow-lg p-4 rounded-xl">
      <img src={avatar} alt={name} className="w-24 h-24 rounded-full" />
      <h2 className="text-xl font-bold">{name}</h2>
      <button onClick={onFollow} className="bg-blue-500 text-white px-4 py-2">
        Follow
      </button>
    </div>
  );
};
\`\`\`

**2. Smart Component (Aqlli, mantiq):**
\`\`\`jsx
// UserProfileContainer.jsx - Mantiqni hal qiladi, ma'lumot olib keladi.
import { UserCard } from './UserCard';

const UserProfileContainer = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user/1').then(res => res.json()).then(setUser);
  }, []);

  const handleFollow = () => {
    console.log("Foydalanuvchiga obuna bo'lindi: ", user.name);
    // API ga jo'natish mantiqi...
  };

  if (!user) return <p>Yuklanmoqda...</p>;

  return <UserCard name={user.name} avatar={user.avatar} onFollow={handleFollow} />;
};
\`\`\`

---

## 5. Export va Import Qoidalari (Modullarni ulash)

Komponentlarni alohida fayllarga ajratganimizdan so'ng, ularni bir-biriga ulashimiz kerak. JavaScript'da (va React'da) buni **ES6 Modules** (\`import\` va \`export\`) yordamida qilamiz. Asosan ikki xil export usuli bor: **Default** va **Named**.

### Default Export (Asosiy eksport)
Har bir faylda faqat **bitta** default eksport bo'lishi mumkin. Odatda bitta faylda bitta katta komponent yozilsa, shundan foydalaniladi.

\`\`\`jsx
// tugma.jsx fayli
const Button = () => {
  return <button>Meni bos</button>;
};

export default Button; 
\`\`\`

**Qanday import qilinadi?**
Nomini xohlagancha o'zgartirib chaqirib olishingiz mumkin (chunki u faylning yagona asosiy eksporti).
\`\`\`jsx
import MeningTugmam from './tugma'; // Hech qanday jingalak qavslarsiz!
\`\`\`

### Named Export (Nomlangan eksport)
Bitta fayldan bir nechta o'zgaruvchi, funksiya yoki komponentlarni eksport qilish uchun ishlatiladi.

\`\`\`jsx
// utils.jsx fayli
export const qoShish = (a, b) => a + b;
export const ayirish = (a, b) => a - b;
export const PI = 3.14;
\`\`\`

**Qanday import qilinadi?**
Aynan o'sha nom bilan, **jingalak qavslar \`{}\`** ichida import qilinishi **shart**.
\`\`\`jsx
import { qoShish, PI } from './utils';
\`\`\`

### Qaysi birini qachon ishlatamiz?
- **Komponentlar uchun:** Ko'pchilik dasturchilar har bir komponentni alohida faylda yaratib, **Default Export** qilishni ma'qul ko'rishadi (masalan: \`Header.jsx\` dan default export \`Header\`). Lekin so'nggi paytlarda katta jamoalarda nomlar chalkashib ketmasligi uchun **Named Export** (faqat jingalak qavs bilan olinadigan) usuli ham juda mashhur bo'lib bormoqda.
- **Yordamchi funksiyalar (utils, constants):** Har doim **Named Export** ishlating.

> **💡 Oltin Maslahat:** Ilovangizda standart yarating! Yoki hamma komponentlar uchun "Default export" ishlating, yoki hammaga "Named export". Ikkalasini aralashtirib yuborish jamoa a'zolarini chalg'itishi mumkin.

---
## Xulosa
React'ning qudrati uning komponentli yondashuvidadir. Katta muammolarni (katta veb-saytlarni) mayda, boshqarish oson bo'lgan bo'laklarga (komponentlarga) ajratish orqali biz toza, qayta ishlatiladigan va xatosiz kod yozishga erishamiz. Keyingi darsda ushbu Lego bloklarini bir-biriga qanday qilib "Props" orqali bog'lashni o'rganamiz!

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

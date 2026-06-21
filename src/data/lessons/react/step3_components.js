export const step3_components = {
  title: "3-DARS: Komponentlar",
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

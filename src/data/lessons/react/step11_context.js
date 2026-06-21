export const step11_context = {
  title: "11-DARS: Holatni boshqarish (Context API)",
  content: `
# 11-Qadam: Context API va "Prop Drilling" Muammosi

React-da ma'lumotlar doimo yuqoridan pastga (ota komponentdan bola komponentga) \`props\` orqali uzatiladi. Kichik loyihalarda bu ajoyib ishlaydi. Ammo ilovangiz kattalashib, komponentlar daraxti chuqurlashib ketganda-chi? Bitta ma'lumotni daraxtning eng yuqorisidan eng pastiga uzatish kerak bo'lsa nima qilasiz? 

Aynan shu yerda biz React'ning eng muhim va qiziqarli konsepsiyalaridan biri — **Context API** bilan tanishamiz. Ammo yechimga o'tishdan oldin, keling kasallikning o'zi bilan tanishaylik.

---

## "Prop Drilling" O'zi Nima Va Nega U Bosh Og'rig'i?

Tasavvur qiling, siz bobosiz va sizning nevarangizga qoldirmoqchi bo'lgan muhim soatingiz (ma'lumot/state) bor. Ammo nevarangiz bilan to'g'ridan-to'g'ri ko'risha olmaysiz. Siz soatni o'g'lingizga berasiz, u o'zining xotiniga (keliningizga) beradi, keliningiz esa uni maktabga ketayotgan nevarangizning sumkasiga solib qo'yadi. O'rtadagi odamlarning (o'g'lingiz va keliningizning) bu soatga umuman qizig'i yo'q, lekin ular "pochtalyon" vazifasini bajarishga majbur. 

React-da aynan shu jarayon **Prop Drilling** (Prop burg'ulash) deb ataladi. Ma'lumot (prop) faqatgina eng pastki komponentga kerak bo'lsa-da, uni yetkazib berish uchun o'rtadagi barcha komponentlar orqali o'tkazib kelishga to'g'ri keladi.

### Prop Drilling Kod Misoli (Bad Practice - Yomon yondashuv)

\`\`\`jsx
// ❌ YOMON: Prop Drilling (Prop burg'ulash)
const App = () => {
  // 'theme' nomli holatni (state) yaratamiz, boshlang'ich qiymati 'dark'
  const [theme, setTheme] = useState('dark');
  
  return <Header theme={theme} />;
}

// Header'ga theme kerak emas, u faqat NavBar'ga uzatadi
const Header = ({ theme }) => {
  return <NavBar theme={theme} />;
}

// NavBar'ga ham theme kerak emas, u Menu'ga uzatadi
const NavBar = ({ theme }) => {
  return <Menu theme={theme} />;
}

// Va nihoyat Menu bu theme'dan foydalanadi!
const Menu = ({ theme }) => {
  // 'theme' prop orqali tugma rangini (class'ini) belgilaymiz
  return <button className={theme}>Menyu</button>;
}
\`\`\`

Bu holat kodni o'qishni qiyinlashtiradi, refactoring (kodni tozalash va o'zgartirish) qilishni azobga aylantiradi. O'rtadagi komponentlar o'ziga kerak bo'lmagan props'larni qabul qilib, o'z bolalariga uzatishi — antpattern hisoblanadi.

> 💡 **Roast qilinadigan haqiqat:**
> Prop Drilling — bu "Bobomning bobosidan meros" qolgandek gap. 5 qavat pastdagi komponentga bitta ismni uzatish uchun yo'ldagi 4 ta mutlaqo aloqasi yo'q komponentlarga ham shu prop'ni yuklab o'tish... bu xuddi qo'shniga tuz berish uchun butun qishloq orqali qo'lma-qo'l qilishdek gap! Yaxshiyamki, React bizga qutqaruvchi yechimlarni taqdim etgan.

---

## Context API: Muammoning Oqlangan Yechimi

**Context API** bu — React'da ma'lumotlarni komponentlar daraxtining istalgan chuqurligiga, o'rtadagi komponentlarni bezovta qilmasdan to'g'ridan-to'g'ri uzatish usuli. 

💡 **Real-world Analogi:** Tasavvur qiling, "Context" bu — global radio stansiyasi. Radio stansiya ma'lumotni havoga uzatadi (Broadcast qiladi). Endi bu ma'lumotni eshitish uchun uni bir odamdan ikkinchi odamga aytib berish (prop drilling) shart emas. Kimning radiopriyomnigi bo'lsa va to'g'ri to'lqinga to'g'rilasa (Context Consumer / useContext), o'sha odam ma'lumotni to'g'ridan-to'g'ri qabul qilaveradi!

---

## Vizual Taqqoslash: Prop Drilling vs Context API

Keling, buni Mermaid diagrammasi orqali vizual ko'rib chiqamiz:

\`\`\`mermaid
graph TD
    subgraph Prop Drilling
        A1[App<br/>theme='dark'] -->|theme| B1[Header]
        B1 -->|theme| C1[NavBar]
        C1 -->|theme| D1[Menu]
        D1 -->|theme| E1[Button<br/>Ishlatadi!]
        
        style A1 fill:#ff9999,stroke:#333,stroke-width:2px
        style B1 fill:#ffcccc,stroke:#333,stroke-width:1px
        style C1 fill:#ffcccc,stroke:#333,stroke-width:1px
        style D1 fill:#ffcccc,stroke:#333,stroke-width:1px
        style E1 fill:#ff9999,stroke:#333,stroke-width:2px
    end

    subgraph Context API
        A2[App + ThemeProvider<br/>theme='dark'] --> B2[Header]
        B2 --> C2[NavBar]
        C2 --> D2[Menu]
        D2 --> E2[Button<br/>useContext]
        
        A2 -.->|To'g'ridan-to'g'ri uzatish| E2
        
        style A2 fill:#99ccff,stroke:#333,stroke-width:2px
        style B2 fill:#f9f9f9,stroke:#333,stroke-dasharray: 5 5
        style C2 fill:#f9f9f9,stroke:#333,stroke-dasharray: 5 5
        style D2 fill:#f9f9f9,stroke:#333,stroke-dasharray: 5 5
        style E2 fill:#99ccff,stroke:#333,stroke-width:2px
    end
\`\`\`

Chap tomonda ko'rib turganingizdek, ma'lumot barcha qatlamlardan o'tishi shart. O'ng tomonda esa faqat qabul qiluvchi (Button) bevosita ma'lumot manbai bilan bog'lanmoqda. O'rtadagi komponentlar umuman xabarsiz va toza holatda qoladi.

---

## Qanday qilib Context yaratamiz va ishlatamiz?

Context bilan ishlash asosan **3 ta muhim qadam**dan iborat:
1. **Create** (Yaratish)
2. **Provide** (Yetkazib berish)
3. **Consume** (Qabul qilish / Iste'mol qilish)

### 1. Context Yaratish (\`createContext\`)

Birinchi navbatda alohida faylda (yoki komponentning tashqarisida) o'zimizning radio stansiyamizni yaratib olamiz.

\`\`\`jsx
import { createContext } from 'react';

// 1. Context yaratamiz. Boshlang'ich qiymat sifatida 'light' ni berishimiz ham mumkin.
// 'ThemeContext' boshqa fayllarda ishlatilishi uchun eksport qilinadi.
export const ThemeContext = createContext('light');
\`\`\`

### 2. Context Yetkazib berish (\`Provider\`)

Endi ma'lumotlarni "efirga" uzatuvchi minora — **Provider** ni o'rnatamiz. U barcha farzand komponentlarni o'rab turishi kerak.

\`\`\`jsx
import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import NavBar from './NavBar';

const App = () => {
  // Mavzuni saqlash uchun 'theme' holatini yaratamiz, default qiymati 'dark'
  const [theme, setTheme] = useState('dark');

  // Mavzuni o'zgartiruvchi funksiya
  // Oldingi mavzu holatiga qarab (prevTheme), uni almashtiradi
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    // 2. Provider orqali ma'lumotni uzatamiz. 
    // "value" propiga { theme, toggleTheme } obyektini beramiz, shunda 
    // Provider ichidagi har qanday komponent bu qiymatlardan foydalana oladi.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={\`app-container \${theme}\`}>
        <NavBar />
        {/* Boshqa komponentlar... */}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
\`\`\`

### 3. Context'ni qabul qilib olish (\`useContext\`)

Endi eng qiziq joyi! \`NavBar\` ichidagi chuqur joylashgan qaysidir komponentda (masalan, \`ThemeToggleButton\` da) bu ma'lumotni olamiz.

\`\`\`jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeToggleButton = () => {
  // 3. useContext Hook'i orqali ThemeContext dagi ma'lumotlarni (value) olamiz.
  // Bu yerda o'rtadagi komponentlarga ehtiyoj yo'q, to'g'ridan-to'g'ri o'qiymiz!
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // Tugma bosilganda 'toggleTheme' funksiyasi ishga tushadi
    <button 
      onClick={toggleTheme}
      style={{
        // Joriy 'theme' ga qarab tugmaning foni va yozuv rangini dinamik o'zgartiramiz
        backgroundColor: theme === 'dark' ? '#333' : '#FFF',
        color: theme === 'dark' ? '#FFF' : '#333'
      }}
    >
      Hozirgi mavzu: {theme}. O'zgartirish!
    </button>
  );
};

export default ThemeToggleButton;
\`\`\`

✅ **Qarabsizki**, o'rtadagi hech qaysi komponent \`theme\` nimaligini bilishiga hojat qolmadi. Biz ma'lumotni to'g'ridan-to'g'ri kerakli joyda o'qib oldik!

---

## Nega Kerak? (Amaliy foydalari)

Context API odatda butun ilova bo'ylab (Global) yoki ma'lum bir katta bo'lim bo'ylab mavjud bo'lishi kerak bo'lgan ma'lumotlar uchun ishlatiladi:

1. **Theme / UI State:** Yorug'/qorong'u mavzular (Dark/Light mode).
2. **Autentifikatsiya (Auth):** Hozir tizimda qaysi foydalanuvchi tizimga kirganligi (\`user\` obyekti), tokenni saqlash.
3. **Lokalizatsiya (Til):** Ilovaning qaysi tilda ishlayotganligini barcha matnli komponentlarga yetkazish (O'zbek, Ingliz, Rus).
4. **Router xususiyatlari:** Masalan, React Router ham aynan Context API asosida qurilgan bo'lib, sizga qaysi sahifada ekanligingizni \`useLocation\` kabi hook'lar orqali yetkazadi.

---

## ⚠️ Qachon Context'dan FOYDALANMASLIK kerak?

Garchi Context ajoyib vosita bo'lsa-da, u "Kumush o'q" (barcha muammolarga yechim) emas. Uni noto'g'ri ishlatish loyihangizni sekinlashtirib, unumdorlik (performance) qotiliga aylanishi mumkin.

### 1. Katta va tez o'zgaruvchi holatlar (State'lar) uchun EMAS
Context'ning eng katta kamchiligi — **Re-renders (Qayta chizish)**. 
Context'ning \`value\` qismiga berilgan ma'lumot o'zgarganda, ushbu context'ni \`useContext\` orqali eshitib turgan **BARCHA** komponentlar majburiy tarzda qayta render bo'ladi. Hatto obyektning kichkina bir xususiyati o'zgarsa ham!

\`\`\`jsx
// ❌ YOMON: Tez o'zgaruvchi ma'lumotlarni bitta katta Context'ga yig'ish.
// Agar 'mousePositionX' doim o'zgarsa, GlobalContext dan 
// foydalanayotgan barcha komponentlar majburan qayta-qayta render bo'laveradi.
<GlobalContext.Provider value={{ theme, user, mousePositionX, searchInputValue }}>
   <App />
</GlobalContext.Provider>
\`\`\`
Agar \`mousePositionX\` har millisoniyada o'zgarsa, faqat \`theme\`ni o'qiyotgan komponent ham qayta-qayta render bo'laveradi. 
**Yechim:** Bunday holatlar uchun Context'larni mantiqan ajratish kerak (\`ThemeContext\`, \`AuthContext\`) yoki \`Redux\`, \`Zustand\` kabi state menejerlardan foydalanish kerak.

### 2. Har bir komponent uchun Context ochish shart emas
Agar ma'lumot faqat 1-2 qatlam pastga ketayotgan bo'lsa, **Prop Drilling unchalik yomon narsa emas**. Bu aslida React'ning tabiiy va eng barqaror ishlash mexanizmi. Context kodni biroz murakkablashtiradi va komponentlaringizni aynan shu Context'ga qaram qilib qo'yadi (qayta ishlatishni - reusability'ni qiyinlashtiradi).

### Do's and Don'ts (Yaxshi va Yomon yondashuvlar)

| 🟢 Yaxshi (Do) | 🔴 Yomon (Don't) |
|---|---|
| Context'ni faqat global, kam o'zgaradigan ma'lumotlar uchun ishlatish (Auth, Theme) | Har soniyada o'zgaradigan animatsiya yoki input qiymatlarini Context'da saqlash |
| Mantiq jihatdan alohida ma'lumotlar uchun alohida Context'lar ochish (\`AuthContext\`, \`ThemeContext\`) | Butun ilovaning barcha state'larini bitta ulkan \`AppContext\` ga tiqib tashlash |
| Componentlarni iloji boricha props yordamida izolyatsiya qilish | Komponentni shunchaki bitta prop uzatishdan qochib, to'g'ridan-to'g'ri Context'ga bog'lab qo'yish |

---

## Xulosa

1. **Prop Drilling** — ma'lumotni komponentlar daraxti orqali ko'p marotaba, o'rtadagi keraksiz bosqichlar orqali pastga uzatish azobi.
2. **Context API** — bu muammoni hal qiluvchi, ma'lumotlarni "havo orqali" (to'g'ridan-to'g'ri) kerakli komponentga yetkazish mexanizmi.
3. Uni ishlatish uchun: \`createContext\` (yaratamiz), \`Provider\` (qamrab olamiz va uzatamiz), \`useContext\` (o'qib olamiz).
4. **Ogohlantirish:** Context ishlashi tez-tez o'zgaradigan murakkab state'lar uchun mo'ljallanmagan. U global sozlamalar, mavzular va foydalanuvchi ma'lumotlari kabi sekin o'zgaruvchi ma'lumotlar uchundir.

Katta loyihalarda Context API — Redux kabi katta kutubxonalarni o'rnatmasdan turib, state'ni global boshqarishning ajoyib va native (tug'ma) yechimidir. Undan to'g'ri maqsadlarda, joyida foydalaning!


---

## 🎤 Intervyu Savollari

**1. Context API nima va qachon kerak?**
*Javob:* Context API — global ma'lumotlarni (foydalanuvchi, til, tema) barcha komponentlarga props drilling siz uzatish imkonini beradi. createContext(), Provider, useContext() uchligidan iborat. Ko'p qatlamdagi prop drilling muammosini hal qiladi.

**2. Context va Props ning farqi?**
*Javob:* Props — faqat bir qatlam pastga uzatiladi (ota → bevosita bola). Context — Provider ichidagi har qanday chuqurlikdagi komponent subscribe bo'lishi mumkin, o'rta qatlamlardan o'tmasdan.

**3. Context ning kamchiliklari?**
*Javob:* Context qiymati o'zgarganda, unga subscribe bo'lgan barcha komponentlar qayta render bo'ladi — bu unumdorlik muammosi. Shuning uchun: (1) Tez-tez o'zgaradigan ma'lumotlar uchun Redux/Zustand yaxshiroq, (2) Kontekstni kichik, mavzuga bo'lingan qilib yarating.

**4. useContext hook qanday ishlatiladi?**
*Javob:* \`const qiymat = useContext(MenimContext)\`. Bu hook qiymati Provider dan keladi. Komponent Provider dan tashqarida bo'lsa, createContext ga berilgan default qiymat qaytariladi.

`,
  code: `import React, { useState, createContext, useContext } from "react";

// 1. Wi-Fi (Context) yaratamiz
// Context obyektlarini yaratish. Ularning ichiga ma'lumot joylab, keyin boshqa joyda o'qib olamiz.
const ThemeContext = createContext();
const LanguageContext = createContext();

export default function ContextDemo() {
  // Asosiy ota komponentda holatlar (states) saqlanmoqda
  const [theme, setTheme] = useState("light"); // Mavzu: light yoki dark
  const [lang, setLang] = useState("uz");      // Til: uz yoki en

  // 2. Butun ilovani Providerlar bilan o'raymiz
  // Ularning ichiga value propini beramiz
  return (
    // ThemeContext orqali 'theme' holati va uni o'zgartiruvchi 'setTheme' ni uzatamiz
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* LanguageContext orqali 'lang' va 'setLang' ni uzatamiz */}
      <LanguageContext.Provider value={{ lang, setLang }}>
        <div style={{ padding: 20, border: "2px dashed #3498db" }}>
          <h2>Asosiy App (Ota komponent)</h2>
          <p>Ota komponentda holat saqlanmoqda. Lekin biz uni quyidagi bolalarga props sifatida EMAS, balki Context orqali yuboramiz.</p>
          
          <hr />
          
          {/* O'rtadagi Hech Nima Qilmaydigan Komponent */}
          {/* Biz unga hech qanday props (theme, lang) bermayapmiz! */}
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
  // 'useContext' huki yordamida Provider bergan 'value' ni qabul qilib olamiz.
  const { theme, setTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LanguageContext);

  // Tema ranglari
  // Joriy mavzuga qarab orqa fon va matn rangini belgilaymiz
  const background = theme === "dark" ? "#2c3e50" : "#ecf0f1";
  const color = theme === "dark" ? "#ecf0f1" : "#2c3e50";

  // Tilga qarab so'zlar
  // Joriy tilga mos matnni tanlaymiz
  const greeting = lang === "uz" ? "Salom! Men eng ichki komponentman." : "Hello! I am the innermost component.";

  return (
    <div style={{ padding: 20, background, color, borderRadius: 8, transition: "0.3s" }}>
      <h4>Target Komponent (Eng ichkarida)</h4>
      <h2>{greeting}</h2>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        {/* Tilni o'zgartirish tugmasi */}
        {/* Tugma bosilganda 'setLang' funksiyasi chaqirilib, tilni teskarisiga o'zgartiradi */}
        <button onClick={() => setLang(lang === "uz" ? "en" : "uz")}>
          {lang === "uz" ? "🇺🇸 English" : "🇺🇿 O'zbekcha"}
        </button>

        {/* Mavzuni o'zgartirish tugmasi */}
        {/* Tugma bosilganda 'setTheme' funksiyasi chaqirilib, mavzuni teskarisiga o'zgartiradi */}
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
      title: "Context yaratish",
      instruction: "React dagi `createContext` funksiyasidan foydalanib `UserContext` nomli yangi context yarating va uni export qiling. Boshlang'ich qiymati sifatida `null` bering.",
      startingCode: "import React, { createContext } from 'react';\n\n// Shu yerda UserContext ni yarating va export qiling\n\n",
      hint: "export const UserContext = createContext(null); yozing",
      test: "if (!code.includes('createContext(null)') || !code.includes('export const UserContext')) return 'UserContext ni to\\'g\\'ri yaratib export qiling.'; return null;"
    },
    {
      id: 2,
      title: "Provider orqali ma'lumot uzatish",
      instruction: "`UserContext.Provider` dan foydalanib `App` komponentini ichidagi barcha komponentlarga `\"Ali\"` ismini uzating.",
      startingCode: "import React, { createContext } from 'react';\n\nexport const UserContext = createContext();\n\nexport default function App() {\n  return (\n    // Provider bilan o'rab, value sifatida \"Ali\" ni bering\n    <div>\n      <h1>Asosiy ilova</h1>\n    </div>\n  );\n}",
      hint: "<UserContext.Provider value=\"Ali\">... yozing.",
      test: "if (!code.includes('<UserContext.Provider') || !code.includes('value=\"Ali\"')) return 'UserContext.Provider orqali \"Ali\" qiymatini uzating.'; return null;"
    },
    {
      id: 3,
      title: "Context'dan ma'lumot o'qish",
      instruction: "`useContext` hukidan foydalanib, `ThemeContext` dan hozirgi mavzuni o'qib oling va uni p tegida ko'rsating.",
      startingCode: "import React, { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext('dark');\n\nfunction ThemeDisplay() {\n  // Shu yerda useContext yordamida theme ni o'qib oling\n  \n  return <p>Joriy mavzu: {/* theme ni ko'rsating */}</p>;\n}\n\nexport default function App() {\n  return <ThemeDisplay />;\n}",
      hint: "const theme = useContext(ThemeContext); qilib olib {theme} ni HTML da chiqaring.",
      test: "if (!code.includes('useContext(ThemeContext)')) return 'ThemeContext dan o\\'qish uchun useContext ishlating.'; return null;"
    },
    {
      id: 4,
      title: "Obyektni Context orqali uzatish",
      instruction: "`AuthContext` ga `{ isAuthenticated: true, user: \"Hasan\" }` obyekti uzatilmoqda. `Dashboard` komponentida o'sha obyektning `user` xossasini o'qib ekranga chiqaring.",
      startingCode: "import React, { createContext, useContext } from 'react';\n\nconst AuthContext = createContext();\n\nfunction Dashboard() {\n  // Context dan obyektni o'qib, 'user' xossasini oling\n  \n  return <h2>Xush kelibsiz, {/* user */}</h2>;\n}\n\nexport default function App() {\n  return (\n    <AuthContext.Provider value={{ isAuthenticated: true, user: 'Hasan' }}>\n      <Dashboard />\n    </AuthContext.Provider>\n  );\n}",
      hint: "const { user } = useContext(AuthContext); tarzida ishlatish mumkin.",
      test: "if (!code.includes('useContext(AuthContext)') || !code.match(/\\buser\\b/)) return 'AuthContext dan user ni to\\'g\\'ri o\\'qib oling.'; return null;"
    },
    {
      id: 5,
      title: "Context'da holatni o'zgartirish funksiyasi",
      instruction: "Ota komponent `count` va `setCount` ni Context orqali bergan. `CounterButton` ichida Context ni o'qib, tugma bosilganda sanog'ni oshiring.",
      startingCode: "import React, { useState, createContext, useContext } from 'react';\n\nconst CountContext = createContext();\n\nfunction CounterButton() {\n  // Context dan count va setCount ni oling\n  \n  return (\n    <button onClick={() => { /* setCount orqali oshiring */ }}>\n      Sanoq: {/* count ko'rsating */}\n    </button>\n  );\n}\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <CountContext.Provider value={{ count, setCount }}>\n      <CounterButton />\n    </CountContext.Provider>\n  );\n}",
      hint: "const { count, setCount } = useContext(CountContext); yozib, onClick={() => setCount(count + 1)} qiling.",
      test: "if (!code.includes('useContext(CountContext)') || !code.includes('setCount(')) return 'setCount yordamida sanog\\'ni oshirish funksiyasini yozing.'; return null;"
    },
    {
      id: 6,
      title: "Bir nechta Context bilan ishlash",
      instruction: "Sizda `ThemeContext` va `UserContext` bor. `Profile` komponenti ichida ikkalasidan ham ma'lumot o'qib, `h1` ga foydalanuvchi ismini, `p` ga mavzuni chiqaring.",
      startingCode: "import React, { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext('light');\nconst UserContext = createContext('Dildora');\n\nfunction Profile() {\n  // Ikkala Context dan qiymat oling\n  \n  return (\n    <div>\n      <h1>Foydalanuvchi: {/* Ism */}</h1>\n      <p>Mavzu: {/* Mavzu */}</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <UserContext.Provider value=\"Zuhra\">\n        <Profile />\n      </UserContext.Provider>\n    </ThemeContext.Provider>\n  );\n}",
      hint: "useContext ni ikki marta chaqiring: biri ThemeContext, ikkinchisi UserContext uchun.",
      test: "if (!code.includes('useContext(ThemeContext)') || !code.includes('useContext(UserContext)')) return 'Ikkala Context dan ham ma\\'lumot o\\'qib olishingiz kerak.'; return null;"
    },
    {
      id: 7,
      title: "Custom Hook yaratish",
      instruction: "`useContext(ThemeContext)` ni har gal yozishdan ko'ra, qulayroq bo'lishi uchun `useTheme` nomli custom hook yarating va u `ThemeContext` qiymatini qaytarsin.",
      startingCode: "import React, { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext('light');\n\n// Shu yerda useTheme custom hookini yarating\nexport function useTheme() {\n  \n}\n\nfunction Button() {\n  const theme = useTheme();\n  return <button>Joriy mavzu: {theme}</button>;\n}\n\nexport default function App() {\n  return <Button />;\n}",
      hint: "export function useTheme() { return useContext(ThemeContext); }",
      test: "if (!code.includes('return useContext(ThemeContext)')) return 'useTheme hoki useContext ni qaytarishi kerak.'; return null;"
    },
    {
      id: 8,
      title: "Xatolikni oldini olish",
      instruction: "`useTheme` hukini ishlatganda, komponent albatta `ThemeProvider` ichida bo'lishiga ishonch hosil qilish uchun shart qo'ying. Agar `context` qiymati `undefined` bo'lsa, xato tashlang (`throw new Error(\"ThemeProvider kerak\")`).",
      startingCode: "import React, { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext(undefined);\n\nexport function useTheme() {\n  const context = useContext(ThemeContext);\n  // Agar context undefined bo'lsa Error tashlang\n  \n  return context;\n}\n\nexport default function App() {\n  return <div>Custom Hook Test</div>;\n}",
      hint: "if (context === undefined) { throw new Error('ThemeProvider kerak'); } yozing.",
      test: "if (!code.includes('throw new Error')) return 'Context undefined bo\\'lgan holatda Error tashlash kerak.'; return null;"
    },
    {
      id: 9,
      title: "Context ga odatiy (default) qiymat bering",
      instruction: "`LangContext` yaratishda unga default qiymat sifatida `'uz'` ni bering. Shunda Provider ishlatilmasa ham `useContext` `'uz'` qiymatini oladi.",
      startingCode: "import React, { createContext, useContext } from 'react';\n\n// Shu yerda LangContext ga default qiymat 'uz' ni bering\nconst LangContext = createContext();\n\nfunction Text() {\n  const lang = useContext(LangContext);\n  return <p>{lang}</p>;\n}\n\nexport default function App() {\n  // Provider yo'q, shuning uchun default qiymat ko'rinadi\n  return <Text />;\n}",
      hint: "createContext('uz') qilib bering.",
      test: "if (!code.includes(\"createContext('uz')\") && !code.includes('createContext(\"uz\")')) return 'createContext ga default qiymat sifatida \\'uz\\' bering.'; return null;"
    },
    {
      id: 10,
      title: "Provider va State uyg'unligi",
      instruction: "Kodni to'ldiring: `App` ichida `user` obyektini state da saqlang va uni `UserContext.Provider` orqali uzating. Keyin tugma bosilganda ismni o'zgartiruvchi `changeName` funksiyasini ham context ga qo'shib bering.",
      startingCode: "import React, { useState, createContext, useContext } from 'react';\n\nconst UserContext = createContext();\n\nexport default function App() {\n  const [user, setUser] = useState({ name: 'Ali' });\n\n  const changeName = () => setUser({ name: 'Vali' });\n\n  return (\n    // Provider orqali { user, changeName } ni yuboring\n    <UserContext.Provider>\n      <Profile />\n    </UserContext.Provider>\n  );\n}\n\nfunction Profile() {\n  const { user, changeName } = useContext(UserContext);\n  return (\n    <h1 onClick={changeName}>{user.name}</h1>\n  );\n}",
      hint: "<UserContext.Provider value={{ user, changeName }}> yozing.",
      test: "if (!code.includes('value={{') || !code.includes('user') || !code.includes('changeName')) return 'value sifatida user va changeName ni uzatishingiz kerak.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Prop Drilling nima o'zi?",
      options: [
        "Ota komponentdan bolaga ma'lumotni to'g'ridan-to'g'ri berish",
        "Ma'lumotni uzoqdagi komponentga yetkazish uchun o'rtadagi barcha qavatlardan props orqali o'tkazish holati",
        "React komponentlarini optimallashtirish texnikasi",
        "Props'lar ichiga funksiya joylashtirish"
      ],
      correctAnswer: 1,
      explanation: "Prop drilling (burmalash) — bu ma'lumotni zanjirdek bir necha qavat keraksiz komponentlar orqali uzatish muammosi. Buni Context API yoki Redux yordamida hal qilish mumkin."
    },
    {
      question: "React Context API qachon ishlatiladi?",
      options: [
        "Har qanday holatni, hattoki oddiy sanog'ni (counter) saqlash uchun ham har doim ishlatiladi",
        "Faqatgina tashqi API'larga so'rov yuborish uchun",
        "Komponentlarni ekranga tezroq chizish (render qilish) uchun",
        "Global yoki ko'plab komponentlarga umumiy kerak bo'lgan ma'lumotlarni prop drilling'siz uzatish uchun"
      ],
      correctAnswer: 3,
      explanation: "Context API mavzu (theme), til sozlamalari, foydalanuvchi profili kabi loyihadagi ko'plab komponentlar o'qishi kerak bo'lgan global ma'lumotlar uchun mos vositadir."
    },
    {
      question: "Context yaratish uchun qaysi React funksiyasidan foydalaniladi?",
      options: [
        "useContext()",
        "Provider()",
        "createContext()",
        "React.memo()"
      ],
      correctAnswer: 2,
      explanation: "Context yaratish uchun `createContext()` funksiyasi ishlatiladi. Undan Provider va Consumer ob'ektlari olinadi."
    },
    {
      question: "Yaratilgan Context'dan ma'lumotni tarqatish uchun nima ishlatiladi?",
      options: [
        "Context.Provider komponenti va uning 'value' xossasi",
        "Context.Consumer va uning 'props' xossasi",
        "Ota komponentning 'state' yordamida",
        "Context.Send yordamida"
      ],
      correctAnswer: 0,
      explanation: "Ma'lumot tarqatish (taqdim etish) uchun `<MyContext.Provider value={...}>` ishlatiladi."
    },
    {
      question: "Bola komponent ichida Context dagi ma'lumotni o'qib olish qanday amalga oshiriladi?",
      options: [
        "useReducer(Context) yordamida",
        "useContext() hukiga yaratilgan Context'ni argument sifatida berish orqali",
        "useProps() huki yordamida",
        "useState(Context) orqali"
      ],
      correctAnswer: 1,
      explanation: "To'g'ridan-to'g'ri qiymatni o'qish uchun eng oson yo'l `useContext(MyContext)` huki hisoblanadi."
    },
    {
      question: "Agar Context Provider bilan o'ralmagan komponent useContext yordamida o'qishga harakat qilsa nima bo'ladi?",
      options: [
        "Dastur darhol xato berib to'xtab qoladi",
        "Har doim undefined qiymat qaytadi",
        "createContext() ni yozgan paytda berilgan odatiy (default) qiymatni oladi",
        "Ekranda Hech nima ko'rinmaydi"
      ],
      correctAnswer: 2,
      explanation: "Agar daraxt tepasida Provider topilmasa, react `createContext(defaultValue)` funksiyasidagi `defaultValue` qiymatini olib beradi."
    },
    {
      question: "Nima uchun tez-tez o'zgaradigan katta holatlar uchun Context ishlash ko'rsatkichini pasaytiradi?",
      options: [
        "Chunki u ma'lumotni faqat bitta komponentga yuboradi",
        "Context har safar o'zgarganda, unga ulangan BARCHA komponentlar avtomatik ravishda qayta chiziladi (re-render bo'ladi)",
        "Context juda ko'p xotira (RAM) talab qiladi",
        "Context ma'lumotni shifrlab uzatadi, bu esa sekin"
      ],
      correctAnswer: 1,
      explanation: "Context'dagi `value` o'zgarsa, o'sha Context'dan ma'lumot o'qiyotgan barcha `useContext` komponentlar, hattoki ularga xos bo'lmagan qismi o'zgarsa ham, qaytadan render bo'ladi."
    },
    {
      question: "Bitta ilovada nechta Context bo'lishi mumkin?",
      options: [
        "Faqat bitta asosiy Global Context bo'lishi mumkin",
        "Ko'pi bilan 3 ta",
        "Faqat ikkita: Theme va User uchun",
        "Xohlagancha, ehtiyojga qarab istalgancha Context va Provider yaratish mumkin"
      ],
      correctAnswer: 3,
      explanation: "Dastur ehtiyojiga qarab xohlagancha Context yaratish va ularni bir-biriga kiritish (nested) mumkin."
    },
    {
      question: "Nega 'Theme' va 'Auth' kabi ma'lumotlar ko'pincha alohida turli xil Context'larga bo'linadi?",
      options: [
        "Bitta Context ichiga ikkita state qo'yib bo'lmaydi",
        "Ikkalasini ajratish kodning xavfsizligini ta'minlaydi",
        "Theme o'zgarganda Auth'ga ulangan komponentlar ham keraksiz qayta chizilishining (re-render) oldini olish uchun",
        "React bitta Context yaratilgandan so'ng ikkinchisini avtomatik talab qiladi"
      ],
      correctAnswer: 2,
      explanation: "Ma'lumotlarni mantiqiy jihatdan alohida Context'larga bo'lish samaradorlikni oshiradi. Theme o'zgarganda faqat unga ulangan qismlar yangilanadi."
    },
    {
      question: "Provider value prop'iga har gal renderda to'g'ridan-to'g'ri yangi obyekt uzatish (`value={{ user, theme }}`) nima muammo keltirib chiqarishi mumkin?",
      options: [
        "Ota komponent har render bo'lganda yangi xotira manzili bilan obyekt yaratiladi va Provider ichidagi hamma narsa keraksiz qayta chiziladi",
        "Muammo bo'lmaydi, React obyektlarni o'zi tushunadi",
        "Sintaksis xatosi hisoblanadi",
        "Brauzer xotirasini tez to'ldirib yuboradi"
      ],
      correctAnswer: 0,
      explanation: "Javascript'da `{}` doim yangi obyekt yaratadi. Ota komponent render bo'lganda qiymat o'zgarmasa ham yangi manzil bo'lgani uchun barcha Context ishlatgan bolalar re-render bo'ladi. Buni useMemo bilan hal qilish mumkin."
    },
    {
      question: "Agar custom hook yaratib Context ni ishlatsak, buning qanday foydasi bor? (masalan, useTheme())",
      options: [
        "Dastur 50% ga tezroq ishlaydi",
        "useContext(ThemeContext) deb uzun yozishdan qutulamiz va ThemeContext ni hamma joyga import qilish shart bo'lmaydi",
        "Faqat custom hook orqali Redux ga ulash mumkin",
        "Custom hook Context ishlash prinsipini o'zgartirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "Custom hook yaratish kodni ixcham va qayta ishlashga qulay qiladi. Hamda Context o'zini import qilib yurishni oldini oladi."
    },
    {
      question: "Context API Redux yoki Zustand kabi State Manager'larning to'liq o'rnini bosa oladimi?",
      options: [
        "Ha, Context API doim mukammal, Redux umuman kerak emas",
        "Yo'q, Context API faqat matnli ma'lumotlarni o'tkazish uchun mo'ljallangan.",
        "Yo'q, Context API kichik va kam o'zgaradigan holatlar uchun mos. Katta va tez-tez o'zgaradigan holatlar uchun Redux yoki Zustand afzalroq.",
        "Ha, React 18 dan keyin Redux ishlatish man qilingan"
      ],
      correctAnswer: 2,
      explanation: "Context API asosan ma'lumotni yetkazib berish qulayligi uchun. Tez o'zgaradigan state larda esa u ko'p re-render larga sabab bo'ladi."
    }
  ]
};

export const contextApi = {
  id: "contextApi",
  title: "Context API va Global State",
  content: `
# Context API va Global State

React'da ma'lumotlar odatda ota-komponentdan bola-komponentlarga **props** orqali uzatiladi. Ammo ba'zi ma'lumotlar (masalan, joriy foydalanuvchi, til, yoki tema sozlamalari) ilovadagi juda ko'plab komponentlarga kerak bo'ladi. Bunday hollarda har bir qadamda prop uzatish (bunga **Prop Drilling** deyiladi) juda noqulay va xunuk kod yozilishiga olib keladi.

Shu muammoni hal qilish uchun React'da ichki o'rnatilgan vosita - **Context API** mavjud.

## 1. Prop Drilling nima?

Faraz qiling, sizda shunday komponentlar shajarasi bor:
\`App\` -> \`Dashboard\` -> \`Sidebar\` -> \`UserProfile\`

Agar \`App\` dagi foydalanuvchi ma'lumoti \`UserProfile\` ga kerak bo'lsa, uni \`Dashboard\` va \`Sidebar\` orqali uzatib o'tishingiz kerak, vaholanki bu o'rtadagi komponentlarga bu ma'lumot umuman kerak emas.

\`\`\`jsx
// Prop drilling misoli
<App user={user}>
  <Dashboard user={user}>
    <Sidebar user={user}>
      <UserProfile user={user} />
    </Sidebar>
  </Dashboard>
</App>
\`\`\`

## 2. Context yaratish va undan foydalanish

Context API shu prop drilling zanjirini "uzib", to'g'ridan-to'g'ri kerakli komponentga ma'lumot uzatish imkonini beradi. U uchta qadamdan iborat:

### Qadam 1: Context yaratish
Eng avvalo \`createContext\` yordamida yangi Context yaratib olamiz. Bu odatda alohida faylda qilinadi.

\`\`\`javascript
import { createContext } from 'react';

// Boshlang'ich qiymat bilan context yaratamiz
export const ThemeContext = createContext('light');
\`\`\`

### Qadam 2: Provider (Ta'minlovchi) bilan o'rash
Context yaratilgandan so'ng, uning \`Provider\` komponenti yordamida o'zgaruvchilarni uzatamiz. Buni iloji boricha yuqoriroq darajadagi komponentda (masalan, \`App\` da) qilamiz.

\`\`\`jsx
import { ThemeContext } from './ThemeContext';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    // "value" propiga e'tibor bering, barcha ma'lumotlar shu orqali o'tadi
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}
\`\`\`

### Qadam 3: useContext orqali ma'lumotni o'qish
Endi shajaraning istalgan joyidagi komponent ota-komponentlardan qat'iy nazar, \`useContext\` hook'i orqali shu ma'lumotni to'g'ridan-to'g'ri olishi mumkin.

\`\`\`jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function UserProfile() {
  // To'g'ridan-to'g'ri o'qib olyapmiz!
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'}>
      <p>Joriy tema: {theme}</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Temani o'zgartirish
      </button>
    </div>
  );
}
\`\`\`

## 3. Context API qachon ishlatilishi kerak?

Context API juda qulay, lekin uni hamma narsaga ishlataverish yaramaydi. 

**Qachon ishlatish YAXSHI:**
- Tema (Light/Dark mode)
- Til sozlamalari (I18n)
- Avtorizatsiya (Joriy foydalanuvchi ma'lumoti)
- Kamdan-kam o'zgaradigan global sozlamalar

**Qachon ishlatish YOMON:**
- Holat juda tez-tez o'zgarib tursa (masalan, text input qiymatlari yoki taymerlar). Chunki Context dagi qiymat o'zgarganda, u contextni ishlatayotgan barcha komponentlarni bittada qayta render (re-render) qiladi. Bu ilova ishlashini sekinlashtirishi mumkin. Bunday hollarda Zustand yoki Redux kabi vositalar yaxshiroq.

## 4. Custom Hook yasash (Best Practice)
Har safar \`useContext(ThemeContext)\` deb yozgandan ko'ra, maxsus (custom) hook yaratib olish professional yondashuv hisoblanadi.

\`\`\`javascript
// ThemeContext.js fayli ichida
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme faqat ThemeContext.Provider ichida ishlatilishi shart!');
  }
  return context;
}
\`\`\`
Keyin komponentlarda oddiygina: \`const { theme } = useTheme();\` deb ishlatasiz.
  `,
  code: `import React, { createContext, useState, useContext } from 'react';

// 1. Context yaratish
const AuthContext = createContext();

// Barcha komponentlarni o'rovchi maxsus Provider komponent
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 2. Custom Hook
function useAuth() {
  return useContext(AuthContext);
}

// 3. Navbar komponenti (Context dan foydalanadi)
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <span>Mening Saytim</span>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Salom, {user.name}!</span>
            <button onClick={logout}>Chiqish</button>
          </>
        ) : (
          <span>Tizimga kirmagansiz</span>
        )}
      </div>
    </nav>
  );
}

// 4. Main komponenti (Context dan foydalanadi)
function Main() {
  const { user, login } = useAuth();
  const [name, setName] = useState('');

  if (user) {
    return <div style={{ padding: '20px' }}>Xush kelibsiz! Asosiy sahifa kontenti...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Tizimga kiring</h3>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Ismingiz" 
      />
      <button onClick={() => login(name)}>Kirish</button>
    </div>
  );
}

// 5. Asosiy App
export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Main />
    </AuthProvider>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "ThemeContext yaratish",
      description: "Yangi \`ThemeContext\` va \`ThemeProvider\` komponentlarini yarating. ThemeProvider \`light\` yoki \`dark\` state ni ushlab tursin va o'z children'larini o'rasin.",
      startingCode: `import React, { createContext, useState } from 'react';\n\n// VAZIFA: ThemeContext ni yarating\n\nexport function ThemeProvider({ children }) {\n  // VAZIFA: 'theme' nomli state oching, boshlang'ich qiymati 'light'\n  \n  return (\n    <div>\n      {/* VAZIFA: Provider orqali children'ni o'rang va value ga theme'ni bering */}\n      {children}\n    </div>\n  );\n}`,
      solution: `import React, { createContext, useState } from 'react';\n\nexport const ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}`,
      hint: "\`export const ThemeContext = createContext();\` va \`<ThemeContext.Provider value={{ theme, setTheme }}>\` yozing."
    },
    {
      id: 2,
      title: "useContext orqali o'qish",
      description: "\`Header\` komponenti ichida \`useContext\` hook orqali \`ThemeContext\` dan \`theme\` qiymatini o'qib oling va ekranga chiqaring.",
      startingCode: `import React, { useContext } from 'react';\n// Faraz qiling ThemeContext shunday import qilingan:\nimport { ThemeContext } from './ThemeContext';\n\nexport default function Header() {\n  // VAZIFA: useContext orqali theme'ni o'qib oling\n\n  return (\n    <header>\n      Joriy tema: {/* VAZIFA: theme ni ekranga chiqaring */}\n    </header>\n  );\n}`,
      solution: `import React, { useContext } from 'react';\nimport { ThemeContext } from './ThemeContext';\n\nexport default function Header() {\n  const { theme } = useContext(ThemeContext);\n\n  return (\n    <header>\n      Joriy tema: {theme}\n    </header>\n  );\n}`,
      hint: "\`const { theme } = useContext(ThemeContext);\` ishlating."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Prop Drilling nima?",
      options: [
        "Ma'lumotni internetdan ko'chirish",
        "Ma'lumotni kerakli joyga yetkazish uchun o'rtadagi keraksiz komponentlar orqali props yordamida ketma-ket uzatish",
        "Teshik ochib kodga prop kiritish",
        "Komponentning tezligini oshiruvchi usul"
      ],
      correctAnswer: 1,
      explanation: "Prop Drilling - komponentlar shajarasi bo'ylab ma'lumotni tepadan pastgacha zanjir kabi uzatish jarayoniga aytiladi."
    },
    {
      id: 2,
      question: "Context ni ishlatish uchun avval uni qaysi funksiya bilan yaratamiz?",
      options: [
        "useContext()",
        "createContext()",
        "makeContext()",
        "new Context()"
      ],
      correctAnswer: 1,
      explanation: "React kutubxonasidan import qilinadigan createContext() funksiyasi orqali bo'sh Context obyekti yaratiladi."
    },
    {
      id: 3,
      question: "Context orqali barcha komponentlarga ma'lumot uzatuvchi asosiy element nima deb ataladi?",
      options: [
        "Context.Consumer",
        "Context.Sender",
        "Context.Provider",
        "Context.Emitter"
      ],
      correctAnswer: 2,
      explanation: "Provider (Ta'minlovchi) - bu context obyekti ichidagi React komponenti bo'lib, u o'zidagi value propidagi qiymatni ostki qavatlarga uzatadi."
    },
    {
      id: 4,
      question: "Qaysi holatda Context API o'rniga Redux yoki Zustand ishlatish maslahat beriladi?",
      options: [
        "Faqat Theme (Light/Dark) o'zgartirganda",
        "Holat (state) juda tez-tez o'zgarib turganda (chunki Context barcha consumerlarni qayta render qiladi)",
        "Dasturda atigi 3 ta komponent bo'lganda",
        "I18n (til sozlamalari) da"
      ],
      correctAnswer: 1,
      explanation: "Context API tez-tez o'zgaruvchi global holatlarda ilova tezligini (performance) pasaytirib yuborishi mumkin, chunki qiymat o'zgarsa unga ulangan hamma komponentlar render bo'ladi."
    }
  ]
};

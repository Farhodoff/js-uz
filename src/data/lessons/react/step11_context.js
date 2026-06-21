export const step11_context = {
  title: "11-DARS: Holatni boshqarish (Context API)",
  content: `
# 1. 🕳️ Prop Drilling muammosi nima?

Tasavvur qiling, sizda shunday komponentlar zanjiri bor:
\`App -> Navbar -> UserProfile -> Avatar\`

Va siz eng yuqoridagi \`App\` komponentidagi foydalanuvchi ma'lumoti (\`user\`) ni eng pastdagi \`Avatar\` ga yetkazishingiz kerak. Buning uchun siz Props orqali ma'lumotni \`Navbar\` ga berib, u yerdan \`UserProfile\` ga uzatib, keyin \`Avatar\` ga berasiz. Vaholanki, o'rtadagi komponentlarga (\`Navbar\` va \`UserProfile\`) bu ma'lumotning umuman keragi yo'q!

Bunday "kerak bo'lmagan qavatlardan ma'lumotni teshib o'tish" — **Prop Drilling** deb ataladi va loyiha kattalashganda kodingizni daxshatli darajada chigallashtirib yuboradi.

---

## 2. 🌍 Context API — Global Holat (Global State)

Yuqoridagi muammoni hal qilish uchun React da ichki vosita bor. Uning nomi **Context API**.

U xuddi osmondagi Wi-Fi router ga o'xshaydi: ma'lumotlarni simlar (props) orqali bitta-bitta ulashning o'rniga, havoga (Context ga) tarqatib yuboradi. Kimga kerak bo'lsa (qaysi komponent bo'lishidan qat'i nazar), parolni kiritib to'g'ridan-to'g'ri ulanib olaveradi.

Buning uchun 3 ta qadam kerak:
1.  **\`createContext\`**: Yangi Wi-Fi nuqta yaratamiz.
2.  **\`Provider\`**: O'z ichidagi barcha bolalarga shu ma'lumotni tarqatadi (antennaga o'xshab).
3.  **\`useContext\`**: Bola komponent shu orqali ulanib olib, ma'lumotni o'qiydi.

---

## 3. 🛠️ Bosqichma-bosqich yozilishi

**1-Qadam: Context yaratish** (Alohida faylda yoki App.js tepasida)
\`\`\`jsx
import { createContext } from 'react';

// "Theme" uchun yangi Context yaratdik
export const ThemeContext = createContext(null);
\`\`\`

**2-Qadam: Ma'lumotni tarqatish (Provider)**
Endi eng yuqoridagi (Ota) komponent ichida barchasini \`Provider\` bilan o'rab, qanday ma'lumot uzatilayotganini \`value\` orqali aytamiz.
\`\`\`jsx
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    // Endi ThemeContext.Provider ichida bo'lgan har qanday element "theme" ni ko'ra oladi
    <ThemeContext.Provider value={theme}>
      <Navbar />
      <MainContent />
    </ThemeContext.Provider>
  );
}
\`\`\`

**3-Qadam: Qabul qilib olish (\`useContext\`)**
O'rtadagi barcha komponentlardan sakrab o'tib, to'g'ridan-to'g'ri maqsadga boramiz!
\`\`\`jsx
import { useContext } from 'react';
import { ThemeContext } from './App'; // Boyagi Wi-Fi nomini chaqiramiz

function MainContent() {
  // Wi-Fi ga ulanib, "value" ni oldik
  const theme = useContext(ThemeContext);

  return <p>Hozirgi tema: {theme}</p>;
}
\`\`\`

---

## 4. ⚖️ Context vs Redux (Yoki Zustand)

Context kichik va o'rta loyihalar (Mavzular, Tillarni o'zgartirish, Auth statusi) uchun ajoyib. Lekin tez-tez o'zgarib turadigan katta ma'lumotlar uchun mos emas, chunki Context dagi bitta ma'lumot o'zgarsa, shu Context ga ulangan barcha komponentlar bir vaqtda qayta chiziladi (Keraksiz Re-renderlar).
Bunday paytda Redux yoki Zustand kabi tashqi (External) State Manager'lar kerak bo'ladi.

## 🧠 Chuqurlashtirilgan Nazariya: Prop Drilling va Context API

Keling, **Prop Drilling** (ma'lumotlarni qavatma-qavat uzatish) va **Context API** (ma'lumotni global tarqatish) o'rtasidagi farqni vizual tarzda ko'rib chiqamiz.

**Prop Drilling** da eng yuqoridagi komponentdan (\`App\`) eng pastdagi komponentga (\`DeepChild\`) ma'lumot uzatish uchun o'rtadagi barcha komponentlar (\`Parent\`, \`Child\`) bu ma'lumotni qabul qilib, o'zining bolasiga uzatib borishi kerak. Bu esa ularga umuman aloqador bo'lmagan "ortiqcha yuk" ni tashiydi.

**Context API** da esa \`Provider\` orqali ma'lumot "havoga" (kontekstga) tarqatiladi. Pastdagi istalgan komponent (masalan, \`DeepChild\`) o'rtadagi qavatlarni bezovta qilmasdan, to'g'ridan-to'g'ri \`useContext\` orqali o'ziga kerakli ma'lumotni oladi.

Quyidagi chizmada bu jarayon qanday ishlashi aniq ko'rsatilgan:

\`\`\`mermaid
graph TD
    subgraph Prop Drilling
        A1[App <br/> state: user] -->|user| B1(Parent)
        B1 -->|user| C1(Child)
        C1 -->|user| D1(DeepChild)
        style B1 stroke-dasharray: 5 5, fill:#ffcccc,stroke:#ff0000
        style C1 stroke-dasharray: 5 5, fill:#ffcccc,stroke:#ff0000
        style D1 fill:#ccffcc,stroke:#00aa00
    end

    subgraph Context API
        A2[App + Provider <br/> value: user] -.-> B2(Parent)
        B2 -.-> C2(Child)
        C2 -.-> D2(DeepChild)
        A2 ==>|useContext| D2
        style B2 fill:#f9f9f9,stroke:#999
        style C2 fill:#f9f9f9,stroke:#999
        style D2 fill:#ccffcc,stroke:#00aa00
    end
\`\`\`

**Asosiy farqlar:**
- **Prop Drilling** o'rtadagi komponentlarni o'ziga kerak bo'lmagan ma'lumot bilan ifloslantiradi va komponentlarni qayta ishlashni (reusability) qiyinlashtiradi.
- **Context API** kodning tozaligini saqlaydi. \`Parent\` va \`Child\` komponentlar faqat o'ziga kerakli ishlarni qiladi, ortiqcha ma'lumot tashimaydi. Lekin yodda tuting: Context'dagi qiymat o'zgarsa, undan foydalanayotgan barcha komponentlar qayta chiziladi (re-render). Shuning uchun tez o'zgaradigan holatlar uchun ehtiyotkorlik bilan foydalanish kerak.
`,
  code: `import React, { useState, createContext, useContext } from "react";

// 1. Wi-Fi (Context) yaratamiz
const ThemeContext = createContext();
const LanguageContext = createContext();

export default function ContextDemo() {
  const [theme, setTheme] = useState("light"); // light yoki dark
  const [lang, setLang] = useState("uz");      // uz yoki en

  // 2. Butun ilovani Providerlar bilan o'raymiz
  // Ularning ichiga value propini beramiz
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider value={{ lang, setLang }}>
        <div style={{ padding: 20, border: "2px dashed #3498db" }}>
          <h2>Asosiy App (Ota komponent)</h2>
          <p>Ota komponentda holat saqlanmoqda. Lekin biz uni quyidagi bolalarga props sifatida EMAS, balki Context orqali yuboramiz.</p>
          
          <hr />
          
          {/* O'rtadagi Hech Nima Qilmaydigan Komponent */}
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
  const { theme, setTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LanguageContext);

  // Tema ranglari
  const background = theme === "dark" ? "#2c3e50" : "#ecf0f1";
  const color = theme === "dark" ? "#ecf0f1" : "#2c3e50";

  // Tilga qarab so'zlar
  const greeting = lang === "uz" ? "Salom! Men eng ichki komponentman." : "Hello! I am the innermost component.";

  return (
    <div style={{ padding: 20, background, color, borderRadius: 8, transition: "0.3s" }}>
      <h4>Target Komponent (Eng ichkarida)</h4>
      <h2>{greeting}</h2>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        {/* Tilni o'zgartirish tugmasi */}
        <button onClick={() => setLang(lang === "uz" ? "en" : "uz")}>
          {lang === "uz" ? "🇺🇸 English" : "🇺🇿 O'zbekcha"}
        </button>

        {/* Mavzuni o'zgartirish tugmasi */}
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

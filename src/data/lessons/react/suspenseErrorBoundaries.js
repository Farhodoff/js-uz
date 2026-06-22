export const suspenseErrorBoundaries = {
  id: "suspenseErrorBoundaries",
  title: "Suspense va Error Boundaries",
  content: `
# Suspense va Error Boundaries (Kutish va Xatolarni ushlash)

Zamonaviy React (v18+) da API dan ma'lumot kelishini kutish va u yerda xatolik yuz bersa (server ishlamay qolsa) dasturni qulab tushishdan saqlab qolish uchun ajoyib, deklarativ vositalar mavjud. Bular **Suspense** va **Error Boundary** lardir.

## 1. Suspense (Kutib turish) nima o'zi?

Tasavvur qiling, siz \`<UserProfile />\` komponentini yozdingiz. Uning ichida serverdan ma'lumot yuklab olinadi (fetch). 
Eski React'da biz nima qilardik? \`isLoading\` degan state ochardik, va u true bo'lsa \`return <p>Kuting...</p>\` derdik.

**Suspense** orqali biz o'sha if/else mantiqlaridan qutulamiz. Siz shunchaki ma'lumot keladigan komponentni \`<Suspense>\` bilan o'raysiz. Komponent o'ziga kerakli narsani (kodni yoki datani) topa olmasa, Suspense avtomatik ravishda \`fallback\` ni ko'rsatib turadi.

\`\`\`jsx
import React, { Suspense } from 'react';
import UserProfile from './UserProfile';

function App() {
  return (
    <div>
      <h1>Bizning Ilova</h1>
      
      {/* Agar UserProfile yuklanayotgan bo'lsa, Spinner aylanib turadi */}
      <Suspense fallback={<div className="spinner">Yuklanmoqda...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
\`\`\`

> **Qayerlarda ishlaydi?** 
> 1. \`React.lazy()\` orqali komponentlarni ajratganda (Code splitting darsini eslang).
> 2. Next.js dagi ma'lumot olish (data fetching) jarayonlarida.
> 3. React 18 ning yangi \`use\` hook'i (yoki RSC) ishlatilganda.

## 2. Error Boundary (Xatolar chegarasi)

Dasturlashda hamma narsa doim ham yaxshi bo'lavermaydi. API o'zgarishi, noto'g'ri o'zgaruvchidan foydalanish kabi sabablarga ko'ra bitta komponent ichida Xato (Error) yuz berishi mumkin.
Odatda bunday paytda React **butun sahifani oq ekranga (White screen of death)** aylantirib yuboradi! Bu foydalanuvchilar uchun dahshat.

Buni oldini olish uchun biz **Error Boundary** yaratamiz. U xuddi qalqonga o'xshaydi. O'zining ichidagi komponentlarda xato chiqsa, u butun dasturni qulashga qo'ymaydi, balki o'sha qismning o'rniga "Kechirasiz xatolik yuz berdi" degan maxsus UI ni ko'rsatadi.

### A. Klassik usul (Class Component)
Tarixan Error Boundary faqat Class komponentlar orqali yozilgan (chunki hooksda bunga muqobil yo'q edi).

\`\`\`jsx
class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Xato yuz berganda state ni yangilash
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Kechirasiz, tizimda vaqtinchalik xato bor.</h2>;
    }
    return this.props.children; 
  }
}
\`\`\`

### B. Zamonaviy usul (\`react-error-boundary\` kutubxonasi)
Hozirgi kunda yuqoridagi uzun kodlarni o'zimiz yozib o'tirmaymiz. Maxsus kutubxona (\`npm install react-error-boundary\`) bizga tayyor komponent beradi.

\`\`\`jsx
import { ErrorBoundary } from 'react-error-boundary';
import BrokenComponent from './BrokenComponent';

// Xato yuz berganda nima chiqishini belgilaymiz
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ color: 'red' }}>
      <h3>Nimadir hato ketdi:</h3>
      <pre>{error.message}</pre>
      {/* Qayta urinib ko'rish tugmasi */}
      <button onClick={resetErrorBoundary}>Qayta urinish</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Agar shu komponent portlab (xato berib) qulasa ham App ishlayveradi! */}
      <BrokenComponent />
    </ErrorBoundary>
  );
}
\`\`\`

## 3. Zo'r Arxitektura: Suspense + Error Boundary

Haqiqiy professional dasturlarda ota komponent har doim ham \`Suspense\` ham \`ErrorBoundary\` ni o'z ichiga oladi:

\`\`\`jsx
<ErrorBoundary fallback={<ErrorScreen />}>
  <Suspense fallback={<LoadingScreen />}>
    <Dashboard />
  </Suspense>
</ErrorBoundary>
\`\`\`
**Nima sodir bo'ladi?** 
Dashboard ma'lumot kutayotganda -> LoadingScreen chiqadi.
Agar Dashboard da JS xatosi yoki Tarmoq uzilishi bo'lsa -> ErrorScreen chiqadi.
Va eng muhimi — saytning qolgan qismi (Yon menyular, Bosh sahifa) bemalol ishlayveradi!
  `,
  code: `import React, { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// ==============================================
// 1. Oson buziladigan komponent (Simulyatsiya)
// ==============================================
const BuggyComponent = ({ shouldCrash }) => {
  if (shouldCrash) {
    // Bu qasddan qilingan xato. React ni qulatishi kerak!
    throw new Error("💥 Boom! Men qulab tushdim!");
  }
  
  return (
    <div style={{ padding: "10px", background: "#55efc4", borderRadius: "5px" }}>
      ✅ Men yaxshi ishlayapman! Hech qanday xato yo'q.
    </div>
  );
};

// ==============================================
// 2. Xato berganda chiqadigan dizayn (Fallback)
// ==============================================
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{ padding: "15px", background: "#fab1a0", borderRadius: "5px", color: "#d63031" }}>
      <h3>Tizimda Xatolik! (Error Boundary ushlab qoldi)</h3>
      <p><strong>Xato sababi:</strong> {error.message}</p>
      
      <button 
        onClick={resetErrorBoundary}
        style={{ padding: "8px 15px", cursor: "pointer", background: "#d63031", color: "white", border: "none" }}
      >
        🔄 Yana urinib ko'rish
      </button>
    </div>
  );
};

// ==============================================
// 3. Asosiy App
// ==============================================
export default function SafeApp() {
  const [makeError, setMakeError] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}>
      <h2>Error Boundary Namunasiga xush kelibsiz</h2>
      <p>
        Odatda React'da xato chiqsa, butun sahifa "Oq Ekran" bo'lib yo'qolib qoladi. 
        Lekin bizning komponent <strong>ErrorBoundary</strong> bilan himoyalangan.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <button 
          onClick={() => setMakeError(true)}
          style={{ padding: "10px", background: "#e17055", color: "white", border: "none", cursor: "pointer", marginRight: "10px" }}
        >
          💣 Qasddan xato qildirish
        </button>
      </div>

      <div style={{ border: "2px dashed #0984e3", padding: "20px" }}>
        <h4>Himoyalangan Hudud:</h4>
        
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          // "Yana urinib ko'rish" bosilganda nima qilinishi
          onReset={() => setMakeError(false)} 
        >
          {/* 
            Agar shouldCrash 'true' bo'lsa bu komponent o'ladi. 
            Lekin ErrorBoundary uni ushlab qoladi! 
          */}
          <BuggyComponent shouldCrash={makeError} />
        </ErrorBoundary>

      </div>
      
      <p style={{ marginTop: "20px", color: "gray" }}>
        E'tibor bering: Yuqoridagi hududda xato bo'lsa ham, sahifaning boshqa joylari (masalan shu matn) ko'rinib, ishlayveradi!
      </p>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Suspense ni qo'shish",
      description: "Quyida ma'lumot kutib turganda xunuk xatolik berayotgan \`UserCard\` komponenti bor. Uni \`<Suspense>\` bilan o'rab, \`fallback\` propiga 'Yuklanmoqda...' ni bering.",
      startingCode: `import React, { Suspense } from 'react';\nimport UserCard from './UserCard';\n\nexport default function App() {\n  return (\n    <div>\n      {/* VAZIFA: UserCard ni Suspense ichiga oling */}\n      <UserCard />\n    </div>\n  );\n}`,
      solution: `import React, { Suspense } from 'react';\nimport UserCard from './UserCard';\n\nexport default function App() {\n  return (\n    <div>\n      <Suspense fallback={<p>Yuklanmoqda...</p>}>\n        <UserCard />\n      </Suspense>\n    </div>\n  );\n}`,
      hint: "\`<Suspense fallback={<p>Yuklanmoqda...</p>}>\` va \`</Suspense>\` dan foydalaning."
    },
    {
      id: 2,
      title: "Error Boundary ishlatish",
      description: "Biz xatolarni ushlovchi \`<ErrorBoundary>\` ni chaqirdik. Lekin unga \`fallback\` ni ko'rsatmadik. \`FallbackComponent\` propiga \`ErrorPage\` ni bering.",
      startingCode: `import { ErrorBoundary } from 'react-error-boundary';\nimport BrokenThing from './BrokenThing';\n\nconst ErrorPage = () => <h1>Xatolik yuz berdi</h1>;\n\nexport default function App() {\n  return (\n    // VAZIFA: FallbackComponent propini qo'shing\n    <ErrorBoundary>\n      <BrokenThing />\n    </ErrorBoundary>\n  );\n}`,
      solution: `import { ErrorBoundary } from 'react-error-boundary';\nimport BrokenThing from './BrokenThing';\n\nconst ErrorPage = () => <h1>Xatolik yuz berdi</h1>;\n\nexport default function App() {\n  return (\n    <ErrorBoundary FallbackComponent={ErrorPage}>\n      <BrokenThing />\n    </ErrorBoundary>\n  );\n}`,
      hint: "\`<ErrorBoundary FallbackComponent={ErrorPage}>\`"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Suspense komponenti nima uchun kerak?",
      options: [
        "React ilovasini serverda ishlashi uchun",
        "Komponentning ichidagi ma'lumotlar (API dan yoki lazy orqali) yuklanayotgan vaqt oralig'ida foydalanuvchiga vaqtinchalik UI (masalan, aylanib turuvchi Spinner) ko'rsatish uchun",
        "Brauzerdagi barcha ishlarni vaqtincha muzlatib turish (suspend) uchun",
        "Zustand State ni boshqarish uchun"
      ],
      correctAnswer: 1,
      explanation: "Suspense (inglizchadan 'Kutish', 'Noaniqlik') - o'z farzandlari qandaydir og'ir asinxron ishni (kod yuklash yoki fetch qilish) bajarayotgan paytda, sahifa bo'sh qolib ketmasligi uchun ishlaydi."
    },
    {
      id: 2,
      question: "Agar React loyihasida Error Boundary O'RNATILMAGAN bo'lsa va qaysidir funksiya xato (JS Error) qilsa nima bo'ladi?",
      options: [
        "Faqat o'sha xato qilgan qism yashirinib qoladi",
        "React avtomatik xatoni o'zi to'g'rilab yuboradi",
        "Butun sahifa oq ekranga (White Screen of Death) aylanib, qulab tushadi (Crashes)",
        "Sahifada qizil rangli konsol xabari chiqadi, lekin ishlayveradi"
      ],
      correctAnswer: 2,
      explanation: "React xatolarga nisbatan juda qat'iy. Bitta chala qolgan yoki xato yozilgan kod butun daraxtni o'chirib yuboradi. Shuning uchun Error Boundary muhim qalqondir."
    },
    {
      id: 3,
      question: "Error Boundary ni qo'ldan (from scratch) yaratish uchun React ning qaysi arxitekturasidan foydalanish majburiy?",
      options: [
        "Hooks (useState, useEffect)",
        "Function Components",
        "Faqat Class Components (getDerivedStateFromError yoki componentDidCatch yordamida)",
        "Context API"
      ],
      correctAnswer: 2,
      explanation: "Hozircha React da (v18 gacha ham) Error Boundary ni Function Component lar orqali (Hooks bilan) yasashning rasmiy yo'li yo'q. Shuning uchun biz klasslardan yoki tayyor 'react-error-boundary' kutubxonasidan foydalanamiz."
    },
    {
      id: 4,
      question: "Suspense va ErrorBoundary birgalikda ishlatilganda qay tarzda o'ralgani ma'qul?",
      options: [
        "Ular birga ishlamaydi",
        "Asosiy komponent ularning tashqarisida bo'ladi",
        "Eng tashqarida <ErrorBoundary>, uning ichida <Suspense>, uning ichida <Component>. Chunki Suspense o'zida xato chiqarsa ErrorBoundary uni ham ushlab qola oladi.",
        "Aralash ko'rinishda"
      ],
      correctAnswer: 2,
      explanation: "Qalqon har doim eng tashqarida turishi kerak. Agar loading (Suspense) paytida xato bo'lsa (masalan internet uzilib qolsa), ErrorBoundary darhol bu holatni qayta ishlab 'Xatolik' ekranini chiqaradi."
    }
  ]
};

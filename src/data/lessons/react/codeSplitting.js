export const codeSplitting = {
  id: "codeSplitting",
  title: "Code Splitting va Lazy Loading",
  content: `
# Code Splitting va Lazy Loading (Kodni qismlarga ajratish)

React ilovasini yozib bo'lgach, uni "build" (yig'ish) qilganimizda barcha yozgan kodlarimiz bitta ulkan JavaScript fayliga (\`bundle.js\`) aylanadi.

## 1. Nega bitta fayl bo'lishi muammo?

Tasavvur qiling, sizning e-commerce (internet-do'kon) ilovangiz bor. Unda "Bosh sahifa", "Mahsulotlar", va juda og'ir bo'lgan "Admin Panel" (grafiklar, jadvallar bilan) bor. 
Foydalanuvchi ilovaga birinchi marta kirganda brauzer o'sha ulkan \`bundle.js\` ni to'liq yuklab olishi kerak. Ya'ni, foydalanuvchi faqat bosh sahifani ko'rish uchun "Admin Panel" kodlarini ham yuklab olishga majbur bo'ladi! Bu ilovaning dastlabki yuklanish vaqtini (Initial Load Time) juda sekinlashtiradi.

## 2. Yechim: Code Splitting (Kodni ajratish)

**Code Splitting** — bu \`bundle.js\` ni kichik-kichik qismlarga (chunks) bo'lish va kerakli kodni qachonki kerak bo'lsagina serverdan so'rash mexanizmi.

React'da bu ishni amalga oshirish uchun ikkita asosiy vosita bor:
1. \`React.lazy()\`
2. \`Suspense\` komponenti

## 3. Qanday ishlatiladi?

Oddiy holatda biz komponentni shunday import qilamiz (Bu bitta katta bundle ga aylanadi):
\`\`\`javascript
// Statik (Oddiy) Import
import HeavyAdminPanel from './HeavyAdminPanel';
\`\`\`

Buning o'rniga, komponentni qachonki ekranga chiqishi kerak bo'lsagina import qilamiz. Bunga **Dynamic Import (Dinamik import)** yoki **Lazy Loading (Yalqov yuklash)** deyiladi:

\`\`\`javascript
import React, { lazy, Suspense } from 'react';

// Dinamik (Yalqov) Import
const HeavyAdminPanel = lazy(() => import('./HeavyAdminPanel'));

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsAdminOpen(true)}>Admin Panelni ochish</button>
      
      {/* 
        Komponent hali serverdan yuklanmagan bo'lishi mumkin. 
        Shuning uchun uni doim <Suspense> bilan o'rash va yuklanayotgan 
        paytda nima ko'rsatilishini (fallback) belgilash kerak.
      */}
      {isAdminOpen && (
        <Suspense fallback={<div>Yuklanmoqda... Bunga biroz vaqt ketishi mumkin.</div>}>
          <HeavyAdminPanel />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

## 4. Eng yaxshi amaliyot: Route-based Splitting (Sahifalarga bo'lish)

Code Splitting ni qo'llashning eng maqbul joyi — bu **marshrutlash (Routing)** bosqichidir. Chunki foydalanuvchi bitta sahifadan ikkinchisiga o'tayotganida ozgina kutishga ruhan tayyor bo'ladi.

\`React Router\` yordamida har bir sahifani alohida "chunk" ga ajratishimiz mumkin:

\`\`\`jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Barcha sahifalarni Lazy load qilamiz
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Dashboard = lazy(() => import('./routes/Dashboard'));

function App() {
  return (
    <Router>
      {/* Butun sahifalarni bitta Suspense bilan o'rash mumkin */}
      <Suspense fallback={<div className="spinner">Sahifa yuklanmoqda...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
\`\`\`

### Xulosa:
1. Ilova sekin ochilayotgan bo'lsa barcha ayb Reactda emas, ulkan \`bundle.js\` da bo'lishi mumkin.
2. Kattaroq va mustaqil komponentlarni \`React.lazy()\` yordamida alohida fayllarga ajrating.
3. Albatta bu komponentlarni qayerdadir yuqoriroqda \`<Suspense fallback={...}>\` bilan o'rashni unutmang!
  `,
  code: `import React, { useState, Suspense, lazy } from "react";

// Faraz qilamiz, bu komponent ichida juda og'ir kutubxonalar (Chart.js, Three.js) ishlatilgan
// U dastur ishga tushganda emas, balki faqat tugma bosilgandagina internetdan yuklab olinadi.
const HeavyChart = lazy(() => {
  // Simulyatsiya (2 soniya kutib, so'ngra soxta komponent qaytaramiz)
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      default: () => (
        <div style={{ background: '#2c3e50', color: 'white', padding: '50px', borderRadius: '10px' }}>
          <h2>📈 Men Juda Og'ir Grafikman!</h2>
          <p>Siz "Ko'rsatish" tugmasini bosmaguningizcha men umuman xotiraga yuklanmadim. Ilovangiz tez ishlashiga yordam berdim.</p>
        </div>
      )
    }), 2000);
  });
});

export default function App() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Lazy Loading Namuna</h1>
      <p>Odatda barcha kodlar birdaniga yuklanadi. Lekin biz "Lazy" yordamida qismlarga ajratishimiz mumkin.</p>

      <button 
        onClick={() => setShowChart(true)} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Og'ir Grafikni Yuklash
      </button>

      <div style={{ marginTop: "20px" }}>
        {showChart && (
          // Suspense: Lazy komponent o'zining kodini olib kelguncha fallback'ni ko'rsatib turadi
          <Suspense fallback={<h3 style={{ color: 'orange' }}>⏳ Internetdan komponent yuklanmoqda. Iltimos kuting...</h3>}>
            <HeavyChart />
          </Suspense>
        )}
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "React.lazy orqali import qilish",
      description: "Quyidagi kodda statik (oddiy) import ishlatilgan. Uni olib tashlang va o'rniga \`React.lazy()\` yordamida dinamik import ishlating.",
      startingCode: `import React, { Suspense } from 'react';\n\n// VAZIFA: Ushbu qatorni o'chiring va o'rniga lazy() ishlating:\nimport MassiveComponent from './MassiveComponent';\n\nexport default function App() {\n  return (\n    <div>\n      <Suspense fallback={<p>Loading...</p>}>\n        <MassiveComponent />\n      </Suspense>\n    </div>\n  );\n}`,
      solution: `import React, { Suspense, lazy } from 'react';\n\nconst MassiveComponent = lazy(() => import('./MassiveComponent'));\n\nexport default function App() {\n  return (\n    <div>\n      <Suspense fallback={<p>Loading...</p>}>\n        <MassiveComponent />\n      </Suspense>\n    </div>\n  );\n}`,
      hint: "\`const MassiveComponent = lazy(() => import('./MassiveComponent'));\` shaklida yozing."
    },
    {
      id: 2,
      title: "Suspense chegarasini belgilash",
      description: "App ichida ikkita lazy komponent (\`Header\` va \`Footer\`) ishlatilmoqda. Ularni qandaydir yuklanish indikatoriga ega \`Suspense\` ichiga o'rang.",
      startingCode: `import React, { lazy } from 'react';\n// Faraz qilamiz ular lazy orqali chaqirilgan\nconst Header = lazy(() => import('./Header'));\nconst Footer = lazy(() => import('./Footer'));\n\nexport default function App() {\n  return (\n    <div>\n      {/* VAZIFA: Quyidagi ikkita komponentni bitta <Suspense> bilan o'rang. \n      Fallback qilib <p>Kuting...</p> bering */}\n      <Header />\n      <Footer />\n    </div>\n  );\n}`,
      solution: `import React, { lazy, Suspense } from 'react';\n\nconst Header = lazy(() => import('./Header'));\nconst Footer = lazy(() => import('./Footer'));\n\nexport default function App() {\n  return (\n    <div>\n      <Suspense fallback={<p>Kuting...</p>}>\n        <Header />\n        <Footer />\n      </Suspense>\n    </div>\n  );\n}`,
      hint: "\`<Suspense fallback={<p>Kuting...</p>}>\` ... \`</Suspense>\` dan foydalaning."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Kodni qismlarga bo'lish (Code Splitting) ning asosiy maqsadi nima?",
      options: [
        "Fayllarni serverda xavfsizroq saqlash uchun",
        "React dagi error larni yo'qotish uchun",
        "Dastlabki yuklanish hajmini (bundle size) kichraytirib, foydalanuvchiga faqat hozir kerakli kodni tezda yuklab berish uchun",
        "Kod chiroyliroq ko'rinishi uchun"
      ],
      correctAnswer: 2,
      explanation: "Kichikroq fayllar tezroq yuklanadi. Agar foydalanuvchi 'Sozlamalar' sahifasiga umuman kirmasa, nega o'sha sahifa kodini ham bosh sahifada tortib olishi kerak? Code splitting aynan shuni oldini oladi."
    },
    {
      id: 2,
      question: "Dinamik import qilingan (lazy) komponent nimaga muhtoj?",
      options: [
        "Juda tezkor internetga",
        "Komponent yuklangunga qadar vaqtinchalik UI ko'rsatib turuvchi <Suspense> komponentiga o'ralishga",
        "useContext ga",
        "Zustand store ga"
      ],
      correctAnswer: 1,
      explanation: "React lazy yuklanayotgan vaqt oralig'ini kutib turishi kerak. Shuning uchun bizga <Suspense> va uning fallback xususiyati yordamga keladi."
    },
    {
      id: 3,
      question: "Code Splitting amaliyotini qayerda qo'llash eng foydali hisoblanadi?",
      options: [
        "Har bir kichik HTML <button> lar uchun alohida",
        "Route (Sahifalar) darajasida. Har bir alohida sahifa (Home, About) alohida chunk qilinadi",
        "Faqat Matnli (Typography) komponentlar uchun",
        "Redux harakatlari uchun"
      ],
      correctAnswer: 1,
      explanation: "Har bir sahifani (Route) alohida ajratish (Route-based code splitting) eng ideal va samarali joydir."
    },
    {
      id: 4,
      question: "Agar <Suspense fallback={...}> ichida birdaniga 3 ta lazy komponent bo'lsa nima sodir bo'ladi?",
      options: [
        "Xatolik yuz beradi",
        "Uchalasi ham alohida-alohida o'zining loadingini ko'rsatadi",
        "Suspense kutadi: uchala komponent ham to'liq yuklab olinmaguncha fallback ni ko'rsatib turadi, so'ngra hammasini birdan ekranga chiqaradi",
        "Faqat bittasi yuklanadi"
      ],
      correctAnswer: 2,
      explanation: "Suspense juda aqlli. Agar ichida nechta lazy komponent bo'lishidan qat'iy nazar, u hammasi to'liq tayyor bo'lishini kutadi va yagona oyna orqali render qiladi."
    }
  ]
};

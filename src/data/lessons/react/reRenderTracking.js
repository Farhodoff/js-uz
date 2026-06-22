export const reRenderTracking = {
  id: "reRenderTracking",
  title: "Re-renderlarni kuzatish va Profiler",
  content: `
# Re-renderlarni kuzatish va React Profiler

React'da **render** bu dasturning eng asosiy qismi bo'lib, ekranda nima chiqishini belgilaydi. Lekin komponentlar juda ko'p marotaba, bekorga qayta render (re-render) bo'lishi dasturni sekinlashtirib qo'yishi mumkin.

## 1. Nega komponent qayta render bo'ladi?

React'da re-render faqat uchta holatda yuz beradi:
1. **State o'zgarganda:** Komponent ichidagi \`useState\` yoki \`useReducer\` yangilanganda.
2. **Props o'zgarganda:** Ota komponentdan kelayotgan qiymatlar o'zgarganda.
3. **Ota komponent render bo'lganda:** Bu eng ko'p uchraydigan va muammoli holat. Agar ota komponent o'zini yangilasa, uning **Barcha** bola komponentlari (garchi ularga aloqasi bo'lmasa ham) avtomatik qayta render qilinadi!

## 2. Bekorchi re-renderlarni qanday topish mumkin?

### 1-usul: Oddiy \`console.log\`
Eng sodda usul komponent tanasiga (return'dan oldin) \`console.log("Render bo'ldi")\` yozib qo'yishdir. Agar birorta tugmani bosganingizda, aloqasi yo'q komponentning console.log i ishlayotgan bo'lsa, demak bekorchi render yuz beryapti.

### 2-usul: React Developer Tools (Tavsiya etiladi)
Chrome yoki Firefox brauzerida **"React Developer Tools"** kengaytmasini (extension) o'rnating.
1. F12 ni bosib DevTools ni oching.
2. Kengaytmaga tegishli **"Components"** bo'limiga kiring.
3. Sozlamalar (Gear icon) -> "General" -> **"Highlight updates when components render"** ni yoqing.
Shunda har qanday o'zgarishda brauzer ekranda qaysi komponentlar yangilanganini rangli chegaralar bilan ko'rsatib turadi. Bu muammolarni ko'z bilan ko'rish uchun ajoyib!

## 3. Profiler orqali millisoniyalarni o'lchash

Agar sizda haqiqatdan ham katta ro'yxatlar bo'lsa va kod aynan qayerda sekinlashayotganini aniq raqamlarda ko'rmoqchi bo'lsangiz, React'ning ichki \`<Profiler>\` komponentidan foydalanasiz.

\`\`\`jsx
import React, { Profiler } from 'react';

// O'lchov natijalarini qabul qiluvchi funksiya
const onRenderCallback = (
  id,           // Profilerning ID si
  phase,        // "mount" (ilk yaratilish) yoki "update" (yangilanish)
  actualDuration, // Ushbu render qancha vaqt oldi (millisoniya)
  baseDuration,   // Umuman render bo'lmasa qancha olar edi
  startTime,      // Render qachon boshlandi
  commitTime      // Render qachon yakunlandi
) => {
  // Faqat uzoq davom etgan renderlarni tekshirish mumkin
  if (actualDuration > 10) { 
    console.log(\`Ogohlantirish! \${id} komponenti \${actualDuration}ms vaqt oldi.\`);
  }
};

function App() {
  return (
    <div>
      {/* 
        Siz o'lchamoqchi bo'lgan qismni <Profiler> ichiga olasiz.
        ID orqali bir nechta profilerlarni farqlab olish mumkin.
      */}
      <Profiler id="Sidebar" onRender={onRenderCallback}>
        <Sidebar />
      </Profiler>
      
      <Profiler id="MainContent" onRender={onRenderCallback}>
        <MainContent />
      </Profiler>
    </div>
  );
}
\`\`\`

> **Muhim eslatma:** Profiler xotiradan sezilarli resurs oladi, shu sababli uni faqat kodni test qilish vaqtida (Development) ishlating. Haqiqiy proyekt (Production) serverga yuklanganda React avtomatik tarzda Profilerni o'chirib qo'yadi.

### Xulosa:
Unutmangki, har bir re-render - bu xato emas! React juda tez ishlashga moslashgan, kichik komponentlarning qayta render bo'lishi hech qanday yomon oqibatlarga olib kelmaydi. Faqatgina qotib qolishni (lag) aniq sezganingizdagina Profiler orqali qidirib, topib, so'ngra optimallashtirishga (useMemo, React.memo) o'ting. "Barvaqt optimallashtirish (Premature optimization) – bu barcha yomonliklarning manbaidir!"
  `,
  code: `import React, { useState, Profiler } from "react";

// ==========================================
// 1. O'lchov Natijalarini qabul qiluvchi funksiya
// ==========================================
function onRenderCallback(id, phase, actualDuration) {
  // Console ga chiroyli qilib chiqaramiz
  console.log(
    \`%c[\${id}] \${phase} jarayoni \${actualDuration.toFixed(2)} ms vaqt oldi.\`,
    "color: blue; font-weight: bold;"
  );
}

// 2. Juda og'ir va sekin komponent (Sun'iy yaratilgan)
function HeavyComponent() {
  // Sun'iy ravishda sekinlashish yaratamiz
  let startTime = performance.now();
  while (performance.now() - startTime < 50) {
    // Har render bo'lganda bu kod o'zini o'zi 50 millisoniya qotirib qo'yadi
  }
  
  return (
    <div style={{ border: '2px dashed red', padding: '10px', marginTop: '10px' }}>
      Men juda og'ir komponentman! Men render bo'lishim uchun kamida 50ms kutishingiz kerak.
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Profiler va Re-renderlarni Tekshirish</h2>
      <p>Ochiq console paneliga qarang!</p>
      
      <div style={{ marginBottom: "20px" }}>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Bu yerga yozing..."
        />
        <p>Siz yozdingiz: {text}</p>
        
        <button onClick={() => setCount(count + 1)}>
          Sanoq: {count}
        </button>
      </div>

      {/* 
        3. Profiler bilan tekshirish
        Yuqoridagi har bir yozish (input onChange) butun sahifani re-render qiladi.
        Chunki ular bitta fayl (App) ichida.
        Natijada, pastdagi og'ir komponent ham aloqasi yo'q bo'lsa-da qayta ishlayveradi.
      */}
      <Profiler id="HeavyTracker" onRender={onRenderCallback}>
        <HeavyComponent />
      </Profiler>

    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Komponentni Profiler bilan o'rash",
      description: "Quyida \`<Navbar />\` komponenti berilgan. Biz uning qancha vaqtda render bo'lishini o'lchamoqchimiz. Uni \`Profiler\` bilan o'rang.",
      startingCode: `import React, { Profiler } from 'react';\n\nconst onRender = (id, phase, actualDuration) => {\n  console.log(id, actualDuration);\n};\n\nexport default function App() {\n  return (\n    <div>\n      {/* VAZIFA: Navbar ni Profiler ichiga oling. \n          id=\"NavbarMenu\" va onRender={onRender} bering */}\n      <Navbar />\n    </div>\n  );\n}\n\nfunction Navbar() { return <nav>Navbar Content</nav>; }`,
      solution: `import React, { Profiler } from 'react';\n\nconst onRender = (id, phase, actualDuration) => {\n  console.log(id, actualDuration);\n};\n\nexport default function App() {\n  return (\n    <div>\n      <Profiler id="NavbarMenu" onRender={onRender}>\n        <Navbar />\n      </Profiler>\n    </div>\n  );\n}\n\nfunction Navbar() { return <nav>Navbar Content</nav>; }`,
      hint: "\`<Profiler id=\"NavbarMenu\" onRender={onRender}>\` <Navbar /> \`</Profiler>\`"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Komponent quyidagi qaysi holatda QAYTA RENDER (re-render) BO'LMAYDI?",
      options: [
        "Uning ota-komponenti render bo'lganda",
        "Unga kirib kelayotgan Props o'zgarganda",
        "Uning ichidagi oddiy DOM elementiga CSS hover qilinganda",
        "Uning State (holati) yangilanganda"
      ],
      correctAnswer: 2,
      explanation: "CSS dagi hover yoki oddiy HTML o'zgarishlari bu brauzerning shaxsiy renderi, React o'zining virtual DOM iga tegishli bo'lmagan narsalar uchun re-render qilmaydi."
    },
    {
      id: 2,
      question: "Eng sodda 're-render' ni kuzatish (tutish) usuli qaysi?",
      options: [
        "console.log('render bo'ldi') deb komponent ichiga (return dan oldin) yozish",
        "Redux ni o'rnatish",
        "useEffect ishlatish",
        "Custom Hook yozish"
      ],
      correctAnswer: 0,
      explanation: "Har qachon komponent ishga tushsa (render bo'lsa), uning funksiyasi boshidan oxirigacha qayta o'qiladi. Shuning uchun tepadagi oddiy console.log ajoyib tekshiruvchidir."
    },
    {
      id: 3,
      question: "React Profiler dagi 'actualDuration' parametri nimani anglatadi?",
      options: [
        "Komponentning ekranda tushib turgan uzunligini",
        "Aynan joriy render jarayoni uchun sarflangan vaqtni (millisoniyalarda)",
        "Dastur ishga tushganidan beri qancha vaqt o'tganligini",
        "Kodni yozishga ketgan vaqtni"
      ],
      correctAnswer: 1,
      explanation: "actualDuration - bu komponent eng so'nggi renderda qancha vaqt qotib ishlaganini ko'rsatadigan eng muhim ko'rsatkich."
    },
    {
      id: 4,
      question: "Ota komponent re-render bo'lsa, barcha bola komponentlar avtomatik re-render bo'lishi qanday nomlanadi?",
      options: [
        "Xatolik (Bug)",
        "Bu qoidalarga zid",
        "React ning normal arxitekturasi va kutilgan xulq-atvori (Expected behavior)",
        "Bunday bo'lishi mumkin emas"
      ],
      correctAnswer: 2,
      explanation: "Aksariyat odamlar buni xato (bug) deb o'ylashadi, lekin aslida bu React shunday ishlashiga moslashtirilgan. Buni oldini olish uchungina bizga keyingi darsdagi React.memo kerak bo'ladi."
    }
  ]
};

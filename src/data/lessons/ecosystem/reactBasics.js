export const reactBasics = {
  id: "reactBasics",
  title: "React.js Asoslari: Komponentlar va Hooklar",
  language: "javascript",
  theory: `## 1. 💡 React nima?

Ko'pgina o'quv qo'llanmalar React-ni "HTML yozishni osonlashtiradi" deb ta'riflashadi — bu xuddi avtomobilni "g'ildiraklari aylanadi" deb tariflashday gap. Aslida React quyidagi uchta kuchli falsafa ustiga qurilgan:

1. **JavaScript Kutubxonasi:** U framework emas, balki foydalanuvchi interfeysini (UI) yaratishga qaratilgan JS kutubxonasidir.
2. **Declarative (Deklarativ) yondashuv:** Siz DOM ni qanday qilib o'zgartirishni (qadam-ba-qadam) aytmaysiz, balki natija qanday ko'rinishda bo'lishini berasiz. React o'zi kerakli joylarni chizadi.
3. **Virtual DOM:** Brauzerning haqiqiy (real) DOM'ini o'zgartirish sekin amal hisoblanadi. Shuning uchun React o'zining Virtual DOM'ida o'zgarishlarni hisoblab (diffing), faqat o'zgargan mayda qismlarni haqiqiy DOM'ga uzatadi (reconciliation).

---

## 2. 🧩 Komponentlar va Props

React dasturi kichik va mustaqil bo'laklardan — **Komponentlar**dan tashkil topadi.
**Props** (properties so'zining qisqartmasi) — bu bir komponentdan ikkinchisiga ma'lumot uzatuvchi o'zgaruvchilar. Ular faqat o'qish uchun (read-only) bo'lib, ularni o'zgartirib bo'lmaydi.

\`\`\`jsx
// Oddiy funksional komponent
function Greeting(props) {
  return <h1>Salom, {props.name}!</h1>;
}
\`\`\`

---

## 3. 🎣 Hooklar: useState

\`useState\` bu funksional komponentga dinamik ma'lumot qo'shish imkonini beruvchi hook hisoblanadi.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // holat (state) va uni yangilovchi maxsus funksiya
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Siz {count} marta bosdingiz</p>
      {/* setCount orqali qiymatni yangilash (update state) */}
      <button onClick={() => setCount(count + 1)}>Bosish</button>
    </div>
  );
}
\`\`\`

> **Muhim Izoh:** Yuqoridagi misolda \`count\` bu saqlanayotgan qiymat (holat/state), \`setCount\` esa shu qiymatni yangilash (update) uchun ishlatiladigan maxsus funksiya. Ko'pincha "holatni yangilash" deyiladi, shuni yodda tutingki, siz shunchaki \`count\` qiymatini yangilayapsiz. React shu funksiya orqali qiymat yangilanganida ekranni avtomatik qayta chizadi.

---

## 4. ⏳ Hooklar: useEffect

\`useEffect\` shunday kuchli qurolki, uni noto'g'ri tushuntsangiz yoki ishlatsangiz ilovangiz "abadiy re-render jahannamida" qolishi mumkin. U komponent render bo'lgandan so'ng bajarilishi kerak bo'lgan qo'shimcha ishlarni (yon ta'sirlar / side effects) boshqarish uchun ishlatiladi.

Uch xil ishlatilish holati bor:

### 1. Bo'sh massiv bilan (Faqat birinchi marta ishlash - Mount)
\`\`\`jsx
useEffect(() => {
  console.log("Faqat komponent ekranga chiqqanda 1 marta ishlaydi");
}, []); // <== Bo'sh qaramlik massivi (dependency array)
\`\`\`

### 2. Qiymatga bog'liq holatda (Qayta ishlash - Update)
\`\`\`jsx
useEffect(() => {
  console.log(\`Count qiymati \${count} ga o'zgardi\`);
}, [count]); // <== faqat 'count' o'zgargandagina ishlaydi
\`\`\`

### 3. Cleanup funksiyasi bilan (Tozalash - Unmount)
Agar siz \`setInterval\` yoki event listener ochgan bo'lsangiz, komponent o'chib ketayotganda ularni tozalashingiz shart, aks holda xotira oqishi (memory leak) sodir bo'ladi.
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => console.log('Tik-tok'), 1000);
  
  // Cleanup (tozalovchi) funksiya
  return () => {
    clearInterval(timer); // Komponent yopilganda taymerni to'xtatamiz
  };
}, []);
\`\`\`

---

## 5. 🗺️ Router va Eski Switch Xatosi

Ko'p sahifali ilova (SPA) yaratish uchun **React Router** ishlatiladi. Eng ko'p tarqalgan kutubxona bu \`react-router-dom\`.

### react-router-dom v6
Hozirgi kunda v6 ishlatiladi va unda sahifalar \`Routes\` va \`Route\` komponentlari yordamida yoziladi:
\`\`\`jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

> [!WARNING]
> **Tez-tez uchraydigan xato:** Agar siz eski (v5 gacha bo'lgan) maqolalar yoki videolardan o'rganayotgan bo'lsangiz u yerda \`Switch\` komponenti ishlatilgan bo'lishi mumkin. StackOverflow'da ko'pchilik qiynaladigan **"Switch is not exported from react-router-dom"** xatosi aynan shu tufayli kelib chiqadi. **v6 da \`Switch\` butunlay olib tashlangan va uning o'rniga \`Routes\` ishlatiladi.**
`,
  exercises: [
    {
      id: 1,
      title: "Komponent yaratish",
      instruction: "React yordamida `function Greeting() { return <h1>Salom</h1>; }` funksional komponentini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "function Greeting() { return <h1>Salom</h1>; }",
      test: "if (code.includes('function Greeting') && code.includes('<h1>Salom</h1>')) return null; return 'Greeting komponentini to\\'g\\'ri yozing';"
    },
    {
      id: 2,
      title: "useState orqali qiymatni yangilash",
      instruction: "`count` holati (state) va `setCount` yangilovchi funksiyasini 0 boshlang'ich qiymat bilan `useState` yordamida e'lon qiling.",
      startingCode: "import { useState } from 'react';\n\nfunction Counter() {\n  // Bu yerga yozing\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n",
      hint: "const [count, setCount] = useState(0);",
      test: "if (code.includes('const [count, setCount] = useState(0)')) return null; return 'useState sintaksisida xatolik!';"
    },
    {
      id: 3,
      title: "useEffect: Mount",
      instruction: "useEffect yordamida komponent faqat birinchi marta (mount bo'lganda) ishga tushishi uchun bo'sh dependency array bilan konsolga 'Mount' so'zini chiqaring.",
      startingCode: "import { useEffect } from 'react';\n\nfunction App() {\n  // Bu yerga yozing\n\n  return <div>Salom</div>;\n}\n",
      hint: "useEffect(() => { console.log('Mount'); }, []);",
      test: "if (code.includes('useEffect') && code.includes('[]') && code.includes('Mount')) return null; return 'useEffect bo\\'sh massiv [] bilan yozilishi kerak';"
    },
    {
      id: 4,
      title: "useEffect: Cleanup",
      instruction: "useEffect ichida taymer (timer) yarating va uni tozalovchi (cleanup) funksiya orqali qaytaring.",
      startingCode: "import { useEffect } from 'react';\n\nfunction Timer() {\n  // Bu yerga yozing\n  return <div>Vaqt ketdi</div>;\n}\n",
      hint: "useEffect(() => { const timer = setInterval(() => {}, 1000); return () => clearInterval(timer); }, []);",
      test: "if (code.includes('return () =>') || code.includes('return function')) return null; return 'Tozalovchi (cleanup) funksiyani qaytarishni unutmang';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "React ning asosiy falsafasi qaysi javobda to'g'ri ko'rsatilgan?",
      "options": [
        "Bu HTML ni JavaScript ichida tezroq yozishga yordam beruvchi oddiy plagin",
        "Bu ma'lumotlar bazasi va serverni bog'lovchi to'liq framework",
        "Bu deklarativ yondashuv va Virtual DOM ga asoslangan UI kutubxonasi",
        "Bu CSS stillarini osonlashtiruvchi vosita"
      ],
      "correctAnswer": 2,
      "explanation": "React shunchaki HTML yozish vositasi emas, balki Virtual DOM va Declarative yondashuv asosida tezkor UI yaratish kutubxonasidir."
    },
    {
      "id": 2,
      "question": "Virtual DOM ning maqsadi nima?",
      "options": [
        "Saytni oflayn ishlashini ta'minlash",
        "Faqat haqiqiy o'zgargan mayda qismlarni topib (diffing), og'ir real DOM bilan kamroq ishlash orqali tezlikni oshirish",
        "Brauzerni butunlay yangidan ishga tushirish",
        "Ma'lumotlar bazasida xotira ajratish"
      ],
      "correctAnswer": 1,
      "explanation": "Real DOM o'zgarishlarga juda sekin javob beradi. Virtual DOM dagi hisoblash tezroq va qulayroq."
    },
    {
      "id": 3,
      "question": "`const [text, setText] = useState('Salom')` kodidagi `setText` nima vazifa bajaradi?",
      "options": [
        "Bu shunchaki oddiy o'zgaruvchi",
        "Bu text qiymatini ekranga chiqaruvchi funksiya",
        "Bu holatni (state qiymatini) yangilovchi va komponentni re-render (qayta chizish) qiluvchi funksiya",
        "Bu HTML tagi hisoblanadi"
      ],
      "correctAnswer": 2,
      "explanation": "setText funksiyasi holat qiymatini o'zgartiradi va komponentni shu yangi qiymat bilan qayta ishga tushirib ekranni yangilaydi."
    },
    {
      "id": 4,
      "question": "useEffect-da abadiy re-render (infinite loop) jahannamiga qanday qilib tushib qolish mumkin?",
      "options": [
        "Kodni xato yozib qo'ysa",
        "useEffect ichida holatni yangilaydigan (state update) funksiyani dependency array-siz chaqirib qo'yilsa",
        "Bo'sh massiv yozilsa",
        "Cleanup funksiya yozilmasa"
      ],
      "correctAnswer": 1,
      "explanation": "Agar useEffect ichida state yangilansa, komponent qayta chiziladi va useEffect yana ishga tushib ketma-ket (abadiy) zanjir hosil qiladi."
    },
    {
      "id": 5,
      "question": "useEffect bo'sh qaramlik massivi (dependency array `[]`) bilan yozilsa qachon ishlaydi?",
      "options": [
        "Har bir marta render bo'lganda",
        "Faqat birinchi marta ekranga chiqqanda (Mount qilinganda)",
        "Komponent o'chib ketayotganda",
        "Umuman ishlamaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Bo'sh massiv React-ga bu side-effect faqatgina boshlang'ich yuklanishda kerakligini, uning hech qanday state-ga qaram emasligini bildiradi."
    },
    {
      "id": 6,
      "question": "useEffect ichida `return () => {}` (cleanup funksiya) qachon chaqiriladi?",
      "options": [
        "Dastur ishga tushganda",
        "Komponent ekranda yopilayotganda (Unmount) yoki uning qaramligi (dependency) o'zgarganda eski holatni tozalash uchun",
        "Tugma bosilganda",
        "Hech qachon chaqirilmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Cleanup funksiyasi keraksiz bo'lib qolgan interval, event-listenerlarni tozalash (xotira tejamkorligi) uchun ishlatiladi."
    },
    {
      "id": 7,
      "question": "React Router v6 da eski versiyalardagi `Switch` o'rniga nima ishlatiladi?",
      "options": [
        "Router",
        "Link",
        "Navigate",
        "Routes"
      ],
      "correctAnswer": 3,
      "explanation": "v6 da Switch olib tashlangan, shuning uchun 'Switch is not exported' xatosi chiqmasligi uchun o'rniga Routes ishlatiladi."
    },
    {
      "id": 8,
      "question": "Props haqidagi qaysi fikr to'g'ri?",
      "options": [
        "Ular komponent ichida erkin o'zgartirilishi mumkin",
        "Ular tashqaridan beriladigan o'zgartirib bo'lmaydigan (read-only) qiymatlar",
        "Ular faqat funksiyalarga tegishli",
        "Props ishlatish hozirgi kunda eskirgan"
      ],
      "correctAnswer": 1,
      "explanation": "Komponentlarga tashqaridan uzatilgan Props o'zgarmasdir. Agar o'zgarish kerak bo'lsa, state ishlatilishi shart."
    },
    {
      "id": 9,
      "question": "React-da holat qachon ishlatiladi?",
      "options": [
        "Ilova rangi o'zgarganda",
        "Vaqt o'tishi bilan o'zgarishi va UI da ko'rinishi kerak bo'lgan ma'lumotlar uchun",
        "Dastur nomini saqlash uchun",
        "Faqat hisoblagich (counter) yasash uchun"
      ],
      "correctAnswer": 1,
      "explanation": "State ilovaning joriy 'eslab qoluvchi xotirasi' bo'lib, o'zgarishi interfeysga darhol ta'sir qiladigan har qanday joyda qo'llaniladi."
    },
    {
      "id": 10,
      "question": "Declarative (Deklarativ) yondashuv nima?",
      "options": [
        "HTML ni to'g'ridan to'g'ri JavaScript orqali qo'lda DOM dan qidirib o'zgartirish (masalan document.getElementById)",
        "React-ga interfeys qanday ko'rinishda bo'lishini (natijani) aytish va qolgan hamma DOM operatsiyalarni unga ishonish",
        "CSS stillari yozish usuli",
        "Hech qanday funksiya yozmaslik"
      ],
      "correctAnswer": 1,
      "explanation": "Imperativ yondashuvdan farqli o'laroq, deklarativ kod nima qilish kerakligiga emas, natija qanday ko'rinishiga qaratilgan."
    },
    {
      "id": 11,
      "question": "Komponent nima?",
      "options": [
        "Tizimdagi ma'lumotlar bazasi",
        "Mustaqil va qayta ishlatilishi mumkin bo'lgan interfeysning (UI) kichik bir bo'lagi (Lego o'yinchog'i kabi)",
        "JavaScript dagi qattiq aylanma xatosi",
        "Kutubxona turi"
      ],
      "correctAnswer": 1,
      "explanation": "Komponentlar xuddi lego qismlari kabi butun bir UIning mayda qayta ishlatiladigan qurilish bloklaridir."
    },
    {
      "id": 12,
      "question": "React darslarini yoki muammolarini o'rganayotganda xatolikka uchrashning asosiy sababi nima?",
      "options": [
        "Internet yo'qligi",
        "Kompyuter xotirasi to'lishi",
        "Eski versiyalardagi kodlar (masalan React Router v5 dagi Switch) ni hozirgi (v6) versiyalar bilan adashtirib ishlash",
        "JavaScript ishlamay qolishi"
      ],
      "correctAnswer": 2,
      "explanation": "React tez o'suvchi texnologiya bo'lgani uchun eski maqolalar va hozirgi kod standartlari bir-biriga mos kelmasligi odatiy xatodir."
    }
  ]
};

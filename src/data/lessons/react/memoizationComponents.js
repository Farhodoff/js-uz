export const memoizationComponents = {
  id: "memoizationComponents",
  title: "Memoization Components (React.memo)",
  content: `
# Komponentlarni Keshlash: React.memo

Oldingi darsda tushunganimizdek, React'ning oddiy xulq-atvoriga ko'ra: **Agar ota komponent qayta render (re-render) bo'lsa, uning barcha bola komponentlari ham avtomatik qayta render bo'ladi.**

Aksariyat holatlarda bu umuman muammo emas. Lekin agar bola komponent juda og'ir (minglab qatorlar, murakkab grafiklar) bo'lsa-yu, unga kelayotgan ma'lumotlar (props) o'zgarmagan bo'lsa, uni qayta render qilish katta xato hisoblanadi. Shunday paytda biz qahramonimiz — **\`React.memo\`** ni chaqiramiz.

## 1. React.memo nima o'zi?

\`React.memo\` — bu Higher Order Component (HOC), ya'ni komponentni o'rab turuvchi zirx. U bola komponentga kelayotgan Props larni avvalgi Props lar bilan solishtiradi.
- Agar Props o'zgargan bo'lsa -> Komponentni render qiladi.
- Agar Props **O'ZGARMAGAN** bo'lsa -> Render qilishni bekor qiladi va xotirada saqlangan oldingi ko'rinishni (keshni) ko'rsatadi!

\`\`\`javascript
import React, { useState } from 'react';

// Bolani React.memo bilan o'raymiz
const HeavyChild = React.memo(function HeavyChild({ name }) {
  console.log("HeavyChild render bo'ldi!");
  return <div>Bola ismi: {name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Sanoq o'zgarganda Parent re-render bo'ladi... */}
      <button onClick={() => setCount(c => c + 1)}>Sanoq: {count}</button>
      
      {/* ...lekin HeavyChild o'zini re-render QILMAYDI! 
          Chunki uning "name" prop-si umuman o'zgarmadi. */}
      <HeavyChild name="Ali" />
    </div>
  );
}
\`\`\`

## 2. Katta Tuzoq (Pitfall): Obyektlar va Funksiyalar

\`React.memo\` Props larni solishtirganda "Sayoz taqqoslash" (Shallow Compare) dan foydalanadi. U faqat o'zgaruvchining **xotiradagi manziliga (reference)** qaraydi.

Shu sababli, agar siz \`React.memo\` bilan o'ralgan bolaga ota tomondan **Obyekt**, **Massiv** yoki **Funksiya** uzatsangiz, **Memo umuman ishlamay qoladi!** Nega? Chunki ota har safar render bo'lganda yangi funksiya, yangi massiv yaratiladi. Qiymatlari bir xil bo'lsa ham, ularning xotira manzillari boshqa bo'ladi va \`React.memo\` ularni "Yangi narsa keldi" deb o'ylab bolani baribir render qilib yuboradi.

\`\`\`javascript
function Parent() {
  const [count, setCount] = useState(0);

  // MUAMMO: Har renderda person yangi obyekt bo'lib yaraladi
  const person = { name: "Ali", age: 25 }; 
  
  // MUAMMO: Har renderda bu funksiya yangi bo'lib yaraladi
  const handleClick = () => console.log("Bosildi");

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      
      {/* HeavyChild memo bilan o'ralgan bo'lsa ham baribir render bo'laveradi! */}
      <HeavyChild user={person} onClick={handleClick} />
    </div>
  );
}
\`\`\`

**Yechim:** Aynan mana shunday joyda bizga oldingi darsda o'rgangan **\`useMemo\`** va **\`useCallback\`** hooklarimiz yordamga keladi!

\`\`\`javascript
import { useMemo, useCallback } from 'react';

function Parent() {
  // ...
  // Yechim: Obyekt manzilini keshlaymiz
  const person = useMemo(() => ({ name: "Ali", age: 25 }), []);
  
  // Yechim: Funksiya manzilini keshlaymiz
  const handleClick = useCallback(() => console.log("Bosildi"), []);
  // ...
}
\`\`\`

## 3. Qachon ishlatish kerak, qachon yo'q?

Dasturchilar ko'pincha "Kodni tezlashtiraman" deb Hamma narsani \`React.memo\` ga o'rab tashlashadi. Bu **YOMON** amaliyot! Keshlash jarayonining o'zi ham qimmatli ish va xotiradan joy oladi.

**Qachon KERAK EMAS:**
- Oddiy, kichkina HTML qaytaruvchi komponentlarda (\`React.memo\` qiyoslashi render qilishdan ko'ra sekinroq bo'lishi mumkin).
- Uning Props lari rostdan ham tez-tez (har doim) o'zgarib turadigan holatlarda.
- Agar komponentga uning ichida doim o'zgaruvchi children larni \`({ children })\` berayotgan bo'lsangiz.

**Qachon KERAK:**
- Komponent rostdan ham og'ir (Grafiklar, Minglab qatorli jadvallar).
- Ota komponent tez-tez yangilanib turadi, lekin aynan shu bolaning Props lari kamdan-kam o'zgaradi.
  `,
  code: `import React, { useState, useCallback, useMemo } from "react";

// ==========================================
// 1. Bola Komponent (React.memo bilan himoyalangan)
// ==========================================
// React.memo ga e'tibor bering!
const UserCard = React.memo(function UserCard({ user, onAction }) {
  // Ushbu console.log qachon ishlashini kuzatamiz
  console.log(\`UserCard (\${user.name}) qayta render bo'ldi!\`);

  return (
    <div style={{ border: "2px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
      <h4>Ismi: {user.name}</h4>
      <button onClick={() => onAction(user.name)}>Salom berish</button>
    </div>
  );
});

// ==========================================
// 2. Ota Komponent (Parent)
// ==========================================
export default function App() {
  const [text, setText] = useState("");

  // ==========================================
  // XATOLI HOLAT (Memo buzilishi)
  // ==========================================
  // Agar biz obyektni va funksiyani shunday ochiq sotsak, har safar "text" 
  // o'zgarganda App re-render bo'ladi va bular yana boshqatdan yasaladi!
  const badUser = { name: "Anvar (Himoyasiz)" };
  const badAction = (name) => alert("Salom, " + name);

  // ==========================================
  // TO'G'RI HOLAT (Memo himoyalangan)
  // ==========================================
  // Obyekt manzilini saqlab qolish uchun useMemo:
  const goodUser = useMemo(() => ({ name: "Sarvar (Himoyalangan)" }), []);
  
  // Funksiya manzilini saqlab qolish uchun useCallback:
  const goodAction = useCallback((name) => alert("Salom, " + name), []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>React.memo namunasiga xush kelibsiz</h2>
      
      {/* Bu inputga nimadir yozganingizda App komponenti doim re-render bo'ladi */}
      <input 
        placeholder="Shu yerga yozib ko'ring..." 
        value={text} 
        onChange={e => setText(e.target.value)} 
        style={{ padding: '8px', width: '250px' }}
      />
      <p>Siz yozdingiz: {text}</p>
      
      <hr />

      {/* Console'ni oching. Bu komponent har safar yozganingizda qayta ishlayveradi! */}
      <UserCard user={badUser} onAction={badAction} />

      {/* Bu komponent esa qotib turadi, o'zini umuman bekorga qiynamaydi! */}
      <UserCard user={goodUser} onAction={goodAction} />
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "React.memo bilan o'rash",
      description: "Quyida oddiy \`Button\` komponenti berilgan. Uni \`React.memo\` yordamida o'rang, toki unga berilgan \`label\` o'zgarmaguncha u qayta render bo'lmasin.",
      startingCode: `import React from 'react';\n\n// VAZIFA: Quyidagi komponentni React.memo bilan o'rang\nconst Button = ({ label }) => {\n  console.log("Button render:", label);\n  return <button>{label}</button>;\n};\n\nexport default Button;`,
      solution: `import React from 'react';\n\nconst Button = React.memo(({ label }) => {\n  console.log("Button render:", label);\n  return <button>{label}</button>;\n});\n\nexport default Button;`,
      hint: "\`const Button = React.memo(({ label }) => { ... });\` deb yozing."
    },
    {
      id: 2,
      title: "Memo ni buzilishidan saqlash",
      description: "App ichidagi \`list\` massivi har renderda yangi obyekt (massiv) yaratadi va \`ListItem\` (\`React.memo\` dagi) ni bekorga ishlatadi. \`list\` ni \`useMemo\` bilan o'rang.",
      startingCode: `import React, { useState, useMemo } from 'react';\n\nconst ListItem = React.memo(({ items }) => {\n  console.log("List render bo'ldi");\n  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;\n});\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  // VAZIFA: Ushbu qatorni useMemo ga o'rang\n  const list = [1, 2, 3];\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n      <ListItem items={list} />\n    </div>\n  );\n}`,
      solution: `import React, { useState, useMemo } from 'react';\n\nconst ListItem = React.memo(({ items }) => {\n  console.log("List render bo'ldi");\n  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;\n});\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  const list = useMemo(() => [1, 2, 3], []);\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n      <ListItem items={list} />\n    </div>\n  );\n}`,
      hint: "\`const list = useMemo(() => [1, 2, 3], []);\`"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React.memo ning asosiy vazifasi nima?",
      options: [
        "React dagi errorlarni tutish",
        "Komponentni funksionalligini oshirish",
        "Komponentga kirib kelayotgan Props larni avvalgisi bilan solishtirib, agar o'zgarmagan bo'lsa render jarayonini bekor qilib xotiradagi (keshdagi) oynani ko'rsatish",
        "Faqat hooklarni keshlash"
      ],
      correctAnswer: 2,
      explanation: "U shunchaki himoya qalqoni kabi ishlaydi. 'Props o'zgardimi? Yo'qmi? Unda render qilib o'tirma, shundoq ham eskisini berib yubor' deydi."
    },
    {
      id: 2,
      question: "Agar React.memo bilan o'ralgan komponentga ota tomonidan obyekt: { id: 1 } uzatilsa nega memo ishlamay qolishi mumkin?",
      options: [
        "Chunki obyektlar raqamlardan ko'ra sekin ishlagani uchun",
        "React.memo da 'sayoz taqqoslash' (shallow comparison) bo'lgani uchun: har safar ota render bo'lganda u { id: 1 } ni yangi xotira manzilida yaratadi va memo uni 'yangi narsa' deb o'ylaydi",
        "Chunki memo faqat string qabul qiladi",
        "Hech qachon buzilmaydi, obyekt uzatsa doim memo ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript da ikkita bir xil qiymatli obyektni (masalan: {id: 1} === {id: 1}) taqqoslasangiz 'false' chiqadi. Ular xotiraning 2 xil joyida joylashgan. Shuning uchun useMemo kerak."
    },
    {
      id: 3,
      question: "React.memo ni butun loyihadagi HAR BIR komponentga o'rab chiqqan ma'qulmi?",
      options: [
        "Ha, shunda ilova eng yuqori tezlikda ishlaydi",
        "Yo'q! Bu ahmoqlik. Keshlash (taqqoslash) ning o'zi oddiy renderdan ko'ra qimmatroq (sekinroq) bo'lishi mumkin. Faqatgina qotib ishlashi kuzatilgan og'ir komponentlargagina qo'yiladi.",
        "Ha, faqat Redux ishlatsangiz"
      ],
      correctAnswer: 1,
      explanation: "Performance optimizatsiyasi xuddi dori kabidir. Uni kerakli paytda va joyida ishlatish darkor, ortiqchasi kasallik (sekinlashish) chaqiradi."
    },
    {
      id: 4,
      question: "useMemo va React.memo ning o'xshashlik/farqi nima?",
      options: [
        "Hech qanday farqi yo'q, ikkalasi ham bir xil ish qiladi",
        "useMemo qiymatni/hisobni keshlaydigan HOOK, React.memo esa butun boshli komponentni keshlaydigan HOC (Higher Order Component)",
        "React.memo faqat class komponentlar uchun, useMemo faqat function komponentlar uchun",
        "Ikkisi ham faqat funksiyalarni keshlaydi"
      ],
      correctAnswer: 1,
      explanation: "Ular bir xil ishning (keshlash) qismlari hisoblanadi. Birinchisi o'zgaruvchilar va ifodalar uchun bo'lsa, ikkinchisi qat'iy ravishda React komponentlari uchun."
    }
  ]
};

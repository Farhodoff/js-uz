export const refImperative = {
  id: "refImperative",
  title: "Ref, forwardRef va useImperativeHandle",
  content: `
# Reflar bilan chuqurroq ishlash

Biz avvalroq \`useRef\` hook'i asosan DOM elementlariga to'g'ridan-to'g'ri ulanish uchun ishlatilishini o'rgangan edik (masalan, \`inputRef.current.focus()\`). Biroq, uning vazifasi faqat shundan iborat emas. Ushbu darsda \`useRef\` ning "yashirin" kuchi, shuningdek \`forwardRef\` va noyob hook \`useImperativeHandle\` haqida gaplashamiz.

## 1. useRef: O'zgarmas Xotira (Mutable Storage)

Tasavvur qiling, sizga shunday o'zgaruvchi kerakki:
1. Uning qiymati o'zgarganda **komponent qayta render bo'lmasin** (re-render ni xohlamaymiz).
2. Komponent qayta render bo'lgan taqdirda ham, u o'z ichidagi **avvalgi qiymatini yo'qotmasdan saqlab qolsin**.

Bunday holatlarda \`useState\` ham, oddiy \`let\` o'zgaruvchi ham yordam bermaydi. \`useState\` re-render qilib yuboradi, \`let\` esa har renderda tozalanib (qayta yaratilib) ketadi. **Aynan shuning uchun bizga \`useRef\` kerak!**

\`\`\`javascript
import { useRef, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  // Interval ID ni saqlash uchun Ref ishlatamiz.
  // U o'zgargani bilan ekranda hech narsa o'zgarmasligi kerak.
  const timerId = useRef(null);

  const startTimer = () => {
    // Agar oldindan taymer yonsa, 2 ta bo'lib ketmasligi uchun
    if (timerId.current) return; 
    
    timerId.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  return (
    <div>
      <p>Sanoq: {seconds}</p>
      <button onClick={startTimer}>Boshlash</button>
      <button onClick={stopTimer}>To'xtatish</button>
    </div>
  );
}
\`\`\`

> **Qoida:** Ekranda ko'rsatiladigan va dizaynga bevosita ta'sir qiladigan ma'lumotlar uchun doim \`useState\` ishlating. Orqa fonda ishlaydigan taymerlar, oldingi state'ni saqlab qolish kabi yashirin ma'lumotlar uchun esa \`useRef\` ishlating.

## 2. forwardRef: Bolaga Ref uzatish

Odatda React'da komponentlarga (masalan \`<CustomInput ref={inputRef} />\`) ref uzatsangiz xato yuz beradi. Chunki funksional komponentlarda Ref qabul qilish qobiliyati yo'q. Bunga ruxsat berish uchun biz bola komponentni \`forwardRef\` funksiyasi bilan o'rashimiz kerak.

\`\`\`javascript
import { forwardRef, useRef } from 'react';

// Bolaga ref yetib kelishi uchun forwardRef ishlatdik
const CustomInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} style={{ border: '2px solid blue' }} />;
});

function Parent() {
  const inputRef = useRef();

  return (
    <div>
      {/* Endi bemalol ref ni uzata olamiz! */}
      <CustomInput ref={inputRef} placeholder="Matn kiriting" />
      <button onClick={() => inputRef.current.focus()}>Fokus qilish</button>
    </div>
  );
}
\`\`\`

## 3. useImperativeHandle: Qat'iy nazorat

Tasavvur qiling, siz \`<CustomInput>\` komponentingizni butun loyiha bo'ylab tarqatgansiz. Siz uni ishlatadigan boshqa dasturchilar \`inputRef.current\` orqali bevosita butun HTML DOM elementga ulana olishini xohlamaysiz. (Chunki DOM ni to'g'ridan-to'g'ri o'zgartirish xavfli).
Buning o'rniga siz ularga faqat o'zingiz xohlagan aniq funksiyalarnigina (\`focus\`, \`clear\`) taqdim etmoqchisiz.

Aynan shu ishni **\`useImperativeHandle\`** hook'i bajaradi!

\`\`\`javascript
import { forwardRef, useImperativeHandle, useRef } from 'react';

const SecureInput = forwardRef((props, ref) => {
  // Haqiqiy inputga ulanuvchi ichki ref
  const internalRef = useRef();

  // Ota komponentga aynan nimalarni ko'rsatishni hal qilamiz
  useImperativeHandle(ref, () => {
    return {
      // Ota komponent faqat mana shu metodlarni chaqira oladi
      focus: () => {
        internalRef.current.focus();
      },
      clearValue: () => {
        internalRef.current.value = "";
      }
    };
  }, []);

  return <input ref={internalRef} {...props} />;
});

function App() {
  const myRef = useRef();

  const handleClear = () => {
    // Endi myRef.current bu butun input DOM element EMAS!
    // U biz yuqorida qaytargan kichkina obyekt: { focus: fn, clearValue: fn }
    myRef.current.clearValue();
  };

  return (
    <div>
      <SecureInput ref={myRef} />
      <button onClick={handleClear}>Tozalash</button>
    </div>
  );
}
\`\`\`

### Xulosa:
- **\`useRef\`** => DOM'ga ulanish YOKI re-rendersiz yashirin qiymatlarni saqlash.
- **\`forwardRef\`** => Ota komponentdan yuborilgan \`ref\` ni bola komponent ichkarisiga kiritish (uzatish).
- **\`useImperativeHandle\`** => Bola komponent \`ref\` orqali ota komponentga nimalar ko'rsatishini nazorat qilish va cheklash.
  `,
  code: `import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";

// ==========================================
// 1. Bola Komponent (forwardRef va useImperativeHandle bilan)
// ==========================================
const ModalForm = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();

  // Ota komponentga faqat shu ikkita metodni "taqdim" etamiz
  useImperativeHandle(ref, () => {
    return {
      openModal: () => {
        setIsOpen(true);
        // Ochildi deguncha darhol fokusni inputga qaratamiz
        setTimeout(() => inputRef.current?.focus(), 100);
      },
      closeModal: () => {
        setIsOpen(false);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div style={{
      border: "2px solid #000", padding: "20px", marginTop: "20px", background: "#f9f9f9"
    }}>
      <h3>Maxfiy Modal Oyna</h3>
      <input ref={inputRef} placeholder="Ismingizni kiriting..." />
      <button onClick={() => setIsOpen(false)} style={{ marginLeft: "10px" }}>
        Ichkaridan yopish
      </button>
    </div>
  );
});

// ==========================================
// 2. Ota Komponent (App)
// ==========================================
export default function App() {
  // Bu ref ModalForm orqali qaytgan maxsus metodlarni saqlaydi
  const modalRef = useRef();
  const renders = useRef(0);

  // useRef ishlatilgani uchun bu hech qanday qayta-renderni keltirib chiqarmaydi
  renders.current++;

  return (
    <div style={{ padding: "20px" }}>
      <h2>useImperativeHandle va useRef namunasiga</h2>
      <p>Bu sahifa necha marta render bo'ldi: <strong>{renders.current}</strong></p>
      
      {/* 
        Ota komponent bola state'ini (isOpen) umuman bilmaydi!
        Lekin useImperativeHandle orqali taqdim etilgan metodlar orqali uni ocha oladi.
      */}
      <button onClick={() => modalRef.current.openModal()} style={{ background: "lightgreen" }}>
        Modalni ochish
      </button>

      <button onClick={() => modalRef.current.closeModal()} style={{ background: "pink", marginLeft: "10px" }}>
        Modalni yopish
      </button>

      {/* Bolaga ref ni beramiz */}
      <ModalForm ref={modalRef} />
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "useRef orqali avvalgi qiymatni saqlash",
      description: "Quyida \`count\` state bor. \`useRef\` dan foydalanib \`prevCount\` ni yarating va har safar \`count\` o'zgarganda \`useEffect\` orqali eski count ni ref ga saqlang.",
      startingCode: `import React, { useState, useEffect, useRef } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  // VAZIFA: prevCountRef nomli ref oching\n\n  useEffect(() => {\n    // VAZIFA: count ning hozirgi qiymatini prevCountRef.current ga saqlang\n  }, [count]);\n\n  return (\n    <div>\n      <p>Hozirgi: {count}</p>\n      {/* VAZIFA: Eski qiymatni bu yerga chiqaring (prevCountRef.current) */}\n      <p>Eski: </p>\n      <button onClick={() => setCount(c => c + 1)}>Oshirish</button>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useEffect, useRef } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  const prevCountRef = useRef(0);\n\n  useEffect(() => {\n    prevCountRef.current = count;\n  }, [count]);\n\n  return (\n    <div>\n      <p>Hozirgi: {count}</p>\n      <p>Eski: {prevCountRef.current}</p>\n      <button onClick={() => setCount(c => c + 1)}>Oshirish</button>\n    </div>\n  );\n}`,
      hint: "\`useEffect\` render tugagandan keyin ishlagani uchun, birinchi navbatda HTML ga eski qiymat chiqadi, keyin u fonda yangilanib qoladi."
    },
    {
      id: 2,
      title: "forwardRef ni to'g'ri ishlatish",
      description: "Bizning \`<CustomButton>\` komponentimizga \`ref\` uzatilmoqda lekin xatolik beryapti. Komponentni \`forwardRef\` ga o'rang.",
      startingCode: `import React, { useRef, forwardRef } from 'react';\n\n// VAZIFA: Ushbu komponentni forwardRef ichiga oling\nconst CustomButton = ({ title }, ref) => {\n  return <button ref={ref} className="btn">{title}</button>;\n};\n\nexport default function App() {\n  const btnRef = useRef();\n  return <CustomButton ref={btnRef} title="Bosing" />;\n}`,
      solution: `import React, { useRef, forwardRef } from 'react';\n\nconst CustomButton = forwardRef(({ title }, ref) => {\n  return <button ref={ref} className="btn">{title}</button>;\n});\n\nexport default function App() {\n  const btnRef = useRef();\n  return <CustomButton ref={btnRef} title="Bosing" />;\n}`,
      hint: "\`const CustomButton = forwardRef(({ title }, ref) => { ... });\` deb yoziladi."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nima sababdan ba'zi o'zgaruvchilarni saqlashda useState o'rniga useRef ishlatiladi?",
      options: [
        "Chunki useRef ma'lumotlarni tezroq qayta ishlaydi",
        "Chunki useState faqat raqamlarni qabul qiladi",
        "Chunki useRef dagi qiymat o'zgarganda komponent qayta render bo'lmaydi va xotira tejaladi",
        "Bu ikki hook o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 2,
      explanation: "UI (HTML) da ko'rinmaydigan, lekin fonda ishlab turuvchi (masalan timer ID lar) uchun useRef ishlatiladi chunki ular o'zgarganda sahifa yangilanishi mantiqsizlikdir."
    },
    {
      id: 2,
      question: "forwardRef nima ish qiladi?",
      options: [
        "Referencelarni orqaga qaytaradi",
        "Oddiy funksional komponentga tashqaridan ref qabul qilib olib, uni o'z ichidagi dom elementga yo'naltirishga ruxsat beradi",
        "Redux bilan ulanishni ta'minlaydi",
        "DOM ni avtomatik animatsiya qiladi"
      ],
      correctAnswer: 1,
      explanation: "Odatda custom komponentlar (<MeningInputim />) o'ziga 'ref' propini qabul qilolmaydi. Buni ochish uchun uni forwardRef bilan o'rash kerak."
    },
    {
      id: 3,
      question: "useImperativeHandle hook'i nimaga xizmat qiladi?",
      options: [
        "Komponentning tezligini oshiradi",
        "Zustand o'rniga holatni boshqaradi",
        "Ota komponent 'ref' orqali ulanayotganda, butun DOM ni emas, faqat biz ruxsat bergan aniq metodlarnigina ko'rsatishni nazorat qiladi",
        "Dasturdagi xatolarni ushlab qoladi"
      ],
      correctAnswer: 2,
      explanation: "useImperativeHandle xavfsizlik (encapsulation) qavatidir. U ota komponentga faqat o'zimiz xohlagan 'API' ni ko'rsatishga imkon beradi (masalan: faqat .play() va .pause())."
    },
    {
      id: 4,
      question: "useRef dagi qiymat o'zgardimi yo'qmi bilishning yagona yo'li qaysi?",
      options: [
        "Unda onClick ishlatish",
        "ref.current manziliga murojaat qilish",
        "useEffect orqali kuzatish",
        "Uni console.log qilib ko'rish"
      ],
      correctAnswer: 1,
      explanation: "useRef har doim { current: initialValue } ko'rinishidagi obyekt qaytaradi. Uning yangi qiymati aynan .current maydoniga yoziladi."
    }
  ]
};

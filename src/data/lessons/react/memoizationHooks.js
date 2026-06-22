export const memoizationHooks = {
  id: "memoizationHooks",
  title: "Memoization: useMemo va useCallback",
  content: `
# Memoization: useMemo va useCallback

React'da **Memoization** (keshlash / yodlab qolish) deb ataluvchi tushuncha dastur tezligi (performance) ni oshirish uchun ishlatiladigan maxsus jarayondir. Bu jarayon asosan ikki dona hook orqali boshqariladi: \`useMemo\` va \`useCallback\`.

## 1. Muammo nima o'zi?

React qanday ishlashini eslaylik: Qachonki komponentdagi *State* yoki unga kelayotgan *Props* o'zgarsa, ushbu komponent o'zini to'liq qayta render (re-render) qiladi. 
Re-render paytida komponent ichidagi **barcha qatorlar boshqatdan o'qiladi, barcha funksiyalar va o'zgaruvchilar boshqatdan (yangi xotira manzili bilan) yaratiladi.**

Bu ikki xil muammoni keltirib chiqarishi mumkin:
1. **Og'ir hisob-kitoblar qotib qolishi:** Agar sizda minglab elementlarni filtrlovchi funksiya bo'lsa, u har bir harf yozilganda boshqatdan ishlayveradi.
2. **Bolalarni bekorga render qilish:** Agar siz bola-komponentga (Child) prop sifatida funksiya uzatsangiz, ota-komponent render bo'lganda funksiya "yangi" deb hisoblanadi va bola-komponent ham bekorga o'zini yangilaydi.

## 2. useMemo: Qiymatlarni (Value) Keshlash

\`useMemo\` funksiyasi biron bir og'ir hisob-kitob natijasini (qiymatni) eslab qolish uchun ishlatiladi.

\`\`\`javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');

  // OGOHLANTIRISH: Bu funksiya har renderda qayta-qayta ishlaydi!
  // const sortedItems = items.sort((a, b) => a - b); 

  // YECHIM: useMemo ishlatamiz. 
  // Endi u faqat "items" massivi o'zgargandagina qayta ishlaydi.
  const sortedItems = useMemo(() => {
    console.log("Og'ir hisob kitob qilinmoqda...");
    return items.sort((a, b) => a - b);
  }, [items]); // Dependency array

  return (
    <div>
      <input onChange={e => setFilter(e.target.value)} />
      {/* sortedItems ekranga chiqariladi */}
    </div>
  );
}
\`\`\`

## 3. useCallback: Funksiyalarni Keshlash

\`useCallback\` xuddi \`useMemo\` ga o'xshaydi, lekin u qiymatni emas, balki **funksiyaning xotiradagi (reference) o'rnini** saqlab qoladi. Asosan funksiyani \`React.memo\` bilan o'ralgan bola komponentlarga uzatayotganda qo'llaniladi.

\`\`\`javascript
import { useState, useCallback } from 'react';

function Parent() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  // Muammo: text o'zgarganda Parent re-render bo'ladi.
  // increment funksiyasi qayta yaratiladi va Child ga "yangi" bo'lib boradi.
  // Child bekorga qayta render bo'ladi!

  // Yechim: useCallback
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Bo'sh massiv, demak bu funksiya hecham o'zgarmaydi

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Child onIncrease={increment} />
    </div>
  );
}
\`\`\`

> **Muhim farq:** 
> \`useMemo(() => fn, deps)\`  = O'sha funksiyani **ishga tushirib**, natijasini eslab qoladi.
> \`useCallback(fn, deps)\` = Funksiyaning **o'zini** ishlashga tayyor holida eslab qoladi.

## 4. Oltin Qoida: Qachon ISHLATMASLIK kerak?

Kodni "optimallashtiraman" deb har bir o'zgaruvchiga \`useMemo\` va har bir funksiyaga \`useCallback\` yozib tashlash katta xatodir! Chunki bu hook'larning o'zi ham xotiradan (memory) qo'shimcha joy oladi.

**Qachon KERAK EMAS:**
- Oddiy a+b qo'shish yoki kichik massivdagi amallarda (\`useMemo\` zarari foydasidan ko'proq bo'ladi).
- Bola komponentlar \`React.memo()\` bilan o'ralmagan bo'lsa (\`useCallback\` dan foyda yo'q).

**Qachon KERAK:**
- Hisob-kitob rostdan ham sezilarli darajada (ms) vaqt olayotgan bo'lsa.
- \`useEffect\` ning dependency qatoriga obyekt, massiv yoki funksiya uzatilayotganda (cheksiz loopni oldini olish uchun).
  `,
  code: `import React, { useState, useMemo, useCallback } from "react";

// 1. Bola komponent (React.memo yordamida o'ralgan)
// React.memo bu komponentni faqat props o'zgargandagina render qiladi
const ExpensiveChild = React.memo(({ title, onClick }) => {
  console.log(\`Child (\${title}) render bo'ldi!\`);
  return <button onClick={onClick} style={{ margin: "5px" }}>{title}</button>;
});

export default function MemoizationDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ==========================================
  // 2. useMemo namunasiga (Og'ir hisoblash)
  // ==========================================
  const complexValue = useMemo(() => {
    console.log("Juda katta hisob-kitob bajarilmoqda...");
    let result = 0;
    // Sun'iy ravishda og'ir tsikl yaratamiz
    for (let i = 0; i < 100000000; i++) {
      result += i;
    }
    // Bu faqat count o'zgargandagina qayta hisoblanadi!
    return result + count;
  }, [count]);


  // ==========================================
  // 3. useCallback namunasiga
  // ==========================================
  // Oddiy funksiya (Har renderda yangi obyekt bo'lib yaraladi)
  const handleNormalClick = () => {
    console.log("Oddiy tugma bosildi");
  };

  // Keshlangan funksiya (Bir marta xotiraga yoziladi)
  const handleMemoizedClick = useCallback(() => {
    console.log("Keshlangan tugma bosildi", count);
  }, [count]); // Count o'zgargandagina bu funksiya yangilanadi

  return (
    <div style={{ padding: "20px" }}>
      <h2>Memoization (useMemo & useCallback)</h2>
      
      {/* 
        Bu inputga yozganingizda faqat shu komponent render bo'ladi,
        lekin 'complexValue' qayta hisoblanmaydi! (Chunki u count ga bog'langan)
      */}
      <input 
        placeholder="Nimadir yozing..."
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <p>Yozilgan matn: {text}</p>
      
      <p>Sanoq: {count}</p>
      <p>Og'ir hisob-kitob natijasi: {complexValue}</p>

      <button onClick={() => setCount(c => c + 1)}>Sanoqni oshirish</button>

      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
        {/* Console.log ni kuzating! */}
        <ExpensiveChild 
          title="Men har safar yozganingizda render bo'laman :(" 
          onClick={handleNormalClick} 
        />
        
        <ExpensiveChild 
          title="Men o'zgarmayman!" 
          onClick={handleMemoizedClick} 
        />
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "useMemo orqali massivni keshlash",
      description: "Quyida kattagina massiv ichidan maxsus so'zni qidiruvchi (filter) mantiq bor. Agar biz inputga boshqa narsa yozsak ham u qayta ishlamoqda. Uni faqat \`filterWord\` o'zgarganda ishlaydigan qilib \`useMemo\` yordamida himoyalang.",
      startingCode: `import React, { useState, useMemo } from 'react';\n\nconst hugeArray = Array.from({length: 1000}, (_, i) => "So'z " + i);\n\nexport default function App() {\n  const [text, setText] = useState('');\n  const [filterWord, setFilterWord] = useState('');\n\n  // VAZIFA: Quyidagi qatorni useMemo ichiga oling. \n  // Faqat filterWord o'zgarganda ishlasin.\n  const filtered = hugeArray.filter(w => w.includes(filterWord));\n\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} placeholder="Oddiy yozuv..." />\n      <input value={filterWord} onChange={e => setFilterWord(e.target.value)} placeholder="Qidirish..." />\n      <p>Topildi: {filtered.length}</p>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useMemo } from 'react';\n\nconst hugeArray = Array.from({length: 1000}, (_, i) => "So'z " + i);\n\nexport default function App() {\n  const [text, setText] = useState('');\n  const [filterWord, setFilterWord] = useState('');\n\n  const filtered = useMemo(() => {\n    return hugeArray.filter(w => w.includes(filterWord));\n  }, [filterWord]);\n\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} placeholder="Oddiy yozuv..." />\n      <input value={filterWord} onChange={e => setFilterWord(e.target.value)} placeholder="Qidirish..." />\n      <p>Topildi: {filtered.length}</p>\n    </div>\n  );\n}`,
      hint: "\`const filtered = useMemo(() => hugeArray.filter(...), [filterWord]);\` deb yozing."
    },
    {
      id: 2,
      title: "useCallback orqali o'chirish funksiyasini keshlash",
      description: "Bizda bolaga berilayotgan \`handleDelete\` funksiyasi bor. Uni \`useCallback\` yordamida o'rang, tokim komponent render bo'lganda funksiya reference'i o'zgarmasin.",
      startingCode: `import React, { useState, useCallback } from 'react';\n\nexport default function Parent() {\n  const [count, setCount] = useState(0);\n\n  // VAZIFA: Ushbu funksiyani useCallback ichiga oling\n  const handleDelete = () => {\n    console.log("O'chirildi!");\n  };\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n      <Child onDelete={handleDelete} />\n    </div>\n  );\n}\n\nconst Child = React.memo(({ onDelete }) => {\n  console.log("Child render!");\n  return <button onClick={onDelete}>O'chirish</button>;\n});`,
      solution: `import React, { useState, useCallback } from 'react';\n\nexport default function Parent() {\n  const [count, setCount] = useState(0);\n\n  const handleDelete = useCallback(() => {\n    console.log("O'chirildi!");\n  }, []); // Hech narsaga bog'liq emas, bo'sh massiv\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n      <Child onDelete={handleDelete} />\n    </div>\n  );\n}\n\nconst Child = React.memo(({ onDelete }) => {\n  console.log("Child render!");\n  return <button onClick={onDelete}>O'chirish</button>;\n});`,
      hint: "\`const handleDelete = useCallback(() => { ... }, []);\` shaklida yozing."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "useMemo va useCallback ning asosiy maqsadi nima?",
      options: [
        "React dagi kodlarni chiroyliroq qilish",
        "Backend ga so'rovlarni tezlashtirish",
        "Bekorchi hisob-kitoblar va re-renderlarni oldini olib, komponentlar ishlash tezligini (performance) oshirish",
        "React versiyasini yangilash"
      ],
      correctAnswer: 2,
      explanation: "Ular React dagi performance optimizatsiyasining (tezlashtirish) eng asosiy vositalaridir."
    },
    {
      id: 2,
      question: "useMemo va useCallback o'rtasidagi eng aniq farq qaysi?",
      options: [
        "Hech qanday farqi yo'q, ular bir narsa",
        "useMemo natija (qiymat) ni qaytaradi va keshlaydi, useCallback esa funksiyaning o'zini keshlaydi",
        "useCallback faqat klass komponentlarda ishlaydi",
        "useMemo faqat obyektlar uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "useMemo(() => fn()) funksiyani bajarib chiqqan 'natijani' oladi. useCallback(fn) esa aynan o'sha 'funksiyani' o'zini qaytaradi."
    },
    {
      id: 3,
      question: "Nima uchun hamma narsani useMemo ga o'rab tashlash maslahat berilmaydi?",
      options: [
        "Chunki bu xato beradi",
        "Chunki useMemo o'zgaruvchilarni String ga aylantirib qo'yadi",
        "Chunki useMemo o'z ishini bajarish uchun xotiradan qo'shimcha joy va vaqt talab qiladi. Oddiy vazifalarda u asl koddan ko'ra sekinroq ishlashi mumkin.",
        "Chunki u boshqa hooklarni ishlamay qoldiradi"
      ],
      correctAnswer: 2,
      explanation: "Performance optimizatsiyasi (keshlash) qimmat operatsiyadir. U qachonki hisob-kitob rostdan ham og'ir bo'lsagina o'zini oqlaydi."
    },
    {
      id: 4,
      question: "Agar bola komponent <React.memo> bilan o'ralmagan bo'lsa, useCallback ishlatishdan foyda bormi?",
      options: [
        "Ha, baribir tezlashtiradi",
        "Yo'q, chunki bola komponent prop o'zgarmasa ham doim ota komponent bilan birga re-render bo'laveradi",
        "React.memo endi eskirdi",
        "Qisman foyda bor"
      ],
      correctAnswer: 1,
      explanation: "Ota komponent re-render bo'lsa, agar bola React.memo bilan o'ralmagan bo'lsa, prop lari (hatto keshlangan bo'lsa ham) nima ekanligidan qat'iy nazar qayta render bo'laveradi."
    }
  ]
};

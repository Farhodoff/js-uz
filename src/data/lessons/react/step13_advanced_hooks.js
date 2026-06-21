export const step13_advanced_hooks = {
  id: 'step13_advanced_hooks',
  title: "13. Ilg'or Hooklar va Optimizatsiya",
  content: `
# React'da Ilg'or Hooklar va Optimizatsiya

React juda tez ishlaydi, lekin ilovamiz kattalashgan sari, biz ba'zi unumsiz jarayonlarni nazorat qilishimiz kerak. "Re-render" (qayta chizish) - bu React'ning asosi, lekin agar u keraksiz joyda va og'ir hisob-kitoblar bilan yuz bersa, dasturimiz sekinlashadi.

Ushbu bo'limda biz React'ni optimizatsiya qiluvchi ilg'or hooklar bilan tanishamiz: \\\`useRef\\\`, \\\`useMemo\\\`, \\\`useCallback\\\`, \\\`React.memo\\\` va \\\`useLayoutEffect\\\`.

---

## 1. useRef: Ekran orqasidagi "Maxfiy Quti"

Tasavvur qiling, sizda shaxsiy qutingiz bor. Uning ichiga nima solsangiz ham, tashqaridagi odamlar buni sezmaydi va xonani qayta bezatishga hojat qolmaydi. Aynan shu narsa \\\`useRef\\\` hisoblanadi.

\\\`useState\\\` qiymati o'zgarganda React butun komponentni boshqatdan o'qib chiqadi (re-render). \\\`useRef\\\` esa shunchaki xotirada saqlanadigan ob'ektdir. Uning qiymati o'zgarsa ham, komponent re-render **bo'lmaydi**.

### Ikkita asosiy ishlatilish joyi:
1. **DOM elementlariga bevosita kirish:** Oddiy JavaScript'da \\\`document.getElementById\\\` qilganingiz kabi.
2. **Re-renderlarsiz ma'lumot saqlash:** Timer (interval) ID lari, oldingi (previous) qiymatlar kabi vaqtinchalik xotira sifatida.

\\\`\\\`\\\`mermaid
graph TD
    A["Component Render"] --> B{"Ma'lumot qayerda saqlanadi?"}
    B -- useState --> C["Qiymat o'zgarsa: RE-RENDER yuz beradi"]
    B -- useRef --> D["Qiymat o'zgarsa: RE-RENDER yuz BERMAYDI"]
    D --> E("Faqat xotirada saqlanadi yoki DOMga ulanadi")
\\\`\\\`\\\`

> **Qoida:** Agar ma'lumot UI (ekran) da ko'rinishi kerak bo'lsa, \\\`useState\\\` ishlating. Agar u faqat ichki hisob-kitob yoki qandaydir elementni ushlab turish uchun kerak bo'lsa, \\\`useRef\\\` ishlating.

---

## 2. useMemo: Qimmatli Kesh (Memoization)

Tasavvur qiling, qahvaxonaga kelib murakkab va tayyorlanishi qiyin qahva so'radingiz. Bunga 10 daqiqa ketdi. Agar siz har safar shu qahvani so'rasangiz va barista har gal noldan yasadimi, bu ko'p vaqt oladi. Yaxshisi, barista tayyor qahvani "keshlab" (eslab) qolib, siz yana so'raganda darhol tayyorini bergani ma'qul.

\\\`useMemo\\\` xuddi shunday ishlaydi: u og'ir (qimmatbaho) hisob-kitob natijasini xotirada eslab qoladi. Funksiya faqat unga berilgan "qaramliklar" (dependency array) o'zgargandagina boshqatdan hisoblaydi.

\\\`\\\`\\\`javascript
// useMemo - qimmat hisob-kitob natijasini xotirada saqlaydi (keshlaydi).
// Bu funksiya ichidagi mantiq faqat qaramliklar array'i ([]) o'zgargandagina qayta ishlaydi.
const expensiveResult = useMemo(() => {
  // Og'ir yoki ko'p vaqt oladigan amal (masalan filtrlash yoki katta sikl)
  console.log("Juda uzoq hisoblanmoqda...");
  // Natija qaytariladi va \\\`expensiveResult\\\` ga o'zlashtiriladi
  return [1, 2, 3, 4, 5].filter(num => num > 2);
}, []); // Qaramliklar yo'q, faqat komponent birinchi marta chizilganda (mount) bir marta hisoblanadi
\\\`\\\`\\\`

> **Ehtiyot bo'ling!** Hamma narsani ham \\\`useMemo\\\` bilan o'rayvermang. Xotira tekin emas! Keshga saqlashning o'zi ham qanchadir xarajat (vaqt va xotira). Uni faqat o'ta murakkab sikllar, og'ir filtrlash yoki massivlar bilan ishlaganda qo'llang.

---

## 3. useCallback: Funksiyalar uchun Kesh

JavaScript'da ob'ektlar va funksiyalar xotira manzili (referans) orqali solishtiriladi. Ikkita bir xil matnli funksiya yaratilganda, kompyuter ularni ikki xil turli narsa deb biladi.
React komponenti har safar qayta chizilganda, uning ichidagi barcha funksiyalar noldan, yangi xotira manzili bilan boshqatdan yaratiladi.

\\\`useCallback\\\` esa qimmatbaho funksiyaning **O'ZINI** keshlab qoladi (uni har renderda qayta yaratmaydi).

\\\`\\\`\\\`javascript
// Har safar komponent re-render (qayta chizilgan) bo'lganda YANGI funksiya (yangi xotira manzili bilan) yaratiladi:
const handleClick = () => console.log('Salom');

// useCallback funksiyaning O'ZINI xotirada eslab qoladi (keshlaydi).
// Faqat qaramliklar o'zgarganda yangi funksiya yaratiladi, aks holda doim ESKISI (keshlangan) funksiya ishlatiladi:
const memoizedClick = useCallback(() => {
  // Bu yerda bajariladigan logika
  console.log('Salom');
}, []); // Bo'sh array - qaramliklar yo'q, demak funksiya faqat bir marta yaratiladi va aslo o'zgarmaydi.
\\\`\\\`\\\`

> **Qachon kerak?** \\\`useCallback\\\` asosan funksiyani **bola komponentga** props qilib berayotganingizda va bola komponentni ortiqcha renderdan saqlamoqchi bo'lganingizda kerak. Oddiy holatlarda buning hojati yo'q.

---

## 4. React.memo: Bola Komponentni Himoya Qilish

Ota komponent o'zgarganda (masalan uning state-i yangilanganda), u barcha bola komponentlarini avtomatik qayta chizadi. Hattoki bolaning propslari mutlaqo o'zgarmagan bo'lsa ham!

\\\`React.memo\\\` - bu himoyachi (qorovul). U bola komponentni o'rab oladi va deydi: "Agar senga kelayotgan propslar aynan oldingi safargidek bo'lsa, sen qayta render bo'lmaysan, o'z joyingda qol!"

\\\`\\\`\\\`javascript
// React.memo - High Order Component (HOC). U komponentni keraksiz re-renderlardan (qayta chizilishlardan) saqlaydi.
const ChildComponent = React.memo(function Child({ text }) {
  // Agar ota komponent re-render bo'lsa ham, lekin \\\`text\\\` props o'zgarmasa,
  // bu Child komponenti qayta chizilmaydi va bu console.log ishlamaydi.
  console.log("Men faqat text o'zgarganda render bo'laman!");
  // Komponentning UI (interfeys) qismi
  return <div>{text}</div>;
});
\\\`\\\`\\\`

*Muhim qoida: Agar siz \\\`ChildComponent\\\` ga ota komponentdan funksiya uzatsangiz, uni albatta \\\`useCallback\\\` orqali keshlab yuboring. Aks holda ota komponent har renderda yangi funksiya yaratadi va \\\`React.memo\\\` buni o'zgarish deb baholab bolani baribir qayta render qiladi.*

---

## 5. useLayoutEffect: Rasmni Ekranga Chiqishidan Oldin Bo'yash

Odatda biz har doim \\\`useEffect\\\` ishlatamiz. U asinxron, ya'ni ekranda o'zgarishlar to'liq foydalanuvchiga ko'rsatilgandan (Paint) **SO'NG** fonda ishga tushadi. Bu ekranning qotib qolmasligi va tez yuklanishi uchun zarur.

Lekin ba'zida element foydalanuvchiga to'liq ko'rinmasdan turib uning o'lchamini (height/width) DOM dan o'qib, shunga qarab nimanidir o'zgartirishimiz kerak. Agar buni \\\`useEffect\\\` da qilsak, foydalanuvchi ekrandagi narsa avval bitta joyda chiqib, keyin darhol boshqa joyga "sakrab" (flicker) o'tganini ko'rib qoladi.

\\\`useLayoutEffect\\\` esa **sinxron**. U DOM hisoblanganidan keyin, lekin brauzer uni bo'yab ekranga chiqarishidan **OLDIN** ishga tushadi.

\\\`\\\`\\\`mermaid
graph TD
    A[React Render - Virtual DOM] --> B[Brauzer DOM Yangilanadi]
    B --> C[useLayoutEffect sinxron ishlaydi]
    C --> D[Brauzer ekranni bo'yaydi - Paint]
    D --> E[useEffect asinxron ishlaydi]
\\\`\\\`\\\`

> **Maslahat:** Har doim standart sifatida \\\`useEffect\\\` dan foydalaning. Agar elementlar ekranda miltillab sakrayotgan (flicker) bo'lsa va ularning aniq o'lchami kerak bo'lsagina \\\`useLayoutEffect\\\` ga o'ting.
  `,
  code: `import React, { useState, useRef, useMemo, useCallback } from 'react';

// React.memo bilan o'ralgan bola komponent
// React.memo - komponentga kelayotgan propslar (onClick, children) o'zgarmasa, uni keraksiz qayta chizilishdan (re-render) saqlaydi
const Button = React.memo(({ onClick, children }) => {
  // Bu xabar faqat onClick funksiyasi yoki children (matn) o'zgargandagina konsolga chiqadi
  console.log("Button render bo'ldi:", children);
  return (
    // Tugma bosilganda onClick props orqali kelgan funksiyani ishga tushiradi
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
      {children}
    </button>
  );
});

export default function AdvancedHooksDemo() {
  // count - komponentdagi hisoblagich holati (state)
  const [count, setCount] = useState(0);
  // text - input maydoniga yozilgan matnni saqlaydigan holat
  const [text, setText] = useState("");
  // inputRef - ma'lum bir DOM elementiga bevosita murojaat qilish uchun ishlatiladigan "ko'rsatkich" (referans)
  const inputRef = useRef(null);

  // useMemo misoli: Katta tsikl (simulyatsiya)
  // useMemo - qimmat va og'ir hisob-kitoblar natijasini keshlaydi (xotirada eslab qoladi).
  const expensiveCalculation = useMemo(() => {
    // Bu kod faqat 'count' o'zgargandagina qaytadan ishlaydi. Inputga matn yozganda esa ishlamaydi!
    console.log("Og'ir hisob-kitob bajarilmoqda...");
    return count * 1000;
  }, [count]); // Qaramlik sifatida faqat 'count' belgilangan

  // useCallback misoli: Funksiyani eslab qolish
  // useCallback - funksiyaning o'zini xotirada eslab qoladi.
  const handleIncrement = useCallback(() => {
    // Holatni yangilashda joriy qiymat (c) ga 1 qo'shish
    setCount(c => c + 1);
  }, []); // qaramliklar yo'q bo'sh array [], ya'ni funksiya faqat dastlabki render vaqtida 1 marta yaratiladi va aslo o'zgarmaydi

  return (
    <div className="p-6 text-black bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ilg'or Hooklar Demo</h2>
      
      {/* useRef qismi */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">1. useRef - Fokus berish</h3>
        <input 
          // inputRef shu input elementiga bog'lanadi (endilikda inputRef.current orqali ushbu input DOM elementiga kira olamiz)
          ref={inputRef} 
          type="text" 
          // text state'i inputning qiymati hisoblanadi (controlled component)
          value={text} 
          // Foydalanuvchi matn yozganda text state'ini yangilaydi, bu esa komponentni re-render qiladi
          onChange={(e) => setText(e.target.value)} 
          className="border border-gray-300 p-2 mr-2 rounded"
          placeholder="Nimadir yozing..."
        />
        <button 
          // Tugma bosilganda inputRef yordamida input elementini topib, unga avtomatik fokus qaratadi
          onClick={() => inputRef.current.focus()} 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Fokus berish
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Matn kiritilganda Input render bo'ladi, lekin useRef uning fokusini boshqarish imkonini beradi.
        </p>
      </div>

      {/* useMemo va useCallback qismi */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">2. useMemo va useCallback</h3>
        <p className="mb-2">Sanoq: <span className="font-bold text-xl">{count}</span></p>
        <p className="mb-4">Qimmat natija (count * 1000): <span className="font-bold">{expensiveCalculation}</span></p>
        
        {/* React.memo qo'llanilgan Button */}
        {/* Biz useCallback orqali keshlab olingan 'handleIncrement' funksiyasini onClick propsiga beryapmiz. */}
        {/* Agar oddiy funksiya bo'lganda, inputga xat yozish kabi har bir renderda bu Button ham re-render bo'lardi! */}
        <Button onClick={handleIncrement}>Oshirish (+1)</Button>
        <p className="text-sm text-gray-500 mt-2">
          Inputga matn yozganingizda tepada o'zgarish bo'ladi, ammo bu Button qayta chizilmaydi, chunki u React.memo va useCallback bilan himoyalangan! Konsolni tekshiring.
        </p>
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: 'useRef: Avtomatik Fokus',
      description: 'Komponent ekranga chiqqanda (mount) darhol inputga fokus bering (kursor input ichida miltillab tursin).',
      startingCode: `import React, { useRef, useEffect } from 'react';\n\nexport default function AutoFocusInput() {\n  // 1. ref yarating\n\n  useEffect(() => {\n    // 2. inputga fokus bering\n  }, []);\n\n  return (\n    <div>\n      {/* 3. ref ni inputga bog'lang */}\n      <input type="text" placeholder="Fokuslanadi..." className="border p-2" />\n    </div>\n  );\n}`,
      solution: `import React, { useRef, useEffect } from 'react';\n\nexport default function AutoFocusInput() {\n  const inputRef = useRef(null);\n\n  useEffect(() => {\n    if (inputRef.current) {\n      inputRef.current.focus();\n    }\n  }, []);\n\n  return (\n    <div>\n      <input ref={inputRef} type="text" placeholder="Fokuslanadi..." className="border p-2" />\n    </div>\n  );\n}`,
      hint: 'useRef() dan foydalaning, uni inputning `ref` iga bering va useEffect ichida `.current.focus()` ni chaqiring.'
    },
    {
      id: 2,
      title: 'useRef: Sekundomer (Timer)',
      description: 'useRef yordamida setInterval ID sini saqlang. Shunday qilingki, "To\'xtatish" tugmasi bosilganda taymer to\'xtasin.',
      startingCode: `import React, { useState, useRef } from 'react';\n\nexport default function Timer() {\n  const [seconds, setSeconds] = useState(0);\n  // interval ID sini saqlash uchun useRef ishlating\n\n  const start = () => {\n    // intervalni boshlang va ID ni ref ga saqlang\n  };\n\n  const stop = () => {\n    // intervalni to'xtating (clearInterval)\n  };\n\n  return (\n    <div>\n      <p>Vaqt: {seconds} s</p>\n      <button onClick={start}>Boshlash</button>\n      <button onClick={stop}>To'xtatish</button>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useRef } from 'react';\n\nexport default function Timer() {\n  const [seconds, setSeconds] = useState(0);\n  const intervalRef = useRef(null);\n\n  const start = () => {\n    if (intervalRef.current !== null) return;\n    intervalRef.current = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n  };\n\n  const stop = () => {\n    clearInterval(intervalRef.current);\n    intervalRef.current = null;\n  };\n\n  return (\n    <div>\n      <p>Vaqt: {seconds} s</p>\n      <button onClick={start} className="bg-green-500 p-2 text-white mr-2">Boshlash</button>\n      <button onClick={stop} className="bg-red-500 p-2 text-white">To'xtatish</button>\n    </div>\n  );\n}`,
      hint: 'setInterval dan qaytgan ID ni state ga emas, useRef.current ga saqlash kerak. Bu keraksiz renderlarning oldini oladi.'
    },
    {
      id: 3,
      title: 'useRef: Oldingi qiymat (Previous State)',
      description: 'Foydalanuvchi inputga yozayotgan joriy qiymat va uning eski (oldingi renderdagi) qiymatini ekranga chiqaring.',
      startingCode: `import React, { useState, useEffect, useRef } from 'react';\n\nexport default function PreviousValue() {\n  const [text, setText] = useState("");\n  // oldingi qiymat uchun ref yarating\n\n  useEffect(() => {\n    // har safar text o'zgarganda ref ni yangilang\n  }, [text]);\n\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <p>Hozirgi: {text}</p>\n      <p>Oldingi: {/* ref qiymatini ko'rsating */}</p>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useEffect, useRef } from 'react';\n\nexport default function PreviousValue() {\n  const [text, setText] = useState("");\n  const prevTextRef = useRef("");\n\n  useEffect(() => {\n    prevTextRef.current = text;\n  }, [text]);\n\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} className="border p-1" />\n      <p>Hozirgi: {text}</p>\n      <p>Oldingi: {prevTextRef.current}</p>\n    </div>\n  );\n}`,
      hint: 'useEffect ekranga chizib bo\'lingach ishlaydi. Shuning uchun useEffect ichida ref.current = text qilsak, ekranda o\'sha paytdagi eskirgan qymat qoladi.'
    },
    {
      id: 4,
      title: 'useMemo: Katta hisoblash',
      description: 'Natijani useMemo orqali keshlang. Agar `num` o\'zgarmasa, "Hisoblanmoqda..." degan xabar konsolga chiqmasligi kerak.',
      startingCode: `import React, { useState, useMemo } from 'react';\n\nexport default function Expensive() {\n  const [num, setNum] = useState(10);\n  const [dark, setDark] = useState(false);\n\n  // buni useMemo bilan o'rang\n  const double = (() => {\n    console.log("Hisoblanmoqda...");\n    return num * 2;\n  })();\n\n  return (\n    <div style={{ background: dark ? '#333' : '#FFF', color: dark ? '#FFF' : '#000' }}>\n      <input type="number" value={num} onChange={e => setNum(parseInt(e.target.value))} />\n      <button onClick={() => setDark(!dark)}>Temani o'zgartirish</button>\n      <p>{double}</p>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useMemo } from 'react';\n\nexport default function Expensive() {\n  const [num, setNum] = useState(10);\n  const [dark, setDark] = useState(false);\n\n  const double = useMemo(() => {\n    console.log("Hisoblanmoqda...");\n    return num * 2;\n  }, [num]);\n\n  return (\n    <div style={{ background: dark ? '#333' : '#FFF', color: dark ? '#FFF' : '#000', padding: '20px' }}>\n      <input type="number" value={num} onChange={e => setNum(parseInt(e.target.value))} className="text-black border" />\n      <button onClick={() => setDark(!dark)} className="ml-2 border p-1 text-black">Temani o'zgartirish</button>\n      <p>{double}</p>\n    </div>\n  );\n}`,
      hint: 'useMemo dan foydalaning va qaramliklar ro\'yxatiga (dependency array) faqatgina [num] ni bering.'
    },
    {
      id: 5,
      title: 'useMemo: Ro\'yxatni filtrlash',
      description: 'Massivdan faqat qidiruvga (search) mos keladigan mevalarni filtrlang va bu jarayonni keshlang.',
      startingCode: `import React, { useState, useMemo } from 'react';\n\nconst fruits = ["Olma", "Banan", "Apelsin", "Gilos", "Nok", "Anor"];\n\nexport default function FilterFruits() {\n  const [search, setSearch] = useState("");\n  const [count, setCount] = useState(0);\n\n  // useMemo bilan o'rang\n  const filteredFruits = fruits.filter(f => f.toLowerCase().includes(search.toLowerCase()));\n\n  return (\n    <div>\n      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidiruv..." />\n      <button onClick={() => setCount(c => c + 1)}>Render ({count})</button>\n      <ul>{filteredFruits.map(f => <li key={f}>{f}</li>)}</ul>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useMemo } from 'react';\n\nconst fruits = ["Olma", "Banan", "Apelsin", "Gilos", "Nok", "Anor"];\n\nexport default function FilterFruits() {\n  const [search, setSearch] = useState("");\n  const [count, setCount] = useState(0);\n\n  const filteredFruits = useMemo(() => {\n    return fruits.filter(f => f.toLowerCase().includes(search.toLowerCase()));\n  }, [search]);\n\n  return (\n    <div>\n      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidiruv..." className="border p-1" />\n      <button onClick={() => setCount(c => c + 1)} className="ml-2 bg-gray-200 p-1">Render ({count})</button>\n      <ul className="mt-2">{filteredFruits.map(f => <li key={f}>{f}</li>)}</ul>\n    </div>\n  );\n}`,
      hint: 'useMemo ichidagi callback filter amalini bajarsin va faqat `[search]` ga qaram bo\'lsin. Render tugmasi bosilganda filter qayta ishlamaydi.'
    },
    {
      id: 6,
      title: 'useCallback: Oddiy kesh',
      description: 'increment funksiyasini useCallback orqali keshlab yuboring, shunda u har renderda noldan yaratilmasin.',
      startingCode: `import React, { useState, useCallback } from 'react';\n\nexport default function CallbackExample() {\n  const [count, setCount] = useState(0);\n  const [text, setText] = useState("");\n\n  // useCallback qo'shing\n  const increment = () => {\n    setCount(c => c + 1);\n  };\n\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <p>Count: {count}</p>\n      <button onClick={increment}>Oshirish</button>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useCallback } from 'react';\n\nexport default function CallbackExample() {\n  const [count, setCount] = useState(0);\n  const [text, setText] = useState("");\n\n  const increment = useCallback(() => {\n    setCount(c => c + 1);\n  }, []);\n\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} className="border p-1" />\n      <p>Count: {count}</p>\n      <button onClick={increment} className="bg-blue-500 text-white p-2 rounded">Oshirish</button>\n    </div>\n  );\n}`,
      hint: 'useCallback ni o\'rash: `useCallback(() => { ... }, [])`. setCount funksiyasi doimo o\'zgarmas ekanligini unutmang.'
    },
    {
      id: 7,
      title: 'useCallback qaramliklar bilan',
      description: 'Funksiya `step` o\'zgaruvchisiga qaram bo\'lishi kerak. useCallback dependency array iga `step` ni qo\'shing.',
      startingCode: `import React, { useState, useCallback } from 'react';\n\nexport default function StepCounter() {\n  const [count, setCount] = useState(0);\n  const [step, setStep] = useState(1);\n\n  // useCallback ni to'g'rilang\n  const increment = useCallback(() => {\n    setCount(c => c + step);\n  }, []);\n\n  return (\n    <div>\n      <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} />\n      <p>Count: {count}</p>\n      <button onClick={increment}>+{step} qo'shish</button>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useCallback } from 'react';\n\nexport default function StepCounter() {\n  const [count, setCount] = useState(0);\n  const [step, setStep] = useState(1);\n\n  const increment = useCallback(() => {\n    setCount(c => c + step);\n  }, [step]);\n\n  return (\n    <div>\n      <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} className="border p-1" />\n      <p>Count: {count}</p>\n      <button onClick={increment} className="bg-blue-500 text-white p-1">+{step} qo'shish</button>\n    </div>\n  );\n}`,
      hint: 'Agar dependency array [] bo\'lsa, funksiya har doim eng birinchi `step` (ya\'ni 1) ni eslab qoladi. Unga [step] bering.'
    },
    {
      id: 8,
      title: 'React.memo bilan o\'rash',
      description: 'Message bola komponentini React.memo bilan o\'rang, shunda ota komponentdagi hisoblagich o\'zgarganda bola render bo\'lmaydi.',
      startingCode: `import React, { useState } from 'react';\n\n// buni React.memo bilan o'rang\nconst Message = ({ text }) => {\n  console.log("Message render bo'ldi");\n  return <p>{text}</p>;\n};\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>Render {count}</button>\n      <Message text="Salom Dunyo" />\n    </div>\n  );\n}`,
      solution: `import React, { useState, memo } from 'react';\n\nconst Message = memo(({ text }) => {\n  console.log("Message render bo'ldi");\n  return <p className="font-bold">{text}</p>;\n});\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)} className="bg-green-500 p-2 text-white">Render {count}</button>\n      <Message text="Salom Dunyo" />\n    </div>\n  );\n}`,
      hint: 'const Message = React.memo(({ text }) => { ... }) usulida foydalaning.'
    },
    {
      id: 9,
      title: 'React.memo + useMemo (Ob\'ektlar)',
      description: 'Ota komponent bolaga ob\'ekt uzatmoqda. Ob\'ekt har renderda yangilanmasligi uchun uni useMemo bilan o\'rang.',
      startingCode: `import React, { useState, useMemo } from 'react';\n\nconst UserProfile = React.memo(({ user }) => {\n  console.log("User render bo'ldi");\n  return <div>{user.name} - {user.age}</div>;\n});\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  \n  // buni useMemo bilan o'rang\n  const userInfo = { name: "Ali", age: 25 };\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>Render {count}</button>\n      <UserProfile user={userInfo} />\n    </div>\n  );\n}`,
      solution: `import React, { useState, useMemo } from 'react';\n\nconst UserProfile = React.memo(({ user }) => {\n  console.log("User render bo'ldi");\n  return <div className="border p-2 mt-2">{user.name} - {user.age}</div>;\n});\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  \n  const userInfo = useMemo(() => ({\n    name: "Ali", age: 25\n  }), []);\n\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)} className="bg-purple-500 p-2 text-white">Render {count}</button>\n      <UserProfile user={userInfo} />\n    </div>\n  );\n}`,
      hint: 'const userInfo = useMemo(() => ({ name: "Ali", age: 25 }), []); Ob\'ektni qaytarishda qavslarga `({})` e\'tibor bering.'
    },
    {
      id: 10,
      title: 'useLayoutEffect: DOM o\'lchamlarini olish',
      description: 'useEffect ni useLayoutEffect ga o\'zgartiring, shunda element ekranga chiqishidan oldin balandligi olinadi.',
      startingCode: `import React, { useState, useRef, useEffect } from 'react';\n\nexport default function BoxMeasurer() {\n  const [height, setHeight] = useState(0);\n  const boxRef = useRef(null);\n\n  // buni useLayoutEffect ga o'zgartiring\n  useEffect(() => {\n    if (boxRef.current) {\n      setHeight(boxRef.current.getBoundingClientRect().height);\n    }\n  }, []);\n\n  return (\n    <div>\n      <div ref={boxRef} style={{ height: '150px', background: 'lightblue' }}>Box</div>\n      <p>Box balandligi: {height}px</p>\n    </div>\n  );\n}`,
      solution: `import React, { useState, useRef, useLayoutEffect } from 'react';\n\nexport default function BoxMeasurer() {\n  const [height, setHeight] = useState(0);\n  const boxRef = useRef(null);\n\n  useLayoutEffect(() => {\n    if (boxRef.current) {\n      setHeight(boxRef.current.getBoundingClientRect().height);\n    }\n  }, []);\n\n  return (\n    <div>\n      <div ref={boxRef} style={{ height: '150px', background: 'lightblue' }}>Meni o'lcha</div>\n      <p className="mt-2 font-bold">Box balandligi: {height}px</p>\n    </div>\n  );\n}`,
      hint: 'Faqatgina `useEffect` ismini `useLayoutEffect` ga almashtiring.'
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "useRef ning useState dan asosiy farqi nima?",
      options: [
        "useRef faqat matn saqlaydi",
        "useRef o'zgarganda komponent re-render bo'lmaydi",
        "useState DOM bilan bevosita ishlash uchun",
        "Farqi yo'q, ikkalasi bir xil ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "useRef dagi .current qiymati yangilanganda React hech qachon komponentni boshqatdan chizmaydi (re-render qilmaydi)."
    },
    {
      id: 2,
      question: "useRef yordamida qanday qilib DOM elementiga bog'lanish mumkin?",
      options: [
        "Elementga id='ref' berib",
        "Elementning ref={myRef} propertysiga uzatib",
        "document.getElementById yordamida",
        "useEffect ichida to'g'ridan to'g'ri chaqirib"
      ],
      correctAnswer: 1,
      explanation: "Reactda DOM elementga murojaat qilish uchun u elementga `ref={myRef}` ko'rinishida useRef hook natijasi bog'lanadi."
    },
    {
      id: 3,
      question: "useRef orqali saqlangan ma'lumot qayerda turadi?",
      options: [
        "Brauzerning LocalStorage xotirasida",
        "useRef obyektining .current xossasida (propertysida)",
        "useState kabi avtomatik tarzda state ichida",
        ".value xossasida"
      ],
      correctAnswer: 1,
      explanation: "useRef har doim `{ current: initialValue }` shaklidagi obyekt qaytaradi va ma'lumot .current ichida saqlanadi."
    },
    {
      id: 4,
      question: "useMemo nima uchun ishlatiladi?",
      options: [
        "Funksiyaning o'zini kesh qilish uchun",
        "Komponentni re-renderdan saqlash uchun",
        "Qimmat va og'ir hisob-kitob natijalarini xotirada saqlash uchun",
        "DOM o'lchamlarini olish uchun"
      ],
      correctAnswer: 2,
      explanation: "useMemo funksiya QAYTARGAN NATIJANI eslab qolish va uni har renderda boshqatdan hisoblamaslik uchun kerak."
    },
    {
      id: 5,
      question: "Nima uchun hamma narsani useMemo bilan o'rash yomon amaliyot (bad practice) hisoblanadi?",
      options: [
        "Chunki bu xatolikka olib keladi",
        "Keshga saqlashning o'zi ham xotira va ma'lum resurs talab qiladi, kichik hisoblar uchun bu ortiqcha",
        "Chunki useMemo faqatgina bitta marta ishlaydi",
        "Bu React dasturini qulashiga olib keladi"
      ],
      correctAnswer: 1,
      explanation: "Kesh xotira cheklangan va uni boshqarish kompyuterdan kuch talab qiladi. Shuning uchun faqat haqiqiy og'ir hisoblardagina useMemo ishlatiladi."
    },
    {
      id: 6,
      question: "useCallback va useMemo ning asosiy farqi nimada?",
      options: [
        "useMemo funksiyani qaytaradi, useCallback natijani",
        "useCallback funksiyani o'zini qaytaradi, useMemo esa funksiya ishga tushgandagi natijani",
        "Ikkalasi ham bir xil, farqi nomida",
        "useCallback faqat klass komponentlarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "useCallback o'rab olingan funksiyaning o'zini manzilini saqlab beradi. useMemo esa ichidagi funksiyani ishga tushirib, natijani saqlaydi."
    },
    {
      id: 7,
      question: "React.memo qanday vazifani bajaradi?",
      options: [
        "Ota komponentni renderdan saqlaydi",
        "Barcha hooklarni keshlaydi",
        "Bola komponentga kelayotgan propslar o'zgarmasa, uni keraksiz qayta render bo'lishidan saqlaydi",
        "State o'zgarishini bloklaydi"
      ],
      correctAnswer: 2,
      explanation: "React.memo High Order Component (HOC) bo'lib, komponentni keraksiz re-renderlardan himoya qilish (propslarni solishtirish) orqali ishlaydi."
    },
    {
      id: 8,
      question: "React.memo ishlatilgan komponentga ota komponentdan oddiy o'ralmagan (keshlanmagan) funksiya berilsa nima bo'ladi?",
      options: [
        "React.memo ajoyib ishlayveradi",
        "Komponent baribir har renderda qayta chiziladi, chunki funksiya manzili har safar o'zgaradi",
        "Xatolik (Error) yuz beradi",
        "Funksiya avtomatik ravishda useCallback bilan o'raladi"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda har renderda yangi funksiya yaratiladi va React.memo buni 'yangi props keldi' deb o'ylab, bolani baribir render qiladi."
    },
    {
      id: 9,
      question: "useEffect va useLayoutEffect ning qaysi biri birinchi ishga tushadi?",
      options: [
        "useEffect",
        "useLayoutEffect",
        "Ikkalasi bir vaqtda",
        "Komponentga bog'liq"
      ],
      correctAnswer: 1,
      explanation: "useLayoutEffect DOM yangilangach, lekin brauzer ekranni chizishidan (paint) darhol oldin sinxron tarzda ishga tushadi."
    },
    {
      id: 10,
      question: "Nima sababdan odatda useLayoutEffect o'rniga useEffect ishlatiladi?",
      options: [
        "useEffect tezroq",
        "useLayoutEffect sinxron bo'lgani uchun og'ir ishlarda brauzerni qotirib, ekranga chiqishini kechiktirishi mumkin",
        "useLayoutEffect ni yozish qiyinroq",
        "useEffect faqat matn bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "useLayoutEffect ishini tugatmagunicha brauzer ekranni chizishni kutib turadi (render blocking). Shuning uchun uni ehtiyotkorlik bilan faqat DOM o'lchash kabi o'ta zarur joyda ishlatish kerak."
    },
    {
      id: 11,
      question: "Element ekranda pirpirab (flicker qilib) sakrayotgan bo'lsa qaysi hook yordam berishi mumkin?",
      options: [
        "useState",
        "useMemo",
        "useLayoutEffect",
        "useCallback"
      ],
      correctAnswer: 2,
      explanation: "Flickering ning sababi element ekranga chiqqandan keyin o'zgarishidir. useLayoutEffect uni ekranga chiqmasdan oldin to'g'rilab olish imkonini beradi."
    },
    {
      id: 12,
      question: "useCallback hooki ikkinchi argument sifatida nima qabul qiladi?",
      options: [
        "State",
        "Qaramliklar ro'yxati (dependency array)",
        "Boshqa funksiya",
        "Component"
      ],
      correctAnswer: 1,
      explanation: "Xuddi useEffect va useMemo kabi, useCallback ham qaramliklar ro'yxatini (`[]`) kutadi. Bu array ichidagi o'zgaruvchilar o'zgarsagina, funksiya qayta yaratiladi."
    }
  ]
};

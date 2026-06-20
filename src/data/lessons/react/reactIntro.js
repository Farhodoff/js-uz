export const reactIntro = {
  title: "Virtual DOM va Reconciliation",
  content: `
# 1. 💡 Sodda Tushuntirish: Virtual DOM nima o'zi?

Tasavvur qiling, siz katta bir restoranning bosh oshpazisiz. Mijozlar har soniyada buyurtma (ovqat ro'yxati) berishadi.
Agar har safar yangi buyurtma tushganda, siz butun oshxonadagi hamma ovqatlarni to'kib tashlab, noldan boshlasangiz (Real DOM), bu qanchalik ko'p vaqt va energiya yo'qotishiga olib keladi?
Buning o'rniga, siz yordamchingizga (Virtual DOM) buyurtmalar ro'yxatini berasiz. U avvalgi buyurtma bilan yangisini taqqoslaydi (Diffing) va sizga faqat **nima o'zgargan bo'lsa**, shuni pishirishni aytadi.

React qanday ishlaydi:
* **Haqiqiy DOM (Real DOM):** Brauzerning HTML daraxti. Uni o'zgartirish juda sekin va qimmat amal.
* **Virtual DOM:** React xotirasidagi Real DOM'ning aynan nusxasi (lekin shunchaki yengil JS obyekti). Uni o'zgartirish juda tez!

---

## 2. ⚙️ Reconciliation (Qayta kelishuv) jarayoni

React interfeysni yangilashda quyidagi qadamlarni bajaradi:

1. **Render Phase (Chizish bosqichi):** State yoki Props o'zgarganda, React yangi Virtual DOM daraxtini yaratadi.
2. **Diffing (Solishtirish):** Yangi Virtual DOM daraxtini eski Virtual DOM daraxti bilan solishtiradi. Ushbu solishtirish algoritmi $O(n)$ murakkablikka ega (boshqa freymvorklarda bu ancha sekin bo'lishi mumkin edi).
3. **Commit Phase (Tatbiq etish bosqichi):** Faqatgina o'zgargan tugunlar (elementlar) Haqiqiy DOM'ga biriktiriladi. Boshqa hech narsaga tegilmaydi!

### Fiber Architecture (React 16+)
Kapot ostida React qanday qilib ishni tezlashtiradi? React 16 dan boshlab yangi yadro (engine) — **React Fiber** ishga tushgan.
Bu mexanizm yordamida React "og'ir" ishlarni bo'laklarga bo'lib bajarishi mumkin (interruptible rendering). Masalan, agar siz inputga matn yozayotgan bo'lsangiz (yuqori prioritet), React ro'yxatni chizishni (past prioritet) biroz to'xtatib turib, avval harfni ekranda ko'rsatadi, so'ngra qolgan ishini davom ettiradi. Bu sayt qotib qolmasligini ta'minlaydi.

---

## 3. 📊 Oqim Diagrammasi (Workflow)

\`\`\`mermaid
graph TD
    A[State yoki Props o'zgarishi] -->|Render chaqiriladi| B(Yangi Virtual DOM yaratiladi)
    B --> C{Diffing Algoritmi}
    C -->|Eski vDOM bilan solishtiriladi| D(O'zgarishlar farqi topiladi)
    D -->|Commit Phase| E[Haqiqiy DOM yangilanadi]
    E --> F((Foydalanuvchiga<br>ko'rinadi))
    
    style B fill:#3498db,stroke:#2980b9,color:#fff
    style D fill:#e67e22,stroke:#d35400,color:#fff
    style E fill:#2ecc71,stroke:#27ae60,color:#fff
\`\`\`

---

## 4. 💬 Intervyu Savollari

1. **Virtual DOM va Real DOM farqi nimada?**
   *Javob:* Real DOM – bu brauzerdagi haqiqiy tugunlar, ularni o'zgartirish juda sekin va layout hisob-kitoblarini (reflow/repaint) talab qiladi. Virtual DOM esa shunchaki JS obyektidir, xotirada tez yangilanadi. React bu ikkisi o'rtasidagi farqni topib, Real DOM'ga minimal o'zgarishni kiritadi.
2. **React Fiber nima vazifa bajaradi?**
   *Javob:* Bu React 16+ da paydo bo'lgan yangi algoritm. Uning asosiy vazifasi rendering jarayonini pauza qilish, to'xtatish yoki bekor qilish imkonini berishdir. Shuningdek, u ustuvorliklarni belgilaydi (masalan, animatsiyalar yoki input typing yuqori prioritetda bajariladi).
3. **Diffing algoritmi qanday ishlaydi?**
   *Javob:* U ikki darajali shart asosida tekshiradi: 1) Element turlari (types) xilma-xilligi (masalan \`<div>\` o'rniga \`<span>\` kelsa, eski daraxtni o'chirib, noldan chizadi). 2) Xuddi o'sha turdagi element bo'lsa, ularning faqat atributlari va \`key\` xususiyatlari solishtiriladi.
`,
  code: `import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(["Olma", "Anor", "Nok"]);

  const updateFirstItem = () => {
    // Virtual DOM diffing uchun zo'r misol:
    // Bu yerda faqatgina "Olma" so'zi "Uzum"ga o'zgaradi.
    // Qolgan "Anor" va "Nok" DOM'da qayta chizilmaydi, ularga tegilmaydi!
    const newList = [...list];
    newList[0] = "Uzum";
    setList(newList);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Virtual DOM qanday ishlaydi?</h2>
      
      {/* 1-Qism: Yuqori prioritetli vazifa */}
      <div style={{ marginBottom: 20 }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Yozishga urinib ko'ring..."
          style={{ padding: 8, width: 200 }}
        />
        <p>Siz yozdingiz: <strong>{text}</strong></p>
      </div>

      {/* 2-Qism: Pastroq prioritetli list */}
      <button 
        onClick={updateFirstItem} 
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Birinchi mevani o'zgartirish
      </button>

      <ul style={{ marginTop: 15 }}>
        {list.map((item, index) => (
          <li key={index} style={{ padding: 5, borderBottom: '1px solid #ddd' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Virtual DOM va React.createElement",
      instruction: "React kapot ostida har qanday JSX'ni `React.createElement` ga o'zgartiradi. Ushbu vazifada oddiy `<div>Salom</div>` yaratadigan funksiyani yozing. (JSX ishlata olmaysiz, faqat klassik React metodidan foydalaning).",
      startingCode: "import React from 'react';\n\nexport default function NativeComponent() {\n  // JSX o'rniga React.createElement ishlating\n  return null;\n}",
      hint: "return React.createElement('div', null, 'Salom');",
      test: "if (!code.includes('createElement')) return 'React.createElement metodidan foydalaning!'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React'ning Virtual DOM ishlash prinsipida qanday algoritm muhim o'rin tutadi?",
      options: [
        "Bubble Sort",
        "Diffing Algorithm",
        "Binary Search",
        "Hash Map"
      ],
      correctAnswer: 1,
      explanation: "React yangi va eski Virtual DOM daraxtlarini solishtirish uchun O(n) murakkablikdagi Diffing Algoritmidan foydalanadi."
    },
    {
      question: "React Fiber'ning asosiy vazifasi nima?",
      options: [
        "React ilovasining hajmini kamaytirish",
        "Kodni siqish (minify)",
        "Rendering ishlarini bo'laklarga bo'lish va ustuvorlik berish (interruptible rendering)",
        "Redux bilan to'g'ridan-to'g'ri bog'lanish"
      ],
      correctAnswer: 2,
      explanation: "React Fiber engine renderingni pauza qila oladi, shuning uchun brauzer qotib qolmaydi."
    }
  ]
};

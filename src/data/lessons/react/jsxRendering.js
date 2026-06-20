export const jsxRendering = {
  title: "JSX va Rendering",
  content: `
# 1. 💡 JSX o'zi nima?

**JSX (JavaScript XML)** — bu JavaScript kodining ichida HTML kabi ko'rinuvchi sintaksis yozish imkonini beruvchi vositadir. 
Dastlab ko'rganingizda u HTML ga o'xshaydi, lekin kapot ostida bu oddiy JavaScript funksiyalariga (ya'ni \`React.createElement\`) aylantiriladi. Babel (yoki shunga o'xshash kompilyator) bu o'girishni amalga oshiradi.

Nega aynan JSX?
Oldinlari dizayn (HTML) va mantiq (JS) alohida fayllarda yozilardi. Ammo React falsafasiga ko'ra, UI komponentlari qanday ko'rinishi va qanday ishlashi o'zaro juda bog'liq. Shu sababli, React ularni bitta "Komponent" ichida birlashtirishni tavsiya qiladi.

---

## 2. ⚙️ Rendering vs Committing (O'ta muhim mavzu)

Ko'pchilik dasturchilar "render" deganda o'zgarishlarning ekranda ko'rinishini tushunishadi. Aslida React'da bu uch xil bosqichga bo'lingan:

### 1. Render Phase (Chizish bosqichi)
* Bu bosqichda React komponentlaringizni (funksiyangizni) chaqiradi. 
* Olingan JSX natijasidan yangi Virtual DOM daraxtini (Fiber Tree) shakllantiradi.
* **Juda muhim:** Bu bosqichda hech qanday Real DOM o'zgarishi sodir bo'lmaydi! Bu toza (pure) va nojo'ya ta'sirlarsiz (side-effect free) bo'lishi kerak.

### 2. Commit Phase (Tatbiq etish bosqichi)
* Render bosqichida topilgan farqlar (diffs) endi ketma-ket Real DOM'ga o'tkaziladi.
* React tugunlarni yaratadi (create), yangilaydi (update) yoki o'chiradi (delete).

### 3. Browser Paint (Brauzerning chizishi)
* Real DOM yangilangandan so'ng, brauzer o'zining "Paint" (chizish) mexanizmini ishga tushiradi va biz ekranda o'zgarishni ko'ramiz.

---

## 3. 🔁 Re-render Shartlari: Komponent qachon qayta chiziladi?

Komponentlarning takroran \`Render Phase\` ga tushishi **Re-render** deyiladi. U faqat quyidagi 3 holatda sodir bo'ladi:

1. **State o'zgarganda:** \`useState\` yoki \`useReducer\` dagi setter funksiyasi chaqirilib, yangi qiymat berilganda.
2. **Prop'lar o'zgarganda:** Ota komponentdan kelayotgan ma'lumotlar o'zgarsa, bola komponent ham qayta chiziladi.
3. **Ota komponent re-render bo'lsa:** Agar ota komponent re-render bo'lsa, React odatda barcha bola komponentlarni ham tekshirib (render qilib) chiqadi. Bu jarayonni to'xtatish uchun \`React.memo\` ishlatiladi.

*Eslatma:* Agar \`useState\` yordamida obyekt yoki massivni aynan eski havola (reference) bilan bersangiz (mutatsiya), React uni o'zgarmadi deb hisoblaydi va re-render **qilmaydi**. Shuning uchun har doim yangi obyekt yaratish \`{...obj}\` zarur!

---

## 4. 📊 Rendering Oqimi

\`\`\`mermaid
sequenceDiagram
    participant User as Foydalanuvchi
    participant React as React (Render Phase)
    participant DOM as Real DOM (Commit Phase)
    participant Browser as Brauzer (Paint)

    User->>React: Tugmani bosdi (setState)
    Note over React: 1. Komponent qayta chaqiriladi
    Note over React: 2. Yangi Virtual DOM yasaladi
    Note over React: 3. Eski vDOM bilan solishtiriladi
    React->>DOM: 4. Faqat farqlar (Diff) qo'llaniladi
    DOM->>Browser: 5. Brauzer UI'ni qayta chizadi
    Browser-->>User: Ekranda yangi holat ko'rinadi
\`\`\`

---

## 5. 💬 Intervyu Savollari

1. **Nima uchun React ota komponent o'zgarganda bola komponentlarni ham qayta render qiladi?**
   *Javob:* Chunki React'ning standart ishlash falsafasi - yuqoridan pastga (top-down) yangilanishdir. Ota komponentda o'zgarish bo'lsa, React bola komponentlarga yangi props o'tgan bo'lishi mumkin deb hisoblaydi va ehtiyot shart sifatida ularni ham yangilaydi.
2. **"Render" va "Paint" ning farqi nima?**
   *Javob:* Render bu React'ning JS funksiyalarini chaqirib, Virtual DOMni hisoblashidir. Paint esa brauzerning Real DOM'dagi o'zgarishlarni piksellar ko'rinishida ekranga chiqarishidir.
3. **Agar state o'zining avvalgi qiymati bilan qayta yangilansa (masalan, count 1 bo'lsa va yana setCount(1) qilinsangiz) React re-render qiladimi?**
   *Javob:* Yo'q! React state o'zgarishlarini \`Object.is()\` yordamida tekshiradi. Agar oldingi qiymat bilan yangi qiymat bir xil bo'lsa, React render jarayonini darhol to'xtatadi va vaqtni tejaydi.
`,
  code: `import React, { useState } from "react";

// Bola Komponent
function ChildComponent() {
  console.log("-> ChildComponent render bo'ldi!");
  return (
    <div style={{ padding: 10, border: '1px solid #e74c3c', marginTop: 10 }}>
      <h3>Men Bola Komponentman!</h3>
      <p>Ota render bo'lsa, men ham render bo'laman (konsolni tekshiring).</p>
    </div>
  );
}

// Ota Komponent
export default function App() {
  const [count, setCount] = useState(0);

  // Bu yozuv har safar App chaqirilganda konsolga chiqadi
  console.log("App (Ota) render bo'ldi!");

  return (
    <div style={{ padding: 20, border: '2px solid #3498db', fontFamily: 'sans-serif' }}>
      <h2>Ota Komponent: Rendering Jarayoni</h2>
      <p>Sanoq: <strong>{count}</strong></p>
      
      {/* State o'zgarganda App komponenti noldan boshlab qayta ishga tushadi */}
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '8px 16px', background: '#3498db', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        State'ni o'zgartirish (+1)
      </button>

      <button 
        onClick={() => setCount(count)}
        style={{ padding: '8px 16px', marginLeft: 10, background: '#95a5a6', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        O'sha state'ni o'zini berish
      </button>
      <p style={{ fontSize: '12px', color: '#7f8c8d' }}>
        Ikkinchi tugmani bossangiz konsolda hech narsa chiqmadi! Chunki React oldingi bilan yangi qiymat bir xilligini ko'rib re-render qilmadi.
      </p>

      {/* Bola komponent props olmasa ham ota render bo'lgani uchun render bo'ladi */}
      <ChildComponent />
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "JSX Sintaksis: Class va for atributlari",
      instruction: "Quyidagi JSX kodida HTML'ning klassik atributlari ishlatilgan. Ularni JSX qoidalariga moslab o'zgartiring: `class` o'rniga `className` va `for` o'rniga `htmlFor` ishlating.",
      startingCode: "export default function Form() {\n  return (\n    <div class=\"form-group\">\n      <label for=\"username\">Ismingiz:</label>\n      <input id=\"username\" class=\"input-field\" />\n    </div>\n  );\n}",
      hint: "JSX'da JavaScript kalit so'zlari ishlatilmaydi. Shuning uchun class -> className, for -> htmlFor.",
      test: "if (code.includes('class=') || code.includes('for=')) return 'class va for o\\'rniga className va htmlFor ishlating.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React'da 'Render Phase' nima qiladi?",
      options: [
        "O'zgarishlarni darhol haqiqiy DOM ga chizadi",
        "Faqat API dan ma'lumot olib keladi",
        "Komponentni chaqirib yangi Virtual DOM daraxtini yasaydi",
        "Browser oynasini yangilaydi"
      ],
      correctAnswer: 2,
      explanation: "Render bosqichi bu faqat Virtual DOM'ni hisob-kitob qilishdir. U haqiqiy DOM'ga umuman tegmaydi."
    },
    {
      question: "Agar useState dagi setter orqali hozirgi qiymat bilan to'ppa-to'g'ri bir xil qiymat (Object.is) yuborilsa nima bo'ladi?",
      options: [
        "Komponent odatdagidek re-render bo'ladi",
        "React xatolik (Error) beradi",
        "React re-renderni bekor qiladi va hech nima o'zgarmaydi",
        "Faqat bola komponentlar render bo'ladi"
      ],
      correctAnswer: 2,
      explanation: "React optimizatsiya maqsadida agar avvalgi qiymat va yangi qiymat aynan bir xil bo'lsa (bailing out of state update), re-render jarayonini umuman boshlamaydi."
    }
  ]
};

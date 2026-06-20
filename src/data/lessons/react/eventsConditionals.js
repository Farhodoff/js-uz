export const eventsConditionals = {
  title: "Hodisalar (Events) va Shartli Render",
  content: `
# 1. 🖱️ React'da Hodisalar (Events) qanday ishlaydi?

Tugma bosilishi (click), klaviaturadan nimadir yozish (change) yoki sichqonchani qimirlatish (hover) kabilar — Hodisalar (Events) deyiladi.
Oddiy HTML va React'dagi hodisalar bir-biriga juda o'xshash, lekin bir nechta muhim farqlari bor:

1. **CamelCase nomi:** React'da event nomlari kichik harf bilan emas, balki "tuya" usulida (camelCase) yoziladi. Masalan: \`onclick\` o'rniga \`onClick\`, \`onchange\` o'rniga \`onChange\`.
2. **Funksiya yuborish:** HTML da biz qandaydir string yozardik (masalan \`onclick="doSomething()"\`). React'da esa biz to'g'ridan-to'g'ri funksiyaning o'zini uzatamiz (masalan \`onClick={doSomething}\`).

### Synthetic Event (Sintetik Hodisa)
React barcha brauzerlardagi (Chrome, Firefox, Safari) hodisalarni bir xil ko'rinishga keltirib oladi. Bunga **SyntheticEvent** deyiladi. Uning yordamida kodingiz hamma brauzerda bir xil (xatosiz) ishlaydi.

---

## 2. 🎯 Hodisa chaqirishdagi (Function Call) muhim qoida

Juda ko'p boshlang'ich dasturchilar qiladigan bitta xato bor:
\`\`\`javascript
// XATO: Funksiya darhol (komponent chizilayotganda) ishga tushib ketadi!
<button onClick={handleClick()}>Bosish</button>

// TO'G'RI: Funksiyaning faqat havolasi (reference) yuboriladi, u faqat bosilganda ishlaydi.
<button onClick={handleClick}>Bosish</button>
\`\`\`

Agar funksiya qandaydir argument qabul qilsa nima bo'ladi?
Buning uchun uni **anonim (strelkali) funksiya** ichiga o'rash kerak:
\`\`\`javascript
// TO'G'RI: Argument bilan yuborish
<button onClick={() => sayHello("Farhod")}>Salom berish</button>
\`\`\`

---

## 3. 🎭 Shartli Render (Conditional Rendering)

Dastur holatiga ko'ra ba'zi narsalarni ekranda ko'rsatish, ba'zilarini esa yashirish kerak bo'ladi. Bunga "Shartli render" deyiladi. Buni amalga oshirishning 3 ta mashhur usuli bor:

### 1. \`if/else\` orqali (Renderdan tashqarida)
Agar mantiq murakkab bo'lsa, \`return\` qilishdan oldin \`if\` orqali tekshirish eng yaxshi usul.
\`\`\`javascript
if (isLoggedIn) {
  return <AdminDashboard />;
} else {
  return <LoginForm />;
}
\`\`\`

### 2. Uchlik operator orqali (Ternary Operator \`? :\`)
JSX ni ichida shart tekshirish uchun ko'p ishlatiladi.
\`\`\`javascript
return (
  <div>
    {isOnline ? <p>Tizimda</p> : <p>Oflayn</p>}
  </div>
)
\`\`\`

### 3. Mantiqiy "VA" orqali (Logical AND \`&&\`)
Agar "shunday bo'lsa buni ko'rsat, bo'lmasa HEC NIMA ko'rsatma" degan holat uchun ishlatiladi.
\`\`\`javascript
return (
  <div>
    {hasMessages && <span>Sizda yangi xabarlar bor!</span>}
  </div>
)
\`\`\`
*(Eslatma: Agar \`hasMessages\` qandaydir nol (0) soniga teng bo'lib qolsa, ekranga 0 chiqib qolishi mumkin. Shuning uchun uni boolean ga (\`messages.length > 0\`) aylantirib olish kerak).*

---

## 4. 💬 Intervyu Savollari

1. **React'da Synthetic Event nima?**
   *Javob:* Brauzerlarning original hodisalarini (Native Events) barcha brauzerlarda bir xil ishlaydigan qilib o'rab o'tuvchi (wrapper) React'ning maxsus obyekti. Bu brauzerlararo farqlarni yo'q qiladi.
2. **Nega \`onClick={myFunc()}\` yozib bo'lmaydi?**
   *Javob:* Chunki funksiyani chaqirib qo'yish \`()\` orqali amalga oshadi va u komponent render bo'layotgan zahoti darhol ishlab ketadi. Bizga esa faqat bosilganda ishlashi kerak. Shuning uchun faqat nomini (havolasini) berish kerak: \`onClick={myFunc}\`.
3. **Shartli renderda \`&&\` operatorining xavfli tomoni nimada?**
   *Javob:* Agar tekshirilayotgan o'zgaruvchi mantiqiy (\`boolean\`) emas, balki nol (\`0\`) raqami bo'lsa, React hech narsa qaytarmaslik o'rniga aynan \`0\` ni ekranda chizib qo'yadi. Yechim: qat'iy mantiqiy ifoda yozish \`count > 0 && ...\` yoki qo'sh inkor ishlatish \`!!count && ...\`.
`,
  code: `import React, { useState } from "react";

export default function EventConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messagesCount, setMessagesCount] = useState(0);

  // Hodisa (Event Handler)
  const handleLogin = () => {
    setIsLoggedIn(true);
    setMessagesCount(3); // Kirganda 3 ta xabar kelsin
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessagesCount(0);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Xush kelibsiz!</h2>
      
      {/* 1. Ternary Operator (? :) orqali shartli render */}
      <div style={{ marginBottom: 20 }}>
        {isLoggedIn ? (
          <div style={{ padding: 10, background: '#d4edda', color: '#155724' }}>
            Ajoyib, siz tizimga kirdingiz!
          </div>
        ) : (
          <div style={{ padding: 10, background: '#f8d7da', color: '#721c24' }}>
            Iltimos, oldin tizimga kiring.
          </div>
        )}
      </div>

      {/* 2. Logical AND (&&) orqali shartli render */}
      {/* Faqat qachonki messagesCount 0 dan katta bo'lsagina ishlaydi */}
      {isLoggedIn && messagesCount > 0 && (
        <div style={{ padding: 10, background: '#cce5ff', color: '#004085', marginBottom: 20 }}>
          Sizda {messagesCount} ta o'qilmagan xabar bor 📩
        </div>
      )}

      {/* 3. Event handlerlarni biriktirish */}
      {isLoggedIn ? (
        <button 
          onClick={handleLogout} 
          style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Tizimdan chiqish
        </button>
      ) : (
        <button 
          onClick={handleLogin} 
          style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Kirish
        </button>
      )}
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Hodisa (Event) ulash",
      instruction: "Quyidagi tugma bosilganda konsolga 'Tugma bosildi!' degan yozuv chiqishi kerak. Tugmaga onClick hodisasini to'g'ri biriktiring (e'tibor bering, funksiya render paytida ishlab ketmasligi kerak).",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const handleClick = () => {\n    console.log('Tugma bosildi!');\n  };\n\n  // onClick orqali handleClick funksiyasini tugmaga ulang\n  return (\n    <button>\n      Bosing\n    </button>\n  );\n}",
      hint: "<button onClick={handleClick}> ko'rinishida bo'lishi kerak.",
      test: "if (!code.includes('onClick={handleClick}')) return 'onClick atributini to\\'g\\'ri yozing.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Agar parametrli funksiyani hodisaga ulamoqchi bo'lsak qanday yozamiz?",
      options: [
        "onClick={myFunc('Salom')}",
        "onClick={myFunc('Salom').bind(this)}",
        "onClick={() => myFunc('Salom')}",
        "onClick={myFunc} arg={'Salom'}"
      ],
      correctAnswer: 2,
      explanation: "Agar onClick={myFunc('Salom')} yozsangiz, funksiya darhol ishlab ketadi. Bunga yo'l qo'ymaslik uchun anonim (strelkali) funksiya ishlatiladi."
    },
    {
      question: "JSX ichida qanday qilib oddiy if/else blokini ishlatish mumkin?",
      options: [
        "{ if (condition) { return <A /> } else { return <B /> } }",
        "JSX ning ichida to'g'ridan-to'g'ri if/else yozib bo'lmaydi. Uning o'rniga uchlik (ternary) operator (? :) ishlatiladi.",
        "Faqat maxsus <If> tegini ishlatib.",
        "Switch/case orqali."
      ],
      correctAnswer: 1,
      explanation: "JSX aslida ifoda (expression) kutadi. If/else statement (ko'rsatma) hisoblanadi. Shuning uchun JSX o'rtasida uchlik operator yoki && ishlatiladi."
    }
  ]
};

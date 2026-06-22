export const componentTesting = {
  id: "componentTesting",
  title: "Component Testing: React Testing Library",
  content: `
# Komponentlarni testlash (React Testing Library)

Oldingi darsimizda JS funksiyalarini (\`add(2,3)\`) qanday qilib Jest orqali testlashni ko'rdik. Lekin React dasturidagi eng asosiy narsalar funksiya emas, balki **Komponentlar** dir (masalan, \`<Button />\`, \`<Header />\`).

Ushbu komponentlarni xuddi haqiqiy foydalanuvchi ko'rgandek test qilish uchun bizga **React Testing Library (RTL)** deb nomlangan maxsus kutubxona kerak bo'ladi. U Create React App bilan avtomatik o'rnatilgan keladi.

## 1. Asosiy Qoida (Falsafa)

> **RTL Falsafasi:** Sizning kodingizni Foydalanuvchilar qanday ishlatsa, testlaringiz ham aynan shunday ishlashi kerak.

Bu nima degani? Ya'ni siz komponentning ichki holatini (\`useState\` qanday nomlangan, \`useRef\` bormi yo'qmi) test QILMAYSIZ! Siz faqat "Ekranda falon yozuv chiqdimi?", "Tugmani bossam rang qizilga aylandimi?" deb so'raysiz.

## 2. RTL ning eng muhim vositalari

1. **\`render\`**: Komponentni ekranda (virtual DOM da) chizadi.
2. **\`screen\`**: Virtual ekranni qidirish (ko'zdan kechirish) uchun vosita.
3. **\`fireEvent\`** (yoki zamonaviy \`userEvent\`): Foydalanuvchi harakatlarini simulyatsiya qiladi (Bosish, Yozish).
4. **\`expect(...).toBeInTheDocument()\`**: Element rostdan ham ekranda bormi-yo'qmi tekshiradi (Jest bilan birga).

## 3. Namuna: Oddiy Tugmani testlash

Keling avval komponentni yozamiz:
\`\`\`jsx
// WelcomeButton.js
import React, { useState } from 'react';

export default function WelcomeButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      {/* Agar bosilgan bo'lsa salom beramiz */}
      {clicked && <h1>Xush kelibsiz!</h1>}
      
      <button onClick={() => setClicked(true)}>
        Meni bosing
      </button>
    </div>
  );
}
\`\`\`

Endi uni testlaymiz:
\`\`\`jsx
// WelcomeButton.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import WelcomeButton from './WelcomeButton';

describe("WelcomeButton komponenti", () => {

  test("Dastlab ekranda tugma chiqishi kerak", () => {
    // 1. Komponentni virtual ekranda chizamiz
    render(<WelcomeButton />);

    // 2. Ekranda "Meni bosing" degan yozuvi bor tugmani qidiramiz
    const btnElement = screen.getByText(/Meni bosing/i);

    // 3. Ushbu tugma rostdan ham HTML da borligini kutamiz
    expect(btnElement).toBeInTheDocument();
  });

  test("Tugma bosilganda 'Xush kelibsiz!' yozuvi chiqishi kerak", () => {
    render(<WelcomeButton />);

    const btnElement = screen.getByText(/Meni bosing/i);

    // Dastlab salomlashish yozuvi yo'qligini tekshiramiz
    const invisibleText = screen.queryByText(/Xush kelibsiz!/i);
    expect(invisibleText).not.toBeInTheDocument();

    // 4. Foydalanuvchi tugmani BOSHINI simulyatsiya qilamiz
    fireEvent.click(btnElement);

    // 5. Tugma bosilgandan so'ng yozuv paydo bo'lishini kutamiz!
    const visibleText = screen.getByText(/Xush kelibsiz!/i);
    expect(visibleText).toBeInTheDocument();
  });

});
\`\`\`

## 4. Muhim Qidiruv buyruqlari (Queries)

Elementlarni topishda asosan quyidagi turlardan foydalaniladi:

- **\`getByRole('button')\`** -> HTML tegining vazifasiga ko'ra (button, textbox, heading) topadi. (Eng ko'p tavsiya etiladigan qidiruv usuli. Ko'zi ojizlar qurilmalari ham qanday ko'rsa shunday topadi).
- **\`getByText('Saqlash')\`** -> Matn orqali qidiradi.
- **\`getByPlaceholderText('Email')\`** -> Inputlar uchun.

Agar siz \`getBy...\` deb qidirsangiz va element topilmasa - test JEST xatosi bilan to'xtab qoladi (Fail bo'ladi).
Agar element YO'QLIGINI test qilmoqchi bo'lsangiz \`queryBy...\` dan foydalanishingiz kerak. U xato bermaydi, shunchaki qidirib topa olmasa \`null\` qaytaradi.
  `,
  code: `import React, { useState } from "react";

// Bu haqiqiy komponent
function SimpleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", border: "2px dashed #00b894", borderRadius: "10px", width: "300px", background: "white" }}>
      <h3 style={{ margin: "0 0 10px 0" }}>Hisoblagich</h3>
      <p style={{ fontSize: "20px" }}>Joriy hisob: <strong>{count}</strong></p>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{ padding: "8px 15px", cursor: "pointer", background: "#0984e3", color: "white", border: "none", borderRadius: "5px" }}
      >
        Oshirish
      </button>
    </div>
  );
}

// Bu esa uning Test Simulyatori
export default function TestSimulator() {
  const [testResult, setTestResult] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => setLogs(prev => [...prev, msg]);

  const simulateRTLTest = () => {
    setLogs([]);
    setTestResult(null);

    // 1-qadam
    addLog("⏳ [render] <SimpleCounter /> virtual DOM ga chizilmoqda...");
    
    setTimeout(() => {
      // 2-qadam
      addLog("🔍 [screen] 'Joriy hisob: 0' yozuvi qidirilmoqda...");
      
      setTimeout(() => {
        addLog("✅ [expect] Boshlang'ich qiymat 0 ekanligi tasdiqlandi!");
        
        // 3-qadam
        setTimeout(() => {
          addLog("👆 [fireEvent] 'Oshirish' tugmasi bosilmoqda...");
          
          setTimeout(() => {
            addLog("🔍 [screen] 'Joriy hisob: 1' yozuvi qidirilmoqda...");
            
            setTimeout(() => {
              addLog("✅ [expect] Qiymat muvaffaqiyatli 1 ga o'zgargani tasdiqlandi!");
              setTestResult("PASS");
            }, 800);
          }, 800);
        }, 1000);
      }, 800);
    }, 1000);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", background: "#f1f2f6", minHeight: "100vh" }}>
      <h2>React Testing Library (RTL) Simulyatsiyasi</h2>
      <p>Keling, yuqoridagi sodda hisoblagichni koddagi test qanday tekshirishini ko'ramiz.</p>

      {/* Haqiqiy komponent ko'rinishi */}
      <SimpleCounter />

      <br />
      <button 
        onClick={simulateRTLTest}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", background: "#d63031", color: "white", border: "none", borderRadius: "5px" }}
      >
        ▶ Test yozuvlarini ishga tushirish
      </button>

      {/* Test Logging */}
      <div style={{ marginTop: "20px", background: "#2d3436", color: "#dfe6e9", padding: "15px", borderRadius: "8px", minHeight: "150px" }}>
        <h4 style={{ margin: "0 0 10px 0", borderBottom: "1px solid #636e72", paddingBottom: "5px" }}>Test Console</h4>
        {logs.map((log, i) => (
          <div key={i} style={{ margin: "5px 0", fontFamily: "monospace" }}>{log}</div>
        ))}
        {testResult === "PASS" && (
          <div style={{ marginTop: "15px", color: "#55efc4", fontWeight: "bold", fontSize: "18px" }}>
            🎉 Barcha testlar muvaffaqiyatli yakunlandi!
          </div>
        )}
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Elementni Rol (Role) orqali topish",
      description: "Bizga HTML dagi matn kiritish maydoni (textbox) kerak. RTL ning eng tavsiya etiladigan buyrug'i (getByRole) bilan uni virtual ekrandan toping.",
      startingCode: `import { render, screen } from '@testing-library/react';\nimport App from './App';\n\ntest("Input maydoni ekranda bo'lishi kerak", () => {\n  render(<App />);\n  // VAZIFA: 'textbox' rolidagi elementni toping\n  const inputEl = screen.getByRole(         );\n  \n  expect(inputEl).toBeInTheDocument();\n});`,
      solution: `import { render, screen } from '@testing-library/react';\nimport App from './App';\n\ntest("Input maydoni ekranda bo'lishi kerak", () => {\n  render(<App />);\n  const inputEl = screen.getByRole('textbox');\n  \n  expect(inputEl).toBeInTheDocument();\n});`,
      hint: "\`screen.getByRole('textbox')\` ni yozing. Input ning roli textbox hisoblanadi."
    },
    {
      id: 2,
      title: "Elementning yo'qligini qidirish (queryBy)",
      description: "Agar siz yozuv yo'qolishini (yashirinishini) test qilmoqchi bo'lsangiz \`getBy...\` ishlata olmaysiz (u darhol xato berib dasturni to'xtatadi). Buning o'rniga \`queryBy...\` dan foydalaning.",
      startingCode: `import { render, screen } from '@testing-library/react';\nimport Alert from './Alert';\n\ntest("Xato xabari ekranda chiqmasligi kerak", () => {\n  render(<Alert show={false} />);\n  \n  // VAZIFA: getByText o'rniga nima ishlatish kerak?\n  const hiddenAlert = screen.          (/Xatolik!/i);\n  \n  expect(hiddenAlert).not.toBeInTheDocument();\n});`,
      solution: `import { render, screen } from '@testing-library/react';\nimport Alert from './Alert';\n\ntest("Xato xabari ekranda chiqmasligi kerak", () => {\n  render(<Alert show={false} />);\n  \n  const hiddenAlert = screen.queryByText(/Xatolik!/i);\n  \n  expect(hiddenAlert).not.toBeInTheDocument();\n});`,
      hint: "\`screen.queryByText(/Xatolik!/i)\` ishlating."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React Testing Library ning asosiy qoidasi (falsafasi) nima?",
      options: [
        "Komponentning state lari har doim raqam bo'lishini tekshirish",
        "Kodni xuddi haqiqiy foydalanuvchilar qanday foydalansa, shunday usulda testlash",
        "React ning barcha hook lari (useState, useRef) to'g'ri ishlashini kafolatlash",
        "HTML teglari qanday rangda (CSS) ekanligini sinash"
      ],
      correctAnswer: 1,
      explanation: "RTL dagi testlar komponent ichida nima bo'layotgani (State nima, hooklar nechtaligi) bilan umuman ishi yo'q. U oddiy odamdek: Ekranda yozuv bormi, tugma ishlayaptimi deb so'raydi xolos."
    },
    {
      id: 2,
      question: "Test vaqtida komponentni ekranga 'chizish' (Virtual DOM ga qo'yish) uchun qaysi RTL funksiyasi ishlatiladi?",
      options: [
        "paint()",
        "mount()",
        "render()",
        "display()"
      ],
      correctAnswer: 2,
      explanation: "Har qanday RTL testining birinchi qadami doimo \`render(<MeningKomponentim />)\` bo'ladi."
    },
    {
      id: 3,
      question: "Ekrandagi elementlarni topishda qaysi biri eng MA'QUL (tavsiya qilingan) hisoblanadi?",
      options: [
        "getByRole",
        "getByTestId",
        "getByTitle",
        "document.getElementById"
      ],
      correctAnswer: 0,
      explanation: "getByRole - chunki u HTML ni semantik (ma'no jihatidan) o'qiydi. Ya'ni u shunchaki nomiga qarab emas, bu rostdan ham Tugmami (button) yoki Inputmi deb farqlab topadi."
    },
    {
      id: 4,
      question: "Tugma (button) bosilishini qaysi funksiya simulyatsiya qilib (o'xshatib) beradi?",
      options: [
        "user.clickButton()",
        "triggerEvent.mouseClick()",
        "fireEvent.click(tugmaElementi)",
        "screen.press(tugmaElementi)"
      ],
      correctAnswer: 2,
      explanation: "fireEvent orqali biz foydalanuvchilarning turli harakatlarini (click, change, keyPress) yozgan kodimizga yuborishimiz mumkin."
    }
  ]
};

export const componentsProps = {
  title: "Komponentlar va Props",
  content: `
# 1. 💡 Komponent nima o'zi?

React ilovalarini huddi **Lego** o'yinchoqlaridan yig'iladigan bino kabi tasavvur qiling. Bino bitta yaxlit devordan emas, yuzlab kichik va mustaqil g'ishtchalardan yig'iladi.
React'da bu g'ishtchalar **Komponentlar (Components)** deb ataladi.

Komponent — bu mustaqil, qayta ishlatish mumkin bo'lgan interfeys bo'lagi. Masalan: Navbar, Sidebar, Button, VideoPlayer kabilarni alohida komponentlarga bo'lish mumkin.

### Komponent yaratish qoidalari:
1. **Nomi har doim katta harf bilan boshlanishi kerak** (masalan, \`Header\`, \`UserProfile\`). Aks holda, React uni oddiy HTML tegi deb o'ylaydi (\`<header>\`).
2. U odatiy JavaScript funksiyasidir va u albatta biron bir **JSX** (UI) ni \`return\` qilishi shart.

---

## 2. 🚚 Props (Properties - Xususiyatlar)

Agar komponentlar oddiy JS funksiyalari bo'lsa, ularga qanday qilib ma'lumot uzatamiz?
Oddiy funksiyalarga parametrlar (arguments) berganimizdek, React komponentlariga **Props** yuboramiz.

### Props qanday ishlaydi?
* Ota komponent o'zining ichidagi bola komponentga HTML atributlari kabi qiymatlar beradi.
* Bola komponent bu qiymatlarni \`props\` nomli obyekt ko'rinishida qabul qilib oladi.
* **Juda muhim qoida:** Props **Read-only** (faqat o'qish uchun) dir! Bola komponent o'ziga kelgan propsni o'zgartira (mutatsiya qila) olmaydi. Ota nima bersa shuni ko'rsatadi.

---

## 3. 🎯 Ota va Bola komponentlar (Misol)

\`\`\`javascript
// 1. Bola Komponent (Child) - U ma'lumotni props orqali qabul qiladi
function UserCard(props) {
  return (
    <div className="card">
      <h2>Ismi: {props.name}</h2>
      <p>Kasbi: {props.job}</p>
    </div>
  );
}

// Yoki ES6 Destructuring yordamida yanada qisqaroq yozish mumkin:
function UserCardDestructured({ name, job }) {
  return (
    <div className="card">
      <h2>Ismi: {name}</h2>
      <p>Kasbi: {job}</p>
    </div>
  );
}

// 2. Ota Komponent (Parent) - U ma'lumotni jo'natadi
export default function App() {
  return (
    <div>
      <UserCard name="Ali" job="Dasturchi" />
      <UserCard name="Zebo" job="Dizayner" />
    </div>
  );
}
\`\`\`

Yuqoridagi misolda \`UserCard\` komponentini 2 marta ishlata oldik. Bu komponentlarning eng katta yutug'i — **Reusability** (qayta ishlatuvchanlik).

---

## 4. 📦 \`children\` prop

Ba'zan siz bitta komponentning ichiga boshqa JSX elementlarini yoki hatto boshqa komponentlarni solib yubormoqchi bo'lasiz. Bunda maxsus \`children\` prop'idan foydalaniladi.

\`\`\`javascript
function CardWrapper({ children }) {
  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      {children} 
    </div>
  );
}

// Ishlatilishi:
<CardWrapper>
  <h2>Bu h2 elementi children bo'lib boradi</h2>
  <p>Bu matn ham children ichida</p>
</CardWrapper>
\`\`\`

---

## 5. 💬 Intervyu Savollari

1. **Nima uchun komponent nomi katta harf bilan boshlanishi kerak?**
   *Javob:* JSX Babel orqali kompilyatsiya qilinayotganda, agar teg kichik harfda bo'lsa (\`<div>\`, \`<span>\`), u to'g'ridan-to'g'ri HTML teg (string) deb tushuniladi. Agar katta harf bilan boshlansa (\`<User />\`), Babel buni \`React.createElement(User)\` kabi koddagi funksiyaga havola (reference) deb qabul qiladi.
2. **Props ni bola komponent ichida o'zgartirish mumkinmi?**
   *Javob:* Mutlaqo yo'q! React'da bir yo'nalishli (top-down) ma'lumotlar oqimi mavjud. Props har doim ota komponent tomonidan beriladi va ular "pure" (toza) saqlanishi, ya'ni bola tomondan mutatsiya qilinmasligi shart.
3. **Props va State ning asosiy farqi nima?**
   *Javob:* Props — tashqaridan (otadan bolaga) keladigan, o'zgarmas (read-only) ma'lumotlar. State esa komponentning o'zi tomondan yaratiladigan va vaqt o'tishi bilan o'zgartirilishi mumkin bo'lgan ichki xotiradir.
`,
  code: `import React from "react";

// 1. Bola komponent: Profil kartochkasi
// Destructuring orqali props dan name, age, va bio ni ajratib olamiz
function ProfileCard({ name, age, bio, themeColor = "lightblue" }) {
  return (
    <div style={{ 
      border: \`2px solid \${themeColor}\`, 
      padding: 15, 
      borderRadius: 8,
      marginBottom: 10,
      fontFamily: 'sans-serif'
    }}>
      <h3>{name} ({age} yosh)</h3>
      <p style={{ color: '#555' }}>{bio}</p>
    </div>
  );
}

// 2. Ota komponent
export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Komponentlar va Props orqali ma'lumot uzatish</h2>
      <p>Bitta <strong>ProfileCard</strong> komponenti yaratildi, lekin turli ma'lumotlar bilan 3 marta chizildi:</p>
      
      {/* 1-karta */}
      <ProfileCard 
        name="Farhod" 
        age={25} 
        bio="React va Node.js dasturchisi." 
        themeColor="#3498db"
      />

      {/* 2-karta */}
      <ProfileCard 
        name="Malika" 
        age={22} 
        bio="UI/UX Dizayner. Figma'da ishlaydi." 
        themeColor="#e74c3c"
      />

      {/* 3-karta (themeColor yuborilmadi, default qiymat "lightblue" ishlaydi) */}
      <ProfileCard 
        name="Jasur" 
        age={30} 
        bio="Loyiha menejeri." 
      />
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Button komponenti yaratish",
      instruction: "Quyidagi kodda `CustomButton` komponentini shunday yozingki, u o'ziga kelayotgan `text` va `bgColor` props larini o'qib, mos ravishda tugma rangi va yozuvini ko'rsatsin. Button elementi ichida `text` ni ko'rsating va uning `style={{ backgroundColor: bgColor }}` atributiga rangni qo'ying.",
      startingCode: "import React from 'react';\n\nfunction CustomButton(props) {\n  // Props dan foydalanib tugmani to'g'ri chizing\n  return (\n    <button>\n      Tugma\n    </button>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <CustomButton text=\"Tasdiqlash\" bgColor=\"green\" />\n      <CustomButton text=\"Bekor qilish\" bgColor=\"red\" />\n    </div>\n  );\n}",
      hint: "return <button style={{ backgroundColor: props.bgColor }}>{props.text}</button> ko'rinishida yozing (yoki destructuring qiling).",
      test: "if (!code.includes('props.text') && !code.includes('{text}') && !code.includes('{ text }')) return 'Props lardan foydalaning.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega komponent nomi har doim bosh harf bilan yozilishi shart?",
      options: [
        "Chiroyli ko'rinishi uchun",
        "Bu JavaScript ning qat'iy qoidasi bo'lgani uchun",
        "React va Babel kichik harfda yozilgan teglarni oddiy HTML tegi (masalan div, span) deb o'ylamasligi uchun",
        "Katta harfda yozilmasa dastur umuman ishga tushmaydi"
      ],
      correctAnswer: 2,
      explanation: "Babel JSX ni o'girayotganda kichik harfli teglarni oddiy string ('div') deb oladi. Katta harfli bo'lsa uni funksiya chaqiruvi (React.createElement(MyComponent)) deb hisoblaydi."
    },
    {
      question: "Bola komponent o'ziga kelgan props larni o'zgartirsa (mutatsiya qilsa) nima bo'ladi?",
      options: [
        "Ota komponentdagi state ham o'zgaradi",
        "Hech narsa bo'lmaydi, hamma narsa to'g'ri ishlaydi",
        "React xato bermasligi mumkin, lekin bu qat'iyan man etiladi (Read-only qoidasi buziladi) va kutilmagan buglarga olib keladi",
        "Bola komponent qayta render bo'ladi"
      ],
      correctAnswer: 2,
      explanation: "React props larni mutlaqo O'ZGARMAS (read-only) deb qabul qiladi. Ularni o'zgartirish React ma'lumotlar oqimini (One-way data binding) buzadi."
    }
  ]
};

export const step4_props = {
  title: "4-DARS: Props (Properties)",
  content: `
# 1. 🚚 Props nima va u qanday ishlaydi?

Oldingi darsda komponentlarni qanday yaratish va ularni qayta ishlatishni o'rgandik. Biroq, bitta komponentni 3 marta ishlatsak, ular mutlaqo bir xil ma'lumotni ko'rsatib turadi. Qanday qilib ularga turli xil ma'lumotlarni uzatamiz?
Buning yechimi — **Props (Properties)**.

Props bu Ota (Parent) komponentdan Bola (Child) komponentga ma'lumot jo'natishning yagona yo'li. U xuddi oddiy JS funksiyasiga argument (parametr) berishdek gap. HTML dagi \`<img src="rasm.jpg" />\` dagi \`src\` atributi qanday ishlasa, Props ham aynan shunday ishlaydi.

### Props qanday uzatiladi?
Ota komponentda atributlar sifatida yoziladi:
\`\`\`jsx
<UserCard ism="Ali" yosh={25} ishlaydimi={true} />
\`\`\`

Bola komponent ularni bitta \`props\` obyekti ichida qabul qilib oladi:
\`\`\`jsx
function UserCard(props) {
  return <p>{props.ism} - {props.yosh} yoshda.</p>;
}
\`\`\`

---

## 2. ✂️ Props Destructuring (Qulay yozish)

Har doim \`props.ism\`, \`props.yosh\` deb yozish uzoq va zerikarli. JS ning Destructuring (parchalab olish) xususiyatidan foydalanib kodni qisqartirishimiz mumkin:

\`\`\`jsx
// Obyektni to'g'ridan-to'g'ri qabul qilish qismida parchalaymiz
function UserCard({ ism, yosh }) {
  return <p>{ism} - {yosh} yoshda.</p>;
}
\`\`\`

---

## 3. 🛡️ Props ning Asosiy Qoidasi: Ular o'zgarmasdir! (Immutable)

React'ning eng qat'iy qoidalaridan biri: **Bola komponent o'ziga kelgan props larni O'ZGARTIRA OLMAYDI (Mutatsiya qila olmaydi).**

❌ **QAT'IYAN TAQIQLANADI:**
\`\`\`jsx
function UserCard(props) {
  props.ism = "Vali"; // XATO! Props read-only (faqat o'qish uchun)
  return <p>{props.ism}</p>;
}
\`\`\`
Props ma'lumotlar oqimining bir yo'nalishli (top-down) ekanligini ta'minlaydi. Agar ma'lumot o'zgarishi kerak bo'lsa, uni Props orqali emas, balki keyingi darsda o'tadiganimiz **State** orqali boshqarish kerak.

---

## 4. 🧰 Default Props (Standart qiymatlar)

Ba'zan Ota komponent qandaydir prop yuborishni unutilishi mumkin. Shunday paytda xato chiqmasligi uchun Default (standart) qiymat berish mumkin. ES6 funksiyalaridagidek qilinadi:

\`\`\`jsx
function UserCard({ ism = "Noma'lum", yosh = 18 }) {
  return <p>{ism} - {yosh} yoshda.</p>;
}
\`\`\`
Agar \`<UserCard />\` deb ism bermasdan chaqirsangiz, "Noma'lum" yozuvi chiqadi.

---

## 5. 📦 \`children\` prop (Bolalar)

Siz biron komponentning ochiluvchi va yopiluvchi teglari orasiga narsa yozsangiz, ular avtomatik ravishda \`children\` prop'iga tushadi. Bu ko'pincha Wrapper (o'rovchi) komponentlar (masalan: Modal, Card, Container) yaratishda judayam ko'p ishlatiladi.

\`\`\`jsx
function OrovchiCard({ children }) {
  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      {children}
    </div>
  );
}

// Ishlatish:
<OrovchiCard>
  <h2>Bu yozuv children orqali ichkariga kiradi!</h2>
  <button>Men ham children'man</button>
</OrovchiCard>
\`\`\`
`,
  code: `import React from "react";

// 1-Komponent: Bola (Props ni qabul qilib, ko'rsatib beradi)
function UserProfile({ name, role, isOnline, children }) {
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      padding: "15px", 
      marginBottom: "15px", 
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      fontFamily: "sans-serif"
    }}>
      <h3 style={{ margin: "0 0 10px 0" }}>{name}</h3>
      <p style={{ color: "#7f8c8d", margin: "0 0 10px 0" }}>Kasbi: {role}</p>
      
      {/* Boolean (true/false) ni shartli render orqali ko'rsatamiz */}
      <p style={{ margin: 0 }}>
        Status: {isOnline ? <span style={{ color: "green" }}>Onlayn 🟢</span> : <span style={{ color: "red" }}>Oflayn 🔴</span>}
      </p>

      {/* Agar children yuborilgan bo'lsa, shu yerda chiqadi */}
      <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
        {children}
      </div>
    </div>
  );
}

// 2-Komponent: Ota (Ma'lumotlarni yuboradi)
export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Ota komponentdan kelgan ma'lumotlar:</h2>

      {/* Birinchi user */}
      <UserProfile name="Farhod" role="Frontend Dasturchi" isOnline={true}>
        {/* children orqali tugma yuboryapmiz */}
        <button style={{ padding: "5px 10px", background: "#3498db", color: "white", border: "none" }}>Xabar yozish</button>
      </UserProfile>

      {/* Ikkinchi user */}
      <UserProfile name="Zebo" role="Loyiha Menejeri" isOnline={false}>
        {/* children orqali matn yuboryapmiz */}
        <i>Hozir tarmoqda emas, keyinroq bog'laning.</i>
      </UserProfile>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Mahsulot kartasini yasang",
      instruction: "`ProductCard` komponenti `title` va `price` degan props larni qabul qilishi kerak. Ota komponent (`App`) dan bitta olma (Olma, 5000 so'm) va bitta banan (Banan, 15000 so'm) ma'lumotlarini jo'nating.",
      startingCode: "import React from 'react';\n\n// 1. Shu joyga destructuring orqali title va price qo'shing\nfunction ProductCard(props) {\n  return (\n    <div style={{ border: '1px solid black', margin: 10 }}>\n      {/* 2. Shu yerda title ni chiqaring */}\n      <h3>Mahsulot nomi</h3>\n      {/* 3. Shu yerda price ni chiqaring */}\n      <p>Narxi: 0 so'm</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      {/* 4. Shu yerda 2 marta ProductCard chaqirib, turli propslar bering */}\n    </div>\n  );\n}",
      hint: "<ProductCard title=\"Olma\" price={5000} />",
      test: "if (!code.includes('title=') || !code.includes('price=')) return 'App ichida ProductCard larga title va price props larini yuboring.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Bola komponent o'ziga ota komponentdan kelgan props (ma'lumot) ni o'zgartira oladimi?",
      options: [
        "Ha, xuddi oddiy JS o'zgaruvchilari kabi props.name = 'yangi' qilib o'zgartirsa bo'ladi.",
        "Ha, faqat React ni qayta ishga tushirganda.",
        "Yo'q! React'da Props lar qat'iyan Read-Only (faqat o'qish uchun) dir va ularni o'zgartirish (mutatsiya) man etiladi.",
        "Yo'q, chunki ota komponent uni qulflab qo'ygan bo'ladi."
      ],
      correctAnswer: 2,
      explanation: "React'da ma'lumotlar faqat yuqoridan pastga (Top-down) oqadi. Bola komponent otasi bergan propslarni o'zgartira olmaydi. Agar o'zgaruvchan ma'lumot kerak bo'lsa State ishlatiladi."
    },
    {
      question: "Bolalar (children) prop nima vazifani bajaradi?",
      options: [
        "Faqat bolalarga mo'ljallangan ilovalarda ishlatiladi.",
        "Komponentning ochilish (<Card>) va yopilish (</Card>) teglari orasiga yozilgan barcha elementlarni tutib olib ko'rsatishga yordam beradi.",
        "U propsning eski versiyasi bo'lib, hozir ishlatilmaydi.",
        "Faqat React Router dagi sahifalarni bildiradi."
      ],
      correctAnswer: 1,
      explanation: "Komponentni o'rovchi (Wrapper) sifatida ishlatish uchun barcha oradagi narsalar avtomatik ravishda 'children' obyekti orqali bola komponentga uzatiladi."
    }
  ]
};

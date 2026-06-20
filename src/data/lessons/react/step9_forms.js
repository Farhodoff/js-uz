export const step9_forms = {
  title: "9-DARS: Formalar bilan ishlash",
  content: `
# 1. 📋 React'da Formalar (Forms) qanday ishlaydi?

Veb dasturlarda foydalanuvchidan ma'lumot olishning asosiy yo'li — bu formalar (Input, Select, Checkbox, Textarea).
HTML da forma o'zining ichki xotirasiga (state ga) ega bo'ladi. Masalan, siz \`<input>\` ga nimadir yozsangiz, brauzer o'sha matnni inputning ichida saqlab turadi.

Ammo React'da ma'lumotlar ustidan to'liq nazorat qilish (Validatsiya, serverga yuborish) uchun biz formadagi ma'lumotlarni **React State** ga ko'chirib o'tkazishimiz kerak.

React da formalar bilan ishlashning 2 xil yondashuvi bor:
1.  **Controlled Components** (Boshqariladigan komponentlar) - tavsiya etiladi.
2.  **Uncontrolled Components** (Boshqarilmaydigan komponentlar).

---

## 2. 🎮 Controlled Components (Boshqariladigan)

Eng ko'p ishlatiladigan usul! Bunda \`<input>\` ning qadri (value) React ning \`state\` iga to'g'ridan-to'g'ri bog'lab qo'yiladi. Natijada input o'zini mustaqil boshqara olmaydi, uni React boshqaradi.

**Qanday qilinadi?**
1.  Input uchun bitta State yaratasiz: \`const [name, setName] = useState('')\`
2.  Inputning \`value\` atributiga state ni berasiz: \`value={name}\`
3.  Inputning \`onChange\` hodisasida state ni yangilaysiz: \`onChange={(e) => setName(e.target.value)}\`

Shu 3 qadam orqali input to'liq nazorat ostiga tushadi!

\`\`\`jsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
}
\`\`\`

---

## 3. 🎯 Formani jo'natish (Submit)

Sizda bir nechta input va eng oxirida "Yuborish" tugmasi bor deylik. Formani serverga jo'natish uchun:

1.  Barcha inputlarni bitta \`<form>\` tegi ichiga olasiz.
2.  Formaga \`onSubmit\` hodisasini ulaysiz.
3.  **Eng muhimi:** Funksiya boshlanishida darhol \`e.preventDefault()\` yozasiz, aks holda brauzer avtomatik ravishda sahifani yangilab yuboradi (refresh) va barcha yozgan narsalaringiz yo'qolib ketadi.

\`\`\`jsx
const handleSubmit = (e) => {
  e.preventDefault(); // Refresh bo'lishni to'xtatamiz
  console.log("Jo'natiladigan ma'lumot:", name);
  // Shu yerda API ga (Backendga) so'rov yuboriladi
};

<form onSubmit={handleSubmit}> ... </form>
\`\`\`

---

## 4. 🗃️ Ko'p Inputlarni bitta State da ushlash

Agar formangizda 10 ta input (Ism, Familiya, Parol, Manzil...) bo'lsa, har biri uchun alohida 10 ta \`useState\` ochish kodingizni iflos qilib yuboradi. Bunga yechim — ularni bitta obyekt ko'rinishidagi State da jamlashdir:

\`\`\`jsx
const [formData, setFormData] = useState({
  ism: "",
  email: "",
  parol: ""
});

const handleChange = (e) => {
  // Inputdagi 'name' atributini va uning qiymatini olib olamiz
  const { name, value } = e.target;
  
  setFormData({
    ...formData, // Oldingi ma'lumotlarni saqlab qolamiz
    [name]: value // Qaysi inputda o'zgarish bo'lsa, faqat shuni yangilaymiz
  });
};

// HTML qismi:
// <input name="ism" value={formData.ism} onChange={handleChange} />
\`\`\`

---

## 5. 🏗️ Uncontrolled Components (Qisqacha)

Agar inputingiz juda oddiy bo'lsa va uni har safar o'zgarganini kuzatish (validatsiya) kerak bo'lmasa, uni "boshqarilmaydigan" qilib qo'yishingiz mumkin. Buning uchun State ishlatilmaydi, uning o'rniga \`useRef\` orqali to'g'ridan-to'g'ri DOM dan o'qib olinadi. 
*(Eslatma: Murakkab formalar uchun bu usul tavsiya etilmaydi).*
`,
  code: `import React, { useState } from "react";

export default function RegistrationForm() {
  // Barcha input ma'lumotlarini bitta object state da yig'amiz
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "erkak" // Select element uchun standart qiymat
  });
  
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Barcha inputlarning o'zgarishini tutib oluvchi yagona funksiya
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Forma yuborilganda (Submit tugmasi bosilganda) ishlashi kerak bo'lgan logika
  const handleSubmit = (e) => {
    e.preventDefault(); // BRAUZER REFRESH BO'LISHINI TO'XTATAMIZ!

    // Oddiy validatsiya (Tekshirish)
    if (formData.username.trim() === "" || formData.email.trim() === "") {
      setError("Iltimos, barcha maydonlarni to'ldiring!");
      setSuccessMsg("");
      return;
    }

    // Agar hammasi to'g'ri bo'lsa...
    setError("");
    setSuccessMsg(\`Tabriklaymiz \${formData.username}! Siz muvaffaqiyatli ro'yxatdan o'tdingiz.\`);
    
    // Yuborilgandan so'ng formani tozalab yuboramiz
    setFormData({ username: "", email: "", gender: "erkak" });
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, fontFamily: "sans-serif" }}>
      <h2>Ro'yxatdan o'tish</h2>
      
      {/* Xatolik yoki muvaffaqiyat xabarlari */}
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {successMsg && <div style={{ color: "green", marginBottom: 10 }}>{successMsg}</div>}

      {/* Formani ochamiz */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        
        <div>
          <label>Ismingiz:</label><br />
          <input 
            type="text" 
            name="username" // Name atributi state dagi kalit so'z bilan bir xil bo'lishi shart!
            value={formData.username} 
            onChange={handleInputChange} 
            style={inputStyle}
          />
        </div>

        <div>
          <label>Email manzilingiz:</label><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            style={inputStyle}
          />
        </div>

        <div>
          <label>Jinsingiz:</label><br />
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleInputChange} 
            style={inputStyle}
          >
            <option value="erkak">Erkak</option>
            <option value="ayol">Ayol</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "10px", background: "#3498db", color: "white", border: "none", cursor: "pointer", borderRadius: 4 }}>
          Jo'natish
        </button>

      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  border: "1px solid #ccc",
  borderRadius: "4px"
};`,
  exercises: [
    {
      id: 1,
      title: "Controlled Input yaratish",
      instruction: "Quyidagi input o'zgarishlarga reaksiya qilmayapti (ya'ni yozib bo'lmayapti), chunki uning qiymati state bilan bog'lanib, lekin `onChange` yozilmagan. Input ga `onChange` hodisasini ulab, state ni yangilaydigan qiling.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [city, setCity] = useState('');\n\n  return (\n    <div>\n      {/* Shu inputga onChange ulang va e.target.value ni setCity ga bering */}\n      <input value={city} placeholder=\"Shahringiz\" />\n      <p>Siz yashaydigan shahar: {city}</p>\n    </div>\n  );\n}",
      hint: "<input value={city} onChange={(e) => setCity(e.target.value)} />",
      test: "if (!code.includes('onChange')) return 'Input ga onChange atributini yozish esdan chiqdi.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega onSubmit hodisasining birinchi qatoriga 'e.preventDefault()' yozilishi shart?",
      options: [
        "Aks holda brauzer o'zining standart xatti-harakatini qilib, butun veb-sahifani refresh qilib (yangilab) yuboradi.",
        "Bu React ga formadagi ma'lumotlarni tekshirish (validation) qilib berishini bildiradi.",
        "Serverga yuborilayotgan xakerlik hujumlarini qaytarish uchun.",
        "e.preventDefault() formani tozalab yuborish (reset qilish) uchun ishlatiladi."
      ],
      correctAnswer: 0,
      explanation: "HTML ning original formasi 'submit' bo'lganida sahifani yangilashga sozlangan. Single Page Application larda (SPA) esa sahifa yangilanishi barcha ma'lumotlar yo'qolishiga olib keladi. Buni aynan preventDefault to'xtatadi."
    },
    {
      question: "Controlled va Uncontrolled form komponentining asosiy farqi nima?",
      options: [
        "Ularda umuman farq yo'q, shunchaki ikki xil nom",
        "Controlled formalar o'zgarishlarni bevosita React State orqali nazorat qiladi. Uncontrolled esa State ishlatmay, faqat DOM (useRef) dagi o'z qadrini o'zi ushlab turadi.",
        "Controlled faqatgina Redux bilan ishlaydi",
        "Uncontrolled degani hech qachon xato bermaydigan forma degani"
      ],
      correctAnswer: 1,
      explanation: "Controlled (boshqariluvchi) da react har bir tugma bosilishidan tortib o'zgarishlarni o'z qo'liga oladi. Uncontrolled esa an'anaviy oddiy HTML input dek o'z holiga tashlab qo'yiladi va faqat kerak bo'lganda (masalan submit bo'lganda) Ref orqali ma'lumoti o'qib olinadi."
    }
  ]
};

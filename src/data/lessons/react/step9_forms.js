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
    },
    {
      id: 2,
      title: "Checkbox bilan ishlash",
      instruction: "Checkbox holatini state-da saqlash uchun `e.target.checked` dan foydalanamiz. Kodda berilgan input (checkbox) uchun onChange funksiyasini qo'shing va `setIsChecked` orqali uni yangilang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [isChecked, setIsChecked] = useState(false);\n\n  return (\n    <div>\n      <label>\n        <input \n          type=\"checkbox\" \n          checked={isChecked} \n        />\n        Shartlarga roziman\n      </label>\n      <p>{isChecked ? 'Rozisiz' : 'Rozi emassiz'}</p>\n    </div>\n  );\n}",
      hint: "onChange={(e) => setIsChecked(e.target.checked)} ni inputga qo'shing.",
      test: "if (!code.includes('onChange') || !code.includes('target.checked')) return 'Checkbox holatini yangilash uchun onChange va e.target.checked dan foydalaning.'; return null;"
    },
    {
      id: 3,
      title: "Formani jo'natish (Submit) va preventDefault",
      instruction: "Forma yuborilganda sahifa yangilanib ketishining oldini olish kerak. `handleSubmit` funksiyasi ichida `e.preventDefault()` chaqiring.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [text, setText] = useState('');\n\n  const handleSubmit = (e) => {\n    // Shu yerda sahifa yangilanishining oldini oling\n    \n    alert(\"Yuborildi: \" + text);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button type=\"submit\">Yuborish</button>\n    </form>\n  );\n}",
      hint: "handleSubmit funksiyasi boshida e.preventDefault(); yozing.",
      test: "if (!code.includes('preventDefault()')) return 'e.preventDefault() orqali brauzerning standart harakatini to\\'xtating.'; return null;"
    },
    {
      id: 4,
      title: "Ko'p inputlarni bitta State-da saqlash",
      instruction: "Obyekt ko'rinishidagi state'ni yangilash. `handleChange` funksiyasini to'ldiring: u o'zgarayotgan inputning `name` qiymatiga qarab, mos holda state-dagi qiymatni o'zgartirishi kerak. Eslatma: oldingi ma'lumotlarni saqlab qolishni unutmang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [formData, setFormData] = useState({\n    firstName: '',\n    lastName: ''\n  });\n\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    // Shu yerda formData ni yangilang\n    setFormData({\n      \n    });\n  };\n\n  return (\n    <form>\n      <input name=\"firstName\" value={formData.firstName} onChange={handleChange} />\n      <input name=\"lastName\" value={formData.lastName} onChange={handleChange} />\n    </form>\n  );\n}",
      hint: "...formData, [name]: value dan foydalaning.",
      test: "if (!code.includes('...formData') || !code.includes('[name]:')) return 'Obyektni to\\'g\\'ri yangilang: ...formData yordamida avvalgi ma\\'lumotlarni saqlab, [name]: value bilan yangi maydonni yozing.'; return null;"
    },
    {
      id: 5,
      title: "Select bilan ishlash",
      instruction: "Select elementining tanlangan qiymatini state bilan boshqaring. `<select>` elementiga `value` va `onChange` qo'shing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [color, setColor] = useState('qizil');\n\n  return (\n    <div>\n      <select>\n        <option value=\"qizil\">Qizil</option>\n        <option value=\"yashil\">Yashil</option>\n        <option value=\"kok\">Ko'k</option>\n      </select>\n      <p>Siz tanladingiz: {color}</p>\n    </div>\n  );\n}",
      hint: "<select value={color} onChange={(e) => setColor(e.target.value)}> yozing.",
      test: "if (!code.includes('value={color}') || !code.includes('onChange')) return 'Select ga value va onChange atributlarini qo\\'shing.'; return null;"
    },
    {
      id: 6,
      title: "Textarea bilan ishlash",
      instruction: "React-da Textarea HTML dagi kabi ochuvchi va yopuvchi teglar orasiga matn yozish o'rniga, input kabi `value` atributini qabul qiladi. Quyidagi `<textarea>` ga value va onChange biriktiring.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [message, setMessage] = useState('');\n\n  return (\n    <div>\n      {/* Textarea-ni controlled qiling */}\n      <textarea placeholder=\"Xabaringizni yozing...\" />\n      <p>Xabar: {message}</p>\n    </div>\n  );\n}",
      hint: "<textarea value={message} onChange={(e) => setMessage(e.target.value)} /> qiling.",
      test: "if (!code.includes('value={message}') || !code.includes('onChange')) return 'Textarea ni boshqariladigan qilish uchun value va onChange yozilishi shart.'; return null;"
    },
    {
      id: 7,
      title: "Radio tugmalari bilan ishlash",
      instruction: "Radio tugmalarining holatini bitta state bilan boshqaring. Har bir radio inputda onChange ulangan. Siz `checked` atributini to'g'ri bog'lashingiz kerak. Agar `gender` state'ining qiymati radio tugmasining `value`siga teng bo'lsa, u `checked` bo'ladi.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [gender, setGender] = useState('erkak');\n\n  const handleChange = (e) => setGender(e.target.value);\n\n  return (\n    <form>\n      <label>\n        <input \n          type=\"radio\" \n          value=\"erkak\"\n          onChange={handleChange}\n        /> Erkak\n      </label>\n      <label>\n        <input \n          type=\"radio\" \n          value=\"ayol\"\n          onChange={handleChange}\n        /> Ayol\n      </label>\n    </form>\n  );\n}",
      hint: "Har bir radio inputga checked={gender === 'erkak'} va mos ravishda 'ayol' deb qo'shing.",
      test: "if (!code.includes('checked={gender ===')) return 'checked atributini to\\'g\\'ri yozing: checked={gender === \\'erkak\\'} va hk.'; return null;"
    },
    {
      id: 8,
      title: "Formani tozalash (Reset)",
      instruction: "Forma muvaffaqiyatli jo'natilgach, inputlarni tozalab yuborish kerak. `handleSubmit` ichida `setFormData` orqali qiymatlarni bo'sh stringlarga tenglab qo'ying.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [formData, setFormData] = useState({ name: '', email: '' });\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(formData);\n    // Shu yerda formData ni tozalang\n    \n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <button type=\"submit\">Jo'natish</button>\n    </form>\n  );\n}",
      hint: "setFormData({ name: '', email: '' }); chaqiring.",
      test: "if (!code.match(/setFormData\\(\\s*\\{\\s*name:\\s*['\"]['\"]\\s*,\\s*email:\\s*['\"]['\"]\\s*\\}\\s*\\)/)) return 'Formani tozalash uchun setFormData ga bo\\'sh qiymatli obyekt bering.'; return null;"
    },
    {
      id: 9,
      title: "Oddiy validatsiya (Tekshirish)",
      instruction: "Forma yuborilganda foydalanuvchi ism kiritgan-kiritmaganini tekshiring. Agar `name` bo'sh bo'lsa, `setError` yordamida 'Ism kiritilmadi' xatosini chiqaring va funksiyani to'xtating (`return`).",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [name, setName] = useState('');\n  const [error, setError] = useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    // Validatsiya qismi\n    \n    \n    setError('');\n    alert(\"Yuborildi: \" + name);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {error && <p style={{ color: 'red' }}>{error}</p>}\n      <input value={name} onChange={e => setName(e.target.value)} />\n      <button type=\"submit\">Jo'natish</button>\n    </form>\n  );\n}",
      hint: "if (name.trim() === '') { setError('Ism kiritilmadi'); return; }",
      test: "if (!code.includes('setError') || !code.includes('return')) return 'Xatoni tekshirib, xato bo\\'lsa setError ga tekst berib, return qiling.'; return null;"
    },
    {
      id: 10,
      title: "Uncontrolled Component (useRef yordamida)",
      instruction: "State o'rniga useRef ishlatib input qiymatini olish. useRef yordamida `inputRef` yarating va uni inputning `ref` atributiga bering. Form jo'natilganda `inputRef.current.value` orqali alert'ga matnni chiqaring.",
      startingCode: "import React, { useRef } from 'react';\n\nexport default function App() {\n  // inputRef yarating\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    // inputRef.current.value ni alert bilan chiqaring\n    \n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* ref={inputRef} ni bog'lang */}\n      <input />\n      <button type=\"submit\">Jo'natish</button>\n    </form>\n  );\n}",
      hint: "const inputRef = useRef(null); yarating. Keyin <input ref={inputRef} /> bog'lang. alert(inputRef.current.value) qiling.",
      test: "if (!code.includes('useRef') || !code.includes('inputRef.current.value') || !code.includes('ref={inputRef}')) return 'useRef dan foydalaning va inputRef.current.value orqali qiymatni oling.'; return null;"
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
    },
    {
      question: "Inputga `value` berib, lekin `onChange` bermasa nima bo'ladi?",
      options: [
        "Inputga xohlagancha matn yozish mumkin bo'ladi",
        "Input read-only (faqat o'qish uchun) bo'lib qoladi va unga hechnima yozib bo'lmaydi.",
        "Brauzer xato (error) beradi va sahifa qotib qoladi.",
        "Input avtomatik ravishda uncontrolled componentga aylanadi."
      ],
      correctAnswer: 1,
      explanation: "React state orqali value o'rnatilganda, state o'zgarmaguncha value ham o'zgarmaydi. Agar `onChange` yozilmasa, state o'zgarmaydi va input har doim bir xil ma'lumotni ko'rsatib turaveradi."
    },
    {
      question: "Ko'p inputli formalarda har biri uchun alohida `useState` yozmaslikning qanday yo'li bor?",
      options: [
        "useState ni massiv ichiga yozish",
        "Formani uncontrolled qilib qo'yish",
        "Barcha inputlar uchun bitta obyekt ko'rinishidagi state yaratish (masalan: `useState({ism: '', email: ''})`).",
        "React'da bunga imkoniyat yo'q, har biri uchun alohida ochish shart."
      ],
      correctAnswer: 2,
      explanation: "Ko'p inputlar bilan ishlaganda ularni guruhlab bitta state obyektiga saqlash kodni qisqaroq va toza saqlashga yordam beradi."
    },
    {
      question: "Checkbox ni boshqarish (controlled qilish) uchun `value` o'rniga qaysi atribut ishlatiladi?",
      options: [
        "checked",
        "defaultChecked",
        "isSelected",
        "onChecked"
      ],
      correctAnswer: 0,
      explanation: "Checkbox o'zida matn emas, rost/yolg'on (true/false) holatni saqlaydi, shuning uchun React da uni controlled qilishda `checked={state}` atributi ishlatiladi."
    },
    {
      question: "`onChange` hodisasida inputning joriy qiymatini qanday olish mumkin?",
      options: [
        "e.value",
        "e.target.value",
        "event.current.value",
        "e.target.checked"
      ],
      correctAnswer: 1,
      explanation: "JavaScript hodisalarida (Event) `e.target` hodisa ro'y bergan HTML elementni qaytaradi. Uning qiymatini esa `e.target.value` orqali olamiz."
    },
    {
      question: "Obyekt ko'rinishidagi form state ni yangilashda nima uchun `...formData` yozish tavsiya qilinadi?",
      options: [
        "Chunki React da state faqat massiv va obyektlarni qabul qiladi.",
        "Oldingi kiritilgan form ma'lumotlarini yo'qotib qo'ymaslik uchun. Agar spread ishlatilmasa, qolgan hamma maydonlar o'chib ketadi.",
        "Spread operatori tezroq ishlashi uchun.",
        "Sintaksis qoidalari talab qilgani uchun."
      ],
      correctAnswer: 1,
      explanation: "State-ni obyekt sifatida yangilaganda, biz butunlay yangi obyekt berishimiz kerak. `...formData` eskisini olib kelib, uning ustiga yangi o'zgargan qiymatni yozadi. Yo'qsa boshqa field'lar tushib qoladi."
    },
    {
      question: "`<textarea>` ni React da qanday qilib controlled qilish mumkin?",
      options: [
        "`<textarea>{state}</textarea>` ko'rinishida yozib",
        "Uni controlled qilishning iloji yo'q",
        "Xuddi input kabi unga ham `value={state}` va `onChange` ulab.",
        "`<textarea text={state} />` deb yozib."
      ],
      correctAnswer: 2,
      explanation: "HTML da textarea ochuvchi-yopuvchi teg bo'lsa ham, React da formalar oson bo'lishi uchun textarea xuddi input kabi `value` qabul qiladi."
    },
    {
      question: "Select (Drop-down) menyusida tanlangan elementni qayerda ushlab turamiz?",
      options: [
        "Har bir `<option>` ning o'zining ichida state ochamiz",
        "`<select>` tegining o'ziga `value={state}` va `onChange` ulaymiz.",
        "Select uchun ham formaga preventDefault ishlatamiz.",
        "`<select>` dagi tanlangan narsani faqat useRef bilan ushlab bo'ladi."
      ],
      correctAnswer: 1,
      explanation: "React da Select elementini boshqarish uchun eng ota `<select>` tegiga `value` va `onChange` beriladi. U qaysi option tanlanganini value bo'yicha to'g'ri bog'lab oladi."
    },
    {
      question: "Formani jo'natish qachon ishga tushadi (onSubmit qachon yuz beradi)?",
      options: [
        "Form ichidagi istalgan inputga yozish bilanoq",
        "Form ichida `type=\"submit\"` bo'lgan tugma bosilganda yoki input ichida Enter tugmasi bosilganda.",
        "Foydalanuvchi sahifadan chiqib ketganda",
        "Faqatgina form elementida onClick bo'lganda"
      ],
      correctAnswer: 1,
      explanation: "`onSubmit` hodisasi HTML formasining maxsus voqeasidir va u form ichidagi yuborish (submit) tugmasi yoki klaviaturadan Enter orqali amalga oshiriladi."
    },
    {
      question: "Agar formani serverga jo'natishdan oldin inputda xato bo'lsa nima qilishimiz kerak?",
      options: [
        "Sahifani majburlab refresh qilib yuborish kerak",
        "`setError` kabi holat orqali ekranga xatolik xabarini chiqarib, funksiya tugashini `return` qilib to'xtatish kerak.",
        "onSubmit ni o'chirib qo'yish kerak",
        "Formani tezroq jo'natib, server o'zi javob berishini kutish kerak"
      ],
      correctAnswer: 1,
      explanation: "Mijoz (Client) tomonda oddiy validatsiya qilish eng tez va oson yo'ldir. Xatolik ko'rsatilgach, `return` orqali backendga xato ma'lumot borishining oldi olinadi."
    },
    {
      question: "Uncontrolled formadan foydalanish qachon ko'proq ma'qul keladi?",
      options: [
        "React o'rganayotganda doim shuni ishlatish kerak.",
        "Juda ham murakkab validatsiyalar va real-time qidiruv qilish kerak bo'lganda.",
        "Redux ishlatilganda",
        "Forma juda oddiy bo'lganda (masalan, faqat bitta fayl yuklash - input type=\"file\" yoki bitta qidiruv inputi) va ortiqcha state kerak bo'lmaganda."
      ],
      correctAnswer: 3,
      explanation: "Uncontrolled forms faqat zarurat tug'ilganda (fayllar yuklash qat'iyan uncontrolled bo'ladi) yoki kodni state'ga bog'lab yotishga hojat yo'q kichik, sodda inputlarda ishlatilishi mumkin. Ammo asosiy standart bu controlled usuldir."
    }
  ]
};

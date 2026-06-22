export const step9_forms = {
  title: "9-DARS: Formalar bilan ishlash",
  content: `
# React'da Formalar (Forms): Boshqariladigan va Boshqarilmaydigan Komponentlar

## 1. Kirish: React'da Formalar vs Oddiy (Native) Formalar

HTML'dagi oddiy formalar (\`<form>\`, \`<input>\`, \`<select>\`) o'zining ichki holatini (state) o'zi saqlaydi. Masalan, foydalanuvchi \`<input>\` ga nimadir yozsa, brauzer o'sha qiymatni o'z xotirasida saqlab turadi va forma yuborilmaguncha biz unga aralashmasligimiz mumkin.

Lekin React'da biz barcha ma'lumotlar oqimini o'z nazoratimizda ushlab turishni yaxshi ko'ramiz. React "One-way data flow" (Bir yo'nalishli ma'lumotlar oqimi) qoidasiga asoslanadi. Shu sababli, HTML formalarining o'zicha, shaxsiy holatiga ega bo'lib mustaqil ishlashi React falsafasiga unchalik to'g'ri kelmaydi.

**Hayotiy o'xshatish:**
Tasavvur qiling, oddiy HTML formasi bu – mustaqil ishlaydigan xodim. Siz unga blankalarni berasiz, u o'zi to'ldiradi va oxirida sizga tayyor hujjatni olib keladi (submit). Jarayon davomida u nima yozayotganini va qanday xatolar qilayotganini ko'rmaysiz. 
React formasi (Controlled Component) esa – xuddi sizning ko'z o'ngingizda yozayotgan yordamchi kabi. Har bir harfni yozganda, siz u harfni o'qiysiz, tekshirasiz, tasdiqlaysiz va ro'yxatga kiritasiz. Siz hamma narsani 100% nazorat qilasiz.

---

## 2. Controlled (Boshqariladigan) va Uncontrolled (Boshqarilmaydigan) Komponentlar

React'da formalarni boshqarishning ikkita asosiy yondashuvi bor:

### Uncontrolled Components (Boshqarilmaydigan Komponentlar)
Bu usulda biz formaning holatini React'ning \`state\`ida saqlamaymiz. Buning o'rniga biz DOM'ga to'g'ridan-to'g'ri ulanamiz (\`useRef\` hooki yordamida) va faqat kerak paytda (masalan, yuborish tugmasi bosilganda) qiymatni DOMdan tortib olamiz. Bu xuddi Vanilla JavaScript yoki HTML'dagi klassik formalar bilan bir xil ishlaydi.

**Nega kerak? / Qachon ishlatiladi?**
- Agar siz React'ni eski loyihaga (masalan jQuery bilan yozilgan) qo'shayotgan bo'lsangiz va ma'lumotlar oqimini tezda ulash kerak bo'lsa.
- Juda oddiy formalar uchun (faqat bitta input va submit tugmasi bo'lsa) va har bir o'zgarishni bilish shart bo'lmasa.
- Fayl yuklash (\`<input type="file">\`) uchun – chunki uning qiymatini React bilan boshqarib bo'lmaydi (xavfsizlik sababli u har doim boshqarilmaydigan hisoblanadi).

### Controlled Components (Boshqariladigan Komponentlar)
Bu React'ning rasmiy va tavsiya etilgan usuli. Bunda \`<input>\` ning \`value\` si to'g'ridan-to'g'ri React \`state\`iga bog'lanadi. Foydalanuvchi nimanidir yozganda, u brauzer xotirasiga emas, birinchi bo'lib React \`state\`iga boradi va u yerdan qaytib inputga yoziladi. React \`state\` "Yagona haqiqat manbai" (Single Source of Truth) ga aylanadi.

**Nega kerak? / Qachon ishlatiladi?**
- Kiritilayotgan ma'lumotni o'sha zahoti tekshirish (Real-time validation) uchun (masalan, parolni juda qisqa ekanligini foydalanuvchi yozayotgan paytdanoq ko'rsatish).
- Ma'lumotni ma'lum bir formatga solish (Masking/Formatting) uchun (masalan, barcha harflarni darhol kattalashtirish yoki telefon raqamini +998 (xx) xxx-xx-xx formatiga o'tkazish).
- Bitta inputning qiymatiga qarab sahifadagi boshqa joylarni o'zgartirish uchun (masalan, "Men rozi emasman" belgilansa, "Yuborish" tugmasini aktivlikdan chiqarish).

---

## 3. Boshqariladigan Komponentning ishlash mexanizmi (One-way data binding)

Keling, Controlled Component qanday ishlashini quyidagi Mermaid sxemasi orqali ko'ramiz:

\`\`\`mermaid
graph TD
    A([Foydalanuvchi harf kiritadi: 'a']) -->|onChange event trigger qilinadi| B(Event Handler ishga tushadi)
    B -->|setState'a'| C{React State yangilanadi}
    C -->|Re-render jarayoni| D[Komponent qayta chiziladi]
    D -->|value prop orqali| E([Input maydonida 'a' harfi paydo bo'ladi])
    
    classDef userAction fill:#f9d0c4,stroke:#333,stroke-width:2px;
    classDef reactAction fill:#c4e1f9,stroke:#333,stroke-width:2px;
    
    class A,E userAction;
    class B,C,D reactAction;
\`\`\`

Bu jarayon shunchalik tez yuz beradiki, foydalanuvchi o'zini to'g'ridan-to'g'ri inputga yozayotgandek his qiladi. Aslida esa har bir bosilgan klaviatura tugmasi React'ning uzluksiz filtrlash va tasdiqlash jarayonidan o'tadi!

---

## 4. Controlled Componentga Misol: Do's and Don'ts

Keling, ism kiritish uchun oddiy formani ko'ramiz.

### 🔴 Yomon amaliyot (Don't)
Agar siz inputga \`value\` bersangiz-u, lekin \`onChange\` yozmasangiz, React xato beradi va input qotib qoladi (Read-only bo'lib qoladi). Sababi, siz "Input qiymati har doim state'dagi qiymat bilan bir xil bo'lsin" dedingiz, lekin u qiymatni o'zgartirish yo'lini (onChange) ko'rsatmadingiz.

\`\`\`jsx
// ❌ YOMON USUL: Input bloklanib qoladi
import { useState } from 'react';

function BadForm() {
  const [name, setName] = useState('Ali');

  return (
    <form>
      {/* Diqqat: Bu yerda onChange yo'q, shuning uchun foydalanuvchi yozuvni o'zgartira olmaydi! */}
      <input type="text" value={name} />
    </form>
  );
}
\`\`\`

### 🟢 Yaxshi amaliyot (Do)
To'g'ri ulangan Boshqariladigan Komponent:

\`\`\`jsx
// ✅ YAXSHI USUL: To'liq nazorat
import { useState } from 'react';

function GoodForm() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    // Biz bu yerda aralashishimiz mumkin!
    // Masalan: Kiritilayotgan qiymatni faqat katta harflarga o'tkazamiz
    setName(e.target.value.toUpperCase());
  };

  return (
    <form>
      <label>
        Ismingiz:
        <input 
          type="text" 
          value={name} 
          onChange={handleChange} 
          placeholder="Ismingizni kiriting..."
        />
      </label>
      <p>Siz kiritdingiz: {name}</p>
    </form>
  );
}
\`\`\`

---

## 5. Ko'p inputlarni bitta state bilan boshqarish

Tasavvur qiling, formada 1 ta emas, balki 10 ta input bor (Ism, familiya, yosh, manzil, telefon va h.k.). Har biri uchun alohida \`useState\` yozish (\`const [firstName, setFirstName] = useState('')\` , \`const [lastName, setLastName] = useState('')\` ...) kodni juda uzaytirib yuboradi. Buning o'rniga barcha maydonlarni bitta obyekt (object) ko'rinishida guruhlab saqlashimiz mumkin!

**Hayotiy o'xshatish:**
Har bir xodim haqidagi ma'lumot (ismi, yoshi, kasbi) uchun alohida qog'oz ishlatgandan ko'ra, hamma ma'lumotni bitta maxsus anketaga (obyekt) yozgan ming marta qulayroq.

Buning siri – inputlarga \`name\` atributini to'g'ri berish va \`onChange\` funksiyasida shu \`name\`dan kalit (key) sifatida foydalanish.

\`\`\`jsx
import { useState } from 'react';

function UserProfileForm() {
  // Barcha ma'lumotlar uchun bitta state obyekti
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });

  // Umumiy o'zgartiruvchi universal funksiya
  const handleInputChange = (event) => {
    // event.target dan 'name' atributini va kiritilgan 'value' ni ajratib olamiz
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData, // Oldingi qolgan ma'lumotlarni o'chib ketmasligi uchun nusxalaymiz
      [name]: value // Qaysi input o'zgargan bo'lsa (name orqali topamiz), faqat shuni yangilaymiz
    }));
  };

  return (
    <form>
      <input 
        type="text" 
        name="firstName" // State dagi kalit nomiga aynan mos kelishi kerak
        value={formData.firstName} 
        onChange={handleInputChange} 
        placeholder="Ism"
      />
      <input 
        type="text" 
        name="lastName" 
        value={formData.lastName} 
        onChange={handleInputChange} 
        placeholder="Familiya"
      />
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleInputChange} 
        placeholder="Pochta"
      />
      <input 
        type="number" 
        name="age" 
        value={formData.age} 
        onChange={handleInputChange} 
        placeholder="Yosh"
      />
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f4f4f4' }}>
        <strong>Sizning profilingiz:</strong>
        <p>Ism-familiya: {formData.firstName} {formData.lastName}</p>
        <p>Email: {formData.email}</p>
        <p>Yosh: {formData.age}</p>
      </div>
    </form>
  );
}
\`\`\`

> **Muhim eslatma!** \`[name]: value\` sintaksisi JavaScript'dagi "Computed Property Names" (Hisoblangan xususiyat nomlari) deyiladi. Bu orqali biz obyektning qaysi kalitiga qiymat yozishni dinamik ravishda, o'zgaruvchining joriy qiymati orqali belgilaymiz. Spread operatori (\`...prevData\`) esa obyektning o'zgarmayotgan qismlarini saqlab qolish uchun juda muhim, aks holda ular yo'qolib ketadi.

---

## 6. Formani Yuborish (Submission) va Validatsiya (Validation) tushunchalari

### Formani Yuborish (\`onSubmit\`)
Oddiy HTML formalarini yuborganda (masalan "Submit" tugmasini bosganda), brauzer odatiga ko'ra sahifani qayta yuklaydi (refresh). React'da biz bunday bo'lishini hech qachon xohlamaymiz, chunki sahifa yangilansa barcha JavaScript xotirasi (va albatta barcha \`state\`lar) butunlay yo'qoladi. Bu "Single Page Application" (SPA) ruhiga va tezkorlikka mutlaqo ziddir.

Buning oldini olish uchun formaning yuborilish hodisasini ushlab qolib, \`event.preventDefault()\` funksiyasidan foydalanamiz.

### Validatsiya (Ma'lumotlarning to'g'riligini tekshirish)
Kiritilayotgan ma'lumotlar to'g'ri, xavfsiz va biz kutgan formatda ekanligini tekshirishimiz kerak. React'da validatsiya asosan:
1. Forma yuborilayotgan paytda (\`onSubmit\`da) 
2. Yoki foydalanuvchi ma'lumot kiritayotgan jarayonning o'zida (\`onChange\`da) amalga oshiriladi.

Quyida amaliy validatsiyaga misol:

\`\`\`jsx
import { useState } from 'react';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Xatoliklarni foydalanuvchiga ko'rsatish uchun state

  const handleSubmit = (event) => {
    // 1. Brauzer sahifani yangilashini qat'iyan to'xtatamiz!
    event.preventDefault();

    // 2. Validatsiya (Tekshiruv bosqichi)
    if (!email.includes('@')) {
      setError("Iltimos, to'g'ri email manzilini kiriting.");
      return; // Xato topildimi? Jarayonni shu yerda to'xtatamiz!
    }
    
    if (password.length < 6) {
      setError("Xavfsizlik talabi: Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    // 3. Agar tekshiruvlardan muvaffaqiyatli o'tsa, oldingi xatoliklarni tozalaymiz
    setError('');

    // 4. Serverga yuborish mantiqi (API call)
    // Bu yerda hozircha faqat konsolga chiqaramiz
    console.log("Ma'lumotlar tekshirildi va yuborishga tayyor!", { email, password });
    
    // 5. Yuborilgandan so'ng formani tozalab qo'yishimiz mumkin (ixtiyoriy)
    setEmail('');
    setPassword('');
    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <h2>Tizimga kirish</h2>
      
      {/* Agar xato mavjud bo'lsa, uni qizil rangda ko'rsatamiz */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ {error}</p>}
      
      <input 
        type="text" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email manzil"
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Yashirin parol"
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      
      <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
        Ro'yxatdan O'tish
      </button>
    </form>
  );
}
\`\`\`

### Xulosa
React'da formalar bilan ishlash boshlanishiga biroz qiyinroq va oddiy HTML'ga nisbatan ko'proq kod yozishni talab qiladigandek tuyulishi mumkin. Ammo bu yondashuv (Controlled Components) bizga forma ustidan **100% to'liq nazoratni** beradi. Kelajakda bu sizga murakkab validatsiyalar qilish, dinamik qadamli (step-by-step) formalar yaratish va UI interfeysni foydalanuvchi kiritgan ma'lumotlarga qarab zumda reaksiyaga kiritish imkonini beradi.

---

> **💡 Bonus Maslahat:** Agar loyihangizda formalar juda ko'p, katta va murakkab bo'lsa (masalan, 20-30 ta input maydonlari, qiyin va chuqur validatsiyalar), bu ishlarni qo'lda qilish o'rniga **Formik** yoki **React Hook Form** kabi tayyor va mashhur kutubxonalardan foydalanish tavsiya etiladi. Ular sizni ortiqcha qozon-kod (boilerplate) yozishdan qutqaradi, ishlash tezligini (performance) oshiradi va qulay validatsiya vositalarini taqdim etadi. Ammo ularni ishlatishga o'tishdan oldin, hozirgina o'rgangan "Controlled Components" mexanizmini to'liq o'zlashtirib, tushunib olishingiz shart!

`,
  code: `import React, { useState } from "react"; // React va useState hook'i

export default function RegistrationForm() {
  // Barcha input ma'lumotlarini bitta object (obyekt) ko'rinishidagi state da yig'ib saqlaymiz.
  // Bu bizga ko'plab useState larni yaratishdan qochish imkonini beradi.
  const [formData, setFormData] = useState({
    username: "", // Ism uchun
    email: "", // Elektron pochta uchun
    gender: "erkak" // Select (tanlov) elementi uchun boshlang'ich standart qiymat
  });
  
  // Xatoliklarni va muvaffaqiyatli xabarlarni ekranga chiqarish uchun alohida state'lar
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Barcha inputlarning o'zgarishini tutib oluvchi universal yagona funksiya
  const handleInputChange = (e) => {
    // Kiritilayotgan elementning name (nomi) va value (qiymati) ni ajratib olamiz
    const { name, value } = e.target;
    
    // Forma holatini yangilaymiz
    setFormData({
      ...formData, // Obyektdagi avvalgi ma'lumotlarni yo'qotib qo'ymaslik uchun nusxalab olamiz
      [name]: value // Faqat nomi mos kelgan xossani (property) qiymatini o'zgartiramiz
    });
  };

  // Forma yuborilganda (Submit tugmasi bosilganda yoki Enter bosilganda) ishlashi kerak bo'lgan logika
  const handleSubmit = (e) => {
    e.preventDefault(); // ENg muhimi: BRAUZER REFRESH BO'LISHINI (sahifa qayta yuklanishini) TO'XTATAMIZ!

    // Oddiy validatsiya (Tekshirish jarayoni)
    // Agar 'username' yoki 'email' bo'sh joylardan tashkil topgan bo'lsa...
    if (formData.username.trim() === "" || formData.email.trim() === "") {
      setError("Iltimos, barcha maydonlarni to'ldiring!"); // Xato haqida xabar qo'yamiz
      setSuccessMsg(""); // Muvaffaqiyat xabarini bo'shatamiz
      return; // Jarayonni shu yerda to'xtatamiz! Pastdagi kodlar ishlamaydi.
    }

    // Agar hammasi to'g'ri bo'lsa...
    setError(""); // Xatolarni tozalaymiz
    // Tabriklash xabarini ko'rsatamiz
    setSuccessMsg(\`Tabriklaymiz \${formData.username}! Siz muvaffaqiyatli ro'yxatdan o'tdingiz.\`);
    
    // Muvaffaqiyatli yuborilgandan so'ng formani (inputlarni) bo'shatib, tozalab yuboramiz
    setFormData({ username: "", email: "", gender: "erkak" });
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, fontFamily: "sans-serif" }}>
      <h2>Ro'yxatdan o'tish</h2>
      
      {/* Agar xato yoki muvaffaqiyat matni mavjud bo'lsa, ularni mos rangda ko'rsatamiz */}
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {successMsg && <div style={{ color: "green", marginBottom: 10 }}>{successMsg}</div>}

      {/* Formani ochamiz va yuborilganda handleSubmit funksiyasini biriktiramiz */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        
        <div>
          <label>Ismingiz:</label><br />
          <input 
            type="text" 
            name="username" // Name atributi formData state dagi kalit so'z bilan aynan bir xil bo'lishi shart!
            value={formData.username} // Qiymatni state dan oladi
            onChange={handleInputChange} // O'zgarishni tutib oladi
            style={inputStyle}
          />
        </div>

        <div>
          <label>Email manzilingiz:</label><br />
          <input 
            type="email" 
            name="email" // Bu yerda ham state dagi 'email' ga mos keladi
            value={formData.email} 
            onChange={handleInputChange} 
            style={inputStyle}
          />
        </div>

        <div>
          <label>Jinsingiz:</label><br />
          {/* Select ham input kabi value va onChange orqali boshqariladi */}
          <select 
            name="gender" // State dagi 'gender' qismiga to'g'ri keladi
            value={formData.gender} 
            onChange={handleInputChange} 
            style={inputStyle}
          >
            <option value="erkak">Erkak</option>
            <option value="ayol">Ayol</option>
          </select>
        </div>

        {/* Submit tugmasi. Buni bosganda forma onSubmit hodisasini chaqiradi */}
        <button type="submit" style={{ padding: "10px", background: "#3498db", color: "white", border: "none", cursor: "pointer", borderRadius: 4 }}>
          Jo'natish
        </button>

      </form>
    </div>
  );
}

// Barcha inputlar uchun umumiy CSS dizayni
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
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  // shahar nomini saqlash uchun state (holat) yaratamiz\n  const [city, setCity] = useState('');\n\n  return (\n    <div>\n      {/* VAZIFA: Shu inputga onChange hodisasini ulang va e.target.value orqali kiritilgan matnni setCity ga bering */}\n      <input value={city} placeholder=\"Shahringiz\" />\n      <p>Siz yashaydigan shahar: {city}</p>\n    </div>\n  );\n}",
      hint: "<input value={city} onChange={(e) => setCity(e.target.value)} />",
      test: "if (!code.includes('onChange')) return 'Input ga onChange atributini yozish esdan chiqdi.'; return null;"
    },
    {
      id: 2,
      title: "Checkbox bilan ishlash",
      instruction: "Checkbox holatini state-da saqlash uchun `e.target.checked` dan foydalanamiz. Kodda berilgan input (checkbox) uchun onChange funksiyasini qo'shing va `setIsChecked` orqali uni yangilang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  // Checkbox ning tanlangan yoki tanlanmagan (true/false) holatini saqlash\n  const [isChecked, setIsChecked] = useState(false);\n\n  return (\n    <div>\n      <label>\n        <input \n          type=\"checkbox\" \n          checked={isChecked} \n          {/* VAZIFA: Bu yerga onChange qo'shing va e.target.checked qilib qiymatni oling */}\n        />\n        Shartlarga roziman\n      </label>\n      {/* Checkbox holatiga qarab ekranga matn chiqadi */}\n      <p>{isChecked ? 'Rozisiz' : 'Rozi emassiz'}</p>\n    </div>\n  );\n}",
      hint: "onChange={(e) => setIsChecked(e.target.checked)} ni inputga qo'shing.",
      test: "if (!code.includes('onChange') || !code.includes('target.checked')) return 'Checkbox holatini yangilash uchun onChange va e.target.checked dan foydalaning.'; return null;"
    },
    {
      id: 3,
      title: "Formani jo'natish (Submit) va preventDefault",
      instruction: "Forma yuborilganda sahifa yangilanib ketishining oldini olish kerak. `handleSubmit` funksiyasi ichida `e.preventDefault()` chaqiring.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [text, setText] = useState('');\n\n  // Forma yuborilganda ishga tushadigan funksiya\n  const handleSubmit = (e) => {\n    // VAZIFA: Shu yerda e.preventDefault() chaqirib, brauzer sahifani yangilab yuborishining oldini oling!\n    \n    alert(\"Yuborildi: \" + text);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      {/* Quyidagi tugma bosilganda formaning onSubmit hodisasi chaqiriladi */}\n      <button type=\"submit\">Yuborish</button>\n    </form>\n  );\n}",
      hint: "handleSubmit funksiyasi boshida e.preventDefault(); yozing.",
      test: "if (!code.includes('preventDefault()')) return 'e.preventDefault() orqali brauzerning standart harakatini to\\'xtating.'; return null;"
    },
    {
      id: 4,
      title: "Ko'p inputlarni bitta State-da saqlash",
      instruction: "Obyekt ko'rinishidagi state'ni yangilash. `handleChange` funksiyasini to'ldiring: u o'zgarayotgan inputning `name` qiymatiga qarab, mos holda state-dagi qiymatni o'zgartirishi kerak. Eslatma: oldingi ma'lumotlarni saqlab qolishni unutmang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  // 2 xil input uchun yagona obyekt (object) state yaratyapmiz\n  const [formData, setFormData] = useState({\n    firstName: '',\n    lastName: ''\n  });\n\n  // O'zgarishni tutib oluvchi funksiya\n  const handleChange = (e) => {\n    // Qaysi inputda yozilayotganini aniqlash uchun 'name' va nima yozilayotganini bilish uchun 'value' olinadi\n    const { name, value } = e.target;\n    \n    // VAZIFA: Shu yerda formData ni yangilang.\n    // Maslahat: ...formData orqali eskisini nusxalab oling va [name]: value bilan yangilang.\n    setFormData({\n      \n    });\n  };\n\n  return (\n    <form>\n      {/* E'tibor bering: name atributi formDatadagi xossalar (keys) bilan bir xil */}\n      <input name=\"firstName\" value={formData.firstName} onChange={handleChange} />\n      <input name=\"lastName\" value={formData.lastName} onChange={handleChange} />\n    </form>\n  );\n}",
      hint: "...formData, [name]: value dan foydalaning.",
      test: "if (!code.includes('...formData') || !code.includes('[name]:')) return 'Obyektni to\\'g\\'ri yangilang: ...formData yordamida avvalgi ma\\'lumotlarni saqlab, [name]: value bilan yangi maydonni yozing.'; return null;"
    },
    {
      id: 5,
      title: "Select bilan ishlash",
      instruction: "Select elementining tanlangan qiymatini state bilan boshqaring. `<select>` elementiga `value` va `onChange` qo'shing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  // 'color' state boshlang'ich qiymat sifatida 'qizil' ni o'zida saqlaydi\n  const [color, setColor] = useState('qizil');\n\n  return (\n    <div>\n      {/* VAZIFA: Ushbu <select> elementiga 'value' ni bog'lang va 'onChange' hodisasi orqali 'setColor' dan foydalaning */}\n      <select>\n        <option value=\"qizil\">Qizil</option>\n        <option value=\"yashil\">Yashil</option>\n        <option value=\"kok\">Ko'k</option>\n      </select>\n      <p>Siz tanladingiz: {color}</p>\n    </div>\n  );\n}",
      hint: "<select value={color} onChange={(e) => setColor(e.target.value)}> yozing.",
      test: "if (!code.includes('value={color}') || !code.includes('onChange')) return 'Select ga value va onChange atributlarini qo\\'shing.'; return null;"
    },
    {
      id: 6,
      title: "Textarea bilan ishlash",
      instruction: "React-da Textarea HTML dagi kabi ochuvchi va yopuvchi teglar orasiga matn yozish o'rniga, input kabi `value` atributini qabul qiladi. Quyidagi `<textarea>` ga value va onChange biriktiring.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  // Xabarni saqlab turuvchi state\n  const [message, setMessage] = useState('');\n\n  return (\n    <div>\n      {/* VAZIFA: Textarea-ni controlled (boshqariluvchi) qiling.\n          Buning uchun 'value' ga 'message' state'ini va 'onChange' ga 'setMessage' ni ulang. */}\n      <textarea placeholder=\"Xabaringizni yozing...\" />\n      <p>Xabar: {message}</p>\n    </div>\n  );\n}",
      hint: "<textarea value={message} onChange={(e) => setMessage(e.target.value)} /> qiling.",
      test: "if (!code.includes('value={message}') || !code.includes('onChange')) return 'Textarea ni boshqariladigan qilish uchun value va onChange yozilishi shart.'; return null;"
    },
    {
      id: 7,
      title: "Radio tugmalari bilan ishlash",
      instruction: "Radio tugmalarining holatini bitta state bilan boshqaring. Har bir radio inputda onChange ulangan. Siz `checked` atributini to'g'ri bog'lashingiz kerak. Agar `gender` state'ining qiymati radio tugmasining `value`siga teng bo'lsa, u `checked` bo'ladi.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  // Jinsni belgilash uchun boshlang'ich state ('erkak')\n  const [gender, setGender] = useState('erkak');\n\n  // Radio tugmalari o'zgarganda ishlaydigan funksiya\n  const handleChange = (e) => setGender(e.target.value);\n\n  return (\n    <form>\n      <label>\n        {/* VAZIFA: Qachon radio tugma tanlangan (checked) bo'lishini bildirish kerak.\n            Har bir inputga o'zining value'siga mos 'checked={gender === ...}' xususiyatini qo'shing. */}\n        <input \n          type=\"radio\" \n          value=\"erkak\"\n          onChange={handleChange}\n        /> Erkak\n      </label>\n      <label>\n        <input \n          type=\"radio\" \n          value=\"ayol\"\n          onChange={handleChange}\n        /> Ayol\n      </label>\n    </form>\n  );\n}",
      hint: "Har bir radio inputga checked={gender === 'erkak'} va mos ravishda 'ayol' deb qo'shing.",
      test: "if (!code.includes('checked={gender ===')) return 'checked atributini to\\'g\\'ri yozing: checked={gender === \\'erkak\\'} va hk.'; return null;"
    },
    {
      id: 8,
      title: "Formani tozalash (Reset)",
      instruction: "Forma muvaffaqiyatli jo'natilgach, inputlarni tozalab yuborish kerak. `handleSubmit` ichida `setFormData` orqali qiymatlarni bo'sh stringlarga tenglab qo'ying.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [formData, setFormData] = useState({ name: '', email: '' });\n\n  const handleSubmit = (e) => {\n    e.preventDefault(); // Sahifa yangilanishini to'xtatamiz\n    console.log(\"Yuborilgan ma'lumotlar:\", formData);\n    // VAZIFA: Shu yerda formData ni tozalab tashlang.\n    // Inputlar yana bo'm-bo'sh holatga qaytishi kerak.\n    \n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <button type=\"submit\">Jo'natish</button>\n    </form>\n  );\n}",
      hint: "setFormData({ name: '', email: '' }); chaqiring.",
      test: "if (!code.match(/setFormData\\(\\s*\\{\\s*name:\\s*['\"]['\"]\\s*,\\s*email:\\s*['\"]['\"]\\s*\\}\\s*\\)/)) return 'Formani tozalash uchun setFormData ga bo\\'sh qiymatli obyekt bering.'; return null;"
    },
    {
      id: 9,
      title: "Oddiy validatsiya (Tekshirish)",
      instruction: "Forma yuborilganda foydalanuvchi ism kiritgan-kiritmaganini tekshiring. Agar `name` bo'sh bo'lsa, `setError` yordamida 'Ism kiritilmadi' xatosini chiqaring va funksiyani to'xtating (`return`).",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [name, setName] = useState('');\n  const [error, setError] = useState(''); // Xatolik matnini ushlab turish uchun\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    // VAZIFA: Validatsiya (Tekshirish) qismi\n    // Agar 'name' bo'sh bo'lsa (yoki bo'sh joylardan iborat bo'lsa), setError() ga xato yozing va 'return' orqali pastdagi alert kodini to'xtating!\n    \n    \n    setError(''); // Agar muvaffaqiyatli o'tsa, oldingi xatolarni tozalab tashlaymiz\n    alert(\"Yuborildi: \" + name);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* Agar xatolik bo'lsa uni qizil rangda chiqaramiz */}\n      {error && <p style={{ color: 'red' }}>{error}</p>}\n      <input value={name} onChange={e => setName(e.target.value)} />\n      <button type=\"submit\">Jo'natish</button>\n    </form>\n  );\n}",
      hint: "if (name.trim() === '') { setError('Ism kiritilmadi'); return; }",
      test: "if (!code.includes('setError') || !code.includes('return')) return 'Xatoni tekshirib, xato bo\\'lsa setError ga tekst berib, return qiling.'; return null;"
    },
    {
      id: 10,
      title: "Uncontrolled Component (useRef yordamida)",
      instruction: "State o'rniga useRef ishlatib input qiymatini olish. useRef yordamida `inputRef` yarating va uni inputning `ref` atributiga bering. Form jo'natilganda `inputRef.current.value` orqali alert'ga matnni chiqaring.",
      startingCode: "import React, { useRef } from 'react';\n\nexport default function App() {\n  // VAZIFA 1: useRef hook'i yordamida 'inputRef' o'zgaruvchisini yarating\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    // VAZIFA 3: inputRef.current.value orqali DOM'dagi kiritilgan qiymatni olib alert bilan ekranga chiqaring\n    \n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* VAZIFA 2: ref atributi orqali yaratilgan 'inputRef' ni ushbu inputga bog'lang */}\n      <input />\n      <button type=\"submit\">Jo'natish</button>\n    </form>\n  );\n}",
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

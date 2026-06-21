export const project4_form = {
  id: 'project4_form',
  title: '4. Murakkab Forma (Validatsiya)',
  content: `
# Murakkab Forma va Validatsiya (Complex Form & Validation)

React'da formalar bilan ishlash va ma'lumotlarni tekshirish (validation) - bu har bir dasturchi bilishi shart bo'lgan eng muhim ko'nikmalardan biridir. Ushbu darsda biz murakkab forma yaratish, bir nechta inputlarni yagona holat (state) orqali boshqarish hamda xatoliklarni foydalanuvchiga to'g'ri ko'rsatishni o'rganamiz.

## 🎯 Maqsad

Bizning maqsadimiz: Foydalanuvchidan ism, email va parolni qabul qiluvchi, ularning to'g'ri kiritilganligini tekshiruvchi (validatsiya qiluvchi) va xato bo'lsa xabar ko'rsatuvchi murakkab forma yaratish.

## 💡 Nima uchun bu kerak? (Analogiya)

Tasavvur qiling, siz aeroportda bojxona nazoratidan o'tyapsiz. 
Nazoratchi (Form Validation) sizning pasportingiz (Ism), vizangiz (Email) va chiptangizni (Parol) tekshiradi. 
Agar barchasi to'g'ri bo'lsa, sizni o'tkazib yuboradi (Submit Form). Ammo pasportingiz muddati o'tgan bo'lsa (noto'g'ri format), u sizga qayerda xato borligini aytadi (Error Message) va sizni to'xtatib qoladi (Prevent Default).

React'dagi validatsiya ham xuddi shunday ishlaydi - u noto'g'ri ma'lumotlarning tizimga kirishiga yo'l qo'ymaydi.

## 🏗 Forma Arxitekturasi

Keling, formaning ishlash jarayonini Mermaid diagrammasi orqali ko'rib chiqamiz:

\`\`\`mermaid
graph TD
    A["Foydalanuvchi ma'lumot kiritadi"] --> B["onChange hodisasi ishlaydi"]
    B --> C["State yangilanadi"]
    C --> D["Foydalanuvchi Submit tugmasini bosadi"]
    D --> E["e.preventDefault() ishlaydi"]
    E --> F{"Ma'lumotlar to'g'rimi?"}
    F -- "Yo'q" --> G["Xato xabarlari yangilanadi"]
    G --> H["Inputlar tagida xato ko'rsatiladi"]
    F -- "Ha" --> I["Ma'lumotlar serverga yuboriladi"]
\`\`\`

## 1. Yagona State (Single State Object) orqali boshqarish

Har bir input uchun alohida state yaratish o'rniga (\`name\`, \`email\`, \`password\`), ularni yagona obyektda saqlash qulayroq.

\`\`\`jsx
const [formData, setFormData] = useState({
  name: '',      // Foydalanuvchi ismini saqlash uchun
  email: '',     // Email manzilni saqlash uchun
  password: ''   // Parolni saqlash uchun
});
\`\`\`

Input o'zgarganda qanday yangilaymiz?
\`\`\`jsx
// Har qanday input qiymati o'zgarganda ishlaydigan universal funksiya.
const handleChange = (e) => {
  // O'zgarayotgan inputning name atributi va uning yangi qiymatini (value) olamiz.
  const { name, value } = e.target;
  
  // setFormData orqali formData obyektini yangilaymiz.
  setFormData({
    ...formData,   // Eski qiymatlarni yo'qotmaslik uchun nusxalaymiz (spread operator)
    [name]: value  // Qaysi input o'zgargan bo'lsa, o'shaning qiymatini yangilaymiz
  });
};
\`\`\`

Bu yerda \`name\` o'zgaruvchisi inputning \`name\` atributini bildiradi. Biz obyektning faqatgina o'zgargan qismini yangilaymiz, qolgan qiymatlarni esa \`...formData\` orqali saqlab qolamiz.

## 2. Validatsiya (Validation)

Validatsiya formani yuborishdan oldin ma'lumotlarni tekshirish jarayonidir. Biz xatoliklarni saqlash uchun alohida state yaratamiz:

\`\`\`jsx
// Validatsiya natijasidagi xatoliklarni saqlash uchun xatolar state'i.
// Masalan: { name: "Ism kiritish majburiy!" } shaklida saqlanadi.
const [errors, setErrors] = useState({});
\`\`\`

Tekshirish mantiqini yozamiz:
\`\`\`jsx
// Formadagi ma'lumotlarni tekshiruvchi validatsiya funksiyasi.
const validate = () => {
  // Yangi xatolarni vaqtincha saqlash uchun bo'sh obyekt yaratamiz.
  let newErrors = {};

  // Ism bo'sh qoldirilmaganini tekshiramiz (.trim() probellarni olib tashlaydi).
  if (!formData.name.trim()) {
    newErrors.name = "Ism kiritish majburiy!";
  }

  // Email tekshiruvi: avval bo'sh emasligini, so'ng Regex orqali to'g'ri formatdaligini tekshiramiz.
  if (!formData.email) {
    newErrors.email = "Email kiritish majburiy!";
  } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
    newErrors.email = "Noto'g'ri email formati!";
  }

  // Parol tekshiruvi: bo'sh emasligini va kamida 6 ta belgi ekanligini tekshiramiz.
  if (!formData.password) {
    newErrors.password = "Parol kiritish majburiy!";
  } else if (formData.password.length < 6) {
    newErrors.password = "Parol kamida 6 belgidan iborat bo'lishi kerak!";
  }

  // Topilgan xatolarni state'ga saqlaymiz.
  setErrors(newErrors);
  
  // Agar newErrors obyekti bo'sh bo'lsa (hech qanday xato topilmasa), true qaytaradi.
  return Object.keys(newErrors).length === 0; // Agar xato bo'lmasa, true qaytaradi
};
\`\`\`

## 3. Formani Yuborish (Submission)

Forma yuborilganda \`onSubmit\` hodisasi ishlaydi. Sahifa yangilanib ketmasligi uchun birinchi navbatda \`e.preventDefault()\` ni chaqiramiz.

\`\`\`jsx
// Submit tugmasi bosilganda ishlaydigan funksiya.
const handleSubmit = (e) => {
  e.preventDefault(); // Sahifa avtomatik yangilanib ketishini to'xtatadi
  
  // Validatsiyadan o'tkazamiz (true yoki false qaytadi)
  const isValid = validate();
  
  // Agar hamma ma'lumot to'g'ri bo'lsa (xato bo'lmasa)
  if (isValid) {
    console.log("Forma muvaffaqiyatli yuborildi!", formData);
    alert("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
    
    // Formani muvaffaqiyatli yuborgandan keyin inputlarni tozalab qo'yamiz
    setFormData({ name: '', email: '', password: '' });
  }
};
\`\`\`

## 4. Xatolarni interfeysda ko'rsatish

Inputlar ostida xato borligini ko'rsatishimiz kerak:

\`\`\`jsx
<div>
  <label>Ism:</label>
  <input 
    type="text" 
    name="name" 
    value={formData.name} // Input qiymatini state'ga bog'laymiz
    onChange={handleChange} // O'zgarishni tutib oluvchi funksiyamiz
  />
  {/* Agar errors.name mavjud bo'lsa, xato xabarini qizil rangda chiqaramiz */}
  {errors.name && <span className="error" style={{color: 'red'}}>{errors.name}</span>}
</div>
\`\`\`

> **Qoida:** Har doim foydalanuvchiga xatolarni qizil yoki e'tiborni tortuvchi rangda ko'rsating va aniq sababini yozing.

## ✅ Do's and ❌ Don'ts (Qoidalar)

✅ **DO:** Bitta formadagi bog'liq inputlarni boshqarish uchun obyekt state ishlating (\`formData\`).
✅ **DO:** Foydalanuvchiga aniq tushunarli xato xabarlarini ko'rsating ("Bu maydon majburiy" o'rniga "Ismni kiriting").
✅ **DO:** Email va parol formatlarini ishonchli Regular Expression (Regex) orqali tekshiring.

❌ **DON'T:** Formani yuborayotganda \`e.preventDefault()\` ni yozishni unutmang. Bu ma'lumotlar yo'qolishiga sabab bo'ladi.
❌ **DON'T:** Xato xabarlarini alert qilib chiqarmang, ularni bevosita inputning yonida ko'rsating!

> 💡 **"Re-render Bayrami" haqiqati (Performans ogohlantirishi):**
> Bu loyihada biz 10 ta inputni boshqarish uchun juda qulay bo'lgan "Yagona State" (\`formData\`) dan foydalandik. Ammo buning bitta katta aybi bor: siz bitta inputga bitta harf yozganingizda (\`onChange\` ishlaganda), state o'zgaradi va **butun forma boshqatdan chiziladi (re-render bo'ladi)**! React juda tez bo'lgani uchun siz buni ko'zingiz bilan sezmaysiz. Ammo yuzlab inputlari bor ulkan formalarda kompyuter qiynalishni boshlaydi.
> **Katta loyihalarda qanday qilinadi?** Katta kompaniyalar bu muammodan qochish uchun **Uncontrolled Components** (state o'rniga \`useRef\` ishlatish) yoki bu ishlarni orqa fonda juda tez bajarib beruvchi **React Hook Form** kutubxonasidan foydalanishadi. Buni keyingi darajaga chiqqaningizda albatta o'rganing!
  `,
  code: `import React, { useState } from 'react';

export default function App() {
  // Formadagi ma'lumotlarni jamlab saqlovchi yagona obyekt state.
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  // Xatoliklarni saqlash uchun obyekt state.
  const [errors, setErrors] = useState({});

  // Inputlardagi o'zgarishlarni ushlab oluvchi funksiya.
  const handleChange = (e) => {
    const { name, value } = e.target; // Inputning name atributi va yozilgan qiymati
    // Eski formData ni saqlagan holda, faqat o'zgargan input qiymatini yangilaymiz.
    setFormData({ ...formData, [name]: value });
  };

  // Forma yuborilganda (Submit) ishlovchi funksiya.
  const handleSubmit = (e) => {
    e.preventDefault(); // Sahifa yangilanishini to'xtatish
    let newErrors = {}; // Vaqtincha xatoliklarni saqlash obyekti

    // Oddiy validatsiya: agar ism yoki email bo'sh bo'lsa, xatolik qo'shamiz
    if(!formData.name) newErrors.name = 'Ism kiritilmadi';
    if(!formData.email) newErrors.email = 'Email kiritilmadi';
    
    // Topilgan xatolarni state'ga o'tkazamiz
    setErrors(newErrors);
    
    // Agar xatolar obyekti bo'sh bo'lsa (ya'ni hech qanday xato yo'q bo'lsa)
    if(Object.keys(newErrors).length === 0) {
      alert("Muvaffaqiyatli!");
      // Formani qayta bo'sh holatga keltiramiz
      setFormData({ name: '', email: '' });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Ro'yxatdan o'tish</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
        
        <div>
          <input 
            type="text" 
            name="name" 
            placeholder="Ismingiz" 
            value={formData.name} // Input qiymatini state'ga bog'lash
            onChange={handleChange} // O'zgarish bo'lganda ishlaydigan hodisa
            style={{ width: '100%', padding: '8px' }}
          />
          {/* Agar errors obyektida name xatosi bo'lsa, qizil yozuvda ko'rsatiladi */}
          {errors.name && <div style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.name}</div>}
        </div>

        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Emailingiz" 
            value={formData.email} // Input qiymatini state'ga bog'lash
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {/* Agar errors obyektida email xatosi bo'lsa, ko'rsatamiz */}
          {errors.email && <div style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.email}</div>}
        </div>

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Yuborish</button>

      </form>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Yagona State Yaratish",
      description: "Bizning formamiz ism va yosh (age) ni qabul qiladi. \`formData\` degan yagona state yarating va boshlang'ich qiymatlarini bo'sh string qilib bering.",
      startingCode: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  // formData stateni yarating\\n  \\n  return (\\n    <div>Forma</div>\\n  );\\n}`,
      solution: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData, setFormData] = useState({ ism: '', age: '' });\\n  \\n  return (\\n    <div>Forma</div>\\n  );\\n}`,
      hint: "useState orqali obyekt bering: { ism: '', age: '' }"
    },
    {
      id: 2,
      title: "handleChange funksiyasi yaratish",
      description: "Formadagi ma'lumotlarni o'zgartirish uchun \`handleChange\` funksiyasini yarating. Funksiya parametrida \`e\` (event) qabul qilsin va hozircha faqat konsolga e.target.name va e.target.value ni chiqarsin.",
      startingCode: `import React from 'react';\\n\\nexport default function Form() {\\n  // handleChange ni yarating\\n  \\n  return (\\n    <input type="text" name="username" onChange={handleChange} />\\n  );\\n}`,
      solution: `import React from 'react';\\n\\nexport default function Form() {\\n  const handleChange = (e) => {\\n    console.log(e.target.name, e.target.value);\\n  };\\n  \\n  return (\\n    <input type="text" name="username" onChange={handleChange} />\\n  );\\n}`,
      hint: "const handleChange = (e) => { console.log(e.target.name, e.target.value); };"
    },
    {
      id: 3,
      title: "State ni yangilash",
      description: "Sizda formData bor. handleChange ichida formData ni to'g'ri yangilang, buning uchun spread operatordan foydalaning.",
      startingCode: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData, setFormData] = useState({ name: '' });\\n\\n  const handleChange = (e) => {\\n    // setFormData ni chaqiring\\n  };\\n  \\n  return (\\n    <input type="text" name="name" onChange={handleChange} value={formData.name} />\\n  );\\n}`,
      solution: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData, setFormData] = useState({ name: '' });\\n\\n  const handleChange = (e) => {\\n    const { name, value } = e.target;\\n    setFormData({ ...formData, [name]: value });\\n  };\\n  \\n  return (\\n    <input type="text" name="name" onChange={handleChange} value={formData.name} />\\n  );\\n}`,
      hint: "setFormData({ ...formData, [e.target.name]: e.target.value }); yozing."
    },
    {
      id: 4,
      title: "Formani yuborishni to'xtatish",
      description: "onSubmit hodisasi sodir bo'lganda sahifa yangilanmasligi uchun \`e.preventDefault()\` ni qo'shing.",
      startingCode: `import React from 'react';\\n\\nexport default function Form() {\\n  const handleSubmit = (e) => {\\n    // sahifa yangilanishini to'xtating\\n    console.log("Yuborildi!");\\n  };\\n  \\n  return (\\n    <form onSubmit={handleSubmit}>\\n      <button type="submit">Yubor</button>\\n    </form>\\n  );\\n}`,
      solution: `import React from 'react';\\n\\nexport default function Form() {\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    console.log("Yuborildi!");\\n  };\\n  \\n  return (\\n    <form onSubmit={handleSubmit}>\\n      <button type="submit">Yubor</button>\\n    </form>\\n  );\\n}`,
      hint: "handleSubmit ichiga e.preventDefault(); yozing."
    },
    {
      id: 5,
      title: "Oddiy validatsiya: bo'sh emaslik",
      description: "handleSubmit ichida formData.name bo'sh yoki yo'qligini tekshiring. Agar bo'sh bo'lsa, konsolga 'Xato: Ism kiritilmadi' deb chiqaring.",
      startingCode: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData, setFormData] = useState({ name: '' });\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    // Validatsiya qiling\\n  };\\n  \\n  return (\\n    <form onSubmit={handleSubmit}></form>\\n  );\\n}`,
      solution: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData, setFormData] = useState({ name: '' });\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (!formData.name) {\\n      console.log('Xato: Ism kiritilmadi');\\n    }\\n  };\\n  \\n  return (\\n    <form onSubmit={handleSubmit}></form>\\n  );\\n}`,
      hint: "if(!formData.name) orqali tekshiring."
    },
    {
      id: 6,
      title: "Parol uzunligini tekshirish",
      description: "Parol qabul qiluvchi formadagi validatsiyani yozing. Agar formData.password uzunligi 6 dan kichik bo'lsa, konsolga 'Parol juda qisqa' deb yozing.",
      startingCode: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData] = useState({ password: '123' });\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    // Parol uzunligini tekshiring\\n  };\\n  \\n  return <form onSubmit={handleSubmit}></form>;\\n}`,
      solution: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData] = useState({ password: '123' });\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (formData.password.length < 6) {\\n      console.log('Parol juda qisqa');\\n    }\\n  };\\n  \\n  return <form onSubmit={handleSubmit}></form>;\\n}`,
      hint: "formData.password.length < 6"
    },
    {
      id: 7,
      title: "Xatolarni State'ga saqlash",
      description: "\`errors\` degan state yarating (boshlang'ich qiymati bo'sh obyekt \`{}\`). handleSubmit ichida, agar ism kiritilmagan bo'lsa, errors state ni \`{ name: 'Ism kerak' }\` qilib yangilang.",
      startingCode: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData] = useState({ name: '' });\\n  // errors stateni yarating\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    let newErrors = {};\\n    if (!formData.name) {\\n      newErrors.name = 'Ism kerak';\\n    }\\n    // errors stateni yangilang\\n  };\\n  \\n  return <form onSubmit={handleSubmit}></form>;\\n}`,
      solution: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData] = useState({ name: '' });\\n  const [errors, setErrors] = useState({});\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    let newErrors = {};\\n    if (!formData.name) {\\n      newErrors.name = 'Ism kerak';\\n    }\\n    setErrors(newErrors);\\n  };\\n  \\n  return <form onSubmit={handleSubmit}></form>;\\n}`,
      hint: "const [errors, setErrors] = useState({}); va setErrors(newErrors);"
    },
    {
      id: 8,
      title: "Xatoni ekranda chiqarish",
      description: "Input ostida, agar \`errors.name\` mavjud bo'lsa, uni qizil rangli <span> da ko'rsating.",
      startingCode: `import React from 'react';\\n\\nexport default function Form() {\\n  const errors = { name: 'Ism kiritish majburiy' };\\n  \\n  return (\\n    <div>\\n      <input type="text" name="name" />\\n      {/* Xatoni shu yerda ko'rsating */}\\n    </div>\\n  );\\n}`,
      solution: `import React from 'react';\\n\\nexport default function Form() {\\n  const errors = { name: 'Ism kiritish majburiy' };\\n  \\n  return (\\n    <div>\\n      <input type="text" name="name" />\\n      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}\\n    </div>\\n  );\\n}`,
      hint: "{errors.name && <span style={{color: 'red'}}>{errors.name}</span>}"
    },
    {
      id: 9,
      title: "Forma muvaffaqiyatli yuborildi",
      description: "Validatsiya o'tgandan so'ng, ya'ni xatolar obyekti bo'sh bo'lsa (Object.keys(newErrors).length === 0), ekranga alert orqali 'Muvaffaqiyatli' degan xabar chiqaring.",
      startingCode: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    let newErrors = {}; // xatolar yo'q\\n    \\n    // Agar newErrors bo'sh bo'lsa, alert chiqaring\\n  };\\n  \\n  return <form onSubmit={handleSubmit}></form>;\\n}`,
      solution: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    let newErrors = {}; // xatolar yo'q\\n    \\n    if (Object.keys(newErrors).length === 0) {\\n      alert('Muvaffaqiyatli');\\n    }\\n  };\\n  \\n  return <form onSubmit={handleSubmit}></form>;\\n}`,
      hint: "if (Object.keys(newErrors).length === 0) { alert('Muvaffaqiyatli'); }"
    },
    {
      id: 10,
      title: "Formani tozalash",
      description: "Muvaffaqiyatli yuborilgandan so'ng formData ni boshlang'ich holatiga ({name: '', email: ''}) qaytaring.",
      startingCode: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData, setFormData] = useState({ name: 'Ali', email: 'ali@bk.ru' });\\n\\n  const handleSuccess = () => {\\n    // formData ni tozalang\\n  };\\n  \\n  return <button onClick={handleSuccess}>Tozalash</button>;\\n}`,
      solution: `import React, { useState } from 'react';\\n\\nexport default function Form() {\\n  const [formData, setFormData] = useState({ name: 'Ali', email: 'ali@bk.ru' });\\n\\n  const handleSuccess = () => {\\n    setFormData({ name: '', email: '' });\\n  };\\n  \\n  return <button onClick={handleSuccess}>Tozalash</button>;\\n}`,
      hint: "setFormData({ name: '', email: '' });"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Forma yuborilganda sahifa yangilanishining oldini olish uchun qaysi funksiya ishlatiladi?",
      options: [
        "e.stopPropagation()",
        "e.preventDefault()",
        "return false",
        "e.stop()"
      ],
      correctAnswer: 1,
      explanation: "e.preventDefault() formaning standart harakati bo'lgan sahifa yangilanishini to'xtatadi."
    },
    {
      id: 2,
      question: "Bir nechta inputlarni bitta state da saqlash uchun state qanday turda bo'lishi kerak?",
      options: [
        "String",
        "Array",
        "Object",
        "Boolean"
      ],
      correctAnswer: 2,
      explanation: "Inputlarni kalit-qiymat (name: value) shaklida bitta object (obyekt) da saqlash eng qulay va to'g'ri usul hisoblanadi."
    },
    {
      id: 3,
      question: "handleChange funksiyasidagi e.target.name nimani bildiradi?",
      options: [
        "Inputning qiymatini",
        "Inputning 'name' atributini",
        "Formaning nomini",
        "Hodisaning turini"
      ],
      correctAnswer: 1,
      explanation: "e.target.name bu input tagiga yozilgan name='...' atributining qiymati hisoblanadi, masalan 'email' yoki 'password'."
    },
    {
      id: 4,
      question: "State dagi obyektni yangilayotganda oldingi qiymatlarni saqlab qolish uchun qanday sintaksis ishlatiladi?",
      options: [
        "setFormData(formData)",
        "setFormData({ ...formData, yangiQiymat })",
        "setFormData([ ...formData ])",
        "formData.push()"
      ],
      correctAnswer: 1,
      explanation: "Spread operator (...formData) obyektning eskirgan qiymatlarini nusxalaydi, so'ng ustiga yangi qiymat yoziladi."
    },
    {
      id: 5,
      question: "Forma muvaffaqiyatli jo'natilish hodisasini ushlash uchun qaysi event ishlatiladi?",
      options: [
        "onClick (tugmada)",
        "onChange (formada)",
        "onSubmit (formada)",
        "onSend (formada)"
      ],
      correctAnswer: 2,
      explanation: "Formani yuborish <form onSubmit={...}> orqali boshqariladi, chunki u enter bosilganda ham ishlaydi."
    },
    {
      id: 6,
      question: "Obyekt ichida umuman xato yo'qligini (obyekt bo'sh ekanligini) qanday tekshirish mumkin?",
      options: [
        "newErrors === {}",
        "newErrors.length === 0",
        "Object.keys(newErrors).length === 0",
        "newErrors.isEmpty()"
      ],
      correctAnswer: 2,
      explanation: "JS da obyektlar === {} orqali tekshirilmaydi. Ularning kalitlari (keys) sanalib tekshiriladi: Object.keys(obj).length === 0."
    },
    {
      id: 7,
      question: "Controlled Component (boshqariladigan komponent) nima?",
      options: [
        "React state orqali qiymati va o'zgarishi to'liq boshqariladigan input",
        "Foydalanuvchi yoza olmaydigan input",
        "Faqat CSS orqali boshqariladigan component",
        "Validatsiya qilinmaydigan forma"
      ],
      correctAnswer: 0,
      explanation: "React-da inputning value={state} va onChange={setState} bo'lsa, u Controlled Component hisoblanadi."
    },
    {
      id: 8,
      question: "Xatoliklar UI da qanday ko'rsatilishi kerak?",
      options: [
        "Foydalanuvchiga alert qilib",
        "Konsolda (console.log) yashirincha",
        "Qizil rangda, aniq tushunarli qilib input yonida/ostida",
        "Umuman ko'rsatilmaydi, qabul qilinmay qolaveradi"
      ],
      correctAnswer: 2,
      explanation: "Yaxshi UX (User Experience) uchun xatolar darhol input atrofida ko'zga tashlanadigan tarzda ko'rsatilishi kerak."
    },
    {
      id: 9,
      question: "Email to'g'ri formatda ekanligini eng ishonchli tekshirish usuli qanday?",
      options: [
        "if(email.length > 5)",
        "if(email.includes('@'))",
        "if(email === 'test@test.com')",
        "Regular Expression (Regex) orqali"
      ],
      correctAnswer: 3,
      explanation: "Regex (Masalan /\\\\S+@\\\\S+\\\\.\\\\S+/) eng aniq va turlicha formatlarni tekshirishning professional usulidir."
    },
    {
      id: 10,
      question: "Agar inputga name atributi berilmasa nima sodir bo'ladi?",
      options: [
        "Xatolik bermaydi va to'g'ri ishlaydi",
        "e.target.name topilmaydi va barcha inputlar bitta joyga yozilib ketadi yoki state buziladi",
        "React avtomatik name generatsiya qiladi",
        "Forma umuman ochilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Dinamic handleChange funksiyamiz [e.target.name] ga tayanadi. Agar name bo'lmasa undefined degan kalitga qiymat yozilib qoladi."
    },
    {
      id: 11,
      question: "Parol xavfsizligini tekshirish uchun formData.password.length nimani bildiradi?",
      options: [
        "Paroldagi raqamlar sonini",
        "Parolning umumiy uzunligini (belgilar sonini)",
        "Parol array (massiv) ekanligini",
        "Paroldagi bosh harflar sonini"
      ],
      correctAnswer: 1,
      explanation: "Stringning length xususiyati u necha belgidan (harf, son, simvol) iborat ekanligini bildiradi."
    },
    {
      id: 12,
      question: "Nima uchun React-da formalar bilan ishlashda obyekt state eng ko'p ishlatiladi?",
      options: [
        "Har bir input uchun 10-20 ta alohida state yozib o'tirmaslik va kodni ixcham qilish uchun",
        "Chunki obyektlar tezroq ishlaydi",
        "Boshqa yo'li yo'q bo'lganligi uchun",
        "Obyektlar faqat validatsiya uchun mos kelgani sababli"
      ],
      correctAnswer: 0,
      explanation: "Obyekt state (Yagona holat) orqali yuzlab inputlar bo'lsa ham ularni bitta universal handleChange funksiyasi orqali boshqarish mumkin."
    }
  ]
};

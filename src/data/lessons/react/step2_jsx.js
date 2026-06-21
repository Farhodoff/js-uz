export const step2_jsx = {
  title: "2-DARS: JSX Sintaksisi",
  content: `
# 2-qadam: JSX - JavaScript va HTML ning mukammal nikohi

Xush kelibsiz! React olamiga kirib borarkanmiz, birinchi navbatda duch keladigan eng g'ayrioddiy, ammo eng kuchli tushunchalardan biri bu — **JSX**. Agar siz ilgari faqat oddiy HTML va JavaScript (Vanilla JS) bilan ishlagan bo'lsangiz, JSX boshida biroz g'alati tuyulishi mumkin. Ammo ishonavering, uning sehrini tushunib yetganingizdan so'ng, usiz kod yozishni tasavvur qila olmaysiz!

---

## 🧐 JSX o'zi nima?

**JSX (JavaScript XML)** — bu JavaScript tilining sintaksis kengaytmasi. U ko'rinishidan xuddi HTML ga o'xshaydi, lekin to'liq JavaScript quvvatiga ega. JSX orqali biz foydalanuvchi interfeysini (UI) to'g'ridan-to'g'ri JavaScript kodimiz ichida tasvirlashimiz mumkin.

### 💡 Hayotiy o'xshashlik (Analogy)
Tasavvur qiling, siz aqlli uy quryapsiz. An'anaviy veb-dasturlashda:
- **HTML** — bu uyning g'ishtlari, devorlari va xonalari (Struktura).
- **JavaScript** — bu uyning elektr tizimi, avtomatika va kalitlari (Mantiq va Harakat).

Odatda siz g'ishtlarni alohida terib chiqib, keyin ularga sim tortib, ularni birlashtirishingiz kerak bo'lardi (\`document.getElementById\` va hokazo). 
**JSX esa — bu o'zining ichiga oldindan mikrosxema va tugmalar o'rnatilgan "aqlli g'ishtlar"** dir! Siz strukturani qurayotgan vaqtingizning o'zida unga mantiqni ham qo'shib ketasiz. Siz UI qanday ko'rinishini va qanday ishlashini bitta yaxlit joyda ko'rasiz.

---

## ❓ Nega bizga JSX kerak? (Nega mantiq va ko'rinishni aralashtiramiz?)

O'nlab yillar davomida veb-dasturchilarga "Mantiq (JS) va Ko'rinish (HTML) ni alohida fayllarda saqlang" deb o'rgatib kelingan. Bunga "Vazifalarni ajratish" (Separation of Concerns) deyilardi.

Xo'sh, nega React bu qoidani buzadi?

React ijodkorlari anglab yetishdiki, zamonaviy veb-ilovalarda **UI va Mantiq bir-biri bilan uzviy bog'liq**. Tugma qanday ko'rinishi va uni bosganda nima sodir bo'lishi — bu bitta yaxlit narsa (komponent). Kodni fayl turlariga (HTML, JS, CSS) qarab emas, balki **vazifasiga qarab (Komponentlarga)** ajratish ancha mantiqli va samaraliroq.

**JSX ning afzalliklari:**
1. **O'qilishi oson:** Kodga qarashingiz bilan interfeys qanday tuzilganini darhol tushunasiz.
2. **Kamroq xato:** JavaScript ichida HTML yozish orqali, siz xatoliklarni kompilyatsiya vaqtidayoq (brauzerga yetib bormasdan) ko'ra olasiz.
3. **To'liq JS quvvati:** HTML ichida sikllar (\`map\`), shartlar (\`if\`/\`ternary\`) va o'zgaruvchilardan erkin foydalanish mumkin.

---

## ⚙️ Parda ortida: Babel qanday ishlaydi?

Brauzerlar (Chrome, Safari, Edge) JSX ni tushunmaydi! Ularning "tili" — faqat toza JavaScript, HTML va CSS.

Agar shunday bo'lsa, brauzer JSX ni qanday o'qiydi?
Bu yerda maydonga **Babel** tushadi. Babel — bu zamonaviy JS kodini (va JSX ni) eski, barcha brauzerlar tushunadigan oddiy JavaScript kodiga aylantirib beruvchi vosita (kompilyator/transpilyator).

Babel har bir JSX tegingizni olib, uni React'ning \`React.createElement()\` funksiyasi chaqiruviga aylantiradi.

### 🔄 JSX -> Babel -> React Element jarayoni:

\`\`\`mermaid
flowchart TD
    A[Siz yozgan JSX kod\n < div > Salom < /div >] -->|Babel kompilyatori orqali o'tadi| B(JavaScript'ga aylantiriladi\n React.createElement\n'div', null, 'Salom')
    B -->|React Virtual DOM'ga qo'shadi| C{React Element Obyekti}
    C -->|React DOM| D[(Brauzerdagi haqiqiy DOM\n Haqiqiy ko'rinish)]
    
    style A fill:#e1f5fe,stroke:#03a9f4,stroke-width:2px
    style B fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style C fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style D fill:#ffccbc,stroke:#ff5722,stroke-width:2px
\`\`\`

*Ko'rib turganingizdek, JSX shunchaki \`React.createElement\` ni oson va chiroyli yozish uchun "sintaktik shakar" (syntactic sugar) xolos.*

---

## ⚠️ JSX ning qat'iy qoidalari

JSX HTML ga juda o'xshasa-da, uning o'ziga xos qat'iy qoidalari bor. U oddiy HTML ga qaraganda ancha talabchan. Bu qoidalarni bilish juda muhim.

### 1. Barcha elementlar Yagona Ota-ona (Single Parent) ichida bo'lishi shart
Komponent har doim bitta yaxlit element qaytarishi kerak. Agar bir nechta yonma-yon element qaytarmoqchi bo'lsangiz, ularni bitta "qopga" solishingiz kerak.

Nima uchun? Chunki har bir JSX aslini olganda funksiya (\`React.createElement\`) va funksiya faqat bitta qiymat (obyekt) qaytara oladi.

### 2. Barcha teglar albatta yopilishi shart (Self-closing tags)
HTML da \`<input>\` yoki \`<img>\` kabi teglarni yopmasdan tashlab ketish mumkin. JSX da bunday qilib bo'lmaydi. Har bir teg albatta yopilishi shart: \`<input />\`, \`<img />\`, \`<br />\`.

### 3. Atributlar nomlanishi TuyaKo'rinishida (camelCase) bo'lishi kerak
JSX da yozilgan narsa asosan JavaScript bo'lganligi sababli, atribut nomlari JS qoidalariga bo'ysunadi. 
- HTML dagi \`class\` atributi JSX da \`className\` ga aylanadi (chunki \`class\` bu JavaScript da zaxiralangan so'z - keyword).
- \`for\` o'rniga \`htmlFor\`.

> 💡 **"JSX - HTML va JS'ning g'alati gibridi" haqiqati:**
> Dasturchilar yillar davomida "HTML va JS alohida bo'lishi kerak" degan qoidaga ishonib kelishgan. React esa kelib ularni aralashtirib yubordi! Natijada, oddiy CSS klassini berish uchun ham \`className\` deb yozishga majburmiz. Bu boshida kulgili va g'alati tuyuladi. Lekin esda tuting: Siz HTML yozmayapsiz, siz "Niqoblangan JavaScript obyektlarini" yozyapsiz! Shuning uchun JavaScript qoidalari bu yerda "podsho" hisoblanadi.

- Voqealarni ushlash (Event listeners) ham camelCase da: \`onclick\` emas \`onClick\`, \`onchange\` emas \`onChange\`, \`tabindex\` emas \`tabIndex\`.

### 4. JavaScript ni HTML ichiga olib kirish uchun jingalak qavslar \`{}\` ishlatiladi
Agar siz JSX ichida biror JS o'zgaruvchisini ko'rsatmoqchi, funksiya ishlatmoqchi yoki hisob-kitob qilmoqchi bo'lsangiz, buni faqat jingalak qavslar \`{}\` ichida qilishingiz mumkin. Bu React ga "bu yerda JavaScript kodini hisobla" degan belgidir.

---

## ✅ Do's and Don'ts (Yaxshi va Yomon amaliyotlar)

Quyida keng tarqalgan xatolar va ularning to'g'ri yechimlari bilan tanishamiz.

### 1-qoida: Ota-ona elementi

🔴 **YOMON (Don't):** Xatolik yuz beradi, chunki ikkita h1 va p teglari yonma-yon turibdi, ularni o'rab turuvchi qop yo'q.
\`\`\`jsx
// XATO! - Bu yerda ikkita alohida element (h1 va p) qaytarilmoqda, ammo ularni o'rab turuvchi umumiy ota-ona elementi yo'q.
function UserProfile() {
  return (
    <h1>Farhod</h1>
    <p>React Dasturchi</p>
  );
}
\`\`\`

🟢 **YAXSHI (Do):** Ularni \`<div>\` yoki React Fragment (\`<> ... </>\`) ichiga oling. Fragment ortiqcha HTML tugun (node) yaratmaydi, kodni toza saqlaydi.
\`\`\`jsx
// TO'G'RI! - Fragment (<></>) yordamida ikkala element bitta umumiy "qop" ga solindi. Bu HTML'da ortiqcha teg (masalan div) yaratmaydi.
function UserProfile() {
  return (
    <>
      <h1>Farhod</h1>
      <p>React Dasturchi</p>
    </>
  );
}
\`\`\`

### 2-qoida: Teglarni yopish

🔴 **YOMON (Don't):** Input va br teglari yopilmagan.
\`\`\`jsx
// XATO! - input va br teglari yopilmagan. JSX'da har qanday teg (hatto HTML'da yopilishi shart bo'lmaganlari ham) yopilishi shart.
function Form() {
  return (
    <form>
      Ism: <input type="text">
      <br>
      <button>Yuborish</button>
    </form>
  );
}
\`\`\`

🟢 **YAXSHI (Do):** Oxiriga \`/\` qo'yib yopish shart.
\`\`\`jsx
// TO'G'RI! - input va br teglari oxiriga slash (/) qo'yish orqali to'g'ri yopilgan.
function Form() {
  return (
    <form>
      Ism: <input type="text" />
      <br />
      <button>Yuborish</button>
    </form>
  );
}
\`\`\`

### 3-qoida: camelCase va CSS klasslar

🔴 **YOMON (Don't):** \`class\`, \`onclick\` kabi HTML xususiyatlari ishlatilmoqda. Inline stil (style) oddiy matn kabi yozilgan.
\`\`\`jsx
// XATO! - 'class' atributi ishlatilgan, hodisalar (onclick) kichik harflarda va inline uslublar matn ko'rinishida berilgan.
function Button() {
  return (
    <button class="btn-primary" onclick={submitData} style="color: white; background-color: blue;">
      Tasdiqlash
    </button>
  );
}
\`\`\`

🟢 **YAXSHI (Do):** \`className\`, \`onClick\` ishlatilmoqda. \`style\` esa ikkita jingalak qavs \`{{}}\` ichida JS obyekti sifatida berilmoqda (birinchi qavs JSX qoidasi, ikkinchisi obyekt ekanligini bildiradi). Xususiyatlar camelCase qilingan (background-color emas backgroundColor).
\`\`\`jsx
// TO'G'RI! - 'className' ishlatilgan, hodisa 'onClick' (camelCase) qilib yozilgan, inline style esa JS obyekti sifatida uzatilgan.
function Button() {
  return (
    <button 
      className="btn-primary" 
      onClick={submitData} 
      style={{ color: 'white', backgroundColor: 'blue' }}
    >
      Tasdiqlash
    </button>
  );
}
\`\`\`

### 4-qoida: JavaScript ifodalari (Expressions) vs Qoidalar (Statements)

JSX ichidagi \`{}\` ga siz faqat natija qaytaradigan "ifoda" (expression) larni yozishingiz mumkin (masalan: \`2 + 2\`, \`user.name\`, \`array.map()\`, uchlik (ternary) operator \`isTrue ? 'Ha' : 'Yoq'\`). 
Siz \`if\`, \`for\`, \`while\` kabi "qoidalar" (statements) ni to'g'ridan-to'g'ri JSX ichida ishlata olmaysiz.

🔴 **YOMON (Don't):** JSX ichida \`if\` yozish mumkin emas.
\`\`\`jsx
// XATO! - JSX'ning {} qavslari ichida 'if' kabi to'g'ridan-to'g'ri JS qoidalarini (statements) ishlatib bo'lmaydi.
function Greeting({ isLogin }) {
  // 'isLogin' - bu tashqaridan (ota komponentdan) keluvchi prop bo'lib, foydalanuvchining tizimga kirgan yoki kirmaganini bildiradi.
  return (
    <div>
      { 
        if (isLogin) { 
          return <h1>Xush kelibsiz!</h1> 
        } else {
          return <h1>Iltimos, kiring.</h1>
        }
      }
    </div>
  );
}
\`\`\`

🟢 **YAXSHI (Do):** Buning o'rniga uchlik operator (ternary) yoki mantiqiy \`&&\` dan foydalaning, yoki \`if\` mantiqini asil \`return\` dan oldin tepada yozing.
\`\`\`jsx
// 1-usul: Uchlik (Ternary) operator
function Greeting({ isLogin }) {
  // 'isLogin' qiymatiga qarab, mos h1 tegi qaytariladi (ifoda / expression)
  return (
    <div>
      {isLogin ? <h1>Xush kelibsiz!</h1> : <h1>Iltimos, kiring.</h1>}
    </div>
  );
}

// 2-usul: Mantiqni JSX dan tashqarida tayyorlash
function Greeting2({ isLogin }) {
  // O'zgaruvchi e'lon qilamiz, unda interfeys qismini saqlaymiz
  let message;
  
  // Shart tekshiriladi, bu yerda oddiy if ishlatish mumkin, chunki bu joy JSX'dan tashqarida
  if (isLogin) {
    message = <h1>Xush kelibsiz!</h1>;
  } else {
    message = <h1>Iltimos, kiring.</h1>;
  }

  // Yakuniy o'zgaruvchini JSX ichida render qilamiz
  return (
    <div>
      {message}
    </div>
  );
}
\`\`\`

---

## 🎯 Xulosa
JSX - bu React ning eng go'zal xususiyatlaridan biri. U sizga mantiq va vizual ko'rinishni bitta qulay va tushunarli formatda birlashtirish imkonini beradi. Boshida qat'iy qoidalar biroz noqulay tuyulishi mumkin, lekin vaqt o'tishi bilan siz bu qoidalar qanchalik ko'p xatolarning oldini olishini tushunib yetasiz.

**Asosiy qoidalar eslatmasi:**
1. Hamma narsani bitta teg (yoki fragment \`<></>\`) ichiga o'rang.
2. Barcha teglarni oxirigacha yoping (\`<img />\`).
3. Atributlarni \`camelCase\` formatida yozing (\`className\`, \`onClick\`).
4. JavaScript ishlatish uchun \`{}\` dan foydalaning.

Navbatdagi qadamlarda bu kodlarni turli fayllarga bo'lishni, komponentlar yaratish va ular orasida ma'lumot almashish (Props) tushunchalarini ko'rib chiqamiz!

`,
  code: `import React from "react";

export default function App() {
  // 1. JavaScript o'zgaruvchilari - bu ma'lumotlar JSX ichida namoyish etiladi
  const name = "Sardor"; // Matn turidagi o'zgaruvchi
  const age = 22; // Raqam turidagi o'zgaruvchi
  const isStudent = true; // Mantiqiy (boolean) turdagi o'zgaruvchi
  
  // Massiv - ro'yxat ko'rinishida chiqarish uchun
  const skills = ["JavaScript", "React", "Node.js"];

  // return qismi - brauzerda nima ko'rinishini belgilaydi
  return (
    // Qoida 1: Faqat bitta ota div (yoki Fragment) bo'lishi shart
    // className - bu CSS klasini ulash uchun (class o'rniga), style esa obyekt ko'rinishida berilgan
    <div className="container" style={{ padding: 20, fontFamily: 'sans-serif' }}>
      
      {/* Qoida 3: JSX ichida JS ishlatish uchun { } qavslar */}
      {/* name va age o'zgaruvchilarini to'g'ridan-to'g'ri ekranga chiqaramiz */}
      <h1 style={{ color: '#2c3e50' }}>Foydalanuvchi: {name}</h1>
      <p>Yoshi: {age} da</p>
      
      {/* Shartli render (Ternary operator) - agar isStudent true bo'lsa birinchi qiymat, false bo'lsa ikkinchisi olinadi */}
      <div style={{ padding: 10, background: isStudent ? '#d4edda' : '#f8d7da', borderRadius: 5 }}>
        Status: {isStudent ? "Talaba 🎓" : "Xodim 💼"}
      </div>

      <h3 style={{ marginTop: 20 }}>Texnologiyalar:</h3>
      
      {/* Massivni ro'yxat qilib chiqarish (map funksiyasi yordamida har bir element uchun <li> yasaladi) */}
      <ul>
        {skills.map((skill, index) => (
          // Har doim yagona key (kalit) berishni unutmang, bu React'ga elementlarni farqlashga yordam beradi
          <li key={index} style={{ marginBottom: 5 }}>
            {skill}
          </li>
        ))}
      </ul>

      {/* Logical AND && - agar massivda elementlar bo'lsa (length > 0), unda o'ng tomondagi <p> ekranga chiqadi */}
      {skills.length > 0 && (
        <p style={{ color: 'gray', fontSize: 12 }}>Jami {skills.length} ta texnologiya biladi.</p>
      )}

    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Fragment bilan o'rash",
      instruction: "Quyidagi kodda ikkita ketma-ket `<h1>` va `<p>` teglar qaytarilmoqda, ammo React faqat bitta ota (root) teg kutadi. Ortiqcha div yozmaslik uchun ularni Fragment (`<></>`) ichiga oling.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <h1>Salom, React!</h1>\n    <p>JSX da bir nechta element qaytarish mumkin emas.</p>\n  );\n}",
      hint: "Elementlarni `<></>` va `</>` arasiiga oling.",
      test: "if (code.includes('<>') && code.includes('</>')) { return null; } return 'Elementlarni Fragment (<></>) bilan o\\'rashingiz kerak!';"
    },
    {
      id: 2,
      title: "O'zgaruvchini render qilish",
      instruction: "Kodda `meva` nomli o'zgaruvchi bor. Uni `h1` tegi ichiga JSX jingalak qavslari yordamida joylashtiring.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const meva = 'Olma';\n\n  return (\n    <div>\n      <h1>Mening sevimli mevam: </h1>\n    </div>\n  );\n}",
      hint: "O'zgaruvchini `{meva}` ko'rinishida yozing.",
      test: "if (code.includes('{meva}')) { return null; } return 'O\\'zgaruvchini ko\\'rsatish uchun jingalak qavslardan foydalaning!';"
    },
    {
      id: 3,
      title: "Matematik amalni bajarish",
      instruction: "JSX ichida hisoblash ham mumkin. Jingalak qavslar ichida a va b o'zgaruvchilar yig'indisini chiqaring.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const a = 5;\n  const b = 10;\n\n  return (\n    <div>\n      <p>Natija: </p>\n    </div>\n  );\n}",
      hint: "{a + b} ni yozishingiz kerak.",
      test: "if (code.includes('{a + b}') || code.includes('{a+b}')) { return null; } return 'Jingalak qavs ichida {a + b} amalni bajaring!';"
    },
    {
      id: 4,
      title: "className dan foydalanish",
      instruction: "Quyidagi div elementiga `box` klassini qo'shing. E'tibor bering, JSX da oddiy HTML dan farqli ravishda boshqa atribut nomi ishlatiladi.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>Men qutiman</div>\n  );\n}",
      hint: "HTML dagi `class` JSX da `className` deb yoziladi.",
      test: "if (code.includes('className=\"box\"') || code.includes(\"className='box'\")) { return null; } return 'div tegi uchun className=\"box\" atributini qo\\'shing!';"
    },
    {
      id: 5,
      title: "Inline stil (Inline style)",
      instruction: "Tegga inline usulda stil bering. H1 matnining rangini `red` va shrift o'lchamini `24px` qiling. JSX da style obyekt kutishini unutmang.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <h1>Qizil matn</h1>\n  );\n}",
      hint: "<h1 style={{ color: 'red', fontSize: '24px' }}> yoki fontSize: 24",
      test: "const str = code.replace(/\\s/g, ''); if (str.includes('style={{color') && str.includes('fontSize:')) { return null; } return 'To\\'g\\'ri obyekt berishga e\\'tibor qarating, inline stil yozilishi xato';"
    },
    {
      id: 6,
      title: "Teglarni yopish (Self-closing tags)",
      instruction: "HTML da yopilmaydigan `<img src='...'>`, `<br>`, `<input>` kabi teglar JSX da albatta yopilishi shart. Quyidagi koddagi xatolikni tuzating.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h2>Rasm:</h2>\n      <img src=\"https://via.placeholder.com/150\">\n      <br>\n      <input type=\"text\">\n    </div>\n  );\n}",
      hint: "Teglarning oxiriga slash (/) qo'ying: `<img ... />`, `<br />`, `<input ... />`",
      test: "if (code.includes('/>') && code.match(/\\/>/g) && code.match(/\\/>/g).length >= 3) { return null; } return 'Barcha img, br, input teglar oxiriga / qoyib yoping!';"
    },
    {
      id: 7,
      title: "Ternary operator",
      instruction: "`isLogin` o'zgaruvchisiga qarab shartli matn chiqaring. Agar rost bo'lsa \"Tizimga kirdingiz\", yolg'on bo'lsa \"Iltimos, kiring\" matni chiqsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const isLogin = true;\n\n  return (\n    <div>\n      <p></p>\n    </div>\n  );\n}",
      hint: "{isLogin ? 'Tizimga kirdingiz' : 'Iltimos, kiring'} dan foydalaning.",
      test: "if (code.includes('isLogin ?') && code.includes(':')) { return null; } return 'Shartli render uchun ternary operatordan (shart ? A : B) foydalaning!';"
    },
    {
      id: 8,
      title: "Logical AND (&&)",
      instruction: "Agar `hasMessages` true bo'lsa, xabarlar borligini ko'rsatadigan `<p>Sizda xabarlar bor!</p>` tegi chiqsin, false bo'lsa, hech narsa chiqmasin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const hasMessages = true;\n\n  return (\n    <div>\n      <h1>Xabarlar qutisi</h1>\n      \n    </div>\n  );\n}",
      hint: "{hasMessages && <p>Sizda xabarlar bor!</p>} yozish kerak.",
      test: "if (code.includes('hasMessages &&') && code.includes('Sizda xabarlar bor!')) { return null; } return '&& orqali shartli tegingizni yozing!';"
    },
    {
      id: 9,
      title: "Array bilan map ishlashi",
      instruction: "`ismlar` massividan foydalanib, har bir ismni `<li>` ichida chiqaring. `map` dan foydalaning.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const ismlar = ['Ali', 'Vali', 'Gani'];\n\n  return (\n    <ul>\n      \n    </ul>\n  );\n}",
      hint: "ismlar.map((ism, index) => <li key={index}>{ism}</li>) dan foydalaning.",
      test: "if (code.includes('ismlar.map') && code.includes('key={') && code.includes('<li>')) { return null; } return 'map() funksiyasi orqali massiv elementlarini chiqarib, <li> teglari uchun key atributini bering!';"
    },
    {
      id: 10,
      title: "Obyektlar bilan map ishlashi",
      instruction: "Quyidagi obyektlar massividagi foydalanuvchilar ismini ko'rsating.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const users = [\n    { id: 1, name: 'Aziz' },\n    { id: 2, name: 'Sardor' }\n  ];\n\n  return (\n    <div>\n      {/* Shu yerda map ishlating */}\n    </div>\n  );\n}",
      hint: "users.map(user => <p key={user.id}>{user.name}</p>)",
      test: "if (code.includes('users.map') && code.includes('user.name') && code.includes('key=')) { return null; } return 'users.map() ni ishlatib user.name ni chiqaring va key={user.id} kabi unique kalit bering!';"
    }
  ],
  quizzes: [
    {
      question: "JSX so'zining kengaytmasi nima?",
      options: [
        "JavaScript Extension",
        "JavaScript XML",
        "Java Standard XML",
        "JSON Syntax XML"
      ],
      correctAnswer: 1,
      explanation: "JSX — JavaScript XML ning qisqartmasi bo'lib, React da HTML va JS ni bitta faylda yozish imkonini beruvchi sintaksisdir."
    },
    {
      question: "JSX kodini brauzer to'g'ridan-to'g'ri o'qiy oladimi?",
      options: [
        "Ha, JSX bu oddiy HTML ning yangi versiyasi hisoblanadi",
        "Yo'q, brauzer faqat JS ni tushunadi. JSX avval Babel kabi vositalar orqali JS ga o'girilishi shart",
        "Ha, lekin faqat Google Chrome da o'qiy oladi",
        "Yo'q, u maxsus serverda ishlashi kerak"
      ],
      correctAnswer: 1,
      explanation: "Brauzer JSX (<div/>) ni o'qisa darhol SyntaxError beradi. Babel JSX ni React.createElement() kabi tushunarli JS ko'rinishiga o'girib beradi."
    },
    {
      question: "Nima uchun JSX da CSS class yozish uchun 'class' o'rniga 'className' ishlatiladi?",
      options: [
        "className chiroyliroq ko'ringani uchun",
        "class HTML da ishlamaydi",
        "'class' so'zi JavaScript da zaxiralangan so'z (Class komponentlar yoki OOP da ishlatiladi)",
        "React da class lardan voz kechilgan"
      ],
      correctAnswer: 2,
      explanation: "JSX aslida tag zamirida JavaScript bo'lganligi sababli, JS ning kalit so'zi bo'lgan 'class' ni atribut sifatida ishlatib bo'lmaydi. Shuning uchun DOM ning asl xossasi bo'lgan 'className' ishlatiladi."
    },
    {
      question: "JSX da barcha teglarni yopish shartmi?",
      options: [
        "Yo'q, <img> kabi HTML da yopilmaydigan teglar yopilmasa ham bo'ladi",
        "Ha, barcha teglar, jumladan <img> va <br> ham (<img />, <br />) kabi yopilishi shart",
        "Faqat block elementlari yopilishi shart",
        "React o'zi avtomatik yopib oladi"
      ],
      correctAnswer: 1,
      explanation: "JSX qat'iy XML qoidalariga asoslanadi, shuning uchun bitta ham ochiq teg qolishi mumkin emas, barchasi yopilishi qat'iyan talab qilinadi."
    },
    {
      question: "React komponenti qancha asosiy (root) element qaytarishi mumkin?",
      options: [
        "Istalgancha",
        "Bitta va faqat bitta (ichida boshqa teglar bo'lishi mumkin)",
        "Ikkita (biri ota, biri bola)",
        "Umuman teg qaytarishi shart emas"
      ],
      correctAnswer: 1,
      explanation: "Har bir React komponenti return qilganda faqatgina bitta eng asosiy ota (root) teg qaytarishi shart, barcha kod shu teg ichida joylashadi."
    },
    {
      question: "Ortiqcha HTML div larni yaratmasdan, faqat guruhlash uchun ishlatiladigan vosita nima?",
      options: [
        "React.Group",
        "<React.Fragment> yoki uning qisqa ko'rinishi <></>",
        "<hidden></hidden> tegi",
        "CSS dagi display: none"
      ],
      correctAnswer: 1,
      explanation: "DOM ni ortiqcha div lar bilan ifloslantirmaslik uchun React da Fragment ya'ni <></> ishlatiladi, u to'g'ridan-to'g'ri hech qanday tugun (node) hosil qilmaydi."
    },
    {
      question: "JSX ichida JS kodini (masalan, o'zgaruvchilarni) ishlatish uchun nima qilinadi?",
      options: [
        "O'zgaruvchini oddiy yozib ketaveramiz",
        "Qo'shtirnoq (\"\") ichida yozamiz",
        "Jingalak qavslar { } ichida yozamiz",
        "Maxsus $ belgisi bilan yozamiz"
      ],
      correctAnswer: 2,
      explanation: "JSX ning ichida istalgan JavaScript ifodasini (expression) bajarish uchun { } jingalak qavslardan foydalaniladi."
    },
    {
      question: "Shartga asoslanib ma'lumotni render qilishda (if/else o'rniga) qaysi usullar qo'llaniladi?",
      options: [
        "Faqat if else ni oddiy JSX teglari ichida",
        "Ternary operator (shart ? true : false) va mantiqiy AND (&&)",
        "switch/case lardan teglarning ustida foydalanib",
        "React maxsus <if></if> tegiga ega"
      ],
      correctAnswer: 1,
      explanation: "JSX ni ichida if/else blokini yozib bo'lmaydi, shuning uchun odatda xuddi shu ishni bajaradigan qisqaroq usullar - ternary operator va shart true bo'lsa && ishlatiladi."
    },
    {
      question: "Ro'yxatlarni (Arraylarni) qanday qilib ketma-ket teglarga aylantirib chiqaramiz?",
      options: [
        "for sikli orqali",
        "forEach metodi bilan",
        "map() metodi orqali massivdan yangi teglar massivini hosil qilib",
        "while sikli orqali"
      ],
      correctAnswer: 2,
      explanation: "React da asosan array.map() orqali ma'lumotlar ustidan yurilib, natija sifatida JSX teglar massivi qaytariladi, react buni avtomatik chizadi."
    },
    {
      question: "map() funksiyasini ishlatgan holda ro'yxat chiqarganda nima qilish majburiy?",
      options: [
        "id degan class berish",
        "Har bir eng ustki tegga unikal 'key' atributini berish",
        "Ma'lumotlarni saralash (sort)",
        "Hech qanday qo'shimcha ish talab qilinmaydi"
      ],
      correctAnswer: 1,
      explanation: "React elementlarning qaysi biri o'zgargani, qo'shilgani yoki o'chirilganini kuzatib borishi (Virtual DOM reconcilation) uchun, takrorlanayotgan har bir tegga unikal key prop si berilishi shart."
    },
    {
      question: "JSX dagi inline style larni yozish tartibi qanday bo'ladi?",
      options: [
        "style=\"color: red; font-size: 16px;\"",
        "style={color: 'red', font-size: '16px'}",
        "style={{ color: 'red', fontSize: '16px' }}",
        "style={'color: red', 'font-size: 16px'}"
      ],
      correctAnswer: 2,
      explanation: "Bitta qavs JS dagi yozuv degani, ikkinchisi esa obyekt boshlanishini bildiradi. CSS property lar camelCase shaklida yoziladi (fontSize)."
    },
    {
      question: "HTML label larida ishlatiladigan 'for' atributi JSX da nima deb yoziladi?",
      options: [
        "for",
        "htmlFor",
        "labelFor",
        "idFor"
      ],
      correctAnswer: 1,
      explanation: "JavaScript da 'for' sikl nomini bildiradi, shuning uchun chalkashlik bo'lmasligi uchun JSX da 'htmlFor' deb nomlangan."
    }
  ]
};

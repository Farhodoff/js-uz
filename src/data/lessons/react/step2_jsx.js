export const step2_jsx = {
  id: "step2_jsx",
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
- Voqealarni ushlash (Event listeners) ham camelCase da: \`onclick\` emas \`onClick\`, \`onchange\` emas \`onChange\`, \`tabindex\` emas \`tabIndex\`.

### 4. JavaScript ni HTML ichiga olib kirish uchun jingalak qavslar \`{}\` ishlatiladi
Agar siz JSX ichida biror JS o'zgaruvchisini ko'rsatmoqchi, funksiya ishlatmoqchi yoki hisob-kitob qilmoqchi bo'lsangiz, buni faqat jingalak qavslar \`{}\` ichida qilishingiz mumkin. Bu React ga "bu yerda JavaScript kodini hisobla" degan belgidir.

---

## ✅ Do's and Don'ts (Yaxshi va Yomon amaliyotlar)

Quyida keng tarqalgan xatolar va ularning to'g'ri yechimlari bilan tanishamiz.

### 1-qoida: Ota-ona elementi

🔴 **YOMON (Don't):** Xatolik yuz beradi, chunki ikkita h1 va p teglari yonma-yon turibdi, ularni o'rab turuvchi qop yo'q.
\`\`\`jsx
// XATO! 
function UserProfile() {
  return (
    <h1>Farhod</h1>
    <p>React Dasturchi</p>
  );
}
\`\`\`

🟢 **YAXSHI (Do):** Ularni \`<div>\` yoki React Fragment (\`<> ... </>\`) ichiga oling. Fragment ortiqcha HTML tugun (node) yaratmaydi, kodni toza saqlaydi.
\`\`\`jsx
// TO'G'RI!
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
function Greeting({ isLogin }) {
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
  return (
    <div>
      {isLogin ? <h1>Xush kelibsiz!</h1> : <h1>Iltimos, kiring.</h1>}
    </div>
  );
}

// 2-usul: Mantiqni JSX dan tashqarida tayyorlash
function Greeting2({ isLogin }) {
  let message;
  
  if (isLogin) {
    message = <h1>Xush kelibsiz!</h1>;
  } else {
    message = <h1>Iltimos, kiring.</h1>;
  }

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
  code: `// JSX Sintaksisining asosiy misollari
import React from 'react'

// O'zgaruvchilar
const ism = "Abdulloh"
const yosh = 25
const isKatta = yosh >= 18

// Inline stil obyekti
const sarlavhaStili = {
  color: '#2c3e50',
  fontSize: '24px',
  fontWeight: 'bold'
}

function App() {
  return (
    // Fragment — qo'shimcha div qo'shmasdan ildiz element
    <>
      {/* Sarlavha — stillantirilgan */}
      <h1 style={sarlavhaStili}>JSX Misollari</h1>

      {/* O'zgaruvchi ko'rsatish */}
      <p>Ism: {ism}</p>
      <p>Yosh: {yosh}</p>

      {/* Ternary operator */}
      <p>{isKatta ? "Voyaga yetgan ✅" : "Voyaga yetmagan ❌"}</p>

      {/* && operatori */}
      {isKatta && <p>Ovoz berish huquqi bor!</p>}

      {/* className ishlatish */}
      <div className="card">
        <p>Bu div ga className='card' berilgan</p>
      </div>
    </>
  )
}

export default App`,
  exercises: [
    {
      id: 1,
      title: "className bilan div yaratish",
      instruction: "className='container' li div yarating. Ichida className='title' li h1 va className='text' li p bo'lsin.",
      startingCode: "function App() {\n  return (\n    <div>\n      <h1>Sarlavha</h1>\n      <p>Paragraf</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "div ga className='container', h1 ga className='title', p ga className='text' bering.",
      solution: "function App() {\n  return (\n    <div className='container'>\n      <h1 className='title'>Sarlavha</h1>\n      <p className='text'>Paragraf</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('className')) return 'className ishlatishni unutmang!'; return null;"
    },
    {
      id: 2,
      title: "Self-closing teglar",
      instruction: "img (src va alt bilan) va input (type='email') teglarini self-closing formatda yozing.",
      startingCode: "function App() {\n  return (\n    <div>\n      {/* img va input bu yerga */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "<img src='...' alt='...' /> va <input type='email' />",
      solution: "function App() {\n  return (\n    <div>\n      <img src='https://via.placeholder.com/100' alt='Test rasm' />\n      <input type='email' placeholder='Email kiriting' />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('/>')) return 'Self-closing formatda yozing: <img /> <input />'; return null;"
    },
    {
      id: 3,
      title: "Fragment ishlatish",
      instruction: "Qo'shimcha div qo'shmasdan Fragment (<>) ishlatib, h2 va ul ni qaytaring.",
      startingCode: "function App() {\n  return (\n    <div>\n      <h2>Ro'yxat</h2>\n      <ul><li>Birinchi</li></ul>\n    </div>\n  )\n}\n\nexport default App",
      hint: "<div> ni <> va </> bilan almashtiring.",
      solution: "function App() {\n  return (\n    <>\n      <h2>Ro'yxat</h2>\n      <ul><li>Birinchi</li></ul>\n    </>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<>')) return 'Fragment <> ishlatishni unutmang!'; return null;"
    },
    {
      id: 4,
      title: "O'zgaruvchi va ifodalar",
      instruction: "const narx = 150000 va const mahsulot = 'Kitob' yarating. JSX da {mahsulot}: {narx} so'm ko'rsating.",
      startingCode: "function App() {\n  // O'zgaruvchilarni bu yerda yarating\n  \n  return (\n    <div>\n      {/* O'zgaruvchilarni ko'rsating */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "return dan oldin const narx = 150000 va const mahsulot = 'Kitob'. JSX da: {mahsulot}: {narx} so'm",
      solution: "function App() {\n  const narx = 150000\n  const mahsulot = 'Kitob'\n  \n  return (\n    <div>\n      <p>{mahsulot}: {narx} so'm</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('{narx}') && !code.includes('{ narx }')) return 'narx o\'zgaruvchisini {} ichida ko\'rsating'; return null;"
    },
    {
      id: 5,
      title: "Ternary operator",
      instruction: "const ombordami = false yarating. JSX da ternary bilan: ombordami = true bo'lsa 'Mavjud ✅', false bo'lsa 'Tugagan ❌' ko'rsating.",
      startingCode: "function App() {\n  const ombordami = false\n  \n  return (\n    <div>\n      {/* Ternary bu yerda */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "{ ombordami ? <p>Mavjud ✅</p> : <p>Tugagan ❌</p> }",
      solution: "function App() {\n  const ombordami = false\n  \n  return (\n    <div>\n      {ombordami ? <p>Mavjud ✅</p> : <p>Tugagan ❌</p>}\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('?') || !code.includes(':')) return 'Ternary operator ? : ishlatishni unutmang'; return null;"
    },
    {
      id: 6,
      title: "&& operatori",
      instruction: "const xabarBor = true yarating. JSX da && bilan: xabarBor true bo'lsagina <p>Sizda yangi xabar bor!</p> ko'rsating.",
      startingCode: "function App() {\n  const xabarBor = true\n  \n  return (\n    <div>\n      <h2>Panel</h2>\n      {/* && bu yerda */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "{ xabarBor && <p>Sizda yangi xabar bor!</p> }",
      solution: "function App() {\n  const xabarBor = true\n  \n  return (\n    <div>\n      <h2>Panel</h2>\n      {xabarBor && <p>Sizda yangi xabar bor!</p>}\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('&&')) return '&& operatorini ishlatishni unutmang'; return null;"
    },
    {
      id: 7,
      title: "Inline stil",
      instruction: "h1 ga inline stil bering: color='#e74c3c', fontSize='28px', textAlign='center'. style={{...}} formatida.",
      startingCode: "function App() {\n  return (\n    <div>\n      <h1>Sarlavha</h1>\n    </div>\n  )\n}\n\nexport default App",
      hint: "<h1 style={{color: '#e74c3c', fontSize: '28px', textAlign: 'center'}}>",
      solution: "function App() {\n  return (\n    <div>\n      <h1 style={{color: '#e74c3c', fontSize: '28px', textAlign: 'center'}}>Sarlavha</h1>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('style={{')) return 'style={{...}} formatida yozing (ikki qavsga e\'tibor bering)'; return null;"
    },
    {
      id: 8,
      title: "Stil obyektida saqlash",
      instruction: "const kartaStili = { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' } yarating va div ga style={kartaStili} orqali qo'llang.",
      startingCode: "function App() {\n  // Stil obyektini bu yerda yarating\n  \n  return (\n    <div>\n      <p>Bu karta</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "const kartaStili = {...} yarating va <div style={kartaStili}> deng.",
      solution: "function App() {\n  const kartaStili = {\n    backgroundColor: '#f8f9fa',\n    padding: '20px',\n    borderRadius: '8px'\n  }\n  \n  return (\n    <div style={kartaStili}>\n      <p>Bu karta</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('kartaStili') || !code.includes('style={kartaStili}')) return 'Stil obyektini yarating va style={kartaStili} orqali qo\'llang'; return null;"
    },
    {
      id: 9,
      title: "JSX kommentari",
      instruction: "JSX da kommentarni qanday yozish kerakligini ko'rsating: {/* ... */} formatida. Bir matn kommentini va bir element kommentini yozing.",
      startingCode: "function App() {\n  return (\n    <div>\n      Bu yerda komment bo'lsin\n      <p>Ko'rinadigan matn</p>\n      Bu ham komment bo'lsin\n    </div>\n  )\n}\n\nexport default App",
      hint: "JSX kommentari: {/* komment matni */}",
      solution: "function App() {\n  return (\n    <div>\n      {/* Bu birinchi komment */}\n      <p>Ko'rinadigan matn</p>\n      {/* Bu ikkinchi komment */}\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('{/*') || !code.includes('*/}')) return 'JSX kommentari {/* ... */} formatida yozing'; return null;"
    },
    {
      id: 10,
      title: "JSX ifoda qiymatlari",
      instruction: "const raqamlar = [10, 20, 30] yarating. JSX da bu massivning uzunligini ({raqamlar.length}) va birinchi elementini ({raqamlar[0]}) ko'rsating.",
      startingCode: "function App() {\n  const raqamlar = [10, 20, 30]\n  \n  return (\n    <div>\n      {/* Massiv uzunligi va birinchi element */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "{raqamlar.length} va {raqamlar[0]}",
      solution: "function App() {\n  const raqamlar = [10, 20, 30]\n  \n  return (\n    <div>\n      <p>Elementlar soni: {raqamlar.length}</p>\n      <p>Birinchi element: {raqamlar[0]}</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('raqamlar.length') && !code.includes('raqamlar[0]')) return 'raqamlar.length va raqamlar[0] ni ko\'rsating'; return null;"
    }
  ],
  quizzes: [
    {
      question: "JSX nima?",
      options: [
        "Bu alohida dasturlash tili",
        "JavaScript kodi ichida HTML ga o'xshash sintaksis yozish imkonini beruvchi sintaktik qand",
        "Bu brauzerga to'g'ridan-to'g'ri yuboriladigan format",
        "Bu CSS yozish usuli"
      ],
      correctAnswer: 1,
      explanation: "JSX (JavaScript XML) — React da HTML ga o'xshash sintaksis yozish imkonini beruvchi sintaktik qand. U aslida React.createElement() chaqiruvlariga aylanadi."
    },
    {
      question: "JSX ni JavaScript ga qaysi vosita aylantiradi?",
      options: ["Node.js", "Webpack", "Babel", "ESLint"],
      correctAnswer: 2,
      explanation: "Babel — bu JavaScript kompilyatori bo'lib, JSX ni brauzer tushunadigan oddiy JavaScript (React.createElement() chaqiruvlari) ga aylantiradi."
    },
    {
      question: "JSX da HTML dagi class atributining muqobili qaysi?",
      options: ["cssClass", "classList", "className", "styleClass"],
      correctAnswer: 2,
      explanation: "JSX da class o'rniga className ishlatiladi, chunki class JavaScript da zahiralangan so'z (class deklaratsiyasi uchun)."
    },
    {
      question: "JSX da bir necha elementni bitta root element sifatida qaytarish uchun qaysi ishlatiladi?",
      options: ["<section>", "<main>", "<container>", "<> (Fragment)"],
      correctAnswer: 3,
      explanation: "Fragment (<>...</>) qo'shimcha DOM elementi qo'shmay, bir necha elementni guruhlash imkonini beradi. Bu ayniqsa table va flexbox tuzilmalarida muhim."
    },
    {
      question: "JSX da inline stil qanday yoziladi?",
      options: [
        'style="color: red"',
        'style={color: "red"}',
        'style={{color: "red"}}',
        'css={{color: "red"}}'
      ],
      correctAnswer: 2,
      explanation: "JSX da inline stil JavaScript obyekti sifatida beriladi: style={{}}. Tashqi {} JSX ifodasi, ichki {} JavaScript obyekti."
    },
    {
      question: "JSX da img tegini to'g'ri yozish usuli qaysi?",
      options: [
        '<img src="rasm.jpg" alt="rasm">',
        '<img src="rasm.jpg" alt="rasm"/>',
        '<img src="rasm.jpg" alt="rasm" />',
        "A va B ikkisi ham to'g'ri"
      ],
      correctAnswer: 2,
      explanation: "JSX da barcha teglar yopilishi kerak. img kabi HTML da yopilmaydigan tegler JSX da /> bilan yopiladi: <img src='...' alt='...' />"
    },
    {
      question: "JSX ichida JavaScript ifodasini ko'rsatish uchun qaysi sintaksis ishlatiladi?",
      options: ["[[ifoda]]", "((ifoda))", "{ifoda}", "(ifoda)"],
      correctAnswer: 2,
      explanation: "JSX da JavaScript ifodalarini {} (curly braces) ichida yoziladi. Masalan: {ism}, {1 + 2}, {shart ? 'Ha' : 'Yo\'q'}"
    },
    {
      question: "Quyidagi JSX da qaysi xato bor? <div class='card'><p>Salom</p></div>",
      options: [
        "p teg yopilmagan",
        "div yopilmagan",
        "class o'rniga className ishlatilishi kerak",
        "Xato yo'q"
      ],
      correctAnswer: 2,
      explanation: "JSX da class o'rniga className ishlatiladi. To'g'ri yozuv: <div className='card'>"
    },
    {
      question: "JSX da for atributining muqobili qaysi?",
      options: ["forId", "labelFor", "htmlFor", "inputFor"],
      correctAnswer: 2,
      explanation: "JSX da for o'rniga htmlFor ishlatiladi (label tegida), chunki for JavaScript da zahiralangan so'z (for sikli uchun)."
    },
    {
      question: "JSX da quyidagilardan qaysi biri ishlatib bo'lmaydi?",
      options: [
        "Ternary operator",
        "&& operatori",
        "if/else bloki to'g'ridan-to'g'ri",
        "Funksiya chaqiruvlari"
      ],
      correctAnswer: 2,
      explanation: "JSX {} ichida faqat ifodalar (expressions) qabul qilinadi. if/else bloki bu statement, shuning uchun to'g'ridan-to'g'ri ishlatib bo'lmaydi. Muqobil: ternary yoki && operatorlari."
    },
    {
      question: "CSS xususiyati font-size ni JSX inline stilida qanday yoziladi?",
      options: ["font-size", "'font-size'", "fontSize", "fontsize"],
      correctAnswer: 2,
      explanation: "JSX da CSS xususiyatlari camelCase da yoziladi: font-size → fontSize, background-color → backgroundColor, border-radius → borderRadius."
    },
    {
      question: "Quyidagi kodda qaysi muammo bor? {count && <p>Soni: {count}</p>}",
      options: [
        "count aniqlanmagan",
        "Agar count = 0 bo'lsa, ekranda '0' ko'rinadi (noto'g'ri yon ta'sir)",
        "p teg yopilmagan",
        "Xato yo'q"
      ],
      correctAnswer: 1,
      explanation: "Agar count = 0 bo'lsa, 0 && ... false sifatida baholanadi, lekin React 0 ni render qiladi! Ekranda '0' ko'rinadi. To'g'ri: {count > 0 && <p>...</p>} yoki {count ? <p>...</p> : null}"
    },
    {
      question: "JSX da komment qanday yoziladi?",
      options: [
        "// komment",
        "<!-- komment -->",
        "{/* komment */}",
        "/* komment */"
      ],
      correctAnswer: 2,
      explanation: "JSX da kommentlar {/* ... */} formatida yoziladi. Bu JavaScript blok kommentining JSX ga moslashtirilgan versiyasi."
    }
  ]
};

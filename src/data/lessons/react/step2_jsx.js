export const step2_jsx = {
  id: "step2_jsx",
  title: "2-DARS: JSX Sintaksisi",
  content: `
# 2-DARS: JSX Sintaksisi (JavaScript XML)

## 1. JSX Nima?

JSX (JavaScript XML) — bu JavaScript kodi ichida HTML ga o'xshash sintaksisni yozish imkonini beruvchi **sintaktik qand** (syntactic sugar). U aslida JavaScript dir, lekin HTML kabi ko'rinadi.

**Hayotiy o'xshatish:** JSX — bu xuddi o'zbek tilida "Salom!" deyish o'rniga, rasmiy "Assalomu alaykum!" deyish kabi. Ikkalasi ham bir narsani anglatadi, lekin biri o'qish uchun qulayroq.

\`\`\`jsx
// JSX yozish usuli (qulayroq)
const element = <h1>Salom, Dunyo!</h1>;

// JSX aslida quyidagiga aylanadi (Babel tomonidan):
const element = React.createElement('h1', null, 'Salom, Dunyo!');
\`\`\`

### Nima uchun JSX kerak?

- **O'qish oson:** HTML va JS ni birgalikda ko'rish mantiqni tushunishni osonlashtiradi
- **Xatolarni aniqlash:** Sintaksis xatolari build paytida ko'rinadi
- **Kuchli:** JavaScript ning to'liq quvvatidan foydalanish mumkin

---

## 2. Babel: JSX dan JS ga

Brauzerlar JSX ni tushunmaydi. **Babel** degan vosita JSX ni oddiy JavaScript ga aylantiradi.

\`\`\`mermaid
graph LR
    A["JSX kodi\n(<h1>Salom</h1>)"] --> B["Babel Compiler"]
    B --> C["React.createElement()\nchaqiruvlari"]
    C --> D["Virtual DOM\nobyekti"]
    D --> E["Real DOM"]

    style A fill:#f39c12,color:#fff
    style B fill:#8e44ad,color:#fff
    style C fill:#3498db,color:#fff
    style D fill:#2ecc71,color:#fff
    style E fill:#e74c3c,color:#fff
\`\`\`

**Babel qanday ishlaydi:**

\`\`\`jsx
// Biz yozgan JSX
function Salom() {
  return (
    <div className="card">
      <h1>Salom!</h1>
      <p>Bu paragraf</p>
    </div>
  );
}

// Babel ga'ylantirgandan keyin:
function Salom() {
  return React.createElement(
    'div',
    { className: 'card' },
    React.createElement('h1', null, 'Salom!'),
    React.createElement('p', null, 'Bu paragraf')
  );
}
\`\`\`

---

## 3. JSX ning Asosiy Qoidalari

### Qoida 1: Bitta Ildiz Element (Root Element)

JSX doimo bitta ildiz elementga ega bo'lishi kerak.

\`\`\`jsx
// ❌ YOMON — ikkita alohida element
function App() {
  return (
    <h1>Sarlavha</h1>
    <p>Paragraf</p>   // Xato! Ikkita ildiz element!
  );
}

// ✅ YAXSHI — bitta div ichida
function App() {
  return (
    <div>
      <h1>Sarlavha</h1>
      <p>Paragraf</p>
    </div>
  );
}

// ✅ YAXSHI — Fragment ishlatish (qo'shimcha div qo'shmaslik)
function App() {
  return (
    <>
      <h1>Sarlavha</h1>
      <p>Paragraf</p>
    </>
  );
}
\`\`\`

### Qoida 2: Self-closing Tegler

HTML da ba'zi tegler yopilmasdan ishlatiladi (\`<br>\`, \`<img>\`, \`<input>\`). JSX da ular self-closing formatda yopilishi SHART.

\`\`\`jsx
// ❌ YOMON — yopilmagan tegler
<img src="rasm.jpg">
<input type="text">
<br>

// ✅ YAXSHI — / bilan yopilgan
<img src="rasm.jpg" />
<input type="text" />
<br />
\`\`\`

### Qoida 3: className va htmlFor

JavaScript da \`class\` va \`for\` — reserved keywords (zahiralangan so'zlar). Shuning uchun JSX da ular boshqacha nomlanadi.

\`\`\`jsx
// ❌ YOMON — HTML atributlari
<div class="card">
<label for="email">Email:</label>

// ✅ YAXSHI — JSX atributlari
<div className="card">
<label htmlFor="email">Email:</label>
\`\`\`

### Qoida 4: camelCase Atributlar

JSX da HTML atributlari camelCase formatida yoziladi.

\`\`\`jsx
// ❌ YOMON — HTML uslubida
<button onclick="handler()" tabindex="1">

// ✅ YAXSHI — JSX da camelCase
<button onClick={handler} tabIndex={1}>
\`\`\`

| HTML Atribut | JSX Atribut |
|-------------|-------------|
| \`class\` | \`className\` |
| \`for\` | \`htmlFor\` |
| \`onclick\` | \`onClick\` |
| \`onchange\` | \`onChange\` |
| \`tabindex\` | \`tabIndex\` |
| \`readonly\` | \`readOnly\` |

---

## 4. JSX ichida JavaScript Ifodalar

JSX ichida har qanday JavaScript ifodani \`{}\` ichida yozish mumkin.

\`\`\`jsx
const ism = "Abdulloh";
const yosh = 25;
const isKatta = yosh >= 18;

function App() {
  return (
    <div>
      {/* O'zgaruvchi ko'rsatish */}
      <p>Ism: {ism}</p>

      {/* Hisob-kitob */}
      <p>Ikki yil keyin: {yosh + 2}</p>

      {/* Uchlik operator (Ternary) */}
      <p>{isKatta ? "Voyaga yetgan" : "Voyaga yetmagan"}</p>

      {/* && operatori — shartli ko'rsatish */}
      {isKatta && <p>Huquqlaringiz bor!</p>}

      {/* Funksiya chaqirish */}
      <p>{ism.toUpperCase()}</p>
    </div>
  );
}
\`\`\`

### JSX ichida NIMALAR ishlatish MUMKIN EMAS:

\`\`\`jsx
// ❌ if/else to'g'ridan-to'g'ri JSX ichida ishlatib bo'lmaydi
function App() {
  return (
    <div>
      {if (true) { return <p>Ha</p> }}  // XATO!
    </div>
  );
}

// ✅ Ternary ishlatish
function App() {
  return (
    <div>
      {true ? <p>Ha</p> : <p>Yo'q</p>}
    </div>
  );
}

// ✅ Yoki funksiya ichida if/else
function App() {
  const renderContent = () => {
    if (true) return <p>Ha</p>;
    return <p>Yo'q</p>;
  };

  return <div>{renderContent()}</div>;
}
\`\`\`

---

## 5. Inline Stil

\`\`\`jsx
// ❌ YOMON — string sifatida
<p style="color: red; font-size: 16px;">

// ✅ YAXSHI — JavaScript obyekti sifatida
<p style={{ color: 'red', fontSize: '16px' }}>

// ✅ O'zgaruvchida saqlash
const stillar = {
  color: 'blue',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#f0f0f0'
};

<p style={stillar}>Stillantirilgan matn</p>
\`\`\`

**E'tibor bering:** CSS xususiyatlari camelCase da yoziladi: \`font-size\` → \`fontSize\`, \`background-color\` → \`backgroundColor\`.

---

## 6. JSX Kommentarlar

\`\`\`jsx
function App() {
  // Bu JavaScript kommentari — render bo'lmaydi
  return (
    <div>
      {/* Bu JSX kommentari — render bo'lmaydi */}
      <p>Ko'rinadigan matn</p>
    </div>
  );
}
\`\`\`

---

## 7. Fragment

Fragment — bu qo'shimcha DOM elementi qo'shmay, bir necha elementni guruhlash imkonini beradi.

\`\`\`jsx
// ❌ Keraksiz div qo'shish
function Jadval() {
  return (
    <div>           {/* Bu div table strukturasini buzadi! */}
      <td>1</td>
      <td>2</td>
    </div>
  );
}

// ✅ Fragment ishlatish
function Jadval() {
  return (
    <>
      <td>1</td>
      <td>2</td>
    </>
  );
}

// ✅ Uzun yozuv — key atribut bilan ishlatiladigan holat
import { Fragment } from 'react';

function Jadval() {
  return (
    <Fragment>
      <td>1</td>
      <td>2</td>
    </Fragment>
  );
}
\`\`\`

---

## 8. ❌ YOMON va ✅ YAXSHI — Keng ko'rsatmalar

\`\`\`jsx
// ❌ YOMON — string yoki number ni to'g'ridan-to'g'ri render qilish mumkin
// lekin false, null, undefined ni renderlash bo'sh chiqadi (yaxshi)
// LEKIN 0 renderlansa, u ekranda "0" deb ko'rinadi!
{count && <p>Elementlar: {count}</p>}
// Agar count = 0 bo'lsa, ekranda "0" ko'rinadi (bug!)

// ✅ YAXSHI — aniq solishtirish
{count > 0 && <p>Elementlar: {count}</p>}
// Yoki ternary
{count ? <p>Elementlar: {count}</p> : null}
\`\`\`

\`\`\`jsx
// ❌ YOMON — JSX da quotes bilan atribut va expression
<Component value="{someVariable}" />  // String sifatida o'tadi, expression emas!

// ✅ YAXSHI — curly braces bilan
<Component value={someVariable} />
\`\`\`

---

## 9. Intervyu Savollari

**1. JSX nima va u nima uchun kerak?**
*Javob:* JSX (JavaScript XML) — React da HTML ga o'xshash sintaksis yozish imkonini beruvchi sintaktik qand. U aslida \`React.createElement()\` chaqiruvlariga aylanadi (Babel orqali). JSX kodni o'qishni osonlashtiradi, UI strukturasini mantiqqa yaqin yozish imkonini beradi va sintaksis xatolarini build paytida aniqlaydi.

**2. JSX da \`className\` va \`htmlFor\` nima uchun ishlatiladi?**
*Javob:* JavaScript da \`class\` va \`for\` — reserved keywords (zahiralangan so'zlar), ular boshqa maqsadlarda ishlatiladi (class deklaratsiyasi, for sikli). Shuning uchun JSX da HTML \`class\` atributi \`className\` ga, \`for\` esa \`htmlFor\` ga o'zgartirilgan.

**3. JSX ichida \`if/else\` ni qanday ishlatish mumkin?**
*Javob:* JSX ichida to'g'ridan-to'g'ri \`if/else\` blokini ishlatib bo'lmaydi, chunki \`{}\` faqat ifodalarni (expressions) qabul qiladi. Muqobil usullar: (1) Ternary operator: \`{shart ? <A/> : <B/>}\`, (2) \`&&\` operatori: \`{shart && <A/>}\`, (3) Funksiya ichida if/else yozib, funksiyani chaqirish.

**4. Fragment (\`<>\`) nima uchun kerak?**
*Javob:* React da komponent har doim bitta ildiz elementni qaytarishi kerak. Fragment qo'shimcha DOM elementi (masalan, div) qo'shmay, bir necha elementni guruhlash imkonini beradi. Bu ayniqsa table, flexbox, grid kabi holatlarda muhim — ortiqcha div tuzilmani buzmaydi.
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

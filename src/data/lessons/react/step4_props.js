export const step4_props = {
  id: "step4_props",
  title: "4-DARS: Props (Xususiyatlar)",
  content: `
# 4-DARS: Props (Xususiyatlar)

## 1. Props Nima?

Props (Properties — xususiyatlar) — bu ma'lumotlarni **ota komponentdan bola komponentga** uzatish usuli. Props yordamida bir xil komponentni turli ma'lumotlar bilan qayta-qayta ishlatishimiz mumkin.

**Hayotiy o'xshatish:** Tasavvur qiling, "Tabrik xati" shabloni bor. Ota ushbu shablonga **ism**, **sana**, va **xabar** ni to'ldiradi. Shablon (bola komponent) bu ma'lumotlarni ko'rsatadi. Bir xil shablon, turli ma'lumotlar bilan!

\`\`\`mermaid
graph TD
    A["OtaKomponent"] -->|"props: { ism, yosh }"| B["BolaKomponent"]
    A -->|"props: { ism, yosh }"| C["BolaKomponent 2"]
    A -->|"props: { ism, yosh }"| D["BolaKomponent 3"]

    style A fill:#3498db,color:#fff
    style B fill:#2ecc71,color:#fff
    style C fill:#2ecc71,color:#fff
    style D fill:#2ecc71,color:#fff
\`\`\`

---

## 2. Props ni Uzatish va Qabul Qilish

### Uzatish (Ota komponentda)

\`\`\`jsx
// Ota komponent — props ni uzatadi
function OtaKomponent() {
  return (
    <div>
      {/* ism va yosh proplarini uzatamiz */}
      <Tabrik ism="Abdulloh" yosh={25} />
      <Tabrik ism="Kamola" yosh={22} />
      <Tabrik ism="Jasur" yosh={30} />
    </div>
  );
}
\`\`\`

### Qabul Qilish (Bola komponentda)

\`\`\`jsx
// Bola komponent — props ni qabul qiladi
// Usul 1: props obyekti orqali
function Tabrik(props) {
  // props.ism va props.yosh ga murojaat qilamiz
  return (
    <div>
      <h2>Salom, {props.ism}!</h2>
      <p>Sizning yoshingiz: {props.yosh}</p>
    </div>
  );
}
\`\`\`

\`\`\`jsx
// Usul 2: Destructuring bilan (tavsiya etiladi)
function Tabrik({ ism, yosh }) {
  // To'g'ridan-to'g'ri ism va yosh ga murojaat
  return (
    <div>
      <h2>Salom, {ism}!</h2>
      <p>Sizning yoshingiz: {yosh}</p>
    </div>
  );
}
\`\`\`

---

## 3. Props Turlari

### String props

\`\`\`jsx
// String props — tirnoq ichida yozing
<Komponent sarlavha="Yangiliklar" rang="ko'k" />
\`\`\`

### Number va Boolean props

\`\`\`jsx
// Number va Boolean — {} ichida yozing
<Komponent son={42} faol={true} kattalik={1.5} />

// Boolean props: faqat nom yozilsa true bo'ladi
<Input majburiy />         {/* majburiy={true} bilan bir xil */}
<Input majburiy={false} /> {/* false qilish uchun aniq yozish kerak */}
\`\`\`

### Obyekt va Massiv props

\`\`\`jsx
// Obyekt props
<Profil
  foydalanuvchi={{ ism: "Abdulloh", yosh: 25, shahar: "Toshkent" }}
/>

// Massiv props
<Ro'yxat elementlar={["React", "Vue", "Angular"]} />
\`\`\`

### Funksiya props (Callback)

\`\`\`jsx
// Funksiya props — boladan otaga xabar berish uchun
function Ota() {
  const bosildi = () => {
    console.log("Tugma bosildi!");
  };

  // bosildi funksiyasini props sifatida uzatamiz
  return <Tugma onClick={bosildi} />;
}

function Tugma({ onClick }) {
  // Props orqali kelgan funksiyani chaqiramiz
  return <button onClick={onClick}>Bosing!</button>;
}
\`\`\`

---

## 4. Default Props (Standart Qiymatlar)

Agar props uzatilmasa, standart qiymat ishlatiladi.

\`\`\`jsx
// Usul 1: Destructuring da standart qiymat
function Tugma({ matn = "Bosing", rang = "ko'k", kattalik = "o'rta" }) {
  return (
    <button style={{ background: rang }}>
      {matn}
    </button>
  );
}

// Quyidagilar bir xil natija beradi:
<Tugma />                               {/* Standart qiymatlar ishlatiladi */}
<Tugma matn="Yuborish" rang="yashil" /> {/* Ko'rsatilgan qiymatlar */}
\`\`\`

\`\`\`jsx
// Usul 2: defaultProps (eski usul, hali ishlatiladi)
function Karta({ sarlavha, matn }) {
  return <div><h3>{sarlavha}</h3><p>{matn}</p></div>;
}

Karta.defaultProps = {
  sarlavha: "Standart sarlavha",
  matn: "Standart matn"
};
\`\`\`

---

## 5. children Props

\`\`\`children\` — bu maxsus props bo'lib, komponent teglari o'rtasiga qo'yilgan barcha narsani o'z ichiga oladi.

\`\`\`jsx
// children props ni qabul qiluvchi komponent
function Konteyner({ children, sarlavha }) {
  return (
    <div className="konteyner">
      <h2>{sarlavha}</h2>
      {/* children — ichiga qo'yilgan barcha narsalar */}
      <div className="tarkib">
        {children}
      </div>
    </div>
  );
}

// Ishlatish — teglar orasiga qo'yilgan narsa children bo'ladi
function App() {
  return (
    <Konteyner sarlavha="Mening konteynerim">
      <p>Bu paragraf children sifatida keladi</p>
      <button>Bu tugma ham children</button>
    </Konteyner>
  );
}
\`\`\`

---

## 6. Props Immutability (O'zgarmaslik)

Props **o'zgartirib bo'lmaydi** (read-only). Bu React ning asosiy tamoyili.

\`\`\`jsx
// ❌ YOMON — props ni o'zgartirish MUMKIN EMAS!
function Komponent(props) {
  props.ism = "Boshqa ism"; // Bu XATO! TypeScript xatolik beradi, oddiy JS da xatosiz ishlasa ham mantiqan noto'g'ri
  return <p>{props.ism}</p>;
}

// ✅ YAXSHI — props ni o'qish va ko'rsatish
function Komponent({ ism }) {
  // props ni o'zgartirmasdan ishlatamiz
  const kattaHarf = ism.toUpperCase(); // Yangi o'zgaruvchi yaratamiz
  return <p>{kattaHarf}</p>;
}
\`\`\`

**Nima uchun?** Agar props o'zgartirilsa, React qaysi komponent nima qilayotganini kuzatib bo'lmaydi va UI bashorat qilib bo'lmaydi. Bu "Data Down, Events Up" tamoyilidir.

---

## 7. Callback Props — Boladan Otaga Ma'lumot Yuborish

\`\`\`mermaid
graph TD
    A["Ota Komponent\nstate: sanoq"] -->|"onBosish funksiyasi (prop)"| B["Bola Komponent\nTugma"]
    B -->|"onClick chaqirildi!"| A
    A -->|"Yangi state bilan re-render"| C["UI yangilandi"]

    style A fill:#3498db,color:#fff
    style B fill:#e67e22,color:#fff
    style C fill:#2ecc71,color:#fff
\`\`\`

\`\`\`jsx
// Ota komponent — state saqlaydi va callback beradi
function Hisoblagich() {
  const [sanoq, setSanoq] = React.useState(0);

  // Bu funksiya bola komponentga props sifatida uzatiladi
  const oshir = () => setSanoq(s => s + 1);
  const kamayt = () => setSanoq(s => s - 1);

  return (
    <div>
      <p>Sanoq: {sanoq}</p>
      {/* Callback funksiyalarni props sifatida uzatamiz */}
      <TugmaGruhi onOshir={oshir} onKamayt={kamayt} />
    </div>
  );
}

// Bola komponent — callback ni chaqiradi
function TugmaGruhi({ onOshir, onKamayt }) {
  return (
    <div>
      <button onClick={onKamayt}>-</button>
      <button onClick={onOshir}>+</button>
    </div>
  );
}
\`\`\`

---

## 8. ❌ YOMON va ✅ YAXSHI Yondashuvlar

### Prop Drilling — Muammo

\`\`\`jsx
// ❌ YOMON — "Prop drilling": ma'lumot juda ko'p qatlam orqali uzatiladi
function App() {
  const [foydalanuvchi, setFoydalanuvchi] = useState({ ism: "Abdulloh" });
  return <A foydalanuvchi={foydalanuvchi} />;
}

function A({ foydalanuvchi }) {
  return <B foydalanuvchi={foydalanuvchi} />; // A bu props ni ishlatmaydi, faqat uzatadi!
}

function B({ foydalanuvchi }) {
  return <C foydalanuvchi={foydalanuvchi} />; // B ham ishlatmaydi!
}

function C({ foydalanuvchi }) {
  return <p>{foydalanuvchi.ism}</p>; // Faqat C ishlatadi
}
\`\`\`

\`\`\`jsx
// ✅ YAXSHI — Context API ishlatish (keyingi darsda o'rganamiz)
// Yoki komponent tuzilmasini qayta ko'rib chiqish
\`\`\`

### Props ni aniq nomlash

\`\`\`jsx
// ❌ YOMON — noaniq nomlar
<Komponent x={true} y="qizil" z={handler} />

// ✅ YAXSHI — aniq va ma'noli nomlar
<Komponent faol={true} rang="qizil" onBosish={handler} />
\`\`\`

---

## 9. Intervyu Savollari

**1. Props nima va State dan qanday farq qiladi?**
*Javob:* Props (properties) — tashqaridan (ota komponentdan) keluvchi, o'zgartirib bo'lmaydigan ma'lumotlar. State esa komponentning ichki, o'zgartirib bo'ladigan ma'lumotlari. Props "read-only" (faqat o'qish uchun), State esa o'zgartirilishi mumkin. Props yuqoridan pastga (ota → bola), State esa komponentning o'zida saqlanadi.

**2. Callback props nima uchun kerak?**
*Javob:* React da ma'lumotlar faqat yuqoridan pastga (ota → bola) oqadi. Lekin bola komponent ota komponentga xabar berishi kerak bo'lganda (masalan, tugma bosildi), callback funksiyani props orqali uzatib, bola uni chaqiradi. Bu "Data Down, Events Up" tamoyili.

**3. children props nima?**
*Javob:* \`children\` — maxsus React props bo'lib, komponent teglari orasiga qo'yilgan barcha narsani ifodalaydi. Masalan, \`<Konteyner><p>Salom</p></Konteyner>\` da \`<p>Salom</p>\` children bo'ladi. Bu komponentlarni moslashuvchan va qayta ishlatiluvchi qiladi.

**4. Prop drilling nima va qanday hal qilish mumkin?**
*Javob:* Prop drilling — ma'lumotni bir necha qatlam orqali uzatish, ayniqsa o'rta qatlamlar bu ma'lumotni ishlatmasa. Yechimlar: (1) Komponent tuzilmasini qayta ko'rish, (2) Context API ishlatish, (3) Redux/Zustand kabi state management kutubxonalari.
`,
  code: `// Props ning asosiy misoli
import React from 'react'

// Bola komponent — props qabul qiladi (destructuring bilan)
function FoydalanuvchiKarta({ ism, yosh, kasb, faol = false }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '16px',
      borderRadius: '8px',
      margin: '8px'
    }}>
      {/* Props ni ko'rsatamiz */}
      <h3>{ism}</h3>
      <p>Yosh: {yosh}</p>
      <p>Kasb: {kasb}</p>
      {/* Boolean props bilan shartli ko'rsatish */}
      <span style={{ color: faol ? 'green' : 'gray' }}>
        {faol ? '🟢 Faol' : '⚫ Faol emas'}
      </span>
    </div>
  )
}

// Ota komponent — turli props bilan qayta ishlatamiz
function App() {
  return (
    <div>
      <h1>Foydalanuvchilar</h1>
      {/* Har xil props bilan bir xil komponent */}
      <FoydalanuvchiKarta
        ism="Abdulloh"
        yosh={25}
        kasb="Dasturchi"
        faol={true}
      />
      <FoydalanuvchiKarta
        ism="Kamola"
        yosh={22}
        kasb="Dizayner"
      />
    </div>
  )
}

export default App`,
  exercises: [
    {
      id: 1,
      title: "Birinchi Props",
      instruction: "Salom({ism}) komponentini yarating, u 'Salom, {ism}!' ko'rsatsin. App da uchta turli ism bilan chaqiring.",
      startingCode: "// Salom komponentini yarating\nfunction Salom({ ism }) {\n  // Bu yerda ism ni ko'rsating\n}\n\nfunction App() {\n  return (\n    <div>\n      {/* Uchta turli ism bilan chaqiring */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "function Salom({ ism }) { return <p>Salom, {ism}!</p> }",
      solution: "function Salom({ ism }) {\n  return <p>Salom, {ism}!</p>\n}\n\nfunction App() {\n  return (\n    <div>\n      <Salom ism='Abdulloh' />\n      <Salom ism='Kamola' />\n      <Salom ism='Jasur' />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('{ ism }') && !code.includes('{ism}')) return 'ism props ni destructuring bilan qabul qiling'; if (!code.includes('<Salom')) return 'Salom komponentini chaqiring'; return null;"
    },
    {
      id: 2,
      title: "Bir necha Props",
      instruction: "Mahsulot({ nomi, narx, soni }) komponentini yarating. App da 3 ta mahsulot ko'rsating.",
      startingCode: "function Mahsulot({ nomi, narx, soni }) {\n  // Mahsulot ma'lumotlarini ko'rsating\n}\n\nfunction App() {\n  return (\n    <div>\n      {/* 3 ta mahsulot */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "return <div><h3>{nomi}</h3><p>Narxi: {narx} so'm</p><p>Soni: {soni}</p></div>",
      solution: "function Mahsulot({ nomi, narx, soni }) {\n  return (\n    <div>\n      <h3>{nomi}</h3>\n      <p>Narxi: {narx} so'm</p>\n      <p>Soni: {soni}</p>\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Mahsulot nomi='Kitob' narx={25000} soni={5} />\n      <Mahsulot nomi='Daftar' narx={5000} soni={10} />\n      <Mahsulot nomi='Ruchka' narx={2000} soni={20} />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('narx') || !code.includes('soni')) return 'narx va soni props larini qo\'shing'; return null;"
    },
    {
      id: 3,
      title: "Default Props",
      instruction: "Tugma({ matn = 'Bosing', rang = 'blue' }) komponentini yarating. Birinchi chaqiruvda props bering, ikkinchisida bermang (standart qiymatlar ko'rinsin).",
      startingCode: "function Tugma({ matn = 'Bosing', rang = 'blue' }) {\n  return (\n    <button style={{ background: rang, color: 'white', padding: '8px 16px' }}>\n      {matn}\n    </button>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      {/* Props bilan */}\n      {/* Props siz */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "<Tugma matn='Yuborish' rang='green' /> va <Tugma />",
      solution: "function Tugma({ matn = 'Bosing', rang = 'blue' }) {\n  return (\n    <button style={{ background: rang, color: 'white', padding: '8px 16px' }}>\n      {matn}\n    </button>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Tugma matn='Yuborish' rang='green' />\n      <Tugma />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('matn = ')) return 'Default props matn = ... formatida bering'; return null;"
    },
    {
      id: 4,
      title: "children Props",
      instruction: "Karta({ sarlavha, children }) komponentini yarating. App da foydalaning — teg orasiga p va button qo'ying.",
      startingCode: "function Karta({ sarlavha, children }) {\n  return (\n    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>\n      <h3>{sarlavha}</h3>\n      {/* children bu yerga */}\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Karta sarlavha='Mening kartam'>\n        {/* Bu yerga tarkib qo'ying */}\n      </Karta>\n    </div>\n  )\n}\n\nexport default App",
      hint: "<div>{children}</div> va <Karta><p>Matn</p><button>Tugma</button></Karta>",
      solution: "function Karta({ sarlavha, children }) {\n  return (\n    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>\n      <h3>{sarlavha}</h3>\n      <div>{children}</div>\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Karta sarlavha='Mening kartam'>\n        <p>Bu paragraf children sifatida keladi</p>\n        <button>Bu tugma ham children</button>\n      </Karta>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('children')) return 'children props ni ishlating'; return null;"
    },
    {
      id: 5,
      title: "Callback Props",
      instruction: "Tugma({ onClick, matn }) komponentini yarating. App da onClick={} orqali alert('Bosildi!') chaqiring.",
      startingCode: "function Tugma({ onClick, matn }) {\n  return <button onClick={onClick}>{matn}</button>\n}\n\nfunction App() {\n  const handler = () => {\n    // Bu yerda alert yozing\n  }\n  \n  return (\n    <div>\n      <Tugma matn='Bosing' onClick={handler} />\n    </div>\n  )\n}\n\nexport default App",
      hint: "const handler = () => alert('Bosildi!')",
      solution: "function Tugma({ onClick, matn }) {\n  return <button onClick={onClick}>{matn}</button>\n}\n\nfunction App() {\n  const handler = () => {\n    alert('Bosildi!')\n  }\n  \n  return (\n    <div>\n      <Tugma matn='Bosing' onClick={handler} />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('onClick')) return 'onClick props ni o\'tkazing'; return null;"
    },
    {
      id: 6,
      title: "Boolean Props",
      instruction: "Xabar({ matn, xato = false }) komponentini yarating. xato=true bo'lsa qizil, false bo'lsa yashil rangda ko'rsatsin.",
      startingCode: "function Xabar({ matn, xato = false }) {\n  // rang ni aniqlang\n  \n  return (\n    <div style={{ /* rang bering */ }}>\n      {matn}\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Xabar matn='Muvaffaqiyatli!' />\n      <Xabar matn='Xato yuz berdi!' xato={true} />\n    </div>\n  )\n}\n\nexport default App",
      hint: "const rang = xato ? 'red' : 'green'. style={{color: rang}}",
      solution: "function Xabar({ matn, xato = false }) {\n  const rang = xato ? 'red' : 'green'\n  return (\n    <div style={{ color: rang }}>\n      {matn}\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Xabar matn='Muvaffaqiyatli!' />\n      <Xabar matn='Xato yuz berdi!' xato={true} />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('xato')) return 'xato boolean props ni ishlating'; return null;"
    },
    {
      id: 7,
      title: "Obyekt Props",
      instruction: "Profil({ foydalanuvchi }) komponentini yarating. foydalanuvchi = { ism, yosh, shahar }. App dan obyekt props uzating.",
      startingCode: "function Profil({ foydalanuvchi }) {\n  // foydalanuvchi.ism, foydalanuvchi.yosh, foydalanuvchi.shahar\n  return (\n    <div>\n      {/* Ma'lumotlarni ko'rsating */}\n    </div>\n  )\n}\n\nfunction App() {\n  const men = { ism: 'Abdulloh', yosh: 25, shahar: 'Toshkent' }\n  \n  return (\n    <div>\n      <Profil foydalanuvchi={men} />\n    </div>\n  )\n}\n\nexport default App",
      hint: "<p>{foydalanuvchi.ism}</p> <p>{foydalanuvchi.yosh}</p>",
      solution: "function Profil({ foydalanuvchi }) {\n  return (\n    <div>\n      <p>Ism: {foydalanuvchi.ism}</p>\n      <p>Yosh: {foydalanuvchi.yosh}</p>\n      <p>Shahar: {foydalanuvchi.shahar}</p>\n    </div>\n  )\n}\n\nfunction App() {\n  const men = { ism: 'Abdulloh', yosh: 25, shahar: 'Toshkent' }\n  \n  return (\n    <div>\n      <Profil foydalanuvchi={men} />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('foydalanuvchi.ism')) return 'foydalanuvchi.ism ni ko\'rsating'; return null;"
    },
    {
      id: 8,
      title: "Spread Props",
      instruction: "const tugmaProps = { matn: 'Yuborish', rang: 'green', katta: true } ob'ektini yarating va Tugma ga {...tugmaProps} spread bilan o'tkazing.",
      startingCode: "function Tugma({ matn, rang, katta }) {\n  return (\n    <button style={{\n      background: rang,\n      fontSize: katta ? '20px' : '14px',\n      color: 'white'\n    }}>\n      {matn}\n    </button>\n  )\n}\n\nfunction App() {\n  const tugmaProps = { matn: 'Yuborish', rang: 'green', katta: true }\n  \n  return (\n    <div>\n      {/* Spread operator bilan o'tkating */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "<Tugma {...tugmaProps} />",
      solution: "function Tugma({ matn, rang, katta }) {\n  return (\n    <button style={{\n      background: rang,\n      fontSize: katta ? '20px' : '14px',\n      color: 'white'\n    }}>\n      {matn}\n    </button>\n  )\n}\n\nfunction App() {\n  const tugmaProps = { matn: 'Yuborish', rang: 'green', katta: true }\n  \n  return (\n    <div>\n      <Tugma {...tugmaProps} />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('{...tugmaProps}')) return '{...tugmaProps} spread operatorini ishlating'; return null;"
    },
    {
      id: 9,
      title: "Props va Shartli Render",
      instruction: "Xodim({ ism, lavoziim, boshliq = false }) yarating. boshliq true bo'lsa '👑 Boshliq' belgisi ko'rsatsin.",
      startingCode: "function Xodim({ ism, lavozim, boshliq = false }) {\n  return (\n    <div>\n      <p>{ism} — {lavozim}</p>\n      {/* boshliq true bo'lsa 👑 Boshliq ko'rsin */}\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Xodim ism='Ali' lavozim='Dasturchi' boshliq={true} />\n      <Xodim ism='Vali' lavozim='Dizayner' />\n    </div>\n  )\n}\n\nexport default App",
      hint: "{boshliq && <span>👑 Boshliq</span>}",
      solution: "function Xodim({ ism, lavozim, boshliq = false }) {\n  return (\n    <div>\n      <p>{ism} — {lavozim}</p>\n      {boshliq && <span>👑 Boshliq</span>}\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Xodim ism='Ali' lavozim='Dasturchi' boshliq={true} />\n      <Xodim ism='Vali' lavozim='Dizayner' />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('boshliq')) return 'boshliq props ni ishlating'; return null;"
    },
    {
      id: 10,
      title: "Hisoblash va Props",
      instruction: "Narx({ dona, birNarx }) komponentini yarating. Jami narxni hisoblang: dona * birNarx. Formatlang: '15,000 so\'m'.",
      startingCode: "function Narx({ dona, birNarx }) {\n  // Jami narxni hisoblang\n  const jami = ???\n  \n  return (\n    <div>\n      <p>Dona: {dona}</p>\n      <p>Bir narxi: {birNarx} so'm</p>\n      <p>Jami: {jami} so'm</p>\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Narx dona={5} birNarx={10000} />\n      <Narx dona={3} birNarx={25000} />\n    </div>\n  )\n}\n\nexport default App",
      hint: "const jami = dona * birNarx",
      solution: "function Narx({ dona, birNarx }) {\n  const jami = dona * birNarx\n  \n  return (\n    <div>\n      <p>Dona: {dona}</p>\n      <p>Bir narxi: {birNarx} so'm</p>\n      <p>Jami: {jami} so'm</p>\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div>\n      <Narx dona={5} birNarx={10000} />\n      <Narx dona={3} birNarx={25000} />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('dona * birNarx') && !code.includes('birNarx * dona')) return 'jami = dona * birNarx hisoblang'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Props nima?",
      options: [
        "Komponentning ichki o'zgaruvchilari",
        "Ota komponentdan bola komponentga uzatiladigan ma'lumotlar",
        "CSS stillari",
        "JavaScript funksiyalari"
      ],
      correctAnswer: 1,
      explanation: "Props (Properties) — ota komponentdan bola komponentga uzatiladigan, faqat o'qish uchun bo'lgan ma'lumotlar. Ular yordamida bir xil komponentni turli ma'lumotlar bilan qayta-qayta ishlatish mumkin."
    },
    {
      question: "Props ni o'zgartirish mumkinmi?",
      options: [
        "Ha, har doim",
        "Ha, faqat funksional komponentlarda",
        "Yo'q, props read-only (faqat o'qish uchun)",
        "Ha, lekin faqat render paytida"
      ],
      correctAnswer: 2,
      explanation: "Props immutable (o'zgarmas). Bola komponent props ni o'zgartira olmaydi. Bu React ning 'Data Down, Events Up' tamoyiliga asoslangan. Agar ma'lumotni o'zgartirish kerak bo'lsa, ota komponentda state ishlatiladi."
    },
    {
      question: "children props nima?",
      options: [
        "Komponentning bola komponentlari ro'yxati",
        "Komponent teglari orasiga qo'yilgan barcha narsalar",
        "Maxsus CSS class",
        "Massiv tipidagi props"
      ],
      correctAnswer: 1,
      explanation: "children — maxsus React props bo'lib, komponent teglar orasiga qo'yilgan barcha narsani ifodalaydi. Masalan, <Karta><p>Salom</p></Karta> da <p>Salom</p> children bo'ladi."
    },
    {
      question: "Default props qanday aniqlanadi (zamonaviy usul)?",
      options: [
        "props.default = {...}",
        "Component.defaultProps = {...}",
        "Destructuring da = bilan: function F({ a = 'default' })",
        "useState bilan"
      ],
      correctAnswer: 2,
      explanation: "Zamonaviy usul — destructuring da = operatori: function Komponent({ ism = 'Noma\'lum', yosh = 0 }). Bu aniqroq va o'qishga oson."
    },
    {
      question: "Prop drilling nima?",
      options: [
        "Props ni tez uzatish usuli",
        "Ma'lumotni bir necha qatlam komponent orqali uzatish, o'rta qatlamlar uni ishlatmasa ham",
        "Props ni o'chirish jarayoni",
        "Boolean props ishlatish"
      ],
      correctAnswer: 1,
      explanation: "Prop drilling — ma'lumotni bir necha qatlam komponent orqali uzatish, ayniqsa o'rta komponentlar bu ma'lumotni ishlatmasa. Bu kodni murakkablashtiradi. Yechim: Context API yoki state management kutubxonalari."
    },
    {
      question: "Callback props nima uchun ishlatiladi?",
      options: [
        "CSS still berish uchun",
        "Boladan otaga ma'lumot yoki hodisa uzatish uchun",
        "State boshqarish uchun",
        "Komponentni o'chirish uchun"
      ],
      correctAnswer: 1,
      explanation: "React da ma'lumotlar faqat yuqoridan pastga oqadi (one-way data flow). Callback props yordamida bola komponent ota komponentga hodisa yoki ma'lumot uzata oladi — bu 'Events Up' tamoyili."
    },
    {
      question: "Quyidagini o'qing: <Komponent faol /> Bu nima degan ma'noni anglatadi?",
      options: [
        "faol={undefined}",
        "faol='faol'",
        "faol={true}",
        "faol={1}"
      ],
      correctAnswer: 2,
      explanation: "JSX da boolean props faqat nomini yozish faol={true} bilan bir xil. Agar false qilish kerak bo'lsa, aniq faol={false} deb yozish kerak."
    },
    {
      question: "Spread operator bilan props uzatish qanday bo'ladi?",
      options: [
        "<Komponent props={myProps} />",
        "<Komponent ...myProps />",
        "<Komponent {...myProps} />",
        "<Komponent [myProps] />"
      ],
      correctAnswer: 2,
      explanation: "Spread operator: <Komponent {...myProps} />. Bu myProps obyektidagi barcha xususiyatlarni alohida props sifatida uzatadi. Qulay, lekin ehtiyotkorlik bilan ishlating — keraksiz props lar uzatilmaslik uchun."
    },
    {
      question: "Props va State ning asosiy farqi nima?",
      options: [
        "Props katta, State kichik",
        "Props tashqaridan keladi va o'zgarmas, State ichki va o'zgartirilishi mumkin",
        "Props faqat string, State har xil tip",
        "Farq yo'q, ikkalasi bir xil"
      ],
      correctAnswer: 1,
      explanation: "Props — tashqaridan (ota komponentdan) keladi, read-only. State — komponentning ichki ma'lumotlari, o'zgartirilishi mumkin (setState/useState orqali). Props o'zgarganda ham komponent qayta render bo'ladi."
    },
    {
      question: "Qanday qilib komponentga funksiyani props sifatida uzatish mumkin?",
      options: [
        "<K funksiya='handler()' />",
        "<K funksiya={handler} />",
        "<K funksiya='{handler}' />",
        "<K funksiya={handler()} />"
      ],
      correctAnswer: 1,
      explanation: "<K funksiya={handler} /> — to'g'ri. handler — bu funksiyaning o'zi (chaqirilmagan). handler() — bu funksiyani darhol chaqiradi va natijani props qiladi. JSX da {} ichida funksiyaning o'zini yozing."
    },
    {
      question: "Props ni qanday qilib o'zgartirish mumkin?",
      options: [
        "props.qiymat = yangiQiymat",
        "this.props.qiymat = yangiQiymat",
        "setState orqali",
        "Props o'zgartirib bo'lmaydi — bu React qoidasi"
      ],
      correctAnswer: 3,
      explanation: "Props immutable (o'zgarmas) — React ning asosiy tamoyili. Agar bola komponent ma'lumotni o'zgartirishi kerak bo'lsa, ota komponentda state saqlash va callback props orqali bola dan ota ga hodisa uzatish kerak."
    },
    {
      question: "Qaysi kod to'g'ri?",
      options: [
        "function K(props.ism, props.yosh) {}",
        "function K(ism, yosh) {}",
        "function K({ ism, yosh }) {}",
        "function K([ism, yosh]) {}"
      ],
      correctAnswer: 2,
      explanation: "function K({ ism, yosh }) {} — props ni destructuring bilan qabul qilish to'g'ri usuli. Bu kodni qisqartiradi va o'qishni osonlashtiradi. props.ism o'rniga to'g'ridan-to'g'ri ism ishlatiladi."
    },
    {
      question: "children props ni qanday olish mumkin?",
      options: [
        "function K(children) {}",
        "function K({ children }) {}",
        "function K(props) { props.child }",
        "function K({ kids }) {}"
      ],
      correctAnswer: 1,
      explanation: "function K({ children }) {} — to'g'ri usul. children — maxsus React props nomi va doimo shu nom bilan olinadi. Destructuring bilan { children } deb yozing."
    }
  ]
};

export const step4_props = {
  id: "step4_props",
  title: "4-DARS: Props (Xususiyatlar)",
  content: `
# 4-Qadam: React Props - Komponentlar o'rtasidagi aloqa vositasi

## Props o'zi nima?

Tasavvur qiling, siz inson tanasini yaratmoqchisiz. Har bir insonning o'ziga xos xususiyatlari bor: ko'zining rangi, bo'yi, sochining shakli. Bu xususiyatlar insonga qayerdan keladi? Albatta, ota-onasidan gen (DNK) orqali o'tadi. React-da ham xuddi shunday!

**Props** (inglizcha *properties* - xususiyatlar so'zining qisqartmasi) - bu ota komponentdan farzand komponentga ma'lumot uzatish usuli. Ular xuddi ota-onadan farzandga o'tadigan DNKga o'xshaydi: farzand uni qabul qiladi va shunga mos shakllanadi, lekin farzand o'z DNK-sini o'zi o'zgartira olmaydi.

### Nega bizga Props kerak?
Agar bizda props bo'lmaganida, har bir komponent faqat bitta xil narsani ko'rsata olar edi (statik bo'lardi). Props yordamida biz **bitta komponentni yaratib, unga turlicha ma'lumotlar berib, ko'p marotaba ishlata olamiz** (Reusability).

\`\`\`jsx
// ❌ YOMON AMALIYOT (Don'ts): Har bir foydalanuvchi uchun alohida komponent yaratish
function UserAli() {
  return <h1>Salom, Ali! Sen 20 yoshdasan.</h1>;
}

function UserVali() {
  return <h1>Salom, Vali! Sen 25 yoshdasan.</h1>;
}

// ✅ YAXSHI AMALIYOT (Do's): Bitta komponent yaratib, unga Props berish
function UserProfile(props) {
  return <h1>Salom, {props.name}! Sen {props.age} yoshdasan.</h1>;
}

// Ota komponentda ishlatilishi:
function App() {
  return (
    <div>
      <UserProfile name="Ali" age={20} />
      <UserProfile name="Vali" age={25} />
    </div>
  );
}
\`\`\`

> [!WARNING]
> **Props o'zgarmasdir (Read-only / Immutable)!**
> Farzand komponent hech qachon o'ziga kelgan props'ni o'zgartirmasligi kerak. Ular faqat o'qish uchun mo'ljallangan.

## Bir yo'nalishli ma'lumotlar oqimi (Unidirectional Data Flow)

React-da ma'lumotlar har doim **tepadan pastga** (ota komponentdan farzand komponentga) qarab harakatlanadi. Bunga "Unidirectional Data Flow" yoki bir yo'nalishli oqim deyiladi. Ma'lumot hech qachon o'z-o'zidan pastdan tepaga qarab oqmaydi.

### Nega bu muhim?
Ilovaning holati (state) va ma'lumotlari qayerdan kelayotganini kuzatish juda oson bo'ladi. Agar qandaydir ma'lumot xato chiqayotgan bo'lsa, siz uni faqat tepadagi ota komponentlardan izlaysiz, bu esa xatolarni (bug) topishni va arxitekturani tushunishni juda osonlashtiradi.

\`\`\`mermaid
graph TD
    A[Ota Komponent <br> App] -->|props: {users}| B(Farzand Komponent <br> UserList)
    A -->|props: {theme}| C(Farzand Komponent <br> Header)
    B -->|props: {name, age}| D(Nabira Komponent <br> UserCard 1)
    B -->|props: {name, age}| E(Nabira Komponent <br> UserCard 2)
    
    style A fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:white
    style B fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:white
    style C fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:white
    style D fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:white
    style E fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:white
\`\`\`

## Props'dan Ilg'or Foydalanish (Advanced Prop Usage)

### 1. Destructuring (Qismlarga ajratish)
Odatda biz \`props\` obyekti ichidan qiymatlarni olish uchun \`props.name\`, \`props.age\` deb yozamiz. Lekin bu kodni biroz uzun qilib yuboradi. ES6 ning "Destructuring" xususiyati yordamida biz props'ni bevosita parametrlar qismidayoq ajratib olishimiz mumkin.

**Nega kerak?** Kodni toza, qisqa va o'qishga qulay qilish uchun. Bir qarashda komponent qanday xususiyatlarni qabul qilishini ko'rish mumkin.

\`\`\`jsx
// ❌ YOMON AMALIYOT (Eski usul)
function ProductCard(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>Narxi: {props.price}$</p>
      <button disabled={!props.inStock}>Sotib olish</button>
    </div>
  );
}

// ✅ YAXSHI AMALIYOT (Destructuring bilan)
function ProductCard({ title, price, inStock }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Narxi: {price}$</p>
      <button disabled={!inStock}>Sotib olish</button>
    </div>
  );
}
\`\`\`

### 2. Default Props (Standart xususiyatlar)
Ba'zan ota komponent ma'lum bir prop'ni berishni unutilishi mumkin yoki o'sha ma'lumot vaqtincha mavjud bo'lmasligi mumkin. Shunday paytlarda komponent "sinib qolmasligi" uchun biz standart qiymatlarni (Default Props) belgilashimiz mumkin.

**Nega kerak?** Ilova ishonchliligini oshirish va "undefined" yoki xatoliklarning oldini olish uchun.

\`\`\`jsx
// Destructuring vaqtida standart qiymat berish (Eng zamonaviy va tavsiya etilgan usul)
function Avatar({ imageUrl = "https://default-image.com/user.png", size = "medium" }) {
  const imageSize = size === "large" ? "100px" : "50px";
  
  return <img src={imageUrl} alt="Foydalanuvchi rasmi" width={imageSize} />;
}

// Agar ota komponent hech narsa bermasa ham, xato chiqmaydi:
// <Avatar />  => imageUrl va size o'zining standart qiymatini oladi.
\`\`\`

### 3. PropTypes (Tiplarni tekshirish)
Katta loyihalarda komponentga noto'g'ri ma'lumot tipi (masalan, string o'rniga number) yuborilishi xavfi mavjud. Buning oldini olish uchun React-da \`prop-types\` kutubxonasidan foydalaniladi. Garchi bugungi kunda TypeScript bu vazifani a'lo darajada bajarsa ham, oddiy JavaScript loyihalarida PropTypes bilish juda muhim.

**Nega kerak?** Dasturchi xatolarini erta aniqlash va qat'iy ma'lumotlar tipini ta'minlash uchun.

\`\`\`jsx
import PropTypes from 'prop-types';

function Button({ text, color, onClick }) {
  return <button style={{ backgroundColor: color }} onClick={onClick}>{text}</button>;
}

// Qanday turdagi props kelishi kerakligini qat'iy belgilaymiz
Button.propTypes = {
  text: PropTypes.string.isRequired,    // isRequired - albatta berilishi shart
  color: PropTypes.string,              // ixtiyoriy
  onClick: PropTypes.func               // funksiya bo'lishi kerak
};
\`\`\`

## Funksiyalarni Props orqali uzatish (Callback Props)

Yuqorida aytganimizdek, ma'lumot faqat tepadan pastga qarab oqadi. Xo'sh, farzand komponent ota komponentdagi qandaydir ma'lumotni o'zgartirishi yoki unga xabar berishi kerak bo'lsa-chi?

Buning yechimi oddiy: Ota komponent farzandga ma'lumot emas, balki **bajarilishi kerak bo'lgan funksiya (callback)** yuboradi. Farzand kerakli vaqtda (masalan, tugma bosilganda) o'sha funksiyani chaqiradi va unga kerakli ma'lumotni argument sifatida berib yuboradi. Shu tariqa biz pastdan tepaga ma'lumot yuborgandek bo'lamiz!

**Nega kerak?** Farzand komponentlarda yuz bergan hodisalarga (bosish, yozish) ota komponent javob qaytara olishi uchun.

\`\`\`mermaid
sequenceDiagram
    participant Ota as Ota Komponent (App)
    participant Farzand as Farzand Komponent (SearchBox)
    
    Ota->>Farzand: Props: onSearch(term) funksiyasini yuboradi
    Note right of Farzand: Foydalanuvchi qidiruvga "React" yozdi
    Farzand-->>Ota: onSearch("React") ni chaqiradi
    Note left of Ota: Ota komponent "React" ni qabul qildi <br>va o'zining holatini yangilaydi
\`\`\`

### Kod namunasi:

\`\`\`jsx
// Ota komponent
function Dashboard() {
  // Callback funksiya
  const handleDelete = (itemId) => {
    console.log(\`O'chirilayotgan element ID: \${itemId}\`);
    // Bu yerda API ga so'rov yuborib elementni o'chirish mumkin
  };

  return (
    <div>
      <h1>Boshqaruv paneli</h1>
      {/* Funksiyani prop orqali uzatish */}
      <ItemCard id={1} title="Maqola 1" onDelete={handleDelete} />
    </div>
  );
}

// Farzand komponent
function ItemCard({ id, title, onDelete }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {/* Tugma bosilganda otadan kelgan funksiya ishga tushadi */}
      <button onClick={() => onDelete(id)}>
        O'chirish
      </button>
    </div>
  );
}
\`\`\`

> [!TIP]
> E'tibor bering, \`ItemCard\` o'zini o'zi o'chirmaydi. U shunchaki otasiga "Meni o'chirish knopkamni bosishdi, bu mening ID raqamim" deb xabar beradi. Asosiy ishni Ota komponent hal qiladi.

## Props bilan ishlashda eng ko'p yo'l qo'yiladigan xatolar (Common Mistakes)

### 1. Props-ni to'g'ridan-to'g'ri o'zgartirishga urinish (Mutating Props)
Props bu o'qish uchun mo'ljallangan (read-only). Hech qachon farzand komponent ichida prop-ga qiymat biriktirmang!

\`\`\`jsx
// ❌ QILMANG: React bu yerda qattiq xato tashlaydi!
function UserPanel(props) {
  props.name = "Yangi ism"; // XATO! Props o'zgarmasdir!
  return <div>{props.name}</div>;
}
\`\`\`
Agar props asosida qandaydir o'zgarish qilmoqchi bo'lsangiz, uni state (holat) yoki yangi o'zgaruvchiga oling.

### 2. Oddiy HTML atributlari va Props'ni chalkashtirish
Ba'zi HTML atributlari React'da boshqacha nomlanadi, buni eslab qolish muhim:
- \`class\` o'rniga \`className\`
- \`for\` o'rniga \`htmlFor\`
- Hodisalar camelCase usulida yoziladi: \`onclick\` o'rniga \`onClick\`, \`onchange\` o'rniga \`onChange\`.

\`\`\`jsx
// ❌ QILMANG
function Box(props) {
  return <div class="box-style" onclick={props.clickEvent}>{props.text}</div>
}

// ✅ QILING
function Box({ customClass, onClickEvent, text }) {
  return <div className={\`box-style \${customClass}\`} onClick={onClickEvent}>{text}</div>
}
\`\`\`

### 3. Ortiqcha props yuborish (Prop Drilling)
Tasavvur qiling, ota komponentda ma'lumot bor. Lekin u ma'lumot eng chuqurdagi 5-darajali farzand komponentga kerak. O'rtadagi 4 ta komponent bu ma'lumotdan foydalanmasa ham, uni pastga uzatish uchun o'zidan o'tkazishi kerak. Bu **Prop Drilling** deyiladi.

Bu noto'g'ri amaliyot hisoblanadi, chunki o'rtadagi komponentlar o'ziga kerak bo'lmagan ma'lumotni tashib yuradi. Buning yechimi sifatida kelajakda **Context API** yoki **Redux/Zustand** kabi state menejerlarini o'rganamiz. Hozircha esa komponentlarni iloji boricha ixcham saqlashga harakat qiling.

---
**Xulosa:** Props - bu React komponentlari o'rtasida ma'lumot tashuvchi ko'prik. U tepadan pastga (Unidirectional) harakatlanadi, doim o'zgarmas (immutable) bo'ladi va ilovangizni bo'laklarga (reusable components) bo'lib ishlashga imkon beradi. Ularni to'g'ri tushunish, React-dagi ilk katta g'alabangizdir!

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

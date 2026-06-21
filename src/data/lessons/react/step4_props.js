export const step4_props = {
  title: "4-DARS: Props (Properties)",
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
    },
    {
      id: 2,
      title: "Ko'p xususiyatli Foydalanuvchi Profili",
      instruction: "`User` komponenti yaratilgan, lekin hozir u doim bir xil ma'lumotni qaytaradi. U `ism`, `yosh` va `kasb` propslarini qabul qilib ekranda chiqarishi kerak. `App` komponentida 2 xil foydalanuvchini props orqali yuboring.",
      startingCode: "import React from 'react';\n\nfunction User({ ism, yosh, kasb }) {\n  return (\n    <div>\n      <h2>Ism: _____</h2>\n      <p>Yosh: _____</p>\n      <p>Kasb: _____</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <User />\n      <User />\n    </div>\n  );\n}",
      hint: "JSX ichida JavaScript o'zgaruvchilarini jingalak qavslar {} ichida yozishni unutmang: {ism}, {yosh}, {kasb}.",
      test: "if (!code.includes('{ism}') || !code.includes('{yosh}') || !code.includes('{kasb}')) return \"Props larni ko'rsatish uchun jingalak qavslardan foydalaning: {ism}\"; return null;"
    },
    {
      id: 3,
      title: "Mantiqiy (Boolean) props va Shartli render",
      instruction: "`Status` komponentiga `isOnline` prop yuboriladi. Agar u true bo'lsa 'Tarmoqda', false bo'lsa 'Tarmoqdan tashqarida' deb ko'rsatsin. Ternary operator (shart ? ha : yoq) dan foydalaning.",
      startingCode: "import React from 'react';\n\nfunction Status({ isOnline }) {\n  return (\n    <p>\n      Foydalanuvchi holati: {/* Shu yerda shartli render qiling */}\n    </p>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <Status isOnline={true} />\n      <Status isOnline={false} />\n    </div>\n  );\n}",
      hint: "{isOnline ? 'Tarmoqda' : 'Tarmoqdan tashqarida'}",
      test: "if (!code.includes('isOnline ?') && !code.includes('Tarmoqda')) return 'Ternary operatordan foydalanib shartli ravishda matn chiqaring.'; return null;"
    },
    {
      id: 4,
      title: "Default Props (Standart qiymatlar)",
      instruction: "`Button` komponentiga `text` va `color` propslari keladi. Agar `color` yuborilmasa, avtomatik ravishda 'blue' (ko'k) rangda bo'lishi kerak. Destructuring qismida standart qiymat bering.",
      startingCode: "import React from 'react';\n\n// color ga standart qiymat qilib 'blue' bering\nfunction Button({ text, color }) {\n  return (\n    <button style={{ backgroundColor: color, color: 'white', padding: '10px' }}>\n      {text}\n    </button>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      {/* Bu tugma ko'k bo'lishi kerak (standart) */}\n      <Button text=\"Saqlash\" />\n      \n      {/* Bu tugma qizil bo'lishi kerak */}\n      <Button text=\"O'chirish\" color=\"red\" />\n    </div>\n  );\n}",
      hint: "function Button({ text, color = 'blue' }) ko'rinishida yoziladi.",
      test: "if (!code.includes(\"color = 'blue'\") && !code.includes('color=\"blue\"')) return \"Destructuring ichida color propga default (standart) 'blue' qiymatini bering.\"; return null;"
    },
    {
      id: 5,
      title: "Bolalar (children) propini ishlatish",
      instruction: "`AlertCard` komponenti ichiga har qanday HTML yoki matn yuborish mumkin bo'lishi kerak. Buning uchun `children` propidan foydalanib o'rovchi komponent yarating va `App` dan uning ichiga bitta `<p>` elementini jo'nating.",
      startingCode: "import React from 'react';\n\nfunction AlertCard({ children }) {\n  return (\n    <div style={{ padding: '20px', backgroundColor: '#fee', border: '1px solid red' }}>\n      {/* Shu joyga bolalarni ko'rsating */}\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <AlertCard>\n      {/* Shu yerda biron xabar (masalan: <p>Diqqat xato!</p>) yozing */}\n    </AlertCard>\n  );\n}",
      hint: "Bolalarni ko'rsatish uchun jingalak qavsda {children} yozing. App ichida AlertCard teglari o'rtasiga nimadir kiriting.",
      test: "if (!code.includes('{children}') || !code.includes('<p>')) return 'AlertCard ichida {children} ishlating va App ichida uning orasiga qandaydir <p> tegi yozing.'; return null;"
    },
    {
      id: 6,
      title: "Obyektni props orqali yuborish",
      instruction: "Gohida har bir maydonni alohida prop qilib yubormasdan, bitta butun boshli obyektni yuborish qulay bo'ladi. `App` komponentida `student` obyekti bor. Shuni `profile` prop orqali `StudentProfile` ga yuboring va uni ekranda chiqaring.",
      startingCode: "import React from 'react';\n\nfunction StudentProfile({ profile }) {\n  return (\n    <ul>\n      {/* Obyektning ism va baho xususiyatlarini chiqaring */}\n      <li>Ismi: </li>\n      <li>Bahosi: </li>\n    </ul>\n  );\n}\n\nexport default function App() {\n  const student = { ism: 'Aziz', baho: 5 };\n  \n  return (\n    <div>\n      {/* Shu yerda StudentProfile komponentiga student obyektini profile={student} qilib yuboring */}\n      <StudentProfile />\n    </div>\n  );\n}",
      hint: "{profile.ism} va {profile.baho} ko'rinishida o'qiysiz.",
      test: "if (!code.includes('{profile.ism}') || !code.includes('profile={student}')) return 'App ichida profile propsiga student obyektini bering va StudentProfile ichida u obyektni ishlating.'; return null;"
    },
    {
      id: 7,
      title: "Raqamli props bilan ishlash",
      instruction: "`Rectangle` komponentiga `width` va `height` yuboriladi. Uning ichida ularning ko'paytmasini (yuza) hisoblab chiqaring.",
      startingCode: "import React from 'react';\n\nfunction Rectangle({ width, height }) {\n  return (\n    <div style={{ width: width, height: height, backgroundColor: 'lightblue' }}>\n      <p>Kenglik: {width}</p>\n      <p>Balandlik: {height}</p>\n      <p>Yuza: {/* Shu yerda width va height ko'paytmasini ko'rsating */}</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      {/* Props sifatida raqamlarni jingalak qavsda yuborish kerak {} */}\n      <Rectangle width={100} height={50} />\n    </div>\n  );\n}",
      hint: "{width * height} ko'rinishida yozishingiz mumkin.",
      test: "if (!code.includes('{width * height}') && !code.includes('{width*height}')) return 'Yuzani hisoblash uchun {width * height} yozish kerak.'; return null;"
    },
    {
      id: 8,
      title: "Ko'p sonli props larni Destructuring qilish",
      instruction: "Agar propslar juda ko'p bo'lsa (masalan: rasm URL, ism, email, tel, adres), ularni qulay o'qish uchun parchalash muhim. `ContactCard` da propsni parchalang va tegishli joylarga qo'ying.",
      startingCode: "import React from 'react';\n\n// Shu yerda propsni emas, uning ichidan { ism, email, tel } ni parchalab oling\nfunction ContactCard(props) {\n  return (\n    <div>\n      <h3>{/* ism */}</h3>\n      <p>Email: {/* email */}</p>\n      <p>Tel: {/* tel */}</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <ContactCard ism=\"Doston\" email=\"doston@mail.uz\" tel=\"+998901234567\" />\n  );\n}",
      hint: "function ContactCard({ ism, email, tel }) yozib, so'ngra larni ishlating.",
      test: "if (code.match(/function ContactCard\\s*\\(\\s*props\\s*\\)/)) return 'Destructuring dan foydalaning (props yozmang)'; if (!code.includes('{ism}') || !code.includes('{email}')) return 'Ma\\'lumotlarni chiqaring'; return null;"
    },
    {
      id: 9,
      title: "Massivni (Array) props orqali yuborish",
      instruction: "`List` komponentiga `items` degan prop orqali massiv yuborilyapti. O'sha massivning elementlarini `join(', ')` metodidan foydalanib bitta qatorda chiqarib bering.",
      startingCode: "import React from 'react';\n\nfunction List({ items }) {\n  return (\n    <p>\n      Mening sevimli mevalarim: \n      {/* Shu yerda items massivini .join(', ') bilan birlashtirib chiqaring */}\n    </p>\n  );\n}\n\nexport default function App() {\n  const mevalar = ['Olma', 'Banan', 'Uzum'];\n  return <List items={mevalar} />;\n}",
      hint: "{items.join(', ')}",
      test: "if (!code.includes('items.join')) return 'Massivni vergul bilan ko\\'rsatish uchun items.join(\", \") dan foydalaning.'; return null;"
    },
    {
      id: 10,
      title: "Komponentni props orqali yuborish (Kompozitsiya)",
      instruction: "React'da props qilib faqat string yoki obyekt emas, balki butun boshli React komponentlarini ham (misol qilib aytganda HTML teglarni) yuborish mumkin. `Layout` komponentiga `header` degan prop yuborilgan. Shu `header` ni eng tepada `<header>` tegining ichida ko'rsating.",
      startingCode: "import React from 'react';\n\nfunction Layout({ header, children }) {\n  return (\n    <div>\n      {/* Shu yerda header propni ko'rsating */}\n      <header>\n        \n      </header>\n      \n      <main>\n        {children}\n      </main>\n    </div>\n  );\n}\n\nexport default function App() {\n  const meningHeaderim = <h1>Mening Saytim</h1>;\n  \n  return (\n    <Layout header={meningHeaderim}>\n      <p>Asosiy kontent shu yerda</p>\n    </Layout>\n  );\n}",
      hint: "<header> ichida {header} ni yozing.",
      test: "if (!code.includes('{header}')) return 'Layout ichidagi <header> tegining o\\'rtasida {header} ni chiqaring.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Props nima degani va u nima uchun ishlatiladi?",
      options: [
        "A) Bu komponentning o'z ichki o'zgaruvchilari",
        "B) Ota komponentdan bola komponentga ma'lumot uzatishning yo'li",
        "C) React komponentlariga uslub berish vositasi",
        "D) React'dagi xatolarni ushlovchi funksiya"
      ],
      correctAnswer: 1,
      explanation: "Props bu Properties degani va u ota komponentdan bola komponentga ma'lumotlarni xuddi HTML atributlari kabi jo'natishning yagona usuli hisoblanadi."
    },
    {
      question: "Bola komponent otasi tomonidan berilgan propslarni o'zgartirishi (mutatsiya qilishi) mumkinmi?",
      options: [
        "Ha, istalgan vaqtda",
        "Faqat setTimeout ichida",
        "Yo'q, props lar read-only (faqat o'qish uchun) va ularni o'zgartirish qat'iyan taqiqlanadi",
        "Ha, lekin faqat props.name = 'yangi' orqali emas"
      ],
      correctAnswer: 2,
      explanation: "React'ning eng qat'iy qoidalaridan biri shu: barcha komponentlar o'zlarining propslariga nisbatan 'pure functions' (toza funksiya) kabi munosabatda bo'lishi va ularni aslo o'zgartirmasligi shart."
    },
    {
      question: "<UserCard ism=\"Ali\" /> - ushbu kodda ism nimani bildiradi?",
      options: [
        "State nomini",
        "HTML atributini emas, React uni Props deb ataydi va UserCard ga yuboradi",
        "CSS klassini",
        "JavaScript o'zgaruvchisini"
      ],
      correctAnswer: 1,
      explanation: "U HTML atributiga juda o'xshaydi, lekin bu React komponentiga uzatilayotgan xususiyat — Props dir."
    },
    {
      question: "Propslarni osonroq va qisqaroq yozish uchun ES6 ning qaysi xususiyatidan foydalanamiz?",
      options: [
        "Arrow functions",
        "Template literals",
        "Destructuring (Parchalash)",
        "Promises"
      ],
      correctAnswer: 2,
      explanation: "Props obyekti ichidan qiymatlarni to'g'ridan-to'g'ri sug'urib olish uchun Destructuring ishlatiladi: function User({ ism, yosh })."
    },
    {
      question: "Default Props nima?",
      options: [
        "Komponent umuman props qabul qilmasligi",
        "Agar ota komponent tomonidan prop uzatilmasa, u holda o'rniga olinadigan standart (default) qiymat",
        "Hamma propslarni avtomatik o'chirib yuboruvchi metod",
        "Propsning eng maksimal hajmi"
      ],
      correctAnswer: 1,
      explanation: "Xatoliklarning oldini olish uchun komponentga prop yuborilmagan paytda unga oldindan standart qiymat belgilash mumkin."
    },
    {
      question: "children propining asosiy vazifasi nima?",
      options: [
        "Faqat bolalarga mo'ljallangan ilovalarda ishlatiladi",
        "Komponentning ochuvchi va yopuvchi teglari orasidagi barcha elementlarni tutib, o'zining ichida uzatish (ko'rsatish) uchun",
        "Faqat rasm yuklash uchun kerak",
        "Boshqa HTML sahifaga o'tish uchun xizmat qiladi"
      ],
      correctAnswer: 1,
      explanation: "Biron komponentning <Card> ... </Card> o'rtasiga yozilgan har qanday kod React tomondan maxsus 'children' deb nomlanuvchi propga tushadi."
    },
    {
      question: "Props orqali qanday turdagi ma'lumotlarni yuborish mumkin?",
      options: [
        "Faqat String (matn) va Number (raqam)",
        "Faqat Boolean (true/false)",
        "Faqat Function (funksiya)",
        "Har qanday JS turini (String, Number, Array, Object, Function, hatto React komponentlarini)"
      ],
      correctAnswer: 3,
      explanation: "Props orqali barcha mavjud JavaScript tiplari, shu jumladan butun bir React elementlari (JSX) va callback funksiyalar ham muammosiz uzatiladi."
    },
    {
      question: "Nima uchun React da ma'lumotlar oqimi 'Bir yo'nalishli (Top-down)' deyiladi?",
      options: [
        "Chunki ma'lumot har doim faqat Ota komponentdan Bola komponentga qarab tepadan pastga uzatiladi",
        "Chunki props faqat pastdan yuqoriga harakatlanadi",
        "Chunki faqat bitta prop uzatish mumkin",
        "Chunki ma'lumot uzatish umuman to'xtab qoladi"
      ],
      correctAnswer: 0,
      explanation: "React'da Props lar faqat Ota komponentdan bolalarga tushadi, va ular orqaga o'z-o'zidan qaytmaydi. Bu 'Top-down' oqim deyiladi."
    },
    {
      question: "<MyComponent isActive /> kabi prop uzatish nimani anglatadi?",
      options: [
        "isActive undefined bo'ladi",
        "isActive={false} bilan bir xil",
        "isActive={true} degani, ya'ni agar faqat nomi yozilib qiymati yozilmasa u true deb olinadi",
        "Xato yuzaga keladi, barobar (=) bilan qiymat berish majburiy"
      ],
      correctAnswer: 2,
      explanation: "Agar atributda boolean qiymat yozish kerak bo'lsa va u true bo'lsa, uni shunchaki nomini yozib qo'yish kifoya. Bu isActive={true} deganidir."
    },
    {
      question: "Agar raqamni (masalan 42) prop sifatida uzatmoqchi bo'lsak, qanday yozish to'g'ri?",
      options: [
        "age=\"42\"",
        "age=(42)",
        "age={42}",
        "age=[42]"
      ],
      correctAnswer: 2,
      explanation: "Matndan tashqari har qanday JavaScript tipidagi qiymatlarni (raqamlar, booleanlar, massivlar va obyektlar) yuborishda ularni jingalak qavs {} ichiga olish kerak."
    },
    {
      question: "function Button(props) { ... } ko'rinishida yozilganda, unga yuborilgan color nomli propga qanday murojaat qilinadi?",
      options: [
        "this.color",
        "props.color",
        "color",
        "props[color]"
      ],
      correctAnswer: 1,
      explanation: "Funksiyaga kelgan props argumenti bu bir obyekt bo'lgani sababli, uning ichidagi qismlarga oddiy nuqta orqali props.color tarzida murojaat etamiz."
    },
    {
      question: "function Avatar({ url = '/default.png' }) degan kod nimani tasvirlaydi?",
      options: [
        "url bu React hook hisoblanadi",
        "Avatar komponenti har doim '/default.png' rasmini oladi",
        "Destructuring orqali url propini olib, unga '/default.png' default (standart) qiymat qilib o'rnatilganini bildiradi",
        "Bu kod xato yozilgan, obyekt ichida = yozish mumkin emas"
      ],
      correctAnswer: 2,
      explanation: "Destructuring paytida tenglik (=) belgisi bilan default qiymat berish juda keng tarqalgan usul. Agar ota komponent url propini bermasa, u avtomatik ravishda '/default.png' ga teng bo'lib qoladi."
    }
  ]
};

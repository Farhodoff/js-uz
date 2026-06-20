export const step4_props = {
  title: "4-DARS: Props (Properties)",
  content: `
# 1. 🚚 Props nima va u qanday ishlaydi?

Oldingi darsda komponentlarni qanday yaratish va ularni qayta ishlatishni o'rgandik. Biroq, bitta komponentni 3 marta ishlatsak, ular mutlaqo bir xil ma'lumotni ko'rsatib turadi. Qanday qilib ularga turli xil ma'lumotlarni uzatamiz?
Buning yechimi — **Props (Properties)**.

Props bu Ota (Parent) komponentdan Bola (Child) komponentga ma'lumot jo'natishning yagona yo'li. U xuddi oddiy JS funksiyasiga argument (parametr) berishdek gap. HTML dagi \`<img src="rasm.jpg" />\` dagi \`src\` atributi qanday ishlasa, Props ham aynan shunday ishlaydi.

### Props qanday uzatiladi?
Ota komponentda atributlar sifatida yoziladi:
\`\`\`jsx
<UserCard ism="Ali" yosh={25} ishlaydimi={true} />
\`\`\`

Bola komponent ularni bitta \`props\` obyekti ichida qabul qilib oladi:
\`\`\`jsx
function UserCard(props) {
  return <p>{props.ism} - {props.yosh} yoshda.</p>;
}
\`\`\`

---

## 2. ✂️ Props Destructuring (Qulay yozish)

Har doim \`props.ism\`, \`props.yosh\` deb yozish uzoq va zerikarli. JS ning Destructuring (parchalab olish) xususiyatidan foydalanib kodni qisqartirishimiz mumkin:

\`\`\`jsx
// Obyektni to'g'ridan-to'g'ri qabul qilish qismida parchalaymiz
function UserCard({ ism, yosh }) {
  return <p>{ism} - {yosh} yoshda.</p>;
}
\`\`\`

---

## 3. 🛡️ Props ning Asosiy Qoidasi: Ular o'zgarmasdir! (Immutable)

React'ning eng qat'iy qoidalaridan biri: **Bola komponent o'ziga kelgan props larni O'ZGARTIRA OLMAYDI (Mutatsiya qila olmaydi).**

❌ **QAT'IYAN TAQIQLANADI:**
\`\`\`jsx
function UserCard(props) {
  props.ism = "Vali"; // XATO! Props read-only (faqat o'qish uchun)
  return <p>{props.ism}</p>;
}
\`\`\`
Props ma'lumotlar oqimining bir yo'nalishli (top-down) ekanligini ta'minlaydi. Agar ma'lumot o'zgarishi kerak bo'lsa, uni Props orqali emas, balki keyingi darsda o'tadiganimiz **State** orqali boshqarish kerak.

---

## 4. 🧰 Default Props (Standart qiymatlar)

Ba'zan Ota komponent qandaydir prop yuborishni unutilishi mumkin. Shunday paytda xato chiqmasligi uchun Default (standart) qiymat berish mumkin. ES6 funksiyalaridagidek qilinadi:

\`\`\`jsx
function UserCard({ ism = "Noma'lum", yosh = 18 }) {
  return <p>{ism} - {yosh} yoshda.</p>;
}
\`\`\`
Agar \`<UserCard />\` deb ism bermasdan chaqirsangiz, "Noma'lum" yozuvi chiqadi.

---

## 5. 📦 \`children\` prop (Bolalar)

Siz biron komponentning ochiluvchi va yopiluvchi teglari orasiga narsa yozsangiz, ular avtomatik ravishda \`children\` prop'iga tushadi. Bu ko'pincha Wrapper (o'rovchi) komponentlar (masalan: Modal, Card, Container) yaratishda judayam ko'p ishlatiladi.

\`\`\`jsx
function OrovchiCard({ children }) {
  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      {children}
    </div>
  );
}

// Ishlatish:
<OrovchiCard>
  <h2>Bu yozuv children orqali ichkariga kiradi!</h2>
  <button>Men ham children'man</button>
</OrovchiCard>
\`\`\`
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

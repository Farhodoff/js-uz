export const step1_setup = {
  title: "1-DARS: Tayyorgarlik va O'rnatish",
  content: `
# 1. ⚛️ React nima va nima uchun kerak?

**React** — bu foydalanuvchi interfeyslarini (UI) yaratish uchun Meta (sobiq Facebook) tomonidan ishlab chiqilgan mashhur JavaScript kutubxonasi. U dastlab 2013-yilda e'lon qilingan bo'lib, hozirda dunyodagi eng ko'p ishlatiladigan frontend texnologiyasi hisoblanadi.

**Nima uchun aynan React?**
*   **SPA (Single Page Application):** React ilovalari bitta HTML sahifasidan iborat bo'ladi. Sahifadan sahifaga o'tganda brauzer umuman yangilanmaydi (refresh bo'lmaydi), faqatgina kerakli qismlar qayta chiziladi. Bu dasturni xuddi mobil ilovalardek tez ishlashini ta'minlaydi.
*   **Komponentli yondashuv:** Interfeys kichik-kichik bo'laklarga (Lego kabi) bo'linadi (masalan: Tugma, Karta, Navbar). Bu ularni qayta-qayta turli joylarda ishlatish imkonini beradi.

---

## 2. 🚀 Virtual DOM tushunchasi

Oddiy HTML va JS da brauzerning DOM (Document Object Model) i juda sekin ishlaydi. Qachonki biror kichik narsa o'zgarsa, butun brauzer ekranni boshqatdan chizishiga to'g'ri keladi.

React bu muammoni **Virtual DOM** yordamida hal qildi:
1.  React haqiqiy DOM ning xotirada yengil nusxasi (Virtual DOM) ni yaratib oladi.
2.  Siz dasturda biron ma'lumotni o'zgartirsangiz, React butunlay yangi Virtual DOM yaratadi.
3.  **Diffing:** React avvalgi va yangi Virtual DOM larni bir-biriga solishtirib, qayeri o'zgarganini topadi.
4.  **Reconciliation:** Faqatgina o'zgargan kichik bir qismnigina haqiqiy brauzer DOM'iga olib o'tadi.

Bu jarayon React ni daxshatli darajada tez ishlashiga sabab bo'lgan asosiy texnologiyadir!

---

## 3. 🛠 Ish muhitini tayyorlash

React'da ishlash uchun kompyuteringizga ba'zi dasturlarni o'rnatish kerak.

### 1. Node.js va npm
React o'z ishlashi uchun Node.js muhitini talab qiladi. [nodejs.org](https://nodejs.org/) saytidan LTS (Long Term Support) versiyasini ko'chirib, o'rnating.
O'rnatgach, terminalni ochib tekshiring:
\`\`\`bash
node -v
npm -v
\`\`\`
*(npm - Node Package Manager, u Node.js bilan birga avtomatik o'rnatiladi va bizga React kutubxonalarini tortib olish uchun kerak)*

### 2. Loyiha yaratish (\`create-react-app\`)
Endi terminalda React loyihasini yaratamiz:
\`\`\`bash
npx create-react-app mening-loyiham
cd mening-loyiham
npm start
\`\`\`
*(npm start buyrug'idan so'ng, brauzeringiz avtomatik ochiladi va http://localhost:3000 da React logotipi aylanib turgan sahifa paydo bo'ladi).*

---

## 4. 📁 Loyiha tuzilishi (Strukturasi)

Loyiha yaratilgach, siz quyidagi fayl va papkalarni ko'rasiz:

*   **\`node_modules/\`**: Loyihamiz ishlashi uchun kerakli barcha kutubxonalar va kodlar shu yerga yuklanadi. (Bu papkaga umuman tegmaymiz).
*   **\`public/\`**: Ommaviy fayllar. Eng muhimi — \`index.html\`. React butun dasturni shu fayldagi \`<div id="root"></div>\` ichiga joylashtiradi.
*   **\`src/\`**: Bizning ish joyimiz! Barcha React kodlarimiz (komponentlar, rasmlar, CSS) shu yerda bo'ladi.
*   **\`package.json\`**: Loyiha pasporti. Qanday kutubxonalar o'rnatilgani va qanday skriptlar (\`start\`, \`build\`) borligi yoziladi.

### Asosiy Fayllar:
*   **\`src/index.js\`**: React dasturining yuragi. U \`App\` komponentini olib, brauzerdagi \`root\` div ga yopishtirib beradi.
*   **\`src/App.js\`**: Asosiy (Ota) komponent. Biz o'z kodlarimizni asosan shu yerdan yozishni boshlaymiz.

---

## 🧠 Chuqurlashtirilgan Nazariya: SPA vs MPA va Virtual DOM

React o'zining ishlash arxitekturasi va DOM bilan ishlash tezligi orqali veb-dasturlashda inqilob qildi. Keling, bu qanday ishlashini chuqurroq ko'rib chiqamiz.

### SPA (Single Page Application) vs MPA (Multi Page Application)

*   **MPA (Multi Page Application):** An'anaviy veb-saytlar arxitekturasi. Foydalanuvchi biror havolani bossa yoki shakl (form) to'ldirsa, brauzer serverga so'rov yuboradi va server butunlay yangi HTML sahifani qaytaradi. Bu jarayon tufayli sahifa har gal yangilanib, "miltillab" (refresh bo'lib) ochiladi.
*   **SPA (Single Page Application):** React ilovalari aynan SPA yondashuviga asoslanadi. Dastur birinchi marta ochilganda, server bitta \`index.html\` faylini va barcha kerakli JavaScript kodlarini yuboradi. Keyingi navigatsiya va o'zgarishlar faqat JavaScript orqali amalga oshiriladi, ya'ni brauzer sahifani umuman yangilamaydi. Faqat sahifaning kerakli qismlarigina (komponentlar) yangilanadi.

### Real DOM va Virtual DOM qanday ishlaydi?

Barcha veb-saytlar HTML elementlarini ko'rsatish uchun **DOM (Document Object Model)** dan foydalanadi. DOM brauzer tomonidan HTML teglarini daraxt (tree) shaklida saqlaydigan xotira tuzilmasidir.

*   **Real DOM muammosi:** Kichik bir o'zgarish (masalan, ro'yxatga yangi element qo'shish) yuz berganda ham, brauzer butun DOM daraxtini qayta hisoblab chiqadi va ekranni boshqatdan chizadi (Repaint & Reflow). Bu jarayon kompyuter resurslarini ko'p talab qiladi va ilovani sekinlashtiradi.
*   **Virtual DOM yechimi:** React xotirada Real DOM ning yengil kopyasini (Virtual DOM) ushlab turadi. Har qanday ma'lumot o'zgarganda quyidagi jarayonlar yuz beradi:

\`\`\`mermaid
graph TD
    A[State yoki Props o'zgardi] --> B[Yangi Virtual DOM yaratiladi]
    B --> C{Diffing Algoritmi}
    C -- Eski va Yangi Virtual DOMni solishtiradi --> D[Farqlar o'zgarishlar topiladi]
    D --> E[Reconciliation]
    E -- Faqat o'zgargan tugunlar yangilanadi --> F((Real DOM))
    F --> G[Foydalanuvchi interfeysi tezkor yangilanadi]
    
    style A fill:#e1f5fe,stroke:#03a9f4,stroke-width:2px
    style B fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style C fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    style D fill:#fce4ec,stroke:#e91e63,stroke-width:2px
    style E fill:#ede7f6,stroke:#9c27b0,stroke-width:2px
    style F fill:#ffebee,stroke:#f44336,stroke-width:2px
    style G fill:#e0f7fa,stroke:#00bcd4,stroke-width:2px
\`\`\`

**Diffing** — bu joriy (eski) Virtual DOM daraxtini yangi yaratilgan Virtual DOM bilan solishtirish va ulardagi farqlarni topish algoritmi.
**Reconciliation** — bu Diffing orqali topilgan farqlarni to'plab, haqiqiy brauzer DOMiga eng optimal (eng kam kuch sarflaydigan) yo'l bilan kiritish jarayoni.

Aynan mana shu mexanizm sababli React millionlab ma'lumotlarni sekundning yuzdan bir bo'lagida ekranda muammosiz aks ettira oladi!
`,
  code: `import React from "react";

// Bu bizning eng birinchi React komponentimiz
export default function App() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Salom, React! 👋</h1>
      <p>Bu mening birinchi React ilovam.</p>
      
      <div style={{ 
        marginTop: 30, 
        padding: 20, 
        border: '1px solid #ddd', 
        borderRadius: 8,
        background: '#f9f9f9'
      }}>
        <h2>Amaliyot qismi</h2>
        <p>Chap tarafdagi kod muharririda <strong>h1</strong> tegining ichidagi yozuvni o'zgartirib ko'ring.</p>
        <button style={{ padding: '10px 20px', background: '#61dafb', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>
          Tugmacha
        </button>
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "1. O'z ismingizni yozing",
      instruction: "Kod muharririda `App` komponentining ichidagi `h1` tegini toping va `Salom, React!` yozuvini `Salom, [O'z ismingiz]!` ga o'zgartiring.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Salom, React!</h1>\n    </div>\n  );\n}",
      hint: "<h1>Salom, Ali!</h1> ko'rinishida yozib ko'ring.",
      test: "if (code.includes('Salom, React!')) return 'Siz hali ham \"Salom, React!\" yozuvini qoldirgansiz. O\'z ismingizni yozing.'; return null;"
    },
    {
      id: 2,
      title: "2. Yangi xatboshi (paragraf) qo'shish",
      instruction: "Komponent ichiga `<p>` tegi orqali 'Bu mening birinchi vazifam' degan yozuvni qo'shing.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Asosiy sarlavha</h1>\n      {/* Shu yerga paragraf qo'shing */}\n    </div>\n  );\n}",
      hint: "<p>Bu mening birinchi vazifam</p> tegini qo'shing.",
      test: "if (!code.includes('<p>') || !code.includes('Bu mening birinchi vazifam')) return 'Paragraf (<p>) va to\'g\'ri matn qo\'shilganini tekshiring.'; return null;"
    },
    {
      id: 3,
      title: "3. Tugma yaratish",
      instruction: "`Bosing` degan yozuvga ega bo'lgan tugma (`<button>`) elementini yarating.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Tugma misoli</h1>\n      {/* Tugmani shu yerga qo'shing */}\n    </div>\n  );\n}",
      hint: "<button>Bosing</button> elementidan foydalaning.",
      test: "if (!code.includes('<button>') || !code.includes('Bosing')) return 'Tugma (<button>) va ichida \"Bosing\" yozuvi borligiga ishonch hosil qiling.'; return null;"
    },
    {
      id: 4,
      title: "4. Ro'yxat elementlari",
      instruction: "Sartaroshxona xizmatlari uchun ro'yxat (`<ul>` va ikkita `<li>`) yarating. `<li>` larning ichida 'Soch kesish' va 'Soqol olish' yozuvlari bo'lsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Xizmatlar</h1>\n      {/* Ro'yxatni shu yerga qo'shing */}\n    </div>\n  );\n}",
      hint: "<ul>\n  <li>Soch kesish</li>\n  <li>Soqol olish</li>\n</ul>",
      test: "if (!code.includes('<ul>') || !code.includes('<li>Soch kesish</li>') || !code.includes('<li>Soqol olish</li>')) return 'Ro\'yxat elementlarini to\'g\'ri shakllantirmadingiz.'; return null;"
    },
    {
      id: 5,
      title: "5. Rasm qo'shish",
      instruction: "`<img>` tegi yordamida rasm qo'shing. Rasm manbasi `src` uchun 'https://via.placeholder.com/150' ishlating. `alt` atributiga 'Namuna rasm' deb yozing.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Rasm qo'shish</h1>\n      {/* Rasmni shu yerga joylashtiring */}\n    </div>\n  );\n}",
      hint: "<img src='https://via.placeholder.com/150' alt='Namuna rasm' /> shaklida o'z-o'zini yopuvchi teg ishlating.",
      test: "if (!code.includes('<img') || !code.includes('src=') || !code.includes('https://via.placeholder.com/150') || !code.includes('alt=')) return 'Rasm manbasi (src) va alt atributi to\'g\'ri yozilganini tekshiring.'; return null;"
    },
    {
      id: 6,
      title: "6. Havola (Link) yaratish",
      instruction: "`<a>` tegi yordamida 'React rasmiy sayti' degan havola yarating. `href` atributiga 'https://react.dev' manzili ko'rsatilsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h2>Foydali havolalar</h2>\n      {/* Havolani shu yerga qo'shing */}\n    </div>\n  );\n}",
      hint: "<a href='https://react.dev'>React rasmiy sayti</a> ko'rinishida yozing.",
      test: "if (!code.includes('<a') || !code.includes('href=') || !code.includes('https://react.dev')) return 'Havola (<a>) tegi va href manzilini tekshiring.'; return null;"
    },
    {
      id: 7,
      title: "7. Qalin va qiya matnlar",
      instruction: "Matn ichidagi 'React' so'zini qalin (`<strong>`), 'ajoyib' so'zini esa qiya (`<em>`) qiling.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <p>React - bu ajoyib kutubxona.</p>\n    </div>\n  );\n}",
      hint: "<p><strong>React</strong> - bu <em>ajoyib</em> kutubxona.</p>",
      test: "if (!code.includes('<strong>React</strong>') || !code.includes('<em>ajoyib</em>')) return 'React so\'zini <strong> bilan, ajoyib so\'zini <em> bilan o\'rang.'; return null;"
    },
    {
      id: 8,
      title: "8. Ko'p qatorli matn",
      instruction: "Ikkita `<p>` (paragraf) tegini bitta `<div>` ota tegiga o'rab chiqaring. Birinchi paragrafda 'Birinchi qator', ikkinchisida 'Ikkinchi qator' deb yozilsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    // Kodingizni yozing\n  );\n}",
      hint: "return (<div><p>Birinchi qator</p><p>Ikkinchi qator</p></div>);",
      test: "if (!code.includes('<p>Birinchi qator</p>') || !code.includes('<p>Ikkinchi qator</p>')) return 'Ikkita paragraf yaratganingizga va yozuvlar to\'g\'riligiga ishonch hosil qiling.'; if ((code.match(/<div/g)||[]).length < 1) return 'Paragraflarni ota div ichiga olishingiz kerak.'; return null;"
    },
    {
      id: 9,
      title: "9. Bo'sh teg (Fragment) ishlatish",
      instruction: "Komponentda ikkita `<button>` bor, ammo ular ota tegsiz xato beradi. Ularni `<div>` o'rniga bo'sh teg (Fragment, ya'ni `<></>`) ichiga oling.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <button>Kirish</button>\n    <button>Ro'yxatdan o'tish</button>\n  );\n}",
      hint: "return (\n  <>\n    <button>Kirish</button>\n    <button>Ro'yxatdan o'tish</button>\n  </>\n);",
      test: "if (!code.includes('<>') || !code.includes('</>')) return 'Fragment (<></>) dan foydalanganingizga ishonch hosil qiling.'; return null;"
    },
    {
      id: 10,
      title: "10. H1 dan H3 gacha elementlar",
      instruction: "Sahifada H1 dan boshlab H3 gacha sarlavhalar yarating. Yozuvlari ketma-ket: 'Katta sarlavha', 'O\'rta sarlavha', 'Kichik sarlavha' bo'lsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      {/* Sarlavhalarni qo'shing */}\n    </div>\n  );\n}",
      hint: "<h1>Katta sarlavha</h1>, <h2>...</h2>",
      test: "if (!code.includes('<h1>Katta sarlavha</h1>') || !code.includes('<h2>O\'rta sarlavha</h2>') || !code.includes('<h3>Kichik sarlavha</h3>')) return 'H1, H2, H3 teglari va ularning matnlarini to\'g\'ri yozganingizni tekshiring.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React nima?",
      options: [
        "Foydalanuvchi interfeyslarini (UI) yaratish uchun JavaScript kutubxonasi",
        "Ma'lumotlar bazasini boshqarish tizimi",
        "Backend server yaratish uchun freymvork",
        "Faqat mobil ilovalar yaratadigan dastur"
      ],
      correctAnswer: 0,
      explanation: "React — bu foydalanuvchi interfeyslarini (UI) yaratish uchun Meta tomonidan ishlab chiqilgan mashhur JavaScript kutubxonasi hisoblanadi."
    },
    {
      question: "React dastlab qaysi kompaniya tomonidan ishlab chiqilgan?",
      options: [
        "Google",
        "Microsoft",
        "Meta (sobiq Facebook)",
        "Amazon"
      ],
      correctAnswer: 2,
      explanation: "React 2013-yilda Meta (Facebook) kompaniyasi tomonidan yaratilgan va ommaga taqdim etilgan."
    },
    {
      question: "SPA nima degani?",
      options: [
        "Simple Programming Application",
        "Single Page Application",
        "Server Page Architecture",
        "Standard Processing API"
      ],
      correctAnswer: 1,
      explanation: "SPA (Single Page Application) - bitta HTML sahifasidan iborat bo'lgan ilova degani. Sahifadan sahifaga o'tganda brauzer yangilanmaydi."
    },
    {
      question: "React ilovalarining 'SPA' deb atalishiga nima sabab bo'lgan?",
      options: [
        "Ular faqat bitta komponentdan iborat bo'ladi",
        "Brauzer sahifadan sahifaga o'tganda sahifani yangilamaydi, faqat kerakli qismini o'zgartiradi",
        "Unda faqat bitta CSS fayli bo'lishi shart",
        "Bu ilovalarni faqat bitta odam ishlata oladi"
      ],
      correctAnswer: 1,
      explanation: "SPA larda HTML sahifa faqat bir marta serverdan yuklab olinadi. Qolgan barcha navigatsiya va UI o'zgarishlarini JavaScript o'z zimmasiga oladi va sahifani umuman miltillatmasdan yangilaydi."
    },
    {
      question: "Virtual DOM qanday ishlaydi?",
      options: [
        "Bu haqiqiy brauzer DOM ini butunlay o'chirib tashlaydigan virus",
        "Bu xotiradagi yengil nusxa bo'lib, React o'zgarishlarni avval Virtual DOMda solishtirib, faqat farqni haqiqiy DOMga o'tkazadi",
        "Bu faqat Mac kompyuterlarida ishlaydigan xususiyat",
        "Bu serverda saqlanuvchi va har safar yangilanuvchi fayl"
      ],
      correctAnswer: 1,
      explanation: "Virtual DOM React ga aynan qaysi HTML tegi o'zgarganini topish va faqat o'sha tegni o'zgartirish orqali tezlikni oshirish imkonini beradi."
    },
    {
      question: "Reactda 'Diffing' jarayoni nimani anglatadi?",
      options: [
        "Kodni xatolardan tozalash",
        "Eski va yangi Virtual DOM larni solishtirib, o'zgargan qismini topish",
        "Ilovani serverga yuklash",
        "CSS uslublarini HTMLga ulash"
      ],
      correctAnswer: 1,
      explanation: "Diffing - bu qadimgi va yangi Virtual DOM daraxtini bir-biriga solishtirish va ulardagi farqlarni (o'zgarishlarni) topish algoritmiga aytiladi."
    },
    {
      question: "React o'z ishlashi uchun qanday dasturiy muhitni talab qiladi?",
      options: [
        "Python",
        "Java",
        "Node.js",
        "PHP"
      ],
      correctAnswer: 2,
      explanation: "React kutubxonalari va mahalliy serverni ishga tushirish uchun Node.js muhiti talab etiladi."
    },
    {
      question: "React loyihasini terminal orqali avtomatik yaratish uchun qaysi buyruqdan foydalaniladi?",
      options: [
        "npm install react",
        "node create-react",
        "npx create-react-app loyiha-nomi",
        "git clone react-app"
      ],
      correctAnswer: 2,
      explanation: "'npx create-react-app' - bu barcha kerakli sozlamalar, fayllar va papkalar bilan to'liq React loyihasini yaratib beradigan rasmiy vositadir."
    },
    {
      question: "React dasturining barcha kutubxonalari va kodlari yuklanadigan papka qanday nomlanadi?",
      options: [
        "src/",
        "public/",
        "build/",
        "node_modules/"
      ],
      correctAnswer: 3,
      explanation: "node_modules/ papkasi loyihamiz ishlashi uchun kerakli bo'lgan barcha tashqi paketlar va kutubxonalarni o'z ichiga oladi."
    },
    {
      question: "Loyihamizning ommaviy fayllari (masalan, index.html) qaysi papkada saqlanadi?",
      options: [
        "src/",
        "public/",
        "node_modules/",
        "assets/"
      ],
      correctAnswer: 1,
      explanation: "public/ papkasi to'g'ridan-to'g'ri brauzerga taqdim etiluvchi statik fayllar (index.html, favicon va hk) ni saqlaydi."
    },
    {
      question: "Biz o'z kodlarimizni (komponentlar, rasmlar, CSS) asosan qaysi papkada yozamiz?",
      options: [
        "src/",
        "public/",
        "node_modules/",
        "bin/"
      ],
      correctAnswer: 0,
      explanation: "src/ (source) papkasi React loyihamizning asosiy ish joyi bo'lib, biz barcha JS/JSX va CSS fayllarimizni shu yerda yaratamiz."
    },
    {
      question: "React loyiha pasporti (qanday kutubxonalar va skriptlar borligi) qaysi faylda saqlanadi?",
      options: [
        "index.html",
        "App.js",
        "package.json",
        "readme.md"
      ],
      correctAnswer: 2,
      explanation: "package.json fayli loyiha haqidagi barcha muhim ma'lumotlarni (nomi, versiyasi, skriptlari va o'rnatilgan kutubxonalar ro'yxati) o'zida saqlaydi."
    }
  ]
};

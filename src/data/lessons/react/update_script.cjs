const fs = require('fs');
const filePath = '/Users/farhod/Desktop/github/js-uz/src/data/lessons/react/step1_setup.js';
let content = fs.readFileSync(filePath, 'utf8');

const newCode = `  exercises: [
    {
      id: 1,
      title: "1. O'z ismingizni yozing",
      instruction: "Kod muharririda \`App\` komponentining ichidagi \`h1\` tegini toping va \`Salom, React!\` yozuvini \`Salom, [O'z ismingiz]!\` ga o'zgartiring.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Salom, React!</h1>\n    </div>\n  );\n}",
      hint: "<h1>Salom, Ali!</h1> ko'rinishida yozib ko'ring.",
      test: "if (code.includes('Salom, React!')) return 'Siz hali ham \"Salom, React!\" yozuvini qoldirgansiz. O\\'z ismingizni yozing.'; return null;"
    },
    {
      id: 2,
      title: "2. Yangi xatboshi (paragraf) qo'shish",
      instruction: "Komponent ichiga \`<p>\` tegi orqali 'Bu mening birinchi vazifam' degan yozuvni qo'shing.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Asosiy sarlavha</h1>\n      {/* Shu yerga paragraf qo'shing */}\n    </div>\n  );\n}",
      hint: "<p>Bu mening birinchi vazifam</p> tegini qo'shing.",
      test: "if (!code.includes('<p>') || !code.includes('Bu mening birinchi vazifam')) return 'Paragraf (<p>) va to\\'g\\'ri matn qo\\'shilganini tekshiring.'; return null;"
    },
    {
      id: 3,
      title: "3. Tugma yaratish",
      instruction: "\`Bosing\` degan yozuvga ega bo'lgan tugma (\`<button>\`) elementini yarating.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Tugma misoli</h1>\n      {/* Tugmani shu yerga qo'shing */}\n    </div>\n  );\n}",
      hint: "<button>Bosing</button> elementidan foydalaning.",
      test: "if (!code.includes('<button>') || !code.includes('Bosing')) return 'Tugma (<button>) va ichida \"Bosing\" yozuvi borligiga ishonch hosil qiling.'; return null;"
    },
    {
      id: 4,
      title: "4. Ro'yxat elementlari",
      instruction: "Sartaroshxona xizmatlari uchun ro'yxat (\`<ul>\` va ikkita \`<li>\`) yarating. \`<li>\` larning ichida 'Soch kesish' va 'Soqol olish' yozuvlari bo'lsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Xizmatlar</h1>\n      {/* Ro'yxatni shu yerga qo'shing */}\n    </div>\n  );\n}",
      hint: "<ul>\n  <li>Soch kesish</li>\n  <li>Soqol olish</li>\n</ul>",
      test: "if (!code.includes('<ul>') || !code.includes('<li>Soch kesish</li>') || !code.includes('<li>Soqol olish</li>')) return 'Ro\\'yxat elementlarini to\\'g\\'ri shakllantirmadingiz.'; return null;"
    },
    {
      id: 5,
      title: "5. Rasm qo'shish",
      instruction: "\`<img>\` tegi yordamida rasm qo'shing. Rasm manbasi \`src\` uchun 'https://via.placeholder.com/150' ishlating. \`alt\` atributiga 'Namuna rasm' deb yozing.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Rasm qo'shish</h1>\n      {/* Rasmni shu yerga joylashtiring */}\n    </div>\n  );\n}",
      hint: "<img src='https://via.placeholder.com/150' alt='Namuna rasm' /> shaklida o'z-o'zini yopuvchi teg ishlating.",
      test: "if (!code.includes('<img') || !code.includes('src=') || !code.includes('https://via.placeholder.com/150') || !code.includes('alt=')) return 'Rasm manbasi (src) va alt atributi to\\'g\\'ri yozilganini tekshiring.'; return null;"
    },
    {
      id: 6,
      title: "6. Havola (Link) yaratish",
      instruction: "\`<a>\` tegi yordamida 'React rasmiy sayti' degan havola yarating. \`href\` atributiga 'https://react.dev' manzili ko'rsatilsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h2>Foydali havolalar</h2>\n      {/* Havolani shu yerga qo'shing */}\n    </div>\n  );\n}",
      hint: "<a href='https://react.dev'>React rasmiy sayti</a> ko'rinishida yozing.",
      test: "if (!code.includes('<a') || !code.includes('href=') || !code.includes('https://react.dev')) return 'Havola (<a>) tegi va href manzilini tekshiring.'; return null;"
    },
    {
      id: 7,
      title: "7. Qalin va qiya matnlar",
      instruction: "Matn ichidagi 'React' so'zini qalin (\`<strong>\`), 'ajoyib' so'zini esa qiya (\`<em>\`) qiling.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <p>React - bu ajoyib kutubxona.</p>\n    </div>\n  );\n}",
      hint: "<p><strong>React</strong> - bu <em>ajoyib</em> kutubxona.</p>",
      test: "if (!code.includes('<strong>React</strong>') || !code.includes('<em>ajoyib</em>')) return 'React so\\'zini <strong> bilan, ajoyib so\\'zini <em> bilan o\\'rang.'; return null;"
    },
    {
      id: 8,
      title: "8. Ko'p qatorli matn",
      instruction: "Ikkita \`<p>\` (paragraf) tegini bitta \`<div>\` ota tegiga o'rab chiqaring. Birinchi paragrafda 'Birinchi qator', ikkinchisida 'Ikkinchi qator' deb yozilsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    // Kodingizni yozing\n  );\n}",
      hint: "return (<div><p>Birinchi qator</p><p>Ikkinchi qator</p></div>);",
      test: "if (!code.includes('<p>Birinchi qator</p>') || !code.includes('<p>Ikkinchi qator</p>')) return 'Ikkita paragraf yaratganingizga va yozuvlar to\\'g\\'riligiga ishonch hosil qiling.'; if ((code.match(/<div/g)||[]).length < 1) return 'Paragraflarni ota div ichiga olishingiz kerak.'; return null;"
    },
    {
      id: 9,
      title: "9. Bo'sh teg (Fragment) ishlatish",
      instruction: "Komponentda ikkita \`<button>\` bor, ammo ular ota tegsiz xato beradi. Ularni \`<div>\` o'rniga bo'sh teg (Fragment, ya'ni \`<></>\`) ichiga oling.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <button>Kirish</button>\n    <button>Ro'yxatdan o'tish</button>\n  );\n}",
      hint: "return (\n  <>\n    <button>Kirish</button>\n    <button>Ro'yxatdan o'tish</button>\n  </>\n);",
      test: "if (!code.includes('<>') || !code.includes('</>')) return 'Fragment (<></>) dan foydalanganingizga ishonch hosil qiling.'; return null;"
    },
    {
      id: 10,
      title: "10. H1 dan H3 gacha elementlar",
      instruction: "Sahifada H1 dan boshlab H3 gacha sarlavhalar yarating. Yozuvlari ketma-ket: 'Katta sarlavha', 'O\\'rta sarlavha', 'Kichik sarlavha' bo'lsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      {/* Sarlavhalarni qo'shing */}\n    </div>\n  );\n}",
      hint: "<h1>Katta sarlavha</h1>, <h2>...</h2>",
      test: "if (!code.includes('<h1>Katta sarlavha</h1>') || !code.includes('<h2>O\\'rta sarlavha</h2>') || !code.includes('<h3>Kichik sarlavha</h3>')) return 'H1, H2, H3 teglari va ularning matnlarini to\\'g\\'ri yozganingizni tekshiring.'; return null;"
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
`;

let index = content.indexOf('  exercises: [');
if (index !== -1) {
    let newContent = content.substring(0, index) + newCode;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Update successful');
} else {
    console.log('Failed to find exercises array');
}

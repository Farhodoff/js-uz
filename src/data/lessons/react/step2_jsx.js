export const step2_jsx = {
  title: "2-DARS: JSX Sintaksisi",
  content: `
# 1. 🧩 JSX nima o'zi?

**JSX (JavaScript XML)** — bu JavaScript ichida xuddi HTML kabi kod yozish imkonini beruvchi React'ning maxsus sintaksis kengaytmasidir. 

Odatda, interfeys yaratish uchun HTML, mantiq uchun JS, dizayn uchun CSS alohida fayllarda yozilar edi. React esa HTML va JS ni birlashtirib, bir joyda yozishni qulay ko'radi, chunki ular chambarchas bog'liqdir.

> **Muhim:** Brauzer JSX ni to'g'ridan-to'g'ri tushunmaydi! Uni brauzer o'qishi uchun kod \`Babel\` nomli transpayler orqali oddiy JavaScript ob'ektlariga aylantiriladi.

---

## 2. 📝 JSX yozish qoidalari

JSX ni yozishda HTML ga juda o'xshash, biroq bilishingiz shart bo'lgan bir necha muhim farqlar va cheklovlar bor:

### Qoida 1: Faqat bitta "Root" (ota) element qaytarishi shart!
Komponent return qilganda ichida yuzlab teglar bo'lishi mumkin, lekin ularning barchasi bitta ota teg (\`div\`, \`section\`, yoki Fragment) ichiga o'ralgan bo'lishi kerak.
❌ **XATO:**
\`\`\`jsx
return (
  <h1>Salom</h1>
  <p>Xush kelibsiz</p>
)
\`\`\`
✅ **TO'G'RI:**
\`\`\`jsx
return (
  <div>
    <h1>Salom</h1>
    <p>Xush kelibsiz</p>
  </div>
)
\`\`\`

Agar ortiqcha \`div\` qo'shishni xohlamasangiz, **Fragment** dan foydalaning: \`<></>\` yoki \`<React.Fragment>\`

### Qoida 2: Barcha teglar yopilishi shart
HTML da \`<img>\` yoki \`<br>\` ni yopmasdan tashlab ketish mumkin. JSX da esa har bir element albatta yopilishi shart: \`<img src="..." />\`, \`<br />\`, \`<input />\`.

### Qoida 3: CamelCase atributlar
JSX aslida JavaScript bo'lgani uchun unda JS ga xos so'zlarni atribut qilib yozib bo'lmaydi.
* \`class\` o'rniga 👉 **\`className\`** yoziladi (chunki class JS dagi zaxiralangan so'z).
* \`for\` o'rniga 👉 **\`htmlFor\`** yoziladi.
* \`onclick\` o'rniga 👉 **\`onClick\`** (kattaroq harfda).
* Inline stillar oddiy string emas, balki Obyekt shaklida yoziladi: \`style={{ color: "red", fontSize: 20 }}\`.

---

## 3. 🛠 JSX ichida JavaScript yozish (\`{ }\`)

Agar JSX teglari ichida o'zgaruvchining qiymatini ko'rsatmoqchi bo'lsangiz yoki JS amallarini (hisoblash, funksiya) ishlatmoqchi bo'lsangiz, uni jingalak qavslar **\`{ }\`** ichiga olishingiz kerak.

\`\`\`jsx
const ismim = "Farhod";
const yosh = 25;

return (
  <h1>Mening ismim {ismim}, men {yosh + 5} yoshda bo'laman.</h1>
);
\`\`\`

---

## 4. 🎭 Shartli render (Conditional Rendering)

Agar qandaydir shartga ko'ra ba'zi elementlarni ko'rsatib, ba'zilarini yashirmoqchi bo'lsak, if/else ni to'g'ridan-to'g'ri JSX ichida ishlata olmaymiz. Uning o'rniga quyidagilarni ishlatamiz:

*   **Ternary (Uchlik) operator (\`shart ? rost_bo'lsa : yolg'on_bo'lsa\`):**
    \`\`\`jsx
    {isOnline ? <span>Siz onlaynsiz</span> : <span>Siz oflaynsiz</span>}
    \`\`\`
*   **Mantiqiy AND (\`&&\`):** (Agar shart to'g'ri bo'lsa buni ko'rsat, noto'g'ri bo'lsa umuman hech nima ko'rsatma)
    \`\`\`jsx
    {hasNotification && <div className="alert">Sizda yangi xabar bor!</div>}
    \`\`\`

---

## 5. 🔁 Ro'yxatlarni chizish (\`map\`)

Massiv ichidagi ma'lumotlarni HTML elementlariga aylantirib chizish uchun odatdagi \`for\` tsikli o'rniga Array ning **\`map()\`** metodi ishlatiladi. *Eslatma: Har bir takrorlanuvchi elementga yagona \`key\` (kalit) berish shart!*

\`\`\`jsx
const mevalar = ['Olma', 'Banan', 'Nok'];

return (
  <ul>
    {mevalar.map((meva, index) => (
      <li key={index}>{meva}</li>
    ))}
  </ul>
);
\`\`\`
`,
  code: `import React from "react";

export default function App() {
  // 1. JavaScript o'zgaruvchilari
  const name = "Sardor";
  const age = 22;
  const isStudent = true;
  
  // Massiv
  const skills = ["JavaScript", "React", "Node.js"];

  return (
    // Qoida 1: Faqat bitta ota div (yoki Fragment) bo'lishi shart
    <div className="container" style={{ padding: 20, fontFamily: 'sans-serif' }}>
      
      {/* Qoida 3: JSX ichida JS ishlatish uchun { } qavslar */}
      <h1 style={{ color: '#2c3e50' }}>Foydalanuvchi: {name}</h1>
      <p>Yoshi: {age} da</p>
      
      {/* Shartli render (Ternary operator) */}
      <div style={{ padding: 10, background: isStudent ? '#d4edda' : '#f8d7da', borderRadius: 5 }}>
        Status: {isStudent ? "Talaba 🎓" : "Xodim 💼"}
      </div>

      <h3 style={{ marginTop: 20 }}>Texnologiyalar:</h3>
      
      {/* Massivni ro'yxat qilib chiqarish (map) */}
      <ul>
        {skills.map((skill, index) => (
          // Har doim yagona key berishni unutmang
          <li key={index} style={{ marginBottom: 5 }}>
            {skill}
          </li>
        ))}
      </ul>

      {/* Logical AND && */}
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

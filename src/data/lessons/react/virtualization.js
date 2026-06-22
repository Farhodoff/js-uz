export const virtualization = {
  id: "virtualization",
  title: "Windowing va Virtualization",
  content: `
# Virtualization (Oyna yaratish / Windowing)

Tasavvur qiling, siz Instagram yoki Telegram kabi ilova yaratyapsiz. U yerda o'n minglab yozishmalar yoki rasmlar ro'yxati mavjud. Agar siz bu ma'lumotlarni shunchaki \`map()\` orqali HTML ga (\`<li>\` yoki \`<div>\`) o'girib chiqsangiz nima bo'ladi?

Brauzer bir vaqtning o'zida o'n minglab DOM (HTML) elementlarini xotirasida saqlashi va chizishi kerak bo'ladi. Natijada **sahifa qotib qoladi (lag), telefon qiziydi, va xotira (RAM) to'lib ketadi.**

Bunday muammolarni hal qilishning yagona professional yo'li — **List Virtualization (Ro'yxatni virtuallashtirish)** deb ataladi.

## 1. Virtualization o'zi nima?

Virtualization (yoki Windowing) — bu faqatgina **foydalanuvchi hozir ko'rib turgan (ekranga sig'gan)** qismidagini DOM da chizish texnikasi. 

Masalan, sizda 10,000 ta ro'yxat bor. Lekin sizning ekraningizga bir vaqtning o'zida faqat 10 tasi sig'adi. Virtualization usulida brauzer xotirasida faqat o'sha ko'rinib turgan 10 ta element (va ehtimol past-tepadan 2-3 tadan zaxira) ushlab turiladi xolos. 
Siz pastga qarab skroll qilganingiz sari, tepadagi ko'rinmayotgan elementlar o'chiriladi va pastdagi yangilari ularning o'rniga dinamik ravishda chiziladi. Oqibatda DOM da hamisha 10-15 ta element yashaydi. Dastur shu qadar yengil ishlaydiki, xuddi unda atigi 15 ta ma'lumot bordek!

## 2. Mashhur kutubxonalar

React'da bu mantiqni qo'ldan (scratch) yozib chiqish juda mashaqqatli ish (scroll joylashuvini, element balandligini hisoblash kerak). Shuning uchun doim tayyor va sinalgan kutubxonalar ishlatiladi:

1. **\`react-window\`** (Eng mashhur, juda yengil)
2. **\`react-virtualized\`** (Bir oz eskirgan, juda katta imkoniyatlarga ega)
3. **\`@tanstack/react-virtual\`** (Hozirgi kunda eng trendda bo'lgan, zamonaviy va moslashuvchan vosita)

## 3. Qanday ishlatiladi? (\`react-window\` misolida)

Birinchi navbatda kutubxonani o'rnatib olish kerak (\`npm install react-window\`). 
So'ngra, oddiy \`<ul>\` va \`<li>\` larimizni uning maxsus komponentlariga almashtiramiz.

\`\`\`javascript
import React from 'react';
// FixedSizeList - balandligi o'zgarmas bo'lgan ro'yxatlar uchun
import { FixedSizeList as List } from 'react-window';

// Aytaylik, bizda minglab elementlar bor
const items = Array.from({ length: 10000 }).map((_, i) => \`Element #\${i}\`);

// Har bir qator (row) qanday ko'rinishini belgilaydigan funksiya
const Row = ({ index, style }) => (
  // "style" prop ni uzatish juda muhim, 
  // u elementning ro'yxatdagi mutlaq joylashuvini (absolute position) belgilaydi
  <div style={style}>
    {items[index]}
  </div>
);

export default function App() {
  return (
    <List
      height={400}      // Ro'yxat ochiq turadigan oynaning umumiy balandligi
      itemCount={10000} // Jami nechta element borligi
      itemSize={35}     // Har bir elementning alohida balandligi
      width={300}       // Oynaning kengligi
    >
      {Row}
    </List>
  );
}
\`\`\`

> **Muhim Qoida:** Ro'yxatdagi har bir element albatta kutubxona bergan \`style\` prop ni qabul qilishi shart! Agar uni bermasangiz, barcha elementlar ustma-ust tushib qoladi.

## 4. Virtualization qachon KERAK EMAS?

Virtualization zo'r bo'lgani bilan, uni hamma joyda ishlatavermang. 
- Agar ro'yxatingizda 50 ta yoki 100 ta oddiy element bo'lsa. (Brauzer 100 ta oddiy \`div\` ni qiynalmasdan ko'tara oladi).
- Elementlarning hajmi (balandligi) oldindan noma'lum bo'lib, ular tarkibidagi matn miqdoriga qarab turlicha o'zgarib ketsa. Bunday holatlar uchun \`DynamicSizeList\` lar bor, lekin ularni sozlash birmuncha qiyinroq.

Asosiy qoida: **Qachonki DOM da node'lar (HTML teglar) soni shunchalik ko'payib ketsaki, skroll qilganda qotish (lag) seza boshlasangiz, ana o'shanda Virtualization ishlatish vaqti kelgan bo'ladi.**
  `,
  code: `import React, { useState } from "react";
// Agar loyihada react-window bo'lsa import qilinadi.
// Hozirgi muhitda (kod blokida) kutubxonani to'liq emulyatsiya qila olmaymiz, 
// ammo u qanday yozilishini ko'rsatuvchi psevdo-kod keltiramiz:

// import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => {
  return (
    <div style={{ ...style, borderBottom: '1px solid #eee', padding: '10px' }}>
      🚀 Element #{index + 1}
    </div>
  );
};

export default function VirtualizedListDemo() {
  const [showVirtual, setShowVirtual] = useState(false);

  // 10,000 ta element!
  const itemCount = 10000; 

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>10,000 talik Ro'yxat (Virtualization namunasiga)</h2>
      <p>
        Sizda juda katta ma'lumotlar bor deb tasavvur qilamiz. 
        Agar biz ularni oddiy <b>map()</b> bilan chiqarsak, brauzer qotib qoladi.
      </p>

      <button onClick={() => setShowVirtual(!showVirtual)} style={{ marginBottom: "20px" }}>
        {showVirtual ? "Yopish" : "Virtual Ro'yxatni ko'rish"}
      </button>

      {showVirtual && (
        <div style={{ border: "2px solid blue", width: "300px", height: "400px", overflow: "auto" }}>
          {/* 
            Bu joyda odatda react-window ning <List> komponenti bo'ladi.
            Masalan:
            <List
              height={400}
              itemCount={itemCount}
              itemSize={45}
              width={300}
            >
              {Row}
            </List>
          */}
          
          <div style={{ padding: "20px", color: "gray" }}>
            (Kutubxona chaqirildi, xotirada faqat 10 ta ko'rinadigan element yashayapti...)
          </div>
        </div>
      )}
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "react-window parametrlarini berish",
      description: "Quyidagi \`<List>\` komponentiga kerakli bilimlarni o'tkazing. Uning umumiy balandligi 500px, kengligi 100%, jami 50000 ta element bor va har bir qator uzunligi 30px ga teng.",
      startingCode: `import React from 'react';\n// import { FixedSizeList as List } from 'react-window';\n\nconst Row = ({ index, style }) => <div style={style}>Qator {index}</div>;\n\nexport default function App() {\n  return (\n    {/* VAZIFA: Quyidagi List ga height, width, itemCount va itemSize bering */}\n    <List>\n      {Row}\n    </List>\n  );\n}`,
      solution: `import React from 'react';\n// import { FixedSizeList as List } from 'react-window';\n\nconst Row = ({ index, style }) => <div style={style}>Qator {index}</div>;\n\nexport default function App() {\n  return (\n    <List\n      height={500}\n      width="100%"\n      itemCount={50000}\n      itemSize={30}\n    >\n      {Row}\n    </List>\n  );\n}`,
      hint: "\`height={500} width=\"100%\" itemCount={50000} itemSize={30}\` deb atributlar qo'shing."
    },
    {
      id: 2,
      title: "Row ichida style ni ishlatish",
      description: "\`Row\` komponentiga \`index\` va \`style\` prop lari keladi. \`style\` ni albatta HTML elementga berish shart! Shu xatoni to'g'rilang.",
      startingCode: `import React from 'react';\n\n// VAZIFA: 'style' ni <div> ga bering!\nconst Row = ({ index, style }) => {\n  return (\n    <div>\n      Hozirgi index: {index}\n    </div>\n  );\n};\n\nexport default Row;`,
      solution: `import React from 'react';\n\nconst Row = ({ index, style }) => {\n  return (\n    <div style={style}>\n      Hozirgi index: {index}\n    </div>\n  );\n};\n\nexport default Row;`,
      hint: "\`<div style={style}>\` deb yozishingiz muhim. Busiz scroll ishlamaydi."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React da List Virtualization nima maqsadda ishlatiladi?",
      options: [
        "Ro'yxatlarni chiroyliroq qilish uchun",
        "Ma'lumotlarni serverga yuborishni osonlashtirish uchun",
        "DOM (HTML) xotirasini to'ldirib yubormaslik uchun, faqat foydalanuvchi ko'rib turgan elementlarnigina dinamik chizib ishlash tezligini keskin oshirish uchun",
        "List (Ro'yxat) larni qismlarga (code splitting) ajratish uchun"
      ],
      correctAnswer: 2,
      explanation: "O'n minglab elementlarni bittada HTML da chizish brauzerni osadi. Virtualization faqat ko'rinadigan qismni yaratadi va o'chiradi."
    },
    {
      id: 2,
      question: "react-window dagi Row (Qator) funksiyasiga uzatiladigan 'style' propining ahamiyati nimada?",
      options: [
        "U faqat rang berish uchun ishlatiladi",
        "Busiz elementlar mutlaq (absolute) joylashuvini yo'qotadi va barchasi bitta nuqtada ustma-ust tushib qoladi",
        "Siz istasangiz uni ishlatmasligingiz mumkin",
        "U hover effektini beradi"
      ],
      correctAnswer: 1,
      explanation: "Kutubxona har bir elementning yuqoridan (top) va pastdan masofasini hisoblab o'sha 'style' ichiga yuboradi. Agar uni HTML ga bermasangiz, scroll imkonsiz bo'lib qoladi."
    },
    {
      id: 3,
      question: "Qaysi holatda Virtualization ishlatmaslik (Oddiy map qilish) to'g'riroq?",
      options: [
        "Ro'yxatda atigi 50-100 ta oddiy matnli element bo'lganda",
        "Ro'yxatda 50,000 ta ob'ekt bo'lganda",
        "Elektron jadval (Excel kabi) yasayotganda",
        "Oksidlanish reaksiyasini simulyatsiya qilganda"
      ],
      correctAnswer: 0,
      explanation: "Agar ma'lumotlar kam bo'lsa (100 tagacha), brauzer ularni qiyinchiliksiz qabul qiladi. Ortiqcha kutubxonalar kodni bekorga murakkablashtiradi xolos."
    },
    {
      id: 4,
      question: "Dasturda 1 millionta element bor, Virtualization o'rnatilganidan so'ng DOM da taxminan qancha node (HTML qator) yaratiladi?",
      options: [
        "1 millionta",
        "0 ta",
        "Oyna o'lchamiga qarab faqat hozir ekranga sig'gan miqdordagi elementlar (masalan 10-20 ta)",
        "React buni o'zi hal qiladi"
      ],
      correctAnswer: 2,
      explanation: "Virtualizatsiyaning sehri shundaki, 1 millionta ma'lumotni ham bor-yo'g'i 10 ta div bilan 'almashtirib' (recycle qilib) aylantira oladi."
    }
  ]
};

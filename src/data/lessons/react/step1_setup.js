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
      title: "Salom, o'z ismingizni yozing!",
      instruction: "Kod muharririda `App` komponentining ichidagi `h1` tegini toping va `Salom, React!` yozuvini `Salom, [O'z ismingiz]!` ga o'zgartiring.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Salom, React!</h1>\n    </div>\n  );\n}",
      hint: "<h1>Salom, Ali!</h1> ko'rinishida o'zgartiring.",
      test: "if (code.includes('Salom, React!')) return 'Siz hali ham \"Salom, React!\" ni qoldirgansiz. O\\'z ismingizni yozing.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React ilovalarining 'SPA' (Single Page Application) deb atalishiga nima sabab bo'lgan?",
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
      question: "Virtual DOM nima va u qanday ishlaydi?",
      options: [
        "Bu haqiqiy brauzer DOM ini butunlay o'chirib tashlaydigan virus",
        "Bu xotiradagi yengil nusxa bo'lib, React o'zgarishlarni avval Virtual DOMda solishtirib, faqat farqni haqiqiy DOMga o'tkazadi",
        "Bu faqat Mac kompyuterlarida ishlaydigan xususiyat",
        "Bu fayllarni saqlaydigan xotira"
      ],
      correctAnswer: 1,
      explanation: "Virtual DOM React ga aynan qaysi HTML tegi o'zgarganini topish va faqat o'sha tegni o'zgartirish orqali tezlikni oshirish imkonini beradi."
    }
  ]
};

export const step1_setup = {
  title: "1-DARS: Tayyorgarlik va O'rnatish",
  content: `
# 1-qadam: React'ga Kirish va Loyihani Sozlash (Setup)

## 1. React Tarixi va Arxitekturasi

React - bu foydalanuvchi interfeyslarini (UI) yaratish uchun mo'ljallangan ochiq kodli JavaScript kutubxonasi. U dastlab Facebook (hozirgi Meta) muhandisi Jordan Walke tomonidan 2011 yilda yaratilgan.

**Tarixiy fon:**
2010-yillarning boshlarida Facebook kundan-kunga kattalashib, murakkablashib borayotgan edi. "Chat" va "Yangiliklar tasmasi" (News Feed) kabi qismlar bir-biriga bog'liq bo'lsa-da, ularning ma'lumotlarini sinxronlash (masalan, kimdir xabar yozganda chat ikonkasida bildirishnoma sonini to'g'ri ko'rsatish) an'anaviy JavaScript usullari bilan juda qiyinlashib ketdi. Kod bazasi "spagetti" ga aylanib, xatolar (buglar) ko'payib ketaverdi. 

Shu muammoni hal qilish uchun Jordan Walke React'ni yaratdi. React 2013-yilda ochiq kodli (open-source) qilib e'lon qilindi va tez orada butun dunyo dasturchilari orasida mashhur bo'lib ketdi.

**Arxitekturasi:**
React asosan **Komponentlarga asoslangan (Component-based)** arxitekturaga ega. 
Buni qanday tushunamiz? Katta va murakkab veb-saytni bitta butun narsa sifatida emas, balki kichik, mustaqil va qayta ishlatsa bo'ladigan lego qismlariga (komponentlarga) bo'lib chiqamiz. Masalan: Navbar komponenti, Sidebar komponenti, Footer komponenti va hokazo.

*Analogi:* Tasavvur qiling, siz avtomobil yig'yapsiz. Avtomobilni bitta yaxlit temir bo'lagidan quymaysiz. Uning g'ildiraklari, dvigateli, eshiklari alohida tayyorlanadi va oxirida yig'iladi. Agar bitta g'ildirak teshib qolsa, faqat o'sha g'ildirakni almashtirasiz, butun mashinani emas. React komponentlari ham xuddi shunday ishlaydi!

> **Nega kerak? (Nima uchun aynan React?)**
> Oddiy HTML/CSS/JS bilan ham sayt qilsa bo'ladi-ku? Ha, bo'ladi. Lekin sayt kattalashgani sari UI'ni boshqarish qiyinlashadi. React bizga ma'lumotlar o'zgarganda faqat kerakli qismni o'zini yangilash, kodni qayta ishlatish (reusability) va murakkab interfeyslarni oson boshqarish imkonini beradi.

---

## 2. SPA (Single Page Application) vs MPA (Multi Page Application)

Web dasturlash olamida ikkita asosiy yondashuv bor: MPA va SPA. React aynan SPA yaratish uchun ishlatiladi.

### MPA (Multi Page Application) - Ko'p Sahifali Ilovalar
Bu an'anaviy usul. Foydalanuvchi biror havolani (linkni) bossa, brauzer serverga so'rov yuboradi, server esa butunlay yangi HTML sahifani (tepadan pastgacha) qaytaradi. Brauzer oq rangga kirib, qaytadan sahifani yuklaydi.
*Analogi:* Har safar kitobning yangi sahifasini o'qish uchun kutubxonachining oldiga borib, eski sahifani topshirib, yangisini olib kelishingizga to'g'ri keladi. Qanchalik vaqt talab qilishini tasavvur qilyapsizmi?

### SPA (Single Page Application) - Yagona Sahifali Ilovalar
Bu zamonaviy usul (React shunday ishlaydi). Foydalanuvchi saytga kirganda, faqat bitta HTML sahifa (\`index.html\`) yuklanadi. Keyin sahifa ichidagi ma'lumotlar foydalanuvchi harakatiga qarab JavaScript orqali orqa fonda (serverdan faqat kerakli ma'lumot, masalan JSON ko'rinishida olinib) almashtirib qo'yiladi. Sahifa umuman "perezagruzka" (reload) bo'lmaydi.
*Analogi:* Sizga bitta sehrli doska berishgan. Siz u yerdan qimirlamaysiz, shunchaki tugmani bossangiz, doskadagi yozuvlarning faqat kerakli qismi o'zgarib qoladi. Doska hamisha sizning oldingizda turadi.

\`\`\`mermaid
graph TD
    subgraph MPA[Multi Page Application]
        direction LR
        M_User((Foydalanuvchi)) -->|1. Bosadi: Haqimizda| M_Browser[Brauzer]
        M_Browser -->|2. /about so'rovi| M_Server[(Server)]
        M_Server -->|3. YANGI about.html| M_Browser
        M_Browser -->|4. Butun sahifa qayta chiziladi| M_User
    end

    subgraph SPA[Single Page Application - React]
        direction LR
        S_User((Foydalanuvchi)) -->|1. Bosadi: Haqimizda| S_React[React Router]
        S_React -->|2. Hech qanday HTML so'ralmaydi| S_API[Faqat JSON ma'lumot olinadi]
        S_API -->|3. DOM'ning faqat kerakli qismi o'zgaradi| S_User
    end
\`\`\`

---

## 3. Virtual DOM vs Real DOM (Nega React tez?)

Browser o'zida tushunadigan asosiy obyekt bu DOM (Document Object Model) - HTML hujjatining daraxt ko'rinishidagi tuzilishi.

**Real DOM muammosi:**
Deylik, sizning 5000 ta qatorli jadvalingiz bor. Agar 1 ta katakning rangi o'zgarsa, qadimgi usulda butun jadvalni qayta chizish yoki DOM bo'ylab uzoq qidirish kerak bo'lardi. DOM elementlarini har gal o'zgartirish brauzer uchun eng sekin va "qimmat" (ko'p resurs yeydigan) jarayon hisoblanadi.

**React qanday yechim topgan? (Virtual DOM):**
React "Virtual DOM" (VDOM) tushunchasini olib kirdi. Virtual DOM - bu Real DOM'ning shunchaki xotiradagi nusxasi (yengil vaznli JavaScript obyekti).

**Jarayon qanday kechadi (Reconciliation jarayoni)?**
1. Ma'lumot (State) o'zgardi.
2. React darhol yangi VDOM yaratadi (xotirada bu juda tez amalga oshadi).
3. Yangi VDOM ni eski VDOM bilan solishtiradi. Bu jarayon **Diffing** deb ataladi.
4. Faqat o'zgargan joylarni topadi.
5. So'ngra, topilgan qismlarnigina paketlab turib, Real DOM'ga jo'natadi va faqat o'sha o'zgargan nuqtani Real DOM'da yangilaydi (Bu jarayon Patching / **Reconciliation** deb ataladi).

\`\`\`mermaid
flowchart TD
    State[State o'zgardi] --> VDOM_New[Yangi Virtual DOM yaratiladi]
    VDOM_New --> Diff[Diffing: Yangi VDOM va Eski VDOM solishtiriladi]
    Diff -->|Faqat O'zgargan qism| Patch[Patching: Real DOM'da faqat farqli tugun yangilanadi]
    Patch --> View[Foydalanuvchiga yangi ko'rinish]

    style State fill:#f9f,stroke:#333,stroke-width:2px
    style View fill:#bbf,stroke:#333,stroke-width:2px
\`\`\`

*Analogi:* Siz uyning chizmasini (VDOM) tayyorladingiz. Keyin xotiningiz oshxonaga bitta deraza qo'shmoqchi bo'ldi. Siz eshikni, tomni, boshqa xonalarni buzmaysiz. Shunchaki chizmaga o'zgartirish kiritasiz va usta (React) kelib faqat o'sha devorni teshib deraza o'rnatadi. Butun uyni qaytadan qurish (Real DOM perezagruzkasi) shart emas!

---

## 4. O'rnatish Vositalari (Setup tools): Node, npm, CRA vs Vite

React loyihasini noldan barcha fayllarni ulab chiqib qilish juda mashaqqatli. Shuning uchun tayyor o'rnatish vositalari ishlatiladi. Lekin undan oldin kompyuterimizda muhit bo'lishi kerak.

**Node.js va npm:**
- **Node.js:** JavaScript'ni faqat brauzerda emas, balki kompyuterda (serverda) ham ishlashiga imkon beruvchi muhit (runtime). React loyihalarini kompyuterimizda run qilish uchun Node.js kerak.
- **npm (Node Package Manager):** Bu JavaScript kutubxonalari do'koni. Loyihamizga kimgadir tegishli bo'lgan tayyor kodni (paketni) olib kirish uchun ishlatamiz. Buni xuddi telefoningizdagi "App Store" yoki "Play Market" deb tushunishingiz mumkin.

**Create React App (CRA) vs Vite:**

Bir necha yil oldin barcha React loyihalari \`npx create-react-app my-app\` komandasi orqali yaratilardi. Bu Facebook tomonidan qilingan rasmiy "tayyor shablon" edi.

Node.js va npm:
- Node.js: JavaScript'ni faqat brauzerda emas, balki kompyuterda (serverda) ham ishlashiga imkon beruvchi muhit.
- npm (Node Package Manager): JavaScript kutubxonalari do'koni.

> **Nima uchun CRA'dan Vite'ga o'tilmoqda?**
> - **Sekinlik:** CRA loyihani ishga tushirish (dev serverni yoqish) va kodni o'zgartirganda ekranda ko'rinishi uchun barcha fayllarni bitta qilib yig'ardi (bundler - Webpack). Loyiha kattalashgani sari loyihani yoqishga 30 soniyadan bir necha daqiqagacha vaqt ketib qolardi.
> - **Vite (fransuzcha "tez" degani):** Vite bundler emas, u ES Module yordamida ishlaydi. Ya'ni u butun kodni emas, faqat siz o'zgartirgan faylnigina brauzerga uzatadi. Natijada loyiha kattaligidan qat'iy nazar server 1 soniyaga qolmasdan yonadi. O'zgartirishlar ham millisoniyalarda ekranda paydo bo'ladi (Hot Module Replacement - HMR).

> 💡 **"Install Everything, Configure Forever" haqiqati:**
> React'ni endi o'rganayotganlar ko'pincha "React bu hamma narsani hal qiluvchi freymvork" deb o'ylashadi. Aslida esa React — faqatgina UI chizish uchun kichik bir kutubxona. Sahifalarni ulash uchun (React Router), holatni boshqarish uchun (Redux/Zustand), API ga so'rov yuborish uchun (Axios/React Query) alohida kutubxonalar o'rnatishingiz va ularni bir-biriga moslashtirishingiz kerak bo'ladi. Boshida bu biroz charchatuvchi (Install fatigue) bo'lishi mumkin. Lekin xavotir olmang, asoslarni yaxshi o'zlashtirganingizdan so'ng, **Next.js** kabi to'laqonli freymvorklarga o'tasiz, unda bularning bari tayyor qilib o'rnatilgan bo'ladi!

## ✅ Do's and ❌ Don'ts

❌ *Don't (Qilmang):* Hozirgi kunda yangi loyihalarni \`create-react-app\` orqali yaratmang. U ancha sekin va eskirgan.
\`\`\`bash
npx create-react-app eski-loyiha
\`\`\`

✅ *Do (Qiling):* Vite dan foydalaning.
\`\`\`bash
# Vite orqali yangi React loyiha yaratish komandasi:
npm create vite@latest my-react-app -- --template react
\`\`\`

---

## 5. Loyiha Papkalar Strukturasi (Deep Dive into Folder Structure)

Vite orqali loyiha yaratib, uni VS Code kabi muharrirda ochsangiz quyidagi papka va fayllarni ko'rasiz. Keling, har birining vazifasini chuqur tushunib olamiz:

\`\`\`text
my-react-app/
├── node_modules/       # (Tegib bo'lmaydigan hudud!)
├── public/             # (Ommaviy statik fayllar)
│   └── vite.svg        
├── src/                # (Sizning ijod maydoningiz - asosan shu yerda ishlaysiz)
│   ├── assets/         # Rasm, fontlar uchun
│   ├── App.css         # App komponentining stillari
│   ├── App.jsx         # BOSH KOMPONENT!
│   ├── index.css       # Global stillar
│   └── main.jsx        # Dasturning kirish nuqtasi (Entry point)
├── .gitignore          # Git ga kirmasligi kerak bo'lgan fayllar ro'yxati
├── index.html          # O'sha yagona HTML sahifa (SPA ning asosi)
├── package-lock.json   # Paketlarning aniq versiyalarini qulflash
├── package.json        # Loyihamiz pasporti (qanday paketlar bor, qanday ishga tushadi)
└── vite.config.js      # Vite uchun sozlamalar
\`\`\`

**Batafsil tushuntirish:**

1. \`node_modules/\`:
Bu yerda \`npm\` orqali yuklab olingan barcha kutubxonalar va ularning qaramliklari (dependencies) joylashadi.
*Qoida:* Bu papkaga hech qachon kirmang va undagi hech narsani o'zgartirmang. Agar xato qilib o'chirib yuborsangiz, terminalda \`npm install\` yozsangiz, o'zi qaytadan yaratib oladi. Github'ga ham bu papka yuklanmaydi.

2. \`public/\`:
Bu papkaga tashlangan fayllar Vite tomonidan hech qanday o'zgarishsiz, to'g'ridan-to'g'ri brauzerga uzatiladi. Masalan, saytning Favicon'i (tepada brauzer tab'ida turadigan mitti rasm) yoki SEO uchun kerakli \`robots.txt\` kabi fayllar shu yerda turadi.

3. \`src/\` (Source - Manba):
Sizning barcha kodingiz, komponentlaringiz, mantiqlar shu papka ichida yoziladi.
- \`main.jsx\`: Bu React dasturining **Kirish nuqtasi**. U \`index.html\` dagi \`<div id="root"></div>\` ni topib, bizning butun React kodimizni (VDOM ni) o'sha devorga yopishtiradi.
- \`App.jsx\`: Bu eng katta, ona (Root) komponent. Qolgan barcha kichik komponentlar shu fayl ichiga yig'iladi.

4. \`index.html\`:
Bizning sahifamizning "skeleti". E'tibor bersangiz ichida deyarli hech narsa yo'q, faqat bitta \`<div id="root"></div>\` bor. Bizning butun React dasturimiz sehrgarlik kabi shu bitta \`div\` ichiga chiziladi.

5. \`package.json\`:
Loyiha "pasporti". Loyiha nomi, versiyasi va eng muhimi - loyiha ishlashi uchun qanday tashqi paketlar kerakligi ro'yxati yozilgan fayl. 

> **Nega kerak?**
> Tasavvur qiling do'stingizga loyihangizni bermoqchisiz. Siz unga butun \`node_modules\` papkasini bermaysiz (u juda og'ir, ba'zan 500mb dan oshadi). Siz faqat o'z kodingiz va \`package.json\` ni berasiz. Do'stingiz loyihani ochib \`npm install\` ni bossa, npm u yerda yozilgan "retsept" (paketlar ro'yxati) asosida hamma narsani internetdan qayta yuklab oladi.

*Xulosa:* Endi biz React qanday paydo bo'lgani, u muammolarni qanday hal qilishi (VDOM va SPA orqali), hamda yangi loyihani o'rnatish va uni strukturasini chuqur o'zlashtirib oldik. Keyingi darsda shu komponentlarning ichiga kirib, JSX sintaksisini va komponentlar qanday tuzilishini o'rganamiz!

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

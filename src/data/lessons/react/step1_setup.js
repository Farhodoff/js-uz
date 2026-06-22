export const step1_setup = {
  id: "step1_setup",
  title: "1-DARS: React ga Kirish va Loyihani Sozlash",
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

Ammo hozirgi kunda CRA eskirib qoldi. O'rniga **Vite** keng qo'llanilmoqda.

> **Nima uchun CRA'dan Vite'ga o'tilmoqda?**
> - **Sekinlik:** CRA loyihani ishga tushirish (dev serverni yoqish) va kodni o'zgartirganda ekranda ko'rinishi uchun barcha fayllarni bitta qilib yig'ardi (bundler - Webpack). Loyiha kattalashgani sari loyihani yoqishga 30 soniyadan bir necha daqiqagacha vaqt ketib qolardi.
> - **Vite (fransuzcha "tez" degani):** Vite bundler emas, u ES Module yordamida ishlaydi. Ya'ni u butun kodni emas, faqat siz o'zgartirgan faylnigina brauzerga uzatadi. Natijada loyiha kattaligidan qat'iy nazar server 1 soniyaga qolmasdan yonadi. O'zgartirishlar ham millisoniyalarda ekranda paydo bo'ladi (Hot Module Replacement - HMR).

**Do's and Don'ts:**

❌ *Don't (Qilmang):* Yangi loyiha boshlayotganda \`create-react-app\` dan foydalanmang. (Hatto React rasmiy hujjatlari ham buni endi tavsiya etmayapti).
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
  code: `// src/App.jsx — Birinchi React komponentingiz
import React from 'react'

// App — bu bizning asosiy komponentimiz
// Funksiya nomi katta harf bilan boshlanishi SHART!
function App() {
  // JSX qaytaramiz (HTML ga o'xshash JavaScript sintaksisi)
  return (
    <div>
      <h1>Salom, React! 👋</h1>
      <p>Bu mening birinchi React ilovam</p>
    </div>
  )
}

// Boshqa fayllar bu komponentni import qilishi uchun
export default App`,
  exercises: [
    {
      id: 1,
      title: "Birinchi Komponent",
      instruction: "App funksiyasini o'zgartiring: u h1 da ismingizni va p da sevimli tilni ko'rsatsin.",
      startingCode: "function App() {\n  return (\n    <div>\n      <h1>Salom Dunyo</h1>\n    </div>\n  )\n}\n\nexport default App",
      hint: "return ichida h1 va p teglarini yozing. Barcha teglar bitta ota elementga o'ralgan bo'lishi kerak.",
      solution: "function App() {\n  return (\n    <div>\n      <h1>Salom, men Abdulloh!</h1>\n      <p>Sevimli tilim: JavaScript</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<h1>') || !code.includes('<p>')) return 'h1 va p teglarini qo\'shing'; return null;"
    },
    {
      id: 2,
      title: "Ro'yxat ko'rsatish",
      instruction: "ul va li teglari yordamida 3 ta sevimli ovqat nomini ro'yxat qilib ko'rsating.",
      startingCode: "function App() {\n  return (\n    <div>\n      {/* Bu yerga kod yozing */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "<ul> ichiga uchta <li> qo'shing",
      solution: "function App() {\n  return (\n    <div>\n      <h2>Sevimli ovqatlarim:</h2>\n      <ul>\n        <li>Osh</li>\n        <li>Manti</li>\n        <li>Somsa</li>\n      </ul>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<ul>') || !code.includes('<li>')) return 'ul va li teglarini qo\'shing'; return null;"
    },
    {
      id: 3,
      title: "className ishlatish",
      instruction: "div ga className='card', h2 ga className='title' bering. React da class o'rniga className ishlatiladi!",
      startingCode: "function App() {\n  return (\n    <div>\n      <h2>Sarlavha</h2>\n      <p>Matn</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "HTML dagi class=\"...\" o'rniga JSX da className=\"...\" yoziladi.",
      solution: "function App() {\n  return (\n    <div className='card'>\n      <h2 className='title'>Sarlavha</h2>\n      <p>Matn</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('className')) return 'className ishlatishni unutmang!'; return null;"
    },
    {
      id: 4,
      title: "Fragment ishlatish",
      instruction: "Qo'shimcha div o'rniga React Fragment (<>...</>) ishlatib, h1 va p ni qaytaring.",
      startingCode: "function App() {\n  return (\n    <div>\n      <h1>Sarlavha</h1>\n      <p>Matn</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "<div> ni <> va </> bilan almashtiring.",
      solution: "function App() {\n  return (\n    <>\n      <h1>Sarlavha</h1>\n      <p>Matn</p>\n    </>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<>') || !code.includes('</>')) return 'Fragment <> </> ishlatishni unutmang!'; return null;"
    },
    {
      id: 5,
      title: "Self-closing tegler",
      instruction: "img va input teglarini to'g'ri self-closing formatda yozing: <img /> va <input />",
      startingCode: "function App() {\n  return (\n    <div>\n      {/* img va input bu yerga */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "JSX da <img src='...' alt='...' /> va <input type='text' /> shaklida yozing.",
      solution: "function App() {\n  return (\n    <div>\n      <img src='https://via.placeholder.com/150' alt='Rasm' />\n      <input type='text' placeholder='Matn kiriting' />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('<img') || !code.includes('<input')) return 'img va input teglarini qo\'shing'; if (!code.includes('/>')) return 'Self-closing formatda yozing: <img /> <input />'; return null;"
    },
    {
      id: 6,
      title: "Inline stil",
      instruction: "p tegiga inline stil bering: matn rangi qizil, font hajmi 24px. style={{color: 'red', fontSize: '24px'}}",
      startingCode: "function App() {\n  return (\n    <div>\n      <p>Bu matn stillanishi kerak</p>\n    </div>\n  )\n}\n\nexport default App",
      hint: "style={} ichiga JS obyekt yozing: {{color: 'red', fontSize: '24px'}}",
      solution: "function App() {\n  return (\n    <div>\n      <p style={{color: 'red', fontSize: '24px'}}>Bu matn stillanishi kerak</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('style={{')) return 'style={{...}} formatida yozing'; return null;"
    },
    {
      id: 7,
      title: "O'zgaruvchi ko'rsatish",
      instruction: "const ism = 'Kamola' va const yosh = 25 yarating va ularni JSX da {ism} va {yosh} orqali ko'rsating.",
      startingCode: "function App() {\n  // O'zgaruvchilarni bu yerda yarating\n  \n  return (\n    <div>\n      {/* O'zgaruvchilarni bu yerda ko'rsating */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "return dan OLDIN: const ism = 'Kamola'. Keyin JSX da {ism} deb ko'rsating.",
      solution: "function App() {\n  const ism = 'Kamola'\n  const yosh = 25\n\n  return (\n    <div>\n      <p>Ism: {ism}</p>\n      <p>Yosh: {yosh}</p>\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('{ism}') && !code.includes('{ ism }')) return 'ism o\'zgaruvchisini {} ichida ko\'rsating'; return null;"
    },
    {
      id: 8,
      title: "Shartli ko'rsatish",
      instruction: "const kirganmi = true yarating. Ternary operator: {kirganmi ? <p>Xush kelibsiz!</p> : <p>Iltimos kiring</p>}",
      startingCode: "function App() {\n  const kirganmi = true\n  \n  return (\n    <div>\n      {/* Shartli ko'rsatish bu yerda */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "{ kirganmi ? <p>Xush kelibsiz!</p> : <p>Iltimos kiring</p> }",
      solution: "function App() {\n  const kirganmi = true\n  \n  return (\n    <div>\n      {kirganmi ? <p>Xush kelibsiz!</p> : <p>Iltimos kiring</p>}\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('?') || !code.includes(':')) return 'Ternary operator ? : ishlatishni unutmang'; return null;"
    },
    {
      id: 9,
      title: "Komponentni chaqirish",
      instruction: "Salom nomli komponent yarating (p qaytarsin). App da <Salom /> ni chaqiring.",
      startingCode: "// Salom komponentini bu yerda yarating\n\n\nfunction App() {\n  return (\n    <div>\n      {/* Salom komponentini bu yerga qo'shing */}\n    </div>\n  )\n}\n\nexport default App",
      hint: "function Salom() { return <p>Salom Dunyo!</p> }. Keyin App ichida: <Salom />",
      solution: "function Salom() {\n  return <p>Salom Dunyo!</p>\n}\n\nfunction App() {\n  return (\n    <div>\n      <Salom />\n    </div>\n  )\n}\n\nexport default App",
      test: "if (!code.includes('function Salom') && !code.includes('const Salom')) return 'Salom komponentini yarating'; if (!code.includes('<Salom')) return 'App ichida <Salom /> ni chaqiring'; return null;"
    },
    {
      id: 10,
      title: "npm skriptlarini bilish",
      instruction: "const ishgaTushirish = 'npm run dev' o'zgaruvchisini yarating va uni p tegida ko'rsating.",
      startingCode: "// Vite loyihasini ishga tushirish uchun:\n// const ishgaTushirish = ???\n\nexport default function App() {\n  return <p>Buyruq shu yerda ko'rinsin</p>\n}",
      hint: "Vite da ishga tushirish buyrug'i: npm run dev",
      solution: "const ishgaTushirish = 'npm run dev'\n\nexport default function App() {\n  return <p>{ishgaTushirish}</p>\n}",
      test: "if (!code.includes('npm run dev')) return 'npm run dev ni yozing'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React qaysi yilda va qaysi kompaniya tomonidan ochiq manbaga chiqarildi?",
      options: ["2010, Google", "2013, Facebook (Meta)", "2015, Microsoft", "2011, Twitter"],
      correctAnswer: 1,
      explanation: "React 2013-yilda Facebook (hozirgi Meta) tomonidan ochiq manbaga chiqarildi. Uni Jordan Walke yaratgan."
    },
    {
      question: "Virtual DOM nima?",
      options: [
        "Brauzerning maxsus DOM turi",
        "Real DOM ning xotiradagi engil JavaScript obyekt nusxasi",
        "Serverda saqlanadigan HTML nusxasi",
        "CSS ni boshqarish tuzilmasi"
      ],
      correctAnswer: 1,
      explanation: "Virtual DOM — React tomonidan xotirada saqlanadigan Real DOM ning engil JavaScript obyekt nusxasi. U Real DOM ni to'g'ridan-to'g'ri manipulatsiya qilmasdan, avval o'zida o'zgartirish qiladi."
    },
    {
      question: "React Reconciliation jarayonida nima sodir bo'ladi?",
      options: [
        "Butun sahifa qayta yuklanadi",
        "Faqat o'zgargan qismlar Real DOM ga yoziladi",
        "Server yangi HTML yuboradi",
        "CSS fayllar qayta o'qiladi"
      ],
      correctAnswer: 1,
      explanation: "Reconciliation — React ning Virtual DOM dagi farqlarni aniqlash va faqat o'zgargan qismlarni Real DOM ga yozish jarayoni."
    },
    {
      question: "SPA ning asosiy afzalligi nima?",
      options: [
        "SEO uchun juda qulay",
        "Har sahifada yangi HTML yuklanadi",
        "Navigatsiya tez, oq ekran ko'rinmaydi",
        "Server har safar yangi HTML yuboradi"
      ],
      correctAnswer: 2,
      explanation: "SPA da faqat bir marta HTML yuklanadi. Keyingi navigatsiyalarda JavaScript faqat JSON oladi, React DOM ni yangilaydi — tez va silliq."
    },
    {
      question: "Yangi React loyiha yaratishda qaysi vosita hozir tavsiya etiladi?",
      options: ["Create React App (CRA)", "jQuery", "Vite", "Webpack CLI"],
      correctAnswer: 2,
      explanation: "Vite — zamonaviy, tez va faol rivojlanayotgan build vositasi. CRA endi qo'llab-quvvatlanmayapti va sekin."
    },
    {
      question: "node_modules/ papkasi nima uchun kerak?",
      options: [
        "Bizning asosiy kodlarimiz shu yerda",
        "O'rnatilgan kutubxonalar shu yerda saqlanadi",
        "Produksiya build fayllari shu yerda",
        "HTML va CSS fayllar shu yerda"
      ],
      correctAnswer: 1,
      explanation: "node_modules/ da npm orqali o'rnatilgan barcha kutubxonalar saqlanadi. Bu papkani gitga yuklamaslik kerak — .gitignore ga qo'shiladi."
    },
    {
      question: "React loyihasining 'kirish nuqtasi' (entry point) qaysi fayl?",
      options: ["App.jsx", "index.html", "src/main.jsx", "package.json"],
      correctAnswer: 2,
      explanation: "src/main.jsx — React ilovasining kirish nuqtasi. U ReactDOM.createRoot() bilan 'root' div ni topadi va App komponentini render qiladi."
    },
    {
      question: "package.json da 'dev' skriptini qanday ishga tushirish mumkin?",
      options: ["vite dev", "node vite", "npm run dev", "npx dev"],
      correctAnswer: 2,
      explanation: "npm run <skript_nomi> buyrug'i package.json dagi scripts bo'limidagi buyruqni ishga tushiradi."
    },
    {
      question: "React da CSS class qo'shish uchun qaysi atributdan foydalaniladi?",
      options: ["class", "cssClass", "className", "classList"],
      correctAnswer: 2,
      explanation: "JSX da class o'rniga className ishlatiladi, chunki class JavaScript da reserved keyword (zahiralangan so'z)."
    },
    {
      question: "Vite ishga tushirganda qaysi URL da ko'rish mumkin?",
      options: ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173", "http://localhost:4200"],
      correctAnswer: 2,
      explanation: "Vite default port sifatida 5173 ni ishlatadi. CRA esa 3000 portidan foydalanadi."
    },
    {
      question: "MPA da foydalanuvchi havolani bosganida nima sodir bo'ladi?",
      options: [
        "JavaScript DOM ni yangilaydi",
        "React Virtual DOM ni o'zgartiradi",
        "Brauzer serverdan yangi HTML sahifasini yuklab, qayta ko'rsatadi",
        "Faqat zarur JSON ma'lumot olinadi"
      ],
      correctAnswer: 2,
      explanation: "MPA da har bir navigatsiyada server yangi HTML sahifasini yuboradi va brauzer qaytadan yuklaydi — sekin va 'oq ekran' ko'rinadi."
    },
    {
      question: "React da export default App nima uchun yoziladi?",
      options: [
        "App ni serverga yuborish uchun",
        "App komponentini boshqa fayllar import qilishi uchun",
        "App ni HTML ga ulash uchun",
        "CSS stillarni qo'llash uchun"
      ],
      correctAnswer: 1,
      explanation: "export default App — boshqa fayllarda import App from './App' deb import qilib ishlatish imkonini beradi."
    },
    {
      question: "React.StrictMode nima uchun ishlatiladi?",
      options: [
        "Ilovani produksiyaga tayyorlash uchun",
        "CSS stillarni qo'llash uchun",
        "Rivojlanish vaqtida potensial muammolarni aniqlash uchun",
        "Virtual DOM ni o'chirish uchun"
      ],
      correctAnswer: 2,
      explanation: "React.StrictMode rivojlanish vaqtida qo'shimcha tekshiruvlar o'tkazadi: deprecated API lar, kutilmagan yon effektlar. Produksiyada hech qanday ta'siri yo'q."
    }
  ]
};

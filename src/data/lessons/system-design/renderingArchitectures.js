export const renderingArchitectures = {
  id: "renderingArchitectures",
  title: "Veb Rendering Arxitekturalari (CSR, SSR, SSG, Hydration)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Veb-ilovalar dastlab yuklanganda sahifani foydalanuvchiga qanday ko'rsatish va uning tarkibini qayerda shakllantirish (render qilish) veb-sahifa yuklanish tezligi, foydalanuvchi tajribasi (UX) va qidiruv tizimi optimallashtirilishiga (SEO) bevosita ta'sir qiladi.
Agar biz noto'g'ri render qilish usulini tanlasak, saytimiz Google qidiruv natijalarida ko'rinmay qolishi (SEO muammosi) yoki foydalanuvchilar oq sahifani uzoq vaqt kutib turishi mumkin. Shuning uchun zamonaviy dasturchi **CSR (Client-Side Rendering)**, **SSR (Server-Side Rendering)**, **SSG (Static Site Generation)** va **Hydration** (jonlantirish) jarayonlarini chuqur tushunishi kerak.

Siz restoranda taom buyurtma qilmoqchisiz:
- **CSR (Client-Side Rendering):** Restoran sizga taomning barcha ingredientlarini (xom go'sht, kartoshka va h.k.) va retseptini beradi. Siz stolingizda o'tirib o'zingiz pishirib yeysiz (server faqat bo'sh HTML va katta JS faylini yuboradi, brauzer esa sahifani yig'adi).
- **SSR (Server-Side Rendering):** Oshpaz taomni oshxonada to'liq pishirib, tayyor holda stolingizga olib keladi (server tayyor HTML yuboradi, foydalanuvchi darhol ko'radi).
- **SSG (Static Site Generation):** Restoranda tayyor konservalangan taomlar bor, ularni pishirish ham shart emas, darhol olib kelinadi (fayllar oldindan build paytida tayyorlab qo'yilgan, o'ta tez yuklanadi).
- **Hydration (Jonlantirish):** Oshxonadan kelgan issiq taomga sanchqi va pichoqni berish (tayyor HTML sahifaga JS event listenerlarni ulash).

---

## 2. 💻 Real Kod Misollari



---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Render qilish turlari va ularning farqi:

#

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **SSR sahifalarida \`window\` yoki \`document\` dan to'g'ridan-to'g'ri foydalanish:** Node.js server muhitida \`window\` va \`document\` obyektlari mavjud emas. Agar ulardan SSR kodida foydalanilsa, server \`ReferenceError: window is not defined\` xatosi bilan qulaydi. Ishlatishdan oldin har doim muhit mijoz (client) ekanligini tekshirish shart.
2. **Hydration Mismatch:** Serverda generatsiya qilingan HTML bilan mijozda render qilingan HTML o'rtasida farq bo'lishi (masalan, server va mijozda vaqt/sana har xil bo'lsa). Bu brauzerda hydration xatolariga va UI buzilishlariga sabab bo'ladi.
3. **Keraksiz joyda SSR ishlatish:** Tez-tez o'zgarmaydigan sahifalar (masalan, qoidalar sahifasi) uchun SSR ishlatish server resursini behuda sarflashdir. Bunga SSG mos keladi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. CSR nima?**
Client-Side Rendering (Mijozda render qilish) — sahifa tuzilmasini to'liq brauzer ichida JavaScript yordamida yig'ish usuli.

**2. SSR nima?**
Server-Side Rendering (Serverda render qilish) — foydalanuvchi so'rov yuborgan paytda serverda tayyor HTML sahifasini yig'ib, brauzerga uzatish texnologiyasi.

**3. SSG nima?**
Static Site Generation (Statik sayt yaratish) — loyihani ishlab chiqarishga tayyorlash (build) jarayonida barcha sahifalarni oldindan HTML fayllar ko'rinishida yig'ib qo'yish usuli.

**4. Hydration (Jonlantirish) jarayoni nima uchun kerak?**
Serverdan kelgan tayyor HTML interaktiv emas (tugmalar bosilmaydi). JS yuklangach, u HTML elementlariga event listenerlarni bog'lab, sahifani "jonlantiradi".

**5. Nima uchun CSR SEO (Search Engine Optimization) uchun yomon?**
Chunki qidiruv botlari (Googlebot-dan tashqari ko'plab botlar) JavaScript-ni ishga tushirmaydi va faqat serverdan kelgan bo'sh HTML-ni ko'radi, natijada sahifa indekslanmaydi.

**6. SPA (Single Page Application) nima?**
Faqat bitta HTML sahifadan iborat bo'lib, sahifalararo o'tishlar brauzerni to'liq yangilamasdan (reload-siz) faqat JS orqali dinamik bajariladigan ilova.

**7. Nima uchun serverda \`window\` obyekti mavjud emas?**
Chunki server (Node.js) muhitida brauzer oynasi (window) va DOM (document) yo'q. U yerda faqat tizim darajasidagi API-lar mavjud.

**8. Hydration Mismatch xatosi qachon yuz beradi?**
Server generatsiya qilgan HTML tuzilmasi brauzerdagi birinchi render natijasiga mos kelmay qolganda (masalan, tasodifiy son \`Math.random()\` ishlatilganda).

**9. Next.js ramkasi (framework) qaysi render turlarini qo'llab-quvvatlaydi?**
U har bir sahifa uchun alohida tanlash imkoni bilan hammasini: CSR, SSR, SSG va ISR (Incremental Static Regeneration) ni qo'llab-quvvatlaydi.

**10. ISR (Incremental Static Regeneration) nima?**
SSG sahifalarini butun saytni qayta build qilmasdan, belgilangan vaqt oralig'ida (masalan, har 10 soniyada) fonda yangilab turish imkonini beruvchi ilg'or texnologiya.

**11. Sayt yuklanishini tezlashtirishda Code Splitting (kodni bo'lish) maqsadi nima?**
Saytning barcha JS kodlarini bitta katta fayl qilib yuklamasdan, foydalanuvchiga faqat u turgan sahifa uchun kerakli qismini dinamik yuklash orqali yuklanish vaqtini qisqartirish.

**12. Pre-rendering nima?**
Foydalanuvchi sahifaga kirmasdan oldin uning HTML tarkibini (SSR yoki SSG orqali) tayyorlab qo'yish yondashuvi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Dynamic Hydration on Server-Side Rendered Pages
Serverda render qilingan HTML sahifadagi dinamik tugmalarni JavaScript yuklangandan so'ng faollashtirish (hydration):
\`\`\`javascript
// Serverda (renderToString):
// <div id="root"><button id="alert-btn">Kliklang</button></div>

// Mijozda (hydration):
const btn = document.getElementById("alert-btn");
if (btn) {
  btn.addEventListener("click", () => alert("Sahifa jonlandi (Hydrated)!"));
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    subgraph CSR_Flow ["CSR (Client-Side Rendering)"]
        Client1[Client] -->|Request| Server1[Server]
        Server1 -->|Empty HTML + Large JS| Client1
        Client1 -->|JS executes & renders UI| Active1[Interactive Page]
    end

    subgraph SSR_Flow ["SSR (Server-Side Rendering)"]
        Client2[Client] -->|Request| Server2[Server]
        Server2 -->|Fetches DB & renders HTML| HTML2[Full HTML]
        HTML2 -->|Send HTML| Client2
        Client2 -->|Hydration: binds JS| Active2[Interactive Page]
    end
\`\`\`

---

## 10. 📌 Cheat Sheet

| Arxitektura | SEO | Birinchi Yuklanish | Mos keladigan Joyi |
| :--- | :--- | :--- | :--- |
| **CSR** | Yomon | Sekin (Katta JS) | Admin Panellar, Dashboardlar |
| **SSR** | A'lo | Tez | Yangiliklar sayti, E-commerce |
| **SSG** | A'lo | O'ta Tez | Bloglar, Hujjatlar (Documentation) |
`,
  exercises: [
  {
    "id": 1,
    "title": "Mijoz muhitini tekshirish (isClient)",
    "instruction": "Node.js serverida xatolik bermasligi uchun `window` obyekti mavjudligini tekshirib mijoz muhitida ekanligimizni bildiruvchi `isClient()` funksiyasini yozing (true/false).",
    "startingCode": "function isClient() {\n  // window mavjudligini tekshiring\n}",
    "hint": "return typeof window !== 'undefined';",
    "test": "if (typeof isClient !== 'function') return 'isClient topilmadi'; if(isClient() !== (typeof window !== 'undefined')) return 'Mijoz muhiti to\\'g\\'ri aniqlanmadi'; return null;"
  },
  {
    "id": 2,
    "title": "Sodda Virtual DOM Tuguni (Hyperscript)",
    "instruction": "Virtual DOM uchun `tag`, `props` va `children` parametrlarga ega virtual node (obyekt) qaytaradigan `h(tag, props, ...children)` funksiyasini yozing.",
    "startingCode": "function h(tag, props, ...children) {\n  // Obyekt qaytaring\n}",
    "hint": "return { tag, props: props || {}, children };",
    "test": "if (typeof h !== 'function') return 'h topilmadi'; const node = h('div', { id: 'app' }, 'Hello'); if(node.tag !== 'div' || node.props.id !== 'app' || node.children[0] !== 'Hello') return 'Virtual Node noto\\'g\\'ri yaratildi'; return null;"
  },
  {
    "id": 3,
    "title": "Render tanlash simulyatsiyasi",
    "instruction": "Berilgan sahifa talabiga ko'ra render turini tanlaydigan `getBestRendering(isStatic, needsSEO)` funksiyasini yozing (SSG, SSR yoki CSR qaytarsin). Static bo'lsa SSG, SEO kerak bo'lsa SSR, aks holda CSR.",
    "startingCode": "function getBestRendering(isStatic, needsSEO) {\n  // Shartlarni tekshiring\n}",
    "hint": "if (isStatic) return 'SSG';\nif (needsSEO) return 'SSR';\nreturn 'CSR';",
    "test": "if (typeof getBestRendering !== 'function') return 'getBestRendering topilmadi'; if (getBestRendering(true, true) !== 'SSG') return 'Static uchun SSG bo\\'lishi kerak'; if (getBestRendering(false, true) !== 'SSR') return 'SEO uchun SSR bo\\'lishi kerak'; if (getBestRendering(false, false) !== 'CSR') return 'Boshqa holatda CSR bo\\'lishi kerak'; return null;"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "CSR (Client-Side Rendering) ning asosiy ishlash prinsipi qanday?",
    "options": [
      "Serverda to'liq HTML sahifani yig'ib jo'natadi",
      "Brauzer bo'sh HTML va JavaScript-ni yuklab olib, sahifa tarkibini o'zi brauzerda yig'adi",
      "Sayt faqat CSS yordamida render qilinadi",
      "Faqat ma'lumotlar bazasi ichida render qilinadi"
    ],
    "correctAnswer": 1,
    "explanation": "CSR-da server faqat minimal HTML jo'natadi, brauzerdagi JavaScript esa barcha UI elementlarini DOM-da dinamik ravishda yaratadi."
  },
  {
    "id": 2,
    "question": "SSR (Server-Side Rendering) ning CSR-ga qaraganda eng muhim ustunligi nimada?",
    "options": [
      "U hech qanday JavaScript ishlatmaydi",
      "Qidiruv botlari tayyor HTML-ni ko'rishi sababli a'lo darajadagi SEO va birinchi sahifa yuklanishining tezligi",
      "Server xotirasini umuman band qilmaydi",
      "Faqat oflayn rejimda ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "SSR serverda so'rov kelgan zahoti tayyor HTML hosil qilgani sababli, qidiruv botlari (SEO) sahifani oson o'qiydi va sahifa birinchi soniyadanoq matnlarga ega bo'ladi."
  },
  {
    "id": 3,
    "question": "Static Site Generation (SSG) darsidagi 'Build time' nimani anglatadi?",
    "options": [
      "Foydalanuvchi sahifaga kirgan soniyani",
      "Dasturchi kodni yozib tugatgan vaqtni",
      "Loyiha ishlab chiqarish (production) uchun yig'ilayotgan va sayt serverga joylanishidan oldingi vaqtni",
      "Server o'chib yongan vaqtni"
    ],
    "correctAnswer": 2,
    "explanation": "Build time — loyiha to'liq yig'ilib, barcha statik HTML fayllar oldindan yaratib qo'yiladigan yig'ish (compile/build) jarayonidir."
  },
  {
    "id": 4,
    "question": "Hydration (Jonlantirish) jarayoni nima?",
    "options": [
      "Sahifadagi rasmlarni siqish",
      "Serverdan kelgan tayyor HTML tarkibiga JavaScript event listener-larini va interaktiv holatlarni bog'lash",
      "Sayt xavfsizligini ta'minlash",
      "Kesh xotirasini tozalash"
    ],
    "correctAnswer": 1,
    "explanation": "Server yuborgan HTML faqat ko'rinish beradi. Hydration jarayonida brauzerda ishga tushgan JS unga dinamik vazifalarni (click, input, submit va h.k.) ulab chiqadi."
  },
  {
    "id": 5,
    "question": "Nima uchun Node.js (server) muhitida `window.location` ni chaqirish xatolik beradi?",
    "options": [
      "Chunki window kalit so'zi taqiqlangan",
      "Chunki Node.js server muhiti hisoblanib, unda brauzer oynasi (window) va uning xossalari mavjud emas",
      "Faqat HTTPS sahifalarda chaqirish mumkin",
      "Chunki u asinxron funksiya"
    ],
    "correctAnswer": 1,
    "explanation": "Node.js global obyekti `global` hisoblanadi. Unda brauzerga xos bo'lgan `window`, `document`, `navigator` obyektlari yo'q."
  },
  {
    "id": 6,
    "question": "Hydration Mismatch (mos kelmaslik) xatosi qachon yuzaga keladi?",
    "options": [
      "Agar internet tezligi juda past bo'lsa",
      "Serverda generatsiya qilingan HTML bilan mijozda (client) birinchi render qilingan HTML tarkibi mos kelmay qolsa",
      "SQL injection yuz berganda",
      "Faqat CSS yuklanmay qolganda"
    ],
    "correctAnswer": 1,
    "explanation": "Server yig'gan HTML va mijoz birinchi marta JS bilan yig'gan HTML 100% bir xil bo'lishi shart. Mos kelmaslik (masalan, har xil sana chiqishi) hydration mismatch xatosiga sabab bo'ladi."
  },
  {
    "id": 7,
    "question": "Incremental Static Regeneration (ISR) ning asosiy maqsadi nima?",
    "options": [
      "Saytni butunlay o'chirish",
      "Butun saytni qayta build qilmasdan, belgilangan ma'lum vaqt oralig'ida fonda faqat kerakli statik sahifalarni avtomatik yangilash",
      "Faqat parollarni tekshirish",
      "LocalStorage hajmini oshirish"
    ],
    "correctAnswer": 1,
    "explanation": "ISR statik sahifalarning (SSG) tezligini va serverda so'rov paytidagi yangi ma'lumotlarni (SSR) birlashtirib, statik sahifalarni fonda dinamik yangilashga imkon beradi."
  },
  {
    "id": 8,
    "question": "SPA (Single Page Application) ilovalarida sahifalararo o'tish qanday sodir bo'ladi?",
    "options": [
      "Serverdan har safar yangi HTML yuklanadi",
      "Brauzerni to'liq yangilamasdan (reload-siz), JavaScript (Client Router) yordamida sahifa qismlari dinamik o'zgartiriladi",
      "Faqat popup oynalar orqali",
      "Faqat iframe yordamida"
    ],
    "correctAnswer": 1,
    "explanation": "SPA-da router brauzerning standart sahifa yangilash harakatini to'xtatib, faqat kerakli ma'lumotlarni API orqali oladi va DOM-ni yangilaydi."
  },
  {
    "id": 9,
    "question": "Code Splitting (kodni bo'lish) qanday muammoni hal qiladi?",
    "options": [
      "Faqat dizayn xatolarini tuzatadi",
      "Barcha JS kodlarini bitta katta fayl (bundle) qilib yuklash o'rniga, faqat kerakli sahifa kodlarini yuklab, birinchi yuklanish vaqtini qisqartiradi",
      "SQL so'rovlarini birlashtiradi",
      "Baza xotirasini tejaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Code Splitting katta loyihalarni kichik paketlarga (chunks) ajratadi va foydalanuvchi ma'lum bir sahifaga kirgandagina shu sahifaning JS kodini yuklaydi."
  },
  {
    "id": 10,
    "question": "SSG (Static Site Generation) qaysi turdagi loyihalar uchun eng mukammal yechim hisoblanadi?",
    "options": [
      "Har soniyada o'zgarib turadigan live chat ilovalari",
      "Hujjatlar (Documentation), shaxsiy portfolio, statik blog sahifalari va Landing pagelar",
      "Faqat admin panellar",
      "Internet do'kon savatchasi"
    ],
    "correctAnswer": 1,
    "explanation": "Tez-tez o'zgarmaydigan kontentga ega bo'lgan saytlar uchun SSG eng tezkor, arzon va xavfsiz rendering turi hisoblanadi."
  },
  {
    "id": 11,
    "question": "SEO uchun eng yomon render qilish turi qaysi?",
    "options": [
      "SSR",
      "SSG",
      "CSR",
      "ISR"
    ],
    "correctAnswer": 2,
    "explanation": "CSR faqat brauzerda JS ishga tushgach sahifani yig'adi. Ko'plab oddiy qidiruv botlari JS bajarmaganligi sababli saytni mutlaqo bo'sh deb o'ylaydi."
  },
  {
    "id": 12,
    "question": "React 18 dagi 'Streaming SSR' nima?",
    "options": [
      "Saytni jonli efirda ko'rsatish",
      "Server butun HTML-ni to'liq tayyorlashini kutmasdan, tayyor bo'lgan qismlarni HTML oqimi (stream) sifatida brauzerga bo'laklab yuborib turishi",
      "Faqat video pleyerlarni boshqarish",
      "Bazani avtomatik tozalash"
    ],
    "correctAnswer": 1,
    "explanation": "Streaming SSR sahifa yuklanishini bloklamaydi, server tayyor bo'lgan komponentlarni HTML shaklida oqimli uzatib turadi, qolgan og'ir qismlar esa (masalan, Suspense) keyinroq keladi."
  }
]
};

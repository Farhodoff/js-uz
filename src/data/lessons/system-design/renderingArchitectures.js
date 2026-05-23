export const renderingArchitectures = {
  id: "renderingArchitectures",
  title: "Veb Rendering Arxitekturalari (CSR, SSR, SSG, Hydration)",
  theory: `## 1. NEGA kerak?
Veb-ilovalar dastlab yuklanganda sahifani foydalanuvchiga qanday ko'rsatish va uning tarkibini qayerda shakllantirish (render qilish) veb-sahifa yuklanish tezligi, foydalanuvchi tajribasi (UX) va qidiruv tizimi optimallashtirilishiga (SEO) bevosita ta'sir qiladi.
Agar biz noto'g'ri render qilish usulini tanlasak, saytimiz Google qidiruv natijalarida ko'rinmay qolishi (SEO muammosi) yoki foydalanuvchilar oq sahifani uzoq vaqt kutib turishi mumkin. Shuning uchun zamonaviy dasturchi **CSR (Client-Side Rendering)**, **SSR (Server-Side Rendering)**, **SSG (Static Site Generation)** va **Hydration** (jonlantirish) jarayonlarini chuqur tushunishi kerak.

## 2. SODDALIK (Analogiya)
Siz restoranda taom buyurtma qilmoqchisiz:
- **CSR (Client-Side Rendering):** Restoran sizga taomning barcha ingredientlarini (xom go'sht, kartoshka va h.k.) va retseptini beradi. Siz stolingizda o'tirib o'zingiz pishirib yeysiz (server faqat bo'sh HTML va katta JS faylini yuboradi, brauzer esa sahifani yig'adi).
- **SSR (Server-Side Rendering):** Oshpaz taomni oshxonada to'liq pishirib, tayyor holda stolingizga olib keladi (server tayyor HTML yuboradi, foydalanuvchi darhol ko'radi).
- **SSG (Static Site Generation):** Restoranda tayyor konservalangan taomlar bor, ularni pishirish ham shart emas, darhol olib kelinadi (fayllar oldindan build paytida tayyorlab qo'yilgan, o'ta tez yuklanadi).
- **Hydration (Jonlantirish):** Oshxonadan kelgan issiq taomga sanchqi va pichoqni berish (tayyor HTML sahifaga JS event listenerlarni ulash).

## 3. STRUKTURA
Render qilish turlari va ularning farqi:

### 1. CSR (Client-Side Rendering)
Brauzer serverdan deyarli bo'sh HTML sahifani va barcha kodlar yozilgan katta JS faylini yuklab oladi. JS ishga tushib, sahifani brauzerda render qiladi.
*Afzalligi:* Saytda sahifalararo o'tish juda tez (SPA).
*Kamchiligi:* Ilk yuklanish sekin, SEO uchun yomon (qidiruv botlari faqat bo'sh HTMLni ko'rishi mumkin).

### 2. SSR (Server-Side Rendering)
Har bir so'rov kelganda, server ma'lumotlar bazasidan ma'lumotlarni oladi, sahifa HTMLini serverda yig'adi (render qiladi) va tayyor HTMLni brauzerga yuboradi.
*Afzalligi:* SEO uchun a'lo darajada, birinchi sahifa juda tez ko'rinadi.
*Kamchiligi:* Serverga yuklama yuqori, sahifalararo o'tishda yuklanish seziladi.

### 3. SSG (Static Site Generation)
Sahifalar loyiha yig'ilayotgan paytda (Build time) bir marta to'liq render qilinadi va statik HTML fayllar sifatida CDN-ga joylanadi.
*Afzalligi:* O'ta tezkor (eng tezi), server yuklamasi deyarli yo'q.
*Kamchiligi:* Tez-tez o'zgarib turadigan ma'lumotlar uchun mos emas (hujjatlar, bloglar uchun mos).

### 4. Hydration (Jonlantirish)
Serverdan kelgan statik HTML sahifasiga JavaScript event listener-larini va dinamik interaktivlikni ulash jarayoni. Shundan so'ng sahifa foydalanuvchi harakatlariga javob bera boshlaydi.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **SSR sahifalarida \`window\` yoki \`document\` dan to'g'ridan-to'g'ri foydalanish:** Node.js server muhitida \`window\` va \`document\` obyektlari mavjud emas. Agar ulardan SSR kodida foydalanilsa, server \`ReferenceError: window is not defined\` xatosi bilan qulaydi. Ishlatishdan oldin har doim muhit mijoz (client) ekanligini tekshirish shart.
2. **Hydration Mismatch:** Serverda generatsiya qilingan HTML bilan mijozda render qilingan HTML o'rtasida farq bo'lishi (masalan, server va mijozda vaqt/sana har xil bo'lsa). Bu brauzerda hydration xatolariga va UI buzilishlariga sabab bo'ladi.
3. **Keraksiz joyda SSR ishlatish:** Tez-tez o'zgarmaydigan sahifalar (masalan, qoidalar sahifasi) uchun SSR ishlatish server resursini behuda sarflashdir. Bunga SSG mos keladi.

## 6. SAVOLLAR VA JAVOBLAR
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
`,
  exercises: [
    {
      id: 1,
      title: "Mijoz muhitini tekshirish (isClient)",
      instruction: "Node.js serverida xatolik bermasligi uchun `window` obyekti mavjudligini tekshirib mijoz muhitida ekanligimizni bildiruvchi `isClient()` funksiyasini yozing (true/false).",
      startingCode: "function isClient() {\n  // window mavjudligini tekshiring\n}",
      hint: "return typeof window !== 'undefined';",
      test: "if (typeof isClient !== 'function') return 'isClient topilmadi'; if(isClient() !== (typeof window !== 'undefined')) return 'Mijoz muhiti to\\'g\\'ri aniqlanmadi'; return null;"
    },
    {
      id: 2,
      title: "Sodda Virtual DOM Tuguni (Hyperscript)",
      instruction: "Virtual DOM uchun `tag`, `props` va `children` parametrlarga ega virtual node (obyekt) qaytaradigan `h(tag, props, ...children)` funksiyasini yozing.",
      startingCode: "function h(tag, props, ...children) {\n  // Obyekt qaytaring\n}",
      hint: "return { tag, props: props || {}, children };",
      test: "if (typeof h !== 'function') return 'h topilmadi'; const node = h('div', { id: 'app' }, 'Hello'); if(node.tag !== 'div' || node.props.id !== 'app' || node.children[0] !== 'Hello') return 'Virtual Node noto\\'g\\'ri yaratildi'; return null;"
    },
    {
      id: 3,
      title: "Render tanlash simulyatsiyasi",
      instruction: "Berilgan sahifa talabiga ko'ra render turini tanlaydigan `getBestRendering(isStatic, needsSEO)` funksiyasini yozing (SSG, SSR yoki CSR qaytarsin). Static bo'lsa SSG, SEO kerak bo'lsa SSR, aks holda CSR.",
      startingCode: "function getBestRendering(isStatic, needsSEO) {\n  // Shartlarni tekshiring\n}",
      hint: "if (isStatic) return 'SSG';\nif (needsSEO) return 'SSR';\nreturn 'CSR';",
      test: "if (typeof getBestRendering !== 'function') return 'getBestRendering topilmadi'; if (getBestRendering(true, true) !== 'SSG') return 'Static uchun SSG bo\\'lishi kerak'; if (getBestRendering(false, true) !== 'SSR') return 'SEO uchun SSR bo\\'lishi kerak'; if (getBestRendering(false, false) !== 'CSR') return 'Boshqa holatda CSR bo\\'lishi kerak'; return null;"
    },
    {
      id: 4,
      title: "SEO Meta tag izlovchi",
      instruction: "HTML stringidan sahifa sarlavhasini (`<title>...</title>`) qidirib topadigan `getPageTitle(htmlString)` funksiyasini yozing.",
      startingCode: "function getPageTitle(htmlString) {\n  // RegExp yordamida title-ni toping\n}",
      hint: "const match = htmlString.match(/<title>([^<]*)<\\/title>/i);\nreturn match ? match[1] : null;",
      test: "if (typeof getPageTitle !== 'function') return 'getPageTitle topilmadi'; if (getPageTitle('<html><title>Mening Saytim</title></html>') !== 'Mening Saytim') return 'Title to\\'g\\'ri topilmadi'; return null;"
    },
    {
      id: 5,
      title: "Dinamik import (Bundle splitting) simulyatsiyasi",
      instruction: "Katta modulni faqat chaqirilganda yuklaydigan dynamic import va’dasini (Promise) chaqiruvchi `loadAnalyticsModule()` funksiyasini yozing.",
      startingCode: "function loadAnalyticsModule() {\n  // import('./analytics.js') ni qaytaring\n}",
      hint: "return import('./analytics.js');",
      test: "if (typeof loadAnalyticsModule !== 'function') return 'loadAnalyticsModule topilmadi'; if(typeof loadAnalyticsModule()?.then !== 'function') return 'Dynamic import Promise qaytarishi shart'; return null;"
    },
    {
      id: 6,
      title: "Sodda SSR HTML generatori",
      instruction: "Berilgan ma'lumotlar bilan HTML andozasini yig'ib qaytaradigan `renderToString(title, content)` funksiyasini yozing.",
      startingCode: "function renderToString(title, content) {\n  // HTML shablonini yig'ing\n}",
      hint: "return `<!DOCTYPE html><html><head><title>${title}</title></head><body><div id=\"root\">${content}</div></body></html>`;",
      test: "if (typeof renderToString !== 'function') return 'renderToString topilmadi'; const res = renderToString('Bosh', 'Salom'); if (!res.includes('<title>Bosh</title>') || !res.includes('Salom')) return 'HTML to\\'g\\'ri yig\\'ilmadi'; return null;"
    },
    {
      id: 7,
      title: "Hydration mismatch validator",
      instruction: "Server HTML-i va mijoz HTML-i bir-biriga mos kelishini tekshiradigan `checkHydration(serverHtml, clientHtml)` funksiyasini yozing (true/false).",
      startingCode: "function checkHydration(serverHtml, clientHtml) {\n  // Bo'shliqlarni olib tashlab solishtiring\n}",
      hint: "return serverHtml.trim() === clientHtml.trim();",
      test: "if (typeof checkHydration !== 'function') return 'checkHydration topilmadi'; if (checkHydration(' <div> </div> ', '<div></div>') !== true) return 'Bo\\'shliqlar hisobga olinmasligi kerak edi'; return null;"
    },
    {
      id: 8,
      title: "Static Path generator (SSG)",
      instruction: "SSG uchun berilgan post ID massividan Next.js formatidagi static yo'llar massivini hosil qiluvchi `generatePaths(ids)` funksiyasini yozing (masalan: `[{ params: { id: '1' } }]`).",
      startingCode: "function generatePaths(ids) {\n  // Map orqali params obyektlarini yarating\n}",
      hint: "return ids.map(id => ({ params: { id: String(id) } }));",
      test: "if (typeof generatePaths !== 'function') return 'generatePaths topilmadi'; const res = generatePaths([5]); if(res[0].params.id !== '5') return 'Params to\\'g\\'ri formatlanmadi'; return null;"
    },
    {
      id: 9,
      title: "Prefetch Link simulyatsiyasi",
      instruction: "Foydalanuvchi havola ustiga sichqonchani olib kelganda (hover) sahifa manzilini oldindan yuklash uchun DOM head-ga `<link rel=\"prefetch\" href=\"url\">` qo'shadigan `prefetch(url)` funksiyasini yozing.",
      startingCode: "function prefetch(url) {\n  if (typeof document === 'undefined') return;\n  // link yarating va head-ga append qiling\n}",
      hint: "const link = document.createElement('link'); link.rel = 'prefetch'; link.href = url; document.head.appendChild(link);",
      test: "if (typeof prefetch !== 'function') return 'prefetch topilmadi'; let appended = null; global.document = { createElement: () => ({}), head: { appendChild: (el) => appended = el } }; prefetch('/about'); if(!appended || appended.rel !== 'prefetch') return 'Prefetch linki head-ga qo\\'shilmadi'; return null;"
    },
    {
      id: 10,
      title: "Server initial props merge",
      instruction: "Serverdan kelgan `initialProps` va client-da mavjud bo'lgan `defaultProps` ni birlashtiruvchi `mergeProps(initialProps, defaultProps)` funksiyasini yozing.",
      startingCode: "function mergeProps(initialProps, defaultProps) {\n  // Obyektlarni birlashtiring\n}",
      hint: "return { ...defaultProps, ...initialProps };",
      test: "if (typeof mergeProps !== 'function') return 'mergeProps topilmadi'; const res = mergeProps({ data: 1 }, { data: 2, name: 'A' }); if(res.data !== 1 || res.name !== 'A') return 'Obyektlar to\\'g\\'ri birlashmadi'; return null;"
    },
    {
      id: 11,
      title: "Bundle Size warning trigger",
      instruction: "JS bundle hajmi (kilobaytlarda) belgilangan limitdan (masalan, 500KB) oshganda ogohlantirish beruvchi `checkBundleSize(sizeKB, limitKB)` funksiyasini yozing (true/false).",
      startingCode: "function checkBundleSize(sizeKB, limitKB) {\n  // Limitni tekshiring\n}",
      hint: "return sizeKB > limitKB;",
      test: "if (typeof checkBundleSize !== 'function') return 'checkBundleSize topilmadi'; if(checkBundleSize(600, 500) !== true || checkBundleSize(400, 500) !== false) return 'Limit tekshirish xato'; return null;"
    },
    {
      id: 12,
      title: "Hydration status flag",
      instruction: "Sahifa to'liq hidratatsiya bo'lganligini (interaktiv holga kelganligini) bildiruvchi boolean qiymatli `isHydrated` o'zgaruvchisini yarating (default: false).",
      startingCode: "let isHydrated = ",
      hint: "false",
      test: "if (typeof isHydrated === 'undefined') return 'isHydrated topilmadi'; if(isHydrated !== false) return 'Boshlang\\'ich holatda isHydrated false bo\\'lishi kerak'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "CSR (Client-Side Rendering) ning asosiy ishlash prinsipi qanday?",
      options: [
        "Serverda to'liq HTML sahifani yig'ib jo'natadi",
        "Brauzer bo'sh HTML va JavaScript-ni yuklab olib, sahifa tarkibini o'zi brauzerda yig'adi",
        "Sayt faqat CSS yordamida render qilinadi",
        "Faqat ma'lumotlar bazasi ichida render qilinadi"
      ],
      correctAnswer: 1,
      explanation: "CSR-da server faqat minimal HTML jo'natadi, brauzerdagi JavaScript esa barcha UI elementlarini DOM-da dinamik ravishda yaratadi."
    },
    {
      id: 2,
      question: "SSR (Server-Side Rendering) ning CSR-ga qaraganda eng muhim ustunligi nimada?",
      options: [
        "U hech qanday JavaScript ishlatmaydi",
        "Qidiruv botlari tayyor HTML-ni ko'rishi sababli a'lo darajadagi SEO va birinchi sahifa yuklanishining tezligi",
        "Server xotirasini umuman band qilmaydi",
        "Faqat oflayn rejimda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "SSR serverda so'rov kelgan zahoti tayyor HTML hosil qilgani sababli, qidiruv botlari (SEO) sahifani oson o'qiydi va sahifa birinchi soniyadanoq matnlarga ega bo'ladi."
    },
    {
      id: 3,
      question: "Static Site Generation (SSG) darsidagi 'Build time' nimani anglatadi?",
      options: [
        "Foydalanuvchi sahifaga kirgan soniyani",
        "Dasturchi kodni yozib tugatgan vaqtni",
        "Loyiha ishlab chiqarish (production) uchun yig'ilayotgan va sayt serverga joylanishidan oldingi vaqtni",
        "Server o'chib yongan vaqtni"
      ],
      correctAnswer: 2,
      explanation: "Build time — loyiha to'liq yig'ilib, barcha statik HTML fayllar oldindan yaratib qo'yiladigan yig'ish (compile/build) jarayonidir."
    },
    {
      id: 4,
      question: "Hydration (Jonlantirish) jarayoni nima?",
      options: [
        "Sahifadagi rasmlarni siqish",
        "Serverdan kelgan tayyor HTML tarkibiga JavaScript event listener-larini va interaktiv holatlarni bog'lash",
        "Sayt xavfsizligini ta'minlash",
        "Kesh xotirasini tozalash"
      ],
      correctAnswer: 1,
      explanation: "Server yuborgan HTML faqat ko'rinish beradi. Hydration jarayonida brauzerda ishga tushgan JS unga dinamik vazifalarni (click, input, submit va h.k.) ulab chiqadi."
    },
    {
      id: 5,
      question: "Nima uchun Node.js (server) muhitida `window.location` ni chaqirish xatolik beradi?",
      options: [
        "Chunki window kalit so'zi taqiqlangan",
        "Chunki Node.js server muhiti hisoblanib, unda brauzer oynasi (window) va uning xossalari mavjud emas",
        "Faqat HTTPS sahifalarda chaqirish mumkin",
        "Chunki u asinxron funksiya"
      ],
      correctAnswer: 1,
      explanation: "Node.js global obyekti `global` hisoblanadi. Unda brauzerga xos bo'lgan `window`, `document`, `navigator` obyektlari yo'q."
    },
    {
      id: 6,
      question: "Hydration Mismatch (mos kelmaslik) xatosi qachon yuzaga keladi?",
      options: [
        "Agar internet tezligi juda past bo'lsa",
        "Serverda generatsiya qilingan HTML bilan mijozda (client) birinchi render qilingan HTML tarkibi mos kelmay qolsa",
        "SQL injection yuz berganda",
        "Faqat CSS yuklanmay qolganda"
      ],
      correctAnswer: 1,
      explanation: "Server yig'gan HTML va mijoz birinchi marta JS bilan yig'gan HTML 100% bir xil bo'lishi shart. Mos kelmaslik (masalan, har xil sana chiqishi) hydration mismatch xatosiga sabab bo'ladi."
    },
    {
      id: 7,
      question: "Incremental Static Regeneration (ISR) ning asosiy maqsadi nima?",
      options: [
        "Saytni butunlay o'chirish",
        "Butun saytni qayta build qilmasdan, belgilangan ma'lum vaqt oralig'ida fonda faqat kerakli statik sahifalarni avtomatik yangilash",
        "Faqat parollarni tekshirish",
        "LocalStorage hajmini oshirish"
      ],
      correctAnswer: 1,
      explanation: "ISR statik sahifalarning (SSG) tezligini va serverda so'rov paytidagi yangi ma'lumotlarni (SSR) birlashtirib, statik sahifalarni fonda dinamik yangilashga imkon beradi."
    },
    {
      id: 8,
      question: "SPA (Single Page Application) ilovalarida sahifalararo o'tish qanday sodir bo'ladi?",
      options: [
        "Serverdan har safar yangi HTML yuklanadi",
        "Brauzerni to'liq yangilamasdan (reload-siz), JavaScript (Client Router) yordamida sahifa qismlari dinamik o'zgartiriladi",
        "Faqat popup oynalar orqali",
        "Faqat iframe yordamida"
      ],
      correctAnswer: 1,
      explanation: "SPA-da router brauzerning standart sahifa yangilash harakatini to'xtatib, faqat kerakli ma'lumotlarni API orqali oladi va DOM-ni yangilaydi."
    },
    {
      id: 9,
      question: "Code Splitting (kodni bo'lish) qanday muammoni hal qiladi?",
      options: [
        "Faqat dizayn xatolarini tuzatadi",
        "Barcha JS kodlarini bitta katta fayl (bundle) qilib yuklash o'rniga, faqat kerakli sahifa kodlarini yuklab, birinchi yuklanish vaqtini qisqartiradi",
        "SQL so'rovlarini birlashtiradi",
        "Baza xotirasini tejaydi"
      ],
      correctAnswer: 1,
      explanation: "Code Splitting katta loyihalarni kichik paketlarga (chunks) ajratadi va foydalanuvchi ma'lum bir sahifaga kirgandagina shu sahifaning JS kodini yuklaydi."
    },
    {
      id: 10,
      question: "SSG (Static Site Generation) qaysi turdagi loyihalar uchun eng mukammal yechim hisoblanadi?",
      options: [
        "Har soniyada o'zgarib turadigan live chat ilovalari",
        "Hujjatlar (Documentation), shaxsiy portfolio, statik blog sahifalari va Landing pagelar",
        "Faqat admin panellar",
        "Internet do'kon savatchasi"
      ],
      correctAnswer: 1,
      explanation: "Tez-tez o'zgarmaydigan kontentga ega bo'lgan saytlar uchun SSG eng tezkor, arzon va xavfsiz rendering turi hisoblanadi."
    },
    {
      id: 11,
      question: "SEO uchun eng yomon render qilish turi qaysi?",
      options: ["SSR", "SSG", "CSR", "ISR"],
      correctAnswer: 2,
      explanation: "CSR faqat brauzerda JS ishga tushgach sahifani yig'adi. Ko'plab oddiy qidiruv botlari JS bajarmaganligi sababli saytni mutlaqo bo'sh deb o'ylaydi."
    },
    {
      id: 12,
      question: "React 18 dagi 'Streaming SSR' nima?",
      options: [
        "Saytni jonli efirda ko'rsatish",
        "Server butun HTML-ni to'liq tayyorlashini kutmasdan, tayyor bo'lgan qismlarni HTML oqimi (stream) sifatida brauzerga bo'laklab yuborib turishi",
        "Faqat video pleyerlarni boshqarish",
        "Bazani avtomatik tozalash"
      ],
      correctAnswer: 1,
      explanation: "Streaming SSR sahifa yuklanishini bloklamaydi, server tayyor bo'lgan komponentlarni HTML shaklida oqimli uzatib turadi, qolgan og'ir qismlar esa (masalan, Suspense) keyinroq keladi."
    }
  ]
};

export const reactArchitecture = {
  id: "reactArchitecture",
  title: "React Component Arxitekturasi (Design Patterns)",
  theory: `## 1. NEGA kerak?
React loyihalarida to'g'ri komponentlar dizaynini tanlash, kodning qayta ishlatilishini (reusability) va kengaytiriluvchanligini ta'minlaydi. Loyiha o'sib borgan sari komponentlar chalkashib ketmasligi uchun ularni to'g'ri guruhlash, rollarini aniqlash va vazifalarini ajratish (Separation of Concerns) muhimdir.

## 2. SODDALIK (Analogiya)
Buni **Lego o'yinchoq uyi** deb tasavvur qiling:
- **Dumb (Presentational) Component:** Oddiy Lego g'ishtining o'zi. U faqat shakli va rangi bilan mavjud, o'zicha o'zgarmaydi. Faqat props (buyruqlar) oladi.
- **Smart (Container) Component:** Uyning elektr shit paneli. U qayerdan tok kelishini va qayerga tarqalishini boshqaradi. U state va ma'lumotlarni boshqaradi.

## 3. STRUKTURA VA MAHSULOT PRINSIPLARI
- **Smart vs Dumb Components:**
  - **Dumb (Presentational):** UI ko'rinishi uchun mas'ul. Unda lifecycle metodlari yoki local api fetch bo'lmaydi. U faqat kelgan props-larni ko'rsatadi.
  - **Smart (Container):** Logika va state uchun mas'ul. Ular API-ga so'rov yuboradi, ma'lumotlarni saqlaydi va dumb komponentlarga uzatadi.
- **Folder Structure (Features vs Shared):**
  - Katta loyihalarda kodlar funksionallik bo'yicha guruhlanadi (**Feature-based structure**): masalan, \`features/auth\`, \`features/cart\`.
  - Har bir feature o'zining \`components\`, \`hooks\` va \`services\` papkalariga ega bo'ladi.

## 4. KO‘P UCHRAYDIGAN XATOLAR (Junior Mistakes)
1. **Dumb komponent ichida to'g'ridan-to'g'ri API fetch yozish:** Bu komponentni qayta ishlatib bo'lmaydigan holga keltirib qo'yadi.
2. **Barrel importlar orqali circular dependency chaqirish:** \`index.js\` lardan noto'g'ri foydalanib komponentlarni bir-biriga zanjirband qilib qo'yish.

## 5. SAVOLLAR VA JAVOBLAR (Interview Questions)
1. **Component-based architecture nima?**
   - UI-ni kichik, mustaqil va qayta ishlatiladigan bo'laklar (komponentlar) yordamida yig'ish yondashuvi.
2. **Container vs Presentational components farqi nima?**
   - Container logika va ma'lumotlar bilan ishlaydi, Presentational esa faqat vizual ko'rinish va props qabul qilishga ixtisoslashgan.
3. **Smart vs Dumb komponentlar pattern-i hozir ham dolzarbmi?**
   - Custom hook-lar paydo bo'lgach, uning ahamiyati biroz kamaydi (chunki logikani hook-ka chiqarish osonlashdi), ammo katta tizimlarda hali ham qo'llaniladi.
4. **Feature-based folder structure nima?**
   - Loyiha fayllarini texnik turlari bo'yicha emas (barcha komponentlar bitta papkada), balki biznes modullari (auth, profile, shopping-cart) bo'yicha tartiblash.
5. **Smart komponent qanday test qilinadi?**
   - Biznes logikasi va custom hook-larni mock qilish yoki \`@testing-library/react\` yordamida integratsiya testlari orqali.
6. **Co-location prinsipi nima?**
   - Komponentga tegishli test, stil va yordamchi helper fayllarni uning yonida (bitta papkada) saqlash.
7. **Atomic Design tizimi qanday ishlaydi?**
   - UI komponentlarni Atomlar, Molekulalar, Organizmlar, Shablonlar va Sahifalar darajasida bo'lib qurish.
8. **Circular dependency muammosi nima?**
   - A komponent B komponentni, B komponent esa A-ni import qilganda brauzerda chalkashlik yoki \`undefined\` xatosi chiqishi.
9. **Katta loyihalarda barrel importlardan nega ehtiyot bo'lish kerak?**
   - Ular keraksiz kodlarni ham bundle-ga tortib kelishi va Tree-shaking-ni buzishi mumkin.
10. **Reusability (qayta ishlash) darajasini oshirish uchun nima qilish kerak?**
    - Komponentni tashqi global state va API-ga bog'liq qilmasdan, props orqali boshqariladigan holga keltirish.
11. **Props-drilling nima?**
    - State-ni unga ehtiyoji bo'lmagan ko'plab o'rta komponentlar orqali pastga uzatish.
12. **Smart komponentda UI qismini qanday kamaytirish mumkin?**
    - Barcha vizual kodlarni dumb komponentlarga ajratib, smart komponentda faqat ma'lumotlarni boshqarish orqali.`,
    exercises: [
    {
      id: 1,
      title: "React isFunctionComponent",
      instruction: "Fiber node funksiyali komponent ekanligini (typeof node.type === 'function') tekshiradigan `isFunctionComponent(fiberNode)` funksiyasini yozing.",
      startingCode: "function isFunctionComponent(fiberNode) {\n  // type xossasini tekshiring\n}",
      hint: "return typeof fiberNode?.type === 'function';",
      test: "if (typeof isFunctionComponent !== 'function') return 'isFunctionComponent topilmadi'; if (isFunctionComponent({ type: () => {} }) !== true) return 'Funksiyali komponent xato topildi'; if (isFunctionComponent({ type: 'div' }) !== false) return 'Oddiy teg rad etilmadi'; return null;"
    },
    {
      id: 2,
      title: "Strict Mode Warning Finder",
      instruction: "Komponent kodi ichida eskirgan `componentWillMount` metodi bor-yo'qligini tekshiradigan `checkDeprecatedMethods(code)` funksiyasini yozing (true/false).",
      startingCode: "function checkDeprecatedMethods(code) {\n  // componentWillMount qidirilishi\n}",
      hint: "return code.includes('componentWillMount');",
      test: "if (typeof checkDeprecatedMethods !== 'function') return 'checkDeprecatedMethods topilmadi'; if (checkDeprecatedMethods('class A { componentWillMount() {} }') !== true) return 'Eskirgan metod aniqlanmadi'; return null;"
    },
    {
      id: 3,
      title: "Ref Bog'lash",
      instruction: "DOM obyektini React `ref` obyektining `current` xossasiga bog'lab qo'yuvchi `assignRef(ref, domNode)` funksiyasini yozing.",
      startingCode: "function assignRef(ref, domNode) {\n  // ref.current-ga yozing\n}",
      hint: "if (ref) ref.current = domNode;",
      test: "if (typeof assignRef !== 'function') return 'assignRef topilmadi'; const r = { current: null }; assignRef(r, 'div'); if(r.current !== 'div') return 'Ref bog\\'lanmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Presentational (Dumb) komponentning asosiy vazifasi nima?",
      options: [
        "API so'rovlarini boshqarish",
        "Props orqali kelgan ma'lumotlarni faqat ekranga chiqarish (UI render)",
        "Global state-ni yangilash",
        "Ma'lumotlar bazasi bilan bog'lanish"
      ],
      correctAnswer: 1,
      explanation: "Dumb komponentlar o'zlarida state va logikani saqlamaydi, faqat props qabul qilib vizual ko'rinishga javob beradi."
    },
    {
      id: 2,
      question: "Smart (Container) komponentlar nima qiladi?",
      options: [
        "Faqat CSS stillarini boshqaradi",
        "Biznes logika, API fetch va state boshqaruvini amalga oshiradi",
        "Faqat rasmlarni render qiladi",
        "HTML-ni to'g'ridan-to'g'ri o'zgartiradi"
      ],
      correctAnswer: 1,
      explanation: "Smart komponentlar ma'lumotlar oqimini boshqaradi va dumb komponentlarga props uzatadi."
    },
    {
      id: 3,
      question: "Feature-based folder structure loyihani qanday tashkil qiladi?",
      options: [
        "Barcha fayllarni bitta papkaga joylaydi",
        "Texnik turlar o'rniga, biznes imkoniyatlari (auth, billing) bo'yicha guruhlaydi",
        "Faqat CSS fayllarni alohida saqlaydi",
        "JavaScript-ni butunlay o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "Feature-based tizim modulli bo'lib, har bir modul o'zining komponentlari, hooklari va servislari bilan alohida yashaydi."
    },
    {
      id: 4,
      question: "Co-location prinsipi nima degani?",
      options: [
        "Barcha rasmlarni bitta bulutda saqlash",
        "Komponentga tegishli bo'lgan stil, test va hooklarni uning yonida (bitta papkada) saqlash",
        "Serverlarni bir xil joyga joylashtirish",
        "Faqat localstorage ishlatish"
      ],
      correctAnswer: 1,
      explanation: "Co-location loyihani tartibli qilish va kerakli fayllarni oson topish uchun komponent fayllarini bir joyda saqlashni bildiradi."
    },
    {
      id: 5,
      question: "Atomic Design tizimidagi 'Atom' komponent nima?",
      options: [
        "Butun sahifa kodi",
        "Eng kichik, boshqa bo'linmaydigan UI elementi (masalan, Input yoki Button)",
        "Faqat animatsiyalar",
        "Node.js server qismi"
      ],
      correctAnswer: 1,
      explanation: "Atomic dizaynda Atom — bu eng kichik va sodda UI g'ishtchasi hisoblanadi."
    },
    {
      id: 6,
      question: "Circular dependency qachon yuzaga keladi?",
      options: [
        "React-ni ikki marta o'rnatganda",
        "Ikki komponent bir-birini aylanma import qilganda",
        "Internet o'chib qolganda",
        "API sekin ishlaganda"
      ],
      correctAnswer: 1,
      explanation: "Aylanma bog'liqlik importlar sikliga sabab bo'lib, runtime-da xatolik yuzaga keltirishi mumkin."
    }
  ]
};

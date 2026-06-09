export const reactProductionArchitecture = {
  id: "reactProductionArchitecture",
  title: "Real Production Arxitekturasi (Separation of Concerns)",
  theory: `## 1. NEGA kerak?
Professional loyihalarni (masalan, 10+ dasturchi ishlayotgan katta tizimlar) boshqarish uchun eng muhim qoida — har bir kod bo'lagining o'z o'rni va vazifasi bo'lishi kerak (**Separation of Concerns**). JSX, API chaqiruvlari, validation va state boshqaruvi bitta faylga aralashtirilsa, loyihani kengaytirib bo'lmaydi va unit test yozish imkonsiz bo'lib qoladi.

## 2. SODDALIK (Analogiya)
Professional restoran oshxonasini tasavvur qiling:
- **UI Komponent (Ofitsiant):** U faqat mijozdan buyurtma oladi va tayyor ovqatni mijozga chiroyli qilib yetkazadi (vizual render). U ovqat qanday pishishini bilmaydi.
- **Custom Hooks (Oshpaz):** U orqa fonda ovqat pishiradi, qanday pishirish (logika) sirlarini ofitsiantdan yashiradi.
- **Service Layer (Mahsulot yetkazib beruvchilar):** Ular bozordan sabzavot va go'sht (API orqali tashqi ma'lumotlar) olib kelib berishadi.

## 3. STRUKTURA VA PRINSIPLAR
- **Separation of Concerns (Vazifalar ajratilishi):**
  - Bitta fayl faqat bitta ish bilan shug'ullanishi kerak. JSX faqat UI-ni chizadi, asinxron logika custom hook ichiga yoziladi, API chaqiruvlari esa alohida service faylga o'tkaziladi.
- **Service Layer Pattern:**
  - API so'rovlarini markazlashtirilgan holda boshqarish (masalan, Axios instance yoki fetch wrapper-lar).
- **Custom Hooks Arxitekturasi:**
  - Biznes logikani komponentdan to'liq ajratib, uni bir nechta komponentlarda qayta ishlata oladigan holga keltirish.
- **Scalable Folder Structure (Feature-based):**
  - Loyihani texnik turlari bo'yicha emas (barcha komponentlar bitta joyda), balki biznes modullari bo'yicha bo'lish (masalan, \`src/features/auth\`, \`src/features/dashboard\`).

## 4. KO‘P UCHRAYDIGAN XATOLAR (Junior Mistakes)
1. **useEffect ichida to'g'ridan-to'g'ri fetch yozish:** Bu kodni qayta ishlatib bo'lmaydigan holga keltirib, testlashni murakkablashtiradi.
2. **JSX ichiga og'ir matematik hisob-kitoblar yoki data formatlashlarni aralashtirib yuborish:** JSX faqat UI shabloniga javob berishi kerak, formatlash helper-larga chiqarilishi shart.

## 5. SAVOLLAR VA JAVOBLAR (Interview Questions)
1. **Separation of Concerns React-da qanday qo'llaniladi?**
   - UI (JSX), Biznes logika (Custom Hooks) va Ma'lumot (Services/API) qatlamlarini bir-biridan mustaqil ajratish orqali.
2. **Nega custom hooklar arxitekturada juda muhim?**
   - Kod takrorlanishini (DRY) oldini oladi va stateful harakatlarni boshqa komponentlarda ham oson ulash imkonini beradi.
3. **Service Layer nima?**
   - API so'rovlari va tarmoq kutubxonalari (Axios) sozlamalari yoziladigan, komponentlardan alohida yashaydigan markaziy qatlam.
4. **Custom hook va oddiy helper (utility) funksiya farqi nima?**
   - Custom hook o'z ichida boshqa React hooklarini (useState, useEffect) ishlata oladi, helper esa oddiy JS funksiyasidir.
5. **Dry (Don't Repeat Yourself) qoidasi React-da qanday buziladi?**
   - Har bir sahifada API so'rovlarni yoki form validation qoidalarini qaytadan yozib chiqish orqali.
6. **Custom hook ichida useEffect yozish yaxshimi yoki komponentdami?**
   - Custom hook ichida yozish afzal, shunda komponent faqat toza natijalarni qabul qiladi va useEffect nojo'ya ta'sirlaridan xoli bo'ladi.
7. **Katta loyihalarda barrel export-lar nega ishlatiladi?**
   - Import yo'llarini qisqartirish va toza yozish uchun (\`import { Button } from '@/components'\`).
8. **Scalable React loyihasining papkalar tuzilishi qanday bo'lishi kerak?**
   - \`src/components\` (umumiy UI), \`src/features\` (biznes modullar), \`src/services\` (API), \`src/hooks\` (global hooklar), \`src/context\` (global state).
9. **Separation of concerns unit-test yozishni qanday osonlashtiradi?**
   - Logikani UI-siz (custom hook), API-ni esa mock ma'lumotlar bilan alohida, juda oddiy sinovdan o'tkazish mumkin bo'ladi.
10. **React-da Container/Presenter andozasini nima almashtirdi?**
    - Custom Hooks arxitekturasi.
11. **React dynamic importlar yordamida bundle-ni qanday optimallashtirgan bo'lar edingiz?**
    - Kam ishlatiladigan feature modullarni (masalan, PDF eksport yoki Admin dashboard) faqat kerak bo'lganda dynamic import yordamida yuklash orqali.
12. **Micro-frontends arxitekturasida React qanday moslashadi?**
    - Web Components yoki Module Federation (Webpack 5) orqali React komponentlarini boshqa tizimlarda ulash orqali.`,
    exercises: [
    {
      id: 1,
      title: "API URL Creator",
      instruction: "Service qatlamida API so'rovlari uchun to'liq URL yaratadigan `createServiceUrl(baseUrl, path, queryParams)` funksiyasini yozing (QueryParams obyekt kalit va qiymatlaridan foydalanib string yarating).",
      startingCode: "function createServiceUrl(baseUrl, path, queryParams) {\n  // queryParams obyektidan URL string yarating\n}",
      hint: "const q = new URLSearchParams(queryParams).toString();\nreturn `${baseUrl}${path}${q ? '?' + q : ''}`;",
      test: "if (typeof createServiceUrl !== 'function') return 'createServiceUrl topilmadi'; const res = createServiceUrl('https://api.com', '/users', { limit: 10 }); if (res !== 'https://api.com/users?limit=10') return 'URL noto\\'g\\'ri formatlandi'; return null;"
    },
    {
      id: 2,
      title: "Custom Hook State Getter/Setter",
      instruction: "Custom hook logikasini simulyatsiya qiluvchi, boshlang'ich qiymat olib, o'zgaruvchi state-ni yopiq saqlagan holda array formatda `[getState, setState]` funksiyalarini qaytaradigan `useCustomState(initialValue)` yozing.",
      startingCode: "function useCustomState(initialValue) {\n  let state = initialValue;\n  // getState va setState-ni qaytaring\n}",
      hint: "const getState = () => state;\nconst setState = (newValue) => { state = newValue; };\nreturn [getState, setState];",
      test: "if (typeof useCustomState !== 'function') return 'useCustomState topilmadi'; const [get, set] = useCustomState(5); if(get() !== 5) return 'Boshlang\\'ich qiymat xato'; set(10); if(get() !== 10) return 'State yangilanmadi'; return null;"
    },
    {
      id: 3,
      title: "Service Response Parser",
      instruction: "API Service qatlamida javob muvaffaqiyatli bo'lsa `response.data` ni qaytaruvchi, aks holda `response.error` ni Error shaklida uloqtiruvchi (throw) `parseApiResponse(response)` funksiyasini yozing.",
      startingCode: "function parseApiResponse(response) {\n  // data yoki error tekshiring\n}",
      hint: "if (response.data) return response.data;\nthrow new Error(response.error || 'Unknown error');",
      test: "if (typeof parseApiResponse !== 'function') return 'parseApiResponse topilmadi'; if(parseApiResponse({ data: 'ok' }) !== 'ok') return 'Data qaytishi xato'; try { parseApiResponse({ error: 'fail' }); } catch(e) { if(e.message === 'fail') return null; } return 'Error otilmadi';"
    }
  ],
  quizzes: [{
      id: 1,
      question: "Separation of Concerns (Vazifalar ajratilishi) prinsipi nima?",
      options: [
        "Loyiha sahifalarini turli serverlarga joylashtirish",
        "Har bir kod bloki faqat bitta aniq vazifaga (UI, logika yoki API) xizmat qilishi",
        "Faqat CSS va HTML fayllarni birlashtirish",
        "Ma'lumotlar bazasini o'chirib yuborish"
      ],
      correctAnswer: 1,
      explanation: "Separation of Concerns har bir fayl yoki modul faqat o'ziga taalluqli vazifani bajarishini ta'minlashni anglatadi."
    },
    {
      id: 2,
      question: "Custom Hook va oddiy helper funksiyaning eng katta farqi nimada?",
      options: [
        "Helper funksiyalar tezroq ishlaydi",
        "Custom Hook o'z ichida boshqa React hooklaridan (useState, useEffect) foydalana oladi",
        "Custom Hook faqat CSS-ni boshqaradi",
        "Ikkalasining hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Custom Hook-da React-ning stateful va lifecycle hooklarini ishlata olish imkoniyati mavjud."
    },
    {
      id: 3,
      question: "API Service Layer nima uchun xizmat qiladi?",
      options: [
        "Sayt tugmalarini chizish uchun",
        "API so'rovlar va tarmoq kutubxonalari sozlamalarini markazlashtirib, komponentlardan ajratish uchun",
        "Rasmlarni yuklash uchun",
        "Faqat CSS-larni boshqarish uchun"
      ],
      correctAnswer: 1,
      explanation: "Service layer tarmoq logikasini yagona joyga to'plab, butun loyiha bo'ylab import qilib ishlatishga imkon beradi."
    },
    {
      id: 4,
      question: "React-da Container/Presenter pattern-ini nima siqib chiqardi?",
      options: [
        "Redux Toolkit",
        "Custom Hooks arxitekturasi",
        "CSS Grid",
        "TypeScript sinflari"
      ],
      correctAnswer: 1,
      explanation: "Custom Hook-lar yordamida logika va UI-ni ajratish ancha osonlashdi, natijada eski Container/Presenter andozasiga ehtiyoj qolmadi."
    },
    {
      id: 5,
      question: "Nega useEffect ichida to'g'ridan-to'g'ri fetch chaqirish production-da tavsiya etilmaydi?",
      options: [
        "Chunki u JS-ni o'chirib qo'yadi",
        "Ushbu kodni boshqa komponentlarda qayta ishlatib bo'lmaydi va test yozish juda qiyinlashadi",
        "Hech qanday farqi yo'q",
        "Faqat CSS-ga zarar beradi"
      ],
      correctAnswer: 1,
      explanation: "Direct fetch kod takrorlanishiga olib keladi. Uni custom hook yoki service layer-ga ko'chirish kerak."
    },
    {
      id: 6,
      question: "Scalable arxitekturadagi 'Barrel export' (index.js) ning zarari nima bo'lishi mumkin?",
      options: [
        "Saytni o'chirib qo'yishi",
        "Circular dependencies (aylanma import) va keraksiz kodlarning yuklanishi (Tree shaking cheklovi)",
        "Hech qanday zarari yo'q",
        "Sana va vaqtni buzishi"
      ],
      correctAnswer: 1,
      explanation: "Agar barrel fayl ichidagi barcha komponentlar bir vaqtda yuklansa, bu tree shaking-ni buzib bundle hajmini oshirishi mumkin."
    },
    {
      id: 7,
      question: "Production arxitekturasida 'Service Layer' modelining eng muhim vazifasi nima?",
      options: [
        "Dizayn stillarini boshqarish",
        "Tarmoq so'rovlarini (Axios/fetch kabi) komponentlar va hooklardan to'liq ajratib, markaziy joyga yig'ish",
        "Database migratsiyalarini qilish",
        "JSX yozish"
      ],
      correctAnswer: 1,
      explanation: "Service Layer barcha API so'rovlarni alohida modullarda saqlashga imkon beradi, bu esa loyihani toza va oson testlanadigan qiladi."
    },
    {
      id: 8,
      question: "React-da logikani komponentga eng yaqin joyda saqlash (Co-location) nimani anglatadi?",
      options: [
        "Hamma kodni App.js faylida saqlash",
        "State va biznes logikani aynan o'sha ma'lumotdan foydalanadigan komponentga imkon qadar yaqin joyda joylashtirish",
        "Kodlarni har xil serverlarga yozish",
        "Bitta faylda faqat CSS saqlash"
      ],
      correctAnswer: 1,
      explanation: "Co-location keraksiz props-drilling va global statelar yuzaga kelishini oldini oladi, kodni oson o'qiladigan qiladi."
    },
    {
      id: 9,
      question: "Custom Hook-lar yozilishi React ilovasini testlashni qanday osonlashtiradi?",
      options: [
        "Ular testlarni tezlashtiradi",
        "Hech qanday UI komponentni chizmasdan (render qilmasdan), biznes logikani alohida (isolation) testlash imkonini beradi",
        "Linter xatolarini o'chiradi",
        "Database-ni test qiladi"
      ],
      correctAnswer: 1,
      explanation: "Custom hook faqat funksiya bo'lgani sababli, `@testing-library/react-hooks` orqali uning holatlari UI-siz sinovdan o'tkaziladi."
    },
    {
      id: 10,
      question: "Feature-based papkalar tuzilishidagi `index.js` (barrel) ning vazifasi nima?",
      options: [
        "Node serverini ishga tushirish",
        "Feature modulining 'Public API' si vazifasini bajarib, tashqariga faqat ruxsat etilgan komponent va hooklarni eksport qilish",
        "CSS-ni sozlash",
        "Kodni tozalash"
      ],
      correctAnswer: 1,
      explanation: "Index.js feature modulining tashqi dunyo bilan bog'lanadigan yagona eshigi (interface) bo'lib xizmat qiladi."
    },
    {
      id: 11,
      question: "React-da DRY (Don't Repeat Yourself) prinsipining ma'nosi nima?",
      options: [
        "Kodni kommentlarsiz yozish",
        "Takrorlanuvchi UI qismlari, biznes logikalari yoki API chaqiruvlarini alohida komponent, hook va helper funksiyalarga chiqarish",
        "Har soatda build qilish",
        "Fayllarni quruq saqlash"
      ],
      correctAnswer: 1,
      explanation: "Takrorlanuvchi logikani bitta umumiy funksiya yoki hook ichiga yozib, hamma joyda o'shani import qilib ishlatish DRY hisoblanadi."
    },
    {
      id: 12,
      question: "Ma'lumot olish uchun custom hook ishlatish qanday qilib 'Separation of Concerns' ga mos keladi?",
      options: [
        "Kodni tezroq compile qiladi",
        "Komponentning JSX qismini toza saqlab, loading, error va fetch holatlarini to'liq komponentdan yashiradi",
        "Bazaga to'g'ridan-to'g'ri bog'laydi",
        "Faqat CSS-ga stil beradi"
      ],
      correctAnswer: 1,
      explanation: "UI komponent faqat ma'lumotni render qilish bilan shug'ullanadi, hook esa orqa fondagi so'rovlar logikasiga javob beradi."
    }
  ]
};

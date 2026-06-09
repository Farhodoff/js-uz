export const reactAdvancedPerformance = {
  id: "reactAdvancedPerformance",
  title: "Murakkab Performance va Profiler",
  theory: `## 1. NEGA kerak?
Ilovaning sekinlashish sabablarini aniq topish uchun ko'r-ko'rona kod yozish yetarli emas. Profiler yordamida render vaqtlarini o'lchash, input va scroll hodisalarini debounce/throttle orqali nazorat qilish, va minglab qatorli ma'lumotlarni virtualizatsiya yordamida optimallashtirish professional front-end arxitekturasining asosidir.

## 2. SODDALIK (Analogiya)
Siz mashinada ketyapsiz va dvigatelda muammo borligini sezyapsiz:
- **Profiler:** Mashinani kompyuter tekshiruvidan o'tkazish. U qaysi silindr (komponent) qizib ketayotganini aniq grafikda ko'rsatadi.
- **Debounce:** Siz liftdasiz. Har yangi odam kelganda lift eshigi darhol yopilib yuravermaydi. Lift oxirgi odam kelganidan keyin 3 soniya kutadi (debounce) va keyin yuradi.
- **Throttle:** Suv tomchilari krandan har 1 soniyada 1 marta tomadi. Siz kranni tez burasangiz ham, suv tomishi tezlashib ketmaydi.

## 3. STRUKTURA VA PRINSIPLAR
- **React DevTools Profiler:**
  - Komponentlar render bo'lishiga qancha vaqt sarflaganini va nima sababdan render bo'lganini flame-chart va rank-chart shaklida ko'rsatuvchi vosita.
- **Debounce va Throttle:**
  - **Debounce:** Ketma-ket kelayotgan so'rovlarni bitta qilib, oxirgisidan so'ng belgilangan vaqt kutib ishga tushirish (masalan, input qidiruv oynasi).
  - **Throttle:** Qanchalik ko'p hodisa sodir bo'lishidan qat'iy nazar, uni ma'lum bir intervalda faqat 1 marta bajarish (masalan, scroll, drag-and-drop).
- **Virtualizatsiya (Windowing):**
  - Katta massivlar (masalan, 10 000 ta qator) render bo'layotganda faqatgina ekranda ko'rinib turgan 10-15 ta qatorni render qilish va qolganlarini scroll holatiga qarab chizib borish.

## 4. KO‘P UCHRAYDIGAN XATOLAR (Junior Mistakes)
1. **Debounce-ni useEffect cleanup-siz yozish:** Eski timeoutlarni o'chirmaslik (clearTimeout qilmaslik) xotira sizib chiqishiga (memory leak) olib keladi.
2. **Qidiruv inputiga har bir harf yozilganda API so'rov yuborish:** Bu serverni keraksiz so'rovlar bilan band qiladi (DDOS yuzaga keladi).

## 5. SAVOLLAR VA JAVOBLAR (Interview Questions)
1. **Profiler nima uchun ishlatiladi?**
   - React komponentlarining qaysi biri necha millisoniyada va nima sababdan render bo'lganini vizual tahlil qilish uchun.
2. **Debounce va Throttle farqi nimada?**
   - Debounce harakat to'xtaganidan keyin ishlaydi, Throttle esa belgilangan vaqt ichida faqat 1 marta ishlashga ruxsat beradi.
3. **useDeferredValue va useTransition hook-lari nima?**
   - React 18 dagi hooklar bo'lib, ular og'ir UI yangilanishlarini pastroq ustuvorlikda (low priority) fonda bajarib, asosiysini qotmasligini ta'minlaydi.
4. **Virtualizatsiya qanday ishlaydi?**
   - Ekranda ko'rinmaydigan minglab elementlarni DOM-dan chiqarib yuboradi va faqat foydalanuvchi ko'rib turgan qismini chizadi.
5. **Virtualizatsiya uchun qaysi mashhur kutubxonalarni bilasiz?**
   - \`react-window\`, \`react-virtualized\` va \`react-virtuoso\`.
6. **Lighthouse React performance-ga qanday baho beradi?**
   - Bundle hajmi, birinchi sahifa chizilishi (FCP) va interaktivlik vaqti (TTI) ko'rsatkichlarini o'lchash orqali.
7. **Stale Closure muammosi custom hook-da qanday hal qilinadi?**
   - Callback funksiyaning dependency massiviga uning ichida ishlatilgan barcha o'zgaruvchilarni to'g'ri qo'shish orqali.
8. **React-da scroll eventlarini eshitganda qaysi texnika eng yaxshi?**
   - Throttle ishlatish orqali so'rovlar sonini kamaytirish.
9. **Profiler-dagi 'Flame chart' va 'Ranked chart' farqi nima?**
   - Flame chart komponentlar daraxti bo'yicha vaqtni ko'rsatadi, Ranked chart esa eng ko'p vaqt sarflagan komponentlarni tepaga chiqarib beradi.
10. **useId nima va u qachon kerak?**
    - Server va client renderida bir xil unikal ID-lar hosil qilib, HTML gidratsiya (hydration) xatolarining oldini olish uchun.
11. **Profiler-ni production buildda ishlatsa bo'ladimi?**
    - Default holatda yo'q, lekin maxsus profile flag (\`--profile\`) orqali yoqish mumkin.
12. **Concurrency nima?**
    - React 18 ning parallel rendering qilish va foydalanuvchi kiritayotgan yangi ma'lumotga ko'ra eski render jarayonini to'xtatish imkoniyati.`,
    exercises: [
    {
      id: 1,
      title: "Simple Debounce Funksiyasi",
      instruction: "Ketma-ket chaqirilganda faqat oxirgi chaqiruvdan keyin belgilangan vaqt o'tgach bajariladigan `simpleDebounce(fn, delay)` decorator funksiyasini yozing.",
      startingCode: "function simpleDebounce(fn, delay) {\n  let timeoutId;\n  return function (...args) {\n    // clearTimeout va setTimeout yozing\n  };\n}",
      hint: "clearTimeout(timeoutId);\ntimeoutId = setTimeout(() => fn(...args), delay);",
      test: "if (typeof simpleDebounce !== 'function') return 'simpleDebounce topilmadi'; let count = 0; const debounced = simpleDebounce(() => count++, 50); debounced(); debounced(); setTimeout(() => { if (count !== 1) throw new Error('Debounce xato'); }, 100); return null;"
    },
    {
      id: 2,
      title: "Simple Throttle Funksiyasi",
      instruction: "Belgilangan vaqt oralig'ida funksiyaning faqat 1 marta chaqirilishini ta'minlovchi `simpleThrottle(fn, limit)` funksiyasini yozing.",
      startingCode: "function simpleThrottle(fn, limit) {\n  let inThrottle;\n  return function (...args) {\n    // inThrottle orqali cheklang\n  };\n}",
      hint: "if (!inThrottle) {\n      fn(...args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }",
      test: "if (typeof simpleThrottle !== 'function') return 'simpleThrottle topilmadi'; let count = 0; const throttled = simpleThrottle(() => count++, 50); throttled(); throttled(); if (count !== 1) return 'Throttle sinovi boshida bajarilmadi'; return null;"
    },
    {
      id: 3,
      title: "Pagination Slicer",
      instruction: "Katta ro'yxatlarni bo'laklab ko'rsatish uchun `paginateList(list, page, pageSize)` funksiyasini yozing (page: 1-indexed).",
      startingCode: "function paginateList(list, page, pageSize) {\n  // list massivini slice qiling\n}",
      hint: "const start = (page - 1) * pageSize;\nreturn list.slice(start, start + pageSize);",
      test: "if (typeof paginateList !== 'function') return 'paginateList topilmadi'; const list = [1, 2, 3, 4, 5]; const res = paginateList(list, 2, 2); if(res.length !== 2 || res[0] !== 3) return 'Pagination slice noto\\'g\\'ri'; return null;"
    }
  ],
  quizzes: [{
      id: 1,
      question: "Debounce va Throttle o'rtasidagi asosiy farq nima?",
      options: [
        "Debounce faqat CSS-da, Throttle esa JS-da ishlaydi",
        "Debounce harakat to'xtashini kutib, keyin bajaradi; Throttle esa harakat davom etsa ham ma'lum vaqt oralig'ida bajarilaveradi",
        "Throttle server so'rovlarini butunlay to'xtatadi",
        "Ikkalasi mutlaqo bir xil narsadir"
      ],
      correctAnswer: 1,
      explanation: "Debounce tugagandan keyin ishlaydi (masalan input yozib tugatilganda), Throttle esa cheklovchi kran kabi tezlikni ma'lum vaqt oralig'iga soladi (masalan scroll paytida)."
    },
    {
      id: 2,
      question: "Virtualizatsiya (Windowing) texnikasining asosiy vazifasi nima?",
      options: [
        "Sahifani yangilash",
        "Faqat ekranda ko'rinib turgan cheklangan qatorlarni chizish orqali minglab elementlar renderini tezlashtirish",
        "Rasm hajmini avtomatik kichraytirish",
        "Dasturni PWA rejimiga o'tkazish"
      ],
      correctAnswer: 1,
      explanation: "Virtualizatsiya minglab elementlar bo'lgan taqdirda ham, DOM ichida faqat foydalanuvchiga ko'rinayotgan 10-20 ta qatorni ushlab turadi."
    },
    {
      id: 3,
      question: "Profiler yordamida nimalarni bilib olish mumkin?",
      options: [
        "Loyiha necha qator koddan iboratligini",
        "Komponent render vaqtlari, necha marta render bo'lgani va render sabablarini",
        "Serverdagi xatoliklarni",
        "CSS animatsiya turlarini"
      ],
      correctAnswer: 1,
      explanation: "Profiler - bu React ilovasi tezligini tekshirish uchun mo'ljallangan maxsus diagnostika asbobidir."
    },
    {
      id: 4,
      question: "React 18 dagi `useTransition` nima uchun xizmat qiladi?",
      options: [
        "Saytni o'chirish uchun",
        "State yangilanishini 'low priority' qilib belgilash va interfeys qotib qolishini oldini olish uchun",
        "CSS transitions qo'shish uchun",
        "Ma'lumotlar bazasini yangilash uchun"
      ],
      correctAnswer: 1,
      explanation: "useTransition og'ir renderlarni (masalan katta list qidirish) orqa fonga surib, foydalanuvchi kiritayotgan input tezligini qotib qolishdan himoya qiladi."
    },
    {
      id: 5,
      question: "Nega asinxron input qidiruvda debounce ishlatish shart?",
      options: [
        "Chunki JS shuni talab qiladi",
        "Har bir harf yozilganda serverga yuzlab API so'rov yuborib uni yuklab yubormaslik uchun",
        "Faqat chiroyli dizayn uchun",
        "Saytni oflayn rejimda ishlatish uchun"
      ],
      correctAnswer: 1,
      explanation: "Debounce qidiruv tugaguncha so'rov yuborishni kechiktirib turadi va server hamda brauzer resurslarini tejaydi."
    },
    {
      id: 6,
      question: "Profiler tab-idagi 'Ranked Chart' ma'lumotlarni qanday ko'rsatadi?",
      options: [
        "Alifbo tartibida",
        "Eng ko'p vaqt sarflagan (eng sekin) komponentlarni tepaga saralab beradi",
        "Faqat ranglarini o'zgartiradi",
        "Hech qanday ma'lumot bermaydi"
      ],
      correctAnswer: 1,
      explanation: "Ranked chart eng og'ir va ko'p vaqt olgan komponentlarni birinchi bo'lib vizual ko'rsatib, optimallash kerak bo'lgan joyni aniqlaydi."
    },
    {
      id: 7,
      question: "Profiler tab-idagi 'Flame Chart' nima vazifani bajaradi?",
      options: [
        "Xatoliklarni qizil rangda ko'rsatish",
        "Komponentlar daraxtining ierarxiyasini va har bir komponent renderiga ketgan aniq vaqtni vizual grafikda ko'rsatish",
        "Xotira hajmini ko'rsatish",
        "CSS animatsiya grafigi"
      ],
      correctAnswer: 1,
      explanation: "Flame chart komponentlarning joylashuv tartibida ularning render vaqtini ranglar bilan (og'ir renderlar sariq/olovrang) ko'rsatadi."
    },
    {
      id: 8,
      question: "`useDeferredValue` hook-ining asosiy vazifasi nima?",
      options: [
        "Qiymatlarni butunlay o'chirish",
        "Muhimroq o'zgarishlar (masalan input yozilishi) yakunlanguniga qadar og'ir state qiymatini yangilashni kechiktirish",
        "API chaqiruvini tezlashtirish",
        "Cookie-da qiymat saqlash"
      ],
      correctAnswer: 1,
      explanation: "useDeferredValue state o'zgarishini pastroq priorityga surib, foydalanuvchi kiritayotgan yozuvlarning silliq yozilishini ta'minlaydi."
    },
    {
      id: 9,
      question: "Foydalanuvchi sahifani scroll qilganda har bir pikselda state-ni yangilash performance-ga qanday ta'sir qiladi?",
      options: [
        "Scroll harakatini silliq qiladi",
        "Soniyasiga yuzlab re-render chaqirib, sahifaning qattiq qotishiga (lag) olib keladi",
        "Hech qanday ta'sir qilmaydi",
        "Saytni tezlashtiradi"
      ],
      correctAnswer: 1,
      explanation: "State-ni juda tez o'zgartirish brauzerga og'ir yuk bo'ladi. Bunday hollarda harakatni throttle yordamida cheklash shart."
    },
    {
      id: 10,
      question: "Inputga yozib bo'lgach mahalliy ro'yxatni qidirib filterlaydigan tizimda qaysi texnika eng ma'qul?",
      options: [
        "Throttle",
        "Debounce",
        "Code splitting",
        "SSG"
      ],
      correctAnswer: 1,
      explanation: "Debounce foydalanuvchi yozishdan to'xtagachgina hisob-kitob qilish yoki qidiruvni boshlash uchun eng mukammal yechimdir."
    },
    {
      id: 11,
      question: "Nima uchun useEffect ichidagi taymerlarni (timeout) cleanup funksiyasida tozalash kerak?",
      options: [
        "Chunki JS shuni majburlaydi",
        "Tozalanmagan timeoutlar komponent o'chgandan keyin ham orqa fonda ishlab, xotira sizib chiqishiga (memory leak) sabab bo'ladi",
        "Dastur darhol to'xtab qolmasligi uchun",
        "Faqat CSS-ga ta'sir qiladi"
      ],
      correctAnswer: 1,
      explanation: "Cleanup funksiyasi komponent unmount bo'lganda ishlamay qolgan taymerlarni o'chirib, xotirani bo'shatadi."
    },
    {
      id: 12,
      question: "Scroll paytida 'Virtualizatsiya' nima ishni amalga oshiradi?",
      options: [
        "Sahifani to'liq yuklaydi",
        "Ekranga ko'rinmay qolgan DOM elementlarini o'chirib, yangi ko'rinayotgan elementlarni dinamik ravishda chizib boradi",
        "CSS faylini yangilaydi",
        "Faqat backend bazasini tekshiradi"
      ],
      correctAnswer: 1,
      explanation: "Virtualizatsiya scroll qilinganda faqat ko'rinib turgan satrlarni render qilib, qolganlarini DOM-dan o'chirib turadi."
    }
  ]
};

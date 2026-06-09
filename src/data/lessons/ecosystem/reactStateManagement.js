export const reactStateManagement = {
  id: "reactStateManagement",
  title: "State Management Arxitekturasi",
  theory: `## 1. NEGA kerak?
React ilovalarida ma'lumotlar oqimi (data flow) tepadan pastga (unidirectional) yo'naltirilgan bo'ladi. Katta loyihalarda komponentlar daraxti murakkablashgani sari local state yetarli bo'lmaydi va ma'lumotlarni turli joylarga uzatish muammoga aylanadi. To'g'ri state management texnikalarini qo'llash tizim xotirasi va tezligini sezilarli yaxshilaydi.

## 2. SODDALIK (Analogiya)
- **Local State (useState):** Sizning **shaxsiy hamyoningiz**. Faqat o'zingiz pulingizni saqlaysiz va boshqarasiz.
- **Props Drilling:** 5-qavatdagi do'stingizga pul uzatish uchun har bir qavatdagi odamlardan pulni navbatma-navbat uzatishni iltimos qilish.
- **Global State (Zustand/Redux):** Oshxonadagi **umumiy muzlatgich**. Istalgan oila a'zosi kelib undan mahsulot olishi yoki qo'yishi mumkin. Hech kim o'rtada elchilik qilmaydi.

## 3. STRUKTURA VA PRINSIPLAR
- **Qachon qaysi state management?**
  - **Local State (\`useState\`, \`useReducer\`):** Component-ga xos form inputlar, toggle-lar kabi UI holatlar uchun.
  - **Context API:** Kam o'zgaruvchan global ma'lumotlar (Theme, Til, User Session) uchun.
  - **Zustand / Redux / Jotai:** Tez-tez o'zgaruvchan global ma'lumotlar (Shopping Cart, Chat, Dashboard datalar) uchun.
- **Immutability (O'zgarmaslik):**
  - React-da state obyektlarini to'g'ridan-to'g'ri o'zgartirish (\`state.push(item)\`) re-render chaqirmaydi, chunki reference (manzil) o'zgarmaydi. Har doim yangi nusxa (\`[...state, item]\`) qaytarish shart.

## 4. KO‘P UCHRAYDIGAN XATOLAR (Junior Mistakes)
1. **Barcha state-larni global qilish:** Faqat bir joyda ishlatiladigan input qiymatini ham Zustand/Redux-ga yozish keraksiz yuklama hosil qiladi.
2. **Context API-ni og'ir datalar uchun ishlatish:** Context-dagi bitta qiymat o'zgarganda, unga ulangan barcha bolalar keraksiz qayta chiziladi (unnecessary re-render).

## 5. SAVOLLAR VA JAVOBLAR (Interview Questions)
1. **Local state va Global state qachon ishlatiladi?**
   - Agar ma'lumot faqat bitta komponent va uning bolalariga kerak bo'lsa local, agar uzoq komponentlarga ham kerak bo'lsa global.
2. **Props drilling nima va uni qanday hal qilish mumkin?**
   - Props-larni ko'p qavatli komponentlardan pastga uzatish muammosi. Uni Context API yoki Global State kutubxonalari bilan hal qilinadi.
3. **Context API nima va u state manager-mi?**
   - Yo'q, Context faqat ma'lumotni uzatuvchi (dependency injection) vositadir, state-ni boshqarish uchun baribir local hooks ishlatiladi.
4. **Zustand nega Redux-dan osonroq?**
   - Boilerplate kodi juda kam, Context Provayderlarsiz ishlaydi va selector-lar orqali re-renderlarni cheklaydi.
5. **Redux-da 'Reducer' nima?**
   - State va Action qabul qilib, mutlaqo yangi o'zgarmas (immutable) state qaytaruvchi toza funksiya.
6. **State Mutation nima va u nega yomon?**
   - State-ni to'g'ridan-to'g'ri o'zgartirish. React reference-ni tekshirgani sababli, mutation render bo'lmasligiga olib keladi.
7. **Jotai yoki Recoil kabi Atomic state management qanday ishlaydi?**
   - State-ni kichik atomlarga ajratadi. Komponent faqat o'zi bog'langan atom o'zgarganda render bo'ladi.
8. **Context API-da keraksiz re-renderlarni qanday kamaytirsa bo'ladi?**
   - Provayder qiymatini \`useMemo\` ga o'rash yoki Context-ni o'qish/yozish uchun alohida ikkiga bo'lish.
9. **Single source of truth prinsipi nima?**
   - Butun ilova holatining (state) bitta markaziy va ziddiyatsiz manbaga ega bo'lishi.
10. **Redux Toolkit (RTK) nima uchun yaratilgan?**
    - Redux-ning standart yozilishini osonlashtirish, ichida asinxron ishlar (Thunk) va oson state-mutation (Immer) ni ta'minlash uchun.
11. **Server state va Client state farqi nima?**
    - Server state asosan keshlar, server ma'lumotlarini sinxronlash (React Query) bilan, client state esa brauzer UI holatlari bilan ishlaydi.
12. **Zustand-da asinxron actions qanday yoziladi?**
    - Thunk-larsiz, store ichida oddiy asinxron funksiyani yozib \`set\` orqali state-ni yangilash mumkin.`,
    exercises: [
    {
      id: 1,
      title: "Immutable List Adder",
      instruction: "Massiv ko'rinishidagi state-ga element qo'shish uchun massivni o'zgartirmasdan (immutable) yangi massiv qaytaruvchi `addItem(state, item)` funksiyasini yozing.",
      startingCode: "function addItem(state, item) {\n  // Spread operator orqali yozing\n}",
      hint: "return [...state, item];",
      test: "if (typeof addItem !== 'function') return 'addItem topilmadi'; const s = [1, 2]; const res = addItem(s, 3); if(s.length !== 2) return 'Asl state o\\'zgartirildi (mutated)'; if(res[2] !== 3) return 'Yangi element qo\\'shilmadi'; return null;"
    },
    {
      id: 2,
      title: "Immutable Object Updater",
      instruction: "User obyektini o'zgartirmasdan (immutable), uning yoshini (`age`) yangi qiymatga o'zgartirib qaytaruvchi `updateUserAge(user, newAge)` funksiyasini yozing.",
      startingCode: "function updateUserAge(user, newAge) {\n  // user obyektini o'zgartirmasdan yozing\n}",
      hint: "return { ...user, age: newAge };",
      test: "if (typeof updateUserAge !== 'function') return 'updateUserAge topilmadi'; const u = { name: 'Ali', age: 20 }; const res = updateUserAge(u, 21); if(u.age !== 20) return 'Asl obyekt o\\'zgartirildi'; if(res.age !== 21) return 'Yosh yangilanmadi'; return null;"
    },
    {
      id: 3,
      title: "Store Merger",
      instruction: "Ikkita do'kon obyektlarini birlashtirib qaytaruvchi `combineStores(storeA, storeB)` funksiyasini yozing.",
      startingCode: "function combineStores(storeA, storeB) {\n  // Obyektlarni birlashtiring\n}",
      hint: "return { ...storeA, ...storeB };",
      test: "if (typeof combineStores !== 'function') return 'combineStores topilmadi'; const a = { x: 1 }; const b = { y: 2 }; const res = combineStores(a, b); if(res.x !== 1 || res.y !== 2) return 'Birlashtirishda xato'; return null;"
    }
  ],
  quizzes: [{
      id: 1,
      question: "Nega array state-ga `state.push(item)` deb to'g'ridan-to'g'ri element qo'shish tavsiya etilmaydi?",
      options: [
        "Chunki bu JS sintaksisi emas",
        "Chunki u xotira manzilini (reference) o'zgartirmaydi va React re-render qilmaydi",
        "Faqat CSS-ga zarar beradi",
        "React-da push metodi butunlay o'chirilgan"
      ],
      correctAnswer: 1,
      explanation: "React elementlarning o'zgarganini xotira havolasini solishtirish orqali biladi. Obyekt mutatsiya qilinganda reference o'zgarmasdan qoladi."
    },
    {
      id: 2,
      question: "Props drilling muammosini qanday hal qilish mumkin?",
      options: [
        "Faqat bitta faylga yozib chiqish orqali",
        "Context API yoki global state manager (Zustand, Redux) ishlatish orqali",
        "CSS flexbox yordamida",
        "Node.js serverini qayta yoqish orqali"
      ],
      correctAnswer: 1,
      explanation: "Context API va global do'konlar ma'lumotni to'g'ridan-to'g'ri kerakli komponentga uzatishga imkon beradi, o'rta qatlamlarni aylanib o'tadi."
    },
    {
      id: 3,
      question: "Context API-dan qachon foydalanish eng to'g'ri hisoblanadi?",
      options: [
        "Tez o'zgaruvchan murakkab o'yin statelari uchun",
        "Kam o'zgaruvchan global ma'lumotlar (Theme, Til, Autentifikatsiya holati) uchun",
        "Har soniyada API-dan ma'lumot olganda",
        "Faqat HTML input qiymatlarini saqlashda"
      ],
      correctAnswer: 1,
      explanation: "Context tez o'zgarsa, provayder ichidagi barcha komponentlar qayta render bo'ladi. Shuning uchun u kam yangilanadigan ma'lumotlar uchun mos keladi."
    },
    {
      id: 4,
      question: "Redux-dagi 'Single Source of Truth' nima degani?",
      options: [
        "Barcha kodlar bitta faylda bo'lishi",
        "Ilovaning barcha global holati (state) bitta markaziy store-da saqlanishi",
        "Saytda faqat bitta sahifa borligi",
        "API ma'lumotlarini bir marta olish"
      ],
      correctAnswer: 1,
      explanation: "Bu prinsip ilova holatini markaziy va bir joyda xatolarsiz, toza boshqarishni ta'minlaydi."
    },
    {
      id: 5,
      question: "Zustand-da selectordan foydalanish maqsadi nima?",
      options: [
        "Stil tanlash",
        "Komponentga faqat kerakli state qiymatini olib kelish va ortiqcha renderlarni oldini olish",
        "API so'rov yuborish",
        "Database-dan jadval tanlash"
      ],
      correctAnswer: 1,
      explanation: "Selector yordamida komponent faqat o'ziga kerakli state bo'lagiga obuna bo'ladi, qolgan o'zgarishlarda u qayta render bo'lmaydi."
    },
    {
      id: 6,
      question: "Redux Toolkit (RTK) qaysi kutubxona yordamida obyektlarni 'mutatsiya' qilish imkonini beradi?",
      options: [
        "React Query",
        "Immer.js",
        "Axios",
        "Lodash"
      ],
      correctAnswer: 1,
      explanation: "RTK ichida Immer.js ishlaydi. U koddagi o'zgartirishlarni (state.user.age = 20) fonda avtomatik tarzda immutable shaklga aylantiradi."
    },
    {
      id: 7,
      question: "React-da 'State' tushunchasi o'zi nima?",
      options: [
        "Brauzerning offline kesh xotirasi",
        "Komponentning o'zgaruvchan local xotirasi",
        "CSS animatsiyalari to'plami",
        "Serverdan kelgan statik HTML fayl"
      ],
      correctAnswer: 1,
      explanation: "State - bu komponent ichida saqlanadigan va u o'zgarganda komponentni qayta chizadigan (re-render) ma'lumotdir."
    },
    {
      id: 8,
      question: "Zustand global state manager Context API-dan qanday qilib yaxshiroq ishlaydi?",
      options: [
        "U brauzerda ishlamaydi",
        "Selector obunalari orqali faqatgina o'zgargan state qiymatini olgan komponentlarni render qiladi",
        "U Virtual DOM-ni chetlab o'tadi",
        "U CSS o'zgaruvchilari orqali ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Zustand selectorlar bilan komponentlarni bog'laydi. Context-dan farqli o'laroq, keraksiz komponentlar re-render bo'lmaydi."
    },
    {
      id: 9,
      question: "Redux Middleware-ning asosiy vazifasi nima?",
      options: [
        "Komponentlarni bezash",
        "Action-lar reducer-ga yetib borguncha ularni ushlab, asinxron API yoki log yozish ishlarini bajarish",
        "HTML teglari yaratish",
        "Sayt tezligini o'lchash"
      ],
      correctAnswer: 1,
      explanation: "Middleware (masalan Thunk) Redux oqimini kengaytirib, asinxron harakatlarni boshqarishga yordam beradi."
    },
    {
      id: 10,
      question: "Jotai/Recoil atomic state manager-larning eng muhim xususiyati nima?",
      options: [
        "Hamma state-ni bitta katta obyektda saqlashi",
        "Global state-ni komponentlar to'g'ridan-to'g'ri obuna bo'la oladigan mustaqil 'atom'larga bo'lib tashlashi",
        "Faqat server logikasini yozishi",
        "CSS-ni avtomatik generatsiya qilishi"
      ],
      correctAnswer: 1,
      explanation: "Atomic yondashuvda global state atomlarga bo'linadi va faqat o'sha atom o'zgarganda unga bog'langan komponent re-render bo'ladi."
    },
    {
      id: 11,
      question: "Nega form inputlaridagi tezkor o'zgaruvchan state-larni Zustand/Redux-ga yozish tavsiya etilmaydi?",
      options: [
        "Chunki global store string-larni tushunmaydi",
        "Har bir harf yozilganda global store yangilanib, butun sahifa komponentlarini keraksiz qayta render qilmasligi uchun",
        "Inputlar faqat local state bilan ishlay olgani uchun",
        "Bu xavfsizlikka zarar keltirgani uchun"
      ],
      correctAnswer: 1,
      explanation: "Input holatlari local bo'lgani afzal. Bo'lmasa, har safar harf kiritilganda global o'zgarish sodir bo'ladi va butun ilova sekinlashadi."
    },
    {
      id: 12,
      question: "State Management-dagi 'Immutable State' atamasi nimani anglatadi?",
      options: [
        "Hech qachon o'zgartirib bo'lmaydigan state",
        "State obyektini to'g'ridan-to'g'ri o'zgartirmasdan, har doim yangi nusxa (copy) yaratish orqali yangilash yondashuvi",
        "Serverda saqlanadigan ma'lumotlar",
        "Faqat CSS o'zgaruvchilari"
      ],
      correctAnswer: 1,
      explanation: "Immutable yondashuvda eski obyekt o'zgartirilmaydi, balki spread operator yordamida uning nusxasi olinib yangilanadi."
    }
  ]
};

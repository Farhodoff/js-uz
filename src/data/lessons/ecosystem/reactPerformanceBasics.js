export const reactPerformanceBasics = {
  id: "reactPerformanceBasics",
  title: "React Performance Asoslari",
  theory: `## 1. NEGA kerak?
React asosan tez ishlash uchun mo'ljallangan, lekin noto'g'ri yozilgan kod uni tez sekinlashtiradi. Komponent qachon va nega qayta render bo'lishini tushunish, loyiha kattalashgani sari foydalanuvchi interfeysi silliq va qotmasdan ishlashini ta'minlash uchun juda zarur.

## 2. SODDALIK (Analogiya)
Siz uyingizdagi stolning joyini o'zgartirmoqchisiz:
- **Haqiqiy DOM (Real DOM):** Butun uyni buzib, stolni yangi joyga qo'yib, uyni noldan qayta qurish. Bu juda og'ir va vaqt oladi.
- **Virtual DOM:** Uyingizning xotiradagi **kichik 3D maketi**. Siz stolni avval maketda surib ko'rasiz.
- **Reconciliation & Diffing:** Eski va yangi maketni solishtirib, faqatgina stolning joyi o'zgarganini ko'rish va haqiqiy uyga borib, faqat stolni siljitib qo'yish.

## 3. STRUKTURA VA PRINSIPLAR
- **Nega React sekinlashadi?**
  - Parent (ota) komponent render bo'lganda, uning barcha child (bola) komponentlari ham avtomatik render bo'ladi. Agar bolalar og'ir bo'lsa, butun sahifa qotadi.
- **Reconciliation:**
  - React-ning Virtual DOM va Real DOM-ni solishtirib, o'zgarishlarni real sahifaga eng kam amallar bilan o'tkazish jarayoni.
- **Diffing Algoritmi:**
  - O(N) vaqtda ishlaydigan algoritm bo'lib, quyidagi qoidalarga tayanadi:
    1. Agar element turi o'zgarsa (div -> span), React butun tarmoqni noldan qayta quradi.
    2. Bir xil turdagi elementlarda faqat o'zgargan xususiyatlar yangilanadi.

## 4. KO‘P UCHRAYDIGAN XATOLAR (Junior Mistakes)
1. **Virtual DOM hamma narsani hal qiladi deb o'ylash:** Virtual DOM ham operativ xotirada (RAM) saqlanadi. Agar minglab komponentlar keraksiz render bo'lsa, diffing hisobining o'zi ham brauzerni qotirib qo'yadi.
2. **State-larni keraksiz yuqoriga ko'tarish:** Ikkala komponent ishlatsa bo'ldi deb state-ni eng yuqori App.jsx-ga qo'yib yuborish, har safar butun sayt render bo'lishiga sabab bo'ladi.

## 5. SAVOLLAR VA JAVOBLAR (Interview Questions)
1. **Virtual DOM nima va u nega tez?**
   - Haqiqiy DOM ning xotiradagi yengil JavaScript ob'ektlari ko'rinishidagi nusxasi. U brauzer layout reflow ishlarini bajarmagani uchun juda tez.
2. **Reconciliation nima?**
   - Virtual DOM-dagi o'zgarishlarni real DOM bilan solishtirib, eng qisqa yo'l bilan yangilash jarayoni.
3. **Diffing algoritmi qanday ishlaydi?**
   - O(N) murakkablikda ishlaydigan algoritm bo'lib, u ikki daraxtni darajama-daraja solishtiradi va farqli bo'laklarni aniqlaydi.
4. **React Fiber nima?**
   - React 16 da kiritilgan rendering dvigateli. U render jarayonini bo'laklab, brauzerning asosiy oqimini (Main Thread) bloklamaslik imkonini beradi.
5. **Re-render jarayoni qanday bosqichlardan iborat?**
   - Render Phase (Virtual DOM hisoblash - asinxron) va Commit Phase (Real DOM-ga yozish - sinxron).
6. **Parent render bo'lsa child ham render bo'lishi shartmi?**
   - Ha, React-ning standart ishlash qoidasi shunday. Buning oldini olish uchun memoization asboblari ishlatiladi.
7. **Virtual DOM real DOM-dan har doim tezroqmi?**
   - Yo'q, agar o'zgarishlar juda kam va sodda bo'lsa, to'g'ridan-to'g'ri DOM-ga yozish Virtual DOM diffingidan tezroq bo'lishi mumkin.
8. **React 18 Concurrent Mode nima?**
   - React-ning bir vaqtda bir nechta UI versiyalarini tayyorlash va orqa fonda render ishlarini to'xtatib-davom ettirish qobiliyati.
9. **Batching nima?**
   - Bir nechta state yangilanishlarini bitta re-renderga guruhlash (React 18 da bu avtomatik ishlaydi).
10. **Svelte yoki SolidJS nega Virtual DOM ishlatmaydi?**
    - Ular kompilyatsiya vaqtida kodni to'g'ridan-to'g'ri real DOM-ni yangilaydigan targetlangan JS kodiga aylantirib yuboradi.
11. **Render Phase va Commit Phase farqi nima?**
    - Render Phase xavfsiz to'xtatilishi mumkin, Commit Phase esa to'xtatilmaydi va u DOM-ni o'zgartiradi.
12. **React DevTools-da render sabablarini qanday ko'ramiz?**
    - Profiler tab-idan 'Record why each component rendered' sozlamasini yoqish orqali.`,
    exercises: [
    {
      id: 1,
      title: "React props shallow comparison",
      instruction: "Ikki props obyektini yuzaki (shallow) solishtirib, ular teng bo'lsa true, farq qilsa false qaytaruvchi `shallowEqual(objA, objB)` funksiyasini yozing.",
      startingCode: "function shallowEqual(objA, objB) {\n  if (objA === objB) return true;\n  const keysA = Object.keys(objA);\n  const keysB = Object.keys(objB);\n  if (keysA.length !== keysB.length) return false;\n  // Kalitlar bo'yicha qiymatlarni solishtiring\n}",
      hint: "for (let key of keysA) {\n    if (objA[key] !== objB[key]) return false;\n  }\n  return true;",
      test: "if (typeof shallowEqual !== 'function') return 'shallowEqual topilmadi'; if(shallowEqual({a: 1}, {a: 1}) !== true) return 'Teng obyektlarda xato'; if(shallowEqual({a: 1}, {a: 2}) !== false) return 'Farqli obyektda xato'; return null;"
    },
    {
      id: 2,
      title: "Should Component Update simulyatsiyasi",
      instruction: "Props o'zgarganligiga ko'ra komponent qayta chizilishi kerakligini (true/false) hal qiluvchi `shouldUpdate(prevProps, nextProps)` funksiyasini yozing (props ichida faqat `id` va `count` bor).",
      startingCode: "function shouldUpdate(prevProps, nextProps) {\n  // id yoki count o'zgargan bo'lsa true qaytaring\n}",
      hint: "return prevProps.id !== nextProps.id || prevProps.count !== nextProps.count;",
      test: "if (typeof shouldUpdate !== 'function') return 'shouldUpdate topilmadi'; if(shouldUpdate({id: 1, count: 5}, {id: 1, count: 5}) !== false) return 'O\\'zgarmagan props render chaqirmasligi kerak'; if(shouldUpdate({id: 1, count: 5}, {id: 1, count: 6}) !== true) return 'count o\\'zgarganda true bo\\'lishi shart'; return null;"
    },
    {
      id: 3,
      title: "Pure Component check",
      instruction: "Komponent sinfi `React.PureComponent` dan meros olinganligini tekshiruvchi `isPureComponent(classDeclaration)` funksiyasini yozing.",
      startingCode: "function isPureComponent(classDeclaration) {\n  // class prototipida isReactComponent borligini simulyatsiya qiling\n  return !!classDeclaration?.prototype?.isPureReactComponent;\n}",
      hint: "return !!classDeclaration?.prototype?.isPureReactComponent;",
      test: "if (typeof isPureComponent !== 'function') return 'isPureComponent topilmadi'; const mockClass = { prototype: { isPureReactComponent: true } }; if(isPureComponent(mockClass) !== true) return 'PureComponent aniqlanmadi'; return null;"
    }
  ],
  quizzes: [{
      id: 1,
      question: "Virtual DOM haqida qaysi fikr to'g'ri?",
      options: [
        "U brauzerning alohida tezroq ishlaydigan bo'limi",
        "U real DOM-ning xotiradagi engil JavaScript obyektlari shaklidagi nusxasidir",
        "U faqat CSS-ni yangilash uchun ishlatiladi",
        "U serverdagi database faylidir"
      ],
      correctAnswer: 1,
      explanation: "Virtual DOM brauzerdagi real DOM elementlarini JSON yoki JS obyektlari ko'rinishida saqlash usulidir."
    },
    {
      id: 2,
      question: "Reconciliation nima?",
      options: [
        "API so'rovlarni birlashtirish",
        "Virtual DOM dagi o'zgarishlarni real sahifa (DOM) bilan solishtirib yangilash jarayoni",
        "Stil fayllarini siqish",
        "Sayt xavfsizligini ta'minlash"
      ],
      correctAnswer: 1,
      explanation: "Reconciliation React-ga minimal o'zgarishlar bilan sahifani tez yangilash imkonini beruvchi asosiy sinxronlash mexanizmidir."
    },
    {
      id: 3,
      question: "Nega parent render bo'lganda child ham render bo'ladi?",
      options: [
        "Bu xato, bunday bo'lishi mumkin emas",
        "Bu React-ning daraxt tuzilishini yangilashdagi standart tabiati",
        "Chunki child komponentda xato bor",
        "Faqat CSS o'zgarganda shunday bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "React-da parent o'zgarsa, uning barcha shaxobchalari default holatda qayta tekshiruvdan o'tadi."
    },
    {
      id: 4,
      question: "React Fiber qanday rendering turini qo'llab-quvvatlaydi?",
      options: [
        "Sinxron va to'xtovsiz rendering",
        "Asinxron va to'xtatib turilishi mumkin bo'lgan rendering (Concurrent)",
        "Faqat server rendering",
        "Hech qanday rendering"
      ],
      correctAnswer: 1,
      explanation: "Fiber arxitekturasi vazifalarni maydalab, o'zgarishlarni sinxron va asinxron bo'laklarda tartiblay oladi."
    },
    {
      id: 5,
      question: "Diffing algoritmi qanday murakkablikda ishlaydi?",
      options: [
        "O(N^3)",
        "O(N)",
        "O(log N)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "Evristik qoidalar yordamida React daraxtlarni solishtirishni O(N) vaqtda bajarishga erishgan."
    },
    {
      id: 6,
      question: "Batching nima degani?",
      options: [
        "Bir nechta state o'zgarishini bitta re-renderga guruhlash",
        "Kodni yuklab olish",
        "Ma'lumotlarni serverga yuborish",
        "CSS animatsiyasini to'xtatish"
      ],
      correctAnswer: 0,
      explanation: "Batching yordamida bir nechta setState ketma-ket bajarilsa ham, React ularni bitta re-renderga jamlaydi va tezkorlikni oshiradi."
    },
    {
      id: 7,
      question: "React-da re-render bo'lishiga nimalar sabab bo'ladi?",
      options: [
        "Faqat sahifani yangilash",
        "Komponent state-i, props-i o'zgarishi yoki uning parent komponenti qayta render bo'lishi",
        "Brauzer oynasi o'lchami o'zgarishi",
        "Faqat CSS fayl o'zgarishi"
      ],
      correctAnswer: 1,
      explanation: "State, Props va Parent render bo'lishi React-da re-render jarayonini ishga tushiruvchi 3 ta asosiy trigger hisoblanadi."
    },
    {
      id: 8,
      question: "Virtual DOM diffing jarayonidagi 'Diffing' nima degani?",
      options: [
        "Kodni arxivlash",
        "Yangi Virtual DOM daraxtini avvalgisi bilan solishtirib, farqlarni topish",
        "Ma'lumotlarni bazaga yozish",
        "Brauzer keshini tozalash"
      ],
      correctAnswer: 1,
      explanation: "Diffing — yangi render natijasida hosil bo'lgan maketni eskisiga solishtirish va faqat farqlarni ajratib olish bosqichidir."
    },
    {
      id: 9,
      question: "React rendering jarayonidagi 'Commit Phase' nima ish qiladi?",
      options: [
        "Virtual DOM-dagi farqlarni hisoblaydi",
        "Hisoblangan farqlarni (o'zgarishlarni) real DOM-ga yozib ekranda aks ettiradi",
        "Git commit-larni yuklaydi",
        "API-ga ma'lumot jo'natadi"
      ],
      correctAnswer: 1,
      explanation: "Commit Phase - render hisob-kitoblaridan keyin haqiqiy DOM elementlarini yangilaydigan yakuniy va sinxron bosqichdir."
    },
    {
      id: 10,
      question: "React-dagi 'Render Phase' jarayoni sinxronmi yoki asinxronmi?",
      options: [
        "Har doim sinxron bo'ladi",
        "React Fiber yordamida asinxron bajarilishi va to'xtatib turilishi mumkin",
        "Faqat serverda bajariladi",
        "Hech qachon ishga tushmaydi"
      ],
      correctAnswer: 1,
      explanation: "Render phase xotirada Virtual DOM chizish bo'lgani sababli asinxron ishlashi va boshqa og'irroq ishlarga yo'l berishi (Fiber tufayli) mumkin."
    },
    {
      id: 11,
      question: "React diffing jarayonida ikki element turlari har xil bo'lsa (masalan div -> span) nima qiladi?",
      options: [
        "Faqat klasslarini o'zgartiradi",
        "Eski komponentni va uning barcha bolalarini butunlay o'chirib, noldan yangisini quradi",
        "Ular bir xil deb hisoblaydi",
        "Faqat matnni yangilaydi"
      ],
      correctAnswer: 1,
      explanation: "Agar element turi o'zgarsa, React reconciliation qoidasiga ko'ra eskisini o'chirib yuboradi (unmount) va yangi turni joylaydi."
    },
    {
      id: 12,
      question: "React 'StrictMode' ishlab chiqish (development) jarayonida nima uchun kerak?",
      options: [
        "Foydalanuvchi tugma bosishini cheklash uchun",
        "Potensial xatolar va nojo'ya ta'sirlarni (side-effects) topish uchun komponentlarni ataylab 2 marta render qilish uchun",
        "Bundle hajmini kamaytirish uchun",
        "Faqat CSS-ni tekshirish uchun"
      ],
      correctAnswer: 1,
      explanation: "StrictMode koddagi eski metodlar va re-renderlar davomida xavfli bo'lgan side-effectlarni topish maqsadida komponentni ikki marta chaqiradi."
    }
  ]
};

export const reactArchitecture = {
  id: "reactArchitecture",
  title: "React Arxitekturasi va Tezkorlik (React Performance)",
  theory: `## 1. NEGA kerak?
React — dunyodagi eng mashhur front-end kutubxona. Lekin uni shunchaki ishlatish va uning arxitekturasini chuqur tushunish orasida juda katta farq bor. Ko'plab loyihalar o'sib borgan sari keraksiz re-renderlar (qayta chizishlar) sababli sekinlasha boshlaydi.
React intervyularida sizdan nafaqat Hook-larni ishlatishni, balki **Virtual DOM**, **Reconciliation (Diffing)** algoritmi, **Fiber** arxitekturasi hamda \`useMemo\`, \`useCallback\` va \`React.memo\` orqali komponentlarni qanday optimallashtirishni bilishingiz so'raladi. Bularni bilish yuqori malakali (Senior) React dasturchisi bo'lishning asosiy shartidir.

## 2. SODDALIK (Analogiya)
Siz uyingizning dizaynini (sahifani) o'zgartirmoqchisiz:
- **Real DOM (Haqiqiy DOM):** Uyni to'liq buzib, noldan qayta qurish. Bu juda sekin va qimmat.
- **Virtual DOM:** Uyingizning kichik qog'ozdagi **3D maketi**. Siz o'zgartirishlarni (masalan, stolning joyini) avval maketda sinab ko'rasiz.
- **Reconciliation (Diffing):** Maketdagi eski holat bilan yangi holatni solishtirish (Diffing) va faqatgina o'zgargan detalni (faqat stolni) borib haqiqiy uyda o'zgartirish. Bu juda tez va tejamkor.

## 3. STRUKTURA
React-ning ichki ishlash mexanizmlari:

### 1. Reconciliation & Diffing (Solishtirish)
React joriy Virtual DOM-ni yangi Virtual DOM bilan solishtiradi. Uning qoidalari:
- Agar elementlar turi o'zgarsa (masalan, \`<div>\` o'rniga \`<span>\` kelsa), React butun tarmoqni (subtree) o'chirib, noldan quradi.
- Bir xil turdagi elementlarda faqat o'zgargan xususiyatlar (attributes) yangilanadi.
- Ro'yxatlar bilan ishlashda \`key\` xossasi elementlarning joylashuvini aniqlash va keraksiz qayta chizishlarni oldini olish uchun juda muhim.

### 2. React Fiber (Tolalar)
React 16 da kiritilgan yangi render qilish dvigateli. U render jarayonini kichik bo'laklarga (work units) bo'lib yuboradi va brauzerning asosiy oqimini (Main Thread) bloklamaslik uchun vazifalarni to'xtatib turish (pause) va keyinroq davom ettirish imkonini beradi.

### 3. Optimallashtirish asboblari:
- \`React.memo\`: Komponent props-lari o'zgarmasa, uni qayta render bo'lishidan saqlaydi.
- \`useMemo\`: Og'ir matematik hisob-kitoblar natijasini keshlaydi.
- \`useCallback\`: Funksiyaning yangi nusxasi (reference) yaratilishini oldini oladi.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Har bir funksiyani \`useCallback\` ga o'rash:** \`useCallback\` va \`useMemo\` ning ham o'ziga yarasha resurs sarfi (overhead) bor. Ular har safar dependencylarni solishtiradi. Oddiy funksiyalar uchun ularni ishlatish kodni tezlashtirmaydi, aksincha keraksiz murakkablashtiradi. Ularni faqat props orqali memoized bolalarga uzatiladigan ob'ektlar/funksiyalar uchun ishlatish kerak.
2. **Ro'yxatlarda \`key\` sifatida massiv indeksidan (\`index\`) foydalanish:** Agar ro'yxat elementlari o'chirilsa, qo'shilsa yoki saralansa, indekslar o'zgarib ketadi. Bu React-ni chalkashtiradi, natijada noto'g'ri renderlar yoki inputlardagi ma'lumotlar buzilishi yuz beradi. Doimo unikal ID ishlatish shart.
3. **Muted State (State-ni to'g'ridan-to'g'ri o'zgartirish):** \`state.push(item)\` kabi o'zgartirishlar React-ga re-render kerakligini bildirmaydi, chunki ob'ekt havolasi (reference) o'zgarmaydi. Har doim immutable yondashuv (\`[...state, item]\`) qo'llanilishi shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. Virtual DOM nima?**
Haqiqiy DOM ning xotiradagi (RAM) yengil va tezkor JavaScript ob'ektlari ko'rinishidagi nusxasi (maketi).

**2. Reconciliation nima?**
Virtual DOM-dagi o'zgarishlarni aniqlab, ularni real DOM-ga minimal va eng qisqa yo'l bilan o'tkazish jarayoni.

**3. Diffing algoritmi qanday ishlaydi?**
O(n) vaqtda ishlaydigan evristik algoritm bo'lib, u ikki daraxtni darajama-daraja (breadth-first) solishtiradi va faqat farqlarni real DOM-ga yozadi.

**4. React Fiber nima?**
React-ning yangi asinxron render arxitekturasi bo'lib, u render qilish ishlarini bo'laklarga ajratish, ustuvorligini (priority) belgilash va asosiy oqimni band qilmaslik imkonini beradi.

**5. \`React.memo\` nima vazifani bajaradi?**
Komponent props-larini yuzaki (shallow) solishtirib, o'zgarmagan bo'lsa komponentni qayta chizilishini (re-render) bloklovchi High-Order Component (HOC).

**6. \`useMemo\` va \`useCallback\` farqi nimada?**
\`useMemo\` funksiya qaytargan qiymatni (value) keshlaydi. \`useCallback\` esa funksiyaning o'zini (reference) qayta yaratilmasligi uchun keshlab saqlaydi.

**7. Nima uchun massiv indeksini \`key\` sifatida ishlatish tavsiya etilmaydi?**
Chunki ro'yxat tartibi o'zgarganda indekslar o'zgaradi va React eski elementlar bilan yangilarini noto'g'ri solishtirib, UI xatoliklariga sabab bo'ladi.

**8. State o'zgarganda nima uchun komponent qayta render bo'ladi?**
React state o'zgarishini sezganda yangi Virtual DOM daraxtini yaratadi va uni eskisiga solishtirib, kerakli o'zgarishlarni real sahifaga chiqaradi.

**9. React-da "Lifting State Up" (State-ni yuqoriga ko'tarish) nima?**
Ikki yoki undan ko'p komponentlar bir xil ma'lumotdan foydalansa, umumiy state-ni ularning eng yaqin ota-ona (parent) komponentiga ko'chirish.

**10. StrictMode nima vazifani bajaradi?**
Ishlab chiqish (development) jarayonida koddagi eskirgan metodlar, nojo'ya ta'sirlar (side-effects) va yuzaga kelishi mumkin bo'lgan xatoliklarni aniqlash uchun komponentlarni ikki marta render qilib tekshiruvchi yordamchi vosita.

**11. React-da "Shallow Comparison" (Yuzaki solishtirish) nima?**
Ob'ektlarning ichki xossalarini chuqur tekshirmasdan, faqat birinchi darajali kalitlar va ularning qiymatlari (havolalari) tengligini solishtirish.

**12. Nima uchun state-ga ma'lumot yozganda immutable (o'zgarmas) yondashuv kerak?**
Chunki React ob'ekt yoki massiv ichidagi o'zgarishlarni tekshirib o'tirmaydi, u faqat xotira manzili (reference) o'zgarganligini solishtiradi.
`,
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
      title: "Sodda useMemo simulyatsiyasi",
      instruction: "Qiymat va dependencylar berilganda, agar dependency o'zgarmasa keshdagi qiymatni qaytaradigan `memoizeValue(fn, deps, lastDeps, lastValue)` funksiyasini yozing. (massiv deps tengligini solishtiring).",
      startingCode: "function memoizeValue(fn, deps, lastDeps, lastValue) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Agar teng bo'lsa eski qiymatni, bo'lmasa fn() ni chaqirib yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastValue;\nreturn fn();",
      test: "if (typeof memoizeValue !== 'function') return 'memoizeValue topilmadi'; const fn = () => 10; if(memoizeValue(fn, [1], [1], 5) !== 5) return 'Dependency o\\'zgarmaganda kesh xato'; if(memoizeValue(fn, [2], [1], 5) !== 10) return 'Dependency o\\'zgarganda fn() chaqirilmadi'; return null;"
    },
    {
      id: 4,
      title: "Immutable State Updater",
      instruction: "Massiv ko'rinishidagi state-ga element qo'shish uchun massivni o'zgartirmasdan (immutable) yangi massiv qaytaruvchi `addItem(state, item)` funksiyasini yozing.",
      startingCode: "function addItem(state, item) {\n  // Spread operator orqali yozing\n}",
      hint: "return [...state, item];",
      test: "if (typeof addItem !== 'function') return 'addItem topilmadi'; const s = [1, 2]; const res = addItem(s, 3); if(s.length !== 2) return 'Asl state o\\'zgartirildi (mutated)'; if(res[2] !== 3) return 'Yangi element qo\\'shilmadi'; return null;"
    },
    {
      id: 5,
      title: "Unikal Key tekshiruvi",
      instruction: "Ro'yxat elementlari React-da render bo'lishi uchun ularning tarkibida `key` xossasi (unikal ID) borligini tekshiradigan `validateKeys(elements)` funksiyasini yozing (barchasida bo'lsa true, kamida bittasida yo'q bo'lsa false).",
      startingCode: "function validateKeys(elements) {\n  // every orqali tekshiring\n}",
      hint: "return elements.every(el => el.key !== undefined && el.key !== null);",
      test: "if (typeof validateKeys !== 'function') return 'validateKeys topilmadi'; if(validateKeys([{id: 1, key: 'a'}, {id: 2, key: 'b'}]) !== true) return 'To\\'g\\'ri keys rad etildi'; if(validateKeys([{id: 1, key: 'a'}, {id: 2}]) !== false) return 'Key yo\\'qligi aniqlanmadi'; return null;"
    },
    {
      id: 6,
      title: "Strict Mode warning finder",
      instruction: "Komponent kodi ichida eskirgan `componentWillMount` metodi bor-yo'qligini tekshiradigan `checkDeprecatedMethods(code)` funksiyasini yozing (true/false).",
      startingCode: "function checkDeprecatedMethods(code) {\n  // componentWillMount qidirilishi\n}",
      hint: "return code.includes('componentWillMount');",
      test: "if (typeof checkDeprecatedMethods !== 'function') return 'checkDeprecatedMethods topilmadi'; if (checkDeprecatedMethods('class A { componentWillMount() {} }') !== true) return 'Eskirgan metod aniqlanmadi'; return null;"
    },
    {
      id: 7,
      title: "Sodda useCallback simulyatsiyasi",
      instruction: "Berilgan funksiya havolasini dependencylar o'zgarmasa keshlab saqlaydigan `memoizeCallback(fn, deps, lastDeps, lastFn)` funksiyasini yozing.",
      startingCode: "function memoizeCallback(fn, deps, lastDeps, lastFn) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Teng bo'lsa eski funksiyani, bo'lmasa yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastFn;\nreturn fn;",
      test: "if (typeof memoizeCallback !== 'function') return 'memoizeCallback topilmadi'; const f = () => {}; if (memoizeCallback(f, [1], [1], f) !== f) return 'Callback keshlanmadi'; return null;"
    },
    {
      id: 8,
      title: "Fiber Work Tag check",
      instruction: "Fiber node turi (tag) funksiyali komponent ekanligini tekshiradigan `isFunctionComponent(fiberNode)` funksiyasini yozing (React-da Function Component tagi 0 yoki 2 bo'lishi mumkin, biz shunchaki typeof node.type === 'function' ekanligini tekshiramiz).",
      startingCode: "function isFunctionComponent(fiberNode) {\n  // type xossasini tekshiring\n}",
      hint: "return typeof fiberNode?.type === 'function';",
      test: "if (typeof isFunctionComponent !== 'function') return 'isFunctionComponent topilmadi'; if (isFunctionComponent({ type: () => {} }) !== true) return 'Funksiyali komponent xato topildi'; if (isFunctionComponent({ type: 'div' }) !== false) return 'Oddiy teg rad etilmadi'; return null;"
    },
    {
      id: 9,
      title: "React Children Counter",
      instruction: "React-ga o'xshash bolalar massividagi barcha elementlar sonini hisoblaydigan `countChildren(children)` funksiyasini yozing (agar array bo'lmasa 1, bo'lsa array uzunligi, null bo'lsa 0).",
      startingCode: "function countChildren(children) {\n  // Shartlarni yozing\n}",
      hint: "if (children === null || children === undefined) return 0;\nif (Array.isArray(children)) return children.length;\nreturn 1;",
      test: "if (typeof countChildren !== 'function') return 'countChildren topilmadi'; if (countChildren(null) !== 0) return 'Null uchun xato'; if (countChildren([1, 2]) !== 2) return 'Massiv uchun xato'; if (countChildren('hi') !== 1) return 'Yagona bola uchun xato'; return null;"
    },
    {
      id: 10,
      title: "React Key string format",
      instruction: "Element kaliti (`key`) string ko'rinishida bo'lishini ta'minlovchi `formatReactKey(id)` funksiyasini yozing (masalan, `element-5`).",
      startingCode: "function formatReactKey(id) {\n  // formatlang\n}",
      hint: "return `element-${id}`;",
      test: "if (typeof formatReactKey !== 'function') return 'formatReactKey topilmadi'; if(formatReactKey(12) !== 'element-12') return 'Key formatlash xato'; return null;"
    },
    {
      id: 11,
      title: "Pure Component check",
      instruction: "Komponent sinfi `React.PureComponent` dan meros olinganligini tekshiruvchi `isPureComponent(classDeclaration)` funksiyasini yozing.",
      startingCode: "function isPureComponent(classDeclaration) {\n  // class prototipida isReactComponent borligini simulyatsiya qiling\n  return !!classDeclaration?.prototype?.isPureReactComponent;\n}",
      hint: "return !!classDeclaration?.prototype?.isPureReactComponent;",
      test: "if (typeof isPureComponent !== 'function') return 'isPureComponent topilmadi'; const mockClass = { prototype: { isPureReactComponent: true } }; if(isPureComponent(mockClass) !== true) return 'PureComponent aniqlanmadi'; return null;"
    },
    {
      id: 12,
      title: "Ref assignment",
      instruction: "DOM obyektini React `ref` obyektining `current` xossasiga bog'lab qo'yuvchi `assignRef(ref, domNode)` funksiyasini yozing.",
      startingCode: "function assignRef(ref, domNode) {\n  // ref.current-ga yozing\n}",
      hint: "if (ref) ref.current = domNode;",
      test: "if (typeof assignRef !== 'function') return 'assignRef topilmadi'; const r = { current: null }; assignRef(r, 'div'); if(r.current !== 'div') return 'Ref bog\\'lanmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React-dagi Virtual DOM nima?",
      options: [
        "Haqiqiy DOM-dan tezroq ishlaydigan brauzerning alohida bo'limi",
        "Haqiqiy DOM elementlarining xotiradagi yengil, oddiy JavaScript ob'ektlari ko'rinishidagi nusxasi",
        "Saytni bezash uchun maxsus CSS kutubxonasi",
        "Faqat serverda ishlaydigan ma'lumotlar bazasi"
      ],
      correctAnswer: 1,
      explanation: "Virtual DOM bu real DOM-ni har safar butunlay o'zgartirmasdan, avval farqlarni hisoblash uchun ishlatiladigan xotiradagi JS ob'ektlari daraxtidir."
    },
    {
      id: 2,
      question: "Reconciliation (Diffing) jarayonining maqsadi nima?",
      options: [
        "Foydalanuvchini ro'yxatdan o'tkazish",
        "Eski va yangi Virtual DOM daraxtlarini solishtirib, faqatgina o'zgargan qismlarni real DOM-ga minimal amallar bilan yozish",
        "JavaScript fayllarini siqish",
        "Barcha komponentlarni parallel render qilish"
      ],
      correctAnswer: 1,
      explanation: "Reconciliation React-ning diffing algoritmi yordamida o'zgarishlarni real sahifaga tezkor va minimal yo'l bilan sinxronlash jarayonidir."
    },
    {
      id: 3,
      question: "React Fiber arxitekturasining asosiy ustunligi nimada?",
      options: [
        "U faqat mobil telefonlarda ishlaydi",
        "Render qilish vazifalarini bo'laklarga ajratish, ularni to'xtatib turish hamda brauzer asosiy oqimini (Main Thread) bloklamaslik",
        "CSS animatsiyalarini tezlashtirish",
        "State boshqaruvini butunlay o'chirish"
      ],
      correctAnswer: 1,
      explanation: "Fiber React-ga render ishlarini kichik bo'laklarga ajratib, muhimroq ishlarni (masalan, user input) birinchi bajarishga (concurrency) imkon beradi."
    },
    {
      id: 4,
      question: "`React.memo` nima vazifani bajaradi?",
      options: [
        "Komponent state-larini keshlaydi",
        "Props-lar o'zgarmagan bo'lsa, komponentni qayta render (re-render) bo'lishidan saqlaydi",
        "Faqat sinflar uchun hook yaratadi",
        "CSS o'zgaruvchilarini boshqaradi"
      ],
      correctAnswer: 1,
      explanation: "`React.memo` — High-Order Component bo'lib, u props o'zgarishlarini shallow solishtiradi va agar o'zgarish bo'lmasa render-ni to'xtatadi."
    },
    {
      id: 5,
      question: "`useMemo` va `useCallback` hooklarining farqi nimada?",
      options: [
        "`useMemo` faqat sonlarni, `useCallback` esa harflarni keshlaydi",
        "`useMemo` funksiya qaytargan qiymatni keshlaydi, `useCallback` esa funksiyaning o'zini (reference) qayta yaratilmasligi uchun keshlaydi",
        "Ikkalasi mutlaqo bir xil vazifani bajaradi",
        "Faqat `useCallback` serverda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`useMemo` og'ir hisob-kitoblar qiymatini memoize qiladi. `useCallback` esa bolalarga uzatiladigan funksiyalarning xotiradagi manzilini (reference) saqlaydi."
    },
    {
      id: 6,
      question: "Nima uchun massiv elementlarini render qilganda unikal `key` xossasi kerak?",
      options: [
        "Elementlarni tartib bilan raqamlash uchun",
        "React o'zgarishlarni aniqlashda (diffing) aynan qaysi element o'zgargani, o'chirilgani yoki qo'shilganini to'g'ri kuzatishi uchun",
        "Faqat brauzer talabi tufayli",
        "Xotira hajmini kamaytirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Unikal `key` xossasi React-ga ro'yxat elementlari almashganda yoki o'chganda ularning shaxsiyatini (identity) saqlab qolishga yordam beradi."
    },
    {
      id: 7,
      question: "Ro'yxat renderida `key` sifatida massiv indeksidan (`index`) foydalanish qachon muammo keltirib chiqaradi?",
      options: [
        "Faqat massiv bo'sh bo'lganda",
        "Ro'yxat elementlari o'chirilganda, qo'shilganda yoki saralanganda (tartibi o'zgarganda)",
        "Dastur darhol ReferenceError beradi",
        "Faqat rasm fayllari ishlatilganda"
      ],
      correctAnswer: 1,
      explanation: "Tartib o'zgarganda indekslar qaytadan taqsimlanadi. Bu React-ni chalg'itib, noto'g'ri UI holatlarini ko'rsatishga va sekinlashishga olib keladi."
    },
    {
      id: 8,
      question: "State o'zgaruvchisini `state.push(newValue)` deb o'zgartirish nima uchun tavsiya etilmaydi?",
      options: [
        "Chunki bu xavfsiz emas",
        "Chunki massiv o'zgargani bilan uning xotiradagi manzili (reference) o'zgarmaydi va React buni sezib re-render qilmaydi",
        "Bu xossa faqat eski versiyalarda bor edi",
        "State faqat sonlarni saqlaydi"
      ],
      correctAnswer: 1,
      explanation: "React state-ning yangilanganini shallow comparison orqali aniqlaydi. Massiv ichini o'zgartirish (mutation) manzilni o'zgartirmaydi, shuning uchun doimo yangi nusxa (immutable: `[...state, item]`) yaratish kerak."
    },
    {
      id: 9,
      question: "React-da 'Shallow Comparison' (yuzaki solishtirish) qanday ishlaydi?",
      options: [
        "Ob'ekt ichidagi barcha ichma-ich ob'ektlarni rekursiv tekshiradi",
        "Faqat birinchi darajali kalitlar va ularning havolalari (references) tengligini tekshiradi",
        "Faqat sonlarni tekshiradi",
        "Faqat base64 formatda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Yuzaki solishtirish ob'ektlarning ichki qatlamlariga kirmaydi, faqat `Object.keys` va `===` orqali birinchi darajali xossalarni tekshiradi."
    },
    {
      id: 10,
      question: "React-da 'StrictMode' nima vazifani bajaradi?",
      options: [
        "Saytni to'liq qotirib qo'yadi",
        "Ishlab chiqish davrida xavfsiz bo'lmagan metodlar, side-effect xatolari va eski API-larni ogohlantirish orqali ko'rsatadi",
        "Faqat parollarni shifrlaydi",
        "CSS xatolarini tuzatadi"
      ],
      correctAnswer: 1,
      explanation: "StrictMode yuzaga kelishi mumkin bo'lgan nojo'ya ta'sirlarni topish maqsadida komponentlarni ikki marta render qilib tekshiradi."
    },
    {
      id: 11,
      question: "React PureComponent nima?",
      options: [
        "Faqat bitta HTML tegi bo'lgan komponent",
        "`shouldComponentUpdate` metodini avtomatik ravishda props va state-ni shallow solishtiradigan qilib sozlangan component klassi",
        "JavaScript-siz ishlaydigan komponent",
        "Faqat funksiyali komponent"
      ],
      correctAnswer: 1,
      explanation: "PureComponent klassi o'zida yuzaki solishtirish (shallow check) mexanizmiga ega, u keraksiz re-renderlarni kamaytiradi."
    },
    {
      id: 12,
      question: "Nima uchun `useCallback` hookini keraksiz joyda ishlatish dasturni tezlashtirmaydi?",
      options: [
        "Chunki u xotirani to'ldiradi",
        "Chunki dependency massivini solishtirish va keshga yozishning o'zi ham qo'shimcha resurs (overhead) talab qiladi",
        "U faqat sinfli komponentlarda ishlaydi",
        "Chunki u funksiyani o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "`useCallback` bepul emas. Har renderda dependencylarni solishtirish va funksiyani saqlash ham vaqt oladi. Uni faqat og'ir bolalar renderini optimallashdagina ishlatish kerak."
    }
  ]
};

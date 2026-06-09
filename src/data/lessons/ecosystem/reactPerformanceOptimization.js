export const reactPerformanceOptimization = {
  id: "reactPerformanceOptimization",
  title: "Performance Optimization Texnikalari",
  theory: `## 1. NEGA kerak?
React-da keraksiz qayta chizishlarni va og'ir matematik hisob-kitoblarni oldini olish orqali ilova tezligini saqlash mumkin. Buning uchun kesh hisoblash (memoization) va kod bo'laklash (code splitting) kabi texnikalardan foydalaniladi. Bularni bilish Senior darajadagi React dasturchilari uchun majburiydir.

## 2. SODDALIK (Analogiya)
Siz matematikadan **135 x 24** misolining javobini hisobladingiz. Natija: **3240**.
- **Memoization-siz (useMemo yo'q):** Har safar sizdan "135 x 24 necha bo'ladi?" deb so'rashganda, qog'oz-qalam olib qaytadan hisoblaysiz (og'ir render).
- **Memoization bilan (useMemo bor):** Javobni daftaringizga yozib qo'yasiz va so'ralgan zahoti "3240" deb javob berasiz.
- **React.memo (Eshikbon):** Kelgan mehmonning props-lari (sovg'alari) o'zgarmagan bo'lsa, uni eshikdan qaytaradi (re-render qilmaydi).

## 3. STRUKTURA VA PRINSIPLAR
- **React.memo:** HOC bo'lib, komponent props-larini shallow solishtiradi. Props o'zgarmasa render-ni to'xtatadi.
- **useMemo:** Hisoblab chiqarilgan murakkab qiymatni (value) renderlararo keshlaydi.
- **useCallback:** Funksiyaning xotiradagi nusxasini (reference) saqlaydi, har renderda yangi funksiya yaratilishini to'xtatadi.
- **Lazy Loading & Code Splitting:**
  - \`React.lazy\` va \`Suspense\` sahifalarni (routes) yoki og'ir kutubxonalarni faqat kerak bo'lganda yuklashga yordam beradi.

## 4. KO‘P UCHRAYDIGAN XATOLAR (Junior Mistakes)
1. **Har bir narsani useMemo/useCallback-ga o'rash:** Dependencylarni solishtirish va keshga yozish ham xotira talab qiladi (overhead). Oddiy funksiyalar va primitive qiymatlarga ularni ishlatish tezlashtirmaydi, balki sekinlashtiradi.
2. **useCallback ichida dependency massivini bo'sh qoldirib, state-ni yangilash:** Bu stale closure (eski state qolib ketishi) muammosini keltirib chiqaradi.

## 5. SAVOLLAR VA JAVOBLAR (Interview Questions)
1. **React.memo nima?**
   - Props-larni shallow solishtirib, o'zgarmasa komponent qayta render bo'lishidan himoya qiluvchi Oliy Darajali Komponent (HOC).
2. **useMemo va useCallback farqi nima?**
   - \`useMemo\` qiymatni keshlaydi, \`useCallback\` esa funksiya havolasini (reference) keshlaydi.
3. **Nega har doim useMemo ishlatish noto'g'ri?**
   - Har renderda massiv dependencylarni tekshirish va keshga yozish hisobiga qo'shimcha resurs sarflanadi (overhead).
4. **Referential Integrity nima uchun React-da muhim?**
   - React komponentlarning o'zgarganini xotira manzili (reference) orqali aniqlagani uchun.
5. **Lazy loading nima va u qachon kerak?**
   - Og'ir komponentlar yoki sahifalarni faqat kerak bo'lganda (user ochganda) yuklash. Bu bundle size yuklanishini kamaytiradi.
6. **Code splitting qanday ishlaydi?**
   - Bitta ulkan JS faylni (bundle) kichik bo'laklarga (chunks) ajratib, foydalanuvchiga faqat u turgan sahifa kodini yuborish.
7. **useCallback-da dependency massivini bo'sh qoldirsak nima bo'ladi?**
   - Funksiya faqat 1 marta yaratiladi, uning ichidagi o'zgaruvchilar o'sha vaqtdagi qiymatida qotib qoladi (stale closure).
8. **React.memo-da custom taqqoslash funksiyasini qanday yozamiz?**
   - Ikkinchi argument sifatida custom function beriladi: \`(prevProps, nextProps) => boolean\`.
9. **Suspense nima vazifa bajaradi?**
   - Dynamic import qilingan lazy komponentlar yuklangunicha zaxira UI (fallback, masalan loader) ko'rsatib turadi.
10. **Bundle size-ni qanday kamaytirish mumkin?**
    - Dynamic importlar, lazy loading va keraksiz kutubxonalarni o'chirish (tree shaking) yordamida.
11. **useMemo yordamida referential identity muammosi qanday yechiladi?**
    - Agar bolaga props sifatida obyekt yuborilsa, o'sha obyektni \`useMemo\` ichida e'lon qilib, uning yangi havola yaratishini cheklash orqali.
12. **useEvent (RFC) hook-i useCallback-dan nimasi bilan farq qiladi?**
    - U doimo yangi state qiymatini ko'radi, lekin reference hech qachon o'zgarmaydi, shuning uchun dependency massiv talab qilmaydi.`,
    exercises: [
    {
      id: 1,
      title: "Sodda useMemo simulyatsiyasi",
      instruction: "Qiymat va dependencylar berilganda, agar dependency o'zgarmasa keshdagi qiymatni qaytaradigan `memoizeValue(fn, deps, lastDeps, lastValue)` funksiyasini yozing. (massiv deps tengligini solishtiring).",
      startingCode: "function memoizeValue(fn, deps, lastDeps, lastValue) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Agar teng bo'lsa eski qiymatni, bo'lmasa fn() ni chaqirib yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastValue;\nreturn fn();",
      test: "if (typeof memoizeValue !== 'function') return 'memoizeValue topilmadi'; const fn = () => 10; if(memoizeValue(fn, [1], [1], 5) !== 5) return 'Dependency o\\'zgarmaganda kesh xato'; if(memoizeValue(fn, [2], [1], 5) !== 10) return 'Dependency o\\'zgarganda fn() chaqirilmadi'; return null;"
    },
    {
      id: 2,
      title: "Sodda useCallback simulyatsiyasi",
      instruction: "Berilgan funksiya havolasini dependencylar o'zgarmasa keshlab saqlaydigan `memoizeCallback(fn, deps, lastDeps, lastFn)` funksiyasini yozing.",
      startingCode: "function memoizeCallback(fn, deps, lastDeps, lastFn) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Teng bo'lsa eski funksiyani, bo'lmasa yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastFn;\nreturn fn;",
      test: "if (typeof memoizeCallback !== 'function') return 'memoizeCallback topilmadi'; const f = () => {}; if (memoizeCallback(f, [1], [1], f) !== f) return 'Callback keshlanmadi'; return null;"
    },
    {
      id: 3,
      title: "Bundle Limit Checker",
      instruction: "Sahifa to'liq hidratatsiya bo'lishidan oldin yuklanadigan bundle hajmini tekshiruvchi `checkBundleSize(sizeKB, limitKB)` funksiyasini yozing (agar limitdan oshsa true, bo'lmasa false).",
      startingCode: "function checkBundleSize(sizeKB, limitKB) {\n  // Limit tekshirish\n}",
      hint: "return sizeKB > limitKB;",
      test: "if (typeof checkBundleSize !== 'function') return 'checkBundleSize topilmadi'; if(checkBundleSize(600, 500) !== true || checkBundleSize(400, 500) !== false) return 'Limit tekshirish xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`React.memo` qachon ishlatiladi?",
      options: [
        "API-dan keladigan ma'lumotlarni keshga saqlashda",
        "Props-lar o'zgarmasa, komponent re-renderini to'xtatishda",
        "HTML button tugmasini yaratishda",
        "Faqat CSS animasiyalarini tezlashtirishda"
      ],
      correctAnswer: 1,
      explanation: "React.memo yordamida props shallow solishtirilib, o'zgarish bo'lmasagina komponent qayta chizilishi to'xtatiladi."
    },
    {
      id: 2,
      question: "`useCallback` ning asosiy maqsadi nima?",
      options: [
        "Hisoblangan qiymatni keshlash",
        "Funksiya havolasini (reference) renderlararo keshlab qolish",
        "Faqat server so'rovlarini boshqarish",
        "Input qiymatlarini tozalash"
      ],
      correctAnswer: 1,
      explanation: "useCallback har renderda yangi funksiya yaratilishini (xotirada yangi manzil hosil bo'lishini) cheklaydi."
    },
    {
      id: 3,
      question: "Nega keraksiz joyda `useMemo` ishlatish tavsiya etilmaydi?",
      options: [
        "Chunki u JS xatoligiga sabab bo'ladi",
        "Chunki dependencylarni solishtirish va keshga yozish ham qo'shimcha resurs (overhead) talab qiladi",
        "Faqat rasmlarga ta'sir qiladi",
        "Chunki u butun state-ni o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "useMemo-da dependencylarni solishtirish va qiymatni xotirada ushlab turish ham bepul emas. Oddiy hisob-kitoblar uchun u keraksiz overhead yaratadi."
    },
    {
      id: 4,
      question: "React-da 'Lazy loading' nima?",
      options: [
        "Saytni sekin ishlaydigan qilish",
        "Komponent yoki sahifani faqat foydalanuvchiga kerak bo'lganda (user ochganda) yuklash",
        "CSS-ni brauzerdan o'chirish",
        "Ma'lumotlarni kechiktirib serverga jo'natish"
      ],
      correctAnswer: 1,
      explanation: "React.lazy yordamida sahifalar dynamic import qilinadi va birinchi sahifa ochilganda boshqa keraksiz sahifalar yuklanmaydi, bundle hajmi kichrayadi."
    },
    {
      id: 5,
      question: "Suspense komponentidagi 'fallback' prop nima vazifa bajaradi?",
      options: [
        "Saytdagi xatolarni ko'rsatadi",
        "Lazy komponent yuklangunga qadar ekranga chiqariladigan loading (spinner, shablon) interfeysi",
        "Hech narsa ko'rsatmaydi",
        "Server o'chganligini bildiradi"
      ],
      correctAnswer: 1,
      explanation: "Fallback - asinxron dynamic import yuklanayotgan vaqtda foydalanuvchiga vaqtinchalik visual interfeys taqdim etadi."
    },
    {
      id: 6,
      question: "Stale Closure muammosi qachon yuz beradi?",
      options: [
        "State mutable bo'lganda",
        "Keshlab qo'yilgan callback funksiya ichida ishlatilgan o'zgaruvchi dependency massivga yozilmay qolib ketganda",
        "CSS kodi eskirib qolganda",
        "API error 404 qaytarganda"
      ],
      correctAnswer: 1,
      explanation: "Callback-da dependency yozilmasa, u o'zgaruvchining eski holatdagi (stale) holatini keshlab qotirib qo'yadi."
    }
  ]
};

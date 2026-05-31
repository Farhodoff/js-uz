export const debounceThrottle = {
  id: "debounce-throttle",
  title: "Debounce va Throttle",
  theory: `## 1. KIRISH: Nega bu mavzu kerak?
Foydalanuvchi veb-sahifada matn qidirayotganda (input yozayotganda) yoki sahifani scroll qilayotganda, har bir harakat uchun serverga so'rov yuborish yoki murakkab hisob-kitoblarni amalga oshirish sahifaning qotib qolishiga (lag) yoki serverning yiqilishiga (crash) sabab bo'ladi. 

Ushbu muammoni hal qilish va hodisalar (events) chaqirilish chastotasini cheklash uchun **Debounce** va **Throttle** usullari qo'llaniladi.

---

## 2. SODDALIK (Analogiya)
* **Debounce (Lift analogiyasi):** Lift eshigi yopilishi uchun odamlar kirib bo'lishini kutadi. Har safar yangi odam kelib tugmani bossa, lift yopilish taymerini qaytadan (nolga) tushiradi va kutishni davom ettiradi. Lift faqat tugma oxirgi marta bosilgandan va ma'lum bir muddat (masalan, 5 soniya) hech kim tugmani bosmagandan keyingina harakatlanadi.
* **Metro turniketi (analogiya):** Turniketdan har qancha odam tez-tez o'tishga harakat qilmasin, u faqat belgilangan vaqt oralig'ida (masalan, har 2 soniyada) bitta odamni o'tkazib yuboradi. Qolgan tezkor urinishlar e'tiborga olinmaydi.

---

## 3. CHUQUR TUSHUNCHALAR VA IMKONIYATLAR

### A. Leading vs Trailing Execution
Ko'p hollarda biz funksiyamizni hodisa boshlanganda darhol chaqirilishini (leading/immediate), yoki hodisa to'xtaganidan keyingina chaqirilishini (trailing) xohlaymiz:
* **Leading (leading: true, trailing: false):** Foydalanuvchi tugmani birinchi marta bosganda funksiya darhol chaqiriladi. Keyingi chaqiruvlar esa to'xtash ro'y berguncha bloklanadi.
* **Trailing (leading: false, trailing: true - default):** Funksiya faqat kutish vaqti tugaganidan keyin, oxirgi chaqiruv qiymati bilan ishlaydi.

\`\`\`mermaid
gantt
    title Debounce va Throttle Vaqt Diagrammasi
    dateFormat  X
    axisFormat %s
    section Hodisalar (Events)
    Trigger 1 (0s)        :active, 0, 1
    Trigger 2 (1s)        :active, 1, 2
    Trigger 3 (2s)        :active, 2, 3
    Trigger 4 (5s)        :active, 5, 6
    section Debounce (2s delay)
    Execution 1 (4s)      :crit, 4, 5
    Execution 2 (7s)      :crit, 7, 8
    section Throttle (2s limit)
    Execution 1 (0s)      :after Trigger 1, 0, 1
    Execution 2 (2s)      :after Trigger 3, 2, 3
    Execution 3 (5s)      :after Trigger 4, 5, 6
\`\`\`

### B. requestAnimationFrame (rAF) Throttling
Agar biz tezkor DOM o'zgarishlarini (masalan, scroll, mousemove, resize) visual ravishda boshqarmoqchi bo'lsak, \`setTimeout\` o'rniga brauzerning **requestAnimationFrame** API-sidan foydalanishimiz lozim.
- **Nega?** \`setTimeout\` brauzer ekran yangilanishi (odatda 60Hz yoki 16.7ms kadrlar zanjiri, ya'ni V-Sync) bilan sinxron emas. Agar u kadrlar o'rtasida ishga tushsa, ba'zi visual o'zgarishlar tashlab ketiladi, bu esa "stuttering" (visual qotish) holatiga sabab bo'ladi. \`rAF\` esa aynan brauzer ekranni chizishidan oldin funksiyani chaqiradi.

\`\`\`mermaid
graph TD
    A[Sinxron Scroll Hodisasi] --> B{rAF faolmi?}
    B -- Yo'q --> C[rAF navbatiga funksiyani qo'shish]
    C --> D[ticked = true bayrog'ini yoqish]
    B -- Ha --> E[Hodisani rad etish / ignore]
    D --> F[Brauzer Repaint oldidan funksiyani bajarish]
    F --> G[ticked = false bayrog'ini o'chirish]
\`\`\`

### C. Cancellation (Bekor qilish) va Flushing
Murakkab tizimlarda (masalan, React komponentlari o'chganda (unmount)), fonda rejalashtirilgan taymerlarni tozalash juda muhim.
* **\`.cancel()\`:** Rejalashtirilgan setTimeout'ni tozalaydi, bu esa memory leak va o'chgan komponent state'ini yangilash xatolarining oldini oladi.
* **\`.flush()\`:** Kutib turgan setTimeout'ni zudlik bilan ishga tushirib, so'ngra tozalaydi.

---

## 4. KO'P UCHRAYDIGAN XATOLAR (Edge Cases)
1. **Context (this) ni yo'qotish:** Debounce va Throttle funksiyalari qaytargan wrapper funksiya ichida original funksiyani shunchaki \`func()\` deb chaqirish \`this\` kontekstini yo'qotadi. Buning oldini olish uchun \`func.apply(this, args)\` ishlatish shart.
2. **Har bir renderda yangi taymer yaratish (React'da):** React componentlari render bo'lganda oddiy debounce funksiyalar har safar qaytadan yaratilib, eski taymerlarni yo'qota olmaydi. Buning uchun React'da \`useCallback\` yoki \`useRef\` ishlatilishi kerak.

---

## 5. 12 TA SAVOL VA JAVOBLAR
**1. Debounce nima?** Debounce — hodisa chaqirilishi butunlay to'xtagandan kechiktirib, ma'lum bir kutish vaqtidan so'nggina funksiyani bajarish usuli.

**2. Throttle nima?** Throttle — hodisa har qancha tez-tez ro'y bermasin, funksiyani faqat belgilangan vaqt oralig'ida (chastotada) bir marta bajarish cheklovidir.

**3. Debounce va Throttle o'rtasidagi asosiy farq nima?** Debounce oxirgi harakatdan keyin kutadi va bir marta ishlaydi. Throttle esa harakat davom etayotgan bo'lsa ham muntazam vaqt oralig'ida ishlashda davom etadi.

**4. Qidiruv inputlariga (Search Auto-complete) qaysi biri mos keladi?** Debounce mos keladi. Foydalanuvchi yozishdan to'xtagandan keyingina serverga API so'rov yuborish ma'qul.

**5. Scroll yoki Window Resize hodisalariga qaysi biri yaxshiroq?** Throttle yaxshiroq. Sahifa scroll bo'layotganda har 100-200ms da sahifa holatini hisoblab turish uchun throttle qulay.

**6. Debounce ichida clearTimeout nima uchun kerak?** Agar foydalanuvchi belgilangan vaqt tugamasdan turib yana harakat qilsa, eski taymerni bekor qilib, yangi taymerni boshlash uchun kerak.

**7. Throttle ichidagi inThrottle bayrog'i nima qiladi?** Funksiya hozirda \\"kutish\\" (bajarilganidan keyingi cheklov) rejimida ekanligini bildiradi va yangi chaqiruvlarni bloklaydi.

**8. apply() ishlatish nima uchun zarur?** Wrapper funksiyaga kelgan arguments massivi va joriy this kontekstini original funksiyaga o'tkazish uchun.

**9. Debounce'da immediate opsiyasi nima?** Bu opsiya yoqilganda kutish vaqtini boshlashdan oldin funksiya darhol chaqiriladi, so'ngra keyingi chaqiruvlar bloklanadi.

**10. O'yinlardagi o'q otish tugmasiga qaysi biri mos?** Throttle mos. Qahramon har qancha tez tugmani bosmasin, o'qlar faqat ma'lum bir tezlik oralig'ida otiladi.

**11. Debounce funksiyani bekor qilish (cancel) qachon kerak bo'ladi?** Masalan, component sahifadan o'chib ketganda (unmount), hali bajarilmagan setTimeout taymerini tozalab, memory leak oldini olish uchun.

**12. CSS orqali rate limit qilish mumkinmi?** Yo'q, CSS hodisalar chastotasini boshqara olmaydi. Bu faqat JS yordamida mantiqiy darajada bajariladi.
`,
  exercises: [
    {
      id: 1,
      title: "Taymerni kechiktirish",
      instruction: "setTimeout yordamida 'hello' funksiyasini 100ms keyin chaqiring.",
      startingCode: "function hello() {\n  console.log('hi');\n}\n// Kodni yozing\n",
      hint: "setTimeout(hello, 100);",
      test: "if (code.includes('setTimeout')) return null; return 'setTimeout ishlatilmadi';"
    },
    {
      id: 2,
      title: "Taymerni bekor qilish",
      instruction: "Yaratilgan taymerni bekor qiling, toki u ishga tushib ketmasin.",
      startingCode: "const timerId = setTimeout(() => console.log('not run'), 500);\n// Kodni yozing\n",
      hint: "clearTimeout(timerId);",
      test: "if (code.includes('clearTimeout')) return null; return 'clearTimeout ishlatilmadi';"
    },
    {
      id: 3,
      title: "Debounce qobig'i",
      instruction: "Boshqa funksiyani qaytaradigan oddiy debounce wrapper funksiyasi qobig'ini yozing.",
      startingCode: "function debounce(func) {\n  return function() {\n    // Wrapper\n  };\n}\n",
      hint: "return function() { ... }",
      test: "if (code.includes('return function')) return null; return 'Wrapper funksiya qaytarilmadi';"
    },
    {
      id: 4,
      title: "Sodda Debounce Yarating",
      instruction: "Berilgan delay bo'yicha ishlaydigan va har safar chaqirilganda eski taymerni bekor qiladigan debounce funksiyasini yozing.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  return function() {\n    // Kodni yozing\n  };\n}\n",
      hint: "clearTimeout(timeoutId); timeoutId = setTimeout(func, delay);",
      test: "if (code.includes('clearTimeout') && code.includes('setTimeout')) return null; return 'clearTimeout yoki setTimeout xato ishlatildi';"
    },
    {
      id: 5,
      title: "Argumentlar bilan Debounce",
      instruction: "Debounce qilingan funksiyaga barcha kelgan argumentlar yetib borishini ta'minlang.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    // dynamic args o'tkazing\n  };\n}\n",
      hint: "timeoutId = setTimeout(() => func(...args), delay);",
      test: "if (code.includes('...args')) return null; return 'Argumentlar uzatilmadi';"
    },
    {
      id: 6,
      title: "Context (this) bilan Debounce",
      instruction: "Original funksiya chaqirilganda funksiya konteksti (this) buzilmasligini apply yordamida ta'minlang.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      // Kodni yozing\n    }, delay);\n  };\n}\n",
      hint: "func.apply(this, args);",
      test: "if (code.includes('apply')) return null; return 'apply() ishlatilmadi';"
    },
    {
      id: 7,
      title: "Throttle qobig'i",
      instruction: "Harakatlarni cheklaydigan throttle funksiyasining boshlang'ich qobig'ini yozing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle = false;\n  return function() {\n    // Wrapper\n  };\n}\n",
      hint: "return function() { ... }",
      test: "if (code.includes('return function')) return null; return 'Wrapper funksiya qaytarilmadi';"
    },
    {
      id: 8,
      title: "Flag-based Throttle",
      instruction: "InThrottle flagi yordamida belgilangan vaqtda faqat bir marta ishlaydigan throttle funksiyasini yozing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle = false;\n  return function() {\n    if (!inThrottle) {\n      func();\n      // inThrottle ni yoqing va vaqt tugagach o'chiring\n    }\n  };\n}\n",
      hint: "inThrottle = true; setTimeout(() => inThrottle = false, limit);",
      test: "if (code.includes('inThrottle = true') && code.includes('false')) return null; return 'Throttle flag boshqaruvi xato';"
    },
    {
      id: 9,
      title: "Throttle parametr uzatish",
      instruction: "Throttled funksiyaga dynamic argumentlarni apply yordamida xavfsiz o'tkazing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      // apply orqali context va args o'tkazing\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n",
      hint: "func.apply(this, args);",
      test: "if (code.includes('apply')) return null; return 'apply yoki args xato';"
    },
    {
      id: 10,
      title: "Immediate Debounce",
      instruction: "Debounce qilingan funksiyani kutishdan oldin birinchi chaqiriqda darhol chaqiradigan 'immediate' parametrini qo'shing.",
      startingCode: "function debounce(func, delay, immediate = false) {\n  let timeoutId;\n  return function(...args) {\n    const callNow = immediate && !timeoutId;\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      timeoutId = null;\n      if (!immediate) func.apply(this, args);\n    }, delay);\n    if (callNow) func.apply(this, args);\n  };\n}\n",
      hint: "Konstruktsiya berilgan, uni o'rganing va return null qaytarish uchun kodni yuboring",
      test: "if (code.includes('immediate')) return null; return 'Immediate qo\\'llanilmagan';"
    },
    {
      id: 11,
      title: "Cancelable Debounce",
      instruction: "Debounce funksiyaga uni muddatidan oldin bekor qiluvchi '.cancel()' metodini qo'shing.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  const debounced = function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n  // debounced.cancel metodini yarating\n  return debounced;\n}\n",
      hint: "debounced.cancel = () => clearTimeout(timeoutId);",
      test: "if (code.includes('.cancel')) return null; return 'cancel metodi qo\\'shilmadi';"
    },
    {
      id: 12,
      title: "Custom Throttle trailing",
      instruction: "Throttled funksiyada limit oralig'idagi oxirgi chaqiruv ham saqlanib qolib bajarilishini ta'minlovchi trailing opsiyasini tekshiring.",
      startingCode: "function throttleTrailing(func, limit) {\n  let timeoutId = null;\n  let lastArgs = null;\n  return function(...args) {\n    lastArgs = args;\n    if (!timeoutId) {\n      timeoutId = setTimeout(() => {\n        func.apply(this, lastArgs);\n        timeoutId = null;\n      }, limit);\n    }\n  };\n}\n",
      hint: "Berilgan kodni tekshirish uchun topshiring.",
      test: "if (code.includes('timeoutId = null')) return null; return 'Trailing mantiqi xato';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Bekor qilinuvchi Debounce (debounceWithCancel)",
      instruction: "Debounce qilingan funksiyaga `.cancel()` metodini qo'shib, rejalashtirilgan so'nggi chaqiruvni bekor qilishni amalga oshiring.",
      startingCode: "function debounceWithCancel(func, delay) {\n  let timeoutId;\n  const debounced = function(...args) {\n    // Kodni shu yerdan yozing\n  };\n  // debounced.cancel metodini yozing\n  return debounced;\n}\n",
      hint: "const debounced = function(...args) { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(this, args), delay); }; debounced.cancel = () => clearTimeout(timeoutId); return debounced;",
      test: "if (typeof debounceWithCancel !== 'function') return 'debounceWithCancel funksiya emas';\nlet count = 0;\nconst f = () => count++;\nconst d = debounceWithCancel(f, 50);\nd(); d(); d.cancel();\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (count === 0) resolve(null);\n    else resolve('Debounce bekor qilinmadi, funksiya baribir ishladi');\n  }, 100);\n});"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ requestAnimationFrame orqali Throttle (rAFThrottle)",
      instruction: "Scroll va mousemove kabi visual hodisalar unumdorligini oshirish uchun funksiyani `requestAnimationFrame` yordamida throttle qiluvchi `rAFThrottle(func)` funksiyasini yozing.",
      startingCode: "function rAFThrottle(func) {\n  let ticked = false;\n  return function(...args) {\n    // Kodni shu yerdan yozing\n  };\n}\n",
      hint: "return function(...args) { if (!ticked) { ticked = true; requestAnimationFrame(() => { func.apply(this, args); ticked = false; }); } };",
      test: "if (typeof rAFThrottle !== 'function') return 'rAFThrottle funksiya emas';\nlet count = 0;\nconst f = () => count++;\nconst t = rAFThrottle(f);\nt(); t(); t();\nreturn new Promise(resolve => {\n  requestAnimationFrame(() => {\n    if (count === 1) resolve(null);\n    else resolve('rAFThrottle funksiyasi kadr ichida faqat 1 marta ishlashi kerak edi, lekin ish soni: ' + count);\n  });\n});"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Lift eshigi analogiyasi qaysi texnologiyani yaxshi tushuntiradi?",
      options: ["Throttle", "Debounce", "Recursion", "Garbage Collection"],
      correctAnswer: 1,
      explanation: "Lift eshigi tugma oxirgi marta bosilgandan so'ng ma'lum vaqt o'tgachgina yopiladi. Bu harakatlar tugagach ishlaydigan Debounce texnikasining aynan o'zidir."
    },
    {
      id: 2,
      question: "Qidiruv (Search input) maydonlarida foydalanuvchi yozishini serverga yuborishda nega Debounce ishlatiladi?",
      options: [
        "Serverga boradigan so'rovlar sonini keskin kamaytirish uchun",
        "Ma'lumotlar xavfsizligini ta'minlash uchun",
        "Matnni avtomat ravishda tarjima qilish uchun",
        "Foydalanuvchi tezligini oshirish uchun"
      ],
      correctAnswer: 0,
      explanation: "Agar foydalanuvchi 'JavaScript' so'zini yozsa, debounce bo'lmasa 10 marta API so'rov yuborilardi. Debounce yozish to'xtashini kutib, faqat 1 ta yakuniy so'rov yuboradi."
    },
    {
      id: 3,
      question: "Metro turniketi analogiyasi qaysi biriga mos keladi?",
      options: ["Debounce", "Throttle", "Promise", "Callback"],
      correctAnswer: 1,
      explanation: "Metro turniketidan odamlar har qancha tez o'tishga urinmasin, u faqat belgilangan vaqt oralig'ida bittadan odamni o'tkazadi. Bu muntazam chastota bilan ishlaydigan Throttle usuliga mos keladi."
    },
    {
      id: 4,
      question: "Debounce va Throttle'da `apply(this, args)` ishlatishning asosiy sababi nima?",
      options: [
        "Kodni qisqartirish",
        "Funksiya chaqirilganda `this` konteksti va dynamic argumentlarni saqlab qolish",
        "Funksiyani asinxron qilish",
        "Xatoliklarni avtomatik ushlash"
      ],
      correctAnswer: 1,
      explanation: "setTimeout ichida chaqirilgan callback funksiyalar global contextga ishora qilib qoladi. Asl context (this) va barcha argumentlar original funksiyaga yetib borishi uchun `apply` yordamida uzatiladi."
    },
    {
      id: 5,
      question: "Foydalanuvchi scroll qilayotganda ekrandagi rasmlarni yuklash (Lazy Loading) uchun qaysi biri eng samarali?",
      options: ["Debounce", "Throttle", "Cheksiz loop", "Sinxron yuklash"],
      correctAnswer: 1,
      explanation: "Scroll vaqtida ekranga yangi element tushganini muntazam ravishda tekshirib turish kerak. Scroll harakati uzoq davom etishi mumkinligi sababli, har 100-200ms da bir marta tekshiruv o'tkazish uchun Throttle eng yaxshi yechim hisoblanadi."
    },
    {
      id: 6,
      question: "Debounce ichida `clearTimeout(timeoutId)` chaqirilishi qanday vazifani bajaradi?",
      options: [
        "Funksiyani butunlay o'chirib yuboradi",
        "Agar avvalgi chaqiruv bo'yicha taymer hali tugamagan bo'lsa, uni bekor qiladi va yangi taymer uchun zor ochadi (taymerni nollaydi)",
        "Taymerni darhol ishga tushiradi",
        "Brauzer keshini tozalaydi"
      ],
      correctAnswer: 1,
      explanation: "Har safar hodisa yangidan sodir bo'lganda, avvalgi rejalashtirilgan setTimeout bekor qilinishi kerak, aks holda funksiya kutilganidan ko'p marta ishlab ketadi. `clearTimeout` aynan shu eski taymerni bekor qiladi."
    },
    {
      id: 7,
      question: "Debounce'da `immediate` (yoki `leading`) parametri yoqilganda nima sodir bo'ladi?",
      options: [
        "Funksiya birinchi chaqiriqdanoq darhol bajariladi, so'ngra ketma-ket chaqiriqlar belgilangan vaqt ichida bloklanadi",
        "Funksiya hech qachon bajarilmaydi",
        "Funksiya har doim bir vaqtda 2 marta bajariladi",
        "Funksiya asinxron emas, sinxron ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "`immediate` yoki `leading` deb nomlanuvchi opsiya foydalanuvchi birinchi marta tugmani bosganda funksiyani darhol bajarishga, so'ngra ketma-ket tezkor bosishlarni kechiktirib bloklashga imkon beradi."
    },
    {
      id: 8,
      question: "Throttle limit vaqti davomida yuz bergan yangi chaqiriqlarga qanday munosabatda bo'ladi?",
      options: [
        "Ularni navbatga (queue) qo'shadi va hammasini ketma-ket bajaradi",
        "Ularni rad etadi (ignoring / e'tiborsiz qoldiradi) va faqat limit tugagach keyingi chaqiriqni qabul qiladi",
        "Sahifani qayta yuklaydi",
        "Xatolik (error) qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Throttle qat'iy vaqt oralig'ida ishlashni ta'minlagani uchun, belgilangan limit muddati ichida yuz bergan barcha chaqiriqlar shunchaki e'tiborsiz qoldiriladi."
    },
    {
      id: 9,
      question: "Nima uchun Debounce yoki Throttle ishlatilgan komponentlar sahifadan o'chganda (unmount bo'lganda) taymerlarni bekor qilish (cancel) muhim?",
      options: [
        "Brauzer xotirasida 'memory leak' (xotira yetishmovchiligi) oldini olish va o'chib ketgan komponent elementlariga murojaat qilishda xatolik chiqmasligi uchun",
        "CSS stillari buzilmasligi uchun",
        "LocalStorage tozalanib ketishi uchun",
        "HTTP so'rovlar sonini oshirish uchun"
      ],
      correctAnswer: 0,
      explanation: "Agar komponent o'chib ketgandan keyin ham setTimeout taymeri faol tursa va u o'chgan element yoki komponent holatini (state) o'zgartirmoqchi bo'lsa, xatolik kelib chiqadi va xotira band bo'lib qoladi."
    },
    {
      id: 10,
      question: "Brauzer oynasi o'lchami o'zgarganda (`resize` event) sahifadagi elementlar koordinatalarini qayta hisoblash uchun qaysi usul eng mos keladi?",
      options: [
        "Debounce",
        "Throttle",
        "Ikkalasi ham bir xil mos keladi",
        "Hech biri mos kelmaydi"
      ],
      correctAnswer: 1,
      explanation: "resize hodisasi oyna surilayotgan paytda juda ko'p marta chaqiriladi. Har 100-200ms da sahifani yangilab turish (foydalanuvchiga silliq ko'rinishi) uchun Throttle mosroq."
    },
    {
      id: 11,
      question: "JavaScript-dagi qaysi mashhur kutubxona Debounce va Throttle funksiyalarining tayyor mukammal realizatsiyalarini taqdim etadi?",
      options: [
        "React",
        "Lodash",
        "Express",
        "Redux"
      ],
      correctAnswer: 1,
      explanation: "Lodash (`_.debounce` va `_.throttle` yordamida) ushbu rate-limit funksiyalarini barcha edge-case'lar (leading, trailing, cancel va h.k.) bilan to'liq taqdim etadi."
    },
    {
      id: 12,
      question: "Sichqoncha harakati (`mousemove`) davomida koordinatalarni serverga yuborishda nega Throttle ishlatiladi?",
      options: [
        "Sichqoncha harakati har bir pikselda hodisa hosil qiladi, Throttle esa so'rovlar oqimini ma'lum vaqt oralig'i (masalan, har 100ms) bilan cheklab beradi",
        "Sichqonchani to'xtatadi",
        "Koordinatalarni shifrlash uchun",
        "Koordinata qiymatini 0 ga aylantirish uchun"
      ],
      correctAnswer: 0,
      explanation: "`mousemove` vaqtida har bir piksel harakatida hodisa chaqiriladi. Throttle so'rovlar chastotasini kamaytiradi."
    },
    {
      id: 13,
      question: "DOM o'zgarishlari va yuqori chastotali visual hodisalar uchun `requestAnimationFrame` yordamida throttling qilishning `setTimeout`ga nisbatan asosiy afzalligi nima?",
      options: [
        "Chunki rAF so'rovlarni local storage-ga yozib qo'yadi",
        "U brauzerning ekran yangilash kadrlariga (V-Sync, odatda 60fps) to'liq moslashib, visual qotishlarni (stuttering) bartaraf etadi va ortiqcha chizish ishini oldini oladi",
        "U tarmoq ulanishlarini butunlay to'xtatadi",
        "Hech qanday afzalligi yo'q"
      ],
      correctAnswer: 1,
      explanation: "requestAnimationFrame visual ishlarni aynan brauzer ekranni yangilashidan oldin bajaradi. Bu setTimeout kabi kadrlarni buzmasdan, visual jihatdan eng silliq natijani beradi."
    },
    {
      id: 14,
      question: "Debounce yoki Throttle qilingan funksiyalarda `.cancel()` metodidan foydalanish qachon tavsiya etiladi?",
      options: [
        "Komponent yuklanishi (mount) boshlanishi bilanoq",
        "Komponent sahifadan o'chib ketganda (unmount bo'lganda) fondagi taymerlarni tozalash va xotira sizib chiqishini (memory leak) oldini olish uchun",
        "Faqat so'rov muvaffaqiyatli yakunlanganda",
        "Har 5 soniyada majburan chaqirib turish kerak"
      ],
      correctAnswer: 1,
      explanation: "Komponent unmount bo'lganda, fonda hali bajarilmagan taymerlar qolishi xavfli. Ular tozalab tashlanmasa, memory leak bo'ladi yoki nofaol komponentni yangilashga urinib xatolik beradi."
    }
  ]
};

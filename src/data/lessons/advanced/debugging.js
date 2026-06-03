export const debugging = {
  id: "a7",
  title: "Debugging - Xatolarni ovlash san'ati",
  theory: `## 1. NEGA kerak?
Dasturchi vaqtining katta qismi yangi kod yozishga emas, balki yozilgan koddagi xatolarni topish va bartaraf etishga sarflanadi. **Debugging** — bu dasturdagi "bug" (xato) larni aniqlash, ularning kelib chiqish sababini tahlil qilish va ularni tuzatish jarayonidir. To'g'ri debugging usullarini va vositalarini chuqur bilish dasturchining samaradorligini o'n barobargacha oshirishi hamda murakkab production xatolarini bir necha daqiqada topish imkonini beradi.

## 2. SODDALIK (Analogiya)
Buni **shifokor va tashxis qo'yish** jarayoniga o'xshatish mumkin. Shifokor bemorni shunchaki tashqi ko'rinishidan kuzatibgina qolmay, maxsus asboblar (rentgen, MRT, qon tahlili) yordamida ichki a'zolarni tekshiradi. Debuggingda ham biz konsol metodlari, \`debugger\` kalit so'zi va brauzerning DevTools paneli yordamida dasturning "ichki a'zolari" (xotira holati, o'zgaruvchilar scopes, funksiyalar chaqiriqlari zanjiri) holatini tekshiramiz.

## 3. CHUQUR NAZARIYA VA ILG'OR VOSITALAR

### A. Chrome DevTools Panellari va Debugging
Zamonaviy brauzerlarning DevTools paneli juda kuchli debugging asboblari to'plamiga ega:
1. **Sources (Manbalar) tabi:** Kodni tahlil qilish, breakpointlar qo'yish va qadam-baqadam bajarish uchun asosiy oyna.
2. **Network (Tarmoq) tabi:** Tarmoq so'rovlari (fetch/xhr, WebSockets), server javoblari (headers, payload) va yuklanish vaqtlarini tahlil qilish uchun.
3. **Performance (Samaradorlik) tabi:** CPU yuklanishi, renderlash kechikishlari va koddagi sekin ishlayotgan funksiyalarni aniqlash (profiling) uchun.
4. **Memory (Xotira) tabi:** Xotira sizib chiqishi (memory leaks) va heap snapshotlar orqali xotira taqsimotini tahlil qilish uchun.

### B. Breakpoint turlari va ishlatilishi
Faqat kodga kirib qo'lda breakpoint qo'yishdan tashqari, DevTools bir necha aqlli breakpointlarni taklif etadi:
- **Line Breakpoint:** Kodning ma'lum bir qatorida to'xtash.
- **Conditional Breakpoint:** Faqat yozilgan shart \`true\` bo'lgandagina (masalan, \`user.id === 42\`) o'sha qatorda to'xtash.
- **Logpoint:** Kodni to'xtatmasdan, ma'lum qatordan o'tayotganda konsolga ma'lumot chiqarish (kodga console.log yozish zaruriyatini yo'qotadi).
- **DOM Mutation Breakpoint:** DOM daraxti o'zgarganda to'xtash:
  - *Subtree modifications:* Element ichidagi bolalar o'zgarganda.
  - *Attribute modifications:* Class, style kabi atributlar o'zgarganda.
  - *Node removal:* Element butunlay o'chirilganda.
- **XHR/fetch Breakpoint:** So'rov URL-manzili ma'lum bir qismni o'z ichiga olganda to'xtash.
- **Event Listener Breakpoint:** Klik, scroll, klaviaturani bosish kabi hodisalar sodir bo'lganda to'xtash.

\`\`\`mermaid
graph TD
    Start([Debug qilish sharti]) --> Query{Muammo nima bilan bog'liq?}
    Query -->|Faqat ma'lum bir holatda| Cond[Conditional Breakpoint]
    Query -->|DOM element o'zgarishi| DOM[DOM Mutation Breakpoint]
    Query -->|API so'rovi xatoligi| XHR[XHR/fetch Breakpoint]
    Query -->|Foydalanuvchi harakati| Event[Event Listener Breakpoint]
    Query -->|Kod to'xtamasdan loglash| Log[Logpoint]
    Query -->|Oddiy ketma-ketlik| Line[Standard Line Breakpoint]
    
    style Cond fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff
    style DOM fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff
    style XHR fill:#d35400,stroke:#e67e22,stroke-width:2px,color:#fff
    style Event fill:#2980b9,stroke:#3498db,stroke-width:2px,color:#fff
    style Log fill:#8e44ad,stroke:#9b59b6,stroke-width:2px,color:#fff
\`\`\`

### C. Advanced Console APIs
Konsol faqat \`console.log\` emas. Quyidagi metodlar tahlilni soddalashtiradi:
- \`console.dir(obj)\` — Obyektning barcha ichki xususiyatlarini daraxt (tree) ko'rinishida chiqaradi.
- \`console.groupCollapsed('Name')\` — Konsol loglarini yopiq guruh ko'rinishida yig'adi.
- \`console.countReset('Name')\` — Chaqiriqlar hisoblagichini nolga tenglashtiradi.
- \`console.timeLog('Name')\` — Taymerni to'xtatmasdan, joriy vaqtni log shaklida chiqaradi.
- \`console.log('%c Maxfiy', 'color: red; font-size: 20px')\` — Konsol logini CSS yordamida stillash imkonini beradi.

### D. Source Maps tushunchasi
Production uchun kod har doim siqiladi (minify) va optimallashtiriladi. Natijada xatolik kelib chiqqanda konsolda faqat \`main.min.js:1:3584\` kabi o'qib bo'lmas satrlar ko'rinadi.
**Source Map** — siqilgan, transpilatsiya qilingan (Babel, TypeScript) yoki yig'ilgan (Vite, Webpack) ishlab chiqarish kodini asl manba kodiga (original source code) bog'lab beruvchi xaritadir. Brauzer DevTools uni aniqlab, dasturchiga xatolikning asl fayldagi qatorini (masalan, \`src/components/Button.jsx:42\`) ko'rsatib beradi.

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Browser as Brauzer (DevTools)
    participant Server as Web Server (Production)
    participant SourceMap as Source Map File (.js.map)
    participant Source as Asl Kod (TypeScript/JSX)

    Browser->>Server: main.min.js faylini so'rash va yuklash
    Server-->>Browser: Minifikatsiya qilingan kod (main.min.js)
    Note over Browser: Xatolik yuz berdi! (main.min.js:1:1598)
    Browser->>Server: sourceMappingURL orqali main.min.js.map faylini so'rash
    Server-->>Browser: main.min.js.map fayli
    Browser->>SourceMap: Indeks bo'yicha bog'lanishni tekshirish
    SourceMap-->>Browser: Asl kod manzili (Button.tsx, 42-qator)
    Note over Browser: DevTools asl kodni ko'rsatadi (Button.tsx:42)
\`\`\`

## 4. XATOLAR (Common mistakes)
- **Loglarni ishlab chiqarishga (production) qoldirish:** Konsoldagi keraksiz loglar xavfsizlikka hamda dasturning ishlash tezligiga salbiy ta'sir ko'rsatishi mumkin.
- **Logic errorlarni loglarsiz topishga urinish:** Faqat taxmin qilish o'rniga breakpointlar yoki kuzatuv oynalaridan (\`Watch\`) foydalanish zarur.
- **Source Map fayllarini ommaviy serverga yuklash:** Source Map fayllari loyihaning asl kodini oshkor qiladi. Ularni faqat lokal yoki yopiq VPN orqali DevTools-ga taqdim qilish tavsiya etiladi.

## 5. SAVOLLAR VA JAVOBLAR
**1. Source Map nimaga xizmat qiladi?**
Ishlab chiqarishdagi minifikatsiya qilingan kod qatorlarini dasturchi yozgan toza asl kod qatorlari bilan bog'lash uchun.

**2. Conditional Breakpoint nima uchun kerak?**
Ko'p aylanadigan sikllar (loop) yoki harakatlar ichida faqat aniq shart bajarilgandagina dasturni pauza qilish uchun.

**3. console.dir() va console.log() farqi nimada?**
\`console.log\` elementni HTML daraxti sifatida chiqarsa, \`console.dir\` uni barcha xususiyat va metodlarga ega JavaScript obyekti sifatida ko'rsatadi.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Console Table",
      instruction: "Obyektni jadval ko'rinishida chiqaring.",
      startingCode: "const car = { model: 'Tesla', year: 2023 };\n// Bu yerda console.table ishlating\n",
      hint: "console.table(car);",
      test: "if (code.includes('console.table')) return null; return 'console.table ishlatilmadi';"
    },
    {
      id: 2,
      title: "2️⃣ Console Error log",
      instruction: "'Xatolik yuz berdi!' xabarini console.error yordamida konsolga chiqaring.",
      startingCode: "// Error log yozing\n",
      hint: "console.error('Xatolik yuz berdi!');",
      test: "if (code.includes('console.error')) return null; return 'console.error dan foydalaning';"
    },
    {
      id: 3,
      title: "3️⃣ Console Warn log",
      instruction: "'Ogohlantirish!' xabarini console.warn yordamida konsolga chiqaring.",
      startingCode: "// Warn log yozing\n",
      hint: "console.warn('Ogohlantirish!');",
      test: "if (code.includes('console.warn')) return null; return 'console.warn dan foydalaning';"
    },
    {
      id: 4,
      title: "4️⃣ Debugger kalit so'zi",
      instruction: "Funksiya ichida 'result' hisoblangandan keyin kodni pauza qilish uchun 'debugger' kalit so'zini joylashtiring.",
      startingCode: "function checkResult(x) {\n  const result = x * 2;\n  // debugger yozing\n  return result;\n}",
      hint: "debugger;",
      test: "if (code.includes('debugger;')) return null; return 'debugger kalit so\\'zini yozing';"
    },
    {
      id: 5,
      title: "5️⃣ Console Time",
      instruction: "'testTime' yorlig'i ostida vaqtni o'lchashni boshlang va tugating.",
      startingCode: "// Vaqtni o'lchashni boshlang va tugating\n",
      hint: "console.time('testTime'); console.timeEnd('testTime');",
      test: "if (code.includes('console.time') && code.includes('console.timeEnd')) return null; return 'console.time va console.timeEnd dan foydalaning';"
    },
    {
      id: 6,
      title: "6️⃣ Console Count",
      instruction: "'counter' yorlig'i necha marta chaqirilganini sanash uchun console.count ni yozing.",
      startingCode: "function clickEvent() {\n  // console.count chaqiring\n}",
      hint: "console.count('counter');",
      test: "if (code.includes('console.count')) return null; return 'console.count dan foydalaning';"
    },
    {
      id: 7,
      title: "7️⃣ Console Group",
      instruction: "'MyLogs' yorlig'i ostida konsol loglarini guruhlang va guruhni yoping.",
      startingCode: "// Guruhni oching, log yozing va guruhni yoping\n",
      hint: "console.group('MyLogs'); console.log('Hi'); console.groupEnd();",
      test: "if (code.includes('console.group') && code.includes('console.groupEnd')) return null; return 'console.group va console.groupEnd ishlatilsin';"
    },
    {
      id: 8,
      title: "8️⃣ Console Trace",
      instruction: "Funksiya qanday chaqirilganini (Call Stack trace) ko'rish uchun console.trace ni ishlating.",
      startingCode: "function processTask() {\n  // Trace ni chaqiring\n}",
      hint: "console.trace();",
      test: "if (code.includes('console.trace()')) return null; return 'console.trace() dan foydalaning';"
    },
    {
      id: 9,
      title: "9️⃣ Try...Catch Error logging",
      instruction: "Catch blokida xato xabarini (err.message) console.error yordamida chiqaring.",
      startingCode: "try {\n  throw new Error('Test xatosi');\n} catch(err) {\n  // Error log yozing\n}",
      hint: "console.error(err.message);",
      test: "if (code.includes('console.error(err.message)') || code.includes('console.error(err.message)')) return null; return 'err.message ni console.error yordamida chiqaring';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ Console Assert",
      instruction: "Yoshi 18 dan kichik bo'lsa 'Yosh yetarli emas' xabarini chiqaruvchi console.assert yozing.",
      startingCode: "const age = 15;\n// console.assert yozing\n",
      hint: "console.assert(age >= 18, 'Yosh yetarli emas');",
      test: "if (code.includes('console.assert') && code.includes('age >= 18')) return null; return 'console.assert dan foydalaning';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Conditional Breakpoint sharti",
      instruction: "Agar index 5 bo'lsa kodni to'xtatuvchi shartli debugger yozing (if orqali).",
      startingCode: "const index = 5;\n// if sharti bilan debugger yozing\n",
      hint: "if (index === 5) debugger;",
      test: "if (code.includes('if') && code.includes('index') && code.includes('debugger')) return null; return 'if orqali index === 5 bo\\'lganda debugger qo\\'shing';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Console Clear",
      instruction: "Konsolni dasturiy ravishda tozalash buyrug'ini yozing.",
      startingCode: "// Konsolni tozalang\n",
      hint: "console.clear();",
      test: "if (code.includes('console.clear()')) return null; return 'console.clear() metodini chaqiring';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Operatsiya vaqtini o'lchash (timeOperation)",
      instruction: "`console.time` va `console.timeEnd` metodlaridan foydalanib, berilgan `callback` funksiyasining bajarilish vaqtini `label` yorlig'i ostida o'lchovchi va callback natijasini qaytaruvchi `timeOperation(label, callback)` funksiyasini yozing.",
      startingCode: "function timeOperation(label, callback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "console.time(label);\nconst res = callback();\nconsole.timeEnd(label);\nreturn res;",
      test: "if (typeof timeOperation !== 'function') return 'timeOperation funksiya emas';\nlet called = false;\nconst res = timeOperation('test', () => { called = true; return 42; });\nif (!called || res !== 42) return 'Callback to\\'g\\'ri bajarilmadi yoki natija qaytarilmadi';\nif (!code.includes('console.time') || !code.includes('console.timeEnd')) return 'console.time va console.timeEnd ishlatilmadi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Call Stack izlarini chiqarish (traceCallStack)",
      instruction: "Chaqirilayotgan funksiyalarning to'liq izini (`Call Stack trace`) konsolga chiqarish uchun `console.trace()` metodidan foydalanuvchi va `callback` funksiyasini chaqirib natijasini qaytaruvchi `traceCallStack(callback)` funksiyasini yozing. Agarda callback bajarilishida xatolik yuz bersa, uni ushlab olib, xato xabarini `console.error` orqali chiqaring va `null` qaytaring.",
      startingCode: "function traceCallStack(callback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try {\n  console.trace();\n  return callback();\n} catch(err) {\n  console.error(err.message);\n  return null;\n}",
      test: "if (typeof traceCallStack !== 'function') return 'traceCallStack funksiya emas';\nif (!code.includes('console.trace')) return 'console.trace() ishlatilmadi';\nif (!code.includes('try') || !code.includes('catch') || !code.includes('console.error')) return 'Try-catch yoki console.error ishlatilmadi';\nconst successRes = traceCallStack(() => 'ok');\nif (successRes !== 'ok') return 'Muvaffaqiyatli callback natijasi noto\\'g\\'ri';\nconst failRes = traceCallStack(() => { throw new Error('err'); });\nif (failRes !== null) return 'Xatolik yuz berganda null qaytarilmadi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log` metodidan tashqari, murakkab obyektlar va massivlarni chiroyli hamda o'qilishi oson bo'lgan jadval ko'rinishida consolega chiqarish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`console.dir()`",
        "`console.table()`",
        "`console.group()`",
        "`console.trace()`"
      ],
      correctAnswer: 1,
      explanation: "`console.table()` metodi uzatilgan obyekt yoki massivni jadval (index, key, value) shaklida render qiladi. Bu katta ma'lumotlar bilan ishlashda va ularni solishtirishda juda qulay."
    },
    {
      id: 2,
      question: "Brauzerda JavaScript kodini bajarilishini ma'lum bir qatorda to'xtatib (pauza qilib), o'sha joydagi o'zgaruvchilar qiymatini va call stack holatini DevTools yordamida qadam-baqadam tekshirish uchun kodga qaysi maxsus kalit so'z yoziladi?",
      options: [
        "`stop;`",
        "`break;`",
        "`debugger;`",
        "`pause;`"
      ],
      correctAnswer: 2,
      explanation: "`debugger;` kalit so'zi brauzer uchun dasturni to'xtatish (breakpoint) buyrug'i hisoblanadi. Agar brauzerda DevTools (inspektor) oynasi ochiq bo'lsa, kod aynan shu qatorda to'xtaydi va dasturchiga har bir qadamni kuzatish imkonini beradi."
    },
    {
      id: 3,
      question: "Kodning ma'lum bir qismi (masalan, murakkab loop yoki API so'rovi) qancha vaqt ichida bajarilishini millisekundlarda aniq o'lchash uchun qaysi console metodlari juftligidan foydalaniladi?",
      options: [
        "`console.start()` va `console.stop()`",
        "`console.time()` va `console.timeEnd()`",
        "`console.profile()` va `console.profileEnd()`",
        "`console.count()` va `console.countReset()`"
      ],
      correctAnswer: 1,
      explanation: "`console.time('label')` taymerni ishga tushiradi, `console.timeEnd('label')` esa taymerni to'xtatadi va uning orasidagi vaqtni millisekundlarda chop etadi. Bu performance (samaradorlik) testlari uchun ishlatiladi."
    },
    {
      id: 4,
      question: "Dasturdagi funksiyalar bir-birini qaysi tartibda va qaysi fayllardan chaqirib kelganini (Call Stack iyerarxiyasini) konsolda to'liq ko'rish uchun qaysi metod chaqiriladi?",
      options: [
        "`console.stack()`",
        "`console.trace()`",
        "`console.debug()`",
        "`console.log(Error.stack)`"
      ],
      correctAnswer: 1,
      explanation: "`console.trace()` funksiya qayerda va qaysi funksiyalar orqali chaqirilganligini ko'rsatadigan stack trace (izlar zanjiri)ni konsolda ko'rsatib beradi."
    },
    {
      id: 5,
      question: "Brauzer DevTools'dagi \"Conditional Breakpoint\" (Shartli to'xtash nuqtasi) oddiy Breakpoint'dan nimasi bilan farq qiladi?",
      options: [
        "U faqat internet uzilib qolsagina ishlaydi",
        "U kodni faqat biz yozgan ma'lum bir shart (ifoda) `true` bo'lgandagina o'sha qatorda to'xtatadi, boshqa hollarda kod to'xtamasdan o'tib ketadi",
        "U faqat asinxron funksiyalar ichida ishlaydi",
        "U faqat CSS stillarining xatolarini aniqlaydi"
      ],
      correctAnswer: 1,
      explanation: "Shartli breakpointlar juda ko'p marta aylanadigan looplarda yoki ma'lum bir foydalanuvchi IDsi bilan muammo chiqqanda qo'l keladi. Masalan, `user.id === 42` bo'lgandagina kodni to'xtatish shartini qo'yishimiz mumkin."
    },
    {
      id: 6,
      question: "Quyidagilardan qaysi biri `console.assert()` metodining asosiy vazifasi hisoblanadi?",
      options: [
        "Faqat birinchi argument false bo'lgandagina konsolga xato xabarini chiqaradi",
        "Dasturni majburiy to'xtatadi",
        "Obyektlarni qiyoslaydi",
        "Sinxron va asinxron kodlarni alohida ishga tushiradi"
      ],
      correctAnswer: 0,
      explanation: "`console.assert(condition, message)` metodiga berilgan shart (condition) `false` bo'lsa, konsolga xato xabarini yozadi. Agar shart `true` bo'lsa, hech narsa chop etilmaydi."
    },
    {
      id: 7,
      question: "Chrome DevTools oynasidagi qaysi bo'lim dasturdagi funksiyalar chaqirilish zanjirini ko'rsatadi?",
      options: [
        "Scope",
        "Watch",
        "Call Stack",
        "Breakpoints"
      ],
      correctAnswer: 2,
      explanation: "Call Stack bo'limi dasturdagi hozirgi to'xtab turgan breakpointgacha qaysi funksiyalar qaysi ketma-ketlikda chaqirilganini ko'rsatadi."
    },
    {
      id: 8,
      question: "`console.count('click')` metodi ketma-ket chaqirilganda nima ish bajaradi?",
      options: [
        "Oynadagi clicklar sonini hisoblaydi",
        "Ushbu metod 'click' yorlig'i bilan necha marta chaqirilganini hisoblab boradi va konsolga chiqaradi",
        "Faol elementlar sonini qaytaradi",
        "Tashqi so'rovlarni hisoblaydi"
      ],
      correctAnswer: 1,
      explanation: "`console.count()` berilgan yorliq (label) bo'yicha necha marta chaqirilganini yodda saqlab, har safar chaqirilganda qiymatni bittaga oshirib chop etadi."
    },
    {
      id: 9,
      question: "Konsol oynasini dasturiy ravishda butunlay tozalash uchun qaysi metod ishlatiladi?",
      options: [
        "`console.clean()`",
        "`console.reset()`",
        "`console.clear()`",
        "`console.empty()`"
      ],
      correctAnswer: 2,
      explanation: "`console.clear()` metodi konsol tarixini butunlay o'chirib yuboradi va toza holatga keltiradi."
    },
    {
      id: 10,
      question: "Loglarni guruhlash uchun qaysi metodlar juftligidan foydalaniladi?",
      options: [
        "`console.startGroup()` va `console.endGroup()`",
        "`console.group()` va `console.groupEnd()`",
        "`console.open()` va `console.close()`",
        "`console.table()` va `console.tableEnd()`"
      ],
      correctAnswer: 1,
      explanation: "`console.group('nomi')` guruh yaratadi, undan keyingi loglar ichkariga surilib guruhlanadi, va `console.groupEnd()` uni yopadi."
    },
    {
      id: 11,
      question: "Dastur ishlash paytida (Runtime) kelib chiqadigan, masalan mavjud bo'lmagan ob'ekt xossasini o'qishga urinish qanday xatolik deb ataladi?",
      options: [
        "Syntax Error",
        "Logic Error",
        "Runtime / Reference Error",
        "Compile-time Error"
      ],
      correctAnswer: 2,
      explanation: "Kod yozilishi to'g'ri bo'lsa-da, u bajarilish jarayonida (runtime) mavjud bo'lmagan o'zgaruvchi yoki ob'ekt ustida amal bajarilganda Reference/Type/Runtime error kelib chiqadi."
    },
    {
      id: 12,
      question: "Chrome DevTools-da API so'rovlarini va ularning javoblarini (payload) tahlil qilish uchun qaysi tab (oyna) ishlatiladi?",
      options: [
        "Elements",
        "Console",
        "Network",
        "Application"
      ],
      correctAnswer: 2,
      explanation: "Network (Tarmoq) oynasi barcha HTTP/WebSocket so'rovlarini, ularning yuklanish vaqtlari, javob statuslari va payload ma'lumotlarini to'liq tekshirish imkonini beradi."
    },
    {
      id: 13,
      question: "Nima uchun production-ga tayyorlanayotgan JS bundle-larda Source Map fayllari alohida ajratib olinadi yoki butunlay o'chirib yuboriladi?",
      options: [
        "Dasturning xotiradan foydalanish samaradorligini oshirish uchun",
        "Source Map fayllari loyihaning asl yozilgan toza kodlarini (original source code) ommaga oshkor qilib qo'yishi mumkinligi hamda yuklanish hajmini oshirmaslik uchun",
        "Faqat Safari brauzerida xatoliklar kelib chiqishini oldini olish uchun",
        "CSS stillarini yuklashni tezlashtirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Source map-lar brauzerga minifikatsiya qilingan kodni asl ko'rinishda ko'rsatishga yordam beradi. Agar ular ishlab chiqarishga ommaviy yuklansa, har qanday foydalanuvchi DevTools orqali loyihaning toza, asl manba kodlarini ko'ra oladi."
    },
    {
      id: 14,
      question: "Dastur ishlash paytida DOM elementining atributlari o'zgarganda (masalan, class yoki style o'zgarganda) kod bajarilishini avtomat pauza qilish Chrome DevTools-dagi qaysi Breakpoint orqali amalga oshiriladi?",
      options: [
        "Subtree modifications",
        "Attribute modifications",
        "Node removal",
        "Event Listener breakpoints"
      ],
      correctAnswer: 1,
      explanation: "Attribute modifications breakpoint-i tanlangan DOM elementi ustida atribut o'zgarishi (class qo'shilishi, inline-style o'zgarishi) sodir bo'lganda kod bajarilishini o'sha amalga sababchi bo'lgan qatorda to'xtatadi."
    }
  ]
};

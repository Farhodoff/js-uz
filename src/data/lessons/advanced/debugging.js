export const debugging = {
  id: "a7",
  title: "Debugging - Xatolarni ovlash san'ati",
  theory: `## 1. NEGA kerak?
Dasturchi vaqtining katta qismi yangi kod yozishga emas, balki yozilgan koddagi xatolarni topish va bartaraf etishga sarflanadi. **Debugging** — bu dasturdagi "bug" (xato) larni aniqlash, ularning kelib chiqish sababini tahlil qilish va ularni tuzatish jarayonidir. To'g'ri debugging usullarini bilish dasturchining samaradorligini o'n barobargacha oshirishi mumkin.

## 2. SODDALIK (Analogiya)
Buni **shifokor va tashxis qo'yish** jarayoniga o'xshatish mumkin. Shifokor bemorni shunchaki kuzatibgina qolmay, maxsus asboblar (rentgen, tahlillar) yordamida ichki a'zolarni tekshiradi. Debuggingda ham biz konsol metodlari, \`debugger\` kalit so'zi va brauzerning DevTools paneli yordamida dasturning "ichki a'zolari" (xotira, o'zgaruvchilar, chaqiriqlar zanjiri) holatini tekshiramiz.

## 3. STRUKTURA
Debugging jarayonida foydalaniladigan asosiy vositalar:
- **Console metodlari:** Faqat \`console.log\` emas, balki maxsus \`console.table()\`, \`console.error()\`, \`console.time()\` kabi vositalar.
- **Debugger kalit so'zi:** Kod bajarilishini brauzerda to'xtatib, o'zgaruvchilar qiymatini qadam-baqadam tekshirish nuqtasi.
- **Call Stack:** Funksiyalar zanjirini va ularning chaqirilish tartibini kuzatish.
- **Breakpoints:** Kodni ma'lum bir qatorda yoki ma'lum bir shart bajarilganda (\`Conditional Breakpoint\`) avtomatik to'xtatish.

## 4. AMALIYOT (Mashqlar pastda)
\`console.time()\` yordamida kod bajarilish tezligini o'lchash:
\`\`\`javascript
console.time("Loop vaqti");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("Loop vaqti");
\`\`\`

## 5. XATOLAR (Common mistakes)
- **Loglarni ishlab chiqarishga (production) qoldirish:** Konsoldagi keraksiz loglar xavfsizlikka hamda dasturning ishlash tezligiga salbiy ta'sir ko'rsatishi mumkin.
- **Logic errorlarni loglarsiz topishga urinish:** Faqat taxmin qilish o'rniga breakpointlar yoki kuzatuv oynalaridan (\`Watch\`) foydalanish zarur.
- **Call stack-ni tahlil qilmaslik:** Murakkab xatolarda xatoning aynan qaysi chaqiriqlar zanjiridan kelib chiqqanini tekshirmaslik.

## 6. SAVOLLAR VA JAVOBLAR
**1. debugger kalit so'zi nima qiladi?**
Dastur bajarilishini o'sha qatorda vaqtincha to'xtatadi (agar brauzer inspektori ochiq bo'lsa).

**2. console.table() qachon ishlatiladi?**
Massiv va obyektlarni jadval shaklida chiroyli render qilish uchun.

**3. Call Stack nima?**
Funksiyalarning chaqirilish navbati va iyerarxiyasini ko'rsatuvchi xotira tuzilmasi.
`,
  exercises: [
    {
      id: 1,
      title: "Console Table",
      instruction: "Obyektni jadval ko'rinishida chiqaring.",
      startingCode: "const car = { model: 'Tesla', year: 2023 };\n// Bu yerda console.table ishlating\n",
      hint: "console.table(car);",
      test: "if (code.includes('console.table')) return null; return 'console.table ishlatilmadi';"
    },
    {
      id: 2,
      title: "Console Error log",
      instruction: "'Xatolik yuz berdi!' xabarini console.error yordamida konsolga chiqaring.",
      startingCode: "// Error log yozing\n",
      hint: "console.error('Xatolik yuz berdi!');",
      test: "if (code.includes('console.error')) return null; return 'console.error dan foydalaning';"
    },
    {
      id: 3,
      title: "Console Warn log",
      instruction: "'Ogohlantirish!' xabarini console.warn yordamida konsolga chiqaring.",
      startingCode: "// Warn log yozing\n",
      hint: "console.warn('Ogohlantirish!');",
      test: "if (code.includes('console.warn')) return null; return 'console.warn dan foydalaning';"
    },
    {
      id: 4,
      title: "Debugger kalit so'zi",
      instruction: "Funksiya ichida 'result' hisoblangandan keyin kodni pauza qilish uchun 'debugger' kalit so'zini joylashtiring.",
      startingCode: "function checkResult(x) {\n  const result = x * 2;\n  // debugger yozing\n  return result;\n}",
      hint: "debugger;",
      test: "if (code.includes('debugger;')) return null; return 'debugger kalit so\\'zini yozing';"
    },
    {
      id: 5,
      title: "Console Time",
      instruction: "'testTime' yorlig'i ostida vaqtni o'lchashni boshlang va tugating.",
      startingCode: "// Vaqtni o'lchashni boshlang va tugating\n",
      hint: "console.time('testTime'); console.timeEnd('testTime');",
      test: "if (code.includes('console.time') && code.includes('console.timeEnd')) return null; return 'console.time va console.timeEnd dan foydalaning';"
    },
    {
      id: 6,
      title: "Console Count",
      instruction: "'counter' yorlig'i necha marta chaqirilganini sanash uchun console.count ni yozing.",
      startingCode: "function clickEvent() {\n  // console.count chaqiring\n}",
      hint: "console.count('counter');",
      test: "if (code.includes('console.count')) return null; return 'console.count dan foydalaning';"
    },
    {
      id: 7,
      title: "Console Group",
      instruction: "'MyLogs' yorlig'i ostida konsol loglarini guruhlang va guruhni yoping.",
      startingCode: "// Guruhni oching, log yozing va guruhni yoping\n",
      hint: "console.group('MyLogs'); console.log('Hi'); console.groupEnd();",
      test: "if (code.includes('console.group') && code.includes('console.groupEnd')) return null; return 'console.group va console.groupEnd ishlatilsin';"
    },
    {
      id: 8,
      title: "Console Trace",
      instruction: "Funksiya qanday chaqirilganini (Call Stack trace) ko'rish uchun console.trace ni ishlating.",
      startingCode: "function processTask() {\n  // Trace ni chaqiring\n}",
      hint: "console.trace();",
      test: "if (code.includes('console.trace()')) return null; return 'console.trace() dan foydalaning';"
    },
    {
      id: 9,
      title: "Try...Catch Error logging",
      instruction: "Catch blokida xato xabarini (err.message) console.error yordamida chiqaring.",
      startingCode: "try {\n  throw new Error('Test xatosi');\n} catch(err) {\n  // Error log yozing\n}",
      hint: "console.error(err.message);",
      test: "if (code.includes('console.error(err.message)') || code.includes('console.error(err.message)')) return null; return 'err.message ni console.error yordamida chiqaring';"
    },
    {
      id: 10,
      title: "Console Assert",
      instruction: "Yoshi 18 dan kichik bo'lsa 'Yosh yetarli emas' xabarini chiqaruvchi console.assert yozing.",
      startingCode: "const age = 15;\n// console.assert yozing\n",
      hint: "console.assert(age >= 18, 'Yosh yetarli emas');",
      test: "if (code.includes('console.assert') && code.includes('age >= 18')) return null; return 'console.assert dan foydalaning';"
    },
    {
      id: 11,
      title: "Conditional Breakpoint sharti",
      instruction: "Agar index 5 bo'lsa kodni to'xtatuvchi shartli debugger yozing (if orqali).",
      startingCode: "const index = 5;\n// if sharti bilan debugger yozing\n",
      hint: "if (index === 5) debugger;",
      test: "if (code.includes('if') && code.includes('index') && code.includes('debugger')) return null; return 'if orqali index === 5 bo\\'lganda debugger qo\\'shing';"
    },
    {
      id: 12,
      title: "Console Clear",
      instruction: "Konsolni dasturiy ravishda tozalash buyrug'ini yozing.",
      startingCode: "// Konsolni tozalang\n",
      hint: "console.clear();",
      test: "if (code.includes('console.clear()')) return null; return 'console.clear() metodini chaqiring';"
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
    }
  ]
};

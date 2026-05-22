export const timersLesson = {
  id: "timers",
  title: "Vaqt funksiyalari (Timers)",
  level: "O'rta daraja",
  description: "JavaScriptda vaqt bilan ishlash: kodni kechiktirib ishga tushirish va takroriy amallar.",
  theory: `
# Timers — Bu nima va nima uchun kerak?

JavaScriptda ba'zi amallarni darhol emas, balki ma'lum bir vaqtdan keyin bajarish kerak bo'ladi. Masalan, 3 soniyadan keyin reklamani ko'rsatish yoki har 1 soniyada soatni yangilab turish.

## 1. NEGA kerak?
Tasavvur qiling, sizda "Stopwatch" (sekundomer) bor, u har millisekundda o'zgarib turishi shart. Yoki foydalanuvchiga xabar ko'rsatdingiz va u 5 soniyadan keyin yo'qolishi kerak. Bular timerlar yordamida qilinadi.

## 2. SODDALIK (Analogiya)
*   **setTimeout:** Bu budilnikka o'xshaydi. Siz uni 7:00 ga qo'yasiz, u bir marta jiringlaydi va to'xtaydi.
*   **setInterval:** Bu esa har soatda jiringlaydigan devor soatiga o'xshaydi. Siz uni to'xtatmaguningizcha, u takrorlanaveradi.

## 3. STRUKTURA

### A. setTimeout (Bir marta)
\`\`\`javascript
setTimeout(() => {
  console.log("3 soniya o'tdi!");
}, 3000); // 3000ms = 3s
\`\`\`

### B. setInterval (Takroriy)
\`\`\`javascript
const id = setInterval(() => {
  console.log("Har 1 soniyada...");
}, 1000);
\`\`\`

### C. To'xtatish (clearTimeout / clearInterval)
\`\`\`javascript
clearInterval(id); // Takrorlanishni to'xtatadi
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1.  **Vaqt o'lchovi:** Vaqt millisekundda beriladi (1000 = 1 soniya).
2.  **To'xtatishni unutish:** \`setInterval\`ni to'xtatmasangiz, u sayt yopilguncha ishlayveradi (performance uchun yomon).

## 6. SAVOLLAR VA JAVOBLAR
**1. setTimeout va setInterval farqi nima?**
setTimeout — bir marta, setInterval — takroriy.


**2. 1 soniya necha millisekund?**
1000 ms.


**3. Taymerni qanday to'xtatish mumkin?**
clearInterval(id) yoki clearTimeout(id).


**4. clearTimeout nima uchun kerak?**
setTimeout ni to'xtatish uchun.


**5. Taymer ID-si nima?**
Taymerni o'zgartirish yoki to'xtatish uchun unga berilgan unikal raqam.


**6. setTimeout(() => {}, 0) nima qiladi?**
Kod bajarilishini hozirgi Call Stackdan keyinga suradi (asinxron).


**7. Taymerlar brauzerda qanday navbatga qo'yiladi?**
Callback Queue (MacroTask).


**8. setInterval ichida clearInterval ishlatsa bo'ladimi?**
Ha, shart qanoatlantirilganda to'xtatish uchun.


**9. Bir vaqtda nechta taymer ishlatish mumkin?**
Cheksiz, lekin ko'p bo'lsa sayt qotishi mumkin.


**10. Taymer vaqtini o'zgaruvchida saqlash mumkinmi?**
Ha.


**11. Rekursiv setTimeout nima?**
setTimeout ichida yana setTimeout chaqirish.


**12. requestAnimationFrame taymerlardan nimasi bilan farq qiladi?**
Monitor yangilanish tezligiga (60fps) mos keladi, animatsiyalar uchun qulay.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Kechiktirish (Boshlang'ich)",
      instruction: "2 soniyadan keyin 'Salom' degan yozuvni konsolga chiqaradigan kod yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setTimeout(() => console.log('Salom'), 2000);",
      test: "if (code.includes('setTimeout') && code.includes('2000')) return null; return 'setTimeout noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 2,
      title: "2️⃣ Takrorlash (Boshlang'ich)",
      instruction: "Har 500 millisekundda 'Takror' so'zini chiqaradigan taymer yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setInterval(() => console.log('Takror'), 500);",
      test: "if (code.includes('setInterval') && code.includes('500')) return null; return 'setInterval noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 3,
      title: "3️⃣ To'xtatish (Boshlang'ich)",
      instruction: "'timerId' o'zgaruvchisida saqlangan intervalni to'xtating.",
      startingCode: "const timerId = 123;\n// Bu yerga yozing\n",
      hint: "clearInterval(timerId);",
      test: "if (code.includes('clearInterval(timerId)')) return null; return 'clearInterval ishlatilmadi';"
    },
    {
      id: 4,
      title: "4️⃣ Sanoq (Boshlang'ich)",
      instruction: "3 soniyadan keyin 'Tugadi' so'zini chiqaruvchi taymer yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setTimeout(() => console.log('Tugadi'), 3000);",
      test: "if (code.includes('setTimeout') && code.includes('3000')) return null; return '3000ms kutish kerak';"
    },
    {
      id: 5,
      title: "5️⃣ Rekursiv setTimeout (O'rta)",
      instruction: "Rekursiv setTimeout yordamida har 1000ms da konsolga 'Sanoq' so'zini chiqaradigan run funksiyasi yozing va uni ishga tushiring.",
      startingCode: "function run() {\n  console.log('Sanoq');\n  // Kodni shu yerda yozing: run funksiyasini qayta chaqiring\n}\nrun();",
      hint: "setTimeout(run, 1000);",
      test: "if (code.includes('setTimeout(run') && code.includes('1000')) return null; return 'setTimeout ichida run qayta chaqirilishi kerak!';"
    },
    {
      id: 6,
      title: "6️⃣ clearTimeout ishlatish (O'rta)",
      instruction: "2 soniyadan keyin ishlaydigan timeoutId taymerini darhol bekor qiling (clear qiling).",
      startingCode: "const timeoutId = setTimeout(() => {\n  console.log('Bu ishlamasligi kerak');\n}, 2000);\n\n// Kodni shu yerda yozing: timeoutId taymerini to'xtating",
      hint: "clearTimeout(timeoutId);",
      test: "if (code.includes('clearTimeout(timeoutId)')) return null; return 'clearTimeout ishlatilmadi!';"
    },
    {
      id: 7,
      title: "7️⃣ Parametrli setTimeout (O'rta)",
      instruction: "setTimeout orqali sayHello funksiyasiga 'Ali' argumentini uzatib, uni 1.5 soniyadan keyin chaqiring.",
      startingCode: "function sayHello(name) {\n  console.log('Salom, ' + name);\n}\n\n// Kodni shu yerda yozing: sayHello ni 'Ali' parametri va 1500ms bilan chaqiring",
      hint: "setTimeout(sayHello, 1500, 'Ali');",
      test: "if (code.includes('setTimeout') && code.includes('sayHello') && code.includes('Ali') && code.includes('1500')) return null; return 'setTimeout parametri noto\\'g\\'ri!';"
    },
    {
      id: 8,
      title: "8️⃣ Dinamik Interval To'xtatish (Qiyin)",
      instruction: "Har 500ms da counter qiymatini 1 ga oshiruvchi interval yarating. counter qiymati 3 ga yetganda, interval to'xtashi (clear bo'lishi) kerak.",
      startingCode: "let counter = 0;\nconst intervalId = setInterval(() => {\n  counter++;\n  console.log(counter);\n  // Kodni shu yerda yozing: counter 3 bo'lganda intervalId ni to'xtating\n}, 500);",
      hint: "if (counter === 3) clearInterval(intervalId);",
      test: "if (code.includes('counter === 3') && code.includes('clearInterval(intervalId)')) return null; return 'Sanoq 3 bo\\'lganda clearInterval chaqirilishi kerak!';"
    },
    {
      id: 9,
      title: "9️⃣ Delayed Promise (Qiyin)",
      instruction: "1 soniyadan keyin 'Muvaffaqiyat' yozuvi bilan resolved bo'luvchi Promise qaytaradigan delay funksiyasini yozing.",
      startingCode: "function delay() {\n  return new Promise((resolve) => {\n    // Kodni shu yerda yozing: 1000ms keyin resolve ni chaqiring\n  });\n}",
      hint: "setTimeout(() => resolve('Muvaffaqiyat'), 1000);",
      test: "if (code.includes('setTimeout') && code.includes('resolve') && code.includes('1000')) return null; return 'Promise va setTimeout xato bog\\'landi!';"
    },
    {
      id: 10,
      title: "🔟 Nested setTimeout chain (Qiyin)",
      instruction: "1 soniyadan keyin 'Bir', undan keyin yana 2 soniyadan keyin 'Ikki' yozuvlarini chiqaruvchi ketma-ket setTimeout yozing.",
      startingCode: "// Kodni shu yerda yozing: ketma-ket setTimeout zanjiri\n",
      hint: "setTimeout(() => { console.log('Bir'); setTimeout(() => { console.log('Ikki'); }, 2000); }, 1000);",
      test: "if (code.includes('1000') && code.includes('2000') && code.includes('Bir') && code.includes('Ikki')) return null; return 'Kechikish zanjiri xato!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Debounce Timers (Eng Qiyin)",
      instruction: "Har safar chaqirilganda oldingi taymerni o'chirib, faqat oxirgi chaqiruvdan 300ms keyin funksiyani bajaradigan debounce taymerini boshqaring.",
      startingCode: "let debounceTimer;\nfunction onSearchInput(query) {\n  // Kodni shu yerda yozing: oldingi debounceTimer ni to'xtating va yangisini o'rnating (300ms)\n}",
      hint: "clearTimeout(debounceTimer); debounceTimer = setTimeout(() => console.log(query), 300);",
      test: "if (code.includes('clearTimeout(debounceTimer)') && code.includes('300')) return null; return 'Debounce taymeri to\\'g\\'ri ishlatilmadi!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Custom Interval via Rekursiv setTimeout (Eng Qiyin)",
      instruction: "Rekursiv setTimeout yordamida o'zgaruvchan kechikish vaqti bilan harakat qiladigan interval funksiyasini yozing.",
      startingCode: "let delayTime = 500;\nfunction tick() {\n  console.log('Tik');\n  if (delayTime > 100) delayTime -= 100;\n  // Kodni shu yerda yozing: dynamic delayTime bilan setTimeout chaqiring\n}\nsetTimeout(tick, delayTime);",
      hint: "setTimeout(tick, delayTime);",
      test: "if (code.includes('setTimeout(tick') && code.includes('delayTime')) return null; return 'Rekursiv dynamic setTimeout xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`setTimeout` va `setInterval` funksiyalari o'rtasidagi asosiy farq nimada?",
      options: [
        "`setTimeout` kodni ma'lum vaqtdan keyin faqat bir marta ishga tushiradi, `setInterval` esa ko'rsatilgan vaqt oralig'ida to'xtovsiz takrorlab turadi",
        "`setInterval` faqat soniyalar bilan, `setTimeout` esa millisekundlar bilan ishlaydi",
        "`setTimeout` asinxron, `setInterval` esa sinxron ishlaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "`setTimeout` taymeri o'rnatilgan vaqt o'tgandan keyin berilgan callback funksiyasini faqat 1 marta bajaradi. `setInterval` esa har safar belgilangan vaqt oralig'i (delay) o'tganda funksiyani takroran chaqiraveradi."
    },
    {
      id: 2,
      question: "Quyidagi kod e'lon qilingandan so'ng, konsolga xabarlar qaysi tartibda chiqadi?\n```javascript\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');\n```",
      options: [
        "A, B, C",
        "A, C, B",
        "B, A, C",
        "C, A, B"
      ],
      correctAnswer: 1,
      explanation: "Garchi `setTimeout` kechikishi `0` millisekund etib belgilangan bo'lsa ham, u asinxron vazifa (Macrotask) bo'lgani sababli Macrotask navbatiga (Callback Queue) joylashtiriladi va faqat barcha sinxron kodlar (Call Stack) to'liq bajarilib bo'lingandan keyingina ishlaydi. Shuning uchun tartib: A -> C -> B bo'ladi."
    },
    {
      id: 3,
      question: "Ishga tushirilgan `setInterval` taymerini butunlay to'xtatish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`stopInterval()`",
        "`clearInterval()`",
        "`clearTimeout()`",
        "`deleteInterval()`"
      ],
      correctAnswer: 1,
      explanation: "`setInterval` chaqirilganda qaytariladigan maxsus ID raqamni `clearInterval(timerID)` metodiga uzatish orqali takroriy taymer to'xtatiladi."
    },
    {
      id: 4,
      question: "JavaScript-da timer funksiyalariga (masalan, `setTimeout`) beriladigan vaqt birligi nima?",
      options: [
        "Soniya (Seconds)",
        "Millisekund (Milliseconds) — ya'ni 1 soniya 1000 millisekundga teng",
        "Mikrosekund (Microseconds)",
        "Daqiqa (Minutes)"
      ],
      correctAnswer: 1,
      explanation: "JavaScript taymerlarida vaqt o'lchovi millisekundlarda beriladi. Masalan, 5 soniyani ko'rsatish uchun 5000 qiymati yoziladi."
    },
    {
      id: 5,
      question: "Agar biz har safar oldingi tsikl to'liq bajarilib bo'lganidan keyingina yangi kutish vaqtini aniq hisoblab boshlamoqchi bo'lsak (ya'ni, takroriy amallar bir-birini bosib ketmasligi uchun), qaysi yondashuv tavsiya etiladi?",
      options: [
        "Juda katta kechikish vaqti bilan `setInterval` ishlatish",
        "Rekursiv `setTimeout` (ya'ni funksiya bajarilib bo'lgach, o'z ichida yangi `setTimeout` chaqirishi)",
        "`while` siklidan foydalanish",
        "Hech qanday taymersiz to'g'ridan-to'g'ri chaqirish"
      ],
      correctAnswer: 1,
      explanation: "Rekursiv `setTimeout` yordamida funksiya ichida navbatdagi setTimeout e'lon qilinadi. Bu usul oldingi kodning ishlash muddati qancha cho'zilishidan qat'i nazar, navbatdagi chaqiruvgacha bo'lgan oraliq aniq bo'lishini kafolatlaydi, `setInterval`da esa asinxron amallar kechiksa interval bir-birini bosib ketishi mumkin."
    },
    {
      id: 6,
      question: "`setTimeout` yoki `setInterval` chaqirilganda qaytariladigan ID qanday turdagi qiymat (data type) bo'ladi?",
      options: [
        "Obyekt (Object)",
        "Musbat butun son (Number/Integer) brauzerlarda, yoki maxsus obyekt Node.js-da",
        "String (Matn)",
        "Boolean (true/false)"
      ],
      correctAnswer: 1,
      explanation: "Brauzerlarda `setTimeout` va `setInterval` taymer ID sifatida musbat butun son (Number) qaytaradi. Node.js da esa taymer boshqariladigan maxsus obyekt (Timeout/Interval class instance) qaytariladi."
    },
    {
      id: 7,
      question: "Quyidagi kodda setTimeout ichidagi `this` nimaga ishora qiladi?\n```javascript\nconst obj = {\n  name: 'Ali',\n  show() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 1000);\n  }\n};\nobj.show();\n```",
      options: [
        "obj obyektiga",
        "window (global obyekt)ga yoki strict rejimda undefinedga",
        "setTimeout funksiyasiga",
        "show metodiga"
      ],
      correctAnswer: 1,
      explanation: "setTimeout asinxron callback funksiyasi default ravishda global context (window) ostida ishlaydi. Shuning uchun uning ichidagi `this` global obyektga, strict mode-da esa `undefined`ga teng bo'ladi."
    },
    {
      id: 8,
      question: "Garchi vaqt ko'rsatilmagan bo'lsa-da (`setTimeout(fn)`), default kechikish vaqti qancha deb qabul qilinadi?",
      options: [
        "0 millisekund",
        "1000 millisekund",
        "Kechikishsiz sinxron ishlaydi",
        "100 millisekund"
      ],
      correctAnswer: 0,
      explanation: "Agar vaqt parametri berilmasa, u default ravishda `0` millisekund (yoki minimal 4ms) deb olinadi va navbatdagi navbatga (Task Queue) qo'yiladi."
    },
    {
      id: 9,
      question: "`setTimeout` ga callback funksiyadan tashqari argumentlar uzatsa bo'ladimi? Masalan: `setTimeout(fn, 1000, 'arg1', 'arg2')`",
      options: [
        "Yo'q, u faqat ikkita parametr oladi: callback va delay",
        "Ha, uchinchi parametrdan boshlab barcha argumentlar callback funksiyaga parametrlari sifatida uzatiladi",
        "Ha, lekin ular faqat string bo'lishi kerak",
        "Faoliyat faqat Node.js-da qo'llab-quvvatlanadi"
      ],
      correctAnswer: 1,
      explanation: "`setTimeout` va `setInterval` metodlari uchinchi parametrdan boshlab uzatilgan barcha argumentlarni callback funksiyasiga uzatadi. Masalan: `setTimeout((a) => console.log(a), 1000, 'Salom')` ekranga 'Salom' chiqaradi."
    },
    {
      id: 10,
      question: "`setInterval` va rekursiv `setTimeout` o'rtasidagi asosiy farq nima?",
      options: [
        "Farqi yo'q, ikkalasi ham to'liq bir xil ishlaydi",
        "setInterval oldingi callback tugashini kutmasdan har X vaqtda ishlayveradi; rekursiv setTimeout esa callback to'liq bajarilib bo'lingach, keyingi intervalni hisoblay boshlaydi",
        "Rekursiv setTimeout faqat 10 marta ishlaydi va o'zi to'xtaydi",
        "setInterval asinxron, rekursiv setTimeout esa sinxron ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "setInterval ichidagi kod bajarilishi uzoq cho'zilsa, yangi takrorlanishlar eski kod tugashini kutmasdan boshlanaveradi. Rekursiv setTimeout-da esa keyingi taymer faqat joriy kod to'liq ishlab bo'lganidan keyin o'rnatiladi."
    },
    {
      id: 11,
      question: "JavaScript Event Loop-da taymerlar (setTimeout/setInterval) qaysi turdagi navbatda (Queue) qayta ishlanadi?",
      options: [
        "Microtask Queue (Promise-lar kabi)",
        "Macrotask Queue (yoki Task Queue)",
        "Call Stack",
        "Render Queue"
      ],
      correctAnswer: 1,
      explanation: "Taymerlar, DOM eventlari va tarmoq so'rovlari (fetch callback-lari) macrotask (yoki oddiygina task) hisoblanadi va Macrotask Queue-ga tushadi. Microtask-lar (Promise.then, queueMicrotask) macrotask-lardan oldin bajariladi."
    },
    {
      id: 12,
      question: "Agar `setInterval` ga 10ms vaqt berilsa-yu, lekin uning ichidagi callback funksiya bajarilishi uchun 50ms vaqt talab etilsa nima yuz beradi?",
      options: [
        "Callback ishga tushishi bilan brauzer qotib qoladi va xatolik beradi",
        "Callback-lar navbatda to'planib qoladi (Call Stack bo'shashini kutadi va ketma-ket, ba'zan intervalni o'tkazib yuborib ishlaydi)",
        "Taymer avtomatik to'xtaydi",
        "Callback parallel ravishda bir vaqtda 5 xil thread-da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript bir oqimli (single-threaded) til bo'lgani sababli, taymer callback-lari parallel ishlay olmaydi. Ular navbatda (Callback Queue) turib qoladi va Call Stack bo'shagandan keyingina ketma-ket ishga tushadi."
    }
  ]
};
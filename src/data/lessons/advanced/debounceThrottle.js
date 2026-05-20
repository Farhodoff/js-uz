export const debounceThrottle = {
  id: "debounce-throttle",
  title: "Debounce va Throttle",
  theory: `## 1. KIRISH: Nega bu mavzu kerak?
Foydalanuvchi veb-sahifada matn qidirayotganda (input yozayotganda) yoki sahifani scroll qilayotganda, har bir harakat uchun serverga so'rov yuborish yoki murakkab hisob-kitoblarni amalga oshirish sahifaning qotib qolishiga (lag) yoki serverning yiqilishiga (crash) sabab bo'ladi. 

Ushbu muammoni hal qilish va hodisalar (events) chaqirilish chastotasini cheklash uchun **Debounce** va **Throttle** usullari qo'llaniladi.

---

## 2. SODDALIK (Analogiya)
* **Debounce (Lift analogiyasi):** Lift eshigi yopilishi uchun odamlar kirib bo'lishini kutadi. Har safar yangi odam kelib tugmani bossa, lift yopilish taymerini qaytadan (nolga) tushiradi va kutishni davom ettiradi. Lift faqat tugma oxirgi marta bosilgandan va ma'lum bir muddat (masalan, 5 soniya) hech kim tugmani bosmagandan keyingina harakatlanadi.
* **Throttle (Metro turniketi analogiyasi):** Turniketdan har qancha odam tez-tez o'tishga harakat qilmasin, u faqat belgilangan vaqt oralig'ida (masalan, har 2 soniyada) bitta odamni o'tkazib yuboradi. Qolgan tezkor urinishlar e'tiborga olinmaydi.

---

## 3. STRUKTURA (Asosiy Tushunchalar)

### A. Debounce
Debounce hodisa chaqirilishi tugagandan keyin ma'lum bir vaqt o'tishini kutadi. Agar shu vaqt ichida hodisa yana yuz bersa, taymer nollanadi va kutish qayta boshlanadi.
\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
\`\`\`

### B. Throttle
Throttle hodisani ma'lum bir vaqt ichida faqat bir marta ishlashini kafolatlaydi. Belgilangan vaqt tugamaguncha, keyingi chaqiruvlar bloklanadi.
\`\`\`javascript
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR (Edge Cases)
1. **Context (this) ni yo'qotish:** Debounce va Throttle funksiyalari qaytargan wrapper funksiya ichida original funksiyani shunchaki \`func()\` deb chaqirish \`this\` kontekstini yo'qotadi. Buning oldini olish uchun \`func.apply(this, args)\` ishlatish shart.
2. **Har bir renderda yangi taymer yaratish (React'da):** React componentlari render bo'lganda oddiy debounce funksiyalar har safar qaytadan yaratilib, eski taymerlarni yo'qota olmaydi. Buning uchun React'da \`useCallback\` yoki \`useRef\` ishlatilishi kerak.
3. **Trailing (oxirgi chaqiruv) muammosi:** Throttle'da belgilangan vaqt ichida oxirgi marta bosilgan hodisa bajarilmay qolib ketishi mumkin. Buning uchun throttle algoritmini biroz mukammallashtirib, oxirgi chaqiruvni saqlab qolish kerak.

---

## 5. 12 TA SAVOL VA JAVOBLAR
**<b>1. Debounce nima?</b>** Debounce — hodisa chaqirilishi butunlay to'xtagandan keyin, ma'lum bir kutish vaqtidan so'nggina funksiyani bajarish usuli.

**<b>2. Throttle nima?</b>** Throttle — hodisa har qancha tez-tez ro'y bermasin, funksiyani faqat belgilangan vaqt oralig'ida (chastotada) bir marta bajarish cheklovidir.

**<b>3. Debounce va Throttle o'rtasidagi asosiy farq nima?</b>** Debounce oxirgi harakatdan keyin kutadi va bir marta ishlaydi. Throttle esa harakat davom etayotgan bo'lsa ham muntazam vaqt oralig'ida ishlashda davom etadi.

**<b>4. Qidiruv inputlariga (Search Auto-complete) qaysi biri mos keladi?</b>** Debounce mos keladi. Foydalanuvchi yozishdan to'xtagandan keyingina serverga API so'rov yuborish ma'qul.

**<b>5. Scroll yoki Window Resize hodisalariga qaysi biri yaxshiroq?</b>** Throttle yaxshiroq. Sahifa scroll bo'layotganda har 100-200ms da sahifa holatini hisoblab turish uchun throttle qulay.

**<b>6. Debounce ichida clearTimeout nima uchun kerak?</b>** Agar foydalanuvchi belgilangan vaqt tugamasdan turib yana harakat qilsa, eski taymerni bekor qilib, yangi taymerni boshlash uchun kerak.

**<b>7. Throttle ichidagi inThrottle bayrog'i nima qiladi?</b>** Funksiya hozirda "kutish" (bajarilganidan keyingi cheklov) rejimida ekanligini bildiradi va yangi chaqiruvlarni bloklaydi.

**<b>8. apply() ishlatish nima uchun zarur?</b>** Wrapper funksiyaga kelgan arguments massivi va joriy this kontekstini original funksiyaga o'tkazish uchun.

**<b>9. Debounce'da immediate opsiyasi nima?</b>** Bu opsiya yoqilganda kutish vaqtini boshlashdan oldin funksiya darhol chaqiriladi, so'ngra keyingi chaqiruvlar bloklanadi.

**<b>10. O'yinlardagi o'q otish tugmasiga qaysi biri mos?</b>** Throttle mos. Qahramon har qancha tez tugmani bosmasin, o'qlar faqat ma'lum bir tezlik oralig'ida otiladi.

**<b>11. Debounce funksiyani bekor qilish (cancel) qachon kerak bo'ladi?</b>** Masalan, component sahifadan o'chib ketganda (unmount), hali bajarilmagan setTimeout taymerini tozalab, memory leak oldini olish uchun.

**<b>12. CSS orqali rate limit qilish mumkinmi?</b>** Yo'q, CSS hodisalar chastotasini boshqara olmaydi. Bu faqat JS yordamida mantiqiy darajada bajariladi.
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
      question: "Throttle parametr uzatish",
      instruction: "Throttled funksiyaga dynamic argumentlarni apply yordamida xavfsiz o'tkazing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      // apply orqali context va args o'tkazing\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n",
      hint: "func.apply(this, args);",
      test: "if (code.includes('apply')) return null; return 'apply yoki args xato';"
    },
    {
      id: 10,
      title: "Immediate Debounce",
      instruction: "Debounce qilingan funksiyani kutishdan oldin birinchi chaqiruvda darhol chaqiradigan 'immediate' parametrini qo'shing.",
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
    }
  ]
};

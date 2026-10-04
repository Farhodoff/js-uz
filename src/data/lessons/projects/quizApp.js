export const quizApp = {
  id: "quizApp",
  title: "Loyiha: Quiz App (Timer bilan)",
  theory: `## 1-Qism: Sodda Tushuntirish
Tasavvur qiling, siz teleko'rsatuvdagi "Zakovat" yoki "Millioner" intellektual o'yinida qatnashyapsiz. Har bir savol chiqqanda boshlovchi qumsoatni yoki sekundomerni ishga tushiradi (masalan, 15 soniya). Siz javob tugmasini bosishingiz bilanoq yoki vaqt tugashi bilan taymer darhol to'xtaydi, to'g'ri/noto'g'ri ekani tekshiriladi va keyingi savolga o'tiladi. Barcha savollar tugagach, to'plagan umumiy ballingiz va o'tish foizingiz ekranda paydo bo'ladi.

Dasturlashda bu ilova **Asinxronlik (Timers)**, **State Management (Holat boshqaruvi)** va **DOM bilan ishlash** qobiliyatlaringizni real loyihada birlashtiradi.

---

## 2-Qism: Chuqur Tahlil

### 1. Quiz State Arxitekturasi
Ilovaning holatini (State) yagona markazlashtirilgan obyektda saqlash tavsiya etiladi. Bu har qanday chalkashliklarning oldini oladi:

\`\`\`javascript
const quizState = {
  questions: [],          // Barcha savollar ro'yxati
  currentIndex: 0,        // Hozirgi ko'rsatilayotgan savol indeksi
  score: 0,               // Foydalanuvchi to'plagan to'g'ri javoblar soni
  timeLeft: 15,           // Joriy savol uchun qolgan vaqt (soniyalarda)
  timerId: null,          // setInterval identifikatori (tozalash uchun)
  isFinished: false       // O'yin tugaganini bildiruvchi bayroqcha
};
\`\`\`

### 2. Taymerni Boshqarish: \`setInterval\` va \`clearInterval\`
Taymer bilan ishlashda eng katta xato — bu har safar yangi interval yaratib, eskisini to'xtatmaslikdir (Timer Leak / Timer Stacking). Buning oqibatida vaqt 2x yoki 3x tezroq pasayib ketadi.

Har doim yangi taymer yoqishdan avval avvalgisini tozalash zarur:

\`\`\`javascript
function startTimer(onTick, onTimeout) {
  // Eski taymerni majburiy to'xtatamiz
  if (quizState.timerId) {
    clearInterval(quizState.timerId);
  }

  quizState.timerId = setInterval(() => {
    quizState.timeLeft--;
    onTick(quizState.timeLeft);

    if (quizState.timeLeft <= 0) {
      clearInterval(quizState.timerId);
      quizState.timerId = null;
      onTimeout();
    }
  }, 1000);
}
\`\`\`

### 3. "Timer Drift" (Vaqt siljishi) Muammosi
JavaScript bir oqimli (single-threaded) til bo'lib, Event Loop og'ir hisob-kitoblar yoki DOM chizish bilan band bo'lganda \`setInterval(..., 1000)\` aynan 1000ms dan keyin chaqirilmasligi mumkin (kechikish to'planib boradi).

Yuqori aniqlikdagi taymerlar uchun delta hisobi qo'llaniladi:
\`\`\`javascript
const startTime = Date.now();
const totalMs = 15000;

function getPreciseSeconds() {
  const elapsedMs = Date.now() - startTime;
  const remainingSec = Math.ceil((totalMs - elapsedMs) / 1000);
  return Math.max(0, remainingSec);
}
\`\`\`

---

## 3-Qism: Chekka Holatlar va Senior Intervyu Savollari

### 1. Brauzer tab fonga o'tkazilganda nima bo'ladi (Tab Throttling)?
Foydalanuvchi boshqa brauzer oynasiga o'tsa, brauzerlar energiya va CPU resurslarini tejash uchun orqa fondagi \`setInterval\` larni 1000ms dan ancha sekinroq (ba'zan daqiqasiga 1 martagacha) ishlatadi.
- **Yechim:** Taymerni faqat soniyalar hisobiga emas, har doim \`Date.now()\` va boshlang'ich vaqt solishtirmasiga tayanish orqali qurish.

### 2. Foydalanuvchi tugmani tez-tez bosib yuborishi (Double Submission)
Agar foydalanuvchi javob tugmasini ketma-ket ikki marta tez bossa, unga 2 marta ball yozilishi yoki bitta savol tashlab ketilishi mumkin.
- **Yechim:** Javob tanlanganda darhol barcha variant tugmalarini \`disabled = true\` qilib qo'yish kerak.

### 3. Klient tomonida to'g'ri javoblarni yashirish (Security)
Agar siz barcha savollarning \`correctAnswer\` kalitlarini oddiy JS obyektida qoldirsangiz, foydalanuvchi DevTools Console orqali javoblarni darhol ko'rib olishi mumkin.
- **Yechim:** Real loyihalarda har bir javob serverga POST so'rov orqali yuboriladi va server faqat to'g'ri/noto'g'riligini qaytaradi.

---

## 4-Qism: Sxema (Architecture Diagram)

\`\`\`mermaid
flowchart TD
    A([O'yin Boshlanishi]) --> B[Savolni Ekranga Chiqarish]
    B --> C[Taymerni Ishga Tushirish: setInterval]
    C --> D{Hodisa Kutish}
    D -->|Foydalanuvchi Variant Tanladi| E[Taymerni To'xtatish: clearInterval]
    D -->|Vaqt Tugadi: timeLeft <= 0| E
    E --> F[Javobni Tekshirish & Ball Yangilash]
    F --> G{Yana Savol Bormi?}
    G -->|Ha: nextQuestion| B
    G -->|Yo'q: isFinished| H([Natijani Ko'rsatish: Score & Percentage])
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Savol obyektini yaratish",
      instruction: "Quiz tizimi uchun `createQuestion(question, options, correctAnswerIndex, timeLimit)` yordamchi funksiyasini yozing. U berilgan parametrlar asosida obyekt qaytarsin. Agar `timeLimit` berilmasa, standart qiymati `15` soniya bo'lsin.",
      startingCode: "function createQuestion(question, options, correctAnswerIndex, timeLimit = 15) {\n  // Kodni shu yerda yozing\n}",
      hint: "return { question, options, correctAnswerIndex, timeLimit };",
      test: "if (typeof createQuestion !== 'function') return \"createQuestion funksiyasi aniqlanmagan\";\nconst q = createQuestion('JS nima?', ['Til', 'Baza'], 0);\nif (!q || q.question !== 'JS nima?' || q.correctAnswerIndex !== 0 || q.timeLimit !== 15) return \"Savol obyekti xato tuzilgan yoki standart timeLimit 15 emas\";\nif (!Array.isArray(q.options) || q.options.length !== 2) return \"Variantlar massivi to'g'ri saqlanmadi\";\nreturn null;"
    },
    {
      id: 2,
      title: "Quiz State boshlang'ich holati",
      instruction: "Berilgan `questions` massivi asosida Quizning boshlang'ich holatini yaratuvchi `initQuizState(questions)` funksiyasini yozing. U quyidagi xususiyatlarga ega obyekt qaytarsin:\n- `questions`: berilgan massiv\n- `currentIndex`: 0\n- `score`: 0\n- `timeLeft`: agar birinchi savol bo'lsa uning `timeLimit` qiymati, aks holda 15\n- `timerId`: null\n- `isFinished`: false",
      startingCode: "function initQuizState(questions) {\n  // Kodni shu yerda yozing\n}",
      hint: "const firstLimit = (questions && questions[0] && questions[0].timeLimit) || 15; return { questions, currentIndex: 0, score: 0, timeLeft: firstLimit, timerId: null, isFinished: false };",
      test: "if (typeof initQuizState !== 'function') return \"initQuizState funksiyasi aniqlanmagan\";\nconst s = initQuizState([{ question: 'Q1', timeLimit: 20 }]);\nif (s.currentIndex !== 0 || s.score !== 0 || s.isFinished !== false || s.timerId !== null) return \"State maydonlari noto'g'ri qiymat bilan boshlandi\";\nif (s.timeLeft !== 20) return \"Boshlang'ich timeLeft birinchi savol timeLimit iga teng bo'lishi kerak\";\nreturn null;"
    },
    {
      id: 3,
      title: "Taymerni to'xtatish (stopTimer)",
      instruction: "Taymerni xavfsiz to'xtatuvchi `stopTimer(state)` funksiyasini yozing. Agar `state.timerId` mavjud bo'lsa, `clearInterval` orqali uni to'xtatib, `state.timerId = null` qilib qo'ysin.",
      startingCode: "function stopTimer(state) {\n  // Kodni shu yerda yozing\n}",
      hint: "if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }",
      test: "if (typeof stopTimer !== 'function') return \"stopTimer funksiyasi aniqlanmagan\";\nlet cleared = false;\nconst dummyId = setInterval(() => {}, 10000);\nconst state = { timerId: dummyId };\nstopTimer(state);\nif (state.timerId !== null) return \"stopTimer dan keyin state.timerId null bo'lishi shart\";\nreturn null;"
    },
    {
      id: 4,
      title: "Javobni tekshirish va ball hisoblash",
      instruction: "Foydalanuvchi tanlagan javobni tekshiruvchi `checkAnswer(state, selectedIndex)` funksiyasini yozing.\n1. Hozirgi savolni `state.questions[state.currentIndex]` dan oling.\n2. Agar `selectedIndex === currentQuestion.correctAnswerIndex` bo'lsa, `state.score` ni 1 ga oshirsin va `true` qaytarsin.\n3. Aks holda `state.score` o'zgarmasin va `false` qaytarsin.",
      startingCode: "function checkAnswer(state, selectedIndex) {\n  // Kodni shu yerda yozing\n}",
      hint: "const current = state.questions[state.currentIndex]; if (selectedIndex === current.correctAnswerIndex) { state.score++; return true; } return false;",
      test: "if (typeof checkAnswer !== 'function') return \"checkAnswer funksiyasi aniqlanmagan\";\nconst state = { questions: [{ correctAnswerIndex: 2 }], currentIndex: 0, score: 0 };\nconst r1 = checkAnswer(state, 2);\nif (r1 !== true || state.score !== 1) return \"To'g'ri javob tanlanganda score oshmadi yoki true qaytmadi\";\nconst r2 = checkAnswer(state, 0);\nif (r2 !== false || state.score !== 1) return \"Noto'g'ri javob tanlanganda false qaytishi va score o'zgarmasligi kerak\";\nreturn null;"
    },
    {
      id: 5,
      title: "Keyingi savolga o'tish (nextQuestion)",
      instruction: "Navbatdagi savolga o'tkazuvchi `nextQuestion(state)` funksiyasini yozing:\n1. Avvalgi taymerni to'xtating (`stopTimer(state)` yoki `clearInterval`).\n2. `state.currentIndex` ni 1 ga oshiring.\n3. Agar `state.currentIndex >= state.questions.length` bo'lsa, `state.isFinished = true` qiling va `false` qaytaring (o'yin tugadi).\n4. Aks holda `state.timeLeft` ni yangi savolning `timeLimit` (yoki 15) qiymatiga o'rnating va `true` qaytaring.",
      startingCode: "function nextQuestion(state) {\n  // Kodni shu yerda yozing\n}",
      hint: "stopTimer(state); state.currentIndex++; if (state.currentIndex >= state.questions.length) { state.isFinished = true; return false; } state.timeLeft = state.questions[state.currentIndex].timeLimit || 15; return true;",
      test: "if (typeof nextQuestion !== 'function') return \"nextQuestion funksiyasi aniqlanmagan\";\nconst state = {\n  questions: [{ timeLimit: 10 }, { timeLimit: 25 }],\n  currentIndex: 0,\n  timeLeft: 5,\n  timerId: 123,\n  isFinished: false\n};\nconst hasMore = nextQuestion(state);\nif (!hasMore || state.currentIndex !== 1 || state.timeLeft !== 25) return \"Keyingi savolga to'g'ri o'tmadi yoki timeLeft yangilanmadi\";\nconst finished = nextQuestion(state);\nif (finished !== false || state.isFinished !== true) return \"Savollar tugaganda isFinished true bo'lishi va false qaytishi kerak\";\nreturn null;"
    },
    {
      id: 6,
      title: "Yakuniy natijani hisoblash",
      instruction: "Quiz yakunlanganda natijalar hisobotini shakllantiruvchi `calculateResult(state, passingPercentage = 70)` funksiyasini yozing. U quyidagi obyektni qaytarsin:\n- `total`: barcha savollar soni\n- `correct`: to'plangan to'g'ri javoblar (`state.score`)\n- `percentage`: to'plangan foiz (`Math.round((correct / total) * 100)`). Agar savollar soni 0 bo'lsa 0 bo'lsin.\n- `passed`: `percentage >= passingPercentage` (boolean)",
      startingCode: "function calculateResult(state, passingPercentage = 70) {\n  // Kodni shu yerda yozing\n}",
      hint: "const total = state.questions.length; const correct = state.score; const percentage = total > 0 ? Math.round((correct / total) * 100) : 0; return { total, correct, percentage, passed: percentage >= passingPercentage };",
      test: "if (typeof calculateResult !== 'function') return \"calculateResult funksiyasi aniqlanmagan\";\nconst state = { questions: [{}, {}, {}, {}], score: 3 };\nconst res = calculateResult(state, 70);\nif (res.total !== 4 || res.correct !== 3 || res.percentage !== 75 || res.passed !== true) return \"Natijalar hisob-kitobida xatolik bor\";\nconst failState = { questions: [{}, {}], score: 1 };\nconst failRes = calculateResult(failState, 70);\nif (failRes.percentage !== 50 || failRes.passed !== false) return \"O'tish chegarasi (passingPercentage) noto'g'ri baholandi\";\nreturn null;"
    },
    {
      id: 7,
      title: "Vaqtni aniq o'lchash (Drift-safe Timer)",
      instruction: "Tizim kechikishlaridan qat'i nazar qolgan soniyalarni aniq hisoblovchi `getPreciseRemainingSeconds(startTimestamp, totalDurationSeconds)` funksiyasini yozing.\nFormulasi: `remainingMs = (startTimestamp + totalDurationSeconds * 1000) - Date.now()`.\nQaytadigan qiymat: `Math.max(0, Math.ceil(remainingMs / 1000))` bo'lsin.",
      startingCode: "function getPreciseRemainingSeconds(startTimestamp, totalDurationSeconds) {\n  // Kodni shu yerda yozing\n}",
      hint: "const remainingMs = (startTimestamp + totalDurationSeconds * 1000) - Date.now(); return Math.max(0, Math.ceil(remainingMs / 1000));",
      test: "if (typeof getPreciseRemainingSeconds !== 'function') return \"getPreciseRemainingSeconds funksiyasi aniqlanmagan\";\nconst now = Date.now();\nconst r1 = getPreciseRemainingSeconds(now, 10);\nif (r1 < 9 || r1 > 10) return \"Joriy vaqtdan boshlangan 10 soniyalik limit xato hisoblandi\";\nconst r2 = getPreciseRemainingSeconds(now - 15000, 10);\nif (r2 !== 0) return \"Muddati o'tib ketgan vaqt uchun 0 qaytishi lozim\";\nreturn null;"
    },
    {
      id: 8,
      title: "Tugmalarni holatga ko'ra bloklash",
      instruction: "Foydalanuvchi bitta javobni tanlaganidan so'ng qayta bosishining oldini olish uchun tugmalarni boshqaruvchi `lockOptions(buttons, selectedIndex, correctIndex)` funksiyasini yozing:\n1. Barcha tugmalarning `disabled` xususiyatini `true` qiling.\n2. Tanlangan tugmaga `className = (selectedIndex === correctIndex ? 'correct' : 'wrong')` qo'shing.\n3. Agar javob noto'g'ri bo'lsa, to'g'ri javob tugmasining (`buttons[correctIndex]`) sinfini ham `'correct'` qilib belgilang.",
      startingCode: "function lockOptions(buttons, selectedIndex, correctIndex) {\n  // Kodni shu yerda yozing\n}",
      hint: "buttons.forEach((btn, idx) => { btn.disabled = true; if (idx === selectedIndex) btn.className = idx === correctIndex ? 'correct' : 'wrong'; if (idx === correctIndex && selectedIndex !== correctIndex) btn.className = 'correct'; });",
      test: "if (typeof lockOptions !== 'function') return \"lockOptions funksiyasi aniqlanmagan\";\nconst buttons = [{ disabled: false, className: '' }, { disabled: false, className: '' }, { disabled: false, className: '' }];\nlockOptions(buttons, 0, 1);\nif (!buttons.every(b => b.disabled === true)) return \"Barcha tugmalar disabled qilinmadi\";\nif (buttons[0].className !== 'wrong' || buttons[1].className !== 'correct') return \"Tanlangan noto'g'ri javob 'wrong', to'g'ri javob 'correct' qilib belgilanmadi\";\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quiz ilovasida har bir savol almashganda nima uchun clearInterval() chaqirish majburiy?",
      options: [
        "Faqat brauzer rangini o'zgartirish uchun",
        "Eski interval ishlab turib xotiradan sizib chiqishi (memory leak) va bir nechta interval parallel ishlab vaqtni tezlashtirib yuborishining oldini olish uchun",
        "HTML teglarni avtomatik tozalash uchun",
        "Faqat internet tezligini oshirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Agar eski interval to'xtatilmasa, u fonda ishlashda davom etadi. Keyingi savol yangi interval ochsa, ikkita taymer bir vaqtda ishlab vaqt ikki baravar tez o'tishiga olib keladi."
    },
    {
      id: 2,
      question: "Foydalanuvchi boshqa brauzer yorlig'iga (tab) o'tib ketganda setInterval qanday harakat qiladi?",
      options: [
        "Butunlay o'chib qoladi va xato qaytaradi",
        "Tezligi 10 baravar oshadi",
        "Brauzer batareya va resurslarni tejash uchun interval chaqiruvlarini sekinlashtiradi (throttling qo'llaydi)",
        "Hech qanday o'zgarishsiz mikro-sekund aniqligida ishlayveradi"
      ],
      correctAnswer: 2,
      explanation: "Zamonaviy brauzerlar orqa fondagi tablarda resurslarni tejash uchun taymerlarni kechiktiradi. Shuning uchun aniq taymerlar faqat interval hisobiga emas, Date.now() timestamp farqiga asoslanishi kerak."
    },
    {
      id: 3,
      question: "Foydalanuvchi javob tugmasini bosishi bilanoq barcha javob tugmalarini disabled qilishdan asosiy maqsad nima?",
      options: [
        "Foydalanuvchining ketma-ket qayta bosib (double click) bir nechta javob yuborishi yoki ortiqcha ball to'plashining oldini olish",
        "Foydalanuvchini sahifadan chiqarib yuborish",
        "Dastur xotirasini nolga tushirish",
        "Tugmalar dizaynini chiroyli qilish"
      ],
      correctAnswer: 0,
      explanation: "Variant tanlanganda tugmalarni bloklash (disable qilish) Race Condition va ikkinchi marta noto'g'ri holat yangilanishining oldini oladi."
    },
    {
      id: 4,
      question: "Quiz holatini (State) markazlashtirilgan yagona obyektda saqlashning asosiy ustunligi nimada?",
      options: [
        "Fayl hajmini 90% ga qisqartiradi",
        "Ilova holatini (score, currentIndex, timeLeft) yagona haqiqat manbasi (Single Source of Truth) sifatida boshqarish va UI ni oson yangilash imkonini beradi",
        "SQL so'rovlarini avtomatik bajaradi",
        "CSS animatsiyalarini tezlashtiradi"
      ],
      correctAnswer: 1,
      explanation: "Markazlashtirilgan State boshqaruvi orqali istalgan funksiya (start, next, render, finish) ayni paytda o'yin qaysi bosqichda ekanligini xatosiz aniqlaydi."
    }
  ]
};

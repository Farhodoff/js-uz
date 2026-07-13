export const dateObject = {
  id: "dateObjectLesson",
  title: "Date Obyekti va Vaqt Bilan Ishlash",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish (Beginner Analogy)

### Date Obyekti nima?
JavaScript-da vaqt va sanalar bilan ishlash uchun \\\`Date\\\` nomli maxsus obyektdan foydalaniladi. Date obyekti 1970-yil 1-yanvar yarim tundan boshlab hisoblangan millisekundlar asosida ishlaydi (bunga Unix Timestamp deyiladi).

---

### Real hayotiy o'xshatish
Tasavvur qiling, siz poyezdlar jadvalini tuzmoqchisiz:
- \\\`new Date()\\\` — bu hozirgi vaqtni ko'rsatadigan stansiya soati.
- \\\`setFullYear()\\\` yoki \\\`setMonth()\\\` — bu soatning faqat yilini yoki oyini burab to'g'rilaydigan murvat (nastroyka).
- \\\`Date.now()\\\` — bu 1970-yildan beri sekundomerni to'xtatmay necha millisekund o'tganini ko'rsatib turuvchi elektron tablo.

---

## 2. 🔬 Deep Dive: Under the Hood (V8 Engine va Memory)

### V8 da Date obyekti qanday saqlanadi?
V8 dvigateli Date obyektlarini odatda to'g'ridan-to'g'ri bitta raqam – 64-bitlik o'zgaruvchan nuqtali (float) raqam sifatida xotirada saqlaydi. Bu raqam 1970-yil 1-yanvardan beri o'tgan millisekundlarni anglatadi.

- **Xotira va Tezlik:** \\\`new Date()\\\` obyekti yaratish kompyuter uchun qimmat (heavy) operatsiya hisoblanadi. Agar sizga faqatgina kod qancha vaqt ishlaganini o'lchash (benchmark) kerak bo'lsa, \\\`Date.now()\\\` ishlatganingiz ma'qul, chunki u obyekt yaratmasdan to'g'ridan-to'g'ri raqam qaytaradi. Bunga V8 dvigatelida *Fast Path* deyiladi.
- **Vaqt Mintaqalari (Timezones):** Date obyekti ichida time zone saqlamaydi. Obyekt faqatgina bitta timestampni saqlaydi va siz metodlarni chaqirganingizda, JS avtomatik tarzda uni operatsion tizimingizdagi joriy time zone ga qarab ko'rsatadi. 

\\\`\\\`\\\`javascript
// Performans o'lchash uchun YAXSHI:
const start = Date.now(); 
// ... og'ir operatsiyalar
const end = Date.now();
console.log(end - start);

// YOMON (chunki obyekt yaratish talab qilinadi):
const startBad = new Date().getTime();
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases (Qiziq va Kutilmagan holatlar)
1. **Oylarning 0 dan boshlanishi:** JavaScriptda oylar 0 (Yanvar) dan boshlab 11 (Dekabr) gacha bo'ladi. \\\`new Date(2024, 0, 1)\\\` bu 2024-yil 1-Yanvar.
2. **"Overflow" (Ortib ketish):** Agar siz 32-Yanvarni so'rasangiz, xato bermaydi! Avtomatik ravishda 1-Fevralga aylanadi.
3. **YYYY-MM-DD formati xavfi:** \\\`new Date('2024-10-15')\\\` ba'zi brauzerlarda UTC sifatida, \\\`new Date('2024/10/15')\\\` esa local time sifatida qabul qilinadi.

### Senior Interview Savollari
1. **Savol:** \\\`new Date('2024-01-01')\\\` va \\\`new Date(2024, 0, 1)\\\` o'rtasida TimeZone bo'yicha qanday farq bo'lishi mumkin?
   **Javob:** String orqali berilganda (ISO formatda \\\`YYYY-MM-DD\\\`), agar \\\`Z\\\` qo'shilmasa ham, ba'zi xalqaro standartlarga ko'ra u UTC deb tushunilishi mumkin. Raqamlar argumenti bilan (\\\`new Date(2024, 0, 1)\\\`) yaratganda, u qat'iy ravishda foydalanuvchining Local Time (mahalliy vaqt) iga qarab yaratiladi.
   
2. **Savol:** Nega ikkita \\\`Date\\\` obyekti \\\`===\\\` orqali tekshirilganda teng bo'lmaydi?
   **Javob:** \\\`Date\\\` bu JS da maxsus obyekt tipidir. Obyektlar o'zgaruvchilarda *reference* (xotira manzili) sifatida saqlanadi. \\\`new Date() === new Date()\\\` har doim \\\`false\\\` qaytaradi. To'g'ri solishtirish uchun ularning qiymatini olish kerak: \\\`date1.getTime() === date2.getTime()\\\`.

---

## 4. 📊 Mermaid Diagrammasi

JavaScript-da Date klassining ishlash oqimi:

\\\`\\\`\\\`mermaid
graph TD
    A[Vaqt boshqarishni boshlash] --> B{Yangi obyekt yaratish usuli}
    B -->|Joriy vaqt| C[new Date]
    B -->|Timestamp| D[Date.now]
    B -->|Matn orqali| E[new Date - ISO string]
    C --> F[getFullyear / getMonth / getDate]
    D --> G[Tezkor hisoblashlar va performans]
    E --> H[Backend bilan ishlash]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Joriy vaqtni yaratish",
      instruction: "`now` o'zgaruvchisiga hozirgi vaqt obyektini biriktiring.",
      startingCode: "let now = ;",
      hint: "new Date() yordamida",
      test: "const sandbox = new Function(code + '; let now = new Date(); return now instanceof Date;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 2,
      title: "Joriy yilni olish",
      instruction: "`year` ga joriy yilni raqamda oling.",
      startingCode: "let now = new Date();\nlet year = ;",
      hint: "getFullYear() metodi.",
      test: "const sandbox = new Function(code + '; let now = new Date(); let year = now.getFullYear(); return typeof year === \"number\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 3,
      title: "Oyni to'g'ri olish",
      instruction: "`month` o'zgaruvchisiga joriy oyni oling. Eslatma: getMonth natijasi 0 dan boshlanadi.",
      startingCode: "let now = new Date();\nlet month = ;",
      hint: "getMonth()",
      test: "const sandbox = new Function(code + '; let now = new Date(); let month = now.getMonth(); return month >= 0 && month <= 11;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 4,
      title: "Sana (kun) olish",
      instruction: "`day` o'zgaruvchisiga oydagi joriy sanani (kunni) oling.",
      startingCode: "let now = new Date();\nlet day = ;",
      hint: "getDate() ishlatiladi.",
      test: "const sandbox = new Function(code + '; let now = new Date(); let day = now.getDate(); return day >= 1 && day <= 31;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 5,
      title: "Hafta kunini olish",
      instruction: "`weekDay` ga haftaning qaysi kuniligini raqamda oling.",
      startingCode: "let now = new Date();\nlet weekDay = ;",
      hint: "getDay() ishlatiladi.",
      test: "const sandbox = new Function(code + '; let now = new Date(); let weekDay = now.getDay(); return weekDay >= 0 && weekDay <= 6;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 6,
      title: "Muayyan sanani o'rnatish",
      instruction: "`myDate` obyektini yilini `setFullYear()` orqali 2025 qilib o'rnatib ko'ring.",
      startingCode: "let myDate = new Date();\n// setFullYear orqali 2025 qiling\n",
      hint: "myDate.setFullYear(2025)",
      test: "const sandbox = new Function(code + '; let myDate = new Date(); myDate.setFullYear(2025); return myDate.getFullYear() === 2025;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 7,
      title: "Stringdan sana obyektini yaratish",
      instruction: "`2024-05-15` qatori yordamida yangi Date obyektini yaratib `newDate` ga yuklang.",
      startingCode: "let newDate = ;",
      hint: "new Date('2024-05-15')",
      test: "const sandbox = new Function(code + '; let newDate = new Date(\"2024-05-15\"); return newDate.getFullYear() === 2024;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 8,
      title: "Parametrlar (raqam) bilan sana yaratish",
      instruction: "`2024-yil 1-fevral` sanasini raqamlar bera turib `febDate` ga yarating. Oylar 0 dan boshlanishini unutmang!",
      startingCode: "let febDate = ;",
      hint: "new Date(2024, 1, 1)",
      test: "const sandbox = new Function(code + '; let febDate = new Date(2024, 1, 1); return febDate.getMonth() === 1;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 9,
      title: "Tezkor Timestamp",
      instruction: "`ts` o'zgaruvchisiga obyekt yaratmasdan hozirgi vaqtning timestamp'ini oling.",
      startingCode: "let ts = ;",
      hint: "Date.now()",
      test: "const sandbox = new Function(code + '; let ts = Date.now(); return typeof ts === \"number\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 10,
      title: "Sana Formatlash",
      instruction: "`now` obyektini `.toISOString()` metodidan o'tkazib `isoString` o'zgaruvchisiga oling.",
      startingCode: "let now = new Date();\nlet isoString = ;",
      hint: "now.toISOString()",
      test: "const sandbox = new Function(code + '; let now = new Date(); let isoString = now.toISOString(); return typeof isoString === \"string\";');\nreturn sandbox() ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da oylar qaysi indeksdan boshlanadi?",
      options: ["1", "0", "-1", "Indexlanmaydi"],
      correctAnswer: 1,
      explanation: "Oylar doim 0 dan boshlanadi, 0 = Yanvar, 11 = Dekabr."
    },
    {
      id: 2,
      question: "Haftaning qaysi kunligini raqam ko'rinishida oluvchi metod qaysi?",
      options: ["getDay()", "getDate()", "getWeek()", "getWeekDay()"],
      correctAnswer: 0,
      explanation: "getDay() metodidan foydalanib haftaning kunini olish mumkin (0 dan 6 gacha)."
    },
    {
      id: 3,
      question: "Oydagi sanani (nechanchi kun ekanini) bilish uchu metod qaysi?",
      options: ["getDay()", "getDate()", "getMonth()", "getTime()"],
      correctAnswer: 1,
      explanation: "getDate() metoddidan foydalanib oydagi sana (1-31) olinadi."
    },
    {
      id: 4,
      question: "Yangi Date obyekti yaratmasdan turib joriy Timestamp ni olishning eng tezkor usuli qaysi?",
      options: ["new Date().getTime()", "Date.now()", "Date.getTime()", "Date.stamp()"],
      correctAnswer: 1,
      explanation: "Date.now() obyektsiz ravishda to'g'ridan-to'g'ri hozirgi vaqtni millisekundlarda qaytaradi."
    },
    {
      id: 5,
      question: "Agar new Date(2024, 12, 1) deb bersak qaysi sana hosil bo'ladi?",
      options: ["Xato beradi", "2024-yil Dekabr", "2025-yil 1-Yanvar", "2024-yil 1-Yanvar"],
      correctAnswer: 2,
      explanation: "Oylar 11 gacha bo'lgani uchun, 12 kiritilganda u avtomatik ravishda keyingi yilning 0-oyiga (Yanvarga) o'tib ketadi."
    },
    {
      id: 6,
      question: "JavaScript vaqtlarni qaysi o'lchov birligida hisoblaydi (Unix Epoch dan beri)?",
      options: ["Sekundlar", "Daqiqalar", "Mikrosekundlar", "Millisekundlar"],
      correctAnswer: 3,
      explanation: "PHP kabi ba'zi tillardan farqli ravishda JS Timestamp uchun doim millisekundlardan foydalanadi."
    },
    {
      id: 7,
      question: "Backendga (ma'lumotlar bazasiga) vaqtni yuborishda standart format qaysi metod bilan yasaladi?",
      options: ["toISOString()", "toUTCString()", "toString()", "toDateString()"],
      correctAnswer: 0,
      explanation: "toISOString() xalqaro ISO 8601 standartiga mos string qaytaradi, uni backendlar eng oson o'qiydi."
    },
    {
      id: 8,
      question: "Vaqt obyekti Date(0) nima qaytaradi?",
      options: ["Hozirgi vaqtni", "0000-yilni", "Xatolikni", "1970-yil 1-Yanvar UTC ni"],
      correctAnswer: 3,
      explanation: "Parametr 0 bo'lsa, bu boshlang'ich Unix davri (1970-yil 1-yanvar 00:00:00 UTC) ni ifodalaydi."
    },
    {
      id: 9,
      question: "Bir kunga ortga siljitish uchun to'g'ri yo'l qaysi?",
      options: [
        "date.setDate(date.getDate() - 1)",
        "date.setDate(-1)",
        "date.setDay(-1)",
        "date - 1"
      ],
      correctAnswer: 0,
      explanation: "Sana ayirish uchun getDate() dan 1 ayrilib setDate() ga beriladi, JS oy va yillarni avtomatik moslaydi."
    },
    {
      id: 10,
      question: "Kompyuterning Local TimeZone va UTC farqini minutda beradigan metod?",
      options: ["getUTCMinutes()", "getTimezoneOffset()", "getLocalOffset()", "offsetTime()"],
      correctAnswer: 1,
      explanation: "getTimezoneOffset() metodi daqiqalarda farqni qaytaradi."
    },
    {
      id: 11,
      question: "Ikkita sana obyekti === bilan solishtirilganda nima bo'ladi? (let a = new Date(); let b = new Date(); a===b)",
      options: ["true agar sani bir xil bo'lsa", "false", "Xato", "Doim true"],
      correctAnswer: 1,
      explanation: "Obyektlar qiymati emas, manzili (reference) tekshiriladi, shuning uchun === da har doim false bo'ladi."
    },
    {
      id: 12,
      question: "Qaysi metod yordamida sananing faqat yil qismini o'zgartirish mumkin?",
      options: ["setYear()", "setFullYear()", "updateYear()", "changeYear()"],
      correctAnswer: 1,
      explanation: "Yilni o'rnatish uchun setFullYear() metodidan foydalaniladi (setYear eskirgan metod hisoblanadi)."
    }
  ]
};

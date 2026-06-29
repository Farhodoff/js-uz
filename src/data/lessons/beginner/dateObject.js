export const dateObjectLesson = {
  id: "dateObjectLesson",
  title: "Date Obyekti va Vaqt Bilan Ishlash",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Date Obyekti nima?
JavaScript-da vaqt va sanalar bilan ishlash uchun \`Date\` nomli maxsus obyektdan foydalaniladi. Date obyekti 1970-yil 1-yanvar yarim tundan boshlab hisoblangan millisekundlar asosida ishlaydi (bunga Unix Timestamp deyiladi).

---

### Real hayotiy o'xshatish
Tasavvur qiling, siz poyezdlar jadvalini tuzmoqchisiz:
- \`new Date()\` — bu hozirgi vaqtni ko'rsatadigan stansiya soati.
- \`setFullYear()\` yoki \`setMonth()\` — bu soatning faqat yilini yoki oyini burab to'g'rilaydigan murvat (nastroyka).
- \`Date.now()\` — bu 1970-yildan beri sekundomerni to'xtatmay necha millisekund o'tganini ko'rsatib turuvchi elektron tablo.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sanani yaratish va O'qish)
\\\`\\\`\\\`javascript
// Hozirgi aniq vaqtni olish
const now = new Date();
console.log(now);

// Sanadan qismlarni olish
console.log(now.getFullYear()); // Masalan, 2024 (getYear emas, doim getFullYear() ishlating)
console.log(now.getMonth());    // 0 dan boshlanadi! (0 = Yanvar, 11 = Dekabr)
console.log(now.getDate());     // Oyning nechanchi kuni (masalan, 15)
console.log(now.getDay());      // Hafta kuni (0 = Yakshanba, 1 = Dushanba...)
\\\`\\\`\\\`

### 2. Intermediate Example (Qo'lda sana yaratish)
\\\`\\\`\\\`javascript
// String yordamida:
const matnliSana = new Date("2024-10-15T10:30:00Z");

// Raqamlar yordamida: Yil, Oy, Kun, Soat, Minut, Sekund
// Esda tuting: Oylar 0 dan boshlanadi! (9 - Oktabr)
const aniqSana = new Date(2024, 9, 15, 10, 30, 0); 
\\\`\\\`\\\`

### 3. Advanced Example (Timestamp va Performans o'lchash)
\\\`\\\`\\\`javascript
// Timestamp (Millisekundlarda olish)
const timestamp = Date.now(); 

// Kod qancha ishlaganini o'lchash
const start = Date.now();
for (let i = 0; i < 1000000; i++) {} // Bo'sh tsikl
const end = Date.now();

console.log(\`Kod \${end - start} millisekund ishladi\`);
\\\`\\\`\\\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi
- Frontend-da vaqt zonalarini (timezones) to'g'ri ko'rsatish ko'p xatolarga sabab bo'ladi. Foydalanuvchilar har xil davlatda bo'lsa, xalqaro UTC vaqtidan mahalliy vaqtga o'tkazish aynan Date obyekti zimmasidadir.
- Oylarning 0 dan boshlanishi ko'pincha "off-by-one" (1 ga xato qilib qolish) buglariga olib keladi. Buni har doim yodda saqlash kerak.

---

## 4. ❌ YOMON va ✅ YAXSHI Misollar (Ko'p Uchraydigan Xatolar)

### 1. Oylarni noto'g'ri kiritish
❌ **YOMON (Yanvar oyini 1 deb hisoblash):**
\\\`\\\`\\\`javascript
let wrongDate = new Date(2024, 1, 1); 
// Natija: 2024-yil 1-Fevral bo'lib qoladi!
\\\`\\\`\\\`

✅ **YAXSHI (Oylarni 0 dan boshlashni hisobga olish):**
\\\`\\\`\\\`javascript
let correctDate = new Date(2024, 0, 1); // 2024-yil 1-Yanvar
\\\`\\\`\\\`

### 2. Kun (Sana) va Hafta kunini adashtirish
❌ **YOMON:**
\\\`\\\`\\\`javascript
let date = new Date();
console.log("Bugungi sana: " + date.getDay()); 
// Xatolik! Bu sening oydagi sanang emas, u HAFTA kuni (0-6)
\\\`\\\`\\\`

✅ **YAXSHI:**
\\\`\\\`\\\`javascript
let date = new Date();
console.log("Bugungi sana: " + date.getDate()); // Oydagi sana (1-31)
console.log("Hafta kuni: " + date.getDay()); // Hafta kuni
\\\`\\\`\\\`

---

## 5. 📊 Mermaid Diagrammasi

JavaScript-da Date klassining asosiy get va set metodlari sxemasi:

\\\`\\\`\\\`mermaid
classDiagram
    class Date {
      +getFullYear() Number
      +getMonth() Number
      +getDate() Number
      +getDay() Number
      +getTime() Number
      +setFullYear(year) void
      +setMonth(month) void
      +setDate(day) void
    }
    Date --|> "Vaqtni boshqarish"
\\\`\\\`\\\`

---

## 6. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da joriy vaqtni qanday olish mumkin?
   **Javob:** \`new Date()\` yordamida obyekt yaratish orqali.
2. **Savol:** \`getDate()\` va \`getDay()\` metodlarining farqi nimada?
   **Javob:** \`getDate()\` oydagi sanani (1-31), \`getDay()\` esa haftaning qaysi kuni ekanligini (0-6, bunda 0 Yakshanba) bildiradi.
3. **Savol:** \`Date\` konstruktoriga son berilsa u nimani ifodalaydi?
   **Javob:** 1970 yil 1-yanvardan o'tgan millisekundlarni (Timestamp).
4. **Savol:** Oylar qanday indekslanadi?
   **Javob:** 0 dan boshlanadi. 0 = Yanvar, 11 = Dekabr.

### Middle (5–8)
5. **Savol:** \`Date.now()\` va \`new Date().getTime()\` o'rtasida qanday farq bor?
   **Javob:** \`Date.now()\` to'g'ridan-to'g'ri timestamp qaytaradi va u tezroq, yangi \`Date\` obyekti yaratishni talab qilmaydi. Ikkinchisi obyekt yaratib, keyin metod chaqiradi.
6. **Savol:** \`getTimezoneOffset()\` nimani qaytaradi?
   **Javob:** UTC (Greenwich) vaqtidan mahalliy vaqtingiz (kompyuter vaqti) necha daqiqaga farq qilishini.
7. **Savol:** String formatida vaqt yuborsak (masalan ISO formatida), u qaysi vaqt mintaqasi asosida saqlanadi?
   **Javob:** Agar \`Z\` qo'shilgan bo'lsa UTC deb qabul qiladi. Faqat Yil-Oy-Kun bo'lsa standart UTC deydi. To'liq \`YYYY-MM-DDTHH:mm:ss\` bo'lsa brauzer ko'pincha Local TimeZone deb qabul qiladi.
8. **Savol:** Kun qo'shish yoki ayirishni qanday xavfsiz bajarish mumkin?
   **Javob:** \`date.setDate(date.getDate() + 1)\` kabi o'rnatish xavfsiz. Oydan sakrash holatini JS dvigateli o'zi avtomatik to'g'rilab qo'yadi.

### Senior (9–12)
9. **Savol:** Nima uchun \`new Date(2024, 12, 1)\` yozilganda xatolik bo'lmaydi?
   **Javob:** JS bunday ortiqcha qiymatlarni (12-oy bo'lmaydi) "overflowing" qiladi va avtomatik keyingi yilning 1-oyiga, ya'ni \`2025-yil 1-Yanvar\` ga o'tkazadi.
10. **Savol:** Nega aynan 1970 yil 1-yanvar tanlangan (Unix Epoch)?
    **Javob:** Bu kompyuter tarixidagi Unix operatsion tizimining standart boshlanish (Epoch) vaqti hisoblanadi. Shuning uchun ko'pgina tillar aynan shuni referens qilib oladi.
11. **Savol:** Ikkita sana obyekti \`date1 === date2\` bilan tekshirilsa natija qanday bo'ladi?
    **Javob:** \`false\`. Obyektlar reference orqali solishtiriladi. Ularni taqqoslash uchun qiymatlarini solishtirish kerak: \`date1.getTime() === date2.getTime()\`
12. **Savol:** \`toISOString()\` metodi qanday format qaytaradi?
    **Javob:** \`YYYY-MM-DDTHH:mm:ss.sssZ\` (ISO 8601 standarti). Bu ma'lumotlar bazasiga yuborish uchun eng universal usul.
`,
  exercises: [
    {
      "id": 1,
      "title": "Joriy vaqtni yaratish",
      "instruction": "`now` o'zgaruvchisiga hozirgi vaqt obyektini biriktiring.",
      "startingCode": "let now = ;",
      "hint": "new Date() yordamida",
      "test": "const sandbox = new Function(code + '; let now = new Date(); return now instanceof Date;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 2,
      "title": "Joriy yilni olish",
      "instruction": "`year` ga joriy yilni raqamda oling.",
      "startingCode": "let now = new Date();\nlet year = ;",
      "hint": "getFullYear() metodi.",
      "test": "const sandbox = new Function(code + '; let now = new Date(); let year = now.getFullYear(); return typeof year === \"number\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 3,
      "title": "Oyni to'g'ri olish",
      "instruction": "`month` o'zgaruvchisiga joriy oyni oling. Eslatma: getMonth natijasi 0 dan boshlanadi.",
      "startingCode": "let now = new Date();\nlet month = ;",
      "hint": "getMonth()",
      "test": "const sandbox = new Function(code + '; let now = new Date(); let month = now.getMonth(); return month >= 0 && month <= 11;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 4,
      "title": "Sana (kun) olish",
      "instruction": "`day` o'zgaruvchisiga oydagi joriy sanani (kunni) oling.",
      "startingCode": "let now = new Date();\nlet day = ;",
      "hint": "getDate() ishlatiladi.",
      "test": "const sandbox = new Function(code + '; let now = new Date(); let day = now.getDate(); return day >= 1 && day <= 31;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 5,
      "title": "Hafta kunini olish",
      "instruction": "`weekDay` ga haftaning qaysi kuniligini raqamda oling.",
      "startingCode": "let now = new Date();\nlet weekDay = ;",
      "hint": "getDay() ishlatiladi.",
      "test": "const sandbox = new Function(code + '; let now = new Date(); let weekDay = now.getDay(); return weekDay >= 0 && weekDay <= 6;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 6,
      "title": "Muayyan sanani o'rnatish",
      "instruction": "`myDate` obyektini yilini `setFullYear()` orqali 2025 qilib o'rnatib ko'ring.",
      "startingCode": "let myDate = new Date();\n// setFullYear orqali 2025 qiling\n",
      "hint": "myDate.setFullYear(2025)",
      "test": "const sandbox = new Function(code + '; let myDate = new Date(); myDate.setFullYear(2025); return myDate.getFullYear() === 2025;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 7,
      "title": "Stringdan sana obyektini yaratish",
      "instruction": "`2024-05-15` qatori yordamida yangi Date obyektini yaratib `newDate` ga yuklang.",
      "startingCode": "let newDate = ;",
      "hint": "new Date('2024-05-15')",
      "test": "const sandbox = new Function(code + '; let newDate = new Date(\"2024-05-15\"); return newDate.getFullYear() === 2024;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 8,
      "title": "Parametrlar (raqam) bilan sana yaratish",
      "instruction": "`2024-yil 1-fevral` sanasini raqamlar bera turib `febDate` ga yarating. Oylar 0 dan boshlanishini unutmang!",
      "startingCode": "let febDate = ;",
      "hint": "new Date(2024, 1, 1)",
      "test": "const sandbox = new Function(code + '; let febDate = new Date(2024, 1, 1); return febDate.getMonth() === 1;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 9,
      "title": "Tezkor Timestamp",
      "instruction": "`ts` o'zgaruvchisiga obyekt yaratmasdan hozirgi vaqtning timestamp'ini oling.",
      "startingCode": "let ts = ;",
      "hint": "Date.now()",
      "test": "const sandbox = new Function(code + '; let ts = Date.now(); return typeof ts === \"number\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 10,
      "title": "Sana Formatlash",
      "instruction": "`now` obyektini `.toISOString()` metodidan o'tkazib `isoString` o'zgaruvchisiga oling.",
      "startingCode": "let now = new Date();\nlet isoString = ;",
      "hint": "now.toISOString()",
      "test": "const sandbox = new Function(code + '; let now = new Date(); let isoString = now.toISOString(); return typeof isoString === \"string\";');\nreturn sandbox() ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "JavaScript-da oylar qaysi indeksdan boshlanadi?",
      "options": ["1", "0", "-1", "Indexlanmaydi"],
      "correctAnswer": 1,
      "explanation": "Oylar doim 0 dan boshlanadi, 0 = Yanvar, 11 = Dekabr."
    },
    {
      "id": 2,
      "question": "Haftaning qaysi kunligini raqam ko'rinishida oluvchi metod qaysi?",
      "options": ["getDay()", "getDate()", "getWeek()", "getWeekDay()"],
      "correctAnswer": 0,
      "explanation": "getDay() metodidan foydalanib haftaning kunini olish mumkin (0 dan 6 gacha)."
    },
    {
      "id": 3,
      "question": "Oydagi sanani (nechanchi kun ekanini) bilish uchu metod qaysi?",
      "options": ["getDay()", "getDate()", "getMonth()", "getTime()"],
      "correctAnswer": 1,
      "explanation": "getDate() metoddidan foydalanib oydagi sana (1-31) olinadi."
    },
    {
      "id": 4,
      "question": "Yangi Date obyekti yaratmasdan turib joriy Timestamp ni olishning eng tezkor usuli qaysi?",
      "options": ["new Date().getTime()", "Date.now()", "Date.getTime()", "Date.stamp()"],
      "correctAnswer": 1,
      "explanation": "Date.now() obyektsiz ravishda to'g'ridan-to'g'ri hozirgi vaqtni millisekundlarda qaytaradi."
    },
    {
      "id": 5,
      "question": "Agar new Date(2024, 12, 1) deb bersak qaysi sana hosil bo'ladi?",
      "options": ["Xato beradi", "2024-yil Dekabr", "2025-yil 1-Yanvar", "2024-yil 1-Yanvar"],
      "correctAnswer": 2,
      "explanation": "Oylar 11 gacha bo'lgani uchun, 12 kiritilganda u avtomatik ravishda keyingi yilning 0-oyiga (Yanvarga) o'tib ketadi."
    },
    {
      "id": 6,
      "question": "JavaScript vaqtlarni qaysi o'lchov birligida hisoblaydi (Unix Epoch dan beri)?",
      "options": ["Sekundlar", "Daqiqalar", "Mikrosekundlar", "Millisekundlar"],
      "correctAnswer": 3,
      "explanation": "PHP kabi ba'zi tillardan farqli ravishda JS Timestamp uchun doim millisekundlardan foydalanadi."
    },
    {
      "id": 7,
      "question": "Backendga (ma'lumotlar bazasiga) vaqtni yuborishda standart format qaysi metod bilan yasaladi?",
      "options": ["toISOString()", "toUTCString()", "toString()", "toDateString()"],
      "correctAnswer": 0,
      "explanation": "toISOString() xalqaro ISO 8601 standartiga mos string qaytaradi, uni backendlar eng oson o'qiydi."
    },
    {
      "id": 8,
      "question": "Vaqt obyekti Date(0) nima qaytaradi?",
      "options": ["Hozirgi vaqtni", "0000-yilni", "Xatolikni", "1970-yil 1-Yanvar UTC ni"],
      "correctAnswer": 3,
      "explanation": "Parametr 0 bo'lsa, bu boshlang'ich Unix davri (1970-yil 1-yanvar 00:00:00 UTC) ni ifodalaydi."
    },
    {
      "id": 9,
      "question": "Bir kunga ortga siljitish uchun to'g'ri yo'l qaysi?",
      "options": [
        "date.setDate(date.getDate() - 1)",
        "date.setDate(-1)",
        "date.setDay(-1)",
        "date - 1"
      ],
      "correctAnswer": 0,
      "explanation": "Sana ayirish uchun getDate() dan 1 ayrilib setDate() ga beriladi, JS oy va yillarni avtomatik moslaydi."
    },
    {
      "id": 10,
      "question": "Kompyuterning Local TimeZone va UTC farqini minutda beradigan metod?",
      "options": ["getUTCMinutes()", "getTimezoneOffset()", "getLocalOffset()", "offsetTime()"],
      "correctAnswer": 1,
      "explanation": "getTimezoneOffset() metodi daqiqalarda farqni qaytaradi."
    },
    {
      "id": 11,
      "question": "Ikkita sana obyekti === bilan solishtirilganda nima bo'ladi? (let a = new Date(); let b = new Date(); a===b)",
      "options": ["true agar sani bir xil bo'lsa", "false", "Xato", "Doim true"],
      "correctAnswer": 1,
      "explanation": "Obyektlar qiymati emas, manzili (reference) tekshiriladi, shuning uchun === da har doim false bo'ladi."
    },
    {
      "id": 12,
      "question": "Qaysi metod yordamida sananing faqat yil qismini o'zgartirish mumkin?",
      "options": ["setYear()", "setFullYear()", "updateYear()", "changeYear()"],
      "correctAnswer": 1,
      "explanation": "Yilni o'rnatish uchun setFullYear() metodidan foydalaniladi (setYear eskirgan metod hisoblanadi)."
    }
  ]
};

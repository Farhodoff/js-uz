export const regexLesson = {
  id: "a10",
  title: "Regular Expressions (RegEx)",
  theory: `## Regular Expressions (RegEx)

RegEx – matnli ma'lumotlar ichidan qidirish, mos keladigan qismlarni ajratib olish va almashtirish uchun maxsus qoliplar (patterns).

---

### 1. RegEx yaratish
JavaScriptda RegEx ikki xil usulda yaratiladi:
1. **Literal:** \`/pattern/flags\`
2. **Konstruktor:** \`new RegExp("pattern", "flags")\`

\`\`\`javascript
const pattern = /hello/i; // "hello"ni katta-kichik harfga qaramasdan qidiradi
\`\`\`

### 2. Bayroqlar (Flags)
- **g (global):** Barcha mosliklarni qidiradi (birinchi topilganidan keyin to'xtamaydi).
- **i (ignore case):** Katta va kichik harflarni farqlamaydi.
- **m (multiline):** Ko'p qatorli qidiruv.

### 3. Maxsus belgilar va sinflar
- **\\\\d:** Faqat raqamlar [0-9].
- **\\\\w:** Harf, raqam va pastki chiziq [A-Z, a-z, 0-9, _].
- **\\\\s:** Bo'shliq (probel, tab).
- **. (nuqta):** Har qanday bitta belgi (yangi qatordan tashqari).
- **^:** Qator boshi.
- **$:** Qator oxiri.

### 4. Miqdor ko'rsatkichlari (Quantifiers)
- **+:** 1 yoki undan ko'p.
- *****: 0 yoki undan ko'p.
- **?:** 0 yoki 1 (ixtiyoriy).
- **{n,m}:** n tadan m tagacha.

### 5. Metodlar
- **regex.test(str):** Moslik bormi? (true/false).
- **str.match(regex):** Mos keluvchi qismlarni massiv qilib qaytaradi.
- **str.replace(regex, newStr):** Matnni almashtiradi.

\`\`\`javascript
const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
console.log(emailRegex.test("ali@gmail.com")); // true
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **RegEx nima va u nima uchun ishlatiladi?**
2. **test() va match() metodlari farqi nimada?**
3. **i va g bayroqlari nimani anglatadi?**

### Middle daraja
4. **Capturing groups (qavslar) nima uchun kerak?**
5. **Lookahead va Lookbehind (musbat/manfiy) tushunchalari nima?**
6. **RegEx'da "Greedy" (ochko'z) va "Lazy" (dangasa) qidiruv nima?**`,
  task: `// 1. Matn ichida raqam borligini tekshiruvchi RegEx yozing.
// 2. Foydalanuvchi kiritgan telefon raqamini (+998XXXXXXXXX formatida) tekshiruvchi pattern yarating.
// 3. Matn ichidagi barcha "JavaScript" so'zlarini (katta-kichik harfidan qat'iy nazar) "JS"ga almashtiring.
// 4. Parol uchun RegEx: kamida 8 ta belgi, kamida bitta harf va bitta raqam bo'lishi shart.
// 5. match() yordamida matn ichidagi barcha sonlarni ajratib oling.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Check numbers
/\\\\d/.test("Salom 123");

// 2. Phone validation
const phoneRegex = /^\\\\+998\\\\d{9}$/;

// 3. Replace all
"Javascript juda zo'r".replace(/javascript/gi, "JS");

// 4. Password validation
const passRegex = /^(?=.*[A-Za-z])(?=.*\\\\d)[A-Za-z\\\\d]{8,}$/;

// 5. Get all numbers
"12 olma va 34 anor".match(/\\\\d+/g);`,
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da Regular Expressions (RegEx) qanday asosiy maqsadlarda ishlatiladi?",
      options: [
        "Faqat matnlarni katta harflarga o'tkazish uchun",
        "Matnlar ichidan ma'lum andozalar (patterns) bo'yicha qidirish, moslikni tekshirish, kerakli qismlarni ajratib olish va almashtirish uchun",
        "Obyektlarni massivga o'tkazish uchun",
        "CSS selektorlarini boshqarish uchun"
      ],
      correctAnswer: 1,
      explanation: "RegEx — bu matnlar bilan ishlashda juda kuchli qurol bo'lib, uning yordamida email, telefon raqami kabilarni tekshirish (validation) va kerakli andozadagi matnlarni izlab topish mumkin."
    },
    {
      id: 2,
      question: "RegEx-da bayroqlar (flags) ichida `g` va `i` nimani anglatadi?",
      options: [
        "`g` - global (barcha mosliklarni qidirish), `i` - ignore case (katta-kichik harflarni farqlamaslik)",
        "`g` - group (guruhlash), `i` - index (indeks bo'yicha)",
        "`g` - greedy (ochko'z), `i` - inline (qator ichida)",
        "`g` - generator, `i` - iterator"
      ],
      correctAnswer: 0,
      explanation: "`g` bayrog'i andozaga mos keladigan birinchi qismni topgach to'xtamasdan, satr oxirigacha qidirishni buyuradi. `i` bayrog'i esa katta va kichik harflarni bir xil deb hisoblaydi."
    },
    {
      id: 3,
      question: "RegEx andozasida faqat raqamlarni (0-9) topish uchun qaysi maxsus sinfdan (character class) foydalaniladi?",
      options: [
        "`\\w`",
        "`\\s`",
        "`\\d`",
        "`.`"
      ],
      correctAnswer: 2,
      explanation: "`\\d` (digit) belgisi har qanday raqam belgisini anglatadi. `\\w` esa so'z belgilari (harf, son va pastki chiziq), `\\s` bo'shliqlar, nuqta esa yangi qatordan boshqa har qanday bitta belgini bildiradi."
    },
    {
      id: 4,
      question: "RegEx-da `regex.test(str)` va `str.match(regex)` metodlarining farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "`test()` faqat moslik bormi-yo'qligini tekshirib true/false qaytaradi; `match()` esa mos keluvchi qismlarni massiv shaklida ajratib qaytaradi",
        "`test()` yangi matn qaytaradi, `match()` esa o'zgaruvchini o'chiradi",
        "`test()` faqat Node.js'da, `match()` faqat brauzerda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`RegExp.prototype.test()` metodi faqat andoza mosligini boolean shaklda tekshiradi va tezroq ishlaydi. `String.prototype.match()` esa topilgan natijalar ro'yxatini massiv qilib qaytaradi."
    },
    {
      id: 5,
      question: "RegEx andozasida satr (yoki qator) boshi va oxirini belgilash uchun mos ravishda qaysi anchor (langar) belgilaridan foydalaniladi?",
      options: [
        "`^` va `$`",
        "`[` va `]`",
        "`(` va `)`",
        "`*` va `+`"
      ],
      correctAnswer: 0,
      explanation: "`^` belgisi andozaning satr boshidan, `$` esa satr oxiridan boshlab mos kelishini talab qiladi. Ular asosan email yoki telefon raqami kabi to'liq matnli kiritmalarni boshidan oxirigacha aniq tekshirishda ishlatiladi."
    }
  ]
};

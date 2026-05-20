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
- **str.split(regex):** Qoidaga mos joyda ajratadi.

\`\`\`javascript
const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
console.log(emailRegex.test("ali@gmail.com")); // true
\`\`\`

---

## Savol-Javoblar (12 ta)

**<b>1. RegEx nima va u nima uchun ishlatiladi?</b>**
Regular Expression (RegEx) — matn ichidagi naqshlarni (patterns) aniqlash, tekshirish, ajratish va almashtirish uchun ishlatiladigan maxsus belgilar tizimi.


**<b>2. test() va match() metodlari farqi nimada?</b>**
\`test()\` faqat mos kelish bor-yo'qligini \`true/false\` qaytaradi. \`match()\` esa topilgan barcha mos qismlarni massiv qilib qaytaradi.


**<b>3. i va g bayroqlari nimani anglatadi?</b>**
\`i\` — katta-kichik harf farqi yo'q (case-insensitive). \`g\` — global, barcha mosliklarni izlaydi, birinchisida to'xtamaydi.


**<b>4. Capturing groups (qavslar) nima uchun kerak?</b>**
\`()\` qavslar yordamida mos keladigan qismni "guruh" sifatida saqlash mumkin. Masalan, \`/(\\\\d{4})-(\\\\d{2})/\` sanani guruhlab oladi.


**<b>5. \\d, \\w, \\s nimani bildiradi?</b>**
\`\\d\` — raqamlar (0-9). \`\\w\` — harf, raqam va pastki chiziq. \`\\s\` — bo'shliq va tabulyatsiya belgilari.


**<b>6. RegEx'da "Greedy" va "Lazy" qidiruv farqi nima?</b>**
Greedy (\`+\`, \`*\`) — imkon boricha ko'proq belgini qamrab oladi. Lazy (\`+?\`, \`*?\`) — imkon boricha kam belgini qamrab oladi.


**<b>7. ^ va $ nima?</b>**
\`^\` — qator yoki satr boshini bildiradi. \`$\` — qator yoki satr oxirini bildiradi. Email yoki telefon kabi to'liq matnni tekshirishda zarur.


**<b>8. replace() bilan RegEx ishlatishda nima afzallik bor?</b>**
\`str.replace(/pattern/g, 'yangi')\` — \`g\` bayrog'i bilan barcha mosliklarni almashtiradi. Oddiy string bilan faqat birinchisi almashtiriladi.


**<b>9. Lookahead nima? Misol keltiring.</b>**
Lookahead (\`(?=...)\`) — hozirgi pozitsiyadan keyin ma'lum naqsh kelishini talab qiladi. Masalan, \`\\d+(?= yil)\` faqat "yil" oldidagi raqamlarni topadi.


**<b>10. Character class [] nima?</b>**
\`[abc]\` — 'a', 'b' yoki 'c' dan birini moslashtiradi. \`[a-z]\` — barcha kichik harflar. \`[^abc]\` — a, b, c dan boshqa istalgan belgi.


**<b>11. Non-capturing group (?:...) nima?</b>**
\`(?:...)\` — guruhlanadi, lekin natijada saqlanmaydi. Miqdor berish uchun ishlatiladi: \`(?:ab)+\` — "ab" bir yoki ko'p marta.


**<b>12. String.prototype.split() da RegEx qanday ishlaydi?</b>**
\`"a1b2c3".split(/\\d/)\` → \`["a", "b", "c", ""]\` — har bir raqam ajratuvchi sifatida ishlatiladi.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Raqam borligini tekshirish",
      instruction: "Matn ichida kamida bitta raqam borligini tekshiruvchi RegEx yozing va test() bilan ishlatib true qaytaring.",
      startingCode: "const matn = 'Yoshim 25 da';\n// RegEx yozing\nconst regex = ;\nconst result = regex.test(matn);\nconsole.log(result);",
      hint: "const regex = /\\d/;",
      test: "if (result === true) return null; return 'Raqam topilmadi';"
    },
    {
      id: 2,
      title: "2️⃣ Telefon raqami validatsiyasi",
      instruction: "+998XXXXXXXXX formatidagi telefon raqamini tekshiruvchi RegEx yozing.",
      startingCode: "const phone = '+998901234567';\n// RegEx yozing\nconst phoneRegex = ;\nconsole.log(phoneRegex.test(phone));",
      hint: "const phoneRegex = /^\\+998\\d{9}$/;",
      test: "if (phoneRegex.test('+998901234567') === true && phoneRegex.test('998901234567') === false) return null; return 'Telefon regex noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "3️⃣ Barcha sonlarni ajratib olish",
      instruction: "Matn ichidagi barcha sonlarni match() yordamida massiv sifatida oling.",
      startingCode: "const matn = '12 ta olma va 34 ta anor bor';\n// match() ishlatib sonlarni oling\nconst sonlar = ;\nconsole.log(sonlar);",
      hint: "const sonlar = matn.match(/\\d+/g);",
      test: "if (Array.isArray(sonlar) && sonlar[0] === '12' && sonlar[1] === '34') return null; return 'Sonlar topilmadi';"
    },
    {
      id: 4,
      title: "4️⃣ So'zni almashtirish (global replace)",
      instruction: "Matn ichidagi barcha 'JavaScript' so'zlarini (katta-kichik harfdan qat'iy nazar) 'JS' bilan almashtiring.",
      startingCode: "const matn = 'Javascript zo\\'r. JAVASCRIPT tili!';\n// replace() ishlating\nconst yangi = ;\nconsole.log(yangi);",
      hint: "const yangi = matn.replace(/javascript/gi, 'JS');",
      test: "if (yangi === 'JS zo\\'r. JS tili!') return null; return 'Almashtirish noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "5️⃣ Email tekshirish",
      instruction: "Oddiy email manzilini tekshiruvchi RegEx yozing.",
      startingCode: "const email1 = 'ali@gmail.com';\nconst email2 = 'noto\\'g\\'ri-email';\n// RegEx yozing\nconst emailRegex = ;\nconsole.log(emailRegex.test(email1), emailRegex.test(email2));",
      hint: "const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;",
      test: "if (emailRegex.test('ali@gmail.com') === true && emailRegex.test('noto\\'g\\'ri') === false) return null; return 'Email regex noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "6️⃣ Bosh harfni topish",
      instruction: "Matn ichidagi barcha so'zlarning bosh harflarini topib massiv qiling.",
      startingCode: "const matn = 'Ali Bobur Zara';\n// Bosh harflarni toping\nconst boshHarflar = ;\nconsole.log(boshHarflar);",
      hint: "const boshHarflar = matn.match(/[A-Z]/g);",
      test: "if (Array.isArray(boshHarflar) && boshHarflar.length === 3) return null; return 'Bosh harflar topilmadi';"
    },
    {
      id: 7,
      title: "7️⃣ Satr boshi va oxiri",
      instruction: "Faqat 'Salom' so'zidan boshlanadigan va oxirida '!' bilan tugaydigan satrni tekshiring.",
      startingCode: "const satr1 = 'Salom dunyo!';\nconst satr2 = 'Dunyo Salom!';\n// RegEx yozing\nconst regex = ;\nconsole.log(regex.test(satr1), regex.test(satr2));",
      hint: "const regex = /^Salom.*!$/;",
      test: "if (regex.test('Salom dunyo!') === true && regex.test('Dunyo Salom!') === false) return null; return 'Regex noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "8️⃣ Parol kuchi tekshirish",
      instruction: "Parol kamida 8 ta belgi, kamida 1 ta raqam va 1 ta harf bo'lishini tekshiring.",
      startingCode: "const parol1 = 'Salom123';\nconst parol2 = 'qisqa1';\n// RegEx yozing\nconst parolRegex = ;\nconsole.log(parolRegex.test(parol1), parolRegex.test(parol2));",
      hint: "const parolRegex = /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/;",
      test: "if (parolRegex.test('Salom123') === true && parolRegex.test('qisqa1') === false) return null; return 'Parol regex noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "9️⃣ Bo'shliqlar bilan ajratish",
      instruction: "Matnni bir yoki ko'p bo'shliqlar bo'yicha split() qiling.",
      startingCode: "const matn = 'bir   ikki  uch';\n// RegEx bilan split qiling\nconst qismlar = ;\nconsole.log(qismlar);",
      hint: "const qismlar = matn.split(/\\s+/);",
      test: "if (qismlar.length === 3 && qismlar[0] === 'bir') return null; return 'Split noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "🔟 Guruh bilan sana ajratish",
      instruction: "'2024-05-19' formatidagi sanadan yil, oy va kunni capturing groups yordamida ajratib oling.",
      startingCode: "const sana = '2024-05-19';\n// Capturing groups ishlatib match qiling\nconst natija = sana.match( /* regex */ );\nconsole.log(natija[1], natija[2], natija[3]);",
      hint: "sana.match(/(\\d{4})-(\\d{2})-(\\d{2})/)",
      test: "const n = '2024-05-19'.match(/(\\d{4})-(\\d{2})-(\\d{2})/); if (n && n[1] === '2024') return null; return 'Guruh ajratish noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ URL dan protokolni ajratish",
      instruction: "'https://example.com' URL dan faqat protokolni ('https') ajratib oling.",
      startingCode: "const url = 'https://example.com';\n// Protokolni ajrating\nconst protokol = url.match( /* regex */ )?.[1];\nconsole.log(protokol);",
      hint: "url.match(/^(https?)/)?.[1]",
      test: "const p = 'https://example.com'.match(/^(https?)/)?.[1]; if (p === 'https') return null; return 'Protokol ajratilmadi';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Maxfiy ma'lumotlarni yashirish (Eng Qiyin)",
      instruction: "Matn ichidagi kredit karta raqamini (16 ta raqam) yulduzchalar bilan yashiring (faqat oxirgi 4 ta ko'rinsin).",
      startingCode: "const matn = 'Karta: 1234567890123456';\n// replace bilan yashiring: **** **** **** 3456\nconst yashirilgan = matn.replace( /* regex */, '****');\nconsole.log(yashirilgan);",
      hint: "matn.replace(/\\b(\\d{4} ?){3}/, '**** **** **** ')",
      test: "const y = 'Karta: 1234567890123456'.replace(/\\d(?=\\d{4})/g, '*'); if (y.includes('3456') && y.includes('*')) return null; return 'Yashirish noto\\'g\\'ri';"
    }
  ],
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

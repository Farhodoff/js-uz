export const regexLesson = {
  id: "regex",
  title: "Regular Expressions (RegEx): Murakkab Matn Tahlili",
  level: "Murakkab",
  description: "Matnlardan andozalar bo'yicha murakkab qidiruv, lookaround assertions va ReDoS xavfsizligi.",
  theory: `## 1. NEGA kerak?
Matnli ma'lumotlar bilan ishlashda oddiy \`indexOf\` yoki \`includes\` metodlari juda cheklangan. Masalan, matn ichidan faqat email manzillarini, telefon raqamlarini yoki muayyan formatdagi sanalarni ajratib olish uchun shunchaki so'z qidirish yetarli emas. **Regular Expressions (RegEx)** matn ichidan murakkab qoliplar (patterns) bo'yicha qidirish, kiritilgan ma'lumotlarni tekshirish (validation) va matn qismlarini dinamik almashtirish uchun kuchli dasturlash vositasidir.

---

## 2. SODDALIK (Analogiya)
RegEx-ni **detektiv qidiruv ko'rsatmalariga** o'xshatish mumkin.
Siz qidiruvchiga "Ali ismli odamni top" demaysiz, balki:
"Bosh harfi katta 'A' bilan boshlanadigan, keyin 2 ta harf keladigan, yonida esa 1990 dan 2005 gacha bo'lgan son yozilgan so'zni top" (bu \`\\bA[a-z]{2}\\s(199\\d|200[0-5])\\b\`) deb andoza berasiz. Detektiv shu andozaga mos keladigan har qanday matnni sizga topib beradi.

---

## 3. STRUKTURA VA CHUQUR TUSHUNCHALAR

### A. Lookahead va Lookbehind (Lookaround Assertions)
Lookaround assertions — bu matn kursorini oldinga siljitmasdan (non-consuming), ma'lum bir pozitsiyadan oldin yoki keyin muayyan shart bajarilishini tekshirish usulidir.
1. **Positive Lookahead \`(?=...)\`:** Joriy pozitsiyadan keyin berilgan andoza kelishini talab qiladi.
   * \`\\d+(?=\\sUSD)\` -> "100 USD" ichidan "100" ni topadi, chunki undan keyin " USD" bor, lekin "USD" natijaga qo'shilmaydi.
2. **Negative Lookahead \`(?!...)\`:** Joriy pozitsiyadan keyin berilgan andoza kelmasligini talab qiladi.
   * \`\\d+(?!\\sUSD)\` -> "100 EUR" ichidan "100" ni topadi.
3. **Positive Lookbehind \`(?<=...)\`:** Joriy pozitsiyadan oldin ma'lum andoza bo'lishini talab qiladi.
   * \`(?<=\\$)\\d+\` -> "$100" ichidan "100" ni topadi.
4. **Negative Lookbehind \`(?<!...)\`:** Joriy pozitsiyadan oldin ma'lum andoza bo'lmasligini talab qiladi.
   * \`(?<!\\$)\\d+\` -> "€100" ichidan "100" ni topadi.

\`\`\`mermaid
graph TD
    A[Lookaround Assertions] --> B[Lookahead - O'ng tomonni tekshiradi]
    A --> C[Lookbehind - Chap tomonni tekshiradi]
    B --> D["Positive (?=...) - Bor bo'lsin"]
    B --> E["Negative (?!...) - Yo'q bo'lsin"]
    C --> F["Positive (?<=...) - Bor bo'lsin"]
    C --> G["Negative (?<!...) - Yo'q bo'lsin"]
\`\`\`

### B. Greedy va Lazy Matching (Backtracking)
* **Greedy (Ochko'z, sukut bo'yicha):** Miqdor ko'rsatkichlari (\`*\`, \`+\`, \`{n,m}\`) imkoni boricha eng uzun moslikni qamrab olishga harakat qiladi.
  * Masalan, \`"<div>salom</div><div>dunyo</div>"\` matnini \`/<.*>/\` regexi bilan qidirsak, u butun matnni \`<div>salom</div><div>dunyo</div>\` bitta moslik deb topadi.
* **Lazy (Dangasa):** Miqdor ko'rsatkichidan keyin \`?\` belgisini qo'yish (\`*?\`, \`+?\`, \`??\`) orqali eng qisqa moslikni topish buyuriladi.
  * Yuqoridagi misolda \`/<.*?>/\` regexi ikkita alohida moslikni topadi: \`<div>\` va \`</div>\`.

\`\`\`mermaid
sequenceDiagram
    participant T as Matn: &lt;div&gt;salom&lt;/div&gt;
    participant G as Greedy Pattern: /&lt;.*&gt;/
    participant L as Lazy Pattern: /&lt;.*?&gt;/
    Note over T, G: Greedy eng oxirgi &gt; belgisini qidirib davom etadi
    G-->>T: Natija: &lt;div&gt;salom&lt;/div&gt;
    Note over T, L: Lazy birinchi &gt; belgisini topishi bilanoq to'xtaydi
    L-->>T: Natija: &lt;div&gt;
\`\`\`

### C. ReDoS (Regular Expression Denial of Service)
ReDoS — bu xavfsiz bo'lmagan regex yozilishi tufayli yuzaga keladigan xavfsizlik zaifligidir. Ba'zi andozalarda, agar matn andozaga mos kelmasa, regex dvigateli barcha kombinatsiyalarni qayta tekshirib chiqish uchun **Catastrophic Backtracking (falokatli ortga qaytish)** holatiga tushib qoladi.
* Masalan, \`/(a+)+b/\` regexiga \`aaaaaaaaaaaaaaaaaaaaaaaaaaaaac\` (oxiri 'b' o'rniga 'c') satrini bersak, CPU 100% yuklanib, brauzer yoki Node.js server butunlay qotib qoladi. Bu kabi andozalardan qochish lozim.

---

## 4. XATOLAR (Common mistakes)
1. **Lookbehind mos kelmasligini tekshirish:** Kvadrat qavslar ichida inkor etish (\`[^...]\`) va negative lookahead (\`(?!...)\`) farqini chalkashtirish. Kvadrat qavs ichidagi \`^\` faqat bitta belgi o'rnini inkor etadi, lookaround esa butun bir andozani tekshiradi.
2. **Katta-kichik harf bayrog'ini (\`i\`) unutish:** Foydalanuvchi kiritgan matnlarda (masalan, email yoki ismlar) harflar katta-kichik bo'lishi mumkinligini hisobga olmaslik.

---

## 5. SAVOLLAR VA JAVOBLAR
**1. RegEx nima?**
Matn ichidagi andozalarni aniqlash, tekshirish, ajratish va almashtirish uchun ishlatiladigan maxsus belgilar tizimi.

**2. test() va match() metodlari farqi nimada?**
\`test()\` faqat mos kelish bor-yo'qligini \`true/false\` qaytaradi. \`match()\` esa topilgan barcha mos qismlarni massiv qilib qaytaradi.

**3. i va g bayroqlari nimani anglatadi?**
\`i\` — katta-kichik harf farqi yo'q (case-insensitive). \`g\` — global, barcha mosliklarni izlaydi, birinchisida to'xtamaydi.`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Raqam borligini tekshirish",
      instruction: "Matn ichida kamida bitta raqam borligini tekshiruvchi RegEx yozing va test() bilan ishlatib true qaytaring.",
      startingCode: "const matn = 'Yoshim 25 da';\n// RegEx yozing\nconst regex = /\\d/;\nconst result = regex.test(matn);\nconsole.log(result);",
      hint: "const regex = /\\d/;",
      test: "if (result === true) return null; return 'Raqam topilmadi';"
    },
    {
      id: 2,
      title: "2️⃣ Telefon raqami validatsiyasi",
      instruction: "+998XXXXXXXXX formatidagi telefon raqamini tekshiruvchi RegEx yozing.",
      startingCode: "const phone = '+998901234567';\n// RegEx yozing\nconst phoneRegex = /^\\+998\\d{9}$/;\nconsole.log(phoneRegex.test(phone));",
      hint: "const phoneRegex = /^\\+998\\d{9}$/;",
      test: "if (phoneRegex.test('+998901234567') === true && phoneRegex.test('998901234567') === false) return null; return 'Telefon regex noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "3️⃣ Barcha sonlarni ajratib olish",
      instruction: "Matn ichidagi barcha sonlarni match() yordamida massiv sifatida oling.",
      startingCode: "const matn = '12 ta olma va 34 ta anor bor';\n// match() ishlatib sonlarni oling\nconst sonlar = matn.match(/\\d+/g);\nconsole.log(sonlar);",
      hint: "const sonlar = matn.match(/\\d+/g);",
      test: "if (Array.isArray(sonlar) && sonlar[0] === '12' && sonlar[1] === '34') return null; return 'Sonlar topilmadi';"
    },
    {
      id: 4,
      title: "4️⃣ So'zni almashtirish (global replace)",
      instruction: "Matn ichidagi barcha 'JavaScript' so'zlarini (katta-kichik harfdan qat'iy nazar) 'JS' bilan almashtiring.",
      startingCode: "const matn = 'Javascript zo\\'r. JAVASCRIPT tili!';\n// replace() ishlating\nconst yangi = matn.replace(/javascript/gi, 'JS');\nconsole.log(yangi);",
      hint: "const yangi = matn.replace(/javascript/gi, 'JS');",
      test: "if (yangi === 'JS zo\\'r. JS tili!') return null; return 'Almashtirish noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "5️⃣ Email tekshirish",
      instruction: "Oddiy email manzilini tekshiruvchi RegEx yozing.",
      startingCode: "const email1 = 'ali@gmail.com';\nconst email2 = 'noto\\'g\\'ri-email';\n// RegEx yozing\nconst emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconsole.log(emailRegex.test(email1), emailRegex.test(email2));",
      hint: "const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;",
      test: "if (emailRegex.test('ali@gmail.com') === true && emailRegex.test('noto\\'g\\'ri') === false) return null; return 'Email regex noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "6️⃣ Bosh harfni topish",
      instruction: "Matn ichidagi barcha so'zlarning bosh harflarini topib massiv qiling.",
      startingCode: "const matn = 'Ali Bobur Zara';\n// Bosh harflarni toping\nconst boshHarflar = matn.match(/[A-Z]/g);\nconsole.log(boshHarflar);",
      hint: "const boshHarflar = matn.match(/[A-Z]/g);",
      test: "if (Array.isArray(boshHarflar) && boshHarflar.length === 3) return null; return 'Bosh harflar topilmadi';"
    },
    {
      id: 7,
      title: "7️⃣ Satr boshi va oxiri",
      instruction: "Faqat 'Salom' so'zidan boshlanadigan va oxirida '!' bilan tugaydigan satrni tekshiring.",
      startingCode: "const satr1 = 'Salom dunyo!';\nconst satr2 = 'Dunyo Salom!';\n// RegEx yozing\nconst regex = /^Salom.*!$/;\nconsole.log(regex.test(satr1), regex.test(satr2));",
      hint: "const regex = /^Salom.*!$/;",
      test: "if (regex.test('Salom dunyo!') === true && regex.test('Dunyo Salom!') === false) return null; return 'Regex noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "8️⃣ Parol kuchi tekshirish",
      instruction: "Parol kamida 8 ta belgi, kamida 1 ta raqam va 1 ta harf bo'lishini tekshiring.",
      startingCode: "const parol1 = 'Salom123';\nconst parol2 = 'qisqa1';\n// RegEx yozing\nconst parolRegex = /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/;\nconsole.log(parolRegex.test(parol1), parolRegex.test(parol2));",
      hint: "const parolRegex = /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/;",
      test: "if (parolRegex.test('Salom123') === true && parolRegex.test('qisqa1') === false) return null; return 'Parol regex noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "9️⃣ Bo'shliqlar bilan ajratish",
      instruction: "Matnni bir yoki ko'p bo'shliqlar bo'yicha split() qiling.",
      startingCode: "const matn = 'bir   ikki  uch';\n// RegEx bilan split qiling\nconst qismlar = matn.split(/\\s+/);\nconsole.log(qismlar);",
      hint: "const qismlar = matn.split(/\\s+/);",
      test: "if (qismlar.length === 3 && qismlar[0] === 'bir') return null; return 'Split noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "🔟 Guruh bilan sana ajratish",
      instruction: "'2024-05-19' formatidagi sanadan yil, oy va kunni capturing groups yordamida ajratib oling.",
      startingCode: "const sana = '2024-05-19';\n// Capturing groups ishlatib match qiling\nconst natija = sana.match(/(\\d{4})-(\\d{2})-(\\d{2})/);\nconsole.log(natija[1], natija[2], natija[3]);",
      hint: "sana.match(/(\\d{4})-(\\d{2})-(\\d{2})/)",
      test: "const n = '2024-05-19'.match(/(\\d{4})-(\\d{2})-(\\d{2})/); if (n && n[1] === '2024') return null; return 'Guruh ajratish noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ URL dan protokolni ajratish",
      instruction: "'https://example.com' URL dan faqat protokolni ('https') ajratib oling.",
      startingCode: "const url = 'https://example.com';\n// Protokolni ajrating\nconst protokol = url.match(/^(https?)/)?.[1];\nconsole.log(protokol);",
      hint: "url.match(/^(https?)/)?.[1]",
      test: "const p = 'https://example.com'.match(/^(https?)/)?.[1]; if (p === 'https') return null; return 'Protokol ajratilmadi';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Maxfiy ma'lumotlarni yashirish (Eng Qiyin)",
      instruction: "Matn ichidagi kredit karta raqamini (16 ta raqam) yulduzchalar bilan yashiring (faqat oxirgi 4 ta ko'rinsin).",
      startingCode: "const matn = 'Karta: 1234567890123456';\n// replace bilan yashiring\nconst yashirilgan = matn.replace(/\\d(?=\\d{4})/g, '*');\nconsole.log(yashirilgan);",
      hint: "matn.replace(/\\d(?=\\d{4})/g, '*')",
      test: "const y = 'Karta: 1234567890123456'.replace(/\\d(?=\\d{4})/g, '*'); if (y.includes('3456') && y.includes('*')) return null; return 'Yashirish noto\\'g\\'ri';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Murakkab Parol Tekshiruvi (validatePasswordStrength)",
      instruction: "Lookahead assertion-lardan foydalanib, parolni murakkablikka tekshiruvchi `validatePasswordStrength(password)` funksiyasini yozing. Parol kamida 8 ta belgidan iborat bo'lishi, kamida bitta katta harf, bitta kichik harf, bitta raqam va kamida bitta maxsus belgi (`@`, `$`, `!`, `%`, `*`, `?`, `&`) o'z ichiga olishi shart. Barcha shartlar bajarilsa `true`, aks holda `false` qaytarsin.",
      startingCode: "function validatePasswordStrength(password) {\n  // Kodni shu yerdan yozing\n}",
      hint: "const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/; return regex.test(password);",
      test: "if (typeof validatePasswordStrength !== 'function') return 'validatePasswordStrength funksiya emas';\nif (validatePasswordStrength('Salom123!') !== true) return 'To\\'g\\'ri parolga false berildi';\nif (validatePasswordStrength('salom123!') !== false) return 'Katta harfi yo\\'q parolga true berildi';\nif (validatePasswordStrength('Salom!!!') !== false) return 'Raqami yo\\'q parolga true berildi';\nif (validatePasswordStrength('Salom123') !== false) return 'Maxsus belgisi yo\\'q parolga true berildi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Nomli Guruhlarni Ajratuvchi (parseNamedGroups)",
      instruction: "Nomli capturing groups (`(?<groupName>...)`) bo'lgan `regex` andozasini `str` satrida ishlatib, mos kelgan guruh nomlari va ularning qiymatlarini kalit-qiymat obyekt ko'rinishida qaytaruvchi `parseNamedGroups(regex, str)` funksiyasini yozing. Agar moslik topilmasa, bo'sh obyekt `{}` qaytarsin.",
      startingCode: "function parseNamedGroups(regex, str) {\n  // Kodni shu yerdan yozing\n}",
      hint: "const match = str.match(regex); return match && match.groups ? match.groups : {};",
      test: "if (typeof parseNamedGroups !== 'function') return 'parseNamedGroups funksiya emas';\nconst regex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nconst res = parseNamedGroups(regex, 'Bugun 2026-06-01 sanasi');\nif (res && res.year === '2026' && res.month === '06' && res.day === '01') {\n  if (Object.keys(parseNamedGroups(regex, 'noto\\'g\\'ri')).length === 0) return null;\n}\nreturn 'Guruhlar noto\\'g\\'ri ajratildi';"
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
      explanation: "`^` belgisi andozaning satr boshidan, `$` esa satr oxiridan boshlab mos kelishini talab qiladi. Ular asosan email yoki telefon raqami kabi to'liq matnli kiritmalarni boshidan oxirigacha precis tekshirishda ishlatiladi."
    },
    {
      id: 6,
      question: "RegEx'da greedy (ochko'z) va lazy (dangasa) qidiruv farqi nimada?",
      options: [
        "Greedy imkon qadar ko'p belgi bilan moslik topadi, lazy esa imkon qadar kam belgi bilan cheklanadi",
        "Greedy faqat raqamlarni, lazy esa faqat harflarni qidiradi",
        "Greedy xotirani ko'p yeydi, lazy xotirani tejaydi",
        "Greedy faqat satr boshidan, lazy satr oxiridan qidiradi"
      ],
      correctAnswer: 0,
      explanation: "RegEx'dagi miqdor ko'rsatkichlari (masalan, `+` va `*`) odatda greedy bo'lib, eng uzun moslikni topishga intiladi. Ulardan keyin `?` qo'yilsa (masalan, `+?` yoki `*?`), va'da lazy bo'lib qoladi va eng qisqa moslikni topadi."
    },
    {
      id: 7,
      question: "RegEx'da `(?:...)` (non-capturing group) ning vazifasi nima?",
      options: [
        "Guruhdagi belgilarning mosligini tekshiradi, lekin guruhni xotirada saqlamaydi (capturing qilmaydi)",
        "Satr boshidagi elementlarni qidirishdan cheklaydi",
        "Har qanday belgini inkor qiladi",
        "Faqat izoh yozish uchun ishlatiladi"
      ],
      correctAnswer: 0,
      explanation: "`(?:...)` guruhlash imkonini beradi (masalan, miqdor ko'rsatkichini qo'llash uchun), lekin u mos kelgan natijalar guruhlari (capturing groups) ro'yxatida alohida indeks bilan saqlanmaydi."
    },
    {
      id: 8,
      question: "RegEx'da lookahead `(?=...)` va lookbehind `(?<=...)` ning asosiy vazifasi nima?",
      options: [
        "Match natijasiga qo'shmasdan, faqat ma'lum bir naqshdan oldin yoki keyin kelishini tekshirish (assertion)",
        "Satr oxiridagi bo'shliqlarni olib tashlash",
        "String obyektini RegEx obyektiga o'tkazish",
        "Matndagi barcha katta harflarni kichik qilish"
      ],
      correctAnswer: 0,
      explanation: "Lookaround (lookahead va lookbehind) assertions hisoblanadi. Ular ma'lum bir shart bajarilishini tekshiradi, lekin u shart qismini qidiruv natijasiga qo'shmaydi."
    },
    {
      id: 9,
      question: "RegEx andozasidagi `\\s` maxsus sinfi nimani bildiradi?",
      options: [
        "Faqat kichik harflarni",
        "Bo'shliq belgilari (probel, tab, yangi qator)ni",
        "Faqat maxsus belgilarni ($, %, @)",
        "Faqat raqamlarni"
      ],
      correctAnswer: 1,
      explanation: "`\\s` (whitespace) probel, tabulyatsiya (`\\t`), yangi qator (`\\n`) kabi har qanday bo'shliq belgilarini bildiradi."
    },
    {
      id: 10,
      question: "Agar `str.replace()` metodida `g` (global) bayrog'i ishlatilmasa nima sodir bo'ladi?",
      options: [
        "Faqat birinchi mos kelgan qism almashtiriladi",
        "Barcha mos kelgan qismlar almashtiriladi",
        "Hech narsa almashtirilmaydi va xato qaytadi",
        "Butun satr o'chirib tashlanadi"
      ],
      correctAnswer: 0,
      explanation: "`g` (global) bayrog'i bo'lmasa, `replace` metodi satr ichidagi faqat birinchi uchragan moslikni almashtiradi va qidirishni to'xtatadi."
    },
    {
      id: 11,
      question: "RegEx'da `[^abc]` yozuvi nimani anglatadi?",
      options: [
        "Faqat 'a', 'b' yoki 'c' harflaridan boshlanadigan satrlarni",
        "'a', 'b' va 'c' dan tashqari har qanday bitta belgini",
        "Satr oxirihda 'abc' iborasi borligini",
        "'abc' so'zining o'zini"
      ],
      correctAnswer: 1,
      explanation: "Kvadrat qavs ichidagi `^` inkor etish (negation) ma'nosini bildiradi. `[^abc]` andozasi 'a', 'b' yoki 'c' bo'lmagan har qanday bitta belgiga mos keladi."
    },
    {
      id: 12,
      question: "RegEx konstruktori `new RegExp('pattern', 'flags')` qachon foydali bo'ladi?",
      options: [
        "Andoza (pattern) o'zgaruvchi qiymatga bog'liq ravishda dinamik yaratilishi kerak bo'lganda",
        "Faqat global bayroq ishlatilganda",
        "RegEx literals ishlamay qolganda",
        "Kod hajmini kamaytirish uchun"
      ],
      correctAnswer: 0,
      explanation: "RegExp konstruktori string qabul qilganligi sababli, unga o'zgaruvchilar orqali dinamik yig'ilgan matnli andozalarni uzatish mumkin. Literal `/pattern/` esa faqat statik yoziladi."
    },
    {
      id: 13,
      question: "RegEx lookbehind assertion `(?<=...)` ning joriy kursor o'rni bilan bog'liq ishlash mexanizmi qanday?",
      options: [
        "U moslikni topgach, matn ko'rsatkichini (cursor) o'ngga suradi",
        "U moslikni match qismiga qo'shmasdan, faqat kursor turgan o'rindan chapga qarab shart tekshirilishini ta'minlaydi (non-consuming assertion)",
        "U faqat satr oxiridagi belgilarni tekshiradi",
        "U barcha belgilarni inkor qiladi"
      ],
      correctAnswer: 1,
      explanation: "Lookbehind (ortga qarash) - joriy kursor o'rnidan chapdagi matn shartga to'g'ri kelishini tekshiradi va u tekshirilgan qismni qidiruv natijasiga qo'shmaydi."
    },
    {
      id: 14,
      question: "RegEx tahlilida Catastrophic Backtracking (falokatli ortga qaytish) yoki ReDoS xavfi qachon yuzaga keladi?",
      options: [
        "Faqat lazy matching ishlatilganda",
        "Regex andozasida bir nechta bir-biriga kirib ketgan va bir xil belgilar guruhini qamrab oladigan miqdor ko'rsatkichlari (masalan, `(a+)+`) bo'lsa va matnda mos kelmaslik oxirida sodir bo'lsa",
        "Faqat string split() metodida ishlatilganda",
        "Faqat test() metodi ishlatilganda"
      ],
      correctAnswer: 1,
      explanation: "Dvigatel matn mos kelmasligini aniqlash uchun barcha mumkin bo'lgan rekursiv aylanma kombinatsiyalarni tekshirib chiqadi. Murakkab va zanjirli guruhlarda bu kombinatsiyalar soni eksponentsial oshib ketib, CPU-ni 100% yuklaydi va dasturni qotiradi (ReDoS)."
    }
  ]
};

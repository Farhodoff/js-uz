export const jsWhat = {
  id: "js-introduction",
  title: "JavaScriptga Kirish",
  level: "Beginner",
  description: "JavaScript tili tarixi, uning veb-dasturlashdagi roli va asosiy chop etish buyruqlari.",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizda chiroyli mashina bor (bu HTML va CSS). Lekin u yurmaydi, chiroqlari yonmaydi va signali ishlamaydi. Uni harakatga keltirish uchun sizga dvigatel kerak. Saytlarda bu vazifani JavaScript bajaradi. Tugmalar bosilganda nima sodir bo'lishi, animatsiyalar, ma'lumotlarni yuklash — hammasi JS orqali qilinadi.

## 2. SODDALIK (Analogiya)
Saytni bir odam deb tasavvur qilsak:
- **HTML** — uning suyagi va tanasi (statik tuzilishi).
- **CSS** — uning kiyimi va pardoz-andozi (ko'rinishi).
- **JavaScript** — uning miyasi va harakatlari (gapirish, yurish, fikrlash).

## 3. STRUKTURA

### A. console.log() — Konsolga chiqarish
Bu buyruq dasturchiga: "Menga mana shu ma'lumotni konsolda ko'rsat!" degan buyruqni beradi.
\`\`\`javascript
console.log("Assalomu alaykum!");
console.log(5 + 10);
\`\`\`

### B. alert() — Ogohlantirish oynasi
Foydalanuvchiga brauzerning tepa qismida xabar ko'rsatuvchi kichik oyna chiqaradi.
\`\`\`javascript
alert("Salom, dasturchi!");
\`\`\`

### C. console.error() va console.warn()
Konsolga xatolik (qizil) va ogohlantirish (sariq) xabarlarini chiqaradi.
\`\`\`javascript
console.error("Xatolik yuz berdi!");
console.warn("Diqqat, ogohlantirish!");
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Katta-kichik harf (Case-sensitivity):** \`Console.log\` yoki \`console.Log\` xato ❌. JavaScript katta va kichik harflarni farqlaydi. Doim kichik harfda yozing: \`console.log\` ✅.
2. **Qo'shtirnoqlarning juftligi:** Matnlarni yozganda ochilgan qo'shtirnoq turi bilan yopilgani mos kelishi shart. Masalan: \`"Salom'\` xato ❌, \`"Salom"\` yoki \`'Salom'\` to'g'ri ✅.
3. **Qo'shtirnoqlarni unutish:** Matnli ma'lumotlarni qo'shtirnoqsiz yozsangiz, JS uni o'zgaruvchi deb o'ylaydi va \`ReferenceError\` xatosini beradi.

## 6. SAVOLLAR VA JAVOBLAR
**1. JavaScript nima?**
JavaScript — bu asosan veb-sahifalarni interaktiv, jonli va dinamik qilish uchun ishlatiladigan dasturlash tilidir.

**2. Sayt qurilishida JSning o'rni qanday?**
HTML va CSS saytning tashqi ko'rinishini yaratsa, JS saytga mantiq, harakat va hayot bag'ishlaydi.

**3. JS faqat brauzerdami?**
Dastlab faqat brauzerlar uchun yaratilgan bo'lsa-da, bugungi kunda Node.js yordamida serverlarda, mobil va desktop ilovalarda ham ishlatiladi.

**4. console.log() nima uchun kerak?**
Dasturchilar kod yozish jarayonida o'zgaruvchilar qiymatini tekshirish va xatolarni aniqlash uchun foydalanadilar.

**5. alert() funksiyasi nima qiladi?**
Foydalanuvchiga brauzer ekranida "OK" tugmasi bo'lgan kichik ogohlantiruvchi oyna chiqaradi.

**6. JS kodi qayerda yoziladi?**
HTML faylning ichida \`<script>\` tegi ichida yoki alohida \`.js\` kengaytmali faylda yozilib ulanadi.

**7. Brendan Eich kim?**
Brendan Eich — 1995-yilda bor-yo'g'i 10 kun ichida JavaScript dasturlash tilining birinchi versiyasini yaratgan amerikalik dasturchi.

**8. Nima uchun JS dynamic til deyiladi?**
Chunki undagi o'zgaruvchilar turi qat'iy talab qilinmaydi va dastur ishlash jarayonida o'zgarishi mumkin.

**9. JS harflar farqiga boradimi (case-sensitive)?**
Ha, JS katta va kichik harflarni qat'iy farqlaydi. Masalan, \`ism\` va \`Ism\` alohida o'zgaruvchilardir.

**10. console.error() nima uchun?**
Konsolga qizil rangli xatolik haqidagi maxsus xabarni chiqarish uchun ishlatiladi.

**11. Matnni qo'shtirnoqsiz yozsa nima bo'ladi?**
JS uni o'zgaruvchi deb o'ylab, u topilmagani sababli \`ReferenceError\` xatosini beradi.

**12. JS birinchi marta nechanchi yilda chiqqan?**
JavaScript birinchi marta 1995-yilda taqdim etilgan.
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi qadam",
      instruction: "Konsolga 'Salom Dunyo' matnini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('Salom Dunyo');",
      test: "if (logs.includes('Salom Dunyo')) return null; return 'Konsolga Salom Dunyo chiqmagan!';"
    },
    {
      id: 2,
      title: "Matematika",
      instruction: "Konsolga 5 va 10 sonlarining yig'indisini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(5 + 10);",
      test: "if (logs.includes(15)) return null; return 'Natija 15 chiqishi kerak!';"
    },
    {
      id: 3,
      title: "Ism chiqish",
      instruction: "O'z ismingizni konsolga text ko'rinishida chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('Ali');",
      test: "if (logs.length > 0 && typeof logs[0] === 'string' && logs[0].length > 0) return null; return 'Ismingizni matn ko\\'rinishida chiqaring!';"
    },
    {
      id: 4,
      title: "Ogohlantirish oynasi",
      instruction: "alert() funksiyasi yordamida 'Xush kelibsiz!' xabarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "alert('Xush kelibsiz!');",
      test: "if (code.includes('alert') && code.includes('Xush kelibsiz')) return null; return 'alert funksiyasidan foydalanib Xush kelibsiz! deb yozing!';"
    },
    {
      id: 5,
      title: "Konsol xatosi",
      instruction: "console.error() yordamida 'Tizimda xatolik!' xabarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.error('Tizimda xatolik!');",
      test: "if (code.includes('console.error') && code.includes('Tizimda xatolik')) return null; return 'console.error orqali Tizimda xatolik! xabarini chiqaring!';"
    },
    {
      id: 6,
      title: "Konsol ogohlantirishi",
      instruction: "console.warn() yordamida 'Diqqat!' deb xabar chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.warn('Diqqat!');",
      test: "if (code.includes('console.warn') && code.includes('Diqqat')) return null; return 'console.warn yordamida Diqqat! xabarini chiqaring!';"
    },
    {
      id: 7,
      title: "Ko'p satrli xabar",
      instruction: "Konsolga bitta console.log ichida '\\n' yordamida ikki satrda: 'Satr 1' va 'Satr 2' matnlarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('Satr 1\\nSatr 2');",
      test: "if (logs.length > 0 && logs[0].includes('Satr 1') && logs[0].includes('Satr 2')) return null; return 'console.log ichida \\\\n orqali ikki qatorda matn chiqaring!';"
    },
    {
      id: 8,
      title: "Ko'paytirish amali",
      instruction: "Konsolga 4 va 8 ning ko'paytmasini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(4 * 8);",
      test: "if (logs.includes(32)) return null; return 'Ko\\'paytma natijasi 32 chiqishi kerak!';"
    },
    {
      id: 9,
      title: "Bir necha ma'lumot",
      instruction: "console.log ichida vergul bilan ajratib 'Yosh:' matni va 25 sonini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('Yosh:', 25);",
      test: "if (code.includes('console.log') && code.includes('25') && code.includes('Yosh')) return null; return 'console.log(\\'Yosh:\\', 25) yozuvini kiriting!';"
    },
    {
      id: 10,
      title: "Konsolni tozalash",
      instruction: "Konsolni tozalash uchun mo'ljallangan console.clear() metodini chaqiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.clear();",
      test: "if (code.includes('console.clear')) return null; return 'console.clear() metodini chaqiring!';"
    },
    {
      id: 11,
      title: "Matn turini aniqlash",
      instruction: "console.log ichida typeof operatori yordamida 'Salom' matnining turini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(typeof 'Salom');",
      test: "if (logs.includes('string')) return null; return 'typeof yordamida string chiqaring!';"
    },
    {
      id: 12,
      title: "Murakkab ifoda",
      instruction: "Konsolga (20 - 5) / 3 ifodasining natijasini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log((20 - 5) / 3);",
      test: "if (logs.includes(5)) return null; return 'Natija 5 bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Sayt yaratishda HTML va CSS tana va kiyim bo'lsa, JavaScript nima vazifani bajaradi?",
      options: [
        "Saytning ranglarini o'zgartiradi",
        "Saytning miyasi va harakatlarini (dinamik qismini, masalan, tugma bosilganda ishlashini) ta'minlaydi",
        "Saytni qidiruv tizimlariga qo'shadi",
        "Faqat rasmlarni tahrirlaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript saytga hayot bag'ishlaydi. Tugmalar bosilganda nima sodir bo'lishi, animatsiyalar, ma'lumot yuklashlar va barcha mantiqiy amallar aynan JavaScript yordamida amalga oshiriladi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri konsolga ma'lumot chiqarishning to'g'ri yozilgan sintaksisi hisoblanadi?",
      options: [
        "`Console.log('Salom');`",
        "`console.log('Salom');`",
        "`console.Log('Salom');`",
        "`print('Salom');`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript harflarning katta-kichikligiga sezgir (case-sensitive) tildir. `console` va `log` kichik harflarda yozilishi kerak."
    },
    {
      id: 3,
      question: "JavaScript dasturlash tilining asoschisi kim?",
      options: [
        "Tim Berners-Lee",
        "Brendan Eich",
        "Bill Gates",
        "Guido van Rossum"
      ],
      correctAnswer: 1,
      explanation: "Brendan Eich 1995-yilda Netscape kompaniyasida ishlab yurganida JavaScript tilini bor-yo'g'i 10 kun ichida yaratgan."
    },
    {
      id: 4,
      question: "JavaScript dasturlash tili case-sensitive (harflarning katta-kichikligiga sezgir) hisoblanadimi?",
      options: [
        "Yo'q, farqi yo'q",
        "Ha, katta va kichik harflar alohida farqlanadi (masalan, `console` va `Console` alohida narsalar)",
        "Faqat string ichidagi harflar farqlanadi",
        "Faqat Node.js muhitida farqlanadi"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda katta va kichik harfning ahamiyati katta. Masalan, `myvar` va `myVar` ikkita alohida o'zgaruvchi deb hisoblanadi."
    },
    {
      id: 5,
      question: "Foydalanuvchiga ekran markazida ogohlantiruvchi yoki xabar beruvchi kichik modal oyna chiqaradigan funksiya qaysi?",
      options: [
        "`console.log()`",
        "`alert()`",
        "`prompt()`",
        "`document.write()`"
      ],
      correctAnswer: 1,
      explanation: "`alert()` brauzerda foydalanuvchi tasdiqlamaguncha sahifadagi boshqa amallarni to'xtatib turadigan maxsus xabar oynasini chiqaradi."
    },
    {
      id: 6,
      question: "JavaScript dastlab qaysi nom ostida yaratilgan?",
      options: [
        "Java",
        "Mocha (keyinchalik LiveScript, oxirida JavaScript)",
        "C++",
        "Python Script"
      ],
      correctAnswer: 1,
      explanation: "JavaScript birinchi marta 1995-yilda Netscape brauzerida 'Mocha' nomi ostida yaratilgan, keyin 'LiveScript' bo'lgan va oxiri 'JavaScript' deb nomlangan."
    },
    {
      id: 7,
      question: "Brauzer konsolida qizil rangli xato xabari chiqaradigan metod qaysi?",
      options: [
        "console.log()",
        "console.error()",
        "console.warn()",
        "console.clear()"
      ],
      correctAnswer: 1,
      explanation: "console.error() metodi brauzer konsoliga qizil rangli fon va xatolik belgisi bilan xabar chiqarish uchun foydalaniladi."
    },
    {
      id: 8,
      question: "JavaScript kodi HTML sahifasining qaysi tegi ichida yozilishi kerak?",
      options: [
        "`<js>` tegi ichida",
        "`<script>` tegi ichida",
        "`<javascript>` tegi ichida",
        "`<link>` tegi ichida"
      ],
      correctAnswer: 1,
      explanation: "HTMLda JavaScript kodlarini yozish yoki tashqi JS fayllarni ulash uchun har doim `<script>` tegidan foydalaniladi."
    },
    {
      id: 9,
      question: "JavaScript yordamida veb-sahifa elementlarini real vaqtda o'zgartirish mumkinmi?",
      options: [
        "Yo'q, sahifani yangilash shart",
        "Ha, sahifani yangilamasdan (dinamik ravishda) elementlarni o'zgartirsa bo'ladi",
        "Faqat CSS yordamida o'zgartirsa bo'ladi",
        "Faqat server yordamida o'zgartirsa bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript yordamida sahifadagi har qanday HTML elementning matni, uslubi yoki tuzilishini foydalanuvchiga ko'rinib turgan vaqtda real vaqtda o'zgartirish mumkin."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri JavaScript dasturini brauzerdan tashqarida, ya'ni serverda ham ishlashiga imkon beradi?",
      options: [
        "Google Chrome",
        "Node.js runtime muhiti",
        "HTML5",
        "VS Code"
      ],
      correctAnswer: 1,
      explanation: "Node.js bu JavaScript kodini brauzerdan tashqarida, kompyuterda yoki serverlarda to'g'ridan-to'g'ri ishga tushirish imkonini beruvchi runtime muhitidir."
    },
    {
      id: 11,
      question: "console.clear() metodi nima vazifani bajaradi?",
      options: [
        "O'zgaruvchilarni o'chirib yuboradi",
        "Brauzer konsolidagi barcha yozuvlarni tozalab yuboradi",
        "Butun sahifani tozalaydi",
        "Funksiyalarni tozalaydi"
      ],
      correctAnswer: 1,
      explanation: "console.clear() metodi konsol oynasidagi barcha oldingi xabar va loglarni o'chirib, konsolni bo'sh holga keltiradi."
    },
    {
      id: 12,
      question: "HTML fayliga tashqi JavaScript faylini ulashda qaysi atribut ishlatiladi?",
      options: [
        "href",
        "src (masalan, <script src=\"app.js\"></script>)",
        "rel",
        "link"
      ],
      correctAnswer: 1,
      explanation: "Tashqi JavaScript faylini HTMLga ulashda `<script>` tegining `src` (source) atributi orqali fayl yo'li ko'rsatiladi."
    }
  ]
};

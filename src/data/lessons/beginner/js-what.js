export const jsWhat = {
  id: "js-introduction",
  title: "JavaScriptga Kirish",
  theory: `## JavaScript: Miya va Dvigatel

### 1. NEGA kerak?
Tasavvur qiling, sizda chiroyli mashina bor (bu HTML va CSS). Lekin u yurmaydi, chiroqlari yonmaydi va signali ishlamaydi. Uni harakatga keltirish uchun sizga dvigatel kerak. Saytlarda bu vazifani JavaScript bajaradi. Tugmalar bosilganda nima sodir bo'lishi, animatsiyalar, ma'lumotlarni yuklash — hammasi JS orqali qilinadi.

### 2. SODDALIK (Analogiya)
Saytni bir odam deb tasavvur qilsak:
- **HTML** — uning suyagi va tanasi.
- **CSS** — uning kiyimi va pardoz-andozi.
- **JavaScript** — uning miyasi va harakatlari (gapirish, yurish).

### 3. STRUKTURA

#### A. console.log() — Konsolga chiqarish
Bu buyruq kompyuterga: "Menga mana shu ma'lumotni ko'rsat!" degan ma'noni beradi.
\`\`\`javascript
console.log("Assalomu alaykum!");
\`\`\`

#### B. alert() — Oyna chiqarish
Foydalanuvchiga xabar ko'rsatuvchi kichik oyna.
\`\`\`javascript
alert("Salom!");
\`\`\`

### 4. AMALIYOT (Mashqlar pastda)

### 5. XATOLAR (Common mistakes)
1. **Katta-kichik harf:** \`Console.log\` xato ❌. Doim kichik harfda: \`console.log\` ✅.
2. **Qo'shtirnoqlar:** Matnlarni doim \`" "\` yoki \`' '\` ichiga oling. Bo'lmasa xato beradi.

### 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. JavaScript nima?**
JavaScript — bu asosan veb-sahifalarni interaktiv, jonli va dinamik qilish uchun ishlatiladigan dasturlash tilidir. Bugungi kunda u nafaqat brauzerda, balki serverda va mobil ilovalarda ham keng qo'llaniladi.


**2. Sayt qurilishida JSning o'rni qanday?**
HTML va CSS saytning tana tuzilishi va tashqi ko'rinishini (statik) yaratsa, JS saytga mantiq va harakat (dinamiklik) bag'ishlaydi.


**3. JS faqat brauzerdami?**
Yo'q, dastlab faqat brauzerlar uchun yaratilgan bo'lsa-da, bugungi kunda Node.js kabi texnologiyalar yordamida serverlarda, ma'lumotlar bazalarida, mobil va desktop ilovalarda ham ishlatiladi.


**4. console.log() nima uchun kerak?**
Dasturchilar kod yozish jarayonida o'zgaruvchilar qiymatini tekshirish, xatolarni aniqlash va turli xabarlarni konsol ekraniga chiqarib ko'rish uchun foydalanadilar.


**5. alert() funksiyasi nima qiladi?**
Foydalanuvchiga brauzer ekranida "OK" tugmasi bo'lgan kichik ogohlantiruvchi oyna (popup message) chiqaradi.


**6. JS kodi qayerda yoziladi?**
HTML faylning ichida \`<script>\` tegi ichida yoki alohida \`.js\` kengaytmali faylda yozilib, keyin HTMLga ulab qo'yiladi.


**7. Brendan Eich kim?**
Brendan Eich — 1995-yilda bor-yo'g'i 10 kun ichida JavaScript dasturlash tilining birinchi versiyasini yaratgan amerikalik muhandis.


**8. Nima uchun JS "Dynamic" til deyiladi?**
Chunki undagi o'zgaruvchilar ma'lumot turini qat'iy talab qilmaydi (bitta o'zgaruvchiga oldin son, keyin matn yozsa bo'ladi) va sahifa yuklanganidan keyin ham elementlarni o'zgartira oladi.


**9. JS harflar farqiga boradimi (case-sensitive)?**
Ha, JS katta va kichik harflarni qat'iy farqlaydi. Masalan, \`console\` va \`Console\` yoki \`ism\` va \`Ism\` alohida narsalar hisoblanadi.


**10. console.error() nima uchun?**
Konsolga oddiy ma'lumot emas, balki qizil rangli xatolik haqidagi maxsus xabarni chiqarish uchun ishlatiladi.


**11. Matnni qo'shtirnoqsiz yozsa nima bo'ladi?**
JS dvigateli uni matn (string) emas, balki o'zgaruvchi yoki kalit so'z deb o'ylaydi va u topilmagani sababli \`ReferenceError\` xatosini beradi.


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
      test: "if (logs.includes('Salom Dunyo')) return null; return 'Konsolga chiqmagan!';"
    },
    {
      id: 2,
      title: "Matematika",
      instruction: "Konsolga 5 va 10 sonlarining yig'indisini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(5 + 10);",
      test: "if (logs.includes('15')) return null; return 'Natija 15 chiqishi kerak!';"
    },
    {
      id: 3,
      title: "Ism chiqish",
      instruction: "O'z ismingizni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('Ismingiz');",
      test: "if (logs.length > 0 && typeof logs[0] === 'string') return null; return 'Ismingizni matn ko\\'rinishida chiqaring!';"
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
    }
  ]
};

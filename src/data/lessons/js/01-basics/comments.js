export const commentsLesson = {
  id: "commentsLesson",
  title: "Sharhlar (Comments)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz kitob o'qiyapsiz va chetiga o'zingiz uchun qalam bilan eslatma yozib qo'ydingiz.
Kitobni o'qigan boshqa odam bu eslatmani ko'radi, lekin kitobning asosiy mazmuni o'zgarmaydi.

Dasturlashda sharhlar (comments) — xuddi shu qalam bilan yozilgan eslatmalardir.

Sharhlar (comments) — kod ichida faqat odamlar o'qishi uchun yoziladigan va kompyuter tomonidan bajarilmaydigan tushuntirish yozuvlaridir.

JavaScript'da sharhlarning 2 xil turi mavjud:
1. **Bir qatorli sharh (\`//\`):** bitta qatorni eslatma qilish uchun ishlatiladi.
2. **Ko'p qatorli sharh (\`/* ... */\`):** bir nechta qatorni qamrab oluvchi uzunroq tushuntirishlar uchun ishlatiladi.

---

## 2. Nega kerak?

Vaqt o'tishi bilan o'zingiz yozgan kodni ham nima uchun yozganingizni unutib qo'yishingiz mumkin. Boshqa dasturchilar esa kodingiz mantiqini darhol tushunolmasligi mumkin.

Sharhlar kod yoniga tushuntirish qoldirish va kerak bo'lmagan qatorni vaqtincha to'xtatib turish (o'chirib qo'yish) uchun kerak.

---

## 3. Birinchi misol

Bu kodda bir qatorli sharh ishlatilgan va ekranga matn chiqariladi.

\`\`\`javascript
// Bu salomlashuv kodi
console.log("Salom!"); // Ekranga Salom! chiqadi
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

Kompyuter \`//\` belgisi bilan yozilgan matnlarni butunlay e'tiborsiz qoldiradi va faqat \`console.log("Salom!");\` buyrug'ini bajaradi.

---

## 4. Qator-baqator tahlil

- \`// Bu salomlashuv kodi\` — bir qatorli sharh (single-line comment). Kompyuter bu qatorni bajarmaydi.
- \`console.log("Salom!");\` — ekranga matn chiqaruvchi buyruq.
- \`// Ekranga Salom! chiqadi\` — buyruqdan keyin yozilgan bir qatorli sharh.

---

## 5. Yana bitta misol

Bu kodda ko'p qatorli sharh ishlatilgan.

\`\`\`javascript
/*
  Ushbu kod foydalanuvchiga
  salomlashuv xabarini yuboradi
*/
console.log("Xush kelibsiz!");
\`\`\`

\`\`\`text
// Natija: Xush kelibsiz!
\`\`\`

Ko'p qatorli sharh \`/*\` bilan boshlanadi va \`*/\` bilan tugaydi. Uning orasidagi barcha qatorlar kompyuter tomonidan tashlab ketiladi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Ko'p qatorli sharhni yopmaslik
❌ Xato kod:
\`\`\`javascript
/* Bu yerda sharh boshlandi
console.log("Salom!");
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid or unexpected token\` xatoligi yuz beradi. Sharh yopilmagani sababli kompyuter keyingi barcha kodlarni sharh deb o'ylaydi.
✅ To'g'ri variant:
\`\`\`javascript
/* Bu yerda sharh boshlandi */
console.log("Salom!");
\`\`\`

### 2. Sharh belgisini teskari yozish
❌ Xato kod:
\`\`\`javascript
\\\\ Bu sharh
console.log("Salom!");
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid or unexpected token\` xatoligi beradi. JavaScript'da sharh faqat oldinga qiya chiziq (\`//\`) bilan yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
// Bu sharh
console.log("Salom!");
\`\`\`

### 3. Qo'shtirnoq ichidagi sharh belgisi
❌ Xato tushuncha:
\`\`\`javascript
console.log("// Bu matn");
\`\`\`
Nima bo'ladi: Qo'shtirnoq ichidagi belgilar sharh emas, balki oddiy matn deb hisoblanadi. Ekranga \`// Bu matn\` chiqadi.
✅ To'g'ri tushuncha:
Sharh yozish uchun uni qo'shtirnoqdan tashqarida yozing:
\`\`\`javascript
// Bu sharh
console.log("Bu matn");
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`console.log("Salom");\` kodi tepasiga \`// Salomlashuv\` deb bir qatorli sharh yozing.

### 2-mashq (O'rtacha)
\`/*\` va \`*/\` belgilaridan foydalanib, 2 qatordan iborat ko'p qatorli sharh yozing.

### 3-mashq (Kodni to'xtatish)
Quyidagi kodni sharhga aylantirib, ishlamaydigan qilib qo'ying:
\`\`\`javascript
console.log("Test");
\`\`\`

### Javoblar:
1.
\`\`\`javascript
// Salomlashuv
console.log("Salom");
\`\`\`
2.
\`\`\`javascript
/*
  Dasturlash darsi
  Sharhlar mavzusi
*/
\`\`\`
3.
\`\`\`javascript
// console.log("Test");
\`\`\`

---

## 8. Xulosa

1. Sharhlar — kompyuter bajarmaydigan, faqat inson o'qishi uchun yoziladigan eslatmalar.
2. Bir qatorli sharh \`//\` bilan, ko'p qatorli sharh esa \`/* ... */\` oralig'ida yoziladi.
3. Sharhlar yordamida kodga izoh qoldirish yoki kerak bo'lmagan kodni vaqtincha to'xtatib turish mumkin.

Keyingi darsda: Ma'lumotlarni xotirada saqlash uchun o'zgaruvchilar (\`let\`) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Bir qatorli sharh",
      instruction: "`console.log(\"Salom\");` qatori tepasiga `// Salomlashuv` sharhini yozing.",
      startingCode: "console.log(\"Salom\");\n",
      hint: "// Salomlashuv\nconsole.log(\"Salom\");",
      test: "if (!code.includes('//')) return '// bir qatorli sharh yozilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'console.log(\"Salom\") ishlashi kerak';"
    },
    {
      id: 2,
      title: "Ko'p qatorli sharh",
      instruction: "`/*` va `*/` belgilaridan foydalanib ko'p qatorli sharh yozing va pastida `console.log(\"Tayyor\");` qoldiring.",
      startingCode: "/* \n  Bu yerga izoh yozing\n*/\nconsole.log(\"Tayyor\");\n",
      hint: "/* Izoh */\nconsole.log(\"Tayyor\");",
      test: "if (!code.includes('/*') || !code.includes('*/')) return '/* */ ko\\'p qatorli sharh ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Tayyor'))) return null;\nreturn 'console.log(\"Tayyor\") ishlashi kerak';"
    },
    {
      id: 3,
      title: "Kodni sharh bilan o'chirish",
      instruction: "Quyidagi `console.log(100);` qatorini `//` bilan sharhga aylantiring, toki u ishlamasin (ekranga 100 chiqmasin).",
      startingCode: "console.log(100);\n",
      hint: "// console.log(100);",
      test: "if (!code.includes('//') && !code.includes('/*')) return 'Sharh belgisi (//) qo\\'yilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'console.log hali ham ishlayapti — uni // bilan sharhga aylantiring';"
    },
    {
      "id": 4,
      "title": "Qatorli sharh yozish",
      "instruction": "Kodning boshiga `// Bugun birinchi darsim` deb bitta qatorli sharh yozing.",
      "startingCode": "// Sharhni shu yerga yozing\nconsole.log(\"Salom\");\n",
      "hint": "// belgisidan keyin sharh matni keladi.",
      "test": "const first = code.split('\\n').find(l => l.trim().startsWith('//'));\nif (!first) return 'Qatorli sharh (//) topilmadi';\nif (!first.includes('Bugun birinchi darsim')) return 'Sharih matni \"Bugun birinchi darsim\" bo\\'lishi kerak';\nreturn null;"
    },
    {
      "id": 5,
      "title": "Ko'p qatorli sharh",
      "instruction": "Ikki qatordan iborat ko'p qatorli sharh yozing: birinchisida `Birinchi qator`, ikkinchisida `Ikkinchi qator`.",
      "startingCode": "// Ko'p qatorli sharni shu yerga yozing\n",
      "hint": "/* bilan ochib, */ bilan yoping.",
      "test": "if (!/\\/\\*[\\s\\S]*\\*\\//.test(code)) return 'Ko\\'p qatorli sharh (/* ... */) topilmadi';\nif (!code.includes('Birinchi qator') || !code.includes('Ikkinchi qator')) return 'Ikkala qator ham sharhda bo\\'lishi kerak';\nreturn null;"
    },
    {
      "id": 6,
      "title": "Xatoni sharhga aylantirish",
      "instruction": "`console.log(test);` qatorida xato bor (qo'shtirnoqsiz matn). Bu qatorni sharhga aylantiring — kod ishlashi kerak.",
      "startingCode": "console.log(test);\nconsole.log(\"Tayyor\");\n",
      "hint": "Birinchi qator boshiga // qo'shing.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Tayyor'))) return null;\nreturn 'Kod ishlashi kerak edi (Tayyor chiqishi kerak)';"
    },
    {
      "id": 7,
      "title": "Funksiya uchun sharh",
      "instruction": "`function greet() {}` qatoridan oldin bitta qatorli sharh yozing: `Salomlashuv funksiyasi`.",
      "startingCode": "// Sharh shu yerga\nfunction greet() {\n  return \"Salom\";\n}\n",
      "hint": "// Salomlashuv funksiyasi",
      "test": "const lines = code.split('\\n');\nconst fi = lines.findIndex(l => l.includes('function greet'));\nif (fi === -1) return 'function greet topilmadi';\nconst prev = lines.slice(0, fi).reverse().find(l => l.trim().length > 0);\nif (!prev || !prev.trim().startsWith('//')) return 'function dan oldin qatorli sharh (//) bo\\'lishi kerak';\nif (!prev.includes('Salomlashuv funksiyasi')) return 'Sharh matni \"Salomlashuv funksiyasi\" bo\\'lishi kerak';\nreturn null;"
    },
    {
      "id": 8,
      "title": "Noma'lum qatorni sharhlab qoldirish",
      "instruction": "Kod ichidagi `let unused = 5;` qatorini sharhga aylantiring (kodni o'chirmasdan, faqat sharh qiling).",
      "startingCode": "let used = 10;\nlet unused = 5;\nconsole.log(used);\n",
      "hint": "let unused = 5; qatorini // bilan boshlang.",
      "test": "if (!/^\\s*\\/\\/\\s*let unused = 5/m.test(code)) return 'let unused = 5 qatori sharhlangan bo\\'lishi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '10')) return null;\nreturn 'console.log(used) 10 chiqishi kerak';"
    },
    {
      "id": 9,
      "title": "Qaysi biri sharh ekanini topish",
      "instruction": "Ikki qatorda ham `//` bilan sharh yozing: birinchisida `Birinchi sharh`, ikkinchisida `Ikkinchi sharh`. Ikkalasi ham ishlashi kerak.",
      "startingCode": "// Ikkala qatorni ham sharh qiling\nlet a = 1;\nlet b = 2;\n",
      "hint": "let a va let b qatorlarini // bilan boshlang.",
      "test": "if (!/^\\s*\\/\\/\\s*let a = 1/m.test(code)) return 'let a = 1 sharhlangan bo\\'lishi kerak';\nif (!/^\\s*\\/\\/\\s*let b = 2/m.test(code)) return 'let b = 2 sharhlangan bo\\'lishi kerak';\nif (!code.includes('Birinchi sharh') || !code.includes('Ikkinchi sharh')) return 'Ikkita sharh matni ham yozilishi kerak';\nreturn null;"
    },
    {
      "id": 10,
      "title": "Sharh ichidagi kod ishlamaydi (chegara)",
      "instruction": "`console.log(\"Bir\");` qatorini ko'p qatorli sharh ichiga oling. Konsolga hech narsa chiqmasin — barchasi sharh bo'lsin.",
      "startingCode": "console.log(\"Bir\");\n",
      "hint": "Qatorni /* va */ orasiga oling.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length > 0) return 'Hech narsa chiqmasligi kerak — kod sharh ichida';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da bir qatorli sharh qaysi belgi bilan yoziladi?",
      options: [
        "/*",
        "//",
        "#",
        "--"
      ],
      correctAnswer: 1,
      explanation: "// belgisi bir qatorli sharhni bildiradi va undan keyingi matn kompyuter tomonidan bajarilmaydi."
    },
    {
      id: 2,
      question: "Ko'p qatorli sharh qanday belgilar orasida yoziladi?",
      options: [
        "<!-- va -->",
        "/* va */",
        "// va //",
        "{ va }"
      ],
      correctAnswer: 1,
      explanation: "/* bilan boshlanib, */ bilan tugaydigan sharh ko'p qatorli sharh hisoblanadi."
    },
    {
      id: 3,
      question: "Quyidagi kod ishga tushsa nima sodir bo'ladi?\n```javascript\n// console.log(\"Salom\");\nconsole.log(42);\n```",
      options: [
        "Ekranga faqat \"Salom\" chiqadi",
        "Ekranga faqat 42 chiqadi",
        "Ekranga \"Salom\" va 42 chiqadi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "// bilan yozilgan qator sharh bo'lgani uchun kompyuter uni bajarmaydi, faqat console.log(42) bajariladi."
    },
    {
      "id": 4,
      "question": "Bitta qatorli sharh qaysi belgi bilan boshlanadi?",
      "options": [
        "#",
        "//",
        "/*",
        "--"
      ],
      "correctAnswer": 1,
      "explanation": "Ikki qoshlash (//) dan keyin kelgan matn shu qatorning oxirigacha sharh bo'lib hisoblanadi."
    },
    {
      "id": 5,
      "question": "Ko'p qatorli sharh qaysi belgilar bilan yopiladi?",
      "options": [
        "*/",
        "//",
        "**",
        "]]"
      ],
      "correctAnswer": 0,
      "explanation": "Ko'p qatorli sharh /* bilan ochiladi va */ bilan yopiladi."
    },
    {
      "id": 6,
      "question": "Brauzer yoki Node.js sharhlarni bajaradimi?",
      "options": [
        "Ha, birinchi bajaradi",
        "Yo'q, ular e'tiborsiz o'tkaziladi",
        "Faqat xato bo'lsa bajaradi",
        "Faqat birinchi sharh bajariladi"
      ],
      "correctAnswer": 1,
      "explanation": "Sharhlar kod emas, izoh. Interpreter ularni o'qiydi, lekin bajarmaydi — dasturga ta'siri yo'q."
    },
    {
      "id": 7,
      "question": "Quyidagi kodning natijasi nima?  // console.log(\"Salom\");\nconsole.log(\"Tayyor\");",
      "options": [
        "Salom va Tayyor",
        "Faqat Tayyor",
        "Faqat Salom",
        "Hech narsa"
      ],
      "correctAnswer": 1,
      "explanation": "Birinchi qator sharh — bajarilmaydi. Faqat ikkinchi qator, ya'ni Tayyor chiqadi."
    },
    {
      "id": 8,
      "question": "Sharh yozishning asosiy maqsadi nima?",
      "options": [
        "Kodni tezlashtirish",
        "Kodni o'zimiz va boshqalar uchun tushunarli qilish",
        "Xatolarni avtomatik tuzatish",
        "Kodni yashirish"
      ],
      "correctAnswer": 1,
      "explanation": "Sharh kodning nima qilishini tushuntiradi. Keyinroq kodni o'qiganda maqsad aniq bo'ladi."
    },
    {
      "id": 9,
      "question": "Sharh ichida boshqa sharh yozsa bo'ladimi?",
      "options": [
        "Ha, cheksiz darajada",
        "Yo'q, // ichida /* emas, // qatorning oxirigacha bo'lgan matnning o'zi sharh",
        "Faqat */ bilan",
        "Faqat HTML da"
      ],
      "correctAnswer": 1,
      "explanation": "Qatorli sharh ichida qaysi belgi bo'lishidan qat'i nazar, qatorning oxirigacha hammasi sharh bo'lib qoladi."
    },
    {
      "id": 10,
      "question": "/* ochilgan, lekin */ yozilmagan bo'lsa nima bo'ladi?",
      "options": [
        "Hech narsa",
        "Sharh keyingi */ gacha davom etadi va kod ham sharhga aylanadi — xatolar paydo bo'ladi",
        "Kod o'chiriladi",
        "Brauzer qayta yuklanadi"
      ],
      "correctAnswer": 1,
      "explanation": "Yopilmagan sharh kodning qolgan qismini ham ichiga oladi, bu esa kutilmagan xatolarga olib keladi."
    },
    {
      "id": 11,
      "question": "JavaScript da yana qanday sharh turi bor?",
      "options": [
        "Faqat qatorli",
        "Faqat ko'p qatorli",
        "Qatorli (//) va ko'p qatorli (/* ... */)",
        "Sharh turi yo'q"
      ],
      "correctAnswer": 2,
      "explanation": "Ikki xil bor: qatorli // va ko'p qatorli /* ... */. Ikkalasi ham bir xil maqsadda ishlatiladi."
    },
    {
      "id": 12,
      "question": "Kodni vaqtincha o'chirish (lekin o'chirmasdan) uchun eng qulay usul qaysi?",
      "options": [
        "Qatorni butunlay o'chirish",
        "Qatorni // bilan sharhlash",
        "Faylni o'chirish",
        "console.log qo'shish"
      ],
      "correctAnswer": 1,
      "explanation": "Sharhlash — qatorni saqlab turib, ishlamay qoldirish. Kerak bo'lganda // ni olib tashlab, qayta yoqish oson."
    }
  ]
};

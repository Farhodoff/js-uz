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
    }
  ]
};

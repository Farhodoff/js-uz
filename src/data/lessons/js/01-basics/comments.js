export const commentsLesson = {
  id: "commentsLesson",
  title: "Sharhlar (Comments)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Izoh (comment) nima?
**Izoh** — kompyuter o'qimaydigan, faqat ODAM o'qiydigan qatorlar. Kodni tushuntirish uchun yoziladi.

\`\`\`javascript
// Bu izoh — JavaScript uni butunlay e'tiborsiz qoldiradi
let yosh = 25;  // bu ham izoh (qator oxirida)
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **kitob o'qiyapsiz**:
- **Asosiy matn** — bu kod (kompyuter o'qiydi va bajaradi)
- **Chetdagi qalam izohlar** (marginalia) — bu izohlar (faqat odam o'qiydi)

Kitobni chop etishda chetdagi yozuvlar matnga aralashmaydi. Xuddi shunday: izoh kodga aralashmaydi, kompyuter uni ko'rmaydi.

---

## 2. 💻 Ikki Xil Izoh

### 1. Bir qatorli — \`//\`
Qator boshidan (yoki o'rtasidan) oxirigacha izoh:

\`\`\`javascript
// Bu qator butunlay izoh
let narx = 100;  // mahsulot narxi so'mda
// let narx = 200;  ← bu kod O'CHIRILGAN (izohga aylantirilgan)
\`\`\`

### 2. Ko'p qatorli — \`/* ... */\`
Bir nechta qatorni qamrab oladi:

\`\`\`javascript
/*
  Bu kalkulyator funksiyasi.
  Muallif: Ali
  Sana: 2025-01-15
  Vazifa: ikki sonni qo'shish
*/
function qoshish(a, b) {
  return a + b;
}
\`\`\`

\`\`\`mermaid
flowchart LR
    A["Izoh turi"] --> B["// bir qator"]
    A --> C["/* ko'p qator */"]
    B --> D["Kompyuter ko'rmaydi"]
    C --> D
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

JavaScript kodi avval **o'qiladi** (parsing). Shu bosqichda izohlar **butunlay olib tashlanadi** — xuddi qoralama qog'ozdan ortiqcha chizmalarni o'chirgandek.

Shuning uchun:
- Izoh **xotira egallamaydi**
- Izoh dastur **tezligiga ta'sir qilmaydi**
- Izoh **xatoga olib kelmaydi** (agar to'g'ri yopilgan bo'lsa)

### Izoh bilan kodni "o'chirish"
Kodni o'chirmasdan vaqtincha to'xtatish uchun izohga aylantiriladi:

\`\`\`javascript
let natija = 10 + 5;
// console.log("Test");     ← vaqtincha o'chirildi
console.log(natija);
\`\`\`

Bu **debugging** (xato qidirish) da juda qulay.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`/* izoh\` (yopilmagan) | \`/* izoh */\` | Yopilmagan izoh — KEYINGI KODNI ham yutib yuboradi! |
| Izohni kod ichiga "yashirish" | Izohni alohida yoki qator oxirida | Kod o'qilishi qiyinlashadi |
| Har qatorga izoh yozish | Faqat kerak joyda | Ortiqcha izoh — shovqin |
| Izohni yangilamaslik (kod o'zgardi, izoh eski) | Izohni kod bilan birga yangilash | Eski izoh — YOLG'ON ma'lumot beradi |
| \`//\` va \`/*\` ni string ichida chalkashtirish | \`"http://sayt.uz"\` — bu string, izoh emas! | Qo'shtirnoq ichidagisi izoh emas |

### Eng xavfli xato
\`\`\`javascript
/* bu izohni yopishni unutdim
let muhim = 42;
console.log("bu ishlamaydi!");   // ❌ Hammasi izoh bo'lib qoldi
\`\`\`

---

## 5. 🔑 Asosiy Atamalar

- **Comment (izoh)** — kompyuter o'qimaydigan tushuntirish matni
- **\`//\`** — bir qatorli izoh
- **\`/* */\`** — ko'p qatorli izoh
- **Self-documenting code** — izohsiz ham tushunarli kod (eng yaxshi usul!)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Jamoa ishi:** boshqa dasturchi kodni tushunishi uchun
- **Kelajakdagi o'zingiz:** 6 oydan keyin yozgan kodingizni eslamaysiz!
- **Debugging:** kodni vaqtincha o'chirish
- **Hujjatlashtirish:** funksiya nima qilishini yozish

### Qachon izoh YOZILADI?
✅ **Murakkab mantiq** — "nima uchun" shunday qilinganini tushuntirish
✅ **Ogohlantirish** — \`// DIQQAT: bu qiymatni o'zgartirmang\`
✅ **TODO** — \`// TODO: keyin optimallashtirish kerak\`

### Qachon izoh YOZILMAYDI?
❌ **Aniq kod uchun:**
\`\`\`javascript
// ❌ YOMON — kodning o'zi aytib turibdi
let yosh = 25;  // yoshni 25 ga tengladik

// ✅ YAXSHI — sabab tushuntirilgan
let yosh = 25;  // Xizmat shartnomasi bo'yicha minimal yosh
\`\`\`

> **Oltin qoida:** Yaxshi kod — o'zini o'zi tushuntiradi. Izoh faqat "NIMA" emas, "NIMA UCHUN" ni yozsin.

---

## 7. 🎙 Intervyu Savollari

**1. JavaScript izohlarni qanday ko'radi?**
**Javob:** Umuman ko'rmaydi — parsing bosqichida olib tashlanadi, tezlikka ta'sir qilmaydi.

**2. Izoh qachon zararli bo'ladi?**
**Javob:** Kod o'zgarganda izoh yangilanmasa — eski izoh yolg'on ma'lumot beradi.

**3. Yaxshi kodni izohdan ajratib turuvchi nima?**
**Javob:** Yaxshi kod o'zini o'zi tushuntiradi (ma'noli nomlar, kichik funksiyalar); izoh faqat "nima uchun" ni qo'shadi.

---

## 8. ✅ Xulosa

- **\`//\`** — bir qatorli, **\`/* */\`** — ko'p qatorli izoh
- Kompyuter izohni **o'qimaydi** — tezlikka ta'siri yo'q
- **\`/*\` ni yopishni unutmang** — aks holda keyingi kod ham izoh bo'ladi!
- Izoh **"nima uchun"** ni yozsin, "nima" ni emas
- **Keyingi qadam:** 1.3-darsda ma'lumot saqlash — console metodlari va DevTools
`,
exercises: [
    {
      id: 1,
      title: "Bir qatorli izoh",
      instruction: "`let yosh = 25;` qatorining yoniga `// foydalanuvchi yoshi` izohini yozing. Kod ishlamoqda bo'lishi kerak.",
      startingCode: "let yosh = 25;\n// izoh qo'shing\n",
      hint: "let yosh = 25; // foydalanuvchi yoshi",
      test: "if (!code.includes('//')) return '// izoh qo\\'shilmadi';\ntry { const v = new Function(code + '\\nreturn (typeof yosh !== \"undefined\" ? yosh : null);')();\nif (v === 25) return null;\nreturn 'yosh = 25 bo\\'lishi kerak'; } catch (e) { return 'Xato: ' + e.message; }"
    },
    {
      id: 2,
      title: "Ko'p qatorli izoh",
      instruction: "Ikki qatorlik izoh yozing: `/*` bilan ochilib, `*/` bilan yopilsin. Ichida o'z ismingizni yozing.",
      startingCode: "/* \n  Bu mening birinchi izohim\n*/\nlet x = 10;\n",
      hint: "/* ismim Ali */ ko'rinishida",
      test: "if (!code.includes('/*') || !code.includes('*/')) return '/* */ ko\\'p qatorli izoh kerak';\nconst v = new Function(code + '; return x;')();\nif (v === 10) return null;\nreturn 'x = 10 bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Kodni izoh bilan o'chirish",
      instruction: "`let a = 5;` yozing, keyingi qatorda `console.log(a);` ni IZOH bilan o'chiring (ishlamasligi kerak).",
      startingCode: "let a = 5;\n// quyidagi qatorni izoh qiling\nconsole.log(a);\n",
      hint: "// console.log(a); qilib izohga aylantiring",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'console.log hali ham ishlayapti — izoh bilan o\\'chiring';"
    },
    {
      id: 4,
      title: "Sababni tushuntirish",
      instruction: "`chegirma` o'zgaruvchisini yarating (qiymati 15) va NEGA aynan 15 ekanini izoh bilan yozing.",
      startingCode: "// Izoh yozing\nlet chegirma = 15;\n",
      hint: "let chegirma = 15; // do'kon bayram aksiyasi",
      test: "if (!code.includes('//')) return 'Izoh kerak';\ntry { const v = new Function(code + '\\nreturn (typeof chegirma !== \"undefined\" ? chegirma : null);')();\nif (v === 15) return null;\nreturn 'chegirma = 15 bo\\'lishi kerak'; } catch (e) { return 'Xato: ' + e.message; }"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "Qaysi belgi bir qatorli izoh?",
      options: [
        "/*",
        "//",
        "''",
        "#"
      ],
      correctAnswer: 1,
      explanation: "// qator oxirigacha izoh qiladi."
    },
    {
      id: 2,
      question: "Ko'p qatorli izoh qanday yoziladi?",
      options: [
        "// ... //",
        "/* ... */",
        "<!-- ... -->",
        "# ... #"
      ],
      correctAnswer: 1,
      explanation: "/* bilan ochiladi, */ bilan yopiladi."
    },
    {
      id: 3,
      question: "Izoh kompyuterga qanday ta'sir qiladi?",
      options: [
        "Dasturni sekinlashtiradi",
        "Umuman ta'sir qilmaydi — parsingda olib tashlanadi",
        "Xatolik beradi",
        "Tezlashtiradi"
      ],
      correctAnswer: 1,
      explanation: "Kompyuter izohni ko'rmaydi."
    },
    {
      id: 4,
      question: "Yopilmagan `/*` izohi nima qiladi?",
      options: [
        "Hech narsa",
        "Keyingi KODNI ham izohga aylantiradi",
        "Faqat shu qatorni izohlaydi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "*/ topilmaguncha hammasi izoh bo'ladi!"
    },
    {
      id: 5,
      question: "Yaxshi izoh nimani yozadi?",
      options: [
        "Nima bo'lyapti (kodning o'zi aytadi)",
        "NIMA UCHUN shunday qilinganini (sababni)",
        "Har qatorni",
        "Muallif ismini"
      ],
      correctAnswer: 1,
      explanation: "Yaxshi izoh sababni tushuntiradi, kodni emas."
    }
  ]
};

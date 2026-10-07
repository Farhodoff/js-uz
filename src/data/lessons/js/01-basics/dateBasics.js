export const dateBasics = {
  id: "dateBasics",
  title: "Global Obyektlar: Date (Sana Yaratish va O'qish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Devorga osilgan taqvim va soatni tasavvur qiling: siz unga qarab ayni damda qaysi yil, qaysi oy va qaysi kun ekanligini bir qarashda bilib olasiz. Yoki taqvimga qarab kelajakdagi muhim sana (masalan, tug'ilgan kuningiz) qachon bo'lishini belgilab qo'yasiz.

JavaScript da **Date** obyekti xuddi shu taqvim va soat vazifasini bajaradi: u orqali ayni paytdagi vaqtni bilish yoki aniq bir sanani yaratib, undan yil, oy, kun ma'lumotlarini o'qib olish mumkin.

**Date obyekti** — JavaScript da sana va vaqt bilan ishlash, ayni paytdagi yoki belgilangan vaqt ma'lumotlarini o'qish uchun mo'ljallangan global o'rnatilgan obyektdir.

*Yangi metodlar:*
- **new Date()** — joriy (ayni damdagi) sana va vaqt obyektini yaratadi.
- **getFullYear()** — 4 xonali yilni qaytaradi (masalan: 2026).
- **getMonth()** — oyni qaytaradi (diqqat: \`0\` dan \`11\` gacha! \`0\` = Yanvar, \`1\` = Fevral...).
- **getDate()** — oyning kunini qaytaradi (\`1\` dan \`31\` gacha).

---

## 2. Nega kerak?

Saytlarda postlar qachon yozilganini ko'rsatish ("21-sentyabr, 2026"), foydalanuvchining yoshini hisoblash, to'lov amalga oshirilgan vaqtni qayd etish uchun vaqt ma'lumotlari nihoyatda zarur.

\`Date\` yordamida bitta qator kod bilan kompyuterning ayni vaqtdagi soatini olamiz va uning alohida bo'laklarini (yil, oy, kun) osongina ajratib ishlatamiz.

---

## 3. Birinchi misol

Bu kod joriy sana obyektini yaratadi va undan yil, oy, kunni alohida ajratib o'qiydi.

\`\`\`javascript
const now = new Date(); // joriy sana va vaqt

console.log(now.getFullYear()); // joriy yil (masalan: 2026)
console.log(now.getMonth()); // joriy oy (0 dan 11 gacha)
console.log(now.getDate()); // joriy oyning kuni (1 dan 31 gacha)
\`\`\`

\`\`\`text
// Natija (joriy sanaga qarab):
2026
8
21
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const now = new Date();\` — \`new Date()\` yordamida kompyuterning hozirgi paytdagi vaqtini o'zida saqlagan yangi obyekt yaratildi.
- \`now.getFullYear();\` — to'rt xonali yilni raqam sifatida qaytaradi (masalan, \`2026\`).
- \`now.getMonth();\` — JavaScript da oylar \`0\` dan boshlanadi! \`0\` — Yanvar, \`1\` — Fevral, \`8\` — Sentyabr, \`11\` — Dekabr. Shuning uchun odatiy oy raqami kerak bo'lsa, \`now.getMonth() + 1\` deb yoziladi.
- \`now.getDate();\` — oyning aynan nechanchi kuni ekanligini (\`1\` dan \`31\` gacha) qaytaradi.

---

## 5. Qadamma-qadam (solishtirish jadvali)

Sana metodlarining qaytaradigan qiymatlari:

| Metod | Nima qaytaradi? | Qiymat oralig'i | Misol |
|---|---|---|---|
| \`getFullYear()\` | 4 xonali yil | 1970, 2026... | \`2026\` |
| \`getMonth()\` | Oy tartib raqami (**0 dan boshlanadi!**) | \`0\` dan \`11\` gacha | \`8\` (Sentyabr) |
| \`getDate()\` | Oyning kuni | \`1\` dan \`31\` gacha | \`21\` |

---

## 6. Yana bitta misol

1-misoldan farqi: Joriy vaqt emas, **aniq bir sanani** ko'rsatib yaratish (\`"YYYY-MM-DD"\` formati).

\`\`\`javascript
const birthday = new Date("2000-05-15"); // 2000-yil 15-may

console.log(birthday.getFullYear()); // 2000
console.log(birthday.getMonth()); // 4 (0 dan boshlangani uchun May = 4)
console.log(birthday.getDate()); // 15
\`\`\`

\`\`\`text
// Natija:
2000
4
15
\`\`\`

Tahlil:
- Qavs ichiga satr ko'rinishida sana berilsa, aynan o'sha kun uchun sana obyekti hosil bo'ladi.
- May oyi 5-oy bo'lsa ham, \`0\` dan boshlangani uchun \`getMonth()\` bizga \`4\` ni qaytardi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Oylarni 1 dan boshlanadi deb o'ylash

\`\`\`javascript
const d = new Date("2026-01-15"); // 15-yanvar
console.log(d.getMonth()); // 0 (1 emas!)
\`\`\`

**Nima bo'ladi:** JavaScript oylarni \`0\` dan (\`0\` = Yanvar) hisoblaydi.
**To'g'ri varianti:** Odatdagi 1-12 oylarni ko'rsatish uchun doimo \`+ 1\` qo'shing: \`d.getMonth() + 1\`.

### 2-xato: getYear() va getFullYear() ni adashtirish

\`\`\`javascript
const now = new Date();
console.log(now.getYear()); // XATO: 126 (eskirgan va noto'g'ri metod)
\`\`\`

**Nima bo'ladi:** \`getYear()\` 1900-yildan keyingi yillarni hisoblaydigan juda eski metod.
**To'g'ri varianti:** Har doim \`now.getFullYear()\` metodidan foydalaning.

### 3-xato: new so'zini yozmasdan chaqirish

\`\`\`javascript
const d = Date(); // XATO: new yozilmadi
console.log(typeof d); // "string"
console.log(d.getFullYear()); // TypeError: d.getFullYear is not a function
\`\`\`

**Nima bo'ladi:** \`new\` qo'yilmasa, u obyekt emas, oddiy matn (string) qaytaradi va unda metodlar ishlamaydi.
**To'g'ri varianti:** Har doim \`new Date()\` deb yozing.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`today = new Date("2025-12-31")\` sanasi berilgan. \`getFullYear()\` yordamida uning yilini konsolga chiqaring (\`2025\`).

### 2-mashq (o'rtacha)
\`date = new Date("2024-03-25")\` sanasi berilgan. Uning oyini o'qib (\`getMonth()\`), unga \`1\` qo'shgan holda (haqiqiy oy raqamini) konsolga chiqaring (\`3\`).

### 3-mashq (chegara holat)
\`eventDate = new Date("2030-01-01")\` (1-yanvar) berilgan. Uning oyi \`0\` ga teng ekanligini tekshirib (\`eventDate.getMonth() === 0\`), natijani konsolga chiqaring (\`true\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const today = new Date("2025-12-31");

console.log(today.getFullYear()); // 2025
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const date = new Date("2024-03-25");

console.log(date.getMonth() + 1); // 3
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const eventDate = new Date("2030-01-01");

console.log(eventDate.getMonth() === 0); // true
\`\`\`

---

## 9. Xulosa

1. \`new Date()\` — joriy vaqt yoki ko'rsatilgan sana uchun yangi sana obyekti yaratadi.
2. Yilni olish uchun \`getFullYear()\`, oyning kunini olish uchun \`getDate()\` ishlatiladi.
3. JavaScript da oylar doimo \`0\` dan boshlanadi (\`0\` — Yanvar, \`11\` — Dekabr).

Keyingi darsda: Global obyektlar — takrorlanmas qiymatlar to'plami bo'lgan \`Set\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Yilni aniqlash",
      instruction: "`today = new Date(\"2025-12-31\")` sanasi berilgan. `getFullYear()` yordamida uning yilini konsolga chiqaring.",
      startingCode: "const today = new Date(\"2025-12-31\");\n// getFullYear orqali yilni konsolga chiqaring\n",
      hint: "console.log(today.getFullYear());",
      test: "if (!code.includes('getFullYear')) return 'getFullYear ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('2025')) return null;\nreturn '2025 yili konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Oyni hisoblash",
      instruction: "`date = new Date(\"2024-03-25\")` sanasi berilgan. Uning oyini o'qib, `1` qo'shgan holda (haqiqiy oy raqami 3) konsolga chiqaring.",
      startingCode: "const date = new Date(\"2024-03-25\");\n// getMonth() ga 1 qo'shib konsolga chiqaring\n",
      hint: "console.log(date.getMonth() + 1);",
      test: "if (!code.includes('getMonth')) return 'getMonth ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('3')) return null;\nreturn '3 soni (Mart oyi) konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Yanvar oyining indeksi",
      instruction: "`eventDate = new Date(\"2030-01-01\")` berilgan. Uning oyi `0` ga tengligini (`eventDate.getMonth() === 0`) tekshirib chiqaring.",
      startingCode: "const eventDate = new Date(\"2030-01-01\");\n// eventDate.getMonth() === 0 ekanligini tekshirib konsolga chiqaring\n",
      hint: "console.log(eventDate.getMonth() === 0);",
      test: "if (!code.includes('getMonth')) return 'getMonth ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('true')) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "Oyning kunini aniqlash",
      "instruction": "`const d = new Date(\"2024-05-17\");` sanasining kunini (`getDate()`) konsolga chiqaring (`17`).",
      "startingCode": "const d = new Date(\"2024-05-17\");\n// getDate orqali kunni chiqaring\n",
      "hint": "const d = new Date(\"2024-05-17\");\nconsole.log(d.getDate());",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"getDate\")) return \"getDate ishlatilmadi\";\nif (out.some((m) => m.trim() === \"17\")) return null;\nreturn \"Kun 17 konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Soatni aniqlash",
      "instruction": "`const d = new Date(\"2024-05-17T14:30:00\");` sanasining soatini (`getHours()`) konsolga chiqaring (`14`).",
      "startingCode": "const d = new Date(\"2024-05-17T14:30:00\");\n// getHours orqali soatni chiqaring\n",
      "hint": "const d = new Date(\"2024-05-17T14:30:00\");\nconsole.log(d.getHours());",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"getHours\")) return \"getHours ishlatilmadi\";\nif (out.some((m) => m.trim() === \"14\")) return null;\nreturn \"Soat 14 konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "Ikki sana orasidagi kunlar farqi",
      "instruction": "`const start = new Date(\"2024-01-01\");` va `const end = new Date(\"2024-01-11\");` orasidagi kunlar farqini hisoblab, konsolga chiqaring (`10`).",
      "startingCode": "const start = new Date(\"2024-01-01\");\nconst end = new Date(\"2024-01-11\");\n// farqni kunlarda hisoblab chiqaring\n",
      "hint": "const start = new Date(\"2024-01-01\");\nconst end = new Date(\"2024-01-11\");\nconst days = (end - start) / (1000 * 60 * 60 * 24);\nconsole.log(days);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"getTime\") && !code.includes(\"-\")) return \"Sanalar ayirilmadi\";\nif (out.some((m) => m.trim() === \"10\")) return null;\nreturn \"Kunlar farqi 10 konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "getMonth 0 dan boshlanishi",
      "instruction": "`const d = new Date(\"2024-03-15\");` da `getMonth()` `2` qaytaradi. Haqiqiy oy raqamini (`3`) konsolga chiqaring.",
      "startingCode": "const d = new Date(\"2024-03-15\");\n// getMonth ga 1 qo'shib haqiqiy oyni chiqaring\n",
      "hint": "const d = new Date(\"2024-03-15\");\nconsole.log(d.getMonth() + 1);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"getMonth\")) return \"getMonth ishlatilmadi\";\nif (out.some((m) => m.trim() === \"3\")) return null;\nreturn \"Haqiqiy oy 3 konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "Sanani qo'lda formatlash",
      "instruction": "`const d = new Date(\"2024-01-01\");` dan foydalanib, `\"2024-1-1\"` ko'rinishidagi matnni konsolga chiqaring (`yil-oy-kun`).",
      "startingCode": "const d = new Date(\"2024-01-01\");\n// \"2024-1-1\" ko'rinishida chiqaring\n",
      "hint": "const d = new Date(\"2024-01-01\");\nconsole.log(d.getFullYear() + \"-\" + (d.getMonth() + 1) + \"-\" + d.getDate());",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"getFullYear\")) return \"getFullYear ishlatilmadi\";\nif (out.some((m) => m.includes(\"2024-1-1\"))) return null;\nreturn \"2024-1-1 matni konsolga chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Yoshni hisoblash",
      "instruction": "`const birth = new Date(\"2000-01-01\");` va `const now = new Date(\"2025-01-01\");` berilgan. Farqdan yoshni (yillarda) hisoblab, konsolga chiqaring (`25`).",
      "startingCode": "const birth = new Date(\"2000-01-01\");\nconst now = new Date(\"2025-01-01\");\n// yoshni yillarda hisoblab chiqaring\n",
      "hint": "const birth = new Date(\"2000-01-01\");\nconst now = new Date(\"2025-01-01\");\nconst years = (now - birth) / (1000 * 60 * 60 * 24 * 365);\nconsole.log(Math.round(years));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"25\")) return null;\nreturn \"Yosh 25 konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Kun qo'shish va yil o'zgarishi (chegara)",
      "instruction": "`const d = new Date(\"2024-12-31\");` ga `1` kun qo'shib (`setDate(getDate() + 1)`), yangi yilni (`2025`) konsolga chiqaring.",
      "startingCode": "const d = new Date(\"2024-12-31\");\n// kunni 1 ga oshirib, yangi yilni chiqaring\n",
      "hint": "const d = new Date(\"2024-12-31\");\nd.setDate(d.getDate() + 1);\nconsole.log(d.getFullYear());",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"setDate\")) return \"setDate ishlatilmadi\";\nif (out.some((m) => m.trim() === \"2025\")) return null;\nreturn \"Yangi yil 2025 konsolga chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript da getMonth() metodi Yanvar oyi uchun qanday son qaytaradi?",
      options: [
        "0",
        "1",
        "-1",
        "12"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da oylar 0 dan boshlanadi: Yanvar = 0, Fevral = 1 va hokazo."
    },
    {
      id: 2,
      question: "To'rt xonali yilni olish uchun qaysi metod to'g'ri hisoblanadi?",
      options: [
        "getFullYear()",
        "getYear()",
        "getDate()",
        "getCalendarYear()"
      ],
      correctAnswer: 0,
      explanation: "To'rt xonali yilni olish uchun har doim getFullYear() metodi ishlatiladi. getYear() eskirgan va noto'g'ri ishlaydi."
    },
    {
      id: 3,
      question: "Oyning aynan qaysi kuni ekanligini (1 dan 31 gacha) aniqlash uchun qaysi metod ishlatiladi?",
      options: [
        "getDate()",
        "getDay()",
        "getMonthDay()",
        "getTime()"
      ],
      correctAnswer: 0,
      explanation: "getDate() oyning sanasini (1-31) qaytaradi. getDay() esa haftaning kunini (0-6) qaytaradi."
    },
    {
      "id": 4,
      "question": "`getMonth()` Yanvar uchun qanday son qaytaradi?",
      "options": [
        "0",
        "1",
        "-1",
        "12"
      ],
      "correctAnswer": 0,
      "explanation": "Oylar 0 dan boshlanadi: Yanvar = 0, Dekabr = 11."
    },
    {
      "id": 5,
      "question": "To'rt xonali yilni olish uchun qaysi metod ishlatiladi?",
      "options": [
        "getFullYear()",
        "getYear()",
        "getDate()",
        "getCalendarYear()"
      ],
      "correctAnswer": 0,
      "explanation": "getFullYear() to'rt xonali yilni qaytaradi; getYear() eskirgan."
    },
    {
      "id": 6,
      "question": "Oyning kunini (1 dan 31 gacha) qaysi metod beradi?",
      "options": [
        "getDate()",
        "getDay()",
        "getMonthDay()",
        "getTime()"
      ],
      "correctAnswer": 0,
      "explanation": "getDate() oyning kunini qaytaradi; getDay() esa hafta kunini beradi."
    },
    {
      "id": 7,
      "question": "`new Date()` argumentsiz chaqirilsa nima qaytaradi?",
      "options": [
        "Hozirgi sana va vaqt",
        "1970-yil 1-yanvar",
        "undefined",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "new Date() argumentsiz hozirgi sana-vaqtni oladi."
    },
    {
      "id": 8,
      "question": "`new Date(\"2024-06-15\").getMonth()` nima qaytaradi?",
      "options": [
        "5",
        "6",
        "15",
        "2024"
      ],
      "correctAnswer": 0,
      "explanation": "Iyun — 5-indeks (0 dan hisoblanganda): Yanvar=0, Iyun=5."
    },
    {
      "id": 9,
      "question": "`getHours()` qanday oraliqda qiymat qaytaradi?",
      "options": [
        "0 dan 23 gacha",
        "1 dan 24 gacha",
        "0 dan 12 gacha",
        "0 dan 60 gacha"
      ],
      "correctAnswer": 0,
      "explanation": "getHours() 0 dan 23 gacha soatni qaytaradi."
    },
    {
      "id": 10,
      "question": "Ikki `Date` ni bir-biridan ayirsak natija qanday birlikda bo'ladi?",
      "options": [
        "Millisekund",
        "Kun",
        "Soat",
        "Yil"
      ],
      "correctAnswer": 0,
      "explanation": "Date lar ayirilganda millisekund farqi olinadi; kunlarga aylantirish kerak."
    },
    {
      "id": 11,
      "question": "`toISOString()` nima qaytaradi?",
      "options": [
        "ISO 8601 standartidagi matn (masalan, 2024-01-01T00:00:00.000Z)",
        "Faqat yil",
        "Son",
        "Kun indeksi"
      ],
      "correctAnswer": 0,
      "explanation": "toISOString() sanani ISO formatidagi matn sifatida qaytaradi."
    },
    {
      "id": 12,
      "question": "`new Date(\"noto'g'ri matn\")` nima qaytaradi?",
      "options": [
        "Invalid Date (yaroqsiz sana)",
        "Hozirgi vaqt",
        "undefined",
        "0"
      ],
      "correctAnswer": 0,
      "explanation": "Yaroqsiz matn berilganda Invalid Date olinadi; getTime() esa NaN bo'ladi."
    }
  ]
};

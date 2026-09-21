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
    }
  ]
};

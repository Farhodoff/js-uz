export const mathBasics = {
  id: "mathBasics",
  title: "Global Obyektlar: Math (round, floor, random, max, min)",
  language: "javascript",
  theory: `## 1. Bu nima?

Cho'ntagingizdagi qulay muhandislik kalkulyatorini tasavvur qiling: unda sonlarni yaxlitlash, eng katta yoki eng kichik sonni topish, tasodifiy son chiqarish uchun maxsus tayyor tugmalar bor.

JavaScript da **Math** — ana shunday matematik amallarni bajarish uchun tilning o'zida tayyor o'rnatilgan global obyektdir. Unga hech narsa o'rnatish shart emas, to'g'ridan-to'g'ri chaqirib ishlatiladi.

**Math obyekti** — sonlar ustida matematik yaxlitlash, eng katta/kichik qiymatni aniqlash va tasodifiy sonlar hosil qilish uchun mo'ljallangan global vositalar to'plamidir.

*Yangi metodlar:*
- **Math.round(x)** — sonni eng yaqin butun songa matematik yaxlitlaydi (masalan, 4.6 -> 5, 4.4 -> 4).
- **Math.floor(x)** — sonni doimo pastga (pol tomonga) qarab yaxlitlaydi (masalan, 4.9 -> 4).
- **Math.max(a, b, ...)** — berilgan sonlar ichidan eng kattasini topadi.
- **Math.min(a, b, ...)** — berilgan sonlar ichidan eng kichigini topadi.
- **Math.random()** — 0 dan 1 gacha bo'lgan tasodifiy o'nlik son qaytaradi (0 kiradi, 1 kirmaydi).

---

## 2. Nega kerak?

Har safar narxlarni yaxlitlash, savatchadagi eng qimmat yoki arzon mahsulotni aniqlash, yoki o'yinlarda tasodifiy zar tashlash uchun o'zimiz noldan murakkab algoritmlar yozmasligimiz uchun JavaScript tayyor \`Math\` obyektini beradi. U tez ishlaydi va har doim qo'l ostimizda bo'ladi.

---

## 3. Birinchi misol

Bu kod yaxlitlash hamda eng katta va kichik sonlarni topishni ko'rsatadi.

\`\`\`javascript
console.log(Math.round(4.6)); // 5 (eng yaqin butun songa yaxlitlash)
console.log(Math.floor(4.9)); // 4 (doim pastga yaxlitlash)
console.log(Math.max(10, 50, 20)); // 50 (eng katta son)
console.log(Math.min(10, 50, 20)); // 10 (eng kichik son)
\`\`\`

\`\`\`text
// Natija:
5
4
50
10
\`\`\`

---

## 4. Qator-baqator tahlil

- \`Math.round(4.6);\` — maktab matematika qoidasiga ko'ra yaxlitlaydi: agar kasr qism \`0.5\` yoki undan katta bo'lsa yuqoriga (\`5\`), kichik bo'lsa pastga yaxlitlaydi.
- \`Math.floor(4.9);\` — \`floor\` (pol) har qanday kasr qismni shunchaki tashlab, doimo kichik tomonga butun son qaytaradi (\`4\`).
- \`Math.max(10, 50, 20);\` — uzatilgan argumentlar orasidan eng kattasi bo'lgan \`50\` ni qaytardi.
- \`Math.min(10, 50, 20);\` — uzatilgan argumentlar orasidan eng kichigi bo'lgan \`10\` ni qaytardi.

---

## 5. Qadamma-qadam (solishtirish jadvali)

Metodlarning ishlash natijalari:

| Metod | Kiritilgan son | Qaytgan natija | Qoida |
|---|---|---|---|
| \`Math.round(3.4)\` | \`3.4\` | \`3\` | \`.4\` pastga yaxlitlandi |
| \`Math.round(3.5)\` | \`3.5\` | \`4\` | \`.5\` yuqoriga yaxlitlandi |
| \`Math.floor(3.9)\` | \`3.9\` | \`3\` | Doimo pastga (polga) |
| \`Math.max(5, 9, 2)\` | \`5, 9, 2\` | \`9\` | Eng kattasi |
| \`Math.min(5, 9, 2)\` | \`5, 9, 2\` | \`2\` | Eng kichigi |

---

## 6. Yana bitta misol

1-misoldan farqi: \`Math.random()\` yordamida tasodifiy son hosil qilish va uni butun songa aylantirish.

\`\`\`javascript
const randomDecimal = Math.random(); // 0 dan 1 gacha tasodifiy o'nlik son (masalan: 0.742)
console.log(randomDecimal >= 0 && randomDecimal < 1); // true

// 1 dan 6 gacha tasodifiy butun son (o'yin zari):
const dice = Math.floor(Math.random() * 6) + 1;
console.log(dice >= 1 && dice <= 6); // true
\`\`\`

\`\`\`text
// Natija:
true
true
\`\`\`

Tahlil:
- \`Math.random()\` har chaqirilganda kutilmagan tasodifiy son beradi.
- \`Math.random() * 6\` — \`0\` dan \`5.999...\` gacha son hosil qiladi.
- \`Math.floor()\` uni \`0, 1, 2, 3, 4, 5\` butun sonlariga tushiradi, \`+ 1\` qo'shsak \`1\` dan \`6\` gacha bo'ladi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: new Math() deb obyekt yaratishga urinish

\`\`\`javascript
const m = new Math(); // XATO: TypeError: Math is not a constructor
\`\`\`

**Nima bo'ladi:** \`Math\` konstruktor emas, u tayyor statik obyekt. Uni \`new\` bilan yaratib bo'lmaydi.
**To'g'ri varianti:** To'g'ridan-to'g'ri \`Math.round(...)\` deb chaqiring.

### 2-xato: Math.max yoki Math.min ga massivni to'g'ridan-to'g'ri berish

\`\`\`javascript
const nums = [10, 50, 20];
console.log(Math.max(nums)); // XATO: NaN
\`\`\`

**Nima bo'ladi:** Bu metodlar massiv emas, alohida sonlarni kutadi. Natijada \`NaN\` (Not a Number) chiqadi.
**To'g'ri varianti:** O'tgan darsda o'rganganimizdek spread operatorini qo'llaymiz: \`Math.max(...nums)\` (\`50\`).

### 3-xato: Math so'zini kichik harf bilan yozish

\`\`\`javascript
math.round(4.5); // XATO: ReferenceError: math is not defined
\`\`\`

**Nima bo'ladi:** JavaScript katta-kichik harflarni farqlaydi.
**To'g'ri varianti:** Har doim katta harf bilan \`Math\` deb yoziladi.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`num = 7.8\` soni berilgan. \`Math.round(num)\` va \`Math.floor(num)\` natijalarini alohida konsolga chiqaring (\`8\`, keyin \`7\`).

### 2-mashq (o'rtacha)
\`prices = [15000, 42000, 8000, 29000]\` massivi berilgan. \`Math.max(...prices)\` va \`Math.min(...prices)\` yordamida eng katta va eng kichik narxni konsolga chiqaring (\`42000\` va \`8000\`).

### 3-mashq (chegara holat)
\`Math.random()\` va \`Math.floor\` yordamida 0 dan 9 gacha bo'lgan tasodifiy butun son hosil qiling (\`Math.floor(Math.random() * 10)\`) va olingan son \`0\` dan katta yoki teng hamda \`10\` dan kichikligini (\`rand >= 0 && rand < 10\`) konsolga chiqaring (\`true\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const num = 7.8;

console.log(Math.round(num)); // 8
console.log(Math.floor(num)); // 7
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const prices = [15000, 42000, 8000, 29000];

console.log(Math.max(...prices)); // 42000
console.log(Math.min(...prices)); // 8000
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const rand = Math.floor(Math.random() * 10);

console.log(rand >= 0 && rand < 10); // true
\`\`\`

---

## 9. Xulosa

1. \`Math\` — barcha asosiy matematik amallarni o'z ichiga olgan tayyor global obyekt.
2. \`Math.round\` eng yaqin butun songa, \`Math.floor\` esa doimo pastga qarab yaxlitlaydi.
3. \`Math.max\` va \`Math.min\` eng katta va eng kichik sonni topsa, \`Math.random\` tasodifiy son chiqaradi.

Keyingi darsda: Vaqt va sana bilan ishlash — \`Date\` obyekti bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "round va floor bilan yaxlitlash",
      instruction: "`num = 7.8` berilgan. `Math.round(num)` va `Math.floor(num)` natijalarini alohida konsolga chiqaring.",
      startingCode: "const num = 7.8;\n// Math.round va Math.floor natijalarini konsolga chiqaring\n",
      hint: "console.log(Math.round(num));\nconsole.log(Math.floor(num));",
      test: "if (!code.includes('Math.round') || !code.includes('Math.floor')) return 'Math.round va Math.floor ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('8') && out.includes('7')) return null;\nreturn '8 va 7 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Maksimal va minimal narxni topish",
      instruction: "`prices = [15000, 42000, 8000, 29000]` massivi berilgan. `Math.max` va `Math.min` orqali eng katta va eng kichik narxni konsolga chiqaring.",
      startingCode: "const prices = [15000, 42000, 8000, 29000];\n// Math.max(...prices) va Math.min(...prices) ni chiqaring\n",
      hint: "console.log(Math.max(...prices));\nconsole.log(Math.min(...prices));",
      test: "if (!code.includes('Math.max') || !code.includes('Math.min')) return 'Math.max va Math.min ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('42000')) && out.some(m => m.includes('8000'))) return null;\nreturn '42000 va 8000 konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Tasodifiy butun son oralig'i",
      instruction: "`Math.floor(Math.random() * 10)` yordamida 0 dan 9 gacha tasodifiy son hosil qiling va uning 0 va 10 oralig'idaligini (`rand >= 0 && rand < 10`) konsolga chiqaring.",
      startingCode: "// Math.floor(Math.random() * 10) qiling va oraliqni tekshirib chiqaring\n",
      hint: "const rand = Math.floor(Math.random() * 10);\nconsole.log(rand >= 0 && rand < 10);",
      test: "if (!code.includes('Math.random') || !code.includes('Math.floor')) return 'Math.random va Math.floor ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('true')) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "Yuqoriga yaxlitlash (ceil)",
      "instruction": "`const value = 4.2;` sonini `Math.ceil` yordamida yuqoriga yaxlitlab, natijani konsolga chiqaring (`5`).",
      "startingCode": "const value = 4.2;\n// Math.ceil bilan yuqoriga yaxlitlab chiqaring\n",
      "hint": "const value = 4.2;\nconsole.log(Math.ceil(value));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"Math.ceil\")) return \"Math.ceil ishlatilmadi\";\nif (out.some((m) => m.trim() === \"5\")) return null;\nreturn \"Natija 5 konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Modul (abs) qiymati",
      "instruction": "`const diff = -15;` sonining modulini (`Math.abs`) konsolga chiqaring (`15`).",
      "startingCode": "const diff = -15;\n// Math.abs bilan musbat qiymatni chiqaring\n",
      "hint": "const diff = -15;\nconsole.log(Math.abs(diff));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"Math.abs\")) return \"Math.abs ishlatilmadi\";\nif (out.some((m) => m.trim() === \"15\")) return null;\nreturn \"Modul 15 konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "Kvadrat ildiz",
      "instruction": "`Math.sqrt(144)` natijasini konsolga chiqaring (`12`).",
      "startingCode": "// Math.sqrt(144) natijasini chiqaring\n",
      "hint": "console.log(Math.sqrt(144));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"Math.sqrt\")) return \"Math.sqrt ishlatilmadi\";\nif (out.some((m) => m.trim() === \"12\")) return null;\nreturn \"Kvadrat ildiz 12 konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Darajaga ko'tarish",
      "instruction": "`Math.pow(2, 10)` natijasini konsolga chiqaring (`1024`).",
      "startingCode": "// Math.pow(2, 10) natijasini chiqaring\n",
      "hint": "console.log(Math.pow(2, 10));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"Math.pow\")) return \"Math.pow ishlatilmadi\";\nif (out.some((m) => m.trim() === \"1024\")) return null;\nreturn \"2^10 = 1024 konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "Math.max massiv xatosini tuzatish",
      "instruction": "`Math.max([1, 2, 3])` massiv to'g'ridan-to'g'ri berilgani uchun `NaN` qaytaradi. Spread qo'shib (`Math.max(...[1, 2, 3])`) to'g'ri natijani (`3`) chiqaring.",
      "startingCode": "// Math.max([1, 2, 3]) ni spread bilan tuzatib chiqaring\n",
      "hint": "console.log(Math.max(...[1, 2, 3]));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"...\")) return \"Spread (...) qo'shilmadi\";\nif (out.some((m) => m.trim() === \"3\")) return null;\nreturn \"Natija 3 konsolga chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Ikki son orasidagi farq",
      "instruction": "`const a = 20;` va `const b = 8;` berilgan. `Math.abs` yordamida ular orasidagi farqni (`12`) konsolga chiqaring.",
      "startingCode": "const a = 20;\nconst b = 8;\n// Math.abs(a - b) ni chiqaring\n",
      "hint": "const a = 20;\nconst b = 8;\nconsole.log(Math.abs(a - b));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"Math.abs\")) return \"Math.abs ishlatilmadi\";\nif (out.some((m) => m.trim() === \"12\")) return null;\nreturn \"Farq 12 konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Zar tashlash (chegara)",
      "instruction": "1 dan 6 gacha tasodifiy butun son hosil qiling (`Math.floor(Math.random() * 6) + 1`) va uning `1` dan `6` gacha oraliqda ekanini konsolga chiqaring.",
      "startingCode": "// 1..6 oralig'ida tasodifiy son hosil qilib, oraliqni tekshiring\n",
      "hint": "const dice = Math.floor(Math.random() * 6) + 1;\nconsole.log(dice >= 1 && dice <= 6);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"Math.random\") || !code.includes(\"Math.floor\")) return \"Math.random va Math.floor ishlatilmadi\";\nif (out.some((m) => m.includes(\"true\"))) return null;\nreturn \"true konsolga chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Math.floor(5.9) ifodasining natijasi nima bo'ladi?",
      options: [
        "5",
        "6",
        "5.9",
        "NaN"
      ],
      correctAnswer: 0,
      explanation: "Math.floor doimo pastga (kichik butun songa) qarab yaxlitlaydi, shuning uchun 5.9 dan 5 chiqadi."
    },
    {
      id: 2,
      question: "Math.random() qanday son qaytaradi?",
      options: [
        "0 dan 1 gacha bo'lgan tasodifiy o'nlik son (1 kirmaydi)",
        "1 dan 100 gacha bo'lgan butun son",
        "0 dan cheksizlikkacha tasodifiy son",
        "Faqat 0 yoki 1"
      ],
      correctAnswer: 0,
      explanation: "Math.random() 0 dan 1 gacha bo'lgan oraliqda (0 kiritilgan, 1 kiritilmagan) tasodifiy o'nlik son qaytaradi."
    },
    {
      id: 3,
      question: "Math.max(12, 45, 30) natijasi nima bo'ladi?",
      options: [
        "45",
        "12",
        "30",
        "87"
      ],
      correctAnswer: 0,
      explanation: "Math.max berilgan argumentlar ichidan eng kattasini qaytaradi, bu yerda 45 eng katta sondir."
    },
    {
      "id": 4,
      "question": "`Math.ceil(4.2)` natijasi nima?",
      "options": [
        "5",
        "4",
        "4.2",
        "NaN"
      ],
      "correctAnswer": 0,
      "explanation": "Math.ceil eng yaqin katta butun songa yaxlitlaydi: 4.2 → 5."
    },
    {
      "id": 5,
      "question": "`Math.round(2.5)` natijasi nima?",
      "options": [
        "3",
        "2",
        "2.5",
        "4"
      ],
      "correctAnswer": 0,
      "explanation": "Math.round yarim qiymatni yuqoriga yaxlitlaydi: 2.5 → 3."
    },
    {
      "id": 6,
      "question": "`Math.abs(-7)` natijasi nima?",
      "options": [
        "7",
        "-7",
        "0",
        "NaN"
      ],
      "correctAnswer": 0,
      "explanation": "Math.abs modulni (ishorasiz qiymatni) qaytaradi: |-7| = 7."
    },
    {
      "id": 7,
      "question": "`Math.sqrt(81)` natijasi nima?",
      "options": [
        "9",
        "8",
        "81",
        "40.5"
      ],
      "correctAnswer": 0,
      "explanation": "81 ning kvadrat ildizi 9 ga teng."
    },
    {
      "id": 8,
      "question": "`Math.max()` argumentsiz chaqirilsa nima qaytaradi?",
      "options": [
        "-Infinity",
        "0",
        "undefined",
        "NaN"
      ],
      "correctAnswer": 0,
      "explanation": "Math.max argumentsiz eng kichik mumkin bo'lgan qiymatni — -Infinity ni qaytaradi."
    },
    {
      "id": 9,
      "question": "`Math.random()` qanday oraliqda son qaytaradi?",
      "options": [
        "0 dan 1 gacha (1 kirmaydi)",
        "1 dan 100 gacha",
        "0 dan cheksizlikkacha",
        "Faqat 0 yoki 1"
      ],
      "correctAnswer": 0,
      "explanation": "Math.random() 0 (kiradi) dan 1 (kirmaydi) gacha o'nlik son qaytaradi."
    },
    {
      "id": 10,
      "question": "`Math.floor(Math.random() * 10)` qanday oraliqda butun son beradi?",
      "options": [
        "0 dan 9 gacha",
        "1 dan 10 gacha",
        "0 dan 10 gacha",
        "1 dan 9 gacha"
      ],
      "correctAnswer": 0,
      "explanation": "random 0..1, *10 → 0..10, floor → 0..9 butun sonlar."
    },
    {
      "id": 11,
      "question": "`Math.pow(3, 2)` natijasi nima?",
      "options": [
        "9",
        "6",
        "5",
        "8"
      ],
      "correctAnswer": 0,
      "explanation": "Math.pow(3, 2) = 3 ikkinchi daraja = 9."
    },
    {
      "id": 12,
      "question": "`Math.min(5, 2, 8)` natijasi nima?",
      "options": [
        "2",
        "5",
        "8",
        "15"
      ],
      "correctAnswer": 0,
      "explanation": "Math.min berilgan sonlar orasidan eng kichigini qaytaradi: 2."
    }
  ]
};

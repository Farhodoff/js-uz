export const ifStatement = {
  id: "ifStatement",
  title: "if Shart Operatori",
  language: "javascript",
  theory: `## 1. Bu nima?

Ertalab ko'chaga chiqayotganingizda oynadan qarab: "Agar yomg'ir yog'ayotgan bo'lsa, soyabon olaman" deysiz.
- Agar yomg'ir yog'sa — soyabon olasiz.
- Agar yomg'ir yog'masa — hech narsa qilmaysiz, odatdagidek ketaverasiz.

\`if\` (agar) — berilgan shart rost (\`true\`) bo'lgandagina ma'lum bir kod blokini ishga tushiruvchi shart operatoridir.

---

## 2. Nega kerak?

Shu paytgacha yozgan kodlarimizning barchasi yuqoridan pastga qarab istisnosiz bajarilardi.
Lekin dasturlashda ko'pincha ma'lum bir kod faqatgina shart to'g'ri bo'lganda ishlashi kerak:
- Foydalanuvchi paroli to'g'ri bo'lsa — profilni ochish.
- Foydalanuvchining yoshi 18 dan katta bo'lsa — kirishga ruxsat berish.

\`if\` operatori dasturga shartni tekshirish va shart to'g'ri bo'lsagina ma'lum qatorlarni bajarish imkoniyatini beradi.

---

## 3. Birinchi misol

Bu kod shart \`true\` bo'lgani uchun jingalak qavs ichidagi kodni ishga tushiradi.

\`\`\`javascript
let isRaining = true; // Yomg'ir yog'yapti

if (isRaining) {
  console.log("Soyabon oling!"); // Shart true bo'lgani uchun ishlaydi
}
\`\`\`

\`\`\`text
// Natija: Soyabon oling!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let isRaining = true;\` — mantiqiy o'zgaruvchi yaratildi.
- \`if (isRaining)\` — \`if\` so'zidan keyin har doim oddiy qavs \`(...)\` ichida tekshiriladigan shart yoziladi. Bu yerda shart qiymati \`true\`.
- \`{ ... }\` — jingalak qavslar (kod bloki). Agar qavs ichidagi shart \`true\` bo'lsa, faqat jingalak qavs ichidagi kodlar ishga tushadi.
- \`console.log("Soyabon oling!");\` — konsolga xabar chiqadi.

---

## 5. Qadamma-qadam (trace)

Keling, kodning bajarilish jarayonini qadam-baqadam kuzatamiz:

| Qadam | Kod qatori | Holat / Shart | Natija |
|---|---|---|---|
| 1 | \`let isRaining = true;\` | \`isRaining = true\` | O'zgaruvchi yaratildi |
| 2 | \`if (isRaining)\` | \`true\` tekshirildi | Shart bajarildi, blok ichiga kiriladi |
| 3 | \`console.log("Soyabon oling!");\` | Xabar chiqarildi | Konsolga chiqdi |

---

## 6. Yana bitta misol

Bu kodda shart bajarilmaydi (\`false\` bo'ladi), shuning uchun \`if\` ichidagi kod butunlay tashlab ketiladi.

\`\`\`javascript
let userAge = 15;

if (userAge >= 18) {
  console.log("Xush kelibsiz!"); // Ishlamaydi, chunki 15 >= 18 yolg'on (false)
}

console.log("Dastur tugadi."); // if dan tashqaridagi kod har doim ishlaydi
\`\`\`

\`\`\`text
// Natija: Dastur tugadi.
\`\`\`

Qator-baqator tahlil:
- \`userAge >= 18\` — \`15 >= 18\` sharti tekshiriladi va natija \`false\` bo'ladi.
- \`if (false)\` — shart \`false\` bo'lgani sababli JavaScript jingalak qavs \`{ ... }\` ichidagi kodni tashlab o'tib ketadi.
- Shuning uchun \`"Xush kelibsiz!"\` konsolga chiqmaydi.
- \`console.log("Dastur tugadi.");\` — \`if\` dan tashqarida bo'lgani uchun odatdagidek ishlaydi.

Shart false bo'lgandagi trace jadvali:
| Qadam | Kod qatori | Shart qiymati | Natija |
|---|---|---|---|
| 1 | \`let userAge = 15;\` | \`userAge = 15\` | O'zgaruvchi saqlandi |
| 2 | \`if (userAge >= 18)\` | \`15 >= 18\` → \`false\` | Shart bajarilmadi, blok tashlab ketildi |
| 3 | \`console.log("Dastur tugadi.");\` | Blokdan keyingi kod | Konsolga chiqdi |

---

## 7. Ko'p uchraydigan xatolar

### 1. if shartini qavssiz yozish
❌ Xato kod:
\`\`\`javascript
let isCold = true;
if isCold {
  console.log("Kiyim kiying!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'isCold'\` xatoligi yuz beradi. JavaScript'da \`if\` sharti har doim oddiy qavs \`(...)\` ichida yozilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
if (isCold) {
  console.log("Kiyim kiying!");
}
\`\`\`

### 2. if (...) qatorining oxiriga nuqta-vergul (;) qo'yish
❌ Xato kod:
\`\`\`javascript
let isCold = false;
if (isCold); {
  console.log("Sovuq!");
}
\`\`\`
Nima bo'ladi: Nuqta-vergul \`if\` shartini o'sha zahoti tugatib qo'yadi. Natijada pastdagi jingalak qavs \`if\` ga bog'lanmay qoladi va \`isCold\` qiymati \`false\` bo'lsa ham \`"Sovuq!"\` baribir chiqib ketadi!
✅ To'g'ri variant:
\`\`\`javascript
if (isCold) {
  console.log("Sovuq!");
}
\`\`\`

### 3. if (isCold === true) deb ortiqcha yozish
❌ Noo'rin uslub:
\`\`\`javascript
let isCold = true;
if (isCold === true) { ... }
\`\`\`
Nima bo'ladi: Kod ishlaydi, lekin bu ortiqcha takrorlash hisoblanadi. \`isCold\` ning o'zi Boolean bo'lgani uchun to'g'ridan-to'g'ri \`if (isCold)\` deb yozish to'g'ri va toza uslubdir.
✅ To'g'ri variant:
\`\`\`javascript
if (isCold) { ... }
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`score\` nomli o'zgaruvchi berilgan (\`let score = 80;\`). Agar \`score >= 70\` bo'lsa, konsolga \`"Siz o'tdingiz!"\` deb chiqaruvchi \`if\` yozing.

### 2-mashq (O'rtacha)
\`isLightOn = true;\` berilgan. \`if (isLightOn)\` orqali konsolga \`"Xona yorug'\"\` xabarini chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi nuqta-vergul (\`;\`) xatosini to'g'rilang, toki \`isWeekend\` \`false\` bo'lganda ichidagi xabar chiqmasin:
\`\`\`javascript
let isWeekend = false;
if (isWeekend); {
  console.log("Bugun dam olish kuni!");
}
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let score = 80;
if (score >= 70) {
  console.log("Siz o'tdingiz!");
}
\`\`\`
2.
\`\`\`javascript
let isLightOn = true;
if (isLightOn) {
  console.log("Xona yorug'");
}
\`\`\`
3.
\`\`\`javascript
let isWeekend = false;
if (isWeekend) { // ; olib tashlandi
  console.log("Bugun dam olish kuni!");
}
\`\`\`

---

## 9. Xulosa

1. \`if (shart) { ... }\` — shart \`true\` bo'lgandagina jingalak qavs ichidagi kodni ishga tushiradi.
2. Agar shart \`false\` bo'lsa, jingalak qavs ichidagi kod tashlab ketiladi.
3. \`if (...)\` dan keyin hech qachon nuqta-vergul (\`;\`) qo'yilmaydi.

Keyingi darsda: Shart bajarilmagan holat uchun \`else\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Ballni tekshiruvchi if",
      instruction: "`let score = 80;` berilgan. Agar `score >= 70` bo'lsa, konsolga `\"Siz o'tdingiz!\"` deb chiqaruvchi `if` yozing.",
      startingCode: "let score = 80;\n// if bilan score >= 70 bo'lsa \"Siz o'tdingiz!\" deb chiqaring\n",
      hint: "if (score >= 70) {\n  console.log(\"Siz o'tdingiz!\");\n}",
      test: "if (!code.includes('if')) return 'if operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Siz o'tdingiz!\"))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Boolean o'zgaruvchi bilan if",
      instruction: "`let isLightOn = true;` berilgan. `if (isLightOn)` orqali konsolga `\"Xona yorug'\"` xabarini chiqaring.",
      startingCode: "let isLightOn = true;\n// if bilan \"Xona yorug'\" deb chiqaring\n",
      hint: "if (isLightOn) {\n  console.log(\"Xona yorug'\");\n}",
      test: "if (!code.includes('if')) return 'if operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Xona yorug'\"))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "if dagi nuqta-vergul xatosini tuzatish",
      instruction: "`if (isWeekend);` dagi xatoni tuzating, toki `isWeekend = false;` bo'lganda konsolga hech narsa chiqmasin.",
      startingCode: "let isWeekend = false;\nif (isWeekend); {\n  console.log(\"Bugun dam olish kuni!\");\n}\n",
      hint: "if (isWeekend) {\n  console.log(\"Bugun dam olish kuni!\");\n}",
      test: "if (code.includes('if (isWeekend);')) return 'if (isWeekend) dan keyingi nuqta-vergulni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'isWeekend false bo\\'lganda xabar chiqmasligi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "if blokidagi kod qachon ishga tushadi?",
      options: [
        "Faqat qavs ichidagi shart true bo'lganda",
        "Har doim istisnosiz ishlaydi",
        "Faqat qavs ichidagi shart false bo'lganda",
        "Faqat xatolik yuz berganda"
      ],
      correctAnswer: 0,
      explanation: "if operatori faqat berilgan shart rost (true) bo'lgandagina o'z blokini ishga tushiradi."
    },
    {
      id: 2,
      question: "Quyidagi kod konsolga nima chiqaradi?\nlet count = 5;\nif (count > 10) {\n  console.log(\"Katta son!\");\n}\nconsole.log(\"Tugadi\");",
      options: [
        "\"Katta son!\" va \"Tugadi\"",
        "Hech narsa chiqmaydi",
        "Faqat \"Tugadi\"",
        "SyntaxError"
      ],
      correctAnswer: 2,
      explanation: "count > 10 sharti false bo'lgani uchun if bloki tashlab ketiladi va faqat if dan tashqaridagi \"Tugadi\" chiqadi."
    },
    {
      id: 3,
      question: "Quyidagi if lardan qaysi biri eng to'g'ri va toza uslubda yozilgan?",
      options: [
        "if isOnline { ... }",
        "if (isOnline === true) { ... }",
        "if (isOnline) { ... }",
        "if (isOnline); { ... }"
      ],
      correctAnswer: 2,
      explanation: "Boolean o'zgaruvchining o'zi true/false qiymatiga ega bo'lgani uchun to'g'ridan-to'g'ri if (isOnline) deb yozish to'g'ri uslubdir."
    }
  ]
};

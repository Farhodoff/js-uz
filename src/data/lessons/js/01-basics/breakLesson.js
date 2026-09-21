export const breakLesson = {
  id: "breakLesson",
  title: "break (Siklni to'xtatish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz do'kondan qizil olma qidiryapsiz. Savatda 10 ta olma bor. Siz ularni bittalab ko'ryapsiz: 1-olma yashil, 2-olma yashil, 3-olma esa qizil! Qizil olmani topganingizdan so'ng, qolgan 7 ta olmani qarab chiqishning hech qanday keragi yo'q. Qidirishni darhol to'xtatasiz.
Yoki poyezddagi favqulodda to'xtatish (stop-kran): poyezd oxirgi bekatgacha borishi rejalashtirilgan, lekin kutilmagan holat yuz berganda stop-kran bosilsa, harakat o'sha zahoti butunlay to'xtaydi.

\`break\` (to'xtatish / sindirish) — siklning asosiy sharti hali tugamagan bo'lsa ham, uni muddatidan oldin butunlay to'xtatib, sikldan darhol tashqariga chiqib ketish buyrug'idir.

*Yangi termin:* **Muddatidan oldin to'xtatish (premature termination)** — ma'lum bir shart bajarilganda (masalan, kerakli natija topilganda) siklni oxirigacha aylantirmasdan darhol yakunlash.

---

## 2. Nega kerak?

Sikllar odatda o'z sharti \`false\` bo'lmaguncha to'xtovsiz aylanishda davom etadi.
Masalan, 1 dan 1000 gacha sonlar orasidan kerakli bitta sonni qidirayotgan bo'lsak, u 5-qadamdayoq topilishi mumkin. Agar \`break\` bo'lmasa, dastur keraksiz ravishda qolgan 995 ta qadamni ham behuda bajarib chiqadi.

\`break\` yordamida kerakli natija topilishi bilan siklni shu zahoti to'xtatish, kompyuter vaqti va resursini tejash mumkin.

---

## 3. Birinchi misol

Bu kod 1 dan 5 gacha sanashi kerak, lekin hisoblagich 3 ga teng bo'lganda \`break\` sababli sikldan chiqib ketadi.

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break; // i 3 ga teng bo'lganda sikl darhol to'xtaydi
  }
  console.log(i); // Joriy sonni chiqarish
}
\`\`\`

\`\`\`text
// Natija:
1
2
\`\`\`

---

## 4. Qator-baqator tahlil

- \`for (let i = 1; i <= 5; i++) {\` — 1 dan 5 gacha aylanadigan odatiy \`for\` sikli.
- \`if (i === 3) {\` — har bir qadamda \`i\` qiymati 3 ga tengligi tekshiriladi.
- \`break;\` — to'xtatish buyrug'i. JavaScript bu kalit so'zni ko'rishi bilan siklni darhol yakunlaydi va jingalak qavsdan tashqariga sakraydi. Qolgan takrorlanishlar (3, 4, 5) umuman bajarilmaydi.
- \`console.log(i);\` — konsolga chiqarish qatori faqat \`break\` ishlamagan (1 va 2 bo'lgan) paytda bajariladi.
- \`}\` — sikl bloki tugashi.

---

## 5. Qadamma-qadam (trace)

Jarayonni qadam-baqadam kuzatamiz:

| Qadam | i | Shart (\`i === 3\`) | \`break\` ishladimi? | \`console.log(i)\` | Natija / Izoh |
|---|---|---|---|---|---|
| 1 | 1 | 1 === 3 -> false | Yo'q | 1 chiqdi | Sikl davom etadi, i 2 bo'ladi |
| 2 | 2 | 2 === 3 -> false | Yo'q | 2 chiqdi | Sikl davom etadi, i 3 bo'ladi |
| 3 | 3 | 3 === 3 -> true | **HA** | — (ishlamaydi) | \`break\` ishladi! Sikl shu zahoti to'xtadi |

*Eslatma:* \`break\` faqat o'zi joylashgan siklni to'xtatadi. Sikldan keyin yozilgan boshqa kodlar odatdagidek ishlashda davom etadi.

---

## 6. Yana bitta misol

1-misoldan farqi: \`break\` buyrug'ini \`while\` siklida ishlatamiz hamda \`console.log\` ni \`if\` dan oldin qo'yamiz.

\`\`\`javascript
let count = 1;
while (count <= 10) {
  console.log(count); // Joriy sonni chiqarish
  if (count === 3) {
    break; // 3 ga yetganda siklni to'xtatish
  }
  count++;
}
\`\`\`

\`\`\`text
// Natija:
1
2
3
\`\`\`

*(Farqiga e'tibor bering: bu yerda \`console.log\` \`if\` dan oldin turgani sababli \`3\` ham ekranga chiqadi, so'ngra \`break\` ishlab sikl to'xtaydi).*

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: break buyrug'ini sikldan tashqarida ishlatish

\`\`\`javascript
let age = 20;
if (age > 18) {
  break; // XATO: bu yerda sikl yo'q!
}
\`\`\`

**Nima bo'ladi:** \`SyntaxError: Illegal break statement\` xatosi yuz beradi. Chunki \`break\` faqat sikllar (\`for\`, \`while\`, \`do...while\`) yoki \`switch\` ichida ishlatilishi shart.
**To'g'ri varianti:** \`break\` ni faqat sikl yoki \`switch\` bloki ichida ishlating.

### 2-xato: break dan keyin kod yozish (bajarilmas kod)

\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  break;
  console.log(i); // XATO: bu qator hech qachon ishlamaydi!
}
\`\`\`

**Nima bo'ladi:** \`break\` darhol sikldan chiqib ketgani sababli, uning ostidagi qatorlarga navbat yetib bormaydi (unreachable code).
**To'g'ri varianti:** \`break\` har doim ma'lum bir shart (\`if\`) ichida berilishi lozim: \`if (...) { break; }\`.

### 3-xato: break butun dasturni to'xtatadi deb o'ylash
Ba'zi o'quvchilar \`break\` butun dasturni yopadi deb o'ylashadi. Unday emas: \`break\` faqat o'zi turgan siklni to'xtatadi, sikldan keyingi qatorlar esa o'z vaqtida bajariladi.

---

## 8. Tekshiruv

### 1-mashq (oson)
1 dan 10 gacha bo'lgan sonlarni \`for\` siklida chiqaring, lekin \`i === 4\` bo'lganda \`break\` orqali siklni to'xtating (konsolga faqat 1, 2, 3 chiqsin).

### 2-mashq (o'rtacha)
Quyidagi kod ishlaganda konsolga nimalar chiqadi?
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
  if (i === 2) {
    break;
  }
}
console.log("To'xtadi");
\`\`\`

### 3-mashq (chegara holat)
Quyidagi kodda konsolga nimalar chiqadi?
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i > 0) {
    break;
  }
  console.log(i);
}
console.log("Tugadi");
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 4) {
    break;
  }
  console.log(i);
}
\`\`\`

**2-mashq javobi:**
Konsolga ketma-ket \`1\`, \`2\` va \`"To'xtadi"\` chiqadi (chunki \`console.log\` \`break\` dan oldin chaqirilgan, \`i === 2\` bo'lganda 2 chiqib, keyin sikl to'xtaydi).

**3-mashq javobi:**
Konsolga faqat \`"Tugadi"\` chiqadi. Chunki birinchi qadamdayoq \`1 > 0\` sharti \`true\` bo'lib, \`break\` siklni darhol to'xtatadi. \`console.log(i)\` esa biror marta ham ishlamaydi.

---

## 9. Xulosa

1. \`break\` buyrug'i siklni muddatidan oldin, darhol to'xtatib, undan chiqib ketish uchun ishlatiladi.
2. \`break\` odatda \`if\` sharti ichida yoziladi va faqat o'zi joylashgan siklga ta'sir qiladi.
3. Sikldan yoki \`switch\` dan tashqarida \`break\` ishlatilsa, \`SyntaxError: Illegal break statement\` xatosi yuzaga keladi.

Keyingi darsda: Siklni butunlay to'xtatmasdan, faqat joriy bitta qadamni tashlab o'tish uchun \`continue\` buyrug'ini o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Siklni 3 da to'xtatish",
      instruction: "\`for (let i = 1; i <= 5; i++)\` sikli berilgan. Agar \`i === 3\` bo'lsa, \`break;\` orqali siklni to'xtating, qolgan hollarda \`console.log(i);\` chiqaring (faqat 1 va 2 chiqsin).",
      startingCode: "for (let i = 1; i <= 5; i++) {\n  // if va break yozing\n  console.log(i);\n}\n",
      hint: "if (i === 3) {\n  break;\n}\nconsole.log(i);",
      test: "if (!code.includes('break')) return 'break ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2') return null;\nreturn 'Konsolga faqat 1, 2 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "while siklida break",
      instruction: "\`let count = 1;\` berilgan. \`while (count <= 10)\` siklida \`count\` qiymatini chiqaring va \`count === 4\` bo'lganda \`break;\` bilan to'xtating (1, 2, 3, 4 chiqsin).",
      startingCode: "let count = 1;\nwhile (count <= 10) {\n  console.log(count);\n  // if va break yozing\n  count++;\n}\n",
      hint: "console.log(count);\nif (count === 4) {\n  break;\n}\ncount++;",
      test: "if (!code.includes('break')) return 'break ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3,4') return null;\nreturn 'Konsolga 1, 2, 3, 4 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 3,
      title: "Cheksiz sikldan break bilan chiqish",
      instruction: "Quyidagi \`while (true)\` sikli berilgan. \`step === 3\` bo'lganda \`break;\` bilan sikldan chiqib ketish shartini qo'shing.",
      startingCode: "let step = 1;\nwhile (true) {\n  console.log(step);\n  // step 3 ga teng bo'lsa break qiling\n  step++;\n}\n",
      hint: "if (step === 3) {\n  break;\n}",
      test: "if (!code.includes('break')) return 'break ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn 'Konsolga 1, 2, 3 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Sikl ichida break buyrug'i bajarilganda nima sodir bo'ladi?",
      options: [
        "Sikl muddatidan oldin darhol to'xtaydi va sikldan keyingi kodga o'tiladi",
        "Butun dastur xato berib to'xtaydi",
        "Faqat joriy qadam o'tkazib yuboriladi",
        "Sikl boshidan qayta boshlanadi"
      ],
      correctAnswer: 0,
      explanation: "break buyrug'i siklni to'liq to'xtatadi va boshqaruvni sikldan keyingi birinchi qatorga uzatadi."
    },
    {
      id: 2,
      question: "Agar break buyrug'i hech qanday sikl yoki switch bo'lmagan oddiy joyda ishlatilsa, qanday xato chiqadi?",
      options: [
        "SyntaxError: Illegal break statement",
        "TypeError",
        "ReferenceError",
        "Hech qanday xato chiqmaydi"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da break faqat sikllar yoki switch ichida ishlatilishi mumkin, aks holda sintaktik xato beradi."
    },
    {
      id: 3,
      question: "Quyidagi kod konsolga nima chiqaradi?\nfor (let i = 1; i <= 5; i++) {\n  if (i === 2) break;\n  console.log(i);\n}",
      options: [
        "1",
        "1 va 2",
        "1, 2, 3, 4, 5",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 0,
      explanation: "1-qadamda 1 chiqadi. 2-qadamda i === 2 rost bo'lib break ishlaydi va sikldan chiqib ketiladi. Shuning uchun faqat 1 chiqadi."
    }
  ]
};

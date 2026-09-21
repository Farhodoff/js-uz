export const continueLesson = {
  id: "continueLesson",
  title: "continue (Aylanishni o'tkazib yuborish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz 10 ta qutini tekshiryapsiz. 3-qutining ustida "Buzilgan" degan yozuv bor. Siz uni ochib o'tirmaysiz — shunchaki **tashlab ketasiz** va darhol 4-qutini ochishga o'tasiz. Siklni to'xtatmaysiz, faqat shu 3-qutini o'tkazib yuborasiz.
Yoki telefon pleyerida "Keyingi qo'shiq (Skip)" tugmasi: yoqmagan bitta musiqani o'tkazib yuborasiz, lekin pleyer to'xtab qolmaydi, keyingi qo'shiqdan davom etadi.
O'tgan darsdagi \`break\` pleyerni butunlay o'chirib qo'ygan bo'lsa, \`continue\` — faqat joriy bitta qadamni o'tkazib yuboradi.

\`continue\` (davom ettir) — siklning joriy aylanishidagi qolgan barcha kodlarni tashlab yuborib, darhol keyingi aylanishga (qadamga) o'tish buyrug'idir.

*Yangi termin:* **Aylanishni o'tkazib yuborish (skip iteration)** — muayyan shart bajarilganda sikl tanasidagi pastki ishlarni bajarmasdan, navbatdagi qadamga sakrash.

---

## 2. Nega kerak?

Ba'zan sikl aylanayotganda ayrim qiymatlar bilan ishlash kerak bo'lmaydi (masalan, noto'g'ri yoki keraksiz ma'lumotlar).
Agar \`continue\` bo'lmasa, butun kodni murakkab va ichma-ich \`if...else\` bloklari ichiga yozishga to'g'ri kelardi.

\`continue\` orqali kerak bo'lmagan holatni darhol tekshirib, qolgan kodlarni chetlab o'tish va kodni ancha toza saqlash mumkin.

---

## 3. Birinchi misol

Bu kod 1 dan 5 gacha sanaydi, lekin 3 sonini \`continue\` yordamida tashlab o'tadi.

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // i 3 bo'lganda joriy qadamni o'tkazib yuborish
  }
  console.log(i); // Faqat 1, 2, 4, 5 sonlari uchun ishlaydi
}
\`\`\`

\`\`\`text
// Natija:
1
2
4
5
\`\`\`

---

## 4. Qator-baqator tahlil

- \`for (let i = 1; i <= 5; i++) {\` — 1 dan 5 gacha aylanadigan \`for\` sikli.
- \`if (i === 3) {\` — har bir qadamda \`i\` qiymati 3 ga tengligi tekshiriladi.
- \`continue;\` — \`continue\` kalit so'zi. JavaScript bu buyruqni ko'rishi bilan joriy blokdagi pastki qatorlarni bajarmaydi va darhol \`for\` ning keyingi qadamiga (\`i++\`) o'tadi.
- \`console.log(i);\` — \`i === 3\` bo'lgan paytda bu qator ishlamaydi, chunki undan oldin \`continue\` ishlab bo'lgan.
- \`}\` — sikl blokining oxiri.

---

## 5. Qadamma-qadam (trace)

Ketma-ketlikni jadvalda kuzatamiz:

| Qadam | i | Shart (\`i === 3\`) | \`continue\` ishladimi? | console.log(i) | Nima sodir bo'ladi? |
|---|---|---|---|---|---|
| 1 | 1 | 1 === 3 -> false | Yo'q | 1 chiqdi | Odatdagidek ishladi |
| 2 | 2 | 2 === 3 -> false | Yo'q | 2 chiqdi | Odatdagidek ishladi |
| 3 | 3 | 3 === 3 -> true | **HA** | — (tashlab ketildi) | console.log ishlamadi, to'g'ri \`i++\` ga o'tildi |
| 4 | 4 | 4 === 3 -> false | Yo'q | 4 chiqdi | Odatdagidek ishladi |
| 5 | 5 | 5 === 3 -> false | Yo'q | 5 chiqdi | Odatdagidek ishladi |
| 6 | 6 | 6 <= 5 -> false | — | — | Sikl to'liq yakunlandi |

### break va continue farqi yonma-yon:

\`\`\`javascript
// break (siklni butunlay to'xtatadi):
for (let i = 1; i <= 4; i++) {
  if (i === 2) break;
  console.log(i); // Natija: 1
}

// continue (faqat 2 ni tashlab, qolganini davom ettiradi):
for (let i = 1; i <= 4; i++) {
  if (i === 2) continue;
  console.log(i); // Natija: 1, 3, 4
}
\`\`\`

---

## 6. Yana bitta misol

1-misoldan farqi: qoldiq operatori (\`% 2 === 0\`) yordamida barcha juft sonlarni \`continue\` bilan tashlab o'tamiz va faqat toq sonlarni chiqaramiz.

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i % 2 === 0) {
    continue; // Juft son bo'lsa, keyingi qadamga o'tish
  }
  console.log(i); // Faqat toq sonlar chiqadi
}
\`\`\`

\`\`\`text
// Natija:
1
3
5
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: while siklida continue ishlatganda hisoblagich oshirilmasdan qolib ketishi

\`\`\`javascript
let count = 1;
while (count <= 3) {
  if (count === 2) {
    continue; // XATO: pastdagi count++ ga yetib bormaydi!
  }
  console.log(count);
  count++;
}
\`\`\`

**Nima bo'ladi:** \`count === 2\` bo'lganda \`continue\` to'g'ridan-to'g'ri yuqoridagi shartga sakraydi. Pastdagi \`count++\` esa tashlab ketiladi. Natijada \`count\` doim 2 bo'lib qolib, dastur cheksiz siklga tushadi!
**To'g'ri varianti:** \`while\` siklida \`continue\` dan oldin hisoblagichni qo'lda oshirish lozim yoki avtomatik qadamga ega bo'lgan \`for\` siklidan foydalanish xavfsizroq:
\`\`\`javascript
let count = 1;
while (count <= 3) {
  if (count === 2) {
    count++; // Qadamni oshirib, keyin continue qilish kerak
    continue;
  }
  console.log(count);
  count++;
}
\`\`\`

### 2-xato: continue buyrug'ini sikldan tashqarida ishlatish

\`\`\`javascript
let score = 50;
if (score < 60) {
  continue; // XATO: bu yerda hech qanday sikl yo'q!
}
\`\`\`

**Nima bo'ladi:** \`SyntaxError: Illegal continue statement\` xatosi yuzaga keladi.
**To'g'ri varianti:** \`continue\` faqat sikllar ichida ishlatilishi lozim.

### 3-xato: continue dan keyin bir xil blokda kod yozish (unreachable code)
\`continue\` qatoridan pastda turgan kodlarga navbat yetib bormaydi. Shuning uchun \`continue\` har doim \`if\` sharti ichida berilishi kerak.

---

## 8. Tekshiruv

### 1-mashq (oson)
1 dan 5 gacha sonlarni \`for\` siklida chiqaring, lekin \`i === 2\` bo'lgan qadamni \`continue\` yordamida tashlab o'ting (konsolga 1, 3, 4, 5 chiqsin).

### 2-mashq (o'rtacha)
Quyidagi kod ishlaganda konsolga qanday natijalar chiqadi?
\`\`\`javascript
for (let i = 1; i <= 6; i++) {
  if (i <= 3) {
    continue;
  }
  console.log(i);
}
\`\`\`

### 3-mashq (chegara holat)
Quyidagi kod ishlaganda konsolga nima chiqadi?
\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  continue;
  console.log(i);
}
console.log("Yakunlandi");
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}
\`\`\`

**2-mashq javobi:**
\`4\`, \`5\` va \`6\` sonlari chiqadi (chunki 1, 2, 3 bo'lganda \`i <= 3\` sharti \`true\` bo'lib, \`continue\` ularni o'tkazib yuboradi).

**3-mashq javobi:**
Faqat \`"Yakunlandi"\` chiqadi. Sikl 3 marta aylanadi, lekin har safar eng boshida \`continue\` ishlagani sababli \`console.log(i)\` biror marta ham bajarilmaydi.

---

## 9. Xulosa

1. \`continue\` buyrug'i siklning joriy aylanishidagi qolgan ishlarni tashlab, darhol keyingi qadamga o'tkazadi.
2. \`break\` siklni butunlay to'xtatadi, \`continue\` esa faqat bitta qadamni o'tkazib yuboradi.
3. \`while\` siklida \`continue\` ishlatganda hisoblagich oshirilmasdan qolib ketmasligiga e'tibor berish lozim.

Keyingi darsda: Kodimizni tartibli va qayta ishlatiladigan bo'laklarga ajratish uchun Funksiyalar (Functions) mavzusini o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "2 sonini tashlab o'tish",
      instruction: "\`for (let i = 1; i <= 4; i++)\` siklida \`i === 2\` bo'lganda \`continue;\` yordamida qadamni o'tkazib yuboring va qolgan sonlarni (1, 3, 4) chiqaring.",
      startingCode: "for (let i = 1; i <= 4; i++) {\n  // if va continue yozing\n  console.log(i);\n}\n",
      hint: "if (i === 2) {\n  continue;\n}\nconsole.log(i);",
      test: "if (!code.includes('continue')) return 'continue ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,3,4') return null;\nreturn 'Konsolga 1, 3, 4 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "Faqat toq sonlarni chiqarish",
      instruction: "\`for (let i = 1; i <= 5; i++)\` sikli berilgan. Agar son juft bo'lsa (\`i % 2 === 0\`), \`continue;\` orqali uni tashlab o'ting va faqat toq sonlarni (1, 3, 5) chiqaring.",
      startingCode: "for (let i = 1; i <= 5; i++) {\n  // juft son bo'lsa continue\n  console.log(i);\n}\n",
      hint: "if (i % 2 === 0) {\n  continue;\n}",
      test: "if (!code.includes('continue')) return 'continue ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,3,5') return null;\nreturn 'Konsolga 1, 3, 5 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 3,
      title: "break va continue farqi",
      instruction: "Quyidagi kodda \`break\` o'rniga \`continue\` qo'ying, toki sikl butunlay to'xtamasdan faqat 3 sonini tashlab o'tsin (1, 2, 4 chiqsin).",
      startingCode: "for (let i = 1; i <= 4; i++) {\n  if (i === 3) {\n    break; // buni continue ga almashtiring\n  }\n  console.log(i);\n}\n",
      hint: "if (i === 3) {\n  continue;\n}",
      test: "if (code.includes('break')) return 'break o\\'rniga continue ishlating';\nif (!code.includes('continue')) return 'continue ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,4') return null;\nreturn 'Konsolga 1, 2, 4 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "continue buyrug'i siklda nima vazifani bajaradi?",
      options: [
        "Joriy qadamdagi qolgan kodlarni bajarmasdan, darhol keyingi qadamga (aylanishga) o'tadi",
        "Siklni butunlay to'xtatadi",
        "Dasturni boshidan ishga tushiradi",
        "O'zgaruvchini 1 taga kamaytiradi"
      ],
      correctAnswer: 0,
      explanation: "continue siklni to'xtatmaydi, balki faqat joriy aylanishni yakunlab, darhol keyingi aylanishga o'tkazadi."
    },
    {
      id: 2,
      question: "break va continue buyruqlari orasidagi asosiy farq nima?",
      options: [
        "break siklni butunlay to'xtatadi, continue esa faqat bitta qadamni o'tkazib yuboradi",
        "break faqat for siklida, continue faqat while siklida ishlaydi",
        "continue butun dasturni to'xtatadi, break esa davom ettiradi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "break sikldan to'liq chiqib ketish uchun, continue esa navbatdagi qadamga o'tish uchun xizmat qiladi."
    },
    {
      id: 3,
      question: "Quyidagi kod konsolga nimalar chiqaradi?\nfor (let i = 1; i <= 3; i++) {\n  if (i === 2) continue;\n  console.log(i);\n}",
      options: [
        "1 va 3",
        "1, 2, 3",
        "Faqat 1",
        "Faqat 2"
      ],
      correctAnswer: 0,
      explanation: "i === 2 bo'lganda continue ishlab, console.log(i) bajarilmay qoladi va 3-qadamga o'tiladi. Natijada 1 va 3 chiqadi."
    }
  ]
};

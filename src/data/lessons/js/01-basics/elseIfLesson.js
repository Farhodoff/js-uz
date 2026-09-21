export const elseIfLesson = {
  id: "elseIfLesson",
  title: "else if (Ketma-ket shartlar)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz chorrahadagi svetoforga qarab turibsiz:
- Agar qizil chiroq yonsa — to'xtaysiz.
- **Aks holda, agar** sariq chiroq yonsa — tayyorlanasiz.
- **Aks holda, agar** yashil chiroq yonsa — harakatlanasiz.

Bu yerda 2 ta emas, bir nechta holat bor va ulardan har safar faqat bittasi yonadi.

\`else if\` (aks holda, agar) — ikkitadan ko'p bo'lgan shartlarni ketma-ket tekshirish va ulardan birinchi to'g'ri chiqqanini ishga tushirish uchun ishlatiladigan operator.

---

## 2. Nega kerak?

Hayotda va dasturlarda tanlov har doim ham faqat ikkita ("ha" yoki "yo'q") bo'lmaydi:
- Imtihon ballari: 90 dan yuqori bo'lsa "A'lo", 70 dan yuqori bo'lsa "Yaxshi", 60 dan yuqori bo'lsa "Qoniqarli", aks holda "Qoniqarsiz".
- Foydalanuvchi yoshi: bola, o'smir, katta yoshli yoki qariya.

Oddiy \`if...else\` faqat ikkita yo'l bera oladi. \`else if\` yordamida esa biz istalgancha ko'p shartlarni ketma-ket zanjir qilib tekshirishimiz mumkin.

---

## 3. Birinchi misol

Bu kod imtihon balliga qarab bahoni aniqlaydi.

\`\`\`javascript
let score = 75;

if (score >= 90) {
  console.log("A'lo"); // 75 >= 90 yolg'on (false)
} else if (score >= 70) {
  console.log("Yaxshi"); // 75 >= 70 rost (true) -> shu ishlaydi!
} else {
  console.log("Qoniqarsiz"); // Bajarilmaydi
}
\`\`\`

\`\`\`text
// Natija: Yaxshi
\`\`\`

---

## 4. Qator-baqator tahlil

- \`if (score >= 90)\` — 1-shart tekshiriladi (\`75 >= 90\`), natija \`false\`. JavaScript keyingi shartga o'tadi.
- \`else if (score >= 70)\` — 2-shart tekshiriladi (\`75 >= 70\`), natija \`true\`. Bu blok ichidagi \`console.log("Yaxshi");\` bajariladi.
- \`else { ... }\` — bitta shart to'g'ri chiqqani sababli, undan keyingi barcha bloklar tekshirilmasdan darhol tashlab yuboriladi.
- **Oltin qoida**: \`if ... else if ... else\` zanjirida shartlar yuqoridan pastga tekshiriladi va BIRINCHI to'g'ri chiqqan blok ishlab, butun zanjir to'xtaydi.

---

## 5. Qadamma-qadam (trace)

Bajarilish ketma-ketligi:

| Qadam | Kod qatori | Shart tekshiruvi | Natija |
|---|---|---|---|
| 1 | \`let score = 75;\` | \`score = 75\` | O'zgaruvchi yuklandi |
| 2 | \`if (score >= 90)\` | \`75 >= 90\` → \`false\` | Bajarilmadi, keyingi shartga o'tildi |
| 3 | \`else if (score >= 70)\` | \`75 >= 70\` → \`true\` | Shart bajarildi! Yaxshi konsolga chiqdi |
| 4 | \`else\` | Tekshirilmaydi | Zanjir to'xtatildi |

---

## 6. Yana bitta misol

Bu kod svetofor chirog'iga qarab qilinadigan harakatni aniqlaydi.

\`\`\`javascript
let light = "yellow";

if (light === "red") {
  console.log("To'xtang");
} else if (light === "yellow") {
  console.log("Tayyorlaning");
} else if (light === "green") {
  console.log("Yuring");
} else {
  console.log("Bunday chiroq yo'q");
}
\`\`\`

\`\`\`text
// Natija: Tayyorlaning
\`\`\`

Qator-baqator tahlil:
- \`light === "red"\` tekshiriladi — \`false\`.
- \`light === "yellow"\` tekshiriladi — \`true\`. Konsolga \`"Tayyorlaning"\` chiqadi.
- Undan keyingi \`light === "green"\` va \`else\` bloklari tekshirilmaydi.

---

## 7. Ko'p uchraydigan xatolar

### 1. elseif deb qo'shib yozish
❌ Xato kod:
\`\`\`javascript
if (score >= 90) {
  console.log("A");
} elseif (score >= 70) {
  console.log("B");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '{'\` xatoligi yuz beradi. JavaScript'da \`elseif\` degan bitta so'z yo'q, u doimo ikkita alohida so'z: \`else if\` ko'rinishida probel bilan yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
else if (score >= 70) {
  console.log("B");
}
\`\`\`

### 2. Shartlar tartibini adashtirish (mantiqiy xato)
❌ Xato kod:
\`\`\`javascript
let score = 95;
if (score >= 70) {
  console.log("Yaxshi"); // 95 >= 70 rost bo'lgani uchun shu ishlab ketadi!
} else if (score >= 90) {
  console.log("A'lo"); // Bu qatorga navbat HECH QACHON yetib kelmaydi
}
\`\`\`
Nima bo'ladi: 95 ball olgan o'quvchiga ham "Yaxshi" chiqadi, chunki \`score >= 70\` yuqorida turibdi va u \`true\` bo'ladi.
✅ To'g'ri variant: Chegarasi qat'iyroq (kattaroq) shartlar har doim yuqorida turishi kerak:
\`\`\`javascript
if (score >= 90) {
  console.log("A'lo");
} else if (score >= 70) {
  console.log("Yaxshi");
}
\`\`\`

### 3. else if da shart qavsini unutish
❌ Xato kod:
\`\`\`javascript
else if score >= 70 { ... }
\`\`\`
Nima bo'ladi: \`SyntaxError\` xatoligi yuz beradi. \`if\` kabi \`else if\` dan keyin ham shart oddiy qavs \`(...)\` ichida bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
else if (score >= 70) { ... }
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`score = 92;\` berilgan. Agar \`score >= 90\` bo'lsa \`"A"\`, aks holda agar \`score >= 80\` bo'lsa \`"B"\`, qolgan hollarda \`"C"\` deb chiqaruvchi \`if...else if...else\` yozing (konsolga \`"A"\` chiqadi).

### 2-mashq (O'rtacha)
\`hour = 14;\` berilgan. Agar \`hour < 12\` bo'lsa \`"Xayrli tong"\`, aks holda agar \`hour < 18\` bo'lsa \`"Xayrli kun"\`, qolgan hollarda \`"Xayrli kech"\` deb chiqaruvchi kod yozing (konsolga \`"Xayrli kun"\` chiqadi).

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`elseif\` xatosini to'g'rilang, toki konsolga \`"Baland"\` chiqsin:
\`\`\`javascript
let height = 185;
if (height < 160) {
  console.log("Past");
} elseif (height >= 180) {
  console.log("Baland");
} else {
  console.log("O'rtacha");
}
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let score = 92;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}
\`\`\`
2.
\`\`\`javascript
let hour = 14;
if (hour < 12) {
  console.log("Xayrli tong");
} else if (hour < 18) {
  console.log("Xayrli kun");
} else {
  console.log("Xayrli kech");
}
\`\`\`
3.
\`\`\`javascript
let height = 185;
if (height < 160) {
  console.log("Past");
} else if (height >= 180) { // elseif o'rniga else if
  console.log("Baland");
} else {
  console.log("O'rtacha");
}
\`\`\`

---

## 9. Xulosa

1. \`else if\` ikkitadan ko'p shartlarni ketma-ket tekshirish uchun ishlatiladi.
2. Shartlar yuqoridan pastga qarab tekshiriladi va BIRINCHI to'g'ri kelgan blok ishlaydi.
3. JavaScript'da \`elseif\` emas, alohida ikkita so'z: \`else if\` deb yoziladi.

Keyingi darsda: Ko'p qiymatli tanlovlar uchun \`switch\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Bahoni aniqlash",
      instruction: "`let score = 92;` berilgan. Agar `score >= 90` bo'lsa `\"A\"`, aks holda agar `score >= 80` bo'lsa `\"B\"`, aks holda `\"C\"` deb chiqaring.",
      startingCode: "let score = 92;\n// if...else if...else yozing\n",
      hint: "if (score >= 90) {\n  console.log(\"A\");\n} else if (score >= 80) {\n  console.log(\"B\");\n} else {\n  console.log(\"C\");\n}",
      test: "if (!code.includes('else if')) return 'else if ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('A'))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Vaqtga qarab salomlashish",
      instruction: "`let hour = 14;` berilgan. Agar `hour < 12` bo'lsa `\"Xayrli tong\"`, aks holda agar `hour < 18` bo'lsa `\"Xayrli kun\"`, qolgan hollarda `\"Xayrli kech\"` deb chiqaring.",
      startingCode: "let hour = 14;\n// if...else if...else yozing\n",
      hint: "if (hour < 12) {\n  console.log(\"Xayrli tong\");\n} else if (hour < 18) {\n  console.log(\"Xayrli kun\");\n} else {\n  console.log(\"Xayrli kech\");\n}",
      test: "if (!code.includes('else if')) return 'else if ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Xayrli kun\"))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "elseif xatosini to'g'rilash",
      instruction: "`elseif` dagi xatoni to'g'rilang (o'rniga `else if` ishlating), toki konsolga `\"Baland\"` chiqsin.",
      startingCode: "let height = 185;\nif (height < 160) {\n  console.log(\"Past\");\n} elseif (height >= 180) {\n  console.log(\"Baland\");\n} else {\n  console.log(\"O'rtacha\");\n}\n",
      hint: "else if (height >= 180) {\n  console.log(\"Baland\");\n}",
      test: "if (code.includes('elseif')) return 'elseif o\\'rniga else if deb probel bilan yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Baland\"))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "if ... else if ... else zanjirida nechta blok bir vaqtda ishlashi mumkin?",
      options: [
        "Faqat bittasi (birinchi to'g'ri kelgani)",
        "Barcha to'g'ri kelgan bloklar",
        "Ikkita blok",
        "Hech biri ishlamaydi"
      ],
      correctAnswer: 0,
      explanation: "Zanjirda yuqoridan pastga tekshirilib, birinchi rost (true) chiqqan bitta blok ishlaydi va qolganlari tashlab yuboriladi."
    },
    {
      id: 2,
      question: "JavaScript'da \"aks holda agar\" operatori qanday yoziladi?",
      options: [
        "elseif",
        "else if",
        "elif",
        "else-if"
      ],
      correctAnswer: 1,
      explanation: "JavaScript har doim ikkita alohida so'z: else if deb yoziladi."
    },
    {
      id: 3,
      question: "Quyidagi kod konsolga nima chiqaradi?\nlet speed = 70;\nif (speed > 100) {\n  console.log(\"Juda tez\");\n} else if (speed > 60) {\n  console.log(\"Me'yorda\");\n} else {\n  console.log(\"Sekin\");\n}",
      options: [
        "\"Juda tez\"",
        "\"Me'yorda\"",
        "\"Sekin\"",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "70 > 100 false, lekin 70 > 60 true bo'lgani uchun \"Me'yorda\" chiqadi."
    }
  ]
};

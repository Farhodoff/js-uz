export const elseLesson = {
  id: "elseLesson",
  title: "else (Aks holda)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz yo'l ayrilishidasiz (ikki yo'lli chorraha):
Yo'l belgisi aytadi: "Agar ruxsatnomangiz bo'lsa — o'ngdagi to'g'ri yo'ldan yuring. **Aks holda** (ruxsatnoma bo'lmasa) — chapdagi aylanma yo'ldan yuring".

Har qanday haydovchi ikkala yo'ldan birdaniga ketolmaydi — u faqat bitta yo'lni tanlashga majbur.

\`else\` (aks holda) — \`if\` sharti bajarilmaganda (\`false\` bo'lganda) muqobil kod blokini ishga tushiruvchi operator hisoblanadi.

---

## 2. Nega kerak?

Oldingi darsda o'rgangan \`if\` operatorimiz faqat shart \`true\` bo'lgandagina ishlar edi. Agar shart bajarilmasa, dastur shunchaki jim o'tib ketardi.
Lekin real dasturlarda shart bajarilmagan holat uchun ham aniq biror narsa ko'rsatish zarur:
- Parol to'g'ri bo'lsa — tizimga kiritish.
- **Aks holda** — "Parol noto'g'ri!" deb ogohlantirish.

\`if ... else\` orqali biz dasturga ikkita aniq yo'ldan birini tanlash imkonini beramiz: shart to'g'ri bo'lsa \`if\`, noto'g'ri bo'lsa \`else\` ishlaydi.

---

## 3. Birinchi misol

Bu kod shart \`true\` bo'lganda \`if\` bloki ishlab, \`else\` bloki tashlab ketilishini ko'rsatadi.

\`\`\`javascript
let userAge = 20;

if (userAge >= 18) {
  console.log("Xush kelibsiz!"); // 20 >= 18 rost (true) bo'lgani uchun ishlaydi
} else {
  console.log("Kirish taqiqlangan!"); // Bu blok tashlab ketiladi
}
\`\`\`

\`\`\`text
// Natija: Xush kelibsiz!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`if (userAge >= 18)\` — shart tekshiriladi (\`20 >= 18\`), natija \`true\`.
- \`{ console.log("Xush kelibsiz!"); }\` — shart \`true\` bo'lgani sababli \`if\` bloki bajariladi.
- \`else { ... }\` — \`if\` ishlagani uchun \`else\` qismi butunlay e'tiborsiz qoldiriladi.
- **Oltin qoida**: \`if\` va \`else\` bloklaridan har doim faqat BITTASI ishlaydi, ikkalasi bir vaqtda hech qachon ishlamaydi.

---

## 5. Qadamma-qadam (trace)

Shart \`true\` bo'lgandagi bajarilish jarayoni:

| Qadam | Kod qatori | Shart / Qiymat | Qaysi yo'l tanlandi? | Natija |
|---|---|---|---|---|
| 1 | \`let userAge = 20;\` | \`userAge = 20\` | — | O'zgaruvchi yaratildi |
| 2 | \`if (userAge >= 18)\` | \`20 >= 18\` → \`true\` | \`if\` bloki tanlandi | \`else\` tashlab ketildi |
| 3 | \`console.log("Xush kelibsiz!");\` | \`if\` ichidagi kod | Bajarildi | Xush kelibsiz! chiqdi |

---

## 6. Yana bitta misol

Bu kod shart \`false\` bo'lganda \`else\` bloki qanday ishlashini ko'rsatadi.

\`\`\`javascript
let userAge = 15;

if (userAge >= 18) {
  console.log("Xush kelibsiz!"); // 15 >= 18 yolg'on (false), tashlab ketiladi
} else {
  console.log("Kirish taqiqlangan!"); // Shart false bo'lgani uchun shu blok ishlaydi
}
\`\`\`

\`\`\`text
// Natija: Kirish taqiqlangan!
\`\`\`

Qator-baqator tahlil:
- \`userAge >= 18\` — \`15 >= 18\` sharti tekshiriladi va natija \`false\` bo'ladi.
- Shart \`false\` bo'lgani sababli \`if\` bloki tashlab ketiladi va to'g'ridan-to'g'ri \`else\` blokiga o'tiladi.
- \`else\` ichidagi \`console.log("Kirish taqiqlangan!");\` bajariladi.

Shart \`false\` bo'lgandagi trace jadvali:
| Qadam | Kod qatori | Shart qiymati | Tanlangan yo'l | Natija |
|---|---|---|---|---|
| 1 | \`let userAge = 15;\` | \`userAge = 15\` | — | O'zgaruvchi saqlandi |
| 2 | \`if (userAge >= 18)\` | \`15 >= 18\` → \`false\` | \`if\` tashlandi, \`else\` tanlandi | \`else\` blokiga o'tildi |
| 3 | \`console.log("Kirish taqiqlangan!");\` | \`else\` kodi | Bajarildi | Kirish taqiqlangan! chiqdi |

---

## 7. Ko'p uchraydigan xatolar

### 1. else dan keyin shart yozishga urinish
❌ Xato kod:
\`\`\`javascript
let age = 15;
if (age >= 18) {
  console.log("Katta");
} else (age < 18) {
  console.log("Kichik");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '{'\` xatoligi yuz beradi. \`else\` o'zidan keyin shart qabul qilmaydi! U "boshqa barcha holatlarda" degan ma'noni beradi.
✅ To'g'ri variant:
\`\`\`javascript
if (age >= 18) {
  console.log("Katta");
} else {
  console.log("Kichik");
}
\`\`\`

### 2. else ni if siz yolg'iz ishlatish
❌ Xato kod:
\`\`\`javascript
else {
  console.log("Xatolik");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token 'else'\` xatoligi yuz beradi. \`else\` yolg'iz ishlatilmaydi, u har doim o'zidan oldingi \`if\` ga bog'langan bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
if (shart) { ... } else { ... }
\`\`\`

### 3. if bilan else o'rtasiga begona kod qo'shib qo'yish
❌ Xato kod:
\`\`\`javascript
if (age >= 18) {
  console.log("Katta");
}
console.log("Tekshirildi"); // Bu kod if va else bog'lanishini buzadi!
else {
  console.log("Kichik");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token 'else'\` xatoligi yuz beradi. \`else\` bevosita \`if\` blokining yopilish qavsidan keyin turishi shart.
✅ To'g'ri variant:
\`\`\`javascript
if (age >= 18) {
  console.log("Katta");
} else {
  console.log("Kichik");
}
console.log("Tekshirildi");
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`score = 65;\` o'zgaruvchisi berilgan. Agar \`score >= 70\` bo'lsa \`"O'tdingiz!"\`, aks holda (\`else\`) \`"Yiqildingiz!"\` deb chiqaruvchi \`if...else\` yozing (konsolga \`"Yiqildingiz!"\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`isLoggedIn = true;\` berilgan. Agar u \`true\` bo'lsa \`"Shaxsiy kabinet"\`, aks holda \`"Tizimga kiring"\` deb chiqaruvchi \`if...else\` yozing.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`else\` dan keyingi ortiqcha shartni olib tashlab, xatoni to'g'rilang:
\`\`\`javascript
let hasMoney = 50;
if (hasMoney >= 100) {
  console.log("Sotib olish");
} else (hasMoney < 100) {
  console.log("Mablag' yetarli emas");
}
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let score = 65;
if (score >= 70) {
  console.log("O'tdingiz!");
} else {
  console.log("Yiqildingiz!");
}
\`\`\`
2.
\`\`\`javascript
let isLoggedIn = true;
if (isLoggedIn) {
  console.log("Shaxsiy kabinet");
} else {
  console.log("Tizimga kiring");
}
\`\`\`
3.
\`\`\`javascript
let hasMoney = 50;
if (hasMoney >= 100) {
  console.log("Sotib olish");
} else { // (hasMoney < 100) olib tashlandi
  console.log("Mablag' yetarli emas");
}
\`\`\`

---

## 9. Xulosa

1. \`else\` (aks holda) — \`if\` sharti \`false\` bo'lganda muqobil kod blokini ishga tushiradi.
2. \`if\` va \`else\` bloklaridan har doim faqat BITTASI ishlaydi.
3. \`else\` o'zidan keyin shart qabul qilmaydi va yolg'iz o'zi ishlatilmaydi.

Keyingi darsda: Bir nechta shartlarni ketma-ket tekshirish uchun \`else if\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "if...else bilan natijani chiqarish",
      instruction: "`let score = 65;` berilgan. Agar `score >= 70` bo'lsa `\"O'tdingiz!\"`, aks holda (`else`) `\"Yiqildingiz!\"` deb konsolga chiqaring.",
      startingCode: "let score = 65;\n// if...else yozing\n",
      hint: "if (score >= 70) {\n  console.log(\"O'tdingiz!\");\n} else {\n  console.log(\"Yiqildingiz!\");\n}",
      test: "if (!code.includes('else')) return 'else ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Yiqildingiz!\"))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Tizimga kirish holatini tekshirish",
      instruction: "`let isLoggedIn = true;` berilgan. Agar u rost bo'lsa `\"Shaxsiy kabinet\"`, aks holda `\"Tizimga kiring\"` deb chiqaring.",
      startingCode: "let isLoggedIn = true;\n// if...else yozing\n",
      hint: "if (isLoggedIn) {\n  console.log(\"Shaxsiy kabinet\");\n} else {\n  console.log(\"Tizimga kiring\");\n}",
      test: "if (!code.includes('else')) return 'else ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Shaxsiy kabinet\"))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "else dagi sintaksis xatosini tuzatish",
      instruction: "`else (hasMoney < 100)` dagi ortiqcha shartni olib tashlang, toki xato tuzatilsin.",
      startingCode: "let hasMoney = 50;\nif (hasMoney >= 100) {\n  console.log(\"Sotib olish\");\n} else (hasMoney < 100) {\n  console.log(\"Mablag' yetarli emas\");\n}\n",
      hint: "else {\n  console.log(\"Mablag' yetarli emas\");\n}",
      test: "if (code.includes('else (')) return 'else dan keyin shart yozilmaydi, qavsni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Mablag' yetarli emas\"))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "else blokidagi kod qachon ishga tushadi?",
      options: [
        "Faqat if sharti false (yolg'on) bo'lganda",
        "Har doim if dan keyin albatta ishlaydi",
        "Faqat if sharti true bo'lganda",
        "Dastur yakunlanganda"
      ],
      correctAnswer: 0,
      explanation: "else bloki faqat va faqat if qavs ichidagi shart false bo'lgan taqdirdagina ishga tushadi."
    },
    {
      id: 2,
      question: "Quyidagi kod konsolga nima chiqaradi?\nlet temperature = 25;\nif (temperature < 20) {\n  console.log(\"Salqin\");\n} else {\n  console.log(\"Iliq\");\n}",
      options: [
        "\"Salqin\"",
        "\"Iliq\"",
        "Ikkala so'z ham chiqadi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "25 < 20 sharti false bo'lgani sababli if tashlab ketiladi va else dagi \"Iliq\" chiqadi."
    },
    {
      id: 3,
      question: "else operatori haqida qaysi fikr to'g'ri?",
      options: [
        "else dan keyin har doim qavsda shart yoziladi",
        "else ni if siz yolg'iz ishlatish mumkin",
        "else o'zidan keyin shart qabul qilmaydi, u faqat if noto'g'ri bo'lganda ishlaydi",
        "else faqat sonlar bilan ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "else o'zidan keyin shart qabul qilmaydi va faqat if sharti bajarilmaganda ishlaydi."
    }
  ]
};

export const letReassign = {
  id: "letReassign",
  title: "let: Qiymatni O'zgartirish",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda ochiladigan quti bor:
- Avval qutiga qizil to'p soldingiz.
- Keyinroq qutini ochib, qizil to'pni oldingiz-da, o'rniga ko'k to'p soldingiz.
- Qutining nomi o'zgarmadi, lekin uning ichidagi narsa yangilandi.

Qiymatni o'zgartirish (re-assignment) — \`let\` bilan yaratilgan o'zgaruvchi ichidagi eski qiymatni yangi qiymat bilan almashtirishdir.

---

## 2. Nega kerak?

Real hayotda ma'lumotlar doim o'zgarib turadi: o'yindagi ball ortadi, harorat ko'tariladi yoki tushadi, insonning yoshi o'zgaradi.

Agar o'zgaruvchi ichidagi qiymatni o'zgartirib bo'lmasa, har bir yangi natija uchun yangi nom o'ylab topishga to'g'ri kelardi. \`let\` bilan yaratilgan o'zgaruvchiga istalgan payt yangi qiymat berish mumkin.

---

## 3. Birinchi misol

Bu kod \`score\` o'zgaruvchisining qiymatini 10 dan 20 ga o'zgartiradi.

\`\`\`javascript
let score = 10; // score nomli qutiga 10 qiymatini solish
score = 20; // Eski qiymat o'rniga 20 qiymatini solish
console.log(score); // Yangi qiymatni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: 20
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let score = 10;\` — \`score\` nomli yangi o'zgaruvchi yaratildi va unga boshlang'ich \`10\` qiymati solindi.
- \`score = 20;\` — \`score\` qutisidagi eski \`10\` o'rniga yangi \`20\` solindi. Muhim: quti allaqachon mavjud bo'lgani uchun bu yerda \`let\` so'zi qayta yozilmaydi!
- \`console.log(score);\` — o'zgaruvchining joriy (oxirgi) qiymati ekranga chiqarildi.

---

## 5. Qadamma-qadam (trace)

| Qadam | Kod qatori | \`score\` qiymati | Izoh |
| :--- | :--- | :--- | :--- |
| 1 | \`let score = 10;\` | \`10\` | O'zgaruvchi yaratildi va unga 10 solindi |
| 2 | \`score = 20;\` | \`20\` | 10 o'chirildi, o'rniga 20 yozildi |
| 3 | \`console.log(score);\` | \`20\` | Ekranga oxirgi qiymat (20) chiqdi |

---

## 6. Yana bitta misol

Bu kod \`message\` o'zgaruvchisidagi matnni yangilaydi.

\`\`\`javascript
let message = "Salom"; // Boshlang'ich matn
message = "Xayr"; // Yangi matn bilan almashtirish
console.log(message); // Yangilangan matnni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: Xayr
\`\`\`

Matnli qiymatlar ham xuddi sonlar kabi yangilanadi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qiymatni o'zgartirishda let so'zini qayta yozish
❌ Xato kod:
\`\`\`javascript
let score = 10;
let score = 20;
\`\`\`
Nima bo'ladi: \`SyntaxError: Identifier 'score' has already been declared\` xatoligi yuz beradi. \`score\` nomli o'zgaruvchi allaqachon e'lon qilingan, \`let\` so'zi faqat birinchi marta yaratishda yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let score = 10;
score = 20;
\`\`\`

### 2. Tenglik tomonlarini adashtirish
❌ Xato kod:
\`\`\`javascript
let score = 10;
20 = score;
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid left-hand side in assignment\` xatoligi beradi. Tenglikning chap tomonida har doim o'zgaruvchi nomi turishi kerak.
✅ To'g'ri variant:
\`\`\`javascript
let score = 10;
score = 20;
\`\`\`

### 3. Qiymatni yangilashdan oldin chop etish
❌ Xato mantiq:
\`\`\`javascript
let count = 5;
console.log(count);
count = 10;
\`\`\`
Nima bo'ladi: Ekranga \`5\` chiqadi. Chunki kod yuqoridan pastga qarab bajariladi va chop etish paytida qiymat hali \`10\` ga o'zgarmagan edi.
✅ To'g'ri variant:
\`\`\`javascript
let count = 5;
count = 10;
console.log(count);
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`let level = 1;\` o'zgaruvchisi qiymatini \`2\` ga o'zgartiring va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`status\` nomli o'zgaruvchining qiymatini \`"kutish"\` dan \`"bajarildi"\` ga almashtiring va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`SyntaxError\` xatosini tuzating:
\`\`\`javascript
let speed = 60;
let speed = 80;
console.log(speed);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let level = 1;
level = 2;
console.log(level);
\`\`\`
2.
\`\`\`javascript
let status = "kutish";
status = "bajarildi";
console.log(status);
\`\`\`
3.
\`\`\`javascript
let speed = 60;
speed = 80;
console.log(speed);
\`\`\`

---

## 9. Xulosa

1. \`let\` bilan yaratilgan o'zgaruvchining qiymatini keyinchalik istalgan vaqtda o'zgartirish mumkin.
2. Qiymatni yangilashda \`let\` so'zi qayta yozilmaydi, faqat \`nom = yangiQiymat;\` deb yoziladi.
3. Yangi qiymat berilganda eski qiymat o'chirilib, o'rniga yangisi yoziladi.

Keyingi darsda: Qiymati hech qachon o'zgarmaydigan o'zgarmaslar (\`const\`) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Sonni o'zgartirish",
      instruction: "`level` nomli o'zgaruvchi yarating (qiymati `1`), keyingi qatorda uning qiymatini `2` ga o'zgartiring va konsolga chiqaring.",
      startingCode: "let level = 1;\n// level qiymatini 2 ga o'zgartiring va chiqaring\n",
      hint: "level = 2;\nconsole.log(level);",
      test: "if (!code.includes('level = 2') && !code.includes('level=2')) return 'level qiymati 2 ga o\\'zgartirilmadi';\nif (code.match(/let\\s+level\\s*=\\s*2/)) return 'Qiymatni o\\'zgartirishda let qayta yozilmaydi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('2'))) return null;\nreturn '2 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Matnni o'zgartirish",
      instruction: "`status` nomli o'zgaruvchi qiymatini `\"kutish\"` dan `\"bajarildi\"` ga o'zgartiring va konsolga chiqaring.",
      startingCode: "let status = \"kutish\";\n// status qiymatini \"bajarildi\" ga almashtiring va chiqaring\n",
      hint: "status = \"bajarildi\";\nconsole.log(status);",
      test: "if (!code.includes('\"bajarildi\"') && !code.includes('\"bajarildi\"')) return 'status qiymati \"bajarildi\" ga o\\'zgartirilmadi';\nif (code.match(/let\\s+status\\s*=\\s*[\"']bajarildi[\"']/)) return 'Qiymatni o\\'zgartirishda let qayta yozilmaydi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('bajarildi'))) return null;\nreturn '\"bajarildi\" matni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Qayta let xatosini tuzatish",
      instruction: "Quyidagi koddagi `let` takrorlanish xatosini tuzating, toki ekranga `80` chiqsin.",
      startingCode: "let speed = 60;\nlet speed = 80;\nconsole.log(speed);\n",
      hint: "let speed = 60;\nspeed = 80;\nconsole.log(speed);",
      test: "if (code.match(/let\\s+speed\\s*=\\s*80/)) return 'Ikkinchi qatordan let so\\'zini olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('80'))) return null;\nreturn '80 soni konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "O'zgaruvchi qiymatini yangilashda `let` so'zi qayta yoziladimi?",
      options: [
        "Ha, har safar yangi qiymat berganda let yozish shart",
        "Yo'q, let faqat qutini birinchi marta yaratishda yoziladi",
        "Faqat matnlar uchun yoziladi",
        "Faqat sonlar uchun yoziladi"
      ],
      correctAnswer: 1,
      explanation: "let yangi o'zgaruvchi e'lon qilish uchun ishlatiladi. Mavjud o'zgaruvchi qiymatini yangilashda esa let yozilmaydi: score = 20;"
    },
    {
      id: 2,
      question: "Quyidagi kod bajarilgandan keyin ekranga nima chiqadi?\n```javascript\nlet score = 10;\nscore = 50;\nconsole.log(score);\n```",
      options: [
        "10",
        "50",
        "10 50",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "score qutisidagi eski 10 qiymati o'chirilib, o'rniga 50 yozildi. Ekranga oxirgi qiymat 50 chiqadi."
    },
    {
      id: 3,
      question: "Nima uchun `let a = 5; let a = 10;` kodi xato beradi?",
      options: [
        "Sonlar noto'g'ri",
        "Nuqta-vergul ortiqcha",
        "Bitta nomli o'zgaruvchini let bilan qayta yaratish mumkin emas",
        "console.log yo'qligi uchun"
      ],
      correctAnswer: 2,
      explanation: "JavaScript'da bir xil nomli o'zgaruvchini ayni sohada let bilan qayta e'lon qilish taqiqlanadi (SyntaxError: Identifier 'a' has already been declared)."
    }
  ]
};

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
    },
    {
      "id": 4,
      "title": "Qiymatni bir marta o'zgartirish",
      "instruction": "`level` o'zgaruvchisiga avval `1`, keyin `2` qiymatini bering. Konsolga `console.log(level);` bilan oxirgi qiymatni chiqaring (2 chiqishi kerak).",
      "startingCode": "// level o'zgaruvchisi: avval 1, keyin 2\n",
      "hint": "let level = 1; level = 2; console.log(level);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2')) return null;\nreturn 'Oxirgi qiymat 2 chiqishi kerak';"
    },
    {
      "id": 5,
      "title": "Hisoblagichni oshirish",
      "instruction": "`count` o'zgaruvchisiga `0` bering, keyin uni `5` ga tenglang va konsolga chiqaring.",
      "startingCode": "// count: avval 0, keyin 5\n",
      "hint": "let count = 0; count = 5; console.log(count);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn 'Konsolga 5 chiqishi kerak';"
    },
    {
      "id": 6,
      "title": "Ketma-ket uchta qiymat",
      "instruction": "`step` o'zgaruvchisiga ketma-ket `10`, `20`, `30` qiymatlarini bering. Har bir o'zgarishdan keyin emas, faqat oxirgisini `console.log(step);` bilan chiqaring (30).",
      "startingCode": "// step: 10 -> 20 -> 30\n",
      "hint": "let step = 10; step = 20; step = 30; console.log(step);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '30')) return null;\nreturn 'Oxirgi qiymat 30 chiqishi kerak';"
    },
    {
      "id": 7,
      "title": "const xatosini topish",
      "instruction": "`const` bilan yozilgan o'zgaruvchini o'zgartirishga urinib ko'ring va xatoni tuzating — `speed` o'zgaruvchisi `let` bilan yozilishi kerak.",
      "startingCode": "const speed = 100;\nspeed = 120;\nconsole.log(speed);\n",
      "hint": "const o'rniga let yozing.",
      "test": "if (/const\\s+speed/.test(code)) return 'speed hali const bilan yozilgan';\nif (!/let\\s+speed/.test(code)) return 'speed let bilan e\\'lon qilinmagan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '120')) return null;\nreturn 'console.log 120 chiqishi kerak';"
    },
    {
      "id": 8,
      "title": "Matnni almashtirish",
      "instruction": "`status` o'zgaruvchisiga avval `offline`, keyin `online` qiymatini bering va konsolga chiqaring.",
      "startingCode": "// status: offline -> online\n",
      "hint": "let status = \"offline\"; status = \"online\";",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('online'))) return null;\nreturn 'Konsolga online chiqishi kerak';"
    },
    {
      "id": 9,
      "title": "O'zgarmas qutini xato qilish (chegara)",
      "instruction": "`pi` ni `const` bilan `3.14` ga tenglang. Keyin `pi = 3` yozing — buni qilmang, aksincha, uni to'g'rilang: const o'rniga let yozib, qiymatni keyin `3` ga o'zgartiring va konsolga chiqaring.",
      "startingCode": "const pi = 3.14;\npi = 3;\nconsole.log(pi);\n",
      "hint": "const ni let ga almashtiring.",
      "test": "if (/const\\s+pi/.test(code)) return 'pi hali const — let kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '3')) return null;\nreturn 'console.log 3 chiqishi kerak';"
    },
    {
      "id": 10,
      "title": "Oxirgi qiymatni topish (chegara)",
      "instruction": "`temp` o'zgaruvchisiga ketma-ket `1`, `2`, `3`, `4`, `5` qiymatlarini bering (besh marta = belgisi). Konsolga oxirgisini chiqaring.",
      "startingCode": "// temp ni 5 marta o'zgartiring\n",
      "hint": "let temp = 1; temp = 2; temp = 3; temp = 4; temp = 5; console.log(temp);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn 'Oxirgi qiymat 5 chiqishi kerak';"
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
    },
    {
      "id": 4,
      "question": "let age = 20; age = 25; dan keyin age nima bo'ladi?",
      "options": [
        "20",
        "25",
        "45",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "let bilan yaratilgan o'zgaruvchi qayta yozilishi mumkin. Yangi qiymat eskisini egallaydi: age endi 25."
    },
    {
      "id": 5,
      "question": "const bilan yaratilgan o'zgaruvchini o'zgartirsa nima bo'ladi?",
      "options": [
        "Xavfsiz o'zgaradi",
        "TypeError (yoki Strict Mode da SyntaxError) beradi",
        "Qiymat avtomatik oshadi",
        "Hech narsa bo'lmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "const — o'zgarmas qutisi. Uni qayta tayinlashga urinish xato beradi: dastur to'xtaydi."
    },
    {
      "id": 6,
      "question": "Qiymatni o'zgartirish uchun qaysi belgi ishlatiladi?",
      "options": [
        "==",
        "=",
        ":",
        "->"
      ],
      "correctAnswer": 1,
      "explanation": "= — tayinlash (berish) belgisi. O'ng tomondagi qiymat chapdagi o'zgaruvchiga solinadi."
    },
    {
      "id": 7,
      "question": "let x = 1; let x = 2; — ikkita let e'lonining farqi nima?",
      "options": [
        "Farq yo'q, har doim ishlaydi",
        "Ikkinchisi x allaqachon mavjudligi uchun xato beradi",
        "Qiymatlar qo'shiladi",
        "Faqat birinchisi ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Bitta blokda bir xil nomni ikki marta e'lon qilib bo'lmaydi. O'zgartirish uchun = ishlatiladi, let qayta yozilmaydi."
    },
    {
      "id": 8,
      "question": "Qaysi biri o'zgarmas qiymat yaratadi?",
      "options": [
        "let",
        "const",
        "Ikkalasi bir xil",
        "Hech biri"
      ],
      "correctAnswer": 1,
      "explanation": "const qutisi yopiq qulf: qiymat bir marta solinadi va keyin o'zgartirilmaydi."
    },
    {
      "id": 9,
      "question": "let score = 10; score = score + 5; dan keyin score nima bo'ladi?",
      "options": [
        "10",
        "15",
        "5",
        "Xato"
      ],
      "correctAnswer": 1,
      "explanation": "O'ng tomondagi score (10) olinadi, unga 5 qo'shiladi (15) va natija qayta o'sha o'zgaruvchiga solinadi."
    },
    {
      "id": 10,
      "question": "O'zgaruvchi qayta yozilsa eski qiymat nima bo'ladi?",
      "options": [
        "Saqlanib qoladi",
        "Yo'qoladi — qutida faqat oxirgi qiymat qoladi",
        "Arxivlanadi",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "Qutiga yangi narsa solinsa, eskisi o'chadi. Agar eski qiymat kerak bo'lsa, uni boshqa o'zgaruvchida saqlash kerak."
    },
    {
      "id": 11,
      "question": "const speed = 100; speed = 120; kodida xato qayerda?",
      "options": [
        "120 ga o'zgartirishda — const o'zgartirilmaydi",
        "Qo'shtirnoq yo'q",
        "console.log yo'q",
        "Xato yo'q"
      ],
      "correctAnswer": 0,
      "explanation": "const qiymati o'zgarmas. O'zgartirish kerak bo'lsa, dastur boshidanoq let ishlatish kerak."
    },
    {
      "id": 12,
      "question": "Qachon let, qachon const ishlatiladi?",
      "options": [
        "Har doim const",
        "Qiymat o'zgaradi — let, o'zgarmaydi — const",
        "Har doim let",
        "Farqi yo'q"
      ],
      "correctAnswer": 1,
      "explanation": "Xavfsiz qoida: avval const yozing, qiymat o'zgarishi kerakligini bilsangiz let ga o'ting. Bu xatolardan himoya qiladi."
    }
  ]
};

export const constLesson = {
  id: "constLesson",
  title: "const: O'zgarmas Qiymatlar",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda shaffof, lekin mahkam muhrlangan quti bor:
- Siz qutiga biror narsa solasiz va qopqog'ini muhrlaysiz.
- Uning ichidagi narsani hamma ko'rishi va ishlatishi mumkin, lekin uni ochib, ichidagi narsani boshqasiga almashtirib bo'lmaydi.

\`const\` (constant — o'zgarmas) — qiymati dastur davomida hech qachon o'zgarmaydigan maxsus o'zgaruvchi yaratish kalit so'zidir.

### \`let\` bilan farqi:
- \`let\` — ochiladigan quti (ichidagi qiymatni keyin o'zgartirish mumkin).
- \`const\` — muhrlangan quti (ichidagi qiymatni keyin umuman o'zgartirib bo'lmaydi).

---

## 2. Nega kerak?

Dasturlarda ba'zi ma'lumotlar hech qachon o'zgarmasligi kerak (masalan, haftadagi kunlar soni, tug'ilgan yil yoki matematik qoidalar).

Agar \`let\` ishlatsak, adashib ularni o'zgartirib yuborishimiz mumkin. \`const\` ishlatilsa, JavaScript qiymatni qulflaydi va uni tasodifiy xatolardan himoya qiladi.

---

## 3. Birinchi misol

Bu kod \`birthYear\` nomli o'zgarmas yaratadi va uni konsolga chiqaradi.

\`\`\`javascript
const birthYear = 2005; // birthYear nomli muhrlangan quti yaratish
console.log(birthYear); // Qiymatni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: 2005
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const\` — o'zgarmas (constant) yaratish buyrug'i.
- \`birthYear\` — o'zgarmasning nomi (ingliz tilida).
- \`=\` — tayinlash belgisi (qiymat solish).
- \`2005\` — saqlanadigan qiymat (son).
- \`;\` — qator tugaganini bildiruvchi belgi.
- \`console.log(birthYear);\` — \`birthYear\` qiymatini ekranga chiqarish.

---

## 5. Yana bitta misol

Bu kod \`country\` nomli o'zgarmas matn yaratadi va uni konsolga chiqaradi.

\`\`\`javascript
const country = "O'zbekiston"; // O'zgarmas matn yaratish
console.log(country); // Ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: O'zbekiston
\`\`\`

---

## 6. Ko'p uchraydigan xatolar

### 1. const qiymatini o'zgartirishga urinish
❌ Xato kod:
\`\`\`javascript
const birthYear = 2005;
birthYear = 2006;
\`\`\`
Nima bo'ladi: \`TypeError: Assignment to constant variable.\` xatoligi yuz beradi. \`const\` bilan yaratilgan qutiga qayta qiymat berish taqiqlanadi.
✅ To'g'ri variant (agar qiymat o'zgarishi kerak bo'lsa, \`let\` ishlatiladi):
\`\`\`javascript
let birthYear = 2005;
birthYear = 2006;
\`\`\`

### 2. const ni qiymatsiz (bo'sh) e'lon qilish
❌ Xato kod:
\`\`\`javascript
const city;
city = "Toshkent";
\`\`\`
Nima bo'ladi: \`SyntaxError: Missing initializer in const declaration\` xatoligi yuz beradi. \`const\` yaratilgan paytning o'zidayoq unga qiymat berilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
const city = "Toshkent";
\`\`\`

### 3. const ni qayta e'lon qilish
❌ Xato kod:
\`\`\`javascript
const count = 10;
const count = 20;
\`\`\`
Nima bo'ladi: \`SyntaxError: Identifier 'count' has already been declared\` xatoligi beradi.
✅ To'g'ri variant:
\`\`\`javascript
const count = 10;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`daysInWeek\` nomli \`const\` yarating, unga \`7\` qiymatini bering va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`planet\` nomli \`const\` yarating, unga \`"Yer"\` matnini bering va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`TypeError\` xatosini tuzating (qiymat keyin o'zgarishi kerak):
\`\`\`javascript
const score = 50;
score = 100;
console.log(score);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
const daysInWeek = 7;
console.log(daysInWeek);
\`\`\`
2.
\`\`\`javascript
const planet = "Yer";
console.log(planet);
\`\`\`
3.
\`\`\`javascript
let score = 50; // const o'rniga let ishlatiladi
score = 100;
console.log(score);
\`\`\`

---

## 8. Xulosa

1. \`const\` — qiymati dastur davomida o'zgarmaydigan o'zgarmaslar yaratish uchun ishlatiladi.
2. \`const\` ga qayta qiymat berilsa, \`TypeError: Assignment to constant variable.\` xatosi yuz beradi.
3. Agar qiymat keyin o'zgarishi kerak bo'lsa \`let\`, hech qachon o'zgarmasligi kerak bo'lsa \`const\` ishlatiladi.

Keyingi darsda: JavaScript'da asosiy ma'lumot turlari (string va number) bilan batafsil tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Sonli const yaratish",
      instruction: "`daysInWeek` nomli `const` yarating, unga `7` qiymatini bering va `console.log(daysInWeek);` orqali chiqaring.",
      startingCode: "// daysInWeek nomli const yarating va chiqaring\n",
      hint: "const daysInWeek = 7;\nconsole.log(daysInWeek);",
      test: "if (!code.includes('const')) return 'const kalit so\\'zi ishlatilmadi';\nif (!code.includes('daysInWeek')) return 'daysInWeek nomli o\\'zgarmas topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('7'))) return null;\nreturn '7 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Matnli const yaratish",
      instruction: "`planet` nomli `const` yarating, unga `\"Yer\"` matnini bering va konsolga chiqaring.",
      startingCode: "// planet nomli const yarating va chiqaring\n",
      hint: "const planet = \"Yer\";\nconsole.log(planet);",
      test: "if (!code.includes('const')) return 'const kalit so\\'zi ishlatilmadi';\nif (!code.includes('planet')) return 'planet nomli o\\'zgarmas topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Yer'))) return null;\nreturn '\"Yer\" matni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "TypeError xatosini tuzatish",
      instruction: "`const score = 50;` kodida `score` keyinroq `100` ga o'zgarishi kerak. `TypeError` bermasligi uchun uni to'g'ri kalit so'z bilan e'lon qiling.",
      startingCode: "const score = 50;\nscore = 100;\nconsole.log(score);\n",
      hint: "let score = 50;\nscore = 100;\nconsole.log(score);",
      test: "if (code.includes('const score')) return 'Qiymati o\\'zgaradigan o\\'zgaruvchiga const emas, let ishlatiladi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('100'))) return null;\nreturn '100 soni konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "const bilan mamlakat nomi",
      "instruction": "`country` nomli `const` yarating, unga `\"O'zbekiston\"` matnini bering va konsolga chiqaring.",
      "startingCode": "// country constini yarating\n",
      "hint": "const country = \"O'zbekiston\"; console.log(country);",
      "test": "if (!/const\\s+country/.test(code)) return 'country const bilan e\\'lon qilinmagan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"O'zbekiston\"))) return null;\nreturn 'Ozbekiston matni chiqishi kerak';"
    },
    {
      "id": 5,
      "title": "const xatosini topish",
      "instruction": "`const year = 2026; year = 2027;` kodida xato bor — const o'zgarmaydi. Qiymat o'zgarishi kerak, shuning uchun kalit so'zni to'g'rilang.",
      "startingCode": "const year = 2026;\nyear = 2027;\nconsole.log(year);\n",
      "hint": "const o'rniga let yozing.",
      "test": "if (/const\\s+year/.test(code)) return 'year hali const — let kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2027')) return null;\nreturn 'console.log 2027 chiqishi kerak';"
    },
    {
      "id": 6,
      "title": "Ikki const birga",
      "instruction": "`capital` (\"Toshkent\") va `area` (174000) constlarini yarating va ikkalasini ham konsolga chiqaring.",
      "startingCode": "// Ikkala constni yarating\n",
      "hint": "const capital = \"Toshkent\"; const area = 174000; so'ng ikkalasini chiqaring.",
      "test": "if (!/const\\s+capital/.test(code)) return 'capital consti topilmadi';\nif (!/const\\s+area/.test(code)) return 'area consti topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst flat = out.join(' ');\nif (!flat.includes('Toshkent')) return 'Toshkent chiqmadi';\nif (!flat.includes('174000')) return '174000 chiqmadi';\nreturn null;"
    },
    {
      "id": 7,
      "title": "Nom xatosini to'g'rilash",
      "instruction": "`const 2nd = \"ikkinchi\";` kodida nom raqam bilan boshlangan. Nomni to'g'rilang (masalan, `second`) va konsolga chiqaring.",
      "startingCode": "const 2nd = \"ikkinchi\";\nconsole.log(2nd);\n",
      "hint": "Nom harf bilan boshlanishi kerak: const second = ...",
      "test": "if (/const\\s+2/.test(code)) return 'Nom hali raqam bilan boshlanmoqda';\nif (!/const\\s+second/.test(code)) return 'second nomi bilan const e\\'lon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('ikkinchi'))) return null;\nreturn 'ikkinchi matni chiqishi kerak';"
    },
    {
      "id": 8,
      "title": "const dan nusxa olish",
      "instruction": "`const base = 10;` qiymatidan foydalanib, `copy` nomli `let` o'zgaruvchiga nusxa oling va `console.log(copy);` bilan chiqaring (10 chiqishi kerak).",
      "startingCode": "const base = 10;\n// copy o'zgaruvchisini yarating\n",
      "hint": "let copy = base; console.log(copy);",
      "test": "if (!/let\\s+copy\\s*=\\s*base/.test(code)) return 'copy = base nusxasi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '10')) return null;\nreturn 'console.log 10 chiqishi kerak';"
    },
    {
      "id": 9,
      "title": "Bir constni ikki marta ishlatish",
      "instruction": "`brand` constiga `\"Audi\"` bering va uni ikki alohida console.log bilan ikki marta chiqaring.",
      "startingCode": "// brand consti va ikki console.log\n",
      "hint": "const brand = \"Audi\"; keyin console.log(brand); ikki marta.",
      "test": "if (!/const\\s+brand/.test(code)) return 'brand consti topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst count = out.filter(m => m.includes('Audi')).length;\nif (count === 2) return null;\nreturn 'Audi ikki marta chiqishi kerak, hozir ' + count + ' marta';"
    },
    {
      "id": 10,
      "title": "Qaysi kalit so'z to'g'ri (chegara)",
      "instruction": "Uchta o'zgaruvchi yarating: `const birthYear = 1990;` (o'zgarmaydi), `let age = 30;` (o'zgaradi), `const userName = \"Ali\";` (o'zgarmaydi). Ikkalasini ham konsolga chiqaring (age va userName).",
      "startingCode": "// Uchta o'zgaruvchi: birthYear, age, userName\n",
      "hint": "birthYear va userName const, age let bo'lsin.",
      "test": "if (!/const\\s+birthYear\\s*=\\s*1990/.test(code)) return 'birthYear = 1990 const bo\\'lishi kerak';\nif (!/let\\s+age\\s*=\\s*30/.test(code)) return 'age = 30 let bo\\'lishi kerak';\nif (!/const\\s+userName\\s*=\\s*[\"\\']Ali[\"\\']/.test(code)) return 'userName const bo\\'lishi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst flat = out.join(' ');\nif (!flat.includes('30')) return 'age (30) chiqmadi';\nif (!flat.includes('Ali')) return 'userName (Ali) chiqmadi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`const` ning `let` dan asosiy farqi nimada?",
      options: [
        "const faqat matn saqlaydi, let faqat son",
        "const bilan yaratilgan qiymatni keyinchalik o'zgartirib bo'lmaydi",
        "const konsolga chop etilmaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "const (constant) — muhrlangan quti. Uning qiymatini dastur davomida keyin o'zgartirib bo'lmaydi."
    },
    {
      id: 2,
      question: "Quyidagi kod bajarilsa nima sodir bo'ladi?\n```javascript\nconst pi = 3.14;\npi = 3.15;\nconsole.log(pi);\n```",
      options: [
        "Ekranga 3.15 chiqadi",
        "Ekranga 3.14 chiqadi",
        "TypeError xatoligi yuz beradi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 2,
      explanation: "const o'zgaruvchisining qiymatini o'zgartirishga urinish TypeError: Assignment to constant variable xatosiga olib keladi."
    },
    {
      id: 3,
      question: "Nima uchun `const year;` deb yozish xato hisoblanadi?",
      options: [
        "year so'zi taqiqlangan",
        "const e'lon qilinayotganda darhol unga qiymat berilishi shart",
        "Nuqta-vergul xato qo'yilgan",
        "Faqat katta harflar bilan yozilishi kerak"
      ],
      correctAnswer: 1,
      explanation: "const muhrlangan quti bo'lgani uchun uni bo'sh qoldirib bo'lmaydi, yaratish vaqtida darhol qiymat berish shart (Missing initializer in const declaration)."
    },
    {
      "id": 4,
      "question": "const nima qiladi?",
      "options": [
        "O'zgaruvchi yaratadi, qiymat keyin o'zgaradi",
        "O'zgaruvchi yaratadi, qiymat qayta o'zgartirilmaydi",
        "Faqat matn saqlaydi",
        "Kodni o'chiradi"
      ],
      "correctAnswer": 1,
      "explanation": "const — o'zgarmas qutisi: qiymat bir marta solinadi va keyin almashtirilmaydi."
    },
    {
      "id": 5,
      "question": "const x = 5; x = 10; kodida nima bo'ladi?",
      "options": [
        "x endi 10 bo'ladi",
        "TypeError xato beradi va dastur to'xtaydi",
        "15 bo'ladi",
        "Hech narsa bo'lmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "const qiymatini qayta tayinlash mumkin emas — JavaScript bunga yo'l qo'ymaydi."
    },
    {
      "id": 6,
      "question": "Qachon const, qachon let ishlatiladi?",
      "options": [
        "Har doim let",
        "Qiymat o'zgaradi — let, o'zgarmaydi — const",
        "Har doim const",
        "Farqi yo'q"
      ],
      "correctAnswer": 1,
      "explanation": "Avval const yozish xavfli: qiymat o'zgarishi aniqlansa, let qo'llanadi. Bu xatolardan asraydi."
    },
    {
      "id": 7,
      "question": "const nomi qanday bo'lishi kerak?",
      "options": [
        "Raqam bilan boshlanishi",
        "Ingliz tilida, bo'shliqsiz, harf bilan boshlanishi",
        "Katta harflardan iborat",
        "Qo'shtirnoq ichida"
      ],
      "correctAnswer": 1,
      "explanation": "Nom qoidalari let bilan bir xil: harf (yoki _ $) bilan boshlanadi, bo'shliqsiz yoziladi."
    },
    {
      "id": 8,
      "question": "const yordamida bir nechta qiymat saqlansa bo'ladimi?",
      "options": [
        "Ha, cheksiz",
        "Yo'q — bitta const bitta qiymat saqlaydi",
        "Faqat son",
        "Faqat ikkita"
      ],
      "correctAnswer": 1,
      "explanation": "Har bir qiymat uchun alohida const yoziladi. Ikkalasini birlashtirish uchun ikki const kerak."
    },
    {
      "id": 9,
      "question": "const bilan yaratilgan qiymatni boshqa o'zgaruvchiga ko'chirsa bo'ladimi?",
      "options": [
        "Yo'q, butunlay taqiqlangan",
        "Ha — yangi o'zgaruvchi const emas, let bo'lsa o'zgaradi",
        "Faqat console.log da",
        "Faqat matnlar uchun"
      ],
      "correctAnswer": 1,
      "explanation": "const qiymati boshqa joyga ko'chirilishi mumkin. Kopiya let bo'lsa, keyin o'zgartirsa bo'ladi."
    },
    {
      "id": 10,
      "question": "const day = \"Dushanba\"; console.log(day); natijasi nima?",
      "options": [
        "day",
        "Dushanba",
        "const",
        "Xato"
      ],
      "correctAnswer": 1,
      "explanation": "console.log o'zgaruvchi nomini yozsangiz, uning ichidagi qiymatni chiqaradi."
    },
    {
      "id": 11,
      "question": "const ni let bilan almashtirib yuborsak nima yo'qotamiz?",
      "options": [
        "Hech narsa yo'qotmaymiz",
        "Xavfsizlik — endi qiymat tasodifan o'zgarishi mumkin",
        "Tezlik",
        "Nom"
      ],
      "correctAnswer": 1,
      "explanation": "const noiborat himoya: qiymat e'lon qilingan joyda qoladi. Uni let qilsangiz, xato bilan o'zgarishi mumkin."
    },
    {
      "id": 12,
      "question": "Qaysi kod to'g'ri ishlaydi?",
      "options": [
        "const n = 1; n = 2;",
        "const n = 1; console.log(n);",
        "const n; n = 1;",
        "const = 1;"
      ],
      "correctAnswer": 1,
      "explanation": "const darhol qiymat bilan e'lon qilinadi (const n = 1) va o'zgartirilmaydi, lekin o'qib ishlatish mumkin."
    }
  ]
};

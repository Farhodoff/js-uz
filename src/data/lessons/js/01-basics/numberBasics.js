export const numberBasics = {
  id: "numberBasics",
  title: "Number: Butun va O'nlik Sonlar",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz do'kondagi elektron taroziga qaraysiz.
Tarozi butun narsalarni ham (masalan, \`3\` dona tarvuz), o'nlik kasr ko'rinishidagi og'irlikni ham (masalan, \`2.5\` kg olma) sonlar bilan aniq ko'rsatadi.

Dasturlashda sonlar xuddi shu tarozidagi raqamlar kabi ishlaydi.

Number (son) — JavaScript'da butun va o'nlik (kasr) sonlarni ifodalash uchun ishlatiladigan asosiy ma'lumot turidir.

### JavaScript'da sonlarning 2 xil ko'rinishi bor:
1. **Butun sonlar (integers):** masalan, \`10\`, \`42\`, \`0\`, \`-5\`.
2. **O'nlik sonlar (decimals):** masalan, \`3.14\`, \`0.75\`, \`9.99\`.

> **Muhim qoida:** O'nlik sonlarda kasr qism vergul bilan emas, faqat nuqta (\`.\`) bilan ajratiladi!

---

## 2. Nega kerak?

Agar sonlarni qo'shtirnoq ichida yozsak (\`"25"\`), kompyuter ularni son deb emas, oddiy matn deb tushunadi.

Number turi sonlarni haqiqiy matematik miqdor sifatida kompyuter xotirasida saqlash imkonini beradi.

---

## 3. Birinchi misol

Bu kod butun son va o'nlik son yaratib, ularni konsolga chiqaradi.

\`\`\`javascript
let age = 20; // Butun son
let price = 19.99; // O'nlik son (nuqta bilan)
console.log(age);
console.log(price);
\`\`\`

\`\`\`text
// Natija:
20
19.99
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let age = 20;\` — \`age\` nomli o'zgaruvchiga \`20\` butun soni berildi. Sonlar har doim qo'shtirnoqsiz yoziladi.
- \`let price = 19.99;\` — \`price\` nomli o'zgaruvchiga \`19.99\` o'nlik soni berildi. Butun va kasr qism nuqta (\`.\`) bilan ajratildi.
- \`console.log(age);\` va \`console.log(price);\` — sonlar konsolga chop etildi.

---

## 5. Yana bitta misol

Bu kod manfiy va noldan kichik o'nlik sonlarni konsolga chiqaradi.

\`\`\`javascript
let temperature = -10; // Manfiy butun son
let discount = 0.5; // Noldan kichik o'nlik son
console.log(temperature);
console.log(discount);
\`\`\`

\`\`\`text
// Natija:
-10
0.5
\`\`\`

---

---

## 5.1. Juda katta sonlar: BigInt

Oddiy \`number\` 2^53 dan katta sonni aniq saqlolmaydi — oxirgi raqamlar yashirin o'zgaradi:

\`\`\`javascript
console.log(9999999999999999);   // 10000000000000000 (xato!)
console.log(9999999999999999n);  // 9999999999999999n (aniq!)
\`\`\`

Raqam oxiriga \`n\` qo'shsangiz — BigInt (butun sonlarning kengaytirilgan turi) bo'ladi. U faqat juda katta butun sonlar uchun ishlatiladi: bank hisoblari, kriptovalyuta, ilmiy hisob-kitoblar.

\`\`\`javascript
console.log(10n + 5n);  // 15n
\`\`\`

Muhim qoida: \`BigInt\` ni oddiy \`number\` bilan aralashtirib bo'lmaydi — \`10n + 5\` kabi yozsangiz xato beradi. Ikkalasini aralashtirish uchun maxsus aylantirish kerak.


## 6. Ko'p uchraydigan xatolar

### 1. O'nlik sonda nuqta o'rniga vergul ishlatish
❌ Xato kod:
\`\`\`javascript
let price = 19,99;
console.log(price);
\`\`\`
Nima bo'ladi: Vergul JavaScript'da maxsus operator hisoblanadi. O'nlik son hosil bo'lmaydi va xato berishi mumkin.
✅ To'g'ri variant:
\`\`\`javascript
let price = 19.99;
console.log(price);
\`\`\`

### 2. Sonni qo'shtirnoqqa olib qo'yish
❌ Xato tushuncha:
\`\`\`javascript
let age = "25";
\`\`\`
Nima bo'ladi: \`age\` son (Number) emas, balki matn (String) bo'lib qoladi.
✅ To'g'ri variant:
\`\`\`javascript
let age = 25;
\`\`\`

### 3. O'nlik sonda ikkita nuqta ishlatish
❌ Xato kod:
\`\`\`javascript
let version = 1.2.3;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected number\` xatoligi yuz beradi. Sonda faqat bitta nuqta bo'lishi mumkin. Dastur versiyalari matn bo'lishi kerak.
✅ To'g'ri variant:
\`\`\`javascript
let version = "1.2.3";
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`year\` nomli o'zgaruvchi yarating, unga joriy yilni butun son ko'rinishida bering va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`pi\` nomli \`const\` yarating, unga \`3.14\` o'nlik sonini bering va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi vergul xatosini to'g'rilang:
\`\`\`javascript
let weight = 65,5;
console.log(weight);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let year = 2026;
console.log(year);
\`\`\`
2.
\`\`\`javascript
const pi = 3.14;
console.log(pi);
\`\`\`
3.
\`\`\`javascript
let weight = 65.5; // vergul o'rniga nuqta qo'yiladi
console.log(weight);
\`\`\`

---

## 8. Xulosa

1. Number — butun va o'nlik sonlarni ifodalaydigan ma'lumot turi.
2. Sonlar har doim qo'shtirnoqsiz yoziladi.
3. O'nlik sonlarda kasr qism nuqta (\`.\`) bilan ajratiladi.

Keyingi darsda: Sonlar ustida arifmetik amallar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Butun son yaratish",
      instruction: "`year` nomli o'zgaruvchi yarating (`let` bilan), unga `2026` sonini bering va `console.log(year);` orqali chiqaring.",
      startingCode: "// year o'zgaruvchisini yarating va chiqaring\n",
      hint: "let year = 2026;\nconsole.log(year);",
      test: "if (code.includes('\"2026\"') || code.includes(\"'2026'\")) return 'Sonni qo\\'shtirnoqsiz yozing';\nif (!code.includes('year')) return 'year nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('2026'))) return null;\nreturn '2026 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "O'nlik son yaratish",
      instruction: "`pi` nomli `const` yarating, unga `3.14` o'nlik sonini bering va konsolga chiqaring.",
      startingCode: "// pi nomli const yarating va chiqaring\n",
      hint: "const pi = 3.14;\nconsole.log(pi);",
      test: "if (code.includes('\"3.14\"') || code.includes(\"'3.14'\")) return 'Sonni qo\\'shtirnoqsiz yozing';\nif (code.includes('3,14')) return 'Vergul o\\'rniga nuqta ishlating: 3.14';\nif (!code.includes('const')) return 'const kalit so\\'zi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('3.14'))) return null;\nreturn '3.14 soni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Vergul xatosini to'g'rilash",
      instruction: "`weight = 65,5;` dagi vergulni nuqta bilan almashtiring, toki konsolga `65.5` chiqsin.",
      startingCode: "let weight = 65,5;\nconsole.log(weight);\n",
      hint: "let weight = 65.5;\nconsole.log(weight);",
      test: "if (code.includes('65,5')) return 'Vergul o\\'rniga nuqta qo\\'ying';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('65.5'))) return null;\nreturn '65.5 soni konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "BigInt yaratish",
      "instruction": "`big` nomli o'zgaruvchiga `12345678901234567890n` qiymatli BigInt yozing va konsolga chiqaring.",
      "startingCode": "// big o'zgaruvchisiga BigInt yozing\n",
      "hint": "let big = 12345678901234567890n;\nconsole.log(big);",
      "test": "if (!/\\d+n\\b/.test(code)) return 'Raqam oxiriga n qoshilmadi (BigInt emas)';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => typeof x[0] === 'bigint' && String(x[0]) === '12345678901234567890')) return null;\nreturn 'BigInt 12345678901234567890 konsolga chiqmadi';"
    },
    {
      "id": 5,
      "title": "Ikkita sonni bitta chiqarish",
      "instruction": "`age = 20` va `price = 19.99` o'zgaruvchilari berilgan. Ikkalasini AYNAN BIRTA `console.log` bilan chiqaring (konsolda `20 19.99` ko'rinishida).",
      "startingCode": "let age = 20;\nlet price = 19.99;\n// Ikkalasini bitta console.log bilan chiqaring\n",
      "hint": "console.log(age, price);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'BIRTA console.log bilan chiqaring';\nif (out[0].trim() === '20 19.99') return null;\nreturn \"Natija '20 19.99' bolishi kerak\";"
    },
    {
      "id": 6,
      "title": "Ikkinchi nuqta xatosini tuzatish",
      "instruction": "`1.2.3` son sifatida yozilgan va SyntaxError bermoqda. Uni matn qiling: konsolga `1.2.3` chiqsin.",
      "startingCode": "let version = 1.2.3;\nconsole.log(version);\n",
      "hint": "let version = \"1.2.3\"; — qo'shtirnoqqa oling.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '1.2.3')) return null;\nreturn \"Natija '1.2.3' bolishi kerak\";"
    },
    {
      "id": 7,
      "title": "Qo'shtirnoqdagi sonni songa aylantirish",
      "instruction": "`score` hozir matn (`\"95\"`). Uni qo'shtirnoqsiz, haqiqiy son ko'rinishida yozing va konsolga chiqaring.",
      "startingCode": "let score = \"95\";\nconsole.log(score);\n",
      "hint": "let score = 95;",
      "test": "if (code.includes('\"95\"') || code.includes(\"'95'\")) return \"Qo'shtirnoqni olib tashlang\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return 'Qiymat chiqmadi';\nconst v = out[out.length - 1][0];\nif (typeof v !== 'number') return 'Qiymat son (number) emas';\nif (v === 95) return null;\nreturn 'Natija 95 bolishi kerak';"
    },
    {
      "id": 8,
      "title": "Manfiy o'nlik son",
      "instruction": "`delta` nomli o'zgaruvchi yarating, unga `-0.25` manfiy o'nlik sonini bering va konsolga chiqaring.",
      "startingCode": "// delta o'zgaruvchisini yarating\n",
      "hint": "let delta = -0.25;\nconsole.log(delta);",
      "test": "if (!code.includes('delta')) return \"delta o'zgaruvchisi topilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return 'Qiymat chiqmadi';\nconst v = out[out.length - 1][0];\nif (typeof v !== 'number') return 'Qiymat son emas';\nif (v === -0.25) return null;\nreturn 'Natija -0.25 bolishi kerak';"
    },
    {
      "id": 9,
      "title": "BigInt bilan sonni aralashtirish xatosi",
      "instruction": "`10n + 5` xato bermoqda — BigInt va oddiy son aralashtirib bo'lmaydi. Sonni `5n` ga o'zgartiring, konsolda `15` chiqsin.",
      "startingCode": "console.log(10n + 5);\n",
      "hint": "console.log(10n + 5n);",
      "test": "if (!code.includes('10n') || !code.includes('5n')) return 'BigInt bilan yozing: 10n + 5n';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '15')) return null;\nreturn 'Natija 15 bolishi kerak';"
    },
    {
      "id": 10,
      "title": "Uchta xato bitta kodda (chegara)",
      "instruction": "Uchta xato bor: `a` vergul bilan yozilgan (natija `1.5` bo'lsin), `b` ikkita nuqta bilan (natija matn `2.3.4` bo'lsin), `c` qo'shtirnoqda (natija son `7` bo'lsin). Hammasini tuzatib uchtasini ham chiqaring.",
      "startingCode": "let a = 1,5;\nlet b = 2.3.4;\nlet c = \"7\";\nconsole.log(a);\nconsole.log(b);\nconsole.log(c);\n",
      "hint": "a = 1.5, b = \"2.3.4\", c = 7 — shunday qiling.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length < 3) return 'Uchala qiymatni ham chiqaring';\nconst vals = out.map(x => String(x[0])).join('|');\nconst types = out.map(x => typeof x[0]).join('|');\nif (types !== 'number|string|number') return 'a va c son, b matn bolishi kerak';\nif (vals !== '1.5|2.3.4|7') return \"Natija: 1.5, 2.3.4 va 7 bolishi kerak\";\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da o'nlik (kasr) sonlar qanday yoziladi?",
      options: [
        "Vergul bilan: 19,99",
        "Nuqta bilan: 19.99",
        "Teskari chiziq bilan: 19/99",
        "Faqat qo'shtirnoqda: \"19.99\""
      ],
      correctAnswer: 1,
      explanation: "JavaScript'da o'nlik sonlar har doim nuqta (.) bilan yoziladi: 19.99"
    },
    {
      id: 2,
      question: "`let x = 25;` va `let y = \"25\";` o'rtasidagi farq nima?",
      options: [
        "Hech qanday farqi yo'q",
        "x — son (Number), y esa matn (String)",
        "x — matn, y esa son",
        "y da xatolik bor"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoqsiz yozilgan 25 — son (Number). Qo'shtirnoqdagi \"25\" esa matn (String) hisoblanadi."
    },
    {
      id: 3,
      question: "Quyidagi sonlardan qaysi biri JavaScript'da to'g'ri yozilgan?",
      options: [
        "let price = 12,50;",
        "let price = 12.50;",
        "let price = 12..50;",
        "let price = .12.50;"
      ],
      correctAnswer: 1,
      explanation: "O'nlik sonlar butun va kasr qismi bitta nuqta bilan ajratilgan holda yoziladi: 12.50"
    },
    {
      "id": 4,
      "question": "BigInt son qanday yoziladi?",
      "options": [
        "Raqam oxiriga n qo'shiladi: 100n",
        "Qo'shtirnoq ichida: \"100n\"",
        "Vergul bilan: 100,0n",
        "Raqam oxiriga z qo'shiladi"
      ],
      "correctAnswer": 0,
      "explanation": "Raqam oxiriga `n` harfi qo'yiladi: `100n` — bu BigInt. Qo'shtirnoq ichidagi \"100n\" esa oddiy matn."
    },
    {
      "id": 5,
      "question": "`10n + 5` ifodasi nima qiladi?",
      "options": [
        "15 chiqadi",
        "15n chiqadi",
        "TypeError xatoligi beradi",
        "105 chiqadi"
      ],
      "correctAnswer": 2,
      "explanation": "BigInt (number) bilan aralashtirib bo'lmaydi — TypeError yuz beradi. Ikkalasi ham BigInt bo'lishi kerak: `10n + 5n`."
    },
    {
      "id": 6,
      "question": "`let x = -5; let y = 0.5;` haqida to'g'ri javob qaysi?",
      "options": [
        "Ikkalasi ham butun son",
        "x manfiy butun son, y noldan kichik o'nlik son",
        "x matn, y son",
        "Ikkalasi ham yozuv xatosi"
      ],
      "correctAnswer": 1,
      "explanation": "Manfiy belgi sonni butun qilib saqlaydi: -5 butun son. 0.5 esa nuqta bilan yozilgan o'nlik (kasr) son."
    },
    {
      "id": 7,
      "question": "`let price = 19,99;` kodida nima bo'ladi?",
      "options": [
        "19.99 o'nlik son hosil bo'ladi",
        "Vergul operator sifatida talqin qilinadi, to'g'ri o'nlik son bo'lmaydi",
        "price matn bo'lib qoladi",
        "Qavs yopilmagan xatosi beriladi"
      ],
      "correctAnswer": 1,
      "explanation": "JavaScript'da vergul — boshqa ma'nosi bor maxsus belgi. O'nlik son uchun faqat nuqta ishlatiladi: `19.99`."
    },
    {
      "id": 8,
      "question": "`let version = 1.2.3;` qanday xato beradi?",
      "options": [
        "TypeError",
        "SyntaxError: Unexpected number",
        "ReferenceError",
        "Hech qanday xato bermaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Sonda faqat bitta nuqta bo'lishi mumkin. Ikkinchi nuqta poydevor (syntax) xatosiga olib keladi — dars tuzatilguncha ishlamaydi."
    },
    {
      "id": 9,
      "question": "`let age = \"25\";` dan keyin `age` qanday turda bo'ladi?",
      "options": [
        "Number (son)",
        "String (matn)",
        "BigInt",
        "Boolean"
      ],
      "correctAnswer": 1,
      "explanation": "Qo'shtirnoq ichidagi narsa har doim matn. `age` son emas, \"25\" matni bo'lib qoladi — son deb ishlab chiqarish uchun qo'shtirnoqsiz yozish kerak."
    },
    {
      "id": 10,
      "question": "JavaScript'da sonlar qanday yoziladi?",
      "options": [
        "Doim qo'shtirnoq ichida",
        "Qo'shtirnoqsiz: let age = 20",
        "Faqat backtick ichida",
        "Raqam harflari bilan: yigirma"
      ],
      "correctAnswer": 1,
      "explanation": "Sonlar har doim qo'shtirnoqsiz yoziladi. Qo'shtirnoq yozsangiz, bu son emas, matn bo'lib qoladi."
    },
    {
      "id": 11,
      "question": "`let big = 9999999999999999n; console.log(big);` nima chiqadi?",
      "options": [
        "10000000000000000",
        "9999999999999999 — to'liq, o'zgarmaydi",
        "0",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "BigInt butun sonlarni aniq saqlaydi. Raqam oxiriga `n` qo'yilgani uchun yaxlitlash bo'lmaydi."
    },
    {
      "id": 12,
      "question": "`console.log(9999999999999999);` (n yo'q, oddiy number) nima chiqadi?",
      "options": [
        "9999999999999999",
        "10000000000000000 — oxirgi raqamlar yashirin o'zgaradi",
        "SyntaxError",
        "Matn ko'rinishida chiqadi"
      ],
      "correctAnswer": 1,
      "explanation": "Oddiy number juda katta sonlarni aniq saqlolmaydi (chegarasi 2^53). Shunday holatlarda `n` bilan BigInt ishlatiladi."
    }
  ]
};

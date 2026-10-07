export const templateLiterals = {
  id: "templateLiterals",
  title: "Template Literals (Backticks)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda tayyor taklifnoma blankasi bor:
"Hurmatli [bu yerga ism yoziladi], sizni bayramga taklif qilamiz!"
Siz qog'ozni qirqib yopishtirmaysiz, balki bo'sh joyga kerakli ismni yozib qo'yasiz.

Template literals (shablonli satrlar) — xuddi shu blankaga o'xshaydi: matn ichiga o'zgaruvchilarni qulay joylashtirish uchun qiya qo'shtirnoq (backtick \\\`\\\`) va \\\`\${}\\\` belgisidan foydalanadigan zamonaviy usuldir.

---

## 2. Nega kerak?

Avvalgi darsda o'rgangan \`+\` belgisi bilan bir nechta o'zgaruvchini ulashda (\`"Salom, " + name + "! Sizning ballingiz: " + score\`) qo'shtirnoqlar ko'payib, bo'sh joylar (probellar) tushib qolishi va kod chalkashib ketishi oson.

Template literals bilan bitta butun matn yoziladi va o'zgaruvchilar kerakli joyga \\\`\${o'zgaruvchi}\\\` shaklida kiritiladi.

---

## 3. Birinchi misol

Bu kod \`name\` o'zgaruvchisini matn ichiga kiritadi va konsolga chiqaradi.

\`\`\`javascript
let name = "Ali";
let message = \`Salom, \${name}!\`; // Matn ichiga o'zgaruvchini joylashtirish
console.log(message);
\`\`\`

\`\`\`text
// Natija: Salom, Ali!
\`\`\`

---

## 4. Qator-baqator tahlil

- \\\`Salom, \${name}!\\\` — butun matn qiya qo'shtirnoq (backtick) ichiga olingan.
- \`\${name}\` — \`name\` o'zgaruvchisining qiymati (\`"Ali"\`) aynan shu yerga avtomatik qo'yiladi.
- \`console.log(message);\` — hosil bo'lgan matn ekranga chiqadi.

---

## 5. Qadamma-qadam (trace)

| Qadam | Kod qatori | Natija | Izoh |
| :--- | :--- | :--- | :--- |
| 1 | \`let name = "Ali";\` | \`"Ali"\` | Ism saqlandi |
| 2 | \\\`Salom, \${name}!\\\` | \`"Salom, Ali!"\` | \`\${name}\` o'rniga \`"Ali"\` qo'yildi |
| 3 | \`console.log(message);\` | \`"Salom, Ali!"\` | Konsolga chiqdi |

---

## 6. Yana bitta misol

Bu kod matn va son o'zgaruvchilarini bitta gapga joylashtiradi.

\`\`\`javascript
let user = "Vali";
let score = 95;
let result = \`Foydalanuvchi: \${user}, Ball: \${score}\`;
console.log(result);
\`\`\`

\`\`\`text
// Natija: Foydalanuvchi: Vali, Ball: 95
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1. Backtick o'rniga oddiy qo'shtirnoq ishlatish
❌ Xato kod:
\`\`\`javascript
let name = "Ali";
let message = "Salom, \${name}!";
console.log(message);
\`\`\`
Nima bo'ladi: Ekranga \`Salom, \${name}!\` deb so'zma-so'z chiqadi. Chunki \`\${}\` faqat backtick (\\\`\\\`) ichida ishlaydi.
✅ To'g'ri variant:
\`\`\`javascript
let name = "Ali";
let message = \`Salom, \${name}!\`;
console.log(message);
\`\`\`

### 2. Dollar belgisini unutish
❌ Xato kod:
\`\`\`javascript
let name = "Ali";
let message = \`Salom, {name}!\`;
console.log(message);
\`\`\`
Nima bo'ladi: Ekranga \`Salom, {name}!\` deb chiqadi. O'zgaruvchini joylash uchun albatta \`\$\` belgisi bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
let name = "Ali";
let message = \`Salom, \${name}!\`;
console.log(message);
\`\`\`

### 3. Mavjud bo'lmagan o'zgaruvchini yozish
❌ Xato kod:
\`\`\`javascript
let message = \`Salom, \${age}!\`;
\`\`\`
Nima bo'ladi: \`ReferenceError: age is not defined\` xatoligi yuz beradi. \`\${}\` ichida faqat oldindan e'lon qilingan o'zgaruvchilar yozilishi kerak.
✅ To'g'ri variant:
\`\`\`javascript
let age = 20;
let message = \`Salom, \${age}!\`;
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`city\` o'zgaruvchisi (\`"Buxoro"\`) qiymatini backtick va \`\${city}\` yordamida \\\`Men \${city} shahrida yashayman\\\` matniga joylang va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`item\` (\`"Kitob"\`) va \`price\` (\`50\`) o'zgaruvchilaridan foydalanib, \\\`Mahsulot: \${item}, Narxi: \${price}\\\` matnini konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi xatoni tuzating (ekranga \`Salom, Olim!\` chiqishi kerak):
\`\`\`javascript
let name = "Olim";
let text = "Salom, \${name}!";
console.log(text);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let city = "Buxoro";
let text = \`Men \${city} shahrida yashayman\`;
console.log(text);
\`\`\`
2.
\`\`\`javascript
let item = "Kitob";
let price = 50;
let text = \`Mahsulot: \${item}, Narxi: \${price}\`;
console.log(text);
\`\`\`
3.
\`\`\`javascript
let name = "Olim";
let text = \`Salom, \${name}!\`;
console.log(text);
\`\`\`

---

## 9. Xulosa

1. Template literals — qiya qo'shtirnoq (backtick \\\`\\\`) yordamida yoziladigan zamonaviy matn ko'rinishi.
2. Matn ichiga o'zgaruvchini joylash uchun \`\${o'zgaruvchi}\` sintaksisi ishlatiladi.
3. Bu usul \`+\` belgisi bilan ulashdan ko'ra ancha toza, o'qilishi qulay va xatosizdir.

Keyingi darsda: JavaScript'da sonlar (Number) va ular ustida asosiy amallar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Shablonli satr yaratish",
      instruction: "`city` o'zgaruvchisi berilgan (`\"Buxoro\"`). Backtick va `${city}` yordamida `Men ${city} shahrida yashayman` matnini tuzing va konsolga chiqaring.",
      startingCode: "let city = \"Buxoro\";\n// Backtick va ${city} bilan chiqaring\n",
      hint: "console.log(`Men ${city} shahrida yashayman`);",
      test: "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Men Buxoro shahrida yashayman'))) return null;\nreturn 'Matn to\\'g\\'ri chiqmadi';"
    },
    {
      id: 2,
      title: "Ikkita o'zgaruvchini joylash",
      instruction: "`item` (`\"Kitob\"`) va `price` (`50`) o'zgaruvchilarini backtick yordamida `Mahsulot: ${item}, Narxi: ${price}` ko'rinishida konsolga chiqaring.",
      startingCode: "let item = \"Kitob\";\nlet price = 50;\n// Natijani chiqaring\n",
      hint: "console.log(`Mahsulot: ${item}, Narxi: ${price}`);",
      test: "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Mahsulot: Kitob, Narxi: 50'))) return null;\nreturn 'Kutilgan matn to\\'g\\'ri chiqmadi';"
    },
    {
      id: 3,
      title: "Oddiy qo'shtirnoq xatosini tuzatish",
      instruction: "Quyidagi koddagi oddiy qo'shtirnoqni backtick (qiya qo'shtirnoq) ga almashtiring, toki ekranga `Salom, Olim!` chiqsin.",
      startingCode: "let name = \"Olim\";\nlet text = \"Salom, ${name}!\";\nconsole.log(text);\n",
      hint: "let name = \"Olim\";\nlet text = `Salom, ${name}!`;\nconsole.log(text);",
      test: "if (code.includes('\"Salom, ${name}!\"') || code.includes(\"'Salom, ${name}! '\")) return 'Oddiy qo\\'shtirnoq o\\'rniga backtick (`) ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom, Olim!'))) return null;\nreturn 'Salom, Olim! matni chiqmadi';"
    },
    {
      "id": 4,
      "title": "Ikki qatorli backtick matn",
      "instruction": "`user` (`\"Dilshod\"`) uchun backtick bilan IKKI qatorli matn yozing: birinchi qator `Salom, ${user}!`, ikkinchisi `Bugun havo yaxshi`. Bitta console.log chaqiring.",
      "startingCode": "let user = \"Dilshod\";\n// Ikki qatorli backtick matn yozing\n",
      "hint": "console.log(`Salom, ${user}!\nBugun havo yaxshi`);",
      "test": "if (!code.includes('`')) return 'Backtick ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst joined = out.join('|');\nif (!joined.includes('Salom, Dilshod!')) return 'Birinchi qator chiqmadi';\nif (!joined.includes('Bugun havo yaxshi')) return 'Ikkinchi qator chiqmadi';\nif (!joined.includes('\\n')) return 'Matn bitta qatorda qoldi';\nreturn null;"
    },
    {
      "id": 5,
      "title": "length ni belgi ichida ishlatish",
      "instruction": "`word = \"JavaScript\"` uchun `Uzunlik: 10` matnini backtick bilan chiqaring. `.length` ni `+` bilan ulamang — aynan `${word.length}` ko'rinishida bering.",
      "startingCode": "let word = \"JavaScript\";\n// .length ni ${} ichida ishlating\n",
      "hint": "console.log(`Uzunlik: ${word.length}`);",
      "test": "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Uzunlik: 10'))) return null;\nreturn 'Uzunlik: 10 chiqmadi';"
    },
    {
      "id": 6,
      "title": "Matndagi dollar belgisi",
      "instruction": "`price = 50` uchun `Narxi: $50` matnini backtick bilan chiqaring. `$` belgisi matnda qolishi kerak, `${` emas.",
      "startingCode": "let price = 50;\n// $ belgisi bilan chiqaring\n",
      "hint": "console.log(`Narxi: $${price}`);",
      "test": "if (!code.includes('`')) return 'Backtick ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Narxi: $50')) return null;\nreturn \"Natija 'Narxi: $50' bolishi kerak\";"
    },
    {
      "id": 7,
      "title": "Tushib qolgan dollar belgisini topish",
      "instruction": "`Salom, {name}!` matnida `$` belgisi tushib qolgan. Tuzating: ekranga `Salom, Anvar!` chiqsin.",
      "startingCode": "let name = \"Anvar\";\nlet text = `Salom, {name}!`;\nconsole.log(text);\n",
      "hint": "{name} o'rniga ${name} yozing.",
      "test": "if (!code.includes('`')) return 'Backtick ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst joined = out.join('|');\nif (joined.includes('Salom, {name}!')) return 'Hali {name} qolgan, $ belgisini qoshing';\nif (joined.includes('Salom, Anvar!')) return null;\nreturn 'Salom, Anvar! chiqmadi';"
    },
    {
      "id": 8,
      "title": "E'lon qilinmagan o'zgaruvchini tuzatish",
      "instruction": "`birthYear` e'lon qilinmaganligi uchun kod xato bermoqda. `let birthYear = 2005;` qatorini birinchi qatorga qo'shing: ekranga `Tug'ilgan yil: 2005!` chiqsin.",
      "startingCode": "let text = `Tug'ilgan yil: ${birthYear}!`;\nconsole.log(text);\n",
      "hint": "let birthYear = 2005; — shu qatorni mavjud koddan oldin yozing.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Tug'ilgan yil: 2005!\"))) return null;\nreturn \"Natija to'g'ri chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Ikkita shablonni ulash",
      "instruction": "`name` (`\"Malika\"`) va `city` (`\"Namangan\"`) uchun IKKITA backtick matn yozib `+` bilan ulang: bitta console.log da `Ism: Malika, Shahar: Namangan` chiqsin.",
      "startingCode": "let name = \"Malika\";\nlet city = \"Namangan\";\n// Ikki backtick matnni + bilan ulang\n",
      "hint": "console.log(`Ism: ${name}` + `, Shahar: ${city}`);",
      "test": "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Ism: Malika, Shahar: Namangan')) return null;\nreturn \"Natija to'g'ri chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Aralash holat (chegara)",
      "instruction": "`first` (`\"Aziz\"`), `last` (`\"Qodirov\"`) va `id` (`1`) o'zgaruvchilarini bitta backtick matnga joylang. Bitta console.log da natija AYNAN `Mijoz: Aziz Qodirov (ID: 1)` bo'lsin.",
      "startingCode": "let first = \"Aziz\";\nlet last = \"Qodirov\";\nlet id = 1;\n// To'liq matnni tuzing\n",
      "hint": "console.log(`Mijoz: ${first} ${last} (ID: ${id})`);",
      "test": "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Mijoz: Aziz Qodirov (ID: 1)')) return null;\nreturn \"Natija to'g'ri chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Template literals qaysi belgi yordamida yoziladi?",
      options: [
        "Qo'sh qo'shtirnoq (\")",
        "Qiya qo'shtirnoq (backtick `)",
        "Bittalik qo'shtirnoq (')",
        "Kichik-katta belgilari (< >)"
      ],
      correctAnswer: 1,
      explanation: "Template literals faqat qiya qo'shtirnoq (backtick `) bilan ochilib, u bilan yopiladi."
    },
    {
      id: 2,
      question: "Template literal ichiga o'zgaruvchi qanday joylashtiriladi?",
      options: [
        "&{o'zgaruvchi}",
        "${o'zgaruvchi}",
        "#{o'zgaruvchi}",
        "[o'zgaruvchi]"
      ],
      correctAnswer: 1,
      explanation: "${o'zgaruvchi} sintaksisi orqali o'zgaruvchining qiymati matn ichiga avtomatik qo'yiladi."
    },
    {
      id: 3,
      question: "Quyidagi kod natijasida konsolga nima chiqadi?\n```javascript\nlet user = \"Ali\";\nconsole.log(\"Salom, ${user}\");\n```",
      options: [
        "Salom, Ali",
        "Salom, ${user}",
        "Xatolik beradi",
        "Salom, user"
      ],
      correctAnswer: 1,
      explanation: "Oddiy qo'shtirnoq ishlatilgani uchun ${user} o'zgaruvchi deb tanilmaydi va ekranga aynan \"Salom, ${user}\" deb chiqadi."
    },
    {
      "id": 4,
      "question": "Backtick matn ichida yangi qator (bir nechta qator) yozish mumkinmi?",
      "options": [
        "Yo'q, faqat bitta qatorga ruxsat etiladi",
        "Ha, backtick ichida to'g'ridan-to'g'ri qator tashlash mumkin",
        "Faqat comment ichida",
        "Faqat bitta nuqta bilan"
      ],
      "correctAnswer": 1,
      "explanation": "Backtick qo'shtirnoq yopilmaguncha matn istalgan joyda davom etadi, shuning uchun ichiga yangi qator tashlash mumkin. Qo'shtirnoqda bunday imkoniyat yo'q."
    },
    {
      "id": 5,
      "question": "```javascript\nlet word = \"JavaScript\";\nconsole.log(`Uzunlik: ${word.length}`);\n```\nKonsolga nima chiqadi?",
      "options": [
        "Uzunlik: JavaScript",
        "Uzunlik: 10",
        "10",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "${word.length} o'rniga .length qiymati qo'yiladi: JavaScript 10 ta belgidan iborat, shuning uchun natija 'Uzunlik: 10'."
    },
    {
      "id": 6,
      "question": "```javascript\nlet name = \"Sara\";\nconsole.log(`Salom, {name}!`);\n```\nKonsolga nima chiqadi?",
      "options": [
        "Salom, Sara!",
        "Salom, name!",
        "Salom, {name}!",
        "ReferenceError"
      ],
      "correctAnswer": 2,
      "explanation": "$ belgisi tushib qolgan. $ siz JS {name} ni oddiy matn deb biladi va so'zma-so'z shunday chiqaradi."
    },
    {
      "id": 7,
      "question": "```javascript\nlet age;\nconsole.log(`Yosh: ${age}`);\n```\nKonsolga nima chiqadi?",
      "options": [
        "Yosh:",
        "Yosh: undefined",
        "Yosh: null",
        "ReferenceError"
      ],
      "correctAnswer": 1,
      "explanation": "age e'lon qilingan, lekin qiymat berilmagan. Bunday o'zgaruvchi undefined, va ${} ichida aynan shunday ko'rinadi."
    },
    {
      "id": 8,
      "question": "${...} qavs ichiga nima yozish mumkin?",
      "options": [
        "Faqat bitta so'z",
        "Faqat raqam",
        "O'zgaruvchi yoki ifoda (masalan word.length)",
        "Faqat boshqa backtick"
      ],
      "correctAnswer": 2,
      "explanation": "Qavs ichiga istalgan ifoda joylashadi: oddiy o'zgaruvchi, .length yoki boshqa qiymat. JS ifodani hisoblab, natijasini matn o'rniga qo'yadi."
    },
    {
      "id": 9,
      "question": "Nega `Salom, {name}!` emas, `Salom, ${name}!` deb yoziladi?",
      "options": [
        "{} faqat massivlarda ishlaydi",
        "$ belgisi JS ga shu qism o'zgaruvchi ekanligini bildiradi",
        "Bu shunchaki urf-odat",
        "{} ishlasa ham xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "$ dan keyingi {} interpolatsiya belgisi hisoblanadi. $ siz JS bu belgilarni oddiy matn deb biladi va o'zgaruvchi qiymatini qo'ymaydi."
    },
    {
      "id": 10,
      "question": "Template literals `+` bilan ulashdan qayerda afzal?",
      "options": [
        "Raqamlarni ko'paytirishda",
        "Uzoq matnda o'zgaruvchi joylashuvi ko'rinib turadi va bo'sh joy xatolari kamayadi",
        "Hech qayerda — bir xil",
        "Faqat console.log ichida"
      ],
      "correctAnswer": 1,
      "explanation": "Bir nechta + bilan ulanganda qavs va qo'shtirnoqlar ko'payib, chalkashib ketadi. Shablonda o'zgaruvchi o'z joyida turadi, uzun matn ham o'qilishi qulay."
    },
    {
      "id": 11,
      "question": "```javascript\nlet a = \"JS\";\nlet t = `Dars: ${a}`;\nconsole.log(t);\n```\nKonsolga nima chiqadi?",
      "options": [
        "Dars: a",
        "Dars: JS",
        "Dars: ${a}",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "${a} o'rniga a o'zgaruvchisining qiymati qo'yiladi, shuning uchun natija 'Dars: JS'."
    },
    {
      "id": 12,
      "question": "```javascript\nlet text = `Balans: ${balance}`;\n```\nBu kod nima qiladi?",
      "options": [
        "Balans: undefined chiqaradi",
        "Balans: 0 chiqaradi",
        "ReferenceError: balance is not defined beradi",
        "SyntaxError beradi"
      ],
      "correctAnswer": 2,
      "explanation": "balance e'lon qilinmagan. ${} ichida faqat oldindan e'lon qilingan o'zgaruvchilar bo'lishi kerak, aks holda ReferenceError yuz beradi."
    }
  ]
};

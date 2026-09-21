export const stringBasics = {
  id: "stringBasics",
  title: "String: Matn Asoslari",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz bitta ipga harflarni munchoq kabi birin-ketin tizib chiqdingiz. Harflar birlashib, bitta butun so'z yoki gapni hosil qiladi.

Dasturlashda matn xuddi shu munchoqlar tizmasiga o'xshaydi: har bir belgi (harf, belgi, bo'sh joy) ipda ketma-ket joylashadi.

String (satr / matn) — JavaScript'da qo'shtirnoq ichiga olingan har qanday belgilar yoki matnli ma'lumot turidir.

### Qo'shtirnoq turlari:
JavaScript'da matnni 3 xil qo'shtirnoq ichida yozish mumkin:
1. **Qo'sh qo'shtirnoq (double quotes):** \`"Salom"\`
2. **Bittalik qo'shtirnoq (single quotes):** \`'Salom'\`
3. **Qiya qo'shtirnoq (backticks):** \\\`Salom\\\`

Ularning barchasi bir xil matn hosil qiladi. Asosiy qoida: qaysi biri bilan ochilgan bo'lsa, o'sha bilan yopilishi shart.

---

## 2. Nega kerak?

Dasturlar faqat sonlar bilan ishlamaydi: foydalanuvchining ismi, xabarlar yoki shahar nomlari kabi ma'lumotlarni saqlash kerak bo'ladi.

Shuningdek, alohida matnlarni bir-biriga ulash (\`+\` belgisi orqali) va matnda nechta belgi borligini bilish (\`.length\` orqali) dasturlashda eng ko'p ishlatiladigan amallardandir.

---

## 3. Birinchi misol

Bu kod ikki matnni birlashtiradi va hosil bo'lgan matn uzunligini konsolga chiqaradi.

\`\`\`javascript
let firstName = "Ali"; // Birinchi matn
let greeting = "Salom, " + firstName; // + bilan matnlarni birlashtirish
console.log(greeting); // Natijani ekranga chiqarish
console.log(greeting.length); // Matn uzunligini chiqarish
\`\`\`

\`\`\`text
// Natija:
Salom, Ali
10
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let firstName = "Ali";\` — \`firstName\` o'zgaruvchisiga \`"Ali"\` matni solindi.
- \`let greeting = "Salom, " + firstName;\` — \`+\` belgisi matnlarni bir-biriga yopishtirdi (birlashtirdi). Yangi \`"Salom, Ali"\` matni hosil bo'ldi.
- \`console.log(greeting);\` — birlashtirilgan matn ekranga chiqdi.
- \`greeting.length\` — matn ichida nechta belgi borligini sanaydi (\`Salom, Ali\` da 10 ta belgi bor: harflar, vergul va bo'sh joy).

---

## 5. Qadamma-qadam (trace)

| Qadam | Kod qatori | Natija | Izoh |
| :--- | :--- | :--- | :--- |
| 1 | \`let firstName = "Ali";\` | \`"Ali"\` | Matn saqlandi |
| 2 | \`"Salom, " + firstName\` | \`"Salom, Ali"\` | Ikki matn ulandi |
| 3 | \`greeting.length\` | \`10\` | 10 ta belgi (harf, vergul, probel) |

---

## 6. Yana bitta misol

Bu kod bittalik qo'shtirnoq bilan so'zlarni birlashtirishni va bo'sh joyning muhimligini ko'rsatadi.

\`\`\`javascript
let word1 = 'JavaScript'; // Bittalik qo'shtirnoq
let word2 = 'Darslari'; // Bittalik qo'shtirnoq
let fullText = word1 + ' ' + word2; // O'rtaga bo'sh joy qo'shib ulash
console.log(fullText);
\`\`\`

\`\`\`text
// Natija: JavaScript Darslari
\`\`\`

Agar o'rtaga \`' '\` (bo'sh joy) qo'shilmasa, so'zlar yopishib qoladi: \`JavaScriptDarslari\`.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qo'shtirnoq turlarini aralashtirish
❌ Xato kod:
\`\`\`javascript
let text = "Salom';
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid or unexpected token\` xatoligi yuz beradi. Qo'sh qo'shtirnoq (\`"\`) bilan boshlangan matn faqat qo'sh qo'shtirnoq bilan tugashi shart.
✅ To'g'ri variant:
\`\`\`javascript
let text = "Salom";
\`\`\`

### 2. Matnlarni ulashda bo'sh joyni unutish
❌ Xato natija:
\`\`\`javascript
let part1 = "Salom";
let part2 = "Dunyo";
console.log(part1 + part2);
\`\`\`
Nima bo'ladi: Ekranga \`SalomDunyo\` deb yopishib chiqadi. \`+\` belgisi o'rtaga avtomatik bo'sh joy qo'shmaydi.
✅ To'g'ri variant:
\`\`\`javascript
let part1 = "Salom";
let part2 = "Dunyo";
console.log(part1 + " " + part2);
\`\`\`

### 3. length ga qavs qo'yish
❌ Xato kod:
\`\`\`javascript
let text = "Salom";
console.log(text.length());
\`\`\`
Nima bo'ladi: \`TypeError: text.length is not a function\` xatosi beradi. \`length\` funksiya emas, balki xususiyat (property) hisoblanadi. Uni qavslarsiz yozish kerak.
✅ To'g'ri variant:
\`\`\`javascript
let text = "Salom";
console.log(text.length);
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`firstName\` (\`"Ali"\`) va \`lastName\` (\`"Valiyev"\`) o'zgaruvchilarini yarating, ularni o'rtasida bo'sh joy bilan \`fullName\` ga birlashtiring va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`let word = "JavaScript";\` matnining uzunligini \`.length\` yordamida konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`TypeError\` xatosini to'g'rilang:
\`\`\`javascript
let city = "Toshkent";
console.log(city.length());
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let firstName = "Ali";
let lastName = "Valiyev";
let fullName = firstName + " " + lastName;
console.log(fullName);
\`\`\`
2.
\`\`\`javascript
let word = "JavaScript";
console.log(word.length);
\`\`\`
3.
\`\`\`javascript
let city = "Toshkent";
console.log(city.length);
\`\`\`

---

## 9. Xulosa

1. String — qo'shtirnoq ichiga olingan matnli ma'lumot turi (\`""\`, \`''\` yoki \\\`\\\`).
2. \`+\` operatori matnlarni bir-biriga yopishtirib birlashtiradi.
3. \`.length\` xususiyati matndagi belgilar (harflar, bo'sh joylar) sonini qaytaradi va u qavslarsiz yoziladi.

Keyingi darsda: JavaScript'da sonlar (Number) va ular ustida asosiy amallar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Matnlarni birlashtirish",
      instruction: "`firstName` (`\"Ali\"`) va `lastName` (`\"Valiyev\"`) o'zgaruvchilarini yarating, ularni o'rtasida bo'sh joy bilan `fullName` ga birlashtiring va konsolga chiqaring.",
      startingCode: "// Ali va Valiyev matnlarini o'rtasida probel bilan birlashtiring\n",
      hint: "let firstName = \"Ali\";\nlet lastName = \"Valiyev\";\nlet fullName = firstName + \" \" + lastName;\nconsole.log(fullName);",
      test: "if (!code.includes('+')) return '+ operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali Valiyev'))) return null;\nreturn '\"Ali Valiyev\" matni to\\'g\\'ri chiqmadi (probelni unutmang)';"
    },
    {
      id: 2,
      title: "Matn uzunligini topish",
      instruction: "`word` nomli o'zgaruvchiga `\"JavaScript\"` matnini soling va uning uzunligini `.length` orqali konsolga chiqaring.",
      startingCode: "let word = \"JavaScript\";\n// word uzunligini konsolga chiqaring\n",
      hint: "console.log(word.length);",
      test: "if (!code.includes('.length')) return '.length xususiyati ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('10'))) return null;\nreturn '10 soni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "length() xatosini tuzatish",
      instruction: "`city.length()` dagi qavslarni olib tashlang, toki `city` matnining uzunligi (`8`) to'g'ri chiqsin.",
      startingCode: "let city = \"Toshkent\";\nconsole.log(city.length());\n",
      hint: "console.log(city.length);",
      test: "if (code.includes('.length()')) return '.length dan keyingi qavslarni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('8'))) return null;\nreturn '8 soni konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da ikki matnni birlashtirish (ulash) uchun qaysi belgi ishlatiladi?",
      options: [
        "&",
        "+",
        "*",
        "#"
      ],
      correctAnswer: 1,
      explanation: "+ operatori matnlar bilan ishlatilganda ularni bir-biriga yopishtiradi (concatenation)."
    },
    {
      id: 2,
      question: "Quyidagi kod natijasida `text.length` nechiga teng bo'ladi?\n```javascript\nlet text = \"JS 2026\";\nconsole.log(text.length);\n```",
      options: [
        "6",
        "7",
        "8",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Jami 7 ta belgi: 'J', 'S', ' ' (bo'sh joy), '2', '0', '2', '6'. Bo'sh joy (probel) ham alohida belgi hisoblanadi."
    },
    {
      id: 3,
      question: "Nima uchun `console.log(text.length());` xatolik beradi?",
      options: [
        "length faqat sonlar uchun ishlaydi",
        "length funksiya emas, shuning uchun qavslarsiz yoziladi: text.length",
        "text o'zgaruvchisi topilmagan",
        "console.log qavslari xato"
      ],
      correctAnswer: 1,
      explanation: "length — bu matnning xususiyati (property), funksiya emas. Shuning uchun unga qavslar qo'yilmaydi (TypeError: text.length is not a function)."
    }
  ]
};

export const loops = {
  id: "loops",
  title: "Sikllar (Loops): for, while va boshqalar",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizga konsolga 100 marta "Salom" deb yozish kerak. Buni qo'lda yozish juda uzoq vaqt oladi. Sikllar yordamida buni 3 qator kod bilan hal qilish mumkin.

## 2. SODDALIK (Analogiya)
Buni **stadionda yugurishga** o'xshatish mumkin:
- **Start:** Siz start chizig'idasiz (\`let i = 0\`).
- **Shart:** 10 ta aylana yugurishingiz kerak (\`i < 10\`).
- **Qadam:** Har bir aylana oxirida bittaga oshirasiz (\`i++\`).

## 3. STRUKTURA

### A. for sikli (Eng ko'p ishlatiladigani)
Takrorlanish soni aniq bo'lganda:
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i + "-aylana");
}
\`\`\`

### B. while va do...while
\`while\` shart to'g'ri bo'lguncha ishlaydi. \`do...while\` esa kamida bir marta ishlaydi.
\`\`\`javascript
let count = 1;
while (count <= 3) {
  console.log(count);
  count++;
}
\`\`\`

### C. for...of va for...in
- **for...of:** Massiv **qiymatlarini** aylanish uchun.
- **for...in:** Obyekt **kalitlarini** (yoki massiv indekslarini) aylanish uchun.
\`\`\`javascript
const ranglar = ["Qizil", "Ko'k"];
for (let rang of ranglar) {
  console.log(rang); // "Qizil", "Ko'k"
}
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Cheksiz sikl (Infinite Loop):** Agar shartni doim \`true\` qilib qo'ysangiz yoki \`i++\`ni unutsangiz, brauzer qotib qoladi!
2. **Indeks xatosi:** Massivlar 0 dan boshlanadi. Agar 1 dan boshlasangiz, birinchi elementni o'tkazib yuborasiz.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. Sikl (Loop) nima?</summary>
Bir xil kodni ma'lum bir shart asosida qayta-qayta bajarish usuli.
</details>

<details>
<summary>2. JavaScriptda qaysi sikl turlari bor?</summary>
for, while, do...while, for...of, for...in.
</details>

<details>
<summary>3. for siklining 3 ta qismi nima?</summary>
Boshlanish (initialization), Shart (condition) va Qadam (increment).
</details>

<details>
<summary>4. while va do...while farqi nimada?</summary>
\`while\` avval shartni tekshiradi, \`do...while\` avval kodni bajarib, keyin shartni tekshiradi.
</details>

<details>
<summary>5. for...of nima uchun ishlatiladi?</summary>
Massiv (yoki boshqa iterable) ichidagi qiymatlarni to'g'ridan-to'g'ri olish uchun.
</details>

<details>
<summary>6. Cheksiz sikl qanday hosil bo'ladi?</summary>
Shart hech qachon \`false\` bo'lmaganda (masalan, \`while(true)\`).
</details>

<details>
<summary>7. i++ yozishni unutsak nima bo'ladi?</summary>
Sikl sanoq o'zgarmagani uchun cheksiz davom etadi.
</details>

<details>
<summary>8. for siklida let o'rniga const ishlatsa bo'ladimi?</summary>
Yo'q, chunki \`i\` ning qiymati har bir qadamda o'zgarishi shart.
</details>

<details>
<summary>9. continue nima vazifani bajaradi?</summary>
Siklning joriy qadamini tashlab o'tib, keyingisiga o'tadi.
</details>

<details>
<summary>10. break nima vazifani bajaradi?</summary>
Siklni darhol to'xtatib, undan chiqib ketadi.
</details>

<details>
<summary>11. Obyekt kalitlarini aylanish uchun qaysi sikl ishlatiladi?</summary>
\`for...in\` sikli.
</details>

<details>
<summary>12. 10 dan 1 gacha teskari sanaydigan sikl qanday yoziladi?</summary>
\`for (let i = 10; i >= 1; i--)\`
</details>`,
  exercises: [
    {
      id: 1,
      title: "Takrorlash",
      instruction: "for sikli yordamida 1 dan 5 gacha bo'lgan sonlarni chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
      test: "if (logs.length >= 5 && logs.includes('1') && logs.includes('5')) return null; return '1 dan 5 gacha sonlar chiqishi kerak!';"
    },
    {
      id: 2,
      title: "While sikli",
      instruction: "while sikli yordamida 'count' 3 bo'lguncha uning qiymatini chiqaring.",
      startingCode: "let count = 1;\n// Bu yerga yozing\n",
      hint: "while (count <= 3) { console.log(count); count++; }",
      test: "if (logs.includes('1') && logs.includes('3')) return null; return 'While siklini to\\'g\\'ri yozing';"
    },
    {
      id: 3,
      title: "Yig'indi",
      instruction: "1 dan 10 gacha sonlar yig'indisini hisoblang va konsolga chiqaring.",
      startingCode: "let sum = 0;\n// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 10; i++) { sum += i; } console.log(sum);",
      test: "if (logs.includes('55')) return null; return 'Yig\\'indi 55 chiqishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "\`while\` va \`do...while\` sikllari (loops) o'rtasidagi eng asosiy amaliy farq nimada?",
      options: [
        "\`while\` sikli kamida bir marta ishlaydi, \`do...while\` esa shart noto'g'ri bo'lsa umuman ishlamaydi",
        "\`do...while\` sikli shart noto'g'ri bo'lsa ham kamida bir marta ishlaydi; \`while\` esa birinchi bo'lib shartni tekshiradi va u bajarilmaguncha kodni ishga tushirmaydi",
        "Ular o'rtasida hech qanday farq yo'q",
        "\`while\` faqat sonli shartlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "\`do...while\` siklida avval \`do\` blokidagi kod bajariladi, keyin shart tekshiriladi. Shuning uchun shart noto'g'ri bo'lsa ham kod kamida 1 marta ishlaydi. \`while\`-da esa shart boshida tekshiriladi."
    },
    {
      id: 2,
      question: "Quyidagi \`for\` siklida \`const\` ishlatilishi qanday natijaga olib keladi?\\n\`\`\`javascript\\nfor (const i = 0; i < 5; i++) {\\n  console.log(i);\\n}\\n\`\`\`",
      options: [
        "0 dan 4 gacha sonlar ekranga chiqadi",
        "\`TypeError: Assignment to constant variable\` xatosi yuz beradi (chunki \`i++\` har bir aylanishda \`i\` ning qiymatini o'zgartirishga harakat qiladi, const esa bunga yo'l qo'ymaydi)",
        "Tsikl cheksiz davom etadi",
        "Faqat 0 soni chiqadi va tsikl tugaydi"
      ],
      correctAnswer: 1,
      explanation: "\`for\` siklida boshqaruvchi o'zgaruvchi har bir qadamda yangilanadi (qiymati qayta yuklanadi). \`const\` bilan yaratilgan o'zgaruvchilarni qayta o'zgartirib bo'lmagani sababli, \`i++\` bajarilishida xatolik yuz beradi."
    },
    {
      id: 3,
      question: "Obyektning kalitlarini (keys) yoki xususiyatlarini (properties) ketma-ket aylanib chiqish (iterate) uchun qaysi sikldan foydalanish eng to'g'ri?",
      options: [
        "\`for...of\`",
        "\`for...in\`",
        "\`while\`",
        "\`do...while\`"
      ],
      correctAnswer: 1,
      explanation: "\`for...in\` sikli obyektlarning kalitlarini aylanib chiqish uchun maxsus ishlab chiqilgan. \`for...of\` esa massivlar va iterable ma'lumotlar qiymatlari uchun ishlatiladi."
    },
    {
      id: 4,
      question: "Massiv (Array) qiymatlarini indekslar bilan ishlamasdan, to'g'ridan-to'g'ri elementlarini o'qib chiqish uchun qaysi sikl qulay hisoblanadi?",
      options: [
        "\`for...in\`",
        "\`for...of\`",
        "\`while\`",
        "\`do...while\`"
      ],
      correctAnswer: 1,
      explanation: "\`for...of\` sikli massiv elementlari (indeksi emas, qiymatlari) bo'ylab to'g'ridan-to'g'ri aylanish imkonini beradi."
    },
    {
      id: 5,
      question: "Quyidagi kod ishga tushganda brauzer yoki kompyuter nima uchun qotib qoladi (cheksiz sikl hosil bo'ladi)?\\n\`\`\`javascript\\nlet i = 0;\\nwhile (i < 5) {\\n  console.log(i);\\n}\\n\`\`\`",
      options: [
        "Chunki console.log juda ko'p xotira sarflaydi",
        "Chunki \`i\` o'zgaruvchisining qiymatini oshiruvchi qadam (\`i++\` yoki shunga o'xshash amal) yozilmagan, natijada shart (\`i < 5\`) doimo true bo'lib qolaveradi",
        "Chunki \`i\` global o'zgaruvchi",
        "Chunki \`while\` siklida qavslar noto'g'ri yozilgan"
      ],
      correctAnswer: 1,
      explanation: "Sikl to'xtashi uchun undagi shart qachondir false bo'lishi kerak. \`i\` o'zgarmasdan 0 ligicha qolganligi sababli \`i < 5\` (0 < 5) har doim \`true\` bo'lib sikl to'xtamaydi."
    }
  ]
};
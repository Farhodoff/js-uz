export const doWhileLesson = {
  id: "doWhileLesson",
  title: "do...while Sikli",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz yangi ovqatni tatib ko'ryapsiz: "Avval bitta qoshiq yeb ko'rasiz, keyin agar yoqsa, yeyishda davom etasiz".
Yoki telefon o'yinini o'ynash: "Avval 1 marta o'ynab ko'rasiz, keyin agar yana o'ynashni xohlasangiz, davom etasiz".
Oddiy \`while\` siklida siz avval eshikdan qarab, shart to'g'ri bo'lsagina ichkariga kirardingiz. \`do...while\` siklida esa — **avval ichkariga kirib bitta ish qilasiz**, keyingina shartni tekshirasiz!

\`do...while\` (avval bajar, keyin tekshir) — shart rost (\`true\`) yoki yolg'on (\`false\`) bo'lishidan qat'i nazar, kod blokining **kamida bir marta** bajarilishini kafolatlaydigan sikl operatoridir.

*Yangi termin:* **Post-shartli sikl (post-condition loop)** — sharti qadamdan oldin emas, balki qadam bajarib bo'lingach, oxirida tekshiriladigan sikl.

---

## 2. Nega kerak?

\`while\` yoki \`for\` sikllarida shart eng boshida tekshiriladi. Agar shart boshidanoq \`false\` bo'lsa, sikl ichidagi kod biror marta ham ishlamasdan tashlab ketiladi:

\`\`\`javascript
let count = 5;
while (count < 3) {
  console.log("Salom"); // Hech qachon ishlamaydi!
  count++;
}
\`\`\`

Lekin ba'zida kodimiz shartdan qat'i nazar kamida bir marta bajarilishi zarur bo'ladi:
- Foydalanuvchiga kamida bir marta menyuni ko'rsatish
- Kodni kamida bir marta ishga tushirib ko'rish

\`do...while\` aynan shu muammoni hal qiladi: kod bloki avval kamida 1 marta bajariladi, shart esa faqat oxirida tekshiriladi.

---

## 3. Birinchi misol

Bu kod shart boshidanoq \`false\` bo'lishiga qaramay, konsolga kamida bir marta xabar chiqaradi.

\`\`\`javascript
let count = 5; // Boshlang'ich qiymat
do {
  console.log(count); // Kamida 1 marta ishlaydi
  count++; // Hisoblagichni oshirish
} while (count < 3); // Shart oxirida tekshiriladi (false bo'ladi)
\`\`\`

\`\`\`text
// Natija:
5
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let count = 5;\` — \`count\` nomli o'zgaruvchiga \`5\` qiymati berildi.
- \`do {\` — \`do\` (bajar) kalit so'zi. U JavaScript ga hech qanday shartni tekshirmasdan to'g'ridan-to'g'ri blok ichiga kirishni buyuradi.
- \`console.log(count);\` — konsolga \`5\` soni chiqadi.
- \`count++;\` — \`count\` qiymati 1 taga oshib \`6\` bo'ladi.
- \`} while (count < 3);\` — blok yopilgach, nihoyat shart tekshiriladi: \`6 < 3\` ifodasi \`false\` qaytaradi. Shart bajarilmagani uchun sikl to'xtaydi. Oxiridagi nuqta-vergul (\`;\`) sintaksis talabidir.

---

## 5. Qadamma-qadam (trace)

Bajarilish jarayonini jadvalda kuzatamiz:

| Qadam | count (boshida) | Blokdagi ish | count++ | Shart: count < 3 | Natija / Izoh |
|---|---|---|---|---|---|
| 1 | 5 | console.log(5) chiqdi | count = 6 bo'ldi | 6 < 3 -> false | Shart yolg'on (false) chiqqani uchun sikl to'xtadi! |

### while va do...while ning boshlang'ich false holatidagi farqi:

\`\`\`javascript
// while (0 marta ishlaydi):
let a = 5;
while (a < 3) {
  console.log(a); // Ekranga hech narsa chiqmaydi!
}

// do...while (kamida 1 marta ishlaydi):
let b = 5;
do {
  console.log(b); // 5 chiqadi!
} while (b < 3);
\`\`\`

---

## 6. Yana bitta misol

1-misoldan farqi: agar shart \`true\` bo'lsa, \`do...while\` ham xuddi boshqa sikllar kabi bir necha marta takrorlanadi.

Bu kod 1 dan 3 gacha sanaydi:

\`\`\`javascript
let count = 1; // Boshlang'ich qiymat
do {
  console.log(count); // Joriy sonni chiqarish
  count++; // 1 taga oshirish
} while (count <= 3); // count 3 dan kichik yoki teng bo'lsa davom etadi
\`\`\`

\`\`\`text
// Natija:
1
2
3
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: while(shart) dan keyin nuqta-vergul (;) qo'yishni unutish

\`\`\`javascript
let count = 1;
do {
  console.log(count);
  count++;
} while (count <= 3) // XATO: oxirida ';' unutilgan
\`\`\`

**Nima bo'ladi:** Oddiy \`while\` siklidan farqli o'laroq, \`do...while\` siklining oxirgi qatorida har doim nuqta-vergul (\`;\`) qo'yilishi qat'iy talab qilinadi.
**To'g'ri varianti:** Har doim oxirida \`;\` qo'ying: \`} while (count <= 3);\`.

### 2-xato: Cheksiz sikl — hisoblagichni o'zgartirishni unutish

\`\`\`javascript
let count = 1;
do {
  console.log(count);
  // count++ yozilmagan!
} while (count <= 3);
\`\`\`

**Nima bo'ladi:** \`count\` doim \`1\` bo'lib qoladi. Shart \`1 <= 3\` har doim \`true\` bo'ladi va dastur cheksiz aylanib qotib qoladi (infinite loop).
**To'g'ri varianti:** Blok ichida hisoblagichni o'zgartiruvchi qadam bo'lishi shart (\`count++\`).

### 3-xato: Shart boshidanoq muhim bo'lgan joyda do...while ishlatish

\`\`\`javascript
let hasAccess = false;
do {
  console.log("Xush kelibsiz!"); // Kirish huquqi yo'q bo'lsa ham 1 marta chiqadi!
} while (hasAccess);
\`\`\`

**Nima bo'ladi:** Ruxsat yo'q bo'lsa ham foydalanuvchiga xabar chiqib ketadi.
**To'g'ri varianti:** Agar blok shart bajarilmagan paytda umuman ishlamasligi kerak bo'lsa, \`do...while\` emas, oddiy \`while\` yoki \`if\` ishlatiladi.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`let i = 1;\` berilgan. \`do...while\` sikli yordamida 1, 2 va 3 sonlarini konsolga chiqaring.

### 2-mashq (o'rtacha)
Quyidagi kod ishlaganda konsolga qanday natijalar chiqadi?
\`\`\`javascript
let score = 10;
do {
  console.log(score);
  score += 5;
} while (score < 20);
\`\`\`

### 3-mashq (chegara holat)
Quyidagi kod konsolga nima chiqaradi?
\`\`\`javascript
let attempts = 0;
do {
  console.log("Urinish:", attempts);
  attempts++;
} while (attempts < 0);
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
let i = 1;
do {
  console.log(i);
  i++;
} while (i <= 3);
\`\`\`

**2-mashq javobi:**
Konsolga \`10\` va \`15\` sonlari chiqadi (1-qadamda 10 chiqadi, score 15 bo'ladi. 15 < 20 true bo'lib, 2-qadamda 15 chiqadi, score 20 bo'ladi. 20 < 20 false bo'lib to'xtaydi).

**3-mashq javobi:**
Konsolga faqat \`"Urinish: 0"\` chiqadi. Chunki \`attempts < 0\` (1 < 0) sharti \`false\` bo'lsa ham, \`do\` bloki avval kamida 1 marta ishlab bo'ladi.

---

## 9. Xulosa

1. \`do...while\` sikli shart tekshirilishidan oldin blok ichidagi kodni kamida 1 marta bajaradi.
2. Shart har bir qadam oxirida tekshiriladi: agar \`true\` bo'lsa takrorlanadi, \`false\` bo'lsa to'xtaydi.
3. \`do...while\` siklining eng oxirida (shartdan keyin) nuqta-vergul (\`;\`) qo'yilishi shart.

Keyingi darsda: Sikllarni muddatidan oldin to'xtatish yoki bitta qadamni o'tkazib yuborish uchun \`break\` va \`continue\` buyruqlarini o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "do...while bilan 1 dan 3 gacha",
      instruction: "\`let i = 1;\` berilgan. \`do...while\` siklidan foydalanib, 1, 2 va 3 sonlarini konsolga chiqaring.",
      startingCode: "let i = 1;\n// do...while siklini yozing\n",
      hint: "do {\n  console.log(i);\n  i++;\n} while (i <= 3);",
      test: "if (!code.includes('do') || !code.includes('while')) return 'do...while sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn 'Konsolga 1, 2, 3 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "Kamida 1 marta ishlash",
      instruction: "\`let num = 10;\` berilgan. \`do...while\` sikli yozing: blok ichida \`console.log(num);\` bajaring, shart esa \`while (num < 5);\` bo'lsin. Konsolga nima chiqishini tekshiring.",
      startingCode: "let num = 10;\n// do...while yozing\n",
      hint: "do {\n  console.log(num);\n} while (num < 5);",
      test: "if (!code.includes('do') || !code.includes('while')) return 'do...while ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '10') return null;\nreturn 'Konsolga 10 chiqishi kerak';"
    },
    {
      id: 3,
      title: "do...while dagi cheksiz siklni to'g'rilash",
      instruction: "Quyidagi kodda \`count\` qiymati o'zgarmagani uchun cheksiz sikl yuzaga keladi. Blok ichiga \`count++;\` qo'shib, to'g'rilang.",
      startingCode: "let count = 1;\ndo {\n  console.log(count);\n  // count++ qo'shing\n} while (count <= 2);\n",
      hint: "console.log(count);\ncount++;",
      test: "if (!code.includes('count++') && !code.includes('count += 1') && !code.includes('count = count + 1')) return 'count++ qo\\'shilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2') return null;\nreturn 'Konsolga 1, 2 chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "do...while siklining oddiy while siklidan asosiy farqi nimada?",
      options: [
        "Shartidan qat'i nazar, kod bloki kamida 1 marta albatta bajariladi",
        "do...while siklida shart umuman tekshirilmaydi",
        "do...while faqat cheksiz ishlaydi",
        "do...while faqat matnlar bilan ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "do...while shartni qadam bajarib bo'lingach tekshirgani sababli, blok kamida 1 marta bajarilishi kafolatlanadi."
    },
    {
      id: 2,
      question: "Quyidagi kod ishlaganda konsolga nima chiqadi?\nlet x = 5;\ndo {\n  console.log(x);\n} while (x < 3);",
      options: [
        "5",
        "Hech narsa chiqmaydi",
        "Xato beradi",
        "3"
      ],
      correctAnswer: 0,
      explanation: "Shart 5 < 3 yolg'on (false) bo'lsa ham, do bloki shartdan oldin bir marta ishlab, 5 ni ekranga chiqaradi."
    },
    {
      id: 3,
      question: "do...while sikli sintaksisida oxirgi while (shart) dan keyin qaysi belgi qo'yiladi?",
      options: [
        "; (nuqta-vergul)",
        ": (ikki nuqta)",
        "Hech qanday belgi qo'yilmaydi",
        ","
      ],
      correctAnswer: 0,
      explanation: "do...while sintaksisi bo'yicha while(shart) qatorining oxiriga har doim nuqta-vergul (;) qo'yiladi."
    }
  ]
};

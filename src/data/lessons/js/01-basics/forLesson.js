export const forLesson = {
  id: "forLesson",
  title: "for Sikli",
  language: "javascript",
  theory: `## 1. Bu nima?

O'tgan darsda ko'rganimizdek, \`while\` sikli — "choy tugaguncha ich" yoki "charchaguncha yugur" kabi shartga asoslangan edi (takrorlanishlar soni oldindan noma'lum bo'lishi mumkin).
\`for\` sikli esa — takrorlanishlar soni oldindan aniq belgilangan reja: masalan, "Aniq 3 marta o'tirib-turish qil!" yoki "Daftarga 3 marta chiroyli qilib 'Salom' deb yoz!". Qayerdan boshlash, qayerda to'xtash va har safar bittadan sanash oldindan bitta qatorda belgilab qo'yiladi.

\`for\` (uchun / davomida) — takrorlanishlar soni oldindan ma'lum bo'lganda, boshlang'ich qiymat, shart va qadamni bitta ixcham qatorda birlashtiruvchi sikl operatoridir.

*Yangi termin:* **Hisoblagich (counter)** — sikl necha marta aylanganini sanab boruvchi o'zgaruvchi. Dasturlashda hisoblagich uchun ko'pincha inglizcha *index* so'zining birinchi harfi — \`i\` nomi ishlatiladi.

---

## 2. Nega kerak?

\`while\` siklida takrorlash uchun zarur bo'lgan 3 ta asosiy narsa kodning har xil joylariga sochilib ketadi:
1. Boshlang'ich o'zgaruvchi — sikldan tashqarida, tepada.
2. Shart — \`while\` qavsida.
3. Qadam (\`i++\`) — sikl tanasining eng pastida.

\`\`\`javascript
let i = 1; // 1. Boshlanish (tashqarida)
while (i <= 3) { // 2. Shart (tepada)
  console.log(i);
  i++; // 3. Qadam (pastda!)
}
\`\`\`

Katta kodlarda \`i++\` ni yozish yoddan ko'tarilishi yoki boshqa kodlar orasida ko'zdan qochishi oson (natijada cheksiz sikl xatosi yuzaga keladi).

\`for\` sikli bu 3 ta qismni bitta qatorda, bitta qavs ichiga jamlaydi. Kod ancha ixcham, tartibli va xavfsiz bo'ladi.

---

## 3. Birinchi misol

Bu kod 1 dan 3 gacha bo'lgan sonlarni \`for\` sikli yordamida konsolga chiqaradi.

\`\`\`javascript
// 1: boshlanish, 2: shart, 3: qadam
for (let i = 1; i <= 3; i++) {
  console.log(i); // Joriy sonni ekranga chiqarish
}
\`\`\`

\`\`\`text
// Natija:
1
2
3
\`\`\`

---

## 4. Qator-baqator tahlil

\`for (let i = 1; i <= 3; i++) {\` qatori 3 qismdan iborat bo'lib, ular bir-biridan nuqta-vergul (\`;\`) bilan ajratiladi:

1. \`let i = 1;\` — **Boshlanish (initialization)**: hisoblagich o'zgaruvchisi yaratiladi. Bu qism faqat bir marta — sikl eng boshida boshlanganda bajariladi.
2. \`i <= 3;\` — **Shart (condition)**: har bir takrorlanishdan oldin tekshiriladi. Modomiki \`true\` ekan, sikl ishlaydi. \`false\` bo'lishi bilan sikl to'xtaydi.
3. \`i++\` — **Qadam (increment)**: sikl ichidagi kod bajarilib bo'lgach, har bir qadam oxirida \`i\` qiymatini 1 taga oshiradi (oxirgi qismdan keyin nuqta-vergul qo'yilmaydi).

- \`console.log(i);\` — sikl tanasi. Shart to'g'ri bo'lgan har bir qadamda ishga tushadi.
- \`}\` — sikl blokining oxiri. Dastur shu yerga kelganda, yuqoridagi 3-qismga (\`i++\`) o'tadi va keyin shartni qayta tekshiradi.

---

## 5. Qadamma-qadam (trace)

Bajarilish ketma-ketligi jadvali:

| Qadam | Boshlanish (\`let i = 1\`) | Shart (\`i <= 3\`) | console.log(i) | Qadam (\`i++\`) | Natija / Izoh |
|---|---|---|---|---|---|
| 1 | \`i = 1\` yaratildi | \`1 <= 3\` -> true | 1 | \`i = 2\` bo'ldi | 1 chiqdi |
| 2 | — (boshqa ishlamaydi) | \`2 <= 3\` -> true | 2 | \`i = 3\` bo'ldi | 2 chiqdi |
| 3 | — (boshqa ishlamaydi) | \`3 <= 3\` -> true | 3 | \`i = 4\` bo'ldi | 3 chiqdi |
| 4 | — (boshqa ishlamaydi) | \`4 <= 3\` -> false | — (ishlamaydi) | — | Shart yolg'on (false)! Sikl tugadi |

### while va for ni yonma-yon solishtirish

Ikkala sikl ham aynan bir xil natija beradi, lekin yozilish tuzilishi farq qiladi:

\`\`\`javascript
// while bilan:
let i = 1; // 1. Boshlanish (tashqarida)
while (i <= 3) { // 2. Shart
  console.log(i);
  i++; // 3. Qadam (pastda)
}

// for bilan (aynan bir xil, lekin 3 qism bitta qatorda):
// 1. Boshlanish; 2. Shart; 3. Qadam
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
\`\`\`

---

## 6. Yana bitta misol

1-misoldan farqi: sonlarni o'sish tartibida emas, balki kamayish tartibida (teskari sanash, \`i--\` yordamida) chiqaramiz.

Bu kod 3 dan 1 gacha teskari sanaydi:

\`\`\`javascript
// 3 dan boshlanadi, 0 dan katta bo'lsa ishlaydi, 1 taga kamayadi
for (let i = 3; i > 0; i--) {
  console.log(i); // Joriy sonni chiqarish
}
\`\`\`

\`\`\`text
// Natija:
3
2
1
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Qismlarni nuqta-vergul (;) o'rniga vergul (,) bilan ajratish

\`\`\`javascript
for (let i = 1, i <= 3, i++) { // XATO: vergul ishlatilgan
  console.log(i);
}
\`\`\`

**Nima bo'ladi:** \`SyntaxError\` xatosi chiqadi.
**To'g'ri varianti:** \`for\` qavsidagi 3 ta qism har doim ikkita nuqta-vergul (\`;\`) bilan ajratilishi shart: \`for (let i = 1; i <= 3; i++)\`.

### 2-xato: i o'zgaruvchisini sikldan tashqarida ishlatish

\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
console.log("Oxirgi i:", i); // XATO: i sikldan tashqarida mavjud emas!
\`\`\`

**Nima bo'ladi:** \`ReferenceError: i is not defined\` xatosi chiqadi. Chunki \`for (let i = ...)\` ichida e'lon qilingan o'zgaruvchi faqat sikl blokining ichida mavjud bo'ladi (blok ko'lami).
**To'g'ri varianti:** \`i\` o'zgaruvchisini faqat sikl bloki ichida ishlating yoki konsolga chiqarishni sikl ichiga qo'ying.

### 3-xato: for qatorining oxiriga darhol nuqta-vergul qo'yish

\`\`\`javascript
for (let i = 1; i <= 3; i++); { // XATO: qavsdan keyin ';' qo'yilgan!
  console.log(i);
}
\`\`\`

**Nima bo'ladi:** \`;\` belgisi bo'sh buyruq hisoblanib, sikl bo'shliqni 3 marta aylantirib tugatadi. Keyin pastdagi blok ishlamoqchi bo'lganda, \`ReferenceError: i is not defined\` xatosi beradi.
**To'g'ri varianti:** \`for\` qavsidan keyin hech qachon nuqta-vergul qo'yilmaydi, to'g'ridan-to'g'ri jingalak qavs \`{\` ochiladi.

---

## 8. Tekshiruv

### 1-mashq (oson)
1 dan 5 gacha bo'lgan sonlarni \`for\` sikli yordamida konsolga chiqaring.

### 2-mashq (o'rtacha)
Quyidagi \`while\` siklini aynan shunday natija beruvchi \`for\` sikliga aylantiring:
\`\`\`javascript
let count = 2;
while (count <= 6) {
  console.log(count);
  count += 2;
}
\`\`\`

### 3-mashq (chegara holat)
Quyidagi kod ishlaganda konsolga nimalar chiqadi?
\`\`\`javascript
for (let i = 5; i < 5; i++) {
  console.log(i);
}
console.log("Bajarildi");
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
for (let count = 2; count <= 6; count += 2) {
  console.log(count);
}
\`\`\`

**3-mashq javobi:**
Konsolga faqat \`"Bajarildi"\` chiqadi. Chunki \`5 < 5\` birinchi qadamdayoq \`false\` beradi va sikl tanasi biror marta ham ishlamaydi.

---

## 9. Xulosa

1. \`for\` sikli — boshlanish, shart va qadamni bitta qatorda ixcham jamlaydigan sikl operatoridir.
2. \`for\` ning uchta qismi bir-biridan ikkita nuqta-vergul (\`;\`) bilan ajratiladi.
3. Takrorlanishlar soni oldindan ma'lum bo'lganda \`for\` sikli \`while\` ga qaraganda ancha qisqa va qulaydir.

Keyingi darsda: Kamida bir marta bajarilishi shart bo'lgan holatlar uchun \`do...while\` siklini o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1 dan 4 gacha chiqarish",
      instruction: "`for` siklidan foydalanib, 1 dan 4 gacha bo'lgan sonlarni (1, 2, 3, 4) konsolga ketma-ket chiqaring.",
      startingCode: "// for siklini yozing\n",
      hint: "for (let i = 1; i <= 4; i++) {\n  console.log(i);\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3,4') return null;\nreturn 'Konsolga 1, 2, 3, 4 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "Teskari sanash",
      instruction: "`for` siklidan foydalanib, 3 dan 1 gacha bo'lgan sonlarni (3, 2, 1) kamayish tartibida konsolga chiqaring (`i--`).",
      startingCode: "// for sikli orqali 3 dan 1 gacha chiqaring\n",
      hint: "for (let i = 3; i > 0; i--) {\n  console.log(i);\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '3,2,1') return null;\nreturn 'Konsolga 3, 2, 1 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 3,
      title: "while ni for ga aylantirish",
      instruction: "Quyidagi `while` kodini aynan bir xil natija (2, 4) beradigan `for` sikliga aylantiring.",
      startingCode: "// Ushbu while siklini for ga aylantiring:\n// let num = 2;\n// while (num <= 4) {\n//   console.log(num);\n//   num += 2;\n// }\n",
      hint: "for (let num = 2; num <= 4; num += 2) {\n  console.log(num);\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '2,4') return null;\nreturn 'Konsolga 2, 4 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "for siklida uchta qism bir-biridan qaysi belgi bilan ajratiladi?",
      options: [
        "; (nuqta-vergul)",
        ", (vergul)",
        ": (ikki nuqta)",
        "- (chiziqcha)"
      ],
      correctAnswer: 0,
      explanation: "for siklining 3 ta qismi (boshlanish, shart, qadam) har doim nuqta-vergul (;) bilan ajratiladi."
    },
    {
      id: 2,
      question: "for (let i = 0; i < 3; i++) siklida qaysi qism faqat 1 marta — eng boshida bajariladi?",
      options: [
        "let i = 0 (boshlang'ich qiymat berish)",
        "i < 3 (shart tekshiruvi)",
        "i++ (qadam)",
        "console.log(i)"
      ],
      correctAnswer: 0,
      explanation: "Boshlang'ich qism (let i = 0) faqat bir marta — sikl boshlanganda ishlaydi, shart va qadam esa har bir takrorlanishda ishlaydi."
    },
    {
      id: 3,
      question: "for sikli while siklidan asosan nima bilan farq qiladi va qachon ma'qulroq?",
      options: [
        "Boshlanish, shart va qadam bitta qatorda yoziladi; takrorlanishlar soni oldindan ma'lum bo'lganda juda qulay",
        "for siklida shart qo'yib bo'lmaydi",
        "for sikli faqat cheksiz ishlaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "for siklida barcha 3 ta zaruriy qism bitta qatorda jamlanadi, bu esa takrorlanishlar soni ma'lum bo'lganda kodni ixcham va xatolardan xoli qiladi."
    }
  ]
};

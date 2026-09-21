export const whileLesson = {
  id: "whileLesson",
  title: "while Sikli",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz stakandan suv ichyapsiz: "Stakanda suv bor ekan, ho'plab ichishda davom etasiz". Suv tugagach, ichishni to'xtatasiz.
Yoki yugurish maydonida: "Belgilangan 3 ta aylana tugamaguncha, yugurishda davom etasiz".

\`while\` (modomiki ... ekan) — berilgan shart to'g'ri (\`true\`) bo'lib turgan vaqtda ma'lum bir kod blokini qayta-qayta takrorlovchi sikl (loop) operatoridir.

*Yangi termin:* **Sikl (loop)** — bir xil yoki o'xshash harakatni ma'lum bir shart asosida bir necha marta takrorlash jarayoni. Har bir takrorlanish esa bitta qadam (iteratsiya) deyiladi.

---

## 2. Nega kerak?

Agar 1 dan 5 gacha sonlarni ekranga chiqarmoqchi bo'lsak, shu paytgacha o'rgangan bilimimiz bilan \`console.log\`ni 5 marta qo'lda yozishimiz kerak bo'lardi:

\`\`\`javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
\`\`\`

Agar 100 ta yoki 1000 ta sonni chiqarish kerak bo'lsa-chi? Qo'lda mingta qator kod yozish juda qiyin, zerikarli va xatolarga to'la bo'ladi.

\`while\` sikli yordamida atigi 4 qator kod bilan bu ishni xohlagancha marta avtomatik bajartirish mumkin. Shart tugashi bilan sikl o'z-o'zidan to'xtaydi.

---

## 3. Birinchi misol

Bu kod 1 dan 3 gacha bo'lgan sonlarni \`while\` sikli yordamida ketma-ket konsolga chiqaradi.

\`\`\`javascript
let count = 1; // Boshlang'ich hisoblagich
while (count <= 3) { // count 3 dan kichik yoki teng bo'lsa ishlaydi
  console.log(count); // Joriy sonni ekranga chiqarish
  count++; // Hisoblagichni 1 taga oshirish
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

- \`let count = 1;\` — hisoblagich uchun \`count\` nomli o'zgaruvchi yaratib, unga \`1\` boshlang'ich qiymatini berdik.
- \`while (count <= 3) {\` — \`while\` kalit so'zi. Qavs ichida shart yoziladi: \`count <= 3\`. Modomiki bu shart \`true\` ekan, jingalak qavs \`{ ... }\` ichidagi kod qayta-qayta ishlayveradi.
- \`console.log(count);\` — joriy \`count\` qiymatini konsolga chiqaradi.
- \`count++;\` — hisoblagich qiymatini 1 taga oshiradi. Bu qator juda muhim, u siklni asta-sekin tugash shartiga yaqinlashtiradi.
- \`}\` — sikl blokining oxiri. Dastur shu yerga yetganda darhol tepaga — 2-qatordagi shart tekshiruviga qaytadi.

---

## 5. Qadamma-qadam (trace)

Keling, \`count\` qiymatining har bir qadamda qanday o'zgarishini jadvalda kuzatamiz:

| Qadam | count (boshida) | Shart: count <= 3 | console.log(count) | count++ (oxirida) | Natija / Izoh |
|---|---|---|---|---|---|
| 1 | 1 | 1 <= 3 -> true | 1 | 2 | Shart to'g'ri, 1 chiqdi, count 2 bo'ldi |
| 2 | 2 | 2 <= 3 -> true | 2 | 3 | Shart to'g'ri, 2 chiqdi, count 3 bo'ldi |
| 3 | 3 | 3 <= 3 -> true | 3 | 4 | Shart to'g'ri, 3 chiqdi, count 4 bo'ldi |
| 4 | 4 | 4 <= 3 -> false | — (ishlamaydi) | — | Shart yolg'on (false)! Sikl to'xtaydi |

---

## 6. Yana bitta misol

1-misoldan farqi: sonlarni o'sish tartibida emas, balki kamayish tartibida (teskari sanash, \`--\` yordamida) chiqaramiz.

Bu kod 3 dan 1 gacha teskari sanaydi:

\`\`\`javascript
let timer = 3; // Boshlang'ich vaqt
while (timer > 0) { // timer 0 dan katta bo'lsa ishlaydi
  console.log(timer); // Joriy vaqtni ekranga chiqarish
  timer--; // Vaqtni 1 taga kamaytirish
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

### 1-xato: Cheksiz sikl (infinite loop)
Hisoblagichni oshirishni yoki kamaytirishni unutish:

\`\`\`javascript
let count = 1;
while (count <= 3) {
  console.log(count);
  // count++ yozilmagan!
}
\`\`\`

**Nima bo'ladi:** \`count\` qiymati doimo \`1\` bo'lib qoladi. \`count <= 3\` sharti esa doim \`true\` bo'ladi. Dastur to'xtovsiz \`1\` chiqaraveradi va sahifa yoki butun brauzer qotib qoladi (cheksiz sikl / infinite loop).
**To'g'ri varianti:** Sikl bloki ichida har doim hisoblagichni o'zgartiruvchi qadam bo'lishi shart (\`count++\`).

### 2-xato: Shartning boshidanoq false bo'lishi
Boshlang'ich qiymat shartga mos kelmasligi:

\`\`\`javascript
let count = 5;
while (count < 3) {
  console.log(count);
  count++;
}
\`\`\`

**Nima bo'ladi:** Konsolga hech narsa chiqmaydi. Chunki birinchi qadamdayoq \`5 < 3\` ifodasi \`false\` qaytaradi va JavaScript sikl ichiga kirmasdan o'tib ketadi.
**To'g'ri varianti:** Boshlang'ich qiymat va tekshirilayotgan shartning o'zaro to'g'ri kelishini tekshiring.

### 3-xato: while qatoridan keyin nuqta-vergul (;) qo'yish
Shart qavsidan keyin darhol nuqta-vergul qo'yish:

\`\`\`javascript
let count = 1;
while (count <= 3); { // XATO: qavsdan keyin ';' qo'yilgan!
  console.log(count);
  count++;
}
\`\`\`

**Nima bo'ladi:** \`while (count <= 3);\` qatoridagi \`;\` belgisi bo'sh buyruq hisoblanadi. Sikl tinimsiz bo'sh buyruqni takrorlayveradi, pastdagi \`count++\` ga esa navbat yetib bormaydi. Dastur shu qatorda qotib qoladi.
**To'g'ri varianti:** \`while (...)\` qatorining oxiriga hech qachon nuqta-vergul qo'yilmaydi, to'g'ridan-to'g'ri jingalak qavs \`{\` ochiladi.

---

## 8. Tekshiruv

### 1-mashq (oson)
1 dan 4 gacha bo'lgan sonlarni \`while\` sikli yordamida ekranga chiqaruvchi kod yozing.

### 2-mashq (o'rtacha)
Quyidagi kod ishlaganda konsolga qanday natija chiqadi?
\`\`\`javascript
let number = 2;
while (number <= 6) {
  console.log(number);
  number += 2;
}
\`\`\`

### 3-mashq (chegara holat)
Quyidagi kod ishlaganda konsolga nimalar chiqadi?
\`\`\`javascript
let count = 10;
while (count < 5) {
  console.log("Salom");
  count++;
}
console.log("Tugadi");
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
let count = 1;
while (count <= 4) {
  console.log(count);
  count++;
}
\`\`\`

**2-mashq javobi:**
Konsolga \`2\`, \`4\` va \`6\` sonlari chiqadi (chunki \`number\` har qadamda \`+= 2\` bilan 2 taga oshib boradi).

**3-mashq javobi:**
Konsolga faqat \`"Tugadi"\` chiqadi. Chunki \`10 < 5\` sharti boshidanoq \`false\` bo'lgani uchun, sikl ichidagi \`"Salom"\` biror marta ham ishlamaydi.

---

## 9. Xulosa

1. \`while\` sikli — qavs ichidagi shart \`true\` bo'lib turgan muddatda o'z kod blokini qayta-qayta takrorlaydi.
2. Sikl har bir qadam oldidan shartni tekshiradi; shart \`false\` bo'lishi bilan sikl to'xtaydi.
3. Sikl tanasida hisoblagich qiymatini o'zgartirish (\`count++\`, \`count--\`) shart, aks holda cheksiz sikl (infinite loop) yuzaga keladi.

Keyingi darsda: Kamida bir marta bajarilishi shart bo'lgan holatlar uchun \`do...while\` siklini o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1 dan 3 gacha chiqarish",
      instruction: "`count` o'zgaruvchisi berilgan. `while` siklidan foydalanib, 1, 2 va 3 sonlarini konsolga chiqaring.",
      startingCode: "let count = 1;\nwhile (count <= 3) {\n  \n}\n",
      hint: "while (count <= 3) {\n  console.log(count);\n  count++;\n}",
      test: "if (!code.includes('while')) return 'while sikli ishlatilmadi';\nif (!code.includes('++') && !code.includes('+=') && !code.includes('+ 1')) return 'Hisoblagichni oshirish (count++) unutilgan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn 'Konsolga 1, 2, 3 sonlari chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "Teskari sanash",
      instruction: "`let timer = 3;` berilgan. `while` siklidan foydalanib, 3, 2, 1 sonlarini kamayish tartibida konsolga chiqaring.",
      startingCode: "let timer = 3;\nwhile (timer > 0) {\n  \n}\n",
      hint: "while (timer > 0) {\n  console.log(timer);\n  timer--;\n}",
      test: "if (!code.includes('while')) return 'while sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '3,2,1') return null;\nreturn 'Konsolga 3, 2, 1 sonlari chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 3,
      title: "Cheksiz siklni to'g'rilash",
      instruction: "Quyidagi kodda `count` qiymati o'zgarmayotgani uchun cheksiz sikl xavfi bor. Sikl ichiga `count++;` qatorini qo'shib, xatoni tuzating.",
      startingCode: "let count = 1;\nwhile (count <= 2) {\n  console.log(count);\n  // bu yerga count++ yozing\n}\n",
      hint: "console.log(count);\ncount++;",
      test: "if (!code.includes('count++') && !code.includes('count += 1') && !code.includes('count = count + 1')) return 'count++ qo\\'shilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2') return null;\nreturn 'Konsolga 1, 2 sonlari chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "while sikli qachongacha o'z kod blokini takrorlaydi?",
      options: [
        "Qavs ichidagi shart true bo'lib turgan muddatda",
        "Faqat bir marta",
        "Shart false bo'lgandagina",
        "Har doim cheksiz marta"
      ],
      correctAnswer: 0,
      explanation: "while sikli o'zining sharti rost (true) bo'lib turgan vaqtda blok ichidagi kodni qayta-qayta takrorlayveradi."
    },
    {
      id: 2,
      question: "while siklida hisoblagichni (masalan count++) o'zgartirish nima uchun shart?",
      options: [
        "Sikl cheksiz aylanib qolmasligi va shart oxir-oqibat false bo'lib to'xtashi uchun",
        "O'zgaruvchini matnga (string) aylantirish uchun",
        "Faqat kod chiroyli ko'rinishi uchun",
        "console.log ishlashi uchun"
      ],
      correctAnswer: 0,
      explanation: "Agar hisoblagich o'zgarmasa, shart doim true bo'lib qoladi va natijada dastur cheksiz siklga tushib qotib qoladi."
    },
    {
      id: 3,
      question: "Agar while sharti eng boshidayoq false bo'lsa (masalan while (5 < 3)), nima sodir bo'ladi?",
      options: [
        "Sikl bloki biror marta ham ishlamasdan tashlab ketiladi",
        "Sikl kamida bir marta ishlaydi",
        "Dastur xato beradi",
        "Cheksiz sikl yuzaga keladi"
      ],
      correctAnswer: 0,
      explanation: "while sikli shartni qadamdan oldin tekshiradi. Shart boshidanoq false bo'lsa, blok ichidagi kod umuman bajarilmaydi."
    }
  ]
};

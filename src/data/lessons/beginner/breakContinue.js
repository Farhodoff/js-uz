export const breakContinue = {
  id: "break-continue",
  title: "Break va Continue",
  level: "Beginner",
  description: "Sikl oqimini nazorat qilish: to'xtatish yoki ma'lum bir qadamni sakrab o'tish.",
  theory: `
# Break va Continue – Bu nima va nima uchun kerak?

Sikllar bilan ishlaganda ba'zida bizga siklni muddatidan oldin to'xtatish yoki ma'lum bir qadamni (iteratsiyani) tashlab o'tib ketish kerak bo'ladi. Buning uchun **break** va **continue** ishlatiladi.

## 1. NEGA kerak?
- **Break:** Tasavvur qiling, sizga 1000 ta mahsulot ichidan bittasini topish kerak. Uni 10-chi o'rinda topdingiz. Qolgan 990 tasini tekshirib o'tirish vaqtni yo'qotishdir. \`break\` orqali qidiruvni darhol to'xtatamiz.
- **Continue:** Masalan, 1 dan 10 gacha sonlarni chiqaryapsiz, lekin faqat toq sonlar kerak. Juft son kelganda uni "tashlab o'tib ketish" uchun \`continue\` kerak.

## 2. SODDALIK (Analogiya)
- **Break:** Bu xuddi **favqulodda tormozga** o'xshaydi. Poezd manziligacha bormay, o'rtada to'xtaydi.
- **Continue:** Bu esa **navbatdan sakrab o'tish** kabi. Siz navbatdasiz, lekin bitta odamni (shartga mosini) o'tkazib yuborib, o'zingiz keyingi odam bilan gaplashishda davom etasiz.

## 3. STRUKTURA

### A. Break (Sikldan chiqish)
\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // 5 ga yetganda butunlay to'xtaydi
  }
  console.log(i); // 1, 2, 3, 4
}
\`\`\`

### B. Continue (Qadamdan sakrash)
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // 3 ni tashlab o'tib ketadi
  }
  console.log(i); // 1, 2, 4, 5
}
\`\`\`

## 4. AMALIYOT (Mashq)
Ismlar massividan "Ali"ni qidirish:
\`\`\`javascript
let ismlar = ["Vali", "G'ani", "Ali", "Hasan"];
for (let ism of ismlar) {
  if (ism === "Ali") {
    console.log("Ali topildi!");
    break;
  }
  console.log("Tekshirildi: " + ism);
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **switch ichida continue:** \`continue\` faqat sikllarda ishlaydi, \`switch\` ichida ishlamaydi.
2. **Infinite Loop (while bilan):** \`while\` siklida \`continue\` ishlatganda ehtiyot bo'ling! Agar sanoqni (\`i++\`) \`continue\`dan keyin qo'ysangiz, u hech qachon ishlamaydi va sikl cheksiz bo'lib qoladi.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. break va continue farqi nimada?**
\`break\` siklni darhol va butunlay to'xtatadi. \`continue\` esa joriy qadamni (iteratsiyani) tashlab yuborib, siklning keyingi qadamidan davom ettiradi.


**2. Siklni butunlay to'xtatish uchun qaysi biri ishlatiladi?**
Siklni to'liq to'xtatish va undan chiqib ketish uchun \`break\` operatori ishlatiladi.


**3. Faqat bitta qadamni o'tkazib yuborish uchun-chi?**
Joriy iteratsiyadagi qolgan kodlarni bajarmasdan, keyingi qadamga o'tish uchun \`continue\` operatori ishlatiladi.


**4. break ishlatilgandan keyin sikldan keyingi kodlar ishlaydimi?**
Ha, \`break\` faqat siklning o'zini to'xtatadi, sikldan keyin yozilgan navbatdagi kodlar odatdagidek bajarilishda davom etadi.


**5. continue ishlatilganda keyingi iteratsiyaga o'tiladimi?**
Ha, \`continue\` bajarilishi bilan brauzer joriy iteratsiyani yakunlab, sikl shartini tekshiradi va keyingi qadamga o'tadi.


**6. Qidiruv algoritmlarida qaysi biri ko'p ishlatiladi?**
Qidiruv algoritmlarida kerakli element topilishi bilanoq ortiqcha hisob-kitob qilmaslik va vaqtni tejash uchun \`break\` ko'p ishlatiladi.


**7. if shartisiz break ishlatsa nima bo'ladi?**
Sikl birinchi qadamidayoq (iteratsiyada) \`break\`ga duch keladi va birinchi marta ham to'liq aylanmasdan darhol tugaydi.


**8. while siklida continue ishlatishdagi asosiy xavf nima?**
Agar sanoqni o'zgartiruvchi kod (\`i++\` kabi) \`continue\` operatoridan keyin yozilgan bo'lsa, u bajarilmay qoladi va natijada sikl cheksiz aylanib qoladi (infinite loop).


**9. Nested (ichma-ich) sikllarda break qaysi siklni to'xtatadi?**
\`break\` har doim o'zi yozilgan eng yaqin ichki siklni to'xtatadi. Tashqi sikl esa o'z ishini davom ettiraveradi.


**10. Labels (yorliqlar) nima va break bilan qanday ishlatiladi?**
Yorliqlar (\`label:\`) — siklga nom berish imkonini beradi. Ichma-ich sikllarda ichki sikl ichidan turib tashqi siklni to'xtatish uchun \`break yorliqNomi;\` shaklida ishlatiladi.


**11. breakni switchdan tashqarida ishlatish mumkinmi?**
Ha, \`break\` faqat \`switch\` blokida va barcha turdagi sikllar (\`for\`, \`while\`, \`do...while\`) ichida ishlatilishi mumkin.


**12. O'quvchi uchun break tushunarliroqmi yoki if...else?**
Ikkalasi ham o'z o'rniga ega: shartlarni boshqarishda \`if...else\`, sikllar oqimini favqulodda nazorat qilishda esa \`break\` eng tushunarli va qulay yechimdir.
`,
  exercises: [
    {
      id: 1,
      title: "Break sinovi",
      instruction: "0 dan 10 gacha sonlarni chiqaring, lekin 7 ga yetganda to'xtating.",
      startingCode: "for (let i = 0; i <= 10; i++) {\n  // Bu yerda\n  console.log(i);\n}",
      hint: "if (i === 7) break;",
      test: "if (logs.includes(6) && !logs.includes(7)) return null; return '7 da to\\'xtamadi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`break` va `continue` operatorlarining asosiy vazifalari farqi nimada?",
      options: [
        "`break` tsiklni keyingi qadamga o'tkazadi, `continue` esa tsiklni butunlay tugatadi",
        "`break` tsiklni darhol va butunlay to'xtatadi; `continue` esa joriy qadamni (iteratsiyani) tashlab yuborib, tsiklning keyingi qadamidan davom ettiradi",
        "Ular o'rtasida farq yo'q, ikkalasi ham tsikldan chiqaradi",
        "`continue` faqat `while` tsiklida, `break` esa faqat `for` tsiklida ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`break` (buzish) butun tsikl faoliyatini butunlay tugatib yuboradi. `continue` (davom etish) esa joriy iteratsiyani yakunlab, tsiklning navbatdagi aylanishiga o'tadi."
    },
    {
      id: 2,
      question: "Quyidagi kod bajarilganda konsolda qanday natijalar ko'rinadi?\n```javascript\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}\n```",
      options: [
        "`1, 2`",
        "`1, 2, 4, 5` (chunki i === 3 bo'lganda console.log bajarilmasdan keyingi iteratsiyaga o'tiladi)",
        "`1, 2, 3, 4, 5`",
        "`4, 5`"
      ],
      correctAnswer: 1,
      explanation: "`i === 3` bo'lganda `continue` operatori ishlaydi va o'sha qadamdagi qolgan kodlar (ya'ni `console.log(i)`) bajarilmasdan tsikl `i = 4` qadamiga sakraydi."
    },
    {
      id: 3,
      question: "Ichma-ich joylashgan (nested) tsikllarda eng ichki tsikl ichida `break` ishlatilsa, u qaysi tsiklni to'xtatadi?",
      options: [
        "Barcha tsikllarni (ham ichki, ham tashqi tsiklni)",
        "Faqat o'zi yozilgan eng yaqin ichki tsiklni (tashqi tsikl esa o'z faoliyatini davom ettiraveradi)",
        "Hech qaysinisini to'xtatmaydi, xato beradi",
        "Faqat tashqi tsiklni"
      ],
      correctAnswer: 1,
      explanation: "`break` har doim o'zining eng yaqin o'rab turgan bitta tsiklini to'xtatadi. Tashqaridagi tsikllar ishini davom ettiradi."
    },
    {
      id: 4,
      question: "`while` tsiklida `continue` ishlatganda dasturchilar eng ko'p yo'l qo'yadigan xatolik qaysi?",
      options: [
        "Tsiklni yopishni unutish",
        "Sanoq o'zgartiruvchini (i++) `continue`dan keyin yozish (chunki `continue` bajarilganda bu satr bajarilmay qoladi va tsikl cheksiz aylanib qoladi)",
        "Shartni noto'g'ri qo'yish",
        "`var` o'rniga `let` ishlatish"
      ],
      correctAnswer: 1,
      explanation: "`while` tsiklida `continue` chaqirilganda, tsikl boshiga qaytiladi. Agar sanoq o'zgaruvchisi `continue`dan pastda bo'lsa, u hech qachon oshmaydi va shart har doim true bo'lib cheksiz sikl yuzaga keladi."
    },
    {
      id: 5,
      question: "Quyidagi bloklardan qaysi birining ichida `continue` ishlatilsa (agar u tsikl ichida bo'lmasa), sintaktik xatolik (SyntaxError) yuz beradi?",
      options: [
        "`for` tsikli",
        "`while` tsikli",
        "`switch` bloki ichida",
        "`do...while` tsikli"
      ],
      correctAnswer: 2,
      explanation: "`continue` faqat tsikllar (`for`, `while`, `do...while`) ichida ishlatilishi shart. Uni oddiy `switch` yoki `if` bloklari ichida mustaqil ishlatish taqiqlangan."
    }
  ]
};

export const breakContinue = {
  id: "break-continue",
  title: "Break va Continue",
  level: "Beginner",
  description: "Sikl oqimini nazorat qilish: to'xtatish yoki ma'lum bir qadamni sakrab o'tish.",
  theory: `## 1. NEGA kerak?
Sikllar bilan ishlaganda ba'zida bizga siklni muddatidan oldin to'xtatish yoki ma'lum bir qadamni (iteratsiyani) tashlab o'tib ketish kerak bo'ladi.
- **Break:** Masalan, 1000 ta mahsulot ichidan keraklisini qidiryapsiz. Uni 10-chi o'rinda topdingiz. Qolgan 990 tasini tekshirib o'tirish vaqtni bekorga yo'qotishdir. \`break\` orqali qidiruvni darhol to'xtatamiz.
- **Continue:** Masalan, 1 dan 10 gacha sonlarni chiqaryapsiz, lekin faqat toq sonlar kerak. Juft son kelganda uni "tashlab o'tib ketish" uchun \`continue\` kerak.

## 2. SODDALIK (Analogiya)
- **Break:** Bu xuddi **favqulodda tormozga** o'xshaydi. Poezd oxirgi bekatgacha bormay, o'rtada to'xtaydi.
- **Continue:** Bu esa **navbatdan sakrab o'tish** kabi. Siz navbatdagi odamni (masalan, hujjati yo'qni) o'tkazib yuborib, keyingi odam bilan suhbatni davom ettirasiz.

## 3. STRUKTURA

### A. Break (Sikldan chiqish)
\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // 5 ga yetganda siklni butunlay to'xtatadi
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

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **switch ichida continue:** \`continue\` operatori faqat sikllarda (\`for\`, \`while\`) ishlaydi, \`switch\` ichida ishlatib bo'lmaydi.
2. **Infinite Loop (while bilan):** \`while\` siklida \`continue\` ishlatganda ehtiyot bo'ling! Agar sanoqni (\`i++\`) \`continue\`dan keyin qo'ysangiz, u bajarilmay qoladi va sikl cheksiz aylanib qoladi.
3. **forEach ichida break/continue:** Array metodlari (\`forEach\`, \`map\`, \`filter\`) ichida \`break\` yoki \`continue\`dan foydalanib bo'lmaydi. Buning uchun oddiy \`for\` yoki \`for...of\` sikli lozim.

## 6. SAVOLLAR VA JAVOBLAR
**1. break va continue operatorlarining asosiy farqi nimada?**
\`break\` siklni darhol va butunlay to'xtatadi. \`continue\` esa joriy qadamni tashlab, keyingi qadamdan davom ettiradi.

**2. Siklni to'liq to'xtatish uchun qaysi biri ishlatiladi?**
Siklni to'xtatib undan chiqib ketish uchun \`break\` ishlatiladi.

**3. Faqat bitta iteratsiyani o'tkazib yuborish uchun-chi?**
Joriy qadamdagi qolgan kodlarni bajarmay, keyingi qadamga o'tish uchun \`continue\` ishlatiladi.

**4. break ishlatilgandan keyin sikldan keyingi kodlar ishlaydimi?**
Ha, \`break\` faqat siklni to'xtatadi, undan keyin keladigan tashqi kodlar bajarilaveradi.

**5. continue ishlatilganda keyingi iteratsiyaga o'tiladimi?**
Ha, joriy iteratsiya yakunlanib, sikl sharti tekshiriladi va keyingi qadam boshlanadi.

**6. Qidiruv algoritmlarida qaysi biri ko'p ishlatiladi?**
Kerakli element topilganda ortiqcha aylanishlarning oldini olish uchun \`break\` ko'p ishlatiladi.

**7. if shartisiz break ishlatsa nima bo'ladi?**
Sikl birinchi qadamidayoq \`break\`ga duch keladi va birinchi aylanmasdanoq to'xtaydi.

**8. while siklida continue ishlatishdagi asosiy xavf nima?**
Agar sanoq (\`i++\`) \`continue\`dan pastda bo'lsa, u bajarilmaydi va cheksiz sikl yuzaga keladi.

**9. Ichma-ich (nested) sikllarda break qaysi birini to'xtatadi?**
O'zi joylashgan eng yaqin ichki siklni to'xtatadi.

**10. Labels (yorliqlar) nima?**
Ichma-ich sikllarda ichki sikl ichidan tashqi siklni to'xtatish yoki davom ettirish uchun sikllarga nom (yorliq) berish mexanizmi.

**11. breakni switchdan tashqarida ishlatish mumkinmi?**
Ha, faqat sikllar (\`for\`, \`while\`, \`do...while\`) ichida ishlatish mumkin.

**12. forEach ichida break ishlatib bo'ladimi?**
Yo'q, \`forEach\` ichida \`break\` yoki \`continue\` ishlatsangiz xatolik yuz beradi.
`,
  exercises: [
    {
      id: 1,
      title: "Break sinovi",
      instruction: "0 dan 10 gacha sonlarni chiqaring, lekin 7 ga yetganda to'xtating.",
      startingCode: "for (let i = 0; i <= 10; i++) {\n  // Bu yerga yozing\n  console.log(i);\n}",
      hint: "if (i === 7) break;",
      test: "if (logs.includes(6) && !logs.includes(7)) return null; return '7 da to\\'xtamadi!';"
    },
    {
      id: 2,
      title: "Continue sinovi",
      instruction: "1 dan 5 gacha sonlarni chiqaring, lekin 3 ni tashlab keting.",
      startingCode: "for (let i = 1; i <= 5; i++) {\n  // Bu yerga yozing\n  console.log(i);\n}",
      hint: "if (i === 3) continue;",
      test: "if (logs.includes(2) && !logs.includes(3) && logs.includes(4)) return null; return '3 tashlab ketilmadi!';"
    },
    {
      id: 3,
      title: "Juft sonlar filteri",
      instruction: "1 dan 10 gacha bo'lgan sonlar ichidan faqat juftlarini chiqaring. Toq bo'lsa continue qiling.",
      startingCode: "for (let i = 1; i <= 10; i++) {\n  // Bu yerga yozing\n  console.log(i);\n}",
      hint: "if (i % 2 !== 0) continue;",
      test: "if (logs.includes(2) && !logs.includes(3) && logs.includes(4) && !logs.includes(5)) return null; return 'Faqat juft sonlar chiqishi kerak!';"
    },
    {
      id: 4,
      title: "Ism qidirish",
      instruction: "Ismlar massividan 'Ali'ni qidirib toping, topilsa 'Topildi' deb log qiling va qidiruvni to'xtating.",
      startingCode: "const names = ['Vali', 'Sami', 'Ali', 'Hasan'];\nfor (let name of names) {\n  // Bu yerga yozing\n}",
      hint: "if (name === 'Ali') { console.log('Topildi'); break; }",
      test: "if (logs.includes('Topildi') && !logs.includes('Hasan')) return null; return 'Ali topilganda break qiling va Topildi deb log qiling';"
    },
    {
      id: 5,
      title: "Yig'indi cheklovi",
      instruction: "1 dan 100 gacha bo'lgan sonlarni qo'shing. Agar yig'indi 50 dan oshsa, darhol to'xtating va yig'indini log qiling.",
      startingCode: "let sum = 0;\nfor (let i = 1; i <= 100; i++) {\n  // Bu yerga yozing\n}",
      hint: "sum += i; if (sum > 50) { console.log(sum); break; }",
      test: "if (logs.length > 0 && logs[0] > 50 && logs[0] < 100) return null; return 'Yig\\'indi 50 dan oshganda break qiling va logga chiqaring!';"
    },
    {
      id: 6,
      title: "Manfiylarni o'tkazish",
      instruction: "Massivdagi faqat musbat sonlarni ko'paytirib boring. Manfiy bo'lsa continue qiling.",
      startingCode: "const nums = [2, -3, 4, -5, 3];\nlet prod = 1;\nfor (let n of nums) {\n  // Bu yerga yozing\n}\nconsole.log(prod);",
      hint: "if (n < 0) continue; prod *= n;",
      test: "if (logs.includes(24)) return null; return 'Manfiy sonlar ko\\'paytmaga qo\\'shilmasligi kerak (2 * 4 * 3 = 24)';"
    },
    {
      id: 7,
      title: "Qizil chiroqda to'xtash",
      instruction: "Ranglar massividan aylanib, ranglarni chop eting. Agar 'qizil' kelsa to'xtating.",
      startingCode: "const colors = ['yashil', 'sariq', 'qizil', 'ko\\'k'];\nfor (let c of colors) {\n  // Bu yerga yozing\n}",
      hint: "if (c === 'qizil') break; console.log(c);",
      test: "if (logs.includes('sariq') && !logs.includes('qizil') && !logs.includes('ko\\'k')) return null; return 'qizil kelganda break qiling!';"
    },
    {
      id: 8,
      title: "while break",
      instruction: "while siklida counter 5 ga teng bo'lganda break qilib chiqing.",
      startingCode: "let count = 0;\nwhile (true) {\n  // Bu yerga yozing\n}",
      hint: "count++; if (count === 5) break;",
      test: "if (code.includes('break')) return null; return 'while siklini break orqali to\\'xtating!';"
    },
    {
      id: 9,
      title: "3 ga karrali sonlarni o'tkazib yuborish",
      instruction: "1 dan 10 gacha sonlarni ko'rsating, lekin 3 ga bo'linadiganlarini continue qiling.",
      startingCode: "for (let i = 1; i <= 10; i++) {\n  // Bu yerga yozing\n  console.log(i);\n}",
      hint: "if (i % 3 === 0) continue;",
      test: "if (logs.includes(2) && !logs.includes(3) && logs.includes(5) && !logs.includes(6)) return null; return '3 ga bo\\'linadiganlarni continue qiling!';"
    },
    {
      id: 10,
      title: "Birinchi manfiy son",
      instruction: "Massivdagi birinchi manfiy sonni aniqlang va log qiling, keyin siklni to'xtating.",
      startingCode: "const numbers = [4, 8, -2, 9, -5];\nfor (let num of numbers) {\n  // Bu yerga yozing\n}",
      hint: "if (num < 0) { console.log(num); break; }",
      test: "if (logs.includes(-2) && !logs.includes(-5)) return null; return 'Birinchi manfiy son topilishi bilanoq break qiling!';"
    },
    {
      id: 11,
      title: "Bo'sh joylarni o'tkazish",
      instruction: "Massivdagi bo'sh string bo'lmagan so'zlarni log qiling. Bo'sh bo'lsa continue qiling.",
      startingCode: "const words = ['olma', '', 'anor', '', 'behi'];\nfor (let w of words) {\n  // Bu yerga yozing\n}",
      hint: "if (w === '') continue; console.log(w);",
      test: "if (logs.includes('olma') && !logs.includes('') && logs.includes('anor')) return null; return 'Bo\\'sh stringlarni continue qiling!';"
    },
    {
      id: 12,
      title: "Cheksiz while to'xtatilishi",
      instruction: "1 dan boshlab har bir sonni kvadratini log qiling, lekin kvadrat 100 dan oshsa yoki teng bo'lsa to'xtating.",
      startingCode: "let i = 1;\nwhile (true) {\n  // Bu yerga yozing\n}",
      hint: "let sq = i * i; if (sq >= 100) break; console.log(sq); i++;",
      test: "if (logs.includes(81) && !logs.includes(100)) return null; return 'Kvadrat 100 dan oshganda break qiling!';"
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
      explanation: "`while` tsiklida `continue` chaqirilganda, tsikl boshiga qaytiladi. Agar sanoq o'zgaruvchisi `continue`dan pastda bo'lsa, u vaqtda sanoq o'zgarmasdan cheksiz sikl yuzaga keladi."
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
    },
    {
      id: 6,
      question: "Quyidagi kod nimani chop etadi?\n```javascript\nfor (let i = 0; i < 3; i++) {\n  if (i === 1) break;\n  console.log(i);\n}\n```",
      options: [
        "0 va 1",
        "Faqat 0",
        "0, 1, 2",
        "Hech narsa chop etmaydi"
      ],
      correctAnswer: 1,
      explanation: "i = 0 bo'lganda 0 chop etiladi. i = 1 bo'lganda shart bajarilib `break` ishga tushadi va sikl butunlay tugaydi."
    },
    {
      id: 7,
      question: "JavaScriptda `label` (yorliq) bilan `break` qanday vazifani bajaradi?",
      options: [
        "Sikl ichidagi kodlarni tezlashtiradi",
        "Sintaktik xatolarni avtomatik tuzatadi",
        "Ichma-ich kelgan sikllarda tashqi belgilangan siklni ichki sikl ichidan turib to'xtatish imkonini beradi",
        "Faqat funksiyalardan chiqishda foydalaniladi"
      ],
      correctAnswer: 2,
      explanation: "Yorliqlar (Labels) yordamida tashqi siklga nom berib, ichki sikl ichidan turib `break yorliq_nomi` deb yozish orqali tashqi siklni ham to'xtata olamiz."
    },
    {
      id: 8,
      question: "Array.prototype.forEach() metodida `break` kalit so'zini ishlatsak nima bo'ladi?",
      options: [
        "Sikl normal to'xtaydi",
        "Faqat joriy element tashlab ketiladi",
        "SyntaxError yoki boshqa xatolik yuz beradi (chunki forEach callback funksiya qabul qiladi, oddiy sikl emas)",
        "Sikl cheksiz bo'lib qoladi"
      ],
      correctAnswer: 2,
      explanation: "`break` va `continue` faqatgina an'anaviy sikl operatorlari (`for`, `while`) ichida ishlashga mo'ljallangan. `forEach` callback funksiyadir va u yerda buni ishlatib bo'lmaydi."
    },
    {
      id: 9,
      question: "Quyidagi kod natijasi nima?\n```javascript\nlet sum = 0;\nfor (let i = 1; i <= 3; i++) {\n  if (i === 2) continue;\n  sum += i;\n}\nconsole.log(sum);\n```",
      options: [
        "4",
        "6",
        "3",
        "5"
      ],
      correctAnswer: 0,
      explanation: "i=1 da sum = 1 bo'ladi. i=2 da `continue` bajariladi (sumga qo'shilmaydi). i=3 da sum = 1 + 3 = 4 bo'ladi."
    },
    {
      id: 10,
      question: "`break` va `continue` operatorlarining eng asosiy kamchiligi nima bo'lishi mumkin?",
      options: [
        "Xotirani juda ko'p egallaydi",
        "Kod o'qilishini qiyinlashtirib, mantiqni chalkashtirishi (spaghetti code) mumkin",
        "Barcha brauzerlar qo'llab-quvvatlamaydi",
        "Faqat sonlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Haddan tashqari ko'p `break` va `continue`larni sikllar ichida ishlatish kod oqimini kuzatishni qiyinlashtiradi (control flow chalkashadi)."
    },
    {
      id: 11,
      question: "Sikldan muddatidan oldin chiqish (break) koddagi qaysi jihatni yaxshilaydi?",
      options: [
        "Xavfsizlikni",
        "Ishlash tezligi (Performance) va keraksiz hisob-kitoblarni kamaytirishni",
        "Fayl hajmini qisqartirishni",
        "Dizaynni yaxshilaydi"
      ],
      correctAnswer: 1,
      explanation: "Kerakli qiymat topilganda siklni break qilish qolgan minglab iteratsiyalarni bajarmasdan, vaqt va protsessor quvvatini tejaydi."
    },
    {
      id: 12,
      question: "Quyidagi kod nimani chop etadi?\n```javascript\nlet count = 0;\nfor (let i = 0; i < 5; i++) {\n  for (let j = 0; j < 5; j++) {\n    if (j === 2) break;\n    count++;\n  }\n}\nconsole.log(count);\n```",
      options: [
        "25",
        "10",
        "5",
        "15"
      ],
      correctAnswer: 1,
      explanation: "Har bir tashqi sikl aylanishida (jami 5 marta) ichki sikl j=0, j=1 larda `count`ni oshiradi. j=2 bo'lganda ichki sikl break bo'ladi. Jami: 5 * 2 = 10 marta."
    }
  ]
};

export const switchLesson = {
  id: "switch",
  title: "Switch Operatori",
  level: "Beginner",
  description: "JavaScriptda switch operatori yordamida ko'p shartli tekshiruvlarni qulay va tartibli amalga oshirish.",
  theory: `## 1. NEGA kerak?
Hafta kuni raqamiga (1-7) qarab nomini yoki oylar bo'yicha fasllarni aniqlash kabi vazifalarda if-else zanjiri juda uzun bo'lib ketadi. Har bir holatni alohida else if bilan tekshirish o'rniga, switch operatori kodni tartibli, o'qilishi oson va chiroyli qilish uchun xizmat qiladi.

## 2. SODDALIK (Analogiya)
Buni avtomat telefonga (ATC) yoki lift tugmalariga o'xshatish mumkin. Siz 5-qavat tugmasini bossangiz (o'zgaruvchi qiymati), lift boshqa qavatlarda to'xtamasdan to'g'ri 5-qavatga boradi. Har bir qavat - bu bitta case (holat).

## 3. STRUKTURA
Switch operatorining umumiy tuzilishi quyidagicha:
\`\`\`javascript
switch (o'zgaruvchi) {
  case qiymat1:
    // bajariladigan kod
    break;
  case qiymat2:
    // bajariladigan kod
    break;
  default:
    // hech biri mos kelmasa bajariladigan kod
}
\`\`\`
- **break:** Ushbu kalit so'z joriy case bajarilgandan so'ng switch zanjirini to'xtatadi. Agar u yozilmasa, keyingi case ham bajarilib ketadi (bunga Fall-through deyiladi).
- **default:** Hech bir case mos kelmaganda ishlaydigan blok (if-else dagi else kabi).

## 4. AMALIYOT (Mashqlar pastda)
Bir nechta case uchun bitta natija qaytarish:
\`\`\`javascript
let faslId = 4;
switch (faslId) {
  case 3:
  case 4:
  case 5:
    console.log("Bahor");
    break;
  default:
    console.log("Boshqa fasl");
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **break operatorini yozmaslik:** Agar break yozilmasa, dastur mos case topilgandan keyin pastdagi hamma caselarni ham ishlatib yuboradi.
2. **Turlar mos kelmasligi (Strict Equality):** Switch qiymatlarni qat'iy tenglik (===) orqali tekshiradi. Ya'ni switch(5) bo'lsa, case "5": mos kelmaydi (chunki son 5 matnli "5" ga qat'iy teng emas).

## 6. SAVOLLAR VA JAVOBLAR
**1. switch operatori nima vazifani bajaradi?**
O'zgaruvchi yoki ifodani berilgan bir nechta qiymatlar (case) bilan solishtirib, mos keladigan kod blokini ishga tushirish uchun xizmat qiladi.

**2. Qachon if...else o'rniga switch ishlatgan ma'qul?**
Bitta o'zgaruvchining ko'plab aniq qiymatlarini tekshirish kerak bo'lganda, kodni toza va o'qilishi oson qilish uchun.

**3. case kalit so'zi nima?**
Solishtirilayotgan aniq qiymatni belgilaydi. Agar qiymatlar mos kelsa, shu casedan keyingi kod ishlaydi.

**4. break kalit so'zi nima uchun shart?**
Joriy case bajarilgach switch operatoridan chiqib ketish uchun. Aks holda keyingi caselar ham ketma-ket bajariladi.

**5. default bloki nima vazifani bajaradi?**
Hech bir case mos kelmaganda ishlaydi (if-else dagi else kabi).

**6. switch qanday tenglik operatoridan foydalanadi?**
Qat'iy tenglik (===) operatoridan foydalanadi (qiymat va turni tekshiradi).

**7. "Fall-through" nima degani?**
break qo'yilmagani sababli, mos case bajarilgandan so'ng pastdagi keyingi caselar ham bajarilib ketish holati.

**8. default har doim oxirida bo'lishi shartmi?**
Yo'q, istalgan joyda kelishi mumkin, lekin oxirida yozish standart hisoblanadi. Agar boshida kelib, break qo'yilmasa, pastdagilar ham bajariladi.

**9. Bitta case ichida bir nechta amal bajarish mumkinmi?**
Ha, istalgancha kod qatorlarini yozish va bir nechta amalni bajarish mumkin.

**10. switch ichida boshqa switch ishlatish mumkinmi?**
Ha, nested switch mumkin, lekin kodning o'qilishini qiyinlashtirgani uchun tavsiya etilmaydi.

**11. Matnli qiymatlarni switchda tekshirsa bo'ladimi?**
Ha, switch sonlar, matnlar, boolean va boshqa har qanday turdagi qiymatlarni solishtira oladi.

**12. switch(true) usuli nima uchun ishlatiladi?**
case-lar ichida shartli diapazonlarni (masalan: case yosh > 18:) tekshirish uchun ishlatiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Kunni toping",
      instruction: "day o'zgaruvchisiga qarab, agar u 1 bo'lsa 'Dushanba', 2 bo'lsa 'Seshanba' qiymatini res o'zgaruvchisiga yozing (switch orqali).",
      startingCode: "let day = 1;\nlet res = '';\n// Bu yerga yozing\n",
      hint: "switch(day) {\n  case 1:\n    res = 'Dushanba';\n    break;\n  case 2:\n    res = 'Seshanba';\n    break;\n}",
      test: "if (res === 'Dushanba') return null; return 'res qiymati Dushanba bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Faslni aniqlash",
      instruction: "month o'zgaruvchisi qiymatiga qarab (12, 1, 2) fasl nomini 'Qish' deb season o'zgaruvchisiga yozing. switch ishlating.",
      startingCode: "let month = 1;\nlet season = '';\n// Bu yerga yozing\n",
      hint: "switch(month) {\n  case 12:\n  case 1:\n  case 2:\n    season = 'Qish';\n    break;\n}",
      test: "if (season === 'Qish') return null; return 'season Qish bo\\'lishi kerak!';"
    },
    {
      id: 3,
      title: "Strict type check",
      instruction: "score o'zgaruvchisi '5' (string) bo'lsa, switch orqali tekshirib res o'zgaruvchisiga 'Matn' deb yozing. (Strict equality ishlatilishini inobatga oling).",
      startingCode: "let score = '5';\nlet res = '';\n// Bu yerga yozing\n",
      hint: "switch(score) {\n  case '5':\n    res = 'Matn';\n    break;\n  case 5:\n    res = 'Son';\n    break;\n}",
      test: "if (res === 'Matn') return null; return 'res Matn bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Default holati",
      instruction: "animal o'zgaruvchisi qiymati mos keladigan case topilmasa, default blokida status o'zgaruvchisiga 'Noma'lum' qiymatini bering.",
      startingCode: "let animal = 'ayiq';\nlet status = '';\n// Bu yerga yozing\n",
      hint: "switch(animal) {\n  case 'kuchuk': status = 'Uy hayvoni'; break;\n  default: status = 'Noma\\'lum';\n}",
      test: "if (status === 'Noma\\'lum') return null; return 'status Noma\\'lum bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Fall-through hodisasi",
      instruction: "month o'zgaruvchisi 4 bo'lganda, break yozmasdan case 3, case 4, case 5 zanjiri yordamida xabar o'zgaruvchisiga 'Bahor' qiymatini bering.",
      startingCode: "let month = 4;\nlet xabar = '';\n// Bu yerga yozing\n",
      hint: "switch(month) {\n  case 3:\n  case 4:\n  case 5:\n    xabar = 'Bahor';\n    break;\n}",
      test: "if (xabar === 'Bahor') return null; return 'xabar Bahor bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Meva narxi",
      instruction: "fruit o'zgaruvchisiga qarab narx o'zgaruvchisiga qiymat bering: 'olma' bo'lsa 10000, 'anor' bo'lsa 15000, boshqa hollarda 0. switch ishlating.",
      startingCode: "let fruit = 'anor';\nlet narx = 0;\n// Bu yerga yozing\n",
      hint: "switch(fruit) {\n  case 'olma': narx = 10000; break;\n  case 'anor': narx = 15000; break;\n  default: narx = 0;\n}",
      test: "if (narx === 15000) return null; return 'narx 15000 bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "switch(true) yordamida shart tekshirish",
      instruction: "yosh o'zgaruvchisi 20 ga teng. switch(true) yordamida yosh >= 18 bo'lsa ruxsat o'zgaruvchisiga 'Ruxsat etilgan' qiymatini yozing.",
      startingCode: "let yosh = 20;\nlet ruxsat = '';\n// Bu yerga yozing\n",
      hint: "switch(true) {\n  case yosh >= 18:\n    ruxsat = 'Ruxsat etilgan';\n    break;\n}",
      test: "if (ruxsat === 'Ruxsat etilgan') return null; return 'ruxsat Ruxsat etilgan bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Svetofor",
      instruction: "light o'zgaruvchisi 'yashil' bo'lsa action o'zgaruvchisiga 'O'tish', 'sariq' bo'lsa 'Kutish', 'qizil' bo'lsa 'To'xtash', boshqa holatda 'Nosoz' deb yozing.",
      startingCode: "let light = 'yashil';\nlet action = '';\n// Bu yerga yozing\n",
      hint: "switch(light) {\n  case 'yashil': action = 'O\\'tish'; break;\n  case 'sariq': action = 'Kutish'; break;\n  case 'qizil': action = 'To\\'xtash'; break;\n  default: action = 'Nosoz';\n}",
      test: "if (action === 'O\\'tish') return null; return 'action O\\'tish bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Baholash tizimi",
      instruction: "grade o'zgaruvchisi 'A' bo'lsa natija 'Alo', 'B' yoki 'C' bo'lsa 'Yaxshi', boshqa bo'lsa 'Qoniqarsiz'. switch orqali yozing.",
      startingCode: "let grade = 'B';\nlet natija = '';\n// Bu yerga yozing\n",
      hint: "switch(grade) {\n  case 'A': natija = 'Alo'; break;\n  case 'B':\n  case 'C': natija = 'Yaxshi'; break;\n  default: natija = 'Qoniqarsiz';\n}",
      test: "if (natija === 'Yaxshi') return null; return 'natija Yaxshi bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Raqamni so'zga o'tkazish",
      instruction: "num o'zgaruvchisi 0 bo'lsa word o'zgaruvchisiga 'nol', 1 bo'lsa 'bir' yozing. Boshqa hollarda 'boshqa'.",
      startingCode: "let num = 0;\nlet word = '';\n// Bu yerga yozing\n",
      hint: "switch(num) {\n  case 0: word = 'nol'; break;\n  case 1: word = 'bir'; break;\n  default: word = 'boshqa';\n}",
      test: "if (word === 'nol') return null; return 'word nol bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Foydalanuvchi roli",
      instruction: "role o'zgaruvchisi 'guest' bo'lsa access o'zgaruvchisiga 'Mehmon' qiymatini bering. 'admin' bo'lsa 'To'liq', 'user' bo'lsa 'Cheklangan'.",
      startingCode: "let role = 'guest';\nlet access = '';\n// Bu yerga yozing\n",
      hint: "switch(role) {\n  case 'admin': access = 'To\\'liq'; break;\n  case 'user': access = 'Cheklangan'; break;\n  default: access = 'Mehmon';\n}",
      test: "if (access === 'Mehmon') return null; return 'access Mehmon bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Kalkulyator amallari",
      instruction: "op o'zgaruvchisi '+' bo'lsa res o'zgaruvchisiga a va b ning yig'indisini, '-' bo'lsa ayirmasini o'zlashtiring. a=10, b=5.",
      startingCode: "let a = 10;\nlet b = 5;\nlet op = '+';\nlet res = 0;\n// Bu yerga yozing\n",
      hint: "switch(op) {\n  case '+': res = a + b; break;\n  case '-': res = a - b; break;\n}",
      test: "if (res === 15) return null; return 'res 15 bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`switch` operatori solishtirishlarda qaysi taqqoslash operatoridan foydalanadi?",
      options: [
        "Qat'iy bo'lmagan tenglik `==`",
        "Qat'iy tenglik `===` (qiymatni ham, turni ham tekshiradi, ya'ni `switch(5)` bo'lganda `case \"5\":` mos kelmaydi)",
        "Faqat `>` yoki `<` operatorlaridan",
        "Mantiqiy `||` operatoridan"
      ],
      correctAnswer: 1,
      explanation: "`switch` operatori solishtirish uchun qat'iy tenglik `===` dan foydalanadi. Shu sababli son `5` va matn `\"5\"` bir-biriga mos kelmaydi."
    },
    {
      id: 2,
      question: "`switch` dagi `default` bloki haqida berilgan fikrlardan qaysi biri to'g'ri?",
      options: [
        "U har doim eng boshida yozilishi shart",
        "U hech bir `case` mos kelmagan holatda ishga tushadi va u odatda switch oxirida yoziladi (break qo'yish shart emas)",
        "U faqat raqamlar bilan ishlaydi",
        "Uni yozish mutlaqo majburiydir"
      ],
      correctAnswer: 1,
      explanation: "`default` bloki xuddi `if-else` zanjiridagi eng oxirgi `else` kabi ishlaydi — hech bir case sharti bajarilmaganida ishga tushadi. U odatda oxirida yoziladi, lekin majburiy emas."
    },
    {
      id: 3,
      question: "Quyidagi kod ishga tushirilganda konsolga nima chiqadi:\n```javascript\nlet score = 2;\nswitch (score) {\n  case 1:\n    console.log(\"Bir\");\n  case 2:\n    console.log(\"Ikki\");\n  case 3:\n    console.log(\"Uch\");\n  default:\n    console.log(\"Boshqa\");\n}\n```",
      options: [
        "`\"Ikki\"`",
        "`\"Ikki\"`, `\"Uch\"` va `\"Boshqa\"` (chunki case 2 mos keldi va break bo'lmagani uchun pastdagi barcha kodlar bajarilib ketadi)",
        "`\"Bir\"` va `\"Ikki\"`",
        "`TypeError` yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Mos keluvchi `case 2` topilgach, uning kodi bajariladi. Biroq, `break` yozilmaganligi sababli dastur to'xtamaydi va pastdagi `case 3` va `default` bloklarining kodlarini ham birin-ketin bajarib yuboradi."
    },
    {
      id: 4,
      question: "\"Fall-through\" tushunchasi switch operatorida nimani anglatadi?",
      options: [
        "Switch operatoridan xatolik yuz berib chiqib ketishini",
        "`break` operatori qo'yilmaganligi sababli kodning keyingi case-larga o'tib ketishini",
        "Default blokining avtomatik ravishda bajarilishini",
        "Switch ichida cheksiz sikl hosil bo'lishini"
      ],
      correctAnswer: 1,
      explanation: "\"Fall-through\" (orqali o'tish) — bu dasturchi `break` yozishni unutganda, dastur keyingi holatlarni ham avtomatik ravishda bajarib yuboradigan switch operatorining odatiy xatti-harakatidir."
    },
    {
      id: 5,
      question: "Switch ichida `switch(true)` sintaksisi qanday maqsadlarda qo'llanilishi mumkin?",
      options: [
        "Faqat boolean qiymatlarini solishtirish uchun",
        "`if-else` kabi case-lar ichida shartli diapazonlarni (masalan: `case age > 18:`) tekshirish uchun",
        "Ushbu sintaksis JavaScript-da umuman ishlamaydi va xato beradi",
        "Faqat `break` ishlatmaslik uchun"
      ],
      correctAnswer: 1,
      explanation: "`switch(true)` yozilganda, har bir `case` qiymati emas, balki shartli ifoda sifatida hisoblanadi. Agar case ichidagi shart `true` qaytarsa, o'sha blok ishlaydi (masalan, `case score >= 90: ...`)."
    },
    {
      id: 6,
      question: "Agar switch operatorining oxirgi bloki bo'lgan `default` bloki ichida `break` yozilmasa nima bo'ladi (agar u eng oxirida joylashgan bo'lsa)?",
      options: [
        "Sintaktik xatolik (SyntaxError) sodir bo'ladi",
        "Hech narsa bo'lmaydi, chunki u eng oxirida turibdi va switch baribir tugaydi",
        "Dastur cheksiz aylanadi",
        "Avtomatik ravishda birinchi casega qaytib ketadi"
      ],
      correctAnswer: 1,
      explanation: "Agar `default` bloki switch-ning eng oxirgi bloki bo'lsa, undan keyin boshqa case yo'qligi sababli `break` yozmaslik hech qanday muammo tug'dirmaydi, kod o'z-o'zidan switch-ni yakunlaydi."
    },
    {
      id: 7,
      question: "JavaScript switch operatorida bir nechta `case`lar uchun bitta kod blokini bajarishni qanday amalga oshirish mumkin?",
      options: [
        "`case 1, 2, 3:` ko'rinishida vergul bilan yozish orqali",
        "Caselarni ketma-ket yozib, ularning orasiga `break` qo'ymaslik orqali (masalan: `case 1: case 2: ...`)",
        "Buni amalga oshirib bo'lmaydi",
        "`case 1 || 2 || 3:` ko'rinishida yozish orqali"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda caselarni ketma-ket yozib, faqat eng oxirgisiga kod va `break` yozish orqali bir nechta shartlar uchun bitta umumiy kodni ishlatish mumkin."
    },
    {
      id: 8,
      question: "Quyidagi kodda console.log nima chiqaradi:\n```javascript\nlet x = 10;\nswitch (true) {\n  case x < 5:\n    console.log(\"Kichik\");\n    break;\n  case x >= 5:\n    console.log(\"Katta yoki teng\");\n    break;\n  default:\n    console.log(\"Noma'lum\");\n}\n```",
      options: [
        "`\"Kichik\"`",
        "`\"Katta yoki teng\"` (chunki switch ifodasi true bo'lib, x >= 5 sharti true natija beradi)",
        "`\"Noma'lum\"`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Bu yerda `switch(true)` ishlatilgan. Har bir case ichidagi mantiqiy shart tekshiriladi. `x >= 5` sharti `true` bo'lgani sababli, ushbu case mos keladi va 'Katta yoki teng' yozuvi chiqadi."
    },
    {
      id: 9,
      question: "Switch operatori ichida `return` ishlatish mumkinmi?",
      options: [
        "Yo'q, `return` faqat funksiya ichida ishlatilishi mumkin; agar switch funksiya ichida bo'lsa, uni ishlatish mumkin va u funksiyadan qiymat qaytaradi",
        "Ha, har qanday joyda ishlatish mumkin va u break vazifasini ham bajaradi",
        "Faqat `default` blokida ishlatish mumkin",
        "Faqat strict rejimda ishlatish mumkin"
      ],
      correctAnswer: 0,
      explanation: "`return` faqat funksiyalar ichida ishlatilishi mumkin. Agar switch funksiya ichida bo'lsa, mos case topilganda `return` qilish orqali ham qiymat qaytarish, ham funksiyani (va switch-ni) yakunlash mumkin."
    },
    {
      id: 10,
      question: "Quyidagi kodning natijasi nima bo'ladi:\n```javascript\nlet a = 1;\nswitch(a) {\n  default:\n    console.log(\"Default\");\n  case 2:\n    console.log(\"Ikki\");\n}\n```",
      options: [
        "`\"Default\"` va keyin `\"Ikki\"` (chunki default boshida kelgan va break qo'yilmagan)",
        "Faqat `\"Default\"`",
        "`\"Ikki\"`",
        "`SyntaxError` xatoligi beradi"
      ],
      correctAnswer: 0,
      explanation: "`a = 1` hech qaysi casega (faqat case 2 bor) mos kelmaydi, shuning uchun `default` ishlaydi. Lekin `default`da `break` bo'lmagani sababli, kod pastga qarab davom etadi va 'Ikki' degan yozuvni ham chiqaradi."
    },
    {
      id: 11,
      question: "Quyidagi kodda strict equality (`===`) qoidasi tufayli nima chiqadi:\n```javascript\nlet val = 10;\nswitch(val) {\n  case \"10\":\n    console.log(\"Matn\");\n    break;\n  case 10:\n    console.log(\"Son\");\n    break;\n  default:\n    console.log(\"Boshqa\");\n}\n```",
      options: [
        "`\"Matn\"`",
        "`\"Son\"` (chunki 10 soni case 10 ga strict tengdir)",
        "`\"Boshqa\"`",
        "`\"Matn\"` va `\"Son\"` ikkalasi ham"
      ],
      correctAnswer: 1,
      explanation: "`val` o'zgaruvchisi `10` soni. `switch` operatori strict tenglik (`===`) bilan solishtirgani sababli, `\"10\"` (matn) to'g'ri kelmaydi va `10` (son) to'g'ri keladi."
    },
    {
      id: 12,
      question: "Nima uchun switch operatorida `break` ishlatilishi tavsiya etiladi?",
      options: [
        "Kodning ishlash tezligini 10 barobarga oshirish uchun",
        "Keraksiz holatlar (caselar) bajarilib ketishining oldini olish va dasturni to'g'ri boshqarish uchun",
        "Faqat xotirani tejash uchun",
        "Javascriptda switch breaksiz umuman ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "`break` mos kelgan holatdan keyin boshqa holatlarning kodlari bajarilishini to'xtatadi. Bu esa dasturning mantiqiy jihatdan to'g'ri ishlashini ta'minlaydi."
    }
  ]
};

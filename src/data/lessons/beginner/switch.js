export const switchLesson = {
  id: "switch",
  title: "Switch Operatori",
  theory: `## 1. SWITCH ASOSLARI
\`switch\` — bir o‘zgaruvchi yoki ifodaning qiymatiga qarab, bir nechta **case** (holat) dan birini bajarish imkonini beradi. Bu operator ko'pincha juda ko'p \`if...else if\` yozishdan qochish uchun ishlatiladi.

**Switch** — bu bitta o'zgaruvchining bir nechta holatlarini (qiymatlarini) tekshirish uchun ishlatiladigan operator. U asosan juda ko'p \`if...else if\` yozishdan qochish uchun kerak.

## 1. NEGA kerak?
Tasavvur qiling, sizga hafta kunini raqamiga qarab nomini chiqarish kerak. Agar siz \`if\` ishlatsangiz, 7 marta \`else if\` yozasiz. Bu kodni o'qishni qiyinlashtiradi. \`switch\` bilan esa hammasi tartibli bo'ladi.

## 2. SODDALIK (Analogiya)
Buni **avtomat telefonga (ATC)** o'xshatish mumkin. Siz bitta raqamni terasiz (o'zgaruvchi), telefon tarmog'i esa sizni o'sha raqamga mos keladigan "liniya"ga (case) ulab beradi.

## 3. STRUKTURA

### A. Asosiy sintaksis
\`\`\`javascript
let meva = "olma";
switch (meva) {
  case "olma":
    console.log("Narxi 12 000");
    break;
  case "banan":
    console.log("Narxi 20 000");
    break;
  default:
    console.log("Bunday meva yo'q");
}
\`\`\`

### B. break va default
- **break:** Bu "to'xta" degani. Agar uni yozmasangiz, JS keyingi \`case\`larni ham bajarib ketadi (**Fall-through**).
- **default:** Agar birorta \`case\` mos kelmasa, mana shu qism ishlaydi (xuddi \`else\` kabi).

## 4. AMALIYOT (Mashq)
Bir nechta \`case\` uchun bitta natija:
\`\`\`javascript
let oy = 4;
switch (oy) {
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
1. **breakni unutish:** Eng ko'p uchraydigan xato. Agar \`break\` qo'ymasangiz, dastur to'xtamay hamma \`case\`larni chiqarib yuboradi.
2. **Strict Equality:** \`switch\` solishtirishda \`===\` (qat'iy tenglik) ishlatadi. Ya'ni \`switch(5)\` bo'lsa-yu, siz \`case "5":\` deb yozsangiz (matn), u ishlamaydi.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

<details>
<summary>1. switch operatori nima vazifani bajaradi?</summary>
\`switch\` operatori bitta o'zgaruvchi yoki ifodani berilgan bir nechta qiymatlar (case) bilan solishtirib, mos keladigan kod blokini ishga tushirish uchun xizmat qiladi.
</details>

<details>
<summary>2. Qachon if...else o'rniga switch ishlatgan ma'qul?</summary>
Bitta o'zgaruvchining juda ko'p aniq qiymatlarini tekshirish kerak bo'lganda (masalan, hafta kunlari yoki menyu buyruqlari), kod o'qilishini yaxshilash va tartibli qilish uchun \`switch\` afzaldir.
</details>

<details>
<summary>3. case so'zining ma'nosi nima?</summary>
\`case\` (holat) — \`switch\`ga berilgan ifodaning solishtirilayotgan aniq qiymatini belgilaydi. Agar qiymatlar mos kelsa, shu \`case\`dan keyingi kod ishga tushadi.
</details>

<details>
<summary>4. break kalit so'zi nima uchun shart?</summary>
\`break\` kalit so'zi joriy \`case\` kodi bajarilgandan keyin \`switch\` operatoridan chiqib ketishni buyuradi. Agar u qo'yilmasa, JS keyingi barcha \`case\`larni ham ketma-ket bajaradi.
</details>

<details>
<summary>5. default bloki nima vazifani bajaradi?</summary>
\`default\` bloki \`if...else\` dagi \`else\` kabi ishlaydi. Agar berilgan case-lardan hech biri mos kelmasa, \`default\` bloki ichidagi kod bajariladi.
</details>

<details>
<summary>6. switch qanday tenglik operatoridan foydalanadi (== yoki ===)?</summary>
\`switch\` har bir holatni solishtirish uchun qat'iy tenglik (\`===\`) operatoridan foydalanadi (qiymatni ham, turini ham tekshiradi).
</details>

<details>
<summary>7. "Fall-through" nima degani?</summary>
Bu \`case\` ichida \`break\` yozilmaganligi sababli, dasturning keyingi \`case\`lar ichidagi kodlarni ham to'xtamasdan bajarib ketish holatidir.
</details>

<details>
<summary>8. default har doim oxirida bo'lishi shartmi?</summary>
Yo'q, \`default\` bloki \`switch\` ichida istalgan joyda kelishi mumkin. Lekin o'qish qulayligi uchun odatda eng oxirida yoziladi. Agar u oxirida yozilmasa, uning oxiriga ham \`break\` qo'yish kerak bo'ladi.
</details>

<details>
<summary>9. Bitta case ichida bir nechta amal bajarish mumkinmi?</summary>
Ha, bitta \`case\` dan keyin istalgancha kod qatorlarini yozish va bir nechta amalni bajarish mumkin.
</details>

<details>
<summary>10. switch ichida boshqa switch ishlatish mumkinmi?</summary>
Ha, JavaScriptda \`switch\` ichida boshqa ichki \`switch\` operatorini yozish (nested switch) mumkin, lekin bu kodning o'qilishini qiyinlashtirishi sababli tavsiya etilmaydi.
</details>

<details>
<summary>11. Matnli qiymatlarni switchda tekshirsa bo'ladimi?</summary>
Ha, \`switch\` operatori matnlarni (string), sonlarni, boolean va boshqa har qanday turdagi qiymatlarni solishtira oladi.
</details>

<details>
<summary>12. switch(true) usuli nima uchun ishlatiladi?</summary>
\`switch(true)\` usuli \`case\`lar ichida qiymat emas, balki shartli diapazonlarni (masalan, \`case yosh > 18:\` yoki \`case baho >= 90:\`) tekshirish uchun ishlatiladi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Kunni toping",
      instruction: "'day' 1 bo'lsa 'Dushanba', 2 bo'lsa 'Seshanba' deb chiqaring.",
      startingCode: "let day = 1;\n// Bu yerga yozing\n",
      hint: "switch(day) { case 1: console.log('Dushanba'); break; ... }",
      test: "if (logs.includes('Dushanba')) return null; return 'Break yoki case xato!';"
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
    }
  ]
};

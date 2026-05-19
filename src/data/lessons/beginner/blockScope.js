export const blockScopeLesson = {
  id: "block-scope",
  title: "Block Scope: {} belgilarining kuchi",
  theory: `## 1. KIRISH
O'rta asrlarda uylarning atrofida **devorlar** bo'lgan. JavaScriptda \`{ }\` jingalak qavslar xuddi o'sha devorlardir. Ular \`let\` va \`const\` o'zgaruvchilarini tashqi olamdan himoya qiladi.

**Block Scope** — bu jingalak qavslar \`{ }\` ichida e'lon qilingan o'zgaruvchilarning faqat shu qavslar ichida ko'rinishidir. Bu asosan \`if\`, \`for\` yoki \`switch\` bloklariga tegishli.

## 1. NEGA kerak?
Tasavvur qiling, sizda \`if\` sharti bor va uning ichida vaqtinchalik bir hisob-kitob qilyapsiz. Bu vaqtinchalik o'zgaruvchi shart tugagandan keyin kerak emas. Block scope yordamida biz o'sha o'zgaruvchini blokdan tashqariga "chiqarib yubormaslik" imkoniga egamiz. Bu xotirani tejaydi va tartibsizlikni oldini oladi.

## 2. SODDALIK (Analogiya)
Jingalak qavslarni \`{ }\` bir **qafas** deb tasavvur qiling. \`let\` va \`const\` bu qafas ichidagi qushlardir. Ular qafasdan tashqariga uchib chiqolmaydi. \`var\` esa — bu "arvoh", u devorlar va qafaslardan bemalol o'tib ketadi (shuning uchun u xavfli).

## 3. STRUKTURA

### A. let va const (Blokni tan oladi)
\`\`\`javascript
if (true) {
  let qush = "Bulbul";
  console.log(qush); // Blok ichida ko'rinadi ✅
}
console.log(qush); // Xato! ❌ (Qush qafasdan chiqolmaydi)
\`\`\`

### B. var (Blokni tan olmaydi)
\`\`\`javascript
if (true) {
  var arvoh = "Kasper";
}
console.log(arvoh); // "Kasper" ✅ (Blokdan chiqib ketdi!)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
{
  let x = 10;
  const y = 20;
  var z = 30;
}
console.log(z); // 30
// console.log(x); // Xato!
// console.log(y); // Xato!
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Loop ichida var ishlatish:** \`for\` loop ichida \`var i\` ishlatsangiz, u loop tugagandan keyin ham globalda qolib ketadi va boshqa kodlarni buzishi mumkin.
2. **E'lon qilish:** Blok ichida yaratilgan o'zgaruvchini blokdan tashqarida ishlatishga urinish.

## 6. SAVOLLAR (12 ta)
1. Block Scope nima?
2. Qaysi belgilar blokni bildiradi?
3. \`let\` va \`const\` blok doirasiga kiradimi?
4. \`var\` blok doirasiga kiradimi?
5. Nima uchun \`var\` xavfli hisoblanadi?
6. \`if\` blokidan tashqarida uning ichidagi \`let\` o'zgaruvchisini ishlatsa nima bo'ladi?
7. \`for\` loop ichida \`let\` ishlatish nima uchun yaxshi?
8. Bo'sh jingalak qavslar \`{ }\` ham alohida scope yaratadimi?
9. Global scope va Block scope farqi nima?
10. Blok ichida blok (Nested blocks) bo'lishi mumkinmi?
11. Ichki blok tashqi blok o'zgaruvchisini ko'radimi?
12. Tashqi blok ichki blok o'zgaruvchisini ko'radimi?`,
  exercises: [
    {
      id: 1,
      title: "Blok testi",
      instruction: "Blok { } oching, uning ichida 'x' o'zgaruvchisini yarating va tashqarida uni ishlatib xato oling.",
      startingCode: "// { } oching\n",
      hint: "{ let x = 5; } console.log(x);",
      test: "if (output.includes('ReferenceError')) return null; return 'Xato chiqishi kerak edi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da block (blok) deganda aynan qaysi belgilar bilan o'ralgan kod qismi tushuniladi?",
      options: [
        "Qavslar `()`",
        "Jingalak qavslar `{}` (masalan: `if`, `for` yoki shunchaki alohida blok ochilganda)",
        "Kvadrat qavslar `[]`",
        "Burchakli qavslar `<>`"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar `{}` JavaScript-da blokni hosil qiladi. Ular yordamida guruhlangan kodlar bloki yasaladi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri block scope-ga (blok ko'rinish sohasiga) ega emas?",
      options: [
        "`let`",
        "`const`",
        "`var` (chunki u faqat global yoki function scope-ga bo'ysunadi, blok devorlaridan o'tib ketadi)",
        "Barcha ko'rsatilganlar block scope-ga ega"
      ],
      correctAnswer: 2,
      explanation: "`var` o'zgaruvchisi blokni tan olmaydi. Agar u blok (`{}`) ichida e'lon qilinsa, u blokdan tashqarida ham ko'rinadi (agar funksiya ichida bo'lmasa)."
    },
    {
      id: 3,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet num = 5;\n{\n  let num = 10;\n}\nconsole.log(num);\n```",
      options: [
        "`10`",
        "`5` (chunki blok ichida yaratilgan `let num = 10` faqat blok ichida amal qiladi va tashqi block/global hududdagi `num` qiymatini o'zgartirmaydi)",
        "`TypeError`",
        "`ReferenceError`"
      ],
      correctAnswer: 1,
      explanation: "Blok ichidagi `let num = 10` tashqaridagi global `num = 5` ni blok ichidagina yashiradi (shadowing). Blok tugashi bilan lokal `num` o'chadi va tashqarida global `num` (5) ko'rinadi."
    },
    {
      id: 4,
      question: "Blok ichida blok (nested blocks) bo'lgan holatda o'zgaruvchilarning ko'rinishi bo'yicha qaysi qoida to'g'ri?",
      options: [
        "Ichki blok o'zidan tashqaridagi (tashqi) blok o'zgaruvchilarini ko'ra oladi, ammo tashqi blok ichki blok o'zgaruvchilarini ko'ra olmaydi",
        "Tashqi blok ichki blok o'zgaruvchilarini ko'ra oladi",
        "Ular bir-birini mutlaqo ko'ra olmaydi",
        "Ikkalasi ham bir-birining o'zgaruvchilarini ko'ra oladi"
      ],
      correctAnswer: 0,
      explanation: "Scope zanjiri (Scope Chain) bo'yicha, ichkaridagi bloklar har doim o'zining tashqi o'rab turgan bloklaridagi o'zgaruvchilardan foydalana oladi. Lekin aksincha (tashqaridan ichkariga) bo'lishi mumkin emas."
    },
    {
      id: 5,
      question: "Nima uchun `for` tsikli yozayotganda hisoblagich o'zgaruvchini (counter) `var i = 0` emas, `let i = 0` yordamida yaratish tavsiya etiladi?",
      options: [
        "Chunki `let` tezroq ishlaydi",
        "`var` bilan yaratilgan `i` tsikl tugagandan keyin ham globalda qolib ketib, boshqa kodlarga xalaqit berishi (nomlar chalkashishi) mumkin; `let` esa faqat tsikl bloki ichida yashaydi",
        "Chunki `var` tsikl ichida ishlamaydi",
        "Ikkalasi o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "`var i = 0` deb yozilganda `i` o'zgaruvchisi tsikldan tashqarida ham yashaydi. Bu esa xatoliklarga olib kelishi mumkin. `let` tsikl tugashi bilan xotiradan butunlay tozalanadi."
    }
  ]
};

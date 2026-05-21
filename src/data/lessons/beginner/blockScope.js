export const blockScopeLesson = {
  id: "block-scope",
  title: "Block Scope: {} belgilarining kuchi",
  theory: `## 1. KIRISH
O'rta asrlarda uylarning atrofida **devorlar** bo'lgan. JavaScriptda \`{ }\` jingalak qavslar xuddi o'sha devorlardir. Ular \`let\` va \`const\` o'zgaruvchilarini tashqi olamdan himoya qiladi.

**Block Scope** — bu jingalak qavslar \`{ }\` ichida e'lon qilingan o'zgaruvchilarning faqat shu qavslar ichida ko'rinishidir. Bu asosan \`if\`, \`for\` yoki \`switch\` bloklariga tegishli.

## 1. NEGA kerak?
Tasavvur qiling, sizda \`if\` sharti bor va uning ichida vaqtinchalik bir hisob-kitob qilyapsiz. Bu vaqtinchalik o'zgaruvchi shart tugagandan keyin kerak emas. Block scope yordamida biz o'sha o'zgaruvchini blokdan tashqariga "chiqarib yubormaslik" imkoniga egamiz. Bu xotirani tejaydi va global doirani keraksiz o'zgaruvchilar bilan ifloslantirishni oldini oladi.

## 2. SODDALIK (Analogiya)
Jingalak qavslarni \`{ }\` bir **qafas** deb tasavvur qiling. \`let\` va \`const\` bu qafas ichidagi qushlardir. Ular qafasdan tashqariga uchib chiqolmaydi. \`var\` esa — bu "arvoh", u devorlar va qafaslardan bemalol o'tib ketadi va blokni tan olmaydi (shuning uchun u xavfli hisoblanadi).

## 3. STRUKTURA

### A. let va const (Blokni tan oladi)
\`\`\`javascript
if (true) {
  let qush = "Bulbul";
  console.log(qush); // Blok ichida ko'rinadi ✅
}
console.log(qush); // Xato! ❌ (Qush qafasdan chiqolmaydi, ReferenceError beradi)
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
console.log(z); // 30 (var blokni tan olmaydi)
// console.log(x); // ReferenceError!
// console.log(y); // ReferenceError!
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Loop ichida var ishlatish:** \`for\` loop ichida \`var i\` ishlatsangiz, u loop tugagandan keyin ham globalda qolib ketadi va boshqa kodlarni kutilmaganda buzishi mumkin. Doim \`let\` ishlating!
2. **E'lon qilishdan oldin ishlatish (TDZ):** Blok ichida \`let\` yoki \`const\` ni e'lon qilishdan oldin unga murojaat qilish. Bu \`ReferenceError\` beradi.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Block Scope nima?**
Block Scope — jingalak qavslar \`{ }\` ichida e'lon qilingan o'zgaruvchilarning faqat shu qavslar ichida ko'rinishi va ishlatilishi mumkinligidir.

**2. Qaysi belgilar blokni bildiradi?**
JavaScriptda bloklarni jingalak qavslar \`{ }\` bildiradi (masalan, \`if\` shartlari, \`for\` tsikllari yoki shunchaki alohida mustaqil bloklar).

**3. let va const blok doirasiga kiradimi?**
Ha, \`let\` va \`const\` block scope-ga ega. Ular e'lon qilingan blokdan tashqarida ko'rinmaydi.

**4. var blok doirasiga kiradimi?**
Yo'q, \`var\` block scope-ni tan olmaydi. U blokdan tashqarida ham ko'rinaveradi (agar blok funksiya ichida bo'lmasa).

**5. Nima uchun var xavfli hisoblanadi?**
Chunki u block scope-ni tan olmaydi, bu esa global o'zgaruvchilar chalkashishiga yoki tsikllardan keyin vaqtinchalik o'zgaruvchilarning saqlanib qolib, boshqa kodlarga ta'sir qilishiga sabab bo'ladi.

**6. if blokidan tashqarida uning ichidagi let o'zgaruvchisini ishlatsa nima bo'ladi?**
Lokal o'zgaruvchi tashqarida aniqlanmaganligi sababli \`ReferenceError\` xatosi yuz beradi.

**7. for loop ichida let ishlatish nima uchun yaxshi?**
Chunki \`let\` bilan tsikl hisoblagichi (counter) faqat tsikl davomida yashaydi va tugashi bilan xotiradan o'chadi. \`var\` ishlatilsa, u tsikldan tashqarida ham qolib ketadi.

**8. Bo'sh jingalak qavslar { } ham alohida scope yaratadimi?**
Ha, istalgan bo'sh yoki ichi to'ldirilgan jingalak qavslar \`{ }\` \`let\` va \`const\` uchun alohida mustaqil block scope hosil qiladi.

**9. Global scope va Block scope farqi nima?**
Global scope-da e'lon qilingan o'zgaruvchi kodning istalgan joyida ko'rinadi. Block scope o'zgaruvchisi esa faqat o'zi yaratilgan blok va uning ichidagi bloklarda ko'rinadi.

**10. Blok ichida blok (Nested blocks) bo'lishi mumkinmi?**
Ha, JavaScriptda bloklarni ichma-ich joylashtirish to'liq mumkin (masalan, \`if\` ichida yana \`if\` yoki tsikl ochilganda).

**11. Ichki blok tashqi blok o'zgaruvchisini ko'radimi?**
Ha, Scope Chain (ko'rinish zanjiri) bo'yicha ichki blok o'zidan tashqaridagi (tashqi) bloklarda yaratilgan o'zgaruvchilarni bemalol ko'radi va ishlata oladi.

**12. Tashqi blok ichki blok o'zgaruvchisini ko'radimi?**
Yo'q, tashqi blok ichki blok (farzand) ichida yaratilgan o'zgaruvchilarni ko'ra olmaydi.
`,
  exercises: [
    {
      id: 1,
      title: "Blok testi",
      instruction: "Blok { } oching, uning ichida 'x' o'zgaruvchisini yarating va tashqarida uni ishlatib xato oling.",
      startingCode: "// { } oching\n",
      hint: "{ let x = 5; } console.log(x);",
      test: "if (code.includes('{') && code.includes('}') && (code.includes('let x') || code.includes('const x'))) return null; return 'Blok ichida let x = 5 e\\'lon qilib, tashqarida log qiling!';"
    },
    {
      id: 2,
      title: "const va block scope",
      instruction: "Blok { } ichida const y = 10 yarating. Blokdan tashqarida console.log(y) qiling.",
      startingCode: "// Blok ichida const y = 10 e'lon qilib tashqarida log qiling\n",
      hint: "{ const y = 10; } console.log(y);",
      test: "if (code.includes('{') && code.includes('}') && code.includes('const y') && code.includes('y')) return null; return 'const o\\'zgaruvchisini blok ichida yarating!';"
    },
    {
      id: 3,
      title: "var blok devorini buzishi",
      instruction: "Blok { } ichida var status = 'active' yarating va blokdan tashqarida uni konsolga chiqaring.",
      startingCode: "// Blok ichida var status yarating va tashqarida console.log qiling\n",
      hint: "{ var status = 'active'; } console.log(status);",
      test: "if (code.includes('var status') && logs.includes('active')) return null; return 'var o\\'zgaruvchisini blok ichida yaratib tashqarida log qiling!';"
    },
    {
      id: 4,
      title: "if blok scope",
      instruction: "if (true) bloki ichida let result = 'Muvaffaqiyatli' yarating va uni konsolga chiqaring. Blokdan tashqarida uni ishlatmang.",
      startingCode: "if (true) {\n  // Bu yerda let result yarating va log qiling\n}",
      hint: "let result = 'Muvaffaqiyatli'; console.log(result);",
      test: "if (code.includes('let result') && logs.includes('Muvaffaqiyatli')) return null; return 'result o\\'zgaruvchisini if bloki ichida yaratib log qiling!';"
    },
    {
      id: 5,
      title: "for tsikli block scope",
      instruction: "for (let i = 0; i < 3; i++) tsiklini yozing va har bir qadamda i ni log qiling.",
      startingCode: "// let yordamida for tsiklini yozing\n",
      hint: "for (let i = 0; i < 3; i++) { console.log(i); }",
      test: "if (code.includes('let i') && code.includes('for') && logs.includes(0) && logs.includes(2)) return null; return 'let yordamida for tsikli yozing!';"
    },
    {
      id: 6,
      title: "for tsiklidan keyin var i",
      instruction: "for (var j = 0; j < 3; j++) tsikli tugagach, console.log('Final:', j) qiling. var sababli j globalda qolganini tekshiring.",
      startingCode: "// var yordamida for tsikli yozing va tashqarida log qiling\n",
      hint: "for (var j = 0; j < 3; j++) {} console.log('Final:', j);",
      test: "if (code.includes('var j') && logs.includes('Final: 3')) return null; return 'var yordamida tsikl yozib, final qiymatini log qiling!';"
    },
    {
      id: 7,
      title: "Temporal Dead Zone (TDZ)",
      instruction: "Blok ichida console.log(z) qiling, undan keyin esa let z = 50 e'lon qiling. Bu ReferenceError berishini tekshirish uchun log-ni oldin yozing.",
      startingCode: "{\n  // z-ni e'lon qilishdan oldin log qiling\n  // keyin let z = 50 e'lon qiling\n}",
      hint: "console.log(z); let z = 50;",
      test: "if (code.includes('let z') && code.indexOf('console.log') < code.indexOf('let z')) return null; return 'z-ni e\\'lon qilishdan oldin log qiling!';"
    },
    {
      id: 8,
      title: "Nested Blocks (Ichma-ich bloklar)",
      instruction: "Tashqi blok oching va unda let outerVar = 'Tashqi' yarating. Ichida yana bir blok oching va unda console.log(outerVar) qiling.",
      startingCode: "// Ichma-ich bloklar va outerVar log qilinishi\n",
      hint: "{ let outerVar = 'Tashqi'; { console.log(outerVar); } }",
      test: "if (code.includes('outerVar') && logs.includes('Tashqi')) return null; return 'Ichma-ich bloklarda outerVar-dan foydalaning!';"
    },
    {
      id: 9,
      title: "Blok ichidagi var shadowing",
      instruction: "Globalda var age = 20 yarating. Blok ichida var age = 30 yarating va log qiling. Tashqarida ham log qiling. Ikkala log ham 30 chiqishini tekshiring.",
      startingCode: "var age = 20;\n{\n  // age-ni o'zgartiring va log qiling\n}\nconsole.log('Global:', age);",
      hint: "var age = 30; console.log(age);",
      test: "if (logs.includes('Global: 30')) return null; return 'var o\\'zgaruvchisi blokda shadowing qilinmasligini tekshiring!';"
    },
    {
      id: 10,
      title: "Blok ichidagi let shadowing",
      instruction: "Globalda let points = 100 yarating. Blok ichida let points = 200 yarating va log qiling. Tashqarida ham log qiling. Tashqarida 100, ichkarida 200 chiqishini tekshiring.",
      startingCode: "let points = 100;\n{\n  // let points yarating va log qiling\n}\nconsole.log('Global:', points);",
      hint: "let points = 200; console.log(points);",
      test: "if (logs.includes('Global: 100') && logs.includes(200)) return null; return 'let o\\'zgaruvchisi blok ichida to\\'g\\'ri shadowing qilinishini tekshiring!';"
    },
    {
      id: 11,
      title: "const massivini blokda o'zgartirish",
      instruction: "Blok ichida const nums = [1, 2] yarating. Unga nums.push(3) qiling. Tashqarida nums ni log qilishga urining.",
      startingCode: "{\n  // const nums yarating va unga 3 qo'shing\n}\n// tashqarida console.log(nums) qiling",
      hint: "{ const nums = [1, 2]; nums.push(3); } console.log(nums);",
      test: "if (code.includes('const nums') && code.includes('push') && code.includes('nums')) return null; return 'const massivini blok ichida o\\'zgartirib, tashqarida ishlatishni tekshiring!';"
    },
    {
      id: 12,
      title: "switch case block scope",
      instruction: "switch case bloki ichida let msg = 'Hi' e'lon qiling va uni konsolga chiqaring.",
      startingCode: "let action = 'greet';\nswitch(action) {\n  case 'greet': {\n    // let msg yarating va log qiling\n    break;\n  }\n}",
      hint: "let msg = 'Hi'; console.log(msg);",
      test: "if (code.includes('let msg') && logs.includes('Hi')) return null; return 'switch case bloki ichida let msg = \"Hi\" yarating!';"
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
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\n{\n  console.log(val);\n  let val = 42;\n}\n```",
      options: [
        "42",
        "undefined",
        "ReferenceError (TDZ tufayli)",
        "SyntaxError"
      ],
      correctAnswer: 2,
      explanation: "let va const o'zgaruvchilari blok boshidan boshlab to e'lon qilingan qatorgacha Temporal Dead Zone (TDZ) da bo'ladi. Ulardan e'lon qilishdan oldin foydalanish ReferenceError xatosini beradi."
    },
    {
      id: 7,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nif (true) {\n  var user = \"Kimdir\";\n  const secret = \"12345\";\n}\nconsole.log(user);\nconsole.log(secret);\n```",
      options: [
        "Ikkala holatda ham qiymatlar chiqadi",
        "Kimdir chiqadi, keyin ReferenceError beradi (secret blokdan tashqarida ko'rinmaydi)",
        "ReferenceError beradi, chunki ikkalasi ham ko'rinmaydi",
        "undefined va undefined chiqadi"
      ],
      correctAnswer: 1,
      explanation: "var block scope-ni tan olmagani uchun user tashqarida ham ko'rinadi. const esa block scope-ga ega bo'lgani uchun tashqaridan chaqirilganda ReferenceError beradi."
    },
    {
      id: 8,
      question: "Istalgan bo'sh jingalak qavslar `{ }` JavaScript-da nima yaratadi?",
      options: [
        "Yangi obyekt yaratadi",
        "Yangi block scope (ko'rinish sohasi) hosil qiladi (let/const uchun)",
        "Sintaktik xatolik beradi",
        "Yangi funksiya doirasini yaratadi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da shunchaki yozilgan jingalak qavslar `{ }` ham alohida kod blokini va let/const uchun yangi ko'rinish sohasini (block scope) yaratadi."
    },
    {
      id: 9,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nlet value = 1;\n{\n  let value = 2;\n  {\n    let value = 3;\n    console.log(value);\n  }\n}\n```",
      options: [
        "1",
        "2",
        "3",
        "ReferenceError"
      ],
      correctAnswer: 2,
      explanation: "Eng ichki blokdagi value eng yaqin doiradagi o'zgaruvchini tanlaydi. Shuning uchun natija 3 bo'ladi (Variable Shadowing)."
    },
    {
      id: 10,
      question: "Loop (tsikl) ichida e'lon qilingan `let` o'zgaruvchisi har bir iteratsiyada nima qilinadi?",
      options: [
        "Faqat bir marta e'lon qilinadi va qiymati saqlanadi",
        "Har bir iteratsiya uchun butunlay yangi o'zgaruvchi (yangi block scope) yaratiladi",
        "Global o'zgaruvchiga aylanadi",
        "Konstanta bo'lib qoladi"
      ],
      correctAnswer: 1,
      explanation: "for tsiklida let ishlatilganda, JavaScript har bir iteratsiya uchun yangi block scope va yangi o'zgaruvchi yaratadi. Bu esa asinxron kodlar (masalan, setTimeout) uchun juda ko'p muammolarni bartaraf etadi."
    },
    {
      id: 11,
      question: "\"Temporal Dead Zone\" (TDZ) nima?",
      options: [
        "Funksiya ishlashdan to'xtaydigan vaqt",
        "O'zgaruvchi blok boshidan e'lon qilingan qatorgacha bo'lgan va ishlatib bo'lmaydigan soha",
        "Garbage collector ishlaydigan vaqt oralig'i",
        "Faqat var o'zgaruvchilarga tegishli xatolik hududi"
      ],
      correctAnswer: 1,
      explanation: "TDZ (Vaqtinchalik o'lik hudud) — bu blok boshidan boshlab o'zgaruvchi e'lon qilingan joygacha bo'lgan masofa. Bu hududda let va const o'zgaruvchilarini ishlatish ReferenceError beradi."
    },
    {
      id: 12,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nconst age = 15;\n{\n  const age = 25;\n}\nconsole.log(age);\n```",
      options: [
        "25",
        "15",
        "ReferenceError",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "const age = 25 faqat o'sha blok ichida amal qiladi. Blok tugashi bilan u yo'qoladi. Tashqi scopedagi const age = 15 esa o'zgarishsiz qoladi. Shuning uchun natija 15 chiqadi."
    }
  ]
};

export const breakContinue = {
  id: "breakContinue",
  title: "Sikllarni Boshqarish: break, continue",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish (Beginner Analogy)

Tasavvur qiling, siz do'stlaringizga xat tarqatyapsiz. Jami 10 ta xat bor. Sizning ishingiz 1-uydan to 10-uygacha borib xatlarni tashlab chiqish.
Bu yerdagi uylarga borish jarayoni **sikl (loop)** dir.

* **\`break\` (To'xtatish va chiqish):** Siz 4-uyga kelganingizda it hurib, sizni tishlab oldi. Siz qo'rqib ketdingiz va qolgan xatlarni tarqatishni butunlay bekor qilib, uyga qaytib ketdingiz. Sikl to'liq tugatildi.
* **\`continue\` (O'tkazib yuborish):** Siz 4-uyga xat tashlash uchun keldingiz, lekin u yerda "Hech kim yo'q, boshqa davlatga ko'chib ketishgan" degan yozuv bor. Siz bu uyga xat tashlamaysiz, lekin qolgan xatlarni tarqatish uchun 5-uyga qarab yurishda davom etasiz. Siklning faqat o'sha iteratsiyasi (aylanishi) to'xtatildi va keyingisidan davom etdi.

\`\`\`javascript
// break misoli
for (let uy = 1; uy <= 10; uy++) {
  if (uy === 4) {
    console.log("4-uyda it bor ekan, men qochdim!");
    break; // Sikl butunlay to'xtaydi
  }
  console.log(\`\${uy}-uyga xat berildi\`);
}

// continue misoli
for (let uy = 1; uy <= 10; uy++) {
  if (uy === 4) {
    console.log("4-uyda hech kim yo'q, xatni tashlab ketaman");
    continue; // Qolgan kod o'tkazilmaydi, lekin sikl keyingi qadamiga o'tadi
  }
  console.log(\`\${uy}-uyga xat berildi\`);
}
\`\`\`

---

## 2. ⚙️ Qanday Ishlaydi (Deep Dive)

JavaScript dvigateli (masalan, V8 Engine) sikllarni bajarayotganda qanday ishlaydi?

V8 dvigateli kodni kompilatsiya qilayotganda, siklning boshi va oxiri haqida ma'lumotni (Control Flow Graph) saqlaydi. 

1. **\`break\` qanday ishlaydi?** Dvigatel \`break\` so'ziga kelganda, joriy blokni to'liq tark etish bo'yicha CPU "jump" (sakrash) komandasini yaratadi. V8 sikl holatini xotiradan tozalaydi va kod ijrosi sikldan keyingi birinchi qatorga o'tadi. Bu performance (samaradorlik) uchun juda yaxshi, chunki kerakli natija topilsa, ortiqcha iteratsiyalar resurs (CPU/RAM) sarflamaydi.

2. **\`continue\` qanday ishlaydi?** V8 dvigateli \`continue\` ni ko'rganda, u xuddi joriy iteratsiya oxiriga sakragandek yo'l tutadi va to'g'ridan-to'g'ri yangilanish qismiga (masalan \`i++\`) o'tadi. \`while\` siklida bo'lsa shartni tekshirish qismiga o'tadi.
   
**Xotira (Memory) Nuqtai Nazaridan:** 
Ikkala operator ham Local Context (Block Scope) ni har iteratsiyada yangilash bilan ishlaydi. Ular xotira oqishini (memory leak) to'xtatish uchun katta arraylar bilan ishlaganda resursni juda tejashi mumkin.

**Massiv Metodlari:** 
Esda tuting, Array \`forEach\`, \`map\`, \`filter\` kabi metodlarida bu operatorlarni ISHLATIB BO'LMAYDI (SyntaxError). Ular oddiy loop emas, callback qabul qiluvchi funksiyalardir!

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

**Edge Case 1: Label bilan ishlatish**
Agar ichma-ich (nested) sikl bo'lsa, \`break\` faqat eng ichki siklni to'xtatadi. Agar ikkala siklni birdan to'xtatish kerak bo'lsa, **Label Statement** ishlatiladi.
\`\`\`javascript
tashqiSikl: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break tashqiSikl; // Butunlay barcha sikllardan chiqadi
    }
  }
}
\`\`\`

**Edge Case 2: while siklida cheksiz aylanish**
\`continue\` ni \`while\` bilan ishlatganda, ko'pincha update (\`i++\`) qismi qolib ketadi va cheksiz sikl paydo bo'ladi. Update doimo \`continue\` dan yuqorida bo'lishi shart!

**Senior Interview Savollari:**

1. **"forEach ichida qanday qilib break qilish mumkin?"**
   Javob: \`forEach\` da \`break\` ishlab bo'lmaydi. Xato otish (\`throw Exception\`) bilan, yoki \`for...of\`, \`.some()\` yoki \`.every()\` metodlari bilan almashtirish kerak. \`.some()\` da \`return true\` qilsa break bo'ladi.
   
2. **"Switch ichida continue ishlatish mumkinmi?"**
   Javob: Yo'q. \`switch\` sikl emas. Faqat agar \`switch\` tsikl ichida joylashgan bo'lsa, label yordamida yoki o'z-o'zidan siklni tashlab ketish maqsadida \`continue\` ni ishlatsa bo'ladi. Lekin \`switch\` blokining o'zini continue qilib bo'lmaydi.

3. **"V8 Dvigateli break ishlatilganda loop optimizatsiyasini qanday amalga oshiradi?"**
   Javob: V8 odatda For-Loop'larni (masalan TurboFan yordamida) "Loop Peeling" yoki "Loop Unrolling" kabi usullar bilan optimizatsiya qiladi. Erta chiqish (\`break\`) bu optimizatsiyalarni buzmaydi, aksincha bajarilish vaqtini qisqartiradi, chunki u aniq control flow grafigiga mos tushadi. Lekin \`Label\` li sakrashlar dvigatelga optimizatsiyani qiyinlashtirishi (bailout) mumkin.

---

## 4. 📊 Vizual Diagramma (Mermaid)

Quyida \`break\` va \`continue\` oqim boshqaruvi (Control Flow) qanday ishlashi ko'rsatilgan:

\`\`\`mermaid
graph TD
    A[Sikl boshlanishi] --> B{Shart bajariladimi?}
    B -- Yo'q --> C[Sikl tugaydi]
    B -- Ha --> D[Iteratsiya boshlanadi]
    D --> E{break bormi?}
    E -- Ha --> C
    E -- Yo'q --> F{continue bormi?}
    F -- Ha --> G[Qolgan kod tashlab o'tiladi]
    G --> H[Update: i++]
    F -- Yo'q --> I[Qolgan kod bajariladi]
    I --> H
    H --> B
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi manfiy sonni topish",
      instruction: "Sizga sonlar ro'yxati (massiv) berilgan. Dastlabki manfiy sonni topishingiz va o'sha manfiy sonni qaytarishingiz kerak. U topilgandan so'ng tsiklni darhol to'xtating (break). Agar massivda manfiy son bo'lmasa, `null` qaytaring.",
      startingCode: "function firstNegative(arr) {\n  let result = null;\n  for(let i=0; i<arr.length; i++) {\n    // kodingizni shu yozing\n  }\n  return result;\n}",
      hint: "if (arr[i] < 0) qilib tekshiring va result = arr[i]; qilib break qiling.",
      test: "const sandbox = new Function(code + '; return firstNegative;'); const fn = sandbox(); const r1 = fn([1, 2, -3, 4, -5]); if (r1 !== -3) return 'Xato: kutilgan javob -3, olingan javob: ' + r1; const r2 = fn([1, 2]); if (r2 !== null) return 'Xato: kutilgan javob null, olingan javob: ' + r2; return null;"
    },
    {
      id: 2,
      title: "Nolarni o'tkazib yuborish",
      instruction: "Sonlardan iborat massivdan barcha nollarni o'tkazib yuborib (continue), faqat noldan farqli sonlar ko'paytmasini toping. Bo'sh massiv yoki faqat nol bo'lsa 1 qaytsin.",
      startingCode: "function multiplyNonZeros(arr) {\n  let product = 1;\n  for (let num of arr) {\n    // kodingizni bu yerga yozing\n  }\n  return product;\n}",
      hint: "if (num === 0) continue; dan foydalaning.",
      test: "const sandbox = new Function(code + '; return multiplyNonZeros;'); const fn = sandbox(); const r1 = fn([1, 0, 2, 0, 3]); if(r1 !== 6) return 'Xato: [1,0,2,0,3] uchun javob 6 bo\\'lishi kerak.'; const r2 = fn([0, 0]); if(r2 !== 1) return 'Xato: [0,0] uchun 1 qaytishi kerak.'; return null;"
    },
    {
      id: 3,
      title: "Matndan to'xtash so'zini qidirish",
      instruction: "So'zlardan iborat massiv berilgan. Barcha so'zlarni xuddi o'sha ketma-ketlikda yangi massivga qo'shib boring, toki 'STOP' so'zi chiqquncha. 'STOP' so'ziga duch kelganda siklni to'xtating. 'STOP' va undan keyingi so'zlar yangi massivga kirmasligi kerak.",
      startingCode: "function processWords(words) {\n  let result = [];\n  for(let i=0; i<words.length; i++) {\n    // kodingizni bu yerga yozing\n  }\n  return result;\n}",
      hint: "if(words[i] === 'STOP') break; dan foydalaning.",
      test: "const sandbox = new Function(code + '; return processWords;'); const fn = sandbox(); const r1 = fn(['salom', 'dunyo', 'STOP', 'bugun', 'zo\\'r']); if(r1.length !== 2 || r1[0] !== 'salom') return 'Xato ishladi, kutilgan: [\"salom\", \"dunyo\"]'; return null;"
    },
    {
      id: 4,
      title: "Toq sonlarni yig'ish",
      instruction: "Sizga sonlar massivi berilgan. Faqat toq sonlarni qo'shib boruvchi yig'indini qaytaring. Juft sonlarni `continue` yordamida o'tkazib yuboring.",
      startingCode: "function sumOdds(arr) {\n  let sum = 0;\n  for (let num of arr) {\n    // kodingizni bu yerga yozing\n  }\n  return sum;\n}",
      hint: "if (num % 2 === 0) continue; dan foydalaning.",
      test: "const sandbox = new Function(code + '; return sumOdds;'); const fn = sandbox(); if (fn([1, 2, 3, 4, 5]) !== 9) return 'Xato ishladi'; return null;"
    },
    {
      id: 5,
      title: "Limitgacha bo'lgan harflar",
      instruction: "Satr (string) berilgan. Uning belgilarini (harflarini) bittadan o'qib, 'x' harfi uchraguncha qancha harf o'qilganini qaytaring. 'x' ko'rilishi bilan qolganini o'qishni bekor qiling.",
      startingCode: "function countBeforeX(str) {\n  let count = 0;\n  for(let i=0; i<str.length; i++) {\n    // kodingizni bu yerga yozing\n  }\n  return count;\n}",
      hint: "if (str[i] === 'x') break; ni ishlatib tsiklni to'xtating va countni qaytaring.",
      test: "const sandbox = new Function(code + '; return countBeforeX;'); const fn = sandbox(); if (fn('helloxworld') !== 5) return 'Xato'; return null;"
    },
    {
      id: 6,
      title: "Null va Undefined'ni chetlab o'tish",
      instruction: "Aralash ma'lumotli massiv berilgan. Massivdagi qiymatlar ichida null va undefined lar bo'lsa ularni continue yordamida tashlab o'tib, qolgan elementlarni sonini (length emas, faqat mavjud qiymatlar) hisoblang.",
      startingCode: "function countValid(arr) {\n  let validCount = 0;\n  for(let i=0; i<arr.length; i++) {\n    // kodingiz\n  }\n  return validCount;\n}",
      hint: "if (arr[i] === null || arr[i] === undefined) continue; orqali tashlab o'ting.",
      test: "const sandbox = new Function(code + '; return countValid;'); const fn = sandbox(); if (fn([1, null, 2, undefined, 3]) !== 3) return 'Xato ishladi'; return null;"
    },
    {
      id: 7,
      title: "Sirli Raqam Qidiruvi",
      instruction: "0 dan 100 gacha bo'lgan raqamlar massividan, aniq bitta '77' sonini topishingiz kerak. Dastur uni topgach, \"Topdim\" degan so'zni qaytarsin va darhol siklni yopsin (break). Agar massiv oxirigacha topolmasa \"Topilamadi\" qaytarsin.",
      startingCode: "function find77(arr) {\n  let msg = 'Topilamadi';\n  for(let i=0; i<arr.length; i++) {\n    // kodingiz\n  }\n  return msg;\n}",
      hint: "arr[i] === 77 shartga tushsa msg = 'Topdim'; va break;. Sikl tashqarisida msg ni qaytaring.",
      test: "const sandbox = new Function(code + '; return find77;'); const fn = sandbox(); if (fn([1, 2, 77, 8]) !== 'Topdim') return 'Xato 77 bo\\'lganda Topdim chiqishi kerak'; if (fn([1,2,3]) !== 'Topilamadi') return 'Xato'; return null;"
    },
    {
      id: 8,
      title: "Faqat stringlarni birlashtirish",
      instruction: "Massivda turli tiplar bor (string, number, boolean). Sikl yordamida faqat string tiplarini bitta matnga qo'shib boring (masalan \"abc\"). Boshqa tiplarni continue bilan tashlab o'ting.",
      startingCode: "function joinStrings(arr) {\n  let result = '';\n  for(let i=0; i<arr.length; i++) {\n    // kodingiz\n  }\n  return result;\n}",
      hint: "typeof arr[i] !== 'string' bo'lsa continue; aks holda result += arr[i];",
      test: "const sandbox = new Function(code + '; return joinStrings;'); const fn = sandbox(); if (fn([1, 'a', true, 'b', null, 'c']) !== 'abc') return 'Xato: kutilgan javob \"abc\"'; return null;"
    },
    {
      id: 9,
      title: "Nested Loops Break (Label ishlatilmaydi)",
      instruction: "2D massiv (matritsa) berilgan. Matritsa ichidagi massivlarni tekshirganda agar massiv ichida 'BOMB' so'zi bo'lsa, O'SHA ICHKI siklni to'xtating va keyingi qatorga (massivga) o'ting. Qolgan elementlarni summasini hisoblab boring (faqat sonlar bo'lsa).",
      startingCode: "function calculateSafeMatrix(matrix) {\n  let sum = 0;\n  for(let i=0; i<matrix.length; i++) {\n    for(let j=0; j<matrix[i].length; j++) {\n      if (matrix[i][j] === 'BOMB') {\n        // kodingiz\n      }\n      if (typeof matrix[i][j] === 'number') sum += matrix[i][j];\n    }\n  }\n  return sum;\n}",
      hint: "if shartini ichiga shunchaki break yozsangiz ichki sikl tugaydi va tashqi sikl davom etadi.",
      test: "const sandbox = new Function(code + '; return calculateSafeMatrix;'); const fn = sandbox(); const mat = [[1, 2], [1, 'BOMB', 5], [2, 3]]; if (fn(mat) !== 9) return 'Xato ishladi, BOMB dan keyingi elementlar sanalmasligi kerak'; return null;"
    },
    {
      id: 10,
      title: "Cheksiz while siklini xavfsiz qilish",
      instruction: "Cheksiz `while(true)` sikli berilgan. Uni xavfsiz tarzda 5 marta aylangandan keyin to'xtating (break yordamida). Sikl ichida count o'zgaruvchisini oshirib boriladi.",
      startingCode: "function safeWhile() {\n  let count = 0;\n  while(true) {\n    // count ni oshiring, va agar 5 ga yetsa break qiling\n  }\n  return count;\n}",
      hint: "count++; qiling va if(count === 5) break; ishlating.",
      test: "const sandbox = new Function(code + '; return safeWhile;'); const fn = sandbox(); if (fn() !== 5) return 'Xato: count 5 ga teng bo\\'lishi kerak'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`break` kalit so'zi siklda qanday vazifani bajaradi?",
      options: [
        "Joriy iteratsiyani tashlab o'tadi va keyingisiga o'tadi",
        "Siklni darhol va butunlay to'xtatib, sikldan chiqadi",
        "Dasturni butunlay to'xtatadi",
        "Siklni boshidan boshlaydi"
      ],
      correctAnswer: 1,
      explanation: "`break` joriy ishlayotgan siklni butunlay yakunlaydi va dastur ishlashi sikldan keyingi qatordan davom etadi."
    },
    {
      id: 2,
      question: "`continue` kalit so'zi siklda qanday vazifani bajaradi?",
      options: [
        "Siklni butunlay to'xtatadi",
        "Dasturni xatolikka olib keladi",
        "Joriy iteratsiyani qolgan qismini tashlab o'tib, navbatdagi iteratsiyaga sakraydi",
        "Sikl ichidagi if shartlarini bekor qiladi"
      ],
      correctAnswer: 2,
      explanation: "`continue` joriy iteratsiyaning (aylanishning) qolgan qismini bajarmay, siklni yangilash (update) va keyingi aylanishga o'tishni ta'minlaydi."
    },
    {
      id: 3,
      question: "Quyidagi koddan qanday xatolik kelib chiqadi?\n```javascript\n[1, 2, 3].forEach(num => {\n  if (num === 2) break;\n});\n```",
      options: [
        "Hech qanday xatolik bo'lmaydi, kod to'g'ri ishlaydi",
        "TypeError",
        "SyntaxError: Illegal break statement",
        "ReferenceError"
      ],
      correctAnswer: 2,
      explanation: "`forEach`, `map`, `filter` kabi array metodlari callback funksiyalar qabul qiladi. Funksiya ichida siklga tegishli bo'lgan `break` yoki `continue` ishlatilsa `SyntaxError` (Sintaktik xato) kelib chiqadi."
    },
    {
      id: 4,
      question: "`break` va `continue` qaysi tsikllarda ishlashi mumkin?",
      options: [
        "Faqat `for` siklida",
        "Faqat `while` siklida",
        "`for`, `while`, `do...while`, `for...in`, `for...of`",
        "Hech qaysi birida ishlata olmaymiz"
      ],
      correctAnswer: 2,
      explanation: "Ushbu ikkala kalit so'zni JavaScript'dagi barcha haqiqiy sikl (loop) bloklari ichida ishlatish mumkin."
    },
    {
      id: 5,
      question: "Ichma-ich siklda `break` ishlatilsa nima sodir bo'ladi?",
      options: [
        "Barcha sikllarni birdaniga to'xtatadi",
        "Faqat o'zi joylashgan (eng ichki) siklni to'xtatadi",
        "Faqat tashqi siklni to'xtatadi",
        "Dastur crash bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Odatda `break` faqat o'zi tegishli bo'lgan eng yaqin (eng ichki) blokdagi siklni to'xtatadi. Agar tashqi siklni ham to'xtatish kerak bo'lsa Label ishlatish kerak."
    },
    {
      id: 6,
      question: "Label statement nima?",
      options: [
        "O'zgaruvchini saqlash uchun kalit so'z",
        "HTML teglarini yaratish usuli",
        "Siklga nom berish mexanizmi (masalan `myLoop: for...`), ichma-ich sikllarni boshqarish uchun ishlatiladi",
        "CSS dagi z-index analogi"
      ],
      correctAnswer: 2,
      explanation: "Label sikllarni belgilash (nomlash) orqali, ichki sikldan turib to'g'ridan-to'g'ri tashqi siklni `break` yoki `continue` qilish uchun ishlatiladi."
    },
    {
      id: 7,
      question: "`continue` ni `switch` blokida ishlatsa bo'ladimi?",
      options: [
        "Ha, case'larni sakrab o'tish uchun ishlatsa bo'ladi",
        "Yo'q, `switch` sikl emas va unda `continue` ishlatsa SyntaxError bo'ladi",
        "Faqat default qismida ishlatish mumkin",
        "Faqat Node.js da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`continue` faqat tsikl bloklari uchun ruxsat etilgan. Switch blokida faqat `break` ishlatiladi."
    },
    {
      id: 8,
      question: "Nega V8 dvigatelida `break` resursni tejaydi?",
      options: [
        "Chunki `break` xotirani birdan format qiladi",
        "Chunki u qolgan ortiqcha iteratsiyalarni bajarmay, CPU ishini to'xtatadi va boshqa kodga o'tadi",
        "Chunki u yangi variable yaratadi",
        "V8 dvigatelida umuman `break` optimizatsiya qilinmaydi"
      ],
      correctAnswer: 1,
      explanation: "Kerakli natija topilgandan keyin tsiklni davom ettirish CPU resursini bekorga isrof qilishdir. `break` bilan sakrash orqali ortiqcha qadamlardan qutulamiz."
    },
    {
      id: 9,
      question: "while siklida qanday qilib continue ishlatsak cheksiz tsikl (Infinite Loop) ga aylanib qolish xavfi bor?",
      options: [
        "Update qismini (masalan, `i++`) `continue` dan pastga yozganda",
        "Sikl shartini `true` qilib qo'yganda",
        "O'zgaruvchini sikldan tashqarida e'lon qilganda",
        "`continue` ga argument berib yuborganda"
      ],
      correctAnswer: 0,
      explanation: "Agar update jarayoni (`i++`) `continue`dan keyin kelsa, kod o'sha qismga yetib bormay tsikl boshiga qaytadi va shart o'zgarmay doimo to'g'ri qolaveradi."
    },
    {
      id: 10,
      question: "V8 performance nuqtai nazaridan, nested looplarda Label ishlatishning kamchiligi nimada?",
      options: [
        "Memory Leak ga olib keladi",
        "JavaScript kod ishlamay qoladi",
        "JIT kompilyatori (TurboFan) uchun control flow ni optimizatsiya qilishni qiyinlashtiradi (bailout xavfi mavjud)",
        "CSS selectorlariga zarar yetkazadi"
      ],
      correctAnswer: 2,
      explanation: "Label li sakrashlar kodning chiziqli oqimini (control flow) murakkablashtiradi va V8 engine uchun uni optimize qilish qiyinlashadi, natijada de-optimization (bailout) sodir bo'lishi mumkin."
    },
    {
      id: 11,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nfor (let i = 0; i < 3; i++) {\n  if (i === 1) continue;\n  console.log(i);\n}\n```",
      options: [
        "0, 1, 2",
        "0, 2",
        "1",
        "1, 2"
      ],
      correctAnswer: 1,
      explanation: "`i` qiymati 1 bo'lganda tsikl keyingi qadamga o'tib ketadi. Shuning uchun logda faqat 0 va 2 paydo bo'ladi."
    },
    {
      id: 12,
      question: "`break` o'rniga iteratsiyani to'xtatish uchun array metodi sifatida nima ishlatish tavsiya qilinadi?",
      options: [
        "Array.prototype.forEach()",
        "Array.prototype.some() yoki Array.prototype.every()",
        "Array.prototype.map()",
        "Array.prototype.filter()"
      ],
      correctAnswer: 1,
      explanation: "`.some()` iteratsiyani to'xtatish uchun callback'dan `true` qaytarsa bo'ladi, bu xuddi `break` kabi butunlay tsikl ishlashini to'xtatadi. Shuning uchun ES6+ da bu usul tavsiya etiladi."
    }
  ]
};

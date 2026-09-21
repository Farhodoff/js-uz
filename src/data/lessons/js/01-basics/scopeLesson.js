export const scopeBasics = {
  id: "scopeBasics",
  title: "Scope (Ko'lam): Global, Blok va Lokal",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, shahar markazida hamma ko'rishi mumkin bo'lgan katta e'lonlar doskasi bor — u yerdagi ma'lumotni istalgan odam o'qiy oladi. Lekin uyingiz ichidagi xonangizda shaxsiy daftaringiz bor — uni faqat shu xonaga kirgan odamgina o'qiy oladi, ko'chadagilar esa ko'rmaydi.
JavaScript da o'zgaruvchilar ham xuddi shunday ishlaydi: ba'zilari butun dasturga ochiq bo'lsa, ba'zilari faqat ma'lum bir xona (blok yoki funksiya) ichida yashirin bo'ladi.

**Scope (ko'lam / ko'rinish sohasi)** — o'zgaruvchining qayerda e'lon qilingani va dasturning qaysi qismlaridan turib unga murojaat qilish mumkinligini belgilovchi chegaradir.

*Yangi terminlar:*
- **Scope (ko'lam)** — o'zgaruvchi yashaydigan va unga murojaat qilish mumkin bo'lgan hudud.
- **Global scope (global ko'lam)** — har qanday blok yoki funksiyadan tashqaridagi eng yuqori soha. Bu yerda e'lon qilingan o'zgaruvchi hamma joydan ko'rinadi.
- **Block scope (blok ko'lami)** — \`{ }\` (jingalak qavslar) ichidagi soha. \`let\` va \`const\` faqat o'zi joylashgan blok ichidagina yashaydi.
- **Local scope (lokal ko'lam)** — ma'lum bir funksiya yoki blok ichidagi xususiy soha (tashqaridan ko'rinmaydi).

---

## 2. Nega kerak?

Agar hamma o'zgaruvchilar bitta umumiy xonada (global) saqlanganida, dastur kattalashgani sari katta chalkashlik kelib chiqardi:

\`\`\`javascript
// Muammo: Agar hamma narsa umumiy bo'lsa
let count = 10;
// Boshqa bir blok yoki funksiya tasodifan count ni o'zgartirib yuborishi mumkin!
\`\`\`

Dasturimizda turli joylarda bir xil qulay nomlardan (masalan, \`count\`, \`total\`, \`message\`) foydalanamiz. Scope tufayli har bir blok yoki funksiya o'zining shaxsiy hududiga ega bo'ladi va ichkaridagi o'zgaruvchilar tashqaridagilarga xalaqit bermaydi.

---

## 3. Birinchi misol

Bu kod global o'zgaruvchi va blok ichidagi lokal o'zgaruvchining qanday ko'rinishini ko'rsatadi.

\`\`\`javascript
let city = "Toshkent"; // global o'zgaruvchi (hamma joydan ko'rinadi)

if (true) {
  let street = "Navoiy"; // blok scope (faqat shu blok ichida ko'rinadi)
  console.log(city); // ichkaridan tashqari ko'rinadi
  console.log(street); // blok ichidagi o'zgaruvchi ko'rinadi
}

console.log(city); // global o'zgaruvchi tashqarida ham ko'rinadi
\`\`\`

\`\`\`text
// Natija:
Toshkent
Navoiy
Toshkent
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let city = "Toshkent";\` — har qanday blok yoki funksiyadan tashqarida e'lon qilindi. Bu **global scope**. Uni butun dastur bo'yicha hamma ko'radi.
- \`if (true) {\` — yangi blok (\`{ }\`) ochildi. Bu yerda yangi **block scope** boshlanadi.
- \`let street = "Navoiy";\` — blok ichida \`let\` bilan yaratildi. Bu o'zgaruvchi faqat shu jingalak qavslar ichida yashaydi.
- \`console.log(city);\` — blok ichidan turib tashqaridagi (global) o'zgaruvchini bemalol o'qish mumkin (ichkaridan tashqari ko'rinadi).
- \`console.log(street);\` — blok ichida o'zining lokal o'zgaruvchisi muammosiz o'qiladi.
- \`}\` — blok yopildi! Shu onda \`street\` o'zgaruvchisi xotiradan o'chadi va endi mavjud emas.
- \`console.log(city);\` — global o'zgaruvchi tashqarida ham mavjud bo'lib turibdi.

---

## 5. Qadamma-qadam (trace)

O'zgaruvchilarning ko'rinish hududi jadvali:

| Qator | Kod | Joylashuv | city ko'rinadimi? | street ko'rinadimi? |
|---|---|---|---|---|
| 1 | \`let city = "Toshkent";\` | Tashqarida (Global) | Ha ("Toshkent") | Yo'q (hali e'lon qilinmagan) |
| 3 | \`if (true) {\` | Blok boshlandi | Ha ("Toshkent") | Yo'q |
| 4 | \`let street = "Navoiy";\` | Blok ichida | Ha ("Toshkent") | Ha ("Navoiy") |
| 7 | \`}\` | Blok tugadi | Ha ("Toshkent") | Yo'q (blok bilan birga yo'qoldi) |
| 9 | \`console.log(city);\` | Tashqarida (Global) | Ha ("Toshkent") | Yo'q (ReferenceError beradi) |

Qoida: **Ichkaridan tashqari ko'rinadi, lekin tashqaridan ichkari ko'rinmaydi!**

---

## 6. Yana bitta misol

1-misoldan farqi: \`var\` kalit so'zi blok ko'lamini (block scope) tan olmaydi va blokdan tashqariga chiqib ketadi!

\`\`\`javascript
if (true) {
  var score = 100; // var blok chegarasini tan olmaydi!
  let points = 50; // let faqat blok ichida yashaydi
}

console.log(score); // tashqarida ham ko'rinadi!
\`\`\`

\`\`\`text
// Natija:
100
\`\`\`

Tahlil:
- \`points\` o'zgaruvchisi \`let\` bilan yaratilgani uchun u blokdan tashqarida yo'q bo'ladi.
- \`score\` esa eskirgan \`var\` bilan e'lon qilingani uchun blokdan tashqariga "sizib chiqadi". Aynan shu nojo'ya xatti-harakati sababli zamonaviy JavaScript da \`var\` o'rniga har doim \`let\` va \`const\` ishlatiladi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Blok ichidagi o'zgaruvchini tashqarida ishlatishga urinish

\`\`\`javascript
if (true) {
  let user = "Ali";
}

console.log(user); // XATO: ReferenceError: user is not defined
\`\`\`

**Nima bo'ladi:** \`ReferenceError: user is not defined\` xatosi chiqadi. Chunki \`let\` faqat o'zi yaratilgan \`{ }\` blok ichida yashaydi.
**To'g'ri varianti:** Agar o'zgaruvchi tashqarida ham kerak bo'lsa, uni blokdan oldin (tashqarida) e'lon qiling:
\`\`\`javascript
let user = "";
if (true) {
  user = "Ali";
}
console.log(user); // Ali
\`\`\`

### 2-xato: Funksiya ichidagi lokal o'zgaruvchini tashqarida o'qish

\`\`\`javascript
function calculate() {
  let price = 500; // lokal o'zgaruvchi
  return price;
}

calculate();
console.log(price); // XATO: ReferenceError: price is not defined
\`\`\`

**Nima bo'ladi:** \`price\` funksiya tugashi bilan yo'qoladi. Tashqaridan unga to'g'ridan-to'g'ri murojaat qilib bo'lmaydi.
**To'g'ri varianti:** Funksiya qaytargan (\`return\`) qiymatni tashqaridagi o'zgaruvchiga saqlab oling: \`let result = calculate(); console.log(result);\`.

### 3-xato: var ishlatib tasodifan tashqi o'zgaruvchini buzib qo'yish

\`\`\`javascript
var total = 10;

if (true) {
  var total = 20; // XATO: tashqi total ni bexosdan o'zgartirib yubordi!
}

console.log(total); // 20 (10 emas!)
\`\`\`

**Nima bo'ladi:** \`var\` blok ko'lamiga ega bo'lmagani uchun ichkaridagi \`total\` tashqaridagi \`total\` ustiga yozib yuboradi.
**To'g'ri varianti:** Har doim \`let\` yoki \`const\` ishlating. Ular har bir blok uchun alohida hudud yaratadi.

---

## 8. Tekshiruv

### 1-mashq (oson)
Global sohada \`appName\` nomli o'zgaruvchi yarating va unga \`"JS Academy"\` qiymatini bering. \`showApp\` nomli oddiy funksiya yarating va uning ichida konsolga global \`appName\` ni chiqaring. Funksiyani chaqiring.

### 2-mashq (o'rtacha)
Tashqarida \`let globalAge = 30;\` o'zgaruvchisini yarating. So'ngra \`if (true)\` bloki ichida \`let localAge = 25;\` o'zgaruvchisini e'lon qiling. Blokdan tashqarida \`console.log(globalAge);\` orqali faqat global o'zgaruvchini konsolga chiqaring.

### 3-mashq (chegara holat)
\`var\` ning blok ko'lamini mensimasligini amalda tekshiring: \`if (true)\` bloki ichida \`var secret = 777;\` e'lon qiling. Blok tugagach, blokdan tashqarida turib \`console.log(secret);\` ni chaqiring va natijani ko'ring.

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
let appName = "JS Academy";

function showApp() {
  console.log(appName);
}

showApp();
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
let globalAge = 30;

if (true) {
  let localAge = 25;
}

console.log(globalAge); // 30
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
if (true) {
  var secret = 777;
}

console.log(secret); // 777
\`\`\`

---

## 9. Xulosa

1. Scope — o'zgaruvchilarning qayerda yashashi va qayerdan ko'rinishini belgilovchi qamrov chegarasidir.
2. \`let\` va \`const\` blok ko'lamiga ega (block scope): ular faqat o'zlari e'lon qilingan \`{ }\` blok ichida mavjud bo'ladi.
3. \`var\` blok ko'lamini tan olmaydi va blokdan tashqariga chiqib ketadi (shu sababli undan foydalanmaslik tavsiya etiladi).

Keyingi darsda: Funksiyani boshqa funksiyaga argument sifatida uzatish — Callback tushunchasi bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Global o'zgaruvchini funksiya ichida ishlatish",
      instruction: "Global sohada `appName` nomli o'zgaruvchi yaratib, unga `\"JS Academy\"` qiymatini bering. `showApp` nomli funksiya yozib, uning ichida konsolga `appName` ni chiqaring. Funksiyani chaqiring.",
      startingCode: "// appName va showApp funksiyasini yozing\n",
      hint: "let appName = \"JS Academy\";\nfunction showApp() {\n  console.log(appName);\n}\nshowApp();",
      test: "if (!code.includes('appName')) return 'appName o\\'zgaruvchisi yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('JS Academy'))) return null;\nreturn 'Konsolga \"JS Academy\" chiqmadi';"
    },
    {
      id: 2,
      title: "Blok va global o'zgaruvchilar",
      instruction: "Tashqarida `let globalAge = 30;` yarating. `if (true)` bloki ochib, uning ichida `let localAge = 25;` e'lon qiling. Blokdan tashqarida `console.log(globalAge);` orqali faqat `globalAge` ni konsolga chiqaring.",
      startingCode: "let globalAge = 30;\n\nif (true) {\n  let localAge = 25;\n}\n\n// globalAge ni konsolga chiqaring\n",
      hint: "console.log(globalAge);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('30'))) return null;\nreturn 'Konsolga 30 chiqmadi';"
    },
    {
      id: 3,
      title: "var ning blokdan chiqishi",
      instruction: "`if (true)` bloki ichida `var secret = 777;` e'lon qiling. Blokdan keyin (tashqarida) `console.log(secret);` orqali uni konsolga chiqaring.",
      startingCode: "if (true) {\n  // var bilan secret yarating\n}\n\n// secret ni konsolga chiqaring\n",
      hint: "if (true) {\n  var secret = 777;\n}\nconsole.log(secret);",
      test: "if (!code.includes('var')) return 'var ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('777'))) return null;\nreturn 'Konsolga 777 chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Blok scope (blok ko'lami) qaysi belgilar bilan chegaralanadi?",
      options: [
        "{ } (jingalak qavslar)",
        "( ) (oddiy qavslar)",
        "[ ] (kvadrat qavslar)",
        "\" \" (qo'shtirnoq)"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da { } (jingalak qavslar) orasidagi soha blok deyiladi va let/const faqat shu blok ichida yashaydi."
    },
    {
      id: 2,
      question: "var bilan e'lon qilingan o'zgaruvchi if bloki ichida yaratilsa nima bo'ladi?",
      options: [
        "U blokdan tashqariga ham chiqadi (blok scope ga ega emas)",
        "U faqat blok ichida ko'rinadi",
        "SyntaxError xatosi yuz beradi",
        "Dastur avtomatik to'xtaydi"
      ],
      correctAnswer: 0,
      explanation: "var o'zgaruvchisi blok ko'lamiga ega emas. U blok ichida yaratilsa ham blokdan tashqarida ko'rinaveradi."
    },
    {
      id: 3,
      question: "Funksiya yoki blok ichida let bilan yaratilgan o'zgaruvchiga tashqaridan murojaat qilinsa nima yuz beradi?",
      options: [
        "ReferenceError: ... is not defined xatosi chiqadi",
        "TypeError xatosi chiqadi",
        "SyntaxError xatosi chiqadi",
        "Hech qanday xato chiqmaydi, undefined bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "let va const bilan yaratilgan o'zgaruvchilar o'zlari e'lon qilingan blokdan tashqarida mavjud bo'lmaydi va ReferenceError beradi."
    }
  ]
};

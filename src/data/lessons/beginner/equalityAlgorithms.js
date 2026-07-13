export const equalityAlgorithms = {
  id: "equalityAlgorithms",
  title: "Taqqoslash va Tenglik (== vs ===)",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy: Taqqoslash va Tenglik

JavaScript-da ikkita qiymatni solishtirish uchun asosan \`==\` (Loose Equality - Yumshoq tenglik) va \`===\` (Strict Equality - Qat'iy tenglik) operatorlari ishlatiladi.

### Real Hayotiy O'xshatish: Kino Teatriga Kirish 🎬
Tasavvur qiling, siz kino teatriga kirmoqchisiz va chipta tekshiruvchisiga yuzlandingiz.

1. **Yumshoq Chiptachi (\`==\`)**: U sizning chiptangiz qanday shaklda ekanligiga qaramaydi. Telefon ekranidagi elektron chipta (String) bo'ladimi yoki qog'oz chipta (Number) bo'ladimi, unga farqi yo'q. U shunchaki chiptadagi raqamni o'qiydi (tiplarni bir xil ko'rinishga keltiradi) va agar raqamlar mos kelsa, sizni ichkariga kiritadi.
2. **Qat'iy Nazoratchi (\`===\`)**: U juda talabchan. U nafaqat chiptangiz raqamini (qiymatni) tekshiradi, balki chiptangiz shaklini (ma'lumot tipini) ham tekshiradi. Agar u qog'oz chipta (Number) kutayotgan bo'lsa-yu, siz unga elektron chipta (String) ko'rsatsangiz, garchi raqamlar bir xil bo'lsa ham, u sizni kiritmaydi!

\\\`\\\`\\\`javascript
console.log(5 == "5");  // true (Yumshoq chiptachi: "5" ni songa aylantirib, keyin solishtiradi)
console.log(5 === "5"); // false (Qat'iy nazoratchi: tiplar har xil - biri son, ikkinchisi matn, darhol rad etadi)
\\\`\\\`\\\`

---

## 2. 🧠 Deep Dive: Under the Hood (V8 Dvigateli va Xotira)

JavaScript kodini ishga tushiradigan V8 dvigateli tenglikni qanday hal qiladi?

### 1. Strict Equality (\`===\`) Algoritmi (Tezroq ⚡)
Qat'iy tenglik juda tez ishlaydi, chunki dvigatel birinchi navbatda ma'lumot tiplarini taqqoslaydi. Agar tiplar farq qilsa, dvigatel darhol \`false\` qaytaradi. Hech qanday qo'shimcha resurs yoki aylantirish (coercion) talab qilinmaydi. Shuning uchun \`===\` performans jihatidan ancha samarali.

\\\`\\\`\\\`javascript
console.log(10 === 10);      // true
console.log(10 === "10");    // false (Tip turlicha, shu zahoti to'xtaydi)
console.log({} === {});      // false (Xotirada ikki xil ob'ekt manzili - referens)
console.log(NaN === NaN);    // false (IEEE 754 qoidasiga ko'ra, NaN o'z-o'ziga teng emas)
\\\`\\\`\\\`

### 2. Loose Equality (\`==\`) Algoritmi (Sekinroq 🐢)
Yumshoq tenglik Abstract Equality Comparison algoritmiga tayanadi. Agar tiplar har xil bo'lsa, V8 dvigateli ularni bir xil tipga (odatda Number tipiga) yashirincha o'zgartirish (Implicit Type Coercion) uchun qo'shimcha operatsiyalarni bajaradi. Bu esa xotira va protsessor vaqtini oladi.

\\\`\\\`\\\`javascript
console.log(1 == true);   // true (true qiymati Number() orqali 1 ga aylanadi)
console.log([] == false); // true (Massiv ToPrimitive orqali bo'sh satrga "", so'ng 0 ga, false ham 0 ga aylanadi)
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Savollari

JavaScript-dagi tiplarni aylantirish mexanizmi ko'plab chalkashliklarni (edge cases) keltirib chiqaradi. Bu holatlar ko'pincha Senior darajadagi suhbatlarda so'raladi.

### G'alati holatlar:
\\\`\\\`\\\`javascript
console.log(null == undefined); // true (Maxsus qoida: bu ikkisi faqat bir-biriga teng)
console.log(null === undefined); // false (Tiplar har xil: object va undefined)

console.log([] == ![]); // true
// Nega? ![] = false (chunki bo'sh massiv truthy, uning inkor qilingani false)
// Shunday qilib, [] == false ga aylanadi.
// [] -> "" -> 0. false -> 0. Demak, 0 == 0 -> true.

console.log([10] == 10); // true (Massiv qoidasi: [10].toString() -> "10", keyin son 10 ga aylanadi)

// Object.is() - === dan ko'ra kuchliroq tekshiruv
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0));   // false (-0 va +0 ni farqlaydi)
\\\`\\\`\\\`

Nima uchun doim \`===\` ishlatish kerak?
Chunki \`==\` kutilmagan mantiqiy xatolarga (buglarga) olib kelishi mumkin. Professional jamoalarda \`==\` ishlatish taqiqlanadi (Lint qoidalari yordamida).

---

## 4. 📊 Mermaid Diagrammasi: Tenglik Algoritmi

Quyida JavaScript-ning \`==\` va \`===\` ishlash prinsipi tasvirlangan:

\\\`\\\`\\\`mermaid
graph TD
    Start[X va Y ni solishtirish] --> CheckOperator{Operator qaysi?}
    
    CheckOperator -->|===| StrictEquality[Tiplar bir xilmi?]
    CheckOperator -->|==| LooseEquality[Tiplar bir xilmi?]
    
    StrictEquality -->|Yo'q| FalseResult[Natija: false]
    StrictEquality -->|Ha| ValueCheck[Qiymatlar aynan tengmi?]
    ValueCheck -->|Yo'q| FalseResult
    ValueCheck -->|Ha| TrueResult[Natija: true]
    
    LooseEquality -->|Ha| ValueCheck
    LooseEquality -->|Yo'q| TypeCoercion[Ikkalasini ham umumiy tipga o'tkazish]
    TypeCoercion --> StrictEquality
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Strict taqqoslash",
      instruction: "`strictCheck` o'zgaruvchisiga `10 === \"10\"` taqqoslash natijasini saqlang.",
      startingCode: "let strictCheck = ;",
      hint: "Tiplar har xil bo'lgani uchun natija nima bo'ladi?",
      test: "const sandbox = new Function(code + '; let strictCheck = 10 === \"10\"; return strictCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 2,
      title: "Loose taqqoslash",
      instruction: "`looseCheck` o'zgaruvchisiga `10 == \"10\"` taqqoslash natijasini saqlang.",
      startingCode: "let looseCheck = ;",
      hint: "Yumshoq tenglik yashirincha turni o'zgartiradi.",
      test: "const sandbox = new Function(code + '; let looseCheck = 10 == \"10\"; return looseCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 3,
      title: "Booleanga aylantirish",
      instruction: "`booleanCheck` o'zgaruvchisiga `1 == true` ifodasining natijasini saqlang.",
      startingCode: "let booleanCheck = ;",
      hint: "true son sifatida qanday qiymatga teng?",
      test: "const sandbox = new Function(code + '; let booleanCheck = 1 == true; return booleanCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 4,
      title: "Null va Undefined",
      instruction: "`nullCheck` o'zgaruvchisiga `null === undefined` ifodasining natijasini saqlang.",
      startingCode: "let nullCheck = ;",
      hint: "Ikkalasining ma'lumot tipi bir xilmi?",
      test: "const sandbox = new Function(code + '; let nullCheck = null === undefined; return nullCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 5,
      title: "NaN taqqoslash",
      instruction: "`nanCheck` o'zgaruvchisiga `NaN === NaN` ifodasining natijasini saqlang.",
      startingCode: "let nanCheck = ;",
      hint: "NaN hech qachon o'ziga teng bo'lmaydi.",
      test: "const sandbox = new Function(code + '; let nanCheck = NaN === NaN; return nanCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 6,
      title: "Massiv va Mantiqiy",
      instruction: "`arrCheck` o'zgaruvchisiga `[] == false` ni saqlang.",
      startingCode: "let arrCheck = ;",
      hint: "Bo'sh massiv songa aylantirilganda 0 ga aylanadi.",
      test: "const sandbox = new Function(code + '; let arrCheck = [] == false; return arrCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 7,
      title: "Obyekt va Obyekt",
      instruction: "`objCheck` o'zgaruvchisiga `{} === {}` ni saqlang.",
      startingCode: "let objCheck = ;",
      hint: "Ikkita turli obyekt xotirada turli manzillarga ega.",
      test: "const sandbox = new Function(code + '; let objCheck = {} === {}; return objCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 8,
      title: "Massiv ichidagi son",
      instruction: "`arrayNumCheck` o'zgaruvchisiga `[5] == 5` taqqoslashini saqlang.",
      startingCode: "let arrayNumCheck = ;",
      hint: "Massiv yagona elementdan iborat bo'lsa, u elementning primitive qiymatiga o'tadi.",
      test: "const sandbox = new Function(code + '; let arrayNumCheck = [5] == 5; return arrayNumCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 9,
      title: "Object.is funksiyasi",
      instruction: "`objectIsCheck` o'zgaruvchisiga `Object.is(NaN, NaN)` natijasini saqlang.",
      startingCode: "let objectIsCheck = ;",
      hint: "Object.is NaN qiymatlarni qanday baholaydi?",
      test: "const sandbox = new Function(code + '; let objectIsCheck = Object.is(NaN, NaN); return objectIsCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 10,
      title: "Bo'sh matn va nol",
      instruction: "`emptyStrCheck` o'zgaruvchisiga `\"\" === 0` taqqoslashini yuklang.",
      startingCode: "let emptyStrCheck = ;",
      hint: "Qat'iy tenglik bo'lgani uchun tur o'zgarishi yuz bermaydi.",
      test: "const sandbox = new Function(code + '; let emptyStrCheck = \"\" === 0; return emptyStrCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Loose equality (`==`) va Strict equality (`===`) ning eng asosiy farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "Strict equality tezroq yoziladi",
        "Strict equality tiplarni tekshirmaydi",
        "Strict equality ham qiymatni, ham tipni tekshiradi"
      ],
      correctAnswer: 3,
      explanation: "Strict (===) tipini va qiymatini qat'iy tekshiradi, hech qanday aylantirish (coercion) qilmaydi."
    },
    {
      id: 2,
      question: "V8 dvigatelida qaysi operator tezroq ishlaydi va nima uchun?",
      options: [
        "`==` chunki u moslashuvchan",
        "`===` chunki u tiplar farq qilsa, coercion qilmasdan darhol false qaytaradi",
        "Ikkalasi ham bir xil tezlikda ishlaydi",
        "Tezlik kompyuterning operativ xotirasiga bog'liq"
      ],
      correctAnswer: 1,
      explanation: "Strict equality tiplarni aylantirish uchun qo'shimcha resurs sarflamaydi."
    },
    {
      id: 3,
      question: "Quyidagi ifoda nima qaytaradi? `NaN === NaN`",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "IEEE 754 qoidalariga ko'ra, NaN o'z-o'ziga ham teng emas."
    },
    {
      id: 4,
      question: "`null == undefined` natijasi nima bo'ladi?",
      options: ["false", "true", "xato beradi", "NaN"],
      correctAnswer: 1,
      explanation: "Yumshoq tenglik qoidasiga ko'ra, null va undefined faqatgina o'zaro teng hisoblanadi."
    },
    {
      id: 5,
      question: "Quyidagi ifoda qanday baholanadi: `[] == false`",
      options: ["true", "false", "undefined", "0"],
      correctAnswer: 0,
      explanation: "Bo'sh massiv va false Number() orqali aylantirilganda 0 ga aylanadi: 0 == 0 -> true."
    },
    {
      id: 6,
      question: "Senior savol: Nega `[] == ![]` ifodasi `true` beradi?",
      options: [
        "Chunki massiv inkor qilinganda yana massivga aylanadi",
        "Chunki `![]` false ga aylanadi, so'ng `[] == false` taqqoslanadi va 0 == 0 ga aylanib true bo'ladi",
        "Bu JavaScriptning eski versiyalaridagi bug",
        "Reference xotirasi aynan bir xil"
      ],
      correctAnswer: 1,
      explanation: "![] truthy bo'lgan massivni false ga aylantiradi. [] == false esa 0 == 0 ga o'zgaradi."
    },
    {
      id: 7,
      question: "`{} === {}` natijasi qanday?",
      options: ["true", "false", "ReferenceError", "NaN"],
      correctAnswer: 1,
      explanation: "Obyektlar manzil (reference) orqali solishtiriladi. Bu ikkita alohida xotira manziliga ega obyektlar."
    },
    {
      id: 8,
      question: "`Object.is(NaN, NaN)` ifodasi nimani qaytaradi?",
      options: [
        "false",
        "true",
        "ReferenceError",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Object.is() SameValue algoritmidan foydalanadi va u yerda NaN lar o'zaro teng deb qaraladi."
    },
    {
      id: 9,
      question: "`1 == true` ifodasi nima uchun `true` qaytaradi?",
      options: [
        "1 o'z-o'zidan boolean qiymat hisoblanadi",
        "Mantiqiy qiymat bo'lgan true avval songa - 1 ga aylanadi, va 1 == 1 taqqoslanadi",
        "Bu xato, aslini olganda false",
        "1 qat'iy turga ega emas"
      ],
      correctAnswer: 1,
      explanation: "Booleanga aylantirish qoidalariga ko'ra, true = 1 va false = 0 sifatida raqamga o'tkaziladi."
    },
    {
      id: 10,
      question: "`[10] == 10` solishtirilganda dvigatel nima qiladi?",
      options: [
        "Xato beradi",
        "Massivning uzunligi olinadi",
        "Massiv toString() orqali '10' stringiga aylanib, keyin son 10 ga o'tadi va true qaytaradi",
        "False qaytaradi"
      ],
      correctAnswer: 2,
      explanation: "ToPrimitive operatsiyasi orqali massivdan yagona element olinib satrga, so'ng songa aylanadi."
    },
    {
      id: 11,
      question: "Nima uchun doim `===` (Strict equality) ishlatish tavsiya qilinadi?",
      options: [
        "Bu yozishda osonroq",
        "Yashirin coercion natijasida kelib chiqadigan buglarning oldini oladi va ishonchli kod yaratadi",
        "Faqat lint qoidalariga moslashish uchun",
        "C++ kodi bilan o'xshashlikni ta'minlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Strict equality hechnimani taxmin qilmaydi, aynan tiplar mosligini va qiymat mosligini qat'iy tekshiradi."
    },
    {
      id: 12,
      question: "`\"\" == false` da nimalar bo'ladi?",
      options: [
        "\"\" (bo'sh satr) va false ham number 0 ga aylanib true natija beradi",
        "false string'ga aylanib false chiqadi",
        "undefined chiqadi",
        "xato chiqadi"
      ],
      correctAnswer: 0,
      explanation: "Ikki tomonda ham implicit type coercion qo'llaniladi va 0 == 0 taqqoslash hosil qilinadi."
    }
  ]
};

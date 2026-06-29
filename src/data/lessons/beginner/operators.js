export const operators = {
  id: "operators",
  title: "Operatorlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
JavaScript-da **operatorlar** — bu qiymatlar (operandlar) ustida matematik, solishtirish yoki mantiqiy amallarni bajarishga ko'rsatma beruvchi maxsus belgilar. Masalan, \`+\` operatori ikkita sonni qo'shadi, \`===\` esa ularning tengligini tekshiradi.

Oshxonaga o'xshatadigan bo'lsak:
* **O'zgaruvchilar:** Idishlar va mahsulotlar (go'sht, piyoz).
* **Operatorlar:** Oshxona asboblari! 
  * Matematik (\`+\`, \`-\`): Pichoq va qirg'ich.
  * Solishtirish (\`===\`, \`>\`): Tarozilar.
  * Mantiqiy (\`&&\`, \`||\`): Retsept qoidalari ("Agar kartoshka VA sabzi bo'lsa, sho'rva qilamiz").

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON:** Kuchsiz solishtirish (\`==\`) operatoridan foydalanish (kutilmagan natijalarga olib kelishi mumkin).
\`\`\`javascript
const input = "";
if (input == 0) {
  // Bo'sh satr 0 deb o'qiladi, bu xavfli!
}
\`\`\`

✅ **YAXSHI:** Qat'iy solishtirish (\`===\`) operatoridan foydalanish (turlarni ham tekshiradi).
\`\`\`javascript
const input = "";
if (input === 0) {
  // false beradi, mutlaqo xavfsiz.
}
\`\`\`

## 🎤 Intervyu Savollari
1. **\`==\` va \`===\` farqi nimada?**
   - \`==\` faqat qiymatni tekshiradi va solishtirishdan oldin turlarni avtomatik o'zgartiradi (type coercion). \`===\` esa qiymatni ham, ma'lumot turini ham qat'iy tekshiradi.
2. **Short-circuit (qisqa tutashuv) baholash nima?**
   - Mantiqiy \`&&\` operatori chap tomonda falsy qiymat ko'rsa o'ng tomonni hisoblamaydi, \`||\` esa chap tomonda truthy ko'rsa o'ng tomonni tekshirmasdan to'xtaydi.
3. **Nullish coalescing (\`??\`) operatori qanday ishlaydi?**
   - \`??\` operatori faqatgina chap tomon \`null\` yoki \`undefined\` bo'lsagina o'ng tomondagi qiymatga o'tadi. \`0\` yoki \`""\` kabi falsy qiymatlar bo'lsa, ularning o'zini qoldiradi.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
flowchart TD
    A[Operatorlar] --> B[Matematik]
    A --> C[Solishtirish]
    A --> D[Mantiqiy]
    B --> E[+, -, *, /, %, **]
    C --> F[===, !==, >, <, >=, <=]
    D --> G[&&, ||, !, ??]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Matematik amal",
      instruction: "Ikkita son qabul qilib, ularning yig'indisini shu sonlarning ayirmasiga ko'paytirib qaytaradigan \`calculateMath(a, b)\` funksiyasini yozing. Ya'ni (a + b) * (a - b).",
      startingCode: "function calculateMath(a, b) {\n  // Kodni yozing\n}",
      hint: "Qavslardan foydalanib ustuvorlikni aniqlang: (a + b) * (a - b).",
      test: "const fn = new Function(code + '; return calculateMath;')(); if(fn(5, 3) !== 16) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Qoldiqni topish",
      instruction: "Berilgan a sonini b soniga bo'lgandagi qoldiqni qaytaradigan \`getRemainder(a, b)\` funksiyasini yozing.",
      startingCode: "function getRemainder(a, b) {\n  // Kodni yozing\n}",
      hint: "% operatoridan foydalaning.",
      test: "const fn = new Function(code + '; return getRemainder;')(); if(fn(10, 3) !== 1) throw new Error('Qoldiq noto\\'g\\'ri');"
    },
    {
      id: 3,
      title: "Qat'iy tenglik",
      instruction: "Ikkita parametr qabul qilib, ular qat'iy teng (===) bo'lsagina true qaytaruvchi \`isStrictEqual(x, y)\` yozing.",
      startingCode: "function isStrictEqual(x, y) {\n  // Kodni yozing\n}",
      hint: "x === y dan foydalaning.",
      test: "const fn = new Function(code + '; return isStrictEqual;')(); if(fn(1, '1') !== false || fn(2, 2) !== true) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Yoshi yetadimi?",
      instruction: "Foydalanuvchi yoshi (age) 18 dan katta yoki unga teng bo'lsa true, aks holda false qaytaruvchi \`canVote(age)\` yozing.",
      startingCode: "function canVote(age) {\n  // Kodni yozing\n}",
      hint: "age >= 18 mantiqiy amali to'g'ridan to'g'ri true yoki false qaytaradi.",
      test: "const fn = new Function(code + '; return canVote;')(); if(fn(17) !== false || fn(18) !== true) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Mantiqiy Inkor",
      instruction: "Berilgan qiymatning mantiqiy inkorini (boolean qiymatining teskarisini) qaytaruvchi \`negateValue(val)\` funksiyasini yozing.",
      startingCode: "function negateValue(val) {\n  // Kodni yozing\n}",
      hint: "Bitta ! belgisidan foydalaning: !val.",
      test: "const fn = new Function(code + '; return negateValue;')(); if(fn(true) !== false || fn('') !== true) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Nullish Coalescing (??)",
      instruction: "O'zgaruvchi x va y qabul qiladigan \`getDefault(x, y)\` funksiyasini yozing. U x ning qiymati null yoki undefined bo'lsa y ni qaytarsin, aks holda x ning o'zini qaytarsin.",
      startingCode: "function getDefault(x, y) {\n  // Kodni yozing\n}",
      hint: "x ?? y amali yordam beradi.",
      test: "const fn = new Function(code + '; return getDefault;')(); if(fn(null, 'default') !== 'default' || fn(0, 1) !== 0) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Mantiqiy AND (&&)",
      instruction: "Ikkita parametr x va y truthy (rost) bo'lsagina y ni qaytaradigan, aks holda birinchi falsy qiymatni qaytaradigan \`logicalAnd(x, y)\` yozing.",
      startingCode: "function logicalAnd(x, y) {\n  // Kodni yozing\n}",
      hint: "x && y amali xuddi shunday ishlaydi.",
      test: "const fn = new Function(code + '; return logicalAnd;')(); if(fn(true, 'salom') !== 'salom' || fn(0, 1) !== 0) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Tana vazni indeksini (BMI) hisoblash",
      instruction: "Vazn (kg) va bo'y (m) qabul qilib, BMI hisoblaydigan va son qaytaradigan \`calculateBMI(weight, height)\` yozing. BMI = weight / (height ** 2). Natijani butun songa yaxlitlang (Math.round).",
      startingCode: "function calculateBMI(weight, height) {\n  // Kodni yozing\n}",
      hint: "Math.round(weight / (height ** 2))",
      test: "const fn = new Function(code + '; return calculateBMI;')(); if(fn(70, 1.75) !== 23) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Ternary operatori",
      instruction: "Raqam qabul qilib, juft bo'lsa 'juft', toq bo'lsa 'toq' qaytaruvchi \`checkEvenOdd(num)\` yozing. Ternary (? :) operatoridan foydalaning.",
      startingCode: "function checkEvenOdd(num) {\n  // Kodni yozing\n}",
      hint: "return num % 2 === 0 ? 'juft' : 'toq';",
      test: "const fn = new Function(code + '; return checkEvenOdd;')(); if(fn(4) !== 'juft' || fn(7) !== 'toq') throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Foydalanuvchi ismini tanlash",
      instruction: "nickname va fullName qabul qiluvchi \`getDisplayName(nickname, fullName)\` yozing. nickname bo'sh bo'lmasa uni, aks holda fullName ni, ikkalasi ham falsy bo'lsa 'Mehmon' qaytarsin.",
      startingCode: "function getDisplayName(nickname, fullName) {\n  // Kodni yozing\n}",
      hint: "return nickname || fullName || 'Mehmon';",
      test: "const fn = new Function(code + '; return getDisplayName;')(); if(fn('', 'Vali') !== 'Vali' || fn('', '') !== 'Mehmon') throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `==` (loose equality) va `===` (strict equality) operatorlari o'rtasidagi asosiy farq nimada?",
      options: [
        "`==` faqat qiymatlarni solishtiradi, `===` esa qiymatni va turni ham (type) tekshiradi",
        "`===` faqat obyektlarni solishtirish uchun ishlatiladi",
        "`==` operatori tezroq ishlaydi",
        "Ular orasida farq yo'q"
      ],
      correctAnswer: 0,
      explanation: "`==` turlarni moslashtiradi (type coercion). `===` esa qat'iy tekshiradi."
    },
    {
      id: 2,
      question: "Quyidagi ifodalarning natijasi nima: `'5' + 3` va `'5' - 3`?",
      options: [
        "`'53'` (string) va `2` (number)",
        "`8` (number) va `2` (number)",
        "`'53'` (string) va `NaN`",
        "`NaN` va `2` (number)"
      ],
      correctAnswer: 0,
      explanation: "`+` operatori string qo'shadi. `-` esa majburiy songa aylantiradi."
    },
    {
      id: 3,
      question: "Nullish coalescing (`??`) operatori o'ng tomonga qachon o'tadi?",
      options: [
        "Faqat `null` yoki `undefined` bo'lganda",
        "Har qanday falsy (0, '', false) bo'lganda",
        "Faqat false bo'lganda",
        "Doim"
      ],
      correctAnswer: 0,
      explanation: "`??` operatori faqatgina chap taraf null yoki undefined bo'lganda ishlaydi."
    },
    {
      id: 4,
      question: "`console.log(true || false && false);` kodi natijasi qanday bo'ladi?",
      options: [
        "true",
        "false",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 0,
      explanation: "`&&` prioriteti yuqoriroq bo'lgani uchun avval `false && false` (false) bo'ladi. Keyin `true || false` bu `true` chiqadi."
    },
    {
      id: 5,
      question: "`let x = 5; let y = x++;` da y ning qiymati nima bo'ladi?",
      options: [
        "y = 5",
        "y = 6",
        "y = 4",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "Postfix inkrement (`x++`) da avval qiymat yuklanadi (5), keyin o'zgaruvchi oshadi (6)."
    },
    {
      id: 6,
      question: "Quyidagilardan qaysi biri to'g'ri: `[] == false`?",
      options: [
        "Natija true",
        "Natija false",
        "Natija TypeError",
        "Natija undefined"
      ],
      correctAnswer: 0,
      explanation: "`==` orqali bo'sh massiv avval bo'sh satrga keyin 0 ga aylanadi, false ham 0 ga aylanadi."
    },
    {
      id: 7,
      question: "`console.log(5 && 'hello' && 0 && true);` nima chiqaradi?",
      options: [
        "0",
        "'hello'",
        "false",
        "true"
      ],
      correctAnswer: 0,
      explanation: "Mantiqiy `&&` birinchi topgan falsy qiymatini qaytaradi (bu holda 0)."
    },
    {
      id: 8,
      question: "Quyidagi operator nima qaytaradi: `typeof null`?",
      options: [
        "'object'",
        "'null'",
        "'undefined'",
        "'value'"
      ],
      correctAnswer: 0,
      explanation: "Bu JavaScriptdagi tarixiy xato bo'lib, `typeof null` natijasi 'object' bo'ladi."
    },
    {
      id: 9,
      question: "Darajaga ko'tarish: `2 ** 3 ** 2` nechi bo'ladi?",
      options: [
        "512",
        "64",
        "18",
        "81"
      ],
      correctAnswer: 0,
      explanation: "`**` operatori o'ngdan chapga ishlaydi: avval 3 ** 2 (9), keyin 2 ** 9 (512)."
    },
    {
      id: 10,
      question: "Qaysi operatorning ustuvorligi (prioriteti) barchasidan baland?",
      options: [
        "Guruhlash ()",
        "Ko'paytirish *",
        "Qo'shish +",
        "Tenglik ==="
      ],
      correctAnswer: 0,
      explanation: "Qavslar () ifodani eng birinchi bajarishga majbur qiladi."
    },
    {
      id: 11,
      question: "`let x = 10; x += 5 * 2;` natijada x nechi bo'ladi?",
      options: [
        "20",
        "30",
        "15",
        "10"
      ],
      correctAnswer: 0,
      explanation: "Ko'paytirish `*` ning prioriteti yukori. Avval 5*2=10. Keyin x+=10 bo'ladi (20)."
    },
    {
      id: 12,
      question: "`console.log(!'hello');` nimani chiqaradi?",
      options: [
        "false",
        "true",
        "'hello'",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "Bo'sh bo'lmagan satr truthy qiymatdir. NOT (!) uni inkor qiladi va false bo'ladi."
    }
  ]
};
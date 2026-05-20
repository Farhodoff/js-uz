export const scopeLesson = {
  id: "scope",
  title: "Scope (Ko'rinish sohasi)",
  level: "Beginner",
  description: "O'zgaruvchilar kodingizning qaysi qismida 'yashashi' va qayerda 'ko'rinishi' haqida.",
  theory: `
# Scope – Bu nima va nima uchun kerak?

**Scope** (Ko'rinish sohasi) — bu o'zgaruvchilar va funksiyalarning kodingizda qayerda ishlatilishi mumkinligini belgilaydigan hududdir.

## 1. NEGA kerak?
Tasavvur qiling, hamma o'zgaruvchilar "global" (hamma joyda ko'rinadigan) bo'lsa, kodingiz juda tartibsiz bo'lib ketadi. Biror funksiya ichidagi o'zgaruvchi boshqa funksiyadagi o'zgaruvchi bilan to'qnashib ketishi mumkin. Scope bizga kodni tartibga solish va "xavfsiz hududlar" yaratishga yordam beradi.

## 2. SODDALIK (Analogiya)
Buni uyingizdagi xonalar deb tasavvur qiling:
- **Global Scope:** Bu uyning hovlisi. Hovlidagi narsani hamma xonadan ko'rish mumkin.
- **Local Scope (Xona):** Bu sizning yotoqxonangiz. U yerdagi narsalarni faqat o'sha xonada o'tirganlar ko'radi. Tashqaridagilar (globaldagilar) ichkarida nima borligini bilmaydi.

## 3. STRUKTURA

### A. Global Scope
Hamma joyda ishlaydigan o'zgaruvchilar:
\`\`\`javascript
let hovli = "Daraxt";
function xona() {
  console.log(hovli); // Daraxtni ko'rsa bo'ladi
}
\`\`\`

### B. Function Scope
Faqat funksiya ichida ko'rinadigan o'zgaruvchilar:
\`\`\`javascript
function xona() {
  let kravat = "Yumshoq";
}
console.log(kravat); // Xato! (ReferenceError)
\`\`\`

### C. Block Scope (let va const)
\`if\`, \`for\` yoki \`{ }\` ichidagi o'zgaruvchilar:
\`\`\`javascript
if (true) {
  let sir = "Maxfiy";
}
console.log(sir); // Xato!
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let ism = "Farhod"; // Global
function salom() {
  let xabar = "Assalomu alaykum"; // Local
  console.log(xabar + ", " + ism);
}
salom();
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Global o'zgaruvchilarni ko'p ishlatish:** Bu "Global Namespace Pollution" deyiladi va xatolarga sabab bo'ladi.
2.  **var va Block Scope:** \`var\` block scope'ni tushunmaydi! \`if\` ichidagi \`var\` tashqarida ham ko'rinadi. Doim \`let\` va \`const\` ishlating.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Scope nima?**
Scope (ko'rinish sohasi) — o'zgaruvchilar va funksiyalarning kodingizda qayerda ishlatilishi mumkinligini belgilaydigan hudud.


**2. Global scope nima?**
Kodning eng yuqori qismida, hech qanday funksiya yoki blok ichida bo'lmagan, hamma joyda ko'rinadigan hudud.


**3. Local (Function) scope nima?**
Faqat ma'lum bir funksiya ichida ko'rinadigan va tashqaridan kirib bo'lmaydigan hudud.


**4. Block scope nima?**
\`{ }\` jingalak qavslar ichidagi hudud (masalan, \`if\`, \`for\` ichida). Unga faqat \`let\` va \`const\` bo'ysunadi.


**5. let, const va varning scope bo'yicha farqi nima?**
\`let\` va \`const\` block scope'ga ega, \`var\` esa function scope'ga ega (block'ni tan olmaydi).


**6. Scope Chain (zanjiri) nima?**
JS o'zgaruvchini topa olmasa, uni bir bosqich yuqoridagi (tashqi) scopedan qidirish jarayoni.


**7. Nima uchun global o'zgaruvchilardan qochish kerak?**
Nomlar to'qnashuvi (collision) va kutilmagan xatolar oldini olish uchun (Global Namespace Pollution).


**8. Funksiya ichidagi o'zgaruvchi global o'zgaruvchi bilan bir xil nomda bo'lsa nima bo'ladi?**
"Variable Shadowing" yuz beradi: funksiya ichida faqat local o'zgaruvchi ishlaydi, globali vaqtincha to'silib turadi.


**9. "Lexical scope" nima degani?**
O'zgaruvchining ko'rinish sohasi u kodning qayerida e'lon qilinganiga qarab belgilanishi (chaqirilgan joyiga emas).


**10. O'zgaruvchi e'lon qilinmagan bo'lsa, JS uni qayerdan qidiradi?**
Joriy scopedan boshlab, eng yuqori Global scope'gacha qidiradi. Topilmasa \`ReferenceError\` beradi.


**11. Block scope if va fordan tashqari qayerda bo'lishi mumkin?**
Istalgan \`{ }\` jingalak qavslar yordamida mustaqil block yaratish mumkin.


**12. Nesting (ichma-ich) scopelar qanday ishlaydi?**
Ichki scope tashqi scope dagi o'zgaruvchilarni ko'ra oladi, lekin tashqi scope ichki scopedagi o'zgaruvchilarni ko'ra olmaydi.
`,
  exercises: [
    {
      id: 1,
      title: "Local scope mashqi",
      instruction: "Funksiya ichida o'zgaruvchi yarating va va uni tashqarida chiqarishga urinib xato (ReferenceError) oling.",
      startingCode: "function test() {\n  // Bu yerda let x = 5 yarating\n}\ntest();\n// Bu yerda console.log(x) qiling",
      hint: "console.log(x) ni test() dan tashqarida yozing.",
      test: "if (output.includes('ReferenceError')) return null; return 'Xato chiqishi kerak edi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da scope (ko'rinish sohasi) nima?",
      options: [
        "Kodni tezlashtiruvchi maxsus rejim",
        "O'zgaruvchi va funksiyalarning kodingizda qayerda 'yashashi' (ko'rinishi va ishlatilishi mumkinligi)ni belgilovchi hudud",
        "Faqat server bilan bog'lanish uchun xizmat qiladigan vosita",
        "Obyektlar ichidagi metodlar to'plami"
      ],
      correctAnswer: 1,
      explanation: "Scope o'zgaruvchi va funksiyalarning kod hududlaridagi ko'rinish va foydalanish chegaralarini aniqlab beruvchi mantiqiy qobiqdir."
    },
    {
      id: 2,
      question: "Funksiya yoki block `{}` tashqarisida, ya'ni kodning eng yuqori qismida e'lon qilingan o'zgaruvchi qaysi scope doirasiga kiradi?",
      options: [
        "Function Scope",
        "Block Scope",
        "Global Scope (u kodning istalgan joyidan, jumladan funksiyalar ichidan ham ko'rinadi)",
        "Lexical Scope"
      ],
      correctAnswer: 2,
      explanation: "Kodning eng yuqori qismida, hech qanday funksiya yoki blok ichida bo'lmagan o'zgaruvchilar Global Scope-ga tegishli bo'lib, butun dastur bo'yicha ko'rinadi."
    },
    {
      id: 3,
      question: "`if` sharti yoki `for` sikli bloklari `{}` ichida `let` yoki `const` yordamida yaratilgan o'zgaruvchilarning ko'rinish sohasi qanday bo'ladi?",
      options: [
        "Ular butun fayl bo'ylab (global) ko'rinadi",
        "Ular faqat o'sha jingalak qavslar `{}` ichida ko'rinadi (Block Scope)",
        "Ular faqat funksiyalar ichida ko'rinadi",
        "Ular umuman ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` o'zgaruvchilari Block Scope (blok ko'rinish sohasi) qoidalariga bo'ysunadi, ya'ni ular faqat o'zlari e'lon qilingan jingalak qavslar `{}` blokida ishlaydi."
    },
    {
      id: 4,
      question: "Nima uchun JavaScript-da global scope-da juda ko'p o'zgaruvchilar yaratish (\"Global Namespace Pollution\") tavsiya etilmaydi?",
      options: [
        "Chunki global o'zgaruvchilar dasturning xotira sarfini kamaytiradi",
        "Kodni o'qish qiyinlashadi va nomlar to'qnashuvi (collision) tufayli kutilmagan xatoliklar (bug) yuz berishi mumkin",
        "Chunki brauzer global o'zgaruvchilar bilan ishlay olmaydi",
        "Bunday cheklov mavjud emas"
      ],
      correctAnswer: 1,
      explanation: "Agar ko'p global o'zgaruvchilar bo'lsa, kodni boshqarish qiyinlashadi, shuningdek, turli kutubxonalar yoki funksiyalar bir xil nomdagi o'zgaruvchilarni tasodifan o'zgartirib yuborishi (naming collision) mumkin."
    },
    {
      id: 5,
      question: "Quyidagi kodda `console.log(b)` chaqirilganda qanday natija olinadi?\n```javascript\nif (true) {\n  var a = 5;\n  let b = 10;\n}\nconsole.log(a);\nconsole.log(b);\n```",
      options: [
        "Ikkalasi ham xato beradi",
        "5 va 10 chiqadi",
        "a uchun `5` chiqadi, lekin b uchun `ReferenceError` xatosi beradi (chunki var block scope-ni tan olmaydi, let esa block scope-ga ega)",
        "a uchun `ReferenceError` beradi, b uchun 10 chiqadi"
      ],
      correctAnswer: 2,
      explanation: "`var` kalit so'zi bilan yaratilgan o'zgaruvchilar block scope-ga ega bo'lmaydi, shuning uchun `if` tashqarisida ham ko'rinadi. `let` esa blok sohasi bilan cheklanganligi uchun, block tashqarisida `ReferenceError` beradi."
    }
  ]
};

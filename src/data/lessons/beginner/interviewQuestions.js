export const interviewQuestionsBeginner = {
  id: "interview-beginner",
  title: "🟢 Interview Savollar (Boshlang'ich)",
  level: "Beginner",
  description: "Boshlang'ich darajadagi JavaScript dasturchilari intervyularida eng ko'p beriladigan nazariy va amaliy savollar to'plami.",
  theory: `## 1. NEGA kerak?
Junior darajadagi intervyularda asosan JavaScriptning fundamentallari (asoslari) so'raladi. Kodni shunchaki yozibgina qolmay, u orqada qanday ishlashini tushuntira olish, mantiqiy fikrlashni ko'rsatish va ehtimoliy xatoliklar (edge cases)ni hisobga olish ishga qabul qilishda eng katta omillardan biridir.

## 2. SODDALIK (Analogiya)
Intervyuga tayyorlanishni imtihonga tayyorlanishga o'xshatish mumkin. Agar savolga quruq nazariy javob bersangiz, sizni "yodlab olgan" deb o'ylashadi. Agar javobga hayotiy misol yoki "Nega aynan shunday?" degan sababni qo'shsangiz (masalan: "var yomon, chunki u block scope'ni tan olmaydi"), bilimingiz amaliy ekanini isbotlaysiz.

## 3. STRUKTURA (Junior intervyu savollari)

### A. var, let va const farqi nima?
- **var:** Function scope, hoistingda \`undefined\` qiymat oladi. Qayta e'lon qilish mumkin.
- **let / const:** Block scope, hoistingda **TDZ** (Temporal Dead Zone)ga tushib, xatolik beradi. \`let\` qiymatini o'zgartirsa bo'ladi, \`const\` esa o'zgarmasdir.

### B. Primitiv va Reference (Havola) turlar farqi
- **Primitivlar:** Qiymati bilan xotirada saqlanadi (Stack-da), o'zgarmas (\`immutable\`). Masalan: son, matn, bulian.
- **Reference (Obyektlar):** Xotiradagi manzili bilan saqlanadi (Heap-da), o'zgaruvchan (\`mutable\`). Masalan: obyekt, massiv, funksiya.

### C. == va === farqi
- \`==\` (Loose): Solishtirishdan oldin turlarni avtomatik tarzda moslashtiradi (Coercion).
- \`===\` (Strict): Qiymatni ham, turni ham bir xil bo'lishini talab qiladi.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Jim qolish:** Agar berilgan savolga aniq javob bilmasangiz ham, o'z taxminlaringizni va mantiqiy o'ylash jarayoningizni ovoz chiqarib tushuntiring.
2. **Edge caselarni esdan chiqarish:** Masalan, funksiya massiv qabul qilsa, "agar bo'sh massiv kelsa-chi?" yoki "null kelsa-chi?" degan holatlarni hisobga oling.

## 6. SAVOLLAR VA JAVOBLAR
**1. Temporal Dead Zone (TDZ) nima?**
\`let\` va \`const\` e'lon qilingan qatorgacha bo'lgan joy bo'lib, u yerda o'zgaruvchiga murojaat qilish \`ReferenceError\` beradi.

**2. typeof null natijasi nima va nega?**
\`"object"\`. Bu til yaratilgandagi tarixiy xatodir.

**3. NaN nima va uni qanday tekshiramiz?**
Not-a-Number. \`Number.isNaN(x)\` metodi orqali tekshiriladi.

**4. Hoisting nima?**
O'zgaruvchi va funksiyalarni e'lon qilinishidan oldin yuqoriga ko'tarilib ishlatilishi.

**5. Closures (Yopilishlar) nima?**
Ichki funksiyaning o'zidan tashqaridagi o'zgaruvchilarga murojaat qila olish qobiliyati.

**6. "use strict" nima?**
Kodni qat'iy rejimda ishlashga majburlar, yashirin xatolarni ko'rsatadi va xavfsizroq kod yozishni ta'minlaydi.

**7. Massivdan oxirgi elementni qanday o'chiradi?**
\`.pop()\` metodi orqali (massivning o'zini o'zgartiradi).

**8. map() va forEach() farqi nima?**
\`map()\` yangi massiv qaytaradi, \`forEach()\` esa shunchaki elementlarni aylanib chiqib, \`undefined\` qaytaradi.

**9. JS bir oqimli (single-threaded) tilmi?**
Ha, u bir vaqtning o'zida faqat bitta operatsiyani bajara oladi.

**10. Falsy qiymatlar qaysilar?**
\`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`.

**11. Massiv ekanligini qanday tekshiramiz?**
\`Array.isArray(x)\` orqali.

**12. push() va concat() farqi nima?**
\`push()\` mavjud massiv oxiriga element qo'shib uning uzunligini qaytaradi, \`concat()\` esa yangi massiv yaratib qaytaradi.
`,
  exercises: [
    {
      id: 1,
      title: "Intervyu mashqi",
      instruction: "Berilgan sonning juft yoki toq ekanligini qaytaradigan funksiya yozing.",
      startingCode: "function isEven(num) {\n  // Bu yerga yozing\n}",
      hint: "return num % 2 === 0;",
      test: "if (isEven(4) === true && isEven(5) === false) return null; return 'Mantiq xato!';"
    },
    {
      id: 2,
      title: "Palindrom tekshiruvi",
      instruction: "Berilgan so'zning palindrom (o'ngdan ham, chapdan ham bir xil o'qiladigan) ekanligini tekshiruvchi isPalindrom funksiyasini yozing.",
      startingCode: "function isPalindrom(str) {\n  // Bu yerga yozing\n}",
      hint: "return str === str.split('').reverse().join('');",
      test: "if (isPalindrom('non') === true && isPalindrom('olma') === false) return null; return 'Palindrom funksiyasi noto\\'g\\'ri ishladi!';"
    },
    {
      id: 3,
      title: "Faktorial hisoblash",
      instruction: "n sonining faktorialini hisoblaydigan factorial funksiyasini yozing.",
      startingCode: "function factorial(n) {\n  // Bu yerga yozing\n}",
      hint: "if (n <= 1) return 1; return n * factorial(n - 1);",
      test: "if (factorial(5) === 120 && factorial(0) === 1) return null; return 'Faktorial hisoblash xato!';"
    },
    {
      id: 4,
      title: "Massivdagi eng katta son",
      instruction: "Massivdagi eng katta sonni qaytaradigan findMax funksiyasini yozing.",
      startingCode: "function findMax(arr) {\n  // Bu yerga yozing\n}",
      hint: "return Math.max(...arr);",
      test: "if (findMax([1, 8, 3]) === 8) return null; return 'Eng katta sonni topish xato!';"
    },
    {
      id: 5,
      title: "Satrni teskarilash",
      instruction: "Berilgan satrni teskarilab qaytaruvchi reverseString funksiyasini yozing.",
      startingCode: "function reverseString(str) {\n  // Bu yerga yozing\n}",
      hint: "return str.split('').reverse().join('');",
      test: "if (reverseString('salom') === 'molas') return null; return 'Satrni teskarilash xato!';"
    },
    {
      id: 6,
      title: "Unlilar soni",
      instruction: "Satrdagi unli harflar (a, e, i, o, u) sonini sanovchi countVowels funksiyasini yozing.",
      startingCode: "function countVowels(str) {\n  // Bu yerga yozing\n}",
      hint: "const vowels = ['a','e','i','o','u']; return str.toLowerCase().split('').filter(char => vowels.includes(char)).length;",
      test: "if (countVowels('apple') === 2 && countVowels('sky') === 0) return null; return 'Unlilar sonini sanash xato!';"
    },
    {
      id: 7,
      title: "FizzBuzz",
      instruction: "n soni 3 ga bo'linsa 'Fizz', 5 ga bo'linsa 'Buzz', 15 ga bo'linsa 'FizzBuzz' qaytaruvchi fizzBuzz yozing.",
      startingCode: "function fizzBuzz(n) {\n  // Bu yerga yozing\n}",
      hint: "if (n % 15 === 0) return 'FizzBuzz'; if (n % 3 === 0) return 'Fizz'; if (n % 5 === 0) return 'Buzz'; return n;",
      test: "if (fizzBuzz(15) === 'FizzBuzz' && fizzBuzz(9) === 'Fizz' && fizzBuzz(10) === 'Buzz') return null; return 'FizzBuzz sharti xato!';"
    },
    {
      id: 8,
      title: "Massiv yig'indisi",
      instruction: "Massiv elementlari yig'indisini qaytaruvchi sumArray funksiyasini yozing.",
      startingCode: "function sumArray(arr) {\n  // Bu yerga yozing\n}",
      hint: "return arr.reduce((sum, current) => sum + current, 0);",
      test: "if (sumArray([1, 2, 3]) === 6) return null; return 'Yig\\'indi noto\\'g\\'ri!';"
    },
    {
      id: 9,
      title: "Dublikatlarni o'chirish",
      instruction: "Massivdagi bir xil qiymatlarni o'chirib, faqat unikal elementli yangi massiv qaytaruvchi removeDuplicates yozing.",
      startingCode: "function removeDuplicates(arr) {\n  // Bu yerga yozing\n}",
      hint: "return [...new Set(arr)];",
      test: "const res = removeDuplicates([1, 2, 2, 3]); if (res.length === 3 && res.includes(2)) return null; return 'Dublikatlar o\\'chirilmadi!';"
    },
    {
      id: 10,
      title: "Eng uzun so'z",
      instruction: "Gapdagi eng uzun so'zni qaytaruvchi findLongestWord funksiyasini yozing.",
      startingCode: "function findLongestWord(sentence) {\n  // Bu yerga yozing\n}",
      hint: "const words = sentence.split(' '); return words.reduce((longest, current) => current.length > longest.length ? current : longest, '');",
      test: "if (findLongestWord('Men dasturchiman') === 'dasturchiman') return null; return 'Eng uzun so\\'zni topish xato!';"
    },
    {
      id: 11,
      title: "Obyekt kalitlari",
      instruction: "Obyekt kalitlarini massiv sifatida qaytaruvchi getKeys funksiyasini yozing.",
      startingCode: "function getKeys(obj) {\n  // Bu yerga yozing\n}",
      hint: "return Object.keys(obj);",
      test: "const keys = getKeys({a: 1, b: 2}); if (keys.includes('a') && keys.includes('b')) return null; return 'Kalitlarni olish xato!';"
    },
    {
      id: 12,
      title: "Sonni teskari qilish",
      instruction: "Berilgan butun sonni teskarilab qaytaruvchi reverseNumber funksiyasini yozing.",
      startingCode: "function reverseNumber(num) {\n  // Bu yerga yozing\n}",
      hint: "return parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num);",
      test: "if (reverseNumber(123) === 321 && reverseNumber(-45) === -54) return null; return 'Sonni teskarilash xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nconsole.log(typeof null);\n```",
      options: ["\"object\"", "\"null\"", "\"undefined\"", "\"NaN\""],
      correctAnswer: 0,
      explanation: "JavaScriptda `typeof null` tarixiy xatolik (bug) tufayli `\"object\"` qaytaradi. Bu tilning birinchi versiyasidan beri shunday saqlanib kelmoqda."
    },
    {
      id: 2,
      question: "Quyidagi taqqoslash nima qaytaradi?\n```javascript\nconsole.log(0.1 + 0.2 === 0.3);\n```",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "JavaScriptda kasrli sonlar IEEE 754 standarti bo'yicha ikkilik sanoq tizimida saqlanadi. Shuning uchun `0.1 + 0.2` aslida `0.30000000000000004` ga teng bo'lib qoladi va natija false chiqadi."
    },
    {
      id: 3,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nlet a = 10;\n{\n  console.log(a);\n  let a = 20;\n}\n```",
      options: ["10", "20", "undefined", "ReferenceError"],
      correctAnswer: 3,
      explanation: "Block scope ichida `let` yoki `const` orqali e'lon qilingan o'zgaruvchi hoisting bo'ladi, lekin u e'lon qilingan qatorgacha Temporal Dead Zone (TDZ) holatida bo'ladi. Unga e'lon qilinishidan oldin murojaat qilish `ReferenceError` xatosini beradi."
    },
    {
      id: 4,
      question: "Quyidagi kodlar konsolga nimalarni chiqaradi?\n```javascript\nconsole.log(\"5\" - 3);\nconsole.log(\"5\" + 3);\n```",
      options: ["2 va 8", "\"5-3\" va \"53\"", "2 va \"53\"", "NaN va \"53\""],
      correctAnswer: 2,
      explanation: "Ayirish (-) operatori matnni avtomatik ravishda songa o'zgartiradi (`\"5\"` -> 5), natijada 5 - 3 = 2. Qo'shish (+) operatori esa matnlarni birlashtiradi (concatenation), shuning uchun `\"5\"` + 3 = `\"53\"`."
    },
    {
      id: 5,
      question: "NaN taqqoslanganda nima chiqadi?\n```javascript\nconsole.log(NaN === NaN);\n```",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "`NaN` (Not-a-Number) JavaScriptdagi yagona qiymat bo'lib, u o'z-o'ziga ham, boshqa hech qanday qiymatga ham teng emas."
    },
    {
      id: 6,
      question: "Quyidagi o'zgaruvchilardan qaysi biri block scope-ga ega?",
      options: [
        "Faqat `var`",
        "`let` va `const`",
        "`var` va `let`",
        "Barchasi (`var`, `let`, `const`)"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` block scope-ga ega (faqat o'zini o'rab turgan `{}` ichida mavjud bo'ladi). `var` esa function scope-ga ega."
    },
    {
      id: 7,
      question: "Quyidagi o'zgaruvchilardan qaysi biri e'lon qilingandan so'ng qiymati o'zgartirilsa (qayta yuklansa) xatolik (TypeError) beradi?",
      options: [
        "`let`",
        "`const`",
        "`var`",
        "Hech qaysi"
      ],
      correctAnswer: 1,
      explanation: "`const` o'zgarmas o'zgaruvchilarni e'lon qilish uchun ishlatiladi. Unga ikkinchi marta boshqa qiymat yuklab bo'lmaydi."
    },
    {
      id: 8,
      question: "JavaScriptda massivlar (arrays) qaysi ma'lumot turiga kiradi?",
      options: [
        "Primitive",
        "Object (Reference)",
        "Array deb nomlangan maxsus primitiv tur",
        "String"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda primitiv bo'lmagan har qanday tur (massiv, funksiya, xatoliklar) texnik jihatdan `object` (reference) hisoblanadi."
    },
    {
      id: 9,
      question: "Foydalanuvchi o'zgaruvchini yaratdi, lekin unga hech qanday qiymat bermadi. Unda qanday qiymat saqlanadi?",
      options: [
        "`null`",
        "`undefined`",
        "`0`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda e'lon qilingan, ammo qiymat berilmagan o'zgaruvchining qiymati va turi default ravishda `undefined` bo'ladi."
    },
    {
      id: 10,
      question: "`push()` va `pop()` metodlari massivning qayeridan element qo'shadi va o'chiradi?",
      options: [
        "Massiv boshidan",
        "Massiv oxiridan",
        "Tasodifiy joydan",
        "Massivning o'rtasidan"
      ],
      correctAnswer: 1,
      explanation: "`push()` elementni massiv oxiriga qo'shadi, `pop()` esa massiv oxiridagi eng so'nggi elementni o'chirib tashlaydi."
    },
    {
      id: 11,
      question: "Quyidagi ifodaning natijasini toping:\n```javascript\nconsole.log(!!\"\");\n```",
      options: [
        "true",
        "false (chunki bo'sh string falsy qiymatdir)",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh string `\"\"` mantiqiy shartlarda `false` beradi (falsy). Uni ikki marta inkor qilish (`!!`) uning o'zini bulian qiymatiga o'tkazadi, ya'ni `false` qaytadi."
    },
    {
      id: 12,
      question: "JavaScriptda strict mode-ni yoqish uchun koding eng yuqori qismiga nima deb yozish kerak?",
      options: [
        "\"strict: true\"",
        "\"use strict\"",
        "\"use strict_mode\"",
        "\"mode: strict\""
      ],
      correctAnswer: 1,
      explanation: "Kodni qat'iy rejimda ishlatish va ba'zi yashirin xatolarni yuzaga chiqarish uchun fayl boshiga yoki funksiya ichiga `\"use strict\"` satri yoziladi."
    }
  ]
};

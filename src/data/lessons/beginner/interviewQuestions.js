export const interviewQuestionsBeginner = {
  id: "interview-beginner",
  title: "🟢 Interview Savollar (Boshlang'ich)",
  theory: `## Kirish
Bu sahifa JavaScriptdan junior lavozimiga tayyorlanayotganlar uchun mo'ljallangan. 
Intervyuda muvaffaqiyat qozonish uchun quyidagilarga e'tibor bering:
1. **Asoslarni biling:** Faqat kod yozish emas, tushuntira olish muhim.
2. **Kodni ovoz chiqarib tushuntiring:** Fikrlash jarayoningizni ko'rsating.
3. **Edge caselarni o'ylang:** Masalan, null yoki undefined kelsa nima bo'ladi?

Junior darajasidagi intervyularda asosan JavaScriptning asoslari (fundament) so'raladi. Sizdan kodni nafaqat yozish, balki u qanday ishlashini tushuntirib berish talab qilinadi.

## 1. NEGA kerak?
Intervyu — bu sizning bilimingizni "sotish" vaqtidir. Savollarga oldindan tayyorlanish sizga ishonch bag'ishlaydi va hayajonni kamaytiradi.

## 2. SODDALIK (Maslahat)
Savolga javob berganda doim **"NEGA"** degan savolga ham javob berishga harakat qiling. Masalan: "var yomon, chunki u block scope'ni tan olmaydi" (faqat "var yomon" demang).

## 3. STRUKTURA (Eng mashhur savollar)

### A. var, let va const farqi nima?
- **var:** Function scope, hoistingda \`undefined\` bo'ladi.
- **let/const:** Block scope, hoistingda **TDZ** ga tushadi. \`const\` qayta tayinlanmaydi.

### B. Primitiv va Murakkab turlar farqi?
- **Primitivlar:** Qiymati bilan saqlanadi (by value), \`immutable\` (o'zgarmas).
- **Obyektlar:** Manzili bilan saqlanadi (by reference), \`mutable\` (o'zgaruvchan).

### C. == va === farqi?
- \`==\` (loose): Turni avtomatik o'zgartiradi (Coercion).
- \`===\` (strict): Turni tekshiradi, o'zgartirmaydi.

## 4. AMALIYOT (Mashq)
Eng ko'p so'raladigan amaliy savol: **Palindromni tekshirish**
\`\`\`javascript
function isPalindrom(soz) {
  let teskari = soz.split("").reverse().join("");
  return soz === teskari;
}
console.log(isPalindrom("non")); // true
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Nazariyani bilmaslik:** "Ishlasa bo'ldi" deb o'ylamang, JS dvigateli qanday ishlashini so'rashadi.
2. **Jim qolish:** Agar savolga javob bilmasangiz, o'z fikringizni ayting, mantiqiy fikrlashni ko'rsating.

## 6. SAVOLLAR (12 ta)
Quyida eng ko'p so'raladigan savollar va ularning qisqa javoblari keltirilgan. Javobni ko'rish uchun savol ustiga bosing.

## 7. SAVOLLARGA JAVOBLAR

**1. JavaScript nima va u qachon yaratilgan?**
JavaScript — web-sahifalarni interaktiv qilish uchun ishlatiladigan dasturlash tili. U 1995-yilda Brendan Eich tomonidan 10 kunda yaratilgan.


**2. typeof null natijasi nima va nega?**
Natija \`"object"\`. Bu JSning birinchi versiyasidagi xatolik (bug) bo'lib, keyinchalik moslikni saqlab qolish uchun o'zgartirilmagan.


**3. "Temporal Dead Zone" (TDZ) nima?**
TDZ — \`let\` va \`const\` o'zgaruvchilari e'lon qilingan qatorgacha bo'lgan hudud. Unga murojaat qilish \`ReferenceError\` beradi.


**4. NaN nima va uni qanday tekshiramiz?**
\`NaN\` (Not-a-Number) — noto'g'ri matematik amallar natijasi. Uni \`Number.isNaN()\` yoki \`isNaN()\` bilan tekshiramiz.


**5. Hoisting nima?**
Hoisting — o'zgaruvchi va funksiyalar e'lonining kod tepasiga "ko'tarilishi". \`var\` undefined qaytaradi, \`let/const\` xato beradi.


**6. Closures (Yopilishlar) nima?**
Ichki funksiyaning tashqi funksiya o'zgaruvchilariga kirish huquqiga ega bo'lishi, hatto tashqi funksiya tugaganidan keyin ham.


**7. "use strict" nima uchun ishlatiladi?**
JSni "qat'iy rejim"da ishlashga majburlaydi, bu xatolarni tezroq topishga va xavfli sintaksisni taqiqlashga yordam beradi.


**8. Bir vaqtda bir nechta shartni qanday tekshirish mumkin?**
Mantiqiy operatorlar orqali: \`&&\` (va), \`||\` (yoki).


**9. Massivdan oxirgi elementni qanday o'chiramiz?**
\`.pop()\` metodi orqali.


**10. map() va forEach() farqi nima?**
\`forEach()\` shunchaki massivni aylanib chiqadi, \`map()\` esa yangi massiv qaytaradi.


**11. Obyekt ichidagi funksiya (metod) qanday yoziladi?**
Obyekt kalitiga funksiya biriktirish orqali: \`sayHi() { ... }\`.


**12. JSda asinxronlik nima degani?**
Kodning bloklanmasdan, fonda bajarilishi (masalan, API so'rovlar yoki setTimeout).
`,
  exercises: [
    {
      id: 1,
      title: "Intervyu mashqi",
      instruction: "Berilgan sonning juft yoki toq ekanligini qaytaradigan funksiya yozing.",
      startingCode: "function isEven(num) {\n  // Bu yerga yozing\n}",
      hint: "return num % 2 === 0;",
      test: "if (isEven(4) === true && isEven(5) === false) return null; return 'Mantiq xato!';"
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
    }
  ]
};

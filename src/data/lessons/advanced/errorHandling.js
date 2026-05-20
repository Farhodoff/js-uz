export const errorHandling = {
  id: "error-handling",
  title: "Xatolar bilan ishlash: Mustahkam va xavfsiz kod yozish",
  level: "O'rta/Murakkab",
  description: "Dasturingiz 'portlab' ketmasligi uchun xatolarni ushlash, boshqarish va to'g'ri qayta joylashtirish.",
  theory: `## 1. NEGA kerak?

Dasturlashda xatolar muqarrar. Muhimi — xato sodir bo'lganda **butun sayt to'xtab qolmasligini** ta'minlash. Bu foydalanuvchi tajribasi uchun juda muhim.

## 2. SODDALIK (Analogiya)

Buni **xavfsizlik kamari** deb tasavvur qiling. Siz mashina haydayapsiz (kod ishlayapti). Agar kutilmagan holat bo'lsa, xavfsizlik kamari (try...catch) sizni dastur "halokati"dan saqlab qoladi.

## 3. STRUKTURA

### A. Try...Catch...Finally
\`\`\`javascript
try {
  // Xavfli kod
} catch (error) {
  // Xato bo'lsa
  console.log(error.message);
} finally {
  // Har doim
}
\`\`\`

### B. Throw Statement
Ataylab xatolik hosil qilish: \`throw new Error("Xato!");\`

### C. Xato Turlari
TypeError, ReferenceError, SyntaxError.

## 4. SAVOLLAR VA JAVOBLAR

**1. try...catch nima uchun?**
Xatolarni ushlash va dastur to'xtashini oldini olish uchun.


**2. finally qachon ishlaydi?**
Har doim, xato bo'lsa ham, bo'lmasa ham.


**3. Error objektining asosiy xususiyatlari?**
message, name, stack.


**4. throw nima qiladi?**
Xatolikni o'zimiz yaratishimiz uchun (manual exception).


**5. TypeError qachon chiqadi?**
Noto'g'ri turdagi qiymat yoki metod ishlatilsa.


**6. ReferenceError nima?**
Mavjud bo'lmagan o'zgaruvchiga murojaatda.


**7. try...catch asinxron callback-ni ushlaydimi?**
Yo'q, asinxron kodda async/await va try...catch kerak.


**8. Custom Error qanday yaratiladi?**
Error klassidan extends qilib.


**9. throw 123 qilish mumkinmi?**
Ha, lekin obyekt yuborish (throw new Error) yaxshiroq.


**10. window.onerror nima?**
Global xatolarni tutuvchi handler.


**11. Optional chaining (?.) xatodan saqlaydimi?**
Ha, undefined obyekt xususiyatiga murojaatda xatoni oldini oladi.


**12. Production-da xatolar nima qilinadi?**
Odatda maxsus serverga log qilinadi.
`,
  exercises: [
    {
      id: 1,
      title: "Try-Catch",
      instruction: "JSON.parse xatosini ushlang.",
      startingCode: "try {\n  // Bu yerda JSON.parse('invalid') qiling\n} catch(e) {\n  console.log('Ushlandi');\n}",
      hint: "JSON.parse('{{')",
      test: "if (logs.includes('Ushlandi')) return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da `finally` blokining asosiy xususiyati nima?",
      options: [
        "Faqat xato bo'lmasa ishlaydi",
        "Faqat xato bo'lsa ishlaydi",
        "Xato bo'lishi yoki bo'lmasligidan qat'iy nazar har doim ishlaydi",
        "Hech qachon ishlamaydi"
      ],
      correctAnswer: 2,
      explanation: "`finally` har doim eng oxirida bajariladi, resurslarni tozalash uchun qulay."
    },
    {
      id: 2,
      question: "Mavjud bo'lmagan o'zgaruvchiga murojaat qilinganda qanday xato chiqadi?",
      options: ["TypeError", "ReferenceError", "SyntaxError", "RangeError"],
      correctAnswer: 1,
      explanation: "O'zgaruvchi topilmasa `ReferenceError` tashlanadi."
    }
  ]
};
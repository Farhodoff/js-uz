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

<details>
<summary>1. try...catch nima uchun?</summary>
Xatolarni ushlash va dastur to'xtashini oldini olish uchun.
</details>

<details>
<summary>2. finally qachon ishlaydi?</summary>
Har doim, xato bo'lsa ham, bo'lmasa ham.
</details>

<details>
<summary>3. Error objektining asosiy xususiyatlari?</summary>
message, name, stack.
</details>

<details>
<summary>4. throw nima qiladi?</summary>
Xatolikni o'zimiz yaratishimiz uchun (manual exception).
</details>

<details>
<summary>5. TypeError qachon chiqadi?</summary>
Noto'g'ri turdagi qiymat yoki metod ishlatilsa.
</details>

<details>
<summary>6. ReferenceError nima?</summary>
Mavjud bo'lmagan o'zgaruvchiga murojaatda.
</details>

<details>
<summary>7. try...catch asinxron callback-ni ushlaydimi?</summary>
Yo'q, asinxron kodda async/await va try...catch kerak.
</details>

<details>
<summary>8. Custom Error qanday yaratiladi?</summary>
Error klassidan extends qilib.
</details>

<details>
<summary>9. throw 123 qilish mumkinmi?</summary>
Ha, lekin obyekt yuborish (throw new Error) yaxshiroq.
</details>

<details>
<summary>10. window.onerror nima?</summary>
Global xatolarni tutuvchi handler.
</details>

<details>
<summary>11. Optional chaining (?.) xatodan saqlaydimi?</summary>
Ha, undefined obyekt xususiyatiga murojaatda xatoni oldini oladi.
</details>

<details>
<summary>12. Production-da xatolar nima qilinadi?</summary>
Odatda maxsus serverga log qilinadi.
</details>`,
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
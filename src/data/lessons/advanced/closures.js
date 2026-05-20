export const closuresLesson = {
  id: "closures",
  title: "Closures: Funksiyalarning 'Eslab Qolish' Qobiliyati",
  level: "Murakkab",
  description: "Closure kontseptsiyasi: Lexical Environment, Private o'zgaruvchilar, va Real hayot misollar.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, sizga counter kerak. Agar siz o'zgaruvchini global qilib yaratsangiz, istalgan kod uni o'zgartirib yuborishi mumkin. **Closure** yordamida o'zgaruvchini funksiya ichiga yashirib (private) qo'yishimiz mumkin.

## 2. SODDALIK (Analogiya)

Buni "xazinachining ruxsati" deb tasavvur qiling:
- **Xazina** (o'zgaruvchi) lock orqali saqlanadi.
- **Xazinachi** (qaytarilgan funksiya) faqat o'zi xohlagan tarzda pul olib/qo'yishi mumkin.

## 3. STRUKTURA

### A. Lexical Environment
Funksiya yaratilgan joyidagi barcha o'zgaruvchilarga kirish huquqiga ega.

### B. Private o'zgaruvchilar
Tashqaridan ko'rinmaydigan, faqat metodlar orqali o'zgaradigan ma'lumotlar.

### C. Function Factory
Bir xil qolipli lekin har xil ma'lumotli funksiyalar yasash.

## 4. SAVOLLAR VA JAVOBLAR

**1. Closure nima?**
Funksiya o'zi yaratilgan muhitni (o'zgaruvchilarni) eslab qolishi.


**2. Lexical Environment nima?**
Funksiya yaratilgan joyidagi o'zgaruvchilar va ularga kirish doirasi.


**3. Closure nima uchun kerak?**
Private o'zgaruvchilar yaratish va ma'lumotlarni yashirish uchun.


**4. Tashqi funksiya tugasa o'zgaruvchilar o'chadimi?**
Yo'q, agar ichki funksiya ulardan foydalanayotgan bo'lsa xotirada qoladi.


**5. Memory Leak qanday yuz beradi?**
Keraksiz closurelar xotirani to'ldirib yuborsa.


**6. var vs let closureda farqi?**
var function-scoped, let block-scoped. Loop ichida farq katta.


**7. IIFE nima?**
Darhol ishga tushadigan funksiya ifodasi.


**8. Function factory nima?**
Boshqa funksiyalarni yasab beruvchi funksiya.


**9. Closure qachon yopiladi?**
Unga bo'lgan barcha reference-lar o'chirilganda.


**10. Encapsulation nima?**
Ma'lumotlarni yashirish va faqat metodlar orqali ulashish.


**11. Scope chain nima?**
O'zgaruvchini topguncha ichkaridan tashqariga qidirish zanjiri.


**12. Closure intervyuda nega muhim?**
JavaScript fundamental ish printsipini tushunishni ko'rsatgani uchun.
`,
  exercises: [
    {
      id: 1,
      title: "Private Counter",
      instruction: "createCounter funksiyasi 'count'ni saqlab qolsin va oshirsin.",
      startingCode: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c = createCounter();",
      hint: "Ichki funksiya 'count'ni eslab qoladi.",
      test: "if (c() === 1 && c() === 2) return null; return 'Xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nfunction make() {\n  let x = 0;\n  return () => x++;\n}\nconst f1 = make();\nconst f2 = make();\nconsole.log(f1(), f1(), f2());\n```",
      options: ["0 1 2", "0 1 0", "1 2 1", "0 0 0"],
      correctAnswer: 1,
      explanation: "Har bir `make()` chaqirilganda yangi mustaqil scope yaratiladi. f1 o'z x-ni 0 dan 1 ga oshiradi, f2 esa yangi 0 dan boshlaydi."
    },
    {
      id: 2,
      question: "Closure funksiya tashqi o'zgaruvchini qanday saqlaydi?",
      options: [
        "O'zgaruvchining nusxasini (value) oladi",
        "O'zgaruvchining o'ziga ishorani (reference) saqlaydi",
        "Faqat o'zgarmas o'zgaruvchilarni saqlaydi",
        "Xotiraga saqlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Closure o'zgaruvchining qiymatini nusxalamaydi, balki o'sha o'zgaruvchi joylashgan Lexical Environment-ga ishorani saqlaydi. Shuning uchun tashqi o'zgaruvchi o'zgarsa, closure-da ham yangi qiymat ko'rinadi."
    }
  ]
};
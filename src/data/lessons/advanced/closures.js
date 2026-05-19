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

<details>
<summary>1. Closure nima?</summary>
Funksiya o'zi yaratilgan muhitni (o'zgaruvchilarni) eslab qolishi.
</details>

<details>
<summary>2. Lexical Environment nima?</summary>
Funksiya yaratilgan joyidagi o'zgaruvchilar va ularga kirish doirasi.
</details>

<details>
<summary>3. Closure nima uchun kerak?</summary>
Private o'zgaruvchilar yaratish va ma'lumotlarni yashirish uchun.
</details>

<details>
<summary>4. Tashqi funksiya tugasa o'zgaruvchilar o'chadimi?</summary>
Yo'q, agar ichki funksiya ulardan foydalanayotgan bo'lsa xotirada qoladi.
</details>

<details>
<summary>5. Memory Leak qanday yuz beradi?</summary>
Keraksiz closurelar xotirani to'ldirib yuborsa.
</details>

<details>
<summary>6. var vs let closureda farqi?</summary>
var function-scoped, let block-scoped. Loop ichida farq katta.
</details>

<details>
<summary>7. IIFE nima?</summary>
Darhol ishga tushadigan funksiya ifodasi.
</details>

<details>
<summary>8. Function factory nima?</summary>
Boshqa funksiyalarni yasab beruvchi funksiya.
</details>

<details>
<summary>9. Closure qachon yopiladi?</summary>
Unga bo'lgan barcha reference-lar o'chirilganda.
</details>

<details>
<summary>10. Encapsulation nima?</summary>
Ma'lumotlarni yashirish va faqat metodlar orqali ulashish.
</details>

<details>
<summary>11. Scope chain nima?</summary>
O'zgaruvchini topguncha ichkaridan tashqariga qidirish zanjiri.
</details>

<details>
<summary>12. Closure intervyuda nega muhim?</summary>
JavaScript fundamental ish printsipini tushunishni ko'rsatgani uchun.
</details>`,
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
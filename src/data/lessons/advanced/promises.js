export const promises = {
  id: "promises",
  title: "Promises va Async/Await: Asinxron Dasturlash",
  level: "Murakkab",
  description: "Promise holatlari, Async/Await sintaksisi, Error handling, va Asinxronlik mexanizmi.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, serverdan ma'lumot olmoqchisiz. Bu vaqt talab qiladi. Agar biz bu kutish vaqtida interfeysni bloklasak, sayt "qotib qoladi". **Asinxronlik** buning yechimi.

**Callback Hell muammosi:** Kod chuvalarga tushib ketishi. **Promises** va **Async/Await** buni hal qiladi.

## 2. SODDALIK (Analogiya)

**Restorandagi buyurtma:**
1. Siz: "Menga kebab bering!" (Promise)
2. Ofitsiant: "Tayyor bo'lguncha mana bu raqamni oling" (Pending)
3. Oshxona: Ovqatni tayyorlaydi.
4. Ofitsiant: Ovqatni olib keladi (Resolved ✅) yoki "Kebab tugadi" deydi (Rejected ❌).

## 3. STRUKTURA

### A. Promise: 3 ta Holat
1. **Pending** - kutilayotgan.
2. **Fulfilled** - muvaffaqiyatli (resolved).
3. **Rejected** - rad etilgan (error).

### B. Promise Chaining
`.then()` orqali natijani olish, `.catch()` orqali xatoni ushlash.

### C. Static Metodlar
`Promise.all()`, `Promise.race()`, `Promise.allSettled()`.

## 4. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Promise nima?</summary>
Asinxron operatsiyaning kelajakdagi natijasini ifodalovchi obyekt.
</details>

<details>
<summary>2. Promise holatlari qaysilar?</summary>
Pending, Fulfilled, Rejected.
</details>

<details>
<summary>3. .then() nima uchun?</summary>
Muvaffaqiyatli natijani qayta ishlash uchun.
</details>

<details>
<summary>4. .catch() nima uchun?</summary>
Xatolarni ushlash uchun.
</details>

<details>
<summary>5. Promise.all() nima qiladi?</summary>
Barcha promislar tugashini kutadi. Bittasi fail bo'lsa, hammasi fail.
</details>

<details>
<summary>6. Promise.race() nima?</summary>
Birinchi tugagan promis natijasini qaytaradi.
</details>

<details>
<summary>7. Callback Hell nima?</summary>
Callback-lar ichma-ich ko'payib ketib, kod o'qish qiyinlashishi.
</details>

<details>
<summary>8. async funksiya nima qaytaradi?</summary>
Har doim Promise qaytaradi.
</details>

<details>
<summary>9. await nima qiladi?</summary>
Promise natijasini kutadi (faqat async ichida).
</details>

<details>
<summary>10. try...catch asinxron kodda qachon kerak?</summary>
async/await bilan xatolarni ushlash uchun.
</details>

<details>
<summary>11. finally() bloki qachon ishlaydi?</summary>
Har doim (xato bo'lsa ham, bo'lmasa ham).
</details>

<details>
<summary>12. Promise zanjiri nima?</summary>
Ketma-ket .then() orqali ma'lumotlarni uzatish.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Promise",
      instruction: "resolve('OK') qiladigan promise yarating.",
      startingCode: "const p = new Promise((resolve) => {\n  // Bu yerga yozing\n});",
      hint: "resolve('OK') chaqiring.",
      test: "p.then(r => { if (r === 'OK') return null; });"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Promise-ning dastlabki (initial) holati qaysi?",
      options: ["fulfilled", "rejected", "pending", "resolved"],
      correctAnswer: 2,
      explanation: "Yangi Promise yaratilganda u ishini yakunlaguncha 'pending' (kutilayotgan) holatida bo'ladi."
    },
    {
      id: 2,
      question: "`Promise.all()` massividagi promis-lardan biri rad etilsa (reject) nima bo'ladi?",
      options: [
        "Faqat muvaffaqiyatlilari qaytadi",
        "Butun `Promise.all` rad etiladi (reject bo'ladi)",
        "Xato qilgan promis o'tkazib yuboriladi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "`Promise.all` barcha promislar muvaffaqiyatli bo'lishini talab qiladi. Bitta xato butun zanjirni to'xtatadi."
    }
  ]
};
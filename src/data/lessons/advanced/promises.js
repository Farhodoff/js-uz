export const promises = {
  id: "a1",
  title: "Promise (Vaqtinchalik va'da)",
  theory: `## 1. PROMISE NIMA?
Promise — bu asinxron operatsiyaning kelajakdagi natijasi uchun ishlatiladigan obyektdir. Oddiy qilib aytganda, bu "va'da". Masalan, siz restoranda ovqat buyurtma qilsangiz, sizga kvitansiya berishadi. Bu kvitansiya — **Promise**. Ovqat tayyor bo'lgach (resolve) siz uni olasiz, agar masalliq tugab qolgan bo'lsa (reject) rad etishadi.

---

## 2. PROMISE HOLATLARI
Promise har doim 3 ta holatdan birida bo'ladi:

1.  **Pending (Kutilmoqda):** Boshlang'ich holat, hali natija yo'q.
2.  **Fulfilled (Bajarildi):** Operatsiya muvaffaqiyatli yakunlandi (\`resolve\` chaqirildi).
3.  **Rejected (Rad etildi):** Operatsiyada xato yuz berdi (\`reject\` chaqirildi).

\`\`\`mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Fulfilled: resolve() ✅
    Pending --> Rejected: reject() ❌
    Fulfilled --> [*]
    Rejected --> [*]
\`\`\`

---

## 3. PROMISE BILAN ISHLASH (.then, .catch)

Natijani olish uchun biz quyidagi metodlardan foydalanamiz:
- **.then():** Muvaffaqiyatli natijani olish uchun.
- **.catch():** Xatoni ushlash uchun.
- **.finally():** Nima bo'lishidan qat'iy nazar oxirida bajariladigan kod uchun.

\`\`\`javascript
const va'da = new Promise((resolve, reject) => {
  let hammasiJoyida = true;
  if (hammasiJoyida) {
    resolve("Muvaffaqiyat!");
  } else {
    reject("Xatolik yuz berdi");
  }
});

va'da
  .then(res => console.log(res))
  .catch(err => console.error(err));
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **Promise.all() nima vazifani bajaradi?**
   *Javob:* Bir nechta Promiselarni parallel ishga tushiradi va hammasi bajarilgandan keyin natijalarni massiv ko'rinishida qaytaradi.

2. **Callback Hell va Promisening farqi nimada?**
   *Javob:* Callbacklarda kod ichma-ich kirib ketadi (piramida). Promiselar esa zanjir (chaining) ko'rinishida yoziladi, bu kodni o'qishni osonlashtiradi.

3. **Promise.race() nima?**
   *Javob:* Bir nechta Promiselardan qaysi biri birinchi bo'lib yakunlansa (xoh resolve, xoh reject), o'shaning natijasini qaytaradi.`,
  exercises: [
    {
      id: 1,
      title: "Vaqtinchalik va'da",
      instruction: "2 soniyadan keyin 'Salom Asinxron' matnini resolve qiladigan Promise yarating va natijani .then orqali konsolga chiqaring.",
      startingCode: "// Promiseni shu yerda yarating\n",
      hint: "new Promise(res => setTimeout(() => res('Salom Asinxron'), 2000)).then(console.log);",
      test: "if (code.includes('new Promise') && code.includes('then')) return null; return 'Promise va .then ishlating';"
    },
    {
      id: 2,
      title: "Xatoni ushlash",
      instruction: "Darhol reject('Xato') qiladigan Promise yozing va xatoni .catch orqali konsolga chiqaring.",
      startingCode: "// Kodni yozing\n",
      hint: "new Promise((res, rej) => rej('Xato')).catch(console.log);",
      test: "if (code.includes('reject') || code.includes('rej')) return null; return 'reject ishlatilmadi';"
    }
  ]
};

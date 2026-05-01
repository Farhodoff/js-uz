export const errorHandling = {
  id: "a5",
  title: "Xatolar bilan ishlash (Error Handling)",
  theory: `## 1. KIRISH
Dasturlashda xatolar (bugs) muqarrar. Muhimi — xato sodir bo'lganda butun dastur to'xtab qolmasligini ta'minlash. Buning uchun JavaScriptda \`try...catch\` konstruktsiyasi ishlatiladi.

---

## 2. TRY...CATCH...FINALLY
- **try:** Xato sodir bo'lishi mumkin bo'lgan kod bloki.
- **catch:** Agar xato bo'lsa, ushbu blok ishga tushadi.
- **finally:** Xato bo'ladimi yoki yo'qmi, baribir oxirida ishlaydigan blok.

\`\`\`javascript
try {
  let natija = 10 / x; // x topilmasa xato beradi
} catch (err) {
  console.log("Xato ushlandi: " + err.message);
} finally {
  console.log("Amaliyot yakunlandi.");
}
\`\`\`

\`\`\`mermaid
graph TD
    A[Boshlash] --> B[try bloki]
    B --> C{Xato bormi?}
    C -- Ha --> D[catch bloki]
    C -- Yo'q --> E[finally bloki]
    D --> E
    E --> F[Tugash]
\`\`\`

---

## 3. THROW — XATONI ATAYLAB CHIQARISH
Biz o'zimiz xohlagan shart asosida xatolik yuzaga keltirishimiz mumkin:

\`\`\`javascript
function tekshir(yosh) {
  if (age < 18) {
    throw new Error("Siz juda yoshsiz!");
  }
}
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **finally bloki nima uchun kerak?**
   *Javob:* Odatda "tozalash" ishlari uchun. Masalan, faylni yopish yoki yuklash indikatorini (spinner) to'xtatish uchun.

2. **Error obyektining qanday asosiy xususiyatlari bor?**
   *Javob:* \`name\` (xato turi) va \`message\` (xato haqida xabar).

3. **Asinxron kodda try...catch qanday ishlaydi?**
   *Javob:* \`setTimeout\` ichidagi xatoni tashqaridagi \`try...catch\` ushlay olmaydi. Lekin \`async/await\` bilan ishlatilsa, hammasi joyida bo'ladi.`,
  exercises: [
    {
      id: 1,
      title: "Xatoni ushlash",
      instruction: "JSON.parse('not-json') xatosini try...catch orqali ushlang va 'Error' deb chiqaring.",
      startingCode: "try {\n  // Bu yerda JSON.parse ishlating\n} catch (e) {\n  // Chiqaring\n}",
      hint: "JSON.parse('...'); console.log('Error');",
      test: "if (logs.includes('Error')) return null; return 'Error deb chiqishi kerak';"
    },
    {
      id: 2,
      title: "Ataylab xato chiqarish",
      instruction: "Agar 'val' 0 dan kichik bo'lsa 'throw' yordamida Error tashlang.",
      startingCode: "const val = -1;\n// Bu yerga yozing\n",
      hint: "if (val < 0) throw new Error('Minus');",
      test: "if (output.includes('Minus')) return null; return 'Error tashlanishi kerak';"
    }
  ]
};

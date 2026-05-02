export const errorHandling = {
  id: "error-handling",
  title: "Error Handling (Xatolar bilan ishlash)",
  level: "Advanced",
  description: "Dasturingiz 'portlab' ketmasligi uchun xatolarni oldindan ushlash va boshqarish.",
  theory: `
# Error Handling – Bu nima va nima uchun kerak?

Dasturlashda xatolar (bugs) muqarrar. Muhimi — xato sodir bo'lganda butun dastur (sayt) to'xtab qolmasligini ta'minlash. Buning uchun JSda **try...catch** ishlatiladi.

## 1. NEGA kerak?
Tasavvur qiling, foydalanuvchi noto'g'ri JSON yubordi. Agar siz uni shunchaki \`JSON.parse()\` qilsangiz va u xato bersa, butun sayt ishlamay qoladi (oq ekran). Xatoni ushlasangiz, foydalanuvchiga chiroyli qilib "Ma'lumotda xato bor" deb xabar ko'rsata olasiz.

## 2. SODDALIK (Analogiya)
Buni **xavfsizlik kamari** deb tasavvur qiling. Siz mashina haydayapsiz (kod ishlayapti). Agar kutilmagan holat (xato) bo'lsa, xavfsizlik kamari (try...catch) sizni jarohatdan (dastur o'chib qolishidan) saqlab qoladi.

## 3. STRUKTURA

### A. try...catch...finally
- **try:** Xato bo'lishi mumkin bo'lgan kod.
- **catch:** Agar xato bo'lsa, ushbu blok ishlaydi.
- **finally:** Xato bo'lishi yoki bo'lmasligidan qat'iy nazar oxirida ishlaydi.
\`\`\`javascript
try {
  let natija = 10 / x; // x topilmasa xato
} catch (err) {
  console.log("Xato: " + err.message);
} finally {
  console.log("Har doim ishlayman");
}
\`\`\`

### B. throw (Xatoni ataylab chiqarish)
O'zingiz xohlagan shartda xato yaratishingiz mumkin:
\`\`\`javascript
function tekshir(yosh) {
  if (yosh < 0) {
    throw new Error("Yosh minus bo'lishi mumkin emas!");
  }
}
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
try {
  const data = JSON.parse("not a json");
} catch (e) {
  console.log("Xato ushlandi!");
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Asinxron xatolar:** \`try...catch\` oddiy \`setTimeout\` ichidagi xatoni ushlay olmaydi. Buning uchun \`async/await\` shart.
2. **Bo'sh catch:** Xatoni ushlab, uni hech narsa qilmaslik (jim qolish) yomon odat. Hech bo'lmasa \`console.error\` qiling.

## 6. SAVOLLAR (12 ta)
1. Error Handling nima?
2. \`try\` bloki nima uchun kerak?
3. \`catch\` bloki qachon ishga tushadi?
4. \`finally\` blokining vazifasi nima?
5. \`throw\` kalit so'zi nima qiladi?
6. \`Error\` obyektining qanday xususiyatlari bor (\`message\`, \`name\`)?
7. \`try...catch\` asinxron kodda (async/await) qanday ishlaydi?
8. Nima uchun barcha kodni \`try...catch\`ga o'rab tashlash tavsiya etilmaydi?
9. Sintaksis xatolarini (SyntaxError) \`try...catch\` ushlay oladimi?
10. \`ReferenceError\` va \`TypeError\` farqi nima?
11. O'zimizning shaxsiy xato turimizni (Custom Error) yaratsa bo'ladimi?
12. Xatolar haqida foydalanuvchiga qanday xabar berish to'g'ri?`,
  exercises: [
    {
      id: 1,
      title: "try-catch mashqi",
      instruction: "JSON.parse('salom') xatosini ushlang va konsolga 'Xato' deb chiqaring.",
      startingCode: "try {\n  // Bu yerda yozing\n} catch (e) {\n  // Bu yerda\n}",
      hint: "JSON.parse('...'); console.log('Xato');",
      test: "if (logs.includes('Xato')) return null; return 'Xato ushlanmadi';"
    }
  ]
};

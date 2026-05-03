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
1. JavaScript nima va u qachon yaratilgan?
2. \`typeof null\` natijasi nima va nega?
3. "Temporal Dead Zone" (TDZ) nima?
4. \`NaN\` nima va uni qanday tekshiramiz?
5. Hoisting nima?
6. Closures (Yopilishlar) nima?
7. "use strict" nima uchun ishlatiladi?
8. Bir vaqtda bir nechta shartni qanday tekshirish mumkin?
9. Massivdan oxirgi elementni qanday o'chiramiz?
10. \`map()\` va \`forEach()\` farqi nima?
11. Obyekt ichidagi funksiya (metod) qanday yoziladi?
12. JSda asinxronlik nima degani?`,
  exercises: [
    {
      id: 1,
      title: "Intervyu mashqi",
      instruction: "Berilgan sonning juft yoki toq ekanligini qaytaradigan funksiya yozing.",
      startingCode: "function isEven(num) {\n  // Bu yerga yozing\n}",
      hint: "return num % 2 === 0;",
      test: "if (isEven(4) === true && isEven(5) === false) return null; return 'Mantiq xato!';"
    }
  ]
};

export const consoleMethods = {
  id: "console-methods",
  title: "Console Metodlari (log, table, error, warn)",
  level: "Beginner",
  description: "Dasturni tekshirish (debugging) uchun faqat console.log kifoya qilmaydi. Boshqa foydali metodlarni o'rganamiz.",
  theory: `
# Console Metodlari – Bu nima va nima uchun kerak?

Dasturchi sifatida ish vaqtingizning 50% qismi kod yozish bilan o'tsa, qolgan 50% qismi xatolarni qidirish (debugging) bilan o'tadi. **Console** obyekti bizga kodimiz ichida nima bo'layotganini ko'rishga yordam beradi.

## 1. NEGA kerak?
Faqat \`console.log\` ishlatish ba'zan tartibsizlikka olib keladi. Agar sizda katta massiv yoki obekt bo'lsa, uni oddiy \`log\` bilan ko'rish qiyin.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, sizda asboblar qutisi bor.
*   \`console.log\`: Oddiy chiroq (fonar).
*   \`console.table\`: Lupa, jadval qilib ko'rsatadi.
*   \`console.error\`: Qizil signal, xavf!
*   \`console.warn\`: Sariq signal, ehtiyot bo'ling!

## 3. STRUKTURA

### A. console.table()
Obektlar yoki massivlarni jadval qilib chiqaradi:
\`\`\`javascript
const users = [{ ism: "Ali", yosh: 25 }];
console.table(users);
\`\`\`

### B. console.error() va console.warn()
\`\`\`javascript
console.error("Xato!");
console.warn("Ogohlantirish!");
\`\`\`

### C. console.time() va console.timeEnd()
Vaqtni o'lchash:
\`\`\`javascript
console.time("T1");
// ...kod
console.timeEnd("T1");
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const meva = { nomi: "Olma", narxi: 12000 };
console.table(meva);
\`\`\`

## 5. XATOLAR (Common mistakes)
1. \`Console.log\` (katta harf bilan) deb yozish.
2. Production kodda konsollarni qoldirish.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. console.table nima uchun kerak?**
Massivlar va obyektlarni brauzer konsolida oddiy ro'yxat ko'rinishida emas, balki chiroyli, ustun va qatorlardan iborat jadval (table) shaklida o'qish uchun ishlatiladi.


**2. console.error qanday rangda chiqadi?**
\`console.error()\` orqali chiqarilgan xabarlar konsolda qizil rangda, chap tomonida maxsus xato belgisi bilan birga ko'rinadi.


**3. Vaqtni o'lchash uchun qaysi metodlar ishlatiladi?**
Vaqtni o'lchashni boshlash uchun \`console.time("nom")\` va uni to'xtatib natijani millisekundlarda ko'rish uchun \`console.timeEnd("nom")\` metodlari ishlatiladi.


**4. console.clear() nima qiladi?**
Konsol ekranida to'planib qolgan barcha oldingi xabar va loglarni butunlay tozalab yuboradi.


**5. Bir nechta qiymatni bitta logda chiqarsa bo'ladimi?**
Ha, \`console.log()\` ichiga bir nechta qiymat yoki o'zgaruvchilarni vergul bilan ajratib yozish orqali barchasini bitta qatorda chiqarish mumkin.


**6. console.group() nima?**
Konsoldagi ketma-ket chiqadigan bir nechta xabarlarni guruhlab, ochiluvchi/yopiluvchi daraxtsimon ro'yxat ko'rinishida tartiblash uchun ishlatiladigan metoddir.


**7. console.warn qachon ishlatiladi?**
Dastur ishini to'xtatmaydigan, ammo kelgusida muammo keltirib chiqarishi mumkin bo'lgan holatlar haqida sariq rangli ogohlantirish (warning) chiqarish uchun ishlatiladi.


**8. console.log JS tilidami yoki brauzerda?**
\`console\` — JavaScript tilining o'zige tegishli emas, u brauzer yoki Node.js taqdim etadigan global Web API hisoblanadi.


**9. Konsolga CSS bersa bo'ladimi?**
Ha, \`console.log()\` ichidagi matn boshiga \`%c\` belgisini qo'yib, ikkinchi parametr sifatida CSS qoidalarini yozib konsoldagi yozuvlarni turli ranglar va stillarga bo'yash mumkin.


**10. console.count() nima vazifani bajaradi?**
Ushbu metod o'ziga berilgan yorliqning necha marta chaqirilganligini hisoblab, konsolga chiqarib boradi.


**11. Obektni konsolda qanday qulay ko'rish mumkin?**
Uni \`console.table(obj)\` orqali jadval qiling yoki \`console.dir(obj)\` orqali uning barcha xususiyatlarini daraxtsimon ko'rinishda batafsil ko'rish mumkin.


**12. Debugging nima?**
Dastur kodi tarkibidagi sintaktik, mantiqiy yoki tizimli xatoliklarni aniqlash, qidirish va ularni bartaraf etish jarayonidir.
`,
  exercises: [
    {
      id: 1,
      title: "Table mashqi",
      instruction: "['BMW', 'Audi'] massivini jadval ko'rinishida chiqaring.",
      startingCode: "const cars = ['BMW', 'Audi'];\n// Kodni yozing",
      hint: "console.table(cars);",
      test: "if (code.includes('console.table')) return null; return 'console.table ishlatilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log()` metodidan tashqari, obyektlar va massivlarni vizual ravishda tushunarli qilish uchun jadval (table) ko'rinishida chop etadigan metod qaysi?",
      options: [
        "`console.list()`",
        "`console.table()`",
        "`console.grid()`",
        "`console.dir()`"
      ],
      correctAnswer: 1,
      explanation: "`console.table()` uzatilgan massiv yoki obyekt ma'lumotlarini brauzer konsolida chiroyli jadval ko'rinishida taqdim etadi."
    },
    {
      id: 2,
      question: "Dasturdagi jiddiy xatoliklarni bildirish va konsolda matnni qizil rangli fon bilan ko'rsatish uchun qaysi metod ishlatiladi?",
      options: [
        "`console.warn()`",
        "`console.error()`",
        "`console.alert()`",
        "`console.critical()`"
      ],
      correctAnswer: 1,
      explanation: "`console.error()` xato xabarlarini konsolga qizil rangda va xatolik yuz bergan joyning stack trace ma'lumotlari bilan birga chiqaradi."
    },
    {
      id: 3,
      question: "Konsoldagi barcha ma'lumotlarni tozalash (clear) va konsolni bo'shatish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`console.clean()`",
        "`console.clear()`",
        "`console.empty()`",
        "`console.reset()`"
      ],
      correctAnswer: 1,
      explanation: "`console.clear()` konsol oynasidagi barcha yozuvlarni tozalab yuboradi va konsol tozalanganligi haqida xabar qoldiradi."
    },
    {
      id: 4,
      question: "Kodning ma'lum bir qismi qancha vaqt ichida bajarilishini hisoblashni boshlash va uni yakunlash uchun mos ravishda qaysi metodlar juftligidan foydalanamiz?",
      options: [
        "`console.start()` va `console.stop()`",
        "`console.time()` va `console.timeEnd()`",
        "`console.profile()` va `console.profileEnd()`",
        "`console.timer()` va `console.timerEnd()`"
      ],
      correctAnswer: 1,
      explanation: "`console.time('nom')` berilgan nom bilan taymerni ishga tushiradi, `console.timeEnd('nom')` esa o'sha nomli taymerni to'xtatib, o'tgan vaqtni chop etadi."
    },
    {
      id: 5,
      question: "Biror kod yoki funksiya necha marta chaqirilganligini sanab borish (counter) uchun qaysi metod qo'llaniladi?",
      options: [
        "`console.add()`",
        "`console.count()`",
        "`console.sum()`",
        "`console.number()`"
      ],
      correctAnswer: 1,
      explanation: "`console.count('belgi')` metodi o'ziga uzatilgan kalit so'z necha marta chaqirilganligini konsolda hisoblab boradi."
    }
  ]
};

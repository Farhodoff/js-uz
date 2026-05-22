export const consoleMethods = {
  id: "console-methods",
  title: "Console Metodlari (log, table, error, warn)",
  level: "Beginner",
  description: "Dasturni tekshirish (debugging) uchun faqat console.log kifoya qilmaydi. Boshqa foydali metodlarni o'rganamiz.",
  theory: `## 1. NEGA kerak?
Dasturchi sifatida ish vaqtingizning yarmi kod yozish, qolgan yarmi esa xatolarni qidirish (debugging) bilan o'tadi. \`console\` obyekti bizga kodimiz ichida nima bo'layotganini ko'rishga yordam beradi. Faqat \`console.log\` ishlatish ba'zan tartibsizlikka olib keladi. Katta massiv yoki obyektlarni tartibli ko'rish uchun maxsus metodlar mavjud.

## 2. SODDALIK (Analogiya)
Buni asboblar qutisiga o'xshatish mumkin:
- \`console.log\`: Oddiy fonar (chiroq).
- \`console.table\`: Jadval qiluvchi lupa (tartibga soladi).
- \`console.error\`: Qizil signal (xavf!).
- \`console.warn\`: Sariq ogohlantirish (ehtiyot bo'ling!).

## 3. STRUKTURA

### A. console.table()
Obyektlar yoki massivlarni jadval ko'rinishida chiqarish:
\`\`\`javascript
const mevalar = ["Olma", "Anor", "Behi"];
console.table(mevalar);
\`\`\`

### B. console.error() va console.warn()
Sariq va qizil rangli ogohlantirish va xatoliklar:
\`\`\`javascript
console.error("Ulanishda xatolik!");
console.warn("API kaliti eskirmoqda...");
\`\`\`

### C. console.time() va console.timeEnd()
Kodning ishlash vaqtini hisoblash:
\`\`\`javascript
console.time("LoopTime");
for(let i=0; i<100000; i++) {}
console.timeEnd("LoopTime");
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Katta-kichik harflar:** \`Console.log\` (katta harf bilan) xatoga olib keladi. JSda registr katta rol o'ynaydi: har doim kichik harflarda \`console\` yozilishi shart.
2. **Production-da qoldirish:** Konsol xabarlari brauzerda foydalanuvchiga ko'rinadi va xavfsizlikka ta'sir qilishi mumkin. Loyihani jonli serverga yuklashdan oldin keraksiz konsollarni o'chirib tashlash kerak.

## 6. SAVOLLAR VA JAVOBLAR
**1. console.table nima uchun ishlatiladi?**
Massivlar va obyektlarni brauzer konsolida jadval ko'rinishida oson o'qish uchun.

**2. console.error xabari qanday rangda chiqadi?**
Konsolda qizil rangda va yonida xavf belgisi bilan ko'rinadi.

**3. Kod bajarilish vaqtini qaysi metodlar bilan hisoblash mumkin?**
\`console.time()\` boshlash uchun, \`console.timeEnd()\` esa tugatish va natijani millisekundlarda chiqarish uchun.

**4. console.clear() nima qiladi?**
Konsolda to'planib qolgan barcha oldingi yozuvlarni tozalab yuboradi.

**5. Bir nechta qiymatni bitta logda chiqarsa bo'ladimi?**
Ha, qiymatlarni vergul bilan ajratib yozish orqali bitta qatorda chiqarish mumkin.

**6. console.group() nima uchun kerak?**
Konsoldagi ketma-ket yozuvlarni guruhlab, daraxtsimon ochiluvchi/yopiluvchi ro'yxat ko'rinishiga keltirish uchun.

**7. console.warn qachon ishlatiladi?**
Kod ishlashda davom etsa ham, kelajakda muammo bo'lishi mumkin bo'lgan holatlarni ogohlantirish (sariq rangda) uchun.

**8. console JavaScript tilining o'zinikimi?**
Yo'q, u brauzer yoki Node.js taqdim etadigan tashqi Web API hisoblanadi.

**9. Konsoldagi matnni rangli qilish mumkinmi?**
Ha, matn boshiga \`%c\` belgisini qo'yib, ikkinchi parametr sifatida CSS stillarini yozib bezash mumkin.

**10. console.count() nima qiladi?**
Berilgan yorliq necha marta chaqirilganligini hisoblab chop etadi.

**11. console.dir() qanday vazifani bajaradi?**
Obyektning barcha xususiyatlarini daraxtsimon ko'rinishda batafsil chiqaradi.

**12. console.assert() nima?**
Berilgan shart \`false\` bo'lgandagina konsolga xatolik xabarini chiqaradi.
`,
  exercises: [
    {
      id: 1,
      title: "Table mashqi",
      instruction: "['BMW', 'Audi'] massivini jadval ko'rinishida chiqaring.",
      startingCode: "const cars = ['BMW', 'Audi'];\n// Kodni yozing",
      hint: "console.table(cars);",
      test: "if (code.includes('console.table')) return null; return 'console.table ishlatilmadi';"
    },
    {
      id: 2,
      title: "Xatolikni chiqarish",
      instruction: "Konsolga 'Tizimda xatolik yuz berdi!' degan qizil xatolik logini chiqaring.",
      startingCode: "// Kodni yozing\n",
      hint: "console.error('Tizimda xatolik yuz berdi!');",
      test: "if (code.includes('console.error')) return null; return 'console.error ishlatilmadi';"
    },
    {
      id: 3,
      title: "Ogohlantirish logi",
      instruction: "Konsolga 'Ehtiyot bo\\'ling!' ogohlantirish xabarini chiqaring.",
      startingCode: "// Kodni yozing\n",
      hint: "console.warn('Ehtiyot bo\\'ling!');",
      test: "if (code.includes('console.warn')) return null; return 'console.warn ishlatilmadi';"
    },
    {
      id: 4,
      title: "Vaqtni o'lchash",
      instruction: "'TestTime' nomli taymerni boshlang va kod oxirida tugating.",
      startingCode: "// Taymerni boshlang\n\n// Taymerni tugating\n",
      hint: "console.time('TestTime');\nconsole.timeEnd('TestTime');",
      test: "if (code.includes('console.time') && code.includes('console.timeEnd')) return null; return 'console.time va console.timeEnd ishlatilishi kerak';"
    },
    {
      id: 5,
      title: "Sanagich",
      instruction: "Konsolga 'Click' nomli sanagichni 3 marta chaqiring.",
      startingCode: "// Kodni yozing\n",
      hint: "console.count('Click'); console.count('Click'); console.count('Click');",
      test: "if (code.includes('console.count')) return null; return 'console.count ishlatilmadi';"
    },
    {
      id: 6,
      title: "Konsolni tozalash",
      instruction: "Konsol ekranidagi barcha ma'lumotlarni tozalab yuboring.",
      startingCode: "// Kodni yozing\n",
      hint: "console.clear();",
      test: "if (code.includes('console.clear')) return null; return 'console.clear ishlatilmadi';"
    },
    {
      id: 7,
      title: "Guruhlash",
      instruction: "'Ma\\'lumot' nomli guruh oching va uni yoping.",
      startingCode: "// Guruhni oching\n\n// Guruhni yoping",
      hint: "console.group('Ma\\'lumot');\nconsole.groupEnd();",
      test: "if (code.includes('console.group') && code.includes('console.groupEnd')) return null; return 'console.group va console.groupEnd ishlatilmadi';"
    },
    {
      id: 8,
      title: "Tekshiruv (Assert)",
      instruction: "x = 5 bo'lganda, x > 10 sharti false bo'lishi sababli xatolik chiqaruvchi console.assert yozing.",
      startingCode: "const x = 5;\n// Kodni yozing",
      hint: "console.assert(x > 10, 'x 10 dan katta bo\\'lishi kerak');",
      test: "if (code.includes('console.assert')) return null; return 'console.assert ishlatilmadi';"
    },
    {
      id: 9,
      title: "Obyektni batafsil chiqarish",
      instruction: "user obyektini console.dir orqali ko'ring.",
      startingCode: "const user = { name: 'Ali', age: 20 };\n// Kodni yozing",
      hint: "console.dir(user);",
      test: "if (code.includes('console.dir')) return null; return 'console.dir ishlatilmadi';"
    },
    {
      id: 10,
      title: "Trace chiqarish",
      instruction: "Kod bajarilish stack trace-ini konsolga chiqarish metodini yozing.",
      startingCode: "// Kodni yozing\n",
      hint: "console.trace();",
      test: "if (code.includes('console.trace')) return null; return 'console.trace ishlatilmadi';"
    },
    {
      id: 11,
      title: "Rangli konsol",
      instruction: "Konsolga '%cSalom' matnini 'color: red' stili bilan chiqaring.",
      startingCode: "// Kodni yozing\n",
      hint: "console.log('%cSalom', 'color: red');",
      test: "if (code.includes('%c') && code.includes('color:')) return null; return 'Stillangan log yozing!';"
    },
    {
      id: 12,
      title: "Yopiq guruh",
      instruction: "'Tafsilotlar' nomli yopiq guruh ochib uni yoping.",
      startingCode: "// Kodni yozing\n",
      hint: "console.groupCollapsed('Tafsilotlar'); console.groupEnd();",
      test: "if (code.includes('console.groupCollapsed') && code.includes('console.groupEnd')) return null; return 'console.groupCollapsed ishlatilmadi';"
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
      explanation: "`console.clear()` konsol oynasidagi barcha yozuvlarni tozalab yuboradi."
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
    },
    {
      id: 6,
      question: "Quyidagi console metodlaridan qaysi biri faqat shart `false` bo'lganda konsolga xato xabari yozadi?",
      options: [
        "`console.error()`",
        "`console.warn()`",
        "`console.assert()`",
        "`console.trace()`"
      ],
      correctAnswer: 2,
      explanation: "`console.assert(condition, message)` faqatgina birinchi parametr (`condition`) false qiymat qaytargandagina ikkinchi parametrdagi xabarni xato sifatida konsolga chiqaradi."
    },
    {
      id: 7,
      question: "console metodlariga CSS stillarini qo'llashda qaysi maxsus belgidan foydalaniladi?",
      options: [
        "`%s`",
        "`%d`",
        "`%c`",
        "`%o`"
      ],
      correctAnswer: 2,
      explanation: "`%c` belgisi konsoldagi matnga CSS qoidalarini qo'llash imkoniyatini beradi, masalan: `console.log('%cText', 'color: red')`."
    },
    {
      id: 8,
      question: "console.groupCollapsed() va console.group() metodlarining farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "`groupCollapsed` guruhni dastlab yopiq (yig'ilgan) holda ko'rsatadi, `group` esa ochiq holda ko'rsatadi",
        "`groupCollapsed` matnni kichikroq shriftda chiqaradi",
        "`groupCollapsed` faqat xatolarni guruhlaydi"
      ],
      correctAnswer: 1,
      explanation: "`console.groupCollapsed()` konsoldagi xabarlar guruhini default holatda yopiq qilib chiqaradi, foydalanuvchi xabarlarni ko'rish uchun guruhni qo'lda ochishi kerak bo'ladi."
    },
    {
      id: 9,
      question: "Dasturning qaysi joyida yoki qaysi funksiyalar orqali ushbu nuqtaga yetib kelganligini (stack trace) ko'rish uchun qaysi metod ishlatiladi?",
      options: [
        "`console.dir()`",
        "`console.trace()`",
        "`console.log()`",
        "`console.debug()`"
      ],
      correctAnswer: 1,
      explanation: "`console.trace()` metodi joriy funksiya chaqirilguncha bosib o'tilgan barcha funksiyalar ketma-ketligini (execution stack trace) chop etadi."
    },
    {
      id: 10,
      question: "console.count() bilan hisoblangan qiymatni qaytadan 0 ga tushirish (reset qilish) uchun qaysi metoddan foydalaniladi?",
      options: [
        "`console.countReset()`",
        "`console.clear()`",
        "`console.reset()`",
        "`console.countZero()`"
      ],
      correctAnswer: 0,
      explanation: "`console.countReset('yorliq')` berilgan yorliqdagi sanagichni qaytadan nollaydi."
    },
    {
      id: 11,
      question: "Obyektni DOM elementlari bilan birga JSON ko'rinishida yoki JavaScript obyekti xususiyatlari daraxti shaklida konsolga chiqarishda nima afzalroq?",
      options: [
        "`console.log()`",
        "`console.dir()`",
        "`console.write()`",
        "`console.info()`"
      ],
      correctAnswer: 1,
      explanation: "`console.dir()` metodi obyektning barcha xususiyatlarini daraxtsimon ko'rinishda interaktiv tekshirish uchun juda qulaydir."
    },
    {
      id: 12,
      question: "Ishlab chiqarish (Production) muhitida nima uchun konsol xabarlarini saqlamaslik tavsiya etiladi?",
      options: [
        "Tezlikni pasaytirishi va maxfiy ma'lumotlar foydalanuvchiga oshkor bo'lib qolish xavfi tufayli",
        "Brauzerlarni muzlatib qo'yishi sababli",
        "Hech qanday zararli tomoni yo'q",
        "JS xotirasini butunlay tugatishi mumkinligi uchun"
      ],
      correctAnswer: 0,
      explanation: "Konsolga yozilgan ma'lumotlar foydalanuvchining brauzerida osongina ko'rinadi. Bu maxfiy tokenlar yoki logikaning tashqariga chiqib ketishiga sabab bo'lishi mumkin."
    }
  ]
};

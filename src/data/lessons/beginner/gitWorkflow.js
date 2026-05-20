export const gitWorkflow = {
  id: "git-workflow",
  title: "Git va Farhodoff Ish Tartibi",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, siz katta bir imorat quryapsiz. Agar har bir g'ishtni qayerga qo'yganingizni va nima uchun qo'yganingizni yozib bormasangiz, bino bitganda birorta xato chiqsa, uni topish juda qiyin bo'ladi. **Git** - bu bizning kodimizdagi har bir "g'isht" (o'zgarish) ni tarixini saqlab boruvchi tizim. **Farhodoff tartibi** esa bu ishlarni tartibli va professional darajada bajarish uchun o'rnatilgan qoidalardir.

## 2. SODDALIK (Analogiya)
Buni **pazandachilikka** o'xshatish mumkin:
- **Git:** Bu sizning retseptlar kitobingiz. Har safar yangi ziravor qo'shganingizda, uni kitobga yozib qo'yasiz.
- **Commit:** Bu "Saqlash" tugmasi. Taomning ma'lum bir bosqichini (masalan, go'sht qovurib bo'lingan holatini) xotiraga muhrlash.
- **Push:** Bu tayyor bo'lgan retseptni boshqa oshpazlar ham ko'rishi uchun umumiy doskaga ilib qo'yish.

## 3. STRUKTURA (Asosiy qoidalar)

### A. Git Sozlamalari
Loyihani boshlashdan oldin kim ishlayotganini aniqlash kerak:
\`\`\`bash
git config user.name "Farhodoff"
git config user.email "fsoyilovv@gmail.com"
\`\`\`

### B. Ish Tartibi
1. **Har bir yangilanishdan so'ng** darhol \`commit\` va \`push\` qilinishi shart.
2. **Til:** Barcha izohlar va yozuvlar faqat o'zbek tilida bo'lishi kerak.
3. **Uslub:** Do'stona va aniq.

### C. Pedagogik Qoidalar (O'qitish sirlari)
- **20/80 Qoidasi:** Nazariya kam (20-30%), amaliyot ko'p (70-80%) bo'lishi kerak.
- **NEGA-SODDALIK-STRUKTURA:** Har doim shu tartibda tushuntiring.
- **Xatolar:** Talabalarga "qayerda yiqilishi" mumkinligini oldindan ayting.

## 4. AMALIYOT (Mashq pastda)

## 5. XATOLAR (Common mistakes)
1. **Katta commitlar:** 10 ta faylni o'zgartirib, bitta commit qilish xato. Har bir kichik mantiqiy o'zgarish uchun alohida commit qiling.
2. **Noma'lum xabarlar:** \`git commit -m "update"\` deb yozish yomon odat. Buning o'rniga \`git commit -m "O'zgaruvchilar darsiga mashq qo'shildi"\` deb aniq yozing.
3. **Inglizcha izohlar:** Farhodoff tartibida bu taqiqlangan! Faqat o'zbek tili.

## 6. SAVOLLAR VA JAVOBLAR
**1. Farhodoff tartibida qaysi tilda yozish shart?**
Faqat o'zbek tilida.


**2. Qachon commit va push qilish kerak?**
Har bir yangilanish (update) kiritilgandan so'ng darhol.


**3. Pedagogik tartibning birinchi bosqichi nima?**
"NEGA" - ya'ni mavzuning nima uchun kerakligini tushuntirish.


**4. Amaliyot necha foiz bo'lishi kerak?**
70-80% atrofida.


**5. Git configda user.name nima deb sozlanishi kerak?**
"Farhodoff".


**6. Har bir dars oxirida nechta savol bo'lishi shart?**
12 ta savol.


**7. Analogiya nima uchun kerak?**
Murakkab tushunchalarni hayotiy misollar orqali soddalashtirish uchun.


**8. "Buzib ko'rish" bo'limi nima uchun kerak?**
Kutilmagan xatolar va edge caselarni o'rganish uchun.


**9. Git nima?**
Versiyalarni boshqarish tizimi (VCS).


**10. Push buyrug'i nima vazifani bajaradi?**
Mahalliy o'zgarishlarni masofaviy serverga (masalan, GitHub) yuboradi.


**11. Nima uchun bir vaqtda ko'p o'zgarishni commit qilish xato?**
Chunki xato chiqsa, qaysi o'zgarish sabab bo'lganini topish qiyinlashadi.


**12. Farhodoffning elektron pochtasi qanday?**
fsoyilovv@gmail.com
`,
  exercises: [
    {
      id: 1,
      title: "Git Config Test",
      instruction: "Git foydalanuvchi nomini 'Farhodoff' qilib sozlash buyrug'ini yozing.",
      startingCode: "// Buyruqni shu yerga yozing\n",
      hint: "git config user.name \"Farhodoff\"",
      test: "if (code.includes('git config user.name') && code.includes('Farhodoff')) return null; return 'Buyruqni to\\'g\\'ri yozing: git config user.name \"Farhodoff\"';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Farhodoff ish tartibiga ko'ra, har bir yangilanish (update) amalga oshirilgandan so'ng qanday chora ko'rilishi shart?",
      options: [
        "Faqat haftalik hisobot yuborish kerak",
        "Darhol o'zgarishlarni commit va push qilish lozim",
        "Kodni local kompyuterda saqlab, haftaning oxirida push qilish kerak",
        "Hech qanday chora ko'rish talab etilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Loyiha qoidalariga binoan (GEMINI.md), har bir yangilanishdan so'ng darhol commit va push qilinishi belgilangan."
    },
    {
      id: 2,
      question: "Farhodoff loyiha qoidalariga muvofiq, Git commits xabarlari va kod izohlari qaysi tilda bo'lishi shart?",
      options: [
        "Ingliz tilida",
        "O'zbek tilida",
        "Rus tilida",
        "Dasturchining ixtiyoriy tanlagan tilida"
      ],
      correctAnswer: 1,
      explanation: "Loyiha qoidalariga binoan, barcha izohlar va Git yozuvlari o'zbek tilida bo'lishi shart."
    },
    {
      id: 3,
      question: "Pedagogik ish tartibiga muvofiq, nazariya va amaliyot foiz hisobidagi nisbati qanday bo'lishi belgilangan?",
      options: [
        "Nazariya 80%, Amaliyot 20%",
        "Nazariya 20-30%, Amaliyot 70-80%",
        "Nazariya 50%, Amaliyot 50%",
        "Faqat amaliyot (100%)"
      ],
      correctAnswer: 1,
      explanation: "Pedagogik qoidalarga ko'ra, darslar nazariyaga emas, balki ko'proq amaliyotga yo'naltirilgan bo'lishi kerak: nazariya 20-30%, amaliyot esa 70-80%."
    },
    {
      id: 4,
      question: "Git-da loyihaga o'zgarishlar kiritgandan keyin ularni masofaviy (remote) serverga yuborish uchun qaysi buyruq ishlatiladi?",
      options: [
        "`git commit`",
        "`git push`",
        "`git pull`",
        "`git init`"
      ],
      correctAnswer: 1,
      explanation: "`git push` buyrug'i mahalliy kompyuterdagi (local) o'zgarishlarni GitHub kabi masofaviy repository'ga yuboradi."
    },
    {
      id: 5,
      question: "Nima uchun o'zgarishlarni bitta katta commit qilish o'rniga kichik-kichik mantiqiy commitlarga bo'lish tavsiya etiladi?",
      options: [
        "Chunki katta commitlar taqiqlangan va Git ularni qabul qilmaydi",
        "Xatoliklarni (bug) osonroq aniqlash va versiyalar tarixini toza va tushunarli saqlash uchun",
        "Kichik commitlar tezroq yuklanadi",
        "Bu dasturchining tezligini oshiradi"
      ],
      correctAnswer: 1,
      explanation: "Kichik commitlar loyiha tarixida harakatlanishni (rollback) va qaysi o'zgarish xatoga sabab bo'lganini aniqlashni sezilarli darajada osonlashtiradi."
    }
  ]
};

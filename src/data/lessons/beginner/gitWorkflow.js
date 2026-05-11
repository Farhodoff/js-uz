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
<details>
<summary>1. Farhodoff tartibida qaysi tilda yozish shart?</summary>
Faqat o'zbek tilida.
</details>

<details>
<summary>2. Qachon commit va push qilish kerak?</summary>
Har bir yangilanish (update) kiritilgandan so'ng darhol.
</details>

<details>
<summary>3. Pedagogik tartibning birinchi bosqichi nima?</summary>
"NEGA" - ya'ni mavzuning nima uchun kerakligini tushuntirish.
</details>

<details>
<summary>4. Amaliyot necha foiz bo'lishi kerak?</summary>
70-80% atrofida.
</details>

<details>
<summary>5. Git configda user.name nima deb sozlanishi kerak?</summary>
"Farhodoff".
</details>

<details>
<summary>6. Har bir dars oxirida nechta savol bo'lishi shart?</summary>
12 ta savol.
</details>

<details>
<summary>7. Analogiya nima uchun kerak?</summary>
Murakkab tushunchalarni hayotiy misollar orqali soddalashtirish uchun.
</details>

<details>
<summary>8. "Buzib ko'rish" bo'limi nima uchun kerak?</summary>
Kutilmagan xatolar va edge caselarni o'rganish uchun.
</details>

<details>
<summary>9. Git nima?</summary>
Versiyalarni boshqarish tizimi (VCS).
</details>

<details>
<summary>10. Push buyrug'i nima vazifani bajaradi?</summary>
Mahalliy o'zgarishlarni masofaviy serverga (masalan, GitHub) yuboradi.
</details>

<details>
<summary>11. Nima uchun bir vaqtda ko'p o'zgarishni commit qilish xato?</summary>
Chunki xato chiqsa, qaysi o'zgarish sabab bo'lganini topish qiyinlashadi.
</details>

<details>
<summary>12. Farhodoffning elektron pochtasi qanday?</summary>
fsoyilovv@gmail.com
</details>`,
  exercises: [
    {
      id: 1,
      title: "Git Config Test",
      instruction: "Git foydalanuvchi nomini 'Farhodoff' qilib sozlash buyrug'ini yozing.",
      startingCode: "// Buyruqni shu yerga yozing\n",
      hint: "git config user.name \"Farhodoff\"",
      test: "if (code.includes('git config user.name') && code.includes('Farhodoff')) return null; return 'Buyruqni to\\'g\\'ri yozing: git config user.name \"Farhodoff\"';"
    }
  ]
};

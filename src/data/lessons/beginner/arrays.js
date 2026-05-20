export const arrays = {
  id: "arrays",
  title: "Massivlar (Arrays): Ma'lumotlar ro'yxati",
  level: "Boshlang'ich",
  description: "Ma'lumotlar poezdi: bir nechta qiymatni bitta ro'yxatda saqlash.",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizda 10 ta meva bor. Har biri uchun alohida o'zgaruvchi ochish (\`meva1\`, \`meva2\`...) juda noqulay. Massiv esa barcha mevalarni bitta "savat" (ro'yxat) ichiga yig'adi va ular bilan ishlashni osonlashtiradi.

## 2. SODDALIK (Analogiya)
Massivni **poezd vagonlari** deb tasavvur qiling. Har bir vagonning o'z o'rni (indeksi) bor. Eng muhimi: **JavaScriptda sanoq 0 dan boshlanadi!** Ya'ni birinchi vagon — 0-vagon.

## 3. STRUKTURA

### A. Massiv yaratish va o'qish
\`\`\`javascript
const mevalar = ["Olma", "Banan", "Gilos"];
console.log(mevalar[0]); // "Olma" (birinchi element)
console.log(mevalar.length); // 3 (jami elementlar soni)
\`\`\`

### B. O'zgartirish va Metodlar
Massiv ichidagi ma'lumotlarni o'zgartirishimiz mumkin:
- **push() / pop():** Oxiriga qo'shish / Oxiridan o'chirish.
- **unshift() / shift():** Boshiga qo'shish / Boshidan o'chirish.
- **splice():** Istalgan joydan element qo'shish yoki o'chirish.

\`\`\`javascript
mevalar.push("Anor"); // Oxiriga qo'shildi
mevalar[1] = "Kivi";  // "Banan" o'rniga "Kivi" keldi
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Indeksni adashtirish:** Oxirgi element indeksi doim \`length - 1\` bo'ladi.
2. **Const bilan ishlash:** \`const\` bilan yaratilgan massiv ichidagi elementlarni o'zgartirish mumkin, lekin massivni yangi massivga qayta biriktirib (\`mevalar = [...]\`) bo'lmaydi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Massiv nima?**
Bitta o'zgaruvchi nomi ostida bir nechta qiymatlarni saqlash imkonini beruvchi ma'lumotlar tuzilmasi.


**2. Massiv yaratishda qaysi qavslar ishlatiladi?**
Kvadrat qavslar \`[ ]\`.


**3. Massivda sanoq nechadan boshlanadi?**
0 dan boshlanadi.


**4. Massiv uzunligini qanday bilish mumkin?**
\`.length\` xususiyati orqali.


**5. push va unshift farqi nima?**
\`push\` oxiriga qo'shadi, \`unshift\` boshiga qo'shadi.


**6. pop va shift farqi nima?**
\`pop\` oxiridan o'chiradi, \`shift\` boshidan o'chiradi.


**7. Massivning 3-elementini qanday o'qiymiz?**
\`arr[2]\` orqali (chunki 0, 1, 2...).


**8. Massiv ichida har xil turdagi ma'lumotlar bo'lishi mumkinmi?**
Ha, JS massivlarida bir vaqtda son, matn va obyektlarni saqlash mumkin.


**9. includes() metodi nima qaytaradi?**
Agar element massivda bo'lsa \`true\`, bo'lmasa \`false\`.


**10. indexOf() metodi nima qaytaradi?**
Elementning indeksini. Topilmasa \`-1\` qaytaradi.


**11. join() metodi nima qiladi?**
Massiv elementlarini bitta matnga birlashtiradi.


**12. reverse() metodi asl massivni o'zgartiradimi?**
Ha, u massiv elementlari tartibini teskari qilib qo'yadi.
`,
  exercises: [
    {
      id: 1,
      title: "Massiv yaratish",
      instruction: "3 ta hayvon nomidan iborat 'animals' massivini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const animals = ['Ayiq', 'Bo\\'ri', 'Tulki'];",
      test: "if (Array.isArray(code.includes('animals') ? [] : null)) return null; return 'animals nomli massiv yarating';"
    },
    {
      id: 2,
      title: "Element qo'shish",
      instruction: "Berilgan 'colors' massiviga 'Sariq' rangini oxiridan qo'shing.",
      startingCode: "const colors = ['Qizil', 'Ko\\'k'];\n// Bu yerga yozing\n",
      hint: "colors.push('Sariq');",
      test: "if (colors.includes('Sariq')) return null; return 'push ishlatib qo\\'shing';"
    },
    {
      id: 3,
      title: "Uzunlikni topish",
      instruction: "Massiv uzunligini 'len' o'zgaruvchisiga saqlang.",
      startingCode: "const items = [1, 2, 3, 4, 5];\n// Bu yerga yozing\n",
      hint: "const len = items.length;",
      test: "if (code.includes('.length')) return null; return 'length xususiyatidan foydalaning';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da massiv (array) elementlari indekslanishi qaysi sondan boshlanadi va oxirgi elementning indeksi qanday topiladi?",
      options: [
        "1 dan boshlanadi; oxirgi element indeksi `length` ga teng",
        "0 dan boshlanadi; oxirgi element indeksi `length - 1` ga teng (chunki birinchi element 0-indeksda turadi)",
        "0 dan boshlanadi; oxirgi element indeksi `length` ga teng",
        "1 dan boshlanadi; oxirgi element indeksi `length - 1` ga teng"
      ],
      correctAnswer: 1,
      explanation: "Sanoq noldan (0) boshlangani sababli, `N` ta elementdan iborat massivning oxirgi elementi `N - 1`-indeksda joylashgan bo'ladi. Masalan, 3 ta elementli massivda oxirgi element indeksi 2 bo'ladi."
    },
    {
      id: 2,
      question: "Quyidagi metodlardan qaysi biri massivning boshiga (birinchi o'ringa) yangi element qo'shadi?",
      options: [
        "`push()`",
        "`unshift()` (boshiga qo'shish uchun, `push` esa oxiriga qo'shish uchun ishlatiladi)",
        "`pop()`",
        "`shift()`"
      ],
      correctAnswer: 1,
      explanation: "`unshift()` metodi massiv boshiga elementlar qo'shadi va yangi uzunlikni qaytaradi. `push()` esa oxiriga qo'shadi. `shift()` va `pop()` o'chirish uchun."
    },
    {
      id: 3,
      question: "Massivdan muayyan qiymatga ega elementning indeksini topmoqchisiz. Agar u element massivda mavjud bo'lmasa, `indexOf()` metodi qanday qiymat qaytaradi?",
      options: [
        "`null`",
        "`undefined`",
        "`-1` (har doim izlanayotgan qiymat massivda topilmaganda -1 qaytadi)",
        "`false`"
      ],
      correctAnswer: 2,
      explanation: "`indexOf()` metodi qidirilayotgan element massiv ichida yo'q bo'lsa, har doim `-1` sonini qaytaradi."
    },
    {
      id: 4,
      question: "`const` kalit so'zi yozilgan massiv bilan ishlash bo'yicha qaysi qoida to'g'ri?",
      options: [
        "Massiv ichidagi elementlarni umuman o'zgartirib bo'lmaydi (o'qishgina mumkin)",
        "Massiv elementlarini push, pop yoki indeks orqali o'zgartirish mumkin, lekin o'zgaruvchining o'ziga butunlay boshqa yangi massivni qayta biriktirib (reassign) bo'lmaydi",
        "Massiv uzunligini o'zgartirib bo'lmaydi",
        "Hech qanday cheklov yo'q, xuddi let kabi ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`const` massivning xotiradagi manzilini (reference) o'zgarmas qiladi. Ammo uning ichidagi ma'lumotlarni o'zgartirish (mutatsiya) taqiqlanmaydi."
    },
    {
      id: 5,
      question: "Massiv elementlarini bitta satrga (string) birlashtirish va har bir element o'rtasida ma'lum bir ajratuvchi belgi (separator) qo'yish uchun qaysi metod ishlatiladi?",
      options: [
        "`concat()`",
        "`join()` (masalan: `['a', 'b'].join('-')` natijasi `\"a-b\"` bo'ladi)",
        "`split()`",
        "`slice()`"
      ],
      correctAnswer: 1,
      explanation: "`join()` metodi barcha elementlarni birlashtirib, bitta string yaratadi. Qavs ichida ajratuvchi belgi berilishi mumkin (agar berilmasa, vergul `,` ishlatiladi)."
    }
  ]
};
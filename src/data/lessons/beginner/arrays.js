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
      test: "if (code.includes('animals') && code.includes('[')) return null; return 'animals nomli massiv yarating';"
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
    },
    {
      id: 4,
      title: "Boshidan o'chirish",
      instruction: "Berilgan 'fruits' massivining birinchi elementini shift() orqali o'chiring va o'chirilgan qiymatni 'removed' o'zgaruvchisiga saqlang.",
      startingCode: "const fruits = ['Olma', 'Banan'];\n// Bu yerga yozing\n",
      hint: "const removed = fruits.shift();",
      test: "if (code.includes('shift') && code.includes('removed')) return null; return 'shift() orqali birinchi elementni o\\'chiring va removed ga saqlang';"
    },
    {
      id: 5,
      title: "Boshiga qo'shish",
      instruction: "Berilgan 'numbers' massivining boshiga 1 sonini unshift() orqali qo'shing.",
      startingCode: "const numbers = [2, 3];\n// Bu yerga yozing\n",
      hint: "numbers.unshift(1);",
      test: "if (code.includes('unshift(1)')) return null; return 'unshift(1) orqali boshiga 1 qo\\'shing';"
    },
    {
      id: 6,
      title: "Oxiridan o'chirish",
      instruction: "Berilgan 'list' massivining oxirgi elementini pop() orqali o'chiring va o'chirilgan qiymatni 'lastItem' o'zgaruvchisiga saqlang.",
      startingCode: "const list = [10, 20, 30];\n// Bu yerga yozing\n",
      hint: "const lastItem = list.pop();",
      test: "if (code.includes('pop') && code.includes('lastItem')) return null; return 'pop() orqali oxirgi elementni o\\'chiring va lastItem ga saqlang';"
    },
    {
      id: 7,
      title: "Element borligini tekshirish",
      instruction: "includes() orqali 'basket' massivida 'Nok' borligini tekshiring va natijani 'hasPear' o'zgaruvchisiga saqlang.",
      startingCode: "const basket = ['Olma', 'Uzum', 'Nok'];\n// Bu yerga yozing\n",
      hint: "const hasPear = basket.includes('Nok');",
      test: "if (code.includes('includes') && code.includes('hasPear')) return null; return 'includes(\\'Nok\\') dan foydalanib hasPear ga saqlang';"
    },
    {
      id: 8,
      title: "Element indeksini topish",
      instruction: "indexOf() orqali 'tech' massividagi 'JS' elementining indeksini aniqlab 'index' o'zgaruvchisiga saqlang.",
      startingCode: "const tech = ['HTML', 'CSS', 'JS'];\n// Bu yerga yozing\n",
      hint: "const index = tech.indexOf('JS');",
      test: "if (code.includes('indexOf') && code.includes('index')) return null; return 'indexOf(\\'JS\\') dan foydalanib index ga saqlang';"
    },
    {
      id: 9,
      title: "Massivni teskari qilish",
      instruction: "reverse() orqali 'letters' massivini teskari tartibga o'giring.",
      startingCode: "const letters = ['a', 'b', 'c'];\n// Bu yerga yozing\n",
      hint: "letters.reverse();",
      test: "if (code.includes('reverse()')) return null; return 'reverse() metodini chaqiring';"
    },
    {
      id: 10,
      title: "Splice orqali o'chirish",
      instruction: "splice() yordamida 'values' massividan 1-indeksdagi elementni (2 sonini) o'chiring.",
      startingCode: "const values = [1, 2, 3];\n// Bu yerga yozing\n",
      hint: "values.splice(1, 1);",
      test: "if (code.includes('splice(1, 1)') || code.includes('splice(1,1)')) return null; return 'splice(1, 1) orqali 1-indeksdagi elementni o\\'chiring';"
    },
    {
      id: 11,
      title: "Massivlarni birlashtirish",
      instruction: "concat() yordamida 'a' va 'b' massivlarini birlashtirib 'combined' o'zgaruvchisiga saqlang.",
      startingCode: "const a = [1, 2];\nconst b = [3, 4];\n// Bu yerga yozing\n",
      hint: "const combined = a.concat(b);",
      test: "if (code.includes('concat') && code.includes('combined')) return null; return 'concat orqali massivlarni birlashtiring';"
    },
    {
      id: 12,
      title: "Join orqali matn qilish",
      instruction: "join() metodi yordamida 'parts' massividagi harflarni '-' belgisi orqali birlashtirib 'joined' o'zgaruvchisiga saqlang.",
      startingCode: "const parts = ['a', 'b', 'c'];\n// Bu yerga yozing\n",
      hint: "const joined = parts.join('-');",
      test: "if (code.includes('join') && code.includes('-') && code.includes('joined')) return null; return 'join(\\'-\\') orqali joined o\\'zgaruvchisiga saqlang';"
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
      explanation: "`unshift()` metodi massiv boshiga elementlar qo'shadi va yangi uzunlikni qaytaradi. `push()` esa oxiriga qo'shasi. `shift()` va `pop()` o'chirish uchun."
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
    },
    {
      id: 6,
      question: "Quyidagi metodlardan qaysi biri massivning birinchi elementini o'chiradi va o'chirilgan elementni qaytaradi?",
      options: [
        "`pop()`",
        "`shift()` (massiv boshidan o'chirish uchun)",
        "`unshift()`",
        "`splice()`"
      ],
      correctAnswer: 1,
      explanation: "`shift()` metodi massivning birinchi elementini o'chiradi va qolgan elementlarning indeksini bittaga kamaytiradi."
    },
    {
      id: 7,
      question: "Quyidagi metodlardan qaysi biri massivning oxirgi elementini o'chiradi?",
      options: [
        "`shift()`",
        "`pop()` (massiv oxiridan o'chirish uchun)",
        "`push()`",
        "`splice()`"
      ],
      correctAnswer: 1,
      explanation: "`pop()` metodi massivning eng oxirgi elementini olib tashlaydi va o'chirilgan qiymatni qaytaradi."
    },
    {
      id: 8,
      question: "Massivdan elementlarni o'chirish, almashtirish yoki yangi elementlarni istalgan joyga qo'shish uchun qaysi universal metod ishlatiladi?",
      options: [
        "`slice()`",
        "`splice()` (massiv tarkibini o'zgartirish uchun universal metod)",
        "`concat()`",
        "`join()`"
      ],
      correctAnswer: 1,
      explanation: "`splice()` metodi juda universal bo'lib, uning yordamida massivning istalgan joyidan elementlarni o'chirish, almashtirish yoki yangilarini qo'shish mumkin."
    },
    {
      id: 9,
      question: "Massiv elementlarining tartibini teskari (reverse) qilib qo'yadigan metod qaysi?",
      options: [
        "`sort()`",
        "`reverse()` (elementlarni teskari tartibda joylashtiradi va asl massivni o'zgartiradi)",
        "`split()`",
        "`join()`"
      ],
      correctAnswer: 1,
      explanation: "`reverse()` metodi massivdagi elementlar tartibini teskari qiladi va bu metod asl massivni mutatsiyaga uchratadi (o'zgartiradi)."
    },
    {
      id: 10,
      question: "`includes()` metodi massivda izlanayotgan element topilmasa qanday qiymat qaytaradi?",
      options: [
        "`-1`",
        "`false` (chunki includes faqat boolean qiymat qaytaradi)",
        "`null`",
        "`undefined`"
      ],
      correctAnswer: 1,
      explanation: "`includes()` metodi massivda muayyan element bor yoki yo'qligini tekshirib, faqat `true` yoki `false` (boolean) qiymat qaytaradi."
    },
    {
      id: 11,
      question: "Ikkita massivni birlashtirib, yangi massiv yaratish uchun qaysi metod ishlatiladi?",
      options: [
        "`join()`",
        "`push()`",
        "`concat()` (ikki massivni birlashtirib yangi massiv qaytaradi)",
        "`splice()`"
      ],
      correctAnswer: 2,
      explanation: "`concat()` metodi joriy massivga boshqa massiv yoki qiymatlarni qo'shib, yangi massiv qaytaradi va asl massivlarni o'zgartirmaydi."
    },
    {
      id: 12,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst a = [1, 2, 3];\nconsole.log(a[5]);\n```",
      options: [
        "IndexOutOfBoundsException xatosi yuz beradi",
        "undefined (chunki massivda 5-indeksda hech qanday element yo'q)",
        "null",
        "0"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da massiv chegarasidan tashqaridagi indeksga murojaat qilinganda xatolik yuz bermaydi, balki `undefined` qiymati qaytariladi."
    }
  ]
};
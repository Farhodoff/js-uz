export const sqlFiltering = {
  id: "sqlFiltering",
  title: "Ma'lumotlarni Filtrlash (Filtering)",
  language: "sql",
  theory: `## 1. NEGA kerak?
Haqiqiy ma'lumotlar bazalarida ko'pincha millionlab qatorlar saqlanadi. Bizga har doim ham barcha qatorlar kerak bo'lavermaydi. Masalan, faqat faol foydalanuvchilarni topish, ma'lum bir narx oralig'idagi mahsulotlarni ko'rish yoki ma'lum bir harfdan boshlanuvchi ismlarni qidirish kerak bo'ladi. SQL-da shunday aniq shartlar bo'yicha ma'lumotlarni tanlab olish uchun **WHERE** bloki bilan birga mantiqiy operatorlar ishlatiladi.

## 2. SODDALIK (Analogiya)
Buni **do'kondagi filtrlarga** o'xshatish mumkin:
Siz kiyim-kechak do'konidan "Rangi *qizil* bo'lgan **VA** o'lchami *M* bo'lgan **Yoki** narxi *100,000 so'mdan kam* bo'lgan" ko'ylaklarni filtrlab qidiryapsiz.
SQL-da mantiqiy shartlarni birlashtirish xuddi shunday ishlaydi.

## 3. STRUKTURA
Mantiqiy operatorlar:
1. **\`AND\`**: Ikkala shart ham to'g'ri (true) bo'lishi shart.
2. **\`OR\`**: Shartlardan kamida bittasi to'g'ri bo'lsa kifoya.
3. **\`IN\`**: Qiymat berilgan ro'yxat ichida borligini tekshiradi (masalan, \`city IN ('Toshkent', 'Samarqand')\`).
4. **\`BETWEEN\`**: Qiymat ma'lum bir oraliqda (inclusive - chegaralar bilan birga) ekanligini tekshiradi (masalan, \`age BETWEEN 20 AND 30\`).
5. **\`LIKE\`**: Qidiruv shablonini tekshiradi. \`%\` belgisi ixtiyoriy miqdordagi harflar o'rniga o'tadi (masalan, \`name LIKE 'A%'\` - 'A' harfi bilan boshlanuvchi ismlar).
6. **\`IS NULL\` / \`IS NOT NULL\`**: Ustunda qiymat yo'qligini (null) tekshirish.

## 4. AMALIYOT
Mock jadvallarimiz asosida filtrlash namunalari:

### Bir nechta shartlar (AND)
Toshkentda yashaydigan va yoshi 25 dan katta bo'lgan foydalanuvchilar:
\`\`\`sql
SELECT * FROM users 
WHERE city = 'Toshkent' AND age > 25;
\`\`\`

### Qiymatlar ro'yxati (IN)
Faqat adminlar yoki menejerlarni tanlash:
\`\`\`sql
SELECT * FROM users 
WHERE role IN ('Admin', 'Manager');
\`\`\`

### Shabloni bo'yicha qidirish (LIKE)
Ismi 'D' harfi bilan boshlanadigan foydalanuvchilar:
\`\`\`sql
SELECT * FROM users 
WHERE name LIKE 'D%';
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **LIKE operatorida wildcards (%) ni unutish**: \`WHERE name LIKE 'Ali'\` yozsangiz, u faqat to'liq 'Ali' ga teng bo'lgan qatorlarni qidiradi. 'Alisher' yoki 'Alijon' larni topish uchun \`WHERE name LIKE 'Ali%'\` deb yozish shart.
2. **NULL qiymatlarni tenglik operatori (=) bilan tekshirish**: SQL-da \`WHERE city = NULL\` xato hisoblanadi va hech qanday natija bermaydi. Buning o'rniga doimo \`WHERE city IS NULL\` yozilishi shart.
3. **AND va OR ustuvorligi (Precedence)**: Agar birgalikda AND va OR ishlatilsa, AND yuqori ustuvorlikka ega. Murakkab mantiqiy shartlarni doim qavs ichiga yozing: \`(city = 'Toshkent' OR city = 'Buxoro') AND age > 30\`.

## 6. SAVOLLAR VA JAVOBLAR
**1. SQL-da \`BETWEEN\` operatori chegaralarni ham hisobga oladimi?**
Ha, inclusive hisoblanadi. Masalan, \`age BETWEEN 20 AND 30\` yoshi 20 va 30 bo'lganlarni ham qaytaradi.

**2. \`IS NULL\` nima uchun kerak?**
Ustunga ma'lumot kiritilmagan (bo'sh qolgan) qatorlarni aniqlash uchun ishlatiladi.

**3. LIKE operatorida \`%\` va \`_\` (tag chiziq) farqi nimada?**
\`%\` belgisi ixtiyoriy uzunlikdagi (hatto 0 ta) belgilar o'rniga o'tadi, \`_\` esa roppa-rosa bitta harf yoki belgi o'rniga o'tadi.
`,
  exercises: [
    {
      id: 1,
      title: "Yosh oralig'i (BETWEEN)",
      instruction: "`users` jadvalidan yoshi 25 va 30 oralig'ida bo'lgan (25 va 30 ni ham qo'shib) barcha foydalanuvchilarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE age BETWEEN 25 AND 30",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Ushbu oraliqda 3 ta foydalanuvchi bor'; if(result.some(u => u.age < 25 || u.age > 30)) return 'Faqat 25 va 30 yosh oralig\\'idagi foydalanuvchilar chiqishi shart'; return null;"
    },
    {
      id: 2,
      title: "Rollar filtri (IN)",
      instruction: "`users` jadvalidan roli `Admin` yoki `Manager` bo'lgan foydalanuvchilarning ismi (`name`) va roli (`role`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT name, role FROM users WHERE role IN ('Admin', 'Manager')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Admin va Manager roli bo\\'lgan jami 2 kishi bor'; if(result[0].city !== undefined) return 'Faqat name va role ustunlari tanlanishi kerak'; return null;"
    },
    {
      id: 3,
      title: "Ism bo'yicha qidiruv (LIKE)",
      instruction: "`users` jadvalidan ismi 'M' harfi bilan boshlanadigan barcha foydalanuvchilarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE name LIKE 'M%'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Madina') return 'Faqat Madina ismi qaytishi kerak'; return null;"
    },
    {
      id: 4,
      title: "Toshkentlik foydalanuvchilar va rollar",
      instruction: "`users` jadvalidan Toshkentda yashaydigan yoki roli 'User' bo'lmagan barcha foydalanuvchilarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE city = 'Toshkent' OR role != 'User'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Jami 4 ta foydalanuvchi shartga mos keladi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL-da ma'lumotlar bazasida qiymat saqlanmagan (bo'sh) kataklarni tekshirish uchun qaysi ifoda to'g'ri?",
      options: ["= NULL", "IS NULL", "IS EMPTY", "== NULL"],
      correctAnswer: 1,
      explanation: "SQL-da NULL qiymat tenglik operatori bilan tekshirilmaydi, buning o'rniga maxsus 'IS NULL' yoki 'IS NOT NULL' operatorlari ishlatiladi."
    },
    {
      id: 2,
      question: "LIKE operatorida faqat bitta belgini almashtirish uchun qaysi wildcard ishlatiladi?",
      options: ["%", "_", "*", "?"],
      correctAnswer: 1,
      explanation: "% belgisi ixtiyoriy uzunlikdagi matn o'rniga o'tadi, _ (pastki chiziq) esa roppa-rosa bitta ixtiyoriy belgi o'rnini egallaydi."
    },
    {
      id: 3,
      question: "BETWEEN operatori qanday oraliqni ifodalaydi?",
      options: [
        "Faqat kichik va katta qiymatlarni hisobga olmaydigan eksklyuziv oraliq",
        "Chegaraviy qiymatlarni ham o'z ichiga oluvchi (inclusive) oraliq",
        "Faqat manfiy sonlar oralig'i",
        "Ixtiyoriy matnlar oralig'i"
      ],
      correctAnswer: 1,
      explanation: "BETWEEN operatori chegaralarni ham o'z ichiga oladi (masalan, BETWEEN 1 AND 5 yozilsa, 1 va 5 ham oraliqqa kiradi)."
    }
  ]
};

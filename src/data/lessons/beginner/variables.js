export const variables = {
  id: "variables",
  title: "O'zgaruvchilar (var, let, const)",
  level: "Beginner",
  description: "Ma'lumotlarni saqlash uchun 'qutilar' bilan tanishamiz: var, let va const farqi.",
  theory: `
# O'zgaruvchilar – Bu nima va nima uchun kerak?

JavaScriptda **o'zgaruvchilar** — bu ma'lumotlarni (son, matn va h.k.) vaqtincha saqlash uchun mo'ljallangan "qutilar"dir.

## 1. NEGA kerak?
Tasavvur qiling, sizga o'yin davomida foydalanuvchining ballarini saqlab borish kerak. Ballar har doim o'zgarib turadi. Agar bizda o'zgaruvchi bo'lmasa, har bir yangi ballni kompyuter xotirasida qayerda ekanligini qo'lda qidirishimizga to'g'ri kelardi. O'zgaruvchi bizga o'sha xotira joyiga chiroyli "nom" berish imkonini beradi.

## 2. SODDALIK (Analogiya)
O'zgaruvchini oshxonadagi **bankachalarga** o'xshatish mumkin:
- **Bankacha nomi:** "Tuz" (bu o'zgaruvchi nomi).
- **Bankacha ichidagisi:** Oq kukun (bu o'zgaruvchi qiymati).
Siz bankacha ichidagi tuzni ishlatib, o'rniga shakar solib qo'yishingiz ham mumkin (qiymatni o'zgartirish).

## 3. STRUKTURA (Kalit so'zlar)

### A. let (O'zgaruvchan)
Agar qiymat keyinchalik o'zgarishi kerak bo'lsa, \`let\` ishlatiladi:
\`\`\`javascript
let ball = 10;
ball = 20; // Qiymatni yangilash mumkin ✅
\`\`\`

### B. const (O'zgarmas)
Agar qiymat bir marta berilsa va boshqa o'zgarmasa, \`const\` ishlatiladi:
\`\`\`javascript
const PI = 3.14;
PI = 5; // Xato! ❌ (O'zgartirib bo'lmaydi)
\`\`\`

### C. var (Eski usul)
Bu JSning eski versiyalaridagi kalit so'z. Hozirda undan foydalanmaslik tavsiya etiladi, chunki u kutilmagan xatolarga (hoisting muammolari) sabab bo'ladi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const ism = "Farhod";
let yosh = 25;
yosh = 26; // Tug'ilgan kunda yosh o'zgaradi
console.log(ism, yosh);
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **O'zgaruvchi nomlash:** Nomlar raqam bilan boshlanishi mumkin emas (\`let 1name\` ❌). Shuningdek, bo'sh joy (\`space\`) ishlatib bo'lmaydi (\`let my name\` ❌).
2. **const'ga qiymat bermaslik:** \`const x;\` deb yozib bo'lmaydi, unga darhol qiymat berish shart.

## 6. SAVOLLAR (12 ta)
1. O'zgaruvchi nima?
2. \`let\`, \`const\` va \`var\` o'rtasidagi asosiy farq nima?
3. Nima uchun \`const\`dan foydalanish xavfsizroq?
4. O'zgaruvchi nomini raqam bilan boshlasa bo'ladimi?
5. \`camelCase\` yozish usuli nima?
6. Qaysi kalit so'zni ishlatish hozirda tavsiya etilmaydi?
7. \`const\` bilan yaratilgan o'zgaruvchini qiymatini o'zgartirsa nima bo'ladi?
8. Bir vaqtda bir nechta o'zgaruvchini e'lon qilsa bo'ladimi?
9. O'zgaruvchi nomi qaysi tillarda yozilishi mumkin?
10. Hoisting nima?
11. "Temporal Dead Zone" (TDZ) nima?
12. Qachon \`let\` ishlatgan ma'qul?`,
  exercises: [
    {
      id: 1,
      title: "O'zgaruvchi yaratish",
      instruction: "'name' nomli o'zgarmas (const) va 'score' nomli o'zgaruvchan (let) yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const name = 'Ali'; let score = 0;",
      test: "if (code.includes('const') && code.includes('let')) return null; return 'Kalit so\\'zlarni to\\'g\\'ri ishlating';"
    }
  ]
};

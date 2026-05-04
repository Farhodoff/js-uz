export const variables = {
  id: "variables",
  title: "O'zgaruvchilar: var, let, const",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizga o'yin davomida foydalanuvchining ballarini saqlab borish kerak. Ballar har doim o'zgarib turadi. Agar bizda o'zgaruvchi bo'lmasa, har bir yangi ballni kompyuter xotirasida qayerda ekanligini qo'lda qidirishimizga to'g'ri kelardi. O'zgaruvchi bizga o'sha xotira joyiga chiroyli "nom" berish imkonini beradi.

## 2. SODDALIK (Analogiya)
O'zgaruvchini oshxonadagi **bankachalarga** o'xshatish mumkin:
- **Bankacha nomi:** "Tuz" (bu o'zgaruvchi nomi).
- **Bankacha ichidagisi:** Oq kukun (bu o'zgaruvchi qiymati).
Siz bankacha ichidagi tuzni ishlatib, o'rniga shakar solib qo'yishingiz ham mumkin (qiymatni o'zgartirish).

## 3. STRUKTURA (Kalit so'zlar)

### A. let (Zamonaviy tanlov)
Agar qiymat keyinchalik o'zgarishi kerak bo'lsa, \`let\` ishlatiladi. U **block scope**ga ega (faqat o'zi yozilgan \`{ }\` ichida ko'rinadi).
\`\`\`javascript
let ball = 10;
ball = 20; // Qiymatni yangilash mumkin ✅
\`\`\`

### B. const (O'zgarmas)
Agar qiymat bir marta berilsa va boshqa o'zgarmasa, \`const\` ishlatiladi. Uni e'lon qilganda darhol qiymat berish shart.
\`\`\`javascript
const PI = 3.14;
PI = 5; // Xato! ❌
\`\`\`

### C. var (Eski usul)
JSning eski versiyalaridan qolgan. U **function scope**ga ega va **hoisting** (yuqoriga ko'tarilish) xususiyatiga ega, bu esa kutilmagan xatolarga olib kelishi mumkin. Hozirda undan foydalanmaslik tavsiya etiladi.

| Xususiyat | var | let | const |
|-----------|-----|-----|-------|
| Scope | Function | Block | Block |
| Qayta e'lon qilish | Ha ✅ | Yo'q ❌ | Yo'q ❌ |
| Qiymatni o'zgartirish | Ha ✅ | Ha ✅ | Yo'q ❌ |
| Hoisting | Ha ✅ | Yo'q (TDZ) | Yo'q (TDZ) |

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Nomlash qoidalari:** Nomlar raqam bilan boshlanishi mumkin emas (\`let 1name\` ❌). Faqat harf, \`$\` yoki \`_\` bilan boshlanishi mumkin.
2. **Bo'sh joy:** O'zgaruvchi nomida bo'sh joy bo'lishi mumkin emas (\`let mening ismim\` ❌). O'rniga \`meningIsmim\` (camelCase) ishlatiladi.
3. **const va undefined:** \`const x;\` deb yozib bo'lmaydi, unga darhol qiymat berish shart.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. O'zgaruvchi nima?</summary>
Ma'lumotlarni kompyuter xotirasida saqlash uchun ishlatiladigan nomlangan "quti".
</details>

<details>
<summary>2. let va var o'rtasidagi asosiy farq nima?</summary>
\`let\` block scopega ega, \`var\` esa function scopega. \`let\` qayta e'lon qilinishga yo'l qo'ymaydi.
</details>

<details>
<summary>3. Nima uchun constdan foydalanish xavfsizroq?</summary>
Chunki u qiymatning tasodifan o'zgarib ketishidan himoya qiladi.
</details>

<details>
<summary>4. O'zgaruvchi nomini raqam bilan boshlasa bo'ladimi?</summary>
Yo'q, bu xatolikka olib keladi.
</details>

<details>
<summary>5. camelCase yozish usuli nima?</summary>
Birinchi so'z kichik, keyingi so'zlar katta harf bilan boshlanadigan yozish usuli (masalan: \`meningIsmim\`).
</details>

<details>
<summary>6. Qaysi kalit so'zni ishlatish hozirda tavsiya etilmaydi?</summary>
\`var\` kalit so'zi.
</details>

<details>
<summary>7. const bilan yaratilgan obyekt ichidagi qiymatni o'zgartirsa bo'ladimi?</summary>
Ha, obyektning o'zini (reference) o'zgartirib bo'lmaydi, lekin ichidagi xususiyatlarini o'zgartirsa bo'ladi.
</details>

<details>
<summary>8. Bir vaqtda bir nechta o'zgaruvchini e'lon qilsa bo'ladimi?</summary>
Ha: \`let a = 1, b = 2, c = 3;\`
</details>

<details>
<summary>9. O'zgaruvchi nomi qaysi tillarda yozilishi mumkin?</summary>
Unicode qo'llab-quvvatlanadi, lekin ingliz tilida yozish standart hisoblanadi.
</details>

<details>
<summary>10. Hoisting nima?</summary>
O'zgaruvchi yoki funksiyalarni e'lon qilinishidan oldin ishlatish imkonini beruvchi JS mexanizmi (faqat \`var\` va funksiyalar bilan).
</details>

<details>
<summary>11. "Temporal Dead Zone" (TDZ) nima?</summary>
\`let\` va \`const\` e'lon qilinguncha bo'lgan vaqt oralig'i, bunda o'zgaruvchiga murojaat qilib bo'lmaydi.
</details>

<details>
<summary>12. Qachon let ishlatgan ma'qul?</summary>
Qiymat keyinchalik o'zgarishi aniq bo'lgan holatlarda (masalan, sikllarda).
</details>`,
  exercises: [
    {
      id: 1,
      title: "O'zgaruvchi yaratish",
      instruction: "'name' nomli o'zgarmas (const) va 'score' nomli o'zgaruvchan (let) yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const name = 'Ali'; let score = 0;",
      test: "if (code.includes('const') && code.includes('let')) return null; return 'Kalit so\\'zlarni to\\'g\\'ri ishlating';"
    },
    {
      id: 2,
      title: "Qiymatni yangilash",
      instruction: "'ball' o'zgaruvchisini yarating, unga 10 bering va keyingi qatorda uni 15 ga o'zgartiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let ball = 10; ball = 15;",
      test: "if (code.includes('let') && code.split('=')[2]?.trim().includes('15')) return null; return 'Qiymatni to\\'g\\'ri yangilang';"
    }
  ]
};

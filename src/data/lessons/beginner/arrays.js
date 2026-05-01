export const arrays = {
  id: "b5",
  title: "Massivlar - Ma'lumotlar poezdi",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, sizda 10 ta meva bor. Har biri uchun alohida o'zgaruvchi ochasizmi?
\`\`\`javascript
let m1 = "Olma"; let m2 = "Banan"...
\`\`\`
Bu juda noqulay! **Massiv** (Array) — bu bitta o'zgaruvchida bir nechta ma'lumotlarni ketma-ket (xuddi poezd vagonlari kabi) saqlash usulidir.

---

## 2. MASSIV YARATISH (Tushuntir → Ko'rsat → Bajartir)
Massiv kvadrat qavslar \`[ ]\` ichida yoziladi. Har bir elementning o'z o'rni (indeksi) bor. **Sanoq 0 dan boshlanadi!**

**Ko'rsat:**
\`\`\`javascript
const mevalar = ["Olma", "Banan", "Gilos"];
console.log(mevalar[0]); // "Olma"
\`\`\`

**Mashq:** 5 ta shahar nomidan iborat \`shaharlar\` massivini yarating.

---

## 3. METODLAR: QO'SHISH VA O'CHIRISH
- **push:** Oxiriga qo'shish.
- **pop:** Oxiridan olish.
- **unshift:** Boshiga qo'shish.
- **shift:** Boshidan olish.

**Ko'rsat:**
\`\`\`javascript
mevalar.push("Anor"); // ["Olma", "Banan", "Gilos", "Anor"]
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR ⚠️
1.  **Sanoqni 1 dan boshlash:** \`arr[1]\` — bu aslida ikkinchi element!
2.  **Mavjud bo'lmagan indeks:** \`arr[100]\` qilsangiz, JS xato bermaydi, shunchaki \`undefined\` qaytaradi.

---

## 5. BUZIB KO'RISH 🧐
**Nima bo'ladi agar massivning uzunligini (\`length\`) qo'lda o'zgartirsak?**
\`\`\`javascript
const sonlar = [1, 2, 3, 4, 5];
sonlar.length = 2;
console.log(sonlar); // [1, 2] -> Qolganlari o'chib ketdi! 😱
\`\`\`

---

## 6. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **Massiv uzunligini qanday bilamiz? (Junior)**
   *Javob:* \`.length\` xususiyati orqali.

2. **Massivning oxirgi elementini qanday olish mumkin? (Junior)**
   *Javob:* \`arr[arr.length - 1]\` yoki \`arr.at(-1)\`.

3. **Massivni matnga aylantirish. (Junior - Amaliy)**
   *Vazifa:* \`join(", ")\` yordamida massivni vergul bilan ajratilgan matn qiling.

4. **Split() va Join() farqi? (Junior)**
   *Javob:* Split matnni massivga bo'ladi, Join massivni matnga birlashtiradi.

5. **Massivda element borligini tekshirish. (Junior)**
   *Javob:* \`includes("qiymat")\` metodi \`true\` yoki \`false\` qaytaradi.

6. **Indeksni topish. (Junior)**
   *Javob:* \`indexOf("qiymat")\` birinchi topilgan indeksni qaytaradi.

7. **Splice() nima qiladi? (Middle)**
   *Javob:* Massivning istalgan joyidan element o'chiradi yoki qo'shadi (asl massivni o'zgartiradi).

8. **Slice() nima qiladi? (Middle)**
   *Javob:* Massivdan nusxa ko'chirib oladi (asl massiv o'zgarmaydi).

9. **Massivni teskari qilish. (Junior - Amaliy)**
   *Vazifa:* \`reverse()\` metodi orqali elementlar tartibini o'zgartiring.

10. **Ikki massivni birlashtirish. (Junior)**
    *Javob:* \`concat()\` yoki Spread \`[...a, ...b]\` orqali.

11. **Massiv ichidan qidirish (Find). (Middle)**
    *Javob:* \`find()\` shartga mos birinchi elementning o'zini qaytaradi.

12. **Massivni tozalash. (Junior - Amaliy)**
    *Vazifa:* \`arr.length = 0\` qilib massivni bo'shating.

---

## 7. CHALLENGE 🏆
Foydalanuvchi ismlari massivini yarating. Oxiriga yangi ism qo'shing, boshidan bittasini o'chiring va natijani "Ismlar: Ali, Vali" ko'rinishida konsolga chiqaring.

---

## 8. XULOSA
Siz endi ma'lumotlar bilan "poezd" yasashni va ularni boshqarishni bilasiz!
`,
  exercises: [
    {
      id: 1,
      title: "Massiv yaratish",
      instruction: "3 ta rangdan iborat 'ranglar' massivini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const ranglar = ['qizil', 'yashil', 'ko\\'k'];",
      test: "if (Array.isArray(result)) return null; return 'Massiv yarating';"
    },
    {
      id: 2,
      title: "Oxiriga qo'shish",
      instruction: "Push yordamida massivga 'sariq' rangini qo'shing.",
      startingCode: "const colors = ['oq'];\n// Qo'shing\n",
      hint: "colors.push('sariq');",
      test: "if (colors.includes('sariq')) return null; return 'Sariq qo\\'shilmadi';"
    }
  ]
};
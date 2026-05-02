export const arrays = {
  id: "arrays",
  title: "Massivlar (Arrays)",
  level: "Beginner",
  description: "Ma'lumotlar poezdi: bir nechta qiymatni bitta ro'yxatda saqlash.",
  theory: `
# Massivlar – Bu nima va nima uchun kerak?

**Massiv** (Array) — bu bitta o'zgaruvchida bir nechta ma'lumotlarni ketma-ket saqlash usulidir.

## 1. NEGA kerak?
Tasavvur qiling, sizda 10 ta meva bor. Har biri uchun alohida o'zgaruvchi ochish (\`meva1\`, \`meva2\`...) juda noqulay. Massiv esa barcha mevalarni bitta "savat" (ro'yxat) ichiga yig'adi.

## 2. SODDALIK (Analogiya)
Massivni **poezd vagonlari** deb tasavvur qiling. Har bir vagonning o'z o'rni (indeksi) bor. Eng muhimi: **JSda sanoq 0 dan boshlanadi!** Ya'ni birinchi vagon — 0-vagon.

## 3. STRUKTURA

### A. Massiv yaratish va o'qish
\`\`\`javascript
const mevalar = ["Olma", "Banan", "Gilos"];
console.log(mevalar[0]); // Olma
console.log(mevalar.length); // 3 (uzunligi)
\`\`\`

### B. Asosiy metodlar (Qo'shish va O'chirish)
- **push:** Oxiriga qo'shish.
- **pop:** Oxiridan o'chirish.
- **unshift:** Boshiga qo'shish.
- **shift:** Boshidan o'chirish.

\`\`\`javascript
mevalar.push("Anor"); // ["Olma", "Banan", "Gilos", "Anor"]
mevalar.shift(); // ["Banan", "Gilos", "Anor"]
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const sonlar = [10, 20, 30];
sonlar[1] = 25; // Qiymatni o'zgartirish
console.log(sonlar); // [10, 25, 30]
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Sanoqni 1 dan boshlash:** \`arr[1]\` — bu aslida ikkinchi element!
2. **Const va Massiv:** \`const\` bilan yaratilgan massivning ichidagi elementlarni o'zgartirsa bo'ladi, lekin massivning o'zini yangisiga almashtirib bo'lmaydi.

## 6. SAVOLLAR (12 ta)
1. Massiv nima?
2. Massiv yaratishda qaysi qavslar ishlatiladi?
3. Massivda sanoq nechadan boshlanadi?
4. Massiv uzunligini qanday bilish mumkin?
5. \`push\` va \`unshift\` farqi nima?
6. \`pop\` va \`shift\` farqi nima?
7. Massivning 3-elementini qanday o'qiymiz?
8. Massiv ichida har xil turdagi ma'lumotlar (string, number) bo'lishi mumkinmi?
9. \`includes()\` metodi nima qaytaradi?
10. \`indexOf()\` metodi nima qaytaradi?
11. Massivni matnga (string) aylantirish metodini ayting (\`join\`).
12. Massivni teskari qilish metodini ayting (\`reverse\`).`,
  exercises: [
    {
      id: 1,
      title: "Massiv mashqi",
      instruction: "3 ta hayvon nomidan iborat 'animals' massivini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const animals = ['Ayiq', 'Bo\\'ri', 'Tulki'];",
      test: "if (Array.isArray(result) && result.length === 3) return null; return 'Massiv noto\\'g\\'ri';"
    }
  ]
};

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
<details>
<summary>1. Massiv nima?</summary>
Bitta o'zgaruvchi nomi ostida bir nechta qiymatlarni saqlash imkonini beruvchi ma'lumotlar tuzilmasi.
</details>

<details>
<summary>2. Massiv yaratishda qaysi qavslar ishlatiladi?</summary>
Kvadrat qavslar \`[ ]\`.
</details>

<details>
<summary>3. Massivda sanoq nechadan boshlanadi?</summary>
0 dan boshlanadi.
</details>

<details>
<summary>4. Massiv uzunligini qanday bilish mumkin?</summary>
\`.length\` xususiyati orqali.
</details>

<details>
<summary>5. push va unshift farqi nima?</summary>
\`push\` oxiriga qo'shadi, \`unshift\` boshiga qo'shadi.
</details>

<details>
<summary>6. pop va shift farqi nima?</summary>
\`pop\` oxiridan o'chiradi, \`shift\` boshidan o'chiradi.
</details>

<details>
<summary>7. Massivning 3-elementini qanday o'qiymiz?</summary>
\`arr[2]\` orqali (chunki 0, 1, 2...).
</details>

<details>
<summary>8. Massiv ichida har xil turdagi ma'lumotlar bo'lishi mumkinmi?</summary>
Ha, JS massivlarida bir vaqtda son, matn va obyektlarni saqlash mumkin.
</details>

<details>
<summary>9. includes() metodi nima qaytaradi?</summary>
Agar element massivda bo'lsa \`true\`, bo'lmasa \`false\`.
</details>

<details>
<summary>10. indexOf() metodi nima qaytaradi?</summary>
Elementning indeksini. Topilmasa \`-1\` qaytaradi.
</details>

<details>
<summary>11. join() metodi nima qiladi?</summary>
Massiv elementlarini bitta matnga birlashtiradi.
</details>

<details>
<summary>12. reverse() metodi asl massivni o'zgartiradimi?</summary>
Ha, u massiv elementlari tartibini teskari qilib qo'yadi.
</details>`,
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
  ]
};

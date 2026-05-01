export const formsLesson = {
  id: "m6",
  title: "Forma va Validatsiya",
  theory: `## 1. FORMALAR BILAN ISHLASH
Veb-saytlarda ma'lumot to'plashning asosiy usuli — bu formalar (\`form\`). Biz JS orqali formaga yozilgan ma'lumotlarni olishimiz, ularni tekshirishimiz (validatsiya) va serverga yuborishimiz mumkin.

### submit hodisasi
Forma yuborilganda (\`Enter\` bosilganda yoki tugma bosilganda) \`submit\` hodisasi yuz beradi.

\`\`\`javascript
const myForm = document.querySelector('form');
myForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Sahifa yangilanib ketishini to'xtatadi
  console.log("Forma yuborildi!");
});
\`\`\`

---

## 2. MA'LUMOTLARNI OLISH
Input ichidagi qiymatni \`value\` xususiyati orqali olamiz.

\`\`\`javascript
const input = document.querySelector('#name');
console.log(input.value);
\`\`\`

---

## 3. ODDIY VALIDATSIYA
Foydalanuvchi ma'lumotni noto'g'ri kiritishini oldini olish — validatsiya deyiladi.

\`\`\`javascript
if (input.value.length < 3) {
  console.log("Ism juda qisqa!");
} else {
  console.log("Hammasi to'g'ri");
}
\`\`\`

\`\`\`mermaid
graph TD
    A[Forma Yuborish] --> B[event.preventDefault]
    B --> C{Ma'lumot to'grimi?}
    C -- Ha --> D[Serverga yuborish]
    C -- Yo'q --> E[Xatolik ko'rsatish]
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Middle)

1. **preventDefault() nima uchun kerak?**
   *Javob:* Brauzerning standart amalini (masalan, formani yuborganda sahifani yangilash) to'xtatish uchun.

2. **Inputdan sonni qanday olish kerak?**
   *Javob:* \`input.value\` har doim string qaytaradi. Uni son qilish uchun \`Number()\` yoki \`+\` operatoridan foydalanish kerak.

3. **Required atributi va JS validatsiya farqi nima?**
   *Javob:* \`required\` — bu brauzer darajasidagi oddiy validatsiya. JS darajasidagi validatsiya esa murakkab mantiqlarni tekshirish imkonini beradi.`,
  exercises: [
    {
      id: 1,
      title: "preventDefault mashqi",
      instruction: "Forma yuborilganda sahifa yangilanmasligi uchun kerakli metodni chaqiring.",
      startingCode: "const event = { preventDefault: () => event.done = true };\nfunction handleSubmit(e) {\n  // Bu yerda preventDefault ni chaqiring\n}\nhandleSubmit(event);",
      hint: "e.preventDefault();",
      test: "if (event.done) return null; return 'event.preventDefault() chaqirilmadi';"
    },
    {
      id: 2,
      title: "Validatsiya",
      instruction: "Agar 'pass' o'zgaruvchisining uzunligi 8 dan kichik bo'lsa 'Xato', aks holda 'OK' chiqaring.",
      startingCode: "const pass = '12345';\n// Bu yerga yozing\n",
      hint: "if (pass.length < 8) { console.log('Xato'); }",
      test: "if (logs.includes('Xato')) return null; return 'Parol qisqa bo\\'lsa Xato chiqishi kerak';"
    }
  ]
};

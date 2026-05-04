export const formsLesson = {
  id: "forms",
  title: "Formalar bilan ishlash",
  level: "O'rta daraja",
  description: "Inputlar, submit va validatsiya: foydalanuvchi ma'lumotlarini qabul qilish.",
  theory: `
# Formalar — Bu nima va nima uchun kerak?

**Forma** (\`form\`) — bu veb-saytlarda ma'lumot to'plashning asosiy usuli. Ro'yxatdan o'tish, qidiruv yoki xabar yuborish — hammasi formalar orqali qilinadi.

## 1. NEGA kerak?
Saytingiz foydalanuvchidan ma'lumot olishi kerak bo'lsa (masalan, login/parol), sizga formalar kerak bo'ladi. JS orqali biz o'sha ma'lumotlarni serverga yuborishdan oldin tekshiramiz (validatsiya).

## 2. SODDALIK (Analogiya)
Buni **anketa to'ldirishga** o'xshatish mumkin. Siz qog'ozdagi katakchalarni to'ldirasiz (Input) va uni qabulxonaga topshirasiz (Submit). Qabulxona xodimi (JS) hamma joyi to'ldirilganini tekshiradi.

## 3. STRUKTURA

### A. submit hodisasi
Forma yuborilganda \`submit\` hodisasi yuz beradi. Uni doim \`preventDefault()\` bilan to'xtatish kerak:
\`\`\`javascript
const myForm = document.querySelector("form");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Forma yuborildi!");
});
\`\`\`

### B. Qiymatni olish (.value)
Input ichidagi matnni olish:
\`\`\`javascript
const ismInput = document.querySelector("#name");
console.log(ismInput.value); // Matnni qaytaradi
\`\`\`

### C. Validatsiya (Tekshirish)
\`\`\`javascript
if (ismInput.value === "") {
  alert("Ismingizni yozing!");
}
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **preventDefault ni unutish:** Agar buni yozmasangiz, forma yuborilganda sahifa yangilanib ketadi va JS kodlaringiz ishlamay qoladi.
2. **value va elementni adashtirish:** \`console.log(input)\` elementni o'zini chiqaradi, \`console.log(input.value)\` esa ichidagi matnni.

## 6. SAVOLLAR (12 ta)
1. Formaning asosiy hodisasi (event) qaysi?
2. \`event.preventDefault()\` nima uchun shart?
3. Input ichidagi matnni qanday olamiz?
4. Validatsiya nima?
5. Input qiymati har doim qaysi turda (string) bo'ladi?
6. Checkbox tanlanganini qanday bilamiz (\`.checked\`)?
7. \`reset()\` metodi nima qiladi?
8. \`required\` atributi va JS validatsiya farqi?
9. Radio button qiymatini qanday olamiz?
10. \`input\` va \`change\` eventlari farqi nima?
11. Formani tugma bosmasdan qanday yuborsa bo'ladi (\`.submit()\`)?
12. Xatolik matnini ekranda ko'rsatish uchun nima qilish kerak?`,
  exercises: [
    {
      id: 1,
      title: "Submitni to'xtatish",
      instruction: "Forma yuborilganda sahifa yangilanmasligi uchun kerakli metodni chaqiring.",
      startingCode: "const event = { preventDefault: () => event.done = true };\nfunction handleSubmit(e) {\n  // Bu yerda chaqiring\n}\nhandleSubmit(event);",
      hint: "e.preventDefault();",
      test: "if (event.done) return null; return 'event.preventDefault() chaqirilmadi';"
    },
    {
      id: 2,
      title: "Qiymatni olish",
      instruction: "'user' o'zgaruvchisidan uning qiymatini (value) oling va 'val' o'zgaruvchisiga saqlang.",
      startingCode: "const user = { value: 'Ali' };\n// Bu yerga yozing\n",
      hint: "const val = user.value;",
      test: "if (code.includes('.value')) return null; return 'value xususiyatini ishlating';"
    },
    {
      id: 3,
      title: "Bo'shliqni tekshirish",
      instruction: "Agar 'msg' inputining qiymati bo'sh bo'lsa 'Bo'sh' so'zini konsolga chiqaring.",
      startingCode: "const msg = { value: '' };\n// Bu yerga yozing\n",
      hint: "if (msg.value === '') console.log('Bo'sh');",
      test: "if (logs.includes('Bo\\'sh')) return null; return 'Xato tekshiruv';"
    },
    {
      id: 4,
      title: "Parol uzunligi",
      instruction: "Parol (pass.value) 8 tadan kam bo'lsa 'Kisqa' so'zini chiqaring.",
      startingCode: "const pass = { value: '123' };\n// Bu yerga yozing\n",
      hint: "if (pass.value.length < 8) console.log('Kisqa');",
      test: "if (logs.includes('Kisqa')) return null; return 'Uzunlikni tekshiring';"
    }
  ]
};

export const domBasics = {
  id: "m4",
  title: "DOM bilan ishlash (Document Object Model)",
  level: "O'rta daraja",
  description: "JavaScript orqali HTML elementlarini boshqarish: tanlash, o'zgartirish va bezash.",
  theory: `
# DOM — Bu nima va nima uchun kerak?

**DOM** (Document Object Model) — bu HTML hujjatining brauzer ichidagi daraxtsimon ko'rinishi. Oddiyroq aytsak, bu JavaScript va HTML o'rtasidagi "ko'prik".

## 1. NEGA kerak?
HTML o'zi "o'lik" (statik) narsa. JavaScript orqali biz o'sha matnlarni o'zgartirishimiz, tugmalar bosilganda ranglarni almashtirishimiz yoki yangi elementlar qo'shishimiz mumkin. DOM bo'lmasa, saytlar shunchaki zerikarli gazeta bo'lib qolardi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, HTML — bu uyning chizmasi (proyekti). Uy bitganidan keyin siz uning devorini bo'yashingiz, mebellarini o'zgartirishingiz mumkin. DOM — bu sizning uydagi narsalarni "ushlab" o'zgartira olish qobiliyatingizdir.

## 3. STRUKTURA

### A. Elementlarni tanlash
\`\`\`javascript
const sarlavha = document.getElementById("title"); // ID orqali
const tugma = document.querySelector(".btn"); // CSS selektor orqali (eng qulay)
const hammaListlar = document.querySelectorAll("li"); // Hammasini olish
\`\`\`

### B. Elementlarni o'zgartirish
\`\`\`javascript
const el = document.querySelector("h1");
el.textContent = "Yangi sarlavha"; // Matnni o'zgartirish
el.style.color = "red"; // Rang berish
el.classList.add("active"); // Class qo'shish
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **querySelector bilan nuqtani unutish:** \`document.querySelector("my-class")\` ishlamaydi, \`".my-class"\` bo'lishi shart.
2. **Style nomlari:** JSda CSS xususiyatlari \`camelCase\` yoziladi: \`background-color\` emas, \`backgroundColor\`.

## 6. SAVOLLAR (12 ta)
1. DOM nima degani?
2. HTML va DOM farqi nima?
3. Elementni ID orqali tanlash metodi?
4. \`querySelector\` va \`querySelectorAll\` farqi?
5. \`textContent\` va \`innerHTML\` farqi?
6. JSda CSS style'lari qanday nomlanadi?
7. \`classList.toggle()\` nima qiladi?
8. \`document.body\` nima?
9. Ota elementni qanday topish mumkin?
10. Class qo'shish metodi?
11. Nima uchun JSda style berishdan ko'ra class qo'shish yaxshi?
12. Bir nechta elementni tanlaganda u nima qaytaradi (NodeList)?`,
  exercises: [
    {
      id: 1,
      title: "Elementni tanlash",
      instruction: "querySelector yordamida 'h1' elementini tanlab oling va uni 'title' o'zgaruvchisiga saqlang.",
      startingCode: "// Kodni shu yerda yozing\n",
      hint: "const title = document.querySelector('h1');",
      test: "if (code.includes('document.querySelector') && code.includes('h1')) return null; return 'h1 tegini tanlang';"
    },
    {
      id: 2,
      title: "Matnni o'zgartirish",
      instruction: "O'zgaruvchi 'header' ning textContent xususiyatini 'Salom JS' ga o'zgartiring.",
      startingCode: "const header = { textContent: '' }; // Mock element\n// Kodni shu yerga yozing\n",
      hint: "header.textContent = 'Salom JS';",
      test: "if (header.textContent === 'Salom JS') return null; return 'Matn noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Style o'zgartirish",
      instruction: "Elementning fon rangini (backgroundColor) 'blue' qiling.",
      startingCode: "const el = { style: { backgroundColor: '' } };\n// Bu yerga yozing\n",
      hint: "el.style.backgroundColor = 'blue';",
      test: "if (el.style.backgroundColor === 'blue') return null; return 'Rang ko\\'k bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "Class qo'shish",
      instruction: "Elementga 'highlight' klassini qo'shing.",
      startingCode: "const el = { classList: { add: (c) => el.className = c } };\n// Bu yerga yozing\n",
      hint: "el.classList.add('highlight');",
      test: "if (el.className === 'highlight') return null; return 'Class qo\\'shilmadi';"
    }
  ]
};

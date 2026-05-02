export const domBasics = {
  id: "m4",
  title: "DOM bilan ishlash (Document Object Model)",
  level: "Intermediate",
  description: "JavaScript orqali HTML elementlarini boshqarish: tanlash, o'zgartirish va bezash.",
  theory: `
# DOM – Bu nima va nima uchun kerak?

**DOM** (Document Object Model) — bu HTML hujjatining brauzer ichidagi daraxtsimon (tree) ko'rinishi. Oddiyroq aytsak, bu JavaScript va HTML o'rtasidagi "ko'prik".

## 1. NEGA kerak?
HTML o'zi "o'lik" (statik) narsa. U shunchaki matn va teglardan iborat. JavaScript orqali biz o'sha matnlarni o'zgartirishimiz, tugmalar bosilganda ranglarni almashtirishimiz yoki yangi elementlar qo'shishimiz mumkin. DOM bo'lmasa, saytlar shunchaki zerikarli gazeta bo'lib qolardi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, HTML — bu uyning chizmasi (proyekti). Uy bitganidan keyin siz uning devorini bo'yashingiz, mebellarini o'zgartirishingiz mumkin. DOM — bu sizning uydagi narsalarni "ushlab" o'zgartira olish qobiliyatingizdir.

## 3. STRUKTURA

### A. Elementlarni tanlash
Elementni o'zgartirishdan oldin uni "topib" olish kerak:
\`\`\`javascript
const sarlavha = document.getElementById("title"); // ID orqali (tezkor)
const tugma = document.querySelector(".btn"); // CSS selektor orqali (eng qulay)
const hammaListlar = document.querySelectorAll("li"); // Hammasini olish
\`\`\`

### B. Elementlarni o'zgartirish
\`\`\`javascript
const el = document.querySelector("h1");

el.textContent = "Yangi sarlavha"; // Matnni o'zgartirish
el.innerHTML = "<span>Salom</span>"; // HTML qo'shish
el.style.color = "red"; // Style berish
el.classList.add("active"); // Class qo'shish
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const box = document.querySelector(".box");
box.style.width = "100px";
box.style.height = "100px";
box.style.backgroundColor = "green";
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **querySelector bilan nuqtani unutish:** \`document.querySelector("my-class")\` ishlamaydi, \`".my-class"\` bo'lishi shart.
2. **Style nomlari:** JSda CSS xususiyatlari \`camelCase\` yoziladi: \`background-color\` emas, \`backgroundColor\`.
3. **Script joylashuvi:** Agar JS fayl HTML tepasida (\`<head>\`) bo'lsa va \`defer\` ishlatilmasa, DOM hali tayyor bo'lmagani uchun elementlarni topolmaydi.

## 6. SAVOLLAR (12 ta)
1. DOM nima degani?
2. HTML va DOM o'rtasidagi farq nima?
3. Elementni ID orqali tanlash uchun qaysi metod ishlatiladi?
4. \`querySelector\` va \`querySelectorAll\` farqi nima?
5. \`textContent\` va \`innerHTML\` farqini ayting.
6. JSda CSS style'lari qanday nomlanadi (camelCase)?
7. \`classList.toggle()\` nima ish bajaradi?
8. \`document.body\` nima qaytaradi?
9. Elementni o'chirish uchun qaysi metod ishlatiladi?
10. Yangi element yaratish metodini ayting (\`createElement\`).
11. Nima uchun style'ni to'g'ridan-to'g'ri JSda berishdan ko'ra class qo'shish yaxshi?
12. DOM daraxtida "ota" elementni qanday topish mumkin (\`parentElement\`)?`,

  exercises: [
    {
      id: 1,
      title: "Elementni tanlash",
      instruction: "querySelector yordamida 'h1' elementini tanlab oling va uni 'title' o'zgaruvchisiga saqlang.",
      startingCode: "// Kodni shu yerga yozing\n",
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
    }
  ]
};

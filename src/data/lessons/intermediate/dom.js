export const domBasics = {
  id: "m4",
  title: "DOM bilan ishlash",
  theory: `## 1. DOM NIMA?
**DOM** (Document Object Model) — bu HTML hujjatining brauzer ichidagi daraxtsimon (tree) ko'rinishi. JavaScript orqali biz ushbu daraxtdagi istalgan elementni topishimiz, o'zgartirishimiz yoki o'chirib tashlashimiz mumkin.

\`\`\`mermaid
graph TD
    A[Window] --> B[Document]
    B --> C[HTML]
    C --> D[Head]
    C --> E[Body]
    E --> F[Header]
    E --> G[Main]
    G --> H[H1]
    G --> I[P]
\`\`\`

---

## 2. ELEMENTLARNI TANLASH
Elementlar bilan ishlash uchun avval ularni "ushlab" olishimiz kerak:

- **querySelector:** Har qanday CSS selektor orqali birinchi topilgan elementni oladi.
- **querySelectorAll:** Barcha mos keladigan elementlarni ro'yxat (NodeList) shaklida oladi.
- **getElementById:** Faqat ID orqali juda tez qidiradi.

\`\`\`javascript
const title = document.querySelector("#main-title");
const items = document.querySelectorAll(".list-item");
\`\`\`

---

## 3. ELEMENTLARNI O'ZGARTIRISH

### Matn va Kontent
- **textContent:** Faqat ichidagi matnni o'zgartiradi (xavfsiz usul).
- **innerHTML:** HTML teglari bilan birga o'zgartiradi (ehtiyotkorlik bilan ishlating!).

### Style va Class
\`\`\`javascript
const box = document.querySelector(".box");

// To'g'ridan-to'g'ri style berish
box.style.backgroundColor = "red";

// Classlar bilan ishlash (Tavsiya etiladi)
box.classList.add("active");
box.classList.remove("old");
box.classList.toggle("highlight");
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **textContent va innerHTML farqi nima?**
   *Javob:* \`textContent\` faqat matnni o'qiydi/yozadi. \`innerHTML\` esa matn ichidagi HTML teglarni ham tushunadi va render qiladi.

2. **querySelectorAll qanday natija qaytaradi?**
   *Javob:* \`NodeList\` qaytaradi. Bu massivga o'xshash obyekt bo'lib, unda \`forEach\` ishlatish mumkin.

3. **Nega style.backgroundColor = "red" dan ko'ra classList.add("red-bg") yaxshi?**
   *Javob:* Dizaynni CSS faylda saqlash va faqat classlarni boshqarish kodni toza va tushunarli qiladi.`,
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

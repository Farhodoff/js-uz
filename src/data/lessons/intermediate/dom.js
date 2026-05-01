export const domBasics = {
  id: "m4",
  title: "DOM Asoslari",
  theory: `## DOM nima?
Document Object Model (DOM) - HTML hujjatining brauzer ichidagi daraxt (tree) ko'rinishidagi strukturasi.

### DOM Daraxti
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

## Elementlarni tanlash
Eng ko'p ishlatiladigan usullar:
- \`document.querySelector('.class')\` - birinchi topilgan elementni oladi.
- \`document.querySelectorAll('div')\` - barcha topilgan elementlarni massivga o'xshash (NodeList) shaklda oladi.
- \`document.getElementById('id')\` - ID bo'yicha oladi.

## Kontentni o'zgartirish
- \`textContent\` - faqat matnni o'zgartiradi.
- \`innerHTML\` - HTML teglari bilan birga o'zgartiradi.
- \`style\` - CSS xususiyatlarini o'zgartiradi.`,
  exercises: [
    {
      id: 1,
      title: "Elementni tanlash",
      instruction: "querySelector yordamida 'h1' elementini tanlab oling va uni 'title' o'zgaruvchisiga saqlang.",
      startingCode: "// Kodni shu yerga yozing\n",
      hint: "const title = document.querySelector('h1');",
      test: "if (!code.includes('document.querySelector')) return 'querySelector ishlatilmagan'; if (!code.includes('h1')) return 'h1 tegini tanlang';"
    },
    {
      id: 2,
      title: "Matnni o'zgartirish",
      instruction: "O'zgaruvchi 'title' ning textContent xususiyatini 'Salom JS' ga o'zgartiring.",
      startingCode: "const title = { textContent: '' }; // Mock element\n// Kodni shu yerga yozing\n",
      hint: "title.textContent = 'Salom JS';",
      test: "if (!code.includes('textContent')) return 'textContent ishlatilmadi'; if (title.textContent !== 'Salom JS') return 'Matn noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Style o'zgartirish",
      instruction: "title obyektining style.color xususiyatini 'red' ga o'zgartiring.",
      startingCode: "const title = { style: { color: '' } }; // Mock element\n// Kodni shu yerga yozing\n",
      hint: "title.style.color = 'red';",
      test: "if (title.style.color !== 'red') return 'Rang noto\\'g\\'ri';"
    }
  ]
};

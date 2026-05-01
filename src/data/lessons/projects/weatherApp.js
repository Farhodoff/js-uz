export const weatherApp = {
  id: "p2",
  title: "Ob-havo ilovasi (Mini-loyiha)",
  theory: `## Ob-havo ilovasi

Bu loyihada biz Fetch API orqali tashqi API bilan ishlashni o'rganamiz.

### Vizual sxema
\`\`\`mermaid
sequenceDiagram
    Foydalanuvchi->>Ilova: Shahar nomini kiritadi
    Ilova->>API: Fetch request (shahar)
    API-->>Ilova: JSON data (harorat, holat)
    Ilova->>Foydalanuvchi: Ma'lumotni ekranga chiqaradi
\`\`\`

### Asosiy qadamlar:
1. API URL ni tayyorlash.
2. \`fetch()\` orqali ma'lumot olish.
3. Javobni JSON ga o'girish.
4. Xatolarni \`try/catch\` bilan boshqarish.`,
  exercises: [
    {
      id: 1,
      title: "Fetch API asoslari",
      instruction: "Berilgan URL dan ma'lumot oling va consolega chiqaring.",
      startingCode: "const URL = 'https://jsonplaceholder.typicode.com/posts/1';\n\n// fetch ishlatib ma'lumot oling\n",
      hint: "fetch(URL).then(res => res.json()).then(data => console.log(data))",
      test: "if (!code.includes('fetch')) return 'fetch() funksiyasidan foydalaning';"
    },
    {
      id: 2,
      title: "Async/Await bilan ishlash",
      instruction: "Yuqoridagi amalni async/await yordamida bajaring.",
      startingCode: "async function getData() {\n  const URL = 'https://jsonplaceholder.typicode.com/posts/1';\n  // ...\n}\ngetData();",
      hint: "const res = await fetch(URL); const data = await res.json();",
      test: "if (!code.includes('await')) return 'await kalit so\\'zini ishlating';"
    }
  ]
};

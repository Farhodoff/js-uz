export const promises = {
  id: "a1",
  title: "Promises (Vaqtinchalik natija)",
  theory: `## Promises (Vaqtinchalik natija)

**Promise** – asinxron operatsiyaning yakuniy natijasini ifodalovchi obyekt.

### Promise Holatlari
\`\`\`mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Fulfilled: resolve()
    Pending --> Rejected: reject()
    Fulfilled --> [*]
    Rejected --> [*]
\`\`\`

### Asosiy metodlar:
- **.then()**: Muvaffaqiyatli yakunlanganda (resolve) ishlaydi.
- **.catch()**: Xato yuz berganda (reject) ishlaydi.
- **.finally()**: Har qanday holatda ham oxirida ishlaydi.

\`\`\`javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Tayyor!"), 1000);
});

p.then(res => console.log(res));
\`\`\``,
  exercises: [
    {
      id: 1,
      title: "Promise yaratish",
      instruction: "Yangi Promise yarating, u 1 soniyadan keyin 'Bajarildi' qiymatini resolve qilsin. Natijani .then() orqali consolega chiqaring.",
      startingCode: "// Kodni shu yerga yozing\n",
      hint: "new Promise(res => setTimeout(() => res('Bajarildi'), 1000)).then(console.log);",
      test: "if (!code.includes('new Promise')) return 'Promise yarating'; if (!code.includes('resolve') && !code.includes('res')) return 'resolve funksiyasini chaqiring';"
    },
    {
      id: 2,
      title: "Xatolarni boshqarish",
      instruction: "Promise ichida darhol reject('Xato!') qiling va uni .catch() orqali ushlab, xatoni consolega chiqaring.",
      startingCode: "// Kodni shu yerga yozing\n",
      hint: "new Promise((res, rej) => rej('Xato!')).catch(err => console.log(err));",
      test: "if (!code.includes('reject') && !code.includes('rej')) return 'reject ishlating'; if (!code.includes('.catch')) return '.catch() orqali xatoni ushlang';"
    }
  ]
};

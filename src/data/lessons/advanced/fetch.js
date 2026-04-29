export const fetchApi = {
  id: "a3",
  title: "Fetch API",
  theory: `## Fetch API nima?
Tashqi serverlardan ma'lumot olish uchun ishlatiladi.

\`\`\`javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json));
\`\`\`

**Metodlar:**
- \`GET\`: Ma'lumot olish.
- \`POST\`: Ma'lumot yuborish.
- \`PUT/PATCH\`: Ma'lumotni yangilash.
- \`DELETE\`: Ma'lumotni o'chirish.`,
  task: `// 1. 'https://jsonplaceholder.typicode.com/users' API dan foydalanib foydalanuvchilar ro'yxatini oling.
// 2. Olingan ma'lumotni konsolga chiqaring.

async function getUsers() {
  // ...
}

getUsers();`,
  hint: `async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);
}
getUsers();`
};

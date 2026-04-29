export const localStorageLesson = {
  id: "a4",
  title: "LocalStorage",
  theory: `## LocalStorage nima?
Brauzerda ma'lumotlarni saqlash usuli. Sahifa yangilansa ham ma'lumotlar saqlanib qoladi.

**Metodlar:**
- \`localStorage.setItem('key', 'value')\`: Saqlash.
- \`localStorage.getItem('key')\`: Olish.
- \`localStorage.removeItem('key')\`: O'chirish.
- \`localStorage.clear()\`: Hammasini tozalash.

**Eslatma:** Faqat string saqlash mumkin. Ob'ektlarni \`JSON.stringify()\` va \`JSON.parse()\` orqali saqlash kerak.`,
  task: `// 1. LocalStorage'ga 'username' kaliti bilan ismingizni saqlang.
// 2. Uni konsolga chiqarib ko'ring.
// 3. 'user' ob'ektini JSON ko'rinishida saqlang.

const user = { name: "Ali", age: 25 };
// ...`,
  hint: `localStorage.setItem('username', 'Ali');
console.log(localStorage.getItem('username'));

const user = { name: "Ali", age: 25 };
localStorage.setItem('user', JSON.stringify(user));
const savedUser = JSON.parse(localStorage.getItem('user'));`
};

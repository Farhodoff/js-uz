export const todoList = {
  id: "p1",
  title: "Todo List Loyihasi",
  theory: `## Yakuniy Loyiha: Todo List
Ushbu loyihada siz barcha o'rgangan bilimlaringizni jamlaysiz.

**Asosiy funksionallik:**
- Yangi vazifa qo'shish.
- Vazifani o'chirish.
- Vazifani bajarilgan deb belgilash.
- Ma'lumotlarni **LocalStorage**'da saqlash.

**Kod tuzilishi tavsiyasi:**
1. \`todos\` massivini yarating.
2. \`renderTodos()\` funksiyasini yozing (ekranga chiqarish uchun).
3. \`addTodo()\` funksiyasi.
4. \`saveToLocal()\` funksiyasi.`,
  task: `// 1. 'todos' massivi yarating.
// 2. 'addTodo' funksiyasini yozing, u ob'ekt qabul qilsin { id, text, completed }.
// 3. 'toggleTodo' funksiyasini yozing (completed holatini o'zgartirish).
// 4. 'deleteTodo' funksiyasini yozing.

let todos = [];
// ...`,
  hint: `let todos = [];
function addTodo(text) {
  todos.push({ id: Date.now(), text, completed: false });
}
function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
}
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
}`
};

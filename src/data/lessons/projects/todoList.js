export const todoList = {
  id: "p1",
  title: "Todo List Loyihasi",
  theory: `## Yakuniy Loyiha: Todo List
Ushbu loyihada siz barcha o'rgangan bilimlaringizni jamlaysiz.

### Loyiha Arxitekturasi
\`\`\`mermaid
graph LR
    A[Input] --> B{addTodo}
    B --> C[(Massiv)]
    C --> D[renderTodos]
    D --> E[HTML Sahifa]
    E --> F{delete/toggle}
    F --> C
\`\`\`

**Asosiy funksionallik:**
- **Create**: Yangi vazifa qo'shish.
- **Read**: Ro'yxatni ko'rish.
- **Update**: Bajarilgan deb belgilash.
- **Delete**: O'chirib tashlash.`,
  exercises: [
    {
      id: 1,
      title: "Massiv va Qo'shish",
      instruction: "Vazifalarni saqlash uchun 'todos' massivini yarating va 'addTodo' funksiyasini yozing.",
      startingCode: "let todos = [];\nfunction addTodo(text) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "todos.push({ id: 1, text, completed: false });",
      test: "addTodo('Test'); if (todos.length === 0) return 'Vazifa massivga qo\\'shilmadi'; if (todos[0].text !== 'Test') return 'Vazifa matni noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "O'chirish funksiyasi",
      instruction: "ID bo'yicha vazifani o'chiradigan 'deleteTodo' funksiyasini yozing.",
      startingCode: "let todos = [{ id: 1, text: 'Dars' }, { id: 2, text: 'Sport' }];\nfunction deleteTodo(id) {\n  // filter ishlating\n}\n",
      hint: "todos = todos.filter(t => t.id !== id);",
      test: "deleteTodo(1); if (todos.length !== 1) return 'Vazifa o\\'chirilmadi';"
    }
  ]
};

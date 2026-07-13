export const todoList = {
  id: "p1",
  title: "Loyiha: Todo List (Vazifalar boshqaruvchisi)",
  theory: `## Part 1: Beginner Analogy
Tasavvur qiling, Todo List bu sizning xaridlar ro'yxatingiz (shopping list). Siz do'konga borishdan oldin qog'ozga nimalar olish kerakligini yozasiz. Har bir narsani savatga solgach, ustidan chizib qo'yasiz. Agar biror narsa kerak bo'lmasa, uni o'chirib tashlaysiz. Xaridlar ro'yxati sizning **State** (ma'lumotlaringiz), qalam bilan yozish **Add** (qo'shish), ustidan chizish **Update/Complete** (bajarildi deb belgilash) va o'chirish o'chirg'ich bilan **Delete** (o'chirish) amallarini bildiradi. LocalStorage esa xaridlar ro'yxatini cho'ntagingizda saqlashga o'xshaydi, keyingi safar ham ko'rish uchun!

---

## Part 2: Deep Dive

### Under the Hood: State Management & DOM Update Cycles
Vanilla JS da state (holat) va DOM (sahifa ko'rinishi) alohida ishlaydi. Qachonki State o'zgarsa (massivga yangi element qo'shilsa), DOM avtomatik yangilanmaydi. Shuning uchun bizda \\\`render()\\\` funksiyasi bo'lishi kerak. Bu funksiya State ni oladi va uni DOM ga chizadi.

\\\`\\\`\\\`javascript
let todos = []; // State
function render() {
  const list = document.querySelector("#todo-list");
  list.innerHTML = ""; // DOM ni tozalash
  todos.forEach(todo => {
    // DOM ga chizish
  });
}
\\\`\\\`\\\`

### Event Delegation
Agar ro'yxatda 1000 ta vazifa bo'lsa va har biriga \\\`click\\\` event qo'shib chiqsak, bu xotiradan katta joy oladi. Buning o'rniga biz ota elementga (\\\`ul\\\`) bitta event quloq soluvchi (listener) qo'shamiz va \\\`event.target\\\` orqali qaysi farzand element bosilganini aniqlaymiz. Bu **Event Delegation** deb ataladi.

\\\`\\\`\\\`javascript
document.querySelector("#todo-list").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    // O'chirish amali
  }
});
\\\`\\\`\\\`

### Virtual DOM vs Vanilla JS diffing
React kabi kutubxonalar Virtual DOM ishlatadi. Ular eski va yangi State ni solishtirib (diffing), faqat o'zgargan qismini DOM ga yozadi. Bizning Vanilla JS misolimizda esa \\\`list.innerHTML = ""\\\` qilib butun ro'yxatni o'chirib, boshqatdan chizyapmiz. Bu kichik ilovalar uchun yaxshi, lekin katta ro'yxatlarda unumdorlikni tushiradi. Buni optimallashtirish uchun DocumentFragment yoki faqat yangi elementni \\\`appendChild\\\` qilish mumkin.

---

## Part 3: Edge Cases & Senior Interview Questions

### 1. Cross-Site Scripting (XSS) Attacks
Agar foydalanuvchi inputga \\\`<script>alert('Hacked')</script>\\\` deb yozsa va biz uni \\\`innerHTML\\\` bilan DOM ga qo'shsak, brauzer kodni ishga tushirib yuborishi mumkin. Bunga **XSS hujumi** deyiladi.
**Yechim:** \\\`innerHTML\\\` o'rniga \\\`textContent\\\` yoki \\\`document.createElement()\\\` ishlatish kerak, ular matnni faqat text sifatida qabul qiladi.

### 2. Large List Performance
Agar ro'yxatda 100,000 ta vazifa bo'lsa, butun DOM ni har safar yangilash sahifani qotirib qo'yadi.
**Yechim:** Pagination (sahifalash), Infinite Scrolling yoki Virtual Scrolling (faqat ekranda ko'rinib turgan elementlarni chizish) usullaridan foydalanish kerak.

---

## Diagram

\\\`\\\`\\\`mermaid
graph TD;
    A[Foydalanuvchi] -->|Vazifa kiritadi| B[Input field];
    B -->|Submit event| C[Add Function];
    C -->|Update| D[State Array];
    D -->|Save| E[LocalStorage];
    D -->|Call| F[Render Function];
    F -->|Draw| G[DOM list UI];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Vazifa obyekti",
      instruction: "Vazifa obyekti qanday tuzilishda bo'lishi kerakligini yarating (id, text, completed).",
      startingCode: "const todo = {\n  // shu yerga yozing\n};",
      hint: "id: 1, text: 'O\\'rganish', completed: false",
      test: "if (todo.id !== undefined && todo.text !== undefined && todo.completed !== undefined) return null; return 'Obyekt xato';"
    },
    {
      id: 2,
      title: "Ro'yxatga qo'shish",
      instruction: "Yangi todo obyektini todos massiviga qo'shing.",
      startingCode: "let todos = [];\nfunction addTodo(text) {\n  // push orqali qo'shing\n}",
      hint: "todos.push({ id: Date.now(), text, completed: false })",
      test: "addTodo('Test'); if (todos.length === 1 && todos[0].text === 'Test') return null; return 'Qo\\'shilmadi';"
    },
    {
      id: 3,
      title: "Ro'yxatdan o'chirish",
      instruction: "Filter yordamida berilgan id ga teng bo'lmagan elementlarni qaytaring.",
      startingCode: "let todos = [{id: 1, text: 'A'}];\nfunction removeTodo(id) {\n  // filter ishlating\n}",
      hint: "todos = todos.filter(t => t.id !== id);",
      test: "removeTodo(1); if(todos.length === 0) return null; return 'O\\'chirilmadi';"
    },
    {
      id: 4,
      title: "Holatni o'zgartirish",
      instruction: "Berilgan id dagi todo ning completed holatini teskarisiga o'zgartiring.",
      startingCode: "let todos = [{id: 1, text: 'A', completed: false}];\nfunction toggle(id) {\n  // map ishlating\n}",
      hint: "todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);",
      test: "toggle(1); if(todos[0].completed === true) return null; return 'O\\'zgarmadi';"
    },
    {
      id: 5,
      title: "Saqlash",
      instruction: "todos massivini localStorage ga saqlang.",
      startingCode: "function save(todos) {\n  // localStorage.setItem\n}",
      hint: "localStorage.setItem('todos', JSON.stringify(todos));",
      test: "save([{id:1}]); if(localStorage.getItem('todos')) return null; return 'Saqlanmadi';"
    },
    {
      id: 6,
      title: "O'qib olish",
      instruction: "localStorage dan todos ni o'qib oling yoki bo'sh massiv qaytaring.",
      startingCode: "function load() {\n  // getItem va parse\n}",
      hint: "return JSON.parse(localStorage.getItem('todos')) || [];",
      test: "const res = load(); if(Array.isArray(res)) return null; return 'Noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "HTML ga yozish (XSS xavfsiz)",
      instruction: "textContent yordamida li elementi yarating va unga matn bering.",
      startingCode: "function createLi(text) {\n  const li = document.createElement('li');\n  // matn qo'ying\n  return li;\n}",
      hint: "li.textContent = text;",
      test: "const el = createLi('Test'); if(el.textContent === 'Test') return null; return 'Xato';"
    },
    {
      id: 8,
      title: "Tozalash",
      instruction: "Faqat bajarilmagan vazifalarni (completed: false) qoldiring.",
      startingCode: "let todos = [{id:1, completed: true}, {id:2, completed: false}];\nfunction clearCompleted() {\n  // filter ishlating\n}",
      hint: "todos = todos.filter(t => !t.completed);",
      test: "clearCompleted(); if(todos.length === 1 && todos[0].id === 2) return null; return 'Xato';"
    },
    {
      id: 9,
      title: "Sanoqni topish",
      instruction: "Bajarilmagan vazifalar sonini qaytaring.",
      startingCode: "function getActiveCount(todos) {\n  // filter va length\n}",
      hint: "return todos.filter(t => !t.completed).length;",
      test: "const cnt = getActiveCount([{completed: false}, {completed: true}]); if(cnt===1) return null; return 'Xato';"
    },
    {
      id: 10,
      title: "Bo'sh matnni tekshirish",
      instruction: "Agar matn bo'sh bo'lsa yoki faqat probellardan iborat bo'lsa false qaytaring.",
      startingCode: "function isValid(text) {\n  // trim() ishlating\n}",
      hint: "return text.trim() !== '';",
      test: "if(!isValid('   ') && isValid('a')) return null; return 'Xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Todo list dagi vazifalarni qayerda saqlaymiz?",
      options: ["Obyektda", "Massivda", "Faqat DOMda", "Stringda"],
      answer: "Massivda",
      explanation: "Vazifalar ko'p bo'lganligi uchun ularni massivda saqlagan maqsadga muvofiq."
    },
    {
      id: 2,
      question: "LocalStorage'da ma'lumot qanday formatda saqlanadi?",
      options: ["Obyekt", "Massiv", "String", "Number"],
      answer: "String",
      explanation: "LocalStorage faqat string ma'lumotlarni qabul qiladi, shuning uchun JSON.stringify ishlatamiz."
    },
    {
      id: 3,
      question: "XSS hujumidan himoyalanish uchun nima qilish kerak?",
      options: ["innerHTML ishlatish", "textContent ishlatish", "O'zgaruvchilarni let qilib yaratish", "eval ishlatish"],
      answer: "textContent ishlatish",
      explanation: "textContent HTML teglarni matn sifatida o'qiydi va skript ishga tushishini oldini oladi."
    },
    {
      id: 4,
      question: "Vazifani o'chirish uchun qaysi massiv metodi eng mos keladi?",
      options: ["map()", "reduce()", "filter()", "forEach()"],
      answer: "filter()",
      explanation: "filter() metodi berilgan shartga mos kelmaydigan elementlarni chiqarib tashlab yangi massiv yaratadi."
    },
    {
      id: 5,
      question: "Event Delegation nima uchun kerak?",
      options: ["Xotirani tejash uchun", "Chiroyli ko'rinish uchun", "Ranglarni o'zgartirish uchun", "Server bilan ishlash uchun"],
      answer: "Xotirani tejash uchun",
      explanation: "Har bir elementga alohida eventListener qo'shmasdan, ota elementga qo'yish orqali resurslarni tejaymiz."
    },
    {
      id: 6,
      question: "Virtual DOM nima qiladi?",
      options: ["Sichqoncha harakatini kuzatadi", "DOM ning o'zgargan qisminigina chizadi", "HTML faylni o'chiradi", "Faqat Reactda bor, ishlatilmaydi"],
      answer: "DOM ning o'zgargan qisminigina chizadi",
      explanation: "Virtual DOM diffing orqali faqat o'zgargan elementlarni topib, real DOMni shunga moslab yangilaydi."
    },
    {
      id: 7,
      question: "Vazifalar ro'yxati 100 mingta bo'lsa, qanday optimallashtirish mumkin?",
      options: ["Virtual Scrolling (Virtualizatsiya)", "innerHTML ishlatish", "Faqat birinchi 10 tasini saqlash", "Kompyuterni o'chirish"],
      answer: "Virtual Scrolling (Virtualizatsiya)",
      explanation: "Virtual Scrolling faqat ekranda ko'rinadigan qismidagini render qilib unumdorlikni saqlaydi."
    },
    {
      id: 8,
      question: "Array ning qaysi metodi bilan barcha 'completed: false' larni ajratib olamiz?",
      options: ["find()", "filter()", "sort()", "every()"],
      answer: "filter()",
      explanation: "filter() to'plamdan shartga tushadigan bir nechta obyektdan iborat massiv qaytaradi."
    },
    {
      id: 9,
      question: "Qaysi xususiyat elementning qatorga o'chirilganligini bildiradi?",
      options: ["text-decoration: underline", "text-decoration: line-through", "font-weight: bold", "color: red"],
      answer: "text-decoration: line-through",
      explanation: "Bajarilgan vazifalar ustidan chizish uchun line-through ishlatiladi."
    },
    {
      id: 10,
      question: "Vazifa id si qanday bo'lishi kerak?",
      options: ["Har doim 1", "Massiv indeksi", "Takrorlanmas (Unique)", "String formatda 'id'"],
      answer: "Takrorlanmas (Unique)",
      explanation: "Agar id takrorlansa yoki indeksga bog'lansa, o'chirish va yangilashda muammolar kelib chiqadi."
    },
    {
      id: 11,
      question: "Inputdan olingan qiymatdagi ortiqcha bo'sh joylarni qanday olib tashlash mumkin?",
      options: ["slice()", "trim()", "replace()", "split()"],
      answer: "trim()",
      explanation: "trim() metodi matnning ikki chetidagi bo'sh joylarni olib tashlaydi."
    },
    {
      id: 12,
      question: "localStorage dan ma'lumotni o'qib olishda, agar ma'lumot yo'q bo'lsa nima qaytadi?",
      options: ["undefined", "null", "false", "[]"],
      answer: "null",
      explanation: "Agar so'ralgan kalit localStorage da topilmasa, null qaytadi."
    }
  ]
};

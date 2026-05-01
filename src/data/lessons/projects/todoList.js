export const todoList = {
  id: "p1",
  title: "Loyiha: Todo List (Vazifalar boshqaruvchisi)",
  theory: `## 1. NEGA VA NIMA?
Dasturlashni o'rganishning eng yaxshi usuli — bu real loyiha qurishdir. **Todo List** — bu barcha bilimlarni (Obyektlar, Massivlar, DOM, Eventlar, LocalStorage) birlashtiruvchi mukammal loyiha.

Dars oxirida siz o'zingizning shaxsiy vazifalar boshqaruvchingizni qurasiz!

---

## 2. LOYIHA TUZILMASI (Tushuntir → Ko'rsat → Bajartir)
Loyihani 4 ta asosiy qismga bo'lamiz:

1.  **State (Ma'lumot):** Vazifalarni massivda saqlash.
2.  **Add (Qo'shish):** Yangi vazifa yaratish.
3.  **Delete (O'chirish):** Massivdan olib tashlash.
4.  **Save (Saqlash):** LocalStorage'ga yozib qo'yish.

**Ko'rsat (Ma'lumot tuzilmasi):**
\`\`\`javascript
let todos = [
  { id: 1, text: "JS o'rganish", completed: false },
  { id: 2, text: "Kitob o'qish", completed: true }
];
\`\`\`

**Mashq:** Bo'sh \`todos\` massivini yarating va unga yangi vazifa qo'shuvchi funksiya yozing.

---

## 3. DOM BILAN BOG'LASH
HTML'dagi \`ul\` ro'yxatini massivdagi ma'lumotlar bilan to'ldirish (render) kerak.

**Ko'rsat:**
\`\`\`javascript
function render() {
  const list = document.querySelector("#todo-list");
  list.innerHTML = ""; // Oldingisini tozalash
  todos.forEach(todo => {
    list.innerHTML += \`<li>\${todo.text}</li>\`;
  });
}
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR ⚠️
1.  **ID muammosi:** Vazifalarni o'chirishda bir xil ID bo'lib qolsa, hamma bir xil nomli vazifalar o'chib ketadi. (Maslahat: \`Date.now()\` ishlating).
2.  **Refereshdan keyin ma'lumot yo'qolishi:** LocalStorage'dan ma'lumotni o'qib olish (getItem) esdan chiqadi.

---

## 5. BUZIB KO'RISH 🧐
**Nima bo'ladi agar foydalanuvchi bo'sh matn yuborsa?**
\`\`\`javascript
if (input.value.trim() === "") return alert("Matn yozing!");
\`\`\`
**Xulosa:** Har doim foydalanuvchi kiritgan ma'lumotni tekshirish (validation) kerak.

---

## 6. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **Vazifani o'chirishning eng yaxshi usuli? (Junior)**
   *Javob:* \`filter()\` metodi orqali: \`todos = todos.filter(t => t.id !== id)\`.

2. **Completed (bajarildi) holatini qanday o'zgartiramiz? (Junior - Amaliy)**
   *Vazifa:* \`map()\` orqali berilgan ID'li vazifaning \`completed\` qiymatini teskarisiga o'zgartiring (\`!\`).

3. **LocalStorage'ga qanday saqlaymiz? (Junior)**
   *Javob:* \`localStorage.setItem("todos", JSON.stringify(todos))\`.

4. **Event Delegation nima? (Middle)**
   *Javob:* Har bir \`li\` ga emas, balki ularning otasi \`ul\` ga bitta \`click\` eventini qo'yib, \`event.target\` orqali qaysi element bosilganini aniqlash.

5. **Loyiha yuklanganda ma'lumotni qanday olamiz? (Junior - Amaliy)**
   *Vazifa:* \`JSON.parse(localStorage.getItem("todos")) || []\` kodini tushuntiring.

6. **Vazifalarni saralash (Sort). (Middle - Amaliy)**
   *Vazifa:* Bajarilmagan vazifalarni ro'yxatning tepasiga chiqaradigan funksiya yozing.

7. **Enter tugmasini qanday tutamiz? (Junior - Amaliy)**
   *Vazifa:* Inputda \`keydown\` eventini eshiting va \`event.key === "Enter"\` bo'lganda qo'shish funksiyasini chaqiring.

8. **Vazifalarni tahrirlash (Edit). (Middle)**
   *Javob:* \`prompt()\` yoki inputni almashtirish orqali vazifa matnini yangilash.

9. **Barcha bajarilganlarni o'chirish. (Junior - Amaliy)**
   *Vazifa:* \`filter(t => !t.completed)\` orqali faqat bajarilmaganlarni qoldiring.

10. **Statistika chiqarish. (Junior - Amaliy)**
    *Vazifa:* Umumiy vazifalar soni va bajarilganlari sonini ko'rsating.

11. **Xavfsizlik (XSS). (Middle)**
    *Javob:* \`innerHTML\` o'rniga \`textContent\` yoki \`createElement\` ishlatish xavfsizroq.

12. **Nega ID sifatida index ishlatish yomon? (Middle)**
    *Javob:* Chunki massivdan element o'chsa, indekslar o'zgarib ketadi va keyingi amallar noto'g'ri elementga ta'sir qilishi mumkin.

---

## 7. FINAL CHALLENGE 🏆
Todo List loyihangizga quyidagi funksiyalarni qo'shing:
1.  Vazifani o'chirish tugmasi.
2.  Vazifa ustiga bossa, unga chiziq tortilishi (CSS \`text-decoration: line-through\`).
3.  Vazifalar sonini ko'rsatuvchi "Counter".

---

## 8. XULOSA
Tabriklayman! Siz endi haqiqiy dasturchilar kabi real va foydali dastur qurishni bilasiz!
`,
  exercises: [
    {
      id: 1,
      title: "Add Function",
      instruction: "Vazifa qo'shuvchi funksiya yozing (ID ni Date.now() bilan yarating).",
      startingCode: "let todos = [];\nfunction add(text) {\n  // Bu yerga yozing\n}\n",
      hint: "todos.push({ id: Date.now(), text, completed: false });",
      test: "add('Test'); if (todos.length > 0) return null; return 'Vazifa qo\\'shilmadi';"
    },
    {
      id: 2,
      title: "Delete Function",
      instruction: "ID bo'yicha filter orqali o'chiring.",
      startingCode: "let todos = [{id: 1, text: 'A'}];\nfunction remove(id) {\n  // Filter\n}\n",
      hint: "todos = todos.filter(t => t.id !== id);",
      test: "remove(1); if (todos.length === 0) return null; return 'O\\'chirish ishlamadi';"
    }
  ]
};

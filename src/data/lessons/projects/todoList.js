export const todoList = {
  id: "p1", title: "Todo List",
  theory: `## Todo List Loyihasi

Bu loyihada quyidagilarni o'rganamiz:
- DOM manipulyatsiya
- Event listeners
- Array metodlari
- localStorage

**Loyiha tuzilmasi:**
1. Vazifalar ro'yxatini saqlash
2. Qo'shish / o'chirish funksiyalari
3. Bajarilgan/bajarilmagan holat
4. LocalStorage'ga saqlash`,
  task: "// Mini Todo: Vazifalar massiviga qo'shish va o'chirish\n\nlet vazifalar = ['Dars o\\'qish', 'Kod yozish'];\n\nfunction qoshish(yangi_vazifa) {\n  // yozing\n}\n\nfunction ochirish(index) {\n  // yozing\n}\n\nqoshish('Sport qilish');\nochirish(0);\nconsole.log(vazifalar);",
  hint: "function qoshish(v) { vazifalar.push(v); } function ochirish(i) { vazifalar.splice(i, 1); }"
};

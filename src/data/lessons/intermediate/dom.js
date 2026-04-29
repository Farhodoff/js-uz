export const domBasics = {
  id: "m4",
  title: "DOM Asoslari",
  theory: `## DOM nima?
Document Object Model — HTML elementlarini JS orqali boshqarish imkonini beradi.

**Elementlarni tanlash:**
- \`document.getElementById('id')\`
- \`document.querySelector('.class')\`
- \`document.querySelectorAll('div')\`

**Elementlarni o'zgartirish:**
- \`element.textContent = "Yangi matn"\`
- \`element.innerHTML = "<b>Qalin matn</b>"\`
- \`element.style.color = "red"\`
- \`element.classList.add('active')\``,
  task: `// 1. ID'si 'title' bo'lgan elementni tanlab oling.
// 2. Uning matnini "Salom DOM" ga o'zgartiring.
// 3. Uning rangini ko'k (blue) qiling.

// ...`,
  hint: `const title = document.getElementById('title');
title.textContent = "Salom DOM";
title.style.color = "blue";`
};

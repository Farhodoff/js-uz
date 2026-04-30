export const domBasics = {
  id: "m4",
  title: "DOM Asoslari",
  theory: `## DOM nima?
Document Object Model - HTML hujjatining brauzer ichidagi daraxt ko'rinishi. JavaScript DOM orqali elementlarni topadi, matnini o'zgartiradi, style qo'shadi va foydalanuvchi bilan interaktiv ishlaydi.

## Element tanlash
- \`document.getElementById('id')\`
- \`document.querySelector('.class')\`
- \`document.querySelectorAll('div')\`

## O'zgartirish
- \`element.textContent = "Yangi matn"\`
- \`element.innerHTML = "<b>Qalin matn</b>"\`
- \`element.style.color = "red"\`
- \`element.classList.add('active')\`

## Nima uchun muhim?
DOM yordamida sahifa faqat ko'rinadigan emas, balki foydalanuvchiga javob qaytaradigan tizimga aylanadi. Shu sababli frontendning katta qismi aynan DOM bilan ishlashdan iborat.

## Quiz
1. DOM nima?
2. \`querySelector\` va \`getElementById\` farqi nima?
3. \`textContent\` va \`innerHTML\` farqi nima?`,
  task: `// 1. ID'si 'title' bo'lgan elementni tanlab oling.
// 2. Uning matnini "Salom DOM" ga o'zgartiring.
// 3. Uning rangini ko'k (blue) qiling.

// ...`,
  hint: `const title = document.getElementById('title');
title.textContent = "Salom DOM";
title.style.color = "blue";`
};

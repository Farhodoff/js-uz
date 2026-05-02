export const events = {
  id: "m5",
  title: "Hodisalar (Events)",
  level: "Intermediate",
  description: "Foydalanuvchi harakatlarini (klik, yozish, yuborish) JS orqali boshqarish.",
  theory: `
# Events – Bu nima va nima uchun kerak?

**Event** (Hodisa) — bu foydalanuvchi yoki brauzer tomonidan amalga oshirilgan biron bir harakat. Masalan: tugma bosilishi, sichqoncha harakati, formani yuborish.

## 1. NEGA kerak?
Saytingiz "jonli" bo'lishi uchun u foydalanuvchi bilan muloqot qilishi kerak. Masalan, "Savatga qo'shish" tugmasi bosilganda biror narsa sodir bo'lishi shart. Eventsiz sayt shunchaki qog'ozdagi rasmdek gap.

## 2. SODDALIK (Analogiya)
Buni xuddi uydagi chiroq tugmasi (vyklyuchatel) deb tasavvur qiling. Siz uni bosasiz (Event), natijada chiroq yonadi (Callback funksiya).

## 3. STRUKTURA

### A. addEventListener
Bu metod yordamida elementga hodisani "kutish" xususiyatini qo'shamiz:
\`\`\`javascript
const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  console.log("Tugma bosildi!");
});
\`\`\`

### B. Event Obyekti (e)
Har bir hodisa sodir bo'lganda, JS funksiyaga **event** obyektini yuboradi:
- **e.target:** Aynan qaysi element bosilgani.
- **e.preventDefault():** Brauzerning standart amalini to'xtatish (masalan, formani yubormaslik).
- **e.type:** Hodisa turi (click, input, etc).

\`\`\`javascript
btn.addEventListener("click", (e) => {
  console.log(e.target); // Bosilgan elementni chiqaradi
});
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const link = document.querySelector("a");
link.addEventListener("click", (e) => {
  e.preventDefault(); // Sahifa yangilanishini to'xtatadi
  console.log("Link bosildi, lekin sahifa o'zgarmadi.");
});
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Qavslarni noto'g'ri qo'yish:** \`btn.addEventListener("click", myFunc())\` deb yozsangiz, funksiya darhol ishlaydi. To'g'ri usul: \`btn.addEventListener("click", myFunc)\`.
2. **Event nomini adashtirish:** \`onclick\` emas, \`click\` deb yozish kerak (addEventListener ichida).

## 6. SAVOLLAR (12 ta)
1. Event (Hodisa) nima?
2. \`addEventListener\` nima uchun kerak?
3. Eng ko'p ishlatiladigan 3 ta event turini ayting.
4. \`event.target\` nima vazifani bajaradi?
5. \`event.preventDefault()\` nima uchun ishlatiladi?
6. Bitta elementga bir nechta listener qo'shish mumkinmi?
7. \`click\` va \`dblclick\` farqi nima?
8. Input ichiga biror narsa yozilganda qaysi event ishlaydi?
9. Event bubbling nima?
10. Event listenerni qanday o'chirish mumkin (\`removeEventListener\`)?
11. \`DOMContentLoaded\` eventi nima?
12. Keyboard eventlari (\`keydown\`, \`keyup\`) nima uchun kerak?`,

  exercises: [
    {
      id: 1,
      title: "Click Event",
      instruction: "Berilgan 'btn' obyektiga 'click' eventini qo'shing va u bosilganda consolega 'OK' chiqaring.",
      startingCode: "const btn = { addEventListener: (type, cb) => btn.click = cb }; // Mock\n// Kodni shu yerga yozing\n",
      hint: "btn.addEventListener('click', () => console.log('OK'));",
      test: "if (code.includes('addEventListener')) { btn.click(); if (logs.includes('OK')) return null; } return 'Consolega OK chiqmadi';"
    },
    {
      id: 2,
      title: "Prevent Default",
      instruction: "Eventning standart harakatini to'xtatuvchi metodni chaqiring.",
      startingCode: "const event = { preventDefault: () => event.stopped = true };\nfunction handler(e) {\n  // Bu yerga yozing\n}\nhandler(event);",
      hint: "e.preventDefault();",
      test: "if (event.stopped) return null; return 'preventDefault() chaqirilmadi';"
    }
  ]
};

export const events = {
  id: "m5",
  title: "Hodisalar (Events)",
  theory: `## 1. HODISALAR NIMA?
Hodisa (Event) — bu foydalanuvchi yoki brauzer tomonidan amalga oshirilgan biron bir harakat. Masalan: tugma bosilishi, sichqoncha harakati, formani yuborish va h.k.

---

## 2. addEventListener
Bu metod yordamida biz elementga biron bir hodisani "kutish" (listen) va u sodir bo'lganda funksiyani ishga tushirish xususiyatini qo'shamiz.

\`\`\`javascript
const btn = document.querySelector('button');

btn.addEventListener('click', (event) => {
  console.log("Tugma bosildi!");
});
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant U as Foydalanuvchi
    participant B as Brauzer
    participant JS as JavaScript
    U->>B: Klik (Click)
    B->>JS: Event Trigger
    JS->>JS: Callback funksiya
    JS-->>B: UI yangilash
\`\`\`

---

## 3. EVENT OBYEKTI
Har bir hodisa sodir bo'lganda, JS funksiyaga **event** obyektini yuboradi. Unda hodisa haqida batafsil ma'lumotlar bo'ladi:

- **event.target:** Hodisa aynan qaysi elementda sodir bo'lgani.
- **event.type:** Hodisa turi (click, input, etc).
- **event.preventDefault():** Brauzerning standart amalini to'xtatish (masalan, formani yubormaslik).

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **event.target va event.currentTarget farqi nima?**
   *Javob:* \`target\` — bu hodisani boshlagan element. \`currentTarget\` — bu hodisa listeneri biriktirilgan element.

2. **Event bubbling (pufakcha kabi ko'tarilish) nima?**
   *Javob:* Hodisa sodir bo'lganda, u eng quyi elementdan boshlab yuqoridagi ota elementlarigacha "ko'tariladi".

3. **Nega preventDefault() ishlatiladi?**
   *Javob:* Brauzerning standart harakatini (masalan: link bosilganda sahifa o'zgarishi, forma yuborilganda sahifa yangilanishi) to'xtatish uchun.`,
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

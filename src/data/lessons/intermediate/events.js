export const events = {
  id: "m5",
  title: "Hodisalar (Events)",
  theory: `## Hodisalar (Events)
Hodisa - foydalanuvchi yoki brauzer tomonidan yuzaga keladigan signal. 

### Event Loop va Hodisalar
\`\`\`mermaid
sequenceDiagram
    Foydalanuvchi->>Brauzer: Tugmani bosadi (Click)
    Brauzer->>Event Queue: Callback funksiyani qo'shadi
    Event Loop->>Call Stack: Callback'ni ishga tushiradi
    Call Stack->>Konsol: "Bosildi!" yozuvini chiqaradi
\`\`\`

## addEventListener
Bu metod yordamida elementga biror amalni "eshitish" (listen) funksiyasini qo'shamiz.

\`\`\`javascript
const btn = document.querySelector('button');
btn.addEventListener('click', (event) => {
  console.log("Bosildi!");
});
\`\`\`

## Ko'p ishlatiladigan turlar:
- **click**: Tugma bosilganda.
- **input**: Inputga matn yozilganda.
- **submit**: Forma yuborilganda.
- **keydown**: Klaviaturadagi tugma bosilganda.`,
  exercises: [
    {
      id: 1,
      title: "Click Event",
      instruction: "Berilgan 'btn' obyektiga 'click' eventini qo'shing va u bosilganda consolega 'OK' chiqaring.",
      startingCode: "const btn = { addEventListener: (type, cb) => btn.click = cb }; // Mock\n// Kodni shu yerga yozing\n",
      hint: "btn.addEventListener('click', () => console.log('OK'));",
      test: "if (!code.includes('addEventListener')) return 'addEventListener ishlatilmagan'; btn.click(); if (!logs.includes('OK')) return 'Consolega OK chiqmadi';"
    },
    {
      id: 2,
      title: "Input Event",
      instruction: "Inputga biror narsa yozilganda consolega 'Yozilmoqda...' chiqaring.",
      startingCode: "const input = { addEventListener: (type, cb) => input.onInput = cb };\n// Kodni shu yerga yozing\n",
      hint: "input.addEventListener('input', () => console.log('Yozilmoqda...'));",
      test: "if (!code.includes('input')) return 'input eventidan foydalaning'; input.onInput(); if (!logs.includes('Yozilmoqda...')) return 'Natija noto\\'g\\'ri';"
    }
  ]
};

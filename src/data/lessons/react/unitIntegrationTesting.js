export const unitIntegrationTesting = {
  title: "Unit va Integration Testing",
  content: `
# Unit va Integration Testing

Dastur kodining ma'lum bir qismi biz kutgandek ishlayotganiga ishonch hosil qilish uchun avtomatlashtirilgan testlar yoziladi.

### Unit Testing
* **Vazifasi:** Eng kichik qismlarni (masalan, qandaydir hisob-kitob funksiyasi, custom hook yoki util funksiyani) qolgan hamma narsadan izolyatsiya qilingan holatda test qilish.
* **Vitest:** Hozirgi kunda Jest o'rnini egallayotgan, Vite bilan ishlaydigan juda tezkor test freymvorki. Sanoatda tobora standartga aylanmoqda.

### Integration Testing
* **Vazifasi:** Bir nechta alohida komponentlar yoki funksiyalar birgalikda to'g'ri ishlayotganini tekshirish. Masalan, foydalanuvchi formaga ma'lumot kiritib, "Yuborish" tugmasini bosganda state to'g'ri o'zgarganini va ekranda yangi xabar chiqqanini tekshirish.
\`,
  code: \`import React from "react";

export default function App() {
  return (
    <div>
      <h1>Unit Testing Namuna Tushunchasi</h1>
      <pre style={{ background: '#eee', padding: 10, borderRadius: 5 }}>
{`// math.js
export function add(a, b) { return a + b; }

// math.test.js
import { expect, test } from 'vitest';
import { add } from './math';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});`}
      </pre>
      <p>Testlar odatda terminalda ishga tushiriladi va koddagi kutilmagan o'zgarishlarni (regressions) oldini oladi.</p>
    </div>
  );
}\`,
  exercises: [],
  quizzes: []
};

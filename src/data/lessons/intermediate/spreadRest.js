export const spreadRest = {
  id: "m2",
  title: "Spread & Rest Operatorlari (...)",
  theory: `## 1. KIRISH
Uchta nuqta (\`...\`) JavaScriptda ikki xil vazifani bajaradi: **Spread** (yoyish) va **Rest** (yig'ish).

---

## 2. SPREAD OPERATORI (Yoyish)
Spread operatori massiv yoki obyekt ichidagi elementlarni "yoyib" yuboradi.

### Massivlarni birlashtirish
\`\`\`javascript
const son1 = [1, 2];
const son2 = [3, 4];
const birlashgan = [...son1, ...son2]; // [1, 2, 3, 4]
\`\`\`

### Obyektdan nusxa olish
\`\`\`javascript
const user = { name: "Ali", age: 20 };
const updatedUser = { ...user, age: 21 }; // Name qoladi, age o'zgaradi
\`\`\`

---

## 3. REST OPERATORI (Yig'ish)
Rest operatori qolgan barcha qiymatlarni bitta massivga "yig'ib" oladi. Odatda funksiya parametrlarida ishlatiladi.

\`\`\`javascript
function sum(...sonlar) {
  // 'sonlar' endi massivdir
  return sonlar.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
\`\`\`

\`\`\`mermaid
graph LR
    A[Spread] --> B[Massiv/Obyektni yoyish]
    C[Rest] --> D[Qiymatlarni massivga yig'ish]
    style A fill:#dfd,stroke:#333
    style C fill:#fdd,stroke:#333
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Middle)

1. **Spread va Rest farqi nima?**
   *Javob:* Spread — yoyadi (extract), Rest — yig'adi (collect).

2. **Rest operatorini funksiya parametrlarining o'rtasida ishlatsa bo'ladimi?**
   *Javob:* Yo'q, Rest har doim oxirgi parametr bo'lishi shart.

3. **Obyektni spread qilishda 'shallow copy' nima degani?**
   *Javob:* Bu faqat birinchi darajali xususiyatlarni nusxalaydi degani. Ichma-ich joylashgan obyektlar baribir bitta manzilga (reference) qarab qoladi.`,
  exercises: [
    {
      id: 1,
      title: "Massivlarni birlashtirish",
      instruction: "Spread yordamida 'arr1' va 'arr2' ni 'combined' massiviga birlashtiring.",
      startingCode: "const arr1 = [1, 2];\ const arr2 = [3, 4];\nconst combined = // bu yerga yozing\n\nconsole.log(combined);",
      hint: "const combined = [...arr1, ...arr2];",
      test: "if (logs[0].includes('1,2,3,4') || logs[0].includes('1, 2, 3, 4')) return null; return 'Natija [1, 2, 3, 4] bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Rest parametr",
      instruction: "Funksiya birinchi sonni 'first'ga, qolganlarini esa 'others' massiviga olsin.",
      startingCode: "function test(first, ...others) {\n  console.log(others);\n}\n\ntest(10, 20, 30, 40);",
      hint: "Others massivida 20, 30, 40 bo'lishi kerak.",
      test: "if (logs[0].includes('20') && logs[0].includes('40')) return null; return 'Others massivi noto\\'g\\'ri';"
    }
  ]
};

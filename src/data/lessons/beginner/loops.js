export const loops = {
  id: "loops",
  title: "Looplar va Iteratsiyalar",
  theory: `## 1. LOOPLAR NIMA?
Looplar (sikllar) — bir xil kodni ma'lum bir shart asosida qayta-qayta bajarish uchun ishlatiladi. JavaScriptda 5 xil asosiy loop turi mavjud.

---

## 2. ASOSIY LOOP TURLARI

### A. for loop — Eng keng tarqalgan
Takrorlanishlar soni aniq bo'lganda ishlatiladi.
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i); // 1, 2, 3, 4, 5
}
\`\`\`

### B. while loop — Shartga bog'liq
Shart to'g'ri bo'lguncha ishlaydi. Takrorlanish soni noma'lum bo'lganda qulay.
\`\`\`javascript
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
\`\`\`

### C. do...while — Kamida bir marta ishlaydi
Shart oxirida tekshirilgani uchun, kod kamida bir marta bajarilishi kafolatlanadi.
\`\`\`javascript
let i = 1;
do {
  console.log(i);
  i++;
} while (i > 10); // Shart noto'g'ri, lekin 1 marta ishlaydi
\`\`\`

---

## 3. ZAMONAVIY LOOPLAR

### D. for...in — Obyekt kalitlari uchun
Obyekt ichidagi xususiyatlarni (property) aylanib chiqish uchun ishlatiladi.
\`\`\`javascript
const user = { name: "Ali", age: 25 };
for (let key in user) {
  console.log(key + ": " + user[key]);
}
\`\`\`

### E. for...of — Qiymatlar uchun
Massiv yoki string kabi iterable (aylanish mumkin bo'lgan) obyektlarning qiymatlari bo'ylab yuradi.
\`\`\`javascript
const ranglar = ["qizil", "yashil"];
for (let rang of ranglar) {
  console.log(rang);
}
\`\`\`

---

## 4. TAQQOSLASH JADVALI

| Loop | Nima uchun? | Nimani aylantiradi? |
|---|---|---|
| **for** | Sanoq aniq bo'lsa | Indekslarni |
| **while** | Shartga bog'liq bo'lsa | - |
| **for...in** | Obyektlar uchun | Kalitlarni (key) |
| **for...of** | Massivlar uchun | Qiymatlarni (value) |

---

## 5. INTERVYU SAVOLLARI (Middle)

1. **for...in va for...of farqi nima?**
   *Javob:* \`for...in\` indekslarni yoki kalitlarni qaytaradi, \`for...of\` esa qiymatlarni qaytaradi.

2. **Obyektda for...of ishlatsa bo'ladimi?**
   *Javob:* Yo'q, chunki oddiy obyektlar iterable emas. Buning uchun \`Object.keys()\` yoki \`Object.entries()\` ishlatish kerak.

3. **do...while qachon kerak bo'ladi?**
   *Javob:* Qachonki biz shartdan qat'iy nazar kod blokini kamida bir marta ishga tushirishimiz shart bo'lganda.`,
  exercises: [
    {
      id: 1,
      title: "1 dan 100 gacha yig'indi",
      instruction: "for sikli yordamida 1 dan 100 gacha bo'lgan sonlar yig'indisini 'sum' o'zgaruvchisiga hisoblang.",
      startingCode: "let sum = 0;\n// Bu yerga yozing\n\nconsole.log(sum);",
      hint: "for (let i = 1; i <= 100; i++) { sum += i; }",
      test: "if (logs.includes('5050')) return null; return 'Natija 5050 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Obyektni aylanish",
      instruction: "for...in yordamida 'car' obyektining hamma qiymatlarini konsolga chiqaring.",
      startingCode: "const car = { model: 'Tesla', year: 2023 };\n// for...in ishlatib value larni chiqaring\n",
      hint: "for (let key in car) { console.log(car[key]); }",
      test: "if (logs.includes('Tesla') && logs.includes('2023')) return null; return 'Tesla va 2023 chiqishi kerak';"
    },
    {
      id: 3,
      title: "Massiv qiymatlari",
      instruction: "for...of yordamida 'fruits' massivi elementlarini chiqaring.",
      startingCode: "const fruits = ['Olma', 'Banan', 'Anor'];\n// Bu yerga yozing\n",
      hint: "for (let f of fruits) { console.log(f); }",
      test: "if (logs.includes('Olma') && logs.includes('Anor')) return null; return 'Hamma mevalar chiqishi kerak';"
    }
  ]
};

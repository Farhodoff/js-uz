export const scopeLesson = {
  id: "b8",
  title: "Scope va Closure (Doira va Yopilish)",
  theory: `## 1. SCOPE NIMA?
**Scope** (doira) — bu o'zgaruvchi va funksiyalarning kodingizda qayerda "ko'rinishi" va "ishlatilishi" mumkinligini belgilaydigan hududdir.

### Scope turlari:
1.  **Global Scope:** Hujjatning eng yuqori qismida e'lon qilingan o'zgaruvchilar. Ularni istalgan joyda ishlatish mumkin.
2.  **Function Scope:** Faqat funksiya ichida e'lon qilingan o'zgaruvchilar.
3.  **Block Scope:** \`let\` va \`const\` bilan \`{ }\` jingalak qavslar ichida yaratilgan o'zgaruvchilar.

---

## 2. SCOPE CHAIN (Doiralar zanjiri)
Agar JavaScript o'zgaruvchini joriy doirada topa olmasa, u bitta yuqoriga chiqadi va o'sha yerdan qidiradi. Bu jarayon o'zgaruvchi topilguncha yoki global doiraga yetguncha davom etadi.

\`\`\`mermaid
graph TD
    A[Global Scope] --> B[Function Scope]
    B --> C[Block Scope]
    C -.-> |"Qidiruv tepaga"| B
    B -.-> |"Qidiruv tepaga"| A
\`\`\`

---

## 3. CLOSURE (Yopilish) NIMA? ⭐
**Closure** — bu ichki funksiyaning tashqi funksiya o'zgaruvchilariga kirish huquqiga ega bo'lishi. Hatto tashqi funksiya o'z ishini tugatgan bo'lsa ham, ichki funksiya o'sha o'zgaruvchilarni "eslab qoladi".

\`\`\`javascript
function tashqi() {
  let sanoq = 0;
  return function ichki() {
    sanoq++;
    console.log(sanoq);
  }
}

const counter = tashqi();
counter(); // 1
counter(); // 2
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **let va var ning scope bo'yicha farqi nima?**
   *Javob:* \`var\` function-scoped, \`let\` esa block-scoped hisoblanadi.

2. **Closure nima uchun kerak?**
   *Javob:* Ma'lumotlarni yashirish (private variables) va funksiyalarga "xotira" berish uchun.

3. **Global o'zgaruvchilar ko'p bo'lishi nega yomon?**
   *Javob:* "Global namespace pollution" — ya'ni turli qismlarda bir xil nomli o'zgaruvchilar to'qnashib qolishi mumkin.`,
  exercises: [
    {
      id: 1,
      title: "Block Scope",
      instruction: "Blok ichida 'const x = 10' yarating va uni blokdan tashqarida log qilib ko'ring (xato bo'lishi kerak).",
      startingCode: "if (true) {\n  // x ni yarating\n}\nconsole.log(x);",
      hint: "const x = 10;",
      test: "if (output.includes('ReferenceError')) return null; return 'Xato chiqishi kerak (ReferenceError)';"
    },
    {
      id: 2,
      title: "Oddiy Closure",
      instruction: "createSecret funksiyasi 'secret' o'zgaruvchisini qaytaradigan funksiya qaytarsin.",
      startingCode: "function createSecret(msg) {\n  const secret = 'Yashirin: ' + msg;\n  return function() {\n    // secretni qaytaring\n  }\n}",
      hint: "return secret;",
      test: "const fn = new Function('msg', code + ' return createSecret(msg);')('test'); if (fn() === 'Yashirin: test') return null; return 'Closure to\\'g\\'ri ishlamadi';"
    }
  ]
};

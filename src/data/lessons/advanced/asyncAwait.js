export const asyncAwait = {
  id: "async-await",
  title: "🎯 Async/Await — Asinxronlikning Cho'qqisi",
  level: "Murakkab",
  description: "Async/await orqali asinxron kodni oddiy sinxron kabi yozish.",
  theory: `## 1. NEGA KERAK? (Sabab)
**Promise Hell (Zanjir uzunligi):** Ketma-ket \`.then()\`lar kodni o'qishni qiyinlashtiradi. **Async/Await** esa kodni xuddi sinxron (oddiy) kod kabi o'qish imkonini beradi.

## 2. SODDALIK (Analogiya)

**Navbatda turish:**
- \`async\`: "Men navbatda turyapman" (funksiya turi).
- \`await\`: "Mening navbatim kelguncha kutib turaman" (Promise natijasini kutish).

## 3. STRUKTURA

### A. Async Funksiya
Har doim Promise qaytaradi.
\`\`\`javascript
async function getData() {
  return "data"; // Promise { 'data' }
}
\`\`\`

### B. Await
Promise natijasi chiqquncha kodni o'sha joyda to'xtatib turadi.
\`\`\`javascript
const response = await fetch('/api/data');
const data = await response.json();
\`\`\`

### C. Xatolar (Try/Catch)
Asinxron xatolarni ushlashning eng yaxshi yo'li.

## 4. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. async kalit so'zi nima qiladi?</summary>
Funksiyani asinxron qiladi va u har doim Promise qaytaradi.
</details>

<details>
<summary>2. await nima qiladi?</summary>
Promise yakunlanishini kutadi.
</details>

<details>
<summary>3. await-ni oddiy funksiyada ishlatsa bo'ladimi?</summary>
Yo'q, faqat async funksiya ichida.
</details>

<details>
<summary>4. Async/await bilan xatolar qanday ushlanadi?</summary>
try...catch bloki bilan.
</details>

<details>
<summary>5. Async funksiya return 10 qilsa nima qaytadi?</summary>
Promise obyekt, qiymati 10.
</details>

<details>
<summary>6. Parallel so'rovlar uchun nima ishlatiladi?</summary>
Promise.all([await fetch1, await fetch2]).
</details>

<details>
<summary>7. forEach ichida await qanday ishlaydi?</summary>
Kutilganidek ishlamasligi mumkin (parallel emas).
</details>

<details>
<summary>8. Top-level await nima?</summary>
Modulning eng yuqori qismida async-siz await ishlatish.
</details>

<details>
<summary>9. await brauzerni bloklaydimi?</summary>
Yo'q, faqat funksiya ijrosini to'xtatadi.
</details>

<details>
<summary>10. async/await nima uchun Promise-dan yaxshi?</summary>
O'qish va yozish osonroq.
</details>

<details>
<summary>11. finally bloki async-da bormi?</summary>
Ha, try...catch-dan keyin ishlatish mumkin.
</details>

<details>
<summary>12. Async arrow function qanday yoziladi?</summary>
const fn = async () => { ... }
</details>`,
  exercises: [
    {
      id: 1,
      title: "Async Function",
      instruction: "42 qaytaradigan async funksiya yozing.",
      startingCode: "async function getNum() {\n  // Bu yerga yozing\n}",
      hint: "return 42;",
      test: "getNum().then(n => { if (n === 42) return null; });"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`async` funksiya ichida `return 5` yozilsa, funksiya chaqirilganda nima qaytaradi?",
      options: ["5", "Promise { 5 }", "undefined", "Xatolik"],
      correctAnswer: 1,
      explanation: "Async funksiyalar har doim Promise qaytaradi. Ichidagi oddiy qiymat avtomatik ravishda Promise.resolve() bilan o'raladi."
    },
    {
      id: 2,
      question: "`await` kalit so'zi qayerda ishlatilishi shart?",
      options: [
        "Har qanday funksiya ichida",
        "Faqat `async` bilan belgilangan funksiyalar ichida",
        "Faqat looplar ichida",
        "Faqat global scoperda"
      ],
      correctAnswer: 1,
      explanation: "Sinxron funksiyalar ichida `await` ishlatish `SyntaxError` ga olib keladi. U faqat asinxron muhit uchun mo'ljallangan."
    }
  ]
};
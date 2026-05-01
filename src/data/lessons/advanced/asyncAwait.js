export const asyncAwait = {
  id: "a2",
  title: "Async / Await (Asinxronlik cho'qqisi)",
  theory: `## 1. ASYNC / AWAIT NIMA?
\`async/await\` — bu asinxron kodni xuddi sinxron (ketma-ket) kod kabi yozish imkonini beruvchi zamonaviy usul. Bu metod Promiselar ustiga qurilgan, lekin uni o'qish va tushunish ancha oson.

### Kalit so'zlar:
- **async:** Funksiya oldidan yoziladi va u doim Promise qaytarishini bildiradi.
- **await:** Faqat \`async\` funksiya ichida ishlaydi. U Promisening natijasini kutadi va kodni o'sha joyda "to'xtatib" turadi (boshqa kodlar ishlashiga xalaqit bermasdan).

---

## 2. KOD TUZILISHI

\`\`\`javascript
async function ma'lumotOl() {
  console.log("Yuklanmoqda...");
  
  // 2 sekund kutadi va natijani oladi
  const natija = await new Promise(res => setTimeout(() => res("Ma'lumot keldi!"), 2000));
  
  console.log(natija);
}

ma'lumotOl();
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant JS as Call Stack
    participant Web as Web API (Timer)
    JS->>Web: await setTimeout (2s)
    Note over JS: JS boshqa ishlarni qilishi mumkin
    Web-->>JS: Vaqt tugadi!
    JS->>JS: Kod davom etadi
\`\`\`

---

## 3. XATOLARNI BOSHQARISH (try...catch)
Promiselarda \`.catch()\` ishlatgan bo'lsak, \`async/await\`da biz oddiy \`try...catch\` blokidan foydalanamiz.

\`\`\`javascript
async function xatoliAmal() {
  try {
    const r = await Promise.reject("Xato sodir bo'ldi!");
  } catch (err) {
    console.log("Ushlangan xato:", err);
  }
}
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Middle)

1. **Top-level await nima?**
   *Javob:* Bu \`async\` funksiya tashqarisida ham \`await\` ishlatish imkoniyati (modern brauzerlar va modullarda ishlaydi).

2. **await ishlatilganda asosiy oqim (main thread) qotib qoladimi?**
   *Javob:* Yo'q, JS faqat o'sha funksiya ijrosini to'xtatib turadi, qolgan hamma narsa (masalan, UI animatsiyalari) ishlashda davom etadi.

3. **Promise.all() va await'ni qanday birga ishlatish mumkin?**
   *Javob:* \`const [res1, res2] = await Promise.all([p1, p2]);\` ko'rinishida parallel kutish mumkin.`,
  exercises: [
    {
      id: 1,
      title: "Async funksiya",
      instruction: "'getData' nomli async funksiya yarating va u 1 sekund kutib 'Tayyor' matnini qaytarsin.",
      startingCode: "// Funksiyani yarating\n",
      hint: "async function getData() { await new Promise(r => setTimeout(r, 1000)); return 'Tayyor'; }",
      test: "if (code.includes('async') && code.includes('await')) return null; return 'async va await ishlating';"
    },
    {
      id: 2,
      title: "try...catch mashqi",
      instruction: "Async funksiya ichida xato beradigan Promiseni 'try...catch' orqali ushlang va xatoni konsolga chiqaring.",
      startingCode: "async function runner() {\n  // try catch shu yerga\n}\nrunner();",
      hint: "try { await Promise.reject('Fail'); } catch(e) { console.log(e); }",
      test: "if (code.includes('try') && code.includes('catch')) return null; return 'try va catch ishlatilmadi';"
    }
  ]
};

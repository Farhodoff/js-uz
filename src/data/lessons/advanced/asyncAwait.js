export const asyncAwait = {
  id: "a2",
  title: "async/await (Sintaktik shakar)",
  theory: `## async/await (ES2017)

**async/await** – Promise ustida ishlaydigan sintaktik shakar (syntactic sugar). Kodni sinxron ko‘rinishda yozish imkonini beradi.

- **async** funksiya har doim **Promise** qaytaradi.
- **await** faqat **async** funksiya ichida ishlatiladi va Promise bajarilguncha kutadi.

### Misol:
\`\`\`javascript
async function fetchData() {
  try {
    const user = await getUser(1);
    const orders = await getOrders(user.id);
    console.log(orders);
  } catch (error) {
    console.error("Xato:", error);
  }
}
\`\`\`

**Xatolarni tutish:** \`try...catch\` bloki eng xavfsiz va tushunarli usul hisoblanadi.

### Callback vs Promise vs async/await
| Xususiyat | Callback | Promise | async/await |
|-----------|----------|---------|--------------|
| Kod o‘qilishi | Yomon | Yaxshi | Eng yaxshi |
| Xato tutish | Qiyin | .catch() | try/catch |
| Parallel ishlash | Murakkab | Promise.all() | await Promise.all() |

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **async funksiya har doim nimani qaytaradi?**
2. **await nima vazifani bajaradi va qayerda ishlatish mumkin?**
3. **async/await ishlatilganda xatolarni qanday tutish kerak?**

### Middle daraja
4. **Nima uchun oddiy for loop ichida await ishlatish xavfli bo'lishi mumkin?**
5. **async/await va Promise.all() ni qanday birga ishlatish mumkin?**
6. **Top-level await nima va u qachon ishlaydi?**`,
  task: `// 1. async funksiya yarating: u 1 sekund kutib, keyin "Bajarildi" matnini qaytarsin.
// 2. try/catch yordamida xatoni tutuvchi async funksiya yozing (Promise.reject() dan foydalaning).
// 3. Ketma-ket 2 ta asinxron amalni (masalan, 2 ta setTimeout) await yordamida bajaring.
// 4. Parallel bajarish: Promise.all va await yordamida 2 ta funksiyani bir vaqtda ishga tushiring.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Basic async
async function sayDone() {
  await new Promise(r => setTimeout(r, 1000));
  return "Bajarildi";
}

// 2. try/catch
async function handleError() {
  try {
    await Promise.reject("Xato!");
  } catch(e) {
    console.log("Ushlandi:", e);
  }
}

// 3. Parallel
async function parallel() {
  const [res1, res2] = await Promise.all([
    new Promise(r => setTimeout(() => r(1), 1000)),
    new Promise(r => setTimeout(() => r(2), 1000))
  ]);
  console.log(res1, res2);
}`
};

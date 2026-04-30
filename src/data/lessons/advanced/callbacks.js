export const callbacksLesson = {
  id: "a0",
  title: "Callbacks (Qayta chaqiruvlar)",
  theory: `## Callbacks (Qayta chaqiruv funksiyalari)

**Callback** – boshqa funksiyaga argument sifatida beriladigan va asinxron operatsiya tugagach chaqiriladigan funksiya.

### Misol:
\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Ma'lumot keldi");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // "Ma'lumot keldi"
});
\`\`\`

### Callback Hell (Piramida muammosi)
Bir nechta ketma-ket asinxron operatsiyalar chuqur ichma-ich joylashishi natijasida kodni o'qish va boshqarish juda qiyinlashadi.

\`\`\`javascript
getData(1, (u) => {
  getOrders(u.id, (o) => {
    getDetails(o[0].id, (d) => {
      console.log(d);
    });
  });
});
\`\`\`
Bu muammoni hal qilish uchun **Promises** va **async/await** texnologiyalari ishlab chiqilgan.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Callback nima va u qachon ishlatiladi?**
2. **Asinxron callback ga misol keltiring (masalan, setTimeout).**
3. **Sinxron callback va asinxron callback farqi nima?**

### Middle daraja
4. **Callback Hell nima va uning asosiy kamchiliklari?**
5. **Inversion of Control (IoC) callbacklar bilan qanday bog'liq?**
6. **Error-first callback pattern nima (Node.js uslubi)?**`,
  task: `// 1. Funksiya yozing: u 2 ta son va 1 ta callback qabul qilsin. Callback sonlar yig'indisini hisoblasin.
// 2. setTimeout yordamida 2 sekunddan keyin ishlaydigan callback funksiya yozing.
// 3. 3 ta ichma-ich (nested) callback yarating (Callback Hell simulyatsiyasi).
// 4. Node.js uslubidagi error-first callback yozing (callback(error, data)).

// Kodingizni shu yerga yozing`,
  hint: `// 1. Simple callback
const sum = (a, b, cb) => cb(a + b);
sum(5, 10, console.log);

// 2. Async callback
setTimeout(() => console.log("Salom!"), 2000);

// 3. Nested
setTimeout(() => {
  console.log("Qadam 1");
  setTimeout(() => {
    console.log("Qadam 2");
  }, 1000);
}, 1000);`
};

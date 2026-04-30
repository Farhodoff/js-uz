export const promises = {
  id: "a1",
  title: "Promises (Vaqtinchalik natija)",
  theory: `## Promises (Vaqtinchalik natija)

**Promise** – asinxron operatsiyaning **yakuniy natijasini** ifodalovchi obyekt. U 3 holatda bo‘ladi:
- **pending** – kutilmoqda
- **fulfilled** – muvaffaqiyatli yakunlandi (\`.then()\`)
- **rejected** – xato bilan yakunlandi (\`.catch()\`)

### Promise yaratish:
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  setTimeout(() => {
    if (success) resolve("Bajarildi");
    else reject("Xato yuz berdi");
  }, 1000);
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));
\`\`\`

### Promise chain (zanjir):
\`\`\`javascript
getUser(1)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(err => console.error(err));
\`\`\`

### Promise metodlari:
- **Promise.all([p1, p2, p3])** – hammasi bajarilsa, natijalar massivi; agar biri rad etsa, rad etadi.
- **Promise.allSettled()** – hammasi bajarilguncha kutadi, natijalarni holati bilan qaytaradi.
- **Promise.race([p1, p2])** – eng tez bajarilganining natijasini qaytaradi.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Promise ning 3 ta holatini ayting.**
2. **.then() va .catch() nimaga xizmat qiladi?**
3. **Promise yaratishda resolve va reject parametrlarining vazifasi nima?**

### Middle daraja
4. **Promise.all va Promise.race farqi nimada?**
5. **Callback hell muammosini Promise qanday hal qiladi?**
6. **Microtask queue va Macrotask queue farqi nimada (Promises vs SetTimeout)?**`,
  task: `// 1. Promise yarating: u 1.5 sekunddan keyin muvaffaqiyatli "Ma'lumot yuklandi" deb qaytsin.
// 2. Promise yarating: u tasodifiy son 0.5 dan katta bo'lsa resolve ("Ok"), aks holda reject ("Error") bo'lsin.
// 3. Ketma-ket 2 ta .then() ishlatib, birinchi then da kelgan sonni 2 ga ko'paytirib, ikkinchi then da chiqaring.
// 4. Promise.all() yordamida 2 ta alohida promiselarni bir vaqtda kuting va natijalarni massivda chiqaring.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Simple promise
new Promise(res => setTimeout(() => res("Ma'lumot yuklandi"), 1500)).then(console.log);

// 2. Resolve/Reject
const p = new Promise((res, rej) => Math.random() > 0.5 ? res("Ok") : rej("Error"));
p.then(console.log).catch(console.error);

// 3. Chaining
Promise.resolve(10)
  .then(n => n * 2)
  .then(res => console.log(res));

// 4. Promise.all
Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(console.log);`
};

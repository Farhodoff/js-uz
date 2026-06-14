export const asyncAwait = {
  id: "asyncAwait",
  title: "Async/Await — Asinxronlikning Cho'qqisi",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Async/Await nima?
**Async/Await** — bu JavaScript-da asinxron kodni (Promises) xuddi sinxron (ketma-ket yozilgan) kod kabi oson, chiziqli va chiroyli yozish imkonini beruvchi zamonaviy sintaksisdir. U yangi asinxron mexanizm yaratmaydi, balki mavjud va'dalar (Promises) ustiga qurilgan juda qulay qobiq ("syntactic sugar") hisoblanadi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ovqat buyurtma qilyapsiz**:
* **Callbacks (Eski usul):** Siz kafega kirasiz va telefon raqamingizni qoldirasiz. Ovqat tayyor bo'lgach sizga telefon qilishadi (callback). Telefon qilishganidan keyin keyingi buyurtmani tushuntirishingiz kerak. Agar zanjir uzun bo'lsa, bu "Callback Hell" ga aylanadi.
* **Promises (O'rta usul):** Buyurtma berishingiz bilan sizga elektron kvitansiya (Promise) berishadi. Siz kvitansiyani qo'lda ushlab, \`then\` (agar pishsa) va \`catch\` (agar kuyib ketgan bo'lsa) qoidalarini yozib kutasiz.
* **Async/Await (Zamonaviy usul):** Siz kafega kelib, buyurtma berasiz va joyingizda o'tirib **kutib turasiz** (\`await\`). Ovqat stolingizga kelgunicha boshqa hech narsa qilmaysiz (kod kutiladi). Taom kelgach esa, xuddi sinxron holdagidek ovqatlanishni boshlaysiz. Agar muammo bo'lsa (\`try-catch\`), darhol ma'murni chaqirasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy asinxron ma'lumot olish)
\`\`\`javascript
// async funksiya har doim Promise qaytaradi
async function getGreeting() {
  return "Salom, Kelajak Dasturchisi!";
}

getGreeting().then(console.log); // "Salom, Kelajak Dasturchisi!"
\`\`\`

### 2. Intermediate Example (await yordamida Promise kutish va try-catch)
\`\`\`javascript
const fetchProduct = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id: 1, name: "Noutbuk" }), 1000);
  });
};

async function showProduct() {
  try {
    console.log("Yuklanmoqda...");
    const product = await fetchProduct(); // 1 soniya kutadi
    console.log("Mahsulot topildi:", product.name);
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

showProduct();
\`\`\`

### 3. Advanced Example (Parallel operatsiyalar - Promise.all)
Agar bir nechta so'rov bir-biriga bog'liq bo'lmasa, ularni ketma-ket emas, parallel yuklash tezlikni sezilarli oshiradi:
\`\`\`javascript
const getPrice = () => new Promise(res => setTimeout(() => res(1500), 1000));
const getStock = () => new Promise(res => setTimeout(() => res(true), 1200));

async function getProductStatus() {
  console.time("Parallel");
  
  // Ikkala funksiyani parallel boshlaymiz va umumiy kutamiz
  const [price, inStock] = await Promise.all([getPrice(), getStock()]);
  
  console.log(\`Narxi: \${price}, Omborda bor: \${inStock}\`);
  console.timeEnd("Parallel"); // taxminan 1.2 soniya (ketma-ket bo'lsa 2.2 soniya bo'lardi)
}

getProductStatus();
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Callback Hell va Promise Chaining chigalliklari:** Bir nechta asinxron operatsiya ketma-ket bajarilishi kerak bo'lganda, \`.then().then().then()\` zanjiri kodni o'ng tomonga cho'zib, o'qishni qiyinlashtirardi.
2. **Xatoliklarni markazlashgan holda boshqarish:** Promises-da har bir zanjir yoki umumiy oxirida \`.catch()\` yozish kerak edi. Async/await yordamida esa dasturchilar yaxshi biladigan an'anaviy \`try-catch\` blokidan foydalanish mumkin bo'ldi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`async\` bo'lmagan funksiya ichida \`await\` ishlatish
#### Xato:
\`\`\`javascript
function loadData() {
  const data = await fetchData(); // SyntaxError!
}
\`\`\`
#### Tuzatish:
\`\`\`javascript
async function loadData() {
  const data = await fetchData();
}
\`\`\`

### 2. Parallel bajarilishi mumkin bo'lgan operatesiyalarni ketma-ket kutish (Sequential Await)
#### Xato (Vaqt yo'qotish):
\`\`\`javascript
const user = await fetchUser(); // 1 soniya
const posts = await fetchPosts(); // 1 soniya
// Jami: 2 soniya
\`\`\`
#### Tuzatish (Parallel):
\`\`\`javascript
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
// Jami: 1 soniya
\`\`\`

### 3. \`try-catch\` ishlatishni unutish
Agar Promise rad etilsa (rejected) va uning atrofida \`try-catch\` bo'lmasa, brauzerda \`Unhandled Promise Rejection\` xatosi chiqadi va dastur to'xtab qolishi mumkin.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Async/await nima va u Promise-lardan nimasi bilan farq qiladi?
   * **Javob:** Async/await - Promise ustiga qurilgan qulay sintaksis xolos. U asinxron kodni chiziqli ko'rinishda yozish imkonini beradi.
2. **Savol:** \`async\` kalit so'zi funksiyaga qanday ta'sir qiladi?
   * **Javob:** U funksiyani har doim Promise qaytaradigan qiladi. Oddiy qiymat qaytsa, u avtomatik ravishda Promise.resolve() ga o'raladi.
3. **Savol:** \`await\` kalit so'zining vazifasi nima?
   * **Javob:** U Promise hal bo'lguncha (resolved/rejected) async funksiya bajarilishini to'xtatib (kutib) turadi.
4. **Savol:** Async/await da xatolar qanday tutiladi?
   * **Javob:** An'anaviy \`try-catch\` bloki yordamida.

### Middle (5–8)
5. **Savol:** Agar await qilinayotgan Promise rad etilsa (reject) va catch bo'lmasa nima yuz beradi?
   * **Javob:** Global xatolik otilib, \`Unhandled Promise Rejection\` yuzaga keladi.
6. **Savol:** Ketma-ket await va parallel await farqini tushuntiring.
   * **Javob:** Ketma-ketlikda keyingi await oldingisi tugamaguncha boshlanmaydi. Parallelda esa barcha so'rovlar bir vaqtda yuboriladi (masalan \`Promise.all\` yordamida).
7. **Savol:** \`async\` funksiya ichida oddiy \`return\` yozsak, uning natijasini \`.then()\` bilan zanjirlasa bo'ladimi?
   * **Javob:** Ha, chunki u baribir va'daga aylanadi.
8. **Savol:** Top-level await nima va u qachon ishlaydi?
   * **Javob:** Modern ES modullarda (type="module") hech qanday async funksiyasiz global miqyosda \`await\` ishlata olish imkoniyatidir.

### Senior (9–12)
9. **Savol:** Nima uchun klass konstruktori (constructor) asinxron bo'la olmaydi?
   * **Javob:** Konstruktor har doim yaratilgan obyekt instance'ini qaytarishi kerak. Agar u async bo'lsa, u Promise qaytargan bo'lardi, bu esa JS obyekti instansiyasi mantiqiga zid.
10. **Savol:** Loop (sikl) ichida \`await\` ishlatish qanchalik to'g'ri va uning muqobillari nima?
    * **Javob:** \`forEach\` ichida await to'g'ri ishlamaydi (parallel ishga tushib ketadi). \`for...of\` ichida esa so'rovlar navbatma-navbat ketma-ket bajariladi. Agar parallel ishlash kerak bo'lsa, elementlarni map qilib, so'ng \`Promise.all\` ga berish kerak.
11. **Savol:** \`Promise.allSettled()\` ning \`Promise.all()\` dan farqi nimada va async/await da undan qanday foydalaniladi?
    * **Javob:** \`Promise.all\` bitta xatolik bo'lsa ham butunlay rad etiladi. \`Promise.allSettled\` esa barcha Promiselar xoh muvaffaqiyatli, xoh xato bilan tugashini kutadi va har birining statusini qaytaradi.
12. **Savol:** \`for await...of\` sintaksisi nima va u qachon ishlatiladi?
    * **Javob:** U asinxron oqimlar (readable streams) yoki asinxron generatorlardan kelayotgan ma'lumotlarni oqim davomida o'qish uchun ishlatiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxirida testlar taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Foydalanuvchi Profili Dashboardini Yuklash
Dashboard yaratishda biz foydalanuvchi haqidagi ma'lumotlarni, uning buyurtmalarini va bildirishnomalarini yuklashimiz kerak. Foydalanuvchi ma'lumotlari yuklanmasdan turib buyurtmalarni so'rab bo'lmaydi (chunki user_id kerak), lekin bildirishnomalarni parallel yuklasak bo'ladi.

\`\`\`javascript
async function loadDashboard(userId) {
  try {
    // 1. Dastlab foydalanuvchini yuklaymiz (UserID kerak)
    const user = await fetchUserData(userId);
    
    // 2. User olingach, uning buyurtmalari va bildirishnomalarini parallel yuklaymiz
    const [orders, notifications] = await Promise.all([
      fetchUserOrders(user.id),
      fetchUserNotifications(user.id)
    ]);
    
    return {
      profile: user,
      orders: orders,
      notifications: notifications
    };
  } catch (error) {
    console.error("Dashboard yuklashda xatolik:", error);
    return null;
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Parallel ishlashni afzal ko'ring:** Agar birinchi so'rov natijasi ikkinchisi uchun shart bo'lmasa, har doim parallel yuklang (\`Promise.all\` yoki \`Promise.allSettled\`).
* **Keshlash (Caching):** Asinxron funksiyalar natijasini tez-tez chaqirganda vaqtni tejash uchun xotirada keshlab boring.

---

## 10. 📌 Cheat Sheet

| Sintaksis | Joylashuvi | Vazifasi |
| :--- | :--- | :--- |
| \`async function fn() {}\` | Funksiya e'loni | Funksiyani asinxron qiladi va Promise qaytaradi |
| \`const data = await promise;\` | async funksiya ichida | Promise natijasini kutib oladi |
| \`try { ... } catch (e) { ... }\` | Har qanday joyda | \`await\` operatsiyasidagi xatoliklarni tutadi |
| \`Promise.all([p1, p2])\` | Global Promise | Promiselarni parallel ishga tushiradi |
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy async funksiya",
      instruction: "'Hello World' matnini qaytaradigan oddiy asinxron `sayHello()` funksiyasini yozing.",
      startingCode: "async function sayHello() {\n  // Kodni yozing\n}",
      hint: "return 'Hello World';",
      test: "if (typeof sayHello !== 'function') return 'sayHello funksiya emas'; return sayHello().then(r => r === 'Hello World' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 2,
      title: "2️⃣ Await operatorini ishlatish",
      instruction: "Berilgan promise natijasini `await` qilib qaytaradigan `getValue(promise)` funksiyasini yozing.",
      startingCode: "async function getValue(promise) {\n  // Await qilib qaytaring\n}",
      hint: "return await promise;",
      test: "if (typeof getValue !== 'function') return 'getValue funksiya emas'; return getValue(Promise.resolve('test')).then(r => r === 'test' ? null : 'Await xato');"
    },
    {
      id: 3,
      title: "3️⃣ Try-Catch yordamida xatolikni ushlash",
      instruction: "Xato beradigan promiseni `await` qiling, xatoni `try...catch` bilan tutib, uning xabarini (message) qaytaring.",
      startingCode: "async function catchError(promise) {\n  // try...catch yozing\n}",
      hint: "try { return await promise; } catch(e) { return e.message; }",
      test: "if (typeof catchError !== 'function') return 'catchError funksiya emas'; return catchError(Promise.reject(new Error('baza xatosi'))).then(r => r === 'baza xatosi' ? null : 'Xato ushlanmadi');"
    },
    {
      id: 4,
      title: "4️⃣ Ketma-ket ikki promiseni kutish",
      instruction: "p1 va p2 promiselarni ketma-ket `await` qilib, ularning yig'indisini qaytaring.",
      startingCode: "async function getSum(p1, p2) {\n  // p1 va p2 ni kutib yig'indisini hisoblang\n}",
      hint: "const a = await p1; const b = await p2; return a + b;",
      test: "if (typeof getSum !== 'function') return 'getSum funksiya emas'; return getSum(Promise.resolve(2), Promise.resolve(3)).then(r => r === 5 ? null : 'Yig\\'indi xato');"
    },
    {
      id: 5,
      title: "5️⃣ Parallel Promise.all kutish",
      instruction: "Berilgan p1 va p2 promiselarni `Promise.all` bilan parallel kutib, natijaviy massivni qaytaring.",
      startingCode: "async function getParallel(p1, p2) {\n  // Promise.all ishlating\n}",
      hint: "return await Promise.all([p1, p2]);",
      test: "if (typeof getParallel !== 'function') return 'getParallel funksiya emas'; return getParallel(Promise.resolve(10), Promise.resolve(20)).then(r => r && r[0] === 10 && r[1] === 20 ? null : 'Parallel xato');"
    },
    {
      id: 6,
      title: "6️⃣ Finally asinxron tozalash",
      instruction: "`try...catch...finally` bloki ichida promisni kutib oling va xato bo'lsa ham `finally`da 'Clean' matnini qaytaring.",
      startingCode: "async function handleClean(promise) {\n  try {\n    return await promise;\n  } catch(e) {\n    return 'Error';\n  } finally {\n    console.log('Clean');\n  }\n}",
      hint: "Taqdim etilgan kodni tekshiring.",
      test: "if (typeof handleClean !== 'function') return 'handleClean funksiya emas'; return handleClean(Promise.reject()).then(() => logs.includes('Clean') ? null : 'Finally ishlamadi');"
    },
    {
      id: 7,
      title: "7️⃣ Asinxron delay funksiyasi",
      instruction: "Belgilangan millisekund kutadigan `delay(ms)` yordamchi funksiyasini yozing (new Promise va setTimeout orqali).",
      startingCode: "function delay(ms) {\n  // Promise qaytaring\n}",
      hint: "return new Promise(resolve => setTimeout(resolve, ms));",
      test: "if (typeof delay !== 'function') return 'delay funksiya emas'; const start = Date.now(); return delay(50).then(() => { const diff = Date.now() - start; if (diff >= 45) return null; return 'Kechikish vaqti xato'; });"
    },
    {
      id: 8,
      title: "8️⃣ Async method obyekt ichida",
      instruction: "Obyekt ichida `async` metod yarating va u `this.name` qiymatini qaytarsin.",
      startingCode: "const obj = {\n  name: 'JS',\n  // async metod yozing\n};",
      hint: "async getName() { return this.name; }",
      test: "if (typeof obj.getName !== 'function') return 'getName metod emas'; return obj.getName().then(r => r === 'JS' ? null : 'Ism xato');"
    },
    {
      id: 9,
      title: "9️⃣ Loop ichida await (Ketma-ketlik)",
      instruction: "Massivdagi asinxron vazifalarni `for...of` tsikli ichida navbatma-navbat `await` qilib, natijalarini console.log qiling.",
      startingCode: "async function runTasks(tasks) {\n  // tasks massivini aylanib har birini await qiling\n}",
      hint: "for (const task of tasks) { const res = await task(); console.log(res); }",
      test: "if (typeof runTasks !== 'function') return 'runTasks funksiya emas'; const tasks = [() => Promise.resolve(1), () => Promise.resolve(2)]; return runTasks(tasks).then(() => logs.includes(1) && logs.includes(2) ? null : 'Tasklar bajarilmadi');"
    },
    {
      id: 10,
      title: "🔟 Promise.race orqali timeout qilish",
      instruction: "So'rov va `delay(100)` taymeridan qaysi biri tez tugashini `Promise.race` bilan aniqlab, timeout bo'lsa 'Timeout!' qaytaradigan kod yozing.",
      startingCode: "async function requestWithTimeout(promise) {\n  const delay = ms => new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout!')), ms));\n  // Promise.race ishlatib xatolikni tuting\n}",
      hint: "try { return await Promise.race([promise, delay(100)]); } catch(e) { return e.message; }",
      test: "if (typeof requestWithTimeout !== 'function') return 'requestWithTimeout funksiya emas'; const slow = new Promise(r => setTimeout(() => r('ok'), 200)); return requestWithTimeout(slow).then(r => r === 'Timeout!' ? null : 'Timeout aniqlanmadi');"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Async Arrow funksiya",
      instruction: "Qiymatni qaytaradigan `async` ko'rinishidagi arrow (o'q) funksiya yarating.",
      startingCode: "const getResult = async () => {\n  // Natijani bering\n};",
      hint: "const getResult = async () => 'Arrow';",
      test: "if (typeof getResult !== 'function') return 'getResult funksiya emas'; return getResult().then(r => r === 'Arrow' ? null : 'Natija xato');"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Async function dynamically imported",
      instruction: "Promise orqali resolve bo'ladigan asinxron oqim natijasiga 2 ni ko'paytirib qaytaring.",
      startingCode: "async function multiplyAsync(promise) {\n  // Await qilib, natijani 2 ga ko'paytiring\n}",
      hint: "const val = await promise; return val * 2;",
      test: "if (typeof multiplyAsync !== 'function') return 'multiplyAsync funksiya emas'; return multiplyAsync(Promise.resolve(5)).then(r => r === 10 ? null : 'Ko\\'paytirish xato');"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Parallel API So'rovlari (fetchParallel)",
      instruction: "Berilgan `urls` massividan barcha so'rovlarni parallel yuboradigan va ulardan kelgan javoblarni JSON sifatida o'qib, natijalar massivini qaytaradigan `fetchParallel(urls)` asinxron funksiyasini yozing.",
      startingCode: "async function fetchParallel(urls) {\n  // Kodni shu yerdan yozing\n}",
      hint: "const promises = urls.map(url => fetch(url).then(res => res.json())); return await Promise.all(promises);",
      test: "if (typeof fetchParallel !== 'function') return 'fetchParallel funksiya emas';\nconst urls = [\n  'https://jsonplaceholder.typicode.com/todos/1',\n  'https://jsonplaceholder.typicode.com/todos/2'\n];\nreturn fetchParallel(urls).then(res => {\n  if (res && res.length === 2 && res[0].id === 1 && res[1].id === 2) return null;\n  return 'Parallel natijalar noto\\'g\\'ri';\n}).catch(e => 'Xatolik: ' + e.message);"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Ketma-ket API So'rovlari (fetchSequentialWithState)",
      instruction: "Berilgan `urls` ro'yxatidan ma'lumotlarni ketma-ket (sequential) yuklab, har bir API dan kelgan natijalarni yig'ib massiv shaklida qaytaruvchi `fetchSequentialWithState(urls)` asinxron funksiyasini yozing.",
      startingCode: "async function fetchSequentialWithState(urls) {\n  // Kodni shu yerdan yozing\n}",
      hint: "let results = []; for (const url of urls) { const res = await fetch(url); results.push(await res.json()); } return results;",
      test: "if (typeof fetchSequentialWithState !== 'function') return 'fetchSequentialWithState funksiya emas';\nconst urls = [\n  'https://jsonplaceholder.typicode.com/todos/1',\n  'https://jsonplaceholder.typicode.com/todos/2'\n];\nreturn fetchSequentialWithState(urls).then(res => {\n  if (res && res.length === 2 && res[0].id === 1 && res[1].id === 2) return null;\n  return 'Ketma-ket yuklash noto\\'g\\'ri bajarildi';\n}).catch(e => 'Xatolik: ' + e.message);"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "`async` kalit so'zi funksiya oldidan qo'yilganda nima sodir bo'ladi?",
    "options": [
      "Funksiya sinxron rejimga o'tadi va tezroq ishlaydi",
      "Funksiya har doim Promise (va'da) qaytaradigan bo'ladi",
      "Funksiya avtomatik ravishda setTimeout ichiga o'raladi",
      "Funksiya xotiradan butunlay o'chiriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Funksiya oldiga `async` qo'yilganda, u har doim Promise qaytaradi. Agar funksiya ichida oddiy qiymat qaytarilsa ham, u avtomatik ravishda Promise.resolve() bilan o'raladi."
  },
  {
    "id": 2,
    "question": "`await` kalit so'zini qayerlarda ishlatish mumkin?",
    "options": [
      "Faqat `async` deb e'lon qilingan funksiyalar ichida (yoki top-level await qo'llab-quvvatlaydigan modullarda)",
      "Istalgan oddiy funksiya yoki sikl (loop) ichida cheklovsiz",
      "Faqat HTML fayl ichidagi script teglarida",
      "Faqat klass konstruktori (constructor) ichida"
    ],
    "correctAnswer": 0,
    "explanation": "`await` kalit so'zi asinxron operatsiya tugashini kutish uchun faqat `async` funksiyalar ichida yoki modern ES modullarning eng yuqori darajasida (top-level await) ishlaydi."
  },
  {
    "id": 3,
    "question": "Agar `await` qilingan Promise 'rejected' (rad etilgan) holatga o'tsa, nima sodir bo'ladi?",
    "options": [
      "Dastur hech qanday xatosiz jim to'xtaydi",
      "Promise avtomatik ravishda yana bir bor bajarilishga urinadi",
      "Xatolik (exception) otiladi, uni try-catch bloki orqali tutish kerak",
      "Brauzer o'z-o'zidan qayta yuklanadi"
    ],
    "correctAnswer": 2,
    "explanation": "Rad etilgan Promise `await` qilinganida xuddi oddiy xatolik otilgandek (`throw`) ishlaydi. Shuning uchun uni try-catch bloki yordamida boshqarish lozim."
  },
  {
    "id": 4,
    "question": "Quyidagi kodda nima xato bor?\n`function show() { const data = await fetchDetails(); }`",
    "options": [
      "`await` faqat `async` funksiya ichida ishlatilishi kerak",
      "`const` o'rniga `let` ishlatish shart",
      "`fetchDetails` parametri berilmagan",
      "Kodda xatolik yo'q, u to'g'ri ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "`await` faqat asinxron funksiyalar ichida ishlaydi. Ushbu kod ishlashi uchun `async function show()` deb yozilishi kerak."
  },
  {
    "id": 5,
    "question": "Bir nechta asinxron so'rovlarni parallel bajarish va ularning barchasi tugashini kutish uchun qaysi metod ishlatiladi?",
    "options": [
      "Promise.race()",
      "setInterval()",
      "async.parallel()",
      "Promise.all()"
    ],
    "correctAnswer": 3,
    "explanation": "`Promise.all()` bir nechta Promise massivini qabul qilib, ularning hammasi muvaffaqiyatli bajarilgandan so'ng umumiy natijani qaytaradi."
  },
  {
    "id": 6,
    "question": "Async/await qaysi fundamental JS obyekti ustiga qurilgan 'syntactic sugar' hisoblanadi?",
    "options": [
      "Promise (Va'dalar)",
      "Array (Massivlar)",
      "Closure (Yopilmalar)",
      "Callback funksiyalar"
    ],
    "correctAnswer": 0,
    "explanation": "Async/await sintaksisi asinxron kodni chiroyli va tushunarli yozish uchun Promise API ustiga qurilgan qulaylikdir."
  },
  {
    "id": 7,
    "question": "`async` funksiya ichida oddiy qiymat qaytarganimizda (masalan `return 42;`), aslini olganda nima qaytadi?",
    "options": [
      "Oddiy son turi (Number)",
      "Undefined qiymati",
      "42 qiymati bilan hal qilingan (resolved) Promise obyekti",
      "Promise.reject(42) obyekti"
    ],
    "correctAnswer": 2,
    "explanation": "`async` funksiyadan qaytgan har qanday qiymat Promise.resolve(qiymat) ko'rinishida Promise-ga o'raladi."
  },
  {
    "id": 8,
    "question": "Top-level await nima?",
    "options": [
      "ES modullarda async funksiyasiz to'g'ridan-to'g'ri eng yuqori darajada `await` ishlatish imkoniyati",
      "Brauzerning eng yuqori qismida skroll qilish vaqtidagi asinxronlik",
      "Barcha kutubxonalardan oldin Promise yuklash",
      "Window obyektida global wait qilish"
    ],
    "correctAnswer": 0,
    "explanation": "Zamonaviy JavaScript (ES modullar) tarkibida async funksiya yaratmasdan ham bevosita faylning o'zida `await` ishlatish imkoniyati Top-level await deb ataladi."
  },
  {
    "id": 9,
    "question": "Nima uchun class constructor-i ichida `async/await` ishlatib bo'lmaydi?",
    "options": [
      "Klasslar faqat sinxron kod uchun yaratilgan",
      "Chunki konstruktor har doim yangi klass nusxasini (instance) qaytarishi shart, Promise emas",
      "V8 dvigateli klasslarda asinxronlikni taqiqlaydi",
      "JavaScript prototiplari asinxronlikni qo'llamaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Konstruktor yangi obyekt instance qaytarishi kerak. Agar u async qilinib Promise qaytarsa, new kalit so'zi kutilganidek ishlamaydi."
  },
  {
    "id": 10,
    "question": "Birinchi tugagan asinxron operatsiyaning natijasini olish kerak bo'lsa (qolganlarini kutmasdan), qaysi metoddan foydalaniladi?",
    "options": [
      "Promise.race()",
      "Promise.all()",
      "Promise.allSettled()",
      "Promise.any()"
    ],
    "correctAnswer": 0,
    "explanation": "`Promise.race()` massivdagi eng birinchi bo'lib yakunlangan (resolved yoki rejected) Promise-ning natijasini qaytaradi."
  },
  {
    "id": 11,
    "question": "Asinxron siklda (for-await-of) qanday oqimlar yoki obyektlar bilan ishlash mumkin?",
    "options": [
      "Asinxron generatorlar va AsyncIterable obyektlar",
      "Oddiy massivlar va obyektlar bilan faqat",
      "DOM hodisalari bilan faqat",
      "JSON fayllar bilan faqat"
    ],
    "correctAnswer": 0,
    "explanation": "`for await...of` sikli asinxron oqimlar, generatsiyalar va AsyncIterable interfeysiga ega bo'lgan obyeklar ustida aylanish uchun mo'ljallangan."
  },
  {
    "id": 12,
    "question": "async/await yordamida yozilgan asinxron kodning callback-larga nisbatan eng asosiy ustunligi nimada?",
    "options": [
      "Kod tezroq ishlaydi va kamroq protsessor kuchi talab qiladi",
      "Kodning o'qilishi osonroq (sinxron kod kabi ko'rinadi) va 'callback hell' muammosi hal bo'ladi",
      "Xatoliklarni mutlaqo yuzaga keltirmaydi",
      "Tarmoq so'rovlarini avtomatik ravishda takrorlaydi (retry)"
    ],
    "correctAnswer": 1,
    "explanation": "Async/await asinxron kodni go'yo sinxron kod kabi tekis va chiziqli ko'rinishda yozish imkonini berib, o'qiluvchanlikni oshiradi va chuqur callback zanjirlaridan qutqaradi."
  }
]

};

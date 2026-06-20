export const asyncAwait = {
  id: "asyncAwait",
  title: "Async/Await — Asinxronlikning Cho'qqisi",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

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
    "id": 1,
    "title": "Asinxron Ma'lumot Yuklash",
    "instruction": "Taqdim etilgan `fetchData` funksiyasini chaqirib, undan qaytgan ma'lumotni qaytaruvchi asinxron `getUserData` funksiyasini yozing. `fetchData` va'da (Promise) qaytaradi.",
    "startingCode": "async function getUserData() {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "const data = await fetchData(); return data;",
    "test": "if (!code.includes('await')) return 'await kalit so\\'zi ishlatilmadi';\ntry {\n  const sandbox = new Function('fetchData', code + '; return getUserData;');\n  const fn = sandbox(async () => 'ok');\n  const p = fn();\n  if (!(p instanceof Promise)) return 'getUserData funksiyasi Promise qaytarmayapti (async ekanligiga ishonch hosil qiling)';\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
  },
  {
    "id": 2,
    "title": "Xatoliklarni Try-Catch bilan Boshqarish",
    "instruction": "Asinxron `fetchUser` funksiyasini chaqirib, natijani qaytaruvchi `safeFetch` asinxron funksiyasini yozing. Agar `fetchUser` xato bersa (reject), catch blokida 'Xato yuz berdi' satrini qaytaring.",
    "startingCode": "async function safeFetch() {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "try {\n  return await fetchUser();\n} catch(err) {\n  return 'Xato yuz berdi';\n}",
    "test": "if (!code.includes('try') || !code.includes('catch')) return 'try-catch blogi ishlatilmadi';\ntry {\n  const sandbox = new Function('fetchUser', code + '; return safeFetch;');\n  const fn = sandbox(async () => { throw new Error('fail'); });\n  const p = fn();\n  if (!(p instanceof Promise)) return 'safeFetch funksiyasi Promise qaytarishi kerak';\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
  },
  {
    "id": 3,
    "title": "Paralel Asinxron Amallar (Promise.all)",
    "instruction": "Ikkita asinxron funksiya `getProfile()` va `getPosts()` berilgan. Ularni bir vaqtda (paralel) ishga tushirib, natijalarini [profile, posts] massivi ko'rinishida qaytaruvchi asinxron `getDashboardData()` funksiyasini yozing.",
    "startingCode": "async function getDashboardData() {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return await Promise.all([getProfile(), getPosts()]);",
    "test": "if (!code.includes('Promise.all')) return 'Promise.all ishlatilmadi';\ntry {\n  const sandbox = new Function('getProfile', 'getPosts', code + '; return getDashboardData;');\n  const fn = sandbox(async () => 'p', async () => 'posts');\n  const p = fn();\n  if (!(p instanceof Promise)) return 'getDashboardData funksiyasi Promise qaytarishi kerak';\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
  },
  {
    "id": 4,
    "title": "Oddiy async funksiya",
    "instruction": "Hech qanday maxsus asinxron amalsiz faqat `'Hello'` satrini qaytaruvchi asinxron `sayHello()` funksiyasini yozing.",
    "startingCode": "async function sayHello() {\n  // Kodni yozing\n}",
    "hint": "async funksiyada shunchaki `return 'Hello';` yozishingiz kifoya, u o'zi Promise.resolve qaytaradi.",
    "test": "const fn = new Function(code + '; return sayHello;')(); return fn().then(r => r === 'Hello' ? null : 'Xato');"
  },
  {
    "id": 5,
    "title": "Await yordamida qiymat olish",
    "instruction": "`getSecret()` asinxron funksiyasi bor deb faraz qiling. Uning natijasini kutib (await) va qaytaradigan asinxron `revealSecret()` yozing.",
    "startingCode": "async function revealSecret() {\n  // Kodni yozing\n}",
    "hint": "return await getSecret();",
    "test": "const fn = new Function('getSecret', code + '; return revealSecret;'); const r = fn(async () => 'Secret'); return r().then(x => x === 'Secret' ? null : 'Xato');"
  },
  {
    "id": 6,
    "title": "Xatoliklarni Try/Catch orqali ushlash",
    "instruction": "Asinxron `failFunction()` doim reject bo'ladi deb faraz qiling. Uni `try/catch` orqali chaqiradigan va catch blokida uning xato xabarini qaytaradigan `safeCall()` yozing.",
    "startingCode": "async function safeCall() {\n  // Kodni yozing\n}",
    "hint": "try { return await failFunction(); } catch(e) { return e; }",
    "test": "const fn = new Function('failFunction', code + '; return safeCall;'); const r = fn(async () => { throw 'Xatolik'; }); return r().then(x => x === 'Xatolik' ? null : 'Xato');"
  },
  {
    "id": 7,
    "title": "Ikkita amallarni ketma-ket (Sequential) bajarish",
    "instruction": "`step1()` va undan keyin `step2()` ni ketma-ket chaqiruvchi va ikkalasi tugagach `'Done'` qaytaruvchi asinxron `runSteps()` yozing.",
    "startingCode": "async function runSteps() {\n  // Kodni yozing\n}",
    "hint": "await step1(); await step2(); return 'Done';",
    "test": "let c=0; const fn=new Function('step1', 'step2', code+'; return runSteps;'); const r = fn(async ()=>c++, async ()=>c++); return r().then(x => x==='Done'&&c===2?null:'Xato');"
  },
  {
    "id": 8,
    "title": "Boshqa Async funksiya kutish",
    "instruction": "`multiply(a, b)` deb nomlangan funksiya `a*b` ni Promise qaytarsin. `calc()` asinxron funksiya yozing, u await orqali multiply(2, 5) ni olsin va qaytarsin.",
    "startingCode": "async function calc() {\n  // Kodni yozing\n}",
    "hint": "return await multiply(2, 5);",
    "test": "const fn = new Function('multiply', code + '; return calc;'); const r=fn(async (x,y)=>x*y); return r().then(x=>x===10?null:'Xato');"
  },
  {
    "id": 9,
    "title": "JSON Parsed",
    "instruction": "Berilgan url (satr) ga fetch so'rov yuboradigan va `await res.json()` ni qaytaradigan `fetchData(url)` ni qisman taqlid qilib yozing. (Fetch haqida o'ylamang, json() metodli ob'yekt qaytaruvchi mock `mockFetch(url)` ni kuting).",
    "startingCode": "async function fetchData(url) {\n  // Kodni yozing\n}",
    "hint": "const res = await mockFetch(url); return await res.json();",
    "test": "const fn = new Function('mockFetch', code + '; return fetchData;'); const r=fn(async()=>({json:async()=>'OK'})); return r().then(x=>x==='OK'?null:'Xato');"
  },
  {
    "id": 10,
    "title": "Asinxron If",
    "instruction": "Asinxron `checkAccess()` yordamida tekshiring: agar u true qaytarsa `'Welcome'`, false qaytarsa `'Denied'` qaytarsin. Yechim asinxron bo'lsin.",
    "startingCode": "async function login() {\n  // Kodni yozing\n}",
    "hint": "const ok = await checkAccess(); return ok ? 'Welcome' : 'Denied';",
    "test": "const fn = new Function('checkAccess', code + '; return login;'); return fn(async()=>false)().then(x=>x==='Denied'?null:'Xato');"
  },
  {
    "id": 11,
    "title": "Throw orqali xato chiqarish",
    "instruction": "Agar parametrdagi raqam manfiy bo'lsa darhol xato (throw 'Manfiy son') chiqaradigan, musbat bo'lsa uning kvadratini qaytaruvchi asinxron `squareAsync(n)` yozing.",
    "startingCode": "async function squareAsync(n) {\n  // Kodni yozing\n}",
    "hint": "if (n<0) throw 'Manfiy son'; return n*n;",
    "test": "const fn = new Function(code + '; return squareAsync;')(); return fn(-1).catch(e => e==='Manfiy son' ? null : 'Xato');"
  },
  {
    "id": 12,
    "title": "Promise.all bilan optimallashtirish",
    "instruction": "`getUser()` va `getRole()` mustaqil asinxron amallar. Ularni ketma-ket emas, balki bir vaqtda await qilib natijasini qo'shib (masalan `{user, role}`) qaytaruvchi asinxron `getInfo()` yozing.",
    "startingCode": "async function getInfo() {\n  // Kodni yozing\n}",
    "hint": "const [user, role] = await Promise.all([getUser(), getRole()]); return {user, role};",
    "test": "const fn = new Function('getUser','getRole',code+'; return getInfo;'); const r=fn(async()=>'A', async()=>'B'); return r().then(x=>x.user==='A'&&x.role==='B'?null:'Xato');"
  },
  {
    "id": 13,
    "title": "Async Loop (For...of)",
    "instruction": "Asinxron funksiyalar massivi berilgan: `funcs`. Ularni `for...of` bilan birma-bir asinxron kutib (await), natijalarini yangi massivga yig'ib qaytaradigan asinxron `runSequence(funcs)` yozing.",
    "startingCode": "async function runSequence(funcs) {\n  // Kodni yozing\n}",
    "hint": "for (let f of funcs) { res.push(await f()); }",
    "test": "const fn = new Function(code + '; return runSequence;')(); return fn([async()=>1, async()=>2]).then(r=>r[1]===2?null:'Xato');"
  }
]
,
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

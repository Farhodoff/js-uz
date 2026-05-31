export const asyncAwait = {
  id: "async-await",
  title: "🎯 Async/Await — Asinxronlikning Cho'qqisi",
  level: "Murakkab",
  description: "Async/await orqali asinxron kodni oddiy sinxron kabi yozish, xatolar bilan ishlash, parallel va ketma-ket operatsiyalarni to'g'ri tashkil etish.",
  theory: `## 1. NEGA kerak?

JavaScript-da asinxron operatsiyalar bilan ishlash uchun Callback-lar va Promislardan foydalaniladi. Biroq, ko'plab \`.then()\` va \`.catch()\` zanjirlari kodning o'qilishi va tuzilishini murakkablashtirib yuboradi (bunga **Promise Hell** yoki zanjirlar chalkashligi deyiladi).

**Async/Await** — bu ES8 (2017) da taqdim etilgan, Promislarning ustiga qurilgan maxsus sintaksis bo'lib, u asinxron kodni xuddi oddiy sinxron kod kabi sodda, chiziqli ko'rinishda yozish imkonini beradi. Bu kodni o'qish, yozish va undagi xatolarni tuzatishni sezilarli darajada osonlashtiradi.

---

## 2. SODDALIK (Analogiya)

Tasavvur qiling, siz qahvaxonadasiz:
- **Callback usuli:** Siz qahvaga buyurtma berasiz va telefon raqamingizni qoldirasiz. Qahva tayyor bo'lganda, ular sizga telefon qilishadi (Callback). Siz suhbatni bo'lib, telefonni ko'tarishingiz kerak.
- **Promise usuli:** Sizga signal beruvchi peyjer berishadi. Peyjer chalinganda, borib qahvani olasiz.
- **Async/Await usuli:** Siz qahva tayyor bo'lishini kutib, navbatda turasiz (kod darajasida). Siz uchun vaqt to'xtagandek tuyuladi, lekin brauzer (qahvaxona) boshqa mijozlarga xizmat ko'rsatishda davom etadi. Qahva tayyor bo'lishi bilan, navbatingiz keladi va uni olib yo'lingizda davom etasiz. Kod xuddi sinxrondek o'qiladi, ammo fonda asinxron ishlaydi.

---

## 3. STRUKTURA

\`\`\`mermaid
sequenceDiagram
    participant Main as Asosiy oqim (Main Thread)
    participant AsyncFn as Async funksiya (getData)
    participant WebAPI as Web API (fetch)
    
    Main->>AsyncFn: getData() chaqiriladi
    AsyncFn->>WebAPI: fetch('api/data') - asinxron boshlanadi
    Note over AsyncFn: await fetch(...) - funksiya to'xtatiladi
    AsyncFn-->>Main: Promise { pending } qaytariladi
    Note over Main: Asosiy oqim boshqa ishlarni bajaradi (UI render, eventlar)
    WebAPI-->>AsyncFn: Ma'lumot tayyor (resolve)
    Note over AsyncFn: getData() o'z ishini davom ettiradi
    AsyncFn-->>Main: Yakuniy natija qaytadi (fulfilled)
\`\`\`

### A. \`async\` kalit so'zi
Kalit so'z funksiya e'lonidan oldin qo'yiladi. \`async\` funksiyalar har doim **Promise** qaytaradi. Agar funksiyadan oddiy qiymat qaytarilsa, u avtomatik ravishda \`Promise.resolve()\` bilan o'raladi.
\`\`\`javascript
async function myFunc() {
  return "Salom";
}

myFunc().then(res => console.log(res)); // "Salom"
\`\`\`

### B. \`await\` operatori
\`await\` faqat \`async\` funksiya ichida ishlaydi. U Promise bajarilguniga qadar funksiya ijrosini to'xtatib turadi va keyin natijani qaytaradi.
\`\`\`javascript
async function getProfile() {
  // fetch asinxron vaqt oladi, await uni kutadi
  const response = await fetch("https://api.example.com/profile");
  const data = await response.json(); // json parsingni ham kutamiz
  return data;
}
\`\`\`

### C. Xatolarni boshqarish (\`try...catch\`)
Asinxron xatolarni (rejected promislar) ushlash uchun an'anaviy \`try...catch\` blokidan foydalaniladi.
\`\`\`javascript
async function fetchUser() {
  try {
    const res = await fetch("https://invalid-url.com");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.message);
    return null;
  } finally {
    console.log("So'rov yakunlandi.");
  }
}
\`\`\`

### D. Parallel va Ketma-ket (Sequential) Await
- **Ketma-ket (Sequential):** Agar har bir await bir-biridan mustaqil bo'lsa-da, ularni ketma-ket yozsak, umumiy vaqt ko'payadi.
  \`\`\`javascript
  // KOD 4 soniya oladi (2s + 2s)
  const user = await getUser(); // 2s
  const posts = await getPosts(); // 2s
  \`\`\`
- **Parallel:** Promislarni parallel boshlab yuborib, so'ng ularni birgalikda kutish tezroq ishlaydi.
  \`\`\`javascript
  // KOD 2 soniya oladi (parallel)
  const userPromise = getUser(); // darhol boshlanadi
  const postsPromise = getPosts(); // darhol boshlanadi
  
  const user = await userPromise;
  const posts = await postsPromise;
  // yoki: const [user, posts] = await Promise.all([userPromise, postsPromise]);
  \`\`\`

### E. Tsikllar ichida \`await\` ishlatish
- \`for...of\` tsikli ichida \`await\` ishlatilganda, iteratsiyalar ketma-ket (biri tugagandan keyin ikkinchisi) bajariladi.
- \`Array.prototype.forEach\` ichida \`await\` ishlatilsa, u awaitni kutmaydi va barcha asinxron operatsiyalarni parallel boshlab yuboradi (chunki \`forEach\` o'z callbackini kutmaydi).

### F. Ketma-ket (Sequential) vs Parallel Await (Vizual taqqoslash)

Ketma-ket chaqirilgan awaitlar va parallel chaqirilgan awaitlar o'rtasidagi vaqt tejalishini quyidagi sxemada yaqqol ko'rish mumkin (masalan, ikkita 2 soniyali asinxron ishda):

\`\`\`mermaid
gantt
    title Ketma-ket vs Parallel bajarilish vaqti
    dateFormat  X
    axisFormat %s s
    section Ketma-ket (4s)
    Await A (2s)           :a1, 0, 2
    Await B (2s)           :a2, after a1, 2
    section Parallel (2s)
    Promise.all A (2s)     :b1, 0, 2
    Promise.all B (2s)     :b2, 0, 2
\`\`\`

### G. Custom Thenables bilan ishlash
Xuddi Promislar kabi, \`await\` operatori ham \`.then()\` metodiga ega bo'lgan har qanday 'thenable' obyekt bilan muammosiz ishlaydi:
\`\`\`javascript
const customThenable = {
  then(resolve) {
    setTimeout(() => resolve("Tayyor!"), 1000);
  }
};

async function run() {
  const result = await customThenable;
  console.log(result); // "Tayyor!"
}
\`\`\`

### H. Klass Metodlarini Asinxron qilish
Klasslar ichidagi metodlar ham \`async\` kalit so'zi bilan e'lon qilinishi mumkin va oddiy funksiyalar kabi chaqiriladi:
\`\`\`javascript
class UserAPI {
  async fetchProfile(id) {
    const res = await fetch(\`https://api.com/users/\${id}\`);
    return res.json();
  }
}
const api = new UserAPI();
const user = await api.fetchProfile(1);
\`\`\`

### I. Async IIFE (Darhol chaqiriluvchi asinxron funksiya)
Agar moduldan tashqarida top-level await qo'llab-quvvatlanmasa, kodni asinxron ishga tushirish uchun Async IIFE dan foydalaniladi:
\`\`\`javascript
(async () => {
  const data = await getProfile();
  console.log(data);
})();
\`\`\`

---

## 4. AMALIYOT

Quyida foydalanuvchi va uning buyurtmalarini xavfsiz parallel yuklash misoli keltirilgan:
\`\`\`javascript
async function loadDashboard(userId) {
  try {
    console.log("Yuklanmoqda...");
    const userPromise = fetchUser(userId);
    const ordersPromise = fetchOrders(userId);

    // Parallel kutish
    const [user, orders] = await Promise.all([userPromise, ordersPromise]);
    
    return { user, orders };
  } catch (err) {
    console.error("Dashboard yuklanmadi:", err);
    return null;
  }
}
\`\`\`

---

## 5. XATOLAR (Common Mistakes)

1. **\`await\`ni oddiy funksiyada ishlatish:**
   \`\`\`javascript
   // XATO: SyntaxError beradi
   function test() {
     const data = await fetchData(); 
   }
   \`\`\`
2. **\`await\`ni yozishni unutish:**
   \`\`\`javascript
   // XATO: user o'zgaruvchisida data emas, balki Promise obyekti saqlanib qoladi
   const user = fetchUser();
   console.log(user.name); // undefined
   \`\`\`
3. **try...catch-dan foydalanmaslik:**
   Agar asinxron funksiyada xatolik yuz bersa va u catch qilinmasa, u \`UnhandledPromiseRejection\` xatosini keltirib chiqaradi.

---

## 6. SAVOLLAR VA JAVOBLAR

**1. async kalit so'zi nima vazifani bajaradi?**
Funksiyani asinxron qiladi va uning har doim Promise qaytarishini ta'minlaydi. Agar funksiyadan oddiy qiymat qaytsa, u avtomatik ravishda Promise.resolve() bilan o'raladi.

**2. await operatori qanday vazifani bajaradi?**
Promise yakunlanishini (fulfilled yoki rejected bo'lishini) asinxron ravishda kutadi va natijasini qaytaradi. U funksiya bajarilishini bloklamaydi, balki fonda kutadi.

**3. await operatorini oddiy sinxron funksiyalarda ishlatsa bo'ladimi?**
Yo'q, oddiy funksiyalar ichida await ishlatish SyntaxError (sinxtaksik xato)ga olib keladi. Faqat async funksiyalar ichida yoki ES modullarning yuqori darajasida (top-level await) ishlatish mumkin.

**4. async/await yordamida asinxron xatolarni qanday ushlaymiz?**
Sinxron koddagi kabi an'anaviy try...catch blokidan foydalanib ushlaymiz. Agar await qilinayotgan Promise rad etilsa (rejected), xato catch blokiga otiladi.

**5. Ketma-ket (sequential) va parallel await qilish o'rtasidagi farq nima?**
Ketma-ket await qilishda har bir Promise oldingisi tugagandan keyin boshlanadi, bu vaqtni cho'zadi. Parallel qilishda esa barcha Promislar birdaniga ishga tushirilib, keyin parallel ravishda kutiladi (masalan, Promise.all yordamida).

**6. Tsikllar (loops) ichida await ishlatganda forEach va for...of farqi nimada?**
for...of tsikli iteratsiyalarni ketma-ket (sequential) kutadi (navbatma-navbat). forEach esa callback funksiyani barcha elementlar uchun parallel (asinxron) chaqirib yuboradi va awaitlarni kutib o'tirmaydi.

**7. async funksiya ichida return ishlatilmasa, u nima qaytaradi?**
U qiymati undefined bo'lgan, muvaffaqiyatli yakunlangan (resolved) Promise qaytaradi.

**8. try...catch...finally bloki asinxron kodda qanday ishlaydi?**
finally bloki try yoki catch ishlashidan qat'i nazar, asinxron operatsiyalar tugagandan so'ng har doim oxirida ishga tushadi (masalan, yuklanish indikatorini o'chirish uchun mos keladi).

**9. Top-level await nima va u qachon ishlaydi?**
Bu asinxron funksiya tashqarisida, ya'ni modulning eng yuqori darajasida await ishlatish imkoniyatidir. U faqat ES Modullarda (JavaScript modules, type: "module") ishlaydi.

**10. async/await ishlatganda dasturning ishlash tezligi o'zgaradimi?**
Yo'q, chunki async/await - bu Promislarning ustiga qurilgan "sintaksik shakar" (syntactic sugar). U kodning o'qilishini yaxshilaydi, lekin ishlash samaradorligini o'zgartirmaydi.

**11. Nima uchun .catch() metodi o'rniga try...catch afzal ko'riladi?**
try...catch yordamida ham asinxron (await xatolari), ham sinxron (masalan, JSON.parse xatolari) xatolarni bitta blokda va an'anaviy uslubda ushlash mumkin.

**12. async arrow function (o'q funksiya) qanday e'lon qilinadi?**
Kalit so'z parametrlar ro'yxatidan oldin qo'yiladi: const myFn = async () => { ... }.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Async Funksiya e'lon qilish",
      instruction: "Muvaffaqiyatli 'Salom' matnini qaytaruvchi asinxron `sayHello` funksiyasini yozing.",
      startingCode: "async function sayHello() {\n  // Bu yerga yozing\n}",
      hint: "return 'Salom'; yozing. Async funksiya avtomatik ravishda Promise qaytaradi.",
      test: "if (typeof sayHello !== 'function') return 'sayHello funksiya emas'; const p = sayHello(); if (!(p instanceof Promise)) return 'sayHello Promise qaytarmadi'; return p.then(r => r === 'Salom' ? null : 'Natija Salom emas');"
    },
    {
      id: 2,
      title: "2️⃣ Await yordamida natijani kutish",
      instruction: "Berilgan `fetchData` funksiyasi Promise qaytaradi. `getData` asinxron funksiyasi ichida `fetchData`ni await orqali chaqiring va undan qaytgan qiymatni return qiling.",
      startingCode: "const fetchData = () => Promise.resolve(\"Ma'lumot\");\n\nasync function getData() {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetchData(); return res;",
      test: "if (typeof getData !== 'function') return 'getData funksiya emas'; const p = getData(); if (!(p instanceof Promise)) return 'getData Promise qaytarmadi'; return p.then(r => r === \"Ma'lumot\" ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 3,
      title: "3️⃣ Asinxron xatolarni try...catch orqali ushlash",
      instruction: "Berilgan `failFetch` funksiyasi xatolik tashlaydi. `safeGet` funksiyasi ichida `failFetch`ni `await` qiling. Agar xato bo'lsa, `catch` orqali uni ushlang va 'Xatolik yuz berdi' matnini qaytaring.",
      startingCode: "const failFetch = () => Promise.reject(\"Xato\");\n\nasync function safeGet() {\n  // Bu yerga yozing\n}",
      hint: "try { await failFetch(); } catch (e) { return 'Xatolik yuz berdi'; }",
      test: "if (typeof safeGet !== 'function') return 'safeGet funksiya emas'; return safeGet().then(r => r === 'Xatolik yuz berdi' ? null : 'Xato ushlanmadi');"
    },
    {
      id: 4,
      title: "4️⃣ Promise.all ni await qilish",
      instruction: "Berilgan `p1` va `p2` promislarini parallel bajarib, ularning natijalarini `Promise.all` va `await` yordamida oling hamda massiv ko'rinishida qaytaruvchi `getParallel` funksiyasini yozing.",
      startingCode: "const p1 = Promise.resolve(\"A\");\nconst p2 = Promise.resolve(\"B\");\n\nasync function getParallel() {\n  // Bu yerga yozing\n}",
      hint: "return await Promise.all([p1, p2]);",
      test: "if (typeof getParallel !== 'function') return 'getParallel funksiya emas'; return getParallel().then(r => Array.isArray(r) && r[0] === 'A' && r[1] === 'B' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 5,
      title: "5️⃣ Ketma-ket (Sequential) await qilish",
      instruction: "Berilgan `p1` va `p2` promislarini ketma-ket (sequential) `await` qiling va natijalarini 'A B' ko'rinishida birlashtirib qaytaruvchi `getSequential` funksiyasini yozing.",
      startingCode: "const p1 = () => Promise.resolve(\"A\");\nconst p2 = () => Promise.resolve(\"B\");\n\nasync function getSequential() {\n  // Bu yerga yozing\n}",
      hint: "const r1 = await p1(); const r2 = await p2(); return r1 + ' ' + r2;",
      test: "if (typeof getSequential !== 'function') return 'getSequential funksiya emas'; return getSequential().then(r => r === 'A B' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 6,
      title: "6️⃣ Async/Await va finally bloki",
      instruction: "`loading` holatini boshqarish uchun `finally` ishlating. `processData` funksiyasi ichida `fetchData`ni await qiling. Natija qanday bo'lishidan qat'i nazar oxirida `loading` o'zgaruvchisini `false` qiling.",
      startingCode: "let loading = true;\nconst fetchData = () => Promise.resolve(\"OK\");\n\nasync function processData() {\n  try {\n    // Bu yerga yozing\n  } catch (e) {\n  }\n}",
      hint: "fetchData ni await qiling va try/catch dan keyin finally { loading = false; } yozing.",
      test: "if (typeof processData !== 'function') return 'processData funksiya emas'; return processData().then(() => !loading ? null : 'loading false bo\\'lmadi');"
    },
    {
      id: 7,
      title: "7️⃣ for...of tsiklida ketma-ket kutish",
      instruction: "Berilgan `urls` massividagi har bir urlni `fetchData` funksiyasiga uzatib, ketma-ket (sequential) `await` qiling va natijalarni console-ga chiqaring.",
      startingCode: "const urls = ['url1', 'url2'];\nconst fetchData = (url) => Promise.resolve(url + ' data');\n\nasync function logSequentially(urls) {\n  // Bu yerga for...of orqali yozing\n}",
      hint: "for (const url of urls) { const data = await fetchData(url); console.log(data); }",
      test: "if (typeof logSequentially !== 'function') return 'logSequentially funksiya emas'; return logSequentially(urls).then(() => logs.includes('url1 data') && logs.includes('url2 data') ? null : 'Natijalar log qilinmadi');"
    },
    {
      id: 8,
      title: "8️⃣ Async Arrow Function",
      instruction: "Qiymati 'Arrow' bo'lgan asinxron o'q funksiya (arrow function) yarating va uni `getArrow` o'zgaruvchisiga yuklang.",
      startingCode: "const getArrow = // Bu yerga yozing\n",
      hint: "const getArrow = async () => 'Arrow';",
      test: "if (typeof getArrow !== 'function') return 'getArrow funksiya emas'; return getArrow().then(r => r === 'Arrow' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 9,
      title: "9️⃣ Asinxron xatoni qayta otish (Rethrow)",
      instruction: "`fetchError` funksiyasini `await` qiling, agar xatolik yuz bersa, uni `catch` ichida konsolga 'Xato ushlandi' deb yozing va xatoni qayta `throw` qiling (rethrow).",
      startingCode: "const fetchError = () => Promise.reject(new Error(\"Tarmoq xatosi\"));\n\nasync function handleAndRethrow() {\n  // Bu yerga yozing\n}",
      hint: "try { await fetchError(); } catch (e) { console.log('Xato ushlandi'); throw e; }",
      test: "if (typeof handleAndRethrow !== 'function') return 'handleAndRethrow funksiya emas'; return handleAndRethrow().then(() => 'Xato qayta otilmadi').catch(err => logs.includes('Xato ushlandi') ? null : 'Konsolga xato yozilmadi');"
    },
    {
      id: 10,
      title: "🔟 Promise.race ni await qilish",
      instruction: "`fetchData` va `timeout` promislaridan birinchi bo'lib bajarilganini `await` qiling va uning natijasini qaytaring.",
      startingCode: "const fetchData = new Promise(resolve => setTimeout(() => resolve(\"Omadli\"), 20));\nconst timeout = new Promise((_, reject) => setTimeout(() => reject(\"Taymaut\"), 50));\n\nasync function requestWithTimeout() {\n  // Bu yerga yozing\n}",
      hint: "return await Promise.race([fetchData, timeout]);",
      test: "if (typeof requestWithTimeout !== 'function') return 'requestWithTimeout funksiya emas'; return requestWithTimeout().then(r => r === 'Omadli' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Promise.allSettled ni await qilish",
      instruction: "Berilgan `promises` massividagi promislar yakunlanishini `Promise.allSettled` yordamida `await` qiling va natijalarni qaytaring.",
      startingCode: "const promises = [Promise.resolve(1), Promise.reject('xato')];\n\nasync function getAllStates() {\n  // Bu yerga yozing\n}",
      hint: "return await Promise.allSettled(promises);",
      test: "if (typeof getAllStates !== 'function') return 'getAllStates funksiya emas'; return getAllStates().then(r => Array.isArray(r) && r[0].status === 'fulfilled' && r[1].status === 'rejected' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Asinxron IIFE (Self-invoking async function)",
      instruction: "O'zini o'zi chaqiruvchi asinxron funksiya (IIFE) yozing, u ichida `Promise.resolve('IIFE OK')`ni `await` qilsin va natijasini konsolga chiqarsin.",
      startingCode: "// Bu yerga yozing\n",
      hint: "(async () => { const res = await Promise.resolve('IIFE OK'); console.log(res); })();",
      test: "if (code.includes('async') && logs.includes('IIFE OK')) return null; return 'Asinxron IIFE yozilmadi yoki natija log qilinmadi';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Thenable Obyekt bilan Await",
      instruction: "Berilgan `customThenable` obyektini `await` qiling va natijasini qaytaruvchi `getThenableResult` asinxron funksiyasini yozing.",
      startingCode: "const customThenable = {\n  then(resolve) {\n    setTimeout(() => resolve(\"Thenable OK\"), 10);\n  }\n};\n\nasync function getThenableResult() {\n  // Bu yerga yozing\n}",
      hint: "return await customThenable;",
      test: "if (typeof getThenableResult !== 'function') return 'getThenableResult funksiya emas'; return getThenableResult().then(r => r === 'Thenable OK' ? null : 'Natija noto\\'g\\'ri');"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Parallel Await va Destrukturizatsiya",
      instruction: "Berilgan `fetchPrice` va `fetchQuantity` promislarini parallel ravishda ishga tushiring, `Promise.all` va `await` yordamida natijalarini oling, massiv destrukturizatsiyasi orqali ularni `price` va `quantity` o'zgaruvchilariga saqlang va ularning ko'paytmasini (`price * quantity`) qaytaruvchi `getTotal` asinxron funksiyasini yozing.",
      startingCode: "const fetchPrice = () => Promise.resolve(150);\nconst fetchQuantity = () => Promise.resolve(3);\n\nasync function getTotal() {\n  // Bu yerga yozing\n}",
      hint: "const [price, quantity] = await Promise.all([fetchPrice(), fetchQuantity()]); return price * quantity;",
      test: "if (typeof getTotal !== 'function') return 'getTotal funksiya emas'; return getTotal().then(r => r === 450 ? null : 'Jami summa noto\\'g\\'ri');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`async` funksiya ichida `return 5` yozilsa, funksiya chaqirilganda nima qaytaradi?",
      options: [
        "Sinxron 5 qiymati",
        "Promise (u 5 qiymati bilan resolve bo'ladi)",
        "undefined",
        "Xatolik (SyntaxError)"
      ],
      correctAnswer: 1,
      explanation: "Async funksiyalar har doim Promise qaytaradi. Ichidagi oddiy qiymat avtomatik ravishda Promise.resolve(5) bilan o'raladi."
    },
    {
      id: 2,
      question: "`await` kalit so'zi qayerda ishlatilishi shart?",
      options: [
        "Har qanday funksiya ichida",
        "Faqat `async` bilan belgilangan funksiyalar ichida (yoki top-level ES modullarda)",
        "Faqat for/while looplar ichida",
        "Faqat global scoperda"
      ],
      correctAnswer: 1,
      explanation: "Sinxron funksiyalar ichida `await` ishlatish `SyntaxError` ga olib keladi. U faqat asinxron muhit (async funksiya) uchun mo'ljallangan."
    },
    {
      id: 3,
      question: "Agar `await` qilinayotgan Promise rad etilsa (rejected bo'lsa), xatoni qanday ushlash mumkin?",
      options: [
        "Xatoni ushlab bo'lmaydi, dastur to'xtaydi",
        "An'anaviy `try...catch` bloki yordamida",
        "Faqat `.catch()` zanjirini ulash orqali",
        "Faqat window.onerror yordamida"
      ],
      correctAnswer: 1,
      explanation: "Async/await da promisning reject bo'lishi xato otilishiga (throw) sabab bo'ladi va uni sinxron kod kabi `try...catch` bloki bilan osongina ushlash mumkin."
    },
    {
      id: 4,
      question: "Quyidagi kodning bajarilishi uchun qancha vaqt ketadi?\n```javascript\nconst a = await delay(1000);\nconst b = await delay(1000);\n```",
      options: [
        "1 soniya (parallel)",
        "2 soniya (ketma-ket)",
        "0 soniya",
        "Xatolik yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Bu yerda ikkita await ketma-ket yozilgan. Birinchi delay tugamaguncha ikkinchisi boshlanmaydi. Shuning uchun umumiy vaqt 1s + 1s = 2s bo'ladi."
    },
    {
      id: 5,
      question: "Quyidagi kodning bajarilishi uchun qancha vaqt ketadi?\n```javascript\nconst p1 = delay(1000);\nconst p2 = delay(1000);\nawait Promise.all([p1, p2]);\n```",
      options: [
        "2 soniya (ketma-ket)",
        "1 soniya (parallel)",
        "0.5 soniya",
        "1000 soniya"
      ],
      correctAnswer: 1,
      explanation: "Bu yerda promislar parallel ishga tushadi (`delay(1000)` chaqirilishi bilan). Keyin `Promise.all` yordamida parallel kutiladi. Shuning uchun jami 1 soniya ketadi."
    },
    {
      id: 6,
      question: "`Array.prototype.forEach` ichida `await` ishlatilganda nima sodir bo'ladi?",
      options: [
        "Elementlar ketma-ket kutiladi",
        "Elementlar uchun callback parallel asinxron chaqiriladi va forEach ularni kutib o'tirmaydi",
        "SyntaxError xatosi yuz beradi",
        "Faqat birinchi element kutiladi"
      ],
      correctAnswer: 1,
      explanation: "forEach callback funksiyasi sinxron ishga tushadi va u asinxron promislar qaytarishini inobatga olmaydi. Shuning uchun u awaitni kutmaydi."
    },
    {
      id: 7,
      question: "`async` funksiyaning o'zida xato yuz bersa (throw), u qaytaradigan Promise holati qanday bo'ladi?",
      options: [
        "Pending bo'lib qolaveradi",
        "Rejected bo'ladi",
        "Fulfilled bo'ladi",
        "Funksiya avtomatik ravishda qayta ishga tushadi"
      ],
      correctAnswer: 1,
      explanation: "Async funksiya ichida xato otilsa (throw), u qaytaradigan Promise rejected (rad etilgan) holatga o'tadi va xato xabari promisning reason qismiga aylanadi."
    },
    {
      id: 8,
      question: "`finally` bloki asinxron `try...catch`da qachon bajariladi?",
      options: [
        "Faqat xato bo'lmaganda",
        "Faqat xatolik yuz berganda",
        "Har qanday holatda (muvaffaqiyatli yoki muvaffaqiyatsiz bo'lsa ham)",
        "Hech qachon bajarilmaydi"
      ],
      correctAnswer: 2,
      explanation: "finally bloki har qanday holatda ham, ya'ni operatsiya muvaffaqiyatli yakunlansa ham yoki xato bo'lsa ham eng oxirida ishlaydi."
    },
    {
      id: 9,
      question: "Top-level await qayerda ishlaydi?",
      options: [
        "Har qanday oddiy script fayllarda",
        "Faqat ES Modullarning eng yuqori darajasida (async funksiya tashqarisida)",
        "Faqat CSS fayllarda",
        "Faqat localStorageda"
      ],
      correctAnswer: 1,
      explanation: "Top-level await faqat JavaScript Modullar (ESM) ichida ruxsat etiladi, oddiy skriptlar ichida esa uni ishlatish xatolikka sabab bo'ladi."
    },
    {
      id: 10,
      question: "Quyidagi kod nima qaytaradi?\n```javascript\nasync function test() {}\n```",
      options: [
        "undefined",
        "Promise { <fulfilled>: undefined }",
        "Promise { <pending> }",
        "null"
      ],
      correctAnswer: 1,
      explanation: "Return qiymati ko'rsatilmagan async funksiya qiymati `undefined` bo'lgan va muvaffaqiyatli bajarilgan (fulfilled) Promise qaytaradi."
    },
    {
      id: 11,
      question: "Sinxron xatolar (masalan, JSON.parse xatosi) `try...catch` ichidagi `await` bilan birga tutilishi mumkinmi?",
      options: [
        "Yo'q, faqat asinxron xatolar tutiladi",
        "Ha, try...catch ikkala turdagi xatolarni ham bitta joyda tuta oladi",
        "Faqat strict rejim yoqilgan bo'lsa",
        "Buning uchun uchinchi kutubxona kerak"
      ],
      correctAnswer: 1,
      explanation: "try...catch bloki o'zining ichida sodir bo'lgan har qanday sinxron va asinxron (await qilingan) xatolarni ushlash xususiyatiga ega."
    },
    {
      id: 12,
      question: "`await` operatorining ishlatilishi JavaScript-ni ko'p oqimli (multi-threaded) qiladimi?",
      options: [
        "Ha, u yangi oqimlar ochadi",
        "Yo'q, u faqat bajarilish navbatini boshqaradi, JS hamon yagona oqimli (single-threaded) bo'lib qolaveradi",
        "Faqat Node.js muhitida",
        "Faqat Google Chrome brauzerida"
      ],
      correctAnswer: 1,
      explanation: "JavaScript har doim yagona oqimli til. Await oqimni to'xtatmaydi, u fondagi asinxron operatsiyalar bajarilishini asinxron kutib, oqimni boshqa ishlarga bo'shatib beradi."
    },
    {
      id: 13,
      question: "JavaScript-da `await` operatoriga `.then()` metodiga ega bo'lgan ob'ekt (thenable) uzatilsa, `await` o'zini qanday tutadi?",
      options: [
        "Xatolik (TypeError) tashlaydi",
        "Uni oddiy sinxron obyekt deb hisoblab, kutmasdan obyektning o'zini qaytaradi",
        "Ushbu `.then()` metodini chaqiradi va uning resolve qilinishini xuddi Promise kabi kutadi",
        "Faqat funksiya generator (Generator) bo'lsagina ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "`await` operatori nafaqat haqiqiy Promislar, balki `.then` metodiga ega bo'lgan har qanday Thenable obyektlar bilan ham xuddi Promise kabi ishlay oladi va ularning bajarilishini kutadi."
    },
    {
      id: 14,
      question: "Quyidagilardan qaysi biri to'g'ri: Top-level `await` qaysi muhitda ishlaydi?",
      options: [
        "Har qanday JavaScript faylida va har qanday global scope-da",
        "Faqat ECMAScript Modullarida (ES Modules, type: 'module') eng yuqori darajada",
        "Faqat Node.js ning CommonJS (require) skriptlarida",
        "Faqat inline HTML skript teglari ichida"
      ],
      correctAnswer: 1,
      explanation: "Top-level `await` faqat ES Modullarning (ESM) yuqori darajasida ishlaydi. Oddiy CommonJS skriptlarida uni asinxron funksiya tashqarisida ishlatish SyntaxError xatosiga olib keladi."
    }
  ]
};
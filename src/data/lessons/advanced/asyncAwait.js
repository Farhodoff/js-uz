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

## 3. CHUQUR TUSHUNCHALAR VA ENGINE UNDER-THE-HOOD

### A. Generatorlar va Promise Integratsiyasi (Under the hood)
JavaScript dvigateli (V8) asinxron funksiyalarni **Generatorlar** (\`function*\`) va **Promises** yordamida qayta ishlaydi. Har safar \`await\` operatori ko'rilganda, generator o'z faoliyatini to'xtatadi (\`yield\`) va boshqaruvni asosiy Call Stack-ga beradi. \`await\` qilinayotgan Promise hal bo'lganidan keyin (\`resolve\`), generator yana o'z faoliyatini tiklaydi (\`next()\`).

### B. Ketma-ket (Sequential) vs Parallel Await (Performance)
Juda ko'p uchraydigan xatolardan biri asinxron so'rovlarni bir-biriga bog'liq bo'lmagan holda ketma-ket kutib o'tirishdir:

* **Sinxron/Ketma-ket Await (Yomon performance):**
  \`\`\`javascript
  // Har bir so'rov oldingisi tugagachgina boshlanadi (Total: 4 soniya)
  const r1 = await fetch("api1"); // 2s
  const r2 = await fetch("api2"); // 2s
  \`\`\`
* **Parallel Await (Yaxshi performance):**
  \`\`\`javascript
  // Ikkala so'rov parallel boshlanadi (Total: 2 soniya)
  const p1 = fetch("api1");
  const p2 = fetch("api2");
  const [r1, r2] = await Promise.all([p1, p2]);
  \`\`\`

\`\`\`mermaid
gantt
    title Await Timeline (Ketma-ket vs Parallel)
    dateFormat  X
    axisFormat %s
    section Ketma-ket Await
    API 1 (2s)        :active, 0, 2
    API 2 (2s)        : 2, 4
    section Parallel Await
    API 1 (2s)        :active, 0, 2
    API 2 (2s)        :active, 0, 2
\`\`\`

### C. Top-Level Await va Cheklovlar
ES2022 dan boshlab \`async\` funksiya tashqarisida ham (modulning eng yuqori darajasida) \`await\` yozishga ruxsat berildi. Ammo buning cheklovlari bor:
- Faqat **ES Modullarda** (\`import\`/\`export\` ishlatadigan) ishlaydi.
- Modulni import qilayotgan boshqa modullar uning eng yuqoridagi await-i hal bo'lgunicha importni **bloklab** (kutib) turishadi. Bu sahifa yuklanish tezligiga ta'sir qilishi mumkin.

### D. Error Propagation (Xatolar tarqalishi)
Async funksiyalar ichida yuz bergan har qanday tutilmagan xatolik (uncaught exception) funksiya qaytargan Promiseni rad etilishiga (\`rejected\`) sabab bo'ladi. Xatolarni oddiy \`try...catch\` yordamida ushlash mumkin.

\`\`\`mermaid
sequenceDiagram
    participant Main as Asosiy oqim (Main Thread)
    participant AsyncFn as Async funksiya (getData)
    participant WebAPI as Web API (fetch)
    
    Main->>AsyncFn: getData() chaqiriladi
    AsyncFn->>WebAPI: fetch('api/data') - asinxron boshlanadi
    Note over AsyncFn: await fetch(...) - funksiya to'xtatiladi (suspended)
    AsyncFn-->>Main: Promise { pending } qaytariladi
    Note over Main: Asosiy oqim boshqa ishlarni bajaradi (UI render, eventlar)
    WebAPI-->>AsyncFn: Ma'lumot tayyor (resolve)
    Note over AsyncFn: getData() o'z ishini davom ettiradi (resumed)
    AsyncFn-->>Main: Yakuniy natija qaytadi (fulfilled)
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR
1. **\`await\` yozishni unutib, uning qaytargan qiymatini oddiy ma'lumot deb o'ylash:** Bu holatda qiymat o'rniga siz \`Promise { <pending> }\` obyektini olasiz.
2. **Parallel chaqirish mumkin bo'lgan joyda ketma-ket await qilish:** Tarmoq so'rovlarini parallel yuborish o'rniga keraksiz kutishlarni hosil qilish.

---

## 5. SAVOLLAR VA JAVOBLAR

**1. async funksiya har doim nima qaytaradi?**
U har doim Promise qaytaradi. Agar funksiya ichidan oddiy qiymat qaytarilsa (return), u avtomatik ravishda Promise.resolve(qiymat) bilan o'raladi.

**2. await kalit so'zi qayerda ishlatilishi mumkin?**
Faqat async funksiyalarning ichida yoki ES modullarning eng yuqori qismida (Top-level await).

**3. async/await ichida xatolarni qanday ushlaymiz?**
Oddiy \`try...catch\` bloklaridan foydalanib sinxron kod kabi ushlaymiz.

**4. Top-level await nima va u qayerda ishlaydi?**
Bu async funksiyadan tashqarida await ishlatish imkoni bo'lib, faqat JavaScript ES Modullarda (.mjs yoki type: module sozlamasi bilan) ishlaydi.

**5. Parallel asinxron so'rovlarni async/await bilan qanday optimallashtiramiz?**
\`Promise.all\` yordamida barcha promislar ro'yxatini parallel boshlab, so'ng ularni bitta qatorda await qilamiz.
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
      id: 1,
      question: "Async/Await nima?",
      options: [
        "Sinxron kodlarni asinxron qilish usuli",
        "Promislarning ustiga qurilgan, asinxron kodni chiziqli (sinxron ko'rinishda) yozishga imkon beradigan maxsus sintaksis (syntactic sugar)",
        "Oyna yangilanishini to'xtatuvchi brauzer vositasi",
        "Xotirani avtomatik tozalovchi algoritm"
      ],
      correctAnswer: 1,
      explanation: "Async/Await ES8 da taqdim etilgan bo'lib, Promislar bilan ishlashni osonlashtiradi va kodni sinxron ko'rinishda yozish imkonini beradi."
    },
    {
      id: 2,
      question: "Qaysi kalit so'z funksiyani har doim Promise qaytaradigan qilib belgilaydi?",
      options: [
        "await",
        "async",
        "promise",
        "defer"
      ],
      correctAnswer: 1,
      explanation: "`async` kalit so'zi funksiya e'lonidan oldin qo'yilib, uning natijasini har doim promisga o'raydi."
    },
    {
      id: 3,
      question: "await operatorini qayerda ishlatish mumkin?",
      options: [
        "Istalgan funksiya ichida va global doirada",
        "Faqat `async` deb belgilangan funksiyalar ichida yoki ES Modullarning eng yuqori darajasida (Top-level await)",
        "Faqat `for` tsikli ichida",
        "Faqat `catch` bloki ichida"
      ],
      correctAnswer: 1,
      explanation: "`await` operatoridan faqat asinxron kontekstlarda, ya'ni `async` funksiya ichida yoki ES modullarda top-level darajada foydalanish mumkin."
    },
    {
      id: 4,
      question: "Async funksiya ichida yuz bergan tutilmagan xatolik (unhandled exception) qanday natijaga olib keladi?",
      options: [
        "Dastur cheksiz loopga kirib qoladi",
        "Funksiya qaytargan Promise obyekti rad etiladi (rejected)",
        "Dastur xatoni e'tiborsiz qoldirib davom etadi",
        "O'zgaruvchilar avtomatik o'chadi"
      ],
      correctAnswer: 1,
      explanation: "Tutilmagan xatolik async funksiyadan qaytgan promisening reject holatiga o'tishiga (xato bilan tugashiga) olib keladi."
    },
    {
      id: 5,
      question: "Ko'p sonli bir-biriga bog'liq bo'lmagan tarmoq so'rovlarini async/await bilan qanday qilib eng tez bajarish mumkin?",
      options: [
        "Har birini ketma-ket `await fetch(...)` qilish",
        "Ularni parallel boshlab, \`Promise.all\` yordamida barchasini birdaniga kutish",
        "Hech qanday await ishlatmaslik",
        "Ularni callbacks yordamida ichma-ich yozish"
      ],
      correctAnswer: 1,
      explanation: "Parallel so'rovlarni boshlab, so'ng `Promise.all` yordamida parallel kutish tarmoq uzilishlari va keraksiz kutishlarni oldini oladi va tezroq bajariladi."
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilganda nima chiqadi?\n```javascript\nasync function test() {\n  return 10;\n}\nconsole.log(test());\n```",
      options: [
        "10",
        "Promise { <fulfilled>: 10 } (yoki pending Promise)",
        "undefined",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "async funksiya chaqirilganda har doim Promise qaytaradi, shuning uchun konsolga 10 soni emas, balki hal qilingan Promise obyekti chiqadi."
    },
    {
      id: 7,
      question: "await operatorining asosiy ishlash prinsipi nimadan iborat?",
      options: [
        "U CPU oqimini butunlay bloklaydi va brauzerni qotiradi",
        "U promis yakunlanguncha funksiya ijrosini to'xtatib turadi (suspend qiladi), ammo asosiy oqim boshqa ishlarni (UI render, eventlar) bajarishda davom etadi",
        "U kodni boshqa faylga yozib qo'yadi",
        "U ma'lumotlarni shifrlaydi"
      ],
      correctAnswer: 1,
      explanation: "`await` faqat joriy async funksiya ijrosini to'xtatib turadi. V8 dvigateli boshqa ishlarni bajarishda davom etadi, sahifa qotmaydi."
    },
    {
      id: 8,
      question: "ES2022 dagi 'Top-level await'ning asosiy afzalligi nimada?",
      options: [
        "U loops-larni tezlashtiradi",
        "Asosiy modul darajasida (async funksiyasiz) asinxron modullarni, API-larni yoki konfiguratsiyalarni await qilish imkoni",
        "Faqat Node.js da ishlashi",
        "Xatolarni avtomatik o'chira olishi"
      ],
      correctAnswer: 1,
      explanation: "Top-level await yordamida eng yuqori darajada await ishlatish mumkin, bu dinamik modullarni yuklash va asinxron init ishlarida juda qo'l keladi."
    },
    {
      id: 9,
      question: "JavaScript dvigateli (V8) asinxron funksiyalar va await-ni o'zining ichki qismida asosan qaysi mexanizm bilan realizatsiya qiladi?",
      options: [
        "Generatorlar (function*) va Promises kombinatsiyasi",
        "Cheksiz recursive while looplar",
        "Web worker threads",
        "Sinxron AJAX so'rovlari"
      ],
      correctAnswer: 0,
      explanation: "Async/await aslida generatorlarning yielding control-flow mexanizmi va Promislar bilan ishlash mantiqining sintaktik qobig'idir."
    },
    {
      id: 10,
      question: "Quyidagi kodda qanday muammo bor?\n```javascript\nconst data = await fetch('api/data').then(r => r.json());\n```",
      options: [
        "Top-level await faqat ES modullarda ishlaydi; oddiy skriptlarda SyntaxError beradi",
        "Fetch so'rovi bu usulda ishlamaydi",
        "Await oldiga async so'zi qo'yilishi shart",
        "Koddagi `.then` asinxron emas"
      ],
      correctAnswer: 0,
      explanation: "Top-level await faqat ES modullarda (`import` tizimida) ishlaydi. Standart skript fayllarda u xatolik beradi."
    },
    {
      id: 11,
      question: "Sequential await (ketma-ket kutish) qachon tavsiya etiladi?",
      options: [
        "Hech qachon tavsiya etilmaydi",
        "Ikkinchi asinxron so'rovning parametrlari birinchi so'rovdan keladigan natijaga bog'liq bo'lsa",
        "Faqat GET so'rovlarida",
        "Faqat xatolar bo'lmaganda"
      ],
      correctAnswer: 1,
      explanation: "Agar keyingi so'rov oldingi so'rov natijasiga bog'liq bo'lsa (masalan, avval foydalanuvchi ID sini olib, keyin uning postlarini yuklashda), ketma-ket await ishlatish majburiydir."
    },
    {
      id: 12,
      question: "Async funksiya ichida `throw new Error('xato')` chaqirilsa, bu xatolikni qanday tutish mumkin?",
      options: [
        "Faqat `window.onerror` yordamida",
        "Funksiyani chaqirayotgan joyda \`try...catch\` ichiga o'rash yoki qaytgan promisening \`.catch()\` metodidan foydalanish orqali",
        "Buni tutishning imkoni yo'q",
        "Faqat `finally` bloki yordamida"
      ],
      correctAnswer: 1,
      explanation: "Async funksiya ichidagi throw qilingan xato reject bo'lib qaytadi, uni oddiy `try...catch` yoki `.catch()` bilan ushlash mumkin."
    },
    {
      id: 13,
      question: "Promise.all() yordamida parallel await qilinganda, biror so'rov xato bo'lsa qolganlari nima bo'ladi?",
      options: [
        "Qolgan so'rovlar ham bekor qilinadi va butun guruh zudlik bilan reject bo'ladi",
        "Qolganlari muvaffaqiyatli yakunlanadi va xatolar massivga qo'shiladi",
        "Sahifa refresh bo'ladi",
        "Dastur abadiy kutib qoladi"
      ],
      correctAnswer: 0,
      explanation: "Promise.all tezkor rad etish (fail-fast) tamoyiliga ega bo'lib, bitta xato bo'lishi bilan butun guruhni darhol reject qiladi."
    },
    {
      id: 14,
      question: "Top-level await modullar yuklanishida (import) qanday nojo'ya ta'sirga ega bo'lishi mumkin?",
      options: [
        "Import qilinayotgan modul o'zining top-level await operatsiyalari tugamaguncha import qiluvchi boshqa barcha modullarni bloklab turadi (kutishga majbur qiladi)",
        "Modullar hajmini oshiradi",
        "Modullarni o'chirib yuboradi",
        "Hech qanday salbiy ta'siri yo'q"
      ],
      correctAnswer: 0,
      explanation: "Top-level await bloklovchi xususiyatga ega bo'lib, import zanjiridagi barcha ota modullarni so'rov yakunlanguncha kutishga majbur qiladi."
    }
  ]
};

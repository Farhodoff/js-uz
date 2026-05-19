export const asyncAwait = {
  id: "async-await",
  title: "🎯 Async/Await — Asinxronlikning Cho'qqisi",
  level: "Murakkab",
  description: "Async/await orqali asinxron kodni oddiy sinxron kabi yozish.",
  theory: `## 📌 ASYNC/AWAIT — ENG YAXSHI USUL

### 1. NEGA KERAK? (Sabab)
**Promise Hell (Zanjir uzunligi):**
\`\`\`javascript
fetch('/user').then(r => r.json())
  .then(user => fetch(\`/posts/\${user.id}\`))
  .then(r => r.json())
  .then(posts => fetch(\`/comments/\${posts[0].id}\`))
  .then(r => r.json())
  .then(comments => console.log(comments));
\`\`\`

**Async/Await (Tushunarli):**
\`\`\`javascript
const user = await fetch('/user').then(r => r.json());
const posts = await fetch(\`/posts/\${user.id}\`).then(r => r.json());
const comments = await fetch(\`/comments/\${posts[0].id}\`).then(r => r.json());
console.log(comments);
\`\`\`

---

### 2. SODDALIK (Analogiya)

**Navbatda turish:**
- \`async\`: "Men navbatda turyapman" — asinxron funksiya belgilash
- \`await\`: "Mening navbatim kelguncha kutib turaman" — Promise natijavini kutish

---

### 3. TUSHUNCHA (BATAFSIL)

#### A. Async Funksiya

\`\`\`javascript
// 1. ODDIY FUNKSIYA → ASYNC FUNKSIYA
async function getData() {
  return "data"; // Avtomatik Promise ichiga oriladi
}

// Natija:
getData(); // Promise { 'data' }

// 2. AWAIT ISHLASH
async function getData() {
  const natija = await somePromise();
  return natija; // Promise ichida qaytadi
}
\`\`\`

#### B. Await — Promise Natijasini Kutish

\`\`\`javascript
async function main() {
  console.log("Boshlandi");

  // Await — kutish (bu haqida alohida function to'xtab qolmaydi)
  const response = await fetch('/api/data');
  const data = await response.json();

  console.log(data); // KEYIN chiqadi
}

// Await faqat async funksiya ichida ishlatiladi!
\`\`\`

#### C. Xatolar — Try/Catch

\`\`\`javascript
async function main() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('API xatosi');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Xato yuz berdi:', error);
  } finally {
    console.log('Tugadi'); // Har doim
  }
}

main();
\`\`\`

#### D. Ketma-ketlik vs Parallel

\`\`\`javascript
// ❌ SEKIN - Ketma-ketlik (1 + 1 + 1 = 3 sekund)
async function slow() {
  const user = await fetchUser(); // 1s
  const posts = await fetchPosts(user.id); // 1s
  const comments = await fetchComments(posts[0].id); // 1s
  return { user, posts, comments }; // Jami 3s
}

// ✅ TEZROQ - Parallel (max 1 sekund)
async function fast() {
  const [user, posts] = await Promise.all([
    fetchUser(),      // 1s
    fetchPosts(123)   // 1s (parallel!)
  ]);
  const comments = await fetchComments(posts[0].id);
  return { user, posts, comments }; // Jami 2s
}
\`\`\`

#### E. Top-level Await (ES2022)

\`\`\`javascript
// Modul'ning eng yuqori qismida await (async'siz)
const data = await fetch('/api/data').then(r => r.json());
console.log(data);
\`\`\`

---

### 4. CALLBACK → PROMISE → ASYNC/AWAIT TAQQOSLASH

\`\`\`javascript
// 1. CALLBACK (Eng qadim)
function getData(callback) {
  setTimeout(() => callback('data'), 1000);
}
getData(data => console.log(data));

// 2. PROMISE (O'rta)
function getData() {
  return new Promise(r => setTimeout(() => r('data'), 1000));
}
getData().then(data => console.log(data));

// 3. ASYNC/AWAIT (Eng yangi, eng tushunarli)
async function getData() {
  return new Promise(r => setTimeout(() => r('data'), 1000));
}
const data = await getData();
console.log(data);
\`\`\`

---

### 5. XATOLAR VA EDGE CASES

#### ❌ Xato 1: Await async'siz
\`\`\`javascript
// ❌ XATO
function getData() { // ASYNC emas!
  const data = await somePromise(); // SyntaxError
}

// ✅ TO'G'RI
async function getData() { // ASYNC!
  const data = await somePromise();
}
\`\`\`

#### ❌ Xato 2: Parallel'ni ketma-ketlik qilish
\`\`\`javascript
// ❌ SEKIN - Keraksiz ketma-ketlik
async function getAll() {
  const a = await promise1(); // 1s
  const b = await promise2(); // 1s (ketma-ketlik!)
  const c = await promise3(); // 1s
  return [a, b, c]; // Jami 3s
}

// ✅ TEZROQ - Parallel
async function getAll() {
  const [a, b, c] = await Promise.all([
    promise1(), // 1s
    promise2(), // 1s (parallel!)
    promise3()  // 1s (parallel!)
  ]);
  return [a, b, c]; // Jami 1s
}
\`\`\`

#### ❌ Xato 3: Try-catch ni unutish
\`\`\`javascript
// ❌ XATO - Xato yashiringan
async function main() {
  const data = await fetch('/api').then(r => r.json());
  // Xato bo'lsa, faqat konsolda qiziqlash xato
}

// ✅ TO'G'RI
async function main() {
  try {
    const data = await fetch('/api').then(r => r.json());
  } catch (error) {
    console.error('Xato:', error);
  }
}
\`\`\`

#### ⚠️ Edge Case: Async funksiya har doim Promise qaytaradi
\`\`\`javascript
async function returns42() {
  return 42;
}

const result = returns42();
console.log(result); // Promise { 42 }, 42 emas!

// Natijani olish:
result.then(value => console.log(value)); // 42

// Yoki ishlatish:
async function main() {
  const value = await returns42();
  console.log(value); // 42
}
\`\`\`

---

### 6. REAL HAYOTDAGI MISOLLAR

#### Misol 1: API so'rovlari
\`\`\`javascript
async function getUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error('User topilmadi');
    return await response.json();
  } catch (error) {
    console.error('Xato:', error.message);
    return null;
  }
}

const user = await getUser(1);
console.log(user);
\`\`\`

#### Misol 2: Sequential va Parallel
\`\`\`javascript
async function getFullData(userId) {
  // User avval kerak (sequential)
  const user = await fetch(\`/api/users/\${userId}\`).then(r => r.json());

  // Keyin posts va comments (parallel)
  const [posts, comments] = await Promise.all([
    fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),
    fetch(\`/api/comments?userId=\${userId}\`).then(r => r.json())
  ]);

  return { user, posts, comments };
}

const data = await getFullData(1);
console.log(data);
\`\`\`

#### Misol 3: Retry Pattern
\`\`\`javascript
async function retryFetch(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

const response = await retryFetch('/api/data');
\`\`\`

---

### 7. 12 TA SAVOL VA JAVOBLAR

<details>
<summary><b>1. Async kalit so'zi nima qiladi?</b></summary>
Funksiyani asinxron deb belgilaydi va har doim Promise qaytaradi (bahtta raqam qaytarsa ham).
</details>

<details>
<summary><b>2. Await kalit so'zi nima qiladi?</b></summary>
Promise natijasi chiqquncha kodning ijrosini pauselashtiradi (brauzer bloklanapmaydi, faqat funksiya).
</details>

<details>
<summary><b>3. Async funksiya return 10 qilsa nima bo'ladi?</b></summary>
\`Promise { 10 }\` qaytaradi. Natijani olish uchun .then() yoki await kerak.
</details>

<details>
<summary><b>4. Await'ni funksiya tashqarida ishlatish mumkinmi?</b></summary>
Faqat JavaScript modullarining eng yuqori qismida (Top-level await, ES2022).
</details>

<details>
<summary><b>5. Async/await bilan xatolarni qanday ushlash?</b></summary>
Try...catch bloklari yordamida.
</details>

<details>
<summary><b>6. Await-ni brauzer bloklab qoyadimi?</b></summary>
Yo'q, faqat o'sha async funksiyani bloklashtiradi. UI va boshqa JavaScript davom etadi.
</details>

<details>
<summary><b>7. Parallel asinxron ishlar uchun nima ishlatish kerak?</b></summary>
\`Promise.all()\` yoki \`Promise.allSettled()\`.
</details>

<details>
<summary><b>8. Async/await va Promise.then() o'rtasida farq?</b></summary>
Farq yo'q, ikkalasi ham asinxron. Faqat async/await o'qishga oson.
</details>

<details>
<summary><b>9. forEach() ichida await ishlaydi?</b></summary>
Ha, ishlaydi, lekin ketma-ketlik bo'ladi (parallel emas). For loop yoki Promise.all() ishlatish kerak.
</details>

<details>
<summary><b>10. Async generator nima?</b></summary>
async function* — funksiyalarni yield orqali pause qilish.
</details>

<details>
<summary><b>11. Try...catch va finally nima uchun?</b></summary>
Try: koda sinab. Catch: xato bo'lsa. Finally: har doim (tozalash).
</details>

<details>
<summary><b>12. Async/await qayda ishlatiladi?</b></summary>
API so'rovlari, fayl o'qish, veritabaza operatsiyalari — har qayerda!
</details>`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy Async (Boshlang'ich)",
      instruction: "async funksiya yarating, 'Hello' return qiling.",
      startingCode: "// Kodni shu yerda yozing\nconst sayHello = /* ... */;\n\nsayHello().then(r => console.log(r));",
      hint: "async function sayHello() { return 'Hello'; }",
      test: "if (logs.includes('Hello')) return null; return 'Async xato!';"
    },
    {
      id: 2,
      title: "2️⃣ Await with Delay (Boshlang'ich)",
      instruction: "delay(500) Promise await qiling, keyin 'Done' chiqaring.",
      startingCode: "function delay(ms) { return new Promise(r => setTimeout(r, ms)); }\n\nasync function main() {\n  // Kodni shu yerda yozing\n  console.log('Done');\n}\n\nmain();",
      hint: "await delay(500);",
      test: "if (logs.includes('Done')) return null; return 'Delay xato!';"
    },
    {
      id: 3,
      title: "3️⃣ Try/Catch (O'rta)",
      instruction: "Promise rejected bo'lsa, catch() ichida error print qiling.",
      startingCode: "async function main() {\n  // Kodni shu yerda yozing\n  const p = Promise.reject('Xato!');\n  // try...catch yozing\n}\n\nmain();",
      hint: "try { await p; } catch (e) { console.log('Xato:', e); }",
      test: "if (logs.some(l => l.includes('Xato'))) return null; return 'Try/catch xato!';"
    },
    {
      id: 4,
      title: "4️⃣ Async Function Chain (O'rta)",
      instruction: "3 ta Promise'ni ketma-ketlik await qiling.",
      startingCode: "const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\nasync function main() {\n  // Kodni shu yerda yozing\n  const a = /* await p1 */;\n  console.log(a, b, c);\n}\n\nmain();",
      hint: "const a = await p1; const b = await p2; const c = await p3;",
      test: "if (logs.some(l => l.includes('1') && l.includes('2') && l.includes('3'))) return null; return 'Chain xato!';"
    },
    {
      id: 5,
      title: "5️⃣ Parallel Execution (O'rta)",
      instruction: "3 ta Promise'ni parallel await qiling (Promise.all).",
      startingCode: "const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\nasync function main() {\n  // Kodni shu yerda yozing\n  const [a, b, c] = /* Promise.all yozing */;\n  console.log(a, b, c);\n}\n\nmain();",
      hint: "await Promise.all([p1, p2, p3])",
      test: "if (logs.some(l => l.includes('1') && l.includes('2') && l.includes('3'))) return null; return 'Parallel xato!';"
    },
    {
      id: 6,
      title: "6️⃣ Finally Block (O'rta)",
      instruction: "Try/catch/finally zanjir yozing.",
      startingCode: "async function main() {\n  try {\n    const p = Promise.resolve('OK');\n    console.log(await p);\n  } catch (e) {\n    console.log('Xato');\n  }\n  // finally qo'shing\n}\n\nmain();",
      hint: "finally { console.log('Tugadi'); }",
      test: "if (logs.includes('OK') && logs.includes('Tugadi')) return null; return 'Finally xato!';"
    },
    {
      id: 7,
      title: "7️⃣ Async Return Type (O'rta)",
      instruction: "Async funksiya 42 return qilsa, await orqali olsiz.",
      startingCode: "async function getNumber() {\n  return 42;\n}\n\nasync function main() {\n  // Kodni shu yerda yozing\n  const num = /* await getNumber() */;\n  console.log(num);\n}\n\nmain();",
      hint: "const num = await getNumber();",
      test: "if (logs.includes(42)) return null; return 'Return type xato!';"
    },
    {
      id: 8,
      title: "8️⃣ Sequential vs Parallel (O'rta)",
      instruction: "1s, 1s, 1s Promise'ni parallel qiling (3s o'rniga 1s).",
      startingCode: "const p1 = new Promise(r => setTimeout(() => r(1), 1000));\nconst p2 = new Promise(r => setTimeout(() => r(2), 1000));\nconst p3 = new Promise(r => setTimeout(() => r(3), 1000));\n\nasync function main() {\n  const start = Date.now();\n  // Kodni shu yerda yozing (Promise.all ishlatish kerak)\n  const time = Date.now() - start;\n  console.log('Time:', Math.round(time / 100) * 100);\n}\n\nmain();",
      hint: "const [a, b, c] = await Promise.all([p1, p2, p3]);",
      test: "if (logs.some(l => l.includes('Time: 1000') || l.includes('Time: 900'))) return null; return 'Parallel xato!';"
    },
    {
      id: 9,
      title: "9️⃣ Error Handling Advanced (Qiyin)",
      instruction: "Random error throw qiling, catch ichida handle qiling.",
      startingCode: "async function riskyOperation() {\n  if (Math.random() > 0.5) throw new Error('Kutilmagan xato!');\n  return 'Success';\n}\n\nasync function main() {\n  // Kodni shu yerda yozing (try...catch...finally)\n}\n\nmain();",
      hint: "try { const res = await riskyOperation(); console.log(res); } catch (e) { console.log('Error handled'); } finally { console.log('Done'); }",
      test: "if (logs.some(l => l.includes('Error handled') || l.includes('Success')) && logs.includes('Done')) return null; return 'Error handling xato!';"
    },
    {
      id: 10,
      title: "🔟 Fetch with Async (Qiyin)",
      instruction: "Fetch async/await bilan qiling (mock Promise).",
      startingCode: "function mockFetch(url) {\n  return new Promise(r => setTimeout(() => r({ ok: true, json: () => Promise.resolve({ id: 1, ism: 'Ali' }) }), 300));\n}\n\nasync function getUser() {\n  // Kodni shu yerda yozing\n  const response = await mockFetch('/api/user');\n  const data = /* await response.json() */;\n  console.log(data);\n}\n\ngetUser();",
      hint: "const data = await response.json(); console.log(data);",
      test: "if (logs.some(l => typeof l === 'object' && l.ism === 'Ali')) return null; return 'Fetch xato!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Multiple Sequential (Qiyin)",
      instruction: "User olish, keyin posts, keyin comments (sequential).",
      startingCode: "async function getUser(id) { return new Promise(r => setTimeout(() => r({ id, ism: 'Ali' }), 200)); }\nasync function getPosts(userId) { return new Promise(r => setTimeout(() => r([{ id: 1, text: 'Post1' }]), 200)); }\n\nasync function getAll() {\n  // Kodni shu yerda yozing\n  const user = /* await getUser(1) */;\n  const posts = /* await getPosts(user.id) */;\n  console.log(user, posts);\n}\n\ngetAll();",
      hint: "const user = await getUser(1); const posts = await getPosts(user.id);",
      test: "if (logs.some(l => typeof l === 'object' && l.ism === 'Ali')) return null; return 'Sequential xato!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Combine: Async + forEach (Eng Qiyin)",
      instruction: "Async forEach (with proper Promise.all), 3 ta elementni process qiling.",
      startingCode: "async function process(item) {\n  return new Promise(r => setTimeout(() => r(item * 2), 100));\n}\n\nasync function main() {\n  const items = [1, 2, 3];\n  // Kodni shu yerda yozing (Promise.all + map)\n  const results = /* Promise.all(items.map(...)) */;\n  console.log(results);\n}\n\nmain();",
      hint: "const results = await Promise.all(items.map(item => process(item)));",
      test: "if (logs.some(l => Array.isArray(l) && l[0] === 2 && l[1] === 4 && l[2] === 6)) return null; return 'Combine xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`async` kalit so'zi bilan e'lon qilingan funksiya har doim nima qaytaradi?",
      options: ["Oddiy qiymat (number, string, etc.)", "Promise obyekti", "Callback funksiya", "undefined"],
      correctAnswer: 1,
      explanation: "`async` funksiyalar har doim Promise qaytaradi. Funksiya ichida oddiy qiymat `return` qilinsa ham, u avtomatik ravishda `Promise.resolve(qiymat)` ko'rinishida o'raladi."
    },
    {
      id: 2,
      question: "`await` kalit so'zini oddiy (async bo'lmagan) funksiyalar ichida ishlatish mumkinmi?",
      options: [
        "Ha, cheklov yo'q",
        "Yo'q, faqat async belgilangan funksiya yoki Top-level await (ES2022) doirasida ishlatilishi shart",
        "Faqat `setTimeout` ichidagi callbacklarda ruxsat etiladi",
        "Faqat Node.js muhitida ruxsat berilgan"
      ],
      correctAnswer: 1,
      explanation: "`await` kalit so'zini faqat `async` funksiya ichida yoki ES modullarining eng yuqori qismida (Top-level await) ishlatish mumkin. Oddiy sinxron funksiya ichida yozilsa, `SyntaxError` yuz beradi."
    },
    {
      id: 3,
      question: "Async/Await'da asinxron operatsiyalar paytida yuz bergan xatolarni (errors) qanday ushlaymiz?",
      options: [
        "`.catch()` zanjiri orqali",
        "try...catch...finally bloklari yordamida",
        "`window.onerror` hodisasi bilan",
        "Ular avtomatik tarzda yo'qotiladi, qo'shimcha kod shart emas"
      ],
      correctAnswer: 1,
      explanation: "Async/await sinxron kod ko'rinishida yozilganligi uchun, an'anaviy sinxron xatolarni ushlash mexanizmi — `try...catch` blokidan foydalaniladi."
    },
    {
      id: 4,
      question: "Parallel bajarilishi mumkin bo'lgan asinxron so'rovlarni async/await yordamida qanday optimallashtiramiz?",
      options: [
        "Har bir so'rov oldidan ketma-ket `await` yozish orqali",
        "Barcha promislarni `Promise.all()` ichiga joylab, faqat bitta umumiy `await` qilish orqali",
        "Ular avtomatik parallel ishlaydi, qo'shimcha optimallash shartmas",
        "Asinxron so'rovlarni setTimeout bilan ajratish orqali"
      ],
      correctAnswer: 1,
      explanation: "Agar har bir so'rovni ketma-ket await qilsak (sequential), dastur har safar kutib qoladi (masalan, 1s + 1s + 1s = 3s). `Promise.all` orqali parallel jo'natib, faqat bitta `await` qilsak, barchasi eng uzun so'rov vaqtida (masalan, 1s) bajariladi."
    },
    {
      id: 5,
      question: "Quyidagi kod ishga tushganda konsolda nima ko'rinadi?\n```javascript\nasync function test() {\n  return 10;\n}\nconsole.log(test());\n```",
      options: ["10", "Promise { 10 } (yoki kutilayotgan Promise holati)", "undefined", "TypeError: test is not a function"],
      correctAnswer: 1,
      explanation: "`test()` funksiyasi chaqirilganda, u asinxron bo'lgani uchun natijani to'g'ridan-to'g'ri `10` emas, balki `Promise { 10 }` ko'rinishidagi Promise obyekti sifatida qaytaradi. Uning ichidagi qiymatni chop etish uchun `await test()` yozish yoki `.then()` zanjiridan foydalanish kerak."
    }
  ]
};
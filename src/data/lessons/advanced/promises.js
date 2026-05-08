export const promises = {
  id: "promises",
  title: "Promises va Async/Await: Asinxron Dasturlash",
  level: "Murakkab",
  description: "Promise holatlari, Async/Await sintaksisi, Error handling, va Asinxronlik mexanizmi.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, serverdan ma'lumot olmoqchisiz. Bu vaqt talab qiladi (1-2 soniya). Agar biz bu kutish vaqtida interfeysi bloklasak, foydalanuvchi hech narsani bosib qolmaydi - sayt "donug'iga tushadi". **Asinxronlik** buning yechimi: kodning bir qismi boshqa qismini kutuvi shuning uchun ishlash davom etadi.

**Callback Hell muammosi:**
\`\`\`javascript
// XATO: Kod chuvalarga tushadi
getUserData(id, (user) => {
  getFollowers(user.id, (followers) => {
    getFollowersPosts(followers[0].id, (posts) => {
      console.log(posts);  // 3 qavatda kirib ketdi!
    });
  });
});
\`\`\`

**Promises va Async/Await yechimi:** Kodni horizontal qilib yozish mumkin bo'ladi.

## 2. SODDALIK (Analogiya)

**Restoranni buyurtma qilish:**
1. Siz: "Mendo kebab berlamoqchi eken!" (Promise)
2. Ofitsiant: "To'g'ri, tayyor bo'lguncha qo'lg'a kuting" (Pending)
3. Oshxona: Kebabni tayyorlaydi
4. Ofitsiant: Kebabni olib keladi (Resolved ✅) yoki "Kebab tugab qoldi" (Rejected ❌)
5. Siz: O'z ishingizni davom ettirasiz (Async)

## 3. STRUKTURA

### A. Promise: 3 ta Holat

\`\`\`javascript
// 1. PENDING - kutilayotgan
const promise = new Promise((resolve, reject) => {
  // Ishlayotgan jarayon
});

// 2. FULFILLED - muvaffaqiyatli (resolved)
const success = Promise.resolve("Salom!");

// 3. REJECTED - rad etilgan (rejected)
const error = Promise.reject("Xato!");
\`\`\`

### B. Promise Yaratish va Ishlash

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Muvaffaqiyat! ✅");  // Tugash - SUCCESS
  } else {
    reject("Xatolik! ❌");         // Tugash - ERROR
  }
});

myPromise
  .then(result => console.log(result))    // SUCCESS holati
  .catch(error => console.error(error))   // ERROR holati
  .finally(() => console.log("Tugadi"));  // HAR DOIM
\`\`\`

### C. Promise Zanjiri (.then() chaining)

\`\`\`javascript
Promise.resolve(5)
  .then(n => {
    console.log("Step 1:", n);       // 5
    return n * 2;                     // RETURN kerak!
  })
  .then(n => {
    console.log("Step 2:", n);       // 10
    return n + 5;
  })
  .then(n => {
    console.log("Final:", n);        // 15
  })
  .catch(error => console.error(error));
\`\`\`

**Muhim:** Har bir .then() blokida RETURN qilish kerak, yokida keyingi .then() undefined oladi!

### D. Promise Static Metodlari

**1. Promise.all() - Hammasini kutadi (bittasi fail bo'lsa, hammasi fail)**
\`\`\`javascript
const p1 = Promise.resolve(1);
const p2 = new Promise(r => setTimeout(() => r(2), 1000));
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(results => console.log(results))  // [1, 2, 3] - 1s keyin
  .catch(error => console.error(error));
\`\`\`

**2. Promise.allSettled() - Hammasini kutadi (fail bo'lsa ham)**
\`\`\`javascript
const p1 = Promise.resolve("OK");
const p2 = Promise.reject("Xato!");
const p3 = Promise.resolve("Done");

Promise.allSettled([p1, p2, p3])
  .then(results => {
    // [
    //   { status: 'fulfilled', value: 'OK' },
    //   { status: 'rejected', reason: 'Xato!' },
    //   { status: 'fulfilled', value: 'Done' }
    // ]
    console.log(results);
  });
\`\`\`

**3. Promise.race() - Birinchi tugaganini qaytaradi**
\`\`\`javascript
const p1 = new Promise(r => setTimeout(() => r("Sekin"), 1000));
const p2 = new Promise(r => setTimeout(() => r("Tez"), 100));

Promise.race([p1, p2])
  .then(result => console.log(result));  // "Tez" (100ms keyin)
\`\`\`

**4. Promise.any() - Birinchi muvaffaqiyatli natijani qaytaradi**
\`\`\`javascript
const p1 = Promise.reject("Xato 1");
const p2 = Promise.reject("Xato 2");
const p3 = Promise.resolve("Muvaffaqiyat!");

Promise.any([p1, p2, p3])
  .then(result => console.log(result));  // "Muvaffaqiyat!"
\`\`\`

### E. ASYNC/AWAIT - Promise'ni O'qish Oson Qilish

Async/Await — Promise'ni synchron ko'rinishdagi kod sifatida yozish usuli. Kod o'qish va tushunish juda oson bo'lib ketadi!

**Oddiy async funksiya:**
\`\`\`javascript
// Async funksiya har doim Promise qaytaradi
async function myFunction() {
  return "Salom!";  // Avtomatik Promise.resolve() ga o'giriladi
}

myFunction().then(result => console.log(result));  // "Salom!"
\`\`\`

**Await - Promise'ni kutish:**
\`\`\`javascript
async function getData() {
  // Kutish: API'dan ma'lumot olishi tugagunga qadar kod bu yerda to'xtaydi
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();

  console.log(data);  // Ma'lumot tayyorlanib navishtiriladi
}

getData();
\`\`\`

### F. Async/Await bilan Error Handling

\`\`\`javascript
async function getData() {
  try {
    // Kutish va ma'lumot olish
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const data = await response.json();
    console.log("Muvaffaqiyat:", data);

  } catch (error) {
    // Xato bo'lsa bu yerga tushadi
    console.error("Xato yuz berdi:", error.message);

  } finally {
    // Har doim ishlaydi
    console.log("Amal yakunlandi");
  }
}

getData();
\`\`\`

### G. Async/Await bilan Parallel Requests

\`\`\`javascript
// ❌ XATO - Keyma-keyin (2s kutish)
async function slow() {
  const user = await fetch("/api/user").then(r => r.json());      // 1s
  const posts = await fetch("/api/posts").then(r => r.json());    // 1s
  return { user, posts };
}

// ✅ TO'G'RI - Parallel (1s kutish)
async function fast() {
  const [user, posts] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json())
  ]);
  return { user, posts };
}
\`\`\`

### H. Promise bilan Async/Await Kombinatsiyasi

\`\`\`javascript
// Promise
fetch("/api/user")
  .then(r => r.json())
  .then(user => fetch(\`/api/user/\${user.id}/posts\`))
  .then(r => r.json())
  .then(posts => console.log(posts))
  .catch(e => console.error(e));

// Async/Await - O'qish oson
async function getUser() {
  try {
    const userRes = await fetch("/api/user");
    const user = await userRes.json();

    const postsRes = await fetch(\`/api/user/\${user.id}/posts\`);
    const posts = await postsRes.json();

    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

getUser();
\`\`\`

### I. Timeout va AbortController

\`\`\`javascript
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Vaqt tugadi!");
    }
    throw error;
  }
}

fetchWithTimeout("https://api.example.com/data", 3000);
\`\`\`

### J. Retry Pattern bilan Async/Await

\`\`\`javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(\`Qayta urinish... (\${i + 1}/\${retries})\`);
      await new Promise(r => setTimeout(r, 1000));  // 1s kutish
    }
  }
}

fetchWithRetry("https://api.example.com/data", 3);
\`\`\`

### K. Xatolar va Edge Cases

**1. Await bo'lmasdan await qilish:**
\`\`\`javascript
// ❌ XATO
async function test() {
  const data = fetch("/api/data");  // Promise qaytadi, ma'lumot emas!
  console.log(data.title);          // undefined
}

// ✅ TO'G'RI
async function test() {
  const response = await fetch("/api/data");
  const data = await response.json();
  console.log(data.title);
}
\`\`\`

**2. Try-catch bo'lmasdan xato:**
\`\`\`javascript
// ❌ XATO - Xato ushlalmaydi
async function test() {
  const data = await fetch("/invalid-url").then(r => r.json());
}

// ✅ TO'G'RI
async function test() {
  try {
    const data = await fetch("/invalid-url").then(r => r.json());
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

**3. Unhandled Rejection:**
\`\`\`javascript
// ❌ XATO - Xato konsolga tushar
Promise.reject("Xato!").then(r => console.log(r));

// ✅ TO'G'RI
Promise.reject("Xato!")
  .then(r => console.log(r))
  .catch(e => console.error(e));
\`\`\`

### L. Promise bilan Async/Await Taqqoslash

| Xususiyat | Promise | Async/Await |
|-----------|---------|------------|
| Sintaksis | .then().catch() | try...catch |
| O'qish | Oson emas | Juda oson |
| Error handling | .catch() | try...catch |
| Debugging | Qiyin | Oson |
| Performance | Bir xil | Bir xil |

**Tavsiya:** Yangi kod uchun Async/Await ishlating, lekin ikkalasini tushunish kerak!

## 4. AMALIYOT (Mushqlar pastda)

## 5. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Promise nima va nima uchun kerak?</summary>
Asinxron operatsiyaning kelajakdagi natijasini ifodalovchi maxsus obyekt. Callback Hell'ni oldini olish uchun kerak.
</details>

<details>
<summary>2. Promise'ning 3 ta holatini ayting.</summary>
Pending (kutilayotgan), Fulfilled (muvaffaqiyatli), Rejected (rad etilgan).
</details>

<details>
<summary>3. Async funksiya nima qaytaradi?</summary>
Har doim Promise qaytaradi. Return qilingan qiymat avtomatik Promise.resolve() ga o'giriladi.
</details>

<details>
<summary>4. Await nima qiladi va qayerda ishlatiladi?</summary>
Promise'ni kutadi. Faqat async funksiya ichida ishlatiladi.
</details>

<details>
<summary>5. Promise.all() vs Promise.race() farqi?</summary>
all() - hammasini kutadi, race() - birinchi tugaganini qaytaradi.
</details>

<details>
<summary>6. Async/Await bilan error handling qanday?</summary>
try...catch bloki ishlatiladi. Try ichida await, catch ichida xato.
</details>

<details>
<summary>7. .then() zanjirida return bo'lmasa nima bo'ladi?</summary>
Keyingi .then() undefined oladi. Return kerak!
</details>

<details>
<summary>8. Promise.allSettled() qachon ishlatiladi?</summary>
Ba'zi Promise'lar fail bo'lsa ham, hammasining natijasini olish kerak bo'lganda.
</details>

<details>
<summary>9. Callback Hell nima va Promise qanday yechim?</summary>
Callback Hell - kod chuvalarga tushadi. Promise .then() zanjiri bilan horizontal qoladi.
</details>

<details>
<summary>10. Async/Await bilan parallel requests qanday?</summary>
Promise.all() ishlatish kerak: const [a, b] = await Promise.all([...])
</details>

<details>
<summary>11. AbortController nima uchun kerak?</summary>
Request'ni timeout'i o'rnatish uchun. Agar server javob bermaydigan bo'lsa, so'rovni to'xtatish.
</details>

<details>
<summary>12. Promise bilan async/await farqi va qaysi birini tanlash kerak?</summary>
Async/await oson o'qiladi va o'z ketmagani xuddi synchron kod kabi. Yangi kod uchun async/await, lekin ikkalasini tushunish kerak.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Promise Yaratish",
      instruction: "Promise yarating va resolve('Muvaffaqiyat!') bilan .then() orqali natijani olsiz.",
      startingCode: "const myPromise = new Promise((resolve, reject) => {\n  // Bu yerga yozing\n});\n\nmyPromise.then(result => console.log(result));\n",
      hint: "resolve('Muvaffaqiyat!');",
      test: "if (logs.includes('Muvaffaqiyat!')) return null; return 'Promise noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Promise Reject va Catch",
      instruction: "reject() qilib xato yarating va .catch() orqali ushlang.",
      startingCode: "const failPromise = new Promise((resolve, reject) => {\n  // Bu yerga yozing\n});\n\nfailPromise\n  .then(r => console.log(r))\n  .catch(e => console.log('Xato:', e));\n",
      hint: "reject('Xato sodir bo\\'ldi!');",
      test: "if (logs.includes('Xato:')) return null; return 'Reject noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Promise Zanjiri (Chaining)",
      instruction: "Promise zanjirida 2 -> 4 -> 8 -> natija chiqarsin.",
      startingCode: "Promise.resolve(2)\n  .then(n => {\n    console.log('Step 1:', n);\n    return n * 2;\n  })\n  .then(n => {\n    console.log('Step 2:', n);\n    // Bu yerga yozing\n  })\n  .then(n => console.log('Final:', n));\n",
      hint: "return n * 2; // shuningdek .then(n => console.log('Final:', n));",
      test: "if (logs.includes('Final: 8')) return null; return 'Chaining noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Promise.all() - Parallel",
      instruction: "3 ta Promise'ni Promise.all() orqali boshqarib, natijani olsiz.",
      startingCode: "const p1 = Promise.resolve('A');\nconst p2 = new Promise(r => setTimeout(() => r('B'), 100));\nconst p3 = Promise.resolve('C');\n\n// Bu yerga yozing\n",
      hint: "Promise.all([p1, p2, p3]).then(results => console.log(results));",
      test: "if (logs.some(l => Array.isArray(l) && l[0] === 'A')) return null; return 'Promise.all noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Oddiy Async Funksiya",
      instruction: "'getGreeting' async funksiyasini yarating va 'Salom!' qaytarsin.",
      startingCode: "// Async funksiyani yozing\n\ngetGreeting().then(msg => console.log(msg));\n",
      hint: "async function getGreeting() { return 'Salom!'; }",
      test: "if (logs.includes('Salom!')) return null; return 'Async funksiya noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "Await - Promise Kutish",
      instruction: "Async funksiya ichida await ishlatib, Promise'ni kutib natijani olsiz.",
      startingCode: "async function getData() {\n  // Bu yerga yozing - Promise.resolve('Data')'ni await qiling\n}\n\ngetData().then(data => console.log(data));\n",
      hint: "const data = await Promise.resolve('Data'); console.log(data);",
      test: "if (logs.includes('Data')) return null; return 'Await noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "Try-Catch bilan Error Handling",
      instruction: "Async funksiyada try...catch qo'llanilsan, reject() edlanadigan xatoni ushlang.",
      startingCode: "async function handleError() {\n  try {\n    // Bu yerga yozing - Promise.reject('Xato!')\n  } catch (error) {\n    console.log('Xato ushlandi:', error);\n  }\n}\n\nhandleError();\n",
      hint: "await Promise.reject('Xato!');",
      test: "if (logs.includes('Xato ushlandi:')) return null; return 'Try-catch noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Promise.race() - Birinchisini Kutish",
      instruction: "Race() orqali birinchi tugaganini olsiz.",
      startingCode: "const p1 = new Promise(r => setTimeout(() => r('Sekin'), 1000));\nconst p2 = new Promise(r => setTimeout(() => r('Tez'), 100));\n\n// Bu yerga yozing\n",
      hint: "Promise.race([p1, p2]).then(result => console.log(result));",
      test: "if (logs.includes('Tez')) return null; return 'Race noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Parallel Requests - Promise.all bilan",
      instruction: "3 ta API so'rovini Promise.all() orqali parallel qilsiz.",
      startingCode: "async function getAll() {\n  const [data1, data2, data3] = await Promise.all([\n    Promise.resolve('API 1'),\n    Promise.resolve('API 2'),\n    // Bu yerga yozing\n  ]);\n  console.log(data1, data2, data3);\n}\n\ngetAll();\n",
      hint: "Promise.resolve('API 3')",
      test: "if (logs.includes('API 1') && logs.includes('API 3')) return null; return 'Parallel noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Promise.allSettled() - Hammasini Kutish",
      instruction: "allSettled() orqali, ba'zi Promise fail bo'lsa ham natija olsiz.",
      startingCode: "const p1 = Promise.resolve('OK');\nconst p2 = Promise.reject('Xato!');\nconst p3 = Promise.resolve('Done');\n\n// Bu yerga yozing\n",
      hint: "Promise.allSettled([p1, p2, p3]).then(results => console.log(results));",
      test: "if (logs.some(l => Array.isArray(l) && l.length === 3)) return null; return 'allSettled noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Delay Funksiyasi - Async/Await",
      instruction: "Async 'delay(ms)' funksiyasi yarating, ms soniyadan keyin resolve() bo'lsin.",
      startingCode: "async function delay(ms) {\n  // Bu yerga yozing\n}\n\ndelay(500).then(() => console.log('Tugadi!'));\n",
      hint: "await new Promise(r => setTimeout(() => r(), ms));",
      test: "if (logs.includes('Tugadi!')) return null; return 'Delay noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Sequential Async Operations",
      instruction: "Birinchi Promise natijasi ikkinchi Promise'ga o'tsin (async/await bilan).",
      startingCode: "async function user_posts() {\n  // Bu yerga yozing\n  // 1. const user = await Promise.resolve({id: 1, name: 'Ali'});\n  // 2. const posts = await Promise.resolve({user: user.name, count: 5});\n  // 3. console.log(posts);\n}\n\nuser_posts();\n",
      hint: "const data = await Promise1; const result = await Promise2(data);",
      test: "if (logs.some(l => typeof l === 'object' && l.count === 5)) return null; return 'Sequential noto\\'g\\'ri';"
    }
  ]
};

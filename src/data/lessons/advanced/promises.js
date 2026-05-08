export const promises = {
  id: "promises",
  title: "⭐ Promises — Asinxronlikning O'rta Qavati",
  level: "Murakkab",
  description: "Promise holatlari, Callback Hell'ni oldini olish, va .then().catch() zanjiri.",
  theory: `## 📌 PROMISES — O'RTA BOSQICH

### 1. NEGA KERAK? (Sabab)
**Callback Hell muammosi:**
- Kod ichma-ich kirib ketadi
- Xatolar bilan ishlash qiyin
- Bir nechta asinxron ishlar bilan noqulay

**Promises yechimi:**
- Kodni zanjir shaklida yozish mumkin (.then().then())
- Xatolarni bitta .catch() bilan ushlash
- Bir nechta Promise'ni .all() bilan boshqarish

---

### 2. SODDALIK (Analogiya)

#### Buytutma Sistemi
- **Pending:** Sizni mavqeingiz noma'lum (kutilayotgan)
- **Fulfilled:** Buytutma tayyorlanmadi (bajarildi) ✅
- **Rejected:** Buytutma to'xtadi (rad etildi) ❌

\`\`\`
┌──────────────────┐
│ Pending (kutish) │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    v         v
Fulfilled  Rejected
   ✅         ❌
(natija)   (xato)
\`\`\`

---

### 3. TUSHUNCHA (BATAFSIL)

#### A. Promise yaratish

\`\`\`javascript
const va'da = new Promise((resolve, reject) => {
  // resolve - muvaffaqiyat
  // reject - xato
});
\`\`\`

#### B. Oddiy misol

\`\`\`javascript
const va'da = new Promise((resolve, reject) => {
  const hammasiYaxshimi = true;

  if (hammasiYaxshimi) {
    resolve("Muvaffaqiyat! ✅");
  } else {
    reject("Xatolik! ❌");
  }
});

va'da
  .then(natija => console.log(natija))  // resolve
  .catch(xato => console.error(xato))   // reject
  .finally(() => console.log("Tugadi")); // har doim
\`\`\`

#### C. Promise Zanjiri

\`\`\`javascript
// ❌ Callback Hell
getUserData(id, (user) => {
  getFollowers(user.id, (followers) => {
    getFollowersPosts(followers[0].id, (posts) => {
      console.log(posts);
    });
  });
});

// ✅ Promise Zanjiri
getUserData(id)
  .then(user => getFollowers(user.id))
  .then(followers => getFollowersPosts(followers[0].id))
  .then(posts => console.log(posts))
  .catch(xato => console.error("Xato:", xato));
\`\`\`

#### D. Timeout bilan Promise

\`\`\`javascript
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Kutish tugadi!");
    }, ms);
  });
}

delay(2000)
  .then(natija => console.log(natija)) // 2s keyin
  .catch(xato => console.error(xato));
\`\`\`

---

### 4. PROMISE METODLARI

#### A. .then()
Promise resolved bo'lganda chaqiriladi.
\`\`\`javascript
promise.then(result => {
  console.log("Muvaffaqiyat:", result);
});
\`\`\`

#### B. .catch()
Promise rejected bo'lganda yoki .then() da xato bo'lganda chaqiriladi.
\`\`\`javascript
promise.catch(error => {
  console.error("Xato:", error);
});
\`\`\`

#### C. .finally()
Natija qanday bo'lishidan qat'i nazar, har doim chaqiriladi. Tozalash ishlarida ishlatiladi.
\`\`\`javascript
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => {
    console.log("Tozalash..."); // Har doim ishlaydi
    spinnerHide(); // Loading'ni o'chirvsh, masalan
  });
\`\`\`

---

### 5. STATIC METODLAR

#### A. Promise.all()
**Hammasi tugashini kutadi. Bittasi fail bo'lsa, hammasi fail bo'ladi.**

\`\`\`javascript
const p1 = Promise.resolve(3);
const p2 = new Promise(resolve => setTimeout(() => resolve('foo'), 100));
const p3 = fetch('/api/users');

Promise.all([p1, p2, p3])
  .then(results => {
    console.log(results); // [3, 'foo', Response]
  })
  .catch(error => {
    console.error("Bitta fail bo'ldi:", error);
  });
\`\`\`

#### B. Promise.allSettled()
**Hammasi tugashini kutadi (fail bo'lsa ham).**

\`\`\`javascript
const p1 = Promise.resolve(3);
const p2 = Promise.reject('Xato!');

Promise.allSettled([p1, p2])
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 3 },
    //   { status: 'rejected', reason: 'Xato!' }
    // ]
  });
\`\`\`

#### C. Promise.race()
**Birinchi tugaganini qaytaradi (yaxshi bo'lsa ham, yomon bo'lsa ham).**

\`\`\`javascript
const p1 = new Promise(resolve => setTimeout(() => resolve('P1'), 100));
const p2 = new Promise(resolve => setTimeout(() => resolve('P2'), 50));

Promise.race([p1, p2])
  .then(result => {
    console.log(result); // 'P2' (tezroq)
  });
\`\`\`

#### D. Promise.any()
**Birinchi muvaffaqiyatli natijani qaytaradi.**

\`\`\`javascript
const p1 = Promise.reject('Xato 1');
const p2 = Promise.resolve('Muvaffaqiyat!');

Promise.any([p1, p2])
  .then(result => {
    console.log(result); // 'Muvaffaqiyat!'
  })
  .catch(errors => {
    console.error("Hammasi fail bo'ldi:", errors);
  });
\`\`\`

---

### 6. XATOLAR VA EDGE CASES

#### ❌ Xato 1: .catch() ni unutish
\`\`\`javascript
// ❌ XATO - Xato yashiringan
const p = Promise.reject("Bu xato!");
p.then(r => console.log(r));
// Brauzer: "Uncaught in promise: Bu xato!"

// ✅ TO'G'RI
p.then(r => console.log(r))
 .catch(e => console.error(e));
\`\`\`

#### ❌ Xato 2: .then() dan return unutish
\`\`\`javascript
// ❌ XATO - Keyingi then undefined oladi
fetch('/api/users')
  .then(response => response.json()) // return yo'q
  .then(data => console.log(data)); // undefined

// ✅ TO'G'RI
fetch('/api/users')
  .then(response => response.json()) // return mavjud (implicit)
  .then(data => console.log(data));
\`\`\`

#### ❌ Xato 3: Promise ichiga Promise
\`\`\`javascript
// ❌ XATO - Ortiqcha Promise nesting
new Promise((resolve) => {
  resolve(new Promise((r) => r("data")));
});

// ✅ TO'G'RI
Promise.resolve("data");
\`\`\`

#### ⚠️ Edge Case: Promise.all() va hatolik
\`\`\`javascript
// Bittasi fail bo'lsa, hammasiga fail kelib chiqadi
Promise.all([
  Promise.resolve(1),
  Promise.reject("Xato!"),
  Promise.resolve(3)
]).catch(e => console.error(e)); // "Xato!" - 3 hech qachon olinmaydi

// Yechim: allSettled() ishlatish
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("Xato!"),
  Promise.resolve(3)
]).then(results => {
  // Hammasi natija oladi, fail yoki muvaffaq
});
\`\`\`

---

### 7. REAL HAYOTDAGI MISOLLAR

#### Misol 1: Bir nechta API so'rovlari
\`\`\`javascript
Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
])
  .then(([users, posts, comments]) => {
    console.log("Hammasi tamamlandi:", { users, posts, comments });
  })
  .catch(error => console.error("Xato:", error));
\`\`\`

#### Misol 2: Sekuential Promise'lar
\`\`\`javascript
function buyurish(id) {
  return fetch(\`/api/orders/\${id}\`)
    .then(r => r.json());
}

function yetkazish(order) {
  return fetch('/api/delivery', {
    method: 'POST',
    body: JSON.stringify(order)
  }).then(r => r.json());
}

buyurish(123)
  .then(order => yetkazish(order))
  .then(delivery => console.log("Yetkazildi:", delivery))
  .catch(error => console.error("Xato:", error));
\`\`\`

#### Misol 3: Retry Pattern
\`\`\`javascript
function retryFetch(url, attempts = 3) {
  return fetch(url)
    .catch(error => {
      if (attempts > 1) {
        return retryFetch(url, attempts - 1);
      }
      throw error;
    });
}

retryFetch('/api/data')
  .then(r => r.json())
  .catch(e => console.error("Oxirgi harakat ham xato:", e));
\`\`\`

---

### 8. 12 TA SAVOL VA JAVOBLAR

<details>
<summary><b>1. Promise nima?</b></summary>
Asinxron operatsiyaning kelajakdagi natijasini ifodalovchi maxsus obyekt.
</details>

<details>
<summary><b>2. Promise'ning 3 ta holatini ayting.</b></summary>
Pending (kutilayotgan), Fulfilled (bajarilgan/muvaffaq), Rejected (rad etilgan/xato).
</details>

<details>
<summary><b>3. resolve() va reject() qanday farq?</b></summary>
\`resolve\` — muvaffaqiyatli tugash. \`reject\` — xatolik bilan tugash.
</details>

<details>
<summary><b>4. .then() metodi qachon chaqiriladi?</b></summary>
Promise \`fulfilled\` (muvaffaqiyatli) bo'lganda.
</details>

<details>
<summary><b>5. .catch() qachon chaqiriladi?</b></summary>
Promise \`rejected\` bo'lganda yoki .then() ichida xato yuz berganda.
</details>

<details>
<summary><b>6. .finally() ning vazifasi nima?</b></summary>
Natija qanday bo'lishidan qat'i nazar, amal oxirida tozalash ishlarini bajarish uchun.
</details>

<details>
<summary><b>7. Promise.all() vs Promise.allSettled() farqi?</b></summary>
\`all()\` — bittasi fail bo'lsa hammasi fail. \`allSettled()\` — hammasi natijavini qaytaradi.
</details>

<details>
<summary><b>8. Promise.race() nima qiladi?</b></summary>
Birinchi tugaganini (success yoki error) qaytaradi.
</details>

<details>
<summary><b>9. Promise zanjirida return yo'q bo'lsa nima bo'ladi?</b></summary>
Keyingi .then() undefined oladi.
</details>

<details>
<summary><b>10. Promise ichida Promise bo'lishi mumkinmi?</b></summary>
Ha, lekin ortiqcha. Promise.resolve() orqali avtomatik flatlanadi.
</details>

<details>
<summary><b>11. Promise.any() va Promise.race() farqi?</b></summary>
\`race()\` — birinchi (success yoki error). \`any()\` — birinchi success.
</details>

<details>
<summary><b>12. Promise'dan Callback Hell oldini ololish uchun qanday?</b></summary>
.then() zanjiri yordamida. Callback Hell'da kod ichma-ich kirib ketadi, Promise'da horizontal qoladi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy Promise (Boshlang'ich)",
      instruction: "Promise yarating: resolve('Success'). .then() bilan natijani olsiz.",
      startingCode: "const p = new Promise((resolve, reject) => {\n  // Kodni shu yerda yozing\n});\n\np.then(result => console.log(result));",
      hint: "resolve('Success');",
      test: "if (logs.includes('Success')) return null; return 'Promise xato!';"
    },
    {
      id: 2,
      title: "2️⃣ Promise.reject (Boshlang'ich)",
      instruction: "Promise yarating: reject('Error'). .catch() bilan xatoni ushlang.",
      startingCode: "const p = new Promise((resolve, reject) => {\n  // Kodni shu yerda yozing\n});\n\np.catch(error => console.log('Xato:', error));",
      hint: "reject('Error');",
      test: "if (logs.some(l => l.includes('Xato'))) return null; return 'Error handling xato!';"
    },
    {
      id: 3,
      title: "3️⃣ .finally() (O'rta)",
      instruction: "Promise' ni yarating, .then(), .catch(), .finally() zanjirini yozing.",
      startingCode: "new Promise((resolve) => resolve('OK'))\n  .then(r => console.log(r))\n  // Kodni shu yerda davom qo'ying\n  .finally(() => console.log('Tugadi'));",
      hint: ".catch(e => console.error(e))",
      test: "if (logs.includes('OK') && logs.includes('Tugadi')) return null; return 'Chain xato!';"
    },
    {
      id: 4,
      title: "4️⃣ .then() Zanjiri (O'rta)",
      instruction: "Promise zanjirida: 2 -> 4 -> 8 -> natija = 8.",
      startingCode: "Promise.resolve(2)\n  .then(n => {\n    console.log('Step 1:', n);\n    // Kodni shu yerda yozing: return n * 2\n  })\n  .then(n => {\n    console.log('Step 2:', n);\n    return n * 2;\n  })\n  .then(n => console.log('Final:', n));",
      hint: "return n * 2;",
      test: "if (logs.includes('Final: 8')) return null; return 'Chaining xato!';"
    },
    {
      id: 5,
      title: "5️⃣ Promise.all() (O'rta)",
      instruction: "3 ta Promise bilan all() ishlating. Hammasi tugagandan so'ng natijani olsiz.",
      startingCode: "const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\n// Kodni shu yerda yozing\nPromise.all([p1, p2, p3])\n  .then(results => console.log('Natija:', results));",
      hint: ".then(results => console.log(results));",
      test: "if (logs.some(l => Array.isArray(l) && l[0] === 1)) return null; return 'Promise.all xato!';"
    },
    {
      id: 6,
      title: "6️⃣ Promise.race() (O'rta)",
      instruction: "Race() ishlatib, birinchi bajarilganni olsiz.",
      startingCode: "const p1 = new Promise(r => setTimeout(() => r('Slow'), 1000));\nconst p2 = Promise.resolve('Fast');\n\n// Kodni shu yerda yozing",
      hint: "Promise.race([p1, p2]).then(r => console.log(r));",
      test: "if (logs.includes('Fast')) return null; return 'Race xato!';"
    },
    {
      id: 7,
      title: "7️⃣ Promise Rejection Handling (O'rta)",
      instruction: "Har ikki promise xato bo'lsa (reject), catch() ushlang.",
      startingCode: "const p1 = Promise.reject('Xato 1');\nconst p2 = Promise.reject('Xato 2');\n\n// Kodni shu yerda yozing\nPromise.all([p1, p2])\n  // .catch() yozing",
      hint: ".catch(e => console.log('Xato ushlandi:', e));",
      test: "if (logs.some(l => l.includes('Xato ushlandi'))) return null; return 'Rejection xato!';"
    },
    {
      id: 8,
      title: "8️⃣ Promise Delay Function (O'rta)",
      instruction: "delay(ms) funksiyasi yarating, keltirilgan ms soniyadan keyin resolve() bo'lsin.",
      startingCode: "function delay(ms) {\n  return new Promise(resolve => {\n    // Kodni shu yerda yozing\n  });\n}\n\ndelay(500)\n  .then(() => console.log('Kutish tugadi!'));",
      hint: "setTimeout(() => resolve(), ms);",
      test: "if (logs.includes('Kutish tugadi!')) return null; return 'Delay xato!';"
    },
    {
      id: 9,
      title: "9️⃣ Sequential Promises (Qiyin)",
      instruction: "Birinchi Promise natijasi keyin ikkinchi Promise'ga o'tsin.",
      startingCode: "function fetch_user(id) {\n  return new Promise(r => setTimeout(() => r({ id, ism: 'Ali' }), 300));\n}\n\nfunction fetch_posts(user) {\n  return new Promise(r => setTimeout(() => r({ user: user.ism, postlar: 5 }), 300));\n}\n\n// Kodni shu yerda yozing\nfetch_user(1)\n  .then(user => /* ... */);",
      hint: ".then(user => fetch_posts(user)).then(posts => console.log(posts));",
      test: "if (logs.some(l => typeof l === 'object' && l.postlar === 5)) return null; return 'Sequential xato!';"
    },
    {
      id: 10,
      title: "🔟 Promise.allSettled() (Qiyin)",
      instruction: "allSettled() ishlatib, success va reject qiymatlari bilan natija olsiz.",
      startingCode: "const p1 = Promise.resolve('OK');\nconst p2 = Promise.reject('Xato');\nconst p3 = Promise.resolve('Done');\n\n// Kodni shu yerda yozing\nPromise.allSettled([p1, p2, p3])\n  .then(results => {\n    // results'ni konsol qiling\n  });",
      hint: "console.log(results);",
      test: "if (logs.some(l => Array.isArray(l) && l.length === 3)) return null; return 'allSettled xato!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Promise with Error Handling (Qiyin)",
      instruction: "Random son generator: 50% xato qaytaradi. catch() va finally() ishlating.",
      startingCode: "function randomPromise() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      // Kodni shu yerda yozing: Math.random() > 0.5 bo'lsa reject, bo'lmasa resolve\n    }, 500);\n  });\n}\n\nrandomPromise()\n  .then(r => console.log('Success:', r))\n  .catch(e => console.log('Error'))\n  .finally(() => console.log('Done'));",
      hint: "Math.random() > 0.5 ? resolve('OK') : reject('FAIL');",
      test: "if (logs.some(l => l.includes('Success') || l.includes('Error')) && logs.includes('Done')) return null; return 'Random xato!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Combine: Promise.all + map() (Eng Qiyin)",
      instruction: "3 ta API so'rovini birgalikda, Promise.all() + map() yordamida qilsiz.",
      startingCode: "const urls = ['/api/1', '/api/2', '/api/3'];\n\nconst promises = urls.map(url => \n  new Promise(r => setTimeout(() => r('Data: ' + url), 300))\n);\n\n// Kodni shu yerda yozing\nPromise.all(promises)\n  .then(results => /* ... */);",
      hint: ".then(results => console.log(results));",
      test: "if (logs.some(l => Array.isArray(l) && l.length === 3)) return null; return 'Combine xato!';"
    }
  ]
};
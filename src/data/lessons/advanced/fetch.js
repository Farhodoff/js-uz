export const fetchApi = {
  id: "a3",
  title: "Fetch API: Server bilan Xavfsiz Aloqa",
  level: "O'rta/Murakkab",
  description: "Brauzer orqali serverga so'rov yuborish, ma'lumot olish va yuborish. Zamonaviy Fetch API.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, saytingizda ob-havo ma'lumotini ko'rsatmoqchisiz. Buning uchun sizga boshqa bir serverdan ma'lumot kerak. Eski davrda, sahifani butunlay yangilamasdan ma'lumot olish juda qiyin edi. **Fetch API** sizga sahifani yangilamasdan (backgroundda) server bilan "gaplashish" imkonini beradi.

Masalan: "Sevish" tugmasini bossangiz, boshqa API'ga ma'lumot yuboriladi, lekin sahifa boshqa joyga o'tmaydi. Yoki chat-dagi yangi xabarlarni ko'rish uchun sahifani yangilamasdan API'dan yangi ma'lumotlarni olishimiz mumkin.

## 2. SODDALIK (Analogiya)

Fetch — bu restorandagi ofitsiantga o'xshaydi:
- **Siz**: "Mendo kebab berlamoqchi eken!" (Fetch so'rov)
- **Ofitsiant**: Oshxonaga boradi (Server)
- **Oshxona**: Kebabni tayyarlaydi (Server ma'lumotni tayyorlaydi)
- **Ofitsiant**: Kebabni olib keladi (Response)
- **Siz**: Shu vaqtda o'z ishingizni qilib turaverasiz (Asinxronlik - interfeys ishlanib turadi)

## 3. STRUKTURA

### A. Fetch - GET So'rov (Ma'lumot Olish)

**Eng oddiy usul:**
\`\`\`javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

**Async/Await bilan (yanada o'qish oson):**
\`\`\`javascript
async function getPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    // Status kodi tekshirish
    if (!response.ok) {
      throw new Error(\`HTTP xatosi! Status: \${response.status}\`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Xato yuz berdi: " + error.message);
  }
}

getPosts();
\`\`\`

### B. Response Objekti

Fetch qaytargan response - bu obyekt. U o'zida statusni, headerlarni va ma'lumotni saqlaydi:

\`\`\`javascript
const response = await fetch(url);

// Status kod:
console.log(response.status);      // 200, 404, 500 va h.k.

// Status tekshirish:
console.log(response.ok);          // true agar 200-299 bo'lsa

// Headers:
console.log(response.headers);

// Ma'lumotni turli formatlarda olish:
const json = await response.json();      // JSON formatida
const text = await response.text();      // Matn formatida
const blob = await response.blob();      // Rasm/fayl formatida
\`\`\`

**Muhim:** \`response.json()\` ham Promise qaytaradi, shuning uchun uning oldida ham \`await\` bo'lishi kerak!

### C. POST So'rov (Ma'lumot Yuborish)

Server'ga ma'lumot yuborishda POST ishlatilinadi:

\`\`\`javascript
async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",           // POST usuli
      headers: {
        "Content-Type": "application/json"  // Yuborilayotgan ma'lumotning turi
      },
      body: JSON.stringify({    // Ma'lumotni JSON stringga o'girish
        title: "Yangi post",
        body: "Bu yangi postning matni",
        userId: 1
      })
    });

    if (!response.ok) throw new Error("Server xatosi");

    const data = await response.json();
    console.log("Post yaratildi: ", data);
  } catch (error) {
    console.error(error);
  }
}

createPost();
\`\`\`

### D. Headers (Sarlavhalar)

Headers — bu so'rovga qo'shilgan meta-ma'lumot:

\`\`\`javascript
const headers = {
  "Content-Type": "application/json",  // JSON yuborilayotgani
  "Authorization": "Bearer token123",  // Foydalanuvchi identifikatsiyasi
  "X-Custom-Header": "CustomValue"     // Maxsus header
};

const response = await fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data)
});
\`\`\`

### E. CORS (Cross-Origin Resource Sharing)

Boshqa domen'dan ma'lumot olishda xavfsizlik muammolari chiqishi mumkin. Server bu ijozat berishi kerak.

Agar xato bo'lsa: "Access to XMLHttpRequest has been blocked by CORS policy..."

**To'g'ri**:
1. Server'da CORS enabled bo'lishi kerak
2. Yoki CORS proxy ishlatish

\`\`\`javascript
// CORS proxy orqali:
const response = await fetch("https://cors-anywhere.herokuapp.com/" + url);
\`\`\`

### F. AbortController - Request Timeout

Agar server javob bermaydigan bo'lsa, cheksiz kutishni to'xtatish kerak:

\`\`\`javascript
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("So'rov vaqti tugadi (Timeout)!");
    }
    throw error;
  }
}

fetchWithTimeout("https://api.example.com/data", 3000);
\`\`\`

### G. Retry Mexanizmi (Qayta Urinish)

Internet uzilsa yoki server vaqtinchalik ishlamasa, avtomatik qayta urinish:

\`\`\`javascript
async function fetchWithRetry(url, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("HTTP " + response.status);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;  // Oxirgi urinish bo'lsa, xato tashlang

      console.log(\`Qayta urinish... (\${i + 1}/\${retries})\`);
      await new Promise(resolve => setTimeout(resolve, delayMs));  // Kutish
    }
  }
}

fetchWithRetry("https://api.example.com/data", 3, 2000);
\`\`\`

### H. PUT/PATCH So'rovlari (O'zgartirlish)

Mavjud ma'lumotni o'zgartirlish:

\`\`\`javascript
// PUT - butun narsani almashtirish
async function updatePost(id, newData) {
  const response = await fetch(\`https://api.example.com/posts/\${id}\`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData)
  });
  return await response.json();
}

// PATCH - faqat o'zgargan joylarni
async function patchPost(id, changes) {
  const response = await fetch(\`https://api.example.com/posts/\${id}\`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes)
  });
  return await response.json();
}
\`\`\`

### I. DELETE So'rov

Ma'lumotni o'chirish:

\`\`\`javascript
async function deletePost(id) {
  const response = await fetch(\`https://api.example.com/posts/\${id}\`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error("O'chirib bo'lmadi");
  console.log("Post o'chirildi");
}

deletePost(1);
\`\`\`

### J. FormData va Fayl Yuklash

Rasmlar yoki fayllarni yuklash:

\`\`\`javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", "Ali");

  const response = await fetch("https://api.example.com/upload", {
    method: "POST",
    body: formData
    // Content-Type'ni qo'ymaymiz! Browser avtomatik qo'yadi
  });

  return await response.json();
}
\`\`\`

### K. Parallel Requests (Bir vaqtda ko'p so'rovlar)

\`\`\`javascript
async function getAllData() {
  try {
    // Bir vaqtda hammasini o'tish:
    const [posts, users, comments] = await Promise.all([
      fetch("https://api.example.com/posts").then(r => r.json()),
      fetch("https://api.example.com/users").then(r => r.json()),
      fetch("https://api.example.com/comments").then(r => r.json())
    ]);

    console.log("Postlar: ", posts);
    console.log("Foydalanuvchilar: ", users);
    console.log("Sharhlar: ", comments);
  } catch (error) {
    console.error(error);
  }
}

getAllData();
\`\`\`

### L. Interceptor Pattern (So'rovlarni Modifikatsiya Qilish)

\`\`\`javascript
async function apiCall(url, options = {}) {
  // Har safar default headers qo'shish:
  const defaultHeaders = {
    "Authorization": \`Bearer \${localStorage.getItem("token")}\`,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  // Error status'larni handle qilish:
  if (response.status === 401) {
    // Token expired - login'ga o'tish
    window.location.href = "/login";
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API xatosi");
  }

  return await response.json();
}

// Ishlatish:
apiCall("/api/posts", { method: "POST", body: JSON.stringify(data) });
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **\`response.json()\` ni unutish:**
   \`\`\`javascript
   // XATO:
   const data = await fetch(url);
   console.log(data.title);  // undefined

   // TO'G'RI:
   const response = await fetch(url);
   const data = await response.json();
   console.log(data.title);
   \`\`\`

2. **\`res.ok\` tekshirisiz xato boshqarish:**
   \`\`\`javascript
   // XATO:
   const response = await fetch(url);
   const data = await response.json();  // 404 bo'lsa ham ishlaydi!

   // TO'G'RI:
   if (!response.ok) throw new Error("Status: " + response.status);
   const data = await response.json();
   \`\`\`

3. **POST'da body'ni unutish:**
   \`\`\`javascript
   // XATO:
   fetch(url, { method: "POST", headers: {...} });

   // TO'G'RI:
   fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(data) });
   \`\`\`

4. **CORS muammolari:**
   \`\`\`javascript
   // Server CORS allow qilmasa, browser radi qiladi
   // Yechim: server'da CORS setup yoki proxy
   \`\`\`

5. **Credentials (Cookie) unutish:**
   \`\`\`javascript
   // Login'dan keyin cookie yuborish:
   fetch(url, {
     credentials: "include"  // Cookie'larni yuborish
   });
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Fetch API nima va nima uchun kerak?</summary>
Brauzer orqali serverga tarmoq so'rovlarini yuborish uchun ishlatiladigan zamonaviy vosita. Sahifani yangilamasdan ma'lumotni olish/yuborish mumkin.
</details>

<details>
<summary>2. Fetch default holatda qaysi metodni ishlatadi?</summary>
GET metodi. Ma'lumot yuborishda POST yoki boshqa metod belgilash kerak.
</details>

<details>
<summary>3. response.ok nima va qachon true bo'ladi?</summary>
HTTP status kod 200-299 oralig'ida bo'lsa true bo'ladi. 404 yoki 500 bo'lsa false.
</details>

<details>
<summary>4. \`response.json()\` nima qaytaradi?</summary>
Promise qaytaradi. JSON matnini JavaScript obyektiga o'giradi.
</details>

<details>
<summary>5. POST so'rovda body nima uchun kerak?</summary>
Server'ga yubormoqchi bo'lgan ma'lumot (data) body'da boriladi. JSON.stringify() orqali string'ga o'giriladi.
</details>

<details>
<summary>6. Headers nima uchun kerak?</summary>
So'rovga qo'shilgan meta-ma'lumot. Masalan: Content-Type, Authorization.
</details>

<details>
<summary>7. CORS nima va nima uchun kerak?</summary>
Cross-Origin Resource Sharing. Boshqa domen'dan ma'lumot olishda xavfsizlik. Server bu ijozat berishi kerak.
</details>

<details>
<summary>8. AbortController nima uchun kerak?</summary>
Request timeout'ini o'rnatish uchun. Agar server javob bermaydigan bo'lsa so'rovni to'xtatish.
</details>

<details>
<summary>9. Fetch va XMLHttpRequest farqi nima?</summary>
Fetch zamonaviy, Promise-based. XMLHttpRequest eski, Event-based. Fetch o'qish oson.
</details>

<details>
<summary>10. Credentials: "include" nima uchun kerak?</summary>
Cross-origin so'rovlarda cookie'larni yuborish uchun. Login session saqlanishi uchun.
</details>

<details>
<summary>11. Promise.all() bilan parallel request'lar nima foydasi?</summary>
Bir vaqtda ko'p so'rovlarni yuborish. Hammasini kutish o'rniga barchasi parallel ishlaydi - tezroq.
</details>

<details>
<summary>12. Retry mexanizmi nima va qachon kerak?</summary>
Internet uzilsa yoki server xatosi bo'lsa, avtomatik qayta urinish. Real loyihalarda stability uchun muhim.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy GET So'rov",
      instruction: "JSONPlaceholder API'dan ID-1 bo'lgan postni olib, titleni konsolga chiqaring. Fetch va async/await ishlating.",
      startingCode: "// GET so'rovni yozing\nasync function getPost() {\n  // Bu yerga yozing\n}\n\ngetPost();\n",
      hint: "const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); const data = await response.json(); console.log(data.title);",
      test: "if (code.includes('fetch') && code.includes('async') && code.includes('response.json')) return null; return 'GET so\\'rovni to\\'g\\'ri qo\\'llanilmadi';"
    },
    {
      id: 2,
      title: "Response.ok Tekshirish",
      instruction: "API'dan ma'lumot olib, response.ok bo'lsa 'Muvaffaqiyat', bo'lmasa 'Xato' deb chiqaring.",
      startingCode: "async function checkResponse() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');\n  // Bu yerga yozing\n}\n\ncheckResponse();\n",
      hint: "if (response.ok) { console.log('Muvaffaqiyat'); } else { console.log('Xato'); }",
      test: "if (code.includes('response.ok') && (logs.includes('Muvaffaqiyat') || logs.includes('Xato'))) return null; return 'response.ok tekshirish noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "JSON Parse",
      instruction: "response.json()'ni chaqirib, natijani o'zgaruvchiga sakling. Keyin uning typeof'ini chiqaring.",
      startingCode: "async function parseJson() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');\n  // Bu yerga yozing\n}\n\nparseJson();\n",
      hint: "const data = await response.json(); console.log(typeof data); // 'object' bo'lishi kerak",
      test: "if (code.includes('await response.json()') && logs.includes('object')) return null; return 'JSON parse noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "POST So'rov",
      instruction: "JSONPlaceholder'ga yangi post yuborib, qaytargan ID'ni konsolga chiqaring.",
      startingCode: "async function createPost() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ title: 'Test', body: 'Test body', userId: 1 })\n  });\n  // Bu yerga yozing\n}\n\ncreatePost();\n",
      hint: "const data = await response.json(); console.log(data.id);",
      test: "if (code.includes('method') && code.includes('POST') && code.includes('body')) return null; return 'POST so\\'rov noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Error Handling",
      instruction: "Try-catch bilan fetch ichida xatolarni ushlang. 404 API'ni chaqiring va xatoni consolga chiqaring.",
      startingCode: "async function fetchWithError() {\n  try {\n    // Bu yerga yozing\n  } catch (error) {\n    // Bu yerga yozing\n  }\n}\n\nfetchWithError();\n",
      hint: "try { const response = await fetch('https://jsonplaceholder.typicode.com/invalid'); ... } catch (error) { console.log(error); }",
      test: "if (code.includes('try') && code.includes('catch')) return null; return 'Error handling noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "Headers Qo'shish",
      instruction: "Fetch so'roviga headers qo'shing. Content-Type'ni 'application/json' qilib, Authorization'ni qo'shing.",
      startingCode: "async function fetchWithHeaders() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {\n    // Bu yerga headers qo'shing\n  });\n  const data = await response.json();\n  console.log(data.title);\n}\n\nfetchWithHeaders();\n",
      hint: "headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer token123' }",
      test: "if (code.includes('headers') && code.includes('Content-Type')) return null; return 'Headers noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "DELETE So'rov",
      instruction: "ID-1 bo'lgan postni o'chirish uchun DELETE so'rov yuborib, muvaffaqiyat xabarini chiqaring.",
      startingCode: "async function deletePost() {\n  // DELETE so'rovini yozing\n}\n\ndeletePost();\n",
      hint: "const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' });",
      test: "if (code.includes('method') && code.includes('DELETE')) return null; return 'DELETE so\\'rov noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "AbortController - Timeout",
      instruction: "AbortController orqali 2 soniya timeout qo'yib, API'dan ma'lumot olib ko'ring.",
      startingCode: "async function fetchWithTimeout() {\n  const controller = new AbortController();\n  const timeoutId = setTimeout(() => controller.abort(), 2000);\n  // Bu yerga yozing\n}\n\nfetchWithTimeout();\n",
      hint: "const response = await fetch(url, { signal: controller.signal });",
      test: "if (code.includes('AbortController') && code.includes('signal')) return null; return 'Timeout noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Parallel Requests (Promise.all)",
      instruction: "Promise.all() orqali 3 ta post'ni bir vaqtda olib, ularning ID'larini konsolga chiqaring.",
      startingCode: "async function getMultiplePosts() {\n  try {\n    const [post1, post2, post3] = await Promise.all([\n      // Bu yerga yozing - 3 ta fetch\n    ]);\n    console.log(post1.id, post2.id, post3.id);\n  } catch (error) {\n    console.error(error);\n  }\n}\n\ngetMultiplePosts();\n",
      hint: "fetch(...).then(r => r.json()), fetch(...).then(r => r.json()), fetch(...).then(r => r.json())",
      test: "if (code.includes('Promise.all')) return null; return 'Promise.all noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 10,
      title: "Retry Mexanizmi",
      instruction: "'fetchWithRetry' funksiyasini yarating. 3 marta qayta urinish uchun loop qo'llanilsin.",
      startingCode: "async function fetchWithRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      // Bu yerga yozing\n    } catch (error) {\n      // Bu yerga yozing\n    }\n  }\n}\n\nfetchWithRetry('https://jsonplaceholder.typicode.com/posts/1');\n",
      hint: "if (i === retries - 1) throw error; else console.log('Retry...');",
      test: "if (code.includes('for') && code.includes('retries')) return null; return 'Retry mexanizmi noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "PATCH So'rov (O'zgartirlish)",
      instruction: "ID-1 bo'lgan post'ning title'ni PATCH orqali o'zgartiring.",
      startingCode: "async function patchPost() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {\n    // Bu yerga PATCH so'rovini yozing\n  });\n  const data = await response.json();\n  console.log('Updated:', data.title);\n}\n\npatchPost();\n",
      hint: "method: 'PATCH', headers: {...}, body: JSON.stringify({ title: 'Yangi title' })",
      test: "if (code.includes('method') && code.includes('PATCH')) return null; return 'PATCH so\\'rov noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Robust API Client",
      instruction: "Robust API client yarating: response.ok tekshirish, error handling, va headers qo'shish birgalikda.",
      startingCode: "async function robustApiCall(url, options = {}) {\n  try {\n    // Bu yerga yozing - headers, method, body\n    // response.ok tekshiring\n    // data qaytaring\n  } catch (error) {\n    // Xatoni handle qiling\n  }\n}\n\nrobustApiCall('https://jsonplaceholder.typicode.com/posts/1', { method: 'GET' });\n",
      hint: "if (!response.ok) throw new Error('HTTP ' + response.status);",
      test: "if (code.includes('response.ok') && code.includes('try') && code.includes('catch')) return null; return 'Robust client noto\\'g\\'ri';"
    }
  ]
};

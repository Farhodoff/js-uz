export const fetchApi = {
  id: "a3",
  title: "Fetch API (Server bilan aloqa)",
  theory: `## 1. FETCH API NIMA?
**Fetch API** — bu brauzer orqali tarmoq (network) so'rovlarini amalga oshirish uchun ishlatiladigan zamonaviy interfeys. U yordamida biz serverdan ma'lumot olishimiz (GET) yoki ma'lumot yuborishimiz (POST) mumkin.

---

## 2. ISHLASH PRINSIPI
Fetch har doim **Promise** qaytaradi. Ma'lumotni olish jarayoni ikki bosqichdan iborat:
1.  **Response:** Serverdan javob kelishi (status, headers).
2.  **Data:** Kelgan javobni o'qish (odatda \`.json()\` orqali).

### Oddiy misol (Async/Await):
\`\`\`javascript
async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  console.log(data);
}
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant B as Brauzer
    participant S as Server
    B->>S: fetch(url) - So'rov
    S-->>B: Response (status 200)
    B->>B: response.json()
    B-->>B: Ma'lumot tayyor!
\`\`\`

---

## 3. STATUS KODLAR VA XATOLAR
Fetch faqat tarmoq xatosi bo'lgandagina (masalan, internet uzilsa) \`catch\` blokiga tushadi. Agar server 404 yoki 500 xatosini qaytarsa, Fetch buni xato deb hisoblamaydi. Shuning uchun \`response.ok\` ni tekshirish kerak.

\`\`\`javascript
if (!response.ok) {
  throw new Error("Xatolik: " + response.status);
}
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Middle)

1. **Nega fetch() da xatolarni tutish uchun faqat catch etarli emas?**
   *Javob:* Chunki Fetch HTTP xatolarni (404, 500) xato deb hisoblamaydi, u faqat tarmoq uzilishidagina catch'ga tushadi.

2. **JSON() metodi nima qaytaradi?**
   *Javob:* U ham Promise qaytaradi, chunki katta ma'lumotlarni o'qish vaqt olishi mumkin.

3. **Fetch bilan qanday qilib POST so'rov yuboriladi?**
   *Javob:* \`fetch(url, { method: 'POST', body: JSON.stringify(data), headers: { ... } })\` ko'rinishida.`,
  exercises: [
    {
      id: 1,
      title: "Ma'lumot olish (GET)",
      instruction: "JSONPlaceholder API'dan postlarni oling va konsolga 'Data received' deb chiqaring.",
      startingCode: "async function getPosts() {\n  // Bu yerda fetch va await ishlating\n}\n\ngetPosts();",
      hint: "await fetch(...); console.log('Data received');",
      test: "if (code.includes('fetch') && logs.includes('Data received')) return null; return 'Fetch ishlatilishi va xabar chiqishi kerak';"
    },
    {
      id: 2,
      title: "Statusni tekshirish",
      instruction: "Agar response.ok bo'lsa 'OK', bo'lmasa 'ERROR' deb chiqaring.",
      startingCode: "const res = { ok: true };\n// Bu yerda tekshiring\n",
      hint: "if (res.ok) { console.log('OK'); }",
      test: "if (logs.includes('OK')) return null; return 'OK chiqishi kerak';"
    }
  ]
};

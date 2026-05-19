export const fetchApi = {
  id: "a3",
  title: "Fetch API: Server bilan Xavfsiz Aloqa",
  level: "O'rta/Murakkab",
  description: "Brauzer orqali serverga so'rov yuborish, ma'lumot olish va yuborish. Zamonaviy Fetch API.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, saytingizda ob-havo ma'lumotini ko'rsatmoqchisiz. Buning uchun sizga boshqa bir serverdan ma'lumot kerak. **Fetch API** sizga sahifani yangilamasdan (backgroundda) server bilan "gaplashish" imkonini beradi.

## 2. SODDALIK (Analogiya)

Fetch — bu restorandagi ofitsiantga o'xshaydi:
- **Siz**: "Menga kebab bering!" (Fetch so'rov)
- **Ofitsiant**: Oshxonaga boradi (Server)
- **Oshxona**: Ovqatni tayyorlaydi (Server ma'lumotni tayyorlaydi)
- **Ofitsiant**: Kebabni olib keladi (Response)

## 3. STRUKTURA

### A. GET So'rov (Ma'lumot Olish)
\`\`\`javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

### B. Response.ok
So'rov muvaffaqiyatli bo'lganini tekshirish (status 200-299).

### C. POST So'rov (Ma'lumot Yuborish)
\`\`\`javascript
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
\`\`\`

## 4. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Fetch API nima?</summary>
Brauzerda tarmoq so'rovlarini yuborish uchun asinxron vosita.
</details>

<details>
<summary>2. Fetch default metodi qaysi?</summary>
GET.
</details>

<details>
<summary>3. response.json() nima qaytaradi?</summary>
Promise (JSON matni obyektga aylangach resolve bo'ladi).
</details>

<details>
<summary>4. response.ok qachon true?</summary>
Status kodi 200-299 oralig'ida bo'lsa.
</details>

<details>
<summary>5. POST so'rovda body qanday bo'ladi?</summary>
Odatda JSON.stringify(data) bilan string ko'rinishida.
</details>

<details>
<summary>6. Fetch xatolarini qanday ushlaymiz?</summary>
.catch() yoki try...catch (await bo'lsa).
</details>

<details>
<summary>7. Header-lar nima uchun kerak?</summary>
Meta-ma'lumotlar (masalan, Token, Content-Type) yuborish uchun.
</details>

<details>
<summary>8. CORS nima?</summary>
Boshqa domendan ma'lumot olish xavfsizlik cheklovi.
</details>

<details>
<summary>9. AbortController nima qiladi?</summary>
Fetch so'rovini to'xtatish (masalan, timeout bo'lsa).
</details>

<details>
<summary>10. Fetch va XMLHttpRequest farqi?</summary>
Fetch zamonaviy, Promise-ga asoslangan.
</details>

<details>
<summary>11. Bir vaqtda ko'p so'rov yuborish?</summary>
Promise.all([fetch1, fetch2]) orqali.
</details>

<details>
<summary>12. Retry pattern nima?</summary>
So'rov xato bo'lsa, avtomatik qayta urinish.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Simple Fetch",
      instruction: "JSONPlaceholder-dan post olib titleni chiqaring.",
      startingCode: "async function getPost() {\n  // Bu yerga yozing\n}",
      hint: "fetch(url) keyin await res.json()",
      test: "if (code.includes('fetch')) return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`fetch()` metodi serverga tarmoq so'rovini yuborib default holatda nima qaytaradi?",
      options: [
        "JSON matn",
        "Promise (u hal bo'lganda Response obyekti qaytadi)",
        "JavaScript obyekti",
        "Faqat status kodi"
      ],
      correctAnswer: 1,
      explanation: "`fetch()` har doim asinxron Promise qaytaradi. U muvaffaqiyatli yakunlanganda Response obyektini saqlaydi."
    },
    {
      id: 2,
      question: "Nima uchun `response.json()` metodidan oldin ham `await` kalit so'zini yozish kerak?",
      options: [
        "Brauzer majburiy qilgan",
        "`response.json()` ham asinxron bo'lib, o'qib tugatilgandan keyin Promise qaytaradi",
        "Hech qanday sabab yo'q",
        "Sinxron ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Body ma'lumotlarini o'qish va JSON sifatida parse qilish vaqt oladi, shuning uchun bu jarayon asinxron Promise qaytaradi."
    }
  ]
};
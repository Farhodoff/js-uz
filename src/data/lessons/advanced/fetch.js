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

**1. Fetch API nima?**
Brauzerda tarmoq so'rovlarini yuborish uchun asinxron vosita.


**2. Fetch default metodi qaysi?**
GET.


**3. response.json() nima qaytaradi?**
Promise (JSON matni obyektga aylangach resolve bo'ladi).


**4. response.ok qachon true?**
Status kodi 200-299 oralig'ida bo'lsa.


**5. POST so'rovda body qanday bo'ladi?**
Odatda JSON.stringify(data) bilan string ko'rinishida.


**6. Fetch xatolarini qanday ushlaymiz?**
.catch() yoki try...catch (await bo'lsa).


**7. Header-lar nima uchun kerak?**
Meta-ma'lumotlar (masalan, Token, Content-Type) yuborish uchun.


**8. CORS nima?**
Boshqa domendan ma'lumot olish xavfsizlik cheklovi.


**9. AbortController nima qiladi?**
Fetch so'rovini to'xtatish (masalan, timeout bo'lsa).


**10. Fetch va XMLHttpRequest farqi?**
Fetch zamonaviy, Promise-ga asoslangan.


**11. Bir vaqtda ko'p so'rov yuborish?**
Promise.all([fetch1, fetch2]) orqali.


**12. Retry pattern nima?**
So'rov xato bo'lsa, avtomatik qayta urinish.
`,
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
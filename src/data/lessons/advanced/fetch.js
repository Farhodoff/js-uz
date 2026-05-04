export const fetchApi = {
  id: "a3",
  title: "Fetch API va AJAX (Server bilan aloqa)",
  level: "Murakkab",
  description: "Brauzer orqali serverga so'rov yuborish: zamonaviy Fetch va eski AJAX usullari.",
  theory: `
# Fetch API – Bu nima va nima uchun kerak?

**Fetch API** — bu brauzer orqali serverga tarmoq (network) so'rovlarini yuborish uchun ishlatiladigan zamonaviy vosita. U yordamida biz serverdan ma'lumot olishimiz (GET) yoki ma'lumot yuborishimiz (POST) mumkin.

## 1. NEGA kerak?
Tasavvur qiling, saytingizda ob-havo ma'lumotini ko'rsatmoqchisiz. Buning uchun sizga boshqa bir serverdan ma'lumot kerak. Fetch sizga sahifani yangilamasdan (backgroundda) server bilan "gaplashish" imkonini beradi.

## 2. SODDALIK (Analogiya)
Fetch — bu restorandagi ofitsiantga o'xshaydi. Siz unga buyurtma berasiz (fetch call), u oshxonaga (server) boradi va ovqatni (ma'lumotni) olib keladi. Siz esa u kelguncha o'z ishingizni qilib turaverasiz (Asinxronlik).

## 3. STRUKTURA

### A. Fetch ishlatish (Async/Await)
Fetch har doim **Promise** qaytaradi:
\`\`\`javascript
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json(); // Matnni JSON obyektga o'girish
  console.log(data.title);
}
\`\`\`

### B. AJAX (Eski usul - XMLHttpRequest)
Fetch'dan oldin dasturchilar \`XMLHttpRequest\` (AJAX) ishlatishgan. U juda noqulay bo'lgan:
\`\`\`javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "url");
xhr.onload = function() { console.log(xhr.responseText); };
xhr.send();
\`\`\`
Bugungi kunda Fetch (yoki Axios) ishlatish standart hisoblanadi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(res => res.json())
  .then(json => console.log(json));
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **JSONni unutish:** \`fetch\` qaytargan \`res\` bu hali ma'lumot emas, bu "javob". Uni \`res.json()\` deb o'girish shart.
2. **Double Await:** \`res.json()\` ham Promise qaytaradi, shuning uchun uning oldida ham \`await\` bo'lishi kerak.
3. **Network Errors:** Fetch faqat internet uzilsagina \`catch\`ga tushadi. 404 xatolarida \`catch\`ga tushmaydi, \`res.ok\`ni tekshirish kerak.

## 6. SAVOLLAR (12 ta)
1. Fetch API nima?
2. AJAX (Asynchronous JavaScript and XML) nima?
3. Fetch va XMLHttpRequest farqi nimada?
4. \`res.json()\` metodi nima qaytaradi?
5. Fetch default holatda qaysi metodni ishlatadi (GET)?
6. POST so'rov yuborishda \`body\` nima uchun kerak?
7. \`res.ok\` qachon \`true\` bo'ladi?
8. Nima uchun fetch asinxron ishlaydi?
9. Fetch status kodlari 404 bo'lganda \`catch\`ga tushadimi?
10. \`headers\` (sarlavhalar) nima uchun kerak?
11. API nima degani?
12. Fetch orqali rasm yoki fayl yuklasa bo'ladimi?`,

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

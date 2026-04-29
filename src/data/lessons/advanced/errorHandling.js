export const errorHandling = {
  id: "a5",
  title: "Xatolar bilan ishlash (Error Handling)",
  theory: `## Try...Catch
Dastur ishlayotgan paytda yuzaga keladigan xatolarni "tutib olish" uchun ishlatiladi.

\`\`\`javascript
try {
  // xato bo'lishi mumkin bo'lgan kod
  let x = y + 1;
} catch (error) {
  console.log("Xato yuz berdi: " + error.message);
} finally {
  console.log("Har doim ishlaydi");
}
\`\`\`

**Throw:**
O'zimiz xato yaratishimiz mumkin:
\`throw new Error("Ma'lumot noto'g'ri");\``,
  task: `// 1. 'json' stringni 'JSON.parse' qilishga harakat qiling.
// 2. Uni 'try...catch' ichiga oling.
// 3. Xato bo'lsa, konsolga "Format noto'g'ri" deb chiqaring.

let json = "{ ism: 'Ali' }"; // Noto'g'ri JSON (kalitlar " " ichida bo'lishi kerak)
// ...`,
  hint: `let json = "{ ism: 'Ali' }";
try {
  let user = JSON.parse(json);
} catch (e) {
  console.log("Format noto'g'ri");
}`
};

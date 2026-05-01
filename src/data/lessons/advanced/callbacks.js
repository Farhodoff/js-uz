export const callbacksLesson = {
  id: "a0",
  title: "Callback Functions (Qayta chaqiruv)",
  theory: `## 1. CALLBACK NIMA?
**Callback** — bu boshqa bir funksiyaga **argument** sifatida berib yuboriladigan funksiya. U asosan asinxron ishlar (masalan: ma'lumot kutish, taymer) tugagandan so'ng bajarilishi uchun ishlatiladi.

### Oddiy misol (Sinxron):
\`\`\`javascript
function salomBer(ism, callback) {
  console.log("Salom " + ism);
  callback();
}

salomBer("Ali", () => console.log("Callback ishga tushdi!"));
\`\`\`

---

## 2. ASINXRON CALLBACK VA TAYMERLAR
Taymerlar (\`setTimeout\`, \`setInterval\`) JavaScriptda asinxronlikni ko'rsatuvchi eng sodda misollardir.

\`\`\`javascript
console.log("1. Boshlanish");

setTimeout(() => {
  console.log("2. Taymer tugadi (2 sekundan keyin)");
}, 2000);

console.log("3. Tugash");
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant JS as Call Stack
    participant Web as Web API (Timer)
    participant Q as Task Queue
    JS->>Web: setTimeout(cb, 2s)
    Note over JS: Boshqa kodlarni bajaradi
    Web-->>Q: 2s tugadi! cb ni yuborish
    Q->>JS: cb ni stackka qo'shish
    JS->>JS: Callback bajariladi
\`\`\`

---

## 3. CALLBACK HELL (Piramida muammosi)
Agar asinxron ishlar bir-biriga bog'liq bo'lsa, kod ichma-ich kirib ketadi va o'qish juda qiyin bo'ladi. Bu **Callback Hell** deyiladi.

\`\`\`javascript
ma'lumotOl(id, (user) => {
  postlarniOl(user.id, (posts) => {
    izohlarniOl(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **Callback nima?**
   *Javob:* Funksiyaga argument sifatida uzatiladigan boshqa bir funksiya.

2. **setTimeout(fn, 0) nima qiladi?**
   *Javob:* Funksiyani darhol emas, balki joriy Call Stack bo'shagandan so'ng (navbatdagi birinchi imkoniyatda) bajaradi.

3. **Inversion of Control nima?**
   *Javob:* Callback ishlatganda biz funksiya ijrosini boshqa bir koda (masalan, kutubxonaga) topshiramiz. Bu ba'zan xavfli bo'lishi mumkin (masalan, callback necha marta chaqirilishini nazorat qilolmaymiz).`,
  exercises: [
    {
      id: 1,
      title: "setTimeout mashqi",
      instruction: "1 soniyadan keyin 'Salom' matnini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setTimeout(() => console.log('Salom'), 1000);",
      test: "if (code.includes('setTimeout')) return null; return 'setTimeout ishlatilmadi';"
    },
    {
      id: 2,
      title: "Callback yaratish",
      instruction: "'process' funksiyasi bitta callback qabul qilsin va uni ichkarida chaqirsin.",
      startingCode: "function process(cb) {\n  // Bu yerda chaqiring\n}\n\nprocess(() => console.log('Done'));",
      hint: "cb();",
      test: "if (logs.includes('Done')) return null; return 'Callback chaqirilmadi';"
    }
  ]
};

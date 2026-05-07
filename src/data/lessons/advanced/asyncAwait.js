export const asyncAwait = {
  id: "async-await",
  title: "Async / Await: Asinxronlikning cho'qqisi",
  level: "Murakkab",
  description: "Asinxron kodni xuddi sinxron koddek oson va tushunarli yozish usuli.",
  theory: `## 1. NEGA kerak?
Promiselar zanjiri (\`.then().then().then()\`) ba'zan juda uzun va o'qishga noqulay bo'lib ketadi (buni "Promise Hell" deyishadi). \`async/await\` bu zanjirlarni yo'qotib, kodni xuddi yuqoridan pastga qarab ketma-ket yozilgan oddiy koddek ko'rinishga keltiradi.

## 2. SODDALIK (Analogiya)
Buni **navbatda turish** deb tasavvur qiling:
- \`async\`: Siz navbatga turganingizni bildiradi.
- \`await\`: "Mening navbatim kelguncha kutib turaman, lekin boshqa odamlarga (kodlarga) xalaqit bermayman" degani. Siz kutayotganingizda hayot (brauzer) to'xtab qolmaydi.

## 3. STRUKTURA

### A. Qoidalar
1. Funksiya oldida \`async\` so'zi bo'lishi shart.
2. Promisening natijasini kutish uchun \`await\` ishlatiladi.
3. \`async\` funksiya har doim **Promise** qaytaradi.

\`\`\`javascript
async function ma'lumotOl() {
  const javob = await fetch("https://api.example.com/data");
  const malumot = await javob.json();
  return malumot;
}
\`\`\`

### B. Xatolarni ushlash (try...catch)
Async funksiyalarda \`.catch()\` o'rniga bizga tanish bo'lgan \`try...catch\` ishlatiladi:
\`\`\`javascript
async function ishgaTushir() {
  try {
    const natija = await xavfliIsh();
    console.log(natija);
  } catch (xato) {
    console.error("Xatolik yuz berdi:", xato.message);
  }
}
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **await'ni oddiy funksiyada ishlatish:** \`await\` faqat \`async\` funksiya ichida ishlaydi (yoki modullarning eng tepa qismida).
2. **Kodni keraksiz ketma-ketlikka qo'yish:** Agar ikkita so'rov bir-biriga bog'liq bo'lmasa, ularni alohida \`await\` qilib vaqt yo'qotmang. \`Promise.all()\` dan foydalaning.
3. **Try-catchni unutish:** Asinxron amallar ko'pincha muvaffaqiyatsiz bo'lishi mumkin (internet uzilishi va h.k.), shuning uchun doim \`try...catch\` ishlating.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. async kalit so'zi nima vazifani bajaradi?</summary>
Funksiyani asinxron deb belgilaydi va uning natijasini har doim Promise ichiga o'raydi.
</details>

<details>
<summary>2. await so'zi nima qiladi?</summary>
Promise natijasi chiqquncha kodning ijrosini to'xtatib turadi (bloklamasdan).
</details>

<details>
<summary>3. Async funksiya return 10 qilsa, natija nima bo'ladi?</summary>
\`Promise { 10 }\` (ya'ni qiymati 10 bo'lgan Promise).
</details>

<details>
<summary>4. await-ni funksiya tashqarisida ishlatish mumkinmi?</summary>
Faqat JS modullarining eng yuqori qismida (Top-level await) mumkin.
</details>

<details>
<summary>5. Asinxron xatolarni qanday ushlaymiz?</summary>
\`try...catch\` bloklari yordamida.
</details>

<details>
<summary>6. await ishlatilganda brauzer qotib qoladimi?</summary>
Yo'q, \`await\` faqat o'sha funksiyani to'xtatadi, asosiy oqim (UI) ishlashda davom etadi.
</details>

<details>
<summary>7. async/await Promiselarni o'rnini bosadimi?</summary>
Yo'q, u aslida Promiselar ustiga qurilgan qulayroq yozish usuli xolos.
</details>

<details>
<summary>8. Bir vaqtda bir nechta await ishlatishning kamchiligi nimada?</summary>
Agar ular bir-biriga bog'liq bo'lmasa, umumiy vaqt ko'payib ketadi (ketma-ket kutish tufayli).
</details>

<details>
<summary>9. Promise.all() ni await bilan qanday ishlatish mumkin?</summary>
\`const [res1, res2] = await Promise.all([p1, p2]);\`
</details>

<details>
<summary>10. async funksiya ichida await ishlatmaslik mumkinmi?</summary>
Ha, mumkin, lekin bu funksiya baribir Promise qaytaradi.
</details>

<details>
<summary>11. await faqat Promiselar bilan ishlaydimi?</summary>
Asosan ha, lekin u "thenable" (ichida .then metodi bor) obyektlar bilan ham ishlay oladi.
</details>

<details>
<summary>12. Nima uchun callbacklardan ko'ra async/await afzal?</summary>
Kod o'qilishi osonlashadi, "callback hell" yo'qoladi va xatolarni boshqarish qulayroq.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Async yaratish",
      instruction: "Konsolga 'Salom' qaytaradigan oddiy asinxron funksiya ('test') yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "async function test() { return 'Salom'; }",
      test: "if (code.includes('async function test')) return null; return 'async ishlatib test funksiyasini yarating';"
    },
    {
      id: 2,
      title: "Await bilan kutish",
      instruction: "Berilgan 'delay' funksiyasini await orqali chaqiring va natijani konsolga chiqaring.",
      startingCode: "const delay = () => new Promise(res => res('Tayyor'));\nasync function run() {\n  // Bu yerga yozing\n}\nrun();",
      hint: "const res = await delay(); console.log(res);",
      test: "if (logs.includes('Tayyor')) return null; return 'await orqali natijani kutib oling va chiqaring';"
    },
    {
      id: 3,
      title: "Xatoni ushlash",
      instruction: "Xato beruvchi funksiyani try...catch ichida await qiling va xato bo'lsa 'Xato' deb chiqaring.",
      startingCode: "const fail = () => Promise.reject('Ups');\nasync function run() {\n  // Bu yerga yozing\n}\nrun();",
      hint: "try { await fail(); } catch(e) { console.log('Xato'); }",
      test: "if (logs.includes('Xato')) return null; return 'try...catch va await ishlating';"
    }
  ]
};

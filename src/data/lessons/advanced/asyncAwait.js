export const asyncAwait = {
  id: "async-await",
  title: "Async / Await",
  level: "Advanced",
  description: "Asinxron kodni xuddi sinxron koddek oson va tushunarli yozish usuli.",
  theory: `
# Async / Await – Bu nima va nima uchun kerak?

**Async/Await** — bu Promiselar bilan ishlashni yanada osonlashtiradigan "shirin" sintaksis (syntactic sugar). U asinxron kodni xuddi ketma-ket (sinxron) yozilgan koddek o'qishga imkon beradi.

## 1. NEGA kerak?
Hatto Promiselar ham zanjir (\`.then().then().then()\`) bo'lib ketganda o'qish qiyinlashishi mumkin. \`async/await\` bu zanjirlarni yo'qotib, kodni chiroyli va toza holatga keltiradi.

## 2. SODDALIK (Analogiya)
Buni **navbatda turish** deb tasavvur qiling:
- \`async\`: "Men navbatga turdim" degani.
- \`await\`: "Mening navbatim kelguncha kutib turaman, lekin boshqa odamlarga xalaqit bermayman" degani. Siz kutayotganingizda hayot (boshqa kodlar) to'xtab qolmaydi.

## 3. STRUKTURA

### A. Ishlatish qoidasi
1. Funksiya oldida \`async\` so'zi bo'lishi shart.
2. Promisening natijasini kutish uchun \`await\` ishlatiladi.
\`\`\`javascript
async function ma'lumotOl() {
  const res = await fetch("url");
  const data = await res.json();
  console.log(data);
}
\`\`\`

### B. Xatolarni ushlash (try...catch)
Async funksiyalarda \`.catch()\` o'rniga oddiy \`try...catch\` ishlatiladi:
\`\`\`javascript
async function runner() {
  try {
    const data = await ba'zanXatoBeradiganFunksiya();
  } catch (err) {
    console.log("Xato ushlandi: " + err);
  }
}
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
async function salom() {
  return "Assalomu alaykum!";
}
salom().then(res => console.log(res)); // Async funksiya har doim Promise qaytaradi
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **await'ni funksiya tashqarisida ishlatish:** Faqat \`async\` funksiya ichida ishlatish mumkin (Top-level await modullarda ishlaydi).
2. **Kodni keraksiz kutib turish:** Agar ikkita bir-biriga bog'liq bo'lmagan so'rov bo'lsa, ularni alohida \`await\` qilib vaqt yo'qotmang, \`Promise.all()\` ishlating.

## 6. SAVOLLAR (12 ta)
1. \`async\` kalit so'zi nima vazifani bajaradi?
2. \`await\` nima vazifani bajaradi?
3. \`async\` funksiya har doim nima qaytaradi?
4. \`await\`ni oddiy funksiya ichida ishlatsa bo'ladimi?
5. Async funksiyalarda xatolar qanday ushlanadi?
6. \`await\` ishlatilganda asosiy oqim (main thread) to'xtab qoladimi?
7. \`async/await\` Promiselardan butunlay voz kechishmi?
8. Bir vaqtda bir nechta \`await\` ishlatsa nima bo'ladi?
9. \`Promise.all()\` bilan \`await\`ni qanday birga ishlatish mumkin?
10. Top-level await nima?
11. Async funksiya ichida \`return 5\` yozsak, u nima qaytaradi (\`Promise { 5 }\`)?
12. Nima uchun \`async/await\` callbacklardan ko'ra yaxshiroq?`,
  exercises: [
    {
      id: 1,
      title: "Async mashqi",
      instruction: "Async funksiya yarating va unda 1 soniya kutib 'Tayyor' matnini qaytaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "async function test() { await new Promise(r => setTimeout(r, 1000)); return 'Tayyor'; }",
      test: "if (code.includes('async') && code.includes('await')) return null; return 'async/await ishlating';"
    }
  ]
};

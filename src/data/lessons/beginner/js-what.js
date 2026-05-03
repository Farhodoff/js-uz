export const jsWhat = {
  id: "js-introduction",
  title: "JavaScriptga Kirish",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, sizda chiroyli mashina bor (bu **HTML** va **CSS**). Lekin u yurmaydi, chiroqlari yonmaydi va signali ishlamaydi. Uni "jonlantirish" uchun sizga dvigatel va miya kerak. Veb-saytlar uchun bu "miya" — **JavaScript**dir!

**JavaScript** — bu veb-sahifalarni interaktiv (jonli) qiladigan dunyodagi eng mashhur dasturlash tili.

---

## 2. ISHLASH MUHITI (Tushuntir → Ko'rsat → Bajartir)
JavaScriptni yozish uchun sizga hech qanday maxsus dastur shart emas, brauzerning o'zi yetarli!

### A. Brauzer Konsoli
Bu eng tezkor "laboratoriya".
1. Brauzerni oching (Chrome).
2. Sichqonchaning o'ng tugmasini bosib **"Inspect"** (Tekshirish) ni tanlang.
3. **"Console"** bo'limiga o'ting.

**Ko'rsat:**
\`\`\`javascript
console.log("Salom, Farhodoff!");
\`\`\`

**Mashq:** Konsolga o'z ismingizni \`console.log\` yordamida chiqaring.

---

## 3. ASOSIY QURILMA: console.log()
Bu komanda kompyuterga: "Menga mana shu ma'lumotni ko'rsat!" degan buyruqdir.

**Ko'rsat:**
\`\`\`javascript
console.log(100 + 200); // 300
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR ⚠️
1.  **Harf xatosi:** \`Console.log\` (Katta harf bilan) — Xato! ❌ JavaScript harflarga juda sezgir.
2.  **Qo'shtirnoqni unutish:** \`console.log(Salom)\` — Xato! ❌ Matnlar doim \`""\` yoki \`''\` ichida bo'lishi shart.

---

## 5. BUZIB KO'RISH 🧐
**Nima bo'ladi agar sonni qo'shtirnoq ichiga olsak?**
\`\`\`javascript
console.log("10" + "20"); // "1020" chiqadi, 30 emas!
\`\`\`
**Nega?** Chunki qo'shtirnoq ichidagi narsa JavaScript uchun shunchaki "matn" (string). U ularni matematik hisoblamaydi, shunchaki bir-biriga yopishtiradi.

---

## 6. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **JavaScript nima? (Junior)**
   *Javob:* Veb-sahifalarni jonlantiruvchi dasturlash tili.

2. **console.log() vazifasi nima? (Junior)**
   *Javob:* Ma'lumotlarni konsolga (ekranga) chiqarish va debugging uchun.

3. **JS faqat brauzerda ishlaydimi? (Junior)**
   *Javob:* Yo'q, Node.js orqali serverlarda, robotlarda va mobil ilovalarda ham ishlaydi.

4. **Katta va kichik harflarning farqi bormi? (Junior)**
   *Javob:* Ha, \`name\` va \`Name\` — bu ikki xil narsa.

5. **Matn chiqarish. (Junior - Amaliy)**
   *Vazifa:* Konsolga "Men dasturchiman" matnini chiqaring.

6. **Oddiy matematika. (Junior - Amaliy)**
   *Vazifa:* 50 ko'paytirilgan 2 ni konsolga chiqaring.

7. **Xato bilan ishlash. (Junior - Amaliy)**
   *Vazifa:* \`console.error("Xato sodir bo'ldi")\` kodini yozib ko'ring va natijani ko'ring.

8. **Script tegi nima? (Junior)**
   *Javob:* HTML ichida JavaScript kodini yozish uchun ishlatiladigan teg.

9. **Interpreter tili nima degani? (Middle)**
   *Javob:* JS kodi qatorma-qatar o'qiladi va darhol bajariladi (kompilyatsiya qilinmaydi).

10. **Brendan Eich kim? (Junior)**
    *Javob:* JavaScript tilining asoschisi (1995-yil).

11. **Matnlarni birlashtirish. (Junior - Amaliy)**
    *Vazifa:* "Salom" va "Dunyo" so'zlarini bitta \`console.log\`da birlashtiring.

12. **Alert() va Console.log() farqi? (Junior)**
    *Javob:* Alert ekranda oyna chiqaradi, Console.log esa faqat ichki konsolda ko'rinadi.

---

## 7. CHALLENGE 🏆
Konsolga o'zingiz haqingizda 3 ta ma'lumotni (ism, yosh, shahar) alohida \`console.log\`larda chiqaring. Keyin bitta \`console.error\` bilan "Tugadi" deb yozing.

---

## 8. XULOSA
Endi siz:
1. JavaScript nima ekanini bilasiz.
2. Brauzer konsolida kod yozishni o'rgandingiz.
3. Ma'lumotlarni ekranga chiqarishni qila olasiz.
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi Salom",
      instruction: "Konsolga 'Salom JS' matnini chiqaring.",
      startingCode: "// Kodingizni shu yerga yozing\n",
      hint: 'console.log("Salom JS");',
      test: "if (logs.includes('Salom JS')) return null; return 'Konsolga \"Salom JS\" deb yozishingiz kerak';"
    }
  ]
};

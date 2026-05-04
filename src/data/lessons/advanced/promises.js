export const promises = {
  id: "promises",
  title: "Promises (Va'dalar)",
  level: "Murakkab",
  description: "Asinxron amallarni tartibga solish: va'da berish va uni bajarish haqida.",
  theory: `
# Promises – Bu nima va nima uchun kerak?

**Promise** — bu asinxron operatsiyaning kelajakdagi natijasi (yoki xatosi) uchun ishlatiladigan obyektdir. Oddiy qilib aytganda, bu JSdagi "va'da".

## 1. NEGA kerak?
Eski usulda (callbacklar bilan) asinxron ishlar ichma-ich kirib ketib, "Callback Hell" (Piramida) muammosini yaratar edi. Promiselar esa kodni zanjir ko'rinishida yozishga va xatolarni bitta joyda (catch) ushlashga imkon beradi.

## 2. SODDALIK (Analogiya)
Buni restorandagi **pult** (buzzer) deb tasavvur qiling:
1. Siz ovqat buyurtma qilasiz (Asinxron amal boshlandi).
2. Sizga pult berishadi (Bu — **Promise**). U hozircha jim (**Pending**).
3. Ovqat tayyor bo'lsa, pult yonadi (**Fulfilled/Resolve**).
4. Agar ovqat qolmagan bo'lsa, pult qizil yonadi yoki ofitsiant kelib uzr so'raydi (**Rejected**).

## 3. STRUKTURA

### A. Promise holatlari
- **Pending:** Kutilmoqda (natija hali yo'q).
- **Fulfilled (Resolved):** Muvaffaqiyatli yakunlandi.
- **Rejected:** Xatolik bilan yakunlandi.

### B. Ishlatish usuli (.then, .catch)
\`\`\`javascript
const vadda = new Promise((resolve, reject) => {
  let success = true;
  if (success) resolve("Bajarildi! ✅");
  else reject("Xato! ❌");
});

vadda
  .then(res => console.log(res)) // Muvaffaqiyat bo'lsa
  .catch(err => console.log(err)) // Xato bo'lsa
  .finally(() => console.log("Tugadi")); // Har doim
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const wait = (ms) => new Promise(res => setTimeout(res, ms));
wait(2000).then(() => console.log("2 soniya o'tdi!"));
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **.catch()ni unutish:** Agar promise reject bo'lsa va sizda \`.catch()\` bo'lmasa, brauzerda qizil xato chiqadi (\`Uncaught in Promise\`).
2. **Promise ichida returnni unutish:** Chaining (zanjir) qilayotganda keyingi \`.then()\`ga ma'lumot o'tishi uchun oldingisida \`return\` bo'lishi shart.

## 6. SAVOLLAR (12 ta)
1. Promise nima?
2. Promisening 3 ta holatini ayting.
3. \`resolve\` va \`reject\` funksiyalari nima uchun kerak?
4. \`.then()\` qachon ishlaydi?
5. \`.catch()\` qachon ishlaydi?
6. \`.finally()\` metodi nima vazifani bajaradi?
7. Callback Hell va Promise farqi nimada?
8. \`Promise.all()\` nima ish qiladi?
9. \`Promise.race()\` nima ish qiladi?
10. \`Promise.resolve("OK")\` nima qaytaradi?
11. Promise ichida boshqa promise ishlatish mumkinmi?
12. Promise asinxronlikni qanday tartibga soladi?`,
  exercises: [
    {
      id: 1,
      title: "Promise mashqi",
      instruction: "Darhol resolve('Salom') bo'ladigan promise yozing va uni .then orqali chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "Promise.resolve('Salom').then(console.log);",
      test: "if (code.includes('then')) return null; return 'then ishlating';"
    }
  ]
};

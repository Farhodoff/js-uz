export const promises = {
  id: "promises",
  title: "Promises (Va'dalar)",
  level: "Murakkab",
  description: "Asinxron amallarni tartibga solish: va'da berish va uni bajarish haqida.",
  theory: `## 1. NEGA kerak?
Eski usulda (callbacklar bilan) asinxron ishlar ichma-ich kirib ketib, "Callback Hell" (Piramida) muammosini yaratar edi. Promiselar esa kodni chiroyli zanjir ko'rinishida yozishga, xatolarni bitta joyda (catch) ushlashga va asinxronlikni boshqarishga imkon beradi.

## 2. SODDALIK (Analogiya)
Buni restorandagi **pult** (buzzer) deb tasavvur qiling:
1. Siz ovqat buyurtma qilasiz (Asinxron amal boshlandi).
2. Sizga pult berishadi (Bu — **Promise**). U hozircha jim (**Pending**).
3. Ovqat tayyor bo'lsa, pult yonadi (**Fulfilled / Resolved**).
4. Agar ovqat qolmagan bo'lsa, pult qizil yonadi (**Rejected**).

## 3. STRUKTURA

### A. Promise holatlari
- **Pending:** Kutilmoqda (natija hali yo'q).
- **Fulfilled:** Muvaffaqiyatli yakunlandi (natija bor).
- **Rejected:** Xatolik bilan yakunlandi.

### B. Yaratish va Ishlatish
\`\`\`javascript
const va'da = new Promise((resolve, reject) => {
  const hammasiYaxshimi = true;
  if (hammasiYaxshimi) {
    resolve("Muvaffaqiyat! ✅");
  } else {
    reject("Xatolik! ❌");
  }
});

va'da
  .then(natija => console.log(natija)) // Resolve bo'lganda
  .catch(xato => console.error(xato))  // Reject bo'lganda
  .finally(() => console.log("Tugadi")); // Har doim
\`\`\`

### C. Bir nechta Promiselar (Static Methods)
- **Promise.all([p1, p2]):** Hammasi tugashini kutadi. Bittasi xato bo'lsa, hammasi to'xtaydi.
- **Promise.allSettled([p1, p2]):** Hammasi tugashini kutadi (xato bo'lsa ham).

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **.catch() ni unutish:** Agar Promise reject bo'lsa va uni ushlamasangiz, brauzerda qizil xato (\`Uncaught in Promise\`) chiqadi.
2. **Zanjirda returnni unutish:** \`.then()\` ichida \`return\` yozmasangiz, keyingi \`.then()\` ga ma'lumot (undefined bo'lib) o'tmaydi.
3. **Mavjud Promiseni yangidan yaratish:** Agar funksiya allaqachon Promise qaytarsa (masalan, \`fetch\`), uni \`new Promise\` ichiga o'rash shart emas.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. Promise nima?</summary>
Asinxron operatsiyaning kelajakdagi natijasini ifodalovchi maxsus obyekt.
</details>

<details>
<summary>2. Promisening 3 ta holatini ayting.</summary>
Pending (kutilayotgan), Fulfilled (bajarilgan), Rejected (rad etilgan).
</details>

<details>
<summary>3. resolve va reject funksiyalari nima vazifani bajaradi?</summary>
\`resolve\` — asinxron amal muvaffaqiyatli bo'lganini bildiradi, \`reject\` — xatolikni bildiradi.
</details>

<details>
<summary>4. .then() metodi qachon ishga tushadi?</summary>
Promise holati \`fulfilled\` (muvaffaqiyatli) bo'lganda.
</details>

<details>
<summary>5. .catch() qachon ishga tushadi?</summary>
Promise holati \`rejected\` bo'lganda yoki \`.then\` ichida xato yuz berganda.
</details>

<details>
<summary>6. .finally() metodining vazifasi nima?</summary>
Natija qanday bo'lishidan qat'i nazar, amal oxirida tozalash ishlarini bajarish uchun.
</details>

<details>
<summary>7. Callback Hell nima?</summary>
Asinxron kodlarning haddan tashqari ichma-ich kirib ketishi natijasida kodning "piramida" shakliga kelib qolishi va o'qish qiyinlashishi.
</details>

<details>
<summary>8. Promise.all() nima ish bajaradi?</summary>
Massivdagi barcha promiselar muvaffaqiyatli tugashini kutadi va natijalarni massiv qilib qaytaradi.
</details>

<details>
<summary>9. Promise.race() nima?</summary>
Massivdagi promiselardan qaysi biri birinchi bo'lib tugasa (resolve yoki reject), o'shaning natijasini qaytaradi.
</details>

<details>
<summary>10. Promisni qanday qilib darhol resolve qilsa bo'ladi?</summary>
\`Promise.resolve(qiymat)\` orqali.
</details>

<details>
<summary>11. Bir nechta .then() metodlarini bir-biriga ulash mumkinmi?</summary>
Ha, bu "Promise Chaining" (zanjir) deb ataladi.
</details>

<details>
<summary>12. Promise asinxronlikni qanday tartibga soladi?</summary>
U asinxron kodni boshqarish uchun standartlashtirilgan interfeys va oqim nazoratini ta'minlaydi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Promise yaratish",
      instruction: "3 soniyadan keyin 'OK' qaytaradigan yangi Promise yarating va natijani .then orqali chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "new Promise(res => setTimeout(() => res('OK'), 3000)).then(console.log);",
      test: "if (code.includes('new Promise') && code.includes('then')) return null; return 'Promise va then ishlatilmadi';"
    },
    {
      id: 2,
      title: "Darhol resolve",
      instruction: "Promise.resolve() ishlatib 'Tez' matnini konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "Promise.resolve('Tez').then(l => console.log(l));",
      test: "if (logs.includes('Tez')) return null; return 'Tez matni chiqmadi';"
    },
    {
      id: 3,
      title: "Xatoni ushlash",
      instruction: "Promise.reject('Xato') ni ushlab (catch) konsolga 'Ushlandi' deb chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "Promise.reject('Xato').catch(() => console.log('Ushlandi'));",
      test: "if (logs.includes('Ushlandi')) return null; return 'catch ishlatilmadi';"
    }
  ]
};

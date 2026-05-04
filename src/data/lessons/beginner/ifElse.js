export const ifElseLesson = {
  id: "if-else",
  title: "Shartli Operatorlar: if...else va switch",
  theory: `## 1. NEGA kerak?
Shartlarsiz dastur shunchaki ketma-ket buyruqlar to'plami bo'lib qoladi. Shartlar esa dasturni "aqlli" qiladi, u vaziyatga qarab o'z qarorlarini o'zgartiradi.

## 2. SODDALIK (Analogiya)
Buni **svetoforga** o'xshatish mumkin:
- **Agar (if)** chiroq yashil bo'lsa — yur.
- **Aks holda (else)** — to'xta.

## 3. STRUKTURA

### A. if...else
\`\`\`javascript
let yosh = 20;
if (yosh >= 18) {
  console.log("Ruxsat berildi ✅");
} else {
  console.log("Ruxsat yo'q ❌");
}
\`\`\`

### B. switch (Tanlov operatori)
Agar bitta o'zgaruvchini ko'p qiymatlarga solishtirish kerak bo'lsa (\`if else if else if...\` o'rniga), \`switch\` qulayroq:
\`\`\`javascript
let kun = "Dushanba";
switch (kun) {
  case "Dushanba":
    console.log("Ish kuni");
    break;
  case "Yakshanba":
    console.log("Dam olish kuni");
    break;
  default:
    console.log("Oddiy kun");
}
\`\`\`

### C. Ternary operator (Qisqa if)
\`\`\`javascript
let xabar = (yosh >= 18) ? "Katta" : "Kichik";
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Solishtirish o'rniga qiymat berish:** \`if (x = 5)\` xato ❌. Doim \`===\` ishlatiladi: \`if (x === 5)\`.
2. **break ni unutish:** \`switch\` ichida \`break\` yozmasangiz, JS keyingi \`case\`larni ham bajarib ketaveradi.
3. **Truthy/Falsy:** JavaScriptda \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\` doim **false** (falsy) deb hisoblanadi. Qolgan hamma narsa **true** (truthy).

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. Shartli operator nima uchun kerak?</summary>
Dasturga mantiq qo'shish va vaziyatga qarab har xil kodlarni ishga tushirish uchun.
</details>

<details>
<summary>2. if so'zining ma'nosi nima?</summary>
Inglizchadan "Agar" degan ma'noni anglatadi.
</details>

<details>
<summary>3. else qachon ishga tushadi?</summary>
\`if\` ichidagi shart noto'g'ri (false) bo'lgan holatda.
</details>

<details>
<summary>4. else if nima vazifani bajaradi?</summary>
Asosiy \`if\` sharti bajarilmaganda, boshqa bir aniq shartni tekshirish uchun.
</details>

<details>
<summary>5. Ternary operator qanday tuzilgan?</summary>
\`shart ? rost bo'lsa : yolg'on bo'lsa\`
</details>

<details>
<summary>6. Bir nechta shartni birlashtirish belgilarini ayting.</summary>
\`&&\` (VA), \`||\` (YOKI), \`!\` (EMAS).
</details>

<details>
<summary>7. switch operatorida default nima uchun kerak?</summary>
Hech bir \`case\` mos kelmagan holatda ishlaydigan kodni belgilash uchun.
</details>

<details>
<summary>8. Truthy va Falsy qiymatlar farqi nima?</summary>
Mantiqiy shart ichida o'zini \`true\` yoki \`false\` kabi tutadigan qiymatlar.
</details>

<details>
<summary>9. if ("") ishlaydimi?</summary>
Yo'q, chunki bo'sh matn - falsy qiymat.
</details>

<details>
<summary>10. switchda break yozmasak nima bo'ladi?</summary>
Kod keyingi \`case\`lar ichiga ham kirib ketadi (fall-through).
</details>

<details>
<summary>11. Shart ichida shart (Nested if) yozish mumkinmi?</summary>
Ha, lekin kod o'qilishini qiyinlashtirgani uchun ehtiyot bo'lish kerak.
</details>

<details>
<summary>12. switch va if...else o'rtasidagi asosiy farq nima?</summary>
\`if\` diapazonlar bilan (x > 10) yaxshi ishlaydi, \`switch\` esa aniq qiymatlar bilan (kun === "Dushanba").
</details>`,
  exercises: [
    {
      id: 1,
      title: "Yoshni tekshirish",
      instruction: "Agar 'age' 18 dan kichik bo'lsa 'Kichik', aks holda 'Katta' deb chiqaring.",
      startingCode: "let age = 15;\n// Bu yerga yozing\n",
      hint: "if (age < 18) { console.log('Kichik'); } else { console.log('Katta'); }",
      test: "if (logs.includes('Kichik')) return null; return 'Xato xabar chiqyapti';"
    },
    {
      id: 2,
      title: "Switch bilan kunlar",
      instruction: "O'zgaruvchi 'day' 1 bo'lsa 'Dushanba', 2 bo'lsa 'Seshanba' chiqaring (switch ishlatib).",
      startingCode: "let day = 1;\n// Bu yerga yozing\n",
      hint: "switch(day) { case 1: console.log('Dushanba'); break; ... }",
      test: "if (code.includes('switch') && logs.includes('Dushanba')) return null; return 'Switch-ni to\\'g\\'ri ishlating';"
    },
    {
      id: 3,
      title: "Ternary mashqi",
      instruction: "Ternary operator yordamida 'a' 0 dan katta bo'lsa 'Musbat', bo'lmasa 'Manfiy' deb chiqaring.",
      startingCode: "let a = 10;\n// Bu yerga yozing\n",
      hint: "console.log(a > 0 ? 'Musbat' : 'Manfiy');",
      test: "if (code.includes('?') && logs.includes('Musbat')) return null; return 'Ternary operatorni ishlating';"
    }
  ]
};

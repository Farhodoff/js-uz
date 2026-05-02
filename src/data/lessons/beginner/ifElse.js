export const ifElseLesson = {
  id: "if-else",
  title: "Shartli operatorlar (if...else)",
  level: "Beginner",
  description: "Dasturingizni 'fikrlashga' o'rgatamiz: shartga qarab har xil amallarni bajarish.",
  theory: `
# Shartli operatorlar – Bu nima va nima uchun kerak?

Dasturlashda qaror qabul qilish juda muhim. Masalan, saytga kirayotgan foydalanuvchidan: "Agar paroling to'g'ri bo'lsa — kir, aks holda — xato ko'rsat" deb so'rashimiz kerak. Buning uchun **if...else** ishlatiladi.

## 1. NEGA kerak?
Shartlarsiz dastur shunchaki ketma-ket buyruqlar to'plami bo'lib qoladi. Shartlar esa dasturni "aqlli" qiladi, u vaziyatga qarab o'zgaradi.

## 2. SODDALIK (Analogiya)
Buni **svetoforga** o'xshatish mumkin:
- **Agar (if)** chiroq yashil bo'lsa — yur.
- **Aks holda (else)** — to'xta.

## 3. STRUKTURA

### A. Oddiy if...else
\`\`\`javascript
let yosh = 20;
if (yosh >= 18) {
  console.log("Sizga ruxsat berildi ✅");
} else {
  console.log("Siz hali kichiksiz ❌");
}
\`\`\`

### B. Bir nechta shartlar (else if)
\`\`\`javascript
let ball = 85;
if (ball >= 90) {
  console.log("Alochi");
} else if (ball >= 70) {
  console.log("Yaxshi");
} else {
  console.log("Yomon");
}
\`\`\`

### C. Qisqa usul (Ternary operator)
Bitta qatorda yozish uchun:
\`\`\`javascript
let res = (yosh >= 18) ? "Katta" : "Kichik";
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let harorat = 35;
if (harorat > 30) {
  console.log("Bugun juda issiq! ☀️");
} else {
  console.log("Bugun havo zo'r! ☁️");
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Solishtirish o'rniga berish:** \`if (x = 5)\` deb yozish — bu xato ❌. Doim \`==\` yoki \`===\` ishlating: \`if (x === 5)\`.
2. **Qavslarni unutish:** \`if x > 5\` deb yozib bo'lmaydi, shart doim \`( )\` ichida bo'lishi shart.

## 6. SAVOLLAR (12 ta)
1. Shartli operator nima uchun kerak?
2. \`if\` so'zining ma'nosi nima?
3. \`else\` qachon ishga tushadi?
4. \`else if\` nima vazifani bajaradi?
5. Ternary operator (\`? :\`) qanday tuzilgan?
6. Bir nechta shartni birlashtirish uchun qaysi belgilar ishlatiladi (\`&&\`, \`||\`)?
7. \`if (10 > 5)\` natijasi nima bo'ladi?
8. Truthy va Falsy qiymatlar farqi nima?
9. \`if ("")\` ishlaydimi? (Falsy)
10. \`if (" ")\` ishlaydimi? (Truthy)
11. Shart ichida shart (Nested if) yozish mumkinmi?
12. \`switch\` va \`if...else\` o'rtasidagi asosiy farq nima?`,
  exercises: [
    {
      id: 1,
      title: "Yoshni tekshirish",
      instruction: "Agar 'age' 18 dan kichik bo'lsa 'Kichik', aks holda 'Katta' deb chiqaring.",
      startingCode: "let age = 15;\n// Bu yerga yozing\n",
      hint: "if (age < 18) { console.log('Kichik'); } else { ... }",
      test: "if (logs.includes('Kichik')) return null; return 'Noto\\'g\\'ri xabar chiqdi!';"
    }
  ]
};

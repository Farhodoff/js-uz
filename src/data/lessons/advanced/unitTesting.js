export const unitTesting = {
  id: "a22",
  title: "Unit Testing: Professional Tekshiruv",
  theory: `## 1. KIRISH
Tasavvur qiling, siz bank dasturida "pul o'tkazish" funksiyasini o'zgartirdingiz. Hammasi ishlashiga qanday kafolat berasiz? Har safar qo'lda tekshirib chiqasizmi? Yo'q! Buning uchun bizga avtomatlashtirilgan testlar kerak.

## 2. CHUQUR TUSHUNCHALAR

### AAA Pattern (Standard) ⭐
Professional testlar 3 qismdan iborat bo'ladi:
1. **Arrange** (Tayyorlash): Test uchun kerakli ma'lumotlarni yaratish.
2. **Act** (Bajarish): Funksiyani ishga tushirish.
3. **Assert** (Tasdiqlash): Natija kutilganidek ekanini tekshirish.

### Testing Pyramid
- **Unit Tests**: Alohida funksiyalarni tekshirish (Eng ko'p va tezkor).
- **Integration Tests**: Bir nechta modullar birgalikda ishlashini tekshirish.
- **E2E Tests**: Butun saytni foydalanuvchi ko'zi bilan tekshirish (Eng sekin).

---

## 3. KOD MISOLLARI

### Misol 1 — Oddiy Assert funksiyasi
Professional kutubxonalar (\`Jest\`, \`Vitest\`) bo'lmaganda, test shunday ko'rinadi:
\`\`\`javascript
function sum(a, b) {
  return a + b;
}

// TEST:
const natija = sum(2, 2);
if (natija !== 4) {
  throw new Error("Testdan o'tmadi: 2+2=4 bo'lishi kerak edi");
}
console.log("Test muvaffaqiyatli ✅");
\`\`\`

### Misol 2 — Jest/Vitest uslubida test yozish
\`\`\`javascript
test("sum funksiyasi sonlarni qo'shishi kerak", () => {
  // Arrange
  const a = 10, b = 20;
  
  // Act
  const natija = sum(a, b);
  
  // Assert
  expect(natija).toBe(30);
});
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Testing Pyramid
\`\`\`mermaid
graph TD
    A[E2E: Saytni to'liq tekshirish] --- B[Integration: Modullar bog'liqligi]
    B --- C[Unit: Alohida funksiyalar]
    style C fill:#a8c88a,stroke:#333
    style B fill:#e5b84f,stroke:#333
    style A fill:#e07b5a,stroke:#333
\`\`\`
*Piramida asosi (Unit tests) qancha mustahkam bo'lsa, dastur shuncha stabil bo'ladi.*

---

## 5. INTERVYU SAVOLLARI
1. **Unit test nima?** - Dasturning eng kichik bo'lagini (funksiya yoki klass) boshqa qismlardan ajratilgan holda tekshirish.
2. **TDD (Test Driven Development) nima?** - Kod yozishdan oldin test yozish metodologiyasi.
3. **Mocking nima?** - Test paytida tashqi bog'liqliklarni (masalan, API so'rovlarni) soxta ma'lumotlar bilan almashtirish.

---

## 6. MINI LOYIHA: "Custom Expect Utility"
**Vazifa:** O'zingizning kichik \`expect\` funksiyangizni yozing.

\`\`\`javascript
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(\`Xato: Kutilgan qiymat \${expected}, lekin \${actual} keldi\`);
      }
      console.log("Testdan o'tdi ✅");
    }
  };
}

// Ishlatib ko'ramiz:
const formatCurrency = (val) => \`$\${val}\`;
expect(formatCurrency(100)).toBe("$100");
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Unit Test yozish",
      instruction: "Berilgan 'isAdult' funksiyasi uchun test yozing. U 18 yosh uchun 'true' qaytarishini tekshiring.",
      startingCode: "const isAdult = (age) => age >= 18;\n\n// Test yozing\n// Kutilgan natija true bo'lishi kerak\n",
      hint: "if (isAdult(18) !== true) throw new Error('Xato');",
      test: "if (code.includes('isAdult(18)')) return null; return 'isAdult funksiyasini 18 bilan tekshiring';"
    }
  ]
};

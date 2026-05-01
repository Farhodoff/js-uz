export const functions = {
  id: "b4",
  title: "Funksiya asoslari",
  theory: `## 1. FUNKSIYA NIMA?
Funksiya — bu bir marta yozib, ko'p marta ishlatish mumkin bo'lgan kod bloki. Uni "ishchi" deb tasavvur qiling: siz unga topshiriq berasiz, u bajaradi va natijani qaytaradi.

### Nega kerak?
1. **Takrorlanishni oldini oladi (DRY - Don't Repeat Yourself):** Bir xil kodni qayta-qayta yozmaysiz.
2. **Tartib:** Kodni kichik, tushunarli bo'laklarga bo'ladi.
3. **Parametrlar:** Funksiyaga turli ma'lumotlar yuborib, turlicha natija olish mumkin.

---

## 2. FUNKSIYA TUZILISHI

### Declaring (E'lon qilish)
\`\`\`javascript
function salomBer(ism) {
  return "Salom " + ism + "!";
}
\`\`\`

### Calling (Chaqirish)
\`\`\`javascript
let xabar = salomBer("Ali");
console.log(xabar); // → "Salom Ali!"
\`\`\`

\`\`\`mermaid
graph LR
    A[Input: Argument] --> B(Function)
    B --> C[Output: Return Value]
    style B fill:#f9f,stroke:#333,stroke-width:2px
\`\`\`

---

## 3. PARAMETR VS ARGUMENT
- **Parametr:** Funksiya yaratilganda qavs ichida yozilgan o'zgaruvchi (xuddi quti kabi).
- **Argument:** Funksiya chaqirilganda o'sha qutiga solingan real qiymat.

---

## 4. return KALIT SO'ZI ⭐
Funksiya ichida \`return\` bajarilganda, funksiya o'z ishini to'xtatadi va natijani tashqariga chiqarib beradi. Agar \`return\` yozilmasa, funksiya \`undefined\` qaytaradi.

---

## 5. INTERVYU SAVOLLARI (Junior)

1. **return va console.log farqi nima?**
   *Javob:* \`console.log\` shunchaki ekranga chiqaradi. \`return\` esa qiymatni funksiyadan tashqariga qaytaradi, uni o'zgaruvchiga saqlash mumkin.

2. **Parametrsiz funksiya bo'lishi mumkinmi?**
   *Javob:* Ha, masalan \`function sayHi() { console.log("Hi"); }\`.

3. **Arrow function nima?**
   *Javob:* Bu funksiya yozishning qisqaroq va zamonaviy usuli (keyingi darslarda chuqurroq o'rganamiz).`,
  exercises: [
    {
      id: 1,
      title: "Yig'indi funksiyasi",
      instruction: "Ikkita sonni (a va b) qabul qilib, ularning yig'indisini qaytaruvchi (return) 'sum' funksiyasini yozing.",
      startingCode: "function sum(a, b) {\n  // Bu yerda natijani qaytaring\n}\n\nconsole.log(sum(5, 10));",
      hint: "return a + b;",
      test: "if (logs.includes('15')) return null; return '5 + 10 natijasi 15 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Kvadrat hisoblagich",
      instruction: "Bitta son qabul qilib, uning kvadratini qaytaruvchi 'kvadrat' funksiyasini yozing.",
      startingCode: "// Funksiyani shu yerda yarating\n\nconsole.log(kvadrat(4));",
      hint: "function kvadrat(n) { return n * n; }",
      test: "if (logs.includes('16')) return null; return '4 ning kvadrati 16 bo\\'lishi kerak';"
    }
  ]
};
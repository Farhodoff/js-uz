export const closuresDeepDive = {
  id: "a20",
  title: "Closures Deep Dive: Private State",
  theory: `## 1. KIRISH
"Closure nima?" savoliga javobni ko'pchilik biladi, lekin "Closuredan qachon foydalanamiz?" savoli seniorlik darajasini belgilaydi. Closure shunchaki nazariya emas, u **Data Privacy** (ma'lumotlar xavfsizligi) uchun eng kuchli qurol.

## 2. CHUQUR TUSHUNCHALAR

### Lexical Environment
Funksiya yaratilgan joydagi o'zgaruvchilarni "ko'ra olish" qobiliyati. Closure - bu funksiyaning o'zi bilan birga uning muhitini (variables) ham olib yurishi.

### Private State (Shaxsiy holat)
JavaScriptda uzoq vaqt \`private\` kalit so'zi bo'lmagan. Closure yordamida biz o'zgaruvchilarni tashqaridan o'zgartirib bo'lmaydigan, faqat maxsus funksiyalar orqali boshqariladigan holatga keltira olamiz.

---

## 3. KOD MISOLLARI

### Misol 1 — Private Counter (Modul) ⭐
**Maqsad:** O'zgaruvchini tashqi dunyodan himoya qilish.
\`\`\`javascript
function createBankCard() {
  let balans = 0; // Private variable

  return {
    pulQoshish(summa) {
      if (summa > 0) balans += summa;
    },
    balansniKorish() {
      return \`Sizning balansingiz: \${balans} so'm\`;
    }
  };
}

const karta = createBankCard();
karta.pulQoshish(100000);
console.log(karta.balansniKorish()); // → 100000
console.log(karta.balans); // → undefined (himoyalangan!)
\`\`\`

### Misol 2 — Function Factory
\`\`\`javascript
function createMultiplier(factor) {
  return function(num) {
    return num * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(10)); // → 20
console.log(triple(10)); // → 30
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Closure "Qutisi"
\`\`\`
┌─── Function Factory (Tashqi) ──────────┐
│  factor = 2                            │
│                                        │
│  ┌─── Closure (Ichki Funksiya) ──────┐  │
│  │  Tashqaridagi 'factor'ni          │  │
│  │  o'zi bilan olib ketadi           │  │
│  └───────────────────────────────────┘  │
└────────────────────────────────────────┘
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Closurening real hayotdagi foydasi?** - Ma'lumotlarni yashirish (encapsulation) va funksiyalarni sozlash (currying/factory functions).
2. **Closure xotiraga zarar beradimi?** - Ha, agar noto'g'ri ishlatilsa, xotirada ortiqcha o'zgaruvchilarni ushlab turishi mumkin (Memory Leak).
3. **IIFE va Closure bog'liqligi?** - IIFE closure yordamida "private scope" yaratishning eng qadimgi usuli hisoblanadi.

---

## 6. MINI LOYIHA: "Secret Message Store"
**Vazifa:** Faqat maxfiy kod bilan o'qish mumkin bo'lgan xabar saqlagich yarating.

\`\`\`javascript
function secretStore(initialMessage) {
  let message = initialMessage;
  
  return (code) => {
    if (code === "1234") return message;
    return "Xato kod!";
  };
}

const mySecret = secretStore("Yashirin xabar!");
console.log(mySecret("0000")); // → Xato kod!
console.log(mySecret("1234")); // → Yashirin xabar!
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Private variable",
      instruction: "Closure yordamida 'name'ni saqlaydigan va uni faqat 'getName()' orqali qaytaradigan funksiya yozing.",
      startingCode: "function person(initialName) {\n  let name = initialName;\n  // return qiling\n}",
      hint: "return { getName: () => name };",
      test: "const p = person('Ali'); if (p.getName() === 'Ali') return null; return 'getName() funksiyasi name-ni qaytarishi kerak';"
    }
  ]
};

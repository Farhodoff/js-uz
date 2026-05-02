export const spreadRest = {
  id: "spread-rest",
  title: "Spread va Rest (...) - Yoyish va Yig'ish",
  level: "Intermediate",
  description: "Ma'lumotlarni Lego bo'laklaridek oson boshqarish: yoyish va yig'ish operatorlari.",
  theory: `
# Spread va Rest – Bu nima va nima uchun kerak?

Sintaksis jihatidan ikkalasi ham uchta nuqta (\`...\`) bilan yoziladi, lekin vazifasi butunlay boshqa-boshqa.

## 1. NEGA kerak?
Tasavvur qiling, sizda ikkita massiv bor va ularni birlashtirmoqchisiz. Eski usulda \`.concat()\` ishlatish yoki sikl aylantirish kerak edi. Spread/Rest bilan esa bu bir necha soniyalik ish.

## 2. SODDALIK (Analogiya)
- **Spread (Yoyish):** Bu xuddi sumkani ichidagilarni stolga to'kib yuborishga o'xshaydi. Hamma narsa yoyilib chiqadi.
- **Rest (Yig'ish):** Bu esa stol ustidagi hamma narsani sumkaga solib, og'zini yopishga o'xshaydi. Hamma narsa bir joyga yig'iladi.

## 3. STRUKTURA

### A. Spread: Massiv va Obyektlarni yoyish
\`\`\`javascript
// Massivlarni birlashtirish
const m1 = [1, 2];
const m2 = [3, 4];
const yangi = [...m1, ...m2]; // [1, 2, 3, 4]

// Obyektdan nusxa olish
const user = { name: "Ali", age: 25 };
const copy = { ...user, city: "Tashkent" };
\`\`\`

### B. Rest: Funksiya parametrlarida yig'ish
Rest har doim oxirida keladi va qolgan hamma argumentlarni massivga aylantiradi:
\`\`\`javascript
function sum(birinchi, ...qolganlar) {
  console.log(birinchi); // 1
  console.log(qolganlar); // [2, 3, 4, 5] (Massiv)
}
sum(1, 2, 3, 4, 5);
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const mevalar = ["olma", "anor"];
const hammasi = ["behi", ...mevalar, "uzum"];
console.log(hammasi); // ["behi", "olma", "anor", "uzum"]
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Rest o'rtada kelishi:** \`function x(...a, b)\` — Xato! ❌ Rest har doim oxirgi parametr bo'lishi shart.
2.  **Shallow Copy:** Spread obyektdan nusxa olganda, ichidagi ichki obyeklarni (nested objects) nusxalamaydi, shunchaki bog'lanish (reference) beradi.

## 6. SAVOLLAR (12 ta)
1. Spread operatori nima ish qiladi?
2. Rest operatori nima ish qiladi?
3. Ikkalasining yozilishida farq bormi?
4. Funksiya parametrida \`...args\` ishlatilsa, \`args\` qanday turdagi ma'lumot bo'ladi?
5. Spread yordamida ikkita obyekni qanday birlashtirish mumkin?
6. Rest operatorini funksiya parametrining boshida ishlatsa bo'ladimi?
7. Stringni (\`"Salom"\`) spread qilsak nima bo'ladi?
8. \`Math.max(...[1, 5, 2])\` natijasi nima bo'ladi?
9. Obyektdan nusxa olishda spreadning qanday kamchiligi bor?
10. Destructuring'da rest operatorini ishlatish misolini keltiring.
11. \`arguments\` obyekti va Rest parametrning farqi nima?
12. Spread iterable bo'lmagan obyektlarda ishlaydimi?`,
  exercises: [
    {
      id: 1,
      title: "Spread mashqi",
      instruction: "Spread yordamida 'arr1' va 'arr2'ni 'combined' massiviga birlashtiring.",
      startingCode: "const arr1 = [1, 2];\nconst arr2 = [3, 4];\n// Bu yerga yozing\nconst combined = [];",
      hint: "const combined = [...arr1, ...arr2];",
      test: "if (combined.length === 4) return null; return 'Massivlar birlashmadi';"
    }
  ]
};

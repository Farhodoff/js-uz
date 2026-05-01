export const spreadRest = {
  id: "m2",
  title: "Spread va Rest (...) - Yoyish va Yig'ish",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, sizda ikkita yarimta pizza (massiv) bor. Ularni bitta butun pizza qutisiga solmoqchisiz. Har bir bo'lakni bittalab tashib yurasizmi?

**Spread** (\`...\`) — pizzani qutisidan chiqarib, hamma bo'laklarini yangi qutiga "yoyib" yuboradi.
**Rest** (\`...\`) — stoldagi hamma pizza bo'laklarini bitta qutiga "yig'ib" oladi.

---

## 2. SPREAD: YOYISH (Tushuntir → Ko'rsat → Bajartir)
Spread operatori massiv yoki obyekt ichidagilarni tashqariga chiqarib yuboradi.

**Ko'rsat:**
\`\`\`javascript
const p1 = [1, 2];
const p2 = [3, 4];
const butun = [...p1, ...p2]; // [1, 2, 3, 4]
\`\`\`

**Mashq:** O'zingizda bor \`mevalar\` massiviga yangi massivni Spread orqali qo'shing.

---

## 3. REST: YIG'ISH
Rest asosan funksiya parametrlarida ishlatiladi va qolgan barcha argumentlarni massivga yig'adi.

**Ko'rsat:**
\`\`\`javascript
function menyu(asosiy, ...qo'shimcha) {
  console.log("Asosiy:", asosiy);
  console.log("Qolganlar:", qo'shimcha); // Massiv bo'ladi
}
menyu("Osh", "Salat", "Choy", "Non");
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR ⚠️
1.  **Rest o'rtada kela olmaydi:** \`function x(a, ...b, c)\` — Xato! ❌ Rest har doim oxirida bo'lishi shart.
2.  **Obyektni massivga yoyish:** \`const arr = [...obj]\` — Xato! ❌ Obyekt faqat obyekt ichiga yoyiladi.

---

## 5. BUZIB KO'RISH 🧐
**Obyektdan nusxa olganda (Spread), ichidagi obyektlar nima bo'ladi?**
\`\`\`javascript
const user = { name: "Ali", settings: { theme: "dark" } };
const clone = { ...user };
clone.settings.theme = "light";
console.log(user.settings.theme); // "light" -> Bu "Shallow Copy" deyiladi!
\`\`\`
**Xulosa:** Spread faqat birinchi qavatni nusxalaydi, ichkaridagilar baribir bitta manzilga qarab qoladi.

---

## 6. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **Spread va Rest farqi? (Junior)**
   *Javob:* Spread — yoyadi, Rest — yig'adi. Sintaksis bir xil, ishlatish joyi har xil.

2. **Massivdan nusxa olish (Clone). (Junior - Amaliy)**
   *Vazifa:* \`const copy = [...original]\` orqali nusxa oling.

3. **Math.max() bilan spread. (Junior - Amaliy)**
   *Vazifa:* Massivdagi eng katta sonni toping: \`Math.max(...arr)\`.

4. **Obyektlarni birlashtirish. (Junior - Amaliy)**
   *Vazifa:* \`obj1\` va \`obj2\` ni birlashtiring. Keyinroq yozilgani bir xil kalitlarni yangilaydi.

5. **Stringni massivga aylantirish. (Junior)**
   *Javob:* \`[..."Salom"]\` -> ["S", "a", "l", "o", "m"].

6. **Rest parametr turi nima bo'ladi? (Junior)**
   *Javob:* Har doim massiv (Array).

7. **Deep Clone (Chuqur nusxa) qanday qilinadi? (Middle)**
   *Javob:* \`structuredClone(obj)\` yoki \`JSON.parse(JSON.stringify(obj))\` orqali.

8. **Destructuring bilan Rest ishlatish. (Middle - Amaliy)**
   *Vazifa:* \`const [bir, ...qolgan] = [1,2,3]\` qiling.

9. **Arguments va Rest farqi? (Middle)**
   *Javob:* \`arguments\` — massivga o'xshash obyekt (metodlari yo'q), \`Rest\` — haqiqiy massiv.

10. **Dinamik propertylarni o'chirish (Rest yordamida). (Middle - Amaliy)**
    *Vazifa:* Obyektdan \`password\`ni ajratib, qolgan hamma narsani \`cleanUser\`ga yig'ing.

11. **Noma'lum sondagi sonlarni qo'shish. (Junior - Amaliy)**
    *Vazifa:* Rest parametr ishlatib \`sum(...nums)\` funksiyasini yozing.

12. **Spread operatori Iterable obyektlarda ishlaydimi? (Middle)**
    *Javob:* Ha, Array, String, Map, Set kabi barcha iterablelarda ishlaydi.

---

## 7. CHALLENGE 🏆
Bitta funksiya yozing, u cheksiz miqdorda sonlarni qabul qilsin. Funksiya ichida birinchi sonni "ko'paytiruvchi" sifatida ishlating, qolgan hamma sonlarni esa o'sha ko'paytiruvchiga ko'paytirib, yangi massiv qaytaring.

---

## 8. XULOSA
Siz endi ma'lumotlarni xuddi Lego bo'laklaridek yoyishni va yig'ishni bilasiz!
`,
  exercises: [
    {
      id: 1,
      title: "Massivlarni birlashtirish",
      instruction: "Spread yordamida 'a' va 'b' massivlarini 'c' massiviga birlashtiring.",
      startingCode: "const a = [1, 2];\nconst b = [3, 4];\nconst c = // Bu yerga yozing\n",
      hint: "[...a, ...b]",
      test: "if (result?.length === 4) return null; return 'Massivlar birlashmadi';"
    },
    {
      id: 2,
      title: "Rest bilan yig'ish",
      instruction: "Noma'lum sondagi sonlarni massivga yig'adigan funksiya parametrini yozing.",
      startingCode: "function collect(...args) {\n  return args;\n}\n",
      hint: "...args",
      test: "if (collect(1,2).length === 2) return null; return 'Rest ishlamadi';"
    }
  ]
};

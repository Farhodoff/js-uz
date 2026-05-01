export const equalityAlgorithms = {
  id: "b20",
  title: "Object.is() va Tenglik algoritmlari",
  theory: `## 1. KIRISH
JavaScriptda qiymatlarni solishtirishning bir necha usuli va orqasida turgan algoritmlar mavjud. Siz allaqachon \`==\` va \`===\` ni bilasiz. Endi qo‘shimcha: **\`Object.is()\`** va **SameValue**, **SameValueZero** algoritmlari haqida o'rganamiz.

## 2. Object.is() – Eng aniq tenglik
\`Object.is(v1, v2)\` ES6 da qo‘shilgan. U \`===\` ga o‘xshaydi, lekin ikkita muhim farq bor:
- **NaN bilan ishlash**: \`Object.is(NaN, NaN)\` → \`true\` (\`===\` da false)
- **-0 va +0 bilan ishlash**: \`Object.is(-0, +0)\` → \`false\` (\`===\` da true)

\`\`\`javascript
console.log(NaN === NaN);         // false
console.log(Object.is(NaN, NaN)); // true

console.log(-0 === +0);           // true
console.log(Object.is(-0, +0));   // false
\`\`\`

---

## 3. TENGLIK ALGORITMLARI JADVALI

| Algoritm | Ishlatiladigan joy | Misol |
|----------|-------------------|-------|
| **Abstract Equality** | \`==\` | \`5 == "5"\` → true |
| **Strict Equality** | \`===\`, \`indexOf\` | \`NaN === NaN\` → false |
| **SameValue** | \`Object.is()\` | \`Object.is(-0, +0)\` → false |
| **SameValueZero** | \`Map\`, \`Set\`, \`includes\` | \`[NaN].includes(NaN)\` → true |

### SameValueZero nima uchun muhim? ⭐
\`Map\` va \`Set\` ichki qismda **SameValueZero** ishlatadi. Bu algoritmda \`NaN\` o'ziga teng deb hisoblanadi, lekin \`-0\` va \`+0\` teng deb olinadi.

\`\`\`javascript
let set = new Set();
set.add(NaN);
set.add(NaN);
console.log(set.size); // 1 (chunki NaN takrorlanmaydi)
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

### Nazariy (Junior)
1. **Object.is() nima va u === dan qanday farq qiladi?** - U SameValue algoritmini ishlatadi. Farqi: NaN ni o'ziga teng deb biladi va -0 bilan +0 ni farqlaydi.
2. **Nima uchun Map va Set da -0 va +0 bir xil kalit hisoblanadi?** - Chunki ular SameValueZero ishlatadi, bu algoritmda ular teng.

### Amaliy (Middle) ⭐
**Savol:** \`Array.prototype.indexOf\` va \`Array.prototype.includes\` farqi nimada?
**Javob:** \`indexOf\` Strict Equality (\`===\`) ishlatadi, shuning uchun massiv ichidagi \`NaN\` ni topa olmaydi. \`includes\` esa SameValueZero ishlatadi va \`NaN\` ni topa oladi.
`,
  exercises: [
    {
      id: 1,
      title: "NaN solishtirish",
      instruction: "Object.is() yordamida ikkita NaN qiymatini solishtiring va natijani ko'ring.",
      startingCode: "// Object.is bilan NaN ni tekshiring\n",
      hint: "console.log(Object.is(NaN, NaN));",
      test: "if (logs.includes('true')) return null; return 'true chiqishi kerak';"
    },
    {
      id: 2,
      title: "Set va NaN",
      instruction: "Set yarating va unga ikki marta NaN qo'shing. Set o'lchamini (size) ko'ring.",
      startingCode: "const s = new Set();\n// NaN qo'shing\nconsole.log(s.size);",
      hint: "s.add(NaN); s.add(NaN);",
      test: "if (logs.includes('1')) return null; return 'Set o\\'lchami 1 bo\\'lishi kerak';"
    }
  ]
};

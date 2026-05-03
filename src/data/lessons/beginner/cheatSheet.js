export const cheatSheet = {
  id: "cheat-sheet",
  title: "⚡ JS Cheat Sheet (Tezkor ma'lumotnoma)",
  theory: `## JavaScript Tezkor Ma'lumotnoma

Bu sahifada eng ko'p ishlatiladigan sintaksislar jamlangan.

### 1. O'zgaruvchilar
| Kalit so'z | Scope | O'zgarish |
|---|---|---|
| \`var\` | Function | Ha |
| \`let\` | Block | Ha |
| \`const\` | Block | Yo'q |

### 2. Ma'lumot turlari
- **Primitive**: String, Number, Boolean, Null, Undefined, Symbol, BigInt
- **Reference**: Object, Array, Function

### 3. Massiv Metodlari
- \`push()\` / \`pop()\` - oxiridan qo'shish/olish
- \`shift()\` / \`unshift()\` - boshidan olish/qo'shish
- \`map()\` - o'zgartirib yangi massiv beradi
- \`filter()\` - saralab yangi massiv beradi

### 4. Funktsiyalar
\`\`\`javascript
// Oddiy funktsiya
function sayHi(name) {
  return "Salom " + name;
}

// Arrow funktsiya (ES6)
const sayHi = (name) => \`Salom \${name}\`;
\`\`\`

### 5. Shartlar
\`\`\`javascript
if (age > 18) {
  console.log("Kattasiz");
} else {
  console.log("Kichiksiz");
}

// Ternary operator
const status = age > 18 ? "Katta" : "Kichik";
\`\`\``,
  exercises: [
    {
      id: 1,
      title: "Bilimlarni sinash",
      instruction: "O'zingiz haqingizda ma'lumot beruvchi 'me' obyektini yarating (name, age) va consolega chiqaring.",
      startingCode: "// Kodni shu yerga yozing\n",
      hint: "const me = { name: 'Ali', age: 20 }; console.log(me);",
      test: "if (!code.includes('{') || !code.includes('}')) return 'Obyekt yarating'; if (!logs.length) return 'Consolega chiqaring';"
    }
  ]
};

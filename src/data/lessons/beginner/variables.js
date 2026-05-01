export const variables = {
  id: "b1",
  title: "O'zgaruvchilar: var, let, const",
  theory: `## var, let, const – o‘zgaruvchilar e’lon qilish farqlari

JavaScriptda o‘zgaruvchilarni e’lon qilishning 3 usuli bor: \`var\`, \`let\`, \`const\`. Har biri **scope**, **hoisting**, **qayta tayinlash** va **qayta e’lon qilish** jihatidan farq qiladi.

### O'zgaruvchilarning ko'rinish doirasi (Scope)

\`\`\`mermaid
graph TD
    A[O'zgaruvchi Turlari] --> B(var)
    A --> C(let)
    A --> D(const)
    B --> B1[Function Scope]
    C --> C1[Block Scope {}]
    D --> D1[Block Scope {}]
    B1 --> B2[Hoisting: undefined]
    C1 --> C2[Hoisting: TDZ]
    D1 --> D2[Hoisting: TDZ]
\`\`\`

### 1. var (Eski usul)
- **Scope**: Funktsiya darajasida.
- **Hoisting**: Yuqoriga ko'tariladi, lekin qiymati \`undefined\`.
- **Qayta e'lon qilish**: Mumkin.

### 2. let & const (Zamonaviy usul)
- **Scope**: Blok darajasida \`{}\`.
- **TDZ**: Temporal Dead Zone tufayli e'lon qilinishidan oldin ishlatib bo'lmaydi.
- **const**: Qiymatini o'zgartirib bo'lmaydi (lekin obyekt ichini o'zgartirsa bo'ladi).

| Xususiyat | var | let | const |
|-----------|-------|-------|---------|
| Scope | Funktsiya | Blok | Blok |
| Hoisting | undefined | TDZ | TDZ |
| Qayta e’lon | Ha | Yo‘q | Yo‘q |
| Qayta tayinlash | Ha | Ha | Yo‘q |`,
  exercises: [
    {
      id: 1,
      title: "var bilan ishlash",
      instruction: "var yordamida 'name' o'zgaruvchisini e'lon qiling va unga 'JavaScript' qiymatini bering. Keyin uni console.log qiling.",
      startingCode: "// Kodni shu yerga yozing\n",
      hint: "var name = 'JavaScript';",
      test: "if (!code.includes('var')) return 'var kalit so\\'zidan foydalaning'; if (!logs.includes('JavaScript')) return 'Consolega \"JavaScript\" chiqishi kerak';"
    },
    {
      id: 2,
      title: "let va Block Scope",
      instruction: "Blok ichida ({ }) let bilan 'age' o'zgaruvchisini yarating. Blokdan tashqarida unga murojaat qilib ko'ring va xatoni kuzating.",
      startingCode: "{\n  // let age = 25;\n}\n// console.log(age);",
      hint: "let faqat {} ichida yashaydi.",
      test: "if (!code.includes('let')) return 'let ishlatishingiz kerak'; if (!code.includes('{') || !code.includes('}')) return 'Blok {} ishlating';"
    },
    {
      id: 3,
      title: "const va Obyektlar",
      instruction: "const bilan 'user' obyektini yarating. Uning 'name' xususiyatini o'zgartiring.",
      startingCode: "const user = { name: 'Ali' };\n// Ismni o'zgartiring\nconsole.log(user.name);",
      hint: "user.name = 'Vali' deb yozishingiz mumkin.",
      test: "if (!logs.length) return 'Consolega chiqaring'; if (logs[0] === 'Ali') return 'Ism o\\'zgarmadi';"
    }
  ]
};

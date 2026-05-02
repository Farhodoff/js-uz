export const blockScopeLesson = {
  id: "block-scope",
  title: "Blok doirasi (Block Scope)",
  level: "Beginner",
  description: "Jingalak qavslar { } ichida e'lon qilingan o'zgaruvchilarning siri.",
  theory: `
# Block Scope – Bu nima va nima uchun kerak?

**Block Scope** — bu jingalak qavslar \`{ }\` ichida e'lon qilingan o'zgaruvchilarning faqat shu qavslar ichida ko'rinishidir. Bu asosan \`if\`, \`for\` yoki \`switch\` bloklariga tegishli.

## 1. NEGA kerak?
Tasavvur qiling, sizda \`if\` sharti bor va uning ichida vaqtinchalik bir hisob-kitob qilyapsiz. Bu vaqtinchalik o'zgaruvchi shart tugagandan keyin kerak emas. Block scope yordamida biz o'sha o'zgaruvchini blokdan tashqariga "chiqarib yubormaslik" imkoniga egamiz. Bu xotirani tejaydi va tartibsizlikni oldini oladi.

## 2. SODDALIK (Analogiya)
Jingalak qavslarni \`{ }\` bir **qafas** deb tasavvur qiling. \`let\` va \`const\` bu qafas ichidagi qushlardir. Ular qafasdan tashqariga uchib chiqolmaydi. \`var\` esa — bu "arvoh", u devorlar va qafaslardan bemalol o'tib ketadi (shuning uchun u xavfli).

## 3. STRUKTURA

### A. let va const (Blokni tan oladi)
\`\`\`javascript
if (true) {
  let qush = "Bulbul";
  console.log(qush); // Blok ichida ko'rinadi ✅
}
console.log(qush); // Xato! ❌ (Qush qafasdan chiqolmaydi)
\`\`\`

### B. var (Blokni tan olmaydi)
\`\`\`javascript
if (true) {
  var arvoh = "Kasper";
}
console.log(arvoh); // "Kasper" ✅ (Blokdan chiqib ketdi!)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
{
  let x = 10;
  const y = 20;
  var z = 30;
}
console.log(z); // 30
// console.log(x); // Xato!
// console.log(y); // Xato!
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Loop ichida var ishlatish:** \`for\` loop ichida \`var i\` ishlatsangiz, u loop tugagandan keyin ham globalda qolib ketadi va boshqa kodlarni buzishi mumkin.
2. **E'lon qilish:** Blok ichida yaratilgan o'zgaruvchini blokdan tashqarida ishlatishga urinish.

## 6. SAVOLLAR (12 ta)
1. Block Scope nima?
2. Qaysi belgilar blokni bildiradi?
3. \`let\` va \`const\` blok doirasiga kiradimi?
4. \`var\` blok doirasiga kiradimi?
5. Nima uchun \`var\` xavfli hisoblanadi?
6. \`if\` blokidan tashqarida uning ichidagi \`let\` o'zgaruvchisini ishlatsa nima bo'ladi?
7. \`for\` loop ichida \`let\` ishlatish nima uchun yaxshi?
8. Bo'sh jingalak qavslar \`{ }\` ham alohida scope yaratadimi?
9. Global scope va Block scope farqi nima?
10. Blok ichida blok (Nested blocks) bo'lishi mumkinmi?
11. Ichki blok tashqi blok o'zgaruvchisini ko'radimi?
12. Tashqi blok ichki blok o'zgaruvchisini ko'radimi?`,
  exercises: [
    {
      id: 1,
      title: "Blok testi",
      instruction: "Blok { } oching, uning ichida 'x' o'zgaruvchisini yarating va tashqarida uni ishlatib xato oling.",
      startingCode: "// { } oching\n",
      hint: "{ let x = 5; } console.log(x);",
      test: "if (output.includes('ReferenceError')) return null; return 'Xato chiqishi kerak edi!';"
    }
  ]
};

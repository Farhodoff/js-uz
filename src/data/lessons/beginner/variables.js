export const variables = {
  id: "b1",
  title: "O'zgaruvchilar: var, let, const",
  theory: `## var, let, const – o‘zgaruvchilar e’lon qilish farqlari

JavaScriptda o‘zgaruvchilarni e’lon qilishning 3 usuli bor: \`var\`, \`let\`, \`const\`. Har biri **scope**, **hoisting**, **qayta tayinlash** (reassignment) va **qayta e’lon qilish** (redeclaration) jihatidan farq qiladi.

### 1. var (ES5 dan beri mavjud)
- **Scope**: Funktsiya darajasida (function-scoped). Blok \`{}\` ichida e’lon qilingan \`var\` tashqaridan ham ko‘rinadi.
- **Hoisting**: E’lon qilish yuqoriga ko‘tariladi, qiymati \`undefined\` bo‘ladi.
- **Qayta e’lon qilish**: Mumkin (xato bermaydi).
- **Qayta tayinlash**: Mumkin.

\`\`\`javascript
var x = 10;
var x = 20; // qayta e’lon qilish mumkin
x = 30;     // qayta tayinlash mumkin

if (true) {
  var y = 5;
}
console.log(y); // 5 (blokdan tashqarida ham bor)
\`\`\`

### 2. let (ES6, 2015)
- **Scope**: Blok darajasida (block-scoped) – \`{}\` ichida e’lon qilingan faqat o‘sha blokda mavjud.
- **Hoisting**: E’lon qilish yuqoriga ko‘tariladi, lekin **Temporal Dead Zone (TDZ)** tufayli e’lon qilinishidan oldin ishlatilsa \`ReferenceError\` beradi.
- **Qayta e’lon qilish**: **Mumkin emas** (bir xil scope’da).
- **Qayta tayinlash**: Mumkin.

### 3. const (ES6)
- \`let\` ga o‘xshaydi, lekin **qayta tayinlash** mumkin emas.
- E’lon qilinganda darhol qiymat berilishi shart.
- Agar qiymat **obyekt** yoki **massiv** bo‘lsa, uning **ichidagi** xususiyatlarni o‘zgartirish mumkin (referens o‘zgarmaydi).

### Qiyosiy jadval

| Xususiyat | var | let | const |
|-----------|-------|-------|---------|
| Scope | Funktsiya | Blok | Blok |
| Hoisting | Ha (undefined) | Ha (TDZ) | Ha (TDZ) |
| Qayta e’lon | Ha | Yo‘q | Yo‘q |
| Qayta tayinlash | Ha | Ha | Yo‘q |
| Boshlang‘ich qiymat | Shart emas | Shart emas | **Shart** |

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **var, let, const orasidagi asosiy farq nima?**
2. **Hoisting nima? var va let hoistingda qanday farq qiladi?**
3. **const bilan e’lon qilingan obyektning xususiyatini o‘zgartirish mumkinmi?**

### Middle daraja
4. **Temporal Dead Zone (TDZ) nima?**
5. **IIFE nima uchun ishlatilgan? Hozirgi kunda let/const bilan uni qanday almashtirish mumkin?**
6. **Global obyektga (window) qanday o‘zgaruvchilar birikadi?**`,
  task: `// 1. var yordamida o'zgaruvchi e'lon qiling va uni qayta e'lon qilib ko'ring.
// 2. let bilan blok ichida ({}) o'zgaruvchi yarating va blokdan tashqarida unga murojaat qiling. Natijani ko'ring.
// 3. const bilan obyekt yarating va uning biror xususiyatini o'zgartiring. Keyin butun obyektni yangi qiymatga almashtirishga urunib ko'ring.
// 4. Temporal Dead Zone xatosini keltirib chiqaruvchi kod yozing.
// 5. for tsiklida var va let ishlatib, setTimeout bilan farqini kuzating (Junior/Middle topshiriq).

// Kodingizni shu yerga yozing`,
  hint: `// 1. var qayta e'lon qilish
var test = "birinchi";
var test = "ikkinchi"; // Muammo yo'q

// 2. let scope
{
  let hidden = "sir";
}
// console.log(hidden); // ReferenceError

// 3. const mutability
const car = { model: "Tesla" };
car.model = "BYD"; // Mumkin
// car = {}; // TypeError

// 4. TDZ
// console.log(a); // ReferenceError
let a = 10;

// 5. Closure & Loop
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("let:", i), 100); // 0, 1, 2
}
for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log("var:", j), 100); // 3, 3, 3
}`
};

export const globalScopeLesson = {
  id: "b11",
  title: "Global Scope (Global doira)",
  theory: `## Global Scope – JavaScriptning eng tashqi darajasi

Global scope’da e’lon qilingan o‘zgaruvchi, funksiya yoki obyekt **dasturning istalgan joyidan** kirish mumkin.

### Global Scope turlari:
1. **Brauzer muhiti** – global obyekt \`window\` (yoki \`globalThis\`).
2. **Node.js muhiti** – global obyekt \`global\`.

### 1. Global Scope’da o‘zgaruvchi e’lon qilish
\`\`\`javascript
var globalVar = "var bilan global";
let globalLet = "let bilan global";

function showGlobals() {
  console.log(globalVar);   // ishlaydi
  console.log(globalLet);   // ishlaydi
}
\`\`\`

### Global obyektga birikish (brauzerda):
- \`var\` bilan e’lon qilingan global o‘zgaruvchi \`window\` obyektiga birikadi.
- \`let\` va \`const\` bilan e’lon qilinganlar **birikmaydi**.

### 2. Global Scope xatarlari
1. **Nom to‘qnashuvi** – turli fayllardagi o‘zgaruvchilar bir-birini ustiga yozishi mumkin.
2. **Kodni qayta ishlatish qiyin** – funksiyalar global o‘zgaruvchilarga bog‘lanib qoladi.
3. **Xatolarni topish qiyin** – global o‘zgaruvchini qayerda o‘zgartirilganini kuzatish qiyin.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Global scope nima?**
2. **Brauzerda global obyekt qanday nomlanadi?**
3. **var va let bilan e’lon qilingan global o‘zgaruvchilar farqi?**

### Middle daraja
4. **globalThis nima va u qachon foydali?**
5. **Strict mode ("use strict") global scope’ga qanday ta’sir qiladi?**
6. **Namespace pattern nima uchun ishlatiladi?**`,
  task: `// 1. var va let yordamida global o'zgaruvchilar yarating va ularni window obyekti orqali ko'rishga harakat qiling.
// 2. Global o'zgaruvchini funksiya ichida o'zgartiring va funksiyadan tashqarida uning qiymatini tekshiring.
// 3. E'lon qilinmagan o'zgaruvchiga qiymat bering (masalan, x = 100). U globalga aylanadimi? (strict mode yo'qligida tekshiring).
// 4. Namespace pattern: Bitta asosiy obyekt yarating (masalan, APP_DATA) va barcha global o'zgaruvchilarni uning ichida saqlang.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Global window
var a = "Men windowdaman";
let b = "Men windowda emasman";
// console.log(window.a); // "Men windowdaman"
// console.log(window.b); // undefined

// 2. Global pollution risk
let userName = "Ali";
function changeName() {
  userName = "Vali"; 
}
changeName();
console.log(userName); // "Vali"

// 4. Namespace Pattern
const MY_APP = {
  config: { lang: "uz" },
  user: { id: 1, name: "Farhod" }
};`
};

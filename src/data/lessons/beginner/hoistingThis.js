export const hoistingThisLesson = {
  id: "b13",
  title: "Hoisting: JSning 'ko'z yugurtirish' siri",
  theory: `## 1. KIRISH
JavaScript — o'ta "aqlli" til. U kodni o'qishni boshlashdan oldin, xuddi imtihonga kirishdan oldin varaqqa **ko'z yugurtirgandek**, hamma o'zgaruvchi va funksiyalarni qidirib chiqadi. Bu jarayon **Hoisting** (ko'tarilish) deb ataladi.

## 2. TUSHUNCHA

### Sodda ta'rif
Hoisting - bu JavaScript kodni ishga tushirishdan oldin hamma e'lonlarni (declarations) kodning eng tepasiga ko'chirib qo'yishidir.

### Real hayot o'xshashlik
Siz ovqat pishirmoqchisiz. Retseptni o'qishdan oldin hamma kerakli narsalarni (tuz, piyoz, go'sht) stol ustiga **tayyorlab qo'yasiz**. JS ham e'lonlarni shunday tayyorlab oladi.

---

## 3. QOIDALAR (Nima qanday ko'tariladi?)

### 1. var: "Borman, lekin bo'shman"
\`var\` bilan e'lon qilingan o'zgaruvchi tepaga ko'tariladi, lekin uning ichi bo'sh (\`undefined\`) bo'ladi.
\`\`\`javascript
console.log(a); // → undefined
var a = 10;
\`\`\`

### 2. let va const: "O'lik hudud" (TDZ)
Bular ham ko'tariladi, lekin JS ularni "ishlatish taqiqlangan" deb belgilab qo'yadi. E'lon qilingan qatorga yetmaguningizcha ishlatsangiz, dastur "o'ladi" (error).

### 3. Funksiyalar: "To'liq tayyor"
Oddiy funksiyalar tepaga to'liq ko'chadi. Uni e'lon qilishdan oldin ham ishlatsa bo'ladi.
\`\`\`javascript
salom(); // → "Salom!" ishlaydi ✅
function salom() { console.log("Salom!"); }
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Kod va JSning ko'zi
\`\`\`
Siz yozgan kod:          JS o'qigan kod:
------------------      ------------------
                        var a; // Hoisted!
console.log(a);   -->   console.log(a); // undefined
var a = 5;              a = 5;
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Hoisting nima?** - E'lonlarning kod tepasiga ko'tarilishi.
2. **Temporal Dead Zone (TDZ) nima?** - \`let\` va \`const\` e'lon qilinmaguncha ularni ishlatib bo'lmaydigan vaqt/hudud.
3. **Funksiyalar qanday hoist bo'ladi?** - To'liq hoist bo'ladi (tanasi bilan).

---

## 6. MINI LOYIHA: "Hoisting Test"
**Vazifa:** Quyidagi kod nima chiqarishini taxmin qiling va keyin muharrirda tekshiring.

\`\`\`javascript
var x = "Salom";

function test() {
  console.log(x); // undefined yoki "Salom"?
  var x = "Xayr";
}

test();
\`\`\`
*Javob: undefined chiqadi. Chunki funksiya ichidagi 'x' hoist bo'lib, tashqaridagisini yopib qo'yadi.*
`,
  exercises: [
    {
      id: 1,
      title: "Funksiya hoisting",
      instruction: "Funksiyani u e'lon qilinishidan oldin chaqiring.",
      startingCode: "// 1. Bu yerda chaqiring\n\n// 2. Bu yerda e'lon qiling\n",
      hint: "sayHi(); function sayHi() { ... }",
      test: "if (logs.length > 0) return null; return 'Funksiyani chaqiring va biror narsa chiqaring';"
    }
  ]
};

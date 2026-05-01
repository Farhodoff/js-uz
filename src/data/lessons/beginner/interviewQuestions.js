export const interviewQuestionsBeginner = {
  id: "q1",
  title: "🟢 Interview Savollar (Boshlang'ich)",
  theory: `## Kirish
Bu sahifa JavaScriptdan junior lavozimiga tayyorlanayotganlar uchun mo'ljallangan. 
Intervyuda muvaffaqiyat qozonish uchun quyidagilarga e'tibor bering:
1. **Asoslarni biling:** Faqat kod yozish emas, tushuntira olish muhim.
2. **Kodni ovoz chiqarib tushuntiring:** Fikrlash jarayoningizni ko'rsating.
3. **Edge caselarni o'ylang:** Masalan, null yoki undefined kelsa nima bo'ladi?

---

## NAZARIY SAVOLLAR

### 1. var, let va const o'rtasidagi farq nima? ⭐
**Qiyinlik:** 🟢 Oson | **Mavzu:** O'zgaruvchilar

<details>
<summary>📖 Javob</summary>

**Qisqa javob:**
\`var\` - function scope, hoistingda \`undefined\` bo'ladi. \`let\` va \`const\` - block scope, hoistingda TDZ ga tushadi. \`const\` ga qayta qiymat berib bo'lmaydi.

**Batafsil:**
Zamonaviy JavaScriptda (ES6+) faqat \`let\` va \`const\` ishlatish tavsiya etiladi. \`var\` ning muammosi - u bloklarni (\`if\`, \`for\`) tan olmaydi va kutilmagan xatolarga sabab bo'ladi.

**Kod misoli:**
\`\`\`javascript
if (true) {
  var x = 10;
  let y = 20;
}
console.log(x); // 10
console.log(y); // ReferenceError
\`\`\`
</details>

### 2. == va === farqi nima? ⭐
**Qiyinlik:** 🟢 Oson | **Mavzu:** Operatorlar

<details>
<summary>📖 Javob</summary>

**Qisqa javob:**
\`==\` (double equals) faqat qiymatni solishtiradi, \`===\` (triple equals) esa qiymatni ham, ma'lumot turini ham tekshiradi.

**Misol:**
\`\`\`javascript
5 == "5"  // true
5 === "5" // false
\`\`\`
</details>

### 3. Closure nima? ⭐
**Qiyinlik:** 🟡 O'rta | **Mavzu:** Scope

<details>
<summary>📖 Javob</summary>

**Qisqa javob:**
Funksiyaning o'zi e'lon qilingan muhitdagi o'zgaruvchilarni "eslab qolishi" closure deyiladi.

**Batafsil:**
Ichki funksiya tashqi funksiya tugaganidan keyin ham uning o'zgaruvchilariga murojaat qila olsa, bu closure yordamida amalga oshadi.

**Kod misoli:**
\`\`\`javascript
function tashqi() {
  let sanoq = 0;
  return function() {
    sanoq++;
    return sanoq;
  }
}
const counter = tashqi();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`
</details>

---

## AMALIY SAVOLLAR

### 1. Palindromni tekshirish
**Qiyinlik:** 🟢 Oson | **Vaqt:** 5 daqiqa

**Topshiriq:** Berilgan so'z chapdan ham, o'ngdan ham bir xil o'qiladimi? (masalan: "non", "radar")

<details>
<summary>✅ Namuna yechim</summary>

\`\`\`javascript
function isPalindrom(word) {
  const reversed = word.split('').reverse().join('');
  return word === reversed;
}

console.log(isPalindrom("radar")); // true
console.log(isPalindrom("salom")); // false
\`\`\`
</details>

### 2. Massivdagi eng katta sonni toping
**Qiyinlik:** 🟢 Oson | **Vaqt:** 5 daqiqa

<details>
<summary>✅ Namuna yechim</summary>

\`\`\`javascript
// Usul 1: Math.max
const max1 = Math.max(...[1, 5, 3]);

// Usul 2: for sikli
function findMax(arr) {
  let max = arr[0];
  for(let n of arr) {
    if(n > max) max = n;
  }
  return max;
}
\`\`\`
</details>

---

## BU KOD NIMA CHIQARADI?

### Savol #1: Hoisting
\`\`\`javascript
console.log(a);
var a = 10;
\`\`\`
- A) 10
- B) ReferenceError
- C) undefined ✅
- D) null

**Sababi:** \`var\` e'loni tepaga ko'tariladi (hoisting), lekin qiymati o'sha satrda qoladi. Shuning uchun log vaqtida u bor, lekin qiymati hali \`undefined\`.
`,
  exercises: [
    {
      id: 1,
      title: "Bilimni sinash",
      instruction: "Closure yaratuvchi funksiya yozing. U har chaqirilganda 'JS' so'ziga bitta '!' qo'shib qaytarsin.",
      startingCode: "function createExciter() {\n  let text = 'JS';\n  return function() {\n    // bu yerda text ni o'zgartiring\n    return text;\n  }\n}",
      hint: "text += '!';",
      test: "const ex = createExciter(); if (ex() === 'JS!' && ex() === 'JS!!') return null; return 'Ketma-ket chaqirilganda ! qo\\'shilishi kerak';"
    }
  ]
};

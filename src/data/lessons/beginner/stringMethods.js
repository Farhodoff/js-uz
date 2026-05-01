export const stringMethods = {
  id: "b15",
  title: "String (Matn) metodlari",
  theory: `## 1. KIRISH
Dasturlashda matnlar (Strings) bilan ishlash juda ko'p uchraydi. Masalan, foydalanuvchi ismining bosh harfini katta qilish, paroldagi bo'shliqlarni olib tashlash yoki email ichida "@" belgisi borligini tekshirish.

## 2. TUSHUNCHA

### Sodda ta'rif
String metodlari - bu matnlar ustida turli amallar bajarish (qirqish, o'zgartirish, qidirish) uchun tayyor funksiyalardir.

### Real hayot o'xshashlik
Matn metodlarini **matn muharririga (Word)** o'xshatish mumkin: qidirish (Ctrl+F), o'zgartirish (Replace) yoki nusxa olish.

---

## 3. ASOSIY METODLAR

### Qidirish va Tekshirish
- \`includes("so'z")\`: Matn ichida qidirilayotgan so'z bormi? (true/false)
- \`startsWith("...")\`: Matn nima bilan boshlanadi?
- \`indexOf("a")\`: Belgining nechanchi o'rinda turganini aytadi.

### O'zgartirish (Transform)
- \`toUpperCase()\` / \`toLowerCase()\`: Hammasini KATTA yoki kichik harf qilish.
- \`trim()\`: Ikki chetdagi bo'shliqlarni o'chiradi.
- \`replace("eski", "yangi")\`: So'zni almashtiradi.

### Qirqish va Bo'lish
- \`slice(start, end)\`: Matnning bir qismini kesib oladi.
- \`split(" ")\`: Matnni massivga bo'lib beradi.

---

## 4. KOD MISOLLARI

### Misol 1 — Email tekshirish
\`\`\`javascript
const email = "  farkhod@gmail.com  ";
const cleanEmail = email.trim();

if (cleanEmail.includes("@")) {
  console.log("To'g'ri email");
}
// → To'g'ri email
\`\`\`

### Misol 2 — Ismni formatlash
\`\`\`javascript
let ism = "ali";
let formatlangan = ism[0].toUpperCase() + ism.slice(1);
console.log(formatlangan); // → "Ali"
\`\`\`

---

## 5. VIZUAL TUSHUNTIRISH
### .slice(0, 5) qanday ishlaydi?
\`\`\`
 Matn:  J  a  v  a  S  c  r  i  p  t
 Index: 0  1  2  3  4  5  6  7  8  9
        └───────────┘
          kesib olish
\`\`\`

---

## 6. INTERVYU SAVOLLARI
1. **Stringlar o'zgaruvchanmi (mutable)?** - Yo'q, JSda stringlar **immutable**. Metodlar originalni o'zgartirmaydi, yangi string qaytaradi.
2. **slice() va substring() farqi?** - \`slice()\` manfiy indexlar bilan ishlay oladi (orqadan sanash), \`substring()\` esa yo'q.

---

## 7. MINI LOYIHA: "Ism Tozalagich"
**Vazifa:** Foydalanuvchi kiritgan "  toshkentoV fArhoD  " matnini "Toshkentov Farhod" holatiga keltiring.

\`\`\`javascript
let xomMatn = "  toshkentoV fArhoD  ";
let toza = xomMatn.trim().toLowerCase();
let qismlar = toza.split(" ");

let natija = qismlar.map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
console.log(natija); // → "Toshkentov Farhod"
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: " includes() mashqi",
      instruction: "Matn ichida 'JS' so'zi borligini tekshiring va natijani chiqaring.",
      startingCode: "const text = 'Men JSni o\\'rganyapman';\n// Bu yerga yozing\n",
      hint: "text.includes('JS')",
      test: "if (logs.includes('true')) return null; return 'true chiqishi kerak';"
    }
  ]
};

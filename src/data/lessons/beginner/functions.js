export const functions = {
  id: "functions",
  title: "Funksiya asoslari",
  level: "Beginner",
  description: "Dasturning asosiy qurilish bloklari - kodni qayta ishlatish san'ati.",
  theory: `
# Funksiyalar – Bu nima va nima uchun kerak?

**Funksiya** — bu ma'lum bir vazifani bajaradigan kod bo'lagi. Uni bir marta yozib, istalgancha qayta ishlatish (chaqirish) mumkin.

## 1. NEGA kerak?
Tasavvur qiling, sizga 10 joyda ikki sonni qo'shish kerak. Agar funksiya bo'lmasa, har safar qo'shish kodini yozasiz. Agar xato bo'lsa, 10 joyni tuzatishga majbursiz. Funksiya bo'lsa, bir marta yozasiz va hamma joyda ishlatasiz.

## 2. SODDALIK (Analogiya)
Funksiyani **oshxona kombayni** deb tasavvur qiling:
- Siz unga narsalar (parametrlar) solasiz (masalan, mevalar).
- U ichida ish bajaradi (maydalaydi).
- Va sizga natija (return) qaytaradi (sharbat).

## 3. STRUKTURA

### A. Funksiya Deklaratsiyasi (Declaration)
Bu eng standart usul. Hoisting tufayli uni e'lon qilishdan oldin ham chaqirsa bo'ladi:
\`\`\`javascript
function salomBer(ism = "Mehmon") { // Ism - parametr
  return "Salom, " + ism; // Natija qaytarish
}
console.log(salomBer("Ali")); // "Ali" - argument
\`\`\`

### B. Funksiya Ifodasi (Expression)
Funksiyani o'zgaruvchiga saqlash. Bunda hoisting ishlamaydi:
\`\`\`javascript
const xayrlesh = function() {
  console.log("Xayr!");
};
xayrlesh();
\`\`\`

### C. Return qiymati
Agar funksiyada \`return\` yozilmasa, u avtomatik ravishda \`undefined\` qaytaradi. \`return\` funksiyani o'sha zahoti to'xtatadi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
function kvadrat(son) {
  return son * son;
}
let natija = kvadrat(5);
console.log(natija); // 25
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Returnni unutish:** Funksiya ichida hisob-kitob qilib, \`return\` yozmasangiz, natijani tashqarida ololmaysiz.
2. **Parametr va Argumentni adashtirish:** Parametr — funksiya yozilganda berilgan o'zgaruvchi nomi, Argument — funksiya chaqirilganda berilgan haqiqiy qiymat.

## 6. SAVOLLAR (12 ta)
1. Funksiya nima?
2. Funksiya deklaratsiyasi va ifodasi (expression) farqi nima?
3. Parametr nima?
4. Argument nima?
5. \`return\` kalit so'zi nima vazifani bajaradi?
6. Default parametr nima uchun kerak?
7. Funksiya ichida \`return\`dan keyin kod yozsa u ishlaydimi?
8. Funksiyani chaqirish (call/invoke) qanday bo'ladi?
9. Hoisting funksiyalarga qanday ta'sir qiladi?
10. Anonymous (nomsiz) funksiya nima?
11. Bitta funksiyada bir nechta \`return\` bo'lishi mumkinmi (shartlar bilan)?
12. Funksiya ichida boshqa funksiyani chaqirish mumkinmi?`,
  exercises: [
    {
      id: 1,
      title: "Sum mashqi",
      instruction: "Ikkita sonni qo'shib natijani qaytaradigan 'add' funksiyasini yozing.",
      startingCode: "function add(a, b) {\n  // Bu yerga yozing\n}",
      hint: "return a + b;",
      test: "if (typeof add !== 'function') return 'add funksiyasi topilmadi'; if (add(2, 3) === 5 && add(-1, 1) === 0) return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Kvadratni hisoblash",
      instruction: "Sonning kvadratini hisoblaydigan 'square' funksiyasini yozing.",
      startingCode: "function square(n) {\n  // Bu yerga yozing\n}",
      hint: "return n * n;",
      test: "if (typeof square !== 'function') return 'square funksiyasi topilmadi'; if (square(4) === 16 && square(0) === 0) return null; return 'Kvadrat noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 3,
      title: "Salomlashish",
      instruction: "Ismni qabul qilib, 'Salom, [ism]' matnini qaytaradigan 'greet' funksiyasini yozing.",
      startingCode: "function greet(name) {\n  // Bu yerga yozing\n}",
      hint: "return 'Salom, ' + name;",
      test: "if (typeof greet !== 'function') return 'greet funksiyasi topilmadi'; if (greet('Ali') === 'Salom, Ali') return null; return 'Matn noto\\'g\\'ri qaytarildi';"
    },
    {
      id: 4,
      title: "Eng katta son",
      instruction: "Ikkita sondan eng kattasini qaytaradigan 'max' funksiyasini yozing.",
      startingCode: "function max(a, b) {\n  // Bu yerga yozing\n}",
      hint: "if (a > b) return a; else return b;",
      test: "if (typeof max !== 'function') return 'max funksiyasi topilmadi'; if (max(10, 5) === 10 && max(3, 8) === 8) return null; return 'Eng katta son noto\\'g\\'ri topildi';"
    }
  ]
};

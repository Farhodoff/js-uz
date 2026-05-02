export const typeConversionLesson = {
  id: "type-conversion",
  title: "Turni o'zgartirish (Type Conversion)",
  level: "Beginner",
  description: "JavaScriptda ma'lumot turlarini biridan ikkinchisiga o'tkazishni o'rganamiz.",
  theory: `
# Turni o'zgartirish – Bu nima va nima uchun kerak?

JavaScriptda ba'zan bir turdagi ma'lumotni boshqa turga o'tkazish kerak bo'ladi. Masalan, foydalanuvchi saytda yoshini yozsa, u bizga **matn** bo'lib keladi, biz esa uni **son**ga aylantirib hisob-kitob qilishimiz kerak.

## 1. NEGA kerak?
Tasavvur qiling, sizda \`"5"\` (matn) va \`5\` (son) bor. Agar ularni qo'shsangiz:
\`"5" + 5 = "55"\` bo'lib qoladi.
Bizga esa natija \`10\` bo'lishi kerak. Buning uchun biz matnni songa o'tkazib olishimiz shart.

## 2. SODDALIK (Analogiya)
Buni **tarjimonlikka** o'xshatish mumkin. Ingliz tilidagi so'zni o'zbekchaga tarjima qilsangiz, ma'nosi bir xil qoladi, lekin shakli o'zgaradi. Ma'lumotlarni o'zgartirish ham shunday — qiymat o'sha-o'sha, faqat "kiyimi" (turi) o'zgaradi.

## 3. STRUKTURA (Qo'lda o'zgartirish - Explicit)

### A. String'ga o'tkazish (Matn qilish)
\`\`\`javascript
let son = 100;
let matn = String(son); // "100"
// yoki
let matn2 = son.toString(); // "100"
\`\`\`

### B. Number'ga o'tkazish (Son qilish)
\`\`\`javascript
let matn = "25";
let son = Number(matn); // 25
// Qisqa usuli (+)
let son2 = +matn; // 25
\`\`\`

### C. Boolean'ga o'tkazish (Mantiqiy qilish)
\`\`\`javascript
Boolean(1); // true
Boolean(0); // false
Boolean(""); // false (bo'sh matn - yolg'on)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let a = "10";
let b = "20";
console.log(Number(a) + Number(b)); // 30
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **NaN xatosi:** Agar matn ichida harf bo'lsa va uni songa o'tkazmoqchi bo'lsangiz, natija \`NaN\` chiqadi: \`Number("salom")\` — \`NaN\` ❌.
2. **Bo'sh joy:** \`Number("  ")\` natijasi \`0\` bo'ladi. Bu g'alati, lekin JS shunday ishlaydi.

## 6. SAVOLLAR (12 ta)
1. Turni o'zgartirish (Type Conversion) nima?
2. Nima uchun "5" + 5 natijasi 55 chiqadi?
3. Qo'lda (Explicit) va Avtomatik (Implicit) o'zgartirish farqi nima?
4. Sonni matnga o'tkazishning 2 ta usulini ayting.
5. Matnni songa o'tkazishning eng qisqa usuli qaysi (+)?
6. \`parseInt()\` va \`Number()\` farqi nimada?
7. \`Boolean(0)\` natijasi nima bo'ladi?
8. \`Boolean("0")\` natijasi nima bo'ladi? (Diqqat!)
9. Falsy (yolg'on) qiymatlarni sanab bering.
10. \`Number(null)\` natijasi nima bo'ladi?
11. \`Number(undefined)\` natijasi nima bo'ladi?
12. \`String(true)\` natijasi nima bo'ladi?`,
  exercises: [
    {
      id: 1,
      title: "Son qilish",
      instruction: "'str' o'zgaruvchisini songa o'tkazing va 'num' o'zgaruvchisiga saqlang.",
      startingCode: "let str = '123';\n// Bu yerga yozing\nlet num = ",
      hint: "let num = Number(str); yoki let num = +str;",
      test: "if (typeof num === 'number' && num === 123) return null; return 'Noto\\'g\\'ri o\\'tkazildi!';"
    }
  ]
};

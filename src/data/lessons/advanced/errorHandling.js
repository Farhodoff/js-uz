export const errorHandling = {
  id: "error-handling",
  title: "Xatolar bilan ishlash (try...catch)",
  level: "Murakkab",
  description: "Dasturingiz 'portlab' ketmasligi uchun xatolarni oldindan ushlash va boshqarish.",
  theory: `## 1. NEGA kerak?
Dasturlashda xatolar muqarrar. Muhimi — xato sodir bo'lganda butun sayt to'xtab qolmasligini ta'minlash. Masalan, foydalanuvchi noto'g'ri JSON yuborsa, sayt oq ekran bo'lib qolmasligi uchun \`try...catch\` kerak.

## 2. SODDALIK (Analogiya)
Buni **xavfsizlik kamari** deb tasavvur qiling. Siz mashina haydayapsiz (kod ishlayapti). Agar kutilmagan holat (xato) bo'lsa, xavfsizlik kamari (try...catch) sizni jarohatdan (dastur o'chib qolishidan) saqlab qoladi.

## 3. STRUKTURA

### A. try...catch...finally
- **try:** Xato bo'lishi mumkin bo'lgan kodni shu yerga yozamiz.
- **catch:** Agar \`try\` ichida xato bo'lsa, ushbu blok ishga tushadi.
- **finally:** Xato bo'lishi yoki bo'lmasligidan qat'iy nazar oxirida baribir ishlaydi.
\`\`\`javascript
try {
  let natija = 10 / x; // x topilmasa ReferenceError beradi
} catch (err) {
  console.log("Xato yuz berdi: " + err.message);
} finally {
  console.log("Amal yakunlandi.");
}
\`\`\`

### B. throw (Xatoni ataylab chiqarish)
Biz o'zimiz ham shartga ko'ra xato yaratishimiz mumkin:
\`\`\`javascript
function tekshir(yosh) {
  if (yosh < 0) {
    throw new Error("Yosh manfiy bo'lishi mumkin emas!");
  }
}
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Asinxron xatolar:** \`try...catch\` oddiy \`setTimeout\` ichidagi xatoni ushlay olmaydi. Buning uchun \`async/await\` bilan birga ishlatish kerak.
2. **Bo'sh catch:** Xatoni ushlab, uni hech narsasiz qoldirish yomon odat. Hech bo'lmasa \`console.error\` qilib xatoni ko'rsating.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. Error Handling nima?</summary>
Dasturda yuz berishi mumkin bo'lgan xatolarni nazorat qilish va ularga munosabat bildirish.
</details>

<details>
<summary>2. try bloki nima uchun kerak?</summary>
Xavfli bo'lishi mumkin bo'lgan kodni sinab ko'rish (test qilish) uchun.
</details>

<details>
<summary>3. catch bloki qachon ishga tushadi?</summary>
Faqat \`try\` bloki ichida biror xatolik yuz berganda.
</details>

<details>
<summary>4. finally blokining vazifasi nima?</summary>
Xato bo'lishidan qat'i nazar, masalan, faylni yopish yoki yuklanish indikatorini to'xtatish kabi amallar uchun.
</details>

<details>
<summary>5. throw kalit so'zi nima qiladi?</summary>
Dasturda ataylab xatolik (exception) hosil qiladi.
</details>

<details>
<summary>6. Error obyektining asosiy xususiyatlari qaysilar?</summary>
\`message\` (xato matni) va \`name\` (xato turi nomi).
</details>

<details>
<summary>7. Sintaksis xatolarini try...catch ushlay oladimi?</summary>
Yo'q, chunki sintaksis xatosi bo'lsa kod umuman ishga tushmaydi. U faqat "Runtime" (ishlash vaqtidagi) xatolarni ushlaydi.
</details>

<details>
<summary>8. ReferenceError va TypeError farqi nima?</summary>
\`ReferenceError\` — mavjud bo'lmagan o'zgaruvchiga murojaatda. \`TypeError\` — noto'g'ri turdagi qiymat ishlatilganda (masalan, songa funksiya kabi murojaat qilish).
</details>

<details>
<summary>9. try...catch asinxron kodda qanday ishlaydi?</summary>
\`async\` funksiya ichida \`await\` ishlatilganda xatolarni ushlashda juda samarali.
</details>

<details>
<summary>10. Catch ichidagi err o'zgaruvchisi nima?</summary>
Bu sodir bo'lgan xato haqidagi ma'lumotlarni o'zida saqlovchi obyekt.
</details>

<details>
<summary>11. Custom Error nima?</summary>
Dasturchi tomonidan yaratilgan, standart xatolardan tashqari maxsus xato sinflari.
</details>

<details>
<summary>12. Xatoni foydalanuvchiga qanday ko'rsatish ma'qul?</summary>
Texnik xatolarni konsolda qoldirib, foydalanuvchiga esa tushunarli matnli xabarlar ko'rsatish kerak.
</details>`,
  exercises: [
    {
      id: 1,
      title: "try-catch mashqi",
      instruction: "JSON.parse('salom') xatosini ushlang va konsolga 'Xato' deb chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "try { JSON.parse('salom'); } catch (e) { console.log('Xato'); }",
      test: "if (logs.includes('Xato')) return null; return 'Xato ushlanmadi';"
    },
    {
      id: 2,
      title: "Xatoni otish",
      instruction: "Agar 'age' 0 dan kichik bo'lsa, throw yordamida 'Xato' matnini qaytaring.",
      startingCode: "let age = -5;\n// Bu yerga yozing\n",
      hint: "if (age < 0) throw new Error('Xato');",
      test: "if (code.includes('throw')) return null; return 'throw ishlatilmadi';"
    }
  ]
};

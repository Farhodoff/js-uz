export const stringMethods = {
  id: "b10",
  title: "String Metodlari - Matnlar bilan sehrgarlik",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, foydalanuvchi ismini "  aLi  " deb yozdi. Sizga esa uni bazaga "Ali" ko'rinishida saqlash kerak. Matnning boshidagi bo'shliqlarni qanday o'chirasiz? Birinchi harfni qanday katta qilasiz?

**String Metodlari** — bu matnlar ustida turli "operatsiyalar" bajarish uchun tayyor asboblardir.

---

## 2. ASOSIY METODLAR (Tushuntir → Ko'rsat → Bajartir)

### A. Kattalashtirish va Kichiklashtirish
Matnni hamma harflarini katta yoki kichik qilish.

**Ko'rsat:**
\`\`\`javascript
const matn = "Salom Dunyo";
console.log(matn.toUpperCase()); // "SALOM DUNYO"
console.log(matn.toLowerCase()); // "salom dunyo"
\`\`\`

**Mashq:** Ismingizni hamma harfini kichik qilib konsolga chiqaring.

### B. Qirqib olish (slice)
Matnning ma'lum bir qismini kesib olish.

**Ko'rsat:**
\`\`\`javascript
const meva = "Olmaxon";
console.log(meva.slice(0, 4)); // "Olma" (0 dan boshlab 4-gacha, lekin 4 o'zi kirmaydi)
\`\`\`

**Mashq:** "JavaScript" so'zidan "Script" qismini kesib oling.

### C. Almashtirish (replace)
Matndagi so'zni boshqasiga almashtirish.

**Ko'rsat:**
\`\`\`javascript
const xabar = "Bugun havo issiq";
console.log(xabar.replace("issiq", "zo'r")); // "Bugun havo zo'r"
\`\`\`

---

## 3. KO'P UCHRAYDIGAN XATOLAR ⚠️

1.  **Asl matnni o'zgardi deb o'ylash:** String metodlari asl matnni o'zgartirmaydi, ular har doim **yangi matn** qaytaradi!
    \`\`\`javascript
    let name = "ali";
    name.toUpperCase();
    console.log(name); // Hali ham "ali"! ❌
    name = name.toUpperCase(); // Endi "ALI" ✅
    \`\`\`
2.  **Indeks adashtirish:** \`slice(1, 3)\` qilganda 3-indeksdagi harf kirmaydi.

---

## 4. BUZIB KO'RISH 🧐
**Nima bo'ladi agar \`slice()\` metodiga manfiy son bersak?**
\`\`\`javascript
const str = "Frontend";
console.log(str.slice(-3)); // "end"
\`\`\`
**Xulosa:** Manfiy son orqadan sanashni boshlaydi. Bu oxirgi harflarni olish uchun juda qulay!

---

## 5. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **String (matn) ning uzunligini qanday bilamiz? (Junior)**
   *Javob:* \`.length\` xususiyati orqali.

2. **Trim() nima qiladi? (Junior - Amaliy)**
   *Vazifa:* "  Hello  " matnining ikki tarafidagi bo'shliqlarni o'chirib bering.

3. **Matn ichidan so'z qidirish. (Junior)**
   *Javob:* \`includes("so'z")\` metodi \`true\` yoki \`false\` qaytaradi.

4. **Matnning birinchi harfini olish. (Junior)**
   *Javob:* \`str[0]\` yoki \`str.at(0)\`.

5. **Repeat() metodi nima uchun? (Junior - Amaliy)**
   *Vazifa:* "Yulduz" so'zini 3 marta ketma-ket chiqaring.

6. **Split() nima qaytaradi? (Middle)**
   *Javob:* Matnni berilgan belgi bo'yicha bo'lib, **massiv** qaytaradi.

7. **Matn boshlanishini tekshirish. (Junior)**
   *Javob:* \`startsWith("prefiks")\` metodi orqali.

8. **PadStart() nima uchun kerak? (Middle)**
   *Javob:* Matnning boshiga ma'lum bir belgini qo'shib, uzunligini to'ldirish uchun (Masalan: karta raqamlarini yashirishda).

9. **IndexOf vs LastIndexOf? (Middle)**
   *Javob:* \`indexOf\` birinchi uchragan, \`lastIndexOf\` esa oxirgi uchragan indeksni qaytaradi.

10. **String immutability (o'zgarmaslik) nima? (Middle)**
    *Javob:* String yaratilgandan keyin uning ichidagi birorta harfni to'g'ridan-to'g'ri o'zgartirib bo'lmaydi (\`str[0] = "A"\` ishlamaydi).

11. **Matnni teskari qilish (Reverse). (Middle - Amaliy)**
    *Vazifa:* "Salom" ni "molaS" qiling. (Maslahat: split -> reverse -> join).

12. **CharAt() va [ ] orasidagi farq? (Middle)**
    *Javob:* \`charAt()\` agar indeks topilmasa bo'sh matn qaytaradi, \`[ ]\` esa \`undefined\`.

---

## 6. CHALLENGE 🏆
Foydalanuvchi kiritgan har qanday gapning birinchi harfini katta qiling, qolganlarini esa kichik qiling. (Masalan: "jAvAsCrIpT o'RgAnAmAn" -> "Javascript o'rganaman").

---

## 7. XULOSA
Siz endi matnlarni xuddi plastilin kabi xohlagan ko'rinishga keltira olasiz!
`,
  exercises: [
    {
      id: 1,
      title: "Trim va Katta harf",
      instruction: "Bo'shliqlarni o'chiring va hamma harflarni katta qiling.",
      startingCode: "const word = '  hello  ';\nconst result = // Bu yerga yozing\n",
      hint: "word.trim().toUpperCase()",
      test: "if (result === 'HELLO') return null; return 'Xato bajardingiz';"
    },
    {
      id: 2,
      title: "Qidiruv",
      instruction: "Matn ichida 'JS' so'zi borligini tekshiring.",
      startingCode: "const txt = 'I love JS';\nconst hasJS = // Bu yerda tekshiring\n",
      hint: "txt.includes('JS')",
      test: "if (hasJS === true) return null; return 'includes ishlatilmadi';"
    }
  ]
};

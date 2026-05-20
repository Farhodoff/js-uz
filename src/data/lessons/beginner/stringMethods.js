export const stringMethods = {
  id: "string-methods",
  title: "String Metodlari - Matnlar bilan sehrgarlik",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, foydalanuvchi ismini "  aLi  " deb yozdi. Sizga esa uni bazaga "Ali" ko'rinishida saqlash kerak. Matnning boshidagi bo'shliqlarni qanday o'chirasiz? Birinchi harfni qanday katta qilasiz?

JavaScriptda matnlar (stringlar) bilan ishlash uchun juda ko'p tayyor funksiyalar mavjud. Bular **String Metodlari** deb ataladi.

## 1. NEGA kerak?
Tasavvur qiling, foydalanuvchi ismini "  aLi  " deb yozdi. Sizga esa uni bazaga "Ali" ko'rinishida saqlash kerak. Matnning boshidagi bo'shliqlarni qanday o'chirasiz? Birinchi harfni qanday katta qilasiz? Metodlarsiz buni qilish juda qiyin bo'lardi.

## 2. SODDALIK (Analogiya)
Buni **sartaroshxona** deb tasavvur qiling. Matn — bu mijoz. Sartarosh (metodlar) mijozning sochidan kesishi (\`slice\`), bo'yashi (\`toUpperCase\`) yoki soqolini olib tozalashi (\`trim\`) mumkin. Mijoz o'sha-o'sha, lekin ko'rinishi o'zgaradi.

## 3. STRUKTURA (Asosiy metodlar)

### A. Kattalashtirish va Kichiklashtirish
\`\`\`javascript
let matn = "JavaScript";
console.log(matn.toUpperCase()); // "JAVASCRIPT"
console.log(matn.toLowerCase()); // "javascript"
\`\`\`

### B. Kesib olish (slice)
\`\`\`javascript
let meva = "Olmaxon";
console.log(meva.slice(0, 4)); // "Olma" (0 dan 4-gacha)
\`\`\`

### C. Bo'shliqlarni tozalash (trim)
\`\`\`javascript
let user = "  Farhod  ";
console.log(user.trim()); // "Farhod"
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let xabar = "Bugun havo issiq";
let yangi = xabar.replace("issiq", "zo'r");
console.log(yangi); // "Bugun havo zo'r"
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Asl matn o'zgarmaydi:** Matn metodlari asl o'zgaruvchini o'zgartirmaydi, ular har doim **yangi matn** qaytaradi.
   \`\`\`javascript
   let ism = "ali";
   ism.toUpperCase(); 
   console.log(ism); // hali ham "ali"! ❌
   ism = ism.toUpperCase(); // mana endi "ALI" ✅
   \`\`\`
2. **Indeks sanash:** Sanoq doim 0 dan boshlanadi. 1-harf bu 0-indeksdir.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

<details>
<summary>1. Matn metodlari nima?</summary>
Matn metodlari — string (matn) qiymatlari ustida turli amallar bajarish (kesish, harflar registri o'zgartirish, qidirish va h.k.) uchun JavaScript tomonidan taqdim etilgan maxsus tayyor funksiyalardir.
</details>

<details>
<summary>2. .length nima qaytaradi?</summary>
\`.length\` xususiyati matndagi barcha belgilar (harflar, raqamlar, bo'shliqlar va tinish belgilari) sonini qaytaradi. Bu metod emas, xususiyat bo'lgani uchun qavssiz chaqiriladi.
</details>

<details>
<summary>3. .toUpperCase() va .toLowerCase() farqi nima?</summary>
\`.toUpperCase()\` matndagi barcha harflarni bosh harflarga (katta), \`.toLowerCase()\` esa barcha harflarni kichik harflarga o'zgartirib beradi.
</details>

<details>
<summary>4. .slice() metodining birinchi va ikkinchi parametrlari nimani anglatadi?</summary>
Birinchi parametr kesishni boshlash indeksini (shu indeks kiradi), ikkinchi parametr esa kesishni yakunlash indeksini (bu indeks kirmaydi) anglatadi.
</details>

<details>
<summary>5. .trim() metodi nima uchun kerak?</summary>
Matnning boshi va oxiridagi barcha ortiqcha bo'shliqlarni (space, tab, yangi qator) o'chirib tashlash uchun ishlatiladi.
</details>

<details>
<summary>6. Matndagi biror so'zni boshqasiga almashtirish metodini ayting (replace).</summary>
\`.replace(eskiSo'z, yangiSo'z)\` metodi matn ichidagi ma'lum bir bo'lak yoki so'zni boshqa bir so'zga almashtirib, yangi matn qaytaradi.
</details>

<details>
<summary>7. .includes() metodi nima qaytaradi?</summary>
Agar qidirilayotgan matn bo'lagi joriy matn ichida mavjud bo'lsa \`true\`, aks holda \`false\` (boolean) qiymat qaytaradi.
</details>

<details>
<summary>8. .startsWith() va .endsWith() qachon ishlatiladi?</summary>
\`.startsWith()\` matn ma'lum bir belgi yoki so'z bilan boshlanganligini, \`.endsWith()\` esa ma'lum bir belgi yoki so'z bilan tugaganligini tekshirish uchun ishlatiladi.
</details>

<details>
<summary>9. Matnning 3-harfini qanday olish mumkin?</summary>
Matnning 3-harfini olish uchun \`matn[2]\` (indeks orqali) yoki \`matn.charAt(2)\` metodidan foydalanish mumkin (chunki indeks 0 dan boshlanadi).
</details>

<details>
<summary>10. Nima uchun string metodlari asl matnni o'zgartirmaydi?</summary>
Chunki JavaScript-da matnlar primitiv tur bo'lib, o'zgarmas (\`immutable\`) hisoblanadi. Shuning uchun barcha metodlar asl matnni o'zgartirmasdan, yangi matn qaytaradi.
</details>

<details>
<summary>11. .split() metodi matnni nimaga aylantiradi?</summary>
\`.split()\` metodi berilgan ajratuvchi belgi (separator) bo'yicha matnni bo'laklarga bo'lib, ulardan iborat massiv (\`array\`) hosil qiladi.
</details>

<details>
<summary>12. .repeat(3) nima ish bajaradi?</summary>
\`.repeat(3)\` metodi joriy matnni berilgan miqdorda (bu yerda 3 marta) takrorlab, ketma-ket birlashtirib beradi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Matnni o'zgartirish",
      instruction: "'  js  ' matnidagi bo'shliqlarni o'chiring va hamma harflarni katta qiling.",
      startingCode: "let word = '  js  ';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = word.trim().toUpperCase();",
      test: "if (res === 'JS') return null; return 'Xato bajardingiz!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da string (matn) metodlari ishlatilganda asl o'zgaruvchi qiymati qanday o'zgaradi?",
      options: [
        "Asl o'zgaruvchi avtomatik ravishda yangi qiymatga almashadi",
        "Asl o'zgaruvchi umuman o'zgarmaydi, chunki stringlar immutable (o'zgarmas) hisoblanadi va metodlar yangi string qaytaradi",
        "Asl o'zgaruvchi xotiradan butunlay o'chib ketadi",
        "Faqat `.replace()` ishlatilganda o'zgaradi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da satrlar (stringlar) immutable, ya'ni o'zgarmasdir. Istalgan string metodi mavjud satr ustida bajarilganda asl qiymatni o'zgartirmaydi, balki yangilangan yangi satrni qaytaradi."
    },
    {
      id: 2,
      question: "`let txt = \"Frontend\"; txt.slice(0, 4)` ifodasidan qanday natija qaytadi?",
      options: [
        "`\"Fron\"` (chunki 0-indeksdan 4-indeksgacha bo'lgan belgilarni kesib oladi, 4-indeksning o'zi kirmaydi)",
        "`\"Front\"`",
        "`\"tend\"`",
        "`\"Frontend\"`"
      ],
      correctAnswer: 0,
      explanation: "`.slice(start, end)` metodi ko'rsatilgan `start` indeksidan boshlab `end` indeksigacha bo'lgan qismni kesib oladi, lekin oxirgi ko'rsatilgan indeksdagi belgini o'z ichiga olmaydi."
    },
    {
      id: 3,
      question: "Foydalanuvchi kiritgan matn boshidagi va oxiridagi bo'shliqlarni olib tashlash (tozalash) uchun qaysi metoddan foydalaniladi?",
      options: [
        "`.clean()`",
        "`.trim()`",
        "`.sliceSpace()`",
        "`.clear()`"
      ],
      correctAnswer: 1,
      explanation: "`.trim()` metodi satrning boshi va oxiridagi barcha ortiqcha bo'shliqlarni o'chirib tashlaydi."
    },
    {
      id: 4,
      question: "Matnni ma'lum bir belgi (masalan, vaqtinchalik bo'sh joy yoki vergul `,`) bo'yicha bo'laklarga ajratib, massivga (array) o'tkazish uchun qaysi metod qo'llaniladi?",
      options: [
        "`.slice()`",
        "`.split()`",
        "`.join()`",
        "`.divide()`"
      ],
      correctAnswer: 1,
      explanation: "`.split()` metodi berilgan ajratuvchi (separator) belgi asosida matnni qismlarga bo'lib, massivga aylantirib qaytaradi."
    },
    {
      id: 5,
      question: "`let code = \"JavaScript\"; console.log(code.includes(\"java\"))` natijasi nima bo'ladi va nima uchun?",
      options: [
        "`true`",
        "`false` (chunki string metodlari harflarning katta-kichikligiga sezgir (case-sensitive) hisoblanadi, shuning uchun 'Java' va 'java' har xil)",
        "`undefined`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "String metodlari katta va kichik harflarni farqlaydi (case-sensitive). \"JavaScript\" so'zida kichik harflar bilan yozilgan \"java\" so'zi qatnashmaganligi sababli `.includes(\"java\")` false qaytaradi."
    }
  ]
};

export const localStorageLesson = {
  id: "local-storage",
  title: "Brauzer xotirasi (LocalStorage va SessionStorage)",
  level: "Murakkab",
  description: "Ma'lumotlarni brauzerda doimiy va vaqtinchalik saqlash usullari.",
  theory: `## 1. NEGA kerak?
Veb-saytga kirganingizda, sayt sizning tanlagan tilingizni yoki tungi rejim (dark mode) sozlamangizni eslab qolishi kerak. Agar bu ma'lumotlarni hech qayerda saqlamasangiz, sahifa yangilanganda hamma narsa dastlabki holatiga qaytib qoladi. Ma'lumotlar bazasiga (Database) yozish esa har doim ham shart emas. Shunday kichik sozlamalar uchun brauzer xotirasi ideal joy.

## 2. SODDALIK (Analogiya)
- **LocalStorage:** Bu sizning shaxsiy daftarchangizga o'xshaydi. Unga yozilgan narsa siz uni o'chirmaguningizcha turaveradi (hatto kompyuterni o'chirib yoqsangiz ham).
- **SessionStorage:** Bu esa o'qituvchi doskaga yozgan narsasiga o'xshaydi. Dars tugashi (tab yoki brauzer yopilishi) bilan hammasi o'chib ketadi.

## 3. STRUKTURA

### A. LocalStorage metodlari
\`\`\`javascript
localStorage.setItem("key", "value"); // Saqlash
let val = localStorage.getItem("key"); // Olish
localStorage.removeItem("key"); // O'chirish
localStorage.clear(); // Hammasini tozalash
\`\`\`

### B. Obyektlarni saqlash (JSON ishlatish)
LocalStorage faqat **matn (string)** saqlay oladi. Obyekt yoki massivni saqlash uchun uni JSON formatiga o'tkazish shart:
\`\`\`javascript
const user = { name: "Ali", age: 25 };

// Saqlash (Obyekt -> String)
localStorage.setItem("user", JSON.stringify(user));

// Olish (String -> Obyekt)
const data = JSON.parse(localStorage.getItem("user"));
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Obyektni shunchaki saqlash:** \`localStorage.setItem("u", user)\` qilsangiz, u \`"[object Object]"\` bo'lib saqlanadi va ma'lumot yo'qoladi.
2. **Xavfsizlik:** LocalStorage xavfsiz emas! U yerda parollar, bank karta raqamlari yoki maxfiy "token"larni saqlash tavsiya etilmaydi, chunki har qanday JS skript unga kira oladi.
3. **Limit:** LocalStorage hajmi cheklangan (odatda 5-10 MB). Juda katta ma'lumotlarni saqlab bo'lmaydi.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. LocalStorage va SessionStorage asosiy farqi nima?</summary>
LocalStorage ma'lumotni muddatsiz saqlaydi, SessionStorage esa tab yopilishi bilan o'chirib yuboradi.
</details>

<details>
<summary>2. LocalStorage'da taxminan necha MB ma'lumot saqlash mumkin?</summary>
Brauzerga qarab 5 MB dan 10 MB gacha.
</details>

<details>
<summary>3. Ma'lumotni o'qish uchun qaysi metod ishlatiladi?</summary>
\`getItem(kalit)\` metodi.
</details>

<details>
<summary>4. JSON.stringify nima uchun kerak?</summary>
JS obyektlarini LocalStorage saqlay oladigan matn (string) formatiga o'tkazish uchun.
</details>

<details>
<summary>5. JSON.parse qachon ishlatiladi?</summary>
LocalStorage'dan olingan matnli ma'lumotni qaytadan JS obyektiga aylantirish uchun.
</details>

<details>
<summary>6. Brauzer yopilganda qaysi xotira o'chib ketadi?</summary>
SessionStorage.
</details>

<details>
<summary>7. Xotiradagi barcha ma'lumotlarni bittada qanday tozalash mumkin?</summary>
\`.clear()\` metodi orqali.
</details>

<details>
<summary>8. LocalStorage faqat string saqlashining sababi nima?</summary>
Bu brauzer arxitekturasining soddaligi va xavfsizligi uchun shunday loyihalashtirilgan.
</details>

<details>
<summary>9. LocalStorage'ga boshqa domen (sayt) kiritgan ma'lumotni o'qish mumkinmi?</summary>
Yo'q, "Same-origin policy" qoidasiga ko'ra har bir sayt faqat o'ziga tegishli xotirani ko'ra oladi.
</details>

<details>
<summary>10. localStorage.length nima qaytaradi?</summary>
Xotirada saqlangan elementlar (kalitlar) sonini.
</details>

<details>
<summary>11. Kompyuter o'chib yonsa LocalStorage o'chadimi?</summary>
Yo'q, u kompyuter xotirasida (diskda) saqlanadi.
</details>

<details>
<summary>12. SessionStorage qachon tozalanadi?</summary>
Faqat o'sha tab yoki brauzer butunlay yopilganda.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Ma'lumot saqlash",
      instruction: "LocalStorage'ga 'theme' kaliti bilan 'dark' qiymatini saqlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "localStorage.setItem('theme', 'dark');",
      test: "if (code.includes('setItem')) return null; return 'setItem ishlatilmadi';"
    },
    {
      id: 2,
      title: "Obyektni saqlash",
      instruction: "JSON.stringify yordamida 'car' obyektini saqlang.",
      startingCode: "const car = { model: 'BYD' };\n// Saqlang\n",
      hint: "localStorage.setItem('car', JSON.stringify(car));",
      test: "if (code.includes('JSON.stringify')) return null; return 'JSON.stringify ishlatilmadi';"
    },
    {
      id: 3,
      title: "Ma'lumotni o'chirish",
      instruction: "LocalStorage'dan 'user' kalitini o'chirib tashlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "localStorage.removeItem('user');",
      test: "if (code.includes('removeItem')) return null; return 'removeItem ishlatilmadi';"
    }
  ]
};

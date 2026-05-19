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
  ],
  quizzes: [
    {
      id: 1,
      question: "`LocalStorage` va `SessionStorage` o'rtasidagi eng asosiy farq nima?",
      options: [
        "LocalStorage ma'lumotlarni faqat massiv ko'rinishida saqlaydi, SessionStorage esa faqat obyekt ko'rinishida",
        "LocalStorage'dagi ma'lumotlar foydalanuvchi yoki kod orqali o'chirilmaguncha muddatsiz saqlanadi, SessionStorage esa tab yoki brauzer yopilishi bilan o'chib ketadi",
        "SessionStorage xavfsizroq va parollarni saqlash uchun mo'ljallangan",
        "LocalStorage faqat serverda, SessionStorage esa faqat client-side'da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "LocalStorage doimiy xotira bo'lib, kompyuter o'chib yonsa ham o'chmaydi (kod orqali yoki qo'lda tozalanmaguncha). SessionStorage esa faqat o'sha tab ochiq turganda saqlanib turadi."
    },
    {
      id: 2,
      question: "`LocalStorage`ga JavaScript obyektini (`const user = { name: 'Ali' }`) saqlamoqchi bo'lsak, nima uchun `JSON.stringify()` ishlatishimiz shart?",
      options: [
        "Chunki LocalStorage faqat matnli (string) ma'lumotlarni saqlashga moslashgan, aks holda obyekt `[object Object]` shaklida saqlanib qoladi",
        "Chunki bu xotirada joyni 10 barobargacha tejaydi",
        "Chunki u ma'lumotlarni shifrlaydi (encrypt)",
        "JSON ishlatilmasa brauzer avtomatik ravishda sahifani bloklaydi"
      ],
      correctAnswer: 0,
      explanation: "Veb-xotiraga faqat kalit-qiymat ko'rinishidagi stringlar saqlanadi. Obyektlarni saqlashdan oldin `JSON.stringify` orqali string formatiga aylantirish, o'qiyotganda esa `JSON.parse` yordamida obyekt holiga qaytarish zarur."
    },
    {
      id: 3,
      question: "`LocalStorage`ning o'rtacha sig'im limiti (storage limit) qancha?",
      options: [
        "5-10 KB",
        "5-10 MB",
        "1-2 GB",
        "Cheksiz"
      ],
      correctAnswer: 1,
      explanation: "LocalStorage juda katta hajmdagi ma'lumotlar uchun mo'ljallanmagan. Brauzerlar odatda har bir origin uchun 5 dan 10 MB gacha bo'lgan limit o'rnatishadi."
    },
    {
      id: 4,
      question: "Brauzer xotirasidan barcha ma'lumotlarni bitta operatsiya bilan butunlay tozalash uchun qaysi metod ishlatiladi?",
      options: [
        "`localStorage.removeAll()`",
        "`localStorage.clear()`",
        "`localStorage.delete()`",
        "`localStorage.reset()`"
      ],
      correctAnswer: 1,
      explanation: "`localStorage.clear()` metodi o'sha origin (domen) uchun saqlangan barcha kalit va qiymatlarni butunlay tozalab tashlaydi."
    },
    {
      id: 5,
      question: "Bir xil domendagi boshqa tab yoki oynada `LocalStorage` ma'lumotlari o'zgarganda, buni real-vaqtda kuzatib borish uchun qaysi hodisadan (event) foydalanish mumkin?",
      options: [
        "`change` event",
        "`storage` event",
        "`update` event",
        "`load` event"
      ],
      correctAnswer: 1,
      explanation: "Brauzerda `storage` event hodisasi mavjud. Agar bitta saytning bir nechta tabi ochiq bo'lsa va birida `localStorage` o'zgartirilsa, qolgan tablar buni `window.addEventListener('storage', callback)` orqali eshitib, mos ravishda ish tutishi mumkin."
    }
  ]
};

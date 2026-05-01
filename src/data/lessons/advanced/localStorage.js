export const localStorageLesson = {
  id: "a15",
  title: "Brauzer xotirasi (LocalStorage)",
  theory: `## 1. KIRISH
Veb-saytga kirganingizda, ba'zida sayt sizning tanlagan tilingizni yoki tungi rejim (dark mode) sozlamangizni eslab qoladi. Buning uchun brauzerning maxsus xotirasi — **LocalStorage** ishlatiladi.

---

## 2. LOCALSTORAGE XUSUSIYATLARI
- **Muddati:** Ma'lumotlar foydalanuvchi o'zi o'chirmaguncha saqlanib qoladi (hatto kompyuter o'chib yonsa ham).
- **Hajmi:** Taxminan 5-10 MB gacha ma'lumot sig'adi.
- **Turi:** Faqat **matn (string)** ko'rinishidagi ma'lumotlarni saqlay oladi.

### Asosiy metodlar:
1.  **setItem(key, value):** Ma'lumotni saqlash.
2.  **getItem(key):** Ma'lumotni o'qish.
3.  **removeItem(key):** Bittasini o'chirish.
4.  **clear():** Hammasini tozalash.

\`\`\`javascript
localStorage.setItem("ism", "Ali");
console.log(localStorage.getItem("ism")); // "Ali"
\`\`\`

---

## 3. OBYEKTLAR BILAN ISHLASH ⭐
LocalStorage faqat matn saqlagani uchun, obyektlarni avval matnga aylantirish kerak:

\`\`\`javascript
const user = { name: "Ali", age: 25 };

// Saqlash (JSON.stringify)
localStorage.setItem("user", JSON.stringify(user));

// Olish (JSON.parse)
const savedUser = JSON.parse(localStorage.getItem("user"));
\`\`\`

\`\`\`mermaid
graph LR
    A[Obyekt] -- stringify --> B(JSON String)
    B -- setItem --> C[LocalStorage]
    C -- getItem --> D(JSON String)
    D -- parse --> E[Obyekt]
    style C fill:#f9f,stroke:#333
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **LocalStorage va SessionStorage farqi nima?**
   *Javob:* LocalStorage ma'lumotni doimiy saqlaydi, SessionStorage esa faqat tab yopilguncha saqlaydi.

2. **LocalStorage xavfsizmi?**
   *Javob:* Yo'q, LocalStorage'dagi ma'lumotlarni istalgan skript o'qishi mumkin (XSS). Shuning uchun u yerda parollar yoki tokenlarni saqlash tavsiya etilmaydi.

3. **Storage to'lib qolsa nima bo'ladi?**
   *Javob:* Brauzer \`QuotaExceededError\` xatosini beradi.`,
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
    }
  ]
};

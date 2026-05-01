export const objects = {
  id: "b6",
  title: "Obyektlar (Objects)",
  theory: `## 1. OBYEKTLAR NIMA?
Obyekt — bu bir-biriga bog'liq bo'lgan ma'lumotlarni "kalit: qiymat" ko'rinishida saqlash usuli. Agar massiv shunchaki ro'yxat bo'lsa, obyekt — bu biron bir narsaning batafsil tavsifi.

### Misol (Metafora)
Tasavvur qiling, sizda bitta pasport bor. Unda ism, yosh va shahar yozilgan. Bu pasport — obyekt, undagi ma'lumotlar esa uning xususiyatlari (properties).

\`\`\`javascript
const shaxs = {
  ism: "Ali",
  yosh: 25,
  shahar: "Toshkent"
};
\`\`\`

---

## 2. MA'LUMOTLARNI O'QISH VA O'ZGARTIRISH
Obyekt ichidagi ma'lumotni olishning ikki xil usuli bor:

1. **Dot notation (Nuqta orqali):** \`shaxs.ism\`
2. **Bracket notation (Qavs orqali):** \`shaxs["ism"]\`

\`\`\`javascript
shaxs.yosh = 26; // Qiymatni o'zgartirish
shaxs.kasb = "Dasturchi"; // Yangi xususiyat qo'shish
\`\`\`

---

## 3. OBYEKT METODLARI
Agar obyekt ichida funksiya bo'lsa, u **metod** deyiladi.

\`\`\`javascript
const mashina = {
  model: "BYD",
  yurish: function() {
    console.log("Mashina ketmoqda...");
  }
};
mashina.yurish(); // → "Mashina ketmoqda..."
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior)

1. **Obyekt va Massiv farqi nima?**
   *Javob:* Massiv — tartiblangan ro'yxat (indeksli). Obyekt — tartiblanmagan kalit-qiymat to'plami.

2. **Bracket notation qachon kerak?**
   *Javob:* Agar kalit nomi o'zgaruvchida bo'lsa yoki kalit nomida probel/maxsus belgilar bo'lsa.

3. **Obyekt ichidagi hamma kalitlarni qanday olish mumkin?**
   *Javob:* \`Object.keys(obj)\` metodi orqali.`,
  exercises: [
    {
      id: 1,
      title: "Obyekt yaratish",
      instruction: "'user' nomli obyekt yarating. Unda 'name' va 'age' xususiyatlari bo'lsin.",
      startingCode: "// Obyektni yarating\n",
      hint: 'const user = { name: "Ali", age: 20 };',
      test: "if (typeof result === 'object' && result.name) return null; return 'Obyekt yaratishda xato yoki name xususiyati yo\\'q';"
    },
    {
      id: 2,
      title: "Qiymatni o'zgartirish",
      instruction: "Berilgan 'book' obyektining 'price' xususiyatini 15000 ga o'zgartiring.",
      startingCode: "const book = { title: 'JS', price: 10000 };\n// Bu yerda o'zgartiring\n\nconsole.log(book.price);",
      hint: "book.price = 15000;",
      test: "if (logs.includes('15000')) return null; return 'Narx 15000 bo\\'lishi kerak';"
    }
  ]
};
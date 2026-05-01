export const localStorageLesson = {
  id: "a15",
  title: "LocalStorage va SessionStorage",
  theory: `## 1. KIRISH
Tasavvur qiling, saytingizda "Dark Mode" yoqilgan. Foydalanuvchi sahifani yangilasa (refresh), bu holat yo'qolib qolmasligi kerak. Buning uchun bizga brauzer xotirasi yordam beradi.

## 2. TUSHUNCHA

### LocalStorage
- **Muddati**: Cheksiz (foydalanuvchi o'zi o'chirmaguncha).
- **Hajmi**: ~5-10 MB.
- **Scope**: Barcha tablar (sahifalar) uchun umumiy.

### SessionStorage
- **Muddati**: Faqat joriy tab yopilguncha.
- **Scope**: Faqat o'sha tab uchun xususiy.

---

## 3. KOD MISOLLARI

### Misol 1 — Ma'lumot saqlash va olish
\`\`\`javascript
// Saqlash
localStorage.setItem("theme", "dark");

// Olish
const theme = localStorage.getItem("theme");
console.log(theme); // → "dark"

// O'chirish
// localStorage.removeItem("theme");
\`\`\`

### Misol 2 — Obyektlarni saqlash (JSON) ⭐
Storage faqat **string** saqlay oladi. Obyekt saqlash uchun uni \`JSON.stringify\` qilish shart.
\`\`\`javascript
const user = { name: "Ali", age: 25 };
localStorage.setItem("user", JSON.stringify(user));

const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name); // → "Ali"
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Xotira turlari farqi
| Xususiyat | LocalStorage | SessionStorage | Cookies |
|---|---|---|---|
| Muddati | Doimiy | Tab yopilguncha | Belgilangan vaqtgacha |
| Hajmi | 5MB+ | 5MB | 4KB |
| Serverga boradimi? | Yo'q | Yo'q | Ha ✅ |

---

## 5. INTERVYU SAVOLLARI
1. **LocalStorage va SessionStorage farqi?** - Asosiy farq saqlash muddati va tablar orasidagi ko'rinish doirasida.
2. **Obyektni Storage'ga qanday saqlash kerak?** - \`JSON.stringify\` orqali stringga o'girib, olinganda \`JSON.parse\` qilinadi.
3. **Storage xavfsizimi?** - Yo'q, u yerda parollar yoki bank kartalari kabi maxfiy ma'lumotlarni saqlash mutlaqo taqiqlangan!

---

## 6. MINI LOYIHA: "Ism Eslab Qoluvchi"
**Vazifa:** Foydalanuvchi ismini saqlab qoling va keyingi safar kirganda uni tabriklang.

\`\`\`javascript
function welcomeUser(name) {
  if (name) {
    localStorage.setItem("username", name);
    console.log("Xush kelibsiz, " + name);
  } else {
    const saved = localStorage.getItem("username");
    console.log(saved ? "Yana bir bor salom, " + saved : "Sizni tanimadim");
  }
}

welcomeUser("Farhod"); // Birinchi marta
welcomeUser(); // Ikkinchi marta (Refreshdan keyin)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "JSON saqlash",
      instruction: "Berilgan 'settings' obyektini localStorage'ga JSON shaklida saqlang.",
      startingCode: "const settings = { lang: 'uz' };\n// Saqlang\n",
      hint: "localStorage.setItem('settings', JSON.stringify(settings))",
      test: "if (code.includes('JSON.stringify')) return null; return 'JSON.stringify ishlating';"
    }
  ]
};

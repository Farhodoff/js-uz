export const step5_state = {
  title: "5-DARS: State (Holat)",
  content: `
# 1. 🧠 State nima va Props dan farqi?

Oldingi darsda o'rganganimiz **Props** — bu faqatgina Ota komponentdan Bola komponentga beriladigan va *o'zgartirib bo'lmaydigan* ma'lumotlar edi.

Ammo ilovalarimiz tirik va interaktiv bo'lishi kerak! Tugmani bossak son o'zgarishi, inputga yozsak yozuv paydo bo'lishi, menyuni bossak u ochilishi kerak. Qachonki komponent ichida **o'zgaruvchan** ma'lumot kerak bo'lsa, biz **State** (Holat) dan foydalanamiz.

**Asosiy farq:**
*   **Props:** Tashqaridan keladi (Ota beradi). O'zgarmas (Read-only).
*   **State:** Komponentning o'zida yashaydi (Ichki xotira). O'zgarishi mumkin va u o'zgarganda React o'sha komponentni avtomatik qayta chizadi (Re-render).

---

## 2. 🪝 \`useState\` Hook - Sintaksisi

Funksional komponentlarda State yaratish uchun React ning maxsus \`useState\` funksiyasidan (Hook) foydalanamiz. Uni fayl tepasida import qilib olish kerak:
\`\`\`jsx
import React, { useState } from "react";
\`\`\`

Undan qanday foydalaniladi?
\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`
Bu qator nima qilyapti?
1.  **\`useState(0)\`**: Biz boshlang'ich holati (dastlabki qiymati) \`0\` ga teng bo'lgan xotira qutisini yaratdik.
2.  **\`count\`**: Bu o'sha xotiradagi hozirgi qiymatni ushlab turadigan o'zgaruvchi. Uni bemalol ekranga \`{count}\` deb chiqarishimiz mumkin.
3.  **\`setCount\`**: Bu maxsus setter funksiya! Agar \`count\` ni 1 ga yoki boshqa songa o'zgartirmoqchi bo'lsak, faqatgina shu funksiyadan foydalanamiz: \`setCount(1)\`.

---

## 3. ⚠️ Nima uchun oddiy o'zgaruvchi emas?

Juda ko'p uchraydigan savol: *"Nega shunchaki \`let count = 0; count++;\` deb yozavermaymiz?"*

❌ **Xato yondashuv (Oddiy o'zgaruvchi bilan):**
Agar siz oddiy o'zgaruvchining qiymatini oshirsangiz (\`count++\`), uning xotiradagi qiymati rostdan ham oshadi, **LEKIN React bundan bexabar qoladi!** Natijada ekrandagi son o'zgarmay turaveradi.

✅ **To'g'ri yondashuv (useState bilan):**
Siz \`setCount(count + 1)\` ni chaqirganingizda, bu funksiya avval qiymatni oshiradi va orqasidan **React ga signal yuboradi**: *"Ey React, mening qiymatim o'zgardi, iltimos kelib meni yangi qiymat bilan boshqatdan chizib ket (re-render qilib ket)!"*
Natijada brauzerda ham son yangilanadi.

---

## 4. 🔄 Oldingi qiymatga tayanib yangilash (Callback)

Agar siz \`state\` ni avvalgi holatiga qarab o'zgartirayotgan bo'lsangiz (masalan, eski songa 1 qo'shish), to'g'ridan-to'g'ri \`setCount(count + 1)\` emas, balki "Callback" (funksiya) usulidan foydalangan ma'qul:

\`\`\`jsx
// Bu biroz xavfli bo'lishi mumkin (ayniqsa asinxron yoki ko'p marta ketma-ket chaqirilganda)
setCount(count + 1);

// Bu ENG XAVFSIZ va TO'G'RI yo'l:
setCount((oldingiQiymat) => oldingiQiymat + 1);
\`\`\`

---

## 5. 📦 Obyekt yoki Massivlarni State da saqlash

State faqat son yoki matn emas, obyektlarni ham qabul qiladi. Lekin qattiq qoida bor: **State doimo O'zgarmas (Immutable) bo'lishi kerak!** Obyektni yoki massivni to'g'ridan-to'g'ri o'zgartirmang, undan nusxa oling (\`...\` spread operatori orqali).

\`\`\`jsx
const [user, setUser] = useState({ name: "Ali", age: 20 });

// XATO (Mutatsiya - React ko'rmay qoladi):
user.age = 21; 
setUser(user);

// TO'G'RI (Nusxa olib, faqat bitta joyini o'zgartirish):
setUser({ ...user, age: 21 });
\`\`\`
`,
  code: `import React, { useState } from "react";

export default function CounterApp() {
  // 1. State yaratamiz (Boshlang'ich qiymati 0)
  const [count, setCount] = useState(0);

  // 2. Obyekt ko'rinishidagi State
  const [user, setUser] = useState({ name: "Dasturchi", isHappy: true });

  // Funksiyalar
  const increment = () => {
    // To'g'ri usul (oldingi holat asosida oshirish)
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const toggleMood = () => {
    // Obyektli state ni yangilash (eskisidan nusxa olib, keraklisini o'zgartiramiz)
    setUser((prevUser) => ({
      ...prevUser,
      isHappy: !prevUser.isHappy
    }));
  };

  return (
    <div style={{ textAlign: "center", padding: 30, fontFamily: "sans-serif" }}>
      <h2>1. Oddiy Hisoblagich (Counter)</h2>
      
      {/* Ekranga state o'zgaruvchisini chiqaramiz */}
      <h1 style={{ fontSize: 48, color: count < 0 ? "red" : "green" }}>{count}</h1>
      
      {/* State ni yangilovchi (setter) funksiyalarni tugmaga ulaymiz */}
      <button onClick={decrement} style={btnStyle}>- Ayirish</button>
      <button onClick={() => setCount(0)} style={btnStyle}>Nol qilish</button>
      <button onClick={increment} style={btnStyle}>+ Qo'shish</button>

      <hr style={{ margin: "40px 0", borderColor: "#ddd" }} />

      <h2>2. Obyektli State</h2>
      <p>Foydalanuvchi: <strong>{user.name}</strong></p>
      <p>Kayfiyati: <strong>{user.isHappy ? "Xursand 😄" : "Xafa 😢"}</strong></p>
      
      <button onClick={toggleMood} style={{ ...btnStyle, background: "#8e44ad", color: "white" }}>
        Kayfiyatni o'zgartirish
      </button>
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px",
  margin: "0 5px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "1px solid #ccc"
};`,
  exercises: [
    {
      id: 1,
      title: "State yaratish va o'zgartirish",
      instruction: "Quyida `ThemeSwitcher` komponenti berilgan. `useState` yordamida `theme` nomli state yarating (boshlang'ich qiymati `'light'`). Tugma bosilganda esa shu state `'dark'` ga o'zgarishi kerak.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function ThemeSwitcher() {\n  // Shu yerda theme nomli state yarating (default: 'light')\n\n\n  return (\n    // Ekranga qanaqa mavzu (theme) o'rnatilganini chiqaramiz\n    <div style={{ background: theme === 'dark' ? 'black' : 'white', color: theme === 'dark' ? 'white' : 'black', height: '100vh', padding: 20 }}>\n      <h2>Hozirgi mavzu: {theme}</h2>\n      \n      {/* onClick hodisasida setTheme orqali qiymatni 'dark' qiling */}\n      <button>Tungi rejimni yoqish</button>\n    </div>\n  );\n}",
      hint: "const [theme, setTheme] = useState('light'); va <button onClick={() => setTheme('dark')}> yozing.",
      test: "if (!code.includes('useState(\\'light\\')') && !code.includes('useState(\"light\")')) return 'useState ni boshlang\\'ich qiymatini light qilib chaqiring.'; if (!code.includes('setTheme(')) return 'Tugmaga setTheme ni ulamagansiz.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega oddiy JavaScript o'zgaruvchisi o'rniga aynan useState ishlatamiz?",
      options: [
        "Oddiy o'zgaruvchilar faqat bir marta ishlatiladi",
        "Tashqi ko'rinishi chiroyliroq bo'lishi uchun",
        "Chunki oddiy o'zgaruvchi qiymati o'zgarganini React bilolmaydi. State o'zgarishi esa React ni chaqirib ekranni yangilaydi (Re-render qiladi).",
        "Oddiy o'zgaruvchilarga raqam saqlab bo'lmaydi."
      ],
      correctAnswer: 2,
      explanation: "useState ning Setter funksiyasi (masalan, setCount) faqatgina qiymatni o'zgartirib qolmaydi, balki React ga komponentni boshidan qayta chizishi (re-render) kerakligi haqida buyruq (trigger) yuboradi."
    },
    {
      question: "Agar state obyekt yoki massivdan iborat bo'lsa uni qanday yangilash to'g'ri bo'ladi?",
      options: [
        "To'g'ridan-to'g'ri: state.name = 'Yangi' deb",
        "Eski obyektdan nusxa olib, so'ngra yangi maydonlarni yozish: setState({ ...oldState, name: 'Yangi' })",
        "React obyektli state larni qo'llab quvvatlamaydi.",
        "setState(state.name)"
      ],
      correctAnswer: 1,
      explanation: "React State qat'iyan IMMUTABLE (O'zgarmas) bo'lishi shart. Obyekt yoki massivning ichidagi bitta qiymatni o'zgartirish uchun butunlay yepyangi nusxa obyekt yuborish kerak."
    }
  ]
};

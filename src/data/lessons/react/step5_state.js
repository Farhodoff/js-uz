export const step5_state = {
  title: "5-DARS: State (Holat)",
  content: `
# 5-Qadam: React State (Holat) – Komponentning Xotirasi

React'ning eng kuchli xususiyatlaridan biri bu uning interaktivligidir. Ekranda tugma bosilganda sonning oshishi, qidiruv maydoniga matn kiritganda natijalarning filtrlanishi yoki "Dark Mode" yoqilishi — bularning barchasi **State** (Holat) orqali boshqariladi.

## 1. State o'zi nima?

**Analogiyni tasavvur qiling:** Komponentni bir inson deb hisoblasak, **State** uning *xotirasi* yoki *kayfiyati* hisoblanadi. 
Sizning qorningiz ochsa (ichki holatingiz o'zgarsa), sizning yuz ifodangiz va xulq-atvoringiz ham shunga mos ravishda o'zgaradi. React komponenti ham xuddi shunday ishlaydi: uning ichki \`state\`i (holati) o'zgarsa, u foydalanuvchiga ko'rinadigan qismini (UI) avtomatik ravishda yangilaydi.

Props – bu ota-onadan o'tadigan o'zgarmas genlar bo'lsa, State – bu komponentning o'z hayoti davomida o'zgarib turadigan ichki holatidir.

**Nega kerak?** Komponentlar foydalanuvchi bilan o'zaro aloqada bo'lganda nimalar bo'layotganini eslab qolishi kerak. Masalan, savatdagi (cart) mahsulotlar soni, kiritilgan parol yoki hozirgi vaqtni eslab qolish uchun bizga State kerak bo'ladi.

## 2. Nega oddiy o'zgaruvchilardan foydalana olmaymiz?

Ajam (boshlang'ich) dasturchilar ko'pincha "Nega oddiy JavaScript o'zgaruvchisi o'rniga \`useState\` degan murakkab narsani ishlatishim kerak?" deb o'ylashadi. 

Keling, oddiy o'zgaruvchi yordamida hisoblagich (counter) yasashga urinib ko'ramiz:

\`\`\`jsx
// ❌ YOMON AMALIYOT (DON'T)
function BadCounter() {
  let count = 0; // Oddiy o'zgaruvchi

  function handleClick() {
    count = count + 1;
    console.log(count); // Konsolda son oshadi, lekin ekranda EMAS!
  }

  return (
    <div>
      <h1>Sanoq: {count}</h1>
      <button onClick={handleClick}>Qo'shish</button>
    </div>
  );
}
\`\`\`

Nega bu ishlamaydi? Ikkita asosiy sabab bor:
1. **Oddiy o'zgaruvchilar o'zgarganda React buni sezmaydi.** React ekranni qayta chizishi (re-render) uchun unga maxsus signal kerak.
2. **Qayta render bo'lganda oddiy o'zgaruvchilar yo'qoladi.** Agar React qandaydir sabab bilan komponentni qayta chizsa, \`let count = 0\` qatori yana ishga tushadi va hamma narsa noldan boshlanadi.

Endi buni React'ning \`useState\` yordamida to'g'rilaymiz:

\`\`\`jsx
// ✅ TO'G'RI AMALIYOT (DO)
import { useState } from 'react';

function GoodCounter() {
  // count - joriy holat, setCount - uni o'zgartiruvchi funksiya
  const [count, setCount] = useState(0); 

  function handleClick() {
    setCount(count + 1); // React'ga "state o'zgardi, ekranni yangila!" deymiz
  }

  return (
    <div>
      <h1>Sanoq: {count}</h1>
      <button onClick={handleClick}>Qo'shish</button>
    </div>
  );
}
\`\`\`

\`useState\` React'ga ikkita narsani ta'minlaydi:
1. Renderlar oralig'ida ma'lumotni **saqlab qoladi** (xotira).
2. Qiymat o'zgarganda ekranni yangilash uchun React'ni **uyg'otadi** (trigger).

---

## 3. State yangilanish sikli (Trigger -> Render -> Commit)

State o'zgarganda React qanday ishlaydi? Bu jarayon uch bosqichdan iborat:

1. **Triggering (Uyg'otish):** Siz \`setCount\` ni chaqirganingizda, React'ga komponentni qayta chizish kerakligini aytasiz.
2. **Rendering (Chizish):** React komponent funksiyasini *yangi* state qiymati bilan qaytadan ishga tushiradi va ekranda nima o'zgarishi kerakligini hisoblaydi.
3. **Committing (Joriy qilish):** React o'zgarishlarni olib, haqiqiy DOM'ga (brauzer ekraniga) kiritadi.

Quyidagi vizual diagramma orqali buni tushunish osonroq:

\`\`\`mermaid
flowchart TD
    A["Foydalanuvchi tugmani bosdi (onClick)"] --> B["setCount chaqirildi (Trigger)"]
    B --> C["Render bosqichi (Virtual DOM)"]
    C --> D["O'zgarishlarni solishtirish (Diffing)"]
    D --> E["Commit bosqichi (Haqiqiy DOM)"]
    E --> F["Foydalanuvchi yangi qiymatni ko'radi"]
    
    style A fill:#e0f7fa,stroke:#006064,stroke-width:2px
    style B fill:#ffe0b2,stroke:#e65100,stroke-width:2px
    style C fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    style E fill:#fce4ec,stroke:#880e4f,stroke-width:2px
\`\`\`

---

## 4. \`setState\`'ning asinxron tabiati (Asynchronous updates)

React'da state'ni o'zgartirganingizda, o'zgarish **darhol** sodir bo'lmaydi. React o'zgarishlarni yig'ib (batching), barchasini birdaniga bajaradi.

**Nega bunday?** Tasavvur qiling, restoranda ofitsiantga buyurtma beryapsiz. Ofitsiant har bir so'zingizdan keyin oshxonaga chopmaydi, balki to'liq buyurtmangizni yozib olib, keyin bitta borishda oshxonaga uzatadi. React ham xuddi shunday ishlaydi — bu **performanceni (ishlash tezligini)** oshiradi.

\`\`\`jsx
// ❌ YOMON TUSHUNCHA
function AsynchronousProblem() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count); // Bu yerda count HALI HAM 0 bo'ladi!
  }
}
\`\`\`

Bu kodda \`console.log(count)\` eski qiymatni chiqaradi, chunki \`setCount\` React'dan shunchaki kelajakda (keyingi renderda) o'zgartirishni so'raydi xolos.

---

## 5. Funksional State yangilash (Functional State Updates)

Siz bir vaqtning o'zida bir nechta state yangilanishini qilmoqchi bo'lsangiz nima bo'ladi?

\`\`\`jsx
// ❌ KUTILMAGAN NATIJA
function WrongMultipleUpdates() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // React: "Tushundim, count ni 0 + 1 = 1 qilaman"
    setCount(count + 1); // React: "Tushundim, count ni 0 + 1 = 1 qilaman"
    setCount(count + 1); // React: "Tushundim, count ni 0 + 1 = 1 qilaman"
  }
  // Natijada tugma bir marta bosilganda count 3 ga emas, faqat 1 ga oshadi!
}
\`\`\`

Yuqoridagi misolda \`count\` ning qiymati o'sha paytdagi render uchun *qotib qolgan* (\`0\`). Shu sababli uchala \`setCount\` ham faqat \`0 + 1\` buyrug'ini beryapti.

**Yechim:** State'ni avvalgi qiymatiga asoslanib yangilash uchun har doim **callback funksiya** (updater function) ishlatishingiz kerak:

\`\`\`jsx
// ✅ TO'G'RI YONDASHUV
function CorrectMultipleUpdates() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(prevCount => prevCount + 1); // prevCount: 0 => 1
    setCount(prevCount => prevCount + 1); // prevCount: 1 => 2
    setCount(prevCount => prevCount + 1); // prevCount: 2 => 3
  }
  // Endi tugma bosilganda count 3 ga oshadi!
}
\`\`\`

Qoida: Agar yangi state qiymati **oldingi state qiymatiga qaram bo'lsa**, doimo \`setCount(prev => prev + yangiQiymat)\` sintaksisidan foydalaning.

---

## 6. Obyektlar va Massivlarni State'da yangilash

JavaScript'da string, number yoki boolean (primitivlar) o'zgarmas (immutable). Lekin Object va Array'lar o'zgaruvchan (mutable). React'da **HECH QACHON** state obyektlarini to'g'ridan-to'g'ri mutatsiya qilmang!

\`\`\`jsx
// ❌ YOMON AMALIYOT (Mutatsiya)
const [user, setUser] = useState({ name: 'Ali', age: 20 });

function badUpdate() {
  user.age = 21; // XATO! State'ni to'g'ridan-to'g'ri o'zgartirish!
  setUser(user); // React o'zgarishni sezmaydi, chunki obyekt reference'i o'zgarmadi
}
\`\`\`

Buning o'rniga doimo **Spread Operator (\`...\`)** yordamida yangi obyekt yoki massiv yarating:

\`\`\`jsx
// ✅ TO'G'RI AMALIYOT (Immutability)
function goodUpdate() {
  setUser({
    ...user, // eski obyekt xossalarini nusxalaymiz
    age: 21  // o'zgarishi kerak bo'lgan qismini ustidan yozamiz
  });
}
\`\`\`

Xuddi shunday massivlar uchun:
- Qo'shish: \`[...items, newItem]\`
- O'chirish: \`items.filter(item => item.id !== id)\`
- Yangilash: \`items.map(item => item.id === id ? updatedItem : item)\`

---

## 7. Eng yaxshi amaliyotlar va xatolar (Best practices and common pitfalls)

> [!TIP]
> **Keraksiz state'lardan qoching (Derived State).** 
> Agar biror ma'lumotni boshqa state yoki prop'dan hisoblab topish mumkin bo'lsa, uni alohida state qilib saqlamang.
> Masalan: \`firstName\` va \`lastName\` state'lari bo'lsa, \`fullName\` uchun uchinchi state yaratmang. Shunchaki \`const fullName = firstName + ' ' + lastName;\` deb hisoblang.

> [!WARNING]
> **State'ni render qismida yangilamang!**
> Agar komponent ichida to'g'ridan-to'g'ri \`setCount(count + 1)\` chaqirsangiz, u cheksiz siklga (infinite loop) tushib qoladi. (React render qiladi -> state yangilanadi -> yana render qiladi -> ...). State doim Event Handlerlar (masalan onClick) yoki Effectlar (\`useEffect\`) ichida yangilanishi kerak.

> [!IMPORTANT]
> **State qayerda turishi kerak?**
> Agar ikkita komponent bitta ma'lumotga ehtiyoj sezsa, state'ni ularning ota (parent) komponentiga olib chiqing (Lifting state up). Bu haqda keyingi darslarda batafsil gaplashamiz.

`,
  code: `import React, { useState } from "react";

export default function CounterApp() {
  // 1. State yaratamiz: count - joriy raqam, setCount - o'zgartiruvchi funksiya
  // Boshlang'ich qiymati 0
  const [count, setCount] = useState(0);

  // 2. Obyekt ko'rinishidagi State: user - foydalanuvchi ma'lumotlari
  const [user, setUser] = useState({ name: "Dasturchi", isHappy: true });

  // Funksiyalar
  const increment = () => {
    // To'g'ri usul: holatni oshirish uchun oldingi qiymatdan (prev) foydalanamiz
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    // Oldingi holatdan 1 ni ayiramiz
    setCount((prev) => prev - 1);
  };

  const toggleMood = () => {
    // Obyektli state ni yangilash:
    // Avval oldingi obyektni (prevUser) nusxalaymiz (...prevUser)
    // Keyin faqat kerakli maydonni (isHappy) teskarisiga (!prevUser.isHappy) o'zgartiramiz
    setUser((prevUser) => ({
      ...prevUser,
      isHappy: !prevUser.isHappy
    }));
  };

  return (
    <div style={{ textAlign: "center", padding: 30, fontFamily: "sans-serif" }}>
      <h2>1. Oddiy Hisoblagich (Counter)</h2>
      
      {/* Ekranga state o'zgaruvchisini (count) chiqaramiz. Noldan kichik bo'lsa qizil, yo'qsa yashil bo'ladi */}
      <h1 style={{ fontSize: 48, color: count < 0 ? "red" : "green" }}>{count}</h1>
      
      {/* Tugmalar bosilganda mos funksiyalar (decrement, increment) ishga tushadi */}
      <button onClick={decrement} style={btnStyle}>- Ayirish</button>
      <button onClick={() => setCount(0)} style={btnStyle}>Nol qilish</button>
      <button onClick={increment} style={btnStyle}>+ Qo'shish</button>

      <hr style={{ margin: "40px 0", borderColor: "#ddd" }} />

      <h2>2. Obyektli State</h2>
      {/* Obyekt ichidagi xususiyatlarni (name, isHappy) o'qish */}
      <p>Foydalanuvchi: <strong>{user.name}</strong></p>
      <p>Kayfiyati: <strong>{user.isHappy ? "Xursand 😄" : "Xafa 😢"}</strong></p>
      
      <button onClick={toggleMood} style={{ ...btnStyle, background: "#8e44ad", color: "white" }}>
        Kayfiyatni o'zgartirish
      </button>
    </div>
  );
}

// Tugmalar uchun umumiy CSS stillari
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
      title: "State yaratish va oddiy o'zgartirish",
      instruction: "`useState` yordamida `theme` nomli state yarating (boshlang'ich qiymati `'light'`). Tugma bosilganda state `'dark'` ga o'zgarishi kerak.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function ThemeSwitcher() {\n  // 1. theme nomli state yarating (default: 'light')\n  \n\n  return (\n    <div>\n      <h2>Hozirgi mavzu: {theme}</h2>\n      {/* 2. onClick hodisasida setTheme orqali 'dark' qiling */}\n      <button>Tungi rejimni yoqish</button>\n    </div>\n  );\n}",
      hint: "const [theme, setTheme] = useState('light'); deb yozing va tugmaga onClick={() => setTheme('dark')} qo'shing.",
      test: "if (!code.match(/const\\s+\\[\\s*theme\\s*,\\s*setTheme\\s*\\]\\s*=\\s*useState\\(\\s*['\"]light['\"]\\s*\\)/)) return 'theme state ni boshlang\\'ich qiymatini \\'light\\' qilib yarating.'; if (!code.includes('setTheme(')) return 'Tugmaga setTheme() funksiyasini ulamagansiz.'; return null;"
    },
    {
      id: 2,
      title: "Oddiy Hisoblagich (Counter) - Qo'shish",
      instruction: "`count` nomli state yarating (boshlang'ich qiymati 0). '+1 Qo`shish' tugmasi bosilganda sonni 1 taga oshiring.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <h2>Hisob: {count}</h2>\n      {/* onClick yordamida count ni 1 ga oshiring */}\n      <button>+1 Qo'shish</button>\n    </div>\n  );\n}",
      hint: "Tugmaga onClick={() => setCount(count + 1)} deb yozing.",
      test: "if (!code.match(/onClick\\s*=\\s*\\{\\s*\\(\\)\\s*=>\\s*setCount\\(\\s*count\\s*\\+\\s*1\\s*\\)\\s*\\}/) && !code.match(/onClick\\s*=\\s*\\{\\s*\\(\\)\\s*=>\\s*setCount\\(\\s*\\w+\\s*=>\\s*\\w+\\s*\\+\\s*1\\s*\\)\\s*\\}/)) return 'setCount yordamida count ga 1 qo\\'shing.'; return null;"
    },
    {
      id: 3,
      title: "Oldingi holat asosida yangilash (Callback)",
      instruction: "Hisoblagich uchun ayirish tugmasi berilgan. Xavfsiz usuldan (callback funksiyadan) foydalanib, `setCount` ichida oldingi qiymatdan (`prev`) 1 ni ayiring.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function DecrementCounter() {\n  const [count, setCount] = useState(10);\n\n  const decrement = () => {\n    // Callback usulidan (prev) => prev - 1 foydalanib ayiring\n    \n  };\n\n  return (\n    <div>\n      <h2>Hisob: {count}</h2>\n      <button onClick={decrement}>-1 Ayirish</button>\n    </div>\n  );\n}",
      hint: "setCount((prev) => prev - 1); deb yozing.",
      test: "if (!code.match(/setCount\\(\\s*\\(\\s*([a-zA-Z0-9_]+)\\s*\\)\\s*=>\\s*\\1\\s*-\\s*1\\s*\\)/) && !code.match(/setCount\\(\\s*([a-zA-Z0-9_]+)\\s*=>\\s*\\1\\s*-\\s*1\\s*\\)/)) return 'Callback usulidan (masalan: prev => prev - 1) foydalanmadingiz.'; return null;"
    },
    {
      id: 4,
      title: "Mantiqiy (Boolean) State - Ko'rsatish/Yashirish",
      instruction: "`isVisible` nomli boolean state yarating (boshlang'ich qiymati `false`). Tugma bosilganda bu state o'zining teskari qiymatiga (`!isVisible`) o'zgarsin.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function ToggleText() {\n  // Shu yerda isVisible state yarating\n  \n\n  return (\n    <div>\n      {/* Tugma bosilganda isVisible teskarisiga o'zgarsin */}\n      <button>Yashirin matnni ko'rish / yashirish</button>\n      \n      {isVisible && <p>Bu yashirin matn edi! 🎉</p>}\n    </div>\n  );\n}",
      hint: "const [isVisible, setIsVisible] = useState(false); va onClick={() => setIsVisible(!isVisible)} qilib yozing.",
      test: "if (!code.includes('useState(false)')) return 'isVisible state ni false bilan yarating.'; if (!code.includes('setIsVisible(!isVisible)') && !code.match(/setIsVisible\\(\\s*\\w+\\s*=>\\s*!\\w+\\s*\\)/)) return 'Tugma bosilganda qiymatni teskarisiga ( !isVisible ) o\\'zgartirish kerak.'; return null;"
    },
    {
      id: 5,
      title: "Input va State (Matn yozish)",
      instruction: "`text` nomli state yarating (boshlang'ich qiymati bo'sh matn `''`). Input maydoniga yozilganda `onChange` hodisasi orqali state ni yangilang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function TextInput() {\n  // text state yarating (default: '')\n  \n\n  return (\n    <div>\n      {/* value va onChange ni to'g'ri bog'lang */}\n      <input \n        type=\"text\" \n        placeholder=\"Ismingizni kiriting...\"\n      />\n      <p>Sizning ismingiz: {text}</p>\n    </div>\n  );\n}",
      hint: "const [text, setText] = useState(''); yarating. Inputga value={text} va onChange={(e) => setText(e.target.value)} bering.",
      test: "if (!code.includes('useState(\\'\\')') && !code.includes('useState(\"\")')) return 'Bo\\'sh matn (\\'\\') bilan state yarating.'; if (!code.match(/onChange\\s*=\\s*\\{\\s*\\(?[a-zA-Z0-9_]+\\)?\\s*=>\\s*setText\\([a-zA-Z0-9_]+\\.target\\.value\\)\\s*\\}/)) return 'Inputga onChange ulashda xatolik. e.target.value dan foydalaning.'; return null;"
    },
    {
      id: 6,
      title: "Obyektli State - Ismni o'zgartirish",
      instruction: "`user` obyekti state da saqlanmoqda. Ismni 'Ali' dan 'Vali' ga o'zgartiruvchi tugma ishlamayapti. `setUser` yordamida eskisidan nusxa olib (`...user`), faqat `name` ni yangilang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function UserProfile() {\n  const [user, setUser] = useState({ name: 'Ali', age: 25 });\n\n  const changeName = () => {\n    // Shu yerda to'g'ri setUser ni chaqiring\n    \n  };\n\n  return (\n    <div>\n      <p>Ism: {user.name}, Yosh: {user.age}</p>\n      <button onClick={changeName}>Ismni Vali qilish</button>\n    </div>\n  );\n}",
      hint: "setUser({ ...user, name: 'Vali' }); deb yozing.",
      test: "if (!code.match(/setUser\\(\\s*\\{\\s*\\.\\.\\.user\\s*,\\s*name\\s*:\\s*['\"]Vali['\"]\\s*\\}\\s*\\)/)) return 'Obyektdan ...user qilib nusxa olib, keyin name ni \\'Vali\\' qilib ko\\'rsating.'; return null;"
    },
    {
      id: 7,
      title: "Obyektli State - Yoshni oshirish (Callback bilan)",
      instruction: "`user` obyektining `age` xususiyatini 1 taga oshirish kerak. Callback usulidan foydalaning (oldingi obyektdan nusxa oling va `age` ni oshiring).",
      startingCode: "import React, { useState } from 'react';\n\nexport default function UserAge() {\n  const [user, setUser] = useState({ name: 'Hasan', age: 20 });\n\n  const growOlder = () => {\n    // setUser orqali prevUser dan nusxa olib, age ni 1 ga oshiring\n    setUser((prevUser) => ({\n      \n    }));\n  };\n\n  return (\n    <div>\n      <p>{user.name} {user.age} yoshda</p>\n      <button onClick={growOlder}>Tug'ilgan kun!</button>\n    </div>\n  );\n}",
      hint: "...prevUser qiling, vergul qo'yib age: prevUser.age + 1 deb yozing.",
      test: "if (!code.match(/\\.\\.\\.prevUser/)) return 'Eski obyektdan nusxa olish uchun ...prevUser qatnashishi shart.'; if (!code.match(/age\\s*:\\s*prevUser\\.age\\s*\\+\\s*1/)) return 'age xususiyatiga prevUser.age + 1 ni o\\'rnatmadingiz.'; return null;"
    },
    {
      id: 8,
      title: "Massivli (Array) State - Element qo'shish",
      instruction: "`tasks` degan massiv state bor. Unga yangi 'Uxlash' vazifasini qo'shish kerak. Massivni to'g'ridan-to'g'ri `push` qilib bo'lmaydi. Spread (`...tasks`) orqali nusxa oling va oxiriga qo'shing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function TodoList() {\n  const [tasks, setTasks] = useState(['Dars qilish', 'Ovqatlanish']);\n\n  const addTask = () => {\n    // setTasks orqali 'Uxlash' ni oxiriga qo'shing\n    \n  };\n\n  return (\n    <div>\n      <ul>{tasks.map((t, i) => <li key={i}>{t}</li>)}</ul>\n      <button onClick={addTask}>Vazifa qo'shish</button>\n    </div>\n  );\n}",
      hint: "setTasks([...tasks, 'Uxlash']); deb yozing.",
      test: "if (!code.match(/setTasks\\(\\s*\\[\\s*\\.\\.\\.tasks\\s*,\\s*['\"]Uxlash['\"]\\s*\\]\\s*\\)/)) return 'Eski massivdan nusxa olib ([...tasks, \\'Uxlash\\']), setTasks ga berishingiz kerak.'; return null;"
    },
    {
      id: 9,
      title: "Massivli State - Element o'chirish",
      instruction: "`numbers` massividan `2` raqamini o'chirib tashlash kerak. `filter` metodidan foydalanib massivni yangilang va `setNumbers` ga bering.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function NumberList() {\n  const [numbers, setNumbers] = useState([1, 2, 3, 4]);\n\n  const removeTwo = () => {\n    // filter yordamida 2 dan tashqari raqamlarni olib, setNumbers ga bering\n    \n  };\n\n  return (\n    <div>\n      <p>Raqamlar: {numbers.join(', ')}</p>\n      <button onClick={removeTwo}>2 ni o'chirish</button>\n    </div>\n  );\n}",
      hint: "setNumbers(numbers.filter(num => num !== 2)); deb yozing.",
      test: "if (!code.match(/setNumbers\\(\\s*numbers\\.filter\\(/)) return 'numbers.filter() metodidan foydalanib yangi massiv yarating.'; if (!code.includes('!== 2')) return '2 ga teng bo\\'lmagan elementlarni qoldirish kerak (!== 2).'; return null;"
    },
    {
      id: 10,
      title: "Bitta komponentda bir nechta State lar",
      instruction: "Komponentda bir nechta `useState` ishlatish mumkin. `title` (matn) va `price` (son) uchun alohida state lar yarating. Boshlang'ich qiymatlari mos ravishda `'Olma'` va `5000` bo'lsin.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function Product() {\n  // 1. title state yarating (default: 'Olma')\n  \n  // 2. price state yarating (default: 5000)\n  \n\n  return (\n    <div>\n      <h2>Mahsulot: {title}</h2>\n      <p>Narxi: {price} so'm</p>\n    </div>\n  );\n}",
      hint: "const [title, setTitle] = useState('Olma'); va const [price, setPrice] = useState(5000); deb alohida qatorlarda yozing.",
      test: "if (!code.match(/const\\s+\\[\\s*title\\s*,\\s*setTitle\\s*\\]\\s*=\\s*useState\\(\\s*['\"]Olma['\"]\\s*\\)/)) return 'title nomli state ni \\'Olma\\' qilib yarating.'; if (!code.match(/const\\s+\\[\\s*price\\s*,\\s*setPrice\\s*\\]\\s*=\\s*useState\\(\\s*5000\\s*\\)/)) return 'price nomli state ni 5000 qilib yarating.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega oddiy JavaScript o'zgaruvchisi o'rniga aynan useState ishlatamiz?",
      options: [
        "Oddiy o'zgaruvchilar faqat bir marta ishlatiladi.",
        "Tashqi ko'rinishi chiroyliroq bo'lishi uchun.",
        "Chunki oddiy o'zgaruvchi o'zgarganini React bilolmaydi. State o'zgarsa React ekranni avtomatik yangilaydi (Re-render).",
        "Oddiy o'zgaruvchilarga raqam saqlab bo'lmaydi."
      ],
      correctAnswer: 2,
      explanation: "useState orqali ma'lumot o'zgarganda, React bu komponentni va unga bog'liq bo'lgan HTML ni qaytadan chizib (re-render) yangilangan holatda ko'rsatadi."
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
      explanation: "React State qat'iyan IMMUTABLE (O'zgarmas) bo'lishi shart. Obyekt yoki massivning ichidagi bitta qiymatni o'zgartirish uchun avval eskisidan nusxa olib, keyin yepyangi nusxa obyekt yuborish kerak."
    },
    {
      question: "useState() funksiyasi o'zidan qanday ma'lumot turini qaytaradi?",
      options: [
        "Faqat bitta obyekt",
        "Massiv (Array) - ikkita elementdan iborat",
        "Mantiqiy qiymat (true/false)",
        "Oddiy son (Number)"
      ],
      correctAnswer: 1,
      explanation: "useState() chaqirilganda har doim 2 ta elementdan iborat massiv qaytaradi: [hozirgiQiymat, yangilashFunksiyasi]."
    },
    {
      question: "const [count, setCount] = useState(0) qatoridagi '0' nimani bildiradi?",
      options: [
        "Maksimal ruxsat etilgan miqdorni",
        "count o'zgaruvchisining boshlang'ich (dastlabki) qiymatini",
        "Massivning 0-indeksini",
        "Xatolik kodini"
      ],
      correctAnswer: 1,
      explanation: "useState() ichiga yozilgan qiymat (masalan, 0) bu state ning ilk marta ekranga chiqqanda oladigan boshlang'ich qiymatidir (Initial Value)."
    },
    {
      question: "Komponentda State ni eskisiga tayanib (masalan 1 ni qo'shish) yangilashning eng xavfsiz yo'li qaysi?",
      options: [
        "setCount(count + 1)",
        "count = count + 1",
        "setCount((prev) => prev + 1) kabi Callback funksiya yordamida",
        "setCount(1)"
      ],
      correctAnswer: 2,
      explanation: "Agar state ketma-ket tez yangilansa (asinxronlik), React oxirgi qiymatni to'g'ri hisoblashi uchun funksiyali (callback) usul eng aniq va xavfsiz hisoblanadi."
    },
    {
      question: "Bitta React komponenti ichida nechta useState chaqirish mumkin?",
      options: [
        "Faqat 1 ta",
        "Ko'pi bilan 3 ta",
        "Faqat obyektlar uchun bitta",
        "Istalgancha, cheklov yo'q"
      ],
      correctAnswer: 3,
      explanation: "Bitta komponentda xohlagancha state yarata olasiz: const [name, setName] = useState('') va boshqalar."
    },
    {
      question: "React dagi Hook larni (masalan useState ni) qayerda chaqirish qat'iyan man etiladi?",
      options: [
        "Komponentning eng yuqori qismida",
        "If, for shartlari va sikllar ichida, yoki oddiy funksiyalarda",
        "Importlardan keyin darhol",
        "Komponent parametrlarida"
      ],
      correctAnswer: 1,
      explanation: "React Hook lari har doim komponentning eng yuqori darajasida (top level) va faqat React funksional komponentlari ichida chaqirilishi kerak. Ularni if() yoki for() ichida yozish xato beradi."
    },
    {
      question: "setCount(count + 1) va count = count + 1 ning nima farqi bor?",
      options: [
        "Ikkalasi ham bir xil ishlaydi.",
        "count = count + 1 da xotira butunlay o'chib ketadi.",
        "setCount React ga o'zgarish bo'lganini xabar qilib ekranni yangilaydi, count = count + 1 esa ekranni yangilamaydi.",
        "setCount faqat matnlar uchun ishlatiladi."
      ],
      correctAnswer: 2,
      explanation: "React faqat o'zining setter funksiyalari (setCount, setName) orqali yuborilgan buyruqlarnigina eshitadi va re-render amaliyotini bajaradi."
    },
    {
      question: "Boolean (mantiqiy) state larda ochish/yopish kabi amallarni qanday yangilash qulayroq?",
      options: [
        "setIsOpen(true) deb keyin setIsOpen(false) yozish",
        "setIsOpen(!isOpen)",
        "setIsOpen('ochiq')",
        "isOpen = !isOpen"
      ],
      correctAnswer: 1,
      explanation: "Qiymatni doimiy ravishda teskarisiga aylantirish uchun (!) NOT operatoridan foydalanish eng qisqa va qulay usuldir (Toggle mexanizmi)."
    },
    {
      question: "Massivli (Array) state dan bitta elementni o'chirib tashlash uchun qaysi array metodidan foydalanish tavsiya qilinadi?",
      options: [
        "splice()",
        "pop()",
        "filter()",
        "delete"
      ],
      correctAnswer: 2,
      explanation: "splice() va pop() kabi metodlar asl massivni to'g'ridan-to'g'ri o'zgartiradi (Mutatsiya qiladi). filter() esa shartga moslarini ajratib olib YEPYANGI massiv qaytaradi. State da har doim yangi nusxa kerak."
    },
    {
      question: "Props va State o'rtasidagi eng katta farq nima?",
      options: [
        "Props faqat klasslarda, State funksional komponentlarda ishlatiladi.",
        "Props ni o'zgartirib bo'lmaydi (Read-only) va u tashqaridan keladi. State ni esa komponent o'zi boshqaradi va o'zgartira oladi.",
        "State ni o'zgartirib bo'lmaydi, Props esa o'zgaruvchan.",
        "Ular o'rtasida farq yo'q, nomlari har xil xolos."
      ],
      correctAnswer: 1,
      explanation: "Props — bu parametr (argument), uni otasi beradi va bola uni o'zgartira olmaydi. State — bu xotira, u komponentning o'zida yashaydi va o'zgarishi mumkin."
    },
    {
      question: "State qiymati o'zgarganda qaysi jarayon sodir bo'ladi?",
      options: [
        "Sahifa to'liq yangilanadi (Reload page)",
        "Brauzer yopilib qoladi",
        "O'sha komponent va uning bolalari yangi State ma'lumotlari bilan qaytadan chiziladi (Re-render)",
        "Hech narsa sodir bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "State ning qudrati shundaki, u o'zgargan zahoti React virtual DOM orqali mos keluvchi joylarni ekranda avtomatik ravishda yangilaydi (Re-render)."
    }
  ]
};

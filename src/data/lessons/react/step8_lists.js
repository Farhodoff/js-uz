export const step8_lists = {
  title: "8-DARS: Ro'yxatlar va Shartli Render",
  content: `
# 1. 🔄 Ro'yxatlarni (Lists) chizish

Dasturlashda ko'pincha serverdan (API dan) massiv (array) ko'rinishida ma'lumotlar keladi. Biz ularni React da aylanib chiqish (iterate) va har biri uchun alohida komponent yoki UI element chizishimiz kerak.

Buning uchun standart JavaScript metodlaridan **\`map()\`** eng ko'p qo'llaniladi.

\`\`\`jsx
const mevalar = ["Olma", "Banan", "Gilos"];

return (
  <ul>
    {mevalar.map((meva) => (
      <li key={meva}>{meva}</li>
    ))}
  </ul>
)
\`\`\`

---

## 2. 🔑 "Key" propining muhimligi

Tepadagi misolda e'tibor bersangiz, \`<li>\` tegiga \`key\` nomli atribut (prop) berilgan.

**Nima uchun \`key\` shart?**
Agar array dagi elementlar o'rni almashsa, o'chirilsa yoki yangi element qo'shilsa, React ro'yxatni qanday tezkor yangilashni bilishi kerak. \`key\` aynan shu identifikasiyani (ID) ta'minlaydi.
U React dagi **Virtual DOM** ga farqlarni tez topib, faqatgina o'zgargan qismini ekranga chizishiga katta yordam beradi.

❌ **Index'ni key sifatida ishlatish xatosi:**
Boshlovchilar ko'pincha \`map((item, index))\` deb \`index\` ni \`key\` ga berishadi. Agar ro'yxat qat'iy (static) bo'lsa, bu ishlaydi. Lekin ro'yxat tartibi o'zgarsa (element qo'shilsa/o'chirilsa), barcha index'lar o'zgarib ketadi, oqibatda React adashib ketib inputdagi qiymatlarni yo'qotishi yoki ilovani sekinlashtirishi mumkin. Doim noyob \`id\` lardan foydalaning!

---

## 3. 🎭 Shartli Render (Conditional Rendering)

Ko'pincha qandaydir shart bajarilgandagina nimanidir ekranda ko'rsatish talab qilinadi. React'da buni 3 xil usulda amalga oshirish mumkin:

### 1-usul: Odatdagi \`if / else\` (JSX dan tashqarida)
Agar mantiq juda murakkab bo'lsa, uni \`return\` qilishdan oldin ishlatgan ma'qul.
\`\`\`jsx
if (isLoading) {
  return <h2>Yuklanmoqda... Kuting!</h2>;
}
return <h2>Ma'lumotlar tayyor.</h2>;
\`\`\`

### 2-usul: Ternary Operator \`? :\` (JSX ichida)
Ikki xil holatni bitta qatorda yozish uchun:
\`\`\`jsx
return (
  <div>
    {isOnline ? <p>Tizimda 🟢</p> : <p>Oflayn 🔴</p>}
  </div>
);
\`\`\`

### 3-usul: Logical AND \`&&\` (JSX ichida)
Faqat shart to'g'ri bo'lsagina ko'rsatish, aks holda hech narsa qilmaslik uchun:
\`\`\`jsx
return (
  <div>
    {unreadMessages > 0 && <p>Sizda o'qilmagan xabarlar bor!</p>}
  </div>
);
\`\`\`

---

## 4. 🧹 Ro'yxatni Filtrlash (\`filter\`)

React'da massivdan qaysidir ma'lumotni **o'chirish** yoki **saralash** uchun \`filter()\` ishlatiladi. Esingizda bo'lsin: State doimo O'zgarmas (Immutable) dir! \`splice()\` ishlata ko'rmang!

\`\`\`jsx
const handleDelete = (id) => {
  // id ga teng bo'lmagan qolgan barcha elementlarni qaytaradi
  const updatedList = list.filter(item => item.id !== id);
  setList(updatedList); // State ni yangilaymiz
};
\`\`\`

## 🧠 Chuqurlashtirilgan Nazariya: Nima uchun "key" bunchalik muhim?

React ekrandagi o'zgarishlarni tezroq va samaraliroq chizish uchun **Diffing Algoritmi**dan (yoki *Reconciliation*) foydalanadi. React eski va yangi Virtual DOM-ni solishtirib, faqatgina o'zgargan joylarni haqiqiy DOM-ga o'tkazadi. 

Agar siz ro'yxatga yangi element qo'shsangiz yoki o'rnini o'zgartirsangiz, React qaysi element qaerdaligini tushunishga qiynaladi. Aynan shu joyda \`key\` yordamga keladi!

### 🔑 "key" ishlatilmaganda nima bo'ladi?
Faraz qilaylik, biz ro'yxatning **boshiga** yangi element qo'shdik. React birinchi element o'zgarganini ko'radi, keyin ikkinchisini, keyin uchinchisini... U aslida ro'yxatga bitta element qo'shilganini bilmaydi va barcha elementlarni **boshidan oxirigacha yangitdan chizib chiqadi (re-render)**. Bu juda samarasiz!

### 🔑 "key" ishlatilganda nima bo'ladi?
\`key\` (noyob identifikator) orqali React tushunadiki: *"Aha, eski ro'yxatdagi id=1, id=2 bo'lgan elementlar joyida qolibdi, faqat id=3 degan yangi element oldinga qo'shilibdi!"*. Natijada faqat bittagina yangi element DOM-ga qo'shiladi. Qolganlari faqat o'rnini siljitadi xolos.

Quyidagi diagrammada ushbu jarayon qanday ishlashi ko'rsatilgan:

\`\`\`mermaid
flowchart TD
    subgraph "Noyob 'key' ISHLATILMAGANDA (Index bilan)"
    A1[Eski ro'yxat:<br/>1. Olma<br/>2. Banan] --> B1[Yangi ro'yxatga Gilos qo'shildi:<br/>1. Gilos<br/>2. Olma<br/>3. Banan]
    B1 --> C1{React tekshiradi:<br/>1-element o'zgardimi?}
    C1 -- "Ha (Olma -> Gilos)" --> D1[1-elementni yangilaydi]
    D1 --> E1{2-element o'zgardimi?}
    E1 -- "Ha (Banan -> Olma)" --> F1[2-elementni yangilaydi]
    F1 --> G1[Oxirida 3-elementni noldan yaratadi]
    G1 --> H1((Natija: <br/>Barcha elementlar <br/>qayta chizildi! ❌))
    end

    subgraph "Noyob 'key' ISHLATILGANDA (ID bilan)"
    A2[Eski ro'yxat:<br/>id:1 - Olma<br/>id:2 - Banan] --> B2[Yangi ro'yxatga Gilos qo'shildi:<br/>id:3 - Gilos<br/>id:1 - Olma<br/>id:2 - Banan]
    B2 --> C2{React 'key' larni tekshiradi}
    C2 -- "id:1 va id:2 mavjud" --> D2[Olma va Bananni joyini o'zgartiradi xolos]
    C2 -- "id:3 bu yangi" --> E2[Faqat Gilosni noldan chizadi]
    D2 & E2 --> F2((Natija: <br/>Juda tez va samarali <br/>yangilanish! ✅))
    end
    
    style H1 fill:#f9d0c4,stroke:#e74c3c,stroke-width:2px,color:#000
    style F2 fill:#d4efdf,stroke:#27ae60,stroke-width:2px,color:#000
\`\`\`

> **Xulosa:** Hech qachon ro'yxat indeksini (index) \`key\` sifatida ulamang, agar ro'yxatingiz tartibi o'zgarishi, filtrlanishi yoki unga yangi element qo'shilishi mumkin bo'lsa. Doim bazadan kelayotgan noyob id'ni ishlating!
`,
  code: `import React, { useState } from "react";

export default function UsersList() {
  // Boshlang'ich ro'yxat (State)
  const [users, setUsers] = useState([
    { id: 1, name: "Farhod", isBanned: false },
    { id: 2, name: "Ali", isBanned: true },
    { id: 3, name: "Malika", isBanned: false },
    { id: 4, name: "Zebo", isBanned: false }
  ]);

  // Foydalanuvchini o'chirish (Filter)
  const deleteUser = (idToDelete) => {
    // Tanlangan id dan tashqari hamma userlarni saqlab qolamiz
    setUsers(users.filter((user) => user.id !== idToDelete));
  };

  // Foydalanuvchini ban qilish / bandan ochish (Map yordamida obyektni yangilash)
  const toggleBan = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, isBanned: !user.isBanned }; // holatini teskarisiga o'zgartiramiz
      }
      return user; // Qolganlarini o'zgarishsiz qaytaramiz
    });
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Barcha Foydalanuvchilar</h2>
      
      {/* 1. Shartli Render (Logical AND) - Agar ro'yxat bo'shab qolsa */}
      {users.length === 0 && (
        <div style={{ padding: 15, background: "#f8d7da", color: "#721c24", borderRadius: 5 }}>
          Afsuski, hech qanday foydalanuvchi qolmadi 😔
        </div>
      )}

      {/* 2. Ro'yxatni ekranga chizish (Map) */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          // Eng muhim narsa: UNIKAL KEY
          <li 
            key={user.id} 
            style={{ 
              padding: 15, 
              borderBottom: "1px solid #ddd", 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              // Shartli styling (ban qilinganlarning foni qizilroq)
              background: user.isBanned ? "#fff3f3" : "#fff"
            }}
          >
            <div>
              <strong style={{ fontSize: 18, textDecoration: user.isBanned ? "line-through" : "none" }}>
                {user.name}
              </strong>
              
              {/* Shartli Render (Ternary) */}
              <span style={{ marginLeft: 10, fontSize: 12 }}>
                {user.isBanned ? "❌ Bloklangan" : "✅ Faol"}
              </span>
            </div>

            <div>
              <button 
                onClick={() => toggleBan(user.id)}
                style={{ padding: "5px 10px", marginRight: 10, cursor: "pointer" }}
              >
                {user.isBanned ? "Qulfdan ochish" : "Ban berish"}
              </button>
              
              <button 
                onClick={() => deleteUser(user.id)}
                style={{ padding: "5px 10px", background: "#e74c3c", color: "white", border: "none", cursor: "pointer" }}
              >
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Oddiy ro'yxat chizish",
      instruction: "Berilgan `fruits` massivini aylanib chiqib, har bir meva nomini `<li>` tegida chizing. `key` sifatida mevaning o'zini ishlating.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const fruits = ['Olma', 'Banan', 'Gilos'];\n  return (\n    <ul>\n      {/* Shu yerda fruits massivini map qiling */}\n    </ul>\n  );\n}",
      hint: "`fruits.map(fruit => <li key={fruit}>{fruit}</li>)` dan foydalaning.",
      test: "if (!code.includes('.map')) return 'map metodidan foydalanmadingiz.'; if (!code.includes('key=')) return 'key propini ishlatmadingiz.'; return null;"
    },
    {
      id: 2,
      title: "Obyektlar ro'yxati",
      instruction: "`users` massivi berilgan. Har bir foydalanuvchining ismini `<li>` ichida chiqaring. `key` sifatida obyektning `id` sini ishlating.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const users = [{id: 1, name: 'Ali'}, {id: 2, name: 'Vali'}];\n  return (\n    <ul>\n      {/* Shu yerda users ni map qiling */}\n    </ul>\n  );\n}",
      hint: "`users.map(user => <li key={user.id}>{user.name}</li>)` dan foydalaning.",
      test: "if (!code.includes('user.name')) return 'Foydalanuvchi ismini (user.name) ekranga chiqarmadingiz.'; if (!code.includes('user.id')) return 'key uchun user.id ishlatilmadi.'; return null;"
    },
    {
      id: 3,
      title: "Shartli render: && operatori",
      instruction: "`unreadCount` o'zgaruvchisi 0 dan katta bo'lsa, `<p>Yangi xabarlar bor</p>` xabarini chiqaring.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const unreadCount = 3;\n  return (\n    <div>\n      {/* Shartni shu yerda yozing */}\n    </div>\n  );\n}",
      hint: "`unreadCount > 0 && <p>Yangi xabarlar bor</p>` shaklida yozing.",
      test: "if (!code.includes('unreadCount > 0') && !code.includes('unreadCount>0')) return 'unreadCount 0 dan kattaligini tekshirmadingiz.'; return null;"
    },
    {
      id: 4,
      title: "Ternary operator",
      instruction: "`isLoggedIn` holatiga qarab ekranga turlicha yozuv chiqaring. Agar true bo'lsa, `<h2>Xush kelibsiz!</h2>`, agar false bo'lsa `<h2>Iltimos, kiring</h2>` yozuvi chiqsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const isLoggedIn = true;\n  return (\n    <div>\n      {/* Ternary operator ishlating */}\n    </div>\n  );\n}",
      hint: "`isLoggedIn ? <h2>Xush kelibsiz!</h2> : <h2>Iltimos, kiring</h2>`",
      test: "if (!code.includes('?') || !code.includes(':')) return 'Ternary operatordan (? va :) foydalanilmadi.'; return null;"
    },
    {
      id: 5,
      title: "Komponentlar ro'yxati",
      instruction: "`tasks` massivini aylanib chiqib, har bir vazifa uchun `<TaskItem>` komponentini chizing. `TaskItem` ga `task={task}` tarzida prop bering va `key` qilib `task.id` ni ishlating.",
      startingCode: "import React from 'react';\n\nfunction TaskItem({ task }) {\n  return <li>{task.title}</li>;\n}\n\nexport default function App() {\n  const tasks = [{id: 1, title: 'Dars qilish'}, {id: 2, title: 'Kitob o\\'qish'}];\n  return (\n    <ul>\n      {/* TaskItem larni shu yerda map qiling */}\n    </ul>\n  );\n}",
      hint: "`tasks.map(task => <TaskItem key={task.id} task={task} />)`",
      test: "if (!code.includes('<TaskItem')) return 'TaskItem komponentini chizmadingiz.'; return null;"
    },
    {
      id: 6,
      title: "Ro'yxatni filtrlash",
      instruction: "Berilgan `numbers` massivini chizishdan oldin faqat juft sonlarni qoldiring va keyin `.map()` orqali `<li>` larda ekranga chiqaring. `key` sifatida sonning o'zini ishlating.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const numbers = [1, 2, 3, 4, 5, 6];\n  return (\n    <ul>\n      {/* Avval filter, keyin map ishlating */}\n    </ul>\n  );\n}",
      hint: "`numbers.filter(n => n % 2 === 0).map(n => <li key={n}>{n}</li>)`",
      test: "if (!code.includes('.filter')) return 'Ro\\'yxatni filtrlash uchun .filter metodidan foydalanmadingiz.'; return null;"
    },
    {
      id: 7,
      title: "Elementni o'chirish",
      instruction: "`items` ro'yxatida har bir element yonida 'O\\'chirish' tugmasi bo'lsin. Tugma bosilganda o'sha elementni id orqali ro'yxatdan olib tashlovchi `handleDelete(item.id)` funksiyasini yozing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [items, setItems] = useState([{id: 1, text: 'A'}, {id: 2, text: 'B'}]);\n\n  const handleDelete = (id) => {\n    // Shu yerda filter orqali o'chiring\n  };\n\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={item.id}>\n          {item.text} <button onClick={() => handleDelete(item.id)}>O'chirish</button>\n        </li>\n      ))}\n    </ul>\n  );\n}",
      hint: "`setItems(items.filter(item => item.id !== id))` tarzida yozing.",
      test: "if (!code.includes('.filter(')) return 'O\\'chirish uchun .filter ishlatmadingiz.'; return null;"
    },
    {
      id: 8,
      title: "Shartli stillar (Styling)",
      instruction: "`todos` massivini chizing. Agar todo ning `completed` xususiyati true bo'lsa, uning matni o'chirilgan (`textDecoration: 'line-through'`) bo'lsin, aks holda `none` bo'lsin.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const todos = [{id: 1, text: 'Xarid', completed: true}, {id: 2, text: 'Sport', completed: false}];\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id} style={{ textDecoration: 'none' /* shartli yozing */ }}>\n          {todo.text}\n        </li>\n      ))}\n    </ul>\n  );\n}",
      hint: "`style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}` qilib yozing.",
      test: "if (!code.includes('line-through')) return 'line-through qiymatini ko\\'rsatmadingiz.'; return null;"
    },
    {
      id: 9,
      title: "Shartli klasslar",
      instruction: "`isActive` propiga qarab elementning klassini aniqlang. Agar `isActive` true bo'lsa, `className` ga 'active', false bo'lsa 'inactive' bering.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const isActive = true;\n  return (\n    <div className={/* shartli klass yozing */ ''}>\n      Holat\n    </div>\n  );\n}",
      hint: "`className={isActive ? 'active' : 'inactive'}` dan foydalaning.",
      test: "if (!code.includes('active') || !code.includes('inactive')) return 'Klass nomlarini to\\'g\\'ri bermadingiz.'; return null;"
    },
    {
      id: 10,
      title: "Ro'yxatdagi elementni yangilash",
      instruction: "`toggleComplete` funksiyasida `map` orqali massivni aylanib chiqib, id si mos kelgan ob'ektning `completed` qiymatini teskarisiga (`!completed`) o'zgartiring va state ni yangilang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [tasks, setTasks] = useState([{id: 1, title: 'Test', completed: false}]);\n\n  const toggleComplete = (id) => {\n    // tasks ni map qilib, mos id dagi completed ni o'zgartiring\n    \n  };\n\n  return (\n    <ul>\n      {tasks.map(t => (\n        <li key={t.id} onClick={() => toggleComplete(t.id)}>{t.title}</li>\n      ))}\n    </ul>\n  );\n}",
      hint: "setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));",
      test: "if (!code.includes('!t.completed') && !code.includes('!task.completed') && !code.includes('!item.completed')) return 'completed qiymatini teskarisiga o\\'zgartirmadingiz.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React'da ro'yxatlarni chizish uchun qaysi massiv metodi eng ko'p ishlatiladi?",
      options: [
        ".map()",
        ".forEach()",
        ".reduce()",
        ".filter()"
      ],
      correctAnswer: 0,
      explanation: "React JSX ichida yangi elementlar massivini qaytarishi kerak, `.map()` metodi aynan har bir element uchun yangi JSX element qaytaradi."
    },
    {
      question: "key propining asosiy vazifasi nima?",
      options: [
        "Brauzerga massiv elementlari sonini bildirish.",
        "React'ga qaysi element o'zgargani, o'chirilgani yoki qo'shilganini farqlashga (diffing) yordam berish.",
        "Faqat xatoliklarni oldini olish, u hech narsaga ta'sir qilmaydi.",
        "Boshqa komponentlarga ma'lumot uzatish."
      ],
      correctAnswer: 1,
      explanation: "key React'ning Virtual DOM da qaysi tugunlar qanday o'zgarganini tezroq aniqlashi uchun yordam beruvchi noyob identifikator hisoblanadi."
    },
    {
      question: "Ro'yxat elementlari uchun qanday qiymatni key sifatida ishlatish tavsiya etilmaydi?",
      options: [
        "Obyektning noyob ID si (masalan, bazadagi ID)",
        "Massiv indekslari (index), agar massiv tartibi o'zgarishi mumkin bo'lsa",
        "uuid kutubxonasi orqali generatsiya qilingan id (ma'lumot yaratilayotganda)",
        "Barchasi xato"
      ],
      correctAnswer: 1,
      explanation: "Massiv indekslari ishlatilganda, massiv elementlari o'rni almashsa yoki element o'chirilsa, index'lar o'zgarib ketadi. Bu React ni chalg'itishi va bug'larga olib kelishi mumkin."
    },
    {
      question: "Shartli render qilishning && (Logical AND) operatori orqali qanday ishlanadi?",
      options: [
        "Faqatgina shart xato bo'lganda elementni ko'rsatadi",
        "Shart true bo'lsa elementni ko'rsatadi, aks holda hech nima qilmaydi",
        "Bir vaqtning o'zida ikkita har xil elementni ko'rsatadi",
        "JSX da && operatori ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "condition && <Element/> ko'rinishida yozilganda, agar condition true bo'lsa <Element/> chiziladi, false bo'lsa umuman e'tiborga olinmaydi."
    },
    {
      question: "Ternary operator (? :) qanday vazifani bajaradi?",
      options: [
        "Bir qator ichida if/else mantiqini yozish uchun ishlatiladi.",
        "Ikkita massivni birlashtirish uchun xizmat qiladi.",
        "Funksiyaga parametr uzatishda ishlatiladi.",
        "Bu operator faqat stringlar bilan ishlaydi."
      ],
      correctAnswer: 0,
      explanation: "Ternary operator shartga qarab ikkita holatdan birini tanlaydi: shart ? true_bo'lsa : false_bo'lsa."
    },
    {
      question: "Qaysi holatda odatdagi if / else bilan shartli render qilish ma'qul?",
      options: [
        "Ro'yxat elementlari ichida",
        "Inline stillar berayotganda",
        "Agar butun bir komponentni boshqacha chizish yoki murakkab mantiq talab qilinsa, JSX dan tashqarida",
        "React da if / else ishlatish umuman mumkin emas"
      ],
      correctAnswer: 2,
      explanation: "Murakkab yoki butunlay boshqa view chizish kerak bo'lganda komponent qaytarish (return) dan oldin if / else ishlatish kodning o'qilishini osonlashtiradi."
    },
    {
      question: "React state dagi massivdan elementni o'chirishning to'g'ri usuli qaysi?",
      options: [
        "list.splice(index, 1); setList(list);",
        "setList(list.filter(item => item.id !== id))",
        "list.pop(); setList(list);",
        "delete list[index]; setList(list);"
      ],
      correctAnswer: 1,
      explanation: "React da state immutable (o'zgarmas) bo'lishi shart. filter yangi massiv qaytaradi va state ni mutatsiya qilmasdan xavfsiz yangilaydi. splice, pop kabi metodlar esa bor massivni o'zgartiradi va bu xato hisoblanadi."
    },
    {
      question: "JSX ichida quyidagi kod nima qaytaradi: {false && <h1>Assalom</h1>}?",
      options: [
        "xatolik yuz beradi",
        "Hech narsa ekranga chiqmaydi (bo'sh qoladi)",
        "Assalom yozuvi",
        "false so'zi ekranga chiqadi"
      ],
      correctAnswer: 1,
      explanation: "false && ifoda ifodada boolean false qaytaradi, React esa boolean qiymatlarni (true, false) ekranga chizmaydi va uni e'tiborsiz qoldiradi. (Lekin 0 kabi falsy raqamlar ekranga chiqib qolishi mumkin, shuning ehtiyot bo'lish kerak)."
    },
    {
      question: "Berilgan ob'ektlar massividan yangilangan bitta elementni state ga qanday saqlaymiz?",
      options: [
        ".map() bilan massivni aylanib, faqat kerakli ID li elementning xususiyatini o'zgartirib (nusxalab), qolganlarini shundayligicha qaytarib",
        "list[index].completed = true qilib, keyin setList(list) qilib",
        "Faqat o'sha ob'ektning o'zini set qilib",
        "Buning imkoni yo'q, yangi element qo'shish kerak"
      ],
      correctAnswer: 0,
      explanation: "React state-ni mutate qilmaslik uchun map orqali yangi array yaratiladi, o'zgarishi kerak bo'lgan obyekt spread operator (...) orqali nusxalanib o'zgartiriladi."
    },
    {
      question: "Quyidagi kodning natijasi nima? {message ? <div>Xabar: {message}</div> : null}",
      options: [
        "message o'zgaruvchisi mavjud va truthy bo'lsa div chiziladi, aks holda hech nima chizilmaydi.",
        "Xato beradi, chunki null qaytarish mumkin emas.",
        "Har doim div chiziladi, faqat message qismi bo'sh bo'ladi.",
        "message dan qat'i nazar doim null qaytadi."
      ],
      correctAnswer: 0,
      explanation: "Ternary operator ishlatilganda, agar message true bo'lsa div render qilinadi, false bo'lsa null render qilinadi (ya'ni ekranda hech narsa ko'rinmaydi)."
    },
    {
      question: "Ro'yxatda map metodidan foydalanganda har doim return bo'lishi shartmi?",
      options: [
        "Yo'q, return yozish mumkin emas.",
        "Ha, massivdagi har bir iteratsiya qaytarilgan elementlardan tashkil topgan yangi massiv hosil qilishi uchun.",
        "Faqatgina map ni oxirgi qatorda ishlatsak shart emas.",
        "Bu JavaScript versiyasiga bog'liq."
      ],
      correctAnswer: 1,
      explanation: "map() metodining xususiyati shundaki, u iteratsiya qilingan elementlarni qaytaradi (return). Agar return yozilmasa (yoki arrow functionda implicit return ishlatilmasa), massiv undefined elementlar bilan to'ladi va ekranga hech narsa chizilmaydi."
    },
    {
      question: "Quyidagi ifodada bo'sh ro'yxat uchun nima ko'rsatiladi: items.length ? <List items={items} /> : <EmptyState />",
      options: [
        "Bo'sh ro'yxat berilganda Error bo'ladi",
        "<EmptyState /> komponenti ko'rsatiladi",
        "<List items={items} /> komponenti ishlaydi",
        "Hech narsa ko'rinmaydi"
      ],
      correctAnswer: 1,
      explanation: "items.length bo'sh ro'yxat bo'lganda 0 ga teng bo'ladi (falsy qiymat). Ternary operatorning ikkinchi qismi, ya'ni <EmptyState /> bajariladi."
    }
  ]
};

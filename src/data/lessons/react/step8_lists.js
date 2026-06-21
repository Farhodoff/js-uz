export const step8_lists = {
  title: "8-DARS: Ro'yxatlar va Shartli Render",
  content: `
# React'da Ro'yxatlar (Lists) va Shartli Renderlash (Conditional Rendering)

Dasturlashda eng ko'p uchraydigan holatlardan biri bu — ma'lumotlar to'plamini (array) ekranga chiqarish va qandaydir shartlarga asosan ba'zi qismlarni yashirish yoki ko'rsatishdir. React bu ishlarni juda qulay va chiroyli usulda amalga oshirishga yordam beradi.

Ushbu darsda biz ro'yxatlarni qanday qilib to'g'ri renderlash, \`key\` propining siri, React'ning orqa fondagi Diffing algoritmi va shartli renderlashdagi muhim qoidalar haqida chuqur gaplashamiz.

---

## 1. Ro'yxatlarni renderlash: \`.map()\` qanday ishlaydi?

React'da HTML ro'yxatlarini yaratish uchun JavaScript'ning standart **\`.map()\`** metodidan foydalaniladi.

### 💡 Nega kerak?
Deylik, sizda 100 ta foydalanuvchi haqida ma'lumot bor. Har bir foydalanuvchi uchun alohida \`<UserCard />\` komponentini qo'lda yozib chiqish imkonsiz va xato. Bizga ma'lumotlarni aylanib chiqib, har bir ma'lumot uchun JSX qaytaradigan avtomatlashtirilgan mexanizm kerak. \`map\` aynan shu ishni bajaradi.

### 🍔 Real-hayot analogiyasi
Tasavvur qiling, siz pitsaxona oshpazisiz va oldingizda 10 xil pitsa retseptlari ro'yxati (Array) bor. Siz har bir retseptga (item) qarab, bir xil qolipdagi, lekin ichidagi masallig'i har xil bo'lgan pitsalarni (JSX) tayyorlab chiqasiz.

### ✅ Do's and ❌ Don'ts (Qanday qilish kerak va qanday emas?)

❌ **Yomon amaliyot (Don't)**: Odatda JavaScript'da \`for\` siklidan foydalanishga o'rganganmiz, lekin React JSX ichida \`for\` ishlata olmaysiz, chunki u expression (qiymat) emas, statement (buyruq) hisoblanadi.

\`\`\`jsx
// XATO: JSX ichida for loop ishlata olmaysiz!
function UserList({ users }) {
  return (
    <div>
      {for (let i = 0; i < users.length; i++) {
        return <p>{users[i].name}</p>
      }}
    </div>
  );
}
\`\`\`

✅ **To'g'ri amaliyot (Do)**: Har doim \`.map()\` dan foydalaning, chunki u asl arrayni o'zgartirmasdan, har bir element uchun yangi JSX elementlaridan iborat yangi array qaytaradi.

\`\`\`jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        // E'tibor bering: ro'yxat elementlariga doim 'key' kerak! (bu haqida pastroqda)
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

---

## 2. \`key\` prop'ining hal qiluvchi roli va React Diffing Algoritmi

Ro'yxatlarni render qilganingizda, React sizdan har bir element uchun takrorlanmas \`key\` (kalit) propini berishni talab qiladi. Agar bermasangiz, konsolda "Warning: Each child in a list should have a unique 'key' prop" degan qizil xatolikni ko'rasiz.

### 💡 Nega kerak?
React DOM'ni (ekranni) tezkorlik bilan yangilash uchun **Virtual DOM** va **Diffing algoritmi**dan foydalanadi. Qachonki state o'zgarsa, React eski ro'yxat va yangi ro'yxatni solishtiradi. Agar siz \`key\` bermasangiz, React ro'yxatga yangi element qo'shilganini, o'chirilganini yoki joyi almashganini tushunishga qiynaladi va butun ro'yxatni boshidan chizishiga to'g'ri keladi. Bu esa juda katta ishlash tezligi (performance) muammolariga olib keladi.

### 🍔 Real-hayot analogiyasi
Tasavvur qiling, 5 ta farzandingiz bor. Ularning pasporti yoki takrorlanmas ismlari yo'q. Faqat "1-farzand", "2-farzand" deb chaqirasiz. Agar eng kattasi uydan chiqib ketsa, qolgan hamma farzandlarning raqami o'zgarib ketadi (2-farzand 1-bo'lib qoladi va hokazo). Lekin ularning har birida "Pasport raqami" (\`key\`) bo'lsa, kim qayerga ketganini yoki yangi odam kelganini darhol aniqlaysiz.

### 📊 React Diffing Algoritmi: \`key\` bilan va \`key\` siz

Quyidagi Mermaid diagrammasi orqali React DOM'ni qanday yangilashini ko'rib chiqamiz:

\`\`\`mermaid
flowchart TD
    subgraph Without_Keys ["Key'lar ishlatilmaganda (YOMON)"]
        A1[Eski ro'yxat: <br/> 1. Olma <br/> 2. Banan]
        A2[Yangi ro'yxat: <br/> 1. Anor (yangi) <br/> 2. Olma <br/> 3. Banan]
        
        A1 -->|React 1-elementni tekshiradi| A3[Olma -> Anor ga o'zgardi <br> Yangilash]
        A1 -->|React 2-elementni tekshiradi| A4[Banan -> Olma ga o'zgardi <br> Yangilash]
        A1 -.->|React 3-elementni ko'radi| A5[Banan qo'shildi <br> Yaratish]
        
        A6[Xulosa: React hamma narsani o'zgartirib, <br/> qayta chizib chiqdi. Bu juda sekin!]
        A3 & A4 & A5 --> A6
    end

    subgraph With_Keys ["Key'lar bilan (YAXSHI)"]
        B1[Eski ro'yxat: <br/> id:1 Olma <br/> id:2 Banan]
        B2[Yangi ro'yxat: <br/> id:3 Anor <yangi> <br/> id:1 Olma <br/> id:2 Banan]
        
        B1 -->|React id:3 ni izlaydi| B3[Eskisida id:3 yo'q -> Anor yaratildi]
        B1 -->|React id:1 ni izlaydi| B4[Eskisida id:1 bor -> Olma tegilmadi, faqat surildi]
        B1 -->|React id:2 ni izlaydi| B5[Eskisida id:2 bor -> Banan tegilmadi, faqat surildi]
        
        B6[Xulosa: React faqat bitta element yaratdi. <br/> Qolganlarini o'z joyida olib qoldi. Super tez!]
        B3 & B4 & B5 --> B6
    end
\`\`\`

---

## 3. Nima uchun Array Index'ni \`key\` sifatida ishlatish xavfli? (Anti-pattern)

Juda ko'p boshlang'ich dasturchilar \`key\` muammosidan qutulish uchun \`.map\` ning ikkinchi parametri bo'lmish \`index\` (0, 1, 2...) dan foydalanishadi. Bu qat'iyan man etiladi!

❌ **Yomon amaliyot (Don't)**:
\`\`\`jsx
// BUNDAY QILMANG!
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}
\`\`\`

### Nima uchun bu xavfli?
Agar ro'yxatingiz statik bo'lsa (hech qachon o'zgarmasa, o'chirilmasa, joyi almashmasa), \`index\` ishlatish xavfsiz. Lekin ro'yxatga yangi element qo'shilsa (ayniqsa boshiga yoki o'rtasiga) yoki o'chirilsa, React qattiq adashadi.

Tasavvur qiling, ro'yxatingizda input qutilari bor.
1. Dastlab: \`[A, B, C]\` — ularning index keylari \`[0, 1, 2]\`. 
2. Siz 'A' elementini o'chirdingiz.
3. Yangi ro'yxat: \`[B, C]\` bo'ldi.
4. Endi 'B' ning indexi 0, 'C' niki 1 bo'lib qoldi.
5. React o'ylaydi: "Aha! 0 va 1 kalitli elementlar joyida ekan, faqat oxiridagi 2 kalitli element o'chirilibdi". 
6. Natijada ekranda eski ma'lumotlar chalkashib, boshqa inputning ichidagi yozuvlar boshqasiga o'tib qoladi!

✅ **To'g'ri amaliyot (Do)**: Har doim ma'lumotlar bazasidan keladigan takrorlanmas \`id\` (masalan, UUID yoki DB id) ishlating.

\`\`\`jsx
// YAXSHI!
{items.map((item) => (
  <ListItem key={item.uuid} data={item} />
))}
\`\`\`

---

## 4. Shartli Renderlash (Conditional Rendering)

Komponentlar har doim ham bir xil narsani ko'rsatavermaydi. Ba'zida foydalanuvchi tizimga kirgan bo'lsa (logged in) boshqa narsani, kirmagan bo'lsa boshqa narsani ko'rsatishimiz kerak.

React'da maxsus if-else teglar yo'q. Biz oddiy JavaScript mantiqlaridan foydalanamiz.

### 4.1. If-else mantig'i bilan Erta Qaytish (Early Return)
Agar butun boshli komponent qandaydir shartga ko'ra butunlay boshqa narsa ko'rsatishi kerak bo'lsa, uni to'g'ridan-to'g'ri funksiyaning boshida tekshiramiz.

\`\`\`jsx
function Dashboard({ isLoading, user }) {
  if (isLoading) {
    return <div>Yuklanmoqda...</div>; // Erta qaytish
  }

  return <div>Xush kelibsiz, {user.name}!</div>;
}
\`\`\`

### 4.2. Ternary operator (\`shart ? rost : yolg'on\`)
JSX ichida biz \`if\` ishlata olmaymiz, shuning uchun JavaScript'ning uchinchi darajali operatoridan foydalanamiz. Bu eng ko'p ishlatiladigan usul.

\`\`\`jsx
function LogInOutButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Tizimdan chiqish</button>
      ) : (
        <button>Tizimga kirish</button>
      )}
    </div>
  );
}
\`\`\`

### 4.3. Logical AND (\`&&\`)
Agar qandaydir shart bajarilsagina biror narsani ko'rsatish kerak bo'lsa, aks holda hech narsa ko'rsatilmasa, \`&&\` dan foydalanamiz.

\`\`\`jsx
function Notifications({ messages }) {
  return (
    <div>
      <h1>Sizning xabarlaringiz</h1>
      {/* Agar xabarlar mavjud bo'lsa, quyidagi xabarni chiqaramiz */}
      {messages.length > 0 && <p>Sizda yangi xabarlar bor!</p>}
    </div>
  );
}
\`\`\`

### ⚠️ Keng tarqalgan xavfli xato: \`0 &&\` muammosi

Yuqoridagi misolda \`messages.length > 0 && ...\` deb yozdik. Ko'p dasturchilar buni qisqartirib \`messages.length && ...\` deb yozishadi. Bu juda katta xato!

❌ **Yomon amaliyot (Don't)**:
\`\`\`jsx
function Cart({ items }) {
  // Agar items.length 0 bo'lsa, React ekranga 0 raqamini yozib qo'yadi!
  return (
    <div>
      {items.length && <p>Savatda mahsulotlar bor</p>}
    </div>
  );
}
\`\`\`

**Sababi:** JavaScript'da \`0\` bu *falsy* qiymat. Aytaylik savat bo'sh, \`items.length\` 0 ga teng. \`0 && <p>...</p>\` ifodasi JavaScript qoidalariga ko'ra \`0\` natijasini qaytaradi. React esa ekranga HTML o'rniga oddiy \`0\` raqamini chizib qo'yadi!

✅ **To'g'ri amaliyot (Do)**: Har doim ifodangiz aniq **Boolean** (true/false) qaytarayotganiga ishonch hosil qiling.

\`\`\`jsx
// 1-usul: Aniq shart berish
{items.length > 0 && <p>Savatda mahsulotlar bor</p>}

// 2-usul: Ochiqchasiga boolean ga o'girish (!!)
{!!items.length && <p>Savatda mahsulotlar bor</p>}
\`\`\`

---

## Xulosa

1. **\`.map()\`** - React'da ro'yxatlarni chizishning yagona va eng zo'r yo'li.
2. **\`key\`** - Bu ro'yxat elementlarining pasporti. U React'ga komponentlarni samarali yangilash imkonini beradi.
3. **\`index\` ni key qilmang** - Agar ro'yxat tartibi o'zgarishi mumkin bo'lsa, bu UI'da jiddiy va topish qiyin bo'lgan xatoliklarga olib keladi.
4. **Shartli renderlash** - \`if\` (erta qaytish), \`? :\` (ikki xil holat uchun) va \`&&\` (bor yoki yo'q holati uchun) operatorlaridan to'g'ri o'rinda foydalaning.
5. **Falsy muammosi** - \`&&\` ishlatganda ifodaning chap qismi raqamli \`0\` qaytarib, ekranda tushunarsiz \`0\` hosil bo'lishidan ehtiyot bo'ling. Doim mantiqni to'liq boolean ko'rinishiga olib keling (\`> 0\`).

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

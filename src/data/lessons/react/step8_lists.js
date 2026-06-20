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
      title: "Bo'sh ro'yxat uchun xabar",
      instruction: "Quyidagi kodda shartli render orqali `items` massivi bo'sh (`length === 0`) bo'lsa, ekranga `<h3>Savat bo'sh!</h3>` degan yozuv chiqadigan qilib yozing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [items, setItems] = useState([]);\n\n  return (\n    <div>\n      {/* Shu yerda shart yozing */}\n      \n\n      <ul>\n        {items.map(i => <li key={i}>{i}</li>)}\n      </ul>\n    </div>\n  );\n}",
      hint: "{items.length === 0 && <h3>Savat bo'sh!</h3>} ishlating.",
      test: "if (!code.includes('items.length === 0')) return 'items.length === 0 yoki shunga o\\'xshash shart tekshiruvi ishlatilmagan.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega ro'yxat (list) larda React 'key' propini talab qiladi?",
      options: [
        "Bu xavfsizlik (security) uchun, ma'lumotlarni o'g'irlashdan asraydi",
        "Bu React ga ro'yxat ichida aynan qaysi element o'zgargani, qo'shilgani yoki o'chirilganini tezkor topish (Diffing) ga yordam beradi",
        "React da key bo'lmasa ro'yxatlar umuman chizilmaydi, Error beradi",
        "Backend bilan aloqa qilish uchun kerak"
      ],
      correctAnswer: 1,
      explanation: "Key larsiz Virtual DOM daraxtidagi qaysi tugun qayerga ko'chganligini bilib bo'lmaydi. React hammasini boshidan chizishga majbur bo'ladi, bu esa performance ga yomon ta'sir qiladi."
    },
    {
      question: "Ro'yxatdan bitta elementni olib tashlash (o'chirish) ning eng to'g'ri React usuli qaysi?",
      options: [
        "list.splice(index, 1); setList(list)",
        "delete list[index]; setList(list)",
        "setList(list.filter(item => item.id !== idToDelete))",
        "list.pop(); setList(list)"
      ],
      correctAnswer: 2,
      explanation: "State ni mutate (o'zgartirish) qilish mumkin emas. Shuning uchun array dagi splice, pop, shift kabi original array ni o'zgartiruvchi metodlar o'rniga filter kabi yangi array qaytaruvchi metodlar ishlatiladi."
    }
  ]
};

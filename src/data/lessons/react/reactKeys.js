export const reactKeys = {
  title: "Keys va Listlar bilan ishlash",
  content: `
# 1. 💡 Nega React'da ro'yxatlarga alohida e'tibor qaratamiz?

Ilovalarning 80% qismi asosan array'lar (ma'lumotlar ro'yxatlari) dan iborat bo'ladi: mahsulotlar ro'yxati, foydalanuvchilar, postlar, xabarlar va hokazo.
React ro'yxatlarni yaratish uchun odatda JavaScript'ning standart \`Array.prototype.map()\` metodidan foydalanadi.

Har doim \`map()\` qilinganda, React sizga ogohlantirish (warning) beradi: 
*Warning: Each child in a list should have a unique "key" prop.*
Xo'sh, bu nimaga kerak?

---

## 2. 🔑 "Key" propining ichki roli (Identifikatsiya)

\`key\` - bu shunchaki qoidaga amal qilish uchun beriladigan atribut emas. Bu React'ga array ichidagi elementlarni "tanish" (identifikatsiya qilish) imkonini beradi.

Virtual DOM **Reconciliation (solishtirish)** paytida, React avvalgi daraxt bilan yangi daraxtdagi elementlarni bir-biriga solishtiradi. Agar elementlar juda ko'p bo'lsa (masalan, ro'yxat), React qaysi element qayerga o'zgarganini bilishi uchun "qaysidir narsa" kerak. Shu "narsa" – \`key\` dir.

### Index'ni Key sifatida ishlatish nima uchun xavfli? ❌

Ko'p dasturchilar \`map((item, index) => <div key={index}>)\` qilib o'tib ketishadi.
Agar ro'yxatingiz qat'iy (static) bo'lsa va undagi elementlar qo'shilmasa/o'chirilmasa, bu usul xavfsiz. 

Lekin ro'yxat dinamik bo'lsa:
Tasavvur qiling, siz ro'yxatning **BOSHIGA** yangi element qo'shdingiz.
* Eskisi: \`0: Olma\`, \`1: Banan\`
* Yangisi: \`0: Nok\`, \`1: Olma\`, \`2: Banan\`

React o'ylaydi: *"Aha, index 0 dagi element o'zgardi (Olma -> Nok), demak men birinchi elementni noldan chizishim kerak. Keyin index 1 ham o'zgaribdi (Banan -> Olma), uni ham chizaman."*
Natijada, React hamma elementni boshqatdan render qilib chiqadi! Bu juda sekin. Va eng yomoni — agar o'sha elementlar ichida \`input\` kabi state'lar bo'lsa, ulardagi qiymatlar butunlay chalkashib ketadi.

### To'g'ri yondashuv (Unique ID) ✅

Buning o'rniga backend dan kelgan \`id\` (masalan: db-12345) yoki `crypto.randomUUID()` ni yarating:
* Eskisi: \`key="id-A": Olma\`, \`key="id-B": Banan\`
* Yangisi: \`key="id-C": Nok\`, \`key="id-A": Olma\`, \`key="id-B": Banan\`

React buni ko'radi: *"Aha, A va B aynan turibdi, men ularga tegmayman, faqatgina eng tepaga C ni yaratib qo'shaman"*. Bu juda zo'r va tez ishlaydi!

---

## 3. 📊 Array metodlari va Mutatsiya

React'da state bo'lgan array'larni o'zgartirish qoidalari bor. Hech qachon array ni to'g'ridan-to'g'ri mutatsiya qilmang!

❌ **MUMKIN EMAS:**
\`\`\`javascript
const list = [1, 2, 3];
list.push(4);      // Xato: Push original array'ni o'zgartiradi
list.splice(0, 1); // Xato: Splice ham o'zgartiradi
\`\`\`

✅ **TO'G'RI USUL (Nusxa olish - Immutable):**
\`\`\`javascript
// Element qo'shish
const newList = [...list, 4]; 

// Boshiga qo'shish
const newList = [0, ...list]; 

// Elementni o'chirish (filter)
const filteredList = list.filter(item => item.id !== 2);

// Elementni yangilash (map)
const updatedList = list.map(item => item.id === 2 ? { ...item, name: "Yangi" } : item);
\`\`\`

---

## 4. 💬 Intervyu Savollari

1. **Nega ro'yxatlarda (lists) index'ni key sifatida ishlatish tavsiya etilmaydi?**
   *Javob:* Agar elementlar ro'yxatida tartib o'zgarsa, qidirish bo'lsa yoki boshiga yangi element qo'shilsa, barcha elementlarning indexlari o'zgarib ketadi. Bu holatda React elementlarni chalkashtirib, ichidagi komponent state'larini (masalan, yozilayotgan input matnlarini) noto'g'ri o'zlashtirib yuborishi va keraksiz ko'p re-renderlar qilishi mumkin.
2. **React Fragment (<></>) ga qanday qilib key berish mumkin?**
   *Javob:* Qisqartma \`<></>\` ga atribut berib bo'lmaydi. Uni to'liq ko'rinishda yozish kerak: \`<React.Fragment key={item.id}>\`.
3. **\`Math.random()\` ni key qilib ishlatsam bo'ladimi?**
   *Javob:* Mutlaqo yo'q! Har safar render bo'lganda yangi tasodifiy son chiqadi, oqibatda React bu element butunlay yangi ekan deb hisoblab, uni to'liq noldan o'chirib qayta yaratadi (Daxshatli darajada sekin ishlaydi va fokusi yo'qotiladi).
`,
  code: `import React, { useState } from "react";

// Bu misol index dan key sifatida foydalanishning xavfli tomonini ko'rsatadi.
export default function ArrayKeysDemo() {
  const [items, setItems] = useState([
    { id: 101, name: "Olma" },
    { id: 102, name: "Banan" }
  ]);

  const addItemToTop = () => {
    // Ro'yxat boshiga yangi element qo'shamiz (ID ni unikallashtirib)
    const newItem = { id: Date.now(), name: "Yangi meva: " + Math.round(Math.random()*10) };
    setItems([newItem, ...items]);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>"Key" sifatda ID va Index ni solishtirish</h2>
      <p style={{ color: '#e67e22', maxWidth: 600 }}>
        Avval har bir meva yonidagi inputga matn yozing (masalan "shirin"). 
        So'ng "Boshiga qo'shish" tugmasini bosing. Nima bo'lganini kuzating!
      </p>

      <button 
        onClick={addItemToTop}
        style={{ padding: '10px 15px', background: '#2ecc71', color: 'white', border: 'none', cursor: 'pointer', marginBottom: 20 }}
      >
        + Boshiga meva qo'shish
      </button>

      <div style={{ display: 'flex', gap: 40 }}>
        {/* Noto'g'ri usul: Index */}
        <div style={{ border: '2px solid #e74c3c', padding: 10, borderRadius: 5 }}>
          <h3 style={{ color: '#e74c3c' }}>❌ Index bilan (Xato)</h3>
          <ul>
            {items.map((item, index) => (
              // XATO: key sifatida index berildi
              <li key={index} style={{ marginBottom: 10 }}>
                <span style={{ display: 'inline-block', width: 120 }}>{item.name}</span>
                <input type="text" placeholder="Izoh yozing..." style={{ width: 120 }} />
              </li>
            ))}
          </ul>
        </div>

        {/* To'g'ri usul: ID */}
        <div style={{ border: '2px solid #3498db', padding: 10, borderRadius: 5 }}>
          <h3 style={{ color: '#3498db' }}>✅ ID bilan (To'g'ri)</h3>
          <ul>
            {items.map((item) => (
              // TO'G'RI: Unikal ID ishlatildi
              <li key={item.id} style={{ marginBottom: 10 }}>
                <span style={{ display: 'inline-block', width: 120 }}>{item.name}</span>
                <input type="text" placeholder="Izoh yozing..." style={{ width: 120 }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: 20, fontSize: 13, color: '#7f8c8d' }}>
        <strong>Xulosa:</strong> Index ishlatganda, React inputlarni (state) eng birinchi DOM tuguniga bog'lab qo'ygani uchun, yangi qo'shilgan element avvalgi input qutisining yozuvini tortib oladi. ID ishlatilganda esa, React qaysi input aynan qaysi ob'ektga tegishli ekanligini mukammal farqlaydi!
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Mahsulot o'chirish (Filter)",
      instruction: "Quyida `deleteItem` funksiyasi berilgan. React'da ro'yxatdan elementni o'chirish uchun uni to'g'ridan-to'g'ri o'zgartirmasdan, `.filter()` metodidan foydalanish kerak. Agar mahsulot ID'si `idToRemove` ga teng bo'lsa, o'sha mahsulotni chiqarib tashlab yangi massivni saqlaydigan kod yozing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function List() {\n  const [items, setItems] = useState([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);\n\n  const deleteItem = (idToRemove) => {\n    // Shu yerda filter ishlating\n    \n  };\n\n  return (\n    <ul>\n      {items.map(i => (\n        <li key={i.id}>\n          {i.name} <button onClick={() => deleteItem(i.id)}>X</button>\n        </li>\n      ))}\n    </ul>\n  );\n}",
      hint: "const newItems = items.filter(item => item.id !== idToRemove); setItems(newItems);",
      test: "if (!code.includes('.filter(')) return 'filter() metodini ishlating.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Nega ro'yxatlarda (lists) index'ni key sifatida ishlatish tavsiya etilmaydi?",
      options: [
        "React xato berib ishlamay qoladi",
        "Ular juda ko'p xotira band qiladi",
        "Elementlar o'rni almashsa, React ularni chalkashtirib DOM ni noto'g'ri yangilashi mumkin",
        "Browser indexlarni raqam emas harf deb tushunadi"
      ],
      correctAnswer: 2,
      explanation: "Indexlar doimiylikni saqlamaydi. Agar ro'yxatning boshiga yangi element qo'shilsa, barcha indexlar o'zgarib ketadi."
    },
    {
      question: "React'da state bo'lgan array'ga yangi element qo'shish uchun quyidagilardan qaysi biri eng to'g'ri?",
      options: [
        "stateArray.push(newItem)",
        "setArray([...stateArray, newItem])",
        "stateArray.unshift(newItem)",
        "setArray(stateArray.concat(newItem)) bo'lishi ham mumkin, lekin push eng yaxshisidir"
      ],
      correctAnswer: 1,
      explanation: "React state'ni immutable (o'zgarmas) deb bilishi kerak. Shuning uchun eski array'dan spread operator (...) orqali nusxa olib, yangisini yaratish eng xavfsiz va zamonaviy usul."
    }
  ]
};

export const step12_api = {
  title: "12-DARS: API bilan ishlash (HTTP So'rovlar)",
  content: `
# 12-Qadam: React-da API bilan ishlash va Asinxron Dasturlash

## Asinxron Dasturlash o'zi nima va React-da nega kerak?

Tasavvur qiling, siz restorandasiz. Ofitsiantga buyurtma berdingiz (bu API ga so'rov yuborish). Agar ofitsiant ovqat tayyor bo'lguncha sizning oldingizda kutib tursa, u boshqa mijozlarga xizmat ko'rsata olmaydi. Bu **sinxron** jarayon bo'lar edi.
Lekin haqiqiy hayotda ofitsiant buyurtmani oshxonaga beradi va boshqa ishlari bilan shug'ullanadi. Ovqat tayyor bo'lgach, uni sizga olib keladi. Bu **asinxron** jarayon.

React-da ham xuddi shunday. Biz serverdan ma'lumot (masalan, foydalanuvchilar ro'yxati, ob-havo ma'lumotlari yoki ijtimoiy tarmoq postlarini) so'raganimizda, bu jarayon biroz vaqt oladi. Agar dasturimiz bu vaqt ichida to'xtab qolsa (qotib qolsa), foydalanuvchi interfeysi umuman ishlamay qoladi. Foydalanuvchi boshqa tugmalarni bosa olmaydi, sahifa "qotib" qoladi. Shuning uchun biz asinxron dasturlashdan (JavaScript-dagi \`Promises\`, \`async/await\`) foydalanamiz. Shu orqali brauzer ma'lumotlar kelishini kutib, ayni paytda boshqa interaktiv amallarni ham bajaraveradi.

---

## \`useEffect\` ichida Fetch tsikli (Standart Data Fetching)

React komponentida ma'lumotlarni qachon va qayerda yuklashimiz kerak? Asosiy qoida shuki: **Ma'lumot yuklash - bu "Side Effect" (nojo'ya ta'sir)**. React komponentlarining asosiy vazifasi UI (interfeys) ni chizishdir. Boshqa har qanday ish, jumladan tarmoqqa API so'rov yuborish, DOM ni qo'lda o'zgartirish yoki taymerlar o'rnatish \`useEffect\` hook'i ichida bajarilishi kerak.

### Nega boshlang'ich fetch uchun bo'sh dependency array \`[]\` kerak?

\`useEffect\` ning ikkinchi argumenti bu - **dependency array** (qaramliklar ro'yxati).
Agar siz bu array'ni bermasangiz, \`useEffect\` har bir render bo'lganda (ya'ni har safar state yoki prop o'zgarganda) qayta ishga tushadi. Agar siz ushbu effect ichida state'ni yangilasangiz, siz tasodifan dasturingizni buzib qo'yishingiz mumkin. Bu **cheksiz loop (infinite loop)** deb ataladi!

\`\`\`jsx
// ❌ YOMON AMALIYOT (Cheksiz loop)
useEffect(() => {
  fetchData().then(data => setData(data)); 
  // Nima yuz beradi:
  // 1. Komponent render bo'ladi.
  // 2. useEffect ishga tushib, fetch qiladi.
  // 3. setData() ishga tushadi.
  // 4. State o'zgargani uchun React komponentni QAYTA render qiladi.
  // 5. Array berilmagani uchun useEffect YANA ishga tushadi va fetch qiladi...
  // 💥 Natijada brauzer qotib qoladi yoki serverga sekundiga yuzlab so'rov ketadi!
});

// ✅ YAXSHI AMALIYOT
useEffect(() => {
  fetchData().then(data => setData(data));
}, []); // <-- Bo'sh array
\`\`\`

\`[]\` qaramliklar ro'yxati React'ga shunday deydi: *"Bu effekt hech qanday state yoki prop'ga qaram emas. Shuning uchun uni faqat komponent ekranga birinchi marta chiqqanida (mount bo'lganda) bir marta bajar, boshqa bezovta qilma!"*

---

## Komponent Hayot Tsikli va API So'rov (Sequence Diagram)

Quyida komponent ekranga chiqqandan boshlab, ma'lumot kelib, UI yangilanguncha bo'lgan standart React ma'lumot yuklash jarayoni vizual tasvirlangan.

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant U as Foydalanuvchi (User)
    participant C as React Komponent
    participant S as State (Holat)
    participant A as API Server

    U->>C: Sahifaga kiradi (Component Mount)
    C->>S: Dastlabki holatni o'rnatadi<br/>(Loading: true, Data: null)
    C->>U: "Yuklanmoqda..." <br/>(Loading Spinner ko'rsatiladi)
    
    rect rgb(240, 248, 255)
        Note over C,A: useEffect ishga tushadi (Faqat 1-marta)
        C->>A: HTTP GET so'rov (Fetch yoki Axios orqali)
        A-->>C: JSON ma'lumotlar qaytariladi
    end
    
    C->>S: State'ni yangilaydi <br/>(Data: [...], Loading: false)
    Note over C,S: State o'zgargani sababli Komponent RE-RENDER bo'ladi
    C->>U: Kelgan haqiqiy ma'lumotlar ekranda ko'rsatiladi
\`\`\`

Bu diagramma shuni ko'rsatadiki:
1. Komponent dastlab bo'sh ma'lumot va \`loading=true\` degan state bilan render bo'ladi. Bu vaqtda foydalanuvchi "Loading..." yozuvini ko'radi.
2. Komponent ekranga to'liq chizilib bo'lgach (mount), \`useEffect\` orqa fonda API ga so'rov jo'natadi.
3. API dan javob (ma'lumot) kelgach, biz \`setState\` funksiyasi orqali React-ga yangi holatni ma'lum qilamiz.
4. State yangilangani sababli, React komponentni qayta chizishga (re-render) qaror qiladi va endi ekranda API dan kelgan ma'lumotlar paydo bo'ladi.

---

## Loading va Error Holatlarini To'g'ri Boshqarish

Tarmoq so'rovlari har doim ham darhol va muvaffaqiyatli yakunlanavermaydi. Internet uzilib qolishi, serverda xatolik bo'lishi (masalan, 500 status code) yoki so'rov javobi juda uzoq vaqt olishi mumkin.
Shu sababli, professional React dasturchilari API bilan ishlashda har doim **3 ta asosiy state** yaratishadi:
1. \`data\` - Asosiy kelayotgan ma'lumotlarni saqlash uchun.
2. \`isLoading\` - Jarayon ketayotganini bildirish uchun (spinner yoki skeleton UI uchun).
3. \`error\` - Biron xatolik yuz bersa, uni ushlab, foydalanuvchiga tushunarli tarzda ko'rsatish uchun.

### To'liq ishlash namunasi (Fetch API yordamida):

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function UserList() {
  // 1. Uchta asosiy state'ni e'lon qilamiz
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Dastlab true bo'ladi
  const [error, setError] = useState(null); // Dastlab xato yo'q

  useEffect(() => {
    // async funksiyani useEffect ichida yaratamiz
    const fetchUsers = async () => {
      try {
        setIsLoading(true); // So'rov boshlanganini tasdiqlaymiz
        
        // Asinxron fetch so'rovi
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Fetch API da HTTP xatolar (masalan 404, 500) avtomatik tarzda 
        // "catch" blokiga tushib qolmaydi. Shuning uchun response.ok ni tekshiramiz.
        if (!response.ok) {
          throw new Error(\`Xatolik yuz berdi: \${response.status}\`);
        }
        
        const data = await response.json();
        setUsers(data); // Ma'lumotni state ga muvaffaqiyatli saqlaymiz
        
      } catch (err) {
        setError(err.message); // Agar catch ga tushsa, xatoni state ga yozamiz
      } finally {
        // Muvaffaqiyatli bo'ladimi yoki xatomi, eng oxirida bu blok albatta ishlaydi.
        // Biz yuklanish jarayoni tugaganini belgilab qo'yamiz.
        setIsLoading(false); 
      }
    };

    fetchUsers(); // Funksiyani chaqiramiz
  }, []); // <-- Bo'sh dependency array! 

  // 2. State'larning holatiga qarab, UIni mos ravishda render qilamiz (Conditional Rendering)
  
  if (isLoading) {
    return (
      <div className="spinner">
        Ma'lumotlar yuklanmoqda, iltimos kuting... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        Kechirasiz, xatolik: {error} ❌
      </div>
    );
  }

  // Agar loading tugagan va xato bo'lmasa, demak ma'lumot bor
  return (
    <div>
      <h2>Foydalanuvchilar ro'yxati</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
\`\`\`

> [!IMPORTANT]
> **Nega \`fetchUsers\` ni \`useEffect\` ichida qildik? Nega useEffect o'zini async qilib qo'ymadik?**
> Aslida \`useEffect\` o'zi to'g'ridan-to'g'ri \`async\` bo'lishi taqiqlangan (ya'ni \`useEffect(async () => {...})\` yozish mumkin emas). Sababi \`useEffect\` faqatgina ehtiyoj bo'lganda tozalash (cleanup) funksiyasini qaytarishi kerak. \`async\` funksiyalar esa avtomatik ravishda har doim \`Promise\` qaytaradi. Shuning uchun biz ichkarida maxsus \`async\` funksiya yaratib, uni o'sha yerni o'zida bir marta chaqirib qo'yamiz.

---

## Axios vs Fetch: Qaysi birini tanlash kerak?

JavaScript-da tarmoqqa so'rov yuborish uchun hozirda ikki xil keng tarqalgan texnologiya mavjud:
1. **Fetch API**: Brauzerga o'rnatilgan (built-in) standart vosita. Qo'shimcha kutubxona yoki "npm install" talab qilmaydi.
2. **Axios**: Uchinchi tomon kutubxonasi (third-party library). Uni \`npm install axios\` orqali o'rnatasiz. U ko'plab tayyor va qulay imkoniyatlar bilan birga keladi.

### Qanday farqlari bor?

| Xususiyat | Fetch API | Axios |
| :--- | :--- | :--- |
| **O'rnatish** | Kerak emas (Brauzerda tayyor bor) | \`npm install axios\` |
| **JSON formatlash** | Qo'lda qilish kerak (\`res.json()\`) | Avtomatik JSON obyektga o'girib beradi |
| **HTTP Xatolarni ushlash** | \`res.ok\` ni qo'lda tekshirish kerak | Avtomatik \`catch\` blokka tushib ketadi |
| **Interceptors** | Yo'q (qo'lda yozish qiyin va uzoq) | Bor (Tokenlarni yuborish, log qilishda juda qulay) |
| **Timeout (Vaqt cheklovi)**| \`AbortController\` orqali (birmuncha qiyin) | Bor (shunchaki konfiguratsiyada \`timeout: 5000\` berasiz) |

### 1. Fetch API bilan yozish (Standart yo'l)
\`\`\`javascript
fetch('https://api.example.com/data')
  .then(response => {
    // 404 yoki 500 kabi xatolar catch ga kirmagani uchun qo'lda tekshiramiz
    if (!response.ok) {
      throw new Error('Tarmoq xatosi yuz berdi');
    }
    // Kelgan javobni stringdan JSON formatga o'tkazish
    return response.json(); 
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

### 2. Axios bilan yozish (Zamonaviy qulaylik)
\`\`\`javascript
import axios from 'axios';

axios.get('https://api.example.com/data')
  // Axios qatorlarni avtomat tarzda JSONga o'giradi va uni "data" kaliti ichiga joylaydi
  .then(response => console.log(response.data)) 
  // Agar API dan 400, 401, 404, 500 kabi xato kodlari kelsa to'g'ridan-to'g'ri catch ishlaydi
  .catch(error => console.error(error.message)); 
\`\`\`

### Xulosa: Qaysi birini ishlatay?
- Agar loyihangiz unchalik katta bo'lmasa, sodda so'rovlar yuborayotgan bo'lsangiz va ortiqcha paket qo'shishni xohlamasangiz, **Fetch API** - ideal va xavfsiz tanlov.
- Lekin loyihangiz yirik masshtabda bo'lsa, xavfsizlik tokenlari (JWT) bilan ishlasangiz, global xatolarni ushlash va so'rovlarni intercept qilish kerak bo'lsa - **Axios** ishingizni juda ham tezlashtiradi va yoziladigan kod hajmini qisqartiradi.

---

## Tez-tez yo'l qo'yiladigan xatolar (Do's and Don'ts)

> [!WARNING]
> **Don't: Xatoliklarni e'tiborsiz qoldirish**
> Agar siz \`catch\` bloksiz, xatolarni hisobga olmasdan API ga so'rov yuborsangiz va serverda xato yuz bersa, interfeys buziladi, foydalanuvchi esa oq ekranni ko'rib nima bo'lganini tushunmay qoladi.

> [!TIP]
> **Do: Har doim \`try/catch/finally\` ishlating**
> Ma'lumotlarni yuklashda har doim xatolik ehtimoli borligini (hatto eng mukammal tizimlarda ham) hisobga oling va uni chiroyli xabar (Notification) bilan foydalanuvchiga bildiring.

> [!CAUTION]
> **Don't: Data Fetching amallarini useEffect'dan tashqariga yozish**
> Komponentning to'g'ridan-to'g'ri tanasida (tashqarisida) API ga so'rov yubormang. Bu cheksiz renderlarga va dasturning qulashiga olib keladi.

> [!NOTE]
> **Do: Memory Leak (Xotira oqishi) ning oldini olish uchu Cleanup yozish**
> Agar komponent ekrandan yo'qolsa (unmount bo'lsa, masalan boshqa sahifaga o'tib ketsangiz), lekin internet pastligi sababli API so'rov endi yakunlanib, o'chirilgan komponentning State'ini yangilashga urinsa, React console'da \`Memory Leak\` xatosini beradi. Buni oddiy \`isMounted\` flagi yoki \`AbortController\` orqali hal qilish tavsiya etiladi.

**Memory Leak oldini olish namunasi:**
\`\`\`javascript
useEffect(() => {
  let isMounted = true; // Komponent hozircha ekranda bor

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      
      // FAQATGINA komponent hali ham ekranda bo'lsa, state'ni yangila
      if (isMounted) {
        setData(result);
      }
    } catch(err) {
      if(isMounted) setError(err);
    }
  };
  
  fetchData();

  // Cleanup function: Komponent yo'qolganda ishlaydi
  return () => {
    isMounted = false; // Flag false bo'ladi va state yangilanmaydi
  };
}, []);
\`\`\`

Ushbu qadam orqali siz React-da eng muhim ko'nikmalardan biri bo'lgan ma'lumotlar bilan ishlashni, hayot tsiklini boshqarishni va uchinchi tomon vositalari bilan professional darajada integratsiya qilishni o'rgandingiz!

`,
  code: `import React, { useState, useEffect } from "react";

export default function ApiDemo() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Komponent yuklanganda ishlaydigan API So'rov
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Ochiq API (JSONPlaceholder) dan postlarni olib kelamiz
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        
        if (!response.ok) throw new Error("Tarmoqda xatolik yuz berdi!");
        
        const data = await response.json();
        setPosts(data); // Kelgan datani state ga saqlaymiz
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Xato bo'lsa ham, muvaffaqiyatli bo'lsa ham yuklanish tugaydi
      }
    };

    fetchPosts();
  }, []);

  // 2. Yangi post qo'shish (POST so'rovi) imitatsiyasi
  const addPost = async () => {
    const newPost = { title: "Yangi post", body: "Bu mening reactdagi birinchi postim", userId: 1 };
    
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
      });
      const savedPost = await response.json();
      
      // Yangi postni eski postlar ro'yxati boshiga qo'shib qo'yamiz (Ekranda ko'rinishi uchun)
      setPosts([savedPost, ...posts]);
      alert("Muvaffaqiyatli qo'shildi!");
    } catch(e) {
      alert("Xatolik!");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>API dan kelgan Postlar:</h2>
      
      <button 
        onClick={addPost} 
        style={{ padding: "10px 20px", background: "#2ecc71", color: "white", border: "none", borderRadius: 4, cursor: "pointer", marginBottom: 20 }}
      >
        Yangi post qo'shish (POST)
      </button>

      {/* Yuklanish holati */}
      {isLoading && <p>⏳ Ma'lumotlar serverdan yuklanmoqda...</p>}

      {/* Xatolik holati */}
      {error && <p style={{ color: "red" }}>❌ Xatolik: {error}</p>}

      {/* Ma'lumotlar muvaffaqiyatli kelgan holat */}
      {!isLoading && !error && (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {posts.map(post => (
            <li key={post.id} style={{ padding: 15, border: "1px solid #ccc", marginBottom: 10, borderRadius: 8 }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50", textTransform: "capitalize" }}>{post.title}</h3>
              <p style={{ margin: 0, color: "#7f8c8d" }}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "fetch() orqali ma'lumot olish",
      instruction: "Komponent yuklanganda API'dan foydalanuvchilarni olib kelish uchun `.then` zanjirida `response.json()` dan foydalaning va natijani state ga yozing.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [users, setUsers] = useState([]);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      // shu yerda response ni json ga o'giring va state ga saqlang\n      ;\n  }, []);\n\n  return <div>Foydalanuvchilar: {users.length}</div>;\n}",
      hint: "fetch(...).then(res => res.json()).then(data => setUsers(data)) qilib yozing.",
      test: "if(!code.includes('json()')) return 'Natijani JSON ga o\\'girish esdan chiqmasin.'; if(!code.includes('setUsers')) return 'Natijani state ga yozing.'; return null;"
    },
    {
      id: 2,
      title: "isLoading holati",
      instruction: "Ma'lumotlar kelishidan oldin ekranda 'Yuklanmoqda...' chiqadi. `fetch` tugagandan keyin `.then` bloki oxirida `setIsLoading(false)` ni chaqiring.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState([]);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/posts')\n      .then(res => res.json())\n      .then(result => {\n        setData(result);\n        // Yuklanishni shu yerda to'xtating\n        \n      });\n  }, []);\n\n  if (isLoading) return <p>Yuklanmoqda...</p>;\n  return <ul>{data.map(d => <li key={d.id}>{d.title}</li>)}</ul>;\n}",
      hint: "setIsLoading(false) qiling.",
      test: "if(!code.includes('setIsLoading(false)')) return 'Yuklanishni to\\'xtatishni esdan chiqardingiz.'; return null;"
    },
    {
      id: 3,
      title: "Xatoliklarni boshqarish (.catch)",
      instruction: "Agar API da xatolik bo'lsa uni tutib olish uchun `.catch` dan foydalanib xato xabarini `setError` orqali saqlang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetch('https://xato-url.com/api')\n      .then(res => res.json())\n      .then(data => console.log(data))\n      // catch qismini shu yerda yozing va err.message ni saqlang\n      ;\n  }, []);\n\n  if (error) return <p>Xatolik: {error}</p>;\n  return <p>Ma'lumotlar keldi</p>;\n}",
      hint: ".catch(err => setError(err.message)) shaklida yozing.",
      test: "if(!code.includes('.catch') || !code.includes('setError')) return 'Xatolikni tutish uchun .catch() va setError() ishlating.'; return null;"
    },
    {
      id: 4,
      title: "async/await uslubi",
      instruction: "`.then()` o'rniga `async / await` ishlating. `fetchData` funksiyasi ichida ma'lumotni olib `setData` ga saqlang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState([]);\n\n  useEffect(() => {\n    const fetchData = async () => {\n      // await fetch va await response.json() ni ishlating\n      \n    };\n    fetchData();\n  }, []);\n\n  return <div>Ma'lumotlar: {data.length}</div>;\n}",
      hint: "const res = await fetch(...); const result = await res.json(); setData(result);",
      test: "if(!code.includes('await fetch') || !code.includes('await') || !code.includes('setData')) return 'await fetch va setData() ni ishlating.'; return null;"
    },
    {
      id: 5,
      title: "try / catch / finally bloki",
      instruction: "`async/await` ishlatsangiz xatolarni tutish va yuklanishni tugatish uchun `try`, `catch`, va `finally` ni yozing.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [isLoading, setIsLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const getData = async () => {\n      // try, catch va finally ni yozing\n      \n    };\n    getData();\n  }, []);\n\n  if (error) return <p>{error}</p>;\n  return <p>{isLoading ? 'Yuklanmoqda...' : 'Tayyor'}</p>;\n}",
      hint: "try { /* asosiy kod */ } catch(err) { /* error */ } finally { /* loading false */ }",
      test: "if(!code.includes('try') || !code.includes('catch') || !code.includes('finally')) return 'try, catch va finally bloklaridan foydalaning.'; return null;"
    },
    {
      id: 6,
      title: "POST so'rovi (Ma'lumot jo'natish)",
      instruction: "Yangi post qo'shish uchun `fetch` da method ni 'POST' deb ko'rsating, headers hamda body qo'shing.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const handlePost = () => {\n    const newPost = { title: 'Test', body: 'Salom' };\n    fetch('https://jsonplaceholder.typicode.com/posts', {\n      // shu yerda method, headers, va body ni to'ldiring\n      \n    })\n    .then(res => res.json())\n    .then(data => console.log(data));\n  };\n  return <button onClick={handlePost}>Jo'natish</button>;\n}",
      hint: "method: 'POST', body: JSON.stringify(newPost) bo'lishi lozim",
      test: "if(!code.includes('method') || !code.includes('POST') || !code.includes('JSON.stringify')) return 'method: POST va body: JSON.stringify() bo\\'lishi kerak.'; return null;"
    },
    {
      id: 7,
      title: "API dan kelgan ma'lumotlarni map qilish",
      instruction: "API dan kelgan posts massivini `map` yordamida aylanib chiqib, har bir postning `.title` ni ko'rsating.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')\n      .then(res => res.json())\n      .then(data => setPosts(data));\n  }, []);\n\n  return (\n    <ul>\n      {/* posts ro'yxatini map qiling, va har birini <li key={post.id}>{post.title}</li> orqali chiqaring */}\n      \n    </ul>\n  );\n}",
      hint: "{posts.map(post => <li key={post.id}>{post.title}</li>)}",
      test: "if(!code.includes('posts.map') || !code.includes('key=') || !code.includes('<li')) return 'map yordamida <li> elementlarini hosil qiling va key bering.'; return null;"
    },
    {
      id: 8,
      title: "Dinamik API URL (Parametrlar)",
      instruction: "`fetch` yordamida id ga tegishli postni olish uchun URL manzilning oxiriga `id` o'zgaruvchisini biriktiring.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [id, setId] = useState(1);\n  const [post, setPost] = useState(null);\n\n  useEffect(() => {\n    // URL oxiriga id ni qo'shing\n    fetch(`https://jsonplaceholder.typicode.com/posts/`)\n      .then(res => res.json())\n      .then(data => setPost(data));\n  }, [id]);\n\n  return (\n    <div>\n      <input type=\"number\" value={id} onChange={e => setId(e.target.value)} />\n      <p>{post ? post.title : 'Kuting...'}</p>\n    </div>\n  );\n}",
      hint: "fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)",
      test: "if(!code.includes('${id}') && !code.includes('+ id') && !code.includes('+id')) return 'URL ga id ni dinamik ravishda biriktiring.'; return null;"
    },
    {
      id: 9,
      title: "Tugma bosilganda API chaqirish",
      instruction: "`fetchUser` funksiyasini tugmaning `onClick` hodisasiga bog'lang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [user, setUser] = useState(null);\n\n  const fetchUser = async () => {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\n    const data = await res.json();\n    setUser(data);\n  };\n\n  return (\n    <div>\n      {/* Shu tugmaga fetchUser ni bog'lang */}\n      <button>Foydalanuvchini olib kelish</button>\n      {user && <p>{user.name}</p>}\n    </div>\n  );\n}",
      hint: "<button onClick={fetchUser}>",
      test: "if(!code.includes('onClick={fetchUser}')) return 'Tugmaga onClick hodisasini qo\\'shing.'; return null;"
    },
    {
      id: 10,
      title: "Ikkita API ni baravar chaqirish",
      instruction: "`Promise.all` ichiga ikkita turli `fetch` so'rovlarini joylashtiring.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState({ users: 0, posts: 0 });\n\n  useEffect(() => {\n    const loadAll = async () => {\n      // Promise.all ichida fetch yozing\n      const [resUsers, resPosts] = await Promise.all([\n        \n      ]);\n      const users = await resUsers.json();\n      const posts = await resPosts.json();\n      setData({ users: users.length, posts: posts.length });\n    };\n    loadAll();\n  }, []);\n\n  return <p>Users: {data.users}, Posts: {data.posts}</p>;\n}",
      hint: "fetch('.../users'), fetch('.../posts') qo'shing",
      test: "if(!code.includes('fetch(')) return 'Promise.all ichida fetch so\\'rovlarini yozing.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "API (Application Programming Interface) nima?",
      options: [
        "Frontend va Backend ni bog'lovchi ko'prik",
        "Faqat ma'lumotlar bazasi",
        "Brauzerning dizayn yaratish vositasi",
        "Reactning maxsus hooki"
      ],
      correctAnswer: 0,
      explanation: "API orqali mijoz (Frontend) va server (Backend) bir-biri bilan qoida doirasida ma'lumot almashadi."
    },
    {
      question: "React da API so'rovlarini qayerda yozish eng to'g'ri hisoblanadi?",
      options: [
        "To'g'ridan-to'g'ri return () ichida",
        "Komponent tashqarisida e'lon qilib, har safar renderda chaqirib",
        "useEffect ichida (odatda bo'sh dependency array bilan)",
        "State parametriga to'g'ridan-to'g'ri fetch beriladi"
      ],
      correctAnswer: 2,
      explanation: "Odatda API lardan ma'lumot olish 'Side effect' hisoblanadi va komponent to'liq chizilgandan keyin bir marta ishlashi uchun useEffect va [] bilan bajariladi."
    },
    {
      question: "fetch() da default HTTP metodi qaysi biri?",
      options: [
        "POST",
        "GET",
        "PUT",
        "DELETE"
      ],
      correctAnswer: 1,
      explanation: "fetch() faqat URL bilan chaqirilsa, avtomatik ravishda GET metodidan foydalanadi (ya'ni serverdan ma'lumot o'qish uchun)."
    },
    {
      question: "API dan ma'lumot olishda nima uchun `.json()` metodidan foydalanamiz?",
      options: [
        "HTML ni React ga o'girish uchun",
        "Kelgan javob (response) ni JS obyekti yoki massiviga (JSON) aylantirish uchun",
        "Xatolarni avtomatik to'g'irlash uchun",
        "Backend dan kelgan ma'lumotni shifrlash uchun"
      ],
      correctAnswer: 1,
      explanation: "HTTP so'rovlar matn ko'rinishida javob beradi. Uni JavaScript da ishlata olish uchun JSON formatdagi matnni JS obyektiga o'girish kerak."
    },
    {
      question: "Serverga yangi ma'lumot yuborish (POST) uchun `fetch` da body qanday formatda yuborilishi kerak?",
      options: [
        "JS obyektida (to'g'ridan-to'g'ri body: { ... })",
        "Form obyekti ko'rinishida qat'iy",
        "JSON matn ko'rinishida (JSON.stringify() yordamida)",
        "Shifrlangan HTML ko'rinishida"
      ],
      correctAnswer: 2,
      explanation: "HTTP orqali ma'lumot yuborishda u JSON format ekanligini tushuntirish uchun JSON.stringify(obj) bilan matnga o'giramiz."
    },
    {
      question: "isLoading state (yuklanish holati) qachon false qilinadi?",
      options: [
        "useEffect ni boshida",
        "Faqatgina ma'lumot muvaffaqiyatli kelganida (.then ichida)",
        "API so'rov tugagach, xoh muvaffaqiyatli xoh xatolik bo'lsa ham (.finally yoki oxirida)",
        "Uni hech qachon false qilib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Muvaffaqiyatli kelsa ham, xato kelsa ham yuklanish (loading) holati to'xtatilishi kerak."
    },
    {
      question: "async / await uslubidan nima sababdan foydalanamiz?",
      options: [
        "Dastur ishlash tezligini 10 barobar oshirish uchun",
        "Server bilan aloqani himoyalash uchun",
        "React ni maxsus talabi bo'lgani uchun",
        ".then() zanjirlarini ko'paytirib yubormaslik, kodni toza va tushunarli qilish uchun"
      ],
      correctAnswer: 3,
      explanation: "async/await bu Promiselarni yozishning yangi sintaksisi bo'lib, sinxron kod kabi o'qilishini ta'minlaydi."
    },
    {
      question: "useEffect ichida async funksiya yozishning to'g'ri yo'li qaysi?",
      options: [
        "useEffect(async () => { ... })",
        "useEffect(() => { const fetchData = async () => { ... }; fetchData(); }, [])",
        "async useEffect(() => { ... })",
        "useEffect yordamida async qilib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "React da useEffect o'zi Promise (async) qaytarmasligi kerak. Shu sabab ichida alohida async funksiya yaratib uni chaqirish talab qilinadi."
    },
    {
      question: "try ... catch blokining catch qismi nima vazifani bajaradi?",
      options: [
        "Ma'lumotlarni cache ga saqlaydi",
        "API dan kelgan obyektlarni massivga aylantiradi",
        "API ga yuborishda so'rovni bekor qiladi",
        "Agar try ichidagi kodda xatolik yuz bersa (masalan url noto'g'ri), dastur buzilmasligi uchun xatoni ushlab oladi"
      ],
      correctAnswer: 3,
      explanation: "Asinxron ishlarda xatoliklarni xavfsiz boshqarish (error handling) uchun try/catch ishlatiladi."
    },
    {
      question: "Xatolik bor yoki yo'qligini qaysi response parametri orqali tekshirish yaxshi amaliyot?",
      options: [
        "response.isError",
        "response.ok",
        "response.success",
        "response.hasError"
      ],
      correctAnswer: 1,
      explanation: "fetch da 404 status kelsa ham catch tushmaydi. Buning uchun 'if (!response.ok)' orqali qo'lda tekshirish eng to'g'ri yo'l."
    },
    {
      question: "Agar useEffect ichida `[]` qavslar qo'yilmasa API so'rovi qanday ishlaydi?",
      options: [
        "Faqatgina 1 marta ishlaydi",
        "Hech qachon ishlamaydi",
        "Har bir render bo'lganda API chaqirilib, bu cheksiz zanjir (infinite loop) ga aylanib ketishi mumkin",
        "Faqat tugma bosilganda ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Bo'sh massiv qo'yilmasa, useEffect har safar ishlaganda qayta ishlayveradi va cheksiz so'rovlarni keltirib chiqaradi."
    },
    {
      question: "Komponent unmount bo'lganda API so'rovini qanday bekor qilish mumkin?",
      options: [
        "clearTimeout yordamida",
        "AbortController va cleanup funksiyasi yordamida",
        "API o'zi avtomatik bekor bo'ladi",
        "Reactda buni iloji yo'q"
      ],
      correctAnswer: 1,
      explanation: "fetch so'rovlarini bekor qilish uchun AbortController ishlatamiz va useEffect ning cleanup funksiyasida (.abort()) ni chaqiramiz."
    }
  ]
};

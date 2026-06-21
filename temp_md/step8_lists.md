# React'da Ro'yxatlar (Lists) va Shartli Renderlash (Conditional Rendering)

Dasturlashda eng ko'p uchraydigan holatlardan biri bu — ma'lumotlar to'plamini (array) ekranga chiqarish va qandaydir shartlarga asosan ba'zi qismlarni yashirish yoki ko'rsatishdir. React bu ishlarni juda qulay va chiroyli usulda amalga oshirishga yordam beradi.

Ushbu darsda biz ro'yxatlarni qanday qilib to'g'ri renderlash, `key` propining siri, React'ning orqa fondagi Diffing algoritmi va shartli renderlashdagi muhim qoidalar haqida chuqur gaplashamiz.

---

## 1. Ro'yxatlarni renderlash: `.map()` qanday ishlaydi?

React'da HTML ro'yxatlarini yaratish uchun JavaScript'ning standart **`.map()`** metodidan foydalaniladi.

### 💡 Nega kerak?
Deylik, sizda 100 ta foydalanuvchi haqida ma'lumot bor. Har bir foydalanuvchi uchun alohida `<UserCard />` komponentini qo'lda yozib chiqish imkonsiz va xato. Bizga ma'lumotlarni aylanib chiqib, har bir ma'lumot uchun JSX qaytaradigan avtomatlashtirilgan mexanizm kerak. `map` aynan shu ishni bajaradi.

### 🍔 Real-hayot analogiyasi
Tasavvur qiling, siz pitsaxona oshpazisiz va oldingizda 10 xil pitsa retseptlari ro'yxati (Array) bor. Siz har bir retseptga (item) qarab, bir xil qolipdagi, lekin ichidagi masallig'i har xil bo'lgan pitsalarni (JSX) tayyorlab chiqasiz.

### ✅ Do's and ❌ Don'ts (Qanday qilish kerak va qanday emas?)

❌ **Yomon amaliyot (Don't)**: Odatda JavaScript'da `for` siklidan foydalanishga o'rganganmiz, lekin React JSX ichida `for` ishlata olmaysiz, chunki u expression (qiymat) emas, statement (buyruq) hisoblanadi.

```jsx
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
```

✅ **To'g'ri amaliyot (Do)**: Har doim `.map()` dan foydalaning, chunki u asl arrayni o'zgartirmasdan, har bir element uchun yangi JSX elementlaridan iborat yangi array qaytaradi.

```jsx
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
```

---

## 2. `key` prop'ining hal qiluvchi roli va React Diffing Algoritmi

Ro'yxatlarni render qilganingizda, React sizdan har bir element uchun takrorlanmas `key` (kalit) propini berishni talab qiladi. Agar bermasangiz, konsolda "Warning: Each child in a list should have a unique 'key' prop" degan qizil xatolikni ko'rasiz.

### 💡 Nega kerak?
React DOM'ni (ekranni) tezkorlik bilan yangilash uchun **Virtual DOM** va **Diffing algoritmi**dan foydalanadi. Qachonki state o'zgarsa, React eski ro'yxat va yangi ro'yxatni solishtiradi. Agar siz `key` bermasangiz, React ro'yxatga yangi element qo'shilganini, o'chirilganini yoki joyi almashganini tushunishga qiynaladi va butun ro'yxatni boshidan chizishiga to'g'ri keladi. Bu esa juda katta ishlash tezligi (performance) muammolariga olib keladi.

### 🍔 Real-hayot analogiyasi
Tasavvur qiling, 5 ta farzandingiz bor. Ularning pasporti yoki takrorlanmas ismlari yo'q. Faqat "1-farzand", "2-farzand" deb chaqirasiz. Agar eng kattasi uydan chiqib ketsa, qolgan hamma farzandlarning raqami o'zgarib ketadi (2-farzand 1-bo'lib qoladi va hokazo). Lekin ularning har birida "Pasport raqami" (`key`) bo'lsa, kim qayerga ketganini yoki yangi odam kelganini darhol aniqlaysiz.

### 📊 React Diffing Algoritmi: `key` bilan va `key` siz

Quyidagi Mermaid diagrammasi orqali React DOM'ni qanday yangilashini ko'rib chiqamiz:

```mermaid
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
```

---

## 3. Nima uchun Array Index'ni `key` sifatida ishlatish xavfli? (Anti-pattern)

Juda ko'p boshlang'ich dasturchilar `key` muammosidan qutulish uchun `.map` ning ikkinchi parametri bo'lmish `index` (0, 1, 2...) dan foydalanishadi. Bu qat'iyan man etiladi!

❌ **Yomon amaliyot (Don't)**:
```jsx
// BUNDAY QILMANG!
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}
```

### Nima uchun bu xavfli?
Agar ro'yxatingiz statik bo'lsa (hech qachon o'zgarmasa, o'chirilmasa, joyi almashmasa), `index` ishlatish xavfsiz. Lekin ro'yxatga yangi element qo'shilsa (ayniqsa boshiga yoki o'rtasiga) yoki o'chirilsa, React qattiq adashadi.

Tasavvur qiling, ro'yxatingizda input qutilari bor.
1. Dastlab: `[A, B, C]` — ularning index keylari `[0, 1, 2]`. 
2. Siz 'A' elementini o'chirdingiz.
3. Yangi ro'yxat: `[B, C]` bo'ldi.
4. Endi 'B' ning indexi 0, 'C' niki 1 bo'lib qoldi.
5. React o'ylaydi: "Aha! 0 va 1 kalitli elementlar joyida ekan, faqat oxiridagi 2 kalitli element o'chirilibdi". 
6. Natijada ekranda eski ma'lumotlar chalkashib, boshqa inputning ichidagi yozuvlar boshqasiga o'tib qoladi!

✅ **To'g'ri amaliyot (Do)**: Har doim ma'lumotlar bazasidan keladigan takrorlanmas `id` (masalan, UUID yoki DB id) ishlating.

```jsx
// YAXSHI!
{items.map((item) => (
  <ListItem key={item.uuid} data={item} />
))}
```

---

## 4. Shartli Renderlash (Conditional Rendering)

Komponentlar har doim ham bir xil narsani ko'rsatavermaydi. Ba'zida foydalanuvchi tizimga kirgan bo'lsa (logged in) boshqa narsani, kirmagan bo'lsa boshqa narsani ko'rsatishimiz kerak.

React'da maxsus if-else teglar yo'q. Biz oddiy JavaScript mantiqlaridan foydalanamiz.

### 4.1. If-else mantig'i bilan Erta Qaytish (Early Return)
Agar butun boshli komponent qandaydir shartga ko'ra butunlay boshqa narsa ko'rsatishi kerak bo'lsa, uni to'g'ridan-to'g'ri funksiyaning boshida tekshiramiz.

```jsx
function Dashboard({ isLoading, user }) {
  if (isLoading) {
    return <div>Yuklanmoqda...</div>; // Erta qaytish
  }

  return <div>Xush kelibsiz, {user.name}!</div>;
}
```

### 4.2. Ternary operator (`shart ? rost : yolg'on`)
JSX ichida biz `if` ishlata olmaymiz, shuning uchun JavaScript'ning uchinchi darajali operatoridan foydalanamiz. Bu eng ko'p ishlatiladigan usul.

```jsx
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
```

### 4.3. Logical AND (`&&`)
Agar qandaydir shart bajarilsagina biror narsani ko'rsatish kerak bo'lsa, aks holda hech narsa ko'rsatilmasa, `&&` dan foydalanamiz.

```jsx
function Notifications({ messages }) {
  return (
    <div>
      <h1>Sizning xabarlaringiz</h1>
      {/* Agar xabarlar mavjud bo'lsa, quyidagi xabarni chiqaramiz */}
      {messages.length > 0 && <p>Sizda yangi xabarlar bor!</p>}
    </div>
  );
}
```

### ⚠️ Keng tarqalgan xavfli xato: `0 &&` muammosi

Yuqoridagi misolda `messages.length > 0 && ...` deb yozdik. Ko'p dasturchilar buni qisqartirib `messages.length && ...` deb yozishadi. Bu juda katta xato!

❌ **Yomon amaliyot (Don't)**:
```jsx
function Cart({ items }) {
  // Agar items.length 0 bo'lsa, React ekranga 0 raqamini yozib qo'yadi!
  return (
    <div>
      {items.length && <p>Savatda mahsulotlar bor</p>}
    </div>
  );
}
```

**Sababi:** JavaScript'da `0` bu *falsy* qiymat. Aytaylik savat bo'sh, `items.length` 0 ga teng. `0 && <p>...</p>` ifodasi JavaScript qoidalariga ko'ra `0` natijasini qaytaradi. React esa ekranga HTML o'rniga oddiy `0` raqamini chizib qo'yadi!

✅ **To'g'ri amaliyot (Do)**: Har doim ifodangiz aniq **Boolean** (true/false) qaytarayotganiga ishonch hosil qiling.

```jsx
// 1-usul: Aniq shart berish
{items.length > 0 && <p>Savatda mahsulotlar bor</p>}

// 2-usul: Ochiqchasiga boolean ga o'girish (!!)
{!!items.length && <p>Savatda mahsulotlar bor</p>}
```

---

## Xulosa

1. **`.map()`** - React'da ro'yxatlarni chizishning yagona va eng zo'r yo'li.
2. **`key`** - Bu ro'yxat elementlarining pasporti. U React'ga komponentlarni samarali yangilash imkonini beradi.
3. **`index` ni key qilmang** - Agar ro'yxat tartibi o'zgarishi mumkin bo'lsa, bu UI'da jiddiy va topish qiyin bo'lgan xatoliklarga olib keladi.
4. **Shartli renderlash** - `if` (erta qaytish), `? :` (ikki xil holat uchun) va `&&` (bor yoki yo'q holati uchun) operatorlaridan to'g'ri o'rinda foydalaning.
5. **Falsy muammosi** - `&&` ishlatganda ifodaning chap qismi raqamli `0` qaytarib, ekranda tushunarsiz `0` hosil bo'lishidan ehtiyot bo'ling. Doim mantiqni to'liq boolean ko'rinishiga olib keling (`> 0`).

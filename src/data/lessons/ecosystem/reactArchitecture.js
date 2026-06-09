export const reactArchitecture = {
  id: "reactArchitecture",
  title: "React Arxitekturasi va Tezkorlik (React Performance)",
  theory: `# React Arxitekturasi va React Performance (Masterclass)

Ushbu qo'llanma React 18 dasturlash muhitida kengaytiriluvchan (scalable) loyihalar arxitekturasini qurish va performance (tezkorlik) muammolarini hal qilishni eng sodda analogiyalardan boshlab senior darajagacha tushuntirib beradi.

---

## 1-BO‘LIM: React Arxitekturasi (Component Design)

### 1. Oddiy Tushuntirish & Real Hayot Analogiyasi
React loyihalarni **Component-Based Architecture** (Komponentlarga asoslangan arxitektura) deb ataymiz.
**Analogiya:** Buni xuddi **Lego konstruktoriga** o'xshatish mumkin. Sizda bitta ulkan o'yinchoq uy bor, lekin u kichik, mustaqil bloklardan (derazalar, eshiklar, g'ishtlar) yig'ilgan. Agar deraza sinsa, uyni to'liq buzmaysiz, faqat deraza blokini almashtirasiz.

- **Container vs Presentational (Smart vs Dumb) Components:**
  - **Dumb (Presentational):** Faqat tashqi ko'rinishga javob beradi. Unda o'z logikasi bo'lmaydi, faqat props qabul qiladi. (Analogiya: Lego g'ishtining o'zi).
  - **Smart (Container):** Ma'lumotlarni yuklaydi, state-ni boshqaradi va dumb komponentlarga uzatadi. (Analogiya: Uyning elektr shit paneli).

### 2. Kod Misollari (React 18)

#### A. Dumb Component (UserCard.jsx)
\`\`\`jsx
import React from 'react';

// Dumb: Faqat UI va props qabul qiladi
export const UserCard = ({ name, email, onAvatarClick }) => {
  return (
    <div className="card" onClick={onAvatarClick}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};
\`\`\`

#### B. Smart Component (UserListContainer.jsx)
\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { UserCard } from './UserCard';

// Smart: State va API logikasi bilan ishlaydi
export const UserListContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAvatarClick = (name) => {
    alert(\`\${name} profiliga o'tildi!\`);
  };

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          onAvatarClick={() => handleAvatarClick(user.name)}
        />
      ))}
    </div>
  );
};
\`\`\`

### 3. Real Muammo (Problem)
Katta loyihalarda barcha kod bitta faylga yozilsa, uni o'qish, testlash va qayta ishlatish (reusability) imkonsiz bo'lib qoladi. Kodlar aralashib ketadi (spagetti kod). Separation of Concerns (vazifalar ajratilishi) prinsipi buziladi.

### 4. Nima uchun muhim?
Production darajasidagi loyihalarda (masalan, Facebook, Netflix UI) komponentlar yuzlab marta qayta ishlatiladi. To'g'ri arxitektura kodni 5 barobar kamaytirishga va oson refaktoring qilishga imkon beradi.

### 5. Ko‘p Uchraydigan Xatolar (Junior Mistakes)
- Dumb komponent ichida to'g'ridan-to'g'ri \`fetch\` yozib yuborish.
- Bitta komponent ichida 1000 qatordan ortiq kod yozish.
- Komponentlar tuzilmasini (folder structure) tartibsiz saqlash.

### 6. Amaliyot Topshiriqlari
- **Oson:** Profil rasmini ko'rsatuvchi va props orqali faqat URL oladigan \`Avatar\` dumb komponentini yarating.
- **O‘rta:** Mahalliy JSON fayldan tovarlar ro'yxatini yuklovchi \`ProductContainer\` va ularni kartochka ko'rinishida chiqaruvchi \`ProductCard\` dumb komponentini yozing.
- **Qiyin:** Feature-based folder structure yordamida \`features/auth\` papkasini shakllantiring. Login formasi uchun validation Smart/Dumb arxitekturasini yarating.

### 7. Mini Test
1. Dumb komponentning asosiy vazifasi nima?
   *a) API-dan ma'lumot olish*
   *b) Props orqali kelgan ma'lumotni vizual ko'rsatish* (To'g'ri)
   *c) Global state-ni boshqarish*
2. Smart komponentlar nima qiladi?
   *a) Faqat stil yozish uchun ishlatiladi*
   *b) Logika, API va state-ni boshqaradi* (To'g'ri)

### 8. 12 ta Interview Savollari (Junior/Middle/Senior)
1. **Dumb va Smart komponentlarning asosiy farqi nima?**
   - Dumb faqat UI va props bilan ishlaydi, Smart esa ma'lumotlar oqimi va state boshqaruviga javob beradi.
2. **Container vs Presentational pattern-ni hozir ham ishlatish kerakmi?**
   - Custom hooklar kelishi bilan bu pattern qisman kamaydi, chunki logika hookka chiqib ketadi, lekin katta komponentlarda hali ham vizual va ma'lumot qismlarini ajratishda juda foydali.
3. **Feature-based folder structure nima?**
   - Papkalarni texnik turlari (components, pages) bo'yicha emas, biznes imkoniyatlari (features/auth, features/billing) bo'yicha guruhlash.
4. **Co-location prinsipi nima?**
   - Komponentga tegishli test, stil va yordamchi fayllarni uning yonida (bitta papkada) saqlash.
5. **Katta loyihalarda circular dependency qanday oldini olinadi?**
   - \`index.js\` (barrel exports) yordamida faqat tashqi tomonga ruxsat berish va papkalar ichiga chuqur import qilishni taqiqlash.
6. **Smart komponentni qanday qilib testlash osonroq?**
   - Uning biznes logikasini Custom Hook-ga ajratib, hook-ni alohida \`@testing-library/react-hooks\` orqali testlash orqali.
7. **Siz yaratgan eng katta React arxitekturasi qanday bo'lgan?**
   - Monorepo yoki Feature-based arxitektura, unda har bir modul mustaqil va package sifatida ajratilgan bo'ladi.
8. **Nega props-drilling yomon?**
   - Ma'lumotni ishlatmaydigan o'rta komponentlar orqali props uzatish kodni chalkashtiradi.
9. **Atomic Design tizimi nima?**
   - UI komponentlarni atomlar, molekulalar, organizmlar, shablonlar va sahifalar darajasida bo'lib qurish.
10. **Komponentni qayta ishlata olish darajasini (Reusability) qanday aniqlaysiz?**
    - Agar komponent tashqi state yoki API-ga bog'liq bo'lmasa va uni istalgan joyga props berib qo'yish mumkin bo'lsa.
11. **Barrels importlar React-ga qanday ta'sir qiladi?**
    - Importlarni toza qiladi, lekin ba'zida keraksiz kodlarni ham tortib kelishi (Tree shaking-ni buzishi) mumkin.
12. **Micro-frontends arxitekturasida React qanday moslashadi?**
    - Web Components yoki Module Federation (Webpack 5) orqali React komponentlarini boshqa tizimlarda ulash orqali.

---

## 2-BO‘LIM: State Management Arxitekturasi

### 1. Oddiy Tushuntirish & Real Hayot Analogiyasi
React-da state — bu komponentning xotirasidir.
**Analogiya:**
- **Local State (useState):** Sizning **shaxsiy hamyoningiz**. Unga faqat o'zingiz kirasiz, pulni o'zingiz sarflaysiz.
- **Props Drilling:** Pulni 5 qavatli binoning 1-qavatidan 5-qavatiga har bir qavatdagi odam orqali uzatish. Juda noqulay va pul yo'qolish xavfi bor.
- **Global State (Zustand/Redux):** Uyning o'rtasidagi **umumiy muzlatgich**. Istalgan odam borib undan ovqat (ma'lumot) olishi yoki yangi narsa qo'yishi mumkin. Hech kim o'rtada elchilik qilmaydi.

### 2. Kod Misollari (Zustand)

#### A. Zustand Store (useStore.js)
\`\`\`javascript
import { create } from 'zustand';

// Global do'kon (Store) yaratamiz
export const useUserStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  login: (userData) => set({ user: userData, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
\`\`\`

#### B. Component foydalanishi (Profile.jsx)
\`\`\`jsx
import React from 'react';
import { useUserStore } from './useStore';

export const Profile = () => {
  // Muzlatgichdan kerakli ma'lumot va funksiyani olamiz
  const { user, isLoggedIn, logout } = useUserStore();

  if (!isLoggedIn) return <h2>Iltimos, tizimga kiring.</h2>;

  return (
    <div>
      <h2>Xush kelibsiz, {user.name}!</h2>
      <button onClick={logout}>Chiqish</button>
    </div>
  );
};
\`\`\`

### 3. Real Muammo (Problem)
Agar Context API-dan tez-tez o'zgaruvchi global state uchun foydalansak, bitta qiymat o'zgarganda Context provayderi ichidagi barcha komponentlar majburan qayta render bo'ladi (unnecessary re-render). Redux yoki Zustand bu muammoni **selector-lar** orqali hal qiladi.

### 4. Nima uchun muhim?
Katta loyihalarda (masalan, savdo-sotiq savatchasi, foydalanuvchi seanslari) to'g'ri state management xotirani va server so'rovlarini tejaydi.

### 5. Ko‘p Uchraydigan Xatolar (Junior Mistakes)
- Hamma kichkina narsani (masalan input qiymatini) global state-ga yozish.
- Context API-ni performance optimallashtirishsiz og'ir ro'yxatlar uchun ishlatish.
- Redux-da boilerplate kodlarni keraksiz ko'paytirib yuborish.

### 6. Amaliyot Topshiriqlari
- **Oson:** Zustand yordamida oddiy sanagich (counter: increment, decrement) global state-ini yozing.
- **O‘rta:** Zustand va asinxron fetch yordamida tovarlarni API-dan olib global saqlovchi va savatchaga qo'shuvchi \`useCartStore\` yarating.
- **Qiyin:** Context API-da \`useMemo\` yordamida re-renderlarni kamaytiruvchi custom State Provider tuzilmasini yozing.

### 7. Mini Test
1. Props drilling muammosi nima?
   *a) Serverga so'rovning kechikishi*
   *b) State-ni o'rta komponentlar orqali pastga uzatish majburiyati* (To'g'ri)
   *c) Xotira to'lib ketishi*
2. Zustand-ning Context API-dan asosiy afzalligi?
   *a) CSS yozishni osonlashtiradi*
   *b) Faqat o'zgargan selector komponentini render qiladi (no re-render all)* (To'g'ri)

### 8. 12 ta Interview Savollari (Junior/Middle/Senior)
1. **Local state va Global state qachon ishlatiladi?**
   - Agar ma'lumot faqat bitta komponent va uning bevosita bolasi uchun kerak bo'lsa local, ko'p joyda ishlatilsa global.
2. **Context API state management vositasimi?**
   - Yo'q, Context faqat ma'lumotni uzatish (dependency injection) vositasi. State-ni boshqarish uchun baribir \`useState\`/\`useReducer\` kerak.
3. **Zustand nega hozirda Redux-dan ommalashib ketdi?**
   - Context-siz ishlaydi, kod yozish juda kam (no boilerplate), selector-larni qo'llab-quvvatlaydi, sodda.
4. **Redux Toolkit (RTK) nima?**
   - Redux-ning standart murakkab yozilishini osonlashtiradigan, ichida Thunk va Immer kutubxonalari bo'lgan zamonaviy to'plami.
5. **Redux-da "Reducer" nima?**
   - Joriy state va action-ni qabul qilib, mutlaqo yangi o'zgarmas (immutable) state qaytaradigan toza funksiya.
6. **State-ni "single source of truth" (yagona haqiqat manbasi) qilish nima uchun kerak?**
   - Ma'lumotlarning loyiha bo'ylab bir xil va ziddiyatsiz bo'lishini ta'minlash uchun.
7. **Jotai yoki Recoil kabi Atomic state management qanday ishlaydi?**
   - State-ni kichik atomlarga bo'ladi. Komponentlar faqat o'zlari bog'langan atom o'zgargandagina render bo'ladi.
8. **Context API-da re-render muammosini qanday hal qilish mumkin?**
   - Provayder qiymatini (value) \`useMemo\` ga olish, Context-ni ikkiga bo'lish (State va Dispatch) yoki \`React.memo\` ishlatish.
9. **State Mutation nima va u nega React-da xavfli?**
   - State obyektini to'g'ridan-to'g'ri o'zgartirish. Bu React-da re-render bo'lmasligiga sabab bo'ladi, chunki reference o'zgarmaydi.
10. **Zustand-da asinxron amallar (actions) qanday yoziladi?**
    - Redux Thunk-siz, oddiy asinxron funksiyani store ichida e'lon qilib, \`set\` orqali state-ni yangilash mumkin.
11. **XState (FSM - Finite State Machine) qachon ishlatiladi?**
    - Loyihaning holatlari (states) o'ta murakkab va qat'iy tartibli (masalan, to'lov jarayoni bosqichlari) bo'lganda.
12. **Server state (React Query / RTK Query) bilan Client state farqi nima?**
    - Server state asosan keshlash, yuklash holatlari va ma'lumotni yangilab turish bilan shug'ullanadi. Client state esa faqat brauzerdagi UI holatini saqlaydi.

---

## 3-BO‘LIM: React Performance Asoslari

### 1. Oddiy Tushuntirish & Real Hayot Analogiyasi
React tez ishlashining siri — u brauzerdagi og'ir DOM amallarini minimallashtiradi.
**Analogiya:**
Sizning qo'lingizda **rasmli kitob** bor. Siz rasmdagi faqat bitta detalni (masalan, quyosh rangini) o'zgartirmoqchisiz.
- **Eski JS (Real DOM):** Butun sahifani o'chirib, noldan yangi qog'ozga butun rasmni qayta chizish. (Sinfda hammani turg'izib, xonani qayta bezash).
- **Virtual DOM:** Sahifaning xotiradagi tezkor nusxasi (eskizi).
- **Reconciliation & Diffing:** Siz o'zgartirishni avval o'sha eskizda qilasiz, keyin eski va yangi eskizni solishtirasiz (Diffing) va faqat quyoshni sariq rangga bo'yaysiz.

### 2. Kod Misollari (React 18)

#### A. Keraksiz Re-render Muammosi
\`\`\`jsx
import React, { useState } from 'react';

// Parent komponent
export const CounterParent = () => {
  const [count, setCount] = useState(0);
  console.log("Parent render bo'ldi!");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Oshirish: {count}</button>
      <SlowChild />
    </div>
  );
};

// Child komponent
const SlowChild = () => {
  console.log("SlowChild render bo'ldi (Muammo!)");
  return <h3>Men har safar keraksiz render bo'laman!</h3>;
};
\`\`\`

### 3. Real Muammo (Problem)
React-da ota (parent) komponent render bo'lsa, uning barcha bola (child) komponentlari ham avtomatik ravishda qayta render bo'ladi. Agar bolalar og'ir bo'lsa, bu butun sahifani qotiradi (Lag).

### 4. Nima uchun muhim?
Katta ma'lumotli jadvallar (Dashboard), cheksiz ro'yxatlar (Infinity Scroll) va animatsiyalarda bu qoidaga rioya qilmaslik foydalanuvchining loyihani tark etishiga olib keladi.

### 5. Ko‘p Uchraydigan Xatolar (Junior Mistakes)
- React Virtual DOM ishlatgani uchun o'zidan-o'zi doim tez ishlaydi deb o'ylash.
- Re-render sabablarini tekshirmaslik.
- O'zgaruvchan state-larni komponentlar daraxtining juda tepasiga qo'yib qo'yish (Lifting state up-ni keraksiz ko'p ishlatish).

### 6. Amaliyot Topshiriqlari
- **Oson:** console.log yordamida ota komponent state-i o'zgarganda bolalar render bo'layotganini kuzating va holatni tasvirlang.
- **O‘rta:** virtual DOM-ni simulyatsiya qiluvchi oddiy JavaScript obyekti shaklidagi diffing funksiyasini yozing.
- **Qiyin:** Katta jadval komponentini yaratib, parent inputga yozilganda butun jadval render bo'lish muammosini ko'rsating.

### 7. Mini Test
1. Virtual DOM qayerda saqlanadi?
   *a) Brauzer diskida*
   *b) Kompyuter operativ xotirasida (RAM)* (To'g'ri)
   *c) CSS faylda*
2. Nima uchun parent render bo'lsa child ham render bo'ladi?
   *a) React-ning asosiy tabiati (daraxt yangilanishi)* (To'g'ri)
   *b) Props drilling tufayli*

### 8. 12 ta Interview Savollari (Junior/Middle/Senior)
1. **Virtual DOM nima va u nega tez?**
   - Brauzer real DOM-ni yangilashda stillarni hisoblaydi va layout qiladi (reflow). Virtual DOM esa RAM dagi oddiy ob'ekt bo'lgani uchun tez.
2. **Reconciliation nima?**
   - React-ning Virtual DOM va Real DOM-ni solishtirib, eng qisqa yo'l bilan o'zgartirish algoritmi.
3. **Diffing algoritmining murakkabligi (Time Complexity) qancha?**
   - O(N) vaqtda ishlaydi (evristik qoidalar yordamida).
4. **React Fiber nima vazifani bajaradi?**
   - Render ishlarini to'xtatib turish, ustuvorlik berish va asosiy oqim band bo'lmaganda davom ettirish (scheduling).
5. **Re-render jarayoni qanday bosqichlardan iborat?**
   - Render phase (Virtual DOM hisoblash) va Commit phase (Real DOM-ga yozish).
6. **Virtual DOM real DOM-ga nisbatan har doim tezroqmi?**
   - Yo'q, agar juda kichik o'zgarishlar bo'lsa, to'g'ridan-to'g'ri DOM-ni o'zgartirish tezroq bo'lishi mumkin.
7. **React 18 da "Concurrent Mode" nima?**
   - React-ning bir vaqtda bir nechta UI versiyalarini tayyorlash imkoniyati (masalan, orqa fonda og'ir sahifani chizish).
8. **Render phase va Commit phase farqi nima?**
   - Render phase asinxron va xavfsiz to'xtatilishi mumkin, Commit phase sinxron va to'xtatib bo'lmaydi (DOM o'zgaradi).
9. **Batching nima?**
   - React-da bir nechta state o'zgarishlarini bitta re-renderga guruhlash (React 18 da avtomatik ishlaydi).
10. **Nega state-ni mutatsiya qilish re-render chaqirmaydi?**
    - Chunki React \`Object.is\` orqali reference-ni tekshiradi, agar manzil o'zgarmasa, hech narsa o'zgarmadi deb hisoblaydi.
11. **Virtual DOM-ni Svelte yoki SolidJS qanday chetlab o'tadi?**
    - Ular kompilyatsiya vaqtida kodni to'g'ridan-to'g'ri real DOM-ni yangilaydigan targetlangan JS kodiga aylantiradi.
12. **React DevTools-da render vaqtlarini qanday ko'rish mumkin?**
    - Profiler tab-idan foydalanib flame-chart yoki rank-chart tahlili orqali.

---

## 4-BO‘LIM: Performance Optimization Texnikalari

### 1. Oddiy Tushuntirish & Real Hayot Analogiyasi
Biz React-ga keraksiz ishlarni taqiqlashimiz kerak. Bunga **Memoization** (keshlash) deyiladi.
**Analogiya:**
Siz matematikadan **135 x 24** misolining javobini hisobladingiz. Natija: **3240**.
- **Memoization-siz (useMemo yo'q):** Har safar sizdan "135 x 24 necha bo'ladi?" deb so'rashganda, qog'oz-qalam olib qaytadan hisoblaysiz (og'ir render).
- **Memoization bilan (useMemo bor):** Javobni daftaringizga (keshga) yozib qo'yasiz. Ikkinchi safar so'rashganda, darhol "3240" deb aytasiz.
- **React.memo (Darvozabon):** Agar mehmonga (komponentga) olib kelingan sovg'a (props) o'zgarmagan bo'lsa, uni eshikdan qaytaradi (re-render qilmaydi).

### 2. Kod Misollari (React 18)

#### React.memo va useCallback birgalikda
\`\`\`jsx
import React, { useState, useCallback } from 'react';

export const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Funksiya reference-ini useCallback orqali keshlaymiz
  const handleAction = useCallback(() => {
    console.log("Amal bajarildi!");
  }, []); // Dependency bo'sh bo'lgani uchun 1 marta yaratiladi

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* Memoized bola komponent */}
      <OptimizedChild onAction={handleAction} />
    </div>
  );
};

// React.memo bolani keraksiz renderdan himoya qiladi
const OptimizedChild = React.memo(({ onAction }) => {
  console.log("OptimizedChild render bo'ldi! (Faqat 1 marta)");
  return (
    <button onClick={onAction}>Bolalar Tugmasi</button>
  );
});
\`\`\`

### 3. Real Muammo (Problem)
Agar \`React.memo\` ga funksiya props qilib uzatilsa-yu, u funksiya parent ichida \`useCallback\` ga olinmagan bo'lsa, parent render bo'lganda funksiya manzili yangilanadi. Natijada \`React.memo\` baribir render chaqiraveradi (Shallow comparison buziladi).

### 4. Nima uchun muhim?
Katta formalarda, har bir harf yozilganda butun sahifa qayta render bo'lmasligi uchun bu uchta texnika birgalikda ishlatiladi.

### 5. Ko‘p Uchraydigan Xatolar (Junior Mistakes)
- Oddiy so'z yoki sonlarni \`useMemo\` ichida saqlash.
- Funksiyalarni dependencysiz \`useCallback\` ichiga o'rab qo'yish (eski state qolib ketishi - stale closure).
- \`React.memo\` ni barcha komponentlarga ko'r-ko'rona qo'shib chiqish.

### 6. Amaliyot Topshiriqlari
- **Oson:** \`React.memo\` ishlatib, parent input o'zgarganda render bo'lmaydigan bola komponent yarating.
- **O‘rta:** API so'rov natijalarini filtrlaydigan va natijani \`useMemo\` da saqlovchi filtr komponentini yozing.
- **Qiyin:** \`React.lazy\` va \`Suspense\` yordamida loyihadagi sahifalarni (Routes) code-splitting qiling.

### 7. Mini Test
1. \`useCallback\` ning asosiy vazifasi nima?
   *a) Sonli hisob-kitoblarni saqlash*
   *b) Funksiya havolasini (reference) renderlararo keshlab qolish* (To'g'ri)
   *c) API-dan kelgan ma'lumotni keshga yozish*
2. Nega \`React.memo\` ba'zida ishlamaydi?
   *a) CSS o'zgarganligi sababli*
   *b) Parent unga keshlanmagan yangi obyekt yoki funksiya uzatayotgani uchun* (To'g'ri)

### 8. 12 ta Interview Savollari (Junior/Middle/Senior)
1. **React.memo nima?**
   - Props-larni shallow solishtirib, o'zgarmasa komponent renderini to'xtatuvchi HOC.
2. **useMemo va useCallback farqi nima?**
   - \`useMemo\` qiymatni keshlaydi, \`useCallback\` funksiyaning o'zini keshlaydi.
3. **Nega har doim useMemo ishlatish yomon?**
   - Chunki har renderda dependency massivini solishtirish va keshga yozish ham xotira va vaqt talab qiladi (overhead).
4. **Referential Integrity React-da nima uchun muhim?**
   - React elementlarning o'zgarganini xotira manzili (reference) orqali aniqlagani uchun.
5. **Lazy loading nima va u qachon kerak?**
   - Sahifa yoki og'ir komponentlarni faqat kerak bo'lganda (user ochganda) yuklash. Bu boshlang'ich yuklanish (bundle size) vaqtini kamaytiradi.
6. **Code splitting nima?**
   - Bitta ulkan JS faylni kichik bo'laklarga (chunks) ajratish.
7. **useCallback-da dependency massivini bo'sh qoldirsak nima bo'ladi?**
   - Funksiya faqat 1 marta yaratiladi va uning ichidagi o'zgaruvchilar o'sha vaqtdagi qiymatida qotib qoladi (stale closure).
8. **React.memo ikkinchi argumenti nima vazifani bajaradi?**
   - Custom taqqoslash funksiyasi: \`(prevProps, nextProps) => boolean\`.
9. **React-da "Suspense" nima?**
   - Bolalar (lazy komponentlar yoki asinxron ma'lumotlar) yuklanib bo'lgunga qadar zaxira UI (fallback, masalan spinner) ko'rsatish vositasi.
10. **Bundle size-ni qanday qilib kamaytirish mumkin?**
    - Dynamic importlar, lazy loading va keraksiz kutubxonalarni o'chirish (tree shaking) orqali.
11. **useMemo yordamida Referential Identity muammosini qanday yechasiz?**
    - Agar bolaga obyekt uzatilsa, o'sha obyektni \`useMemo\` ga o'rab qo'yish orqali.
12. **useEvent (hozirda RFC) hook-i useCallback-dan qanday farq qiladi?**
    - U doimo yangi state-ga ega bo'ladi, lekin funksiya reference-i hech qachon o'zgarmaydi (dependency talab qilmaydi).

---

## 5-BO‘LIM: Rendering Optimization (List Rendering)

### 1. Oddiy Tushuntirish & Real Hayot Analogiyasi
Biz ro'yxatlarni chizganimizda React ularni juda tez yangilashi kerak.
**Analogiya:**
Sizda **talabalar navbati** bor: \`[Ali, Vali, G'ani]\`.
Siz navbatning boshiga \`Sami\`ni qo'shmoqchisiz: \`[Sami, Ali, Vali, G'ani]\`.
- **Key-siz yoki Index key ishlatilsa:** React navbatdagi hamma odamning ismini tekshirib, hammani joyidan qo'zg'atib, qaytadan yozib chiqadi. Chunki indekslar o'zgarib ketdi (0-indeks Ali edi, endi Sami bo'ldi).
- **Unikal ID key ishlatilsa (key="id-123"):** React darhol Sami yangi ekanligini, Ali, Vali va G'ani esa shunchaki surilganini ko'radi va ularni qayta render qilmaydi.

### 2. Kod Misollari (React 18)

#### To'g'ri va xavfsiz ro'yxat renderingi
\`\`\`jsx
import React, { useState } from 'react';

export const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 'todo-1', text: "React o'rganish" },
    { id: 'todo-2', text: "Musiqa eshitish" }
  ]);

  const addTodoAtStart = () => {
    const newTodo = { id: \`todo-\${Date.now()}\`, text: "Yangi vazifa" };
    setTodos([newTodo, ...todos]); // Boshiga qo'shamiz
  };

  return (
    <div>
      <button onClick={addTodoAtStart}>Boshiga qo'shish</button>
      <ul>
        {todos.map((todo) => (
          // key sifatida index emas, unikal todo.id ishlatiladi
          <TodoItem key={todo.id} text={todo.text} />
        ))}
      </ul>
    </div>
  );
};

const TodoItem = React.memo(({ text }) => {
  console.log(\`TodoItem render bo'ldi: \${text}\`);
  return <li>{text}</li>;
});
\`\`\`

### 3. Real Muammo (Problem)
Jadvallarda minglab satrlar bo'lsa va bitta element o'zgarsa, qolgan 999 ta element ham qayta render bo'ladi. Bu kompyuter protsessorini (CPU) 100% yuklab, brauzerni muzlatib qo'yadi.

### 4. Nima uchun muhim?
Barcha admin panellar, chat xabarlari ro'yxati va ijtimoiy tarmoqlar tasmasi (Feed) list rendering optimizatsiyasiga tayanadi.

### 5. Ko‘p Uchraydigan Xatolar (Junior Mistakes)
- \`key={Math.random()}\` yozish. Bu har renderda mutlaqo yangi key yaratib, butun ro'yxatni noldan qayta o'rnatadi (Destroy and mount).
- Kalit (key) ni o'tkazib yuborish yoki index ishlataverish.

### 6. Amaliyot Topshiriqlari
- **Oson:** \`key\` sifatida index ishlatilgandagi render soni bilan unikal id ishlatilgandagi farqni console.log orqali tahlil qiling.
- **O‘rta:** Foydalanuvchi qidiruv tizimini yarating, ro'yxat elementlari \`React.memo\` bilan o'ralgan bo'lsin.
- **Qiyin:** Jadval elementlarini qo'shish, o'chirish va tahrirlashda faqat o'zgargan qator render bo'lishini ta'minlovchi mukammal kod yozing.

### 7. Mini Test
1. Nima uchun \`key={Math.random()}\` yozish juda yomon?
   *a) Kod chiroyli ko'rinmaydi*
   *b) Har renderda noldan chizishga majbur qiladi (performance-ni o'ldiradi)* (To'g'ri)
   *c) Server xatoga yo'l qo'yadi*
2. React ro'yxat renderida indeksdan qachon foydalanish mumkin?
   *a) Hech qachon*
   *b) Ro'yxat o'zgarmas (statik) bo'lsa va saralanmasa/o'chirilmasa* (To'g'ri)

### 8. 12 ta Interview Savollari (Junior/Middle/Senior)
1. **Nima uchun \`key\` prop React-da juda muhim?**
   - React Virtual DOM diffing jarayonida elementlarning shaxsiyatini (identity) saqlab qolish va faqat o'zgarganini chizish uchun.
2. **Nega \`key\` sifatida index ishlatish tavsiya etilmaydi?**
   - Elementlar tartibi o'zgarganda indekslar yangilanadi va React eski ma'lumotlarni yangi joyga noto'g'ri render qiladi.
3. **\`key\` qiymatini komponent ichida o'qib olish mumkinmi?**
   - Yo'q, \`key\` va \`ref\` React-ning o'ziga tegishli (reserved) prop-lar hisoblanadi va komponent ichida ularni o'qib bo'lmaydi.
4. **Har renderda yangi key generatsiya qilinsa nima bo'ladi?**
   - Butun DOM daraxti noldan yaratiladi (mount/unmount), bu performance-ni pasaytiradi va barcha local state-lar yo'qoladi.
5. **Ro'yxatlarni render qilishda qanday optimizatsiya usullari bor?**
   - \`React.memo\` ishlatish, unikal kalitlar va dynamic render (virtualization).
6. **Reconciliation ro'yxatlar uchun qanday algoritmdan foydalanadi?**
   - Key-lar asosida moslikni topish algoritmidan.
7. **Nega React xatolik beradi agar key qo'yilmasa?**
   - Warning beradi, chunki bu holda React sukut bo'yicha indeksni kalit deb oladi va bu xavfli ekanligidan ogohlantiradi.
8. **Fragment-lar bilan ishlayotganda \`key\` qayerga yoziladi?**
   - \`<React.Fragment key={id}>\` ko'rinishida yozilishi shart (\`<>\` qisqa sintaksisda key qo'llab-quvvatlanmaydi).
9. **Katta ro'yxatlarni tezkor chizish uchun virtualizatsiya nima?**
   - Faqat ekranga ko'rinib turgan 10-15 ta elementni render qilish, qolgan minglab elementlarni esa scroll vaziyatiga qarab render qilish.
10. **Virtualizatsiya uchun qaysi kutubxonalarni bilasiz?**
    - \`react-window\`, \`react-virtualized\` yoki \`virtuoso\`.
11. **CSS \`content-visibility: auto\` React performance-ga qanday yordam beradi?**
    - Ekranda ko'rinmaydigan elementlarning renderlanishini brauzer darajasida optimallashtiradi.
12. **\`key\` o'zgarishi butun komponentni qayta yuklash uchun hiyla (hack) sifatida qanday ishlatiladi?**
    - Agar komponentga berilgan \`key\` qiymatini o'zgartirsangiz (masalan, \`key={userId}\`), React eski state-larni tozalab, komponentni noldan toza yaratadi (reset state).

---

## 6-BO‘LIM: Advanced Performance Concepts

### 1. Oddiy Tushuntirish & Real Hayot Analogiyasi
Biz darsimizni yanada chuqurlashtiramiz va dasturdagi yashirin xatolarni aniqlaymiz.
**Analogiya:**
Siz mashina haydayapsiz. Mashina sekinlashib, g'alati ovoz chiqaryapti.
- **Profiler (React DevTools):** Bu **diagnostika asbobi** (kompyuter tekshiruvi). Uni ulab, mashinaning qaysi detali qizib ketayotganini aniq ko'rasiz.
- **Debounce (Kutib turish):** Siz liftdasiz. Har bir odam kelganda lift eshigi darhol yopilmaydi. Lift eng oxirgi odam kelganidan keyin 3 soniya kutadi (debounce) va keyin yuradi. (Inputga tez yozilganda har bir harfga serverga so'rov yubormaslik).
- **Throttle (Cheklovchi):** Suv krani. Suv tomchilari har 1 soniyada 1 marta tomadi (throttle), siz uni qanchalik tez buramang, baribir tomish tezligi oshmaydi. (Scroll bo'lganda so'rovlarni cheklash).

### 2. Kod Misollari (React 18)

#### A. Custom Debounce Hook (useDebounce.js)
\`\`\`javascript
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Tozalash (cleanup) - keyingi safar qiymat o'zgarganda taymer bekor bo'ladi
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
\`\`\`

#### B. Component foydalanishi (SearchInput.jsx)
\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500); // 500ms kutadi

  useEffect(() => {
    if (debouncedSearch) {
      console.log(\`API ga so'rov ketdi: \${debouncedSearch}\`);
      // fetch API so'rovi shu yerda bo'ladi
    }
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Qidiruv..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
\`\`\`

### 3. Real Muammo (Problem)
Scroll event eshitilganda, foydalanuvchi scroll qilganda millisoniyalar ichida yuzlab chaqiruvlar sodir bo'ladi. Agar har safar DOM o'zgartirilsa yoki API so'ralsa, sahifa butunlay muzlab qoladi. Throttle bu chaqiruvlarni soniyasiga masalan faqat 5 martaga cheklaydi.

### 4. Nima uchun muhim?
Google qidiruv oynasi (Autocomplete), xarita (Google Maps) drag-and-drop amallari va infinite scroll elementlari advanced performance andozalari asosida quriladi.

### 5. Ko‘p Uchraydigan Xatolar (Junior Mistakes)
- Inputga yozilganda debounce-siz har bir harfga fetch yuborib serverni yuklash (DDOS qilish).
- Debounce taymerini tozalashni (clearTimeout) unutilishi natijasida xotira sizib chiqishi (memory leaks).

### 6. Amaliyot Topshiriqlari
- **Oson:** scroll eventini eshituvchi va uni konsolga chiqarish tezligini cheklovchi oddiy throttle funksiyali komponent yarating.
- **O‘rta:** \`useDebounce\` hook-i yordamida foydalanuvchilar ro'yxatini API-dan qidirib topuvchi interfeys yozing.
- **Qiyin:** \`react-window\` kutubxonasi yordamida 10 000 ta elementdan iborat massivni ekran virtualizatsiyasi orqali silliq render qiling.

### 7. Mini Test
1. Debounce va Throttle farqi nimada?
   *a) Ikkalasi bir xil narsa*
   *b) Debounce harakat tugaganidan so'ng chaqiradi, Throttle ma'lum vaqt oralig'ida faqat 1 marta chaqiradi* (To'g'ri)
   *c) Throttle faqat serverda ishlaydi*
2. React DevTools Profiler-dagi "Flame chart" nima beradi?
   *a) Loyiha kodini yashiradi*
   *b) Qaysi komponent render bo'lgani va unga ketgan vaqtni rangli vizual ko'rsatadi* (To'g'ri)

### 8. 12 ta Interview Savollari (Junior/Middle/Senior)
1. **Profiler asbobi nima uchun kerak?**
   - React komponentlarining qaysi biri necha millisoniyada va nima sababdan render bo'lganini vizual ko'rish uchun.
2. **Debounce nima va u qachon kerak?**
   - Tez sodir bo'layotgan voqealarni (masalan, harflar yozish) to'xtashini kutib, so'ngra faqat 1 marta bajarish uchun.
3. **Throttle nima va u qachon ishlatiladi?**
   - Harakatlar qanchalik ko'p bo'lmasin, ularni ma'lum vaqt chegarasida (masalan, har 200ms da 1 marta) cheklash uchun (scroll, resize).
4. **Virtualizatsiya nima va u qanday ishlaydi?**
   - Katta ma'lumotlarni render qilganda faqat foydalanuvchiga ko'rinib turgan hududni chizish va qolganini bo'sh joy (padding) sifatida saqlash.
5. **Debounce-ni useEffect-da tozalash (cleanup) nima uchun shart?**
   - Eski taymerlarni o'chirish va xotirada ortiqcha taymerlar yig'ilib qolishini oldini olish uchun.
6. **React 18 dagi \`useDeferredValue\` nima va u debounce-dan nimasi bilan farq qiladi?**
   - U brauzer bo'sh bo'lganda og'ir UI yangilanishlarini kechiktirishga imkon beradi. Debounce-dan farqi - qat'iy vaqt (delay) belgilanmaydi, u brauzer tezligiga moslashadi.
7. **React 18 dagi \`useTransition\` nima?**
   - State o'zgarishini "low priority" (past ustuvorlik) deb belgilaydi, natijada muhimroq UI (input yozilishi) qotmaydi.
8. **Lighthouse React performance ko'rsatkichlariga qanday ta'sir qiladi?**
   - Bundle hajmi, birinchi chizilish (FCP) va interaktivlik vaqti (TTI) kabi ko'rsatkichlarni tahlil qiladi.
9. **"Stale Closure" muammosi advanced hooklar yaratishda qanday yuzaga keladi?**
   - Funksiya keshlanganda uning tashqi o'zgaruvchilari eski holatda qolib ketsa. Dependency massivini to'g'ri sozlash bilan hal qilinadi.
10. **React DevTools-da "Record why each component rendered" qanday yoqiladi?**
    - DevTools sozlamalaridan "Record why each component rendered while profiling" katakchasini yoqish orqali.
11. **Concurrency nima?**
    - React-ning bir vaqtda bir nechta vazifalarni parallel va uzilishlar bilan (interruptible rendering) bajara olish qobiliyati.
12. **\`useId\` nima va u SSR-da performance-ga qanday yordam beradi?**
    - Server va mijoz (client) tomonlarida bir xil unikal ID-lar yaratib, HTML gidratsiya (hydration) xatolarining oldini oladi.

---

## 7-BO‘LIM: Real Production Architecture (Separation of Concerns)

### 1. Oddiy Tushuntirish & Real Hayot Analogiyasi
Katta loyihalarni boshqarish uchun eng muhim qoida — har bir kodning o'z joyi bo'lishi kerak (**Separation of Concerns**).
**Analogiya:**
Buni **professional restoran oshxonasiga** o'xshatish mumkin:
- **UI (Komponentlar):** Ofitsiantlar. Ular faqat mijozga ovqatni yetkazadi va buyurtmani oladi (ko'rinish va interaktivlik).
- **Custom Hooks (Biznes logika):** Oshpazlar. Ular orqa fonda ovqat pishiradi, qanday pishirishni (logikani) ofitsiantdan yashiradi.
- **Service Layer (API):** Mahsulot yetkazib beruvchilar. Ular tashqaridan go'sht va sabzavotlar (API ma'lumotlar) olib keladi.

### 2. Kod Misollari (React 18)

#### A. API Service Layer (userService.js)
\`\`\`javascript
// API so'rovlar uchun alohida qatlam (Service Layer)
export const userService = {
  getAll: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error("Yuklashda xato yuz berdi!");
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    return res.json();
  }
};
\`\`\`

#### B. Custom Hook (useUsers.js)
\`\`\`javascript
import { useState, useEffect } from 'react';
import { userService } from './userService';

// Logika komponentdan to'liq ajratildi
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService.getAll()
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};
\`\`\`

#### C. View Component (UserList.jsx)
\`\`\`jsx
import React from 'react';
import { useUsers } from './useUsers';

export const UserList = () => {
  // Komponent faqat ma'lumotni oladi va vizual chizadi (View)
  const { users, loading, error } = useUsers();

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p className="error">Xatolik: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
\`\`\`

### 3. Real Muammo (Problem)
Agar bitta JSX faylning ichida API fetch yozilsa, state boshqarilsa, ma'lumot parse qilinsa va UI chizilsa, bu kodni boshqa joyda qayta ishlatib bo'lmaydi va unit test yozish kabusga aylanadi.

### 4. Nima uchun muhim?
Katta guruh bo'lib ishlaganda (masalan, 10+ dasturchi), bu arxitektura har kimga bir-biriga xalaqit bermasdan, UI dizayneri UI-ni, backendchi esa API logikasini parallel yozishiga imkon beradi.

### 5. Ko‘p Uchraydigan Xatolar (Junior Mistakes)
- JSX fayl ichida og'ir JavaScript hisob-kitoblarini aralashtirib tashlash.
- Custom hook-larni ishlatmasdan, barcha narsani useEffect ichida har bir komponentga qaytadan yozib chiqish.

### 6. Amaliyot Topshiriqlari
- **Oson:** Mahalliy ob-havo ma'lumotlarini oluvchi alohida \`weatherService\` yaratib, uni oddiy komponentda ishlating.
- **O‘rta:** Savatchaga tovar qo'shish va hisoblash logikasini butunlay \`useCart\` custom hookiga o'tkazing.
- **Qiyin:** Katta scalable loyiha papkalar tuzilmasini (src/features, src/components, src/services) yarating va to'liq authentication (login, logout, token refresh) logikasini ushbu qatlamlar asosida yozing.

### 7. Mini Test
1. Service Layer pattern nima uchun kerak?
   *a) Tugmalarni bezash uchun*
   *b) API so'rovlarni alohida fayllarga ajratib, markazlashtirilgan boshqarish uchun* (To'g'ri)
   *c) CSS stillarini yuklash uchun*
2. Custom hook-ning asosiy afzalligi?
   *a) Dasturni tezroq yuklaydi*
   *b) Biznes logikani qayta ishlata oladigan darajada komponentdan ajratadi* (To'g'ri)

### 8. 12 ta Interview Savollari (Junior/Middle/Senior)
1. **Separation of Concerns (Vazifalar ajratilishi) React-da qanday qo'llaniladi?**
   - UI (JSX), Logika (Custom Hooks) va Ma'lumot (Services/API) qatlamlarini bir-biridan ajratish orqali.
2. **Nega React loyihalarda custom hooklar muhim?**
   - Biznes logika va stateful harakatlarni boshqa komponentlarda ham qayta ishlatish uchun.
3. **Service Layer nima?**
   - API so'rovlari va tarmoq kutubxonalari (Axios) sozlamalari yoziladigan loyiha qatlami.
4. **Custom hook va oddiy yordamchi (helper) funksiya farqi nima?**
   - Custom hook o'z ichida boshqa React hooklarini (useState, useEffect) ishlata oladi, helper esa oddiy JS funksiyasi bo'lib, hook ishlatolmaydi.
5. **Katta loyihalarda \`src/features\` (Feature-based) arxitekturasini qanday tashkil qilasiz?**
   - Har bir feature (masalan, \`auth\`) o'zining \`components\`, \`hooks\`, \`services\` va \`index.js\` (tashqi interfeys) papkalariga ega bo'ladi.
6. **Separation of concerns unit-test yozishni qanday osonlashtiradi?**
   - Logikani UI-siz (custom hook), API-ni esa mock ma'lumotlar bilan alohida, juda oddiy sinovdan o'tkazish mumkin bo'ladi.
7. **React-da Container/Presenter andozasini nima almashtirdi?**
   - Custom Hooks arxitekturasi.
8. **Scalable (kengaytirib boriladigan) React loyihaning papkalar tuzilishi qanday bo'lishi kerak?**
   - \`src/components\` (umumiy UI), \`src/features\` (biznes modullar), \`src/services\` (API), \`src/hooks\` (global hooklar), \`src/context\` (global state).
9. **Dry (Don't Repeat Yourself) qoidasi React-da qanday buziladi?**
   - Har bir sahifada API so'rovlarni yoki validation qoidalarini qaytadan yozib chiqish orqali.
10. **Custom hook ichida \`useEffect\` yozish yaxshimi yoki komponentdami?**
    - Custom hook ichida yozish afzal, shunda komponent faqat toza natijalarni qabul qiladi va \`useEffect\` nojo'ya ta'sirlaridan xoli bo'ladi.
11. **Barrel exports (\`index.js\` fayllari) foyda va zararlari nima?**
    - Foydasi: Import yo'llarini qisqartiradi (\`import { Button } from '@/components'\`). Zarari: Circular dependency va bundle hajmini oshirishi (tree shaking to'siqlari).
12. **React dynamic importlar yordamida bundle-ni qanday optimallashtirgan bo'lar edingiz?**
    - Katta va kam ishlatiladigan feature modullarni (masalan, PDF eksport yoki Admin dashboard) faqat kerak bo'lganda dynamic import yordamida yuklash orqali.
`,
  exercises: [
    {
      id: 1,
      title: "React props shallow comparison",
      instruction: "Ikki props obyektini yuzaki (shallow) solishtirib, ular teng bo'lsa true, farq qilsa false qaytaruvchi `shallowEqual(objA, objB)` funksiyasini yozing.",
      startingCode: "function shallowEqual(objA, objB) {\n  if (objA === objB) return true;\n  const keysA = Object.keys(objA);\n  const keysB = Object.keys(objB);\n  if (keysA.length !== keysB.length) return false;\n  // Kalitlar bo'yicha qiymatlarni solishtiring\n}",
      hint: "for (let key of keysA) {\n    if (objA[key] !== objB[key]) return false;\n  }\n  return true;",
      test: "if (typeof shallowEqual !== 'function') return 'shallowEqual topilmadi'; if(shallowEqual({a: 1}, {a: 1}) !== true) return 'Teng obyektlarda xato'; if(shallowEqual({a: 1}, {a: 2}) !== false) return 'Farqli obyektda xato'; return null;"
    },
    {
      id: 2,
      title: "Should Component Update simulyatsiyasi",
      instruction: "Props o'zgarganligiga ko'ra komponent qayta chizilishi kerakligini (true/false) hal qiluvchi `shouldUpdate(prevProps, nextProps)` funksiyasini yozing (props ichida faqat `id` va `count` bor).",
      startingCode: "function shouldUpdate(prevProps, nextProps) {\n  // id yoki count o'zgargan bo'lsa true qaytaring\n}",
      hint: "return prevProps.id !== nextProps.id || prevProps.count !== nextProps.count;",
      test: "if (typeof shouldUpdate !== 'function') return 'shouldUpdate topilmadi'; if(shouldUpdate({id: 1, count: 5}, {id: 1, count: 5}) !== false) return 'O\\'zgarmagan props render chaqirmasligi kerak'; if(shouldUpdate({id: 1, count: 5}, {id: 1, count: 6}) !== true) return 'count o\\'zgarganda true bo\\'lishi shart'; return null;"
    },
    {
      id: 3,
      title: "Sodda useMemo simulyatsiyasi",
      instruction: "Qiymat va dependencylar berilganda, agar dependency o'zgarmasa keshdagi qiymatni qaytaradigan `memoizeValue(fn, deps, lastDeps, lastValue)` funksiyasini yozing. (massiv deps tengligini solishtiring).",
      startingCode: "function memoizeValue(fn, deps, lastDeps, lastValue) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Agar teng bo'lsa eski qiymatni, bo'lmasa fn() ni chaqirib yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastValue;\nreturn fn();",
      test: "if (typeof memoizeValue !== 'function') return 'memoizeValue topilmadi'; const fn = () => 10; if(memoizeValue(fn, [1], [1], 5) !== 5) return 'Dependency o\\'zgarmaganda kesh xato'; if(memoizeValue(fn, [2], [1], 5) !== 10) return 'Dependency o\\'zgarganda fn() chaqirilmadi'; return null;"
    },
    {
      id: 4,
      title: "Immutable State Updater",
      instruction: "Massiv ko'rinishidagi state-ga element qo'shish uchun massivni o'zgartirmasdan (immutable) yangi massiv qaytaruvchi `addItem(state, item)` funksiyasini yozing.",
      startingCode: "function addItem(state, item) {\n  // Spread operator orqali yozing\n}",
      hint: "return [...state, item];",
      test: "if (typeof addItem !== 'function') return 'addItem topilmadi'; const s = [1, 2]; const res = addItem(s, 3); if(s.length !== 2) return 'Asl state o\\'zgartirildi (mutated)'; if(res[2] !== 3) return 'Yangi element qo\\'shilmadi'; return null;"
    },
    {
      id: 5,
      title: "Unikal Key tekshiruvi",
      instruction: "Ro'yxat elementlari React-da render bo'lishi uchun ularning tarkibida `key` xossasi (unikal ID) borligini tekshiradigan `validateKeys(elements)` funksiyasini yozing (barchasida bo'lsa true, kamida bittasida yo'q bo'lsa false).",
      startingCode: "function validateKeys(elements) {\n  // every orqali tekshiring\n}",
      hint: "return elements.every(el => el.key !== undefined && el.key !== null);",
      test: "if (typeof validateKeys !== 'function') return 'validateKeys topilmadi'; if(validateKeys([{id: 1, key: 'a'}, {id: 2, key: 'b'}]) !== true) return 'To\\'g\\'ri keys rad etildi'; if(validateKeys([{id: 1, key: 'a'}, {id: 2}]) !== false) return 'Key yo\\'qligi aniqlanmadi'; return null;"
    },
    {
      id: 6,
      title: "Strict Mode warning finder",
      instruction: "Komponent kodi ichida eskirgan `componentWillMount` metodi bor-yo'qligini tekshiradigan `checkDeprecatedMethods(code)` funksiyasini yozing (true/false).",
      startingCode: "function checkDeprecatedMethods(code) {\n  // componentWillMount qidirilishi\n}",
      hint: "return code.includes('componentWillMount');",
      test: "if (typeof checkDeprecatedMethods !== 'function') return 'checkDeprecatedMethods topilmadi'; if (checkDeprecatedMethods('class A { componentWillMount() {} }') !== true) return 'Eskirgan metod aniqlanmadi'; return null;"
    },
    {
      id: 7,
      title: "Sodda useCallback simulyatsiyasi",
      instruction: "Berilgan funksiya havolasini dependencylar o'zgarmasa keshlab saqlaydigan `memoizeCallback(fn, deps, lastDeps, lastFn)` funksiyasini yozing.",
      startingCode: "function memoizeCallback(fn, deps, lastDeps, lastFn) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Teng bo'lsa eski funksiyani, bo'lmasa yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastFn;\nreturn fn;",
      test: "if (typeof memoizeCallback !== 'function') return 'memoizeCallback topilmadi'; const f = () => {}; if (memoizeCallback(f, [1], [1], f) !== f) return 'Callback keshlanmadi'; return null;"
    },
    {
      id: 8,
      title: "Fiber Work Tag check",
      instruction: "Fiber node turi (tag) funksiyali komponent ekanligini tekshiradigan `isFunctionComponent(fiberNode)` funksiyasini yozing (React-da Function Component tagi 0 yoki 2 bo'lishi mumkin, biz shunchaki typeof node.type === 'function' ekanligini tekshiramiz).",
      startingCode: "function isFunctionComponent(fiberNode) {\n  // type xossasini tekshiring\n}",
      hint: "return typeof fiberNode?.type === 'function';",
      test: "if (typeof isFunctionComponent !== 'function') return 'isFunctionComponent topilmadi'; if (isFunctionComponent({ type: () => {} }) !== true) return 'Funksiyali komponent xato topildi'; if (isFunctionComponent({ type: 'div' }) !== false) return 'Oddiy teg rad etilmadi'; return null;"
    },
    {
      id: 9,
      title: "React Children Counter",
      instruction: "React-ga o'xshash bolalar massividagi barcha elementlar sonini hisoblaydigan `countChildren(children)` funksiyasini yozing (agar array bo'lmasa 1, bo'lsa array uzunligi, null bo'lsa 0).",
      startingCode: "function countChildren(children) {\n  // Shartlarni yozing\n}",
      hint: "if (children === null || children === undefined) return 0;\nif (Array.isArray(children)) return children.length;\nreturn 1;",
      test: "if (typeof countChildren !== 'function') return 'countChildren topilmadi'; if (countChildren(null) !== 0) return 'Null uchun xato'; if (countChildren([1, 2]) !== 2) return 'Massiv uchun xato'; if (countChildren('hi') !== 1) return 'Yagona bola uchun xato'; return null;"
    },
    {
      id: 10,
      title: "React Key string format",
      instruction: "Element kaliti (`key`) string ko'rinishida bo'lishini ta'minlovchi `formatReactKey(id)` funksiyasini yozing (masalan, `element-5`).",
      startingCode: "function formatReactKey(id) {\n  // formatlang\n}",
      hint: "return `element-${id}`;",
      test: "if (typeof formatReactKey !== 'function') return 'formatReactKey topilmadi'; if(formatReactKey(12) !== 'element-12') return 'Key formatlash xato'; return null;"
    },
    {
      id: 11,
      title: "Pure Component check",
      instruction: "Komponent sinfi `React.PureComponent` dan meros olinganligini tekshiruvchi `isPureComponent(classDeclaration)` funksiyasini yozing.",
      startingCode: "function isPureComponent(classDeclaration) {\n  // class prototipida isReactComponent borligini simulyatsiya qiling\n  return !!classDeclaration?.prototype?.isPureReactComponent;\n}",
      hint: "return !!classDeclaration?.prototype?.isPureReactComponent;",
      test: "if (typeof isPureComponent !== 'function') return 'isPureComponent topilmadi'; const mockClass = { prototype: { isPureReactComponent: true } }; if(isPureComponent(mockClass) !== true) return 'PureComponent aniqlanmadi'; return null;"
    },
    {
      id: 12,
      title: "Ref assignment",
      instruction: "DOM obyektini React `ref` obyektining `current` xossasiga bog'lab qo'yuvchi `assignRef(ref, domNode)` funksiyasini yozing.",
      startingCode: "function assignRef(ref, domNode) {\n  // ref.current-ga yozing\n}",
      hint: "if (ref) ref.current = domNode;",
      test: "if (typeof assignRef !== 'function') return 'assignRef topilmadi'; const r = { current: null }; assignRef(r, 'div'); if(r.current !== 'div') return 'Ref bog\\'lanmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React-dagi Virtual DOM nima?",
      options: [
        "Haqiqiy DOM-dan tezroq ishlaydigan brauzerning alohida bo'limi",
        "Haqiqiy DOM elementlarining xotiradagi yengil, oddiy JavaScript ob'ektlari ko'rinishidagi nusxasi",
        "Saytni bezash uchun maxsus CSS kutubxonasi",
        "Faqat serverda ishlaydigan ma'lumotlar bazasi"
      ],
      correctAnswer: 1,
      explanation: "Virtual DOM bu real DOM-ni har safar butunlay o'zgartirmasdan, avval farqlarni hisoblash uchun ishlatiladigan xotiradagi JS ob'ektlari daraxtidir."
    },
    {
      id: 2,
      question: "Reconciliation (Diffing) jarayonining maqsadi nima?",
      options: [
        "Foydalanuvchini ro'yxatdan o'tkazish",
        "Eski va yangi Virtual DOM daraxtlarini solishtirib, faqatgina o'zgargan qismlarni real DOM-ga minimal amallar bilan yozish",
        "JavaScript fayllarini siqish",
        "Barcha komponentlarni parallel render qilish"
      ],
      correctAnswer: 1,
      explanation: "Reconciliation React-ning diffing algoritmi yordamida o'zgarishlarni real sahifaga tezkor va minimal yo'l bilan sinxronlash jarayonidir."
    },
    {
      id: 3,
      question: "React Fiber arxitekturasining asosiy ustunligi nimada?",
      options: [
        "U faqat mobil telefonlarda ishlaydi",
        "Render qilish vazifalarini bo'laklarga ajratish, ularni to'xtatib turish hamda brauzer asosiy oqimini (Main Thread) bloklamaslik",
        "CSS animatsiyalarini tezlashtirish",
        "State boshqaruvini butunlay o'chirish"
      ],
      correctAnswer: 1,
      explanation: "Fiber React-ga render ishlarini kichik bo'laklarga ajratib, muhimroq ishlarni (masalan, user input) birinchi bajarishga (concurrency) imkon beradi."
    },
    {
      id: 4,
      question: "`React.memo` nima vazifani bajaradi?",
      options: [
        "Komponent state-larini keshlaydi",
        "Props-lar o'zgarmagan bo'lsa, komponentni qayta render (re-render) bo'lishidan saqlaydi",
        "Faqat sinflar uchun hook yaratadi",
        "CSS o'zgaruvchilarini boshqaradi"
      ],
      correctAnswer: 1,
      explanation: "`React.memo` — High-Order Component bo'lib, u props o'zgarishlarini shallow solishtiradi va agar o'zgarish bo'lmasa render-ni to'xtatadi."
    },
    {
      id: 5,
      question: "`useMemo` va `useCallback` hooklarining farqi nimada?",
      options: [
        "`useMemo` faqat sonlarni, `useCallback` esa harflarni keshlaydi",
        "`useMemo` funksiya qaytargan qiymatni keshlaydi, `useCallback` esa funksiyaning o'zini (reference) qayta yaratilmasligi uchun keshlaydi",
        "Ikkalasi mutlaqo bir xil vazifani bajaradi",
        "Faqat `useCallback` serverda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`useMemo` og'ir hisob-kitoblar qiymatini memoize qiladi. `useCallback` esa bolalarga uzatiladigan funksiyalarning xotiradagi manzilini (reference) saqlaydi."
    },
    {
      id: 6,
      question: "Nima uchun massiv elementlarini render qilganda unikal `key` xossasi kerak?",
      options: [
        "Elementlarni tartib bilan raqamlash uchun",
        "React o'zgarishlarni aniqlashda (diffing) aynan qaysi element o'zgargani, o'chirilgani yoki qo'shilganini to'g'ri kuzatishi uchun",
        "Faqat brauzer talabi tufayli",
        "Xotira hajmini kamaytirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Unikal `key` xossasi React-ga ro'yxat elementlari almashganda yoki o'chganda ularning shaxsiyatini (identity) saqlab qolishga yordam beradi."
    },
    {
      id: 7,
      question: "Ro'yxat renderida `key` sifatida massiv indeksidan (`index`) foydalanish qachon muammo keltirib chiqaradi?",
      options: [
        "Faqat massiv bo'sh bo'lganda",
        "Ro'yxat elementlari o'chirilganda, qo'shilganda yoki saralanganda (tartibi o'zgarganda)",
        "Dastur darhol ReferenceError beradi",
        "Faqat rasm fayllari ishlatilganda"
      ],
      correctAnswer: 1,
      explanation: "Tartib o'zgarganda indekslar qaytadan taqsimlanadi. Bu React-ni chalg'itib, noto'g'ri UI holatlarini ko'rsatishga va sekinlashishga olib keladi."
    },
    {
      id: 8,
      question: "State o'zgaruvchisini `state.push(newValue)` deb o'zgartirish nima uchun tavsiya etilmaydi?",
      options: [
        "Chunki bu xavfsiz emas",
        "Chunki massiv o'zgargani bilan uning xotiradagi manzili (reference) o'zgarmaydi va React buni sezib re-render qilmaydi",
        "Bu xossa faqat eski versiyalarda bor edi",
        "State faqat sonlarni saqlaydi"
      ],
      correctAnswer: 1,
      explanation: "React state-ning yangilanganini shallow comparison orqali aniqlaydi. Massiv ichini o'zgartirish (mutation) manzilni o'zgartirmaydi, shuning uchun doimo yangi nusxa (immutable: `[...state, item]`) yaratish kerak."
    },
    {
      id: 9,
      question: "React-da 'Shallow Comparison' (yuzaki solishtirish) qanday ishlaydi?",
      options: [
        "Ob'ekt ichidagi barcha ichma-ich ob'ektlarni rekursiv tekshiradi",
        "Faqat birinchi darajali kalitlar va ularning havolalari (references) tengligini tekshiradi",
        "Faqat sonlarni tekshiradi",
        "Faqat base64 formatda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Yuzaki solishtirish ob'ektlarning ichki qatlamlariga kirmaydi, faqat `Object.keys` va `===` orqali birinchi darajali xossalarni tekshiradi."
    },
    {
      id: 10,
      question: "React-da 'StrictMode' nima vazifani bajaradi?",
      options: [
        "Saytni to'liq qotirib qo'yadi",
        "Ishlab chiqish davrida xavfsiz bo'lmagan metodlar, side-effect xatolari va eski API-larni ogohlantirish orqali ko'rsatadi",
        "Faqat parollarni shifrlaydi",
        "CSS xatolarini tuzatadi"
      ],
      correctAnswer: 1,
      explanation: "StrictMode yuzaga kelishi mumkin bo'lgan nojo'ya ta'sirlarni topish maqsadida komponentlarni ikki marta render qilib tekshiradi."
    },
    {
      id: 11,
      question: "React PureComponent nima?",
      options: [
        "Faqat bitta HTML tegi bo'lgan komponent",
        "`shouldComponentUpdate` metodini avtomatik ravishda props va state-ni shallow solishtiradigan qilib sozlangan component klassi",
        "JavaScript-siz ishlaydigan komponent",
        "Faqat funksiyali komponent"
      ],
      correctAnswer: 1,
      explanation: "PureComponent klassi o'zida yuzaki solishtirish (shallow check) mexanizmiga ega, u keraksiz re-renderlarni kamaytiradi."
    },
    {
      id: 12,
      question: "Nima uchun `useCallback` hookini keraksiz joyda ishlatish dasturni tezlashtirmaydi?",
      options: [
        "Chunki u xotirani to'ldiradi",
        "Chunki dependency massivini solishtirish va keshga yozishning o'zi ham qo'shimcha resurs (overhead) talab qiladi",
        "U faqat sinfli komponentlarda ishlaydi",
        "Chunki u funksiyani o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "`useCallback` bepul emas. Har renderda dependencylarni solishtirish va funksiyani saqlash ham vaqt oladi. Uni faqat og'ir bolalar renderini optimallashdagina ishlatish kerak."
    }
  ]
};

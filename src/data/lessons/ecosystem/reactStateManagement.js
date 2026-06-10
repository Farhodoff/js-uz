export const reactStateManagement = {
  id: "reactStateManagement",
  title: "State Management Arxitekturasi",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Global State Management nima?
React ilovalarida ma'lumotlar oqimi (data flow) har doim tepadan pastga (unidirectional/yagona yo'nalishli) qarab oqadi. Ya'ni ota komponentdan bola komponentga props orqali uzatiladi. Katta loyihalarda komponentlar daraxti juda chuqurlashib ketadi va ma'lumotni eng quyi komponentga yetkazish qiyinlashadi. Mana shu muammoni hal qilish va ilova holatini markazlashgan holda boshqarish **State Management** deb ataladi.

### Real hayotiy analogiya
* **Local State (useState):** Sizning **shaxsiy hamyoningiz**. Undagi pulni faqat o'zingiz boshqarasiz va u siz bilan birga yuragi. Boshqa odamlar hamyoningizga to'g'ridan-to'g'ri aralasha olmaydi.
* **Props Drilling (Qo'lma-qo'l uzatish):** Ko'p qavatli binoning 5-qavatidagi do'stingizga pul bermoqchisiz. Buning uchun pulni 1-qavatdagi, keyin 2-qavatdagi va hokazo har bir qavatdagi odamlarga berib, navbatma-navbat 5-qavatga yetkazish. O'rtadagi odamlarga bu pul mutlaqo kerak bo'lmasa-da, ular baribir vositachi bo'lishga majbur.
* **Context API (E'lonlar taxtasi):** Xonadondagi **umumiy e'lonlar taxtasi**. Unga osilgan xabarni hamma ko'ra oladi. Ammo kimdir taxtadagi xabarni o'zgartirsa, barcha oila a'zolari u bilan tanishish uchun o'z ishini to'xtatishi (re-render) kerak bo'ladi.
* **Global State Store (Zustand / Redux - Markaziy Muzlatgich):** Oshxonadagi **umumiy muzlatgich**. Istalgan kishi u yerdan mahsulot olishi yoki qo'yishi mumkin. Agar kimdir pishloq olsa, faqat pishloq kutayotgan odam reaksiyaga kirishadi (selective subscription), qolganlar esa chalg'imaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Context API orqali Theme Customization)
Context API kam o'zgaradigan va barcha komponentlarga kerak bo'ladigan qiymatlar (masalan, til yoki sayt mavzusi) uchun mos keladi.
\`\`\`javascript
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      Mavzuni o'zgartirish: \${theme}
    </button>
  );
}
\`\`\`

### 2. Intermediate Example (Zustand orqali sodda Global Store)
Zustand - bu juda yengil, boilerplate kodi kam va Context Provayderlarsiz ishlaydigan zamonaviy state manager.
\`\`\`javascript
import { create } from "zustand";

// Store yaratish
const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Komponentda ishlatish
export function CounterComponent() {
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);

  return (
    <div>
      <h1>Hisoblagich: \${count}</h1>
      <button onClick={increase}>Oshirish</button>
    </div>
  );
}
\`\`\`

### 3. Advanced Example (Redux Toolkit orqali Global Store)
Redux Toolkit (RTK) yirik loyihalarda state-ni modulli tarzda, xavfsiz va tizimli boshqarish imkonini beradi.
\`\`\`javascript
import { createSlice, configureStore } from "@reduxjs/toolkit";

// Slice yaratish
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Immer.js tufayli xavfsiz mutatsiya (fonda baribir immutable bo'ladi)
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    }
  }
});

export const { addTodo, toggleTodo } = todoSlice.actions;

// Store konfiguratsiyasi
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Unidirectional Data Flow (Yagona yo'nalishli oqim)
React arxitekturasida ma'lumotlar oqimi doimo quyidagicha aylanadi:
1. **State** - ilova ma'lumoti.
2. **View** - state asosida foydalanuvchiga ko'rinadigan UI.
3. **Action** - foydalanuvchi tugmani bosganda yoki API chaqirilganda yuzaga keladigan hodisa.
4. **State updates** - action natijasida state yangilanadi va view qayta render bo'ladi.

### Immutability (O'zgarmaslik) va Reference Checking
React-da state obyektlari va massivlari o'zgarmas (immutable) bo'lishi shart. React state o'zgarganini tekshirish uchun xotira manzillarini (references) solishtiradi (\`Object.is()\` yoki \`===\` orqali).
* Agar biz \`state.push(item)\` qilsak, massiv ichidagi ma'lumot o'zgaradi, lekin uning xotiradagi manzili (reference) o'zgarmaydi. Natijada React hech qanday o'zgarish bo'lmadi deb hisoblab, sahifani qayta chizmaydi.
* Shuning uchun har doim yangi havola yaratib state-ni yangilash kerak: \`[...state, item]\` yoki \`{ ...state, key: newValue }\`.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Barcha state-larni global qilish
Har qanday input qiymati, toggler yoki modal holatlarini ham global do'konga (Zustand/Redux) yozish. Bu keraksiz xotira sarfi va ortiqcha rendering zanjirini keltirib chiqaradi.
* **To'g'ri:** Faqat bir komponentga xos bo'lgan holatlarni \`useState\` yordamida lokal saqlang.

### 2. Context API-ni tez o'zgaruvchan datalar uchun ishlatish
Context API tarkibidagi bitta qiymat o'zgarganida ham, shu Context-ni eshitib turgan (useContext ishlatgan) barcha bolalar to'liq qayta render bo'ladi.
* **To'g'ri:** Tez o'zgaruvchan (real-time chatlar, inputlar, o'yin holatlari) uchun Zustand, Redux yoki Jotai ishlatish maqsadga muvofiq.

### 3. State obyektlarini bevosita mutatsiya qilish (State Mutation)
\`\`\`javascript
// XATO:
const [user, setUser] = useState({ name: "Ali", age: 20 });
user.age = 21; // Direct mutation! React o'zgarishni ko'rmaydi.

// TO'G'RI:
setUser(prev => ({ ...prev, age: 21 }));
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Local state va Global state-ning farqi nima va qachon qaysi biri ishlatiladi?
   * **Javob:** Local state (\`useState\`) faqat bitta komponent va uning bolalari ichida ishlatiladi. Global state esa ilovaning turli qismlarida umumiy bo'lgan ma'lumotlar (savat, autentifikatsiya, sozlamalar) uchun ishlatiladi.
2. **Savol:** Props drilling nima va uni qanday hal qilish mumkin?
   * **Javob:** Props-larni o'ziga bu ma'lumot mutlaqo kerak bo'lmagan bir nechta oraliq komponentlar orqali pastga uzatish muammosi. Buni Context API yoki global state manager-lar yordamida hal qilinadi.
3. **Savol:** Context API o'zi alohida state manager kutubxonami?
   * **Javob:** Yo'q, Context API - bu ma'lumotlarni prop-drilling-siz chuqur uzatish mexanizmi (Dependency Injection). Uning o'zi state-ni saqlamaydi, baribir lokal \`useState\` yoki \`useReducer\`ga tayanadi.
4. **Savol:** Nima uchun React-da state mutatsiyasi taqiqlangan?
   * **Javob:** React yangilanishlarni xotira havolasi (reference) o'zgarganligini tekshirish orqali aniqlaydi. Mutatsiya qilinganda reference o'zgarmasdan qolgani uchun re-render sodir bo'lmaydi.

### Middle
5. **Savol:** Zustand nega Redux-ga nisbatan yengilroq hisoblanadi?
   * **Javob:** U boilerplate kodi (actions, reducers, types) talab qilmaydi, Context Provider-larni yozish shart emas va selektorlar yordamida re-renderlarni juda sodda boshqaradi.
6. **Savol:** Redux-dagi Reducer nima vazifani bajaradi?
   * **Javob:** Reducer - bu joriy \`state\` va kelgan \`action\`ni qabul qilib, mutlaqo yangi o'zgarmas \`state\` qaytaradigan sof (pure) funksiya.
7. **Savol:** Redux Toolkit-da qanday qilib \`state.push()\` kabi to'g'ridan-to'g'ri kodlar yozishimiz mumkin?
   * **Javob:** Redux Toolkit o'z ichiga **Immer.js** kutubxonasini olgan. Immer biz yozgan mutatsiyali kodlarni orqa fonda xavfsiz immutable (yangi nusxa qaytaruvchi) ko'rinishga o'tkazib beradi.
8. **Savol:** Context API-da keraksiz re-renderlarning qanday oldini olish mumkin?
   * **Javob:** Provayderga beriladigan \`value\` obyektini \`useMemo\` orqali keshlab qo'yish yoki Context-ni o'qish hamda yozish (setter) uchun ikkita alohida Context-ga ajratish.

### Senior
9. **Savol:** Zustand va Redux-dagi 'Selector' tushunchasi renderingga qanday ta'sir qiladi?
   * **Javob:** Selector komponentga store-dan faqat kerakli state bo'lagini ajratib olishga yordam beradi. Agar store-ning boshqa qiymatlari o'zgarsa, ushbu komponent keraksiz qayta render bo'lmaydi.
10. **Savol:** Atomic state management (Jotai, Recoil) qanday ishlaydi va u Redux-dan nima bilan farq qiladi?
    * **Javob:** U state-ni yagona monolithic daraxt o'rniga kichik, mustaqil o'zgaruvchi atomlarga bo'lib yuboradi. Har bir komponent faqat o'zi ulangan atom o'zgarganda render bo'ladi.
11. **Savol:** Server State va Client State tushunchalarini farqlab bering.
    * **Javob:** Client State brauzerdagi UI holatlari (modal ochiqligi, tanlangan til). Server State esa serverdan olingan kesh ma'lumotlari (tovarlar ro'yxati, profil ma'lumotlari). Server state uchun React Query yoki SWR kabi kutubxonalar ishlatish tavsiya etiladi.
12. **Savol:** Redux Middleware nima va u qanday bosqichda ishlaydi?
    * **Javob:** Action dispatch qilingandan keyin, lekin reducer-ga yetib bormasdan oldin ishlaydigan dasturiy ta'minot. U asosan logging, asinxron so'rovlar (Redux Thunk) va xatoliklarni tutish uchun qo'llaniladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz global va local state-larni mustaqil ravishda boshqarishni o'rganasiz.

### Redux / Zustand ma'lumotlar oqimi diagrammasi (Redux/Zustand Dataflow)
\`\`\`mermaid
graph TD
    View[React View] -->|Dispatch Action| Action[Action]
    Action -->|Triggers| Reducer[Reducer / State Update]
    Reducer -->|Updates| Store[Global Store]
    Store -->|Selective Subscription / Selector| View
\`\`\`

### Props Drilling va Global Store farqi
\`\`\`mermaid
graph TD
    subgraph Props Drilling
        A[Parent Component] --> B[Child A]
        B --> C[Child B]
        C --> D[Target Component]
    end
    subgraph Global Store
        Store2[(Global Store)]
        A2[Parent Component]
        D2[Target Component]
        Store2 -.->|Direct Read| D2
        A2 -.->|Update| Store2
    end
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars bo'yicha olgan bilimlaringizni yakuniy quizzes orqali sinab oling.

---

## 8. 🎯 Real Project Case Study

### Savat (Shopping Cart) Tizimini Zustand yordamida yaratish
Haqiqiy internet-do'konlarda savatchani boshqarish, unga mahsulot qo'shish, o'chirish va narxlarni real vaqtda hisoblash, shuningdek foydalanuvchi sahifani yangilaganda ham saqlanib qolishini ta'minlash uchun Zustand-ning \`persist\` middleware-dan foydalanamiz.

\`\`\`javascript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, name, price, quantity }]
      
      addToCart: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      removeFromCart: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      clearCart: () => set({ items: [] }),

      // Selector-larni soddalashtirish uchun getter-lar
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: "shopping-cart-storage", // localStorage kalit nomi
    }
  )
);
\`\`\`

---

## 9. 🚀 Performance va Optimization

1. **Selector funksiyalarini toraytiring:**
   Zustand-da butun store-ni bitta komponentda chaqirishdan qoching:
   \`\`\`javascript
   // YOMON (Butun store o'zgarganda qayta render bo'ladi):
   const store = useStore();
   
   // YAXSHI (Faqatgina 'user' o'zgarganda render bo'ladi):
   const user = useStore(state => state.user);
   \`\`\`
2. **Context Split-dan foydalaning:**
   Agar Context-dagi state va setter bitta joyda bo'lsa, uni ikkiga bo'ling (\`StateContext\` va \`DispatchContext\`). Shunda faqat o'zgartiruvchi tugmalar setter o'zgarmasligi sababli re-render bo'lmaydi.
3. **Server datalarni keshlash:**
   Tashqi serverdan keladigan datalarni global store-ga joylab yubormasdan, **React Query** yordamida avtomatik kesh va fonda sinxronlashni sozlang.

---

## 10. 📌 Cheat Sheet

| State turi | Qachon ishlatiladi | Tavsiya etilgan texnologiya | Re-render xususiyati |
| :--- | :--- | :--- | :--- |
| **Local UI State** | Faqat bitta komponent ichida (modal, input) | \`useState\`, \`useReducer\` | Faqat shu komponent render bo'ladi |
| **Global UI Config** | Kam o'zgaruvchan global ma'lumotlar (Theme, Til) | Context API | Bog'langan barcha komponentlar render bo'ladi |
| **Global High-Freq** | Tez o'zgaradigan murakkab UI ma'lumotlar | Zustand, Redux Toolkit | Faqat kerakli selektorli komponent render bo'ladi |
| **Server State** | Tashqi API orqali keladigan ma'lumotlar | React Query (TanStack Query) | Keshlar va fonda sinxronlanadi |`,
  exercises: [
    {
      id: 1,
      title: "Immutable List Adder",
      instruction: "Massiv ko'rinishidagi state-ga element qo'shish uchun massivni o'zgartirmasdan (immutable) yangi massiv qaytaruvchi `addItem(state, item)` funksiyasini yozing.",
      startingCode: "function addItem(state, item) {\n  // Spread operator orqali yozing\n}",
      hint: "return [...state, item];",
      test: "if (typeof addItem !== 'function') return 'addItem topilmadi'; const s = [1, 2]; const res = addItem(s, 3); if(s.length !== 2) return 'Asl state o\\'zgartirildi (mutated)'; if(res[2] !== 3) return 'Yangi element qo\\'shilmadi'; return null;"
    },
    {
      id: 2,
      title: "Immutable Object Updater",
      instruction: "User obyektini o'zgartirmasdan (immutable), uning yoshini (`age`) yangi qiymatga o'zgartirib qaytaruvchi `updateUserAge(user, newAge)` funksiyasini yozing.",
      startingCode: "function updateUserAge(user, newAge) {\n  // user obyektini o'zgartirmasdan yozing\n}",
      hint: "return { ...user, age: newAge };",
      test: "if (typeof updateUserAge !== 'function') return 'updateUserAge topilmadi'; const u = { name: 'Ali', age: 20 }; const res = updateUserAge(u, 21); if(u.age !== 20) return 'Asl obyekt o\\'zgartirildi'; if(res.age !== 21) return 'Yosh yangilanmadi'; return null;"
    },
    {
      id: 3,
      title: "Store Merger",
      instruction: "Ikkita do'kon obyektlarini birlashtirib qaytaruvchi `combineStores(storeA, storeB)` funksiyasini yozing.",
      startingCode: "function combineStores(storeA, storeB) {\n  // Obyektlarni birlashtiring\n}",
      hint: "return { ...storeA, ...storeB };",
      test: "if (typeof combineStores !== 'function') return 'combineStores topilmadi'; const a = { x: 1 }; const b = { y: 2 }; const res = combineStores(a, b); if(res.x !== 1 || res.y !== 2) return 'Birlashtirishda xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nega array state-ga `state.push(item)` deb to'g'ridan-to'g'ri element qo'shish tavsiya etilmaydi?",
      options: [
        "Chunki bu JS sintaksisi emas",
        "Chunki u xotira manzilini (reference) o'zgartirmaydi va React re-render qilmaydi",
        "Faqat CSS-ga zarar beradi",
        "React-da push metodi butunlay o'chirilgan"
      ],
      correctAnswer: 1,
      explanation: "React elementlarning o'zgarganini xotira havolasini solishtirish orqali biladi. Obyekt mutatsiya qilinganda reference o'zgarmasdan qoladi."
    },
    {
      id: 2,
      question: "Props drilling muammosini qanday hal qilish mumkin?",
      options: [
        "Faqat bitta faylga yozib chiqish orqali",
        "Context API yoki global state manager (Zustand, Redux) ishlatish orqali",
        "CSS flexbox yordamida",
        "Node.js serverini qayta yoqish orqali"
      ],
      correctAnswer: 1,
      explanation: "Context API va global do'konlar ma'lumotni to'g'ridan-to'g'ri kerakli komponentga uzatishga imkon beradi, o'rta qatlamlarni aylanib o'tadi."
    },
    {
      id: 3,
      question: "Context API-dan qachon foydalanish eng to'g'ri hisoblanadi?",
      options: [
        "Tez o'zgaruvchan murakkab o'yin statelari uchun",
        "Kam o'zgaruvchan global ma'lutmotlar (Theme, Til, Autentifikatsiya holati) uchun",
        "Har soniyada API-dan ma'lumot olganda",
        "Faqat HTML input qiymatlarini saqlashda"
      ],
      correctAnswer: 1,
      explanation: "Context tez o'zgarsa, provayder ichidagi barcha komponentlar qayta render bo'ladi. Shuning uchun u kam yangilanadigan ma'lumotlar uchun mos keladi."
    },
    {
      id: 4,
      question: "Redux-dagi 'Single Source of Truth' nima degani?",
      options: [
        "Barcha kodlar bitta faylda bo'lishi",
        "Ilovaning barcha global holati (state) bitta markaziy store-da saqlanishi",
        "Saytda faqat bitta sahifa borligi",
        "API ma'lumotlarini bir marta olish"
      ],
      correctAnswer: 1,
      explanation: "Bu prinsip ilova holatini markaziy va bir joyda xatolarsiz, toza boshqarishni ta'minlaydi."
    },
    {
      id: 5,
      question: "Zustand-da selectordan foydalanish maqsadi nima?",
      options: [
        "Stil tanlash",
        "Komponentga faqat kerakli state qiymatini olib kelish va ortiqcha renderlarni oldini olish",
        "API so'rov yuborish",
        "Database-dan jadval tanlash"
      ],
      correctAnswer: 1,
      explanation: "Selector yordamida komponent faqat o'ziga kerakli state bo'lagiga obuna bo'ladi, qolgan o'zgarishlarda u qayta render bo'lmaydi."
    },
    {
      id: 6,
      question: "Redux Toolkit (RTK) qaysi kutubxona yordamida obyektlarni 'mutatsiya' qilish imkonini beradi?",
      options: [
        "React Query",
        "Immer.js",
        "Axios",
        "Lodash"
      ],
      correctAnswer: 1,
      explanation: "RTK ichida Immer.js ishlaydi. U koddagi o'zgartirishlarni (state.user.age = 20) fonda avtomatik tarzda immutable shaklga aylantiradi."
    },
    {
      id: 7,
      question: "React-da 'State' tushunchasi o'zi nima?",
      options: [
        "Brauzerning offline kesh xotirasi",
        "Komponentning o'zgaruvchan local xotirasi",
        "CSS animatsiyalari to'plami",
        "Serverdan kelgan statik HTML fayl"
      ],
      correctAnswer: 1,
      explanation: "State - bu komponent ichida saqlanadigan va u o'zgarganda komponentni qayta chizadigan (re-render) ma'lumotdir."
    },
    {
      id: 8,
      question: "Zustand global state manager Context API-dan qanday qilib yaxshiroq ishlaydi?",
      options: [
        "U brauzerda ishlamaydi",
        "Selector obunalari orqali faqatgina o'zgargan state qiymatini olgan komponentlarni render qiladi",
        "U Virtual DOM-ni chetlab o'tadi",
        "U CSS o'zgaruvchilari orqali ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Zustand selectorlar bilan komponentlarni bog'laydi. Context-dan farqli o'laroq, keraksiz komponentlar re-render bo'lmaydi."
    },
    {
      id: 9,
      question: "Redux Middleware-ning asosiy vazifasi nima?",
      options: [
        "Komponentlarni bezash",
        "Action-lar reducer-ga yetib borguncha ularni ushlab, asinxron API yoki log yozish ishlarini bajarish",
        "HTML teglari yaratish",
        "Sayt tezligini o'lchash"
      ],
      correctAnswer: 1,
      explanation: "Middleware (masalan Thunk) Redux oqimini kengaytirib, asinxron harakatlarni boshqarishga yordam beradi."
    },
    {
      id: 10,
      question: "Jotai/Recoil atomic state manager-larning eng muhim xususiyati nima?",
      options: [
        "Hamma state-ni bitta katta obyektda saqlashi",
        "Global state-ni komponentlar to'g'ridan-to'g'ri obuna bo'la oladigan mustaqil 'atom'larga bo'lib tashlashi",
        "Faqat server logikasini yozishi",
        "CSS-ni avtomatik generatsiya qilishi"
      ],
      correctAnswer: 1,
      explanation: "Atomic yondashuvda global state atomlarga bo'linadi va faqat o'sha atom o'zgarganda unga bog'langan komponent re-render bo'ladi."
    },
    {
      id: 11,
      question: "Nega form inputlaridagi tezkor o'zgaruvchan state-larni Zustand/Redux-ga yozish tavsiya etilmaydi?",
      options: [
        "Chunki global store string-larni tushunmaydi",
        "Har bir harf yozilganda global store yangilanib, butun sahifa komponentlarini keraksiz qayta render qilmasligi uchun",
        "Inputlar faqat local state bilan ishlay olgani uchun",
        "Bu xavfsizlikka zarar keltirgani uchun"
      ],
      correctAnswer: 1,
      explanation: "Input holatlari local bo'lgani afzal. Bo'lmasa, har safar harf kiritilganda global o'zgarish sodir bo'ladi va butun ilova sekinlashadi."
    },
    {
      id: 12,
      question: "State Management-dagi 'Immutable State' atamasi nimani anglatadi?",
      options: [
        "Hech qachon o'zgartirib bo'lmaydigan state",
        "State obyektini to'g'ridan-to'g'ri o'zgartirmasdan, har doim yangi nusxa (copy) yaratish orqali yangilash yondashuvi",
        "Serverda saqlanadigan ma'lumotlar",
        "Faqat CSS o'zgaruvchilari"
      ],
      correctAnswer: 1,
      explanation: "Immutable yondashuvda eski obyekt o'zgartirilmaydi, balki spread operator yordamida uning nusxasi olinib yangilanadi."
    }
  ]
};

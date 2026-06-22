export const externalState = {
  id: "externalState",
  title: "External State Libraries (Zustand, Redux)",
  content: `
# Tashqi (External) State Boshqaruvi: Zustand va Redux

React'ning ichki vositalari (\`useState\`, \`useReducer\`, va \`Context API\`) ko'pgina loyihalar uchun yetarli bo'lsa-da, ilova juda kattalashganda ular qiyinchilik tug'dirishni boshlaydi. 

### Nega \`Context API\` yetarli emas?
Biz o'rganganimizdek, Context dagi ma'lumot o'zgarganda u orqali ma'lumot olayotgan **barcha** komponentlar qayta render (re-render) qilinadi. Katta ilovalarda bu dastur tezligini (performance) keskin pasaytiradi. Shu sababli ishlab chiquvchilar tashqi state boshqaruv kutubxonalariga murojaat qilishadi.

Eng mashhurlari: **Redux**, **Zustand**, **MobX**, **Recoil** va **Jotai**.
Biz asosan an'anaviy **Redux** va hozirgi kunda trendda bo'lgan zamonaviy **Zustand** haqida gaplashamiz.

---

## 1. Redux: Dasturchilarning "Eski" Do'sti

Yillar davomida React dasturlarida state boshqarish deganda faqat Redux tushunilgan. U juda kuchli va tartibli arxitekturaga ega.

### Redux ning 3 asosiy ustuni:
1. **Store:** Ilovaning barcha holatlarini o'zida saqlovchi bitta katta maxfiy xazina.
2. **Action:** Nima yuz berganini tushuntiruvchi xabar. (masalan, "YANGI_XABAR_QOSHISH")
3. **Reducer:** O'sha xabarni o'qib, xazinadagi (Store) ma'lumotni o'zgartiruvchi sof funksiya.

\`\`\`javascript
// Redux dagi action va reducer mantig'i
const action = { type: 'DEPOSIT', payload: 100 };

function bankReducer(state = { balance: 0 }, action) {
  if (action.type === 'DEPOSIT') {
    return { balance: state.balance + action.payload };
  }
  return state;
}
\`\`\`

**Redux'ning kamchiligi:** U juda ko'p "boilerplate" kod talab qiladi. Ya'ni oddiygina narsani amalga oshirish uchun ham alohida action fayllar, reducer fayllar va turli xil sozlamalar (setup) yozish kerak bo'ladi. Garchi hozirgi kunda *Redux Toolkit (RTK)* buni ancha osonlashtirgan bo'lsa-da, u baribir kichik va o'rta loyihalar uchun og'irlik qiladi.

---

## 2. Zustand: Zamonaviy va Yengil Yondashuv

**Zustand** (nemischa "Holat" degani) — bu hozirgi kunda React hamjamiyatida eng sevimli vositalardan biriga aylangan kutubxona. Uning asosiy maqsadi: **"Qo'shimcha kodlarsiz va Providerlarsiz state yaratish!"**

### Nega Zustand bunchalik yaxshi?
- **Provider kerak emas:** Context API kabi ilovani \`<Provider>\` bilan o'rash shart emas.
- **Hooklarga asoslangan:** Uni ishlatish xuddi oddiy \`useState\` ni ishlatgandek oson.
- **Avtomatik Re-render:** Zustand faqat sizga kerakli o'zgaruvchi o'zgargandagina komponentni qayta render qiladi (Performance zo'r).
- **Redux-kabi yondashuv:** Agar xohlasangiz, reducerlar ham yozishingiz mumkin.

### Zustand qanday ishlaydi?

**1-qadam: Do'kon (Store) yaratish**
Buning uchun \`create\` funksiyasidan foydalanamiz.

\`\`\`javascript
import { create } from 'zustand';

// set funksiyasi orqali state'ni yangilaymiz
export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
\`\`\`

**2-qadam: Komponentda ishlatish**
Endi istalgan joyda, hech qanday Providerlarsiz ushbu hook'ni chaqiramiz.

\`\`\`jsx
import { useBearStore } from './bearStore';

function BearCounter() {
  // Faqat 'bears' sonini o'qib olamiz. (Boshqa narsa o'zgarsa render bo'lmaydi!)
  const bears = useBearStore((state) => state.bears);
  return <h1>Hozir {bears} ta ayiq bor</h1>;
}

function Controls() {
  // Faqat funksiyalarni o'qib olamiz
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>Ayiq qo'shish</button>;
}
\`\`\`

Ko'rib turganingizdek, Zustand nihoyatda toza va tushunarli. Agar siz yangi loyiha boshlayotgan bo'lsangiz, ko'pincha Zustand eng yaxshi tanlov bo'ladi.
  `,
  code: `// Zustand o'rnatish kodi: npm install zustand
import React from 'react';
import { create } from 'zustand';

// 1. Zustand do'konini (Store) yaratamiz
const useStore = create((set) => ({
  count: 0, // State
  inc: () => set((state) => ({ count: state.count + 1 })), // Action
  dec: () => set((state) => ({ count: state.count - 1 })), // Action
  reset: () => set({ count: 0 }) // Action
}));

export default function ZustandApp() {
  // 2. Do'kondagi ma'lumotlarni o'qib olamiz
  // Eng yaxshi amaliyot: Faqat o'zingizga kerakli qismini ajratib oling
  const count = useStore((state) => state.count);
  const inc = useStore((state) => state.inc);
  const dec = useStore((state) => state.dec);
  const reset = useStore((state) => state.reset);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Zustand bilan Counter</h2>
      <h1>{count}</h1>
      <button onClick={inc} style={{ margin: "5px", padding: "10px" }}>Oshirish (+1)</button>
      <button onClick={dec} style={{ margin: "5px", padding: "10px" }}>Kamaytirish (-1)</button>
      <br/>
      <button onClick={reset} style={{ margin: "5px", padding: "10px", color: "red" }}>Nolga tushirish</button>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Zustand da oddiy store yaratish",
      description: "Foydalanuvchi ismini saqlaydigan va uni o'zgartiradigan Zustand store yarating.",
      startingCode: `import { create } from 'zustand';\n\n// VAZIFA: useUserStore yarating.\n// Ichida 'name' (boshlang'ich qiymati: 'Mehmon') va\n// 'setName' (yangi ism qabul qilib, state.name ni yangilaydigan) funksiya bo'lsin.\n\nexport const useUserStore = null; // Buni to'g'rilang`,
      solution: `import { create } from 'zustand';\n\nexport const useUserStore = create((set) => ({\n  name: 'Mehmon',\n  setName: (newName) => set({ name: newName })\n}));`,
      hint: "\`create((set) => ({ name: 'Mehmon', setName: (newName) => set({ name: newName }) }))\` dan foydalaning."
    },
    {
      id: 2,
      title: "Zustand Store dan komponentda foydalanish",
      description: "Yuqorida yaratilgan \`useUserStore\` ni \`UserProfile\` komponentida ishlating. Foydalanuvchi ismini o'qing va ekranga chiqaring.",
      startingCode: `import React from 'react';\n// Faraz qiling store shunday import qilingan:\n// import { useUserStore } from './store';\n\nexport default function UserProfile() {\n  // VAZIFA: useUserStore dan 'name' ni tortib oling\n\n  return (\n    <div>\n      {/* VAZIFA: name ni shu yerda ko'rsating */}\n      Foydalanuvchi: \n    </div>\n  );\n}`,
      solution: `import React from 'react';\nimport { useUserStore } from './store';\n\nexport default function UserProfile() {\n  const name = useUserStore((state) => state.name);\n\n  return (\n    <div>\n      Foydalanuvchi: {name}\n    </div>\n  );\n}`,
      hint: "\`const name = useUserStore(state => state.name);\` deb o'qib olishingiz mumkin."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nima uchun katta loyihalarda ko'pincha Context API o'rniga Redux yoki Zustand tanlanadi?",
      options: [
        "Chunki Context API ma'lumotlarni serverga yubora olmaydi",
        "Chunki Context API barcha ulangan komponentlarni qayta render qildiradi (performance muammosi)",
        "Chunki React endi Context API ni qo'llab-quvvatlamaydi",
        "Redux da kod yozish doim osonroq bo'lgani uchun"
      ],
      correctAnswer: 1,
      explanation: "Katta ilovalarda Context'dagi biror maydon (field) o'zgarsa, ushbu contextdan qisman foydalanayotgan komponentlar ham noo'rin qayta render qilinadi."
    },
    {
      id: 2,
      question: "Zustand kutubxonasining Redux va Context API'dan asosiy afzalligi nimada?",
      options: [
        "Unda Action yoki Reducer bo'lishi mumkin emas",
        "Ilovani <Provider> bilan o'rashni talab qilmaydi va 'boilerplate' kodlari deyarli yo'q",
        "U faqat TypeScript bilan ishlaydi",
        "U faqat klass (class) komponentlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Zustand hook'larga asoslangan va hech qanday Provider shajara o'rashlarini talab qilmaydi. Kod juda toza va ixcham chiqadi."
    },
    {
      id: 3,
      question: "Zustand da state'ni o'zgartiruvchi (yangilovchi) funksiya odatda nima deb ataladi?",
      options: [
        "dispatch()",
        "set()",
        "update()",
        "mutate()"
      ],
      correctAnswer: 1,
      explanation: "Zustand'ning create funksiyasi ichidagi birinchi argument odatda 'set' deb nomlanadi va u orqali qisman yoki to'liq state yangilanadi."
    },
    {
      id: 4,
      question: "Redux dagi 'Boilerplate' kod nima degani?",
      options: [
        "Dastur xatosiz ishlashi uchun yozilgan test kodlari",
        "Ilova qozondek qizib ketmasligi uchun yozilgan kod",
        "Bitta oddiy ishni qilish uchun ham yozilishi shart bo'lgan ko'p sonli standart, takrorlanuvchi kodlar (fayllar, sozlamalar)",
        "CSS da uslublar berish qoidalari"
      ],
      correctAnswer: 2,
      explanation: "Redux'da oddiygina Counter qilish uchun ham Action Types, Action Creators, Reducer, va Store sozlamalarini yozib chiqishga to'g'ri kelardi. Bunga boilerplate deyiladi."
    }
  ]
};

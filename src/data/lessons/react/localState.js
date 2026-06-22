export const localState = {
  id: "localState",
  title: "Local State: useState va useReducer",
  content: `
# Local State: useState va useReducer

React dasturlarida holat (state) komponentlarning xotirasi hisoblanadi. Kichik va o'rta kattalikdagi ilovalarda yoki faqat bitta komponentga tegishli bo'lgan ma'lumotlarni saqlashda **Local State** dan foydalaniladi. Local State asosan ikkita Hook yordamida boshqariladi: \`useState\` va \`useReducer\`.

## 1. useState: Oddiy holatlar uchun

\`useState\` bu React'dagi eng ko'p ishlatiladigan hook bo'lib, oddiy, mustaqil holatlarni saqlash va yangilash uchun mo'ljallangan.

### useState qachon ishlatiladi?
- Holat oddiy turlardan iborat bo'lsa (String, Number, Boolean).
- Holatni yangilash mantig'i oddiy bo'lsa.
- Boshqa holatlarga kuchli bog'liqlik bo'lmasa.

\`\`\`jsx
const [count, setCount] = useState(0);
const [text, setText] = useState('');
\`\`\`

> **Bilasizmi?** \`useState\` yordamida obyekt yoki massivlarni ham saqlash mumkin, lekin ularni yangilashda ehtiyot bo'lish kerak, chunki holatni to'g'ridan-to'g'ri o'zgartirib (mutate qilib) bo'lmaydi. Har doim yangi nusxa (copy) yaratilishi shart!

## 2. useReducer: Murakkab holatlar uchun

\`useReducer\` xuddi \`useState\` ga o'xshaydi, lekin u ancha murakkab mantiqni (logic) boshqarish uchun yaratilgan. U Redux'dan ilhomlangan bo'lib, holatni boshqarish mantig'ini komponent tashqarisiga chiqarish imkonini beradi.

### useReducer qachon ishlatiladi?
- Holat obyekti juda katta va murakkab bo'lsa (ko'p maydonlarga ega obyekt).
- Holatni yangilash mantig'i bir nechta shartlarni (if/else yoki switch) talab qilsa.
- Bitta hodisa (event) natijasida bir nechta holatlar ketma-ket o'zgarishi kerak bo'lsa.
- Keyingi holat bevosita avvalgi holatga bog'liq bo'lsa.

### useReducer qanday ishlaydi?

\`useReducer\` 3 ta asosiy qismdan tashkil topadi:
1. **State:** Joriy holat.
2. **Action:** Nima yuz berganini ta'riflovchi obyekt (odatda \`type\` va \`payload\` maydonlariga ega bo'ladi).
3. **Reducer:** Bu sof funksiya (pure function) bo'lib, joriy holat (\`state\`) va amalni (\`action\`) qabul qiladi hamda **yangi holatni** qaytaradi.

\`\`\`javascript
// 1. Reducer funksiyasi
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload };
    case 'DECREMENT':
      return { count: state.count - action.payload };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

// 2. Komponent ichida ishlatilishi
const [state, dispatch] = useReducer(counterReducer, { count: 0 });

// 3. Action jo'natish (dispatch qilish)
<button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>Oshirish</button>
\`\`\`

## 3. useState va useReducer ni taqqoslash

| Xususiyat | \`useState\` | \`useReducer\` |
| :--- | :--- | :--- |
| **Qachon ishlatiladi?** | Oddiy holatlar uchun (Boolean, String, raqamlar) | Murakkab obyektlar va ketma-ket o'zgarishlar uchun |
| **O'qilishi (Readability)** | Kichik state'lar uchun a'lo darajada | Katta mantiqni alohida funksiyaga ajratadi (toza kod) |
| **Mantiq qayerda yoziladi?** | Komponent ichida | Reducer funksiyasi ichida (ko'pincha komponentdan tashqarida) |
| **Testlash** | Komponent bilan birga test qilinadi | Reducer sof funksiya bo'lgani uchun uni alohida, oson testlash mumkin |

## 4. Xulosa

- Kichik va mustaqil qiymatlar uchun doim \`useState\` bilan boshlang.
- Agar komponentingizda ko'plab \`useState\` yig'ilib qolsa va ular bir-biri bilan uzviy bog'liq bo'lsa, ularni bitta \`useReducer\` ga birlashtirish haqida o'ylab ko'ring.
  `,
  code: `import React, { useState, useReducer } from "react";

// Reducer funksiyasi
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value
      };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
};

export default function App() {
  const initialState = { name: "", email: "", age: "" };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>useReducer Form Example</h2>
      <div>
        <input 
          name="name" 
          value={state.name} 
          onChange={handleChange} 
          placeholder="Ismingiz" 
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <input 
          name="email" 
          value={state.email} 
          onChange={handleChange} 
          placeholder="Email" 
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => dispatch({ type: "RESET", initialState })}>
          Tozalash
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <strong>Kiritilgan ma'lumotlar:</strong>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "useState ni useReducer ga o'tkazish",
      description: "Quyida oddiy counter dasturi keltirilgan. Undagi \`useState\` o'rniga \`useReducer\` ishlating.",
      startingCode: `import React, { useState } from "react";

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Sanoq: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
      solution: `import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET': return { count: 0 };
    default: return state;
  }
}

export default function CounterApp() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Sanoq: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}`,
      hint: "Avval komponentdan tashqarida \`reducer\` funksiyasini yarating. U action.type ga qarab state'ni o'zgartirsin. Keyin \`const [state, dispatch] = useReducer(reducer, { count: 0 });\` yozing."
    },
    {
      id: 2,
      title: "useReducer da obyektdagi bir nechta maydonlarni boshqarish",
      description: "Quyidagi formaga 'age' (yosh) inputini qo'shing. Reducer allaqachon universal yaratilgan (\`UPDATE_FIELD\`), siz faqat input qismini qo'shishingiz kerak xolos.",
      startingCode: `import React, { useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === 'UPDATE_FIELD') {
    return { ...state, [action.field]: action.value };
  }
  return state;
};

export default function FormApp() {
  const [state, dispatch] = useReducer(reducer, { name: '', age: '' });

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', field: e.target.name, value: e.target.value });
  };

  return (
    <div>
      <input name="name" value={state.name} onChange={handleChange} placeholder="Ism" />
      {/* VAZIFA: 'age' (Yosh) uchun input qo'shing */}
      
      <p>Ism: {state.name}, Yosh: {state.age}</p>
    </div>
  );
}`,
      solution: `import React, { useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === 'UPDATE_FIELD') {
    return { ...state, [action.field]: action.value };
  }
  return state;
};

export default function FormApp() {
  const [state, dispatch] = useReducer(reducer, { name: '', age: '' });

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', field: e.target.name, value: e.target.value });
  };

  return (
    <div>
      <input name="name" value={state.name} onChange={handleChange} placeholder="Ism" />
      <input name="age" value={state.age} onChange={handleChange} placeholder="Yosh" type="number" />
      
      <p>Ism: {state.name}, Yosh: {state.age}</p>
    </div>
  );
}`,
      hint: "\`<input name=\"age\" value={state.age} onChange={handleChange} />\` ni ishlating."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "useReducer hook'i nima uchun ishlatiladi?",
      options: [
        "Faqat tashqi API lar bilan ishlash uchun",
        "Murakkab state mantiqini boshqarish va state o'zgarishlarini bitta joyga (reducer) yig'ish uchun",
        "Komponentni tezroq render qilish uchun",
        "Faqat raqamli state'larni qo'shish yoki ayirish uchun"
      ],
      correctAnswer: 1,
      explanation: "useReducer komponentning murakkab state'ini boshqarish va harakatlarni (actions) markazlashtirilgan tarzda hal qilish uchun eng yaxshi vositadir."
    },
    {
      id: 2,
      question: "Reducer funksiyasi doimo nima qaytarishi (return qilishi) kerak?",
      options: [
        "Dispatch funksiyasini",
        "Eski state'ni o'zgartirmasdan",
        "Mutatsiya qilingan (o'zgartirilgan) eski obyektni",
        "Yangi state (holat) obyektini"
      ],
      correctAnswer: 3,
      explanation: "Reducer har doim mutatsiya qilinmagan (immutable) yangi state obyektini qaytarishi shart."
    },
    {
      id: 3,
      question: "dispatch() funksiyasi nimani qabul qiladi?",
      options: [
        "Yangi komponentni",
        "Action obyektini (masalan: { type: 'ADD', payload: 10 })",
        "Faqatgina true/false qiymatni",
        "Callback funksiyani"
      ],
      correctAnswer: 1,
      explanation: "dispatch funksiyasi state'ni qanday o'zgartirish kerakligini tushuntiruvchi action obyektini qabul qiladi."
    },
    {
      id: 4,
      question: "Nima uchun reducer funksiya 'sof' (pure function) bo'lishi kerak?",
      options: [
        "Chunki u DOM bilan ishlashi kerak",
        "Asinxron kod yozishga ruxsat berish uchun",
        "Bir xil kiruvchi ma'lumotlarga doim bir xil natija qaytarishi va nojo'ya ta'sirlari (side effects) bo'lmasligi uchun",
        "Faqat bitta argument qabul qilgani uchun"
      ],
      correctAnswer: 2,
      explanation: "Reducer sof funksiya bo'lishi shart, ya'ni unda tashqi API so'rovlar, DOM ni to'g'ridan-to'g'ri o'zgartirish kabi 'side effects' bo'lmasligi kerak."
    }
  ]
};

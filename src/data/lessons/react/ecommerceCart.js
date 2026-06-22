export const ecommerceCart = {
  id: "ecommerceCart",
  title: "E-commerce Savatcha (Context API va useReducer)",
  content: `
# Yakuniy Loyiha 2: E-commerce Savatcha (Cart)

Har qanday internet do'konining yuragi uning Savatchasi (Cart) hisoblanadi. Savat ma'lumotlari ilovaning juda ko'p joyida (Header da savat ikonkasi, Mahsulotlar ro'yxatida "Qo'shish" tugmasi, Savat sahifasida jami narx hisobi) kerak bo'ladi.

Bu loyihani eng to'g'ri ishlash yo'li — React ning o'zida o'rnatilgan **Context API** va murakkab logikalar uchun **useReducer** dan birgalikda foydalanishdir.

## 1. Loyiha Arxitekturasi

- **\`CartContext\`**: Barcha ma'lumotni o'zida ushlab turuvchi shaffof "quvur" (Provider).
- **\`cartReducer\`**: Savat ustida bajariladigan amallarni (Qo'shish, O'chirish, Sonini o'zgartirish) o'ziga oluvchi miya (funktsiya).
- **Komponentlar**: \`<Navbar />\` (jami mahsulot sonini ko'rsatadi), \`<ProductList />\` (mahsulotlarni chizadi), \`<Cart />\` (tanlanganlarni ko'rsatadi).

## 2. Reducer (Miya) ni yozamiz

\`useReducer\` xuddi \`useState\` ga o'xshaydi, faqat u buyruq (Action) qabul qiladi va shunga qarab ish tutadi.

\`\`\`javascript
// cartReducer.js
export const initialState = {
  items: [], // Savatdagi mahsulotlar
  totalAmount: 0 // Jami narx
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // 1. Mahsulot savatda borligini tekshiramiz
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      let updatedItems = [...state.items];
      
      if (existingIndex >= 0) {
        // Agar bor bo'lsa, sonini bittaga oshiramiz
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1
        };
      } else {
        // Agar yo'q bo'lsa, yangi qo'shamiz (quantity: 1 qilib)
        updatedItems.push({ ...action.payload, quantity: 1 });
      }

      // Jami narxni hisoblaymiz
      const updatedTotal = state.totalAmount + action.payload.price;

      return { items: updatedItems, totalAmount: updatedTotal };
    }

    case 'REMOVE_ITEM': {
      // Mahsulotni topamiz
      const itemToRemove = state.items.find(item => item.id === action.payload);
      
      // Filtrlash orqali o'chirib tashlaymiz
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      // Jami narxdan uning butun summasini ayirib tashlaymiz
      const updatedTotal = state.totalAmount - (itemToRemove.price * itemToRemove.quantity);

      return { items: updatedItems, totalAmount: updatedTotal };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}
\`\`\`

## 3. Context Provider ni yaratamiz

Endi bu miyani barcha komponentlarga tarqatuvchi provayder yasaymiz.

\`\`\`jsx
// CartContext.js
import React, { createContext, useReducer, useContext } from 'react';
import { cartReducer, initialState } from './cartReducer';

// 1. Context ni ochamiz
const CartContext = createContext();

// 2. Butun loyihani o'rab oluvchi Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Helper funksiyalar (Sodda foydalanish uchun)
  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook (Har doim useContext deb yurmaslik uchun)
export const useCart = () => useContext(CartContext);
\`\`\`

Asosiy \`App.js\` yoki \`index.js\` faylida butun loyihani \`<CartProvider>\` ga o'rab qo'yish esdan chiqmasin!

## 4. Komponentlarda ishlatish

Bu qismi eng osondir. Ilova qanchalik chuqur bo'lmasin, custom hook orqali savatga ulanaverasiz.

**A. Header (Savat ikonkasida sonini ko'rsatish):**
\`\`\`jsx
import { useCart } from './CartContext';

function Header() {
  const { cart } = useCart();
  // Savatdagi barcha mahsulotlarning umumiy sonini hisoblaymiz (reduce orqali)
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return <nav>Savat 🛒 ({totalItems})</nav>;
}
\`\`\`

**B. Mahsulot (Qo'shish):**
\`\`\`jsx
function Product({ data }) {
  const { addToCart } = useCart();
  return (
    <div>
      <h4>{data.name} - ${data.price}</h4>
      <button onClick={() => addToCart(data)}>Savatga Qo'shish</button>
    </div>
  );
}
\`\`\`

> **Xulosa:** Ko'pgina loyihalarda State Management uchun uchinchi tomon kutubxonalarisiz (masalan Redux) ham o'z ishini mukammal bajaradigan \`Context API + useReducer\` kombinatsiyasi keng qo'llaniladi. Reducer logikani toza saqlaydi, Context esa uni tarqatadi.
  `,
  code: `import React, { createContext, useContext, useReducer, useState } from "react";

// ==========================================
// 1. ARXITEKTURA (Context va Reducer)
// ==========================================
const initialState = { items: [], total: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exist = state.items.find(i => i.id === action.payload.id);
      if (exist) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
        total: state.total + action.payload.price
      };
    }
    case 'REMOVE': {
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (item.price * item.qty)
      };
    }
    default: return state;
  }
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// ==========================================
// 2. KOMPONENTLAR
// ==========================================
const Header = () => {
  const { state } = useContext(CartContext);
  const qty = state.items.reduce((sum, item) => sum + item.qty, 0);
  
  return (
    <div style={{ background: "#2d3436", color: "white", padding: "15px", display: "flex", justifyContent: "space-between", borderRadius: "8px 8px 0 0" }}>
      <h3>📱 iDo'kon</h3>
      <div style={{ background: "#e17055", padding: "5px 15px", borderRadius: "20px", fontWeight: "bold" }}>
        🛒 Savat ({qty})
      </div>
    </div>
  );
};

const ProductList = () => {
  const { dispatch } = useContext(CartContext);
  const products = [
    { id: 1, name: "MacBook Pro M3", price: 2000 },
    { id: 2, name: "iPhone 15 Pro", price: 1000 },
    { id: 3, name: "AirPods Pro", price: 250 }
  ];

  return (
    <div style={{ padding: "20px", display: "grid", gap: "10px", background: "#f1f2f6" }}>
      {products.map(p => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "15px", background: "white", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <div>
            <strong>{p.name}</strong> <br/> <span style={{ color: "green" }}>${p.price}</span>
          </div>
          <button 
            onClick={() => dispatch({ type: 'ADD', payload: p })}
            style={{ background: "#0984e3", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}
          >
            + Qo'shish
          </button>
        </div>
      ))}
    </div>
  );
};

const CartDetails = () => {
  const { state, dispatch } = useContext(CartContext);

  if (state.items.length === 0) return <div style={{ padding: "20px", textAlign: "center", color: "gray" }}>Savat bo'sh...</div>;

  return (
    <div style={{ padding: "20px", background: "#dfe6e9", borderRadius: "0 0 8px 8px" }}>
      <h4>Savatdagi mahsulotlar:</h4>
      {state.items.map(item => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #b2bec3", padding: "10px 0" }}>
          <span>{item.name} <strong>x{item.qty}</strong></span>
          <div style={{ display: "flex", gap: "15px" }}>
            <span>${item.price * item.qty}</span>
            <button 
              onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
              style={{ background: "#d63031", color: "white", border: "none", cursor: "pointer", borderRadius: "3px" }}
            >
              X
            </button>
          </div>
        </div>
      ))}
      <h3 style={{ textAlign: "right", marginTop: "20px", color: "#2d3436" }}>Jami: ${state.total}</h3>
    </div>
  );
};

// ==========================================
// 3. ASOSIY ILOVA YIG'ILISHI
// ==========================================
export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
        {/* Provayder barchasini o'rab oladi */}
        <CartProvider>
          <Header />
          <ProductList />
          <CartDetails />
        </CartProvider>
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Action Type ni to'g'ri berish",
      description: "dispatch orqali yuboriladigan buyruqlarning obyekti qanday nomlangan maxsus kalit so'zni o'z ichiga olishi kerak?",
      startingCode: `import { useCart } from './CartContext';\n\nfunction EmptyBtn() {\n  const { dispatch } = useCart();\n\n  return (\n    // VAZIFA: dispatch ichiga { type: 'CLEAR' } deb yozing\n    <button onClick={() => dispatch(               )}>Savatni Tozalash</button>\n  );\n}`,
      solution: `import { useCart } from './CartContext';\n\nfunction EmptyBtn() {\n  const { dispatch } = useCart();\n\n  return (\n    <button onClick={() => dispatch({ type: 'CLEAR' })}>Savatni Tozalash</button>\n  );\n}`,
      hint: "\`dispatch({ type: 'CLEAR' })\`"
    },
    {
      id: 2,
      title: "Context dan ma'lumotni o'qib olish",
      description: "\`useContext\` orqali \`CartContext\` dan qiymatlarni ajratib (destructure) oling.",
      startingCode: `import { useContext } from 'react';\nimport { CartContext } from './CartContext';\n\nfunction MyCart() {\n  // VAZIFA: Context dan 'state' ni o'qib oling\n  const {       } = useContext(             );\n\n  return <div>{state.total}</div>;\n}`,
      solution: `import { useContext } from 'react';\nimport { CartContext } from './CartContext';\n\nfunction MyCart() {\n  const { state } = useContext(CartContext);\n\n  return <div>{state.total}</div>;\n}`,
      hint: "\`const { state } = useContext(CartContext);\`"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Context API va useReducer kombinatsiyasi nima maqsadda ishlatiladi?",
      options: [
        "Faqat CSS animasiyalarini yozish uchun",
        "Kichik va o'rta loyihalarda global state ni (masalan, e-commerce savatchasi, user profili) ishonchli va tartibli boshqarish uchun",
        "React ilovasini Backend ga ulash uchun",
        "Dasturni telefonlarga moslash uchun"
      ],
      correctAnswer: 1,
      explanation: "Ushbu yondashuv aynan murakkab logikalarni bitta joyga (reducer) yig'ish va ularni ilova bo'ylab uzatish (Context) uchun eng maqbul (native) usuldir."
    },
    {
      id: 2,
      question: "Savatchadagi mahsulot qancha narx turishini va undan nechta kiritilganini hisoblab, Umumiy Jami summani topish uchun array ning qaysi metodi eng qulay?",
      options: [
        ".map()",
        ".reduce()",
        ".forEach()",
        ".filter()"
      ],
      correctAnswer: 1,
      explanation: ".reduce((sum, item) => sum + (item.price * item.quantity), 0) — bu array dagi barcha qiymatlarni bitta yakuniy songa yig'ishning mukammal yo'li."
    },
    {
      id: 3,
      question: "Reducer nima qabul qiladi va nima qaytaradi?",
      options: [
        "URL larni qabul qiladi, HTML qaytaradi",
        "State va Action ni qabul qiladi, yangilangan State ni qaytaradi",
        "Props qabul qilib, String qaytaradi",
        "Context qabul qilib, Function qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Reducer ning formulasi: (currentState, action) => newState. U hozirgi holat va buyruqqa qarab doimo yangi holat yaratib beruvchi sof funksiyadir."
    },
    {
      id: 4,
      question: "Tepadagi darsda mahsulotni savatga qo'shayotganda eng birinchi bo'lib qanday tekshiruv (mantiq) ishga tushdi?",
      options: [
        "Serverda Internet bormi yo'qmi tekshirildi",
        "Bu mahsulot avval savatga tushganmi yo'qmi, shuni tekshirib, agar bo'lsa faqat uning Soni (quantity) ni oshirdi. Yangi bo'lsa endi qo'shdi.",
        "Foydalanuvchi tizimga kirganligini tekshirdi",
        "Mahsulot og'irligini o'lchadi"
      ],
      correctAnswer: 1,
      explanation: "Savatchalardagi eng nozik jihat shuki, bitta telefonni 2 marta bosganingizda savatda ikkita alohida telefon yozuvi ko'rinmasligi kerak, balki 1 ta yozuvning oldida 'x2' (quantity) chiqishi kerak."
    }
  ]
};

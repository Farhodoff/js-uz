export const ecommerceCart = {
  title: "E-commerce Savat (Context API)",
  content: `
# E-commerce Savat (Context API)

Ikkinchi loyihamizda biz onlayn do'konlarning eng muhim qismi bo'lgan **"Savatcha" (Cart)** mantig'ini yozamiz. Bunda biz React'ning o'zida bor bo'lgan \`Context API\` va \`useReducer\` hooklaridan foydalanamiz.

### Nimani o'rganamiz?
* **Reducers:** Qanday qilib \`useReducer\` yordamida murakkab state ob'ektlarini (mahsulotlar ro'yxati, jami narx) boshqarishni.
* **Context API:** Savatcha ma'lumotlarini ilovaning eng yuqori qismida yaratib, xohlagan bola komponentlarga (Navbar, ProductList, CartDrawer) to'g'ridan-to'g'ri yetkazib berishni.
* **Actions:** \`ADD_TO_CART\`, \`REMOVE_FROM_CART\`, \`UPDATE_QUANTITY\` kabi harakatlarni (actions) Dispatch qilishni.

Bu usul ko'plab o'rta hajmali loyihalar uchun Redux'ning o'rnini to'liq bosa oladi.
`,
  code: `import React, { useReducer, createContext, useContext } from "react";

// 1. Initial State
const initialState = { items: [], total: 0 };

// 2. Reducer funksiya
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { 
        ...state, 
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };
    case "REMOVE":
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (item ? item.price : 0)
      };
    default:
      return state;
  }
}

// 3. Context yaratamiz
const CartContext = createContext();

// 4. Bosh Komponent
export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
        <h1>🛒 Onlayn Do'kon</h1>
        <Navbar />
        <Products />
      </div>
    </CartContext.Provider>
  );
}

function Navbar() {
  const { state } = useContext(CartContext);
  return (
    <div style={{ background: '#333', color: 'white', padding: 15, display: 'flex', justifyContent: 'space-between' }}>
      <b>Mening Do'konim</b>
      <span>Savat: {state.items.length} ta (Jami: \${state.total})</span>
    </div>
  );
}

function Products() {
  const { dispatch } = useContext(CartContext);
  const add = () => dispatch({ type: "ADD", payload: { id: Date.now(), name: "Noutbuk", price: 1000 } });
  
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Mahsulotlar</h3>
      <div style={{ border: '1px solid #ccc', padding: 15, display: 'inline-block' }}>
        <p>MacBook Pro - $1000</p>
        <button onClick={add} style={{ padding: '8px 15px', background: 'blue', color: 'white', border: 'none' }}>
          Savatga qo'shish
        </button>
      </div>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
    {
      question: "useReducer dagi 'action' ob'ektining majburiy bo'lgan qismi nima?",
      options: ["payload", "data", "type", "id"],
      correctAnswer: 2,
      explanation: "Har bir action albatta 'type' xususiyatiga ega bo'lishi kerak, tok reducer qaysi amalni bajarishni aniqlay bilsin."
    }
  ]
};

# 📚 React Hooks — JS context bilan uyg'unlik (useState, useEffect, useContext) — O'rta daraja

## 📦 Tushunchalarning sodda izohi

React Hooks — "funksiyonlar yordamida state, lifecycle va kontekst bilan ishlash". Hooks — JS context (this, closure, event loop, promise, array/object) bilan uyg'unlikda yaziladi. Bu dars — hooks larni **JS kontekstida tushuntirish** (this, closure, useState, useEffect, useContext).

### 1. useState — state (JS object/array yoki value)

- **useState(value):** `const [state, setState] = useState(initialValue)` — `state` — current value, `setState` — state ni o'zgartirish function (yoki yangi value).
- **setState — o'zgartirish:** `setState(newValue)` — state ni yangilash (React re-render). `setState(prev => prev + 1)` — function (previous state bilan).
- **JS array/object state:** `const [user, setUser] = useState({ name: "Ali", age: 0 });` — state object. `setUser({ ...user, age: user.age + 1 })` — immutable update (yangi obyekt). `const [items, setItems] = useState([]);` — state array. `setItems([...items, newItem])` — immutable.
- **React state — immutable:** `setState` — state ni o'zgartirmaslik (new value yoki new object/array). `const [arr, setArr] = useState([1,2]); setArr(arr.push(3))` — xato (arr.push — reference o'zgartirdi, React o'zgarishni ko'rmaydi). Shunday qilib, `setArr([...arr, 3])` — new array.

### 2. useEffect — lifecycle (side effects)

- **useEffect(callback, deps):** "side effect" — `callback` ishga tushadi (component mount/render/state change). `deps` (dependency array) — callback qanaq repeat qilinadi (array ichida qiymat o'zgarganda).
- **Dependency array:** `[]` — mount (bir marta). `[a, b]` — `a` yoki `b` o'zgarganda. `[]` yo'q — har render (har render). `useEffect(() => { ... }, [])` — mount.
- **Cleanup (function qaytishi):** `useEffect(() => { ... return () => { /* cleanup */ }; }, [])` — cleanup (unmount yoki deps o'zgarganda oldingi callback cleanup). Masalan: `setInterval` — cleanup `clearInterval`.
- **JS contextda useEffect:** `useEffect` — "async" state, "promise" (data fetching), "event listener" (add/remove), "setTimeout/setInterval" (timer). Shunday qilib, `useEffect` — JS side effects (closure, promise, event loop).

### 3. useContext — global context (JS closure / Module Pattern bilan uyg'unlik)

- **useContext(Context):** `const value = useContext(MyContext)` — "global context value" (context API). Module Pattern (IIFE, private state) bilan uyg'unlik: `MyContext` — "global state" — useContext orqali "access".
- **Context.Provider:** `<MyContext.Provider value={{ user, login, logout }}>` — "value" — context ni beradi. `useContext(MyContext)` — value.
- **JS context (closure/Moful) bilan uyg'unlik:** Module Pattern — IIFE ichida private state, return { public methods }. Context API — global state (context.Provider value) — useContext — access. Shunday qilib, useContext — Module Pattern bilan o'xshash (global private state + public API).
- **Context — state management:** `useState` + `useContext` — global state (masalan, user auth, theme, lang). Har component `useContext(MyContext)` — access.

### 4. Hooks va JS context (this, closure, event loop)

- **this — React hooks da yo'q:** React function component — `this` yo'q (this confusion yo'q). Hooks — function component ichida `this` yo'q (closure yordamida state).
- **Closure — Hooks la:** `useState` — "closure" state — `setState` function — "closure" state access. `useEffect` — "closure" — callback — "closure" state (deps array ichida).
- **Event loop — useEffect:** `useEffect` — "effects" (Promise, setTimeout, event listener) — "event loop" (callback, microtask, macrotask) bilan uyg'unlik. Masalan: `useEffect(() => { const timer = setTimeout(...); return () => clearTimeout(timer); })` — setTimeout cleanup.

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar (JS context — React Hooks):

```javascript
// 1. useState — state (JS object/array)
function Counter() {
  const [count, setCount] = useState(0); // state — number
  // count — current value, setCount — o'zgartirish
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      {/* setCount(prev => prev - 1) — function — previous state */}
    </div>
  );
}

// 2. useState — object state (immutable update)
function UserProfile() {
  const [user, setUser] = useState({ name: "Ali", age: 0, role: "user" });
  const birthday = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 })); // new object — immutable
    // setUser(prev => { prev.age++; return prev; }) — xato (mutate! React o'zgarishni ko'rmaydi)
  };
  return (
    <div>
      <p>{user.name} — {user.age} yosh</p>
      <button onClick={birthday}>Tug'ilgan kun</button>
    </div>
  );
}

// 3. useState — array state (immutable)
function TodoList() {
  const [todos, setTodos] = useState([]);
  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]); // new array
    // setTodos(prev => { prev.push({...}); return prev; }) — xato
  };
  const toggle = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };
  return (
    <div>
      {todos.map(t => (
        <div key={t.id}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
          <span>{t.text}</span>
        </div>
      ))}
      <button onClick={() => addTodo("New task")}>Qo'shish</button>
    </div>
  );
}

// 4. useEffect — lifecycle (deps)
function Timer() {
  const [count, setCount] = useState(0);
  // mount — timer
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    // cleanup — clearInterval
    return () => clearInterval(timer);
  }, []); // deps [] — mount / unmount
  return <div>Time: {count}s</div>;
}

// 5. useEffect — dependency array (o'zgarishda)
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  // userId o'zgarganda — fetch
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // deps — userId o'zgarganda
  // ...
}

// 6. useEffect — cleanup (event listener)
function WindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handler);
    // cleanup — remove listener
    return () => window.removeEventListener("resize", handler);
  }, []); // mount / unmount
  return <div>{size.w}x{size.h}</div>;
}

// 7. useEffect — async (Promise) — o'zi async useEffect yo'q
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await fetch("/api/data");
      const json = await res.json();
      if (!cancelled) setData(json);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; }; // cleanup — abort
  }, []);
  // ...
}

// 8. useContext — global context
const UserContext = createContext(null);
function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <UserProfile />
    </UserContext.Provider>
  );
}
function UserProfile() {
  const { user, setUser } = useContext(UserContext); // global access
  // ...
}

// 9. useEffect — closure (state access)
function ClosureExample() {
  const [count, setCount] = useState(0);
  // useEffect callback — closure — count access
  useEffect(() => {
    console.log("count:", count); // count — closure (deps [] — mount — initial count 0)
  }, []); // deps [] — mount — callback count 0 (initial)
  // Bu "stale closure" (agar setCount(10) qilinganida ham callback 0 — deps [] — initial state)
  // To'g'ri: deps [count] — o'zgarishda
  useEffect(() => {
    console.log("count:", count); // count — o'zgarganda
  }, [count]); // deps [count] — o'zgarishda
  return <div>{count}</div>;
}

// 10. useEffect — timer (setTimeout) — event loop
function TimerExample() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      const id = setTimeout(() => setVisible(false), 3000); // 3 soniya
      return () => clearTimeout(id); // cleanup
    }
  }, [visible]); // deps [visible] — o'zgarganda
  return <div style={{ display: visible ? "block" : "none" }}>Flash</div>;
}
```

### ❌ Noto'g'ri yondashuvlar (JS context — React Hooks):

```javascript
// XATO 1: useState — mutate (reference o'zgartirish)
const [user, setUser] = useState({ name: "Ali", age: 0 });
setUser(user); // xato — newState = user (reference o'zgarmaydi — React o'zgarishni ko'rmaydi)
// setUser({ ...user, age: 1 }) — new object — React re-render

// XATO 2: useState — array mutate (push)
const [arr, setArr] = useState([1, 2, 3]);
arr.push(4);
setArr(arr); // xato — arr.push — reference o'zgarmaydi — React o'zgarishni ko'rmaydi
// setArr([...arr, 4]) — new array

// XATO 3: useEffect — deps yo'q (har render) — infinite render
function Bad() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1); // count o'zgarganda — effect ishlaydi — re-render — effect — count o'zgardi — infinite
  }); // deps yo'q — har render — infinite
}
// To'g'ri: useEffect(() => { setCount(c => c + 1); }, []); — mount

// XATO 4: useEffect — async function direct (effect return function emas)
useEffect(async () => { // xato — useEffect callback async — return Promise (cleanup function emas)
  const res = await fetch("/api/data");
  setData(await res.json());
}, []);
// To'g'ri: useEffect(() => { (async () => { ... })(); }, []); — async function ichida

// XATO 5: useEffect — stale closure (deps yo'q yoki noto'g'ri)
function Stale() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // count — 0 (initial state — closure --- count = 0)
    }, 1000);
    return () => clearInterval(timer);
  }, []); // deps [] — mount — count 0 (closure) — o'zgarganda callback count = 0 (stale)
}
// To'g'ri: deps [count] — o'zgarishda callback count o'zgardi

// XATO 6: useEffect — cleanup yo'q (event listener yoki timer)
useEffect(() => {
  window.addEventListener("resize", handler); // cleanup yo'q — handler yig'iladi (memory leak)
}, []);
// To'g'ri: return () => window.removeEventListener("resize", handler);

// XATO 7: useContext — Provider value o'zgaruvchan (object reference o'zgarishi)
const [user, setUser] = useState(null);
<UserContext.Provider value={{ user, setUser }}> {/* object — har render yangi reference — re-render children */}
// To'g'ri: useMemo — value o'zgarmas yoki Provider value o'zgarganda
const value = useMemo(() => ({ user, setUser }), [user]);
<UserContext.Provider value={value}>

// XATO 8: useState — function state (setState call — function call emas)
const [visible, setVisible] = useState(false);
setVisible(false); // setVisible — function state — setState(state + 1) function state — this confusion
// setState — function (setState) call — state set

// XATO 9: useContext — Provider value yoki context consumption yig'ilishi
const ThemeContext = createContext("light");
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggle />
    </ThemeContext.Provider>
  );
}
function ThemeToggle() {
  const theme = useContext(ThemeContext); // string — o'zgarib turadi — har component re-render
  // Yaxshi: Provider value object — { theme, setTheme } — state management
}

// XATO 10: useEffect — dependency array o'zgarmas (object/function reference)
function BadDeps() {
  const [count, setCount] = useState(0);
  const config = { theme: "dark" }; // object — har render yangi — deps o'zgardi — effect repeat
  useEffect(() => {
    console.log("effect");
  }, [config]); // config — har render yangi — effect har render (infinite)
  return <div>{count}</div>;
}
// To'g'ri: useMemo — config o'zgarmas — yoki deps [] — yoki deps [count]
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri (JS context — React Hooks):

- **useState — immutable update:** `setState(prev => ({ ...prev, prop: value }))` — new object.
- **useState — array:** `setItems(prev => [...prev, newItem])` — new array.
- **useEffect — deps array:** `[]` — mount, `[a, b]` — o'zgarishda, `[]` yo'q — har render (infinite xato).
- **useEffect — cleanup:** `return () => { ... }` — timer clear, event listener remove, abort controller.
- **useEffect — async function:** `useEffect(() => { (async () => { ... })(); }, [])` — effect callback async emas (Promise return cleanup emas).
- **useContext — global context:** `createContext` + `Provider` + `useContext` — global state.
- **Closure (stale):** `useEffect` callback — closure — deps array to'g'ri (o'zgarishda callback o'zgaradi).
- **React — `this` yo'q:** function component — `this` yo'q (closure state).

### ❌ Noto'g'ri:

- **useState — mutate:** `setArr(arr.push(4))` — reference o'zgarmaydi (React o'zgarishni ko'rmaydi).
- **useEffect — deps yo'q:** har render — infinite render — infinite loop.
- **useEffect — async callback:** `useEffect(async () => { ... })` — Promise return — cleanup function emas (warning).
- **useEffect — stale closure:** deps [] — count 0 (closure) — o'zgarganda callback count 0 (stale).
- **useEffect — cleanup yo'q:** event listener yig'iladi — memory leak.
- **useContext — Provider value o'zgaruvchan (object reference):** har render yangi object — children re-render — performance.
- **useState — function state:** `setState(functionState)` — function call — state call (confusion).
- **useContext — Provider value string:** string — har component re-render — performance.

## 🎩 Hayotiy o'xshatishlar

- **useState — "sakf" (state):** "Hisobot" (state) — "current qiymat" — `setState` — "yangi qiymat" — React re-render. Masalan: "Kampon" (state) — "current qiymat" — `setState` — "yangi qiymat" — re-render. Masalan: "Tovar" (state — object) — `setUser({ ...user, age: 1 })` — new object (yoki `setItems([...items, item])` — new array).
- **useEffect — "qayta ishlash" (side effect):** "Qayta ishlash" — "effect" — "component" mount/render/state change. Masalan: "Timer" — `setInterval` (effect) — cleanup `clearInterval` (unmount). "Event listener" — `addEventListener` — cleanup `removeEventListener`. "Data fetching" — `fetch` (Promise) — async.
- **useContext — "global hujjat" (context):** "Global hujjat" — "context.Provider" — "value" — "useContext" — access. Masalan: "User auth" — `UserContext.Provider value={{ user, login, logout }}` — `useContext(UserContext)` — global access.
- **JS context (closure/Moful):** Module Pattern — IIFE ichida private state, return { public }. Context API — Provider value (global) — useContext. Shunday qilib, useContext — Module Pattern bilan uyg'unlik (global private state + public API). Shunday qilib, "JS context" (closure/Moful) va "React hooks".
- **Event loop — useEffect:** `useEffect` — "effects" (Promise, setTimeout, event listener) — "event loop" (callback, microtask) bilan uyg'unlik. Masalan: `setTimeout` — event loop callback — cleanup `clearTimeout`.

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ React Hooks — JS context (this, closure, event loop, Promise) ]
    A --> B1[ useState — state (JS object/array)
    value = useState(initial)
    setState(newValue)
    immutable update (new obj/array)
    — React re-render
    ]
    A --> B2[ useEffect — lifecycle / side effect
    callback (mount/render/state change)
    deps [] — mount
    deps [a, b] — o'zgarishda
    deps yo'q — har render (infinite xato)
    cleanup: return () => { ... }
    — timer clear, event listener remove, Promise abort
    ]
    A --> B3[ useContext — global context
    createContext + Provider value
    useContext(value) — global access
    — Module Pattern (IIFE, private state)
    — Provider value = global state
    ]
    A --> B4[ JS context — Hooks (this, closure, event loop)
    this — React hooks da yo'q (function component)
    closure — useState/setState (closure state)
    closure — useEffect callback (closure)
    event loop — useEffect (Promise, setTimeout, event listener)
    ]
    
    B1 --> C1[ useState — state (object/array)
    setUser({ ...user, age: 1 }) — new object
    setItems([...items, item]) — new array
    — immutable
    ]
    B2 --> C2[ useEffect — deps / cleanup
    [] — mount
    [a, b] — o'zgarishda
    deps yo'q — infinite
    cleanup — return () => clearTimeout / removeEventListener / abort
    ]
    B3 --> C3[ useContext — global
    Provider value = { user, setUser }
    useContext(MyContext) — access
    — Module Pattern private state + public API
    ]
    B4 --> C4[ JS context — Hooks
    this — yo'q (function component)
    closure — useState/setState
    closure — useEffect callback
    event loop — Promise / setTimeout / event listener
    ]
    
    style B1 fill:#e3f2fd,stroke:#1976d2
    style B2 fill:#e8f5e9,stroke:#2e7d32
    style B3 fill:#fff3e0,stroke:#e65100
    style B4 fill:#f3e5f5,stroke:#7b1fa2
```

**Diagrama tushuntirishi:** React Hooks — JS context:
1. **useState** — state (JS object/array), `setState(newValue)`, immutable update (new object/array), React re-render.
2. **useEffect** — lifecycle/side effect, callback (mount/render/state change), deps (`[]` — mount, `[a,b]` — o'zgarishda, deps yo'q — har render — infinite xato), cleanup (`return () => ...` — timer clear, event listener remove, Promise abort).
3. **useContext** — global context, `createContext` + `Provider value`, `useContext` — global access. Module Pattern (IIFE, private state) bilan uyg'unlik.
4. **JS context (this, closure, event loop):** `this` — React hooks da yo'q (function component), closure — `useState/setState` / `useEffect` callback, event loop — `useEffect` (Promise, setTimeout, event listener).

## 🎙 Intervyu savollari va javoblari

### 1. `useState` nima? State ni o'zgartirishda qanday yondashuv?

**Javob:** `useState(initial)` — `const [state, setState] = useState(initial)` — `state` current qiymat, `setState` o'zgartirish function. State ni o'zgartirishda — `setState(newValue)` (yoki `setState(prev => newState)`). JS object/array state — immutable update (new object/array). `setUser({ ...user, age: user.age + 1 })` — new object. `setItems([...items, newItem])` — new array. `setArr(arr.push(4))` — xato (mutate — React o'zgarishni ko'rmaydi).

### 2. `useEffect` dependency array nima? `[]` va `[a, b]` va yo'q farqi?

**Javob:** `useEffect(callback, deps)` — deps array (dependency) — callback qanaq repeat. `[]` — mount (bir marta). `[a, b]` — `a` yoki `b` o'zgarganda (callback ishga tushadi). deps yo'q — har render (infinite — rekursiv — infinite loop xato). Shunday qilib, deps array — callback qanaq ishlashi.

### 3. `useEffect` cleanup nima va qanday ishlatiladi? Misol yozing.

**Javob:** `useEffect` callback yoki function qaytaradi — cleanup function (`return () => { ... }`) — unmount yoki deps o'zgarganda (oldingi effect cleanup). Misol: `useEffect(() => { const timer = setInterval(() => ..., 1000); return () => clearInterval(timer); }, [])` — timer cleanup (unmount). `useEffect(() => { window.addEventListener("resize", handler); return () => window.removeEventListener("resize", handler); }, [])` — event listener cleanup. Promise fetch — abort controller cleanup.

### 4. `useEffect` ichida async function qanday? Nima uchun direct async effect yo'q?

**Javob:** `useEffect` callback async bo'la olmaydi — `useEffect(async () => { ... })` — return Promise (cleanup function emas) — warning. Shunday qilib, `useEffect(() => { (async () => { ... })(); }, [])` — async function ichida. Yoki `useEffect(() => { let cancelled = false; async function load() { ... if (!cancelled) setData(...); } load(); return () => { cancelled = true; }; }, [])` — cleanup (abort).

### 5. "Stale closure" nima? `useEffect` dao qanday?

**Javob:** "Stale closure" — `useEffect` callback — closure — state/qayta state qiymat — deps array to'g'ri bo'lmasa (callback stale state). Misol: `useEffect(() => { const timer = setInterval(() => console.log(count), 1000); return () => clearInterval(timer); }, []);` — deps [] — mount — `count` initial (0) — `setCount(10)` qilinganda ham callback `count` 0 (stale closure). Shunday qilib, deps `[count]` — o'zgarishda callback o'zgaradi. Shunday qilib, stale closure — deps array to'g'ri.

### 6. `useContext` nima? Module Pattern bilan qanday o'xshash?

**Javob:** `useContext(Context)` — `const value = useContext(MyContext)` — "global context value" (context.Provider value). Module Pattern (IIFE) — private state (closure), return { public methods }. Context API — Provider value (global state) — useContext (access). Shunday qilib, useContext — Module Pattern bilan ochilib tursa (global private state + public API). Shunday qilib, `UserContext.Provider value={{ user, setUser }}>` — useContext `({ user, setUser })`.

### 7. `setState` function (prev) — nima uchun foydali?

**Javob:** `setState(prev => newState)` — "previous state" (current state) bilan yangi state. Masalan: `setCount(prev => prev + 1)` — `prev` — previous count. Shunday qilib, state o'zgarganda (masalan, `setCount` ba'zan "batch" rendering) — `prev` — previous state (to'g'ri). `setState(count + 1)` — `count` current state (stale) — ex. multiple `setCount` — `prev` foydali. Shunday qilib, `prev => newState` — state access to'g'ri.

### 8. `useState` massiv/object state — immutable update qanday?

**Javob:** `const [user, setUser] = useState({ name: "Ali", age: 0 });` — `setUser(prev => ({ ...prev, age: prev.age + 1 }))` — new object (immutable). `const [items, setItems] = useState([]);` — `setItems(prev => [...prev, newItem])` — new array. `setItems(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))` — new array (map). Shunday qilib, immutable update (new object/array) — React re-render.

### 9. `useState` — `this` confusion yo'q?

**Javob:** React function component — `this` yo'q (function component — `this` noma'lum). React hooks — function component ichida `this` yo'q (state closure yordamida). Shunday qilib, `this` confusion yo'q — hooks — arrow function yoki this yo'q. Shunday qilib, React function component — `this` yo'q — closure state (useState).

### 10. `useEffect` — Promise yoki setTimeout — event loop bilan qanday uyg'unlik?

**Javob:** `useEffect` — side effect (Promise, setTimeout, event listener) — "event loop" bilan uyg'unlik. `useEffect(() => { const timer = setTimeout(() => ..., 1000); return () => clearTimeout(timer); }, [])` — setTimeout (macrotask) — cleanup. `useEffect` — fetch (Promise — microtask) — async. `useEffect` — event listener (macrotask callback) — cleanup. Shunday qilib, `useEffect` — side effect (Promise, setTimeout, event listener) — event loop (callback, microtask, macrotask) bilan uyg'unlik.

### 📌 Xulosa:

- **useState** — state (JS value, object, array), `setState` — immutable (new object/array).
- **useEffect** — lifecycle/side effect, deps array (`[]` — mount, `[a,b]` — o'zgarishda, deps yo'q — infinite), cleanup (`return () => ...`).
- **useEffect async:** `useEffect(() => { (async () => { ... })(); }, [])` — callback async emas.
- **Stale closure:** `useEffect` callback — closure — deps array to'g'ri (o'zgarishda callback o'zgaradi).
- **useContext** — global context (`createContext` + `Provider` + `useContext`), Module Pattern bilan uyg'unlik.
- **JS context (this/closure/event loop):** `this` — React hooks da yo'q; closure — `useState/setState`, `useEffect`; event loop — Promise, setTimeout, event listener.

---

**Keyingi darslar (o'rta daraja) — ketma-ketlik:**
1. ✅ Event Loop
2. ✅ Error Handling
3. ✅ Closures Qo'shimcha — Module Pattern, Factory Functions, Currying
4. ✅ this keyword — call, apply, bind, arrow functions, method borrowing
5. ✅ React Hooks (useState, useEffect, useContext) — JS context bilan uyg'unlik
6. **TypeScript asoslari (tip, interface, type alias) — JS keyingi bosqich**
7. **OOP / Prototypes / Classes / Inheritance (JS OOP bosqich)**

Keyingi mavzu: **6 — TypeScript** yoki **7 — OOP**. Qaysi? Yozayman.
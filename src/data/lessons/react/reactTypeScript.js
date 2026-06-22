export const reactTypeScript = {
  id: "reactTypeScript",
  title: "React va TypeScript Integratsiyasi",
  content: `
# React ni TypeScript bilan ishlatish

JavaScript bu "Dinamik tipli" (Dynamic Typed) til. Ya'ni u xatoni faqat kod brauzerda ishlab bo'lganidan keyingina ko'rsatadi. React dasturchilari ko'pincha Props orqali nima kiritish kerakligini unutib qo'yadilar yoki noto'g'ri ma'lumot jo'natadilar.
**TypeScript (TS)** — bu kod yozayotgan paytingizdayoq (VS Codeda) xatolarni aniqlab beruvchi va mukammal Avto-to'ldirish (Autocomplete) ni ta'minlovchi vositadir. Hozirgi kunda barcha zamonaviy React loyihalar qat'iy ravishda TypeScript da yozilmoqda.

## 1. Props (Uzatilayotgan ma'lumot) ni tiplash

JavaScript da biz shunchaki \`({ name, age })\` der edik. TS da esa biz \`interface\` yoki \`type\` orqali bu ma'lumotlarning pasportini (qolipini) yaratamiz.

\`\`\`tsx
import React from 'react';

// 1. Qolip (Interface) yaratamiz
interface UserProps {
  name: string;        // Ism albatta matn bo'lishi shart
  age: number;         // Yosh albatta raqam bo'lishi shart
  isAdmin?: boolean;   // So'roq belgisi (?) bu ixtiyoriy (majburiy emas) degani
}

// 2. Komponentga qolipni ulaymiz
function UserCard({ name, age, isAdmin = false }: UserProps) {
  return (
    <div>
      <h3>{name} ({age} yosh)</h3>
      {isAdmin && <p>Tizim ma'muri</p>}
    </div>
  );
}

// ENDI XATOLAR OLDINI OLINADI:
// <UserCard name="Ali" /> => Xato beradi, chunki "age" yozilmadi!
// <UserCard name="Ali" age="Yigirma" /> => Xato beradi, "age" raqam bo'lishi kerak!
\`\`\`

## 2. State (Holat) ni tiplash

Ko'p hollarda \`useState\` o'z turini o'zi topib oladi (Type Inference). Masalan: \`useState(0)\` desangiz u raqamligini tushunadi. Lekin boshida bo'sh bo'lgan, keyin ma'lumot keladigan joylarda biz unga \`Generic Type (<T>)\` berishimiz shart.

\`\`\`tsx
import { useState } from 'react';

// User qanday bo'lishini ta'riflaymiz
type User = {
  id: number;
  email: string;
};

function App() {
  // Boshida null, keyin esa User obyektiga aylanadi
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    // Agar xato narsa yozsak, TypeScript darhol qizarib xato beradi!
    setUser({ id: 1, email: "admin@uz.com" }); 
  };

  return (
    <div>
      {/* Optional chaining (?.) yordamida xavfsiz o'qish */}
      <p>{user?.email}</p> 
      <button onClick={handleLogin}>Kirish</button>
    </div>
  );
}
\`\`\`

## 3. Events (Hodisalar) ni tiplash

Oddiy JS da \`onChange={(e) => ...}\` deb ketaverardik. TS da esa shu \`e\` nima ekanligini aytish kerak. Bu React'ning o'zida tayyor yozilgan turlar orqali bajariladi.

- **Input o'zgarganda:** \`React.ChangeEvent<HTMLInputElement>\`
- **Tugma (yoki forma) bosilganda:** \`React.MouseEvent<HTMLButtonElement>\` yoki \`React.FormEvent<HTMLFormElement>\`

\`\`\`tsx
import React, { useState } from 'react';

function Form() {
  const [text, setText] = useState("");

  // Hodisa turini aniq ko'rsatdik
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Jo'natildi:", text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Saqlash</button>
    </form>
  );
}
\`\`\`

## 4. Children (Bolalar) ni tiplash

Agar komponentingiz o'z ichiga boshqa HTML teglar yoki React komponentlarni olsa (\`<Card> <h1>Salom</h1> </Card>\`), \`children\` propini quyidagicha tiplaysiz:

\`\`\`tsx
import React from 'react';

interface CardProps {
  title: string;
  // ReactNode bu React render qila oladigan har qanday narsa (matn, teg, qator) degani
  children: React.ReactNode; 
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
\`\`\`

> **Xulosa:** TypeScript bilan yozilgan React kodi dastlab biroz ko'p vaqt va qoidalar talab qilishi mumkin. Lekin loyiha kattalashgani sari, bu yozilgan "qoliplar" sizning eng yaqin do'stingizga aylanadi va yuzlab mantiqiy xatolarning oldini oladi.
  `,
  code: `import React, { useState } from "react";

// TAYYORGARLIK: Oddiy .js muhitda ishlayotganimiz uchun TypeScript kodlari aslida 
// brauzerda ishlamaydi. Shuning uchun bu yerda uning taqlid qilingan (kommentlangan)
// holatini ko'rsatib o'tamiz.

/*
// 1. INTERFACE (Qolip yaratish)
interface TodoItemProps {
  id: number;
  task: string;
  isDone: boolean;
  onToggle: (id: number) => void; // Funksiyani tiplash (hech narsa qaytarmaydi)
}

// 2. KOMPONENTGA QOLIP BERISH
const TodoItem: React.FC<TodoItemProps> = ({ id, task, isDone, onToggle }) => {
  return (
    <li 
      style={{ textDecoration: isDone ? 'line-through' : 'none' }}
      onClick={() => onToggle(id)}
    >
      {task}
    </li>
  );
};

export default function App() {
  // 3. STATE NI TIPLASH (<T>)
  const [todos, setTodos] = useState<{ id: number, task: string, isDone: boolean }[]>([
    { id: 1, task: "TypeScript o'rganish", isDone: false },
    { id: 2, task: "React loyiha yozish", isDone: false }
  ]);

  const toggleTask = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          id={todo.id}
          task={todo.task}
          isDone={todo.isDone}
          onToggle={toggleTask}
        />
      ))}
    </ul>
  );
}
*/

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>TypeScript va React</h2>
      <p>Bu muhitda .ts yoki .tsx kengaytmali fayllar qo'llab-quvvatlanmagani uchun haqiqiy kompilyatsiya bo'lmaydi.</p>
      <p>Lekin kod muharriringizda (VS Code) huddi darslikda yozilgandek xavfsiz va aniq tiplash qoidalarini ishlata olasiz.</p>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Props lar uchun Type yaratish",
      description: "Bizga \`name\` (matn), \`age\` (raqam) va \`isActive\` (majburiy emas, boolean) larni qabul qiluvchi \`ProfileProps\` turini (type) yarating.",
      startingCode: `// VAZIFA: ProfileProps turini yarating\ntype ProfileProps = {\n  \n};\n\nfunction Profile(props: ProfileProps) {\n  return <div>{props.name}</div>;\n}`,
      solution: `type ProfileProps = {\n  name: string;\n  age: number;\n  isActive?: boolean;\n};\n\nfunction Profile(props: ProfileProps) {\n  return <div>{props.name}</div>;\n}`,
      hint: "\`name: string; age: number; isActive?: boolean;\` deb yoziladi."
    },
    {
      id: 2,
      title: "State ni Generic Type bilan o'rash",
      description: "Quyidagi state faqat Matn (string) dan iborat Massiv qabul qilishini TypeScript ga tushuntiring.",
      startingCode: `import { useState } from 'react';\n\nfunction App() {\n  // VAZIFA: Quyidagi useState ni shunday tiplangki, u faqat string[] qabul qilsin\n  const [names, setNames] = useState([]);\n\n  return <div>{names.length}</div>;\n}`,
      solution: `import { useState } from 'react';\n\nfunction App() {\n  const [names, setNames] = useState<string[]>([]);\n\n  return <div>{names.length}</div>;\n}`,
      hint: "\`useState<string[]>([])\` ko'rinishida yozing."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React da nima uchun TypeScript dan foydalanish standartga aylandi?",
      options: [
        "Chunki u kod hajmini qisqartiradi",
        "React ni tekin qilish uchun",
        "Koddagi xatoliklarni (masalan noto'g'ri prop uzatishni) kod yozayotgan jarayonidayoq oldindan bilib olish va IDE dagi ajoyib Auto-complete (avto to'ldirish) xususiyati uchun",
        "Brauzer faqat TypeScript ni tushungani uchun"
      ],
      correctAnswer: 2,
      explanation: "Kattalashib borayotgan loyihalarda qayerdan nima ma'lumot kelayotganini xotirada saqlab qolish qiyin. TS bizga hamma obyekt va turlarni aniq-tiniq ko'rsatib turadi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri Ixtiyoriy (Optional) prop ni bildiradi?",
      options: [
        "name: string || null",
        "name*: string",
        "name?: string",
        "?name: string"
      ],
      correctAnswer: 2,
      explanation: "Mulk (property) nomidan keyin qo'yilgan so'roq belgisi (?) bu prop komponent chaqirilganda berilmasa ham xato bo'lmasligini, sukut bo'yicha 'undefined' bo'lishini anglatadi."
    },
    {
      id: 3,
      question: "Komponent ichida o'z ichiga boshqa komponentlarni (<Component> <b>bold</b> </Component>) oluvchi maxsus 'children' propining to'g'ri TypeScript turi nima?",
      options: [
        "children: string",
        "children: Element",
        "children: React.ReactNode",
        "children: any"
      ],
      correctAnswer: 2,
      explanation: "ReactNode o'z ichiga hamma narsani oladi: stringlar, sonlar, null, va asosiysi React Elementlarni (teglar). Bu children uchun eng qulay va to'g'ri tipdir."
    },
    {
      id: 4,
      question: "Agar useState ga boshlang'ich qiymat bermasak, lekin uning aniq bir Obyekt turida bo'lishini xohlasak qanday yozamiz?",
      options: [
        "const [user, setUser] = useState({ User })",
        "const [user, setUser] = useState<User | null>(null)",
        "const [user, setUser] = useState: User",
        "const [user, setUser] = useState as User"
      ],
      correctAnswer: 1,
      explanation: "Hook larning qanday tur qabul qilishini bildirish uchun Generic Types (<...>) ishlatiladi. Dastlabki holatda u null bo'lishi ham ko'rsatilishi kerak."
    }
  ]
};

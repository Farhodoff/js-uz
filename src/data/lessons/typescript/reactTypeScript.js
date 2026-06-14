export const reactTypeScript = {
  id: "reactTypeScript",
  title: "React va TypeScript Integratsiyasi",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Nega React bilan TypeScript?
* **JS bilan React (Dinamik):** Component-ga xato prop yuborsangiz yoki state-dagi o'zgaruvchini noto'g'ri ishlatsangiz, ilova ishlaydi lekin runtime-da (foydalanuvchi ekranda ko'rayotganda) to'satdan buzilib qolishi mumkin. Bu xuddi xaritasiz yoki noto'g'ri chizilgan sxema bo'yicha mebel yig'ishga o'xshaydi.
* **TS bilan React (Statik):** Har bir component qanday props qabul qilishi, state-da nima saqlanishi va eventlar qanday tipda bo'lishi qat'iy tekshiriladi. Noto'g'ri prop yuborsangiz, IDE sizga kod yozish vaqtidanoq xabar beradi. Bu xuddi Lego qismlari kabi: faqat bir-biriga mos keluvchi qismlargina birlashadi.

---

## 2. 💻 Real Kod Misollari

### 1. Component Props tiplash
Props tiplash orqali biz bolalar componentiga ota componentdan qanday ma'lumotlar o'tishini boshqaramiz:
\\\`\\\`\\\`typescript
import React from 'react';

// Props interfeysi
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; // Ixtiyoriy prop
}

// Funktsional component
export function CustomButton({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
\\\`\\\`\\\`

### 2. Hooks va State tiplash
\\\`useState\\\` ko'pincha boshlang'ich qiymatga qarab tipni avtomatik aniqlaydi. Lekin agar qiymat boshida \\\`null\\\` bo'lishi mumkin bo'lsa, dynamic generic tip belgilash zarur:
\\\`\\\`\\\`typescript
import { useState } from 'react';

interface User {
  id: number;
  name: string;
}

function UserProfile() {
  // Boshlang'ich qiymat null, lekin User tipini ham qabul qiladi
  const [user, setUser] = useState<User | null>(null);

  const loginUser = () => {
    setUser({ id: 1, name: "Farhod" });
  };

  return (
    <div>
      {user ? <p>Xush kelibsiz, {user.name}</p> : <p>Tizimga kirmadingiz</p>}
      <button onClick={loginUser}>Kirish</button>
    </div>
  );
}
\\\`\\\`\\\`

### 3. Events va Forms tiplash
Form va eventlarni tiplashda React taqdim etadigan maxsus turlar (Events) ishlatiladi:
\\\`\\\`\\\`typescript
import React, { useState } from 'react';

function SearchForm() {
  const [query, setQuery] = useState("");

  // Input o'zgarishi eventini tiplash
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Form submit qilish eventini tiplash
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Qidirilmoqda:", query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} />
      <button type="submit">Qidirish</button>
    </form>
  );
}
\\\`\\\`\\\`

---

## 3. 🎨 Ma'lumot va Hodisalar Oqimi (Data Flow)

Ota componentdan bola componentga props o'tishi va hodisalarning yuqoriga uzatilishi quyidagi Mermaid diagrammada ko'rsatilgan:

\`\`\`mermaid
graph TD
    Parent[Parent Component] -->|Props: ButtonProps| Child[CustomButton]
    Child -->|Event Handler: React.MouseEvent| Action[Parent State Updates]
    subgraph Component State
        State["user: User | null"]
    end
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`any\` eventlar ishlatish
Junior dasturchilar eventlarning murakkab turlarini yozishdan qochish uchun \\\`e: any\\\` deb yozishadi. Bu xatoliklarga va tiplash xavfsizligining yo'qolishiga olib keladi.
* **Tuzatish:** Inputlar uchun \\\`React.ChangeEvent<HTMLInputElement>\\\`, tugmalar bosilishi uchun \\\`React.MouseEvent<HTMLButtonElement>\\\` tiplaridan foydalaning.

### 2. Ref-larni noto'g'ri tiplash
DOM elementlarini ushlashda \\\`useRef\\\` generic tipi va boshlang'ich \\\`null\\\` qiymati berilishi shart:
* **Noto'g'ri:** \\\`const inputRef = useRef();\\\`
* **Tug'ri:** \\\`const inputRef = useRef<HTMLInputElement>(null);\\\`

---

## 5. 💬 12 ta Intervyu Savollari (Junior/Middle)

### Junior
1. **Savol:** Nima uchun React bilan TypeScript ishlatish tavsiya etiladi?
   * **Javob:** Kompilyatsiya vaqtida xatolarni aniqlash, props autocompletion (avtomatik to'ldirish) va katta kod bazalarini refaktor qilishni osonlashtirish uchun.
2. **Savol:** React-da component props qanday tiplanadi?
   * **Javob:** Interface yoki Type yordamida props shakli aniqlanadi va component parametrlariga biriktiriladi.
3. **Savol:** Ixtiyoriy (optional) prop qanday yoziladi?
   * **Javob:** Prop nomi yoniga so'roq belgisi qo'shiladi, masalan: \\\`disabled?: boolean;\\\`.
4. **Savol:** input elementidan qiymat oluvchi \`onChange\` hodisasining tipi qanday bo'bali?
   * **Javob:** \\\`React.ChangeEvent<HTMLInputElement>\\\` tipi ishlatiladi.

### Middle
5. **Savol:** \`React.FC\` (React.FunctionComponent) ning kamchiligi yoki uni ishlatish kerakmi?
   * **Javob:** \\\`React.FC\\\` ilgari \\\`children\\\` propini avtomatik va yashirincha qabul qilar edi (React 18 da olib tashlandi). Hozirgi kunda toza JS funksiya ko'rinishida yozib, props-ga to'g'ridan-to'g'ri generic tiplash tavsiya etiladi.
6. **Savol:** \`useRef\` bilan ishlaganda DOM elementga qanday to'g'ri tip beriladi?
   * **Javob:** Masalan input element bo'lsa: \\\`useRef<HTMLInputElement>(null)\\\` ko'rinishida generic tip va boshlang'ich qiymat beriladi.
7. **Savol:** \`createContext\` yordamida context yaratilganda TypeScript xatoliklarini oldini olish uchun qanday boshlang'ich qiymat beriladi?
   * **Javob:** Ko'pincha boshlang'ich qiymat \\\`null\\\` bo'ladi, shuning uchun generic orqali tiplanadi: \\\`createContext<UserContextType | null>(null)\\\`. Ishlatishdan oldin esa null emasligi tekshiriladi.
8. **Savol:** TypeScript-da komponentga standart HTML atributlarini (masalan \`button\` atributlari) qanday oson meros qilib o'tkazish mumkin?
   * **Javob:** \\\`React.ButtonHTMLAttributes<HTMLButtonElement>\\\` interfeysini extend qilish orqali barcha standart button propslarni meros qilib olish mumkin.

### Senior
9. **Savol:** Generik komponentlar (Generic Components) nima va ulat qachon ishlatiladi?
   * **Javob:** Har xil turdagi ma'lumotlar bilan ishlay oladigan moslashuvchan komponentlar (masalan, umumiy Select yoki Table komponenti). Ular komponentga uzatiladigan ma'lumotlar tipini dynamic qabul qiladi.
10. **Savol:** \`useReducer\` hook-ini tiplashda qanday qoidalarga amal qilinadi?
    * **Javob:** State tipi va Action-larning Discriminated Union (tip ajratuvchi) turlari yoziladi. Bu reducer ichida noto'g'ri payload yoki action type yuborilishini to'liq cheklaydi.
11. **Savol:** React va TypeScript-da \`children\` propining eng to'g'ri tipi qaysi?
    * **Javob:** \\\`React.ReactNode\\\` eng keng qamrovli tip hisoblanadi (u string, number, null, JSX, array-larni o'z ichiga oladi).
12. **Savol:** Custom Hook-larning qaytaradigan qiymatini (masalan massiv) tiplashda qanday keng tarqalgan muammo bor va u qanday yechiladi?
    * **Javob:** TypeScript uni standart massiv deb hisoblab, har bir elementni union tip qilib yuboradi. Buni oldini olish uchun return qilinadigan massiv oxiriga \\\`as const\\\` (read-only tuple) qo'shimchasi yoziladi.
`,
  exercises: [
    {
      id: 1,
      title: "Props Interface yaratish",
      instruction: "Foydalanuvchi ma'lumotlarini qabul qiluvchi \`CardProps\` nomli interfeys yarating. Unda \`title\` (string) va ixtiyoriy \`description\` (string) maydonlari bo'lsin.",
      startingCode: "// CardProps interfeysini yozing\n",
      hint: "interface CardProps {\n  title: string;\n  description?: string;\n}",
      test: "if (!code.includes('interface CardProps')) return 'CardProps interfeysini e\\'lon qiling';\nif (!code.includes('title')) return 'title maydoni bo\\'lishi shart';\nif (!code.includes('description?')) return 'description maydoni ixtiyoriy bo\\'lishi lozim (description?)';"
    },
    {
      id: 2,
      title: "useState generic tiplash",
      instruction: "Boshlang'ich qiymati \`null\` bo'lgan, lekin keyinchalik \`string\` qiymat qabul qila oladigan \`useState\` hook-ini generic tip parametrlari yordamida tiplang.",
      startingCode: "import { useState } from 'react';\n\nfunction Component() {\n  // State-ni generic yordamida tiplang\n  const [token, setToken] = useState(null);\n}",
      hint: "useState<string | null>(null)",
      test: "if (!code.includes('useState<string | null>')) return 'useState ni useState<string | null>(null) ko\\'rinishida tiplang';"
    },
    {
      id: 3,
      title: "Button Click Event Handlerni tiplash",
      instruction: "Tugma bosilganda (\`onClick\`) ishga tushadigan \`handleClick\` funksiyasining argumentiga tegishli React mouse event tipini qo'shing.",
      startingCode: "import React from 'react';\n\nfunction App() {\n  const handleClick = (e: any) => {\n    console.log('bosildi');\n  };\n  return <button onClick={handleClick}>Tugma</button>;\n}",
      hint: "e: React.MouseEvent<HTMLButtonElement>",
      test: "if (code.includes('e: any')) return 'any tipidan foydalanmang';\nif (!code.includes('MouseEvent')) return 'React.MouseEvent tipidan foydalaning';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React-da children prop-ining eng to'g'ri va eng ko'p ishlatiladigan tipi qaysi?",
      options: [
        "React.ReactElement",
        "React.ReactNode",
        "JSX.Element",
        "string"
      ],
      correctAnswer: 1,
      explanation: "React.ReactNode eng to'g'ri tipdir, chunki u string, number, null, portal, massiv va boshqa barcha render bo'la oladigan turlarni o'z ichiga oladi."
    },
    {
      id: 2,
      question: "Boshlang'ich qiymati null bo'lib, keyin obyekti saqlaydigan state qanday to'g'ri tiplanadi?",
      options: [
        "useState<User | null>(null)",
        "useState(null)",
        "useState<User>(null)",
        "useState<any>(null)"
      ],
      correctAnswer: 0,
      explanation: "useState<User | null>(null) yordamida generic tip taqdim etiladi. Aks holda TS uni faqat null deb qabul qiladi."
    },
    {
      id: 3,
      question: "input elementining onChange hodisasini to'g'ri tiplash qaysi variantda ko'rsatilgan?",
      options: [
        "e: Event",
        "e: React.ChangeEvent<HTMLInputElement>",
        "e: React.FormEvent<HTMLInputElement>",
        "e: any"
      ],
      correctAnswer: 1,
      explanation: "React.ChangeEvent<HTMLInputElement> input o'zgarishlarini to'g'ri tiplash uchun mo'ljallangan maxsus tipdir."
    },
    {
      id: 4,
      question: "Tugmaning onClick hodisasi argumenti qanday tiplanadi?",
      options: [
        "React.MouseEvent<HTMLButtonElement>",
        "React.MouseEvent<HTMLInputElement>",
        "React.UIEvent",
        "React.FormEvent"
      ],
      correctAnswer: 0,
      explanation: "Tugmalarga klik eventini tiplashda React.MouseEvent generic tipiga HTMLButtonElement beriladi."
    },
    {
      id: 5,
      question: "useRef yordamida HTML input elementiga bog'lanish qanday to'g'ri yoziladi?",
      options: [
        "useRef<HTMLInputElement>(null)",
        "useRef<HTMLInputElement>()",
        "useRef(null)",
        "useRef<any>(null)"
      ],
      correctAnswer: 0,
      explanation: "useRef<HTMLInputElement>(null) generic turi va null boshlang'ich qiymati uning DOM elementiga bog'lanishini aniq belgilaydi."
    },
    {
      id: 6,
      question: "createContext yordamida context yaratilganda xatoliklarning oldini olish uchun qanday tiplanadi?",
      options: [
        "createContext<ContextType | null>(null)",
        "createContext(null)",
        "createContext<ContextType>({})",
        "createContext<any>(null)"
      ],
      correctAnswer: 0,
      explanation: "Boshlang'ich qiymat null bo'lishi sababli createContext<ContextType | null>(null) ko'rinishida yozish xavfsiz va to'g'ri yondashuvdir."
    },
    {
      id: 7,
      question: "React.FC generic componentlar uchun children propini qaysi React versiyasidan boshlab avtomatik taqdim etmaydigan bo'ldi?",
      options: [
        "React 16",
        "React 17",
        "React 18",
        "React 19"
      ],
      correctAnswer: 2,
      explanation: "React 18 versiyasidan boshlab React.FC dan children yashirincha qabul qilinishi olib tashlandi. Uni endi props interface-da qo'lda ko'rsatish lozim."
    },
    {
      id: 8,
      question: "Kompilyatorda barcha HTML standart button propslarini (disabled, onClick, type va hk) meros qilib olish uchun interface-da nimadan foydalaniladi?",
      options: [
        "interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>",
        "interface Props extends HTMLButtonElement",
        "interface Props extends React.MouseEvent",
        "interface Props extends any"
      ],
      correctAnswer: 0,
      explanation: "React.ButtonHTMLAttributes<HTMLButtonElement> interfeysini extend qilish barcha standart HTML vaqtinchalik tugma atributlarini o'z ichiga olishning eng qulay usulidir."
    },
    {
      id: 9,
      question: "Custom hook-dan return qilingan massiv tiplarini qat'iy o'zgarmas (Tuple) qilish uchun nima yoziladi?",
      options: [
        "as const",
        "as tuple",
        "as readonly",
        "as any"
      ],
      correctAnswer: 0,
      explanation: "Massiv oxiriga 'as const' yozish uni o'zgarmas tuple-ga aylantiradi va TS uning tiplarini to'g'ri aniqlaydi."
    },
    {
      id: 10,
      question: "Form elementining onSubmit hodisasi qanday tiplanadi?",
      options: [
        "React.FormEvent<HTMLFormElement>",
        "React.ChangeEvent<HTMLFormElement>",
        "React.MouseEvent",
        "React.SubmitEvent"
      ],
      correctAnswer: 0,
      explanation: "Form yuborilishini boshqarishda e: React.FormEvent<HTMLFormElement> hodisa tipi qo'llaniladi."
    },
    {
      id: 11,
      question: "TypeScript-da React komponentining inline style xossasi qanday to'g'ri tiplanadi?",
      options: [
        "React.CSSProperties",
        "React.StyleSheet",
        "string",
        "any"
      ],
      correctAnswer: 0,
      explanation: "Komponentning inline style propsini tiplash uchun React.CSSProperties maxsus tipidan foydalaniladi."
    },
    {
      id: 12,
      question: "useReducer hook-ida state va action-larni to'g'ri boshqarish uchun qaysi turdagi union qo'llaniladi?",
      options: [
        "Discriminated Union",
        "Intersection Types",
        "Optional Types",
        "Literal Types"
      ],
      correctAnswer: 0,
      explanation: "Discriminated Union yordamida har bir action o'zining type maydoni orqali ajratilib tiplanadi, bu esa xatoliklarni oldini oladi."
    }
  ]
};

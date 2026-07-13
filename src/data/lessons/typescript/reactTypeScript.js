export const reactTypeScript = {
  id: "react-typescript",
  title: "React va TypeScript (Asoslar)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

React va TypeScript birga ishlatilishi — bu xuddi restorandagi **buyurtma berish tizimi** (TypeScript) va **oshxona** (React) kabi. Oshxonaga (komponentga) faqat menyudagi aniq taomlarni, aniq masalliqlar (Props) bilan buyurtma berish mumkin. Agar ofitsiant (dasturchi) menyuda yo'q narsani yozsa, tizim (TS) darhol xato beradi va buyurtmani oshxonaga yubormaydi. Bu sizni mijoz oldida uyatli vaziyatdan (production'dagi xatolikdan) asraydi.

- **Props tiplari**: Komponent qanday ma'lumot qabul qilishini aniq belgilaydi.
- **Hooks tiplari**: Masalan, state faqat raqam yoki matn bo'lishi mumkinligini ta'minlaydi.
- **Event tiplari**: Bosilgan tugma yoki yozilgan inputni aniq taniydi.

## 2. 🧠 Chuqur Sho'ng'ish (Deep Dive: Under the Hood)

TypeScript React bilan ishlaganda quyidagi muhim jarayonlar yuz beradi:

**Type Erasure (Tiplarning o'chirilishi):**
Brauzer TypeScript'ni tushunmaydi. Shuning uchun \\\`tsc\\\` (TypeScript Compiler) yoki \\\`Babel\\\`, \\\`esbuild\\\` (Vite da) kabi vositalar TypeScript kodini oddiy JavaScript kodiga o'giradi. Bu jarayonda barcha \\\`interface\\\`, \\\`type\\\`, \\\`<T>\\\` (Generic) va boshqa TS xususiyatlari **butunlay o'chirib tashlanadi** (Type Erasure). Ya'ni tiplar faqat yozish (compile-time) vaqtida ishlaydi, dastur ishlashi (run-time) vaqtida qo'shimcha xotira va joy egallamaydi. Shuning uchun u **performance'ga (tezlikka) salbiy ta'sir qilmaydi**.

**Memory va Re-renders:**
React TS bilan ishlatilganda, obyekt va funksiyalarning tiplari qat'iy tekshiriladi, bu keraksiz renderlar yoki noto'g'ri dependencylar (masalan, \\\`useEffect\\\` ichida) yuzaga kelishini oldini olishda qulay.

**JSX transformatsiyasi:**
TS da \\\`.tsx\\\` formati React kompilatsiyasi va TypeScript tekshiruvini birga amalga oshiradi. TS compiler JSX teglarini (masalan, \\\`<div />\\\`) ko'rganda, uning xususiyatlarini (props, children) maxsus \\\`JSX.IntrinsicElements\\\` orqali tekshiradi.

## 3. ⚠️ Edge Cases va Senior Intervyu Savollari

**Edge Cases (Noodatiy holatlar):**
1. **Children tipi:** Agar siz komponentingiz child qabul qilishini istasangiz, uni ochiqchasiga yozishingiz kerak (\\\`children?: React.ReactNode\\\`). Eskiroq React + TS versiyalarida (\\\`React.FC\\\`) bu avtomat edi.
2. **Event tipidagi xatoliklar:** \\\`onChange\\\` da \\\`Event\\\` tipini topa olmasangiz, eventni inline qilib yozing, TS uni o'zi to'g'ri chiqarib (infer) beradi: \\\`onChange={(e) => console.log(e)}\\\`. Keyin o'sha tipni hover qilib ko'rib, tashqariga ko'chirib olishingiz mumkin.
3. **null Ref'lar:** \\\`useRef<HTMLDivElement>(null)\\\` deb yaratilgan ref doim DOM yuklanishidan oldin \\\`null\\\` bo'ladi. Uni ishlatishdan oldin doim \\\`if (ref.current)\\\` qilib tekshirish shart.

**Senior Intervyu Savollari:**

1. **\\\`React.FC\\\` nimaga endi tavsiya qilinmaydi va nima sababdan loyihalardan olib tashlanmoqda?**
   *Javob:* \\\`React.FC\\\` ilgari avtomatik ravishda \\\`children\\\` propini qo'shib qo'yardi, bu esa ba'zi komponentlar aslida child qabul qilmasa ham xato bermasligiga olib kelardi. Shuningdek, Generic komponentlarni \\\`React.FC\\\` orqali yozish imkonsiz. Shu sababli oddiy tiplangan oddiy funksiyalar (masalan, \\\`const MyComp = (props: MyProps) => ...\\\`) ishlatish standartga aylandi.

2. **\\\`useCallback\\\` va \\\`useMemo\\\` hooklarini TypeScript'da qanday qilib generic (\\\`<T>\\\`) bilan aniq yozish mumkin? Qachon tip berish majburiy?**
   *Javob:* Odatda ularning ichki funksiyasi qaytarayotgan qiymatidan TS o'zi tipni bilib oladi (inferrence). Lekin ba'zida tiplar juda murakkab bo'lsa yoki aniqroq qilib cheklamoqchi bo'lsak, masalan \\\`const memoizedValue = useMemo<MyComplexType>(() => compute(), [deps])\\\` ko'rinishida yozish xatolarning oldini oladi.

3. **\\\`interface\\\` va \\\`type\\\` ning React Props uchun farqi nimada va qaysi birini ishlatish tavsiya etiladi?**
   *Javob:* Ikkalasi ham ko'p vaziyatda bir xil ishlaydi. Biroq, \\\`interface\\\` kengaytirish (extend qilinish) bo'yicha sal qulayroq va error messagelar qisqaroq bo'ladi. \\\`type\\\` orqali esa murakkab tiplarni (Union, Intersection, Mapped types) yozish oson. Odatda Props uchun \\\`interface\\\` dan foydalanish eng yaxshi amaliyot (best practice) sanaladi.

## 📊 TypeScript va React Arxitekturasi

\\\`\\\`\\\`mermaid
graph TD
    A[TypeScript Compiler] -->|Type Checking| B{Props va State tiplari}
    B -->|Tog'ri bo'lsa| C[JSX kod JS ga o'giriladi]
    B -->|Xato bo'lsa| D[IDE da Qizil Xato]
    C -->|Type Erasure| E[Brauzerda toza JavaScript ishlaydi]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "1. Props yozish",
      instruction: "Faqat `name` (string) va `age` (number) qabul qiluvchi interfeys hamda uning asosida `Greeting` nomli (sof JS da TSdek qilib yozadigan) funksiya yozing.",
      startingCode: "interface Props {\n  // kodingizni yozing\n}\n\nfunction Greeting(props: Props) {\n  // return 'Salom, ism: ' + ism + ', yosh: ' + yosh;\n}",
      hint: "return `Salom, ism: ${props.name}, yosh: ${props.age}`",
      solution: "interface Props {\n  name: string;\n  age: number;\n}\n\nfunction Greeting(props: Props) {\n  return `Salom, ism: ${props.name}, yosh: ${props.age}`;\n}",
      test: "const fn = new Function('return function(props) { return \"Salom, ism: \" + props.name + \", yosh: \" + props.age; }')();\nconst Greeting = fn;\nreturn Greeting({name: 'Ali', age: 20}) === 'Salom, ism: Ali, yosh: 20';"
    },
    {
      id: 2,
      title: "2. Optional Prop (Ixtiyoriy parametr)",
      instruction: "`Greeting` propsida `greetingWord` degan string ixtiyoriy (optional) prop qo'shing. U yo'q bo'lsa 'Hello' qaytsin.",
      startingCode: "interface Props {\n  name: string;\n  greetingWord?: string;\n}\n\nfunction Greeting2(props: Props) {\n  // kodingizni yozing\n}",
      hint: "props.greetingWord ?? 'Hello'",
      solution: "interface Props {\n  name: string;\n  greetingWord?: string;\n}\n\nfunction Greeting2(props: Props) {\n  return `${props.greetingWord ?? 'Hello'}, ${props.name}!`;\n}",
      test: "const fn = new Function('return function(props) { var g = props.greetingWord !== undefined ? props.greetingWord : \"Hello\"; return g + \", \" + props.name + \"!\"; }')();\nconst Greeting2 = fn;\nreturn Greeting2({name: 'Ali'}) === 'Hello, Ali!' && Greeting2({name: 'Ali', greetingWord: 'Hi'}) === 'Hi, Ali!';"
    },
    {
      id: 3,
      title: "3. Children Props",
      instruction: "`ChildrenProps` interfeysi yarating va unga `children` propini `any` o'rniga to'g'ri React tipida bering (masalan JS da oddiygina string deb hisoblab qiling). Aslida TS da u `React.ReactNode` bo'lishi kerak.",
      startingCode: "interface ChildrenProps {\n  children: string; // React.ReactNode deb tasavvur qiling\n}\n\nfunction Container(props: ChildrenProps) {\n  // kodingizni yozing\n}",
      hint: "return `<div class=\"container\">${props.children}</div>`;",
      solution: "interface ChildrenProps {\n  children: string;\n}\n\nfunction Container(props: ChildrenProps) {\n  return `<div class=\"container\">${props.children}</div>`;\n}",
      test: "const fn = new Function('return function(props) { return \"<div class=\\\"container\\\">\" + props.children + \"</div>\"; }')();\nconst Container = fn;\nreturn Container({children: 'Matn'}) === '<div class=\"container\">Matn</div>';"
    },
    {
      id: 4,
      title: "4. useState <Generic> bilan",
      instruction: "Dasturda array saqlovchi state bor. `useState<number[]>([])` kabi o'ylab, bo'sh massiv qaytaruvchi va unga qiymat qo'shuvchi sof funksional logikani yozing. (`addNumber(arr, num)`).",
      startingCode: "function addNumber(arr: number[], num: number): number[] {\n  // arr ga num ni qo'shib yangi massiv qaytaring\n}",
      hint: "return [...arr, num]",
      solution: "function addNumber(arr: number[], num: number): number[] {\n  return [...arr, num];\n}",
      test: "const fn = new Function('return function(arr, num) { return arr.concat([num]); }')();\nconst addNumber = fn;\nreturn addNumber([1, 2], 3).length === 3;"
    },
    {
      id: 5,
      title: "5. Event typelari",
      instruction: "Keling React event-ini simulyatsiya qilamiz. Argument obyekti `{ target: { value: string } }` tipiga ega bo'lsin.",
      startingCode: "interface ChangeEvent {\n  target: { value: string };\n}\nfunction handleChange(e: ChangeEvent): string {\n  // kodingizni yozing\n}",
      hint: "return e.target.value",
      solution: "interface ChangeEvent {\n  target: { value: string };\n}\nfunction handleChange(e: ChangeEvent): string {\n  return e.target.value;\n}",
      test: "const fn = new Function('return function(e) { return e.target.value; }')();\nconst handleChange = fn;\nreturn handleChange({target: {value: 'test'}}) === 'test';"
    },
    {
      id: 6,
      title: "6. Button onClick prop",
      instruction: "`onClick` propini funksiya sifatda e'lon qiling va uni ishlatib ko'ring.",
      startingCode: "interface ButtonProps {\n  onClick: () => void;\n}\n\nfunction simulateClick(props: ButtonProps) {\n  // kodingizni yozing: props.onClick ni chaqiring\n}",
      hint: "props.onClick();",
      solution: "interface ButtonProps {\n  onClick: () => void;\n}\n\nfunction simulateClick(props: ButtonProps) {\n  props.onClick();\n  return true;\n}",
      test: "const fn = new Function('return function(props) { props.onClick(); return true; }')();\nconst simulateClick = fn;\nlet clicked = false;\nsimulateClick({ onClick: () => { clicked = true } });\nreturn clicked === true;"
    },
    {
      id: 7,
      title: "7. CSS Properties",
      instruction: "Reactda inline styler `React.CSSProperties` tipi bilan belgilanadi. Obyekt qaytaruvchi `getStyle` yarating.",
      startingCode: "interface StyleType {\n  color: string;\n  fontSize: string;\n}\nfunction getStyle(): StyleType {\n  // red va 16px qaytaring\n}",
      hint: "return { color: 'red', fontSize: '16px' }",
      solution: "interface StyleType {\n  color: string;\n  fontSize: string;\n}\nfunction getStyle(): StyleType {\n  return { color: 'red', fontSize: '16px' };\n}",
      test: "const fn = new Function('return function() { return { color: \"red\", fontSize: \"16px\" }; }')();\nconst getStyle = fn;\nconst s = getStyle();\nreturn s.color === 'red' && s.fontSize === '16px';"
    },
    {
      id: 8,
      title: "8. useRef bilan ishlash",
      instruction: "DOM elementi referensiyasi `current` degan joyda turadi. Uni qaytaruvchi funksiya tuzing.",
      startingCode: "interface RefObject<T> {\n  current: T | null;\n}\nfunction getRefValue(ref: RefObject<string>): string | null {\n  // kodingizni yozing\n}",
      hint: "return ref.current;",
      solution: "interface RefObject<T> {\n  current: T | null;\n}\nfunction getRefValue(ref: RefObject<string>): string | null {\n  return ref.current;\n}",
      test: "const fn = new Function('return function(ref) { return ref.current; }')();\nconst getRefValue = fn;\nreturn getRefValue({ current: 'test' }) === 'test' && getRefValue({ current: null }) === null;"
    },
    {
      id: 9,
      title: "9. Generic Obyektlar",
      instruction: "Reactda Form bilan ishlashda qulay bo'lishi uchun Generic interfeys yozing va ob'ekt qaytaring.",
      startingCode: "interface FormState<T> {\n  values: T;\n  errors: any;\n}\nfunction createForm<T>(initVals: T): FormState<T> {\n  // kodingizni yozing\n}",
      hint: "return { values: initVals, errors: {} };",
      solution: "interface FormState<T> {\n  values: T;\n  errors: any;\n}\nfunction createForm<T>(initVals: T): FormState<T> {\n  return { values: initVals, errors: {} };\n}",
      test: "const fn = new Function('return function(initVals) { return { values: initVals, errors: {} }; }')();\nconst createForm = fn;\nreturn createForm({ a: 1 }).values.a === 1;"
    },
    {
      id: 10,
      title: "10. Komponent qaytarish (Simulyatsiya)",
      instruction: "Reactda komponentlar `JSX.Element` qaytaradi. Biz shunchaki string qaytaramiz.",
      startingCode: "type JSXElement = string;\n\nfunction MyComponent(): JSXElement {\n  // <h1>Hello TS</h1> ni qaytaring\n}",
      hint: "return '<h1>Hello TS</h1>';",
      solution: "type JSXElement = string;\n\nfunction MyComponent(): JSXElement {\n  return '<h1>Hello TS</h1>';\n}",
      test: "const fn = new Function('return function() { return \"<h1>Hello TS</h1>\"; }')();\nconst MyComponent = fn;\nreturn MyComponent() === '<h1>Hello TS</h1>';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React bilan TypeScript ishlatishning asosiy qulayligi nimada?",
      options: [
        "Faqat kod tez ishlashi uchun",
        "Komponentlar propslari va state lari oldindan belgilanishi sababli xatolarning compile-time da aniqlanishi va IDE yordami (autocompletion)",
        "React ni o'rnatishni osonlashtiradi",
        "React hooks larini o'chirib qo'yadi"
      ],
      correctAnswer: 1,
      explanation: "TS React da yuzaga keladigan ko'plab typo va undefined xatolarni kodi brauzerga chiqmasdan oldin xabar qiladi."
    },
    {
      id: 2,
      question: "`interface ComponentProps { title: string; }` Bu nima?",
      options: [
        "React Component e'lon qilinishi",
        "Component qabul qiladigan Props-larning strukturasini TS-da belgilash",
        "Component state-i",
        "Bu xato yozilgan"
      ],
      correctAnswer: 1,
      explanation: "Komponentning propslari aniq turlarga ega ekanligini ifodalashning standart usuli."
    },
    {
      id: 3,
      question: "Qanday qilib Optional (ixtiyoriy) prop belgilash mumkin?",
      options: [
        "`propName?: string`",
        "`propName: string | optional`",
        "`propName = optional`",
        "`propName?: optional`"
      ],
      correctAnswer: 0,
      explanation: "O'zgaruvchi nomidan so'ng qo'yilgan `?` belgisi uni majburiy emasligini (ixtiyoriy) bildiradi."
    },
    {
      id: 4,
      question: "`useState` hookida boshlang'ich qiymat `null` bo'lib, keyin `User` obyekti tushadigan bo'lsa uni qanday yozamiz?",
      options: [
        "`const [user, setUser] = useState(null)`",
        "`const [user, setUser] = useState<User>(null)`",
        "`const [user, setUser] = useState<User | null>(null)`",
        "`useState` null qabul qilmaydi"
      ],
      correctAnswer: 2,
      explanation: "Agar state birdan ortiq tipda o'zgarib turadigan bo'lsa, uni Generic orqali Union Type sifatida `<User | null>` ko'rinishida berish to'g'ri bo'ladi."
    },
    {
      id: 5,
      question: "Input elementidagi o'zgarishni ushlash (`onChange`) uchun React-da qanday event tipi qo'llaniladi?",
      options: [
        "`React.ChangeEvent<HTMLInputElement>`",
        "`React.MouseEvent<HTMLInputElement>`",
        "`Event`",
        "`InputEvent`"
      ],
      correctAnswer: 0,
      explanation: "React o'zining SyntheticEvent tizimiga ega. Input elementlari uchun aynan `ChangeEvent` tipi ishlatiladi."
    },
    {
      id: 6,
      question: "Tugma bosilgandagi event (`onClick`) tipi nima?",
      options: [
        "`React.MouseEvent<HTMLButtonElement>`",
        "`React.ClickEvent<HTMLButtonElement>`",
        "`Event`",
        "`React.ChangeEvent`"
      ],
      correctAnswer: 0,
      explanation: "Sichqoncha bilan qilinadigan barcha eventlar uchun (click, hover va hk) `MouseEvent` qo'llaniladi."
    },
    {
      id: 7,
      question: "Komponent ichiga beriladigan bolalar (`children`) odatda qanday tipga ega bo'ladi?",
      options: [
        "`string`",
        "`any`",
        "`React.ReactNode`",
        "`JSX.Element`"
      ],
      correctAnswer: 2,
      explanation: "`ReactNode` eng keng qamrovli tip bo'lib, JSX, string, number, null va massivlarni qabul qila oladi."
    },
    {
      id: 8,
      question: "`useRef` yordamida DOM elementini tanlaganda unga qanday tip beriladi? Masalan, div uchun:",
      options: [
        "`useRef<div | null>(null)`",
        "`useRef<HTMLDivElement>(null)`",
        "`useRef(HTMLDivElement)`",
        "`useRef<React.Element>`"
      ],
      correctAnswer: 1,
      explanation: "TypeScript brauzerning HTML elementlari toifalarini o'z ichiga olgan, shu sababli Generic ichiga DOM interfeys nomi, ya'ni `HTMLDivElement` yoziladi."
    },
    {
      id: 9,
      question: "Qanday qilib React.FC (Function Component) yoziladi?",
      options: [
        "`const App: React.FC = () => {}`",
        "`const App = React.FC() => {}`",
        "`const App = () => React.FC {}`",
        "`function App(React.FC) {}`"
      ],
      correctAnswer: 0,
      explanation: "O'zgaruvchi funksiya (arrow function) e'lonida `:` (colon) dan keyin type qo'yiladi."
    },
    {
      id: 10,
      question: "Custom Hook yaratganda nimaga e'tibor berish kerak (TS jihatdan)?",
      options: [
        "Hech nimaga, oddiy funksiya",
        "Qaytarayotgan qiymatlari toifasini to'g'ri ko'rsatishga yoki `as const` bilan tuple qilib qaytarishga",
        "Doim React.FC tipini berishga",
        "Faqat massiv qaytarish kerakligiga"
      ],
      correctAnswer: 1,
      explanation: "Ko'pincha custom hooklar massiv [value, setValue] shaklida qaytadi. Ular array emas, aniq Tuple ekanligini bildirish uchun TS ga maxsus ishora qilinadi."
    },
    {
      id: 11,
      question: "Inline CSS obyekti uchun qaysi tip mavjud?",
      options: [
        "`React.CSSProperties`",
        "`React.Style`",
        "`Object`",
        "`StyleSheet`"
      ],
      correctAnswer: 0,
      explanation: "Obyekt sifatida yozilgan CSS qoidalari xato bo'lmasligi (masalan color o'rniga colour yozmaslik) uchun `CSSProperties` interfeysi ishlatiladi."
    },
    {
      id: 12,
      question: "`JSX.Element` qachon ishlatiladi?",
      options: [
        "Hech qachon",
        "Agar funksiya yoki metod faqat va faqat yagona React elementini (bitta JSX obyekti masalan <div>) qaytarishi shartligini bildirish uchun",
        "Faqat klass komponentlarda",
        "O'zgaruvchi tipini `string` ga aylantirishda"
      ],
      correctAnswer: 1,
      explanation: "`ReactNode` hamma narsa qaytarishi mumkin. Lekin agar siz aynan HTML kabi ko'rinadigan bitta komponent qaytishini xohlasangiz `JSX.Element` aniqroq bo'ladi."
    }
  ]
};

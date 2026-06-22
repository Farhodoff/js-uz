export const serverState = {
  id: "serverState",
  title: "Server State: TanStack Query (React Query)",
  content: `
# Server State va TanStack Query (React Query)

Hozirgi kungacha biz Local State (\`useState\`) va Global State (\`Context\`, \`Zustand\`) haqida gaplashdik. Ammo amaliyotda biz asosan Backend dan keladigan ma'lumotlar bilan ishlaymiz. Bu ma'lumotlar kompyuterimizda emas, balki uzoqdagi serverda yashaydi. Ularni **Server State** deyiladi.

## 1. Nega bizga maxsus vosita kerak?

Odatda biz serverdan ma'lumot olish uchun \`useEffect\` va \`useState\` kombinatsiyasidan foydalanamiz (buni ob-havo ilovasida ko'rganmiz):

\`\`\`jsx
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(e => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{JSON.stringify(data)}</div>;
}
\`\`\`

**Lekin bu yondashuvning katta muammolari bor:**
1. **Keshlash (Caching) yo'q:** Agar foydalanuvchi boshqa sahifaga o'tib, yana shu sahifaga qaytsa, ma'lumotlar yana qaytadan yuklanadi.
2. **Boilerplate ko'p:** Har bir so'rov uchun 3 xil state (\`data\`, \`isLoading\`, \`error\`) ochish zerikarli.
3. **Eskirgan ma'lumot:** Serverdagi ma'lumot o'zgarsa, brauzerdagi ilovamiz buni bilmaydi.
4. **"Race conditions" (Poyga holatlari):** Tezkor ketma-ket so'rovlar yuborilganda xatolar kelib chiqishi.

Aynan shu muammolarni hal qilish uchun **TanStack Query (React Query)** yaratilgan!

---

## 2. TanStack Query (React Query) Nima?

TanStack Query — bu React ilovalarida asinxron ma'lumotlarni qabul qilish (fetch), keshlash (cache), sinxronlash va yangilashni o'z ustiga oluvchi qudratli kutubxona. U asosan ikki qismdan iborat:

- **Queries (So'rovlar):** Ma'lumotni serverdan O'QISH uchun.
- **Mutations (Mutatsiyalar):** Serverdagi ma'lumotni YARATISH, O'ZGARTIRISH yoki O'CHIRISH uchun.

### A) Queries (\`useQuery\`)

\`useQuery\` bizga xuddi \`useEffect\`+3 ta \`useState\` qilgan ishini bir qatorda bajarib beradi, hamda ma'lumotni avtomatik keshlaydi!

\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

// Oddiy fetch funksiyasi
const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
};

function UsersList() {
  // Sehr shu yerda!
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'], // Keshni aniqlash uchun unikal kalit (ID)
    queryFn: fetchUsers, // Ma'lumotni olib keluvchi funksiya
  });

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xato: {error.message}</p>;

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
\`\`\`

> **Nima sodir bo'ldi?** Endi siz boshqa sahifaga o'tib qaytsangiz, ma'lumot keshdan *darhol* ko'rsatiladi va orqa fonda sekingina yangilanadi. Foydalanuvchi kutib o'tirmaydi!

### B) Mutations (\`useMutation\`)

Ma'lumot yuborish (POST) kabi harakatlar uchun biz \`useMutation\` ishlatamiz.

\`\`\`jsx
import { useMutation } from '@tanstack/react-query';

function AddUser() {
  const mutation = useMutation({
    mutationFn: (newUser) => {
      return fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      });
    },
    onSuccess: () => {
      // Muvaffaqiyatli saqlanganda keshni tozalab, ro'yxatni yangilab yuborish mumkin
      console.log('Foydalanuvchi qo\\'shildi!');
    }
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'Farhod' })}>
      Foydalanuvchi Qo'shish
    </button>
  );
}
\`\`\`

---

## 3. Nega TanStack Query o'rganish shart?
Zustand yoki Redux asosan **Local/Global Client State** ni boshqarishda ishlatsa, **Server State** uchun deyarli butun dunyo TanStack Query'ga o'tib bo'ldi. 
Ular birgalikda ajoyib ishlaydi:
- UI holatlari uchun (ochilgan menular, formadagi yozuvlar): **Zustand**
- API ma'lumotlari uchun (Ro'yxatlar, Profil ma'lumoti): **TanStack Query**
  `,
  code: `import React from 'react';
// Kutubxona qismlarini import qilamiz
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// 1. QueryClient obyektini yaratamiz
const queryClient = new QueryClient();

// 2. Fetch funksiyasi
const fetchTodos = async () => {
  // Sun'iy kechikish (Yuklanishni ko'rish uchun)
  await new Promise(r => setTimeout(r, 1000));
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!res.ok) throw new Error("Tarmoqda xato");
  return res.json();
};

// 3. Ma'lumotlarni ko'rsatuvchi komponent
function TodoList() {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['todos'], // Kesh kaliti
    queryFn: fetchTodos, // Fetch funksiyasi
  });

  if (isLoading) return <div>⏳ Ma'lumotlar yuklanmoqda... (Kutib turing)</div>;
  if (isError) return <div style={{ color: 'red' }}>❌ Xatolik: {error.message}</div>;

  return (
    <div>
      <h3>Vazifalar ro'yxati {isFetching && <small style={{color: 'blue'}}>(Orqa fonda yangilanmoqda...)</small>}</h3>
      <ul>
        {data.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 4. Asosiy App (Provider bilan o'ralgan)
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>TanStack Query Namuna</h2>
        <TodoList />
        <br/>
        <p>Eslatma: Bu komponent qayta render bo'lganda ma'lumot darhol keshdan olinadi!</p>
      </div>
    </QueryClientProvider>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "QueryClientProvider o'rnatish",
      description: "App komponentini \`QueryClientProvider\` bilan o'rang va unga \`queryClient\` ob'ektini bering.",
      startingCode: `import React from 'react';\nimport { QueryClient, QueryClientProvider } from '@tanstack/react-query';\n\nconst queryClient = new QueryClient();\n\nexport default function App() {\n  return (\n    <div>\n      {/* VAZIFA: Shu yerga QueryClientProvider qo'shing va client={queryClient} ni bering */}\n      <h1>Mening Ilovam</h1>\n    </div>\n  );\n}`,
      solution: `import React from 'react';\nimport { QueryClient, QueryClientProvider } from '@tanstack/react-query';\n\nconst queryClient = new QueryClient();\n\nexport default function App() {\n  return (\n    <QueryClientProvider client={queryClient}>\n      <div>\n        <h1>Mening Ilovam</h1>\n      </div>\n    </QueryClientProvider>\n  );\n}`,
      hint: "\`<QueryClientProvider client={queryClient}>\` qismini oching va yoping."
    },
    {
      id: 2,
      title: "useQuery orqali ma'lumot olish",
      description: "Quyidagi komponentda \`useQuery\` ni to'g'ri chaqiring. Kesh kalitini \`['posts']\` va fetch funksiyasini \`fetchPosts\` qilib belgilang.",
      startingCode: `import React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nconst fetchPosts = async () => {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts');\n  return res.json();\n};\n\nexport default function Posts() {\n  // VAZIFA: useQuery ni ishlating\n  const { data, isLoading } = /* kodingizni yozing */;\n\n  if (isLoading) return <p>Kuting...</p>;\n  return <div>Postlar soni: {data?.length}</div>;\n}`,
      solution: `import React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nconst fetchPosts = async () => {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts');\n  return res.json();\n};\n\nexport default function Posts() {\n  const { data, isLoading } = useQuery({\n    queryKey: ['posts'],\n    queryFn: fetchPosts\n  });\n\n  if (isLoading) return <p>Kuting...</p>;\n  return <div>Postlar soni: {data?.length}</div>;\n}`,
      hint: "\`useQuery({ queryKey: ['posts'], queryFn: fetchPosts })\`"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Server State (Server holati) bilan Client State (Mijoz holati) o'rtasidagi asosiy farq nima?",
      options: [
        "Ular mutlaqo bir xil",
        "Server State API lardan keladi (boshqaruv backend'da), Client State esa bevosita UI da hosil bo'ladi (ochilgan menyular)",
        "Server State faqat string qabul qiladi, Client State obyekt qabul qiladi",
        "React faqat Client State bilan ishlay oladi"
      ],
      correctAnswer: 1,
      explanation: "Server ma'lumotlari asinxron, o'zgarishi kutib olinadigan va keshlashga muhtoj narsalardir. UI holatlari (Zustand/useState) esa to'g'ridan-to'g'ri asinxronsiz ishlaydi."
    },
    {
      id: 2,
      question: "useQuery dagi 'queryKey' qanday vazifani bajaradi?",
      options: [
        "Serverdagi parolni tekshiradi",
        "React komponentiga key (kalit) beradi",
        "Keshlangan ma'lumotni ajratib olish va topish uchun o'ziga xos identifikator (ID) vazifasini o'taydi",
        "Xatolarni qayd qiladi"
      ],
      correctAnswer: 2,
      explanation: "React Query 'queryKey' orqali qaysi ma'lumot keshga tushgani va qaysi keshdan ma'lumotni qaytarish kerakligini bilib oladi."
    },
    {
      id: 3,
      question: "API dagi ma'lumotni o'zgartirish (POST, PUT, DELETE) uchun TanStack Query da qaysi hook ishlatiladi?",
      options: [
        "useQuery",
        "useFetch",
        "useMutation",
        "useUpdate"
      ],
      correctAnswer: 2,
      explanation: "useQuery faqat ma'lumotlarni olish (GET) uchun, useMutation esa serverdagi ma'lumotni o'zgartirish (side-effects) uchun mo'ljallangan."
    },
    {
      id: 4,
      question: "Nima uchun useEffect va fetch o'rniga TanStack Query ishlatish tavsiya qilinadi?",
      options: [
        "Chunki fetch eski metod hisoblanadi",
        "Chunki u avtomatik tarzda keshlash, qayta so'rovlar yuborish (retries) va yozishni osonlashtiruvchi juda ko'p narsalarni taqdim etadi",
        "Faqat TypeScript uchun ishlagani uchun",
        "U Internet bo'lmaganda ham ishlashi uchun"
      ],
      correctAnswer: 1,
      explanation: "React Query boilerplate (bir xil qolipli kodlar) ni qisqartiradi, keshlash mexanizmini beradi va UX (foydalanuvchi tajribasi) ni keskin oshiradi."
    }
  ]
};

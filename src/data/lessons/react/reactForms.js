export const reactForms = {
  id: "reactForms",
  title: "Forms: React Hook Form va Zod",
  content: `
# Formalar: React Hook Form va Zod

Har qanday veb-ilovaning asosiy qismi bu — Formalar (Ro'yxatdan o'tish, Login, Izoh yozish). React'da formalar bilan ishlashning o'ziga xos qiyinchiliklari bor. Ushbu darsda biz eng zamonaviy va kuchli yondashuvni o'rganamiz.

## 1. Nega odatiy (Controlled) formalar noqulay?

React'da odatda formalarni \`useState\` orqali "Boshqariladigan" (Controlled) qilib yozamiz:

\`\`\`jsx
function NormalForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validatsiya qismi (juda ko'p kod yozish kerak!)
    if (!email.includes('@')) setErrors({ email: "Noto'g'ri email" });
    if (password.length < 6) setErrors({ password: "Parol qisqa" });
    // ...
  };

  // Har safar bitta harf yozilganda, butun komponent RE-RENDER bo'ladi!
  return <input value={email} onChange={e => setEmail(e.target.value)} />;
}
\`\`\`

**Muammolar:**
1. Har bir klaviatura bosilganda butun komponent qayta chiziladi (Re-render). Katta formalarda bu qotishga olib keladi.
2. Validatsiya (xatolarni tekshirish) mantiqlarini qo'lda yozish juda azob.

## 2. Yechim: React Hook Form

**React Hook Form (RHF)** — bu formalarni oson boshqarish uchun yaratilgan kutubxona (\`npm install react-hook-form\`).
Uning asosiy yutug'i: U "Uncontrolled" (Boshqarilmaydigan) usulda ishlaydi. Ya'ni, siz inputga nimadir yozganingizda **sahifa umuman re-render bo'lmaydi!** U faqatgina formani jo'natayotganda (Submit) barcha qiymatlarni bittada o'qib oladi.

\`\`\`jsx
import { useForm } from "react-hook-form";

function FastForm() {
  // RHF hook'ini chaqiramiz
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Jo'natildi:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 
        Endi onChange va value shart emas! 
        "register" funksiyasi inputni RHF ga ulab qo'yadi. 
      */}
      <input 
        {...register("firstName", { required: true })} 
        placeholder="Ismingiz" 
      />
      {errors.firstName && <p>Ism kiritish shart!</p>}

      <button type="submit">Jo'natish</button>
    </form>
  );
}
\`\`\`

## 3. Zod bilan tanishuv (Schema Validation)

Yuqorida biz \`{ required: true }\` kabi oddiy validatsiyani ko'rdik. Lekin haqiqiy loyihalarda bizga ancha murakkab qoidalar kerak bo'ladi (Masalan: parol kamida 8 harf, 1 ta son, 1 ta katta harf qatnashsin va hokazo).

Bunday murakkab qoidalarni chiroyli yozish uchun **Zod** (\`npm install zod\`) ishlatiladi. Zod — bu o'zgaruvchilar qanday ko'rinishda (schema) bo'lishi kerakligini tasvirlovchi qattiq qoidalar kutubxonasi.

\`\`\`javascript
import { z } from 'zod';

// Formamiz uchun qat'iy qolip (schema) yaratamiz
const userSchema = z.object({
  email: z.string().email("Email noto'g'ri kiritildi"),
  age: z.number().min(18, "Yoshingiz 18 dan katta bo'lishi shart"),
  password: z.string().min(6, "Parol kamida 6ta belgidan iborat bo'lsin")
});
\`\`\`

## 4. RHF va Zod ni birlashtirish (Mukammal Forma)

Zod qoidalarini RHF ga tushuntirish uchun bizga "tarjimon" kerak. Bu \`@hookform/resolvers\` kutubxonasidir. Keling barchasini birlashtiramiz:

\`\`\`bash
npm install react-hook-form zod @hookform/resolvers
\`\`\`

\`\`\`jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Zod qolipini yasaymiz
const loginSchema = z.object({
  email: z.string().email("Yaroqli email kiriting"),
  password: z.string().min(8, "Parol kamida 8 ta belgi bo'lishi kerak")
});

function LoginForm() {
  // 2. RHF ga resolver orqali Zod ni ulaymiz
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data) => alert("Muvaffaqiyatli: " + data.email);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("email")} placeholder="Email" />
        {/* Zod dan kelgan aniq xato xabarini chiqaramiz */}
        {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
      </div>

      <div>
        <input {...register("password")} type="password" placeholder="Parol" />
        {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
      </div>

      <button type="submit">Kirish</button>
    </form>
  );
}
\`\`\`

### Nega bu zamonaviy standart?
1. **Tezlik:** Har bir harf yozilganda komponent re-render bo'lmaydi.
2. **Toza kod:** \`useState\` va yuzlab qator tekshiruv if/else kodlari o'rnini yagona Zod qolipi egallaydi.
3. **Xavfsizlik:** Zod kiritilgan ma'lumotlarni qat'iy tekshiradi (TypeScript uchun ham juda mos tushadi).
  `,
  code: `import React from "react";
// Agar loyihada ushbu kutubxonalar o'rnatilgan bo'lsa ishlaydi
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Zod yordamida ro'yxatdan o'tish qolipini (Schema) yaratamiz
const registerSchema = z.object({
  username: z.string()
    .min(3, "Ism kamida 3 ta harfdan iborat bo'lishi kerak")
    .max(15, "Ism juda uzun"),
  email: z.string()
    .email("Iltimos, to'g'ri email formatini kiriting"),
  age: z.coerce.number() // Inputdan doim String keladi, Zod uni Raqamga aylantiradi
    .min(18, "Foydalanuvchi kamida 18 yoshda bo'lishi shart")
    .max(100, "Yosh xato kiritildi"),
});

export default function RegisterForm() {
  // 2. RHF orqali formani boshqaramiz
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitting },
    reset // Formani tozalash uchun
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange" // Har safar harf yozilganda validatsiya ishlasin (lekin re-render bo'lmaydi!)
  });

  // 3. Jo'natish funksiyasi
  const onSubmit = async (data) => {
    console.log("Xatosiz tayyor ma'lumot:", data);
    // Simulyatsiya: Serverga yuborish
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(\`Xush kelibsiz, \${data.username}!\`);
    reset(); // Formani tozalaymiz
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
      <h2>Ro'yxatdan O'tish</h2>
      <p>React Hook Form + Zod Namunasiga</p>

      {/* handleSubmit RHF ga tegishli, ichiga bizning onSubmit funksiyamizni oladi */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <div>
          <label>Foydalanuvchi nomi:</label><br/>
          {/* register orqali inputni RHF ga ulaymiz */}
          <input 
            {...register("username")} 
            placeholder="masalan: alisher99" 
            style={{ width: "100%", padding: "8px", border: errors.username ? "2px solid red" : "1px solid #ccc" }}
          />
          {errors.username && <span style={{ color: "red", fontSize: "14px" }}>{errors.username.message}</span>}
        </div>

        <div>
          <label>Elektron pochta:</label><br/>
          <input 
            {...register("email")} 
            placeholder="email@misol.uz" 
            style={{ width: "100%", padding: "8px", border: errors.email ? "2px solid red" : "1px solid #ccc" }}
          />
          {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email.message}</span>}
        </div>

        <div>
          <label>Yosh:</label><br/>
          <input 
            type="number"
            {...register("age")} 
            placeholder="18" 
            style={{ width: "100%", padding: "8px", border: errors.age ? "2px solid red" : "1px solid #ccc" }}
          />
          {errors.age && <span style={{ color: "red", fontSize: "14px" }}>{errors.age.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={!isValid || isSubmitting}
          style={{ padding: "10px", background: isValid ? "blue" : "gray", color: "white", border: "none", cursor: isValid ? "pointer" : "not-allowed" }}
        >
          {isSubmitting ? "Jo'natilmoqda..." : "Tasdiqlash"}
        </button>

      </form>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Inputni React Hook Form ga ulash",
      description: "Quyidagi inputni RHF dagi \`register\` funksiyasi orqali boshqaruvga oling va unga 'city' degan nom bering.",
      startingCode: `import React from 'react';\nimport { useForm } from 'react-hook-form';\n\nexport default function CityForm() {\n  const { register } = useForm();\n\n  return (\n    <form>\n      {/* VAZIFA: register yordamida 'city' deb ulab oling */}\n      <input placeholder="Shahringizni kiriting" />\n    </form>\n  );\n}`,
      solution: `import React from 'react';\nimport { useForm } from 'react-hook-form';\n\nexport default function CityForm() {\n  const { register } = useForm();\n\n  return (\n    <form>\n      <input {...register('city')} placeholder="Shahringizni kiriting" />\n    </form>\n  );\n}`,
      hint: "\`<input {...register('city')} />\` deb spread (...) operatori yordamida chaqiriladi."
    },
    {
      id: 2,
      title: "Zod da oddiy schema yaratish",
      description: "Bizga shunday Zod qolipi kerakki, u \`price\` nomli raqamni (number) talab qilsin va bu raqam kamida 10 bo'lishi shart.",
      startingCode: `import { z } from 'zod';\n\n// VAZIFA: itemSchema ni to'g'ri yozing\nconst itemSchema = z.object({\n  price: z.any() // O'zgartiring!\n});`,
      solution: `import { z } from 'zod';\n\nconst itemSchema = z.object({\n  price: z.number().min(10, "Narx kamida 10 bo'lishi kerak")\n});`,
      hint: "\`z.number().min(10, 'xato xabari')\` dan foydalaning."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nima sababdan odatiy useState ga qurilgan (Controlled) formalar noqulay hisoblanadi?",
      options: [
        "Ular xavfsiz emas",
        "React ularni taqiqlagan",
        "Har bir kiritilgan harfda butun forma qayta render bo'ladi (performance muammosi) hamda validatsiya kodlari juda uzun va xunuklashib ketadi",
        "Faqat matn qabul qila olgani uchun"
      ],
      correctAnswer: 2,
      explanation: "Formada 10 ta input bo'lsa, bittasiga yozganingizda qolganlari ham qayta chizilaverishi Controlled komponentlarning eng katta yutqazishidir."
    },
    {
      id: 2,
      question: "React Hook Form dagi 'register' funksiyasining vazifasi nima?",
      options: [
        "Foydalanuvchini ro'yxatdan o'tkazadi",
        "Oddiy HTML input ni RHF ning ichki holati bilan (uncontrolled usulda) bog'lab (ulab) beradi",
        "Input qiymatini localStorage ga saqlaydi",
        "Xatolarni ekranga chiqaradi"
      ],
      correctAnswer: 1,
      explanation: "Spread operatori orqali {...register('name')} deb berganimizda, u orqa fonda ref, onChange, onBlur kabi zarur hodisalarni inputga biriktirib qo'yadi."
    },
    {
      id: 3,
      question: "Zod kutubxonasi nima uchun xizmat qiladi?",
      options: [
        "API lardan tezroq javob olish uchun",
        "Formalarni dizayn qilish uchun (CSS kutubxona)",
        "O'zgaruvchilar va ma'lumotlar strukturasini (schema) qat'iy ta'riflash hamda ularni tekshirish (validation) uchun",
        "React o'rniga ishlatiladigan framework"
      ],
      correctAnswer: 2,
      explanation: "Zod orqali biz 'Bu ma'lumot albatta String bo'lishi kerak, ichida @ belgisi bo'lishi kerak va uzunligi kamida 5 ta harf bo'lishi shart' degan qoidalarni chiroyli zanjir usulida yozamiz."
    },
    {
      id: 4,
      question: "Zod schemasini qanday qilib React Hook Form ga 'tushuntiramiz' (ulab qo'yamiz)?",
      options: [
        "HookForm Zod ni avtomatik o'zi taniydi",
        "useForm({ resolver: zodResolver(schema) }) ko'rinishida maxsus tarjimon (resolver) orqali ulab qo'yamiz",
        "Schema ni to'g'ridan to'g'ri <form schema={schema}> deb HTML ga beramiz",
        "Input ichiga {...register('name', schema)} deb beramiz"
      ],
      correctAnswer: 1,
      explanation: "RHF universal kutubxona bo'lgani uchun Yup, Joi kabi boshqa validatorlar bilan ham ishlay oladi. Ularni ajratish uchun bizga maxsus resolver lar (@hookform/resolvers/zod) kerak bo'ladi."
    }
  ]
};

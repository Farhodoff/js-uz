export const reactForms = {
  title: "Forms: React Hook Form va Zod",
  content: `
# Forms: React Hook Form va Zod

React'da formalarni boshqarish odatda juda ko'p state (\`useState\`) yozishni talab qiladi va har bir harf yozilganda butun komponentni qayta render qiladi. Bu katta formalarda (masalan, 10-20 ta maydoni bor anketalar) ilovani judayam sekinlashtirib yuborishi mumkin.

### 1. React Hook Form
* Bu kutubxona **"Uncontrolled Components"** (nazoratsiz komponentlar) ga tayanadi. Ya'ni, formadagi o'zgarishlar React state'ida saqlanmaydi, balki to'g'ridan-to'g'ri DOM'da ushlab turiladi. Bu re-renderlarni keskin kamaytiradi va yozish tezligini mukammal darajaga olib chiqadi.

### 2. Zod (Schema Validation)
* Formalardagi xatoliklarni (masalan, parol kamida 8 harf bo'lishi kerak, email to'g'ri bo'lishi kerak) tekshirish uchun Zod ishlatiladi. Zod yordamida kiritilayotgan ma'lumotlarning qat'iy "sxemasi" yoziladi va u React Hook Form bilan ajoyib tarzda integratsiya qilinadi.
\`,
  code: \`import React from "react";
// Odatda quyidagicha import qilinadi:
// import { useForm } from "react-hook-form";

export default function App() {
  /*
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  */

  return (
    <div>
      <h1>React Hook Form Namuna</h1>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input placeholder="Ism" /* {...register("firstName")} */ />
        <input placeholder="Email" type="email" /* {...register("email")} */ />
        <button type="submit">Yuborish</button>
      </form>
      <p style={{marginTop: 10, fontSize: "0.9em", color: "gray"}}>
        Haqiqiy loyihada biz useState o'rniga "register" funksiyasidan foydalanamiz, shunda re-render sodir bo'lmaydi.
      </p>
    </div>
  );
}\`,
  exercises: [],
  quizzes: []
};

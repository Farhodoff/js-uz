export const localState = {
  title: "Local State va State Management Asoslari",
  content: `
# State Management (Holat boshqaruvi) Asoslari

React'da **State Management** — bu ma'lumotlar oqimini va ularning komponentlar o'rtasida qanday taqsimlanishini boshqarish san'atidir. Murakkab ilovalarda "Prop Drilling" (ma'lumotni tepadan pastga qarab ko'plab komponentlar orqali o'tkazish) muammosiga duch kelmaslik uchun to'g'ri strategiyani tanlash juda muhim.

### 1. State turlari

State boshqaruvini tushunish uchun avvalo ularni to'g'ri tasniflash kerak:
* **Local State:** Faqat bitta komponentga tegishli (masalan, \`isOpen\` modal holati, \`input\` qiymati).
* **Global State:** Ko'plab komponentlar uchun kerakli ma'lumotlar (masalan, foydalanuvchi profili, til sozlamalari, savatdagi mahsulotlar).
* **Server State:** Backend'dan keladigan va keshlashni talab qiluvchi ma'lumotlar.

### 2. Professional maslahat: "Lift State Up"

State boshqaruvini murakkablashtirishdan oldin, **"Lifting State Up"** (holatni yuqoriga ko'tarish) tamoyilidan foydalaning. Agar ikki komponent bir xil ma'lumotga muhtoj bo'lsa, ularning eng yaqin umumiy ota-komponentiga state'ni ko'chiring. Bu kutubxonalardan foydalanishdan oldingi birinchi va eng to'g'ri qadamdir.

### 3. State Managementni tanlash strategiyasi (Qoidalar)

| Holat turi | Tavsiya etilgan vosita |
| --- | --- |
| **Bitta komponent ichida** | \`useState\` / \`useReducer\` |
| **Yaqin komponentlar o'rtasida** | Prop Drilling yoki Lifting State Up |
| **Global, kam o'zgaruvchan** | \`Context API\` |
| **Global, tez o'zgaruvchan** | \`Zustand\` yoki \`Redux\` |
| **Backend ma'lumotlari** | \`TanStack Query\` |
\`,
  code: \`import React, { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Local State Namuna</h1>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Yopish" : "Ochish"}
      </button>
      {isOpen && <p>Bu matn Local State orqali boshqarilmoqda!</p>}
    </div>
  );
}\`,
  exercises: [],
  quizzes: []
};

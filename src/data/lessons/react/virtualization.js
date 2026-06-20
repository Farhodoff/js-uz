export const virtualization = {
  title: "Windowing va Virtualization",
  content: `
# Windowing va Virtualization

Agar sizning sahifangizda minglab elementlardan iborat ro'yxat (list yoki table) bo'lsa, ularning hammasini bir vaqtda DOM'ga chizish brauzerni qotirib qo'yadi. Agar har bitta qator elementini chizish uchun 1 millisekund ketsa ham, 10,000 qatorni chizish qariyb 10 soniya o'ylanish degani.

### Virtualization (Virtualizatsiya) nima?
Bu shunday texnikaki, u qancha ma'lumot bo'lishidan qat'i nazar, faqat **ayni paytda ekranda (oynada) ko'rinib turgan** elementlarnigina DOM'da yaratadi. Ekranning scrolli orqali tepa va pastki qismiga o'tganingiz sari, ko'rinmay qolgan elementlar o'chiriladi va yangilari ularning o'rniga joylashtiriladi.

### Mashhur Kutubxonalar:
1. **react-window:** Juda yengil va tez ishlash uchun mo'ljallangan mashhur yechim.
2. **tanstack-virtual:** Zamonaviy, "headless" (faqat mantiqni beradigan, dizaynga aralashmaydigan) va juda moslashuvchan yechim (tavsiya etiladi).

**Natija:** 10,000 ta qatordan iborat ro'yxat ham xuddi 10 ta qator boridek silliq ishlaydi!
\`,
  code: \`import React from "react";

export default function App() {
  return (
    <div>
      <h1>Virtualization Konsepsiyasi</h1>
      <p>
        Haqiqiy loyihada biz <strong>@tanstack/react-virtual</strong> yoki <strong>react-window</strong> kabi kutubxonalarni ishlatamiz.
      </p>
      <div style={{ height: "200px", overflow: "hidden", border: "1px solid #ccc", position: "relative" }}>
        {/* Simulyatsiya */}
        <div style={{ height: "5000px" }}>
          <div style={{ position: "absolute", top: "0", width: "100%", padding: 10, background: "#f1f1f1" }}>Item 1 (Ko'rinmoqda)</div>
          <div style={{ position: "absolute", top: "30px", width: "100%", padding: 10 }}>Item 2 (Ko'rinmoqda)</div>
          <div style={{ position: "absolute", top: "60px", width: "100%", padding: 10, background: "#f1f1f1" }}>Item 3 (Ko'rinmoqda)</div>
          {/* Qolgan minglab item'lar hozircha DOM'da yo'q */}
        </div>
      </div>
      <p style={{marginTop: 10, fontSize: "0.9rem", color: "gray"}}>Yuqoridagi oyna 5000px balandlikka ega ro'yxatni o'zida saqlayapti, lekin ichkarida faqat 3 dona qator chizilgan (qolganlarini o'chirilgan holatda tasavvur qiling).</p>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "Minglab qatorli jadval (table) ni qotmasdan chizish texnikasi?",
    options: [
      "Reconciliation",
      "Memoization",
      "Virtualization (Windowing)",
      "Code Splitting"
    ],
    correctAnswer: 2,
    explanation: "Bu usul yordamida faqat ekranda ko'rinib turgan elementlargina yasaladi."
  }
]
};

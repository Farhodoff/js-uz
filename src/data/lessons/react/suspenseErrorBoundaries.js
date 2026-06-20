export const suspenseErrorBoundaries = {
  title: "Suspense va Error Boundaries",
  content: `
# Suspense va Error Boundaries

Foydalanuvchi interfeysida asinxron jarayonlarni (ma'lumot yuklash yoki lazy loading) boshqarish va dasturning qulashidan saqlab qolish uchun eng zamonaviy yondashuv.

### 1. Suspense
Odatda biz datani yuklashda \`if (loading) return <Spinner/>\` deb yozamiz. \`Suspense\` esa buni ancha chiroyli va deklarativ qiladi. Komponent o'z ma'lumotlarini serverdan olib kelguncha (yoki komponent fayli yuklanguncha), ota elementdagi \`<Suspense fallback={<Spinner />}>\` vaqtincha UI ko'rsatib turadi. Ayniqsa Server Components bilan judayam qulay!

### 2. Error Boundaries
Tasavvur qiling, qandaydir uchinchi tomon kutubxonasida (masalan, kichik bir tugma ichida) xatolik yuz berdi. React butunlay ishdan chiqadi va ekranda **"Oq ekran" (White Screen of Death)** paydo bo'ladi.
* **Error Boundary** (Xatolik chegarasi) — bu xato yuz bergan komponentni o'rab turadigan maxsus qobiqdir. U ichkaridagi xatoni o'zida tutib qolib, dasturning qolgan qismi ishlashini davom ettirishga imkon beradi va foydalanuvchiga "Kechirasiz, xatolik yuz berdi" degan tushunarli yozuvni ko'rsatadi.
\`,
  code: \`import React, { Suspense } from "react";

// Dastur qulamasligi uchun React da odatda ErrorBoundary yoziladi (Class component orqali yoki 'react-error-boundary' kutubxonasi)

export default function App() {
  return (
    <div>
      <h1>Suspense & Error Boundary</h1>
      <pre style={{ background: '#eee', padding: 10, borderRadius: 5 }}>
{`<ErrorBoundary fallback={<h2>Nimadir xato ketdi!</h2>}>
  <Suspense fallback={<h2>Ma'lumotlar yuklanmoqda...</h2>}>
    <DashboardData />
  </Suspense>
</ErrorBoundary>

// Agar DashboardData yuklanayotgan bo'lsa -> "Ma'lumotlar yuklanmoqda..." chiqadi.
// Agar DashboardData ichida API dan xato kelsa (JavaScript Error) -> "Nimadir xato ketdi!" chiqadi.
// Va eng asosiysi: BUTUN Ilovaning boshqa qismlari ishlashda davom etadi!
`}
      </pre>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "Error Boundary nima ish qiladi?",
    options: [
      "Syntax xatolarni tuzatadi",
      "Bitta komponentda xatolik bo'lsa, uni ushlab qolib dastur qulamasligini ta'minlaydi",
      "Yuklanishni tezlashtiradi",
      "Networkni tekshiradi"
    ],
    correctAnswer: 1,
    explanation: "Oq ekran o'rniga tushunarli yozuv ko'rsatib, sayt ishlashini davom ettiradi."
  }
]
};

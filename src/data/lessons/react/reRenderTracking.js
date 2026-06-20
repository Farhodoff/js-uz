export const reRenderTracking = {
  title: "Re-renderlarni kuzatish va Profiler",
  content: `
# Re-renderlarni kuzatish va Profiler

React'da ishlash unumdorligini oshirishning eng birinchi qadami — **muammoni aniqlashdir**. Qaysi komponent keraksiz qayta render bo'layotganini ko'z bilan topish deyarli imkonsiz.

### React DevTools Profiler
Buning uchun brauzerga o'rnatiladigan **React Developer Tools** kengaytmasidan (extension) foydalaniladi. Uning ichida **Profiler** degan maxsus bo'lim bor.

* **Yozib olish (Record):** Profiler'da yozishni boshlab, ilovada o'zgarishlar (tugma bosish, yozish) qilasiz va to'xtatasiz.
* **Flamegraph:** Sizga qaysi komponent qancha vaqtda render bo'lganini aniq grafik ko'rinishda ko'rsatadi (sariq ranglilar sekin, yashillar tez).
* **Ranked chart:** Eng ko'p vaqt olgan komponentlarni yuqoriga chiqarib beradi.
* **Nima uchun render bo'ldi?** Profiler aynan qaysi state yoki prop o'zgargani uchun komponent qayta chizilganini aniq ko'rsatib beradi. Buni topgachgina optimallashtirish qilish mumkin.

**Qoida:** Profilerni doim Production (yoqilgan \`build\`) versiyada emas, balki Development muhitida ishlating, lekin Development muhit React ishini biroz sekinroq ko'rsatishini unutmang.
`,
  code: `import React, { Profiler, useState } from "react";

// Profiler ichki komponentlar qancha vaqt olishini hisoblaydi
function onRenderCallback(
  id, // profiler ID'si ("Panel")
  phase, // "mount" yoki "update"
  actualDuration, // ushbu yangilanish qancha vaqt oldi
  baseDuration, // memoization bo'lmaganda qancha vaqt olgan bo'lardi
) {
  console.log(\`[\${id}] \${phase} - Actual: \${actualDuration.toFixed(2)}ms\`);
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <Profiler id="SanoqPanel" onRender={onRenderCallback}>
      <div>
        <h1>Profiler Namuna (Konsolni oching!)</h1>
        <p>Sanoq: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>Oshirish</button>
      </div>
    </Profiler>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "React Profiler'da 'Flamegraph' nima uchun kerak?",
    options: [
      "Dizaynni o'zgartirish uchun",
      "Qaysi komponentlar ko'proq vaqt olganini aniq ko'rish uchun",
      "CSS ni tekshirish",
      "Redux ni debug qilish"
    ],
    correctAnswer: 1,
    explanation: "Flamegraph daraxt ko'rinishida komponentlarning render vaqtini ranglar bilan ajratadi."
  }
]
};

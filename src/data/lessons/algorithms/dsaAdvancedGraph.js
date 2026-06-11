export const dsaAdvancedGraph = {
  id: "dsaAdvancedGraph",
  title: "Murakkab Graf Strukturasi (Tarjan, Kosaraju, Euler & Hamilton Cycles, Network Flow)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Murakkab Graf Strukturasi algoritmlari graflardagi kuchli bog'langan komponentlarni topish, bir tomonlama yoki aylanma marshrutlarni hisoblash hamda tarmoqlar orqali o'tuvchi oqim (suv, ma'lumot yoki trafik) hajmini maksimallashtirish uchun qo'llaniladi.

### Tushunarli analogiyalar:
- **Kosaraju va Tarjan Algoritmlari (Strongly Connected Components - SCC):** Tasavvur qiling, ijtimoiy tarmoqda bir guruh foydalanuvchilar bor. Guruh ichidagi har bir inson guruhdagi istalgan boshqa insonga (bevosita yoki bilvosita yo'naltirilgan shoxlar orqali) xabar yubora oladi. Lekin bu guruhdan tashqariga chiqilsa, orqaga qaytish imkoni yo'q. Kosaraju va Tarjan algoritmlari aynan mana shunday yopiq \"o'zaro to'liq bog'langan orollar\" (kuchli bog'langan komponentlar)ni topib beradi.
- **Eyler Yo'li va Sikli (Euler Path/Cycle):** Bu xuddi qog'ozdagi shaklni qalamni qog'ozdan uzmasdan va har bir chiziq (shox) ustidan **faqat bir marta** o'tib chizishga o'xshaydi. Agar boshlagan joyingizga qaytib kelsangiz, bu Eyler Sikli deyiladi.
- **Hamilton Yo'li va Sikli (Hamiltonian Path/Cycle):** Eyler yo'lidan farqli o'laroq, bu yerda har bir **tugun (vertex)** ustidan **faqat bir marta** o'tishingiz kerak (shoxlar qolib ketishi mumkin). Bu juda qiyin (NP-hard) masala.
- **Network Flow (Maksimal Oqim):** Sizda Toshkentdan Samarqandgacha suv quvurlari tarmog'i bor. Har bir quvur ma'lum bir hajmdagi suvni o'tkaza oladi (capacity). Ford-Fulkerson yoki Dinic algoritmlari ushbu quvurlar tarmog'i orqali jami sekundiga necha litr suv yuborish mumkinligini (Maximum Flow) hisoblaydi.

---

## 2. 💻 Real Kod Misollari

Euler yo'li mavjudligini tekshirish uchun yo'naltirilmagan bog'langan grafda tugunlar darajalarini tekshirish:

\`\`\`javascript
function hasEulerPathOrCycle(V, adjList) {
  let oddDegreeCount = 0;

  for (let i = 0; i < V; i++) {
    const degree = adjList[i] ? adjList[i].length : 0;
    if (degree % 2 !== 0) {
      oddDegreeCount++;
    }
  }

  // Odd degree count 0 bo'lsa: Euler Cycle bor (boshlagan joyga qaytadi)
  // Odd degree count 2 bo'lsa: Euler Path bor (boshqa joyda boshlanib boshqa joyda tugaydi)
  // Boshqa barcha holatlarda Euler yo'li yo'q
  if (oddDegreeCount === 0) return "Euler Cycle";
  if (oddDegreeCount === 2) return "Euler Path";
  return "None";
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Tarjan SCC Algoritmi:
1. DFS o'tish yondashuviga asoslanadi. Har bir tugunga uning ziyorat qilinish tartibi raqami (\`discovery time\`) va u ulanishi mumkin bo'lgan eng yuqoridagi tugun tartib raqami (\`low link\`) beriladi.
2. DFS davomida tugunlar stekka yoziladi.
3. DFS qaytishida (backtracking), agar tugunning \`low link === discovery time\` bo'lsa, stekdan joriy tugungacha bo'lgan barcha tugunlar chiqariladi va bitta SCC guruhiga yig'iladi. Bu chiziqli $O(V + E)$ vaqt oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Hamilton Sikli (NP-hard) uchun chiziqli yoki kvadratik yechim yozishga urinish
Hamilton siklini aniqlash masalasi NP-to'liq (NP-complete) hisoblanadi. Undan barcha tugunlar uchun tezkor $O(V^2)$ lik algoritm yo'q.
* **Tuzatish:** Hamilton masalalarida Backtracking ($O(2^V)$) yoki Dynamic Programming + Bitmask ($O(2^V \\times V^2)$) yondashuvlarini qo'llang. Katta graflar uchun chiziqli yechim qidirmang.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Kuchli Bog'langan Komponent (Strongly Connected Component - SCC) nima?**
   * *Javob:* Yo'naltirilgan grafdagi tugunlar guruhi bo'lib, uning ichidagi har qanday u va v tugunlari uchun u-dan v-ga va v-dan u-ga yo'naltirilgan yo'l mavjud bo'ladi.
2. **SCC larni topish uchun qaysi ikkita algoritm mashhur?**
   * *Javob:* Kosaraju algoritmi (ikki marta DFS va graf transpozitsiyasiga tayanadi) va Tarjan algoritmi (bitta DFS va stekka tayanadi).
3. **Kosaraju va Tarjan algoritmlarining vaqt murakkabligi qanday?**
   * *Javob:* Ikkalasi ham chiziqli O(V + E) vaqtda ishlaydi.
4. **Eyler Yo'li (Euler Path) va Eyler Sikli (Euler Cycle) farqi nima?**
   * *Javob:* Eyler yo'lida har bir shoxdan faqat 1 marta o'tiladi. Eyler siklida esa bu yo'l boshlang'ich tugunda tugashi shart.
5. **Hamilton Yo'li (Hamiltonian Path) va Eyler yo'li farqi nimada?**
   * *Javob:* Eyler yo'li har bir shoxni (edge) bir marta bosib o'tadi, Hamilton yo'li esa har bir tugunni (vertex) faqat bir marta ziyorat qiladi.
6. **Yo'naltirilmagan bog'langan grafda Eyler sikli bo'lishi sharti qanday?**
   * *Javob:* Barcha tugunlarning darajasi (degree) juft son bo'lishi kerak.
7. **Yo'naltirilmagan bog'langan grafda Eyler yo'li (lekin sikl emas) bo'lishi sharti qanday?**
   * *Javob:* Toq darajali tugunlar soni aynan 2 ta bo'lishi kerak.
8. **Hamilton siklini topish qaysi murakkablik sinfiga kiradi?**
   * *Javob:* NP-complete (NP-to'liq) sinfiga kiradi, ya'ni unga chiziqli yoki polinomial vaqtda yechuvchi tezkor algoritm hozircha topilmagan.
9. **Maximum Flow (Maksimal oqim) masalasi nima?**
   * *Javob:* Manbadan (Source) quyilish joyigacha (Sink) bo'lgan o'tkazuvchanlik quvurlari bo'yicha yuborish mumkin bo'lgan maksimal oqim miqdorini topish.
10. **Ford-Fulkerson algoritmidagi 'Augmenting Path' (kengaytiruvchi yo'l) nima?**
    * *Javob:* Manbadan quyilish joyigacha hali qo'shimcha oqim o'tkazishi mumkin bo'lgan (qoldiq sig'imi noldan katta) har qanday yo'l.
11. **Dinic algoritmi Ford-Fulkerson dan nima bilan farq qiladi?**
    * *Javob:* Dinic darajali graflar (level graph) hosil qilib, BFS va DFS yordamida qoldiq tarmoqda kengaytiruvchi yo'llarni tezroq topadi (Vaqt: O(V^2 * E)).
12. **Bipartite Matching (Ikki ulushli grafda mos juftliklar topish) masalasini qanday hal qilish mumkin?**
    * *Javob:* Uni Maximum Flow masalasiga o'tkazib (super-source va super-sink qo'shish orqali) Ford-Fulkerson yoki Dinic yordamida.

---

## 6. 🎨 Interaktiv Vizual

### Eyler Sikli shakli (Darajalar juft):
Barcha burchaklar 2 ta shox bilan bog'langan:

\`\`\`mermaid
graph LR
    A((A: deg 2)) --- B((B: deg 2))
    B --- C((C: deg 2))
    C --- A
    style A fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style B fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style C fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Murakkab graf amallarini kodlab tushuning.

---

## 8. 📝 12 ta Mini Test

Murakkab graf testlaridan o'ting.

---

## 9. 🚀 Performance va Optimization

- **Tarjan over Kosaraju:** Tarjan algoritmi faqat bitta DFS va bitta o'tish talab qilgani uchun amaliyotda Kosarajuga qaraganda taxminan 1.5 - 2 barobar tezroq ishlaydi.

---

## 10. 📌 Cheat Sheet

| Algoritm / Masala | Vazifasi | Vaqt Murakkabligi | Murakkablik Turi |
| :--- | :--- | :--- | :--- |
| **Tarjan / Kosaraju** | SCC topish | O(V + E) | Linear (P) |
| **Hierholzer** | Euler yo'lini topish | O(V + E) | Linear (P) |
| **Ford-Fulkerson** | Max Flow | O(E * max_flow) | Pseudo-polynomial |
| **Dinic** | Max Flow | O(V^2 * E) | Polynomial (P) |
| **Hamilton Cycle** | Tugunlarni aylanish | O(2^V * V^2) | NP-complete |
`,
  exercises: [
    {
      id: 1,
      title: "Kosaraju Bosqichi: Graf Transpozitsiyasi",
      instruction: "Yo'naltirilgan graf qo'shnichilik ro'yxati `adj` berilgan. Kosaraju algoritmidagi kabi, grafning barcha yo'nalishlarini teskari qilib o'zgartiruvchi (Transposed Graph) `transposeGraph(V, adj)` funksiyasini yozing.",
      startingCode: "function transposeGraph(V, adj) {\n  const transposed = Array.from({ length: V }, () => []);\n  // Kodni yozing\n  return transposed;\n}",
      hint: "Sikl yordamida adj[u] massivini aylanib chiqing va transposed[v].push(u) qiling.",
      test: "const sandbox = new Function(code + '; return transposeGraph;'); const fn = sandbox(); const adj = [[1], [2], [0]]; const res = fn(3, adj); if (res && res[0][0] === 2 && res[1][0] === 0 && res[2][0] === 1) return null; return 'Graf transpozitsiyasi noto\\'g\\'ri bajarildi';"
    },
    {
      id: 2,
      title: "Eyler Sikli uchun Juft Darajalar Tekshiruvi",
      instruction: "Bog'langan yo'naltirilmagan graf darajalari massivi `degrees` berilgan. Agar ushbu grafda Eyler sikli (Euler Cycle) mavjud bo'lsa `true`, bo'lmasa `false` qaytaruvchi `isEulerCyclePossible(degrees)` funksiyasini yozing.",
      startingCode: "function isEulerCyclePossible(degrees) {\n  // Kodni yozing\n}",
      hint: "Eyler sikli bo'lishi uchun bog'langan grafdagi barcha tugunlar darajasi juft (degree % 2 === 0) bo'lishi shart.",
      test: "const sandbox = new Function(code + '; return isEulerCyclePossible;'); const fn = sandbox(); if (fn([2, 4, 2]) === true && fn([2, 3, 2, 1]) === false) return null; return 'Eyler sikli ehtimolini aniqlashda xatolik';"
    },
    {
      id: 3,
      title: "Tarmoqdagi Oqim Qoldig'ini Yangilash",
      instruction: "Ford-Fulkerson algoritmidagi kabi, berilgan yo'lda oqim o'tganda qoldiq sig'imini yangilash kerak. 2D `residualCapacity` matritsasi, berilgan yo'l `path` (tugunlar massivi) va o'tgan oqim hajmi `flow` berilgan. Matritsani yangilab qaytaruvchi `updateResidualNetwork(residualCapacity, path, flow)` funksiyasini yozing.",
      startingCode: "function updateResidualNetwork(residualCapacity, path, flow) {\n  // Kodni yozing\n  return residualCapacity;\n}",
      hint: "Yo'l bo'ylab har bir (u, v) juftlik uchun residualCapacity[u][v] dan flow-ni ayiring, teskari yo'nalish residualCapacity[v][u] ga esa flow-ni qo'shing.",
      test: "const sandbox = new Function(code + '; return updateResidualNetwork;'); const fn = sandbox(); const cap = [[0, 10], [0, 0]]; fn(cap, [0, 1], 4); if (cap[0][1] === 6 && cap[1][0] === 4) return null; return 'Qoldiq tarmoq quvvati noto\\'g\\'ri yangilandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Kuchli Bog'langan Komponent (SCC) qanday grafga tegishli tushuncha?",
      options: [
        "Faqat yo'naltirilmagan graflarga",
        "Faqat yo'naltirilgan graflarga (Directed Graphs)",
        "Faqat daraxtlarga",
        "Barcha graflarda u doimo mavjud emas"
      ],
      correctAnswer: 1,
      explanation: "SCC faqat yo'naltirilgan graflar uchun aniqlanadi, chunki yo'naltirilmagan graflarda bog'langanlik har doim ikki tomonlama bo'ladi."
    },
    {
      id: 2,
      question: "Tarjan va Kosaraju algoritmlari qanday vaqt murakkabligida kuchli bog'langan komponentlarni topadi?",
      options: [
        "O(V^2)",
        "O(V + E) (chiziqli vaqtda)",
        "O(V^3)",
        "O(E log V)"
      ],
      correctAnswer: 1,
      explanation: "Ikkala algoritm ham chuqurlik bo'yicha qidiruv (DFS) ga tayanadi va chiziqli O(V + E) vaqtda ishlaydi."
    },
    {
      id: 3,
      question: "Kosaraju algoritmida grafni transpozitsiya qilish (transpose graph) nimani anglatadi?",
      options: [
        "Barcha tugunlarni o'chirib yuborishni",
        "Grafdagi barcha yo'naltirilgan shoxlar yo'nalishini teskari tomonga o'zgartirishni",
        "Grafni matritsaga o'tkazishni",
        "Grafni ikkiga bo'lishni"
      ],
      correctAnswer: 1,
      explanation: "Transpozitsiya - barcha u -> v shoxlarni v -> u ko'rinishiga teskarilashdir. Bu Kosarajuning ikkinchi DFS bosqichida kerak bo'ladi."
    },
    {
      id: 4,
      question: "Tarjan SCC algoritmi DFS davomida qaysi qiymatlarni hisoblaydi va solishtiradi?",
      options: [
        "Discovery time va Low-link values",
        "Faqat tugun darajalarini",
        "Tugunlar orasidagi eng qisqa masofalarni",
        "Oqim hajmini"
      ],
      correctAnswer: 0,
      explanation: "Tarjan har bir tugunning DFSga kirish tartibi (discovery) va unga bog'langan eng yuqori ajdod (low-link) qiymatlarini solishtiradi."
    },
    {
      id: 5,
      question: "Grafda Eyler yo'li (Euler Path) nima?",
      options: [
        "Har bir tugunni faqat bir marta ziyorat qiluvchi yo'l",
        "Har bir shoxdan (edge) aynan bir marta o'tadigan yo'l",
        "Eng qisqa yo'l",
        "Cheksiz aylanuvchi yo'l"
      ],
      correctAnswer: 1,
      explanation: "Eyler yo'li grafning barcha shoxlaridan roppa-rosa bir marta o'tishi kerak, tugunlar bir necha marta takrorlanishi mumkin."
    },
    {
      id: 6,
      question: "Hamilton yo'li (Hamiltonian Path) Eyler yo'lidan nimasi bilan farq qiladi?",
      options: [
        "U faqat yo'naltirilgan graflarda bo'ladi",
        "U har bir tugundan (vertex) roppa-rosa bir marta o'tishi shart (shoxlar qolib ketishi mumkin)",
        "U juda tez topiladi",
        "Unda sikl bo'lishi taqiqlangan"
      ],
      correctAnswer: 1,
      explanation: "Hamilton yo'lida tugunlar bir marta o'tilishi shart. Eylerda esa shoxlar bir marta o'tilishi shart."
    },
    {
      id: 7,
      question: "Bog'langan yo'naltirilmagan grafda Eyler Sikli (Euler Cycle) mavjud bo'lish sharti qaysi?",
      options: [
        "Barcha tugunlarning darajasi toq son bo'lishi",
        "Barcha tugunlarning darajasi juft son bo'lishi",
        "Faqat bitta tugun juft bo'lishi",
        "Hech qanday shox bo'lmasligi"
      ],
      correctAnswer: 1,
      explanation: "Tugunga kirgan yo'l undan chiqishi ham kerak. Shuning uchun barcha tugunlar darajalari juft bo'lishi Eyler siklining zaruriy shartidir."
    },
    {
      id: 8,
      question: "Hamilton siklini topish muammosi kompyuter fanlarida qanday toifalanadi?",
      options: [
        "Polinomial vaqtda oson yechiladigan (P)",
        "NP-complete (NP-to'liq, hozircha polinomial tezkor yechimi yo'q)",
        "O(1) da yechiladigan",
        "Faqat xotira yetishmasligi muammosi"
      ],
      correctAnswer: 1,
      explanation: "Hamiltonian Cycle NP-complete sinfiga kiradi, barcha holatlar uchun eng tezkor yechimlar ko'p vaqt talab qiladi (Backtracking/NP)."
    },
    {
      id: 9,
      question: "Maksimal Oqim (Maximum Flow) masalasida 'Source' va 'Sink' nima?",
      options: [
        "Source - oqim boshlanadigan (chiquvchi) tugun, Sink - oqim yig'iladigan (quyuladigan) yakuniy tugun",
        "Ular ma'lumotlar bazasi jadvallari",
        "Source - kichik son, Sink - katta son",
        "Daraxtning bargi va ildizi"
      ],
      correctAnswer: 0,
      explanation: "Suv tarmog'i kabi, oqim Source (manba) dan boshlanib Sink (quyilish joyi) da tugaydi."
    },
    {
      id: 10,
      question: "Ford-Fulkerson algoritmi maksimal oqimni qanday hisoblaydi?",
      options: [
        "Tugunlarni saralash orqali",
        "Qoldiq tarmoqda (residual network) manbadan quyilish joyigacha kengaytiruvchi yo'llarni (augmenting paths) topib, ularni oqim bilan to'ldirish orqali",
        "Dijkstra algoritmini takrorlash orqali",
        "Faqat tasodifiy oqimlar berish orqali"
      ],
      correctAnswer: 1,
      explanation: "Ford-Fulkerson qoldiq tarmoqda yo'l qidiradi, oqim o'tkazadi va residual sig'imlarni yangilab boradi."
    },
    {
      id: 11,
      question: "Dinic algoritmi Ford-Fulkerson dan nima bilan ustunroq?",
      options: [
        "U hech qanday xotira talab qilmaydi",
        "U darajali graflar va bloklovchi oqimlardan foydalanib, eng yomon holatda ham polinomial vaqtda (O(V^2 * E)) kafolatlangan tezlikda ishlaydi",
        "U faqat JavaScriptda yozilgan",
        "U MST daraxtini ham quradi"
      ],
      correctAnswer: 1,
      explanation: "Dinic oqim algoritmlarini BFS/DFS darajali graflar (level graphs) orqali optimallashtiradi va Ford-Fulkersondan ancha tez ishlaydi."
    },
    {
      id: 12,
      question: "Maximum Flow Min-Cut teoremasi nimani aytadi?",
      options: [
        "Maksimal oqim har doim noldan kichik bo'lishini",
        "Tarmoqning maksimal oqimi uning minimal kesimining (Min-Cut) o'tkazuvchanlik quvvatiga tengligini",
        "Daraxtlarni kesish narxini",
        "Matritsaning determinanti qiymatini"
      ],
      correctAnswer: 1,
      explanation: "Max-Flow Min-Cut teoremasiga ko'ra, tarmoqdan o'tishi mumkin bo'lgan maksimal oqim uni ikkiga ajratuvchi eng tor bo'g'iz (minimal kesim) quvvati bilan cheklanadi."
    }
  ]
};

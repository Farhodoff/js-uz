export const dsaGraphAlgos = {
  id: "dsaGraphAlgos",
  title: "Murakkab Graf Algoritmlari (Dijkstra, Bellman-Ford, Kruskal, Prim)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Murakkab Graf Algoritmlari vaznli (Weighted) graflarda eng qisqa yo'lni topish va Minimal Yozuvchi Daraxtlarni (Minimum Spanning Tree - MST) qurish uchun ishlatiladi.

### GPS va Xaritalar o'xshatishi:
- **Dijkstra Algoritmi:** Bu sizning telefoningizdagi navigatordir. U bir shahardan ikkinchisiga borishning eng tez (yoki eng qisqa) yo'lini hisoblaydi, agar barcha yo'llar masofalari musbat (ijobiy) bo'lsa.
- **Bellman-Ford Algoritmi:** Agar yo'llarda "pul to'lanadigan yoki pul beriladigan" (manfiy vaznli) oraliqlar bo'lsa va navigator adashib qolmasligi kerak bo'lsa, ushbu algoritm ishlaydi.
- **Kruskal va Prim Algoritmlari (MST):** Tasavvur qiling, siz 5 ta binoni optik tolali internet bilan ulamoqchisiz. Simlar uzunligi jami eng minimal bo'lishi kerak va hech qanday yopiq aylanma (sikl) hosil bo'lmasligi lozim. Minimum Spanning Tree aynan shu eng arzon bog'lanish tarmog'ini topib beradi.

---

## 2. 💻 Real Kod Misollari

Dijkstra algoritmi yordamida berilgan tugundan boshqa barcha tugunlargacha bo'lgan eng qisqa masofani topish:

\`\`\`javascript
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = []; // Sodda Priority Queue simulyatsiyasi uchun massiv

  // Masofalarni cheksizlik bilan to'ldirish
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.push({ node: start, dist: 0 });

  while (pq.length > 0) {
    // Eng kichik masofali tugunni olish
    pq.sort((a, b) => a.dist - b.dist);
    const { node: currNode, dist: currDist } = pq.shift();

    if (visited.has(currNode)) continue;
    visited.add(currNode);

    // Qo'shnilarni tekshirish
    for (let neighbor in graph[currNode]) {
      const weight = graph[currNode][neighbor];
      const newDist = currDist + weight;

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push({ node: neighbor, dist: newDist });
      }
    }
  }

  return distances;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Dijkstra Algoritmi:
1. Greedy (ochko'z) yondashuvga asoslanadi. Har doim hali ziyorat qilinmagan eng kichik masofali tugunni tanlaydi.
2. Tanlangan tugunning qo'shnilarini **Relaksatsiya (Relaxation)** qiladi: agar joriy tugun orqali qo'shniga boradigan masofa oldingi ma'lum masofadan kichik bo'lsa, masofani yangilaydi.
3. Vaqt murakkabligi: Priority Queue bilan $O((V + E) \\log V)$ bo'ladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Manfiy shoxlar bor grafda Dijkstra algoritmini ishlatish
Dijkstra algoritmi shox vaznlari musbat deb farz qiladi. Agar grafda manfiy vaznlar bo'lsa, Dijkstra noto'g'ri javob berishi yoki cheksiz aylanib qolishi mumkin.
* **Tuzatish:** Manfiy vaznli shoxlar mavjud bo'lgan graflarda har doim **Bellman-Ford** algoritmidan foydalaning.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Dijkstra algoritmining asosiy vazifasi nima?**
   * *Javob:* Berilgan bitta boshlang'ich tugundan boshqa barcha tugunlargacha bo'lgan eng qisqa yo'llarni topish.
2. **Nima uchun Dijkstra manfiy vaznli shoxlarda ishlamaydi?**
   * *Javob:* Chunki u Greedy prinsipga tayanib, bir marta ziyorat qilingan tugun masofasi boshqa o'zgarmaydi deb hisoblaydi, manfiy shoxlar esa bu masofani keyinchalik yana kamaytirishi mumkin.
3. **Bellman-Ford algoritmi Dijkstradan nima bilan farq qiladi?**
   * *Javob:* Bellman-Ford manfiy shoxlarda ham ishlaydi va manfiy sikllarni aniqlay oladi, lekin uning vaqt murakkabligi sekinroq: O(V * E).
4. **Minimum Spanning Tree (MST) nima?**
   * *Javob:* Grafning barcha tugunlarini bog'lovchi, hech qanday sikl hosil qilmaydigan va umumiy shoxlar vazni eng minimal bo'lgan qism-graf.
5. **Kruskal algoritmi qanday ishlaydi?**
   * *Javob:* Shoxlarni vazni bo'yicha o'sish tartibida saralaydi va sikl hosil qilmaydigan shoxlarni DSU tuzilmasi yordamida bittalab MSTga qo'shadi.
6. **Prim algoritmi qanday ishlaydi?**
   * *Javob:* Bitta tugundan boshlab, har doim ziyorat qilingan va qilinmagan tugunlarni bog'lovchi eng arzon shoxni tanlab, MSTni kengaytirib boradi.
7. **Negative Cycle (Manfiy sikl) nima?**
   * *Javob:* Shoxlar vaznlari yig'indisi noldan kichik bo'lgan yopiq aylanma yo'l. Unda cheksiz aylanib, masofani cheksiz kamaytirish mumkin.
8. **Prim va Kruskal algoritmlari vaqt murakkabligi qanday?**
   * *Javob:* Ikkalasi ham odatda O(E log V) vaqt oladi.
9. **Kruskal algoritmi qaysi ma'lumot tuzilmasidan samarali foydalanadi?**
   * *Javob:* Disjoint Set Union (DSU) yoki Union-Find tuzilmasidan sikllarni tezkor tekshirish uchun foydalanadi.
10. **Single-source shortest path va All-pairs shortest path farqi nima?**
    * *Javob:* Single-source bitta tugundan barcha tugunlargacha eng qisqa masofani topadi (Dijkstra). All-pairs barcha tugunlar juftliklari orasidagi masofani topadi (Floyd-Warshall).
11. **Dijkstrani eng optimal realizatsiya qilish uchun qanday tuzilma kerak?**
    * *Javob:* Min-Heap yoki Fibonachchi Heapi yordamida qurilgan Priority Queue.
12. **Floyd-Warshall algoritmi vaqt murakkabligi qanday va qachon ishlatiladi?**
    * *Javob:* Vaqt murakkabligi O(V^3). Grafdagi barcha tugunlar juftliklari o'rtasidagi eng qisqa yo'llarni topishda ishlatiladi.

---

## 6. 🎨 Interaktiv Vizual

### Dijkstra Relaxing bosqichi
A tugundan B va C ga borish va masofani yangilash:

\`\`\`mermaid
graph LR
    A((A: 0)) -->|4| B((B: inf -> 4))
    A -->|2| C((C: inf -> 2))
    C -->|1| B
    style A fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style C fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Dijkstra algoritmini mustaqil kodlab mashq qiling.

---

## 8. 📝 12 ta Mini Test

Bilimingizni sinash uchun testlar.

---

## 9. 🚀 Performance va Optimization

- **Heap-based Dijkstra:** Oddiy massivdan sort qilish $O(V^2)$ vaqt oladi. Min-Heap Priority Queue orqali tezlikni $O(E \\log V)$ gacha tushiring.

---

## 10. 📌 Cheat Sheet

| Algoritm | Turi | Vaqt Murakkabligi | Cheklov |
| :--- | :--- | :--- | :--- |
| **Dijkstra** | Single-Source | O((V + E) log V) | Faqat musbat vaznlar |
| **Bellman-Ford** | Single-Source | O(V * E) | Manfiy vaznlar ruxsat etiladi |
| **Kruskal** | MST | O(E log E) | Yo'naltirilmagan graf |
| **Floyd-Warshall** | All-Pairs | O(V^3) | Kichik graflar uchun mos |
`,
  exercises: [
    {
      id: 1,
      title: "Sodda Dijkstra Masofa Topuvchi",
      instruction: "Yo'naltirilgan va vaznli graf `graph` (adjacency object) hamda boshlang'ich tugun `start` berilgan. Undan barcha tugunlargacha bo'lgan eng qisqa masofalar obyektini qaytaruvchi `simpleDijkstra(graph, start)` funksiyasini yozing.",
      startingCode: "function simpleDijkstra(graph, start) {\n  const distances = {};\n  // Kodni yozing\n  return distances;\n}",
      hint: "Barcha tugunlarga masofani Infinity qiling, start-ni 0 qiling. Ziyorat qilinmagan va masofasi eng kichik bo'lgan tugunni tanlab, uning qo'shnilari masofalarini yangilang.",
      test: "const sandbox = new Function(code + '; return simpleDijkstra;'); const fn = sandbox(); const g = { A: { B: 4, C: 2 }, B: { C: 3 }, C: { B: 1 } }; const res = fn(g, 'A'); if (res && res.A === 0 && res.B === 3 && res.C === 2) return null; return 'Dijkstra algoritmi masofalarni noto\\'g\\'ri hisobladi';"
    },
    {
      id: 2,
      title: "Bellman-Ford Manfiy Sikl Aniqlagich",
      instruction: "Tugunlar soni `V`, shoxlar ro'yxati `edges` (har biri `[u, v, w]` ko'rinishida) berilgan. Agar grafda manfiy sikl mavjud bo'lsa `true`, bo'lmasa `false` qaytaruvchi `hasNegativeCycle(V, edges, start)` funksiyasini yozing.",
      startingCode: "function hasNegativeCycle(V, edges, start) {\n  const dist = Array(V).fill(Infinity);\n  dist[start] = 0;\n  // Kodni yozing\n  return false;\n}",
      hint: "Shoxlarni V-1 marta relaksatsiya qiling. So'ngra yana 1 marta barcha shoxlarni tekshirib ko'ring: agar yana qisqarish yuz bersa, demak manfiy sikl bor va true qaytariladi.",
      test: "const sandbox = new Function(code + '; return hasNegativeCycle;'); const fn = sandbox(); const edgesNoCycle = [[0, 1, 5], [1, 2, -2]]; const edgesCycle = [[0, 1, 1], [1, 2, -5], [2, 1, 2]]; if (fn(3, edgesNoCycle, 0) === false && fn(3, edgesCycle, 0) === true) return null; return 'Manfiy siklni aniqlashda xatolik yuz berdi';"
    },
    {
      id: 3,
      title: "Kruskal MST Umumiy Og'irligi",
      instruction: "Tugunlar soni `V` va shoxlar ro'yxati `edges` (`[u, v, weight]` formatida) berilgan. DSU yoki oddiy cycle-checking orqali Kruskal algoritmini qo'llab, Minimal Yozuvchi Daraxt (MST) ning umumiy og'irligini hisoblovchi `kruskalMSTWeight(V, edges)` funksiyasini yozing.",
      startingCode: "function kruskalMSTWeight(V, edges) {\n  // Shoxlarni og'irligi bo'yicha saralang\n  edges.sort((a, b) => a[2] - b[2]);\n  // Kodni yozing\n  return 0;\n}",
      hint: "Sikl hosil bo'lmasligi uchun har bir qo'shilayotgan shox tugunlari bir-biri bilan bog'lanmaganligini DSU (parent array) yordamida tekshiring. Ular ulanmagan bo'lsa, MSTga qo'shib og'irligini jamlang.",
      test: "const sandbox = new Function(code + '; return kruskalMSTWeight;'); const fn = sandbox(); const edges = [[0, 1, 10], [0, 2, 6], [0, 3, 5], [1, 3, 15], [2, 3, 4]]; if (fn(4, edges) === 19) return null; return 'Kruskal MST og\\'irligi noto\\'g\\'ri hisoblandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Dijkstra algoritmi asosan qaysi turdagi muammoni yechadi?",
      options: [
        "Grafdagi bog'langan komponentlarni topish",
        "Vaznli grafda bitta boshlang'ich tugundan boshqa barcha tugunlargacha eng qisqa yo'llarni aniqlash",
        "Grafni ikki ulushli ekanligini tekshirish",
        "Barcha tugunlarni saralash"
      ],
      correctAnswer: 1,
      explanation: "Dijkstra algoritmi vaznli graflarda bitta tugundan eng qisqa masofalarni topuvchi asosiy algoritm hisoblanadi."
    },
    {
      id: 2,
      question: "Dijkstra algoritmida nega manfiy vaznli shoxlar (Negative Edges) taqiqlangan?",
      options: [
        "Chunki rekursiya juda ko'payib ketadi",
        "Algoritm ochko'z (greedy) bo'lib, ziyorat qilingan tugun masofasi boshqa kamaymaydi deb hisoblaydi va manfiy vaznlar ushbu qoidani buzadi",
        "JS-da manfiy sonlar bilan ishlash sekin",
        "Manfiy vaznlar faqat daraxtlarda bo'lishi mumkin"
      ],
      correctAnswer: 1,
      explanation: "Dijkstra bir marta ziyoratlangan tugun uchun eng qisqa yo'l topildi deb hisoblaydi va qayta tekshirmaydi, manfiy vazn esa yo'lni yanada qisqartirishi mumkin."
    },
    {
      id: 3,
      question: "Grafda manfiy vaznli shoxlar mavjud bo'lganda, eng qisqa masofalarni topish uchun qaysi algoritm mos keladi?",
      options: [
        "Prim algoritmi",
        "Bellman-Ford algoritmi",
        "Kruskal algoritmi",
        "Oddiy DFS"
      ],
      correctAnswer: 1,
      explanation: "Bellman-Ford algoritmi barcha shoxlarni V-1 marta relaksatsiya qilish orqali manfiy vaznli shoxlarda ham eng qisqa yo'lni to'g'ri hisoblaydi."
    },
    {
      id: 4,
      question: "Bellman-Ford algoritmida manfiy sikl (Negative Cycle) qanday aniqlanadi?",
      options: [
        "V-1 marta relaksatsiyadan keyin yana bir marta tekshirilganda masofalar yana qisqarsa",
        "Hech qanday masofa o'zgarmasa",
        "Grafda faqat bitta tugun qolgan bo'lsa",
        "Matritsada nollar ko'payib ketsa"
      ],
      correctAnswer: 0,
      explanation: "Agar V-1 marta takrorlashdan keyin ham shoxlarni tekshirganda masofa qisqarishda davom etsa, bu cheksiz kamayuvchi manfiy sikl borligini isbotlaydi."
    },
    {
      id: 5,
      question: "Minimal Yozuvchi Daraxt (Minimum Spanning Tree - MST) nima?",
      options: [
        "Grafdagi barcha tugunlarni siklsiz va eng minimal umumiy shox vazni bilan bog'lovchi qism-graf",
        "Eng baland bargi bo'lgan daraxt",
        "Faqat bitta yo'nalishi bor yo'l",
        "Ikki tugun orasidagi eng uzun masofa"
      ],
      correctAnswer: 0,
      explanation: "MST - grafning barcha tugunlarini birlashtiruvchi, siklsiz va umumiy shoxlari og'irligi yig'indisi eng kichik bo'lgan bog'langan qismdir."
    },
    {
      id: 6,
      question: "Kruskal algoritmi MST qurishda qaysi yondashuvga asoslanadi?",
      options: [
        "Dynamic Programming",
        "Greedy (Ochko'z) yondashuv - shoxlarni vazni bo'yicha saralab eng kichigini olish",
        "Backtracking",
        "Divide and Conquer"
      ],
      correctAnswer: 1,
      explanation: "Kruskal shoxlarni o'sish tartibida saralab, har doim eng arzon shoxni sikl bo'lmasligi sharti bilan qo'shib boradi (Greedy)."
    },
    {
      id: 7,
      question: "Kruskal algoritmida sikl hosil bo'lishining oldini olish uchun qaysi ma'lumotlar tuzilmasi eng mos keladi?",
      options: [
        "Priority Queue",
        "Disjoint Set Union (DSU)",
        "Linked List",
        "Xesh-jadval"
      ],
      correctAnswer: 1,
      explanation: "DSU (Union-Find) tuzilmasi ikkita tugun joriy MSTda bir xil to'plamga tegishli yoki yo'qligini tekshirish orqali sikllarni O(log V) yoki undan ham tezroq aniqlaydi."
    },
    {
      id: 8,
      question: "Prim algoritmi MSTni qanday shakllantiradi?",
      options: [
        "Barcha shoxlarni o'chirib chiqish orqali",
        "Bitta boshlang'ich tugundan boshlab, ziyorat qilingan to'plamdan tashqaridagi tugunga olib boruvchi eng arzon shoxni bittalab MSTga qo'shish orqali",
        "Faqat sikllarni saqlab qolish orqali",
        "Random tarzda tugunlarni bog'lab"
      ],
      correctAnswer: 1,
      explanation: "Prim algoritmi bitta daraxt tugunini tanlab, undan tashqaridagi eng yaqin (eng arzon shoxli) tugunlarni Greedy usulda zanjirga tortib boradi."
    },
    {
      id: 9,
      question: "Kruskal algoritmining vaqt murakkabligi qanday baholanadi?",
      options: [
        "O(V^2)",
        "O(E log E) yoki O(E log V)",
        "O(V + E)",
        "O(V^3)"
      ],
      correctAnswer: 1,
      explanation: "Kruskalda eng asosiy vaqt oladigan qism bu shoxlarni saralash (E log E). Shuning uchun tezlik O(E log E) yoki shunga teng O(E log V) bo'ladi."
    },
    {
      id: 10,
      question: "Floyd-Warshall algoritmi qanday muammoni hal qiladi?",
      options: [
        "Faqat MST qurishni",
        "Barcha tugunlar juftliklari orasidagi eng qisqa masofalarni topish (All-Pairs Shortest Path)",
        "Grafni chizishni",
        "Dijkstrani tezlashtirishni"
      ],
      correctAnswer: 1,
      explanation: "Floyd-Warshall 3 ta nested loop yordamida har bir tugun juftliklari orasidagi eng qisqa masofani dynamic programming uslubida topadi."
    },
    {
      id: 11,
      question: "Priority Queue (Min-Heap) ishlatilganda Dijkstra algoritmining vaqt murakkabligi qanday bo'ladi?",
      options: [
        "O(V^2)",
        "O((V + E) log V)",
        "O(V * E)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "Min-Heap yordamida eng kichik masofali tugunni topish O(log V) vaqt oladi, shuning uchun umumiy vaqt O((V + E) log V) ga optimallashadi."
    },
    {
      id: 12,
      question: "Floyd-Warshall algoritmining vaqt murakkabligi qanday?",
      options: [
        "O(V + E)",
        "O(V^3)",
        "O(E log V)",
        "O(2^V)"
      ],
      correctAnswer: 1,
      explanation: "Uchta ichma-ich sikl grafdagi har bir tugunni (V ta tugun) tekshirgani uchun uning vaqt murakkabligi O(V^3) bo'ladi."
    }
  ]
};

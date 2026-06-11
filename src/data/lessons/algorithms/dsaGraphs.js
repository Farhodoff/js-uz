export const dsaGraphs = {
  id: "dsaGraphs",
  title: "Graflar va Ularni Aylanib Chiqish (Graphs, BFS & DFS)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Graf (Graph) - bu obyeklar va ularning o'zaro bog'liqliklarini (munosabatlarini) ifodalovchi eng universal ma'lumotlar tuzilmasidir. Obyektlar **Tugunlar (Vertices/Nodes)**, ular o'rtasidagi bog'liqliklar esa **Shoxlar (Edges)** deb ataladi.

### Ijtimoiy tarmoq (Facebook/LinkedIn) analogiyasi:
- **Tugunlar (Vertices):** Ijtimoiy tarmoq foydalanuvchilari (Siz, do'stingiz, tanishingiz).
- **Shoxlar (Edges):** Do'stlik aloqalari.
  - **Yo'naltirilmagan Graf (Undirected):** Agar siz kimdir bilan do'st bo'lsangiz (Facebook), u ham siz bilan do'st bo'ladi. Aloqa ikki tomonlama.
  - **Yo'naltirilgan Graf (Directed):** Siz kimningdir sahifasiga obuna bo'lasiz (Instagram/Twitter), lekin u sizga obuna bo'lishi shart emas. Aloqa bir tomonlama.
  - **Vaznli Graf (Weighted):** Ikki shahar o'rtasidagi yo'l (aloqa) va uning masofasi (vazni). Masalan, Toshkentdan Samarqandgacha bo'lgan yo'l chekkasida 300 km vazn yozilgan.

---

## 2. 💻 Real Kod Misollari

Javaskriptda Adjacency List (Qo'shnichilik ro'yxati) yordamida yo'naltirilmagan graf yaratish va DFS (Chuqurlik bo'yicha qidiruv):

\`\`\`javascript
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Tugun qo'shish
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  // Aloqa (shox) qo'shish
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // Yo'naltirilmagan bo'lgani uchun
  }

  // DFS (Depth-First Search) rekursiv
  dfs(start, visited = {}) {
    if (!start) return [];
    visited[start] = true;
    const result = [start];

    this.adjacencyList[start].forEach((neighbor) => {
      if (!visited[neighbor]) {
        result.push(...this.dfs(neighbor, visited));
      }
    });
    return result;
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Graflarni xotirada saqlash usullari:
1. **Adjacency Matrix (Qo'shnichilik matritsasi):** $V \\times V$ o'lchamli 2D matritsa. Agar $i$ va $j$ tugunlar o'rtasida aloqa bo'lsa, \`matrix[i][j] = 1\` bo'ladi.
   - *Afzalligi:* Ikki tugun o'rtasida aloqa borligini tekshirish juda tez: $O(1)$.
   - *Kamchiligi:* Ko'p joy oladi: $O(V^2)$ xotira, hatto aloqalar juda kam bo'lsa ham.
2. **Adjacency List (Qo'shnichilik ro'yxati):** Har bir tugun uchun unga bog'langan qo'shnilar ro'yxati (massiv yoki Linked List) saqlanadi.
   - *Afzalligi:* Xotira tejaydi: $O(V + E)$ space.
   - *Kamchiligi:* Ikki tugun bog'liqligini tekshirish qo'shnilar soniga bog'liq: $O(\\text{degree}(V))$.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Grafni aylanib chiqishda ziyorat qilingan (Visited) tugunlarni yozishni unutish
Daraxtdan farqli o'laroq, graflarda aylanma yo'llar (sikllar) bo'lishi mumkin. Agar siz ziyorat qilingan tugunlarni belgilab bormasangiz, dastur cheksiz aylanma siklga tushib qoladi va crash bo'ladi.
* **Tuzatish:** Har doim \`visited = {}\` yoki \`Set\` dan foydalanib, o'tilgan tugunlarni belgilang.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Graf (Graph) nima?**
   * *Javob:* Tugunlar (vertices) va ularni bog'lovchi shoxlar (edges) to'plamidan iborat chiziqli bo'lmagan tuzilma.
2. **Yo'naltirilgan (Directed) va Yo'naltirilmagan (Undirected) graf farqi nima?**
   * *Javob:* Yo'naltirilganda shoxlar faqat bir tomonga yo'naltirilgan bo'ladi ($A \\rightarrow B$). Yo'naltirilmaganda esa aloqa ikki tomonlama bo'ladi ($A \\leftrightarrow B$).
3. **Adjacency Matrix va Adjacency List farqi nimada?**
   * *Javob:* Matritsa 2D massiv bo'lib, $O(V^2)$ xotira oladi. List esa har bir tugunning qo'shnilar ro'yxatini saqlaydi va $O(V+E)$ joy oladi.
4. **BFS (Breadth-First Search) qanday ishlaydi va qaysi tuzilmaga tayanadi?**
   * *Javob:* Kenglik bo'yicha qidiruv bo'lib, boshlang'ich tugunning barcha qo'shnilarini birinchi ziyorat qiladi. U Navbat (Queue) tuzilmasiga tayanadi.
5. **DFS (Depth-First Search) qanday ishlaydi va qaysi tuzilmaga tayanadi?**
   * *Javob:* Chuqurlik bo'yicha qidiruv bo'lib, bitta yo'nalish bo'ylab oxirigacha borib, keyin orqaga qaytadi (backtracking). U Stek (Stack) yoki rekursiyaga tayanadi.
6. **Vaznli graf (Weighted Graph) nima?**
   * *Javob:* Har bir shoxga ma'lum bir qiymat (masofa, narx, vazn) biriktirilgan graf turi.
7. **Sikl (Cycle) nima?**
   * *Javob:* Boshlang'ich tugundan boshlab shoxlar bo'ylab harakatlanib, yana o'sha boshlang'ich tugunga qaytish imkonini beruvchi yopiq yo'l.
8. **Daraxt (Tree) va Graf o'rtasidagi bog'liqlik qanday?**
   * *Javob:* Daraxt - bu sikli bo'lmagan va barcha tugunlari bog'langan yo'naltirilmagan maxsus grafdir.
9. **BFS va DFS algoritmlarining vaqt murakkabligi qanday?**
   * *Javob:* Ikkalasida ham $O(V + E)$ bo'ladi, chunki har bir tugun va shox kamida bir marta ziyorat qilinadi.
10. **BFS yordamida vaznsiz grafda qanday masalani tezkor yechish mumkin?**
    * *Javob:* Ikki tugun o'rtasidagi eng qisqa masofani (eng kam qadamlar sonini) topish.
11. **Degree of a Vertex (Tugun darajasi) nima?**
    * *Javob:* Berilgan tugunga bog'langan shoxlar (edges) soni. Yo'naltirilgan graflarda u in-degree va out-degree ga bo'linadi.
12. **Bipartite Graph (Ikki ulushli graf) nima?**
    * *Javob:* Tugunlarini shunday ikkita alohida guruhga ajratish mumkinki, har bir shox faqat turli guruhdagi tugunlarni o'zaro bog'laydi (guruh ichida aloqa bo'lmaydi).

---

## 6. 🎨 Interaktiv Vizual

### Graf va Qo'shnichilik Aloqasi
Tugunlarning bog'lanish chizmasi:

\`\`\`mermaid
graph LR
    A((A)) --- B((B))
    A --- C((C))
    B --- D((D))
    C --- D
    style A fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style B fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style C fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style D fill:#e8f8f5,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Graf amallarini yozib o'rganing.

---

## 8. 📝 12 ta Mini Test

Graf savollaridan o'tib bilimingizni mustahkamlang.

---

## 9. 🚀 Performance va Optimization

- **Matritsadan qachon foydalanish kerak?** Agar graflarda tugunlar soni kichik va aloqalar o'ta ko'p (dense graph) bo'lsa, Adjacency Matrix unumdorroq bo'lishi mumkin.
- **Xotirani tejash:** Tugunlar soni juda katta va aloqalar kam (sparse graph) bo'lsa, har doim Adjacency List'dan foydalaning.

---

## 10. 📌 Cheat Sheet

| Yondashuv | Xotira murakkabligi | Ikki tugun aloqasini tekshirish | Qo'shnilarni topish |
| :--- | :--- | :--- | :--- |
| **Adjacency Matrix** | O(V^2) | O(1) | O(V) |
| **Adjacency List** | O(V + E) | O(degree(V)) | O(degree(V)) |
`,
  exercises: [
    {
      id: 1,
      title: "BFS (Kenglik Bo'yicha Qidiruv)",
      instruction: "Adjacency List ko'rinishidagi graf va boshlang'ich tugun `start` berilgan. Navbat (Queue) yordamida BFS aylanishini bajaradigan va ziyorat qilingan tugunlar tartibini massiv qilib qaytaradigan `bfsTraversal(adjList, start)` funksiyasini yozing.",
      startingCode: "function bfsTraversal(adjList, start) {\n  const visited = new Set();\n  const queue = [start];\n  const result = [];\n  // Kodni yozing\n  return result;\n}",
      hint: "Sikl queue bo'sh bo'lmaguncha ishlasin. `queue.shift()` orqali elementni oling, agar visited'da bo'lmasa, visited'ga qo'shib, result'ga push qiling va uning ziyorat qilinmagan qo'shnilarini queue'ga push qining.",
      test: "const sandbox = new Function(code + '; return bfsTraversal;'); const fn = sandbox(); const adj = { A: ['B', 'C'], B: ['A', 'D'], C: ['A'], D: ['B'] }; const res = fn(adj, 'A'); if (res && res[0] === 'A' && (res[1] === 'B' || res[1] === 'C')) return null; return 'BFS aylanishi noto\\'g\\'ri natija berdi';"
    },
    {
      id: 2,
      title: "Grafda Yo'l Mavjudligini Tekshirish (Path Finder)",
      instruction: "Yo'naltirilgan graf qo'shnichilik ro'yxati `adjList`, boshlang'ich tugun `source` va maqsad `destination` berilgan. DFS yoki BFS yordamida `source`dan `destination`ga olib boruvchi yo'l bor yoki yo'qligini aniqlovchi `hasPath(adjList, source, destination)` funksiyasini yozing. Yo'l bo'lsa `true`, bo'lmasa `false` qaytaring.",
      startingCode: "function hasPath(adjList, source, destination) {\n  // Kodni yozing\n}",
      hint: "Agar source === destination bo'lsa, true qaytaring. Rekursiv DFS orqali har bir qo'shnini tekshiring, ziyorat qilinganlarni eslab qoling.",
      test: "const sandbox = new Function(code + '; return hasPath;'); const fn = sandbox(); const adj = { A: ['B'], B: ['C'], C: [], D: [] }; if (fn(adj, 'A', 'C') === true && fn(adj, 'A', 'D') === false) return null; return 'Yo\\'l mavjudligini aniqlashda xatolik yuz berdi';"
    },
    {
      id: 3,
      title: "Grafdagi Bog'langan Komponentlar Soni",
      instruction: "Yo'naltirilmagan graf berilgan. Undagi o'zaro bog'lanmagan orollar (Connected Components) umumiy sonini hisoblaydigan `countConnectedComponents(adjList)` funksiyasini yozing.",
      startingCode: "function countConnectedComponents(adjList) {\n  const visited = new Set();\n  let count = 0;\n  // Kodni yozing\n  return count;\n}",
      hint: "Grafdagi har bir tugun uchun, agar u hali ziyorat qilinmagan bo'lsa, count-ni oshiring va DFS chaqirib, unga bog'langan barcha tugunlarni visited qilib chiqing.",
      test: "const sandbox = new Function(code + '; return countConnectedComponents;'); const fn = sandbox(); const adj = { 1: [2], 2: [1], 3: [], 4: [5], 5: [4] }; if (fn(adj) === 3) return null; return 'Bog\\'langan komponentlar soni noto\\'g\\'ri hisoblandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Grafda 'Vertex' (Tugun) va 'Edge' (Shox) nima?",
      options: [
        "Vertex - ma'lumotlar bazasi, Edge - uning jadvali",
        "Vertex - obyekt (node), Edge - ikki obyekt o'rtasidagi aloqa (chiziq)",
        "Vertex - faqat sonlar, Edge - matnlar",
        "Ular mutlaqo bir xil narsani anglatadi"
      ],
      correctAnswer: 1,
      explanation: "Graf tugunlar (Vertices) va ularni o'zaro bog'lovchi shoxlar (Edges) yordamida tashkil topadi."
    },
    {
      id: 2,
      question: "Yo'naltirilgan grafda Edge(A, B) nimani anglatadi?",
      options: [
        "A-dan B-ga va B-dan A-ga o'tish mumkinligini",
        "Faqat A-dan B-ga yo'nalish borligini, teskarisi esa kafolatlanmaganini",
        "Ikkala tugun o'chirilganini",
        "A va B tengligini"
      ],
      correctAnswer: 1,
      explanation: "Yo'naltirilgan grafda aloqa bir tomonlama bo'ladi. A-dan B-ga yo'nalgan shox B-dan A-ga qaytishga ruxsat bermaydi."
    },
    {
      id: 3,
      question: "Adjacency Matrix xotira murakkabligi nima uchun O(V^2) bo'ladi?",
      options: [
        "Chunki u faqat massivlarni nusxalaydi",
        "Chunki har bir tugunning boshqa barcha tugunlar bilan aloqasini saqlash uchun V x V o'lchamli 2D matritsa hosil qilinadi",
        "Chunki u rekursiv ishlaydi",
        "Chunki u faqat vaznli graflarda ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "Qo'shnichilik matritsasi barcha tugunlarning o'zaro aloqasini jadval shaklida saqlaydi, bu esa V ta tugun bo'lsa V*V ta katakchani talab qiladi."
    },
    {
      id: 4,
      question: "Grafni aylanib chiqishda 'Visited' (Ziyorat qilinganlar) ro'yxati nega shart?",
      options: [
        "Kodni chiroyli ko'rsatish uchun",
        "Grafda aylanma yo'llar (sikllar) bo'lishi mumkinligi tufayli cheksiz aylanib qolishni oldini olish maqsadida",
        "Xotirani bo'shatish uchun",
        "Dasturni to'xtatish uchun"
      ],
      correctAnswer: 1,
      explanation: "Agar ziyorat qilingan tugunlar saqlab borilmasa, algoritm aylanma yo'llarga (sikllarga) duch kelganda cheksiz aylanib qoladi."
    },
    {
      id: 5,
      question: "BFS (Breadth-First Search) algoritmi qaysi ma'lumotlar tuzilmasiga tayanadi?",
      options: [
        "Stek (Stack)",
        "Navbat (Queue)",
        "Xesh-jadval",
        "Daraxt"
      ],
      correctAnswer: 1,
      explanation: "BFS joriy tugun qo'shnilarini birinchi darajali navbatga qo'yib, FIFO prinsipi asosida ishlash uchun Navbat (Queue) tuzilmasidan foydalanadi."
    },
    {
      id: 6,
      question: "DFS (Depth-First Search) algoritmi qaysi ma'lumotlar tuzilmasiga tayanadi?",
      options: [
        "Navbat (Queue)",
        "Stek (Stack) yoki tizimli Call Stack (rekursiya)",
        "Xesh-jadval",
        "Faqat massivlar"
      ],
      correctAnswer: 1,
      explanation: "DFS bitta shoxdan oxirigacha chuqurlikka kirib, keyin LIFO asosida orqaga qaytishi uchun Stek (Stack) yoki rekursiv chaqiriqlardan foydalanadi."
    },
    {
      id: 7,
      question: "Vaznsiz grafda ikki tugun o'rtasidagi eng qisqa yo'lni topishda qaysi algoritm mos keladi?",
      options: [
        "DFS",
        "BFS",
        "Binary Search",
        "Heap Sort"
      ],
      correctAnswer: 1,
      explanation: "BFS qadamlar bo'yicha kengayib borishi sababli, vaznsiz graflarda eng birinchi yetib borgan yo'l doimo eng qisqa yo'l (eng kam qadamli yo'l) bo'ladi."
    },
    {
      id: 8,
      question: "Adjacency List (Qo'shnichilik ro'yxati) xotira murakkabligi qanday?",
      options: [
        "O(V^2)",
        "O(V + E)",
        "O(E^2)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "Qo'shnichilik ro'yxati faqat mavjud tugunlar (V) va haqiqiy aloqalar (E) uchungina xotira ajratadi, shuning uchun xotira murakkabligi O(V + E) bo'ladi."
    },
    {
      id: 9,
      question: "Grafda 'Degree of a Vertex' (Tugun darajasi) nima?",
      options: [
        "Tugunning xotiradagi bayt o'lchami",
        "Berilgan tugunga bog'langan shoxlar (edges) soni",
        "Grafdagi jami tugunlar soni",
        "Tugunning iyerarxik balandligi"
      ],
      correctAnswer: 1,
      explanation: "Tugunning darajasi unga bevosita ulangan qo'shni shoxlar sonini anglatadi."
    },
    {
      id: 10,
      question: "Bipartite Graph (Ikki ulushli graf) nima?",
      options: [
        "Faqat ikkita tuguni bor graf",
        "Tugunlarini shunday ikkita guruhga ajratish mumkinki, har bir shox faqat turli guruhdagi tugunlarni o'zaro bog'laydi",
        "Hech qanday shoxi bo'lmagan graf",
        "Faqat sikllardan tashkil topgan graf"
      ],
      correctAnswer: 1,
      explanation: "Ikki ulushli grafda tugunlar 2 xil rang bilan shunday bo'yaladiki, hech qaysi bir xil rangdagi qo'shnilar o'zaro ulanmagan bo'ladi."
    },
    {
      id: 11,
      question: "BFS va DFS algoritmlarining umumiy vaqt murakkabligi qanday baholanadi?",
      options: [
        "O(V * E)",
        "O(V + E)",
        "O(V^2)",
        "O(log V)"
      ],
      correctAnswer: 1,
      explanation: "BFS va DFS algoritmlari barcha V ta tugunlarni va E ta shoxlarni kamida bir marta aylanib chiqqanligi sababli vaqt murakkabligi O(V + E) bo'ladi."
    },
    {
      id: 12,
      question: "Tarmoqli yo'naltirilgan grafda sikllar bor yoki yo'qligini aniqlashda qaysi yondashuv yordam beradi?",
      options: [
        "Oddiy BFS",
        "DFS yordamida har bir tugunning rekursiv chaqiruv steki (recursion stack) da qayta uchrashini tekshirish",
        "Saralash algoritmlari",
        "Xesh-jadval o'lchami"
      ],
      correctAnswer: 1,
      explanation: "DFS orqali joriy yo'lda faol turgan tugunlarni kuzatib boramiz. Agar faol yo'ldagi tugunga qaytadan ulanish yuz bersa, grafda sikl (aylanma yo'l) mavjud bo'ladi."
    }
  ]
};

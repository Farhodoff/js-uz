export const dsaDSU = {
  id: "dsaDSU",
  title: "DSU: Disjoint Set Union (Union-Find Algoritmi)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Disjoint Set Union (DSU / O'zaro kesishmaydigan to'plamlar birlashmasi) - bu elementlarni alohida guruhlarga (to'plamlarga) ajratish va ularni o'ta tez birlashtirish hamda bir xil guruhdaligini tekshirish uchun mo'ljallangan yuqori darajada optimallashgan ma'lumotlar tuzilmasidir.

### Do'stlar davrasi va Vakil (Representative) o'xshatishi:
- **Elementlar:** Odamlar. Avvalboshda hamma alohida va har bir kishi o'zining "rahbari" (vakili) hisoblanadi.
- **Find (Qidirish):** "Sening guruh raxbari kim?" deb so'rash. Agar ikki kishining boshlig'i bitta odam bo'lsa, demak ular bitta do'stlar guruhida (connected).
- **Union (Birlashtirish):** Ikki do'stlar davrasini birlashtirish. Buning uchun birinchi guruh rahbari ikkinchi guruh rahbariga bo'ysunadi.
- **Path Compression (Yo'lni qisqartirish/Optimallash):** Guruhdagi har bir a'zo o'zining bevosita boshlig'i orqali emas, balki to'g'ridan-to'g'ri eng yuqoridagi bosh rahbar (Vakil) bilan bog'lanib oladi. Bu keyingi safar "Sening rahbaring kim?" deb so'ralganda bir zumda javob berishga imkon yaratadi.

---

## 2. 💻 Real Kod Misollari

Javaskriptda Path Compression va Union by Rank optimallashlariga ega DSU klassi:

\`\`\`javascript
class DisjointSet {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);
    for (let i = 0; i < size; i++) {
      this.parent[i] = i; // Har bir element boshida o'ziga ota
      this.rank[i] = 0;   // Daraxt balandligi boshida 0
    }
  }

  // Find: Vakilni topish (Path Compression bilan)
  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    // Yo'ldagi barcha elementlarni to'g'ridan-to'g'ri vakilga bog'lab chiqish
    this.parent[i] = this.find(this.parent[i]); 
    return this.parent[i];
  }

  // Union: Birlashtirish (Union by Rank bilan)
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      // Kichik daraxtni kattasining ostiga ulash
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      return true;
    }
    return false; // Allaqachon birlashgan (Sikl bor)
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Ikki Asosiy Optimallash (Optimizations):
1. **Path Compression (Yo'lni qisqartirish):**
   - \`find(i)\` funksiyasi ildiz (vakil)ni qidirib topgach, yo'l-yo'lakay ziyorat qilingan barcha tugunlarning ota tugunini to'g'ridan-to'g'ri ildizga tenglashtirib qo'yadi.
   - Bu daraxtni deyarli tekis (flat) holatga keltiradi.
2. **Union by Rank (Daraxt balandligi bo'yicha birlashtirish):**
   - Guruhlarni birlashtirishda kichik balandlikka ega daraxtni har doim katta daraxt tagiga ulanadi.
   - Bu daraxt balandligi keskin o'sib ketishini oldini oladi.

### Vaqt murakkabligi:
Ushbu ikki optimallash bilan DSU amallarining vaqt murakkabligi deyarli doimiy **$O(\\alpha(N))$** bo'ladi. Bu yerda $\\alpha(N)$ - teskari Akkerma funksiyasi (Inverse Ackermann function) bo'lib, u amalda 5 dan oshmaydi (deyarli $O(1)$ ga teng).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Elementlarni shunchaki \`parent[i] = j\` deb birlashtirish (Rank-siz)
Agar doim bir xil tomonga ulasak, daraxt zanjir kabi uzun bo'lib ketishi mumkin.
* **Tuzatish:** Har doim Union by Rank yoki Union by Size qoidalariga amal qiling. Bu daraxt balandligini logarifmik chegarada ushlab turadi.

---

## 5. 💬 12 ta Intervyu Savollari

1. **DSU (Disjoint Set Union) nima uchun ishlatiladi?**
   * *Javob:* Elementlar to'plamlarini o'zaro birlashtirish (Union) va ularning bir xil guruhdaligini tekshirish (Find) amallarini o'ta tez bajarish uchun.
2. **Find amali nima vazifani bajaradi?**
   * *Javob:* Berilgan element mansub bo'lgan to'plamning bosh vakilini (ildizini/root) qidirib topadi.
3. **Union amali qanday ishlaydi?**
   * *Javob:* Ikki xil element guruhlarini ularning vakillarini aniqlab, bitta vakil ostiga ulash orqali birlashtiradi.
4. **Path Compression (Yo'lni qisqartirish) optimallashining maqsadi nima?**
   * *Javob:* Har bir tugunni to'g'ridan-to'g'ri bosh vakilga ulab, daraxt balandligini minimal qilish va keyingi qidiruvlarni deyarli O(1) ga tushirish.
5. **Union by Rank optimallashining vazifasi nima?**
   * *Javob:* Birlashtirish paytida balandligi pastroq daraxtni balandligi kattaroq daraxt tagiga ulash orqali muvozanatni saqlash.
6. **DSU algoritmining eng optimal vaqt murakkabligi qanday baholanadi?**
   * *Javob:* O(alpha(N)) doimiy vaqt. Bu yerda alpha - teskari Akkerma funksiyasi bo'lib, u amaliyotda har doim 5 dan kichik bo'ladi.
7. **DSU yordamida yo'naltirilmagan grafda sikl (Cycle) borligini qanday aniqlash mumkin?**
   * *Javob:* Agar ulanayotgan ikki tugunning bosh vakillari (find natijasi) allaqachon teng bo'lsa, demak ular o'rtasida yo'l bor va yangi shox sikl hosil qiladi.
8. **Kruskal algoritmi (Minimal yoyuvchi daraxt - MST) da DSU nega kerak?**
   * *Javob:* Shoxlarni vazni bo'yicha qo'shayotganda sikl yuzaga kelishini tezkor aniqlash va oldini olish uchun.
9. **DSU-da dastlabki holatda har bir elementning otasi (parent) nima bo'ladi?**
   * *Javob:* Dastlab har bir element faqat o'zidan iborat alohida to'plam bo'lgani uchun, har bir elementning otasi o'ziga teng qilinadi (\`parent[i] = i\`).
10. **Rank massivi nimani anglatadi?**
    * *Javob:* Har bir element boshchilik qilayotgan daraxtning taxminiy balandligi yoki o'lchamini anglatadi.
11. **Akkerma funksiyasi (Inverse Ackermann Function) nima?**
    * *Javob:* Juda tez o'suvchi matematik funksiyaning teskarisi bo'lib, amalda har qanday real son uchun (masalan $N = 2^{65536}$) uning qiymati 5 dan oshmaydi.
12. **DSU-ni xotira murakkabligi (Space Complexity) qanday?**
    * *Javob:* O(N) xotira, chunki har bir element uchun parent va rank massivlari saqlanadi.

---

## 6. 🎨 Interaktiv Vizual

### Path Compression (Yo'lni Qisqartirish) Tasviri
Zanjirsimon daraxtning flat (tekis) holatga keltirilishi:

\`\`\`mermaid
graph TD
    subgraph Before [Optimallashdan oldin]
        a1((Root)) --> a2((Node 2)) --> a3((Node 3)) --> a4((Node 4))
    end
    subgraph After [Optimallashdan keyin - Path Compressed]
        b1((Root))
        b2((Node 2))
        b3((Node 3))
        b4((Node 4))
        b1 --> b2
        b1 --> b3
        b1 --> b4
    end
    style Before fill:#fadbd8,stroke:#e74c3c,stroke-width:2px
    style After fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mashqlar yordamida DSU tuzilmasini yozing.

---

## 8. 📝 12 ta Mini Test

Bilimingizni tekshiruvchi mini testlar.

---

## 9. 🚀 Performance va Optimization

- **Ikki optimallashni birga qo'llang:** Faqat bitta optimallash (masalan faqat path compression) tezlikni yetarli darajada oshirmaydi. Eng yaxshi natija uchun ikkalasini birga ishlating.

---

## 10. 📌 Cheat Sheet

| Amal | Optimallashtirilmagan DSU | Optimallashtirilgan DSU (Compression + Rank) |
| :--- | :--- | :--- |
| **Find** | O(N) (Zanjir bo'lib ketganda) | O(alpha(N)) ~ O(1) |
| **Union** | O(N) (Zanjir bo'lib ketganda) | O(alpha(N)) ~ O(1) |
| **Space** | O(N) | O(N) |
`,
  exercises: [
    {
      id: 1,
      title: "Sodda Union-Find Klassi (Optimallashlarsiz)",
      instruction: "Path compression va ranksiz, faqat oddiy ota-ona massiviga tayanuvchi `SimpleUnionFind` klassini yozing. Metodlar: `find(i)` va `union(i, j)`. `union` metodi ikki element birlashsa `true`, allaqachon bitta guruhda bo'lsa `false` qaytarsin.",
      startingCode: "class SimpleUnionFind {\n  constructor(size) {\n    this.parent = Array.from({ length: size }, (_, i) => i);\n  }\n  // Metodlarni yozing\n}",
      hint: "find-da parent[i] === i bo'lguncha parent[i] bo'ylab yuring. union-da birinchi root ota-onasini ikkinchi root ota-onasiga bog'lang.",
      test: "const sandbox = new Function(code + '; return SimpleUnionFind;'); const UF = sandbox(); const uf = new UF(5); uf.union(0, 1); uf.union(1, 2); if (uf.find(0) === uf.find(2) && uf.find(0) !== uf.find(3)) return null; return 'SimpleUnionFind xato ishladi';"
    },
    {
      id: 2,
      title: "Path Compression (Yo'lni Qisqartirish) Simulyatori",
      instruction: "Berilgan parent massivi va `i` indeksi bo'yicha uning bosh vakilini topadigan va massivdagi ziyorat qilingan har bir elementni o'sha vakilga to'g'ridan-to'g'ri ulab qo'yadigan `findWithCompression(parent, i)` funksiyasini yozing. Funksiya yakunida vakil indeksini qaytarsin.",
      startingCode: "function findWithCompression(parent, i) {\n  // Kodni yozing\n}",
      hint: "Rekursiv yondashuvdan foydalanib: `if (parent[i] === i) return i; parent[i] = findWithCompression(parent, parent[i]); return parent[i];`",
      test: "const sandbox = new Function(code + '; return findWithCompression;'); const fn = sandbox(); const parent = [0, 0, 1, 2]; const root = fn(parent, 3); if (root === 0 && parent[3] === 0 && parent[2] === 0) return null; return 'Path compression to\\'g\\'ri amalga oshmadi';"
    },
    {
      id: 3,
      title: "Grafdagi Sikllarni Aniqlash (Cycle Detection)",
      instruction: "Tugunlar soni `n` va shoxlar ro'yxati `edges` (masalan: `[[0, 1], [1, 2], [2, 0]]`) berilgan. DSU dan foydalanib, ushbu yo'naltirilmagan grafda sikl (aylanma yo'l) bor yoki yo'qligini aniqlovchi `hasCycle(n, edges)` funksiyasini yozing. Sikl bo'lsa `true`, bo'lmasa `false` qaytsin.",
      startingCode: "function hasCycle(n, edges) {\n  // DSU klassidan yoki parent massividan foydalanib yozing\n}",
      hint: "Dastlab har bir tugun o'ziga ota bo'lgan massiv yarating. Har bir shox [u, v] uchun ularni union qiling. Agar union false qaytarsa (ya'ni vakillari allaqachon teng bo'lsa), demak sikl bor.",
      test: "const sandbox = new Function(code + '; return hasCycle;'); const fn = sandbox(); if (fn(3, [[0, 1], [1, 2], [2, 0]]) === true && fn(3, [[0, 1], [1, 2]]) === false) return null; return 'Sikllarni aniqlashda xatolik yuz berdi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "DSU (Disjoint Set Union) tuzilmasining asosiy vazifasi nima?",
      options: [
        "Massiv elementlarini o'sish tartibida saralash",
        "Elementlarni kesishmaydigan to'plamlarga ajratish va ularni tezkor birlashtirish hamda bir guruhdaligini tekshirish",
        "Matnlardan so'zlarni qidirish",
        "Call Stack to'lib ketishini oldini olish"
      ],
      correctAnswer: 1,
      explanation: "DSU elementlarning guruhlarga bo'linishini boshqaradi. Guruhlarni birlashtirish (Union) va guruh vakilini aniqlash (Find) amallarini tezkor bajaradi."
    },
    {
      id: 2,
      question: "DSU-da 'Find' operatsiyasining vazifasi nima?",
      options: [
        "Yangi element yaratish",
        "Berilgan element mansub bo'lgan to'plamning bosh vakilini (ildizini) aniqlash",
        "Grafdagi barcha shoxlarni o'chirish",
        "Ma'lumotlar turini aniqlash"
      ],
      correctAnswer: 1,
      explanation: "Find operatsiyasi berilgan elementning ota-onalari zanjiri bo'ylab yuqoriga ko'tarilib, eng bosh vakil (ildiz) tugunning indeksini qaytaradi."
    },
    {
      id: 3,
      question: "Path Compression (Yo'lni qisqartirish) optimallashining asosiy foydasi nima?",
      options: [
        "Kodni chiroyli ko'rsatish",
        "Ziyorat qilingan barcha tugunlarni to'g'ridan-to'g'ri bosh vakilga (root) ulab qo'yish orqali keyingi qidiruvlarni deyarli O(1) ga tushirish",
        "Daraxtni butunlay o'chirish",
        "Xavfsizlikni kuchaytirish"
      ],
      correctAnswer: 1,
      explanation: "Yo'l qisqartirilganda zanjirlar qisqaradi va tugunlar to'g'ridan-to'g'ri ildizga ulanadi, bu esa keyingi qidiruvlarni juda tezlashtiradi."
    },
    {
      id: 4,
      question: "Union by Rank optimallashi guruhlarni qanday birlashtiradi?",
      options: [
        "Elementlarni tasodifiy ulaydi",
        "Balandligi pastroq (ranki kichik) daraxtni balandligi kattaroq (ranki katta) daraxt ildiziga ulaydi",
        "Barcha elementlarni massiv boshiga qo'shadi",
        "Faqat manfiy sonli guruhlarni birlashtiradi"
      ],
      correctAnswer: 1,
      explanation: "Union by Rank muvozanatni saqlash usulidir. Kichik daraxtni kattasiga ulash orqali jami daraxt balandligining keraksiz o'sishini oldini oladi."
    },
    {
      id: 5,
      question: "Path Compression va Union by Rank birgalikda qo'llanilganda, DSU amallarining vaqt murakkabligi qanday bo'ladi?",
      options: [
        "O(N)",
        "O(log N)",
        "O(alpha(N)) ~ deyarli O(1)",
        "O(N^2)"
      ],
      correctAnswer: 2,
      explanation: "Har ikki optimallash bilan DSU amallari o'ta tezlashadi va Inverse Ackermann (alpha) murakkabligiga keladi, bu amalda har doim doimiy O(1) vaqtga teng deb olinadi."
    },
    {
      id: 6,
      question: "DSU-da boshlang'ich holatda har bir element uchun ota tugun (parent) sifatida nima o'rnatiladi?",
      options: [
        "Nolinchi element",
        "Elementning o'zi (parent[i] = i)",
        "-1 qiymati",
        "null"
      ],
      correctAnswer: 1,
      explanation: "Dastlab har bir element alohida bir kishilik to'plam bo'lgani uchun, har bir element o'z-o'ziga boshliq bo'ladi."
    },
    {
      id: 7,
      question: "DSU yordamida yo'naltirilmagan grafda sikl (Cycle) borligi qanday aniqlanadi?",
      options: [
        "Faqat barcha tugunlarni DFS aylanib chiqish orqali",
        "Agar qo'shilayotgan shoxning ikki uchi u va v ning bosh vakillari (find natijalari) teng bo'lsa",
        "Obyektlar sonini o'lchash orqali",
        "Uni aniqlab bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Agar u va v allaqachon bitta guruhda bo'lsa va ularning vakillari bir xil bo'lsa, ular orasiga yana bitta shox qo'shish yopiq aylanma yo'l (sikl) hosil qiladi."
    },
    {
      id: 8,
      question: "Kruskal algoritmi (MST) ishlayotganda DSU qanday vazifani bajaradi?",
      options: [
        "Elementlarni o'sish tartibida saralaydi",
        "Eng kichik vaznli shoxlarni tanlab qo'shayotganda sikllar (yopiq halqalar) hosil bo'lishini tezkor aniqlab to'xtatadi",
        "Barcha shoxlar vaznini o'chiradi",
        "Daraxt balandligini hisoblaydi"
      ],
      correctAnswer: 1,
      explanation: "Minimal yoyuvchi daraxtda sikl bo'lishi taqiqlanadi. DSU Kruskal algoritmida har bir shoxni qo'shishdan oldin uning sikl yaratmasligini tezkor tekshirishda xizmat qiladi."
    },
    {
      id: 9,
      question: "Teskari Akkerma funksiyasi (Inverse Ackermann function) qiymati amaliyotda maksimal qanchagacha borishi mumkin?",
      options: [
        "100 gacha",
        "5 dan oshmaydi",
        "Cheksiz o'sadi",
        "Roppa-rosa 10"
      ],
      correctAnswer: 1,
      explanation: "Teskari Akkerma funksiyasi o'ta sekin o'sadi. Hatto koinotdagi atomlar sonidan kattaroq N uchun ham uning qiymati 5 dan oshmaydi."
    },
    {
      id: 10,
      question: "Rank-siz va yo'l qisqartirishlarsiz oddiy DSU eng yomon holatda qidiruv uchun qanday vaqt oladi?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N^2)"
      ],
      correctAnswer: 1,
      explanation: "Hech qanday optimallashtirish bo'lmaganida, DSU zanjir (Linear linked list kabi) ko'rinishga kelib qolishi mumkin va `find` chiziqli O(N) vaqt oladi."
    },
    {
      id: 11,
      question: "DSU xotira murakkabligi (Space Complexity) qanday?",
      options: [
        "O(V^2)",
        "O(N)",
        "O(1)",
        "O(log N)"
      ],
      correctAnswer: 1,
      explanation: "DSU tuzilmasi parent va rank uchun N o'lchamdagi massivlardan foydalanadi, shuning uchun xotira sarfi O(N) chiziqli bo'ladi."
    },
    {
      id: 12,
      question: "Union amali `true` yoki `false` qaytarishi nimani bildiradi?",
      options: [
        "Dasturda xatolik yuz berganini",
        "True - elementlar muvaffaqiyatli birlashganini, False - ular allaqachon bitta guruhda bo'lganini (birlashish bajarilmaganini) bildiradi",
        "Faqat kiritilgan qiymat turi to'g'ri ekanligini",
        "O'zgaruvchi o'chirilganini"
      ],
      correctAnswer: 1,
      explanation: "Union vakillarni taqqoslaydi. Agar ular turli xil bo'lsa, birlashtirib true beradi. Agar teng bo'lsa, birlashish shart emas deb false beradi."
    }
  ]
};

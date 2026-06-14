export const dsaHeaps = {
  id: "dsaHeaps",
  title: "Uyumlar va Navbatlar Ustuvorligi (Heaps & Priority Queues)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Uyum (Heap) - bu Complete Binary Tree (to'liq ikkilik daraxt) qoidalariga asoslangan, maxsus tartiblangan ma'lumotlar tuzilmasidir. U asosan eng katta yoki eng kichik elementni juda tez topish uchun mo'ljallangan.

### Shifoxona qabulxonasi (Triage) o'xshatishi:
- **Oddiy Navbat (FIFO Queue):** Kelgan bemorlar ro'yxatdan o'tish tartibi bo'yicha shifokor qabuliga kirishadi. Kim birinchi kelsa, o'sha kiradi.
- **Priority Queue (Ustuvorlikka ega navbat):** Bemorlarning ahvoliga (ustuvorligiga/priority) qarab navbat belgilanadi. Tez yordam mashinasida kelgan og'ir bemor (eng yuqori ustuvorlik) navbat oxirida tursa ham, birinchi bo'lib qabul qilinadi.
- **Heap (Uyum):** Bu ustuvorlik navbatini xotirada o'ta samarali boshqarish tizimidir. Eng muhim bemor doimo daraxtning eng yuqorisida (ildizida) turadi (**Min-Heap** yoki **Max-Heap**). Biron bemor kirib ketganidan so'ng, qolganlar tezda o'rin almashib, yangi eng muhim bemor tepaga chiqadi (**Heapify**).

---

## 2. 💻 Real Kod Misollari

Javaskriptda massiv yordamida Min-Heap (eng kichik element tepada turadigan uyum) simulyatsiyasi:

\`\`\`javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Ota tugun indeksini topish
  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  // Yangi qiymat qo'shish (O(log N))
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  // Elementni yuqoriga surish (Heap qoidasini tiklash)
  bubbleUp(index) {
    while (index > 0) {
      let parentIdx = this.getParentIndex(index);
      if (this.heap[parentIdx] <= this.heap[index]) break;
      // Qiymatlarni almashtirish
      [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
      index = parentIdx;
    }
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Massivda saqlash (Array Representation):
Uyum to'liq ikkilik daraxt (Complete Binary Tree) bo'lgani uchun, uning tugunlarini pointerlarsiz, oddiy bir o'lchamli massivda xotirani tejagan holda saqlash mumkin:
- Agar tugun indeksini $i$ deb olsak:
  - Chap farzand indeksi: $2i + 1$
  - O'ng farzand indeksi: $2i + 2$
  - Ota tugun indeksi: $\\lfloor (i - 1) / 2 \\rfloor$

### Heap turlari:
1. **Max-Heap:** Har bir ota tugunning qiymati uning farzandlari qiymatidan katta yoki teng bo'ladi. Eng katta element doimo 0-indeksda (root) turadi.
2. **Min-Heap:** Har bir ota tugunning qiymati farzandlaridan kichik yoki teng bo'ladi. Eng kichik element doimo 0-indeksda (root) turadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Uyum (Heap) bilan Saralangan Massivni adashtirish
Ko'pchilik uyumni massivda saqlagani uchun u har doim saralangan bo'ladi deb o'ylaydi.
* **Tushuntirish:** Uyum faqatgina ota va bola o'rtasidagi munosabatni kafolatlaydi (yarim-tartiblangan). Chap va o'ng shoxlar o'zaro saralangan bo'lishi shart emas. Masalan, \`[10, 30, 20, 40, 50]\` to'g'ri Min-Heap hisoblanadi, lekin saralanmagan.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Heap (Uyum) ma'lumotlar tuzilmasi nima?**
   * *Javob:* Maxsus tartiblangan to'liq ikkilik daraxt (Complete Binary Tree) bo'lib, ota va bola qiymatlari o'zaro munosabatda bo'ladi.
2. **Min-Heap va Max-Heap farqi nimada?**
   * *Javob:* Min-Heapda eng kichik qiymat, Max-Heapda esa eng katta qiymat doimo tepada (root tugunda) saqlanadi.
3. **Complete Binary Tree bo'lishining massivda saqlashga qanday foydasi bor?**
   * *Javob:* Massivda bo'shliqlar (null qiymatlar) qolmasdan elementlarni ketma-ket, pointerlarsiz ixcham saqlash va indekslar matematikasi yordamida tezkor harakatlanish imkonini beradi.
4. **Uyumda element qo'shish (insert) qanday vaqt oladi?**
   * *Javob:* O(log N) vaqt oladi, chunki element oxiriga qo'shilib, faqat o'z shoxi bo'ylab yuqoriga suriladi (bubble up).
5. **Uyumdan eng yuqori elementni o'chirish (extract min/max) nega O(log N) vaqt oladi?**
   * *Javob:* Root element olingach, massiv oxiridagi element uning o'rniga qo'yiladi va heap qoidasini tiklash uchun pastga suriladi (sink down / heapify).
6. **Uyum yordamida saralash (Heap Sort) algoritmining vaqt murakkabligi qanday?**
   * *Javob:* O(N log N) vaqt oladi. Bu barcha elementlarni uyumga joylab, ketma-ket extract qilish orqali bajariladi.
7. **Heapify operatsiyasi nima?**
   * *Javob:* Berilgan massivni uyum qoidalariga mos keladigan holatga keltirish (tartibga solish) jarayoni.
8. **Oddiy massivni to'g'ridan-to'g'ri uyumga aylantirish (Build Heap) qanday vaqt oladi?**
   * *Javob:* Optimallashtirilgan usulda pastdan yuqoriga qarab heapify qilish orqali O(N) vaqtda bajariladi.
9. **Priority Queue (Ustuvorlik Navbati) nima?**
   * *Javob:* Har bir element ma'lum bir ustuvorlik darajasiga ega bo'lgan va elementlar faqat o'sha ustuvorlik bo'yicha navbatdan chiqadigan maxsus navbat turi.
10. **Priority Queue-ni amalga oshirishda nega massivdan ko'ra Heap afzal?**
    * *Javob:* Massivda eng ustuvor elementni olish yoki qo'shish O(N) vaqt olsa, Heap-da bu amallar O(log N) vaqtda tezroq bajariladi.
11. **Uyumda ixtiyoriy elementni qidirish (search) qanday vaqt oladi?**
    * *Javob:* O(N) vaqt oladi, chunki uyum qidirish uchun moslashmagan, elementlar to'liq saralanmagan bo'ladi.
12. **Nima uchun heap xotira (Heap Memory) va uyum (Heap) tushunchalari o'zaro bog'liq emas?**
    * *Javob:* Ular shunchaki bir xil nomga ega. Heap xotira - operatsion tizimning dinamik xotira hovuzi. Heap ma'lumotlar tuzilmasi esa daraxtga asoslangan matematik strukturadir.

---

## 6. 🎨 Interaktiv Vizual

### Min-Heap Massivdagi Indekslanish Ko'rinishi
Massiv elementlarining daraxt ko'rinishida taqsimlanishi:

\`\`\`mermaid
graph TD
    n0((Idx 0: value 10))
    n1((Idx 1: value 20))
    n2((Idx 2: value 30))
    n3((Idx 3: value 40))
    n4((Idx 4: value 50))
    n0 --> n1
    n0 --> n2
    n1 --> n3
    n1 --> n4
    style n0 fill:#e8f8f5,stroke:#27ae60,stroke-width:2px
    style n1 fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style n2 fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni yeching.

---

## 8. 📝 12 ta Mini Test

Testlar orqali o'zlashtirishni tekshiring.

---

## 9. 🚀 Performance va Optimization

- **Build Heap optimallashtirish:** Elementlarni birma-bir insert qilgandan ko'ra (\`O(N log N)\`), tayyor massivni o'rtasidan boshlab pastga qarab heapify qilish (\`O(N)\`) ancha samarali.

---

## 10. 📌 Cheat Sheet

| Amal turi | Heap (Uyum) unumdorligi | Tartiblangan Massiv unumdorligi |
| :--- | :--- | :--- |
| **Get Min/Max** | O(1) | O(1) |
| **Insert** | O(log N) | O(N) (surish kerak) |
| **Extract Min/Max** | O(log N) | O(1) / O(N) |
| **Search** | O(N) | O(log N) (binary search) |
`,
  exercises: [
    {
      id: 1,
      title: "Uyum Qoidasini Tekshirish (Is Min-Heap?)",
      instruction: "Berilgan sonlar massivi `arr` to'g'ri Min-Heap qoidalariga mos kelishini aniqlovchi `isMinHeap(arr)` funksiyasini yozing. Agar har bir ota tugun o'z farzandlaridan kichik yoki teng bo'lsa `true`, aks holda `false` qaytsin.",
      startingCode: "function isMinHeap(arr) {\n  // Kodni yozing\n}",
      hint: "Sikl yordamida har bir `i` indeks uchun chap `2*i + 1` va o'ng `2*i + 2` farzandlarni tekshiring. Agar ular massiv doirasida bo'lsa va otadan kichik bo'lsa, false qaytaring.",
      test: "const sandbox = new Function(code + '; return isMinHeap;'); const fn = sandbox(); if (fn([10, 20, 30, 40, 50]) === true && fn([10, 50, 30, 40, 20]) === false) return null; return 'Min-Heap tekshiruvi xato ishladi';"
    },
    {
      id: 2,
      title: "Massivdan Max-Heap Yaratish (Heapify)",
      instruction: "Berilgan ixtiyoriy sonlar massivini o'z joyida (in-place) Max-Heap holatiga keltiruvchi `buildMaxHeap(arr)` funksiyasini yozing. Funksiya o'zgartirilgan massivni qaytarsin.",
      startingCode: "function buildMaxHeap(arr) {\n  // Kodni yozing\n  return arr;\n}",
      hint: "Massiv o'rtasidan boshlab (`Math.floor(arr.length / 2) - 1`) nolinchi indeksgacha pastga qarab sinkDown (heapify) funksiyasini chaqiring.",
      test: "const sandbox = new Function(code + '; return buildMaxHeap;'); const fn = sandbox(); const res = fn([3, 1, 5, 4, 2]); if (res && res[0] === 5 && res[1] === 4) return null; return 'Max-Heap to\\'g\\'ri hosil qilinmadi';"
    },
    {
      id: 3,
      title: "K ta Eng Katta Elementlar (K Largest Elements)",
      instruction: "Berilgan tartibsiz sonlar massivi `nums` ichidan eng katta `k` ta elementni o'sish tartibida massiv qilib qaytaradigan `kLargest(nums, k)` funksiyasini yozing. (Maslahat: Min-Heap yordamida yechish tavsiya etiladi).",
      startingCode: "function kLargest(nums, k) {\n  // Kodni yozing\n}",
      hint: "k o'lchamli Min-Heap saqlang. Agar yangi element topilsa va u heapdagi eng kichik (ildiz) elementdan katta bo'lsa, eng kichigini o'chirib yangisini qo'shing.",
      test: "const sandbox = new Function(code + '; return kLargest;'); const fn = sandbox(); const res = fn([3, 2, 1, 5, 6, 4], 2); if (res && res[0] === 5 && res[1] === 6) return null; return 'K ta eng katta elementlar topilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Max-Heap uyumida eng katta qiymat doimo qayerda saqlanadi?",
      options: [
        "Massivning eng oxirgi indeksida",
        "Daraxtning eng yuqori tugunida (0-indeks, root node)",
        "Chap shoxning bargida",
        "O'rtadagi ixtiyoriy tugunda"
      ],
      correctAnswer: 1,
      explanation: "Max-Heap qoidasiga ko'ra, har bir ota o'z bolalaridan katta bo'lishi shart. Shu sababli eng katta qiymat doimo eng yuqorida (root) bo'ladi."
    },
    {
      id: 2,
      question: "Complete Binary Tree-ning massivdagi ota tugun indeksi formulasi qanday (indeks 0-dan boshlanganda)?",
      options: [
        "i / 2",
        "Math.floor((i - 1) / 2)",
        "2 * i + 1",
        "i - 1"
      ],
      correctAnswer: 1,
      explanation: "Nodning chap farzandi $2i+1$, o'ngi $2i+2$ bo'lsa, ota tugun indeksi doimo $\\lfloor (i-1)/2 \\rfloor$ orqali aniqlanadi."
    },
    {
      id: 3,
      question: "Uyumda (Heap) 'Bubble Up' operatsiyasi qachon chaqiriladi?",
      options: [
        "Uyumdan element o'chirilganda",
        "Yangi element massiv oxiriga qo'shilganda va uni yuqoriga surib o'z o'rnini topish kerak bo'lganda",
        "Jadval o'lchami kattalashganda",
        "Faqat rekursiya to'xtaganda"
      ],
      correctAnswer: 1,
      explanation: "Yangi element uyum oxiriga push qilingandan so'ng, uyum qoidasini tiklash uchun u ota tugunlar bilan solishtirilib, o'z o'rnini topguncha yuqoriga ko'tariladi (bubble up)."
    },
    {
      id: 4,
      question: "Priority Queue (Ustuvorlik Navbati) nima?",
      options: [
        "Faqat birinchi kirgan element birinchi chiqadigan standart navbat",
        "Elementlar kiritilish tartibiga qarab emas, balki ularning ustuvorlik (priority) qiymatlariga qarab navbatdan olinadigan navbat",
        "Matnlar ustida tezkor ishlaydigan massiv",
        "Faqat xatolarni saqlaydigan ro'yxat"
      ],
      correctAnswer: 1,
      explanation: "Ustuvorlik navbatida har bir elementning ustuvorligi bo'ladi. Eng yuqori ustuvorlikka ega element birinchi chiqadi."
    },
    {
      id: 5,
      question: "Dinamik massiv yordamida Priority Queue yaratishning Heap ishlatishga qaraganda kamchiligi nimada?",
      options: [
        "Unda elementlarni o'qib bo'lmasligi",
        "Qo'shish yoki eng ustuvor elementni qidirib o'chirish amallari chiziqli O(N) vaqt olib sekinlashishi (Heap-da esa O(log N))",
        "Massivning xotiradan juda ko'p joy olishi",
        "Faqat sonlar saqlay olishi"
      ],
      correctAnswer: 1,
      explanation: "Saralanmagan massivda eng katta elementni o'chirish O(N) qidirishni talab qiladi. Saralanganida esa qo'shish O(N) surish talab qiladi. Heap esa ikkalasini ham O(log N) da bajaradi."
    },
    {
      id: 6,
      question: "Complete Binary Tree-da index $i$ dagi nodening chap farzand indeksi qaysi formula orqali topiladi?",
      options: [
        "2 * i",
        "2 * i + 1",
        "2 * i + 2",
        "i + 2"
      ],
      correctAnswer: 1,
      explanation: "Chap farzand formulasi $2i + 1$ ga teng, o'ng farzandniki esa $2i + 2$ bo'ladi."
    },
    {
      id: 7,
      question: "BUILD-HEAP (tayyor massivdan uyum yaratish) operatsiyasining eng optimal vaqt murakkabligi qanday?",
      options: [
        "O(1)",
        "O(N)",
        "O(N log N)",
        "O(N^2)"
      ],
      correctAnswer: 1,
      explanation: "Bottom-up (pastdan yuqoriga) yondashuvi yordamida massivni uyumga aylantirish matematik jihatdan isbotlangan O(N) vaqtni oladi."
    },
    {
      id: 8,
      question: "Heap (Uyum) ichida ixtiyoriy elementni qidirish (Search) nega O(N) vaqt oladi?",
      options: [
        "Chunki u daraxt shaklida emas",
        "Chunki elementlar to'liq saralanmagan (faqat ota va bola o'rtasida munosabat bor), shuning uchun butun massivni aylanib qidirish lozim",
        "Chunki xesh funksiya yo'q",
        "Chunki qidiruv taqiqlangan"
      ],
      correctAnswer: 1,
      explanation: "Uyum binary search tree kabi chapda kichik, o'ngda katta qoidasiga bo'ysunmaydi. Elementlar yarim-tartiblangan bo'lgani uchun binary search qilib bo'lmaydi va chiziqli qidirishga to'g'ri keladi."
    },
    {
      id: 9,
      question: "Max-Heap-dan eng katta elementni olish (Extract Max) qanday bajariladi?",
      options: [
        "0-indeks o'chiriladi va barcha elementlar chapga suriladi",
        "0-indeksdagi element massivning oxirgi elementi bilan almashtiriladi, oxirgisi o'chiriladi va yangi root pastga qarab 'sink down' (heapify) qilinadi",
        "Butun massiv qaytadan saralanadi",
        "Faqat rekursiv chaqiruv bilan o'chiriladi"
      ],
      correctAnswer: 1,
      explanation: "Tezlikni ta'minlash uchun oxirgi element tepaga qo'yiladi (bu Complete Tree shaklini saqlaydi) va u mos o'rniga tushguncha bolalari bilan solishtirilib pastga suriladi."
    },
    {
      id: 10,
      question: "Heap Sort (Uyumli saralash) algoritmi vaqt va qo'shimcha xotira murakkabligi qanday?",
      options: [
        "O(N log N) vaqt, O(N) qo'shimcha xotira",
        "O(N log N) vaqt, O(1) qo'shimcha xotira (in-place)",
        "O(N^2) vaqt, O(1) qo'shimcha xotira",
        "O(N) vaqt, O(log N) xotira"
      ],
      correctAnswer: 1,
      explanation: "Heap Sort massivning o'zini uyumga keltirib va in-place tarzda elementlarni oxiriga yig'ib borishi sababli qo'shimcha xotira talab qilmaydi (O(1) space) va O(N log N) vaqt oladi."
    },
    {
      id: 11,
      question: "Uyumda (Heap) ota va farzandlar o'rtasida qaysi munosabat to'g'ri?",
      options: [
        "Chap farzand doimo o'ng farzanddan katta bo'lishi shart",
        "Ota tugun qiymati o'z farzandlari qiymatiga nisbatan ma'lum bir munosabatda (kichik yoki katta) bo'lishi kerak, lekin chap va o'ng farzandlar o'zaro tartiblanishi shart emas",
        "Barcha ota tugunlar faqat toq sonlar bo'lishi kerak",
        "Farzandlar otadan doimo katta bo'lishi kerak"
      ],
      correctAnswer: 1,
      explanation: "Uyum faqat ota-bola tartibini kafolatlaydi, shuning uchun u to'liq saralanmagan yoki yarim-tartiblangan tuzilmadir."
    },
    {
      id: 12,
      question: "Min-Heap uyumida eng katta element qayerda joylashgan bo'ladi?",
      options: [
        "Doimo 0-indeksdagi root tugunda",
        "Daraxtning eng pastki darajasidagi barg (leaf) tugunlaridan birida",
        "Daraxtning chap tomonidagi birinchi tugunda",
        "Daraxtda bunday element bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Min-Heapda kichiklar tepaga intiladi. Demak, eng katta elementlar eng pastda, ya'ni barg (leaf) tugunlarda bo'lishi kafolatlanadi."
    }
  ]
};

export const linkedLists = {
  id: "linkedLists",
  title: "Bog'langan Ro'yxatlar (Linked Lists)",
  theory: `## 1. NEGA kerak?
Massivlar (Arrays) xotirada ketma-ket (contiguous) bloklarda saqlanadi. Bu ulardan indeks bo'yicha element olishni o'ta tez ($O(1)$) qilsa-da, massiv o'rtasiga yoki boshiga yangi element qo'shish yoki o'chirish juda qimmat amaliyotdir ($O(n)$), chunki qolgan barcha elementlarni siljitish (shift) kerak bo'ladi.
**Linked List** (Bog'langan ro'yxat) esa bu muammoni xotiraning ixtiyoriy qismida joylashgan tugunlar (Nodes) orqali hal qiladi. Har bir tugun o'zida ma'lumotni va keyingi tugunga ko'rsatkichni (pointer/reference) saqlaydi. Bu boshiga yoki oxiriga element qo'shish/o'chirishni o'ta samarali ($O(1)$) qiladi va xotirani dinamik kengaytirish imkonini beradi.

## 2. SODDALIK (Analogiya)
Massivni **poezd vagonlariga** o'xshatish mumkin: vagonlar qat'iy ketma-ket ulanadi, 1-vagon bilan 3-vagon orasiga yangi vagon suqish uchun butun poezdni ajratib, siljitish kerak.
Linked List esa **xazinani izlash o'yiniga (Treasure Hunt)** o'xshaydi: siz birinchi manzildasiz, u yerda xazina (qiymat) va keyingi manzil yozilgan qog'ozcha (ko'rsatkich) bor. Manzillar xotiraning istalgan chekkasida tartibsiz yotishi mumkin, lekin siz zanjir bo'yicha biridan ikkinchisiga o'ta olasiz.

## 3. STRUKTURA VA TURLARI

### A. Bog'langan ro'yxat turlari
1. **Singly Linked List (Bir tomonlama):** Har bir tugunda faqat keyingi tugunga havola (\`next\`) bo'ladi. Orqaga qaytib bo'lmaydi.
2. **Doubly Linked List (Ikki tomonlama):** Har bir tugunda keyingi (\`next\`) va oldingi (\`prev\`) tugunlarga havola bo'ladi. Har ikki tomonga yurish mumkin.
3. **Circular Linked List (Aylanma):** Oxirgi tugunning \`next\` ko'rsatkichi \`null\` bo'lish o'rniga, qaytadan boshidagi \`head\` tugunga bog'langan bo'ladi.

\`mermaid
graph LR
    subgraph Singly ["Bir tomonlama (Singly)"]
        S1["[ 10 | next ]"] --> S2["[ 20 | next ]"] --> S3["[ 30 | null ]"]
    end
    subgraph Doubly ["Ikki tomonlama (Doubly)"]
        D1["[ null | 10 | next ]"]
        D2["[ prev | 20 | next ]"]
        D3["[ prev | 30 | null ]"]
        D1 === D2
        D2 === D3
    end
\`

### B. Xotira taqsimoti va Kesh-lokallik
Massivlardan farqli o'laroq, Linked List elementlari xotirada ketma-ket joylashmaydi. Bu esa protsessor uchun **Cache Locality** (kesh yaqinligi) muammosini keltirib chiqaradi. Protsessor massiv elementlarini o'qiyotganda keshga ketma-ket yuklaydi va keyingi elementlarni o'ta tez o'qiydi. Linked List-da esa ko'rsatkich bo'yicha xotiraning boshqa chekkasiga murojaat qilish kesh yuklanishining barbod bo'lishiga (Cache Miss) olib keladi.

### C. Sentinel Nodes (Dummy Nodes)
Algoritmlarni yozishda, ayniqsa boshiga element qo'shish yoki o'chirish kabi operatsiyalarda \`head\` o'zgaruvchisi null bo'lishi chekka holatini oson boshqarish uchun biz **Dummy Node** (soxta tugun) dan foydalanamiz. U hech qanday foydali qiymat saqlamaydi, faqat zanjir boshlanishiga havola beradi.

\`mermaid
graph TD
    classDef main fill:#3498db,stroke:#2980b9,color:#fff;
    classDef temp fill:#e74c3c,stroke:#c0392b,color:#fff;
    
    A["Tugun A"]:::main
    B["Tugun B"]:::main
    New["Yangi Tugun"]:::temp

    A -- "Eski next ko'rsatkichi" --> B
    A -. "1. Yangi next yo'nalishi" .-> New
    New -. "2. Yangi tugun next ko'rsatkichi" .-> B
\`

## 4. AMALIYOT
Singly Linked List tuguni (Node) va uning tuzilishi:
\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
\`

### Zanjir bo'ylab yurish (Traversal)
\`javascript
let current = head;
while (current !== null) {
  console.log(current.value);
  current = current.next;
}
\`

## 5. XATOLAR (Common mistakes)
1. **Zanjirni uzib qo'yish (Lost references):** Elementni o'chirish yoki o'rtasiga qo'shish paytida havolalarni to'g'ri bog'lamaslik zanjirning qolgan qismi xotirada yo'qolishiga (Garbage Collection tomonidan o'chirilishiga) olib keladi.
2. **Cheksiz siklga tushib qolish:** Agar ro'yxatda aylanma bog'lanish (Cycle) hosil bo'lsa va to'xtash sharti qo'yilmasa, \`while (current !== null)\` sikli cheksiz aylanadi.
3. **Null pointer xatosi:** Bo'sh ro'yxatda (head = null) \`head.next\` ni chaqirish \`TypeError: Cannot read properties of null\` xatosini beradi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Linked List nima?**
Xotiraning turli joylarida joylashgan va bir-biriga havolalar orqali bog'langan tugunlardan iborat chiziqli ma'lumotlar tuzilmasi.

**2. Massiv va Linked List farqi nima?**
Massiv xotirada ketma-ket blokda joylashadi va hajmi qat'iy, Linked List esa xotirada tarqoq joylashadi va hajmi dinamik o'zgaradi.

**3. Linked List boshiga element qo'shishning vaqt murakkabligi qanday?**
$O(1)$ ga teng, chunki yangi tugun yaratilib, uning next xossasi head ga yo'naltiriladi.

**4. Linked List o'rtasidan element qidirish murakkabligi qanday?**
$O(n)$, chunki indeks yo'q va elementni topish uchun boshidan boshlab bittalab zanjirni yurib chiqish kerak.

**5. Doubly Linked List-ning afzalligi nimada?**
Elementlarni ham oldinga, ham orqaga qarab aylanib chiqish imkoniyati borligi va elementni o'chirish osonroq kechishida.

**6. Circular Linked List nima?**
Oxirgi tugun keyingi tugun sifatida null-ga emas, balki ro'yxat boshidagi head tugunga bog'langan yopiq aylanma zanjir.
`,
  exercises: [
    {
      id: 1,
      title: "Singly Linked List Tuguni (Node)",
      instruction: "Singly Linked List uchun qiymat (`value`) va keyingi element havolasi (`next = null`) bilan ishga tushadigan `Node` klassini yozing.",
      startingCode: "class Node {\n  // Constructor yarating\n}",
      hint: "constructor(value) { this.value = value; this.next = null; }",
      test: "if (typeof Node !== 'function') return 'Node klassi topilmadi'; const n = new Node(10); if (n.value !== 10 || n.next !== null) return 'Node xossalari noto\\'g\\'ri sozlandi'; return null;"
    },
    {
      id: 2,
      title: "LinkedList oxiriga element qo'shish (Append)",
      instruction: "LinkedList klassida `append(value)` metodini yozing. U yangi Node yaratib, ro'yxat oxiriga qo'shishi kerak.",
      startingCode: "class Node {\n  constructor(value) { this.value = value; this.next = null; }\n}\nclass LinkedList {\n  constructor() { this.head = null; }\n  append(value) {\n    const newNode = new Node(value);\n    if (!this.head) {\n      this.head = newNode;\n      return;\n    }\n    // Oxirgi elementgacha boring va bog'lang\n  }\n}",
      hint: "let curr = this.head; while(curr.next) curr = curr.next; curr.next = newNode;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); list.append(5); list.append(10); if (!list.head || list.head.value !== 5) return 'Boshiga qo\\'shilmadi'; if (!list.head.next || list.head.next.value !== 10) return 'Oxiriga to\\'g\\'ri qo\\'shilmadi'; return null;"
    },
    {
      id: 3,
      title: "LinkedList boshiga element qo'shish (Prepend)",
      instruction: "LinkedList klassining `prepend(value)` metodini yozing. U yangi Node yaratib, ro'yxat boshiga (head) joylashtirishi kerak.",
      startingCode: "class Node {\n  constructor(value) { this.value = value; this.next = null; }\n}\nclass LinkedList {\n  constructor() { this.head = null; }\n  prepend(value) {\n    // Boshiga element qo'shing\n  }\n}",
      hint: "const newNode = new Node(value); newNode.next = this.head; this.head = newNode;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); list.prepend(20); list.prepend(10); if (list.head.value !== 10 || list.head.next.value !== 20) return 'Boshiga to\\'g\\'ri prepend qilinmadi'; return null;"
    },
    {
      id: 4,
      title: "LinkedList qidiruv (Find)",
      instruction: "LinkedList tarkibidan berilgan `value`ga ega tugunni izlab qaytaradigan `find(value)` metodini yozing (topilmasa null).",
      startingCode: "class LinkedList {\n  constructor() { this.head = null; }\n  find(value) {\n    let curr = this.head;\n    // Zanjir bo'yicha qidiring\n  }\n}",
      hint: "while(curr) { if(curr.value === value) return curr; curr = curr.next; } return null;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); list.head = { value: 5, next: { value: 10, next: null } }; if (!list.find(10) || list.find(10).value !== 10) return 'Mavjud element topilmadi'; if (list.find(15) !== null) return 'Mavjud bo\\'lmagan element uchun null qaytarilishi kerak'; return null;"
    },
    {
      id: 5,
      title: "LinkedList element o'chirish (Delete)",
      instruction: "LinkedList-dan berilgan qiymatli birinchi tugunni o'chiradigan `delete(value)` metodini yozing.",
      startingCode: "class LinkedList {\n  constructor() { this.head = null; }\n  delete(value) {\n    if (!this.head) return;\n    if (this.head.value === value) {\n      this.head = this.head.next;\n      return;\n    }\n    // O'chirish logikasini yozing\n  }\n}",
      hint: "let curr = this.head; while(curr.next) { if(curr.next.value === value) { curr.next = curr.next.next; return; } curr = curr.next; }",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); list.head = { value: 1, next: { value: 2, next: { value: 3, next: null } } }; list.delete(2); if (list.head.next.value !== 3) return 'Element to\\'g\\'ri o\\'chirilmadi'; return null;"
    },
    {
      id: 6,
      title: "Ro'yxat o'lchami (getSize)",
      instruction: "LinkedList-dagi jami tugunlar sonini hisoblaydigan `getSize()` metodini yozing.",
      startingCode: "class LinkedList {\n  constructor() { this.head = null; }\n  getSize() {\n    let count = 0;\n    // Tugunlarni sanang\n  }\n}",
      hint: "let curr = this.head; while(curr) { count++; curr = curr.next; } return count;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); if(list.getSize() !== 0) return 'Bo\\'sh ro\\'yxat uchun 0 bo\\'lishi shart'; list.head = { value: 1, next: { value: 2, next: null } }; if (list.getSize() !== 2) return 'O\\'lcham noto\\'g\\'ri hisoblandi'; return null;"
    },
    {
      id: 7,
      title: "LinkedList-ni teskarilash (Reverse)",
      instruction: "LinkedList-ni joyida (in-place) teskarilaydigan `reverse()` metodini yozing (head-ni teskari zanjir boshiga to'g'rilang).",
      startingCode: "class LinkedList {\n  constructor() { this.head = null; }\n  reverse() {\n    let prev = null, curr = this.head, next = null;\n    // Havolalar yo'nalishini o'zgartiring\n  }\n}",
      hint: "while(curr) { next = curr.next; curr.next = prev; prev = curr; curr = next; } this.head = prev;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); list.head = { value: 1, next: { value: 2, next: null } }; list.reverse(); if (list.head.value !== 2 || list.head.next.value !== 1) return 'Zanjir teskari o\\'girilmadi'; return null;"
    },
    {
      id: 8,
      title: "Doubly Linked List Tuguni",
      instruction: "Doubly Linked List uchun qiymat (`value`), keyingi (`next = null`) va oldingi (`prev = null`) havolalari bor `DLLNode` klassini yozing.",
      startingCode: "class DLLNode {\n  // Constructor yarating\n}",
      hint: "constructor(value) { this.value = value; this.next = null; this.prev = null; }",
      test: "if (typeof DLLNode !== 'function') return 'DLLNode klassi topilmadi'; const n = new DLLNode(5); if (n.value !== 5 || n.next !== null || n.prev !== null) return 'DLLNode xossalari xato'; return null;"
    },
    {
      id: 9,
      title: "DLL oxiriga qo'shish (Append)",
      instruction: "Doubly Linked List uchun oxiriga element qo'shuvchi `append(value)` metodini yozing.",
      startingCode: "class DLLNode {\n  constructor(value) { this.value = value; this.next = null; this.prev = null; }\n}\nclass DoublyLinkedList {\n  constructor() { this.head = null; this.tail = null; }\n  append(value) {\n    const newNode = new DLLNode(value);\n    if (!this.head) {\n      this.head = newNode; this.tail = newNode; return;\n    }\n    // Oxiriga ulab tail-ni yangilang\n  }\n}",
      hint: "this.tail.next = newNode; newNode.prev = this.tail; this.tail = newNode;",
      test: "if (typeof DoublyLinkedList !== 'function') return 'DoublyLinkedList topilmadi'; const list = new DoublyLinkedList(); list.append(5); list.append(10); if (list.tail.value !== 10 || list.tail.prev.value !== 5) return 'Tail yoki prev ko\\'rsatkichlari bog\\'lanmadi'; return null;"
    },
    {
      id: 10,
      title: "DLL Oxirgi elementini o'chirish",
      instruction: "Doubly Linked List oxirgi elementini (tail) o'chiradigan `deleteTail()` metodini yozing.",
      startingCode: "class DoublyLinkedList {\n  constructor() { this.head = null; this.tail = null; }\n  deleteTail() {\n    if (!this.tail) return;\n    if (this.head === this.tail) {\n      this.head = null; this.tail = null; return;\n    }\n    // Tail-ni o'chiring\n  }\n}",
      hint: "this.tail = this.tail.prev; this.tail.next = null;",
      test: "if (typeof DoublyLinkedList !== 'function') return 'DoublyLinkedList topilmadi'; const list = new DoublyLinkedList(); const n1 = { value: 1, prev: null }; const n2 = { value: 2, prev: n1 }; n1.next = n2; list.head = n1; list.tail = n2; list.deleteTail(); if (list.tail.value !== 1 || list.tail.next !== null) return 'Tail to\\'g\\'ri o\\'chirilmadi'; return null;"
    },
    {
      id: 11,
      title: "O'rtadagi tugunni topish (Middle Node)",
      instruction: "LinkedList o'rtasidagi elementni topuvchi `findMiddle()` metodini yozing (fast va slow pointer yondashuvini ishlating).",
      startingCode: "class LinkedList {\n  constructor() { this.head = null; }\n  findMiddle() {\n    let slow = this.head, fast = this.head;\n    // slow bitta, fast ikkita qadam tashlasin\n  }\n}",
      hint: "while(fast && fast.next) { slow = slow.next; fast = fast.next.next; } return slow;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); list.head = { value: 1, next: { value: 2, next: { value: 3, next: null } } }; if (list.findMiddle().value !== 2) return 'O\\'rtadagi element noto\\'g\\'ri aniqlandi'; return null;"
    },
    {
      id: 12,
      title: "Sikl aniqlash (Cycle Detection)",
      instruction: "LinkedList-da sikl (aylanma bog'lanish) bor yoki yo'qligini tekshiradigan `hasCycle()` metodini yozing (true/false).",
      startingCode: "class LinkedList {\n  constructor() { this.head = null; }\n  hasCycle() {\n    let slow = this.head, fast = this.head;\n    // pointerlarni tekshiring\n  }\n}",
      hint: "while (fast && fast.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow === fast) return true;\n}\nreturn false;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi'; const list = new LinkedList(); const n1 = { value: 1 }; const n2 = { value: 2 }; n1.next = n2; n2.next = n1; list.head = n1; if (list.hasCycle() !== true) return 'Sikl borligi aniqlanmadi'; n2.next = null; if (list.hasCycle() !== false) return 'Siklsiz zanjirda xato natija berildi'; return null;"
    },
    {
      id: 13,
      title: "Oxiridan N-chi elementni topish (Find Nth from End)",
      instruction: "Singly Linked List oxiridan boshlab `n`-chi tugunni bitta siklda (bir marta aylanib) topuvchi `findNthFromEnd(n)` metodini yozing. (Agar ro'yxat uzunligi `n` dan kichik bo'lsa, null qaytarsin).",
      startingCode: "class LinkedList {\n  constructor() { this.head = null; }\n  findNthFromEnd(n) {\n    // Fast va slow ko'rsatkichlar yordamida bitta siklda yeching\n  }\n}",
      hint: "let fast = this.head, slow = this.head;\nfor (let i = 0; i < n; i++) {\n  if (!fast) return null;\n  fast = fast.next;\n}\nwhile (fast) {\n  slow = slow.next;\n  fast = fast.next;\n}\nreturn slow;",
      test: "if (typeof LinkedList !== 'function') return 'LinkedList klassi topilmadi';\nconst list = new LinkedList();\nlist.head = { value: 10, next: { value: 20, next: { value: 30, next: { value: 40, next: null } } } };\nconst node2 = list.findNthFromEnd(2);\nconst node4 = list.findNthFromEnd(4);\nconst node5 = list.findNthFromEnd(5);\nif (!node2 || node2.value !== 30) return 'Oxiridan 2-chi element xato topildi';\nif (!node4 || node4.value !== 10) return 'Oxiridan 4-chi element (boshi) xato topildi';\nif (node5 !== null) return 'Mavjud bo\\'lmagan element uchun null qaytarilmadi';\nreturn null;"
    },
    {
      id: 14,
      title: "Ikki saralangan ro'yxatni birlashtirish (Merge Two Sorted Lists)",
      instruction: "Ikkita o'sib borish tartibida saralangan Singly Linked List boshi `l1` va `l2` berilgan. Ularni o'zaro birlashtirib, saralangan yangi LinkedList boshini (head) qaytaruvchi `mergeTwoLists(l1, l2)` funksiyasini yozing.",
      startingCode: "function mergeTwoLists(l1, l2) {\n  // l1 va l2 saralangan ro'yxatlarini birlashtirib, yangi boshini qaytaring\n}",
      hint: "const dummy = { value: -1, next: null };\nlet curr = dummy;\nwhile (l1 && l2) {\n  if (l1.value <= l2.value) {\n    curr.next = l1;\n    l1 = l1.next;\n  } else {\n    curr.next = l2;\n    l2 = l2.next;\n  }\n  curr = curr.next;\n}\ncurr.next = l1 || l2;\nreturn dummy.next;",
      test: "const l1 = { value: 1, next: { value: 3, next: { value: 5, next: null } } };\nconst l2 = { value: 2, next: { value: 4, next: null } };\nconst merged = mergeTwoLists(l1, l2);\nif (merged && merged.value === 1 && merged.next.value === 2 && merged.next.next.value === 3 && merged.next.next.next.value === 4 && merged.next.next.next.next.value === 5) {\n  return null;\n}\nreturn 'Saralangan ro\\'yxatlar to\\'g\\'ri birlashtirilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Bog'langan ro'yxat (Linked List) tugunining eng asosiy ikki qismi nimalardan iborat?",
      options: ["Kalit va Qiymat", "Qiymat va Keyingi tugun ko'rsatkichi", "Chap va O'ng ko'rsatkichlar", "Indeks va Uzunlik"],
      correctAnswer: 1,
      explanation: "Linked List tuguni (Node) o'zida saqlaydigan foydali ma'lumot (Value) va keyingi element manzili/havolasi (Next) dan tashkil topadi."
    },
    {
      id: 2,
      question: "Singly Linked List boshiga (Head) element qo'shishning vaqt murakkabligi qancha?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "Boshiga element qo'shish faqatgina yangi head yaratib, keyingisini avvalgisiga bog'lashni talab qiladi, bu hech qanday siklsiz O(1) vaqt oladi."
    },
    {
      id: 3,
      question: "LinkedList oxiriga element qo'shishda agar tail (oxirgi tugun) havolasi saqlanmagan bo'lsa, vaqt murakkabligi qanday bo'ladi?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "Tail havolasi saqlanmasa, oxirgi tugunni topish uchun boshidan boshlab next orqali oxirigacha aylanib chiqish kerak bo'ladi, bu esa O(n) vaqt oladi."
    },
    {
      id: 4,
      question: "Singly va Doubly Linked List orasidagi asosiy farq nima?",
      options: ["Singly Linked List ko'proq xotira oladi", "Doubly Linked List tugunlarida oldingi elementga ham havola (prev) bo'ladi", "Singly Linked List tezroq qidiradi", "Doubly Linked List faqat bitta element saqlaydi"],
      correctAnswer: 1,
      explanation: "Doubly Linked List tugunlarida keyingi (next) bilan birga oldingi (prev) tugun manzili ham saqlanadi, bu orqaga harakatlanish imkonini beradi."
    },
    {
      id: 5,
      question: "Linked List-da qidirish (find) amaliyotining vaqt murakkabligi qanday?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "Elementlar indekslanmaganligi sababli, biz qidirayotgan element boshida, o'rtasida yoki oxirida bo'lishi mumkin. Eng yomon holatda butun zanjirni ko'rish kerak (O(n))."
    },
    {
      id: 6,
      question: "Bo'sh bo'lmagan Singly Linked List-da eng oxirgi tugunning `next` qiymati nimaga teng bo'ladi?",
      options: ["0", "undefined", "null", "Mavjud emas"],
      correctAnswer: 2,
      explanation: "Zanjir tugaganligini bildirish uchun eng oxirgi tugunning keyingi tugun ko'rsatkichi `null` qilib belgilanadi."
    },
    {
      id: 7,
      question: "Linked List-da aylanma bog'lanish (sikl) mavjudligini aniqlashda qaysi algoritm ishlatiladi?",
      options: ["Binary Search", "DFS (Depth First Search)", "Floyd's Tortoise and Hare (Sekin va tez ko'rsatkichlar)", "Dijkstra"],
      correctAnswer: 2,
      explanation: "Floyd algoritmi ikkita ko'rsatkichni (slow va fast) har xil tezlikda harakatlantirish orqali siklni aniqlaydi. Agar sikl bo'lsa, ular uchrashadi."
    },
    {
      id: 8,
      question: "O'chirilgan tugunning boshqa hech qayerdan havolasi qolmasa, u bilan nima sodir bo'ladi?",
      options: ["U xotirada abadiy qoladi", "U Garbage Collector (GC) tomonidan xotiradan avtomatik o'chiriladi", "Dastur ReferenceError veradi", "Kompyuter o'chib yonadi"],
      correctAnswer: 1,
      explanation: "JavaScript dvigatelining Garbage Collector tizimi boshqa hech qayerdan kirib bo'lmaydigan (unreachable) xotira ob'ektlarini avtomatik tozalaydi."
    },
    {
      id: 9,
      question: "LinkedList o'rtasidagi elementni bitta siklda topish uchun ko'rsatkichlar qanday harakatlanishi kerak?",
      options: ["Ikkalasi ham bir xil tezlikda", "Slow 1 qadam, Fast esa 2 qadam tashlaydi", "Fast faqat orqaga yuradi", "Ikkalasi ham har xil tomondan boshlaydi"],
      correctAnswer: 1,
      explanation: "Fast pointer har safar 2 qadam va slow pointer 1 qadam tashlaganda, fast oxiriga yetib borganda slow aynan o'rtadagi elementda turgan bo'ladi."
    },
    {
      id: 10,
      question: "Ro'yxat boshidagi elementni o'chirishning vaqt murakkabligi qanday?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "Boshidagi elementni o'chirish uchun `head = head.next` qilish yetarli, bu hech qanday siljitishlarsiz O(1) bajariladi."
    },
    {
      id: 11,
      question: "Nima uchun massiv bilan taqqoslaganda Linked List ko'proq xotira sarflaydi?",
      options: ["Tugunlar kattaroq bo'lgani uchun", "Chunki har bir qiymat bilan birga qo'shimcha havolalar (next, prev) ham xotirada saqlanadi", "Linked List faqat 64 bitli sonlar saqlaydi", "Chunki u dinamik hisoblanadi"],
      correctAnswer: 1,
      explanation: "Tugunda qiymatdan tashqari qo'shimcha ko'rsatkich(lar) uchun ham joy ajratilishi sababli, bir xil miqdordagi ma'lumot uchun Linked List ko'proq xotira oladi."
    },
    {
      id: 12,
      question: "Bog'langan ro'yxatni teskari o'girish (reverse) algoritmining eng yaxshi vaqt murakkabligi qancha?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      correctAnswer: 2,
      explanation: "Zanjirni teskarilash uchun ballar tugunlarning havolasini o'zgartirish kerak, bu esa jami n ta amal, ya'ni O(n) vaqt murakkabligini talab qiladi."
    },
    {
      id: 13,
      question: "Dummy Node (yoki Sentinel Node) dan Linked List algoritmlarida foydalanishning asosiy sababi nima?",
      options: [
        "Ro'yxat o'lchamini ikki barobar oshirish uchun",
        "Chekka holatlarni (edge cases, masalan, bo'sh head bilan ishlash, boshiga yangi element qo'shish) soddalashtirish va maxsus if-else shartlaridan qochish uchun",
        "Xotiradan joy tejash maqsadida elementlarni o'chirish uchun",
        "Faqa aylanma (circular) ro'yxatlarni yaratish uchun"
      ],
      correctAnswer: 1,
      explanation: "Dummy Node yaratish orqali biz yangi ro'yxatning boshlang'ich head elementiga murojaat qilish muammosini hal qilamiz. U hech qanday real ma'lumot saqlamaydi, lekin uning .next havolasi orqali natijaviy bosh tugunga osongina yetib boramiz va bo'sh head uchun ortiqcha chekka tekshiruvlar yozmaymiz."
    },
    {
      id: 14,
      question: "Singly Linked List-da aylanma bog'lanish (sikl) borligini Floyd algoritmi (Tortoise and Hare) yordamida aniqlashning qo'shimcha xotira murakkabligi (Space Complexity) qanday?",
      options: [
        "O(n)",
        "O(1)",
        "O(log n)",
        "O(n^2)"
      ],
      correctAnswer: 1,
      explanation: "Floyd algoritmi faqatgina ikkita o'zgaruvchi (slow va fast ko'rsatkichlar) orqali ishlaydi va qo'shimcha hech qanday kesh (Set yoki Map) yaratmaydi. Shuning uchun uning qo'shimcha xotira murakkabligi o'zgarmas, ya'ni O(1) dir."
    }
  ]
};

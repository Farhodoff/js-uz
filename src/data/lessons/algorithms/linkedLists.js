export const linkedLists = {
  id: "linkedLists",
  title: "Bog'langan Ro'yxatlar (Linked Lists)",
  theory: `## 1. NEGA kerak?
Massivlar (Arrays) xotirada ketma-ket (contiguous) bloklarda saqlanadi. Bu ulardan indeks bo'yicha element olishni o'ta tez ($O(1)$) qilsa-da, massiv o'rtasiga yoki boshiga yangi element qo'shish yoki o'chirish juda qimmat amaliyotdir ($O(n)$), chunki qolgan barcha elementlarni siljitish (shift) kerak bo'ladi.
**Linked List** (Bog'langan ro'yxat) esa bu muammoni xotiraning ixtiyoriy qismida joylashgan tugunlar (Nodes) orqali hal qiladi. Har bir tugun o'zida ma'lumotni va keyingi tugunga ko'rsatkichni (pointer/reference) saqlaydi. Bu boshiga yoki oxiriga element qo'shish/o'chirishni o'ta samarali ($O(1)$) qiladi va xotirani dinamik kengaytirish imkonini beradi.

## 2. SODDALIK (Analogiya)
Massivni **poezd vagonlariga** o'xshatish mumkin: vagonlar qat'iy ketma-ket ulanadi, 1-vagon bilan 3-vagon orasiga yangi vagon suqish uchun butun poezdni ajratib, siljitish kerak.
Linked List esa **xazinani izlash o'yiniga (Treasure Hunt)** o'xshaydi: siz birinchi manzildasiz, u yerda xazina (qiymat) va keyingi manzil yozilgan qog'ozcha (ko'rsatkich) bor. Manzillar xotiraning istalgan chekkasida tartibsiz yotishi mumkin, lekin siz zanjir bo'ylab biridan ikkinchisiga o'ta olasiz.

## 3. STRUKTURA
Linked Listlarning 2 ta asosiy turi mavjud:
1. **Singly Linked List (Bir tomonlama bog'langan ro'yxat):** Har bir tugunda faqat keyingi tugunga havola (\`next\`) bo'ladi. Orqaga qaytib bo'lmaydi.
2. **Doubly Linked List (Ikki tomonlama bog'langan ro'yxat):** Har bir tugunda keyingi (\`next\`) va oldingi (\`prev\`) tugunlarga havola bo'ladi. Har ikki tomonga yurish mumkin.

Tugun strukturasi (Node):
\`\`\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Keyingi tugunga havola
  }
}
\`\`\`

## 4. AMALIYOT
Keling, JavaScript-da bir tomonlama bog'langan ro'yxatni (Singly Linked List) qo'lda qanday yozish va uning ustida ishlashni ko'rib chiqamiz:

### 1. Tugun (Node) klassini yaratish
Har bir tugun bitta qiymat va keyingi tugunga havola (next) saqlashi kerak:
\`\`\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Dastlab hech qayerga ko'rsatmaydi
  }
}
\`\`\`

### 2. Tugunlarni yaratish va qo'lda bog'lash
Biz 3 ta tugun yaratib, ularni bir-biriga ulaymiz:
\`\`\`javascript
const nodeA = new Node(10); // [10 | null]
const nodeB = new Node(20); // [20 | null]
const nodeC = new Node(30); // [30 | null]

// Ulash: nodeA -> nodeB -> nodeC
nodeA.next = nodeB; // nodeA endi nodeB ni ko'rsatadi: [10 | next] -> [20 | null]
nodeB.next = nodeC; // nodeB endi nodeC ni ko'rsatadi: [20 | next] -> [30 | null]

// nodeA - bu zanjirning Head (boshi), nodeC esa Tail (oxiri). nodeC.next qiymati null.
\`\`\`

### 3. Zanjir bo'ylab yurish (Traversal)
Linked List bo'ylab barcha elementlarni ekranga chiqarish uchun biz \`head\` dan boshlab \`next\` orqali zanjir oxirigacha boramiz:
\`\`\`javascript
let current = nodeA; // Boshidan boshlaymiz

while (current !== null) {
  console.log("Tugun qiymati:", current.value);
  current = current.next; // Keyingi tugunga o'tamiz
}
// Konsolda: 10, keyin 20, keyin 30 chiqadi. Keyin current null bo'lib, sikl tugaydi.
\`\`\`

**Xulosa:** Linked List-da har bir tugun faqat o'zidan keyingi elementning xotiradagi manzilini biladi. Bu massiv kabi indekslar bo'lmagani uchun elementlarni qidirishni chiziqli ($O(n)$) qilsa-da, yangi element qo'shish yoki havolalarni almashtirishni juda oson qiladi.


## 5. XATOLAR (Common mistakes)
1. **Zanjirni uzib qo'yish (Lost references):** Elementni o'chirish yoki o'rtasiga qo'shish paytida havolalarni to'g'ri bog'lamaslik zanjirning qolgan qismi xotirada yo'qolishiga (Garbage Collection tomonidan o'chirilishiga) olib keladi.
2. **Cheksiz siklga tushib qolish:** Agar ro'yxatda aylanma bog'lanish (Cycle) hosil bo'lsa va to'xtash sharti qo'yilmasa, \`while (current !== null)\` sikli cheksiz aylanadi.
3. **Null pointer xatosi:** Bo'sh ro'yxatda (head = null) \`head.next\` ni chaqirish \`TypeError: Cannot read properties of null\` xatosini beradi. Har doim chekka holatlarni (edge cases) tekshirish shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. Linked List nima?**
Xotiraning turli joylarida joylashgan va bir-biriga havolalar (ko'rsatkichlar) orqali bog'langan tugunlar ketma-ketligidan iborat chiziqli ma'lumotlar tuzilmasi.

**2. Massiv va Linked List farqi nima?**
Massiv xotirada ketma-ket blokda joylashadi va hajmi qat'iy, Linked List esa xotirada tarqoq joylashadi va hajmi dinamik o'zgaradi.

**3. Linked List boshiga element qo'shishning vaqt murakkabligi qanday?**
$O(1)$ ga teng, chunki yangi tugun yaratilib, uning \`next\` xossasi mavjud \`head\` ga yo'naltiriladi va u yangi \`head\` deb belgilanadi.

**4. Linked List o'rtasidan element qidirish murakkabligi qanday?**
$O(n)$, chunki indeks yo'q va elementni topish uchun boshidan boshlab bittalab zanjirni yurib chiqish kerak.

**5. Doubly Linked List-ning afzalligi nimada?**
Elementlarni ham oldinga, ham orqaga qarab aylanib chiqish imkoniyati borligi va elementni o'chirish osonroq kechishida.

**6. Doubly Linked List-ning Singly Linked List-dan kamchiligi nimada?**
Har bir tugunda oldingi havolani (\`prev\`) saqlash uchun ko'proq xotira talab qilinishi va havolalarni bog'lash kodi murakkabroqligida.

**7. "Head" va "Tail" nima?**
\`Head\` — ro'yxatning birinchi tuguni, \`Tail\` — oxirgi tuguni (uning \`next\` xossasi doim \`null\` bo'ladi).

**8. Linked List-da sikl (Cycle) borligini qanday aniqlash mumkin?**
Ikki ko'rsatkichli (tez va sekin yuguruvchi - Tortoise and Hare) algoritm yordamida. Agar sikl bo'lsa, ular bir joyda uchrashishadi.

**9. Bo'sh ro'yxat qanday ifodalanadi?**
\`head\` ko'rsatkichi \`null\` ga teng bo'lishi orqali.

**10. Elementni o'chirish qanday amalga oshiriladi?**
O'chirilishi kerak bo'lgan tugundan bitta oldingi tugunning \`next\` ko'rsatkichini, o'chadigan tugundan keyingi tugunga bog'lab qo'yish orqali.

**11. Garbage Collector o'chirilgan elementni qanday tozalaydi?**
Agar elementga hech qanday tugundan va o'zgaruvchidan havola qolmasa, u foydalanilmayotgan xotira deb topilib, avtomatik o'chiriladi.

**12. Linked List-dan qachon foydalangan ma'qul?**
Elementlarni juda tez-tez boshiga yoki o'rtasiga qo'shish va o'chirish kerak bo'lganda hamda elementlar soni oldindan noma'lum bo'lganda.
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
      options: ["U xotirada abadiy qoladi", "U Garbage Collector (GC) tomonidan xotiradan avtomatik o'chiriladi", "Dastur ReferenceError beradi", "Kompyuter o'chib yonadi"],
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
      explanation: "Zanjirni teskarilash uchun barcha tugunlarning havolasini o'zgartirish kerak, bu esa jami n ta amal, ya'ni O(n) vaqt murakkabligini talab qiladi."
    }
  ]
};

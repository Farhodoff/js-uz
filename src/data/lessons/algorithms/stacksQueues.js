export const stacksQueues = {
  id: "stacksQueues",
  title: "Stek va Navbat (Stacks & Queues)",
  theory: `## 1. NEGA kerak?
Haqiqiy dasturlashda ma'lumotlar oqimini tartibga solish va boshqarish juda muhim. Masalan, matn muharririda orqaga qaytish ("Undo" - Ctrl+Z) tugmasi bosilganda qilingan amallar teskari tartibda bekor qilinishi kerak. Yoki printerga yuborilgan hujjatlar navbat bo'yicha ketma-ket chop etilishi kerak.
Buning uchun bizga **Stack** (Stek) va **Queue** (Navbat) ma'lumotlar tuzilmalari yordam beradi. Ular elementlarni qo'shish va o'chirish qoidalarini qat'iy cheklash orqali ma'lumotlarni tartiblashni osonlashtiradi va kod xavfsizligini ta'minlaydi.

## 2. SODDALIK (Analogiya)
- **Stack (Stek):** Buni kafedagi **likopchalar taxlamiga** o'xshatish mumkin. Yangi yuvilgan likopcha eng tepaga qo'yiladi va ovqat yeydigan odam ham eng tepasidagi likopchani oladi. Bu — **LIFO** (Last In, First Out — Oxirgi kirgan, birinchi chiqadi) qoidasi.
- **Queue (Navbat):** Buni **do'kondagi kassaga turgan odamlar navbatiga** o'xshatish mumkin. Birinchi kelgan odamga birinchi xizmat ko'rsatiladi va u navbatdan chiqib ketadi, yangi kelganlar navbat oxiriga turishadi. Bu — **FIFO** (First In, First Out — Birinchi kirgan, birinchi chiqadi) qoidasi.

## 3. STRUKTURA
Stack va Queue-ni massiv (Array) yoki bog'langan ro'yxat (Linked List) yordamida yaratish mumkin.

### Stack amallari:
1. \`push(value)\`: Elementni stek tepasiga qo'shadi ($O(1)$).
2. \`pop()\`: Stek tepasidagi elementni o'chiradi va qaytaradi ($O(1)$).
3. \`peek()\`: Stek tepasidagi elementni o'chirmasdan ko'rish ($O(1)$).
4. \`isEmpty()\`: Stek bo'shligini tekshirish.

### Queue amallari:
1. \`enqueue(value)\`: Elementni navbat oxiriga qo'shadi ($O(1)$).
2. \`dequeue()\`: Navbat boshidagi elementni o'chiradi va qaytaradi ($O(1)$).
3. \`peek()\`: Navbat boshidagi elementni ko'rish ($O(1)$).

## 4. AMALIYOT
Keling, JavaScript-da Stack va Queue-ni oddiy massivlar (Arrays) yordamida qanday shakllantirishni ko'rib chiqamiz:

### 1. Stack (Stek) namunasi: Brauzer Tarixi (LIFO)
Brauzerning "Orqaga" (Back) tugmasi ishlashini stek yordamida simulyatsiya qilamiz. Biz massivning \`.push()\` va \`.pop()\` metodlaridan foydalanamiz. Ular massiv oxiriga element qo'shadi va o'chiradi ($O(1)$ tezlikda):
\`\`\`javascript
const historyStack = [];

// Sahifalarga tashrif buyurish (Push - Stek tepasiga qo'shish)
historyStack.push("google.com");
historyStack.push("github.com");
historyStack.push("youtube.com");

console.log("Tarix steki:", historyStack); 
// Natija: ["google.com", "github.com", "youtube.com"]

// "Orqaga" tugmasini bosish (Pop - Stek tepasidan element olish)
const lastPage = historyStack.pop(); 
console.log("Qaytilgan sahifa:", lastPage); // Natija: "youtube.com" (LIFO - oxirgi kirgan sahifa birinchi chiqdi)

console.log("Qolgan tarix:", historyStack); 
// Natija: ["google.com", "github.com"]
\`\`\`

### 2. Queue (Navbat) namunasi: Printer Navbati (FIFO)
Printerga yuborilgan hujjatlarni navbat bilan chop etishni simulyatsiya qilamiz. Hujjatlar oxiriga qo'shiladi (\`.push()\`), lekin boshidan olinadi (\`.shift()\`):
\`\`\`javascript
const printQueue = [];

// Hujjatlarni navbatga qo'shish (Enqueue - Navbat oxiriga qo'shish)
printQueue.push("hujjat1.pdf");
printQueue.push("hujjat2.docx");
printQueue.push("rasm.png");

console.log("Printer navbati:", printQueue);
// Natija: ["hujjat1.pdf", "hujjat2.docx", "rasm.png"]

// Birinchi hujjatni chop etish (Dequeue - Navbat boshidan olish)
const printedDoc = printQueue.shift(); // .shift() birinchi elementni olib tashlaydi
console.log("Chop etilgan hujjat:", printedDoc); // Natija: "hujjat1.pdf" (FIFO - birinchi kelgan birinchi chop etildi)

console.log("Qolgan navbat:", printQueue);
// Natija: ["hujjat2.docx", "rasm.png"]
\`\`\`

**Xulosa:** Stack va Queue amaliy dasturlashda ma'lumotlar ketma-ketligi va tartibini to'g'ri boshqarish uchun eng ko'p ishlatiladigan fundamental tuzilmalardir.


## 5. XATOLAR (Common mistakes)
1. **Stek to'lib ketishi (Stack Overflow):** Rekursiya yoki ma'lumotlar limiti oshib ketganda stek xotirasi tugashi.
2. **Bo'sh stekdan element olish (Stack Underflow):** Stek bo'sh bo'lgan holatda \`pop()\` qilganda xatoliklarni tekshirmaslik (masalan, \`undefined\` qaytishini hisobga olmaslik).
3. **Massiv shift amaliyotini ishlatish:** Massiv yordamida navbat yasaganda, boshidan element o'chirish uchun \`shift()\` ishlatilsa, uning vaqt murakkabligi $O(n)$ bo'lib qoladi. Katta hajmlar uchun bog'langan ro'yxat ishlatsa, bu $O(1)$ bo'ladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Stack nima?**
Ma'lumotlar faqat bir tomondan (tepasidan) qo'shiladigan va o'chiriladigan, LIFO qoidasiga bo'ysunuvchi chiziqli ma'lumotlar tuzilmasi.

**2. Queue nima?**
Ma'lumotlar bir tomondan (oxiridan) qo'shilib, ikkinchi tomondan (boshidan) o'chiriladigan, FIFO qoidasiga bo'ysunuvchi ma'lumotlar tuzilmasi.

**3. LIFO va FIFO farqi nimada?**
LIFO — oxirgi kirgan element birinchi chiqadi (Stack). FIFO — birinchi kirgan element birinchi chiqadi (Queue).

**4. Brauzerning "Orqaga" (Back) tugmasi qaysi tuzilma asosida ishlaydi?**
Stack asosida. Har bir tashrif buyurilgan sahifa stekka tashlanadi va Back bosilganda oxirgisi pop qilib olinadi.

**5. Call Stack nima?**
JavaScript dvigateli funksiyalar chaqiruvini nazorat qilish va ularning qaytish manzillarini boshqarish uchun foydalanadigan stek tuzilmasi.

**6. Massivda \`pop()\` va \`push()\` amallarining murakkabligi qanday?**
Ikkalasi ham O(1) ga teng, chunki ular massiv oxiridan element qo'shadi va o'chiradi.

**7. Massivda \`unshift()\` va \`shift()\` amallari nega O(n) murakkablikka ega?**
Chunki massiv boshiga element qo'shilganda yoki o'chirilganda, massivdagi barcha boshqa elementlarning indekslarini siljitib chiqish talab etiladi.

**8. Min Stack nima?**
Oddiy stek amallaridan tashqari, stekdagi eng kichik elementni O(1) vaqt ichida qaytara oladigan maxsus stek dizayni.

**9. Queue-ni ikkita Stack yordamida qanday qurish mumkin?**
Bitta stekni faqat elementlarni qabul qilish (input), ikkinchisini esa elementlarni chiqarish (output) uchun ishlatib, elementlarni biridan ikkinchisiga ag'darish orqali.

**10. JavaScript event loop-dagi Task Queue qaysi tuzilma hisoblanadi?**
Navbat (Queue) hisoblanadi. Asinxron vazifalar (setTimeout) kelib navbatga turadi va tartib bo'yicha FIFO shaklida bajariladi.

**11. Monotonic Stack nima?**
Elementlari doimiy o'sish yoki kamayish tartibida saqlanadigan va asosan eng yaqin katta/kichik elementni qidirishda foydalaniladigan stek turi.

**12. Bog'langan ro'yxat yordamida Queue yaratishning afzalligi nimada?**
Navbat boshidan elementni o'chirish (\`dequeue\`) amalini $O(1)$ vaqtda bajarish imkonini beradi.
`,
  exercises: [
    {
      id: 1,
      title: "Massiv yordamida Stack yaratish",
      instruction: "Ichida `items` massivi bo'lgan hamda `push(val)`, `pop()`, `peek()` va `isEmpty()` metodlariga ega `Stack` klassini yozing.",
      startingCode: "class Stack {\n  constructor() {\n    this.items = [];\n  }\n  // Metodlarni yozing\n}",
      hint: "push(val) { this.items.push(val); } pop() { return this.items.pop(); } peek() { return this.items[this.items.length-1]; } isEmpty() { return this.items.length === 0; }",
      test: "if (typeof Stack !== 'function') return 'Stack klassi topilmadi'; const s = new Stack(); if (!s.isEmpty()) return 'Stek boshida bo\\'sh bo\\'lishi kerak'; s.push(10); s.push(20); if (s.peek() !== 20) return 'peek() xato qiymat qaytardi'; if (s.pop() !== 20 || s.pop() !== 10) return 'pop() xato qiymat qaytardi'; return null;"
    },
    {
      id: 2,
      title: "LinkedList yordamida Stack yaratish",
      instruction: "Bog'langan ro'yxat tugunlari orqali ishlaydigan, `push(val)` va `pop()` metodlariga ega `LinkedStack` klassini yozing (boshiga qo'shish va boshidan o'chirish O(1)).",
      startingCode: "class Node {\n  constructor(value) { this.value = value; this.next = null; }\n}\nclass LinkedStack {\n  constructor() { this.top = null; }\n  push(val) {\n    // Boshiga element qo'shing\n  }\n  pop() {\n    // Boshidan element o'chiring va qiymatini qaytaring\n  }\n}",
      hint: "push(val) { const n = new Node(val); n.next = this.top; this.top = n; }\npop() { if(!this.top) return null; const val = this.top.value; this.top = this.top.next; return val; }",
      test: "if (typeof LinkedStack !== 'function') return 'LinkedStack topilmadi'; const s = new LinkedStack(); s.push(1); s.push(2); if(s.top.value !== 2) return 'Tepada oxirgi qo\\'shilgan element bo\\'lishi kerak'; if(s.pop() !== 2 || s.pop() !== 1) return 'pop() noto\\'g\\'ri ishladi'; return null;"
    },
    {
      id: 3,
      title: "Massiv yordamida Queue yaratish",
      instruction: "Massiv asosida ishlovchi, `enqueue(val)`, `dequeue()`, `peek()` va `isEmpty()` metodlariga ega `Queue` klassini yozing.",
      startingCode: "class Queue {\n  constructor() {\n    this.items = [];\n  }\n  // Metodlarni yozing\n}",
      hint: "enqueue(val) { this.items.push(val); } dequeue() { return this.items.shift(); } peek() { return this.items[0]; } isEmpty() { return this.items.length === 0; }",
      test: "if (typeof Queue !== 'function') return 'Queue klassi topilmadi'; const q = new Queue(); q.enqueue(5); q.enqueue(10); if(q.peek() !== 5) return 'peek() xato'; if(q.dequeue() !== 5 || q.dequeue() !== 10) return 'dequeue() navbat tartibini buzyapti'; return null;"
    },
    {
      id: 4,
      title: "LinkedList yordamida Queue yaratish",
      instruction: "Dinamik va tezkor O(1) navbat uchun `enqueue(val)` va `dequeue()` metodlariga ega `LinkedQueue` klassini yozing.",
      startingCode: "class Node {\n  constructor(value) { this.value = value; this.next = null; }\n}\nclass LinkedQueue {\n  constructor() { this.head = null; this.tail = null; }\n  enqueue(val) {\n    // Oxiriga qo'shing\n  }\n  dequeue() {\n    // Boshidan o'chiring va qiymatini qaytaring\n  }\n}",
      hint: "enqueue(val) { const n = new Node(val); if(!this.head) { this.head = n; this.tail = n; } else { this.tail.next = n; this.tail = n; } }\ndequeue() { if(!this.head) return null; const val = this.head.value; this.head = this.head.next; if(!this.head) this.tail = null; return val; }",
      test: "if (typeof LinkedQueue !== 'function') return 'LinkedQueue topilmadi'; const q = new LinkedQueue(); q.enqueue(10); q.enqueue(20); if(q.head.value !== 10) return 'Boshi xato'; if(q.dequeue() !== 10 || q.dequeue() !== 20) return 'dequeue xato'; return null;"
    },
    {
      id: 5,
      title: "Qavslar balansi (Balanced Parentheses)",
      instruction: "Stek yordamida qavslar to'g'ri yopilganligini tekshiradigan `isValidParentheses(str)` funksiyasini yozing (faqat '()', '[]', '{}' qavslar).",
      startingCode: "function isValidParentheses(str) {\n  const stack = [];\n  const map = { ')': '(', ']': '[', '}': '{' };\n  // Qavslarni tekshiring\n}",
      hint: "for(let char of str) {\n  if(char === '(' || char === '[' || char === '{') { stack.push(char); }\n  else if(stack.pop() !== map[char]) { return false; }\n} return stack.length === 0;",
      test: "if (typeof isValidParentheses !== 'function') return 'isValidParentheses topilmadi'; if (isValidParentheses('()[]{}') !== true) return 'Oddiy to\\'g\\'ri qavslarda xato'; if (isValidParentheses('(]') !== false) return 'Noto\\'g\\'ri yopilgan qavsda xato'; if (isValidParentheses('(') !== false) return 'Yopilmagan qavsda xato'; return null;"
    },
    {
      id: 6,
      title: "O(1) Min Stack",
      instruction: "Stek amallari bilan birga eng kichik elementni O(1) vaqtda qaytaruvchi `getMin()` metodiga ega `MinStack` klassini yozing.",
      startingCode: "class MinStack {\n  constructor() {\n    this.stack = [];\n    this.minStack = []; // Kichik elementlarni saqlab boring\n  }\n  push(val) {\n    // Kodni yozing\n  }\n  pop() {\n    // Kodni yozing\n  }\n  getMin() {\n    // Eng kichik elementni qaytaring\n  }\n}",
      hint: "push(val) { this.stack.push(val); if(this.minStack.length === 0 || val <= this.getMin()) this.minStack.push(val); }\npop() { const val = this.stack.pop(); if(val === this.getMin()) this.minStack.pop(); }\ngetMin() { return this.minStack[this.minStack.length - 1]; }",
      test: "if (typeof MinStack !== 'function') return 'MinStack topilmadi'; const ms = new MinStack(); ms.push(3); ms.push(5); ms.push(2); if(ms.getMin() !== 2) return 'getMin xato'; ms.pop(); if(ms.getMin() !== 3) return 'pop dan keyin getMin noto\\'g\\'ri o\\'zgardi'; return null;"
    },
    {
      id: 7,
      title: "Stek yordamida Navbat yaratish",
      instruction: "Ikkita stek (`stack1` va `stack2`) yordamida navbat (`enqueue`, `dequeue`) mexanizmini yarating.",
      startingCode: "class QueueWithStacks {\n  constructor() {\n    this.stack1 = [];\n    this.stack2 = [];\n  }\n  enqueue(val) {\n    this.stack1.push(val);\n  }\n  dequeue() {\n    // stack2 bo'sh bo'lsa stack1 elementlarini ag'daring\n  }\n}",
      hint: "if (this.stack2.length === 0) { while(this.stack1.length) { this.stack2.push(this.stack1.pop()); } } return this.stack2.pop();",
      test: "if (typeof QueueWithStacks !== 'function') return 'QueueWithStacks topilmadi'; const q = new QueueWithStacks(); q.enqueue(1); q.enqueue(2); if (q.dequeue() !== 1 || q.dequeue() !== 2) return 'Ag\\'darish tartibi xato'; return null;"
    },
    {
      id: 8,
      title: "Stringni stek yordamida teskarilash",
      instruction: "Berilgan satrni (string) stek tuzilmasidan foydalanib teskari qilib qaytaruvchi `reverseString(str)` funksiyasini yozing.",
      startingCode: "function reverseString(str) {\n  const stack = [];\n  // Stekka joylang va qaytarib oling\n}",
      hint: "for(let char of str) stack.push(char);\nlet res = ''; while(stack.length) res += stack.pop(); return res;",
      test: "if (typeof reverseString !== 'function') return 'reverseString topilmadi'; if (reverseString('hello') !== 'olleh') return 'Teskarilash xato'; return null;"
    },
    {
      id: 9,
      title: "Monotonic Stack - Next Greater",
      instruction: "Massivdagi har bir element uchun o'ng tomondagi eng birinchi katta elementni qaytaradigan `nextGreater(arr)` funksiyasini stek orqali yozing (topilmasa -1).",
      startingCode: "function nextGreater(arr) {\n  const res = new Array(arr.length).fill(-1);\n  const stack = []; // Indekslarni saqlaydi\n  for(let i=0; i<arr.length; i++) {\n    // Shartni yozing\n  }\n  return res;\n}",
      hint: "while(stack.length && arr[stack[stack.length-1]] < arr[i]) { res[stack.pop()] = arr[i]; } stack.push(i);",
      test: "if (typeof nextGreater !== 'function') return 'nextGreater topilmadi'; const res = nextGreater([2, 1, 5]); if (res[0] !== 5 || res[1] !== 5 || res[2] !== -1) return 'Katta elementlarni topishda xatolik'; return null;"
    },
    {
      id: 10,
      title: "Navbat elementlarini teskarilash",
      instruction: "Massiv ko'rinishidagi navbat (Queue) elementlarini stek yordamida teskarilovchi `reverseQueue(queue)` funksiyasini yozing (in-place).",
      startingCode: "function reverseQueue(queue) {\n  const stack = [];\n  // Navbatdan olib stekka soling, keyin stekdan qaytaring\n}",
      hint: "while(queue.length) stack.push(queue.shift());\nwhile(stack.length) queue.push(stack.pop());\nreturn queue;",
      test: "if (typeof reverseQueue !== 'function') return 'reverseQueue topilmadi'; const q = [1, 2, 3]; reverseQueue(q); if (q[0] !== 3 || q[2] !== 1) return 'Navbat teskari tartibga kelmadi'; return null;"
    },
    {
      id: 11,
      title: "Stek hajmi (Stack Size)",
      instruction: "Stek elementlari sonini hisoblaydigan `size()` metodini yozing.",
      startingCode: "class Stack {\n  constructor() { this.items = []; }\n  push(val) { this.items.push(val); }\n  size() {\n    // Hajmni qaytaring\n  }\n}",
      hint: "return this.items.length;",
      test: "if (typeof Stack !== 'function') return 'Stack klassi topilmadi'; const s = new Stack(); s.push(5); if(s.size() !== 1) return 'Hajm hisoblashda xatolik'; return null;"
    },
    {
      id: 12,
      title: "Navbatni tozalash (Clear Queue)",
      instruction: "Navbatdagi barcha elementlarni tozalaydigan `clear()` metodini yozing.",
      startingCode: "class Queue {\n  constructor() { this.items = []; }\n  enqueue(val) { this.items.push(val); }\n  clear() {\n    // Tozalang\n  }\n}",
      hint: "this.items = [];",
      test: "if (typeof Queue !== 'function') return 'Queue klassi topilmadi'; const q = new Queue(); q.enqueue(1); q.clear(); if(q.items.length !== 0) return 'Navbat tozalanmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Stek (Stack) qaysi tartiblash qoidasiga ko'ra ishlaydi?",
      options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "LILO (Last In Last Out)", "Random Access"],
      correctAnswer: 1,
      explanation: "Stack oxirgi kirgan element birinchi chiqadigan (LIFO - Last In First Out) printsip asosida ishlaydi."
    },
    {
      id: 2,
      question: "Navbat (Queue) qaysi tartiblash qoidasiga ko'ra ishlaydi?",
      options: ["LIFO", "FIFO", "FILO", "Priority Access"],
      correctAnswer: 1,
      explanation: "Queue birinchi kelgan elementga birinchi xizmat ko'rsatiladigan (FIFO - First In First Out) printsipi bo'yicha ishlaydi."
    },
    {
      id: 3,
      question: "Stek tepasidagi (top) elementni o'chirmasdan faqatgina ko'rish amali nima deyiladi?",
      options: ["pop", "push", "peek (yoki top)", "dequeue"],
      correctAnswer: 2,
      explanation: "Peek (yoki ba'zi tillarda Top) metodi stek tepasidagi qiymatni o'chirmasdan uning nusxasini ko'rish imkonini beradi."
    },
    {
      id: 4,
      question: "Navbat oxiriga element qo'shish amali nima deb nomlanadi?",
      options: ["push", "enqueue", "dequeue", "pop"],
      correctAnswer: 1,
      explanation: "Navbatga element qo'shish amali 'enqueue' deb ataladi va u navbatning dum qismiga (tail) element joylashtiradi."
    },
    {
      id: 5,
      question: "Quyidagilardan qaysi biri stekning amaliy hayotdagi tatbig'i hisoblanadi?",
      options: [
        "Printer navbati",
        "Matn muharrirlarida 'Undo' (bekor qilish) Ctrl+Z tizimi",
        "Kassadagi mijozlar navbati",
        "Operatsion tizim process scheduling (rejalashtiruvchisi)"
      ],
      correctAnswer: 1,
      explanation: "Ctrl+Z eng oxirgi amalni bekor qilishi kerak. Bu amal stekda saqlanadi va bekor qilish buyrug'i kelganda pop qilib olinadi."
    },
    {
      id: 6,
      question: "Bo'sh stekdan element o'chirishga harakat qilish qanday holat deyiladi?",
      options: ["Stack Overflow", "Stack Underflow", "Memory Leak", "Reference Error"],
      correctAnswer: 1,
      explanation: "Bo'sh stekdan elementni olishga urinish 'Stack Underflow' deb ataladi va bu dasturda xatolikka olib kelishi mumkin."
    },
    {
      id: 7,
      question: "Nima uchun massiv yordamida navbat (Queue) yaratish va unda `shift()` metodidan foydalanish samarasiz?",
      options: [
        "Massiv faqat raqam saqlagani uchun",
        "Chunki `shift()` amali massiv boshidagi elementni o'chirgach qolgan barcha elementlarni surib chiqadi, bu O(n) vaqt oladi",
        "Massiv xotirani avtomatik tozalamaydi",
        "Bu xavfsiz emas"
      ],
      correctAnswer: 1,
      explanation: "Massiv boshidan element o'chirilganda, massiv indekslari qaytadan nollanib, barcha elementlar bittaga chapga siljiydi, bu esa O(n) chiziqli vaqt talab qiladi."
    },
    {
      id: 8,
      question: "Min Stack klassida eng kichik elementni O(1) da saqlash uchun qanday qo'shimcha yondashuv kerak?",
      options: [
        "Massivni har safar saralab turish",
        "Asl stekka parallel ravishda eng kichik elementlarni kuzatib boruvchi yordamchi ikkinchi stekni (minStack) yuritish",
        "Rekursiya ishlatish",
        "Ikki tomonlama navbat qo'llash"
      ],
      correctAnswer: 1,
      explanation: "Har safar push amali bo'lganda, yangi qiymat joriy minimal qiymat bilan solishtirilib, yordamchi stekda (minStack) saqlab boriladi. Bu O(1) da minimal qiymatni bilish imkonini beradi."
    },
    {
      id: 9,
      question: "JavaScript motorida asinxron vazifalar navbati (Task Queue) qayerda bajariladi?",
      options: ["Call Stack ichida", "Event Loop boshqaruvida sinxron kodlar tugagach", "Dastur boshlanishida", "Faqat node.js-da"],
      correctAnswer: 1,
      explanation: "Sinxron kodlar (Call Stack) to'liq bajarilib bo'shagandan so'ng, Event Loop Task Queue-dan navbatdagi vazifani stackka olib kelib bajaradi."
    },
    {
      id: 10,
      question: "Queue boshidan element o'chirish amali nima deyiladi?",
      options: ["pop", "shift", "dequeue", "peek"],
      correctAnswer: 2,
      explanation: "Navbatning boshidan elementni o'chirib olish amali 'dequeue' deb ataladi."
    },
    {
      id: 11,
      question: "Stekka element joylash (`push`) va olish (`pop`) amallarining eng yaxshi vaqt murakkabligi qanday?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "Stek amallari faqat yuqoridan bajarilganligi va hech qanday elementlarni siljitishni talab qilmasligi sababli O(1) tezlikda ishlaydi."
    },
    {
      id: 12,
      question: "Monotonic Stack nima?",
      options: [
        "Faqat bitta turdagi ma'lumotlarni qabul qiladigan stek",
        "Elementlari doimo o'sish yoki kamayish tartibida saqlanadigan stek",
        "Dinamik ravishda xotirasini kengaytiruvchi stek",
        "Faqat bitta element saqlay oladigan stek"
      ],
      correctAnswer: 1,
      explanation: "Monotonic steklar elementlarni kiritishda tartibni saqlaydi (masalan, faqat o'sib boruvchi). Bu orqali massivdagi eng yaqin katta/kichik elementni tez topish mumkin."
    }
  ]
};

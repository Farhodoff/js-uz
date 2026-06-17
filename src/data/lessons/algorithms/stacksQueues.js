export const stacksQueues = {
  id: "stacksQueues",
  title: "Stek va Navbat (Stacks & Queues)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Stack va Queue nima?
* **Stack (Stek):** Bu LIFO (**Last In, First Out** — Oxirgi kirgan, birinchi chiqadi) tamoyiliga asoslangan ma'lumotlar tuzilmasidir. Unga element faqat eng yuqorisidan qo'shiladi va olinadi.
* **Queue (Navbat):** Bu FIFO (**First In, First Out** — Birinchi kirgan, birinchi chiqadi) tamoyiliga asoslangan ma'lumotlar tuzilmasidir. Unga element oxiridan qo'shiladi (Enqueue) va boshidan olinadi (Dequeue).

### Real hayotiy o'xshatish
* **Stack o'xshatishsi:** Tasavvur qiling, **ustma-ust taxlangan likopchalar (plates)**:
  * Siz yangi yuvilgan likopchani faqat eng tepasiga qo'ya olasiz (Push).
  * Ovqatlanish uchun likopcha olganda ham eng ustidagisini (oxirgi qo'yilganini) olasiz (Pop).
  * Agar tagidan olishga harakat qilsangiz, likopchalar sinishi mumkin.
* **Queue o'xshatishsi:** Tasavvur qiling, **avtobus bekatidagi yoki do'kondagi odamlar navbati**:
  * Navbatga yangi kelgan odam oxiriga borib turadi (Enqueue).
  * Birinchi bo'lib kelgan odamga birinchi xizmat ko'rsatiladi va u navbatni tark etadi (Dequeue).

---

## 2. 💻 Real Kod Misollari

### 1. JavaScript-da Stack yaratish (Class yordamida)
\`\`\`javascript
class Stack {
  constructor() {
    this.items = [];
  }

  // Element qo'shish
  push(element) {
    this.items.push(element);
  }

  // Element o'chirish va qaytarish
  pop() {
    if (this.isEmpty()) return "Stack bo'sh";
    return this.items.pop();
  }

  // Yuqori elementni ko'rish
  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
\`\`\`

### 2. JavaScript-da Bog'langan Ro'yxat (Linked List) yordamida optimallashtirilgan Queue yaratish
Oddiy massiv yordamida \`.shift()\` qilish sekin ishlagani uchun, O(1) vaqt oluvchi Queue yaratishda bog'langan ro'yxatdan foydalanamiz:
\`\`\`javascript
class QueueNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Navbat oxiriga qo'shish (Enqueue)
  enqueue(val) {
    const newNode = new QueueNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // Navbat boshidan olish (Dequeue)
  dequeue() {
    if (!this.head) return null;
    const removedNode = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.length--;
    return removedNode.val;
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Chaqiriqlar steki vs Xotira hovuzi (Call Stack vs Memory Heap)
Operatsion tizim darajasida va JavaScript Engine (masalan V8) ichida Stack va Queue quyidagicha ishlaydi:

1. **Call Stack (Chaqiriqlar Steki - LIFO):**
   * Funksiya chaqirilganda, u Stack freymi (execution frame) sifatida Call Stack-ka joylanadi (\`Push\`). U yerda funksiyaning parametrlari va lokal primitiv o'zgaruvchilari saqlanadi.
   * Funksiya o'z ishini yakunlaganda, u Call Stackdan o'chiriladi (\`Pop\`).
   * **Stack Overflow:** Rekursiv funksiya to'xtash shartisiz cheksiz chaqirilaversa, Call Stack uchun ajratilgan cheklangan xotira to'lib ketadi va "Maximum call stack size exceeded" xatosi yuzaga keladi.

2. **Task Queue (Vazifalar Navbati - FIFO):**
   * Asinxron amallar (masalan, \`setTimeout\`, \`fetch\` yoki foydalanuvchi hodisalari callbacklari) Web API tomonidan bajarilib bo'lingach, ularning callback funksiyalari **Task Queue (Navbat)** ga yuboriladi.
   * **Event Loop** doimiy ravishda Call Stackni tekshiradi. Call Stack to'liq bo'shaganda, Task Queue-dan eng birinchi navbatda turgan vazifani FIFO tamoyili asosida olib, bajarish uchun Call Stackka yuklaydi.

### Xotirani optimallashtirish (Array-based vs Linked List-based)
* Massiv yordamida Queue yaratish oson, ammo \`.shift()\` metodini chaqirish $O(n)$ vaqt oladi. Chunki massiv elementlarining barcha indekslari xotirada 1 qadam chapga surilishi kerak.
* Bog'langan ro'yxat (Linked List) orqali yaratilgan Queue esa $O(1)$ xotira amali va tezligiga ega. Bizda doimiy ravishda \`head\` (navbat boshi) va \`tail\` (navbat oxiri) ko'rsatkichlari bo'ladi. Element qo'shganda \`tail.next = newNode\`, element o'chirilganda esa \`head = head.next\` amali bajariladi. Bunga hech qanday indekslarni siljitish talab qilinmaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Massiv \`.shift()\` metodini Queue uchun ishlatish va uning og'irligini bilmaslik
Ko'plab dasturchilar massivni Queue sifatida ishlatganda \`.shift()\` yoki \`.unshift()\` metodlarini chaqirishadi. 
* **Muammo:** \`.shift()\` massivdagi barcha elementlar indekslarini bir qadam chapga surib chiqadi. Bu esa chiziqli vaqt O(n) oladi. Katta hajmli ma'lumotlarda bu loyiha ishlashini keskin sekinlashtiradi.
* **Tuzatish:** Elementlarni indeks pointer orqali boshqaradigan yoki Linked List yordamida yaratilgan O(1) lik maxsus Queue klassidan foydalaning.

### 2. Bo'sh Stack-dan element olishga urinish (Underflow)
Bo'sh stek yoki navbatdan element o'chirishga harakat qilganda xatolikni tekshirmaslik dasturning noto'g'ri ishlashiga (masalan, \`undefined\` qaytishiga) sabab bo'ladi.
* **Tuzatish:** Har doim \`pop()\` yoki \`dequeue()\` qilishdan oldin stek yoki navbat bo'sh emasligini tekshiring (\`isEmpty()\`).

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Stack nima va u qaysi tamoyilga asoslanadi?**
   * *Javob:* LIFO (Last In, First Out) qoidasi bo'yicha ishlaydigan ma'lumotlar tuzilmasi.
2. **Queue nima va uning asosiy operatsiyalari qaysilar?**
   * *Javob:* FIFO (First In, First Out) tuzilmasi bo'lib, uning asosiy amallari \`enqueue\` (qo'shish) va \`dequeue\` (olish) dir.
3. **Peek operatsiyasi nima qiladi?**
   * *Javob:* Stack yoki Queue-dan elementni o'chirmasdan, eng yuqoridagi yoki boshidagi elementni ko'rish imkonini beradi.
4. **JS-da massiv yordamida Stack-ni qanday simulyatsiya qilish mumkin?**
   * *Javob:* Massivning \`.push()\` va \`.pop()\` metodlari yordamida.

### Middle
5. **Nega oddiy massiv \`.shift()\` metodi Queue uchun samarasiz?**
   * *Javob:* Chunki \`.shift()\` elementni o'chirgandan keyin barcha qolgan elementlar indeksini o'zgartiradi (chapga suradi), bu O(n) vaqt talab qiladi.
6. **Stack Overflow nima va u qachon sodir bo'ladi?**
   * *Javob:* Chaqiriqlar steki (Call Stack) o'ziga ajratilgan xotira chegarasidan oshib ketganda sodir bo'ladi, ko'pincha cheksiz rekursiya sababli yuz beradi.
7. **Ikki Stack yordamida Queue algoritmini qanday yozish mumkin?**
   * *Javob:* \`stack1\`ga elementlarni qo'shamiz (enqueue). \`dequeue\` amali bo'lganda, \`stack2\` bo'sh bo'lsa, \`stack1\`dagilarni \`stack2\`ga pop qilib o'tkazamiz va \`stack2\`dan pop qilamiz.
8. **Valid Parentheses (To'g'ri qavslar) masalasi qanday hal qilinadi?**
   * *Javob:* Stack yordamida. Ochuvchi qavslar stack-ga push qilinadi, yopuvchi kelganda stack yuqorisidagi qavs solishtirilib pop qilinadi.

### Senior
9. **Monotonik Stack nima va u qayerda qo'llaniladi?**
   * *Javob:* Elementlari har doim faqat o'suvchi yoki kamayuvchi bo'lgan maxsus Stack. U "keyingi eng katta element" (Next Greater Element) kabi masalalarda O(n) yechim topishda ishlatiladi.
10. **Priority Queue (Ustuvorlikka ega navbat) nima?**
    * *Javob:* Oddiy navbatdan farqli o'laroq, har bir element ma'lum bir ustuvorlik (priority) darajasiga ega bo'ladi va navbatdan birinchi bo'lib eng ustuvor element chiqadi (odatda Heap yordamida amalga oshiriladi).
11. **JavaScript Event Loop-dagi Microtask Queue va Macrotask Queue farqi nimada?**
    * *Javob:* Microtask Queue (Promises, queueMicrotask) yuqori ustuvorlikka ega bo'lib, har bir Macrotask (setTimeout, setInterval) bajarilishidan oldin to'liq bo'shatib olinadi.
12. **Double Ended Queue (Deque) nima?**
    * *Javob:* Elementlarni ham boshidan, ham oxiridan qo'shish va o'chirish imkonini beruvchi ikki tomonlama navbat.

---

## 6. 🎨 Interaktiv Vizual

### Stack Strukturasi (LIFO)
Elementlar faqat yuqoridan qo'shiladi va olinadi.

\`\`\`mermaid
graph TD
    subgraph StackWorkflow [Stek Amallari]
        direction TB
        push["Push (Qo'shish)"] --> TopNode["Top (Tepa): Tugun 3"]
        pop["Pop (Olish)"] --> TopNode
        
        subgraph Items [Stekdagi Elementlar]
            TopNode --> Node2["Tugun 2"]
            Node2 --> Node1["Bottom (Taq): Tugun 1"]
        end
    end
    style StackWorkflow fill:#f1f8e9,stroke:#558b2f,stroke-width:2px
\`\`\`

### Queue Strukturasi (FIFO)
Elementlar oxiridan qo'shiladi (tail) va oldidan olinadi (head).

\`\`\`mermaid
graph LR
    subgraph QueueWorkflow [Navbat Amallari]
        direction LR
        enqueue["Enqueue (Orqaga qo'shish)"] --> Tail["Tail (Oxiri): Tugun 3"]
        Tail --> Middle["Tugun 2"]
        Middle --> Head["Head (Boshi): Tugun 1"]
        Head --> dequeue["Dequeue (Oldidan olish)"]
    end
    style QueueWorkflow fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar \`stacksQueues_exercises.json\` faylida berilgan. U yerda siz qavslarni tekshirish, ikki stack yordamida navbat yaratish va har doim minimum qiymatni tezkor beruvchi \`MinStack\` klassini yozasiz.

---

## 8. 📝 12 ta Mini Test

Dars oxirida o'zlashtirgan bilimlaringizni tekshirish uchun 12 ta test savollari tayyorlangan bo'lib, ular \`stacksQueues_quizzes.json\` faylida joylashgan.

---

## 9. 🎯 Real Project Case Study

### Matn Muharriridagi Undo / Redo Tizimi (Orqaga va Oldinga Qaytarish)
Katta matn muharrirlarida foydalanuvchining har bir yozgan amali xotirada saqlanishi va orqaga qaytarilishi kerak.
* **Yechim:** Ikkita Stack orqali \`Undo\` (Orqaga) va \`Redo\` (Oldinga) amallarini boshqarish.
* **Kod ko'rinishi:**
\`\`\`javascript
class TextEditor {
  constructor() {
    this.text = "";
    this.undoStack = [];
    this.redoStack = [];
  }

  write(newText) {
    this.undoStack.push(this.text); // Hozirgi holatni saqlaymiz
    this.redoStack = []; // Yangi yozilganda redo steki tozalanadi
    this.text += newText;
  }

  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.text); // Hozirgi holatni redo-ga saqlaymiz
      this.text = this.undoStack.pop(); // Eski holatga qaytamiz
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.text); // Hozirgi holatni undo-ga saqlaymiz
      this.text = this.redoStack.pop(); // Keyingi holatga o'tamiz
    }
  }
}
\`\`\`

---

## 10. 📌 Cheat Sheet

| Ma'lumotlar Tuzilmasi | Tamoyili | Qo'shish (Push/Enqueue) | O'chirish (Pop/Dequeue) | Eng ustidagini ko'rish (Peek) | Qo'llanilishi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stack (Stek)** | **LIFO** (Last In, First Out) | O(1) | O(1) | O(1) | Undo/Redo, Call Stack, Qavslarni tekshirish |
| **Queue (Navbat)** | **FIFO** (First In, First Out) | O(1) | O(1) | O(1) | Print queue, So'rovlarni navbatda bajarish |
| **Deque (Double Ended Queue)** | Ikki tomonlama | O(1) | O(1) | O(1) | Ikki tomondan ham dynamic boshqarish |
`,
  exercises: [
  {
    "id": 1,
    "title": "Qavslarni Tekshirish (Valid Parentheses)",
    "instruction": "Faqat `(`, `)`, `{`, `}`, `[` va `]` qavslardan iborat bo'lgan `s` satri berilgan. Qavslar to'g'ri tartibda ochilib yopilganini tekshiruvchi `isValidParentheses(s)` funksiyasini yozing. Buning uchun Stack ma'lumotlar tuzilmasidan foydalaning (massiv yordamida push/pop qiling).",
    "startingCode": "function isValidParentheses(s) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Ochuvchi qavslarni (`(`, `{`, `[`) stack-ga qo'shing. Yopuvchi qavs kelganda, stack-dan oxirgisini chiqarib (`pop`), ular mos kelishini tekshiring. Oxirida stack bo'sh bo'luk bo'lishi kerak.",
    "test": "const sandbox = new Function(code + '; return isValidParentheses;');\nconst fn = sandbox();\nif (fn('()') === true && fn('()[]{}') === true && fn('(]') === false && fn('([)]') === false && fn('{[]}') === true) return null;\nreturn 'isValidParentheses funksiyasi qavslarni to\\'g\\'ri tekshirmadi';"
  },
  {
    "id": 2,
    "title": "Ikki Stack Yordamida Queue Yaratish (Queue using Stacks)",
    "instruction": "Faqat ikkita Stack (ikkita massiv) yordamida standart Queue (navbat) yarating. Buning uchun `Queue` klassini yozing. Unda `enqueue(x)` (element qo'shish), `dequeue()` (element olish va qaytarish) va `peek()` (navbat boshidagi elementni qaytarish) metodlari bo'lishi kerak. Massivning faqat push va pop metodlaridan foydalanishga ruxsat beriladi (shift yoki unshift metodlaridan foydalanmang!).",
    "startingCode": "class Queue {\n  constructor() {\n    this.stack1 = [];\n    this.stack2 = [];\n  }\n\n  enqueue(x) {\n    // Kodni shu yerda yozing\n  }\n\n  dequeue() {\n    // Kodni shu yerda yozing\n  }\n\n  peek() {\n    // Kodni shu yerda yozing\n  }\n}\n",
    "hint": "enqueue amali uchun elementni shunchaki stack1-ga push qiling. dequeue yoki peek amali bajarilganda, agar stack2 bo'sh bo'lsa, stack1-dagi barcha elementlarni birma-bir stack2-ga pop qilib o'tkazing.",
    "test": "if (code.includes('shift') || code.includes('unshift') || code.includes('splice')) return 'shift/unshift/splice metodlaridan foydalanish taqiqlanadi';\nconst sandbox = new Function(code + '; return Queue;');\nconst QueueClass = sandbox();\nconst q = new QueueClass();\nq.enqueue(1);\nq.enqueue(2);\nconst p = q.peek();\nconst d1 = q.dequeue();\nconst d2 = q.dequeue();\nif (p === 1 && d1 === 1 && d2 === 2) return null;\nreturn 'Queue klassi to\\'g\\'ri ishlamadi';"
  },
  {
    "id": 3,
    "title": "Minimum Qiymatli Stack (Min Stack)",
    "instruction": "Klassik Stack amallaridan tashqari har doim o'zidagi eng kichik elementni O(1) vaqt ichida qaytara oladigan `MinStack` klassini yarating. Unda `push(val)`, `pop()`, `top()`, va `getMin()` metodlari bo'lishi kerak. Buning uchun joriy minimumlarni saqlab boradigan qo'shimcha yordamchi massivdan (`minStack`) foydalaning.",
    "startingCode": "class MinStack {\n  constructor() {\n    this.stack = [];\n    this.minStack = [];\n  }\n\n  push(val) {\n    // Kodni shu yerda yozing\n  }\n\n  pop() {\n    // Kodni shu yerda yozing\n  }\n\n  top() {\n    // Kodni shu yerda yozing\n  }\n\n  getMin() {\n    // Kodni shu yerda yozing\n  }\n}\n",
    "hint": "push qilganda val-ni stack-ga qo'shing. Agar minStack bo'sh bo'lsa yoki val minStack-ning eng oxirgi (yuqori) elementidan kichik yoki teng bo'lsa, uni minStack-ga ham qo'shing. pop amali bo'lganda, stack-dan chiqqan qiymat minStack-ning tepasidagi qiymat bilan teng bo'lsa, minStack-dan ham pop qiling.",
    "test": "const sandbox = new Function(code + '; return MinStack;');\nconst MinStackClass = sandbox();\nconst s = new MinStackClass();\ns.push(-2);\ns.push(0);\ns.push(-3);\nconst min1 = s.getMin();\ns.pop();\nconst top1 = s.top();\nconst min2 = s.getMin();\nif (min1 === -3 && top1 === 0 && min2 === -2) return null;\nreturn 'MinStack klassi to\\'g\\'ri ishlamadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Stack (Stek) ma'lumotlar tuzilmasi qaysi tamoyil asosida ishlaydi?",
    "options": [
      "FIFO (First In, First Out) - Birinchi kirgan birinchi chiqadi",
      "LIFO (Last In, First Out) - Oxirgi kirgan birinchi chiqadi",
      "LILO (Last In, Last Out) - Oxirgi kirgan oxirgi chiqadi",
      "Tasodifiy kirish (Random Access)"
    ],
    "correctAnswer": 1,
    "explanation": "Stack 'LIFO' (Oxirgi kirgan birinchi chiqadi) tamoyili bilan ishlaydi. Masalan, ustma-ust taxlangan likopchalar kabi, faqat eng ustidagisini olish mumkin."
  },
  {
    "id": 2,
    "question": "Queue (Navbat) ma'lumotlar tuzilmasi qaysi tamoyil asosida ishlaydi?",
    "options": [
      "FIFO (First In, First Out) - Birinchi kelgan birinchi ketadi",
      "LIFO (Last In, First Out) - Oxirgi kelgan birinchi ketadi",
      "LILO (Last In, Last Out) - Oxirgi kelgan oxirgi ketadi",
      "Kalit bo'yicha kirish (Key Access)"
    ],
    "correctAnswer": 0,
    "explanation": "Queue 'FIFO' (Birinchi kelgan birinchi ketadi) tamoyili bilan ishlaydi. Do'kondagi navbat kabi, navbatga birinchi turgan odamga birinchi xizmat ko'rsatiladi."
  },
  {
    "id": 3,
    "question": "Stack-ka yangi element qo'shish (Push) va undan element o'chirish (Pop) operatsiyalarining vaqt murakkabligi qanday?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n^2)"
    ],
    "correctAnswer": 2,
    "explanation": "Stack-ning eng yuqori qismiga element qo'shish va undan element olish faqat bitta element bilan bog'liq bo'lgani uchun doimiy vaqt (O(1)) oladi."
  },
  {
    "id": 4,
    "question": "Navbat boshidan elementni olish (Dequeue) va navbat oxiriga element qo'shish (Enqueue) ideal holatda qanday vaqt murakkabligiga ega bo'lishi kerak?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "To'g'ri loyihalashtirilgan Queue ma'lumotlar tuzilmasida (masalan, pointerlar yordamida) enqueue va dequeue operatsiyalari O(1) vaqt murakkabligida ishlashi kerak."
  },
  {
    "id": 5,
    "question": "JavaScript-da oddiy massiv (Array) va `.shift()` metodidan foydalanib dequeue qilish nega samarasiz hisoblanadi?",
    "options": [
      "Massivda `.shift()` ishlatib bo'lmasligi sababli",
      "Massivning `.shift()` metodi barcha qolgan elementlarni 1 indeks chapga surib chiqishi tufayli O(n) vaqt talab qilishi uchun",
      "U faqat sonlarni o'chira olgani uchun",
      "Massiv hajmini qisqartira olmasligi sababli"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript massividan `.shift()` yordamida element o'chirilganda, barcha qolgan elementlar bitta indeks chapga suriladi. Bu massiv hajmi n ga proporsional ravishda O(n) vaqt oladi va katta ma'lumotlarda sekinlashadi."
  },
  {
    "id": 6,
    "question": "Stack-dan elementni o'chirmasdan, uning eng yuqorisida turgan qiymatni ko'rish (o'qish) amali nima deyiladi?",
    "options": [
      "Pop",
      "Push",
      "Peek (yoki Top)",
      "Enqueue"
    ],
    "correctAnswer": 2,
    "explanation": "Peek yoki Top operatsiyasi stack-ning tepasida turgan elementni o'chirmasdan, faqat uning qiymatini qaytaradi."
  },
  {
    "id": 7,
    "question": "Quyidagi dasturlardan qaysi biri ish jarayonida Stack tuzilmasidan foydalanadi?",
    "options": [
      "Printerning chop etish navbati",
      "Matn muharrirlaridagi orqaga qaytarish (Undo / Ctrl+Z) amali",
      "Kassa oldidagi mijozlar navbati",
      "Serverga kelayotgan tarmoq so'rovlarini navbat bilan bajarish"
    ],
    "correctAnswer": 1,
    "explanation": "Undo (Ctrl+Z) amali oxirgi bajarilgan harakatlarni saqlash va ularni oxiridan boshlab bekor qilish uchun Stack (LIFO) tizimidan foydalanadi."
  },
  {
    "id": 8,
    "question": "Navbat (Queue) ma'lumotlar tuzilmasi qaysi jarayonda qo'llaniladi?",
    "options": [
      "Dasturdagi funksiya chaqiriqlarini (Call Stack) boshqarishda",
      "Faqat matematik tenglamalarni hisoblashda",
      "Operatsion tizimda resurslar (masalan, printer yoki protsessor) uchun vazifalarni navbatga qo'yishda",
      "Rekursiv funksiyalar chaqirig'ini saqlashda"
    ],
    "correctAnswer": 2,
    "explanation": "Queue (FIFO) operatsion tizimlarda yoki tarmoq tizimlarida vazifalarni kelish tartibiga ko'ra bajarish (Task Scheduling) uchun keng qo'llaniladi."
  },
  {
    "id": 9,
    "question": "Monotonik Stack (Monotonic Stack) nima?",
    "options": [
      "Elementlari har doim faqat o'sib boruvchi yoki kamayib boruvchi tartibda saqlanadigan stack",
      "Faqat bitta element saqlay oladigan stack",
      "Xotiradan joy ajratilmaydigan mavhum stack",
      "Faqat simvollarni tekshiradigan stack"
    ],
    "correctAnswer": 0,
    "explanation": "Monotonik Stack elementlarni qo'shayotganda tartibni saqlaydi: u faqat o'suvchi (monotonic increasing) yoki faqat kamayuvchi (monotonic decreasing) tartibda bo'lsa."
  },
  {
    "id": 10,
    "question": "Stack va Queue n ta element saqlaganda xotira murakkabligi (Space Complexity) qanday bo'ladi?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "correctAnswer": 2,
    "explanation": "Ikkala ma'lumotlar tuzilmasi ham n ta elementni saqlash uchun n ga proporsional qo'shimcha xotira talab qiladi, ya'ni O(n)."
  },
  {
    "id": 11,
    "question": "Call Stack (Chaqiriqlar steki) xotirasi to'lib ketishi natijasida yuzaga keladigan xatolik qanday ataladi?",
    "options": [
      "Queue Overflow",
      "Stack Overflow",
      "Memory Leak",
      "Out of Bounds"
    ],
    "correctAnswer": 1,
    "explanation": "Dasturda rekursiya cheksiz yoki juda chuqur bo'lganda chaqiriqlar steki xotirasi to'lib ketadi va bu 'Stack Overflow' xatolini keltirib chiqaradi."
  },
  {
    "id": 12,
    "question": "Ikkita stack yordamida navbat (Queue) hosil qilganda, `dequeue` amali uchun o'rtacha (amortizatsiyalangan) vaqt murakkabligi qanday bo'ladi?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Dequeue amali ba'zan elementlarni stack1 dan stack2 ga ko'chirishda O(n) vaqt olsa-da, ko'chirilgan elementlar keyingi safar to'g'ridan-to'g'ri O(1) da olinadi. O'rtacha hisobda (amortized) bu operatsiya O(1) vaqt oladi."
  }
]

};

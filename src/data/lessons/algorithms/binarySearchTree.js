export const binarySearchTree = {
  id: "binarySearchTree",
  title: "Ikkilik Qidiruv Daraxti (Binary Search Tree)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Ikkilik Qidiruv Daraxti (Binary Search Tree - BST) nima?
**Ikkilik Daraxt (Binary Tree)** — bu ierarxik ma'lumotlar tuzilmasi bo'lib, unda har bir element (tugun) ko'pi bilan ikkita "farzand" (chap va o'ng tugunlar)ga ega bo'lishi mumkin.
**Ikkilik Qidiruv Daraxti (BST)** — bu ikkilik daraxtning maxsus turi bo'lib, quyidagi qoidalarga bo'ysunadi:
* Har bir tugunning **chap** ostki daraxtidagi barcha qiymatlar shu tugun qiymatidan **kichik** bo'ladi.
* Har bir tugunning **o'ng** ostki daraxtidagi barcha qiymatlar shu tugun qiymatidan **katta** bo'ladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **telefon kitobidan kimnidir qidiryapsiz**:
* Agar kitob sahifalari tartibsiz bo'lsa, siz boshidan boshlab birma-bir varaqlashingiz kerak (chiziqli qidiruv - O(n)).
* Agar siz BST formatidagi tizimdan foydalanamiz desangiz, o'rtadagi ismdan boshlaysiz. Agar siz qidirayotgan ism o'rtadagidan alifbo bo'yicha oldin kelsa, kitobning butun o'ng yarmini tashlab yuborasiz va faqat chap yarmini qidirasiz. Har bir solishtirishda qidiruv maydoni ikki barobar qisqaradi (O(log n)).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Tugun va Daraxt sinfini yaratish hamda kiritish)
Quyida tugun (Node) va daraxt (BST) yaratish hamda unga qiymat kiritish misoli keltirilgan:
\`\`\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null; // Chap farzand
    this.right = null; // O'ng farzand
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null; // Daraxt ildizi
  }

  // Daraxtga yangi qiymat qo'shish
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined; // Bir xil qiymatlar kiritilmaydi
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
console.log(bst.root.value); // 10
console.log(bst.root.left.value); // 5
console.log(bst.root.right.value); // 15
\`\`\`

### 2. Intermediate Example (Qidiruv - Search/Contains)
Daraxt ichidan ma'lum bir qiymatni tezkor qidirib topish:
\`\`\`javascript
class BinarySearchTreeWithSearch extends BinarySearchTree {
  contains(value) {
    if (this.root === null) return false;
    let current = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true; // Topildi!
      }
    }
    return false; // Topilmadi
  }
}
\`\`\`

### 3. Advanced Example (Daraxtni aylanish - In-order DFS)
In-order traversal yordamida daraxt elementlarini saralangan massiv ko'rinishida olish:
\`\`\`javascript
class CompleteBST extends BinarySearchTree {
  // In-order traversal: Chap -> Tugun -> O'ng
  inDFS() {
    const data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return data;
  }
}

const myTree = new CompleteBST();
myTree.insert(10);
myTree.insert(5);
myTree.insert(15);
myTree.insert(8);
console.log(myTree.inDFS()); // [5, 8, 10, 15] (tartiblangan holda chiqadi)
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Tezkor qidirish va kiritish balansi:** Oddiy tartiblangan massivda qidirish tez (Binary Search - O(log n)), lekin yangi element kiritish sekin (O(n)), chunki elementlarni surish kerak. Tartibsiz massivda esa kiritish tez (O(1)), lekin qidirish sekin (O(n)). BST ikkala operatsiyani ham o'rtacha **O(log n)** tezlikda bajarish imkonini beradi.
* **Ierarxik ma'lumotlarni ifodalash:** Fayllar tizimi, HTML DOM daraxti, qarorlar daraxti (Decision Trees) kabi ma'lumotlarni saqlash va boshqarishda daraxt tuzilmasi juda qulaydir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Daraxt balansini hisobga olmaslik (Skewed Tree)
#### Xato:
Agar elementlarni o'sish tartibida kiritib borsak, daraxt bir tomonga qiyshayib, chiziqli ro'yxatga aylanib qoladi.
\`bst.insert(1).insert(2).insert(3).insert(4)\`
Bu holatda qidiruv tezligi O(log n) dan O(n) ga tushib ketadi.
#### Tuzatish:
Katta loyihalarda o'z-o'zini balanslovchi daraxtlardan (masalan, **AVL daraxti** yoki **Qizil-qora daraxt**) foydalanish lozim.

### 2. Rekursiv aylanishda stek to'lib ketishi (Stack Overflow)
Juda chuqur daraxtlarda rekursiyadan foydalanish chaqiriqlar stekini to'ldirib yuborishi mumkin. O'ta katta ma'lumotlar bilan ishlaganda iterativ usullardan foydalanish tavsiya etiladi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Ikkilik qidiruv daraxti (BST) oddiy ikkilik daraxtdan nimasi bilan farq qiladi?
   * **Javob:** BSTda har bir tugunning chap tuguni undan kichik, o'ng tuguni esa undan katta qiymatga ega bo'lishi shart.
2. **Savol:** BSTda eng kichik element qayerda joylashgan bo'ladi?
   * **Javob:** Har doim eng chapki tugunda (rootdan boshlab chapga yurib boriladi).
3. **Savol:** Leaf (barg) tugun nima?
   * **Javob:** Chap va o'ng tarmoqlari \`null\` bo'lgan, ya'ni farzandlari bo'lmagan tugun.
4. **Savol:** \`In-order\` aylanish tartibi qanday?
   * **Javob:** Chap farzand -> Joriy Tugun -> O'ng farzand.

### Middle (5–8)
5. **Savol:** Balanslashgan BSTda element kiritish va o'chirishning vaqt murakkabligi qanday?
   * **Javob:** O(log n) ga teng.
6. **Savol:** Daraxtning balandligi (height) deganda nima tushuniladi?
   * **Javob:** Root tugundan boshlab eng uzoq barg tugungacha bo'lgan yo'ldagi shoxlar (edges) soni.
7. **Savol:** Nima uchun BSTda in-order aylanish har doim saralangan massiv qaytaradi?
   * **Javob:** Chunki u birinchi bo'lib kichik (chap) elementlarni, so'ng o'rta (tugun) elementni, keyin esa katta (o'ng) elementlarni o'qiydi.
8. **Savol:** Unbalanced (balanslanmagan) daraxt nima va u qanday muammo tug'diradi?
   * **Javob:** Chap va o'ng tarmoqlarining chuqurligi keskin farq qiluvchi daraxt. U qidirish operatsiyasini O(n) gacha sekinlashtiradi.

### Senior (9–12)
9. **Savol:** BSTdan ikki farzandi bor tugunni o'chirish qanday amalga oshiriladi?
   * **Javob:** O'chiriladigan tugunning o'rniga uning o'ng ostki daraxtining eng kichik qiymati (inorder successor) yoki chap ostki daraxtining eng katta qiymati (inorder predecessor) qo'yiladi va o'sha almashtirilgan tugun o'chiriladi.
10. **Savol:** BFS (Breadth-First Search) va DFS (Depth-First Search) farqi nimada?
    * **Javob:** BFS daraxtni qavatma-qavat (ko'ndalangiga) tekshiradi. DFS esa daraxtning oxirigacha (chuqurligiga) tushib, keyin ortga qaytadi.
11. **Savol:** Red-Black Tree va AVL Tree o'rtasidagi farq nima?
    * **Javob:** AVL daraxti qattiqroq balanslangan bo'lib, tezkor qidiruv uchun qulayroq. Red-Black daraxti esa kamroq balanslash operatsiyasini talab qilgani uchun kiritish va o'chirish ko'p bo'ladigan holatlarda tezroq ishlaydi.
12. **Savol:** B-daraxtlar (B-Trees) qayerda ko'p ishlatiladi va nega?
    * **Javob:** Ma'lumotlar bazasi indekslarida (masalan, MySQL, PostgreSQL) va fayl tizimlarida. Ular diskdan o'qish operatsiyalarini kamaytirish uchun ko'p tarmoqli (multi-way) qilib loyihalashtirilgan.

---

## 6. 🎨 Interaktiv Vizual

Daraxt tuzilmalari xotirada qanday saqlanishini tushunish juda muhimdir. Massivlardan farqli o'laroq (ular xotirada ketma-ket kataklarda joylashadi), daraxt tugunlari **Heap (Dinamik xotira)** bo'ylab tarqalib ketgan bo'ladi va bir-biri bilan **Reference (Havola / Ko'rsatkich)** orqali bog'lanadi.

### 1. Ikkilik Qidiruv Daraxtining Xotira Strukturasi

Quyidagi jadval va sxemalarda [10, 5, 15] elementlaridan iborat daraxtning xotira ko'rinishi ko'rsatilgan:

* **Stack xotira:** \`bst\` o'zgaruvchisini saqlaydi, u esa Heap-dagi \`BinarySearchTree\` obyekti manziliga (\`@100\` kabi) ishora qiladi.
* **Heap xotira:**
  * \`BinarySearchTree\` obyekti \`@100\` manzilda joylashgan va \`root\` xususiyati orqali \`@200\` manzildagi \`Node\` obyektiga ishora qiladi.
  * \`@200\` manzilda \`Node(10)\` joylashgan. Uning \`left\` xususiyati \`@300\` manzilga, \`right\` xususiyati \`@400\` manzilga ishora qiladi.
  * \`@300\` manzilda \`left\` va \`right\` pointerlari \`null\` bo'lgan \`Node(5)\` joylashgan.
  * \`@400\` manzilda \`left\` va \`right\` pointerlari \`null\` bo'lgan \`Node(15)\` joylashgan.

\`\`\`mermaid
classDiagram
    class Stack {
        +bst : @100 (Heap Address)
    }
    class Heap_BST {
        +root : @200 (Node 10)
    }
    class Heap_Node_10 {
        +value : 10
        +left : @300 (Node 5)
        +right : @400 (Node 15)
    }
    class Heap_Node_5 {
        +value : 5
        +left : null
        +right : null
    }
    class Heap_Node_15 {
        +value : 15
        +left : null
        +right : null
    }
    
    Stack --> Heap_BST : points to
    Heap_BST --> Heap_Node_10 : root pointer
    Heap_Node_10 --> Heap_Node_5 : left pointer
    Heap_Node_10 --> Heap_Node_15 : right pointer
\`\`\`

### 2. Daraxtning Mantiqiy Strukturasi va Pointer Oqimi

Quyidagi diagrammada ma'lumotlar oqimi va chap/o'ng shoxlanish qoidalari ko'rsatilgan. Har bir tugunda qiymat va ikkita pointer mavjud:

\`\`\`mermaid
graph TD
    subgraph Logical BST Structure
        N10["Node (10) <br/> Address: @200"]
        N5["Node (5) <br/> Address: @300"]
        N15["Node (15) <br/> Address: @400"]
        
        N10 -- "left <br/> (value < 10)" --> N5
        N10 -- "right <br/> (value > 10)" --> N15
    end
    
    subgraph Memory Representation
        M1["Stack: bst = Ref(@100)"]
        M2["Heap @100: BST { root: Ref(@200) }"]
        M3["Heap @200: Node { value: 10, left: Ref(@300), right: Ref(@400) }"]
        M4["Heap @300: Node { value: 5, left: null, right: null }"]
        M5["Heap @400: Node { value: 15, left: null, right: null }"]
    end
    
    M1 -.-> M2
    M2 -.-> M3
    M3 -.-> M4
    M3 -.-> M5
\`\`\`

### 3. Rekursiv In-Order Traversal (Aylanish) Simulyatsiyasi

Daraxtni aylanishda chaqiriqlar staki (Call Stack) qanday o'zgarishini ko'rish:

\`\`\`mermaid
sequenceDiagram
    participant CallStack as Call Stack (LIFO)
    participant N10 as Node 10 (Root)
    participant N5 as Node 5 (Left)
    participant N15 as Node 15 (Right)
    
    Note over CallStack: inOrder() chaqirildi
    CallStack->>N10: traverse(Node 10)
    CallStack->>N5: traverse(Node 5)
    Note over CallStack: Node 5 chap/o'ng null
    Note over CallStack: Natija: [5] yozildi
    N5-->>CallStack: qaytdi
    Note over CallStack: Node 10 o'zi yozildi: [5, 10]
    CallStack->>N15: traverse(Node 15)
    Note over CallStack: Node 15 chap/o'ng null
    Note over CallStack: Natija: [5, 10, 15] yozildi
    N15-->>CallStack: qaytdi
    N10-->>CallStack: tugadi
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali BST yaratish, element qo'shish va qidirish metodlarini amalda sinab ko'rasiz.

---

## 8. 🎯 Real Project Case Study

### Avtomatik To'ldirish (Autocomplete) tizimi uchun lug'at daraxti
Katta hajmdagi matnlar ichidan so'zlarni tezkor qidirish uchun BST yoki uning modifikatsiyasi bo'lgan Trie (lug'at daraxti) tuzilmasi ishlatiladi.

#### Oddiy BST qidiruv tizimi simulyatsiyasi:
\`\`\`javascript
class WordNode {
  constructor(word) {
    this.word = word;
    this.left = null;
    this.right = null;
  }
}

class AutoCompleteDictionary {
  constructor() {
    this.root = null;
  }

  addWord(word) {
    const newNode = new WordNode(word.toLowerCase());
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (word < current.word) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else if (word > current.word) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        break; // So'z allaqachon bor
      }
    }
  }

  // Berilgan prefiks bilan boshlanadigan so'z borligini tekshirish
  hasWord(word) {
    let current = this.root;
    while (current) {
      if (word === current.word) return true;
      if (word < current.word) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Daraxtni balanslash:** Agar ma'lumotlar juda ko'p bo'lsa, massivdan BST yasashda avval massivni saralab olib, o'rtadagi elementni root qilish orqali balanslangan daraxt yasash mumkin (Divide and Conquer).
* **Iterativ metodlar:** Recursion o'rniga \`while\` siklidan foydalanish xotira (Call Stack) sarfini kamaytiradi va JavaScript dvigatelida tezroq ishlaydi.

---

## 10. 📌 Cheat Sheet

| Operatsiya | Balanslangan BST | Qiyshaygan (Skewed) BST | Tavsif |
| :--- | :--- | :--- | :--- |
| **Qidiruv (Search)** | O(log n) | O(n) | Ildizdan boshlab chap/o'ngga qarab yuriladi |
| **Kiritish (Insert)** | O(log n) | O(n) | Bo'sh joy topilguncha solishtirib boriladi |
| **O'chirish (Delete)**| O(log n) | O(n) | Tugun topilib, farzandlar soniga qarab qayta ulanadi |
| **In-order aylanish**| O(n) | O(n) | Elementlarni o'sish tartibida o'qish |
`,
  exercises: [
  {
    "id": 1,
    "title": "Daraxtga element qo'shish (insert)",
    "instruction": "Ikkilik qidiruv daraxtiga yangi qiymat qo'shuvchi `insert(value)` metodini yozing. Metod qiymatni to'g'ri chap yoki o'ng tarmoqqa joylashtirishi va `this` (daraxt obyekti) ni qaytarishi kerak. `Node` va `BinarySearchTree` klasslari berilgan.",
    "startingCode": "class Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BinarySearchTree {\n  constructor() {\n    this.root = null;\n  }\n\n  insert(value) {\n    // Kodni shu yerda yozing\n  }\n}\n",
    "hint": "Agar root bo'sh bo'lsa, uni yangi Node qiling. Aks holda rekursiv yoki sikl yordamida qiymatni root.value bilan solishtirib, kichik bo'lsa chapga, katta bo'lsa o'ngga yuring.",
    "test": "const sandbox = new Function(code + '; return BinarySearchTree;');\nconst BST = sandbox();\nconst bst = new BST();\nbst.insert(10);\nbst.insert(5);\nbst.insert(15);\nbst.insert(7);\nif (!bst.root) return 'Root null bo\\'lib qoldi';\nif (bst.root.value !== 10) return 'Root qiymati noto\\'g\\'ri';\nif (!bst.root.left || bst.root.left.value !== 5) return 'Chap tugun noto\\'g\\'ri joylashdi';\nif (!bst.root.right || bst.root.right.value !== 15) return 'O\\'ng tugun noto\\'g\\'ri joylashdi';\nif (!bst.root.left.right || bst.root.left.right.value !== 7) return 'Chuqurroqdagi tugun noto\\'g\\'ri joylashdi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Daraxtdan qiymat qidirish (contains)",
    "instruction": "Berilgan `value` qiymati daraxtda bor yoki yo'qligini tekshiruvchi `contains(value)` metodini yozing. Agar qiymat topilsa `true`, aks holda `false` qaytarsin.",
    "startingCode": "class Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BinarySearchTree {\n  constructor() {\n    this.root = null;\n  }\n\n  insert(value) {\n    const newNode = new Node(value);\n    if (!this.root) { this.root = newNode; return this; }\n    let current = this.root;\n    while (true) {\n      if (value === current.value) return this;\n      if (value < current.value) {\n        if (!current.left) { current.left = newNode; return this; }\n        current = current.left;\n      } else {\n        if (!current.right) { current.right = newNode; return this; }\n        current = current.right;\n      }\n    }\n  }\n\n  contains(value) {\n    // Kodni shu yerda yozing\n  }\n}\n",
    "hint": "Rootdan boshlab joriy tugunni tekshiring. Agar value kichik bo'lsa chapga, katta bo'lsa o'ngga o'ting. Teng bo'lsa true, tugun tugasa va topilmasa false qaytaring.",
    "test": "const sandbox = new Function(code + '; return BinarySearchTree;');\nconst BST = sandbox();\nconst bst = new BST();\nbst.insert(50).insert(30).insert(70).insert(20).insert(40);\nif (bst.contains(30) !== true) return 'Mavjud qiymat (30) topilmadi (true qaytishi kerak edi)';\nif (bst.contains(70) !== true) return 'Mavjud qiymat (70) topilmadi';\nif (bst.contains(100) !== false) return 'Mavjud bo\\'lmagan qiymat (100) uchun true qaytdi';\nif (bst.contains(10) !== false) return 'Mavjud bo\\'lmagan qiymat (10) uchun true qaytdi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "In-Order traversal (Daraxtni tartib bilan aylanish)",
    "instruction": "Daraxtdagi elementlarni o'sish tartibida yig'ib beruvchi `inOrder()` metodini yozing. U massiv qaytarishi kerak. Masalan: `[left, root, right]` tartibida rekursiv aylanib chiqish.",
    "startingCode": "class Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BinarySearchTree {\n  constructor() {\n    this.root = null;\n  }\n\n  insert(value) {\n    const newNode = new Node(value);\n    if (!this.root) { this.root = newNode; return this; }\n    let current = this.root;\n    while (true) {\n      if (value === current.value) return this;\n      if (value < current.value) {\n        if (!current.left) { current.left = newNode; return this; }\n        current = current.left;\n      } else {\n        if (!current.right) { current.right = newNode; return this; }\n        current = current.right;\n      }\n    }\n  }\n\n  inOrder() {\n    // Kodni shu yerda yozing\n  }\n}\n",
    "hint": "Yordamchi rekursiv funksiya yozing: `traverse(node)`. Avval `traverse(node.left)` ni chaqiring, keyin node qiymatini massivga yozing, so'ng `traverse(node.right)` ni chaqiring.",
    "test": "const sandbox = new Function(code + '; return BinarySearchTree;');\nconst BST = sandbox();\nconst bst = new BST();\nbst.insert(15).insert(10).insert(20).insert(8).insert(12).insert(18).insert(25);\nconst res = bst.inOrder();\nif (!Array.isArray(res)) return 'inOrder() massiv qaytarmadi';\nconst expected = [8, 10, 12, 15, 18, 20, 25];\nif (res.length !== expected.length) return 'Massiv elementlari soni noto\\'g\\'ri';\nfor (let i = 0; i < expected.length; i++) {\n  if (res[i] !== expected[i]) return `Kutilgan qiymat: ${expected}, lekin olindi: ${res}`;\n}\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Ikkilik qidiruv daraxti (Binary Search Tree - BST) nima?",
    "options": [
      "Har bir tugun ko'pi bilan bitta farzandga ega bo'lgan chiziqli ma'lumotlar tuzilmasi",
      "Har bir tugun ko'pi bilan ikkita farzandga ega bo'lgan va chap farzand qiymati ota tugundan kichik, o'ng farzand qiymati esa katta bo'lgan daraxt",
      "Barcha tugunlari bir xil darajada joylashgan ierarxik bo'lmagan massiv",
      "Elementlari faqat boolean (true/false) qiymatlardan iborat bo'lgan grafik shakli"
    ],
    "correctAnswer": 1,
    "explanation": "BSTda har bir tugunning chap tarmog'idagi barcha qiymatlar shu tugun qiymatidan kichik, o'ng tarmog'idagi barcha qiymatlar esa o'sha tugun qiymatidan katta bo'lishi shart."
  },
  {
    "id": 2,
    "question": "Balanslashtirilgan BSTda elementni qidirish yoki kiritishning o'rtacha vaqt murakkabligi (Time Complexity) qanday?",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    "correctAnswer": 2,
    "explanation": "Balanslashtirilgan daraxtda har safar solishtirish amalga oshirilganda qidiruv sohasi yarmi qisqaradi, shuning uchun o'rtacha vaqt murakkabligi O(log n) ga teng."
  },
  {
    "id": 3,
    "question": "Daraxt butunlay chiziqli (skewed) bo'lib qolsa (masalan, faqat o'ngga yoki faqat chapga o'ssa), qidiruvning eng yomon holatdagi (worst-case) murakkabligi qanday bo'ladi?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n²)"
    ],
    "correctAnswer": 0,
    "explanation": "Daraxt chiziqli bo'lib qolganda, u bog'langan ro'yxat (linked list) kabi ishlaydi. Elementlarni qidirish uchun barcha tugunlarni ketma-ket tekshirish kerak bo'ladi, bu esa O(n) murakkablikka olib keladi."
  },
  {
    "id": 4,
    "question": "BST elementlarini o'sish tartibida (tartiblangan holda) chiqarish uchun daraxtni qaysi tartibda aylanish (Traversal) kerak?",
    "options": [
      "Pre-order (Tugun -> Chap -> O'ng)",
      "Post-order (Chap -> O'ng -> Tugun)",
      "In-order (Chap -> Tugun -> O'ng)",
      "Level-order (Qavatma-qavat)"
    ],
    "correctAnswer": 2,
    "explanation": "In-order aylanib chiqishda birinchi navbatda chap tomondagi kichik qiymat, keyin tugun o'zi va oxirida o'ng tomondagi katta qiymat olinadi. Bu esa o'z-o'zidan tartiblangan ketma-ketlikni beradi."
  },
  {
    "id": 5,
    "question": "Daraxtning eng yuqorisida joylashgan va hech qanday ota tugunga ega bo'lmagan boshlang'ich tugun nima deyiladi?",
    "options": [
      "Leaf (Barg)",
      "Root (Ildiz)",
      "Branch (Shox)",
      "Sibling (Aka-uka)"
    ],
    "correctAnswer": 1,
    "explanation": "Daraxtning eng yuqori tuguni 'Root' (ildiz) tugun deb ataladi va barcha boshqa tugunlar undan tarqaladi."
  },
  {
    "id": 6,
    "question": "Farzandlari (chap va o'ng tugunlari) bo'lmagan daraxt tugunlari qanday nomlanadi?",
    "options": [
      "Leaf nodes (Barg tugunlar)",
      "Internal nodes (Ichki tugunlar)",
      "Root nodes (Ildiz tugunlar)",
      "Subtrees (Yordamchi daraxtlar)"
    ],
    "correctAnswer": 0,
    "explanation": "Hech qanday farzandga (left = null, right = null) ega bo'lmagan tugunlar 'Leaf' (barg) tugunlar deb ataladi."
  },
  {
    "id": 7,
    "question": "Agar BSTga ketma-ket [15, 10, 20, 12, 17] qiymatlari kiritilsa, 12 qiymati qayerga joylashadi?",
    "options": [
      "10 tugunining o'ng tomoniga",
      "10 tugunining chap tomoniga",
      "20 tugunining o'ng tomoniga",
      "15 tugunining chap tomoniga to'g'ridan-to'g'ri root sifatida"
    ],
    "correctAnswer": 0,
    "explanation": "12 qiymati 15 dan kichik (chapga ketadi), 10 dan esa katta. Shuning uchun u 10 ning o'ng tomoniga joylashadi."
  },
  {
    "id": 8,
    "question": "Quyidagilardan qaysi biri binary tree aylanish (traversal) usuliga kirmaydi?",
    "options": [
      "Pre-order",
      "Post-order",
      "In-order",
      "Bubble-order"
    ],
    "correctAnswer": 3,
    "explanation": "Pre-order, Post-order va In-order ikkilik daraxtlarni aylanishning standart chuqurlik bo'yicha (DFS) usullaridir. Bubble-order degan usul mavjud emas."
  },
  {
    "id": 9,
    "question": "Qidiruv daraxtida har qanday tugunning chap va o'ng ostki daraxtlari (subtrees) balandligi farqi ko'pi bilan 1 bo'lsa, bunday daraxt qanday ataladi?",
    "options": [
      "Chiziqli daraxt (Skewed Tree)",
      "Balanslashgan daraxt (Balanced Tree)",
      "To'liq bo'lmagan daraxt (Unbalanced Tree)",
      "Bo'sh daraxt (Empty Tree)"
    ],
    "correctAnswer": 1,
    "explanation": "Balandliklar farqi 1 dan oshmaydigan daraxt 'Balanslashgan daraxt' (Balanced Tree) deyiladi (masalan, AVL yoki Red-Black daraxtlari)."
  },
  {
    "id": 10,
    "question": "BSTdan elementni o'chirish (Delete) operatsiyasida eng murakkab holat qaysi?",
    "options": [
      "O'chiriladigan tugun barg (leaf) bo'lsa",
      "O'chiriladigan tugunning faqat bitta farzandi bo'lsa",
      "O'chiriladigan tugunning ikkita farzandi bo'lsa",
      "O'chiriladigan tugun root bo'lsa va daraxtda faqat bitta tugun bo'lsa"
    ],
    "correctAnswer": 2,
    "explanation": "Ikki farzandli tugun o'chirilganda, uning o'rniga o'ng ostki daraxtning eng kichik elementini (inorder successor) yoki chap ostki daraxtning eng katta elementini (inorder predecessor) topib qo'yish kerak bo'ladi."
  },
  {
    "id": 11,
    "question": "Nima uchun odatiy massivga qaraganda BSTdan foydalanish afzalroq bo'lishi mumkin?",
    "options": [
      "Daraxt xotiradan kam joy egallaydi",
      "Tartiblangan massivda yangi element qo'shish O(n) vaqt olsa, BSTda o'rtacha O(log n) vaqt oladi va qidirish tez bajariladi",
      "Daraxtda elementlar faqat string formatida saqlanadi",
      "Daraxt elementlari brauzer keshida avtomatik saqlanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Tartiblangan massivda element kiritish boshqa elementlarni surish kerakligi sababli O(n) vaqt talab qiladi, BSTda esa ko'rsatkichlar (pointers) o'zgartiriladi, bu esa O(log n) da bajariladi."
  },
  {
    "id": 12,
    "question": "Pre-order aylanib chiqish (Traversal) tartibi qanday?",
    "options": [
      "Tugun o'zi -> Chap farzand -> O'ng farzand",
      "Chap farzand -> Tugun o'zi -> O'ng farzand",
      "Chap farzand -> O'ng farzand -> Tugun o'zi",
      "O'ng farzand -> Tugun o'zi -> Chap farzand"
    ],
    "correctAnswer": 0,
    "explanation": "Pre-order (oldindan tartiblash) usulida birinchi bo'lib joriy tugunning o'zi olinadi, so'ng chap ostki daraxt va keyin o'ng ostki daraxt aylaniladi."
  }
]

};

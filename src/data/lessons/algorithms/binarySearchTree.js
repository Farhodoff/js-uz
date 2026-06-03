export const binarySearchTree = {
  id: "binarySearchTree",
  title: "Ikkilik Qidiruv Daraxti (Binary Search Tree)",
  theory: `## 1. NEGA kerak?
Chiziqli ma'lumotlar tuzilmalarida (massiv, linked list) ma'lumotlarni tartiblangan holda saqlash va tez qidirish orasida doimiy ziddiyat bor. Massivda tez qidirish mumkin (Binary Search $O(\log n)$), lekin yangi element qo'shish qiyin ($O(n)$). Linked listda esa qo'shish tez ($O(1)$), lekin qidirish qiyin ($O(n)$).
**Binary Search Tree (BST)** (Ikkilik qidiruv daraxti) esa ierarxik tuzilishi orqali ikkala amaliyotni ham o'ta samarali — o'rtacha **$O(\log n)$** vaqt ichida bajarish imkonini beradi. Bu uni ma'lumotlar bazalari indekslarida, fayl tizimlarida va tezkor qidiruv tizimlarida almashtirib bo'lmas tuzilmaga aylantiradi.

## 2. SODDALIK (Analogiya)
Buni **kutubxonadagi kitoblarni tartiblash tizimiga** o'xshatish mumkin:
Tasavvur qiling, sizga biror kitob kerak. Agar barcha kitoblar bitta chiziqda taxlangan bo'lsa, siz boshidan boshlab bittalab qidirasiz ($O(n)$).
Lekin kutubxonachi kitoblarni shunday joylaganki, siz o'rtada turibsiz. Chap tomonda faqat siz qidirayotgan harfdan oldingi harflar (A-M), o'ng tomonda esa keyingi harflar (N-Z) bor. Siz bitta qaror bilan kitoblarning yarmini tekshirishdan voz kechasiz. BST ham xuddi shunday ishlaydi: har bir qadamda muammoni yarmiga qisqartiradi.

## 3. STRUKTURA VA PRINTSIPLAR
Daraxt tugunlar (Nodes) dan iborat bo'lib, eng tepada bitta **Root** (Ildiz) tugun turadi.
Har bir tugun ko'pi bilan 2 ta bolaga ega bo'lishi mumkin: **Left child** (chap bola) va **Right child** (o'ng bola).

### BST ning asosiy oltin qoidasi:
1. Tugunning **chap** tarafidagi barcha tugunlarning qiymatlari shu tugun qiymatidan **kichik** bo'ladi.
2. Tugunning **o'ng** tarafidagi barcha tugunlarning qiymatlari shu tugun qiymatidan **katta** bo'ladi.

\`mermaid
graph TD
    subgraph Balanced ["Balanced Tree (Balandlik = 2)"]
        B1((20)) --> B2((10))
        B1 --> B3((30))
        B2 --> B4((5))
        B2 --> B5((15))
    end
    subgraph Skewed ["Skewed Tree (Balandlik = 3)"]
        S1((5)) --> S2((null))
        S1 --> S3((10))
        S3 --> S4((null))
        S3 --> S5((15))
    end
\`

### A. Balanced vs Unbalanced Trees
Daraxtga elementlar qanday tartibda qo'shilishi daraxt shakliga katta ta'sir qiladi:
- **Balanced (Muvozanatli):** Chap va o'ng shoxlar balandligi taxminan teng. Qidiruv tezligi doimo optimal $O(\log n)$ bo'ladi.
- **Unbalanced / Degenerate (Muvozanatsiz):** Elementlar tartiblangan holda kelganda (masalan, 1, 2, 3, 4), daraxt bitta chiziq bo'lib o'ngga yoki chapga cho'zilib ketadi va tezligi chiziqli $O(n)$ bo'lib qoladi (Linked List holiga keladi).

### B. Daraxtni aylanib chiqish (Traversals)
1. **DFS (Depth-First Search - Chuqurlik bo'yicha):**
   - **In-Order (Chap -> Ota -> O'ng):** Elementlarni tartiblangan holda (kichikdan kattaga) chiqaradi.
   - **Pre-Order (Ota -> Chap -> O'ng):** Daraxt nusxasini yaratishda ishlatiladi.
   - **Post-Order (Chap -> O'ng -> Ota):** Elementlarni (yoki fayllarni) pastdan yuqoriga o'chirishda ishlatiladi.
2. **BFS (Breadth-First Search - Kenglik bo'yicha):** Darajama-daraja (Level Order) aylanadi.

\`mermaid
graph TD
    classDef nodeStyle fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff;
    
    A((A)):::nodeStyle --> B((B)):::nodeStyle
    A --> C((C)):::nodeStyle
    
    NoteA["In-Order: B -> A -> C <br> Pre-Order: A -> B -> C <br> Post-Order: B -> C -> A"]
\`

## 4. AMALIYOT
Tugun strukturasi:
\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
\`

### Qidirish algoritmi (Search)
\`javascript
function search(node, target) {
  if (node === null || node.value === target) return node;
  if (target < node.value) return search(node.left, target);
  return search(node.right, target);
}
\`

## 5. XATOLAR (Common mistakes)
1. **Daraxt muvozanati buzilishi (Skewed Tree):** Balanslanmagan BST oddiy Linked Listga va vaqt murakkabligi $O(n)$ ga tushib ketishi.
2. **BST qoidasini noto'g'ri tekshirish:** Tugunning faqat bevosita bolalari o'zaro to'g'ri bog'langanini tekshirish kifoya qilmaydi. Chap tarmog'idagi barcha elementlar joriy tugundan kichik bo'lishi lozim.
3. **Rekursiya chuqurligi (Stack Overflow):** Balanslanmagan juda katta daraxtlarda rekursiv usullar Call Stack-ni to'ldirib yuborishi mumkin.

## 6. SAVOLLAR VA JAVOBLAR
**1. Ikkilik daraxt (Binary Tree) nima?**
Har bir tuguni ko'pi bilan ikkita (chap va o'ng) bolaga ega bo'lishi mumkin bo'lgan ierarxik ma'lumotlar tuzilmasi.

**2. Binary Search Tree (BST) oddiy Binary Tree-dan nimasi bilan farq qiladi?**
BST-da tartib qoidasi bor: chap bolalar ota-onadan kichik, o'ng bolalar esa ota-onadan katta bo'ladi.

**3. Balanslashgan BST-da qidiruv vaqt murakkabligi qanday?**
O'rtacha holatda barcha amallar uchun $O(\log n)$ ga teng.

**4. Eng yomon holatda (Skewed Tree) BST tezligi qanday bo'ladi?**
$O(n)$ bo'lib qoladi, chunki daraxt chiziqli bog'langan ro'yxatga aylanib qoladi.

**5. Red-Black Tree va AVL daraxtlarining maqsadi nima?**
Ular elementlar qo'shilganda yoki o'chirilganda daraxtni avtomatik ravishda balanslab (muvozanatda saqlab) turuvchi o'z-o'zini balanslovchi BST hisoblanadi.
`,
  exercises: [
    {
      id: 1,
      title: "BST Tuguni (BSTNode)",
      instruction: "Binary Search Tree tuguni uchun `value`, chap (`left = null`) va o'ng (`right = null`) ko'rsatkichli `BSTNode` klassini yozing.",
      startingCode: "class BSTNode {\n  // Constructor yarating\n}",
      hint: "constructor(value) { this.value = value; this.left = null; this.right = null; }",
      test: "if (typeof BSTNode !== 'function') return 'BSTNode klassi topilmadi'; const n = new BSTNode(15); if(n.value !== 15 || n.left !== null || n.right !== null) return 'BSTNode xossalari xato'; return null;"
    },
    {
      id: 2,
      title: "BST-ga element qo'shish (Insert)",
      instruction: "BinarySearchTree klassiga yangi qiymatni BST qoidasi bo'yicha rekursiv joylashtiradigan `insert(value)` metodini yozing.",
      startingCode: "class BSTNode {\n  constructor(value) { this.value = value; this.left = null; this.right = null; }\n}\nclass BinarySearchTree {\n  constructor() { this.root = null; }\n  insert(value) {\n    const newNode = new BSTNode(value);\n    if (!this.root) { this.root = newNode; return; }\n    this._insertNode(this.root, newNode);\n  }\n  _insertNode(node, newNode) {\n    // Rekursiv qo'shish logikasini yozing\n  }\n}",
      hint: "if (newNode.value < node.value) {\n  if (!node.left) node.left = newNode;\n  else this._insertNode(node.left, newNode);\n} else {\n  if (!node.right) node.right = newNode;\n  else this._insertNode(node.right, newNode);\n}",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); bst.insert(10); bst.insert(5); bst.insert(15); if(bst.root.value !== 10) return 'Root xato'; if(bst.root.left.value !== 5) return 'Chap shox xato'; if(bst.root.right.value !== 15) return 'O\\'ng shox xato'; return null;"
    },
    {
      id: 3,
      title: "BST-dan element izlash (Search)",
      instruction: "Daraxtdan berilgan `value` qiymatini izlab, topilgan tugunni qaytaradigan `search(node, value)` rekursiv metodini yozing (topilmasa null).",
      startingCode: "class BinarySearchTree {\n  constructor() { this.root = null; }\n  search(node, value) {\n    // Rekursiv qidiruv shartini yozing\n  }\n}",
      hint: "if (!node) return null;\nif (value < node.value) return this.search(node.left, value);\nif (value > node.value) return this.search(node.right, value);\nreturn node;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const root = { value: 10, left: { value: 5, left: null, right: null }, right: null }; bst.root = root; if(!bst.search(root, 5) || bst.search(root, 5).value !== 5) return 'Mavjud element topilmadi'; if(bst.search(root, 12) !== null) return 'Mavjud bo\\'lmagan element uchun null bo\\'lishi kerak'; return null;"
    },
    {
      id: 4,
      title: "In-Order Traversal (Tartiblangan)",
      instruction: "Daraxt elementlarini o'sish tartibida massivga yozib qaytaradigan `inOrder(node, arr = [])` metodini yozing.",
      startingCode: "class BinarySearchTree {\n  inOrder(node, arr = []) {\n    // Chap, Ota, O'ng tartibida rekursiya qiling\n  }\n}",
      hint: "if (node) {\n  this.inOrder(node.left, arr);\n  arr.push(node.value);\n  this.inOrder(node.right, arr);\n}\nreturn arr;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const root = { value: 10, left: { value: 5, left: null, right: null }, right: { value: 15, left: null, right: null } }; const res = bst.inOrder(root); if (res[0] !== 5 || res[1] !== 10 || res[2] !== 15) return 'In-order tartibi xato'; return null;"
    },
    {
      id: 5,
      title: "Pre-Order Traversal",
      instruction: "Avval ota-ona, keyin chap va o'ng shoxlarni aylanadigan `preOrder(node, arr = [])` metodini yozing.",
      startingCode: "class BinarySearchTree {\n  preOrder(node, arr = []) {\n    // Ota, Chap, O'ng tartibida\n  }\n}",
      hint: "if (node) {\n  arr.push(node.value);\n  this.preOrder(node.left, arr);\n  this.preOrder(node.right, arr);\n}\nreturn arr;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const root = { value: 10, left: { value: 5, left: null, right: null }, right: { value: 15, left: null, right: null } }; const res = bst.preOrder(root); if (res[0] !== 10 || res[1] !== 5 || res[2] !== 15) return 'Pre-order tartibi xato'; return null;"
    },
    {
      id: 6,
      title: "Post-Order Traversal",
      instruction: "Avval chap va o'ng bolalar, eng oxirida ota-onani aylanadigan `postOrder(node, arr = [])` metodini yozing.",
      startingCode: "class BinarySearchTree {\n  postOrder(node, arr = []) {\n    // Chap, O'ng, Ota tartibida\n  }\n}",
      hint: "if (node) {\n  this.postOrder(node.left, arr);\n  this.postOrder(node.right, arr);\n  arr.push(node.value);\n}\nreturn arr;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const root = { value: 10, left: { value: 5, left: null, right: null }, right: { value: 15, left: null, right: null } }; const res = bst.postOrder(root); if (res[0] !== 5 || res[1] !== 15 || res[2] !== 10) return 'Post-order tartibi xato'; return null;"
    },
    {
      id: 7,
      title: "Eng kichik element (Min Value)",
      instruction: "Daraxtdagi eng kichik qiymatni topuvchi `getMin(node)` metodini yozing (eng chap tomonga boring).",
      startingCode: "class BinarySearchTree {\n  getMin(node) {\n    // Eng chapdagi tugungacha sikl yozing\n  }\n}",
      hint: "if (!node) return null; while(node.left) node = node.left; return node.value;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const root = { value: 10, left: { value: 3, left: null, right: null }, right: null }; if (bst.getMin(root) !== 3) return 'Eng kichik element topilmadi'; return null;"
    },
    {
      id: 8,
      title: "Eng katta element (Max Value)",
      instruction: "Daraxtdagi eng katta qiymatni topuvchi `getMax(node)` metodini yozing (eng o'ng tomonga boring).",
      startingCode: "class BinarySearchTree {\n  getMax(node) {\n    // Eng o'ngdagi tugungacha boring\n  }\n}",
      hint: "if (!node) return null; while(node.right) node = node.right; return node.value;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const root = { value: 10, left: null, right: { value: 20, left: null, right: null } }; if (bst.getMax(root) !== 20) return 'Eng katta element topilmadi'; return null;"
    },
    {
      id: 9,
      title: "BFS - Kenglik bo'yicha aylanib chiqish",
      instruction: "Navbat (Queue) yordamida darajama-daraja aylanib chiqadigan `bfs(node)` metodini yozing (qiymatlar massivini qaytaring).",
      startingCode: "class BinarySearchTree {\n  bfs(node) {\n    if (!node) return [];\n    const queue = [node];\n    const result = [];\n    // queue yordamida level-order aylaning\n  }\n}",
      hint: "while(queue.length) {\n  let curr = queue.shift();\n  result.push(curr.value);\n  if (curr.left) queue.push(curr.left);\n  if (curr.right) queue.push(curr.right);\n} return result;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const root = { value: 10, left: { value: 5, left: null, right: null }, right: { value: 15, left: null, right: null } }; const res = bst.bfs(root); if (res[0] !== 10 || res[1] !== 5 || res[2] !== 15) return 'BFS tartibi xato'; return null;"
    },
    {
      id: 10,
      title: "Daraxt balandligi (Height)",
      instruction: "Daraxt balandligini (root-dan eng uzoq barggacha bo'lgan yo'l uzunligi) hisoblaydigan rekursiv `getHeight(node)` metodini yozing.",
      startingCode: "class BinarySearchTree {\n  getHeight(node) {\n    // Rekursiv balandlikni hisoblang\n  }\n}",
      hint: "if (!node) return -1; return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); if (bst.getHeight(null) !== -1) return 'Bo\\'sh daraxt balandligi -1 bo\\'lishi kerak'; const root = { value: 10, left: { value: 5, left: null, right: null }, right: null }; if (bst.getHeight(root) !== 1) return 'Balandlik xato'; return null;"
    },
    {
      id: 11,
      title: "BST ekanligini tekshirish",
      instruction: "Daraxt BST oltin qoidasiga to'liq javob berishini tekshiradigan `isValidBST(node, min = null, max = null)` metodini yozing (true/false).",
      startingCode: "class BinarySearchTree {\n  isValidBST(node, min = null, max = null) {\n    // Diapazonni tekshiring\n  }\n}",
      hint: "if (!node) return true;\nif (min !== null && node.value <= min) return false;\nif (max !== null && node.value >= max) return false;\nreturn this.isValidBST(node.left, min, node.value) && this.isValidBST(node.right, node.value, max);",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); const validRoot = { value: 10, left: { value: 5, left: null, right: null }, right: { value: 15, left: null, right: null } }; if (bst.isValidBST(validRoot) !== true) return 'To\\'g\\'ri BSTni xato deb topdi'; const invalidRoot = { value: 10, left: { value: 12, left: null, right: null }, right: null }; if (bst.isValidBST(invalidRoot) !== false) return 'Noto\\'g\\'ri BSTni aniqlay olmadi'; return null;"
    },
    {
      id: 12,
      title: "Qiymat borligini tekshirish (Contains)",
      instruction: "Daraxtda qidirilayotgan qiymat bor yoki yo'qligini tekshirib true/false qaytaradigan `contains(value)` metodini yozing.",
      startingCode: "class BinarySearchTree {\n  constructor() { this.root = null; }\n  contains(value) {\n    let curr = this.root;\n    // Sikl yordamida qidirib true/false qaytaring\n  }\n}",
      hint: "while(curr) {\n  if (value === curr.value) return true;\n  curr = value < curr.value ? curr.left : curr.right;\n} return false;",
      test: "if (typeof BinarySearchTree !== 'function') return 'BinarySearchTree topilmadi'; const bst = new BinarySearchTree(); bst.root = { value: 10, left: { value: 5, left: null, right: null }, right: null }; if (bst.contains(5) !== true) return 'Mavjud element topilmadi'; if (bst.contains(8) !== false) return 'Mavjud bo\\'lmagan element uchun true berildi'; return null;"
    },
    {
      id: 13,
      title: "Ikkilik daraxtni teskarilash (Invert Binary Tree)",
      instruction: "Ikkilik daraxt ildizi `node` berilgan. Chap va o'ng tarmoqlarini o'zaro almashtirish orqali daraxtni ko'zgusimon teskarilab (invert), yangi ildizini qaytaruvchi `invertTree(node)` funksiyasini yozing.",
      startingCode: "function invertTree(node) {\n  // Daraxt shoxlarini ko'zgusimon teskarilang\n}",
      hint: "if (!node) return null;\nconst temp = node.left;\nnode.left = invertTree(node.right);\nnode.right = invertTree(temp);\nreturn node;",
      test: "const tree = {\n  value: 4,\n  left: { value: 2, left: { value: 1, left: null, right: null }, right: { value: 3, left: null, right: null } },\n  right: { value: 7, left: { value: 6, left: null, right: null }, right: { value: 9, left: null, right: null } }\n};\nconst inverted = invertTree(tree);\nif (inverted && inverted.value === 4 && inverted.left.value === 7 && inverted.right.value === 2 && inverted.left.left.value === 9 && inverted.right.right.value === 1) {\n  return null;\n}\nreturn 'Daraxt ko\\'zgusimon teskarilanmadi';"
    },
    {
      id: 14,
      title: "Qatlamlar bo'yicha aylanib chiqish (Binary Tree Level Order Traversal)",
      instruction: "Ikkilik daraxt ildizi `node` berilgan. Elementlar qiymatlarini gorizontal qatlamlar (levels) bo'yicha ikki o'lchamli massiv shaklida qaytaruvchi `levelOrder(node)` funksiyasini yozing. Masalan: `[[3], [9, 20], [15, 7]]`.",
      startingCode: "function levelOrder(node) {\n  // Qatlamlar bo'yicha 2D massiv qaytaring\n}",
      hint: "BFS yondashuvida navbat (Queue) ishlating. Har bir iteratsiyada joriy darajadagi elementlar soni (levelSize = queue.length) bo'yicha elementlarni dequeue qiling va bolalarini navbatga qo'shib boring.",
      test: "const tree = {\n  value: 3,\n  left: { value: 9, left: null, right: null },\n  right: { value: 20, left: { value: 15, left: null, right: null }, right: { value: 7, left: null, right: null } }\n};\nconst res = levelOrder(tree);\nif (Array.isArray(res) && res.length === 3 && res[0].join(',') === '3' && res[1].join(',') === '9,20' && res[2].join(',') === '15,7') {\n  return null;\n}\nreturn 'Level order traversal noto\\'g\\'ri massiv qaytardi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Ikkilik qidiruv daraxti (BST) ning asosiy oltin qoidasi qaysi javobda to'g'ri ko'rsatilgan?",
      options: [
        "Barcha tugunlar doimo juft sonlardan iborat bo'lishi shart",
        "Chap bolalar ota-onadan kichik, o'ng bolalar esa ota-onadan katta bo'lishi kerak",
        "Chap va o'ng bolalar qiymati yig'indisi ota-onadan katta bo'lishi shart",
        "O'ng bolalar ota-onadan kichik, chap bolalar esa katta bo'lishi kerak"
      ],
      correctAnswer: 1,
      explanation: "BST ning fundamental qoidasiga ko'ra, har bir tugun uchun uning chap shoxidagi barcha elementlar kichik, o'ng shoxdagilar esa katta bo'ladi."
    },
    {
      id: 2,
      question: "Balanslashgan BST-dan element izlashning o'rtacha vaqt murakkabligi qanday?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "Balanslangan BST ning balandligi log(n) ga teng bo'ladi, shuning uchun har safar qidiruv 2 barobar qisqarib O(log n) tezlikda ishlaydi."
    },
    {
      id: 3,
      question: "Eng yomon holatda balanslanmagan (skewed) BST ning vaqt murakkabligi qanday bo'ladi?",
      options: ["O(log n)", "O(1)", "O(n)", "O(n^2)"],
      correctAnswer: 2,
      explanation: "Daraxt faqat bir tomonga qarab o'sib ketsa (muvozanat buzilsa), u chiziqli tuzilmaga aylanadi va qidiruv chiziqli ya'ni O(n) vaqtni oladi."
    },
    {
      id: 4,
      question: "In-order traversal (chap-ota-o'ng) metodi BST aylanib chiqilganda qanday natija beradi?",
      options: [
        "Tasodifiy tartiblangan elementlar",
        "Kichikdan kattaga qarab to'liq saralangan elementlar",
        "Kattadan kichikka qarab teskari saralangan elementlar",
        "Faqat barg (leaf) tugunlarini qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "BST qoidasiga binoan, in-order algoritmi chap tarmoqni, keyin joriy tugunni, keyin o'ng shoxni oladi. Bu esa elementlarning tartiblangan (sorted) ketma-ketligini hosil qiladi."
    },
    {
      id: 5,
      question: "Daraxtdagi eng yuqori nuqta (barcha tugunlarning boshlang'ich nuqtasi) nima deyiladi?",
      options: ["Leaf (Barg)", "Branch (Shox)", "Root (Ildiz)", "Parent (Ota)"],
      correctAnswer: 2,
      explanation: "Daraxtning eng yuqori darajasida turgan va ota-onasi bo'lmagan yagona boshlang'ich tuguni Root (Ildiz) deb ataladi."
    },
    {
      id: 6,
      question: "Bolalari bo'lmagan (daraxtning eng quyi qismidagi) tugunlar nima deyiladi?",
      options: ["Roots", "Leaves (Barglar)", "Branches", "Subtrees"],
      correctAnswer: 1,
      explanation: "Daraxtda chap yoki o'ng bolaga ega bo'lmagan (left = null, right = null) eng chekka tugunlar Leaves (Barglar) deb nomlanadi."
    },
    {
      id: 7,
      question: "Kenglik bo'yicha aylanib chiqish (BFS) algoritmi daraxtni qanday tartibda tekshiradi?",
      options: [
        "Avval eng chapki shox oxirigacha boradi",
        "Darajama-daraja (Level-by-level) yuqoridan pastga",
        "Avval barglarni, keyin ildizni ko'radi",
        "Tugunlarni faqat tasodifiy tartibda aylanadi"
      ],
      correctAnswer: 1,
      explanation: "BFS (Breadth First Search) darajama-daraja (gorizontal ravishda) barcha tugunlarni ketma-ket ko'rib chiqadi."
    },
    {
      id: 8,
      question: "BST-dagi eng kichik qiymat doimo qayerda joylashadi?",
      options: [
        "Root (ildiz) tugunning o'zida",
        "Eng chapki barg tugunida (leftmost node)",
        "Eng o'nggi barg tugunida (rightmost node)",
        "Tugunlar soniga qarab istalgan joyda bo'lishi mumkin"
      ],
      correctAnswer: 1,
      explanation: "Kichik elementlar doimo chapga yo'naltirilishi sababli, eng kichik qiymat eng chapki tarmoq oxiridagi bargda bo'ladi."
    },
    {
      id: 9,
      question: "Quyidagilardan qaysi biri o'z-o'zini balanslovchi daraxt hisoblanadi?",
      options: ["Singly Linked List", "AVL daraxti", "Queue", "Binary Stack"],
      correctAnswer: 1,
      explanation: "AVL daraxti va Red-Black Tree-lar element qo'shilganda yoki o'chirilganda o'z balandligini balansda saqlaydigan (Self-Balancing BST) daraxtlardir."
    },
    {
      id: 10,
      question: "Daraxt balandligi (Height) nima?",
      options: [
        "Jami tugunlar soni",
        "Root-dan eng uzoq barggacha bo'lgan eng uzun yo'ldagi shoxlar soni",
        "Faqat o'ng bolalar soni",
        "Daraxtning eng keng qismidagi tugunlar soni"
      ],
      correctAnswer: 1,
      explanation: "Height (Balandlik) bu root-dan eng chuqur barggacha bo'lgan yo'ldagi shoxlar (edges) soni bilan o'lchanadi."
    },
    {
      id: 11,
      question: "Daraxtdan ikkita bolaga ega bo'lgan tugunni o'chirish uchun odatda nima qilinadi?",
      options: [
        "Uning ikkala bolasi ham o'chirib yuboriladi",
        "Uning o'rniga o'ng tarmoqning eng kichik elementi (inorder successor) qo'yiladi",
        "Daraxt to'liq boshidan qayta quriladi",
        "Ildiz tugun o'chirib yuboriladi"
      ],
      correctAnswer: 1,
      explanation: "BST tartibini saqlash uchun ikkinchi darajali bolalari bo'lgan tugun o'chirilganda, o'ng shoxning eng kichik elementi bilan almashtiriladi."
    },
    {
      id: 12,
      question: "Daraxt bo'ylab chuqurlik bo'yicha qidiruv (DFS) uchun qaysi ma'lumotlar tuzilmasi yordamida rekursiyasiz (iterative) yozish mumkin?",
      options: ["Queue (Navbat)", "Stack (Stek)", "Linked List", "Hash Map"],
      correctAnswer: 1,
      explanation: "DFS chuqur kirishni talab qiladi. Uni rekursiyasiz yozish uchun biz LIFO printsipiga asoslangan Stack (Stek) ma'lumotlar tuzilmasidan foydalanamiz."
    },
    {
      id: 13,
      question: "Agar Ikkilik Qidiruv Daraxtidan (BST) elementlarni kichikdan kattaga qarab saralangan holda olmoqchi bo'lsak, qaysi aylanib chiqish (traversal) algoritmini tanlash kerak?",
      options: [
        "Pre-order traversal",
        "Post-order traversal",
        "In-order traversal",
        "Level-order traversal (BFS)"
      ],
      correctAnswer: 2,
      explanation: "In-order traversal (chap -> ota -> o'ng) tugunlarni qiymatlari o'sib borish tartibida ziyorat qiladi, chunki chap shoxdagi kichik qiymatlar ota-onadan oldin, o'ngdagilar esa ota-onadan keyin ziyorat qilinadi."
    },
    {
      id: 14,
      question: "AVL daraxti yoki Red-Black daraxti kabi o'z-o'zini balanslovchi daraxtlarning oddiy BST-dan asosiy afzalligi nimada?",
      options: [
        "Ular xotiradan umuman foydalanmaydi",
        "Ular elementlarni qo'shish yoki o'chirish paytida daraxt balandligini doimo minimal tutib turadi va eng yomon holatda ham O(log n) vaqt murakkabligini kafolatlaydi",
        "Ular faqatgina juft sonlarni saqlaydi",
        "Ularda chap va o'ng shoxlar bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Oddiy BST-ga ma'lumotlar tartiblangan holda kirganda u chiziqli zanjirga aylanib, tezligi O(n) ga tushib qoladi. Balanslovchi daraxtlar esa balandlik farqini doimo nazorat qilib, rotatsiyalar yordamida daraxtni muvozanatlashtiradi va logarifmik tezlikni saqlab qoladi."
    }
  ]
};

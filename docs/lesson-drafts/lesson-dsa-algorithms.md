# 📚 DSA — Massivlar, Bog'langan Ro'yxatlar, Stack/Queue, Daraxtlar, Graf — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**DSA (Data Structures — Ma'lumotlar Tuzilmalari, Algorithms — Algoritmlar)** — ma'lumotlarni qanday saqlash va qanday ishlov berish (qidirish, saralash, qayta ishlash). Dasturlashda — "qanday tuzilma" — "qanday algoritm" — "qanday murakkablik" (Big O).

### 1. Massiv (Array) — consecutive memory, index access O(1)

- **Massiv (Array):** "elementlar ketma-ket joylashgan" — index bilan access (O(1)). `const arr = [1, 2, 3]; arr[0]` — O(1). `arr.length` — O(1). `arr.push(4)` — append O(1) (amortized — job bo'lsa, resize O(n)). `arr.pop()` — O(1). `arr.shift()` — O(n) (boshidan olib tashlash — barcha elementlar shift). `arr.unshift(0)` — O(n). `arr.splice(start, deleteCount, ...items)` — O(n). `arr.slice()` — O(n). `arr.indexOf(2)` — O(n). `arr.includes(2)` — O(n). `arr.find(...)` — O(n). `arr.filter(...)` — O(n). `arr.map(...)` — O(n). `arr.reduce(...)` — O(n). `arr.sort((a,b)=>a-b)` — O(n log n) (quick sort variant).
- **Massiv — resize (amortized O(1)):** `push` — ha'mmisha — O(1) (agar capacity yetarli bo'lsa). Jobda — resize (copy boshqa memory) — O(n). Shunday qilib, `push` — amortized O(1) (average).
- **Massiv — insertion/deletion boshida — O(n):** `arr.unshift(0)` — boshidan qo'shish — barcha elementlar shift (O(n)). `arr.shift()` — boshidan olib tashlash — barcha shift (O(n)). Shunday qilib, massiv — boshida insertion/deletion — O(n).
- **Massiv — mas'uliyat (trade-off):** Access index — O(1) (faydalı). Insertion/deletion — O(n) (jo'mlas). Masalan: massiv — index access tez, lekin insertion/deletion sekin (boshida). Linked list — insertion/deletion tez (O(1)), lekin access sekin (O(n)).

### 2. Bog'langan ro'yxat (Linked List) — node + next pointer

- **Node:** `{ value: 1, next: { value: 2, next: null } }` — "node" — value + next (pointer).
- **Single Linked List:** "bir tomonlama" — har bir node — next. Head — birinchi node. Tail — oxirgi node (`next = null`).
- **Access — O(n):** index bilan access — boshdan boshlaydi — O(n) (masalan, 5-chi element — 5 ta next). Massiv — O(1) (faydalı).
- **Insertion boshida — O(1):** `const newHead = { value: 0, next: head }; head = newHead;` — O(1) (new node — head). Massiv — `unshift` — O(n).
- **Insertion oxirida — O(1) (tail bilan):** `tail.next = newNode; tail = newNode;` — O(1). Massiv — `push` — amortized O(1).
- **Deletion oxirida — O(1) (tail bilan):** `tail = prev; tail.next = null;` — prev bilan (tail). Yoki O(n) (tail topilmagan holda — boshdan oxirgacha).
- **Deletion boshida — O(1):** `head = head.next;` — O(1).
- **Insertion/Deletion middle — O(n) (prev topilmagan holda):** prev topilmagan holda — boshdan positiongacha (O(n)). Shunday qilib, linked list — boshida/oxirida — O(1) (mas'uliyat), middle — O(n) (prev topilishi).
- **Suraltirilgan Linked List — O(n log n) saralash (masalan, merge sort — O(n log n)).**
- **Doubly Linked List — next + prev:** `node.next`, `node.prev`. Access — O(n) (boshidan). Insert/delete — O(1) (prev/next bilan).

### 3. Stack (Yig'ma — LIFO) — qat'iy O(1) push/pop

- **Stack — LIFO (Last-In-First-Out):** "oxirgi kirishish — birinchi chiqish". `push` — stack ga qo'shish (O(1)). `pop` — oxirgi elementni olib tashlash (O(1)). `peek` — oxirgi elementni ko'rish (O(1)) — olib tashlamaydi. `isEmpty` — bo'shmi (O(1)).
- **Massiv bilan stack:** `const stack = []; stack.push(1); stack.pop();` — O(1) (push, pop — massiv oxirida). `stack.pop()` — O(1).
- **Massiv — stack bilan:** `push` — append (O(1)). `pop` — oxirgi (O(1)). Shunday qilib, stack — massiv bilan — O(1) push/pop.
- **Misol:** "Qavs" — "oxirgi kiritilgan" — "oxirgi chiqariladi". Masalan: "function call stack" — LIFO (bir funksiya tugaganda — keyingisi).

### 4. Queue (Navbat — FIFO) — qat'iy O(1) enqueue/dequeue

- **Queue — FIFO (First-In-First-Out):** "birinchi kirishish — birinchi chiqish". `enqueue` — navbatga qo'shish (O(1)). `dequeue` — boshidagi elementni olib tashlash (O(1)). `peek` — bosh elementni ko'rish (O(1)). `isEmpty` — bo'shmi (O(1)).
- **Massiv bilan queue (O(n) dequeue):** `const queue = []; queue.push(1); queue.shift();` — `shift` — O(n) (boshidan olib tashlash — barcha shift). Shunday qilib, massiv bilan queue — `shift` — O(n) (sekin).
- **Linked list bilan queue (O(1) enqueue/dequeue):** `head` (bosh) + `tail` (oxir). `enqueue` — `tail.next = newNode; tail = newNode;` — O(1). `dequeue` — `const value = head.value; head = head.next;` — O(1). Shunday qilib, linked list — queue — O(1) enqueue/dequeue.
- **Massiv bilan queue (O(1) dequeue — two-pointer):** `head` index — `tail` index — `shift` emas. `dequeue` — `value = items[head]; head++;` — O(1) (index oshirish). Shunday qilib, massiv — two-pointer — queue — O(1) enqueue/dequeue (ammo memory leak — head holatda qoladi — "s堀" — memory — buni tozalash kerak).

### 5. Daraxt (Tree) — hierarchical

- **Daraxt (Tree):** "hierarchy" — root, children, parent. "root" — birinchi node. "children" — boshqa node. "leaf" — children yo'q.
- **Binary Tree:** "har bir node — max 2 ta child (left, right)". `const node = { value: 1, left: {...}, right: {...} }`.
- **Binary Search Tree (BST) — O(log n) search (balanced):** "left child < parent < right child". Search — O(log n) (balanced). Insert — O(log n) (balanced). Delete — O(log n) (balanced). Balanced emas — O(n) (skewed — linked list).
- **BST search:** "agar value < node.value — left childga; value > node.value — right childga; value === node.value — found". O(log n) (balanced).
- **BST insert:** "qo'shish" — "if value < node.value — left child; value > node.value — right child; value === node.value — reject (yoki update)". O(log n) (balanced).
- **BST delete:** "3 holat":
  - Leaf (children yo'q) — node ni o'chirish — O(log n) (parent next).
  - Bir child — node ni child bilan almashtirish — O(log n).
  - Ikki child — "successor" (oxirgi left child" yoki "eng kichik right child") bilan almashtirish — O(log n).
- **BST traversal (daraxtni aylanish):**
  - **Pre-order:** root → left → right (O(n)).
  - **In-order:** left → root → right (O(n)) — BST da — sorted (O(n)).
  - **Post-order:** left → right → root (O(n)) — delete — children ohirida.
- **Daraxt balanslashtirish:** AVL, Red-Black — O(log n) operations (balanced). Shunday qilib, BST — balanced — O(log n) (faydalı).

### 6. Graf (Graph) — nodes + edges (connections)

- **Graf (Graph):** "nodes" (vertices) + "edges" (connections). Masalan: "shaharlar" — nodes — "yo'llar" — edges.
- **Graf turlari:**
  - **Yonli (Undirected):** edge — ikki direction (masalan, do'stlik).
  - **Yo'nalgan (Directed):** edge — bir direction (masalan, URL — "A → B" — A dan B ga).
  - **Oqlangan (Weighted):** edge — "ogirlik" (masalan, yo'l uzunligi).
  - **Oqlansiz (Unweighted):** edge — ogirlik yo'q.
- **Graf — adjacency matrix (n x n):** `matrix[i][j] = 1` (edge borganda). `matrix[i][j] = 0` (yo'q). Space — O(n²). Edge check — O(1). Neighbours — O(n) (row).
- **Graf — adjacency list:** `adj = { A: ["B", "C"], B: ["A"], ... }`. Space — O(n + m) (n — nodes, m — edges). Edge check — O(deg(i)) (deg — degree). Neighbours — O(deg(i)).
- **Graf — traversal (aylantirish):**
  - **BFS (Breadth-First Search):** "level-by-level" — queue. Start node — neighbours (queue) — neighbours' neighbours. Distance — O(n + m) (nodes + edges). Shortest path — unweighted graf (BFS) — O(n + m).
  - **DFS (Depth-First Search):** "depth-first" — stack/yoki recursion. Start node — child — child — ... — backtrack. Discovery — O(n + m). Cycle detection — O(n + m).
- **Graf — shortest path (og'irlik bilan):**
  - **Dijkstra (og'irlik — leverage):** "og'irlikli graf — shortest path" — priority queue (min-heap). O((n + m) log n) (mas'이다, यस्तो।). Bag'ishli graf — Dijkstra.
  - **Bellman-Ford:** "negative edge" — O(n * m). Shunday qilib, negative weight — Bellman-Ford.
- **Graf — cycle detection:**
  - **Undirected graf — DFS:** "visited" — "parent" — agar `neighbor !== parent && visited[neighbor]` — cycle. O(n + m).
  - **Directed graf — DFS:** "visited" + "recStack" (recursion stack). Agar `recStack[neighbor]` — cycle. O(n + m).

### 7. Saralash (Sorting) — massivni tartibga solish

- **Bubble Sort — O(n²):** "qo'shnilarni solishtirish — swap". O(n²). Hududiy — O(n²). Stable — yes (agar swap >).
- **Selection Sort — O(n²):** "min element — swap". O(n²). Hududiy — O(n²). Stable — no (swap).
- **Insertion Sort — O(n²) (amortized O(n) — nearly sorted):** "element — oldinga o'rnatish". O(n²). Hududiy — O(n²). Stable — yes. Nearly sorted — O(n) (faydalı).
- **Merge Sort — O(n log n):** "divide — conquer — merge". O(n log n). Hududiy — O(n) (auxiliary). Stable — yes. Massiv — merge.
- **Quick Sort — O(n log n) average, O(n²) worst:** "pivot — partition — conquer". O(n log n) average. O(n²) worst (pivot — end — sorted array). Hududiy — O(log n) (recursion stack). Stable — no. Massiv — quick (memory — O(log n)).
- **Heap Sort — O(n log n):** "heap — O(n log n)". O(n log n). Hududiy — O(1). Stable — no.
- **Counting Sort — O(n + k) (k — max value):** "count array — prefix sum — place". O(n + k). Hududiy — O(k) (count array). Stable — yes. Integer — range k.
- **Radix Sort — O(d * (n + b)) (d — digitlar, b — base):** "digit-by-digit — LSD/MSD". O(d * (n + b)). Hududiy — O(n + b). Stable — yes. Integer — digits.
- **Time vs Space:**
  - **O(n²):** Bubble, Selection, Insertion (simple — small).
  - **O(n log n):** Merge, Quick (average), Heap — faydalı (large).
  - **O(n + k) — Counting, Radix — integer (range).**

### 8. Qidirish (Searching) — massivda element topish

- **Linear Search — O(n):** "boshidan oxirigacha — har bir element". O(n). Massiv — sorted/yoqligidan qat'i nazar.
- **Binary Search — O(log n) (sorted):** "middle — left/yoki right — halve". O(log n). Sorted massiv. Misol: "target = 5 — arr = [1,2,3,4,5,6,7] — middle index = 3 — arr[3] = 4 — 5 > 4 — right half — middle = 5 — arr[5] = 6 — 5 < 6 — left half — found 5". O(log n).
- **Binary Search — iterative / recursive:** "iterative — while (left <= right) — mid — left/ right". "recursive — left, right, mid — recurs". O(log n) (time), O(1) (iterative space), O(log n) (recursive space — call stack).
- **Interpolation Search — O(log log n) (uniform distribution):** "index = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low])". O(log log n) — uniform distribution. O(n) worst (non-uniform). Sorted — uniform.

### 9. Big O (Murakkablik) — time va space

- **Big O — "worst-case" (time/space):** "qancha vaqt (time) / qancha memory (space) — input n".
- **O(1) — constant:** "har doim — bir xil" — O(1). Misol: `arr[0]`, `stack.pop()`, `queue.peek()`.
- **O(log n) — logarithmic:** "halve — O(log n)". Misol: binary search, BST search (balanced).
- **O(n) — linear:** "har bir element — O(n)". Misol: linear search, massiv `push` (amortized — O(1) lekin `shift` — O(n)), linked list access (O(n)).
- **O(n log n) — linearithmic:** "n * log n". Misol: merge sort, quick sort (average), heap sort, BST insert/search (balanced).
- **O(n²) — quadratic:** "nested loop — O(n²)". Misol: bubble sort, selection sort, insertion sort, two loops (n * n).
- **O(2ⁿ) — exponential:** "recursion — 2ⁿ". Misol: Fibonacci (naive recursion), subset generation.
- **O(n!) — factorial:** "permutations". Misol: TSP (brute force).
- **Amortized (O(1) amortized):** "average — O(1) — masalan: `array.push` — amortized O(1) (resize — O(n) — lekin average — O(1)).
- **Trade-off (time vs space):** "tezroq — ko'proq memory". Masalan: "hash table — O(1) lookup — memory O(n)". "binary search — O(log n) time — O(1) space (sorted)".

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Massiv — operations (O(1) access, O(n) shift/unshift)
const arr = [1, 2, 3, 4, 5];
console.log(arr[0]); // O(1) — access index
console.log(arr.length); // O(1)
arr.push(6); // O(1) amortized — append
arr.pop(); // O(1) — remove last
arr.unshift(0); // O(n) — insert boshida
arr.shift(); // O(n) — remove boshida
arr.indexOf(3); // O(n) — linear search
arr.includes(3); // O(n) — linear search
arr.find(x => x === 3); // O(n) — linear search
arr.filter(x => x > 2); // O(n)
arr.map(x => x * 2); // O(n)
arr.reduce((acc, cur) => acc + cur, 0); // O(n)
arr.sort((a, b) => a - b); // O(n log n) — quick sort variant (JS engine)

// 2. Stack — massiv bilan (O(1) push/pop)
class Stack {
  constructor() { this.items = []; }
  push(value) { this.items.push(value); } // O(1)
  pop() { return this.items.pop(); } // O(1)
  peek() { return this.items[this.items.length - 1]; } // O(1)
  isEmpty() { return this.items.length === 0; } // O(1)
}
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3 — LIFO
console.log(stack.peek()); // 2

// 3. Queue — linked list bilan (O(1) enqueue/dequeue)
class QueueNode {
  constructor(value) { this.value = value; this.next = null; }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  enqueue(value) {
    const node = new QueueNode(value);
    if (this.isEmpty()) { this.head = this.tail = node; }
    else { this.tail.next = node; this.tail = node; }
    this.size++;
  } // O(1)
  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) this.tail = null;
    this.size--;
    return value;
  } // O(1)
  peek() { return this.isEmpty() ? null : this.head.value; } // O(1)
  isEmpty() { return this.size === 0; }
}
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 1 — FIFO
console.log(queue.peek()); // 2

// 4. Linked List — single (O(1) head insert/delete, O(n) access)
class ListNode {
  constructor(value) { this.value = value; this.next = null; }
}
class LinkedList {
  constructor() { this.head = null; this.size = 0; }
  insertHead(value) {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  } // O(1)
  deleteHead() {
    if (this.isEmpty()) return null;
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    return value;
  } // O(1)
  find(value) { // O(n) — linear search
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }
  isEmpty() { return this.size === 0; }
}
const ll = new LinkedList();
ll.insertHead(1);
ll.insertHead(2);
ll.insertHead(3);
console.log(ll.deleteHead()); // 3 — LIFO (head)
console.log(ll.find(2)); // node (value 2)

// 5. BST — search / insert / delete / traversal (O(log n) balanced)
class BSTNode {
  constructor(value) { this.value = value; this.left = null; this.right = null; }
}
class BST {
  constructor() { this.root = null; }
  insert(value) {
    const newNode = new BSTNode(value);
    if (!this.root) { this.root = newNode; return; }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) { current.left = newNode; break; }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) { current.right = newNode; break; }
        current = current.right;
      } else { break; } // duplicate — reject
    }
  } // O(log n) balanced
  search(value) { // O(log n) balanced
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    return null;
  }
  // delete — 3 holat (leaf, 1 child, 2 children)
  // ...
  inOrder(node = this.root, result = []) { // O(n)
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  } // O(n) — sorted
}
const bst = new BST();
[5, 3, 7, 2, 4, 6, 8].forEach(v => bst.insert(v));
console.log(bst.search(4)); // node (value 4)
console.log(bst.inOrder()); // [2,3,4,5,6,7,8] — sorted

// 6. Graf — adjacency list + BFS (O(n + m))
class Graph {
  constructor() { this.adj = new Map(); }
  addNode(v) { if (!this.adj.has(v)) this.adj.set(v, []); }
  addEdge(u, v, directed = false) {
    this.addNode(u); this.addNode(v);
    this.adj.get(u).push(v);
    if (!directed) this.adj.get(v).push(u);
  }
  bfs(start) { // O(n + m) — unweighted shortest path
    const visited = new Set();
    const queue = [start];
    const dist = new Map([[start, 0]]);
    visited.add(start);
    while (queue.length) {
      const node = queue.shift();
      for (const neighbor of this.adj.get(node) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          dist.set(neighbor, dist.get(node) + 1);
          queue.push(neighbor);
        }
      }
    }
    return dist; // distance map
  } // O(n + m)
}
const g = new Graph();
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
g.addEdge("C", "E");
console.log(g.bfs("A")); // Map { A:0, B:1, C:1, D:2, E:2 }

// 7. Graf — DFS (cycle detection)
class DirectedGraph {
  constructor() { this.adj = new Map(); }
  addEdge(u, v) {
    if (!this.adj.has(u)) this.adj.set(u, []);
    this.adj.get(u).push(v);
  }
  hasCycle() { // O(n + m) — directed — DFS
    const visited = new Set();
    const recStack = new Set();
    const nodes = [...this.adj.keys()];
    function dfs(node) {
      visited.add(node);
      recStack.add(node);
      for (const neighbor of this.adj.get(node) || []) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) return true;
        } else if (recStack.has(neighbor)) {
          return true; // cycle
        }
      }
      recStack.delete(node);
      return false;
    }
    for (const node of nodes) {
      if (!visited.has(node) && dfs(node)) return true;
    }
    return false;
  } // O(n + m)
}
const dg = new DirectedGraph();
dg.addEdge("A", "B");
dg.addEdge("B", "C");
dg.addEdge("C", "A"); // cycle
console.log(dg.hasCycle()); // true

// 8. Saralash — Merge Sort (O(n log n) — stable)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
} // O(n log n) — time, O(n) — space (auxiliary)
function merge(left, right) { // O(n)
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}
console.log(mergeSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9] — stable (5,5 — same order)

// 9. Saralash — Quick Sort (O(n log n) average — in-place)
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
} // O(n log n) average — O(n²) worst — O(log n) space (recursion)
function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}
console.log(quickSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9] — in-place

// 10. Qidirish — Binary Search (O(log n) — sorted)
function binarySearch(arr, target) { // O(log n) — iterative
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1; // not found
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 5)); // 4 — index
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 8)); // -1 — not found

// 11. Big O — time / space tahlili
function sum(arr) { // O(n) — time, O(1) — space
  let total = 0; // O(1) — space
  for (let i = 0; i < arr.length; i++) { // O(n) — time
    total += arr[i];
  }
  return total;
}
function nestedLoop(arr) { // O(n²) — time, O(1) — space
  for (let i = 0; i < arr.length; i++) { // O(n)
    for (let j = 0; j < arr.length; j++) { // O(n)
      console.log(arr[i], arr[j]);
    }
  }
} // O(n²) — time
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Massiv — O(n) har element — instead O(1)
for (let i = 0; i < arr.length; i++) { // O(n) — time — har bir element
  arr.indexOf(5); // O(n) — har bir iteration — total O(n²)
}
// Yaxshi: arr.includes(5) — O(n) — yoki sorted — binary search O(log n)

// XATO 2: Stack — massiv bilan — shift (O(n)) — instead pop (O(1))
const stack = [];
stack.push(1);
stack.push(2);
stack.shift(); // O(n) — shift — instead pop — stack LIFO — O(n) — yomon
// Yaxshi: stack.pop() — O(1)

// XATO 3: Queue — massiv bilan — shift (O(n)) — instead linked list / two-pointer
const queue = [];
queue.push(1);
queue.push(2);
queue.push(3);
queue.shift(); // O(n) — shift — instead linked list / two-pointer — O(n) — yomon
// Yaxshi: linked list — dequeue O(1) — yoki two-pointer

// XATO 4: BST — O(n) search — instead O(log n) (balanced) — O(n) skewed
// BST skewed — linked list (O(n) search) — O(log n) balanced — AVL/Red-Black

// XATO 5: Binary search — unsorted array (xato)
const arr = [5, 2, 9, 1, 5, 6];
binarySearch(arr, 5); // xato — unsorted — binary search works sorted — O(log n) — yomon
// Yaxshi: arr.sort((a,b)=>a-b); binarySearch(arr, 5); — O(n log n) sort + O(log n) search

// XATO 6: Graph — adjacency matrix (O(n²) space) — instead adjacency list (O(n + m) space)
// adjacency matrix — O(n²) space — n=1000 — O(1M) — memory waste — sparse graph
// adjacency list — O(n + m) space — memory efficient — sparse graph
// Yaxshi: adjacency list (sparse graph) — adjacency matrix (dense graph)

// XATO 7: Sorting — O(n²) — instead O(n log n) (large)
const arr = [5, 2, 9, 1, 5, 6, 3, 7, 8, 4, 10];
bubbleSort(arr); // O(n²) — yomon (large) — instead merge/quick O(n log n)

// XATO 8: Big O — O(n) instead O(1) (memoization yoki cache)
function fib(n) { // O(2ⁿ) — naive recursion — yomon
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// Yaxshi: memoization — O(n) — time, O(n) — space (cache)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
} // O(n) — time, O(n) — space

// XATO 9: Queue — two-pointer — memory leak (head holatda qoladi — memory)
const queue = [];
queue.push(1);
queue.push(2);
queue.push(3);
queue.shift(); // head holatda qoladi — memory leak (bosh element yo'q — lekin array memory)
// Yaxshi: linked list — memory efficient — yoki array resize (shift — O(n) — memory yo'qotish)

// XATO 10: Binary Search — recursive — call stack O(log n) — instead iterative O(1)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) { // O(log n) — time, O(log n) — space (call stack)
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
} // O(log n) — time, O(log n) — space (recursive)
// Yaxshi: iterative — O(1) — space (call stack yo'q)
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Massiv (Array):** index access — O(1). Push/pop — O(1) amortized. Shift/unshift — O(n). Insert/delete — O(n).
- **Linked List:** Access — O(n). Insert/delete — head/tail — O(1). Middle — O(n) (prev). Doubly — next + prev — O(1) prev access.
- **Stack (LIFO):** push (O(1)), pop (O(1)), peek (O(1)). Massiv bilan — O(1) push/pop.
- **Queue (FIFO):** enqueue (O(1)), dequeue (O(1)) — linked list / two-pointer. Massiv bilan — shift — O(n) (yomon).
- **BST (balanced):** search — O(log n), insert — O(log n), delete — O(log n). Balanced emas — O(n) (skewed). Traversal — O(n).
- **Graf — adjacency list:** Space — O(n + m). Edge check — O(deg(i)). Neighbours — O(deg(i)). BFS/DFS — O(n + m).
- **Graf — adjacency matrix:** Space — O(n²). Edge check — O(1). Neighbours — O(n). Dense graph — faydalı.
- **BFS (unweighted):** Shortest path — O(n + m).
- **DFS (directed/undirected):** Cycle detection — O(n + m).
- **Dijkstra (og'irlik):** Shortest path — O((n + m) log n) — priority queue.
- **Saralash:**
  - **O(n²):** Bubble, Selection, Insertion (small).
  - **O(n log n):** Merge, Quick (average), Heap (large).
  - **O(n + k):** Counting (integer range).
  - **O(d * (n + b)):** Radix (integer digits).
- **Qidirish:**
  - **Linear — O(n):** unsorted massiv.
  - **Binary — O(log n):** sorted massiv.
- **Big O — time va space:** O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!). Amortized O(1) — push.
- **Memoization — O(n) — fib (naive recursion O(2ⁿ)).**

### ❌ Noto'g'ri:

- **Massiv — O(n) har element — instead O(1):** `indexOf` har iteration — O(n²) — yomon.
- **Stack — shift (O(n)) — instead pop (O(1)):** shift — boshidan — O(n) — yomon.
- **Queue — shift (O(n)) — instead linked list / two-pointer:** shift — O(n) — yomon.
- **BST — O(n) search — instead O(log n) (balanced):** skewed — O(n) — yomon (AVL/Red-Black — O(log n)).
- **Binary search — unsorted array:** xato — O(log n) — works sorted — yomon.
- **Graph — adjacency matrix (O(n²) space) — instead adjacency list:** sparse graph — memory waste — yomon. Dense graph — matrix — faydalı.
- **Sorting — O(n²) (large) — instead O(n log n):** bubble sort — O(n²) — yomon (large). Merge/quick — O(n log n) — faydalı.
- **Fib — naive recursion (O(2ⁿ)) — instead memoization (O(n)):** naive recursion — O(2ⁿ) — yomon. Memoization — O(n) — faydalı.
- **Queue — two-pointer — memory leak (head holatda qoladi):** array memory yo'qotish — yomon. Linked list — memory efficient — yoki array resize.
- **Binary search — recursive (O(log n) space) — instead iterative (O(1) space):** recursive — call stack — O(log n) space — yomon (iterative — O(1) space).

## 🎩 Hayotiy o'xshatishlar

- **Massiv (Array):** "Ketma-ket joylashgan" — "index bilan access" — "tezlashtirish" — "O(1)" — "har bir element — index bilan". Masalan: "Kutubxona" — "kitoblar — index bilan tanlash" (O(1)).
- **Linked List:** "Zanjir" — "har bir element — keyingisi" — "access — boshdan boshlaydi — O(n)". Masalan: "Familya zanjiri" — "ayama — keyingisi" — "access — boshidan" (O(n)).
- **Stack (LIFO):** "Quloch" — "oxirgi qo'shilgan — oxirgi chiqariladi". Masalan: "Funktsiya call stack" — "bir funksiya tugaganda — keyingisi" (LIFO).
- **Queue (FIFO):** "Navbat" — "birinchi kirishish — birinchi chiqish". Masalan: "Supermarket navbat" — "birinchi kelgan — birinchi chiqadi" (FIFO).
- **Daraxt (Tree):** "Oziqlanish" — "root — children — leaf". Masalan: "Fayl tizimi" — "folder" — "file" — "children" — "leaf (file)".
- **Graf (Graph):** "Shaharlar — yo'llar" — "nodes — edges". Masalan: "Google Maps" — "shaharlar — yo'llar" — "shortest path" — "Dijkstra".
- **Sort:** "Kitoblar — tartibga solish" — "alphabet" — "merge sort" (O(n log n)").
- **Search:** "Kitob — qidirish" — "index bilan" (O(1) — sorted — binary search O(log n)).

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ DSA — Data Structures & Algorithms ] --> B1[ Massiv (Array)
    index access — O(1)
    push/pop — O(1) amortized
    shift/unshift — O(n)
    insertion/deletion — O(n)
    — index access tez, insertion/deletion sekin
    ]
    A --> B2[ Linked List
    node + next pointer
    access — O(n)
    insert/delete — head/tail — O(1)
    middle — O(n) (prev)
    doubly — next + prev — O(1) prev access
    — insertion/deletion tez, access sekin
    ]
    A --> B3[ Stack (LIFO)
    push — O(1)
    pop — O(1)
    peek — O(1)
    — massiv bilan — O(1) push/pop
    — oxirgi kirishish — oxirgi chiqariladi
    ]
    A --> B4[ Queue (FIFO)
    enqueue — O(1)
    dequeue — O(1) — linked list / two-pointer
    peek — O(1)
    — massiv bilan shift — O(n) (yomon)
    — birinchi kirishish — birinchi chiqish
    ]
    A --> B5[ Daraxt (Tree)
    hierarchical — root, children, leaf
    Binary Tree — max 2 child (left, right)
    BST — search/insert/delete — O(log n) (balanced) — O(n) (skewed)
    traversal — Pre/In/Post — O(n)
    — AVL/Red-Black — O(log n) (balanced)
    ]
    A --> B6[ Graf (Graph)
    nodes + edges (connections)
    adjacency list — O(n + m) space, edge check — O(deg(i))
    adjacency matrix — O(n²) space, edge check — O(1)
    BFS — O(n + m) — unweighted shortest path
    DFS — O(n + m) — cycle detection
    Dijkstra — O((n + m) log n) — weighted shortest path
    ]
    A --> B7[ Saralash (Sorting)
    O(n²): Bubble, Selection, Insertion (small)
    O(n log n): Merge, Quick (average), Heap (large)
    O(n + k): Counting (integer range)
    O(d * (n + b)): Radix (integer digits)
    — time vs space trade-off
    ]
    A --> B8[ Qidirish (Searching)
    Linear — O(n) — unsorted
    Binary — O(log n) — sorted
    Interpolation — O(log log n) — uniform distribution
    — sorted — binary search O(log n)
    ]
    A --> B9[ Big O (Murakkablik)
    O(1) — constant
    O(log n) — logarithmic
    O(n) — linear
    O(n log n) — linearithmic
    O(n²) — quadratic
    O(2ⁿ) — exponential
    O(n!) — factorial
    — time vs space trade-off
    amortized O(1) — push
    memoization — O(n) — fib (naive O(2ⁿ))
    ]
    
    style B1 fill:#e3f2fd,stroke:#1976d2
    style B2 fill:#e8f5e9,stroke:#2e7d32
    style B3 fill:#fff3e0,stroke:#e65100
    style B4 fill:#f3e5f5,stroke:#7b1fa2
    style B5 fill:#ffebee,stroke:#c62828
    style B6 fill:#e0f2f1,stroke:#00897b
    style B7 fill:#ede7f6,stroke:#7b1fa2
    style B8 fill:#e8eaf6,stroke:#3949ab
    style B9 fill:#fce4ec,stroke:#c2185b
```

**Diagrama tushuntirishi:** DSA — 9 ta asosiy qism:
1. **Massiv (Array)** — index access — O(1), push/pop — O(1), shift/unshift — O(n), insertion/deletion — O(n).
2. **Linked List** — node + next, access — O(n), insert/delete — head/tail — O(1), middle — O(n) (prev).
3. **Stack (LIFO)** — push/pop/peek — O(1) — massiv bilan — oxirgi kirishish — oxirgi chiqariladi.
4. **Queue (FIFO)** — enqueue/dequeue — O(1) — linked list / two-pointer — massiv shift — O(n) (yomon).
5. **Daraxt (Tree)** — hierarchical — BST — O(log n) (balanced) — traversal — O(n) — AVL/Red-Black — O(log n).
6. **Graf (Graph)** — adjacency list — O(n + m), adjacency matrix — O(n²), BFS — O(n + m), DFS — O(n + m), Dijkstra — O((n + m) log n).
7. **Saralash (Sorting)** — O(n²), O(n log n), O(n + k), O(d * (n + b)).
8. **Qidirish (Searching)** — Linear — O(n), Binary — O(log n), Interpolation — O(log log n).
9. **Big O (Murakkablik)** — O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!). Time vs space trade-off. Amortized O(1). Memoization — O(n).

## 🎙 Intervyu savollari va javoblari

### 1. Massiv (Array) va Linked List farqi? Qanday ishlashi mumkin?

**Javob:** Massiv — "elementlar ketma-ket joylashgan" — index bilan access — O(1) (faydalı). Insertion/deletion — O(n) (masalan, boshidan — shift — O(n), oxiridan — O(1) amortized). Linked List — "node + next pointer" — access — O(n) (boshdan boshlaydi). Insert/delete — head/tail — O(1) (faydalı). Middle — O(n) (prev topilishi). Shunday qilib, massiv — index access tez, insertion/deletion sekin; linked list — insertion/deletion tez (head/tail), access sekin. Shunday qilib, "mas'uliyat" — massiv: index access tez; linked list: insertion/deletion tez.

### 2. Stack nima? LIFO — qanday ishlaydi?

**Javob:** Stack — LIFO (Last-In-First-Out) — "oxirgi kirishish — birinchi chiqariladi". `push` — stack ga qo'shish (O(1)). `pop` — oxirgi elementni olib tashlash (O(1)). `peek` — oxirgi elementni ko'rish (O(1)) — olib tashlamaydi. `isEmpty` — bo'shmi (O(1)). Massiv bilan — `push` — append (O(1)), `pop` — oxirgi (O(1)). Masalan: "function call stack" — LIFO.

### 3. Queue nima? FIFO — qanday ishlaydi?

**Javob:** Queue — FIFO (First-In-First-Out) — "birinchi kirishish — birinchi chiqariladi". `enqueue` — navbatga qo'shish (O(1)). `dequeue` — boshidagi elementni olib tashlash (O(1)). `peek` — bosh elementni ko'rish (O(1)). `isEmpty` — bo'shmi (O(1)). Massiv bilan — `shift` — O(n) (boshidan olib tashlash — barcha shift — yomon). Linked list bilan — `head`/`tail` — O(1) enqueue/dequeue (faydalı). Yoki two-pointer (massiv) — O(1) dequeue (head index + tail index).

### 4. BST (Binary Search Tree) nima? Search/insert/delete — O(log n) — qanday ishlaydi?

**Javob:** BST — "left child < parent < right child" — search — O(log n) (balanced). Insert — O(log n) (balanced). Delete — O(log n) (balanced). Search: "agar value < node.value — left childga; value > node.value — right childga; value === node.value — found". Insert: "qo'shish" — "if value < node.value — left child; value > node.value — right child; value === node.value — reject (yoki update)". Delete: "3 holat": leaf (children yo'q) — node ni o'chirish; 1 child — node ni child bilan almashtirish; 2 child — "successor" (eng kichik right child) bilan almashtirish. Shunday qilib, BST — balanced — O(log n) — faydalı. Balanced emas — O(n) (skewed — linked list). AVL/Red-Black — balanced — O(log n).

### 5. Graf nima? Adjacency list va adjacency matrix farqi?

**Javob:** Graf — "nodes" (vertices) + "edges" (connections). Adjacency list — "node — neighbours list" — `adj = { A: ["B", "C"], B: ["A"], ... }` — Space — O(n + m) (n — nodes, m — edges). Edge check — O(deg(i)) (deg — degree). Neighbours — O(deg(i)). Adjacency matrix — "n x n matrix" — `matrix[i][j] = 1` (edge borganda). Space — O(n²). Edge check — O(1). Neighbours — O(n) (row). Shunday qilib, sparse graph — adjacency list (memory efficient — O(n + m)). Dense graph — adjacency matrix (edge check — O(1) — faydalı).

### 6. BFS va DFS farqi? Grafda qanday ishlaydi?

**Javob:** BFS (Breadth-First Search) — "level-by-level" — queue. Start node — neighbours (queue) — neighbours' neighbours. Distance — O(n + m). Shortest path — unweighted graf (BFS) — O(n + m). DFS (Depth-First Search) — "depth-first" — stack (yoki recursion). Start node — child — child — ... — backtrack. Discovery — O(n + m). Cycle detection — O(n + m). Shunday qilib, BFS — shortest path (unweighted), DFS — discovery/cycle detection.

### 7. Saralash algoritmlarining Big O'lar farqi?

**Javob:** Saralash algoritmlari:
- **O(n²):** Bubble, Selection, Insertion (simple — small, nearly sorted — O(n) insertion). Hududiy — O(1) (insertion), O(1) (bubble/selection). Stable — yes (insertion, bubble), no (selection).
- **O(n log n):** Merge, Quick (average), Heap (large). Merge — O(n) space (auxiliary), stable. Quick — O(log n) space (recursion), unstable. Heap — O(1) space, unstable.
- **O(n + k):** Counting (integer range). Stable — yes. Hududiy — O(k).
- **O(d * (n + b)):** Radix (integer digits). Stable — yes. Hududiy — O(n + b).
Shunday qilib, large — O(n log n) (Merge/Quick/Heap). Small/nearly sorted — O(n²) (Insertion — O(n) nearly sorted). Integer range — Counting/Radix.

### 8. Binary Search qanday ishlaydi? O(log n) — qanday?

**Javob:** Binary Search — "sorted massiv" — "middle index" — "left/yoki right — halve". O(log n) — "har bir iteration — halve" — n → n/2 → n/4 → ... → 1 — "log n iterations". Misol: "target = 5 — arr = [1,2,3,4,5,6,7] — middle = 3 — arr[3] = 4 — 5 > 4 — right half — middle = 5 — arr[5] = 6 — 5 < 6 — left half — found 5 — index 4". Shunday qilib, O(log n) — halve har iteration — "log n iterations". Iterative — O(1) space (call stack yo'q), recursive — O(log n) space (call stack).

### 9. Big O — O(1), O(log n), O(n), O(n log n), O(n²) farqi?

**Javob:** Big O — "worst-case" (time/space) — "qancha vaqt/memory — input n". O(1) — constant — "har doim — bir xil" — `arr[0]`, `stack.pop()`, `queue.peek()`. O(log n) — logarithmic — "halve — log n" — binary search, BST search (balanced). O(n) — linear — "har bir element — n" — linear search, massiv `push` (amortized O(1) — lekin shift — O(n)), linked list access. O(n log n) — linearithmic — "n * log n" — merge/quick/heap sort, BST insert/search (balanced). O(n²) — quadratic — "nested loop — n * n" — bubble/selection/insertion sort, two loops (n * n). Shunday qilib, O(1) — tez (faydalı), O(log n) — tez (binary search), O(n) — o'rta, O(n log n) — yumshoq (large sort), O(n²) — sekin (large).

### 10. Memoization nima? Fib naive recursion — O(2ⁿ) — qanday?

**Javob:** Memoization — "cache" — "taxmin qilingan natijalarni saqlash" — "har bir natija — cache — qayta ishlatish" — O(n) (time) — "instead O(2ⁿ) naive recursion". Misol: Fibonacci — `fib(n) = fib(n-1) + fib(n-2)` — naive recursion — O(2ⁿ) (har bir step — 2 branch — total — 2ⁿ). Memoization — `memo = {}` — `fibMemo(n, memo)` — "if n in memo — return memo[n] — else compute — memo[n] = result — return result". Shunday qilib, O(n) — time (har bir n — once — compute), O(n) — space (cache). Shunday qilib, memoization — O(n) — fib — instead O(2ⁿ) naive.

### 📌 Xulosa:

- **Massiv (Array):** index access — O(1). Push/pop — O(1) amortized. Shift/unshift — O(n). Insertion/deletion — O(n).
- **Linked List:** Access — O(n). Insert/delete — head/tail — O(1). Middle — O(n) (prev). Doubly — next + prev — O(1) prev access.
- **Stack (LIFO):** push/pop/peek — O(1) — massiv bilan — oxirgi kirishish — oxirgi chiqariladi.
- **Queue (FIFO):** enqueue/dequeue — O(1) — linked list / two-pointer. Massiv shift — O(n) (yomon).
- **BST (balanced):** search/insert/delete — O(log n) — traversal — O(n) — balanced emas — O(n) (skewed).
- **Graf:** adjacency list — O(n + m), adjacency matrix — O(n²). BFS — O(n + m) (unweighted shortest). DFS — O(n + m) (cycle). Dijkstra — O((n + m) log n) (weighted).
- **Saralash:** O(n²) (Bubble/Selection/Insertion), O(n log n) (Merge/Quick/Heap), O(n + k) (Counting), O(d * (n + b)) (Radix).
- **Qidirish:** Linear — O(n) (unsorted), Binary — O(log n) (sorted).
- **Big O:** O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!). Time vs space trade-off. Amortized O(1). Memoization — O(n) — fib (naive O(2ⁿ)).

---

**Keyingi darslar (o'rta daraja):**
1. **Advanced DSA — Hash Table (O(1) lookup), Map/Set, Trie, Heap/Priority Queue**
2. **Advanced Sorting — Quick Sort detail, Merge Sort detail, Heap Sort, Radix, Counting**
3. **Advanced Graf — Dijkstra detail, Bellman-Ford, Floyd-Warshall, MST (Kruskal/Prim)**
4. **Dynamic Programming (DP) — Fibonacci, Knapsack, LCS, LIS, interval scheduling**
5. **Backtracking — permutations, combinations, N-Queens, Sudoku, subsets**

Qaysi mavzu keyingi? Raqam yoki nom. Yozayman.
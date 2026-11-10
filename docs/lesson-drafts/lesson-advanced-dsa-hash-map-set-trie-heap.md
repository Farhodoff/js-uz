# 📚 Advanced DSA — Hash Table (O(1) lookup), Map/Set, Trie, Heap/Priority Queue — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**Hash Table (Hash Table / Hash Map)** — "key → value" — "hash function" — "index" (bucket) — O(1) lookup (average). "key" — "hash function" — "index" — "bucket" — "value" store. "collision" — "bir xil index" — "chaining" (linked list) yoki "open addressing" (linear probing). O(1) average — O(n) worst (collision — linked list — O(n) search).

- **Hash function:** "key" → "hash code" → "index" (bucket). Masalan: `hash("Ali") → 123` → `index = hash % capacity = 123 % 10 = 3` — bucket 3.
- **Collision:** "bir xil index" — "chaining" — "linked list" (bucket ichida). Masalan: `hash("Ali") % 10 = 3`, `hash("Vali") % 10 = 3` — bucket 3 ichida linked list — "Ali" va "Vali" — search — O(n) (linked list — n elementlar).
- **Load factor (α):** "n / capacity" — "elementlar soni / bucketlar soni". Agar "α > threshold" (masalan, 0.75) — "resize" (capacity oshirish — hash qayta hisoblash) — O(n) (elements re-insert). Shunday qilib, "resize" — O(n) — amortized — O(1) average (push — amortized O(1) — resize hash table — amortized O(1)).
- **O(1) average — O(n) worst:** "collision" — linked list — O(n) search (worst). "balanced" — O(1) average. "undermined" — O(n) worst (masalan, `hash(key) = 0` — barcha elementlar — bucket 0 — linked list — O(n)).
- **Space — O(n):** "n elementlar — O(n) space (key + value + bucketlar)".

### Map (Map — key → value — O(1) lookup)

- **Map — "key → value" — "any key type" (object key — string/symbol — Map — any).** `const map = new Map(); map.set("Ali", 25); map.get("Ali"); // 25` — O(1) average. `map.has("Ali")` — O(1). `map.delete("Ali")` — O(1). `map.size` — O(1). `map.clear()` — O(n).
- **Map — iteration:** `for (const [key, value] of map) { ... }` — insertion order (keylar — insertion order). Shunday qilib, Map — insertion order — iteration.
- **Map — key type:** "any" — `map.set(1, "bir"); map.set({ a: 1 }, "obj");` — object key — `Equality` (SameValueZero) — `NaN` = `NaN`, `-0` = `+0`. Shunday qilib, Map — key — `NaN`, `-0`, `+0` — "equality".
- **Map — size — O(1):** `map.size` — O(1) (size counter). Shunday qilib, Map — size — O(1).

### Set (Set — unique elements — O(1) lookup)

- **Set — "unique elements" — "has" — O(1) lookup.** `const set = new Set([1, 2, 2, 3]); set.add(4); set.has(2);` — O(1) average. `set.delete(2)` — O(1). `set.size` — O(1). `set.clear()` — O(n).
- **Set — uniqueness:** "key — value" — Map — "key — value" — key — unique. Hash — "key — value" — key — unique. Shunday qilib, Set — "unique elements" — hash table — key — elements — unique.
- **Set — iteration:** `for (const value of set) { ... }` — insertion order. Shunday qilib, Set — insertion order — iteration.

### Trie (Trie — tree — string — prefix — O(L) — L = string length)

- **Trie (Trie / Prefix Tree):** "string — prefix — tree". "har bir node — character — children — Map<string, Node> (yoki array — 26)". "root — empty". "isEnd — boolean — string end".
- **Insert:** "string — character — node — children — ingachki — character yo'q — create — isEnd = true (oxirgi character)". O(L) — L — string length.
- **Search:** "string — character — node — children — ingachki — character yo'q — return false; oxirgi character — isEnd — true/false". O(L) — L — string length.
- **Prefix Search:** "prefix — character — node — children — ingachki — character yo'q — return null; oxirgi — return node". O(L) — L — prefix length.
- **Space — O(ALPHABET_SIZE * L * N):** "ALPHABET_SIZE (26 — English) * L (string length) * N (strings)". Shunday qilib, Trie — space — O(ALPHABET_SIZE * L * N) — "memory — alphabet * length * strings".
- **Misol:** "words — ["ap", "app", "apple", "bat", "ball"]". Trie — root — children — "a" — "p" — "p" — "l" — "e" (isEnd). "b" — "a" — "t" (isEnd) / "l" — "l" (isEnd).

### Heap (Heap — binary heap — priority queue — O(log n) insert/extract)

- **Heap (Binary Heap):** "tree — complete binary tree — array — index". "min-heap — parent <= children" — "min element — root". "max-heap — parent >= children" — "max element — root".
- **Array — heap:** "index i — left child = 2*i+1, right child = 2*i+2, parent = floor((i-1)/2)". Shunday qilib, heap — array — index — parent/child bilan ishlash.
- **Insert (O(log n)):** "add — array — end — heapify up — compare — parent — swap — ingachki — parent >= child (min-heap) — ingachki — o'rnatiladi". O(log n) — height — log n.
- **Extract Min/Max (O(log n)):** "root — remove — last element — place — root — heapify down — compare — children — swap — ingachki — parent <= children (min-heap) — ingachki — o'rnatiladi". O(log n) — height — log n.
- **Peek (O(1)):** "root" — min/max element — O(1).
- **Priority Queue (Heap — priority):** "element — priority — insert — O(log n) — extract — O(log n) — peek — O(1)". Masalan: "task — priority — high priority — extract — priority queue — heap".
- **Time — O(log n) — insert, extract — O(1) — peek.** Space — O(n) — heap size.

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Hash Table — custom (chaining — collision)
class HashTable {
  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null).map(() => []); // Array of arrays (chaining)
    this.size = 0;
  }
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
    }
    return hash;
  } // hash function — O(L) — L = key length
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const existing = bucket.find(([k]) => k === key);
    if (existing) existing[1] = value; // update
    else { bucket.push([key, value]); this.size++; }
    if (this.size / this.capacity > 0.75) this.resize(); // load factor — resize
  } // O(1) average — O(n) worst (collision — linked list)
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const found = bucket.find(([k]) => k === key);
    return found ? found[1] : undefined;
  } // O(1) average — O(n) worst
  has(key) { return this.get(key) !== undefined; } // O(1) average
  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const idx = bucket.findIndex(([k]) => k === key);
    if (idx !== -1) { bucket.splice(idx, 1); this.size--; return true; }
    return false;
  } // O(1) average — O(n) worst
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) this.set(key, value); // re-insert — O(n)
    }
  } // O(n) — resize
}
const ht = new HashTable();
ht.set("Ali", 25);
ht.set("Vali", 30);
console.log(ht.get("Ali")); // 25 — O(1) average
console.log(ht.has("Vali")); // true
ht.delete("Vali");
console.log(ht.get("Vali")); // undefined
```

```javascript
// 2. Map ve Set (built-in — O(1) average)
const map = new Map();
map.set("Ali", 25);
map.set("Vali", 30);
map.set(1, "bir"); // key — any type — 1
map.set({ a: 1 }, "obj"); // object key — reference — unique
console.log(map.get("Ali")); // 25 — O(1) average
console.log(map.has("Vali")); // true — O(1)
console.log(map.size); // 4 — O(1)
console.log(map.has(1)); // true
console.log(map.has({ a: 1 })); // false — reference — different object
map.delete("Vali");
console.log(map.size); // 3
for (const [key, value] of map) {
  console.log(key, value); // insertion order — "Ali" 25, 1 "bir", { a:1 } "obj"
}

// Set — unique elements
const set = new Set([1, 2, 2, 3]);
set.add(4);
set.add(4); // duplicate — ignore
console.log(set.size); // 4 (1,2,3,4) — unique
console.log(set.has(2)); // true — O(1) average
set.delete(2);
console.log(set.has(2)); // false
console.log([...set]); // [1,3,4] — iteration — insertion order
```

```javascript
// 3. Trie — simple (English — lowercase — 26 letters)
class TrieNode {
  constructor() {
    this.children = new Map(); // character → TrieNode
    this.isEnd = false;
  }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) { // O(L) — L = word length
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }
  search(word) { // O(L) — L = word length
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return node.isEnd;
  }
  startsWith(prefix) { // O(L) — L = prefix length
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return true;
  }
}
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("bat");
trie.insert("ball");
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.search("ap")); // false — not end (prefix — yes)
console.log(trie.startsWith("app")); // true — prefix
console.log(trie.startsWith("ba")); // true
```

```javascript
// 4. Heap — min-heap (array — O(log n) insert / extract)
class MinHeap {
  constructor() { this.heap = []; } // array — index — parent/child
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }
  swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  insert(value) { // O(log n) — heapify up
    this.heap.push(value);
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  } // O(log n) — height — log n
  extractMin() { // O(log n) — heapify down
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = this.left(i), right = this.right(i);
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
    return root;
  } // O(log n) — height — log n
  peek() { return this.heap.length ? this.heap[0] : null; } // O(1)
  size() { return this.heap.length; }
}
const heap = new MinHeap();
heap.insert(5);
heap.insert(3);
heap.insert(8);
heap.insert(1);
console.log(heap.peek()); // 1 — min — O(1)
console.log(heap.extractMin()); // 1 — O(log n)
console.log(heap.extractMin()); // 3
console.log(heap.extractMin()); // 5
console.log(heap.extractMin()); // 8
```

```javascript
// 5. Priority Queue — heap-based — task scheduler
class PriorityQueue {
  constructor() { this.heap = []; }
  enqueue(task, priority) { // O(log n) — insert
    this.heap.push({ task, priority });
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i].priority >= this.heap[parent].priority) break; // min-heap — higher priority = smaller number? (custom)
      this.heap[i] = this.heap[parent];
      i = parent;
    }
    this.heap[i] = { task, priority };
  }
  dequeue() { // O(log n) — extract min-priority
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop().task;
    const { task } = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.heap[left].priority < this.heap[smallest].priority) smallest = left;
      if (right < n && this.heap[right].priority < this.heap[smallest].priority) smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
    return task;
  }
  peek() { return this.heap.length ? this.heap[0].task : null; }
  isEmpty() { return this.heap.length === 0; }
}
const pq = new PriorityQueue();
pq.enqueue("Task A", 3); // priority 3 (lower = higher priority)
pq.enqueue("Task B", 1);
pq.enqueue("Task C", 2);
console.log(pq.dequeue()); // "Task B" — priority 1 (highest priority — lowest number)
console.log(pq.dequeue()); // "Task C" — priority 2
console.log(pq.dequeue()); // "Task A" — priority 3
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Hash Table — collision — O(n) search — instead O(1) average (balanced)
// collision — barcha keylar — bucket 0 — linked list — O(n) search — worst
// Yaxshi: resize — load factor — O(1) average — balanced

// XATO 2: Hash Table — hash function — bad hash (collision — O(n) worst)
// hash(key) = 0 — barcha keylar — bucket 0 — linked list — O(n) search — worst
// Yaxshi: hash — good — collision — minim — O(1) average

// XATO 3: Map — key — reference (object) — confusion (reference — different)
// map.set({ a:1 }, "obj1");
// map.set({ a:1 }, "obj2"); // different reference — 2 keys — "obj1" va "obj2" — memory waste
// Yaxshi: key — primitive — string/number — same reference — unique

// XATO 4: Set — duplicate — duplicate — yoki add — O(1) — instead O(n) (array)
const arr = [1, 2, 3, 2, 1];
const unique = [...new Set(arr)]; // O(n) — deduplication — Set — O(1) lookup — O(n) time
// Yaxshi: Set — O(1) lookup — unique — O(n) time — deduplication

// XATO 5: Trie — space — O(ALPHABET_SIZE * L * N) — memory waste (large)
// Trie — 26 children — har node — 26 — memory — O(26 * L * N) — memory waste
// Yaxshi: Map — children — O(L) memory — Map — dynamic — memory efficient (sparse)
// Yaxshi: Trie — Map children — memory efficient (sparse children)

// XATO 6: Heap — insert — O(n) — instead O(log n) (heapify up — O(log n))
// heap — array — insert — end — heapify up — O(log n) — ingachki — parent >= child (min-heap)
// Yaxshi: heap — insert — O(log n) — heapify up — O(log n)

// XATO 7: Heap — extract — O(n) — instead O(log n) (heapify down — O(log n))
// heap — extract min — root — last element — place root — heapify down — O(log n)
// Yaxshi: heap — extract — O(log n) — heapify down — O(log n)

// XATO 8: Priority Queue — array — O(n) insert/extract — instead O(log n) (heap)
// priority queue — array — insert — end — O(1), extract min — O(n) (search min)
// Yaxshi: heap — priority queue — O(log n) insert/extract — O(1) peek

// XATO 9: Hash Table — key — null/undefined — confusion (hash function)
// hash(null) — hash(undefined) — hash function — NaN/undefined — hash — error
// Yaxshi: hash function — key — string/number — valid — null/undefined — special handling

// XATO 10: Heap — array — index — parent/child — confusion (index calculation)
// heap — array — index i — left = 2*i+1, right = 2*i+2, parent = floor((i-1)/2)
// confusion — index — parent/child — error — O(n) — search — wrong
// Yaxshi: heap — array — index — parent/child — formula — O(log n) — heapify
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Hash Table — O(1) average lookup:** hash function — index — bucket — value. Collision — chaining (linked list) / open addressing (linear probing). Load factor — resize — O(n) — amortized O(1) average.
- **Map/SET — built-in — O(1) average:** Map — key → value (any key type — reference — equality — SameValueZero). Set — unique elements — O(1) lookup. Iteration — insertion order. Size — O(1).
- **Trie — O(L) — string length:** Insert/search/prefix — O(L) — L = string length. Leaf — isEnd — string end. Space — O(ALPHABET_SIZE * L * N) — Map children — memory efficient (sparse).
- **Heap — O(log n) insert/extract — O(1) peek:** Min-heap — parent <= children — root — min. Max-heap — parent >= children — root — max. Array — index — parent/child — formula. Priority Queue — heap — O(log n) insert/extract — O(1) peek.

### ❌ Noto'g'ri:

- **Hash Table — collision — O(n) search:** collision — linked list — O(n) search (worst) — resize — O(1) average — balanced.
- **Hash Table — bad hash — O(n) worst:** hash(key) = 0 — barcha keylar — bucket 0 — linked list — O(n) search — worst. Yaxshi: good hash — collision minim — O(1) average.
- **Map — key — reference (object) — confusion:** `{ a:1 }` — different reference — 2 keys — "obj1" va "obj2" — memory waste. Yaxshi: primitive — string/number — same reference — unique.
- **Set — duplicate — array — O(n) deduplication — instead Set O(1) lookup:** Set — O(1) lookup — unique — O(n) time deduplication — faydalı.
- **Trie — space — O(ALPHABET_SIZE * L * N) — memory waste (large):** 26 children — har node — 26 — memory — O(26 * L * N) — memory waste. Yaxshi: Map children — O(L) memory — memory efficient (sparse).
- **Heap — insert — O(n) — instead O(log n):** heap — insert — end — heapify up — O(log n) — parent >= child (min-heap). Yaxshi: heap — insert — O(log n) — heapify up.
- **Heap — extract — O(n) — instead O(log n):** extract min — root — last element — place root — heapify down — O(log n). Yaxshi: heap — extract — O(log n) — heapify down.
- **Priority Queue — array — O(n) insert/extract — instead heap O(log n):** array — insert — end — O(1), extract min — O(n) (search min). Yaxshi: heap — priority queue — O(log n) insert/extract — O(1) peek.
- **Hash Table — key — null/undefined — confusion:** hash function — key — string/number — valid. Yaxshi: null/undefined — special handling.
- **Heap — index — parent/child — confusion:** index i — left = 2*i+1, right = 2*i+2, parent = floor((i-1)/2). Yaxshi: formula — O(log n) — heapify.

## 🎩 Hayotiy o'xshatishlar

- **Hash Table (O(1) lookup):** "Kitobxona — indexiyat" — "kalit — o'yin" — "index" — "oyin" — "O(1) lookup" — "har bir kalit — index — oyin". Masalan: "Library" — "catalog" — "title — index — book" — O(1) lookup.
- **Map/SET:** "Kalit — value" — "Nomer — ism" — "Map" — "key — value" — "O(1) lookup". "Set" — "unique" — "nomerlar — unique" — "O(1) lookup" — "unique elements". Masalan: "PhoneNumber" — "name — phone" — Map — "key — value" — "O(1) lookup". "Set" — "unique phone numbers" — "unique".
- **Trie (O(L) — string — prefix):** "Sozluk — prefix — word" — "har bir kata — har bir harf — trie — prefix — word" — "O(L) — L = word length". Masalan: "Sozluk" — "prefix" — "search" — "word" — "prefix — word" — "O(L) — prefix search".
- **Heap (O(log n) — priority queue):** "O'yin" — "har bir element — priority" — "heap — priority queue" — "O(log n) insert/extract" — "O(1) peek" — "high priority — extract — priority queue". Masalan: "Task scheduler" — "task — priority" — "heap — priority queue" — "O(log n) — extract high priority".

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Advanced DSA — Hash Table / Map / Set / Trie / Heap ] --> B1[ Hash Table (O(1) average lookup)
    key → value — hash function → index (bucket) → value
    collision — chaining (linked list) / open addressing (linear probing)
    load factor (α) — resize — O(n) — amortized O(1) average
    — O(1) average lookup — O(n) worst (collision)
    ]
    A --> B2[ Map (O(1) average lookup)
    key → value — any key type (reference — equality — SameValueZero)
    set(key, value) — O(1)
    get(key) — O(1)
    has(key) — O(1)
    delete(key) — O(1)
    size — O(1)
    iteration — insertion order
    ]
    A --> B3[ Set (unique elements — O(1) lookup)
    unique elements — hash table — key — elements — unique
    add(value) — O(1)
    has(value) — O(1)
    delete(value) — O(1)
    size — O(1)
    iteration — insertion order
    ]
    A --> B4[ Trie (O(L) — L = string length)
    tree — prefix — string
    node — character — children (Map / array — 26)
    insert(word) — O(L) — character → node → children → ingichki — isEnd = true
    search(word) — O(L) — character → node → children → ingichki — isEnd
    startsWith(prefix) — O(L) — character → node → children → ingichki — node
    space — O(ALPHABET_SIZE * L * N) — Map children — memory efficient (sparse)
    ]
    A --> B5[ Heap (O(log n) insert/extract — O(1) peek)
    binary heap — complete binary tree — array — index
    min-heap — parent <= children — root — min
    max-heap — parent >= children — root — max
    insert(value) — O(log n) — array end — heapify up — parent/child swap
    extractMin/Max() — O(log n) — root — remove — last element → root — heapify down
    peek() — O(1) — root
    — Priority Queue — heap — O(log n) insert/extract — O(1) peek
    ]
    
    B1 --> C1[ Hash Table — O(1) average — O(n) worst
    collision — chaining (linked list) — O(n) search worst
    load factor — resize — O(n) — amortized O(1) average
    — O(1) average lookup — O(n) worst (collision)
    ]
    B2 --> C2[ Map — O(1) average
    key → value — any key type — reference — equality
    set/get/has/delete — O(1) — size — O(1)
    iteration — insertion order
    ]
    B3 --> C3[ Set — O(1) average
    unique elements — hash table — key — elements — unique
    add/has/delete — O(1) — size — O(1)
    iteration — insertion order
    ]
    B4 --> C4[ Trie — O(L) — string length
    node — character — children (Map / array — 26)
    insert/search/prefix — O(L) — L = string length
    leaf — isEnd — string end
    space — O(ALPHABET_SIZE * L * N) — Map children — memory efficient
    ]
    B5 --> C5[ Heap — O(log n) insert/extract — O(1) peek
    array — index — parent/child formula
    min-heap — parent <= children — root — min
    max-heap — parent >= children — root — max
    insert — O(log n) — heapify up
    extract — O(log n) — heapify down
    peek — O(1) — root
    Priority Queue — heap — O(log n) insert/extract — O(1) peek
    ]
    
    style B1 fill:#e3f2fd,stroke:#1976d2
    style B2 fill:#e8f5e9,stroke:#2e7d32
    style B3 fill:#fff3e0,stroke:#e65100
    style B4 fill:#f3e5f5,stroke:#7b1fa2
    style B5 fill:#ffebee,stroke:#c62828
    style C1 fill:#e3f2fd,stroke:#1976d2
    style C2 fill:#e8f5e9,stroke:#2e7d32
    style C3 fill:#fff3e0,stroke:#e65100
    style C4 fill:#f3e5f5,stroke:#7b1fa2
    style C5 fill:#ffebee,stroke:#c62828
```

**Diagrama tushuntirishi:** Advanced DSA — 5 ta asosiy qism:
1. **Hash Table (O(1) average lookup)** — key → value, hash function → index (bucket) → value, collision (chaining/open addressing), load factor (α) — resize — amortized O(1) average. O(1) average lookup — O(n) worst (collision).
2. **Map (O(1) average lookup)** — key → value, any key type (reference — equality — SameValueZero), set/get/has/delete — O(1), size — O(1), iteration — insertion order.
3. **Set (unique elements — O(1) lookup)** — unique elements, hash table — key — elements — unique, add/has/delete — O(1), size — O(1), iteration — insertion order.
4. **Trie (O(L) — string length)** — tree — prefix — string, node — character — children (Map / array — 26), insert/search/prefix — O(L) — L = string length, leaf — isEnd — string end, space — O(ALPHABET_SIZE * L * N) — Map children — memory efficient.
5. **Heap (O(log n) insert/extract — O(1) peek)** — binary heap — complete binary tree — array — index, min-heap — parent <= children — root — min, max-heap — parent >= children — root — max, insert — O(log n) (heapify up), extract — O(log n) (heapify down), peek — O(1) (root), Priority Queue — heap — O(log n) insert/extract — O(1) peek.

## 🎙 Intervyu savollari va javoblari

### 1. Hash Table nima? O(1) average lookup — qanday ishlaydi?

**Javob:** Hash Table — key → value — hash function → index (bucket) → value. Hash function — "key" → "hash code" → "index" (bucket). Misol: `hash("Ali") → 123` → `index = hash % capacity = 123 % 10 = 3` — bucket 3 — value. Collision — "bir xil index" — chaining (linked list) yoki open addressing (linear probing). Load factor (α = n / capacity) — agar α > threshold (0.75) — resize (capacity oshirish — hash qayta hisoblash — O(n) — amortized O(1) average). O(1) average lookup — O(n) worst (collision — linked list — O(n) search).

### 2. Map va Set — built-in — qanday ishlaydi?

**Javob:** Map — key → value — any key type (reference — equality — SameValueZero: NaN = NaN, -0 = +0). `map.set("Ali", 25)` — O(1) average. `map.get("Ali")` — O(1). `map.has("Ali")` — O(1). `map.delete("Ali")` — O(1). `map.size` — O(1). Iteration — insertion order. Set — unique elements — hash table — key — elements — unique. `set.add(4)` — O(1). `set.has(2)` — O(1). `set.delete(2)` — O(1). `set.size` — O(1). Iteration — insertion order. Shunday qilib, Map/SET — O(1) average lookup — built-in — hash table.

### 3. Trie nima? O(L) — string length — qanday ishlaydi?

**Javob:** Trie — tree — prefix — string. Node — character — children (Map / array — 26 — English). Insert — "word" — character → node → children → ingachki — child yo'q — create — ingachki — character — oxirgi character — isEnd = true. Search — "word" — character → node → children → ingachki — child yo'q — return false; oxirgi character — isEnd — true/false. Prefix — "prefix" — character → node → children → ingachki — child yo'q — return false; oxirgi — return node. O(L) — L = string length. Space — O(ALPHABET_SIZE * L * N) — Map children — memory efficient (sparse).

### 4. Heap nima? O(log n) insert/extract — qanday ishlaydi?

**Javob:** Heap — binary heap — complete binary tree — array — index. Min-heap — parent <= children — root = min. Max-heap — parent >= children — root = max. Array — index i — left = 2*i+1, right = 2*i+2, parent = floor((i-1)/2). Insert — O(log n) — "add — array end — heapify up — compare — parent — swap — ingachki — parent >= child (min-heap) — ingachki — o'rnatiladi". Extract min/max — O(log n) — "root — remove — last element — place root — heapify down — compare — children — swap — ingachki — parent <= children (min-heap) — ingachki — o'rnatiladi". Peek — O(1) — root. Space — O(n) — heap size.

### 5. Priority Queue nima? Heap — O(log n) insert/extract — qanday ishlaydi?

**Javob:** Priority Queue — heap — priority. Element — priority — insert — O(log n) — "add — array end — heapify up — parent/child swap". Extract — O(log n) — "root — remove — last element — place root — heapify down — compare — children — swap". Peek — O(1) — root. Misol: "Task scheduler — priority — high priority — extract — priority queue — heap — O(log n) insert/extract — O(1) peek". Shunday qilib, Priority Queue — heap — O(log n) insert/extract — O(1) peek — "high priority — extract".

### 6. Hash Table collision — qanday yondashuvlar?

**Javob:** Collision — "bir xil index" — chaining (linked list) — "bucket ichida linked list" — "elements — bucket" — search — O(n) (linked list — n elements). Open addressing (linear probing) — "key — hash index — bucket — empty — store — ingachki — bucket — next index (linear probe) — ingachki — empty — store". Yoki quadratic probing, double hashing. Load factor — resize — O(n) — hash qayta hisoblash — "amortized O(1) average". Shunday qilib, collision — chaining/open addressing — O(1) average — amortized O(1) average.

### 7. Hash Table — load factor — qanday ishlaydi? Resize — qanday?

**Javob:** Load factor (α = n / capacity) — "elementlar soni / bucketlar soni". Agar α > threshold (0.75) — resize (capacity oshirish — odatda capacity * 2) — hash qayta hisoblash — elements re-insert (O(n) — re-insert all elements). Shunday qilib, resize — O(n) — amortized O(1) average (qo'shimcha — O(n) — amortized — elements — re-insert — "amortized O(1) average"). Shunday qilib, load factor — resize — O(n) — amortized O(1) average.

### 8. Map — key type — any — qanday ishlaydi? Reference — equality?

**Javob:** Map — key — any type (primitive — string/number/symbol/boolean/null/undefined/NaN, object — reference). Reference key — "equality — SameValueZero" — `NaN = NaN`, `-0 = +0`, `object1 === object2` (reference) — "same object reference" — key — unique. Masalan: `map.set({ a:1 }, "obj")` — `{ a:1 }` — reference — key — unique — `map.has({ a:1 })` — false (different reference). Shunday qilib, Map — key — any type — reference — SameValueZero — equality.

### 9. Set — unique elements — qanday ishlaydi? Memory?

**Javob:** Set — unique elements — hash table — key — elements — unique. `set.add(2)` — "2" — key — hash — bucket — store — unique. `set.has(2)` — O(1) — lookup — bucket — key — found. `set.delete(2)` — O(1) — bucket — key — delete. Space — O(n) — n elements — hash table — key — elements. Shunday qilib, Set — unique elements — hash table — O(1) lookup — O(n) space.

### 10. Heap — array — index — parent/child formula — qanday ishlaydi?

**Javob:** Heap — array — index — parent/child formula:
- `index i` — left child = 2*i + 1
- `index i` — right child = 2*i + 2
- `index i` — parent = Math.floor((i - 1) / 2)
Misоl: `heap = [1, 3, 5, 8]` — index 0 = 1 (root), index 1 = 3 (left child of 1), index 2 = 5 (right child of 1), index 3 = 8 (left child of 3). Shunday qilib, heap — array — index — parent/child formula — O(log n) heapify up/down. Shunday qilib, heap — array — index — O(log n) insert/extract — O(1) peek.

### 📌 Xulosa:

- **Hash Table (O(1) average lookup):** key → value, hash function → index, collision (chaining/open addressing), load factor (α) — resize — amortized O(1) average. O(1) average — O(n) worst (collision).
- **Map (O(1) average):** key → value, any key type, reference — SameValueZero, set/get/has/delete — O(1), size — O(1), iteration — insertion order.
- **Set (O(1) average):** unique elements, hash table — key — elements — unique, add/has/delete — O(1), size — O(1), iteration — insertion order.
- **Trie (O(L) — string length):** tree — prefix — string, node — character — children (Map/array), insert/search/prefix — O(L) — L = string length, leaf — isEnd, space — O(ALPHABET_SIZE * L * N) — Map children — memory efficient.
- **Heap (O(log n) insert/extract — O(1) peek):** binary heap — complete binary tree — array — index, min-heap (parent <= children — root min), max-heap (parent >= children — root max), insert — O(log n) (heapify up), extract — O(log n) (heapify down), peek — O(1) (root).
- **Priority Queue (heap):** element — priority — insert/extract — O(log n) — peek — O(1) — high priority — extract.

---

**Keyingi darslar (o'rta/advanced daraja):**
1. **Advanced DSA — Hash Table, Map/SET, Trie, Heap — bu dars (✔)**
2. **Advanced Sorting — Quick/Merge Heap detail, Radix, Counting**
3. **Advanced Graf — Dijkstra detail, Bellman-Ford, Floyd-Warshall, MST (Kruskal/Prim)**
4. **Dynamic Programming (DP) — Fibonacci, Knapsack, LCS, LIS, interval scheduling**
5. **Backtracking — permutations, combinations, N-Queens, Sudoku, subsets**
6. **Advanced Data Structures — AVL, Red-Black Tree, B-Tree, Skip List, Suffix Tree**

Qaysi mavzu keyingi? Raqam (2, 3, 4, 5, 6) yoki nom. Yozayman.
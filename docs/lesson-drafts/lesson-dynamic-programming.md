# 📚 Dynamic Programming (DP) — Fibonacci, Knapsack, LCS, LIS, Interval Scheduling — O'rta/Advanced daraja

## 📦 Tushunchalarning sodda izohi

**Dynamic Programming (DP)** — "muammoni yechish — pastki subproblemlar — saqlash — qayta ishlatish — topish". "DP — memoization (top-down) yoki tabulation (bottom-up) yordamida — subproblemlar — saqlash — qayta ishlatish".

- **DP — 2 xil usul:**
  - **Memoization (Top-down):** "recursive — subproblem — cache — saqlash — qayta ishlatish — agar cache — bor — return — yo'q — compute — cache — saqlash". "Recursive — top-down — subproblem — cache". Masalan: "fib(n) — cache — {n: value} — recursive — subproblem — cache".
  - **Tabulation (Bottom-up):** "iterative — subproblem — table — saqlash — from bottom — top — subproblem — table". "Iterative — bottom-up — subproblem — table". Masalan: "fib(n) — table — [0, 1, ...] — iterative — bottom-up — subproblem — table".
- **DP — 2 xil holat:**
  - **Overlapping subproblems (Ortiqcha subproblemlar — takrorlanadi):** "bir xil subproblem — takrorlanadi — cache — saqlash — qayta ishlatish". Masalan: "fib(n) — fib(n-1) + fib(n-2) — fib(n-2) — ikki marta (fib(n) — fib(n-1) — fib(n-2); fib(n-1) — fib(n-2) — fib(n-3) — fib(n-2) — takrorlanadi)".
  - **Optimal substructure (Optimal qurilishi):** "muammo — subproblemlar — optimal yechim — global optimal yechim". Masalan: "knapsack — subproblem — items — weight — optimal value — global optimal value".
- **DP — "state" (holat) va "transition" (o'tish):** "state — subproblem — qiymat". "transition — subproblem — qiymat — o'zgarishi — formula". Masalan: "fib(n) — state = n — transition = fib(n-1) + fib(n-2)". "knapsack — state = (i, w) — i — items — w — weight — transition — max(include, exclude)".

### 1. Fibonacci (DP — memoization / tabulation)

- **Naive recursion — O(2ⁿ) — worst:** "fib(n) = fib(n-1) + fib(n-2) — subproblems — takrorlanadi — O(2ⁿ) — worst". Masalan: "fib(5) — fib(4) + fib(3) — fib(4) — fib(3) + fib(2) — fib(3) — fib(2) + fib(1) — fib(2) — fib(1) + fib(0) — ... — subproblems — takrorlanadi — O(2ⁿ)".
- **Memoization (Top-down) — O(n) time — O(n) space:** "recursive — subproblem — cache — saqlash — qayta ishlatish — O(n) time — n subproblems — O(n) space (cache)". Masalan: "fib(5) — cache = {} — fib(5) → cache = {} — fib(4) + fib(3) — fib(4) → cache = {5: ?, 4: ?} — fib(3) + fib(2) — ... — cache — subproblem — qiymat — O(n) time — O(n) space".
- **Tabulation (Bottom-up) — O(n) time — O(1) space (optimized — Fibonacci):** "iterative — bottom-up — subproblem — table — O(n) time — O(1) space (optimized — Fibonacci — 2 variables — cache — O(1) space)". Masalan: "fib(5) — table = [0, 1] — i = 2 → 5 — fib[i] = fib[i-1] + fib[i-2] — O(n) time — O(1) space (2 variables — cache — O(1) space)".

### 2. 0/1 Knapsack (DP — 2D table — O(n * W) time — O(n * W) space)

- **Muammo:** "n — items — weight — value — capacity W — max value — items — include/exclude". "DP — state — (i, w) — i — items — w — weight — transition — max(include, exclude)".
- **State:** "dp[i][w] — max value — first i items — capacity w".
- **Transition:** "dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]) — agar w >= weight[i]". "Include — dp[i-1][w - weight[i]] + value[i]". "Exclude — dp[i-1][w]".
- **Base case:** "dp[0][w] = 0 — 0 items — max value 0". "dp[i][0] = 0 — capacity 0 — max value 0".
- **Time — O(n * W):** "n items — W capacity — n * W states — O(n * W) time".
- **Space — O(n * W):** "2D table — n * W — O(n * W) space". "Optimized — O(W) space (1D array — reverse iterate — O(W) space)".
- **Misol:** "items = [(weight=2, value=3), (weight=3, value=4), (weight=4, value=5), (weight=5, value=6)] — W = 5 — dp[4][5] = max value — 7 (items 1, 3 — weight 2+3=5 — value 3+4=7)".

### 3. Longest Common Subsequence (LCS) — DP — O(n * m) time — O(n * m) space

- **Muammo:** "2 ta string — S1, S2 — longest common subsequence (LCS) — length". "Subsequence — chars — order — yoki yo'q (contiguous emas)". Masalan: "S1 = \"abcde\", S2 = \"ace\" — LCS = \"ace\" (length 3)".
- **State:** "dp[i][j] — LCS length — S1[0..i-1] — S2[0..j-1]".
- **Transition:**
  - "agar S1[i-1] === S2[j-1] — dp[i][j] = dp[i-1][j-1] + 1 (char — match — LCS + 1)".
  - "agar S1[i-1] !== S2[j-1] — dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (exclude — max of left/up)".
- **Base case:** "dp[0][j] = 0 — S1 empty — LCS 0". "dp[i][0] = 0 — S2 empty — LCS 0".
- **Time — O(n * m):** "S1 — n — S2 — m — n * m states — O(n * m) time".
- **Space — O(n * m):** "2D table — n * m — O(n * m) space". "Optimized — O(min(n, m)) space (1D array — reverse iterate — O(min(n, m)) space)".
- **Misol:** "S1 = \"abcde\" — S2 = \"ace\" — dp[5][3] = 3 (LCS = \"ace\")".

### 4. Longest Increasing Subsequence (LIS) — DP — O(n²) time — O(n) space

- **Muammo:** "array — longest increasing subsequence (LIS) — length". "Subsequence — elements — order — yoki yo'q (contiguous emas) — increasing".
- **State:** "dp[i] — LIS length — ending at index i".
- **Transition:** "dp[i] = 1 + max(dp[j]) — j < i — arr[j] < arr[i] (j — previous — arr[j] < arr[i] — increasing)". "Agar boshqa — dp[i] = 1 (bare minimum — element — 1)".
- **Base case:** "dp[i] = 1 — element — 1 (minimum)".
- **Time — O(n²):** "n elements — each element — previous elements — O(n²) time".
- **Space — O(n):** "dp array — n — O(n) space".
- **O(n log n) — patience sorting / binary search (indexed — DP):** "subarray — smallest ending element — index — binary search — O(n log n) time — O(n) space (indexed — DP)". Masalan: "arr = [10, 9, 2, 5, 3, 7, 101, 18] — LIS = [2,3,7,101] — length 4 (O(n log n) — patience sorting — binary search)".
- **Misol:** "arr = [10, 9, 2, 5, 3, 7, 101, 18] — dp = [1,1,1,2,2,3,4,4] — LIS = 4 (2,3,7,18 — yoki 2,3,7,101)".
- **O(n log n) — patience sorting — binary search:**
  - "tails — array — smallest ending element — index — binary search".
  - "har bir element — binary search — tails — find position — replace/update".
  - "tails.length — LIS length".

### 5. Interval Scheduling (DP — greedy — O(n log n) time — O(n) space)

- **Muammo:** "intervals — (start, end) — max non-overlapping intervals — select". "Non-overlapping — next interval — start >= prev end".
- **Greedy approach (O(n log n) — optimal):** "sort — intervals — end time (ascending) — select — first — next — start >= prev end — select".
  - "Sort — intervals — end time — O(n log n) time".
  - "Select — first interval — prev_end = intervals[0].end — count = 1".
  - "Har bir interval — agar start >= prev_end — select — prev_end = current.end — count++".
  - "Total — O(n log n) time — O(1) space (in-place sort)".
- **DP approach (O(n log n) — optimal):** "sort — intervals — start time (ascending) — dp[i] — max non-overlapping intervals — start at i — binary search — next non-overlapping interval — O(n log n) time — O(n) space".
  - "Sort — intervals — start time — O(n log n) time".
  - "dp[n] = 0 (base — after last interval)".
  - "dp[i] = max(1 + dp[next non-overlapping interval], dp[i+1]) — next non-overlapping interval — binary search (start >= current end)".
  - "dp[0] — max non-overlapping intervals — O(n log n) time — O(n) space".
- **Greedy — O(n log n) time — O(1) space (in-place sort) — optimal.** "Greedy — sorting — end time — O(n log n) time — O(1) space".

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Fibonacci — Naive recursion — O(2ⁿ) — worst
function fibNaive(n) { // O(2ⁿ) — time — worst
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
} // O(2ⁿ) — time — worst (subproblems — takrorlanadi)
console.log(fibNaive(10)); // 55

// 2. Fibonacci — Memoization (Top-down) — O(n) time — O(n) space
function fibMemo(n, memo = {}) { // O(n) — time, O(n) — space
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
} // O(n) — time — O(n) — space (cache)
console.log(fibMemo(10)); // 55

// 3. Fibonacci — Tabulation (Bottom-up) — O(n) time — O(n) space
function fibTab(n) { // O(n) — time, O(n) — space (table)
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
} // O(n) — time, O(n) — space
console.log(fibTab(10)); // 55

// 4. Fibonacci — Tabulation (optimized — O(1) space)
function fibOptimal(n) { // O(n) — time, O(1) — space (2 variables)
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
} // O(n) — time, O(1) — space
console.log(fibOptimal(10)); // 55

// 5. 0/1 Knapsack — DP (2D table) — O(n * W) time — O(n * W) space
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  // dp[i][w] — max value — first i items — capacity w
  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1];
    const v = values[i - 1];
    for (let cap = 0; cap <= capacity; cap++) {
      dp[i][cap] = dp[i - 1][cap]; // exclude
      if (cap >= w) dp[i][cap] = Math.max(dp[i][cap], dp[i - 1][cap - w] + v); // include
    }
  }
  return dp[n][capacity];
} // O(n * W) — time, O(n * W) — space
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
console.log(knapSack(weights, values, 5)); // 7 (items 1,3 — weight 2+3=5 — value 3+4=7)

// 5b. 0/1 Knapsack — DP (1D array — optimized space) — O(n * W) time — O(W) space
function knapsackOptimized(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let cap = capacity; cap >= weights[i]; cap--) {
      dp[cap] = Math.max(dp[cap], dp[cap - weights[i]] + values[i]);
    } // reverse iterate — O(W) space (avoid overwrite — previous row)
  }
  return dp[capacity];
} // O(n * W) — time, O(W) — space
console.log(knapsackOptimized(weights, values, 5)); // 7

// 6. Longest Common Subsequence (LCS) — DP (2D table) — O(n * m) time — O(n * m) space
function lcs(s1, s2) {
  const n = s1.length, m = s2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[n][m];
} // O(n * m) — time, O(n * m) — space
console.log(lcs("abcde", "ace")); // 3 — "ace"

// 6b. LCS — DP (2D table — backtrack — find LCS string)
function lcsString(s1, s2) {
  const n = s1.length, m = s2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // backtrack — find LCS string
  let i = n, j = m;
  const lcsChars = [];
  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      lcsChars.push(s1[i - 1]);
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) i--;
    else j--;
  }
  return lcsChars.reverse().join("");
} // O(n * m) — time, O(n * m) — space
console.log(lcsString("abcde", "ace")); // "ace"

// 7. Longest Increasing Subsequence (LIS) — DP (O(n²) time — O(n) space)
function lisDP(arr) {
  const n = arr.length;
  const dp = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
} // O(n²) — time, O(n) — space
console.log(lisDP([10, 9, 2, 5, 3, 7, 101, 18])); // 4 — [2,3,7,101] yoki [2,3,7,18]

// 7b. LIS — O(n log n) time — O(n) space (patience sorting — binary search — indexed DP)
function lisOptimal(arr) {
  const tails = [];
  for (const num of arr) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    tails[left] = num;
    if (left === tails.length) tails.push(num); // new length
  }
  return tails.length;
} // O(n log n) — time (binary search — O(log n) per element — n elements — O(n log n)), O(n) — space (tails array)
console.log(lisOptimal([10, 9, 2, 5, 3, 7, 101, 18])); // 4

// 8. Interval Scheduling — Greedy (O(n log n) time — O(1) space — optimal)
function intervalSchedulingGreedy(intervals) {
  // sort — end time — ascending — O(n log n) time
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let prevEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= prevEnd) { // non-overlapping — select
      count++;
      prevEnd = end;
    }
  }
  return count;
} // O(n log n) — time (sort), O(1) — space (in-place sort)
const intervals = [[1, 3], [2, 4], [3, 5], [4, 6], [5, 7]];
console.log(intervalSchedulingGreedy(intervals)); // 3 (intervals [1,3], [3,5], [5,7] — non-overlapping)

// 9. Interval Scheduling — DP (O(n log n) time — O(n) space — optimal)
function intervalSchedulingDP(intervals) {
  intervals.sort((a, b) => a[0] - b[0]); // sort — start time — O(n log n) time
  const n = intervals.length;
  const dp = new Array(n + 1).fill(0);
  // dp[i] — max non-overlapping intervals — start at i
  for (let i = n - 1; i >= 0; i--) {
    // next non-overlapping interval — binary search (start >= current end)
    const [start, end] = intervals[i];
    let lo = i + 1, hi = n, nextIdx = n;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (intervals[mid][0] >= end) {
        nextIdx = mid;
        hi = mid;
      } else lo = mid + 1;
    }
    dp[i] = Math.max(1 + dp[nextIdx], dp[i + 1]); // select current + next, yoki skip
  }
  return dp[0];
} // O(n log n) — time (sort + n binary searches — O(n log n)), O(n) — space (dp array)
console.log(intervalSchedulingDP([[1, 3], [2, 4], [3, 5], [4, 6], [5, 7]])); // 3

// 10. DP — state + transition — yodlaymiz
// DP — 2 xil usul:
//   1. Memoization (Top-down) — recursive — subproblem — cache — O(n) — time — O(n) — space (cache)
//   2. Tabulation (Bottom-up) — iterative — subproblem — table — O(n) — time — O(1) — space (if optimized)
// DP — 2 xil holat:
//   1. Overlapping subproblems — subproblemlar — takrorlanadi — cache — saqlash — qayta ishlatish
//   2. Optimal substructure — subproblemlar — optimal yechim — global optimal yechim
// DP — state + transition:
//   state — subproblem — qiymat
//   transition — subproblem — qiymat — o'zgarishi — formula
// DP — time/space:
//   time — states — transition — O(states * transition)
//   space — cache/table — O(states) — optimized — O(1) space (if possible)
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Fibonacci — naive recursion — O(2ⁿ) — worst — instead memoization/tabulation
fibNaive(50); // O(2⁵⁰) — impossible — timeout — instead memoization O(n) — fibMemo(50)

// XATO 2: Knapsack — greedy (value/weight ratio) — not optimal for 0/1
// greedy — value/weight ratio — sort — descending — select — until capacity — NOT optimal
// Yaxshi: DP — O(n * W) — optimal — 0/1 knapsack

// XATO 3: Knapsack — items — weight — value — fractional (not 0/1) — greedy — optimal
// fractional knapsack — greedy — value/weight ratio — optimal — fractional (not 0/1)
// Yaxshi: 0/1 knapsack — DP — O(n * W) — optimal — 0/1 (not fractional)

// XATO 4: LCS — naive recursion — O(2^(n+m)) — worst — instead DP O(n * m)
function lcsNaive(s1, s2, i = 0, j = 0) { // O(2^(n+m)) — worst
  if (i === s1.length || j === s2.length) return 0;
  if (s1[i] === s2[j]) return 1 + lcsNaive(s1, s2, i + 1, j + 1);
  return Math.max(lcsNaive(s1, s2, i + 1, j), lcsNaive(s1, s2, i, j + 1));
}
// O(2^(n+m)) — worst (subproblems — takrorlanadi — O(2^(n+m)))
// Yaxshi: LCS — DP — O(n * m) — lcs(s1, s2)

// XATO 5: LIS — naive recursion — O(2ⁿ) — worst — instead DP O(n²) / O(n log n)
function lisNaive(arr, i = 0, prev = -Infinity) { // O(2ⁿ) — worst
  if (i === arr.length) return 0;
  let take = 0;
  if (arr[i] > prev) take = 1 + lisNaive(arr, i + 1, arr[i]);
  return Math.max(take, lisNaive(arr, i + 1, prev));
}
// O(2ⁿ) — worst (subproblems — takrorlanadi — O(2ⁿ))
// Yaxshi: LIS — DP — O(n²) — lisDP(arr) — yoki O(n log n) — lisOptimal(arr)

// XATO 6: Interval Scheduling — DP (no binary search) — O(n²) — instead greedy O(n log n)
// DP (no binary search) — O(n²) — for each interval — find next non-overlapping — O(n) — total O(n²)
// Yaxshi: DP (with binary search) — O(n log n) — intervalSchedulingDP(intervals) — yoki greedy O(n log n)

// XATO 7: DP — space — O(n * W) — instead O(W) space (optimized 1D array)
// knapsack — dp — 2D table — n * W — O(n * W) space — instead O(W) space (1D array — reverse iterate)
// Yaxshi: knapsackOptimized — dp — 1D array — O(W) space — reverse iterate (avoid overwrite — previous row)

// XATO 8: DP — memoization — cache — size — unlimited — memory leak
// memoization — cache — size — unlimited — agar n — katta — cache size — large — memory leak
// Yaxshi: memoization — cache — size — limited — LRU cache — yoki tabulation — O(1) space (if optimized)

// XATO 9: DP — state — wrong — transition — wrong — wrong answer
// knapsack — state — wrong — dp[i][w] — wrong — dp[w] — 1D array — reverse iterate — wrong — wrong answer
// Yaxshi: state — transition — correct — knapsack — dp[i][w] — max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]) — 1D array — reverse iterate — dp[cap] = Math.max(dp[cap], dp[cap - weight] + value)

// XATO 10: DP — base case — missing — wrong — wrong answer
// fib — base case — missing — fib(0) — NaN — instead fib(0) = 0
function fibNoBase(n) {
  // base case — missing — fib(0) — NaN
  return fibNoBase(n - 1) + fibNoBase(n - 2);
}
// Yaxshi: base case — fib(0) = 0, fib(1) = 1 — fib(2) = 1, fib(3) = 2, ...
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **DP — 2 xil usul:** Memoization (Top-down — recursive — subproblem — cache — O(n) time — O(n) space) — Tabulation (Bottom-up — iterative — subproblem — table — O(n) time — O(1) space if optimized).
- **DP — 2 xil holat:** Overlapping subproblems (subproblemlar — takrorlanadi — cache — saqlash — qayta ishlatish) — Optimal substructure (subproblemlar — optimal yechim — global optimal yechim).
- **DP — state + transition:** state — subproblem — qiymat — transition — subproblem — qiymat — o'zgarishi — formula.
- **DP — time/space:** time — states — transition — O(states * transition) — space — cache/table — O(states) — optimized — O(1) space (if possible).
- **Fibonacci — O(n) time — O(1) space:** Memoization (O(n) time — O(n) space) — Tabulation (O(n) time — O(n) space) — Optimized (O(n) time — O(1) space — 2 variables).
- **0/1 Knapsack — O(n * W) time — O(W) space:** DP (2D table — O(n * W) time — O(n * W) space) — Optimized (1D array — reverse iterate — O(n * W) time — O(W) space).
- **LCS — O(n * m) time — O(min(n, m)) space:** DP (2D table — O(n * m) time — O(n * m) space) — Optimized (1D array — reverse iterate — O(n * m) time — O(min(n, m)) space).
- **LIS — O(n²) time — O(n) space — O(n log n) time — O(n) space:** DP (O(n²) time — O(n) space — dp[i] — LIS length — ending at i) — Patience sorting / binary search (O(n log n) time — O(n) space — tails array — indexed DP).
- **Interval Scheduling — Greedy O(n log n) time — O(1) space — optimal:** Greedy (sort — end time — O(n log n) time — O(1) space (in-place sort) — optimal). DP (sort — start time — binary search — O(n log n) time — O(n) space — optimal).

### ❌ Noto'g'ri:

- **Fibonacci — naive recursion — O(2ⁿ) — worst:** O(2ⁿ) — time — worst (subproblems — takrorlanadi — O(2ⁿ)). Yaxshi: memoization — O(n) time — O(n) space — yoki tabulation — O(n) time — O(1) space (optimized).
- **Knapsack — greedy (value/weight ratio) — not optimal for 0/1:** greedy — value/weight ratio — sort — descending — select — until capacity — NOT optimal (0/1). Yaxshi: DP — O(n * W) — optimal — 0/1 knapsack.
- **Knapsack — fractional (not 0/1) — greedy — optimal:** fractional knapsack — greedy — value/weight ratio — optimal — fractional (not 0/1). Yaxshi: 0/1 knapsack — DP — O(n * W) — optimal — 0/1 (not fractional).
- **LCS — naive recursion — O(2^(n+m)) — worst:** O(2^(n+m)) — worst (subproblems — takrorlanadi — O(2^(n+m))). Yaxshi: LCS — DP — O(n * m) — lcs(s1, s2).
- **LIS — naive recursion — O(2ⁿ) — worst:** O(2ⁿ) — worst (subproblems — takrorlanadi — O(2ⁿ)). Yaxshi: LIS — DP — O(n²) — O(n) space — yoki O(n log n) — O(n) space (patience sorting — binary search).
- **Interval Scheduling — DP (no binary search) — O(n²) — instead greedy O(n log n):** DP (no binary search) — O(n²) — for each interval — find next non-overlapping — O(n) — total O(n²). Yaxshi: DP (with binary search) — O(n log n) — intervalSchedulingDP(intervals) — yoki greedy O(n log n).
- **Knapsack — space — O(n * W) — instead O(W) space (optimized):** knapsack — dp — 2D table — n * W — O(n * W) space — instead O(W) space (1D array — reverse iterate). Yaxshi: knapsackOptimized — dp — 1D array — O(W) space — reverse iterate (avoid overwrite — previous row).
- **Memoization — cache — size — unlimited — memory leak:** memoization — cache — size — unlimited — agar n — katta — cache size — large — memory leak. Yaxshi: memoization — cache — size — limited — LRU cache — yoki tabulation — O(1) space (if optimized).
- **DP — state — wrong — transition — wrong — wrong answer:** knapsack — state — wrong — dp[i][w] — wrong — dp[w] — 1D array — reverse iterate — wrong — wrong answer. Yaxshi: state — transition — correct — knapsack — dp[i][w] — max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]) — 1D array — reverse iterate — dp[cap] = Math.max(dp[cap], dp[cap - weight] + value).
- **DP — base case — missing — wrong — wrong answer:** fib — base case — missing — fib(0) — NaN — instead fib(0) = 0. Yaxshi: base case — fib(0) = 0, fib(1) = 1 — fib(2) = 1, fib(3) = 2, ....

## 🎩 Hayotiy o'xshatishlar

- **Fibonacci:** "Sevgi raqami — Fibonacci — 1, 1, 2, 3, 5, 8, ..." — "har bir son — oldingi 2 son — yig'indisi". "DP — memoization — cache — saqlash — qayta ishlatish — O(n) time — O(n) space". "Tabulation — O(n) time — O(1) space (2 variables — cache — O(1) space)".
- **Knapsack:** "Ofuchi — mahsulot — weight — value — capacity — max value — items — include/exclude". "DP — state — (i, w) — i — items — w — weight — transition — max(include, exclude)". "0/1 — include/exclude — item — 1 — once — 0 — exclude". "Optimized — 1D array — reverse iterate — O(W) space".
- **LCS:** "2 ta so'z — common subsequence — longest". "Subsequence — chars — order — yoki yo'q (contiguous emas)". "DP — state — dp[i][j] — S1[0..i-1] — S2[0..j-1]". "Transition — agar S1[i-1] === S2[j-1] — dp[i][j] = dp[i-1][j-1] + 1 (char — match — LCS + 1) — agar S1[i-1] !== S2[j-1] — dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (exclude — max of left/up)".
- **LIS:** "Massiv — increasing subsequence — longest". "Subsequence — elements — order — yoki yo'q (contiguous emas) — increasing". "DP — state — dp[i] — LIS length — ending at i". "Transition — dp[i] = 1 + max(dp[j]) — j < i — arr[j] < arr[i] (j — previous — arr[j] < arr[i] — increasing)". "O(n log n) — patience sorting — binary search — tails array — indexed DP".
- **Interval Scheduling:** "Ofis — meetings — intervals — max non-overlapping meetings — select". "Greedy — sort — end time — O(n log n) time — O(1) space (in-place sort) — optimal". "Select — first meeting — prev_end = meeting.end — count = 1 — har bir meeting — agar start >= prev_end — select — prev_end = meeting.end — count++".

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Dynamic Programming (DP) — Fibonacci, Knapsack, LCS, LIS, Interval Scheduling ] --> B1[ DP — 2 xil usul
    Memoization (Top-down) — recursive — subproblem — cache — O(n) time — O(n) space
    Tabulation (Bottom-up) — iterative — subproblem — table — O(n) time — O(1) space (if optimized)
    — 2 xil usul — DP
    ]
    A --> B2[ DP — 2 xil holat
    Overlapping subproblems — subproblemlar — takrorlanadi — cache — saqlash — qayta ishlatish
    Optimal substructure — subproblemlar — optimal yechim — global optimal yechim
    — 2 xil holat — DP
    ]
    A --> B3[ DP — state + transition
    state — subproblem — qiymat
    transition — subproblem — qiymat — o'zgarishi — formula
    — state + transition — DP
    ]
    A --> B4[ DP — time/space
    time — states * transition — O(states * transition)
    space — cache/table — O(states) — optimized — O(1) space (if possible)
    — time/space — DP
    ]
    A --> B5[ Fibonacci — O(n) time — O(1) space
    Naive recursion — O(2ⁿ) — worst — subproblems — takrorlanadi
    Memoization — O(n) time — O(n) space (cache)
    Tabulation — O(n) time — O(n) space (table)
    Optimized — O(n) time — O(1) space (2 variables — cache — O(1) space)
    ]
    A --> B6[ 0/1 Knapsack — O(n * W) time — O(W) space (optimized)
    state — dp[i][w] — i — items — w — weight
    transition — max(include, exclude) — max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])
    0/1 — include/exclude — item — 1 — once — 0 — exclude
    2D table — O(n * W) time — O(n * W) space
    1D array — reverse iterate — O(n * W) time — O(W) space
    ]
    A --> B7[ Longest Common Subsequence (LCS) — O(n * m) time — O(min(n, m)) space (optimized)
    state — dp[i][j] — S1[0..i-1] — S2[0..j-1]
    transition — agar S1[i-1] === S2[j-1] — dp[i][j] = dp[i-1][j-1] + 1 (char — match — LCS + 1)
    agar S1[i-1] !== S2[j-1] — dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (exclude — max of left/up)
    2D table — O(n * m) time — O(n * m) space
    optimized — 1D array — reverse iterate — O(n * m) time — O(min(n, m)) space
    ]
    A --> B8[ Longest Increasing Subsequence (LIS) — O(n²) time — O(n) space — O(n log n) time — O(n) space (optimal)
    state — dp[i] — LIS length — ending at i
    transition — dp[i] = 1 + max(dp[j]) — j < i — arr[j] < arr[i] (j — previous — arr[j] < arr[i] — increasing)
    base case — dp[i] = 1 — element — 1 (minimum)
    DP — O(n²) time — O(n) space (dp array — n)
    Patience sorting — binary search — O(n log n) time — O(n) space (tails array — indexed DP)
    — O(n log n) time — O(n) space (optimal)
    ]
    A --> B9[ Interval Scheduling — Greedy O(n log n) time — O(1) space (in-place sort) — optimal — DP O(n log n) time — O(n) space
    greedy — sort — end time — O(n log n) time — O(1) space (in-place sort)
    select — first interval — prev_end = intervals[0].end — count = 1
    har bir interval — agar start >= prev_end — select — prev_end = current.end — count++
    DP — sort — start time — binary search — next non-overlapping interval — O(n log n) time — O(n) space
    dp[i] = max(1 + dp[next non-overlapping], dp[i+1])
    dp[0] — max non-overlapping intervals — O(n log n) time — O(n) space
    — greedy — O(n log n) time — O(1) space (optimal) — DP — O(n log n) time — O(n) space
    ]
    
    B1 --> C1[ Memoization — recursive — cache
    subproblem — cache — qiymat — saqlash — qayta ishlatish
    O(n) — time — O(n) — space (cache)
    ]
    B2 --> C2[ Overlapping subproblems — takrorlanadi — cache — saqlash
    subproblem — takrorlanadi — cache — saqlash — qayta ishlatish
    — overlapping subproblems
    ]
    B3 --> C3[ State + transition — DP
    state — subproblem — qiymat
    transition — subproblem — qiymat — o'zgarishi — formula
    — state + transition — DP
    ]
    B4 --> C4[ Time/space — DP
    time — states * transition — O(states * transition)
    space — cache/table — O(states) — optimized — O(1) space (if possible)
    — time/space — DP
    ]
    B5 --> C5[ Fibonacci — O(n) time — O(1) space (optimized)
    naive recursion — O(2ⁿ) — worst — subproblems — takrorlanadi
    memoization — O(n) time — O(n) space (cache)
    tabulation — O(n) time — O(n) space (table)
    optimized — O(n) time — O(1) space (2 variables — cache — O(1) space)
    ]
    B6 --> C6[ 0/1 Knapsack — O(n * W) time — O(W) space (optimized)
    state — dp[i][w] — i — items — w — weight
    transition — max(include, exclude) — dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])
    2D table — O(n * W) time — O(n * W) space
    1D array — reverse iterate — O(n * W) time — O(W) space
    ]
    B7 --> C7[ LCS — O(n * m) time — O(min(n, m)) space (optimized)
    state — dp[i][j] — S1[0..i-1] — S2[0..j-1]
    transition — agar S1[i-1] === S2[j-1] — dp[i][j] = dp[i-1][j-1] + 1
    agar S1[i-1] !== S2[j-1] — dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    2D table — O(n * m) time — O(n * m) space
    optimized — 1D array — reverse iterate — O(n * m) time — O(min(n, m)) space
    ]
    B8 --> C8[ LIS — O(n²) time — O(n) space — O(n log n) time — O(n) space (optimal)
    DP — dp[i] — LIS length — ending at i — O(n²) time — O(n) space
    patience sorting — binary search — tails array — indexed DP — O(n log n) time — O(n) space
    ]
    B9 --> C9[ Interval Scheduling — Greedy O(n log n) time — O(1) space (optimal) — DP O(n log n) time — O(n) space
    greedy — sort — end time — O(n log n) time — O(1) space (in-place sort)
    dp — sort — start time — binary search — O(n log n) time — O(n) space
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
    style C5 fill:#ffebee,stroke:#c62828
    style C6 fill:#e0f2f1,stroke:#00897b
    style C7 fill:#ede7f6,stroke:#7b1fa2
    style C8 fill:#e8eaf6,stroke:#3949ab
    style C9 fill:#fce4ec,stroke:#c2185b
```

**Diagrama tushuntirishi:** Dynamic Programming — 9 ta asosiy qism:
1. **DP — 2 xil usul:** Memoization (Top-down — recursive — subproblem — cache — O(n) time — O(n) space) — Tabulation (Bottom-up — iterative — subproblem — table — O(n) time — O(1) space if optimized).
2. **DP — 2 xil holat:** Overlapping subproblems (subproblemlar — takrorlanadi — cache — saqlash — qayta ishlatish) — Optimal substructure (subproblemlar — optimal yechim — global optimal yechim).
3. **DP — state + transition:** state — subproblem — qiymat — transition — subproblem — qiymat — o'zgarishi — formula.
4. **DP — time/space:** time — states * transition — O(states * transition) — space — cache/table — O(states) — optimized — O(1) space (if possible).
5. **Fibonacci — O(n) time — O(1) space:** naive recursion — O(2ⁿ) — worst (subproblems — takrorlanadi) — memoization — O(n) time — O(n) space (cache) — tabulation — O(n) time — O(n) space (table) — optimized — O(n) time — O(1) space (2 variables).
6. **0/1 Knapsack — O(n * W) time — O(W) space (optimized):** state — dp[i][w] — i — items — w — weight — transition — max(include, exclude) — dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]) — 2D table — O(n * W) time — O(n * W) space — 1D array — reverse iterate — O(n * W) time — O(W) space.
7. **LCS — O(n * m) time — O(min(n, m)) space (optimized):** state — dp[i][j] — S1[0..i-1] — S2[0..j-1] — transition — agar S1[i-1] === S2[j-1] — dp[i][j] = dp[i-1][j-1] + 1 — agar S1[i-1] !== S2[j-1] — dp[i][j] = max(dp[i-1][j], dp[i][j-1]) — 2D table — O(n * m) time — O(n * m) space — optimized — 1D array — reverse iterate — O(n * m) time — O(min(n, m)) space.
8. **LIS — O(n²) time — O(n) space — O(n log n) time — O(n) space (optimal):** DP — dp[i] — LIS length — ending at i — O(n²) time — O(n) space — patience sorting / binary search — tails array — indexed DP — O(n log n) time — O(n) space (optimal).
9. **Interval Scheduling — Greedy O(n log n) time — O(1) space (optimal) — DP O(n log n) time — O(n) space:** greedy — sort — end time — O(n log n) time — O(1) space (optimal) — DP — sort — start time — binary search — next non-overlapping — O(n log n) time — O(n) space.

## 🎙 Intervyu savollari va javoblari

### 1. DP nima? DP 2 xil usul — qaidi farqi?

**Javob:** DP (Dynamic Programming) — "muammoni yechish — pastki subproblemlar — saqlash — qayta ishlatish — topish". 2 xil usul:
- **Memoization (Top-down):** "recursive — subproblem — cache — saqlash — qayta ishlatish — agar cache — bor — return — yo'q — compute — cache — saqlash". "Recursive — top-down — subproblem — cache".
- **Tabulation (Bottom-up):** "iterative — subproblem — table — saqlash — from bottom — top — subproblem — table". "Iterative — bottom-up — subproblem — table".
Shunday qilib, 2 xil usul — memoization (top-down — recursive — cache) — tabulation (bottom-up — iterative — table).

### 2. DP — 2 xil holat — qaidi farqi?

**Javob:** DP — 2 xil holat:
- **Overlapping subproblems:** "bir xil subproblem — takrorlanadi — cache — saqlash — qayta ishlatish". Masalan: "fib(n) — fib(n-1) + fib(n-2) — fib(n-2) — ikki marta (fib(n) — fib(n-1) — fib(n-2); fib(n-1) — fib(n-2) — fib(n-3) — fib(n-2) — takrorlanadi)".
- **Optimal substructure:** "muammo — subproblemlar — optimal yechim — global optimal yechim". Masalan: "knapsack — subproblem — items — weight — optimal value — global optimal value".
Shunday qilib, 2 xil holat — overlapping subproblems (takrorlanadi) — optimal substructure (optimal yechim).

### 3. DP — state + transition — qaidi quriladi?

**Javob:** DP — "state" (holat) va "transition" (o'tish) — qanday quriladi:
- **state — subproblem — qiymat.** Masalan: "fib(n) — state = n — qiymat = fib(n)". "knapsack — state = (i, w) — i — items — w — weight — qiymat = max value".
- **transition — subproblem — qiymat — o'zgarishi — formula.** Masalan: "fib(n) — transition = fib(n-1) + fib(n-2)". "knapsack — transition = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])".
Shunday qilib, state — subproblem — qiymat — transition — qiymat — o'zgarishi — formula.

### 4. Fibonacci — DP — memoization vs tabulation — qanday?

**Javob:** Fibonacci — DP — memoization vs tabulation:
- **Naive recursion — O(2ⁿ) — worst:** "fib(n) = fib(n-1) + fib(n-2) — subproblems — takrorlanadi — O(2ⁿ) — worst".
- **Memoization (Top-down):** "recursive — subproblem — cache — saqlash — qayta ishlatish — O(n) time — O(n) space (cache)". Masalan: "fib(5) — cache = {} — fib(4) + fib(3) — fib(4) — cache = {5: ?, 4: ?} — fib(3) + fib(2) — ... — cache — subproblem — qiymat — O(n) time — O(n) space".
- **Tabulation (Bottom-up):** "iterative — bottom-up — subproblem — table — O(n) time — O(n) space (table)". "Optimized — O(n) time — O(1) space (2 variables — cache — O(1) space)". Masalan: "fib(5) — table = [0, 1] — i = 2 → 5 — fib[i] = fib[i-1] + fib[i-2] — O(n) time — O(1) space".
Shunday qilib, Fibonacci — memoization (O(n) time — O(n) space) — tabulation (O(n) time — O(n) space) — optimized (O(n) time — O(1) space).

### 5. 0/1 Knapsack — state + transition — qanday? Optimized — space?

**Javob:** 0/1 Knapsack — "state — dp[i][w] — i — items — w — weight — qiymat = max value — first i items — capacity w". "Transition — dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]) — agar w >= weight[i] (include — dp[i-1][w - weight[i]] + value[i]; exclude — dp[i-1][w])". "Base case — dp[0][w] = 0 (0 items — max value 0) — dp[i][0] = 0 (capacity 0 — max value 0)". "Time — O(n * W) — space — O(n * W) (2D table)". "Optimized — O(n * W) time — O(W) space (1D array — reverse iterate — avoid overwrite — previous row)". Shunday qilib, 0/1 Knapsack — state — dp[i][w] — transition — max(include, exclude) — optimized — O(W) space (1D array — reverse iterate).

### 6. LCS — state + transition — qanday? LCS string — backtrack — qanday?

**Javob:** LCS — "state — dp[i][j] — S1[0..i-1] — S2[0..j-1] — qiymat = LCS length". "Transition — agar S1[i-1] === S2[j-1] — dp[i][j] = dp[i-1][j-1] + 1 (char — match — LCS + 1); agar S1[i-1] !== S2[j-1] — dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (exclude — max of left/up)". "Base case — dp[0][j] = 0 (S1 empty — LCS 0) — dp[i][0] = 0 (S2 empty — LCS 0)". "Backtrack — LCS string — start — dp[n][m] — left/up — move — agar S1[i-1] === S2[j-1] — char — LCS — i-- — j--; agar dp[i-1][j] > dp[i][j-1] — i--; else — j--". "O(n * m) time — O(n * m) space (2D table) — optimized — O(min(n, m)) space (1D array — reverse iterate)". Shunday qilib, LCS — state — dp[i][j] — transition — max(match, exclude) — backtrack — LCS string.

### 7. LIS — DP (O(n²)) vs patience sorting / binary search (O(n log n)) — qaidi farqi?

**Javob:** LIS — 2 xil usul:
- **DP (O(n²) time — O(n) space):** "state — dp[i] — LIS length — ending at i". "Transition — dp[i] = 1 + max(dp[j]) — j < i — arr[j] < arr[i] (j — previous — arr[j] < arr[i] — increasing)". "Base case — dp[i] = 1 (element — 1 — minimum)". "O(n²) time — O(n) space (dp array — n)".
- **Patience sorting / binary search (O(n log n) time — O(n) space):** "tails array — smallest ending element — index — binary search — har bir element — binary search — tails — find position — replace/update — tails.length — LIS length". "O(n log n) time — O(n) space (tails array)".
Shunday qilib, LIS — DP (O(n²) time — O(n) space) — patience sorting / binary search (O(n log n) time — O(n) space) — optimal.

### 8. Interval Scheduling — Greedy (O(n log n) time — O(1) space) — optimal — qanday?

**Javob:** Interval Scheduling — "intervals — (start, end) — max non-overlapping intervals — select". "Greedy — optimal — sort — end time — ascending — O(n log n) time — O(1) space (in-place sort) — optimal". "Select — first interval — prev_end = intervals[0].end — count = 1". "Har bir interval — agar start >= prev_end — select — prev_end = current.end — count++". "Total — O(n log n) time — O(1) space — optimal". Shunday qilib, Interval Scheduling — greedy (O(n log n) time — O(1) space) — optimal — sort — end time — select — first — next — start >= prev end.

### 9. DP — space optimization — qanday? 1D array — reverse iterate — knapsack — LCS — optimized space?

**Javob:** DP — space optimization — "1D array — reverse iterate — avoid overwrite — previous row".
- **Knapsack — 1D array — reverse iterate:** "dp[cap] = max(dp[cap], dp[cap - weight[i]] + value[i]) — reverse iterate — cap = capacity → weight[i] — avoid overwrite — previous row (i-1)". "O(n * W) time — O(W) space (1D array)".
- **LCS — 1D array — reverse iterate:** "dp[j] — LCS length — S1[0..i-1] — S2[0..j-1] — reverse iterate — j = m → 1 — avoid overwrite — previous row (i-1)". "O(n * m) time — O(min(n, m)) space (1D array — min(n, m) — reverse iterate — avoid overwrite — previous row)".
Shunday qilib, DP — space optimization — "1D array — reverse iterate — avoid overwrite — previous row" — knapsack — LCS.

### 10. DP — memoization — cache — size — unlimited — memory leak — qanday oldini olish mumkin?

**Javob:** DP — memoization — cache — size — unlimited — memory leak — qanday oldini olish mumkin:
- **LRU cache (Least Recently Used):** "cache — size limit — LRU — remove — least recently used — cache — size limit". "Masalan: fib(n) — cache — size limit = 1000 — LRU cache — remove — least recently used — cache size — 1000 (limited)".
- **Tabulation (Bottom-up):** "iterative — bottom-up — subproblem — table — O(n) time — O(1) space (if optimized) — cache size — limited — O(1) space (optimized — Fibonacci — 2 variables — O(1) space)".
- **Cache — size — limited — memo — Map — size — check — remove — old entries.** Shunday qilib, memoization — cache — size — unlimited — memory leak — qanday oldini olish mumkin: LRU cache — size limit — yoki tabulation (O(1) space if optimized) — yoki cache — size — check — remove — old entries.

### 📌 Xulosa:

- **DP — 2 xil usul:** memoization (top-down — recursive — cache) — tabulation (bottom-up — iterative — table).
- **DP — 2 xil holat:** overlapping subproblems (subproblemlar — takrorlanadi — cache — saqlash — qayta ishlatish) — optimal substructure (subproblemlar — optimal yechim — global optimal yechim).
- **DP — state + transition:** state — subproblem — qiymat — transition — qiymat — o'zgarishi — formula.
- **DP — time/space:** time — states * transition — O(states * transition) — space — cache/table — O(states) — optimized — O(1) space (if possible).
- **Fibonacci — O(n) time — O(1) space:** naive recursion — O(2ⁿ) worst — memoization — O(n) time — O(n) space — tabulation — O(n) time — O(n) space — optimized — O(n) time — O(1) space.
- **0/1 Knapsack — O(n * W) time — O(W) space (optimized):** state — dp[i][w] — transition — max(include, exclude) — 2D table — O(n * W) time — O(n * W) space — optimized — 1D array — reverse iterate — O(n * W) time — O(W) space.
- **LCS — O(n * m) time — O(min(n, m)) space (optimized):** state — dp[i][j] — transition — max(match, exclude) — 2D table — O(n * m) time — O(n * m) space — optimized — 1D array — reverse iterate — O(n * m) time — O(min(n, m)) space — backtrack — LCS string.
- **LIS — O(n²) time — O(n) space — O(n log n) time — O(n) space (optimal):** DP — dp[i] — LIS length — ending at i — O(n²) time — O(n) space — patience sorting / binary search — tails array — indexed DP — O(n log n) time — O(n) space (optimal).
- **Interval Scheduling — Greedy O(n log n) time — O(1) space (optimal) — DP O(n log n) time — O(n) space:** greedy — sort — end time — O(n log n) time — O(1) space (in-place sort) — optimal — DP — sort — start time — binary search — next non-overlapping — O(n log n) time — O(n) space.

---

**Keyingi darslar (o'rta/advanced daraja):**
1. ✅ **Dynamic Programming (DP) — Fibonacci, Knapsack, LCS, LIS, Interval Scheduling (bu dars)**
2. **Backtracking — permutations, combinations, N-Queens, Sudoku**
3. **Advanced Data Structures — AVL, Red-Black Tree, B-Tree, Skip List, Suffix Tree**
4. **Komplekslik tahlili — Amortized analysis, Master Theorem, NP-completeness**
5. **Graf algoritmlari (Advanced) — Dijkstra, Bellman-Ford, Floyd-Warshall, MST (Kruskal, Prim), Maximum Flow (Ford-Fulkerson)**

Keyingi mavzu: **1 — Backtracking** yoki **2 — Advanced Data Structures** yoki **3 — Komplekslik tahlili** yoki **4 — Graf algoritmlari**. Raqam yoki nom.

Qaysi mavzu keyingi? Raqam (2, 3, 4, 5) yoki nom. Yozayman.
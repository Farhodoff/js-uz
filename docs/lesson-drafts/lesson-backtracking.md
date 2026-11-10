# 📚 Backtracking — Permutations, Combinations, N-Queens, Sudoku — O'rta/Advanced daraja

## 📦 Tushunchalarning sodda izohi

**Backtracking (Qayta qaytish)** — "muammoni yechish — recursive — har bir qadam — variantlar — yo'ldan chiqish — yo'q — qayta qaytish — keyingi variant". "Backtracking — "recursive — options — try — fail — backtrack — try — next".

- **Backtracking — 3 xil dalil:**
  1. **Recursive — har bir qadam — variantlar — try — fail — backtrack.** "Recursive — options — try — fail — backtrack — try — next". Masalan: "permutations — index — har bir element — swap — recursive — backtrack — swap back".
  2. **Pruning (Qisqartirish — early exit):** "recursive — early — fail — prune — options — reduce — recursion — depth — reduce". Masalan: "N-Queens — row — column — diagonal — check — fail — prune — next column — try". "Sudoku — cell — constraint — check — fail — prune — backtrack — next option".
  3. **Base case (Recursive — tugashi):** "recursive — tugashi — base case — solution — store — return — backtrack". Masalan: "permutations — index == n — solution — store — return". "N-Queens — row == n — solution — store — return". "Sudoku — cell == 81 — solution — store — return".

- **Backtracking — yagona holat (framework):** "recursive — options — try — fail — backtrack — try — next".
  - **Har bir qadam — options — try — fail — backtrack — try — next.**
  - **Recursive — depth — har bir qadam — options — try — fail — backtrack — try — next.**
  - **Base case — solution — store — return — backtrack.**

### 1. Permutations (Backtracking — O(n!) time — O(n) space)

- **Muammo:** "array — all unique permutations — generate". "Permutations — array — elements — all possible order".
- **Recursive — options — try — fail — backtrack:**
  - **Har bir index — element — swap — recursive — backtrack — swap back.**
  - **Index == n — solution — store — return.**
  - **O(n!) time — har bir permutation — try — n! — total — O(n!)**."
  - **O(n) space — recursive — depth — n — O(n) space (call stack)."**
- **Misol:** "arr = [1, 2, 3] — permutations — [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]] — 6 = 3!".
- **Misol — backtrack — swap:**
  - "index = 0 — element — swap — 0 ve 0 — recursive — backtrack — swap back."
  - "index = 1 — element — swap — 1 ve 1 — recursive — backtrack — swap back — swap — 1 ve 2 — recursive — backtrack — swap back — ..."
  - "index = 2 — solution — store — return — backtrack."

### 2. Combinations (Backtracking — O(2ⁿ) time — O(n) space)

- **Muammo:** "array — all combinations — subset — size k — generate". "Combinations — array — elements — subset — size k — all possible".
- **Recursive — options — try — fail — backtrack:**
  - **Har bir element — try — include — recursive — backtrack — exclude — recursive.**
  - **Include — element — current — size — k — recursive — backtrack — exclude — recursive.**
  - **Size == k — solution — store — return.**
  - **O(2ⁿ) time — har bir element — include/exclude — 2ⁿ — total — O(2ⁿ) — worst (size — k — subset — C(n,k) — O(2ⁿ) worst — n — k = n/2 — C(n, k) — O(2ⁿ))**."
  - **O(n) space — recursive — depth — n — O(n) space (call stack)."**
- **Misol:** "arr = [1, 2, 3], k = 2 — combinations — [[1,2], [1,3], [2,3]] — C(3,2) = 3".

### 3. N-Queens (Backtracking — O(n!) space — O(n) space — pruning)

- **Muammo:** "n x n — chessboard — n queens — place — no two queens — attack — each other (row, column, diagonal)". "Queen — attack — row, column, diagonal (slash — \ va backslash — )."
- **Recursive — options — try — fail — backtrack — pruning:**
  - **Har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column.**
  - **Check — attack:** "row — column — diagonal — check — fail — prune — backtrack."
    - **Row — check:** "har bir row — 1 queen — ensure — fail — prune."
    - **Column — check:** "har bir column — 1 queen — ensure — fail — prune."
    - **Diagonal — check:** "diagonal — 2 turi — slash (/) ve backslash (\) — check — fail — prune."
      - "Slash diagonal (/) — row + column = constant (har bir slash — row + column = constant)."
      - "Backslash diagonal (\) — row - column = constant (har bir backslash — row - column = constant)."
  - **Row == n — solution — store — return — backtrack.**
  - **O(n!) space — har bir queen — try — n! — total — O(n!)**."
  - **O(n) space — recursive — depth — n — O(n) space (call stack) — board — O(n²) space (n x n board) — sets — O(n) space (columns, diagonals)."**
- **Misol:** "n = 4 — N-Queens — solutions — [[0,2,1,3], [1,3,0,2]] — 2 solutions".

### 4. Sudoku (Backtracking — O(9^m) space — O(n²) space — pruning — constraint satisfaction)

- **Muammo:** "9 x 9 — Sudoku board — cells — 1-9 — fill — no two cells — same row, same column, same 3x3 box — constraint satisfaction".
- **Recursive — options — try — fail — backtrack — pruning:**
  - **Har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number.**
  - **Check — constraint:** "row — column — box — check — fail — prune — backtrack."
    - **Row — check:** "har bir row — numbers 1-9 — unique — ensure — fail — prune."
    - **Column — check:** "har bir column — numbers 1-9 — unique — ensure — fail — prune."
    - **3x3 box — check:** "3x3 box — numbers 1-9 — unique — ensure — fail — prune."
      - "Box — top-left corner — (row - row % 3, column - column % 3) — 3x3 — check — fail — prune."
  - **Cell == 81 — solution — store — return — backtrack.**
  - **O(9^m) space — m — empty cells — har bir cell — 9 options — 9^m — total — O(9^m) — worst — m = 81 — 9^81 — impossible — pruning — reduce — O(9^m) worst — m — empty cells."**
  - **O(n²) space — recursive — depth — 81 — O(81) space (call stack) — board — O(81) space (9 x 9 board)."**
- **Misol:** "Sudoku — board — empty cells — m — 9x9 — 9^81 — O(9^81) worst — pruning — reduce — O(9^m) worst — m — empty cells".

### 5. Backtracking — pruning techniques (Qisqartirish — early exit)

- **Pruning — "options — reduce — recursion — depth — reduce — early exit".**
- **Har bir recursive — options — try — fail — check — fail — prune — options — reduce — recursion — depth — reduce — early exit.**
- **Har bir recursive — pruning — reduce — time — complexity — reduce — O(2ⁿ) — O(n!) — reduce — pruning."**
- **Misal — N-Queens — pruning — check — attack — fail — prune — options — reduce — recursion — depth — reduce — early exit.** "O(n!) worst — pruning — m — empty cells — O(n^m) worst — m — empty cells — pruning — reduce — O(n^m) worst."**
- **Misal — Sudoku — pruning — constraint — check — fail — prune — options — reduce — recursion — depth — reduce — early exit.** "O(9^m) worst — pruning — m — empty cells — O(9^m) worst — m — empty cells — pruning — reduce — O(9^m) worst."**

### 6. Backtracking — general framework (Framework)

- **Har bir recursive — options — try — fail — backtrack — try — next.**
- **Recursive — depth — har bir qadam — options — try — fail — backtrack — try — next.**
- **Base case — solution — store — return — backtrack.**
- **General backtracking framework:**
  ```
  function backtrack(options, current) {
    if (current.length === k) { // base case — solution
      results.push([...current]);
      return;
    }
    for (const option of options) { // har bir option — try — fail — backtrack
      current.push(option); // try
      backtrack(options, current); // recursive — options — try — fail — backtrack
      current.pop(); // backtrack — remove — try — next option
    }
  }
  ```
- **Misal — permutations — swap — backtrack:**
  ```
  function backtrack(index) {
    if (index === n) { // base case — solution
      results.push([...nums]);
      return;
    }
    for (let i = index; i < n; i++) { // har bir element — swap — try — fail — backtrack
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap — try
      backtrack(index + 1); // recursive — backtrack
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap back — backtrack
    }
  }
  ```
- **Misal — combinations — include/exclude — backtrack:**
  ```
  function backtrack(start, current) {
    if (current.length === k) { // base case — solution
      results.push([...current]);
      return;
    }
    for (let i = start; i < n; i++) { // har bir element — include — try — fail — backtrack
      current.push(nums[i]); // include — try
      backtrack(i + 1, current); // recursive — backtrack
      current.pop(); // backtrack — remove — try — next option
    }
  }
  ```
- **Misal — N-Queens — pruning — check — attack — fail — prune — backtrack:**
  ```
  function backtrack(row, cols, diag1, diag2, board) {
    if (row === n) { // base case — solution
      results.push(board.map(r => r.map(c => c === 1 ? 'Q' : '.').join('')));
      return;
    }
    for (let col = 0; col < n; col++) { // har bir column — try — queen — check — attack — fail — prune — backtrack
      if (cols.has(col) || diag1.has(row + col) || diag2.has(row - col)) continue; // check — attack — fail — prune
      cols.add(col); diag1.add(row + col); diag2.add(row - col); // try — place queen
      board[row][col] = 1;
      backtrack(row + 1, cols, diag1, diag2, board); // recursive — backtrack
      board[row][col] = 0; // backtrack — remove queen
      cols.delete(col); diag1.delete(row + col); diag2.delete(row - col);
    }
  }
  ```

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Permutations — backtracking — O(n!) time — O(n) space
function permutations(nums) {
  const results = [];
  const n = nums.length;
  function backtrack(index) {
    if (index === n) { // base case — solution
      results.push([...nums]);
      return;
    }
    for (let i = index; i < n; i++) { // har bir element — swap — try — fail — backtrack
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap — try
      backtrack(index + 1); // recursive — backtrack
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap back — backtrack
    }
  }
  backtrack(0);
  return results;
} // O(n!) — time (n! permutations — n! total), O(n) — space (recursive — depth — n — call stack)
console.log(permutations([1, 2, 3]));
// [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]] — 6 = 3!

// 2. Permutations — alternative (swap — backtrack)
function permutationsAlt(nums) {
  const results = [];
  function backtrack(current, options) {
    if (options.length === 0) { // base case — solution
      results.push([...current]);
      return;
    }
    for (let i = 0; i < options.length; i++) { // har bir option — try — fail — backtrack
      current.push(options[i]); // try — include
      const remaining = options.filter((_, idx) => idx !== i); // options — filter — options remove
      backtrack([...current], remaining); // recursive — backtrack
      current.pop(); // backtrack — remove
    }
  }
  backtrack([], nums);
  return results;
} // O(n!) — time (n! permutations), O(n) — space (recursive — depth — n — call stack) — O(n) — space (current array)

// 3. Combinations — backtracking — O(2ⁿ) time — O(n) space
function combinations(nums, k) {
  const results = [];
  const n = nums.length;
  function backtrack(start, current) {
    if (current.length === k) { // base case — solution
      results.push([...current]);
      return;
    }
    for (let i = start; i < n; i++) { // har bir element — include — try — fail — backtrack
      current.push(nums[i]); // include — try
      backtrack(i + 1, current); // recursive — backtrack
      current.pop(); // backtrack — remove — try — next option
    }
  }
  backtrack(0, []);
  return results;
} // O(2ⁿ) — time (C(n,k) — O(2ⁿ) worst — n — k = n/2 — C(n,k) — O(2ⁿ)), O(n) — space (recursive — depth — n — call stack)
console.log(combinations([1, 2, 3], 2));
// [[1,2], [1,3], [2,3]] — C(3,2) = 3

// 4. Combinations — all subsets (power set) — backtracking — O(2ⁿ) time — O(n) space
function allSubsets(nums) {
  const results = [];
  const n = nums.length;
  function backtrack(start, current) {
    results.push([...current]); // solution — store — current subset
    for (let i = start; i < n; i++) { // har bir element — include — try — fail — backtrack
      current.push(nums[i]); // include — try
      backtrack(i + 1, current); // recursive — backtrack
      current.pop(); // backtrack — remove — try — next option
    }
  }
  backtrack(0, []);
  return results;
} // O(2ⁿ) — time (2ⁿ subsets — total), O(n) — space (recursive — depth — n — call stack)
console.log(allSubsets([1, 2, 3]));
// [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]] — 2³ = 8 subsets

// 5. N-Queens — backtracking — O(n!) time — O(n) space (pruning)
function nQueens(n) {
  const results = [];
  const cols = new Set();
  const diag1 = new Set(); // row + col — slash diagonal (/)
  const diag2 = new Set(); // row - col — backslash diagonal (\)
  const board = Array.from({ length: n }, () => Array(n).fill(0));
  function backtrack(row) {
    if (row === n) { // base case — solution
      results.push(board.map(r => r.map(c => c === 1 ? 'Q' : '.').join('')));
      return;
    }
    for (let col = 0; col < n; col++) { // har bir column — try — queen — check — attack — fail — prune — backtrack
      if (cols.has(col) || diag1.has(row + col) || diag2.has(row - col)) continue; // check — attack — fail — prune
      cols.add(col); diag1.add(row + col); diag2.add(row - col); // try — place queen
      board[row][col] = 1;
      backtrack(row + 1); // recursive — backtrack
      board[row][col] = 0; // backtrack — remove queen
      cols.delete(col); diag1.delete(row + col); diag2.delete(row - col);
    }
  }
  backtrack(0);
  return results;
} // O(n!) — time (n! worst — pruning — reduce — O(n^m) worst — m — empty cols — but pruning — reduce — O(n!) average), O(n) — space (recursive — depth — n — call stack) — O(n²) — space (board — n x n) — O(n) — space (sets — cols, diag1, diag2)
console.log(nQueens(4));
// [".Q..", "...Q", "Q...", "..Q."] — [ "Q...", "..Q.", ".Q..", "...Q"] — 2 solutions

// 6. N-Queens — count (count only — not store board) — O(n!) time — O(n) space (pruning)
function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  function backtrack(row) {
    if (row === n) { // base case — solution — count++
      count++;
      return;
    }
    for (let col = 0; col < n; col++) { // har bir column — try — queen — check — attack — fail — prune — backtrack
      if (cols.has(col) || diag1.has(row + col) || diag2.has(row - col)) continue; // check — attack — fail — prune
      cols.add(col); diag1.add(row + col); diag2.add(row - col); // try — place queen
      backtrack(row + 1); // recursive — backtrack
      cols.delete(col); diag1.delete(row + col); diag2.delete(row - col); // backtrack — remove queen
    }
  }
  backtrack(0);
  return count;
} // O(n!) — time (n! worst — pruning — reduce — O(n^m) worst — m — empty cols — but pruning — reduce — O(n!) average), O(n) — space (recursive — depth — n — call stack) — O(n) — space (sets — cols, diag1, diag2)
console.log(totalNQueens(4)); // 2 — 2 solutions

// 7. Sudoku — backtracking — O(9^m) time — O(n²) space (n=9)
function solveSudoku(board) {
  // board — 9x9 — 0 — empty cell
  const n = 9;
  function isValid(row, col, num) {
    // check row — column — box — constraint
    for (let i = 0; i < n; i++) {
      if (board[row][i] === num) return false; // row — check
      if (board[i][col] === num) return false; // column — check
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false; // box — check
    }
    return true;
  }
  function backtrack(cell = 0) {
    if (cell === n * n) return true; // base case — solution — board filled
    const row = Math.floor(cell / n);
    const col = cell % n;
    if (board[row][col] !== 0) return backtrack(cell + 1); // cell — filled — skip
    for (let num = 1; num <= 9; num++) { // har bir number — try — place — check — constraint — fail — prune — backtrack
      if (isValid(row, col, num)) { // check — constraint — valid — try
        board[row][col] = num; // place — try
        if (backtrack(cell + 1)) return true; // recursive — backtrack — solution — return true
        board[row][col] = 0; // backtrack — remove (reset to empty)
      }
    }
    return false; // all numbers tried — fail — backtrack
  }
  backtrack(0);
  return board; // solution — board filled
} // O(9^m) — time (m — empty cells — har bir cell — 9 options — 9^m — total — worst — m=81 — 9^81 — impossible — pruning — reduce — O(9^m) worst — m — empty cells), O(n²) — space (recursive — depth — 81 — call stack — O(81) space) — O(81) — space (board — 9x9)
const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
console.log(solveSudoku(board));
// [[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]] — solved

// 8. Sudoku — optimized — maintain — row/col/box sets — O(9^m) worst — O(9^m) time — O(n²) space (n=9)
function solveSudokuOptimized(board) {
  const n = 9;
  const rows = Array.from({ length: n }, () => new Set());
  const cols = Array.from({ length: n }, () => new Set());
  const boxes = Array.from({ length: n }, () => new Set());
  // initialize sets — known values
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const val = board[i][j];
      if (val !== 0) {
        rows[i].add(val);
        cols[j].add(val);
        boxes[3 * Math.floor(i / 3) + Math.floor(j / 3)].add(val);
      }
    }
  }
  function isValid(row, col, num) {
    return !rows[row].has(num) && !cols[col].has(num) && !boxes[3 * Math.floor(row / 3) + Math.floor(col / 3)].has(num);
  }
  function backtrack(cell = 0) {
    if (cell === n * n) return true; // base case — solution
    const row = Math.floor(cell / n);
    const col = cell % n;
    if (board[row][col] !== 0) return backtrack(cell + 1); // filled — skip
    for (let num = 1; num <= 9; num++) {
      if (isValid(row, col, num)) { // check — constraint — valid — try
        board[row][col] = num;
        rows[row].add(num); cols[col].add(num);
        boxes[3 * Math.floor(row / 3) + Math.floor(col / 3)].add(num); // maintain sets
        if (backtrack(cell + 1)) return true; // recursive — backtrack — solution
        board[row][col] = 0;
        rows[row].delete(num); cols[col].delete(num);
        boxes[3 * Math.floor(row / 3) + Math.floor(col / 3)].delete(num); // backtrack — remove from sets
      }
    }
    return false;
  }
  backtrack(0);
  return board;
} // O(9^m) — time (m — empty cells — same O(9^m) — worst — but optimized — check — O(1) — instead of O(n) — O(9) — check — O(1) per check — O(9^m) time — worst — pruning — reduce — O(9^m) worst — m — empty cells), O(n²) — space (recursive — depth — 81 — call stack — O(81) space) — O(81) — space (row/col/box sets — 3*9 = 27 sets — O(27) space)

// 9. Palindrome Partitioning — backtracking — O(2ⁿ) time — O(n) space
function partition(s) {
  const results = [];
  const n = s.length;
  function isPalindrome(l, r) {
    while (l < r) if (s[l++] !== s[r--]) return false;
    return true;
  }
  function backtrack(start, current) {
    if (start === n) { // base case — solution — partition complete
      results.push([...current]);
      return;
    }
    for (let end = start; end < n; end++) { // har bir end — try — substring — check — palindrome — fail — prune — backtrack
      if (isPalindrome(start, end)) { // check — palindrome — valid — try
        current.push(s.slice(start, end + 1)); // try — include substring
        backtrack(end + 1, current); // recursive — backtrack
        current.pop(); // backtrack — remove substring
      }
    }
  }
  backtrack(0, []);
  return results;
} // O(2ⁿ) — time (n — substrings — O(n) per check — O(2ⁿ) total — worst — pruning — reduce — O(2ⁿ) worst), O(n) — space (recursive — depth — n — call stack) — O(n) — space (current array)
console.log(partition("aab"));
// [["a","a","b"], ["aa","b"]] — 2 partitions

// 10. Combination Sum — backtracking — O(n^target) time — O(target) space
function combinationSum(candidates, target) {
  const results = [];
  candidates.sort((a, b) => a - b); // sort — pruning — early stop — if (sum + candidate > target) — prune
  function backtrack(start, current, sum) {
    if (sum === target) { // base case — solution
      results.push([...current]);
      return;
    }
    for (let i = start; i < candidates.length; i++) { // har bir candidate — try — include — check — sum — fail — prune — backtrack
      if (sum + candidates[i] > target) break; // pruning — early stop — sum + candidate > target — fail — prune — next candidates — sum > target — prune
      current.push(candidates[i]); // try — include
      backtrack(i, current, sum + candidates[i]); // recursive — backtrack — i — same start (allow re-use) — yoki i + 1 — no re-use
      current.pop(); // backtrack — remove
    }
  }
  backtrack(0, [], 0);
  return results;
} // O(n^target) — time (n — candidates — target — combination — O(n^target) worst — pruning — reduce — O(n^target) worst), O(target) — space (recursive — depth — target — call stack) — O(target) — space (current array)
console.log(combinationSum([2, 3, 6, 7], 7));
// [[2,2,3], [7]] — 2 combinations
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Permutations — backtrack — fail — backtrack — swap back — missing
function permutationsWrong(nums) {
  const results = [];
  function backtrack(index) {
    if (index === nums.length) { results.push([...nums]); return; }
    for (let i = index; i < nums.length; i++) {
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap — try — FAIL — backtrack — swap back — missing
      backtrack(index + 1);
      // [nums[index], nums[i]] = [nums[i], nums[index]]; // swap back — missing — BUG — permutations — wrong
    }
  }
  backtrack(0);
  return results;
}
// BUG — swap back — missing — permutations — wrong — duplicates — missing — all permutations — wrong

// XATO 2: Combinations — backtrack — prune — missing — instead — all elements — 2ⁿ — no pruning
function combinationsNoPrune(nums, k) {
  const results = [];
  function backtrack(start, current) {
    if (current.length === k) { results.push([...current]); return; }
    // pruning — missing — for (let i = start; i < nums.length; i++) — instead — for (let i = start; i <= nums.length - (k - current.length); i++) — pruning — reduce — if (current.length + (nums.length - i) < k) continue;
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return results;
}
// without pruning — 2ⁿ — all subsets — instead of C(n,k) — pruning — reduce —C(n,k) — reduce — 2ⁿ — yomon

// XATO 3: N-Queens — check — attack — fail — prune — missing — instead — all columns — n! — no pruning
function nQueensNoPrune(n) {
  const results = [];
  const board = Array.from({ length: n }, () => Array(n).fill(0));
  function backtrack(row, cols, board) {
    if (row === n) { results.push(board.map(r => r.map(c => c ? 'Q' : '.').join(''))); return; }
    for (let col = 0; col < n; col++) {
      // check — attack — fail — prune — missing — instead — all columns — n! — no pruning
      // if (attack(row, col, board)) continue; // pruning — missing
      board[row][col] = 1; // try — place queen — no pruning — all columns — n! — yomon
      backtrack(row + 1, board);
      board[row][col] = 0; // backtrack — remove queen
    }
  }
  backtrack(0, board);
  return results;
}
// pruning — missing — all columns — n! — yomon — instead — pruning — check — attack — fail — prune — reduce — n! — pruning

// XATO 4: Sudoku — check — constraint — fail — prune — missing — instead — all numbers — 9^m — no pruning
function solveSudokuNoPrune(board) {
  const n = 9;
  function backtrack(cell) {
    if (cell === n * n) return true;
    const row = Math.floor(cell / n);
    const col = cell % n;
    if (board[row][col] !== 0) return backtrack(cell + 1);
    for (let num = 1; num <= 9; num++) {
      // check — constraint — fail — prune — missing — instead — all numbers — 9^m — no pruning
      // if (!isValid(row, col, num)) continue; // pruning — missing
      board[row][col] = num; // try — place number — no pruning — all numbers — 9^m — yomon
      if (backtrack(cell + 1)) return true;
      board[row][col] = 0;
    }
    return false;
  }
  backtrack(0);
  return board;
}
// pruning — missing — all numbers — 9^m — yomon — instead — pruning — check — constraint — fail — prune — reduce — 9^m — pruning

// XATO 5: Backtracking — base case — missing — infinite recursion
function backtrackNoBase() {
  // base case — missing — infinite recursion — call stack overflow
  // function backtrack() { backtrack(); } // infinite — crash
  // Yaxshi: base case — solution — store — return — backtrack
}
// base case — missing — infinite recursion — crash — call stack overflow

// XATO 6: Backtracking — state — shared — backtrack — missing — instead — shared state — backtrack — remove — missing
function sharedStateMissing() {
  const results = [];
  const current = []; // shared state — missing — backtrack — remove — missing
  function backtrack() {
    if (current.length === 3) { results.push([...current]); return; }
    current.push(1); // try — include — missing — backtrack — remove — missing
    backtrack();
    // current.pop(); // backtrack — remove — missing — BUG — shared state — wrong — duplicates
  }
  backtrack();
  return results;
}
// shared state — missing — backtrack — remove — missing — BUG — shared state — wrong — duplicates

// XATO 7: Backtracking — duplicate elements — pruning — missing — instead — duplicate — try — fail — backtrack — duplicates — results
function permutationsWithDuplicates(nums) {
  const results = [];
  const n = nums.length;
  nums.sort((a, b) => a - b); // sort — pruning — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue;
  function backtrack(index) {
    if (index === n) { results.push([...nums]); return; }
    for (let i = index; i < n; i++) {
      if (i > index && nums[i] === nums[i - 1]) continue; // pruning — duplicate elements — skip — duplicate
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap — try
      backtrack(index + 1); // recursive — backtrack
      [nums[index], nums[i]] = [nums[i], nums[index]]; // swap back — backtrack
    }
  }
  backtrack(0);
  return results;
} // O(n!) — time (n! permutations) — O(n) — space (recursive — depth — n — call stack) — pruning — duplicate elements — skip — duplicate — reduce — time — duplicates — results — reduce — duplicates — results — duplicates — results — reduce — duplicates — results — reduce

// XATO 8: Backtracking — return — recursive — missing — instead — return — recursive — result — missing
function backtrackNoReturn() {
  // function backtrack() { backtrack(); } // missing — return — recursive — result — missing — infinite — crash
  // Yaxshi: return — recursive — result — true/false — return — recursive — result — true/false — return — solution — found — return — true — missing — return — recursive — result — false — return — false
}
// missing — return — recursive — result — missing — infinite — crash — missing — return — recursive — result — true/false — return — solution — found — return — true — missing — return — recursive — result — false — return — false

// XATO 9: Backtracking — path — shared — backtrack — missing — instead — shared path — backtrack — remove — missing
function pathMissing() {
  const results = [];
  const path = []; // shared path — missing — backtrack — remove — missing
  function backtrack(start) {
    if (start === nums.length) { results.push([...path]); return; }
    path.push(nums[start]); // try — include — missing — backtrack — remove — missing
    backtrack(start + 1);
    // path.pop(); // backtrack — remove — missing — BUG — shared path — wrong — duplicates
  }
  backtrack(0);
  return results;
}
// shared path — missing — backtrack — remove — missing — BUG — shared path — wrong — duplicates

// XATO 10: Backtracking — options — order — missing — instead — options — order — missing — missing — options — order — missing — duplicates — results
function combinationsNoOrder(nums, k) {
  const results = [];
  // options — order — missing — instead — options — order — missing — missing — options — order — missing — duplicates — results
  // Yaxshi: options — order — fixed — start — i — options — order — fixed — duplicates — results — reduce
  function backtrack(start, current) {
    if (current.length === k) { results.push([...current]); return; }
    for (let i = start; i < nums.length; i++) { // start — i — options — order — fixed — duplicates — results — reduce
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return results;
}
// options — order — fixed — start — i — options — order — fixed — duplicates — results — reduce — duplicates — results — reduce — duplicates — results — reduce — duplicates — results — reduce
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Backtracking — framework:** "recursive — options — try — fail — backtrack — try — next". "Base case — solution — store — return — backtrack". "Pruning — options — reduce — recursion — depth — reduce — early exit". "O(n!) — O(2ⁿ) — time — O(n) — space (recursive — depth — n — call stack)".
- **Permutations — backtrack — swap — backtrack — swap back:** "index — element — swap — recursive — backtrack — swap back". "O(n!) time — O(n) space (recursive — depth — n — call stack)". "Pruning — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue".
- **Combinations — backtrack — include/exclude — backtrack:** "Har bir element — try — include — recursive — backtrack — exclude — recursive". "Size == k — solution — store — return". "O(2ⁿ) time — O(n) space (recursive — depth — n — call stack)". "Pruning — reduce — if (current.length + (nums.length - i) < k) continue".
- **N-Queens — backtrack — prune — check — attack — fail — prune — backtrack:** "Har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column". "Check — attack: row — column — diagonal (slash — \ va backslash — ) — check — fail — prune". "Slash diagonal (/) — row + col = constant — backslash diagonal (\) — row - col = constant". "O(n!) time — O(n) space (sets — cols, diag1, diag2 — O(n) space) — O(n²) space (board — n x n)".
- **Sudoku — backtrack — prune — check — constraint — fail — prune — backtrack:** "Har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number". "Check — constraint: row — column — box — check — fail — prune". "Box — top-left corner — (row - row % 3, col - col % 3) — 3x3 — check — fail — prune". "O(9^m) time — O(n²) space (board — 9x9) — optimized — check — O(1) — instead of O(n) — O(9) — check — O(1) per check — O(9^m) time — worst — pruning — reduce — O(9^m) worst — m — empty cells".
- **Palindrome Partitioning — backtrack — check — palindrome — fail — prune — backtrack:** "Har bir end — try — substring — check — palindrome — fail — prune — backtrack — try — next end". "O(2ⁿ) time — O(n) space (recursive — depth — n — call stack)".
- **Combination Sum — backtrack — prune — check — sum — fail — prune — backtrack:** "Har bir candidate — try — include — check — sum — fail — prune — backtrack — try — next candidate". "O(n^target) time — O(target) space (recursive — depth — target — call stack)".
- **Backtracking — pruning — reduce — time — complexity — reduce — O(2ⁿ) — O(n!) — reduce — pruning.**
- **Backtracking — base case — missing — infinite recursion — crash — call stack overflow.**
- **Backtracking — state — shared — backtrack — remove — missing — BUG — shared state — wrong — duplicates.**
- **Backtracking — return — recursive — result — missing — infinite — crash — missing — return — recursive — result — true/false — return — solution — found — return — true — missing — return — recursive — result — false — return — false.**
- **Backtracking — path — shared — backtrack — remove — missing — BUG — shared path — wrong — duplicates.**
- **Backtracking — options — order — fixed — start — i — options — order — fixed — duplicates — results — reduce — duplicates — results — reduce.**
- **Backtracking — duplicate elements — pruning — skip — duplicate — reduce — time — duplicates — results — reduce.**

### ❌ Noto'g'ri:

- **Backtracking — backtrack — swap back — missing — permutations — wrong — duplicates — missing — all permutations — wrong.**
- **Combinations — prune — missing — instead — all elements — 2ⁿ — no pruning — yomon — C(n,k) — pruning — reduce — 2ⁿ — yomon.**
- **N-Queens — check — attack — fail — prune — missing — instead — all columns — n! — no pruning — yomon — pruning — check — attack — fail — prune — reduce — n! — pruning.**
- **Sudoku — check — constraint — fail — prune — missing — instead — all numbers — 9^m — no pruning — yomon — pruning — check — constraint — fail — prune — reduce — 9^m — pruning.**
- **Backtracking — base case — missing — infinite recursion — crash — call stack overflow.**
- **Backtracking — state — shared — backtrack — remove — missing — BUG — shared state — wrong — duplicates.**
- **Backtracking — return — recursive — result — missing — infinite — crash — missing — return — recursive — result — true/false — return — solution — found — return — true — missing — return — recursive — result — false — return — false.**
- **Backtracking — path — shared — backtrack — remove — missing — BUG — shared path — wrong — duplicates.**
- **Backtracking — options — order — missing — instead — options — order — missing — missing — options — order — missing — duplicates — results.**
- **Backtracking — duplicate elements — pruning — missing — instead — duplicate — try — fail — backtrack — duplicates — results.**
- **Backtracking — pruning — reduce — time — complexity — reduce — missing — O(2ⁿ) — O(n!) — reduce — pruning.**

## 🎩 Hayotiy o'xshatishlar

- **Permutations — "qog'oz — tartib — barcha variantlar" — "har bir element — swap — barcha tartiblar — generate". Masalan: "Kartalar — tartib — barcha variantlar — generate — permutations".**
- **Combinations — "guruh — barcha hamkorlar" — "har bir element — include — group — size k — all possible". Masalan: "Komanda — barcha hamkorlar — group — size k — all possible — combinations".**
- **N-Queens — "shapol — queen — barcha joylar — no two queens — attack — each other" — "har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column". Masalan: "Shamol — queen — barcha joylar — no two queens — attack — each other — N-Queens — solve".**
- **Sudoku — "to'ldirish — numbers 1-9 — no two cells — same row, same column, same 3x3 box" — "har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number". Masalan: "Sudoku — to'ldirish — numbers 1-9 — no two cells — same row, same column, same 3x3 box — solve — backtracking".**
- **Palindrome Partitioning — "qism — palindrome — all partitions" — "har bir end — try — substring — check — palindrome — fail — prune — backtrack — try — next end". Masalan: "So'z — qism — palindrome — all partitions — generate — palindrome partitioning".**
- **Combination Sum — "sum — target — combinations — candidates" — "har bir candidate — try — include — check — sum — fail — prune — backtrack — try — next candidate". Masalan: "Pul — candidates — target — sum — combinations — generate — combination sum".**

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Backtracking — Permutations, Combinations, N-Queens, Sudoku, Palindrome Partitioning, Combination Sum ] --> B1[ Permutations — backtrack — swap — backtrack — swap back
    index — element — swap — recursive — backtrack — swap back
    base case — index === n — solution — store — return — backtrack
    O(n!) — time — O(n) — space (recursive — depth — n — call stack)
    pruning — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue
    ]
    A --> B2[ Combinations — backtrack — include/exclude — backtrack
    har bir element — include — recursive — backtrack — exclude — recursive
    base case — size === k — solution — store — return
    O(2ⁿ) — time — O(n) — space (recursive — depth — n — call stack)
    pruning — reduce — if (current.length + (nums.length - i) < k) continue
    — C(n,k) — O(2ⁿ) worst — n — k = n/2 — C(n,k) — O(2ⁿ)
    ]
    A --> B3[ N-Queens — backtrack — prune — check — attack — fail — prune — backtrack
    har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column
    check — attack: row — column — diagonal (slash — \ va backslash — ) — check — fail — prune
    slash diagonal (/) — row + col = constant — backslash diagonal (\) — row - col = constant
    base case — row === n — solution — store — return — backtrack
    O(n!) — time — O(n) — space (sets — cols, diag1, diag2 — O(n) space) — O(n²) — space (board — n x n)
    pruning — reduce — time — O(n!) worst — pruning — reduce — O(n^m) worst — m — empty cols — but pruning — reduce — O(n!) average
    ]
    A --> B4[ Sudoku — backtrack — prune — check — constraint — fail — prune — backtrack
    har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number
    check — constraint: row — column — box — check — fail — prune
    box — top-left corner — (row - row % 3, col - col % 3) — 3x3 — check — fail — prune
    base case — cell === 81 — solution — store — return — backtrack
    O(9^m) — time (m — empty cells — 9^m — worst — pruning — reduce — O(9^m) worst — m — empty cells) — O(n²) — space (n=9 — board — 9x9) — O(1) — space (check — O(1) per check — optimized — maintain — row/col/box sets — O(1) check — O(9^m) time — worst — pruning — reduce — O(9^m) worst)
    ]
    A --> B5[ Palindrome Partitioning — backtrack — check — palindrome — fail — prune — backtrack
    har bir end — try — substring — check — palindrome — fail — prune — backtrack — try — next end
    check — palindrome: s[l] === s[r] — l++, r--
    base case — start === n — solution — store — return — backtrack
    O(2ⁿ) — time — O(n) — space (recursive — depth — n — call stack)
    pruning — reduce — time — check — palindrome — O(n) per check — O(2ⁿ) total — worst — pruning — reduce — O(2ⁿ) worst
    ]
    A --> B6[ Combination Sum — backtrack — prune — check — sum — fail — prune — backtrack
    har bir candidate — try — include — check — sum — fail — prune — backtrack — try — next candidate
    check — sum: sum + candidate > target — fail — prune — early stop — if (sum + candidate > target) break
    base case — sum === target — solution — store — return — backtrack
    O(n^target) — time — O(target) — space (recursive — depth — target — call stack)
    pruning — reduce — time — sum + candidate > target — fail — prune — early stop — O(n^target) worst — pruning — reduce — O(n^target) worst
    ]
    
    B1 --> C1[ Permutations — swap — backtrack — swap back — O(n!) time — O(n) space
    swap — try — recursive — backtrack — swap back — correct
    pruning — duplicate elements — skip — duplicate — reduce — time — duplicates — results — reduce
    ]
    B2 --> C2[ Combinations — include/exclude — backtrack — O(2ⁿ) time — O(n) space
    include — recursive — backtrack — exclude — recursive — correct
    pruning — reduce — if (current.length + (nums.length - i) < k) continue — reduce — time — C(n,k) — O(2ⁿ) worst — n — k = n/2 — C(n,k) — O(2ⁿ) worst — pruning — reduce
    ]
    B3 --> C3[ N-Queens — prune — check — attack — fail — prune — backtrack — O(n!) time — O(n) space
    prune — check — attack — fail — prune — reduce — time — O(n!) average — O(n^m) worst — m — empty cols — pruning — reduce — O(n!) average
    sets — cols, diag1, diag2 — O(n) space — O(n²) space — board — n x n
    ]
    B4 --> C4[ Sudoku — prune — check — constraint — fail — prune — backtrack — O(9^m) time — O(n²) space (n=9)
    prune — check — constraint — fail — prune — reduce — time — O(9^m) worst — m — empty cells — pruning — reduce — O(9^m) worst
    optimized — maintain — row/col/box sets — O(1) check — O(9^m) time — worst — pruning — reduce — O(9^m) worst
    ]
    B5 --> C5[ Palindrome Partitioning — check — palindrome — fail — prune — backtrack — O(2ⁿ) time — O(n) space
    check — palindrome — O(n) per check — O(2ⁿ) total — worst — pruning — reduce — O(2ⁿ) worst
    ]
    B6 --> C6[ Combination Sum — prune — check — sum — fail — prune — backtrack — O(n^target) time — O(target) space
    prune — check — sum — fail — prune — reduce — time — O(n^target) worst — pruning — reduce — O(n^target) worst
    ]
    
    style B1 fill:#e3f2fd,stroke:#1976d2
    style B2 fill:#e8f5e9,stroke:#2e7d32
    style B3 fill:#fff3e0,stroke:#e65100
    style B4 fill:#f3e5f5,stroke:#7b1fa2
    style B5 fill:#ffebee,stroke:#c62828
    style B6 fill:#e0f2f1,stroke:#00897b
    style C1 fill:#e3f2fd,stroke:#1976d2
    style C2 fill:#e8f5e9,stroke:#2e7d32
    style C3 fill:#fff3e0,stroke:#e65100
    style C4 fill:#f3e5f5,stroke:#7b1fa2
    style C5 fill:#ffebee,stroke:#c62828
    style C6 fill:#e0f2f1,stroke:#00897b
```

**Diagrama tushuntirishi:** Backtracking — 6 ta asosiy qism:
1. **Permutations — backtrack — swap — backtrack — swap back:** index — element — swap — recursive — backtrack — swap back — base case — index === n — solution — store — return — backtrack — O(n!) time — O(n) space (recursive — depth — n — call stack) — pruning — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue.
2. **Combinations — backtrack — include/exclude — backtrack:** har bir element — include — recursive — backtrack — exclude — recursive — base case — size === k — solution — store — return — O(2ⁿ) time — O(n) space (recursive — depth — n — call stack) — pruning — reduce — if (current.length + (nums.length - i) < k) continue — C(n,k) — O(2ⁿ) worst — n — k = n/2 — C(n,k) — O(2ⁿ).
3. **N-Queens — backtrack — prune — check — attack — fail — prune — backtrack:** har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column — check — attack: row — column — diagonal (slash — \ va backslash — ) — check — fail — prune — slash diagonal (/) — row + col = constant — backslash diagonal (\) — row - col = constant — base case — row === n — solution — store — return — backtrack — O(n!) time — O(n) space (sets — cols, diag1, diag2 — O(n) space) — O(n²) space (board — n x n) — pruning — reduce — time — O(n!) average — O(n^m) worst — m — empty cols — but pruning — reduce — O(n!) average.
4. **Sudoku — backtrack — prune — check — constraint — fail — prune — backtrack:** har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number — check — constraint: row — column — box — check — fail — prune — box — top-left corner — (row - row % 3, col - col % 3) — 3x3 — check — fail — prune — base case — cell === 81 — solution — store — return — backtrack — O(9^m) time (m — empty cells — 9^m — worst — pruning — reduce — O(9^m) worst — m — empty cells) — O(n²) space (n=9 — board — 9x9) — optimized — maintain — row/col/box sets — O(1) check — O(9^m) time — worst — pruning — reduce — O(9^m) worst.
5. **Palindrome Partitioning — backtrack — check — palindrome — fail — prune — backtrack:** har bir end — try — substring — check — palindrome — fail — prune — backtrack — try — next end — check — palindrome: s[l] === s[r] — l++, r-- — base case — start === n — solution — store — return — backtrack — O(2ⁿ) time — O(n) space (recursive — depth — n — call stack) — pruning — reduce — time — check — palindrome — O(n) per check — O(2ⁿ) total — worst — pruning — reduce — O(2ⁿ) worst.
6. **Combination Sum — backtrack — prune — check — sum — fail — prune — backtrack:** har bir candidate — try — include — check — sum — fail — prune — backtrack — try — next candidate — check — sum: sum + candidate > target — fail — prune — early stop — if (sum + candidate > target) break — base case — sum === target — solution — store — return — backtrack — O(n^target) time — O(target) space (recursive — depth — target — call stack) — pruning — reduce — time — sum + candidate > target — fail — prune — early stop — O(n^target) worst — pruning — reduce — O(n^target) worst.

## 🎙 Intervyu savollari va javoblari

### 1. Backtracking nima? Qanday ishlaydi?

**Javob:** Backtracking — "muammoni yechish — recursive — har bir qadam — variantlar — yo'ldan chiqish — yo'q — qayta qaytish — keyingi variant". "Recursive — options — try — fail — backtrack — try — next". "Base case — solution — store — return — backtrack". "Pruning — options — reduce — recursion — depth — reduce — early exit". Shunday qilib, backtracking — recursive — options — try — fail — backtrack — try — next — base case — solution — store — return — backtrack.

### 2. Permutations — backtrack — swap — backtrack — swap back — qanday?

**Javob:** Permutations — "index — element — swap — recursive — backtrack — swap back". "Har bir index — element — swap — recursive — backtrack — swap back — try — fail — backtrack — try — next element". "Base case — index === n — solution — store — return — backtrack". "O(n!) time — O(n) space (recursive — depth — n — call stack)". Shunday qilib, permutations — backtrack — swap — recursive — backtrack — swap back — O(n!) time — O(n) space.

### 3. Combinations — backtrack — include/exclude — backtrack — qanday?

**Javob:** Combinations — "har bir element — try — include — recursive — backtrack — exclude — recursive". "Har bir element — try — include — recursive — backtrack — exclude — recursive — try — fail — backtrack — try — next element". "Base case — size === k — solution — store — return". "O(2ⁿ) time — O(n) space (recursive — depth — n — call stack)". Shunday qilib, combinations — backtrack — include/exclude — recursive — backtrack — include — recursive — backtrack — exclude — recursive — O(2ⁿ) time — O(n) space.

### 4. N-Queens — check — attack — fail — prune — backtrack — qanday?

**Javob:** N-Queens — "har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column". "Check — attack: row — column — diagonal (slash — \ va backslash — ) — check — fail — prune — backtrack". "Slash diagonal (/) — row + col = constant — backslash diagonal (\) — row - col = constant". "Har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column". "Base case — row === n — solution — store — return — backtrack". "O(n!) time — O(n) space (sets — cols, diag1, diag2 — O(n) space) — O(n²) space (board — n x n)".

### 5. Sudoku — check — constraint — fail — prune — backtrack — qanday?

**Javob:** Sudoku — "har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number". "Check — constraint: row — column — box — check — fail — prune — backtrack". "Box — top-left corner — (row - row % 3, col - col % 3) — 3x3 — check — fail — prune". "Har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number". "Base case — cell === 81 — solution — store — return — backtrack". "O(9^m) time — O(n²) space (board — 9x9) — m — empty cells — O(9^m) worst — pruning — reduce — O(9^m) worst".

### 6. Palindrome Partitioning — check — palindrome — fail — prune — backtrack — qanday?

**Javob:** Palindrome Partitioning — "har bir end — try — substring — check — palindrome — fail — prune — backtrack — try — next end". "Check — palindrome: s[l] === s[r] — l++, r-- — while (l < r) — if (s[l++] !== s[r--]) return false; return true". "Har bir end — try — substring — check — palindrome — fail — prune — backtrack — try — next end". "Base case — start === n — solution — store — return — backtrack". "O(2ⁿ) time — O(n) space (recursive — depth — n — call stack)".

### 7. Combination Sum — check — sum — fail — prune — backtrack — qanday?

**Javob:** Combination Sum — "har bir candidate — try — include — check — sum — fail — prune — backtrack — try — next candidate". "Check — sum: sum + candidate > target — fail — prune — early stop — if (sum + candidate > target) break". "Har bir candidate — try — include — check — sum — fail — prune — backtrack — try — next candidate". "Base case — sum === target — solution — store — return — backtrack". "O(n^target) time — O(target) space (recursive — depth — target — call stack)".

### 8. Backtracking — pruning — qanday? Qanday ishlaydi? Nima uchun foydali?

**Javob:** Backtracking — "pruning — options — reduce — recursion — depth — reduce — early exit". "Har bir recursive — options — try — fail — check — fail — prune — options — reduce — recursion — depth — reduce — early exit". "Pruning — reduce — time — complexity — reduce — O(2ⁿ) — O(n!) — reduce — pruning". "Foydali — besar — options — reduce — recursion — depth — reduce — time — complexity — reduce — O(2ⁿ) — O(n!) — reduce — pruning".

### 9. Backtracking — base case — missing — qanday? Infinite recursion — crash — call stack overflow — qanday oldini olish?

**Javob:** Backtracking — "base case — solution — store — return — backtrack". "Base case — missing — infinite recursion — crash — call stack overflow". "Oldini olish — base case — solution — store — return — backtrack — recursive — depth — limit — call stack — limit — crash — call stack overflow — oldini olish — base case — solution — store — return — backtrack". Shunday qilib, base case — solution — store — return — backtrack — oldini olish — base case — solution — store — return — backtrack.

### 10. Backtracking — duplicate elements — pruning — skip — duplicate — qanday? Permutations — duplicate elements — skip — duplicate — reduce — time?

**Javob:** Backtracking — "duplicate elements — pruning — skip — duplicate — reduce — time — duplicates — results — reduce". "Permutations — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue — pruning — duplicate elements — skip — duplicate — reduce — time — duplicates — results — reduce". "Sort — nums — sorting — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue — pruning — duplicate elements — skip — duplicate — reduce — time — duplicates — results — reduce". Shunday qilib, duplicate elements — pruning — skip — duplicate — reduce — time — duplicates — results — reduce — sort — nums — sorting — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue.

### 📌 Xulosa:

- **Backtracking — framework:** "recursive — options — try — fail — backtrack — try — next". "Base case — solution — store — return — backtrack". "Pruning — options — reduce — recursion — depth — reduce — early exit". "O(n!) — O(2ⁿ) — time — O(n) — space (recursive — depth — n — call stack)".
- **Permutations — backtrack — swap — backtrack — swap back:** "index — element — swap — recursive — backtrack — swap back". "O(n!) time — O(n) space (recursive — depth — n — call stack)". "Pruning — duplicate elements — skip — duplicate — if (i > index && nums[i] === nums[i-1]) continue".
- **Combinations — backtrack — include/exclude — backtrack:** "Har bir element — try — include — recursive — backtrack — exclude — recursive". "Size === k — solution — store — return". "O(2ⁿ) time — O(n) space (recursive — depth — n — call stack)". "Pruning — reduce — if (current.length + (nums.length - i) < k) continue".
- **N-Queens — backtrack — prune — check — attack — fail — prune — backtrack:** "Har bir row — column — try — queen — place — check — attack — fail — prune — backtrack — try — next column". "Check — attack: row — column — diagonal (slash — \ va backslash — ) — check — fail — prune". "Slash diagonal (/) — row + col = constant — backslash diagonal (\) — row - col = constant". "O(n!) time — O(n) space (sets — cols, diag1, diag2 — O(n) space) — O(n²) space (board — n x n)".
- **Sudoku — backtrack — prune — check — constraint — fail — prune — backtrack:** "Har bir cell — try — number 1-9 — place — check — constraint — fail — prune — backtrack — try — next number". "Check — constraint: row — column — box — check — fail — prune". "Box — top-left corner — (row - row % 3, col - col % 3) — 3x3 — check — fail — prune". "O(9^m) time — O(n²) space (board — 9x9) — m — empty cells — O(9^m) worst — pruning — reduce — O(9^m) worst".
- **Palindrome Partitioning — backtrack — check — palindrome — fail — prune — backtrack:** "Har bir end — try — substring — check — palindrome — fail — prune — backtrack — try — next end". "O(2ⁿ) time — O(n) space (recursive — depth — n — call stack)".
- **Combination Sum — backtrack — prune — check — sum — fail — prune — backtrack:** "Har bir candidate — try — include — check — sum — fail — prune — backtrack — try — next candidate". "O(n^target) time — O(target) space (recursive — depth — target — call stack)".
- **Backtracking — pruning — reduce — time — complexity — reduce — O(2ⁿ) — O(n!) — reduce — pruning.**
- **Backtracking — base case — missing — infinite recursion — crash — call stack overflow.**
- **Backtracking — state — shared — backtrack — remove — missing — BUG — shared state — wrong — duplicates.**
- **Backtracking — return — recursive — result — missing — infinite — crash — missing — return — recursive — result — true/false — return — solution — found — return — true — missing — return — recursive — result — false — return — false.**
- **Backtracking — path — shared — backtrack — remove — missing — BUG — shared path — wrong — duplicates.**
- **Backtracking — options — order — fixed — start — i — options — order — fixed — duplicates — results — reduce — duplicates — results — reduce.**
- **Backtracking — duplicate elements — pruning — skip — duplicate — reduce — time — duplicates — results — reduce.**

---

**Keyingi darslar (o'rta/advanced daraja):**
1. ✅ **Backtracking — Permutations, Combinations, N-Queens, Sudoku (bu dars)**
2. **Advanced Graphs — Dijkstra detail, Bellman-Ford, Floyd-Warshall, MST (Kruskal, Prim), Max Flow (Ford-Fulkerson)**
3. **Advanced DP — Optimal BST, Matrix Chain Multiplication, Edit Distance, Subset Sum, Partition Equal Subset Sum**
4. **Bit Manipulation — XOR, AND, OR, bit masking, bit operations, DP with bitmask**

Keyingi mavzu: **1 — Advanced Graphs** yoki **2 — Advanced DP** yoki **3 — Komplekslik tahlili** yoki **4 — Bit Manipulation**. Raqam yoki nom.

Qaysi mavzu keyingi? Raqam (2, 3, 4, 5) yoki nom. Yozayman.
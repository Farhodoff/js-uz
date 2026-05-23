import React, { useState, useEffect, useRef } from "react";

export default function VisualizerTab({ activeLesson }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // ms per step
  const [stepInfo, setStepInfo] = useState("Vizualizatsiyani boshlash uchun 'Play' yoki 'Qadam' tugmasini bosing.");
  const handleStepRef = useRef(null);

  // Lesson-specific states
  const [bigON, setBigON] = useState(10);
  const [linkedListNodes, setLinkedListNodes] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 }
  ]);
  const [llInput, setLlInput] = useState("");

  const [sqMode, setSqMode] = useState("stack"); // stack or queue
  const [sqItems, setSqItems] = useState([10, 20, 30]);
  const [sqInput, setSqInput] = useState("");
  const [sqActiveIndex, setSqActiveIndex] = useState(null);

  const [bstRoot, setBstRoot] = useState({
    value: 20,
    left: { value: 10, left: null, right: null },
    right: { value: 30, left: null, right: null }
  });
  const [bstInput, setBstInput] = useState("");
  const [bstActiveValue, setBstActiveValue] = useState(null);
  const [bstPath, setBstPath] = useState([]);

  const [sortArray, setSortArray] = useState([35, 12, 45, 8, 22, 19, 50, 31]);
  const [sortActive, setSortActive] = useState([]);
  const [sortSwap, setSortSwap] = useState([]);
  const [sortSorted, setSortSorted] = useState([]);
  const [sortAlgo, setSortAlgo] = useState("bubble");
  const [sortStepIndex, setSortStepIndex] = useState(0);
  const [sortSearchLow, setSortSearchLow] = useState(-1);
  const [sortSearchHigh, setSortSearchHigh] = useState(-1);
  const [sortSearchMid, setSortSearchMid] = useState(-1);
  const [searchTarget, setSearchTarget] = useState(22);

  const [lcMode, setLcMode] = useState("twosum"); // twosum or parentheses
  const [lcStep, LcSetStep] = useState(0);
  const [lcStack, setLcStack] = useState([]);
  const [lcPointers, setLcPointers] = useState({ left: 0, right: 3 });

  useEffect(() => {
    handleStepRef.current = handleStep;
  });

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (handleStepRef.current) {
          handleStepRef.current();
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed]);

  const stopTimer = () => {
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    stopTimer();
    setStepInfo("Vizualizatsiya qayta yuklandi.");
    // Reset specific lesson states
    if (activeLesson.id === "linkedLists") {
      setLinkedListNodes([
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 30 }
      ]);
    } else if (activeLesson.id === "stacksQueues") {
      setSqItems([10, 20, 30]);
      setSqActiveIndex(null);
    } else if (activeLesson.id === "binarySearchTree") {
      setBstRoot({
        value: 20,
        left: { value: 10, left: null, right: null },
        right: { value: 30, left: null, right: null }
      });
      setBstActiveValue(null);
      setBstPath([]);
    } else if (activeLesson.id === "sortingSearching") {
      setSortArray([35, 12, 45, 8, 22, 19, 50, 31]);
      setSortActive([]);
      setSortSwap([]);
      setSortSorted([]);
      setSortStepIndex(0);
      setSortSearchLow(-1);
      setSortSearchHigh(-1);
      setSortSearchMid(-1);
    } else if (activeLesson.id === "leetcodeTop") {
      LcSetStep(0);
      setLcStack([]);
      setLcPointers({ left: 0, right: 3 });
    }
  };

  const handleStep = () => {
    if (activeLesson.id === "sortingSearching") {
      runSortingStep();
    } else if (activeLesson.id === "leetcodeTop") {
      runLeetcodeStep();
    } else {
      setStepInfo("Ushbu dars uchun qadamma-qadam animatsiya tugmasi faqat boshqaruv panelidan amalga oshiriladi.");
      stopTimer();
    }
  };

  // 1. Linked List Operations
  const handleLLAppend = () => {
    const val = parseInt(llInput);
    if (isNaN(val)) return;
    const newNodes = [...linkedListNodes, { id: Date.now(), value: val }];
    setLinkedListNodes(newNodes);
    setLlInput("");
    setStepInfo(`Linked List oxiriga yangi tugun qo'shildi: [${val}]. Oxirgi element ko'rsatkichi null bo'ladi.`);
  };

  const handleLLPrepend = () => {
    const val = parseInt(llInput);
    if (isNaN(val)) return;
    const newNodes = [{ id: Date.now(), value: val }, ...linkedListNodes];
    setLinkedListNodes(newNodes);
    setLlInput("");
    setStepInfo(`Linked List boshiga (Head) yangi tugun qo'shildi: [${val}]. Uning keyingisi eski Head ga ulandi.`);
  };

  const handleLLDelete = () => {
    const val = parseInt(llInput);
    if (isNaN(val)) return;
    const index = linkedListNodes.findIndex(n => n.value === val);
    if (index === -1) {
      setStepInfo(`O'chirish uchun qiymat topilmadi: [${val}]`);
      return;
    }
    const newNodes = linkedListNodes.filter(n => n.value !== val);
    setLinkedListNodes(newNodes);
    setLlInput("");
    setStepInfo(`Qiymati [${val}] bo'lgan tugun o'chirildi. Havolalar yangilandi.`);
  };

  // 2. Stack & Queue Operations
  const handleSQPush = () => {
    const val = parseInt(sqInput);
    if (isNaN(val)) return;
    setSqItems([...sqItems, val]);
    setSqInput("");
    setSqActiveIndex(sqItems.length);
    setStepInfo(
      sqMode === "stack"
        ? `Stack-ga [${val}] push qilindi. U eng tepaga (LIFO) joylashadi.`
        : `Queue-ga [${val}] enqueue qilindi. U navbat oxiriga (FIFO) qo'shiladi.`
    );
    setTimeout(() => setSqActiveIndex(null), 500);
  };

  const handleSQPop = () => {
    if (sqItems.length === 0) {
      setStepInfo("Element qolmadi.");
      return;
    }
    const val = sqMode === "stack" ? sqItems[sqItems.length - 1] : sqItems[0];
    setSqActiveIndex(sqMode === "stack" ? sqItems.length - 1 : 0);
    setStepInfo(
      sqMode === "stack"
        ? `Stack-dan pop qilindi: [${val}]. Eng oxirgi qo'shilgan element birinchi chiqib ketadi (LIFO).`
        : `Queue-dan dequeue qilindi: [${val}]. Birinchi navbatga kirgan element birinchi chiqadi (FIFO).`
    );
    setTimeout(() => {
      setSqItems(sqMode === "stack" ? sqItems.slice(0, -1) : sqItems.slice(1));
      setSqActiveIndex(null);
    }, 400);
  };

  // 3. BST Operations
  const handleBSTInsert = () => {
    const val = parseInt(bstInput);
    if (isNaN(val)) return;
    setBstInput("");

    const insertNode = (node, value) => {
      if (!node) return { value, left: null, right: null };
      if (value < node.value) {
        node.left = insertNode(node.left, value);
      } else if (value > node.value) {
        node.right = insertNode(node.right, value);
      }
      return node;
    };

    const newRoot = { ...bstRoot };
    insertNode(newRoot, val);
    setBstRoot(newRoot);
    setStepInfo(`BST-ga [${val}] kiritildi. Qiymat ildizdan kichik bo'lsa chapga, katta bo'lsa o'ngga joylashadi.`);
  };

  const handleBSTSearch = () => {
    const val = parseInt(bstInput);
    if (isNaN(val)) return;
    setBstInput("");

    let current = bstRoot;
    let path = [];
    let found = false;

    while (current) {
      path.push(current.value);
      if (val === current.value) {
        found = true;
        break;
      } else if (val < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    setBstPath(path);
    if (found) {
      setStepInfo(`BST-dan [${val}] topildi! Qidiruv yo'li: ${path.join(" -> ")}`);
    } else {
      setStepInfo(`BST-dan [${val}] topilmadi. Qidiruv yo'li: ${path.join(" -> ")}`);
    }
  };

  // 4. Sorting & Searching Steps
  const runSortingStep = () => {
    if (sortAlgo === "bubble") {
      let arr = [...sortArray];
      let n = arr.length;
      let step = sortStepIndex;

      // Find the next swap step
      let i = Math.floor(step / n);
      let j = step % n;

      if (i >= n) {
        setStepInfo("Massiv saralanib bo'lindi (Bubble Sort yakunlandi).");
        setSortActive([]);
        setSortSwap([]);
        setSortSorted(arr);
        stopTimer();
        return;
      }

      if (j < n - 1 - i) {
        setSortActive([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setSortArray(arr);
          setSortSwap([j, j + 1]);
          setStepInfo(`Taqqoslash: ${arr[j + 1]} > ${arr[j]}. Elementlar o'rni almashtirildi.`);
        } else {
          setSortSwap([]);
          setStepInfo(`Taqqoslash: ${arr[j]} <= ${arr[j + 1]}. O'zgarishsiz qoldirildi.`);
        }
        setSortStepIndex(step + 1);
      } else {
        // Pass completed
        setSortStepIndex((i + 1) * n);
        setStepInfo(`${i + 1}-pass yakunlandi. Eng katta element o'ng chekkaga joylashdi.`);
      }
    } else if (sortAlgo === "binary") {
      let arr = [...sortArray].sort((a, b) => a - b);
      // If array not sorted, sort it first
      if (JSON.stringify(sortArray) !== JSON.stringify(arr)) {
        setSortArray(arr);
        setStepInfo("Ikkilik qidiruv uchun massiv avval tartiblandi.");
        return;
      }

      let low = sortSearchLow === -1 ? 0 : sortSearchLow;
      let high = sortSearchHigh === -1 ? arr.length - 1 : sortSearchHigh;

      if (low > high) {
        setStepInfo(`Element [${searchTarget}] massivda mavjud emas!`);
        stopTimer();
        return;
      }

      let mid = Math.floor((low + high) / 2);
      setSortSearchLow(low);
      setSortSearchHigh(high);
      setSortSearchMid(mid);

      if (arr[mid] === searchTarget) {
        setStepInfo(`Element topildi! Indeks: [${mid}]. Qiymat: ${arr[mid]}.`);
        stopTimer();
      } else if (arr[mid] < searchTarget) {
        setStepInfo(`mid (${arr[mid]}) < target (${searchTarget}). Chap qism bekor qilindi, low = mid + 1.`);
        setSortSearchLow(mid + 1);
      } else {
        setStepInfo(`mid (${arr[mid]}) > target (${searchTarget}). O'ng qism bekor qilindi, high = mid - 1.`);
        setSortSearchHigh(mid - 1);
      }
    }
  };

  // 5. LeetCode Trace Steps
  const runLeetcodeStep = () => {
    if (lcMode === "twosum") {
      const arr = [2, 7, 11, 15];
      const target = 9;
      let { left, right } = lcPointers;

      if (left >= right) {
        setStepInfo("Two Sum: Ikki pointer to'qnashdi, yechim topilmadi.");
        stopTimer();
        return;
      }

      const sum = arr[left] + arr[right];
      if (sum === target) {
        setStepInfo(`Two Sum: Yechim topildi! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${target}. Indekslar: [${left}, ${right}].`);
        stopTimer();
      } else if (sum < target) {
        setStepInfo(`Summa ${sum} < ${target}. Chap pointerni o'ngga suramiz: left++`);
        setLcPointers({ left: left + 1, right });
        LcSetStep(lcStep + 1);
      } else {
        setStepInfo(`Summa ${sum} > ${target}. O'ng pointerni chapga suramiz: right--`);
        setLcPointers({ left, right: right - 1 });
        LcSetStep(lcStep + 1);
      }
    } else if (lcMode === "parentheses") {
      const str = "{[()]}";
      let step = lcStep;
      if (step >= str.length) {
        if (lcStack.length === 0) {
          setStepInfo("Valid Parentheses: Qavslar to'g'ri joylashgan (Valid)! Stack bo'sh qoldi.");
        } else {
          setStepInfo("Valid Parentheses: Xatolik bor (Invalid), stack bo'sh qolishi shart edi.");
        }
        stopTimer();
        return;
      }

      const char = str[step];
      let stack = [...lcStack];

      if (char === "(" || char === "[" || char === "{") {
        stack.push(char);
        setStepInfo(`Ochuvchi qavs '${char}' stack-ga push qilindi.`);
      } else {
        const top = stack[stack.length - 1];
        if (
          (char === ")" && top === "(") ||
          (char === "]" && top === "[") ||
          (char === "}" && top === "{")
        ) {
          stack.pop();
          setStepInfo(`Yopuvchi qavs '${char}' ochuvchisi '${top}' bilan mos keldi, stack-dan pop qilindi.`);
        } else {
          setStepInfo(`Xato! Yopuvchi '${char}' stack boshidagi '${top}' bilan mos kelmadi.`);
          stopTimer();
          return;
        }
      }

      setLcStack(stack);
      LcSetStep(step + 1);
    }
  };

  // Helper: Recursive BST node render
  const renderBstNode = (node) => {
    if (!node) return <div className="bst-node-null">null</div>;
    const isActive = bstPath.includes(node.value) || bstActiveValue === node.value;
    return (
      <div className="bst-node-wrapper">
        <div className={`bst-node-circle ${isActive ? "active" : ""}`}>
          {node.value}
        </div>
        <div className="bst-node-children">
          <div className="bst-node-left">{renderBstNode(node.left)}</div>
          <div className="bst-node-right">{renderBstNode(node.right)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h4>📊 {activeLesson.title} Vizualizatsiyasi</h4>
        <p className="visualizer-info-text">{stepInfo}</p>
      </div>

      {/* RENDER VIEWPORT FOR EACH LESSON */}
      <div className="visualizer-viewport">
        {/* BIG O VISUALIZATION */}
        {activeLesson.id === "bigO" && (
          <div className="vis-bigo-layout">
            <div className="vis-controls">
              <label>Kiritilgan ma'lumotlar hajmi (n): </label>
              <input
                type="number"
                min="1"
                max="50"
                value={bigON}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 10;
                  setBigON(val > 50 ? 50 : val);
                  setStepInfo(`n = ${val} bo'lganda, turli algoritmlarning bajaradigan amallari solishtirilmoqda.`);
                }}
              />
            </div>
            <div className="vis-bigo-bars">
              {[
                { name: "O(1) - Constant", val: 1, color: "#4caf50" },
                { name: "O(log n) - Logarithmic", val: Math.round(Math.log2(bigON)), color: "#8bc34a" },
                { name: "O(n) - Linear", val: bigON, color: "#2196f3" },
                { name: "O(n log n) - Linearithmic", val: Math.round(bigON * Math.log2(bigON)), color: "#ff9800" },
                { name: "O(n²)- Quadratic", val: bigON * bigON, color: "#f44336" }
              ].map((item, idx) => {
                const maxVal = bigON * bigON;
                const percentage = Math.max(2, Math.min(100, (item.val / maxVal) * 100));
                return (
                  <div className="bigo-bar-row" key={idx}>
                    <span className="bigo-bar-label">{item.name}</span>
                    <div className="bigo-bar-container">
                      <div
                        className="bigo-bar-fill"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                    <span className="bigo-bar-value">{item.val} amal</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LINKED LISTS VISUALIZATION */}
        {activeLesson.id === "linkedLists" && (
          <div className="vis-ll-layout">
            <div className="vis-controls">
              <input
                type="number"
                placeholder="Qiymat"
                value={llInput}
                onChange={(e) => setLlInput(e.target.value)}
              />
              <button onClick={handleLLPrepend}>Head (Boshiga)</button>
              <button onClick={handleLLAppend}>Tail (Oxiriga)</button>
              <button onClick={handleLLDelete} className="btn-danger">O'chirish</button>
            </div>
            <div className="ll-nodes-chain">
              {linkedListNodes.map((node, idx) => (
                <div className="ll-node-container" key={node.id}>
                  <div className="ll-node-box">
                    <div className="ll-node-value">{node.value}</div>
                    <div className="ll-node-next">next</div>
                  </div>
                  {idx < linkedListNodes.length - 1 ? (
                    <div className="ll-arrow">➔</div>
                  ) : (
                    <div className="ll-arrow-null">➔ null</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STACKS & QUEUES VISUALIZATION */}
        {activeLesson.id === "stacksQueues" && (
          <div className="vis-sq-layout">
            <div className="vis-controls">
              <button
                className={sqMode === "stack" ? "active" : ""}
                onClick={() => {
                  setSqMode("stack");
                  setStepInfo("Stack rejimi tanlandi (LIFO).");
                }}
              >
                Stack (LIFO)
              </button>
              <button
                className={sqMode === "queue" ? "active" : ""}
                onClick={() => {
                  setSqMode("queue");
                  setStepInfo("Queue rejimi tanlandi (FIFO).");
                }}
              >
                Queue (FIFO)
              </button>
              <div style={{ margin: "10px 0" }}>
                <input
                  type="number"
                  placeholder="Qiymat"
                  value={sqInput}
                  onChange={(e) => setSqInput(e.target.value)}
                />
                <button onClick={handleSQPush}>Qo'shish</button>
                <button onClick={handleSQPop} className="btn-danger">O'chirish</button>
              </div>
            </div>

            <div className="sq-container-viewport">
              {sqMode === "stack" ? (
                <div className="stack-jar">
                  {sqItems.map((item, idx) => (
                    <div
                      className={`sq-item stack-item ${sqActiveIndex === idx ? "active" : ""}`}
                      key={idx}
                    >
                      {item}
                    </div>
                  ))}
                  {sqItems.length === 0 && <p className="sq-empty">Stack bo'sh</p>}
                </div>
              ) : (
                <div className="queue-line">
                  {sqItems.map((item, idx) => (
                    <div
                      className={`sq-item queue-item ${sqActiveIndex === idx ? "active" : ""}`}
                      key={idx}
                    >
                      {item}
                    </div>
                  ))}
                  {sqItems.length === 0 && <p className="sq-empty">Queue bo'sh</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* BINARY SEARCH TREE VISUALIZATION */}
        {activeLesson.id === "binarySearchTree" && (
          <div className="vis-bst-layout">
            <div className="vis-controls">
              <input
                type="number"
                placeholder="Qiymat"
                value={bstInput}
                onChange={(e) => setBstInput(e.target.value)}
              />
              <button onClick={handleBSTInsert}>Kiritish</button>
              <button onClick={handleBSTSearch}>Qidirish</button>
            </div>
            <div className="bst-tree-viewport">
              {renderBstNode(bstRoot)}
            </div>
          </div>
        )}

        {/* SORTING & SEARCHING VISUALIZATION */}
        {activeLesson.id === "sortingSearching" && (
          <div className="vis-sort-layout">
            <div className="vis-controls">
              <button
                className={sortAlgo === "bubble" ? "active" : ""}
                onClick={() => {
                  setSortAlgo("bubble");
                  handleReset();
                  setStepInfo("Bubble Sort tanlandi. Play yoki Step bosing.");
                }}
              >
                Bubble Sort
              </button>
              <button
                className={sortAlgo === "binary" ? "active" : ""}
                onClick={() => {
                  setSortAlgo("binary");
                  handleReset();
                  setStepInfo("Ikkilik qidiruv (Binary Search) tanlandi.");
                }}
              >
                Binary Search
              </button>
              {sortAlgo === "binary" && (
                <div style={{ margin: "5px 0" }}>
                  <label>Izlanayotgan son (target): </label>
                  <input
                    type="number"
                    style={{ width: "60px" }}
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
                  />
                </div>
              )}
            </div>

            <div className="sort-bars-container">
              {sortArray.map((val, idx) => {
                const isActive = sortActive.includes(idx) || sortSearchMid === idx;
                const isSwap = sortSwap.includes(idx);
                const isSorted = sortSorted.includes(val) || (sortAlgo === "binary" && sortSearchMid === idx && val === searchTarget);
                let barClass = "";
                if (isSorted) barClass = "sorted";
                else if (isSwap) barClass = "swap";
                else if (isActive) barClass = "active";

                // Highlight search boundaries
                const isOutOfRange = sortAlgo === "binary" && (idx < sortSearchLow || idx > sortSearchHigh) && sortSearchLow !== -1;

                return (
                  <div
                    className={`sort-bar-wrapper ${isOutOfRange ? "disabled" : ""}`}
                    key={idx}
                  >
                    <div
                      className={`sort-bar ${barClass}`}
                      style={{ height: `${val * 3}px` }}
                    >
                      <span className="sort-bar-val">{val}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LEETCODE TOP TRACES */}
        {activeLesson.id === "leetcodeTop" && (
          <div className="vis-lc-layout">
            <div className="vis-controls">
              <button
                className={lcMode === "twosum" ? "active" : ""}
                onClick={() => {
                  setLcMode("twosum");
                  handleReset();
                  setStepInfo("Two Sum algoritmi vizualizatsiyasi. Massiv saralangan: [2, 7, 11, 15], Target = 9.");
                }}
              >
                Two Sum (Pointers)
              </button>
              <button
                className={lcMode === "parentheses" ? "active" : ""}
                onClick={() => {
                  setLcMode("parentheses");
                  handleReset();
                  setStepInfo("Valid Parentheses. String = '{[()]}'");
                }}
              >
                Valid Parentheses (Stack)
              </button>
            </div>

            <div className="lc-viewport-area">
              {lcMode === "twosum" ? (
                <div className="lc-twosum-view">
                  <div className="lc-array-row">
                    {[2, 7, 11, 15].map((val, idx) => {
                      const isLeft = lcPointers.left === idx;
                      const isRight = lcPointers.right === idx;
                      return (
                        <div className="lc-array-cell-wrapper" key={idx}>
                          <div className={`lc-array-cell ${isLeft ? "left-p" : ""} ${isRight ? "right-p" : ""}`}>
                            {val}
                          </div>
                          <div className="pointer-label">
                            {isLeft && "L ➔"}
                            {isRight && "⬅ R"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="lc-parentheses-view">
                  <div className="lc-string-row">
                    {"{[()]}".split("").map((char, idx) => (
                      <div
                        className={`lc-string-char ${lcStep === idx ? "active" : ""} ${lcStep > idx ? "done" : ""}`}
                        key={idx}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                  <div className="lc-stack-visual font-mono">
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Stack holati:</p>
                    <div className="stack-container-lite">
                      {lcStack.map((char, idx) => (
                        <div className="stack-char-box" key={idx}>
                          {char}
                        </div>
                      ))}
                      {lcStack.length === 0 && <span style={{ color: "gray" }}>Bo'sh</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CORE CONTROLS BAR */}
      {activeLesson.id !== "bigO" && (
        <div className="visualizer-controls-bar">
          <button onClick={handlePlayToggle} className="btn-primary">
            {isPlaying ? "⏸ Tanaffus" : "▶ Boshlash"}
          </button>
          <button onClick={handleStep} disabled={isPlaying}>
            ➡️ Qadam
          </button>
          <button onClick={handleReset} className="btn-secondary">
            🔄 Reset
          </button>
          <div className="speed-control">
            <label>Tezlik: </label>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
            <span>{speed} ms</span>
          </div>
        </div>
      )}
    </div>
  );
}

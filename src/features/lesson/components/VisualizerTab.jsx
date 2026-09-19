import React, { useState, useEffect, useRef } from "react";

const tsSnippets = {
  primitives: {
    title: "Primitive Tiplar",
    ts: `// TypeScript: Tiplar e'lon qilinishi
let age: number = 25;
let userName: string = "Doston";
let isStudent: boolean = true;

function welcome(name: string): string {
  return "Salom, " + name;
}`,
    js: `// JavaScript: Tiplar o'chirilgan holatda
let age = 25;
let userName = "Doston";
let isStudent = true;

function welcome(name) {
  return "Salom, " + name;
}`,
    erased: [": number", ": string", ": boolean", ": string"]
  },
  interfaces: {
    title: "Interface & Obyektlar",
    ts: `// TypeScript: Obyekt strukturalari
interface User {
  id: number;
  name: string;
  isAdmin?: boolean;
}

const user: User = {
  id: 1,
  name: "Alisher"
};`,
    js: `// JavaScript: Interface butunlay yo'q
const user = {
  id: 1,
  name: "Alisher"
};`,
    erased: ["interface User {\n  id: number;\n  name: string;\n  isAdmin?: boolean;\n}\n\n", ": User"]
  },
  enums: {
    title: "Enums (Ro'yxatlar)",
    ts: `// TypeScript: Enum tiplari
enum UserRole {
  Admin = "ADMIN",
  User = "USER"
}

let role: UserRole = UserRole.Admin;`,
    js: `// JavaScript: Enum o'rniga IIFE obyekti yaratiladi
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["User"] = "USER";
})(UserRole || (UserRole = {}));

let role = UserRole.Admin;`,
    erased: [": UserRole"]
  },
  generics: {
    title: "Generics (Umumlashtirish)",
    ts: `// TypeScript: Dinamik tiplar bilan ishlash
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("Salom");`,
    js: `// JavaScript: T va boshqa tiplar o'chirilgan
function identity(arg) {
  return arg;
}

let output = identity("Salom");`,
    erased: ["<T>", ": T", ": T", "<string>"]
  }
};

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
  const [llMode, setLlMode] = useState("basic"); // basic or cycle
  const [cycleLength, setCycleLength] = useState(8);
  const [cycleEntry, setCycleEntry] = useState(3);
  const [cycleStep, setCycleStep] = useState(0);
  const [slowPointer, setSlowPointer] = useState(0);
  const [fastPointer, setFastPointer] = useState(0);
  const [cyclePhase, setCyclePhase] = useState("collision"); // collision, find_entry, done
  const [cycleCodeLine, setCycleCodeLine] = useState(0);

  // TypeScript Visualizer states
  const [tsSnippetKey, setTsSnippetKey] = useState("primitives");
  const [tsStep, setTsStep] = useState(0); // 0: Idle, 1: Checking, 2: Erasing, 3: Completed
  const [tsStepDetail, setTsStepDetail] = useState("Kompilyatsiyani boshlash uchun 'Play' yoki 'Qadam' tugmasini bosing.");

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
  const [customArrayInput, setCustomArrayInput] = useState("");
  const [quickI, setQuickI] = useState(-1);
  const [quickJ, setQuickJ] = useState(0);
  const [quickPivotIdx, setQuickPivotIdx] = useState(7);
  const [quickPhase, setQuickPhase] = useState("init");

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
      setCycleStep(0);
      setSlowPointer(0);
      setFastPointer(0);
      setCyclePhase("collision");
      setCycleCodeLine(0);
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
      setSortActive([]);
      setSortSwap([]);
      setSortSorted([]);
      setSortStepIndex(0);
      setSortSearchLow(-1);
      setSortSearchHigh(-1);
      setSortSearchMid(-1);
      setQuickI(-1);
      setQuickJ(0);
      setQuickPivotIdx(sortArray.length - 1);
      setQuickPhase("init");
    } else if (activeLesson.id === "leetcodeTop") {
      LcSetStep(0);
      setLcStack([]);
      setLcPointers({ left: 0, right: 3 });
    } else if (activeLesson.id === "typescriptBasics") {
      setTsStep(0);
      setTsStepDetail("Kompilyatsiyani boshlash uchun 'Play' yoki 'Qadam' tugmasini bosing.");
    }
  };

  const runCycleStep = () => {
    const getNext = (idx) => {
      if (idx === cycleLength - 1) return cycleEntry;
      return idx + 1;
    };

    if (cycleStep === 0) {
      setSlowPointer(0);
      setFastPointer(0);
      setCyclePhase("collision");
      setCycleCodeLine(2);
      setStepInfo("slow va fast ko'rsatkichlari head (Node 0) ga joylashtirildi.");
      setCycleStep(1);
      return;
    }

    if (cyclePhase === "collision") {
      if (cycleCodeLine === 2 || cycleCodeLine === 6) {
        const nextSlow = getNext(slowPointer);
        const nextFast = getNext(getNext(fastPointer));
        setSlowPointer(nextSlow);
        setFastPointer(nextFast);
        setCycleCodeLine(4);
        setStepInfo(`slow pointer Node ${nextSlow} ga, fast pointer Node ${nextFast} ga surildi.`);
      } else if (cycleCodeLine === 4) {
        setCycleCodeLine(6);
        if (slowPointer === fastPointer) {
          setCyclePhase("find_entry");
          setCycleCodeLine(8);
          setStepInfo(`To'qnashuv Node ${slowPointer} da aniqlandi (slow == fast)! Endi slow pointer head ga (Node 0) qaytariladi.`);
          setSlowPointer(0);
        } else {
          setStepInfo(`slow (Node ${slowPointer}) va fast (Node ${fastPointer}) hali to'qnashmadi. Sikl davom etadi.`);
        }
      }
      setCycleStep(prev => prev + 1);
    } else if (cyclePhase === "find_entry") {
      if (cycleCodeLine === 8) {
        setCycleCodeLine(10);
        const nextSlow = getNext(slowPointer);
        const nextFast = getNext(fastPointer);
        setSlowPointer(nextSlow);
        setFastPointer(nextFast);
        setStepInfo(`Ikkala pointer ham 1 qadamdan surildi: slow Node ${nextSlow} ga, fast Node ${nextFast} ga.`);
      } else if (cycleCodeLine === 10) {
        if (slowPointer === fastPointer) {
          setCyclePhase("done");
          setCycleCodeLine(11);
          setStepInfo(`slow va fast Node ${slowPointer} da uchrashdi! Bu tsiklning boshlanish (kirish) nuqtasidir.`);
          stopTimer();
        } else {
          setCycleCodeLine(8);
          setStepInfo(`slow va fast hali uchrashmadi. Har biri 1 qadamdan surilishda davom etadi.`);
        }
      }
      setCycleStep(prev => prev + 1);
    } else {
      setStepInfo("Tsikl aniqlash simulyatsiyasi yakunlandi.");
      stopTimer();
    }
  };

  const handleStep = () => {
    if (activeLesson.id === "sortingSearching") {
      runSortingStep();
    } else if (activeLesson.id === "leetcodeTop") {
      runLeetcodeStep();
    } else if (activeLesson.id === "linkedLists" && llMode === "cycle") {
      runCycleStep();
    } else if (activeLesson.id === "typescriptBasics") {
      runTypeScriptStep();
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
    } else if (sortAlgo === "quick") {
      let arr = [...sortArray];
      let i = quickI;
      let j = quickJ;
      let pIdx = quickPivotIdx;
      let phase = quickPhase;
      const pivot = arr[pIdx];

      if (phase === "init") {
        setQuickI(-1);
        setQuickJ(0);
        setQuickPivotIdx(arr.length - 1);
        setQuickPhase("compare");
        setSortActive([0, arr.length - 1]);
        setSortSwap([]);
        setStepInfo(`Quick Sort (Lomuto Partition): Pivot qilib oxirgi element [${pivot}] olindi. i = -1, j = 0.`);
        return;
      }

      if (phase === "compare") {
        if (j < pIdx) {
          setSortActive([j, pIdx]);
          setSortSwap([]);
          if (arr[j] < pivot) {
            setQuickPhase("swap");
            setStepInfo(`Taqqoslash: arr[j] (${arr[j]}) < pivot (${pivot}). i indeksini oshiramiz (i = ${i + 1}) va arr[i] bilan arr[j] ni almashtirishga tayyorlaymiz.`);
            setQuickI(i + 1);
          } else {
            setQuickJ(j + 1);
            setStepInfo(`Taqqoslash: arr[j] (${arr[j]}) >= pivot (${pivot}). O'zgarishsiz qoldirilib, j oldinga suriladi.`);
          }
        } else {
          setQuickPhase("final_swap");
          setSortActive([i + 1, pIdx]);
          setStepInfo(`Sikl tugadi. Pivotni o'zining to'g'ri o'rniga qo'yish uchun arr[i + 1] (${arr[i + 1]}) bilan pivot (${pivot}) o'rni almashtiriladi.`);
        }
      } else if (phase === "swap") {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setSortArray(arr);
        setSortSwap([i, j]);
        setQuickPhase("compare");
        setQuickJ(j + 1);
        setStepInfo(`Almashtirildi: arr[i] (${arr[i]}) <-> arr[j] (${arr[j]}). j keyingi bosqichga surildi.`);
      } else if (phase === "final_swap") {
        let temp = arr[i + 1];
        arr[i + 1] = arr[pIdx];
        arr[pIdx] = temp;
        setSortArray(arr);
        setSortSwap([i + 1, pIdx]);
        setQuickPhase("done");
        setStepInfo(`Pivot to'g'ri joyga joylashdi! Lomuto partition yakunlandi. Pivot chapidagi barcha sonlar undan kichik, o'ngdagilar esa katta.`);
      } else if (phase === "done") {
        setStepInfo("Quick Sort Lomuto Partition qadami yakunlandi.");
        setSortActive([]);
        setSortSwap([]);
        setSortSorted(arr);
        stopTimer();
      }
    } else if (sortAlgo === "binary") {
      let arr = [...sortArray].sort((a, b) => a - b);
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

  const handleCustomArraySubmit = () => {
    const parsed = customArrayInput
      .split(",")
      .map(item => parseInt(item.trim()))
      .filter(item => !isNaN(item));
    if (parsed.length < 3 || parsed.length > 15) {
      setStepInfo("Xato: Massiv elementlari soni 3 va 15 oralig'ida bo'lishi kerak.");
      return;
    }
    setSortArray(parsed);
    setCustomArrayInput("");
    setSortActive([]);
    setSortSwap([]);
    setSortSorted([]);
    setSortStepIndex(0);
    setSortSearchLow(-1);
    setSortSearchHigh(-1);
    setSortSearchMid(-1);
    setQuickI(-1);
    setQuickJ(0);
    setQuickPivotIdx(parsed.length - 1);
    setQuickPhase("init");
    setStepInfo(`Yangi massiv kiritildi: [${parsed.join(", ")}].`);
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

  const runTypeScriptStep = () => {
    if (tsStep === 0) {
      setTsStep(1);
      setTsStepDetail("Bosqich 1: Sintaksis tahlil va Tiplarni tekshirish (Type Checking). Kompilyator har bir o'zgaruvchini tipiga mosligini tekshirmoqda...");
      setStepInfo("Tiplar tekshirilmoqda. Hech qanday xatolik topilmadi!");
    } else if (tsStep === 1) {
      setTsStep(2);
      setTsStepDetail("Bosqich 2: Tiplarni o'chirish (Type Erasure). TypeScript tiplari (interface, type annotations) faqat kompilyatsiya vaqtida mavjud bo'ladi, runtimeda esa butunlay o'chiriladi.");
      setStepInfo("Tiplar o'chirilmoqda. Faqat toza JS kodining o'zi qoladi.");
    } else if (tsStep === 2) {
      setTsStep(3);
      setTsStepDetail("Bosqich 3: JS fayl yaratildi. Ushbu JS kodi brauzerlar va Node.js tomonidan bevosita ishga tushiriladi.");
      setStepInfo("Kompilyatsiya tugadi!");
      stopTimer();
    } else {
      setTsStep(0);
      setTsStepDetail("Kompilyatsiyani boshlash uchun 'Play' yoki 'Qadam' tugmasini bosing.");
      setStepInfo("Tayyor.");
    }
  };

  // Helper: Recursive BST node positions coordinate calculator
  const getBstNodesAndEdges = (node, x = 300, y = 40, level = 0, dx = 120) => {
    if (!node) return { nodes: [], edges: [] };

    const nodes = [{ value: node.value, x, y }];
    const edges = [];

    if (node.left) {
      const leftX = x - dx;
      const leftY = y + 60;
      edges.push({ x1: x, y1: y, x2: leftX, y2: leftY });
      const leftData = getBstNodesAndEdges(node.left, leftX, leftY, level + 1, dx / 1.7);
      nodes.push(...leftData.nodes);
      edges.push(...leftData.edges);
    }

    if (node.right) {
      const rightX = x + dx;
      const rightY = y + 60;
      edges.push({ x1: x, y1: y, x2: rightX, y2: rightY });
      const rightData = getBstNodesAndEdges(node.right, rightX, rightY, level + 1, dx / 1.7);
      nodes.push(...rightData.nodes);
      edges.push(...rightData.edges);
    }

    return { nodes, edges };
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
          <div className="vis-ll-layout flex flex-col w-full">
            <div className="vis-controls flex gap-2 mb-4">
              <button
                className={`px-3 py-1.5 rounded text-sm ${llMode === "basic" ? "bg-amber-500 text-slate-950 font-semibold" : "bg-slate-800 text-slate-300"}`}
                onClick={() => {
                  setLlMode("basic");
                  handleReset();
                }}
              >
                Oddiy Linked List
              </button>
              <button
                className={`px-3 py-1.5 rounded text-sm ${llMode === "cycle" ? "bg-amber-500 text-slate-950 font-semibold" : "bg-slate-800 text-slate-300"}`}
                onClick={() => {
                  setLlMode("cycle");
                  handleReset();
                }}
              >
                Floyd's Cycle Detection
              </button>
            </div>

            {llMode === "basic" ? (
              <div className="w-full">
                <div className="vis-controls flex gap-2 mb-4">
                  <input
                    type="number"
                    placeholder="Qiymat"
                    className="bg-slate-800 text-slate-100 border border-slate-700 px-2.5 py-1.5 rounded w-24 text-sm"
                    value={llInput}
                    onChange={(e) => setLlInput(e.target.value)}
                  />
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-sm border border-slate-700" onClick={handleLLPrepend}>Head (Boshiga)</button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-sm border border-slate-700" onClick={handleLLAppend}>Tail (Oxiriga)</button>
                  <button className="bg-red-950/65 text-red-200 hover:bg-red-900/80 px-3 py-1.5 rounded text-sm border border-red-900/60" onClick={handleLLDelete}>O'chirish</button>
                </div>
                <div className="ll-nodes-chain flex items-center gap-2 overflow-x-auto py-8">
                  {linkedListNodes.map((node, idx) => (
                    <div className="ll-node-container flex items-center gap-1" key={node.id}>
                      <div className="relative flex flex-col items-center">
                        {idx === 0 && (
                          <span className="absolute -top-6 bg-blue-600/90 text-slate-100 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Head</span>
                        )}
                        {idx === linkedListNodes.length - 1 && (
                          <span className="absolute -top-6 bg-cyan-600/90 text-slate-100 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Tail</span>
                        )}
                        <div className="ll-node-box bg-slate-800/85 border border-slate-700 rounded-lg p-2 flex items-center shadow-lg text-sm">
                          <div className="ll-node-value font-semibold px-2 text-amber-400">{node.value}</div>
                          <div className="w-[1px] h-6 bg-slate-700"></div>
                          <div className="text-[11px] text-slate-400 px-2">next</div>
                        </div>
                      </div>
                      {idx < linkedListNodes.length - 1 ? (
                        <div className="ll-arrow text-slate-500 text-lg">➔</div>
                      ) : (
                        <div className="ll-arrow-null text-red-400/85 text-xs font-mono">➔ null</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="floyd-grid-container">
                <div className="floyd-visualizer-panel">
                  <div className="floyd-sliders-row">
                    <div className="floyd-slider-wrapper">
                      <label>
                        <span>Length:</span>
                        <span style={{ fontWeight: 600, color: "var(--accent)" }}>{cycleLength}</span>
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="12"
                        value={cycleLength}
                        onChange={(e) => {
                          const len = parseInt(e.target.value);
                          setCycleLength(len);
                          if (cycleEntry >= len) setCycleEntry(len - 1);
                          handleReset();
                        }}
                      />
                    </div>
                    <div className="floyd-slider-wrapper">
                      <label>
                        <span>Cycle Entry:</span>
                        <span style={{ fontWeight: 600, color: "var(--accent)" }}>Node {cycleEntry}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max={cycleLength - 1}
                        value={cycleEntry}
                        onChange={(e) => {
                          setCycleEntry(parseInt(e.target.value));
                          handleReset();
                        }}
                      />
                    </div>
                  </div>

                  <div className="floyd-canvas">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {Array.from({ length: cycleLength }).map((_, i) => {
                        const getCoords = (idx) => {
                          const entry = Number(cycleEntry) || 0;
                          const len = Number(cycleLength) || 8;
                          const safeIdx = Number(idx) || 0;
                          if (safeIdx < entry) {
                            return { x: 60 + safeIdx * 85, y: 140 };
                          } else {
                            const loopNodes = Math.max(1, len - entry);
                            const r = 70;
                            const cx = 60 + entry * 85 + r;
                            const cy = 140;
                            const angle = Math.PI + ((safeIdx - entry) * (2 * Math.PI / loopNodes));
                            return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
                          }
                        };

                        const current = getCoords(i);
                        const nextIndex = (i === cycleLength - 1) ? cycleEntry : i + 1;
                        const next = getCoords(nextIndex);

                        const dx = next.x - current.x;
                        const dy = next.y - current.y;
                        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                        
                        const shrink = 18;
                        const startX = current.x + (dx / dist) * shrink;
                        const startY = current.y + (dy / dist) * shrink;
                        const endX = next.x - (dx / dist) * (shrink + 4);
                        const endY = next.y - (dy / dist) * (shrink + 4);

                        const isBackedge = i === cycleLength - 1;

                        return (
                          <g key={i}>
                            <defs>
                              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
                              </marker>
                              <marker id="arrow-cycle" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06b6d4" />
                              </marker>
                            </defs>
                            <path
                              d={isBackedge 
                                ? `M ${startX} ${startY} Q ${(current.x + next.x)/2} ${current.y + 60} ${endX} ${endY}`
                                : `M ${startX} ${startY} L ${endX} ${endY}`
                              }
                              stroke={isBackedge ? "#06b6d4" : "#475569"}
                              strokeWidth="2"
                              fill="none"
                              markerEnd={isBackedge ? "url(#arrow-cycle)" : "url(#arrow)"}
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {Array.from({ length: cycleLength }).map((_, i) => {
                      const getCoords = (idx) => {
                        const entry = Number(cycleEntry) || 0;
                        const len = Number(cycleLength) || 8;
                        const safeIdx = Number(idx) || 0;
                        if (safeIdx < entry) {
                          return { x: 60 + safeIdx * 85, y: 140 };
                        } else {
                          const loopNodes = Math.max(1, len - entry);
                          const r = 70;
                          const cx = 60 + entry * 85 + r;
                          const cy = 140;
                          const angle = Math.PI + ((safeIdx - entry) * (2 * Math.PI / loopNodes));
                          return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
                        }
                      };

                      const { x, y } = getCoords(i);
                      const isSlowHere = slowPointer === i && cycleStep > 0;
                      const isFastHere = fastPointer === i && cycleStep > 0;
                      const isBothHere = isSlowHere && isFastHere;

                      return (
                        <div
                          key={i}
                          style={{ left: x - 18, top: y - 18 }}
                          className={`absolute w-9 h-9 rounded-full flex items-center justify-center border text-xs font-semibold shadow-md z-10 transition-all duration-300 ${
                            isBothHere
                              ? "bg-amber-500 border-amber-600 text-slate-950 scale-110 ring-4 ring-amber-500/20"
                              : isSlowHere
                              ? "bg-blue-600 border-blue-700 text-slate-100 scale-105"
                              : isFastHere
                              ? "bg-cyan-500 border-cyan-600 text-slate-950 scale-105"
                              : "bg-slate-800 border-slate-700 text-slate-300"
                          }`}
                        >
                          {i}

                          {/* Pointer tags */}
                          {(isSlowHere || isFastHere) && (
                            <div className="absolute -top-7 flex flex-col items-center gap-0.5">
                              {isBothHere ? (
                                <span className="bg-amber-500 text-slate-950 text-[9px] px-1 rounded font-bold uppercase shadow">Both</span>
                              ) : (
                                <>
                                  {isSlowHere && <span className="bg-blue-600 text-slate-100 text-[9px] px-1 rounded font-bold uppercase shadow">Slow</span>}
                                  {isFastHere && <span className="bg-cyan-500 text-slate-950 text-[9px] px-1 rounded font-bold uppercase shadow">Fast</span>}
                                </>
                              )}
                            </div>
                          )}
                          {i === cycleEntry && (
                            <span className="absolute -bottom-5 text-[9px] text-cyan-400 font-semibold tracking-wider uppercase">Entry</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="floyd-sidebar-panel">
                  <div>
                    <h5>Metrics</h5>
                    <div className="floyd-metrics-grid">
                      <div className="floyd-metric-card">
                        <span className="label">Steps</span>
                        <span className="val">{cycleStep}</span>
                      </div>
                      <div className="floyd-metric-card">
                        <span className="label">Has Cycle</span>
                        <span className="val" style={{ color: cyclePhase !== "collision" ? "#4caf50" : "#ff9800" }}>
                          {cyclePhase !== "collision" ? "YES" : "RUNNING"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5>Floyd's algorithm</h5>
                    <div className="floyd-code-container">
                      <div className={`floyd-code-line ${cycleCodeLine === 0 ? "active" : ""}`}>detectCycle(head):</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 2 ? "active" : ""}`}>  slow = head; fast = head</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 3 ? "active" : ""}`}>  while fast and fast.next:</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 4 && cyclePhase === "collision" ? "active" : ""}`}>    slow = slow.next</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 4 && cyclePhase === "collision" ? "active" : ""}`}>    fast = fast.next.next</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 6 ? "active" : ""}`}>    if slow == fast: break</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 8 && cyclePhase === "find_entry" ? "active" : ""}`}>  slow = head</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 8 && cyclePhase === "find_entry" ? "active" : ""}`}>  while slow != fast:</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 10 ? "active" : ""}`}>    slow = slow.next; fast = fast.next</div>
                      <div className={`floyd-code-line ${cycleCodeLine === 11 ? "active" : ""}`}>  return slow</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
        {activeLesson.id === "binarySearchTree" && (() => {
          const { nodes, edges } = getBstNodesAndEdges(bstRoot, 300, 40, 0, 120);
          return (
            <div className="vis-bst-layout flex flex-col items-center w-full">
              <div className="vis-controls flex gap-2 mb-4">
                <input
                  type="number"
                  placeholder="Qiymat"
                  className="bg-slate-800 text-slate-100 border border-slate-700 px-2.5 py-1.5 rounded w-24 text-sm"
                  value={bstInput}
                  onChange={(e) => setBstInput(e.target.value)}
                />
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-sm border border-slate-700" onClick={handleBSTInsert}>Kiritish</button>
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-sm border border-slate-700" onClick={handleBSTSearch}>Qidirish</button>
              </div>
              <div className="bst-tree-viewport bg-slate-950/45 border border-slate-900 rounded-xl p-4 flex justify-center w-full max-w-[640px] overflow-x-auto">
                <svg className="w-[600px] h-[300px]" viewBox="0 0 600 300">
                  {edges.map((edge, idx) => (
                    <line
                      key={`edge-${idx}`}
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke="#475569"
                      strokeWidth="2"
                    />
                  ))}
                  {nodes.map((n, idx) => {
                    const isActive = bstPath.includes(n.value) || bstActiveValue === n.value;
                    return (
                      <g key={`node-${idx}`}>
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r="18"
                          fill={isActive ? "#f59e0b" : "#1e293b"}
                          stroke={isActive ? "#d97706" : "#334155"}
                          strokeWidth="2"
                          className="transition-all duration-300"
                        />
                        <text
                          x={n.x}
                          y={n.y + 4}
                          textAnchor="middle"
                          fill={isActive ? "#020617" : "#e2e8f0"}
                          className="text-[11px] font-bold font-mono transition-all duration-300"
                        >
                          {n.value}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          );
        })()}

        {/* SORTING & SEARCHING VISUALIZATION */}
        {activeLesson.id === "sortingSearching" && (
          <div className="vis-sort-layout w-full flex flex-col items-center">
            <div className="vis-controls flex flex-col items-center gap-3 mb-6 w-full">
              <div className="flex gap-2">
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
                  className={sortAlgo === "quick" ? "active" : ""}
                  onClick={() => {
                    setSortAlgo("quick");
                    handleReset();
                    setStepInfo("Quick Sort (Lomuto Partition) tanlandi. Play yoki Step bosing.");
                  }}
                >
                  Quick Sort
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
              </div>
              <div className="flex gap-2 items-center flex-wrap justify-center">
                <input
                  type="text"
                  placeholder="Masalan: 35, 12, 45, 8, 22"
                  className="bg-slate-800 text-slate-100 border border-slate-700 px-2.5 py-1.5 rounded text-sm w-52"
                  value={customArrayInput}
                  onChange={(e) => setCustomArrayInput(e.target.value)}
                />
                <button
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-sm border border-slate-700 font-semibold transition-all"
                  onClick={handleCustomArraySubmit}
                >
                  Massiv Kiritish
                </button>
              </div>
              {sortAlgo === "binary" && (
                <div style={{ margin: "5px 0" }}>
                  <label className="text-xs text-slate-400">Izlanayotgan son (target): </label>
                  <input
                    type="number"
                    style={{ width: "60px" }}
                    className="bg-slate-800 text-slate-100 border border-slate-700 px-2 py-1 rounded text-sm"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
                  />
                </div>
              )}
            </div>

            <div className="sort-bars-container flex items-end justify-center gap-2 h-48 w-full max-w-[500px] border-b border-slate-700 pb-2">
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
                    className={`sort-bar-wrapper flex flex-col items-center flex-1 max-w-[40px] transition-all duration-300 ${isOutOfRange ? "opacity-15" : ""}`}
                    key={idx}
                  >
                    <div
                      className={`sort-bar w-full rounded-t-sm flex items-start justify-center pt-2 transition-all duration-300 ${barClass}`}
                      style={{ height: `${Math.min(130, val * 2.5)}px` }}
                    >
                      <span className="sort-bar-val text-[9px] font-bold text-slate-200 font-mono">{val}</span>
                    </div>
                    {sortAlgo === "quick" && (
                      <div className="text-[9px] font-mono mt-1 h-8 flex flex-col items-center">
                        {idx === quickPivotIdx && <span className="text-cyan-400 font-bold uppercase tracking-tighter">piv</span>}
                        {idx === quickI && <span className="text-blue-400 font-bold uppercase">i</span>}
                        {idx === quickJ && <span className="text-amber-500 font-bold uppercase">j</span>}
                      </div>
                    )}
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

        {activeLesson.id === "typescriptBasics" && (() => {
          const currentSnippet = tsSnippets[tsSnippetKey];
          const renderCodeWithErasure = (code, erasedItems, showErasure) => {
            if (!showErasure) return code;
            const sortedErased = [...erasedItems].sort((a, b) => b.length - a.length);
            const escaped = sortedErased.map(item => item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
            const regex = new RegExp(`(${escaped.join("|")})`, 'g');
            const parts = code.split(regex);
            return parts.map((part, index) => {
              if (sortedErased.includes(part)) {
                return (
                  <span key={index} className="line-through text-rose-500 bg-rose-500/10 px-0.5 rounded transition-all duration-1000">
                    {part}
                  </span>
                );
              }
              return part;
            });
          };

          return (
            <div className="vis-ts-layout w-full flex flex-col items-center">
              <div className="vis-controls flex gap-2 mb-4 flex-wrap justify-center">
                {Object.keys(tsSnippets).map((key) => (
                  <button
                    key={key}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                      tsSnippetKey === key
                        ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                    }`}
                    onClick={() => {
                      setTsSnippetKey(key);
                      setTsStep(0);
                      setTsStepDetail("Kompilyatsiyani boshlash uchun 'Play' yoki 'Qadam' tugmasini bosing.");
                      setIsPlaying(false);
                    }}
                  >
                    {tsSnippets[key].title}
                  </button>
                ))}
              </div>

              {/* Status/Step Box */}
              <div className="w-full max-w-[680px] bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 mb-5 backdrop-blur-sm shadow-inner transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    tsStep === 1 ? "bg-amber-500 animate-ping" : 
                    tsStep === 2 ? "bg-cyan-500 animate-pulse" : 
                    tsStep === 3 ? "bg-emerald-500" : "bg-slate-600"
                  }`} />
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">
                    {tsStep === 0 ? "Kompilyator kutilmoqda" :
                     tsStep === 1 ? "Bosqich 1: Sintaksis & Tiplarni tekshirish" :
                     tsStep === 2 ? "Bosqich 2: Tiplarni o'chirish (Type Erasure)" :
                     "Bosqich 3: Muvaffaqiyatli transpile qilindi"}
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">{tsStepDetail}</p>
              </div>

              {/* Code Editors Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[680px] font-mono text-xs">
                {/* Left Side: TS */}
                <div className="flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-900 flex justify-between items-center">
                    <span className="text-blue-400 font-bold">TypeScript (.ts)</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-bold">SOURCE</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed min-h-[220px] whitespace-pre-wrap select-none text-left">
                    <code>
                      {renderCodeWithErasure(currentSnippet.ts, currentSnippet.erased, tsStep === 2)}
                    </code>
                  </pre>
                </div>

                {/* Right Side: JS */}
                <div className="flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-900 flex justify-between items-center">
                    <span className="text-amber-500 font-bold">JavaScript (.js)</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-bold">OUTPUT</span>
                  </div>
                  <div className="p-4 overflow-x-auto min-h-[220px] flex items-center justify-center text-center">
                    {tsStep < 3 ? (
                      <div className="text-slate-500 flex flex-col items-center gap-3 py-8">
                        {tsStep === 1 ? (
                          <>
                            <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                            <p className="font-sans text-[11px] animate-pulse">Tip tekshiruvi ketmoqda...</p>
                          </>
                        ) : tsStep === 2 ? (
                          <>
                            <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                            <p className="font-sans text-[11px] animate-pulse">JS kod generatsiya qilinmoqda...</p>
                          </>
                        ) : (
                          <p className="font-sans text-[11px]">Kompilyatsiya boshlanishi kutilmoqda</p>
                        )}
                      </div>
                    ) : (
                      <pre className="text-slate-300 text-left w-full h-full whitespace-pre-wrap select-none leading-relaxed">
                        <code>{currentSnippet.js}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
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

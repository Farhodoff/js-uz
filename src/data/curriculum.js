





















































import { callbacks as callbacksLesson } from "./lessons/advanced/callbacks";


import { fetch as fetchApi } from "./lessons/advanced/fetch";
import { localStorage as localStorageLesson } from "./lessons/advanced/localStorage";

import { modules as modulesLesson } from "./lessons/advanced/modules";

import { closures as closuresLesson } from "./lessons/advanced/closures";
import { eventLoop as eventLoopLesson } from "./lessons/advanced/eventLoop";






import { prototypes as prototypesLesson } from "./lessons/advanced/prototypes";


import { security as securityLesson } from "./lessons/advanced/security";


import { regex as regexLesson } from "./lessons/advanced/regex";



















































































































































export const curriculum = {
  beginner: {
    label: "Boshlang'ich",
    color: "#c8a96e",
    icon: "🟢",
    lessons: [{ id: "jsWhat", title: "JavaScriptga Kirish", load: () => import("./lessons/beginner/js-what.js").then(m => m.jsWhat) }, { id: "consoleMethods", title: "Console Metodlari", load: () => import("./lessons/beginner/consoleMethods.js").then(m => m.consoleMethods) }, { id: "variables", title: "O'zgaruvchilar: var, let, const", load: () => import("./lessons/beginner/variables.js").then(m => m.variables) }, { id: "dataTypesLesson", title: "Ma'lumotlar Turlari (Data Types)", load: () => import("./lessons/beginner/dataTypes.js").then(m => m.dataTypesLesson) }, { id: "moreDataTypesLesson", title: "Ma'lumotlar Turlari: Null, Symbol, BigInt", load: () => import("./lessons/beginner/moreDataTypes.js").then(m => m.moreDataTypesLesson) }, { id: "typeofLesson", title: "Typeof Operator", load: () => import("./lessons/beginner/typeof.js").then(m => m.typeofLesson) }, { id: "operators", title: "Operatorlar", load: () => import("./lessons/beginner/operators.js").then(m => m.operators) }, { id: "typeConversionLesson", title: "Type Conversion", load: () => import("./lessons/beginner/typeConversion.js").then(m => m.typeConversionLesson) }, { id: "typeCasting", title: "Explicit Type Casting", load: () => import("./lessons/beginner/typeCasting.js").then(m => m.typeCasting) }, { id: "implicitCasting", title: "Implicit Type Casting", load: () => import("./lessons/beginner/implicitCasting.js").then(m => m.implicitCasting) }, { id: "ifElseLesson", title: "Shart Operatorlari: if, else", load: () => import("./lessons/beginner/ifElse.js").then(m => m.ifElseLesson) }, { id: "switchLesson", title: "Switch-Case Operatorlari", load: () => import("./lessons/beginner/switch.js").then(m => m.switchLesson) }, { id: "equalityAlgorithms", title: "Taqqoslash va Tenglik (== vs ===)", load: () => import("./lessons/beginner/equalityAlgorithms.js").then(m => m.equalityAlgorithms) }, { id: "loops", title: "Sikllar: for, while, do-while", load: () => import("./lessons/beginner/loops.js").then(m => m.loops) }, { id: "breakContinue", title: "Sikllarni Boshqarish: break, continue", load: () => import("./lessons/beginner/breakContinue.js").then(m => m.breakContinue) }, { id: "functions", title: "Funksiyalar va Scope", load: () => import("./lessons/beginner/functions.js").then(m => m.functions) }, { id: "arrays", title: "Massivlar (Arrays) va Ularning Metodlari", load: () => import("./lessons/beginner/arrays.js").then(m => m.arrays) }, { id: "objects", title: "Obyektlar (Objects)", load: () => import("./lessons/beginner/objects.js").then(m => m.objects) }, { id: "primitivesVsObjects", title: "Primitivlar va Obyektlar (Memory)", load: () => import("./lessons/beginner/primitivesVsObjects.js").then(m => m.primitivesVsObjects) }, { id: "stringMethods", title: "String Metodlari", load: () => import("./lessons/beginner/stringMethods.js").then(m => m.stringMethods) }, { id: "mathObject", title: "Math Obyekti va Matematik Metodlar", load: () => import("./lessons/beginner/mathObject.js").then(m => m.mathObject) }, { id: "templateLiterals", title: "Template Literals (Backticks)", load: () => import("./lessons/beginner/templateLiterals.js").then(m => m.templateLiterals) }, { id: "scopeLesson", title: "Scope (Ko'rinish Sohalari)", load: () => import("./lessons/beginner/scope.js").then(m => m.scopeLesson) }, { id: "globalScopeLesson", title: "Global Scope", load: () => import("./lessons/beginner/globalScope.js").then(m => m.globalScopeLesson) }, { id: "functionScopeLesson", title: "Function Scope", load: () => import("./lessons/beginner/functionScope.js").then(m => m.functionScopeLesson) }, { id: "blockScopeLesson", title: "Blok Ko'lami (Block Scope)", load: () => import("./lessons/beginner/blockScope.js").then(m => m.blockScopeLesson) }, { id: "hoistingThisLesson", title: "Hoisting", load: () => import("./lessons/beginner/hoistingThis.js").then(m => m.hoistingThisLesson) }, { id: "executionContextLesson", title: "Bajarilish Konteksti (Execution Context)", load: () => import("./lessons/beginner/executionContext.js").then(m => m.executionContextLesson) }, { id: "jsGotchas", title: "JavaScript Gotchas (Tuzoqlar)", load: () => import("./lessons/beginner/gotchas.js").then(m => m.jsGotchas) }, { id: "dateObject", title: "Date Obyekti va Vaqt (Sana)", load: () => import("./lessons/beginner/dateObject.js").then(m => m.dateObject) }, { id: "cheat-sheet", title: "⚡ JS Cheat Sheet (To'liq ma'lumotnoma)", load: () => import("./lessons/beginner/cheatSheet.js").then(m => m.cheatSheet) }, { id: "interviewQuestionsBeginner", title: "🟢 Interview Savollar (Boshlang'ich)", load: () => import("./lessons/beginner/interviewQuestions.js").then(m => m.interviewQuestionsBeginner) }]
  },
  intermediate: {
    label: "O'rta daraja",
    color: "#e5b84f",
    icon: "🟡",
    lessons: [{ id: "destructuring", title: "Destructuring (Ma'lumotlarni ochish)", load: () => import("./lessons/intermediate/destructuring.js").then(m => m.destructuring) }, { id: "spreadRest", title: "Spread va Rest (...) - Yoyish va Yig'ish", load: () => import("./lessons/intermediate/spreadRest.js").then(m => m.spreadRest) }, { id: "arrowFunctions", title: "Arrow Functions (Arrow funksiyalar)", load: () => import("./lessons/intermediate/arrowFunctions.js").then(m => m.arrowFunctions) }, { id: "thisKeyword", title: "This Keyword va Context Binding", load: () => import("./lessons/intermediate/thisKeyword.js").then(m => m.thisKeyword) }, { id: "higherOrderArrays", title: "Massivlar uchun Higher Order Metodlar", load: () => import("./lessons/intermediate/higherOrderArrays.js").then(m => m.higherOrderArrays) }, { id: "immutableData", title: "Immutability va Deep vs Shallow Copy", load: () => import("./lessons/intermediate/immutableData.js").then(m => m.immutableData) }, { id: "dom", title: "DOM Asoslari va Hujjat Daraxti (Document Object Model)", load: () => import("./lessons/intermediate/dom.js").then(m => m.dom) }, { id: "domManipulation", title: "DOM Manipulyatsiyasi: Elementlar Yaratish va Boshqarish", load: () => import("./lessons/intermediate/domManipulation.js").then(m => m.domManipulation) }, { id: "events", title: "Brauzer Hodisalari va Event Handling (Events)", load: () => import("./lessons/intermediate/events.js").then(m => m.events) }, { id: "forms", title: "Formalar bilan Ishlash, Validatsiya va FormData API (Forms)", load: () => import("./lessons/intermediate/forms.js").then(m => m.forms) }, { id: "timers", title: "Vaqt funksiyalari (Timers)", load: () => import("./lessons/intermediate/timers.js").then(m => m.timers) }, { id: "optionalChaining", title: "Optional Chaining & Nullish Coalescing", load: () => import("./lessons/intermediate/optionalChaining.js").then(m => m.optionalChaining) }, { id: "classes", title: "Classes (Klasslar) - OOP", load: () => import("./lessons/intermediate/classes.js").then(m => m.classes) }, { id: "strictMode", title: "Qat'iy Rejim (Strict Mode)", load: () => import("./lessons/intermediate/strictMode.js").then(m => m.strictMode) }, { id: "symbolType", title: "Symbol Ma'lumot Turi", load: () => import("./lessons/intermediate/symbolType.js").then(m => m.symbolType) }, { id: "q2", title: "🟡 Interview Savollar (O'rta daraja)", load: () => import("./lessons/intermediate/interviewQuestions.js").then(m => m.interviewQuestionsIntermediate) }, { id: "canvas", title: "HTML5 Canvas API", load: () => import("./lessons/intermediate/canvas.js").then(m => m.canvas) }, { id: "audioVideo", title: "Audio va Video API: Media Elementlarini Boshqarish", load: () => import("./lessons/intermediate/audioVideo.js").then(m => m.audioVideo) }, { id: "mapSetWeak", title: "Map, Set, WeakMap va WeakSet", load: () => import("./lessons/intermediate/mapSetWeak.js").then(m => m.mapSetWeak) }, { id: "es6Features", title: "ES6+ Yangi Imkoniyatlari", load: () => import("./lessons/intermediate/es6Features.js").then(m => m.es6Features) }, { id: "intlApi", title: "Internationalization (Intl) API", load: () => import("./lessons/intermediate/intlApi.js").then(m => m.intlApi) }, { id: "objectMethods", title: "Object Metodlari: keys, values va entries", load: () => import("./lessons/intermediate/objectMethods.js").then(m => m.objectMethods) }]
  },
  advanced: {
    label: "Murakkab",
    color: "#e07b5a",
    icon: "🔴",
    lessons: [closuresLesson, { id: "closuresDeepDive", title: "Closures: Amaliy Tahlil va Xotira Boshqaruvi", load: () => import("./lessons/advanced/closuresDeepDive.js").then(m => m.closuresDeepDive) }, prototypesLesson, callbacksLesson, { id: "promises", title: "Promises (Va'dalar) va Zanjirli asinxronlik", load: () => import("./lessons/advanced/promises.js").then(m => m.promises) }, { id: "asyncAwait", title: "Async/Await — Asinxronlikning Cho'qqisi", load: () => import("./lessons/advanced/asyncAwait.js").then(m => m.asyncAwait) }, eventLoopLesson, { id: "eventLoopDeep", title: "Event Loop chuqur tahlili va Microtasks/Macrotasks", load: () => import("./lessons/advanced/eventLoopDeep.js").then(m => m.eventLoopDeep) }, fetchApi, { id: "advancedFetch", title: "Advanced Fetch, so'rov sozlamalari va aborting", load: () => import("./lessons/advanced/advancedFetch.js").then(m => m.advancedFetch) }, { id: "errorHandling", title: "Xatolarni Boshqarish: try, catch, finally", load: () => import("./lessons/advanced/errorHandling.js").then(m => m.errorHandling) }, modulesLesson, localStorageLesson, { id: "debugging", title: "Javascript-da Debugging va Xatolarni aniqlash", load: () => import("./lessons/advanced/debugging.js").then(m => m.debugging) }, { id: "webSockets", title: "WebSockets: Real-time Ikki Tomonlama Aloqa", load: () => import("./lessons/advanced/webSockets.js").then(m => m.webSockets) }, { id: "serverSentEvents", title: "Server-Sent Events (SSE): Bir Tomonlama Real-time Oqim", load: () => import("./lessons/advanced/serverSentEvents.js").then(m => m.serverSentEvents) }, { id: "webWorkers", title: "Web Workers: Fon Rejimida Ko'p Oqimli Ishlash", load: () => import("./lessons/advanced/webWorkers.js").then(m => m.webWorkers) }, { id: "serviceWorkersPwa", title: "Service Workers va Progressive Web Apps (PWA)", load: () => import("./lessons/advanced/serviceWorkersPwa.js").then(m => m.serviceWorkersPwa) }, regexLesson, { id: "iteratorsGenerators", title: "Iterators va Generators", load: () => import("./lessons/advanced/iteratorsGenerators.js").then(m => m.iteratorsGenerators) }, { id: "metaprogramming", title: "Metaprogramming: Proxy va Reflect", load: () => import("./lessons/advanced/metaprogramming.js").then(m => m.metaprogramming) }, { id: "debounceThrottle", title: "Debounce va Throttle: Hodisalarni Optimal Boshqarish", load: () => import("./lessons/advanced/debounceThrottle.js").then(m => m.debounceThrottle) }, { id: "jsPitfalls", title: "JS Pitfalls: Ko'p uchraydigan xatolar va tuzoqlar", load: () => import("./lessons/advanced/jsPitfalls.js").then(m => m.jsPitfalls) }, { id: "problem-solving", title: "Muammolarni Yechish va Algoritmlar (Problem Solving & Algorithms)", load: () => import("./lessons/advanced/problemSolving.js").then(m => m.problemSolving) }, { id: "a13", title: "Design Patterns: Singleton, Factory, Observer, Decorator, Strategy", load: () => import("./lessons/advanced/designPatterns.js").then(m => m.designPatterns) }, { id: "a14", title: "Functional Programming (Funksional dasturlash)", load: () => import("./lessons/advanced/functionalProgramming.js").then(m => m.functionalProgramming) }, { id: "memoryManagement", title: "Memory Management (Xotira boshqaruvi) va Garbage Collection", load: () => import("./lessons/advanced/memoryManagement.js").then(m => m.memoryManagement) }, { id: "performanceOptimization", title: "JavaScript Unumdorligini Oshirish (Performance Optimization)", load: () => import("./lessons/advanced/performanceOptimization.js").then(m => m.performanceOptimization) }, securityLesson, { id: "unitTesting", title: "Javascript-da Unit Testing va Jest asoslari", load: () => import("./lessons/advanced/unitTesting.js").then(m => m.unitTesting) }, { id: "higherOrderFunctions", title: "Higher-Order Functions va Currying", load: () => import("./lessons/intermediate/higherOrderFunctions.js").then(m => m.higherOrderFunctions) }, { id: "typedArrays", title: "Typed Arrays va DataView", load: () => import("./lessons/advanced/typedArrays.js").then(m => m.typedArrays) }, { id: "q3", title: "🔴 Interview Savollar (Murakkab)", load: () => import("./lessons/advanced/interviewQuestions.js").then(m => m.interviewQuestionsAdvanced) }, { id: "webComponents", title: "Web Components va Shadow DOM", load: () => import("./lessons/advanced/webComponents.js").then(m => m.webComponents) }, { id: "advancedWebStorage", title: "Kengaytirilgan Web Storage: IndexedDB va Cookies", load: () => import("./lessons/advanced/advancedWebStorage.js").then(m => m.advancedWebStorage) }, { id: "advancedWebApis", title: "Advanced Web APIs (Intersection & Mutation Observer)", load: () => import("./lessons/advanced/advancedWebApis.js").then(m => m.advancedWebApis) }, { id: "binaryData", title: "Binary Data va File API (Blob, File, FileReader, ArrayBuffer)", load: () => import("./lessons/advanced/binaryData.js").then(m => m.binaryData) }, { id: "webAnimations", title: "Web Animations API va requestAnimationFrame", load: () => import("./lessons/advanced/webAnimations.js").then(m => m.webAnimations) }, { id: "historyRouting", title: "History API va Single Page Application (SPA) Routing", load: () => import("./lessons/advanced/historyRouting.js").then(m => m.historyRouting) }, { id: "asyncPolyfills", title: "Asinxron Dasturlash va Promise Polyfill-lar", load: () => import("./lessons/advanced/asyncPolyfills.js").then(m => m.asyncPolyfills) }, { id: "reactivePatterns", title: "Dasturlash Patternlari va Reaktiv Tizimlar (Proxy & PubSub)", load: () => import("./lessons/advanced/reactivePatterns.js").then(m => m.reactivePatterns) }, { id: "performanceAlgos", title: "Samaradorlik va Optimallashtirish Algoritmlari (Caching & Limits)", load: () => import("./lessons/advanced/performanceAlgos.js").then(m => m.performanceAlgos) }, { id: "integrationE2eTesting", title: "JavaScript-da Integratsion va E2E (End-to-End) Testlash", load: () => import("./lessons/advanced/integrationE2eTesting.js").then(m => m.integrationE2eTesting) }, { id: "v8CompilerOptimization", title: "V8 Dvigateli: Kompilyatsiya va Optimizatsiya", load: () => import("./lessons/advanced/v8CompilerOptimization.js").then(m => m.v8CompilerOptimization) }, { id: "v8GarbageCollection", title: "V8 Garbage Collection va Xotira Boshqaruvi", load: () => import("./lessons/advanced/v8GarbageCollection.js").then(m => m.v8GarbageCollection) }, { id: "advancedTaskScheduling", title: "Advanced Task Scheduling va Event Loop", load: () => import("./lessons/advanced/advancedTaskScheduling.js").then(m => m.advancedTaskScheduling) }, { id: "webAssemblyIntegration", title: "WebAssembly Integration va Parallel Dasturlash", load: () => import("./lessons/advanced/webAssemblyIntegration.js").then(m => m.webAssemblyIntegration) }, { id: "bomAndWindow", title: "BOM (Browser Object Model) va Window API", load: () => import("./lessons/advanced/bomAndWindow.js").then(m => m.bomAndWindow) }, { id: "domPerformance", title: "DOM Performance: Reflow va Repaint", load: () => import("./lessons/advanced/domPerformance.js").then(m => m.domPerformance) }, { id: "dragAndDrop", title: "HTML5 Drag and Drop API", load: () => import("./lessons/advanced/dragAndDrop.js").then(m => m.dragAndDrop) }, { id: "selectionRange", title: "Selection va Range API", load: () => import("./lessons/advanced/selectionRange.js").then(m => m.selectionRange) }, { id: "clipboardApi", title: "Clipboard API: Nusxalash va Joylash", load: () => import("./lessons/advanced/clipboardApi.js").then(m => m.clipboardApi) }, { id: "scrollingApis", title: "Scrolling API: Silliq Harakat va Skroll o'lchovlari", load: () => import("./lessons/advanced/scrollingApis.js").then(m => m.scrollingApis) }, { id: "a11yAria", title: "Accessibility (A11y) va ARIA DOM", load: () => import("./lessons/advanced/a11yAria.js").then(m => m.a11yAria) }, { id: "propertyDescriptors", title: "Property Descriptors (Xususiyatlarni sozlash)", load: () => import("./lessons/advanced/propertyDescriptors.js").then(m => m.propertyDescriptors) }, { id: "objectProtection", title: "Obyektlarni Himoyalash: Freeze va Seal", load: () => import("./lessons/advanced/objectProtection.js").then(m => m.objectProtection) }]
  },
  nodejs: {
    label: "Node.js Asoslari",
    color: "#68a063",
    icon: "🟩",
    lessons: [
      { id: "step1_nodejs_intro", title: "Node.js Asoslari: REPL va Global Obyekt", load: () => import("./lessons/nodejs/step1_nodejs_intro.js").then(m => m.step1_nodejs_intro) },
      { id: "step2_modules_fs", title: "Modullar (CommonJS, ESM) va File System (FS)", load: () => import("./lessons/nodejs/step2_modules_fs.js").then(m => m.step2_modules_fs) },
      { id: "step3_events_streams", title: "Events (Hodisalar), Streams va Buffers", load: () => import("./lessons/nodejs/step3_events_streams.js").then(m => m.step3_events_streams) },
      { id: "step4_http_server", title: "HTTP Moduli va Node.js da Server Yaratish", load: () => import("./lessons/nodejs/step4_http_server.js").then(m => m.step4_http_server) },
      { id: "step5_express_basics", title: "Express.js Asoslari va Routing", load: () => import("./lessons/nodejs/step5_express_basics.js").then(m => m.step5_express_basics) }
    ]
  },
  algorithms: {
    label: "Algoritmlar",
    color: "#6a73c9",
    icon: "📊",
    lessons: [{ id: "dsaBasics", title: "DSA Asoslari: O'zgaruvchilar va Xotira (Memory Layout)", load: () => import("./lessons/algorithms/dsaBasics.js").then(m => m.dsaBasics) }, { id: "dsaControlFlow", title: "Boshqaruv Oqimi va Sikl Murakkabligi (Control Flow & Loops)", load: () => import("./lessons/algorithms/dsaControlFlow.js").then(m => m.dsaControlFlow) }, { id: "dsaFunctions", title: "Funksiyalar va Rekursiya (Functions & Recursion Basics)", load: () => import("./lessons/algorithms/dsaFunctions.js").then(m => m.dsaFunctions) }, { id: "dsaInputOutput", title: "Kiritish va Chiqarish Oqimlari (Basic I/O & DSA Intro)", load: () => import("./lessons/algorithms/dsaInputOutput.js").then(m => m.dsaInputOutput) }, { id: "dsaArrays", title: "Massivlar: Statik va Dinamik Massivlar (Static & Dynamic Arrays)", load: () => import("./lessons/algorithms/dsaArrays.js").then(m => m.dsaArrays) }, { id: "dsaStrings", title: "Satrlar va Matnlar (DSA String Manipulations)", load: () => import("./lessons/algorithms/dsaStrings.js").then(m => m.dsaStrings) }, { id: "dsaHashing", title: "Xeshlash va Xesh-Jadvallar (Hashing & Hash Tables)", load: () => import("./lessons/algorithms/dsaHashing.js").then(m => m.dsaHashing) }, { id: "bigO", title: "Algoritmlar Murakkabligi (Big O)", load: () => import("./lessons/algorithms/bigO.js").then(m => m.bigO) }, { id: "linkedLists", title: "Bog'langan Ro'yxatlar (Linked Lists)", load: () => import("./lessons/algorithms/linkedLists.js").then(m => m.linkedLists) }, { id: "stacksQueues", title: "Stek va Navbat (Stacks & Queues)", load: () => import("./lessons/algorithms/stacksQueues.js").then(m => m.stacksQueues) }, { id: "binarySearchTree", title: "Ikkilik Qidiruv Daraxti (Binary Search Tree)", load: () => import("./lessons/algorithms/binarySearchTree.js").then(m => m.binarySearchTree) }, { id: "dsaTrees", title: "Daraxtlar: Iyerarxik Tuzilmalar va Aylanishlar (Trees & Traversals)", load: () => import("./lessons/algorithms/dsaTrees.js").then(m => m.dsaTrees) }, { id: "dsaHeaps", title: "Uyumlar va Navbatlar Ustuvorligi (Heaps & Priority Queues)", load: () => import("./lessons/algorithms/dsaHeaps.js").then(m => m.dsaHeaps) }, { id: "dsaGraphs", title: "Graflar va Ularni Aylanib Chiqish (Graphs, BFS & DFS)", load: () => import("./lessons/algorithms/dsaGraphs.js").then(m => m.dsaGraphs) }, { id: "dsaTries", title: "Trie: Prefiks Daraxtlari (Tries & Prefix Search)", load: () => import("./lessons/algorithms/dsaTries.js").then(m => m.dsaTries) }, { id: "dsaDSU", title: "DSU: Disjoint Set Union (Union-Find Algoritmi)", load: () => import("./lessons/algorithms/dsaDSU.js").then(m => m.dsaDSU) }, { id: "sortingSearching", title: "Saralash va Qidiruv Algoritmlari", load: () => import("./lessons/algorithms/sortingSearching.js").then(m => m.sortingSearching) }, { id: "dsaDP", title: "Dinamik Dasturlash (Dynamic Programming)", load: () => import("./lessons/algorithms/dsaDP.js").then(m => m.dsaDP) }, { id: "dsaGreedy", title: "Ochko'z Algoritmlar (Greedy Algorithms)", load: () => import("./lessons/algorithms/dsaGreedy.js").then(m => m.dsaGreedy) }, { id: "dsaBacktracking", title: "Orqaga Qaytish Algoritmlari (Backtracking)", load: () => import("./lessons/algorithms/dsaBacktracking.js").then(m => m.dsaBacktracking) }, { id: "dsaDivideConquer", title: "Bo'lib Tashla va Hukmronlik Qil (Divide and Conquer)", load: () => import("./lessons/algorithms/dsaDivideConquer.js").then(m => m.dsaDivideConquer) }, { id: "dsaGraphAlgos", title: "Murakkab Graf Algoritmlari (Dijkstra, Bellman-Ford, Kruskal, Prim)", load: () => import("./lessons/algorithms/dsaGraphAlgos.js").then(m => m.dsaGraphAlgos) }, { id: "dsaStringAlgos", title: "Satrlar bilan Ishlash Algoritmlari (KMP, Rabin-Karp, Z-Algorithm)", load: () => import("./lessons/algorithms/dsaStringAlgos.js").then(m => m.dsaStringAlgos) }, { id: "dsaAdvancedDP", title: "Murakkab Dinamik Dasturlash (Bitmask DP, Digit DP, DP on Trees)", load: () => import("./lessons/algorithms/dsaAdvancedDP.js").then(m => m.dsaAdvancedDP) }, { id: "dsaAdvancedGraph", title: "Murakkab Graf Strukturasi (Tarjan, Kosaraju, Euler & Hamilton Cycles, Network Flow)", load: () => import("./lessons/algorithms/dsaAdvancedGraph.js").then(m => m.dsaAdvancedGraph) }, { id: "dsaGeometry", title: "Geometrik Algoritmlar (Convex Hull, Line Intersection, Sweep Line)", load: () => import("./lessons/algorithms/dsaGeometry.js").then(m => m.dsaGeometry) }, { id: "leetcodeTop", title: "Top Interview LeetCode Masalalari", load: () => import("./lessons/algorithms/leetcodeTop.js").then(m => m.leetcodeTop) }, { id: "leetcodeStrings", title: "LeetCode: String (Satr) Algoritmlari", load: () => import("./lessons/algorithms/leetcodeStrings.js").then(m => m.leetcodeStrings) }, { id: "leetcodeArrays", title: "LeetCode: Array (Massiv) Algoritmlari", load: () => import("./lessons/algorithms/leetcodeArrays.js").then(m => m.leetcodeArrays) }, { id: "leetcodeHashMaps", title: "LeetCode: HashMap va Set Algoritmlari", load: () => import("./lessons/algorithms/leetcodeHashMaps.js").then(m => m.leetcodeHashMaps) }, { id: "dynamicProgrammingBasics", title: "LeetCode: Dynamic Programming (Dinamik Dasturlash)", load: () => import("./lessons/algorithms/dynamicProgrammingBasics.js").then(m => m.dynamicProgrammingBasics) }]
  },
  systemDesign: {
    label: "Tizimli Dizayn",
    color: "#c96ac8",
    icon: "🌐",
    lessons: [{ id: "howToLearn", title: "System Design-ni qanday o'rganish kerak? (How to Learn System Design?)", load: () => import("./lessons/system-design/howToLearn.js").then(m => m.howToLearn) }, { id: "requirements", title: "Funksional va Nofunksional Talablar (Functional vs. Non-functional Requirements)", load: () => import("./lessons/system-design/requirements.js").then(m => m.requirements) }, { id: "estimations", title: "Tizim O'lchamlarini Taxmin Qilish (Back-of-the-Envelope Estimations)", load: () => import("./lessons/system-design/estimations.js").then(m => m.estimations) }, { id: "thingsToAvoid", title: "System Design Intervyuda Yo'l Qo'yiladigan Xatolar (Things to Avoid)", load: () => import("./lessons/system-design/thingsToAvoid.js").then(m => m.thingsToAvoid) }, { id: "systemDesignQuiz", title: "Tizimli Dizayn Phase 1: Yakuniy Quiz (System Design Phase 1 Quiz)", load: () => import("./lessons/system-design/systemDesignQuiz.js").then(m => m.systemDesignQuiz) }, { id: "loadBalancingAlgorithms", title: "Yuk Taqsimlash Algoritmlari (Load Balancing Algorithms)", load: () => import("./lessons/system-design/loadBalancingAlgorithms.js").then(m => m.loadBalancingAlgorithms) }, { id: "webSecurity", title: "Veb Xavfsizlik Asoslari (Web Security)", load: () => import("./lessons/system-design/webSecurity.js").then(m => m.webSecurity) }, { id: "cachingScalability", title: "Keshlash va Tizim Kengayuvchanligi (Caching & Scalability)", load: () => import("./lessons/system-design/cachingScalability.js").then(m => m.cachingScalability) }, { id: "renderingArchitectures", title: "Veb Rendering Arxitekturalari (CSR, SSR, SSG, Hydration)", load: () => import("./lessons/system-design/renderingArchitectures.js").then(m => m.renderingArchitectures) }, { id: "dns", title: "Domain Name System (DNS) va URL Manzillar", load: () => import("./lessons/system-design/dns.js").then(m => m.dns) }, { id: "networkEssentials", title: "Tarmoq Asoslari (TCP/UDP, HTTP, Proxy)", load: () => import("./lessons/system-design/networkEssentials.js").then(m => m.networkEssentials) }, { id: "apiGateway", title: "API Gateway, Mikroxizmatlar va Ma'lumotlar Bazasi Asoslari", load: () => import("./lessons/system-design/apiGateway.js").then(m => m.apiGateway) }, { id: "apiGatewayDiscovery", title: "API Gateway va Service Discovery", load: () => import("./lessons/system-design/apiGatewayDiscovery.js").then(m => m.apiGatewayDiscovery) }, { id: "distributedCharacteristics", title: "Taqsimlangan Tizimlar Xususiyatlari (Scalability, Availability, Fault Tolerance)", load: () => import("./lessons/system-design/distributedCharacteristics.js").then(m => m.distributedCharacteristics) }, { id: "systemDesignQuiz2", title: "Tizimli Dizayn Phase 2: Yakuniy Test (Quiz & JS Challenges)", load: () => import("./lessons/system-design/systemDesignQuiz2.js").then(m => m.systemDesignQuiz2) }, { id: "consistentHashing", title: "Consistent Hashing (Barqaror Hashing)", load: () => import("./lessons/system-design/consistentHashing.js").then(m => m.consistentHashing) }, { id: "messageQueues", title: "Xabarlar Navbati va Asinxron Aloqa (Message Queues & Event-Driven)", load: () => import("./lessons/system-design/messageQueues.js").then(m => m.messageQueues) }, { id: "microservices", title: "Mikroservislar Arxitekturasi (Microservices)", load: () => import("./lessons/system-design/microservices.js").then(m => m.microservices) }, { id: "cachingRedis", title: "Keshlash va Redis (Caching & Redis)", load: () => import("./lessons/system-design/cachingRedis.js").then(m => m.cachingRedis) }, { id: "rateLimitingSecurity", title: "Rate Limiting va API Xavfsizligi (Rate Limiting & API Security)", load: () => import("./lessons/system-design/rateLimitingSecurity.js").then(m => m.rateLimitingSecurity) }, { id: "dbScalingSharding", title: "Ma'lumotlar Bazalarini Masshtablash va Sharding (DB Scaling & Sharding)", load: () => import("./lessons/system-design/dbScalingSharding.js").then(m => m.dbScalingSharding) }, { id: "microservicesServerless", title: "Mikroxizmatlar va Serverless Arxitekturasi (Microservices & Serverless)", load: () => import("./lessons/system-design/microservicesServerless.js").then(m => m.microservicesServerless) }, { id: "eventDrivenBrokers", title: "Event-Driven Architecture va Xabarlar Brokerlari (RabbitMQ & Kafka)", load: () => import("./lessons/system-design/eventDrivenBrokers.js").then(m => m.eventDrivenBrokers) }, { id: "cdnEdgeComputing", title: "CDN va Edge Computing", load: () => import("./lessons/system-design/cdnEdgeComputing.js").then(m => m.cdnEdgeComputing) }, { id: "distributedTransactions", title: "Taqsimlangan Tranzaksiyalar (Distributed Transactions)", load: () => import("./lessons/system-design/distributedTransactions.js").then(m => m.distributedTransactions) }, { id: "apiGatewayRouting", title: "API Gateway va Routing", load: () => import("./lessons/system-design/apiGatewayRouting.js").then(m => m.apiGatewayRouting) }, { id: "eventSourcingCqrs", title: "Event Sourcing va CQRS", load: () => import("./lessons/system-design/eventSourcingCqrs.js").then(m => m.eventSourcingCqrs) }, { id: "distributedConsensus", title: "Distributed Consensus (Taqsimlangan Konsensus)", load: () => import("./lessons/system-design/distributedConsensus.js").then(m => m.distributedConsensus) }, { id: "gossipProtocol", title: "Gossip Protocol (Mish-mish Protokoli)", load: () => import("./lessons/system-design/gossipProtocol.js").then(m => m.gossipProtocol) }, { id: "vectorClocks", title: "Vector Clocks va Taqsimlangan Tizimlarda Logical Clocks", load: () => import("./lessons/system-design/vectorClocks.js").then(m => m.vectorClocks) }, { id: "distributedLocking", title: "Taqsimlangan Bloklash (Distributed Locking)", load: () => import("./lessons/system-design/distributedLocking.js").then(m => m.distributedLocking) }, { id: "capPacelc", title: "CAP va PACELC Teomalari: Tarqoq Tizimlar Muvozanati", load: () => import("./lessons/system-design/capPacelc.js").then(m => m.capPacelc) }, { id: "writeReadPath", title: "Yozish va O'qish Yo'llarini Optimallashtirish (Write Path vs Read Path)", load: () => import("./lessons/system-design/writeReadPath.js").then(m => m.writeReadPath) }, { id: "heartbeatsLeases", title: "Heartbeats va Leases", load: () => import("./lessons/system-design/heartbeatsLeases.js").then(m => m.heartbeatsLeases) }, { id: "dbRelationalNoSql", title: "Ma'lumotlar Bazalari: Relational (SQL) vs NoSQL", load: () => import("./lessons/system-design/dbRelationalNoSql.js").then(m => m.dbRelationalNoSql) }, { id: "dbReplication", title: "Database Replication (Ma'lumotlar bazasi replikatsiyasi)", load: () => import("./lessons/system-design/dbReplication.js").then(m => m.dbReplication) }, { id: "resiliencePatterns", title: "Resilience Patterns (Tizim Chidamliligi)", load: () => import("./lessons/system-design/resiliencePatterns.js").then(m => m.resiliencePatterns) }, { id: "batchStreamProcessing", title: "Batch va Stream Processing (Katta ma'lumotlarni qayta ishlash)", load: () => import("./lessons/system-design/batchStreamProcessing.js").then(m => m.batchStreamProcessing) }, { id: "bloomFilters", title: "Bloom Filters va Ehtimolli Ma'lumotlar (Probabilistic Data Structures)", load: () => import("./lessons/system-design/bloomFilters.js").then(m => m.bloomFilters) }]
  },
  ecosystem: {
    label: "Ekotizim (React & Node.js)",
    color: "#6ac98e",
    icon: "⚙️",
    lessons: [
      { id: "reactBasics", title: "React.js Asoslari: Komponentlar va Hooklar", load: () => import("./lessons/ecosystem/reactBasics.js").then(m => m.reactBasics) },
      { id: "nodeExpressBasics", title: "Node.js & Express Asoslari va MongoDB Integratsiyasi", load: () => import("./lessons/ecosystem/nodeExpressBasics.js").then(m => m.nodeExpressBasics) },
      { id: "reactArchitecture", title: "React Arxitekturasi (Fiber, Reconciler, Virtual DOM)", load: () => import("./lessons/ecosystem/reactArchitecture.js").then(m => m.reactArchitecture) },
      { id: "reactStateManagement", title: "State Management Arxitekturasi", load: () => import("./lessons/ecosystem/reactStateManagement.js").then(m => m.reactStateManagement) },
      { id: "reactPerformanceBasics", title: "React Performance Asoslari", load: () => import("./lessons/ecosystem/reactPerformanceBasics.js").then(m => m.reactPerformanceBasics) },
      { id: "reactPerformanceOptimization", title: "Performance Optimization Texnikalari", load: () => import("./lessons/ecosystem/reactPerformanceOptimization.js").then(m => m.reactPerformanceOptimization) },
      { id: "reactRenderingOptimization", title: "Rendering Optimization va Listlar", load: () => import("./lessons/ecosystem/reactRenderingOptimization.js").then(m => m.reactRenderingOptimization) },
      { id: "reactAdvancedPerformance", title: "Murakkab Performance va Profiler", load: () => import("./lessons/ecosystem/reactAdvancedPerformance.js").then(m => m.reactAdvancedPerformance) },
      { id: "reactProductionArchitecture", title: "React Production Arxitekturasi (Build, Deploy, CI/CD)", load: () => import("./lessons/ecosystem/reactProductionArchitecture.js").then(m => m.reactProductionArchitecture) },
      { id: "nodeArchitecture", title: "Node.js Arxitekturasi va Event Loop", load: () => import("./lessons/ecosystem/nodeArchitecture.js").then(m => m.nodeArchitecture) },
      { id: "dockerBasics", title: "Docker Asoslari (Konteynerlashtirish)", load: () => import("./lessons/ecosystem/dockerBasics.js").then(m => m.dockerBasics) },
      { id: "ciCdGithubActions", title: "CI/CD va GitHub Actions", load: () => import("./lessons/ecosystem/ciCdGithubActions.js").then(m => m.ciCdGithubActions) },
      { id: "dockerComposeDb", title: "Docker Compose va Ma'lumotlar Bazasi Integratsiyasi", load: () => import("./lessons/ecosystem/dockerComposeDb.js").then(m => m.dockerComposeDb) },
      { id: "k8sBasics", title: "Kubernetes (K8s) Asoslari", load: () => import("./lessons/ecosystem/k8sBasics.js").then(m => m.k8sBasics) },
      { id: "advancedCiCd", title: "Mukammal CI/CD va Avtomatlashtirilgan Deploy", load: () => import("./lessons/ecosystem/advancedCiCd.js").then(m => m.advancedCiCd) }
    ]
  },
  typescript: {
    label: "TypeScript",
    color: "#3178c6",
    icon: "📘",
    lessons: [{ id: "typescriptBasics", title: "TypeScript Asoslari va Tiplar", load: () => import("./lessons/typescript/typescriptBasics.js").then(m => m.typescriptBasics) }, { id: "interfacesTypes", title: "Interfaces va Type Aliases", load: () => import("./lessons/typescript/interfacesTypes.js").then(m => m.interfacesTypes) }, { id: "typescriptFunctions", title: "Funksiyalar va Overloads", load: () => import("./lessons/typescript/typescriptFunctions.js").then(m => m.typescriptFunctions) }, { id: "typescriptClasses", title: "Klasslar va OOP", load: () => import("./lessons/typescript/typescriptClasses.js").then(m => m.typescriptClasses) }, { id: "typescriptGenerics", title: "Generics (Umumiylashtirish)", load: () => import("./lessons/typescript/typescriptGenerics.js").then(m => m.typescriptGenerics) }, { id: "advancedTypes", title: "Advanced & Utility Types", load: () => import("./lessons/typescript/advancedTypes.js").then(m => m.advancedTypes) }, { id: "typeNarrowing", title: "Type Narrowing va Type Guards", load: () => import("./lessons/typescript/typeNarrowing.js").then(m => m.typeNarrowing) }, { id: "reactTypeScript", title: "React va TypeScript Integratsiyasi", load: () => import("./lessons/typescript/reactTypeScript.js").then(m => m.reactTypeScript) }, { id: "utilityTypes", title: "TypeScript Utility Types (Yordamchi Tiplar)", load: () => import("./lessons/typescript/utilityTypes.js").then(m => m.utilityTypes) }, { id: "tsConfigFile", title: "TypeScript Config (tsconfig.json chuqur tahlili)", load: () => import("./lessons/typescript/tsConfigFile.js").then(m => m.tsConfigFile) }, { id: "declarationFiles", title: "TypeScript Declaration Files (.d.ts)", load: () => import("./lessons/typescript/declarationFiles.js").then(m => m.declarationFiles) }]
  },
  softSkills: {
    label: "Suhbat madaniyati",
    color: "#a86ac9",
    icon: "💬",
    lessons: [{ id: "starMethod", title: "STAR Metodologiyasi (Suhbatdan o'tish siri)", load: () => import("./lessons/soft-skills/starMethod.js").then(m => m.starMethod) }, { id: "behavioralQuestions", title: "Xulq-atvorga oid savollar (Behavioral Interview)", load: () => import("./lessons/soft-skills/behavioralQuestions.js").then(m => m.behavioralQuestions) }, { id: "resumeOptimization", title: "Rezyume Tayyorlash va Optimallashtirish (ATS Optimization)", load: () => import("./lessons/soft-skills/resumeOptimization.js").then(m => m.resumeOptimization) }]
  },
  projects: {
    label: "Loyihalar",
    color: "#7a9e7e",
    icon: "🏗️",
    lessons: [
      { id: "p1", title: "Loyiha: Todo List (Vazifalar boshqaruvchisi)", load: () => import("./lessons/projects/todoList.js").then(m => m.todoList) },
      { id: "p2", title: "Ob-havo ilovasi (Mini-loyiha)", load: () => import("./lessons/projects/weatherApp.js").then(m => m.weatherApp) },
      { id: "p3", title: "Loyiha: Express.js va React REST API (Full-stack)", load: () => import("./lessons/projects/fullstackRestApi.js").then(m => m.fullstackRestApi) },
      { id: "movieSearchApi", title: "Loyiha: API va Backend (Kino Izlash Loyihasi)", load: () => import("./lessons/projects/movieSearchApi.js").then(m => m.default) }
    ]
  },
  sql: {
    label: "SQL va Bazalar",
    color: "#e67e22",
    icon: "🗄️",
    lessons: [
      { id: "sqlIntro", title: "Ma'lumotlar Bazasi va RDBMS Asoslari", load: () => import("./lessons/sql/sqlIntro.js").then(m => m.sqlIntro) },
      { id: "sqlSyntax", title: "SQL Sintaksisi va Operatorlar", load: () => import("./lessons/sql/sqlSyntax.js").then(m => m.sqlSyntax) },
      { id: "sqlBasics", title: "SQL So'rovlar Asoslari (SELECT, WHERE, ORDER BY)", load: () => import("./lessons/sql/sqlBasics.js").then(m => m.sqlBasics) },
      { id: "sqlFiltering", title: "Ma'lumotlarni Filtrlash (Filtering)", load: () => import("./lessons/sql/sqlFiltering.js").then(m => m.sqlFiltering) },
      { id: "sqlFunctions", title: "SQL Agregat Funksiyalari va Grouping", load: () => import("./lessons/sql/sqlFunctions.js").then(m => m.sqlFunctions) },
      { id: "sqlJoins", title: "Jadvallarni Birlashtirish (JOINS)", load: () => import("./lessons/sql/sqlJoins.js").then(m => m.sqlJoins) },
      { id: "sqlSubqueries", title: "SQL Subqueries (Ichki So'rovlar)", load: () => import("./lessons/sql/sqlSubqueries.js").then(m => m.sqlSubqueries) },
      { id: "sqlViews", title: "Ko'rinishlar (Views)", load: () => import("./lessons/sql/sqlViews.js").then(m => m.sqlViews) },
      { id: "sqlIndexes", title: "Indekslar (Indexes)", load: () => import("./lessons/sql/sqlIndexes.js").then(m => m.sqlIndexes) },
      { id: "sqlTransactions", title: "Tranzaksiyalar va ACID", load: () => import("./lessons/sql/sqlTransactions.js").then(m => m.sqlTransactions) },
      { id: "sqlStoredProcedures", title: "Saqlanadigan Proseduralar (Stored Procedures)", load: () => import("./lessons/sql/sqlStoredProcedures.js").then(m => m.sqlStoredProcedures) },
      { id: "sqlQueryOptimization", title: "So'rovlarni Optimallashtirish (Query Optimization)", load: () => import("./lessons/sql/sqlQueryOptimization.js").then(m => m.sqlQueryOptimization) },
      { id: "sqlModifications", title: "Ma'lumotlarni o'zgartirish (INSERT, UPDATE, DELETE)", load: () => import("./lessons/sql/sqlModifications.js").then(m => m.sqlModifications) },
      { id: "prismaOrm", title: "Prisma ORM va Ma'lumotlar Bazasi Modellashtirish", load: () => import("./lessons/sql/prismaOrm.js").then(m => m.prismaOrm) },
      { id: "mongoDbBasics", title: "MongoDB Asoslari: CRUD va Aggregatsiya", load: () => import("./lessons/sql/mongoDbBasics.js").then(m => m.mongoDbBasics) },
      { id: "mongooseDb", title: "Mongoose ODM va MongoDB", load: () => import("./lessons/sql/mongooseDb.js").then(m => m.mongooseDb) }
    ]
  },
  challenges: {
    label: "Challenges",
    color: "#9b59b6",
    icon: "🏆",
    lessons: [
      { id: "arrayChallenges", title: "Array (Massiv) Masalalari", load: () => import("./lessons/challenges/arrayChallenges.js").then(m => m.arrayChallenges) },
      { id: "stringChallenges", title: "String (Satr) Masalalari", load: () => import("./lessons/challenges/stringChallenges.js").then(m => m.stringChallenges) },
      { id: "mathLogicChallenges", title: "Matematika va Mantiq Masalalari", load: () => import("./lessons/challenges/mathLogicChallenges.js").then(m => m.mathLogicChallenges) },
      { id: "objectChallenges", title: "Object (Obyekt) Masalalari", load: () => import("./lessons/challenges/objectChallenges.js").then(m => m.objectChallenges) }
    ]
  }
};

export const SECTIONS = ["beginner", "intermediate", "advanced", "nodejs", "typescript", "algorithms", "sql", "systemDesign", "ecosystem", "softSkills", "projects", "challenges"];


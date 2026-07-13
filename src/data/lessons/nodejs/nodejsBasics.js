export const nodejsBasics = {
  id: "nodejsBasics",
  title: "Node.js Basics & Architecture",
  theory: `
## Part 1: Beginner Analogy

Imagine a very busy restaurant. In a traditional restaurant (like traditional synchronous programming), a single waiter takes your order, walks to the kitchen, waits for the chef to cook it, brings it to your table, and only then goes to the next customer. If a dish takes 20 minutes, the waiter stands idle for 20 minutes. This is extremely inefficient.

Node.js, on the other hand, works like a highly efficient restaurant with a single, incredibly fast waiter (the **Single Thread**). This waiter takes your order and hands it to the kitchen, but instead of waiting, immediately turns to the next customer to take their order. When the kitchen finishes cooking your meal, they ring a bell (an **Event**). The waiter hears the bell, picks up the food, and brings it to your table. The kitchen staff working in the background represents the **Worker Pool (libuv)**, handling heavy tasks (like reading files, database queries, network requests) asynchronously, allowing the main waiter to never block.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, Libuv, performance)

Node.js is a runtime environment that allows you to run JavaScript on the server side (outside the browser). It is built on two core components:

1. **V8 Engine**: Google's open-source high-performance JavaScript and WebAssembly engine, written in C++. It compiles JavaScript directly to native machine code before executing it, which gives Node.js its incredible speed. It also manages Memory Allocation and Garbage Collection.

2. **Libuv**: A multi-platform support library written in C that focuses on asynchronous I/O. It provides the **Event Loop** and the **Worker Pool** (Thread Pool).

### How it all works together:
- **Call Stack**: Where V8 keeps track of function execution. It processes synchronous code.
- **Node APIs / Web APIs**: When an asynchronous operation (like reading a file via \\\`fs\\\`) is called, Node pushes it to C++ APIs.
- **Event Queue / Callback Queue**: Once the background operation completes, its callback function is placed here.
- **Event Loop**: Continuously checks if the Call Stack is empty. If it is, it picks the first callback from the Event Queue and pushes it onto the Call Stack for execution.

### Memory Management
Node.js processes run inside a V8 instance, which has a limited memory heap (default max is usually around 1.5GB to 2GB on 64-bit systems).
- **Stack Memory**: Stores primitive types and function frames.
- **Heap Memory**: Stores objects, strings, and closures. V8's Garbage Collector runs periodically to free memory that is no longer referenced.

## Part 3: Edge Cases and Senior Interview Questions

### Interview Question 1: Is Node.js completely single-threaded?
**Answer**: No. While the Event Loop and the execution of your JavaScript code run on a single thread (the main thread), Node.js uses multiple threads under the hood via the **Libuv** Worker Pool to handle blocking operations like File I/O, DNS lookups, and crypto functions.

### Interview Question 2: What happens if you run a CPU-intensive task in Node.js?
**Answer**: The main thread will block. Since Node is single-threaded for JS execution, a heavy computation (like an infinite loop or massive matrix multiplication) will occupy the Call Stack, preventing the Event Loop from processing other incoming requests or executing callbacks. For CPU-bound tasks, we should use **Worker Threads** (\\\`worker_threads\\\` module) or external microservices.

### Interview Question 3: Explain the difference between \\\`process.nextTick()\\\` and \\\`setImmediate()\\\`.
**Answer**: 
- \\\`process.nextTick()\\\` schedules a callback to be executed *immediately after* the current operation completes, before the Event Loop moves to the next phase. It has the highest priority.
- \\\`setImmediate()\\\` schedules a callback to run on the next iteration (tick) of the Event Loop, specifically in the "Check" phase.

### Edge Case:
Memory Leaks. Since Node.js servers run continuously for days or months, storing data in global variables or maintaining unclosed connections will keep objects in the heap indefinitely, eventually crashing the process with \\\`FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory\\\`.

## Architecture Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[Incoming Request] --> B(Event Loop / Main Thread)
    B -->|Synchronous Task| C{Execute in V8}
    C -->|Return Response| A
    B -->|Asynchronous I/O| D[Node C++ APIs]
    D --> E((Libuv Worker Pool))
    E -->|Read File/DB/Network| F[Background Task Completes]
    F --> G[Callback placed in Event Queue]
    G -->|Event Loop picks it up| B
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: 1,
      title: "Write a Simple Node Program",
      task: "Create a program that logs 'Hello, Node.js!' to the console.",
      code: "console.log('Hello, Node.js!');",
      solution: "console.log('Hello, Node.js!');"
    },
    {
      id: 2,
      title: "Use global variables",
      task: "Log the current directory path using a Node.js global variable.",
      code: "console.log(__dirname);",
      solution: "console.log(__dirname);"
    },
    {
      id: 3,
      title: "File path global",
      task: "Log the absolute path of the currently executing file.",
      code: "console.log(__filename);",
      solution: "console.log(__filename);"
    },
    {
      id: 4,
      title: "Process Object",
      task: "Log the current Node.js version using the process object.",
      code: "console.log(process.version);",
      solution: "console.log(process.version);"
    },
    {
      id: 5,
      title: "Process exit",
      task: "Forcefully exit the Node.js process with a failure code (1).",
      code: "process.exit(1);",
      solution: "process.exit(1);"
    },
    {
      id: 6,
      title: "Process arguments",
      task: "Log the array of command line arguments passed to the script.",
      code: "console.log(process.argv);",
      solution: "console.log(process.argv);"
    },
    {
      id: 7,
      title: "SetTimeout Basics",
      task: "Use setTimeout to log 'Delayed' after 1000 milliseconds.",
      code: "setTimeout(() => {\n  console.log('Delayed');\n}, 1000);",
      solution: "setTimeout(() => {\n  console.log('Delayed');\n}, 1000);"
    },
    {
      id: 8,
      title: "ClearTimeout",
      task: "Set a timeout for 2000ms that logs 'Will not run', assign it to 'timer', and immediately clear it.",
      code: "const timer = setTimeout(() => console.log('Will not run'), 2000);\nclearTimeout(timer);",
      solution: "const timer = setTimeout(() => console.log('Will not run'), 2000);\nclearTimeout(timer);"
    },
    {
      id: 9,
      title: "SetInterval Basics",
      task: "Set an interval that logs 'Tick' every 500ms. Store the ID in a variable called 'intervalId'.",
      code: "const intervalId = setInterval(() => console.log('Tick'), 500);",
      solution: "const intervalId = setInterval(() => console.log('Tick'), 500);"
    },
    {
      id: 10,
      title: "Next Tick",
      task: "Use process.nextTick to execute a function that logs 'Priority' immediately after the current operation.",
      code: "process.nextTick(() => {\n  console.log('Priority');\n});",
      solution: "process.nextTick(() => {\n  console.log('Priority');\n});"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Which engine powers Node.js under the hood?",
      options: ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"],
      answer: "V8",
      explanation: "Node.js uses the V8 engine (developed by Google for Chrome) to execute JavaScript code efficiently."
    },
    {
      id: 2,
      question: "What is Libuv responsible for in Node.js?",
      options: ["Parsing JSON", "Executing JS code", "Handling asynchronous I/O and the event loop", "Managing HTTP routes"],
      answer: "Handling asynchronous I/O and the event loop",
      explanation: "Libuv is a C library that provides the Event Loop and a Worker Pool for handling asynchronous operations like file system access and networking."
    },
    {
      id: 3,
      question: "Is Node.js completely single-threaded?",
      options: ["Yes, completely.", "No, it uses a single thread for JS execution but multiple threads for I/O tasks.", "No, every request spawns a new thread.", "Yes, but only in the browser."],
      answer: "No, it uses a single thread for JS execution but multiple threads for I/O tasks.",
      explanation: "While JS execution is single-threaded, Node.js offloads heavy I/O operations to Libuv's C++ worker pool."
    },
    {
      id: 4,
      question: "Which global variable gives you the directory name of the current module?",
      options: ["__filename", "__dir", "__dirname", "process.cwd()"],
      answer: "__dirname",
      explanation: "__dirname contains the absolute path of the directory containing the currently executing file."
    },
    {
      id: 5,
      question: "Which phase of the event loop executes callbacks scheduled by setImmediate()?",
      options: ["Timers", "Poll", "Check", "Close callbacks"],
      answer: "Check",
      explanation: "The Check phase is specifically designed for setImmediate() callbacks, running immediately after the Poll phase."
    },
    {
      id: 6,
      question: "What will happen if you run a heavy synchronous loop (e.g., while(true)) in Node.js?",
      options: ["The event loop will continue processing other requests.", "A new thread will be created automatically.", "The main thread will block, and no other requests will be processed.", "Node.js will crash immediately with an out-of-memory error."],
      answer: "The main thread will block, and no other requests will be processed.",
      explanation: "Node.js runs JS on a single thread. CPU-intensive synchronous code will block the Event Loop entirely."
    },
    {
      id: 7,
      question: "Which function guarantees that a callback runs before the next phase of the event loop?",
      options: ["setTimeout()", "setImmediate()", "process.nextTick()", "setInterval()"],
      answer: "process.nextTick()",
      explanation: "process.nextTick() has the highest priority and fires immediately after the current operation, before the event loop continues."
    },
    {
      id: 8,
      question: "What does the process.argv array contain?",
      options: ["Environment variables", "Active file descriptors", "Command-line arguments passed when launching the Node process", "System memory usage statistics"],
      answer: "Command-line arguments passed when launching the Node process",
      explanation: "process.argv is an array where the first two elements are the Node executable and script path, followed by any additional arguments."
    },
    {
      id: 9,
      question: "Which of the following is NOT a built-in Node.js global object?",
      options: ["process", "window", "console", "setTimeout"],
      answer: "window",
      explanation: "The 'window' object exists in the browser (DOM), but not in Node.js. Node.js uses 'global' instead."
    },
    {
      id: 10,
      question: "What is the primary role of the Event Loop in Node.js?",
      options: ["To compile JS to machine code.", "To handle database migrations.", "To check the call stack and execute callbacks from the event queue.", "To serve static HTML files."],
      answer: "To check the call stack and execute callbacks from the event queue.",
      explanation: "The Event Loop continuously watches the Call Stack and Event Queue, pushing waiting callbacks to the stack when it is empty."
    },
    {
      id: 11,
      question: "How do you forcefully exit a Node.js process and indicate an error occurred?",
      options: ["process.exit(1)", "process.kill()", "process.abort()", "process.exit(0)"],
      answer: "process.exit(1)",
      explanation: "process.exit(1) terminates the process immediately, with a non-zero code indicating a failure."
    },
    {
      id: 12,
      question: "Which of the following tasks is typically offloaded to the Libuv worker pool?",
      options: ["Adding two numbers.", "Parsing a JSON string.", "Reading a file from the hard drive.", "Declaring a variable."],
      answer: "Reading a file from the hard drive.",
      explanation: "File I/O is blocking and slow, so Node.js offloads it to the Libuv worker pool to avoid blocking the main thread."
    }
  ]
};

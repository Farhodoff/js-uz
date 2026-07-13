export const httpModule = {
  id: "http-module",
  title: "Node.js HTTP Module",
  theory: `
## Part 1: Beginner Analogy

Imagine you are a receptionist at a very busy corporate office building (this represents your Node.js HTTP server). Your main job is to listen for people walking in, asking questions, or requesting documents.

1. **The Client (Browser):** A visitor walks through the door and says, "Hello, can I get the annual report?" (This is an HTTP Request).
2. **The Receptionist (HTTP Server):** You take note of what they want, who they are, and how they asked for it (This is the \\\`req\\\` or Request object).
3. **The Response:** You reach under your desk, grab the document, and hand it to them saying, "Here you go, have a great day!" (This is the \\\`res\\\` or Response object).

In Node.js, the \\\`http\\\` module provides the tools to be this receptionist. It lets you create a server that listens on a specific "door" (port), reads what clients are asking for, and sends back data (HTML, JSON, images) in a language the client understands.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, Libuv, performance)

The \\\`http\\\` module in Node.js is built on top of the \\\`net\\\` module and provides a high-level API for handling the HTTP protocol.

### Under the Hood and Libuv
When you call \\\`http.createServer()\\\`, Node.js uses its internal C++ bindings (via the V8 engine) and the \\\`libuv\\\` library to set up an asynchronous, non-blocking TCP socket. 
1. **Event Loop:** The \\\`libuv\\\` library monitors the socket using epoll (on Linux) or kqueue (on macOS). It doesn't block the main thread waiting for connections.
2. **Connection Handling:** When a new TCP connection arrives, \\\`libuv\\\` notifies the Node.js event loop, which delegates it to the HTTP parser (historically \\\`http_parser\\\` written in C, now \\\`llhttp\\\`).
3. **HTTP Parsing:** The \\\`llhttp\\\` parser efficiently processes the incoming byte stream from the network, identifying headers, method, URL, and body. It emits events when headers are complete, passing the data back to the JavaScript land without excessive memory allocation.

### Memory Management and V8
When a request comes in, the \\\`http\\\` module creates \\\`IncomingMessage\\\` (the request) and \\\`ServerResponse\\\` (the response) objects. These are JavaScript objects managed by the V8 engine.
- **Streams:** Both \\\`req\\\` and \\\`res\\\` are streams. The \\\`req\\\` object is a \\\`Readable\\\` stream, and the \\\`res\\\` object is a \\\`Writable\\\` stream.
- **Buffering vs Streaming:** If you buffer the entire request body in memory (e.g., using a string or array), you risk crashing the V8 heap (which has a limit, typically around 1.4GB on a 64-bit system). By streaming data (e.g., piping a file read stream directly to the \\\`res\\\` Writable stream), you keep the memory footprint extremely low, allowing Node.js to handle tens of thousands of concurrent connections.

### Performance Considerations
- **Keep-Alive:** By default, Node.js HTTP servers support Keep-Alive. This means the underlying TCP connection remains open for subsequent requests, saving the overhead of the TCP 3-way handshake and TLS negotiation.
- **Agent:** When making outbound requests using \\\`http.request()\\\`, Node uses an \\\`http.Agent\\\`. The Agent manages connection pooling. If you don't configure it properly, you might exhaust available sockets or suffer from socket exhaustion (TIME_WAIT state).

## Part 3: Edge Cases and Senior Interview Questions

### Edge Cases
- **Handling Large Payloads:** If a client sends a multi-gigabyte file and you accumulate it in an array instead of processing chunks via streams, your Node application will hit an Out-Of-Memory (OOM) error.
- **Premature Connection Closure:** If the client drops the connection before the server finishes sending the response, writing to the \\\`res\\\` object can cause an error (EPIPE). You must listen to the \\\`error\\\` or \\\`close\\\` events on the request/response.
- **Header Injection/Smuggling:** Improperly sanitizing user input before passing it into HTTP headers can lead to HTTP Response Splitting or Header Injection attacks. Node.js has hardened its HTTP parser against this, but older versions or raw header manipulation can expose vulnerabilities.

### Senior Interview Questions

**Q: Explain the difference between \\\`req.on('data')\\\` and \\\`req.pipe()\\\`?**
**A:** \\\`req.on('data')\\\` manually listens for data chunks and pushes them into your own logic, which can lead to memory bloat if you don't handle backpressure correctly. \\\`req.pipe()\\\` automatically manages the data flow from the readable stream (request) to a writable stream, respecting backpressure and preventing the writable stream from being overwhelmed and consuming too much RAM.

**Q: How does the \\\`http.Agent\\\` work, and when would you customize its \\\`maxSockets\\\` property?**
**A:** The \\\`http.Agent\\\` manages the pooling of sockets used in HTTP client requests. By default, it limits the number of concurrent sockets per origin. If you are building a microservice that makes thousands of internal API calls to another service, customizing \\\`maxSockets\\\` (or using \\\`keepAlive: true\\\`) is critical to avoid connection bottlenecks and socket exhaustion.

**Q: What happens if you forget to call \\\`res.end()\\\` in your HTTP server?**
**A:** The client will keep waiting for the response to finish until it eventually times out. The TCP connection will remain open, consuming file descriptors and memory on the server, eventually leading to resource exhaustion (a classic memory/resource leak).

## Architecture Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[Client] -->|HTTP Request| B(Node.js Event Loop)
    B --> C{http module}
    C -->|Parse Headers URL| D[llhttp C++ Parser]
    D -->|Emit request event| E[JS Callback req res]
    E -->|Stream Data| F[libuv Thread Pool File System]
    F -->|Return Data| E
    E -->|Write Response| C
    C -->|HTTP Response| A
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Creating a Basic Server",
      problem: "Use the `http` module to create a server that listens on port 3000 and responds with 'Hello, World!' to all requests.",
      solution: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello, World!');\n});\n\nserver.listen(3000);`
    },
    {
      id: 2,
      title: "Routing Basics",
      problem: "Create an HTTP server that responds with 'Home Page' for the URL '/' and 'About Page' for the URL '/about'. For all other URLs, return a 404 status and 'Not Found'.",
      solution: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  if (req.url === '/') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('Home Page');\n  } else if (req.url === '/about') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('About Page');\n  } else {\n    res.writeHead(404, { 'Content-Type': 'text/plain' });\n    res.end('Not Found');\n  }\n});\n\nserver.listen(3000);`
    },
    {
      id: 3,
      title: "Returning JSON Data",
      problem: "Create an HTTP server that responds to requests at '/api/user' with a JSON object `{ name: 'John Doe', age: 30 }` and a 200 status code.",
      solution: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  if (req.url === '/api/user') {\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify({ name: 'John Doe', age: 30 }));\n  } else {\n    res.writeHead(404);\n    res.end();\n  }\n});\n\nserver.listen(3000);`
    },
    {
      id: 4,
      title: "Handling HTTP Methods",
      problem: "Create a server that accepts only POST requests at '/submit'. If a POST request is received, respond with 201 'Created'. For any other HTTP method at that URL, respond with 405 'Method Not Allowed'.",
      solution: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  if (req.url === '/submit') {\n    if (req.method === 'POST') {\n      res.writeHead(201, { 'Content-Type': 'text/plain' });\n      res.end('Created');\n    } else {\n      res.writeHead(405, { 'Content-Type': 'text/plain' });\n      res.end('Method Not Allowed');\n    }\n  }\n});\n\nserver.listen(3000);`
    },
    {
      id: 5,
      title: "Extracting Query Parameters",
      problem: "Using the built-in `url` module (or `new URL`), extract a query parameter named 'id' from a GET request to '/user?id=123' and respond with 'User ID: 123'.",
      solution: `const http = require('http');\nconst url = require('url');\n\nconst server = http.createServer((req, res) => {\n  const parsedUrl = url.parse(req.url, true);\n  if (parsedUrl.pathname === '/user') {\n    const id = parsedUrl.query.id;\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    res.end('User ID: ' + id);\n  }\n});\n\nserver.listen(3000);`
    },
    {
      id: 6,
      title: "Reading Request Body",
      problem: "Create an HTTP server that listens for POST requests on '/echo'. Read the incoming body data using `req.on('data')` and `req.on('end')`, then parse and send back the same data.",
      solution: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  if (req.method === 'POST' && req.url === '/echo') {\n    let body = '';\n    req.on('data', chunk => {\n      body += chunk.toString();\n    });\n    req.on('end', () => {\n      res.writeHead(200, { 'Content-Type': 'text/plain' });\n      res.end(body);\n    });\n  }\n});\n\nserver.listen(3000);`
    },
    {
      id: 7,
      title: "Making an HTTP GET Request",
      problem: "Use `http.get` to fetch data from 'http://example.com'. Log the status code of the response to the console.",
      solution: `const http = require('http');\n\nhttp.get('http://example.com', (res) => {\n  console.log('Status Code:', res.statusCode);\n  res.resume();\n}).on('error', (e) => {\n  console.error(e);\n});`
    },
    {
      id: 8,
      title: "Setting Custom Headers",
      problem: "Create a server that responds with a custom header `X-Powered-By` set to 'Node.js' and `Cache-Control` set to 'no-cache'.",
      solution: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, {\n    'Content-Type': 'text/plain',\n    'X-Powered-By': 'Node.js',\n    'Cache-Control': 'no-cache'\n  });\n  res.end('Headers Set');\n});\n\nserver.listen(3000);`
    },
    {
      id: 9,
      title: "Streaming a File Response",
      problem: "Use the `fs` module and `http` module to create a server that reads 'index.html' using a read stream and pipes it to the HTTP response.",
      solution: `const http = require('http');\nconst fs = require('fs');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/html' });\n  const readStream = fs.createReadStream('index.html');\n  readStream.pipe(res);\n});\n\nserver.listen(3000);`
    },
    {
      id: 10,
      title: "Handling Server Errors",
      problem: "Create an HTTP server and add an 'error' event listener to it. If the server fails to start, log 'Server error occurred' to the console.",
      solution: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.end('Hello');\n});\n\nserver.on('error', (err) => {\n  console.error('Server error occurred:', err.message);\n});\n\nserver.listen(3000);`
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Which Node.js module provides the capability to create an HTTP server?",
      options: ["net", "http", "fs", "web"],
      answer: "http",
      explanation: "The 'http' module is built into Node.js and allows you to create servers and make HTTP requests."
    },
    {
      id: 2,
      question: "What does the `http.createServer()` method return?",
      options: ["A new Express app", "An instance of http.Server", "A TCP socket", "A Promise"],
      answer: "An instance of http.Server",
      explanation: "http.createServer() returns a new instance of the http.Server class, which inherits from net.Server."
    },
    {
      id: 3,
      question: "Which of the following objects represents the incoming request in the server callback?",
      options: ["http.IncomingMessage", "http.ServerResponse", "http.ClientRequest", "net.Socket"],
      answer: "http.IncomingMessage",
      explanation: "The first argument (commonly named 'req') in the createServer callback is an instance of http.IncomingMessage."
    },
    {
      id: 4,
      question: "Which object is used to send data back to the client in Node.js?",
      options: ["http.IncomingMessage", "http.ServerResponse", "EventEmitter", "Stream.Readable"],
      answer: "http.ServerResponse",
      explanation: "The second argument ('res') is an instance of http.ServerResponse, which is a Writable stream used to send headers and body data to the client."
    },
    {
      id: 5,
      question: "What must you call to finish sending an HTTP response?",
      options: ["res.close()", "res.finish()", "res.end()", "req.end()"],
      answer: "res.end()",
      explanation: "You must call res.end() to signal that all response headers and body have been sent. If you forget this, the client's request will hang."
    },
    {
      id: 6,
      question: "What is the primary role of the HTTP Parser in Node.js (llhttp)?",
      options: ["To format the JavaScript objects into JSON", "To parse incoming raw TCP byte streams into HTTP headers and bodies", "To connect to databases", "To execute JavaScript code faster"],
      answer: "To parse incoming raw TCP byte streams into HTTP headers and bodies",
      explanation: "llhttp (formerly http_parser) is written in C/TypeScript and sits between the TCP socket and JavaScript to efficiently parse HTTP protocols."
    },
    {
      id: 7,
      question: "What is the recommended way to handle a large file upload in a Node.js HTTP server?",
      options: ["Read the whole body into memory using a string concatenation", "Buffer the file entirely before writing it to disk", "Use streams and .pipe() to write data directly to the disk as it arrives", "Increase V8 memory limit to 8GB"],
      answer: "Use streams and .pipe() to write data directly to the disk as it arrives",
      explanation: "Streaming prevents holding the entire file in RAM, avoiding Out-Of-Memory (OOM) crashes and improving performance."
    },
    {
      id: 8,
      question: "Which method is used to set the HTTP status code and headers simultaneously?",
      options: ["res.setHeader()", "res.status()", "res.writeHead()", "res.send()"],
      answer: "res.writeHead()",
      explanation: "res.writeHead() allows you to send the status code and a dictionary of headers to the client in one step."
    },
    {
      id: 9,
      question: "What is the purpose of `http.Agent` in Node.js?",
      options: ["It authenticates users logging into the server", "It manages connection pooling for outbound HTTP client requests", "It compresses HTTP responses automatically", "It parses incoming JSON bodies"],
      answer: "It manages connection pooling for outbound HTTP client requests",
      explanation: "http.Agent is responsible for managing connection persistence and reuse for HTTP clients in Node.js, managing sockets to optimize performance."
    },
    {
      id: 10,
      question: "If a client closes the connection early, which event should you listen to on the `req` object to handle it?",
      options: ["'aborted' or 'close'", "'finish'", "'data'", "'timeout'"],
      answer: "'aborted' or 'close'",
      explanation: "Listening to the 'close' or 'aborted' event allows you to clean up resources if a client unexpectedly drops the connection."
    },
    {
      id: 11,
      question: "Why does Node.js use `req.on('data')` to read the request body instead of passing the body directly as a string?",
      options: ["Because HTTP requests don't have bodies", "Because reading bodies requires a third-party library", "Because the body data may arrive in chunks over time, and 'req' is a Readable Stream", "Because it is required by the V8 engine"],
      answer: "Because the body data may arrive in chunks over time, and 'req' is a Readable Stream",
      explanation: "Network data arrives over time in chunks. By emitting 'data' events, Node.js streams the data, keeping memory usage low."
    },
    {
      id: 12,
      question: "Which property on the request object (`req`) gives you the HTTP method used (e.g., GET, POST)?",
      options: ["req.type", "req.method", "req.verb", "req.url"],
      answer: "req.method",
      explanation: "The `req.method` property contains a string representing the HTTP method used by the client."
    }
  ]
};

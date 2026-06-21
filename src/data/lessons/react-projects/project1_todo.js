export const project1_todo = {
  id: "project1_todo",
  title: "1. Todo List (useState, map)",
  content: `
# Project 1: Fully Functional Todo List

Welcome to the ultimate proving ground for your React skills so far! We've discussed states, event handling, and rendering lists. Now, it's time to build a classic, fully functional **Todo List**. 

Building a Todo list is to a React developer what learning "Stairway to Heaven" is to a guitarist: a mandatory rite of passage!

## Goal: Build a fully functional Todo List

Our mission is to create a robust application where a user can:
1. **View** a list of tasks.
2. **Add** new tasks via a text input.
3. **Toggle** the complete/incomplete status of each task.
4. **Delete** tasks entirely.
5. **Bonus:** Save tasks to \\\`LocalStorage\\\` so they persist even if the user refreshes the page!

### The Architecture (Mental Model)

Imagine your application as a restaurant:
- **State (The Kitchen):** Holds the raw ingredients (our array of tasks and the current text input).
- **Event Handlers (The Waiters):** Takes orders (button clicks, form submissions) and tells the kitchen to update the ingredients.
- **UI (The Dining Room):** Displays the beautifully plated food (the list rendered via \\\`map\\\`).

Let's visualize the state flow using a Mermaid diagram:

\\\`\\\`\\\`mermaid
flowchart TD
    State["tasks State Array"] --> Map["map() through tasks"]
    Map --> UI["Render TodoItems"]
    
    UserInput["User types task"] --> InputState["inputValue State"]
    SubmitButton["User clicks 'Add'"] --> AddHandler["addTask()"]
    
    AddHandler -->|Reads| InputState
    AddHandler -->|Updates| State
    
    ToggleBtn["User clicks 'Complete'"] --> ToggleHandler["toggleTask(id)"]
    ToggleHandler -->|Updates| State
    
    DeleteBtn["User clicks 'Delete'"] --> DeleteHandler["deleteTask(id)"]
    DeleteHandler -->|Updates| State
\\\`\\\`\\\`

---

## Step 1: Initializing State (Tasks Array and Input String)

To build our app, we need to track two moving parts (states):
1. **The current text** the user is typing into the input field.
2. **The list of tasks** that have been added.

\\\`\\\`\\\`jsx
const [text, setText] = useState("");
const [tasks, setTasks] = useState([]);
\\\`\\\`\\\`

> **Analogy:** \\\`text\\\` is like the pen hovering over a sticky note. \\\`tasks\\\` is the bulletin board where you pin your finished sticky notes.

Each task in our array shouldn't just be a simple string. It needs to hold multiple pieces of information: an ID, the task text, and whether it's completed.

\\\`\\\`\\\`js
// What a single task object looks like
{
  id: 1700456123,
  text: "Buy groceries",
  completed: false
}
\\\`\\\`\\\`

---

## Step 2: Adding a New Task

When the user submits the form, we need to create a new task object and add it to our array. 
**CRITICAL RULE:** Never mutate the state array directly! Always create a *new* array.

**Do:**
\\\`\\\`\\\`jsx
const addTask = (e) => {
  e.preventDefault(); // Stop page reload!
  if (!text.trim()) return; // Prevent empty tasks
  
  const newTask = {
    id: Date.now(), // Generate a unique ID
    text: text,
    completed: false
  };

  // Spread the old tasks and add the new one
  setTasks([...tasks, newTask]);
  
  // Clear the input field
  setText("");
};
\\\`\\\`\\\`

**Don't:**
\\\`\\\`\\\`jsx
// WRONG! Never push to state directly.
tasks.push(newTask);
setTasks(tasks); 
\\\`\\\`\\\`

---

## Step 3: Toggling Complete Status

When a user clicks on a task to mark it as done, we need to find that specific task in our array and flip its \\\`completed\\\` boolean.
Because we cannot mutate state directly, we use the \\\`.map()\\\` function to create a brand new array. If the task's ID matches the one we want to toggle, we return a *new* object with the flipped status. Otherwise, we return the task as-is.

\\\`\\\`\\\`jsx
const toggleTask = (id) => {
  setTasks(tasks.map(task => {
    if (task.id === id) {
      // Create a copy of the task and flip the completed status
      return { ...task, completed: !task.completed };
    }
    return task;
  }));
};
\\\`\\\`\\\`

---

## Step 4: Deleting a Task

Deleting is all about filtering out the task we don't want. The \\\`.filter()\\\` array method is perfect for this. It returns a *new* array containing only the elements that pass our condition.

\\\`\\\`\\\`jsx
const deleteTask = (id) => {
  // Keep all tasks EXCEPT the one with the matching ID
  setTasks(tasks.filter(task => task.id !== id));
};
\\\`\\\`\\\`

---

## Step 5: (Bonus) Saving to LocalStorage

What good is a Todo list if you lose all your tasks when you refresh the page? Let's use the browser's \\\`localStorage\\\` to save our tasks.

\\\`localStorage\\\` can only store strings. So, we must convert our array of objects into a JSON string using \\\`JSON.stringify()\\\`. When reading it back, we use \\\`JSON.parse()\\\`.

\\\`\\\`\\\`jsx
// 1. Initialize state lazily by reading from LocalStorage
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("my_todos");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return [];
  }
});

// 2. Use useEffect to save tasks to LocalStorage whenever they change!
// (Assume we imported useEffect from 'react')
// useEffect(() => {
//   localStorage.setItem("my_todos", JSON.stringify(tasks));
// }, [tasks]); 
\\\`\\\`\\\`

*(Note: We will cover \\\`useEffect\\\` deeply in an upcoming lesson, but this is a fantastic sneak peek into why it's so useful!)*
  `,
  code: `import React, { useState } from "react";

export default function TodoApp() {
  // Bu yerda holatlarni (state) qo\'shing

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {/* Add form here */}
      
      {/* Render list here */}
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Exercise 1: Initialize Task State",
      description: "Create a state variable called `tasks` initialized to an empty array. This will hold our todo items.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  // VAZIFA: \'tasks\' holatini (state) bo\'sh massiv bilan initsializatsiya qiling\n\n  return <div>Todo App</div>;\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n\n  return <div>Todo App</div>;\n}`,
      hint: "Use `const [tasks, setTasks] = useState([]);`"
    },
    {
      id: 2,
      title: "Exercise 2: Initialize Input State",
      description: "Create another state variable called `text` initialized to an empty string. This will track the user input.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  // VAZIFA: \'text\' holatini (state) initsializatsiya qiling\n\n  return <div>Todo App</div>;\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  const [text, setText] = useState("");\n\n  return <div>Todo App</div>;\n}`,
      hint: "Use `const [text, setText] = useState(\"\");`"
    },
    {
      id: 3,
      title: "Exercise 3: Controlled Input",
      description: "Add an input field to the component. Bind its `value` to the `text` state and update the state in the `onChange` handler.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  return (\n    <div>\n      {/* VAZIFA: Bu yerga boshqariluvchi (controlled) input maydonini qo\'shing */}\n    </div>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  return (\n    <div>\n      <input \n        type="text" \n        value={text} \n        onChange={(e) => setText(e.target.value)} \n        placeholder="Add a task"\n      />\n    </div>\n  );\n}`,
      hint: "The input should look like `<input value={text} onChange={(e) => setText(e.target.value)} />`"
    },
    {
      id: 4,
      title: "Exercise 4: The Form Submit Wrapper",
      description: "Wrap the input in a `<form>` tag, and add a `<button type=\"submit\">`. Create a `handleSubmit` function that prevents the default form submission.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    // VAZIFA: Standart yuborish (sahifa yangilanishi) harakatining oldini oling\n  };\n\n  return (\n    <div>\n      {/* VAZIFA: Formaga o\'rang va onSubmit={handleSubmit} bering */}\n      <input \n        type="text" \n        value={text} \n        onChange={(e) => setText(e.target.value)} \n      />\n      {/* VAZIFA: Yuborish (submit) tugmasini qo\'shing */}\n    </div>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n  };\n\n  return (\n    <div>\n      <form onSubmit={handleSubmit}>\n        <input \n          type="text" \n          value={text} \n          onChange={(e) => setText(e.target.value)} \n        />\n        <button type="submit">Add</button>\n      </form>\n    </div>\n  );\n}`,
      hint: "Use `e.preventDefault();` in `handleSubmit` and attach it to `<form onSubmit={handleSubmit}>`."
    },
    {
      id: 5,
      title: "Exercise 5: Add a Task",
      description: "Inside `handleSubmit`, create a new task object (with id, text, and completed) and append it to the `tasks` array. Then clear the `text` state.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    \n    // VAZIFA: Yangi vazifa (newTask) obyektini yarating\n    // VAZIFA: tasks holatini (state) yangilang\n    // VAZIFA: text holatini tozalang\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button type="submit">Add</button>\n    </form>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    \n    const newTask = {\n      id: Date.now(),\n      text: text,\n      completed: false\n    };\n    \n    setTasks([...tasks, newTask]);\n    setText("");\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button type="submit">Add</button>\n    </form>\n  );\n}`,
      hint: "Use `setTasks([...tasks, { id: Date.now(), text, completed: false }])` and `setText(\"\")`"
    },
    {
      id: 6,
      title: "Exercise 6: Render the Task List",
      description: "Map over the `tasks` array and render a list of `<li>` elements containing the task text. Do not forget the `key` prop!",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {/* VAZIFA: tasks massivi ustidan aylanib (map), <li> elementlarini ekranga chiqaring */}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>{task.text}</li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "Use `{tasks.map(task => <li key={task.id}>{task.text}</li>)}`"
    },
    {
      id: 7,
      title: "Exercise 7: Delete a Task",
      description: "Create a `deleteTask(id)` function that removes the task with the given id. Add a Delete button to each `<li>` that calls this function.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const deleteTask = (id) => {\n    // VAZIFA: Berilgan ID\'ni filtrlash orqali tasks massivini yangilang\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {task.text}\n          {/* VAZIFA: O\'chirish (Delete) tugmasini qo\'shing */}\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const deleteTask = (id) => {\n    setTasks(tasks.filter(task => task.id !== id));\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {task.text}\n          <button onClick={() => deleteTask(task.id)}>Delete</button>\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "`setTasks(tasks.filter(task => task.id !== id))`"
    },
    {
      id: 8,
      title: "Exercise 8: Toggle Complete Status",
      description: "Create a `toggleTask(id)` function. Map over the tasks, and if the ID matches, flip the `completed` boolean. Connect this to a checkbox input.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const toggleTask = (id) => {\n    // VAZIFA: tasks\'ni yangilang, mos ID uchun \'completed\' qiymatini o\'zgartiring\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {/* VAZIFA: Bajarilganlikni belgilash uchun checkbox qo\'shing */}\n          {task.text}\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const toggleTask = (id) => {\n    setTasks(tasks.map(task => \n      task.id === id ? { ...task, completed: !task.completed } : task\n    ));\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          <input \n            type="checkbox" \n            checked={task.completed} \n            onChange={() => toggleTask(task.id)} \n          />\n          {task.text}\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "Use `tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)`"
    },
    {
      id: 9,
      title: "Exercise 9: Styling Completed Tasks",
      description: "Apply a line-through style to the task text if the task is completed.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: true },\n    { id: 2, text: "Build App", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {/* VAZIFA: task.completed qiymatiga asoslanib, dinamik ravishda stil bering */}\n          <span>{task.text}</span>\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: true },\n    { id: 2, text: "Build App", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>\n            {task.text}\n          </span>\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "Use `style={{ textDecoration: task.completed ? \"line-through\" : \"none\" }}`"
    },
    {
      id: 10,
      title: "Exercise 10: Bonus - Lazy State Initialization",
      description: "Initialize the `tasks` state by reading from `localStorage.getItem(\"todos\")`. Parse it if it exists, otherwise default to `[]`.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  // VAZIFA: LocalStorage\'dan o\'qish uchun useState ichida callback\'dan foydalaning\n  const [tasks, setTasks] = useState([]);\n\n  return <div>Loaded {tasks.length} tasks!</div>;\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState(() => {\n    const saved = localStorage.getItem("todos");\n    if (saved) {\n      return JSON.parse(saved);\n    }\n    return [];\n  });\n\n  return <div>Loaded {tasks.length} tasks!</div>;\n}`,
      hint: "Pass an arrow function `() => { ... }` into `useState`."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Which Hook should we use to hold the array of our Todo List items?",
      options: [
        "useArray", 
        "useState", 
        "useList", 
        "useEffect"
      ],
      correctAnswer: 1,
      explanation: "`useState` is the standard React hook for holding any piece of local component state, including arrays and objects."
    },
    {
      id: 2,
      question: "Why must we pass a `key` prop when mapping over the tasks array?",
      options: [
        "To style the list items uniquely.",
        "To allow React to keep track of individual list items across renders.",
        "To tell the browser what type of data it is.",
        "Because `map()` throws an error without it."
      ],
      correctAnswer: 1,
      explanation: "React uses keys to identify which items have changed, been added, or been removed, optimizing the rendering process."
    },
    {
      id: 3,
      question: "How should you add a new item to the `tasks` state array?",
      options: [
        "tasks.push(newItem); setTasks(tasks);",
        "setTasks([...tasks, newItem]);",
        "tasks[tasks.length] = newItem; setTasks(tasks);",
        "tasks.add(newItem);"
      ],
      correctAnswer: 1,
      explanation: "You should always create a new array containing the old items (spread operator) plus the new item to ensure immutability."
    },
    {
      id: 4,
      question: "What happens if we directly mutate a state array like `tasks.push(newTask)`?",
      options: [
        "The app crashes instantly.",
        "React correctly detects the change and re-renders.",
        "React may not realize the state has changed because the array reference remains the same, so it won't re-render.",
        "The item is pushed but the id is lost."
      ],
      correctAnswer: 2,
      explanation: "React relies on reference equality to determine if state has changed. Mutating the existing array keeps the same reference."
    },
    {
      id: 5,
      question: "Which JavaScript array method is best for removing an item from the state array?",
      options: [
        "slice()", 
        "splice()", 
        "filter()", 
        "pop()"
      ],
      correctAnswer: 2,
      explanation: "`filter()` creates a new array excluding items that fail the condition, which is perfect for deleting an item immutably."
    },
    {
      id: 6,
      question: "Which JavaScript array method is best for toggling a property of a specific item in the array?",
      options: [
        "filter()", 
        "map()", 
        "reduce()", 
        "forEach()"
      ],
      correctAnswer: 1,
      explanation: "`map()` creates a new array of the same length, allowing us to return a modified object when we find the target ID, and the original object for all others."
    },
    {
      id: 7,
      question: "What is a \"controlled component\" in React?",
      options: [
        "A component controlled by Redux.",
        "An input element whose value is entirely controlled by React state.",
        "A component that has no internal state.",
        "An input with strict validation rules."
      ],
      correctAnswer: 1,
      explanation: "When an input's `value` is tied to a state variable, it becomes a \"controlled component\"."
    },
    {
      id: 8,
      question: "Why do we call `e.preventDefault()` inside the form submission handler?",
      options: [
        "To prevent the default HTML behavior of refreshing the entire page on form submit.",
        "To prevent React from re-rendering the app.",
        "To stop users from double-clicking the button.",
        "To clear the input field automatically."
      ],
      correctAnswer: 0,
      explanation: "Native forms reload the page upon submission. We prevent this so we can handle the state update purely in React."
    },
    {
      id: 9,
      question: "When utilizing LocalStorage, why must we use `JSON.stringify()` when saving our `tasks` array?",
      options: [
        "LocalStorage is more secure that way.",
        "LocalStorage can only save strings, not complex objects or arrays directly.",
        "It shrinks the file size.",
        "Because React requires all states to be strings."
      ],
      correctAnswer: 1,
      explanation: "The Web Storage API only supports string values. Objects/Arrays must be stringified before saving and parsed when loading."
    },
    {
      id: 10,
      question: "In the expression `{...task, completed: !task.completed}`, what does the spread operator (`...task`) do?",
      options: [
        "It changes the task array into a string.",
        "It copies all properties of the original task object into the new object.",
        "It removes the task.",
        "It throws an error if task is null."
      ],
      correctAnswer: 1,
      explanation: "The spread operator creates a shallow copy of the object's properties, allowing us to safely overwrite specific fields like `completed`."
    },
    {
      id: 11,
      question: "When setting an initial state lazily from `localStorage`, what do we pass to `useState`?",
      options: [
        "A string.",
        "An empty array.",
        "A function that returns the initial state value.",
        "The localStorage object."
      ],
      correctAnswer: 2,
      explanation: "Passing a function to `useState` ensures the expensive operation (like parsing localStorage) is only executed once during the initial render."
    },
    {
      id: 12,
      question: "If a user tries to submit an empty task, what is a simple way to handle it in our `handleSubmit` function?",
      options: [
        "Call `deleteTask()`.",
        "Check `if (!text.trim()) return;` to ignore the submission.",
        "Throw a JavaScript error.",
        "Use `e.preventDefault()` again."
      ],
      correctAnswer: 1,
      explanation: "Trimming the string and checking if it's empty prevents adding blank tasks to the list. We just `return` early from the handler."
    }
  ]
};

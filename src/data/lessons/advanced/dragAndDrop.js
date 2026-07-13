export const dragAndDrop = {
  id: "dragAndDrop",
  title: "HTML5 Drag and Drop API",
  theory: `
### Part 1: Beginner Analogy
Tasavvur qiling, siz stoldagi kitobni (Drag) olib, kitob javoniga (Drop) qo'ymoqchisiz. 
Buning uchun:
1. Kitobni ushlaysiz (dragstart)
2. Uni havoda ko'tarib borasiz (drag)
3. Javonga olib kelasiz (dragenter / dragover)
4. Va joyiga qo'yasiz (drop).

HTML5 Drag and Drop API ham xuddi shunday ishlaydi. U bizga veb-sahifadagi elementlarni sichqoncha yordamida ushlab, boshqa joyga ko'chirish imkonini beradi.

### Part 2: Deep Dive
HTML5 DnD API brauzerning ichki tizimi bo'lib, nafaqat DOM elementlarini, balki operatsion tizimdan fayllarni ham tortib olib kelish imkonini beradi.

#### Asosiy hodisalar (Events)
Tortiladigan element (Draggable item) hodisalari:
* \\\`dragstart\\\` - Tortish boshlanganda
* \\\`drag\\\` - Tortilayotgan vaqtda
* \\\`dragend\\\` - Tortish tugatilganda

Tashlanadigan hudud (Drop zone) hodisalari:
* \\\`dragenter\\\` - Element hududga kirganda
* \\\`dragleave\\\` - Element hududdan chiqqanda
* \\\`dragover\\\` - Element hudud ustida harakatlanganda (Bu yerda e.preventDefault() chaqirilishi shart, aks holda drop ishlamaydi!)
* \\\`drop\\\` - Element hududga tashlanganda

#### DataTransfer obyekti
DataTransfer obyekti tortilayotgan element haqidagi ma'lumotlarni o'zida saqlaydi. 
* \\\`e.dataTransfer.setData('text/plain', id)\\\` - Ma'lumotni saqlash.
* \\\`e.dataTransfer.getData('text/plain')\\\` - Ma'lumotni o'qib olish.

\\\`\\\`\\\`javascript
const item = document.getElementById("item");
item.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
});
\\\`\\\`\\\`

### Part 3: Edge Cases and Senior Interview Questions
**Savol:** Nega \\\`dragover\\\` hodisasida \\\`e.preventDefault()\\\` chaqirishimiz shart?
**Javob:** Brauzerlar odatda elementlarni biron joyga tashlashni (drop) taqiqlaydi. Drop jarayoniga ruxsat berish uchun biz ushbu standart xatti-harakatni to'xtatishimiz kerak.

**Savol:** React kabi kutubxonalarda HTML5 DnD qanday ishlatiladi?
**Javob:** Garchi React'da onDragStart, onDrop kabi prop'lar orqali ishlatish mumkin bo'lsa-da, ko'pincha "react-beautiful-dnd" yoki "dnd-kit" kabi uchinchi tomon kutubxonalari ishlatiladi, chunki HTML5 DnD mobil qurilmalarda (Touch events) to'g'ridan-to'g'ri ishlamaydi.

### Mermaid Diagram
\\\`\\\`\\\`mermaid
sequenceDiagram
    participant User
    participant Item as Draggable Item
    participant Zone as Drop Zone
    User->>Item: dragstart
    Item-->>User: Set DataTransfer
    User->>Zone: dragenter
    User->>Zone: dragover (preventDefault)
    User->>Zone: drop
    Zone-->>User: Get DataTransfer & Append
    User->>Item: dragend
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: "dnd-ex1",
      title: "Draggable qilish",
      description: "Elementga draggable atributini true qiymatida qo'shing.",
      initialCode: "function makeDraggable(element) {\n  // kodingizni yozing\n}",
      solution: "function makeDraggable(element) {\n  element.draggable = true;\n}",
      tests: [
        {
          test: "const el = {}; makeDraggable(el); return el.draggable === true;",
          description: "element.draggable xususiyati true bo'lishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex2",
      title: "DataTransfer ga yozish",
      description: "dragstart hodisasida element id sini 'text/plain' formatida saqlang.",
      initialCode: "function handleDragStart(e) {\n  // kodingizni yozing\n}",
      solution: "function handleDragStart(e) {\n  e.dataTransfer.setData('text/plain', e.target.id);\n}",
      tests: [
        {
          test: "let storedFmt, storedId; const e = { target: { id: 'box1' }, dataTransfer: { setData: (fmt, val) => { storedFmt = fmt; storedId = val; } } }; handleDragStart(e); return storedFmt === 'text/plain' && storedId === 'box1';",
          description: "setData orqali element id si saqlanishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex3",
      title: "Drop ga ruxsat berish",
      description: "dragover hodisasida default harakatni to'xtating.",
      initialCode: "function handleDragOver(e) {\n  // kodingizni yozing\n}",
      solution: "function handleDragOver(e) {\n  e.preventDefault();\n}",
      tests: [
        {
          test: "let prevented = false; const e = { preventDefault: () => prevented = true }; handleDragOver(e); return prevented;",
          description: "preventDefault() chaqirilishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex4",
      title: "DataTransfer dan o'qish",
      description: "drop hodisasida 'text/plain' formatidagi ma'lumotni qaytaring.",
      initialCode: "function handleDrop(e) {\n  // kodingizni yozing\n}",
      solution: "function handleDrop(e) {\n  return e.dataTransfer.getData('text/plain');\n}",
      tests: [
        {
          test: "const e = { dataTransfer: { getData: (fmt) => fmt === 'text/plain' ? 'box2' : '' } }; return handleDrop(e) === 'box2';",
          description: "getData orqali ma'lumot o'qilishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex5",
      title: "Drag Enter hodisasi",
      description: "Element hududga kirganini bildirish uchun uning background rangini 'blue' qiling.",
      initialCode: "function highlightDropZone(element) {\n  element.addEventListener('dragenter', (e) => {\n    // kodingizni yozing\n  });\n}",
      solution: "function highlightDropZone(element) {\n  element.addEventListener('dragenter', (e) => {\n    e.target.style.background = 'blue';\n  });\n}",
      tests: [
        {
          test: "let style = {}; const el = { addEventListener: (evt, cb) => { if (evt === 'dragenter') cb({ target: { style } }); } }; highlightDropZone(el); return style.background === 'blue';",
          description: "background 'blue' ga o'zgarishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex6",
      title: "Drag Leave hodisasi",
      description: "Element hududdan chiqqanda background rangini 'transparent' qilib qaytaring.",
      initialCode: "function unhighlightDropZone(element) {\n  element.addEventListener('dragleave', (e) => {\n    // kodingizni yozing\n  });\n}",
      solution: "function unhighlightDropZone(element) {\n  element.addEventListener('dragleave', (e) => {\n    e.target.style.background = 'transparent';\n  });\n}",
      tests: [
        {
          test: "let style = {}; const el = { addEventListener: (evt, cb) => { if (evt === 'dragleave') cb({ target: { style } }); } }; unhighlightDropZone(el); return style.background === 'transparent';",
          description: "background 'transparent' bo'lishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex7",
      title: "Elementni ko'chirish",
      description: "Berilgan id bo'yicha elementni topib, uni zone ichiga qo'shing.",
      initialCode: "function appendDraggedElement(zone, elementId) {\n  // kodingizni yozing (document.getElementById dan foydalaning)\n}",
      solution: "function appendDraggedElement(zone, elementId) {\n  const el = document.getElementById(elementId);\n  if (el) zone.appendChild(el);\n}",
      tests: [
        {
          test: "let appended = false; const fakeEl = {}; const originalGet = document.getElementById; document.getElementById = () => fakeEl; const zone = { appendChild: (child) => { if(child === fakeEl) appended = true; } }; appendDraggedElement(zone, 'test'); document.getElementById = originalGet; return appended;",
          description: "Element zone.appendChild orqali qo'shilishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex8",
      title: "Drag End hodisasi",
      description: "dragend hodisasida elementning opacity qiymatini '1' ga qaytaring.",
      initialCode: "function handleDragEnd(e) {\n  // kodingizni yozing\n}",
      solution: "function handleDragEnd(e) {\n  e.target.style.opacity = '1';\n}",
      tests: [
        {
          test: "const e = { target: { style: {} } }; handleDragEnd(e); return e.target.style.opacity === '1';",
          description: "opacity '1' bo'lishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex9",
      title: "DataTransfer ni tozalash",
      description: "DataTransfer dan barcha ma'lumotlarni o'chirib yuboring (clearData orqali).",
      initialCode: "function clearDataTransfer(e) {\n  // kodingizni yozing\n}",
      solution: "function clearDataTransfer(e) {\n  e.dataTransfer.clearData();\n}",
      tests: [
        {
          test: "let cleared = false; const e = { dataTransfer: { clearData: () => cleared = true } }; clearDataTransfer(e); return cleared;",
          description: "clearData chaqirilishi kerak"
        }
      ]
    },
    {
      id: "dnd-ex10",
      title: "Fayllarni olish",
      description: "drop qilingan fayllar ro'yxatini qaytaring (e.dataTransfer.files).",
      initialCode: "function getFilesFromDrop(e) {\n  // kodingizni yozing\n}",
      solution: "function getFilesFromDrop(e) {\n  return e.dataTransfer.files;\n}",
      tests: [
        {
          test: "const e = { dataTransfer: { files: ['file1.txt', 'file2.jpg'] } }; return getFilesFromDrop(e).length === 2;",
          description: "Fayllar massivi qaytarilishi kerak"
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Elementni drag qilish mumkin bo'lishi uchun qaysi atribut kerak?",
      options: [
        "draggable='true'",
        "drag='true'",
        "ondrag='true'",
        "move='true'"
      ],
      correctAnswer: "draggable='true'",
      explanation: "HTML5 da elementlarni tortiladigan qilish uchun draggable='true' atributi qo'shiladi."
    },
    {
      id: "q2",
      question: "Elementni tortish boshlanganda qaysi hodisa (event) ro'y beradi?",
      options: [
        "dragstart",
        "dragbegin",
        "draginit",
        "drag"
      ],
      correctAnswer: "dragstart",
      explanation: "Tortish harakati boshlanishi bilan dragstart hodisasi ishga tushadi."
    },
    {
      id: "q3",
      question: "Element Drop Zone ustida turganda (harakatlanganda) qaysi hodisa doimiy chaqiriladi?",
      options: [
        "dragover",
        "dragenter",
        "hover",
        "dragmove"
      ],
      correctAnswer: "dragover",
      explanation: "Element Drop zone ustida bo'lganida dragover hodisasi doimiy ishlab turadi."
    },
    {
      id: "q4",
      question: "Nima uchun dragover hodisasida e.preventDefault() chaqirish shart?",
      options: [
        "Drop (tashlash) ga ruxsat berish uchun",
        "Elementni o'chirish uchun",
        "Xatoliklarni oldini olish uchun",
        "Brauzerni tezlashtirish uchun"
      ],
      correctAnswer: "Drop (tashlash) ga ruxsat berish uchun",
      explanation: "Brauzer odatda drop qilishga ruxsat bermaydi. Shuning uchun standart xatti-harakatni to'xtatish kerak."
    },
    {
      id: "q5",
      question: "Element Drop Zone ga muvaffaqiyatli tashlanganda qaysi hodisa ishlaydi?",
      options: [
        "drop",
        "dragend",
        "dragfinish",
        "dragleave"
      ],
      correctAnswer: "drop",
      explanation: "Element hududga tashlanganda drop hodisasi yuz beradi."
    },
    {
      id: "q6",
      question: "Tortilayotgan element haqidagi ma'lumotlarni qayerda saqlaymiz?",
      options: [
        "e.dataTransfer",
        "e.target",
        "localStorage",
        "sessionStorage"
      ],
      correctAnswer: "e.dataTransfer",
      explanation: "Drag and Drop API ma'lumotlarni uzatish uchun dataTransfer obyektidan foydalanadi."
    },
    {
      id: "q7",
      question: "DataTransfer ga ma'lumot yozish uchun qaysi metoddan foydalaniladi?",
      options: [
        "setData()",
        "getData()",
        "addData()",
        "write()"
      ],
      correctAnswer: "setData()",
      explanation: "Ma'lumotni xotiraga yozish uchun setData(format, qiymat) ishlatiladi."
    },
    {
      id: "q8",
      question: "Element Drop Zone ga kirganini bildruvchi hodisa qaysi?",
      options: [
        "dragenter",
        "dragover",
        "mouseenter",
        "mouseover"
      ],
      correctAnswer: "dragenter",
      explanation: "Tortilayotgan element Drop Zone hududiga kirganda dragenter hodisasi ro'y beradi."
    },
    {
      id: "q9",
      question: "Drag (tortish) amaliyoti to'liq yakunlanganda (qo'yib yuborilganda) qaysi hodisa ishlaydi?",
      options: [
        "dragend",
        "drop",
        "dragleave",
        "dragstop"
      ],
      correctAnswer: "dragend",
      explanation: "Foydalanuvchi tortilayotgan elementni qo'yib yuborganida dragend hodisasi ro'y beradi."
    },
    {
      id: "q10",
      question: "Tashlangan fayllarni qaysi xususiyat orqali olish mumkin?",
      options: [
        "e.dataTransfer.files",
        "e.target.files",
        "e.data.files",
        "e.files"
      ],
      correctAnswer: "e.dataTransfer.files",
      explanation: "Agar foydalanuvchi kompyuteridan fayl tortib tashlasa, ular e.dataTransfer.files massivida bo'ladi."
    },
    {
      id: "q11",
      question: "HTML5 Drag and Drop API mobil qurilmalarda (sensorli ekranlarda) qanday ishlaydi?",
      options: [
        "To'g'ridan-to'g'ri ishlamaydi, qo'shimcha polyfill kerak",
        "O'zi avtomatik ishlaydi",
        "Faqat planshetlarda ishlaydi",
        "Faqat Android da ishlaydi"
      ],
      correctAnswer: "To'g'ridan-to'g'ri ishlamaydi, qo'shimcha polyfill kerak",
      explanation: "HTML5 DnD API sichqoncha uchun mo'ljallangan, sensor ekranlardagi Touch hodisalarini bevosita qo'llab-quvvatlamaydi."
    },
    {
      id: "q12",
      question: "Element Drop Zone dan chiqib ketganda qaysi hodisa ro'y beradi?",
      options: [
        "dragleave",
        "dragout",
        "dragexit",
        "mouseout"
      ],
      correctAnswer: "dragleave",
      explanation: "Tortilayotgan element Drop Zone hududidan chiqqanida dragleave hodisasi chaqiriladi."
    }
  ]
};

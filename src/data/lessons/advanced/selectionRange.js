export const selectionRange = {
  title: "Selection va Range API",
  theory: `
### 1. Dastlabki tushuncha (Beginner Analogy)

Tasavvur qiling, siz kitob o'qiyapsiz. Kitobdagi eng muhim qatorlarni topish uchun sizga marker kerak. Siz markerni bitta so'zning boshidan qo'yib, boshqa so'zning oxirigacha tortasiz. Natijada ma'lum bir matn qismi "belgilanadi". 

Veb-brauzerda ham huddi shunday mexanizm mavjud. 
- **Range (Oraliq)**: Bu markerning qayerdan boshlanib, qayerda tugashini anglatuvchi aniq koordinatalar (Start va End). Bitta hujjatda birdaniga bir nechta marker qismlari (Range'lar) bo'lishi mumkin.
- **Selection (Belgilash)**: Bu siz hozirda kitobda marker tortgan barcha joylaringizning umumiy to'plami. Odatda, foydalanuvchi faqat bitta joyni belgilaydi, shuning uchun \\\`Selection\\\` asosan o'z ichiga faqat bitta \\\`Range\\\` oladi.

Brauzer API orqali biz xuddi shu jarayonni JavaScript yordamida avtomatlashtirishimiz va kuzatishimiz mumkin.

### 2. Chuqur sho'ng'ish (Deep Dive)

**Under the hood: Range va Selection qanday ishlaydi?**

DOM'da har qanday belgilash kursor (Caret) va kursorning yo'nalishidan iborat. Kursor bir joydan ikkinchi joyga harakatlanganda, brauzer oraliq yaratadi. Buni tushunish uchun quyidagi obyektlarni bilish muhim:

1. **Selection obyekti**: \\\`window.getSelection()\\\` orqali olinadi. U joriy hujjatdagi barcha belgilashlarni boshqaradi.
2. **Range obyekti**: \\\`document.createRange()\\\` orqali yoki \\\`selection.getRangeAt(0)\\\` orqali olinadi. Bu hujjat fragmentining (DocumentFragment) boshlanish va tugash nuqtalari.

**Range Boundary Points (Chegara nuqtalari)**

Range o'zining aniq qayerda joylashganini bilishi uchun ikkita asosiy nuqtaga tayanadi:
- **startContainer** va **startOffset**: Range qayerdan boshlanadi. Agar container matnli tugun (TextNode) bo'lsa, offset - harflar sonini, Element bo'lsa - child tugunlar indeksini bildiradi.
- **endContainer** va **endOffset**: Range qayerda tugaydi.

\\\`\\\`\\\`javascript
const range = document.createRange();
const p = document.querySelector('p');
// p elementining birinchi va ikkinchi farzandlari orasida range yaratadi
range.setStart(p, 0);
range.setEnd(p, 1);
\\\`\\\`\\\`

**Selection Direction (Belgilash yo'nalishi)**

Foydalanuvchi sichqonchani chapdan o'ngga (to'g'ri) yoki o'ngdan chapga (teskari) tortishi mumkin. Buni aniqlash uchun \\\`Selection\\\` obyektining quyidagi xususiyatlaridan foydalanamiz:
- **anchorNode / anchorOffset**: Belgilash boshlangan (sichqoncha bosilgan) joy.
- **focusNode / focusOffset**: Belgilash tugagan (sichqoncha qo'yib yuborilgan) joy.

Agar \\\`anchor\\\` \\\`focus\\\` dan keyin joylashgan bo'lsa, demak belgilash teskari (backward) yo'nalishda qilingan.

**DocumentFragment va oraliq operatsiyalari**

Range ichidagi barcha elementlarni bitta **DocumentFragment** ga ajratib olish imkoni mavjud. Bu orqali biz DOM ni vaqtincha xotirada tahrirlab, yana qaytarib joyiga qo'yishimiz mumkin:
- \\\`range.extractContents()\\\` - Range ichidagi barcha nodelarni DOM'dan kesib (qirqib) oladi va DocumentFragment qaytaradi.
- \\\`range.cloneContents()\\\` - Kesmasdan, shunchaki nusxasini oladi.

### 3. Edge Cases va Senior Interview Questions

**Rich Text Editor (Masalan: Quill, Draft.js, CKEditor) Arxitekturasi qanday ishlaydi?**

*Senior Interview Savoli*: "Agar foydalanuvchi matnni belgilab, 'Bold' tugmasini bosa, DOM da nima o'zgaradi va Range qanday muammolarga duch keladi?"

*Javob*: Rich Text Editor (RTE) lar odatda bevosita DOM Selection va Range API'ni ishlatadi yoki ularni mavhumlashtirib virtual model yaratadi.
Agar oddiy \\\`document.execCommand('bold')\\\` ishlatsak, u eskirgan (deprecated) bo'lib, brauzerlar turli xil HTML teglar (\\\`<b>\\\` yoki \\\`<strong>\\\` yoki \\\`<span style="font-weight:bold">\\\`) generatsiya qiladi. 
Zamonaviy yondashuv:
1. \\\`window.getSelection()\\\` orqali \\\`Range\\\` ni olamiz.
2. \\\`Range.extractContents()\\\` orqali belgilangan qismni ajratib olamiz.
3. Yangi \\\`<strong>\\\` elementi yaratib, ajratilgan qismlarni uning ichiga joylaymiz (\\\`appendChild\\\`).
4. \\\`Range.insertNode()\\\` yordamida o'zgartirilgan \\\`<strong>\\\` elementni qayta DOM'ga tiqamiz.

*Edge Case'lar*:
- Belgilash chegaralari aynan bitta TextNode ichida emas, balki turli blok elementlar (masalan, ikkita alohida \\\`<p>\\\`) ga bo'linib ketgan bo'lishi. Bunday holda \\\`surroundContents()\\\` xato (Exception) tashlaydi. Buning oldini olish uchun yirik editorlar o'zining ichki ma'lumotlar strukturasini (masalan, Daraxt (Tree) yoki Bloklar zanjiri (Linked list)) quradi.

**Arxitektura (Mermaid Diagram)**

\\\`\\\`\\\`mermaid
graph TD
    A[Window] --> B[Selection Object]
    B --> C[Range 0]
    B --> D[Range 1...n - Firefox]
    C --> E[startContainer / startOffset]
    C --> F[endContainer / endOffset]
    E -.-> G[Text Node yoki Element Node]
    F -.-> G
    C --> H[DocumentFragment extraction]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Get Selected Text",
      description: "Joriy belgilangan (highlight qilingan) matnni string sifatida qaytaruvchi funksiya yozing.",
      initialCode: "function getSelectedText() {\n  \n}",
      solution: "function getSelectedText() {\n  return window.getSelection().toString();\n}",
      tests: [
        {
          test: "const sel = {toString: () => 'hello'}; const original = window.getSelection; window.getSelection = () => sel; const res = getSelectedText(); window.getSelection = original; return res === 'hello';",
          description: "window.getSelection().toString() qaytarilishi kerak"
        }
      ]
    },
    {
      id: 2,
      title: "Clear Selection",
      description: "Joriy barcha belgilashlarni tozalab tashlovchi (removeAllRanges) funksiya yozing.",
      initialCode: "function clearSelection() {\n  \n}",
      solution: "function clearSelection() {\n  const sel = window.getSelection();\n  if (sel) sel.removeAllRanges();\n}",
      tests: [
        {
          test: "let called = false; const sel = {removeAllRanges: () => called = true}; const original = window.getSelection; window.getSelection = () => sel; clearSelection(); window.getSelection = original; return called;",
          description: "removeAllRanges() metodi chaqirilishi kerak"
        }
      ]
    },
    {
      id: 3,
      title: "Select Element Contents",
      description: "Berilgan DOM elementining barcha ichki qismlarini Range yordamida belgilang va Selection'ga qo'shing.",
      initialCode: "function selectElement(el) {\n  \n}",
      solution: "function selectElement(el) {\n  const selection = window.getSelection();\n  selection.removeAllRanges();\n  const range = document.createRange();\n  range.selectNodeContents(el);\n  selection.addRange(range);\n}",
      tests: [
        {
          test: "let added = false; const fakeRange = {selectNodeContents: function(e){this.el = e}}; const fakeSel = {removeAllRanges: () => {}, addRange: function(r){ if(r.el) added = true; }}; const oldCR = document.createRange; const oldGS = window.getSelection; document.createRange = () => fakeRange; window.getSelection = () => fakeSel; selectElement({}); document.createRange = oldCR; window.getSelection = oldGS; return added;",
          description: "selectNodeContents va addRange chaqirilishi kerak"
        }
      ]
    },
    {
      id: 4,
      title: "Is Backward Selection?",
      description: "Joriy belgilash yo'nalishini aniqlang. Oddiy usul: anchorNode va focusNode bir xil bo'lib, anchorOffset > focusOffset bo'lsa teskari (backward) hisoblanadi. Agar teskari bo'lsa true, aks holda false qaytaring.",
      initialCode: "function isBackward() {\n  \n}",
      solution: "function isBackward() {\n  const sel = window.getSelection();\n  if(!sel || sel.rangeCount === 0) return false;\n  return sel.anchorNode === sel.focusNode && sel.anchorOffset > sel.focusOffset;\n}",
      tests: [
        {
          test: "const sel = {rangeCount: 1, anchorNode: 'A', focusNode: 'A', anchorOffset: 5, focusOffset: 2}; const old = window.getSelection; window.getSelection = () => sel; const res = isBackward(); window.getSelection = old; return res === true;",
          description: "anchorOffset > focusOffset bo'lsa true qaytaradi"
        }
      ]
    },
    {
      id: 5,
      title: "Extract Selection",
      description: "Joriy Selection dagi birinchi Range ichidagi kontentni DOM dan ajratib oluvchi (extractContents) va qaytaruvchi funksiya yarating.",
      initialCode: "function extractSelected() {\n  \n}",
      solution: "function extractSelected() {\n  const sel = window.getSelection();\n  if (sel.rangeCount > 0) {\n    const range = sel.getRangeAt(0);\n    return range.extractContents();\n  }\n  return null;\n}",
      tests: [
        {
          test: "const fakeRange = {extractContents: () => 'FRAG'}; const sel = {rangeCount: 1, getRangeAt: () => fakeRange}; const old = window.getSelection; window.getSelection = () => sel; const res = extractSelected(); window.getSelection = old; return res === 'FRAG';",
          description: "Birinchi range dan extractContents() chaqiriladi"
        }
      ]
    },
    {
      id: 6,
      title: "Surround Selection",
      description: "Belgilangan qismni berilgan HTML elementi (node) bilan o'rab qoldiradigan funksiya yozing. Buning uchun surroundContents ishlating.",
      initialCode: "function surroundWith(elementNode) {\n  \n}",
      solution: "function surroundWith(elementNode) {\n  const sel = window.getSelection();\n  if (sel.rangeCount > 0) {\n    sel.getRangeAt(0).surroundContents(elementNode);\n  }\n}",
      tests: [
        {
          test: "let surrounded = false; const fakeRange = {surroundContents: (n) => { if(n === 'EL') surrounded = true; }}; const sel = {rangeCount: 1, getRangeAt: () => fakeRange}; const old = window.getSelection; window.getSelection = () => sel; surroundWith('EL'); window.getSelection = old; return surrounded;",
          description: "surroundContents(elementNode) ishlatilishi kerak"
        }
      ]
    },
    {
      id: 7,
      title: "Clone Selected Contents",
      description: "Birinchi Range ichidagi narsalarni DOM dan kesmasdan, nusxasini oling (cloneContents) va qaytaring.",
      initialCode: "function cloneSelected() {\n  \n}",
      solution: "function cloneSelected() {\n  const sel = window.getSelection();\n  if(sel.rangeCount > 0) {\n    return sel.getRangeAt(0).cloneContents();\n  }\n  return null;\n}",
      tests: [
        {
          test: "const fakeRange = {cloneContents: () => 'CLONE'}; const sel = {rangeCount: 1, getRangeAt: () => fakeRange}; const old = window.getSelection; window.getSelection = () => sel; const res = cloneSelected(); window.getSelection = old; return res === 'CLONE';",
          description: "cloneContents chaqiriladi"
        }
      ]
    },
    {
      id: 8,
      title: "Collapse Selection",
      description: "Joriy belgilashni boshiga qarab qisqartiring. Funksiya ichida Range'ning collapse(true) metodidan foydalaning.",
      initialCode: "function collapseToBeginning() {\n  \n}",
      solution: "function collapseToBeginning() {\n  const sel = window.getSelection();\n  if(sel.rangeCount > 0) {\n    sel.getRangeAt(0).collapse(true);\n  }\n}",
      tests: [
        {
          test: "let isTrue = false; const fakeRange = {collapse: (b) => isTrue = b}; const sel = {rangeCount: 1, getRangeAt: () => fakeRange}; const old = window.getSelection; window.getSelection = () => sel; collapseToBeginning(); window.getSelection = old; return isTrue === true;",
          description: "Range collapse(true) bilan ishlatilishi kerak"
        }
      ]
    },
    {
      id: 9,
      title: "Insert Node to Selection",
      description: "Joriy belgilashning (Range) boshlang'ich nuqtasiga berilgan elementNode'ni qo'shing. insertNode dan foydalaning.",
      initialCode: "function insertAtCursor(elementNode) {\n  \n}",
      solution: "function insertAtCursor(elementNode) {\n  const sel = window.getSelection();\n  if(sel.rangeCount > 0) {\n    sel.getRangeAt(0).insertNode(elementNode);\n  }\n}",
      tests: [
        {
          test: "let inserted = false; const fakeRange = {insertNode: (el) => {if(el === 'NODE') inserted = true}}; const sel = {rangeCount: 1, getRangeAt: () => fakeRange}; const old = window.getSelection; window.getSelection = () => sel; insertAtCursor('NODE'); window.getSelection = old; return inserted;",
          description: "insertNode to'g'ri element bilan ishlatiladi"
        }
      ]
    },
    {
      id: 10,
      title: "Create Custom Range",
      description: "Ikkita element va offset beriladi. Yangi Range yaratib, uning boshlanish va tugash nuqtalarini sozlang va shu Range'ni qaytaring.",
      initialCode: "function makeCustomRange(startNode, startOffset, endNode, endOffset) {\n  \n}",
      solution: "function makeCustomRange(startNode, startOffset, endNode, endOffset) {\n  const range = document.createRange();\n  range.setStart(startNode, startOffset);\n  range.setEnd(endNode, endOffset);\n  return range;\n}",
      tests: [
        {
          test: "let start = false, end = false; const fakeRange = {setStart: (n,o) => {if(n==='A' && o===1) start = true}, setEnd: (n,o) => {if(n==='B' && o===2) end = true}}; const old = document.createRange; document.createRange = () => fakeRange; makeCustomRange('A',1,'B',2); document.createRange = old; return start && end;",
          description: "setStart va setEnd dan to'g'ri foydalanilishi kerak"
        }
      ]
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "window.getSelection() qanday obyekt qaytaradi?",
      options: ["Range", "Selection", "DocumentFragment", "String"],
      answer: "Selection",
      explanation: "U joriy hujjatning Selection obyektini qaytaradi, u orqali belgilashlarni boshqarish mumkin."
    },
    {
      id: 2,
      question: "Selection ichida standart bo'yicha odatda nechta Range obyekti bo'ladi?",
      options: ["0", "1", "Cheksiz", "2"],
      answer: "1",
      explanation: "Aksariyat brauzerlarda bir vaqtning o'zida faqat 1 ta Range bo'lishiga ruxsat berilgan (Firefox dan tashqari)."
    },
    {
      id: 3,
      question: "Belgilash qayerdan boshlanganligini ko'rsatadigan xususiyat qaysi?",
      options: ["focusNode", "anchorNode", "startContainer", "baseNode"],
      answer: "anchorNode",
      explanation: "Selection obyektining anchorNode xususiyati foydalanuvchi belgilashni qayerdan boshlaganini (sichqonchani qayerda bosganini) bildiradi."
    },
    {
      id: 4,
      question: "Range obyektini yaratish uchun qaysi metod ishlatiladi?",
      options: ["window.getRange()", "document.createRange()", "selection.addRange()", "new Range()"],
      answer: "document.createRange()",
      explanation: "Yangi bo'sh oraliq yaratish uchun document.createRange() ishlatiladi."
    },
    {
      id: 5,
      question: "Range ichidagi matnni (nodelarni) DOM dan kesib olish (o'chirish) va DocumentFragment ga o'tkazish metodi qaysi?",
      options: ["cloneContents()", "extractContents()", "deleteContents()", "surroundContents()"],
      answer: "extractContents()",
      explanation: "extractContents nodelarni haqiqiy DOM'dan olib tashlaydi va o'zgaruvchida ishlatish uchun qaytaradi."
    },
    {
      id: 6,
      question: "Joriy barcha belgilashlarni bekor qilish uchun (Selection'dan olib tashlash) qaysi metod ishlatiladi?",
      options: ["clearSelection()", "deleteRanges()", "removeAllRanges()", "removeSelection()"],
      answer: "removeAllRanges()",
      explanation: "Selection dan barcha Range larni olib tashlash va belgilashni tozalash uchun shu metod kerak."
    },
    {
      id: 7,
      question: "surroundContents() metodi qachon xatolik (Exception) beradi?",
      options: [
        "Agar element bo'sh bo'lsa",
        "Agar Range chegaralari bir nechta turli elementlarga qisman bo'linib ketgan bo'lsa",
        "Agar faqat oddiy matn tanlangan bo'lsa",
        "Bu metod umuman xato bermaydi"
      ],
      answer: "Agar Range chegaralari bir nechta turli elementlarga qisman bo'linib ketgan bo'lsa",
      explanation: "Masalan, <p> ning o'rtasidan boshqa <p> ning o'rtasigacha bo'lgan qismni yagona tag bilan o'rab bo'lmaydi."
    },
    {
      id: 8,
      question: "Belgilangan matnni faqat string ko'rinishida olish uchun nima ishlatamiz?",
      options: ["selection.getText()", "selection.toString()", "range.valueOf()", "selection.text"],
      answer: "selection.toString()",
      explanation: "Selection obyektini to'g'ridan-to'g'ri string'ga o'tkazish undagi barcha matnni olib beradi."
    },
    {
      id: 9,
      question: "Selection ning focusNode xususiyati nimani anglatadi?",
      options: ["Matnning qayerda tugaganini", "Sichqoncha kursorining yakuniy holatini (qo'yib yuborilgan joyni)", "Oynaning markazini", "Asosiy nodeni"],
      answer: "Sichqoncha kursorining yakuniy holatini (qo'yib yuborilgan joyni)",
      explanation: "anchorNode bu boshlang'ich nuqta, focusNode esa oxirgi nuqta hisoblanadi."
    },
    {
      id: 10,
      question: "Range ni faqat boshiga (yoki oxiriga) qisqartirib, nuqtaga aylantiruvchi metod qaysi?",
      options: ["collapse()", "shrink()", "reduce()", "focus()"],
      answer: "collapse()",
      explanation: "range.collapse(true) uni faqat boshlang'ich nuqtasiga yig'adi."
    },
    {
      id: 11,
      question: "range.selectNodeContents(node) metodi nima qiladi?",
      options: [
        "Nodening o'zini belgilaydi",
        "Nodening barcha ichki elementlari va matnlarini Range qilib oladi",
        "Nodeni o'chirib yuboradi",
        "Nodedan oldingi narsalarni belgilaydi"
      ],
      answer: "Nodening barcha ichki elementlari va matnlarini Range qilib oladi",
      explanation: "U node ichidagi bolalar (children) to'plamini to'liq belgilash uchun xizmat qiladi."
    },
    {
      id: 12,
      question: "Range dagi boshlang'ich nuqtaga (startContainer/startOffset) yangi Node qo'shish uchun qaysi metod mavjud?",
      options: ["appendChild()", "insertNode()", "prepend()", "addBefore()"],
      answer: "insertNode()",
      explanation: "range.insertNode(newNode) orqali kursor turgan joyga (yoki Range boshiga) yangi element qo'shish mumkin."
    }
  ]
};

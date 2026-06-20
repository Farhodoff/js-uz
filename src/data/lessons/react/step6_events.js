export const step6_events = {
  title: "6-DARS: Hodisalar (Events)",
  content: `
# 1. 🖱️ React'da Hodisalar nima?

Foydalanuvchi sayt bilan qandaydir interaksiyaga kirishishi (tugmani bosish, inputga yozish, sichqonchani surish) **Hodisa (Event)** deyiladi.
React'da hodisalarni tutib olish oddiy HTML ga juda o'xshaydi, lekin bir nechta muhim sintaktik farqlari bor.

### Asosiy qoidalar:
1.  **CamelCase yozilish:** HTML da \`onclick\` kichik harfda yozilsa, React (JSX) da \`onClick\` (tuykash usuli) da yoziladi. Huddi shunday \`onChange\`, \`onSubmit\`, \`onMouseEnter\`.
2.  **String emas, Funksiya uzatish:** HTML da \`onclick="myFunction()"\` deb matn yozardik. React da esa jingalak qavslar ichida \`onClick={myFunction}\` deb to'g'ridan-to'g'ri funksiya ko'rsatiladi.

---

## 2. 🎭 Synthetic Events (Sintetik Hodisalar)

Har xil brauzerlar (Safari, Chrome, Firefox) hodisalarni ozgina farqli talqin qilishi mumkin. React bu muammoni chetlab o'tish uchun barcha hodisalarni bitta standartga soluvchi o'ram (Wrapper) — **SyntheticEvent** ni yaratgan.

Sizning funksiyangiz qabul qiladigan \`event\` (yoki \`e\`) obyekti aynan shu SyntheticEvent dir.
\`\`\`jsx
function tugmaBosilganda(e) {
  // e - bu synthetic event. Barcha brauzerda bir xil ishlaydi
  console.log("Qaysi element bosildi?", e.target);
}
\`\`\`

---

## 3. ⚠️ Eng ko'p tarqalgan xato (Darhol chaqirish)

Boshlovchilar eng ko'p adashadigan joy — hodisaga funksiya bog'lash:

❌ **XATO:**
\`\`\`jsx
<button onClick={salomBer()}>Bosish</button>
\`\`\`
Bunday yozsangiz, funksiya tugma bosilganda emas, komponent ekranga chizilayotgan paytning o'zida (darhol) ishga tushib ketadi!

✅ **TO'G'RI:**
\`\`\`jsx
<button onClick={salomBer}>Bosish</button>
\`\`\`

**Agar funksiyaga parametr yuborish kerak bo'lsa nima qilamiz?**
Buning uchun uni albatta strelkali (arrow) anonim funksiya ichiga o'rash kerak:
\`\`\`jsx
<button onClick={() => salomBer("Farhod")}>Bosish</button>
\`\`\`

---

## 4. 📝 Eng mashhur hodisalar

*   **\`onClick\`**: Element ustiga bosilganda. (Asosan tugmalar uchun)
*   **\`onChange\`**: Input (matn maydoni) da nimadir o'zgarganda. Yozilgan matnni \`e.target.value\` orqali tutib olinadi va odatda State ga yozib boriladi.
*   **\`onSubmit\`**: Forma (Form) yuborilganda ishlashi kerak. Odatda sahifa qayta yuklanmasligi uchun formaning birinchi qatorida \`e.preventDefault()\` deb yoziladi.
*   **\`onKeyDown\` / \`onKeyUp\`**: Klaviatura tugmasi bosilganda (masalan, Enter tugmasini tekshirish uchun).
`,
  code: `import React, { useState } from "react";

export default function EventDemo() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState(["Uyqudan turish", "Kofe ichish"]);

  // 1. Oddiy onClick hodisasi
  const handleClick = () => {
    alert("Tugma muvaffaqiyatli bosildi! 🚀");
  };

  // 2. onChange hodisasi (Inputdagi ma'lumotni state ga yozamiz)
  const handleChange = (e) => {
    // e.target.value orqali inputdagi yozuv olinadi
    setInputText(e.target.value);
  };

  // 3. onSubmit hodisasi (Forma jo'natilganda ishlashi uchun)
  const handleSubmit = (e) => {
    e.preventDefault(); // Brauzer sahifani yangilab yuborishining oldini oladi
    
    if(inputText.trim() !== "") {
      setTasks([...tasks, inputText]); // Yangi vazifani eski vazifalarga qo'shamiz
      setInputText(""); // Inputni tozalaymiz
    }
  };

  // 4. Parametrli hodisa (O'chirish tugmasi uchun)
  const handleDelete = (indexToDelete) => {
    const newTasks = tasks.filter((task, index) => index !== indexToDelete);
    setTasks(newTasks);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>1. Tugma bosilishi (onClick)</h2>
      <button onClick={handleClick} style={btnStyle}>Salom deyish</button>
      
      <hr style={{ margin: "30px 0" }}/>

      <h2>2. Forma va Input (onChange, onSubmit)</h2>
      
      {/* Formaga onSubmit biriktiramiz */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input 
          type="text" 
          value={inputText}
          onChange={handleChange}
          placeholder="Yangi vazifa yozing..." 
          style={{ padding: 10, width: 250, marginRight: 10 }}
        />
        <button type="submit" style={{...btnStyle, background: "#27ae60", color: "white"}}>
          Qo'shish
        </button>
      </form>

      {/* Vazifalar ro'yxatini chiqaramiz */}
      <ul style={{ background: "#f8f9fa", padding: 20, borderRadius: 8, listStyle: 'none' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{index + 1}. {task}</span>
            {/* Diqqat: handleDelete parametr qabul qilgani uchun uni anonim funksiya orqali yuboryapmiz! */}
            <button onClick={() => handleDelete(index)} style={{ padding: 5, background: "#e74c3c", color: "white", border: "none", cursor: "pointer" }}>
              O'chirish 🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const btnStyle = {
  padding: "10px 15px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "1px solid #ccc"
};`,
  exercises: [
    {
      id: 1,
      title: "Input dagi o'zgarishni tutish",
      instruction: "O'ng tomondagi muharrirda `input` tegi bor. Siz unga `onChange` hodisasini ulab, inputga yozilayotgan matnni `text` deb nomlangan state'ga yozishingiz kerak. Ekranda siz yozayotgan narsa paydo bo'lishi kerak.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [text, setText] = useState('');\n\n  // 1. handleInput nomli funksiya yarating va setText ni ishlating\n\n  return (\n    <div>\n      {/* 2. Shu inputga onChange hodisasini ulang */}\n      <input type=\"text\" placeholder=\"Nimadir yozing...\" />\n      \n      <h3>Siz yozyapsiz: {text}</h3>\n    </div>\n  );\n}",
      hint: "const handleInput = (e) => setText(e.target.value); va input ga onChange={handleInput} yozing.",
      test: "if (!code.includes('onChange=')) return 'input tegi ichida onChange hodisasini yozing.'; if (!code.includes('e.target.value') && !code.includes('event.target.value')) return 'Inputdagi matnni olish uchun e.target.value dan foydalaning.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React da tugmaga hodisa biriktirishning TO'G'RI usulini toping (parametrli holatda):",
      options: [
        "<button onClick={deleteTask(5)}>O'chirish</button>",
        "<button onclick=\"deleteTask(5)\">O'chirish</button>",
        "<button onClick={() => deleteTask(5)}>O'chirish</button>",
        "<button click={deleteTask(5)}>O'chirish</button>"
      ],
      correctAnswer: 2,
      explanation: "Agar parametr yuborish kerak bo'lsa, uni onClick={deleteTask(5)} deb yozib bo'lmaydi, chunki u sahifa chizilayotganida darhol ishlab ketadi. Anonim (strelkali) funksiya ishlatish majburiydir."
    },
    {
      question: "Formadagi tugma (Submit) bosilganda, brauzer sahifani yangilab yubormasligi (refresh) bo'lmasligi uchun nima qilish kerak?",
      options: [
        "Tugmani HTML da <button type='button'> ga o'zgartirish kerak",
        "handleSubmit funksiyasi ichida e.preventDefault() buyrug'ini chaqirish kerak",
        "React o'zi buni avtomatik to'xtatadi",
        "Form tagini o'chirib tashlash kerak"
      ],
      correctAnswer: 1,
      explanation: "Barcha brauzerlarda Form ichidagi Submit hodisasi sahifani yangilab yuboradi. Buni to'xtatish uchun formadagi onSubmit handlerida event.preventDefault() chaqirilishi shart."
    }
  ]
};

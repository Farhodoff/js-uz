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
      title: "Oddiy onClick hodisasi",
      instruction: "Tugma bosilganda 'count' state'ini 1 taga oshiradigan 'handleClick' funksiyasini yozing va uni 'onClick' orqali tugmaga ulang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  // handleClick funksiyasini yarating\n\n  return (\n    <div>\n      <button>Bosish: {count}</button>\n    </div>\n  );\n}",
      hint: "handleClick funksiyasini yarating: const handleClick = () => setCount(count + 1); Tugmaga esa onClick={handleClick} deb yozing.",
      test: "if (!code.includes('onClick=')) return 'Tugmaga onClick hodisasini qo\'shing.'; if (!code.includes('setCount') || !code.includes('count + 1')) return 'setCount(count + 1) orqali state ni oshirish kerak.'; return null;"
    },
    {
      id: 2,
      title: "Parametrli onClick hodisasi",
      instruction: "Tugmalar yordamida 'ism' state'ini o'zgartiring. onClick ichida anonim funksiya orqali 'o\'zgartirish' funksiyasiga kerakli ismni uzating.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [ism, setIsm] = useState('Noma\'lum');\n\n  const ozgartirish = (yangiIsm) => {\n    setIsm(yangiIsm);\n  };\n\n  return (\n    <div>\n      <h2>Ism: {ism}</h2>\n      {/* Tugmalarga onClick ulab, ozgartirish funksiyasiga ism yuboring */}\n      <button>Ali</button>\n      <button>Vali</button>\n    </div>\n  );\n}",
      hint: "onClick={() => ozgartirish('Ali')} va onClick={() => ozgartirish('Vali')} deb yozish kerak.",
      test: "if (!code.match(/onClick\s*=\s*\{\s*\(\s*\)\s*=>\s*ozgartirish\s*\(\s*['\"]Ali['\"]\s*\)\s*\}/)) return 'Birinchi tugmada onClick ichida arrow function orqali Ali ismini uzating.'; return null;"
    },
    {
      id: 3,
      title: "Input dagi o'zgarishni tutish (onChange)",
      instruction: "O'ng tomondagi muharrirda 'input' tegi bor. Unga 'onChange' hodisasini ulab, yozilayotgan matnni 'text' nomli state'ga yozing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [text, setText] = useState('');\n\n  // handleInput nomli funksiya yarating va setText ni ishlating\n\n  return (\n    <div>\n      {/* Shu inputga onChange hodisasini ulang */}\n      <input type=\"text\" placeholder=\"Nimadir yozing...\" />\n      \n      <h3>Siz yozyapsiz: {text}</h3>\n    </div>\n  );\n}",
      hint: "const handleInput = (e) => setText(e.target.value); yarating. Inputga value={text} va onChange={handleInput} yozing.",
      test: "if (!code.includes('onChange=')) return 'input tegi ichida onChange hodisasini yozing.'; if (!code.includes('e.target.value') && !code.includes('event.target.value')) return 'Inputdagi matnni olish uchun e.target.value dan foydalaning.'; return null;"
    },
    {
      id: 4,
      title: "Checkbox holatini o'zgartirish",
      instruction: "Checkbox bosilganda (onChange), 'isChecked' state'ini uning teskarisiga o'zgartiring. 'e.target.checked' dan foydalaning.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [isChecked, setIsChecked] = useState(false);\n\n  const handleCheck = (e) => {\n    // Shu yerni to'ldiring\n  };\n\n  return (\n    <div>\n      <label>\n        <input type=\"checkbox\" checked={isChecked} onChange={handleCheck} />\n        Shartlarni qabul qilaman\n      </label>\n      <p>Holat: {isChecked ? 'Qabul qilindi' : 'Qabul qilinmadi'}</p>\n    </div>\n  );\n}",
      hint: "setIsChecked(e.target.checked) yoki setIsChecked(!isChecked) orqali state'ni o'zgartirishingiz mumkin.",
      test: "if (!code.includes('setIsChecked(e.target.checked)') && !code.includes('setIsChecked(!isChecked)')) return 'Checkbox holatini state ga yozish uchun setIsChecked ni e.target.checked bilan ishlating.'; return null;"
    },
    {
      id: 5,
      title: "Formani jo'natish (onSubmit)",
      instruction: "Forma yuborilganda sahifa yangilanmasligi kerak. 'handleSubmit' funksiyasida buning oldini oling va 'alert(name)' orqali ismni ko'rsating.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [name, setName] = useState('');\n\n  const handleSubmit = (e) => {\n    // Sahifa yangilanishini to'xtating va alert chiqaring\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={e => setName(e.target.value)} />\n      <button type=\"submit\">Yuborish</button>\n    </form>\n  );\n}",
      hint: "handleSubmit ichida eng birinchi bo'lib e.preventDefault() buyrug'ini chaqiring, keyin alert(name) qiling.",
      test: "if (!code.includes('e.preventDefault()')) return 'Sahifa yangilanishining oldini olish uchun e.preventDefault() yozilishi shart.'; if (!code.includes('alert(name)')) return 'alert(name) ni chaqirishingiz kerak.'; return null;"
    },
    {
      id: 6,
      title: "onMouseEnter va onMouseLeave",
      instruction: "Sichqoncha matn ustiga borganida fonini sariqqa bo'yang (isHovered = true), uzoqlashganda yana oq (isHovered = false) qiling. Matnga ikkita hodisa qo'shing.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [isHovered, setIsHovered] = useState(false);\n\n  return (\n    <div \n      style={{ backgroundColor: isHovered ? 'yellow' : 'white', padding: '20px' }}\n      // Shu yerda onMouseEnter va onMouseLeave hodisalarini ulang\n    >\n      Mening ustimga kelsangiz, rangim o'zgaradi!\n    </div>\n  );\n}",
      hint: "div tegiga onMouseEnter={() => setIsHovered(true)} va onMouseLeave={() => setIsHovered(false)} yozish kerak.",
      test: "if (!code.includes('onMouseEnter=')) return 'onMouseEnter hodisasini qo\'shmadingiz.'; if (!code.includes('onMouseLeave=')) return 'onMouseLeave hodisasini qo\'shmadingiz.'; return null;"
    },
    {
      id: 7,
      title: "Klaviaturadan ma'lumot ushlash (onKeyDown)",
      instruction: "Foydalanuvchi inputda 'Enter' (yoki 'Enter') tugmasini bossa, ekranga 'Enter bosildi!' degan yozuv chiqsin (msg state'iga yozing). Buning uchun onKeyDown dan foydalaning.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [msg, setMsg] = useState('');\n\n  const handleKeyDown = (e) => {\n    // Agar bosilgan tugma (e.key) 'Enter' bo'lsa, msg ni o'zgartiring\n  };\n\n  return (\n    <div>\n      <input type=\"text\" onKeyDown={handleKeyDown} />\n      <p>{msg}</p>\n    </div>\n  );\n}",
      hint: "handleKeyDown ichida if (e.key === 'Enter') { setMsg('Enter bosildi!'); } deb yozing.",
      test: "if (!code.includes('e.key === \\'Enter\\'') && !code.includes('e.key===\\'Enter\\'') && !code.includes('e.key === \"Enter\"')) return 'Bosilgan tugma Enter ekanligini e.key === \\'Enter\\' orqali tekshiring.'; return null;"
    },
    {
      id: 8,
      title: "Inputni fokuslash (onFocus va onBlur)",
      instruction: "Input ustiga bosib kursor tushganda (onFocus) uning border rangi 'qizil' bo'lsin. Kursor chiqqanda (onBlur) rangi oddiy qora bo'lsin. 'isFocused' state'dan foydalaning.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [isFocused, setIsFocused] = useState(false);\n\n  return (\n    <input \n      type=\"text\" \n      style={{ border: isFocused ? '2px solid red' : '1px solid black' }}\n      // Shu yerda onFocus va onBlur ulab, state'ni o'zgartiring\n    />\n  );\n}",
      hint: "onFocus={() => setIsFocused(true)} va onBlur={() => setIsFocused(false)} dan foydalaning.",
      test: "if (!code.includes('onFocus=')) return 'onFocus hodisasini qo\'shmadingiz.'; if (!code.includes('onBlur=')) return 'onBlur hodisasini qo\'shmadingiz.'; return null;"
    },
    {
      id: 9,
      title: "Obyekt state va bitta onChange",
      instruction: "Ikkita input bor: ism va familiya. Ularning ikkisiga ham bitta umumiy 'handleChange' funksiyasini ulang. Funksiya ichida obyektdagi faqat o'zgargan maydonni yangilang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [form, setForm] = useState({ ism: '', familiya: '' });\n\n  const handleChange = (e) => {\n    // e.target.name va e.target.value orqali state ni yangilang\n  };\n\n  return (\n    <div>\n      <input name=\"ism\" value={form.ism} onChange={handleChange} />\n      <input name=\"familiya\" value={form.familiya} onChange={handleChange} />\n      <p>Salom, {form.ism} {form.familiya}</p>\n    </div>\n  );\n}",
      hint: "setForm({ ...form, [e.target.name]: e.target.value }) orqali state ni to'g'ri yangilang.",
      test: "if (!code.includes('...form') || (!code.includes('[e.target.name]') && !code.includes('[name]'))) return 'State ni yangilashda spred operator (...form) va [e.target.name] dan foydalaning.'; return null;"
    },
    {
      id: 10,
      title: "Ikki marta bosish (onDoubleClick)",
      instruction: "Qutini (div) ustiga ikki marta tez bossangiz (onDoubleClick), uning rangi ko'k (blue) rangga kirsin, yana ikki marta bossangiz qizil (red) ga qaytsin. Buning uchun 'isBlue' state'ini ishlating.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [isBlue, setIsBlue] = useState(false);\n\n  return (\n    <div \n      style={{ width: 100, height: 100, backgroundColor: isBlue ? 'blue' : 'red' }}\n      // onDoubleClick ulab, isBlue state ini teskarisiga o'zgartiring\n    >\n    </div>\n  );\n}",
      hint: "div tegiga onDoubleClick={() => setIsBlue(!isBlue)} deb yozing.",
      test: "if (!code.includes('onDoubleClick=')) return 'onDoubleClick hodisasi qo\'shilmagan.'; if (!code.includes('setIsBlue(!isBlue)')) return 'setIsBlue(!isBlue) yordamida qiymatni almashtiring.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React da hodisalar qanday uslubda yoziladi?",
      options: [
        "Kichik harflar bilan (onclick, onchange)",
        "CamelCase uslubida (onClick, onChange)",
        "Chiziqcha bilan (on-click, on-change)",
        "Katta harflar bilan (ONCLICK, ONCHANGE)"
      ],
      correctAnswer: 1,
      explanation: "React-da JSX sintaksisida barcha DOM hodisalari camelCase uslubida yoziladi: onClick, onChange, onSubmit va hokazo."
    },
    {
      question: "React da hodisaga qanday qiymat uzatiladi?",
      options: [
        "String, masalan: onClick=\"myFunction()\"",
        "Obyekt, masalan: onClick={{ function: myFunction }}",
        "Funksiya (callback), masalan: onClick={myFunction}",
        "Massiv, masalan: onClick={[myFunction]}"
      ],
      correctAnswer: 2,
      explanation: "React-da hodisaga qiymat sifatida har doim funksiya beriladi. Biz funksiyani chaqirmasdan, uni ko'rsatamiz: onClick={myFunction}."
    },
    {
      question: "React dagi 'SyntheticEvent' nima?",
      options: [
        "Brauzerlar o'rtasida farq qiluvchi xususiyatlarni birxillashtiruvchi React obyekti",
        "Bu faqat mobil qurilmalar uchun mo'ljallangan hodisalar",
        "U sun'iy intellekt orqali hodisalarni tahlil qiladigan vosita",
        "Formani xatolarni tekshirib yuboradigan obyekt"
      ],
      correctAnswer: 0,
      explanation: "SyntheticEvent — bu React tomonidan taqdim etiladigan obyekt bo'lib, har xil brauzerlardagi (Chrome, Safari, Firefox) event farqlarini tekislab, ularni bitta qolipga keltiradi."
    },
    {
      question: "Agar parametrli funksiya kerak bo'lsa, nima qilish kerak?",
      options: [
        "<button onClick={deleteTask(5)}>",
        "<button onClick=\"deleteTask(5)\">",
        "<button onClick={() => deleteTask(5)}>",
        "React'da funksiyaga parametr yuborib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Funksiyani chaqirib qoysangiz, u komponent chizilishi bilan ishlab ketadi. Shuning uchun uni anonim (arrow) funksiya bilan berish kerak: onClick={() => deleteTask(5)}."
    },
    {
      question: "Forma yuborilganda sahifa yangilanishining oldini olish uchun qaysi funksiya chaqiriladi?",
      options: [
        "e.stopPropagation()",
        "e.preventDefault()",
        "e.halt()",
        "e.cancel()"
      ],
      correctAnswer: 1,
      explanation: "e.preventDefault() — brauzerning tabiiy xatti-harakatini (masalan, formani jo'natishdagi refreshni yoki havolaga bosganda boshqa sahifaga o'tishni) to'xtatadi."
    },
    {
      question: "Inputga matn kiritilayotganda kiritilgan qiymatni qanday olish mumkin?",
      options: [
        "e.value",
        "e.input.text",
        "e.target.value",
        "e.text"
      ],
      correctAnswer: 2,
      explanation: "Hodisani qo'zg'atgan elementga 'e.target' orqali ulanamiz, va u yerdagi qiymatni olish uchun 'e.target.value' dan foydalanamiz."
    },
    {
      question: "React'da element ustiga sichqoncha kelishini ushlab qoluvchi hodisa nomi nima?",
      options: [
        "onMouseHover",
        "onMouseEnter",
        "onMouseOver",
        "Ikkalasi ham: onMouseEnter va onMouseOver bo'lishi mumkin"
      ],
      correctAnswer: 3,
      explanation: "Ikkalasi ham bor. onMouseEnter asosan hover qilinganda bitta trigger ishlaydi, onMouseOver esa ichki elementlarga o'tganda ham pufak (bubbling) hosil qilishi bilan biroz farq qiladi. Ko'pincha onMouseEnter qulayroq."
    },
    {
      question: "onKeyDown va onKeyUp farqi nima?",
      options: [
        "onKeyDown klaviatura bosilganda, onKeyUp klaviatura qo'yib yuborilganda ishlaydi",
        "onKeyDown faqat raqamlar, onKeyUp faqat harflar uchun",
        "Ikkalasi bir xil ishlaydi, hech qanday farqi yo'q",
        "onKeyDown faqat Windows da, onKeyUp MacOS da ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "onKeyDown klaviaturadagi tugma bosilib turgan paytda, onKeyUp esa o'sha tugma bosilib qo'yib yuborilgan (ko'tarilgan) paytda ishga tushadi."
    },
    {
      question: "Bir marta emas, ikki marta tezkor bosish (double click) ni qaysi hodisa ushlaydi?",
      options: [
        "onClick={2}",
        "onDoubleClick",
        "onDblClick",
        "onTwiceClick"
      ],
      correctAnswer: 2,
      explanation: "React-da JavaScript'ning 'dblclick' hodisasi uchun onDoubleClick atributi ishlatiladi."
    },
    {
      question: "Agar e.stopPropagation() chaqirilsa nima yuz beradi?",
      options: [
        "Sahifa yangilanishi to'xtaydi",
        "Hodisaning ota elementlarga qarab pufaksimon yuqoriga o'tishi (bubbling) to'xtatiladi",
        "Funksiya ishlashdan to'xtaydi",
        "Barcha statelar avtomatik yangilanadi"
      ],
      correctAnswer: 1,
      explanation: "e.stopPropagation() hodisa ota elementlarga ham tarqalib ketishini to'xtatadi. Masalan div ichida tugma bor bo'lsa, tugma bosilganda div dagi hodisa ham ishlab ketmasligi uchun shu kerak."
    },
    {
      question: "Quyidagi kod xatosi nimada? <form onSubmit={submitForm}> ... <button onClick={submitForm}>Yuborish</button>",
      options: [
        "Hech qanday xato yo'q",
        "Xato shundaki, submit funksiyasi ikki marta chaqiriladi yoki chalkashlik kelib chiqadi",
        "Formda onSubmit bo'lsa, buttonda onSubmit bo'lishi kerak",
        "React da formadan foydalanish mumkin emas"
      ],
      correctAnswer: 1,
      explanation: "Formada onSubmit ishlatilgan bo'lsa, tugmada button type=\"submit\" qoldirishning o'zi yetarli, tugmaga yana alohida onClick qo'yish shart emas va noto'g'ri oqibatlarga olib kelishi mumkin."
    },
    {
      question: "Input ga fokus berilganini (kursor tushganini) bilish uchun qaysi hodisa ishlatiladi?",
      options: [
        "onFocus",
        "onBlur",
        "onActive",
        "onSelect"
      ],
      correctAnswer: 0,
      explanation: "Input ga yoki boshqa elementga fokus qilinganda onFocus hodisasi, kursor chiqib ketganda esa onBlur hodisasi ishga tushadi."
    }
  ]
};

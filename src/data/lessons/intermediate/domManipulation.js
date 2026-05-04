export const domManipulation = {
  id: "dom-manipulation",
  title: "Element yaratish va o'chirish",
  level: "O'rta daraja",
  description: "Dinamik ravishda yangi HTML elementlarini yaratish, qo'shish va o'chirish.",
  theory: `
# Element yaratish va o'chirish — Bu nima va nima uchun kerak?

Dasturlashda biz faqat bor narsani o'zgartirmaymiz, balki yangi narsalar ham yaratamiz. Masalan, "Xabar yuborish" tugmasini bossangiz, ekranda yangi xabar paydo bo'ladi. Bu yangi element yaratish deyiladi.

## 1. NEGA kerak?
Tasavvur qiling, sizda "To-do list" (vazifalar ro'yxati) bor. Foydalanuvchi yangi vazifa yozib "Qo'shish"ni bossa, ro'yxatga yangi qator qo'shilishi kerak. Yoki "O'chirish" tugmasini bossa, o'sha qator yo'qolishi kerak. Bularning hammasi dinamik manipulyatsiya orqali qilinadi.

## 2. SODDALIK (Analogiya)
Buni **Lego konstruktoriga** o'xshatish mumkin:
- **Yaratish:** Sizda yangi Lego bo'lagi bor (\`createElement\`).
- **Ulash:** Siz uni asosiy blokga yopishtirasiz (\`appendChild\`).
- **O'chirish:** Siz keraksiz blokni sug'urib olasiz (\`remove\`).

## 3. STRUKTURA

### A. Yangi element yaratish
\`\`\`javascript
const yangiDiv = document.createElement("div"); // Faqat xotirada yaratildi
yangiDiv.textContent = "Men yangiman!";
yangiDiv.className = "box";
\`\`\`

### B. Sahifaga qo'shish
Yaratilgan elementni biror ota element ichiga joylashtirish kerak:
\`\`\`javascript
const ota = document.querySelector(".container");
ota.appendChild(yangiDiv); // Oxiriga qo'shadi
// yoki
ota.prepend(yangiDiv); // Boshiga qo'shadi
\`\`\`

### C. O'chirish
\`\`\`javascript
const rasm = document.querySelector("img");
rasm.remove(); // O'zini o'zi o'chiradi
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Yaratib qo'shishni unutish:** \`createElement\` qilsangiz u faqat xotirada turadi. \`appendChild\` qilmaguningizcha ekranda ko'rinmaydi.
2. **appendChild(matn):** \`appendChild\` faqat elementlarni (node) qabul qiladi. Agar matn qo'shmoqchi bo'lsangiz \`append()\` ishlatgan ma'qul.

## 6. SAVOLLAR (12 ta)
1. Yangi element yaratish metodini ayting.
2. \`createElement\` qilingan element darhol ekranda ko'rinadimi?
3. \`appendChild\` va \`prepend\` farqi nima?
4. Elementni o'chirish uchun qaysi metod ishlatiladi?
5. \`innerHTML += "..."\` orqali element qo'shishning kamchiligi nimada? (Xavfsizlik va performance)
6. \`insertBefore\` nima vazifani bajaradi?
7. Ota element ichidagi barcha bolalarni qanday o'chirish mumkin (\`innerHTML = ""\`)?
8. \`cloneNode()\` nima qiladi?
9. Element yaratib unga qanday qilib class qo'shiladi?
10. \`after()\` va \`before()\` metodlari nima qiladi?
11. Matnli node yaratish metodi qaysi (\`createTextNode\`)?
12. Hujjatning istalgan joyiga element qo'shish uchun avval nima qilish kerak?`,
  exercises: [
    {
      id: 1,
      title: "Element yaratish",
      instruction: "'p' elementi yarating, unga 'Salom' matnini bering va uni 'newPara' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const newPara = document.createElement('p'); newPara.textContent = 'Salom';",
      test: "if (code.includes('createElement') && code.includes('textContent')) return null; return 'Element yarating va matn bering';"
    },
    {
      id: 2,
      title: "Elementni qo'shish",
      instruction: "Yaratilgan 'btn' elementini 'body' ichiga qo'shing.",
      startingCode: "const btn = document.createElement('button');\n// Bu yerga yozing\n",
      hint: "document.body.appendChild(btn);",
      test: "if (code.includes('appendChild') || code.includes('append')) return null; return 'appendChild ishlatib body-ga qo\\'shing';"
    },
    {
      id: 3,
      title: "O'chirish",
      instruction: "ID-si 'box' bo'lgan elementni o'chirib tashlang.",
      startingCode: "const box = { remove: () => box.deleted = true }; // Mock\n// Bu yerga yozing\n",
      hint: "box.remove();",
      test: "if (box.deleted) return null; return 'remove() metodini chaqiring';"
    }
  ]
};

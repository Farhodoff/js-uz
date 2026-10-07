export const pushPopBasics = {
  id: "pushPopBasics",
  title: "push va pop Metodlari",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, kitob javoni bor. Yangi kitob keldi — uni oxiriga qo'yasiz. Bitta kitob kerak bo'ldi — oxirgisini olasiz. O'rtalariga tegilmaydi. Hamma ish oxiridan bo'ladi.

Dasturlashda massiv oxiri bilan ishlaydigan ikkita tayyor buyruq bor. Ular metod (massivga tegishli tayyor buyruq) deb ataladi.

push — massiv oxiriga yangi qiymat qo'shadi. pop — massiv oxirgisini oladi.

---

## 2. Nega kerak?

Xarid ro'yxati bor: non, sut. Yana bitta narsa esga tushdi: tuxum. Ro'yxatni boshidan yozish shart emas. Oxiriga qo'shilsa bo'ladi:

\`\`\`javascript
let royxat = ["non", "sut"];
royxat.push("tuxum");
console.log(royxat);
\`\`\`

Ro'yxat yangilandi. Qolganlari joyida.

Muammo shunda: massivni yangilash kerak, qayta yozmasdan. Yechim — \`push\` (qo'shish) va \`pop\` (olish).

---

## 3. Birinchi misol

Bu kod massiv oxiriga bitta qiymat qo'shadi.

\`\`\`javascript
let mevalar = ["olma", "nok"]; // Ikkita qiymat
mevalar.push("uzum"); // Oxiriga qo'shildi
console.log(mevalar); // Uchtalik chiqadi
\`\`\`

\`\`\`text
// Natija: [ 'olma', 'nok', 'uzum' ]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let mevalar = ["olma", "nok"];\` — massiv yaratildi. Ichida ikkita qiymat.
- \`mevalar.push("uzum");\` — buyruq chaqirildi. \`"uzum"\` oxiriga qo'shildi. Endi uchta qiymat.
- \`console.log(mevalar);\` — butun massiv chiqadi. Konsol uni kvadrat qavsda ko'rsatadi.

---

## 5. Qadamma-qadam (trace)

Massiv qanday o'zgaradi:

| Qadam | Kod qatori | Massiv holati | Uzunlik |
|---|---|---|---|
| 1 | \`let mevalar = ["olma", "nok"];\` | ["olma", "nok"] | 2 |
| 2 | \`mevalar.push("uzum");\` | ["olma", "nok", "uzum"] | 3 bo'ldi |
| 3 | \`console.log(mevalar);\` | — | Uchtalik chiqdi |

---

## 6. Yana bitta misol

Bu kod oxirgi qiymatni olib tashlaydi.

\`\`\`javascript
let mevalar = ["olma", "nok", "uzum"]; // Uchta qiymat
let oxirgi = mevalar.pop(); // Oxirgisi olindi
console.log(oxirgi); // uzum chiqadi
console.log(mevalar); // Ikkitalik qoldi
\`\`\`

\`\`\`text
// Natija:
uzum
[ 'olma', 'nok' ]
\`\`\`

Qator-baqator tahlil:
- \`mevalar.pop()\` — oxirgi qiymat olindi. Massivdan o'chirildi.
- \`let oxirgi = ...\` — olingan qiymat saqlandi. \`pop\` olganini qaytaradi.
- Massivda ikkita qiymat qoldi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`javascript
let m = [1, 2];
m.push;
console.log(m);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin massiv o'zgarmaydi: \`[1, 2]\` chiqadi. Sababi: qavssiz buyruq chaqirilmaydi. Faqat ko'rsatiladi.
✅ To'g'ri variant:
\`\`\`javascript
let m = [1, 2];
m.push(3); // Qavs bilan chaqirildi
console.log(m); // Uchtalik chiqadi
\`\`\`

### 2. Bo'sh massivdan olish
❌ Xato kod:
\`\`\`javascript
let m = [];
console.log(m.pop());
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin \`undefined\` chiqadi. Sababi: olinadigan hech narsa yo'q. Bo'sh massivdan \`pop\` qilinganda JavaScript \`undefined\` beradi.
✅ To'g'ri variant:
\`\`\`javascript
let m = [];
console.log(m.length); // 0 chiqadi
\`\`\`

### 3. Boshiga qo'shadi deb o'ylash
❌ Xato tushuncha: \`push\` boshiga qo'shadi deb o'ylash.
Nima bo'ladi: xato. \`push\` har doim OXIRIGA qo'shadi. Boshiga emas.
✅ To'g'ri variant:
\`\`\`javascript
let m = [2, 3];
m.push(4);
console.log(m[0]); // 2 chiqadi (boshi o'zgarmagan)
console.log(m[2]); // 4 chiqadi (oxiriga qo'shilgan)
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`["olma", "nok"]\` massiviga \`"uzum"\` ni \`push\` bilan qo'shing. Butun massivni chiqaring.

### 2-mashq (O'rtacha)
\`["olma", "nok", "uzum"]\` dan \`pop\` bilan oxirgisini oling. Olinganni chiqaring (\`uzum\` chiqishi kerak).

### 3-mashq (Chegara holat)
Bo'sh massivdan \`pop\` qiling. \`undefined\` chiqishini tasdiqlang (bu xato emas).

### Javoblar:
1.
\`\`\`javascript
let mevalar = ["olma", "nok"];
mevalar.push("uzum");
console.log(mevalar);
\`\`\`
2.
\`\`\`javascript
let mevalar = ["olma", "nok", "uzum"];
let oxirgi = mevalar.pop();
console.log(oxirgi);
\`\`\`
3.
\`\`\`javascript
let m = [];
console.log(m.pop()); // undefined chiqadi
\`\`\`

---

## 9. Xulosa

1. \`push\` — oxiriga qo'shadi. Qavs bilan chaqiriladi.
2. \`pop\` — oxirgisini oladi va qaytaradi. Bo'sh massivdan \`undefined\` beradi.
3. Metod — massiv nomidan keyin nuqta bilan chaqiriladigan tayyor buyruq.

Keyingi darsda: massivni aylantirib chiqadigan \`for...of\` sikli bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Oxiriga qo'shish",
      instruction: "`[\"olma\", \"nok\"]` ga `\"uzum\"` ni `push` bilan qo'shing. Butun massivni chiqaring.",
      startingCode: "let mevalar = [\"olma\", \"nok\"];\n// push bilan qo'shing va chiqaring\n",
      hint: "mevalar.push(\"uzum\");\nconsole.log(mevalar);",
      test: "if (!code.includes('.push(')) return 'push() ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('uzum'))) return null;\nreturn 'uzum chiqmadi';"
    },
    {
      id: 2,
      title: "Oxirgisini olish",
      instruction: "`[\"olma\", \"nok\", \"uzum\"]` dan `pop` bilan oxirgisini oling va chiqaring (`uzum` chiqishi kerak).",
      startingCode: "let mevalar = [\"olma\", \"nok\", \"uzum\"];\n// pop bilan oling va chiqaring\n",
      hint: "let oxirgi = mevalar.pop();\nconsole.log(oxirgi);",
      test: "if (!code.includes('.pop(')) return 'pop() ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'uzum')) return null;\nreturn 'uzum chiqmadi';"
    },
    {
      id: 3,
      title: "Qavsni qo'shish",
      instruction: "`m.push;` ishlamayapti. Qavs qo'shing (`[1, 2]` ga `3` qo'shilsin).",
      startingCode: "let m = [1, 2];\nm.push;\nconsole.log(m);\n",
      hint: "m.push(3);",
      test: "if (!code.includes('.push(')) return 'Qavs bilan chaqiring: push(3)';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('3'))) return null;\nreturn '3 chiqmadi';"
    },
    {
      id: 4,
      title: "Bo'shdan olish",
      instruction: "`[]` dan `pop` qiling va chiqaring (`undefined` chiqadi — bu xato emas).",
      startingCode: "let m = [];\n// pop bilan oling va chiqaring\n",
      hint: "console.log(m.pop());",
      test: "if (!code.includes('.pop(')) return 'pop() ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'undefined')) return null;\nreturn 'undefined chiqmadi';"
    },
    {
      id: 5,
      title: "Ikkita qo'shish (chegara)",
      instruction: "`[1]` ga `2` va `3` ni alohida `push` bilan qo'shing. Butun massivni chiqaring.",
      startingCode: "let m = [1];\n// Ikkita push yozing va chiqaring\n",
      hint: "m.push(2);\nm.push(3);\nconsole.log(m);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.replace(/\\s/g, '') === '1,2,3')) return null;\nreturn '1, 2, 3 massivi chiqmadi';"
    },
    {
      id: 6,
      title: "Olib tashlashni kuzatish (chegara)",
      instruction: "`[\"a\", \"b\", \"c\"]` dan `pop` qiling. Qolgan massivni chiqaring (`a` va `b` qolishi kerak).",
      startingCode: "let m = [\"a\", \"b\", \"c\"];\n// pop qiling va massivni chiqaring\n",
      hint: "m.pop();\nconsole.log(m);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => !m.includes('c') && m.includes('a'))) return null;\nreturn 'c ketib, a qolishi kerak';"
    },
    {
      id: 7,
      title: "Olinganni saqlash (chegara)",
      instruction: "`[5, 9]` dan `pop` qilib, olinganni `oxirgi` ga saqlang. `oxirgi` ni chiqaring (`9` chiqishi kerak).",
      startingCode: "let m = [5, 9];\n// pop qilib oxirgi ga saqlang va chiqaring\n",
      hint: "let oxirgi = m.pop();\nconsole.log(oxirgi);",
      test: "if (!code.includes('oxirgi = m.pop') && !code.includes('oxirgi=m.pop')) return 'let oxirgi = m.pop(); deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '9')) return null;\nreturn '9 chiqmadi';"
    },
    {
      id: 8,
      title: "Boshiga emas (chegara)",
      instruction: "`[2, 3]` ga `4` ni `push` qiling. `m[0]` ni chiqaring (`2` chiqishi kerak — boshi o'zgarmagan).",
      startingCode: "let m = [2, 3];\n// push qiling va m[0] ni chiqaring\n",
      hint: "m.push(4);\nconsole.log(m[0]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2')) return null;\nreturn '2 chiqmadi';"
    },
    {
      id: 9,
      title: "Uzunlik oshishi (chegara)",
      instruction: "`[1, 2]` ga `push` qiling. Keyin uzunlikni chiqaring (`3` chiqishi kerak).",
      startingCode: "let m = [1, 2];\n// push qiling va length ni chiqaring\n",
      hint: "m.push(3);\nconsole.log(m.length);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '3')) return null;\nreturn '3 chiqmadi';"
    },
    {
      id: 10,
      title: "Qo'sh va ol (chegara)",
      instruction: "`[1]` ga `2` ni qo'shing, keyin `pop` bilan oling. Olinganni chiqaring (`2` chiqishi kerak).",
      startingCode: "let m = [1];\n// push qiling, pop qilib chiqaring\n",
      hint: "m.push(2);\nlet oxirgi = m.pop();\nconsole.log(oxirgi);",
      test: "if (!code.includes('.push(') || !code.includes('.pop(')) return 'push va pop ikkalasi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2')) return null;\nreturn '2 chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let m = [\"olma\", \"nok\"]; m.push(\"uzum\"); console.log(m);` nima chiqaradi?",
      options: [
        "uzum",
        "olma, nok, uzum massivi",
        "Xatolik",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "uzum oxiriga qo'shildi. Massiv uchtalik bo'ldi."
    },
    {
      id: 2,
      question: "push qayeriga qo'shadi?",
      options: [
        "Boshiga",
        "Oxiriga",
        "O'rtasiga",
        "Har joyiga"
      ],
      correctAnswer: 1,
      explanation: "push har doim oxiriga qo'shadi."
    },
    {
      id: 3,
      question: "`let m = [\"olma\", \"nok\", \"uzum\"]; let o = m.pop(); console.log(o);` nima chiqaradi?",
      options: [
        "olma",
        "uzum",
        "nok",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "pop oxirgisini oladi va qaytaradi: uzum."
    },
    {
      id: 4,
      question: "`let m = [1, 2]; m.push; console.log(m);` nima chiqaradi?",
      options: [
        "1, 2, 3",
        "1, 2 (o'zgarmagan)",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Qavssiz buyruq chaqirilmaydi. Massiv o'zgarmaydi."
    },
    {
      id: 5,
      question: "`let m = []; console.log(m.pop());` nima chiqaradi?",
      options: [
        "Xatolik",
        "undefined",
        "null",
        "0"
      ],
      correctAnswer: 1,
      explanation: "Olinadigan hech narsa yo'q. Natija undefined."
    },
    {
      id: 6,
      question: "`let m = [2, 3]; m.push(4); console.log(m[0]);` nima chiqaradi?",
      options: [
        "4",
        "2",
        "3",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Boshlanish o'zgarmagan. 0-katakda 2 turibdi."
    },
    {
      id: 7,
      question: "pop olgan qiymat bilan nima qiladi?",
      options: [
        "O'chirib tashlaydi",
        "Qaytaradi (saqlasa bo'ladi)",
        "Boshiga qo'yadi",
        "Hech narsa qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "pop olganini qaytaradi. let bilan saqlansa bo'ladi."
    },
    {
      id: 8,
      question: "`let m = [5, 9]; let o = m.pop(); console.log(o);` nima chiqaradi?",
      options: [
        "5",
        "9",
        "5, 9",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Oxirgisi olindi va saqlandi: 9."
    },
    {
      id: 9,
      question: "`let m = [1, 2]; m.push(3); console.log(m.length);` nima chiqaradi?",
      options: [
        "2",
        "3",
        "3, 4",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Bitta qo'shildi. Uzunlik 3 bo'ldi."
    },
    {
      id: 10,
      question: "`let m = [1]; m.push(2); let o = m.pop(); console.log(o);` nima chiqaradi?",
      options: [
        "1",
        "2",
        "1, 2",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "2 qo'shildi, keyin olindi: 2 chiqadi."
    },
    {
      id: 11,
      question: "Metod nima?",
      options: [
        "O'zgaruvchi turi",
        "Massivga tegishli tayyor buyruq",
        "Xato turi",
        "Sikl turi"
      ],
      correctAnswer: 1,
      explanation: "Metod nuqta bilan chaqiriladi: m.push(3)."
    },
    {
      id: 12,
      question: "`let m = [\"a\", \"b\", \"c\"]; m.pop(); console.log(m);` nima chiqaradi?",
      options: [
        "a, b, c",
        "a, b",
        "c",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Oxirgisi ketdi. a va b qoldi."
    }
  ]
};

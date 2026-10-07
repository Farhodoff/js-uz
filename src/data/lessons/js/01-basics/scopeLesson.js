export const scopeBasics = {
  id: "scopeBasics",
  title: "Scope (Ko'lam): Global, Blok va Lokal",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, maktab binosi bor. E'lonlar taxtasi ikki xil:
- Kirishdagi katta taxta. Hamma ko'radi: o'quvchi ham, o'qituvchi ham.
- Sinf ichidagi kichik taxta. Faqat shu sinfdagilar ko'radi. Tashqaridan ko'rinmaydi.

Dasturlashda ham o'zgaruvchining "ko'rinish joyi" bor. Ba'zisi hamma joyda ko'rinadi. Ba'zisi faqat o'z blokida.

Scope (ko'lam) — o'zgaruvchi qayerda ko'rinishi va ishlatilishini belgilaydigan qoidadir.

---

## 2. Nega kerak?

Ikki sinf bor. Har birida " Sardor" ismli o'quvchi bor. Chalkashlik bo'lmasligi uchun har biri o'z sinfida chaqiriladi.

Dasturda ham bir xil nom ikki joyda kerak bo'ladi:

\`\`\`javascript
let ism = "Ali";
{
  let ism = "Vali";
  console.log(ism);
}
console.log(ism);
\`\`\`

Natija: \`Vali\` va \`Ali\`. Ikkalasi ham o'z joyida ishladi. Bir-biriga xalaqit bermadi.

Muammo shunda: katta dasturda nomlar to'qnashadi. Yechim — scope. Har bir o'zgaruvchi o'z hududida yashaydi.

---

## 3. Birinchi misol

Bu kod blok ichidagi o'zgaruvchi tashqarida ko'rinmasligini ko'rsatadi.

\`\`\`javascript
{
  let x = 5; // Blok ichida yaratildi
}
console.log(x); // Xato beradi!
\`\`\`

\`\`\`text
// Natija: ReferenceError: x is not defined
\`\`\`

---

## 4. Qator-baqator tahlil

- \`{\` — blok boshlandi. Yangi hudud ochildi.
- \`let x = 5;\` — \`x\` shu blok ichida yaratildi. Faqat shu yerda yashaydi.
- \`}\` — blok tugadi. Hudud yopildi. \`x\` yo'qoldi.
- \`console.log(x);\` — tashqaridan murojaat. Bunday nom topilmadi. Shuning uchun xato beradi.

---

## 5. Qadamma-qadam (trace)

Hudud qanday ochilib yopiladi:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`{\` | Blok ochildi | Yangi hudud |
| 2 | \`let x = 5;\` | Yaratildi | x blokda yashaydi |
| 3 | \`}\` | Blok yopildi | x yo'qoldi |
| 4 | \`console.log(x);\` | Tashqaridan qidiruv | Topilmadi — xato |

---

## 6. Yana bitta misol

Bu kod tashqaridagi o'zgaruvchi ichkarida ko'rinishini ko'rsatadi.

\`\`\`javascript
let ism = "Ali"; // Tashqarida yaratildi
{
  console.log(ism); // Ichkaridan ko'rinadi
}
\`\`\`

\`\`\`text
// Natija: Ali
\`\`\`

Qator-baqator tahlil:
- \`let ism = "Ali";\` — tashqi hududda yaratildi. Hamma joydan ko'rinadi.
- Blok ichidan tashqariga qarash mumkin. Shuning uchun \`Ali\` chiqadi.
- Qoida bir tomonlama: ichkaridan tashqariga ko'rinadi, tashqaridan ichkariga ko'rinmaydi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Blok ichidagini tashqarida ishlatish
❌ Xato kod:
\`\`\`javascript
{
  let x = 5;
}
console.log(x);
\`\`\`
Nima bo'ladi: \`ReferenceError: x is not defined\` xatoligi yuz beradi. Blok yopilishi bilan ichidagi o'zgaruvchilar yo'qoladi.
✅ To'g'ri variant:
\`\`\`javascript
let x = 5;
console.log(x); // 5 chiqadi
\`\`\`

### 2. Bir hududda ikki marta e'lon qilish
❌ Xato kod:
\`\`\`javascript
let a = 1;
let a = 2;
\`\`\`
Nima bo'ladi: \`SyntaxError: Identifier 'a' has already been declared\` xatoligi yuz beradi. Bir hududda bir nom faqat bir marta e'lon qilinadi.
✅ To'g'ri variant:
\`\`\`javascript
let a = 1;
a = 2; // Qayta e'lon emas, qiymat almashtirish
\`\`\`

### 3. Ichki nom tashqarini o'zgartiradi deb o'ylash
❌ Xato tushuncha:
\`\`\`javascript
let ism = "Ali";
{
  let ism = "Vali";
}
console.log(ism);
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin \`Ali\` chiqadi! Sababi: blok ichidagi \`ism\` — boshqa, mustaqil o'zgaruvchi. Tashqaridagi \`ism\` ga tegmaydi.
✅ To'g'ri tushuncha: bir xil nom ikki hududda — ikkita alohida quti. Ichkaridagi tashqarini o'zgartirmaydi.

---

## 8. Tekshiruv

### 1-mashq (Oson)
Blok ichida \`x = 5\` yarating. Blok ichida chiqaring (\`5\` chiqishi kerak).

### 2-mashq (O'rtacha)
Tashqarida \`ism = "Ali"\` yarating. Blok ichida chiqaring (\`Ali\` chiqishi kerak).

### 3-mashq (Chegara holat)
Bir xil nomni ikki hududda yarating: tashqarida \`"Ali"\`, blok ichida \`"Vali"\`. Tashqarida chiqaring (\`Ali\` chiqishi kerak — ichkaridagi tegmagan).

### Javoblar:
1.
\`\`\`javascript
{
  let x = 5;
  console.log(x);
}
\`\`\`
2.
\`\`\`javascript
let ism = "Ali";
{
  console.log(ism);
}
\`\`\`
3.
\`\`\`javascript
let ism = "Ali";
{
  let ism = "Vali";
}
console.log(ism);
\`\`\`

---

## 9. Xulosa

1. Scope — o'zgaruvchining ko'rinish hududi. Blok ichidagi tashqarida ko'rinmaydi.
2. Tashqaridagi ichkaridan ko'rinadi. Qoida bir tomonlama.
3. Bir hududda bir nom bir marta e'lon qilinadi.

Keyingi darsda: funksiyani qiymat sifatida uzatish (callback) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Blok ichida chiqarish",
      instruction: "Blok ichida `x = 5` yarating va o'sha yerda chiqaring (`5` chiqishi kerak).",
      startingCode: "// Blok oching, x yarating va chiqaring\n",
      hint: "{\n  let x = 5;\n  console.log(x);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Tashqaridan ko'rinish",
      instruction: "Tashqarida `ism = \"Ali\"` yarating. Blok ichida chiqaring (`Ali` chiqishi kerak).",
      startingCode: "let ism = \"Ali\";\n// Blok oching va ichida chiqaring\n",
      hint: "{\n  console.log(ism);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali'))) return null;\nreturn 'Ali chiqmadi';"
    },
    {
      id: 3,
      title: "Tashqaridan murojaat xatosi",
      instruction: "Quyidagi kod xato beradi. Sababini toping: `x` ni blok TASHQARISIGA chiqaring (`5` chiqsin).",
      startingCode: "{\n  let x = 5;\n}\nconsole.log(x);\n",
      hint: "let x = 5; — blokdan oldinga yozing.",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Qayta e'lon xatosini tuzatish",
      instruction: "`let a = 1; let a = 2;` xato bermoqda. Ikkinchisini qiymat almashtirishga aylantiring (`2` chiqsin).",
      startingCode: "let a = 1;\nlet a = 2;\nconsole.log(a);\n",
      hint: "a = 2; — let siz yozing.",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2')) return null;\nreturn '2 konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Ikki mustaqil quti",
      instruction: "Tashqarida `\"Ali\"`, blok ichida `\"Vali\"` yarating (ikkalsi ham `ism` nomida). Tashqarida chiqaring (`Ali` chiqishi kerak).",
      startingCode: "let ism = \"Ali\";\n// Blok ichida Vali yarating\nconsole.log(ism);\n",
      hint: "{\n  let ism = \"Vali\";\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali'))) return null;\nreturn 'Ali chiqmadi (tashqaridagi o\\'zgarmagan bo\\'lishi kerak)';"
    },
    {
      id: 6,
      title: "Blokda hisoblash (chegara)",
      instruction: "Blok ichida `a = 3`, `b = 4` yarating. Yig'indini o'sha yerda chiqaring (`7` chiqishi kerak).",
      startingCode: "// Blok ichida hisoblang va chiqaring\n",
      hint: "{\n  let a = 3;\n  let b = 4;\n  console.log(a + b);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '7')) return null;\nreturn '7 konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Ichkaridan tashqariga (chegara)",
      instruction: "`n = 10` tashqarida berilgan. Blok ichida `n + 5` ni chiqaring (`15` chiqishi kerak).",
      startingCode: "let n = 10;\n// Blok ichida n + 5 ni chiqaring\n",
      hint: "{\n  console.log(n + 5);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '15')) return null;\nreturn '15 konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Ikkita alohida blok (chegara)",
      instruction: "Ikkita blok oching. Birinchida `x = 1`, ikkinchisida `x = 2` yarating. Har birini o'z blokida chiqaring (`1` va `2`).",
      startingCode: "// Ikkita blok yozing\n",
      hint: "{\n  let x = 1;\n  console.log(x);\n}\n{\n  let x = 2;\n  console.log(x);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2') return null;\nreturn '1 va 2 chiqishi kerak';"
    },
    {
      id: 9,
      title: "Funksiya hududi (chegara)",
      instruction: "`korsat` funksiyasi ichida `x = 9` yarating va chiqaring. Funksiyani chaqiring (`9` chiqishi kerak).",
      startingCode: "// Funksiya ichida x yarating, chiqaring va chaqiring\n",
      hint: "function korsat() {\n  let x = 9;\n  console.log(x);\n}\nkorsat();",
      test: "if (!code.includes('function')) return 'Funksiya e\\'lon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '9')) return null;\nreturn '9 konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Sikl hududi (chegara)",
      instruction: "`for` ichida `i` bilan `0`, `1`, `2` ni chiqaring. Sikldan keyin `i` yo'qligini bilgan holda faqat ichida ishlang.",
      startingCode: "// for ichida i ni chiqaring\n",
      hint: "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`{ let x = 5; } console.log(x);` nima qiladi?",
      options: [
        "5 chiqaradi",
        "ReferenceError beradi",
        "undefined chiqaradi",
        "Hech narsa qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Blok yopilishi bilan x yo'qoladi. Tashqaridan topilmaydi."
    },
    {
      id: 2,
      question: "Scope nimani belgilaydi?",
      options: [
        "Kod tezligini",
        "O'zgaruvchi qayerda ko'rinishini",
        "Xatolar sonini",
        "Fayl hajmini"
      ],
      correctAnswer: 1,
      explanation: "Scope — ko'rinish hududi qoidasi."
    },
    {
      id: 3,
      question: "`let ism = \"Ali\"; { console.log(ism); }` nima chiqaradi?",
      options: [
        "Xatolik",
        "Ali",
        "undefined",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Tashqaridagi ichkaridan ko'rinadi."
    },
    {
      id: 4,
      question: "`let a = 1; let a = 2;` qatorida nima bo'ladi?",
      options: [
        "a 2 bo'ladi",
        "SyntaxError beradi",
        "a 1 bo'lib qoladi",
        "Ogohlantirish beradi"
      ],
      correctAnswer: 1,
      explanation: "Bir hududda bir nom bir marta e'lon qilinadi."
    },
    {
      id: 5,
      question: "`let ism = \"Ali\"; { let ism = \"Vali\"; } console.log(ism);` nima chiqaradi?",
      options: [
        "Vali",
        "Ali",
        "Xatolik",
        "AliVali"
      ],
      correctAnswer: 1,
      explanation: "Ichkaridagi alohida o'zgaruvchi. Tashqaridagi o'zgarmagan."
    },
    {
      id: 6,
      question: "`{ let x = 5; console.log(x); }` nima chiqaradi?",
      options: [
        "Xatolik",
        "5",
        "undefined",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "O'z hududida ishlatish mumkin."
    },
    {
      id: 7,
      question: "Qoida qaysi tomonga ishlaydi?",
      options: [
        "Ikkala tomonga",
        "Ichkaridan tashqariga ko'rinadi",
        "Tashqaridan ichkariga ko'rinadi",
        "Hech qayerdan ko'rinmaydi"
      ],
      correctAnswer: 1,
      explanation: "Ichkaridan tashqariga qarash mumkin. Teskarisi mumkin emas."
    },
    {
      id: 8,
      question: "`{ let a = 3; let b = 4; console.log(a + b); }` nima chiqaradi?",
      options: [
        "34",
        "7",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi ham o'z hududida. 3 + 4 = 7."
    },
    {
      id: 9,
      question: "`{ let x = 1; console.log(x); } { let x = 2; console.log(x); }` nima chiqaradi?",
      options: [
        "Xatolik (nom takrorlangan)",
        "1, 2",
        "Faqat 1",
        "Faqat 2"
      ],
      correctAnswer: 1,
      explanation: "Ikki alohida hudud. Har birida o'z x si bor."
    },
    {
      id: 10,
      question: "`function korsat() { let x = 9; console.log(x); } korsat();` nima chiqaradi?",
      options: [
        "Xatolik",
        "9",
        "undefined",
        "korsat"
      ],
      correctAnswer: 1,
      explanation: "Funksiya ichi ham hudud. Ichida ishlatish mumkin."
    },
    {
      id: 11,
      question: "Blok yopilganda ichidagi o'zgaruvchi nima bo'ladi?",
      options: [
        "Saqlanib qoladi",
        "Yo'qoladi",
        "Tashqariga chiqadi",
        "Nolga aylanadi"
      ],
      correctAnswer: 1,
      explanation: "Hudud yopilishi bilan ichidagilar yo'qoladi."
    },
    {
      id: 12,
      question: "`for (let i = 0; i < 3; i++) { console.log(i); }` da `i` qayerda yashaydi?",
      options: [
        "Hamma joyda",
        "Faqat sikl ichida",
        "Faqat sikldan keyin",
        "Hech qayerda"
      ],
      correctAnswer: 1,
      explanation: "for dagi i ham blok hududida yashaydi."
    }
  ]
};

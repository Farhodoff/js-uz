export const spreadBasics = {
  id: "spreadBasics",
  title: "Spread (...) Operatori: Massiv va Obyektlarni Yoyish",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda bir qutida bir nechta kitoblar bor. Siz yangi va kattaroq quti olib, eski qutidagi barcha kitoblarni to'kib (yoyib) yangi qutiga joylashtirasiz va yoniga yana 1-2 ta yangi kitob qo'shasiz.

JavaScript da **Spread operatori (\`...\`)** aynan shunday ishlaydi: u massiv yoki obyekt ichidagi barcha elementlarni yoki xususiyatlarni bittalab sochib (yoyib) beradi.

**Spread operatori (\`...\`)** — massiv elementlarini yoki obyekt xususiyatlarini yangi massiv yoki obyekt ichiga nusxalash va birlashtirish uchun yoyib beruvchi maxsus operatordir.

*Yangi terminlar:*
- **Spread operatori (\`...\`)** — "yoyish" ma'nosini bildiruvchi uchta nuqta belgisi (\`...\`).
- **Yoyish (spreading)** — to'plam elementlarini alohida bo'laklarga ajratib ko'chirish.

---

## 2. Nega kerak?

Ikkita massivni birlashtirish yoki obyektdan nusxa olib yangi ma'lumot qo'shish dasturlashda juda ko'p uchraydi.

Ilgari massivlarni birlashtirish uchun sikllar aylanish yoki murakkab kodlar yozish talab etilardi. Oddiy tenglash (\`const copy = original\`) esa yangi nusxa yaratmaydi, balki xotiradagi o'sha manzilga ulab qo'yadi (birini o'zgartirsangiz, ikkinchisi ham o'zgaradi).

Spread operatori esa bir zumda:
- Asl massiv yoki obyektga ziyon yetkazmasdan yangi toza nusxa yaratadi.
- Bir nechta massiv yoki obyektlarni osonlikcha bittaga birlashtiradi.

---

## 3. Birinchi misol

Bu kod ikkita massivni bitta yangi massivga birlashtiradi.

\`\`\`javascript
const fruits1 = ["Olma", "Banan"];
const fruits2 = ["Nok", "Gilos"];

const allFruits = [...fruits1, ...fruits2]; // ikkala massivni yoyib birlashtirish

console.log(allFruits); // ["Olma", "Banan", "Nok", "Gilos"]
\`\`\`

\`\`\`text
// Natija:
[ 'Olma', 'Banan', 'Nok', 'Gilos' ]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const fruits1 = ["Olma", "Banan"];\` va \`const fruits2 = ["Nok", "Gilos"];\` — ikkita alohida massiv e'lon qilindi.
- \`const allFruits = [...fruits1, ...fruits2];\` — \`...fruits1\` operatori \`fruits1\` ichidagi barcha elementlarni (\`"Olma"\`, \`"Banan"\`) yangi massiv ichiga yoyib to'kdi. So'ng \`...fruits2\` ham o'z elementlarini (\`"Nok"\`, \`"Gilos"\`) davomidan qo'shdi.
- \`console.log(allFruits);\` — to'rtta elementdan iborat yangi birlashgan massiv chiqdi. Asl \`fruits1\` va \`fruits2\` massivlari o'zgarishsiz qoldi!

---

## 5. Qadamma-qadam (trace)

Yangi massiv qanday yig'ildi:

| Qadam | Kod qismi | Natijaviy massiv | Izoh |
|---|---|---|---|
| 1 | Boshlanish | \`[]\` | Yangi bo'sh massiv ochildi |
| 2 | \`...fruits1\` | \`["Olma", "Banan"]\` | 1-massiv elementlari yoyildi |
| 3 | \`...fruits2\` | \`["Olma", "Banan", "Nok", "Gilos"]\` | 2-massiv elementlari qo'shildi |

---

## 6. Yana bitta misol

1-misoldan farqi: Massiv emas, **obyektni yoyish** va unga yangi xususiyat qo'shish.

\`\`\`javascript
const user = { name: "Ali", age: 20 };

const updatedUser = { ...user, city: "Toshkent" }; // user xususiyatlarini yoyib, yangi city qo'shish

console.log(updatedUser);
\`\`\`

\`\`\`text
// Natija:
{ name: 'Ali', age: 20, city: 'Toshkent' }
\`\`\`

Tahlil:
- \`{ ...user }\` — \`user\` obyektining barcha kalit va qiymatlarini yangi obyektga nusxalab berdi.
- \`city: "Toshkent"\` — yangi obyektga qo'shimcha xususiyat bo'lib qo'shildi.
- Boshlang'ich \`user\` o'zgarmadi, biz uning yangilangan yangi nusxasini hosil qildik.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Uchta nuqtani (...) unutib qoldirish

\`\`\`javascript
const a = [1, 2];
const b = [a, 3]; // XATO: ... qo'yilmadi

console.log(b); // [[1, 2], 3]
\`\`\`

**Nima bo'ladi:** Uchta nuqtasiz yozilsa, butun \`a\` massivining o'zi bitta element bo'lib tushib qoladi (ichma-ich massiv hosil bo'ladi).
**To'g'ri varianti:** Elementlarni yoyish uchun \`const b = [...a, 3];\` deb yozing.

### 2-xato: Obyektni massiv qavsi ichida yoyishga urinish

\`\`\`javascript
const user = { name: "Ali" };
const arr = [...user]; // XATO: TypeError: user is not iterable
\`\`\`

**Nima bo'ladi:** Oddiy obyekt massiv qavsi \`[ ]\` ichida yoyilmaydi.
**To'g'ri varianti:** Obyektlar faqat obyekt qavsi \`{ }\` ichida yoyiladi: \`const copy = { ...user };\`.

### 3-xato: Obyektda qiymatni yangilashda ketma-ketlikni adashtirish

\`\`\`javascript
const user = { age: 20 };
const updated = { age: 30, ...user }; // XATO: ...user oxirida keldi

console.log(updated.age); // 20
\`\`\`

**Nima bo'ladi:** Bir xil nomli kalitlar kelsa, oxirgi kelgan qiymat avvalgisini almashtiradi. Bu yerda \`...user\` oxirida kelgani uchun \`20\` soni \`30\` ning ustiga yozilib ketdi.
**To'g'ri varianti:** Yangilangan xususiyatni \`...\` dan keyin yozing: \`{ ...user, age: 30 }\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`numbers1 = [1, 2]\` va \`numbers2 = [3, 4]\` massivlari berilgan. \`...\` (spread) operatori yordamida ularni \`merged\` nomli yangi massivga birlashtiring va \`merged\` ni konsolga chiqaring (\`[1, 2, 3, 4]\`).

### 2-mashq (o'rtacha)
\`car = { brand: "Chevrolet", model: "Cobalt" }\` obyekti berilgan. Spread yordamida uni yoyib, \`color: "Oq"\` xususiyatini qo'shgan holda \`newCar\` obyektini yarating va \`newCar\` ni konsolga chiqaring.

### 3-mashq (chegara holat)
\`defaults = { theme: "light", lang: "uz" }\` obyekti berilgan. Spread orqali uni yoyib, lekin \`theme\` qiymatini \`"dark"\` ga almashtirgan holda \`customSettings\` obyektini hosil qiling (\`{ ...defaults, theme: "dark" }\`) va uning \`theme\` xususiyatini konsolga chiqaring (\`"dark"\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const numbers1 = [1, 2];
const numbers2 = [3, 4];
const merged = [...numbers1, ...numbers2];

console.log(merged); // [1, 2, 3, 4]
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const car = { brand: "Chevrolet", model: "Cobalt" };
const newCar = { ...car, color: "Oq" };

console.log(newCar); // { brand: 'Chevrolet', model: 'Cobalt', color: 'Oq' }
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const defaults = { theme: "light", lang: "uz" };
const customSettings = { ...defaults, theme: "dark" };

console.log(customSettings.theme); // "dark"
\`\`\`

---

## 9. Xulosa

1. Spread operatori (\`...\`) massiv elementlarini yoki obyekt xususiyatlarini yangi to'plam ichiga bittalab yoyib beradi.
2. Massivlarni birlashtirish yoki ularning nusxasini olish uchun \`[...massiv]\` ishlatiladi.
3. Obyektlarni nusxalash yoki yangi xususiyat bilan to'ldirish uchun \`{ ...obyekt, kalit: qiymat }\` ishlatiladi.

Keyingi darsda: Funksiya parametrlariga kelgan argumentlarni bitta massivga yig'ib olish — Rest operatori (\`...\`) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Massivlarni birlashtirish",
      instruction: "`numbers1 = [1, 2]` va `numbers2 = [3, 4]` massivlarini `...` (spread) yordamida `merged` nomli yangi massivga birlashtiring va uni konsolga chiqaring.",
      startingCode: "const numbers1 = [1, 2];\nconst numbers2 = [3, 4];\n// numbers1 va numbers2 ni spread orqali merged massiviga birlashtiring va chiqaring\n",
      hint: "const merged = [...numbers1, ...numbers2];\nconsole.log(merged);",
      test: "if (!code.includes('...')) return 'Spread (...) operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('1,2,3,4') || m.includes('[1,2,3,4]') || m.includes('1, 2, 3, 4'))) return null;\nreturn 'Birlashgan massiv [1, 2, 3, 4] chiqmadi';"
    },
    {
      id: 2,
      title: "Obyektni yoyish va xususiyat qo'shish",
      instruction: "`car = { brand: \"Chevrolet\", model: \"Cobalt\" }` obyektini spread yordamida yoyib, `color: \"Oq\"` xususiyatini qo'shgan holda `newCar` obyektini tuzing va uni konsolga chiqaring.",
      startingCode: "const car = { brand: \"Chevrolet\", model: \"Cobalt\" };\n// spread orqali car ni yoyib color: \"Oq\" qo'shing va yangi obyektni chiqaring\n",
      hint: "const newCar = { ...car, color: \"Oq\" };\nconsole.log(newCar);",
      test: "if (!code.includes('...')) return 'Spread (...) operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Oq') && m.includes('Cobalt'))) return null;\nreturn 'newCar obyekti to\\'g\\'ri chiqmadi';"
    },
    {
      id: 3,
      title: "Obyekt qiymatini qayta yozish",
      instruction: "`defaults = { theme: \"light\", lang: \"uz\" }` berilgan. Spread yordamida uni yoyib, `theme` ni `\"dark\"` ga almashtirgan holda `customSettings` obyektini hosil qiling va uning `theme` qiymatini konsolga chiqaring.",
      startingCode: "const defaults = { theme: \"light\", lang: \"uz\" };\n// spread orqali theme ni \"dark\" ga almashtirib yangi obyekt tuzing va theme ni chiqaring\n",
      hint: "const customSettings = { ...defaults, theme: \"dark\" };\nconsole.log(customSettings.theme);",
      test: "if (!code.includes('...')) return 'Spread (...) operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('dark')) return null;\nreturn 'dark konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "Massiv boshiga va oxiriga element qo'shish",
      "instruction": "`const nums = [2, 3];` massividan spread yordamida `[1, ...nums, 4]` ko'rinishidagi yangi massiv yasab, konsolga chiqaring.",
      "startingCode": "const nums = [2, 3];\n// [1, ...nums, 4] yasang va chiqaring\n",
      "hint": "const result = [1, ...nums, 4];\nconsole.log(result);",
      "test": "if (!code.includes(\"...\")) return \"Spread (...) operatori ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"[1,2,3,4]\") || m.includes(\"1,2,3,4\"))) return null;\nreturn \"[1, 2, 3, 4] konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Massivni nusxalash (copy)",
      "instruction": "`const original = [1, 2, 3];` massivining spread yordamida `copy` nusxasini yasab, konsolga chiqaring.",
      "startingCode": "const original = [1, 2, 3];\n// spread bilan copy nusxasini yasang va chiqaring\n",
      "hint": "const copy = [...original];\nconsole.log(copy);",
      "test": "if (!code.includes(\"...\")) return \"Spread (...) operatori ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"[1,2,3]\") || m.includes(\"1,2,3\"))) return null;\nreturn \"copy massivi [1, 2, 3] konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "Obyektni nusxalash (clone)",
      "instruction": "`const user = { name: \"Ali\", age: 20 };` obyektining spread yordamida `clone` nusxasini yasab, konsolga chiqaring.",
      "startingCode": "const user = { name: \"Ali\", age: 20 };\n// spread bilan clone yasang va chiqaring\n",
      "hint": "const clone = { ...user };\nconsole.log(clone);",
      "test": "if (!code.includes(\"...\")) return \"Spread (...) operatori ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Ali\") && m.includes(\"20\"))) return null;\nreturn \"clone obyekti to'g'ri konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Massivni funksiyaga argument sifatida yoyish",
      "instruction": "`const nums = [3, 9, 4];` massivini spread orqali `Math.max()` ga uzatib, eng katta sonni konsolga chiqaring (`9`).",
      "startingCode": "const nums = [3, 9, 4];\n// Math.max(...nums) yordamida eng kattasini chiqaring\n",
      "hint": "console.log(Math.max(...nums));",
      "test": "if (!code.includes(\"...\")) return \"Spread (...) operatori ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"9\")) return null;\nreturn \"Eng katta son 9 konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "Argument xatosini tuzatish",
      "instruction": "`sum` funksiyasiga massiv spread qilinmasdan uzatilgan, shuning uchun natija `NaN`. `sum(...[3, 4])` ko'rinishida tuzatib, natijani konsolga chiqaring (`7`).",
      "startingCode": "function sum(a, b) {\n  return a + b;\n}\nconsole.log(sum([3, 4]));\n",
      "hint": "console.log(sum(...[3, 4]));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"7\")) return null;\nreturn \"Natija 7 konsolga chiqmadi (spread ishlatildimi?)\";"
    },
    {
      "id": 9,
      "title": "Matnni belgilar massiviga yoyish",
      "instruction": "`\"abc\"` matnini spread orqali harflar massiviga yoyib (`[...\"abc\"]`), natijani konsolga chiqaring.",
      "startingCode": "// spread bilan matnni harflar massiviga yoyib chiqaring\n",
      "hint": "console.log([...\"abc\"]);",
      "test": "if (!code.includes(\"...\")) return \"Spread (...) operatori ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"[\\\"a\\\",\\\"b\\\",\\\"c\\\"]\") || m.includes(\"a,b,c\"))) return null;\nreturn \"Harflar massivi [a, b, c] konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Obyektlarni birlashtirish (chegara)",
      "instruction": "`const a = { x: 1, y: 2 };` va `const b = { y: 9, z: 3 };` ni spread bilan birlashtirib (`{ ...a, ...b }`), natijani konsolga chiqaring — `y` oxirgi (`9`) qiymat bilan olinishi kerak.",
      "startingCode": "const a = { x: 1, y: 2 };\nconst b = { y: 9, z: 3 };\n// spread bilan birlashtiring va chiqaring\n",
      "hint": "const merged = { ...a, ...b };\nconsole.log(merged);",
      "test": "if (!code.includes(\"...\")) return \"Spread (...) operatori ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"9\") && m.includes(\"z\") && m.includes(\"x\"))) return null;\nreturn \"Birlashgan obyekt (x, y:9, z) konsolga chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Spread operatori qaysi belgi bilan ifodalanadi?",
      options: [
        "...",
        "***",
        "->",
        ":::"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da Spread operatori uchta nuqta (...) belgisi bilan yoziladi."
    },
    {
      id: 2,
      question: "const a = [1, 2]; const b = [...a, 3]; kodida b massivining tarkibi nima bo'ladi?",
      options: [
        "[1, 2, 3]",
        "[[1, 2], 3]",
        "[1, 2]",
        "[3, 1, 2]"
      ],
      correctAnswer: 0,
      explanation: "...a massiv ichidagi elementlarni yoyib beradi va natijada yangi [1, 2, 3] massivi hosil bo'ladi."
    },
    {
      id: 3,
      question: "Obyektni yoyishda bir xil nomli kalitlar qatnashsa, qaysi biri saqlanib qoladi?",
      options: [
        "Eng oxirgi (o'ng tomondagi) qiymat",
        "Eng birinchi (chap tomondagi) qiymat",
        "Xatolik yuz beradi",
        "Ikkala qiymat ham massivga aylanadi"
      ],
      correctAnswer: 0,
      explanation: "Obyektlarda bir xil kalitlar ketma-ket kelsa, oxirgi kelgan qiymat oldingi qiymatning ustiga yoziladi."
    },
    {
      "id": 4,
      "question": "Spread bilan massiv nusxalanganda qanday nusxa hosil bo'ladi?",
      "options": [
        "Sayoz (shallow) nusxa",
        "Chuqur (deep) nusxa",
        "Reference (manzil) nusxa",
        "Nusxa umuman yaratilmaydi"
      ],
      "correctAnswer": 0,
      "explanation": "Spread yuqori darajadagi elementlarni ko'chiradi — bu sayoz nusxa; ichma-ich obyektlar umumiy qoladi."
    },
    {
      "id": 5,
      "question": "`const a = [1, 2]; const b = [3, 4]; const c = [...a, ...b];` natijasida `c` nima bo'ladi?",
      "options": [
        "[1, 2, 3, 4]",
        "[[1, 2], [3, 4]]",
        "[3, 4, 1, 2]",
        "[1, 2]"
      ],
      "correctAnswer": 0,
      "explanation": "Ikki massiv elementlari navbat bilan yoyilib, bitta massivga birlashadi."
    },
    {
      "id": 6,
      "question": "`const clone = { ...obj };` kodida nima sodir bo'ladi?",
      "options": [
        "obj ning yangi (sayoz) nusxasi yaratiladi",
        "obj o'chiriladi",
        "clone obj ning manzilini oladi",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Obyekt spread bilan nusxalanadi va yangi obyekt hosil bo'ladi; asl obyekt o'zgarmaydi."
    },
    {
      "id": 7,
      "question": "`Math.max(...[5, 1, 9])` nima qaytaradi?",
      "options": [
        "9",
        "5",
        "[5, 1, 9]",
        "NaN"
      ],
      "correctAnswer": 0,
      "explanation": "Spread massiv elementlarini alohida argumentlarga aylantiradi, shuning uchun Math.max 9 ni qaytaradi."
    },
    {
      "id": 8,
      "question": "`const obj = { ...base, x: 5 };` da `base.x` mavjud bo'lsa, natijada `x` qanday bo'ladi?",
      "options": [
        "5 (o'ng tomondagi qiymat ustun)",
        "base.x dagi eski qiymat",
        "Xato beradi",
        "Ikkala qiymat massivga yig'iladi"
      ],
      "correctAnswer": 0,
      "explanation": "Spread'dan keyin yozilgan kalit ustidan yozadi, shuning uchun x = 5 bo'ladi."
    },
    {
      "id": 9,
      "question": "`[...\"ab\"]` natijasi nima?",
      "options": [
        "[\"a\", \"b\"]",
        "[\"ab\"]",
        "\"ab\"",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Matn iterable bo'lgani uchun spread uning har bir belgisini alohida element qiladi."
    },
    {
      "id": 10,
      "question": "Spread operatorini funksiya chaqiruvida ishlatish mumkinmi?",
      "options": [
        "Ha, `fn(...args)` ko'rinishida",
        "Yo'q, faqat massivda",
        "Faqat obyektlarda",
        "Faqat Math bilan"
      ],
      "correctAnswer": 0,
      "explanation": "Spread funksiya chaqiruvida massiv elementlarini alohida argumentlarga yoyadi: fn(...args)."
    },
    {
      "id": 11,
      "question": "Spread ichma-ich (nested) obyektlarni ham chuqur nusxalaydimi?",
      "options": [
        "Yo'q, faqat yuqori darajani nusxalaydi (sayoz)",
        "Ha, to'liq chuqur nusxalaydi",
        "Faqat massivlarni",
        "Faqat sonlarni"
      ],
      "correctAnswer": 0,
      "explanation": "Spread sayoz nusxa qiladi; ichma-ich obyektlar umumiy reference bo'lib qolaveradi."
    },
    {
      "id": 12,
      "question": "`const c = { ...a, ...b };` qanday vazifani bajaradi?",
      "options": [
        "Ikki obyektni birlashtiradi, to'qnashuvda b ustun",
        "Ikki massivni birlashtiradi",
        "a ni b ga o'zgartiradi",
        "Faqat a ni nusxalaydi"
      ],
      "correctAnswer": 0,
      "explanation": "Obyekt spread ikki obyektni birlashtiradi; bir xil kalit bo'lsa, keyingi (b) ustidan yozadi."
    }
  ]
};

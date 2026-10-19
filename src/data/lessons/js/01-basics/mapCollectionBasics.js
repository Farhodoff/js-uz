export const mapCollectionBasics = {
  id: "mapCollectionBasics",
  title: "Global Obyektlar: Map (Kalit-Qiymat To'plami)",
  language: "javascript",
  theory: `## 1. Bu nima?

Garderobdagi kiyim topshirish xonasini tasavvur qiling: siz paltongizni topshirasiz, xodim esa evaziga sizga bitta raqamli jeton (kalit) beradi. Qaytib kelganingizda aynan shu jetonni ko'rsatib, o'z kiyimingizni qaytarib olasiz. Bu yerda kalit nafaqat matn, balki raqam yoki maxsus belgi ham bo'lishi mumkin.

JavaScript da **Map** — kalit va qiymat juftliklarini saqlovchi maxsus to'plamdir. Oddiy obyektdan eng katta farqi: uning kaliti **istalgan turda** (son, boolean yoki boshqa obyekt) bo'lishi mumkin!

**Map to'plami** — har qanday turdagi kalitlar bilan qiymatlarni bog'lab saqlash, elementlar sonini oson bilish va tartibni buzmasdan ishlash imkonini beruvchi to'plam obyekti.

*Yangi metodlar va xususiyatlar:*
- **new Map()** — yangi bo'sh \`Map\` to'plamini yaratadi.
- **map.set(key, value)** — to'plamga yangi kalit va qiymat juftligini yozadi.
- **map.get(key)** — ko'rsatilgan kalitga mos keluvchi qiymatni o'qib beradi.
- **map.has(key)** — to'plamda ko'rsatilgan kalit bor-yo'qligini tekshiradi (\`true\` yoki \`false\`).
- **map.size** — to'plamdagi jami juftliklar sonini qaytaradi.
- **map.delete(key)** — ko'rsatilgan kalit va uning qiymatini o'chirib tashlaydi.

---

## 2. Nega kerak?

Oddiy obyektlarda (\`{}\`) barcha kalitlar faqat matn (\`string\`) bo'lishi shart. Masalan, obyekt kaliti sifatida son yozsangiz ham (\`{ 1: "bir" }\`), JavaScript uni majburlab \`"1"\` matniga aylantiradi.

Bundan tashqari:
- Oddiy obyektda nechta element borligini bilish qiyin (\`size\` xususiyati yo'q).
- \`Map\` esa kalit turini asl holicha (masalan, raqam yoki boolean) saqlaydi.
- \`Map\` to'plami tezkor va elementlar sonini (\`size\`) darhol aytib beradi.

---

## 3. Birinchi misol

Bu kod yangi \`Map\` yaratish, unga qiymat kiritish va o'qishni ko'rsatadi.

\`\`\`javascript
const userRoles = new Map();

userRoles.set("Ali", "Admin"); // kalit: "Ali", qiymat: "Admin"
userRoles.set("Vali", "User"); // kalit: "Vali", qiymat: "User"

console.log(userRoles.get("Ali")); // "Admin"
console.log(userRoles.size); // 2
console.log(userRoles.has("Vali")); // true
\`\`\`

\`\`\`text
// Natija:
Admin
2
true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const userRoles = new Map();\` — yangi bo'sh \`Map\` to'plami yaratildi.
- \`userRoles.set("Ali", "Admin");\` — \`set()\` metodi yordamida \`"Ali"\` kaliti ostida \`"Admin"\` qiymati saqlandi.
- \`userRoles.set("Vali", "User");\` — \`"Vali"\` kaliti ostida \`"User"\` qiymati saqlandi.
- \`console.log(userRoles.get("Ali"));\` — \`get()\` metodi orqali \`"Ali"\` kalitiga tegishli qiymat (\`"Admin"\`) olindi.
- \`console.log(userRoles.size);\` — to'plamdagi juftliklar soni \`2\` ekanligi ko'rindi.
- \`console.log(userRoles.has("Vali"));\` — \`has()\` metodi \`"Vali"\` kaliti borligini tasdiqlab \`true\` qaytardi.

---

## 5. Qadamma-qadam (solishtirish jadvali)

Oddiy Obyekt (\`{}\`) va \`Map\` to'plamining farqlari:

| Xususiyat | Oddiy Obyekt (\`{}\`) | \`Map\` to'plami |
|---|---|---|
| Kalit turi | Faqat matn (\`string\`) | Istalgan tur (raqam, boolean, obyekt...) |
| Elementlar soni | Tayyor xususiyat yo'q | \`map.size\` orqali darhol olinadi |
| Qiymat yozish | \`obj[key] = value\` | \`map.set(key, value)\` |
| Qiymat o'qish | \`obj[key]\` yoki \`obj.key\` | \`map.get(key)\` |
| Borligini tekshirish | \`key in obj\` | \`map.has(key)\` |

---

## 6. Yana bitta misol

1-misoldan farqi: Kalit sifatida **raqam** va **boolean** ishlatish (oddiy obyekt buni matnga aylantirib yuborardi).

\`\`\`javascript
const statusMap = new Map();

statusMap.set(200, "Muvaffaqiyatli"); // kalit: son (200)
statusMap.set(true, "Ruxsat berilgan"); // kalit: mantiqiy (true)

console.log(statusMap.get(200)); // "Muvaffaqiyatli"
console.log(statusMap.get(true)); // "Ruxsat berilgan"
\`\`\`

\`\`\`text
// Natija:
Muvaffaqiyatli
Ruxsat berilgan
\`\`\`

Tahlil:
- \`statusMap.get(200)\` — kalit aynan son bo'lib qoldi, \`"200"\` matniga aylanmadi.
- \`statusMap.get(true)\` — boolean qiymat ham o'z holicha kalit bo'la oldi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Map ga kvadrat qavs bilan murojaat qilish (map[key] = value)

\`\`\`javascript
const map = new Map();
map["name"] = "Ali"; // XATO: Map ichiga emas, oddiy obyektga qo'shildi

console.log(map.get("name")); // undefined!
console.log(map.size); // 0!
\`\`\`

**Nima bo'ladi:** Kvadrat qavs ishlatilsa, \`Map\` ning ichki ro'yxatiga qo'shilmaydi va \`size\` uni hisoblamaydi.
**To'g'ri varianti:** Har doim \`map.set("name", "Ali")\` va \`map.get("name")\` deb yozing.

### 2-xato: new so'zini yozmasdan Map() deb chaqirish

\`\`\`javascript
const m = Map(); // XATO: TypeError: Constructor Map requires 'new'
\`\`\`

**Nima bo'ladi:** \`Map\` konstruktor bo'lgani uchun \`new\` talab qiladi.
**To'g'ri varianti:** \`new Map()\`.

### 3-xato: Map ni massivning map() metodi bilan adashtirish

- \`array.map(fn)\` — massiv elementlarini o'zgartirib yangi massiv qaytaruvchi metod (kichik harf bilan).
- \`new Map()\` — kalit-qiymat to'plamini hosil qiluvchi global obyekt (katta \`M\` harfi bilan).

---

## 8. Tekshiruv

### 1-mashq (oson)
\`userMap = new Map()\` yarating. Unga \`set()\` orqali \`"id"\` kaliti bilan \`101\` qiymatini, \`"name"\` kaliti bilan \`"Ali"\` qiymatini qo'shing va \`userMap.get("id")\` ni konsolga chiqaring (\`101\`).

### 2-mashq (o'rtacha)
\`scores = new Map()\` to'plami berilgan. Unga \`set(1, "Oltin")\` va \`set(2, "Kumush")\` qiymatlarini qo'shing. \`has(1)\` va \`has(3)\` natijalarini alohida konsolga chiqaring (\`true\`, keyin \`false\`).

### 3-mashq (chegara holat)
\`config = new Map()\` yaratib, unga \`config.set("theme", "dark")\` ni qo'shing. So'ng \`config.delete("theme")\` orqali uni o'chirib tashlang va \`config.size\` qiymatini konsolga chiqaring (\`0\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const userMap = new Map();
userMap.set("id", 101);
userMap.set("name", "Ali");

console.log(userMap.get("id")); // 101
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const scores = new Map();
scores.set(1, "Oltin");
scores.set(2, "Kumush");

console.log(scores.has(1)); // true
console.log(scores.has(3)); // false
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const config = new Map();
config.set("theme", "dark");
config.delete("theme");

console.log(config.size); // 0
\`\`\`

---

## 9. Xulosa

1. \`Map\` — har qanday turdagi kalitlar bilan qiymatlarni saqlovchi to'plam.
2. Qiymat yozish uchun \`set()\`, o'qish uchun \`get()\`, borligini tekshirish uchun \`has()\`, o'chirish uchun \`delete()\` ishlatiladi.
3. Elementlar soni \`size\` xususiyati orqali olinadi.

Keyingi darsda: DOM olamiga kirish — \`window\` va \`document\` obyektlari bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Map yaratish va qiymat o'qish",
      instruction: "`new Map()` yarating, `set()` orqali `\"id\": 101` va `\"name\": \"Ali\"` ni kiriting hamda `get(\"id\")` ni konsolga chiqaring.",
      startingCode: "// Map yarating, \"id\" va \"name\" ni set qiling hamda \"id\" qiymatini chiqaring\n",
      hint: "const userMap = new Map();\nuserMap.set(\"id\", 101);\nuserMap.set(\"name\", \"Ali\");\nconsole.log(userMap.get(\"id\"));",
      test: "if (!code.includes('new Map') || !code.includes('.get')) return 'Map va get ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('101')) return null;\nreturn '101 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "has() metodi bilan kalitni tekshirish",
      instruction: "`scores = new Map()` ga `1: \"Oltin\"` va `2: \"Kumush\"` ni qo'shing. `has(1)` va `has(3)` natijalarini konsolga chiqaring.",
      startingCode: "const scores = new Map();\n// 1 va 2 kalitlarini set qiling, has(1) va has(3) ni chiqaring\n",
      hint: "scores.set(1, \"Oltin\");\nscores.set(2, \"Kumush\");\nconsole.log(scores.has(1));\nconsole.log(scores.has(3));",
      test: "if (!code.includes('.has')) return 'has() metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('true') && out.includes('false')) return null;\nreturn 'true va false konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "delete() va to'plam o'lchami",
      instruction: "`config = new Map()` yarating, `\"theme\": \"dark\"` ni set qiling, so'ng uni `delete()` qilib, `size` ini konsolga chiqaring.",
      startingCode: "const config = new Map();\n// set qiling, delete qiling va size ni chiqaring\n",
      hint: "config.set(\"theme\", \"dark\");\nconfig.delete(\"theme\");\nconsole.log(config.size);",
      test: "if (!code.includes('.delete') || !code.includes('.size')) return 'delete va size ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('0')) return null;\nreturn '0 soni konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "Yo'q kalit: get() undefined, has() false",
      "instruction": "`colors` Map to'plamiga `set(\"qizil\", \"#f00\")` qo'shilgan. Mavjud bo'lmagan `\"yashil\"` kaliti uchun `get()` va `has()` natijalarini konsolga chiqaring.",
      "startingCode": "const colors = new Map();\ncolors.set(\"qizil\", \"#f00\");\n// yo'q kalit uchun get() va has() natijasini chiqaring\n",
      "hint": "const colors = new Map();\ncolors.set(\"qizil\", \"#f00\");\nconsole.log(colors.get(\"yashil\"));\nconsole.log(colors.has(\"yashil\"));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\".get\") || !code.includes(\".has\")) return \"get() va has() ishlatilmadi\";\nif (out.some((m) => m.trim() === \"undefined\") && out.some((m) => m.trim() === \"false\")) return null;\nreturn \"undefined va false konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Kalit turi: son va matn alohida",
      "instruction": "`price` Map to'plamiga `price.set(1, \"bir\")` va `price.set(\"1\", \"matn\")` qo'shing. `size` (2) va `get(1)` (\"bir\") natijalarini konsolga chiqaring.",
      "startingCode": "const price = new Map();\n// son 1 va matn \"1\" kalitlarini qo'shing, size va get ni chiqaring\n",
      "hint": "const price = new Map();\nprice.set(1, \"bir\");\nprice.set(\"1\", \"matn\");\nconsole.log(price.size);\nconsole.log(price.get(1));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\".set\")) return \"set() ishlatilmadi\";\nif (out.some((m) => m.trim() === \"2\") && out.some((m) => m.trim() === \"bir\")) return null;\nreturn \"2 va \\\"bir\\\" konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "delete() natijasi: true, keyin false",
      "instruction": "`users` Map to'plamidan `delete(\"ali\")` natijasini, keyin yana bir marta `delete(\"ali\")` natijasini, so'ng `size` ni konsolga chiqaring (true, false, 0).",
      "startingCode": "const users = new Map();\nusers.set(\"ali\", 25);\n// ikki marta delete qilib, so'ng size ni chiqaring\n",
      "hint": "const users = new Map();\nusers.set(\"ali\", 25);\nconsole.log(users.delete(\"ali\"));\nconsole.log(users.delete(\"ali\"));\nconsole.log(users.size);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\".delete\")) return \"delete() ishlatilmadi\";\nconst hasTrue = out.some((m) => m.trim() === \"true\");\nconst hasFalse = out.some((m) => m.trim() === \"false\");\nif (hasTrue && hasFalse && out.some((m) => m.trim() === \"0\")) return null;\nreturn \"true, false va 0 konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Bir kalitga qayta set: qiymat yangilanadi",
      "instruction": "`stock` to'plamiga `set(\"olma\", 10)` va yana `set(\"olma\", 25)` qo'shing. Kalit takrorlanishi `size` ni oshirmasligini ko'rsating: `get(\"olma\")` (25) va `size` (1).",
      "startingCode": "const stock = new Map();\n// bir kalitni ikki marta set qilib, get va size ni chiqaring\n",
      "hint": "const stock = new Map();\nstock.set(\"olma\", 10);\nstock.set(\"olma\", 25);\nconsole.log(stock.get(\"olma\"));\nconsole.log(stock.size);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\".set\")) return \"set() ishlatilmadi\";\nif (out.some((m) => m.trim() === \"25\") && out.some((m) => m.trim() === \"1\")) return null;\nreturn \"25 va 1 konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "Boolean kalit bilan ishlash",
      "instruction": "`flags` Map to'plamiga `set(true, \"yoqilgan\")` va `set(false, \"ochirilgan\")` qo'shib, `get(false)` qiymatini konsolga chiqaring.",
      "startingCode": "const flags = new Map();\n// boolean kalitlar bilan ishlang va get(false) ni chiqaring\n",
      "hint": "const flags = new Map();\nflags.set(true, \"yoqilgan\");\nflags.set(false, \"ochirilgan\");\nconsole.log(flags.get(false));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"set(true\") && !code.includes(\"set(false\")) return \"boolean kalit ishlatilmadi\";\nif (out.some((m) => m.trim() === \"ochirilgan\")) return null;\nreturn \"ochirilgan konsolga chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Obyekt kalit sifatida (chegara holat)",
      "instruction": "`k1` va `k2` bir xil mazmundagi alohida obyektlar. `m.set(k1, \"birinchi\")` qilib, `m.get(k2)` (undefined) va `m.has(k1)` (true) natijalarini konsolga chiqaring.",
      "startingCode": "const k1 = { id: 1 };\nconst k2 = { id: 1 };\nconst m = new Map();\n// k1 ni kalit qilib qo'ying, k2 bilan get va k1 bilan has ni chiqaring\n",
      "hint": "const k1 = { id: 1 };\nconst k2 = { id: 1 };\nconst m = new Map();\nm.set(k1, \"birinchi\");\nconsole.log(m.get(k2));\nconsole.log(m.has(k1));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\".set\")) return \"set() ishlatilmadi\";\nif (out.some((m) => m.trim() === \"undefined\") && out.some((m) => m.trim() === \"true\")) return null;\nreturn \"undefined va true konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Takrorlanishlarni sanash",
      "instruction": "`[\"js\", \"css\", \"js\", \"js\", \"css\"]` massividagi har bir so'z necha marta uchraganini Map bilan sanab, `get(\"js\")` (3) va `size` (2) ni konsolga chiqaring.",
      "startingCode": "const words = [\"js\", \"css\", \"js\", \"js\", \"css\"];\nconst counts = new Map();\n// har bir so'z uchun set/has/get bilan sanang\n",
      "hint": "const words = [\"js\", \"css\", \"js\", \"js\", \"css\"];\nconst counts = new Map();\nfor (const w of words) {\n  if (counts.has(w)) {\n    counts.set(w, counts.get(w) + 1);\n  } else {\n    counts.set(w, 1);\n  }\n}\nconsole.log(counts.get(\"js\"));\nconsole.log(counts.size);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"new Map\")) return \"Map ishlatilmadi\";\nif (out.some((m) => m.trim() === \"3\") && out.some((m) => m.trim() === \"2\")) return null;\nreturn \"3 va 2 konsolga chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Map to'plamining oddiy obyektdan asosiy ustunligi nima?",
      options: [
        "Kalit sifatida istalgan turdagi ma'lumot (son, boolean, obyekt) ishlatilishi mumkin",
        "U faqat matnlarni saqlaydi",
        "Unda qiymat saqlab bo'lmaydi",
        "U faqat massivlarni qabul qiladi"
      ],
      correctAnswer: 0,
      explanation: "Oddiy obyektdan farqli ravishda, Map to'plamida kalitlar faqat matn bo'lib cheklanmaydi, istalgan turda bo'lishi mumkin."
    },
    {
      id: 2,
      question: "Map to'plamiga yangi kalit va qiymat qo'shish uchun qaysi metod ishlatiladi?",
      options: [
        "map.set(key, value)",
        "map.add(key, value)",
        "map.push(key, value)",
        "map.put(key, value)"
      ],
      correctAnswer: 0,
      explanation: "Map da qiymat kiritish uchun map.set(key, value) metodi ishlatiladi (Set dagi add() bilan adashtirmang)."
    },
    {
      id: 3,
      question: "Map to'plamidagi elementlar sonini qaysi xususiyat orqali bilib olamiz?",
      options: [
        "size",
        "length",
        "count",
        "total"
      ],
      correctAnswer: 0,
      explanation: "Set kabi Map to'plamida ham elementlar soni size xususiyati orqali olinadi."
    },
    {
      "id": 4,
      "question": "Map to'plamida mavjud bo'lmagan kalit bilan `get()` chaqirilsa nima qaytadi?",
      "options": [
        "Xatolik (Error) chiqadi",
        "undefined",
        "null",
        "0"
      ],
      "correctAnswer": 1,
      "explanation": "Yo'q kalit uchun get() xato bermaydi, shunchaki undefined qaytaradi. Bor-yo'qligini bilish uchun has() ishlatiladi."
    },
    {
      "id": 5,
      "question": "`map.delete(key)` metodi nima qaytaradi?",
      "options": [
        "O'chirilgan qiymatni",
        "true yoki false (o'chirildimi-yo'qmi)",
        "To'plamning yangi size ini",
        "undefined"
      ],
      "correctAnswer": 1,
      "explanation": "delete() o'chirish muvaffaqiyatli bo'lganini boolean qiymat bilan aytadi."
    },
    {
      "id": 6,
      "question": "Map da mavjud kalitga `set()` bilan qayta yozilsa nima bo'ladi?",
      "options": [
        "Qiymat yangilanadi, size o'zgarmaydi",
        "Ikkinchi juftlik yangi element bo'lib qo'shiladi va size 1 ga oshadi",
        "Xatolik chiqadi",
        "Kalit o'chib ketadi"
      ],
      "correctAnswer": 0,
      "explanation": "Map da kalit takrorlanmaydi: bir xil kalitga set() qilinsa faqat qiymat almashtiriladi."
    },
    {
      "id": 7,
      "question": "`map[\"name\"] = \"Ali\"` kabi kvadrat qavs bilan yozilsa nima sodir bo'ladi?",
      "options": [
        "Qiymat Map ga qo'shiladi va size 1 bo'ladi",
        "Qiymat Map ning ichki ro'yxatiga qo'shilmaydi, size o'zgarmaydi",
        "Sintaksis xatosi chiqadi",
        "get() bilan o'sha qiymat o'qiladi"
      ],
      "correctAnswer": 1,
      "explanation": "Kvadrat qavs Map ning maxsus metodi emas, u oddiy obyekt xususiyati bo'lib qoladi. Shuning uchun size va get() unga ta'sir qilmaydi."
    },
    {
      "id": 8,
      "question": "`Map()` ni `new` so'zisiz chaqirsa qanday xato bo'ladi?",
      "options": [
        "TypeError: Constructor Map requires 'new'",
        "ReferenceError: Map is not defined",
        "Sintaksis xatosi",
        "Xato bo'lmaydi, bo'sh Map qaytadi"
      ],
      "correctAnswer": 0,
      "explanation": "Map konstruktor funksiya, u faqat new bilan chaqiriladi."
    },
    {
      "id": 9,
      "question": "`array.map(fn)` va `new Map()` bir xil narsami?",
      "options": [
        "Ha, ikkalasi ham kalit-qiymat saqlaydi",
        "Yo'q: kichik `m` bilan yozilgan map() massiv metodi, katta `M` bilan yozilgan Map esa global to'plam obyekti",
        "Yo'q: ular bir xil, faqat nomi boshqacha",
        "Ha, ikkalasi ham faqat matnlar bilan ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Katta-kichik harf va ishlatilish o'rni boshqacha: massiv metodi yangi massiv qaytaradi, Map to'plami esa kalit-qiymat saqlaydi."
    },
    {
      "id": 10,
      "question": "Map to'plamida kalit sifatida obyekt ishlatilsa, ikki xil obyekt kalitlari qanday hisoblanadi?",
      "options": [
        "Mazmuni bir xil bo'lsa, bitta kalit hisoblanadi",
        "Har bir obyekt alohida havola bo'lgani uchun alohida kalit hisoblanadi",
        "Obyektni kalit qilib bo'lmaydi, xato chiqadi",
        "Obyekt avtomatik matnga aylanadi"
      ],
      "correctAnswer": 1,
      "explanation": "Map kalitni havola bo'yicha saqlaydi: { id: 1 } ikki marta yozilsa ular ikki xil kalit bo'ladi."
    },
    {
      "id": 11,
      "question": "Map va Set to'plamlari orasidagi asosiy farq nima?",
      "options": [
        "Set kalit-qiymat juftliklarini, Map faqat qiymatlarni saqlaydi",
        "Map kalit-qiymat juftliklarini, Set faqat qiymatlarni saqlaydi",
        "Ikkalasi ham faqat sonlarni saqlaydi",
        "Farqi yo'q, ikkalasi bir xil ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Set da faqat qiymat bor, Map da esa har bir qiymat kalit bilan bog'langan."
    },
    {
      "id": 12,
      "question": "Map to'plamidagi juftliklar sonini qanday olamiz?",
      "options": [
        "map.length",
        "map.size",
        "map.count",
        "map.total()"
      ],
      "correctAnswer": 1,
      "explanation": "Map da length emas, size xususiyati ishlatiladi."
    }
  ]
};

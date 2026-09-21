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
    }
  ]
};

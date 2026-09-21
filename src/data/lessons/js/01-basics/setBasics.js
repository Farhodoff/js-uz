export const setBasics = {
  id: "setBasics",
  title: "Global Obyektlar: Set (Takrorlanmas Qiymatlar)",
  language: "javascript",
  theory: `## 1. Bu nima?

Saylovda ovoz beruvchilar yoki ziyofatga taklif qilingan mehmonlar ro'yxatini tasavvur qiling: bir kishi ro'yxatga faqat bir marta yozilishi mumkin. Agar o'sha odam ikkinchi yoki uchinchi marta kelib o'z ismini qo'shmoqchi bo'lsa ham, ro'yxat uni qabul qilmaydi, chunki u allaqachon mavjud.

JavaScript da **Set** aynan shunday ro'yxat vazifasini bajaradi: u faqat takrorlanmas (noyob / unikal) qiymatlarni saqlaydi.

**Set to'plami** — har qanday turdagi faqat takrorlanmas qiymatlarni saqlovchi maxsus to'plam obyekti bo'lib, unga bir xil qiymat qancha qo'shilsa ham, u faqat 1 marta saqlanib qoladi.

*Yangi metodlar va xususiyatlar:*
- **new Set()** — yangi bo'sh \`Set\` to'plami yaratadi.
- **add(qiymat)** — to'plamga yangi qiymat qo'shadi (agar u oldin yo'q bo'lsa).
- **has(qiymat)** — berilgan qiymat to'plamda bor-yo'qligini tekshiradi (\`true\` yoki \`false\`).
- **size** — to'plam ichidagi noyob elementlar sonini bildiradi (\`length\` emas, \`size\`!).
- **delete(qiymat)** — ko'rsatilgan qiymatni to'plamdan olib tashlaydi.

---

## 2. Nega kerak?

Oddiy massivlarda bir xil qiymat istalgancha takrorlanishi mumkin (\`[1, 2, 2, 3, 3, 3]\`). Foydalanuvchilarning takrorlangan ID raqamlarini tozalash yoki kiritilgan teglarning faqat noyoblarini saqlash uchun oddiy massivda uzun sikllar va tekshiruvlar yozish kerak bo'lardi.

\`Set\` esa bu ishni bir zumda avtomatik bajaradi: unga massiv uzatsangiz, barcha dublikatlarni (takrorlarni) bir zumda tozalab beradi.

---

## 3. Birinchi misol

Bu kod \`Set\` yaratish, unga qiymat qo'shish va takroriy qiymat qabul qilinmasligini ko'rsatadi.

\`\`\`javascript
const numbers = new Set();

numbers.add(10);
numbers.add(20);
numbers.add(10); // Takroriy qiymat! Qabul qilinmaydi

console.log(numbers.size); // 2 (chunki faqat 10 va 20 bor)
console.log(numbers.has(20)); // true
\`\`\`

\`\`\`text
// Natija:
2
true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const numbers = new Set();\` — yangi bo'sh \`Set\` to'plami hosil qilindi.
- \`numbers.add(10);\` — to'plamga \`10\` soni muvaffaqiyatli qo'shildi.
- \`numbers.add(20);\` — to'plamga \`20\` soni qo'shildi.
- \`numbers.add(10);\` — \`10\` allaqachon to'plamda borligi sababli, \`Set\` uni ikkinchi marta qo'shmadi va e'tiborsiz qoldirdi.
- \`console.log(numbers.size);\` — to'plamdagi elementlar sonini ko'ramiz (\`2\`). Diqqat qiling: \`Set\` da \`length\` emas, \`size\` xususiyati ishlatiladi!
- \`console.log(numbers.has(20));\` — \`has()\` metodi \`20\` soni to'plamda borligini tekshirib, \`true\` qaytardi.

---

## 5. Qadamma-qadam (trace jadvali)

To'plam holatining o'zgarishi:

| Qadam | Kod | To'plam tarkibi | \`size\` | Izoh |
|---|---|---|---|---|
| 1 | \`new Set()\` | \`Set {}\` | \`0\` | Bo'sh to'plam |
| 2 | \`numbers.add(10)\` | \`Set { 10 }\` | \`1\` | 10 qo'shildi |
| 3 | \`numbers.add(20)\` | \`Set { 10, 20 }\` | \`2\` | 20 qo'shildi |
| 4 | \`numbers.add(10)\` | \`Set { 10, 20 }\` | \`2\` | Takroriy, o'zgarmadi |

---

## 6. Yana bitta misol

1-misoldan farqi: Massivdagi takrorlangan elementlarni \`Set\` va Spread (\`...\`) yordamida bitta qatorda tozalash.

\`\`\`javascript
const duplicates = ["olma", "nok", "olma", "banan", "nok"];

const uniqueSet = new Set(duplicates); // takrorlar avtomatik tozalandi
const uniqueArray = [...uniqueSet]; // yana toza massivga aylantirish

console.log(uniqueArray); // ["olma", "nok", "banan"]
\`\`\`

\`\`\`text
// Natija:
[ 'olma', 'nok', 'banan' ]
\`\`\`

Tahlil:
- \`new Set(duplicates)\` massivdagi barcha takrorlarni olib tashlab, faqat 3 ta noyob mevani saqlab qoldi.
- \`[...uniqueSet]\` esa uni yana oddiy massivga aylantirdi. Bu JavaScript da massivni dublikatlardan tozalashning eng mashhur usulidir!

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: size o'rniga length ishlatish

\`\`\`javascript
const items = new Set([1, 2, 3]);

console.log(items.length); // XATO: undefined
\`\`\`

**Nima bo'ladi:** \`Set\` da \`length\` xususiyati mavjud emas, shuning uchun \`undefined\` chiqadi.
**To'g'ri varianti:** Har doim \`items.size\` deb yozing (\`3\`).

### 2-xato: Indeks orqali murojaat qilish (set[0])

\`\`\`javascript
const items = new Set(["Ali", "Vali"]);

console.log(items[0]); // XATO: undefined
\`\`\`

**Nima bo'ladi:** \`Set\` massiv emas, uning elementlari raqamli indeksga ega emas.
**To'g'ri varianti:** Element borligini tekshirish uchun \`items.has("Ali")\` yoki massivga o'girib \`[...items][0]\` ishlatiladi.

### 3-xato: new so'zini tashlab ketish

\`\`\`javascript
const s = Set(); // XATO: TypeError: Constructor Set requires 'new'
\`\`\`

**Nima bo'ladi:** \`Set\` konstruktor bo'lgani sababli uni \`new\` kalit so'zisiz chaqirib bo'lmaydi.
**To'g'ri varianti:** \`new Set()\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`new Set()\` yarating, unga \`add()\` yordamida \`"Ali"\`, \`"Vali"\` va yana \`"Ali"\` ni qo'shing. To'plamning \`size\` xususiyatini konsolga chiqaring (\`2\`).

### 2-mashq (o'rtacha)
\`tags = new Set(["js", "html", "css"])\` to'plami berilgan. Unda \`"react"\` bor-yo'qligini \`has()\` bilan tekshirib chiqaring (\`false\`). So'ng \`tags.add("react")\` qilib yana tekshirib konsolga chiqaring (\`true\`).

### 3-mashq (chegara holat)
\`scores = [5, 5, 4, 3, 4, 5]\` massivi berilgan. Uni \`new Set(scores)\` orqali to'plamga aylantiring va \`delete(3)\` metodi yordamida \`3\` sonini o'chirib tashlang. Qolgan to'plamning \`size\` ini konsolga chiqaring (\`2\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const users = new Set();
users.add("Ali");
users.add("Vali");
users.add("Ali");

console.log(users.size); // 2
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const tags = new Set(["js", "html", "css"]);

console.log(tags.has("react")); // false
tags.add("react");
console.log(tags.has("react")); // true
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const scores = [5, 5, 4, 3, 4, 5];
const scoreSet = new Set(scores);

scoreSet.delete(3);
console.log(scoreSet.size); // 2
\`\`\`

---

## 9. Xulosa

1. \`Set\` — faqat takrorlanmas qiymatlarni saqlovchi to'plam.
2. Element qo'shish uchun \`add()\`, borligini tekshirish uchun \`has()\`, o'chirish uchun esa \`delete()\` ishlatiladi.
3. Elementlar sonini bilish uchun \`length\` emas, \`size\` xususiyati qo'llanadi.

Keyingi darsda: Global obyektlar — kalit-qiymat juftliklari bilan ishlovchi \`Map\` obyekti bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Set yaratish va takrorlanmaslikni tekshirish",
      instruction: "`new Set()` yarating, unga `add()` orqali `\"Ali\"`, `\"Vali\"` va yana `\"Ali\"` ni qo'shing va `size` ini konsolga chiqaring.",
      startingCode: "// Set yarating, \"Ali\", \"Vali\", \"Ali\" qo'shing va size ini chiqaring\n",
      hint: "const s = new Set();\ns.add(\"Ali\");\ns.add(\"Vali\");\ns.add(\"Ali\");\nconsole.log(s.size);",
      test: "if (!code.includes('new Set') || !code.includes('.size')) return 'Set va size ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('2')) return null;\nreturn '2 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "has() metodi bilan tekshirish",
      instruction: "`tags = new Set([\"js\", \"html\", \"css\"])` to'plamida `\"react\"` borligini `has()` orqali tekshiring (false), so'ng qo'shib yana tekshiring (true).",
      startingCode: "const tags = new Set([\"js\", \"html\", \"css\"]);\n// has bilan tekshiring, add qiling va yana has bilan tekshiring\n",
      hint: "console.log(tags.has(\"react\"));\ntags.add(\"react\");\nconsole.log(tags.has(\"react\"));",
      test: "if (!code.includes('.has')) return 'has() metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('false') && out.includes('true')) return null;\nreturn 'false va true konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "delete() va to'plam o'lchami",
      instruction: "`scores = [5, 5, 4, 3, 4, 5]` massividan Set hosil qiling, `delete(3)` qilib `3` sonini o'chiring va `size` ini konsolga chiqaring.",
      startingCode: "const scores = [5, 5, 4, 3, 4, 5];\n// Set yarating, 3 ni delete qiling va size ni chiqaring\n",
      hint: "const s = new Set(scores);\ns.delete(3);\nconsole.log(s.size);",
      test: "if (!code.includes('.delete') || !code.includes('.size')) return 'delete va size ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('2')) return null;\nreturn '2 soni konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Set to'plamiga bir xil qiymat ikki marta qo'shilsa nima bo'ladi?",
      options: [
        "Ikkinchi marta qo'shilmaydi, to'plamda faqat bitta nusxasi qoladi",
        "Xatolik (Error) yuz beradi",
        "Eski qiymat o'chib ketadi",
        "Ikkala qiymat ham massiv bo'lib saqlanadi"
      ],
      correctAnswer: 0,
      explanation: "Set ning asosiy xususiyati takrorlanmaslikdir. Bir xil qiymat necha marta qo'shilsa ham, u faqat 1 marta saqlanadi."
    },
    {
      id: 2,
      question: "Set to'plamidagi elementlar sonini qaysi xususiyat orqali bilamiz?",
      options: [
        "size",
        "length",
        "count",
        "total"
      ],
      correctAnswer: 0,
      explanation: "Set to'plamida elementlar soni size xususiyati orqali aniqlanadi (massivlardagi length o'rniga)."
    },
    {
      id: 3,
      question: "Set to'plamida ma'lum bir qiymat bor yoki yo'qligini tekshirish uchun qaysi metod ishlatiladi?",
      options: [
        "has(value)",
        "includes(value)",
        "find(value)",
        "exists(value)"
      ],
      correctAnswer: 0,
      explanation: "Set to'plamida qiymat mavjudligini tekshirish uchun has(value) metodi ishlatiladi va u true yoki false qaytaradi."
    }
  ]
};

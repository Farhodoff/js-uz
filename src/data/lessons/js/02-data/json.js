export const json = {
  id: 'json',
  title: 'JSON: parse, stringify va Amaliy Qo\'llanish',
  description: "JSON formati, JSON.parse va JSON.stringify, deep clone, xatolarni boshqarish va real loyihalarda qo'llanishi.",
  theory: `
## 📦 JSON nima?

**JSON** (JavaScript Object Notation) — ma'lumotlarni **matn (string) ko'rinishida** saqlash va uzatish uchun universal format.

🎩 **Hayotiy o'xshatish:** O'ylab ko'ring, siz do'stingizga paket yubormoqchisiz. Paketni (obyektni) pochtaga (tarmoq orqali) yuborish uchun uni **qutiga solishingiz** (stringify) kerak. Do'stingiz esa qutini ochib, paketni chiqaradi (parse).

\`\`\`javascript
// JS obyekti (kod ichida ishlatiladi)
const user = { name: "Ali", age: 25 };

// JSON satr (tarmoqda/faylda saqlanadi)
const jsonStr = '{"name":"Ali","age":25}';
\`\`\`

## 🔧 JSON.stringify — Obyektni satrga aylantirish

\`\`\`javascript
const student = { name: "Zokir", age: 20, married: false };

JSON.stringify(student);        // '{"name":"Zokir","age":20,"married":false}'
JSON.stringify(student, null, 2); // chiroyli formatlangan (indent bilan)
JSON.stringify([1, 2, 3]);      // '[1,2,3]'
JSON.stringify("hello");        // '"hello"'
JSON.stringify(42);             // '42'
JSON.stringify(null);           // 'null'
\`\`\`

**replacer** parametri — nima saqlanishini boshqarish:
\`\`\`javascript
const data = { name: "Ali", password: "12345", age: 25 };

// Faqat kerakli maydonlar:
JSON.stringify(data, ["name", "age"]); // '{"name":"Ali","age":25}'

// Yoki funksiya bilan:
JSON.stringify(data, (key, value) => {
  if (key === "password") return undefined; // saqlanmaydi
  return value;
}); // '{"name":"Ali","age":25}'
\`\`\`

## 🔍 JSON.parse — Satrdan obyektga qaytarish

\`\`\`javascript
const jsonStr = '{"name":"Ali","skills":["JS","React"]}';

const obj = JSON.parse(jsonStr);
obj.name;           // "Ali"
obj.skills[0];      // "JS"

// reviver — har bir qiymatni o'zgartirish imkoniyati:
const withDate = '{"name":"Ali","born":"2000-05-15"}';
const parsed = JSON.parse(withDate, (key, value) => {
  if (key === "born") return new Date(value);
  return value;
});
parsed.born.getFullYear(); // 2000
\`\`\`

## ⚠️ JSON qo'llab-quvvatlamaydigan turlar

| Qiymat | stringify natijasi |
|---|---|
| \\\`undefined\\\` | maydon **butunlay yo'qoladi** |
| \\\`function\\\` | maydon **butunlay yo'qoladi** |
| \\\`Symbol\\\` | maydon **butunlay yo'qoladi** |
| \\\`NaN\\\`, \\\`Infinity\\\` | \\\`null\\\` ga aylanadi |
| \\\`Date\\\` | ISO satrga aylanadi (\\\`"2024-01-15T00:00:00.000Z"\\\`) |

\`\`\`javascript
JSON.stringify({ a: undefined, b: function(){}, c: Symbol() }); // '{}'
JSON.stringify({ x: NaN, y: Infinity }); // '{"x":null,"y":null}'
JSON.stringify({ now: new Date() }); // '{"now":"2024-..."}' — Date satr bo'ladi!
\`\`\`

❌ **YOMON:** JSON parse qilingan obyektda Date endi Date emas — oddiy satr!
✅ **YAXSHI:** reviver bilan qayta Date ga aylantirish kerak.

## 💥 JSON.parse xatolari va ularni boshqarish

Noto'g'ri formatlangan satr \\\`SyntaxError\\\` tashlaydi:
\`\`\`javascript
JSON.parse("salom");     // ❌ SyntaxError!
JSON.parse("{'a':1}");   // ❌ JSON faqat qo'shtirnq ishlatadi!
JSON.parse('{"a": 1,}'); // ❌ oxirgi vergul bo'lmaydi!

// Xavfsiz usul:
function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("JSON xatosi:", e.message);
    return null;
  }
}
\`\`\`

## 🎯 JSON bilan Deep Clone

\`\`\`javascript
const original = { name: "Ali", address: { city: "Toshkent" } };

const clone = JSON.parse(JSON.stringify(original));
clone.address.city = "Samarqand";

original.address.city; // "Toshkent" — asl o'zgarmadi ✅
\`\`\`

Cheklovlar: \\\`undefined\\\`, funksiyalar, \\\`Date\\\`, \\\`Map/Set\\\`, circular references yo'qoladi yoki xato beradi. To'liq clone uchun \\\`structuredClone(original)\\\` ishlatiladi.

## 🌐 Real qo'llanish: localStorage va API

\`\`\`javascript
// Saqlash:
const settings = { theme: "dark", lang: "uz" };
localStorage.setItem("settings", JSON.stringify(settings));

// O'qish:
const saved = JSON.parse(localStorage.getItem("settings"));
saved.theme; // "dark"

// API so'rovi (fetch natijasi JSON keladi):
// const response = await fetch('/api/users');
// const data = await response.json(); // parse avtomatik!
\`\`\`

## 📝 Xulosa

- \\\`JSON.stringify(value, replacer, indent)\\\` — obyektdan satrga
- \\\`JSON.parse(str, reviver)\\\` — satrdan obyektga
- \\\`undefined\\\`, funksiya, Symbol — yo'qoladi; \\\`NaN/Infinity\\\` → \\\`null\\\`
- JSON kalitlari **faqat qo'shtirnq** bilan yoziladi
- parse har doim \\\`try/catch\\\` ichida — xato satr SyntaxError beradi
- localStorage va API'lar JSON orqali ishlaydi
`,

  exercises: [
    {
      id: 1,
      title: "JSON.stringify asoslari",
      instruction: "Berilgan obyektni JSON satriga aylantirib, qaytaring.",
      startingCode: "function toJson(obj) {\n  // kodni yozing\n}",
      hint: "JSON.stringify(obj) ishlating.",
      solution: "function toJson(obj) {\n  return JSON.stringify(obj);\n}",
      test: "const fn = new Function(code + '; return toJson;')();\nconst res = fn({ name: 'Ali', age: 25 });\nif (res !== '{\"name\":\"Ali\",\"age\":25}') throw new Error('Kutilgan: \\'{\"name\":\"Ali\",\"age\":25}\\' chiqishi kerak');"
    },
    {
      id: 2,
      title: "JSON.parse asoslari",
      instruction: "Berilgan JSON satrni obyektga aylantirib, qaytaring.",
      startingCode: "function fromJson(str) {\n  // kodni yozing\n}",
      hint: "JSON.parse(str) ishlating.",
      solution: "function fromJson(str) {\n  return JSON.parse(str);\n}",
      test: "const fn = new Function(code + '; return fromJson;')();\nconst res = fn('{\"city\":\"Toshkent\",\"pop\":2500000}');\nif (res.city !== 'Toshkent' || res.pop !== 2500000) throw new Error('city=\"Toshkent\" va pop=2500000 bo\\'lishi kerak');"
    },
    {
      id: 3,
      title: "Nested maydonni o'qish",
      instruction: "JSON satrni parse qilib, ichidagi 'user.address.city' qiymatini qaytaring.",
      startingCode: "function getCity(jsonStr) {\n  // kodni yozing\n}",
      hint: "Avval JSON.parse, keyin marror orqali kirish.",
      solution: "function getCity(jsonStr) {\n  const data = JSON.parse(jsonStr);\n  return data.user.address.city;\n}",
      test: "const fn = new Function(code + '; return getCity;')();\nconst res = fn('{\"user\":{\"address\":{\"city\":\"Buxoro\"}}}');\nif (res !== 'Buxoro') throw new Error(\"'Buxoro' qaytishi kerak\");"
    },
    {
      id: 4,
      title: "Massivni JSON ga aylantirish",
      instruction: "Sonlar massivini JSON satrga aylantirib qaytaring.",
      startingCode: "function arrayToJson(arr) {\n  // kodni yozing\n}",
      hint: "JSON.stringify massivlar bilan ham ishlaydi.",
      solution: "function arrayToJson(arr) {\n  return JSON.stringify(arr);\n}",
      test: "const fn = new Function(code + '; return arrayToJson;')();\nconst res = fn([1, 2, 3]);\nif (res !== '[1,2,3]') throw new Error(\"'[1,2,3]' qaytishi kerak\");"
    },
    {
      id: 5,
      title: "Chiroyli formatlash (indent)",
      instruction: "Obyektni 2 bo'sh joy indent bilan JSON satrga aylantiring.",
      startingCode: "function prettyJson(obj) {\n  // kodni yozing\n}",
      hint: "JSON.stringify uchinchi parametri indent.",
      solution: "function prettyJson(obj) {\n  return JSON.stringify(obj, null, 2);\n}",
      test: "const fn = new Function(code + '; return prettyJson;')();\nconst res = fn({ a: 1 });\nif (!res.includes('\\n  \"a\": 1')) throw new Error('2 ta bo\\'sh joy bilan formatlanishi kerak');"
    },
    {
      id: 6,
      title: "Replacer: parolni yashirish",
      instruction: "Obyektni JSON ga aylantiring, lekin 'password' maydoni natijada bo'lmasin.",
      startingCode: "function stringifySafe(obj) {\n  // kodni yozing\n}",
      hint: "JSON.stringify ning ikkinchi parametri — replacer funksiya.",
      solution: "function stringifySafe(obj) {\n  return JSON.stringify(obj, (key, value) => {\n    if (key === 'password') return undefined;\n    return value;\n  });\n}",
      test: "const fn = new Function(code + '; return stringifySafe;')();\nconst res = fn({ name: 'Ali', password: 'secret' });\nif (res.includes('secret') || res.includes('password')) throw new Error('Natijada password bo\\'lmasligi kerak');\nif (!res.includes('Ali')) throw new Error('name saqlanib qolishi kerak');"
    },
    {
      id: 7,
      title: "Xato JSON ni xavfsiz parse qilish",
      instruction: "funksiya noto'g'ri JSON berilsa null qaytarsin, to'g'ri bo'lsa parse natijasini.",
      startingCode: "function safeParse(str) {\n  // kodni yozing\n}",
      hint: "try...catch va JSON.parse ishlating.",
      solution: "function safeParse(str) {\n  try {\n    return JSON.parse(str);\n  } catch (e) {\n    return null;\n  }\n}",
      test: "const fn = new Function(code + '; return safeParse;')();\nif (fn('not json') !== null) throw new Error('Noto\\'g\\'ri JSON uchun null qaytishi kerak');\nconst ok = fn('{\"a\":1}');\nif (!ok || ok.a !== 1) throw new Error('To\\'g\\'ri JSON parse qilinishi kerak');"
    },
    {
      id: 8,
      title: "JSON bilan deep clone",
      instruction: "Obyektni to'liq (deep) nusxalash funksiyasini JSON orqali yozing.",
      startingCode: "function deepClone(obj) {\n  // kodni yozing\n}",
      hint: "JSON.parse(JSON.stringify(obj)) kombinatsiyasi.",
      solution: "function deepClone(obj) {\n  return JSON.parse(JSON.stringify(obj));\n}",
      test: "const fn = new Function(code + '; return deepClone;')();\nconst original = { a: 1, inner: { b: 2 } };\nconst copy = fn(original);\ncopy.inner.b = 99;\nif (original.inner.b !== 2) throw new Error('Deep clone bo\\'lishi kerak — asl o\\'zgarmasin');"
    },
    {
      id: 9,
      title: "undefined yo'qolishi",
      instruction: "Berilgan obyektni JSON ga aylantirib, natija satrning uzunligini qaytaring (undefined maydon yo'qolishini kuzating).",
      startingCode: "function lengthAfterStringify(obj) {\n  // kodni yozing\n}",
      hint: "JSON.stringify natijasining .length ini oling.",
      solution: "function lengthAfterStringify(obj) {\n  return JSON.stringify(obj).length;\n}",
      test: "const fn = new Function(code + '; return lengthAfterStringify;')();\nconst res1 = fn({ a: 1 });\nconst res2 = fn({ a: 1, b: undefined });\nif (res1 !== res2) throw new Error('undefined maydon JSON da yo\\'qoladi — uzunlik teng bo\\'lishi kerak');"
    },
    {
      id: 10,
      title: "Round-trip: saqlash va o'qish",
      instruction: "Obyektni JSON satrga aylantirib, qayta obyektga parse qilib, 'name' maydonini qaytaring (localStorage uslubi).",
      startingCode: "function roundTripName(obj) {\n  // 1) stringify qiling\n  // 2) parse qiling\n  // 3) name ni qaytaring\n}",
      hint: "JSON.parse(JSON.stringify(obj)).name",
      solution: "function roundTripName(obj) {\n  const str = JSON.stringify(obj);\n  const back = JSON.parse(str);\n  return back.name;\n}",
      test: "const fn = new Function(code + '; return roundTripName;')();\nconst res = fn({ name: 'Dilnoza', age: 30 });\nif (res !== 'Dilnoza') throw new Error(\"'Dilnoza' qaytishi kerak\");"
    }
  ],

  quizzes: [
    {
      question: "JSON ning to'liq nomi nima?",
      options: ["JavaScript Object Notation", "Java Standard Output Network", "JavaScript Data Format", "JSON Script Object Name"],
      correctAnswer: 0,
      explanation: "JSON = JavaScript Object Notation — ma'lumot almashish uchun matn formati."
    },
    {
      question: "JSON.stringify({ a: undefined, b: 5 }) natijasi nima?",
      options: ['{"a":null,"b":5}', '{"b":5}', '{"a":undefined,"b":5}', '{}'],
      correctAnswer: 1,
      explanation: "undefined qiymatli maydonlar JSON'da butunlay yo'qoladi (null ga ham aylanmaydi)."
    },
    {
      question: "JSON kalitlari qanday yozilishi shart?",
      options: ["Faqat qo'shtirnoq ichida", "Faqat bittalab qo'shtirnoq ichida", "Tirnoqsiz ham bo'laveradi", "Har qanday tarzda"],
      correctAnswer: 1,
      explanation: "JSON spetsifikatsiyasiga ko'ra kalitlar faqat qo'shtirnaq (\") ichida bo'lishi shart — JS obyektidan asosiy farqi."
    },
    {
      question: "JSON.parse('not valid json') nima qiladi?",
      options: ["null qaytaradi", "undefined qaytaradi", "SyntaxError tashlaydi", "Bo'sh obyekt qaytaradi"],
      correctAnswer: 2,
      explanation: "Noto'g'ri formatlangan satr SyntaxError tashlaydi — shuning uchun try/catch ishlatiladi."
    },
    {
      question: "JSON.stringify(new Date()) nima qiladi?",
      options: ["Date obyektini saqlaydi", "ISO formatdagi satrga aylantiradi", "undefined qaytaradi", "Xato tashlaydi"],
      correctAnswer: 1,
      explanation: "Date avtomatik ISO 8601 satrga aylanadi ('2024-01-15T...') — parse qilganda oddiy satr bo'lib qoladi!"
    },
    {
      question: "JSON.stringify uchinchi parametri nima uchun?",
      options: ["Xatolarni ushlash uchun", "Chiroyli formatlash (indent) uchun", "Maydonlarni filtrlash uchun", "Deep clone uchun"],
      correctAnswer: 1,
      explanation: "JSON.stringify(value, replacer, indent) — uchinchi parametr indent (masalan 2) natijani o'qiladigan qiladi."
    },
    {
      question: "Quyidagilardan qaysi biri JSON da saqlanmaydi?",
      options: ["null", "false", "function", "[]"],
      correctAnswer: 2,
      explanation: "Funksiyalar, undefined va Symbol'lar JSON'da saqlanmaydi — maydon butunlay yo'qoladi."
    },
    {
      question: "JSON.parse(JSON.stringify(obj)) nima qiladi?",
      options: ["Hech narsa", "Obyektni deep clone qiladi", "Satr uzunligini qaytaradi", "Xato tashlaydi (har doim)"],
      correctAnswer: 1,
      explanation: "Bu JSON orqali deep clone olishning mashhur usuli — cheklovlari bor (Date, funksiya, circular yo'qoladi)."
    },
    {
      question: "JSON.stringify({ x: NaN }) natijasi?",
      options: ['{"x":null}', '{"x":NaN}', '{"x":0}', '{}'],
      correctAnswer: 0,
      explanation: "NaN va Infinity JSON'da mavjud emas — null ga aylanadi."
    },
    {
      question: "localStorage ga obyektni saqlashning to'g'ri usuli?",
      options: [
        "localStorage.setItem('k', obj)",
        "localStorage.setItem('k', JSON.stringify(obj))",
        "localStorage.saveObject('k', obj)",
        "localStorage.setItem('k', obj.toString())"
      ],
      correctAnswer: 1,
      explanation: "localStorage faqat satr saqlaydi — obyekt avval JSON.stringify bilan satrga aylantiriladi."
    },
    {
      question: "API dan kelgan javobni parse qilishning zamonaviy usuli?",
      options: ["JSON.parse(response)", "response.json()", "response.text()", "stringify(response)"],
      correctAnswer: 1,
      explanation: "fetch() ning response.json() metodi avtomatik parse qiladi va Promise qaytaradi."
    },
    {
      question: "JSON ning asosiy afzalligi nima?",
      options: [
        "Faqat JavaScript da ishlaydi",
        "Har qanday tilda o'qiladigan, yengil, universal matn formati",
        "Funksiyalarni ham saqlaydi",
        "Binary ma'lumotlarni siqadi"
      ],
      correctAnswer: 1,
      explanation: " JSON til-mustaqil — server (Python, Java...) va klient bir xil formatda muloqot qiladi."
    }
  ]
};

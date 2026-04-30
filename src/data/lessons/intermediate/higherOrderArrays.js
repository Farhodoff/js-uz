export const higherOrderArrays = {
  id: "i6",
  title: "Massiv metodlari (map, filter, reduce)",
  theory: `## Massivlar bilan ishlash (map, filter, reduce)

JavaScriptda massivlar bilan ishlashda eng kuchli va tez-tez ishlatiladigan metodlar – \`map()\`, \`filter()\` va \`reduce()\`. Ular original massivni o‘zgartirmaydi, balki yangi massiv yoki qiymat qaytaradi.

---

### 1. map() – O‘zgartirish (Transform)
\`map()\` – massivning har bir elementini funksiya orqali o‘tkazib, **yangi massiv** yaratadi.
\`\`\`javascript
let numbers = [1, 2, 3, 4];
let doubled = numbers.map(num => num * 2); // [2, 4, 6, 8]
\`\`\`

### 2. filter() – Saralash (Filtr)
\`filter()\` – berilgan shartga mos keladigan elementlardan iborat **yangi massiv** yaratadi.
\`\`\`javascript
let numbers = [1, 2, 3, 4, 5, 6];
let evens = numbers.filter(num => num % 2 === 0); // [2, 4, 6]
\`\`\`

### 3. reduce() – Jamlash (Accumulate)
\`reduce()\` – massiv elementlarini **bir qiymatga** jamlaydi (yig‘indi, obyekt va h.k.).
\`\`\`javascript
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((acc, curr) => acc + curr, 0); // 10
\`\`\`

---

## Metodlarni taqqoslash

| Metod | Maqsad | Qaytaradi | Uzunlik |
|-------|--------|-----------|---------|
| **map** | Elementni o‘zgartirish | Yangi massiv | Asl massiv bilan bir xil |
| **filter** | Shart bo'yicha saralash | Yangi massiv | <= asl massiv |
| **reduce** | Bitta qiymatga jamlash | Istalgan tur | 1 ta qiymat |

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **map() va forEach() farqi nima?**
2. **filter() qanday ishlaydi?**
3. **reduce() dagi initialValue nima uchun kerak?**

### Middle daraja
4. **map() ichida asinxron (async/await) ishlash mumkinmi?**
5. **reduce() yordamida massivni guruhlash (group by) qanday qilinadi?**
6. **Chaining (zanjirlash) nima va u qanday ishlaydi?**`,
  task: `// 1. map() yordamida massivdagi sonlarni 10 ga ko'paytiring: [1, 2, 3] -> [10, 20, 30].
// 2. filter() yordamida faqat 18 yoshdan kattalarni ajrating: [{name: "Ali", age: 17}, {name: "Vali", age: 20}].
// 3. reduce() yordamida massivdagi barcha sonlar yig'indisini toping.
// 4. Chaining: Berilgan massivdan [1, 2, 3, 4, 5, 6] faqat juftlarini olib, ularni kvadratga ko'taring va yig'indisini hisoblang.
// 5. reduce() yordamida massivdagi elementlar sonini hisoblang: ["a", "b", "a"] -> {a: 2, b: 1}.

// Kodingizni shu yerga yozing`,
  hint: `// 1. map
let m = [1, 2].map(x => x * 10);

// 2. filter
let users = [{age: 17}, {age: 20}];
let adults = users.filter(u => u.age > 18);

// 3. reduce sum
let sum = [1, 2, 3].reduce((a, b) => a + b, 0);

// 4. Chaining
let res = [1, 2, 3, 4, 5, 6]
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .reduce((a, b) => a + b, 0);

// 5. Counting
let items = ["a", "b", "a"];
let counts = items.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});`
};

export const destructuring = {
  id: "m1",
  title: "Destructuring (Ochish/Ajratish)",
  theory: `## 1. DESTRUCTURING NIMA?
Destructuring — bu massiv yoki obyekt ichidagi ma'lumotlarni qisqaroq va osonroq usulda o'zgaruvchilarga ajratib olish imkonini beruvchi sintaksis.

### Nega kerak?
Eski usulda biz har bir xususiyatni alohida o'zgaruvchiga tenglab chiqishimiz kerak edi. Destructuring bilan bu bir qatorda bajariladi.

---

## 2. OBYEKT DESTRUCTURING
Obyektlarda kalit so'zlar orqali ajratib olinadi.

\`\`\`javascript
const user = { name: "Ali", age: 25 };

// Eski usul
// const name = user.name;
// const age = user.age;

// Yangi usul (Destructuring)
const { name, age } = user;
\`\`\`

---

## 3. MASSIV DESTRUCTURING
Massivlarda tartib (indeks) muhim ahamiyatga ega.

\`\`\`javascript
const ranglar = ["qizil", "yashil", "ko'k"];

const [bir, ikki] = ranglar;
console.log(bir); // "qizil"
console.log(ikki); // "yashil"
\`\`\`

\`\`\`mermaid
graph LR
    A[Obyekt/Massiv] --> B[Destructuring]
    B --> C[O'zgaruvchi 1]
    B --> D[O'zgaruvchi 2]
    style B fill:#f9f,stroke:#333,stroke-width:2px
\`\`\`

---

## 4. DEFAULT QIYMATLAR VA NOMNI O'ZGARTIRISH
Agar obyektda biz kutgan kalit bo'lmasa, default qiymat berishimiz mumkin:

\`\`\`javascript
const { job = "Ishsiz" } = user;

// Nomni o'zgartirish
const { name: ism } = user;
console.log(ism); // "Ali"
\`\`\`

---

## 5. INTERVYU SAVOLLARI (Middle)

1. **Destructuring qachon undefined qaytaradi?**
   *Javob:* Agar obyektda o'sha kalit bo'lmasa va default qiymat berilmagan bo'lsa.

2. **Massiv destructuringda elementlarni qanday tashlab ketish mumkin?**
   *Javob:* Vergullar orqali: \`const [, , uchinchi] = [1, 2, 3];\`.

3. **Spread operator bilan destructuring qanday farq qiladi?**
   *Javob:* Destructuring qismlarga bo'ladi, Spread esa hamma qismlarni yig'adi yoki yoyadi.`,
  exercises: [
    {
      id: 1,
      title: "Obyektni ochish",
      instruction: "Berilgan 'car' obyektidan 'model' va 'year' ni destructuring orqali ajrating.",
      startingCode: "const car = { model: 'Tesla', year: 2023, color: 'white' };\n// Bu yerga yozing\n\nconsole.log(model, year);",
      hint: "const { model, year } = car;",
      test: "if (logs.includes('Tesla') && logs.includes('2023')) return null; return 'Tesla va 2023 chiqishi kerak';"
    },
    {
      id: 2,
      title: "Massivni ochish",
      instruction: "Massivdan ikkinchi elementni 'second' o'zgaruvchisiga oling.",
      startingCode: "const fruits = ['Apple', 'Banana', 'Orange'];\n// Bu yerda oling\n\nconsole.log(second);",
      hint: "const [, second] = fruits;",
      test: "if (logs.includes('Banana')) return null; return 'Banana chiqishi kerak';"
    }
  ]
};

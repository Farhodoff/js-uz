export const curriculum = {
  beginner: {
    label: "Boshlang'ich", color: "#c8a96e", icon: "🟢",
    lessons: [
      {
        id: "b1", title: "O'zgaruvchilar",
        theory: `## O'zgaruvchilar nima?
JavaScript'da ma'lumotlarni saqlash uchun o'zgaruvchilar ishlatiladi.

**3 xil e'lon qilish usuli:**
- \`var\` — eski usul (hozir kamdan-kam ishlatiladi)
- \`let\` — qiymatini o'zgartirish mumkin
- \`const\` — qiymati o'zgarmas (constant)

**Qoidalar:**
- Harfdan yoki \`_\` dan boshlanadi
- Bo'sh joy bo'lmaydi
- camelCase uslubi tavsiya etiladi`,
        task: "// 1-topshiriq: Ismingizni 'name' o'zgaruvchisiga yozing\n// Yoshingizni 'age' o'zgaruvchisiga yozing\n// Ikkalasini console.log() bilan chiqaring\n\nlet name = '';\nlet age = 0;\nconsole.log(name, age);",
        hint: "let name = 'Ali'; let age = 20; console.log(name, age);"
      },
      {
        id: "b2", title: "Funksiyalar",
        theory: `## Funksiyalar

Funksiya — bir necha marta ishlatiladigan kod bloki.

**E'lon qilish:**
\`\`\`js
function salom(ism) {
  return "Salom, " + ism + "!";
}
\`\`\`

**Chaqirish:**
\`\`\`js
salom("Ali"); // "Salom, Ali!"
\`\`\`

**Arrow function (ES6):**
\`\`\`js
const salom = (ism) => "Salom, " + ism + "!";
\`\`\``,
        task: "// 2-topshiriq: Ikki sonni qo'shadigan funksiya yozing\n// Natijani console.log() bilan chiqaring\n\nfunction qoshish(a, b) {\n  // shu yerga yozing\n}\n\nconsole.log(qoshish(5, 3));",
        hint: "function qoshish(a, b) { return a + b; } console.log(qoshish(5, 3));"
      },
      {
        id: "b3", title: "Massivlar",
        theory: `## Massivlar (Arrays)

Massiv — bir necha qiymatni saqlash uchun.

\`\`\`js
let mevalar = ["olma", "nok", "banan"];
\`\`\`

**Asosiy metodlar:**
- \`push()\` — oxiriga qo'shish
- \`pop()\` — oxiridan o'chirish
- \`length\` — uzunlik
- \`indexOf()\` — indeksini topish
- \`map()\`, \`filter()\`, \`forEach()\``,
        task: "// 3-topshiriq: 5 ta shahar nomini massivga saqlang\n// map() yordamida har birini katta harfga o'tkazing\n\nlet shaharlar = [];\n\nconsole.log(shaharlar.map(s => s.toUpperCase()));",
        hint: "let shaharlar = ['Toshkent','Samarqand','Buxoro','Namangan','Andijon']; console.log(shaharlar.map(s => s.toUpperCase()));"
      }
    ]
  },
  intermediate: {
    label: "O'rta daraja", color: "#e5b84f", icon: "🟡",
    lessons: [
      {
        id: "m1", title: "Destructuring",
        theory: `## Destructuring

Ob'ekt yoki massivdan qiymatlarni ajratib olish.

**Ob'ekt destructuring:**
\`\`\`js
const user = { ism: "Ali", yosh: 25 };
const { ism, yosh } = user;
\`\`\`

**Massiv destructuring:**
\`\`\`js
const [birinchi, ikkinchi] = [10, 20];
\`\`\`

**Default qiymat:**
\`\`\`js
const { ism = "Noma'lum" } = {};
\`\`\``,
        task: "// Topshiriq: Quyidagi ob'ektdan destructuring yordamida\n// 'nomi' va 'narxi' ni ajratib chiqaring\n\nconst mahsulot = { nomi: 'Telefon', narxi: 5000000, brend: 'Samsung' };\n\n// destructuring qiling\nconst { } = mahsulot;\nconsole.log(nomi, narxi);",
        hint: "const { nomi, narxi } = mahsulot; console.log(nomi, narxi);"
      },
      {
        id: "m2", title: "Spread & Rest",
        theory: `## Spread va Rest operatori (\`...\`)

**Spread** — elementlarni yoyish:
\`\`\`js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]
\`\`\`

**Ob'ektda:**
\`\`\`js
const yangi = { ...eski, yosh: 30 };
\`\`\`

**Rest** — qolgan argumentlar:
\`\`\`js
function yig(a, b, ...qolgan) {
  return qolgan;
}
\`\`\``,
        task: "// Topshiriq: Spread yordamida 2 massivni birlashtiring\n\nconst sabzavotlar = ['pomidor', 'bodring'];\nconst mevalar = ['olma', 'banan'];\n\n// birlashtirilgan massiv yarating\nconst hammasi = [];\nconsole.log(hammasi);",
        hint: "const hammasi = [...sabzavotlar, ...mevalar]; console.log(hammasi);"
      }
    ]
  },
  advanced: {
    label: "Advanced", color: "#e07b5a", icon: "🔴",
    lessons: [
      {
        id: "a1", title: "Promises",
        theory: `## Promise nima?

Asinxron operatsiyalar natijasini ifodalaydi.

**Holatlari:**
- \`pending\` — kutilmoqda
- \`fulfilled\` — muvaffaqiyatli
- \`rejected\` — xatolik

\`\`\`js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Tayyor!"), 1000);
});

p.then(natija => console.log(natija))
 .catch(err => console.error(err));
\`\`\``,
        task: "// Topshiriq: 2 soniyadan keyin 'Salom dunyo!' qaytaradigan\n// Promise yarating va .then() bilan chiqaring\n\nconst mening_promise = new Promise((resolve, reject) => {\n  // setTimeout yozing\n});\n\nmening_promise.then(natija => console.log(natija));",
        hint: "const mening_promise = new Promise((resolve) => { setTimeout(() => resolve('Salom dunyo!'), 2000); }); mening_promise.then(n => console.log(n));"
      },
      {
        id: "a2", title: "Async/Await",
        theory: `## Async/Await

Promise'larni yanada qulay yozish usuli.

\`\`\`js
async function malumotOl() {
  try {
    const javob = await fetch('https://api.example.com');
    const data = await javob.json();
    return data;
  } catch (xato) {
    console.error(xato);
  }
}
\`\`\`

**Qoidalar:**
- \`async\` funksiya doim Promise qaytaradi
- \`await\` faqat \`async\` ichida ishlatiladi`,
        task: "// Topshiriq: async funksiya yozing\n// 1 soniya kutib, 'Bajarildi!' qaytarsin\n\nasync function kutish() {\n  // shu yerga yozing\n}\n\nkutish().then(console.log);",
        hint: "async function kutish() { await new Promise(r => setTimeout(r, 1000)); return 'Bajarildi!'; } kutish().then(console.log);"
      }
    ]
  },
  projects: {
    label: "Loyihalar", color: "#7a9e7e", icon: "🏗️",
    lessons: [
      {
        id: "p1", title: "Todo List",
        theory: `## Todo List Loyihasi

Bu loyihada quyidagilarni o'rganamiz:
- DOM manipulyatsiya
- Event listeners
- Array metodlari
- localStorage

**Loyiha tuzilmasi:**
1. Vazifalar ro'yxatini saqlash
2. Qo'shish / o'chirish funksiyalari
3. Bajarilgan/bajarilmagan holat
4. LocalStorage'ga saqlash`,
        task: "// Mini Todo: Vazifalar massiviga qo'shish va o'chirish\n\nlet vazifalar = ['Dars o\\'qish', 'Kod yozish'];\n\nfunction qoshish(yangi_vazifa) {\n  // yozing\n}\n\nfunction ochirish(index) {\n  // yozing\n}\n\nqoshish('Sport qilish');\nochirish(0);\nconsole.log(vazifalar);",
        hint: "function qoshish(v) { vazifalar.push(v); } function ochirish(i) { vazifalar.splice(i, 1); }"
      }
    ]
  }
};

export const SECTIONS = ["beginner", "intermediate", "advanced", "projects"];

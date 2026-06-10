export const optionalChaining = {
  id: "optionalChaining",
  title: "Optional Chaining & Nullish Coalescing",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Optional Chaining (\`?.\`) va Nullish Coalescing (\`??\`) nima?
* **Optional Chaining (\`?.\`)** — bu obyekt ichidagi chuqur joylashgan xususiyatlarga yoki metodlarga xavfsiz tarzda murojaat qilish imkonini beruvchi operatordir. Agar zanjirning biror qismi \`null\` yoki \`undefined\` bo'lsa, u xatolik bermasdan murojaatni to'xtatadi va \`undefined\` qaytaradi.
* **Nullish Coalescing (\`??\`)** — bu faqatgina qiymat \`null\` yoki \`undefined\` bo'lgan holda zaxira (default) qiymatni o'rnatish imkonini beruvchi mantiqiy operatordir.

### Real hayotiy analogiya
* **Optional Chaining (Zanjir tekshiruvi):** Tasavvur qiling, siz qulflangan uylardan iborat ketma-ketlikdan kalit topmoqchisiz. Birinchi uyga borasiz, agar u ochiq bo'lsa (\`?.\`), keyingi xonaga o'tasiz. Agar uy yo'q bo'lsa yoki yopiq bo'lsa, zaxira kalitni buzib o'tirmaysiz, tinchgina uydan qaytasiz.
* **Nullish Coalescing (Zaxira g'ildirak):** Mashinangizda "zaxira g'ildirak" (spare tire) bor. Agar asosiy g'ildirak mutlaqo yo'q bo'lsa (\`null\` yoki \`undefined\`), siz zaxira g'ildirakni o'rnatasiz. Lekin g'ildirak joyida bo'lsa, ammo uning havosi oz bo'lsa ham (masalan, \`0\` yoki \`""\`), baribir o'sha g'ildirakni ishlataverasiz (ya'ni \`??\` ularni o'chirib yubormaydi).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Optional Chaining)
\`\`\`javascript
const user = { name: "Ali" };

// Eski usul: const city = user.address && user.address.city;
const city = user.address?.city; 

console.log(city); // undefined (TypeError xatoligi kelib chiqmaydi!)
\`\`\`

### 2. Intermediate Example (Nullish Coalescing \`??\` va \`||\` farqi)
\`\`\`javascript
let score = 0;

// || operatori 0 ni falsy deb hisoblab 10 ga almashtirib yuboradi:
const score1 = score || 10; // 10

// ?? operatori 0 ni saqlab qoladi, chunki u null/undefined emas:
const score2 = score ?? 10; // 0
\`\`\`

### 3. Advanced Example (Massiv elementlari va Metodlarni xavfsiz chaqirish)
\`\`\`javascript
const response = {
  users: [
    { name: "Ali", getDetails: () => "Tafsilotlar" }
  ]
};

// Massiv indeksiga va metodga xavfsiz murojaat:
const details = response.users?.[0]?.getDetails?.();
console.log(details); // "Tafsilotlar"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Short-Circuit Evaluation (Qisqa tutashuvli hisoblash)
* \`?.\` operatori o'zidan chap tomondagi qiymatni tekshiradi. Agar chap tomon \`null\` yoki \`undefined\` bo'lsa, operator o'ng tomondagi ifodani umuman hisoblab o'tirmaydi va zudlik bilan \`undefined\` qaytaradi.
* \`??\` operatori chap tomondagi qiymat **nullish** (faqat \`null\` yoki \`undefined\`) ekanligini tekshiradi. Agar shunday bo'lsa, o'ng tarafdagi qiymatni qaytaradi.

> [!IMPORTANT]
> Optional chaining faqat qiymatlarni **o'qish** uchun mo'ljallangan. \`user?.name = "Vali"\` ko'rinishida chap tomonda turib qiymat qabul qila olmaydi (SyntaxError beradi).

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### API xatoliklaridan himoyalanish
Keling, serverdan kelishi kutilgan, lekin kelmagan murakkab ma'lumotlar strukturasidan xavfsiz qiymat olamiz.

\`\`\`javascript
const apiResponse = {
  status: 200,
  data: {
    profile: null // profil kiritilmagan
  }
};

// Zanjirli optional chaining va nullish coalescing birgalikda:
const userCity = apiResponse.data?.profile?.address?.city ?? "Noma'lum shahar";

console.log(userCity); // "Noma'lum shahar"
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Assignment (Qiymat o'zlashtirish) da ishlatish
* **Noto'g'ri:**
  \`\`\`javascript
  user?.name = "Ali"; // SyntaxError!
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  if (user) {
    user.name = "Ali";
  }
  \`\`\`

### 2. E'lon qilinmagan o'zgaruvchilarga murojaat
Optional chaining faqat e'lon qilingan, ammo qiymati \`null/undefined\` bo'lgan o'zgaruvchilarni himoya qiladi.
* **Noto'g'ri:**
  \`\`\`javascript
  // undefinedVariable e'lon qilinmagan bo'lsa:
  console.log(undefinedVariable?.name); // ReferenceError!
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Operator / Sintaksis | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`obj?.prop\` | Obyekt kalitini xavfsiz o'qish | \`user?.address\` |
| \`obj?.[key]\` | Dinamik kalitni xavfsiz o'qish | \`user?.[dynamicKey]\` |
| \`arr?.[0]\` | Massiv elementini xavfsiz o'qish | \`list?.[0]\` |
| \`fn?.()\` | Funksiyani xavfsiz chaqirish | \`callback?.()\` |
| \`a ?? b\` | Faqat \`null/undefined\` bo'lsa default berish | \`score ?? 100\` |

---

## 7. ❓ Savollar va Javoblar

### 1. \`??\` operatori va \`||\` (OR) operatorining asosiy farqi nimada?
\`||\` barcha falsy qiymatlarni (\`0\`, \`""\`, \`false\`, \`null\`, \`undefined\`) default qiymatga o'zgartiradi. \`??\` esa faqat va faqat \`null\` yoki \`undefined\` qiymatlarni o'zgartiradi.

### 2. Massiv va funksiyalar bilan optional chaining qanday qo'llaniladi?
Massiv uchun \`?.[index]\` shaklida, funksiyani chaqirish uchun esa \`funksiyaNom?.()\` shaklida ishlatiladi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qachon \`||\` o'rniga \`??\` ishlatish tavsiya etiladi?
2. \`?.\` ishlatilganda ham dasturda \`ReferenceError\` yuz berishi mumkinmi?
3. Obyekt ichidagi funksiya borligini tekshirish uchun qaysi sintaksis to'g'ri?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va topshiriqlarni bajarib, optional chaining operatorlaridan foydalanish ko'nikmalaringizni sinab ko'ring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Xavfsiz Funksiya Chaqiruvi",
    "instruction": "'obj' obyekti ichida 'sayHello' nomli funksiya borligini optional chaining (?.) orqali xavfsiz tekshirib, keyin chaqiring.",
    "startingCode": "const obj = {};\n\n// Kodni shu yerda yozing\n",
    "hint": "obj.sayHello?.();",
    "test": "if (!code.includes('?.(')) return 'Optional chaining orqali funksiya chaqiruvi (?.()) ishlatilmadi';\nconst sandbox = new Function('obj', code);\nconst mockObj = { sayHello: () => {} };\nsandbox(mockObj);\nsandbox({}); // Should not crash\nreturn null;"
  },
  {
    "id": 2,
    "title": "Zanjirli Xavfsiz Murojaat",
    "instruction": "'user' obyektidan 'user.profile.address.zipcode' qiymatini xavfsiz oling va uni 'zipcode' o'zgaruvchisiga saqlang.",
    "startingCode": "const user = { profile: { address: null } };\n\n// Kodni shu yerda yozing\n",
    "hint": "const zipcode = user.profile?.address?.zipcode;",
    "test": "if (!code.includes('?.') || !code.includes('zipcode')) return 'Optional chaining orqali zipcode o\\'zlashtirilmadi';\nconst sandbox = new Function('user', code + '; return zipcode;');\nconst res1 = sandbox({ profile: { address: null } });\nconst res2 = sandbox({ profile: { address: { zipcode: 12345 } } });\nif (res1 === undefined && res2 === 12345) return null;\nreturn 'Natija noto\\'g\\'ri';"
  },
  {
    "id": 3,
    "title": "Nullish Coalescing bilan Default Qiymat",
    "instruction": "'user' obyektidagi 'age' qiymatini xavfsiz oling, agar u null yoki undefined bo'lsa, 'age' o'zgaruvchisiga 18 qiymatini default qilib o'rnating. (0 yoki false qiymatlar o'zgarmasligi kerak).",
    "startingCode": "const user = { age: 0 };\n\n// Kodni shu yerda yozing\n",
    "hint": "const age = user.age ?? 18;",
    "test": "if (!code.includes('??')) return 'Nullish coalescing (??) operatori ishlatilmadi';\nconst sandbox = new Function('user', code + '; return age;');\nconst res1 = sandbox({ age: 0 });\nconst res2 = sandbox({ age: null });\nif (res1 === 0 && res2 === 18) return null;\nreturn 'Kutilgan qiymat hosil bo\\'lmadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Optional Chaining (`?.`) operatorining asosiy vazifasi nima?",
    "options": [
      "Obyekt ichidagi xususiyat mavjud bo'lmasa, `Cannot read property of undefined` kabi xatolik berib dasturni to'xtatish",
      "Obyekt ichidagi chuqur joylashgan xususiyatlar yoki metodlarga murojaat qilganda, agar ular mavjud bo'lmasa xato bermasdan `undefined` qiymatini qaytarish",
      "Obyektni avtomatik ravishda JSON formatiga o'tkazish",
      "Massiv elementlarini saralash"
    ],
    "correctAnswer": 1,
    "explanation": "Optional chaining zanjirdagi null yoki undefined bo'lgan har qanday qismga duch kelganda murojaatni xavfsiz to'xtatib, TypeError xatosi o'rniga `undefined` qaytarish orqali dasturimiz crash bo'lishini oldini oladi."
  },
  {
    "id": 2,
    "question": "Nullish Coalescing (`??`) operatori `||` (OR) operatoridan qanday farq qiladi?",
    "options": [
      "`??` operatori `0`, `false` va `\"\"` (bo'sh matn) kabi Falsy qiymatlarni inobatga olmaydi va faqat `null` yoki `undefined` bo'lgandagina o'ng tarafdagi default qiymatni qaytaradi",
      "`||` operatori faqat raqamlar bilan ishlaydi, `??` esa matnlar bilan",
      "`??` operatori asinxron tarzda ishlaydi",
      "Ular o'rtasida hech qanday farq yo'q"
    ],
    "correctAnswer": 0,
    "explanation": "`||` operatori barcha \"falsy\" qiymatlarni (jumladan `0`, `false`, `\"\"`) yomon qiymat deb biladi va default qiymatga o'zgartiradi. `??` (Nullish) esa faqat `null` va `undefined` qiymatlari uchun default qiymatni faollashtiradi."
  },
  {
    "id": 3,
    "question": "Quyidagi kod e'lon qilingandan so'ng `age` o'zgaruvchisining qiymati nima bo'ladi?\n```javascript\nconst user = { name: 'Ali', age: 0 };\nconst age = user.age ?? 18;\n```",
    "options": [
      "`18`",
      "`0`",
      "`undefined`",
      "`null`"
    ],
    "correctAnswer": 1,
    "explanation": "`user.age` qiymati `0` ga teng. `0` falsy qiymat bo'lsa ham, u null yoki undefined emas. Shuning uchun `??` operatori default qiymat `18` ni emas, o'sha `0` ni o'zini qoldiradi."
  },
  {
    "id": 4,
    "question": "Optional Chaining operatoridan foydalanib, massiv elementiga (`arr[5]`) yoki obyekt metodiga (`obj.sayHello()`) qanday xavfsiz murojaat qilish mumkin?",
    "options": [
      "`arr?.[5]` va `obj.sayHello?.()`",
      "`arr?[5]` va `obj.sayHello?()`",
      "`arr.?[5]` va `obj.?sayHello()`",
      "Massiv va metodlar bilan `?.` operatorini ishlatib bo'lmaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Massiv elementlariga xavfsiz murojaat qilish uchun `?.[index]` sintaksisi, metodlarni chaqirish uchun esa `method?.()` sintaksisi qo'llaniladi."
  },
  {
    "id": 5,
    "question": "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nconst data = null;\nconsole.log(data?.user?.name ?? 'Guest');\n```",
    "options": [
      "TypeError xatoligi beradi",
      "`\"Guest\"`",
      "`undefined`",
      "`null`"
    ],
    "correctAnswer": 1,
    "explanation": "`data` o'zgaruvchisi `null` bo'lganligi sababli, `data?.user?.name` zanjiri xavfsiz tarzda to'xtab `undefined` qaytaradi. So'ngra `undefined ?? 'Guest'` ifodasi ishga tushib, natijada `'Guest'` qaytadi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst price = 0;\nconsole.log(price ?? 100);\n```",
    "options": [
      "`0`",
      "`100`",
      "`undefined`",
      "`TypeError`"
    ],
    "correctAnswer": 0,
    "explanation": "`??` operatori faqatgina null yoki undefined bo'lganda default qiymatga o'tadi. 0 esa falsy bo'lsa ham null/undefined emas, shuning uchun 0 chiqadi."
  },
  {
    "id": 7,
    "question": "Optional chaining `?.` ishlatilganda ham xato (Error) berishi mumkin bo'lgan holat qaysi?",
    "options": [
      "Obyektning o'zi e'lon qilinmagan (not defined) bo'lsa",
      "Obyekt ichidagi xususiyat null bo'lsa",
      "Obyekt ichidagi xususiyat undefined bo'lsa",
      "Hech qanday holatda xato bermaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Agar o'zgaruvchining o'zi e'lon qilinmagan (scope da mavjud bo'lmasa), unga ?. orqali murojaat qilish `ReferenceError` beradi. ?. faqat e'lon qilingan o'zgaruvchi null/undefined bo'lganda ishlaydi."
  },
  {
    "id": 8,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst user = { getName() { return 'Ali'; } };\nconsole.log(user.getName?.());\n```",
    "options": [
      "`\"Ali\"`",
      "`undefined`",
      "`TypeError`",
      "`null`"
    ],
    "correctAnswer": 0,
    "explanation": "`getName` metodi mavjud bo'lgani uchun, `?.()` uni xavfsiz tarzda chaqiradi va uning natijasi `'Ali'` chop etiladi."
  },
  {
    "id": 9,
    "question": "Quyidagi kodda `y` qiymati qanday bo'ladi?\n```javascript\nlet x = null;\nlet y = x ?? 'A';\n```",
    "options": [
      "`\"A\"`",
      "`null`",
      "`undefined`",
      "`TypeError`"
    ],
    "correctAnswer": 0,
    "explanation": "`x` o'zgaruvchisi `null` bo'lganligi sababli, `??` operatori o'ng tomondagi `'A'` default qiymatini oladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod haqida qaysi fikr to'g'ri?\n```javascript\nconst value = obj?.address?.zipCode;\n```",
    "options": [
      "Agar obj null/undefined bo'lsa, xato bermasdan undefined qaytaradi",
      "Ha, address mavjud bo'lsa ham doim TypeError beradi",
      "Faqat bitta ?. operatoridan foydalanish shart",
      "Dastur har doim crash bo'ladi"
    ],
    "correctAnswer": 0,
    "explanation": "Bu mutlaqo to'g'ri va xavfsiz yozilgan kod. Zanjirning istalgan qismi (obj yoki address) null/undefined bo'lsaxato bermay undefined qaytaradi."
  },
  {
    "id": 11,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst data = { scores: [100, 200] };\nconsole.log(data.scores?.[0]);\n```",
    "options": [
      "`100`",
      "`undefined`",
      "`TypeError`",
      "`[100, 200]`"
    ],
    "correctAnswer": 0,
    "explanation": "`data.scores` massivi mavjud bo'lgani sababli, uning 0-indeksidagi element ya'ni `100` chiqadi."
  },
  {
    "id": 12,
    "question": "Quyidagi ifodalarning natijalari qanday?\n```javascript\nconst name = '';\nconst displayName = name || 'Mehmon';\nconst displayName2 = name ?? 'Mehmon';\n```",
    "options": [
      "`displayName = 'Mehmon', displayName2 = ''`",
      "`displayName = '', displayName2 = 'Mehmon'`",
      "`displayName = 'Mehmon', displayName2 = 'Mehmon'`",
      "`displayName = '', displayName2 = ''`"
    ],
    "correctAnswer": 0,
    "explanation": "`||` operatori bo'sh string `''` ni falsy deb topib 'Mehmon'ga almashtiradi. `??` esa bo'sh stringni qoldiradi, chunki u null yoki undefined emas."
  }
]

};

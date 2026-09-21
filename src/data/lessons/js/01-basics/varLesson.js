export const varLesson = {
  id: "varLesson",
  title: "var: Nima uchun eskirgan?",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz yangi uy quryapsiz:
- Eski uyda shunday quti bo'lgan: siz uning ichiga narsa solib qo'yasiz, lekin xonaga kirgan har qanday odam ogohlantirishsiz xuddi shu nomdagi yangi quti ochib, sizning narsangizni yashirincha o'chirib yubora oladi. Hech qanday signal chalinmaydi.
- Zamonaviy \`let\` va \`const\` esa qo'riqchiga o'xshaydi: agar xuddi shu nomli quti allaqachon bo'lsa, "Bu nom band!" deb signal chaladi (\`SyntaxError\`).

\`var\` (variable — o'zgaruvchi) — JavaScript'da o'zgaruvchi yaratishning eski (tarixiy) usuli bo'lib, bugungi kunda undan foydalanish tavsiya etilmaydi.

---

## 2. Nega kerak?

Yangi kod yozish uchun \`var\` kerak emas. Ammo internetdagi eski maqolalarda yoki katta loyihalarda eski kodlarni uchratishingiz mumkin.

Ularni ko'rganda adashib qolmaslik va nega zamonaviy dasturchilar faqat \`let\` hamda \`const\` ishlatishini tushunish uchun \`var\` ning kamchiligini bilish muhimdir.

---

## 3. Birinchi misol

Bu kod \`var\` yordamida bir xil nomli o'zgaruvchini ikki marta e'lon qiladi.

\`\`\`javascript
var score = 100; // score yaratildi
var score = 200; // Xatolik bermasdan yana yaratildi!
console.log(score); // Ekranga 200 chiqadi
\`\`\`

\`\`\`text
// Natija: 200
\`\`\`

---

## 4. Qator-baqator tahlil

- \`var score = 100;\` — \`score\` nomli o'zgaruvchi e'lon qilindi va unga 100 qiymati berildi.
- \`var score = 200;\` — \`score\` nomi bilan yana bir marta o'zgaruvchi e'lon qilindi. \`var\` hech qanday xatolik bermasdan 100 ni o'chirib yubordi! (Agar bu yerda \`let\` bo'lganida, dastur darhol xato berib to'xtar edi).
- \`console.log(score);\` — konsolga oxirgi 200 qiymati chiqdi.

---

## 5. Qadamma-qadam (trace)

| Qadam | Kod qatori | \`score\` holati | Tushuntirish |
| :--- | :--- | :--- | :--- |
| 1 | \`var score = 100;\` | \`100\` | O'zgaruvchi yaratildi va unga 100 solindi |
| 2 | \`var score = 200;\` | \`200\` | Qayta e'lon qilindi! Xatosiz eski qiymat yo'qotildi |
| 3 | \`console.log(score);\` | \`200\` | Konsolga 200 chiqdi |

---

## 6. Yana bitta misol

Bu kod zamonaviy \`let\` bunday xatodan bizni qanday himoya qilishini ko'rsatadi.

\`\`\`javascript
let count = 10; // count yaratildi
// let count = 20; // Agar shunday yozilsa, SyntaxError beradi!
console.log(count);
\`\`\`

\`\`\`text
// Natija: 10
\`\`\`

\`let\` bizni tasodifan bir xil nom berib qo'yishdan himoya qiladi, \`var\` esa bunday himoyaga ega emas.

---

## 7. Ko'p uchraydigan xatolar

### 1. Yangi kodlarda var ishlatish
❌ Xato odat:
\`\`\`javascript
var age = 20;
\`\`\`
Nima bo'ladi: Kod ishlaydi, lekin professional jamoalarda qabul qilinmaydi va xavfli hisoblanadi.
✅ To'g'ri variant:
\`\`\`javascript
let age = 20;
\`\`\`

### 2. var xatolik beradi deb o'ylash
❌ Xato tushuncha:
\`\`\`javascript
var name = "Ali";
var name = "Vali";
\`\`\`
Nima bo'ladi: Ko'pchilik bu yerda xatolik chiqadi deb o'ylaydi, ammo \`var\` jimjitlik bilan \`"Vali"\` ni qabul qiladi. Bu esa keyinchalik topish juda qiyin bo'lgan yashirin xatolarga (bug) olib keladi.
✅ To'g'ri variant:
\`\`\`javascript
let name = "Ali";
name = "Vali"; // let qayta yozilmaydi
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
Quyidagi \`var city = "Samarqand";\` kodini zamonaviy \`let\` kalit so'ziga almashtiring va konsolga chiqaring.

### 2-mashq (O'rtacha)
Quyidagi kod natijasi nima bo'ladi?
\`\`\`javascript
var price = 500;
var price = 700;
console.log(price);
\`\`\`

### 3-mashq (Xatoni topish)
Quyidagi \`var\` li kodni \`let\` ga o'tkazing va qiymatni to'g'ri yangilang (qayta \`let\` yozilmasin):
\`\`\`javascript
var score = 50;
var score = 60;
console.log(score);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let city = "Samarqand";
console.log(city);
\`\`\`
2.
Natija \`700\` bo'ladi. Chunki \`var\` qayta e'lon qilishda xatolik bermaydi va eski qiymatni o'chirib yuboradi.
3.
\`\`\`javascript
let score = 50;
score = 60;
console.log(score);
\`\`\`

---

## 9. Xulosa

1. \`var\` — JavaScript'da o'zgaruvchi yaratishning eski usuli bo'lib, zamonaviy dasturlashda undan foydalanilmaydi.
2. \`var\` ning asosiy muammosi — bir xil nomli o'zgaruvchini qayta-qayta e'lon qilishga ruxsat berishi va ogohlantirish bermasligi.
3. Zamonaviy kodlarda har doim \`let\` (qiymat o'zgarsa) yoki \`const\` (qiymat o'zgarmasa) ishlatiladi.

Keyingi darsda: JavaScript'da ma'lumot turlari (string va number) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "var ni let ga almashtirish",
      instruction: "`var city = \"Samarqand\";` kodini zamonaviy `let` kalit so'zi bilan almashtiring va `console.log(city);` orqali chiqaring.",
      startingCode: "var city = \"Samarqand\";\nconsole.log(city);\n",
      hint: "let city = \"Samarqand\";\nconsole.log(city);",
      test: "if (code.includes('var')) return 'Koddagi var kalit so\\'zini let ga almashtiring';\nif (!code.includes('let')) return 'let kalit so\\'zi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Samarqand'))) return null;\nreturn '\"Samarqand\" matni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Xavfsiz yangilash",
      instruction: "Quyidagi `var` li kodni `let` ga o'tkazing va qiymatni qayta `let` ishlatmasdan to'g'ri yangilang: `score` avval `50`, keyin `60` bo'lsin.",
      startingCode: "var score = 50;\nvar score = 60;\nconsole.log(score);\n",
      hint: "let score = 50;\nscore = 60;\nconsole.log(score);",
      test: "if (code.includes('var')) return 'Koddagi var kalit so\\'zlarini olib tashlang';\nif (code.match(/let\\s+score\\s*=\\s*60/)) return 'Ikkinchi marta qiymat berishda let yozilmaydi';\nif (!code.includes('score = 60') && !code.includes('score=60')) return 'score qiymati 60 ga o\\'zgartirilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('60'))) return null;\nreturn '60 soni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "const o'rnida ishlatish",
      instruction: "`var pi = 3.14;` kodidagi qiymat hech qachon o'zgarmaydi. Uni eng to'g'ri kalit so'z (`const`) bilan e'lon qiling va konsolga chiqaring.",
      startingCode: "var pi = 3.14;\nconsole.log(pi);\n",
      hint: "const pi = 3.14;\nconsole.log(pi);",
      test: "if (code.includes('var')) return 'var o\\'rniga const ishlating';\nif (!code.includes('const')) return 'const kalit so\\'zi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('3.14'))) return null;\nreturn '3.14 qiymati konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nima uchun zamonaviy JavaScript'da `var` ishlatilmaydi?",
      options: [
        "var bilan kod sekinroq ishlaydi",
        "var bir xil nomli o'zgaruvchini qayta e'lon qilganda xato bermaydi va ma'lumotni buzishi mumkin",
        "var faqat internet bo'lmaganda ishlaydi",
        "var raqamlarni saqlay olmaydi"
      ],
      correctAnswer: 1,
      explanation: "var bir xil nomli o'zgaruvchini qayta e'lon qilishga ruxsat beradi va hech qanday ogohlantirish bermaydi, bu esa yashirin xatolarni (bug) keltirib chiqaradi."
    },
    {
      id: 2,
      question: "Quyidagi kod bajarilgandan keyin ekranga nima chiqadi?\n```javascript\nvar item = \"Olma\";\nvar item = \"Anor\";\nconsole.log(item);\n```",
      options: [
        "Olma",
        "Anor",
        "SyntaxError xatosi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "var xatolik chiqarmaydi va item qiymatini Anor ga almashtirib yuboradi. Natija Anor bo'ladi."
    },
    {
      id: 3,
      question: "Zamonaviy JavaScript'da o'zgaruvchilar uchun qaysi kalit so'zlar ishlatiladi?",
      options: [
        "Faqat var",
        "let va const",
        "make va create",
        "dim va set"
      ],
      correctAnswer: 1,
      explanation: "2015-yildan beri zamonaviy JavaScript standartida faqat let va const ishlatiladi."
    }
  ]
};

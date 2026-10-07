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
    },
    {
      "id": 4,
      "title": "var yozuvini let bilan almashtirish",
      "instruction": "`var population = 35000000;` qatorini `let` bilan yozing va konsolga chiqaring.",
      "startingCode": "var population = 35000000;\nconsole.log(population);\n",
      "hint": "var o'rniga let yozing.",
      "test": "if (/var\\s+population/.test(code)) return 'population hali var bilan yozilgan';\nif (!/let\\s+population/.test(code)) return 'population let bilan e\\'lon qilinmagan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('35000000'))) return null;\nreturn '35000000 chiqishi kerak';"
    },
    {
      "id": 5,
      "title": "Barcha varlarni modernizatsiya qilish",
      "instruction": "Koddagi BARCHA `var` larni `let` ga almashtiring (ikkita qator bor). Ikkalasi ham ishlashi kerak.",
      "startingCode": "var a = 1;\nvar b = 2;\nconsole.log(a);\nconsole.log(b);\n",
      "hint": "Har ikkala var qatorini let qiling.",
      "test": "if (/var\\s/.test(code)) return 'Hali var qolgan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst flat = out.join(' ');\nif (flat.includes('1') && flat.includes('2')) return null;\nreturn '1 va 2 chiqishi kerak';"
    },
    {
      "id": 6,
      "title": "O'zgarmas qiymatga const ishlatish",
      "instruction": "`var taxRate = 0.15;` — bu qiymat hech qachon o'zgarmaydi. Uni eng to'g'ri kalit so'z (`const`) bilan qayta yozing.",
      "startingCode": "var taxRate = 0.15;\nconsole.log(taxRate);\n",
      "hint": "const taxRate = 0.15;",
      "test": "if (/var\\s+taxRate/.test(code)) return 'taxRate hali var';\nif (!/const\\s+taxRate/.test(code)) return 'taxRate const bilan e\\'lon qilinmagan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('0.15'))) return null;\nreturn '0.15 chiqishi kerak';"
    },
    {
      "id": 7,
      "title": "var xatosini topish",
      "instruction": "Kodda xato bor: `count` ikki marta `var` bilan e'lon qilingan. Ikkinchi `var` ni olib tashlang (faqat birinchi qolsin), lekin `console.log(count);` 10 chiqishi kerak.",
      "startingCode": "var count = 5;\nvar count = 10;\nconsole.log(count);\n",
      "hint": "Ikkinchi qatordagi var ni olib tashlang: count = 10; bo'lsin.",
      "test": "if ((code.match(/var\\s+count/g) || []).length !== 1) return 'count bir marta var bilan e\\'lon qilinishi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '10')) return null;\nreturn 'console.log 10 chiqishi kerak';"
    },
    {
      "id": 8,
      "title": "Kalit so'z tanlash mashqi",
      "instruction": "Uchta qatordagi `var` larni to'g'ri kalit so'zga almashtiring: `version` (o'zgarmaydi -> const), `attempt` (o'zgaradi -> let), `title` (o'zgarmaydi -> const). console.log(attempt); qoldirilsin.",
      "startingCode": "var version = 2;\nvar attempt = 1;\nvar title = \"Dastur\";\nconsole.log(attempt);\n",
      "hint": "version va title uchun const, attempt uchun let.",
      "test": "if (/var\\s/.test(code)) return 'Hali var qolgan';\nif (!/const\\s+version/.test(code)) return 'version const bo\\'lishi kerak';\nif (!/let\\s+attempt/.test(code)) return 'attempt let bo\\'lishi kerak';\nif (!/const\\s+title/.test(code)) return 'title const bo\\'lishi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '1')) return null;\nreturn 'console.log(attempt) 1 chiqishi kerak';"
    },
    {
      "id": 9,
      "title": "Nima uchun eskirganini ko'rish",
      "instruction": "`var` bilan yozilgan kodni `let` ga o'tkazing va natijani chiqaring. O'zgaruvchi nomi `temperature`, qiymati `22.5` bo'lsin.",
      "startingCode": "// Let bilan qayta yozing\n",
      "hint": "let temperature = 22.5; console.log(temperature);",
      "test": "if (/var\\s/.test(code)) return 'var ishlatilgan';\nif (!/let\\s+temperature\\s*=\\s*22.5/.test(code)) return 'let temperature = 22.5 topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('22.5'))) return null;\nreturn '22.5 chiqishi kerak';"
    },
    {
      "id": 10,
      "title": "To'g'ri kalit so'zni tanlash (chegara)",
      "instruction": "Bitta vazifa: `userName` (o'zgarmaydi, \"guest\"), `loginCount` (o'zgaradi, 0 dan boshlanadi) va `siteName` (o'zgarmaydi, \"JS Academy\"). Har biri uchun eng mos kalit so'zni tanlang va `console.log(loginCount);` bilan tugating.",
      "startingCode": "// Uchalasi uchun eng mos kalit so'zni tanlang\n",
      "hint": "O'zgarmaslar uchun const, o'zgaradigan uchun let.",
      "test": "if (/var\\s/.test(code)) return 'var ishlatilgan — zamonaviy kalit so\\'zlar kerak';\nif (!/const\\s+userName/.test(code)) return 'userName const bo\\'lishi kerak';\nif (!/let\\s+loginCount/.test(code)) return 'loginCount let bo\\'lishi kerak';\nif (!/const\\s+siteName/.test(code)) return 'siteName const bo\\'lishi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '0')) return null;\nreturn 'console.log(loginCount) 0 chiqishi kerak';"
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
    },
    {
      "id": 4,
      "question": "var nima uchun eskirgan deb hisoblanadi?",
      "options": [
        "Sekin ishlagani uchun",
        "Ko'lami noto'g'ri boshqarilgani uchun — blok ichida ham butun funksiyaga tarqaladi",
        "Raqam qabul qilmagani uchun",
        "Faqat eski brauzerlarda ishlamaganligi uchun"
      ],
      "correctAnswer": 1,
      "explanation": "var funksiya ko'lamida yashaydi, {} bloklarini e'tiborsiz o'tkazadi. Bu kutilmagan xatolarga sabab bo'ladi."
    },
    {
      "id": 5,
      "question": "Yangi kodda qaysi kalit so'zlar ishlatiladi?",
      "options": [
        "Faqat var",
        "let va const",
        "Faqat const",
        "define"
      ],
      "correctAnswer": 1,
      "explanation": "Zamonaviy JavaScript'da var deyarli ishlatilmaydi. Odatiy qoida: const asos, o'zgarishi kerak bo'lsa let."
    },
    {
      "id": 6,
      "question": "let bilan var farqi nimada?",
      "options": [
        "Farq yo'q",
        "let blok ko'lamida yashaydi va qayta e'lon qilishga yo'l qo'ymaydi",
        "let sekinroq",
        "var faqat matn oladi"
      ],
      "correctAnswer": 1,
      "explanation": "let {} bloki ichida cheklangan va bir xil nomni ikki marta e'lon qilib bo'lmaydi — bu xavfsizroq."
    },
    {
      "id": 7,
      "question": "var x = 1; var x = 2; kodida nima bo'ladi?",
      "options": [
        "SyntaxError beradi",
        "Ikkinchi e'lon birinchisini bosib o'tadi — x endi 2",
        "Xato yo'q, x = 3",
        "Dastur to'xtaydi"
      ],
      "correctAnswer": 1,
      "explanation": "var takroriy e'longa yo'l qo'yadi — va bu jimjimadir: qiymat qanday o'zgarganini keyinroq topish qiyin."
    },
    {
      "id": 8,
      "question": "Qiymati hech qachon o'zgarmaydigan narsa uchun qaysi kalit so'z tanlanadi?",
      "options": [
        "var",
        "let",
        "const",
        "Nimasi bo'lsa ham farqi yo'q"
      ],
      "correctAnswer": 2,
      "explanation": "const — maqsadli tanlov: o'zgarmas qiymatni tasodifan o'zgarishdan himoya qiladi."
    },
    {
      "id": 9,
      "question": "Kodda avval \"o'zgaradi\" deb bilmasangiz qaysi kalit so'z bilan boshlanadi?",
      "options": [
        "let",
        "const — o'zgarishi aniqlansa let ga o'tiladi",
        "var",
        "Har doim let"
      ],
      "correctAnswer": 1,
      "explanation": "Xavfsiz strategiya: avval const yozing. Qiymat o'zgarishi kerakligini ko'rganda let ga o'ting."
    },
    {
      "id": 10,
      "question": "var ko'lamidagi kod qaysi blokka ta'sir qiladi?",
      "options": [
        "Faqat {} ichiga",
        "Butun funksiyaga yoki faylga — blok chegarasini e'tiborsiz o'tkazadi",
        "Faqat birinchi qatorda",
        "Hech qayerga"
      ],
      "correctAnswer": 1,
      "explanation": "var ning asosiy muammosi shu: for yoki if blokida e'lon qilingan o'zgaruvchi tashqarida ham ko'rinaveradi."
    },
    {
      "id": 11,
      "question": "Kodni modernizatsiya qilish nimani anglatadi?",
      "options": [
        "Kodni o'chirish",
        "Eskirgan var larni let/const ga almashtirish",
        "Kodni uzaytirish",
        "Faylni ko'paytirish"
      ],
      "correctAnswer": 1,
      "explanation": "Modernizatsiya — mavjud kodni zamonaviy va xavfsiz sintaksisga olib o'tish, mazmunini o'zgartirmasdan."
    },
    {
      "id": 12,
      "question": "var count = 5; let count = 10; — bir blokda yozilsa nima bo'ladi?",
      "options": [
        "Ikkala o'zgaruvchi ham bo'ladi",
        "SyntaxError — let allaqachon mavjud nomni e'lon qilib bo'lmaydi",
        "count = 15 bo'ladi",
        "Hech narsa"
      ],
      "correctAnswer": 1,
      "explanation": "var va let bir xil nomni blok ichida almashlab bo'lmaydi — bu xato (SyntaxError)."
    }
  ]
};

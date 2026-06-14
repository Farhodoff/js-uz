export const dsaInputOutput = {
  id: "dsaInputOutput",
  title: "Kiritish va Chiqarish Oqimlari (Basic I/O & DSA Intro)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Algoritmlarni yozishda ma'lumotlarni qabul qilish (Input) va natijani ko'rsatish (Output) juda muhim. Bu tizimlar ko'pincha "Oqimlar" (Streams) orqali ishlaydi.

### Suv quvuri o'xshatishi:
- **Kiritish oqimi (Input Stream):** Tasavvur qiling, sizga juda katta hajmdagi suv kerak. Uni chelaklab (kichik-kichik o'zgaruvchilarda) tashiganingizdan ko'ra, suv quvurini ulab qo'yganingiz ma'qul. Ma'lumotlar oqimi - bu dasturga to'xtovsiz kirib keladigan ma'lumotlar zanjiridir.
- **Chiqarish oqimi (Output Stream):** Dastur natijalarini ekranga yoki faylga chiqaruvchi quvur.
- **Buffer (Kesh/Bufer):** Suv quvuridagi kichik suv tanki. Agar har bir tomchi suv uchun bittadan quvur ochib yopilsa, tizim juda sekin ishlaydi. Ma'lumotlarni buferga yig'ib, birdaniga uzatish ishlash tezligini (I/O performance) sezilarli darajada oshiradi.

---

## 2. 💻 Real Kod Misollari

JavaScript (Node.js) muhitida ma'lumotlar oqimini o'qish va buferlash:

\`\`\`javascript
// 1. Standart console.log (Buferlanmagan - har doim disk/ekran bilan aloqa qiladi, sekinroq)
console.log("Natija 1");
console.log("Natija 2");

// 2. Buferlangan chiqarish (Tezroq - bitta katta string sifatida yig'ib chiqarish)
let outputBuffer = "";
for (let i = 0; i < 1000; i++) {
  outputBuffer += \`Natija \${i}\\n\`;
}
process.stdout.write(outputBuffer); // Bir marta chiqarish

// 3. Node.js-da stdin orqali oqimli o'qish
process.stdin.setEncoding("utf-8");
process.stdin.on("data", (chunk) => {
  console.log("Kiruvchi ma'lumot bo'lagi:", chunk);
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Tizim Chaqiriqlari (System Calls):
Har safar \`console.log\` yoki \`process.stdout.write\` chaqirilganda, dastur operatsion tizim darajasida **System Call** (tizim chaqiruvi) amalga oshiradi. 
- Bu protsessorni foydalanuvchi rejimidan (User Mode) yadro rejimiga (Kernel Mode) o'tishga majbur qiladi, bu esa nisbatan qimmat (ko'p vaqt oladigan) operatsiyadir.
- Shuning uchun millionlab operatsiyalarni alohida-alohida \`console.log\` qilish o'rniga, ularni matnli buferga birlashtirib, bir marta tizim chaqiruvi orqali chiqarish algoritmlarning ishlash vaqtini bir necha soniyaga qisqartiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Loop ichida tez-tez \`console.log\` chaqirish
Competitive programming (masalan, LeetCode, Codeforces) platformalarida testlar millionlab elementlarni o'z ichiga oladi. Har bir element uchun alohida chiqarish amalga oshirilsa, dastur \`Time Limit Exceeded\` (TLE) xatosi bilan to'xtaydi.
* **Xato:**
  \`\`\`javascript
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // Har iteratsiyada I/O system call bajariladi
  }
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  let output = "";
  for (let i = 0; i < arr.length; i++) {
    output += arr[i] + "\n";
  }
  process.stdout.write(output); // Butun natijani bitta chaqiriqda yozish
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **Input va Output Stream nima?**
   * *Javob:* Dasturga kirib keluvchi va undan chiquvchi ma'lumotlar oqimi.
2. **Buffer (Bufer) nima va u nega kerak?**
   * *Javob:* Vaqtinchalik tezkor xotira bo'lagi. Ma'lumotlarni qismlarga bo'lib tez-tez yozish o'rniga, buferda yig'ib birdaniga uzatish I/O tezligini oshiradi.
3. **Nima uchun loop ichida \`console.log\` ishlatish xavfli?**
   * *Javob:* Chunki u har safar operatsion tizim darajasida tizim chaqiruvini (System Call) yuzaga keltiradi. Bu juda ko'p vaqt va resurs talab qiladi.
4. **JS-da standart kiritish va chiqarish oqimlari qanday nomlanadi?**
   * *Javob:* \`process.stdin\` (Kiritish) va \`process.stdout\` (Chiqarish).
5. **System Call (Tizim chaqiruvi) nima?**
   * *Javob:* Dasturning operatsion tizim yadrosidan (Kernel) biron bir xizmatni (masalan diskka yozish, ekranga chiqarish) so'rash jarayoni.
6. **User Mode va Kernel Mode farqi nimada?**
   * *Javob:* User Mode - dasturlar ishlaydigan cheklangan rejim. Kernel Mode - drayverlar va operatsion tizim yadrosi ishlaydigan barcha vakolatlarga ega tezkor rejim.
7. **Node.js-da butun faylni o'qish (\`fs.readFileSync\`) va Stream orqali o'qish farqi nima?**
   * *Javob:* \`readFileSync\` butun faylni RAM-ga to'liq yuklaydi (agar fayl 10GB bo'lsa xotira to'ladi). Stream esa faylni bo'laklab (chunks) xotirada joy tejab o'qiydi.
8. **Time Limit Exceeded (TLE) nima?**
   * *Javob:* Algoritm belgilangan vaqt ichida (odatda 1-2 soniya) o'z ishini tugata olmaganda yuzaga keladigan platformaviy cheklov xatosi.
9. **\`process.stdout.write\` va \`console.log\` farqi nimada?**
   * *Javob:* \`console.log\` avtomatik ravishda satr oxiriga yangi qator belgisi (\`\n\`) qo'shadi va formatlash imkoniyatlariga ega. \`process.stdout.write\` esa matnni qanday bo'lsa shunday buferga yozadi.
10. **Bufer hajmi oshib ketsa nima bo'ladi?**
    * *Javob:* Bufer o'z hajmidan oshganda o'z-o'zidan ma'lumotlarni oqimga yozib yuboradi (Flush) yoki Memory Limit xatosini keltirib chiqaradi.
11. **Competitive programming uchun kiritishni qanday optimallashtirish mumkin?**
    * *Javob:* Node.js-da \`readline\` moduli yordamida har bir qatorni alohida hodisa sifatida tinglash orqali katta hajmdagi kiruvchi ma'lumotlarni boshqarish mumkin.
12. **\`console.error\` qaysi oqimga yozadi?**
    * *Javob:* Standart xatolik oqimiga (\`process.stderr\`). U standart chiqish oqimidan ajratilgan.

---

## 6. 🎨 Interaktiv Vizual

### Buferlangan va Buferlanmagan Chiqarish
Buferlanmagan chiqishda har bir qadam tizim bilan to'g'ridan-to'g'ri bog'lansa, buferlanganda amallar RAMda yig'iladi:

\`\`\`mermaid
graph TD
    subgraph BufNo [Buferlanmagan I/O]
        a1[Natija 1] -->|System Call| screen[Ekran / Fayl]
        a2[Natija 2] -->|System Call| screen
        a3[Natija 3] -->|System Call| screen
    end
    subgraph BufYes [Buferlangan I/O]
        b1[Natija 1] --> RAM[Bufer String]
        b2[Natija 2] --> RAM
        b3[Natija 3] --> RAM
        RAM -->|Bitta Tizim Chaqiruvi| screen2[Ekran / Fayl]
    end
    style BufNo fill:#fadbd8,stroke:#e74c3c,stroke-width:2px
    style BufYes fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Buferlangan kiritish va chiqarish masalalarini yeching.

---

## 8. 📝 12 ta Mini Test

Dars bo'yicha testlardan o'ting.

---

## 9. 🚀 Performance va Optimization

- **Bitta Tizim Chaqiruvi:** Agar test ma'lumotlari juda ko'p bo'lsa, chiqadigan natijalarni massivga yig'ing va \`.join('\n')\` qilib bitta \`process.stdout.write\` orqali chiqaring.
- **Garbage collection:** O'ta katta string buferlarni tez-tez yaratib yo'q qilish xotirani to'ldiradi, massivlardan to'g'ri foydalaning.

---

## 10. 📌 Cheat Sheet

| Amal turi | Metod | Tezligi | Tavsiya |
| :--- | :--- | :--- | :--- |
| **Sodda Chiqarish** | \`console.log()\` | Sekin | Debug yoki kichik ma'lumotlar uchun |
| **Katta Chiqarish** | \`process.stdout.write(buf)\` | Tezkor | Katta massiv va algoritmlar natijalarida |
| **Oqimli Kiritish** | \`readline\` moduli | O'ta barqaror | Katta hajmli kiruvchi satrlarda |
`,
  exercises: [
    {
      id: 1,
      title: "Katta Hajmli Chiqarishni Buferlash",
      instruction: "Berilgan `n` sonigacha bo'lgan toq sonlarni aniqlab, ularni yangi qatorda qaytaradigan va bitta `process.stdout.write` orqali chiqarish uchun tayyorlaydigan `getOddNumbersBuffer(n)` funksiyasini yozing. Metod natija satrini qaytarsin.",
      startingCode: "function getOddNumbersBuffer(n) {\n  let buffer = '';\n  // Kodni yozing\n  return buffer;\n}",
      hint: "Sikl ichida toq son topilsa, `buffer += val + '\\n'` qiling va oxirida stringni qaytaring.",
      test: "const sandbox = new Function(code + '; return getOddNumbersBuffer;'); const fn = sandbox(); const res = fn(10); if (res === '1\\n3\\n5\\n7\\n9\\n') return null; return 'Bufer to\\'g\\'ri shakllanmadi';"
    },
    {
      id: 2,
      title: "Vergul Bilan Ajratilgan Sonlar Oqimini Yig'ish",
      instruction: "Vergul bilan ajratilgan va har xil joyda bo'shliqlar bo'lgan string (oqimli kirish simulyatsiyasi) berilgan. Ushbu satrdagi barcha sonlarning yig'indisini hisoblaydigan `sumInputStream(inputStream)` funksiyasini yozing.",
      startingCode: "function sumInputStream(inputStream) {\n  // Kodni yozing\n}",
      hint: "Satrni `.split(',')` orqali bo'ling, har bir elementni tozalab (`.trim()`) va son qilib (`Number()`) qo'shib boring.",
      test: "const sandbox = new Function(code + '; return sumInputStream;'); const fn = sandbox(); if (fn(' 1, 2,  3, 4 ,5') === 15 && fn('10, 20') === 30) return null; return 'Sonlar oqimi noto\\'g\\'ri yig\\'ildi';"
    },
    {
      id: 3,
      title: "Formatlangan Chiqish Jadvali Generator",
      instruction: "Massiv ichida obyektlar berilgan (har birida `id`, `name`, `score`). Ularni matnli jadval ko'rinishida formatlab qaytaruvchi `generateScoreTable(data)` funksiyasini yozing. Har bir qator shakli: `ID: [id] | NAME: [name] | SCORE: [score]` ko'rinishida bo'lsin va har bir obyekt yangi qatordan joy olsin.",
      startingCode: "function generateScoreTable(data) {\n  let table = '';\n  // Kodni yozing\n  return table;\n}",
      hint: "Sikl yordamida massivni aylanib chiqib, har bir element uchun shablon yozib `table`ga qo'shib boring.",
      test: "const sandbox = new Function(code + '; return generateScoreTable;'); const fn = sandbox(); const users = [{id:1, name:'Ali', score:90}, {id:2, name:'Vali', score:85}]; const res = fn(users); if (res.includes('ID: 1 | NAME: Ali | SCORE: 90') && res.includes('ID: 2 | NAME: Vali | SCORE: 85')) return null; return 'Jadval ko\\'rinishi noto\\'g\\'ri formatlandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nima uchun competitive programming-da oddiy `console.log` ko'p marta chaqirilsa dastur to'xtab qolishi mumkin?",
      options: [
        "Chunki `console.log` har safar operatsion tizim yadro rejimiga o'tish (System Call) talab qiladi va vaqt sarflaydi",
        "Chunki u xotirani tozalab yuboradi",
        "Chunki platformada `console` taqiqlangan",
        "Faqat internet sekinligi tufayli"
      ],
      correctAnswer: 0,
      explanation: "Har bir `console.log` tizim chaqiruvini (System Call) yuzaga keltiradi. Bu User Mode va Kernel Mode o'tishlari tufayli protsessor uchun juda qimmat operatsiyadir. Ko'p chaqirilganda Time Limit Exceeded (TLE) yuz beradi."
    },
    {
      id: 2,
      question: "Bufer (Buffer) vazifasi nima?",
      options: [
        "Koddagi ortiqcha ifodalar xavfsizligini ta'minlash",
        "Ma'lumotlarni oqimga (disk yoki tarmoq) yuborishdan oldin ularni ma'lum hajmgacha vaqtincha tezkor xotirada yig'ib turish",
        "Fayllarni diskdan o'chirib yuborish",
        "Faqat CSS renderlashda yordam berish"
      ],
      correctAnswer: 1,
      explanation: "Bufer ma'lumotlarni birlashtirib, bitta katta bo'lak sifatida disk yoki ekranga yozish uchun vaqtinchalik ombor vazifasini bajaradi va I/O unumdorligini oshiradi."
    },
    {
      id: 3,
      question: "Node.js-da standart kiritish oqimi qaysi o'zgaruvchi orqali boshqariladi?",
      options: [
        "process.stdin",
        "process.stdout",
        "process.stderr",
        "console.read"
      ],
      correctAnswer: 0,
      explanation: "Dasturga tashqaridan kirib keladigan ma'lumotlarni o'qish uchun `process.stdin` (Standard Input) oqimidan foydalaniladi."
    },
    {
      id: 4,
      question: "Node.js-da standart chiqish oqimiga to'g'ridan-to'g'ri (buferlangan ko'rinishda) yozish metodi qaysi?",
      options: [
        "process.stdin.write()",
        "process.stdout.write()",
        "console.log()",
        "process.print()"
      ],
      correctAnswer: 1,
      explanation: "`process.stdout.write()` matnni standart chiqish oqimiga (Standard Output) formatlamasdan va yangi qator belgisisiz yozish imkonini beradi."
    },
    {
      id: 5,
      question: "Faylni oqimli o'qish (Stream reader) va to'liq o'qish (`readFileSync`) farqi nimada?",
      options: [
        "Stream reader butun faylni xotiraga yuklab keyin ishlaydi",
        "Stream reader faylni xotiraga yuklamasdan, uni kichik bo'laklarga (chunks) bo'lib ketma-ket o'qiydi, bu esa xotirani tejaydi",
        "Faqat tezlikda farq bor, xotira sarfi bir xil",
        "Ular mutlaqo farqsiz"
      ],
      correctAnswer: 1,
      explanation: "Katta fayllar (masalan, 10 GB) to'liq xotiraga yuklansa, dastur OOM (Out of Memory) bo'ladi. Stream o'quvchi esa har safar faqat kichik bo'laklarni (masalan 64 KB) xotirada aylanib o'qiydi."
    },
    {
      id: 6,
      question: "User Mode va Kernel Mode nima?",
      options: [
        "Dastur turlari",
        "Operatsion tizim darajasidagi cheklangan foydalanuvchi rejimi va cheksiz huquqqa ega yadro rejimi",
        "HTML va CSS fayl kengaytmalari",
        "Ma'lumotlar bazasi rejimlari"
      ],
      correctAnswer: 1,
      explanation: "User Mode - oddiy dasturlar xavfsiz ishlaydigan cheklangan muhit. Kernel Mode - drayverlar va OS yadrosi ishlaydigan barcha qurilmalarga to'g'ridan-to'g'ri ruxsati bor muhit."
    },
    {
      id: 7,
      question: "Chiqish oqimini 'flush' qilish deganda nima tushuniladi?",
      options: [
        "Buferda yig'ilgan ma'lumotlarni jismoniy qurilmaga (ekran, fayl yoki tarmoq) yozib yuborish va buferni bo'shatish",
        "Fayldan ma'lumotlarni o'chirib tashlash",
        "Kompyuterni qayta ishga tushirish",
        "Koddagi sintaktik xatolarni topish"
      ],
      correctAnswer: 0,
      explanation: "Flush operatsiyasi buferdagi ma'lumotlarni o'z manziliga (stdout/fayl) jismoniy yozib yuboradi va yangi ma'lumotlar uchun joy ajratadi."
    },
    {
      id: 8,
      question: "System Call (Tizim chaqiruvi) nima uchun kerak?",
      options: [
        "Dastur o'z funksiyalarini chaqirishi uchun",
        "User Modedagi dastur kompyuter qurilmalari (disk, monitor, tarmoq kartasi) bilan bevosita muloqot qila olmagani sababli, operatsion tizim yadrosiga murojaat qilishi uchun",
        "Kodni xavfsiz qilish maqsadida barcha o'zgaruvchilarni shifrlash uchun",
        "Saytni internetga ulash uchun"
      ],
      correctAnswer: 1,
      explanation: "Foydalanuvchi dasturlari xavfsizlik sababli jismoniy qurilmalarga to'g'ridan-to'g'ri kira olmaydi. Har qanday I/O amali tizim chaqiruvi orqali OS yadrosiga topshiriladi."
    },
    {
      id: 9,
      question: "Standard Error (stderr) oqimining vazifasi nima?",
      options: [
        "Faqat foydalanuvchi ismlarini tekshirish",
        "Xatoliklar va diagnostik ma'lumotlarni yozish, u oddiy standard output (stdout) oqimidan alohida ishlaydi",
        "Dasturni majburiy to'xtatish",
        "Oqimlarni bir-biriga ulash"
      ],
      correctAnswer: 1,
      explanation: "Stderr oqimi dasturdagi xatoliklar va ogohlantirishlarni normal chiqish ma'lumotlaridan alohida yo'naltirish imkonini beradi."
    },
    {
      id: 10,
      question: "Time Limit Exceeded (TLE) xatosi yuz berganda birinchi navbatda nimani optimallashtirish zarur?",
      options: [
        "Dastur dizaynini",
        "Algoritmning vaqt murakkabligini (Big O) va keraksiz ko'p chaqiriladigan I/O operatsiyalarini (masalan, loop ichidagi outputlarni)",
        "O'zgaruvchilar nomlarini qisqartirish",
        "Fayl kengaytmasini o'zgartirish"
      ],
      correctAnswer: 1,
      explanation: "TLE odatda algoritmdagi samarasiz yondashuv (masalan O(N^2) looplar) yoki unumsiz kiritish-chiqarish (I/O) sababli yuzaga keladi va ularni optimallashtirish lozim."
    },
    {
      id: 11,
      question: "Katta hajmli kiruvchi matn fayllarini qatorma-qator o'qish uchun Node.js da qaysi modul qulay?",
      options: [
        "readline",
        "http",
        "crypto",
        "path"
      ],
      correctAnswer: 0,
      explanation: "`readline` moduli `process.stdin` kabi kiritish oqimlaridan kelayotgan ma'lumotlarni qulay va xotira uchun xavfsiz tarzda har bir yangi qatorda o'qib beradi."
    },
    {
      id: 12,
      question: "Dasturda ko'p marta dynamic string qo'shish (str += word) xotira nuqtai nazaridan qanday muammoni keltirib chiqaradi?",
      options: [
        "Hech qanday",
        "JS-da string immutable (o'zgarmas) bo'lgani sababli, har safar qo'shishda yangi string yaratilib, eski o'chirib yuboriladi, bu esa Garbage Collectorga og'ir yuk bo'ladi",
        "Dasturni butunlay xavf ostiga qo'yadi",
        "String hajmini cheklab qo'yadi"
      ],
      correctAnswer: 1,
      explanation: "Satrlarni tez-tez qo'shish har safar xotirada yangi joy ajratilishiga sabab bo'ladi. Katta hajmdagi ma'lumotlar bilan ishlaganda massivga yig'ib `.join('')` qilish tezroq va samaraliroq."
    }
  ]
};

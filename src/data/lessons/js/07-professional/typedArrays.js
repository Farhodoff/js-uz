export const typedArrays = {
  id: "typedArrays",
  title: "Typed Arrays va DataView (Binary Data bilan ishlash)",
  theory: `
### Part 1: Beginner Analogy
Tasavvur qiling, oddiy JavaScript massivi (Array) – bu ichiga nima xohlasangiz solishingiz mumkin bo'lgan sehrli qop. Unga ruchka, kitob, televizor yoki hattoki boshqa qopni ham tiqib qo'yish mumkin. U juda qulay, lekin bunday erkinlik qimmatga tushadi: u ko'p xotira talab qiladi va ichidan kerakli narsani topish sekinlashadi.
Typed Arrays (Tiplangan Massivlar) esa – bu pochtadagi qat'iy o'lchamdagi qutilarga o'xshaydi. Har bir quti faqat aniq o'lchamdagi va turdagi narsani (masalan, faqat tangalar) saqlashi mumkin. Buning afzalligi shundaki, kompyuter ularning xotirada aynan qayerda va qancha joy egallayotganini aniq biladi. Natijada 3D grafika (WebGL), audio/video ishlash, va xom ma'lumotlarni (binary data) yuborishda ular nihoyatda tez ishlaydi.

### Part 2: Deep Dive (Under the hood)
JavaScript xotirasi bilan bevosita ishlash uchun 2 ta asosiy mexanizm ishlatiladi: **ArrayBuffer** va **Views** (Ko'rinishlar).

**ArrayBuffer**
Bu shunchaki jismoniy operativ xotiradan (RAM) ajratilgan "xom" (raw) joy. Uni to'g'ridan-to'g'ri o'qib yoki yozib bo'lmaydi. U faqat xotira maydonini band qilib turadi.
\\\`\\\`\\\`javascript
const buffer = new ArrayBuffer(16); // 16 baytlik xotira bloki ajratiladi
\\\`\\\`\\\`

**TypedArray va DataView (Ko'zoynaklar)**
Xotiradagi (ArrayBuffer) bu ma'lumotlarni o'qish uchun biz unga ma'lum bir prizma orqali qarashimiz kerak. Bu prizma "View" (ko'rinish) deyiladi.
TypedArray (masalan, \\\`Uint8Array\\\`, \\\`Float32Array\\\`) butun bufferni bir xil turdagi raqamlar sifatida ko'rsatadi.
\\\`\\\`\\\`javascript
const int32View = new Int32Array(buffer); // 16 bayt / 4 bayt = 4 ta butun son qabul qiladi
int32View[0] = 42;
\\\`\\\`\\\`

**DataView va Endianness**
Ba'zida tarmoqdan kelgan xotira blokida ham 1 baytlik, ham 4 baytlik turli xil ma'lumotlar aralash bo'ladi. Bunday holatda \\\`DataView\\\` dan foydalanamiz, u xotiraning istalgan baytiga borib, xohlagan turni o'qish/yozish imkonini beradi.
Shuningdek, kompyuter arxitekturasida **Little-endian** va **Big-endian** degan tushuncha bor. U xotirada baytlarning o'ngdan-chapga yoki chapdan-o'ngga yozilishini bildiradi. DataView buni nazorat qilishga imkon beradi (masalan, \\\`dataView.getInt32(0, true)\\\` – bu true parametri little-endian formati ekanini bildiradi).

### Part 3: Edge Cases va Senior Interview Questions

**Savol 1:** TypedArray da \\\`push()\\\` yoki \\\`pop()\\\` metodlari ishlaydimi?
**Javob:** Yo'q. ArrayBuffer o'lchami yaratilganda qat'iy belgilanadi. Uzunlikni o'zgartirib bo'lmaydi. Agar xotira yetmay qolsa, yangi kattaroq ArrayBuffer yaratib, eskilarini unga nusxalash (\\\`set()\\\` yordamida) kerak.

**Savol 2:** Float64 (JavaScriptdagi odatiy raqam) ni Int8Array (1 bayt) ga yozsak nima bo'ladi?
**Javob:** JavaScript uni xotiraga yozishdan oldin kesib (truncate) tashlaydi. Agar 256 yozsangiz, 1 baytga sig'magani uchun toshib ketadi (overflow) va nolgacha qisqaradi (256 % 256 = 0). Manfiy sonlar Two's Complement yordamida ifodalanadi.

**Savol 3:** Uint8ClampedArray nima uchun kerak?
**Javob:** Uint8ClampedArray qiymatlarni [0, 255] oralig'ida "qisib" (clamp) qilib oladi. Ya'ni, agar unga 300 yozsangiz, u avtomatik ravishda 255 bo'lib qoladi. -50 yozsangiz, 0 bo'ladi. Bu Canvas API (rasm piksellarini manipulyatsiya qilish) uchun mukammal mos keladi.

### Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD
    AB[ArrayBuffer 16 bytes] --> T1[Uint8Array 16 elements 1 byte each]
    AB --> T2[Int16Array 8 elements 2 bytes each]
    AB --> T3[Float32Array 4 elements 4 bytes each]
    AB --> DV[DataView specific byte-level reads]
    
    style AB fill:#f9f,stroke:#333,stroke-width:2px
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: "ex1",
      title: "ArrayBuffer Yaratish",
      description: "Uzunligi 12 bayt bo'lgan ArrayBuffer yarating va uni return qiling.",
      initialCode: `function createBuffer() {
  // code here
}`,
      solution: `function createBuffer() {
  return new ArrayBuffer(12);
}`,
      tests: [
        {
          test: `const buf = createBuffer();
return buf instanceof ArrayBuffer && buf.byteLength === 12;`,
          description: "Funksiya uzunligi 12 bayt bo'lgan ArrayBuffer qaytarishi kerak."
        }
      ]
    },
    {
      id: "ex2",
      title: "Uint8Array orqali yozish",
      description: "Uzunligi 4 bayt bo'lgan bufer yarating. Unga Uint8Array orqali bog'lanib, birinchi elementiga 42 qiymatini bering va shu TypedArray ni qaytaring.",
      initialCode: `function writeUint8() {
  // code here
}`,
      solution: `function writeUint8() {
  const buf = new ArrayBuffer(4);
  const view = new Uint8Array(buf);
  view[0] = 42;
  return view;
}`,
      tests: [
        {
          test: `const v = writeUint8();
return v instanceof Uint8Array && v.length === 4 && v[0] === 42;`,
          description: "Funksiya ichida 4 baytli ArrayBuffer olinib, 1-elementga 42 yozilishi kerak."
        }
      ]
    },
    {
      id: "ex3",
      title: "Oddiy massivdan TypedArray ga",
      description: "[1, 2, 3, 4] qatorini Float32Array ga o'tkazib return qiling.",
      initialCode: `function toFloat32Array() {
  const arr = [1, 2, 3, 4];
  // code here
}`,
      solution: `function toFloat32Array() {
  const arr = [1, 2, 3, 4];
  return new Float32Array(arr);
}`,
      tests: [
        {
          test: `const v = toFloat32Array();
return v instanceof Float32Array && v.length === 4 && v[3] === 4;`,
          description: "Massiv to'g'ri Float32Array ga o'zgartirilishi kerak."
        }
      ]
    },
    {
      id: "ex4",
      title: "To'lib toshish (Overflow)",
      description: "Uint8Array yarating (uzunligi 1). Unga 300 qiymatini bering. Massivni qaytaring.",
      initialCode: `function overflowTest() {
  // code here
}`,
      solution: `function overflowTest() {
  const view = new Uint8Array(1);
  view[0] = 300;
  return view;
}`,
      tests: [
        {
          test: `const v = overflowTest();
return v[0] === 44;`,
          description: "Uint8Array overflow holatida 300 % 256 = 44 qaytishi kerak."
        }
      ]
    },
    {
      id: "ex5",
      title: "Clamped Array maxsus holati",
      description: "Uint8ClampedArray yarating (uzunligi 1). Unga 300 qiymatini bering. Massivni qaytaring.",
      initialCode: `function clampedOverflow() {
  // code here
}`,
      solution: `function clampedOverflow() {
  const view = new Uint8ClampedArray(1);
  view[0] = 300;
  return view;
}`,
      tests: [
        {
          test: `const v = clampedOverflow();
return v instanceof Uint8ClampedArray && v[0] === 255;`,
          description: "Uint8ClampedArray 255 gacha qisishi kerak (clamp)."
        }
      ]
    },
    {
      id: "ex6",
      title: "DataView bilan ishlash",
      description: "Sizga argument sifatida bo'sh ArrayBuffer(4) beriladi. DataView yordamida uning 0-baytidan boshlab 32-bitli integer qilib 1024 sonini yozing (big-endian). Va bufferni qaytaring.",
      initialCode: `function useDataView(buffer) {
  // code here
}`,
      solution: `function useDataView(buffer) {
  const view = new DataView(buffer);
  view.setInt32(0, 1024);
  return buffer;
}`,
      tests: [
        {
          test: `const buf = new ArrayBuffer(4);
useDataView(buf);
const v = new DataView(buf);
return v.getInt32(0) === 1024;`,
          description: "DataView yordamida setInt32 ishlatib 1024 yozilgan bo'lishi kerak."
        }
      ]
    },
    {
      id: "ex7",
      title: "DataView Little-Endian",
      description: "Argument sifatida buffer berilgan. DataView orqali 0-offsetdan boshlab 16-bitli (2 bayt) integer 1000 raqamini yozing. Lekin bu safar little-endian formatida yozing. Bufferni qaytaring.",
      initialCode: `function setLittleEndian(buffer) {
  // code here
}`,
      solution: `function setLittleEndian(buffer) {
  const dv = new DataView(buffer);
  dv.setInt16(0, 1000, true);
  return buffer;
}`,
      tests: [
        {
          test: `const buf = new ArrayBuffer(2);
setLittleEndian(buf);
const dv = new DataView(buf);
return dv.getInt16(0, true) === 1000;`,
          description: "Little-endian orqali setInt16 uchinchi parametri true bo'lishi kerak."
        }
      ]
    },
    {
      id: "ex8",
      title: "Int32Array byteLength",
      description: "10 ta elementdan iborat Int32Array yarating va uning egallagan xotira hajmini (byteLength) qaytaring.",
      initialCode: `function checkByteLength() {
  // code here
}`,
      solution: `function checkByteLength() {
  const view = new Int32Array(10);
  return view.byteLength;
}`,
      tests: [
        {
          test: `return checkByteLength() === 40;`,
          description: "10 ta Int32Array elementi jami 40 bayt xotira oladi."
        }
      ]
    },
    {
      id: "ex9",
      title: "Ulashilgan Buffer",
      description: "Sizga Uint8Array(4) beriladi. Ushbu massivning bufferidan foydalanib, yangi Uint32Array yarating va uni qaytaring.",
      initialCode: `function sharedBuffer(uint8Arr) {
  // code here
}`,
      solution: `function sharedBuffer(uint8Arr) {
  return new Uint32Array(uint8Arr.buffer);
}`,
      tests: [
        {
          test: `const u8 = new Uint8Array(4);
const u32 = sharedBuffer(u8);
return u32 instanceof Uint32Array && u32.length === 1;`,
          description: "Bir buffer orqali Uint32Array yaratilishi kerak."
        }
      ]
    },
    {
      id: "ex10",
      title: "O'zgaruvchan offset DataView",
      description: "Buffer berilgan (kamida 8 bayt). DataView yordamida 4-baytdan boshlab 8-bitli son qilib 50 yozing (setInt8). Bufferni qaytaring.",
      initialCode: `function offsetWrite(buffer) {
  // code here
}`,
      solution: `function offsetWrite(buffer) {
  const dv = new DataView(buffer);
  dv.setInt8(4, 50);
  return buffer;
}`,
      tests: [
        {
          test: `const b = new ArrayBuffer(8);
offsetWrite(b);
const dv = new DataView(b);
return dv.getInt8(4) === 50;`,
          description: "4-baytdan (offset) setInt8 yordamida to'g'ri o'qish/yozish."
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "ArrayBuffer bu nima?",
      options: [
        "Jismoniy operativ xotiradan (RAM) ajratilgan toza (xom) baytlar maydoni",
        "Oddiy JS Arrayining maxsus formati",
        "Satrlarni binary kodga aylantiruvchi metod",
        "Istalgan ob'ektlarni saqlovchi xotira turi"
      ],
      correctAnswer: "Jismoniy operativ xotiradan (RAM) ajratilgan toza (xom) baytlar maydoni",
      explanation: "ArrayBuffer to'g'ridan-to'g'ri RAM dan bo'sh joy ajratadi va qat'iy o'lchamga ega."
    },
    {
      id: "q2",
      question: "ArrayBuffer ustida to'g'ridan-to'g'ri push() yoki o'qish amallarini bajarsa bo'ladimi?",
      options: [
        "Ha, xuddi oddiy Array kabi",
        "Yo'q, u faqat xotira bloki. Uni o'qish uchun TypedArray yoki DataView kerak",
        "Ha, faqat Uint8Array orqali",
        "Yo'q, u faqat o'qish uchun yaratiladi"
      ],
      correctAnswer: "Yo'q, u faqat xotira bloki. Uni o'qish uchun TypedArray yoki DataView kerak",
      explanation: "ArrayBuffer faqat xotira qismini ifodalaydi. U yerga ma'lumot yozish yoki o'qish uchun Views dan foydalanish shart."
    },
    {
      id: "q3",
      question: "Uint8Array har bir elementi uchun qancha bayt xotira oladi?",
      options: [
        "1 bayt (8 bit)",
        "2 bayt (16 bit)",
        "4 bayt (32 bit)",
        "8 bayt (64 bit)"
      ],
      correctAnswer: "1 bayt (8 bit)",
      explanation: "Uint8 = Unsigned Integer 8-bit, ya'ni 1 bayt degani."
    },
    {
      id: "q4",
      question: "Float64 sonini Uint8Array ga yozsak, JavaScript uni qanday saqlaydi?",
      options: [
        "Xatoni ko'rsatadi (TypeError)",
        "Sonni 1 baytga sig'adigan darajada kesadi (toshish - overflow) yoki bitwise qisqartiradi",
        "Ushbu raqamni string ga aylantiradi",
        "Otomatik Float64Array ga o'zgartiradi"
      ],
      correctAnswer: "Sonni 1 baytga sig'adigan darajada kesadi (toshish - overflow) yoki bitwise qisqartiradi",
      explanation: "TypedArray ga o'zining diapazonidan katta son yozilsa, qolgani kesilib toshib ketadi (masalan modulo operatsiyasi qilinadi)."
    },
    {
      id: "q5",
      question: "Uint8ClampedArray qanday ishlaydi?",
      options: [
        "255 dan katta raqamlarni 255 ga, 0 dan kichikni 0 ga tenglashtiradi (clamp)",
        "Raqamlarni toshib ketishi (overflow) qoidasiga bo'ysundiradi",
        "O'nlik qismlarni butun songa yaxlitlamaydi",
        "Satrlarni ham qabul qila oladi"
      ],
      correctAnswer: "255 dan katta raqamlarni 255 ga, 0 dan kichikni 0 ga tenglashtiradi (clamp)",
      explanation: "Canvas API da (0 dan 255 gacha RGB) piksellar xatosiz ko'rinishi uchun ClampedArray ishlatiladi."
    },
    {
      id: "q6",
      question: "DataView nima maqsadda ishlatiladi?",
      options: [
        "Bitta bufferda aralashgan har xil (1 bayt, 4 bayt) turlarni istalgan indeksdan o'qish va Endianness ni nazorat qilish uchun",
        "HTML da ma'lumotlarni render qilish uchun",
        "ArrayBuffer lar ustida filter() yoki map() ishlashiga imkon berish uchun",
        "Fayllarni yuklash uchun"
      ],
      correctAnswer: "Bitta bufferda aralashgan har xil (1 bayt, 4 bayt) turlarni istalgan indeksdan o'qish va Endianness ni nazorat qilish uchun",
      explanation: "DataView xotiraga istalgan manzil (offset) dan murojaat qilish va little/big endian formatini tanlash erkinligini beradi."
    },
    {
      id: "q7",
      question: "Little-endian va Big-endian nimani bildiradi?",
      options: [
        "Massivning uzunligini",
        "Xotirada baytlarning chapdan-o'ngga yoki o'ngdan-chapga joylashish (saqlanish) tartibini",
        "JavaScript kodining ijro etilish tezligini",
        "ArrayBufferdagi obyektlarning turlarini"
      ],
      correctAnswer: "Xotirada baytlarning chapdan-o'ngga yoki o'ngdan-chapga joylashish (saqlanish) tartibini",
      explanation: "Bu protsessor arxitekturasi bilan bog'liq bo'lib, ko'p baytli ma'lumotlarning qay tartibda terilishini bildiradi."
    },
    {
      id: "q8",
      question: "Int32Array(5) yaratilsa, uning buffer.byteLength xususiyati nechaga teng bo'ladi?",
      options: [
        "5",
        "10",
        "20",
        "32"
      ],
      correctAnswer: "20",
      explanation: "Int32Array har bir element uchun 4 bayt xotira oladi. 5 ta element * 4 bayt = 20 bayt."
    },
    {
      id: "q9",
      question: "TypedArray larning uzunligi (length) dastur davomida o'zgarishi mumkinmi?",
      options: [
        "Ha, ularda ham oddiy massivlardek ishlaydi",
        "Yo'q, ularning o'lchami ArrayBuffer kabi qat'iy va o'zgarmasdir",
        "Ha, agar DataView ishlatsak",
        "Ha, faqat push() ishlatsa bo'ladi"
      ],
      correctAnswer: "Yo'q, ularning o'lchami ArrayBuffer kabi qat'iy va o'zgarmasdir",
      explanation: "Ular RAM bilan to'g'ridan to'g'ri bog'liq va oldindan ajratilgan o'lchamlarni qisqartirib yoki uzaytirib bo'lmaydi."
    },
    {
      id: "q10",
      question: "WebGL va 3D grafikalarda GPU ga koordinatalarni jo'natishda odatda qaysi turdan foydalaniladi?",
      options: [
        "Array",
        "String",
        "Float32Array",
        "Int8Array"
      ],
      correctAnswer: "Float32Array",
      explanation: "GPU asosan C++ dagi kabi kasr sonlarni Float32 da qayta ishlaydi, va u xotiraga bevosita o'tadi."
    },
    {
      id: "q11",
      question: "DataView da .getInt32(4, true) nimani anglatadi?",
      options: [
        "4-indeksdagi massiv elementini true qilib qo'yish",
        "4-baytdan boshlab 4 baytlik butun sonni Little-endian formatida o'qish",
        "4 sonini 32-bitli integerga aylantirish",
        "4-baytdagi true/false qiymatni bilish"
      ],
      correctAnswer: "4-baytdan boshlab 4 baytlik butun sonni Little-endian formatida o'qish",
      explanation: "Ikkinchi 'true' parametri bu little-endian formatini faollashtiradi."
    },
    {
      id: "q12",
      question: "Nega oddiy JS kodlarida (masalan Todo app) TypedArray ishlatilmaydi?",
      options: [
        "Chunki ular JS motoriga zarar keltirishi mumkin",
        "Faqat server (Node.js) muhitida ishlaydi",
        "Oddiy DOM interfeysi va matnlar uchun oddiy JS turlari va Array ancha qulay, tezlik sezilmaydi",
        "Chunki ular eskirgan"
      ],
      correctAnswer: "Oddiy DOM interfeysi va matnlar uchun oddiy JS turlari va Array ancha qulay, tezlik sezilmaydi",
      explanation: "DOM va matnli ma'lumotlar bilan ishlashda moslashuvchan oddiy Arraylar ma'qul. TypedArray asosan binary data uchun."
    }
  ]
};

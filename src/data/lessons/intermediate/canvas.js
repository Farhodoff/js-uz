export const canvas = {
  id: "canvas",
  title: "Canvas API: 2D Grafika va Rasm chizish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Canvas API nima?
**Canvas API (Polotno / Mato)** — bu HTML5 va JavaScript yordamida brauzer sahifasida bevosita 2D shakllar, rasmlar, animatsiyalar hamda o'yin grafikalarini piksellar darajasida dinamik chizish imkonini beruvchi asboblar to'plamidir. Canvas yuqori renderslash tezligiga ega bo'lib, veb-o'yinlar, interaktiv grafiklar (charts) va vizual effektlar yaratishda keng qo'llaniladi.

### Real hayotiy analogiya
Tasavvur qiling, siz **rassomsiz**:
* **\`<canvas>\` tegi (Mato):** Bu sizning bo'sh oq polotnogiz (matongiz). Unda hali hech narsa yo'q va u shunchaki devorga ilingan.
* **Context (Mo'yqalam va Bo'yoqlar):** \`canvas.getContext('2d')\` orqali rassomning qo'liga mo'yqalam, chizg'ich va rang-barang bo'yoqlar to'plami (kontekst) beriladi. Rassom shu kontekst metodlari yordamida matoga chizadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (2D Kontekst olish va To'rtburchak chizish)
\`\`\`javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// To'ldirilgan ko'k to'rtburchak chizish
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 150, 100); // x, y, width, height
\`\`\`

### 2. Intermediate Example (Chiziqlar va Yo'llar - Paths)
Uchburchak chizish orqali chiziqlar bilan ishlash:
\`\`\`javascript
ctx.beginPath(); // Yangi chizish yo'lini boshlaymiz
ctx.moveTo(75, 50); // Boshlang'ich nuqtaga o'tamiz
ctx.lineTo(100, 75); // Birinchi chiziq
ctx.lineTo(75, 100); // Ikkinchi chiziq
ctx.closePath(); // Boshlang'ich nuqta bilan birlashtirib yo'lni yopamiz

ctx.strokeStyle = "red";
ctx.stroke(); // Faqat chegarasini qizil chizamiz
\`\`\`

### 3. Advanced Example (Aylana va Animatsiya)
Aylana chizish va uni sahifa bo'ylab harakatlantirish:
\`\`\`javascript
let x = 50;
let dx = 2; // Harakat tezligi

function animate() {
  // Avvalgi chizmalarni o'chirib tozalaymiz
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.arc(x, 75, 30, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
  ctx.fillStyle = "green";
  ctx.fill();
  
  x += dx; // Koordinatani suramiz
  
  if (x > canvas.width || x < 0) dx = -dx; // Chegaraga yetsa qaytadi
  
  requestAnimationFrame(animate); // Keyingi kadrni rejalashtiramiz
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Raster Graphics (Pikselli grafika)
Canvas — bu **raster (pikselli)** chizish maydoni. Siz biror shakl chizganingizda, brauzer o'sha hududdagi piksellar rangini o'zgartiradi xolos.
* **Canvas va SVG farqi:** SVG (Vektorli) har bir chiziqni alohida DOM elementi sifatida saqlaydi (bu sekin ishlaydi, lekin kattalashtirganda sifat buzilmaydi). Canvas esa pikselli bo'lgani uchun DOMni og'irlashtirmaydi (juda tez ishlaydi, lekin kattalashtirganda sifati buziladi).

> [!IMPORTANT]
> Canvas o'lchamlarini (width, height) hech qachon CSS orqali o'zgartirmang. Bu shakllarni cho'zib, sifatini buzib yuboradi. O'lchamlarni HTML atributlari yoki JS orqali (\`canvas.width = 500\`) o'rnating.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Oddiy diagramma (Bar Chart) chizish loyihasi
Ma'lumotlar massividan ustunli grafik chizish:

\`\`\`javascript
const data = [100, 150, 80, 200];
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#3498db";

data.forEach((val, index) => {
  const x = 20 + index * 60; // Har bir ustun orasidagi masofa
  const y = canvas.height - val; // Pastdan yuqoriga chizish uchun
  const width = 40;
  const height = val;
  
  ctx.fillRect(x, y, width, height);
});
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. \`beginPath()\` chaqirishni unutish
Agar yangi shakl boshlashdan oldin \`beginPath()\` chaqirilmasa, keyingi barcha chiziqlar oldingi yo'lga ulanib, oldingilarini ham qayta-qayta chizib yuboradi.
* **Noto'g'ri:**
  \`\`\`javascript
  ctx.lineTo(50, 50);
  ctx.stroke();
  // keyingi chizma...
  ctx.lineTo(100, 100);
  ctx.stroke(); // oldingi 50,50 chiziq ham qalinlashib qayta chiziladi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(50, 50);
  ctx.stroke();
  
  ctx.beginPath(); // To'liq yangi chizma
  ctx.moveTo(50, 50);
  ctx.lineTo(100, 100);
  ctx.stroke();
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod / Xossa | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`getContext('2d')\` | Chizish asboblarini olish | \`const ctx = canvas.getContext('2d')\` |
| \`fillRect(x, y, w, h)\` | To'ldirilgan to'rtburchak | \`ctx.fillRect(0, 0, 50, 50)\` |
| \`strokeRect(x, y, w, h)\` | Chegarali to'rtburchak | \`ctx.strokeRect(0, 0, 50, 50)\` |
| \`beginPath()\` | Yangi yo'l / chizmani boshlash | \`ctx.beginPath()\` |
| \`arc(x, y, r, s, e)\` | Aylana chizish | \`ctx.arc(50, 50, 20, 0, Math.PI * 2)\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Canvas ichidagi barcha chizmalarni qanday o'chirib tozalash mumkin?
\`ctx.clearRect(0, 0, canvas.width, canvas.height)\` metodi orqali canvasdagi barcha piksellar shaffof holatga qaytariladi.

### 2. Canvas-da soya (shadow) qanday qo'shiladi?
Kontekstning \`shadowBlur\`, \`shadowColor\`, \`shadowOffsetX\` va \`shadowOffsetY\` xususiyatlari orqali chizmalarga dynamic soya berish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Nima uchun Canvas va SVG o'rtasidagi farq renderslash tezligida muhim rol o'ynaydi?
2. Canvas-ning koordinatalar boshi (0, 0) qayerda joylashgan? (Chap yuqori burchakda).
3. \`ctx.save()\` va \`ctx.restore()\` metodlari nima vazifani bajaradi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida Canvas API bilan grafikalar chizish ko'nikmalaringizni tekshiring.
`,
  exercises: [
  {
    "id": 1,
    "title": "2D Kontekstni Olish",
    "instruction": "Taqdim etilgan 'canvas' o'zgaruvchisidan '2d' chizish kontekstini oling va uni 'ctx' o'zgaruvchisiga saqlang.",
    "startingCode": "const canvas = document.createElement('canvas');\n\n// Kodni shu yerda yozing\n",
    "hint": "const ctx = canvas.getContext('2d');",
    "test": "if (!code.includes('getContext')) return 'getContext metodi ishlatilmadi';\nconst sandbox = new Function('canvas', code + '; return ctx;');\nconst el = document.createElement('canvas');\nconst res = sandbox(el);\nif (res instanceof CanvasRenderingContext2D) return null;\nreturn 'ctx o\\'zgaruvchisi 2D context emas';"
  },
  {
    "id": 2,
    "title": "To'rtburchak Chizish",
    "instruction": "'ctx' dan foydalanib x=20, y=30 koordinatada eni 100 va bo'yi 50 bo'lgan to'ldirilgan (fillRect) to'rtburchak chizing.",
    "startingCode": "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n\n// Kodni shu yerda yozing\n",
    "hint": "ctx.fillRect(20, 30, 100, 50);",
    "test": "if (!code.includes('fillRect(20, 30, 100, 50)')) return 'fillRect to\\'g\\'ri koordinatalar bilan chaqirilmadi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Chizish Rangini O'zgartirish",
    "instruction": "'ctx' ning chizish rangini (fillStyle) 'green' (yashil) ga o'zgartiring va x=0, y=0, eni 50, bo'yi 50 bo'lgan to'rtburchak chizing.",
    "startingCode": "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n\n// Kodni shu yerda yozing\n",
    "hint": "ctx.fillStyle = 'green'; ctx.fillRect(0, 0, 50, 50);",
    "test": "if (!code.includes('fillStyle') || !code.includes('green')) return 'fillStyle ko\\'k rangga o\\'zgartirilmadi';\nif (!code.includes('fillRect')) return 'fillRect ishlatilmadi';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "HTML5-da canvas elementining 2D chizish asboblarini taqdim etadigan obyekt qaysi?",
    "options": [
      "CanvasRenderingContext2D",
      "WebGLRenderingContext",
      "HTMLCanvasElement",
      "Canvas2DDrawingTool"
    ],
    "correctAnswer": 0,
    "explanation": "canvas.getContext('2d') chaqirilganda brauzer bizga chizish uchun barcha 2D asboblar va xususiyatlarni o'z ichiga olgan CanvasRenderingContext2D obyekti nusxasini qaytaradi."
  },
  {
    "id": 2,
    "question": "Quyidagilardan qaysi biri Canvas koordinatalar tizimi uchun to'g'ri ta'rif?",
    "options": [
      "Markazi (0, 0) o'rtada joylashgan va Y o'qi tepaga qarab o'sadi",
      "Markazi (0, 0) chap pastki burchakda joylashgan",
      "Markazi (0, 0) chap yuqori burchakda joylashgan va Y o'qi pastga qarab o'sadi",
      "Markazi (0, 0) o'ng yuqori burchakda joylashgan"
    ],
    "correctAnswer": 2,
    "explanation": "Canvas-da standart koordinata boshi (0, 0) chap yuqori burchakda joylashgan. O'ngga qarab X o'qi, pastga qarab esa Y o'qi musbat yo'nalishda o'sib boradi."
  },
  {
    "id": 3,
    "question": "Canvas eni va bo'yini o'rnatishda nima uchun CSS-dan foydalanish tavsiya etilmaydi?",
    "options": [
      "CSS Canvas-ni umuman qo'llab-quvvatlamaydi",
      "CSS o'lchamlari shakllarni cho'zib, rasmni piksellashib (distortion) ketishiga olib keladi",
      "CSS o'lchamlari Canvas chizmalarining rangini o'chiradi",
      "CSS-dan foydalansa Canvas faqat qora rangda chizadi"
    ],
    "correctAnswer": 1,
    "explanation": "CSS o'lchami faqat ko'rinish oynasini cho'zadi. Canvas-ning ichki o'lchamlari o'zgarmaydi va bu grafikaning sifati buzilib, cho'zilib ketishiga sabab bo'ladi."
  },
  {
    "id": 4,
    "question": "Ko'k rangli chegarali (to'ldirilmagan) to'rtburchak chizish uchun qaysi kod to'g'ri?",
    "options": [
      "ctx.strokeStyle = 'blue'; ctx.strokeRect(10, 10, 100, 100);",
      "ctx.fillStyle = 'blue'; ctx.fillRect(10, 10, 100, 100);",
      "ctx.borderColor = 'blue'; ctx.drawRect(10, 10, 100, 100);",
      "ctx.color = 'blue'; ctx.rect(10, 10, 100, 100);"
    ],
    "correctAnswer": 0,
    "explanation": "Chegaralarni (konturlarni) chizish uchun fill o'rniga stroke ishlatiladi. Shuning uchun strokeStyle va strokeRect kombinatsiyasi to'g'ri."
  },
  {
    "id": 5,
    "question": "Chiziq yo'li tugagandan so'ng, uni boshlang'ich nuqta bilan bog'lab yopish uchun qaysi metod chaqiriladi?",
    "options": [
      "ctx.endPath()",
      "ctx.closePath()",
      "ctx.finishPath()",
      "ctx.connect()"
    ],
    "correctAnswer": 1,
    "explanation": "ctx.closePath() joriy chizish nuqtasidan boshlang'ich nuqtagacha to'g'ri chiziq tortib, shaklni avtomatik yopadi."
  },
  {
    "id": 6,
    "question": "Rasm ichiga matn yozish va uning ichini bo'yash uchun qaysi metod ishlatiladi?",
    "options": [
      "ctx.writeText()",
      "ctx.fillText()",
      "ctx.strokeText()",
      "ctx.drawText()"
    ],
    "correctAnswer": 1,
    "explanation": "fillText() metodi ko'rsatilgan matnni to'ldirilgan rang (fillStyle) bilan belgilangan koordinataga yozib beradi."
  },
  {
    "id": 7,
    "question": "Canvas kontekstining joriy holatini (rang, shrift, soya parametrlarini) saqlash uchun qaysi metod ishlatiladi?",
    "options": [
      "ctx.save()",
      "ctx.store()",
      "ctx.backup()",
      "ctx.freeze()"
    ],
    "correctAnswer": 0,
    "explanation": "ctx.save() kontekstning joriy holatlarini (styles, transformation matrix) stack-ga saqlab qo'yadi. Keyinchalik ularni ctx.restore() orqali qaytarib olish mumkin."
  },
  {
    "id": 8,
    "question": "ctx.arc() metodidagi burchaklar qaysi o'lchov birligida ko'rsatiladi?",
    "options": [
      "Graduslarda (Degrees - masalan, 360)",
      "Piksellarda (Pixels - masalan, 100)",
      "Radianlarda (Radians - masalan, Math.PI * 2)",
      "Foizlarda (Percentages - masalan, 100%)"
    ],
    "correctAnswer": 2,
    "explanation": "arc() metodi burchak parametrlarini faqat radian birliklarida qabul qiladi. 180 gradus Math.PI ga teng bo'ladi."
  },
  {
    "id": 9,
    "question": "Canvas-da chizilgan chizmalarni piksellar darajasida o'qish (matritsa olish) uchun qaysi metod xizmat qiladi?",
    "options": [
      "ctx.getPixels()",
      "ctx.getImageData()",
      "ctx.readPixels()",
      "ctx.getCanvasData()"
    ],
    "correctAnswer": 1,
    "explanation": "ctx.getImageData(x, y, w, h) metodi Canvas-dagi piksellarni RGBA massivi ko'rinishida saqlagan ImageData obyektini qaytaradi."
  },
  {
    "id": 10,
    "question": "Canvas-da aylanish yoki masshtabni o'zgartirish (transformatsiyalar) qaysi nuqtaga nisbatan amalga oshiriladi?",
    "options": [
      "Canvas-ning markaziy nuqtasiga nisbatan",
      "Sahifaning o'rtasiga nisbalan",
      "Koordinatalar boshiga (0, 0) nuqtaga nisbatan",
      "Shaklning eng chap nuqtasiga nisbatan"
    ],
    "correctAnswer": 2,
    "explanation": "Balla transformatsiyalar (rotate, scale, translate) har doim Canvas-ning joriy koordinata boshi (dastlab 0, 0 nuqtasi)ga nisbatan bajariladi."
  },
  {
    "id": 11,
    "question": "Boshqa bir <img id='pic'> rasmni canvas ustiga chizish uchun qaysi kod to'g'ri keladi?",
    "options": [
      "ctx.drawImage(document.getElementById('pic'), 0, 0);",
      "ctx.drawPicture(document.getElementById('pic'), 0, 0);",
      "ctx.insertImage('pic', 0, 0);",
      "ctx.fillRect('pic', 0, 0);"
    ],
    "correctAnswer": 0,
    "explanation": "drawImage() metodi HTML rasm elementi, boshqa canvas yoki video elementini koordinatalari bo'yicha chizib beradi."
  },
  {
    "id": 12,
    "question": "Chizmalarga soya qo'shganda, uning x-o'qi bo'yicha siljishini qaysi xususiyat belgilaydi?",
    "options": [
      "ctx.shadowX",
      "ctx.shadowOffsetX",
      "ctx.shadowBlurX",
      "ctx.shadowHorizontal"
    ],
    "correctAnswer": 1,
    "explanation": "shadowOffsetX soyani o'ngga (musbat bo'lsa) yoki chapga (manfiy bo'lsa) siljitish uchun ishlatiladi."
  }
]

};

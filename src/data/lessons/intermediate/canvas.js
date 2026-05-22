export const canvas = {
  id: "canvas",
  title: "Canvas API: 2D Grafika va Rasm chizish",
  theory: `## 1. NEGA kerak?
HTML5 Canvas API brauzer sahifasida JavaScript yordamida bevosita 2D grafika, o'yin sahnalari, animatsiyalar, vizual grafikalar (chartlar) va rasmlarni dinamik chizish uchun ishlatiladi. Agar bizda Canvas bo'lmaganida, har bir chiziq yoki shaklni HTML elementlari (div, span) yoki SVG orqali yaratishga to'g'ri kelardi, bu esa o'yinlar yoki murakkab animatsiyalarda renderslash samaradorligini juda pasaytirib yuborar edi. Canvas piksellar ustida to'g'ridan-to'g'ri ishlash imkonini beradi va juda tez ishlaydi.

## 2. SODDALIK (Analogiya)
Canvas-ni **rassomning bo'sh matosiga (polotnosiga)**, undan olinadigan \`context\` (kontekst) obyektini esa rassomning **qo'li va mo'yqalamiga** o'xshatish mumkin.
- HTML-dagi \`<canvas>\` tegi - bu shunchaki mato. Unda o'z-o'zidan hech narsa chizilmaydi.
- \`canvas.getContext('2d')\` orqali olinadigan kontekst - bu mo'yqalam va bo'yoqlardan iborat asboblar to'plami. Biz shu asboblar yordamida chiziqlar tortamiz va rang beramiz.

## 3. STRUKTURA
Canvas bilan ishlash asosan 3 ta bosqichdan iborat:
1. HTML-dan canvas elementini topish.
2. \`getContext('2d')\` orqali chizish kontekstini olish.
3. Kontekst metodlari yordamida chizish (masalan, to'rtburchak, chiziq yoki matn).

\`\`\`javascript
// 1. Canvasni olish
const canvas = document.getElementById('myCanvas');

// 2. 2D kontekstni olish
const ctx = canvas.getContext('2d');

// 3. To'rtburchak chizish
ctx.fillStyle = 'blue'; // Rangi ko'k
ctx.fillRect(10, 10, 150, 100); // x=10, y=10, eni=150, bo'yi=100
\`\`\`

### Asosiy metodlar:
- **Shakllar:** \`fillRect(x, y, w, h)\` (to'ldirilgan to'rtburchak), \`strokeRect(x, y, w, h)\` (ramkali to'rtburchak), \`clearRect(x, y, w, h)\` (o'chirish).
- **Yo'llar (Paths):** \`beginPath()\` (yangi chiziq yo'li), \`moveTo(x, y)\` (boshlang'ich nuqtaga siljish), \`lineTo(x, y)\` (chiziq tortish), \`arc(x, y, r, startAngle, endAngle)\` (yoy/aylana), \`stroke()\` (chiziqni chizish), \`fill()\` (ichini bo'yash).
- **Matn:** \`fillText(text, x, y)\`, \`strokeText(text, x, y)\`.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **O'lchamlarni CSS-da o'zgartirish:** Canvas eni va bo'yini CSS orqali (\`width: 500px;\`) belgilasangiz, chizilgan shakllar cho'zilib yoki siqilib qoladi. Canvas o'lchamlarini doimo HTML atributi sifatida (\`<canvas width="500" height="300">\`) yoki JavaScript-da (\`canvas.width = 500;\`) berish kerak.
2. **\`beginPath()\`ni unutish:** Agar yangi chiziq chizishdan oldin \`beginPath()\` chaqirilmasa, keyingi barcha chizmalar oldingi yo'lga ulanib ketadi va oldingi chiziqlar qayta chizilib qizarib yoki qalinlashib ketadi.
3. **Koordinatalar chalkashligi:** Canvas-ning koordinatalar boshi (0, 0) **chap yuqori burchakda** joylashgan. O'ngga qarab \`x\` o'sadi, pastga qarab esa \`y\` o'sadi (matematikadagi tepaga qarab emas).

## 6. SAVOLLAR VA JAVOBLAR
**1. Canvas nima?**
JavaScript yordamida sahifada dinamik ravishda grafikalar va rasmlar chizish uchun ishlatiladigan HTML5 elementi.

**2. 2D chizish uchun kontekst qanday olinadi?**
\`canvas.getContext('2d')\` metodi yordamida.

**3. Canvas va SVG-ning asosiy farqi nima?**
Canvas pikselli (raster) grafika bo'lib, tez ishlaydi lekin kattalashtirganda sifati buziladi. SVG esa vektorli bo'lib, har bir element DOM strukturasi qismidir, sekinroq lekin sifati yo'qolmaydi.

**4. To'ldirilgan ko'k to'rtburchak qanday chiziladi?**
\`ctx.fillStyle = 'blue'; ctx.fillRect(x, y, w, h);\`

**5. \`strokeRect\` va \`fillRect\` farqi nima?**
\`fillRect\` to'ldirilgan shakl chizadi, \`strokeRect\` esa faqat kontur (ramka) chizadi.

**6. Canvas koordinatalar markazi qayerda joylashgan?**
Chap yuqori burchakda (0, 0).

**7. Chiziq chizish yo'li qaysi metod bilan boshlanadi?**
\`ctx.beginPath()\` metodi bilan.

**8. Aylana chizish uchun qaysi metod ishlatiladi?**
\`ctx.arc(x, y, radius, startAngle, endAngle)\` metodi.

**9. Canvas o'lchamlarini qanday o'zgartirish kerak?**
Faqat \`canvas.width\` va \`canvas.height\` atributlari orqali (CSS-da emas).

**10. Rasm chizish uchun qaysi metod ishlatiladi?**
\`ctx.drawImage(imageElement, x, y)\` metodi.

**11. Chiziqlar qalinligi qanday o'zgartiriladi?**
\`ctx.lineWidth = qalinlik_qiymati;\` xususiyati yordamida.

**12. Canvas ichidagi barcha chizmalarni qanday tozalash mumkin?**
\`ctx.clearRect(0, 0, canvas.width, canvas.height)\` yordamida.
`,
  exercises: [
    {
      id: 1,
      title: "Kontekstni olish",
      instruction: "Berilgan 'canvas' o'zgaruvchisidan '2d' kontekstni oling va uni 'ctx' o'zgaruvchisiga saqlang.",
      startingCode: "const canvas = document.createElement('canvas');\n// Bu yerga yozing\nconst ctx = ",
      hint: "canvas.getContext('2d')",
      test: "if (code.includes(\"canvas.getContext('2d')\") || code.includes('canvas.getContext(\"2d\")')) return null; return '2d kontekstni to\\'g\\'ri oling.';"
    },
    {
      id: 2,
      title: "To'rtburchak chizish",
      instruction: "'ctx' dan foydalanib x=50, y=50 koordinatada eni 100 va bo'yi 80 bo'lgan to'ldirilgan to'rtburchak chizing.",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.fillRect(50, 50, 100, 80);",
      test: "if (code.includes('fillRect(50, 50, 100, 80)')) return null; return 'fillRect metodini to\\'g\\'ri parametrlari bilan chaqiring.';"
    },
    {
      id: 3,
      title: "Rasm rangini ko'k qilish",
      instruction: "Chizish rangi (fillStyle)ni 'blue' ga o'zgartiring va x=0, y=0, eni 200, bo'yi 200 bo'lgan to'rtburchak chizing.",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.fillStyle = 'blue';\nctx.fillRect(0, 0, 200, 200);",
      test: "if (code.includes(\"fillStyle = 'blue'\") && code.includes('fillRect(0, 0, 200, 200)')) return null; return 'fillStyle ni ko\\'k qilib to\\'rtburchak chizing.';"
    },
    {
      id: 4,
      title: "Kvadrat o'chirish",
      instruction: "'ctx.clearRect' yordamida canvas-ning (10, 10) koordinatasidan boshlab eni 50, bo'yi 50 bo'lgan qismni tozalang (o'chiring).",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.clearRect(10, 10, 50, 50);",
      test: "if (code.includes('clearRect(10, 10, 50, 50)')) return null; return 'clearRect metodini to\\'g\\'ri ishlating.';"
    },
    {
      id: 5,
      title: "Chiziq tortish",
      instruction: "Yangi yo'l boshlang, (0, 0) nuqtaga boring va (100, 100) nuqtagacha chiziq chizib, uni stroke() qiling.",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.beginPath();\nctx.moveTo(0, 0);\nctx.lineTo(100, 100);\nctx.stroke();",
      test: "if (code.includes('beginPath()') && code.includes('moveTo(0, 0)') && code.includes('lineTo(100, 100)') && code.includes('stroke()')) return null; return 'Yo\\'lni boshlab, moveTo, lineTo va stroke-dan foydalaning.';"
    },
    {
      id: 6,
      title: "Aylana chizish",
      instruction: "x=150, y=150 koordinatada radiusi 50 bo'lgan butun (to'liq) aylana yo'lini chizing (burchak radianlarda: 0 dan Math.PI * 2 gacha).",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\nctx.beginPath();\n",
      hint: "ctx.arc(150, 150, 50, 0, Math.PI * 2);\nctx.stroke();",
      test: "if (code.includes('arc(150, 150, 50, 0, Math.PI * 2)')) return null; return 'arc() metodi yordamida to\\'g\\'ri aylana hosil qiling.';"
    },
    {
      id: 7,
      title: "Chiziq qalinligi",
      instruction: "Chiziq qalinligini 8 pikselga sozlang va ramkali to'rtburchak (strokeRect) chizing (x=10, y=10, w=100, h=100).",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.lineWidth = 8;\nctx.strokeRect(10, 10, 100, 100);",
      test: "if (code.includes('lineWidth = 8') && code.includes('strokeRect(10, 10, 100, 100)')) return null; return 'lineWidth va strokeRect ishlating.';"
    },
    {
      id: 8,
      title: "Matn yozish",
      instruction: "'ctx.fillText' yordamida (50, 120) koordinatada 'Salom Dunyo' matnini chizing.",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.fillText('Salom Dunyo', 50, 120);",
      test: "if (code.includes('fillText') && code.includes('Salom Dunyo') && code.includes('50, 120')) return null; return 'Matnni to\\'g\\'ri koordinataga chizing.';"
    },
    {
      id: 9,
      title: "Uchburchak chizish",
      instruction: "Nuqtalarni (50, 10) -> (10, 80) -> (90, 80) qilib chiziq torting, yo'lni yoping (closePath) va ichini bo'yang (fill).",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\nctx.beginPath();\n// Bu yerga yozing\n",
      hint: "ctx.moveTo(50, 10);\nctx.lineTo(10, 80);\nctx.lineTo(90, 80);\nctx.closePath();\nctx.fill();",
      test: "if (code.includes('closePath()') && code.includes('fill()') && code.includes('moveTo(50, 10)')) return null; return 'Uchburchak chizish bosqichlarini bajaring.';"
    },
    {
      id: 10,
      title: "Shriftni o'zgartirish",
      instruction: "Kontekst fontini '30px Arial' ga o'zgartiring va keyin 'CSS' matnini (10, 50) ga yozing.",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.font = '30px Arial';\nctx.fillText('CSS', 10, 50);",
      test: "if (code.includes(\"font = '30px Arial'\") || code.includes('font = \"30px Arial\"')) return null; return 'font xususiyatini o\\'zgartiring va matn yozing.';"
    },
    {
      id: 11,
      title: "Soya qo'shish",
      instruction: "Soya bluri (shadowBlur)ni 15 ga va soya rangini (shadowColor) 'gray' ga tenglang.",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.shadowBlur = 15;\nctx.shadowColor = 'gray';",
      test: "if (code.includes('shadowBlur = 15') && (code.includes(\"shadowColor = 'gray'\") || code.includes('shadowColor = \"gray\"'))) return null; return 'shadowBlur va shadowColor ni to\\'g\\'ri belgilang.';"
    },
    {
      id: 12,
      title: "Aylana ichini bo'yash",
      instruction: "Rangni 'green' ga sozlang, x=50, y=50, r=30 li aylana chizib uning ichini bo'yang (fill).",
      startingCode: "const canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n// Bu yerga yozing\n",
      hint: "ctx.fillStyle = 'green';\nctx.beginPath();\nctx.arc(50, 50, 30, 0, Math.PI * 2);\nctx.fill();",
      test: "if (code.includes(\"fillStyle = 'green'\") && code.includes('fill()') && code.includes('arc(50, 50, 30')) return null; return 'Yashil aylana chizib ichini bo\\'yang.';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "HTML5-da canvas elementining 2D chizish asboblarini taqdim etadigan obyekt qaysi?",
      options: [
        "CanvasRenderingContext2D",
        "WebGLRenderingContext",
        "HTMLCanvasElement",
        "Canvas2DDrawingTool"
      ],
      correctAnswer: 0,
      explanation: "canvas.getContext('2d') chaqirilganda brauzer bizga chizish uchun barcha 2D asboblar va xususiyatlarni o'z ichiga olgan CanvasRenderingContext2D obyekti nusxasini qaytaradi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri Canvas koordinatalar tizimi uchun to'g'ri ta'rif?",
      options: [
        "Markazi (0, 0) o'rtada joylashgan va Y o'qi tepaga qarab o'sadi",
        "Markazi (0, 0) chap pastki burchakda joylashgan",
        "Markazi (0, 0) chap yuqori burchakda joylashgan va Y o'qi pastga qarab o'sadi",
        "Markazi (0, 0) o'ng yuqori burchakda joylashgan"
      ],
      correctAnswer: 2,
      explanation: "Canvas-da standart koordinata boshi (0, 0) chap yuqori burchakda joylashgan. O'ngga qarab X o'qi, pastga qarab esa Y o'qi musbat yo'nalishda o'sib boradi."
    },
    {
      id: 3,
      question: "Canvas eni va bo'yini o'rnatishda nima uchun CSS-dan foydalanish tavsiya etilmaydi?",
      options: [
        "CSS Canvas-ni umuman qo'llab-quvvatlamaydi",
        "CSS o'lchamlari shakllarni cho'zib, rasmni piksellashib (distortion) ketishiga olib keladi",
        "CSS o'lchamlari Canvas chizmalarining rangini o'chiradi",
        "CSS-dan foydalansa Canvas faqat qora rangda chizadi"
      ],
      correctAnswer: 1,
      explanation: "CSS o'lchami faqat ko'rinish oynasini cho'zadi. Canvas-ning ichki o'lchamlari o'zgarmaydi va bu grafikaning sifati buzilib, cho'zilib ketishiga sabab bo'ladi."
    },
    {
      id: 4,
      question: "Ko'k rangli chegarali (to'ldirilmagan) to'rtburchak chizish uchun qaysi kod to'g'ri?",
      options: [
        "ctx.strokeStyle = 'blue'; ctx.strokeRect(10, 10, 100, 100);",
        "ctx.fillStyle = 'blue'; ctx.fillRect(10, 10, 100, 100);",
        "ctx.borderColor = 'blue'; ctx.drawRect(10, 10, 100, 100);",
        "ctx.color = 'blue'; ctx.rect(10, 10, 100, 100);"
      ],
      correctAnswer: 0,
      explanation: "Chegaralarni (konturlarni) chizish uchun fill o'rniga stroke ishlatiladi. Shuning uchun strokeStyle va strokeRect kombinatsiyasi to'g'ri."
    },
    {
      id: 5,
      question: "Chiziq yo'li tugagandan so'ng, uni boshlang'ich nuqta bilan bog'lab yopish uchun qaysi metod chaqiriladi?",
      options: [
        "ctx.endPath()",
        "ctx.closePath()",
        "ctx.finishPath()",
        "ctx.connect()"
      ],
      correctAnswer: 1,
      explanation: "ctx.closePath() joriy chizish nuqtasidan boshlang'ich nuqtagacha to'g'ri chiziq tortib, shaklni avtomatik yopadi."
    },
    {
      id: 6,
      question: "Rasm ichiga matn yozish va uning ichini bo'yash uchun qaysi metod ishlatiladi?",
      options: [
        "ctx.writeText()",
        "ctx.fillText()",
        "ctx.strokeText()",
        "ctx.drawText()"
      ],
      correctAnswer: 1,
      explanation: "fillText() metodi ko'rsatilgan matnni to'ldirilgan rang (fillStyle) bilan belgilangan koordinataga yozib beradi."
    },
    {
      id: 7,
      question: "Canvas kontekstining joriy holatini (rang, shrift, soya parametrlarini) saqlash uchun qaysi metod ishlatiladi?",
      options: [
        "ctx.save()",
        "ctx.store()",
        "ctx.backup()",
        "ctx.freeze()"
      ],
      correctAnswer: 0,
      explanation: "ctx.save() kontekstning joriy holatlarini (styles, transformation matrix) stack-ga saqlab qo'yadi. Keyinchalik ularni ctx.restore() orqali qaytarib olish mumkin."
    },
    {
      id: 8,
      question: "ctx.arc() metodidagi burchaklar qaysi o'lchov birligida ko'rsatiladi?",
      options: [
        "Graduslarda (Degrees - masalan, 360)",
        "Piksellarda (Pixels - masalan, 100)",
        "Radianlarda (Radians - masalan, Math.PI * 2)",
        "Foizlarda (Percentages - masalan, 100%)"
      ],
      correctAnswer: 2,
      explanation: "arc() metodi burchak parametrlarini faqat radian birliklarida qabul qiladi. 180 gradus Math.PI ga teng bo'ladi."
    },
    {
      id: 9,
      question: "Canvas-da chizilgan chizmalarni piksellar darajasida o'qish (matritsa olish) uchun qaysi metod xizmat qiladi?",
      options: [
        "ctx.getPixels()",
        "ctx.getImageData()",
        "ctx.readPixels()",
        "ctx.getCanvasData()"
      ],
      correctAnswer: 1,
      explanation: "ctx.getImageData(x, y, w, h) metodi Canvas-dagi piksellarni RGBA massivi ko'rinishida saqlagan ImageData obyektini qaytaradi."
    },
    {
      id: 10,
      question: "Canvas-da aylanish yoki masshtabni o'zgartirish (transformatsiyalar) qaysi nuqtaga nisbatan amalga oshiriladi?",
      options: [
        "Canvas-ning markaziy nuqtasiga nisbatan",
        "Sahifaning o'rtasiga nisbatan",
        "Koordinatalar boshiga (0, 0) nuqtaga nisbatan",
        "Shaklning eng chap nuqtasiga nisbatan"
      ],
      correctAnswer: 2,
      explanation: "Barcha transformatsiyalar (rotate, scale, translate) har doim Canvas-ning joriy koordinata boshi (dastlab 0, 0 nuqtasi)ga nisbatan bajariladi."
    },
    {
      id: 11,
      question: "Boshqa bir <img id='pic'> rasmni canvas ustiga chizish uchun qaysi kod to'g'ri keladi?",
      options: [
        "ctx.drawImage(document.getElementById('pic'), 0, 0);",
        "ctx.drawPicture(document.getElementById('pic'), 0, 0);",
        "ctx.insertImage('pic', 0, 0);",
        "ctx.fillRect('pic', 0, 0);"
      ],
      correctAnswer: 0,
      explanation: "drawImage() metodi HTML rasm elementi, boshqa canvas yoki video elementini koordinatalari bo'yicha chizib beradi."
    },
    {
      id: 12,
      question: "Chizmalarga soya qo'shganda, uning x-o'qi bo'yicha siljishini qaysi xususiyat belgilaydi?",
      options: [
        "ctx.shadowX",
        "ctx.shadowOffsetX",
        "ctx.shadowBlurX",
        "ctx.shadowHorizontal"
      ],
      correctAnswer: 1,
      explanation: "shadowOffsetX soyani o'ngga (musbat bo'lsa) yoki chapga (manfiy bo'lsa) siljitish uchun ishlatiladi."
    }
  ]
};

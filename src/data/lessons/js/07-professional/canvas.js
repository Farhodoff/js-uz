export const canvas = {
  id: "canvas",
  title: "HTML5 Canvas API",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### HTML5 Canvas nima?
**HTML5 Canvas API** — bu veb-sahifada JavaScript yordamida dinamik ravishda grafikalar, rasmlar, o'yin sahnalari va animatsiyalarni chizish imkonini beruvchi texnologiyadir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **rassomlik ustaxonasi**dasiz:
* **Mato (Canvas):** Bu rassomning bo'sh oq matosi. Mato o'z-o'zidan hech narsa chiza olmaydi, u shunchaki ma'lum kenglik va balandlikka ega bo'lgan joy (ramka) xolos.
* **Rassom va uning cho'tkasi (Context):** Bu JavaScript kodi orqali boshqariladigan obyektdir. U matoga borib shakllarni chizadi, ranglarni bo'yaydi (\\\`fillStyle\\\`), chiziq qalinligini belgilaydi va matoni tozalaydi.

---

## 2. ⚙️ Deep Dive (Under the hood, memory, V8 engine, performance)

### Rastrli Grafikalar va Piksellar
Canvas SVG dan farqli o'laroq rastrli (pixel-based) texnologiyadir. Siz shaklni chizganingizdan keyin, brauzer uni DOM obyekti sifatida eslab qolmaydi, balki shunchaki matodagi qotib qolgan bo'yoq (piksellar to'plami) deb biladi. 

### Memory va V8 Engine
Canvas elementining o'zi minimal xotira egallaydi, ammo piksellar buferi (pixel buffer) ekran o'lchami kattalashgan sari katta xotira (RAM) talab qiladi. \\\`width * height * 4 bayt (RGBA)\\\` formulasi orqali Canvas xotirasi o'lchanadi. 
JavaScript V8 dvigateli orqali Canvas API bilan muloqot qilganda interfeys qatlami (bindings) ishlaydi. Har bir \\\`ctx.fillRect\\\` yoki \\\`ctx.lineTo\\\` chaqiruvi V8 dvigatelidan brauzerning C++ da yozilgan grafik qatlamiga murojaat qiladi. Shu sababli ketma-ket minglab kichik chizish komandalarini yuborish o'rniga, bitta \\\`beginPath\\\` ichida hamma yo'llarni birlashtirib, bir marta \\\`fill\\\` yoki \\\`stroke\\\` qilish samaraliroqdir (Batching).

### GPU va Hardware Acceleration
Zamonaviy brauzerlarda Canvas asosan GPU orqali tezlashtiriladi (Hardware Accelerated). Ya'ni siz chizgan narsalar bevosita video karta orqali ekranga chiqariladi, bu esa daqiqasiga 60 kadr (60 FPS) bilan silliq animatsiyalar qilish imkonini beradi.

---

## 3. ⚠️ Edge Cases va Senior Interview Savollari

### Edge Case: Retina Displeylardagi Xiralashish
**Muammo:** Yuqori pikselli (Retina) ekranlarda canvas chizmalari xiralashgan holda ko'rinadi. 
**Sabab:** CSS piksellari va qurilma fizik piksellari bir xil emas. \\\`window.devicePixelRatio\\\` odatda Retina ekranlarda 2 yoki 3 ga teng.
**Yechim:** Canvasning HTML \\\`width\\\` va \\\`height\\\` atributlarini \\\`devicePixelRatio\\\` ga ko'paytirish, CSS o'lchamini esa o'z holida qoldirish kerak. Keyin esa chizish miqyosini \\\`ctx.scale(ratio, ratio)\\\` orqali kattalashtirish kerak.

### Senior Interview Savollari
1. **Savol:** Canvas va SVG ning xotira boshqaruvi (memory footprint) borasida qanday farqi bor?
**Javob:** SVG DOM-ga bog'langan bo'lib, har bir tugun obyekt sifatida xotirada qoladi. Minglab obyektlar DOM ni to'ldirib yuborishi mumkin. Canvas esa faqat piksellar massividan iborat. Qancha ko'p obyekt chizilmasin, u o'zining piksel buferidan ortiq joy egallamaydi, shuning uchun katta miqdordagi obyektlarni chizishda Canvas samaraliroq. Ammo, hodisalarni (events) ushlab qolish Canvasda qiyinroq (Hit detection kerak bo'ladi).

2. **Savol:** \\\`OffscreenCanvas\\\` nima va nega ishlatiladi?
**Javob:** Asosiy JavaScript thread-i bloklanganda (qiyin hisob-kitoblar tufayli) UI qotib qolmasligi uchun \\\`OffscreenCanvas\\\` ishlatiladi. Bu orqali biz Canvas chizish amallarini Web Worker-ga o'tkazishimiz mumkin, bu esa animatsiyalar qotib qolmasligini kafolatlaydi.

3. **Savol:** Tainted Canvas xatosi (SecurityError) nima va qanday paydo bo'ladi?
**Javob:** Agar Canvasga boshqa domendan olingan rasm chizilsa (CORS ruxsatisiz), canvas tainted (ifloslangan) hisoblanadi. Shundan so'ng \\\`toDataURL()\\\` yoki \\\`getImageData()\\\` orqali canvas piksellarini o'qish xavfsizlik maqsadida bloklanadi.

---

## 4. 📊 Arxitektura Diagrammasi

Quyida Canvas ning brauzerda ishlash arxitekturasi keltirilgan:

\\\`\\\`\\\`mermaid
graph TD
    JS[JavaScript / V8 Engine] -->|API Calls bindings| WebAPI[Canvas API]
    WebAPI --> CPU[CPU Hisoblash]
    CPU --> GPU[GPU Rendering]
    GPU --> Buffer[Pixel Buffer]
    Buffer --> Screen[Monitor / Ekran]
    
    subgraph V8 Engine
      JS
    end
    
    subgraph Browser Engine
      WebAPI
      CPU
    end
    
    subgraph Hardware
      GPU
      Buffer
      Screen
    end
\\\`\\\`\\\`
`,
  exercises: [
    {
      "id": 1,
      "title": "To'rtburchak Chizish",
      "instruction": "Canvas 2D kontekstida berilgan `x, y` koordinatadan boshlab, berilgan `width` va `height` o'lchamli to'rtburchak shaklini chizadigan `drawRectangle(ctx, x, y, width, height, color)` funksiyasini yozing. To'rtburchak rangi `color` argumenti orqali berilgan rangga teng bo'lishi va ichi to'ldirilgan (filled) bo'lishi kerak.",
      "startingCode": "function drawRectangle(ctx, x, y, width, height, color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "ctx.fillStyle = color; va ctx.fillRect(x, y, width, height); buyruqlaridan foydalaning.",
      "test": "const mockCtx = { fillStyle: '', fillRect(x, y, w, h) { this.called = true; this.args = { x, y, w, h }; } }; const sandbox = new Function(code + '; return drawRectangle;'); const fn = sandbox(); fn(mockCtx, 10, 20, 100, 50, 'red'); if (mockCtx.fillStyle !== 'red') return 'fillStyle rangi to\\'g\\'ri o\\'rnatilmadi'; if (!mockCtx.called) return 'fillRect metodi chaqirilmadi'; if (mockCtx.args.x !== 10 || mockCtx.args.y !== 20 || mockCtx.args.w !== 100 || mockCtx.args.h !== 50) return 'fillRect metodiga noto\\'g\\'ri koordinatalar yoki o\\'lchamlar uzatildi'; return null;"
    },
    {
      "id": 2,
      "title": "Aylana Chizish",
      "instruction": "Canvas 2D kontekstida berilgan `x, y` markaziy nuqtada, berilgan `radius` o'lchamli va `color` rangli to'ldirilgan aylana chizadigan `drawCircle(ctx, x, y, radius, color)` funksiyasini yozing. Yo'lni `beginPath` orqali boshlashni va `fill` orqali rang bilan to'ldirishni unutmang.",
      "startingCode": "function drawCircle(ctx, x, y, radius, color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "ctx.beginPath(), ctx.arc(x, y, radius, 0, Math.PI * 2), ctx.fillStyle = color va ctx.fill() metodlaridan foydalaning.",
      "test": "const mockCtx = { beginPathCalled: false, arcCalled: false, fillCalled: false, fillStyle: '', beginPath() { this.beginPathCalled = true; }, arc(x, y, r, sa, ea) { this.arcCalled = true; this.arcArgs = { x, y, r, sa, ea }; }, fill() { this.fillCalled = true; } }; const sandbox = new Function(code + '; return drawCircle;'); const fn = sandbox(); fn(mockCtx, 50, 50, 30, 'blue'); if (!mockCtx.beginPathCalled) return 'beginPath() metodi chaqirilmadi'; if (!mockCtx.arcCalled) return 'arc() metodi chaqirilmadi'; if (!mockCtx.fillCalled) return 'fill() metodi chaqirilmadi'; if (mockCtx.fillStyle !== 'blue') return 'fillStyle rangi noto\\'g\\'ri o\\'rnatildi'; const args = mockCtx.arcArgs; if (args.x !== 50 || args.y !== 50 || args.r !== 30 || Math.abs(args.ea - Math.PI * 2) > 0.01) return 'arc() metodiga noto\\'g\\'ri argumentlar uzatildi'; return null;"
    },
    {
      "id": 3,
      "title": "Canvasni Tozalash",
      "instruction": "Canvasning chap yuqori burchagidan (0, 0) boshlab, berilgan `width` va `height` o'lchamdagi butun maydonni tozalovchi (o'chiruvchi) `clearCanvas(ctx, width, height)` funksiyasini yozing.",
      "startingCode": "function clearCanvas(ctx, width, height) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "ctx.clearRect(0, 0, width, height) metodidan foydalaning.",
      "test": "const mockCtx = { clearRectCalled: false, clearRect(x, y, w, h) { this.clearRectCalled = true; this.args = { x, y, w, h }; } }; const sandbox = new Function(code + '; return clearCanvas;'); const fn = sandbox(); fn(mockCtx, 300, 200); if (!mockCtx.clearRectCalled) return 'clearRect() metodi chaqirilmadi'; const args = mockCtx.args; if (args.x !== 0 || args.y !== 0 || args.w !== 300 || args.h !== 200) return 'clearRect() metodiga noto\\'g\\'ri o\\'lchamlar yoki koordinatalar uzatildi'; return null;"
    },
    {
      "id": 4,
      "title": "To'g'ri chiziq chizish",
      "instruction": "Boshlang'ich `(x1, y1)` nuqtadan yakuniy `(x2, y2)` nuqtagacha `color` rangida va `lineWidth` qalinlikda to'g'ri chiziq chizuvchi `drawLine(ctx, x1, y1, x2, y2, color, lineWidth)` funksiyasini yozing.",
      "startingCode": "function drawLine(ctx, x1, y1, x2, y2, color, lineWidth) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "beginPath, moveTo, lineTo, strokeStyle, lineWidth, stroke metodlaridan foydalaning.",
      "test": "const mockCtx = { moveToArgs: [], lineToArgs: [], strokeCalled: false, strokeStyle: '', lineWidth: 1, beginPath() {}, moveTo(x,y) { this.moveToArgs.push({x,y}); }, lineTo(x,y) { this.lineToArgs.push({x,y}); }, stroke() { this.strokeCalled = true; } }; const fn = new Function(code + '; return drawLine;')(); fn(mockCtx, 10, 10, 50, 50, 'green', 5); if(mockCtx.moveToArgs[0]?.x !== 10 || mockCtx.lineToArgs[0]?.x !== 50) return 'moveTo yoki lineTo xato'; if(mockCtx.strokeStyle !== 'green') return 'strokeStyle xato'; if(mockCtx.lineWidth !== 5) return 'lineWidth xato'; if(!mockCtx.strokeCalled) return 'stroke() chaqirilmadi'; return null;"
    },
    {
      "id": 5,
      "title": "Ochiq to'rtburchak (Chegara)",
      "instruction": "Ichi bo'sh, faqat chegarasi (chiziqlari) chizilgan to'rtburchak yaratuvchi `drawStrokeRectangle(ctx, x, y, w, h, color)` funksiyasini yozing.",
      "startingCode": "function drawStrokeRectangle(ctx, x, y, w, h, color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "ctx.strokeStyle va ctx.strokeRect() dan foydalaning.",
      "test": "const mockCtx = { strokeStyle: '', strokeRectCalled: false, strokeRect(x,y,w,h) { this.strokeRectCalled = true; this.args={x,y,w,h}; } }; const fn = new Function(code + '; return drawStrokeRectangle;')(); fn(mockCtx, 5, 5, 40, 40, 'blue'); if(!mockCtx.strokeRectCalled) return 'strokeRect chaqirilmadi'; if(mockCtx.strokeStyle !== 'blue') return 'strokeStyle xato'; return null;"
    },
    {
      "id": 6,
      "title": "Matn chizish",
      "instruction": "Canvasda `(x, y)` nuqtada berilgan matnni (`text`) va o'lcham/shriftni (`font`) chizuvchi `drawText(ctx, text, x, y, font, color)` funksiyasini yozing.",
      "startingCode": "function drawText(ctx, text, x, y, font, color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "ctx.font, ctx.fillStyle, va ctx.fillText() metodlaridan foydalaning.",
      "test": "const mockCtx = { font: '', fillStyle: '', fillTextCalled: false, fillText(t,x,y){ this.fillTextCalled=true; this.args={t,x,y}; } }; const fn = new Function(code + '; return drawText;')(); fn(mockCtx, 'Salom', 10, 20, '20px Arial', 'red'); if(!mockCtx.fillTextCalled) return 'fillText chaqirilmadi'; if(mockCtx.font !== '20px Arial') return 'font noto\\'g\\'ri'; if(mockCtx.fillStyle !== 'red') return 'fillStyle noto\\'g\\'ri'; if(mockCtx.args.t !== 'Salom') return 'Matn xato uzatildi'; return null;"
    },
    {
      "id": 7,
      "title": "Uchburchak chizish",
      "instruction": "3 ta nuqta: `(x1,y1)`, `(x2,y2)`, `(x3,y3)` orqali uchburchak chizib, ichini berilgan rangda to'ldiruvchi `drawTriangle(ctx, x1, y1, x2, y2, x3, y3, color)` funksiyasini yozing.",
      "startingCode": "function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "beginPath, moveTo(x1,y1), lineTo(x2,y2), lineTo(x3,y3), closePath(), fillStyle, va fill() metodlaridan foydalaning.",
      "test": "const mockCtx = { beginPathCalled:false, moveToArgs:[], lineToArgs:[], fillCalled:false, fillStyle:'', beginPath(){this.beginPathCalled=true}, moveTo(x,y){this.moveToArgs.push({x,y})}, lineTo(x,y){this.lineToArgs.push({x,y})}, closePath(){}, fill(){this.fillCalled=true} }; const fn = new Function(code + '; return drawTriangle;')(); fn(mockCtx, 10, 10, 20, 20, 0, 20, 'pink'); if(!mockCtx.beginPathCalled) return 'beginPath chaqirilmadi'; if(mockCtx.moveToArgs.length === 0) return 'moveTo chaqirilmadi'; if(mockCtx.lineToArgs.length < 2) return 'lineTo yetarli chaqirilmadi'; if(!mockCtx.fillCalled) return 'fill chaqirilmadi'; if(mockCtx.fillStyle !== 'pink') return 'fillStyle xato'; return null;"
    },
    {
      "id": 8,
      "title": "Shaffoflik (GlobalAlpha)",
      "instruction": "Canvasning umumiy shaffofligini (globalAlpha) o'rnatgach, to'rtburchak chizuvchi `drawTransparentRect(ctx, x, y, w, h, color, alpha)` funksiyasini yozing.",
      "startingCode": "function drawTransparentRect(ctx, x, y, w, h, color, alpha) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "ctx.globalAlpha = alpha; orqali o'rnating, keyin fillStyle va fillRect qiling.",
      "test": "const mockCtx = { globalAlpha: 1, fillStyle: '', fillRectCalled: false, fillRect(x,y,w,h){this.fillRectCalled=true;} }; const fn = new Function(code + '; return drawTransparentRect;')(); fn(mockCtx, 0, 0, 10, 10, 'red', 0.5); if(mockCtx.globalAlpha !== 0.5) return 'globalAlpha xato o\\'rnatildi'; if(!mockCtx.fillRectCalled) return 'fillRect chaqirilmadi'; return null;"
    },
    {
      "id": 9,
      "title": "Holatni saqlash va tiklash",
      "instruction": "Joriy kontekst holatini saqlab (`save`), rangni o'zgartirib to'rtburchak chizadigan, va oxirida holatni eski holiga qaytaruvchi (`restore`) `drawIsolatedRect(ctx, x, y, w, h, color)` funksiyasini yozing.",
      "startingCode": "function drawIsolatedRect(ctx, x, y, w, h, color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "save() chaqiring, so'ngra chizing, oxirida restore() chaqiring.",
      "test": "const mockCtx = { saveCalled:0, restoreCalled:0, fillRectCalled:false, fillStyle:'', save(){this.saveCalled++}, restore(){this.restoreCalled++}, fillRect(){this.fillRectCalled=true} }; const fn = new Function(code + '; return drawIsolatedRect;')(); fn(mockCtx, 0, 0, 10, 10, 'red'); if(mockCtx.saveCalled === 0) return 'save() chaqirilmadi'; if(mockCtx.restoreCalled === 0) return 'restore() chaqirilmadi'; if(!mockCtx.fillRectCalled) return 'fillRect chaqirilmadi'; return null;"
    },
    {
      "id": 10,
      "title": "Masshtabni o'zgartirish (Scale)",
      "instruction": "Canvas koordinatalarini X va Y o'qi bo'yicha berilgan koeffitsiyentga kattalashtiruvchi (`scaleX`, `scaleY`) funksiyani yozing. So'ngra `x, y, w, h` li `color` rangli to'rtburchak chizing.",
      "startingCode": "function drawScaledRect(ctx, scaleX, scaleY, x, y, w, h, color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "ctx.scale(scaleX, scaleY) dan foydalaning, keyin fillRect qiling.",
      "test": "const mockCtx = { scaleArgs:[], fillRectCalled:false, fillStyle:'', scale(x,y){this.scaleArgs.push({x,y})}, fillRect(){this.fillRectCalled=true} }; const fn = new Function(code + '; return drawScaledRect;')(); fn(mockCtx, 2, 2, 10, 10, 20, 20, 'blue'); if(mockCtx.scaleArgs.length===0) return 'scale() chaqirilmadi'; if(mockCtx.scaleArgs[0].x!==2) return 'scale() argumentlari xato'; if(!mockCtx.fillRectCalled) return 'fillRect chaqirilmadi'; return null;"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "Canvas nima?",
      "options": [
        "CSS orqali animatsiya qiladigan maxsus teg",
        "Skriptlar (JavaScript) yordamida dinamik ravishda 2D/3D grafika va rasmlarni chizish uchun ishlatiladigan HTML elementi",
        "Brauzerning ichki ma'lumotlar bazasi",
        "Vektorli rasmlarni chizish uchun ishlatiladigan XML formatidagi teg"
      ],
      "correctAnswer": 1,
      "explanation": "Canvas HTML5 elementi bo'lib, unga JavaScript yordamida pikselma-piksel rasm va grafikalar chiziladi."
    },
    {
      "id": 2,
      "question": "Canvas 2D kontekstini olish uchun qaysi metoddan foydalaniladi?",
      "options": [
        "`canvas.get2DContext()`",
        "`canvas.getContext('2d')`",
        "`canvas.context2d()`",
        "`canvas.draw('2d')`"
      ],
      "correctAnswer": 1,
      "explanation": "Canvas elementidan 2D chizish imkoniyatlarini olish uchun `getContext('2d')` metodi chaqiriladi."
    },
    {
      "id": 3,
      "question": "Canvas koordinatalar tizimida koordinata boshi (0, 0) qayerda joylashgan?",
      "options": [
        "Canvasning markazida",
        "Chap pastki burchakda",
        "O'ng yuqori burchakda",
        "Chap yuqori burchakda"
      ],
      "correctAnswer": 3,
      "explanation": "Canvas koordinata tizimining boshi (0,0) har doim chap yuqori burchakda bo'ladi. X o'ngga, Y esa pastga qarab o'sib boradi."
    },
    {
      "id": 4,
      "question": "Nima uchun Canvas o'lchamini CSS (style) yordamida o'zgartirish tavsiya etilmaydi?",
      "options": [
        "CSS canvasni butunlay yashirib qo'yishi mumkinligi uchun",
        "CSS faqat ranglarni o'zgartira oladi, o'lchamlarni emas",
        "CSS o'lcham o'rnatganda chizilgan tasvir piksel o'lchamiga mos kelmay, cho'zilib va xiralashib ketishi sababli",
        "Canvas faqat inline CSS-ni qo'llab-quvvatlagani uchun"
      ],
      "correctAnswer": 2,
      "explanation": "Canvas o'zining ichki piksel o'lchamlariga ega (`width` va `height` HTML atributlari). Agar uni CSS orqali kattalashtirsak, brauzer chizilgan kichik rasmni shunchaki cho'zadi, bu esa xiralashishga olib keladi."
    },
    {
      "id": 5,
      "question": "Yangi yo'l (path) boshlash va eski yo'llarni tozalash uchun qaysi metod chaqiriladi?",
      "options": [
        "`ctx.beginPath()`",
        "`ctx.newPath()`",
        "`ctx.clearPath()`",
        "`ctx.closePath()`"
      ],
      "correctAnswer": 0,
      "explanation": "`ctx.beginPath()` yangi chizish yo'lini boshlaydi va oldingi yo'l xotirasini tozalaydi, bu esa oldingi shakllarning qayta chizilib ketishini oldini oladi."
    },
    {
      "id": 6,
      "question": "Canvasda to'liq aylana chizish uchun `ctx.arc(x, y, radius, startAngle, endAngle)` metodida `endAngle` sifatida nima yozilishi kerak?",
      "options": [
        "`360` (daraja)",
        "`Math.PI`",
        "`Math.PI * 2`",
        "`180`"
      ],
      "correctAnswer": 2,
      "explanation": "`ctx.arc` metodida burchaklar radianlarda o'lchanadi. To'liq aylana 360 daraja bo'lib, u `2 * Math.PI` radianga tengdir."
    },
    {
      "id": 7,
      "question": "Quyidagi metodlardan qaysi biri to'rtburchak shaklini rang bilan to'ldirib chizadi?",
      "options": [
        "`ctx.strokeRect()`",
        "`ctx.drawRect()`",
        "`ctx.fillRect()`",
        "`ctx.rect()`"
      ],
      "correctAnswer": 2,
      "explanation": "`ctx.fillRect()` to'rtburchak chizib, uning ichini joriy `fillStyle` rangi bilan to'ldiradi."
    },
    {
      "id": 8,
      "question": "Canvas chizish holatini (kontekst sozlamalari, ranglar, transformatsiyalar) saqlash va keyinchalik tiklash uchun qaysi metodlar juftligi ishlatiladi?",
      "options": [
        "`ctx.save()` va `ctx.restore()`",
        "`ctx.push()` va `ctx.pop()`",
        "`ctx.backup()` va `ctx.recover()`",
        "`ctx.store()` va `ctx.load()`"
      ],
      "correctAnswer": 0,
      "explanation": "`ctx.save()` joriy kontekst holatini stack-ga saqlaydi, `ctx.restore()` esa oxirgi saqlangan holatni qaytarib tiklaydi."
    },
    {
      "id": 9,
      "question": "Canvasni butunlay tozalash (yoki ma'lum bir qismini o'chirish) uchun qaysi metod ishlatiladi?",
      "options": [
        "`ctx.delete()`",
        "`ctx.erase()`",
        "`ctx.clear()`",
        "`ctx.clearRect()`"
      ],
      "correctAnswer": 3,
      "explanation": "`ctx.clearRect(x, y, width, height)` ko'rsatilgan to'rtburchak sohadagi barcha piksellarni o'chirib tashlaydi (shaffof qora rangga o'tkazadi)."
    },
    {
      "id": 10,
      "question": "Animatsiyani silliq va ekran yangilanish tezligiga (refresh rate) mos ravishda bajarish uchun qaysi brauzer funksiyasidan foydalanish tavsiya etiladi?",
      "options": [
        "`setInterval`",
        "`setTimeout`",
        "`requestAnimationFrame`",
        "`requestIdleCallback`"
      ],
      "correctAnswer": 2,
      "explanation": "`requestAnimationFrame` animatsiyalar uchun maxsus ishlab chiqilgan bo'lib, u keyingi ekran yangilanish kadrida funksiyani chaqiradi, bu esa yuqori unumdorlik va silliq animatsiyani ta'minlaydi."
    },
    {
      "id": 11,
      "question": "Canvasdagi chizilgan rasmni Base64 formatidagi URL ko'rinishida olish uchun qaysi element metodidan foydalaniladi?",
      "options": [
        "`ctx.getImageData()`",
        "`canvas.toDataURL()`",
        "`canvas.toString()`",
        "`ctx.toDataURL()`"
      ],
      "correctAnswer": 1,
      "explanation": "`canvas.toDataURL()` metodi canvasdagi rasmni Base64 satr formatida (masalan, `data:image/png;base64,...`) qaytaradi."
    },
    {
      "id": 12,
      "question": "Canvas va SVG o'rtasidagi asosiy farq nima?",
      "options": [
        "Canvas faqat 3D grafika chizadi, SVG esa faqat 2D grafika chizadi",
        "SVG piksellarga asoslangan (raster), Canvas esa XML teglarga asoslangan (vektor)",
        "Canvas pikselga asoslangan rastrli grafika (JavaScript orqali boshqariladi), SVG esa XML ga asoslangan vektorli grafikadir (DOM elementlari mavjud)",
        "Canvas faqat mobil brauzerlarda, SVG esa faqat desktop brauzerlarda ishlaydi"
      ],
      "correctAnswer": 2,
      "explanation": "Canvas — bu tezkor, pikselli rastr grafika bo'lib, DOM elementlarisiz ishlaydi. SVG esa vektor grafika bo'lib, har bir chizilgan shakl alohida DOM elementi hisoblanadi."
    }
  ]
};

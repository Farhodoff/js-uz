export const binaryData = {
  id: "binaryData",
  title: "Binary Data va File API (Blob, File, FileReader, ArrayBuffer)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Binary Data (Ikilik ma'lumotlar) nima?
Kompyuterlar barcha ma'lumotlarni (matn, audio, rasm, video) faqat ikkilik kodda, ya'ni \`0\` va \`1\`lar ketma-ketligi ko'rinishida saqlaydi. Brauzerda fayllar yuklash, ularni qayta ishlash yoki serverga yuborishda biz ushbu binary ma'lumotlar bilan bevosita ishlashimiz kerak bo'ladi.

Web API-da binary ma'lumotlar bilan ishlash uchun quyidagi asosiy vositalar bor:
1. **Blob (Binary Large Object):** Rasm, video yoki ixtiyoriy fayl ko'rinishidagi o'zgarmas, xom binary ma'lumotlar bloki.
2. **File:** Blob-ning kengaytirilgan turi bo'lib, unga qo'shimcha ravishda fayl nomi, o'lchami va oxirgi o'zgarish sanasi kabi meta-ma'lumotlar qo'shilgan (masalan: \`<input type="file">\` dan olinadigan fayl).
3. **FileReader:** Brauzerda Blob yoki File ichidagi ma'lumotlarni asinxron tarzda o'qish (masalan: rasm faylini Base64 formatidagi string-ga o'tkazib sahifaga chiqarish).
4. **ArrayBuffer va TypedArrays:** Xotiradagi (RAM) binary ma'lumotlar bilan eng pastki (low-level) darajada byte-ma-byte tezkor ishlash uchun ishlatiladigan massivlar.

### Real hayotiy analogiya
Tasavvur qiling, siz **sut mahsulotlari zavodidasiz**:
* **Blob:** Gigant idishdagi xom **sut massasi**. U tayyor mahsulot emas, shunchaki xom ashyo. Uni bo'laklash, o'qish mumkin, lekin to'g'ridan-to'g'ri ishlatib bo'lmaydi.
* **File:** Do'kon vitrinasi uchun qadoqlangan **sut shishasi**. Uning ustida yorliq (fayl nomi = 'Sut', ishlab chiqarilgan sana, hajmi = 1 litr) yopishtirilgan.
* **FileReader:** Sutni tahlil qiluvchi **laborant**. U sut shishasini ochib (asinxron o'qib), uning tarkibini ko'rsatib beradi (masalan: sutingiz 3.2% yog'li matnga aylandi).
* **ArrayBuffer:** Sutning molekulyar darajadagi **kimyoviy formulasi (xotira baytlari)**. Siz molekulalarni qo'lda o'zgartira olasiz (TypedArrays yordamida o'zgartirish).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Blob yaratish va uni yuklab olish)
Matnli ma'lumotlardan jismoniy \`.txt\` fayl yaratib, uni foydalanuvchiga avtomatik yuklab olish (download) imkonini yaratish:
\`\`\`javascript
// 1. Blob yaratish (Matn massivi va uning turi - MIME-type)
const textData = ["Salom, bu brauzerda yaratilgan fayl!"];
const blob = new Blob(textData, { type: 'text/plain' });

// 2. Blob uchun vaqtinchalik URL (havola) yaratish
const fileUrl = URL.createObjectURL(blob);

// 3. Virtual a tegi orqali yuklab olishni imitatsiya qilish
const downloadLink = document.createElement('a');
downloadLink.href = fileUrl;
downloadLink.download = 'salom.txt'; // Yuklanadigan fayl nomi
downloadLink.click();

// 4. Xotirani tozalash uchun URL-ni o'chirib yuborish
URL.revokeObjectURL(fileUrl);
\`\`\`
* **Natija:** Foydalanuvchi kompyuteriga \`salom.txt\` fayli yuklanadi.
* **Qachon ishlatiladi:** Eksport qilish (masalan, CSV yoki JSON hisobotlarni fayl ko'rinishida yuklab olish) tizimlarida.

### 2. Intermediate Example (FileReader bilan rasm preview-ni ko'rsatish)
Foydalanuvchi kompyuteridan rasmni tanlaganda, uni serverga yuklamasdan oldin ekranda ko'rsatish:
\`\`\`javascript
// HTML: <input type="file" id="file-input" /> <img id="preview" />

const fileInput = document.getElementById('file-input');
const previewImg = document.getElementById('preview');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Tanlangan File obyekti
  
  if (file) {
    const reader = new FileReader();
    
    // O'qish tugagach ishga tushadigan hodisa
    reader.onload = (e) => {
      previewImg.src = e.target.result; // Base64 ko'rinishidagi rasm kodi
    };
    
    // Faylni URL formatida o'qish (Base64 DataURL)
    reader.readAsDataURL(file);
  }
});
\`\`\`
* **Qachon ishlatiladi:** Foydalanuvchi profiliga rasm yuklayotganda (Avatar preview).

### 3. Advanced Example (ArrayBuffer va TypedArrays yordamida binary ma'lumot o'zgartirish)
ArrayBuffer ichidagi 4-baytli butun sonlarni TypedArray (Int32Array) yordamida o'zgartirish:
\`\`\`javascript
// 1. Xotiradan 8 bayt joy ajratish
const buffer = new ArrayBuffer(8);

// 2. Ushbu bufer ustida ishlash uchun Int32Array (har bir son 4 bayt) ko'rinishi yaratish
const int32View = new Int32Array(buffer);

// 3. Qiymatlarni yozish
int32View[0] = 42;
int32View[1] = 99;

console.log('Baytlar tuzilishi:', new Uint8Array(buffer));
// Natijada 8 ta alohida baytlar massivi ko'rinadi (42 va 99 sonlari baytga bo'lingan holda)
\`\`\`
* **Qachon ishlatiladi:** Canvas tasvirlarini piksellar darajasida tahrirlashda, audio oqimlarni (Web Audio API) qayta ishlashda yoki WebSockets orqali ikkilik protokollar bilan ishlashda.

### 4. Production Example (Fetch yordamida rasmni Blob sifatida yuklab, sahifaga chiqarish)
Serverdagi rasmni tarmoq orqali yuklab, xavfsiz URL orqali render qilish:
\`\`\`javascript
async function displaySecureImage(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    // Javobni Blob formatida olish
    const imageBlob = await response.blob();
    
    // Blob-dan havola yaratish
    const objectUrl = URL.createObjectURL(imageBlob);
    
    const imgElement = document.createElement('img');
    imgElement.src = objectUrl;
    document.body.appendChild(imgElement);
  } catch (error) {
    console.error('Rasm yuklashda xatolik:', error);
  }
}
\`\`\`
* **Qachon ishlatiladi:** Avtorizatsiya talab qiladigan maxfiy rasmlarni (masalan, token jo'natib olinadigan rasmlarni) yuklash tizimida.

### 5. Enterprise Example (Katta hajmli fayllarni bo'laklab (Chunking) yuklash)
Katta videolarni (masalan 1 GB) bo'laklarga bo'lib (Slice), serverga qismlab yuborish mantiqiy simulyatsiyasi:
\`\`\`javascript
async function uploadLargeFile(file) {
  const CHUNK_SIZE = 1024 * 1024 * 5; // 5 MB bo'lak o'lchami
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    
    // Blob.slice yordamida faylning faqat 5MB qismini qirqib olish (Binary slice)
    const chunk = file.slice(start, end);
    
    // Serverga yuborish
    const formData = new FormData();
    formData.append('file_chunk', chunk);
    formData.append('chunk_index', i);
    
    await fetch('/upload-chunk', {
      method: 'POST',
      body: formData
    });
    
    console.log(\`Bo'lak yuklandi: \${i + 1}/\${totalChunks}\`);
  }
}
\`\`\`
* **Qachon ishlatiladi:** YouTube, Google Drive kabi katta fayllar bilan ishlaydigan bulutli saqlash platformalarida.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Xotira to'lib qolishi (Out of Memory):** Agar 500 MB videoni oddiy matn yoki Base64 ko'rinishida JS xotirasiga o'qisangiz, brauzer qulaydi. \`Blob\` va \`File\` esa fayllarni xotirada emas, diskda saqlaydi va faqat kerakli bo'lagini o'qish imkonini beradi.
* **Tezkor tarmoq aloqasi:** Binary ma'lumotlarni Base64 formatida yuborganda, fayl o'lchami **33% ga kattalashadi**. Uni toza binary formatda yuborish internet trafigini va yuklanish vaqtini tejaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`URL.createObjectURL\` yaratib, uni o'chirishni unutish (Memory Leak)
#### Xato:
Har safar rasm yuklaganda \`URL.createObjectURL(blob)\` chaqirish, lekin \`URL.revokeObjectURL(url)\` qilmaslik.
#### Nima uchun noto'g'ri:
Yaratilgan vaqtinchalik URL-lar sahifa to'liq yangilanmaguncha brauzer xotirasida (RAM) saqlanadi. Bu PWA ilovalarida xotira to'lishiga olib keladi.
#### To'g'ri usul:
Foydalanib bo'lingach, albatta \`URL.revokeObjectURL(objectUrl)\` funksiyasini ishga tushiring.
#### Izoh:
Xotirani tozalash seniorlik belgisidir.

### 2. Katta fayllarni o'qishda \`readAsDataURL\` ni keraksiz ishlatish
#### Xato:
100 MB videoni \`FileReader.readAsDataURL()\` yordamida Base64 matnga o'girish.
#### Nima uchun noto'g'ri:
Ushbu operatsiya brauzerni butunlay qotiradi va xotirani to'ldiradi, natijada sahifa qulaydi.
#### To'g'ri usul:
Katta fayllarni rendering qilish uchun to'g'ridan-to'g'ri \`URL.createObjectURL(file)\` dan foydalanish kerak (bu operatsiya 0.001 soniya oladi).
#### Izoh:
Fayl hajmiga qarab to'g'ri o'qish usulini tanlang.

### 3. ArrayBuffer-ni to'g'ridan-to'g'ri massiv deb o'ylash va qiymat yozish
#### Xato:
\`\`\`javascript
const buffer = new ArrayBuffer(8);
buffer[0] = 5; // XATO! ArrayBuffer-ga bunday yozib bo'lmaydi
\`\`\`
#### Nima uchun noto'g'ri:
ArrayBuffer bu faqat xotira bloki. Undagi ma'lumotlarni boshqarish uchun albatta TypedArray (\`Uint8Array\`, \`Int32Array\`) yoki \`DataView\` kerak.
#### To'g'ri usul:
\`\`\`javascript
const view = new Uint8Array(buffer);
view[0] = 5;
\`\`\`
#### Izoh:
ArrayBuffer faqat qobiq, ko'rinish esa TypedArray hisoblanadi.

### 4. \`FileReader\` asinxronligini hisobga olmaslik
#### Xato:
\`readAsText\` chaqirilgandan so'ng natijani darhol o'qishga urinish:
\`\`\`javascript
const reader = new FileReader();
reader.readAsText(file);
console.log(reader.result); // XATO: Hali o'qish tugamadi (null qaytadi)
\`\`\`
#### To'g'ri usul:
Natijani faqat \`reader.onload\` hodisasi ichida o'qing.

### 5. \`Blob\` va \`File\` o'rtasidagi farqni tushunmaslik
#### Xato:
Fayl yuboriladigan API-ga oddiy yorliqsiz Blob yuborish va backendda fayl nomi yo'qligi sababli xatolik olish.
#### To'g'ri usul:
Blob-ni \`new File([blob], 'filename.jpg')\` ko'rinishida File obyektiga o'rab jo'natish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`Blob\` nima va u \`File\`dan qanday farq qiladi?
   * **Javob:** Blob — xom binary ma'lumotlar bloki. File esa Blob-ga qo'shimcha fayl nomi va sanasi qo'shilgan ko'rinishidir.

2. **Savol:** \`FileReader\` nima uchun ishlatiladi?
   * **Javob:** Brauzerdagi fayl yoki Blob tarkibini matn, binary yoki Base64 formatida asinxron o'qish uchun.

3. **Savol:** \`URL.createObjectURL(blob)\` nima vazifani bajaradi?
   * **Javob:** Blob obyektiga vaqtinchalik to'g'ridan-to'g'ri brauzer havolasini (URL) yaratib beradi.

4. **Savol:** \`<input type="file" />\` dan tanlangan faylni JS-da qanday olish mumkin?
   * **Javob:** Input elementining \`files\` massivi orqali (masalan: \`input.files[0]\`).

### Middle (5–8)
5. **Savol:** \`Base64\` nima va nima uchun binary ma'lumotlarni Base64 orqali yuborish tavsiya etilmaydi?
   * **Javob:** Base64 binary ma'lumotlarni matn ko'rinishiga o'tkazish formati. U fayl hajmini 33% ga oshirgani sababli katta fayllarni yuborishda samarasiz.

6. **Savol:** \`URL.revokeObjectURL(url)\` nima uchun muhim va qachon chaqiriladi?
   * **Javob:** Yaratilgan vaqtinchalik URL-ni xotiradan tozalaydi. Rasm preview bo'lgach yoki yuklab olingach darhol chaqirilishi kerak.

7. **Savol:** \`ArrayBuffer\` nima va u \`TypedArray\`dan qanday farq qiladi?
   * **Javob:** ArrayBuffer faqat jismoniy baytlar joyi, TypedArray esa ushbu baytlarni qanday formatda (son, belgi) o'qish va tahrirlash oynasidir.

8. **Savol:** \`Blob.slice()\` metodi nima uchun ishlatiladi?
   * **Javob:** Katta fayllarni ma'lum bayt o'lchamlari bo'yicha kichik bo'laklarga bo'lish uchun.

### Senior (9–12)
9. **Savol:** \`ArrayBuffer\` ustida ishlashda \`DataView\` va \`TypedArray\` farqi nima va qachon \`DataView\` tanlanadi?
   * **Javob:** TypedArray massiv kabi faqat bitta turdagi sonlarni saqlaydi va platforma arxitekturasiga (Endianness) bog'liq. \`DataView\` esa turli xil turlarni (masalan, bir vaqtda Int8 va Float32) aralash yozish va baytlar tartibini (Big-Endian/Little-Endian) qo'lda boshqarish imkonini beradi.

10. **Savol:** Katta hajmli fayllarni yuklashda (Upload Resume/Chunking) tarmoq uzilishlarini (Network drops) qanday hal qilasiz?
    * **Javob:** Faylni \`slice\` yordamida 5MB li chunklarga bo'lamiz. Har bir chunk yuborilganda serverda muvaffaqiyatli saqlanganini tekshiramiz. Agar tarmoq uzilsa, qolgan indeksdan boshlab yuklashni davom ettiramiz (Resumable Uploads).

11. **Savol:** \`Object URLs\` (\`URL.createObjectURL\`) va \`Data URLs\` (\`FileReader.readAsDataURL\`) xotira va ishlash tezligi (performance) nuqtai nazaridan qanday farqlanadi?
    * **Javob:** Object URL virtual pointer yaratadi (o'ta tez, xotira sarflamaydi). Data URL esa faylni ulkan string matnga aylantiradi (sekin, xotirani 33% ga ko'p egallaydi).

12. **Savol:** Web Audio API yoki Video processing loyihalarida real vaqt rejimida (real-time processing) nima uchun \`Transferable Objects\` ishlatiladi?
    * **Javob:** Web Workers-ga katta ArrayBuffer yuborilganda, xotira nusxalanmaydi (no cloning), balki unga bo'lgan egalik huquqi ikkinchi thread-ga o'tkaziladi (transfer). Bu xotira operatsiyasini 0ms da bajarilishini ta'minlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### E-commerce saytida foydalanuvchilar hisobotini Excel/CSV faylga yuklash
Admin paneldagi "Barcha sotuvlar" jadvalini CSV formatida eksport qilish tugmasini yaratishimiz kerak.

#### Yechim:
\`\`\`javascript
function exportToCSV(data) {
  // 1. Ma'lumotlarni CSV qatorlariga aylantirish
  const csvHeaders = 'ID,Mijoz,Summa\\n';
  const csvRows = data.map(r => \`\${r.id},\${r.customer},\${r.amount}\`).join('\\n');
  const csvContent = csvHeaders + csvRows;
  
  // 2. Blob yaratish
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // 3. Yuklab olish havolasini yaratish
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`sotuvlar_hisoboti_\${new Date().toISOString().slice(0, 10)}.csv\`;
  
  // 4. Trigger click
  document.body.appendChild(a);
  a.click();
  
  // 5. Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Transferable objects:** Web Worker-lar bilan binary ishlaganda har doim transferable obodlardan foydalaning.
* **Stream-lar:** Katta fayllarni yuklashda yoki o'qishda \`ReadableStream\` dan foydalanish xotira yuklamasini sezilarli darajada kamaytiradi.

---

## 10. 📌 Cheat Sheet

| Sinf | Vazifasi | Asosiy Metodlari | Xotira Turi |
| :--- | :--- | :--- | :--- |
| **Blob** | Xom binary ma'lumot | \`slice()\`, \`text()\`, \`arrayBuffer()\` | Disk / RAM pointer |
| **File** | Meta-li Blob | Blob metodlari + \`name\`, \`size\` | Disk |
| **FileReader** | Asinxron o'quvchi | \`readAsDataURL()\`, \`readAsText()\` | RAM vaqtinchalik |
| **ArrayBuffer**| RAM baytlar bloki | \`slice()\` | RAM (qattiq) |
| **TypedArray** | Baytlarni boshqarish | massiv amallari | RAM (moslashuvchan) |
`,
  exercises: [
  {
    "id": 1,
    "title": "Blob Yaratish",
    "instruction": "Kiritilgan matndan (`txt`) `text/plain` turidagi Blob obyektini yaratib qaytaruvchi `createBlobFromText(txt)` funksiyasini yozing.",
    "startingCode": "function createBlobFromText(txt) {\n  // Kodni yozing\n}",
    "hint": "return new Blob([txt], { type: 'text/plain' });",
    "test": "try { const b = createBlobFromText('Salom'); if(!(b instanceof Blob)) return 'Blob yaratilmadi'; if(b.type !== 'text/plain') return 'MIME type text/plain bo\\'lishi shart'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "ArrayBuffer va TypedArray",
    "instruction": "Berilgan `size` o'lchamda `ArrayBuffer` yaratib, uning barcha baytlarini `255` qiymat bilan to'ldirib qaytaruvchi `createFilledBuffer(size)` funksiyasini yozing. To'ldirish uchun `Uint8Array` ko'rinishidan foydalaning.",
    "startingCode": "function createFilledBuffer(size) {\n  // 1. ArrayBuffer yaratish\n  // 2. Uint8Array view yaratish\n  // 3. fill qilish va buferni qaytarish\n}",
    "hint": "const buf = new ArrayBuffer(size); const view = new Uint8Array(buf); view.fill(255); return buf;",
    "test": "try { const buf = createFilledBuffer(4); if(!(buf instanceof ArrayBuffer)) return 'ArrayBuffer qaytmadi'; const view = new Uint8Array(buf); if(view[0] !== 255 || view[3] !== 255) return 'Baytlar 255 bilan to\\'ldirilmagan'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Faylni Matn Sifatida O'qish",
    "instruction": "Fayl obyektini qabul qilib, uning ichidagi matnni `FileReader` yordamida o'qiydigan va matn qiymatini resolve qiladigan Promise qaytaruvchi `readTextFile(file)` funksiyasini yozing.",
    "startingCode": "function readTextFile(file) {\n  return new Promise((resolve, reject) => {\n    // FileReader va readAsText\n  });\n}",
    "hint": "const reader = new FileReader(); reader.onload = (e) => resolve(e.target.result); reader.onerror = () => reject('xato'); reader.readAsText(file);",
    "test": "try { const b = new Blob(['test content'], { type: 'text/plain' }); return readTextFile(b).then(txt => { if(txt !== 'test content') return 'Matn xato o\\'qildi'; return null; }).catch(err => 'Xato: ' + err); } catch(e) { return 'Xato: ' + e.message; }"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Blob (Binary Large Object) nima?",
    "options": [
      "Faqat JSON saqlaydigan xotira obyekti",
      "Rasm, video yoki fayl ko'rinishidagi o'zgarmas, xom binary ma'lumotlar bloki",
      "Matnlarni tekshiruvchi funksiya",
      "JavaScript o'zgaruvchisi"
    ],
    "correctAnswer": 1,
    "explanation": "Blob brauzerda jismoniy fayllar kabi o'zgarmas, xom binary ma'lumotlarni saqlash va boshqarish uchun ishlatiladigan obyektdir."
  },
  {
    "id": 2,
    "question": "File obyekti Blob-dan nimasi bilan farq qiladi?",
    "options": [
      "File faqat MySQL da ishlaydi",
      "Unga qo'shimcha ravishda fayl nomi, hajmi va oxirgi o'zgarish sanasi kabi meta-ma'lumotlar biriktirilgan",
      "File hech qanday joy egallamaydi",
      "File sinxron ishlaydi, Blob esa asinxron"
    ],
    "correctAnswer": 1,
    "explanation": "File obyekti aslida kengaytirilgan Blob hisoblanadi. Unda fayl tizimi talab qiladigan nomi, o'lchami va sanalari saqlanadi."
  },
  {
    "id": 3,
    "question": "FileReader yordamida faylni Base64 formatida o'qish uchun qaysi metod chaqiriladi?",
    "options": ["readAsText()", "readAsArrayBuffer()", "readAsDataURL()", "readAsBinary()"],
    "correctAnswer": 2,
    "explanation": "readAsDataURL() faylni Base64 formatidagi string-ga (Data URL) aylantirib beradi, bu asosan rasmlar preview-si uchun ishlatiladi."
  },
  {
    "id": 4,
    "question": "URL.createObjectURL(blob) yaratgan vaqtinchalik URL-ni xotiradan butunlay tozalash (memory leak oldini olish) uchun qaysi funksiya chaqiriladi?",
    "options": ["URL.deleteObjectURL()", "URL.revokeObjectURL()", "URL.clearObjectURL()", "URL.free()"],
    "correctAnswer": 1,
    "explanation": "URL.revokeObjectURL(url) yaratilgan havola band qilgan xotirani darhol bo'shatib, memory leak xavfini oldini oladi."
  },
  {
    "id": 5,
    "question": "ArrayBuffer nima vazifani bajaradi?",
    "options": [
      "U faqat string-larni saqlaydi",
      "Xotiradagi (RAM) binary ma'lumotlar joylashadigan baytlar blokidir",
      "Rasmlarni dynamic yuklaydi",
      "Tranzaksiyalarni boshqaradi"
    ],
    "correctAnswer": 1,
    "explanation": "ArrayBuffer xotiradan (RAM) aniq bayt o'lchamdagi joy ajratib saqlaydigan xom binary buferdir."
  },
  {
    "id": 6,
    "question": "ArrayBuffer-ga to'g'ridan-to'g'ri qiymat yozib bo'lmaganligi sababli, undagi baytlar bilan ishlash uchun nima ishlatiladi?",
    "options": ["MIME Types", "TypedArrays (masalan Uint8Array) yoki DataView", "JSON.stringify", "FileReader"],
    "correctAnswer": 1,
    "explanation": "ArrayBuffer faqat xotira qobig'i. Undagi baytlar qiymatini yozish yoki o'qish uchun TypedArrays (Uint8Array, Int32Array) yoki DataView oynalaridan foydalaniladi."
  },
  {
    "id": 7,
    "question": "Faylni kichik bo'laklarga (chunking) bo'lib serverga qismlab yuklash uchun qaysi metod ishlatiladi?",
    "options": ["File.split()", "File.slice()", "File.cut()", "File.divide()"],
    "correctAnswer": 1,
    "explanation": "File (yoki Blob) obyektidagi `.slice(start, end)` metodi ko'rsatilgan baytlar oralig'idagi bo'lakni qirqib beradi."
  },
  {
    "id": 8,
    "question": "Nima uchun katta hajmli fayllarni (masalan, 100 MB video) readAsDataURL bilan o'qish tavsiya etilmaydi?",
    "options": [
      "Baza xatolik beradi",
      "Base64 string xotirani to'ldirib, asinxron bo'lsa ham brauzerni qotirishi yoki qulatishi mumkin",
      "U faqat rasmlarni o'qiydi",
      "U serverga yuborishni taqiqlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Base64 o'ta katta string yaratadi. 100MB li fayl xotirada 133MB li stringga aylanadi va RAMni keskin yuklaydi. Buning o'rniga URL.createObjectURL ishlatgan ma'qul."
  },
  {
    "id": 9,
    "question": "Faylni matn (string) shaklida o'qish uchun FileReader-dagi qaysi metod ishlatiladi?",
    "options": ["readAsDataURL()", "readAsText()", "readAsArrayBuffer()", "readAsString()"],
    "correctAnswer": 1,
    "explanation": "readAsText(file) faylni oddiy matnli (UTF-8 matn) string ko'rinishida o'qiydi (masalan txt yoki csv fayllar uchun)."
  },
  {
    "id": 10,
    "question": "Web Workers-ga katta ArrayBuffer yuborilganda nusxa olmasdan (no cloning), xotirani 0ms da o'tkazish nima deyiladi?",
    "options": ["Cloned Objects", "Transferable Objects", "Shared Buffers", "Copied ArrayBuffers"],
    "correctAnswer": 1,
    "explanation": "Transferable Objects mexanizmi ArrayBuffer egaligini to'g'ridan-to'g'ri ikkinchi thread-ga nusxalashlarsiz o'tkazadi (transfer)."
  },
  {
    "id": 11,
    "question": "Base64 formati binary faylni necha foizga kattalashtiradi?",
    "options": ["~10%", "~33%", "~50%", "~100%"],
    "correctAnswer": 1,
    "explanation": "Base64 matnli o'tkazish algoritmi har 3 baytli binaryni 4 ta matn belgisiga aylantiradi, bu esa fayl hajmini qariyb 33 foizga ko'paytiradi."
  },
  {
    "id": 12,
    "question": "Uint8Array TypedArray-da har bir element necha bayt joy egallaydi?",
    "options": ["1 bayt (8 bit)", "2 bayt (16 bit)", "4 bayt (32 bit)", "8 bayt (64 bit)"],
    "correctAnswer": 0,
    "explanation": "Uint8Array (Unsigned Integer 8-bit) har bir elementni 8 bit (ya'ni roppa-rosa 1 bayt) qiymatida saqlaydi."
  }
]

};

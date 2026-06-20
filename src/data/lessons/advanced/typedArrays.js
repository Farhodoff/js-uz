export const typedArrays = {
  title: "Typed Arrays va DataView (Binary Data bilan ishlash)",
  content: `
JavaScript dastlab faqat yuqori darajadagi (high-level) matn va obyektlar bilan ishlashga mo'ljallangan edi. Biroq, WebGL (3D grafika), Audio va Videolarni qayta ishlash, WebSockets orqali qattiq siqilgan binarniy ma'lumotlarni o'qish zarurati paydo bo'lgach, JavaScript-ga **Typed Arrays (Tiplangan massivlar)** qo'shildi.

### 1. ArrayBuffer nima?
Oddiy massiv (\`[]\`) xotirada turli xil ma'lumotlarni (son, satr, obyekt) aralashtirib saqlashi mumkin, shu sababli u juda sekin va xotiradan samarasiz foydalanadi. 
**ArrayBuffer** esa faqat va faqat xotiradan (RAM) ajratilgan toza, jismoniy baytlar ketma-ketligidir (blob). Uning ichiga to'g'ridan-to'g'ri nima yozilganini ko'rib bo'lmaydi.

\`\`\`javascript
// 16 baytlik xotira blokini ajratish (hali bom-bo'sh, 0 lar)
const buffer = new ArrayBuffer(16);

console.log(buffer.byteLength); // 16
\`\`\`

### 2. Typed Array (Xotiraga ko'zgu)
\`ArrayBuffer\` ustida amallar bajarish (unga yozish/o'qish) uchun bizga **TypedArray** (o'qish "ko'zoynagi") kerak. Turli o'lchamdagi ko'zoynaklar mavjud:
* \`Uint8Array\` - Har bir elementi 1 bayt (8 bit) bo'lgan, manfiysiz sonlar (0..255).
* \`Int16Array\` - Har bir elementi 2 bayt (16 bit) bo'lgan butun sonlar.
* \`Float32Array\` - Har bir elementi 4 bayt bo'lgan o'nlik kasr sonlar (WebGL da ko'p ishlatiladi).

\`\`\`javascript
const buffer = new ArrayBuffer(16);

// Buffer ustiga Uint8Array "ko'zoynagini" kiydiramiz:
// 16 bayt = 16 ta Uint8Array elementi (1 baytdan)
const view8 = new Uint8Array(buffer);
view8[0] = 255;
view8[1] = 100;

console.log(view8); // Uint8Array(16) [ 255, 100, 0, 0, 0, ... ]
\`\`\`

**Ayni bitta bufferni turli xil "ko'zoynak" orqali o'qish:**
\`\`\`javascript
const buffer2 = new ArrayBuffer(4); // 4 bayt
const uint8 = new Uint8Array(buffer2); // 4 ta element (4x1)
const uint16 = new Uint16Array(buffer2); // 2 ta element (2x2)
const uint32 = new Uint32Array(buffer2); // 1 ta element (1x4)

uint8[0] = 255; // eng kichik (birinchi) baytni to'ldiramiz
console.log(uint16[0]); // 255 (chunki uint16 ham shu xotirani o'qiyapti)
\`\`\`

### 3. DataView
Agar siz qandaydir fayldan yoki tarmoqdan ma'lumot olayotgan bo'lsangiz, ichida ham 1 baytlik sonlar, ham 4 baytlik kasr sonlar aralash kelishi mumkin. TypedArray bitta butun massivni bitta turga aylantiradi. **DataView** esa bizga xotiraning ixtiyoriy joyidan ixtiyoriy formatni o'qishga imkon beradi.

Bundan tashqari, DataView Endianness (Baytlar qaysi tomondan boshlab o'qilishi: Little-Endian yoki Big-Endian) qoidasini ham nazorat qila oladi.

\`\`\`javascript
const buffer = new ArrayBuffer(8); // 8 bayt
const view = new DataView(buffer);

// 0-indeksdan boshlab 1 bayt yozamiz
view.setInt8(0, 10); 
// 1-indeksdan boshlab 4 baytlik (32bit) son yozamiz
view.setInt32(1, 1024);

// Ularni joylashgan joyidan qayta o'qish
console.log(view.getInt8(0)); // 10
console.log(view.getInt32(1)); // 1024
\`\`\`

### Xulosa
Oddiy web sayt yasashda Typed Arrays deyarli kerak bo'lmaydi. Lekin siz:
* Rasmlarni qayta ishlash (Canvas Pixel manipulation),
* Ovoz bilan ishlash (AudioContext),
* O'yin yaratish (WebGL),
* Yoki shifrlash (Cryptography) va tarmoq trafigini siqish (WebSockets binarniy) 
bilan shug'ullansangiz, ular dasturning tezligini yuzlab barobarga oshirib beradi.
  `,
  exercises: [
    {
      id: "typed-1",
      title: "Uint8Array Yaratish",
      description: `Uzunligi 5 bo'lgan Uint8Array yarating va uni to'g'ridan-to'g'ri (bufer ajratmasdan) return qiling.`,
      initialCode: `function createTypedArray() {
  // Uint8Array dan foydalaning
  
}`,
      solution: `function createTypedArray() {
  return new Uint8Array(5);
}`,
      tests: [
        {
          test: `
          const arr = createTypedArray();
          return arr instanceof Uint8Array && arr.length === 5;`,
          description: "5 uzunlikdagi Uint8Array qaytarishi kerak"
        }
      ]
    }
  ]
};

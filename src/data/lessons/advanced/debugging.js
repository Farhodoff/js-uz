export const debugging = {
  id: "a7",
  title: "Debugging (Xatolarni topish va tuzatish)",
  theory: `## Debugging – Professional dasturchi mahorati

**Debugging** – dasturdagi xatolarni (bug) aniqlash, tahlil qilish va ularni bartaraf etish jarayoni. Professional dasturchi vaqtining 50-70% qismi aynan debugging bilan o'tadi.

---

### 1. Xatolik turlari
- **Syntax Errors:** Kod yozish qoidalarining buzilishi (masalan, qavs yopilmasligi). Brauzer kodni o'qishdayoq aniqlaydi.
- **Runtime Errors:** Kod bajarilayotgan paytda yuz beradigan xatolar (masalan, mavjud bo'lmagan funksiyani chaqirish).
- **Logic Errors:** Kod ishlaydi, xatolik chiqmaydi, lekin natija noto'g'ri bo'ladi. Eng qiyin topiladigan xatolar.

### 2. Console metodlari (Faqat log emas!)
- \`console.table()\`: Massiv yoki obyektlarni jadval ko'rinishida chiqarish.
- \`console.error()\` / \`console.warn()\`: Xato va ogohlantirishlarni alohida rangda chiqarish.
- \`console.time()\` / \`console.timeEnd()\`: Kod qancha vaqtda bajarilishini o'lchash.
- \`console.trace()\`: Funksiya qayerdan chaqirilganini (Call Stack) ko'rish.

### 3. "debugger" va Brauzer DevTools
Kodingizning istalgan joyiga \`debugger;\` so'zini yozsangiz, brauzer o'sha satrda kodni to'xtatadi.
- **Sources Tab:** Brauzerda breakpointlar qo'yish, o'zgaruvchilar qiymatini qadam-baqadam kuzatish.
- **Watch:** Ma'lum bir o'zgaruvchini doimiy kuzatib turish.
- **Call Stack:** Funksiyalar zanjirini ko'rish.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Debugging nima?**
2. **console.log va debugger o'rtasidagi farq nima?**
3. **Sinxron va asinxron kodni debug qilishda qanday farq bor?**

### Middle daraja
4. **"Rubber Duck Debugging" (Kauchuk o'rdak usuli) nima?**
5. **Memory Leak (xotira sizishi) qanday aniqlanadi?**
6. **Breakpoint turlari (Conditional, Logpoint) haqida gapiring.**`,
  task: `// 1. console.table yordamida quyidagi foydalanuvchilar massivini chiqaring.
const users = [{id: 1, name: "Ali"}, {id: 2, name: "Vali"}];

// 2. console.time yordamida 1 milliongacha bo'lgan sonlar yig'indisini hisoblash qancha vaqt olishini o'lchang.

// 3. Quyidagi mantiqiy xatoni 'debugger' yordamida toping va tuzating. 
// Funksiya massivdagi eng katta sonni topishi kerak.
function findMax(arr) {
  let max = 0; // Bu yerda mantiqiy xato bo'lishi mumkin (manfiy sonlar bo'lsa-chi?)
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
// console.log(findMax([-10, -5, -2])); 

// 4. console.trace yordamida funksiya qaysi zanjir orqali chaqirilayotganini tekshiring.`,
  hint: `// 3. Max logic fix
function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0]; // Birinchi elementdan boshlash xavfsizroq
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] > max) max = arr[i];
  }
  return max;
}

// 2. Timer
console.time("SumTimer");
// loop...
console.timeEnd("SumTimer");`
};

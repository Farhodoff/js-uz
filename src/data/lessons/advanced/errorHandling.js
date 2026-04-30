export const errorHandling = {
  id: "a5",
  title: "Error Handling (Xatoliklarni boshqarish)",
  theory: `## Error Handling (Xatoliklarni boshqarish)

JavaScriptda xatoliklar kod bajarilishini to‘xtatib qo‘ymasligi uchun \`try...catch...finally\` va \`throw\` ishlatiladi.

---

### 1. try...catch...finally
\`\`\`javascript
try {
  // xatolik yuz berishi mumkin bo‘lgan kod
  JSON.parse("{ invalid }");
} catch (err) {
  console.log("Xato:", err.message);
} finally {
  console.log("Har doim ishlaydi");
}
\`\`\`

### 2. Error turlari
- **ReferenceError:** E’lon qilinmagan o‘zgaruvchi.
- **TypeError:** Qiymat turi noto‘g‘ri (masalan, \`null.toString()\`).
- **SyntaxError:** Sintaksis xato.
- **RangeError:** Qiymat diapazondan tashqarida.

### 3. throw – Xatolikni tashlash
Dasturchi o‘zi xohlagan joyda xatolikni yuzaga keltirishi mumkin.
\`\`\`javascript
function checkAge(age) {
  if (age < 0) throw new Error("Yosh manfiy bo'lmasin!");
}
\`\`\`

### 4. Asinxron xatoliklar
Asinxron kodda (\`setTimeout\`) \`try...catch\` to'g'ridan-to'g'ri ishlamaydi. Uni \`await\` yoki \`.catch()\` bilan ishlatish kerak.
\`\`\`javascript
async function getData() {
  try {
    let res = await fetch(url);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **try...catch nima uchun kerak?**
2. **finally bloki qachon ishlaydi?**
3. **throw orqali nimalarni tashlash (throw) mumkin?**

### Middle daraja
4. **setTimeout ichidagi xatoni tashqaridagi try...catch bilan tutish mumkinmi?**
5. **Promise reject bo'lganda try...catch ishlaydimi?**
6. **Custom Error klassini qanday yaratish mumkin?**`,
  task: `// 1. JSON.parse ni try...catch bilan o'rab, xato bo'lsa "Xato format" deb xabar chiqaring.
// 2. Funksiya yozing: unga son berilmasa TypeError tashlasin (throw).
// 3. O'zingizning "ValidationError" klassingizni yarating.
// 4. async funksiya ichida fetch so'rovini try...catch bilan boshqaring.
// 5. finally blokida yuklash indikatori tugaganini bildiruvchi xabar chiqaring.

// Kodingizni shu yerga yozing`,
  hint: `// 1. JSON parse
try { JSON.parse("invalid"); } catch(e) { console.log("Xato format"); }

// 2. Custom throw
function onlyNumber(n) {
  if (typeof n !== "number") throw new TypeError("Faqat son!");
}

// 3. ValidationError
class ValidationError extends Error {
  constructor(m) { super(m); this.name = "ValidationError"; }
}

// 4. Async catch
async function test() {
  try { await fetch("invalid-url"); } catch(e) { console.log("Tarmoq xatosi"); }
}`
};

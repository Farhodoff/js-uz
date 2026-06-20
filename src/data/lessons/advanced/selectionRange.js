export const selectionRange = {
  title: "Selection va Range API",
  content: `
JavaScript orqali foydalanuvchi sichqoncha bilan belgilagan (highlight qilgan) matnlarni boshqarish, o'qish va hatto dastur orqali yangi matnlarni belgilash mumkin. Bularning barchasi **Selection** va **Range** API'lari orqali amalga oshiriladi.

### 1. Selection obyekti
Foydalanuvchi ekrandagi matnni belgilaganda (masalan, nusxalash uchun), uni \`window.getSelection()\` orqali olishimiz mumkin.

\`\`\`javascript
// Foydalanuvchi belgilagan matnni konsolga chiqarish
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const text = selection.toString();
  
  if (text.length > 0) {
    console.log("Siz buni belgiladingiz: ", text);
  }
});
\`\`\`

### 2. Range obyekti nima?
**Range** (Oraliq) — bu hujjatning boshlanish va tugash nuqtalari bilan chegaralangan bir qismi. Bitta Selection ichida bir nechta Range bo'lishi mumkin (lekin ko'p brauzerlarda har doim bitta bo'ladi).

Range obyektini Selection'dan ajratib olish:
\`\`\`javascript
const selection = window.getSelection();
if (selection.rangeCount > 0) {
  const range = selection.getRangeAt(0); // Eng birinchi (va odatda yagona) oraliq
  console.log(range);
}
\`\`\`

### 3. Matnni dastur orqali belgilash (Select)
Siz qandaydir tugma bosilganda HTML ichidagi biror so'zni avtomatik belgilab qo'yishni xohlasangiz, yangi Range yaratib, uni Selection'ga qo'shishingiz kerak.

\`\`\`html
<p id="myParagraph">Salom, bu matnni JS orqali belgilaymiz!</p>
\`\`\`

\`\`\`javascript
const p = document.getElementById("myParagraph");

// 1. Yangi bo'sh Range yaratamiz
const range = document.createRange();

// 2. Paragrafning barcha mazmunini qamrab olamiz
range.selectNodeContents(p);

// 3. Joriy Selection'ni tozalab, o'zimiznikini qo'shamiz
const selection = window.getSelection();
selection.removeAllRanges(); // Avvalgi belgilashlarni tozalash
selection.addRange(range);   // Yangisini qo'shish
\`\`\`

### 4. Range orqali DOM-ni o'zgartirish
Oraliqdagi (Range) matnni nafaqat o'qish, balki uning ustida amallar bajarish ham mumkin. Bu aynan "Rich Text Editor"lar (masalan, Microsoft Word'ning web versiyasi) qanday ishlashining siridir.

**Belgilangan matnni sariq fonda ko'rsatish (Highlight):**
\`\`\`javascript
function highlightSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  
  // Yangi <span> element yaratamiz
  const span = document.createElement("span");
  span.style.backgroundColor = "yellow";
  
  // Range ichidagi matnni span ichiga o'rab qo'yamiz
  range.surroundContents(span);
}
\`\`\`
*(Eslatma: surroundContents faqat oraliq bitta matn tuguni ichida bo'lsa yaxshi ishlaydi)*

### Xulosa
Selection va Range API — DOM-dagi oddiy matnlarni faol va interaktiv qismlarga aylantirish, redaktorlar yasash va "Nusxalash uchun belgilang" kabi xususiyatlarni yaratish uchun beminnat yordamchidir.
  `,
  exercises: [
    {
      id: "range-1",
      title: "Elementni belgilash",
      description: `Funksiya DOM elementini qabul qiladi. Uni Range yordamida to'liq belgilashi (selectNodeContents) va Selection'ga qo'shishi kerak.`,
      initialCode: `function selectElementText(element) {
  // 1. window.getSelection() va document.createRange() yarating
  
  // 2. elementni range'ga o'rang
  
  // 3. avvalgi range'larni tozalab, yangisini qo'shing
  
}`,
      solution: `function selectElementText(element) {
  const selection = window.getSelection();
  const range = document.createRange();
  
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}`,
      tests: [
        {
          test: `
          let removed = false;
          let added = false;
          const fakeSelection = {
            removeAllRanges: () => removed = true,
            addRange: (r) => { if(r.node === "TEST") added = true; }
          };
          window.getSelection = () => fakeSelection;
          document.createRange = () => ({
            selectNodeContents: function(el) { this.node = el; }
          });
          selectElementText("TEST");
          return removed && added;`,
          description: "removeAllRanges() va addRange() to'g'ri chaqirilishi kerak"
        }
      ]
    }
  ]
};

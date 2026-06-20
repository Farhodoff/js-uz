export const dragAndDrop = {
  title: "HTML5 Drag and Drop API",
  content: `
HTML5 bilan web-sahifalardagi elementlarni sichqoncha orqali ushlab (Drag) boshqa joyga tashlash (Drop) imkoniyati paydo bo'ldi. JavaScript Drag and Drop API yordamida interaktiv interfeyslar (masalan, Trello kabi boardlar, fayl yuklash darchalari) yaratish mumkin.

### 1. Elementni "Draggable" qilish
Elementni tortib olish mumkin bo'lishi uchun, HTML-da unga \`draggable="true"\` atributi qo'shilishi kerak.

\`\`\`html
<div id="item" draggable="true" style="width: 100px; height: 100px; background: red;">
  Meni ushla!
</div>
<div id="zone" style="width: 200px; height: 200px; border: 2px dashed black;">
  Shu yerga tashla
</div>
\`\`\`

### 2. Drag (Tortish) hodisalari
Siz ushlab tortayotgan elementda quyidagi hodisalar ro'y beradi:
* \`dragstart\` – Foydalanuvchi elementni ushlab tortishni boshlaganda.
* \`drag\` – Element tortilayotgan paytda (doimiy ishlaydi).
* \`dragend\` – Foydalanuvchi sichqonchani qo'yib yuborganida.

\`\`\`javascript
const item = document.getElementById("item");

item.addEventListener("dragstart", (e) => {
  // O'zimiz bilan ma'lumot olib ketamiz
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.style.opacity = "0.5";
});

item.addEventListener("dragend", (e) => {
  e.target.style.opacity = "1";
});
\`\`\`

### 3. Drop (Tashlash) hodisalari
Element tashlanishi kutilayotgan hududda (Drop Zone) quyidagi hodisalar ro'y beradi:
* \`dragenter\` – Tortilayotgan element hududga kirganda.
* \`dragover\` – Tortilayotgan element hudud ustida harakatlanganda.
* \`dragleave\` – Element hududdan chiqib ketganda.
* \`drop\` – Element hudud ichiga tashlanganda.

**Muhim qoida:** Elementni boshqa joyga tashlashga ruxsat berish uchun \`dragover\` hodisasida standart harakatni (default action) to'xtatish shart!

\`\`\`javascript
const zone = document.getElementById("zone");

zone.addEventListener("dragover", (e) => {
  // Drop qilishga ruxsat berish uchun default behavior'ni to'xtatamiz
  e.preventDefault(); 
  zone.style.background = "#f0f0f0";
});

zone.addEventListener("dragleave", (e) => {
  zone.style.background = "transparent";
});

zone.addEventListener("drop", (e) => {
  e.preventDefault();
  zone.style.background = "transparent";
  
  // Olib kelingan ma'lumotni o'qiymiz
  const data = e.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(data);
  
  // Elementni yangi joyga ko'chiramiz
  zone.appendChild(draggedElement);
});
\`\`\`

### 4. dataTransfer obyekti
Drag and Drop jarayonida elementdan elementga ma'lumot uzatish uchun \`e.dataTransfer\` ishlatiladi.
* \`setData(format, ma'lumot)\` – Drag boshlanganda ma'lumotni xotiraga yozish.
* \`getData(format)\` – Drop bo'lganda o'sha ma'lumotni o'qib olish.

### Xulosa
HTML5 Drag and Drop - bu brauzerning ichki tizimi. Undan nafaqat DOM elementlarini, balki foydalanuvchi kompyuteridan fayllarni (rasm, PDF) brauzerga tortib kirgazish uchun ham foydalanish mumkin!
  `,
  exercises: [
    {
      id: "dnd-1",
      title: "Drop qilishga ruxsat berish",
      description: `Sizda \`zone\` obyekti bor deylik. U Drop Zone (Tashlash hududi) bo'lishi uchun u qaysi hodisani to'xtatishi kerak? Berilgan kodda o'sha hodisa funksiyasini yozing.`,
      initialCode: `function makeDropZone(element) {
  element.addEventListener("___", (e) => {
    // kodingizni yozing
    
  });
}`,
      solution: `function makeDropZone(element) {
  element.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}`,
      tests: [
        {
          test: `
          let called = false;
          let prevented = false;
          const fakeEl = {
            addEventListener: (evt, cb) => {
              if(evt === "dragover") {
                called = true;
                cb({ preventDefault: () => prevented = true });
              }
            }
          };
          makeDropZone(fakeEl);
          return called && prevented;`,
          description: "dragover hodisasini ushlab, preventDefault() chaqirilishi kerak"
        }
      ]
    }
  ]
};

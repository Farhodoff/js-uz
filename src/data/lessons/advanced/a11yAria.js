export const a11yAria = {
  title: "Accessibility (A11y) va ARIA DOM",
  content: `
**Accessibility (Qulaylik/Kirish imkoniyati)**, qisqacha **A11y** (A va y orasida 11 ta harf) — bu veb-saytni barcha foydalanuvchilar, jumladan, ko'rish, eshitish yoki harakat qilishda nuqsoni bor insonlar uchun qulay qilib yaratish. JavaScript dasturchilari o'zlarining yasagan maxsus komponentlari (modal, dropdown, tablar) hamma uchun ishlashini ta'minlashi shart.

### 1. Fokusni boshqarish (Focus Management)
Klaviaturadan foydalanuvchi insonlar (sichqoncha ishlata olmaydiganlar) saytda \`Tab\` tugmasi orqali harakatlanishadi. JS orqali oynalar ochilganda ularning fokusini to'g'ri boshqarish kerak.

\`\`\`javascript
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
  // Modal ochilganda uning ichidagi yopish tugmasiga fokusni avtomatik yo'naltirish
  closeBtn.focus();
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  // Modal yopilganda fokusni yana uni ochgan tugmaga qaytarish!
  openBtn.focus();
});
\`\`\`

### 2. tabindex atributi
Agar siz qandaydir oddiy \`<div>\` yoki \`<span>\` ni bosiladigan (tugma) qilib qo'ysangiz, unga \`Tab\` tugmasi orqali borib bo'lmaydi. Buni to'g'irlash uchun \`tabindex\` ishlatiladi.

* \`tabindex="0"\` – Elementga klaviatura orqali fokus qaratish mumkin.
* \`tabindex="-1"\` – Elementga Tab orqali o'tib bo'lmaydi, lekin uni JavaScript orqali \`.focus()\` qilsa bo'ladi.

\`\`\`html
<!-- Yomon: Bu "tugma" ga klaviatura orqali borib bo'lmaydi -->
<div onclick="doSomething()">Tasdiqlash</div>

<!-- Yaxshi: tabindex qo'shilgan -->
<div tabindex="0" onclick="doSomething()" onkeydown="handleEnter(event)">
  Tasdiqlash
</div>
\`\`\`
*Izoh: Yaxshisi har doim mos semantik teglarni (\`<button>\`, \`<a>\`) ishlating. Shunda bunga hojat qolmaydi.*

### 3. WAI-ARIA nima?
**ARIA (Accessible Rich Internet Applications)** — HTML-da mavjud bo'lmagan, lekin maxsus (JS orqali yozilgan) komponentlarning vazifasini ekranni o'qib beruvchi dasturlarga (Screen Readers) tushuntirish uchun ishlatiladigan atributlar to'plami.

Masalan, JS orqali o'zingiz chiroyli Checkbox yasadingiz deylik, lekin brauzer uni shunchaki qandaydir shakl (div) deb tushunadi.

\`\`\`html
<div class="custom-checkbox" id="chk1" role="checkbox" aria-checked="false" tabindex="0">
  Tanlash
</div>
\`\`\`

### 4. JS orqali ARIA'ni boshqarish
Foydalanuvchi yuqoridagi Custom Checkbox-ni bosganda, faqat uning dizayni emas, ARIA atributi ham o'zgarishi kerak!

\`\`\`javascript
const checkbox = document.getElementById("chk1");

function toggleCheckbox() {
  // Hozirgi holatni o'qish
  const isChecked = checkbox.getAttribute("aria-checked") === "true";
  
  // Yangi holatni yozish
  checkbox.setAttribute("aria-checked", !isChecked);
  
  // Dizaynni o'zgartirish
  checkbox.classList.toggle("checked", !isChecked);
}

// Sichqoncha uchun
checkbox.addEventListener("click", toggleCheckbox);

// Klaviatura (Space yoki Enter) uchun
checkbox.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault(); // Sahifa pastga tushib ketmasligi uchun
    toggleCheckbox();
  }
});
\`\`\`

### 5. Eng kerakli ARIA atributlar:
* \`aria-hidden="true"\` – Elementni Screen Reader ko'rmasligi uchun yashirish.
* \`aria-expanded="true/false"\` – Akkordeon yoki Dropdown ochilgan/yopilganini bildirish.
* \`aria-live="polite"\` – Agar sahifada qandaydir xato yoki xabar o'z-o'zidan paydo bo'lsa (masalan, Toaster notification), uni Screen Reader avtomatik o'qib eshittirishi uchun.

### Xulosa
JavaScript-da UI (Interfeys) yasayotganda nafaqat sichqoncha, balki klaviatura orqali ham barcha harakatlarni bajarish imkoniyati borligiga va holat o'zgarganda DOM atributlari (ARIA) ham mos ravishda o'zgarishiga ishonch hosil qiling!
  `,
  exercises: [
    {
      id: "aria-1",
      title: "ARIA atributni o'zgartirish",
      description: `Akkordeon bosilganda, ochilgan yoki yopilganiga qarab uning 'aria-expanded' atributini to'g'rilab qo'yuvchi funksiya yozing.`,
      initialCode: `function toggleAccordion(buttonElement, isExpanded) {
  // isExpanded true/false boolean qiymat
  // buttonElement'ning aria-expanded atributiga isExpanded'ni string formatida o'rnating.
  
}`,
      solution: `function toggleAccordion(buttonElement, isExpanded) {
  buttonElement.setAttribute("aria-expanded", String(isExpanded));
}`,
      tests: [
        {
          test: `
          const el = {
            attrs: {},
            setAttribute(k, v) { this.attrs[k] = v; }
          };
          toggleAccordion(el, true);
          const t1 = el.attrs["aria-expanded"] === "true";
          toggleAccordion(el, false);
          const t2 = el.attrs["aria-expanded"] === "false";
          return t1 && t2;`,
          description: "setAttribute() string 'true' yoki 'false' bilan chaqirilishi kerak"
        }
      ]
    }
  ]
};

export const jsWhat = {
  id: "b0",
  title: "Kirish va muhit",
  theory: `## 1. JAVASCRIPT NIMA?
JavaScript (JS) — bu dunyodagi eng mashhur dasturlash tillaridan biri. U asosan veb-saytlarni "jonlantirish" uchun ishlatiladi. 

Agar veb-saytni inson tanasiga o'xshatsak:
- **HTML** — bu suyaklar (tuzilma).
- **CSS** — bu teri va kiyimlar (ko'rinish).
- **JavaScript** — bu asab tizimi va harakatlar (miya).

### Nega aynan JavaScript?
1. **Har qayerda ishlaydi:** Brauzerlar, serverlar (Node.js), mobil ilovalar va hatto robotlarda.
2. **Katta hamjamiyat:** Muammo bo'lsa, javobini topish oson.
3. **Boshlash oson:** Hech narsa o'rnatmasdan, brauzerning o'zida yozishni boshlash mumkin.

---

## 2. ISHLASH MUHITI

Kodingizni sinash uchun asosan ikki xil joydan foydalanamiz:

### A. Brauzer Konsoli (Console)
Bu eng tezkor usul. Brauzerda (Chrome, Firefox) sichqonchaning o'ng tugmasini bosib **"Inspect" (Tekshirish)** ni tanlang va **"Console"** bo'limiga o'ting.

### B. Kod muharriri (VS Code)
Katta loyihalar uchun \`.js\` kengaytmali fayllar ochib, ularni HTML ga ulaymiz:
\`\`\`html
<script src="script.js"></script>
\`\`\`

---

## 3. ASOSIY KOMANDALAR

### console.log() — Sizning eng yaqin do'stingiz
Bu komanda ma'lumotlarni konsolga (ekranga) chiqarish uchun ishlatiladi. Xuddi kompyuterga "Menga mana buni ko'rsat" degandek gap.

\`\`\`javascript
console.log("Salom, Dunyo!"); // Matn chiqarish
console.log(10 + 20);        // Hisob-kitob natijasini chiqarish
\`\`\`

\`\`\`mermaid
graph LR
    A[Sizning kodingiz] --> B(Interpreter)
    B --> C[Konsol / Ekran]
    style B fill:#f9f,stroke:#333,stroke-width:2px
\`\`\`

---

## 4. XATOLAR BILAN ISHLASH
Dasturlashda xato qilish — bu darsning bir qismi. Agar konsolda qizil yozuv paydo bo'lsa, qo'rqmang! U sizga qayerda va qanday xato borligini aytadi.

**Masalan:** \`console.lag("Xato")\` deb yozsangiz, JS \`lag\` degan narsani tanimasligini aytadi (**TypeError**).

---

## 5. INTERVYU SAVOLLARI (Junior)

1. **JS faqat brauzerda ishlaydimi?**
   *Javob:* Yo'q, Node.js yordamida serverda va boshqa qurilmalarda ham ishlaydi.

2. **console.log nima uchun kerak?**
   *Javob:* Kodning qaysi qismi qanday ishlayotganini ko'rish va xatolarni topish (debug) uchun.

3. **HTML ichida JS qanday ulanadi?**
   *Javob:* \`<script>\` tegi orqali.`,
  exercises: [
    {
      id: 1,
      title: "Birinchi Salom",
      instruction: "Konsolga 'Salom JS' matnini chiqaring.",
      startingCode: "// Kodingizni shu yerga yozing\n",
      hint: 'console.log("Salom JS");',
      test: "if (logs.includes('Salom JS')) return null; return 'Konsolga \"Salom JS\" deb yozishingiz kerak';"
    },
    {
      id: 2,
      title: "Matematika",
      instruction: "Konsolga 50 va 100 ning yig'indisini chiqaring.",
      startingCode: "console.log();",
      hint: "console.log(50 + 100);",
      test: "if (logs.includes('150')) return null; return 'Natija 150 bo\\'lishi kerak';"
    }
  ]
};

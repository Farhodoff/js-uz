export const domPerformance = {
  title: "DOM Performance: Reflow va Repaint",
  content: `
Dinamik web-ilovalarda tezlik va unumdorlik (Performance) juda muhim. JavaScript orqali DOM-ni tez-tez o'zgartirish sahifa qotishiga yoki batareyani ko'p iste'mol qilishiga olib keladi. Buni tushunish uchun brauzer qanday ishlashini bilishimiz kerak.

### 1. Critical Rendering Path (Kritik Renderlash Yo'li)
Brauzer sahifani ekranga chiqarish uchun quyidagi qadamlarni bajaradi:
1. **DOM Tree** (HTML parse qilinadi).
2. **CSSOM Tree** (CSS parse qilinadi).
3. **Render Tree** (DOM va CSSOM birlashadi, faqat ko'rinadigan elementlar qoladi, masalan \`display: none\` tushib qoladi).
4. **Layout (Reflow)** (Har bir elementning aniq joylashuvi va o'lchami hisoblanadi).
5. **Paint (Repaint)** (Elementlarning piksellari chiziladi: ranglar, soyalar, rasmlar).
6. **Composite** (Chizilgan qatlamlar - layers - birlashtirilib ekranga yuboriladi).

### 2. Reflow (Yoki Layout)
Reflow – bu brauzer elementlarning geometriyasini (kengligi, balandligi, joylashuvi) qayta hisoblab chiqish jarayoni. Bu **eng og'ir va qimmat** operatsiya hisoblanadi.
**Nimalar Reflow chaqiradi?**
- Oyna (window) o'lchamining o'zgarishi (Resize).
- Elementning geometrik xususiyatlarini o'zgartirish (width, height, padding, margin, border).
- Elementni DOM-ga qo'shish yoki olib tashlash.
- Element geometriyasini o'qish (masalan, \`offsetWidth\`, \`clientHeight\`, \`getComputedStyle\`). Chunki aniq qiymatni berish uchun brauzer darhol (sinxron ravishda) Reflow qilishga majbur bo'ladi!

### 3. Repaint
Repaint – bu elementning ko'rinishi o'zgarganda (lekin o'lchami va joylashuvi o'zgarmaganda) yuz beradigan jarayon. Bu Reflow-ga nisbatan yengilroq.
**Nimalar Repaint chaqiradi?**
- \`color\`, \`background-color\`, \`box-shadow\`, \`visibility\` o'zgarishi.

### 4. Layout Thrashing (Layout isrofgarchiligi)
Javascriptda ketma-ket DOM-ni o'qish va yozish jarayoni brauzerni har safar qayta-qayta Reflow qilishga majbur etadi. Bu **Layout Thrashing** deyiladi.

**Yomon amaliyot:**
\`\`\`javascript
const box = document.getElementById('box');
// Kenglikni o'qiymiz (Reflow) va o'zgartiramiz
const newWidth = box.offsetWidth + 10;
box.style.width = newWidth + 'px'; 
// Yana o'qiymiz (Reflow!) va o'zgartiramiz
const newHeight = box.offsetHeight + 10; 
box.style.height = newHeight + 'px';
\`\`\`

**Yaxshi amaliyot (O'qish va Yozishni guruhlash):**
\`\`\`javascript
const box = document.getElementById('box');
// Oldin faqat o'qiymiz (Guruhlash)
const currWidth = box.offsetWidth;
const currHeight = box.offsetHeight;

// Keyin faqat yozamiz (Bir martalik Reflow)
box.style.width = (currWidth + 10) + 'px';
box.style.height = (currHeight + 10) + 'px';
\`\`\`

### 5. DocumentFragment orqali optimallashtirish
Ko'p elementlarni DOM-ga qo'shish kerak bo'lganda, ularni bittalab qo'shish o'rniga \`DocumentFragment\` dan foydalanish tavsiya etiladi. Fragment xotirada joylashgan kichik "soxta DOM" bo'lib, unga qilingan o'zgarishlar haqiqiy DOM-ga ta'sir qilmaydi va Reflow chaqirmaydi.

\`\`\`javascript
const list = document.getElementById("myList");
const fragment = document.createDocumentFragment();

// 1000 ta elementni fragmentga qo'shamiz (Reflow umuman bo'lmaydi)
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}

// Fragmentni haqiqiy DOM-ga qo'shamiz (Faqat 1 marta Reflow bo'ladi!)
list.appendChild(fragment);
\`\`\`

### 6. Xulosa
- Iloji boricha Reflow chaqiruvchi usullardan qoching.
- Animatsiyalar uchun \`margin\` yoki \`top/left\` o'rniga \`transform: translate()\` dan foydalaning (bu faqat Composite qadamini chaqiradi va GPU-da ishlaydi).
- Ko'p element qo'shganda doim \`DocumentFragment\` ishlating.
  `,
  exercises: [
    {
      id: "dom-perf-1",
      title: "DocumentFragment bilan ishlash",
      description: `Berilgan so'zlar massivi asosida <li> elementlar yaratib, ularni xotiradagi DocumentFragment ichiga yig'uvchi va o'sha fragmentni qaytaruvchi \`createOptimizedList\` funksiyasini tuzing.`,
      initialCode: `function createOptimizedList(words) {
  // DocumentFragment yarating
  
  // words massividagi har bir so'z uchun li yarating va fragmentga qo'shing
  
  // fragmentni qaytaring
}`,
      solution: `function createOptimizedList(words) {
  const fragment = document.createDocumentFragment();
  words.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    fragment.appendChild(li);
  });
  return fragment;
}`,
      tests: [
        {
          test: `const frag = createOptimizedList(["Apple", "Banana"]);
          return frag.nodeType === 11 && frag.childNodes.length === 2 && frag.childNodes[0].textContent === "Apple";`,
          description: "Funksiya DocumentFragment (nodeType 11) qaytarishi va ichida kerakli li elementlar bo'lishi kerak"
        }
      ]
    }
  ]
};

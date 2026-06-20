export const scrollingApis = {
  title: "Scrolling API: Silliq Harakat va Skroll o'lchovlari",
  content: `
JavaScript DOM orqali nafaqat elementlar o'lchamini, balki ularning sahifadagi qaysi qismini ko'rib turganimizni (Scroll) boshqarishimiz mumkin. Bu ayniqsa "Tepaga qaytish" tugmalari, "Infinite Scroll" (cheksiz skroll) va "Silliq siljish" (Smooth Scroll) lar uchun zarur.

### 1. Elementni Ko'z oldiga olib kelish (scrollIntoView)
Agar sahifaning pastki qismidagi biror formaga yoki elementga foydalanuvchi e'tiborini qaratmoqchi bo'lsangiz, uni JS orqali "kadrga" olib kirishingiz mumkin.

\`\`\`javascript
const footer = document.getElementById("footer");

// Oddiy sakrash
// footer.scrollIntoView();

// Silliq (animatsiya bilan) siljish
footer.scrollIntoView({ 
  behavior: "smooth", 
  block: "center" // Elementni ekran o'rtasiga qo'yish
});
\`\`\`

### 2. Oyna qanchalik skroll bo'lganini bilish
Foydalanuvchi sahifani qancha pastga tushirganini bilish uchun \`window.scrollY\` ishlatiladi. Bu "Sticky" navbar (menyu tepada qotib qolishi) uchun juda kerak.

\`\`\`javascript
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    console.log("Sahifa 200px dan ko'proq pastga tushdi!");
    // Navbar ga 'sticky' klassini qo'shishingiz mumkin
  }
});
\`\`\`

### 3. Elementning o'zini Skroll qilish
Ba'zida butun oyna (window) emas, ma'lum bir \`div\` ichida skroll bo'ladi (CSS-da \`overflow: auto\` berilgan element). Bunday elementlarning skroll miqdorini \`scrollTop\` orqali o'qish yoki o'zgartirish mumkin.

\`\`\`javascript
const chatBox = document.getElementById("chat-box");

// Element ichidagi ma'lumotning jami balandligi (ko'rinmas qismlari bilan birga)
const totalHeight = chatBox.scrollHeight;

// Foydalanuvchi qancha qismini tushirib bo'lgani
const scrolled = chatBox.scrollTop;

// Elementning ekrandagi ko'rinib turgan balandligi
const visibleHeight = chatBox.clientHeight;

// Chatni eng pastga (yangi xabarga) avtomatik tushirib qo'yish
chatBox.scrollTop = chatBox.scrollHeight;
\`\`\`

### 4. Xotira qanday tekshiriladi? (Infinite Scroll mantig'i)
"Foydalanuvchi ro'yxatning oxiriga yetib keldimi?" degan savolga javob berish uchun yuqoridagi 3 ta xususiyatdan foydalanamiz:

\`\`\`javascript
chatBox.addEventListener("scroll", () => {
  if (chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 10) {
    // Foydalanuvchi ro'yxat oxiriga yetdi!
    console.log("Yangi ma'lumotlarni yuklash vaqti keldi (API call)...");
  }
});
\`\`\`

*(Izoh: \`-10\` piksel ehtiyot chorasi sifatida, aynan 100% pastga tushishini kutmaslik uchun beriladi)*

### 5. scrollTo va scrollBy
Brauzer oynasini aniq koordinatalarga ko'chirish:
\`\`\`javascript
// Sahifaning eng tepasiga silliq qaytish
window.scrollTo({
  top: 0,
  left: 0,
  behavior: "smooth"
});

// Hozirgi turgan joydan 100px pastga tushish
window.scrollBy({
  top: 100,
  behavior: "smooth"
});
\`\`\`

### Xulosa
Skroll API'lari juda sodda bo'lsa-da, ularni to'g'ri ishlatish qulay va zamonaviy UX yaratishning asosidir. IntersectionObserver qatori bu API'lar har bir Frontend dasturchisi bilishi shart bo'lgan mavzulardan.
  `,
  exercises: [
    {
      id: "scroll-1",
      title: "ScrollToEnd mantig'i",
      description: `Funksiyaga DOM elementi beriladi. Shu elementning ichki skrollini uning eng pastiga tushiradigan mantiqni yozing.`,
      initialCode: `function scrollToBottom(el) {
  // el ning jami balandligini uning joriy skroll qismiga tenglang
  
}`,
      solution: `function scrollToBottom(el) {
  el.scrollTop = el.scrollHeight;
}`,
      tests: [
        {
          test: `
          const el = { scrollHeight: 500, scrollTop: 0 };
          scrollToBottom(el);
          return el.scrollTop === 500;`,
          description: "scrollTop qiymati scrollHeight ga tenglashtirilishi kerak"
        }
      ]
    }
  ]
};

export const bomAndWindow = {
  title: "BOM (Browser Object Model) va Window API",
  content: `
BOM (Browser Object Model) brauzer bilan ishlash imkonini beruvchi interfeyslarni taqdim etadi. Hujjat (DOM) haqida emas, balki butun brauzer oynasi (\`window\`) va uning xususiyatlari haqida gap ketganda BOM ishlatiladi. Barcha global Javascript obyektlari, funksiyalari va o'zgaruvchilari avtomatik ravishda \`window\` obyektining a'zolariga aylanadi.

### 1. Window Obyekti Asoslari
\`window\` JavaScript'ning eng yuqori (global) obyekti hisoblanadi. Unda brauzer haqidagi ma'lumotlar va ekranni boshqarish imkoniyatlari mavjud:

\`\`\`javascript
// Brauzer oynasining o'lchamlarini olish
const width = window.innerWidth;
const height = window.innerHeight;

console.log(\`Kenglik: \${width}px, Balandlik: \${height}px\`);

// Skroll o'rnini aniqlash
const scrollY = window.scrollY; // Vertikal skroll
const scrollX = window.scrollX; // Gorizontal skroll
\`\`\`

### 2. window.location (Manzil bilan ishlash)
\`location\` obyekti joriy sahifa URL manzili haqida ma'lumot olish va uni o'zgartirish uchun ishlatiladi.

\`\`\`javascript
console.log(window.location.href);     // To'liq URL
console.log(window.location.hostname); // Domen nomi (masalan, google.com)
console.log(window.location.pathname); // Sahifa yo'li (masalan, /about)

// Sahifani boshqa manzilga yo'naltirish (Redirect)
// window.location.href = "https://javascript.info";

// Sahifani qayta yuklash (Refresh)
// window.location.reload();
\`\`\`

### 3. window.navigator (Qurilma va Brauzer)
\`navigator\` obyekti foydalanuvchi qaysi brauzerdan, qanday OS (operatsion tizim) dan kirgani va qanday tilni ishlatayotganligini aniqlashga yordam beradi.

\`\`\`javascript
console.log(window.navigator.userAgent); // Brauzer haqida to'liq ma'lumot
console.log(window.navigator.language);  // Brauzer tili (masalan, "uz-UZ" yoki "en-US")

// Foydalanuvchi onlayn yoki oflayn ekanligini tekshirish
if (navigator.onLine) {
  console.log("Internet mavjud!");
} else {
  console.log("Internet aloqasi uzilgan!");
}
\`\`\`

### 4. window.history (Tarix bilan ishlash)
\`history\` obyekti brauzerning orqaga/oldinga o'tish tugmalari tarixini o'z ichiga oladi.

\`\`\`javascript
// Bitta orqaga qaytish (Back tugmasini bosgandek)
// window.history.back();

// Bitta oldinga o'tish (Forward tugmasini bosgandek)
// window.history.forward();

// Muayyan qadam orqaga yoki oldinga siljish
// window.history.go(-2); // 2 sahifa orqaga
\`\`\`

### 5. Brauzer Oynalari va Muloqot oynalari
BOM bir nechta standart muloqot (dialog) oynalarini ham taqdim etadi:
* \`alert(msg)\` - Xabar ko'rsatish
* \`confirm(msg)\` - Foydalanuvchidan "Ha/Yo'q" tasdig'ini olish
* \`prompt(msg, default)\` - Foydalanuvchidan ma'lumot kiritishni so'rash

\`\`\`javascript
const isReady = confirm("Testni boshlashga tayyormisiz?");
if (isReady) {
  console.log("Test boshlandi!");
} else {
  console.log("Bekor qilindi.");
}
\`\`\`

### Xulosa
BOM orqali siz foydalanuvchining ekrani, brauzeri va sahifadan tashqaridagi resurslar bilan bemalol ishlashingiz mumkin.
  `,
  exercises: [
    {
      id: "bom-1",
      title: "BOM xususiyatlari",
      description: `Funksiya yozing. U quyidagi obyektni qaytarishi kerak:
{ 
  url: joriy sahifa manzili,
  lang: brauzer tili,
  online: foydalanuvchi onlaynmi (boolean)
}`,
      initialCode: `function getBrowserInfo() {
  // BOM obyektlaridan foydalaning
  return {
    
  };
}`,
      solution: `function getBrowserInfo() {
  return {
    url: window.location.href,
    lang: navigator.language,
    online: navigator.onLine
  };
}`,
      tests: [
        {
          test: `const info = getBrowserInfo();
          return typeof info.url === 'string' && typeof info.lang === 'string' && typeof info.online === 'boolean';`,
          description: "Obyektda kutilgan barcha kalitlar va to'g'ri turdagi qiymatlar mavjud bo'lishi kerak"
        }
      ]
    }
  ]
};

export const dateObject = {
  title: "Date Obyekti va Vaqt (Sana) Bilan Ishlash",
  content: `
JavaScript-da vaqt va sanalar bilan ishlash uchun **\`Date\`** obyekti ishlatiladi. Dasturda joriy kunni ko'rsatish, taymerlar qilish yoki backenddan kelgan tug'ilgan kun kabi sanalarni o'qish uchun bu juda muhim.

### 1. Date Obyektini Yaratish
\`Date\` ni yaratishning 4 xil asosiy usuli bor:

\`\`\`javascript
// 1. Hozirgi aniq vaqtni olish
const now = new Date();
console.log(now); // Masalan: Wed Oct 25 2023 14:30:00 GMT+0500 (Uzbekistan Standard Time)

// 2. Millisekundlar orqali (1970-yil 1-yanvardan boshlab hisoblanadi)
const fromEpoch = new Date(1000000000000); 

// 3. Sana qatoridan (String) yaratish
const birthday = new Date("1995-12-17T03:24:00");

// 4. Parametrlar berish orqali: Yil, Oy (0 dan boshlanadi), Kun, Soat, Minut, Sekund
// Eslatma: Oylar 0 = Yanvar, 11 = Dekabr
const customDate = new Date(2023, 0, 15); // 2023-yil 15-Yanvar
\`\`\`

### 2. Sanadan Qismlarni Olish (Get Methods)
Eng ko'p ishlatiladigan \`get\` metodlari:

\`\`\`javascript
const date = new Date("2023-10-25T14:30:00");

console.log(date.getFullYear()); // 2023 (Yilni oladi, getYear() ishlatmang!)
console.log(date.getMonth());    // 9 (Oktabr, chunki 0 dan boshlanadi)
console.log(date.getDate());     // 25 (Oyning nechanchi kuni)
console.log(date.getDay());      // 3 (Hafta kuni: 0-Yakshanba, 1-Dushanba...)
console.log(date.getHours());    // 14 (Soat)
console.log(date.getMinutes());  // 30 (Minut)

// Eng muhimlaridan biri:
console.log(date.getTime());     // 1698226200000 (1970 yildan beri o'tgan millisekundlar)
\`\`\`

### 3. Sanani O'zgartirish (Set Methods)
Obyekt ichidagi vaqtni o'zgartirish:

\`\`\`javascript
const date = new Date();
date.setFullYear(2025);
date.setMonth(11); // Dekabr
date.setDate(31);  // 31-kun

console.log(date); // 2025-yil 31-dekabr
\`\`\`

### 4. Sanalarni Formatlash
Sanani foydalanuvchiga chiroyli ko'rsatish uchun turli formatlar bor:

\`\`\`javascript
const now = new Date();

console.log(now.toDateString());     // "Wed Oct 25 2023"
console.log(now.toTimeString());     // "14:30:00 GMT+0500"
console.log(now.toISOString());      // "2023-10-25T09:30:00.000Z" (Backend uchun eng yaxshisi)
console.log(now.toLocaleDateString('uz-UZ')); // "25.10.2023" (Mahalliy format)
\`\`\`

### 5. Date.now()
Obyekt yaratmasdan, darhol hozirgi vaqtning millisekunddagi qiymatini olish uchun:
\`\`\`javascript
const start = Date.now();

// ... qandaydir kod ishlaydi ...
for (let i = 0; i < 1000000; i++) {}

const end = Date.now();
console.log(\`Kod \${end - start} millisekund ishladi\`);
\`\`\`
  `,
  exercises: [
    {
      id: "date-1",
      title: "Joriy Yilni Topish",
      description: `Hozirgi yilni (masalan: 2024) qaytaruvchi 'getCurrentYear' funksiyasini yozing. Buning uchun 'new Date()' va uning tegishli metodidan foydalaning.`,
      initialCode: `function getCurrentYear() {
  // joriy yilni qaytaring
  
}`,
      solution: `function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}`,
      tests: [
        {
          test: `
          const y = getCurrentYear();
          return y === new Date().getFullYear();`,
          description: "Joriy yilni (masalan 2024) to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "date-2",
      title: "Sana formati",
      description: `Parametr sifatida 'Date' obyektini qabul qilib, uni "Kun-Oy-Yil" (masalan: "25-10-2023") string ko'rinishida qaytaruvchi 'formatDate(date)' funksiyasini yozing. Esda tuting, getMonth() 0 dan boshlanadi, shuning uchun unga 1 qo'shish kerak!`,
      initialCode: `function formatDate(date) {
  // date.getDate()
  // date.getMonth() + 1
  // date.getFullYear()
  
}`,
      solution: `function formatDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return d + "-" + m + "-" + y;
}`,
      tests: [
        {
          test: `
          const d = new Date(2023, 9, 25);
          return formatDate(d) === "25-10-2023";`,
          description: "2023-yil 25-Oktabrni to'g'ri formatlashi kerak (Oktabr oy indeksi 9)"
        }
      ]
    }
  ]
};

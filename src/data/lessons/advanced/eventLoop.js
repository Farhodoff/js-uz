export const eventLoopLesson = {
  id: "event-loop",
  title: "Event Loop (JavaScript qanday ishlaydi?)",
  level: "Advanced",
  description: "JavaScript qanday qilib bir vaqtda bir nechta ishni bajarishini (Concurrency) tushunib olamiz.",
  theory: `
# Event Loop – Bu nima va nima uchun kerak?

JavaScript **single-threaded** til, ya'ni u bir vaqtning o'zida faqat bitta ishni bajara oladi. Lekin biz saytlarda bir vaqtning o'zida ham ma'lumot yuklanishini, ham animatsiyalar ishlashini ko'ramiz. Buni **Event Loop** mexanizmi amalga oshiradi.

## 1. NEGA kerak?
Tasavvur qiling, serverdan ma'lumot kelishi 5 soniya davom etadi. Agar JS "kutib tursa", butun sayt 5 soniyaga qotib qoladi (bloklanadi). Event Loop yordamida JS og'ir ishlarni "fondagi ishchilar"ga (Web APIs) topshiradi va o'zi navbatdagi kodni o'qishda davom etadi.

## 2. SODDALIK (Analogiya)
Event Loopni restorandagi ofitsiant deb tasavvur qiling:
1.  **Ofitsiant (JS Call Stack):** Buyurtmalarni oladi va oshxonaga uzatadi.
2.  **Oshxona (Web APIs):** Ovqatni tayyorlaydi (5-10 daqiqa).
3.  **Tayyor taomlar stoli (Callback Queue):** Tayyor ovqatlar ofitsiant bo'shashini kutadi.
4.  **Event Loop:** Har doim ofitsiantga qarab turadi, agar u bo'sh bo'lsa (Stack bo'sh bo'lsa), stoldagi ovqatni mijozga (Call Stackga) olib boradi.

## 3. STRUKTURA

### A. Call Stack
Hozir bajarilayotgan funksiyalar navbati. "LIFO" (Last In, First Out) tartibida ishlaydi.

### B. Microtasks va Macrotasks
Navbat ikki xil bo'ladi:
- **Microtasks (Yuqori navbat):** Promises (\`.then\`, \`async/await\`). Bular har doim birinchi bajariladi.
- **Macrotasks (Pastki navbat):** \`setTimeout\`, \`setInterval\`, DOM hodisalari.

### C. Misol
\`\`\`javascript
console.log("1"); 
setTimeout(() => console.log("2"), 0); 
Promise.resolve().then(() => console.log("3")); 
console.log("4");
// Natija: 1, 4, 3, 2
\`\`\`

## 4. AMALIYOT (Mashq)
Quyidagi kodni konsolda ishlatib ko'ring va natijani tahlil qiling:
\`\`\`javascript
console.log("Start");
setTimeout(() => console.log("Timer"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Sinxron kodni bloklash:** Katta sikllarni (\`for 1 billion\`) JS Stackida ishlatmang, u Event Loopni to'xtatib qo'yadi.
2.  **setTimeout(0) darhol ishlamaydi:** U har doim Call Stack bo'shashini va Microtasklar tugashini kutadi.

## 6. SAVOLLAR (12 ta)
1. JavaScript necha oqimli (threaded) til?
2. Call Stack nima?
3. Web APIlar nima vazifani bajaradi?
4. Event Loopning asosiy vazifasi nima?
5. Microtask va Macrotask farqi nimada?
6. Promise qaysi navbatga tushadi?
7. \`setTimeout\` qaysi navbatga tushadi?
8. Nima uchun microtasklar macrotasklardan oldin bajariladi?
9. "Blocking code" nima degani?
10. Event Loop brauzerni qotib qolishidan qanday saqlaydi?
11. Call Stack bo'sh bo'lmasa Event Loop nima qiladi?
12. Node.js va Browser Event Looplari farq qiladimi?`,
  exercises: [
    {
      id: 1,
      title: "Event Loop tartibi",
      instruction: "Konsolga '1', keyin '3', keyin '2' chiqadigan kod yozing (Promise va setTimeout yordamida).",
      startingCode: "console.log('1');\n// Bu yerga yozing",
      hint: "setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3'));",
      test: "if (logs.includes('3') && logs.indexOf('3') < logs.indexOf('2')) return null; return 'Tartib noto\\'g\\'ri';"
    }
  ]
};

// js-what.js: yangi qo'shilgan 9 ta savolni tuzatish
// 1) 287-qatordagi buzilgan qo'shtirnoq
// 2) Apostroflarsiz yozilgan matnlarni to'g'rilash
const fs = require("fs");
const p = "src/data/lessons/js/01-basics/js-what.js";
let src = fs.readFileSync(p, "utf8");

// 1) Buzilgan savol qatorini almashtirish
const brokenLine = '      question: "Quyidagi kodda xato qayerda?  Console.log("Salom");",';
if (!src.includes(brokenLine)) {
  console.error("Buzilgan qator topilmadi");
  process.exit(1);
}
const fixedLine = '      question: "Quyidagi kodda xato qayerda?  Console.log(\\"Salom\\");",';
src = src.replace(brokenLine, fixedLine);

// 2) Yangi savollardagi apostrofsiz so'zlarni to'g'rilash
// (yozuv shell ichida apostrofsiz edi)
const fixes = [
  ["ko rinishi", "ko'rinishi"],
  ["bog li", "bog'li"],
  ["To g ridan", "To'g'ridan"],
  ["bo lado", "bo'ladimi"],
  ["Yo q,", "Yo'q,"],
  ["JavaScript ni", "JavaScript'ni"],
  ["bo lmasa", "bo'lmasa"],
  ["o xshab", "o'xshab"],
  ["O chib", "O'chib"],
  ["buyrug i", "buyrug'i"],
  ["o chiradi", "o'chiradi"],
  ["Ma lumotni", "Ma'lumotni"],
  ["Qo shtirnoq", "Qo'shtirnoq"],
  ["qo yilgan", "qo'yilgan"],
  ["Xato yo q", "Xato yo'q"],
  ["katta harf bilan yozilgan", "katta harf bilan yozilgan"],
  ["so z nom", "so'z nom"],
  ["noto g ri", "noto'g'ri"],
  ["yetishmayapti", "yetishmayapti"],
  ["doim xato", "doim xato"],
  ["Faqat brauzerda", "Faqat brauzerda"],
  ["da", "da"],
  ["foydalanib bo lmaydi", "foydalanib bo'lmaydi"],
  ["har doim", "har doim"],
  ["matni uchun", "matni uchun"],
  ["Nokoma", "Nokoma"],
];
// faqat "savollar qo shildi" dan keyin kelgan qismga tatbiq etiladi
for (const [a, b] of fixes) {
  src = src.split(a).join(b);
}

fs.writeFileSync(p, src);
console.log("jsWhat savollari tuzatildi");

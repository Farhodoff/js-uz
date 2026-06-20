export const mathLogicChallenges = {
  title: "Matematika va Mantiq Masalalari",
  content: `
Dasturlashning asosi — mantiq. Ushbu darsda siz sonlar, toq-juftlik, tub sonlar, faktorial kabi turli xil matematik va mantiqiy algoritmlarni ishlashni o'rganasiz.
`,
  exercises: [
    {
      id: "math-chal-1",
      title: "Juft yoki toqligini tekshirish",
      description: "Berilgan son juft bo'lsa `true`, toq bo'lsa `false` qaytaruvchi `isEven(n)` funksiyasini yozing.",
      initialCode: "function isEven(n) {\n  // kodni yozing\n}",
      solution: "function isEven(n) {\n  return n % 2 === 0;\n}",
      tests: [
        { test: "return isEven(4) === true;", description: "4 - juft son" },
        { test: "return isEven(7) === false;", description: "7 - toq son" }
      ]
    },
    {
      id: "math-chal-2",
      title: "Faktorialni hisoblash",
      description: "Berilgan sonning faktorialini (n!) qaytaruvchi `factorial(n)` funksiyasini yozing. Masalan, 5! = 5*4*3*2*1 = 120. 0! = 1 hisoblanadi.",
      initialCode: "function factorial(n) {\n  // kodni yozing\n}",
      solution: "function factorial(n) {\n  if(n === 0) return 1;\n  let res = 1;\n  for(let i=1; i<=n; i++) res *= i;\n  return res;\n}",
      tests: [
        { test: "return factorial(5) === 120;", description: "5 faktoriali 120 ga teng" },
        { test: "return factorial(0) === 1;", description: "0 faktoriali 1 ga teng" }
      ]
    },
    {
      id: "math-chal-3",
      title: "Tub son ekanligini aniqlash",
      description: "Berilgan n soni tub son (faqat 1 ga va o'ziga qoldiqsiz bo'linadigan) ekanligini aniqlovchi `isPrime(n)` funksiyasini yozing. 1 tub son emas.",
      initialCode: "function isPrime(n) {\n  // kodni yozing\n}",
      solution: "function isPrime(n) {\n  if(n <= 1) return false;\n  for(let i=2; i<=Math.sqrt(n); i++) {\n    if(n % i === 0) return false;\n  }\n  return true;\n}",
      tests: [
        { test: "return isPrime(7) === true;", description: "7 tub son" },
        { test: "return isPrime(10) === false;", description: "10 tub son emas" },
        { test: "return isPrime(1) === false;", description: "1 tub son hisoblanmaydi" }
      ]
    },
    {
      id: "math-chal-4",
      title: "Sonning raqamlari yig'indisi",
      description: "Berilgan musbat butun sonning (n) raqamlari yig'indisini hisoblovchi `sumOfDigits(n)` funksiyasini tuzing (masalan: 123 -> 1+2+3 = 6).",
      initialCode: "function sumOfDigits(n) {\n  // kodni yozing\n}",
      solution: "function sumOfDigits(n) {\n  return String(n).split('').reduce((sum, digit) => sum + Number(digit), 0);\n}",
      tests: [
        { test: "return sumOfDigits(123) === 6;", description: "123 uchun 6 chiqishi kerak" },
        { test: "return sumOfDigits(909) === 18;", description: "909 uchun 18 chiqishi kerak" }
      ]
    },
    {
      id: "math-chal-5",
      title: "Fibonachchi qatori",
      description: "Fibonachchi ketma-ketligidagi n-chi sonni qaytaruvchi `fibonacci(n)` funksiyasini yozing (0, 1, 1, 2, 3, 5, 8...). Indeks 0 dan boshlanadi deb tasavvur qiling (ya'ni n=0 -> 0, n=1 -> 1, n=4 -> 3).",
      initialCode: "function fibonacci(n) {\n  // kodni yozing\n}",
      solution: "function fibonacci(n) {\n  if(n <= 1) return n;\n  let a = 0, b = 1, temp;\n  for(let i=2; i<=n; i++) {\n    temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}",
      tests: [
        { test: "return fibonacci(4) === 3;", description: "4-chi fibonachchi soni 3 ga teng" },
        { test: "return fibonacci(6) === 8;", description: "6-chi son 8 ga teng" }
      ]
    },
    {
      id: "math-chal-6",
      title: "Eng katta umumiy bo'luvchi (EKUB)",
      description: "Ikkita sonning EKUBini hisoblovchi (GCD - Greatest Common Divisor) Yevklid algoritmidan foydalanib `gcd(a, b)` funksiyasini yozing.",
      initialCode: "function gcd(a, b) {\n  // kodni yozing\n}",
      solution: "function gcd(a, b) {\n  while(b !== 0) {\n    let temp = b;\n    b = a % b;\n    a = temp;\n  }\n  return a;\n}",
      tests: [
        { test: "return gcd(12, 18) === 6;", description: "12 va 18 ning EKUBi 6 ga teng" },
        { test: "return gcd(7, 3) === 1;", description: "Tub sonlar uchun 1 qaytishi kerak" }
      ]
    },
    {
      id: "math-chal-7",
      title: "Mukammal sonni topish",
      description: "Mukammal son - bu o'zidan boshqa barcha bo'luvchilari yig'indisi o'ziga teng bo'lgan son (masalan, 6 = 1+2+3). Berilgan n soni mukammal ekanligini tekshiruvchi `isPerfect(n)` funksiyasini yozing.",
      initialCode: "function isPerfect(n) {\n  // kodni yozing\n}",
      solution: "function isPerfect(n) {\n  if(n <= 1) return false;\n  let sum = 0;\n  for(let i=1; i<n; i++) {\n    if(n % i === 0) sum += i;\n  }\n  return sum === n;\n}",
      tests: [
        { test: "return isPerfect(6) === true;", description: "6 mukammal son" },
        { test: "return isPerfect(28) === true;", description: "28 mukammal son" },
        { test: "return isPerfect(10) === false;", description: "10 mukammal emas" }
      ]
    },
    {
      id: "math-chal-8",
      title: "Darajaga ko'tarish",
      description: "Baza (base) va daraja (exp) qabul qilib, base ni exp darajasiga ko'taruvchi `power(base, exp)` funksiyasini yozing. (Math.pow dan foydalanmay, sikl yordamida harakat qilib ko'ring). Musbat darajalar uchun ishlasa yetarli.",
      initialCode: "function power(base, exp) {\n  // kodni yozing\n}",
      solution: "function power(base, exp) {\n  let res = 1;\n  for(let i=0; i<exp; i++) res *= base;\n  return res;\n}",
      tests: [
        { test: "return power(2, 3) === 8;", description: "2 ning 3-darajasi 8" },
        { test: "return power(5, 0) === 1;", description: "0 daraja 1 ga teng bo'lishi kerak" }
      ]
    },
    {
      id: "math-chal-9",
      title: "Kabisa yilini topish",
      description: "Berilgan yil (year) kabisa (leap) yili ekanligini tekshiruvchi `isLeapYear(year)` funksiyasini yozing. 4 ga qoldiqsiz bo'linadigan yil kabisa, lekin 100 ga bo'linib 400 ga bo'linmasa kabisa emas.",
      initialCode: "function isLeapYear(year) {\n  // kodni yozing\n}",
      solution: "function isLeapYear(year) {\n  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);\n}",
      tests: [
        { test: "return isLeapYear(2024) === true;", description: "2024 kabisa yili" },
        { test: "return isLeapYear(1900) === false;", description: "1900 yuz yillik bo'lgani uchun kabisa emas" },
        { test: "return isLeapYear(2000) === true;", description: "2000 yil 400 ga bo'lingani uchun kabisa yili" }
      ]
    },
    {
      id: "math-chal-10",
      title: "Sonni teskari o'girish (Raqamlar)",
      description: "Berilgan butun sonning (n) raqamlarini teskarisiga o'giruvchi `reverseNumber(n)` funksiyasini tuzing (masalan, 123 -> 321). Manfiy sonlarni o'z holicha saqlang (-123 -> -321).",
      initialCode: "function reverseNumber(n) {\n  // kodni yozing\n}",
      solution: "function reverseNumber(n) {\n  const reversed = parseInt(String(Math.abs(n)).split('').reverse().join(''));\n  return n < 0 ? -reversed : reversed;\n}",
      tests: [
        { test: "return reverseNumber(123) === 321;", description: "123 ni 321 ga o'girmog'i kerak" },
        { test: "return reverseNumber(-456) === -654;", description: "Manfiy son to'g'ri ishlashi kerak" },
        { test: "return reverseNumber(120) === 21;", description: "120 da oxiridagi nol yo'qolishi kerak" }
      ]
    },
    {
      id: "math-chal-11",
      title: "Sonning yaxlit qismi",
      description: "O'nlik kasrni har doim pastga (kichik tomonga) yaxlitlaydigan `floorNumber(n)` funksiyasini tuzing (Math.floor() dan foydalanishingiz mumkin).",
      initialCode: "function floorNumber(n) {\n  // kodni yozing\n}",
      solution: "function floorNumber(n) {\n  return Math.floor(n);\n}",
      tests: [
        { test: "return floorNumber(5.9) === 5;", description: "5.9 -> 5 ga yaxlitlanadi" },
        { test: "return floorNumber(-2.1) === -3;", description: "-2.1 -> -3 ga yaxlitlanadi (pastga)" }
      ]
    },
    {
      id: "math-chal-12",
      title: "Pifagor teoremasi",
      description: "To'g'ri burchakli uchburchakning ikkita kateti `a` va `b` berilgan. Uning gipotenuzasini (c) qaytaruvchi `calculateHypotenuse(a, b)` funksiyasini yozing (c^2 = a^2 + b^2). Math.sqrt dan foydalaning.",
      initialCode: "function calculateHypotenuse(a, b) {\n  // kodni yozing\n}",
      solution: "function calculateHypotenuse(a, b) {\n  return Math.sqrt(a*a + b*b);\n}",
      tests: [
        { test: "return calculateHypotenuse(3, 4) === 5;", description: "Katetlar 3 va 4 bo'lsa, gipotenuza 5 bo'ladi" }
      ]
    },
    {
      id: "math-chal-13",
      title: "Raqamlar sonini aniqlash",
      description: "Berilgan musbat `n` sonida nechta raqam borligini aniqlovchi `countDigits(n)` funksiyasini yozing (matnga o'tkazish orqali qilish juda oson).",
      initialCode: "function countDigits(n) {\n  // kodni yozing\n}",
      solution: "function countDigits(n) {\n  return String(n).length;\n}",
      tests: [
        { test: "return countDigits(100) === 3;", description: "100 - uch xonali son" },
        { test: "return countDigits(9) === 1;", description: "9 - bir xonali son" }
      ]
    },
    {
      id: "math-chal-14",
      title: "Doiraning yuzi",
      description: "Radiusi `r` bo'lgan doiraning yuzini (S = pi * r^2) hisoblab qaytaruvchi `circleArea(r)` funksiyasini yozing. Natijani 2 ta kasr xonasigacha aniqlikda qaytaring (Math.PI dan foydalaning va toFixed ishlatmang yoki Number ga qayta o'giring).",
      initialCode: "function circleArea(r) {\n  // kodni yozing\n}",
      solution: "function circleArea(r) {\n  return +(Math.PI * r * r).toFixed(2);\n}",
      tests: [
        { test: "return Math.abs(circleArea(5) - 78.54) < 0.01;", description: "Radius 5 uchun ~78.54 qaytishi kerak" }
      ]
    },
    {
      id: "math-chal-15",
      title: "Eng kichik umumiy karrali (EKUK)",
      description: "Ikkita sonning (a va b) eng kichik umumiy karralisini (LCM) hisoblovchi `lcm(a, b)` funksiyasini yozing. Formulaga ko'ra LCM = (a * b) / GCD(a, b).",
      initialCode: "function lcm(a, b) {\n  // kodni yozing\n}",
      solution: "function lcm(a, b) {\n  function gcd(x, y) { while(y) { let t = y; y = x % y; x = t; } return x; }\n  return (a * b) / gcd(a, b);\n}",
      tests: [
        { test: "return lcm(4, 6) === 12;", description: "4 va 6 ning EKUKi 12 ga teng" }
      ]
    },
    {
      id: "math-chal-16",
      title: "Raqam bo'lish-bo'lmasligini tekshirish",
      description: "Berilgan o'zgaruvchi `n` aniq son ekanligini (NaN, string emas, aynan son tipi) tekshiruvchi `isExactNumber(n)` funksiyasini tuzing.",
      initialCode: "function isExactNumber(n) {\n  // kodni yozing\n}",
      solution: "function isExactNumber(n) {\n  return typeof n === 'number' && !Number.isNaN(n);\n}",
      tests: [
        { test: "return isExactNumber(10) === true;", description: "10 son hisoblanadi" },
        { test: "return isExactNumber('10') === false;", description: "Matn son emas" },
        { test: "return isExactNumber(NaN) === false;", description: "NaN maxsus holat, lekin aniq hisob uchun false qaytarilishi kerak" }
      ]
    },
    {
      id: "math-chal-17",
      title: "Musbat yoki Manfiy",
      description: "Son noldan katta bo'lsa 'positive', noldan kichik bo'lsa 'negative', nolga teng bo'lsa 'zero' deb qaytaruvchi `checkSign(n)` funksiyasini yozing.",
      initialCode: "function checkSign(n) {\n  // kodni yozing\n}",
      solution: "function checkSign(n) {\n  if(n > 0) return 'positive';\n  if(n < 0) return 'negative';\n  return 'zero';\n}",
      tests: [
        { test: "return checkSign(5) === 'positive';", description: "5 uchun positive" },
        { test: "return checkSign(-3) === 'negative';", description: "-3 uchun negative" },
        { test: "return checkSign(0) === 'zero';", description: "0 uchun zero" }
      ]
    },
    {
      id: "math-chal-18",
      title: "Celsiydan Farengeytga o'tkazish",
      description: "Celsiy gradusdagi (`c`) qiymatni qabul qilib, Farengeyt (F) da qaytaruvchi `celsiusToFahrenheit(c)` funksiyasini yozing. Formula: F = (C * 9/5) + 32",
      initialCode: "function celsiusToFahrenheit(c) {\n  // kodni yozing\n}",
      solution: "function celsiusToFahrenheit(c) {\n  return (c * 9/5) + 32;\n}",
      tests: [
        { test: "return celsiusToFahrenheit(0) === 32;", description: "0 C = 32 F bo'ladi" },
        { test: "return celsiusToFahrenheit(100) === 212;", description: "100 C = 212 F bo'ladi" }
      ]
    },
    {
      id: "math-chal-19",
      title: "Tasodifiy son generatori",
      description: "A va B oraliqda (inclusive) bo'lgan ixtiyoriy butun son qaytaradigan `randomInRange(a, b)` funksiyasini yozing. Math.random(), Math.floor() lardan foydalaning.",
      initialCode: "function randomInRange(a, b) {\n  // kodni yozing\n}",
      solution: "function randomInRange(a, b) {\n  return Math.floor(Math.random() * (b - a + 1)) + a;\n}",
      tests: [
        { test: "const r = randomInRange(5, 10); return r >= 5 && r <= 10;", description: "5 va 10 oralig'ida bo'lishi kerak" }
      ]
    },
    {
      id: "math-chal-20",
      title: "Uchburchak yasash mumkinligi",
      description: "Uchta kesma uzunligi `a, b, c` berilgan. Ulardan uchburchak yasab bo'lish-bo'lmasligini tekshiruvchi `isValidTriangle(a, b, c)` funksiyasini yozing. Qoida: har qanday ikkita tomon yig'indisi uchinchi tomondan doim katta bo'lishi shart.",
      initialCode: "function isValidTriangle(a, b, c) {\n  // kodni yozing\n}",
      solution: "function isValidTriangle(a, b, c) {\n  return a+b > c && a+c > b && b+c > a;\n}",
      tests: [
        { test: "return isValidTriangle(3, 4, 5) === true;", description: "3, 4, 5 bilan uchburchak yozish mumkin" },
        { test: "return isValidTriangle(1, 10, 12) === false;", description: "1, 10 va 12 dan yozib bo'lmaydi" }
      ]
    }
  ]
};

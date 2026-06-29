const fs = require('fs');
const path = require('path');

const dir = '/Users/farhod/Desktop/github/js-uz/src/data/lessons/beginner';
const files = ['arrays.js', 'blockScope.js', 'breakContinue.js', 'consoleMethods.js'];

const newEx = {
  'arrays.js': [
    { id: 4, title: "Eng Katta Element (Max)", instruction: "Faqat sonlardan iborat massivdagi eng katta sonni topuvchi `findMax(arr)` yozing.", startingCode: "function findMax(arr) {\n  \n}", hint: "Math.max(...arr) ishlating.", test: "const fn = new Function(code + '; return findMax;')(); if(fn([1, 5, 3]) !== 5) return 'Xato'; return null;" },
    { id: 5, title: "Yig'indi (Sum)", instruction: "Sonlardan iborat massiv yig'indisini hisoblovchi `sumArray(arr)` yozing.", startingCode: "function sumArray(arr) {\n  \n}", hint: "reduce() ishlating.", test: "const fn = new Function(code + '; return sumArray;')(); if(fn([1, 2, 3]) !== 6) return 'Xato'; return null;" },
    { id: 6, title: "Teskari Massiv", instruction: "Massivni teskari aylantiruvchi `reverseArray(arr)` yozing. Asl massiv o'zgarmasin.", startingCode: "function reverseArray(arr) {\n  \n}", hint: "arr.slice().reverse() eng oson yo'li.", test: "const fn = new Function(code + '; return reverseArray;')(); const a=[1,2]; const r=fn(a); if(r[0]!==2 || a[0]===1 && a[1]===2 && r.length===2) return null; return 'Xato';" },
    { id: 7, title: "Toq Sonlar", instruction: "Faqat toq sonlarni qaytaruvchi `getOdds(arr)` yozing.", startingCode: "function getOdds(arr) {\n  \n}", hint: "filter(n => n % 2 !== 0)", test: "const fn = new Function(code + '; return getOdds;')(); if(fn([1,2,3]).length !== 2) return 'Xato'; return null;" },
    { id: 8, title: "Birlashtirish", instruction: "Ikkita massivni birlashtiruvchi `mergeArrays(arr1, arr2)` yozing.", startingCode: "function mergeArrays(arr1, arr2) {\n  \n}", hint: "[...arr1, ...arr2]", test: "const fn = new Function(code + '; return mergeArrays;')(); if(fn([1],[2])[1] !== 2) return 'Xato'; return null;" },
    { id: 9, title: "Unikal (Set)", instruction: "Takroriy elementlarni o'chiruvchi `removeDuplicates(arr)` yozing.", startingCode: "function removeDuplicates(arr) {\n  \n}", hint: "Array.from(new Set(arr))", test: "const fn = new Function(code + '; return removeDuplicates;')(); if(fn([1,1,2]).length !== 2) return 'Xato'; return null;" },
    { id: 10, title: "Qidiruv", instruction: "Massivda qiymat borligini tekshiruvchi `hasElement(arr, val)` yozing.", startingCode: "function hasElement(arr, val) {\n  \n}", hint: "includes()", test: "const fn = new Function(code + '; return hasElement;')(); if(fn([1,2], 2) !== true) return 'Xato'; return null;" }
  ],
  'blockScope.js': [
    { id: 4, title: "let vs var farqi", instruction: "Ikkita o'zgaruvchi yarating: biri let, ikkinchisi var bilan. Ularni qaytaruvchi `testScopes()` yozing.", startingCode: "function testScopes() {\n  \n}", hint: "Shunchaki return qiling.", test: "const fn = new Function(code + '; return testScopes;')(); return null;" },
    { id: 5, title: "const xususiyati", instruction: "`const` obyektining xossasini o'zgartiruvchi `updateConst()` yozing.", startingCode: "function updateConst() {\n  const obj = { name: 'A' };\n  // O'zgartiring\n  return obj;\n}", hint: "obj.name = 'B';", test: "const fn = new Function(code + '; return updateConst;')(); if(fn().name !== 'A') return null; return 'Xato';" },
    { id: 6, title: "If-else doirasi", instruction: "`if` blokida `let` e'lon qilib, xavfsiz ifodalang.", startingCode: "function safeIf() {\n  if(true) {\n    let x = 10;\n    return x;\n  }\n}", hint: "return x", test: "const fn = new Function(code + '; return safeIf;')(); if(fn()===10) return null; return 'Xato';" },
    { id: 7, title: "Switch-case bloklari", instruction: "`switch` ichida qavslar `{}` orqali blok scope yarating.", startingCode: "function switchScope(val) {\n  switch(val) {\n    case 1: {\n      let x = 1;\n      return x;\n    }\n  }\n}", hint: "Blok ichida yozing", test: "return null;" },
    { id: 8, title: "TDZ tushunchasi", instruction: "TDZ ga tushishdan saqlanib `x` ni avval e'lon qilib, keyin ishlating.", startingCode: "function avoidTDZ() {\n  let x = 5;\n  return x;\n}", hint: "E'lon oldinroq bo'lsin.", test: "return null;" },
    { id: 9, title: "For-of tsikli", instruction: "`for...of` ichida `const` yordamida elementlarni oling.", startingCode: "function forOfConst(arr) {\n  for(const item of arr) {\n    if(item===2) return item;\n  }\n}", hint: "const item ishlatiladi.", test: "return null;" },
    { id: 10, title: "Nested blocks", instruction: "Ichma-ich bloklarda `let` qanday ishlashini ko'rsating.", startingCode: "function nestedBlock() {\n  let a = 1;\n  {\n    let a = 2;\n    return a;\n  }\n}", hint: "Qaytariladigan a = 2 bo'ladi.", test: "const fn = new Function(code + '; return nestedBlock;')(); if(fn()===2) return null; return 'Xato';" }
  ],
  'breakContinue.js': [
    { id: 4, title: "Stringlarni o'tkazish", instruction: "Faqat sonlarni qo'shuvchi, boshqalarni `continue` orqali tashlab o'tuvchi `sumNumbers(arr)` yozing.", startingCode: "function sumNumbers(arr) {\n  \n}", hint: "typeof item !== 'number'", test: "return null;" },
    { id: 5, title: "Nested Break Label", instruction: "Tashqi tsiklni to'xtatuvchi `labelBreak()` yozing.", startingCode: "function labelBreak() {\n  outer: for(let i=0; i<3; i++) {\n    for(let j=0; j<3; j++) {\n      if(i===1) break outer;\n    }\n  }\n  return true;\n}", hint: "break outer;", test: "return null;" },
    { id: 6, title: "Toq sonlarni davom ettirish", instruction: "Juft sonlarnigina qo'shuvchi (toqlarda `continue` bo'ladigan) `sumEvens(arr)` yozing.", startingCode: "function sumEvens(arr) {\n  \n}", hint: "if(num%2!==0) continue;", test: "return null;" },
    { id: 7, title: "Sikl to'xtashi", instruction: "Massivda `0` kelsa, to'xtovchi `breakAtZero(arr)` yozing.", startingCode: "function breakAtZero(arr) {\n  \n}", hint: "if(num===0) break;", test: "return null;" },
    { id: 8, title: "Maxsus harf", instruction: "'A' harfi bilan boshlangan so'zlarni o'tkazib yuboruvchi `skipA(arr)` yozing.", startingCode: "function skipA(arr) {\n  \n}", hint: "word.startsWith('A')", test: "return null;" },
    { id: 9, title: "Matrix", instruction: "Matrixda ma'lum son topilganda to'xtash.", startingCode: "function searchMatrix(m, v) {\n  \n}", hint: "break outer ishlatish", test: "return null;" },
    { id: 10, title: "Limitgacha ishlash", instruction: "3 marta aylangach to'xtovchi tsikl.", startingCode: "function threeTimes() {\n  for(let i=0; i<10; i++) { if(i===3) break; }\n}", hint: "i===3", test: "return null;" }
  ],
  'consoleMethods.js': [
    { id: 4, title: "Xatoliklarni chiqarish", instruction: "`console.error` yordamida 'Xato' deb chiqaruvchi `logError()` yozing.", startingCode: "function logError() {\n  \n}", hint: "console.error('Xato')", test: "return null;" },
    { id: 5, title: "Chaqiruv sanash", instruction: "`console.count('API')` ishlatuvchi `countAPI()` yozing.", startingCode: "function countAPI() {\n  \n}", hint: "console.count", test: "return null;" },
    { id: 6, title: "Shartli xato", instruction: "`console.assert(false, 'Xato')` ishlatuvchi `checkAssert()` yozing.", startingCode: "function checkAssert() {\n  \n}", hint: "console.assert", test: "return null;" },
    { id: 7, title: "Call stack", instruction: "`console.trace()` ishlating.", startingCode: "function myTrace() {\n  console.trace('T');\n}", hint: "console.trace", test: "return null;" },
    { id: 8, title: "Yig'ilgan guruh", instruction: "`console.groupCollapsed()` ishlating.", startingCode: "function closedGroup() {\n  console.groupCollapsed('G');\n  console.groupEnd();\n}", hint: "groupCollapsed", test: "return null;" },
    { id: 9, title: "Info", instruction: "`console.info()` ishlating.", startingCode: "function logInfo() {\n  \n}", hint: "info", test: "return null;" },
    { id: 10, title: "Clear", instruction: "`console.clear()` ishlating.", startingCode: "function clearConsole() {\n  \n}", hint: "clear", test: "return null;" }
  ]
};

files.forEach(file => {
  const p = path.join(dir, file);
  if(!fs.existsSync(p)) return;
  let txt = fs.readFileSync(p, 'utf8');
  
  txt = txt.replace(/❌ Ko'p Uchraydigan Xatolar \(Junior Mistakes\)/g, "🔥 ROAST (Juniorlarning Sharmandali Xatolari)");
  txt = txt.replace(/❌ YOMON:/g, "🤬 YOMON (Sharmanda):");
  txt = txt.replace(/✅ YAXSHI:/g, "😎 YAXSHI (Senior Level):");
  
  const regex = /exercises:\s*\[([\s\S]*?)\]\s*,\s*quizzes:/;
  const match = txt.match(regex);
  if(match) {
    let old = match[1].trim();
    let n = '';
    newEx[file].forEach(x => {
      n += `,\n  {\n    "id": ${x.id},\n    "title": "${x.title}",\n    "instruction": "${x.instruction}",\n    "startingCode": ${JSON.stringify(x.startingCode)},\n    "hint": "${x.hint}",\n    "test": ${JSON.stringify(x.test)}\n  }`;
    });
    let rep = `exercises: [\n  ${old}${n}\n],\n  quizzes:`;
    txt = txt.replace(regex, rep);
    fs.writeFileSync(p, txt, 'utf8');
    console.log(file + " OK!");
  } else {
    console.log(file + " MISSING!");
  }
});

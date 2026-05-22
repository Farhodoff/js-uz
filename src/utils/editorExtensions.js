import { syntaxTree } from '@codemirror/language';

const GLOBAL_NAMES = new Set([
  'console', 'Math', 'JSON', 'window', 'document', 'setTimeout', 'setInterval',
  'clearTimeout', 'clearInterval', 'alert', 'prompt', 'confirm', 'Array', 'Object',
  'String', 'Number', 'Boolean', 'RegExp', 'Date', 'Error', 'Map', 'Set', 'Promise',
  'NaN', 'undefined', 'Infinity', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
  'eval', 'typeof', 'void', 'arguments', 'React', 'useState', 'useEffect', 'useRef',
  'useMemo', 'useCallback', 'useContext'
]);

export function uzbekJavaScriptLinter(view) {
  const diagnostics = [];
  const tree = syntaxTree(view.state);

  const declaredVariables = new Set();
  const variableTypes = new Map(); // name -> 'const' | 'let' | 'var' | 'function' | 'class'

  // Pass 1: Collect declarations
  tree.iterate({
    enter(node) {
      if (node.name === 'VariableDefinition') {
        const name = view.state.sliceDoc(node.from, node.to);
        if (name) {
          declaredVariables.add(name);

          // Find if it's declared with const, let, or var
          let parent = node.node.parent;
          let foundDeclaration = false;
          while (parent && parent.name !== 'Script' && parent.name !== 'Block') {
            if (parent.name === 'VariableDeclaration') {
              const declText = view.state.sliceDoc(parent.from, parent.to).trim();
              if (declText.startsWith('const')) {
                variableTypes.set(name, 'const');
              } else if (declText.startsWith('let')) {
                variableTypes.set(name, 'let');
              } else {
                variableTypes.set(name, 'var');
              }
              foundDeclaration = true;
              break;
            }
            parent = parent.parent;
          }
          if (!foundDeclaration) {
            // Check if it's a function or class declaration name
            let p = node.node.parent;
            if (p && p.name === 'FunctionDeclaration') {
              variableTypes.set(name, 'function');
            } else if (p && p.name === 'ClassDeclaration') {
              variableTypes.set(name, 'class');
            } else {
              variableTypes.set(name, 'let'); // default to block-scoped variable (e.g. parameter)
            }
          }
        }
      }
    }
  });

  // Pass 2: Analyze errors and warnings
  tree.iterate({
    enter(node) {
      // 1. Syntax Errors
      if (node.name === '⚠' || node.type.isError) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: 'error',
          message: "Sintaktik xatolik (Syntax Error). Qavslar, nuqtali vergul yoki yozilish shaklini tekshiring."
        });
        return;
      }

      // 2. Assignment inside conditions: if (a = b)
      if (node.name === 'AssignmentExpression') {
        let parent = node.node.parent;
        if (parent && parent.name === 'ParenthesizedExpression') {
          let grandParent = parent.parent;
          if (grandParent && (grandParent.name === 'IfStatement' || grandParent.name === 'WhileStatement')) {
            diagnostics.push({
              from: node.from,
              to: node.to,
              severity: 'warning',
              message: "Ehtiyot bo'ling! Shart operatori (if/while) ichida o'zlashtirish (=) operatori ishlatilgan. Taqqoslash uchun == yoki === operatoridan foydalaning."
            });
          }
        }
      }

      // 3. Reassigning a const variable
      if (node.name === 'AssignmentExpression') {
        const left = node.node.firstChild;
        if (left && left.name === 'VariableName') {
          const name = view.state.sliceDoc(left.from, left.to);
          if (variableTypes.get(name) === 'const') {
            diagnostics.push({
              from: left.from,
              to: left.to,
              severity: 'error',
              message: `Taqiqlangan o'zgartirish! const yordamida yaratilgan "${name}" o'zgaruvchisi qiymatini qayta o'zgartirib bo'lmaydi.`
            });
          }
        }
      }

      // 4. Update expression of a const variable (e.g. x++)
      if (node.name === 'UpdateExpression') {
        const varNode = node.node.getChild('VariableName');
        if (varNode) {
          const name = view.state.sliceDoc(varNode.from, varNode.to);
          if (variableTypes.get(name) === 'const') {
            diagnostics.push({
              from: varNode.from,
              to: varNode.to,
              severity: 'error',
              message: `Taqiqlangan o'zgartirish! const yordamida yaratilgan "${name}" o'zgaruvchisi qiymatini o'zgartirib bo'lmaydi.`
            });
          }
        }
      }

      // 5. Comparison with NaN: x === NaN
      if (node.name === 'BinaryExpression') {
        const left = node.node.firstChild;
        const right = node.node.lastChild;
        const isLeftNaN = left && left.name === 'VariableName' && view.state.sliceDoc(left.from, left.to) === 'NaN';
        const isRightNaN = right && right.name === 'VariableName' && view.state.sliceDoc(right.from, right.to) === 'NaN';
        if (isLeftNaN || isRightNaN) {
          diagnostics.push({
            from: node.from,
            to: node.to,
            severity: 'warning',
            message: "NaN qiymatini to'g'ridan-to'g'ri taqqoslab bo'lmaydi (har doim false beradi). Buning o'rniga isNaN() funksiyasidan foydalaning."
          });
        }
      }

      // 6. Undefined variable (Reference Error)
      if (node.name === 'VariableName') {
        const name = view.state.sliceDoc(node.from, node.to);
        // Exclude typeof check: typeof x
        let isTypeOf = false;
        let parent = node.node.parent;
        if (parent && parent.name === 'UnaryExpression') {
          const opText = view.state.sliceDoc(parent.from, parent.to).trim();
          if (opText.startsWith('typeof')) {
            isTypeOf = true;
          }
        }

        if (!isTypeOf && !declaredVariables.has(name) && !GLOBAL_NAMES.has(name)) {
          diagnostics.push({
            from: node.from,
            to: node.to,
            severity: 'warning',
            message: `"${name}" o'zgaruvchisi e'lon qilinmagan. Ishlatishdan oldin let, const yoki var yordamida e'lon qiling.`
          });
        }
      }
    }
  });

  return diagnostics;
}

const KEYWORDS = [
  { label: 'const', info: 'O\'zgarmas o\'zgaruvchi yaratish uchun (qiymatini qayta o\'zgartirib bo\'lmaydi)' },
  { label: 'let', info: 'Blok darajasidagi (block scope) o\'zgaruvchan o\'zgaruvchi yaratish uchun' },
  { label: 'var', info: 'Eski uslubdagi funksiya darajasidagi (function scope) o\'zgaruvchi yaratish uchun' },
  { label: 'function', info: 'Yangi funksiya (ma\'lum amallarni bajaruvchi kod bloki) e\'lon qilish' },
  { label: 'return', info: 'Funksiyadan natija qaytarish va uning ishini tugatish' },
  { label: 'if', info: 'Shart operatori: berilgan shart to\'g\'ri (true) bo\'lsa kod blokini ishga tushiradi' },
  { label: 'else', info: 'if sharti bajarilmaganda (false bo\'lganda) ishga tushadigan muqobil kod bloki' },
  { label: 'for', info: 'Sikl (loop) operatori: biror kod blokini belgilangan marta takrorlash uchun' },
  { label: 'while', info: 'Sikl operatori: shart to\'g\'ri (true) bo\'lib turgan muddatda kodni takrorlaydi' },
  { label: 'switch', info: 'Ko\'p variantli shartlarni tekshirish operatori' },
  { label: 'case', info: 'switch ichidagi tekshiriluvchi qiymat varianti' },
  { label: 'break', info: 'Sikl yoki switch blokidan darhol chiqish' },
  { label: 'continue', info: 'Siklning joriy qadamini to\'xtatib, keyingi qadamga o\'tish' },
  { label: 'class', info: 'Obyektlar yaratish uchun shablon (klass) e\'lon qilish' },
  { label: 'try', info: 'Xatoliklar yuz berishi mumkin bo\'lgan kod blokini tekshirish' },
  { label: 'catch', info: 'try blokida xatolik yuz bersa, uni ushlab olib qayta ishlovchi blok' },
  { label: 'finally', info: 'Xatolik yuz berishidan qat\'i nazar har doim ishlaydigan kod bloki' },
  { label: 'throw', info: 'Dasturiy ravishda yangi xatolik (exception) yaratish/tashlash' },
  { label: 'new', info: 'Klass yoki konstruktordan yangi obyekt nusxasini yaratish' },
  { label: 'typeof', info: 'Qiymat yoki o\'zgaruvchining ma\'lumot turini (data type) aniqlash' }
];

const BUILTIN_GLOBALS = [
  { label: 'console', type: 'variable', info: 'Tizim konsoli bilan ishlash obyekti' },
  { label: 'Math', type: 'variable', info: 'Matematik funksiyalar va doimiylar (PI, random va boshqalar) obyekti' },
  { label: 'JSON', type: 'variable', info: 'JSON ma\'lumotlar formati bilan ishlash obyekti' },
  { label: 'window', type: 'variable', info: 'Brauzerning global oynasi (oyna obyekti)' },
  { label: 'document', type: 'variable', info: 'HTML sahifa hujjatining global boshqaruv obyekti' },
  { label: 'setTimeout', type: 'function', info: 'Kodni ma\'lum millisekund vaqtdan keyin bir marta ishga tushiradi' },
  { label: 'setInterval', type: 'function', info: 'Kodni har ma\'lum millisekund vaqtda takroran ishga tushiradi' },
  { label: 'clearTimeout', type: 'function', info: 'setTimeout taymerini bekor qiladi' },
  { label: 'clearInterval', type: 'function', info: 'setInterval taymerini bekor qiladi' },
  { label: 'alert', type: 'function', info: 'Brauzerda ogohlantirish oynasini chiqaradi' },
  { label: 'prompt', type: 'function', info: 'Foydalanuvchidan matn ko\'rinishida ma\'lumot kiritishni so\'raydi' },
  { label: 'confirm', type: 'function', info: 'Tasdiqlash oynasini chiqaradi (Ok/Cancel, true/false qaytaradi)' },
  { label: 'Array', type: 'variable', info: 'Massivlar bilan ishlash uchun global konstruktor' },
  { label: 'Object', type: 'variable', info: 'Obyektlar bilan ishlash uchun global konstruktor' },
  { label: 'String', type: 'variable', info: 'Matnlar bilan ishlash uchun global konstruktor' },
  { label: 'Number', type: 'variable', info: 'Sonlar bilan ishlash uchun global konstruktor' },
  { label: 'Boolean', type: 'variable', info: 'Mantiqiy qiymatlar uchun global konstruktor' },
  { label: 'Promise', type: 'variable', info: 'Asinxron amallar bilan ishlash obyekti (Promise)' },
  { label: 'NaN', type: 'variable', info: 'Son emasligini bildiruvchi maxsus qiymat (Not-a-Number)' },
  { label: 'undefined', type: 'variable', info: 'Qiymati aniqlanmagan yoki berilmaganlik belgisi' },
  { label: 'Infinity', type: 'variable', info: 'Cheksizlik qiymati' },
  { label: 'parseInt', type: 'function', info: 'Matnni butun songa o\'tkazadi' },
  { label: 'parseFloat', type: 'function', info: 'Matnni o\'nlik (haqiqiy) songa o\'tkazadi' },
  { label: 'isNaN', type: 'function', info: 'Qiymat NaN (son emas) ekanligini tekshiradi (true/false)' },
  { label: 'isFinite', type: 'function', info: 'Qiymat chekli son ekanligini tekshiradi (true/false)' }
];

const BUILTIN_PROPERTIES = {
  console: [
    { label: 'log', type: 'function', info: 'Konsolga ma\'lumot yoki xabarlarni chiqarish' },
    { label: 'error', type: 'function', info: 'Konsolga xatolik (error) xabarlarini chiqarish (qizil rangda)' },
    { label: 'warn', type: 'function', info: 'Konsolga ogohlantirish (warning) xabarlarini chiqarish (sariq rangda)' },
    { label: 'table', type: 'function', info: 'Massiv yoki obyektlarni jadval (table) ko\'rinishida chiroyli chiqarish' },
    { label: 'clear', type: 'function', info: 'Konsol ekranini tozalab tashlash' }
  ],
  Math: [
    { label: 'random', type: 'function', info: '0 va 1 oralig\'ida tasodifiy o\'nlik son qaytaradi (masalan: 0.378...)' },
    { label: 'floor', type: 'function', info: 'Sonni pastga qarab butun songacha yaxlitlaydi (masalan: 4.8 -> 4)' },
    { label: 'ceil', type: 'function', info: 'Sonni tepaga qarab butun songacha yaxlitlaydi (masalan: 4.1 -> 5)' },
    { label: 'round', type: 'function', info: 'Sonni eng yaqin butun songacha yaxlitlaydi (4.5 -> 5, 4.4 -> 4)' },
    { label: 'max', type: 'function', info: 'Berilgan sonlar ichidan eng kattasini qaytaradi' },
    { label: 'min', type: 'function', info: 'Berilgan sonlar ichidan eng kichigini qaytaradi' },
    { label: 'abs', type: 'function', info: 'Sonning modulini (musbat qiymatini) qaytaradi' },
    { label: 'pow', type: 'function', info: 'Sonni darajaga ko\'taradi. Masalan: Math.pow(2, 3) = 8' },
    { label: 'sqrt', type: 'function', info: 'Sonning kvadrat ildizini qaytaradi' },
    { label: 'PI', type: 'constant', info: 'Pi doimiysi (taxminan 3.14159)' }
  ],
  JSON: [
    { label: 'stringify', type: 'function', info: 'Obyekt yoki massivni JSON matn ko\'rinishiga o\'tkazadi' },
    { label: 'parse', type: 'function', info: 'JSON formatidagi matnni JavaScript obyekt/massiviga o\'tkazadi' }
  ],
  document: [
    { label: 'getElementById', type: 'function', info: 'ID bo\'yicha HTML elementini topadi' },
    { label: 'querySelector', type: 'function', info: 'CSS selektori bo\'yicha birinchi mos kelgan elementni topadi' },
    { label: 'querySelectorAll', type: 'function', info: 'CSS selektori bo\'yicha barcha mos kelgan elementlar ro\'yxatini qaytaradi' },
    { label: 'createElement', type: 'function', info: 'Yangi HTML elementi yaratadi (masalan: \'div\', \'p\')' },
    { label: 'body', type: 'property', info: 'Hujjatning <body> bo\'limiga havola' }
  ]
};

const COMMON_METHODS = [
  // Array methods
  { label: 'push', type: 'function', info: 'Massiv oxiriga yangi element qo\'shadi va uning yangi uzunligini qaytaradi.' },
  { label: 'pop', type: 'function', info: 'Massivning oxirgi elementini o\'chiradi va o\'chirilgan qiymatni qaytaradi.' },
  { label: 'shift', type: 'function', info: 'Massivning birinchi elementini o\'chiradi va o\'chirilgan qiymatni qaytaradi.' },
  { label: 'unshift', type: 'function', info: 'Massiv boshiga yangi elementlar qo\'shadi va uning yangi uzunligini qaytaradi.' },
  { label: 'map', type: 'function', info: 'Massiv elementlarini yangi ko\'rinishga o\'tkazib, yangi massiv qaytaradi.' },
  { label: 'filter', type: 'function', info: 'Berilgan shartga javob beradigan elementlardan iborat yangi massiv qaytaradi.' },
  { label: 'forEach', type: 'function', info: 'Massivning har bir elementi uchun berilgan funksiyani bajaradi.' },
  { label: 'reduce', type: 'function', info: 'Massiv elementlarini bitta yagona qiymatga (masalan, yig\'indiga) jamlaydi.' },
  { label: 'includes', type: 'function', info: 'Massiv yoki satrda berilgan qiymat borligini tekshiradi (true/false).' },
  { label: 'indexOf', type: 'function', info: 'Qidirilayotgan element birinchi marta uchragan indeksni qaytaradi (topilmasa -1).' },
  { label: 'join', type: 'function', info: 'Massiv elementlarini berilgan belgi yordamida birlashtirib, bitta satr qaytaradi.' },
  { label: 'slice', type: 'function', info: 'Massiv yoki satrning ma\'lum bir qismini kesib olib, yangi nusxa qaytaradi.' },
  { label: 'splice', type: 'function', info: 'Massivdan elementlarni o\'chirish, almashtirish yoki yangi element qo\'shish uchun ishlatiladi.' },
  { label: 'find', type: 'function', info: 'Shartga mos keladigan birinchi element qiymatini qaytaradi.' },
  { label: 'findIndex', type: 'function', info: 'Shartga mos keladigan birinchi element indeksini qaytaradi.' },
  { label: 'length', type: 'property', info: 'Massiv elementlari soni yoki satrdagi belgilar soni.' },

  // String methods
  { label: 'split', type: 'function', info: 'Satrni belgilangan ajratuvchi bo\'yicha bo\'laklab, massiv qaytaradi.' },
  { label: 'replace', type: 'function', info: 'Satr ichidagi birinchi mos kelgan qismni boshqa qiymatga almashtiradi.' },
  { label: 'replaceAll', type: 'function', info: 'Satr ichidagi barcha mos kelgan qismlarni boshqa qiymatga almashtiradi.' },
  { label: 'toLowerCase', type: 'function', info: 'Satrdagi barcha harflarni kichik registrga o\'tkazadi.' },
  { label: 'toUpperCase', type: 'function', info: 'Satrdagi barcha harflarni katta registrga o\'tkazadi.' },
  { label: 'trim', type: 'function', info: 'Satrning boshi va oxiridagi bo\'sh joylarni olib tashlaydi.' },
  { label: 'substring', type: 'function', info: 'Satrning ko\'rsatilgan indekslar oralig\'idagi qismini qaytaradi.' },
  { label: 'charAt', type: 'function', info: 'Ko\'rsatilgan indeksdagi belgini qaytaradi.' },

  // Object methods
  { label: 'keys', type: 'function', info: 'Obyektning barcha kalitlari (xususiyat nomlari) massivini qaytaradi.' },
  { label: 'values', type: 'function', info: 'Obyektning barcha qiymatlari massivini qaytaradi.' },
  { label: 'entries', type: 'function', info: 'Obyektning [kalit, qiymat] juftliklaridan iborat massivini qaytaradi.' }
];

export function uzbekJavaScriptAutocomplete(context) {
  // 1. Detect if we are typing after a dot (property access)
  const dotMatch = context.matchBefore(/[\w$]+\.\w*/);
  if (dotMatch) {
    const text = dotMatch.text;
    const dotIndex = text.indexOf('.');
    const baseName = text.slice(0, dotIndex);
    
    let options = [];
    if (BUILTIN_PROPERTIES[baseName]) {
      options = BUILTIN_PROPERTIES[baseName];
    } else {
      // Suggest common methods for generic variables
      options = COMMON_METHODS;
    }

    return {
      from: dotMatch.from + dotIndex + 1,
      options: options.map(opt => ({
        ...opt,
        boost: opt.boost || 10
      }))
    };
  }

  // 2. Otherwise, suggest keywords, globals, and local variables
  const wordMatch = context.matchBefore(/[\w$]*/);
  if (!wordMatch || (wordMatch.from === wordMatch.to && !context.explicit)) {
    return null;
  }

  // Collect local declared names from AST
  const localNames = new Set();
  const tree = syntaxTree(context.state);
  tree.iterate({
    enter(node) {
      if (node.name === 'VariableDefinition') {
        const name = context.state.sliceDoc(node.from, node.to);
        if (name && name.length >= 2) {
          localNames.add(name);
        }
      }
    }
  });

  const options = [];

  // User-defined variables & functions (highest priority)
  for (const name of localNames) {
    options.push({
      label: name,
      type: 'variable',
      info: 'Foydalanuvchi tomonidan yaratilgan o\'zgaruvchi/funksiya',
      boost: 99
    });
  }

  // Built-in globals
  for (const glob of BUILTIN_GLOBALS) {
    options.push({
      label: glob.label,
      type: glob.type || 'variable',
      info: glob.info,
      boost: 50
    });
  }

  // Keywords
  for (const kw of KEYWORDS) {
    options.push({
      label: kw.label,
      type: 'keyword',
      info: kw.info,
      boost: 10
    });
  }

  return {
    from: wordMatch.from,
    options: options
  };
}

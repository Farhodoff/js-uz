import { parse } from 'acorn';
import { fullAncestor, simple } from 'acorn-walk';

const GLOBAL_NAMES = new Set([
  'console', 'Math', 'JSON', 'window', 'document', 'setTimeout', 'setInterval',
  'clearTimeout', 'clearInterval', 'alert', 'prompt', 'confirm', 'Array', 'Object',
  'String', 'Number', 'Boolean', 'RegExp', 'Date', 'Error', 'Map', 'Set', 'Promise',
  'NaN', 'undefined', 'Infinity', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
  'eval', 'typeof', 'void', 'arguments', 'React', 'useState', 'useEffect', 'useRef',
  'useMemo', 'useCallback', 'useContext'
]);

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
  { label: 'split', type: 'function', info: 'Satrni belgilangan ajratuvchi bo\'yicha bo\'laklab, massiv qaytaradi.' },
  { label: 'replace', type: 'function', info: 'Satr ichidagi birinchi mos kelgan qismni boshqa qiymatga almashtiradi.' },
  { label: 'replaceAll', type: 'function', info: 'Satr ichidagi barcha mos kelgan qismlarni boshqa qiymatga almashtiradi.' },
  { label: 'toLowerCase', type: 'function', info: 'Satrdagi barcha harflarni kichik registrga o\'tkazadi.' },
  { label: 'toUpperCase', type: 'function', info: 'Satrdagi barcha harflarni katta registrga o\'tkazadi.' },
  { label: 'trim', type: 'function', info: 'Satrning boshi va oxiridagi bo\'sh joylarni olib tashlaydi.' },
  { label: 'substring', type: 'function', info: 'Satrning ko\'rsatilgan indekslar oralig\'idagi qismini qaytaradi.' },
  { label: 'charAt', type: 'function', info: 'Ko\'rsatilgan indeksdagi belgini qaytaradi.' },
  { label: 'keys', type: 'function', info: 'Obyektning barcha kalitlari (xususiyat nomlari) massivini qaytaradi.' },
  { label: 'values', type: 'function', info: 'Obyektning barcha qiymatlari massivini qaytaradi.' },
  { label: 'entries', type: 'function', info: 'Obyektning [kalit, qiymat] juftliklaridan iborat massivini qaytaradi.' }
];

function buildDictionary() {
  const dictionary = {};
  KEYWORDS.forEach((item) => { dictionary[item.label] = item.info; });
  BUILTIN_GLOBALS.forEach((item) => { dictionary[item.label] = item.info; });
  COMMON_METHODS.forEach((item) => {
    if (!dictionary[item.label]) dictionary[item.label] = item.info;
  });
  Object.keys(BUILTIN_PROPERTIES).forEach((objName) => {
    BUILTIN_PROPERTIES[objName].forEach((item) => {
      dictionary[`${objName}.${item.label}`] = item.info;
      if (!dictionary[item.label]) dictionary[item.label] = item.info;
    });
  });
  return dictionary;
}

const UZBEK_DICTIONARY = buildDictionary();

function toMonacoRange(monaco, loc) {
  return {
    startLineNumber: loc.start.line,
    startColumn: loc.start.column + 1,
    endLineNumber: loc.end.line,
    endColumn: loc.end.column + 1
  };
}

export function validateUzbekJavaScript(code) {
  if (!code || !code.trim()) return [];
  let ast;
  try {
    ast = parse(code, { ecmaVersion: 2024, sourceType: 'module', locations: true });
  } catch (e) {
    const line = e.loc ? e.loc.line : 1;
    const column = e.loc ? e.loc.column : 0;
    return [{
      ...toMonacoRange({ }, { start: { line, column }, end: { line, column: column + 1 } }),
      severity: 'error',
      message: `Sintaktik xatolik: ${e.message}. Qavslar va yozilishni tekshiring.`
    }];
  }

  const diagnostics = [];
  const constNames = new Set();
  const declared = new Set();

  simple(ast, {
    VariableDeclaration(node) {
      for (const decl of node.declarations) {
        if (decl.id && decl.id.type === 'Identifier') {
          declared.add(decl.id.name);
          if (node.kind === 'const') constNames.add(decl.id.name);
        }
      }
    },
    FunctionDeclaration(node) {
      if (node.id) declared.add(node.id.name);
      for (const p of node.params || []) {
        if (p.type === 'Identifier') declared.add(p.name);
      }
    },
    FunctionExpression(node) {
      for (const p of node.params || []) {
        if (p.type === 'Identifier') declared.add(p.name);
      }
    },
    ArrowFunctionExpression(node) {
      for (const p of node.params || []) {
        if (p.type === 'Identifier') declared.add(p.name);
      }
    },
    ClassDeclaration(node) {
      if (node.id) declared.add(node.id.name);
    },
    CatchClause(node) {
      if (node.param && node.param.type === 'Identifier') declared.add(node.param.name);
    }
  });

  fullAncestor(ast, (node, ancestors) => {
    if (node.type === 'AssignmentExpression' && node.left.type === 'Identifier') {
      if (constNames.has(node.left.name) && node.loc) {
        diagnostics.push({
          ...toMonacoRange(null, node.left.loc),
          severity: 'error',
          message: `Taqiqlangan o'zgartirish! const bilan yaratilgan "${node.left.name}" ni qayta o'zgartirib bo'lmaydi.`
        });
      }
      const parent = ancestors[ancestors.length - 2];
      const grand = ancestors[ancestors.length - 3];
      const inIfWhileTest =
        (parent && (parent.type === 'IfStatement' || parent.type === 'WhileStatement')) ||
        (parent && parent.type !== 'ExpressionStatement' && grand &&
          (grand.type === 'IfStatement' || grand.type === 'WhileStatement'));
      if (inIfWhileTest) {
        diagnostics.push({
          ...toMonacoRange(null, node.loc),
          severity: 'warning',
          message: "Ehtiyot bo'ling! if/while sharti ichida = ishlatilgan. Taqqoslash uchun == yoki === ishlating."
        });
      }
    }

    if (node.type === 'UpdateExpression' && node.argument.type === 'Identifier') {
      if (constNames.has(node.argument.name) && node.argument.loc) {
        diagnostics.push({
          ...toMonacoRange(null, node.argument.loc),
          severity: 'error',
          message: `Taqiqlangan o'zgartirish! const bilan yaratilgan "${node.argument.name}" ni o'zgartirib bo'lmaydi.`
        });
      }
    }

    if (node.type === 'BinaryExpression' && ['==', '===', '!=', '!=='].includes(node.operator)) {
      const isNaN = (n) => n.type === 'Identifier' && n.name === 'NaN';
      if ((isNaN(node.left) || isNaN(node.right)) && node.loc) {
        diagnostics.push({
          ...toMonacoRange(null, node.loc),
          severity: 'warning',
          message: "NaN ni to'g'ridan-to'g'ri taqqoslab bo'lmaydi (har doim false). isNaN() ishlating."
        });
      }
    }

    if (node.type === 'Identifier') {
      const parent = ancestors[ancestors.length - 2];
      if (!parent) return;
      const isDeclaration =
        (parent.type === 'VariableDeclarator' && parent.id === node) ||
        (parent.type === 'FunctionDeclaration' && parent.id === node) ||
        (parent.type === 'FunctionExpression' && parent.id === node) ||
        (parent.type === 'ClassDeclaration' && parent.id === node) ||
        (parent.type === 'CatchClause' && parent.param === node);
      const isParam = parent.type && parent.type.includes('Function') && parent.params && parent.params.includes(node);
      const isProperty =
        (parent.type === 'MemberExpression' && parent.property === node && !parent.computed) ||
        (parent.type === 'Property' && parent.key === node && !parent.computed) ||
        (parent.type === 'PropertyDefinition' && parent.key === node);
      const isTypeof = parent.type === 'UnaryExpression' && parent.operator === 'typeof';
      if (!isDeclaration && !isParam && !isProperty && !isTypeof) {
        if (!declared.has(node.name) && !GLOBAL_NAMES.has(node.name) && node.loc && /^[a-zA-Z_$]/.test(node.name)) {
          if (parent.type === 'MemberExpression' && parent.object === node) return;
          diagnostics.push({
            ...toMonacoRange(null, node.loc),
            severity: 'warning',
            message: `"${node.name}" e'lon qilinmagan. Ishlatishdan oldin let, const yoki var bilan e'lon qiling.`
          });
        }
      }
    }
  });

  const seen = new Set();
  return diagnostics.filter((d) => {
    const key = `${d.startLineNumber}:${d.startColumn}:${d.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 50);
}

function mapToKind(monaco, type) {
  const kinds = monaco.languages.CompletionItemKind;
  if (type === 'function') return kinds.Function;
  if (type === 'keyword') return kinds.Keyword;
  if (type === 'constant') return kinds.Constant;
  if (type === 'property') return kinds.Property;
  return kinds.Variable;
}

function toSuggestions(monaco, list, range) {
  return list.map((item) => ({
    label: item.label,
    kind: mapToKind(monaco, item.type || 'variable'),
    insertText: item.label,
    range,
    detail: item.type || 'javascript',
    documentation: { value: item.info }
  }));
}

export function registerUzbekMonacoHover(monaco) {
  const hoverProvider = {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      let infoText = UZBEK_DICTIONARY[word.word];
      const lineContent = model.getLineContent(position.lineNumber);
      const beforeWordIndex = word.startColumn - 2;
      if (beforeWordIndex >= 0 && lineContent[beforeWordIndex] === '.') {
        const lineBeforeDot = lineContent.substring(0, beforeWordIndex);
        const match = lineBeforeDot.match(/[\w$]+$/);
        if (match) {
          const fullKey = `${match[0]}.${word.word}`;
          if (UZBEK_DICTIONARY[fullKey]) infoText = UZBEK_DICTIONARY[fullKey];
        }
      }
      if (infoText) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents: [
            { value: "**O'zbekcha izoh:**" },
            { value: infoText }
          ]
        };
      }
      return null;
    }
  };

  const jsDisposer = monaco.languages.registerHoverProvider('javascript', hoverProvider);
  const tsDisposer = monaco.languages.registerHoverProvider('typescript', hoverProvider);

  return () => {
    jsDisposer.dispose();
    tsDisposer.dispose();
  };
}

export function registerUzbekMonacoCompletion(monaco) {
  const provider = {
    triggerCharacters: ['.'],
    provideCompletionItems: (model, position) => {
      const word = model.getWordAtPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word ? word.startColumn : position.column,
        endColumn: position.column
      };
      const lineContent = model.getLineContent(position.lineNumber).substring(0, position.column - 1);
      const dotMatch = lineContent.match(/([\w$]+)\.[\w$]*$/);
      if (dotMatch) {
        const baseName = dotMatch[1];
        if (BUILTIN_PROPERTIES[baseName]) {
          return { suggestions: toSuggestions(monaco, BUILTIN_PROPERTIES[baseName], range) };
        }
        return { suggestions: toSuggestions(monaco, COMMON_METHODS, range) };
      }
      const suggestions = [
        ...toSuggestions(monaco, BUILTIN_GLOBALS.map((g) => ({ ...g, type: g.type || 'variable' })), range),
        ...toSuggestions(monaco, KEYWORDS.map((k) => ({ ...k, type: 'keyword' })), range)
      ];
      return { suggestions };
    }
  };

  const js = monaco.languages.registerCompletionItemProvider('javascript', provider);
  const ts = monaco.languages.registerCompletionItemProvider('typescript', provider);
  return () => { js.dispose(); ts.dispose(); };
}

export function updateUzbekMonacoMarkers(monaco, model) {
  if (!model || model.isDisposed()) return;
  const lang = model.getLanguageId();
  if (lang !== 'javascript' && lang !== 'typescript') return;
  const code = model.getValue();
  const found = validateUzbekJavaScript(code);
  const markers = found.map((d) => ({
    startLineNumber: d.startLineNumber,
    startColumn: d.startColumn,
    endLineNumber: d.endLineNumber,
    endColumn: d.endColumn,
    severity: d.severity === 'error'
      ? monaco.MarkerSeverity.Error
      : monaco.MarkerSeverity.Warning,
    message: d.message,
    source: 'uzbek-lint'
  }));
  monaco.editor.setModelMarkers(model, 'uzbek-lint', markers);
}

export function registerUzbekMonacoDiagnostics(monaco, editor, debounceMs = 400) {
  let timer = null;
  const update = () => {
    const model = editor.getModel();
    if (model) updateUzbekMonacoMarkers(monaco, model);
  };
  update();
  const disposable = editor.onDidChangeModelContent(() => {
    clearTimeout(timer);
    timer = setTimeout(update, debounceMs);
  });
  return () => {
    clearTimeout(timer);
    disposable.dispose();
    const model = editor.getModel();
    if (model && !model.isDisposed()) monaco.editor.setModelMarkers(model, 'uzbek-lint', []);
  };
}

export function registerUzbekMonacoProviders(monaco, editor) {
  const disposers = [
    registerUzbekMonacoHover(monaco),
    registerUzbekMonacoCompletion(monaco)
  ];
  if (editor) disposers.push(registerUzbekMonacoDiagnostics(monaco, editor));
  return () => disposers.forEach((d) => d());
}

// ============================================================
// JS ACADEMY — JavaScript yo'nalishi (roadmap.sh/javascript asosida)
// 7 bosqich: Asoslar → Ma'lumot Turlari → Funksiyalar → OOP/Zamonaviy JS
//            → DOM/Brauzer → Asinxron JS → Professional JS
// Keyingi qadamlar: Loyihalar, Challenges, Node.js, TypeScript, SQL,
//                   Algoritmlar, System Design, Ekotizim, Suhbat madaniyati
// ============================================================

export const curriculum = {
  // ============ 🟢 1-BOSQICH: JS ASOSLARI (0 dan) ============
  basics: {
    label: "1-Bosqich: JS Asoslari",
    color: "#4ade80",
    icon: "🟢",
    lessons: [
      { id: "jsWhat", number: "1.1", title: "JavaScript nima va qayerda ishlaydi", load: () => import("./lessons/js/01-basics/js-what.js").then(m => m.jsWhat) },
      { id: "consoleLog", number: "1.2", title: "console.log Asoslari", load: () => import("./lessons/js/01-basics/consoleLog.js").then(m => m.consoleLog) },
      { id: "commentsLesson", number: "1.3", title: "Sharhlar (Comments)", load: () => import("./lessons/js/01-basics/comments.js").then(m => m.commentsLesson) },
      { id: "variables", number: "1.4", title: "O'zgaruvchi nima (let)", load: () => import("./lessons/js/01-basics/variables.js").then(m => m.variables) },
      { id: "letReassign", number: "1.5", title: "let: Qiymatni O'zgartirish", load: () => import("./lessons/js/01-basics/letReassign.js").then(m => m.letReassign) },
      { id: "constLesson", number: "1.6", title: "const: O'zgarmas Qiymatlar", load: () => import("./lessons/js/01-basics/constLesson.js").then(m => m.constLesson) },
      { id: "varLesson", number: "1.7", title: "var: Nima uchun eskirgan?", load: () => import("./lessons/js/01-basics/varLesson.js").then(m => m.varLesson) },
      { id: "stringBasics", number: "1.8", title: "String: Matn Asoslari", load: () => import("./lessons/js/01-basics/stringBasics.js").then(m => m.stringBasics) },
      { id: "templateLiterals", number: "1.9", title: "Template Literals (Backticks)", load: () => import("./lessons/js/01-basics/templateLiterals.js").then(m => m.templateLiterals) },
      { id: "numberBasics", number: "1.10", title: "Number: Butun va O'nlik Sonlar", load: () => import("./lessons/js/01-basics/numberBasics.js").then(m => m.numberBasics) },
      { id: "booleanBasics", number: "1.11", title: "Boolean: true va false", load: () => import("./lessons/js/01-basics/booleanBasics.js").then(m => m.booleanBasics) },
      { id: "nullUndefined", number: "1.12", title: "null va undefined: Bo'sh qiymatlar", load: () => import("./lessons/js/01-basics/nullUndefined.js").then(m => m.nullUndefined) },
      { id: "typeofLesson", number: "1.13", title: "typeof: Qiymat Turini Aniqlash", load: () => import("./lessons/js/01-basics/typeof.js").then(m => m.typeofLesson) },
      { id: "typeConversionLesson", number: "1.14", title: "Turlarni O'zgartirish (Type Conversion)", load: () => import("./lessons/js/01-basics/typeConversion.js").then(m => m.typeConversionLesson) },
      { id: "operators", number: "1.15", title: "Arifmetik Operatorlar (+, -, *, /, %, **)", load: () => import("./lessons/js/01-basics/operators.js").then(m => m.operators) },
      { id: "assignmentOperators", number: "1.16", title: "Qiymat Berish Operatorlari (+=, -=, ++, --)", load: () => import("./lessons/js/01-basics/assignmentOperators.js").then(m => m.assignmentOperators) },
      { id: "comparisonOperators", number: "1.17", title: "Taqqoslash Operatorlari (>, <, >=, <=)", load: () => import("./lessons/js/01-basics/comparisonOperators.js").then(m => m.comparisonOperators) },
      { id: "equalityAlgorithms", number: "1.18", title: "== va === (Tenglik va Qat'iy Tenglik)", load: () => import("./lessons/js/01-basics/equalityAlgorithms.js").then(m => m.equalityAlgorithms) },
      { id: "logicalAnd", number: "1.19", title: "Mantiqiy VA (&&)", load: () => import("./lessons/js/01-basics/logicalAnd.js").then(m => m.logicalAnd) },
      { id: "logicalOr", number: "1.20", title: "Mantiqiy YOKI (||)", load: () => import("./lessons/js/01-basics/logicalOr.js").then(m => m.logicalOr) },
      { id: "logicalNot", number: "1.21", title: "Mantiqiy EMAS (!)", load: () => import("./lessons/js/01-basics/logicalNot.js").then(m => m.logicalNot) },
      { id: "ifStatement", number: "1.22", title: "if Shart Operatori", load: () => import("./lessons/js/01-basics/ifStatement.js").then(m => m.ifStatement) },
      { id: "elseLesson", number: "1.23", title: "else (Aks holda)", load: () => import("./lessons/js/01-basics/elseLesson.js").then(m => m.elseLesson) },
      { id: "elseIfLesson", number: "1.24", title: "else if (Ketma-ket shartlar)", load: () => import("./lessons/js/01-basics/elseIfLesson.js").then(m => m.elseIfLesson) },
      { id: "switchLesson", number: "1.25", title: "switch (Ko'p yo'lli tanlov)", load: () => import("./lessons/js/01-basics/switch.js").then(m => m.switchLesson) },
      { id: "whileLesson", number: "1.26", title: "while Sikli", load: () => import("./lessons/js/01-basics/whileLesson.js").then(m => m.whileLesson) },
      { id: "forLesson", number: "1.27", title: "for Sikli", load: () => import("./lessons/js/01-basics/forLesson.js").then(m => m.forLesson) },
      { id: "doWhileLesson", number: "1.28", title: "do...while Sikli", load: () => import("./lessons/js/01-basics/doWhileLesson.js").then(m => m.doWhileLesson) },
      { id: "breakLesson", number: "1.29", title: "break (Siklni to'xtatish)", load: () => import("./lessons/js/01-basics/breakLesson.js").then(m => m.breakLesson) },
      { id: "continueLesson", number: "1.30", title: "continue (Aylanishni o'tkazib yuborish)", load: () => import("./lessons/js/01-basics/continueLesson.js").then(m => m.continueLesson) },
      { id: "functionDeclaration", number: "1.31", title: "Funksiyani E'lon Qilish va Chaqirish", load: () => import("./lessons/js/01-basics/functionDeclaration.js").then(m => m.functionDeclaration) },
      { id: "parametersLesson", number: "1.32", title: "Parametr va Argument", load: () => import("./lessons/js/01-basics/parametersLesson.js").then(m => m.parametersLesson) },
      { id: "returnLesson", number: "1.33", title: "return (Qiymat Qaytarish)", load: () => import("./lessons/js/01-basics/returnLesson.js").then(m => m.returnLesson) },
      { id: "arrowBasics", number: "1.34", title: "Arrow Funksiya: () => {}", load: () => import("./lessons/js/01-basics/arrowBasics.js").then(m => m.arrowBasics) },
      { id: "scopeBasics", number: "1.35", title: "Scope (Ko'lam): Global, Blok va Lokal", load: () => import("./lessons/js/01-basics/scopeLesson.js").then(m => m.scopeBasics) },
      { id: "callbackBasics", number: "1.36", title: "Callback Funksiyalar", load: () => import("./lessons/js/01-basics/callbackBasics.js").then(m => m.callbackBasics) },
      { id: "closureBasics", number: "1.37", title: "Closure (Yopilish / Eslab Qolish)", load: () => import("./lessons/js/01-basics/closureBasics.js").then(m => m.closureBasics) },
      { id: "arrayBasics", number: "1.38", title: "Massiv Yaratish va Murojaat", load: () => import("./lessons/js/01-basics/arrayBasics.js").then(m => m.arrayBasics) },
      { id: "pushPopBasics", number: "1.39", title: "push va pop Metodlari", load: () => import("./lessons/js/01-basics/pushPopBasics.js").then(m => m.pushPopBasics) },
      { id: "forOfBasics", number: "1.40", title: "for...of Sikli", load: () => import("./lessons/js/01-basics/forOfBasics.js").then(m => m.forOfBasics) },
      { id: "forEachBasics", number: "1.41", title: "forEach Metodi", load: () => import("./lessons/js/01-basics/forEachBasics.js").then(m => m.forEachBasics) },
      { id: "mapBasics", number: "1.42", title: "map Metodi", load: () => import("./lessons/js/01-basics/mapBasics.js").then(m => m.mapBasics) },
      { id: "filterBasics", number: "1.43", title: "filter Metodi", load: () => import("./lessons/js/01-basics/filterBasics.js").then(m => m.filterBasics) },
      { id: "objectBasics", number: "1.45", title: "Obyekt Yaratish va Murojaat", load: () => import("./lessons/js/01-basics/objectBasics.js").then(m => m.objectBasics) },
      { id: "objectUpdateBasics", number: "1.46", title: "Obyektni O'zgartirish: Qo'shish, Yangilash, Delete", load: () => import("./lessons/js/01-basics/objectUpdateBasics.js").then(m => m.objectUpdateBasics) },
      { id: "forInBasics", number: "1.47", title: "for...in Sikli", load: () => import("./lessons/js/01-basics/forInBasics.js").then(m => m.forInBasics) },
      { id: "jsonBasics", number: "1.48", title: "JSON Asoslari: stringify va parse", load: () => import("./lessons/js/01-basics/jsonBasics.js").then(m => m.jsonBasics) },
      { id: "arrayDestructuringBasics", number: "1.49", title: "Massiv Destructuring: Qiymatlarni Ajratish", load: () => import("./lessons/js/01-basics/arrayDestructuringBasics.js").then(m => m.arrayDestructuringBasics) },
      { id: "objectDestructuringBasics", number: "1.50", title: "Obyekt Destructuring: Xususiyatlarni Ajratish", load: () => import("./lessons/js/01-basics/objectDestructuringBasics.js").then(m => m.objectDestructuringBasics) },
      { id: "dataTypesLesson", number: "1.5", title: "Ma'lumot Turlari (Data Types)", load: () => import("./lessons/js/01-basics/dataTypes.js").then(m => m.dataTypesLesson) },
      { id: "moreDataTypesLesson", number: "1.6", title: "Ma'lumot Turlari: Null, Symbol, BigInt", load: () => import("./lessons/js/01-basics/moreDataTypes.js").then(m => m.moreDataTypesLesson) },
      { id: "objectIntroLesson", number: "1.7", title: "Obyektlarga Kirish (Object)", load: () => import("./lessons/js/01-basics/objectIntro.js").then(m => m.objectIntroLesson) },
      { id: "typeCasting", number: "1.11", title: "Explicit Type Casting", load: () => import("./lessons/js/01-basics/typeCasting.js").then(m => m.typeCasting) },
      { id: "implicitCasting", number: "1.12", title: "Implicit Type Casting", load: () => import("./lessons/js/01-basics/implicitCasting.js").then(m => m.implicitCasting) },
      { id: "globalScopeLesson", number: "1.14", title: "Global Scope", load: () => import("./lessons/js/01-basics/globalScope.js").then(m => m.globalScopeLesson) },
      { id: "functionScopeLesson", number: "1.15", title: "Function Scope", load: () => import("./lessons/js/01-basics/functionScope.js").then(m => m.functionScopeLesson) },
      { id: "blockScopeLesson", number: "1.16", title: "Blok Ko'lami (Block Scope)", load: () => import("./lessons/js/01-basics/blockScope.js").then(m => m.blockScopeLesson) },
      { id: "ifElseLesson", number: "1.17", title: "Shart Operatorlari: if, else", load: () => import("./lessons/js/01-basics/ifElse.js").then(m => m.ifElseLesson) },
      { id: "loops", number: "1.19", title: "Sikllar: for, while, do-while", load: () => import("./lessons/js/01-basics/loops.js").then(m => m.loops) },
      { id: "forOfForIn", number: "1.20", title: "Sikllar: for...of va for...in", load: () => import("./lessons/js/01-basics/forOfForIn.js").then(m => m.forOfForIn) },
      { id: "breakContinue", number: "1.21", title: "Sikllarni Boshqarish: break, continue", load: () => import("./lessons/js/01-basics/breakContinue.js").then(m => m.breakContinue) },
      { id: "functions", number: "1.22", title: "Funksiyalar Asoslari", load: () => import("./lessons/js/01-basics/functions.js").then(m => m.functions) },
      { id: "strictMode", number: "1.25", title: "Qat'iy Rejim (Strict Mode)", load: () => import("./lessons/js/01-basics/strictMode.js").then(m => m.strictMode) },
      { id: "jsGotchas", number: "1.26", title: "JavaScript Gotchas (Tuzoqlar)", load: () => import("./lessons/js/01-basics/gotchas.js").then(m => m.jsGotchas) },
      { id: "cheat-sheet", number: "1.27", title: "⚡ JS Cheat Sheet (To'liq ma'lumotnoma)", load: () => import("./lessons/js/01-basics/cheatSheet.js").then(m => m.cheatSheet) },
      { id: "miniProject", number: "1.28", title: "🏆 Mini-Loyiha: Kalkulyator Yadrosi", load: () => import("./lessons/js/01-basics/miniProject.js").then(m => m.miniProject) }
    ]
  },

  // ============ 🟢 2-BOSQICH: MA'LUMOT TURLARI CHUQURROQ ============
  data: {
    label: "2-Bosqich: Ma'lumot Turlari",
    color: "#22c55e",
    icon: "🟢",
    lessons: [
      { id: "mathObject", number: "2.1", title: "Sonlar va Math Obyekti", load: () => import("./lessons/js/02-data/mathObject.js").then(m => m.mathObject) },
      { id: "stringMethods", number: "2.2", title: "String Metodlari", load: () => import("./lessons/js/02-data/stringMethods.js").then(m => m.stringMethods) },
      { id: "dateObject", number: "2.3", title: "Date Obyekti va Vaqt", load: () => import("./lessons/js/02-data/dateObject.js").then(m => m.dateObject) },
      { id: "arrays", number: "2.4", title: "Massivlar (Arrays) va Ularning Metodlari", load: () => import("./lessons/js/02-data/arrays.js").then(m => m.arrays) },
      { id: "higherOrderArrays", number: "2.5", title: "Massivlar uchun Higher Order Metodlar (map, filter, reduce)", load: () => import("./lessons/js/02-data/higherOrderArrays.js").then(m => m.higherOrderArrays) },
      { id: "objects", number: "2.6", title: "Obyektlar (Objects)", load: () => import("./lessons/js/02-data/objects.js").then(m => m.objects) },
      { id: "objectMethods", number: "2.7", title: "Object Metodlari: keys, values, entries", load: () => import("./lessons/js/02-data/objectMethods.js").then(m => m.objectMethods) },
      { id: "primitivesVsObjects", number: "2.8", title: "Primitivlar va Obyektlar (Xotira farqi)", load: () => import("./lessons/js/02-data/primitivesVsObjects.js").then(m => m.primitivesVsObjects) },
      { id: "immutableData", number: "2.9", title: "Immutability va Deep vs Shallow Copy", load: () => import("./lessons/js/02-data/immutableData.js").then(m => m.immutableData) },
      { id: "mapSetWeak", number: "2.10", title: "Map, Set, WeakMap va WeakSet", load: () => import("./lessons/js/02-data/mapSetWeak.js").then(m => m.mapSetWeak) },
      { id: "symbolType", number: "2.11", title: "Symbol Ma'lumot Turi", load: () => import("./lessons/js/02-data/symbolType.js").then(m => m.symbolType) },
      { id: "json", number: "2.12", title: "JSON: parse, stringify va Amaliy Qo'llanish", load: () => import("./lessons/js/02-data/json.js").then(m => m.json) },
      { id: "intlApi", number: "2.13", title: "Internationalization (Intl) API", load: () => import("./lessons/js/02-data/intlApi.js").then(m => m.intlApi) },
      { id: "globalObjects", number: "2.14", title: "Global Obyektlar: Math, Date, Set, Map, Window va Document", load: () => import("./lessons/js/02-data/globalObjects.js").then(m => m.globalObjects) },
      { id: "globalObjectsCheatSheet", number: "2.15", title: "⚡ Global Obyektlar Cheat Sheet (Math, Date, Set, Map, Window, Document)", load: () => import("./lessons/js/02-data/globalObjectsCheatSheet.js").then(m => m.globalObjectsCheatSheet) }
    ]
  },

  // ============ 🟡 3-BOSQICH: FUNKSIYALAR CHUQUR ============
  functions: {
    label: "3-Bosqich: Funksiyalar Chuqur",
    color: "#eab308",
    icon: "🟡",
    lessons: [
      { id: "scopeLesson", number: "3.1", title: "Scope (Ko'rinish Sohalari) va Scope Chain", load: () => import("./lessons/js/03-functions/scope.js").then(m => m.scopeLesson) },
      { id: "hoistingThisLesson", number: "3.2", title: "Hoisting", load: () => import("./lessons/js/03-functions/hoistingThis.js").then(m => m.hoistingThisLesson) },
      { id: "executionContextLesson", number: "3.3", title: "Bajarilish Konteksti (Execution Context)", load: () => import("./lessons/js/03-functions/executionContext.js").then(m => m.executionContextLesson) },
      { id: "arrowFunctions", number: "3.4", title: "Arrow Functions", load: () => import("./lessons/js/03-functions/arrowFunctions.js").then(m => m.arrowFunctions) },
      { id: "thisKeyword", number: "3.5", title: "This Keyword va Context Binding", load: () => import("./lessons/js/03-functions/thisKeyword.js").then(m => m.thisKeyword) },
      { id: "callApplyBind", number: "3.6", title: "Call, Apply va Bind Metodlari", load: () => import("./lessons/js/03-functions/callApplyBind.js").then(m => m.callApplyBind) },
      { id: "closures", number: "3.7", title: "Closures (Yopilmalar)", load: () => import("./lessons/js/03-functions/closures.js").then(m => m.closures) },
      { id: "closuresDeepDive", number: "3.8", title: "Closures: Amaliy Tahlil va Xotira Boshqaruvi", load: () => import("./lessons/js/03-functions/closuresDeepDive.js").then(m => m.closuresDeepDive) },
      { id: "higherOrderFunctions", number: "3.9", title: "Higher-Order Functions va Currying", load: () => import("./lessons/js/03-functions/higherOrderFunctions.js").then(m => m.higherOrderFunctions) },
      { id: "recursion", number: "3.10", title: "Rekursiya (Recursion)", load: () => import("./lessons/js/03-functions/recursion.js").then(m => m.recursion) },
      { id: "interviewQuestionsBeginner", number: "3.11", title: "🎯 Interview Savollar: Asoslar + Funksiyalar", load: () => import("./lessons/js/03-functions/interviewQuestions.js").then(m => m.interviewQuestionsBeginner) }
    ]
  },

  // ============ 🟡 4-BOSQICH: OOP VA ZAMONAVIY JS ============
  oopModern: {
    label: "4-Bosqich: OOP va Zamonaviy JS",
    color: "#e5b84f",
    icon: "🟡",
    lessons: [
      { id: "objectLiteralsMethods", number: "4.1", title: "OOP Asoslari: Obyekt Literal, Property va Method", load: () => import("./lessons/js/04-oop-modern/objectLiteralsMethods.js").then(m => m.objectLiteralsMethods) },
      { id: "constructorFunctions", number: "4.2", title: "Konstruktor Funksiyalar va new Operatori", load: () => import("./lessons/js/04-oop-modern/constructorFunctions.js").then(m => m.constructorFunctions) },
      { id: "classSyntax", number: "4.3", title: "ES6 Klasslar: class, constructor va static", load: () => import("./lessons/js/04-oop-modern/classSyntax.js").then(m => m.classSyntax) },
      { id: "encapsulation", number: "4.4", title: "Inkapsulyatsiya: Private Maydonlar (#), Getter va Setter", load: () => import("./lessons/js/04-oop-modern/encapsulation.js").then(m => m.encapsulation) },
      { id: "oopInheritance", number: "4.5", title: "Meros Olish: extends, super va Polimorfizm", load: () => import("./lessons/js/04-oop-modern/oopInheritance.js").then(m => m.oopInheritance) },
      { id: "prototypeChainDeep", number: "4.6", title: "Prototip Zanjiri Chuqur: Object.create va Meros Mexanizmi", load: () => import("./lessons/js/04-oop-modern/prototypeChainDeep.js").then(m => m.prototypeChainDeep) },
      { id: "oopPrinciples", number: "4.7", title: "OOP'ning 4 Asosiy Prinsipi (SOLID yo'lida)", load: () => import("./lessons/js/04-oop-modern/oopPrinciples.js").then(m => m.oopPrinciples) },
      { id: "oopPatterns", number: "4.8", title: "OOP Design Patterns: Singleton, Observer, Factory, Module", load: () => import("./lessons/js/04-oop-modern/oopPatterns.js").then(m => m.oopPatterns) },
      { id: "oopCommonMistakes", number: "4.9", title: "OOP Xatolarini Tushunish va Debugging", load: () => import("./lessons/js/04-oop-modern/oopCommonMistakes.js").then(m => m.oopCommonMistakes) },
      { id: "oopMiniProject", number: "4.10", title: "🏆 Mini-Loyiha: Kutubxona Boshqaruv Tizimi (OOP)", load: () => import("./lessons/js/04-oop-modern/oopMiniProject.js").then(m => m.oopMiniProject) },
      { id: "prototypes", number: "4.11", title: "Prototiplar va Prototip Zanjiri (Prototype Chain)", load: () => import("./lessons/js/04-oop-modern/prototypes.js").then(m => m.prototypes) },
      { id: "classes", number: "4.12", title: "Classes (Klasslar) va OOP", load: () => import("./lessons/js/04-oop-modern/classes.js").then(m => m.classes) },
      { id: "destructuring", number: "4.13", title: "Destructuring (Ma'lumotlarni ochish)", load: () => import("./lessons/js/04-oop-modern/destructuring.js").then(m => m.destructuring) },
      { id: "spreadRest", number: "4.14", title: "Spread va Rest (...) — Yoyish va Yig'ish", load: () => import("./lessons/js/04-oop-modern/spreadRest.js").then(m => m.spreadRest) },
      { id: "optionalChaining", number: "4.15", title: "Optional Chaining & Nullish Coalescing", load: () => import("./lessons/js/04-oop-modern/optionalChaining.js").then(m => m.optionalChaining) },
      { id: "es6Features", number: "4.16", title: "ES6+ Yangi Imkoniyatlari", load: () => import("./lessons/js/04-oop-modern/es6Features.js").then(m => m.es6Features) },
      { id: "modules", number: "4.17", title: "Modullar: import va export (ESM, CommonJS)", load: () => import("./lessons/js/04-oop-modern/modules.js").then(m => m.modules) },
      { id: "object-protection", number: "4.18", title: "Obyektlarni Himoyalash: Freeze va Seal", load: () => import("./lessons/js/04-oop-modern/objectProtection.js").then(m => m.objectProtection) }
    ]
  },

  // ============ 🟠 5-BOSQICH: DOM VA BRAUZER ============
  domBrowser: {
    label: "5-Bosqich: DOM va Brauzer",
    color: "#f97316",
    icon: "🟠",
    lessons: [
      { id: "dom", number: "5.1", title: "DOM Asoslari va Hujjat Daraxti", load: () => import("./lessons/js/05-dom-browser/dom.js").then(m => m.dom) },
      { id: "domManipulation", number: "5.2", title: "DOM Manipulyatsiyasi: Elementlar Yaratish va Boshqarish", load: () => import("./lessons/js/05-dom-browser/domManipulation.js").then(m => m.domManipulation) },
      { id: "events", number: "5.3", title: "Hodisalar va Event Handling (Event Delegation)", load: () => import("./lessons/js/05-dom-browser/events.js").then(m => m.events) },
      { id: "forms", number: "5.4", title: "Formalar, Validatsiya va FormData API", load: () => import("./lessons/js/05-dom-browser/forms.js").then(m => m.forms) },
      { id: "timers", number: "5.5", title: "Vaqt Funksiyalari (Timers): setTimeout, setInterval", load: () => import("./lessons/js/05-dom-browser/timers.js").then(m => m.timers) },
      { id: "localStorage", number: "5.6", title: "localStorage va sessionStorage", load: () => import("./lessons/js/05-dom-browser/localStorage.js").then(m => m.localStorage) },
      { id: "bomAndWindow", number: "5.7", title: "BOM (Browser Object Model) va Window API", load: () => import("./lessons/js/05-dom-browser/bomAndWindow.js").then(m => m.bomAndWindow) },
      { id: "interviewQuestionsIntermediate", number: "5.8", title: "🎯 Interview Savollar: DOM va Brauzer", load: () => import("./lessons/js/05-dom-browser/interviewQuestions.js").then(m => m.interviewQuestionsIntermediate) }
    ]
  },

  // ============ 🔴 6-BOSQICH: ASINXRON JS ============
  async: {
    label: "6-Bosqich: Asinxron JS",
    color: "#ef4444",
    icon: "🔴",
    lessons: [
      { id: "callbacks", number: "6.1", title: "Callbacks va Callback Hell", load: () => import("./lessons/js/06-async/callbacks.js").then(m => m.callbacks) },
      { id: "promises", number: "6.2", title: "Promises (Va'dalar) va Zanjirli Asinxronlik", load: () => import("./lessons/js/06-async/promises.js").then(m => m.promises) },
      { id: "asyncAwait", number: "6.3", title: "Async/Await — Asinxronlikning Cho'qqisi", load: () => import("./lessons/js/06-async/asyncAwait.js").then(m => m.asyncAwait) },
      { id: "fetchApi", number: "6.4", title: "Fetch API va REST API bilan Ishlash", load: () => import("./lessons/js/06-async/fetch.js").then(m => m.fetch) },
      { id: "advancedFetch", number: "6.5", title: "Advanced Fetch: So'rov Sozlamalari va Aborting", load: () => import("./lessons/js/06-async/advancedFetch.js").then(m => m.advancedFetch) },
      { id: "errorHandling", number: "6.6", title: "Xatolarni Boshqarish: try, catch, finally", load: () => import("./lessons/js/06-async/errorHandling.js").then(m => m.errorHandling) },
      { id: "eventLoop", number: "6.7", title: "Event Loop Asoslari", load: () => import("./lessons/js/06-async/eventLoop.js").then(m => m.eventLoop) },
      { id: "eventLoopDeep", number: "6.8", title: "Event Loop Chuqur Tahlili: Microtasks/Macrotasks", load: () => import("./lessons/js/06-async/eventLoopDeep.js").then(m => m.eventLoopDeep) },
      { id: "advancedTaskScheduling", number: "6.9", title: "Task Scheduling: setTimeout(0) va Navbatlar", load: () => import("./lessons/js/06-async/advancedTaskScheduling.js").then(m => m.advancedTaskScheduling) },
      { id: "asyncPolyfills", number: "6.10", title: "Promise Polyfill-lar Yozish", load: () => import("./lessons/js/06-async/asyncPolyfills.js").then(m => m.asyncPolyfills) }
    ]
  },

  // ============ 🔴 7-BOSQICH: PROFESSIONAL JS (Medium-Hard) ============
  professional: {
    label: "7-Bosqich: Professional JS",
    color: "#e07b5a",
    icon: "🔴",
    lessons: [
      { id: "regex", number: "7.1", title: "Regular Expressions (Regex)", load: () => import("./lessons/js/07-professional/regex.js").then(m => m.regex) },
      { id: "iteratorsGenerators", number: "7.2", title: "Iterators va Generators", load: () => import("./lessons/js/07-professional/iteratorsGenerators.js").then(m => m.iteratorsGenerators) },
      { id: "metaprogramming", number: "7.3", title: "Metaprogramming: Proxy va Reflect", load: () => import("./lessons/js/07-professional/metaprogramming.js").then(m => m.metaprogramming) },
      { id: "reactivePatterns", number: "7.4", title: "Reaktiv Tizimlar (Proxy & PubSub)", load: () => import("./lessons/js/07-professional/reactivePatterns.js").then(m => m.reactivePatterns) },
      { id: "propertyDescriptors", number: "7.5", title: "Property Descriptors va Obyektlarni Himoyalash (freeze, seal)", load: () => import("./lessons/js/07-professional/propertyDescriptors.js").then(m => m.propertyDescriptors) },
      { id: "designPatterns", number: "7.6", title: "Design Patterns: Singleton, Factory, Observer, Decorator, Strategy", load: () => import("./lessons/js/07-professional/designPatterns.js").then(m => m.designPatterns) },
      { id: "functionalProgramming", number: "7.7", title: "Functional Programming (Funksional Dasturlash)", load: () => import("./lessons/js/07-professional/functionalProgramming.js").then(m => m.functionalProgramming) },
      { id: "debounceThrottle", number: "7.8", title: "Debounce va Throttle: Hodisalarni Optimal Boshqarish", load: () => import("./lessons/js/07-professional/debounceThrottle.js").then(m => m.debounceThrottle) },
      { id: "debugging", number: "7.9", title: "Debugging va Xatolarni Aniqlash", load: () => import("./lessons/js/07-professional/debugging.js").then(m => m.debugging) },
      { id: "security", number: "7.10", title: "Web Xavfsizlik (XSS, CSRF, Injection)", load: () => import("./lessons/js/07-professional/security.js").then(m => m.security) },
      { id: "unitTesting", number: "7.11", title: "Unit Testing va Jest Asoslari", load: () => import("./lessons/js/07-professional/unitTesting.js").then(m => m.unitTesting) },
      { id: "integrationE2eTesting", number: "7.12", title: "Integratsion va E2E (End-to-End) Testlash", load: () => import("./lessons/js/07-professional/integrationE2eTesting.js").then(m => m.integrationE2eTesting) },
      { id: "performanceOptimization", number: "7.13", title: "JavaScript Unumdorligini Oshirish (Performance)", load: () => import("./lessons/js/07-professional/performanceOptimization.js").then(m => m.performanceOptimization) },
      { id: "performanceAlgos", number: "7.14", title: "Optimallashtirish Algoritmlari (Caching & Limits)", load: () => import("./lessons/js/07-professional/performanceAlgos.js").then(m => m.performanceAlgos) },
      { id: "domPerformance", number: "7.15", title: "DOM Performance: Reflow va Repaint", load: () => import("./lessons/js/07-professional/domPerformance.js").then(m => m.domPerformance) },
      { id: "memoryManagement", number: "7.16", title: "Memory Management va Garbage Collection", load: () => import("./lessons/js/07-professional/memoryManagement.js").then(m => m.memoryManagement) },
      { id: "v8CompilerOptimization", number: "7.17", title: "V8 Dvigateli: Kompilyatsiya va Optimizatsiya", load: () => import("./lessons/js/07-professional/v8CompilerOptimization.js").then(m => m.v8CompilerOptimization) },
      { id: "v8GarbageCollection", number: "7.18", title: "V8 Garbage Collection Chuqur", load: () => import("./lessons/js/07-professional/v8GarbageCollection.js").then(m => m.v8GarbageCollection) },
      { id: "typedArrays", number: "7.19", title: "Typed Arrays va DataView", load: () => import("./lessons/js/07-professional/typedArrays.js").then(m => m.typedArrays) },
      { id: "binaryData", number: "7.20", title: "Binary Data va File API (Blob, File, FileReader)", load: () => import("./lessons/js/07-professional/binaryData.js").then(m => m.binaryData) },
      { id: "webWorkers", number: "7.21", title: "Web Workers: Fon Rejimida Ko'p Oqimli Ishlash", load: () => import("./lessons/js/07-professional/webWorkers.js").then(m => m.webWorkers) },
      { id: "serviceWorkersPwa", number: "7.22", title: "Service Workers va Progressive Web Apps (PWA)", load: () => import("./lessons/js/07-professional/serviceWorkersPwa.js").then(m => m.serviceWorkersPwa) },
      { id: "webSockets", number: "7.23", title: "WebSockets: Real-time Ikki Tomonlama Aloqa", load: () => import("./lessons/js/07-professional/webSockets.js").then(m => m.webSockets) },
      { id: "serverSentEvents", number: "7.24", title: "Server-Sent Events (SSE)", load: () => import("./lessons/js/07-professional/serverSentEvents.js").then(m => m.serverSentEvents) },
      { id: "webComponents", number: "7.25", title: "Web Components va Shadow DOM", load: () => import("./lessons/js/07-professional/webComponents.js").then(m => m.webComponents) },
      { id: "webAssemblyIntegration", number: "7.26", title: "WebAssembly Integration va Parallel Dasturlash", load: () => import("./lessons/js/07-professional/webAssemblyIntegration.js").then(m => m.webAssemblyIntegration) },
      { id: "historyRouting", number: "7.27", title: "History API va SPA Routing", load: () => import("./lessons/js/07-professional/historyRouting.js").then(m => m.historyRouting) },
      { id: "advancedWebApis", number: "7.28", title: "Intersection va Mutation Observer", load: () => import("./lessons/js/07-professional/advancedWebApis.js").then(m => m.advancedWebApis) },
      { id: "advancedWebStorage", number: "7.29", title: "Kengaytirilgan Web Storage: IndexedDB va Cookies", load: () => import("./lessons/js/07-professional/advancedWebStorage.js").then(m => m.advancedWebStorage) },
      { id: "webAnimations", number: "7.30", title: "Web Animations API va requestAnimationFrame", load: () => import("./lessons/js/07-professional/webAnimations.js").then(m => m.webAnimations) },
      { id: "canvas", number: "7.31", title: "HTML5 Canvas API", load: () => import("./lessons/js/07-professional/canvas.js").then(m => m.canvas) },
      { id: "audioVideo", number: "7.32", title: "Audio va Video API", load: () => import("./lessons/js/07-professional/audioVideo.js").then(m => m.audioVideo) },
      { id: "dragAndDrop", number: "7.33", title: "HTML5 Drag and Drop API", load: () => import("./lessons/js/07-professional/dragAndDrop.js").then(m => m.dragAndDrop) },
      { id: "selectionRange", number: "7.34", title: "Selection va Range API", load: () => import("./lessons/js/07-professional/selectionRange.js").then(m => m.selectionRange) },
      { id: "clipboardApi", number: "7.35", title: "Clipboard API: Nusxalash va Joylash", load: () => import("./lessons/js/07-professional/clipboardApi.js").then(m => m.clipboardApi) },
      { id: "scrollingApis", number: "7.36", title: "Scrolling API: Silliq Harakat va Skroll O'lchovlari", load: () => import("./lessons/js/07-professional/scrollingApis.js").then(m => m.scrollingApis) },
      { id: "a11yAria", number: "7.37", title: "Accessibility (A11y) va ARIA", load: () => import("./lessons/js/07-professional/a11yAria.js").then(m => m.a11yAria) },
      { id: "jsPitfalls", number: "7.38", title: "JS Pitfalls: Ko'p Uchraydigan Xatolar", load: () => import("./lessons/js/07-professional/jsPitfalls.js").then(m => m.jsPitfalls) },
      { id: "problemSolving", number: "7.39", title: "Muammolarni Yechish va Algoritmlar", load: () => import("./lessons/js/07-professional/problemSolving.js").then(m => m.problemSolving) },
      { id: "interviewQuestionsAdvanced", number: "7.40", title: "🎯 Interview Savollar: Professional JS", load: () => import("./lessons/js/07-professional/interviewQuestions.js").then(m => m.interviewQuestionsAdvanced) }
    ]
  },

  // ============================================================
  // 🚀 KEYINGI QADAMLAR (JS yo'nalishidan keyin)
  // ============================================================
  projects: {
    label: "Loyihalar",
    color: "#7a9e7e",
    icon: "🏗️",
    lessons: [
      { id: "p1", title: "Loyiha: Todo List (Vazifalar Boshqaruvchisi)", load: () => import("./lessons/projects/todoList.js").then(m => m.todoList) },
      { id: "p2", title: "Loyiha: Ob-havo Ilovasi (Mini-loyiha)", load: () => import("./lessons/projects/weatherApp.js").then(m => m.weatherApp) },
      { id: "movieSearchApi", title: "Loyiha: API va Backend (Kino Izlash)", load: () => import("./lessons/projects/movieSearchApi.js").then(m => m.movieSearchApi) },
      { id: "p3", title: "Loyiha: Express.js va React REST API (Full-stack)", load: () => import("./lessons/projects/fullstackRestApi.js").then(m => m.fullstackRestApi) }
    ]
  },
  challenges: {
    label: "Challenges",
    color: "#9b59b6",
    icon: "🏆",
    lessons: [
      { id: "arrayChallenges", title: "Array (Massiv) Masalalari", load: () => import("./lessons/challenges/arrayChallenges.js").then(m => m.arrayChallenges) },
      { id: "stringChallenges", title: "String (Satr) Masalalari", load: () => import("./lessons/challenges/stringChallenges.js").then(m => m.stringChallenges) },
      { id: "mathLogicChallenges", title: "Matematika va Mantiq Masalalari", load: () => import("./lessons/challenges/mathLogicChallenges.js").then(m => m.mathLogicChallenges) },
      { id: "objectChallenges", title: "Object (Obyekt) Masalalari", load: () => import("./lessons/challenges/objectChallenges.js").then(m => m.objectChallenges) }
    ]
  },
  nodejs: {
    label: "Node.js",
    color: "#68a063",
    icon: "🟩",
    lessons: [
      { id: "step1_nodejs_intro", title: "1-Dars: Node.js Asoslari, REPL va Global Obyekt", load: () => import("./lessons/nodejs/step1_nodejs_intro.js").then(m => m.step1_nodejs_intro) },
      { id: "step2_modules_fs", title: "2-Dars: Modullar (CommonJS, ESM) va File System", load: () => import("./lessons/nodejs/step2_modules_fs.js").then(m => m.step2_modules_fs) },
      { id: "step3_events_streams", title: "3-Dars: Events, Streams va Buffers", load: () => import("./lessons/nodejs/step3_events_streams.js").then(m => m.step3_events_streams) },
      { id: "step4_http_server", title: "4-Dars: HTTP Moduli va Server Yaratish", load: () => import("./lessons/nodejs/step4_http_server.js").then(m => m.step4_http_server) },
      { id: "step5_express_basics", title: "5-Dars: Express.js Asoslari va Routing", load: () => import("./lessons/nodejs/step5_express_basics.js").then(m => m.step5_express_basics) },
      { id: "middlewareBasics", title: "6-Dars: Express Middleware", load: () => import("./lessons/nodejs/middlewareBasics.js").then(m => m.middlewareBasics) }
    ]
  },
  typescript: {
    label: "TypeScript",
    color: "#3178c6",
    icon: "📘",
    lessons: [
      { id: "typescriptBasics", title: "TypeScript Asoslari va Tiplar", load: () => import("./lessons/typescript/typescriptBasics.js").then(m => m.typescriptBasics) },
      { id: "interfacesTypes", title: "Interfaces va Type Aliases", load: () => import("./lessons/typescript/interfacesTypes.js").then(m => m.interfacesTypes) },
      { id: "typescriptFunctions", title: "Funksiyalar va Overloads", load: () => import("./lessons/typescript/typescriptFunctions.js").then(m => m.typescriptFunctions) },
      { id: "typescriptClasses", title: "Klasslar va OOP", load: () => import("./lessons/typescript/typescriptClasses.js").then(m => m.typescriptClasses) },
      { id: "typescriptGenerics", title: "Generics (Umumiylashtirish)", load: () => import("./lessons/typescript/typescriptGenerics.js").then(m => m.typescriptGenerics) },
      { id: "advancedTypes", title: "Advanced & Utility Types", load: () => import("./lessons/typescript/advancedTypes.js").then(m => m.advancedTypes) },
      { id: "typeNarrowing", title: "Type Narrowing va Type Guards", load: () => import("./lessons/typescript/typeNarrowing.js").then(m => m.typeNarrowing) },
      { id: "reactTypeScript", title: "React va TypeScript Integratsiyasi", load: () => import("./lessons/typescript/reactTypeScript.js").then(m => m.reactTypeScript) },
      { id: "utilityTypes", title: "TypeScript Utility Types (Yordamchi Tiplar)", load: () => import("./lessons/typescript/utilityTypes.js").then(m => m.utilityTypes) },
      { id: "tsConfigFile", title: "TypeScript Config (tsconfig.json Chuqur Tahlili)", load: () => import("./lessons/typescript/tsConfigFile.js").then(m => m.tsConfigFile) },
      { id: "declarationFiles", title: "TypeScript Declaration Files (.d.ts)", load: () => import("./lessons/typescript/declarationFiles.js").then(m => m.declarationFiles) }
    ]
  },
  sql: {
    label: "SQL va Bazalar",
    color: "#e67e22",
    icon: "🗄️",
    lessons: [
      { id: "sqlIntro", title: "Ma'lumotlar Bazasi va RDBMS Asoslari", load: () => import("./lessons/sql/sqlIntro.js").then(m => m.sqlIntro) },
      { id: "sqlSyntax", title: "SQL Sintaksisi va Operatorlar", load: () => import("./lessons/sql/sqlSyntax.js").then(m => m.sqlSyntax) },
      { id: "sqlBasics", title: "SQL So'rovlar Asoslari (SELECT, WHERE, ORDER BY)", load: () => import("./lessons/sql/sqlBasics.js").then(m => m.sqlBasics) },
      { id: "sqlFiltering", title: "Ma'lumotlarni Filtrlash (Filtering)", load: () => import("./lessons/sql/sqlFiltering.js").then(m => m.sqlFiltering) },
      { id: "sqlFunctions", title: "SQL Agregat Funksiyalari va Grouping", load: () => import("./lessons/sql/sqlFunctions.js").then(m => m.sqlFunctions) },
      { id: "sqlJoins", title: "Jadvallarni Birlashtirish (JOINS)", load: () => import("./lessons/sql/sqlJoins.js").then(m => m.sqlJoins) },
      { id: "sqlSubqueries", title: "SQL Subqueries (Ichki So'rovlar)", load: () => import("./lessons/sql/sqlSubqueries.js").then(m => m.sqlSubqueries) },
      { id: "sqlViews", title: "Ko'rinishlar (Views)", load: () => import("./lessons/sql/sqlViews.js").then(m => m.sqlViews) },
      { id: "sqlIndexes", title: "Indekslar (Indexes)", load: () => import("./lessons/sql/sqlIndexes.js").then(m => m.sqlIndexes) },
      { id: "sqlTransactions", title: "Tranzaksiyalar va ACID", load: () => import("./lessons/sql/sqlTransactions.js").then(m => m.sqlTransactions) },
      { id: "sqlStoredProcedures", title: "Saqlanadigan Proseduralar (Stored Procedures)", load: () => import("./lessons/sql/sqlStoredProcedures.js").then(m => m.sqlStoredProcedures) },
      { id: "sqlQueryOptimization", title: "So'rovlarni Optimallashtirish (Query Optimization)", load: () => import("./lessons/sql/sqlQueryOptimization.js").then(m => m.sqlQueryOptimization) },
      { id: "sqlModifications", title: "Ma'lumotlarni O'zgartirish (INSERT, UPDATE, DELETE)", load: () => import("./lessons/sql/sqlModifications.js").then(m => m.sqlModifications) },
      { id: "prismaOrm", title: "Prisma ORM va Ma'lumotlar Bazasi Modellashtirish", load: () => import("./lessons/sql/prismaOrm.js").then(m => m.prismaOrm) },
      { id: "mongoDbBasics", title: "MongoDB Asoslari: CRUD va Aggregatsiya", load: () => import("./lessons/sql/mongoDbBasics.js").then(m => m.mongoDbBasics) },
      { id: "mongooseDb", title: "Mongoose ODM va MongoDB", load: () => import("./lessons/sql/mongooseDb.js").then(m => m.mongooseDb) }
    ]
  },
  algorithms: {
    label: "Algoritmlar",
    color: "#6a73c9",
    icon: "📊",
    lessons: [
      { id: "dsaBasics", title: "DSA Asoslari: O'zgaruvchilar va Xotira (Memory Layout)", load: () => import("./lessons/algorithms/dsaBasics.js").then(m => m.dsaBasics) },
      { id: "dsaControlFlow", title: "Boshqaruv Oqimi va Sikl Murakkabligi", load: () => import("./lessons/algorithms/dsaControlFlow.js").then(m => m.dsaControlFlow) },
      { id: "dsaFunctions", title: "Funksiyalar va Rekursiya (DSA Kontekstida)", load: () => import("./lessons/algorithms/dsaFunctions.js").then(m => m.dsaFunctions) },
      { id: "dsaInputOutput", title: "Kiritish va Chiqarish Oqimlari (Basic I/O)", load: () => import("./lessons/algorithms/dsaInputOutput.js").then(m => m.dsaInputOutput) },
      { id: "dsaArrays", title: "Massivlar: Statik va Dinamik (Static & Dynamic Arrays)", load: () => import("./lessons/algorithms/dsaArrays.js").then(m => m.dsaArrays) },
      { id: "dsaStrings", title: "Satrlar va Matnlar (DSA String Manipulations)", load: () => import("./lessons/algorithms/dsaStrings.js").then(m => m.dsaStrings) },
      { id: "dsaHashing", title: "Xeshlash va Xesh-Jadvallar (Hashing & Hash Tables)", load: () => import("./lessons/algorithms/dsaHashing.js").then(m => m.dsaHashing) },
      { id: "bigO", title: "Algoritmlar Murakkabligi (Big O)", load: () => import("./lessons/algorithms/bigO.js").then(m => m.bigO) },
      { id: "linkedLists", title: "Bog'langan Ro'yxatlar (Linked Lists)", load: () => import("./lessons/algorithms/linkedLists.js").then(m => m.linkedLists) },
      { id: "stacksQueues", title: "Stek va Navbat (Stacks & Queues)", load: () => import("./lessons/algorithms/stacksQueues.js").then(m => m.stacksQueues) },
      { id: "binarySearchTree", title: "Ikkilik Qidiruv Daraxti (Binary Search Tree)", load: () => import("./lessons/algorithms/binarySearchTree.js").then(m => m.binarySearchTree) },
      { id: "dsaTrees", title: "Daraxtlar: Iyerarxik Tuzilmalar va Aylanishlar", load: () => import("./lessons/algorithms/dsaTrees.js").then(m => m.dsaTrees) },
      { id: "dsaHeaps", title: "Uyumlar va Navbatlar Ustuvorligi (Heaps & Priority Queues)", load: () => import("./lessons/algorithms/dsaHeaps.js").then(m => m.dsaHeaps) },
      { id: "dsaGraphs", title: "Graflar va Ularni Aylanib Chiqish (BFS & DFS)", load: () => import("./lessons/algorithms/dsaGraphs.js").then(m => m.dsaGraphs) },
      { id: "dsaTries", title: "Trie: Prefiks Daraxtlari (Tries & Prefix Search)", load: () => import("./lessons/algorithms/dsaTries.js").then(m => m.dsaTries) },
      { id: "dsaDSU", title: "DSU: Disjoint Set Union (Union-Find Algoritmi)", load: () => import("./lessons/algorithms/dsaDSU.js").then(m => m.dsaDSU) },
      { id: "sortingSearching", title: "Saralash va Qidiruv Algoritmlari", load: () => import("./lessons/algorithms/sortingSearching.js").then(m => m.sortingSearching) },
      { id: "dsaDP", title: "Dinamik Dasturlash (Dynamic Programming)", load: () => import("./lessons/algorithms/dsaDP.js").then(m => m.dsaDP) },
      { id: "dsaGreedy", title: "Ochko'z Algoritmlar (Greedy Algorithms)", load: () => import("./lessons/algorithms/dsaGreedy.js").then(m => m.dsaGreedy) },
      { id: "dsaBacktracking", title: "Orqaga Qaytish Algoritmlari (Backtracking)", load: () => import("./lessons/algorithms/dsaBacktracking.js").then(m => m.dsaBacktracking) },
      { id: "dsaDivideConquer", title: "Bo'ib Tashla va Hukmronlik Qil (Divide and Conquer)", load: () => import("./lessons/algorithms/dsaDivideConquer.js").then(m => m.dsaDivideConquer) },
      { id: "dsaGraphAlgos", title: "Murakkab Graf Algoritmlari (Dijkstra, Bellman-Ford, Kruskal, Prim)", load: () => import("./lessons/algorithms/dsaGraphAlgos.js").then(m => m.dsaGraphAlgos) },
      { id: "dsaStringAlgos", title: "Satrlar bilan Ishlash Algoritmlari (KMP, Rabin-Karp, Z-Algorithm)", load: () => import("./lessons/algorithms/dsaStringAlgos.js").then(m => m.dsaStringAlgos) },
      { id: "dsaAdvancedDP", title: "Murakkab Dinamik Dasturlash (Bitmask DP, Digit DP, DP on Trees)", load: () => import("./lessons/algorithms/dsaAdvancedDP.js").then(m => m.dsaAdvancedDP) },
      { id: "dsaAdvancedGraph", title: "Murakkab Graf Strukturasi (Tarjan, Kosaraju, Network Flow)", load: () => import("./lessons/algorithms/dsaAdvancedGraph.js").then(m => m.dsaAdvancedGraph) },
      { id: "dsaGeometry", title: "Geometrik Algoritmlar (Convex Hull, Sweep Line)", load: () => import("./lessons/algorithms/dsaGeometry.js").then(m => m.dsaGeometry) },
      { id: "leetcodeTop", title: "Top Interview LeetCode Masalalari", load: () => import("./lessons/algorithms/leetcodeTop.js").then(m => m.leetcodeTop) },
      { id: "leetcodeStrings", title: "LeetCode: String (Satr) Algoritmlari", load: () => import("./lessons/algorithms/leetcodeStrings.js").then(m => m.leetcodeStrings) },
      { id: "leetcodeArrays", title: "LeetCode: Array (Massiv) Algoritmlari", load: () => import("./lessons/algorithms/leetcodeArrays.js").then(m => m.leetcodeArrays) },
      { id: "leetcodeHashMaps", title: "LeetCode: HashMap va Set Algoritmlari", load: () => import("./lessons/algorithms/leetcodeHashMaps.js").then(m => m.leetcodeHashMaps) },
      { id: "dynamicProgrammingBasics", title: "LeetCode: Dynamic Programming", load: () => import("./lessons/algorithms/dynamicProgrammingBasics.js").then(m => m.dynamicProgrammingBasics) }
    ]
  },
  systemDesign: {
    label: "Tizimli Dizayn",
    color: "#c96ac8",
    icon: "🌐",
    lessons: [
      { id: "howToLearn", title: "System Design-ni Qanday O'rganish Kerak?", load: () => import("./lessons/system-design/howToLearn.js").then(m => m.howToLearn) },
      { id: "requirements", title: "Funksional va Nofunksional Talablar", load: () => import("./lessons/system-design/requirements.js").then(m => m.requirements) },
      { id: "estimations", title: "Tizim O'lchamlarini Taxmin Qilish (Estimations)", load: () => import("./lessons/system-design/estimations.js").then(m => m.estimations) },
      { id: "thingsToAvoid", title: "System Design Intervyuda Yo'l Qo'yiladigan Xatolar", load: () => import("./lessons/system-design/thingsToAvoid.js").then(m => m.thingsToAvoid) },
      { id: "systemDesignQuiz", title: "Phase 1: Yakuniy Quiz", load: () => import("./lessons/system-design/systemDesignQuiz.js").then(m => m.systemDesignQuiz) },
      { id: "loadBalancingAlgorithms", title: "Yuk Taqsimlash Algoritmlari (Load Balancing)", load: () => import("./lessons/system-design/loadBalancingAlgorithms.js").then(m => m.loadBalancingAlgorithms) },
      { id: "webSecurity", title: "Veb Xavfsizlik Asoslari (Web Security)", load: () => import("./lessons/system-design/webSecurity.js").then(m => m.webSecurity) },
      { id: "cachingScalability", title: "Keshlash va Tizim Kengayuvchanligi (Caching & Scalability)", load: () => import("./lessons/system-design/cachingScalability.js").then(m => m.cachingScalability) },
      { id: "renderingArchitectures", title: "Veb Rendering Arxitekturalari (CSR, SSR, SSG, Hydration)", load: () => import("./lessons/system-design/renderingArchitectures.js").then(m => m.renderingArchitectures) },
      { id: "dns", title: "Domain Name System (DNS) va URL Manzillar", load: () => import("./lessons/system-design/dns.js").then(m => m.dns) },
      { id: "networkEssentials", title: "Tarmoq Asoslari (TCP/UDP, HTTP, Proxy)", load: () => import("./lessons/system-design/networkEssentials.js").then(m => m.networkEssentials) },
      { id: "apiGateway", title: "API Gateway, Mikroxizmatlar va Baza Asoslari", load: () => import("./lessons/system-design/apiGateway.js").then(m => m.apiGateway) },
      { id: "apiGatewayDiscovery", title: "API Gateway va Service Discovery", load: () => import("./lessons/system-design/apiGatewayDiscovery.js").then(m => m.apiGatewayDiscovery) },
      { id: "distributedCharacteristics", title: "Taqsimlangan Tizimlar Xususiyatlari", load: () => import("./lessons/system-design/distributedCharacteristics.js").then(m => m.distributedCharacteristics) },
      { id: "systemDesignQuiz2", title: "Phase 2: Yakuniy Test (Quiz & JS Challenges)", load: () => import("./lessons/system-design/systemDesignQuiz2.js").then(m => m.systemDesignQuiz2) },
      { id: "consistentHashing", title: "Consistent Hashing (Barqaror Hashing)", load: () => import("./lessons/system-design/consistentHashing.js").then(m => m.consistentHashing) },
      { id: "messageQueues", title: "Xabarlar Navbati va Asinxron Aloqa (Message Queues)", load: () => import("./lessons/system-design/messageQueues.js").then(m => m.messageQueues) },
      { id: "microservices", title: "Mikroservislar Arxitekturasi (Microservices)", load: () => import("./lessons/system-design/microservices.js").then(m => m.microservices) },
      { id: "cachingRedis", title: "Keshlash va Redis (Caching & Redis)", load: () => import("./lessons/system-design/cachingRedis.js").then(m => m.cachingRedis) },
      { id: "rateLimitingSecurity", title: "Rate Limiting va API Xavfsizligi", load: () => import("./lessons/system-design/rateLimitingSecurity.js").then(m => m.rateLimitingSecurity) },
      { id: "dbScalingSharding", title: "Bazalarni Masshtablash va Sharding", load: () => import("./lessons/system-design/dbScalingSharding.js").then(m => m.dbScalingSharding) },
      { id: "microservicesServerless", title: "Mikroxizmatlar va Serverless Arxitekturasi", load: () => import("./lessons/system-design/microservicesServerless.js").then(m => m.microservicesServerless) },
      { id: "eventDrivenBrokers", title: "Event-Driven Architecture va Brokerlar (RabbitMQ & Kafka)", load: () => import("./lessons/system-design/eventDrivenBrokers.js").then(m => m.eventDrivenBrokers) },
      { id: "cdnEdgeComputing", title: "CDN va Edge Computing", load: () => import("./lessons/system-design/cdnEdgeComputing.js").then(m => m.cdnEdgeComputing) },
      { id: "distributedTransactions", title: "Taqsimlangan Tranzaksiyalar (Distributed Transactions)", load: () => import("./lessons/system-design/distributedTransactions.js").then(m => m.distributedTransactions) },
      { id: "apiGatewayRouting", title: "API Gateway va Routing", load: () => import("./lessons/system-design/apiGatewayRouting.js").then(m => m.apiGatewayRouting) },
      { id: "eventSourcingCqrs", title: "Event Sourcing va CQRS", load: () => import("./lessons/system-design/eventSourcingCqrs.js").then(m => m.eventSourcingCqrs) },
      { id: "distributedConsensus", title: "Distributed Consensus (Taqsimlangan Konsensus)", load: () => import("./lessons/system-design/distributedConsensus.js").then(m => m.distributedConsensus) },
      { id: "gossipProtocol", title: "Gossip Protocol (Mish-mish Protokoli)", load: () => import("./lessons/system-design/gossipProtocol.js").then(m => m.gossipProtocol) },
      { id: "vectorClocks", title: "Vector Clocks va Logical Clocks", load: () => import("./lessons/system-design/vectorClocks.js").then(m => m.vectorClocks) },
      { id: "distributedLocking", title: "Taqsimlangan Bloklash (Distributed Locking)", load: () => import("./lessons/system-design/distributedLocking.js").then(m => m.distributedLocking) },
      { id: "capPacelc", title: "CAP va PACELC Teomalari", load: () => import("./lessons/system-design/capPacelc.js").then(m => m.capPacelc) },
      { id: "writeReadPath", title: "Yozish va O'qish Yo'llarini Optimallashtirish", load: () => import("./lessons/system-design/writeReadPath.js").then(m => m.writeReadPath) },
      { id: "heartbeatsLeases", title: "Heartbeats va Leases", load: () => import("./lessons/system-design/heartbeatsLeases.js").then(m => m.heartbeatsLeases) },
      { id: "dbRelationalNoSql", title: "Ma'lumotlar Bazalari: Relational (SQL) vs NoSQL", load: () => import("./lessons/system-design/dbRelationalNoSql.js").then(m => m.dbRelationalNoSql) },
      { id: "dbReplication", title: "Database Replication (Replikatsiya)", load: () => import("./lessons/system-design/dbReplication.js").then(m => m.dbReplication) },
      { id: "resiliencePatterns", title: "Resilience Patterns (Tizim Chidamliligi)", load: () => import("./lessons/system-design/resiliencePatterns.js").then(m => m.resiliencePatterns) },
      { id: "batchStreamProcessing", title: "Batch va Stream Processing", load: () => import("./lessons/system-design/batchStreamProcessing.js").then(m => m.batchStreamProcessing) },
      { id: "bloomFilters", title: "Bloom Filters va Ehtimolli Ma'lumotlar Tuzilmalari", load: () => import("./lessons/system-design/bloomFilters.js").then(m => m.bloomFilters) }
    ]
  },
  ecosystem: {
    label: "Ekotizim (React & Node.js)",
    color: "#6ac98e",
    icon: "⚙️",
    lessons: [
      { id: "npmBasics", title: "NPM Asoslari: Paketlar bilan Ishlash", load: () => import("./lessons/ecosystem/npmBasics.js").then(m => m.npmBasics) },
      { id: "packageJson", title: "package.json: Loyiha Konfiguratsiyasi", load: () => import("./lessons/ecosystem/packageJson.js").then(m => m.packageJson) },
      { id: "webpackBabel", title: "Webpack va Babel: Build Instrumentlari", load: () => import("./lessons/ecosystem/webpackBabel.js").then(m => m.webpackBabel) },
      { id: "reactBasics", title: "React.js Asoslari: Komponentlar va Hooklar", load: () => import("./lessons/ecosystem/reactBasics.js").then(m => m.reactBasics) },
      { id: "nodeExpressBasics", title: "Node.js & Express Asoslari va MongoDB Integratsiyasi", load: () => import("./lessons/ecosystem/nodeExpressBasics.js").then(m => m.nodeExpressBasics) },
      { id: "reactArchitecture", title: "React Arxitekturasi (Fiber, Reconciler, Virtual DOM)", load: () => import("./lessons/ecosystem/reactArchitecture.js").then(m => m.reactArchitecture) },
      { id: "reactStateManagement", title: "State Management Arxitekturasi", load: () => import("./lessons/ecosystem/reactStateManagement.js").then(m => m.reactStateManagement) },
      { id: "reactPerformanceBasics", title: "React Performance Asoslari", load: () => import("./lessons/ecosystem/reactPerformanceBasics.js").then(m => m.reactPerformanceBasics) },
      { id: "reactPerformanceOptimization", title: "Performance Optimization Texnikalari", load: () => import("./lessons/ecosystem/reactPerformanceOptimization.js").then(m => m.reactPerformanceOptimization) },
      { id: "reactRenderingOptimization", title: "Rendering Optimization va Listlar", load: () => import("./lessons/ecosystem/reactRenderingOptimization.js").then(m => m.reactRenderingOptimization) },
      { id: "reactAdvancedPerformance", title: "Murakkab Performance va Profiler", load: () => import("./lessons/ecosystem/reactAdvancedPerformance.js").then(m => m.reactAdvancedPerformance) },
      { id: "reactProductionArchitecture", title: "React Production Arxitekturasi (Build, Deploy, CI/CD)", load: () => import("./lessons/ecosystem/reactProductionArchitecture.js").then(m => m.reactProductionArchitecture) },
      { id: "nodeArchitecture", title: "Node.js Arxitekturasi va Event Loop", load: () => import("./lessons/ecosystem/nodeArchitecture.js").then(m => m.nodeArchitecture) },
      { id: "dockerBasics", title: "Docker Asoslari (Konteynerlashtirish)", load: () => import("./lessons/ecosystem/dockerBasics.js").then(m => m.dockerBasics) },
      { id: "ciCdGithubActions", title: "CI/CD va GitHub Actions", load: () => import("./lessons/ecosystem/ciCdGithubActions.js").then(m => m.ciCdGithubActions) },
      { id: "dockerComposeDb", title: "Docker Compose va Ma'lumotlar Bazasi Integratsiyasi", load: () => import("./lessons/ecosystem/dockerComposeDb.js").then(m => m.dockerComposeDb) },
      { id: "k8sBasics", title: "Kubernetes (K8s) Asoslari", load: () => import("./lessons/ecosystem/k8sBasics.js").then(m => m.k8sBasics) },
      { id: "advancedCiCd", title: "Mukammal CI/CD va Avtomatlashtirilgan Deploy", load: () => import("./lessons/ecosystem/advancedCiCd.js").then(m => m.advancedCiCd) }
    ]
  },
  softSkills: {
    label: "Suhbat Madaniyati",
    color: "#a86ac9",
    icon: "💬",
    lessons: [
      { id: "starMethod", title: "STAR Metodologiyasi (Suhbatdan O'tish Siri)", load: () => import("./lessons/soft-skills/starMethod.js").then(m => m.starMethod) },
      { id: "behavioralQuestions", title: "Xulq-atvorga Oid Savollar (Behavioral Interview)", load: () => import("./lessons/soft-skills/behavioralQuestions.js").then(m => m.behavioralQuestions) },
      { id: "resumeOptimization", title: "Rezyume Tayyorlash va Optimallashtirish (ATS)", load: () => import("./lessons/soft-skills/resumeOptimization.js").then(m => m.resumeOptimization) }
    ]
  }
};

// JS yo'nalishi (7 bosqich) + Keyingi qadamlar
export const SECTIONS = [
  "basics", "data", "functions", "oopModern", "domBrowser", "async", "professional",
  // 🚀 Keyingi qadamlar:
  "projects", "challenges", "nodejs", "typescript", "sql", "algorithms", "systemDesign", "ecosystem", "softSkills"
];

// Sidebar'da "Keyingi qadamlar" ajratgichi shu bo'limga qo'yiladi
export const NEXT_STEPS_START = "projects";

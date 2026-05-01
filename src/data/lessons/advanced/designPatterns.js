export const designPatterns = {
  id: "a13",
  title: "Design Patterns (Loyihalash qoliplari)",
  theory: `## 1. KIRISH
Dasturlashda ko'p uchraydigan muammolarning tayyor va sinalgan yechimlari **Design Patterns** deb ataladi. Bu xuddi me'morlar uyni qanday qurish bo'yicha tayyor chizmalardan foydalanishiga o'xshaydi.

## 2. TUSHUNCHA

### Singleton Pattern
Dastur davomida klassdan faqat **bitta** obyekt yaratilishini kafolatlaydi. Masalan, ma'lumotlar bazasiga ulanish yoki umumiy sozlamalar (Settings) uchun ishlatiladi.

### Observer Pattern
Bir obyektning holati o'zgarganda, unga "obuna" bo'lgan boshqa obyektlarni ogohlantiradi. 
**Metafora:** YouTube kanaliga obuna bo'lish - yangi video chiqsa, hamma obunachilarga xabar boradi.

### Module Pattern
Kodlarni mantiqiy bo'laklarga bo'lish va ma'lumotlarni "yashirin" (private) saqlash imkonini beradi.

---

## 3. KOD MISOLLARI

### Misol 1 — Singleton (Baza ulanishi)
\`\`\`javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = "Connected to DB";
    Database.instance = this;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // → true (ikkisi bitta obyekt)
\`\`\`

### Misol 2 — Observer (Xabarnoma tizimi)
\`\`\`javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
  }
  notify(data) {
    this.observers.forEach(fn => fn(data));
  }
}

const news = new Subject();
news.subscribe(msg => console.log("User 1 oldi:", msg));
news.subscribe(msg => console.log("User 2 oldi:", msg));

news.notify("Yangi dars chiqdi!"); 
// → User 1 oldi: Yangi dars chiqdi!
// → User 2 oldi: Yangi dars chiqdi!
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Observer Pattern Tuzilishi
\`\`\`mermaid
graph TD
    A[Subject / Publisher] -- xabar yuboradi --> B(Observer 1)
    A -- xabar yuboradi --> C(Observer 2)
    A -- xabar yuboradi --> D(Observer 3)
    B -. obuna bo'ladi .-> A
    C -. obuna bo'ladi .-> A
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Singleton pattern qachon kerak?** - Dasturda faqat bitta markaziy boshqaruvchi (masalan, Store yoki Config) kerak bo'lganda.
2. **Observer pattern qayerda ishlatiladi?** - UI eventlarida, xabarnoma tizimlarida va state management (Redux, Vuex) da.

---

## 6. MINI LOYIHA: "Theme Manager"
**Vazifa:** Singleton yordamida sayt mavzusini (dark/light) boshqaruvchi obyekt yarating.

\`\`\`javascript
const ThemeManager = (function() {
  let theme = "light";
  
  return {
    getTheme: () => theme,
    setTheme: (t) => { theme = t; console.log("Mavzu o'zgardi:", theme); }
  };
})();

ThemeManager.setTheme("dark");
console.log(ThemeManager.getTheme()); // → "dark"
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Singleton yaratish",
      instruction: "Faqat bitta obyekt yaratilishini ta'minlovchi klass yozing.",
      startingCode: "class AppConfig {\n  // Singleton mantiqini yozing\n}\n",
      hint: "Constructor ichida Static instance borligini tekshiring.",
      test: "const a = new AppConfig(); const b = new AppConfig(); if (a === b) return null; return 'Ikkala obyekt bir xil bo\\'lishi shart';"
    }
  ]
};

export const historyRouting = {
  id: "historyRouting",
  title: "History API va Single Page Application (SPA) Routing",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### History API va SPA Routing nima?
**Single Page Application (SPA) Routing** — bu sahifani serverdan qayta yuklamasdan (reload bo'lmasdan), faqat brauzerning manzil satridagi URL-ni o'zgartirib, foydalanuvchiga kerakli sahifa tarkibini (DOM-ni) tezkorlik bilan almashtirib ko'rsatish texnologiyasidir. 

**History API** — bu brauzerning bizga taqdim etgan maxsus obyekti bo'lib, u orqali biz manzil satrini dasturlash yo'li bilan o'zgartira olamiz va foydalanuvchi "Orqaga" (Back) yoki "Oldinga" (Forward) tugmalarini bosganini kuzatib tura olamiz.

### Real hayotiy analogiya
Tasavvur qiling, siz **Sehrli Muzeydasiz**:
* **Klassik Veb (MPA - Multi Page Application):** Muzeyda har bitta xonaga kirish uchun siz tashqariga chiqib, chiptaxonaga borib, yangi chipta olib, keyin boshqa xonaga kirishingiz kerak. Bu har safar butun saytni qayta yuklashga o'xshaydi.
* **SPA Routing:** Siz muzeyning ichida turibsiz. Siz bir xonadan ikkinchisiga shunchaki yurib o'tasiz. Xonadagi eksponatlar (kontentlar) darhol o'zgaradi, lekin siz muzeydan tashqariga chiqmaysiz. Devordagi xona raqami va yo'nalish ko'rsatkichlari (URL) siz yurishingiz bilan avtomatik o'zgaradi. Agar siz orqaga qaytmoqchi bo'lsangiz, shunchaki ortga qadam tashlaysiz (Back button).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (pushState va popstate)
Yangi sahifa URL-ni tarixga (history stack) qo'shish va orqaga tugmasini kuzatish:
\`\`\`javascript
// Manzilni '/about' ga o'zgartirish (sahifa yangilanmaydi)
function navigateToAbout() {
  const state = { page: 'about' };
  history.pushState(state, '', '/about');
  renderPage('about');
}

// Foydalanuvchi brauzerda 'Orqaga' yoki 'Oldinga' tugmasini bossa ishlaydi
window.addEventListener('popstate', (event) => {
  if (event.state) {
    renderPage(event.state.page);
  } else {
    renderPage('home'); // Boshlang'ich holat
  }
});

function renderPage(page) {
  const app = document.getElementById('app');
  if (page === 'about') {
    app.innerHTML = '<h1>Biz haqimizda sahifasi</h1>';
  } else {
    app.innerHTML = '<h1>Bosh sahifa</h1>';
  }
}
\`\`\`
* **Qachon ishlatiladi:** Foydalanuvchi biror tugmani bosganda sahifani yuklamay URL-ni yangilash uchun.

### 2. Intermediate Example (replaceState va Query params)
Filtrlarni o'zgartirganda tarixdagi joriy yozuvni almashtirish (tarixni axlatga to'ldirmaslik uchun):
\`\`\`javascript
function updateFilters(category, search) {
  const newUrl = \`/products?category=\${category}&search=\${search}\`;
  
  // replaceState tarixdagi joriy URL-ni o'chirib, o'rniga yangisini yozadi
  history.replaceState({ category, search }, '', newUrl);
  
  // Mahsulotlar ro'yxatini dynamic yuklash mantiqi
  fetchProducts(category, search);
}
\`\`\`
* **Qachon ishlatiladi:** E-commerce saytlarda filtrlar, qidiruv yoki sahifalash (pagination) amalga oshirilganda, foydalanuvchi "Orqaga" tugmasini yuz marta bosib qiynalmasligi uchun.

### 3. Advanced Example (Dynamic Route Matching va Simple Router)
URL-dagi dynamic ID-larni (masalan, \`/user/42\`) aniqlab ishlovchi sodda router:
\`\`\`javascript
const routes = {
  '/': () => '<h1>Home</h1>',
  '/users': () => '<h1>Users List</h1>',
  '/user/:id': (params) => \`<h1>User ID: \${params.id}</h1>\`
};

function resolveRoute(path) {
  for (const route in routes) {
    // '/user/:id' ni regexga o'tkazamiz
    const routeRegex = new RegExp('^' + route.replace(/:[^\\s/]+/g, '([\\\\w-]+)') + '$');
    const match = path.match(routeRegex);
    
    if (match) {
      const params = {};
      const paramNames = (route.match(/:[^\\s/]+/g) || []).map(p => p.substring(1));
      paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
      });
      return routes[route](params);
    }
  }
  return '<h1>404 - Topilmadi</h1>';
}
\`\`\`

### 4. Production Example (Custom Router klassi)
Haqiqiy SPA-larda ishlatiladigan universal Router klassi:
\`\`\`javascript
class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    // Saytdagi barcha <a> teglarni tutib qolish (intercepting clicks)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href').startsWith('/')) {
        e.preventDefault(); // Sahifaning qayta yuklanishini to'xtatish
        this.navigate(target.getAttribute('href'));
      }
    });

    // Orqaga/Oldinga tugmalarini eshitish
    window.addEventListener('popstate', () => this.handleRoute());

    // Birinchi marta yuklanganda
    this.handleRoute();
  }

  navigate(url) {
    history.pushState(null, '', url);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const viewHTML = this.routes[path] ? this.routes[path]() : '<h1>404 Not Found</h1>';
    document.getElementById('app').innerHTML = viewHTML;
  }
}

// Foydalanish:
const myRouter = new Router({
  '/': () => '<h2>Home Page</h2>',
  '/about': () => '<h2>About Us Page</h2>',
  '/contact': () => '<h2>Contact Page</h2>'
});
\`\`\`

### 5. Enterprise Example (Navigation Guards / Middleware)
Sahifaga kirishdan oldin foydalanuvchining avtorizatsiyadan o'tganini tekshirish tizimi:
\`\`\`javascript
const userSession = {
  isLoggedIn: false
};

const routesWithGuard = {
  '/dashboard': {
    component: () => '<h1>Dashboard (Maxfiy)</h1>',
    requiresAuth: true
  },
  '/login': {
    component: () => '<h1>Login sahifasi</h1>',
    requiresAuth: false
  }
};

class SecureRouter {
  navigate(url) {
    const route = routesWithGuard[url];
    
    if (route && route.requiresAuth && !userSession.isLoggedIn) {
      console.warn('Ruxsat berilmagan! Login sahifasiga yo\\\\'naltirilmoqda...');
      history.pushState(null, '', '/login');
      this.render('/login');
    } else {
      history.pushState(null, '', url);
      this.render(url);
    }
  }

  render(url) {
    const route = routesWithGuard[url];
    document.getElementById('app').innerHTML = route ? route.component() : '<h1>404</h1>';
  }
}
\`\`\`

---

## 3. 💡 Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Foydalanuvchi tajribasi (UX):** Eski saytlarda har bir link bosilganda oq ekran miltillab (white flash), sahifa to'liq qayta yuklanardi. SPA bu muammoni hal qilib, saytni mobil ilovadek silliq ishlatadi.
* **Shtatni saqlash (State preservation):** Sahifa to'liq yuklanganda JS xotirasidagi barcha o'zgaruvchilar (masalan, kiritilayotgan input matnlari, media player ijrosi) o'chib ketardi. SPA-da faqat kerakli qismlar yangilangani uchun global holat saqlanib qoladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Havolalardagi default harakatni bekor qilmaslik (\`e.preventDefault()\`)
#### Xato:
\`\`\`javascript
// Link bosilganda sahifa baribir qayta yuklanadi
document.querySelector('a').addEventListener('click', () => {
  history.pushState(null, '', '/target');
});
\`\`\`
#### Nima uchun noto'g'ri:
Brauzer <a> tegining asl tabiati bo'yicha serverga so'rov yuboradi.
#### To'g'ri usul:
\`\`\`javascript
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault(); // Server so'rovini to'xtatamiz
  history.pushState(null, '', '/target');
});
\`\`\`

### 2. \`popstate\` faqat foydalanuvchi amallari orqali chaqirilishini bilmaslik
#### Xato:
\`history.pushState\` chaqirilganda \`popstate\` ham avtomat ishga tushadi deb o'ylash.
#### Nima uchun noto'g'ri:
\`popstate\` hodisasi faqat foydalanuvchi "Orqaga" yoki "Oldinga" tugmasini bosganda yoki kodda \`history.back()\`, \`history.forward()\` chaqirilganda ishlaydi.
#### To'g'ri usul:
\`pushState\` yoki \`replaceState\` chaqirilganidan so'ng, UI-ni yangilash funksiyasini qo'lda ham chaqirib qo'yish kerak.

### 3. Server konfiguratsiyasini unutish (404 xatolik)
#### Muammo:
Foydalanuvchi \`/about\` sahifasiga SPA router orqali kirsa hammasi yaxshi. Lekin shu sahifada turib F5 (Refresh) tugmasini bossa, serverda \`/about\` degan fayl yoki yo'l topilmaydi va "404 Not Found" chiqadi.
#### To'g'ri yechim:
Server (Nginx, Apache, Vercel) barcha kiruvchi URL-larni har doim asosiy \`index.html\` fayliga yo'naltirishi (redirect/rewrite) shart. Keyin router brauzerda URL-ni o'qib kerakli sahifani chizadi.

### 4. \`history.state\` parametrini noto'g'ri yoki bo'sh qoldirish
#### Xato:
Tarixga ma'lumot saqlashda state parametriga \`null\` yozib ketish va keyin orqaga qaytganda qaysi sahifada bo'lganini aniqlay olmaslik.
#### To'g'ri usul:
\`history.pushState({ pageId: 12 }, '', '/page/12')\` ko'rinishida state-ni to'ldirib borish.

### 5. Xotira sizib chiqishi (Memory Leaks)
#### Muammo:
Component o'chirilganda undagi global router event listenerlari tozalab yuborilmaydi va qayta-qayta yangi listenerlar qo'shilib ketadi.
#### To'g'ri yechim:
Component o'chirilayotganda \`removeEventListener\` yordamida listenerlarni tozalash.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Single Page Application (SPA) nima va u Multi Page Application (MPA) dan nima bilan farq qiladi?
   * **Javob:** SPA - faqat bitta HTML sahifani yuklab olib, qolgan barcha ma'lumotlarni dynamic yangilovchi ilova. MPA esa har bir link bosilganda serverdan yangi HTML yuklaydi.

2. **Savol:** \`history.pushState()\` va \`history.replaceState()\` o'rtasidagi farq nima?
   * **Javob:** \`pushState\` tarixga yangi manzil qo'shadi (Back bosganda oldingi sahifaga qaytadi). \`replaceState\` esa joriy manzilni yangisi bilan almashtiradi (tarixga yangi yozuv qo'shilmaydi).

3. **Savol:** \`popstate\` hodisasi (event) qachon ishga tushadi?
   * **Javob:** Foydalanuvchi brauzerning 'Orqaga' yoki 'Oldinga' tugmalarini bosganda yoki dasturiy ravishda \`history.back()\` / \`history.forward()\` bajarilganda.

4. **Savol:** Nima uchun SPA-da havolalar (\`<a>\` teglari) ustida \`event.preventDefault()\` qo'llaniladi?
   * **Javob:** Brauzer sahifani serverdan to'liq yuklab olishga urinishining oldini olish va navigatsiyani JavaScript orqali boshqarish uchun.

### Middle (5–8)
5. **Savol:** Nima uchun SPA routing-ga ega saytni yangilaganda (Refresh) ba'zida 404 xatosi chiqadi va uni qanday tuzatish kerak?
   * **Javob:** Chunki brauzer serverdan to'g'ridan-to'g'ri o'sha URL-ni so'raydi, serverda esa bunday fayl yo'q. Yechim — serverda barcha so'rovlarni \`index.html\`ga yo'naltiruvchi wildcard rule (masalan, Nginx-da \`try_files $uri /index.html\`) sozlash.

6. **Savol:** Hash routing (masalan, \`site.com/#/about\`) va History API routing (\`site.com/about\`) o'rtasidagi farq nima?
   * **Javob:** Hash routing URL-dagi \`#\` belgisidan keyingi qismni ishlatadi, u serverga yuborilmaydi (shuning uchun server sozlash shart emas). History API esa haqiqiy chiroyli URL-larni yaratadi, lekin server sozlamalarini talab qiladi.

7. **Savol:** \`history.state\` obyektining maksimal sig'imi qancha va u erga nimalarni saqlash mumkin?
   * **Javob:** Odatda 2 MB atrofida. U erga faqat seriyalash mumkin bo'lgan (structured clone algorithm qo'llab-quvvatlaydigan) JSON obyektlarni saqlash mumkin. Funksiyalar va DOM elementlarni saqlab bo'lmaydi.

8. **Savol:** \`location.assign()\` va \`history.pushState()\` o'rtasidagi farq nimada?
   * **Javob:** \`location.assign(url)\` sahifani to'liq qayta yuklab, yangi URL-ga o'tadi. \`history.pushState()\` esa sahifani yuklamay, faqat URL-ni o'zgartiradi.

### Senior (9–12)
9. **Savol:** SPA-da dynamic route matching (masalan, \`/user/:id/:tab\`) qanday amalga oshiriladi?
   * **Javob:** Route shablonini regular expression (Regex)-ga o'tkazish orqali. Parametrlarni \`:\` yordamida ajratib olib, regex guruhlari (\`match[1]\`, \`match[2]\`) orqali real qiymatlarni aniqlaymiz.

10. **Savol:** "Scroll Restoration" (Sahifa skroll holatini tiklash) muammosini SPA routerda qanday hal qilasiz?
    * **Javob:** Navigatsiya bo'lganda brauzerning default scroll holatini o'chirib (\`history.scrollRestoration = 'manual'\`), har bir sahifaning oxirgi skroll koordinatasini keshga saqlab, sahifa yuklanganda \`window.scrollTo(x, y)\` yordamida qo'lda tiklaymiz.

11. **Savol:** Router middleware va navigation guards ishlash mexanizmini tushuntiring.
    * **Javob:** Navigatsiya yakunlanishidan oldin zanjir ko'rinishidagi funksiyalarni (\`next()\` callbacklar yordamida) ishga tushirish. Agar biror middleware false qaytarsa yoki login sahifasiga yo'naltirsa, navigatsiya to'xtatiladi yoki redirect qilinadi.

12. **Savol:** Micro-Frontend arxitekturasida turli jamoalar tomonidan yozilgan mustaqil app-lar o'rtasida global routing muammolarini qanday hal qilasiz?
    * **Javob:** Yagona CustomEvent (masalan, \`global-navigate\`) yoki umumiy Custom Window Event yoziladi. Har bir micro-app ushbu eventni eshitadi va o'zining routeriga mos URL o'zgarishini amalga oshiradi, bu esa routerlar o'rtasidagi ziddiyatlarni (conflicts) oldini oladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Elektron do'kon (E-commerce) uchun mobil moslashuvchan SPA router
Ushbu loyihada foydalanuvchilar mahsulotlarni tanlaydi, savatchani tekshiradi. Har bir bosqich URL-da aks etishi kerak, lekin foydalanuvchi tanlagan mahsulotlar savatchasi sahifa yangilanganda ham saqlanib qolishi lozim.

#### Yechim (Minimal SPA Router va Savatcha):
\`\`\`javascript
const cart = [];

const views = {
  '/': () => \`<h1>Do'kon</h1><button onclick="addToCart('Telefon')">Telefon sotib olish</button>\`,
  '/cart': () => \`<h1>Savatcha</h1><ul>\${cart.map(i => \`<li>\${i}</li>\`).join('')}</ul>\`
};

window.addToCart = function(item) {
  cart.push(item);
  alert(item + ' savatchaga qo\\\\'shildi!');
};

function navigate(path) {
  history.pushState(null, '', path);
  updateView();
}

function updateView() {
  const path = window.location.pathname;
  const content = views[path] ? views[path]() : '<h1>Sahifa topilmadi</h1>';
  document.getElementById('app').innerHTML = content;
}

window.addEventListener('popstate', updateView);
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Lazy Loading Routes:** Hamma sahifa kodlarini birdan yuklamasdan, dynamic \`import('./pages/About.js')\` orqali faqat foydalanuvchi o'sha sahifaga kirgandagina JS faylni yuklash:
  \`\`\`javascript
  const routes = {
    '/about': () => import('./pages/About.js').then(module => module.render())
  };
  \`\`\`
  Bu boshlang'ich yuklanish tezligini (First Contentful Paint) ancha oshiradi.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **pushState()** | \`history.pushState(state, '', url)\` | Tarixga yangi URL qo'shadi | Sahifani yangilamaydi |
| **replaceState()** | \`history.replaceState(state, '', url)\` | Tarixdagi joriy URL-ni almashtiradi | Back tugmasi tarixini buzmaydi |
| **popstate** | \`window.addEventListener('popstate', cb)\` | Orqaga/Oldinga tugmalari bosilishini eshitadi | pushState-da avtomat chaqirilmaydi |
| **history.state** | \`history.state\` | Tarixdagi joriy sahifa holatini o'qiydi | JSON obyekt qaytaradi |
| **history.back()** | \`history.back()\` | Bir sahifa orqaga qaytadi | Brauzerning Back tugmasi kabi |
| **scrollRestoration** | \`history.scrollRestoration = 'manual'\` | Skroll holatini avtomat tiklashni o'chiradi | Qo'lda skrollni boshqarish uchun |
`,
  exercises: [
  {
    "id": 1,
    "title": "pushState orqali navigatsiya qilish",
    "instruction": "Berilgan `path` va `state` obyektini qabul qilib, uni brauzer tarixiga (history stack) `history.pushState` yordamida qo'shuvchi `navigateTo(path, state)` funksiyasini yozing.",
    "startingCode": "function navigateTo(path, state) {\n  // Kodni yozing\n}",
    "hint": "history.pushState(state, '', path);",
    "test": "try { navigateTo('/test-path', { data: 'test' }); if (window.location.pathname !== '/test-path') return 'URL /test-path bo\\'lmadi'; if (!history.state || history.state.data !== 'test') return 'State noto\\'g\\'ri saqlandi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "replaceState orqali joriy holatni o'zgartirish",
    "instruction": "Berilgan `state` va `path` parametrlari bilan joriy sahifa tarixini yangilovchi (tarixga yangi element qo'shmaydigan) `replaceCurrentState(state, path)` funksiyasini yozing.",
    "startingCode": "function replaceCurrentState(state, path) {\n  // Kodni yozing\n}",
    "hint": "history.replaceState(state, '', path);",
    "test": "try { replaceCurrentState({ updated: true }, '/updated-path'); if (window.location.pathname !== '/updated-path') return 'URL /updated-path bo\\'lmadi'; if (!history.state || history.state.updated !== true) return 'State yangilanmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "popstate hodisasini tinglash",
    "instruction": "Foydalanuvchi orqaga yoki oldinga qaytganida (ya'ni `popstate` yuz berganida) berilgan `callback` funksiyasini ishga tushiruvchi va unga hodisadagi `event.state`ni uzatuvchi `setupPopStateListener(callback)` funksiyasini yozing.",
    "startingCode": "function setupPopStateListener(callback) {\n  // Kodni yozing\n}",
    "hint": "window.addEventListener('popstate', (e) => callback(e.state));",
    "test": "try { let triggered = false; let receivedState = null; setupPopStateListener((state) => { triggered = true; receivedState = state; }); const event = new PopStateEvent('popstate', { state: { foo: 'bar' } }); window.dispatchEvent(event); if (!triggered) return 'popstate hodisasi callback-ni chaqirmadi'; if (!receivedState || receivedState.foo !== 'bar') return 'Callback qabul qilgan state noto\\'g\\'ri'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "SPA (Single Page Application) routing-ning asosiy vazifasi nima?",
    "options": [
      "Sayt sahifalarini bir faylga siqish",
      "Sahifani serverdan qayta yuklamasdan (reload) faqat URL-ni va unga mos DOM qismini yangilash",
      "Saytning barcha rasmlarini lazy-load qilish",
      "Ma'lumotlar bazasini brauzer ichida boshqarish"
    ],
    "correctAnswer": 1,
    "explanation": "SPA routing brauzer manzilini JavaScript orqali o'zgartiradi va butun HTML sahifani serverdan qayta yuklamay, dynamic ravishda DOM-ni yangilaydi."
  },
  {
    "id": 2,
    "question": "history.pushState() metodining history.replaceState()dan farqi nima?",
    "options": [
      "pushState sahifani qayta yuklaydi, replaceState esa yuklamaydi",
      "pushState brauzer tarixiga yangi manzil qo'shadi, replaceState esa tarixdagi joriy manzilni yangisi bilan almashtiradi",
      "pushState faqat xavfsiz (https) ulanishlarda ishlaydi",
      "Hech qanday farqi yo'q, ikkalasi bir xil ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "pushState navigatsiya tarixiga (stack) yangi element qo'shadi va orqaga qaytish imkonini beradi. replaceState esa joriy manzilni o'zgartiradi va tarixga yangi yozuv qo'shmaydi."
  },
  {
    "id": 3,
    "question": "window-dagi 'popstate' hodisasi qachon sodir bo'ladi?",
    "options": [
      "Faqat pushState() yoki replaceState() chaqirilganda",
      "Foydalanuvchi brauzerning 'Orqaga' (Back) yoki 'Oldinga' (Forward) tugmalarini bosganida",
      "Yangi HTML sahifa serverdan yuklab bo'linganida",
      "Faqat URL-da hash (#) o'zgarganida"
    ],
    "correctAnswer": 1,
    "explanation": "popstate faqat foydalanuvchining orqaga/oldinga navigatsiya harakatlari yoki dasturiy ravishda history.back()/forward() chaqirilganda yuz beradi. pushState/replaceState chaqiruvlari popstate-ni trigger qilmaydi."
  },
  {
    "id": 4,
    "question": "SPA routerda <a> (anchor) havolalari bosilganda sahifa to'liq yuklanib ketishining qanday oldi olinadi?",
    "options": [
      "a tegining href atributini bo'sh qoldirish orqali",
      "Bosish (click) event listenerida event.preventDefault() chaqirish orqali",
      "CSS orqali pointer-events: none qilish orqali",
      "pushState-ga uchinchi parametr bermaslik orqali"
    ],
    "correctAnswer": 1,
    "explanation": "event.preventDefault() brauzerning havolaga o'tish bo'yicha default server so'rovini to'xtatadi va boshqaruvni router kodiga topshiradi."
  },
  {
    "id": 5,
    "question": "History API ishlatilgan SPA-da biror URL-da turib sahifa yangilanganda (Refresh/F5) 404 Not Found xatosi kelib chiqishiga nima sabab bo'ladi?",
    "options": [
      "Brauzer keshining to'lib qolganligi",
      "Brauzer o'sha URL yo'li bo'yicha serverdan to'g'ridan-to'g'ri fayl qidirishi va serverda u mavjud emasligi",
      "Router kodidagi sintaktik xatolik",
      "Internet tezligining pastligi"
    ],
    "correctAnswer": 1,
    "explanation": "Brauzer serverdan to'g'ridan-to'g'ri masalan '/about' faylini so'raydi. Server bu faylni topa olmasa 404 beradi. Server barcha so'rovlarni index.htmlga rewrite qilishi kerak."
  },
  {
    "id": 6,
    "question": "Server konfiguratsiyasini o'zgartira olmaydigan static hostingda (masalan oddiy GitHub Pages) qaysi router turidan foydalanish tavsiya etiladi?",
    "options": [
      "History API Routing",
      "Hash Routing (/#/about)",
      "Server Routing (MPA)",
      "WebSockets Routing"
    ],
    "correctAnswer": 1,
    "explanation": "Hash Routing-dagi '#' belgisidan keyingi URL qismi serverga yuborilmaydi. Shuning uchun server konfiguratsiyasisiz ham 404 xatosi yuzaga kelmaydi."
  },
  {
    "id": 7,
    "question": "history.state obyektiga qanday turdagi ma'lumotlarni saqlash mumkin?",
    "options": [
      "Istalgan JS obyekti yoki funksiyalarni",
      "Faqat seriyalash mumkin bo'lgan (structured clone) JSON obyektlarini",
      "Faqat HTML elementlarini",
      "Hech qanday ma'lumot saqlab bo'lmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "History API state-ga faqat ketma-ketlikka (serialization) mos keladigan ma'lumotlarni saqlashga ruxsat beradi. Funksiyalar yoki DOM tugunlarini saqlab bo'lmaydi."
  },
  {
    "id": 8,
    "question": "location.assign(url) metodining history.pushState-dan asosiy farqi nimada?",
    "options": [
      "location.assign sahifani serverdan qayta yuklab o'tadi, pushState esa sahifani yuklamay faqat URL-ni o'zgartiradi",
      "location.assign tarixga yozuv qo'shmaydi",
      "pushState sahifani to'liq yuklaydi",
      "Hech qanday farqi yo'q"
    ],
    "correctAnswer": 0,
    "explanation": "location.assign(url) an'anaviy sahifa navigatsiyasidir (sahifani qayta yuklaydi). pushState esa mijoz (client) tomondagi dynamic navigatsiyadir."
  },
  {
    "id": 9,
    "question": "SPA-da '/user/:id' kabi dynamic URL-larni aniqlash qaysi texnologiyaga tayanadi?",
    "options": [
      "CSS Selectors",
      "Regular Expressions (Regex)",
      "JSON Parsing",
      "WebWorkers API"
    ],
    "correctAnswer": 1,
    "explanation": "Dynamic marshrutlar routerda regex shablonlariga o'tkazilib solishtiriladi va dynamic parametrlar (id) regex match guruhlari orqali ajratib olinadi."
  },
  {
    "id": 10,
    "question": "Foydalanuvchi yangi sahifaga o'tganda brauzerning avtomatik skroll holatini tiklash harakatini o'chirish uchun nima qilinadi?",
    "options": [
      "window.scrollTo(0, 0) qilish",
      "history.scrollRestoration = 'manual' deb belgilash",
      "history.scrollRestoration = 'auto' qilish",
      "popstate-ni bekor qilish"
    ],
    "correctAnswer": 1,
    "explanation": "history.scrollRestoration xususiyatiga 'manual' qiymati berilsa, brauzer orqaga/oldinga qaytganda skroll pozitsiyasini o'zi tiklamaydi, bu esa dasturchiga skrollni qo'lda chiroyli boshqarish imkonini beradi."
  },
  {
    "id": 11,
    "question": "Router Middleware yoki Navigation Guards nima maqsadda qo'llaniladi?",
    "options": [
      "Sahifadagi rasmlarni siqib yuklash uchun",
      "Navigatsiya tugashidan oldin ruxsatnomalarni (auth) tekshirish va kirishni cheklash uchun",
      "URL-ni shifrlash uchun",
      "CSS stillarini dynamic o'zgartirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Navigation guards navigatsiyadan oldin foydalanuvchining login qilganligi yoki sahifaga kirish huquqi borligini tekshiradi va ruxsat beradi yoki boshqa tomonga yo'naltiradi."
  },
  {
    "id": 12,
    "question": "Micro-Frontend arxitekturasida turli routerlar o'rtasida URL ziddiyatlarini (conflicts) oldini olishning eng yaxshi yo'li qaysi?",
    "options": [
      "Faqat bitta global routerdan foydalanish va micro-applarni routerdan mahrum qilish",
      "Routerlararo muloqot uchun Custom Window Events (maxsus eventlar) yozish va xabarlashish",
      "Barcha linklarni to'liq reload qilish",
      "Faqat localstorage ishlatish"
    ],
    "correctAnswer": 1,
    "explanation": "Custom Window Events yordamida har bir dynamic ilova global URL o'zgarishlarini eshitadi va ziddiyatlarsiz o'z holatini sinxronlashtiradi."
  }
]

};

export const step14_class_components_and_errors = {
  id: 'step14_class_components_and_errors',
  title: '14. Klass Komponentlar va Xatolarni Boshqarish',
  content: `
# 14. Klass Komponentlar (Class Components) va Xatolarni Boshqarish (Error Boundaries)

React olamida bugungi kunda Functional Components va Hooks (Hooklar) dominant bo'lsa-da, Klass Komponentlar (Class Components) uzoq yillar davomida React'ning asosi bo'lib kelgan. Shuningdek, ba'zi muhim xususiyatlar, masalan, **Error Boundaries** (Xatolar chegarasi) faqat klass komponentlar orqali amalga oshiriladi.

Ushbu darsda biz Klass komponentlar qanday ishlashini, ulardagi holat (state) va hayot tsikli (lifecycle) metodlarini, shuningdek, dastur ishdan chiqishining oldini oluvchi Error Boundaries haqida chuqur o'rganamiz.

---

## 1. Klass Komponentlar Asoslari va Konstruktor

### Klass Komponent nima?

Klass komponent - bu ES6 klassi bo'lib, u React'ning \\\`Component\\\` klassidan meros oladi va o'zida \\\`render()\\\` metodini saqlaydi.

**Analogi:** Agar Funksional Komponentlar bitta savolga javob beruvchi oddiy ishchilar bo'lsa, Klass Komponentlar - o'z ofisiga (state), kundalik rejasiga (lifecycle) va shaxsiy jurnaliga ega bo'lgan bo'lim boshliqlari kabi.

\\\`\\\`\\\`jsx
import React, { Component } from 'react';

class Salomi extends Component {
  render() {
    return <h1>Salom, {this.props.ism}!</h1>;
  }
}
\\\`\\\`\\\`

### Konstruktor (Constructor)

Klass komponentlarda boshlang'ich sozlamalarni, ayniqsa *state* (holat) ni o'rnatish uchun \\\`constructor\\\` ishlatiladi.

\\\`\\\`\\\`jsx
class MeningKomponentim extends Component {
  constructor(props) {
    super(props); // Ota klassning konstruktorini chaqirish shart!
    
    // Boshlang'ich holatni o'rnatish
    this.state = {
      sanoq: 0
    };
  }

  render() {
    return <div>Sanoq: {this.state.sanoq}</div>;
  }
}
\\\`\\\`\\\`

> **Muhim Qoida:** Agar klassda konstruktor yozsangiz, doimo birinchi qatorda \\\`super(props)\\\` ni chaqirishingiz shart. Aks holda, \\\`this.props\\\` ishlamaydi!

---

## 2. State Boshqaruvi: \\\`this.setState\\\`

Klass komponentlarda holatni o'zgartirish faqat \\\`this.setState()\\\` orqali amalga oshiriladi. Hech qachon \\\`this.state.sanoq = 1\\\` deb to'g'ridan-to'g'ri o'zgartirmang!

\\\`\\\`\\\`jsx
class Hisoblagich extends Component {
  constructor(props) {
    super(props);
    this.state = { sanoq: 0 };
    
    // Metodni this ga bog'lash (binding)
    this.oshirish = this.oshirish.bind(this);
  }

  oshirish() {
    this.setState({ sanoq: this.state.sanoq + 1 });
  }

  // ES6 Arrow function orqali binding'dan qutulish mumkin
  kamaytirish = () => {
    this.setState(prevState => ({ sanoq: prevState.sanoq - 1 }));
  }

  render() {
    return (
      <div>
        <h2>Sanoq: {this.state.sanoq}</h2>
        <button onClick={this.oshirish}>+1</button>
        <button onClick={this.kamaytirish}>-1</button>
      </div>
    );
  }
}
\\\`\\\`\\\`

### Do's and Don'ts (Qilish kerak va Mumkin emas)

✅ **QILING:** Oldingi holatga asoslanib o'zgartirmoqchi bo'lsangiz, \\\`setState\\\` ichiga funksiya bering: \\\`this.setState((prevState) => ({ x: prevState.x + 1 }))\\\`.
❌ **QILMANG:** \\\`this.state.x = 2\\\` kabi o'zgaruvchini to'g'ridan-to'g'ri mutatsiya qilmang. React komponentni qayta chizmaydi!

---

## 3. Hayot Tsikli Metodlari (Lifecycle Methods)

Komponentning tug'ilishidan (Mounting) tortib, to ekrandan o'chib ketishigacha (Unmounting) bo'lgan jarayon hayot tsikli deb ataladi.

\\\`\\\`\\\`mermaid
flowchart TD
    A[Mounting <br/> Tug'ilish] --> B[componentDidMount]
    C[Updating <br/> O'zgarish] --> D[componentDidUpdate]
    E[Unmounting <br/> O'lish] --> F[componentWillUnmount]
\\\`\\\`\\\`

### 1. \\\`componentDidMount()\\\`
Komponent ekranga birinchi marta chizilganidan so'ng darhol ishga tushadi. 
**Qachon ishlatiladi?** API dan ma'lumot yuklash, taymerlarni yoqish yoki DOM ni to'g'ridan-to'g'ri o'zgartirish kerak bo'lganda.

\\\`\\\`\\\`jsx
componentDidMount() {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => this.setState({ data }));
    
  this.timerID = setInterval(() => this.tick(), 1000);
}
\\\`\\\`\\\`

### 2. \\\`componentDidUpdate(prevProps, prevState)\\\`
Komponentning state yoki props'i o'zgargandan so'ng va u qayta chizilgandan keyin ishga tushadi.
**Qachon ishlatiladi?** Agar ma'lum bir state o'zgarganda yana qandaydir qo'shimcha ish qilish kerak bo'lsa.

\\\`\\\`\\\`jsx
componentDidUpdate(prevProps, prevState) {
  if (this.state.sanoq !== prevState.sanoq) {
    document.title = \\\`Siz \\\${this.state.sanoq} marta bosdingiz\\\`;
  }
}
\\\`\\\`\\\`

### 3. \\\`componentWillUnmount()\\\`
Komponent ekrandan o'chirilishidan darhol oldin ishga tushadi.
**Qachon ishlatiladi?** Taymerlarni to'xtatish, obunalarni (subscriptions) bekor qilish uchun (Memory leak oldini olish).

\\\`\\\`\\\`jsx
componentWillUnmount() {
  clearInterval(this.timerID); // Taymerni o'chirish
}
\\\`\\\`\\\`

---

## 4. Xatolarni Boshqarish: Error Boundaries

Tasavvur qiling, sizning ilovangizda kichik bir komponent ishdan chiqdi. Default holatda bu butun React ilovasining "qulashiga" olib keladi (Oq ekran ko'rinib qoladi).

**Error Boundaries (Xato chegaralari)** xuddi elektr tarmog'idagi saqlagichlar (probkalar) kabi ishlaydi. Ular xato yuz berganda uni tutib qoladi va butun uy yonib ketishining o'rniga, faqat bitta xonadagi chiroqni o'chirib, o'rniga "Zaxira lampochka" ni yoqadi.

> **Eslatma:** Error boundaries hozircha *faqat* Klass komponentlar orqali yaratilishi mumkin. Hooklarda uning muqobili yo'q.

### Error Boundary yaratish

Komponent xatolar chegarasiga aylanishi uchun u kamida bitta quyidagi metodni o'z ichiga olishi kerak:
1. \\\`static getDerivedStateFromError(error)\\\` - zaxira UI (fallback UI) ko'rsatish uchun state ni yangilash.
2. \\\`componentDidCatch(error, errorInfo)\\\` - xatoni log faylga (masalan Sentry'ga) yuborish uchun.

\\\`\\\`\\\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Xato yuz berganda keyingi renderda Fallback UI ko'rsatish uchun
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Xatoni serverga jo'natishingiz mumkin
    console.error("Xato yuz berdi:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Zaxira UI
      return <h2>Kechirasiz, nimadir xato ketdi! Dasturchilarimiz buni tuzatishmoqda.</h2>;
    }

    return this.props.children; 
  }
}
\\\`\\\`\\\`

### Error Boundary'dan Foydalanish

Siz Error Boundary komponentingizni butun dastur atrofida yoki alohida muhim qismlar atrofida o'rashingiz mumkin.

\\\`\\\`\\\`jsx
<ErrorBoundary>
  <MeningXavfliKomponentim />
</ErrorBoundary>
\\\`\\\`\\\`

\\\`\\\`\\\`mermaid
flowchart TD
    A[Ilova] --> B[ErrorBoundary]
    B --> C{Xato bormi?}
    C -->|Yo'q| D[MeningXavfliKomponentim ko'rinadi]
    C -->|Ha| E[Fallback UI - Kechirasiz, xato... ko'rinadi]
\\\`\\\`\\\`

---

## 5. Xulosa

1. **Klass Komponentlar** holatni va hayot tsiklini boshqarish uchun ES6 klasslaridan foydalanadi.
2. **State** o'zgartirish doim \\\`this.setState()\\\` orqali bo'lishi kerak.
3. Hayot tsikli metodlari (\\\`componentDidMount\\\`, \\\`componentDidUpdate\\\`, \\\`componentWillUnmount\\\`) komponent hayotining muayyan bosqichlarida aralashishga imkon beradi.
4. **Error Boundaries** yordamida kichik komponentdagi xatolik tufayli butun sayt oq ekran bo'lib qolishining oldi olinadi. Zaxira UI (Fallback UI) ko'rsatiladi.

Klass komponentlar eskiroq loyihalarda juda ko'p uchraydi, shuning uchun ularni qanday o'qish va tushunishni bilish har bir professional React dasturchisi uchun shartdir!
  `,
  code: `import React, { Component } from 'react';

// Klass komponent yaratish va state bilan ishlash
class MeningKomponentim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sanoq: 0
    };
  }

  oshirish = () => {
    this.setState({ sanoq: this.state.sanoq + 1 });
  }

  render() {
    return (
      <div className="p-4 border rounded shadow-sm">
        <h2 className="text-xl font-bold">Klass Komponentlar</h2>
        <p className="mt-2">Sanoq: {this.state.sanoq}</p>
        <button 
          onClick={this.oshirish}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Oshirish
        </button>
      </div>
    );
  }
}

export default MeningKomponentim;`,
  exercises: [
    {
      id: 1,
      title: "1-mashq: Oddiy Klass Komponent",
      description: "\`SalomDunyo\` nomli klass komponent yarating. U ekranga \`<h1>Salom, React Klasslari!</h1>\` matnini chiqarsin.",
      startingCode: `import React, { Component } from 'react';

class SalomDunyo extends Component {
  // Shu yerda render() metodini yozing
}

export default SalomDunyo;`,
      solution: `import React, { Component } from 'react';

class SalomDunyo extends Component {
  render() {
    return <h1>Salom, React Klasslari!</h1>;
  }
}

export default SalomDunyo;`,
      hint: "Klass komponentda albatta `render()` metodi bo'lishi va u qandaydir JSX ni return qilishi kerak."
    },
    {
      id: 2,
      title: "2-mashq: Konstruktor va State",
      description: "\`Shaxs\` nomli klass komponent yarating. Konstruktor ichida \`ism\` degan state yarating va unga o'z ismingizni bering. Ekranda \`Mening ismim [ism]\` deb chiqsin.",
      startingCode: `import React, { Component } from 'react';

class Shaxs extends Component {
  // Konstruktor yarating va state o'rnating
  
  render() {
    // JSX da state dan foydalaning
    return <div>Mening ismim ...</div>;
  }
}

export default Shaxs;`,
      solution: `import React, { Component } from 'react';

class Shaxs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ism: 'Farhod'
    };
  }

  render() {
    return <div>Mening ismim {this.state.ism}</div>;
  }
}

export default Shaxs;`,
      hint: "constructor(props) ichida super(props) chaqirishni unutmang. State ni this.state = { ism: 'ismingiz' } shaklida bering."
    },
    {
      id: 3,
      title: "3-mashq: State ni o'zgartirish",
      description: "\`Holat\` degan komponent yarating. Unda \`yoniq\` (boolean) degan state bo'lsin. Boshlang'ich qiymati \`false\`. Tugma bosilganda state teskarisiga o'zgarsin. Tugmada \`yoniq\` bo'lsa 'O'chirish', aks holda 'Yoqish' yozilsin.",
      startingCode: `import React, { Component } from 'react';

class Holat extends Component {
  constructor(props) {
    super(props);
    this.state = { yoniq: false };
  }

  // tugmani bosish uchun funksiya yozing
  toggle = () => {
    // state ni o'zgartiring
  }

  render() {
    return (
      <button onClick={this.toggle}>
        {/* Yozuvni state ga qarab chiqaring */}
      </button>
    );
  }
}

export default Holat;`,
      solution: `import React, { Component } from 'react';

class Holat extends Component {
  constructor(props) {
    super(props);
    this.state = { yoniq: false };
  }

  toggle = () => {
    this.setState(prevState => ({ yoniq: !prevState.yoniq }));
  }

  render() {
    return (
      <button onClick={this.toggle}>
        {this.state.yoniq ? 'O\'chirish' : 'Yoqish'}
      </button>
    );
  }
}

export default Holat;`,
      hint: "this.setState((prevState) => ({ yoniq: !prevState.yoniq })) orqali avvalgi holatning teskarisini olasiz."
    },
    {
      id: 4,
      title: "4-mashq: componentDidMount ishlatish",
      description: "\`Vaqt\` nomli komponent yarating. U ekranga o'rnatilganda (mount bo'lganda) \`setTimeout\` orqali 2 soniyadan so'ng \`yuklandi\` state'ini \`true\` ga o'zgartirsin. Dastlab ekranda 'Yuklanmoqda...', keyin esa 'Yuklandi!' yozuvi chiqsin.",
      startingCode: `import React, { Component } from 'react';

class Vaqt extends Component {
  constructor(props) {
    super(props);
    this.state = { yuklandi: false };
  }

  // componentDidMount metodini yozing
  
  render() {
    return (
      <div>
        {this.state.yuklandi ? 'Yuklandi!' : 'Yuklanmoqda...'}
      </div>
    );
  }
}

export default Vaqt;`,
      solution: `import React, { Component } from 'react';

class Vaqt extends Component {
  constructor(props) {
    super(props);
    this.state = { yuklandi: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ yuklandi: true });
    }, 2000);
  }

  render() {
    return (
      <div>
        {this.state.yuklandi ? 'Yuklandi!' : 'Yuklanmoqda...'}
      </div>
    );
  }
}

export default Vaqt;`,
      hint: "componentDidMount() ichida setTimeout dan foydalaning va unda setState ni chaqiring."
    },
    {
      id: 5,
      title: "5-mashq: componentWillUnmount bilan ishlash",
      description: "Bizda soatni ko'rsatadigan \`Soat\` komponenti bor. U har soniyada yangilanadi. \`componentWillUnmount\` ichida shu intervalni tozalashingiz kerak.",
      startingCode: `import React, { Component } from 'react';

class Soat extends Component {
  constructor(props) {
    super(props);
    this.state = { vaqt: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // Shu yerda componentWillUnmount yozing
  
  tick() {
    this.setState({ vaqt: new Date() });
  }

  render() {
    return <h2>{this.state.vaqt.toLocaleTimeString()}</h2>;
  }
}

export default Soat;`,
      solution: `import React, { Component } from 'react';

class Soat extends Component {
  constructor(props) {
    super(props);
    this.state = { vaqt: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ vaqt: new Date() });
  }

  render() {
    return <h2>{this.state.vaqt.toLocaleTimeString()}</h2>;
  }
}

export default Soat;`,
      hint: "componentWillUnmount() da clearInterval(this.timerID) ni chaqiring, shunda komponent o'chganda xotirada joy band qilmaydi."
    },
    {
      id: 6,
      title: "6-mashq: componentDidUpdate",
      description: "Komponentning qiymati o'zgarganda qandaydir ishlarni amalga oshirish kerak. \`Son\` komponentida \`qiymat\` state bor. Agar u 5 dan oshib ketsa, \`ogohlantirish\` state'ini \`true\` ga o'zgartiring. Buni \`componentDidUpdate\` da bajaring.",
      startingCode: `import React, { Component } from 'react';

class Son extends Component {
  constructor(props) {
    super(props);
    this.state = { qiymat: 0, ogohlantirish: false };
  }

  oshirish = () => {
    this.setState(prev => ({ qiymat: prev.qiymat + 1 }));
  }

  // componentDidUpdate ni yozing
  // ogohlantirish: false bo'lsa va qiymat > 5 bo'lsa uni true qiling

  render() {
    return (
      <div>
        <p>Qiymat: {this.state.qiymat}</p>
        {this.state.ogohlantirish && <p style={{color:'red'}}>Chegaradan o'tdingiz!</p>}
        <button onClick={this.oshirish}>+1</button>
      </div>
    );
  }
}

export default Son;`,
      solution: `import React, { Component } from 'react';

class Son extends Component {
  constructor(props) {
    super(props);
    this.state = { qiymat: 0, ogohlantirish: false };
  }

  oshirish = () => {
    this.setState(prev => ({ qiymat: prev.qiymat + 1 }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.qiymat > 5 && !this.state.ogohlantirish) {
      this.setState({ ogohlantirish: true });
    }
  }

  render() {
    return (
      <div>
        <p>Qiymat: {this.state.qiymat}</p>
        {this.state.ogohlantirish && <p style={{color:'red'}}>Chegaradan o'tdingiz!</p>}
        <button onClick={this.oshirish}>+1</button>
      </div>
    );
  }
}

export default Son;`,
      hint: "componentDidUpdate(prevProps, prevState) da \`this.state.qiymat > 5\` va \`!this.state.ogohlantirish\` ekanligini tekshiring, keyin setState qiling. Aks holda cheksiz tsikl yuzaga keladi!"
    },
    {
      id: 7,
      title: "7-mashq: Error Boundary Yaratish (getDerivedStateFromError)",
      description: "\`XatoChegarasi\` nomli Error Boundary yarating. Unda \`hasError\` state'i bo'lsin. Agar uning bolalarida xato chiqsa, ekranda \`<h1>Xatolik yuz berdi.</h1>\` ko'rsating.",
      startingCode: `import React, { Component } from 'react';

class XatoChegarasi extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError ni yozing

  render() {
    // Agar xato bo'lsa <h1>Xatolik yuz berdi.</h1> ni qaytaring
    // Aks holda this.props.children ni qaytaring
  }
}

export default XatoChegarasi;`,
      solution: `import React, { Component } from 'react';

class XatoChegarasi extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Xatolik yuz berdi.</h1>;
    }
    return this.props.children;
  }
}

export default XatoChegarasi;`,
      hint: "static getDerivedStateFromError(error) metodidan { hasError: true } obyektini return qiling."
    },
    {
      id: 8,
      title: "8-mashq: Error Boundary - componentDidCatch",
      description: "\`XatoLog\` nomli Error Boundary komponentida \`componentDidCatch\` yordamida xatoni \`console.log\` orqali konsolga chiqaring. Fallback UI sifatida \`<div>Dastur ishdan chiqdi</div>\` ko'rsating.",
      startingCode: `import React, { Component } from 'react';

class XatoLog extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // componentDidCatch ni yozing

  render() {
    if (this.state.hasError) {
      return <div>Dastur ishdan chiqdi</div>;
    }
    return this.props.children;
  }
}

export default XatoLog;`,
      solution: `import React, { Component } from 'react';

class XatoLog extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Ushlangan xato:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Dastur ishdan chiqdi</div>;
    }
    return this.props.children;
  }
}

export default XatoLog;`,
      hint: "componentDidCatch ikkita argument qabul qiladi: error va errorInfo. Ularni konsolga chiqaring."
    },
    {
      id: 9,
      title: "9-mashq: Arrow Function vs Bind",
      description: "Ba'zida kliklanganda klass metodidagi \`this\` yo'qolib qoladi. Quyidagi klass komponentni tuzating. Funksiyani to'g'ri ulash (bind qilish) yoki Arrow function orqali yozish imkoniyati bor.",
      startingCode: `import React, { Component } from 'react';

class Xabar extends Component {
  constructor(props) {
    super(props);
    this.state = { matn: 'Assalomu alaykum' };
  }

  // Bu funksiya klik qilinganda this.setState ni topolmaydi, xato beradi!
  ozgartir() {
    this.setState({ matn: 'Xayr' });
  }

  render() {
    return (
      <div>
        <p>{this.state.matn}</p>
        <button onClick={this.ozgartir}>O'zgartirish</button>
      </div>
    );
  }
}

export default Xabar;`,
      solution: `import React, { Component } from 'react';

class Xabar extends Component {
  constructor(props) {
    super(props);
    this.state = { matn: 'Assalomu alaykum' };
  }

  ozgartir = () => {
    this.setState({ matn: 'Xayr' });
  }

  render() {
    return (
      <div>
        <p>{this.state.matn}</p>
        <button onClick={this.ozgartir}>O'zgartirish</button>
      </div>
    );
  }
}

export default Xabar;`,
      hint: "ozgartir() { ... } ni ozgartir = () => { ... } qilib arrow function ga o'zgartirsangiz muammo hal bo'ladi."
    },
    {
      id: 10,
      title: "10-mashq: Props va State integratsiyasi",
      description: "\`Kattalashuvchi\` klass komponenti props orqali \`boshlangich\` (raqam) qiymatni qabul qiladi. U o'zining state'ida ham buni saqlaydi. Konstruktorda state ni shu props'ga tenglang.",
      startingCode: `import React, { Component } from 'react';

class Kattalashuvchi extends Component {
  constructor(props) {
    super(props);
    // state ni props.boshlangich ga o'rnating
    this.state = { raqam: 0 };
  }

  render() {
    return <div>Raqam: {this.state.raqam}</div>;
  }
}

export default Kattalashuvchi;`,
      solution: `import React, { Component } from 'react';

class Kattalashuvchi extends Component {
  constructor(props) {
    super(props);
    this.state = { raqam: props.boshlangich };
  }

  render() {
    return <div>Raqam: {this.state.raqam}</div>;
  }
}

export default Kattalashuvchi;`,
      hint: "this.state = { raqam: props.boshlangich } orqali props dan kelayotgan qiymatni boshlang'ich state sifatida o'rnating."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Klass komponentlar qaysi klassdan meros (extend) oladi?",
      options: [
        "React.Element",
        "React.Class",
        "React.Component",
        "React.Node"
      ],
      correctAnswer: 2,
      explanation: "Klass komponentlar doimo React.Component (yoki React.PureComponent) dan meros olishi kerak."
    },
    {
      id: 2,
      question: "Klass komponentda ekranga nimadir chizish uchun qaysi metod albatta bo'lishi shart?",
      options: [
        "return()",
        "render()",
        "display()",
        "paint()"
      ],
      correctAnswer: 1,
      explanation: "Har bir klass komponentda render() metodi bo'lishi va u qandaydir JSX yoxud null qaytarishi shart."
    },
    {
      id: 3,
      question: "Klass komponentda boshlang'ich state (holat) qayerda e'lon qilinadi?",
      options: [
        "componentDidMount ichida",
        "render ichida",
        "constructor ichida",
        "To'g'ridan to'g'ri renderdan keyin"
      ],
      correctAnswer: 2,
      explanation: "Boshlang'ich state constructor ichida this.state = {...} ko'rinishida beriladi."
    },
    {
      id: 4,
      question: "Konstruktor yozilganda nima uchun 'super(props)' ni birinchi qatorda yozish talab etiladi?",
      options: [
        "Chunki u holda 'this' kalit so'zi ishlamaydi va this.props ga kirib bo'lmaydi.",
        "Bu xavfsizlik chorasi bo'lib, hakerlik hujumlarini oldini oladi.",
        "Faqat super() ishlatilsa xotiradan kamroq joy egallaydi.",
        "React tezroq ishlashi uchun."
      ],
      correctAnswer: 0,
      explanation: "Agar super(props) chaqirilmasa, ushbu komponent ichida 'this' ni chaqirib bo'lmaydi va this.props aniqlanmay qoladi."
    },
    {
      id: 5,
      question: "Klass komponentning state'ini yangilash uchun qaysi usuldan foydalanish to'g'ri?",
      options: [
        "this.state.name = 'John'",
        "this.updateState({name: 'John'})",
        "this.setState({name: 'John'})",
        "setState(name, 'John')"
      ],
      correctAnswer: 2,
      explanation: "Faqatgina this.setState orqali yangilanganda React komponentni qayta chizadi."
    },
    {
      id: 6,
      question: "Qaysi hayot tsikli (lifecycle) metodi komponent ekranga chizilganidan so'ng darhol bitta marta chaqiriladi?",
      options: [
        "componentWillMount",
        "componentDidUpdate",
        "componentWillUnmount",
        "componentDidMount"
      ],
      correctAnswer: 3,
      explanation: "componentDidMount komponent birinchi marta render qilingandan keyin darhol ishga tushadi. Bu API larni chaqirish uchun qulay joy."
    },
    {
      id: 7,
      question: "Ekranni tark etayotgan (o'chirilayotgan) komponentda taymerlarni va obunalarni bekor qilish uchun qaysi metoddan foydalanamiz?",
      options: [
        "componentDidUnmount",
        "componentWillUnmount",
        "componentDidUpdate",
        "constructor"
      ],
      correctAnswer: 1,
      explanation: "componentWillUnmount komponent xotiradan o'chirilishidan darhol oldin ishlaydi."
    },
    {
      id: 8,
      question: "componentDidUpdate metodi necha marta ishlaydi?",
      options: [
        "Faqat komponent yangi ochilganda 1 marta",
        "Komponentning holati (state) yoki prop'si o'zgarib qayta chizilganda har gal ishlaydi",
        "Faqat komponent o'chayotganda",
        "O'zgaruvchilar yaratilganda"
      ],
      correctAnswer: 1,
      explanation: "U komponentdagi har bir o'zgarish (update) dan keyin ishga tushadi."
    },
    {
      id: 9,
      question: "Error Boundary nima uchun kerak?",
      options: [
        "Saytni bezash uchun",
        "Koddagi sintaktik (syntax) xatolarni tuzatish uchun",
        "Ish vaqtida (runtime) bolalar komponentlarida chiqqan xatolarni tutib olib, zaxira UI ko'rsatish va dastur butunlay qulashining oldini olish uchun",
        "Xatolarni avtomatik o'zgartirish va ma'lumotlarni qayta ishlash uchun"
      ],
      correctAnswer: 2,
      explanation: "Error Boundaries butun React ilovasi oq ekranga aylanib qolmasligi uchun ishlatiladi, u xatolarni ushlab, Fallback UI ko'rsatadi."
    },
    {
      id: 10,
      question: "Error Boundary yaratish uchun komponentda qaysi metodlardan biri mavjud bo'lishi shart?",
      options: [
        "componentDidMount yoki componentWillUnmount",
        "static getDerivedStateFromError yoki componentDidCatch",
        "componentDidUpdate yoki render",
        "constructor yoki setState"
      ],
      correctAnswer: 1,
      explanation: "Klass komponenti ushbu ikki metoddan birini qamrab olgan bo'lsa, u Error Boundary hisoblanadi."
    },
    {
      id: 11,
      question: "getDerivedStateFromError metodi qanday qilib ishlaydi?",
      options: [
        "U state'ni to'g'ridan to'g'ri mutatsiya qiladi.",
        "U xato yuz berganda yangi obyektni return qiladi va bu state'ni yangilaydi (masalan { hasError: true }).",
        "U serverga so'rov yuboradi.",
        "U komponentni to'liq bloklaydi va uni o'chirib tashlaydi."
      ],
      correctAnswer: 1,
      explanation: "U xatodan so'ng qanday state bo'lishini return qilish uchun ishlatiladi (zaxira UI ni ko'rsatish uchun)."
    },
    {
      id: 12,
      question: "Nima uchun Error Boundaries funksional komponentlarda Hooks bilan yaratilmaydi?",
      options: [
        "Chunki funksional komponentlarda xato chiqmaydi.",
        "Hozirgi vaqtda Error Boundaries uchun Hook muqobili (masalan useErrorBoundary) React da mavjud emas, uni faqat klass komponent bilan yozish mumkin.",
        "Funksional komponentlar buni qo'llab quvvatlamaydi, chunki ular juda sekin.",
        "Hooklar orqali xatolarni console ga chiqarish mumkin emas."
      ],
      correctAnswer: 1,
      explanation: "React kutubxonasida Error Boundary metodlarining Hook ekvivalenti yo'q. Shu sababli u haligacha klass komponentda yoziladi."
    }
  ]
};

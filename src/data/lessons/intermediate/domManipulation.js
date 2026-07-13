export const domManipulation = {
  id: "domManipulation",
  title: "DOM Manipulyatsiyasi: Elementlar Yaratish va Boshqarish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish (Beginner Analogy)

**DOM Manipulyatsiyasi** bu web-sahifadagi HTML elementlarini JavaScript yordamida dasturiy (dynamic) ravishda yaratish, joylashtirish, o'zgartirish yoki o'chirish jarayonidir. 

### O'xshatish: Lego Konstruktori
Buni Lego konstruktorlarini yig'ishga o'xshatish mumkin:
1. **Yaratish (Create):** Siz qutidan yangi g'ishtcha olasiz (\\\`document.createElement\\\`).
2. **Joylashtirish (Insert):** Uni asosiy poydevorga yoki boshqa g'ishtchalar orasiga ulab qo'yasiz (\\\`appendChild\\\` yoki \\\`prepend\\\`).
3. **O'zgartirish (Modify):** G'ishtchaga yozuv yoki maxsus sticker yopishtirasiz (\\\`textContent\\\`, \\\`classList.add\\\`).
4. **O'chirish (Remove):** Noto'g'ri qo'yilgan bo'lakni olib tashlaysiz (\\\`remove()\\\`).
5. **Klonlash (Clone):** Bir xil shaklli derazadan yana bitta kerak bo'lsa, xuddi shundan nusxa olasiz (\\\`cloneNode()\\\`).

---

## 2. 🔬 Deep Dive: Under the Hood, Memory, V8 Engine & Performance

DOM (Document Object Model) — bu C++ da yozilgan brauzer API'si. JavaScript (V8 Engine) va DOM alohida olamlardir. Ularning o'rtasida ma'lumot almashish va birgalikda ishlash qimmat turadi. 

* **Binding / Bridge:** JS V8 dvigateli orqali ishlaganda, u DOM tugunlariga \\\`bridge\\\` orqali murojaat qiladi. Har safar DOM ga teginganda, bu \\\`bridge\\\` o'tiladi, va bu sekinlashishga (performance hit) olib kelishi mumkin.
* **Reflow va Repaint:** Agar DOM o'zgarganda sahifa maketi (layout) o'zgarsa, brauzer **Reflow** (qayta hisoblash) qiladi. Agar faqat rang yoki font o'zgarsa, **Repaint** (qayta chizish) qiladi. Ikkalasi ham qimmat jarayon, ammo Reflow eng qimmati hisoblanadi.
* **DocumentFragment:** Ko'p sonli tugunlarni bitta-bitta qo'shish har safar Reflow keltirib chiqarishi mumkin. Buni oldini olish uchun virtual idish - \\\`DocumentFragment\\\` yaratib, barcha tugunlarni unga yig'ib, so'ngra bir marta DOM'ga qo'shish kerak.
* **Garbage Collection (GC):** Elementlarni DOM dan uzib (\\\`remove()\\\`), lekin JS o'zgaruvchisida saqlab qolish \\\`Detached DOM Elements\\\` deb ataladi. Ular xotirada qolaveradi va Garbage Collector ularni tozalay olmaydi, natijada **Memory Leak** (xotira oqishi) yuz beradi.

### Mermaid Diagram: DOM Operation Flow
\\\`\\\`\\\`mermaid
graph TD;
    A[JS: document.createElement] --> B[JS Xotirasida Obyekt];
    B --> C{DOMga biriktirish?};
    C -- Ha --> D[appendChild/prepend];
    D --> E[Brauzer Reflow & Repaint];
    E --> F[Ekranda Ko'rinadi];
    C -- Yo'q --> G[Faqat JS Xotirasida qoladi];
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases (Noaniq vaziyatlar)
1. **\\\`cloneNode(true)\\\` va Event Listeners:** \\\`cloneNode\\\` tugunning xususiyatlari va atributlarini nusxalaydi, biroq \\\`addEventListener\\\` yordamida biriktirilgan JavaScript hodisalarini (event listeners) nusxalamaydi. Inline (HTML dagi) atribut hodisalarigina (masalan, \\\`onclick\\\`) nusxalanadi.
2. **innerHTML vs textContent:** Xavfsizlik jihatidan foydalanuvchi ma'lumotini kiritishda doimo \\\`textContent\\\` ishlating. \\\`innerHTML\\\` bilan ishlash \\\`XSS\\\` (Cross-Site Scripting) hujumlariga ochiq bo'ladi.
3. **Live vs Static Collections:** \\\`getElementsByClassName\\\` \\\`Live\\\` (jonli) to'plam qaytaradi (DOM o'zgarsa darhol yangilanadi), \\\`querySelectorAll\\\` esa \\\`Static\\\` to'plam qaytaradi (o'zgarishlar tasir qilmaydi).

### Senior Interview Questions
1. **Savol:** \\\`Virtual DOM\\\` qanday ishlaydi va nima uchun React kabi frameworklar to'g'ridan-to'g'ri DOM manipulyatsiyasi o'rniga undan foydalanadi?
   * **Javob:** To'g'ridan-to'g'ri DOM update'lari juda sekin va qimmat. Virtual DOM bu - JS xotirasidagi obyektlar daraxotidir. React state o'zgarganda yangi Virtual DOM yaratadi, eskilari bilan \\\`diffing\\\` (taqqoslash) algoritmini bajaradi va faqatgina o'zgargan qismlarnigina haqiqiy DOM ga batched (guruhlangan) holda yozadi. Bu esa o'z-o'zidan ortiqcha Reflow va Repaint'larning oldini oladi.

2. **Savol:** Detached DOM tugunlarini qanday aniqlaymiz va oldini olamiz?
   * **Javob:** Chrome DevTools Memory tab'ida \\\`Heap Snapshot\\\` olib, "Detached HTMLElement"larni qidiramiz. Oldini olish uchun esa elementni o'chirganimizdan so'ng uni ushlab turgan o'zgaruvchilarni yoki event listener'larni (masalan global document'ga biriktirilganlarini) ham null ga tenglash/o'chirish kerak.

3. **Savol:** \\\`DocumentFragment\\\` va oddiy \\\`div\\\` wrapper o'rtasida qanday farq bor, qaysi biri samaraliroq?
   * **Javob:** \\\`DocumentFragment\\\` xuddi bo'sh idishga o'xshaydi, DOM ga biriktirilganda uning o'zi emas, balki ichidagi tugunlarigina (children) ko'chib o'tadi. \\\`div\\\` ni qo'shganda div ning o'zi ham qo'shiladi va maketga (layout) ortiqcha qatlam qo'shiladi. \\\`DocumentFragment\\\` qo'shimcha wrapper yaratmasligi va o'zi DOM daraxtida ko'rinmasligi bilan samaraliroq.
`,
  exercises: [
    {
      id: 1,
      title: "createElement bilan ishlash",
      instruction: "Yangi 'p' (paragraf) elementi yarating, unga 'Salom Dunyo' matnini yozing va uni `document.body` ga qo'shing. Buning uchun `addGreeting()` funksiyasini yozing.",
      startingCode: "function addGreeting() {\n  // Code here\n}",
      hint: "document.createElement('p') va appendChild ishlating",
      test: "try { addGreeting(); const p = document.body.lastElementChild; if (!p || p.tagName !== 'P' || p.textContent !== 'Salom Dunyo') return 'Error: p elementi yoki text xato'; return null; } catch (e) { return e.message; }"
    },
    {
      id: 2,
      title: "Prepend qanday ishlaydi",
      instruction: "Biror div ichiga elementni boshidan qo'shuvchi `prependElement(container, text)` funksiyasini yozing. Yangi 'div' yarating, unga matnni qo'shing va `container` ning eng boshiga joylang.",
      startingCode: "function prependElement(container, text) {\n  // Code here\n}",
      hint: "yangi element yaratib uni container.prepend(newElement) qiling",
      test: "try { const c = document.createElement('div'); c.innerHTML='<span>Old</span>'; prependElement(c, 'Yangi'); if(c.firstElementChild.textContent !== 'Yangi') return 'Error: boshiga qo\\'shilmadi'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 3,
      title: "Elementni O'chirish",
      instruction: "`removeButton()` funksiyasini yozing, bu sahifadagi eng birinchi `button` elementini topsin va agar mavjud bo'lsa uni `remove()` qilib o'chirsin.",
      startingCode: "function removeButton() {\n  // Code here\n}",
      hint: "document.querySelector('button') yordamida qidiring va .remove() qiling.",
      test: "try { const btn = document.createElement('button'); document.body.appendChild(btn); removeButton(); const b = document.body.querySelector('button'); if(b && b===btn) return 'Error: O\\'chmadi'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 4,
      title: "Klonlash - cloneNode",
      instruction: "Berilgan `el` ni uning ichidagi barcha avlodlari bilan birga klonlang, ID sini 'clone' deb o'zgartiring va uni qaytaring. Buning uchun `cloneDeep(el)` yozing.",
      startingCode: "function cloneDeep(el) {\n  // Code here\n}",
      hint: "cloneNode(true) ni ishlating, keyin xususiyatini o'zgartiring.",
      test: "try { const d = document.createElement('div'); d.innerHTML='<p>Test</p>'; const r = cloneDeep(d); if(r === d || r.id !== 'clone' || !r.querySelector('p')) return 'Error'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 5,
      title: "DocumentFragment bilan ishlash",
      instruction: "`createList(items)` funksiyasini yozing. `items` bu stringlar massivi. Bitta `DocumentFragment` yarating va har bir item uchun `li` yaratib, fragmentga qo'shing. Yakunda fragmentni qaytaring.",
      startingCode: "function createList(items) {\n  // Code here\n}",
      hint: "document.createDocumentFragment()",
      test: "try { const f = createList(['A','B']); if(!f || f.childNodes.length !== 2) return 'Error'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 6,
      title: "before va after",
      instruction: "Sizga bitta element `target` berilgan. Uning yoniga: oldin `<h1>` ('Sarlavha') va keyin `<footer>` ('Tagso\\'z') qoshuvchi `addSiblings(target)` yozing.",
      startingCode: "function addSiblings(target) {\n  // Code here\n}",
      hint: "target.before(...) va target.after(...) ishlating",
      test: "try { const p = document.createElement('div'); const t = document.createElement('div'); p.appendChild(t); addSiblings(t); if(t.previousElementSibling.tagName!=='H1' || t.nextElementSibling.tagName!=='FOOTER') return 'Error'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 7,
      title: "insertAdjacentHTML",
      instruction: "Berilgan `container` div-ining aynan o'zi tugagandan keyin darhol uning orqasiga `<span>Info</span>` matnini `insertAdjacentHTML` orqali joylovchi `addInfo(container)` yozing.",
      startingCode: "function addInfo(container) {\n  // Code here\n}",
      hint: "'afterend' pozitsiyasidan foydalaning.",
      test: "try { const p = document.createElement('div'); const c = document.createElement('div'); p.appendChild(c); addInfo(c); if(c.nextElementSibling.tagName!=='SPAN') return 'Error'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 8,
      title: "closest bilan tepaga yurish",
      instruction: "Sizga `child` element beriladi. Eng yaqin ota `.container` klasiga ega bo'lgan elementni qidiruvchi va qaytaruvchi `findContainer(child)` yozing.",
      startingCode: "function findContainer(child) {\n  // Code here\n}",
      hint: "child.closest('.container') ni qaytaring",
      test: "try { const c = document.createElement('div'); c.className='container'; const ch = document.createElement('div'); c.appendChild(ch); if(findContainer(ch)!==c) return 'Error'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 9,
      title: "replaceWith orqali almashtirish",
      instruction: "Berilgan `oldEl` tugunini yangi `strong` elementi bilan almashtiruvchi `makeStrong(oldEl)` funksiyasini yozing. Eski elementning textContent'i yangisiga o'tishi kerak.",
      startingCode: "function makeStrong(oldEl) {\n  // Code here\n}",
      hint: "Yangi strong yarating, oldEl.textContent ni ko'chiring, so'ng oldEl.replaceWith(newEl).",
      test: "try { const p = document.createElement('div'); const c = document.createElement('span'); c.textContent='ok'; p.appendChild(c); makeStrong(c); if(p.firstElementChild.tagName!=='STRONG' || p.firstElementChild.textContent!=='ok') return 'Error'; return null; } catch(e) { return e.message; }"
    },
    {
      id: 10,
      title: "Barchasini tozalash va to'ldirish",
      instruction: "Berilgan `container` ichidagi hamma narsani tozalab, o'rniga bitta yagona `div` (class='placeholder') qo'shuvchi `resetContainer(container)` yozing.",
      startingCode: "function resetContainer(container) {\n  // Code here\n}",
      hint: "container.innerHTML = '' qilib keyin append ishlating",
      test: "try { const c = document.createElement('div'); c.innerHTML='<span>1</span>'; resetContainer(c); if(c.children.length!==1 || c.firstElementChild.className!=='placeholder') return 'Error'; return null; } catch(e) { return e.message; }"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "document.createElement metodi qayerda ishlaydi va qachon sahifada paydo bo'ladi?",
      options: [
        "Faqat xotirada yaratadi va DOMga ulangan zahoti sahifada paydo bo'ladi",
        "Darhol sahifaning oxiriga qo'shiladi",
        "Bu metod eski brauzerlar uchun ishlamaydi",
        "HTML da avtomatik atribut yaratadi"
      ],
      correctAnswer: 0,
      explanation: "U asosan JS xotirasida element yaratadi, to DOM ga ulash (appendChild, prepend) amalga oshirilmagunicha ekranda ko'rinmaydi."
    },
    {
      id: 2,
      question: "appendChild() va prepend() ning asosiy farqi nimada?",
      options: [
        "appendChild() mavjud hamma farzandlarni o'chirib oxiriga qo'shadi",
        "prepend() boshiga (birinchi farzand qilib), appendChild() esa eng oxiriga qo'shadi",
        "Ikkalasi ham string matnlarni parse qiladi",
        "Farqi yo'q, nomlari o'zgartirilgan xolos"
      ],
      correctAnswer: 1,
      explanation: "prepend elementni eng birinchi node sifatida, appendChild esa eng so'nggi qilib biriktiradi."
    },
    {
      id: 3,
      question: "innerHTML ning xavfsizlik borasida eng katta zaifligi nimada?",
      options: [
        "Reflow larni haddan tashqari ko'p yaratadi",
        "Foydalanuvchi ma'lumotlarini bevosita o'qib bo'lmaydi",
        "XSS (Cross-Site Scripting) hujumlariga yo'l ochadi, chunki ixtiyoriy script kodlarni ham bajarib yuborishi mumkin",
        "CSS klasslarni yo'q qilib yuboradi"
      ],
      correctAnswer: 2,
      explanation: "Agar foydalanuvchidan kelgan noma'lum matnni innerHTML ga tiqsangiz, ichidagi script va tadbirlarni (event) brauzer ishga tushirib yuborishi mumkin (XSS)."
    },
    {
      id: 4,
      question: "Bir yo'la 500 ta element yaratib DOM ga yozish kerak. Eng samarali usul qaysi?",
      options: [
        "Barchasini bittadan appendChild() qilish",
        "For loop ichida har biri uchun innerHTML += qilish",
        "Elementlarni DocumentFragment ga yig'ib, oxirida bir marta fragmentni DOM ga appendChild qilish",
        "Elementlarni massivda saqlab, window.document ni yangilash"
      ],
      correctAnswer: 2,
      explanation: "DocumentFragment xotiradagi 'guruhlovchi konteyner' hisoblanadi va faqatgina 1 ta reflow orqali barcha qismlarni render qiladi."
    },
    {
      id: 5,
      question: "Memory Leak (xotira oqishi) ni oldini olish uchun qanday qoida bor?",
      options: [
        "Elementlarni remove() qilingandan so'ng JS o'zgaruvchidagi ularga bo'lgan havolani (reference) ham o'chirib/null qilish",
        "Barcha HTML fayllarda faqat inline-style ishlatish",
        "Barcha elementlarga faqat bitta id berish",
        "Hamma variablelarni let bilan e'lon qilish"
      ],
      correctAnswer: 0,
      explanation: "Detached DOM (ajralib qolgan) xotira muammosi shundaki, DOMdan olib tashlangan tugunga havola (reference) bo'lsa, Garbage Collector uni o'chirmaydi."
    },
    {
      id: 6,
      question: "closest() qaysi tomonga qidiruv olib boradi?",
      options: [
        "Faqat farzandlar ichidan (tepadan pastga)",
        "O'zidan boshlab ota-bobolari orqali DOM daraxtining eng tepasiga qarab (pastdan tepaga)",
        "Yonidagi aka-ukalari orasidan (siblings)",
        "Hamma joydan"
      ],
      correctAnswer: 1,
      explanation: "closest metodi o'zidan boshlaydi, va bitta yuqoriga (ota elementga) ko'tarilib birinchi mos keluvchi selctorni topgunicha yuradi."
    },
    {
      id: 7,
      question: "remove() metodi nima vazifa bajaradi?",
      options: [
        "Faqat CSS stylelarini o'chiradi",
        "Ma'lum bir JS hodisalarini o'chiradi",
        "Tugunning o'zini DOM daraxtidan to'liq uzib oladi",
        "Xotiradan obyektni tozalaydi"
      ],
      correctAnswer: 2,
      explanation: "remove() elementni va uning farzandlarini vizual va obyekt daraxtidan uzib oladi, lekin uning xotiradan (memory) to'liq tozalanishi JS-da reference (havola) qolmaganiga bog'liq."
    },
    {
      id: 8,
      question: "cloneNode(false) ning vazifasi nima?",
      options: [
        "Chuqur nusxa olish, hamma bolalari bilan",
        "Nusxa olmaydi, o'zini o'zi qaytaradi",
        "Sayoz nusxa olish (shallow clone), faqat tashqi tegning o'zi va xususiyatlar nusxalanadi, matn va bolalarsiz",
        "Barcha JavaScript eventlarini ham nusxalaydi"
      ],
      correctAnswer: 2,
      explanation: "cloneNode(false) berilganda faqtgina element qobiqi nusxalanadi. Agar true bo'lsa chuqur nusxalaydi."
    },
    {
      id: 9,
      question: "insertAdjacentHTML() usulida parametr qanday bo'lishi mumkin?",
      options: [
        "'beforebegin', 'afterbegin', 'beforeend', 'afterend'",
        "'top', 'bottom', 'left', 'right'",
        "'start', 'end', 'center', 'middle'",
        "'before', 'after', 'append', 'prepend'"
      ],
      correctAnswer: 0,
      explanation: "insertAdjacentHTML ning 4 ta asosiy o'rni mavjud bo'lib, ular tegning oldidan, o'zining ichki boshlanishidan, ichki tugashidan va teg tugagandan so'ng joylashishdir."
    },
    {
      id: 10,
      question: "Reflow nima?",
      options: [
        "Rang va stillar yangilanishi jarayoni",
        "Sichqonchaning bosilishi (Click) jarayoni",
        "Brauzer tomonidan DOM dagi geometrik o'zgarishlar (o'lcham, joylashuv) natijasida barcha elementlarning joylashuvini qayta hisoblash",
        "HTTP requestni qayta jo'natish"
      ],
      correctAnswer: 2,
      explanation: "Reflow - bu layout ning har safar qayta hisoblanishi bo'lib, unumdorlik nuqtai nazaridan eng qimmat operatsiyalardan biridir."
    },
    {
      id: 11,
      question: "V8 Engine va DOM qanday muloqot qiladi?",
      options: [
        "To'g'ridan-to'g'ri bir joyda ishlaydi",
        "Ular maxsus C++ API Bridge (ko'prik) orqali muloqot qilishadi, va bu ularning orasidagi jarayonlarni qimmatroq (sekinroq) qiladi",
        "Har doim fayl tizimidan o'qish orqali",
        "Maxsus server arxitekturasi yordamida"
      ],
      correctAnswer: 1,
      explanation: "JavaScript va DOM xotirada 2 ta alohida orol. Ular C++ binding'lari orqali bir-birini tushunishadi."
    },
    {
      id: 12,
      question: "replaceWith() metodi qanday ishlaydi?",
      options: [
        "Faqat text stringni HTMLga almashtiradi",
        "Berilgan eski tugunni yangisi bilan almashtiradi (eski tugun uzilib o'rniga yangisi tushadi)",
        "Ota-ona tugunlarni joyini almashtiradi",
        "Event listener larni yangilaydi"
      ],
      correctAnswer: 1,
      explanation: "Node.replaceWith() node'ning o'rniga boshqa bir node (yoki text) qo'yib, o'zini DOMdan olib tashlaydi."
    }
  ]
};

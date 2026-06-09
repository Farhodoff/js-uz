export const reactRenderingOptimization = {
  id: "reactRenderingOptimization",
  title: "Rendering Optimization va Listlar",
  theory: `## 1. NEGA kerak?
React-da ro'yxatlar (lists) bilan ishlash eng ko'p resurs talab qiladigan qismlardan biridir. Ro'yxat elementlari qo'shilganda, o'chirilganda yoki tartiblanganda React qanday chizilishini boshqarishi kerak. To'g'ri kalit (key) tanlanmasa, sayt sezilarli darajada sekinlashishi va g'alati vizual xatoliklar yuzaga kelishi mumkin.

## 2. SODDALIK (Analogiya)
Sizda talabalar navbati bor: \`[Ali, Vali, G'ani]\`.
Siz navbatning boshiga \`Sami\`ni qo'shmoqchisiz: \`[Sami, Ali, Vali, G'ani]\`.
- **Indeks key ishlatilsa (yoki key qo'yilmasa):** Ali 0-index edi, endi Sami 0-index bo'ldi. React navbatdagi hamma talabaning ismini tekshirib, hammani joyidan qo'zg'atib, qaytadan chizib chiqadi (hamma indekslar surilgani uchun).
- **Unikal ID key ishlatilsa (key="id-123"):** React Sami yangi ekanligini, Ali, Vali va G'ani esa shunchaki surilganini ko'radi va ularni qayta render qilmaydi. Faqat Samini yangi qo'shadi.

## 3. STRUKTURA VA PRINSIPLAR
- **Key props nima uchun kerak?**
  - Virtual DOM reconciliation jarayonida elementlarning shaxsiyatini (identity) saqlab qolish va faqatgina o'zgarganini chizish uchun.
- **Index-ni key qilish qachon xavfli?**
  - Ro'yxat elementlari dinamik o'chirilganda, qo'shilganda yoki saralanganda. Bu holda indekslar siljishi sababli, input qiymatlari noto'g'ri joyga o'tib ketadi va performance tushadi.
- **Index-ni key qilish qachon ruxsat etiladi?**
  - Ro'yxat mutlaqo statik (o'zgarmas) bo'lsa, hech qachon saralanmasa yoki o'chirilmasa.

## 4. KO‘P UCHRAYDIGAN XATOLAR (Junior Mistakes)
1. **\`key={Math.random()}\` yozish:** Har renderda mutlaqo yangi key yaratilib, React butun ro'yxatni noldan qayta o'rnatadi (Destroy and mount), bu barcha local state-larni o'chirib yuboradi va performance-ni o'ldiradi.
2. **Key-ni child element o'ziga emas, parent fragmentga qo'yish:** Key har doim \`.map()\` ichida qaytayotgan eng tashqi tag-ga qo'yilishi shart.

## 5. SAVOLLAR VA JAVOBLAR (Interview Questions)
1. **Nima uchun 'key' prop React-da juda muhim?**
   - React Virtual DOM diffing jarayonida elementlarni unikal identifikatsiya qilib, faqat o'zgarganini sahifaga yozishi uchun.
2. **Nega key sifatida index tavsiya etilmaydi?**
   - Ro'yxat tartibi o'zgarganda indekslar yangilanadi va React eski ma'lumotlarni yangi joyda noto'g'ri chizib yuboradi.
3. **Key qiymatini komponent ichida prop qilib o'qish mumkinmi?**
   - Yo'q, \`key\` va \`ref\` React-ning o'ziga tegishli maxsus kalitlar bo'lib, props orqali o'qib bo'lmaydi.
4. **Har renderda yangi kalit (key) generatsiya qilinsa nima bo'ladi?**
   - Butun komponent noldan o'rnatiladi (remount), bu barcha state va fokusu o'chiradi hamda dasturni sekinlashtiradi.
5. **Fragmentlar ishlatilganda key qayerga yoziladi?**
   - \`<React.Fragment key={id}>\` ko'rinishida yozilishi kerak. Qisqartirilgan \`<>\` tegi kalit qabul qilmaydi.
6. **Key o'zgarishi butun komponentni tozalash (reset state) uchun qanday ishlatiladi?**
   - Agar komponentga berilgan \`key\` qiymatini o'zgartirsangiz (masalan, \`key={userId}\`), React eski holatni o'chirib komponentni noldan yaratadi.
7. **Nega React key yo'q bo'lsa warning beradi?**
   - Chunki key qo'yilmasa, React standart tarzda indeksdan foydalanadi va bu xavfli bo'lganligi sababli ogohlantiradi.
8. **Ro'yxatda kalit unikal bo'lmasa nima yuz beradi?**
   - React konsolda duplicate key warning beradi va elementlar to'g'ri render bo'lmasligi mumkin.
9. **React.Children API nima uchun kerak?**
   - Komponent ichiga kelgan bolalarni (children) boshqarish, sanash yoki o'zgartirish uchun yordamchi metodlar to'plami.
10. **Ro'yxatlarni chizishda key qo'yishdan tashqari qanday optimizatsiyalar bor?**
    - List elementlarini \`React.memo\` bilan o'rash va agar list juda katta bo'lsa virtualizatsiya ishlatish.
11. **CSS content-visibility ro'yxatlar renderiga qanday yordam beradi?**
    - Ekranda ko'rinmaydigan pastki qatorlarni brauzer darajasida chizishni cheklab tezlashtiradi.
12. **Virtual DOM ro'yxat key yordamida qanday ishlaydi?**
    - React kalitlar ro'yxatini solishtirib, qaysi ID o'chgan bo'lsa faqat o'shani DOM-dan olib tashlaydi, qolganlarini siljitadi xolos.`,
    exercises: [
    {
      id: 1,
      title: "Unikal Key Tekshiruvi",
      instruction: "Ro'yxat elementlari React-da render bo'lishi uchun ularning tarkibida `key` xossasi (unikal ID) borligini tekshiradigan `validateKeys(elements)` funksiyasini yozing (barchasida bo'lsa true, kamida bittasida yo'q bo'lsa false).",
      startingCode: "function validateKeys(elements) {\n  // every orqali tekshiring\n}",
      hint: "return elements.every(el => el.key !== undefined && el.key !== null);",
      test: "if (typeof validateKeys !== 'function') return 'validateKeys topilmadi'; if(validateKeys([{id: 1, key: 'a'}, {id: 2, key: 'b'}]) !== true) return 'To\\'g\\'ri keys rad etildi'; if(validateKeys([{id: 1, key: 'a'}, {id: 2}]) !== false) return 'Key yo\\'qligi aniqlanmadi'; return null;"
    },
    {
      id: 2,
      title: "React Key String Format",
      instruction: "Element kaliti (`key`) string ko'rinishida bo'lishini ta'minlovchi `formatReactKey(id)` funksiyasini yozing (masalan, `element-5`).",
      startingCode: "function formatReactKey(id) {\n  // formatlang\n}",
      hint: "return `element-${id}`;",
      test: "if (typeof formatReactKey !== 'function') return 'formatReactKey topilmadi'; if(formatReactKey(12) !== 'element-12') return 'Key formatlash xato'; return null;"
    },
    {
      id: 3,
      title: "React Children Counter",
      instruction: "React-ga o'xshash bolalar massividagi barcha elementlar sonini hisoblaydigan `countChildren(children)` funksiyasini yozing (agar array bo'lmasa 1, bo'lsa array uzunligi, null bo'lsa 0).",
      startingCode: "function countChildren(children) {\n  // Shartlarni yozing\n}",
      hint: "if (children === null || children === undefined) return 0;\nif (Array.isArray(children)) return children.length;\nreturn 1;",
      test: "if (typeof countChildren !== 'function') return 'countChildren topilmadi'; if (countChildren(null) !== 0) return 'Null uchun xato'; if (countChildren([1, 2]) !== 2) return 'Massiv uchun xato'; if (countChildren('hi') !== 1) return 'Yagona bola uchun xato'; return null;"
    }
  ],
  quizzes: [{
      id: 1,
      question: "Nega `key={Math.random()}` yozish juda yomon amaliyot hisoblanadi?",
      options: [
        "Chunki random sonlar o'zgarmasdir",
        "Har renderda yangi key yaratilib, komponent to'liq noldan o'rnatiladi va xotira yo'qoladi",
        "Faqat serverga so'rov sekinlashadi",
        "Bu JavaScript xatosiga olib keladi"
      ],
      correctAnswer: 1,
      explanation: "Kalit o'zgarganda React uning eski holatini butunlay o'chirib (unmount), noldan qayta quradi (mount), bu barcha local statelarni tozalaydi va qotishga sabab bo'ladi."
    },
    {
      id: 2,
      question: "Ro'yxatlarni chizishda qachon indeksni (`index`) key sifatida ishlatsa bo'ladi?",
      options: [
        "Doim ishlatsa bo'ladi",
        "Faqat ro'yxat statik (hech qachon tartibi o'zgarmaydigan va o'chirilmaydigan) bo'lganda",
        "Hech qachon ishlatib bo'lmaydi",
        "Faqat asinxron so'rovlarda"
      ],
      correctAnswer: 1,
      explanation: "Dinamik ro'yxatlarda indekslarni ishlatish xavfli, chunki qatorlar siljishi indekslarning yangilanishiga olib keladi."
    },
    {
      id: 3,
      question: "React-da key va ref qiymatlarini prop sifatida o'qish mumkinmi?",
      options: [
        "Ha, albatta",
        "Yo'q, u maxsus kalitlar bo'lib, React ichki hisob-kitoblar uchun ishlatadi va props-ga uzatmaydi",
        "Faqat input teglari ichida o'qish mumkin",
        "Faqat klasslarda ruxsat etilgan"
      ],
      correctAnswer: 1,
      explanation: "Ushbu qiymatlar React-ning o'ziga ajratilgan bo'lib, bolalar komponentga props sifatida o'tib bormaydi."
    },
    {
      id: 4,
      question: "React Fragment-da key qanday ishlatiladi?",
      options: [
        "Key fragmentga qo'yilmaydi",
        "Faqat `<React.Fragment key={id}>` shaklida to'liq yozilganda",
        "`< key={id}>` yozish orqali",
        "Faqat HTML class ishlatganda"
      ],
      correctAnswer: 1,
      explanation: "Fragment sintaksisining qisqa ko'rinishi (`<>`) hech qanday prop qabul qilmaydi, shuning uchun to'liq yozilishi shart."
    },
    {
      id: 5,
      question: "List rendering optimizatsiyasining eng sodda va samarali usuli qaysi?",
      options: [
        "CSS flex-direction ishlatish",
        "Elementlarni `React.memo` bilan o'rash va unikal key props qo'llash",
        "Massivni o'chirib yuborish",
        "Uni context api provayderiga ulash"
      ],
      correctAnswer: 1,
      explanation: "React.memo yordamida ro'yxat elementlari faqat props o'zgargandagina qayta chiziladi va unikal keys bilan reconciliation tezlashadi."
    },
    {
      id: 6,
      question: "Key o'zgarishi orqali komponent state-ini tozalash (Resetting state) qanday amalga oshiriladi?",
      options: [
        "setState(null) chaqirish orqali",
        "Komponentga unikal key berib, state tozalanishi kerak bo'lganda o'sha key qiymatini o'zgartirish orqali",
        "Brauzerni yangilash orqali",
        "Faqat storage o'chirilganda"
      ],
      correctAnswer: 1,
      explanation: "Komponentning kaliti o'zgarganda React eski elementni butunlay o'chirib yuborib, yangisini yaratgani uchun state ham toza noldan boshlanadi."
    },
    {
      id: 7,
      question: "Ro'yxat renderingida unikal 'key' prop-ni yozmaslik nima keltirib chiqaradi?",
      options: [
        "Sayt umuman ochilmay qoladi",
        "React standart indekslardan (index) foydalanadi, bu esa elementlar o'zgarganda UI xatoliklarga va sekinlashuvga olib keladi",
        "Faqat CSS-ga xalaqit beradi",
        "Dizayn buziladi"
      ],
      correctAnswer: 1,
      explanation: "Key bo'lmasa, React indeksni oladi. Agar elementlar o'chsa yoki surilsa, React ularni chalkashtirib qayta render qiladi."
    },
    {
      id: 8,
      question: "React-da komponentga berilgan 'key' o'zgarganda DOM elementiga nima bo'ladi?",
      options: [
        "U o'sha joyida matni o'zgaradi",
        "Eski element butunlay o'chib (unmount), noldan yangi DOM elementi (mount) yaratiladi",
        "Stili o'zgaradi",
        "LocalStorage-ga saqlanadi"
      ],
      correctAnswer: 1,
      explanation: "Key o'zgarishi React-ga bu butunlay boshqa komponent ekanligini bildiradi, eski komponent unmount bo'lib, yangi mount qilinadi."
    },
    {
      id: 9,
      question: "Nega ro'yxat tartibi o'zgaruvchan bo'lsa, `key={index + '-' + item.id}` yozish yomon amaliyot?",
      options: [
        "Chunki u juda uzun yoziladi",
        "Indeks baribir surilgani sababli, React keraksiz DOM yangilashlarini amalga oshiradi",
        "String-ni birlashtirish mumkin emas",
        "Faqat sonli kalitlar ruxsat etilgan"
      ],
      correctAnswer: 1,
      explanation: "Indeks aralashsa, tartib o'zgarganda kalitlar ham o'zgarib ketadi. Bu Virtual DOM-ga kalit qo'ymagan kabi zarar beradi."
    },
    {
      id: 10,
      question: "`React.Children.map` yordamchi metodi nima uchun foydali?",
      options: [
        "Ma'lumotlar bazasini xaritalash uchun",
        "Children props-i massiv, yagona element yoki null bo'lganda ham xatolarsiz aylanib chiqish uchun",
        "Faqat CSS-ni tekshirish uchun",
        "API chaqiruvlari uchun"
      ],
      correctAnswer: 1,
      explanation: "React-da children har xil turda kelishi mumkin. Bu metod ularni xavfsiz tsiklda aylanish imkonini beradi."
    },
    {
      id: 11,
      question: "Virtual DOM reconciliation jarayonida 'key' qanday ishlaydi?",
      options: [
        "U faqat dizayn beradi",
        "U yangi va eski Virtual DOM daraxtlari o'rtasidagi elementlarni bog'lovchi unikal ko'prik (identifikator) vazifasini bajaradi",
        "Tugmalarni ishlatish uchun kerak",
        "API javobini keshlaydi"
      ],
      correctAnswer: 1,
      explanation: "Reconciliation davrida React aynan o'sha key-li element o'zgarganmi yoki yo'qligini tekshiradi."
    },
    {
      id: 12,
      question: "1000 ta elementdan iborat ro'yxatda bitta satr o'zgarganda qolgan 999 tasi render bo'lmasligi uchun nima qilish kerak?",
      options: [
        "Context API ishlatish",
        "Ro'yxat satr komponentini `React.memo` bilan o'rab, unga unikal barqaror (stable) key berish",
        "Massivni bo'shatish",
        "Absolute positioning qo'llash"
      ],
      correctAnswer: 1,
      explanation: "React.memo props o'zgarmagan qolgan 999 ta komponentning render bo'lishini to'xtatadi."
    }
  ]
};

export const project2_weather = {
  id: 'project2_weather',
  title: '2. Ob-havo Ilovasi (useEffect, fetch)',
  content: `
# React'da Ob-havo Ilovasi: API bilan ishlash (useEffect va fetch)

Ushbu loyihada biz tashqi serverdan (API) real vaqtdagi ob-havo ma'lumotlarini qabul qilib, foydalanuvchiga ko'rsatadigan dastur yaratamiz. Biz ilgari o'rgangan \\\`useState\\\` va \\\`useEffect\\\` hook-larini amalda qanday ishlashini ko'ramiz. 

## 1. Maqsad nima?
Maqsad - foydalanuvchi ma'lum bir shahar nomini kiritganda, internet orqali o'sha shaharning hozirgi ob-havosini yuklab olib ekranda ko'rsatish. Buning uchun bizga **API** (Application Programming Interface) kerak bo'ladi.

> **O'xshatish:** API bu restorandagi ofitsiant. Siz (React dasturi) nima ovqat xohlashingizni (qaysi shaharning ob-havosi kerakligini) ofitsiantga (API) aytasiz. Ofitsiant oshxonaga (Server) boradi, ovqatni (ma'lumotni) olib, sizga qaytarib keladi.

## 2. API Key (Kalit) nima va nega kerak?
Ko'pgina ochiq API-lar xizmatlardan qancha foydalanilayotganini nazorat qilish uchun **API Key** (kalit) talab qiladi. Bu xuddi klubga kirish uchun ko'rsatiladigan ruxsatnomaga o'xshaydi. 
Loyihamizda biz ochiq ob-havo API-laridan birini (masalan, OpenWeatherMap) yoki o'quv maqsadi uchun tayyorlangan "mock" (soxta) API-ni ishlatishimiz mumkin. 

> **Qoida:** Haqiqiy loyihalarda API kalitlarini to'g'ridan-to'g'ri kod ichiga (GitHub'ga) yozmang! Ular \\\`.env\\\` fayllari kabi xavfsiz joylarda saqlanishi kerak. Ammo o'rganish paytida oddiy o'zgaruvchi sifatida ishlataveramiz.

## 3. Holatlar (States) ni to'g'ri boshqarish
Tarmoq bilan ishlash (network request) vaqt talab etadi. Shuning uchun bizda odatda **3 xil holat (state)** bo'lishi kerak:
1. **Loading (Yuklanmoqda):** Ma'lumot so'raldi, lekin hali yetib kelmadi. (Foydalanuvchiga "Kuting..." deb ko'rsatish uchun)
2. **Error (Xatolik):** Internet yo'q bo'lsa yoki shahar topilmasa xato yuz beradi. (Foydalanuvchiga "Xatolik yuz berdi" deb tushuntirish uchun)
3. **Success (Muvaffaqiyat):** Ma'lumot muvaffaqiyatli yetib keldi. (Ekranda daraja va namlikni ko'rsatish uchun)

\\\`\\\`\\\`javascript
// Olingan ob-havo ma'lumotini saqlash uchun state
const [data, setData] = useState(null);
// API dan ma'lumot yuklanayotganini bildirish uchun (true/false)
const [isLoading, setIsLoading] = useState(false);
// Xatolik yuz bersa, xato matnini saqlash uchun
const [error, setError] = useState(null);
\\\`\\\`\\\`

## 4. useEffect yordamida ma'lumot yuklash
React'da ma'lumotni tashqaridan yuklash **"Side Effect"** (qoshimcha ta'sir) hisoblanadi. Shuning uchun biz fetch operatsiyasini \\\`useEffect\\\` ichida bajaramiz.

**Mermaid diagrammasi: Komponent va API o'rtasidagi aloqa**

\\\`\\\`\\\`mermaid
sequenceDiagram
    participant C as React Komponent
    participant E as useEffect
    participant A as Ob-havo API
    C->>E: "Komponent ekranga chiqdi (Mount)"
    E->>C: "isLoading = true"
    E->>A: "Toshkent ob-havosi qanday?"
    alt Muvaffaqiyatli holat
        A-->>E: "JSON: { temp: 25, condition: 'Sunny' }"
        E->>C: "setData(JSON), isLoading = false"
    else Xatolik holati
        A-->>E: "404 Not Found"
        E->>C: "setError('Shahar topilmadi'), isLoading = false"
    end
\\\`\\\`\\\`

**Do's and Don'ts:**
- **QILISH KERAK:** \\\`useEffect\\\` ichida asinxron so'rovlar yuborayotganda try/catch dan foydalaning va doim error holatini ushlang.
- **QILISH KERAK:** Qidiruv maydoni (input) o'zgarganda API ga to'xtovsiz so'rov yubormaslik uchun (debounce) qo'llang yoki faqat "Qidirish" tugmasi bosilganda so'rov yuboring.
- **QILMASLIK KERAK:** \\\`useEffect\\\` ichida funksiyani to'g'ridan-to'g'ri \\\`async\\\` qilib belgilamang. Uning ichida alohida \\\`async\\\` funksiya yaratib, keyin uni chaqiring.

\\\`\\\`\\\`javascript
// YOMON USUL (Bunday qilmang)
// useEffect ichiga to'g'ridan-to'g'ri async yozish xato,
// chunki u tozalash (cleanup) funksiyasini qaytarishi kerak.
useEffect(async () => {
  const res = await fetch('...'); // XATO
}, []);

// YAXSHI USUL (To'g'ri yo'l)
// useEffect ichida alohida async funksiya yaratiladi
// va u shu yerning o'zida chaqiriladi.
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('...'); // API dan ma'lumot kutish
  };
  fetchData(); // Yaratilgan async funksiyani ishga tushirish
}, []); // Bo'sh massiv - faqat komponent ekranga chiqqanda 1 marta ishlaydi
\\\`\\\`\\\`
  `,
  code: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  // Qidirilayotgan shahar nomini saqlash uchun state
  const [city, setCity] = useState('Tashkent');
  // API dan kelgan ob-havo ma'lumotini saqlash uchun state
  const [weather, setWeather] = useState(null);
  
  // Bu yerda useEffect yordamida fetch yoziladi (API so'rovi)
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Ob-havo Ilovasi</h1>
      {/* Foydalanuvchi shahar nomini kiritadigan maydon */}
      <input 
        value={city} // Input qiymati city state'iga bog'langan
        onChange={(e) => setCity(e.target.value)} // Har bir o'zgarishda city yangilanadi
        placeholder="Shahar nomini kiriting"
      />
      <button>Qidirish</button>
      
      <div style={{ marginTop: '20px' }}>
        {/* Natija shu yerda ko'rsatiladi */}
        <p>Hozircha ma'lumot yo'q</p>
      </div>
    </div>
  );
}
`,
  exercises: [
    {
      id: 1,
      title: 'State qatorlarini yaratish',
      description: 'Ob-havo ma\'lumotini yuklash jarayonini boshqarish uchun `isLoading` va `error` state\'larini qo\'shing. Dastlabki qiymatlar: `isLoading` uchun `false`, `error` uchun `null` bo\'lsin.',
      startingCode: `import React, { useState } from 'react';

export default function WeatherApp() {
  // Shahar nomi uchun state
  const [city, setCity] = useState('Tashkent');
  // Ob-havo ma'lumotlarini saqlash uchun state
  const [weather, setWeather] = useState(null);
  // YOUR CODE HERE (Sizning kodingiz shu yerda)
  
  return <div>Weather App</div>;
}`,
      solution: `import React, { useState } from 'react';

export default function WeatherApp() {
  // Shahar nomi va ob-havo ma'lumoti holatlari
  const [city, setCity] = useState('Tashkent');
  const [weather, setWeather] = useState(null);
  
  // Yuklanish jarayonini bildirish uchun state (boshida false)
  const [isLoading, setIsLoading] = useState(false);
  // Xatolikni saqlash uchun state (boshida null)
  const [error, setError] = useState(null);
  
  return <div>Weather App</div>;
}`,
      hint: '\`useState(false)\` va \`useState(null)\` dan foydalaning.'
    },
    {
      id: 2,
      title: 'Oddiy useEffect va fetch tuzilishi',
      description: 'Komponent birinchi marta ekranga chiqqanda "Tashkent" uchun mock ma\'lumot yuklash funksiyasini yozing. `useEffect` ichida `fetchWeather` degan async funksiya yarating va uni chaqiring.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  // Ob-havoni saqlash uchun state
  const [weather, setWeather] = useState(null);
  
  // YOUR CODE HERE (Sizning kodingiz shu yerda)
  
  return <div>App</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  
  // useEffect orqali API so'rovini boshqarish
  useEffect(() => {
    // Asinxron ma'lumot olish funksiyasi
    const fetchWeather = async () => {
      // kelajakda fetch qilinadi
    };
    fetchWeather(); // Funksiyani ishga tushirish
  }, []); // Bo'sh massiv: faqat komponent yaratilganda ishlaydi
  
  return <div>App</div>;
}`,
      hint: '\`useEffect\` ga bo\'sh array \`[]\` bering. Ichida \`const fetchWeather = async () => {}\` yarating va pastida chaqiring.'
    },
    {
      id: 3,
      title: 'Loading holatini yoqish va o\'chirish',
      description: '\`fetchWeather\` funksiyasi boshlanganda \`isLoading\` ni \`true\` qiling, tugaganda (hozircha faqat \`console.log("tugadi")\` qiling) esa \`false\` qiling. try/finally blokidan foydalaning.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  // Yuklanish holatini bildiruvchi state
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchWeather = async () => {
      // YOUR CODE HERE (Sizning kodingiz shu yerda)
    };
    fetchWeather();
  }, []);
  
  return <div>App</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true); // Yuklanishni boshlash
        console.log("tugadi");
      } finally {
        // Natija qanday bo'lishidan qat'iy nazar yuklanishni to'xtatish
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, []);
  
  return <div>App</div>;
}`,
      hint: '\`setIsLoading(true)\` ni boshida yozing, so\'ng \`try { ... } finally { setIsLoading(false) }\` dan foydalaning.'
    },
    {
      id: 4,
      title: 'Haqiqiy fetch bilan ulash',
      description: '\`fetchWeather\` ichida \`https://api.mockweather.com/v1/Tashkent\` URL iga fetch orqali so\'rov yuboring, uni json ga o\'giring va \`setWeather\` orqali saqlang.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      // YOUR CODE HERE (Sizning kodingiz shu yerda)
    };
    fetchWeather();
  }, []);
  
  return <div>App</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  // Ob-havo ma'lumoti state-i
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      // API manziliga so'rov yuborish va kutish
      const response = await fetch('https://api.mockweather.com/v1/Tashkent');
      // Kelgan javobni JSON formatiga o'tkazish
      const data = await response.json();
      // Olingan ma'lumotni state-ga saqlash
      setWeather(data);
    };
    fetchWeather();
  }, []); // Komponent ekranga chiqqanda bir marta ishlaydi
  
  return <div>App</div>;
}`,
      hint: '\`const response = await fetch("...");\` so\'ng \`await response.json();\`.'
    },
    {
      id: 5,
      title: 'Xatolikni (error) ushlash',
      description: 'Agar API ishlamasa yoki noto\'g\'ri manzil bo\'lsa xato keladi. \`try...catch\` blokidan foydalanib, xato yuz bersa \`setError(err.message)\` deb holatni yangilang.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null); // Xatolik holati
  
  useEffect(() => {
    const fetchWeather = async () => {
      // YOUR CODE HERE (Sizning kodingiz shu yerda)
    };
    fetchWeather();
  }, []);
  
  return <div>App</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // API ga so'rov yuborish
        const response = await fetch('https://api.mockweather.com/v1/Tashkent');
        // Agar javob muvaffaqiyatli bo'lmasa (masalan 404), o'zimiz xato otdiramiz
        if (!response.ok) {
          throw new Error('Ma\'lumotni yuklashda xatolik');
        }
        // Javobni JSON qilib o'qish
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        // Try ichida yuz bergan har qanday xatolik ushlanadi va state-ga yoziladi
        setError(err.message);
      }
    };
    fetchWeather();
  }, []);
  
  return <div>App</div>;
}`,
      hint: '\`try { ... if (!response.ok) throw new Error(...) ... } catch (err) { setError(err.message) }\`'
    },
    {
      id: 6,
      title: 'UI ni holatlarga qarab ko\'rsatish',
      description: '\`isLoading\` true bo\'lsa \`<p>Yuklanmoqda...</p>`, \`error\` bo\'lsa \`<p>Xato: {error}</p>`, aks holda ob-havo holatini chiqaring.',
      startingCode: `import React from 'react';

export default function WeatherApp({ isLoading, error, weather }) {
  // YOUR CODE HERE (Sizning kodingiz shu yerda)
  // isLoading va error qiymatlariga qarab shartli qaytarish (return) qiling
  
  return (
    <div>
      <p>Weather data</p>
    </div>
  );
}`,
      solution: `import React from 'react';

// Props orqali holatlarni qabul qilib olamiz
export default function WeatherApp({ isLoading, error, weather }) {
  // Agar yuklanish jarayoni bo'lsa, foydalanuvchiga xabar beramiz
  if (isLoading) return <div><p>Yuklanmoqda...</p></div>;
  // Agar xatolik bo'lsa, xatoni ko'rsatamiz
  if (error) return <div><p>Xato: {error}</p></div>;
  
  // Agar ma'lumot muvaffaqiyatli kelgan bo'lsa, haroratni ko'rsatamiz
  return (
    <div>
      {weather ? <p>Havo harorati: {weather.temp}C</p> : <p>Ma\'lumot yo\'q</p>}
    </div>
  );
}`,
      hint: 'if operatorlaridan foydalanib return qiling yoki JSX ichida uchlik (ternary) operator qo\'llang.'
    },
    {
      id: 7,
      title: 'Shahar nomi o\'zgarganda fetch qilish',
      description: 'Biz ma\'lumotni doim "Tashkent" emas, balki \`city\` state dagi qiymat bo\'yicha qidirishimiz kerak. fetch() ichidagi stringni o\'zgartiring va useEffect dependency qatoriga city ni qo\'shing.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp({ city }) {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      // Tashkent o'rniga city prop'ini ishlating
      const response = await fetch('https://api.mockweather.com/v1/Tashkent');
      const data = await response.json();
      setWeather(data);
    };
    fetchWeather();
  }, []); // <-- YOUR CODE HERE (city'ni bu yerga qo'shing)
  
  return <div>App</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp({ city }) {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      // city o'zgaruvchisi yordamida dinamik URL yaratish (template literal)
      const response = await fetch(\`https://api.mockweather.com/v1/\${city}\`);
      const data = await response.json();
      setWeather(data);
    };
    fetchWeather();
  // city o'zgarganida useEffect qayta ishga tushishi uchun massivga qo'shamiz
  }, [city]);
  
  return <div>App</div>;
}`,
      hint: 'Fetch URL ini template literal (\`\${city}\`) qiling. useEffect ning ikkinchi argumentiga \`[city]\` ni qo\'ying.'
    },
    {
      id: 8,
      title: 'Qidiruv tugmasiga bog\'lash',
      description: 'Foydalanuvchi har harf yozganda so\'rov ketmasligi uchun biz \`searchCity\` degan alohida state ochib, faqat tugma bosilganda uni yangilashimiz kerak. Kodni shunday o\'zgartiringki, input \`inputCity\` ga bog\'lansin, useEffect esa \`searchCity\` ga bog\'lansin.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [inputCity, setInputCity] = useState('');
  const [searchCity, setSearchCity] = useState('Tashkent');
  const [weather, setWeather] = useState(null);

  // useEffect shunday yozilsinki, faqat searchCity o'zgarganda ishlasin
  // YOUR CODE HERE (Sizning kodingiz)

  const handleSearch = () => {
    // YOUR CODE HERE (Sizning kodingiz)
  };

  return <div>App</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  // Inputdagi yozuvni saqlash uchun
  const [inputCity, setInputCity] = useState('');
  // Qidirish uchun jo'natiladigan shahar nomi (tugma bosilganda yangilanadi)
  const [searchCity, setSearchCity] = useState('Tashkent');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(\`https://api.mockweather.com/v1/\${searchCity}\`);
      const data = await response.json();
      setWeather(data);
    };
    fetchWeather();
  // Effect faqat searchCity o'zgargandagina ishlaydi
  }, [searchCity]);

  // Tugma bosilganda ishlaydigan funksiya
  const handleSearch = () => {
    setSearchCity(inputCity); // Asosiy qidiruv stateni yangilaymiz
  };

  return <div>App</div>;
}`,
      hint: '\`useEffect\` dependency array iga \`searchCity\` ni qo\'shing. \`handleSearch\` ichida \`setSearchCity(inputCity)\` ni yozing.'
    },
    {
      id: 9,
      title: 'Eski natijani tozalash',
      description: 'Yangi qidiruv boshlanganda, ekranda eski shaharning ma\'lumoti turmasligi kerak. \`fetchWeather\` boshida avvalgi xatolarni (\`setError(null)\`) va avvalgi ma\'lumotni (\`setWeather(null)\`) tozalang.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      // YOUR CODE HERE (Eski ma'lumotlarni tozalang)
      
      try {
        const response = await fetch('https://api.mockweather.com/v1/Tashkent');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError('Xato');
      }
    };
    fetchWeather();
  }, []);
  
  return <div>App</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      // Yangi so'rov boshlanishidan oldin eski natija va xatolarni tozalaymiz
      setWeather(null);
      setError(null);
      
      try {
        const response = await fetch('https://api.mockweather.com/v1/Tashkent');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError('Xato');
      }
    };
    fetchWeather();
  }, []);
  
  return <div>App</div>;
}`,
      hint: 'try blokidan oldin \`setWeather(null)\` va \`setError(null)\` ni yozing.'
    },
    {
      id: 10,
      title: 'Barchasini birlashtirish (To\'liq kod)',
      description: 'Biz ishlagan hamma narsani birlashtiring: \`searchCity\` ga qarab ma\'lumot olib keluvchi, loading va error statelarini boshqaruvchi to\'liq useEffect ni yozing.',
      startingCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp({ searchCity }) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // YOUR CODE HERE (To'liq fetch mantiqini yozing)

  return <div>Weather is ready</div>;
}`,
      solution: `import React, { useState, useEffect } from 'react';

export default function WeatherApp({ searchCity }) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Agar shahar nomi kiritilmagan bo'lsa, so'rov yubormaymiz
    if (!searchCity) return;
    
    const fetchWeather = async () => {
      // Dastlabki holatlarni tozalash va yuklanishni boshlash
      setWeather(null);
      setError(null);
      setIsLoading(true);
      
      try {
        // API so'rovi
        const res = await fetch(\`https://api.mockweather.com/v1/\${searchCity}\`);
        if (!res.ok) throw new Error("Shahar topilmadi"); // 404 yoki xatolarni ushlash
        
        const data = await res.json(); // JSON ga o'tkazish
        setWeather(data); // Natijani saqlash
      } catch (err) {
        setError(err.message); // Xatoni saqlash
      } finally {
        setIsLoading(false); // Har qanday holatda yuklanishni to'xtatish
      }
    };
    
    fetchWeather(); // Funksiyani chaqirish
  }, [searchCity]); // Qachonki searchCity o'zgarsa ishlaydi

  return <div>Weather is ready</div>;
}`,
      hint: 'Barcha statelarni ketma-ket yangilash tartibiga rioya qiling. useEffect dependency sifatida \`searchCity\` ni unutmang.'
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Tashqi API dan ma'lumot yuklash React komponentning qaysi joyida bajariladi?",
      options: [
        "To'g'ridan-to'g'ri render funksiyasi ichida",
        "useEffect Hook ichida",
        "useState hook parametrida",
        "Komponentdan tashqarida global darajada"
      ],
      correctAnswer: 1,
      explanation: "Tashqi API dan ma'lumot olish bu Side Effect bo'lib, ular doim useEffect ichida bajarilishi kerak."
    },
    {
      id: 2,
      question: "Fetch so'rovi davomida foydalanuvchiga 'Yuklanmoqda...' xabarini ko'rsatish uchun odatda nima ishlatiladi?",
      options: [
        "alert('Yuklanmoqda')",
        "isLoading state (holati)",
        "CSS animatsiya",
        "setTimeout funksiyasi"
      ],
      correctAnswer: 1,
      explanation: "isLoading deb atalgan boolean state ochiladi va u true bo'lganda ekranda yuklanish jarayoni ko'rsatiladi."
    },
    {
      id: 3,
      question: "Agar useEffect ning ikkinchi argumenti bo'sh array [] bo'lsa, u qachon ishlaydi?",
      options: [
        "Faqat komponent birinchi marta ekranga chiqqanda (mount)",
        "Har safar komponent yangilanganda (render)",
        "Hech qachon ishlamaydi",
        "Komponent ekrandan o'chayotganda"
      ],
      correctAnswer: 0,
      explanation: "Bo'sh dependency array [] effect faqat bir marta – dastlabki render paytida ishga tushishini kafolatlaydi."
    },
    {
      id: 4,
      question: "Nima sababdan useEffect ga to'g'ridan-to'g'ri async funksiya berish mumkin emas?",
      options: [
        "Chunki async funksiyalar Promise qaytaradi, useEffect esa tozalash (cleanup) funksiyasini qaytarishi kerak",
        "Chunki React asinxron dasturlashni qo'llab-quvvatlamaydi",
        "Chunki async ishlatganda useEffect 2 marta ishlab ketadi",
        "Buning hech qanday sababi yo'q, berish mumkin"
      ],
      correctAnswer: 0,
      explanation: "React kutganidek useEffect faqatgina cleanup funksiya qaytarishi mumkin. Async funksiyalar esa avtomatik Promise qaytaradi."
    },
    {
      id: 5,
      question: "Fetch so'rovida qanday qilib kelgan javobni JSON formatiga o'tkazamiz?",
      options: [
        "JSON.parse(response)",
        "response.json()",
        "response.toJSON()",
        "response.data"
      ],
      correctAnswer: 1,
      explanation: "Fetch API da javob obyekti o'z ichiga .json() asinxron metodini oladi."
    },
    {
      id: 6,
      question: "Agar fetch dagi tarmoq so'rovi (URL) noto'g'ri bo'lsa va 404 qaytsa, fetch avtomatik Error otadimi?",
      options: [
        "Ha, doim error otadi",
        "Yo'q, fetch faqatgina tarmoq uzilishi kabi qattiq xatolarda catch ga o'tadi. 404 xatolarida o'zimiz response.ok ni tekshirishimiz kerak.",
        "Qisman to'g'ri",
        "404 da doim dastur qotib qoladi"
      ],
      correctAnswer: 1,
      explanation: "Fetch API ning o'ziga xos xususiyati shundaki, u HTTP xatoliklarida catch ga kirmaydi, shuning uchun !response.ok orqali tekshirish kerak."
    },
    {
      id: 7,
      question: "Qidiruv (Search) qatoriga har safar harf yozilganda API ga so'rov ketmasligi uchun nima qilish kerak?",
      options: [
        "useEffect ga dependency yozmaslik kerak",
        "Alohida searchCity state ochib, faqat tugma bosilganda o'zgartirish kerak (yoki debounce ishlatish kerak)",
        "So'rovlarni try catch siz yozish kerak",
        "Buni React o'zi avtomatik to'g'rilaydi"
      ],
      correctAnswer: 1,
      explanation: "Har bir klaviatura bosilishida so'rov ketishining oldini olish uchun debouncing yoki faqat tugma bosilganda yangilanadigan holat ishlatiladi."
    },
    {
      id: 8,
      question: "finally blogining asosiy vazifasi nima?",
      options: [
        "Xatolarni qayta ishlash",
        "Try va Catch dan qat'iy nazar eng oxirida aniq bir kodni (masalan setIsLoading(false)) bajarish",
        "Dasturni to'xtatish",
        "Ma'lumotni JSON ga o'girish"
      ],
      correctAnswer: 1,
      explanation: "finally qismi try muvaffaqiyatli bo'lsa ham, catch ishlasa ham, albatta bajariladi. Bu loading holatini o'chirish uchun qulay."
    },
    {
      id: 9,
      question: "Agar foydalanuvchi qidirgan shahar topilmasa, komponent ekranda nima ko'rsatishi to'g'riroq?",
      options: [
        "Ekranni oq qilib qo'yish",
        "Dasturni crash qildirish",
        "Foydalanuvchiga do'stona xato xabarini ko'rsatish (Masalan: Shahar topilmadi)",
        "Hech narsa bo'lmagandek turish"
      ],
      correctAnswer: 2,
      explanation: "UX (Foydalanuvchi tajribasi) qoidalariga ko'ra, har doim xatolik haqida aniq ma'lumot berilishi kerak."
    },
    {
      id: 10,
      question: "Bir useEffect ichida qachon cleanup (tozalash) funksiyasi ishlatiladi?",
      options: [
        "Faqat fetch ishlatganda",
        "Agar biz event listener yoki setTimeout qo'shgan bo'lsak va uni tozalash kerak bo'lsa",
        "Har safar komponent mount bo'lganda",
        "Cleanup faqat React 15 da bor edi"
      ],
      correctAnswer: 1,
      explanation: "Cleanup funksiya qoldiq resurslarni (taymerlar, obunalar) tozalash uchun ishlatiladi."
    },
    {
      id: 11,
      question: "Komponent dependency array ga [city] uzatilsa, useEffect qachon trigger bo'ladi?",
      options: [
        "Faqat city holati o'zgarganda (va dastlabki renderda)",
        "Har qanday state o'zgarganda",
        "Faqat komponent o'chirilganda",
        "Hech qachon"
      ],
      correctAnswer: 0,
      explanation: "Dependency array qatoridagi o'zgaruvchilar oldingi renderdagidan farq qilsagina useEffect qayta ishga tushadi."
    },
    {
      id: 12,
      question: "Nega ob-havo API kalitlarini (API Key) mijoz tomondagi (client-side) kod ichiga ochiq yozish xavfli?",
      options: [
        "Chunki kalit ishlashini sekinlashtiradi",
        "Xakerlar kalitni o'g'irlab, sizning nomingizdan so'rovlar yuborishi va limitni tugatib yoki pul yechishi mumkin",
        "API kaliti faqat serverlarda ishlaydi",
        "Bu umuman xavfli emas"
      ],
      correctAnswer: 1,
      explanation: "Client-side (Brauzer) da yozilgan har qanday kodni boshqalar ko'ra oladi, shuning uchun maxfiy kalitlarni frontendga ochiq qo'ymaslik tavsiya etiladi."
    }
  ]
};

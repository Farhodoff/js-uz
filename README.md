# JS Academy 🎓

JavaScript dasturlash tilini **o'zbek tilida** noldan boshlab bosqichma-bosqich o'rganish uchun interaktiv platforma. [roadmap.sh/javascript](https://roadmap.sh/javascript) yo'l xaritasi asosida tuzilgan.

## ✨ Xususiyatlar

- 📚 **280+ interaktiv dars** — JS asoslaridan Professional darajagacha, qo'shimcha React, Node.js, TypeScript, SQL, Algoritmlar, System Design yo'nalishlari
- 💻 **Live kod editor** — brauzerda kod yozib, avtomatik testlar bilan tekshirish
- 📝 **Har bir darsda** — nazariya + 10 amaliy mashq + 12 test savoli
- 🏆 **900+ challenges** — qo'shimcha mashq banki
- 🤖 **AI yordamchi** — DeepSeek orqali o'zbek tilida javob olish
- 📊 **Progress tracking** — har bir dars holati saqlanadi
- 📱 **PWA + Responsive** — mobil qurilmalarda ham ishlaydi

## 🏗️ Texnologiyalar

| Texnologiya | Maqsad |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router | Client-side routing |
| Monaco Editor | Kod editor |
| ReactMarkdown | Markdown rendering |
| Mermaid | Diagrammalar |
| Zustand | State + progress (localStorage) |
| DeepSeek API | AI yordamchi |
| Vercel | Hosting & Serverless |

## 🚀 O'rnatish

```bash
# Repo'ni klonlash
git clone https://github.com/Farhodoff/js-uz.git
cd js-uz

# Dependency'lar o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env
# DEEPSEEK_API_KEY ni .env faylga yozing

# Development serverni ishga tushirish
npm run dev

# Testlar va build
npm test
npm run build
```

## 📁 Loyiha Tuzilmasi

```
src/
├── components/         # React komponentlar (Sidebar, TheoryTab, PracticeTab, QuizTab, ...)
├── hooks/              # useLesson, useCodeRunner, useAI, useResizable
├── store/              # Zustand store (progress localStorage'da)
├── workers/            # Kod runner Web Worker (cheksiz sikl himoyasi bilan)
├── utils/              # loopGuard va boshqa yordamchi utillar
└── data/
    ├── curriculum.js       # JavaScript yo'nalishi (bo'limlar + darslar ro'yxati)
    ├── reactCurriculum.js  # React yo'nalishi
    ├── challenges.js       # 900+ challenges banki
    └── lessons/            # Dars kontentlari
        ├── beginner/ ... advanced/   # JS asosiy yo'nalishi
        ├── react/, react-projects/   # React yo'nalishi
        ├── nodejs/, typescript/, sql/, algorithms/,
        │  system-design/, ecosystem/, soft-skills/,
        │  projects/, challenges/     # Qo'shimcha yo'nalishlar
api/
└── chat.js             # Vercel serverless (DeepSeek proxy)
```

## 📝 Litsenziya

MIT

# JS Academy 🎓

JavaScript dasturlash tilini **o'zbek tilida** bosqichma-bosqich o'rganish uchun interaktiv platforma.

## ✨ Xususiyatlar

- 📚 **57+ interaktiv dars** — boshlang'ichdan ilg'orgacha
- 💻 **Live kod editor** — brauzerda kodni yozib tekshirish
- 🤖 **AI yordamchi** — Gemini orqali o'zbek tilida javob olish
- 📊 **Progress tracking** — har bir dars holati saqlanadi
- 🎨 **Premium dark UI** — zamonaviy dizayn
- 📱 **Responsive** — mobil qurilmalarda ham ishlaydi

## 🏗️ Texnologiyalar

| Texnologiya | Maqsad |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router | Client-side routing |
| CodeMirror | Kod editor |
| ReactMarkdown | Markdown rendering |
| Mermaid | Diagrammalar |
| Gemini API | AI yordamchi |
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
# GEMINI_API_KEY ni .env faylga yozing

# Development serverni ishga tushirish
npm run dev
```

## 📁 Loyiha Tuzilmasi

```
src/
├── components/       # React komponentlar
│   ├── icons/        # SVG icon komponentlar
│   ├── Sidebar.jsx   # Darslar navigatsiyasi
│   ├── Header.jsx    # Sahifa sarlavhasi
│   ├── TheoryTab.jsx # Nazariya paneli
│   ├── PracticeTab.jsx # Amaliyot paneli
│   ├── AiTab.jsx     # AI yordamchi
│   └── Mermaid.jsx   # Mermaid diagramma
├── hooks/            # Custom React hooklar
│   ├── useProgress.js  # localStorage progress
│   ├── useCodeRunner.js # Kod bajarish
│   ├── useAI.js        # AI integratsiya
│   └── useLesson.js    # Dars navigatsiya + router
├── data/
│   ├── curriculum.js   # Darslar ro'yxati
│   └── lessons/        # Dars kontentlari
│       ├── beginner/
│       ├── intermediate/
│       ├── advanced/
│       └── projects/
├── App.jsx           # Asosiy komponent
├── main.jsx          # Entry point
└── index.css         # Global CSS design system
api/
└── chat.js           # Vercel serverless (Gemini proxy)
```

## 📝 Litsenziya

MIT

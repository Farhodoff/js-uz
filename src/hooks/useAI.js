import { useState, useCallback } from 'react';

export function useAI() {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const askAI = useCallback(async (lessonTitle, activeCode = '') => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer('');
    
    try {
      const apiKey = localStorage.getItem('gemini_api_key');
      
      if (!apiKey) {
        setAiAnswer("⚠️ Kechirasiz, AI dan foydalanish uchun pastdagi maydonga o'zingizning bepul **Gemini API Key** kalitingizni kiriting. U faqat shu brauzerda xavfsiz saqlanadi.");
        setAiLoading(false);
        return;
      }

      const promptText = `Siz o'zbek tilida gaplashadigan JS-UZ dasturlash platformasining dasturlash bo'yicha yordamchisisiz. Foydalanuvchiga qisqa va aniq javob bering.
Dars mavzusi: ${lessonTitle || 'Umumiy'}
Foydalanuvchi kodi:
\`\`\`javascript
${activeCode}
\`\`\`
Savol: ${aiQuestion}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      
      setAiAnswer(data.candidates[0].content.parts[0].text || "Javob olinmadi.");
      
    } catch (e) {
      setAiAnswer("❌ AI ishga tushishida xatolik: " + e.message);
    }
    
    setAiLoading(false);
  }, [aiQuestion]);

  const clearAnswer = useCallback(() => {
    setAiAnswer('');
    setAiQuestion('');
  }, []);

  return { aiQuestion, setAiQuestion, aiAnswer, aiLoading, askAI, clearAnswer };
}

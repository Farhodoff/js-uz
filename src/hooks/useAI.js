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
      const isWindowAiAvailable = window.ai && (window.ai.languageModel || window.ai.createTextSession);
      
      if (!isWindowAiAvailable && !apiKey) {
        setAiAnswer("⚠️ Kechirasiz, sizning brauzeringizda lokal AI ishlamayapti.\n\nIltimos, ishlatish uchun pastdagi maydonga shaxsiy **Gemini API Key** kiritib saqlang (U faqat sizning brauzeringizda saqlanadi).");
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

      if (isWindowAiAvailable) {
        let session;
        if (window.ai.languageModel) {
          session = await window.ai.languageModel.create();
        } else {
          session = await window.ai.createTextSession();
        }
        const response = await session.prompt(promptText);
        setAiAnswer(response || "Javob olinmadi.");
      } else if (apiKey) {
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
      }
      
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

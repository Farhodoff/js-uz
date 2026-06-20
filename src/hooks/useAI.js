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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: aiQuestion,
          lesson: lessonTitle || 'Umumiy',
          code: activeCode
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAiAnswer(data.answer || 'Javob olinmadi.');
      } else {
        setAiAnswer(data.error || 'Xatolik yuz berdi.');
      }
    } catch (e) {
      setAiAnswer('Tarmoq xatosi: ' + e.message);
    }
    setAiLoading(false);
  }, [aiQuestion]);

  const clearAnswer = useCallback(() => {
    setAiAnswer('');
    setAiQuestion('');
  }, []);

  return { aiQuestion, setAiQuestion, aiAnswer, aiLoading, askAI, clearAnswer };
}

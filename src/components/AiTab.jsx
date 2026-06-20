import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default function AiTab({ aiQuestion, setAiQuestion, askAI, aiLoading, aiAnswer }) {
  return (
    <div>
      <div className="ai-description">
        🤖 JavaScript bo'yicha har qanday savolingizni bering — o'zbek tilida javob olasiz.
      </div>
      <textarea
        className="ai-textarea"
        value={aiQuestion}
        onChange={e => setAiQuestion(e.target.value)}
        placeholder="Masalan: Promise va async/await farqi nima?"
        onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) askAI(); }}
        aria-label="AI ga savol yozing"
      />
      <button
        className="btn btn-primary"
        onClick={askAI}
        disabled={aiLoading}
        style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}
      >
        {aiLoading ? (
          <>
            <span className="loading-dots">
              <span></span><span></span><span></span>
            </span>
            Javob tayyorlanmoqda...
          </>
        ) : (
          '📨 Savol yuborish'
        )}
      </button>
      {aiAnswer && (
        <div className="ai-answer">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {aiAnswer}
          </ReactMarkdown>
        </div>
      )}
      
      {(!window.ai || (!window.ai.languageModel && !window.ai.createTextSession)) && (
        <div style={{ marginTop: 20, padding: 15, background: 'rgba(0,0,0,0.2)', borderRadius: 8, fontSize: 14 }}>
          <div style={{ marginBottom: 8, color: '#f1c40f', fontWeight: 'bold' }}>Gemini API Kaliti (Ixtiyoriy)</div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 10, fontSize: 12 }}>
            Sizda lokal AI ishlamayapti. O'zingizning bepul Gemini API kalitingizni kiritib ishlating. U faqat shu brauzerda saqlanadi.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              type="password" 
              id="gemini_api_key_input"
              placeholder="AIzaSy..." 
              defaultValue={localStorage.getItem('gemini_api_key') || ''}
              style={{ flex: 1, padding: '8px 12px', borderRadius: 4, border: '1px solid var(--border-primary)', background: 'var(--bg-primary)', color: 'white' }}
            />
            <button 
              className="btn btn-secondary"
              onClick={() => {
                const val = document.getElementById('gemini_api_key_input').value;
                if(val) {
                  localStorage.setItem('gemini_api_key', val);
                  alert("Kalit saqlandi! Endi savol yuborishingiz mumkin.");
                } else {
                  localStorage.removeItem('gemini_api_key');
                  alert("Kalit o'chirildi.");
                }
              }}
            >Saqlash</button>
          </div>
        </div>
      )}
    </div>
  );
}

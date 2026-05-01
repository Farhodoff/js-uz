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
    </div>
  );
}

import React from 'react';

export default function AiTab({ aiQuestion, setAiQuestion, askAI, aiLoading, aiAnswer }) {
  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ background: "#201a12", border: "1px solid #3a2e1e", borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 13, color: "#8a7a5a" }}>
        🤖 JavaScript bo'yicha har qanday savolingizni bering — o'zbek tilida javob olasiz.
      </div>
      <textarea
        value={aiQuestion}
        onChange={e => setAiQuestion(e.target.value)}
        placeholder="Masalan: Promise va async/await farqi nima?"
        style={{ width: "100%", height: 100, background: "#0f0c08", color: "#e8d5b0", border: "1px solid #3a2e1e", borderRadius: 8, padding: 14, fontFamily: "inherit", fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box" }}
        onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) askAI(); }}
      />
      <button onClick={askAI} disabled={aiLoading} style={{ marginTop: 10, padding: "10px 24px", background: aiLoading ? "#3a2e1e" : "#c8a96e", color: "#1a1510", border: "none", borderRadius: 8, fontWeight: 700, cursor: aiLoading ? "not-allowed" : "pointer", fontSize: 14 }}>
        {aiLoading ? "⏳ Javob tayyorlanmoqda..." : "📨 Savol yuborish"}
      </button>
      {aiAnswer && (
        <div style={{ marginTop: 16, background: "#1a1f2a", border: "1px solid #2a3a5a", borderRadius: 10, padding: 20, fontSize: 14, color: "#c8d8f0", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {aiAnswer}
        </div>
      )}
    </div>
  );
}

import React from 'react';

export default function PracticeTab({ code, setCode, runCode, showHint, setShowHint, activeLesson, output, outputRef }) {
  if (!activeLesson) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        style={{ width: "100%", height: 240, background: "#0f0c08", color: "#c8e6c9", border: "1px solid #3a2e1e", borderRadius: 8, padding: 16, fontFamily: "monospace", fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }}
        spellCheck={false}
      />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={runCode} style={{ padding: "10px 24px", background: "#c8a96e", color: "#1a1510", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>▶ Ishlatish</button>
        <button onClick={() => setShowHint(!showHint)} style={{ padding: "10px 18px", background: "#2a2015", color: "#c8a96e", border: "1px solid #c8a96e", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>💡 Maslahat</button>
        <button onClick={() => { setCode(activeLesson.task); }} style={{ padding: "10px 18px", background: "#2a2015", color: "#8a7a5a", border: "1px solid #3a2e1e", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>↺ Qayta boshlash</button>
      </div>
      {showHint && (
        <div style={{ background: "#1a1f12", border: "1px solid #4a6a3a", borderRadius: 8, padding: 14, fontSize: 12, color: "#a8c88a", fontFamily: "monospace" }}>
          💡 {activeLesson.hint}
        </div>
      )}
      {output && (
        <div ref={outputRef} style={{ background: "#0a0f08", border: "1px solid #2a3a2a", borderRadius: 8, padding: 14, fontFamily: "monospace", fontSize: 13, color: output.includes("❌") ? "#ff8a80" : "#a8d8a0", whiteSpace: "pre-wrap", minHeight: 60 }}>
          {output}
        </div>
      )}
    </div>
  );
}

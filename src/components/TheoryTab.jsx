import React from 'react';

export default function TheoryTab({ activeLesson, setTab, sec }) {
  if (!activeLesson) return null;

  return (
    <div>
      <div style={{ background: "#201a12", border: "1px solid #3a2e1e", borderRadius: 10, padding: 24, maxWidth: 700, lineHeight: 1.8, fontSize: 14, whiteSpace: "pre-wrap" }}>
        {activeLesson.theory.replace(/```js|```/g, "").replace(/##/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "[ $1 ]")}
      </div>
      <button onClick={() => setTab("practice")} style={{ marginTop: 16, padding: "10px 24px", background: sec.color, color: "#1a1510", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
        Amaliyotga o'tish →
      </button>
    </div>
  );
}

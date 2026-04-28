import React from 'react';
import { curriculum, SECTIONS } from '../data/curriculum';

export default function Sidebar({ activeSection, setActiveSection, activeLesson, openLesson, completed }) {
  return (
    <div style={{ width: 240, background: "#201a12", borderRight: "1px solid #3a2e1e", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #3a2e1e" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#c8a96e", letterSpacing: 0.5 }}>JS Academy</div>
        <div style={{ fontSize: 11, color: "#8a7a5a", marginTop: 2 }}>O'zbek tilida</div>
      </div>
      {SECTIONS.map(key => {
        const s = curriculum[key];
        const doneCount = s.lessons.filter(l => completed[l.id]).length;
        return (
          <div key={key}>
            <div
              onClick={() => setActiveSection(key)}
              style={{ padding: "12px 16px", cursor: "pointer", background: activeSection === key ? "#2a2015" : "transparent", borderLeft: activeSection === key ? `3px solid ${s.color}` : "3px solid transparent", transition: "all .2s" }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: activeSection === key ? s.color : "#a08060" }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 11, color: "#6a5a3a", marginTop: 2 }}>{doneCount}/{s.lessons.length} bajarildi</div>
            </div>
            {activeSection === key && s.lessons.map(l => (
              <div
                key={l.id}
                onClick={() => openLesson(l)}
                style={{ padding: "8px 16px 8px 28px", cursor: "pointer", background: activeLesson?.id === l.id ? "#2e2418" : "transparent", fontSize: 12, color: activeLesson?.id === l.id ? "#e8d5b0" : "#7a6a4a", display: "flex", alignItems: "center", gap: 6 }}
              >
                <span style={{ fontSize: 10 }}>{completed[l.id] ? "✅" : "○"}</span>
                {l.title}
              </div>
            ))}
          </div>
        );
      })}
      <div style={{ marginTop: "auto", padding: "12px 16px", borderTop: "1px solid #3a2e1e", fontSize: 11, color: "#5a4a2a" }}>
        Jami: {Object.keys(completed).length} dars bajarildi
      </div>
    </div>
  );
}

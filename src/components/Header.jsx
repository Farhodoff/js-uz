import React from 'react';

export default function Header({ activeLesson, sec }) {
  return (
    <div style={{ padding: "14px 24px", borderBottom: "1px solid #3a2e1e", background: "#1e1810", display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ color: sec.color, fontSize: 18 }}>{sec.icon}</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 16 }}>{activeLesson?.title || "Dars tanlang"}</div>
        <div style={{ fontSize: 11, color: "#8a7a5a" }}>{sec.label}</div>
      </div>
    </div>
  );
}

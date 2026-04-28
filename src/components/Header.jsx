import React from 'react';

export default function Header({ activeLesson, sec, sidebarOpen, setSidebarOpen }) {
  const LayoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', opacity: 0.8 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
    </svg>
  );

  return (
    <div style={{ padding: "14px 24px", borderBottom: "1px solid #3a2e1e", background: "#1e1810", display: "flex", alignItems: "center", gap: 16 }}>
      {!sidebarOpen && (
        <div onClick={() => setSidebarOpen(true)} title="Sidebar-ni ochish" style={{ display: "flex", alignItems: "center" }}>
          <LayoutIcon />
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: sec.color, fontSize: 18 }}>{sec.icon}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{activeLesson?.title || "Dars tanlang"}</div>
          <div style={{ fontSize: 11, color: "#8a7a5a" }}>{sec.label}</div>
        </div>
      </div>
    </div>
  );
}

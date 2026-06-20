import React from 'react';
import LayoutIcon from './icons/LayoutIcon';
import { useAppStore } from '../store/useAppStore';

export default function Header({ activeLesson, sec }) {
  const sidebarOpen = useAppStore(state => state.sidebarOpen);
  const setSidebarOpen = useAppStore(state => state.setSidebarOpen);
  const setSettingsOpen = useAppStore(state => state.setSettingsOpen);

  return (
    <header className="app-header">
      {!sidebarOpen && (
        <button
          className="header-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Sidebar-ni ochish"
        >
          <LayoutIcon />
        </button>
      )}
      <button 
        className="search-shortcut-btn" 
        onClick={() => useAppStore.getState().setSearchOpen(true)}
        style={{ marginLeft: sidebarOpen ? '0' : '10px' }}
      >
        🔍 Qidiruv (Cmd + K)
      </button>
      <div className="header-info" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span className="header-icon" style={{ color: sec.color }}>{sec.icon}</span>
          <div>
            <div className="header-title">
              {activeLesson?.title || 'Dars tanlang'}
            </div>
            <div className="header-section">{sec.label}</div>
          </div>
        </div>

        <button 
          onClick={() => setSettingsOpen(true)}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem', padding: '0 10px' }}
          title="Sozlamalar va Zaxira"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}

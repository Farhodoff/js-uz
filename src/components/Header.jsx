import React from 'react';
import LayoutIcon from './icons/LayoutIcon';
import { useAppStore } from '../store/useAppStore';

export default function Header({ activeLesson, sec }) {
  const sidebarOpen = useAppStore(state => state.sidebarOpen);
  const setSidebarOpen = useAppStore(state => state.setSidebarOpen);

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
      <div className="header-info">
        <span className="header-icon" style={{ color: sec.color }}>{sec.icon}</span>
        <div>
          <div className="header-title">
            {activeLesson?.title || 'Dars tanlang'}
          </div>
          <div className="header-section">{sec.label}</div>
        </div>
      </div>
    </header>
  );
}

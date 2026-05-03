import React from 'react';
import { curriculum, SECTIONS } from '../data/curriculum';
import LayoutIcon from './icons/LayoutIcon';

export default function Sidebar({
  activeSection, setActiveSection, activeLesson, openLesson,
  completed, getStats, totalCompleted, sidebarOpen, setSidebarOpen
}) {
  return (
    <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`} role="navigation" aria-label="Darslar navigatsiyasi">
      <div className="sidebar-header">
        <div>
          <div className="sidebar-brand">JS Academy</div>
          <div className="sidebar-subtitle">O'zbek tilida</div>
        </div>
        <button
          className="header-toggle"
          onClick={() => setSidebarOpen(false)}
          aria-label="Sidebar-ni yopish"
        >
          <LayoutIcon />
        </button>
      </div>

      <div className="sidebar-content">
        {SECTIONS.map(key => {
          const s = curriculum[key];
          const stats = getStats(s.lessons);
          const isActive = activeSection === key;

          return (
            <div key={key}>
              <button
                className={`section-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSection(key)}
                style={isActive ? { borderLeftColor: s.color } : undefined}
                aria-expanded={isActive}
              >
                <div className="section-label" style={isActive ? { color: s.color } : undefined}>
                  {s.icon} {s.label}
                </div>
                <div className="section-progress">
                  {stats.done}/{stats.total} bajarildi
                </div>
                <div className="section-progress-bar">
                  <div
                    className="section-progress-fill"
                    style={{ width: `${stats.percent}%`, background: s.color }}
                  />
                </div>
              </button>

              {isActive && s.lessons.map(l => (
                <button
                  key={l.id}
                  className={`lesson-item ${activeLesson?.id === l.id ? 'active' : ''}`}
                  onClick={() => openLesson(l)}
                >
                  <span className="lesson-status">
                    {completed[l.id] ? '✅' : '○'}
                  </span>
                  {l.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        Jami: {totalCompleted} dars bajarildi
      </div>
    </nav>
  );
}

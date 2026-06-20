import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { curriculum, SECTIONS } from '../data/curriculum';
import { PATHS, PATH_KEYS } from '../data/paths';
import LayoutIcon from './icons/LayoutIcon';
import { useAppStore } from '../store/useAppStore';
import { reactCurriculum, REACT_SECTIONS } from '../data/reactCurriculum';

export default function Sidebar({
  activeSection, setActiveSection, activeLesson, openLesson
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPlayground = location.pathname === '/playground';

  const sidebarOpen = useAppStore(state => state.sidebarOpen);
  const setSidebarOpen = useAppStore(state => state.setSidebarOpen);
  const getStats = useAppStore(state => state.getStats);
  const totalCompleted = useAppStore(state => state.totalCompleted());
  const completed = useAppStore(state => state.completed);
  const activeTrack = useAppStore(state => state.activeTrack || 'js');
  const setActiveTrack = useAppStore(state => state.setActiveTrack);

  const currentCurriculum = activeTrack === 'react' ? reactCurriculum : curriculum;
  const currentSections = activeTrack === 'react' ? REACT_SECTIONS : SECTIONS;

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

      <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
        <button 
          onClick={() => {
            setActiveTrack('js');
            setActiveSection('beginner');
            navigate('/beginner');
          }}
          style={{ flex: 1, padding: '10px', background: activeTrack === 'js' ? '#1e293b' : 'transparent', color: activeTrack === 'js' ? '#f1c40f' : '#64748b', border: 'none', borderBottom: activeTrack === 'js' ? '2px solid #f1c40f' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold' }}
        >
          JavaScript
        </button>
        <button 
          onClick={() => {
            setActiveTrack('react');
            setActiveSection('reactBeginner');
            navigate('/reactBeginner');
          }}
          style={{ flex: 1, padding: '10px', background: activeTrack === 'react' ? '#1e293b' : 'transparent', color: activeTrack === 'react' ? '#61dafb' : '#64748b', border: 'none', borderBottom: activeTrack === 'react' ? '2px solid #61dafb' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold' }}
        >
          React
        </button>
      </div>

      <div className="sidebar-content">
        <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '10px', marginBottom: '8px', paddingLeft: '12px' }}>
          {activeTrack === 'react' ? "React Katalogi" : "To'liq Katalog"}
        </div>
        {currentSections.filter(key => key !== 'challenges').map(key => {
          const s = currentCurriculum[key];
          if (!s) return null;
          const stats = getStats(s.lessons);
          const isActive = activeSection === key;

          return (
            <div key={key}>
              <button
                className={`section-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(key);
                  navigate(`/${key}`);
                }}
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
                  onClick={() => openLesson(l, key)}
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

        <div style={{ paddingTop: '10px', borderTop: '1px solid #334155', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            className={`section-item ${isPlayground ? 'active' : ''}`}
            onClick={() => navigate('/playground')}
            style={isPlayground ? { borderLeftColor: '#3b82f6', background: '#1e293b' } : undefined}
          >
            <div className="section-label" style={{ color: isPlayground ? '#3b82f6' : '#e2e8f0' }}>
              🛠️ Qumdon (Playground)
            </div>
            <div className="section-progress">Interaktiv CodePen</div>
          </button>

          <button
            className={`section-item ${activeSection === 'challenges' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('challenges');
              navigate('/challenges');
            }}
            style={activeSection === 'challenges' ? { borderLeftColor: '#9b59b6', background: '#1e293b' } : undefined}
          >
            <div className="section-label" style={{ color: activeSection === 'challenges' ? '#9b59b6' : '#e2e8f0' }}>
              🏆 JS Challenges
            </div>
            <div className="section-progress">1600+ Mashqlar va Masalalar</div>
          </button>
        </div>
      </div>

      <div className="sidebar-footer">
        Jami: {totalCompleted} dars bajarildi
      </div>
    </nav>
  );
}

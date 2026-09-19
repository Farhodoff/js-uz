import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SearchModal from "./SearchModal";
import AiModal from "../lesson/components/AiModal";
import SettingsModal from "./SettingsModal";
import { useAppStore } from "../../store/useAppStore";
import { useAI } from "../lesson/hooks/useAI";

export default function AppLayout({ 
  children, 
  activeSection, setActiveSection, 
  activeLesson, openLesson, sec,
  code
}) {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const isSearchOpen = useAppStore((state) => state.isSearchOpen);
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);
  const isSettingsOpen = useAppStore((state) => state.isSettingsOpen);
  const setSettingsOpen = useAppStore((state) => state.setSettingsOpen);
  
  const [showAI, setShowAI] = React.useState(false);
  const ai = useAI();

  return (
    <div className="app-layout">
      {/* Decorative Glows */}
      <div className="glow-circle glow-circle-1" />
      <div className="glow-circle glow-circle-2" />
      <div className="glow-circle glow-circle-3" />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeLesson={activeLesson}
        openLesson={openLesson}
      />

      <div className="app-main">
        <Header activeLesson={activeLesson} sec={sec} />

        {children}

        {/* AI Floating Button */}
        <div className="ai-fab">
          <button
            className="ai-fab-btn"
            onClick={() => setShowAI(!showAI)}
            aria-label="AI Yordamchi"
          >
            🤖 AI Yordam
          </button>
        </div>

        <AiModal 
          showAI={showAI} 
          setShowAI={setShowAI}
          aiQuestion={ai.aiQuestion}
          setAiQuestion={ai.setAiQuestion}
          askAI={() => ai.askAI(activeLesson?.title, code)}
          aiLoading={ai.aiLoading}
          aiAnswer={ai.aiAnswer}
        />

        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setSearchOpen(false)} 
        />
        
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setSettingsOpen(false)} 
        />
      </div>
    </div>
  );
}

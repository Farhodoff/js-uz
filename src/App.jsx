import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TheoryTab from "./components/TheoryTab";
import PracticeTab from "./components/PracticeTab";
import AiTab from "./components/AiTab";
import { curriculum } from "./data/curriculum";

export default function App() {
  const [activeSection, setActiveSection] = useState("beginner");
  const [activeLesson, setActiveLesson] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState({});
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [tab, setTab] = useState("theory");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const outputRef = useRef(null);

  useEffect(() => {
    const sec = curriculum[activeSection];
    if (sec.lessons.length > 0) {
      openLesson(sec.lessons[0]);
    }
  }, [activeSection]);

  function openLesson(lesson) {
    setActiveLesson(lesson);
    setCode(lesson.task);
    setOutput("");
    setShowHint(false);
  }

  function runCode() {
    let logs = [];
    const origLog = console.log;
    const origError = console.error;
    console.log = (...args) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
    console.error = (...args) => logs.push("❌ " + args.join(" "));
    try {
      new Function(code)();
      setOutput(logs.length ? logs.join("\n") : "✅ Kod muvaffaqiyatli ishladi");
      if (logs.length || code.trim() !== "") {
        setCompleted(p => ({ ...p, [activeLesson.id]: true }));
      }
    } catch (e) {
      setOutput("❌ Xato: " + e.message);
    }
    console.log = origLog;
    console.error = origError;
  }

  async function askAI() {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: aiQuestion,
          lesson: activeLesson?.title
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAiAnswer(data.answer || "Xatolik.");
      } else {
        setAiAnswer(data.error || "Xatolik yuz berdi.");
      }
    } catch (e) {
      setAiAnswer("Tarmoq xatosi: " + e.message);
    }
    setAiLoading(false);
  }

  const sec = curriculum[activeSection];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#1a1510", color: "#e8d5b0", fontFamily: "'Segoe UI', sans-serif" }}>
      {sidebarOpen && (
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          activeLesson={activeLesson} 
          openLesson={openLesson} 
          completed={completed} 
          setSidebarOpen={setSidebarOpen}
        />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header activeLesson={activeLesson} sec={sec} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Split Screen Layout */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", padding: "10px 20px 20px" }}>
          
          {/* Chap tomon: Nazariya */}
          <div style={{ flex: 1, overflowY: "auto", paddingRight: 20, borderRight: "1px solid #3a2e1e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 15, color: "#c8a96e", fontWeight: 600 }}>
              📖 Nazariya
            </div>
            <TheoryTab activeLesson={activeLesson} sec={sec} />
          </div>

          {/* O'ng tomon: Amaliyot */}
          <div style={{ flex: 1, overflowY: "auto", paddingLeft: 20, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 15, color: "#c8a96e", fontWeight: 600 }}>
              💻 Amaliyot
            </div>
            <PracticeTab 
              code={code} 
              setCode={setCode} 
              runCode={runCode} 
              showHint={showHint} 
              setShowHint={setShowHint} 
              activeLesson={activeLesson} 
              output={output} 
              outputRef={outputRef} 
            />
          </div>
        </div>

        {/* AI Yordam Floating Button (O'ng pastda) */}
        <div style={{ position: "fixed", bottom: 20, right: 20 }}>
          <button 
            onClick={() => setTab(tab === "ai" ? "theory" : "ai")}
            style={{ padding: "10px 20px", background: "#2a2015", color: "#c8a96e", border: "1px solid #c8a96e", borderRadius: 30, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
          >
            🤖 AI Yordam
          </button>
        </div>

        {/* AI Modal/Overlay */}
        {tab === "ai" && (
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 }}>
            <div style={{ background: "#201a12", width: "90%", maxWidth: 600, padding: 30, borderRadius: 15, border: "1px solid #3a2e1e" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h3>Robotdan so'rash</h3>
                <button onClick={() => setTab("theory")} style={{ background: "none", border: "none", color: "#c8a96e", cursor: "pointer", fontSize: 20 }}>✕</button>
              </div>
              <AiTab 
                aiQuestion={aiQuestion} 
                setAiQuestion={setAiQuestion} 
                askAI={askAI} 
                aiLoading={aiLoading} 
                aiAnswer={aiAnswer} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

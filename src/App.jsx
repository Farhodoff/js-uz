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
    setTab("theory");
  }

  function runCode() {
    let logs = [];
    const origLog = console.log;
    const origError = console.error;
    console.log = (...args) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
    console.error = (...args) => logs.push("❌ " + args.join(" "));
    try {
      // eslint-disable-next-line no-new-func
      new Function(code)();
      setOutput(logs.length ? logs.join("\n") : "✅ Kod muvaffaqiyatli ishladi (hech narsa chiqarilmadi)");
      if (logs.length) {
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
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Siz JavaScript o'qituvchisisiz. Faqat o'zbek tilida javob bering. Qisqa, tushunarli va misollar bilan tushuntiring. Markdown ishlatmang, oddiy matn yozing.",
          messages: [{ role: "user", content: `Mavzu: ${activeLesson?.title || "JavaScript"}\n\nSavol: ${aiQuestion}` }]
        })
      });
      const data = await res.json();
      setAiAnswer(data.content?.[0]?.text || "Javob olishda xatolik.");
    } catch {
      setAiAnswer("Tarmoq xatosi yuz berdi.");
    }
    setAiLoading(false);
  }

  const sec = curriculum[activeSection];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#1a1510", color: "#e8d5b0" }}>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        activeLesson={activeLesson} 
        openLesson={openLesson} 
        completed={completed} 
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header activeLesson={activeLesson} sec={sec} />

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #3a2e1e", background: "#1e1810" }}>
          {["theory", "practice", "ai"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: tab === t ? sec.color : "#6a5a3a", borderBottom: tab === t ? `2px solid ${sec.color}` : "2px solid transparent", transition: "all .2s" }}>
              {t === "theory" ? "📖 Nazariya" : t === "practice" ? "💻 Amaliyot" : "🤖 AI Yordam"}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {tab === "theory" && (
            <TheoryTab activeLesson={activeLesson} setTab={setTab} sec={sec} />
          )}

          {tab === "practice" && (
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
          )}

          {tab === "ai" && (
            <AiTab 
              aiQuestion={aiQuestion} 
              setAiQuestion={setAiQuestion} 
              askAI={askAI} 
              aiLoading={aiLoading} 
              aiAnswer={aiAnswer} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

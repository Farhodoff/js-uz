import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TheoryTab from "./components/TheoryTab";
import PracticeTab from "./components/PracticeTab";
import QuizTab from "./components/QuizTab";
import AiTab from "./components/AiTab";
import VisualizerTab from "./components/VisualizerTab";
import { useLesson } from "./hooks/useLesson";
import { useCodeRunner } from "./hooks/useCodeRunner";
import { useAI } from "./hooks/useAI";
import { useProgress } from "./hooks/useProgress";

function LessonPage() {
  const [showHint, setShowHint] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const outputRef = useRef(null);

  const lesson = useLesson();
  const { output, runCode, resetOutput } = useCodeRunner();
  const ai = useAI();
  const progress = useProgress();

  // Resizing state
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const offsetLeft = sidebarOpen && window.innerWidth > 768 ? 270 : 0;
    const newWidth = ((e.clientX - offsetLeft) / (window.innerWidth - offsetLeft)) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  };

  const {
    activeSection, setActiveSection,
    activeLesson, openLesson,
    currentExerciseIndex, setCurrentExerciseIndex,
    code, setCode, sec
  } = lesson;

  const [activeRightTab, setActiveRightTab] = useState("practice");

  useEffect(() => {
    if (activeLesson) {
      const exercisesExist = !!activeLesson.exercises?.length;
      const quizzesExist = !!activeLesson.quizzes?.length;
      if (exercisesExist) {
        setActiveRightTab("practice");
      } else if (quizzesExist) {
        setActiveRightTab("quiz");
      }
    }
  }, [activeLesson]);

  function handleRunCode() {
    runCode(code, activeLesson, currentExerciseIndex, () => {
      // Mark exercise complete
      progress.markComplete(`${activeLesson.id}_${currentExerciseIndex}`);
      
      // Check if all exercises done
      const exercises = activeLesson.exercises || [];
      const allExercisesDone = exercises.every((_, i) =>
        i === currentExerciseIndex || progress.isComplete(`${activeLesson.id}_${i}`)
      );

      // Check if all quizzes done
      const quizzes = activeLesson.quizzes || [];
      const allQuizzesDone = quizzes.every((_, i) =>
        progress.isComplete(`${activeLesson.id}_quiz_${i}`)
      );

      if (allExercisesDone && allQuizzesDone) {
        progress.markComplete(activeLesson.id);
      }
    });
    setShowHint(false);
  }

  function handleCompleteQuiz(quizIndex, isCorrect) {
    if (!activeLesson) return;
    if (isCorrect) {
      progress.markComplete(`${activeLesson.id}_quiz_${quizIndex}`);

      // Check if all quizzes are completed
      const quizzes = activeLesson.quizzes || [];
      const allQuizzesDone = quizzes.every((_, i) =>
        i === quizIndex || progress.isComplete(`${activeLesson.id}_quiz_${i}`)
      );

      // Check if all exercises are also completed (if any)
      const exercises = activeLesson.exercises || [];
      const allExercisesDone = exercises.every((_, i) =>
        progress.isComplete(`${activeLesson.id}_${i}`)
      );

      if (allQuizzesDone && allExercisesDone) {
        progress.markComplete(activeLesson.id);
      }
    }
  }

  function handleOpenLesson(l) {
    openLesson(l);
    resetOutput();
    setShowHint(false);
  }

  return (
    <div className="app-layout">
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
        openLesson={handleOpenLesson}
        completed={progress.completed}
        getStats={progress.getStats}
        totalCompleted={progress.totalCompleted}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="app-main">
        <Header
          activeLesson={activeLesson}
          sec={sec}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {!activeLesson ? (
          <div className="loading-container">
            <div className="loading-dots">
              <span></span><span></span><span></span>
            </div>
            <p>Dars yuklanmoqda...</p>
          </div>
        ) : (
          <div className="split-layout">
            {/* Left: Theory */}
            <div className="pane pane-theory" style={{ width: `${leftWidth}%` }}>
              <div className="pane-label">📖 Nazariya</div>
              <TheoryTab activeLesson={activeLesson} />
            </div>

            <div className="pane-divider" onMouseDown={startResizing}>
              <div className="pane-divider-handle"></div>
            </div>

            {/* Right: Practice / Quiz / Visualizer */}
            <div className="pane" style={{ width: `${100 - leftWidth}%` }}>
              <div className="pane-tabs-header">
                <button
                  className={`pane-tab-btn ${activeRightTab === "practice" ? "active" : ""}`}
                  onClick={() => setActiveRightTab("practice")}
                >
                  💻 Amaliyot
                </button>
                <button
                  className={`pane-tab-btn ${activeRightTab === "quiz" ? "active" : ""}`}
                  onClick={() => setActiveRightTab("quiz")}
                >
                  📝 Testlar
                </button>
                {activeSection === "algorithms" && (
                  <button
                    className={`pane-tab-btn ${activeRightTab === "visualizer" ? "active" : ""}`}
                    onClick={() => setActiveRightTab("visualizer")}
                  >
                    📊 Visualizatsiya
                  </button>
                )}
              </div>

              {activeRightTab === "practice" ? (
                <PracticeTab
                  code={code}
                  setCode={setCode}
                  runCode={handleRunCode}
                  showHint={showHint}
                  setShowHint={setShowHint}
                  activeLesson={activeLesson}
                  currentExerciseIndex={currentExerciseIndex}
                  setCurrentExerciseIndex={setCurrentExerciseIndex}
                  output={output}
                  outputRef={outputRef}
                />
              ) : activeRightTab === "quiz" ? (
                <QuizTab
                  activeLesson={activeLesson}
                  completedQuizzes={progress.completed}
                  onCompleteQuiz={handleCompleteQuiz}
                />
              ) : activeSection === "algorithms" ? (
                <VisualizerTab activeLesson={activeLesson} />
              ) : (
                <PracticeTab
                  code={code}
                  setCode={setCode}
                  runCode={handleRunCode}
                  showHint={showHint}
                  setShowHint={setShowHint}
                  activeLesson={activeLesson}
                  currentExerciseIndex={currentExerciseIndex}
                  setCurrentExerciseIndex={setCurrentExerciseIndex}
                  output={output}
                  outputRef={outputRef}
                />
              )}
            </div>
          </div>
        )}

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

        {/* AI Modal */}
        {showAI && (
          <div className="ai-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) setShowAI(false);
          }}>
            <div className="ai-modal" role="dialog" aria-label="AI Yordamchi">
              <div className="ai-modal-header">
                <h3>🤖 Robotdan so'rash</h3>
                <button
                  className="ai-close-btn"
                  onClick={() => setShowAI(false)}
                  aria-label="Yopish"
                >
                  ✕
                </button>
              </div>
              <AiTab
                aiQuestion={ai.aiQuestion}
                setAiQuestion={ai.setAiQuestion}
                askAI={() => ai.askAI(activeLesson?.title)}
                aiLoading={ai.aiLoading}
                aiAnswer={ai.aiAnswer}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/:section/:lessonId" element={<LessonPage />} />
      <Route path="/:section" element={<LessonPage />} />
      <Route path="*" element={<Navigate to="/beginner" replace />} />
    </Routes>
  );
}

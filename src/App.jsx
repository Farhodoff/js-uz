import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TheoryTab from "./components/TheoryTab";
import PracticeTab from "./components/PracticeTab";
import QuizTab from "./components/QuizTab";
import VisualizerTab from "./components/VisualizerTab";
import { useLesson } from "./hooks/useLesson";
import { useCodeRunner } from "./hooks/useCodeRunner";
import { useAI } from "./hooks/useAI";
import { useAppStore } from "./store/useAppStore";
import { useResizable } from "./hooks/useResizable";
import ChallengeTab from "./components/ChallengeTab";
import Playground from "./pages/Playground";
import AiModal from "./components/AiModal";

function LessonPage() {
  const [showHint, setShowHint] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const markComplete = useAppStore((state) => state.markComplete);
  const isComplete = useAppStore((state) => state.isComplete);

  const lesson = useLesson();
  const { output, runCode, resetOutput } = useCodeRunner();
  const ai = useAI();

  // Resizing state
  const { leftWidth, startResizing } = useResizable(50, 20, 80, sidebarOpen ? 270 : 0);

  const {
    activeSection, setActiveSection,
    activeLesson, openLesson,
    currentExerciseIndex, setCurrentExerciseIndex,
    code, setCode, sec
  } = lesson;

  const [activeRightTab, setActiveRightTab] = useState("practice");

  useEffect(() => {
    if (activeLesson) {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setActiveRightTab("theory");
        return;
      }
      
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
      markComplete(`${activeLesson.id}_${currentExerciseIndex}`);
      
      // Check if all exercises done
      const exercises = activeLesson.exercises || [];
      const allExercisesDone = exercises.every((_, i) =>
        i === currentExerciseIndex || isComplete(`${activeLesson.id}_${i}`)
      );

      // Check if all quizzes done
      const quizzes = activeLesson.quizzes || [];
      const allQuizzesDone = quizzes.every((_, i) =>
        isComplete(`${activeLesson.id}_quiz_${i}`)
      );

      if (allExercisesDone && allQuizzesDone) {
        markComplete(activeLesson.id);
      }
    });
    setShowHint(false);
  }

  function handleCompleteQuiz(quizIndex, isCorrect) {
    if (!activeLesson) return;
    if (isCorrect) {
      markComplete(`${activeLesson.id}_quiz_${quizIndex}`);

      // Check if all quizzes are completed
      const quizzes = activeLesson.quizzes || [];
      const allQuizzesDone = quizzes.every((_, i) =>
        i === quizIndex || isComplete(`${activeLesson.id}_quiz_${i}`)
      );

      // Check if all exercises are also completed (if any)
      const exercises = activeLesson.exercises || [];
      const allExercisesDone = exercises.every((_, i) =>
        isComplete(`${activeLesson.id}_${i}`)
      );

      if (allQuizzesDone && allExercisesDone) {
        markComplete(activeLesson.id);
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
      />

      <div className="app-main">
        <Header
          activeLesson={activeLesson}
          sec={sec}
        />

        {activeSection === "challenges" ? (
          <div style={{ flex: 1, overflow: "hidden", padding: "var(--space-3) var(--space-5) var(--space-5)" }}>
            <ChallengeTab />
          </div>
        ) : !activeLesson ? (
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

            {/* Right: Practice / Quiz / Visualizer / Theory (Mobile) */}
            <div className="pane pane-right-mobile" style={{ width: `${100 - leftWidth}%` }}>
              <div className="pane-tabs-header">
                <button
                  className={`pane-tab-btn mobile-theory-tab ${activeRightTab === "theory" ? "active" : ""}`}
                  onClick={() => setActiveRightTab("theory")}
                >
                  📖 Nazariya
                </button>
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

              {activeRightTab === "theory" ? (
                <TheoryTab activeLesson={activeLesson} />
              ) : activeRightTab === "practice" ? (
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
                />
              ) : activeRightTab === "quiz" ? (
                <QuizTab
                  activeLesson={activeLesson}
                  completedQuizzes={progress.completed}
                  onCompleteQuiz={handleCompleteQuiz}
                />
              ) : activeSection === "algorithms" && activeRightTab === "visualizer" ? (
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
        <AiModal 
          showAI={showAI} 
          setShowAI={setShowAI}
          aiQuestion={ai.aiQuestion}
          setAiQuestion={ai.setAiQuestion}
          askAI={() => ai.askAI(activeLesson?.title, code)}
          aiLoading={ai.aiLoading}
          aiAnswer={ai.aiAnswer}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/playground" element={<Playground />} />
      <Route path="/:section/:lessonId" element={<LessonPage />} />
      <Route path="/:section" element={<LessonPage />} />
      <Route path="*" element={<Navigate to="/beginner" replace />} />
    </Routes>
  );
}

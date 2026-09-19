import React, { useState, useEffect } from "react";
import TheoryTab from "../components/TheoryTab";
import PracticeTab from "../components/PracticeTab";
import QuizTab from "../components/QuizTab";
import VisualizerTab from "../components/VisualizerTab";
import ChallengeTab from "../components/ChallengeTab";
import AppLayout from "../../layout/AppLayout";
import { useLesson } from "../hooks/useLesson";
import { useCodeRunner } from "../hooks/useCodeRunner";
import { useAppStore } from "../../../store/useAppStore";
import { useResizable } from "../hooks/useResizable";

export default function LessonPage() {
  const [showHint, setShowHint] = useState(false);

  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const markComplete = useAppStore((state) => state.markComplete);
  const isComplete = useAppStore((state) => state.isComplete);
  const progress = useAppStore((state) => state);
  const setSearchOpen = useAppStore((state) => state.setSearchOpen);

  const lesson = useLesson();

  const {
    activeLesson: _lesson,
    currentExerciseIndex: _exIdx,
  } = lesson;

  const handleExerciseSuccess = React.useCallback(() => {
    const al = _lesson;
    if (!al) return;
    markComplete(`${al.id}_${_exIdx}`);
    const exercises = al.exercises || [];
    const allExercisesDone = exercises.every((_, i) =>
      i === _exIdx || isComplete(`${al.id}_${i}`)
    );
    const quizzes = al.quizzes || [];
    const allQuizzesDone = quizzes.every((_, i) => isComplete(`${al.id}_quiz_${i}`));
    if (allExercisesDone && allQuizzesDone) {
      markComplete(al.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson, _exIdx]);

  const { output, runCode, resetOutput } = useCodeRunner(_lesson, _exIdx, handleExerciseSuccess);

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

  // Global Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchOpen]);

  function handleRunCode() {
    runCode(code);
    setShowHint(false);
  }

  function handleCompleteQuiz(quizIndex, isCorrect) {
    if (!activeLesson) return;
    if (isCorrect) {
      markComplete(`${activeLesson.id}_quiz_${quizIndex}`);
      const quizzes = activeLesson.quizzes || [];
      const allQuizzesDone = quizzes.every((_, i) => i === quizIndex || isComplete(`${activeLesson.id}_quiz_${i}`));
      const exercises = activeLesson.exercises || [];
      const allExercisesDone = exercises.every((_, i) => isComplete(`${activeLesson.id}_${i}`));
      if (allQuizzesDone && allExercisesDone) {
        markComplete(activeLesson.id);
      }
    }
  }

  function handleOpenLesson(l, sectionKey) {
    openLesson(l, sectionKey);
    resetOutput();
    setShowHint(false);
  }

  return (
    <AppLayout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      activeLesson={activeLesson}
      openLesson={handleOpenLesson}
      sec={sec}
      code={code}
    >
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
    </AppLayout>
  );
}

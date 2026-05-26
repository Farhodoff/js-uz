import React, { useState, useEffect } from "react";
import ChallengeCard from "./ChallengeCard";
import ExplanationBox from "./ExplanationBox";
import ChallengeBuilder from "./ChallengeBuilder";
import { challenges as seedChallenges } from "../data/challenges";
import "./ChallengeTab.css";

export default function ChallengeTab() {
  const [mode, setMode] = useState("quiz");
  const [challenges, setChallenges] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState({});

  // Load challenges and attempts from LocalStorage
  useEffect(() => {
    const savedChallenges = localStorage.getItem("js_challenges");
    if (savedChallenges) {
      const parsed = JSON.parse(savedChallenges);
      // Agarda fayldagi baza hajmi o'zgargan bo'lsa (yangi savollar yuklanganda), localStorageni yangilaymiz
      if (parsed.length !== seedChallenges.length) {
        setChallenges(seedChallenges);
        localStorage.setItem("js_challenges", JSON.stringify(seedChallenges));
      } else {
        setChallenges(parsed);
      }
    } else {
      setChallenges(seedChallenges);
      localStorage.setItem("js_challenges", JSON.stringify(seedChallenges));
    }

    const savedAttempts = localStorage.getItem("js_attempts");
    if (savedAttempts) {
      setAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  const handleAddChallenge = (newChallenge) => {
    const updated = [...challenges, newChallenge];
    setChallenges(updated);
    localStorage.setItem("js_challenges", JSON.stringify(updated));
    setMode("quiz");
  };

  const handleFilterChange = (cat) => {
    setCategoryFilter(cat);
    setCurrentIndex(0);
    setSelectedOption("");
    setIsSubmitted(false);
  };

  const filteredChallenges = challenges.filter(c => 
    categoryFilter === "all" ? true : c.category === categoryFilter
  );

  const currentChallenge = filteredChallenges[currentIndex];

  const handleCheckAnswer = (val) => {
    if (val === true && currentChallenge && selectedOption) {
      const isCorrect = selectedOption === currentChallenge.correctAnswer;
      const updatedAttempts = {
        ...attempts,
        [currentChallenge.id]: {
          isCorrect,
          selectedOption
        }
      };
      setAttempts(updatedAttempts);
      localStorage.setItem("js_attempts", JSON.stringify(updatedAttempts));
    }
    setIsSubmitted(val);
  };

  const handleNext = () => {
    setSelectedOption("");
    setIsSubmitted(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption("");
    setIsSubmitted(false);
    
    // Clear attempts for current filtered challenges
    const updatedAttempts = { ...attempts };
    filteredChallenges.forEach(c => {
      delete updatedAttempts[c.id];
    });
    setAttempts(updatedAttempts);
    localStorage.setItem("js_attempts", JSON.stringify(updatedAttempts));
  };

  // Score stats
  const totalSolvedInFilter = filteredChallenges.filter(c => attempts[c.id] !== undefined).length;
  const correctCountInFilter = filteredChallenges.filter(c => attempts[c.id]?.isCorrect).length;
  const isQuizFinished = currentIndex >= filteredChallenges.length;

  const categories = [
    { id: "all", label: "Hammasi" },
    { id: "basics", label: "Asoslar" },
    { id: "scope", label: "Scope & Closures" },
    { id: "arrays", label: "Massivlar" },
    { id: "objects", label: "Obyektlar" },
    { id: "async", label: "Asinxronlik" }
  ];

  return (
    <div className="challenge-tab-container">
      {/* Tab Header Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)", flexWrap: "wrap", gap: "var(--space-3)" }}>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--accent)" }}>
          🏆 JavaScript Challenges
        </h2>
        <button 
          className="btn btn-secondary"
          onClick={() => setMode(mode === "quiz" ? "builder" : "quiz")}
          style={{ padding: "var(--space-2) var(--space-4)", fontSize: "var(--text-xs)" }}
        >
          {mode === "quiz" ? "Yangi Savol +" : "Testlarga qaytish"}
        </button>
      </div>

      {mode === "builder" ? (
        <ChallengeBuilder onAddChallenge={handleAddChallenge} />
      ) : (
        <>
          {/* Category Chips */}
          <div className="challenge-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-chip ${categoryFilter === cat.id ? "active" : ""}`}
                onClick={() => handleFilterChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isQuizFinished ? (
            <div className="challenge-card stats-dashboard">
              <h2 style={{ fontSize: "var(--text-2xl)", color: "var(--accent)" }}>
                🎉 Bo'lim yakunlandi!
              </h2>
              <p style={{ color: "var(--text-muted)", marginTop: "var(--space-2)", fontSize: "var(--text-sm)" }}>
                Siz ushbu bo'limdagi barcha savollarga javob berib bo'ldingiz.
              </p>

              <div className="stats-grid">
                <div className="stat-item-box">
                  <div className="stat-num">{filteredChallenges.length}</div>
                  <div className="stat-title">Umumiy Savollar</div>
                </div>
                <div className="stat-item-box">
                  <div className="stat-num correct">{correctCountInFilter}</div>
                  <div className="stat-title">To'g'ri Javoblar</div>
                </div>
                <div className="stat-item-box">
                  <div className="stat-num">
                    {filteredChallenges.length ? Math.round((correctCountInFilter / filteredChallenges.length) * 100) : 0}%
                  </div>
                  <div className="stat-title">Muvaffaqiyat Foizi</div>
                </div>
              </div>

              {/* Review answers list */}
              <div style={{ textAlign: "left", margin: "var(--space-5) 0 var(--space-6) 0" }}>
                <h4 style={{ marginBottom: "var(--space-3)", color: "var(--text-primary)" }}>Natijalarni qayta ko'rish:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  {filteredChallenges.map((c, idx) => {
                    const isCorrect = attempts[c.id]?.isCorrect;
                    return (
                      <div 
                        key={idx} 
                        style={{
                          padding: "var(--space-3)", 
                          background: "var(--bg-primary)", 
                          border: `1px solid ${isCorrect ? "rgba(110, 200, 122, 0.2)" : "rgba(224, 112, 112, 0.2)"}`,
                          borderRadius: "var(--radius-sm)",
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "var(--text-sm)"
                        }}
                      >
                        <span style={{ color: "var(--text-primary)" }}>
                          {idx + 1}. {c.title}
                        </span>
                        <span style={{ color: isCorrect ? "var(--success)" : "var(--error)", fontWeight: 700 }}>
                          {isCorrect ? "To'g'ri" : "Noto'g'ri"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center" }}>
                <button className="btn btn-primary" onClick={handleRestart}>
                  Qayta urinib ko'rish
                </button>
                <button className="btn btn-ghost" onClick={() => handleFilterChange("all")}>
                  Barchasini ochish
                </button>
              </div>
            </div>
          ) : filteredChallenges.length === 0 ? (
            <div className="challenge-card" style={{ padding: "var(--space-8) var(--space-6)", textAlign: "center" }}>
              <h2 style={{ color: "var(--text-primary)" }}>Bu bo'limda hozircha savollar yo'q</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "var(--space-3)", marginBottom: "var(--space-5)", fontSize: "var(--text-sm)" }}>
                Tepadagi "Yangi Savol +" tugmasi orqali ushbu bo'limga savol qo'shishingiz mumkin.
              </p>
              <button className="btn btn-primary" onClick={() => setMode("builder")}>
                Savol qo'shish +
              </button>
            </div>
          ) : (
            <div className={`challenge-layout-grid ${isSubmitted ? "" : "full-width"}`}>
              <ChallengeCard
                challenge={currentChallenge}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                isSubmitted={isSubmitted}
                setIsSubmitted={handleCheckAnswer}
                onNext={handleNext}
                isLast={currentIndex === filteredChallenges.length - 1}
              />

              {isSubmitted && (
                <ExplanationBox
                  challenge={currentChallenge}
                  selectedOption={selectedOption}
                  isCorrect={selectedOption === currentChallenge.correctAnswer}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

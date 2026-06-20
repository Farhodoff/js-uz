import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { curriculum, SECTIONS } from "../data/curriculum";
import { challenges } from "../data/challenges";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fuzzy search logic
  const lowerQuery = query.toLowerCase();
  
  const lessonResults = [];
  SECTIONS.forEach(secKey => {
    const sec = curriculum[secKey];
    if (!sec || !sec.lessons) return;
    sec.lessons.forEach(lesson => {
      if (lesson.title?.toLowerCase().includes(lowerQuery)) {
        lessonResults.push({ ...lesson, sectionKey: secKey, sectionLabel: sec.label });
      }
    });
  });

  const challengeResults = challenges.filter(c => 
    c.title?.toLowerCase().includes(lowerQuery) || 
    c.category?.toLowerCase().includes(lowerQuery)
  );

  const handleSelectLesson = (item) => {
    navigate(`/${item.sectionKey}/${item.id}`);
    onClose();
  };

  const handleSelectChallenge = (item) => {
    // For now navigate to challenges. In future we can open specific challenge by ID
    navigate(`/challenges?id=${item.id}`);
    onClose();
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-container" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Darslar yoki masalalarni qidiring..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="search-results">
          {query.length > 0 && lessonResults.length === 0 && challengeResults.length === 0 && (
            <div className="search-empty">Hech narsa topilmadi 😔</div>
          )}
          
          {query.length > 0 && lessonResults.length > 0 && (
            <div className="search-group">
              <div className="search-group-title">📖 Darslar</div>
              {lessonResults.slice(0, 5).map(item => (
                <div key={item.id} className="search-item" onClick={() => handleSelectLesson(item)}>
                  <div className="search-item-title">{item.title}</div>
                  <div className="search-item-badge">{item.sectionLabel}</div>
                </div>
              ))}
            </div>
          )}

          {query.length > 0 && challengeResults.length > 0 && (
            <div className="search-group">
              <div className="search-group-title">💻 Masalalar (JS Challenges)</div>
              {challengeResults.slice(0, 5).map(item => (
                <div key={item.id} className="search-item" onClick={() => handleSelectChallenge(item)}>
                  <div className="search-item-title">{item.title}</div>
                  <div className="search-item-badge challenge-badge">{item.difficulty}</div>
                </div>
              ))}
            </div>
          )}
          
          {query.length === 0 && (
            <div className="search-empty">Qidirish uchun so'z kiriting... (Masalan: "Array" yoki "Event Loop")</div>
          )}
        </div>
      </div>
    </div>
  );
}

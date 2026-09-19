import React, { useState } from "react";

export default function ChallengeBuilder({ onAddChallenge }) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [category, setCategory] = useState("basics");
  const [code, setCode] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !code || !optionA || !optionB || !correctAnswer || !explanation) {
      setMessage("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    const options = [optionA, optionB];
    if (optionC) options.push(optionC);
    if (optionD) options.push(optionD);

    const newChallenge = {
      id: "custom-" + Date.now(),
      title,
      difficulty,
      category,
      code,
      options,
      correctAnswer,
      explanation
    };

    onAddChallenge(newChallenge);
    setMessage("Yangi challenge muvaffaqiyatli qo'shildi!");
    
    setTitle("");
    setCode("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("");
    setExplanation("");

    setTimeout(() => setMessage(""), 3000);
  };

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        id: "custom-" + Date.now(),
        title,
        difficulty,
        category,
        code,
        options: [optionA, optionB, optionC, optionD].filter(Boolean),
        correctAnswer,
        explanation
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `challenge_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="builder-form-card">
      <h2 style={{ marginBottom: "var(--space-4)", borderBottom: "1px solid var(--border-primary)", paddingBottom: "var(--space-2)", color: "var(--accent)" }}>
        🛠 Yangi Challenge Yaratish
      </h2>
      
      {message && (
        <div style={{
          padding: "var(--space-3)", 
          background: "var(--success-bg)", 
          border: "1px solid var(--success)", 
          borderRadius: "var(--radius-md)",
          color: "var(--success)",
          marginBottom: "var(--space-4)",
          fontSize: "var(--text-sm)"
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <div className="builder-field">
          <label>Mavzu / Savol Sarlavhasi *</label>
          <input
            type="text"
            className="builder-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masalan: Closures va Hoisting tahlili"
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <div className="builder-field">
            <label>Qiyinchilik Darajasi</label>
            <select
              className="builder-input"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Oson (Easy)</option>
              <option value="medium">O'rta (Medium)</option>
              <option value="hard">Qiyin (Hard)</option>
            </select>
          </div>

          <div className="builder-field">
            <label>Kategoriya</label>
            <select
              className="builder-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="basics">Asoslar (Basics)</option>
              <option value="scope">Scope & Closures</option>
              <option value="arrays">Massivlar (Arrays)</option>
              <option value="objects">Obyektlar (Objects)</option>
              <option value="async">Asinxronlik (Async)</option>
            </select>
          </div>
        </div>

        <div className="builder-field">
          <label>JavaScript Kodi *</label>
          <textarea
            className="builder-input code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`const x = 10;\nconsole.log(x);`}
            required
          ></textarea>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)" }}>
            JAVOB VARIANTLARI
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            <div className="builder-field">
              <input
                type="text"
                className="builder-input"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                placeholder="Variant A *"
                required
              />
            </div>
            <div className="builder-field">
              <input
                type="text"
                className="builder-input"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                placeholder="Variant B *"
                required
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            <div className="builder-field">
              <input
                type="text"
                className="builder-input"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                placeholder="Variant C (ixtiyoriy)"
              />
            </div>
            <div className="builder-field">
              <input
                type="text"
                className="builder-input"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
                placeholder="Variant D (ixtiyoriy)"
              />
            </div>
          </div>
        </div>

        <div className="builder-field">
          <label>To'g'ri javob matni *</label>
          <input
            type="text"
            className="builder-input"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="To'g'ri javob matnini aynan yozing..."
            required
          />
        </div>

        <div className="builder-field">
          <label>O'zbek tilidagi batafsil tushuntirish * (Markdown qo'llab-quvvatlanadi)</label>
          <textarea
            className="builder-input"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder={`**Qadam-baqadam tahlil:**\n1. Kodda... \n2. Keyin...`}
            style={{ minHeight: "120px" }}
            required
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
          <button type="submit" className="btn btn-primary">
            Sahnaga qo'shish
          </button>
          
          <button 
            type="button" 
            className="btn btn-ghost" 
            onClick={exportToJson}
            disabled={!title || !code || !optionA || !optionB || !correctAnswer}
          >
            JSON faylini yuklab olish
          </button>
        </div>
      </form>
    </div>
  );
}

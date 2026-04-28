import React from 'react';

export default function TheoryTab({ activeLesson }) {
  if (!activeLesson) return null;

  return (
    <div style={{ 
      background: "#201a12", 
      border: "1px solid #3a2e1e", 
      borderRadius: 10, 
      padding: "24px", 
      lineHeight: 1.8, 
      fontSize: 15, 
      whiteSpace: "pre-wrap",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    }}>
      {activeLesson.theory
        .replace(/```js|```/g, "")
        .replace(/##/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/`([^`]+)`/g, "[ $1 ]")}
    </div>
  );
}

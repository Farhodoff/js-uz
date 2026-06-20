import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Playground from "./pages/Playground";
import LessonPage from "./pages/LessonPage";

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

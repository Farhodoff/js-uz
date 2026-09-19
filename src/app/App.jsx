import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Playground from "../features/playground/pages/Playground";
import LessonPage from "../features/lesson/pages/LessonPage";

export default function App() {
  return (
    <Routes>
      <Route path="/playground" element={<Playground />} />
      <Route path="/:section/:lessonId" element={<LessonPage />} />
      <Route path="/:section" element={<LessonPage />} />
      <Route path="*" element={<Navigate to="/basics" replace />} />
    </Routes>
  );
}

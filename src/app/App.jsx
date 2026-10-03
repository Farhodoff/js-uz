import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Playground = lazy(() => import("../features/playground/pages/Playground"));
const LessonPage = lazy(() => import("../features/lesson/pages/LessonPage"));

function RouteLoader() {
  return (
    <div className="loading-container">
      <div className="loading-dots">
        <span></span><span></span><span></span>
      </div>
      <p>Sahifa yuklanmoqda...</p>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/playground" element={<Playground />} />
        <Route path="/:section/:lessonId" element={<LessonPage />} />
        <Route path="/:section" element={<LessonPage />} />
        <Route path="*" element={<Navigate to="/basics" replace />} />
      </Routes>
    </Suspense>
  );
}

export function computeModuleProgress(totalLessons, completedLessonIds) {
  if (!totalLessons || totalLessons <= 0) return 0;
  const count = (completedLessonIds || []).length;
  const percentage = (count / totalLessons) * 100;
  return Math.min(100, Math.round(percentage));
}

export function isModuleMastered(totalLessons, completedLessonIds) {
  return computeModuleProgress(totalLessons, completedLessonIds) === 100;
}

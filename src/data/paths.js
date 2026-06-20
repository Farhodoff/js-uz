import { curriculum } from "./curriculum";

export const PATHS = {
  path_junior: {
    label: "Noldan Boshlovchilar",
    icon: "🌱",
    color: "#10b981",
    lessons: [
      ...(curriculum.beginner?.lessons || []),
      ...(curriculum.operators?.lessons || []),
      ...(curriculum.typeCoercion?.lessons || []),
      ...(curriculum.scope?.lessons || []),
    ]
  },
  path_react: {
    label: "React'ga Tayyorgarlik",
    icon: "⚛️",
    color: "#3b82f6",
    lessons: [
      ...(curriculum.array?.lessons || []),
      ...(curriculum.objects?.lessons || []),
      ...(curriculum.es6?.lessons || []),
      ...(curriculum.async?.lessons || []),
      ...(curriculum.dom?.lessons || []),
    ]
  },
  path_senior: {
    label: "Senior Intervyu Qotili",
    icon: "💀",
    color: "#e11d48",
    lessons: [
      ...(curriculum.thisContext?.lessons || []),
      ...(curriculum.oop?.lessons || []),
      ...(curriculum.eventloop?.lessons || []),
      ...(curriculum.tricky?.lessons || []),
      ...(curriculum.systemDesign?.lessons || []),
    ]
  }
};

export const PATH_KEYS = Object.keys(PATHS);

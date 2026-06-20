export const reactCurriculum = {
  reactBeginner: {
    label: "React Asoslari",
    color: "#61dafb",
    icon: "⚛️",
    lessons: [
      { id: "reactIntro", title: "React nima? Va u qanday ishlaydi?", load: () => import("./lessons/react/reactIntro.js").then(m => m.reactIntro) },
      { id: "jsxBasics", title: "JSX Asoslari", load: () => import("./lessons/react/jsxBasics.js").then(m => m.jsxBasics) },
      { id: "reactComponents", title: "Komponentlar va Props", load: () => import("./lessons/react/reactComponents.js").then(m => m.reactComponents) },
      { id: "reactState", title: "State va useState Hook'i", load: () => import("./lessons/react/reactState.js").then(m => m.reactState) }
    ]
  },
  reactIntermediate: {
    label: "O'rta Daraja",
    color: "#4a90e2",
    icon: "⚙️",
    lessons: [
      { id: "useEffectHook", title: "useEffect va Komponent Hayoti (Lifecycle)", load: () => import("./lessons/react/useEffectHook.js").then(m => m.useEffectHook) }
    ]
  }
};

export const REACT_SECTIONS = ["reactBeginner", "reactIntermediate"];

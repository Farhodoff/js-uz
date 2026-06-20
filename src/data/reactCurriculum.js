export const reactCurriculum = {
  reactBasics: {
    label: "React Asoslari",
    color: "#61dafb",
    icon: "⚛️",
    lessons: [
      { id: "reactIntro", title: "Virtual DOM va Reconciliation", load: () => import("./lessons/react/reactIntro.js").then(m => m.reactIntro) },
      { id: "jsxRendering", title: "JSX va Rendering", load: () => import("./lessons/react/jsxRendering.js").then(m => m.jsxRendering) },
      { id: "componentLifecycle", title: "Component Lifecycle va useEffect", load: () => import("./lessons/react/componentLifecycle.js").then(m => m.componentLifecycle) },
      { id: "reactKeys", title: "Keys va Listlar bilan ishlash", load: () => import("./lessons/react/reactKeys.js").then(m => m.reactKeys) }
    ]
  },
  reactStateManagement: {
    label: "State Management",
    color: "#4a90e2",
    icon: "🗄️",
    lessons: [
      { id: "localState", title: "Local State: useState va useReducer", load: () => import("./lessons/react/localState.js").then(m => m.localState) },
      { id: "contextApi", title: "Context API va Global State", load: () => import("./lessons/react/contextApi.js").then(m => m.contextApi) },
      { id: "externalState", title: "External State Libraries (Zustand, Redux)", load: () => import("./lessons/react/externalState.js").then(m => m.externalState) },
      { id: "serverState", title: "Server State: TanStack Query (React Query)", load: () => import("./lessons/react/serverState.js").then(m => m.serverState) }
    ]
  },
  reactHooksAdvanced: {
    label: "Hooks (Chuqur tushuncha)",
    color: "#f39c12",
    icon: "🪝",
    lessons: [
      { id: "customHooks", title: "Custom Hooks yozish", load: () => import("./lessons/react/customHooks.js").then(m => m.customHooks) },
      { id: "memoizationHooks", title: "Memoization: useMemo va useCallback", load: () => import("./lessons/react/memoizationHooks.js").then(m => m.memoizationHooks) },
      { id: "refImperative", title: "Ref va useImperativeHandle", load: () => import("./lessons/react/refImperative.js").then(m => m.refImperative) }
    ]
  },
  reactPerformance: {
    label: "Ishlash Unumdorligi",
    color: "#2ecc71",
    icon: "⚡",
    lessons: [
      { id: "codeSplitting", title: "Code Splitting va Lazy Loading", load: () => import("./lessons/react/codeSplitting.js").then(m => m.codeSplitting) },
      { id: "reRenderTracking", title: "Re-renderlarni kuzatish va Profiler", load: () => import("./lessons/react/reRenderTracking.js").then(m => m.reRenderTracking) },
      { id: "memoizationComponents", title: "Memoization Components (React.memo)", load: () => import("./lessons/react/memoizationComponents.js").then(m => m.memoizationComponents) },
      { id: "virtualization", title: "Windowing va Virtualization", load: () => import("./lessons/react/virtualization.js").then(m => m.virtualization) }
    ]
  },
  reactArchitecture: {
    label: "Arxitektura va Ekosistema",
    color: "#9b59b6",
    icon: "🏗️",
    lessons: [
      { id: "reactRouting", title: "Routing: React Router v6+", load: () => import("./lessons/react/reactRouting.js").then(m => m.reactRouting) },
      { id: "reactForms", title: "Forms: React Hook Form va Zod", load: () => import("./lessons/react/reactForms.js").then(m => m.reactForms) },
      { id: "reactStyling", title: "Styling: Tailwind CSS va CSS-in-JS", load: () => import("./lessons/react/reactStyling.js").then(m => m.reactStyling) },
      { id: "reactTypeScript", title: "TypeScript bilan Integratsiya", load: () => import("./lessons/react/reactTypeScript.js").then(m => m.reactTypeScript) }
    ]
  },
  reactTesting: {
    label: "Testlash (Testing)",
    color: "#e74c3c",
    icon: "🧪",
    lessons: [
      { id: "unitIntegrationTesting", title: "Unit va Integration Testing", load: () => import("./lessons/react/unitIntegrationTesting.js").then(m => m.unitIntegrationTesting) },
      { id: "componentTesting", title: "Component Testing (RTL)", load: () => import("./lessons/react/componentTesting.js").then(m => m.componentTesting) }
    ]
  },
  reactModern: {
    label: "Zamonaviy Yondashuvlar",
    color: "#34495e",
    icon: "🚀",
    lessons: [
      { id: "serverComponents", title: "Server Components (RSC)", load: () => import("./lessons/react/serverComponents.js").then(m => m.serverComponents) },
      { id: "suspenseErrorBoundaries", title: "Suspense va Error Boundaries", load: () => import("./lessons/react/suspenseErrorBoundaries.js").then(m => m.suspenseErrorBoundaries) }
    ]
  },
  reactInterview: {
    label: "Intervyu Savollari",
    color: "#16a085",
    icon: "🎤",
    lessons: [
      { id: "reactInterviewQuestions", title: "Top 20+ React Intervyu Savollari va Javoblar", load: () => import("./lessons/react/reactInterviewQuestions.js").then(m => m.reactInterviewQuestions) }
    ]
  },
  reactProjects: {
    label: "Amaliy Loyihalar",
    color: "#e67e22",
    icon: "💼",
    lessons: [
      { id: "todoApp", title: "Murakkab To-Do App (Zustand bilan)", load: () => import("./lessons/react/todoApp.js").then(m => m.todoApp) },
      { id: "ecommerceCart", title: "E-commerce Savat (Context API)", load: () => import("./lessons/react/ecommerceCart.js").then(m => m.ecommerceCart) },
      { id: "dashboardApp", title: "Admin Dashboard (React Router)", load: () => import("./lessons/react/dashboardApp.js").then(m => m.dashboardApp) }
    ]
  }
};

export const REACT_SECTIONS = [
  "reactBasics",
  "reactStateManagement",
  "reactHooksAdvanced",
  "reactPerformance",
  "reactArchitecture",
  "reactTesting",
  "reactModern",
  "reactInterview",
  "reactProjects"
];

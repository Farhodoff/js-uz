export const reactCurriculum = {
  reactBasics: {
    label: "React Asoslari",
    color: "#61dafb",
    icon: "⚛️",
    lessons: [
      { id: "step1_setup", title: "1. Tayyorgarlik va O'rnatish", load: () => import("./lessons/react/step1_setup.js").then(m => m.step1_setup) },
      { id: "step2_jsx", title: "2. JSX Sintaksisi", load: () => import("./lessons/react/step2_jsx.js").then(m => m.step2_jsx) },
      { id: "step3_components", title: "3. Komponentlar", load: () => import("./lessons/react/step3_components.js").then(m => m.step3_components) },
      { id: "step4_props", title: "4. Props (Properties)", load: () => import("./lessons/react/step4_props.js").then(m => m.step4_props) },
      { id: "step5_state", title: "5. State (Holat)", load: () => import("./lessons/react/step5_state.js").then(m => m.step5_state) },
      { id: "step6_events", title: "6. Hodisalar (Events)", load: () => import("./lessons/react/step6_events.js").then(m => m.step6_events) },
      { id: "step7_hooks", title: "7. React Hooks (Asosiy)", load: () => import("./lessons/react/step7_hooks.js").then(m => m.step7_hooks) },
      { id: "step8_lists", title: "8. Ro'yxatlar va Shartli Render", load: () => import("./lessons/react/step8_lists.js").then(m => m.step8_lists) },
      { id: "step9_forms", title: "9. Formalar bilan ishlash", load: () => import("./lessons/react/step9_forms.js").then(m => m.step9_forms) },
      { id: "step10_routing", title: "10. Marshrutlash (Routing)", load: () => import("./lessons/react/step10_routing.js").then(m => m.step10_routing) },
      { id: "step11_context", title: "11. Holatni boshqarish (Context API)", load: () => import("./lessons/react/step11_context.js").then(m => m.step11_context) },
      { id: "step12_api", title: "12. API bilan ishlash (HTTP So'rovlar)", load: () => import("./lessons/react/step12_api.js").then(m => m.step12_api) }
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

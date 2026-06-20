const fs = require('fs');

const lessons = {
  jsxRendering: 'JSX va Rendering',
  componentLifecycle: 'Component Lifecycle va useEffect',
  reactKeys: 'Keys va Listlar bilan ishlash',
  localState: 'Local State: useState va useReducer',
  contextApi: 'Context API va Global State',
  externalState: 'External State Libraries (Zustand, Redux)',
  serverState: 'Server State: TanStack Query',
  customHooks: 'Custom Hooks yozish',
  memoizationHooks: 'Memoization: useMemo va useCallback',
  refImperative: 'Ref va useImperativeHandle',
  codeSplitting: 'Code Splitting va Lazy Loading',
  reRenderTracking: 'Re-renderlarni kuzatish va Profiler',
  memoizationComponents: 'Memoization Components (React.memo)',
  virtualization: 'Windowing va Virtualization',
  reactRouting: 'Routing: React Router v6+',
  reactForms: 'Forms: React Hook Form va Zod',
  reactStyling: 'Styling: Tailwind CSS va CSS-in-JS',
  reactTypeScript: 'TypeScript bilan Integratsiya',
  unitIntegrationTesting: 'Unit va Integration Testing',
  componentTesting: 'Component Testing (RTL)',
  serverComponents: 'Server Components (RSC)',
  suspenseErrorBoundaries: 'Suspense va Error Boundaries'
};

for (const [id, title] of Object.entries(lessons)) {
  const content = `export const ${id} = {
  title: "${title}",
  content: \`
# ${title}

Tez kunda bu dars uchun batafsil ma'lumotlar qo'shiladi.
\`,
  code: \`import React from "react";

export default function App() {
  return <h1>${title}</h1>;
}\`,
  exercises: [],
  quizzes: []
};
`;
  fs.writeFileSync(`src/data/lessons/react/${id}.js`, content);
}

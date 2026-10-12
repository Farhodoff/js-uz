import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// CDN fallback holatida AMD to'qnashuv himoyasi (alohida modulda, testlar bilan)
import './monacoAmdProtection.js';

// Monaco to'liq lokal rejimda: bundle ichida keladi, CDN ga murojaat yo'q.
// AMD loader.js umuman yuklanmaydi — "one anonymous define" xatolari
// jismonan takrorlanmaydi, offline/PWA rejimda ham editor ishlaydi.
//
// Ataylab faqat editorWorkerService ishlatiladi: sintaksis yoritish,
// o'zbekcha hover/autocomplete/diagnostika (bizning providerlar) workersiz
// ishlaydi. TS til workeri (7MB+) ataylab ulanmagan — uning o'rniga
// yengil o'zbekcha linter ishlaydi.
self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker();
  },
};

loader.config({ monaco });

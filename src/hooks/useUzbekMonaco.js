import { useRef, useEffect, useCallback } from 'react';
import { registerUzbekMonacoProviders, updateUzbekMonacoMarkers } from '../utils/editorExtensions';

// PracticeTab va Playground'dagi takroriy Monaco init mantiqini birlashtiradi:
// o'zbekcha hover + autocomplete + jonli diagnostika ro'yxati va tozalash.
export function useUzbekMonaco({ onEditorMount, onUnmount } = {}) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const disposeRef = useRef(null);
  const onMountRef = useRef(onEditorMount);
  onMountRef.current = onEditorMount;
  const onUnmountRef = useRef(onUnmount);
  onUnmountRef.current = onUnmount;

  const handleEditorDidMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    if (disposeRef.current) disposeRef.current();
    disposeRef.current = registerUzbekMonacoProviders(monaco, editor);

    const model = editor.getModel();
    if (model) updateUzbekMonacoMarkers(monaco, model);

    onMountRef.current?.(editor, monaco);
  }, []);

  useEffect(() => {
    return () => {
      if (editorRef.current) onUnmountRef.current?.(editorRef.current);
      if (disposeRef.current) disposeRef.current();
      disposeRef.current = null;
    };
  }, []);

  const refreshMarkers = useCallback(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) updateUzbekMonacoMarkers(monacoRef.current, model);
    }
  }, []);

  const clearMarkers = useCallback(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model && !model.isDisposed()) {
        monacoRef.current.editor.setModelMarkers(model, 'uzbek-lint', []);
      }
    }
  }, []);

  return { editorRef, monacoRef, handleEditorDidMount, refreshMarkers, clearMarkers };
}

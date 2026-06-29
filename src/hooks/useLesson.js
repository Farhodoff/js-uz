import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { curriculum, SECTIONS } from '../data/curriculum';
import { reactCurriculum, REACT_SECTIONS } from '../data/reactCurriculum';
import { PATHS, PATH_KEYS } from '../data/paths';
import { useAppStore } from '../store/useAppStore';

export function useLesson() {
  const navigate = useNavigate();
  const { section: urlSection, lessonId: urlLessonId } = useParams();
  const activeTrack = useAppStore(state => state.activeTrack || 'js');
  
  const currentCurriculum = activeTrack === 'react' ? reactCurriculum : curriculum;
  const currentSections = activeTrack === 'react' ? REACT_SECTIONS : SECTIONS;

  const [activeSection, setActiveSectionState] = useState(() => {
    return (currentSections.includes(urlSection) || PATH_KEYS.includes(urlSection)) ? urlSection : currentSections[0];
  });
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [code, setCode] = useState('');

  // Initialize from URL params
  useEffect(() => {
    let isCancelled = false;

    const loadLesson = async () => {
      const secKey = (currentSections.includes(urlSection) || PATH_KEYS.includes(urlSection)) ? urlSection : currentSections[0];
      setActiveSectionState(secKey);

      if (secKey === 'challenges') {
        setActiveLesson({ id: 'challenges', title: 'JS Challenges' });
        return;
      }

      const sectionData = PATH_KEYS.includes(secKey) ? PATHS[secKey] : currentCurriculum[secKey];
      if (!sectionData || !sectionData.lessons || sectionData.lessons.length === 0) return;

      let targetLessonRef = urlLessonId 
        ? sectionData.lessons.find(l => l.id === urlLessonId) 
        : sectionData.lessons[0];

      if (!targetLessonRef) targetLessonRef = sectionData.lessons[0];

      if (targetLessonRef) {
        if (!urlLessonId || urlLessonId !== targetLessonRef.id) {
          navigate(`/${secKey}/${targetLessonRef.id}`, { replace: true });
        } else {
          setActiveLesson(null); // trigger loading state
          try {
            // Check if it's already a full module (legacy/missed replacements) or needs dynamic load
            const loadedData = targetLessonRef.load ? await targetLessonRef.load() : targetLessonRef;
            if (!isCancelled) {
              const fullLesson = { ...targetLessonRef, ...loadedData };
              setActiveLesson(fullLesson);
              setCurrentExerciseIndex(0);
              setCode(fullLesson.exercises?.[0]?.startingCode || fullLesson.code || fullLesson.task || '');
            }
          } catch (error) {
            console.error("Darsni yuklashda xatolik:", error);
          }
        }
      }
    };

    loadLesson();
    return () => {
      isCancelled = true;
    };
  }, [urlSection, urlLessonId, navigate, currentCurriculum, currentSections]);

  const setActiveSection = useCallback((key) => {
    const sec = PATH_KEYS.includes(key) ? PATHS[key] : currentCurriculum[key];
    if (key === 'challenges') {
      navigate('/challenges');
    } else if (sec && sec.lessons.length > 0) {
      navigate(`/${key}/${sec.lessons[0].id}`);
    }
  }, [navigate, currentCurriculum]);

  const openLesson = useCallback((lesson, section) => {
    const sec = section || activeSection;
    // Let the useEffect handle the loading to avoid setting an unloaded reference
    navigate(`/${sec}/${lesson.id}`);
  }, [activeSection, navigate]);

  const goToExercise = useCallback((index) => {
    if (!activeLesson?.exercises) return;
    if (index >= 0 && index < activeLesson.exercises.length) {
      setCurrentExerciseIndex(index);
      setCode(activeLesson.exercises[index].startingCode || '');
    }
  }, [activeLesson]);

  let sec = PATH_KEYS.includes(activeSection) ? PATHS[activeSection] : currentCurriculum[activeSection];
  if (!sec) {
    sec = currentCurriculum[currentSections[0]];
  }

  return {
    activeSection,
    setActiveSection,
    activeLesson,
    openLesson,
    currentExerciseIndex,
    setCurrentExerciseIndex: goToExercise,
    code,
    setCode,
    sec,
  };
}

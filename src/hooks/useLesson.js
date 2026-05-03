import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { curriculum, SECTIONS } from '../data/curriculum';

export function useLesson() {
  const navigate = useNavigate();
  const { section: urlSection, lessonId: urlLessonId } = useParams();

  const [activeSection, setActiveSectionState] = useState(() => {
    return SECTIONS.includes(urlSection) ? urlSection : 'beginner';
  });
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [code, setCode] = useState('');

  // Initialize from URL params
  useEffect(() => {
    const secKey = SECTIONS.includes(urlSection) ? urlSection : 'beginner';
    setActiveSectionState(secKey);

    const sectionData = curriculum[secKey];
    if (!sectionData || !sectionData.lessons || sectionData.lessons.length === 0) return;

    if (urlLessonId) {
      const lesson = sectionData.lessons.find(l => l.id === urlLessonId);
      if (lesson) {
        setActiveLesson(lesson);
        setCurrentExerciseIndex(0);
        setCode(lesson.exercises?.[0]?.startingCode || lesson.task || '');
        return;
      }
    }

    // Fallback: If lessonId not found or missing, go to first lesson
    const first = sectionData.lessons[0];
    if (first) {
      setActiveLesson(first);
      setCurrentExerciseIndex(0);
      setCode(first.exercises?.[0]?.startingCode || first.task || '');
      // Update URL to match first lesson ID
      navigate(`/${secKey}/${first.id}`, { replace: true });
    }
  }, [urlSection, urlLessonId, navigate]);

  const setActiveSection = useCallback((key) => {
    const sec = curriculum[key];
    if (sec && sec.lessons.length > 0) {
      navigate(`/${key}/${sec.lessons[0].id}`);
    }
  }, [navigate]);

  const openLesson = useCallback((lesson, section) => {
    const sec = section || activeSection;
    setActiveLesson(lesson);
    setCurrentExerciseIndex(0);
    setCode(lesson.exercises?.[0]?.startingCode || lesson.task || '');
    navigate(`/${sec}/${lesson.id}`);
  }, [activeSection, navigate]);

  const goToExercise = useCallback((index) => {
    if (!activeLesson?.exercises) return;
    if (index >= 0 && index < activeLesson.exercises.length) {
      setCurrentExerciseIndex(index);
      setCode(activeLesson.exercises[index].startingCode || '');
    }
  }, [activeLesson]);

  const sec = curriculum[activeSection];

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

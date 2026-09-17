import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchProgress, saveProgress } from '../services/lectureApi';

const emptyProgress = () => ({ quizAnswers: {}, quizCompleted: false, difficultCards: [] });

const useStudyProgressStore = create(
  persist(
    (set, get) => ({
      byLecture: {},
      async hydrate(lectureId) {
        const result = await fetchProgress(lectureId);
        if (result) set((state) => ({ byLecture: { ...state.byLecture, [lectureId]: result } }));
      },
      progressFor(lectureId) {
        return get().byLecture[lectureId] || emptyProgress();
      },
      async update(lectureId, updater) {
        const current = get().byLecture[lectureId] || emptyProgress();
        const next = updater(current);
        set((state) => ({ byLecture: { ...state.byLecture, [lectureId]: next } }));
        try {
          await saveProgress(lectureId, next);
        } catch {
          // Local progress remains available and will be synchronized by the next action.
        }
      },
      answerQuiz(lectureId, questionId, answerIndex) {
        return get().update(lectureId, (progress) => ({
          ...progress,
          quizAnswers: { ...progress.quizAnswers, [questionId]: answerIndex },
        }));
      },
      completeQuiz(lectureId) {
        return get().update(lectureId, (progress) => ({ ...progress, quizCompleted: true }));
      },
      resetQuiz(lectureId) {
        return get().update(lectureId, (progress) => ({ ...progress, quizAnswers: {}, quizCompleted: false }));
      },
      markCard(lectureId, cardId, isDifficult) {
        return get().update(lectureId, (progress) => ({
          ...progress,
          difficultCards: isDifficult
            ? [...new Set([...progress.difficultCards, cardId])]
            : progress.difficultCards.filter((id) => id !== cardId),
        }));
      },
      clear() {
        set({ byLecture: {} });
      },
    }),
    { name: 'hackalem-study-progress', partialize: ({ byLecture }) => ({ byLecture }) },
  ),
);

export default useStudyProgressStore;

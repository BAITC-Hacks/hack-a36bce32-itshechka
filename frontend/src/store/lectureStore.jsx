import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { requestMaterials } from '../services/lectureApi';

const useLectureStore = create(
  persist(
    (set, get) => ({
      lectures: [],
      materials: {},
      addLecture({ title, text }) {
        const lecture = {
          id: crypto.randomUUID(),
          title: title.trim() || 'Новая лекция',
          text,
          status: 'processing',
          createdAt: new Date().toISOString(),
          wordCount: text.trim().split(/\s+/).length,
        };
        set((state) => ({ lectures: [lecture, ...state.lectures] }));
        return lecture;
      },
      async processLecture(id) {
        const lecture = get().lectures.find((item) => item.id === id);
        if (!lecture || lecture.status === 'completed') return lecture;
        try {
          const result = await requestMaterials(lecture);
          set((state) => ({
            materials: { ...state.materials, [id]: result },
            lectures: state.lectures.map((item) => item.id === id ? { ...item, status: 'completed' } : item),
          }));
          return { ...lecture, status: 'completed' };
        } catch (error) {
          set((state) => ({
            lectures: state.lectures.map((item) => item.id === id ? { ...item, status: 'failed', error: error.message } : item),
          }));
          throw error;
        }
      },
      removeLecture(id) {
        set((state) => ({
          lectures: state.lectures.filter((item) => item.id !== id),
          materials: Object.fromEntries(Object.entries(state.materials).filter(([key]) => key !== id)),
        }));
      },
    }),
    { name: 'hackalem-lectures' },
  ),
);

export default useLectureStore;

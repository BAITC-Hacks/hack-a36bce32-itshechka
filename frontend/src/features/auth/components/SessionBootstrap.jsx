import { useEffect } from 'react';
import useAuthStore from '../../../store/authStore';
import useLectureStore from '../../../store/lectureStore';
import useStudyProgressStore from '../../../store/studyProgressStore';

export default function SessionBootstrap() {
  const verifySession = useAuthStore((state) => state.verifySession);
  const logout = useAuthStore((state) => state.logout);
  useEffect(() => { verifySession(); }, [verifySession]);
  useEffect(() => {
    window.addEventListener('auth:unauthorized', logout);
    return () => window.removeEventListener('auth:unauthorized', logout);
  }, [logout]);
  useEffect(() => {
    const clearSessionData = () => {
      useLectureStore.getState().clear();
      useStudyProgressStore.getState().clear();
    };
    window.addEventListener('session:cleared', clearSessionData);
    return () => window.removeEventListener('session:cleared', clearSessionData);
  }, []);
  return null;
}

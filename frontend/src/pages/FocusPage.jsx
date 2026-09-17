import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import FocusPlan from '../features/materials/components/FocusPlan';
import useStudyProgressStore from '../store/studyProgressStore';

export default function FocusPage() {
  const { lecture, materials } = useOutletContext();
  const hydrate = useStudyProgressStore((state) => state.hydrate);
  useEffect(() => { hydrate(lecture.id); }, [hydrate, lecture.id]);
  return <FocusPlan lectureId={lecture.id} materials={materials} />;
}

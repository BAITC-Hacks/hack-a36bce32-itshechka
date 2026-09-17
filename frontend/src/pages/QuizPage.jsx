import { useOutletContext } from 'react-router-dom';
import QuizRunner from '../features/quiz/components/QuizRunner';

export default function QuizPage() {
  const { lecture, materials } = useOutletContext();
  return <QuizRunner lectureId={lecture.id} questions={materials.quiz} />;
}

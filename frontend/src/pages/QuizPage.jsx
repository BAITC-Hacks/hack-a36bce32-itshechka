import { useOutletContext } from 'react-router-dom';
import QuizRunner from '../features/quiz/components/QuizRunner';

export default function QuizPage() {
  const { materials } = useOutletContext();
  return <QuizRunner questions={materials.quiz} />;
}

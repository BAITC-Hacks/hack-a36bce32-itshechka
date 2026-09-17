import { BrainCircuit, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ProcessingSteps from '../features/lecture/components/ProcessingSteps';
import Card from '../shared/ui/Card';
import Button from '../shared/ui/Button';
import useLectureStore from '../store/lectureStore';

export default function ProcessingPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const hasStarted = useRef(false);
  const [step, setStep] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const lecture = useLectureStore((state) => state.lectures.find((item) => item.id === lectureId));
  const processLecture = useLectureStore((state) => state.processLecture);

  useEffect(() => {
    if (!lecture || lecture.status === 'completed' || hasStarted.current) return;
    hasStarted.current = true;
    const interval = setInterval(() => setStep((value) => Math.min(value + 1, 2)), 550);
    processLecture(lectureId).then(() => navigate(`/lectures/${lectureId}`, { replace: true })).catch(() => {});
    return () => clearInterval(interval);
  }, [attempt, lecture, lectureId, navigate, processLecture]);

  function retry() {
    hasStarted.current = false;
    setStep(0);
    setAttempt((value) => value + 1);
  }

  if (!lecture) return <Navigate to="/history" replace />;
  if (lecture.status === 'completed') return <Navigate to={`/lectures/${lectureId}`} replace />;

  return (
    <div className="mx-auto max-w-2xl py-8 sm:py-16">
      <Card className="p-7 text-center shadow-sm sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-700"><BrainCircuit className="animate-pulse" size={31} /></div>
        <p className="mt-6 text-sm font-semibold text-brand-700">Обрабатываем лекцию</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">{lecture.title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Обычно это занимает меньше минуты. Не закрывайте страницу.</p>
        <div className="mt-8 text-left"><ProcessingSteps activeStep={step} /></div>
        {lecture.status === 'failed' && <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"><p>{lecture.error || 'Не удалось обработать лекцию.'}</p><Button className="mt-3" onClick={retry} size="sm" variant="secondary"><RotateCcw size={15} />Повторить</Button></div>}
      </Card>
    </div>
  );
}

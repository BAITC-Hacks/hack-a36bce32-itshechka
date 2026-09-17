import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { useState } from 'react';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';
import ProgressBar from '../../../shared/ui/ProgressBar';

export default function QuizRunner({ questions }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const question = questions[current];
  const selected = answers[question?.id];
  const score = questions.filter((item) => answers[item.id] === item.correctIndex).length;

  function choose(index) {
    if (selected !== undefined) return;
    setAnswers((state) => ({ ...state, [question.id]: index }));
  }

  function next() {
    if (current === questions.length - 1) setIsFinished(true);
    else setCurrent((value) => value + 1);
  }

  function restart() {
    setCurrent(0); setAnswers({}); setIsFinished(false);
  }

  if (isFinished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <Card className="p-7 text-center sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-700"><CheckCircle2 size={32} /></div>
        <p className="mt-5 text-sm font-semibold text-brand-700">Тест завершён</p>
        <h2 className="mt-1 text-3xl font-bold text-slate-950">{score} из {questions.length}</h2>
        <p className="mt-3 text-slate-500">{percent >= 70 ? 'Отличный результат. Можно переходить к карточкам.' : 'Вернитесь к конспекту и повторите сложные темы.'}</p>
        <Button className="mt-7" onClick={restart} variant="secondary"><RotateCcw size={17} />Пройти ещё раз</Button>
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-8">
      <ProgressBar label={`Вопрос ${current + 1} из ${questions.length}`} value={Math.round(((current + 1) / questions.length) * 100)} />
      <h2 className="mt-8 text-xl font-bold leading-8 text-slate-950 sm:text-2xl">{question.question}</h2>
      <div className="mt-6 grid gap-3">
        {question.options.map((option, index) => {
          const correct = selected !== undefined && index === question.correctIndex;
          const wrong = selected === index && index !== question.correctIndex;
          return (
            <button
              className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${correct ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : wrong ? 'border-red-300 bg-red-50 text-red-800' : 'border-slate-200 hover:border-brand-500 hover:bg-brand-50'}`}
              key={option}
              onClick={() => choose(index)}
              type="button"
            >
              <span>{option}</span>{correct && <CheckCircle2 size={19} />}{wrong && <XCircle size={19} />}
            </button>
          );
        })}
      </div>
      {selected !== undefined && (
        <div className="mt-6 rounded-xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-800">Почему?</p><p className="mt-1 text-sm leading-6 text-slate-600">{question.explanation}</p></div>
      )}
      <div className="mt-6 flex justify-end"><Button disabled={selected === undefined} onClick={next}>{current === questions.length - 1 ? 'Показать результат' : 'Следующий вопрос'}</Button></div>
    </Card>
  );
}

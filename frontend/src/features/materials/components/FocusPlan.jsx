import { ArrowRight, Brain, CheckCircle2, ClipboardCheck, Layers3, Quote, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';
import useStudyProgressStore from '../../../store/studyProgressStore';

export default function FocusPlan({ lectureId, materials }) {
  const progress = useStudyProgressStore((state) => state.byLecture[lectureId]) || { quizAnswers: {}, difficultCards: [] };
  const answered = Object.keys(progress.quizAnswers).length;
  const wrongQuestions = materials.quiz.filter((question) => progress.quizAnswers[question.id] !== undefined && progress.quizAnswers[question.id] !== question.correctIndex);
  const difficultCards = materials.flashcards.filter((card) => progress.difficultCards.includes(card.id));
  const correctCount = materials.quiz.filter((question) => progress.quizAnswers[question.id] === question.correctIndex).length;
  const quizScore = materials.quiz.length ? correctCount / materials.quiz.length : 1;
  const cardScore = materials.flashcards.length ? (materials.flashcards.length - difficultCards.length) / materials.flashcards.length : 1;
  const mastery = Math.round((quizScore * 0.7 + cardScore * 0.3) * 100);
  const weakItems = [
    ...wrongQuestions.map((question) => ({ id: `q-${question.id}`, type: 'Ошибка в тесте', title: question.question, detail: question.explanation, source: question.source, evidence: question.evidence, icon: ClipboardCheck })),
    ...difficultCards.map((card) => ({ id: `c-${card.id}`, type: 'Сложная карточка', title: card.front, detail: card.back, source: card.source, evidence: card.evidence, icon: Layers3 })),
  ];

  if (!answered && !difficultCards.length) {
    return (
      <Card className="p-7 text-center sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Target size={26} /></span>
        <h2 className="mt-5 text-2xl font-bold text-slate-950">Сначала проверим знания</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">Пройдите тест и отмечайте сложные карточки. Затем здесь появится персональный маршрут повторения.</p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row"><Button as={Link} to={`/lectures/${lectureId}/quiz`}>Начать тест<ArrowRight size={17} /></Button><Button as={Link} to={`/lectures/${lectureId}/flashcards`} variant="secondary">Открыть карточки</Button></div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
      <Card className="p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand-700"><Brain size={17} />Пульс понимания</p>
        <div className="relative mx-auto mt-7 grid h-40 w-40 place-items-center rounded-full" style={{ background: `conic-gradient(#0d9488 ${mastery}%, #e2e8f0 ${mastery}% 100%)` }}>
          <div className="grid h-32 w-32 place-items-center rounded-full bg-white text-center"><div><p className="text-4xl font-bold text-slate-950">{mastery}%</p><p className="mt-1 text-xs text-slate-400">усвоено</p></div></div>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-50 p-3"><p className="text-2xl font-bold text-slate-900">{wrongQuestions.length}</p><p className="text-xs text-slate-500">ошибок</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-2xl font-bold text-slate-900">{difficultCards.length}</p><p className="text-xs text-slate-500">сложных карточек</p></div></div>
        {weakItems.length === 0 && <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700"><CheckCircle2 size={18} />Слабых тем не найдено</div>}
      </Card>

      <div>
        <div className="mb-4"><p className="text-sm font-semibold text-brand-700">Ваш маршрут</p><h2 className="mt-1 text-2xl font-bold text-slate-950">Что повторить прямо сейчас</h2></div>
        <div className="space-y-3">
          {weakItems.map(({ id, type, title, detail, source, evidence, icon: Icon }, index) => (
            <Card className="p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md" key={id}>
              <div className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700"><Icon size={19} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Шаг {index + 1} · {type}</p><span className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">{source}</span></div><h3 className="mt-2 font-bold leading-6 text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>{evidence && <p className="mt-3 flex gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500"><Quote className="mt-0.5 shrink-0 text-brand-600" size={14} />«{evidence}»</p>}</div></div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

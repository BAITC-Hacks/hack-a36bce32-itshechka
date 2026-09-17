import { ArrowLeft, ArrowRight, Brain, Check, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../../shared/ui/Button';
import ProgressBar from '../../../shared/ui/ProgressBar';
import useStudyProgressStore from '../../../store/studyProgressStore';
import SourceBadge from '../../materials/components/SourceBadge';

export default function FlashcardDeck({ cards, lectureId }) {
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const card = cards[current];
  const progress = useStudyProgressStore((state) => state.byLecture[lectureId]);
  const hydrate = useStudyProgressStore((state) => state.hydrate);
  const markCard = useStudyProgressStore((state) => state.markCard);
  const isDifficult = progress?.difficultCards?.includes(card.id) || false;

  useEffect(() => { hydrate(lectureId); }, [hydrate, lectureId]);

  function move(direction) {
    setCurrent((value) => (value + direction + cards.length) % cards.length);
    setIsFlipped(false);
  }

  return (
    <div>
      <ProgressBar label={`Карточка ${current + 1} из ${cards.length}`} value={Math.round(((current + 1) / cards.length) * 100)} />
      <button
        className="mt-6 flex min-h-72 w-full flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-500 hover:shadow-lg active:translate-y-0 sm:min-h-80 sm:p-8"
        onClick={() => setIsFlipped((value) => !value)}
        type="button"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700">{isFlipped ? 'Ответ' : 'Термин'}</span>
        <span className={`animate-page-in mt-5 max-w-2xl font-bold leading-tight text-slate-950 ${isFlipped ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`} key={`${current}-${isFlipped}`}>{isFlipped ? card.back : card.front}</span>
        {isFlipped && card.source && <span className="mt-5"><SourceBadge>{card.source}</SourceBadge></span>}
        <span className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400"><RotateCcw size={15} />Нажмите, чтобы перевернуть</span>
      </button>
      <div className="mt-5 flex justify-between gap-3">
        <Button className="flex-1 sm:flex-none" onClick={() => move(-1)} variant="secondary"><ArrowLeft size={17} />Назад</Button>
        <Button className="flex-1 sm:flex-none" onClick={() => move(1)}>Дальше<ArrowRight size={17} /></Button>
      </div>
      {isFlipped && <div className="mt-3 grid grid-cols-2 gap-3"><Button onClick={() => markCard(lectureId, card.id, true)} variant={isDifficult ? 'danger' : 'secondary'}><Brain size={17} />Сложно</Button><Button onClick={() => { markCard(lectureId, card.id, false); move(1); }} variant="secondary"><Check size={17} />Знаю</Button></div>}
    </div>
  );
}

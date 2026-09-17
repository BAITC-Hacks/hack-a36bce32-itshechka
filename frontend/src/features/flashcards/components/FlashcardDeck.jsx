import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import Button from '../../../shared/ui/Button';
import ProgressBar from '../../../shared/ui/ProgressBar';

export default function FlashcardDeck({ cards }) {
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const card = cards[current];

  function move(direction) {
    setCurrent((value) => (value + direction + cards.length) % cards.length);
    setIsFlipped(false);
  }

  return (
    <div>
      <ProgressBar label={`Карточка ${current + 1} из ${cards.length}`} value={Math.round(((current + 1) / cards.length) * 100)} />
      <button
        className="mt-6 flex min-h-80 w-full flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:border-brand-500 hover:shadow-md"
        onClick={() => setIsFlipped((value) => !value)}
        type="button"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700">{isFlipped ? 'Ответ' : 'Термин'}</span>
        <span className={`mt-5 max-w-2xl font-bold leading-tight text-slate-950 ${isFlipped ? 'text-2xl' : 'text-3xl'}`}>{isFlipped ? card.back : card.front}</span>
        <span className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400"><RotateCcw size={15} />Нажмите, чтобы перевернуть</span>
      </button>
      <div className="mt-5 flex justify-between gap-3">
        <Button onClick={() => move(-1)} variant="secondary"><ArrowLeft size={17} />Назад</Button>
        <Button onClick={() => move(1)}>Дальше<ArrowRight size={17} /></Button>
      </div>
    </div>
  );
}

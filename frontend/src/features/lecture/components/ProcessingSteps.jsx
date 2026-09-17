import { Check, LoaderCircle } from 'lucide-react';

const steps = ['Анализируем структуру лекции', 'Выделяем ключевые темы', 'Готовим тест и карточки'];

export default function ProcessingSteps({ activeStep = 1 }) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const completed = index < activeStep;
        const active = index === activeStep;
        return (
          <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${active ? 'border-brand-100 bg-brand-50' : 'border-slate-100 bg-white'}`} key={step}>
            <span className={`grid h-7 w-7 place-items-center rounded-full ${completed ? 'bg-emerald-500 text-white' : active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {completed ? <Check size={15} /> : active ? <LoaderCircle className="animate-spin" size={15} /> : index + 1}
            </span>
            <span className={`text-sm font-medium ${active ? 'text-brand-700' : completed ? 'text-slate-700' : 'text-slate-400'}`}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}

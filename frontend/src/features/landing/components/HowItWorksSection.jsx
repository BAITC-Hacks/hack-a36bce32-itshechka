import { BrainCircuit, ClipboardPaste, GraduationCap } from 'lucide-react';

const steps = [
  { icon: ClipboardPaste, number: '01', title: 'Добавьте лекцию', text: 'Вставьте расшифровку, статью или собственный текстовый конспект.' },
  { icon: BrainCircuit, number: '02', title: 'Дождитесь анализа', text: 'Система выделит структуру и свяжет материалы с исходными фрагментами.' },
  { icon: GraduationCap, number: '03', title: 'Проверьте себя', text: 'Прочитайте конспект, пройдите тест и повторите материал по карточкам.' },
];

export default function HowItWorksSection() {
  return (
    <section className="scroll-mt-20 bg-slate-950 px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl"><p className="text-sm font-semibold text-brand-500">Три простых шага</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">От текста до уверенного ответа</h2><p className="mt-4 leading-7 text-slate-400">Интерфейс ведёт по одному понятному сценарию — без сложных настроек и лишних экранов.</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, number, title, text }, index) => (
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:bg-white/[0.07] sm:p-8" key={title}>
              <span className="absolute right-5 top-3 text-5xl font-black text-white/[0.04]">{number}</span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-500 transition duration-300 group-hover:scale-110"><Icon size={23} /></span>
              <h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              {index < steps.length - 1 && <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-brand-500/50 md:block" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

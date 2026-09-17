import { BookOpenText, ClipboardCheck, Layers3, ListChecks } from 'lucide-react';

const materials = [
  { icon: BookOpenText, title: 'Конспект', text: 'Структурированное объяснение основных тем без повторов и воды.', color: 'bg-blue-50 text-blue-700' },
  { icon: ListChecks, title: 'Тезисы', text: 'Короткий список идей для быстрого повторения перед занятием.', color: 'bg-brand-50 text-brand-700' },
  { icon: ClipboardCheck, title: 'Тест', text: 'Вопросы с вариантами ответа и понятным объяснением результата.', color: 'bg-violet-50 text-violet-700' },
  { icon: Layers3, title: 'Карточки', text: 'Термины и определения для активного запоминания материала.', color: 'bg-amber-50 text-amber-700' },
];

export default function MaterialsSection() {
  return (
    <section className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8" id="materials">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold text-brand-700">Одна лекция — четыре формата</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Учитесь так, как удобно вам</h2><p className="mt-4 leading-7 text-slate-500">Сначала разберитесь в теме, затем сразу проверьте понимание.</p></div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map(({ icon: Icon, title, text, color }) => (
            <article className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50" key={title}>
              <span className={`grid h-12 w-12 place-items-center rounded-2xl transition duration-300 group-hover:rotate-3 group-hover:scale-110 ${color}`}><Icon size={23} /></span>
              <h3 className="mt-6 text-xl font-bold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

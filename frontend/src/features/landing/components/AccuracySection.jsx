import { CheckCircle2, Quote, ShieldCheck } from 'lucide-react';

export default function AccuracySection() {
  return (
    <section className="scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8" id="accuracy">
      <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-brand-50 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:p-14">
        <div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand-700 shadow-sm"><ShieldCheck size={24} /></span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Ответы, которым можно доверять</h2>
          <p className="mt-4 leading-7 text-slate-600">Lectora не должна подменять содержание лекции общими знаниями модели. Каждый тезис и раздел конспекта связан с исходным фрагментом.</p>
          <ul className="mt-7 space-y-3">
            {['Только факты из загруженного текста', 'Ссылки на фрагменты лекции', 'Понятная обработка короткого или пустого ввода'].map((item) => <li className="flex items-center gap-3 text-sm font-medium text-slate-700" key={item}><CheckCircle2 className="text-brand-600" size={19} />{item}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-brand-700/5 sm:p-8">
          <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-slate-900">Фрагмент лекции</p><span className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700"><Quote size={12} />Фрагмент 3</span></div>
          <p className="mt-5 border-l-2 border-brand-500 pl-4 text-sm leading-7 text-slate-500">«Переобучение возникает, когда модель хорошо запоминает обучающие данные, но ошибается на новых.»</p>
          <div className="my-6 h-px bg-slate-100" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Тезис</p><p className="mt-2 font-semibold leading-7 text-slate-800">Переобучение ухудшает качество модели на новых примерах.</p>
        </div>
      </div>
    </section>
  );
}

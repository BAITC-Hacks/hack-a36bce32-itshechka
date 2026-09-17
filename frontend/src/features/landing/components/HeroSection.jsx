import { ArrowRight, Check, FileText, Layers3, ListChecks, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../../shared/ui/Badge';
import Button from '../../../shared/ui/Button';
import useAuthStore from '../../../store/authStore';

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl animate-fade-up lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-12 -z-10 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.3)] sm:p-4">
        <div className="flex items-center gap-2 border-b border-slate-100 px-2 pb-3"><span className="h-2.5 w-2.5 rounded-full bg-red-300" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-300" /><span className="ml-2 text-[11px] text-slate-400">Основы машинного обучения</span></div>
        <div className="grid gap-3 pt-3 sm:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-xs font-semibold text-brand-500">Лекция обработана</p>
            <p className="mt-2 text-lg font-bold">4 формата для подготовки</p>
            <div className="mt-5 space-y-2.5">
              {['Конспект', 'Тезисы', 'Тест', 'Карточки'].map((item, index) => <div className="flex items-center gap-2 text-xs text-slate-300" key={item}><span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-brand-500"><Check size={12} /></span>{item}<span className="ml-auto text-slate-500">0{index + 1}</span></div>)}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between"><p className="text-sm font-bold text-slate-900">Ключевые идеи</p><Badge tone="brand">3 минуты</Badge></div>
            <div className="mt-4 space-y-3">
              {[72, 94, 82].map((width, index) => <div className="flex gap-2.5" key={width}><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">{index + 1}</span><div className="flex-1"><div className="h-2 rounded-full bg-slate-200" style={{ width: `${width}%` }} /><div className="mt-2 h-2 w-2/3 rounded-full bg-slate-200/70" /></div></div>)}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[FileText, ListChecks, Layers3].map((Icon, index) => <div className="grid h-12 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" key={index}><Icon size={18} /></div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-lg sm:-left-8"><span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-50 text-brand-700"><Sparkles size={16} /></span><div><p className="text-xs font-bold text-slate-800">Только по тексту</p><p className="text-[10px] text-slate-400">Без выдуманных фактов</p></div></div>
    </div>
  );
}

export default function HeroSection() {
  const token = useAuthStore((state) => state.token);
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700"><Sparkles size={14} />ИИ-помощник для учёбы</div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-6xl lg:text-[4.25rem]">Лекция превращается в понятный план подготовки</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Вставьте текст и получите структурированный конспект, главные тезисы, тест и карточки — с опорой на конкретные фрагменты лекции.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} className="w-full sm:w-auto" size="lg" to={token ? '/app' : '/register'}>{token ? 'Открыть пространство' : 'Попробовать бесплатно'}<ArrowRight size={18} /></Button>
            <Button as="a" className="w-full sm:w-auto" href="#how-it-works" size="lg" variant="secondary">Как это работает</Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-400"><Check size={14} className="text-emerald-500" />Никаких банковских карт · результат за один запуск</p>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}
